import fs from "fs/promises";
import { PDFParse } from "pdf-parse";

export async function parsePdf(file) {
    const buffer = file.buffer;

    const parser = new PDFParse({
        data: buffer
    });

    try {
        const result = await parser.getText();

        return {
            text: result.text,
            metaData:{
                fileName:file.originalname,
                fileType: file.mimetype,
                uploadedAt: new Date()
            }
        };
    } finally {
        await parser.destroy();
    }
}