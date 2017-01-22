var config = require('../config');
var chokidar = require('chokidar');
var path = require('path');


function createEventStream(heartbeat){

	/*var clientID = 0;
	var clients = {};

	function everyClient(fn){
		Object.keys(clients).forEach(function(id){
			fn(clients[id]);
		})
	}

	setInterval(function(){
		everyClient(function(client){
			client.write('data: hi \n\n');
		})
	},heartbeat)*/

	return {
		handler: function() {


			this.socket.setKeepAlive(true);

			this.type = 'text/event-stream';
			/*this.set({
				'Access-Control-Allow-Origin': '*',
				'Cache-Control': 'no-cache, no-transform',
				'Connection': 'keep-alive'
			});*/
			this.status = 200;

			this.body = '\n';

			// var id = clientID++;
			// clients[id] = this.res;

			this.req.on("close", function(){
				// delete clients[id];
			});

		},
		publish: function(payload) {

			// everyClient(function(client){

				this.body = "data: " + JSON.stringify(payload) + "\n\n";

			// });

		}
	}


}


var eventStream = createEventStream(1000);


module.exports = function* (next){
	var url = this.request.url;

	if(!config.hot){
		yield next;
	}else{

		if(/\.html$/.test(url) || /json|lr/.test(url)){

			yield next;

		}else{

			eventStream.handler.call(this);



			chokidar.watch(config.statics).on('change',(changedPath)=>{

				console.log(changedPath);

				var payload = {
					event:'change',
					data:path.basename(changedPath)
				};

				eventStream.publish.call(this,payload);

			})


			yield next;

		}

	}
	

}