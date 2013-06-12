require.config({
  paths: {
    'jquery': 'http://code.jquery.com/jquery-latest',
    'underscore': 'libs/underscore/underscore',
	'backbone': 'libs/backbone/backbone',
	'text': 'libs/require/text'
  },
  
  shim: {
      'underscore': {
           exports: '_',
      },
      'backbone': {
           exports: 'Backbone',
      }	  
  } 
 
});
require(['jquery', 'underscore', 'backbone', 'app'], function($, _, Backbone, App){ 
 
	App.init();

});