define(['config','jquery','underscore', 'backbone'], function(config, $, _, Backbone){

	var UserCollection = Backbone.Collection.extend({
	
		url: config.apiURL + '/users'
	
	});
	
	return UserCollection;
	
});