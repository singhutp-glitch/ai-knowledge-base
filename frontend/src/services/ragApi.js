import api from "./axiosApi";   // your existing axios instance
import { getAuthToken } from "../auth/authSession";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


export async function uploadDocument(
    file,
    chatId,
    onStatus,
    onComplete,
    onError
) {
    console.log("upload function called");
    const formData = new FormData();

    formData.append("document", file);

    const token = getAuthToken();



    console.log("upload api called");
        const response = await fetch(
            `${API_BASE_URL}/rag/chats/${chatId}/documents`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            }
        );

    console.log("upload response received");
        if (!response.ok) {
            let errorMessage = "Document upload failed.";

            try {
                const errorData = await response.json();
                errorMessage =
                    errorData.message || errorData.error || errorMessage;
            } catch {
                // Response was not JSON
            }

            onError?.(errorMessage);
            return;
        }

        if (!response.body) {
            throw new Error("Streaming response is not available.");
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        let buffer = "";

        while (true) {
            const { done, value } = await reader.read();

            if (done) break;

            buffer += decoder.decode(value, { stream: true });

            const lines = buffer.split("\n");

            // Keep incomplete line for the next chunk
            buffer = lines.pop() || "";

            for (const line of lines) {
                if (!line.trim()) continue;

                try {
                    const data = JSON.parse(line);

                    if (data.type === "status") {
                        onStatus?.(data.status);
                    }

                    if (data.type === "completed") {
                        onComplete?.(data.message);
                    }

                    if (data.type === "error") {
                        onError?.(data.error);
                    }
                } catch (error) {
                    console.error("Failed to parse:", line, error);
                }
            }
        }

        // Process any remaining buffered data after stream ends
        if (buffer.trim()) {
            try {
                const data = JSON.parse(buffer);

                if (data.type === "status") {
                    onStatus?.(data.status);
                }

                if (data.type === "completed") {
                    onComplete?.(data.message);
                }

                if (data.type === "error") {
                    onError?.(data.error);
                }
            } catch (error) {
                console.error("Failed to parse final buffer:", buffer, error);
            }
        }
     
}


export async function sendRetrievalQuery(currentChatId,userQuery){
     
    const token = getAuthToken();
    const response = await fetch(
        `${API_BASE_URL}/rag/chats/${currentChatId}/chunks`,
        {
            method: "POST",
            headers: {
                "Content-Type":
                    "application/json",
                    Authorization:`Bearer ${token}`
            },
            body: JSON.stringify({
                message: userQuery
            }),
        }
    );
    return response.json();
}