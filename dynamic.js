import { ChatOllama } from "@langchain/ollama";

const model = new ChatOllama(
    {
        model: 'qwen3:8b'
    }
);

const question = "What is useEffect in React?";



const response = await model.stream(question);

for await (const chunk of response) {
    process.stdout.write(chunk.content);
}
