import {react} from 'react';

export class Direction extends React.Component {
    constructor(){
        super(...arguments);
        this.state = {
            text: this.props.text
        }
    }    
    render() {
        return (
            <div>Direction</div>
        );
    }
}