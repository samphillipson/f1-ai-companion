const { GoogleGenerativeAI } = require('@google/generative-ai');

async function main() {
  const ai = new GoogleGenerativeAI("AIzaSyAlaB_txU2b2DKt8TuodHH_yxMpKw26R1I");
  const model = ai.getGenerativeModel({ model: "gemini-flash-latest" });
  try {
    const response = await model.generateContent("Who won the 2021 Championship?");
    console.log(response.response.text());
  } catch (err) {
    console.error(err);
  }
}
main();
