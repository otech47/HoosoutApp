var express = require('express');
var router = express.Router();

var api = require('../../controllers/api')

router.get(		'/all', 				api.messages.all);
router.get(		'/id/:id', 				api.messages.get);
router.post(	'/', 					api.messages.post);
router.post(	'/:prop/:value', 		api.messages.post);
router.delete(	'/id/:id', 				api.messages.delete);

module.exports = router;