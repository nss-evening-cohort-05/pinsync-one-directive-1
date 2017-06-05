app.controller("NavBarCtrl", function($scope, $rootScope){

	$scope.searchInput = "";

	$scope.broadcastNavSearch = function() {
    $rootScope.$broadcast('NavSearch', $scope.searchInput);
  };

});