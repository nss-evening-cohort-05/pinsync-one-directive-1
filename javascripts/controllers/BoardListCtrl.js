app.controller("BoardListCtrl", function($scope, BoardFactory) {

	$scope.boards = [];

	let getBoards = () => {
		BoardFactory.getBoardList().then((boardz) => {
			console.log ("cntrl" , boardz);
			$scope.boards = boardz;
		}).catch((error) => {
			console.log("getBoard error" , error)
		});
	};

	getBoards();

	$scope.deleteBoard = (id) => {
		BoardFactory.deletz(id).then(() => {
			getMyBoards();
		}).catch((error) => {
			console.log("deleteItem error", error);
		});
	};

});