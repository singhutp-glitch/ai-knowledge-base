import {prisma} from '../../../lib/prisma.js';
import { saveDocument } from "./documentService.js";
import { saveChunk } from "./chunkService.js";
import { Prisma } from "../../../generated/prisma/index.js";

export async function saveDocumentandChunk(data, chunks) {

    console.log(
        `Starting database save for ${chunks.length} chunks`
    );

    console.time("Total transaction");

    const result = await prisma.$transaction(
        async (tx) => {

            console.time("saveDocument");

            const document = await saveDocument(tx, {
                name: data.originalname,
                type: data.mimetype,
                size: data.size,
                userId: data.userId,
                chatId: data.chatId,
                storagePath: data.storagePath
            });

            console.timeEnd("saveDocument");


            console.time("saveChunk");

            await saveChunk(tx, chunks, document);

            console.timeEnd("saveChunk");


            console.time("prepareEmbeddingValues");

            const values = chunks.map((chunk) => {

                const chunkIndex = Number(chunk.index);

                if (!Number.isInteger(chunkIndex)) {
                    throw new Error(
                        `Invalid chunk index: ${chunk.index}`
                    );
                }

                const vectorString =
                    `[${chunk.embedding.join(",")}]`;

                return Prisma.sql`
                    (${chunkIndex}::integer, ${vectorString})
                `;
            });

            console.timeEnd("prepareEmbeddingValues");


            console.time("updateEmbeddings");

            await tx.$executeRaw`
                UPDATE "Chunk" AS c
                SET embedding = v.embedding::vector
                FROM (
                    VALUES ${Prisma.join(values)}
                ) AS v("chunkIndex", embedding)
                WHERE c."documentId" = ${document.id}
                AND c."chunkIndex" = v."chunkIndex"
            `;

            console.timeEnd("updateEmbeddings");


            return document;
        },{
            timeout:30000
        }
    );

    console.timeEnd("Total transaction");

    console.log(
        `Database save completed for ${chunks.length} chunks`
    );

    return result;
}