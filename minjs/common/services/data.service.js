!function(){function e(e,t){var n=function(){return e.get("/api/profile",{headers:{Authorization:"Bearer "+t.getToken()}})};return{getProfile:n}}angular.module("meanApp").service("meanData",e),e.$inject=["$http","authentication"]}();