import $ from 'jquery';
import config from '../Config';
import {Helper} from './Helper';

export class Authentication {
    constructor(){
        super(...arguments);
    }
    login(username, password){

        var def = $.Deferred()
        $.ajax({
            type: "POST",
            url: config.apiURL + "/login",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function (xhr) {
                xhr.setRequestHeader ("Authorization", "Basic " + btoa(username + ":" + password));
            },
            success:(data, textStatus, jqXHR) => {

            },
            error:(jqXHR, textStatus, errorThrown) => {

            }
        });
        return def.promise();

    }
    logout(){
        
    }
}