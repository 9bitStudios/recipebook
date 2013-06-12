var rb = rb || {};
		
	rb.RecipesView = Backbone.View.extend({

		el: '#page',
		
		initialize: function(){
			this.render();
		},
		
		render: function(){
			
			var self = this;
			
			var recipes = new rb.RecipeCollection();
			
			recipes.fetch({
				wait: true,
				reset: true,
				success: function(collection, response, options) {
					var template = _.template($('#all-recipes').html(), {recipes: collection.models});
					self.$el.html(template);					
				},
				
				error: function(model, xhr, options) {
					
				}
		
			});	

		}

	});
	

