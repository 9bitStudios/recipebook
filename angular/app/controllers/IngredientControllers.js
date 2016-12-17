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
			ingredientService.addIngredient(id, $scope.ingredients[i].name).then(function(data){ },
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

app.controller('IngredientEditController', function ($scope, ingredientService, applicationSync, Notifications) {

	init();
	function init(){
		$scope.ingredients = [];
		$scope.ingredientsRemoved = [];
	}

	$scope.addIngredientField = function(name) {
		$scope.ingredients.push({name:name});
	};    

	$scope.removeIngredientField = function(index) {
		var deleted = $scope.ingredients[index];
		$scope.ingredients.splice(index, 1);
		$scope.ingredientsRemoved.push(deleted);
	};        

	$scope.$on('recipeloaded', function() {

		var id = applicationSync.message;

		$scope.ingredients = ingredientService.getIngredients(id).then(function(data){ 
			// we can get a response but there have no content
			if(typeof data !== 'undefined') {
				$scope.ingredients = data;
			}
			else {
				$scope.ingredients = [];
			}

		}, function(error){
			// trigger error message
			Notifications.error('Error fetching ingredients data');
		});
	});

	// listen for recipe updated event that occurs in parent controller...
	$scope.$on('recipeupdated', function() {

		var recipeId = applicationSync.message;

		// add/update changed new and changed ingredients
		for(var i in $scope.ingredients) {

			if(!$scope.ingredients[i].hasOwnProperty('id')){
				$scope.addIngredient(recipeId, $scope.ingredients[i].name);
			}
			else {
				$scope.updateIngredient($scope.ingredients[i].id, $scope.ingredients[i].name);
			}
		}

		// delete removed ingredientes
		for(var i in $scope.ingredientsRemoved) {

			// if we have an id, send a DELETE request to the server
			if(typeof $scope.ingredientsRemoved[i].id !== 'undefined') {

				var id =  $scope.ingredientsRemoved[i].id;
				$scope.deleteIngredient(id);
			}
		}
	});

	// ADD Ingredient
	$scope.addIngredient = function(recipeId, name){
		var errors = false;
		ingredientService.addIngredient(recipeId, name).then(function(data){ },
		function(error){
			errors = true;
		});	    
		// if there are errors throw up a notification that not everything may have been saved
		if (errors) {
			Notifications.error('Error updating one or more ingredients');
		}
	};

	// UPDATE Ingredient
	$scope.updateIngredient = function(id, name){

		var errors = false;
		
		ingredientService.updateIngredient(id, name).then(function(data){ },
		function(error){
			errors = true;
		});	 

		// if there are errors throw up a notification that not everything may have been saved
		if (errors) {
			Notifications.error('Error updating one or more ingredients');
		}
	};    

	// DELETE Ingredient
	$scope.deleteIngredient = function(id){

		var errors = false;
		ingredientService.deleteIngredient(id).then(function(data){ },
		function(error){
			errors = true;
		});	    

		// if there are errors throw up a notification that not everything may have been saved
		if (errors) {
			Notifications.error('Error updating one or more ingredients');
		}

	};    

});