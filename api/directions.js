var db  = require('../utilities/SQL');
var Authentication  = require('../utilities/Authentication');

module.exports = function(app){ 

    // GET /api/directions/:id
    app.get('/api/directions/:id', Authentication.BasicAuthentication, function(request, response, next){

        db.query('SELECT * FROM `directions` WHERE recipe_id = ?', [request.params.id], function (error, results, fields) {
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

    // POST /api/directions
    app.post('/api/directions', Authentication.BasicAuthentication, function(request, response){
        db.query('INSERT INTO `directions` SET ?', { 'recipe_id': request.body.recipeId, 'name': request.body.name }, function (error, result, fields) {
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

    // PUT /api/recipes/:id
    app.put('/api/directions/:id', Authentication.BasicAuthentication, function(request, response){
        db.query('UPDATE `directions` SET name = ? WHERE id = ?', [request.body.name, request.params.id], function (error, result, fields) {
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


    // DELETE /api/directions/:id
    app.delete('/api/directions/:id', Authentication.BasicAuthentication, function(request, response){
        db.query('DELETE FROM `directions` WHERE `id` = ?', [request.params.id], function (error, results, fields) {
            if(error) {
                response.status(500).send({ error: 'Error deleting data' });
            } else {
                response.json({});
            }
        });
    });

}
