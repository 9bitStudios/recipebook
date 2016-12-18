import {react} from 'react';

export class Ingredient extends React.Component {
    constructor(){
        super(...arguments);
        this.state = {
            name: this.props.name
        }
    }    
    render() {
        return (
            <div>Ingredient</div>
        );
    }
}