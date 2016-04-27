(function() {
  
  angular
    .module('meanApp')
    .controller('resultCtrl', resultCtrl);

  resultCtrl.$inject = ['$scope', 'flightData', '$http', '$sce'];
  function resultCtrl($scope, flightData, $http, $sce) {
  	$scope.result = flightData.get();
  	$scope.destination = flightData.getDest();
  	$scope.origin = flightData.getOri();
  	$scope.travelType = flightData.getType();

    console.log('gas price search is running');

    $http({
      method: 'GET',
      url: "http://www.fueleconomy.gov/ws/rest/fuelprices"
    }).then(function success(response) {
      $scope.priceGas = response.data.regular;
    }, function error(data, status, headers, config) {
      $scope.errorMessage = "Something went wrong";
      console.log("price search not successful")
    });

    console.log('distance search is running');
    var directionsService = new google.maps.DirectionsService();
    var request = {
      origin: flightData.getOri() + "airport",
      destination: flightData.getDest() + "airport",
      travelMode: google.maps.TravelMode.DRIVING
    };

    directionsService.route(request, function(response, status) {
        //$scope.resp = status + " " + request.origin + " " + request.destination;
        if (status == "OK") {
          $scope.dist = response.routes[0].legs[0].distance.value / 1609.34;
        };
    });

    console.log('whats up');

    $scope.trustSrc = function(src) {
      return $sce.trustAsResourceUrl(src);
    }

    $scope.mapFrame = "https://www.google.com/maps/embed/v1/directions?origin=airport" + $scope.origin + "&destination=airport" + $scope.destination + "&key=AIzaSyAN0om9mFmy1QN6Wf54tXAowK4eT0ZUPrU&mode=driving";
    //$scope.mapLink = "https://maps.google.com?saddr=airport" + $scope.origin + "&daddr=airport" + $scope.destination + "&key=AIzaSyAN0om9mFmy1QN6Wf54tXAowK4eT0ZUPrU";

    $scope.milesPerGallon = 23.6;
    //if ($scope.milesPerGallonEntry != null) {
    //  $scope.milesPerGallon = parseInt($scope.milesPerGallonEntry*100, 10) / 100;
    //}

  }

})();

