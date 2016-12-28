import {react} from 'react';

export class Direction extends React.Component {
    constructor(){
        super(...arguments);
        this.state = {
            name: this.props.name,
            mode: 'view'
        }        
    }

    componentWillMount(){
        if(this.props.mode === 'edit') {
            this.setState({
                mode: 'edit'
            })
        }
    }

    valueChanged(event){
        let name = event.target.value;
        this.setState({
            name: name
        });

        this.props.change(name);
    }

    render() {
        if(this.state.mode === 'edit') { 

            return (
                <div>
                    <p>
                        <textarea className="left" value={this.state.name} onChange={(e) => this.valueChanged(e)}></textarea>
                        <a onClick={this.props.remove} className="deleteDirection fa-icon-remove pointer left"></a>
                    </p>
                    <div className="clear"></div>
                </div>
            );
        } else {
            return (
                <li>{this.state.name}</li>
            );
        }
    }
}