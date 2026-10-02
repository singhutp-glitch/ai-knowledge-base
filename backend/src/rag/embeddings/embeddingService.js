import { geminiEmbedding } from "./geminiEmbedding.js";

export async function generateEmbeddings(chunks) {
    const batchSize = 50;
    const allEmbeddings = [];
    console.log("number of chunks - ",chunks.length);
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
        error?.status === 429 );
}

function getRetryAfterMs(error) {
    try {
        const parsed = JSON.parse(error.message);

        const retryInfo = parsed.error?.details?.find(
            (detail) =>
                detail["@type"] ===
                "type.googleapis.com/google.rpc.RetryInfo"
        );

        if (!retryInfo?.retryDelay) {
            return null;
        }

        const seconds = parseFloat(
            retryInfo.retryDelay.replace("s", "")
        );

        return seconds * 1000; // milliseconds
    } catch (err) {
        console.error("Failed to extract retry delay:", err);
        return null;
    }
}

async function embedBatchWithRetry(texts, maxRetries = 6) {
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
                1000 * Math.pow(2, attempt+4);

            const jitter =
                Math.floor(Math.random() * 1000);

            const delay =
                retryAfterMs ??
                Math.min(
                    exponentialDelay + jitter,
                    600000
                );
            if (delay>600000) {
                throw new Error(
                    `Delay of ${delay/1000}s exceeded upper limit.`
                );
            }

            console.warn(
                `Embedding rate-limited. ` +
                `Retrying in ${Math.ceil(delay / 1000)}s...`
            );

            await sleep(delay);
        }
    }
}