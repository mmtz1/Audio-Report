var express = require('express');
var app = express();
var mysql = require('mysql');

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
    database    : 'live'
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
    }else{
      console.log('Error while performing Query.');
      res.sendStatus(500);
    }
  }); 
})


app.post('/artistsearch',function(req,res,next){
  var newArtist = req.body;
  connection.query('SELECT artist_name FROM artist WHERE artist_name = ?',
                  [req.body.artist_name],
                  function(err, rows,fields){
                    if(rows.length === 0){
                      next()
                    }
                  })
}, function(req,res,next){
  image = {};
  image["img_url"] = req.body.artist_img
  delete req.body.artist_img
  var newartist = req.body

  connection.query('INSERT INTO artist SET ?',newartist, function(err, rows,fields){
    if (!err){
      console.log("Posted to database")
      next()
    }else{
      console.log('Error while performing Query.');
      res.sendStatus(500);
    }
  }); 
}, function(req,res,next){
  connection.query('INSERT INTO artist_img SET ?',image, function(err, rows,fields){
    if (!err){
      console.log("Posted to database")
      res.sendStatus(200);
    }else{
      console.log('Error while performing Query.');
      res.sendStatus(500);
    }
  }); 
})




app.listen(3000);

console.log("Listening at 3000")