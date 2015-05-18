var mysql = require('mysql')
exports.x = 100
var connection = mysql.createConnection({
    host        : 'localhost',
    port        :  3306,
    user        : 'root',
    password    : '',
    database    : 'chat'
});

exports.mysql = connection; 