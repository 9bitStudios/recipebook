define(['jquery','underscore', 'backbone', 'models/IngredientModel'], function($, _, Backbone, IngredientModel){

    var IngredientCollection = Backbone.Collection.extend({

	model: IngredientModel,
	url: "api/ingredients"

    });

    return IngredientCollection;
	
});