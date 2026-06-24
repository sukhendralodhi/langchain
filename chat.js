import { HumanMessage } from "@langchain/core/messages";
import { ChatOllama } from "@langchain/ollama";

const model = new ChatOllama({
    model: "qwen3:4b",
    temperature: 0,
});

console.time("response");

const response = await model.stream(
    [
        new HumanMessage("What is love? Answer in exactly 3 lines.")
    ]
);

console.timeEnd("response");

for await (const chunk of response) {
    process.stdout.write(chunk.content)
}
