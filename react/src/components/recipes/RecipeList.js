import {react} from 'react';
import $ from 'jquery';
import { Link } from 'react-router';
import Authentication from 'utilities/Authentication';

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
    deleteRecipe(index) {

        if(confirm('Are you sure you want to delete this recipe?')) {

            const token = Authentication.getUserInfo()['token'];

            $.ajax({
                type: "DELETE",
                url: `${Config.apiURL}/recipes/${index}`,
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
            
            let cssClass = `recipe-item-${recipe.id}`;
            let viewPath = `/recipe/${recipe.id}`;
            let editPath = `/edit/${recipe.id}`;

            return (
                <div className={cssClass}>
                    <h4>{recipe.name}</h4>
                    <Link to={viewPath} className="fa-icon-eye-open"> View</Link>&nbsp;|&nbsp;		
                    <Link to={editPath} className="fa-icon-pencil"> Edit</Link>&nbsp;|&nbsp;
                    <a onClick={() => this.deleteRecipe(index)} className="delete fa-icon-remove"> Delete</a>
                </div>
            );
        });
        
        return (
            <div>
                {recipes}
            </div>
        );
         
    }
};