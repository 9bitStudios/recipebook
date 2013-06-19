define(['jquery',
		'underscore', 
		'backbone', 
		'views/NotificationView',		
		'models/RecipeModel',
		'collections/RecipeCollection', 
		'text!templates/home.html'
		], function($, _, Backbone, NotificationView, RecipeModel, RecipeCollection, homeTemplate){

		
	var HomeView = Backbone.View.extend({

		el: '#page',
		
		initialize: function(){
			this.render();
		},
		
		render: function(){
			
			var template = _.template(homeTemplate, {});
			$(this.el).html(template);	

		}

	});
	
	return HomeView;
	
});


