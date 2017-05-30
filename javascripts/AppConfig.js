// app.run(function(FIREBASE_CONFIG) {
//   firebase.initializeApp(FIREBASE_CONFIG);
// });

app.config(function($routeProvider) {
	$routeProvider
	.when("/my-boards", {
		templateUrl: "partials/board-list.html",
		controller: "BoardListCtrl"
	})
	.when("/pins/view/:id", {
		templateUrl: "partials/pin-view.html",
		controller: "PinViewCtrl"
	})
	.otherwise("/my-boards");
});