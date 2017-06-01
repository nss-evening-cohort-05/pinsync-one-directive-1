app.config(function($routeProvider) {
    $routeProvider

        .otherwise("/my-boards");
});

let isAuth = (AuthFactory) => new Promise((resolve, reject) => {
    if (AuthFactory.isAuthenticated()) {
        resolve();
    } else {
        reject();
    }
});

app.run(function($location, $rootScope, FIREBASE_CONFIG, AuthFactory) {
    firebase.initializeApp(FIREBASE_CONFIG);
    $rootScope.$on('$routeChangeStart', function(event, currRoute, prevRoute) {
        var logged = AuthFactory.isAuthenticated();
        var appTo;
        if (currRoute.originalPath) {
            appTo = currRoute.originalPath.indexOf('/auth') !== -1;
        }
        if (!appTo && !logged) {
            event.preventDefault();
            $location.path('/auth');
        }
    });
});

app.config(function($routeProvider) {
    $routeProvider
        .when('/auth', {
            templateUrl: 'partials/auth.html',
            controller: 'AppAuthCtrl'
        })
        .when("/my-boards", {
            templateUrl: "partials/board-list.html",
            controller: "BoardListCtrl",
            resolve: { isAuth }
        })
        .when("/other-boards", {
            templateUrl: "partials/board-list.html",
            controller: "UserListCtrl",	// could be refactored into BoardListCtrl, geMyBoards() reused to get other boards too
            resolve: { isAuth }
        })
        .when("/pins/view/:id", {
            templateUrl: "partials/pin-view.html",
            controller: "PinViewCtrl",
            resolve: { isAuth }
        })
        .when('/pin/new/:id', {
            templateUrl: 'partials/pin-new.html',
            controller: 'PinNewCtrl',
            resolve : {isAuth}
        })
        .when('/user-list', {
            templateUrl: 'partials/user-list.html',
            controller: 'UserListCtrl',
            resolve: {isAuth}
        })
        .when('/logout', {
            templateUrl: 'partials/auth.html',
            controller: 'AppAuthCtrl',
            resolve: { isAuth }
        })
        .otherwise('/auth');
});
