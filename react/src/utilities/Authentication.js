import $ from 'jquery';
import config from 'Config';
import {Helper} from './Helper';

class Authentication {
    constructor(){
        this.userInfo = {
            id: null,
            username: '',
            token: null
        };
        
        // called in/by React Router
        this.authenticateRoute = (nextState, replace) => {
            if(!this.userInfo.id) {
                replace('/login');
            }
        }

        this.init();
    }
    init(){
        let auth = Helper.ReadCookie('RecipeAuth');

        if(auth){
            auth = JSON.parse(auth);
            this.userInfo = auth;
        }
    }
    getUserInfo() {
        return this.userInfo;
    }
    login(username, password){

        let def = $.Deferred();
        let token = btoa(username + ":" + password);
        $.ajax({
            type: "POST",
            url: config.apiURL + "/login",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function (xhr) {
                xhr.setRequestHeader ("Authorization", "Basic " + token);
            },
            success:(data, textStatus, jqXHR) => {
                this.userInfo.id = data.id;
                this.userInfo.username = data.username;
                this.userInfo.token = token;
                Helper.CreateCookie('RecipeAuth', JSON.stringify(this.getUserInfo()))
                def.resolve(this.userInfo);
            },
            error:(jqXHR, textStatus, errorThrown) => {
                def.reject(jqXHR);
            }
        });
        return def.promise();

    }
    logout(){
        this.userInfo = {
            id: null,
            username: '',
            token: null
        };        
        Helper.DestroyCookie('RecipeAuth');
        Helper.Redirect();
    }


}

export default new Authentication();