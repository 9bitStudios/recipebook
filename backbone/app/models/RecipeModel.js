define([
	'config', 
	'backbone'
], function(config, Backbone){

	var RecipeModel = Backbone.Model.extend({
		urlRoot: config.apiURL + '/recipes', 

		defaults: {
			userId: null,
			name: 'New Recipe',
		},

		initialize: function() {
		},

	});

	return RecipeModel;

});