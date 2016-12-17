define([
	'jquery',
	'underscore', 
	'backbone', 
	'models/IngredientModel',
	'text!templates/ingredient-details.html',
	'text!templates/ingredient-create.html',
], function($, _, Backbone, IngredientModel, ingredientDetailsTemplate, ingredientCreateTemplate){

	var IngredientView = Backbone.View.extend({

		tagName: 'div',

		className: 'ingredientContainer',

		events: {
			'click .deleteIngredient': 'close',
			'keyup': 'updateIngredient'
		},

		initialize: function(){

			if(this.options.model) {
			this.model = this.options.model;
			}
			else {
			this.model = new IngredientModel();
			}

			this.render();
		},
		render: function() {

			// if {editable: false} property was passed in with options, choose different template. Default is true.
			if(this.options.editable === false) {
				var template = _.template(ingredientDetailsTemplate, { model: this.model });
			}
			else {
				var template = _.template(ingredientCreateTemplate, { model: this.model });
			}

			this.$el.html(template);
			$('#ingredients').append(this.$el);
		},
		updateIngredient: function(){
			this.model.set('name', this.$('.ingredient').val());
		},	
		close: function(event) {
			// trigger an "ingredient-remove" event for the parent view to listen to passing in the model cid...
			this.$el.trigger('ingredient-remove', this.model);

			event.preventDefault();
			this.clearout(); // from prototype
		}

	});

	return IngredientView;

});