import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { User } from "../models/user";
import { ResponseError } from "./errorController";
import { RowDataPacket } from "mysql2";


export async function signup(req: Request, res: Response, next: NextFunction) {

    if(checkRequirementsValidation(req,next,'Email address already exists', 409)) return;

    const name = req.body!.name;
    const email = req.body!.email;
    const password = req.body!.password;
    try{
        const hashedPassword = await bcrypt.hash(password, 8);
        const userDetails = new User(name, email, hashedPassword);
        
        const result = await User.InsertUser(userDetails);
        
        res.status(201).json({ message: "User registered"})
    }
    catch (err: any){
    
        if(!(err as ResponseError).statusCode){
            err.statusCode = 500;
        }
        next(err as ResponseError);
    }
}

export async function login(req: Request, res: Response, next: NextFunction) {

    if(checkRequirementsValidation(req,next,'Email address already exists', 409)) return;

    const email = req.body.email;

    try {
        const [user] = await User.findUser(email) as any as RowDataPacket[];
    
        if(user.length !== 1){
            const err = new ResponseError('Email or password are wrong');
            err.statusCode = 401;
            throw err;
        }

        const data = user[0] as User;
        
        if(!await bcrypt.compare(req.body.password,data.password)){
            const err = new ResponseError('Email or password are wrong');
            err.statusCode = 401;
            throw err;
        }

        const token = jwt.sign({
            email: data.email,
            UID: data.UID,
            type: data.type,
            },
            'secretfortoken',
            { expiresIn: '1h' }
        );

        res.status(202).json({ token: token, userID: data.UID})

    } catch (err:any) {
        if(!(err as ResponseError).statusCode){
            err.statusCode = 500;
        }
        next(err as ResponseError);
    }
}

export async function checkType(req: Request, res: Response, next: NextFunction) {
    if(checkRequirementsValidation(req,next,'Email address already exists', 409)) return;

    try {
        let uid = Number(req.params.pid);

        const result = await User.isAdmin(uid);
        
        res.status(200).json({result: result});

    } catch (err:any) {
        if(!(err as ResponseError).statusCode){
            err.statusCode = 500;
        }
        next(err as ResponseError);
    }
    

}

export async function getAllusers(req: Request, res: Response, next: NextFunction) {
    if(checkRequirementsValidation(req, next,'', 400)) return;

    try {
        const [result] = await User.getAllUsers();
        res.status(200).json(result);
    } 
    catch (err: any){
        if(!(err as ResponseError).statusCode){
            err.statusCode = 500;
        }
        next(err as ResponseError);
    }
}

export async function deleteUser(req: Request, res: Response, next: NextFunction) {
    if(checkRequirementsValidation(req, next,'', 400)) return;

    try {
        let id = Number(req.params.uid);

        const [result] = await User.deleteUser(id);
        
        if(result.affectedRows === 0){
            res.status(200).json({ message: 'User didn\'t exist', result: result});
        }
        else{
            res.status(200).json({ message: 'User deleted', result: result});
        }


    } catch (err:any) {
        if(!(err as ResponseError).statusCode){
            err.statusCode = 500;
        }
        next(err as ResponseError);
    }

}


function checkRequirementsValidation(req:Request, next:NextFunction, checkText:string, potencialStatus:number){
    const errors = validationResult(req);

    let errorcheck = 0;
    if(!errors.isEmpty()) {
        let err_msgs = '';
        errors.array().forEach(e => err_msgs+= e.msg + "; ");

        const err = new ResponseError(err_msgs);
        if(errors.array()[0].msg == checkText){
            err.statusCode = potencialStatus; 
        }
        errorcheck = 1;

        next(err);
    }
    return errorcheck;
}