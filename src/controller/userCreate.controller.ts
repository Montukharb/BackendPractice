import { Request, Response } from "express";
import { userCreate } from "../models/usercreate.models.js";
// const multer = require('multer');
import multer from "multer";
import { fileURLToPath } from "node:url";
import path from "node:path";
// import mongoose from "mongoose";
import fs from "fs";


// For ES modules, __dirname and __filename are not available by default. We can use the following code to get their values.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);




export const userCrateHandler = async (req: Request, res: Response) => {

    //object id valid format or not check code
//  const isValidObjectid = mongoose.Types.ObjectId.isValid(req.body.id);
//  if(!isValidObjectid){
//      return res.status(400).send({
//         status:false,
//         message:"Invalid id format",
//         data:null,
//     })
// };

    type dataType = {
        name: string,
        age: number,
        email: string,
        lastmodified?: Date,

    }
    const data2: dataType = {
        name: req.body.name,
        age: req.body.age,
        email: req.body.email,
    };

    try {
        let result:any = await userCreate.insertOne(data2);
        console.log("User created successfully");
        return res.status(400).send({
            status: true,
            message: "User created successfully",
            data: result,
        })


    }
    catch (error: any) {
        if (error.code === 11000) {
            console.log("User already exists");
            return res.status(400).send({
                status: false,
                message: "User already exists",
                data: error,
            })
        }

        console.log("Error in user creation : " + error);
        return res.status(500).send({
            status: false,
            message: error.message,
            data: error,
        })
    }

};

export const userListingHandler = (req: Request, res: Response) => {
    
    return res.status(200).send({
        status:true,
        message:"User listing route",
        data:{
            dummydata:"lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, voluptate!"
        },
    })

};

const storage = multer.diskStorage({

    destination: function(req:Request, file:any, cb:any)
    {
    
        // cb(null, path.join(__dirname, '../images'));
        // console.log("[[" + path.join(process.cwd(),"/Backend/src/images") + "]]")
        cb(null, path.join(process.cwd(), '/src/images').normalize());
    },
    
    filename:function(req:Request, file:any, cb:any)
    {
        const filename = file.originalname.split('.')[0];
        const newName = filename.trim()+Date.now() + '_'+path.extname(file.originalname);
        cb(null, newName); 
    }

})

const limit = {
    fileSize: 1024 * 1024 * 20 // 20MB
}

export const uploadFile = multer({
    storage:storage,
    limits:limit,
})


export const fileUploadHandler = (req:Request, res:Response)=>{
    console.log(req.file)
    res.status(200).send({
        status:true,
        message:"File upload successful",
        data: req.file,
    });
}

export const uploadFileRender = (req:Request, res:Response)=>{
    res.render('uploadFile');
}

export const folderCreateHandler = (req:Request, res:Response)=>{
    fs.mkdir(path.join(process.cwd(), '/newFolder'),(err)=>{
        if(err){
            console.log("Error in folder creation : " + err);
            return res.status(500).send({
                status:false,
                message: (err.code === "EEXIST" ? "Folder already exists" : "Error in folder creation"),
                data:null,
                err:err,
             })
        };

        return res.status(200).send({
            status:true,
            message:"Folder created successfully",
            data:null,
            })
        }
    )}


export const readStreamHandler = (req:Request, res:Response)=>{
    // const readStream = fs.createReadStream(path.join(process.cwd(), '/src/images/AnswerKey1774887695567_.pdf'));
    const readStream = fs.createReadStream(path.join(process.cwd(), '/src/images/IMG_20260228_092401~21774806132724_.jpg'));

    readStream.on('open',()=>{
        readStream.pipe(res);
    });

    readStream.on('error',(err)=>{
        return res.status(500).send("Error in reading file : " + err);
    })
}

export const readTextStreamHandler = (req:Request, res:Response)=>{
    // const readStream = fs.createReadStream(path.join(process.cwd(), '/src/images/AnswerKey1774887695567_.pdf'));
    const readStream = fs.createReadStream(path.join(process.cwd(), '/src/images/Folder structure1774889915672_.txt'));

    readStream.on('open',()=>{
        
        readStream.pipe(res);
    }); 
 readStream.on('end',()=>{
        console.log("Data chunk read completely");
    });
    readStream.on('error',(err)=>{
        return res.status(500).send("Error in reading file : " + err);
    })
}


// const writeStream = fs.createWriteStream('output.txt');

// writeStream.write('Hello Bhai\n');
// writeStream.write('Stream seekh raha hu');

// writeStream.end();