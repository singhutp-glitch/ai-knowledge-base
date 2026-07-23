import { generateQueryEmbeddings } from "../embeddings/queryEmbedding.js";
import { retrieveChunks } from "../services/retrievelService.js";
import { searchChatIdwithUserId } from "../../services/databaseService.js";

export async function getChunks(req,res){
     try{
            const chatId = Number(req.params.chatId);
            const query = req.body.message;

            if (Number.isNaN(chatId)) {
                return res.status(400).json({
                    error: "Invalid chat id"
                });
            }
            
            const userChat = await searchChatIdwithUserId(req.user.userId,chatId);
            if(!userChat){
                return res.status(404).json({
                    error:'Chat not found'
                })
            };
    
            if (!query) {
                return res.status(400).json({
                    error: "Query is required"
                });
            }
            const queryEmbedding = await generateQueryEmbeddings(query);
            const chunkResults = await retrieveChunks(queryEmbedding,chatId);

                res.status(200).json({
                    message:'Retrieval successful',
                    chunkResults
                })
            }catch(error){
                console.error(error);
                return res.status(500).json({
                error:'Error while retrievel'
            })          
        }
}