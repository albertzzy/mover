var config = require('../config');


module.exports = function* (next){
	var request = this.request;
	var path = request.path;
	var mocks = config.mocks;

	var promiseDelayThunk = delay=>content=>{
		return new Promise((resolve,reject)=>{
			setTimeout(()=>{
				resolve(content)
			},delay)
		})
	}


	for(var mk of mocks){
		if(path === mk.path){
			if(mk.delay){

				var promise = promiseDelayThunk(1000)(mk.response)

				.then((content)=>{

					this.body = content;
				})
				.catch(()=>{

					this.body = {};

				})

				yield promise;

			}else{

				this.body = mk.response;

			}

		}
	}

	yield next;

}
