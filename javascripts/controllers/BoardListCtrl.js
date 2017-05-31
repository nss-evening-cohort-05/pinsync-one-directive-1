app.controller("BoardListCtrl", function($scope, BoardFactory) {

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

});