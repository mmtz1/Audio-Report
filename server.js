var express = require('express');
var app = express();
 
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public/views'));
app.use(express.static(__dirname + '/public/controlers'));

app.listen(3000);

console.log("Listening at 3000")