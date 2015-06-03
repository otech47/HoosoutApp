var _ = require('underscore')
var db = require('../controllers/db')

var establishments = {}

var model = "establishments"

module.exports = establishments

establishments.createEstablishment = function(establishment, models, callback) {

	// Create SQL statement

	var insertSQL = "INSERT INTO " + model + 
	" SET establishment_name = \"" + establishment.establishment_name + 
	"\", latitude = \"" + establishment.latitude + 
	"\", longitude = \"" + establishment.longitude + 
	"\", address = \"" + establishment.address + 
	"\", owner_id = \"" + establishment.owner_id + 
	"\", image_id = \"" + establishment.image_id + "\"";

	// Execute SQL statement

	db(insertSQL, function(createdEstablishment) {
		console.log(createdEstablishment)
		if(createdEstablishment) {

			// Refresh JSON server models

			models.init(function() {
				var responseToSend = {};
				// Find establishment in new models and send response

				responseToSend.payload = {
					message: 	"Establishment created.",
					establishments: 	_.findWhere(models.establishments, {id: createdEstablishment.id})
				};
				callback(responseToSend)
			})
		} else {

			// No establishment created

			var responseToSend = {};
			responseToSend.payload = {
				message: "Error creating establishment",
				establishments: 	null
			};
			callback(responseToSend)
		}
	})
}

establishments.readEstablishment = function(establishment_id, models, callback) {
	var matchedEstablishment = _.findWhere(models.establishments, {id: +establishment_id})
	callback(matchedEstablishment)
}

establishments.updateEstablishment = function(establishment_id, property, value, models, callback) {

}

establishments.deleteEstablishment = function(establishment_id, models, callback) {
	var matchedEstablishment = _.findWhere(models.establishments, {id: +establishment_id});

	// Prepare and send response

	var responseToSend = {};

	if(matchedEstablishment) {

		// Doesn't delete the establishment from the table
		// Sets 'active' to 0 so it does not get generated in the server models

		var deleteSQL = "UPDATE " + model + " SET active = 0 WHERE id = " + establishment_id
		db(deleteSQL, function(response) {
			if(response) {
				models.establishments = _.without(models.establishments, matchedEstablishment);
				responseToSend.payload = {
					message: "Establishment deleted.",
					establishments: 	matchedEstablishment
				};
				callback(responseToSend);
			} else {
				responseToSend.payload = {
					message: "Error deleting establishment.",
					establishments: 	null
				}
				callback(responseToSend);
			}
		})
	} else {
		responseToSend.payload = {
			message: "Error deleting establishment. Invalid ID",
			establishments: 	null
		}
		callback(responseToSend);
	}
}