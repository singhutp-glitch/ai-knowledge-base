import { tavily } from "@tavily/core";
import { config } from "../../../config/env.js";
const tvly = tavily({ apiKey:config.tavilyApiKey });

export async function searchWeb(query){
    try{
        const response = await tvly.search(query);
        return response;
    }catch(error){
        console.error(error);
    }
};