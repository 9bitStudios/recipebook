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
		
	function __construct($host, $database, $username, $password) {
	
		$this->username = $username;
		$this->password = $password;
		$this->connectionString = 'mysql:host='.$host.';dbname='.$database;
	
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
	
	function get_all_items($table) {
	
		try {
			$conn = new PDO($this->connectionString, $this->username, $this->password, $this->connectionAttributes);
			$statement = $conn->prepare('SELECT * FROM '.$table);
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
	
	function get_items($table, $id) {
	
		try {
			$conn = new PDO($this->connectionString, $this->username, $this->password, $this->connectionAttributes);
			$statement = $conn->prepare('SELECT * FROM '.$table.' WHERE id = :id');
			$statement->execute(array('id' => $id));
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
	
	function insert_items($table, $value) {
	
		try {
			$conn = new PDO($this->connectionString, $this->username, $this->password, $this->connectionAttributes);
			$statement = $conn->prepare('INSERT INTO '.$table.' (recipe_name) VALUES(:name)');
			$statement->execute(array(
				':name' => $value
			));		
		
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
	
	function update_items($table, $value, $id) {
	
		try {
			$conn = new PDO($this->connectionString, $this->username, $this->password, $this->connectionAttributes);
			$statement = $conn->prepare('UPDATE '.$table.' SET recipe_name = :name WHERE id = :id');
			$statement->execute(array(
				':id' => $id,
				':name' => $value
			));	
		
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

	function delete_items($table, $id) {
	
		try {
			$conn = new PDO($this->connectionString, $this->username, $this->password, $this->connectionAttributes);
			$statement = $conn->prepare('DELETE FROM '.$table.' WHERE id = :id');
			$statement->execute(array(
				':id' => $id
			));	
		
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