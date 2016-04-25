(function () {
    
    angular
    .module('meanApp')
    .controller('searchCtrl', searchCtrl);
    
    searchCtrl.$inject = ['$scope', '$http', 'flightData', '$location', '$filter']
    function searchCtrl($scope, $http, flightData, $location, $filter) {

        console.log('searchCtrl is running');

        $scope.SendData = function() {

        // hit backend with request
        var url = "localhost:3000/api/itineraries";

        var data = {
            farePrefrence: $scope.farePrefrence,
            fromAirport: $scope.fromAirport,
            fromDate: $filter('date')($scope.fromDate, 'yyyy-MM-dd'),
            passengers: $scope.passengers,
            toAirport: $scope.toAirport ,
            toDate: $filter('date')($scope.toDate, 'yyyy-MM-dd'),
            travelType: $scope.travelType
        };


        var requestData = _buildRequestData(data);
        var config = {headers: {'content-type': 'application/json'}};

        $http.post(url, requestData, config)
        .success(function (data, status, headers, config) {
            $location.path('/result');
            flightData.set(data);
            flightData.setOri($scope.fromAirport);
            flightData.setDest($scope.fromAirport);
            flightData.setType($scope.travelType);
            
})();


_buildRequestData = function(request) {
 	var preferredCabin = _getPreferredCabin(request.farePrefrence);

    var depatureSlice = {
            origin: request.fromAirport,
            destination: request.toAirport,
            date: request.fromDate,
            preferredCabin: preferredCabin
        };

    var slices = [];
    slices.push(depatureSlice);

    if(request.travelType == 'Round-trip') {
        var returnSlice = {
            origin: request.toAirport,
            destination: request.fromAirport,
            date: request.toDate,
            preferredCabin: preferredCabin
        };
        slices.push(returnSlice);
    }

    searchCtrl.$inject = ['$location', 'meanData'];
    function searchCtrl($location, meanData) {
        console.log('searchCtrl is running');
            var vm = this;
            
            vm.user = {};
            
            meanData.getProfile()
      .success(function (data) {
                vm.user = data;
            })
      .error(function (e) {
                console.log(e);
            });
        
    }
    
    var requestData = {
      request: {
        slice: slices,
        passengers: {
          adultCount: request.passengers
        },
        solutions: 5,
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



