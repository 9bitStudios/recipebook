define(['config', 'jquery','underscore', 'backbone'], function(config, $, _, Backbone){

    var DirectionModel = Backbone.Model.extend({
	
	urlRoot: config.apiURL + '/directions', 
	
	defaults: {
	    recipeId: null,
	    name: 'New Direction'
	},
	initialize: function() {
	}
    });
    
    return DirectionModel;
    
});