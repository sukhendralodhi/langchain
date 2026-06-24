import { ChatOllama } from "@langchain/ollama";

const model = new ChatOllama({
    model: "qwen3:4b",
    temperature: 0,
});

console.time("response");

const response = await model.invoke(
    "What is React? Answer in 3 lines only."
);

console.timeEnd("response");

console.log(response.content);

// import { ChatOllama } from "@langchain/ollama";

// const model = new ChatOllama({
//     model: "qwen3:8b",
//     temperature: 0,
// });

// console.time("response");

// const stream = await model.stream(
//     "What is React?"
// );

// console.timeEnd("response");

// for await (const chunk of stream) {
//     process.stdout.write(chunk.content);
// }