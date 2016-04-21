var Hapi = require('hapi'),
	config = require('./src/config/config'),
    routes = require('./src/config/routes');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var db = require('./src/config/db')(server);
require('./src/config/passport');


var server = new Hapi.Server();
server.connection({
    host: config.server.host,
	port: config.server.port,
    routes: {
        cors: {
            methods : ['GET', 'HEAD', 'POST', 'PUT', 'OPTIONS'],
            headers : ['Authorization', 'Content-type', 'If-None-Match','Access-Control-Allow-Origin']
        }
    }
});

server.use(passport.initialize());
server.use('/api', routesApi);

server.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401);
        res.json({ "message" : err.name + ": " + err.message });
    }
});
db.startup();

routes.init(server);

server.start(function() {
	server.log("Flights-Server started at : "+server.info.uri);
});


module.exports = server;
