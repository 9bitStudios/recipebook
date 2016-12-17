define([
	'config',
	'jquery',
	'underscore', 
	'backbone', 
	'views/NotificationView',
	'models/RecipeModel',
	'models/IngredientModel',
	'models/DirectionModel',
	'collections/IngredientCollection',
	'collections/DirectionCollection',
	'views/IngredientView',
	'views/DirectionView',
	'text!templates/recipe-edit.html'
], function(config, $, _, Backbone, NotificationView, RecipeModel, IngredientModel, DirectionModel, IngredientCollection, DirectionCollection, IngredientView, DirectionView, recipeEditTemplate){

	var RecipeEditView = Backbone.View.extend({
		tagName: 'div',

		className: 'recipeEdit',

		events: {
			'click #submit': 'saveMainItem',
			'click #addIngredient': 'addIngredient',
			'click #addDirection': 'addDirection',
			'ingredient-remove .ingredientContainer': 'removeIngredient',
			'direction-remove .directionContainer': 'removeDirection'
		},

		initialize: function(options){

			var self = this;
			this.ingredientCollection = new IngredientCollection();
			this.directionCollection = new DirectionCollection();
			this.ingredientCollectionRemoved = new IngredientCollection();
			this.directionCollectionRemoved = new DirectionCollection();	    

			if(options.idParam) {
				this.model = new RecipeModel({ id: options.idParam });
				this.model.fetch({
					wait: true,
					success: function(model, response, options) { 
						// we've got model data, now we can get relational sub-items (called in render function)
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
			ingredientCollection.url = config.apiURL + "/ingredients/" + id;
			ingredientCollection.fetch({
				wait: true,
				reset: true,
				success: function(collection, response, options) {				
					_.each(collection.models, function(ingredient){
						self.ingredientCollection = collection;
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
			directionCollection.url = config.apiURL + "/directions/" + id;
			directionCollection.fetch({
				wait: true,
				reset: true,
				success: function(collection, response, options) {				
					_.each(collection.models, function(direction){
						self.directionCollection = collection;
						self.subviews.push(new DirectionView({ model: direction }));
					});	
				},

				error: function(model, xhr, options) {
					var error = new NotificationView({ type:'error', text: 'Error getting directions' });
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
			this.ingredientCollection.add(ingredient);
			this.subviews.push(new IngredientView({ model: ingredient })); // add to subviews list so that things can be unbound later
		},

		addDirection: function(event) {
			event.preventDefault();
			var direction = new DirectionModel({ recipeId: this.model.get('id') });
			this.directionCollection.add(direction);
			this.subviews.push(new DirectionView({ model: direction })); // add to subviews list so that things can be unbound later
		},		

		removeIngredient: function(event, arg){
			//console.log($(e.currentTarget).find('.ingredient').val());

			this.ingredientCollection.remove(arg);
			this.ingredientCollectionRemoved.add(arg);

		},

		removeDirection: function(event, arg){
			//console.log($(e.currentTarget).find('.direction').val());

			this.directionCollection.remove(arg);
			this.directionCollectionRemoved.add(arg);	    

		},

		saveMainItem: function(event) {
			event.preventDefault();
			var self = this;
			var recipeName = $('#recipe-name').val();

			this.model.save("name", recipeName, {
				wait: true,
				success: function(model, response, options) {
					var success = new NotificationView({ type: 'success', text: 'Recipe updated successfully' });	
					self.saveSubItems();
				},
				error: function (model, xhr, options) {
					var error = new NotificationView({ type: 'error', text: 'Error updating recipe' });		
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

			// loop through ingredients, destroying those marked for deletion
			_.each(this.ingredientCollectionRemoved.models, function(model){
				model.destroy(null,{
					wait: true,
					success: function(model, response, options) { },
					error: function (model, xhr, options) {
						ingredientsSaved = false;
					}
				});
			});		    

			// loop through directions, destroying those marked for deletion
			_.each(this.directionCollectionRemoved.models, function(model){
				model.destroy(null,{
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

			// remove and unbind everything...
			this.clearout(); 
			Backbone.history.navigate('recipes', true);
		}

	});

	return RecipeEditView;

});