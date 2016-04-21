var config = require('../config/config'),
    req = require('request'),  
    Boom = require('boom');
var mongoose = require('mongoose');
var flights = require('./../models/flights');
var Flights = mongoose.model('flights');
var tripData = require('./../data/tripSearchData.json');
var mongo = require('../config/mongo.js');
/** get all Itineraries from QPX Express API for the search request */
exports.getItineraries = function(request, reply) {
    console.log(request.payload);
	var requestData = _buildRequestData(request);
	console.log("Query Data: "+requestData);
    
    reply(tripData);  
    /*
    var newFLights = new Flights(tripData);

    newFLights.save(function (err){ //adding to db, but needs to be done periodically instead of after every call
        if (err) return handleError(err)
        })

    Flights.find(requestData, function (err, flightdata) {
        reply(flightdata);
    });

    */
    //going to need to sift through data before storing, need to decide what needs to be stored

   
     /*
	req.post(
             config.qpx.endpoint+config.qpx.search+'?key='+config.qpx.key,
             {headers: {'content-type': 'application/json'},
             body: JSON.stringify(requestData) },
        function(err, res, data) {
            if (!err) {
             
                reply(data);

            }
            else {
	            reply(Boom.badImplementation(err)); // 500 error
	        }
     
	}); */
};


 _buildRequestData = function(request) {
 	var preferredCabin = _getPreferredCabin(request.payload.farePrefrence);

    var depatureSlice = {
            origin: request.payload.fromAirport,
            destination: request.payload.toAirport,
            date: request.payload.fromDate,
            preferredCabin: preferredCabin
        };

    var slices = [];
    slices.push(depatureSlice);

    if(request.payload.travelType =='Round-trip') {
        var returnSlice = {
            origin: request.payload.toAirport,
            destination: request.payload.fromAirport,
            date: request.payload.toDate,
            preferredCabin: preferredCabin
        };
        slices.push(returnSlice);
    }
    
    var requestData = {
      request: {
        slice: slices,
        passengers: {
          adultCount: request.payload.passengers
        },
        solutions: config.qpx.count,
        refundable: false
      }
    };

    return requestData;
 };

 _getPreferredCabin = function(farePrefrence) {
 	var cabinPrefrence = '';

 	switch(farePrefrence) {
	    case 'Economy':
	        cabinPrefrence = 'COACH';
	        break;
	    case 'Business':
	        cabinPrefrence = 'BUSINESS';
	        break;
	    case 'First':
	        cabinPrefrence = 'FIRST';
	        break;	        
	    default:
	        cabinPrefrence = 'COACH';
 	}

 	return cabinPrefrence;
 }