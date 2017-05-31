app.controller("BoardListCtrl", function($routeParams, $scope, BoardFactory) {

	$scope.boards = [];

	let getMyBoards = () => {
		BoardFactory.FBgetSingleUserBoards().then((boardz) => {
			console.log ("cntrl" , boardz);
			$scope.boards = boardz;
		}).catch((error) => {
			console.log("getBoard error" , error);
		});
	};

	getMyBoards();

	let createNewBoard = () => {
		BoardFactory.FBpostNewBoard()
		.then(() => getMyBoards())
		.catch(error => console.log("error in createNewBoard", error));
	};

	$scope.deleteBoard = (id) => {
		BoardFactory.deleteBoard(id).then(() => {
			getMyBoards();
		}).catch((error) => {
			console.log("deleteItem error", error);
		});
	};

});