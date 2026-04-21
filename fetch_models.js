const https = require('https');

const apiKey = process.env.GEMINI_API_KEY || 'YOUR_API_KEY';
https.get(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const parsed = JSON.parse(data);
    const models = parsed.models.filter(m => m.supportedGenerationMethods && m.supportedGenerationMethods.includes('generateContent'));
    const textModels = models.map(m => m.name).filter(n => !n.includes('audio') && !n.includes('embedding') && !n.includes('vision'));
    console.log(textModels.join('\n'));
  });
}).on('error', err => console.error(err));
