define(['jquery','underscore', 'backbone'], function($, _, Backbone){

    var IngredientModel = Backbone.Model.extend({
	
	urlRoot: 'api/ingredients', 
	
	defaults: {
	    recipeId: null,
	    name: 'New Ingredient'
	},
	initialize: function() {
	}
    });
    
    return IngredientModel;
    
});