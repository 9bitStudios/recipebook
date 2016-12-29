export class Helper {
 
    constructor(){ 

    }    
    
    static log(msg) {
        console.log(msg);
    }     
    
    static RandomString(strLength){
        if(typeof strLength === 'undefined') { 
            strLength = 8;
        }

        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for(var i=0; i < strLength; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;

    }

    static CreateCookie(name,value,days){
        if (days) {
            var date = new Date();
            date.setTime(date.getTime()+(days*24*60*60*1000));
            var expires = "; expires="+date.toGMTString();
        }
        else {
            var expires = "";
        }
        document.cookie = name+"="+value+expires+"; path=/";        
    }

    static ReadCookie(name){
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }

    static DestroyCookie(name) {
        this.CreateCookie(name,"",-1);
    }
    
    static StripTrailingSlash(str){

        // string is probably single '/', no need to strip last '/'
        if(str.length === 1) {
            return str;
        }
        else {
            if(str.charAt(str.length-1) === "/") { 
                str = str.substr(0, str.length - 1);
            }
            return str;
        }
    }

    static Redirect(route){
        if(route) {
            window.location.hash = '#' + route;
        } else {
             window.location.hash = '#';
        }
    }

}