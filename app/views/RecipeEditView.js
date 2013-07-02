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
	'text!templates/recipe-edit.html'
	], function(config, $, _, Backbone, globals, NotificationView, RecipeModel, IngredientModel, DirectionModel, IngredientCollection, DirectionCollection, IngredientView, DirectionView, recipeEditTemplate){

		
    var RecipeEditView = Backbone.View.extend({
	tagName: 'div',

	className: 'recipeEdit',
	
	events: {
	    'click #submit': 'saveRecipe',
	    'click #addIngredient': 'addIngredient',
	    'click #addDirection': 'addDirection'
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
			self.render(self.model.get('id'));
		    },
		    error: function (model, xhr, options) { 
			var error = new NotificationView({ 
			    type: 'error', 
			    text: 'Error fetching recipe data'
			});
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
			self.subviews.push(new IngredientView({ model: ingredient }));
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
			self.subviews.push(new DirectionView({ model: direction }));
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
	},
	
	addIngredient: function(event) {
	    event.preventDefault();
	    var ingredient = new IngredientModel({ recipeId: this.model.get('id') });
	    this.subviews.push(new IngredientView({ model: ingredient })); // add to subviews list so that things can be unbound later
	},

	addDirection: function(event) {
	    event.preventDefault();
	    var direction = new DirectionModel({ recipeId: this.model.get('id') });
	    this.subviews.push(new DirectionView({ model: direction })); // add to subviews list so that things can be unbound later
	},		

	saveRecipe: function(event) {
	    event.preventDefault();

	    var self = this;
	    var recipeName = $('#recipe-name').val();

	    if(recipeName === this.model.get('name')) {
		var message = 'Recipe name is unchanged';
		var error = new NotificationView({ 
		    type: 'error', 
		    text: message
		});				
	    }
	    else {
		this.model.save("name", recipeName, {

		    wait: true,
		    success: function(model, response, options) {

			var success = new NotificationView({ 
			    type: 'success', 
			    text: 'Recipe updated successfully'
			});	

			self.remove(); // remove and unbind everything...
			Backbone.history.navigate('recipes', true);

		    },
		    error: function (model, xhr, options) {

			var message = 'Error updating recipe';

			var error = new NotificationView({ 
			    type: 'error', 
			    text: message
			});					

		    }
		});
	    }
	}
    });

    return RecipeEditView;
	
});


