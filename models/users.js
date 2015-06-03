var _ = require('underscore')
var db = require('../controllers/db')

var users = {}

var model = "users"

module.exports = users

users.createUser = function(user, models, callback) {
	var insertSQL = "INSERT INTO " + model + 
	" SET first_name = \"" + user.first_name + 
	"\", last_name = \"" + user.last_name + 
	"\", email = \"" + user.email + 
	"\", facebook_id = \"" + user.facebook_id + 
	"\", twitter = \"" + user.twitter + 
	"\", username = \"" + user.username + 
	"\", password = \"" + user.password + 
	"\", type = \"" + user.type + "\"";

	db(insertSQL, function(createdUser) {
		console.log(createdUser)
		if(createdUser) {
			models.init(function() {
				var responseToSend = {};
				responseToSend.payload = {
					message: "User created.",
					users: 	_.findWhere(models.users, {email: user.email})
				};
				callback(responseToSend)
			})
		} else {
			var responseToSend = {};
			responseToSend.payload = {
				message: "Error creating user",
				users: 	null
			};
			callback(responseToSend)
		}
		
	})
}

users.readUser = function(user_id, models, callback) {
	var matchedUser = _.findWhere(models.users, {id: +user_id})
	callback(matchedUser)
}

users.updateUser = function(user_id, property, value, models, callback) {

}

users.deleteUser = function(user_id, models, callback) {
	var matchedUser = _.findWhere(models.users, {id: +user_id});

	// Prepare and send response

	var responseToSend = {};

	if(matchedUser) {

		// Doesn't delete the user from the table
		// Sets 'active' to 0 so it does not get generated in the server models

		var deleteSQL = "UPDATE " + model + " SET active = 0 WHERE id = " + user_id
		db(deleteSQL, function(response) {
			if(response) {
				models.users = _.without(models.users, matchedUser);
				responseToSend.payload = {
					message: "User deleted.",
					users: 	matchedUser
				};
				callback(responseToSend);
			} else {
				responseToSend.payload = {
					message: "Error deleting user.",
					users: 	null
				}
				callback(responseToSend);
			}
		})
	} else {
		responseToSend.payload = {
			message: "Error deleting user. Invalid ID",
			users: 	null
		}
		callback(responseToSend);
	}
}