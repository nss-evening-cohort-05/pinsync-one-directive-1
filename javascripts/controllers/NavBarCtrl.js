app.controller("NavBarCtrl", function($scope, $rootScope){

	$scope.searchInput = "";

	$scope.broadcastNavSearch = function() {
		console.log("Inside broadcastNavSearch");
    $rootScope.$broadcast('NavSearch', $scope.searchInput);
  };

});