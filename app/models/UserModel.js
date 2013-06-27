define(['config', 'jquery','underscore', 'backbone', 'helper'], function(config, $, _, Backbone, Helper){

	var UserModel = Backbone.Model.extend({
	
		urlRoot: 'api/login', 
	
		defaults: {
			name: 'User',
			avatar: '',
			loggedIn: false
		},
		
		initialize: function() {
			if(Helper.readCookie('RecipeLogin') === '1')
			    this.set('loggedIn', true);
			
			console.log('User model init...');
		},
		
		reset: function() {
			
			var self = this;
			
			Helper.destroyCookie('RecipeLogin');
			
			$.ajax({
				type: "POST",
				url: config.baseURL + "/api/logout",
				contentType: "application/json; charset=utf-8",
				async: false,
				dataType: "json",
				username: Helper.randomString(),
				password: Helper.randomString(),				
				error: function (errorMessage) {
					self.set('loggedIn',false);
				}
			});			
			
		}		
		
	
	});
	
	return UserModel;
	
});