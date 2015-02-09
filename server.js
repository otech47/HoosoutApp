var http = require('http');
http.Agent.maxSockets = 90;
var request = require( 'request' );
var express = require( 'express' );
var app = express();
var router = express.Router();

var api = require( 'api' );

app.use(compress());
app.engine( 'ejs', require( 'ejs-locals' ) );
app.set( 'view engine', 'ejs' );
app.use(bodyParser.json({strict:false}));
app.use(bodyParser.urlencoded());

app.use(express.static( __dirname + '/public'));

terminator = function(sig){
    
    if (typeof sig === 'string') {
       console.log('%s: Received %s - terminating \'Stredm\'...',
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
var startTime = new Date();
console.log('\'Hoosout\' started at: ' + startTime);

app.set( 'port', process.env.PORT || 8081);

app.listen( app.get('port') );