define(['config',
	'jquery',
	'underscore', 
	'backbone', 
	'globals',
	'text!templates/user-signup.html'], function(config, $, _, Backbone, globals, userSignUpTemplate){

		
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
		type: "GET",
		url: config.baseURL + "/api/user",
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		username: username,
		password: password,				
		success: function (data) {
		    
		},
		error: function (errorMessage) {
		}
		
	    });
    
    
	}
	
    });

    return UserSignUpView;
	
});


