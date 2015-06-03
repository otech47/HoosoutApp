var _ = require('underscore')
var db = require('../controllers/db')

var events = {}

var model = "events"

module.exports = events

events.createEvent = function(event, models, callback) {

	// Create SQL statement

	var insertSQL = "INSERT INTO " + model + 
	" SET establishment_id = \"" + event.establishment_id + 
	"\", datetime_start = \"" + event.datetime_start + 
	"\", datetime_end = \"" + event.datetime_end + 
	"\", image_id = \"" + event.image_id + 
	"\", event_name = \"" + event.event_name + 
	"\", facebook_url = \"" + event.facebook_url + "\"";

	// Execute SQL statement

	db(insertSQL, function(createdEvent) {
		console.log(createdEvent)
		if(createdEvent) {

			// Refresh JSON server models

			models.init(function() {
				var responseToSend = {};
				// Find event in new models and send response

				responseToSend.payload = {
					message: 	"Event created.",
					events: 	_.findWhere(models.events, {id: createdEvent.id})
				};
				callback(responseToSend)
			})
		} else {

			// No event created

			var responseToSend = {};
			responseToSend.payload = {
				message: "Error creating event",
				events: 	null
			};
			callback(responseToSend)
		}
	})
}

events.readEvent = function(event_id, models, callback) {
	var matchedEvent = _.findWhere(models.events, {id: +event_id})
	callback(matchedEvent)
}

events.updateEvent = function(event_id, property, value, models, callback) {

}

events.deleteEvent = function(event_id, models, callback) {
	var matchedEvent = _.findWhere(models.events, {id: +event_id});

	// Prepare and send response

	var responseToSend = {};

	if(matchedEvent) {

		// Doesn't delete the event from the table
		// Sets 'active' to 0 so it does not get generated in the server models

		var deleteSQL = "UPDATE " + model + " SET active = 0 WHERE id = " + event_id
		db(deleteSQL, function(response) {
			if(response) {
				models.events = _.without(models.events, matchedEvent);
				responseToSend.payload = {
					message: "Event deleted.",
					events: 	matchedEvent
				};
				callback(responseToSend);
			} else {
				responseToSend.payload = {
					message: "Error deleting event.",
					events: 	null
				}
				callback(responseToSend);
			}
		})
	} else {
		responseToSend.payload = {
			message: "Error deleting event. Invalid ID",
			events: 	null
		}
		callback(responseToSend);
	}
}