<?php

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
