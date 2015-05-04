var mysql = require('mysql')
var geolib = require('geolib')
var _ = require('underscore')

var settings = require('../config/settings')
var pool = mysql.createPool(settings.db)
var models = require("../models")

models.init(function(){
  console.log("All models initiated.");
});

// Check for database errors

pool.on('error', function(err) {
  console.log('Bad DB Error: '+err.code)
})

// Use the "main" MySQL database

pool.query('USE main')

var api = {}

module.exports = api

api.run = function(req, res) {
	var apikey = "3848ca45db7566b8cd6950a1ae4b9b80"
	if(apikey == "3848ca45db7566b8cd6950a1ae4b9b80") {
		req.params.admin = true
	} else {
		req.params.admin = false
	}
	var route = req.params.route
	api[route](req, res)
};

api.init = function(app, incomingModels) {
  app.use(bodyParser.json({strict:false}))
  models = incomingModels
  exports.models = models
};

api.users = function(req, res) {
	var model = "users"

	var key = req.params.key || null
	var value = req.params.value || null

	// Handle what to execute on the user

	switch(req.method) {
		case "GET":
			// Create response

			var matchedUser = _.findWhere(models.users, {id: +value});

			// Prepare and send response

			var responseToSend = {};
			if(matchedUser == -1) {
				responseToSend.payload = {
					message: "User not found.",
					users: 	[]
				};
			} else {
				responseToSend.payload = {
					message: "User found.",
					users: 	matchedUser
				};
			}
			
			res.json(responseToSend);
		case "POST":
			
			res.status(400).send("No POST route for " + model + ". Use PUT.");


		case "PUT":
			// Get user info from request

			var first_name = req.body.first_name || null;
			var last_name = req.body.last_name || null;
			var email = req.body.email || null;
			var facebook_id = req.body.facebook_id || null;
			var twitter = req.body.twitter || null;
			var username = req.body.username || null;
			var password = req.body.password || null;
			var type = req.body.type || "public";

			// Insert user data into database

			var insertSQL = "INSERT INTO " + model + " SET first_name = \"" + first_name + "\", last_name = \"" + last_name + "\", email = \"" + email + "\", facebook_id = \"" + facebook_id + "\", twitter = \"" + twitter + "\", username = \"" + username + "\", password = \"" + password + "\", type = \"" + type + "\"";

			pool.getConnection(function(err, connection) {
				connection.query(insertSQL, function(err, rows, fields) {
					connection.release()
					if(err) {
						console.log(err)
						res.status(400).send("Error creating user.")
					}
					else {
						console.log(rows)
						models.init(function() {
							var responseToSend = {};
							responseToSend.payload = {
								message: "User created.",
								users: 	_.findWhere(models.users, {email: email})
							};
							res.json(responseToSend);
						})
					}
				})
			})
		case "DELETE":
			var id = req.body.id;
			var matchedUser = _.findWhere(models.users, {id: +id});

			// Prepare and send response

			var responseToSend = {};

			if(matchedUser == -1) {
				res.status(400).send("User not found.");
			} else {
				pool.getConnection(function(err, connection) {
					if(err == null) {
						connection.query("UPDATE " + model + " SET active = 0 WHERE id = ?", [id], function(err, rows, fields) {
							connection.release();
							models.users = _.without(models.users, matchedUser);
							responseToSend.payload = {
								message: "User deleted.",
								users: 	matchedUser
							};
							res.json(responseToSend);
						})
					}
					else {
						console.log("MYSQL ERROR: ", err)
					}
				});
			}
	}

};

api.events = function(req, res) {

	var model = "events"

	var key = req.params.key || null
	var value = req.params.value || null

	// Handle what to execute on the user

	switch(req.method) {
		case "GET":
			// Create response

			var matchedEvent = _.findWhere(models.events, {id: +value});

			// Prepare and send response

			var responseToSend = {};
			if(matchedEvent == -1) {
				responseToSend.payload = {
					message: "Event not found.",
					events: []
				};
			} else {
				responseToSend.payload = {
					message: "Event found.",
					events: matchedEvent
				};
			}
			
			res.json(responseToSend);
		case "POST":
			
		case "PUT":
			res.status(400).send("No PUT route for " + model + ". Use POST.");
		case "DELETE":
			
	}
}