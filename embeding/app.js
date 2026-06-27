import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import "dotenv/config";

const embeddings = new GoogleGenerativeAIEmbeddings({
    model: "gemini-embedding-001",
    googleApiKey: process.env.GOOGLE_API_KEY,
});

const vector = await embeddings.embedQuery("What is JavaScript?");

console.log(vector.length);
console.log(vector.slice(0, 10));