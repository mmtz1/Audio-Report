var express = require('express');
var app = express();
var database = require('./db/db.js')
var bodyParser = require('body-parser')


app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public/views'));
app.use(express.static(__dirname + '/public/controlers'));

app.use(bodyParser())


app.post('/',function(req,res){
  console.log(req.body)
})

app.listen(3000);

console.log("Listening at 3000")