(function () {
    
    angular
    .module('meanApp')
    .controller('searchCtrl', searchCtrl);
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

})();