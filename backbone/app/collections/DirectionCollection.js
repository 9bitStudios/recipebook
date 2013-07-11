define(['jquery','underscore', 'backbone', 'models/DirectionModel'], function($, _, Backbone, DirectionModel){

    var DirectionCollection = Backbone.Collection.extend({

	model: DirectionModel,
	url: "api/directions",

    });

    return DirectionCollection;
	
});