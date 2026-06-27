import { createStuffDocumentsChain } from '@langchain/classic/chains/combine_documents';
import { Document } from '@langchain/core/documents';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import dotenv from 'dotenv';
dotenv.config();


const model = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash",
    apiKey: process.env.GOOGLE_API_KEY,
    temprature: 0,
});


const docs = [
    new Document({
        pageContent: "JavaScript is a programming language used to build websites.",
    }),
    new Document({
        pageContent: "Node.js allows JavaScript to run outside the browser.",
    }),
    new Document({
        pageContent: "React is a JavaScript library for building user interfaces.",
    }),
];

const prompt = ChatPromptTemplate.fromTemplate(`
    You are a helpful assistant.
    Answer the user's question ONLY using the context below.
    Context: {context}
    Question: {input}
`);

const chain = await createStuffDocumentsChain({
    llm: model,
    prompt: prompt
});

const response = await chain.invoke({
    input: "What is Node.js?",
    context: docs
});

console.log(response);