import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'src/rag/upload/uploads')
    },
    filename:function(req,file,cb){
        const uniqueName = Date.now() + '-' + file.originalname;
        cb(null,uniqueName)
    }
})

function fileFilter(req,file,cb){
    const allowedTypes = [
        "application/pdf",

        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",

        "text/plain"
    ];
    console.log("file: ",file)
    if(allowedTypes.includes(file.mimetype)){
        cb(null,true);
    }else{
        cb(new Error('Unsupported file type'),false);
    }
}

const upload = multer({
    storage,
    fileFilter,
    limits:{
        fileSize:10*1024*1024
    }
})

export default upload;