<?php
/**
 * Step 1: Require the Slim Framework
 *
 * If you are not using Composer, you need to require the
 * Slim Framework and register its PSR-0 autoloader.
 *
 * If you are using Composer, you can skip this step.
 */
require 'Slim/Slim.php';
require 'Slim/Database.php';
require 'Slim/Middleware.php';
require 'Slim/Middleware/HttpBasicAuth.php';

\Slim\Slim::registerAutoloader();

/**
 * Step 2: Instantiate a Slim application
 *
 * This example instantiates a Slim application using
 * its default settings. However, you will usually configure
 * your Slim application now by passing an associative array
 * of setting names and values into the application constructor.
 */
$app = new \Slim\Slim();
$app->add(new \HttpBasicAuth());

/**
 * Step 3: Define the Slim application routes
 *
 * Here we define several Slim application routes that respond
 * to appropriate HTTP request methods. In this example, the second
 * argument for `Slim::get`, `Slim::post`, `Slim::put`, and `Slim::delete`
 * is an anonymous function.
 */

// HOME route
$app->get('/', function () use ($app) {
    
	
});

// Login route
$app->post('/login', function () use ($app) {
    
	$req = $app->request();
	$res = $app->response();
	
	$username = $req->headers('PHP_AUTH_USER');
	$password = $req->headers('PHP_AUTH_PW');	
	
	// Check user credentials against 
	$userArray = array(
		'user' => $username,
		'password' => $password,
	);
	
	if(isset($username) && isset($password) && $username != 'wrong' && $password != 'wrong') {
		$app->response()->header('Content-Type', 'application/json');
		echo json_encode($userArray);
	}
	else {
		$res->status(401);		
	}
	
});

// Logout route
$app->post('/logout', function () use ($app) {
    
	$res = $app->response();
	$res->status(401);
	
});

// GET route
$app->get('/recipes', function () use ($app) {
    
	$db = new Database('localhost', 'RecipeBook', 'root', '');
	$items = $db->get_all_items('recipes');
	
	$results = array();
	
	if($items) {
	
		// get all results
		foreach($items as $row) {
		
			$itemArray = array(
				'id' => $row['id'],
				'name' => $row['recipe_name'],
			);
			array_push($results, $itemArray);
		}
	
		$app->response()->header('Content-Type', 'application/json');
		echo json_encode($results);
	}
	else {
		$app->response()->status(500);
	}
	
	
});

// GET route
$app->get('/recipes/:id', function ($id) use ($app) {
    
	// GET with parameter
	
	$db = new Database('localhost', 'RecipeBook', 'root', '');
	$items = $db->get_items('recipes', $id);
	$results = array();
	
	if($items) {
	
		$results = array(
			'id' => $items['id'],
			'name' => $items['recipe_name']
		);
	
		$app->response()->header('Content-Type', 'application/json');
		echo json_encode($results);
	}
	else {
		$app->response()->status(500);
	}
	
	
});

// POST route
$app->post('/recipes', function () use ($app) {

	$request = (array) json_decode($app->request()->getBody());
	
	$name = $request['name'];
	$db = new Database('localhost', 'RecipeBook', 'root', '');
	$items = $db->insert_items('recipes', $name);	
	
	
	if($items) { // if successful, just return the JSON sent for use on the client-side
		$app->response()->header('Content-Type', 'application/json');
	}
	
	echo json_encode($request);
	
});

// PUT route
$app->put('/recipes/:id', function ($id) use ($app) {

	$request = (array) json_decode($app->request()->getBody());
	$name = $request['name'];
	$db = new Database('localhost', 'RecipeBook', 'root', '');
	$items = $db->update_items('recipes', $name, $id);	
		
	if($items) { // if successful, return the new object with the values
	
		$results = array(
			'id' => $id,
			'name' => $name
		);
	
		$app->response()->header('Content-Type', 'application/json');
		echo json_encode($results);
		
	}
	else {
		$app->response()->status(500);
	}
	
});

// DELETE route
$app->delete('/recipes/:id', function ($id) use ($app) {
	
	$request = (array) json_decode($app->request()->getBody());
	$db = new Database('localhost', 'RecipeBook', 'root', '');
	$items = $db->delete_items('recipes', $id);	
	
	if($items) { // if successful, just return the deleted item if it's needed on the client side
		$app->response()->header('Content-Type', 'application/json');
	}
	
	echo json_encode($request);	
	
});

/**
 * Step 4: Run the Slim application
 *
 * This method should be called last. This executes the Slim application
 * and returns the HTTP response to the HTTP client.
 */
$app->run();
