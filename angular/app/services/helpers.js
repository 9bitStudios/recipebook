app.factory('Notifications', function() {
    
    var target = '#message';
    
    return {
	success: function(message){
	    jQuery(target).html('<div class="accepted notification">'+message+'</div>');
	    this.closeNotification();
	},
	error: function(message){
	    jQuery(target).html('<div class="cancel notification">'+message+'</div>');
	    this.closeNotification();
	},
	warning: function(message){
	    jQuery(target).html('<div class="warning notification">'+message+'</div>');
	    this.closeNotification();
	},
	information:function(message){
	    jQuery(target).html('<div class="information notification">'+message+'</div>');
	    this.closeNotification();
	},
	closeNotification: function(){
	    
	    setTimeout(function(){
		$('.notification').fadeOut(function(){
		    jQuery(this).remove();
		});
	    }, 3000);  
	}	
	
    };
});


app.factory('applicationSync', function($rootScope) {
  
    var sharedService = {};
    
    sharedService.key = '';
    sharedService.message = '';

    // pass in event name (key) and message value to send to listeners (msg)
    sharedService.prepForBroadcast = function(key, msg) {
	this.key = key;
        this.message = msg;
        this.broadcastItem();
    };

    // broadcast custom event
    sharedService.broadcastItem = function() {
        $rootScope.$broadcast(sharedService.key);
    };

    return sharedService;
  
});
