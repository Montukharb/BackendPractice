import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err:any , req:Request,res: Response, next: NextFunction)=>{
    console.log("Error in routes :" + err.stack);
    res.status(500).send({
        status:false,
        message:"Something went wrong please try again later",
        data:err.message,
    })
    next();
}