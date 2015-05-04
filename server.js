// Core Modules

var http = require('http');
http.Agent.maxSockets = 90;
var request = require( 'request' );
var express = require( 'express' );
var app = express();
var router = express.Router();
var session = require('express-session');

// NPM Modules

var compress = require('compression');
var mysql = require('mysql')
var bodyParser = require('body-parser')

// Custom Modules

var settings = require('./config/settings')
var api = require( './api/api' );
var connection = mysql.createPool(settings.db);


// Start Server Configuration

app.use(compress());
app.use(bodyParser.json({strict:false}));
app.use(bodyParser.urlencoded());
app.engine( 'ejs', require( 'ejs-locals' ) );
app.set( 'view engine', 'ejs' );

// To set up website, start building HTML in the /views/index.ejs file
// Place website's static files in /public (CSS, Javascript, Images, Other Media Resources)

app.use(express.static( __dirname + '/public'));

// Required for properly terminating the server

terminator = function(sig){
    
    if (typeof sig === 'string') {
       console.log('%s: Received %s - terminating \'Hoosout\'...',
                   new Date(), sig);
       process.exit(1);
    }
    console.log('%s: Node server stopped.', new Date() );

};
setupTerminationHandlers = function(){
    process.on('exit', function() { terminator(); });

    ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
     'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
    ].forEach(function(element, index, array) {
        process.on(element, function() { terminator(element); });
    });
};
setupTerminationHandlers();

// Routes 
// (http://hoosoutapp.com/)
// (http://hoosoutapp.com/api)

app.get("/", function(req, res) {
	res.render('index.ejs');
});

app.get("/api", function(req, res) {
	res.render('api.ejs');
});

app.get( '/submitSQL', function( req, res ){
  var query = req.query.sql;
  console.log(query);
  connection.query(query, function(err, data) {
    if(err) {
      console.log(err);
      res.send("Error: "+err);
    }
    else res.send(data);
  });
});

app.get("/api/:route/:key/:value",    api.run);
app.post("/api/:route/:key/:value",   api.run);
app.put("/api/:route",                api.run);
app.delete("/api/:route",             api.run);

// App starts listening here

var startTime = new Date();
console.log('\'Hoosout\' started at: ' + startTime);

app.listen( 4000 );