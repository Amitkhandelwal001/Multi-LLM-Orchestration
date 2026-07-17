import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function getOpenAIResponse(prompt) {
    try {
        const response = await client.responses.create({
            model: "gpt-4.1-mini",
            input: prompt,
        });

        return response.output_text;

    } catch (error) {
        console.error("❌ OpenAI Error:", error.message);
        return null;
    }
}