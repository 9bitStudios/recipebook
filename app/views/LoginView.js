define(['config',
		'jquery',
		'underscore', 
		'backbone',
		'helper',
		'globals',
		'views/NotificationView',
		'text!templates/login.html'
		], function(config, $, _, Backbone, Helper, globals, NotificationView, loginTemplate){

		
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
		
			if(username.length > 0 && password.length > 0) {
		
				$.ajax({
					type: "POST",
					url: config.baseURL + "/api/login",
					contentType: "application/json; charset=utf-8",
					dataType: "json",
					username: username,
					password: password,				
					success: function (data) {
					    
						globals.currentUser.set('name', data.username);
						globals.currentUser.set('loggedIn', true);
						Helper.createCookie('RecipeLogin', 1);
						globals.userInfo.render();
						Backbone.history.navigate('', true);
					},
					error: function (errorMessage) {
						var error = new NotificationView({ type:'error', text: 'Error logging in' });
						
					}
				});	
			}
			else {
				var enterCredentials = new NotificationView({
					type: 'error',
					text: 'Please enter your username and password!'
				});
			}
		
		},
		
		logout: function() {
		
		
		}
		

	});
	
	return LoginView;
	
});


