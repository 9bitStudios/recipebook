var basicAuth = require('basic-auth');
var db = require('./SQL');
var bcrypt = require('bcrypt-nodejs');

exports.BasicAuthentication = function(request, response, next) {
 
    function unauthorized(response) {
        response.set('WWW-Authenticate', 'Basic realm=Protected Area');
        return response.send(401);
    };
 
    var user = basicAuth(request);

    if (!user || !user.name || !user.pass) {
        return unauthorized(response);
    };
    
    db.query('SELECT * FROM `users` WHERE `username` = ?', [user.name], function (error, results, fields) {
        if(results.length > 0 && bcrypt.compareSync(user.pass, results[0]['password'])) {
            response.pageInfo.user = {
                'id': results[0]['id'],
                'username': results[0]['username']
            }
            return next();
        } else {
            return unauthorized(response);
        }
    });
};