define([
	'jquery',
	'underscore', 
	'backbone', 
	'models/DirectionModel',
	'text!templates/direction-details.html',
	'text!templates/direction-create.html',
], function($, _, Backbone, DirectionModel, directionDetailsTemplate, directionCreateTemplate){

	var DirectionView = Backbone.View.extend({

		tagName: 'div',

		className: 'directionContainer',

		events: {
			'click .deleteDirection': 'close',
			'keyup': 'updateDirection'
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

			// if {editable: false} property was passed in with options, choose different template. Default is true.
			if(this.options.editable === false) {
				var template = _.template(directionDetailsTemplate, { model: this.model });
			}
			else {
				var template = _.template(directionCreateTemplate, { model: this.model });
			}

			this.$el.html(template);
			$('#directions').append(this.$el);
		},
		updateDirection: function(){
			this.model.set('name', this.$('.direction').val());
		},		
		close: function(event) {
			// trigger a "direction-remove" event for the parent view to listen to passing in the model id...
			this.$el.trigger('direction-remove', this.model);
			event.preventDefault();
			this.clearout(); // from prototype
		}

	});

	return DirectionView;

});