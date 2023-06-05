import express from 'express';
import {body} from 'express-validator';
import {User} from '../models/user';
import * as contoller from '../controllers/userController';
import {authorizeUser as auth} from '../controllers/auth';
import {authorizeAdmin as authA} from '../controllers/auth';
import {GetType as type} from '../controllers/auth'

export const router = express.Router()
router.post(
    '/signup',
    [
        body('name').trim().not().isEmpty().isLength({min: 8, max:50}).withMessage('Name must have from 8 to 50 characters'),
        body('email').trim().isLength({max:50}).withMessage('Email mustn\'t havemore then 50 characters')
            .isEmail().withMessage('Email not valid').normalizeEmail()
            .custom(async (email:string) => {
                const exists = await User.EmailExists(email);
                if(exists === 1) {
                    return Promise.reject('Email address already exists')
                }
                return Promise.resolve();
            }),
        body('password').trim().isLength({min: 15, max: 50}).withMessage('Password must have from 15 to 50 characters')
    ],
    contoller.signup
);

router.post(
    '/login',
    [
        body('email').trim().isLength({max:50}).withMessage('Email mustn\'t havemore then 50 characters')
            .isEmail().withMessage('Email not valid').normalizeEmail()
            .custom(async (email:string) => {
                const exists = await User.EmailExists(email);
                if(exists !== 1) {
                    return Promise.reject('Email or password are wrong')
                }
                return Promise.resolve();
            }),
        body('password').trim().isLength({min: 15, max: 50}).withMessage('Password must have from 15 to 50 characters')
    ],
    contoller.login
);

router.get(
    '/check',
    auth,
    type,
)


router.get(
    '/user',
    authA,
    contoller.getAllusers
)

router.delete(
    '/user/:uid',
    authA,
    contoller.deleteUser
)