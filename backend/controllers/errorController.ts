import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export class ResponseError extends Error {
    statusCode?: number;
    data?: any;
}


export function get404 (req:Request, res:Response, next:NextFunction) {
    const error = new ResponseError('Not found');
    
    error.statusCode = 404;
    next(error);
}

export function get500 (error:ResponseError, req:Request, res:Response, next:NextFunction) {
    res.status(error.statusCode || 500);
    res.json({
        error: {
            message: error.message,
            data: error.data
        }
    })
}

