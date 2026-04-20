import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

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
    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    // In a real app, we would fetch Jolpica API data here to inject into the prompt
    // to give the AI context about F1. For now, we simulate the context injection.
    const systemInstruction = `You are a Formula 1 expert assistant. Provide accurate, engaging answers about F1 history, stats, and predictions.`;
    
    const response = await model.generateContent(`${systemInstruction}\n\nUser: ${prompt}`);

    return NextResponse.json({ response: response.response.text() });
  } catch (error: any) {
    console.error("AI Error:", error);
    return NextResponse.json({ error: "Failed to process AI request" }, { status: 500 });
  }
}
