app.controller("BoardListCtrl", function($scope, ItemFactory) {

	$scope.items = [];

	let getItems = () => {
		ItemFactory.getItemList().then((itemz) => {
			console.log ("cntrl" , itemz);
			// $scope.items = itemz;
		}).catch((error) => {
			console.log("getItem error" , error)
		});
	};


	getItems();

});