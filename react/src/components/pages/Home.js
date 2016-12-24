import {react} from 'react';
import {RecipeList} from 'components/recipes/RecipeList';
import {Login} from 'components/login/Login';
import Events from 'utilities/Events';
import Authentication from 'utilities/Authentication';

export default class Home extends React.Component {
    constructor(){
        super(...arguments);

        Events.on('login', () =>{
            this.forceUpdate()
        });
    }
    render(){
        if(Authentication.getUserInfo().loggedIn) {
            return (
                <div>
                    <RecipeList />
                </div>
            );
        } else {
            return (
                <div>
                    <Login />
                </div>
            );            
        }
    }
}