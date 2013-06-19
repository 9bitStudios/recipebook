define(['jquery',
		'underscore', 
		'backbone', 
		'views/NotificationView',		
		'models/RecipeModel',
		'collections/RecipeCollection', 
		'text!templates/recipe-create.html'
		], function($, _, Backbone, NotificationView, RecipeModel, RecipeCollection, recipeCreateTemplate){

		
	var RecipeCreateView = Backbone.View.extend({

		el: '#page',
		
		events: {
			'click #submit': 'saveRecipe',
			'click #addIngredient': 'addIngredient',
		},
		
		initialize: function(){
			this.render();
		},
		
		saveRecipe: function(event) {
			
			event.preventDefault();
			var recipeName = $('#recipe-name').val();
			var recipe = new RecipeModel();
			recipe.save("name", recipeName, {
			
				wait: true,
				success: function(model, response, options) {
				
					var success = new NotificationView({ 
						type: 'success', 
						text: 'Recipe created successfully'
					});				
				
				},
				
				error: function (model, xhr, options) {
				
					var success = new NotificationView({ 
						type: 'error', 
						text: 'Error creating recipe'
					});					
				
				}
			
			});
		
		},
		
		render: function(){
			
			var self = this;
			var template = _.template(recipeCreateTemplate, {});
			this.$el.html(template);
		}

	});
	
	return RecipeCreateView;
	
});


