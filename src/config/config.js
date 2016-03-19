var path = require('path');

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
		key : 'AIzaSyBvfzNSodxiEVAe8tco4LXjeWT-hbLnjNA',
		count: 20,
		search: '/search'
	}
}