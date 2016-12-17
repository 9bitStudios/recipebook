app.service('ingredientService', function ($http, configuration) {

	this.getIngredients = function (id) {

		// gets ingredients under a recipeId
		var promise = $http.get(configuration.apiURL + '/ingredients/'+id).then(function (response) {
			return response.data;
		}, function(error){

		});
		return promise;	
	};

	this.addIngredient = function (id, name) {
		var ingredientToAdd = {recipeId: id, name: name};
		var promise = $http.post(configuration.apiURL + '/ingredients', ingredientToAdd).then(function (response) {
			return response.data;
		}, function(error){

		});
		return promise;	
	};

	this.updateIngredient = function (id, name) {

		var ingredientToUpdate = {id: id, name: name};
		var promise = $http.put(configuration.apiURL + '/ingredients/' + id, ingredientToUpdate).then(function (response) {
			return response.data;
		}, function(error){

		});
		return promise;	
	};

	this.deleteIngredient = function (id) {

		var promise = $http.delete(configuration.apiURL + '/ingredients/' + id).then(function (response) {
			return response.data;
		}, function(error){

		});
		return promise;	
	};    

});