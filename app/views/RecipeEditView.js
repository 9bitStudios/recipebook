define(['jquery',
		'underscore', 
		'backbone', 
		'globals',
		'views/NotificationView',		
		'models/RecipeModel',
		'text!templates/recipe-edit.html'
		], function($, _, Backbone, globals, NotificationView, RecipeModel, recipeEditTemplate){

		
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
		
			var template = _.template(recipeEditTemplate, { model: this.model });
			this.$el.html(template);
			$('#page').empty().append(this.$el);			

		},	
		
		saveRecipe: function(event) {
			
			event.preventDefault();
			
			var self = this;
			var recipeName = $('#recipe-name').val();
			
			
			if(recipeName === this.model.get('name')) {
				message = 'Recipe name is unchanged';
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


