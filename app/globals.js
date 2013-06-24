define(['jquery', 
		'underscore', 
		'backbone',
		'models/UserModel',
		'views/UserInfoView'], function($, _, Backbone, UserModel, UserInfoView){
	
	var currentUser = new UserModel();
	var userInfo = new UserInfoView({ model: currentUser });
	
    return { 
		userInfo: userInfo,
		currentUser: currentUser,
    };
	
});