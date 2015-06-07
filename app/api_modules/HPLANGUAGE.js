var https = require('https');
var diff = require("./../diffing/diffCalc.js");

module.exports.runAPI = function(filePath) {
	console.log("running hpapi");
	var apiKey = "b0b581c0-fda6-4ba0-a095-24cec3249022";
	var text = "Mis pantalones son muchos grandes"
	var apiPath = "https://api.idolondemand.com/1/api/sync/identifylanguage/v1?text=" + text + "&apikey=" + apiKey;

	var promise = new Promise(function(resolve, rej) {
		console.log("fuck3");
		var startTime = Date.now();
		
		https.get(apiPath, function(res) {

			var body = '';
		    res.on('data', function(chunk) {
		        body += chunk;
		    });

		    res.on('end', function() {
		        var json = JSON.parse(body);
		        console.log("Got response: ", JSON.stringify(json));

		        var percentage = diff(json.language, "spanish");
		        var speed = Date.now() - startTime;
		   		resolve([{speed: speed, accuracy: percentage}, 5]);
		    });
		});

	//resolve([{speed: 1000}, {accuracy: 89}]);
	});
	return promise;
}
