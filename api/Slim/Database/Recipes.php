<?php

class Recipes extends Database {
    
    function __construct(){
	parent::__construct();
    }
    
    function get_all_recipes(){
	
	$sql = 'SELECT * FROM recipes';
	return $this->get_all_items($sql);
    }
    
    function get_user_recipes($uid){
	
	$sql = 'SELECT * FROM recipes WHERE user_id = :uid';
	$where = array('uid' => $uid);
	return $this->get_items($sql, $where);
    }     
    
    function get_recipe($id){
	
	$sql = 'SELECT * FROM recipes WHERE id = :id';
	$where = array('id' => $id);
	return $this->get_item($sql, $where);
    } 
    
    function add_recipe($value){
	$sql = 'INSERT INTO recipes (name) VALUES(:name)';
	$params = array(':name' => $value);
	return $this->insert_items($sql, $params);
    } 
    
    function add_user_recipe($uid, $name){
	$sql = 'INSERT INTO recipes (user_id, name) VALUES(:userId, :name)';
	$params = array(
	    ':userId' => $uid,
	    ':name' => $name
	);
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