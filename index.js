var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

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
    socket.on('disconnect', function(){
        console.log('User disconnected');
    });
});

http.listen(3000, function(){
    console.log('Listening on *:3000');
});