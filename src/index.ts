import Server from "./classes/server";
import mongose, { mongo } from "mongoose";
import { MongoError } from "mongodb";
import { Socket } from "socket.io";
import bodyParser from "body-parser";
import cors from "cors";
import userRoutes from "./routes/user.routes";

const server = new Server();
const http = require("http").Server(server.app);
const io = require("socket.io")(http);

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

// Connect Socket IO
io.on('connection', function(socket: Socket){
    console.log('A user connected');
    socket.on('chat message', function(message: any) {
        io.emit('chat message', message);
        console.log(`Chat message: ${message}`);
    });
    socket.on('chat message object', function(message: any) {
        io.emit('chat message object', message);
        console.log(`Chat message object: ${message}`);
    });
    socket.on('disconnect', function(){
        console.log('User disconnected');
    });
});

// Connect with MongoDB
const connectCallback = (err: MongoError) => {
    if (err) { throw err; }
};

mongose.connect('mongodb+srv://mongo-admin:kgNMkV6xPZnU4cGG@cluster0-3cnfb.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
}, connectCallback);

// Start server
server.start(() => {
    console.log(`Server is running in port ${server.port}`);
});