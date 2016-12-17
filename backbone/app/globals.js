define([
    'models/UserModel',
    'views/UserInfoView'
], function(UserModel, UserInfoView) {
	
    // global variables that need to be made available across the entire application 

    // create a single instance of a "current user" model and attach it to a UserInfoView
    // view listens for any events (like login or logout) on model and updates 

    var currentUser = new UserModel();
    var userInfo = new UserInfoView({ model: currentUser });

    return { 
        userInfo: userInfo,
        currentUser: currentUser
    };

});