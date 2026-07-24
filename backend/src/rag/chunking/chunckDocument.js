import { fixedChunking } from "./strategies/fixedChunker.js";
import { pagedChunking } from "./strategies/pageWiseChunker.js";

export async function chunkDocument(parsedDocument){
    const chunks = pagedChunking(parsedDocument);
    return chunks
}
