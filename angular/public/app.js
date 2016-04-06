

angular.module('tripApp', [])
    .controller('tripController', function($scope, $http) {

        $scope.SendData = function() {

        var url = "https://www.googleapis.com/qpxExpress/v1/trips/search?key=YOUR_KEY_HERE";
        var data = {
            farePrefrence: $scope.farePrefrence,
            fromAirport: $scope.fromAirport,
            fromDate: $scope.fromDate,
            passengers: $scope.passengers,
            toAirport: $scope.toAirport,
            toDate: $scope.toDate,
            travelType: $scope.travelType
        }

        var requestData = _buildRequestData(data);
        var config = {headers: {'content-type': 'application/json'}};

        $http.post(url, requestData, config)
        .success(function (data, status, headers, config) {
            $scope.tripResult = data;

        })
        .error(function (data, status, headers, config) {
            $scope.errorDetail = data + status + header + config;
        });
    };

});


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

    if(request.travelType =='Round-trip') {
        var returnSlice = {
            origin: request.toAirport,
            destination: request.fromAirport,
            date: request.toDate,
            preferredCabin: preferredCabin
        };
        slices.push(returnSlice);
    }
    
    var requestData = {
      request: {
        slice: slices,
        passengers: {
          adultCount: request.passengers
        },
        solutions: 2,
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

