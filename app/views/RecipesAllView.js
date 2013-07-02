define(['jquery',
	'underscore', 
	'backbone', 
	'globals',
	'views/NotificationView',
	'models/RecipeModel',
	'collections/RecipeCollection', 
	'text!templates/recipes-all.html'], function($, _, Backbone, globals, NotificationView, RecipeModel, RecipeCollection, allRecipesTemplate){

		
    var RecipesAllView = Backbone.View.extend({

	tagName: 'div',

	events: {
	    'click .delete': 'deleteRecipe',
	},

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
		    $('#page').empty().append(self.$el);					
		},

		error: function(model, xhr, options) {
		    var message;
		    if(xhr.status === 401) {
			message = 'You must be logged in and have proper permissions to access this data.';
			Backbone.history.navigate('',true);

		    }
		    var error = new NotificationView({ 
			type: 'error', 
			text: message
		    });
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
			console.log('model removed');
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


