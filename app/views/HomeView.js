define(['jquery',
		'underscore', 
		'backbone', 
		'globals',
		'views/NotificationView',		
		'models/RecipeModel',
		'collections/RecipeCollection', 
		'text!templates/home.html'
		], function($, _, Backbone, globals, NotificationView, RecipeModel, RecipeCollection, homeTemplate){

		
	var HomeView = Backbone.View.extend({

		tagName: 'div',
		
		initialize: function(){
			console.log(globals.currentUser.get('loggedIn'));
			this.render();
		},
		
		render: function(){
			
			var template = _.template(homeTemplate, {});
			this.$el.html(template);
			$('#page').empty().append(this.$el);
		}

	});
	
	return HomeView;
	
});


