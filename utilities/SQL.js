var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'recipebook',
    multipleStatements: true  
});

connection.connect(function(err) {
    if (err) {
        console.error('Error: Could not connect to MySQL...\r\n');
        console.error(err.stack);
        return;
    }
    console.log('Connected to MySQL: Connected as thread ID: ' + connection.threadId);

});

module.exports = connection;