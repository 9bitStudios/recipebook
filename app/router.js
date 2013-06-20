define([
	"config",
	"jquery", 
	"underscore", 
	"backbone",
	"models/RecipeModel",
	"views/HomeView",	
	"views/RecipesAllView",
	"views/RecipeCreateView",
	"views/RecipeEditView"], function(config, $, _, Backbone, RecipeModel, HomeView, RecipesAllView, RecipeCreateView, RecipeEditView) {

	var Router = Backbone.Router.extend({
	
		initialize: function() {
			console.log('New router created');	
		},
		
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
			var view = new HomeView();  
		},
		
		allRecipes: function(){
			var view = new RecipesAllView();				
		},
		createNewRecipe: function() {
			console.log('We are going to create something new here...');
			var view = new RecipeCreateView();
		},		
		 
		editRecipe: function(idParam) {
			console.log('We are going to edit recipe number ' + idParam);
			var view = new RecipeEditView({idParam: idParam, model: RecipeModel});
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
		
		// listen for any route changes
		router.on('route', function() {
		
			// do something if needed (remove view and unbind events and set current view perhaps?)
		
		});			
		
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

