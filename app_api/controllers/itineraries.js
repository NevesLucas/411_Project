var config = require('../config/config');
var mongoose = require('mongoose');
var flights = require('./../models/flights');
var request = require('request');
     
/** @module Controller for Itineraries */

/** get all Itineraries from QPX Express API for the search request */

/** get all Itineraries from QPX Express API for the search request */
exports.getItineraries = function(req, rep) {
    console.log(req.body);
    var requestData = _buildRequestData(req);
    console.log("Query Data: "+JSON.stringify(requestData));

    //  rep(tripData);

    var url = 'https://www.googleapis.com/qpxExpress/v1/trips/search?key='+config.qpx.key;

    request({
        url: url,
        method: "POST",
        json: true,
        headers: {
            "content-type": "application/json"
        },
        body: requestData
    }, function (err, res, body) {
        if (!err) {
            res.send(body);
        } else {
            console.log("Error: QPX post request");
        }
    })
};

_buildRequestData = function(req) {
    var preferredCabin = _getPreferredCabin(req.body.farePrefrence);

    var depatureSlice = {
        origin: req.body.fromAirport,
        destination: req.body.toAirport,
        date: req.body.fromDate,
        preferredCabin: preferredCabin
    };

    var slices = [];
    slices.push(depatureSlice);

    if(req.body.travelType =='Round-trip') {
        var returnSlice = {
            origin: req.body.toAirport,
            destination: req.body.fromAirport,
            date: req.body.toDate,
            preferredCabin: preferredCabin
        };
        slices.push(returnSlice);
    }

    var requestData = {
        request: {
            slice: slices,
            passengers: {
                adultCount: req.body.passengers
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
};

