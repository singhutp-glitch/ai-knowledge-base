import { DOCUMENT_SEARCH_PROMPT } from "../../prompts/documentSearchPrompt.js";
import {generateQueryEmbeddings} from '../../rag/embeddings/queryEmbedding.js'
import { retrieveChunks } from "../../rag/services/retrievelService.js";
const  documentSearchFeature = {
    name:'documentSearch',

    shouldRun(context){
        return context.options.documentSearch;
    },

    async execute(context){
        context.stream.write(`${JSON.stringify({
                type:'status',
                status:"Searching..."
            })}\n`);
        const feature = {};
        
        const queryEmbedding = await generateQueryEmbeddings(context.userPrompt);
        const chunkResults = await retrieveChunks(queryEmbedding,context.chatId);
        console.log('chunkResult - ',chunkResults);
         const resultText = chunkResults.map((chunk,index)=>
        `
Result ${index+1}
content: ${chunk.text}

    `
    ).join('\n');
        const sources = chunkResults;
        context.documentSources = sources;
        feature.name = 'documentSearch';
        feature.instruction = DOCUMENT_SEARCH_PROMPT;
        feature.resource = resultText;
        context.features.push(feature);

        const sourceData = JSON.stringify(
        {
                type:'documentSources',
                sources:context.documentSources
        }) 
        context.stream.write(`${sourceData}\n`);
    }
}

export default documentSearchFeature;