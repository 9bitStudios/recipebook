define(['jquery',
		'underscore', 
		'backbone', 
		'views/NotificationView',		
		'models/RecipeModel',
		'collections/RecipeCollection', 
		'text!templates/recipe-edit.html'
		], function($, _, Backbone, NotificationView, RecipeModel, RecipeCollection, recipeEditTemplate){

		
	var RecipeEditView = Backbone.View.extend({
		
		tagName: 'div',
		
		className: 'recipeEdit',
		
		events: {
			'click #submit': 'saveRecipe',
			'click #addIngredient': 'addIngredient',
		},
		
		initialize: function(options){
		
			var self = this;

			if(options.idParam) {

				this.model = new RecipeModel({ id: options.idParam });
				this.model.fetch({
					wait: true,
					success: function(model, response, options) {  
						
						self.render(self.model.get('id'));
					
					},
					error: function (model, xhr, options) { 
						var success = new NotificationView({ 
							type: 'error', 
							text: 'Error fetching recipe data'
						});
						
						Backbone.history.navigate('recipes',true);
						
					}
				});
				
			}
			
		},
		
		render: function(id){
		
			console.log(this.model.get('name'));
			var template = _.template(recipeEditTemplate, { model: this.model });
			this.$el.html(template);
			$('#page').empty().append(this.$el);			

		},	
		
		saveRecipe: function(event) {
			
			event.preventDefault();
			
			var self = this;
			var recipeName = $('#recipe-name').val();
			
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
					
					if(recipeName === self.model.get('name')) {
						message = 'Recipe name is unchanged';
					}
				
					var success = new NotificationView({ 
						type: 'error', 
						text: message
					});					
				
				}
			
			});
		
		}
		

	});
	
	return RecipeEditView;
	
});


