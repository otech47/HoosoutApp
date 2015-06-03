var express = require('express');
var router = express.Router();

var api = require('../../controllers/api')

router.get(		'/all', 				api.users.all);
router.get(		'/id/:id', 				api.users.get);
router.post(	'/', 					api.users.post);
router.post(	'/:id/:prop/:value', 	api.users.post);
router.delete(	'/id', 					api.users.delete);

module.exports = router;