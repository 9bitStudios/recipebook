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
        Authentication.login(username, password).then((user) => { 
            Events.broadcast('login');
            Authentication.redirect() 
        });
    }    
    render() {
        return (
            <div id="log-in">
                <p><label>User Name</label> <input name="name" type="text" ref="name" /></p>
                <p><label>Password</label><input name="password" type="password" ref="password" /></p>
                <button id="login" onClick={() => this.login()}>Login</button>
            </div>
        );
    }
}