<?php

/**************************************************
INGREDIENTS
***************************************************/

// GET route
$app->get('/ingredients/:id', function ($id) use ($app) {
    
    // GET with parameter

    $db = new Ingredients();
    $items = $db->get_recipe_ingredients($id);
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
$app->post('/ingredients', function () use ($app) {

    $request = (array) json_decode($app->request()->getBody());

    $recipe_id = $request['recipeId'];
    $name = $request['name'];
    $db = new Ingredients();
    $item = $db->add_ingredient($recipe_id,$name);	

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
$app->put('/ingredients/:id', function ($id) use ($app) {

    $request = (array) json_decode($app->request()->getBody());
    $name = $request['name'];
    $db = new Ingredients();
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
$app->delete('/ingredients/:id', function ($id) use ($app) {
    
    $request = (array) json_decode($app->request()->getBody());
    $db = new Ingredients();
    $items = $db->delete_ingredient($id);	
    
    if($items) { 
	
	// if successful, just return the deleted item if it's needed on the client side
	$app->response()->header('Content-Type', 'application/json');	
	echo json_encode($request);
	
    }
    else {
	$app->response()->status(500);
    }
	
});