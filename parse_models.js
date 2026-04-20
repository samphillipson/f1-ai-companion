const fs = require('fs');
const data = JSON.parse(fs.readFileSync('models.json', 'utf8'));
const models = data.models.filter(m => m.supportedGenerationMethods && m.supportedGenerationMethods.includes('generateContent')).map(m => m.name);
fs.writeFileSync('output.txt', models.join('\n'));
