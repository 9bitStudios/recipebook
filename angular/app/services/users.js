app.service('userService', function ($http, configuration, $rootScope, Base64) {

	$rootScope.auth = {
		isLoggedIn: false,
		id: null,
		username:null,
		password:null
	};

	return {

		login: function (username, password) {
			$http.defaults.headers.common['Authorization'] = this.makeBase64Hash(username, password);

			var promise = $http.post(configuration.apiURL + '/login').then(function (response) {
				return response.data;
			}, function(error){

			});
			return promise;		    

		},
		logout: function(){

		},
		signUp: function(username, password){
			var userToAdd = {username: username, password: password};
			var promise = $http.post(configuration.apiURL + '/user', userToAdd).then(function (response) {
				return response.data;
			}, function(error){

			});
			return promise;    
		},

		makeBase64Hash: function(user, pass){
			var tok = user + ':' + pass;
			var hash = Base64.encode(tok);
			return "Basic " + hash;
		}
	};
});