define([
	'jquery',
	'underscore', 
	'backbone',  
	'text!templates/home.html'
], function($, _, Backbone, homeTemplate){

	var HomeView = Backbone.View.extend({

		tagName: 'div',

		initialize: function(){
			this.render();
		},

		render: function(){
			var template = _.template(homeTemplate, {});
			this.$el.html(template);
			$('#page').empty().append(this.$el);
		}

	});

	return HomeView;
});