import {react} from 'react';
import $ from 'jquery';
import {Link, hashHistory} from 'react-router';
import {Helper} from 'utilities/Helper';
import Events from 'utilities/Events';
import Authentication from 'utilities/Authentication';
import {Direction} from 'components/directions/Direction';
import {Ingredient} from 'components/ingredients/Ingredient';

export default class RecipeAddPage extends React.Component {

    constructor(){
        super(...arguments);

        this.state = {
            id: this.props.params.id,
            name: '',
            directions: [],
            ingredients: []     
        }

        this.ingredientsToDelete = [];
        this.directionsToDelete = [];
    }    

    request(method = "GET", url, data = null){

        let def = $.Deferred();
        if(data) { data = JSON.stringify(data) }
        
        $.ajax({
            type: method,
            url: `${Config.apiURL}${url}`,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: data,
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

    ingredientChange(value, index) {
        
        this.setState((prevState, props) => {
            prevState.ingredients[index] = {
                id: prevState.ingredients[index].id,
                name: value,
                isNew: prevState.ingredients[index].isNew     
            }
            return prevState;
        });
    }

    directionChange(value, index) {

        this.setState((state, props) => {
            state.directions[index] = {
                id: state.directions[index].id,
                name: value,
                isNew: state.directions[index].isNew     
            }
            return state;            
        });
    }

    addIngredient(){

        this.setState((state, props) => {
            state.ingredients.push({
                id: (state.ingredients.length > 0) ? state.ingredients[state.ingredients.length - 1].id + 1 : 1,
                name: 'New Ingredient...',
                isNew: true
            });
            return state;
        });
    }

    removeIngredient(index){

        this.setState((state, props) => {
            let ingredient = state.ingredients.splice(index, 1);

            // ingredient is not a newly added (i.e. unsaved ingredient) so we have to mark it for deletion
            if(!ingredient[0].isNew) { 
                this.ingredientsToDelete.push(ingredient[0]);
            }

            return state;
        });
    }

    addDirection(){
        this.setState((state, props) => {
            state.directions.push({
                id: (state.directions.length > 0) ? state.directions[state.directions.length - 1].id + 1 : 1,
                name: 'New Ingredient...',
                isNew: true
            });
            return state;
        });
    }

    removeDirection(index){
        
        this.setState((state, props) => {
            let direction = this.state.directions.splice(index, 1);

            // direction is not a newly added (i.e. unsaved direction) so we have to mark it for deletion
            if(!direction[0].isNew) { 
                this.directionsToDelete.push(direction[0]);
            }

            return state;
        });

    } 

    save(){
        this.request("POST", `/recipes/${Authentication.getUserInfo().id}`, { name: this.state.name }).then(recipe => {

            let id = recipe.id;

            // loop through and add ingredients
            this.state.ingredients.forEach((item, index) =>{
                this.request("POST", "/ingredients", {recipeId: id, name: item.name});
            });

            // loop through and add directions
            this.state.directions.forEach((item, index) =>{
                this.request("POST", "/directions", {recipeId: id, name: item.name});
            });

            Events.broadcast('notification', 'Recipe added', 'success')
            Helper.Redirect('/recipes');

        });
    }

    render() {

        /* key must be unique (don't use index as key) http://stackoverflow.com/questions/30406811/removing-an-item-causes-react-to-remove-the-last-dom-node-instead-of-the-one-ass */

        let ingredients = this.state.ingredients.map((ingredient, index) => {
            return(<Ingredient key={ingredient.id} index={index} name={ingredient.name} mode="edit" change={(value) => this.ingredientChange(value, index)} remove={() => this.removeIngredient(index)} />)
        });        

        let directions = this.state.directions.map((direction, index) => {
            return(<Direction key={direction.id} index={index} name={direction.name} mode="edit" change={(value) => this.directionChange(value, index)} remove={() => this.removeDirection(index)} />)
        });

        return (

            <div>
                <h2>Create Recipe: {this.state.name}</h2>
                <input type="text" value={this.state.name} onChange={(e) => this.nameChanged(e)} />
                <h3>Ingredients</h3>
                <p><a onClick={() => this.addIngredient()} className="fa-icon-plus pointer"> Add Ingredient</a></p>
                <div>
                    {ingredients}
                </div>

                <h3>Directions</h3>
                <p><a onClick={() => this.addDirection()} className="fa-icon-plus pointer"> Add Direction</a></p>
                <div>
                    {directions}
                </div>

                <div className="clearout"></div>

                <button onClick={() => this.save()}>Create Recipe</button>

            </div>
        );
    }
}