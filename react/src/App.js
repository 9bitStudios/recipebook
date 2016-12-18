import {react} from 'react';
import {RecipeList} from './components/recipes/RecipeList';
import {Events} from './utilities/Events';
import config from './Config';

global.Config = config;
global.Events = new Events();

export class App extends React.Component {
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