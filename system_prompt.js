import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { ChatOllama } from "@langchain/ollama";

const chatOllama = new ChatOllama({
    model: "qwen3:4b",
    temperature: 0,
});

const response = await chatOllama.invoke([
    new SystemMessage("You are a senior React developer."),
    new HumanMessage("Explain useEffect in 3 line"),
]);

console.log(response.content);
