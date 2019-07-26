import { Request, Response, NextFunction } from "express";
import Token from "../classes/token";
import AuthedRequest from "../interfaces/authed.request";

const auth = (req: AuthedRequest, res: Response, next: NextFunction) => {

    const userToken = req.get('x-token') || '';
    
    Token.checkUserToken(userToken).then(decoded => {
        console.log('User', decoded);
        req.sessionData = decoded;
        next();
    }).catch(err => {
       res.json({
           success: false,
           message: 'Incorrect token'
       }) 
    });
}

export default auth;

