define(['jquery',
	'underscore', 
	'backbone', 
	'globals',
	'text!templates/ingredient-create.html',
	], function($, _, Backbone, globals, ingredientCreateTemplate){

		
    var IngredientView = Backbone.View.extend({

	tagName: 'div',
	
	events: {
	    'click .deleteIngredient': 'close'
	},
	
	initialize: function(){
	    this.render();
	},
	render: function() {
	    var template = _.template(ingredientCreateTemplate, {});
	    this.$el.html(template);
	    $('#ingredients').append(this.$el);
	},
		
	close: function(event) {
	    event.preventDefault();
	    this.unbind();
	    this.remove();
	}
	
    });
    
    return IngredientView;
	
});


