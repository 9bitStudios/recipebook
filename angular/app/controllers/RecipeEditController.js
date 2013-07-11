app.controller('RecipeEditController', function ($scope, $routeParams, $location, recipeService, applicationSync, Notifications) {

    init();
    function init(){
	$scope.recipe = recipeService.getRecipe($routeParams.id).then(function(data){
	
	    var id = data.id;
	    $scope.recipe = data;
	    applicationSync.prepForBroadcast('recipeloaded',id);
	    
	},function(error){
	    Notifications.error('Error getting recipe data');
	});
    }
    
    $scope.updateRecipe = function() {
	
	var id = $scope.recipe.id;
	var name = $scope.recipe.name;
	$scope.recipe = recipeService.updateRecipe(id, name).then(function(data){
	    
	    Notifications.success('Recipe updated successfully');
	    $location.path('/recipes');
	    applicationSync.prepForBroadcast('recipeupdated', id);
	    
	}, function(error){
	    Notifications.error('Error updating recipe');
	});
    };
    
});

