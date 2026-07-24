import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';


export async function parsePdf(file) {
   
    const data = new Uint8Array(file.buffer);
    const loadingTask = pdfjsLib.getDocument({ data });
    const pdf = await loadingTask.promise;
    const pages =[];
    try {
         for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);

        // Extract text items from this page
        const textContent = await page.getTextContent();

        // Join all text items into one string
        const pageText = textContent.items
            .map(item => item.str)
            .join(' ')
            .replace(/\s+/g, ' ')
            .trim();

        pages.push({
            pageNumber: pageNum,
            text: pageText
        });
    }

    return {
        pageCount: pdf.numPages,
        pages,
         metaData:{
                fileName:file.originalname,
                fileType: file.mimetype,
                uploadedAt: new Date()
        }}

    }catch(error){
        console.error(error);
    }
}