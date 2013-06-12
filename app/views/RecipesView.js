define(['jquery',
		'underscore', 
		'backbone', 
		'models/RecipeModel',
		'collections/RecipeCollection', 
		'text!templates/all-recipes.html'
		], function($, _, Backbone, RecipeModel, RecipeCollection, allRecipesTemplate){

		
	var RecipesView = Backbone.View.extend({

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
					self.$el.html(template);					
				},
				
				error: function(model, xhr, options) {
					
				}
		
			});	

		}

	});
	
	return RecipesView;
	
});


