import {react} from 'react';
import { Link } from 'react-router';
import Authentication from 'utilities/Authentication';
import Events from 'utilities/Events';

export default class UserMenu extends React.Component {

    constructor(){
        super(...arguments);
        Events.on('login', () =>{
            this.forceUpdate();
        });

    }
    logout(){
        Authentication.logout();
        this.forceUpdate();
    }
    render() {

        if(Authentication.getUserInfo().id){
            return (
                <div>
                    Welcome {Authentication.getUserInfo().username} | <a onClick={() => this.logout()}>Logout</a>
                </div>
            );            
        } else {
            return (
                <div>
                    <a href="#login">Login</a> | <a href="#signup">Sign Up</a>
                </div>
            );
        }


    }
}