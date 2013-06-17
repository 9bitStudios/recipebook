define(['jquery',
		'underscore', 
		'backbone'
		], function($, _, Backbone){

		
	var NotificationView = Backbone.View.extend({
		
		targetElement: 'body',
		
		className: 'notification',
		
		events: {
			"click" : "closeNotification",
		},
		
		initialize: function(options){
			this.render(options.type, options.text, options.target);
		},
		
		render: function(type, text, target){
			
			var self = this;
			
			if(target)
				this.targetElement = target;
			
			this.$el.addClass(type);
			this.$el.text(text);
			this.$el.prependTo(this.targetElement);
			
			// Automatically close after set time
			setTimeout(function(){
				self.closeNotification();
			}, 3000);
			
		},
		
		closeNotification: function() {
			$('.notification').fadeOut(function(){
				$('.notification').remove();
			});
		
		}
		
	});
	
	return NotificationView;
	
});


