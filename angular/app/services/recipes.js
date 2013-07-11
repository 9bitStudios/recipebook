
app.service('recipeService', function ($http, configuration) {
    
    return {
    
	getAllRecipes: function () {
	    var promise = $http.get(configuration.apiURL + '/recipes').then(function (response) {
		return response.data;
	    }, function(error){

	    });

	    return promise;	
	},
	
	getRecipe: function (id) {

	    var promise = $http.get(configuration.apiURL + '/recipes/' + id).then(function (response) {
		return response.data;
	    }, function(error){

	    });
	    return promise;	
	},

	addRecipe: function (name) {

	    var recipeToAdd = {name: name};
	    var promise = $http.post(configuration.apiURL + '/recipes', recipeToAdd).then(function (response) {

		return response.data;

	    }, function(error){

	    });
	    return promise;		

	},

	updateRecipe: function (id, name) {

	    var recipeToUpdate = { id: id, name: name };
	    var promise = $http.put(configuration.apiURL + '/recipes/' + id, recipeToUpdate).then(function (response) {
		return response.data;
	    }, function(error){

	    });
	    return promise;	

	},

	deleteRecipe: function (id) {

	    var promise = $http.delete(configuration.apiURL + '/recipes/' + id).then(function (response) {
		return response.data;
	    }, function(error){

	    });
	    return promise;		

	}    
    };

});