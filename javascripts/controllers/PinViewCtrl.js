app.controller("PinViewCtrl", function($rootScope, $scope, $routeParams, BoardFactory, PinFactory, UserFactory) {


    $scope.ownerUsername = "";
    $scope.pins = [];
    $scope.board = {};
    $scope.ownerBoards = [];

    BoardFactory.FBgetSingleBoard($routeParams.boardId, $routeParams.uid)
        .then(board => {
            $scope.board = board;
            return UserFactory.getUser($scope.board.uid);
        }, error => console.log("error in FBgetSingleBoard in PinViewCtrl"))
        .then(user => $scope.ownerUsername = user.username)
        .catch(error => console.log("Error in getUser in PinViewCtrl", error));

    $scope.isOwner = $routeParams.uid === $rootScope.user.uid ? true : false;

    let getPins = () => {

        PinFactory.getPinList($routeParams.boardId).then((results) => {
            $scope.pins = results;
        }).catch((error) => {
            console.log("getPinList", error);
        });

    };

    getPins();

    $scope.savePinToMyBoard = (pin, boardId) => {

    	pin.boardId = boardId; 
    	delete pin.id;

    	PinFactory.postNewPin(pin).then((response)=>{
    			console.log(response);

    	}).catch((error)=>{
    		console.log("save pin error", error);
    	});

    	console.log("savePinToMyBoard");

    	// grab the pin object and the boardId

    };

    
    let getBoards = () => {
        BoardFactory.FBgetSingleUserBoards($rootScope.user.uid).then(boards => {
            $scope.ownerBoards = boards;
        }).catch((error) => {
            console.log("getBoard error", error);
        });
    };

    getBoards();

    //For the Popover
    $scope.savePinPopover = {
        templateUrl: 'savePinPopover.html',
        boardTitle: ''
    };


    $scope.deletePin = (id) => {
        PinFactory.FBdeletePin(id).then(() => {
            getPins();
        }).catch((error) => {
            console.log("deleteItem error", error);
        });
    };

});
