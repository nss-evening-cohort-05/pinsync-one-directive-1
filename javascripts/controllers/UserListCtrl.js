app.controller("UserListCtrl", function($routeParams, $scope, BoardFactory, UserFactory) {

	$scope.allUsers = [];
	$scope.boards = [];

	let getListOfUsers = () => {
	 	UserFactory.getAllUsers().then((results) => {
	 		$scope.allUsers = results;
	 	}).catch((error) => {
	 		console.log("error getting list of other users", error);
	 	});
	};

	getListOfUsers();

	$scope.getOtherUserBoards = (uid) => {
		BoardFactory.FBgetSingleUserBoards(uid).then((otherUserBoards) => {
			console.log("other user's boards: ", otherUserBoards);
			$scope.boards = otherUserBoards;
		}).catch((error) => {
			console.log("error getting another user's boards", error);
		});
	};

});