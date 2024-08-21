const express= require ("express");
const app = express();
const multer = require("multer");
const tesseract = require("tesseract.js");  //importing the tesseract library

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./uploads');
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})

const uploads = multer({storage:storage});

app.post('/api/uploads',uploads.single('uploadedimage'),(req,res)=>{
    console.log(req.file);

    try{
        tesseract.recognize(
            'uploads/'+req.file.filename,
            'eng',
            {logger:m => console.log(m)}
        ).then(({data:{text}})=>{
            return res.json({
                message:text
            })
        })
    }catch(error){
        console.error(error)
    }
})

app.listen(5000,()=>{
    console.log("server is up and running in port 5000");
})