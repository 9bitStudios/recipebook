define(['jquery',
		'underscore', 
		'backbone', 
		'views/NotificationView',		
		'models/RecipeModel',
		'collections/RecipeCollection', 
		'text!templates/login.html'
		], function($, _, Backbone, NotificationView, RecipeModel, RecipeCollection, loginTemplate){

		
	var LoginView = Backbone.View.extend({

		tagName: 'div',
		
		initialize: function(){
			this.render();
		},
		
		render: function(){
			
			var template = _.template(loginTemplate, {});
			this.$el.html(template);
			$('#page').empty().append(this.$el);
		}

	});
	
	return LoginView;
	
});


