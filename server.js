var express = require('express');
var hbs = require('hbs');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');
var errorHandler = require('errorhandler');
var http = require('http');
var path = require('path');
var Middleware = require('./utilities/Middleware');
var app = express();
app.set('port', 8080);

app.set('view engine', 'html');
app.engine('html', hbs.__express);

/* cookie-parser - https://github.com/expressjs/cookie-parser
 Parse Cookie header and populate req.cookies with an object keyed by the cookie names. */
app.use(cookieParser('SECRETCOOKIEKEY123'));
 
/* body-parser - https://github.com/expressjs/body-parser 
Node.js body parsing middleware. */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* method-override - https://github.com/expressjs/method-override
 Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it. */           
app.use(methodOverride());

/* errorhandler - https://github.com/expressjs/errorhandler
 Show errors in development. */
app.use(errorHandler({ dumpExceptions: true, showStack: true }));

app.use(express.static(path.join(__dirname, '')));

app.use(Middleware.AppendPageInfo);

// send app to router
require('./router')(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});