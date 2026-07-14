import { geminiQueryEmbedding } from "./geminiEmbedding.js";

export async function generateQueryEmbeddings(query){
    console.log('query - ',query);
    const embedding = await geminiQueryEmbedding(query);
    return embedding;
};