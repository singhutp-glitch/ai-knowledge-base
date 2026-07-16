import { buildContext } from "./contextBuilder/contextBuilder.js";
import documentSearchFeature from "../features/documentSearch/documentSearchFeature.js";

export async function buildPipelineContext(context){
    try{
        const features = [documentSearchFeature];

        for(const feature of features){
            if(feature.shouldRun(context)){
                await feature.execute(context);
            }
        };
        await buildContext(context);

    }catch(error){
        console.error(error);
    }
}