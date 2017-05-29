// app.run(function(FIREBASE_CONFIG) {
//   firebase.initializeApp(FIREBASE_CONFIG);
// });

app.config(function($routeProvider) {
	$routeProvider
	.when("/my-boards", {
		templateUrl: "partials/board-list.html",
		controller: "BoardListCtrl"
	})
	.otherwise("/my-boards");
});