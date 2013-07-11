define(['config','jquery','underscore', 'backbone', 'models/DirectionModel'], function(config, $, _, Backbone, DirectionModel){

    var DirectionCollection = Backbone.Collection.extend({

	model: DirectionModel,
	url: config.apiURL + "/directions",

    });

    return DirectionCollection;
	
});