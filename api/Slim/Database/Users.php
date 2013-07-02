<?php

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
	return $this->get_item($sql, $where);
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