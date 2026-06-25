import { StringOutputParser } from "@langchain/core/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { ChatOllama } from "@langchain/ollama";



const llm = ChatOllama({
    model: "qwen3:4b",
    temperature: 0
});

const prompt = PromptTemplate.fromTemplate(
    `You are a {role} teacher.
    Explain {topic} in {level} language.  
    Give {points} points.
    `
);

const parser = new StringOutputParser();

const chain = prompt
    .pipe(llm)
    .pipe(parser);

const response = await chain.invoke({
    role: "Senior",
    topic: "Node Js",
    level: "Simple",
    points: "3"
});

console.log(response);