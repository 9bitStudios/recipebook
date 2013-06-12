define(['jquery','underscore', 'backbone'], function($, _, Backbone){

	var UserCollection = Backbone.Collection.extend({
	
		url: 'api/users',
	
	});
	
	return UserCollection;
	
});