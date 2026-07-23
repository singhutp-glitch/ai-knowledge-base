import multer from 'multer'
import path from 'path'

const storage = multer.memoryStorage();

function fileFilter(req,file,cb){
    const allowedTypes = [
        "application/pdf",

        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",

        "text/plain"
    ];
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