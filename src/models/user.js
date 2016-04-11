//lets require/import the mongodb native drivers.
var mongoose = require('mongoose');
var config = require('./config');

var Schema = mongoose.Schema;

//define users
var userSchema = new Schema({
    name: { type: String, required: true}, 
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true},
    admin: {type: Boolean, default: false }, 
    location: string, //city, may want to change this to address in the future
    Car: String, //name
    efficiency: Number, //MPG
    created_at: Date, 
    updated_at: Date,
    });
// on every save, add the date
userSchema.pre('save', function (next) {
    // get the current date
    var self = this;
    UserModel.find({ name : self.name }, function (err, docs) {  //verify if user exists already when attempting to save
        if (!docs.length) {
            
            var currentDate = new Date();
            
            // change the updated_at field to current date
            this.updated_at = currentDate;
            
            // if created_at doesn't exist, add to that field
            if (!this.created_at)
                this.created_at = currentDate;
            
            next();
        } else {
            console.log('user exists: ', self.name);
            next(new Error("User exists!"));
        }
    });
});

userSchema.pre('update', function (next) {
    // get the current date
    var self = this;
    UserModel.find({ name : self.name }, function (err, docs) {  //verify if user exists already when attempting to update
        if (!docs.length) {
            console.log('user does not exist: ', self.name);
            next(new Error("User doesnt exist!"));

        } else {
            var currentDate = new Date();
            // change the updated_at field to current date
            // if created_at doesn't exist, add to that field
            this.updated_at = currentDate;
            next();
        }
    });
});

var user = mongoose.model('User', userSchema);
module.exports = user;

//to add user to database, create new user, fill in data and call username.save(function(err){});

