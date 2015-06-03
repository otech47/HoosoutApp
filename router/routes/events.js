var express = require('express');
var router = express.Router();

var api = require('../../controllers/api')

router.get(		'/all', 				api.events.all);
router.get(		'/id/:id', 				api.events.get);
router.post(	'/', 					api.events.post);
router.post(	'/:prop/:value', 		api.events.post);
router.delete(	'/id/:id', 				api.events.delete);

module.exports = router;