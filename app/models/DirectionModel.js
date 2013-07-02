define(['jquery','underscore', 'backbone'], function($, _, Backbone){

    var DirectionModel = Backbone.Model.extend({
	
	urlRoot: 'api/directions', 
	
	defaults: {
	    recipeId: null,
	    name: 'New Direction'
	},
	initialize: function() {
	}
    });
    
    return DirectionModel;
    
});