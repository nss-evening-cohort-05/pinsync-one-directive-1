app.controller("PinEditCtrl", function($routeParams, $scope, $location, $rootScope, PinFactory, UserFactory ) {

	PinFactory.getSinglePin($routeParams.id).then((results) => {
		$scope.newPin = results.data;
		}).catch((error) => {
		console.log("getSinglePin", error);
	});

	$scope.addNewPin = () => {
		console.log("PinNewCtrl" , $routeParams);
		PinFactory.editPin($scope.newPin).then(() => {
			$location.url(`boards/${$rootScope.user.uid}/pins/${$routeParams.boardId}`);
		}).catch((error) => {
			console.log("Add error", error);
		});
	};

});