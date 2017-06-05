app.controller("BoardListCtrl", function($location, $rootScope, $routeParams, $scope, BoardFactory, UserFactory) {

	$scope.isOwner = $routeParams.uid === $rootScope.user.uid ? true : false;
	$scope.ownerUsername = "";
	UserFactory.getUser($routeParams.uid)
	.then(user => $scope.ownerUsername = user.username)
	.catch(error => console.log("Error in getUser in BoardListCtrl", error));

	$scope.boards = [];

	let getBoards = () => {
		BoardFactory.FBgetSingleUserBoards($routeParams.uid).then(boards => {
			$scope.boards = boards;
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
		BoardFactory.FBdeleteBoard(id).then(() => {
				getBoards();
		}).catch((error) => {
			console.log("deleteItem error", error);
		});
	};


  $scope.addBoard = () => {
  	let newBoard = {
  		title: $scope.createNewBoardPopover.userTitle,
  		uid: $rootScope.user.uid
  	};
  	BoardFactory.FBpostNewBoard(newBoard)
  	.then(response => $location.url(`boards/${$rootScope.user.uid}/pins/${response.data.name}`))
  	.catch(error => console.log("error in FBpostNewBoard in addBoard in BoardListCtrl", error));
  };

	$scope.changeBoard = (boardID, boardTitle) => {
		let tempBoard = {
			boardId: boardID,
			uid: $rootScope.user.uid,
			title: boardTitle
		};
		BoardFactory.FBeditBoard(tempBoard).then(() => {
			getBoards();
		}).catch((error) => {
			console.log("changeBoard error", error);
		});
	};

	//For the Popover
	$scope.createNewBoardPopover = {
    templateUrl: 'newBoardPopover.html',
    userTitle: ''
  };

	//For the Search Bar
	$scope.searchText = "";
	$scope.$on('NavSearch', function(event, data) {
		$scope.searchText = data;
	});

});