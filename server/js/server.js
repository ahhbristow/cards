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

io.on('connection', function(socket) {

	socket.join('collaborators');


	socket.on('move', function(msg){
		app.handle_move_msg(msg)
		app.print_cards();
	});
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});


app.init = function() {

	// Hardcode cards init to match client side.
	// This will be removed
	this.cards = {
		"one" : {
			name:'one', x:'0', y:'0'
		},
		"two" : {
			name:'two', x:'100', y:'0'
		}
	};

	this.print_cards = function() {
		console.log(JSON.stringify(this.cards));
	}


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

	/*
	 * Card was moved, so store this
	 */
	this.handle_move_msg = function(msg) {
	
		var card_id = msg.name;
		var x = msg.x;
		var y = msg.y;

		this.cards[card_id].x = x;
		this.cards[card_id].y = y;

		// Broadcast to everyone else
		this.send_move_msg(this.cards[card_id]);
	}

	this.send_move_msg = function(card) {
		io.to('collaborators').emit('move', {
			name: card.name,
			x: card.x,
			y: card.y
		});
	}
}
app.init();
