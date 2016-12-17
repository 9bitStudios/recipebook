define([
    'config', 
    'backbone', 
    'models/IngredientModel'
], function(config, Backbone, IngredientModel){
    
    var IngredientCollection = Backbone.Collection.extend({
        model: IngredientModel,
        url: config.apiURL + "/ingredients"
    });

    return IngredientCollection;

});