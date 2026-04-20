const { GoogleGenerativeAI } = require('@google/generative-ai');

async function testModel(modelName) {
  const ai = new GoogleGenerativeAI("AIzaSyAlaB_txU2b2DKt8TuodHH_yxMpKw26R1I");
  const model = ai.getGenerativeModel({ model: modelName });
  try {
    const response = await model.generateContent("Hello");
    console.log(`[SUCCESS] ${modelName}:`, response.response.text());
  } catch (err) {
    console.log(`[ERROR] ${modelName}:`, err.message);
  }
}

async function main() {
  const modelsToTest = [
    "gemini-1.5-flash",
    "gemini-1.5-pro",
    "gemini-2.5-flash",
    "gemini-2.0-flash",
    "gemini-2.0-flash-exp",
    "gemini-2.0-pro-exp-02-05",
    "gemini-pro"
  ];
  
  for (const m of modelsToTest) {
    await testModel(m);
  }
}
main();
