-- This is an empty migration.

CREATE INDEX chunk_embedding_cosine_idx
ON "Chunk"
USING hnsw (embedding vector_cosine_ops);