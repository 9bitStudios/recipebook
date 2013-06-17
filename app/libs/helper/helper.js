define(['underscore', 'backbone'], function(_, Backbone){
	
    return { 
	
		htmlEncode: function(value) {
			return $('<div/>').text(value).html();
		}
	
    };
	
});

