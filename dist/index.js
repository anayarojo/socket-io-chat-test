"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./classes/server"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const server = new server_1.default();
const http = require("http").Server(server.app);
const io = require("socket.io")(http);
// Body parser
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
// Configure COURS
server.app.use(cors_1.default({ origin: true, credentials: true }));
// Configure routes
server.app.use('/user', user_routes_1.default);
server.app.get('/', function (request, response) {
    response.sendFile(`${__dirname}/public/index.html`);
});
// Connect Socket IO
io.on('connection', function (socket) {
    console.log('A user connected');
    socket.on('chat message', function (message) {
        io.emit('chat message', message);
        console.log(`Chat message: ${message}`);
    });
    socket.on('chat message object', function (message) {
        io.emit('chat message object', message);
        console.log(`Chat message object: ${message}`);
    });
    socket.on('disconnect', function () {
        console.log('User disconnected');
    });
});
// Connect with MongoDB
const connectCallback = (err) => {
    if (err) {
        throw err;
    }
};
mongoose_1.default.connect('mongodb+srv://mongo-admin:kgNMkV6xPZnU4cGG@cluster0-3cnfb.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
}, connectCallback);
// Start server
server.start(() => {
    console.log(`Server is running in port ${server.port}`);
});
