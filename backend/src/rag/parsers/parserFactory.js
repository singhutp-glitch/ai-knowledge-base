import { parsePdf } from "./pdfParser.js";
import { parseTxt } from "./txtParser.js";
import { parseDocx } from "./docxParser.js";

export async function parseDocument(file){
    switch(file.mimetype){
        case "application/pdf":
            return await parsePdf(file);
        case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
            return await parseDocx(file);
        case "text/plain":
            return await parseTxt(file);
        default:
            throw new Error('Unsupported file type');
    }
}