import {react} from 'react';
import $ from 'jquery';
import {Recipe} from './Recipe';

export class RecipeList extends React.Component {
    constructor(){
        super(...arguments);
        this.state = {
            recipes: []
        }
    }

    getRecipes(){
        var def = $.Deferred();
        $.ajax({
            type: "GET",
            url: Config.apiURL + "/user/recipes/1",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function (xhr) {
                xhr.setRequestHeader ("Authorization", "Basic " + btoa('demo' + ":" + 'demo'));
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
                <Recipe key={recipe.id} name={recipe.name} />
            );
        });
        
        return (
            <div>
                {recipes}
            </div>
        );
         
    }
};