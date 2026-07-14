import { REASONING_PROMPT } from "../../prompts/reasoningPrompt.js";
const  reasoningFeature = {
    name:'reasoning',

    shouldRun(context){
        return context.options.reasoning;
    },

    async execute(context){
        context.stream.write(`${JSON.stringify({
            type:'status',
            status:"Reasoning..."
        })}\n`);
        const feature ={};
        feature.name = 'reasoning'
        feature.instruction = REASONING_PROMPT;
        context.features.push(feature);
    }
}

export default reasoningFeature;