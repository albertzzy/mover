var http = require('http');
var request = require('request');
var config = require('../config');



module.exports = function* (next){
	if(!(config.proxy && config.proxy.path.test(this.url))){

		yield next;

	}else{

		var promise = new Promise((resolve,reject)=>{
			request(`http://${config.proxy.target}${this.url}`,(error,res,body)=>{

				if(!error && res.statusCode == 200){

					resolve(body)
					
				}else{

					reject(error)

				}
				
			});
		}).then((body)=>{
			
			// res.pipe(this.res);
			this.body = body;


		}).catch((err)=>{
			console.log(err);
		})

		yield promise;

	}

}
