var https = require('https');
var diff = require("./../diffing/diffCalc.js");

module.exports.runAPI = function(filePath) {
	console.log("running hpapi");
	var apiKey = "b0b581c0-fda6-4ba0-a095-24cec3249022";
	var text = "Mis pantalones son muchos grandes"
	var apiPath = "/0/api/sync/identifylanguage/v1?text=" + text + "&apikey=" + apiKey;



	var promise = new Promise(function(resolve, rej) {
		console.log("fuck3");
		var startTime = Date.now();

		    var parts = url.parse(service_url +'/v1/txtlid');
			// create the request options to POST our question to Watson

			var options = { host: parts.hostname,
			    port: parts.port,
			    path: parts.pathname,
			    method: 'POST',
			    headers: {
			      'Content-Type'  :'application/json',
			      'Accept':'application/json',
			      'X-synctimeout' : '30',
			      'Authorization' :  auth }
			  };

			// Create a request to POST to Watson
			var watson_req = https.request(options, function(result) {
			    result.setEncoding('utf-8');
			    var response_string = '';

			    result.on('data', function(chunk) {
			      response_string += chunk;
			    });

			    result.on('end', function() {

			    	var json = JSON.parse(body);
		        	console.log("Got response: ", JSON.stringify(json));

		        	var percentage = diff(json.language, "spanish");
		        	var speed = Date.now() - startTime;
		   			resolve([{speed: speed, accuracy: percentage}]);

			      	var answers_pipeline = JSON.parse(response_string),
			        answers = answers_pipeline[0];
			     	return res.render('index',{'questionText': req.body.questionText, 'answers': answers})
			   })
		});

	//resolve([{speed: 1000}, {accuracy: 89}]);
	});
	return promise;
}
