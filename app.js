var http = require('http');
var koa = require('koa');
var koaStatic = require('koa-static');


var proxy = require('./lib/proxy');
var config = require('./config');
var mock = require('./lib/mock');
var staticServer = require('./lib/staticServer');
var liveReloadServer = require('./lib/live-reload-server');



var app = koa();




// 反向代理 -- before static
// app.use(proxy);


// static
// live-reload client and pages
app.use(staticServer);
// other static files
app.use(koaStatic(config.statics||'./statics'));


// async mock
app.use(mock);


// live reload
app.use(liveReloadServer);


app.listen(config.port||8080,()=>{
	console.log('app is listening at '+config.port);
})