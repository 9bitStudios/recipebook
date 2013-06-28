<?php
 
/**
 * Class: Database
 *
 * Abstracts database processes out of routes. Hard dependency on PDO 
 *
 */ 

define('RECIPE_BOOK_DB_DATABASE', 'recipebook');
define('RECIPE_BOOK_DB_HOST', 'localhost');
define('RECIPE_BOOK_DB_USER', 'root');
define('RECIPE_BOOK_DB_PASSWORD', '');

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
    
    function get_user($name, $password){
	$sql = 'SELECT * FROM users WHERE username = :name AND password = :password';
	$where = array(
	    'name' => $name,
	    'password' => $password
	);
	return $this->get_items($sql, $where);
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
	$sql = 'INSERT INTO recipes (recipe_name) VALUES(:name)';
	$params = array(':name' => $value);
	return $this->insert_items($sql, $params);
    } 
    
    function update_recipe($id, $value){
	$sql = 'UPDATE recipes SET recipe_name = :name WHERE id = :id';
	$params = array(':id' => $id, ':name' => $value);
	return $this->update_items($sql, $params);
    }    
    
    function delete_recipe($id){
	$sql = 'DELETE FROM recipes WHERE id = :id';
	$params = array(':id' => $id);
	return $this->delete_items($sql, $params);
    }     
    
}