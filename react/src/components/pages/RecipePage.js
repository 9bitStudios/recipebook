import {react} from 'react';
import $ from 'jquery';
import {Link, hashHistory} from 'react-router';
import Authentication from 'utilities/Authentication';
import {Recipe} from 'components/recipes/Recipe';
import {Direction} from 'components/directions/Direction';
import {Ingredient} from 'components/ingredients/Ingredient';

export default class RecipePage extends React.Component {

    constructor(){
        super(...arguments);
        this.mode = 'view'
        this.state = {
            recipe: {
                id: this.props.params.id,
                name: '',
            }, 
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
        this.getRecipe(this.state.recipe.id).then(recipe => {
            this.setState({ 
                recipe: {
                    id: recipe.id,
                    name: recipe.name
                } 
            });
        });

        this.getIngredients(this.state.recipe.id).then(ingredients => {
            this.setState({ 
                ingredients: ingredients 
            });            
        });

        this.getDirections(this.state.recipe.id).then(directions => {
            this.setState({ 
                directions: directions 
            });            
        });
    }

    render() {

        if(this.props.route.path === 'edit/:id') {
            this.mode = 'edit';
        }

        let ingredients = this.state.ingredients.map((ingredient, index) => {
            return(<Ingredient key={ingredient.id} name={ingredient.name} />)
        });        

        let directions = this.state.directions.map((direction, index) => {
            return(<Direction key={direction.id} name={direction.name} />)
        });

        return (

            <div>
                <h4><Recipe name={this.state.recipe.name} /></h4>
                {ingredients}
                {directions}
            </div>
        );
    }
}