define([
	'config',
	'jquery',
	'underscore', 
	'backbone', 
	'views/NotificationView',
	'text!templates/user-signup.html'
], function(config, $, _, Backbone, NotificationView, userSignUpTemplate){

	var UserSignUpView = Backbone.View.extend({

		tagName: 'div',

		events: {
			'click #submit': 'saveUser',
		},

		initialize: function(){
			this.render();
		},

		render: function(){
			var template = _.template(userSignUpTemplate, { model: this.model });
			this.$el.html(template);
			$('#page').empty().append(this.$el);
		},

		saveUser: function(event) {
			event.preventDefault();

			var username = $('#username').val();
			var password = $('#password').val();

			$.ajax({
				type: "POST",
				url: config.apiURL + "/user",
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				data: JSON.stringify({username: username, password: password}),				
				success: function (data) {
					var success = new NotificationView({ type: 'success', text: 'Sign up successful' });
					Backbone.history.navigate('', true);
				},
				error: function (errorMessage) {

					if(errorMessage.status === 403) {
						var message = 'That username already exists. Please choose a different username';
					}
					else { 
						var message = 'Error signing up';
					}

					var error = new NotificationView({ type: 'error', text: message });
				}

			});
		}

	});

	return UserSignUpView;

});