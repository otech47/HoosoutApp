var _ = require('underscore');
var mysql = require('mysql');
var async = require('async');
var moment = require('moment');

var settings = require('../config/settings');
var pool = mysql.createPool(settings.db);
var queries = require('./queries');

pool.on('error', function(err) {
  console.log('Bad DB Error: '+err.code); // 'ER_BAD_DB_ERROR'
});

pool.query('USE main');

// MySQL's group_concat() function needs to be raised

pool.on('connection', function(connection) {
  	connection.query(queries.setGroupConcatMaxLen, function(err, data) {
  		checkAndLog(err, data);
  	});
});


var models = {};

module.exports = models;

models.users = null,

models.update =  function(type, callback) {
	if(type) {
		sendQuery(type, function() {
			if(callback) {
				callback()
			}
		});
	}
	else {
		models.init();
	}
}

// Initiates models for each dbitem referenced here located in models/queries.js

var dbitems = ["users", "events", "establishments"];

models.init = function(callback) {
	async.eachSeries(dbitems, sendQuery, function(err) {
		extendModels(callback);
	});
}

// Put function names in the array send to async.series 
// to extend models after they've been initiated
// See https://www.npmjs.com/package/async documentation for details

function extendModels(superCallback) {
	console.log("Extending Models...")
	async.series([
		],
		function() {
			console.log("Finished Extending Models.")
			if(superCallback) {
				superCallback();
			}
	});
}

// Store database results in models

function storeModel(item, dbresult, asyncCallback) {
	models[item] = dbresult;
	asyncCallback();
}

function checkAndLog(err, rows, cb) {
  if(err) {
    console.log("Check and Log Error: "+err);
    return false;
  } else {
    console.log("Check and Log Success: "+rows);
    return true;
  }
}

function sendQuery(item, callback) {
	console.log( "Retrieving " + item + " model ..." )
	pool.getConnection(function(err, connection) {
		if(err == null) {
			connection.query(queries[item], function(err, rows, fields) {
				if(err == null) {
					connection.release()
					console.log(rows.length + " " + item + " loaded.")
					storeModel(item, rows, callback)
				} else {
					console.log("MYSQL ERROR: ", err)
				}
				
			})
		}
		else {
			console.log("MYSQL ERROR: ", err)
		}
	});
}
