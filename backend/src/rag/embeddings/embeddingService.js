import { geminiEmbedding } from "./geminiEmbedding.js";

export async function generateEmbeddings(chunks){
    const batchSize = 50;
    const allEmbeddings =[];
    for(let i= 0;i<chunks.length;i+=batchSize){
        const batch = chunks.slice(i,i+batchSize);
        const texts = batch.map((chunk) => {return {
            parts:[{text:chunk.text}]
        }});
    
        const embeddings = await geminiEmbedding(texts);
        if (embeddings.length !== batch.length) {
            throw new Error("Embedding count mismatch");
        }
        allEmbeddings.push(...embeddings);
    }
    if (allEmbeddings.length !== chunks.length) {
    throw new Error("Missing embeddings");
}
    chunks.forEach((chunk,index)=>
        {chunk.embedding = allEmbeddings[index];});    
    
    return chunks;
}