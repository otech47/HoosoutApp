var mysql = require('mysql')
var geolib = require('geolib')
var _ = require('underscore')

var settings = require('../config/settings')
var pool = mysql.createPool(settings.db)

var models = require("../models")

var users = require("../models/users")
var events = require("../models/events")
var establishments = require("../models/establishments")
var images = require("../models/images")
var messages = require("../models/messages")

var api = {}

api.models = models

module.exports = api

models.init(function(){
  console.log("All models initiated.");
  api.models = models
});

// Check for database errors

pool.on('error', function(err) {
  console.log('Bad DB Error: '+err.code)
})

// Use the "main" MySQL database

pool.query('USE main')

api.users = {
	all: function(req, res) {
		var responseToSend = {}
		responseToSend.payload = {
			message: "All users returned.",
			users: 	models.users
		}
		res.json(responseToSend)
	},
	get: function(req, res) {
		var user_id = req.params.id
		users.readUser(user_id, models, function(matchedUser) {

			// Prepare and send response

			var responseToSend = {};
			if(matchedUser) {
				responseToSend.payload = {
					message: "User found.",
					users: 	matchedUser
				};
			} else {
				responseToSend.payload = {
					message: "User not found.",
					users: 	[]
				};
			}
			
			res.json(responseToSend);
		})
	},
	post: function(req, res) {
		var first_name = req.body.first_name || null;
		var last_name = req.body.last_name || null;
		var email = req.body.email || null;
		var facebook_id = req.body.facebook_id || null;
		var twitter = req.body.twitter || null;
		var username = req.body.username || null;
		var password = req.body.password || null;
		var type = req.body.type || "public";

		// Insert user data into database

		var user = {
			first_name: first_name,
			last_name: last_name,
			email: email,
			facebook_id: facebook_id,
			twitter: twitter,
			username: username,
			password: password,
			type: type
		}

		users.createUser(user, models, function(response) {
			res.json(response);
		})
	},
	put: function(req, res) {
		res.status(400).send("No PUT route for users. Use POST.");
	},
	delete: function(req, res) {
		var user_id = req.query.id;
		users.deleteUser(user_id, models, function(response) {
			res.json(response)
		})
	}
};

api.events = {
	all: function(req, res) {
		var responseToSend = {}
		responseToSend.payload = {
			message: "All events returned.",
			events: 	models.events
		}
		res.json(responseToSend)
	},
	get: function(req, res) {
		var event_id = req.params.id
		events.readEvent(event_id, models, function(matchedEvent) {

			// Prepare and send response

			var responseToSend = {};
			if(matchedEvent) {
				responseToSend.payload = {
					message: "Event found.",
					events: 	matchedEvent
				};
			} else {
				responseToSend.payload = {
					message: "Event not found.",
					events: 	[]
				};
			}
			
			res.json(responseToSend);
		})
	},
	post: function(req, res) {
		var establishment_id = req.body.establishment_id || null;
		var datetime_start = req.body.datetime_start || null;
		var datetime_end = req.body.datetime_end || null;
		var image_id = req.body.image_id || null;
		var event_name = req.body.event_name || null;
		var facebook_url = req.body.facebook_url || null;

		// Insert event data into database

		var event = {
			establishment_id: establishment_id,
			datetime_start: datetime_start,
			datetime_end: datetime_end,
			image_id: image_id,
			event_name: event_name,
			facebook_url: facebook_url
		}

		events.createEvent(event, models, function(response) {
			res.json(response);
		})
	},
	put: function(req, res) {
		res.status(400).send("No PUT route for events. Use POST.");
	},
	delete: function(req, res) {
		var event_id = req.query.id;
		events.deleteEvent(event_id, models, function(response) {
			res.json(response)
		})
	}
}

api.establishments = {
	all: function(req, res) {
		var responseToSend = {}
		responseToSend.payload = {
			message: "All events returned.",
			events: 	models.events
		}
		res.json(responseToSend)
	},
	get: function(req, res) {
		var event_id = req.params.id
		events.readEvent(event_id, models, function(matchedEvent) {

			// Prepare and send response

			var responseToSend = {};
			if(matchedEvent) {
				responseToSend.payload = {
					message: "Event found.",
					events: 	matchedEvent
				};
			} else {
				responseToSend.payload = {
					message: "Event not found.",
					events: 	[]
				};
			}
			
			res.json(responseToSend);
		})
	},
	post: function(req, res) {
		var establishment_id = req.body.establishment_id || null;
		var datetime_start = req.body.datetime_start || null;
		var datetime_end = req.body.datetime_end || null;
		var image_id = req.body.image_id || null;
		var event_name = req.body.event_name || null;
		var facebook_url = req.body.facebook_url || null;

		// Insert event data into database

		var event = {
			establishment_id: establishment_id,
			datetime_start: datetime_start,
			datetime_end: datetime_end,
			image_id: image_id,
			event_name: event_name,
			facebook_url: facebook_url
		}

		events.createEvent(event, models, function(response) {
			res.json(response);
		})
	},
	put: function(req, res) {
		res.status(400).send("No PUT route for events. Use POST.");
	},
	delete: function(req, res) {
		var event_id = req.query.id;
		events.deleteEvent(event_id, models, function(response) {
			res.json(response)
		})
	}
}

api.images = {
	all: function(req, res) {
		var responseToSend = {}
		responseToSend.payload = {
			message: "All events returned.",
			events: 	models.events
		}
		res.json(responseToSend)
	},
	get: function(req, res) {
		var event_id = req.params.id
		events.readEvent(event_id, models, function(matchedEvent) {

			// Prepare and send response

			var responseToSend = {};
			if(matchedEvent) {
				responseToSend.payload = {
					message: "Event found.",
					events: 	matchedEvent
				};
			} else {
				responseToSend.payload = {
					message: "Event not found.",
					events: 	[]
				};
			}
			
			res.json(responseToSend);
		})
	},
	post: function(req, res) {
		var establishment_id = req.body.establishment_id || null;
		var datetime_start = req.body.datetime_start || null;
		var datetime_end = req.body.datetime_end || null;
		var image_id = req.body.image_id || null;
		var event_name = req.body.event_name || null;
		var facebook_url = req.body.facebook_url || null;

		// Insert event data into database

		var event = {
			establishment_id: establishment_id,
			datetime_start: datetime_start,
			datetime_end: datetime_end,
			image_id: image_id,
			event_name: event_name,
			facebook_url: facebook_url
		}

		events.createEvent(event, models, function(response) {
			res.json(response);
		})
	},
	put: function(req, res) {
		res.status(400).send("No PUT route for events. Use POST.");
	},
	delete: function(req, res) {
		var event_id = req.query.id;
		events.deleteEvent(event_id, models, function(response) {
			res.json(response)
		})
	}
}

api.messages = {
	all: function(req, res) {
		var responseToSend = {}
		responseToSend.payload = {
			message: "All events returned.",
			events: 	models.events
		}
		res.json(responseToSend)
	},
	get: function(req, res) {
		var event_id = req.params.id
		events.readEvent(event_id, models, function(matchedEvent) {

			// Prepare and send response

			var responseToSend = {};
			if(matchedEvent) {
				responseToSend.payload = {
					message: "Event found.",
					events: 	matchedEvent
				};
			} else {
				responseToSend.payload = {
					message: "Event not found.",
					events: 	[]
				};
			}
			
			res.json(responseToSend);
		})
	},
	post: function(req, res) {
		var establishment_id = req.body.establishment_id || null;
		var datetime_start = req.body.datetime_start || null;
		var datetime_end = req.body.datetime_end || null;
		var image_id = req.body.image_id || null;
		var event_name = req.body.event_name || null;
		var facebook_url = req.body.facebook_url || null;

		// Insert event data into database

		var event = {
			establishment_id: establishment_id,
			datetime_start: datetime_start,
			datetime_end: datetime_end,
			image_id: image_id,
			event_name: event_name,
			facebook_url: facebook_url
		}

		events.createEvent(event, models, function(response) {
			res.json(response);
		})
	},
	put: function(req, res) {
		res.status(400).send("No PUT route for events. Use POST.");
	},
	delete: function(req, res) {
		var event_id = req.query.id;
		events.deleteEvent(event_id, models, function(response) {
			res.json(response)
		})
	}
}