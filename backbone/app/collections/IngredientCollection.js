define(['config','jquery','underscore', 'backbone', 'models/IngredientModel'], function(config, $, _, Backbone, IngredientModel){

    var IngredientCollection = Backbone.Collection.extend({

	model: IngredientModel,
	url: config.apiURL + "/ingredients"

    });

    return IngredientCollection;
	
});