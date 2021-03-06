var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.on('connection', function(socket){
	io.emit('chat message', 'a user has connected');
  	socket.on('chat message', function(msg){
    	io.emit('chat message', msg);
  	});
  	socket.on('disconnect', function(){
  		console.log('user disconnected');
  		io.emit('chat message', "user disconnected");
  	});

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});