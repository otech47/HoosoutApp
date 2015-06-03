var mysql = require('mysql')

var settings = require('../config/settings')
var pool = mysql.createPool(settings.db)

// Check for database errors

pool.on('error', function(err) {
  console.log('Bad DB Error: '+err.code)
})

var db = function(sql, callback) {
	pool.getConnection(function(err, connection) {
		connection.query(sql, function(err, rows, fields) {
			connection.release()
			if(err) {
				console.log(err)
				callback()
			}
			else {
				console.log(rows)
				callback(rows)
			}
		})
	})
}

module.exports = db

