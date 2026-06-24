import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import dotenv from "dotenv";
dotenv.config();


const model = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash",
    apiKey: process.env.GOOGLE_API_KEY,
});

// console.log("Google API Key:", process.env.GOOGLE_API_KEY);

// const response = await model.invoke(
//     "Hello"
// );

// console.log(response.content);

// const responses = await model.batch(
//     ["Hello", "How are you?"]
// );

// console.log(responses);


// responses.forEach((res) => {
//     console.log(res.content);
// });

// const response = await model.stream(
//     "Write a short story about a rain?"
// );

// console.log(response);

// for await (const chunk of response) {
//     process.stdout.write(chunk.content);
// }

const response = await model.invoke("Hello");

console.log(response.content);






