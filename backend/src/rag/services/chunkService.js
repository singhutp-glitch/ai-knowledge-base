export async function saveChunk(db,chunks,document){
    return db.chunk.createMany({
            data: chunks.map(chunk => ({
                documentId: document.id,
                chunkIndex: chunk.index,
                text: chunk.text
            }))})
};

