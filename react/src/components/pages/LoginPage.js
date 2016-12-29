import {react} from 'react';
import {Helper} from 'utilities/Helper';
import Authentication from 'utilities/Authentication';
import Events from 'utilities/Events';

export default class LoginPage extends React.Component {
    constructor(){
        super(...arguments);        
    }
    login(){
        let username = ReactDOM.findDOMNode(this.refs.name).value
        let password = ReactDOM.findDOMNode(this.refs.password).value
        Authentication.login(username, password).then((user) => { 
            Events.broadcast('login');
            Helper.Redirect(); 
        });
    }    
    render() {
        return (
            <div id="log-in">
                <h2>Please log in</h2>
                <p><label>User Name</label> <input name="name" type="text" ref="name" /></p>
                <p><label>Password</label><input name="password" type="password" ref="password" /></p>
                <button id="login" onClick={() => this.login()}>Login</button>
            </div>
        );
    }
}