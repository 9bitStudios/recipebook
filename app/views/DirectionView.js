define(['jquery',
	'underscore', 
	'backbone', 
	'globals',
	'text!templates/direction-create.html',
	], function($, _, Backbone, globals, directionCreateTemplate){

		
    var DirectionView = Backbone.View.extend({

	tagName: 'div',
	
	className: 'direction',
	
	events: {
	    'click .deleteDirection': 'close'
	},
	
	initialize: function(){
	    this.render();
	},
	render: function() {
	    var template = _.template(directionCreateTemplate, {});
	    this.$el.html(template);
	    $('#directions').append(this.$el);
	},
		
	close: function(event) {
	    event.preventDefault();
	    this.unbind();
	    this.remove();
	}
	
    });
    
    return DirectionView;
	
});


