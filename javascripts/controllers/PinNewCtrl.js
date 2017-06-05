app.controller("PinNewCtrl", function($rootScope, $routeParams, $http, $location, $q, $scope, FIREBASE_CONFIG, PinFactory) {

$scope.newPin = {
	imageUrl: "",
	url: ""
};

	$scope.addNewPin = () => {
		$scope.newPin.boardId = $routeParams.boardId;
		$scope.newPin.uid = $rootScope.user.uid;
		PinFactory.postNewPin($scope.newPin).then(() => {
			$location.url(`boards/${$rootScope.user.uid}/pins/${$routeParams.boardId}`);
		}).catch((error) => {
			console.log("Add error", error);
		});
	};
});