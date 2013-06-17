require.config({
  paths: {
    'jquery': 'http://code.jquery.com/jquery-latest',
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
           exports: 'Backbone',
      }	  
  } 
 
});
require(['jquery', 'underscore', 'backbone', 'helper', 'app'], function($, _, Backbone, Helper, App){ 
 
	App.init();

});