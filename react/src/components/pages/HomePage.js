import {react} from 'react';
import {Link} from 'react-router';

export default class HomePage extends React.Component {
    constructor(){
        super(...arguments);
    }
    render(){
        return(        
            <div>
                <p>Welcome to the Recipe Book Application...</p>

                <h4><Link to="/recipes">View My Recipes</Link></h4>        
            </div>
        );
    }
}