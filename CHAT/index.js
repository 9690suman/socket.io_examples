var express = require('express');
var app = express();
var http = require('http').Server(app)

var io = require('socket.io')(http)

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

var onlineUsers = [];
io.on('connection', function(socket){
	//io.emit('chat message', 'Someone Connected!');
	socket.on('chat message', function(msg){
		io.emit('chat message', msg);
	}).on('chat message joined', function(nickname){
		io.emit('chat message', nickname+' joined!');
	}).on('chat message left', function(nickname){
		io.emit('chat message', nickname+' left!');
	}).on('chat message typing', function(nickname){
		io.emit('chat message typing', nickname+' typing...!');
	});
	
	/*socket.on('disconnect', function(){
		io.emit('chat message', 'Someone Disconnected!');
	});*/
});

http.listen(3000,function(){
	console.log('listning on 3000');
});