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

// Custom Modules

var api = require( './api/api' );

// Start Server Configuration

app.use(compress());
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
    //  Process on exit and signals.
    process.on('exit', function() { terminator(); });

    ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
     'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
    ].forEach(function(element, index, array) {
        process.on(element, function() { terminator(element); });
    });
};
setupTerminationHandlers();

// App starts listening here

var startTime = new Date();
console.log('\'Hoosout\' started at: ' + startTime);

app.set( 'port', process.env.PORT || 8081);

app.listen( app.get('port') );