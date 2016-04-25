!function(){function e(e,r,t,o,n){console.log("searchCtrl is running"),e.SendData=function(){var a="localhost:3000/api/itineraries",s={farePrefrence:e.farePrefrence,fromAirport:e.fromAirport,fromDate:n("date")(e.fromDate,"yyyy-MM-dd"),passengers:e.passengers,toAirport:e.toAirport,toDate:n("date")(e.toDate,"yyyy-MM-dd"),travelType:e.travelType},i=_buildRequestData(s),c={headers:{"content-type":"application/json"}};r.post(a,i,c).success(function(r,n,a,s){o.path("/result"),t.set(r),t.setOri(e.fromAirport),t.setDest(e.fromAirport),t.setType(e.travelType)}).error(function(r,t,o,n){e.errorMessage="Something went wrong",e.errorCode=r,e.errorStatus=t})}}angular.module("meanApp").controller("searchCtrl",e),e.$inject=["$scope","$http","flightData","$location","$filter"]}(),_buildRequestData=function(e){function r(e,r){console.log("searchCtrl is running");var t=this;t.user={},r.getProfile().success(function(e){t.user=e}).error(function(e){console.log(e)})}var t=_getPreferredCabin(e.farePrefrence),o={origin:e.fromAirport,destination:e.toAirport,date:e.fromDate,preferredCabin:t},n=[];if(n.push(o),"Round-trip"==e.travelType){var a={origin:e.toAirport,destination:e.fromAirport,date:e.toDate,preferredCabin:t};n.push(a)}r.$inject=["$location","meanData"];var s={request:{slice:n,passengers:{adultCount:e.passengers},solutions:5,refundable:!1}};return s},_getPreferredCabin=function(e){var r="";switch(e){case"Economy":r="COACH";break;case"Business":r="BUSINESS";break;case"First":r="FIRST";break;default:r="COACH"}return r};