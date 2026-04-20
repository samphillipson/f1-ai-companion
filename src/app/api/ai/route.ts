import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { fetchCurrentStandings, fetchRaceSchedule } from '@/lib/jolpica';

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { response: "API Key missing. Please set GEMINI_API_KEY in .env.local" },
        { status: 500 }
      );
    }

    const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = ai.getGenerativeModel({ model: "gemini-flash-latest" });
    
    // Fetch real-time F1 context
    let contextStr = "";
    try {
      const [standings, schedule] = await Promise.all([
        fetchCurrentStandings(),
        fetchRaceSchedule()
      ]);
      const top3 = standings.slice(0, 3).map((d: any) => `${d.Driver.givenName} ${d.Driver.familyName} (${d.points} pts)`).join(', ');
      
      const now = new Date();
      const upcoming = schedule.find((r: any) => new Date(r.date) >= now) || schedule[0];
      const nextRaceStr = upcoming ? `${upcoming.raceName} at ${upcoming.Circuit.circuitName} on ${upcoming.date}` : "Unknown";
      
      contextStr = `Current Top 3 Drivers: ${top3}. The next upcoming race is the ${nextRaceStr}. The current year is ${now.getFullYear()}.`;
    } catch (e) {
      console.error("Failed to fetch F1 context", e);
    }
    
    const systemInstruction = `You are a Formula 1 expert assistant. Provide accurate, engaging answers about F1 history, stats, and predictions. ALWAYS base your answers on this real-time data if relevant: [${contextStr}]`;
    
    let response;
    try {
      response = await model.generateContent(`${systemInstruction}\n\nUser: ${prompt}`);
    } catch (err: any) {
      if (err.status === 429) {
        return NextResponse.json({ response: "API Rate Limit Exceeded. Please wait a few seconds and try again." }, { status: 429 });
      } else if (err.status === 503) {
        console.log("503 Service Unavailable, returning friendly error.");
        return NextResponse.json({ response: "Google API is currently experiencing high demand. Please try again later." }, { status: 503 });
      } else {
        throw err;
      }
    }

    return NextResponse.json({ response: response.response.text() });
  } catch (error: any) {
    console.error("AI Error:", error);
    return NextResponse.json({ error: "Failed to process AI request" }, { status: 500 });
  }
}
