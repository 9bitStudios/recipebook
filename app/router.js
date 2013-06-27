define([
	"config",
	"jquery", 
	"underscore", 
	"backbone",
	"globals",
	"models/RecipeModel",
	"views/HomeView",
	"views/LoginView",	
	"views/RecipesAllView",
	"views/RecipeCreateView",
	"views/RecipeEditView"], function(config, $, _, Backbone, globals, RecipeModel, HomeView, LoginView, RecipesAllView, RecipeCreateView, RecipeEditView) {

	var Router = Backbone.Router.extend({
	
		initialize: function() {
			console.log('New router created');	
		},
		
                views: {
                    main: null
                },
                
                unsetView: function() {
                    if(this.views.main) {
                        this.views.main.unbind();
                        this.views.main.remove();
                        console.log('Unset');
                    }
                },
                
		routes: {
		
			// "url": "event"
		
			"": "home", 
			"login": "login", 
			"logout": "logout",
			"recipes": "allRecipes", 			
			"new": "createNewRecipe",  
			"edit/:id": "editRecipe",		
			"error": "error",
		},
		
		home: function() {
			console.log('We have loaded the home view and kicked off application ' + config.applicationName + ' by ' + config.applicationAuthor);
			this.unsetView();
                        this.views.main = new HomeView();
                          
		},
		
		login: function() {
                        this.unsetView();
			this.views.main = new LoginView();
		},
		
		logout: function() {
			globals.currentUser.reset();
			globals.userInfo.render();
			Backbone.history.navigate('', true);
		},
		
		allRecipes: function(){
                        this.unsetView();
			if(globals.currentUser.get('loggedIn') !== true)
				Backbone.history.navigate('login', true);
			else
				this.views.main = new RecipesAllView();				
		},
		createNewRecipe: function() {
                        this.unsetView();
			if(globals.currentUser.get('loggedIn') !== true)
				Backbone.history.navigate('login', true);
			else
			this.views.main = new RecipeCreateView();
		},		
		 
		editRecipe: function(idParam) {
                        this.unsetView();
			if(globals.currentUser.get('loggedIn') !== true)
				Backbone.history.navigate('login', true);
			else
				this.views.main = new RecipeEditView({idParam: idParam, model: RecipeModel});
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
		
		Backbone.history.start();
		
		
	};
	
	return {
		init: initialize
	};

});

