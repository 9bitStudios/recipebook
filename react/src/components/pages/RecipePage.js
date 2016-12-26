import {react} from 'react';
import {Link, hashHistory} from 'react-router';
import {Recipe} from 'components/recipes/Recipe';

export default class RecipePage extends React.Component {
    constructor(){
        super(...arguments);
    }
    
    render() {
        return (
            <div>
                <Recipe key={this.props.params.id} />
            </div>
        );
    }
}