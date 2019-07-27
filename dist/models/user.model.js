"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userSchema = new mongoose_1.Schema({
    avatar: {
        type: String,
        default: '1'
    },
    name: {
        type: String,
        required: [true, 'The name is required']
    },
    password: {
        type: String,
        required: [true, 'The password is required']
    }
});
userSchema.method('comparePassword', function (password = '') {
    return bcrypt_1.default.compareSync(password, this.password);
});
exports.User = mongoose_1.model('user', userSchema);
