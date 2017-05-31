app.controller("UserListCtrl", function($routeParams, $scope, UserFactory) {

	$scope.allUsers = [];

	let getListOfUsers = () => {
		console.log("inside getListOfUsers");
	 	UserFactory.getAllUsers().then((results) => {
			console.log("what's returning from getAllUsers: ", results);
	 		$scope.allUsers = results;
	 	}).catch((error) => {
	 		console.log(error);
	 	});
	};

	getListOfUsers();

});