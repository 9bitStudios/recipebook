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
    
    // add user to db...
    $db = new Users();
    $user = $db->add_user($username, $password);
    
    echo json_encode($request);
	
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
	$app->respose->status(401);
	
});

// Logout route
$app->post('/logout', function () use ($app) {
    
    $res = $app->response();
    $res->status(401);
	
});