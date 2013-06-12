var rb = rb || {};

	rb.RecipeModel = Backbone.Model.extend({
	
		urlRoot: 'api/recipes', 
		
		idAttribute: "_id",
		
		defaults: {
			name: 'New Recipe',
		},
		
		initialize: function() {
			console.log('New Recipe has been created...');
		},
	
	});
	
	
