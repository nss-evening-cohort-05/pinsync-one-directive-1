app.controller("PinViewCtrl", function($scope, $routeParams , PinFactory ) {
   $scope.pins = [];

   PinFactory.getPinList($routeParams.id).then((results) => {
		$scope.pins = results;
		console.log("results", results);
	}).catch((error) => {
		console.log("getPinList", error);
	});

	$scope.pinChange = (pin) => {
		PinFactory.getSinglePin(pin).then((results) => {
			$scope.newPin = results.data;
			console.log("results.data", $scope.newPin);
		}).catch((error) => {
			console.log("getPinItem", error);
		});
	};
});