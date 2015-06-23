var mysql = require('mysql');
var express = require('express');
var javascripthelp = require('./js/functionHelpers.js');

// var connection = mysql.createConnection({
//     host        : 'localhost',
//     port        :  3306,
//     user        : 'root',
//     password    : '',
//     database    : 'live',
//     multipleStatements: true
// });

var connection = mysql.createConnection({
  host:"us-cdbr-iron-east-02.cleardb.net",
  user:"b00955d08fef04",
  password:"9bd21f2d",
  database:"heroku_fdeff37a1f83aa6"
});

exports.checkDbArtist = function(req, res, next){
  var newArtist = [req.query.artistname.replace("+"," ")];
  
  connection.query('SELECT * FROM artist WHERE artist_name = ?', 
  newArtist, function(err, rows, fields){
    if(rows.length != 0){
      var artistData = [rows[0]];
      
      connection.query('SELECT * FROM reviews WHERE artist_id = ?', artistData[0].artist_id, function(err, result){
        artistData.push(result);
        res.send(artistData);
      })
    }
    else{
      res.send("No data")
    }
  })
}

exports.insertDb = function(req,res,next){
  connection.query('INSERT INTO ?? SET ?', ['artist',req.body], function(err, result, rows){
    if (!err){
      res.send(req.body.artist_name);
    } else{
      console.log('Error while performing Query.');
    }
  })
}


exports.insertReviewDb = function(req,res,next){
  connection.query('SELECT artist_id FROM artist WHERE artist_name = ?', [req.body.artist_name],function(err, rows){
    req.body.artist_id = rows[0].artist_id;
    var lastArtist = req.body.artist_name;
    delete req.body.artist_name;
    
    connection.query('INSERT INTO ?? SET ?', ['reviews',req.body], function(err, result, rows){
      if (!err){
        res.send(lastArtist);
      } else{
        console.log('Error while performing Query.');
      }
    });
  });
};




