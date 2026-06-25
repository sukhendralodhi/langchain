import { JsonOutputParser } from "@langchain/core/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { ChatOllama } from "@langchain/ollama";

const model = new ChatOllama({
    model: "qwen3:8b",
    temperature: 0
});

const prompt = PromptTemplate.fromTemplate(`
    Generate event details.

    Return ONLY valid JSON.

    {{
    "title": "",
    "city": "",
    "price": 0
    }}

    Event: {event}
`);

const parser = new JsonOutputParser();

const chain = prompt.pipe(model).pipe(parser);

const response = await chain.invoke({
    event: "Tech Conference"
});

console.log(response);
