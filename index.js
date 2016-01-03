var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
	res.sendFile(__dirname+'/index.html');
});

//create new io connection
io.on('connection',function(socket){

	//new user
	socket.on('new user', function(msg){
		socket.username = msg;
		io.emit('new user', {
			username: socket.username
		});
	});

	//new message
	socket.on('chat message', function(msg){
		io.emit('chat message', {
			username: socket.username,
			msg: msg
		});
	});

	//disconnect
	socket.on('disconnect', function(){
		console.log('user disconnected');
	});
});

//listening to the port
http.listen(process.env.PORT || 3000, function(){
  console.log('listening on', http.address().port);
});