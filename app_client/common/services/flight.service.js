(function() {

  angular
    .module('meanApp')
    .service('flightData', flightData);


  function flightData() {

    this.savedTrip = {};
    this.desination = {};
    this.origins = {};
    this.travelType = {};

    this.set = function(data) {
        this.savedTrip = data;
    };

    this.get = function() {
        return this.savedTrip;
    }

    this.setDest = function(dest) {
        this.desination = dest;
    };

    this.getDest = function() {
        return this.desination;
    }

    this.setOri = function(ori) {
        this.origins = ori;
    };

    this.getOri = function() {
        return this.origins;
    }

    this.setType = function(type) {
        this.travelType = type;
    };

    this.getType = function() {
        return this.travelType;
    }


  }

})();



