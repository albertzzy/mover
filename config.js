module.exports = {
	port:80,
	statics:'./statics/public/',
	mocks:[
		{
			path:'/json/getInfo',
			response:require('./mocks/getInfo.json'),
			delay:1000,
			method:'get'
		}
	],
	proxy:{
		path:/style/,
		target:'koajs.com/public',
		port:80
	},
	hot:true
	
}