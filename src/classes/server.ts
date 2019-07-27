import express from 'express';

export default class Server {

    public app: express.Application;
    public port: string = process.env.PORT || '3000';

    constructor() {
        this.app = express();
        this.app.use(express.static(__dirname + '/public'));
    }

    start(callback: () => any) {
        this.app.listen(this.port, callback);
    }
}