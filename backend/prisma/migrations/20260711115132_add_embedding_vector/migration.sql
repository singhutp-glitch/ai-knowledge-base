-- This is an empty migration.
-- Add pgvector embedding column.
-- This column is intentionally omitted from schema.prisma because
-- Prisma does not currently support the PostgreSQL vector type.

CREATE EXTENSION IF NOT EXISTS vector;

ALTER TABLE "Chunk"
ADD COLUMN embedding vector(768);