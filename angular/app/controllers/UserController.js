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
