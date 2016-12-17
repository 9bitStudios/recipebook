define([
	'jquery',
	'underscore', 
	'backbone', 
	'text!templates/user-info.html'
], function($, _, Backbone, userInfoTemplate){
	
	var UserInfoView = Backbone.View.extend({

		tagName: 'div',

		initialize: function(){
			this.listenTo(this.model, 'change', this.render);
			this.render();
		},


		render: function(){
			var template = _.template(userInfoTemplate, { model: this.model });
			this.$el.html(template);
			$('#userInfo').empty().append(this.$el);
		},

	});

	return UserInfoView;

});