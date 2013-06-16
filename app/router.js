define([
	"config",
	"jquery", 
	"underscore", 
	"backbone",
	"models/RecipeModel",
	"views/RecipesAllView"], function(config, $, _, Backbone, RecipeModel, RecipesAllView) {

	var Router = Backbone.Router.extend({
	
		routes: {
		
			// "url": "event"
		
			"": "home", 
			"new": "createNew",  
			"edit/:id": "edit",
			"error": "error",
		},
		
		
		home: function() {
			console.log('We have loaded the home view and kicked off application ' + config.applicationName + ' by ' + config.applicationAuthor);
			var recipiesView = new RecipesAllView();		  
		},

		createNew: function() {
			console.log('We are going to create something new here...');
		},		
		 
		edit: function(idParam) {
			console.log('We are going to edit recipe number ' + idParam);
		},	
		
		error: function() {
			console.log('Error...');
		},			
		
	
	});
	

	var initialize = function() {
	
		var router = new Router();
		Backbone.history.start();
		
	};
	
	return {
		init: initialize
	}

});

