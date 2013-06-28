define(['jquery','underscore', 'backbone'], function($, _, Backbone){

    var IngredientModel = Backbone.Model.extend({
	
	urlRoot: 'api/ingredient', 
	
	defaults: {
	    recipeId: null,
	    name: 'New Ingredient'
	},
	initialize: function() {
	    console.log('New ingredient has been created...');
	}
    });
    
    return IngredientModel;
    
});