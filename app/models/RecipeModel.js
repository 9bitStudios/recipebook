define(['jquery','underscore', 'backbone'], function($, _, Backbone){

	var RecipeModel = Backbone.Model.extend({
	
		urlRoot: 'api/recipes', 
		
		defaults: {
			name: 'New Recipe',
		},
		
		initialize: function() {
			console.log('New Recipe has been created...');
		},
	
	});
	
	return RecipeModel;
	
});