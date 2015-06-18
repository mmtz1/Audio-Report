var mysql = require('mysql');
var express = require('express');
var javascripthelp = require('./js/functionHelpers.js')

// var connection = mysql.createConnection({
//     host        : 'localhost',
//     port        :  3306,
//     user        : 'root',
//     password    : '',
//     database    : 'live',
//     multipleStatements: true
// });

var db_config = {
  host:"us-cdbr-iron-east-02.cleardb.net",
  user:"b00955d08fef04",
  password:"9bd21f2d",
  database:"heroku_fdeff37a1f83aa6"
}

// var db_config = mysql.createConnection({
//     host        : 'localhost',
//     port        :  3306,
//     user        : 'root',
//     password    : '',
//     database    : 'live',
//     multipleStatements: true
// });


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

exports.checkDbArtist = function(req,res,next){
  
  var newArtist = [req.query.artistname.replace("+"," ")];
  
  connection.query('SELECT * FROM artist WHERE artist_name = ?', 
  newArtist, function(err, rows,fields){
    if(rows.length != 0){
      var artistData = [rows[0]];
      
      connection.query('SELECT * FROM reviews WHERE artist_id = ?',artistData[0].artist_id,function(err,result){
        artistData.push(result) 
        res.send(artistData)
      })
    }
    else{
      res.send("No data")
    }
  })
}

exports.insertDb = function(req,res,next){
  connection.query('INSERT INTO ?? SET ?', ['artist',req.body], function(err, result,rows){
      if (!err){
        res.send(req.body.artist_name);
      } else{
        console.log('Error while performing Query.');
      }
    })
}


exports.insertReviewDb = function(req,res,next){
  connection.query('SELECT artist_id FROM artist WHERE artist_name = ?',[req.body.artist_name],function(err,rows){
    req.body.artist_id = rows[0].artist_id;
    var lastArtist = req.body.artist_name;
    delete req.body.artist_name;
    
    connection.query('INSERT INTO ?? SET ?', ['reviews',req.body], function(err, result,rows){
      if (!err){
        res.send(lastArtist);
      } else{
        console.log('Error while performing Query.');
      }
    })
  })
}




