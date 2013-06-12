var rb = rb || {};

	rb.RecipeCollection = Backbone.Collection.extend({
	
		model: rb.RecipeModel,
		url: "api/recipes",
	
	});
	