import fs from 'fs/promises'

export async function parseTxt(file){
    const text = await fs.readFile(file.path,'utf8');
    return {
        text,
        metaData:{
                fileName:file.originalname,
                fileType: file.mimetype,
                uploadedAt: new Date()
            }
    }
}