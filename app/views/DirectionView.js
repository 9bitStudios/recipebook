define(['jquery',
	'underscore', 
	'backbone', 
	'globals',
	'models/DirectionModel',
	'text!templates/direction-create.html',
	], function($, _, Backbone, globals, DirectionModel, directionCreateTemplate){

		
    var DirectionView = Backbone.View.extend({

	tagName: 'div',
	
	className: 'directionContainer',
	
	events: {
	    'click .deleteDirection': 'close'
	},
	
	initialize: function(){

	    if(this.options.model) {
		this.model = this.options.model;
	    }
	    else {
		this.model = new DirectionModel();
	    }	    
	    
	    this.render();
	},
	render: function() {
	    var template = _.template(directionCreateTemplate, { model: this.model });
	    this.$el.html(template);
	    $('#directions').append(this.$el);
	},
		
	close: function(event) {
	    event.preventDefault();
	    this.clearout(); // from prototype
	}
	
    });
    
    return DirectionView;
	
});


