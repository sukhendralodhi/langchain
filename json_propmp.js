import { PromptTemplate } from "@langchain/core/prompts";
import { ChatOllama } from "@langchain/ollama";

const model = new ChatOllama({
    model: "qwen3:4b",
    temperature: 0
});

const prompt = PromptTemplate.fromTemplate(
    `
Generate event details for {event}.

Return ONLY valid JSON.

{{
  "title": "",
  "city": "",
  "price": 0
}}
`
);

const chain = prompt.pipe(model);

const response = await chain.invoke({
    event: "Hackathon",
});

const data = JSON.parse(response.content);

console.log(data);
