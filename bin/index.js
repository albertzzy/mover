#!/usr/bin/env node 

var fork = require('child_process').fork;
var path = require('path');

var child = fork(path.join(__dirname, '..', 'app'), process.argv.slice(2));

child.once('exit',()=>{
	console.log('process exited');
})