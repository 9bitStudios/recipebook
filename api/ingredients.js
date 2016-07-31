var db  = require('../utilities/SQL');
var Authentication  = require('../utilities/Authentication');

module.exports = function(app){ 

    // GET /api/ingredients/:id
    app.get('/api/ingredients/:id', Authentication.BasicAuthentication, function(request, response, next){

        db.query('SELECT * FROM `ingredients` WHERE recipe_id = ?', [request.params.id], function (error, results, fields) {
            if(error) {
                response.status(500).send({ error: 'Error getting data' });
            } else {
                var data = [];
                results.forEach(function(item, index) {
                    data.push({
                        'id': item['id'],
                        'recipe_id': item['recipe_id'],
                        'name': item['name']
                    }) 
                });
                response.json(data);
            }
        });        
       
    });

    // POST /api/ingredients
    app.post('/api/ingredients', Authentication.BasicAuthentication, function(request, response){
        db.query('INSERT INTO `ingredients` SET ?', { 'recipe_id': request.body.recipeId, 'name': request.body.name }, function (error, result, fields) {
            if(error) {
                response.status(500).send({ error: 'Error adding data' });
            } else {
                response.json({
                    'id': result.insertId,
                    'recipe_id': request.body.recipeId,
                    'name': request.body.name
                })
            }

        }); 
    });

    // PUT /api/ingredients/:id
    app.put('/api/ingredients/:id', Authentication.BasicAuthentication, function(request, response){
        db.query('UPDATE `ingredients` SET name = ? WHERE id = ?', [request.body.name, request.params.id], function (error, result, fields) {
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


    // DELETE /api/ingredients/:id
    app.delete('/api/ingredients/:id', Authentication.BasicAuthentication, function(request, response){
        db.query('DELETE FROM `ingredients` WHERE `id` = ?', [request.params.id], function (error, results, fields) {
            if(error) {
                response.status(500).send({ error: 'Error deleting data' });
            } else {
                response.json({});
            }
        });
    });

}
