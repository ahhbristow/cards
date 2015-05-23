var app = require('express')();
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/chat', function(req, res){
				res.sendFile(path.join(__dirname, '../html', 'index.html'));
});
app.get('/cards', function(req, res){
				res.sendFile(path.join(__dirname, '../html', 'cards.html'));
});

io.on('connection', function(socket){
	socket.on('move', function(msg){
		app.handle_move_msg(msg)
	});
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});

/*
 * Card was moved, so store this
 */
app.handle_move_msg = function() {
	
}

app.init = function() {
	this.cards = [];

	/*
	 * Adds a new card with 'name' at (x,y)
	 */
	this.add_card = function(name, x, y) {
		var new_card = {
			'name': name,
			'x': x,
			'y': y
		}
		this.cards.push(new_card);
	}
}
