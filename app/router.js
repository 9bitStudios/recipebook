define(["config",
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

	unsetView: function(view) {

	    if(this.views[view]) {
		try {
		    for(var i in this.views[view].subviews) {
			this.views[view].subviews[i].clearout();
		    }
		    this.views[view].clearout();
		} 
		catch(e) { 
		    // Exception handling here...
		}
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
	    this.unsetView('main');
	    this.views['main'] = new HomeView();
	},

	login: function() {
	    this.unsetView('main');
	    this.views['main'] = new LoginView();
	},

	logout: function() {
	    globals.currentUser.reset();
	    Backbone.history.navigate('', true);
	},

	allRecipes: function(){
	    this.unsetView('main');
	    if(globals.currentUser.get('loggedIn') !== true)
		Backbone.history.navigate('login', true);
	    else
		this.views['main'] = new RecipesAllView();				
	},
	createNewRecipe: function() {
	    this.unsetView('main');
	    if(globals.currentUser.get('loggedIn') !== true)
		Backbone.history.navigate('login', true);
	    else
		this.views['main'] = new RecipeCreateView();
	},		

	editRecipe: function(idParam) {
	    this.unsetView('main');
	    if(globals.currentUser.get('loggedIn') !== true)
		Backbone.history.navigate('login', true);
	    else
		this.views['main'] = new RecipeEditView({idParam: idParam, model: RecipeModel});
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

