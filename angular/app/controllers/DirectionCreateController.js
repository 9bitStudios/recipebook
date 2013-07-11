app.controller('DirectionCreateController', function ($scope, directionService, applicationSync, Notifications) {

    init();
    function init(){
	$scope.directions = [];
    }
    
    $scope.addDirectionField = function(name) {
	 $scope.directions.push({name:name});
    };
    
    $scope.removeDirectionField = function(index) {
	//var deleted = $scope.directions[index];
	$scope.directions.splice(index, 1);
    };    
    
    $scope.$on('recipecreated', function() {
	var id = applicationSync.message;
	var errors = false;
	
	for(var i in $scope.directions) {
	    
	    directionService.addDirection(id, $scope.directions[i].name).then(function(data){
	    },
	    function(error){
		errors = true;
	    });	
	    
	    // if there are errors throw up a notification that not everything may have been saved
	    if (errors) {
		 Notifications.error('Error creating one or more directions');
	    }
	    
	}
    });       
         
    
});

