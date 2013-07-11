app.controller('IngredientDetailsController', function ($scope, ingredientService, applicationSync, Notifications) {

    init();
    function init(){
	$scope.ingredients = [];
    }       
    
    $scope.$on('recipeloaded', function() {
	
	var id = applicationSync.message;
	$scope.ingredients = ingredientService.getIngredients(id).then(function(data){ 
	    $scope.ingredients = data;
	}, function(error){
	    
	    Notifications.error('Error fetching ingredients data');
	    
	});
	
    });      
          
    
});

