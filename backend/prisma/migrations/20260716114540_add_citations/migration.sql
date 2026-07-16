-- DropIndex
DROP INDEX "chunk_embedding_cosine_idx";

-- CreateTable
CREATE TABLE "Citation" (
    "id" SERIAL NOT NULL,
    "citationNumber" INTEGER NOT NULL,
    "messageId" INTEGER NOT NULL,
    "chunkId" INTEGER NOT NULL,

    CONSTRAINT "Citation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Citation_messageId_idx" ON "Citation"("messageId");

-- CreateIndex
CREATE UNIQUE INDEX "Citation_messageId_citationNumber_key" ON "Citation"("messageId", "citationNumber");

-- AddForeignKey
ALTER TABLE "Citation" ADD CONSTRAINT "Citation_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "Message"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Citation" ADD CONSTRAINT "Citation_chunkId_fkey" FOREIGN KEY ("chunkId") REFERENCES "Chunk"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
