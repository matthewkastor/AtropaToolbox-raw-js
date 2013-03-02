/*jslint indent: 4, maxerr: 100, node: true sloppy: true, white: true */

var server           = require('./server.js'),
    router           = require('./router.js'),
    requestHandlers  = require('./requestHandlers.js'),
    port             = 8888;
    
function start (userPort) {
    userPort = userPort || 8888;
    server.start(router.route, requestHandlers, userPort);
}

exports.start = start;
