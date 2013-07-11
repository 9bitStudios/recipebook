define(['config','jquery','underscore', 'backbone'], function(config, $, _, Backbone){

    var IngredientModel = Backbone.Model.extend({
	
	urlRoot: config.apiURL + '/ingredients', 
	
	defaults: {
	    recipeId: null,
	    name: 'New Ingredient'
	},
	initialize: function() {
	}
    });
    
    return IngredientModel;
    
});