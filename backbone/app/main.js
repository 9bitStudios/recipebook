require.config({
    paths: {
        'jquery': 'libs/jquery/jquery-1.9.1',
        'underscore': 'libs/underscore/underscore',
        'backbone': 'libs/backbone/backbone',
        'helper': 'libs/helper/helper',
        'notifications': 'libs/notifications/notifications',
        'text': 'libs/require/text'
    },

    shim: {
        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        }	  
    } 
});

require([
    'backbone', 
    'app'
], function(Backbone, App){ 

    // add any prototypes or Backbone extensions before kicking off the application

    // unbind events and remove view from memory
    Backbone.View.prototype.clearout = function() {
        this.unbind();
        this.remove();
    };

    // generic subview bucket
    Backbone.View.prototype.subviews = [];  

    App.init();

});