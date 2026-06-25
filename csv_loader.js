import { CSVLoader } from "@langchain/community/document_loaders/fs/csv";

const loader = new CSVLoader("./emp.csv");
const doc = await loader.load();
console.log(doc);
