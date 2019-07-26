import Server from "./classes/server";
import mongose, { mongo } from 'mongoose';
import { MongoError } from "mongodb";

import bodyParser from "body-parser";
import cors from "cors";

import userRoutes from "./routes/user.routes";

const server = new Server();

// Body parser
server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());

// Configure COURS
server.app.use(cors({ origin: true, credentials: true }));

// Configure routes
server.app.use('/user', userRoutes);
server.app.get('/', function(request, response) {
    response.sendFile(`${__dirname}/public/index.html`);
});

// Connect with MongoDB
const connectCallback = (err: MongoError) => {
    if (err) { throw err; }
};

mongose.connect('mongodb://localhost:27017/photogram', {
    useNewUrlParser: true,
    useCreateIndex: true,
}, connectCallback);

// Start server
server.start(() => {
    console.log(`Server is running in port ${server.port}`);
});