app.controller("PinViewCtrl", function($scope, $routeParams , PinFactory ) {
   $scope.pins = [];

   PinFactory.getPinList($routeParams.id).then((results) => {
		$scope.pins = results;
		console.log("results", results);
	}).catch((error) => {
		console.log("getPinList", error);
	});

});