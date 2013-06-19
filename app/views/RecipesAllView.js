define(['jquery',
		'underscore', 
		'backbone', 
		'views/NotificationView',		
		'models/RecipeModel',
		'collections/RecipeCollection', 
		'text!templates/recipes-all.html'
		], function($, _, Backbone, NotificationView, RecipeModel, RecipeCollection, allRecipesTemplate){

		
	var RecipesAllView = Backbone.View.extend({

		el: '#page',
		
		initialize: function(){
			this.render();
		},
		
		render: function(){
			
			var self = this;
			
			var recipes = new RecipeCollection();
			
			recipes.fetch({
				wait: true,
				reset: true,
				success: function(collection, response, options) {				
					
					var template = _.template(allRecipesTemplate, {recipes: collection.models});
					$(self.el).html(template);					
				},
				
				error: function(model, xhr, options) {
					
					var message;
					if(xhr.status === 401)
						message = 'You must be logged in and have proper permissions to access this data.';
						
					var error = new NotificationView({ 
						type: 'error', 
						text: message
					});
				}
		
			});	

		}

	});
	
	return RecipesAllView;
	
});


