define([
	'config', 
	'backbone'
], function(config, Backbone){

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