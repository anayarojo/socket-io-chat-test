import { Request } from "express";

export default interface AuthedRequest extends Request {

    sessionData?: any;

}