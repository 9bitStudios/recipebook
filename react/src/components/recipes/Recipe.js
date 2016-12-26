import {react} from 'react';

export class Recipe extends React.Component {
    constructor(){
        super(...arguments);
    }

    getEditDisplay(){

    }

    getViewDisplay(){

    }
    render() {
        return (
            <div>{this.props.name}</div>
        );
    }
}