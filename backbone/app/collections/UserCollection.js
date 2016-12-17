define([
	'config',
	'backbone'
], function(config, Backbone){

	var UserCollection = Backbone.Collection.extend({
		url: config.apiURL + '/users'
	});

	return UserCollection;

});