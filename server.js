var express = require('express');
var app = express();
var mysql = require('mysql');
var dbhelpers = require('./public/database_helpers.js')
var bodyParser = require('body-parser')



app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public/views'));
app.use(express.static(__dirname + '/public/controlers'));
app.use(express.static(__dirname + '/public/lib'));

app.use(bodyParser())


var connection = mysql.createConnection({
    host        : 'localhost',
    port        :  3306,
    user        : 'root',
    password    : '',
    database    : 'live',
    multipleStatements: true
});


connection.connect(function(err){
if(!err) {
    console.log("Database is connected ... \n\n");  
} else {
    console.log("Error connecting database ... \n\n");  
}
});


app.post('/signup',function(req,res){
  var newUser = req.body;
  

  connection.query('INSERT INTO users SET ?',newUser, function(err, rows,fields){
    if (!err){
      console.log("posted to database")
      res.sendStatus(200);
    } else{
      console.log('Error while performing Query.');
      res.sendStatus(500);
    }
  }); 
})

app.get('/artistsearch',dbhelpers.checkDbArtist)

app.post('/artistsearch', dbhelpers.insertDb)

app.post('/reviews',dbhelpers.insertReviewDb)




app.listen(3000);

console.log("Listening at 3000")