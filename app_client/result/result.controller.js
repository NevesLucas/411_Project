(function() {
  
  angular
    .module('meanApp')
    .controller('resultCtrl', resultCtrl);

  resultCtrl.$inject = ['$scope', 'flightData'];
  function resultCtrl($scope, flightData) {
  	$scope.result = flightData.get();
  	$scope.destination = flightData.getDest();
  	$scope.origins = flightData.getOri();
  	$scope.travelType = flightData.getType()
  }

})();

