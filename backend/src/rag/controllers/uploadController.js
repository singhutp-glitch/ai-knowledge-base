import { parseDocument } from "../parsers/parserFactory.js";
import { chunkDocument } from "../chunking/chunckDocument.js";
import { saveDocumentandChunk } from "../services/ingestionService.js";
import { generateEmbeddings } from "../embeddings/embeddingService.js";
import { searchChatIdwithUserId } from "../../services/databaseService.js";
import {uploadDocument} from '../services/storageService.js'
import { createStoragePath } from "../services/storageService.js";
import { deleteDocument } from "../services/storageService.js";


export default async function postUploadDocument(req,res){
    if(!req.file){
        return res.status(400).json({
            error:'No file uploaded'
        })
    }
    let storagePath = null;
    let uploadSucceeded = false;
    const sendStatus = (data) => {
            res.write(JSON.stringify(data) + "\n");
        };
    try{
        res.setHeader("Content-Type", "application/x-ndjson");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("Connection", "keep-alive");

        
        const chatId = Number(req.params.chatId);

        const userChat = await searchChatIdwithUserId(req.user.userId,chatId);
        if(!userChat){
            return res.status(404).json({
                error:'Chat not found'
            })
        };
        sendStatus({
            type :"status",
            status: "upload"
        });
        storagePath = createStoragePath(req.user.userId,chatId,req.file);
        uploadSucceeded = await uploadDocument(req.file.buffer,storagePath,req.file.mimetype);
        sendStatus({
            type :"status",
            status: "parse"
        });
        const parsedDocument = await parseDocument(req.file);
        sendStatus({
            type :"status",
            status: "chunk"
        });
        const chunks = await chunkDocument(parsedDocument);

        sendStatus({
            type :"status",
            status: "embed"
        });
        const finalChunks = await generateEmbeddings(chunks);

        sendStatus({
            type :"status",
            status: "save"
        });
        const document = await saveDocumentandChunk({
            originalname: req.file.originalname,
            mimetype: req.file.mimetype,
            size: req.file.size,
            userId: req.user.userId,
            chatId: chatId,
            storagePath,
        },chunks);
        
            sendStatus({
            type :"completed",
            message:"ingestion complete"
        });
        res.end();
        }catch(error){
            console.error(error);
            if(uploadSucceeded){
                try{
                    await deleteDocument(storagePath);
                }catch(error){
                    console.error(error);
                }
            }
            if (!res.headersSent) {
            return res.status(500).json({
                message: error.message
            });
        }

            sendStatus({
            type :"error",
            error:"ingestion failed"
        });

        res.end();     
        }

};