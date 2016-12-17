define([
	'config',
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

		login: function(event) {
			event.preventDefault();
			var username = $('#username').val();
			var password = $('#password').val();

			if(username.length > 0 && password.length > 0) {
				$.ajax({
					type: "POST",
					url: config.apiURL + "/login",
					contentType: "application/json; charset=utf-8",
					dataType: "json",
					beforeSend: function (xhr) {
						xhr.setRequestHeader ("Authorization", "Basic " + btoa(username + ":" + password));
					},				
					success: function (data) {
						globals.currentUser.set({id: data.id, name: data.username, loggedIn: true});
						Backbone.$.ajaxSetup({
							headers: {'Authorization' :'Basic ' + btoa(username + ":" + password)}
						});				
						Helper.createCookie('RecipeLogin', 1);
						Helper.createCookie('RecipeUser', data.username);
						Helper.createCookie('RecipeId', data.id);
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

		logout: function() { }

	});

	return LoginView;
	
});