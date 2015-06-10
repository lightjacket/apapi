var https = require('https');
var diff = require("./../diffing/diffCalc.js");
var _ = require('underscore');
var restler = require('restler');

var apiKey = "b0b581c0-fda6-4ba0-a095-24cec3249022";

module.exports.runAPI = function(filePath) {
	var resolveLastPromise, rejectLastPromise;
	var lastPromise = new Promise(function(res, rej){resolveLastPromise = res; rejectLastPromise = rej;});
	var promiseArray = [];
	var fs = require('fs');
	fs.readFile(filePath + '/test.csv', 'utf8', function(err, data) {
		if(err) {
			console.log(err);
			return;
		}
		console.log(data);
		var res = data.split('\n');
		var count = 0;
		var total = [0,0];

		_.each(res, function(line) {
			var imagePart = line.substr(0, line.indexOf(','));
			var exactTextPart = line.substr(line.indexOf(',') + 1);
			var imagePath = filePath + '/' + imagePart.replace(/"/g, '');
			var expectedText = exactTextPart;

			var promise = new Promise(function(resolve, rej) {
				var startTime = Date.now();
				console.log(imagePath);
				fs.stat(imagePath, function(err, stats) {
					console.log("stats" + stats);
					var apiPath = "https://api.idolondemand.com/1/api/sync/ocrdocument/v1";
					restler.post(apiPath, {
						multipart: true,
						data: {
							apikey: apiKey,
							file: restler.file(imagePath, null, stats.size, null, 'image/jpg')
						}
					}).on("complete", function(data) {
						console.log("Got response: ", JSON.stringify(data));
						var json = JSON.stringify(data.text_block[0].text);
						console.log(json);
						var accuracy = diff(json, expectedText);
						console.log("accuracy" + accuracy);
						var speed = Date.now() - startTime;
						count++;
						total[0] += speed;
						total[1] += accuracy;
						resolve([{speed: speed}, {accuracy: accuracy}]);
					 // var json = JSON.parse(body);
			   //      //console.log("Got response: ", JSON.stringify(json));
			   //      var json = JSON.stringify(json.text_block[0].text);

			   //      var percentage = diff(JSON.stringify(json), expectedText);
			   //      
			   // 		resolve({speed: speed, accuracy: percentage});
					});
				});
			});
			promiseArray.push(promise);
		});
		console.log('promise array: ', promiseArray);
		resolveLastPromise(promiseArray);
	});
	console.log(filePath);


	return lastPromise.then(function(promiseArray) { 
		return Promise.all(promiseArray).then(function(data) {
			var count = data.length;
			var allSpeeds = _.map(data, function(stupidArray) {
				return stupidArray[0].speed;
			});
			var allAccuracies = _.map(data, function(stupidArray) {
				return stupidArray[1].accuracy;
			});
			var totalSpeed = _.reduce(allSpeeds, function(memo, num) {
				return memo+num;
			}, 0);
			var totalAccuracy = _.reduce(allAccuracies, function(memo, num) {
				return memo+num;
			}, 0);

			return ([{speed: totalSpeed/count}, {accuracy: (totalAccuracy/count)  * 100}, 1]);
		});
	});
}
