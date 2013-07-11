define(['jquery','underscore', 'backbone', 'models/RecipeModel'], function($, _, Backbone, RecipeModel){

	var RecipeCollection = Backbone.Collection.extend({
	
		model: RecipeModel,
		url: "api/recipes",
	
	});
	
	return RecipeCollection;
	
});