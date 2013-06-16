define(['jquery',
		'underscore', 
		'backbone', 
		'models/RecipeModel',
		'collections/RecipeCollection', 
		'text!templates/recipe-create.html'
		], function($, _, Backbone, RecipeModel, RecipeCollection, recipeCreateTemplate){

		
	var RecipeCreateView = Backbone.View.extend({

		el: '#page',
		
		events: {
			'click #submit': 'saveRecipe',
			'click #addIngredient': 'addIngredient',
		},
		
		initialize: function(){
			this.render();
		},
		
		saveRecipe: function() {
		
			console.log('You clicked the button');
			var recipeName = $('#recipe-name').val();
			var recipe = new RecipeModel({ name: recipeName })
			recipe.save();
		
		},
		
		render: function(){
			
			var self = this;
			var template = _.template(recipeCreateTemplate, {});
			this.$el.html(template);
		}

	});
	
	return RecipeCreateView;
	
});


