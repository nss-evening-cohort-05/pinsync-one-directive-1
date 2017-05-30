app.controller("PinViewCtrl", function($scope, $routeParams , PinFactory ) {
   $scope.pins = [];

   let getPins = () => {
   PinFactory.getPinList($routeParams.id).then((results) => {
		$scope.pins = results.data;
		console.log("results", results);
	}).catch((error) => {
		console.log("getPinList", error);
	})
};
	getPins();
});