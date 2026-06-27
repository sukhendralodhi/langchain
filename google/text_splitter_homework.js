import { Document } from "@langchain/core/documents";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";


const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 100,
    chunkOverlap: 20
});

async function handleTextSplitter() {
    const text = `Learning software development is a journey that requires patience, consistency, and curiosity. Every project, bug, and challenge teaches something valuable. By practicing regularly, building real-world applications, and understanding core concepts instead of memorizing code, you gradually become a more confident and capable developer prepared for increasingly complex problems.`;

    const chunk = await splitter.splitText(text);
    return chunk;
}

// const result = await handleTextSplitter();
// console.log(result);

async function handleDocumenSplitter() {
    const docs = [
        new Document({
            pageContent: `Learning software development is a journey that requires patience, consistency, and curiosity. 
            Every project, bug, and challenge teaches something valuable. 
            By practicing regularly, building real-world applications, and understanding core concepts instead of memorizing code, you gradually become a more confident and capable developer prepared for increasingly complex problems.`
        })
    ];

    const chunk = await splitter.splitDocuments(docs);
    return chunk;
}

const splitDocs = await handleDocumenSplitter();
console.dir(splitDocs, { depth: null });