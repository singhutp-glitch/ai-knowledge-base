
export function fixedChunking(parsedDocument){
    let start = 0;
    let chunksIndex = 0
    const chunkSize = 1000;
    const overlap = 200;
    const chunks=[];
    while(start< parsedDocument.text.length){
        const end  = start +chunkSize;
        const chunkText = parsedDocument.text.slice(start,end);
        const chunk = {
            text:chunkText,
            index:chunksIndex,
            metaData:{
                ...parsedDocument.metaData,
                chunkLength:chunkText.length
            }
        }
        chunks.push(chunk);
        start = end - overlap;
        chunksIndex++;
    }
    return chunks;
}