define(['config',
		'jquery',
		'underscore', 
		'backbone', 
		'views/NotificationView',		
		'models/RecipeModel',
		'collections/RecipeCollection', 
		'text!templates/login.html'
		], function(config, $, _, Backbone, NotificationView, RecipeModel, RecipeCollection, loginTemplate){

		
	var LoginView = Backbone.View.extend({

		tagName: 'div',
		
		events: {
			'click #login': 'login',
		},
		
		initialize: function(){
			this.render();
		},
		
		render: function(){
			
			var template = _.template(loginTemplate, {});
			this.$el.html(template);
			$('#page').empty().append(this.$el);
		},
		
		login: function() {
		
			var username = $('#username').val();
			var password = $('#password').val();
			
			$.ajax({
				type: "POST",
				url: config.baseURL + "/api/login",
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				username: username,
				password: password,				
				success: function (successMessage) {
					console.log('success');
				},
				error: function (errorMessage) {
					console.log('failure');
					
				}
			});		
		
		},
		
		logout: function() {
		
		
		}
		

	});
	
	return LoginView;
	
});


