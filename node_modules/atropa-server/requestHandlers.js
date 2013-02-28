/*jslint
    indent: 4,
    maxerr: 100,
    node: true sloppy: true,
    white: true,
    stupid: true
*/

var fs, path, querystring, url, mime;

fs = require('fs');
path = require('path');
querystring = require('querystring');
url = require('url');
mime = require('mime');

function dirList (location) {
    var links = fs.readdirSync(location).map(function (listing) {
        var link, whatever;
        
        link = '';
        whatever = fs.statSync(path.normalize(location + '/' + listing));
        
        if(whatever.isFile()) {
            link = '<a href="./' + listing + '">' + listing + '</a><br>';
        }
        if(whatever.isDirectory()) {
            link = '<a href="./' + listing + '/">' + listing + '</a><br>';
        }
        return link;
    });
    return '<p>' + links.join('') + '</p>';
}

function autoindex (response, request, location) {
    response.writeHead(500, {
        'Content-Type' : 'text/html'
    });
    response.write(dirList(location));
    response.end();
}

function redirect (response, request, toLocation) {
    console.log('redirecting to ' + toLocation);
    response.writeHead(301, {
        'Location' : toLocation.replace(/\/\//g, '/')
    });
    response.end();
}

function dir(response, request, location) {
	console.log('request handler "dir" was called');
    var lastCharIsSlash;
    
    lastCharIsSlash = location.charAt(location.length - 1);
    lastCharIsSlash = (lastCharIsSlash === '/' || lastCharIsSlash === '\\');
    
    if(lastCharIsSlash === false) {
        // redirect if directory location is missing trailing slash
        redirect(
            response,
            request,
            decodeURIComponent(url.parse(request.url).pathname) + '/'
        );
    } else if (fs.existsSync(path.normalize(location + '/index.html'))) {
        // redirect to index if it exists
        redirect(
            response,
            request,
            decodeURIComponent(url.parse(request.url).pathname) + '/index.html'
        );
    } else {
        // show directory listing
        autoindex(response, request, location);
    }
}

function respondWithFileContents(response, path, contentType) {
    if(contentType) {
        contentType = {'Content-Type' : contentType};
    } else {
        contentType = {'Content-Type' : mime.lookup(path)};
    }
	fs.readFile(path, 'binary', function (error, file) {
		if (error) {
			response.writeHead(500, {
				'Content-Type' : 'text/plain'
			});
			response.write(error + '\n');
			response.end();
		} else {
			response.writeHead(200, contentType);
			response.write(file, 'binary');
			response.end();
		}
	});
}

function file (response, request, fileLocation) {
    console.log('request handler "file" was called');
    respondWithFileContents(response, fileLocation);
}

exports.file = file;
exports.dir = dir;