app.controller("PinEditCtrl", function() {

	$scope.newTask = {};

  ItemFactory.getSingleItem($routeParams.id).then((results) => {
    $scope.newTask = results.data;
  	console.log("get single item results", results);
    results.data.dueDate = new Date(results.data.dueDate);
  }).catch((error) => {
  	console.log("getSingleItem", error);
  });
  
});