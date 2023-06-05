import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { ResponseError } from "./errorController";
import { Flight } from "../models/flight";

export async function getAllFlights(req: Request, res: Response, next: NextFunction) {
    if(checkRequirementsValidation(req, next, 400)) return;

    try {
        const [result] = await Flight.getAllPlaces();
        res.status(200).json(result);
    } 
    catch (err: any){
    
        if(!(err as ResponseError).statusCode){
            err.statusCode = 500;
        }
        next(err as ResponseError);
    }
}

export async function getFlightByID(req: Request, res: Response, next: NextFunction) {
    if(checkRequirementsValidation(req, next, 400)) return;

    try {
        let id = Number(req.params.fid);

        const [result] = await Flight.getFlightByID(id);
        
        res.status(200).json(result[0]);
    } 
    catch (err: any){
    
        if(!(err as ResponseError).statusCode){
            err.statusCode = 500;
        }
        next(err as ResponseError);
    }
}

export async function getFlightByPlaces(req: Request, res: Response, next: NextFunction) {
    if(checkRequirementsValidation(req, next, 400)) return;

    try {
        let spid = Number(req.params.spid);
        let fpid = Number(req.params.fpid);
        const [result] = await Flight.getFlightByPlaces(spid,fpid);
        res.status(200).json(result[0]);
    } 
    catch (err: any){
        if(!(err as ResponseError).statusCode){
            err.statusCode = 500;
        }
        next(err as ResponseError);
    }
}


export async function postFlight(req: Request, res: Response, next: NextFunction) {
    if(checkRequirementsValidation(req, next, 400)) return;

    try {
        const flight = new Flight(
            req.body.sPID,
            req.body.fPID,
            req.body.time
        );

        if(req.body.sPID == req.body.fPID){
            const err = new ResponseError("Same start and finish points");
            err.statusCode = 400;
            next(err);
            return;
        }

        const [r] = await Flight.getFlightByPlaces(req.body.sPID, req.body.fPID);
        if(r.length !== 0){
            const err = new ResponseError("Flight between those places exists");
            err.statusCode = 409;
            next(err);
            return;
        }

        
        const [result] = await Flight.saveFlight(flight);
        
        
        res.status(201).json({ message: 'Place Added', result: result});
    } catch (err:any) {
        if(!(err as ResponseError).statusCode){
            err.statusCode = 500;
        }
        next(err as ResponseError);
    }
}

export async function deleteFlight(req: Request, res: Response, next: NextFunction) {
    
    if(checkRequirementsValidation(req, next, 400)) return;

    try {
        let id = Number(req.params.fid);

        const [result] = await Flight.deleteFlight(id);
        
        if(result.affectedRows === 0){
            res.status(200).json({ message: 'Flight didn\'t exist', result: result});
        }
        else{
            res.status(200).json({ message: 'Flight deleted', result: result});
        }

    } catch (err:any) {
        if(!(err as ResponseError).statusCode){
            err.statusCode = 500;
        }
        next(err as ResponseError);
    }
}

export async function putFlight(req: Request, res: Response, next: NextFunction) {
    if(checkRequirementsValidation(req, next, 400)) return;

    try {
        const flight = new Flight(
            -1, -1,
            req.body.time,
            Number(req.params.fid)
        );

        const [result] = await Flight.updateFlight(flight);
    
        if(result.changedRows !== 1){
            res.status(200).json({ message: 'This flight\'s time was the same', result: result});
        }
        else{
            res.status(200).json({ message: 'Flight Updated', result: result});
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
        if(errors.array()[0].msg == "Flight exists"){
            err.statusCode = 409; 
        }
        else{
            err.statusCode = potencialStatus!;
        }
        
        next(err);
    }
    return errorCheck;
}


