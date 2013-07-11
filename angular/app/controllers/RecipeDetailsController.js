app.controller('RecipeDetailsController', function ($scope, $routeParams, recipeService, applicationSync, Notifications) {

    init();
    function init(){
	
	recipeService.getRecipe($routeParams.id).then(function(data){
	    $scope.recipe = data;
	    applicationSync.prepForBroadcast('recipeloaded',data.id);
	    
	}, function(error){
	    Notifications.error('Error getting recipe data');
	});
    }
    
});


