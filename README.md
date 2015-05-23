# cards

This is a small web application that can be used to run collaborative discovery sessions.

It uses Angular JS as the client side JS framework, Node JS (+Express, +Socket IO) as the backend.  For package
management, it uses NPM for the main install, followed by Bower to download all the client side dependencies for
Angular to use.

Prerequisites
- You will need Node JS and NPM (Node Package Manger) installed. 
  These can be downloaded as a tarball from https://nodejs.org/

To install:

	- git clone https://github.com/ahhbristow/cards
	- npm install (This takes a while)
	- bower install

To run server:

	- node server/js/server.js

Serving static content:

	- cd /app
	- npm start (This will start up a basic webserver using the http-server command bundled with NPM).

Usage
	- http://localhost:3000/cards

