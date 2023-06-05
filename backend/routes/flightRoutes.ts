import express from 'express';
import {body} from 'express-validator';
import * as controller from '../controllers/flightController';
import {authorizeAdmin as auth} from '../controllers/auth'
import { Place } from '../models/place';

export const router = express.Router()

router.get(
    '/',
    controller.getAllFlights
);

router.get(
    '/:fid',
    controller.getFlightByID
);

router.get(
    '/:spid/:fpid',
    controller.getFlightByPlaces
);

router.post(
    '/',
    auth,
    [
        body('sPID').trim().isInt({min:0}).withMessage('start place ID must be int')
            .custom( async (id:number) => {
                const [result] = await Place.getPlace(id);

                if(result.length === 1){
                    return Promise.resolve();
                }
                return Promise.reject("Starting Place doesn't exists");
            }),
        body('fPID').trim().isInt({min:0}).withMessage('finish place ID must be int')
            .custom( async (id:number) => {
                const [result] = await Place.getPlace(id);

                if(result.length === 1){
                    return Promise.resolve();
                }
                return Promise.reject("Finish Place doesn't exists");
            }),
        body('time').trim().isInt({min:1}).withMessage('Not a positive number od seconds'),
    ],
    controller.postFlight
);

router.delete(
    '/:fid',
    auth,
    controller.deleteFlight
);

router.put(
    '/:fid',
    auth,
    [
        body('time').trim().isInt({min: 1}).withMessage('Not a positive number od seconds')
    ],
    controller.putFlight
)