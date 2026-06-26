import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import * as dotenv from "dotenv";
dotenv.config();


// create model 

const model = new ChatOpenAI({
    model: "gpt-4.1-mini",
    temperature: 0.7,
});

// const prompt = ChatPromptTemplate.fromTemplate(
//     "You are a comedian. Tell a joke based on the following word {input}"
// );

// create a chain 
// const chain = prompt.pipe(model);

// const res = await chain.invoke({
//     input: "chicken"
// });

// console.log(res);
// console.log(res.content);

// -------------------------------------------------

// second method for creating prompt 

const prompt = ChatPromptTemplate.fromMessages(
    [
        ["system", "Generate a joke based on a word provided by the user."],
        ["user", "{input}"]
    ]
);

const formattedPrompt = await prompt.format({
    input: "dog"
});

const res = await model.invoke(formattedPrompt);

console.log(res.content);


