import { TextLoader } from "@langchain/classic/document_loaders/fs/text";

const loader = new TextLoader("./react.txt");
const docs = await loader.load();

console.log(docs);