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
			$scope.alerts.push({msg: error.message});
			console.log(error);
		}).then((user) => {
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

	$scope.loginUser = () => {
		logMeIn();
	};

});