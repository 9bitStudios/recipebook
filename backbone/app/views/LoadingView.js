define([
	'backbone'
], function(Backbone){

	var LoadingView = Backbone.View.extend({

		tagName: 'div',

		className: 'loading',

		targetElement: 'body',

		initialize: function(options){
			if(options && options.hasOwnProperty('target')) {
				this.targetElement = options.target;
			}
			this.render();
		},
		render: function() {
			this.$el.text('Loading');
			this.$el.prependTo(this.targetElement);
		}
	});

	return LoadingView;

});