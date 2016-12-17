define([
	'config', 
	'backbone', 
	'models/RecipeModel'
], function(config, Backbone, RecipeModel){

	var RecipeCollection = Backbone.Collection.extend({
		model: RecipeModel,
		url: config.apiURL + "/recipes"
	});

	return RecipeCollection;

});