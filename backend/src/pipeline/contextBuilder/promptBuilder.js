export function buildPrompt(context){
let finalPrompt;
if(context.features.length>0){
    
    const enabledCapabilities = context.features.map((feature)=>
        `<${feature.name}>
    <instruction>
    ${feature.instruction}
    </instruction>
    <resource>
    ${feature.resource?feature.resource:`None`}
    </resource>
    </${feature.name}>
    `); 
    finalPrompt = 
`
<enabledCapabilities>
    ${enabledCapabilities}
</enabledCapabilities>
<task>
    <objective>
        Answer user question using above instructions
    </objective>
    <userQuestion>
        ${context.userPrompt}
    </userQuestion>
</task>
`
}else{
    finalPrompt = 
`
<enabledCapabilities>
    -None
</enabledCapabilities>
<task>
    <objective>
        Answer user question
    </objective>
    <userQuestion>
        ${context.userPrompt}
    </userQuestion>
</task>
`
};
    return finalPrompt;

};

