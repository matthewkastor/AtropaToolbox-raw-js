A simple http server for node.

This is a rough draft, really rough. I believe I've got autoindexing
working properly. I've also put in some redirection logic so that the current
URL will always end with either a file name or trailing slash. This is to ensure
that relative links will work in the autoindex pages.

The web root is the folder containing your node_modules folder. This server
automatically finds index.html if given a directory. This server uses the mime
module to automatically serve files with the proper content type. See the
documentation on the mime module for instructions on adding custom mime types.

# Basic Usage

Set up a node project with the simplest structure possible:

```
myProjectFolder
  |
  ____node_modules
  |       |
  |       ____atropa_server
  |
  |___index.html
  |
  ____myNode.js
```

Then in index.html put whatever html content you want.

In myNode.js do:
```
var atropaServer = require('atropa-server');
// starting the server on port 9999
atropaServer.start(9999);
```

After that run `node myNode.js` and open a web browser to 
`http://localhost:9999` and whatever content you've put into index.html will 
magically appear!