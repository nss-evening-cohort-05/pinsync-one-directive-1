app.controller("PinEditCtrl", function($routeParams, $scope, $location, $rootScope, PinFactory, UserFactory ) {

	// $scope.newPin = {};
	// $scope.boards = [];

	// $scope.isOwner = $routeParams.uid === $rootScope.user.uid ? true : false;
	// $scope.ownerUsername = "";
	// UserFactory.getUser($routeParams.uid)
	// .then(user => $scope.ownerUsername = user.username)
	// .catch(error => console.log("Error in getUser in BoardListCtrl", error));


	PinFactory.getSinglePin($routeParams.id).then((results) => {
		$scope.newPin = results.data;
		}).catch((error) => {
		console.log("getSinglePin", error);
	});

	$scope.addNewPin = () => {
		console.log("PinNewCtrl" , $routeParams);
		PinFactory.editPin($scope.newPin).then(() => {
			$scope.newPin = {};
			$location.url(`boards/${$rootScope.user.uid}/pins/${$routeParams.boardId}`);
		}).catch((error) => {
			console.log("Add error", error);
		});
	};

});