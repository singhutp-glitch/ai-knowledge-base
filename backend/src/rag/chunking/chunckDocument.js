import { fixedChunking } from "./strategies/fixedChunker.js";

export async function chunkDocument(parsedDocument){
    const chunks = fixedChunking(parsedDocument);
    return chunks
}
