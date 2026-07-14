import { GoogleGenAI } from "@google/genai";
import { SYSTEM_PROMPT } from "../prompts/chatPrompts.js";
import { config } from "../../config/env.js";

const ai = new GoogleGenAI({
    apiKey: config.geminiApiKey,
});

export async function generateResponseStream(contents) {
  const stream = await ai.models.generateContentStream({
    model: "gemini-3.1-flash-lite",

    contents,

    config: {
      systemInstruction: SYSTEM_PROMPT,

      maxOutputTokens: 1000,

      temperature: 1,
      topP: 0.95,
    },
  });

  return stream;
}