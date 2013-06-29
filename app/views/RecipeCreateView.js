define(['jquery',
	'underscore', 
	'backbone', 
	'globals',
	'views/NotificationView',
	'models/RecipeModel',
	'views/IngredientView',
	'views/DirectionView',
	'text!templates/recipe-create.html'
	], function($, _, Backbone, globals, NotificationView, RecipeModel, IngredientView, DirectionView, recipeCreateTemplate){

		
    var RecipeCreateView = Backbone.View.extend({
	tagName: 'div',
	className: 'recipeCreate',

	events: {
	    'click #submit': 'saveRecipe',
	    'click #addIngredient': 'addIngredient',
	    'click #addDirection': 'addDirection'
	},

	initialize: function(){
	    this.render();
	},

	render: function(){
	    var self = this;
	    var template = _.template(recipeCreateTemplate, {});
	    this.$el.html(template);
	    $('#page').empty().append(this.$el);
	},		

	addIngredient: function() {
	    var ingredientView = new IngredientView();
	},

	addDirection: function() {
	    var directionView = new DirectionView();
	},

	saveRecipe: function(event) {

	    event.preventDefault();
	    $('#submit').attr('disabled', 'disabled');
	    var self = this;
	    var recipeName = $('#recipe-name').val();
	    var recipe = new RecipeModel();
	    recipe.save("name", recipeName, {
		wait: true,
		success: function(model, response, options) {
		    var success = new NotificationView({ 
			type: 'success', 
			text: 'Recipe created successfully'
		    });	

		    self.remove(); // remove and unbind everything...
		    Backbone.history.navigate('recipes', true);
		},

		error: function (model, xhr, options) {
		    var success = new NotificationView({ 
			type: 'error', 
			text: 'Error creating recipe'
		    });					

		}
	    });

	}
    });

    return RecipeCreateView;
	
});


