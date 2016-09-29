var express = require('express');
var app = express();
var port = 8000;











module.exports = function(){
	app.listen(port,function(){
		console.log('app is listening on '+port);
	});
}