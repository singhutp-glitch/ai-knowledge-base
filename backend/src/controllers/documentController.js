import { loadChunk } from "../services/databaseService.js"

async function getChunks(req,res){
try{
        const chunkId = +req.params.chunkId;

        const chunk = await loadChunk(chunkId);
        
        return res.json(chunk);

    }catch(error){
        console.error(error);
        res.status(500).json({
            error:'Failed to load messages'
        })
    }
}

export default {
    getChunks
}