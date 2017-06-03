app.controller("PinNewCtrl", function($rootScope, $routeParams, $http, $location, $q, $scope, FIREBASE_CONFIG, PinFactory) {
//*********************************
//* Add new pin
//*********************************
	$scope.addNewPin = () => {
		$scope.newPin.boardId = $routeParams.id;
		$scope.newPin.uid = $rootScope.user.uid;
		PinFactory.postNewPin($scope.newPin).then(() => {
			$scope.newPin = {};
			$location.url(`/pins/view/${$routeParams.id}`);
		}).catch((error) => {
			console.log("Add error", error);
		});
	};
});