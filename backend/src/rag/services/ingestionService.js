import {prisma} from '../../../lib/prisma.js';
import { saveDocument } from "./documentService.js";
import { saveChunk } from "./chunkService.js";

export async function saveDocumentandChunk(data,chunks) {
    return await prisma.$transaction(async (tx) => {

        const document = await saveDocument(tx, {
            name: data.originalname,
            type: data.mimetype,
            size: data.size,
            userId: data.userId,
            chatId: data.chatId,
            storagePath:data.storagePath
        });

        await saveChunk(tx,chunks,document);

        for (const chunk of chunks) {

        const vectorString =`[${chunk.embedding.join(",")}]`;

        await tx.$executeRaw`
                UPDATE "Chunk"
                SET embedding = ${vectorString}::vector
                WHERE "documentId" = ${document.id}
                AND "chunkIndex" = ${chunk.index}
            `;
    }
        return document;
    });
}