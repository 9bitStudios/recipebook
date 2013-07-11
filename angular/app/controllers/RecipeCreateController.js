app.controller('RecipeCreateController', function ($scope, $location, recipeService, applicationSync, Notifications) {

    init();
    function init(){
    }
    
    $scope.createRecipe = function() {
	
	var recipeName = $scope.recipe.name;
	$scope.recipe = recipeService.addRecipe(recipeName).then(function(data){
	    var id = data.id;
	    Notifications.success('Recipe created');
	    $location.path('/recipes');
	    applicationSync.prepForBroadcast('recipecreated',id);
	    
	}, function(error){
	    Notifications.error('Error creating recipe');
	});
    };
});

