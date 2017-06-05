app.controller("UserListCtrl", function($routeParams, $scope, UserFactory) {

	$scope.allUsers = [];

	let getListOfUsers = () => {
	 	UserFactory.getAllUsers().then((results) => {
	 		$scope.allUsers = results;
	 	}).catch((error) => {
	 		console.log("error getting list of other users", error);
	 	});
	};

	getListOfUsers();

	//For the Search Bar
  $scope.searchText = "";
  $scope.$on('NavSearch', function(event, data) {
      $scope.searchText = data;
  });

});