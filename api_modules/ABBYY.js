var fs = require('fs');
var diff = require("./../diffing/diffCalc.js");
var _ = require("underscore");

function runABBYY(filePath){
  var isItDone = null;
  var waitPromise = new Promise(function(resolve, rej){
    isItDone = resolve;
  });

    // Demo sample using ABBYY Cloud OCR SDK from Node.js
    process.argv[0] = "node";

  if (typeof process == 'undefined' || process.argv[0] != "node") {
    throw new Error("This code must be run on server side under NodeJS");
  }

  // To create an application and obtain a password,
  // register at http://cloud.ocrsdk.com/Account/Register
  // More info on getting your application id and password at
  // http://ocrsdk.com/documentation/faq/#faq3

  // Name of application you created
  var appId = 'APIComparator';
  // Password should be sent to your e-mail after application was created
  var password = 'PzIqc5u0KXDc5aDfvAUDgZOP';

  var imagePath = filePath;
  var outputPath = 'result.txt';

  try {
    console.log("ABBYY Cloud OCR SDK Sample for Node.js");

    var ocrsdkModule = require('./ocrsdk.js');
    var ocrsdk = ocrsdkModule.create(appId, password);
    ocrsdk.serverUrl = "http://cloud.ocrsdk.com"; // change to https for secure connection

    if (appId.length == 0 || password.length == 0) {
      throw new Error("Please provide your application id and password!");
    }
    
    if( imagePath == 'myFile.jpg') {
      throw new Error( "Please provide path to your image!")
    }

    function downloadCompleted(error) {
      if (error) {
        console.log("Error: " + error.message);
        return;
      }
      console.log("Done.");
      isItDone();
    }

    function processingCompleted(error, taskData) {
      if (error) {
        console.log("Error: " + error.message);
        return;
      }

      if (taskData.status != 'Completed') {
        console.log("Error processing the task.");
        if (taskData.error) {
          console.log("Message: " + taskData.error);
        }
        return;
      }

      console.log("Processing completed.");
      console.log("Downloading result to " + outputPath);

      ocrsdk
          .downloadResult(taskData.resultUrl.toString(), outputPath,
              downloadCompleted);
    }

    function uploadCompleted(error, taskData) {
      if (error) {
        console.log("Error: " + error.message);
        return;
      }

      console.log("Upload completed.");
      console.log("Task id = " + taskData.id + ", status is " + taskData.status);
      if (!ocrsdk.isTaskActive(taskData)) {
        console.log("Unexpected task status " + taskData.status);
        return;
      }

      ocrsdk.waitForCompletion(taskData.id, processingCompleted);
    }

    var settings = new ocrsdkModule.ProcessingSettings();
    // Set your own recognition language and output format here
    settings.language = "English"; // Can be comma-separated list, e.g. "German,French".
    settings.exportFormat = "txt"; // All possible values are listed in 'exportFormat' parameter description 
                                     // at http://ocrsdk.com/documentation/apireference/processImage/

    console.log("Uploading image..");
    ocrsdk.processImage(imagePath, settings, uploadCompleted);

  } catch (err) {
    console.log("Error: " + err.message);
  }

  return waitPromise;
}


function jReadFile(filePath){
  return new Promise(function(resolve, reject){
    fs.readFile(filePath, 'utf8',function(err, data){
      if(err){
        reject(err);
      }
      resolve(data);
    });
  });
}

function jRunAPI(filePath){
  return jReadFile(filePath+'/test.csv').then(function(data){
    var lines = data.split('\n');
    var resourceArray = [];
    //console.log("FirstLOG"+JSON.stringify(lines));
    _.each(lines, function(line){
      //console.log("Processing Line:"+JSON.stringify(line));
      var resource = [line.substr(0, line.indexOf(',')), line.substr(line.indexOf(',') + 1)];
      //probably need to remove quotes n shit
      var imagePath = filePath + "/" + resource[0].replace(/"/g, '');
      var expectedText = resource[1];
      resourceArray.push([imagePath, expectedText]);
    });
    var promiseChain = Promise.resolve();
    var count = 0;
    var total = [0, 0]; 
    _.each(resourceArray, function(resource){
      var expectedText = resource[1];
      var startTime = Date.now();
      console.log("filepath"+resource[0]);
      promiseChain = promiseChain.then(function(){
        return runABBYY(resource[0]);
      });
      promiseChain = promiseChain.then(function(){ 
        return jReadFile('./result.txt').then(function(data){
          var accuracy = diff(JSON.stringify(data), expectedText);
          var result = [Date.now()-startTime, accuracy];
          console.log
          total[0] += result[0];
          total[1] += result[1];
          count++;
        });
      });
    });
    return promiseChain.then(function(){
      return {total: total, count: count};
    });
  }).then(function(obj){
    return [{speed: obj.total[0]/obj.count}, {accuracy: (obj.total[1]/obj.count) * 100}, 2];
  }).catch(function(err){
    console.log(err);
  });
}

module.exports.runAPI = jRunAPI;