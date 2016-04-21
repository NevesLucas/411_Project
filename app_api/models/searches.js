var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

//need to add rest of fields to schema
var searcheschema = new Schema({
    username : { type: String, required: true, trim: true },
    origin : { type: String, required: true, trim: true },
    destination : { type: String, required: true, trim: true },
    seating : { type: String, required: true, trim: true },
    round : { type: String, required: true, trim: true },
    departDate : { type: String, required: true, trim: true },
    returnDate : { type: String, required: false, trim: true }
});

var searches = Mongoose.model('searches', searcheschema);

exports.searches = searches;