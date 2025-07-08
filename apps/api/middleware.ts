import type { NextFunction,Request,Response } from "express";
import  Jwt from 'jsonwebtoken';

export function authmiddleware(req:Request,res:Response,next:NextFunction){
    const header=req.headers.authorization!;
    try{
        let data=Jwt.verify(header,process.env.JWT_SECRECT!);
        req.userid=data.sub as string;
        next()
    }catch(e){
        res.status(403).send("")
    }

}