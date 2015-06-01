var mysql = require('mysql');
var express = require('express');

var connection = mysql.createConnection({
    host        : 'localhost',
    port        :  3306,
    user        : 'root',
    password    : '',
    database    : 'live',
    multipleStatements: true
});


exports.checkDbArtist = function(req,res,next){
  var newArtist = [req.query.artistname];
  
  connection.query('SELECT * FROM artist WHERE artist_name = ?', 
  newArtist, function(err, rows,fields){
    if(rows.length != 0){
      res.send(rows)
    }
    else{
      res.send("No data")
    }
  })
}

exports.insertDb = function(req,res,next){
  
  var artistName = req.body.artist_name;
  var artistGenre = req.body.artist_genre || "";
  var artistImg = req.body.artist_imageurl || "";
  var artistBio = req.body.artist_bio || "";
  
  
  connection.query('INSERT INTO ?? SET ?', ['artist',{artist_name: artistName,artist_genre: artistGenre, artist_imageurl:artistImg,artist_bio:artistBio}], function(err, result,rows){
      if (!err){
        res.send(artistName)
      } else{
        console.log('Error while performing Query.');
      }
    })
}

// res.sendStatus(200);
