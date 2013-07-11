app.controller('RecipesAllController', function ($scope, $route, recipeService, Notifications) {

    init();
    function init(){
	// get from service
	recipeService.getAllRecipes().then(function(data){
	    $scope.recipes = data;
	}, function(error){
	    Notifications.error('Error getting recipe data');
	});
    }
    
    $scope.deleteRecipe = function (index) {
	
	var id = $scope.recipes[index].id;
	
	if(confirm('Are you sure you want to delete this recipe?')) {
	    recipeService.deleteRecipe(id).then(function(data){
		Notifications.success('Recipe deleted successfully');
		$scope.recipes.splice(index, 1);
	    }, function(error){
		Notifications.error('Error deleting recipe');
	    });	    	    
	}
    };
    
});
