import { buildPrompt } from "./promptBuilder.js";

export async function buildContext(context){
    const contents =
        context.userMessages.map(message => ({
            role:
                message.role ===
                "assistant"
                    ? "model"
                    : "user",

            parts: [
                {
                    text:
                        message.content,
                },
            ],
        }));
        const finalPrompt = buildPrompt(context);
        contents[contents.length - 1] ={
            role:"user",
            parts: [
                {
                    text:finalPrompt,
                },
            ],
        }
        context.contents = contents;
        return;
}