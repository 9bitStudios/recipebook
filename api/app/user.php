<?php

// HOME route
$app->get('/', function () use ($app) {
    
	
});

// Create User route
$app->post('/user', function () use ($app) {
    
    $request = (array) json_decode($app->request()->getBody());
    $username = $request['username'];
    $password = $request['password'];
    $password = crypt($password, RECIPE_BOOK_DB_SALT);
    
    $db = new Users(); 
    
     // if username does not exist return attempt to add otherwise return 403...
    if(!$db->user_exists($username)) {
	$user = $db->add_user($username, $password);
	$userArray = array(
	    'username' => $username
	); 	
	echo json_encode($userArray);
    }
    else {
	$app->response()->status(403);
    }
	
});

// Login route
$app->post('/login', function () use ($app) {
    	
    $env = $app->environment();
    
    // environment variables set in middleware...
    $userArray = array(
	'id' => $env['nbs.id'],
	'username' => $env['nbs.username']
    ); 
    
    if($userArray['username']) {
	$app->response()->header('Content-Type', 'application/json');
	echo json_encode($userArray);
    }
    else
	$app->response()->status(401);
	
});

// Logout route
$app->post('/logout', function () use ($app) {
    
    $res = $app->response();
    $res->status(401);
	
});