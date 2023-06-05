import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { ResponseError } from "./errorController";
import { Place } from "../models/place";



export async function getAllPlaces(req: Request, res: Response, next: NextFunction) {
    if(checkRequirementsValidation(req, next, 400)) return;

    try {
        const [result] = await Place.getAllPlaces();
        res.status(200).json(result);
    } 
    catch (err: any){
    
        if(!(err as ResponseError).statusCode){
            err.statusCode = 500;
        }
        next(err as ResponseError);
    }

}

export async function getPlace(req: Request, res: Response, next: NextFunction) {
    if(checkRequirementsValidation(req, next, 400)) return;

    try {
        let id = Number(req.params.pid);

        const [result] = await Place.getPlace(id);
        res.status(200).json(result[0]);
    } 
    catch (err: any){
    
        if(!(err as ResponseError).statusCode){
            err.statusCode = 500;
        }
        next(err as ResponseError);
    }
}


export async function postPlace(req: Request, res: Response, next: NextFunction) {
    
    if(checkRequirementsValidation(req, next, 400)) return;

    try {
        const place = new Place(
            req.body.name,
            req.body.latitude,
            req.body.longitude
        );


        const [result] = await Place.savePlace(place);
        
        
        res.status(201).json({ message: 'Place Added', result: result});
    } catch (err:any) {
        if(!(err as ResponseError).statusCode){
            err.statusCode = 500;
        }
        next(err as ResponseError);
    }

}

export async function deletePlace(req: Request, res: Response, next: NextFunction) {
    
    if(checkRequirementsValidation(req, next, 400)) return;

    try {
        let id = Number(req.params.pid);

        const [result] = await Place.deletePlace(id);
        
        if(result.affectedRows === 0){
            res.status(200).json({ message: 'Place didn\'t exist', result: result});
        }
        else{
            res.status(200).json({ message: 'Place deleted', result: result});
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
        errors.array().forEach(e => err_msgs+= e.msg + ";  ");

        const err = new ResponseError(err_msgs);
        if(errors.array()[0].msg == "Place exists"){
            err.statusCode = 409; 
        }
        else{
            err.statusCode = potencialStatus!;
        }
        
        next(err);
    }
    return errorCheck;
}