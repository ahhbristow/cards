'use strict';

/* Controllers */
var phonecatApp = angular.module('phonecatApp', []);

phonecatApp.controller('PhoneListCtrl', function ($scope,socket) {

	$scope.objects = [
		{name:'one',x:'0',y:'0'},
		{name:'two',x:'100',y:'0'}
	];


	// TODO: All these need to be changed to member functions
	
	$scope.dragEnd = function(object) {
	}

	$scope.dragMove = function(object) {
		$scope.registerMove(object);
	}

	// Socket IO stuff
	$scope.registerMove=function(object) {
		socket.emit('move', {
			name: object.name,
			x: object.x,
			y: object.y
		}, function (result) {
			if (!result) {
				console('There was an error registering move');
			}
		});
	}



});
