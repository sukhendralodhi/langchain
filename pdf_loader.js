import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

const loader = new PDFLoader("./sample.pdf");
const doc = await loader.load();
console.log(doc);
