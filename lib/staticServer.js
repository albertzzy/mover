// var koaStatic = require('koa-static');
var path = require('path');
var config = require('../config');
var fs = require('fs');


var resolve = path.resolve;

module.exports = function* (next){

	if(this.url.indexOf('/sio_client.js')>-1){

		var clientJS = resolve('./lib/sio_client.js');

		this.body = fs.readFileSync(clientJS,'utf8'); 

		// yield next;

	}else if(/\.html$/.test(this.url)){

		var origin = this.request.origin;
		
		var content = fs.readFileSync('./statics/index.html','utf8');

		if(config.hot){

			content = content.replace(`</body>`,`<script src="${origin}/lr/sio_client.js" async defer></script></body>`);

		}

		this.body = content;

		// yield next;

	}



	yield next;

}