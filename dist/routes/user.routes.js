"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_model_1 = require("../models/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const token_1 = __importDefault(require("../classes/token"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const userRoutes = express_1.Router();
userRoutes.post('/login', (req, res) => {
    const body = req.body;
    user_model_1.User.findOne({ email: body.email }, (err, userRow) => {
        if (err) {
            throw err;
        }
        ;
        if (!userRow) {
            return res.json({
                success: false,
                message: 'User/password in\'t correct.'
            });
        }
        if (userRow.comparePassword(body.password)) {
            const userToken = token_1.default.getUserToken({
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
userRoutes.post('/create', (req, res) => {
    const user = {
        name: req.body.name,
        email: req.body.email,
        password: bcrypt_1.default.hashSync(req.body.password, 10),
        avatar: req.body.avatar,
    };
    user_model_1.User.create(user).then(userRow => {
        const userToken = token_1.default.getUserToken({
            _id: userRow._id,
            name: userRow.name,
            email: userRow.email,
            avatar: userRow.avatar
        });
        res.json({
            success: true,
            token: userToken,
        });
    }).catch(err => {
        res.json({
            success: false,
            error: err
        });
    });
});
userRoutes.post('/update', [auth_1.default], (req, res) => {
    const user = {
        name: req.body.name || req.sessionData.user.name,
        email: req.body.email || req.sessionData.user.email,
        avatar: req.body.avatar || req.sessionData.user.avatar,
    };
    user_model_1.User.findByIdAndUpdate(req.sessionData.user._id, user, { new: true }, (err, userRow) => {
        if (err) {
            throw err;
        }
        ;
        if (!userRow) {
            return res.json({
                success: false,
                message: 'There isn\'t an user with that Id.'
            });
        }
        else {
            const userToken = token_1.default.getUserToken({
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
userRoutes.get('/', [auth_1.default], (req, res) => {
    const user = req.sessionData.user;
    res.json({
        success: true,
        user
    });
});
exports.default = userRoutes;
