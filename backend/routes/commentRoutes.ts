import express from 'express';
import {body} from 'express-validator';
import * as conteroller from '../controllers/commentController';
import {authorizeUser as auth} from '../controllers/auth'
import {authorizeAdmin as authAd} from '../controllers/auth'

export const router = express.Router()

router.get(
    '/',
    authAd,
    conteroller.getAllComments
)

router.get(
    '/user/:uid',
    auth,
    conteroller.getUserComments
);

router.get(
    '/flight/:fid',
    conteroller.getFlightComments
)

router.get(
    '/place/:pid',
    conteroller.getPlaceComments
)



router.post(
    '/:uid',
    auth,
    conteroller.checkUserIDWithToken,
    [
        body('title').trim().isLength({min:5, max:50}).not().isEmpty(),
        body('content').isLength({min:5, max:2000}).not().isEmpty(),
        body('FID'),
        body('PID'),
    ],
    conteroller.postUserComment
);


router.put(
    '/:uid/:cid',
    auth,
    conteroller.checkUserIDWithToken,
    [
        body('title').trim().isLength({min:5, max:50}).not().isEmpty(),
        body('content').trim().isLength({min:5, max:2000}).not().isEmpty(),
    ],
    conteroller.updateUserComment
)

router.delete(
    '/:uid/:cid',
    auth,
    conteroller.checkUserIDWithToken,
    conteroller.deleteUserComment
);

router.delete(
    '/:cid',
    authAd,
    conteroller.deleteUserCommentAdmin
);
