'use strict';

/* Controllers */
var cardsApp = angular.module('cardsApp', []);

cardsApp.controller('CardsCtrl', function ($scope,socket) {

	$scope.cards = {
		"one" : {
			name:'one', x:'0', y:'0'
		},
		"two" : {
			name:'two', x:'100', y:'0'
		}
	};


	// TODO: All these need to be changed to member functions
	
	$scope.dragEnd = function(card) {
	}

	$scope.dragMove = function(card) {
		$scope.registerMove(card);
	}

	// Socket IO stuff
	$scope.registerMove=function(card) {
		socket.emit('move', {
			name: card.name,
			x: card.x,
			y: card.y
		}, function (result) {
			if (!result) {
				console('There was an error registering move');
			}
		});
	}

	socket.on('move', function(msg){
		$scope.handle_move_msg(msg)
	});

	$scope.handle_move_msg = function(msg) {
	
		var card_id = msg.name;
		var x = msg.x;
		var y = msg.y;

		$scope.cards[card_id].x = x;
		$scope.cards[card_id].y = y;
	}
});
