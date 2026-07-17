import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function evaluateResponses(question, openAIResponse, openRouterResponse) {
    try {
        const prompt = `
You are an expert AI evaluator that can check both the output and give a good opinion.

A user asked the following question:

"${question}"

Here are two responses from different AI models.

-----------------------------
OpenAI Response:
${openAIResponse}

-----------------------------
OpenRouter Response:
${openRouterResponse}

Your task:

1. Compare both responses.
2. Identify the strengths and weaknesses of each and see deeply .
3. Create ONE new response that combines the best parts of both.
4. Do NOT simply copy one response, give an organised response .
5. Return ONLY the final synthesized answer.
`;

        const response = await client.chat.completions.create({
            model: "gpt-4.1",
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
        });

        return response.choices[0].message.content;

    } catch (error) {
        console.error("Evaluator Error:", error.message);
        return null;
    }
}