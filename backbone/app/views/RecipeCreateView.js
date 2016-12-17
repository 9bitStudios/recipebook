define([
	'config',
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
	'text!templates/recipe-create.html'
], function(config, $, _, Backbone, globals, NotificationView, RecipeModel, IngredientModel, DirectionModel, IngredientCollection, DirectionCollection, IngredientView, DirectionView, recipeCreateTemplate){

		
	var RecipeCreateView = Backbone.View.extend({
		tagName: 'div',
		className: 'recipeCreate',

		events: {
			'click #submit': 'saveMainItem',
			'click #addIngredient': 'addIngredient',
			'click #addDirection': 'addDirection'
		},

		initialize: function(){
			this.ingredientCollection = new IngredientCollection();
			this.directionCollection = new DirectionCollection();
			this.render();
		},

		render: function(){
			var self = this;
			var template = _.template(recipeCreateTemplate, {model: this.model});
			this.$el.html(template);
			$('#page').empty().append(this.$el);
		},		

		// add ingredient model to the collection on this view
		// add to subviews list (from prototype) so that things can be unbound later
		addIngredient: function() {
			var ingredient = new IngredientModel();
			this.directionCollection.add(ingredient);
			this.subviews.push(new IngredientView({ model: ingredient })); 
		},

		// add ingredient model to the collection on this view
		// add to subviews list (from prototype) so that things can be unbound later
		addDirection: function() {
			var direction = new DirectionModel();
			this.directionCollection.add(direction);
			this.subviews.push(new DirectionView({ model: direction })); 
		},

		saveMainItem: function(event) {

			event.preventDefault();
			$('#submit').attr('disabled', 'disabled');
			var self = this;
			var recipeName = $('#recipe-name').val();
			var recipe = new RecipeModel({ userId: globals.currentUser.get('id'), name: recipeName });
			recipe.url = config.apiURL + "/recipes/" + globals.currentUser.get('id');
			recipe.save(null, {
				wait: true,
				success: function(model, response, options) {
					// set new foreign key on subviews obtained from newly created items
					self.ingredientCollection.invoke('set', {recipeId: recipe.get('id')});
					self.directionCollection.invoke('set', {recipeId: recipe.get('id')});

					var success = new NotificationView({ type: 'success', text: 'Recipe created' });	

					// save subview items
					self.saveSubItems(recipe.get('id'));
				},
				error: function (model, xhr, options) {
					var error = new NotificationView({ type: 'error', text: 'Error creating recipe' });		
					Backbone.history.navigate('recipes', true);		    
				}
			});

		},

		saveSubItems: function(){

			// if we get an error on any save event, we're going to want to trigger a notification
			var ingredientsSaved = true;
			var directionsSaved = true;

			// loop through ingredients, saving each
			_.each(this.ingredientCollection.models, function(model){
				model.save(null,{
					wait: true,
					success: function(model, response, options) { },
					error: function (model, xhr, options) {
						ingredientsSaved = false;
					}
				});
			});	    

			// loop through directions, saving each
			_.each(this.directionCollection.models, function(model){
				model.save(null,{
					wait: true,
					success: function(model, response, options) { },
					error: function (model, xhr, options) {
						directionsSaved = false;
					}
				});
			});	    

			// any errors?...
			if(!ingredientsSaved) {
				var error = new NotificationView({ type: 'error', text: 'Error saving one or more ingredients' });	    
			}
			if(!directionsSaved) {
				var error = new NotificationView({ type: 'error', text: 'Error saving one or more directions' });
			}
			// remove this view and unbind everything...
			this.clearout(); 

			// return to recipes view
			Backbone.history.navigate('recipes', true);	    

		}
	});

	return RecipeCreateView;

});