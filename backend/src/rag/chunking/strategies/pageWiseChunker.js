
export function pagedChunking(parsedDocument, chunkSize = 1000, overlap = 200) {
    const chunks = [];

    const { fullText, pages } = parsedDocument;

    let start = 0;

    // Pointer into the pages array
    let startPageIndex = 0;
    let endPageIndex = 0;
    let chunkIndex = 0;

    while (start < fullText.length) {

        const end = Math.min(start + chunkSize, fullText.length);

        // Advance start page pointer if necessary
        while (
            startPageIndex < pages.length - 1 &&
            start > pages[startPageIndex].endOffset
        ) {
            startPageIndex++;
        }

        // End page can never be before the start page
        if (endPageIndex < startPageIndex) {
            endPageIndex = startPageIndex;
        }

        // Advance end page pointer if necessary
        while (
            endPageIndex < pages.length - 1 &&
            (end - 1) > pages[endPageIndex].endOffset
        ) {
            endPageIndex++;
        }

        chunks.push({
            text: fullText.slice(start, end),
            index:chunkIndex,

            startOffset: start,
            endOffset: end - 1,

            startPage: pages[startPageIndex].pageNumber,
            endPage: pages[endPageIndex].pageNumber,
        });

        chunkIndex++;

        if (end === fullText.length) break;

        start = end - overlap;
    }

    return chunks;
}