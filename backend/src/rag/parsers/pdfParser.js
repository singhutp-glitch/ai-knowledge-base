import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

export async function parsePdf(file) {
    const data = new Uint8Array(file.buffer);

    try {
        const pdf = await pdfjsLib.getDocument({ data }).promise;

        const pages = [];
        let fullText = "";

        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            const page = await pdf.getPage(pageNum);

            const textContent = await page.getTextContent();

            const pageText = textContent.items
                .map((item) => item.str)
                .join(" ")
                .replace(/\s+/g, " ")
                .trim();

            // Offset where this page begins inside fullText
            const startOffset = fullText.length;

            // Append page text to the continuous document
            fullText += pageText;

            // Offset where this page ends
            const endOffset = fullText.length - 1;

            pages.push({
                pageNumber: pageNum,
                startOffset,
                endOffset,
                text: pageText,
            });

            // Add separator between pages (except after the last page)
            if (pageNum < pdf.numPages) {
                fullText += "\n\n";
            }
        }

        return {
            fullText,

            metadata: {
                fileName: file.originalname,
                mimeType: file.mimetype,
                pageCount: pdf.numPages,
            },

            pages,
        };
    } catch (error) {
        throw new Error(`Failed to parse PDF: ${error.message}`);
    }
}