define([
    'config', 
    'backbone', 
    'models/DirectionModel'
], function(config, Backbone, DirectionModel){

    var DirectionCollection = Backbone.Collection.extend({
        model: DirectionModel,
        url: config.apiURL + "/directions",
    });

    return DirectionCollection;
});