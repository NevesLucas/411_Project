//lets require/import the mongodb native drivers.
var mongoose = require('mongoose');
var config = require('./config');

var Schema = mongoose.Schema;

//define users
var userSchema = new Schema({
    name: String, username: { type: String, required: true, unique: true },
    password: {
        type: String, 
        required: true},
    admin: Boolean, 
    location: string, 
    Car: String, 
    efficiency: Number,
    created_at: Date, 
    updated_at: Date
});
// on every save, add the date
userSchema.pre('save', function (next) {
    // get the current date
    var currentDate = new Date();
    
    // change the updated_at field to current date
    this.updated_at = currentDate;
    
    // if created_at doesn't exist, add to that field
    if (!this.created_at)
        this.created_at = currentDate;
    
    next();
});

var User = mongoose.model('User', userSchema);
module.exports = User;

//to add user to database, create new user, fill in data and call username.save(function(err){});

