app.controller("PinViewCtrl", function($rootScope, $scope, $routeParams, BoardFactory, PinFactory, UserFactory) {

	$scope.ownerUsername = "";
	$scope.pins = [];
  $scope.board = {};

	BoardFactory.FBgetSingleBoard($routeParams.boardId, $routeParams.uid)
	.then(board => {
		$scope.board = board;
		return UserFactory.getUser($scope.board.uid);
	}, error => console.log("error in FBgetSingleBoard in PinViewCtrl"))
	.then(user => $scope.ownerUsername = user.username)
	.catch(error => console.log("Error in getUser in PinViewCtrl", error));

	$scope.isOwner = $routeParams.uid === $rootScope.user.uid ? true : false;
	
  PinFactory.getPinList($routeParams.boardId).then((results) => {
		$scope.pins = results;
	}).catch((error) => {
		console.log("getPinList", error);
	});

});