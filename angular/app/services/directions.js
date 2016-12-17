app.service('directionService', function ($http, configuration) {

	// GET
	this.getDirections = function (id) {

		// gets directions under a recipeId
		var promise = $http.get(configuration.apiURL + '/directions/'+id).then(function (response) {
			return response.data;
		}, function(error){

		});
		return promise;	
	};

	// ADD
	this.addDirection = function (id, name) {

		var directionToAdd = {recipeId: id, name: name};
		var promise = $http.post(configuration.apiURL + '/directions', directionToAdd).then(function (response) {
			return response.data;
		}, function(error){

		});
		return promise;	
	}; 

	// UPDATE
	this.updateDirection = function (id, name) {

		var directionToUpdate = {id: id, name: name};
		var promise = $http.put(configuration.apiURL + '/directions/' + id, directionToUpdate).then(function (response) {
			return response.data;
		}, function(error){

		});
		return promise;	
	};     

	// DELETE
	this.deleteDirection = function (id) {

		var promise = $http.delete(configuration.apiURL + '/directions/'+id).then(function (response) {
			return response.data;
		}, function(error){

		});
		return promise;	
	};
});