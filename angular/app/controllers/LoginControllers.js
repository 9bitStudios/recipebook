app.controller('LoginController', function ($scope, $rootScope, $location, userService, Notifications) {

	init();
	function init(){

	}

	$scope.login = function(){

		var username = $scope.login.username;
		var password = $scope.login.password;

		if(username && password) {
			userService.login(username, password).then(function(data){
				$rootScope.auth.id = data.id;
				$rootScope.auth.username = data.username;
				$rootScope.auth.isLoggedIn = true;
				$rootScope.$broadcast('loginchange');	
				$location.path('/recipes');
			}, function(error) {
				Notifications.error('Error logging in');
			});
		}
		else {
			Notifications.error('Please enter a username and password');
		}
	};

});

app.controller('LogoutController', function ($rootScope, $location, configuration, RandomString) {

	init();
	function init(){
		jQuery.ajax({
			type: "POST",
			url: configuration.apiURL + "/logout",
			contentType: "application/json; charset=utf-8",
			async: false,
			dataType: "json",
			username: RandomString.generateString(8),
			password: RandomString.generateString(8),
			error: function (errorMessage) {
				$rootScope.auth.id = null;
				$rootScope.auth.username = null;
				$rootScope.auth.isLoggedIn = false;
				$rootScope.$broadcast('loginchange');	
				$location.path('/');
			}
		});
	}

});

app.controller('UserController', function ($rootScope, $scope) {

	init();
	function init(){
		if($rootScope.auth.isLoggedIn){
			$scope.user = $rootScope.auth.username;
			$scope.isLoggedIn = true;
		}
		else {
			$scope.isLoggedIn = false;
		}

		$rootScope.$on('loginchange', function () {
			if($rootScope.auth.isLoggedIn){
				$scope.user = $rootScope.auth.username;
				$scope.isLoggedIn = true;
			}
			else {
				$scope.isLoggedIn = false;
			}

		});
	}
});

app.controller('SignUpController', function ($rootScope, $scope, $location, userService, Notifications) {

	init();
	function init(){

	}

	$scope.signUp = function(){

		var username = $scope.signup.username;
		var password = $scope.signup.password;

		if(username && password) {
			userService.signUp(username, password).then(function(data){	
				Notifications.success('New user created successfully');
				$location.path('/');
			}, function(error) {
				Notifications.error('Error signing up');
			});
		}
		else {
			Notifications.error('Please enter a username and password');
		}
	};	

});