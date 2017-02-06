var http = require('http');
var koa = require('koa');
var koaStatic = require('koa-static');
const IO = require( 'koa-socket' );
// const io = new IO();
const chat = new IO('chat');


var proxy = require('./lib/proxy');
var config = require('./config');
var mock = require('./lib/mock');
var staticServer = require('./lib/staticServer');
var liveReload = require('./lib/sio_server');


var app = koa();

// io.attach(app);
chat.attach(app);


// 反向代理 -- before static
app.use(proxy);


// static
// live-reload client and pages
app.use(staticServer);
// other static files
app.use(koaStatic(config.statics||'./statics'));


// async mock
app.use(mock);


// live reload
app.use(liveReload(app));



app.listen(config.port||8080,()=>{
	console.log('app is listening at '+config.port);
})