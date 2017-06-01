app.controller("BoardListCtrl", function($rootScope, $routeParams, $scope, BoardFactory) {

	$scope.boards = [];

	// load boards for whatever uid was called
	// if uid matches $rootScope.user.uid then user will have full edit permissions
	// if uid does not match $rootScope.user.uid then user will only be able to view and add pins from displayed boards

	// $rootScope.user.uid was initially being passed into FBgetSingleUserBoards

	let getBoards = () => {
		BoardFactory.FBgetSingleUserBoards($routeParams.uid).then((boardz) => {
			console.log ("Boards from getBoards: " , boardz);
			$scope.boards = boardz;
		}).catch((error) => {
			console.log("getBoard error" , error);
		});
	};

	getBoards();

	let createNewBoard = () => {
		BoardFactory.FBpostNewBoard()
		.then(() => getMyBoards())
		.catch(error => console.log("error in createNewBoard", error));
	};

	$scope.deleteBoard = (id) => {
		console.log("deleteBoard running.  id passed is", id);
		BoardFactory.FBdeleteBoard(id).then(() => {
				getBoards();
		}).catch((error) => {
			console.log("deleteItem error", error);
		});
	};

});