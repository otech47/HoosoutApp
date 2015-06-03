var _ = require('underscore')
var db = require('../controllers/db')

var images = {}

var model = "images"

module.exports = images

images.createImage = function(imageURL, models, callback) {

	// Create SQL statement

	var insertSQL = "INSERT INTO " + model + 
	" SET image_url = \"" + imageURL.facebook_url + "\"";

	// Execute SQL statement

	db(insertSQL, function(createdImage) {
		console.log(createdImage)
		if(createdImage) {

			// Refresh JSON server models

			models.init(function() {

				// Find image in new models and send response

				var responseToSend = {};
				responseToSend.payload = {
					message: 	"Image created.",
					images: 	_.findWhere(models.images, {image_url: image_url})
				};
				callback(responseToSend)
			})
		} else {

			// No image created

			var responseToSend = {};
			responseToSend.payload = {
				message: 	"Error creating image",
				images: 	null
			};
			callback(responseToSend)
		}
		
	})
}

images.readImage = function(image_id, models, callback) {
	var matchedImage = _.findWhere(models.images, {id: +image_id})
	callback(matchedImage)
}