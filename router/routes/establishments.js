var express = require('express');
var router = express.Router();

var api = require('../../controllers/api')

router.get(		'/all', 				api.establishments.all);
router.get(		'/id/:id', 				api.establishments.get);
router.post(	'/', 					api.establishments.post);
router.post(	'/:prop/:value', 		api.establishments.post);
router.delete(	'/id/:id', 				api.establishments.delete);

module.exports = router;