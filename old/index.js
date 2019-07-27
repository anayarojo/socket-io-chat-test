var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');
var port = process.env.PORT || 3000; 

app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
    response.sendFile(`${__dirname}/public/index.html`);
});

app.post('/user/login', function(request, response) {

});

app.post('/user/create', function(request, response) {

});

app.post('/user/update', function(request, response) {

});

io.on('connection', function(socket){
    console.log('A user connected');
    //socket.broadcast.emit('chat message', 'Wellcome');
    socket.on('chat message', function(message) {
        io.emit('chat message', message);
        console.log(`Chat message: ${message}`);
    });
    socket.on('chat message object', function(message) {
        io.emit('chat message object', message);
        console.log(`Chat message object: ${message}`);
    });
    socket.on('disconnect', function(){
        console.log('User disconnected');
    });
});

// admin => 
// password => 
// port => 
// database => 
// mongodb+srv://mongo-admin:kgNMkV6xPZnU4cGG@cluster0-3cnfb.mongodb.net/test?retryWrites=true&w=majority
// 
var connection = 'mongodb+srv://mongo-admin:kgNMkV6xPZnU4cGG@cluster0-3cnfb.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(connection, { useNewUrlParser: true }, function (err) {
   if (err) throw err;
   console.log('Database connected');
});

http.listen(port, function(){
    console.log(`Listening on *:${port}`);
});