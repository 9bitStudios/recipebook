define([
	"config",
	"jquery", 
	"underscore", 
	"backbone",
	"models/RecipeModel",
	"views/HomeView",	
	"views/RecipesAllView",
	"views/RecipeCreateView"], function(config, $, _, Backbone, RecipeModel, HomeView, RecipesAllView, RecipeCreateView) {

	var Router = Backbone.Router.extend({
	
		routes: {
		
			// "url": "event"
		
			"": "home", 
			"recipes": "allRecipes", 			
			"new": "createNew",  
			"edit/:id": "edit",
			"error": "error",
		},
		
		
		home: function() {
			console.log('We have loaded the home view and kicked off application ' + config.applicationName + ' by ' + config.applicationAuthor);
			var homeView = new HomeView();  
		},
		
		allRecipes: function(){
			var recipiesView = new RecipesAllView();				
		},
		createNew: function() {
			console.log('We are going to create something new here...');
			var createRecipiesView = new RecipeCreateView();
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

