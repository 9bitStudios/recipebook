import {react} from 'react';
import $ from 'jquery';
import { Link } from 'react-router';
import Authentication from 'utilities/Authentication';
import RecipeListItem from 'components/recipes/RecipeListItem';


export class RecipeList extends React.Component {
    constructor(){
        super(...arguments);
        this.state = {
            recipes: []
        }
    }

    getRecipes(){

        const id = Authentication.getUserInfo()['id'];
        const token = Authentication.getUserInfo()['token'];
        let def = $.Deferred();
        
        $.ajax({
            type: "GET",
            url: `${Config.apiURL}/user/recipes/${id}`,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function (xhr) {
                xhr.setRequestHeader ("Authorization", `Basic ${token}`);
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
    deleteRecipe(id, index) {

        if(confirm('Are you sure you want to delete this recipe?')) {

            const token = Authentication.getUserInfo()['token'];

            $.ajax({
                type: "DELETE",
                url: `${Config.apiURL}/recipes/${id}`,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                beforeSend: function (xhr) {
                    xhr.setRequestHeader ("Authorization", `Basic ${token}`);
                },
                success:(data, textStatus, jqXHR) => {
                    this.state.recipes.splice(index, 1);
                    this.setState({
                        recipes: this.state.recipes
                    });   
                },
                error:(jqXHR, textStatus, errorThrown) => {

                }
            });
        }
      
    }
    componentDidMount(){
        
        this.getRecipes().then(data => {
            this.setState({
                recipes: data
            })
        }, error => {

        })

    }
    render(){

        var recipes = this.state.recipes.map((recipe, index) => {
            return (
                <RecipeListItem key={recipe.id} id={recipe.id} name={recipe.name} remove={() => this.deleteRecipe(recipe.id, index)} />
            );
        });
        
        return (
            <div>
                {recipes}
                <Link to="/new" className="nbs-button-medium nbs-button-green-flat">Create new Recipe</Link>
                <div className="clear"></div>
            </div>
            
        );
         
    }
};