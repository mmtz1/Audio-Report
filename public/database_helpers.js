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
  var newArtist = req.body;
  console.log("req.body",req.body)
  connection.query('SELECT artist_name FROM artist WHERE artist_name = ?', 
  [req.body.artist_name], function(err, rows,fields){
      if(rows.length === 0){
        next();
      } else{
        connection.query(
          'SELECT * FROM artist INNER JOIN artist_img ON artist.artist_id = artist_img.artist_id WHERE artist_name = "John Legend"',
          function(err,rows,fields){
            res.send(rows)
          })
      }
    })
}

exports.insertDb = function(req,res,next){
  var artistName = req.body.artist_name;
  var artistGenre = req.body.artist_genre || "";
  
  
  connection.query('INSERT INTO ?? SET ?', ['artist',{artist_name: artistName,artist_genre: artistGenre}], function(err, result){
      if (!err){
        var artistId = result.insertId;
        var artistUrl = req.body.artist_img

        connection.query('INSERT INTO ?? SET ?', 
          ['artist_img',{artist_id: artistId, img_url: artistUrl}], 
          function(err, rows,fields){
            res.sendStatus(200)
          })
      } else{
        console.log('Error while performing Query.');
      }
    })
}

// res.sendStatus(200);
