define(['config',
		'jquery',
		'underscore', 
		'backbone', 
		'globals',
		'text!templates/user-info.html'
		], function(config, $, _, Backbone, globals, userInfoTemplate){

		
	var UserInfoView = Backbone.View.extend({

		tagName: 'div',
		
		initialize: function(){
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


