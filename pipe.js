import { PromptTemplate } from "@langchain/core/prompts";
import { ChatOllama } from "@langchain/ollama";

const llm = new ChatOllama({
    model: "qwen3:4b",
    temperature: 0
});

const prompt = PromptTemplate.fromTemplate(
    "Explain {topic} in simple words"
);

const chain = prompt.pipe(llm);

const response = await chain.invoke(
    {
        topic: "Express JS"
    }
);

console.log(response.content);
