var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000; 

app.get('/', function(request, response){
    response.sendFile(`${__dirname}/public/index.html`);
});

app.get('/favicon.ico', function(request, response){
    response.sendFile(`${__dirname}/public/favicon.ico`);
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

http.listen(port, function(){
    console.log(`Listening on *:${port}`);
});