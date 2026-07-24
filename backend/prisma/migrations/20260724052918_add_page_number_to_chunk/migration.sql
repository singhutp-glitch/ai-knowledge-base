/*
  Warnings:

  - Added the required column `endOffset` to the `Chunk` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startOffset` to the `Chunk` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Chunk" ADD COLUMN     "endOffset" INTEGER NOT NULL,
ADD COLUMN     "endPage" INTEGER,
ADD COLUMN     "startOffset" INTEGER NOT NULL,
ADD COLUMN     "startPage" INTEGER;

-- CreateIndex
CREATE INDEX "Chunk_documentId_startPage_idx" ON "Chunk"("documentId", "startPage");
