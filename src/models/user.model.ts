import { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
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

userSchema.method('comparePassword', function(password: string = ''): boolean {
    return bcrypt.compareSync(password, this.password);
});

interface IUser extends Document {
    avatar: string;
    name: string;
    password: string;
    comparePassword(password: string): boolean;
}

export const User = model<IUser>('user', userSchema);