var chokidar = require('chokidar');
var path = require('path');
var config = require('../config');

module.exports = function(app){
	return function* (next){
		var self = this;

		if (config.hot) {
			// chat socket
			app.chat.on( 'connection', ctx => {

			  ctx.socket.emit('message','[lr]:live reload is on');

			});


			
			app.chat.broadcast( 'message', {

			  numConnections:app.chat.connections.size

			});



			// watch files
			chokidar.watch(config.statics, {

		        ignored: ['**/.git/**', '**/node_modules/**', '**/.gitignore']

		    }).on('change', function(changePath) {

		        app.chat.broadcast('lr',path.basename(changePath));

		    });

        }

        yield next;

	}
}