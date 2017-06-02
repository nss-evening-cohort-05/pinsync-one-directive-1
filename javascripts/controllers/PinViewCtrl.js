app.controller("PinViewCtrl", function($rootScope, $scope, $routeParams, BoardFactory, PinFactory, UserFactory) {

	$scope.ownerUsername = "";
	$scope.pins = [];
  $scope.board = [];

	BoardFactory.FBgetSingleBoard($routeParams.id)
	.then(board => {
		$scope.board = board;
		return UserFactory.getUser($scope.board.uid);
	}, error => console.log("error in FBgetSingleBoard in PinViewCtrl"))
	.then(user => $scope.ownerUsername = user.username)
	.catch(error => console.log("Error in getUser in PinViewCtrl", error));
	$scope.isOwner = $scope.board.uid === $rootScope.user.uid ? true : false;
	
  PinFactory.getPinList($routeParams.id).then((results) => {
		$scope.pins = results;
	}).catch((error) => {
		console.log("getPinList", error);
	});

});