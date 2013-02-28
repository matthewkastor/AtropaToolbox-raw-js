/*jslint indent: 4, maxerr: 100, node: true sloppy: true, white: true */

var http = require("http"),
    url = require('url');

function start(route, handle, port) {
    function onRequest(request, response) {
        var pathname = decodeURIComponent(url.parse(request.url).pathname);
        console.log('Request received for ' + pathname);
        route(handle, pathname, response, request);
    }
    
    http.createServer(onRequest).listen(port);
    console.log('Server Started on port ' + port);
    console.log('Press ctrl+c to quit.');
}

exports.start = start;
