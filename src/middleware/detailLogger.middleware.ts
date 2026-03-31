import { Request, Response, NextFunction } from 'express';


export const detailLogger = (req:Request, res:Response, next:NextFunction)=>{
    const details = {
        method : req.method,
        url : req.url,
        time: new Date().toISOString(),
        ip: req.ip,
        platform: req.get('User-Agent') || 'Unknown',
        country: req.headers['cf-ipcountry'] || 'Unknown',   
    } 
    console.log("User Request Details : ", details);

    next();
};