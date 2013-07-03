<?php

/**************************************************
RECIPES
***************************************************/


// GET route
$app->get('/recipes', function () use ($app) {
    
    $db = new Recipes();
    $items = $db->get_all_recipes();
    $results = array();

    if($items) {
	// get all results
	foreach($items as $row) {

	    $itemArray = array(
		'id' => $row['id'],
		'name' => $row['name'],
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
$app->get('/user/recipes/:id', function ($id) use ($app) {
    
    // GET with parameter

    $db = new Recipes();
    $items = $db->get_user_recipes($id);
    $results = array();

    if($items) {
	foreach($items as $row) {

	    $itemArray = array(
		'id' => $row['id'],
		'name' => $row['name'],
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

    $db = new Recipes();
    $items = $db->get_recipe($id);
    $results = array();

    if($items) {

	$results = array(
	    'id' => $items['id'],
	    'name' => $items['name']
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
    $db = new Recipes();
    $item = $db->add_recipe($name);	

    if($item) { // if successful, just return the JSON sent for use on the client-side
	
	$results = array(
	    'id' => $item,
	    'name' => $name
	);	
	
	$app->response()->header('Content-Type', 'application/json');
	echo json_encode($results);
    }
	
});

// POST route
$app->post('/recipes/:id', function ($id) use ($app) {

    $request = (array) json_decode($app->request()->getBody());

    $name = $request['name'];
    $db = new Recipes();
    $item = $db->add_user_recipe($id, $name);	

    if($item) { // if successful, just return the JSON sent for use on the client-side
	
	$results = array(
	    'id' => $item,
	    'name' => $name
	);	
	
	$app->response()->header('Content-Type', 'application/json');
	echo json_encode($results);
    }
	
});

// PUT route
$app->put('/recipes/:id', function ($id) use ($app) {

    $request = (array) json_decode($app->request()->getBody());
    $name = $request['name'];
    $db = new Recipes();
    $items = $db->update_recipe($id, $name);	

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
    $db = new Recipes();
    $items = $db->delete_recipe($id);	
    
    
    if($items) { 
	$db = new Ingredients();
	$items = $db->delete_ingredient_by_value($id);
	
	$db = new Directions();
	$items = $db->delete_direction_by_value($id);
	
	// if successful, just return the deleted item if it's needed on the client side
	$app->response()->header('Content-Type', 'application/json');	
	echo json_encode($request);
	
    }
    else {
	$app->response()->status(500);
    }
	
});
