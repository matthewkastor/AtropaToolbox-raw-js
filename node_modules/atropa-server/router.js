/*jslint indent: 4, maxerr: 100, node: true sloppy: true, white: true */
var fs, path;

fs = require('fs');
path = require('path');

function route(handle, pathname, response, request) {
	console.log('Routing request for ' + pathname);
    var location, locationIsFile, locationIsDirectory;
    
    locationIsFile = false;
    locationIsDirectory = false;
    location = path.normalize(__dirname + '/../../' + pathname);
    
	if (fs.existsSync(location)) {
        if(fs.statSync(location).isFile()) {
            locationIsFile = true;
        }
        if(fs.statSync(location).isDirectory()) {
            locationIsDirectory = true;
        }
    }
    
    if(locationIsFile) {
        handle.file(response, request, location);
    } else if(locationIsDirectory) {
		handle.dir(response, request, location);
	} else {
		console.log('No request handler forund for ' + pathname);
		response.writeHead(404, {'Content-Type' : 'text/plain'});
		response.write('404 Not found');
		response.end();
	}
}

exports.route = route;