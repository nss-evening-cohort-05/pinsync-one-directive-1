app.controller("AppAuthCtrl", function($location, $rootScope, $scope, AuthFactory, UserFactory) {
	$scope.alerts = [];

	$scope.auth = {
		email: "a@a.com",
		password: "123456",
	};

	if ($location.path() === '/logout') {
		AuthFactory.logout();
		$rootScope.user = {};
		$location.url('/auth');
	}

	let logMeIn = () => {
		AuthFactory.authenticate($scope.auth).then((userCreds) => {
			return UserFactory.getUser(userCreds.uid);
		}, (error) => {
			$scope.alerts[0] = {msg: "Oops! Looks like that username or password isn't recognized."};
		}).then((user) => {
			$rootScope.user = user;
			$location.url(`/boards/${$rootScope.user.uid}`);
		}).catch((error) => {
			console.log(error);
		});
	};

// if using Google to login 
	$scope.logMeInWithGoogle = () => {
		AuthFactory.authenticateGoogle($scope.auth)
			.then((user) => {
				$rootScope.user = user;
				$location.url(`/boards/${$rootScope.user.uid}`);
			}).catch((error) => {
				console.log(error);
			});
	};

	$scope.registerUser = () => {
		AuthFactory.registerWithEmail($scope.auth).then((didRegister) => {
			$scope.auth.uid = didRegister.uid;
			return UserFactory.addUser($scope.auth);
		}, (error) => {
			console.log(error);
		}).then((registerComplete) => {
			logMeIn();
		}).catch(() => {
			console.log(error);
		});
	};

	$scope.registerUserGoogle = () => {
		AuthFactory.registerWithEmail($scope.auth).then((didRegister) => {
			console.log("didRegister: ", didRegister);
			$scope.auth.uid = didRegister.uid;
			return UserFactory.addUserGoogle($scope.auth);
		}, (error) => {
			console.log(error);
		}).then((registerComplete) => {
			logMeIn();
		}).catch((error) => {
		});
	};

	$scope.loginUser = () => {
		logMeIn();
	};

});