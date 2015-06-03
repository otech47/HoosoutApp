var express = require('express');
var router = express.Router();

var api = require('../../controllers/api')

router.get(		'/all', 				api.images.all);
router.get(		'/id/:id', 				api.images.get);
router.post(	'/', 					api.images.post);
router.post(	'/:prop/:value', 		api.images.post);
router.delete(	'/id/:id', 				api.images.delete);

module.exports = router;