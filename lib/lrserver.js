var config = require('../config');
var chokidar = require('chokidar');
var path = require('path');
var WebSocketServer = require('ws').Server;


function websocket(server) {
    var wss = new WebSocketServer({
        server: server
    });

    wss.on('connection', function connection(ws) {
        ws.on('message', function incoming(message) {
            console.log('received: %s', message);
        });
    });

    wss.broadcast = function broadcast(data) {
        wss.clients.forEach(function each(client) {
            client.send(data, function(error) {
                if (error) {
                    console.log(error);
                }
            });
        });
    };

    var watchDirs = config.statics;
    watchDirAndBroadcast(watchDirs, wss);
    server.wss = wss;
}

function watchDirAndBroadcast(dir, wss) {
    // 执行git命令的时候不知为何.gitignore会触发change
    chokidar.watch(dir, {
        ignored: ['**/.git/**', '**/node_modules/**', '**/.gitignore']
    }).on('change', function(changePath) {
        wss.broadcast(path.basename(changePath));
    });
}

module.exports = function(server) {
    return function* (next) {

        if (config.hot) {

            websocket(server);

        }

        yield next;
    }
}
