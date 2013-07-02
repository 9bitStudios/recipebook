<?php
 
/**
 * Class: Database
 *
 * Abstracts database processes out of routes. Hard dependency on PDO 
 *
 */ 

class Database {

    private $username; 
    private $password; 	
    private $connectionString;
    private $connectionAttributes;
	
    /**
     * __construct
     */	

    function __construct() {
	$this->username = RECIPE_BOOK_DB_USER;
	$this->password = RECIPE_BOOK_DB_PASSWORD;
	$this->connectionString = 'mysql:host='.RECIPE_BOOK_DB_HOST.';dbname='.RECIPE_BOOK_DB_DATABASE;

	$this->connectionAttributes = array(
	    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION		
	);
    }
	
    /**
     * Print Error
     */	

    function print_error_message($message) {
	echo 'There was an error connecting to the database: ' . $message;
    }
	
    /**
     * Get All Items
     */	

    function get_all_items($sql) {

	try {
	    $conn = new PDO($this->connectionString, $this->username, $this->password, $this->connectionAttributes);
	    $statement = $conn->prepare($sql);
	    $statement->execute();
	    $results = $statement->fetchAll();			

	    if(count($results))
		return $results;
	    else
		return false;
	}
	catch(PDOException $e) {
	    $this->print_error_message($e->getMessage());
	    return false;
	}		

    }
	
    /**
     * Get Items (from id)
     */	

    function get_items($sql, $whereValues) {

	try {
	    $conn = new PDO($this->connectionString, $this->username, $this->password, $this->connectionAttributes);
	    $statement = $conn->prepare($sql);
	    $statement->execute($whereValues);
	    $results = $statement->fetch();			

	    if(count($results))
		return $results;
	    else
		return false;
	}
	catch(PDOException $e) {

	    $this->print_error_message($e->getMessage());
	    return false;
	}		

    }

    /**
     * Insert Items
     */	

    function insert_items($sql, $params) {

	try {
	    $conn = new PDO($this->connectionString, $this->username, $this->password, $this->connectionAttributes);
	    $statement = $conn->prepare($sql);
	    $statement->execute($params);		

	    if($statement->rowCount() === 1)
		return $conn->lastInsertId();
	    else
		return false;
	}
	catch(PDOException $e) {
	    $this->print_error_message($e->getMessage());
	    return false;
	}	
    }
	
    /**
     * Update Items
     */	

    function update_items($sql, $params) {

	try {
	    $conn = new PDO($this->connectionString, $this->username, $this->password, $this->connectionAttributes);
	    $statement = $conn->prepare($sql);
	    $statement->execute($params);	

	    if($statement->rowCount() === 1)
		return true;
	    else
		return false;
	}
	catch(PDOException $e) {
	    $this->print_error_message($e->getMessage());
	    return false;
	}	
    }

    /**
     * Delete Items
     */

    function delete_items($sql, $params) {

	try {
	    $conn = new PDO($this->connectionString, $this->username, $this->password, $this->connectionAttributes);
	    $statement = $conn->prepare($sql);
	    $statement->execute($params);	

	    if($statement->rowCount() >= 1)
		return true;
	    else
		return false;
	}
	catch(PDOException $e) {
	    $this->print_error_message($e->getMessage());
	    return false;
	}	
    }	

}


class Users extends Database {
    
    function __construct(){
	parent::__construct();
    }
    
    function get_user($username, $password){
	$sql = 'SELECT * FROM users WHERE username = :username AND password = :password';
	$where = array(
	    'username' => $username,
	    'password' => $password
	);
	return $this->get_items($sql, $where);
    }
    
    function add_user($username, $password){
	$sql = 'INSERT INTO users (username, password) VALUES(:username, :password)';
	
	$params = array(
	    ':username' => $username,
	    ':password' => $password,
	);
	return $this->insert_items($sql, $params);
    }     
}

class Recipes extends Database {
    
    function __construct(){
	parent::__construct();
    }
    
    function get_all_recipes(){
	
	$sql = 'SELECT * FROM recipes';
	return $this->get_all_items($sql);
    }
    
    function get_recipe($id){
	
	$sql = 'SELECT * FROM recipes WHERE id = :id';
	$where = array('id' => $id);
	return $this->get_items($sql, $where);
    } 
    
    function add_recipe($value){
	$sql = 'INSERT INTO recipes (name) VALUES(:name)';
	$params = array(':name' => $value);
	return $this->insert_items($sql, $params);
    } 
    
    function update_recipe($id, $value){
	$sql = 'UPDATE recipes SET name = :name WHERE id = :id';
	$params = array(':id' => $id, ':name' => $value);
	return $this->update_items($sql, $params);
    }    
    
    function delete_recipe($id){
	$sql = 'DELETE FROM recipes WHERE id = :id';
	$params = array(':id' => $id);
	return $this->delete_items($sql, $params);
    }     
    
}

class Ingredients extends Database {
    
    function __construct(){
	parent::__construct();
    }
    
    function get_all_ingredients(){
	
	$sql = 'SELECT * FROM ingredients';
	return $this->get_all_items($sql);
    }
    
    function get_ingredients($id){
	
	$sql = 'SELECT * FROM ingredients WHERE id = :id';
	$where = array('id' => $id);
	return $this->get_items($sql, $where);
    } 
    
    function get_recipe_ingredients($id){
	
	$sql = 'SELECT * FROM ingredients WHERE recipe_id = :recipe_id';
	$where = array('recipe_id' => $id);
	return $this->get_items($sql, $where);
    }    
    
    function add_ingredient($recipe_id, $value){
	$sql = 'INSERT INTO ingredients (recipe_id, name) VALUES(:recipe_id, :name)';
	$params = array(
	    ':recipe_id' => $recipe_id,
	    ':name' => $value
	);
	return $this->insert_items($sql, $params);
    } 
    
    function update_ingredient($id, $value){
	$sql = 'UPDATE ingredients SET name = :name WHERE id = :id';
	$params = array(':id' => $id, ':name' => $value);
	return $this->update_items($sql, $params);
    }       
    
    function delete_ingredient($id){
	$sql = 'DELETE FROM ingredients WHERE id = :id';
	$params = array(':id' => $id);
	return $this->delete_items($sql, $params);
    } 
    
    function delete_ingredient_by_value($id){
	$sql = 'DELETE FROM ingredients WHERE recipe_id = :id';
	$params = array(':id' => $id);
	return $this->delete_items($sql, $params);
    }     
    
}


class Directions extends Database {
    
    function __construct(){
	parent::__construct();
    }
    
    function get_all_directions(){
	
	$sql = 'SELECT * FROM directions';
	return $this->get_all_items($sql);
    }
    
    function get_directions($id){
	
	$sql = 'SELECT * FROM directions WHERE id = :id';
	$where = array('id' => $id);
	return $this->get_items($sql, $where);
    } 
    
    function get_recipe_directions($id){
	
	$sql = 'SELECT * FROM directions WHERE recipe_id = :recipe_id';
	$where = array('recipe_id' => $id);
	return $this->get_items($sql, $where);
    }    
    
    function add_direction($recipe_id, $value){
	$sql = 'INSERT INTO directions (recipe_id, name) VALUES(:recipe_id, :name)';
	$params = array(
	    ':recipe_id' => $recipe_id,
	    ':name' => $value
	);
	return $this->insert_items($sql, $params);
    }  
    
    function update_direction($id, $value){
	$sql = 'UPDATE directions SET name = :name WHERE id = :id';
	$params = array(':id' => $id, ':name' => $value);
	return $this->update_items($sql, $params);
    }    
    
    function delete_direction($id){
	$sql = 'DELETE FROM directions WHERE id = :id';
	$params = array(':id' => $id);
	return $this->delete_items($sql, $params);
    }
    
    function delete_direction_by_value($id){
	$sql = 'DELETE FROM directions WHERE recipe_id = :id';
	$params = array(':id' => $id);
	return $this->delete_items($sql, $params);
    }    
    
}