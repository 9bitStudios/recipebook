define(['config','jquery','underscore', 'backbone', 'models/RecipeModel'], function(config, $, _, Backbone, RecipeModel){

	var RecipeCollection = Backbone.Collection.extend({
	
		model: RecipeModel,
		url: config.apiURL + "/recipes"
	
	});
	
	return RecipeCollection;
	
});