var mysql = require('mysql')

exports.variable = "SHIT";


var connection = mysql.createConnection({
    host        : 'localhost',
    port        :  3306,
    user        : 'root',
    password    : '',
    database    : 'chat'
});

connection.connect()

connection.end()