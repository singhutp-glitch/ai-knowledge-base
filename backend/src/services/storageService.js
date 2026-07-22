import { createClient } from "@supabase/supabase-js";
import path from 'path';

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

const BUCKET_NAME = "documents";

export async function uploadDocument(buffer,path,mimeType){
    const {data,error} = await supabase.storage
    .from('documents')
    .upload(path,buffer,{
        contentType:mimeType,
        upsert:false
    });

    if(error){
        throw(error);
    }

    return data;
}

export async function downloadDocument(path){

    const {data,error} = await supabase.storage
    .from(BUCKET_NAME)
    .download(paht);

    if(error){
        throw(error)
    }

    return data;
}

export async function deleteDocument(path){

    const {error} = await supabase.storage
    .from(BUCKET_NAME)
    .remove([paht]);

    if(error){
        throw(error)
    }
}

export function createStoragePath(userId,chatId,file){

    const extension = path.extname(file.originalname);
    return `user-${userId}/chat-${chatId}/${crypto.randomUUID()}${extension}`;
}