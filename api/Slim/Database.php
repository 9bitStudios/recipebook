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
	
	function __construct($host, $database, $username, $password) {
	
		$this->username = $username;
		$this->password = $password;
		$this->connectionString = 'mysql:host='.$host.';dbname='.$database;
	
		$this->connectionAttributes = array(
			PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION		
		);
	}
	
	function print_error($message) {
	
		echo 'There was an error connecting to the database: ' . $message;
	}
	
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

}