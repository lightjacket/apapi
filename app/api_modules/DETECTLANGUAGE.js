var http = require('http');
var diff = require("./../diffing/diffCalc.js");

module.exports.runAPI = function(filePath) {
	console.log("running hpapi");
	var apiKey = "e299781b8ea53a97a8e8d38029cbe144";
	var text = "Mis pantalones son muchos grandes"
	var apiPath = "http://ws.detectlanguage.com/0.2/detect?q[]="+text+"&key="+apiKey;

	var promise = new Promise(function(resolve, rej) {
		console.log("fuck3");
		var startTime = Date.now();
		
		http.get(apiPath, function(res) {

			var body = '';
		    res.on('data', function(chunk) {
		        body += chunk;
		    });

		    res.on('end', function() {
		        var json = JSON.parse(body);
		        console.log("Got response: ", JSON.stringify(json));

		        var percentage = diff(json.data.detections[0][0].language, "es");
		        var speed = Date.now() - startTime;
		   		resolve([{speed: speed, accuracy: percentage*100}, 6]);
		    });
		});

	//resolve([{speed: 1000}, {accuracy: 89}]);
	});
	return promise;
}
