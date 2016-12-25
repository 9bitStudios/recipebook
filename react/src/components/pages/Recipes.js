import {react} from 'react';
import {Link, hashHistory} from 'react-router';
import Authentication from 'utilities/Authentication';
import {RecipeList} from 'components/recipes/RecipeList';

export default class Recipes extends React.Component {
    constructor(){
        super(...arguments);

    }
    
    render() {

        if(Authentication.getUserInfo().id) {
            return (
                <div>
                    <RecipeList />
                </div>
            );
        } else {
            hashHistory.push('/login');
            return false;
        }  


    }
}