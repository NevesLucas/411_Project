var itineraries = require('../handlers/itineraries');


module.exports.getItineraries = function (request, reply) {

    return itineraries.getItineraries(request, reply);
};



