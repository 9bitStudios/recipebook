import {react} from 'react';
import $ from 'jquery';
import {Link, hashHistory} from 'react-router';
import Authentication from 'utilities/Authentication';
import {Direction} from 'components/directions/Direction';
import {Ingredient} from 'components/ingredients/Ingredient';

export default class RecipePage extends React.Component {

    constructor(){
        super(...arguments);
        this.state = {
            id: this.props.params.id,
            name: '',
            directions: [],
            ingredients: []     
        }
    }    

    getRecipe(id){

        let def = $.Deferred();
        
        $.ajax({
            type: "GET",
            url: `${Config.apiURL}/recipes/${id}`,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function (xhr) {
                xhr.setRequestHeader ("Authorization", `Basic ${Authentication.getUserInfo()['token']}`);
            },
            success:(data, textStatus, jqXHR) => {
                def.resolve(data)
            },
            error:(jqXHR, textStatus, errorThrown) => {
                def.reject(jqXHR);
            }
        });
        return def.promise();        
    }
    
    getDirections(id){

        let def = $.Deferred();
        
        $.ajax({
            type: "GET",
            url: `${Config.apiURL}/directions/${id}`,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function (xhr) {
                xhr.setRequestHeader ("Authorization", `Basic ${Authentication.getUserInfo()['token']}`);
            },
            success:(data, textStatus, jqXHR) => {
                def.resolve(data)
            },
            error:(jqXHR, textStatus, errorThrown) => {
                def.reject(jqXHR);
            }
        });
        return def.promise();        
    }  

    getIngredients(id){

        let def = $.Deferred();
        
        $.ajax({
            type: "GET",
            url: `${Config.apiURL}/ingredients/${id}`,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function (xhr) {
                xhr.setRequestHeader ("Authorization", `Basic ${Authentication.getUserInfo()['token']}`);
            },
            success:(data, textStatus, jqXHR) => {
                def.resolve(data)
            },
            error:(jqXHR, textStatus, errorThrown) => {
                def.reject(jqXHR);
            }
        });
        return def.promise();        
    }

    componentWillMount(){
        this.getRecipe(this.state.id).then(recipe => {
            this.setState({ 
                id: recipe.id,
                name: recipe.name                
            });

        });

        this.getIngredients(this.state.id).then(ingredients => {
            this.setState({ 
                ingredients: ingredients 
            });            
        });

        this.getDirections(this.state.id).then(directions => {
            this.setState({ 
                directions: directions 
            });            
        });
    }

    render() {


        let ingredients = this.state.ingredients.map((ingredient, index) => {
            return(<Ingredient key={ingredient.id} name={ingredient.name} mode="view" />)
        });        

        let directions = this.state.directions.map((direction, index) => {
            return(<Direction key={direction.id} name={direction.name} mode="view" />)
        });

        return (

            <div>
                <h4>{this.state.name}</h4>

                <h3>Ingredients</h3>
                <ul>{ingredients}</ul>
                
                <h3>Directions</h3>
                <ol>
                    {directions}
                </ol>
            </div>
        );
    }
}