import { NextFunction, Request, Response } from "express";
import { Comment } from "../models/comment";
import { validationResult } from "express-validator";
import { ResponseError } from "./errorController";
import jwt from 'jsonwebtoken';
import { User } from "../models/user";


export async function getAllComments(req: Request, res: Response, next: NextFunction) {
    
    if(checkRequirementsValidation(req, next, 400)) return;

    try {
        const [result] = await Comment.getAllComments();
        res.status(200).json(result);
    } 
    catch (err: any){
    
        if(!(err as ResponseError).statusCode){
            err.statusCode = 500;
        }
        next(err as ResponseError);
    }
}

export async function getUserComments(req: Request, res: Response, next: NextFunction) {
    
    if(checkRequirementsValidation(req, next, 400)) return;

    try {
        let id = Number(req.params.uid);

        const [result] = await Comment.getUserComments(id);
        res.status(200).json(result);
    } 
    catch (err: any){
    
        if(!(err as ResponseError).statusCode){
            err.statusCode = 500;
        }
        next(err as ResponseError);
    }
}

export async function getFlightComments(req: Request, res: Response, next: NextFunction) {
    
    if(checkRequirementsValidation(req, next, 400)) return;

    try {
        let id = Number(req.params.fid);

        const [result] = await Comment.getFlightComments(id);
        res.status(200).json(result);
    } 
    catch (err: any){
    
        if(!(err as ResponseError).statusCode){
            err.statusCode = 500;
        }
        next(err as ResponseError);
    }
}

export async function getPlaceComments(req: Request, res: Response, next: NextFunction) {
    
    if(checkRequirementsValidation(req, next, 400)) return;

    try {
        let id = Number(req.params.pid);

        const [result] = await Comment.getPlaceComments(id);
        res.status(200).json(result);
    } 
    catch (err: any){
    
        if(!(err as ResponseError).statusCode){
            err.statusCode = 500;
        }
        next(err as ResponseError);
    }
}


export async function postUserComment(req: Request, res: Response, next: NextFunction) {
    if(checkRequirementsValidation(req, next, 400)) return;

    try {

        let uid = Number(req.params.uid);
        const comment = new Comment(
            req.body.title,
            req.body.content,
            uid,
            req.body.FID,
            req.body.PID
        );

        if((req.body.FID && req.body.PID) || (!req.body.FID && !req.body.PID)){
            const err = new ResponseError("Comment cannot be for place and flight at the same time");
            err.statusCode = 409;
            next(err);
            return;
        }

        let [r] = await Comment.getUserComments(uid);
        let commentExists:boolean = false;
        r.forEach( (e:any) => {
            if(e.FID == req.body.FID && req.body.FID != null){
                commentExists = true;
            }
            if(e.PID == req.body.PID && req.body.PID != null){
                commentExists = true;
            }
        });
        if(commentExists){
            const err = new ResponseError("User can comment something just once");
            err.statusCode = 409;
            next(err);
            return;
        }

        const [result] = await Comment.saveComment(comment);
        
        res.status(201).json({ message: 'Comment Added', result: result});
    } catch (err:any) {
        if(!(err as ResponseError).statusCode){
            err.statusCode = 500;
        }
        next(err as ResponseError);
    }
}

export async function deleteUserComment(req: Request, res: Response, next: NextFunction) {
    if(checkRequirementsValidation(req, next, 400)) return;

    try {
        let uid = Number(req.params.uid);
        let cid = Number(req.params.cid);

        const [r] = await Comment.getComment(cid);
        if(r[0].UID != uid){
            const err = new ResponseError("User cannot delete what is not theirs or nonexistant things");
            err.statusCode = 409;
            next(err);
            return;
        }

        const [result] = await Comment.deleteComment(cid);
        
        if(result.affectedRows === 0){
            res.status(200).json({ message: 'Comment didn\'t exist', result: result});
        }
        else{
            res.status(200).json({ message: 'Comment deleted', result: result});
        }


    } catch (err:any) {
        if(!(err as ResponseError).statusCode){
            err.statusCode = 500;
        }
        next(err as ResponseError);
    }
}

export async function deleteUserCommentAdmin(req: Request, res: Response, next: NextFunction) {
    if(checkRequirementsValidation(req, next, 400)) return;

    try {
        let cid = Number(req.params.cid);

        const [result] = await Comment.deleteComment(cid);
        
        if(result.affectedRows === 0){
            res.status(200).json({ message: 'Comment didn\'t exist', result: result});
        }
        else{
            res.status(200).json({ message: 'Comment deleted', result: result});
        }


    } catch (err:any) {
        if(!(err as ResponseError).statusCode){
            err.statusCode = 500;
        }
        next(err as ResponseError);
    }
}


export async function updateUserComment(req: Request, res: Response, next: NextFunction) {
    if(checkRequirementsValidation(req, next, 400)) return;

    try {
        let uid = Number(req.params.uid);
        let cid = Number(req.params.cid);
        const comment = new Comment(
            req.body.title,
            req.body.content,
            uid,
            null,
            null,
            cid
        );

        const [r] = await Comment.getComment(cid);
        if(r[0].UID != uid){
            const err = new ResponseError("User cannot update what is not theirs or nonexistant things");
            err.statusCode = 409;
            next(err);
            return;
        }
        
        const [result] = await Comment.updateComment(comment);
    
        if(result.changedRows !== 1){
            res.status(200).json({ message: 'This comment was the same', result: result});
        }
        else{
            res.status(200).json({ message: 'Comment Updated', result: result});
        }

    } catch (err:any) {
        if(!(err as ResponseError).statusCode){
            err.statusCode = 500;
        }
        next(err as ResponseError);
    }
}



function checkRequirementsValidation(req:Request, next:NextFunction, potencialStatus:number|null = null){
    const errors = validationResult(req);

    let errorCheck = 0;
    if(!errors.isEmpty()) {
        errorCheck = 1;

        let err_msgs = '';
        errors.array().forEach(e => err_msgs+= e.msg + "; ");

        const err = new ResponseError(err_msgs);
        err.statusCode = potencialStatus!; 
        
        next(err);
    }
    return errorCheck;
}


export function checkUserIDWithToken(req: Request, res: Response, next: NextFunction) {
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

        if((decodedToken as any).UID != req.params.uid){
            const err = new ResponseError("Unauthorized");
            err.statusCode = 401;
            throw err;
        }
        next();

    } catch {
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
};