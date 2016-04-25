(function() {

  angular
    .module('meanApp')
    .service('flightData', flightData);


  function flightData() {

    this.savedTrip = {};

    this.set = function(data) {
        this.savedTrip = data;
    };

    this.get = function() {
        return this.savedTrip;
    }
  }

})();
