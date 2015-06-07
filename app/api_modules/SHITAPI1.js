module.exports.runAPI = function(filePath){
	var promise = new Promise(function(resolve, rej) {
		resolve([{speed: Math.floor(Math.random() * 10000)}, {accuracy: Math.floor(Math.random() * 100)}, 4]);
	});
	return promise;
}