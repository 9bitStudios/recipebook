<?php

/**************************************************
DIRECTIONS
***************************************************/

// GET route
$app->get('/directions/:id', function ($id) use ($app) {
    
    // GET with parameter

    $db = new Directions();
    $items = $db->get_recipe_directions($id);
    $results = array();

    if($items) {

	// get all results
	foreach($items as $row) {

	    $itemArray = array(
		'id' => $row['id'],
		'recipeId' => $row['recipe_id'],
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

// POST route
$app->post('/directions', function () use ($app) {

    $request = (array) json_decode($app->request()->getBody());

    $recipe_id = $request['recipeId'];
    $name = $request['name'];
    $db = new Directions();
    $item = $db->add_direction($recipe_id,$name);	

    if($item) { // if successful, just return the JSON sent for use on the client-side
	
	$results = array(
	    'id' => $item,
	    'recipeId' => $recipe_id,
	    'name' => $name
	);	
	
	$app->response()->header('Content-Type', 'application/json');
	echo json_encode($results);
    }
	
});

// PUT route
$app->put('/directions/:id', function ($id) use ($app) {

    $request = (array) json_decode($app->request()->getBody());
    $name = $request['name'];
    $db = new Directions();
    $items = $db->update_direction($id, $name);	

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
$app->delete('/directions/:id', function ($id) use ($app) {
    
    $request = (array) json_decode($app->request()->getBody());
    $db = new Directions();
    $items = $db->delete_direction($id);	
    
    if($items) { 
	// if successful, just return the deleted item if it's needed on the client side
	$app->response()->header('Content-Type', 'application/json');	
	echo json_encode($request);
	
    }
    else {
	$app->response()->status(500);
    }
	
});