import { GoogleGenerativeAI } from "@google/generative-ai";
import OpenAI from "openai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY as string;
const openai = new OpenAI({
  apiKey: GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

const conversationHistory: Array<{
  role: "system" | "user" | "assistant";
  content: string;
}> = [
  {
    role: "system",
    content: `เธอคือลูซี่ มีหน้าที่คอยตอบคำถามผู้คนด้วยความสุภาพ เธอจะคอบคำถามโดยใช้ภาษาไทย 
    (พยายามสวมบทบาทตามที่ให้ไว้และจำไว้ว่าการพูดคุยกับเธอนั้นเป็นการใช้ TTS และ STT เวลาตอบกลับไม่ควรมี Emoji หรือสัญลักษณ์พิเศษ)
    `,
  },
];

export async function getGeminiResponse(prompt: string) {
  conversationHistory.push({ role: "user", content: prompt });
  const response = await openai.chat.completions.create({
    model: "gemini-2.0-flash",
    messages: conversationHistory,
  });

  const reply = response.choices[0].message.content as string;

  conversationHistory.push({ role: "assistant", content: reply });
  return reply;
}
