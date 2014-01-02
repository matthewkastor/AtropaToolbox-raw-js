var path = require('path');
var atropaServer = require('atropa-server');
// starting the server on port 9999
// an optional second parameter for setting the server root
// as an absolute path may be specified. The server root 
// defaults to `path.dirname(process.mainModule.filename)`
atropaServer.start(9999, path.join(__dirname, '../'));