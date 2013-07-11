app.controller('IngredientCreateController', function ($scope, ingredientService, applicationSync, Notifications) {

    init();
    function init(){
	$scope.ingredients = [];
    }
    
    $scope.addIngredientField = function(name) {
	 $scope.ingredients.push({name:name});
    };    
    
    $scope.removeIngredientField = function(index) {
	//var deleted = $scope.ingredients[index];
	$scope.ingredients.splice(index, 1);
    };        
    
    $scope.$on('recipecreated', function() {
	
	var id = applicationSync.message;
	var errors = false;
	for(var i in $scope.ingredients) {
	    
	    ingredientService.addIngredient(id, $scope.ingredients[i].name).then(function(data){
	    },
	    function(error){
		errors = true;
	    });	    
	    
	    // if there are errors throw up a notification that not everything may have been saved
	    if (errors) {
		 Notifications.error('Error creating one or more ingredients');
	    }
	}
	
    });      
          
    
});

