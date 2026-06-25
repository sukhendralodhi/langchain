import { PromptTemplate } from "@langchain/core/prompts";
import { ChatOllama } from "@langchain/ollama";

const llm = new ChatOllama(
    {
        model: "qwen3:4b",
        temperature: 0,
    }
);

const prompt = PromptTemplate.fromTemplate(
    "Explain {topic} in {level} language"
);

const formattedPrompt = await prompt.format(
    {
        topic: "React",
        level: "Beginner"
    }
);

const response = await llm.invoke(formattedPrompt);

console.log(response.content);