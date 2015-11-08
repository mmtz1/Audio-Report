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

if (!process.env.PORT) {
  var db_config = {
      host        : 'localhost',
      port        :  3306,
      user        : 'root',
      password    : '',
      database    : 'live',
      multipleStatements: true
  }

  var connection = mysql.createConnection(db_config);
} else {
  var db_config = {
    host:"us-cdbr-iron-east-02.cleardb.net",
    user:"b00955d08fef04",
    password:"9bd21f2d",
    database:"heroku_fdeff37a1f83aa6"
  };

  function handleDisconnect() {
    connection = mysql.createConnection(db_config); 
                                                    

    connection.connect(function(err) {              
      if(err) {                                     
        console.log('error when connecting to db:', err);
        setTimeout(handleDisconnect, 2000); 
      }                                     
    });                                     
                                            
    connection.on('error', function(err) {
      console.log('db error', err);
      if(err.code === 'PROTOCOL_CONNECTION_LOST') { 
        handleDisconnect();                         
      } else {                                      
        throw err;                                  
      }
    });
  }

  handleDisconnect();

}




connection.connect(function(err){
  if(!err) {

      console.log("Database is connected ... \n\n");  
  } else {
    console.log(err)
      console.log("Error connecting database ... \n\n");  
  }
});


app.post('/signup', function(req,res){
  var newUser = req.body;
  connection.query('INSERT INTO users SET ?', newUser, function(err, rows,fields){
    if (!err){
      console.log("posted to database")
      res.sendStatus(200);
    } else {
      console.log('Error while performing Query.');
      res.sendStatus(500);
    }
  }); 
});

app.get('/artistsearch',dbhelpers.checkDbArtist);

app.post('/artistsearch', dbhelpers.insertDb);

app.post('/reviews', dbhelpers.insertReviewDb);


app.listen(process.env.PORT || 3000);


