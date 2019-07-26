"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class Token {
    constructor() { }
    static getUserToken(user) {
        return jsonwebtoken_1.default.sign({ user }, this.seed, { expiresIn: this.expires });
    }
    static checkUserToken(userToken) {
        return new Promise((resolve, reject) => {
            jsonwebtoken_1.default.verify(userToken, this.seed, (err, decoded) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(decoded);
                }
            });
        });
    }
    ;
}
Token.seed = 'This!is"the#seed$of%my&tokens/app';
Token.expires = '30d';
exports.default = Token;
