import {react} from 'react';

export class Ingredient extends React.Component {
    constructor(){
        super(...arguments);
    }   

    render() {
        return (
            <div>{this.props.name}</div>
        );
    }
}