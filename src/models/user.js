//lets require/import the mongodb native drivers.
var mongoose = require('mongoose');
var config = require('./config');
var crypto = require('crypto');
var Schema = mongoose.Schema;
var jwt = require('jsonwebtoken');
//define users
var userSchema = new Schema({
    name: { type: String, required: true}, 
    username: { type: String, required: true, unique: true },
    hash: String,
    salt: String,
    location: string, //city, may want to change this to address in the future
    Car: String, //name
    efficiency: Number, //MPG
    created_at: Date, 
    updated_at: Date,
});
userSchema.methods.generateJwt = function () {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
    
    return jwt.sign({
        _id: this._id,
        email: this.email,
        name: this.name,
        location: this.location,
        efficiency: this.efficiency,
        Car: this.Car,
        exp: parseInt(expiry.getTime() / 1000),
    }, "MY_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!
};
userSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};
userSchema.methods.validPassword = function (password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
    return this.hash === hash;
};

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

