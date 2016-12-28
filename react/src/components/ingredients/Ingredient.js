import {react} from 'react';

export class Ingredient extends React.Component {
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
            });
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
                        <input type="text" value={this.state.name} onChange={(e) => this.valueChanged(e)} className="left" />
                        <a onClick={this.props.remove} className="deleteIngredient fa-icon-remove pointer left"></a>
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