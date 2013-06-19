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
			"new": "createNewRecipe",  
			"edit/:id": "editRecipe",
			"delete/:id": "deleteRecipe",			
			"error": "error",
		},
		
		home: function() {
			console.log('We have loaded the home view and kicked off application ' + config.applicationName + ' by ' + config.applicationAuthor);
			var homeView = new HomeView();  
		},
		
		allRecipes: function(){
			var recipiesView = new RecipesAllView();				
		},
		createNewRecipe: function() {
			console.log('We are going to create something new here...');
			var createRecipiesView = new RecipeCreateView();
		},		
		 
		editRecipe: function(idParam) {
			console.log('We are going to edit recipe number ' + idParam);
		},	
		
		deleteRecipe: function(idParam) {
			console.log('We are going to delete recipe number ' + idParam);
		},		
		
		error: function() {
			console.log('Error...');
		},			
	
	});
	

	var initialize = function() {
	
		var router = new Router();	
		
		// used for triggering routes in view, there is probably a better way....
		Backbone.View.prototype.goTo = function (route, options) {
			router.navigate(route, options);
		};		
		
		Backbone.history.start();
		
	};
	
	return {
		init: initialize
	}

});

