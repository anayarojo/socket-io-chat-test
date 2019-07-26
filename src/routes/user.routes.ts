import { Router, Request, Response } from "express";
import { User } from "../models/user.model";
import bcrypt from "bcrypt";
import Token from "../classes/token";
import Auth from "../middlewares/auth";
import AuthedRequest from "../interfaces/authed.request";

const userRoutes = Router();

userRoutes.post('/login', (req: Request, res: Response) => {

    const body = req.body;

    User.findOne({ email: body.email}, (err, userRow) => {

        if (err)  {throw err};
        if (!userRow) {
            return res.json({
                success: false,
                message: 'User/password in\'t correct.'
            });
        }
        if (userRow.comparePassword(body.password)) {

            const userToken = Token.getUserToken({
                _id: userRow._id,
                name: userRow.name,
                email: userRow.email,
                avatar: userRow.avatar
            });
            return res.json({
                success: true,
                token: userToken
            });
        }
        else {
            return res.json({
                success: false,
                message: 'User/password in\'t correct ****.'
            });
        }

    });
});

userRoutes.post('/create', (req: Request, res: Response) => {

    const user = {
        name        : req.body.name,
        email       : req.body.email,
        password    : bcrypt.hashSync(req.body.password, 10),
        avatar      : req.body.avatar,
    }

    User.create(user).then( userRow => {
        const userToken = Token.getUserToken({
            _id: userRow._id,
            name: userRow.name,
            email: userRow.email,
            avatar: userRow.avatar
        });
        res.json({
            success: true,
            token: userToken,
        });
    }).catch( err => {
        res.json({
            success: false,
            error: err
        });
    });
});

userRoutes.post('/update', [Auth], (req: AuthedRequest, res: Response) => {

    const user = {
        name        : req.body.name || req.sessionData.user.name,
        email       : req.body.email || req.sessionData.user.email,
        avatar      : req.body.avatar || req.sessionData.user.avatar,
    }

    User.findByIdAndUpdate(req.sessionData.user._id, user, { new: true }, ( err, userRow ) => {

        if ( err )  { throw err };
        if ( !userRow ) 
        {
            return res.json({
                success: false,
                message: 'There isn\'t an user with that Id.'
            });
        }
        else
        {
            const userToken = Token.getUserToken({
                _id: userRow._id,
                name: userRow.name,
                email: userRow.email,
                avatar: userRow.avatar
            });
            res.json({
                success: true,
                token: userToken,
            });
        }
    });
});

userRoutes.get('/', [Auth], (req: AuthedRequest, res: Response) => {

    const user = req.sessionData.user;

    res.json({
        success: true,
        user
    })
});

export default userRoutes;