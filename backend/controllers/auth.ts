import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";
import { ResponseError } from './errorController';

export function authorizeUser(req: Request, res: Response, next: NextFunction) {
    try {
        const authHeader = req.headers.authorization;
        
        if(!authHeader){
            const error = new ResponseError('Not authenticated');
            error.statusCode = 401;
            throw error;
        }

        const token = authHeader!.split(' ')[1];
        let decodedToken: string | jwt.JwtPayload;
        try {
            decodedToken = jwt.verify(token, 'secretfortoken');
        } 
        catch (error:any) {
            const err = new ResponseError(error.msg);
            err.statusCode = 500;
            throw err;
        }

        if(!decodedToken){
            const err = new ResponseError("Not authenticated");
            err.statusCode = 401;
            throw err;
        }

        req.body.isLoggedIn = true;
        req.body.au_UID = (decodedToken as any).UID;
        req.body.au_email = (decodedToken as any).email;
        req.body.au_type = (decodedToken as any).type;

        next();

    } catch {
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
};

export function authorizeAdmin(req: Request, res: Response, next: NextFunction) {
    try {
        const authHeader = req.headers.authorization;
        
        if(!authHeader){
            const error = new ResponseError('Not authenticated');
            error.statusCode = 401;
            throw error;
        }
        
        const token = authHeader!.split(' ')[1];
        let decodedToken: string | jwt.JwtPayload;
        try {
            decodedToken = jwt.verify(token, 'secretfortoken');
        } 
        catch (error:any) {
            const err = new ResponseError(error.msg);
            err.statusCode = 500;
            throw err;
        }
        
        if(!decodedToken){
            const err = new ResponseError("Not authenticated");
            err.statusCode = 401;
            throw err;
        }

        
        if((decodedToken as any).type != "admin"){
            const err = new ResponseError("Forbidden");
            err.statusCode = 401;
            throw err;
        }

        req.body.isLoggedIn = true;
        req.body.au_UID = (decodedToken as any).UID;
        req.body.au_email = (decodedToken as any).email;
        req.body.au_type = (decodedToken as any).type;
        
        next();

    } catch {
        
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
};

export function GetType (req: Request, res: Response, next: NextFunction){
    try {
        let type = req.body.au_type;
        res.status(200).json(type == "admin");
    } catch {
        res.status(403).json({
            error: new Error('You cannot perform this')
        });
    }
}