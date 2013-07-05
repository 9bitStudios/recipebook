define(['config',
	'jquery',
	'underscore', 
	'backbone', 
	'globals',
	'views/NotificationView',
	'models/RecipeModel',
	'models/IngredientModel',
	'models/DirectionModel',
	'collections/IngredientCollection',
	'collections/DirectionCollection',
	'views/IngredientView',
	'views/DirectionView',
	'text!templates/recipe-details.html'
	], function(config, $, _, Backbone, globals, NotificationView, RecipeModel, IngredientModel, DirectionModel, IngredientCollection, DirectionCollection, IngredientView, DirectionView, recipeEditTemplate){

		
    var RecipeDetailsView = Backbone.View.extend({
	tagName: 'div',

	className: 'recipeEdit',
	
	events: {
	},

	initialize: function(options){

	    var self = this;
	    this.ingredientCollection = new IngredientCollection();
	    this.directionCollection = new DirectionCollection();	    
	    
	    if(options.idParam) {

		this.model = new RecipeModel({ id: options.idParam });
		this.model.fetch({
		    wait: true,
		    success: function(model, response, options) {  
			
			// we've got model data, now we can get relational sub-items
			self.render(self.model.get('id'));
		    },
		    error: function (model, xhr, options) { 
			var error = new NotificationView({ type: 'error', text: 'Error fetching recipe data' });
			self.clearout();
			Backbone.history.navigate('recipes',true);

		    }
		});
	    }

	},
	
	getRecipeIngredients: function(id) {
	    
	    var self = this;
	    var ingredientCollection = new IngredientCollection();
	    ingredientCollection.url = config.baseURL + "/api/ingredients/" + id;
	    ingredientCollection.fetch({
		wait: true,
		reset: true,
		success: function(collection, response, options) {				
		    _.each(collection.models, function(ingredient){
			self.ingredientCollection = collection;
			
			// passing in editable:false so view will render text in details view opposed to input field
			self.subviews.push(new IngredientView({ model: ingredient, editable:false }));
		    });		    
		},
		error: function(model, xhr, options) {
		    var error = new NotificationView({ type:'error', text: 'Error getting ingredients' });
		}

	    });	    	    
	    
	},
	
	getRecipeDirections: function(id) {
	    
	    var self = this;
	    var directionCollection = new DirectionCollection();
	    directionCollection.url = config.baseURL + "/api/directions/" + id;
	    directionCollection.fetch({
		wait: true,
		reset: true,
		success: function(collection, response, options) {				
		    _.each(collection.models, function(direction){
			self.directionCollection = collection;
			
			// passing in editable:false so view will render text in details view opposed to input field
			self.subviews.push(new DirectionView({ model: direction, editable:false }));
		    });	
		},

		error: function(model, xhr, options) {
		    var error = new NotificationView({ type:'error', text: 'Error getting ingredients' });
		}

	    });	    	    
	    
	},	

	render: function(id){
	    
	    var template = _.template(recipeEditTemplate, { 
		recipe: this.model, 
	    });
	    this.$el.html(template);
	    $('#page').empty().append(this.$el);			
	    this.getRecipeIngredients(id);
	    this.getRecipeDirections(id);
	}
		
    });

    return RecipeDetailsView;
	
});


