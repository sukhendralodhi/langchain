import { CommaSeparatedListOutputParser, StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";

const model = new ChatOpenAI({
    model: "",
    temprature: 0.7
});


async function callStringOutputParser() {
    const parser = new StringOutputParser();

    const prompt = ChatPromptTemplate(
        [
            ["system", "Generate a joke based on a word provided by the user."],
            ["user", "{input}"]
        ]
    );
    const chain = prompt.pipe(model).pipe(parser);
    return await chain.invoke({
        input: "Dog"
    });

}

async function callListOutputParser() {
    const prompt = ChatPromptTemplate.fromTemplate(`
        Provide 5 synonyms, seprated by commas, for the following word {word}
        `)

    const parser = CommaSeparatedListOutputParser();

    const chain = prompt.pipe(model).pipe(parser);

    return chain.invoke({
        word: "Happy",
    });
}

// const response = await callStringOutputParser()

// console.log(response)

async function callListOutputParser(params) {
    const prompt = ChatPromptTemplate.fromTemplate()
}