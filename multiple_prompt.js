import { PromptTemplate } from "@langchain/core/prompts";
import { ChatOllama } from "@langchain/ollama";

const llm = new ChatOllama(
    {
        model: "qwen3:4b",
        temperature: 0
    }
);

const prompt = PromptTemplate.fromTemplate(
    `
    You are a {role}.

    Explain {topic} in {level} language.

    Give {points} points.
    `
);

const formattedPrompt = await prompt.format({
    role: "Senior",
    topic: "Node Js",
    level: "Simple",
    points: "3"
});


const response = await llm.invoke(formattedPrompt);

console.log(response.content);