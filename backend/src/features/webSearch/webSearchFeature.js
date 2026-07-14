import { searchWeb } from "./searchService.js";
import { SEARCH_PROMPT } from "../../prompts/searchPrompts.js";

const  webSearchFeature = {
    name:'webSearch',

    shouldRun(context){
        return context.options.webSearch;
    },

    async execute(context){
        context.stream.write(`${JSON.stringify({
                type:'status',
                status:"Searching..."
            })}\n`);
        const feature = {};
        const searchResults = await searchWeb(context.userPrompt);
         const resultText = searchResults.results.map((result,index)=>
        `
Result ${index+1}
title: ${result.title}
url: ${result.url}
content: ${result.content}

    `
    ).join('\n');
        const sources = searchResults.results.map((result,index)=>{
                    return {
                        title:result.title,
                        url:result.url
                    }
                });
        context.searchSources = sources;
        feature.name = 'webSearch';
        feature.instruction = SEARCH_PROMPT;
        feature.resource = resultText;
        context.features.push(feature);

        const sourceData = JSON.stringify(
        {
                type:'sources',
                sources:context.searchSources
        }) 
        context.stream.write(`${sourceData}\n`);
    }
}

export default webSearchFeature;