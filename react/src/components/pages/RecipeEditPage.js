import {react} from 'react';
import $ from 'jquery';
import {Link, hashHistory} from 'react-router';
import Authentication from 'utilities/Authentication';
import {Direction} from 'components/directions/Direction';
import {Ingredient} from 'components/ingredients/Ingredient';

export default class RecipeEditPage extends React.Component {

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
    
    nameChanged(event){
        this.setState({
            name: event.target.value
        });
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

    addDirection(){
        this.state.directions.push({
            id: this.state.directions[this.state.directions.length - 1].id + 1,
            name: 'New Direction...',
            isNew: true
        });

        this.setState({
            directions: this.state.directions,
        });
    }

    removeDirection(index){
        this.state.directions.splice(index, 1);

        this.setState({
            directions: this.state.directions,
        });

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

    addIngredient(){
        this.state.ingredients.push({
            id: this.state.ingredients[this.state.ingredients.length - 1].id + 1,
            name: 'New Ingredient...',
            isNew: true
        });

        this.setState({
            ingredients: this.state.ingredients,
        });
    }

    removeIngredient(index){
        this.state.ingredients.splice(index, 1);

        this.setState({
            ingredients: this.state.ingredients,
        });

    }

    updateRecipe(id){
        let def = $.Deferred();
        
        $.ajax({
            type: "PUT",
            url: `${Config.apiURL}/recipe/${id}`,
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

        /* key must be unique (don't use index as key) http://stackoverflow.com/questions/30406811/removing-an-item-causes-react-to-remove-the-last-dom-node-instead-of-the-one-ass */

        let ingredients = this.state.ingredients.map((ingredient, index) => {
            return(<Ingredient key={ingredient.id} index={index} name={ingredient.name} mode="edit" remove={() => this.removeIngredient(index)} />)
        });        

        let directions = this.state.directions.map((direction, index) => {
            return(<Direction key={direction.id} index={index} name={direction.name} mode="edit" remove={() => this.removeDirection(index)} />)
        });

        return (

            <div>
                <h4>{this.state.name}</h4>
                <input type="text" value={this.state.name} onChange={(e) => this.nameChanged(e)} />
                <h3>Ingredients</h3>
                <p><a onClick={() => this.addIngredient()} className="fa-icon-plus pointer">Add Ingredient</a></p>
                <div>
                    {ingredients}
                </div>

                <h3>Directions</h3>
                <p><a onClick={() => this.addDirection()} className="fa-icon-plus pointer">Add Direction</a></p>
                <div>
                    {directions}
                </div>

                <button onClick={() => this.updateRecipe(this.state.recipe.id)}>Update Recipe</button>

            </div>
        );
    }
}