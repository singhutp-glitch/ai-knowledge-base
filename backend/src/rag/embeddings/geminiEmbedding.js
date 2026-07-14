import { GoogleGenAI } from "@google/genai";
import { config } from "../../../config/env.js";

const ai = new GoogleGenAI({
    apiKey: config.geminiApiKey,
});

export async function geminiEmbedding(texts){
    console.log('embedding call start');
    const response = await ai.models.embedContent({
        model:'gemini-embedding-2',
        contents:texts,
        config: {
            taskType: "RETRIEVAL_DOCUMENT",
            outputDimensionality: 768
        }
    })
    console.log('embedding call end');
    return response.embeddings.map((embedding) => embedding.values);
}

export async function geminiQueryEmbedding(text){
    console.log('query embedding call start');
    console.log('text - ',text);
    const response = await ai.models.embedContent({
        model:'gemini-embedding-2',
        contents:text,
        config: {
            taskType: "RETRIEVAL_QUERY",
            outputDimensionality: 768
        }
    })
    console.log('query embedding call end');
    return response.embeddings[0].values;
}

