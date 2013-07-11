define(['config','jquery','underscore', 'backbone'], function(config, $, _, Backbone){

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