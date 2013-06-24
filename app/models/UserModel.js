define(['config', 'jquery','underscore', 'backbone'], function(config, $, _, Backbone){

	var UserModel = Backbone.Model.extend({
	
		urlRoot: 'api/login', 
	
		defaults: {
			name: 'User',
			avatar: '',
			loggedIn: false
		},
		
		initialize: function() {
			// TODO: check auth login status and set loggedIn property. Set cookie?
			console.log('User model init...');
		},
		
		reset: function() {
			$.ajax({
				type: "POST",
				url: config.baseURL + "/api/logout",
				contentType: "application/json; charset=utf-8",
				async: false,
				dataType: "json",
				username: 'dummy',
				password: 'dummy',				
				error: function (errorMessage) {
					
				}
			});			
		
		}		
		
	
	});
	
	return UserModel;
	
});