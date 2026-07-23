import { GoogleGenAI } from "@google/genai";
import { config } from "../../../config/env.js";

const ai = new GoogleGenAI({
    apiKey: config.geminiApiKey,
});

export async function geminiEmbedding(texts){
    const response = await ai.models.embedContent({
        model:'gemini-embedding-2',
        contents:texts,
        config: {
            taskType: "RETRIEVAL_DOCUMENT",
            outputDimensionality: 768
        }
    })
    return response.embeddings.map((embedding) => embedding.values);
}

export async function geminiQueryEmbedding(text){
    const response = await ai.models.embedContent({
        model:'gemini-embedding-2',
        contents:text,
        config: {
            taskType: "RETRIEVAL_QUERY",
            outputDimensionality: 768
        }
    })
    return response.embeddings[0].values;
}

