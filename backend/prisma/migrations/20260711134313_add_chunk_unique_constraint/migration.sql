/*
  Warnings:

  - You are about to drop the column `embedding` on the `Chunk` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[documentId,chunkIndex]` on the table `Chunk` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Chunk" DROP COLUMN "embedding";

-- CreateIndex
CREATE UNIQUE INDEX "Chunk_documentId_chunkIndex_key" ON "Chunk"("documentId", "chunkIndex");
