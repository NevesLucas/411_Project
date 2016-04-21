var Boom = require('boom'),
    User = require('../models/user').user;
var mongoose = requires("mongoose");

exports.getUser = function (request, reply){
    var queryTxt = new RegExp('^'+request+'$', "i");
    user.find({ name: queryTxt }, function (err, doc) {
        if (!err) {
            console.log("Query user: " + queryTxt);
            reply(doc);
        } 
        else {
            reply(Boom.badImplementation(err)); // 500 error
        }

    });
        
};

exports.saveUser = function (request, reply) {  //input is json following schema format
    
    var newuser = new User(request);
    newuser.save(function (err) {
        if (!err) {
            console.log("new user created");
        }
        else {
            reply(Boom.badImplementation(err));
        }
    });
};
