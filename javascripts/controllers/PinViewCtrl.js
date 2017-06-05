app.controller("PinViewCtrl", function($rootScope, $scope, $routeParams, ngToast, BoardFactory, PinFactory, UserFactory) {

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

    $scope.savePinToMyBoard = (pin, myBoardId) => {
        pin.boardId = myBoardId;
        delete pin.id;
        PinFactory.postNewPin(pin).then((response) => {
            getPins();
            ngToast.create('Pin Saved!');
        }).catch((error) => {
            ngToast.create('Sorry, there was an error saving your pin!');
            console.log("savePinToMyBoard error", error);
        });
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
    $scope.popoverIsOpen = false;

    //For the Search Bar
    $scope.searchText = "";
    $scope.$on('NavSearch', function(event, data) {
        $scope.searchText = data;
    });

    $scope.deletePin = (id) => {
        PinFactory.FBdeletePin(id).then(() => {
            getPins();
        }).catch((error) => {
            console.log("deletePin error", error);
        });
    };

});

