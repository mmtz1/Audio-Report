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


// var db_config = mysql.createConnection({
//   host:"us-cdbr-iron-east-02.cleardb.net",
//   user:"b00955d08fef04",
//   password:"9bd21f2d",
//   database:"heroku_fdeff37a1f83aa6"
// });

var db_config = mysql.createConnection({
    host        : 'localhost',
    port        :  3306,
    user        : 'root',
    password    : '',
    database    : 'live',
    multipleStatements: true
});


var connection;

function handleDisconnect() {
  connection = mysql.createConnection(db_config); // Recreate the connection, since
                                                  // the old one cannot be reused.

  connection.connect(function(err) {              // The server is either down
    if(err) {                                     // or restarting (takes a while sometimes).
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    }                                     // to avoid a hot loop, and to allow our node script to
  });                                     // process asynchronous requests in the meantime.
                                          // If you're also serving http, display a 503 error.
  connection.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      handleDisconnect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
      throw err;                                  // server variable configures this)
    }
  });
}

handleDisconnect();



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


app.listen(process.env.PORT || 3000);

console.log("Listening at 3000")