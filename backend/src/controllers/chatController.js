import { generateResponseStream } from "../services/geminiService.js";
import { saveMessages } from "../services/databaseService.js";
import { createNewChat } from "../services/databaseService.js";
import { loadMessages } from "../services/databaseService.js";
import { searchChatIdwithUserId } from "../services/databaseService.js";
import { loadChats } from "../services/databaseService.js";
import { buildPipelineContext } from "../pipeline/pipeline.js";
const sendMessage = async (req,res) => {
        let superSources=[];
    let fullResponse = "";
    let superChatId=0
    try{
        const prompt = req.body.message;
        const webSearch = req.body.webSearch;
        const reasoning = req.body.reasoning;
        const documentSearch = req.body.documentSearch;
        const chatId = +req.params.chatId;
        superChatId=chatId;
        
        if(!prompt?.trim()){
            return res.status(400).json({
                error:'Prompt is required'
            })
        }
        const userChat = await searchChatIdwithUserId(req.user.userId,chatId);
        if(!userChat){
            return res.status(404).json({
                error:'Chat not found'
            })
        };

            await saveMessages(
            chatId,
            "user",
            prompt
        );


        const messages = await loadMessages(chatId);

        const context = {
            userMessages:messages,
            userPrompt:prompt,
            chatId:chatId,
            options:{
                webSearch,
                reasoning,
                documentSearch
            },
            searchSources:null,
            documentSources:null,
            metaData:{},
            stream:res,
            features:[],
            contents:[]
        };

        await buildPipelineContext(context);

        superSources = context.searchSources;
        res.write(`${JSON.stringify({
                type:'status',
                status:"Generating..."
            })}\n`);
    
        const stream =
            await generateResponseStream(
                context.contents
            );
            
        for await (const chunk of stream) {

            const text =
                chunk.text || "";

            fullResponse += text;
            const textData = JSON.stringify({
                type:'token',
                text,
            })
            res.write(`${textData}\n`);
        }
        await saveMessages(
            chatId,
            "assistant",
            fullResponse,
            context.searchSources,
        );

        res.end();
                
    }catch(error){
    console.error(error);

    if(fullResponse.length > 0){
        await saveMessages(
            superChatId,
            "assistant",
            fullResponse +
            "\n\n[Response interrupted]",
            superSources
        );
    }else{
        await saveMessages(
            superChatId,
            "assistant",
            "Failed to generate response"
        );
    }
    res.write(`${JSON.stringify({
                type:'error',
                error:'Failed to generate response',})}\n`);

    res.end();
}
};

const createChatPost = async(req,res) => {
    try{
        const prompt = req.body.message;
        if(!prompt?.trim()){
            return res.status(500).json({
                error:'Prompt is required'
            })
        };
        
        const chat = await createNewChat(req.user.userId,prompt);
        return res.json({
            chatId:chat.id
        });
        
    }catch(error){
        console.error(error);
        res.status(500).json({
            error:'Failed to create new chat'
        })
    }
}

const loadChatsGet = async (req,res) => {
    try{
        const userChats = await loadChats(req.user.userId);
        return res.json(userChats);

    }catch(error){
        console.error(error);
        res.status(500).json({
            error:'Failed to load chats'
        })
    }
};

const loadMessagesGet = async (req,res) => {
    try{
        const chatId = +req.params.chatId;

        const userChat = await searchChatIdwithUserId(req.user.userId,chatId);
        if(!userChat){
            return res.status(404).json({
                error:'Chat not found'
            })
        };
        const messages = await loadMessages(chatId);
        return res.json(messages);

    }catch(error){
        console.error(error);
        res.status(500).json({
            error:'Failed to load messages'
        })
    }
};

export default {
    sendMessage,
    createChatPost,
    loadChatsGet,
    loadMessagesGet
}