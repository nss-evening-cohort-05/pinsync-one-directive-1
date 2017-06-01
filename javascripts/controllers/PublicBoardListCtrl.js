app.controller("PublicBoardListCtrl", function($scope, $routeParams , BoardFactory ) {
   $scope.pins = [];

   PinFactory.getPinList($routeParams.id).then((results) => {
		$scope.pins = results;
		console.log("results", results);
	}).catch((error) => {
		console.log("getPinList", error);
	});

});