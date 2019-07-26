"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const token_1 = __importDefault(require("../classes/token"));
const auth = (req, res, next) => {
    const userToken = req.get('x-token') || '';
    token_1.default.checkUserToken(userToken).then(decoded => {
        console.log('User', decoded);
        req.sessionData = decoded;
        next();
    }).catch(err => {
        res.json({
            success: false,
            message: 'Incorrect token'
        });
    });
};
exports.default = auth;
