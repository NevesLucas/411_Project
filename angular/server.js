
var Inert = require('inert');
var Vision = require('vision');
var HapiSwagger = require('hapi-swagger');
var Pack = require('./package')

var Hapi = require('hapi'),
	config = require('./src/config/config')


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


server.register(require('inert'), (err) => {

    if (err) {
        throw err;
    }

    server.route({
        method: 'GET',
        path: '/{path*}',
        handler: {
            directory: {
                path: './public',
                listing: false,
                index: true
            }
        }
    });
});



db = require('./src/config/db')(server),
db.startup();


server.start(function() {
    server.log("Flights-Server started at : "+server.info.uri);
});


module.exports = server;



