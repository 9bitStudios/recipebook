
app.config(function ($routeProvider) {
	$routeProvider
	.when('/',
	{
		controller: 'HomeController',
		templateUrl: 'app/views/home.html',
		access: {
			restricted: false
		}
	}) 
	.when('/login',
	{
		controller: 'LoginController',
		templateUrl: 'app/views/login.html',
		access: {
			restricted: false
		}
	}) 
	.when('/logout',
	{
		controller: 'LogoutController',
		templateUrl: 'app/views/login.html',
		access: {
			restricted: false
		}
	}) 	
	.when('/signup',
	{
		controller: 'SignUpController',
		templateUrl: 'app/views/signup.html',
		access: {
			restricted: false
		}	    
	})	
	.when('/recipes',
	{
		controller: 'RecipesAllController',
		templateUrl: 'app/views/recipes-all.html',
		access: {
			restricted: true
		}
	})
	.when('/recipe/:id',
	{
		controller: 'RecipeDetailsController',
		templateUrl: 'app/views/recipe-details.html',
		access: {
			restricted: true
		}
	})
	.when('/new',
	{
		controller: 'RecipeCreateController',
		templateUrl: 'app/views/recipe-create.html',
		access: {
			restricted: true
		}	    
	})	
	.when('/edit/:id',
	{
		controller: 'RecipeEditController',
		templateUrl: 'app/views/recipe-edit.html',
		access: {
			restricted: true
		}	    
	})	
	.otherwise(
	{
		redirectTo: '/' 
	});

}).run( function($rootScope, $location, userService) {

	// listener to watch all route changes
	$rootScope.$on("$routeChangeStart", function(event, next, current) {        

		// is this a restricted route? if not let them through to the route, otherwise check login status
		if(next.access.restricted === false){
			return;
		}
		else {   
			// check login
			if(!$rootScope.auth.isLoggedIn){
				$location.path('/login');
			}
		}

	});
});