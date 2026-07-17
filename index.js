import readline from "readline";
import dotenv from "dotenv";

import { getOpenAIResponse } from "./services/openai.js";
import { getOpenRouterResponse } from "./services/openrouter.js";
import { evaluateResponses } from "./services/open-ai-evaluator.js";

dotenv.config();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

console.clear();

console.log("=======================================");
console.log("     Multi-LLM Orchestration CLI");
console.log("=======================================\n");

rl.question("Enter your question:\n> ", async (question) => {

    console.log("\n🤖 Asking OpenAI...");
    console.log("🤖 Asking OpenRouter...\n");

    // Run both models in parallel
    const results = await Promise.allSettled([
        getOpenAIResponse(question),
        getOpenRouterResponse(question),
    ]);

    const openAIAnswer =
        results[0].status === "fulfilled"
            ? results[0].value
            : "❌ OpenAI request failed.";

    const openRouterAnswer =
        results[1].status === "fulfilled"
            ? results[1].value
            : "❌ OpenRouter request failed.";

    console.log("========== OpenAI ==========\n");
    console.log(openAIAnswer);

    console.log("\n============================\n");

    console.log("========== OpenRouter ==========\n");
    console.log(openRouterAnswer);

    console.log("\n============================\n");

    console.log("🧠 Evaluating responses...\n");

    const finalAnswer = await evaluateResponses(
        question,
        openAIAnswer,
        openRouterAnswer
    );

    console.log("========== Final Synthesized Answer ==========\n");
    console.log(finalAnswer);

    console.log("\n==============================================");

    rl.close();
});