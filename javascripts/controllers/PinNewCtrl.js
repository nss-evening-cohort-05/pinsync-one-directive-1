app.controller("PinNewCtrl", function($rootScope, $routeParams, $http, $location, $q, $scope, FIREBASE_CONFIG, PinFactory) {
//*********************************
//* Add new pin
//*********************************
	$scope.addNewPin = () => {
		$scope.newPin.boardId = $routeParams.boardId;
		$scope.newPin.uid = $routeParams.uid;
		PinFactory.postNewPin($scope.newPin).then(() => {
			$scope.newPin = {};
			$location.url(`/boards/${$rootScope.user.uid}/pins/${$routeParams.boardId}`);
		}).catch((error) => {
			console.log("Add error", error);
		});
	};
});

