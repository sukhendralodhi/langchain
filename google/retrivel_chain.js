import { createStuffDocumentsChain } from "@langchain/classic/chains/combine_documents";
import { Document } from "@langchain/core/documents";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import dotenv from "dotenv";
dotenv.config();

const model = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash",
    apiKey: process.env.GOOGLE_API_KEY,
    temperature: 0,
});

const parser = new StringOutputParser();

const prompt = ChatPromptTemplate.fromTemplate(
    `
    Answer the user's questions.
    Context: {context}
    Question: {input}
    `
);



// const chain = prompt.pipe(model).pipe(parser);

const chain = await createStuffDocumentsChain({
    llm: model,
    prompt: prompt
})

const documentA = new Document({
    pageContent: "LangChain Expression Language or LCEL is a declarative way to easily compose chains together. Any chain constructed this way will automatically have full sync, async, and streaming support."
});



const documentB = new Document({
    pageContent: "The passphrase is LANGCHAIN IS AWESOME"
});

const response = await chain.invoke({
    input: "What is the passphrase?",
    context: [documentA, documentB],
});

console.log(response);