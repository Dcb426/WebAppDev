var	express = require('express'), 
	app = express(),
	http = require('http'),
	socketIO = require('socket.io'),
	path = require('path'),
	server, io;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
app.use(express.static(path.join(__dirname, 'public')));

server = http.Server(app);
server.listen(8081); 
io = socketIO(server);

var players = {},
	unmatched;

function joinGame(socket){
	//add player to object of players
	players[socket.id] = {
		//the opponent will either be the socket that is currently unmatched or it will be null if no players are unmatched
		opponent:unmatched,
		//The symbol will become O if player is unmatched
		symbol:'X',
		socket:socket,
		id:socket.id
	};
	if(unmatched){
		players[socket.id].symbol = 'O';
		players[unmatched].opponent=socket.id;
		unmatched = null;
	}else{
		unmatched=socket.id;
	}
}
function getOpponent(socket) {
	if (!players[socket.id].opponent){
		return;
	}
	return players[players[socket.id].opponent].socket;
}

io.on('connection', function(socket){
    
    console.log(socket.id + ' user connected');
  joinGame(socket);
  if(getOpponent(socket)){
  	socket.emit('game.begin',{id:players[socket.id].id})
  	socket.emit('game.begin',{opponent:players[socket.id].opponent})
  	socket.emit('game.begin',{symbol:players[socket.id].symbol});
  	getOpponent(socket).emit('game.begin',{symbol : players[getOpponent(socket).id].symbol});
  }
  socket.on('make.move', function(data){
  	if(!getOpponent(socket)){
  		return;
  	}
  	socket.emit('move.made', data);
  	getOpponent(socket).emit('move.made', data);
  });
  socket.on('disconnect', function(){
  	if(getOpponent(socket)){
  		getOpponent(socket).emit('opponent.left');
  	}
  });
});
