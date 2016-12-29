import {react} from 'react';
import $ from 'jquery';
import config from 'Config';
import Events from 'utilities/Events';
import {Helper} from 'utilities/Helper';

export default class SignUpPage extends React.Component {
    constructor(){
        super(...arguments);        
    }

    createUser(username, password) {
        
        let def = $.Deferred();

        $.ajax({
            type: "POST",
            url: config.apiURL + "/user",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify({username: username, password: password}),				
            success:(data) => {
                Events.broadcast('notification', 'User added', 'success');
                def.resolve(data);
            },
            error:(errorMessage) => {

                if(errorMessage.status === 403) {
                    Events.broadcast('notification', 'That username already exists. Please choose a different username', 'error');
                } else {
                    Events.broadcast('notification', 'Error signing up', 'error');
                }

                def.reject();
            }
        }); 

        return def.promise();       
    }

    signup(){
        let username = ReactDOM.findDOMNode(this.refs.name).value
        let password = ReactDOM.findDOMNode(this.refs.password).value
        this.createUser(username, password).then((user) => { 
            Helper.Redirect();
        }).fail(() => {
            Helper.Redirect('signup');
        });
    }    
    render() {
        return (
            <div id="sign-up">
                <h2>Sign Up</h2>
                <p><label>User Name</label> <input name="name" type="text" ref="name" /></p>
                <p><label>Password</label><input name="password" type="password" ref="password" /></p>
                <button id="signup" onClick={() => this.signup()}>Sign Up</button>
            </div>
        );
    }
}