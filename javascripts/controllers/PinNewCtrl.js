app.controller("PinNewCtrl", function($rootScope, $routeParams, $http, $location, $q, $scope, FIREBASE_CONFIG, PinFactory) {

	$scope.newPin = {
		imageUrl: "",
		url: ""
	};
	$scope.pageTitle = "New Pin";

	$scope.addNewPin = () => {
		console.log("PinNewCtrl" , $routeParams);
		$scope.newPin.boardId = $routeParams.boardId;
		$scope.newPin.uid = $rootScope.user.uid;
		console.log("newPin before going to factory", $scope.newPin);
		PinFactory.postNewPin($scope.newPin).then(() => {
			$location.url(`boards/${$rootScope.user.uid}/pins/${$routeParams.boardId}`);
		}).catch((error) => {
			console.log("Add error", error);
		});
	};
});