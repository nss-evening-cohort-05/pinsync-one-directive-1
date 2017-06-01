app.controller("PinNewCtrl", function($rootScope, $routeParams, $http, $location, $q, $scope, FIREBASE_CONFIG, PinFactory) {
//*********************************
//* Add new pin
//*********************************
	$scope.addNewPin = () => {
		console.log("PinNewCtrl" , $routeParams);
		$scope.newPin.boardId = $routeParams.id;
		$scope.newPin.uid = $rootScope.user.uid;
		$scope.newPin.imageUrl = " ";
		PinFactory.postNewPin($scope.newPin).then(() => {
			$scope.newPin = {};
			$location.url("/my-boards");
		}).catch((error) => {
			console.log("Add error", error);
		});
	};
});