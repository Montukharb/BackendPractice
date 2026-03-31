import { Request, Response, NextFunction } from 'express';
export const globalTestingMiddleware = (req:Request, res:Response, next:NextFunction)=>{
    console.log("This is global testing middleware");
    next();

};