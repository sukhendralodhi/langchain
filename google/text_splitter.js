import { Document } from "@langchain/core/documents";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 50,
    chunkOverlap: 10,
});


async function handleTextSplitter() {
    const text = `
    JavaScript is a programming language.

    Node.js allows JavaScript to run outside browsers.

    React is used for building user interfaces.
`;

    return await splitter.splitText(text);

}

// const result = await handleTextSplitter();
// console.log(result);

async function handleDocumentSplitter() {
    const docs = [
        new Document({
            pageContent: `
            JavaScript is a programming language.

            Node.js allows JavaScript to run outside browsers.

            React is used for building user interfaces.
            `
        })
    ];

    const splitDocs = await splitter.splitDocuments(docs);

    return splitDocs;
}

const result = await handleDocumentSplitter();
console.log(result);

