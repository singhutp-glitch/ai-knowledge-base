import { geminiEmbedding } from "./geminiEmbedding.js";

export async function generateEmbeddings(chunks) {
    const batchSize = 50;
    const allEmbeddings = [];

    for (let i = 0; i < chunks.length; i += batchSize) {
        const batch = chunks.slice(i, i + batchSize);

        const texts = batch.map((chunk) => ({
            parts: [{ text: chunk.text }]
        }));

        const embeddings = await embedBatchWithRetry(texts);

        if (embeddings.length !== batch.length) {
            throw new Error("Embedding count mismatch");
        }

        allEmbeddings.push(...embeddings);
    }

    if (allEmbeddings.length !== chunks.length) {
        throw new Error("Missing embeddings");
    }

    chunks.forEach((chunk, index) => {
        chunk.embedding = allEmbeddings[index];
    });

    return chunks;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function isRateLimitError(error) {
    return (
        error?.status === 429 ||
        error?.code === 429 ||
        error?.response?.status === 429 ||
        error?.error?.code === 429 ||
        error?.message?.includes("429") ||
        error?.message?.includes("RESOURCE_EXHAUSTED")
    );
}

function getRetryAfterMs(error) {
    const retryAfter =
        error?.response?.headers?.["retry-after"] ??
        error?.headers?.["retry-after"];

    if (!retryAfter) {
        return null;
    }

    const seconds = Number(retryAfter);

    if (!Number.isNaN(seconds)) {
        return seconds * 1000;
    }

    return null;
}


async function embedBatchWithRetry(texts, maxRetries = 5) {
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
            return await geminiEmbedding(texts);
        } catch (error) {
            console.log("error in embedding occurred");
            if (!isRateLimitError(error)) {
                throw error;
            }

            if (attempt === maxRetries) {
                throw new Error(
                    `Embedding failed after ${maxRetries} retries because of rate limiting.`
                );
            }

            console.log("rate limit occurred");
            const retryAfterMs = getRetryAfterMs(error);

            const exponentialDelay =
                1000 * Math.pow(2, attempt);

            const jitter =
                Math.floor(Math.random() * 500);

            const delay =
                retryAfterMs ??
                Math.min(
                    exponentialDelay + jitter,
                    30000
                );

            console.warn(
                `Embedding rate-limited. ` +
                `Retrying in ${Math.ceil(delay / 1000)}s...`
            );

            await sleep(delay);
        }
    }
}