import {react} from 'react';
import {Link, hashHistory} from 'react-router';
import Authentication from 'utilities/Authentication';
import {RecipeList} from 'components/recipes/RecipeList';

export default class Recipes extends React.Component {
    constructor(){
        super(...arguments);

    }
    
    render() {
        return (
            <div>
                <RecipeList />
            </div>
        );
    }
}