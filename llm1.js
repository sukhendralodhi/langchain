import { PromptTemplate } from "@langchain/core/prompts";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import dotenv from "dotenv";

dotenv.config();

const model = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash",
    apiKey: process.env.GOOGLE_API_KEY,
});

try {
    const prompt = PromptTemplate.fromTemplate(
        "Explain {topic} in simple words"
    );
    const chain = prompt.pipe(model);

    const response = await chain.invoke(
        { topic: "React" }
    )

    console.log(response.content);

} catch (error) {
    console.log("Message:", error.message);
    console.log("Status:", error.status);
    console.log("Reason:", error.rateLimitReason);
}
