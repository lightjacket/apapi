/* Copyright IBM Corp. 2013 All Rights Reserved                      */
/*eshint-env node */

var http = require('http');
var path = require('path');
var express = require('express');
var multer  = require('multer');
var hogan = require('hogan-express');
var mysql = require('mysql');
var fs = require('fs');
var _ = require("underscore");
var AdmZip = require('adm-zip');

var port = (process.env.PORT || 3000);

// all environments
var app = express();

var db = mysql.createConnection({
  "database": "hackathonmysql",
  "host": "hackathon.c7ppscfyfcfj.us-west-2.rds.amazonaws.com",
  "port": 3306,
  "user": "hackathon",
  "password": "asdfasdfa",
});

app.set('port', port);
app.set('view engine', 'html'); //do we want this weird hgan express shit?
app.set('env', 'development');
app.engine('html', hogan);

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.use(express.favicon(path.join(__dirname, 'public/images/favicon.ico')));
app.use(express.logger());
//app.use(express.bodyParser({uploadDir:'./uploads'}));
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'client/snacks/client-dist')));
app.use(express.static(path.join(__dirname, 'client/snacks/client-js')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.post('/upload',[ multer({ dest: './uploads/'}), function(req, res){
    console.log("hit upload code");

    console.log(req.body) // form fields
    console.log(req.files) // form files
    var originalFileName = req.files.file.name;
    var shortFileName = req.files.file.originalname;
    var inputPath = "./uploads/";
    var outputPath = "./uploads/extracted/";
    var finalFilePath = outputPath + shortFileName.replace('.zip', '');
    // reading archives
    console.log("before zippity zip");
    var zip = new AdmZip(inputPath + originalFileName);
    console.log("during zippity zip");
    var zipEntries = zip.getEntries(); // an array of ZipEntry records
    console.log("after zippity zip");

    zipEntries.forEach(function(zipEntry) {
        console.log(zipEntry.toString()); // outputs zip entries information
    });

    zip.extractAllTo(outputPath, true);

    var sql = "INSERT INTO TESTDATA (path, datatype) VALUES('"+ finalFilePath +"','"+ req.body.type +"')";
    db.query(sql, function (err, result) {
      if (err) {
        console.log(err);
        return;
      }

       var sql = 'SELECT MAX(id) as id FROM TESTDATA';
        db.query(sql, function(err, result) {
          console.log("result: " + JSON.stringify(result));
          if(err) {
            console.log(err);
            return;
          }
          var sql = 'SELECT * FROM API WHERE datatype=' + req.body.type;
          console.log("sencind back /getresult/"+ result[0].id);
          http.get("http://apapi.herokuapp.com/runTest/" + result[0].id + "/" + req.body.type);
          res.redirect("seeresults.html#/?id="+result[0].id);
        });
    });
}]);


app.get('/getresult/:id?', function(req, res, next) {
  var id = req.params.id;
  if(!id) {
    var sql = 'SELECT result.id, result.date, score.value, scoretype.name as scoretypename, testdata.path as testdatapath,' +
    'api.name as apiname, apitype.name as apitypename, testdatatype.name as datatypename, testdata.id as testdataid FROM RESULT as result ' +
    'INNER JOIN API as api on api.id = result.apiid ' +
    'INNER JOIN APITYPE as apitype on apitype.id = api.apitype ' +
    'INNER JOIN SCORE as score on score.resultid = result.id ' +
    'INNER JOIN TESTDATA as testdata on testdata.id = result.testdataid ' +
    'INNER JOIN TESTDATATYPE as testdatatype on testdatatype.id = testdata.datatype ' +
    'INNER JOIN SCORETYPE as scoretype on scoretype.id = score.scoretype ';
    db.query(sql, function (err, result) {
      if (err) {
        console.log(err);
        return;
      }
      res.json(result);
    });
    console.log("no Id");
    return;
  }
  var sql = 'SELECT result.id, result.date, score.value, scoretype.name as scoretypename, ' +
  'api.name as apiname, apitype.name as apitypename, testdatatype.name as datatypename FROM RESULT as result ' +
  'INNER JOIN API as api on api.id = result.apiid ' +
  'INNER JOIN APITYPE as apitype on apitype.id = api.apitype ' +
  'INNER JOIN SCORE as score on score.resultid = result.id ' +
  'INNER JOIN TESTDATA as testdata on testdata.id = result.testdataid ' +
  'INNER JOIN TESTDATATYPE as testdatatype on testdatatype.id = testdata.datatype ' +
  'INNER JOIN SCORETYPE as scoretype on scoretype.id = score.scoretype where result.id=' + id;
  db.query(sql, function (err, result) {
    if (err) console.log(err);
    res.json(result);
  });
});

app.get('/getTestData/:id?', function(req, res, next) {
  var id = req.params.id;
  if(!id) {
    var sql = 'SELECT testdata.id, testdata.path, testdatatype.name FROM TESTDATA as testdata ' +
    'INNER JOIN TESTDATATYPE as testdatatype on testdatatype.id = testdata.datatype ';
    db.query(sql, function (err, result) {
      if (err) {
        console.log(err);
        return;
      }
      res.json(result);
    });
    console.log("no Id");
    return;
  }
  var sql = 'SELECT testdata.id, testdata.path, testdatatype.name FROM TESTDATA as testdata ' +
  'INNER JOIN TESTDATATYPE as testdatatype on testdatatype.id = testdata.datatype where testdata.id=' + id;
  db.query(sql, function (err, result) {
    if (err) {
      console.log(err);
      return;
    }
    res.json(result);
  });
  console.log(id);
});


var runApiOnModules = function(modulesPromise, filePath) {
  return modulesPromise.then(function(modules) {
    var resultPromises = [];
    console.log(JSON.stringify(modules));
    _.each(modules, function(module) {
      var newModule = require(module.apimodulepath);
      console.log(module.apimodulepath);
      resultPromises.push(newModule.runAPI(filePath));
    });
    return Promise.all(resultPromises).then(function(results) {
      console.log("promises.all returns " + JSON.stringify(results));
      return results;
    });
  });
};

app.get('/runTest/:testDataId/:apiId', function(req, res, next) {
  var testDataId = req.params.testDataId;
  var apiId = req.params.apiId;
  console.log("valid route, testDataId: " + testDataId + " apiId: " + apiId);
  var filePath;
  var apiModulePath;
  var apiName;
  var dataType;

  var filePathPromise = new Promise(function(resolve, reject){
    var sql = 'SELECT path, datatype FROM TESTDATA where id=' + testDataId;
    db.query(sql, function (err, result) {
      if (err) {
        console.log(err);
        return;
      }
      resolve(result[0]);
    });
  });

  var modulesPromise;
  filePathPromise.then(function(testData) {
    modulesPromise = new Promise(function(resolve, reject) {
      var sql = 'SELECT apimodulepath, id, name FROM API where datatype = ' + testData.datatype + ' AND apitype=' + apiId;
      console.log("sql = " + sql);
      db.query(sql, function (err, result) {
        if (err) {
          console.log(err);
          return;
        }
        console.log(JSON.stringify(result));
        resolve(result);
      });
    });
    var returnValuePromise = runApiOnModules(modulesPromise, testData.path);
    return returnValuePromise.then(function(results){
      console.log("final result = " + JSON.stringify(results))

      _.each(results, function(singleApiResult, outerIndex) {
        console.log("single LADIES " + JSON.stringify(singleApiResult));
        //store these results
      var sql = 'INSERT INTO RESULT (apiid, testdataid, date) VALUES (' + singleApiResult[2] + ', ' + testDataId + ', Now())';
      console.log("married ladies" + sql);
      db.query(sql, function(err, result) {
        if(err) {
          console.log(err);
          return;
        }
        var sql = 'SELECT MAX(id) as id FROM RESULT';
        db.query(sql, function(err, result) {
          console.log("result: " + JSON.stringify(result));
          if(err) {
            console.log(err);
            return;
          }
          _.each(results[outerIndex], function(scoreResult, index) {
            if(index != 2) { 

              var scoreTypeArray = Object.keys(scoreResult);
              var scoreType = scoreTypeArray[0];

              console.log(scoreType);
            //replace this later with less of a kludge
              var scoreTypeValue;
              switch(scoreType) {
                case "speed":
                  scoreTypeValue = 1;
                 break;
                case "accuracy":
                  scoreTypeValue = 2;
                  break;
              }
              var sql = 'INSERT INTO SCORE (resultid, scoretype, value) VALUES (' + (result[0].id - 2 + outerIndex) + ', ' + scoreTypeValue + ', ' + scoreResult[scoreType] + ')';
              console.log(sql);
              db.query(sql, function(err, results) {
                if(err) {
                  console.log(err);
                  return;
                }
              });
            }
          });
        });
      });
      });
      
      //return the id of those results

      res.json(results);
    })
}).catch(function(error){
  console.error(error);
})
});

// start server
http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening at port:' + port);
});

function createTable() {
  var sql = 'CREATE TABLE IF NOT EXISTS posts ('
    + 'id INTEGER PRIMARY KEY AUTO_INCREMENT,'
    + 'text text'
    + ');';
db.query(sql, function (err, result) {
  if (err) console.log(err);
});
console.log("created  posts table");


var sql = 'CREATE TABLE IF NOT EXISTS API ('
  + 'id INTEGER PRIMARY KEY AUTO_INCREMENT,'
  + 'name varchar(50),'
  + 'apitype INTEGER,'
  + 'datatype INTEGER,'
  + 'apimodulepath varchar(50)'
  + ');';
db.query(sql, function (err, result) {
  if (err) console.log(err);
});
console.log("created api table");

var sql = 'CREATE TABLE IF NOT EXISTS APITYPE ('
  + 'id INTEGER PRIMARY KEY AUTO_INCREMENT,'
  + 'name varchar(50)'
  + ');';
db.query(sql, function (err, result) {
  if (err) console.log(err);
});
console.log("created api type table");

var sql = 'CREATE TABLE IF NOT EXISTS TESTDATA ('
  + 'id INTEGER PRIMARY KEY AUTO_INCREMENT,'
  + 'path varchar(50),'
  + 'datatype INTEGER'
  + ');';
db.query(sql, function (err, result) {
  if (err) console.log(err);
});
console.log("created testdata table");

var sql = 'CREATE TABLE IF NOT EXISTS TESTDATATYPE ('
  + 'id INTEGER PRIMARY KEY AUTO_INCREMENT,'
  + 'name varchar(50)'
  + ');';
db.query(sql, function (err, result) {
  if (err) console.log(err);
});
console.log("created test data type table");

var sql = 'CREATE TABLE IF NOT EXISTS RESULT ('
  + 'id INTEGER PRIMARY KEY AUTO_INCREMENT,'
  + 'apiid INTEGER,'
  + 'testdataid INTEGER,'
  + 'date DATETIME'
  + ');';
db.query(sql, function (err, result) {
  if (err) console.log(err);
});
console.log("created result table");

var sql = 'CREATE TABLE IF NOT EXISTS SCORE ('
  + 'id INTEGER PRIMARY KEY AUTO_INCREMENT,'
  + 'resultid INTEGER,'
  + 'scoretype INTEGER,'
  + 'value INTEGER'
  + ');';
db.query(sql, function (err, result) {
  if (err) console.log(err);
});
console.log("created score table");

var sql = 'CREATE TABLE IF NOT EXISTS SCORETYPE ('
  + 'id INTEGER PRIMARY KEY AUTO_INCREMENT,'
  + 'name varchar(50)'
  + ');';
db.query(sql, function (err, result) {
  if (err) console.log(err);
});
console.log("created score type table");
}