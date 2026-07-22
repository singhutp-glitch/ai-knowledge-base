import mammoth from 'mammoth'

export async function parseDocx(file){
    const result = await mammoth.extractRawText({
        buffer:file.buffer,
    })

    return {
        text:result.value,
        metaData:{
                fileName:file.originalname,
                fileType: file.mimetype,
                uploadedAt: new Date()
            }
    }
}