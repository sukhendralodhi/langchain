import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";


const loader = new CheerioWebBaseLoader(
    "https://www.activehumanrightsjusticefoundation.org/"
);

const doc = await loader.load();

console.log(doc);
