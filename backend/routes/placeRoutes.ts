import express from 'express';
import {body} from 'express-validator';
import * as controller from '../controllers/placeController';
import { Place } from '../models/place';
import {authorizeUser as auth} from '../controllers/auth'
import {authorizeAdmin as authAd} from '../controllers/auth'

export const router = express.Router()

router.get(
    '/',
    controller.getAllPlaces
);

router.get(
    '/:pid',
    controller.getPlace
);

router.delete(
    '/:pid',
    authAd,
    controller.deletePlace
)


router.post(
    '/',
    authAd,
    [
        body('name').trim().isLength({min:3, max:50}).not().isEmpty().custom( async (name:string) => {
            const exists = await Place.placeExists(name);
            if(exists !== 1){
                return Promise.resolve();
            }
            return Promise.reject("Place exists");
        }),
        body('latitude').trim().not().isEmpty().matches("^ *[1-9]?[0-9]° [1-5]?[0-9]' [1-5]?[0-9].[0-9]{4}'' [NS] *$").withMessage('Latitude must be DMS'),
        body('longitude').trim().not().isEmpty().matches("^ *[1]?[0-9]?[0-9]° [1-5]?[0-9]' [1-5]?[0-9].[0-9]{4}'' [WE] *$").withMessage('Longitude must be DMS'),
    ],
    controller.postPlace
);