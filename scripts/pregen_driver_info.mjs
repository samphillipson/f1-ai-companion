import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load env
dotenv.config({ path: '.env.local' });

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  console.error("Missing GEMINI_API_KEY in .env.local");
  process.exit(1);
}

const CACHE_FILE = path.join(process.cwd(), 'data', 'driver_cache.json');
const DATA_DIR = path.join(process.cwd(), 'data');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR);
}

async function pregen() {
  console.log("🚀 Starting AI Driver Biography Pre-generation...");
  
  // 1. Fetch current standings to get the driver list
  console.log("Fetching driver list from Jolpica...");
  const standingsRes = await fetch('https://api.jolpi.ca/ergast/f1/current/driverStandings.json');
  const standingsData = await standingsRes.json();
  const standings = standingsData.MRData.StandingsTable.StandingsLists[0].DriverStandings;
  
  const drivers = standings.map((s) => ({
    id: s.Driver.driverId,
    name: `${s.Driver.givenName} ${s.Driver.familyName}`
  }));

  console.log(`Found ${drivers.length} drivers. Generating biographies...`);

  // 2. Load existing cache
  let cache = {};
  if (fs.existsSync(CACHE_FILE)) {
    cache = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));
  }

  const ai = new GoogleGenerativeAI(GEMINI_API_KEY);
  const model = ai.getGenerativeModel({ model: 'gemini-flash-latest' });

  for (const driver of drivers) {
    if (cache[driver.id] && (Date.now() - cache[driver.id].timestamp < 7 * 24 * 60 * 60 * 1000)) {
      console.log(`✅ ${driver.name} already in cache. Skipping.`);
      continue;
    }

    console.log(`🧠 Generating bio for ${driver.name}...`);
    
    const prompt = `
      You are an expert Formula 1 historian and journalist. 
      Write exactly two concise paragraphs about the F1 driver ${driver.name}.
      
      Paragraph 1 (Personal Background): Detail their early life, nationality, family racing background if any, and non-racing hobbies or significant personal details.
      Paragraph 2 (Career Background): Detail their journey to F1, their notable achievements, significant teams they have raced for, and their biggest milestones.
      
      Return ONLY a valid JSON object matching this exact structure:
      {
        "personal": "The personal background paragraph...",
        "career": "The career background paragraph..."
      }
    `;

    let success = false;
    let retries = 5;
    while (!success && retries > 0) {
      try {
        const result = await model.generateContent(prompt);
        const text = result.response.text().trim();
        
        const startIndex = text.indexOf('{');
        const endIndex = text.lastIndexOf('}');
        const jsonStr = text.substring(startIndex, endIndex + 1);
        const parsedData = JSON.parse(jsonStr);

        cache[driver.id] = {
          ...parsedData,
          timestamp: Date.now()
        };
        
        // Save after each success to be safe
        fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2));
        console.log(`✨ Successfully saved ${driver.name}`);
        success = true;
      } catch (err) {
        console.warn(`⚠️ Error for ${driver.name}, retrying... (${retries} left)`);
        await new Promise(r => setTimeout(r, 30000)); // Wait 30s between retries
        retries--;
      }
    }
    
    // 5 second delay between drivers
    await new Promise(r => setTimeout(r, 5000));
  }

  console.log("🏁 Pre-generation complete! All driver biographies are now cached.");
}

pregen().catch(console.error);
