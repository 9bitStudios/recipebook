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
           exports: '_',
      },
      'backbone': {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone',
      }	  
  } 
 
});
require(['jquery', 'underscore', 'backbone', 'helper', 'app'], function($, _, Backbone, Helper, App){ 
 
	App.init();

});