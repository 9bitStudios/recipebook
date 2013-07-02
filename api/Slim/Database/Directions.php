<?php

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