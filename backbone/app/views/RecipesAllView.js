define([
	'config',
	'jquery',
	'underscore', 
	'backbone', 
	'globals',
	'views/NotificationView',
	'models/RecipeModel',
	'collections/RecipeCollection', 
	'text!templates/recipes-all.html'
], function(config, $, _, Backbone, globals, NotificationView, RecipeModel, RecipeCollection, allRecipesTemplate){


	var RecipesAllView = Backbone.View.extend({

		tagName: 'div',

		events: {
			'click .delete': 'deleteRecipe',
		},

		initialize: function(){
			this.recipes = new RecipeCollection();
			this.getRecipes(this.recipes);
		},

		render: function(recipes){
			var template = _.template(allRecipesTemplate, {recipes: recipes});
			this.$el.html(template);
			$('#page').empty().append(this.$el);
		},

		getRecipes: function(recipes){
			var self = this;
			recipes.url = config.apiURL + "/user/recipes/" + globals.currentUser.get('id');
			recipes.fetch({
				cache: false,
				wait: true,
				reset: true,
				success: function(collection, response, options) {				
					self.render(collection.models);					
				},
				error: function(model, xhr, options) {
					var message;

					if (xhr.status === 404) {
						message = 'You don\'t have any recipes';
						self.render(recipes.models);
					}
					else if(xhr.status === 401) {
						message = 'You must be logged in and have proper permissions to access this data.';
						Backbone.history.navigate('',true);
					}		    

					var error = new NotificationView({ type: 'error', text: message });
				}

			});	    
		},
		deleteRecipe: function(event) {

			var self = this;
			event.preventDefault();
			var id = $(event.currentTarget).data("id");
			var recipe = new RecipeModel({ id: id });

			if (confirm('Are you sure you want to delete this recipe?')) {
				recipe.destroy({
					wait: true,
					success: function(model, response, options) {
						$('.recipe-item-'+id).fadeOut();
					},

					error: function(model, xhr, options) {
						var error = new NotificationView({ 
							type: 'error', 
							text: 'There was an error deleting the recipe'
						});					
					}

				});		
			}
		}
	});

	return RecipesAllView;

});