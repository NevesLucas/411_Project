var path = require('path');
var Akey = 'AIzaSyC94iyxgTlqCnHrUGWOLrwso5VZYRPZniM'
module.exports = {
	rootpath: path.normalize(__dirname+'/../..'),
	server : {
		host: 'localhost',
		port: 3000
	},
	database : {
		host: '127.0.0.1',
		port: 27017,
		db: 'flights',
		username: '',
		password: ''
	},
	qpx : {
		endpoint : ' https://www.googleapis.com/qpxExpress/v1/trips',
		key : Akey,
		count: 20,
		search: '/search'
	}
}
