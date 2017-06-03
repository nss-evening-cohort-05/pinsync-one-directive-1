app.controller("PinNewCtrl", function($rootScope, $routeParams, $http, $location, $q, $scope, FIREBASE_CONFIG, PinFactory) {
//*********************************
//* Add new pin
//*********************************
	$scope.addNewPin = () => {
		console.log("PinNewCtrl" , $routeParams);
		$scope.newPin.boardId = $routeParams.boardId;
		$scope.newPin.uid = $rootScope.user.uid;
		PinFactory.postNewPin($scope.newPin).then(() => {
			$scope.newPin = {};
			$location.url(`boards/${$rootScope.user.uid}/pins/${$routeParams.boardId}`);
		}).catch((error) => {
			console.log("Add error", error);
		});
	};
});