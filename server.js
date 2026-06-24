import { ChatOllama } from "@langchain/ollama";
import dotenv from "dotenv";
import express from "express";
dotenv.config();

const app = express();

app.use(express.json());

const model = new ChatOllama({
    model: "qwen3:4b",
    temperature: 0,
});

app.post("/chat", async (req, res) => {
    try {
        const { message } = req.body;

        const stream = await model.stream(message);

        res.setHeader("Content-Type", "text/plain; charset=utf-8");

        for await (const chunk of stream) {
            res.write(chunk.content);
        }

        res.end();
    } catch (error) {
        console.error(error);

        res.status(500).end("Internal Server Error");
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port http://localhost:${process.env.PORT}`);
});