define(['jquery',
		'underscore', 
		'backbone'
		], function($, _, Backbone){

		
	var NotificationView = Backbone.View.extend({
		
		targetElement: 'body',
		
		tagName: 'div',
		
		className: 'notification',		
		
		defaultMessages: {
			'success': 'Success!',
			'error': 'Sorry! An error occured in the process',
			'warning': 'Are you sure you want to take this action?',
			'information': 'An unknown event occured'
		}, 
		
		events: {
			"click" : "closeNotification",
		},
		
		automaticClose: true, 
		
		initialize: function(options){
		
			var type = options.type;
			var text = options.text; 
			var target = options.target;
		
			if(options.automaticClose)
				this.automaticClose = options.automaticClose;
		
			if(!type)
				type = 'information';
			
			if(!text)
				text = this.defaultMessages[type]
				
			if(target)
				this.targetElement = target;		
		
			// is message already displayed? if yes, don't show again
			if($('.notification:contains('+text+')').length === 0) { 
				this.render(type, text, target);
			}
				
		},
		
		render: function(type, text, target){
			
			var self = this;
			
			this.$el.addClass(type);
			this.$el.text(text);
			this.$el.prependTo(this.targetElement);
			
			// Automatically close after set time
			
			if(this.automaticClose) {
			
				setTimeout(function(){
					self.closeNotification();
				}, 3000);
			
			}
			
		},
		
		closeNotification: function() {
		
			var self = this;
		
			$(this.el).fadeOut(function() {
				self.remove();
			});
		}
		
	});
	
	return NotificationView;
	
});


