var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000; 

app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response){
    response.sendFile(`${__dirname}/public/index.html`);
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

http.listen(port, function(){
    console.log(`Listening on *:${port}`);
});