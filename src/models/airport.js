var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var flightsSchema = new Schema({ any: {},  //takes raw qpx response and stores
    updated_at: Date
});

flightsSchema.pre('save', function (next) {  //check if data has previously been cached, if yes, then do not create new document
    // get the current date
    var self = this;
  
});

userSchema.pre('update', function (next) {  //update date when new values are cached
    // get the current date
    var self = this;
});

var flights = Mongoose.model('flights', flightsSchema);

exports.flights  = flights;
	
