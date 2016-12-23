var db  = require('../utilities/SQL');
var Authentication  = require('../utilities/Authentication');

module.exports = function(app) { 
    
    // GET /api/recipes
    app.get('/api/recipes', Authentication.BasicAuthentication, function(request, response, next){

        db.query('SELECT * FROM `recipes`', function (error, results, fields) {
            if(error) {
                response.status(500).send({ error: 'Error getting data' });
            } else {
                var data = [];
                results.forEach(function(item, index) {
                    data.push({
                        'id': item['id'],
                        'name': item['name']
                    }) 
                });
                response.json(data);
            }
        });        
       
    });

    // GET /api/recipes
    app.get('/api/user/recipes/:id', Authentication.BasicAuthentication, function(request, response){
        db.query('SELECT * FROM `recipes` WHERE `user_id` = ?', [request.params.id], function (error, results, fields) {
            if(error) {
                response.status(500).send({ error: 'Error getting data' });
            } else {
                var data = [];
                results.forEach(function(item, index) {
                    data.push({
                        'id': item['id'],
                        'name': item['name']
                    }) 
                });                
                response.json(data);
            }
        });
        
    });

    // GET /api/recipes/:id
    app.get('/api/recipes/:id', function(request, response){
        db.query('SELECT * FROM `recipes` WHERE `id` = ?', [request.params.id], function (error, results, fields) {
            if(error) {
                response.status(500).send({ error: 'Error getting data' });
            } else {           
                response.json({ 'id': results[0]['id'], 'name': results[0]['name'] });
            }
        });
    });


    // POST /api/recipes/:id
    app.post('/api/recipes/:id', function(request, response){
        db.query('INSERT INTO `recipes` SET ?', { 'user_id': request.params.id, 'name': request.body.name }, function (error, result, fields) {
            if(error) {
                response.status(500).send({ error: 'Error adding data' });
            } else {
                response.json({
                    'id': result.insertId,
                    'name': request.body.name
                })
            }

        }); 
    });

    // PUT /api/recipes/:id
    app.put('/api/recipes/:id', function(request, response){
        db.query('UPDATE `recipes` SET name = ? WHERE id = ?', [request.body.name, request.params.id], function (error, result, fields) {
            if(error) {
                response.status(500).send({ error: 'Error updating data' });
            } else {
                response.json({
                    'id': request.params.id,
                    'name': request.body.name
                });
            }
        }); 
    });

    // DELETE /api/recipes/:id
    app.delete('/api/recipes/:id', function(request, response){
        db.query('DELETE FROM `recipes` WHERE `id` = ?; DELETE FROM `ingredients` WHERE `recipe_id` = ?; DELETE FROM `directions` WHERE `recipe_id` = ?', [request.params.id, request.params.id, request.params.id], function (error, results, fields) {
            if(error) {
                response.status(500).send({ error: 'Error deleting data' });
            } else {
                response.json({});
            }
        });
    });
}
