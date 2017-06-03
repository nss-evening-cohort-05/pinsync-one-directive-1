app.controller("PinViewCtrl", function($scope, $routeParams , PinFactory ) {
   $scope.pins = [];
   $scope.boardId = "";

   PinFactory.getPinList($routeParams.id).then((results) => {
   		$scope.boardId = $routeParams.id;
		$scope.pins = results;
		console.log("results", results , $routeParams.id);
	}).catch((error) => {
		console.log("getPinList", error);
	});

});