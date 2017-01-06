var koa = require('koa');
var koaStatic = require('koa-static');
// var proxy = require('koa-proxy');

var proxy = require('./lib/proxy');
var config = require('./config');
var mock = require('./lib/mock');
var client = require('./lib/client');

var app = koa();



// 反向代理 -- before static
app.use(proxy);


// static
// app.use(client);
app.use(koaStatic(config.statics||'./statics'));


// async mock
app.use(mock);




app.listen(config.port||8080,()=>{
	console.log('app is listening at '+config.port);
})