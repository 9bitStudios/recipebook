var rb = rb || {};

	rb.Router = Backbone.Router.extend({
	
		routes: {
		
			// "url": "event"
		
			"": "home", 
			"new": "createNew",  
			"edit/:id": "edit",
			"error": "error",
		},

		home: function() {
			console.log('We have loaded the home view and kicked off application ' + rb.config.applicationName + ' by ' + rb.config.applicationAuthor);
			var recipiesView = new rb.RecipesView();
		  
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
		


