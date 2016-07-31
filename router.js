var recipes = require('./api/recipes');
var users = require('./api/users');
var ingredients = require('./api/ingredients');
var directions = require('./api/directions');

module.exports = function(app){ 

    // index.html
    app.get('/', function(request, response){
        response.render('index', { });
    });

    users(app);
    recipes(app);
    ingredients(app);
    directions(app);

};

