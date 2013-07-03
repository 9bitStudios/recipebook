define(['jquery',
	'underscore', 
	'backbone', 
	'globals',
	'models/IngredientModel',
	'text!templates/ingredient-create.html',
	], function($, _, Backbone, globals, IngredientModel, ingredientCreateTemplate){

		
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
	    var template = _.template(ingredientCreateTemplate, { model: this.model });
	    this.$el.html(template);
	    $('#ingredients').append(this.$el);
	},
	updateIngredient: function(){
	    this.model.set('name', this.$('.ingredient').val());
	},	
	close: function(event) {
	    event.preventDefault();
	    this.clearout(); // from prototype
	}
	
    });
    
    return IngredientView;
	
});


