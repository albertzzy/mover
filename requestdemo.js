var http = require('http');
var request = require('request');


var options = {
	hostname: 'koajs.com',
	port: 80,
	path: '/public/style.css',
	method: 'GET'
}

http.request(options,(res)=>{
	res.setEncoding('utf8');

	res.on('data',(data)=>{
		console.log(data);
	})

	res.on('end',()=>{
		console.log('completed!!!!!!!!!');
	})

})	

/*request('http://koajs.com/public/style.css', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body)
  }
})*/