import jwt from "jsonwebtoken";

export default class Token {

    private static seed: string = 'This!is"the#seed$of%my&tokens/app';
    private static expires: string = '30d';

    constructor() { }

    static getUserToken(user: any): string {

        return jwt.sign({ user }, this.seed, { expiresIn: this.expires } )
    }

    static checkUserToken(userToken: string) {

        return new Promise( (resolve, reject) => {

            jwt.verify(userToken, this.seed, (err, decoded) => {
                if (err) { reject(err); } 
                else { resolve(decoded); }
            });
        });
    };
}