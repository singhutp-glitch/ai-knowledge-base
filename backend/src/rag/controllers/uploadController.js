import { parseDocument } from "../parsers/parserFactory.js";
import { chunkDocument } from "../chunking/chunckDocument.js";
import { saveDocument } from "../services/documentService.js";
import { saveChunk } from "../services/chunkService.js";
import { saveDocumentandChunk } from "../services/ingestionService.js";
import { generateEmbeddings } from "../embeddings/embeddingService.js";
import { searchChatIdwithUserId } from "../../services/databaseService.js";
import {uploadDocument} from '../../services/storageService.js'
import { createStoragePath } from "../../services/storageService.js";

export default async function postUploadDocument(req,res){
    if(!req.file){
        return res.status(400).json({
            error:'No file uploaded'
        })
    }
    try{
        const chatId = Number(req.params.chatId);

        const userChat = await searchChatIdwithUserId(req.user.userId,chatId);
        if(!userChat){
            return res.status(404).json({
                error:'Chat not found'
            })
        };
        const storagePath = createStoragePath(req.user.userId,chatId,req.file);
        await uploadDocument(req.buffer,storagePath,req.file.mimetype);

        const parsedDocument = await parseDocument(req.file);
        console.log('result - ',parsedDocument.text.substring(0,500));
        const chunks = await chunkDocument(parsedDocument);

        const finalChunks = await generateEmbeddings(chunks);
        console.log('final chunks- ',finalChunks.slice(0,3));


        const document = await saveDocumentandChunk({
            originalname: req.file.originalname,
            mimetype: req.file.mimetype,
            size: req.file.size,
            userId: req.user.userId,
            chatId: chatId,
            path:storagePath
        },chunks);
        
            console.log('document - ',document);

            res.status(200).json({
                message:'Upload successful'
            })
        }catch(error){
            console.error(error);
            return res.status(500).json({
            error:'Error in uploading file'
        })          
        }

};