import {react} from 'react';
import {RecipeList} from 'components/recipes/RecipeList';

export default class RecipeListPage extends React.Component {
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