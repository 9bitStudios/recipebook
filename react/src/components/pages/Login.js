import {react} from 'react';
import Authentication from 'utilities/Authentication';
import Events from 'utilities/Events';

export default class Login extends React.Component {
    constructor(){
        super(...arguments);        
    }
    login(){
        let username = ReactDOM.findDOMNode(this.refs.name).value
        let password = ReactDOM.findDOMNode(this.refs.password).value
        Authentication.login(username, password).then((user) => Authentication.redirect());
    }    
    render() {
        return (
            <div>
                <input name="name" type="text" ref="name" />
                <input name="password" type="password" ref="password" />
                <button onClick={() => this.login()}>Login</button>
            </div>
        );
    }
}