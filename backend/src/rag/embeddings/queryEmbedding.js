import { geminiQueryEmbedding } from "./geminiEmbedding.js";

export async function generateQueryEmbeddings(query){
    const embedding = await geminiQueryEmbedding(query);
    return embedding;
};