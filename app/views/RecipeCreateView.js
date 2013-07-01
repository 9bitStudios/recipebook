define(['jquery',
	'underscore', 
	'backbone', 
	'globals',
	'views/NotificationView',
	'models/RecipeModel',
	'models/IngredientModel',
	'views/IngredientView',
	'views/DirectionView',
	'text!templates/recipe-create.html'
	], function($, _, Backbone, globals, NotificationView, RecipeModel, IngredientModel, IngredientView, DirectionView, recipeCreateTemplate){

		
    var RecipeCreateView = Backbone.View.extend({
	tagName: 'div',
	className: 'recipeCreate',
	
	events: {
	    'click #submit': 'saveMainItem',
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
	    this.subviews.push(new IngredientView()); // add to subviews list so that things can be unbound later
	},

	addDirection: function() {
	    this.subviews.push(new DirectionView()); // add to subviews list so that things can be unbound later
	},

	saveMainItem: function(event) {

	    event.preventDefault();
	    $('#submit').attr('disabled', 'disabled');
	    var self = this;
	    var recipeName = $('#recipe-name').val();
	    var recipe = new RecipeModel({ name: recipeName });
	    recipe.save(null, {
		wait: true,
		success: function(model, response, options) {
		    self.saveSubItems(recipe.get('id'));
		},

		error: function (model, xhr, options) {
		    var error = new NotificationView({ 
			type: 'error', 
			text: 'Error creating recipe'
		    });					
		    self.remove();
		    Backbone.history.navigate('recipes', true);		    
		}
	    });

	},
	
	saveSubItems: function(recipeId){
	    
	    try {
		$('.ingredient').each(function(){
		    var ingredientName = $(this).val();
		    var ingredient = new IngredientModel({ recipeId: recipeId, name: ingredientName });
		    ingredient.save(null, {
			wait: true,
			success: function(model, response, options) {
			    // continue
			},
			error: function (model, xhr, options) {		
			    throw 'Error saving recipe ingredients'
			}
		    });		
		});
		
		var success = new NotificationView({ 
		    type: 'success', 
		    text: 'Recipe saved successfully'
		});		
		
	    }
	    catch(e){
		
		var error = new NotificationView({ 
		    type: 'error', 
		    text: e
		});			
		
	    }
	    
	    this.remove(); // remove and unbind everything...
	    Backbone.history.navigate('recipes', true);
	    
	},
	
    });

    return RecipeCreateView;
	
});


