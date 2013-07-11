app.controller('DirectionDetailsController', function ($scope, directionService, applicationSync, Notifications) {

    init();
    function init(){
	$scope.directions = [];
    }       
    
    $scope.$on('recipeloaded', function() {
	
	var id = applicationSync.message;
	$scope.directions = directionService.getDirections(id).then(function(data){ 
	    $scope.directions = data;
	}, function(error){

	    Notifications.error('Error fetching directions data');
	    
	});
	
    });      
          
    
});

