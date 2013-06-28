define(['jquery','underscore', 'backbone', 'router'], function($, _, Backbone, Router){
    
    var initialize = function(){
	Router.init();
    };
    
    return { 
	init: initialize
    };
    
});