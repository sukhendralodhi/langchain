import { CommaSeparatedListOutputParser, StringOutputParser, StructuredOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import dotenv from "dotenv";
import z from "zod";
dotenv.config();


const model = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash",
    apiKey: process.env.GOOGLE_API_KEY,
});

async function callStringOutputParser() {
    const parser = new StringOutputParser();

    const prompt = ChatPromptTemplate.fromMessages(
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

// const response = await callStringOutputParser();
// console.log(response)

async function callListOutputParser() {

    try {
        const parser = new CommaSeparatedListOutputParser();
        const prompt = ChatPromptTemplate.fromTemplate(
            `Provide 5 synonyms, seprated by commas, for the following word {word}`
        )
        const chain = prompt.pipe(model).pipe(parser);

        return chain.invoke({
            word: "Happy"
        })
    } catch (error) {
        console.error("Error while generating synonyms:", error.message);

        // Return a fallback value
        return [];
    }

}

// const response = await callListOutputParser();
// console.log(response);

async function callStructuredOutputParser() {

    const parser = StructuredOutputParser.fromNamesAndDescriptions({
        name: "The name of person",
        age: "The age of person"
    });

    const prompt = ChatPromptTemplate.fromTemplate(`

        Extract information from the following phrase. 
        Formatting Instructions: {format_instructions}
        Phrase: {phrase}
        
    `);

    const chain = prompt.pipe(model).pipe(parser);


    return await chain.invoke({
        format_instructions: parser.getFormatInstructions(),
        phrase: "Max is 30 years old"
    })
}


// const response = await callStructuredOutputParser();
// console.log(response);

async function callStructuredOutoutParserWithZod() {
    const parser = StructuredOutputParser.fromZodSchema(
        z.object({
            name: z.string(),
            age: z.number()
        })
    );

    const prompt = ChatPromptTemplate.fromTemplate(`
        Extract information.

        {format_instructions}

        Phrase: {phrase}
    `);

    const chain = prompt.pipe(model).pipe(parser);

    return await chain.invoke({
        format_instructions: parser.getFormatInstructions(),
        phrase: "Max is 30 years old"
    });
}

// const response = await callStructuredOutoutParserWithZod();
// console.log(response);

async function recipe(recipe) {
    const parser = StructuredOutputParser.fromZodSchema(
        z.object({
            recipe: z.string().describe("Recipe name"),

            ingredients: z
                .array(z.string())
                .describe("List of ingredients"),

            instruction: z
                .string()
                .describe("Step-by-step cooking instructions"),
        })
    );
    const prompt = ChatPromptTemplate.fromTemplate(`
        You are an expert chef. Generate a delicious recipe based on the following request.
        Request: {user_request}
        {format_instructions}
    `)

    const chain = prompt.pipe(model).pipe(parser);

    return await chain.invoke({
        user_request: `${recipe}`,
        format_instructions: parser.getFormatInstructions()
    })
}

const response = await recipe("Maggie");
console.log(response);