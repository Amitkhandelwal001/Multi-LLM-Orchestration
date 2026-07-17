import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const client = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: "https://openrouter.ai/api/v1",
});

export async function getOpenRouterResponse(prompt) {
    try {
        const response = await client.chat.completions.create({
            model: "deepseek/deepseek-chat-v3-0324",
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
        });

        return response.choices[0].message.content;

    } catch (error) {
        console.error("❌ OpenRouter Error:", error.message);
        return null;
    }
}