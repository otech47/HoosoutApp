var mysql = require('mysql');
var bodyParser = require('body-parser');
var geolib = require('geolib');

var settings = require('../config/settings');
var pool = mysql.createPool(settings.db);

// Check for database errors

pool.on('error', function(err) {
  console.log('Bad DB Error: '+err.code);
});

// Use the "main" MySQL database

pool.query('USE main');

var api = {};

module.exports = api;

api = function(req, res) {
	var apikey = req.body.api_key;
	if(apiKey == "3848ca45db7566b8cd6950a1ae4b9b80") {
		req.params.admin = true;
		api.run(req, req.params.route);
	} else {
		req.params.admin = false;
		api.run(req, req.params.route);
	}
};

api.run = function(req, route) {
	api[route](req);
}

api.users = function(req) {

	var command = req.params.command; 

	// Handle what to execute on the user

	if(command == "create") {

	} else if(command == "delete") {

	} else if(command == "modify") {
		
	} else if(command == "get") {
		
	}

	// Get user data

	var email = req.body.email;
	var first_name = req.body.first_name;
	var last_name = req.body.last_name;
	var password = req.body.password;
	var phone_number = req.body.phone_number;
	var profile_picture = req.body.profile_picture;

	// Create response

	var userResponse;

	// Prepare and send response

	var responseToSend = {};
	responseToSend.payload = {
		users: 	userResponse
	};
	res.json(responseToSend);

};

api.events = function(req, res) {

	var command = req.params.command; 

	// Handle what to execute on the event

	if(command == "create") {

	} else if(command == "delete") {

	} else if(command == "modify") {
		
	} else if(command == "get") {
		
	}

	var eventResponse = api.functions.events[command];

	// Prepare and send response

	var responseToSend = {};
	responseToSend.payload = {
		events: 	eventResponse
	};
	res.json(responseToSend);
}