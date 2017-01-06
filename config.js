module.exports = {
	port:80,
	statics:'./statics',
	mocks:[
		{
			path:'/getInfo',
			response:require('./mocks/getInfo.json'),
			delay:1000,
			method:'get'
		}
	],
	proxy:{
		path:/style/,
		target:'koajs.com',
		port:80
	}
	
}