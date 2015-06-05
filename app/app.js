/* Copyright IBM Corp. 2013 All Rights Reserved                      */
/*eshint-env node */

var http = require('http');
var path = require('path');
var express = require('express');
var hogan = require('hogan-express');
var mysql = require('mysql');
var fs = require('fs');

var port = (process.env.VCAP_APP_PORT || 3000);
var host = (process.env.VCAP_APP_HOST || 'localhost');

// all environments
var app = express();

// check if application is being run in cloud environment
var db = mysql.createConnection({
  "database": "dd0ed3544eb824b79afd0bdb641876298",
  "host": "192.155.247.249",
  "port": 3307,
  "user": "uKQQoWJHoWmSa",
  "password": "pFLqlHS0sN71c",
});
createTable();


app.set('port', port);
app.set('view engine', 'html');
app.set('env', 'development');
app.engine('html', hogan);

app.use(express.favicon(path.join(__dirname, 'public/images/favicon.ico')));
app.use(express.logger());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// start server
http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening at http://' + host + ':' + port);
});

function createTable() {
  var sql = 'CREATE TABLE IF NOT EXISTS posts ('
            + 'id INTEGER PRIMARY KEY AUTO_INCREMENT,'
            + 'text text'
          + ');'; 
  db.query(sql, function (err, result) {
    if (err) console.log(err);
  });
  console.log("created table");
}

// function getPosts(cb) {
//   var sql = 'SELECT text FROM posts';
//   db.query(sql, function (err, result) {
//     if (err) return cb(err);
//     cb(null, result);
//   });
// }

// function addPosts(posts, cb) {
//   var sql = 'INSERT INTO posts (text) VALUES ?';
  
//   var values = posts.map(function (post) {
//     return [post];
//   });
  
//   db.query(sql, [values], function (err, result) {
//     if (err) return cb(err);
//     cb(null, result);
//   });
// }

// function deletePosts(cb) {
//   var sql = 'DELETE FROM posts WHERE 1';
//   db.query(sql, function (err, result) {
//     if (err) return cb(err);
//     cb(null, result);
//   });
// }

function isNotEmpty(str) {
  return str && str.trim().length > 0;
}
