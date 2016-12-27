import {react} from 'react';

export class Recipe extends React.Component {
    constructor(){
        super(...arguments);
    }

    render() {
        return (
            <div>{this.props.name}</div>
        );
    }
}