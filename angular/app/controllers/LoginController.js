app.controller('LoginController', function ($scope, $rootScope, $location, userService, Notifications) {

    init();
    function init(){
	
    }
    
    $scope.login = function(){
	
	var username = $scope.login.username;
	var password = $scope.login.password;
	
	if(username && password) {
	    userService.login(username, password).then(
		function(data){
		    $rootScope.auth.username = data.username;
		    $rootScope.auth.isLoggedIn = true;
		    $rootScope.$broadcast('loginchange');	
		    $location.path('/recipes');
		},
		function(error) {
		    Notifications.error('Error logging in');
		}
	    );
	}
	else {
	    Notifications.error('Please enter a username and password');
	}
	    
	
    };
    
});
