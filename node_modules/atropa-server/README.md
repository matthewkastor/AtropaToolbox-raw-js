# Atropa Server

A simple http server for node with autoindexing and lazy module loading.

Overwhelmed by enterprise level server modules like Express and Flatiron?
 Me too. I don't want to read an entire dictionary and hire a team of developers
 to support my applications so, I rolled my own dead simple server. The
 main idea here is that Atropa Server will be as easy to use as just dropping
 files into a directory and requesting them in the browser. No crazy routing,
 no convoluted templating systems crammed down your throat, and absolutely no
 overarching philosophy on how your application should be structured. Just do
 whatever the hell you want without screwing around for hours re-learning how
 to do what you already know how to do.

So, you're probably wondering just how easy it is to get set up with the Atropa
 Server. Well, you just run `npm install atropa-server` and you're all set. Toss
 your HTML files in your project folder and run
 `"node_modules/.bin/atropa-server" 8888 .` The prompt will tell you the address
 and port your server is running on. If you've got an `index.html` file in your
 project folder then the server will find it and serve it up or, you'll see an
 absolutely beautiful listing of your project's files and directories. As an
 added bonus, this server uses the [mime module](https://npmjs.org/package/mime)
 to automatically serve files with the proper content type. See the
 documentation on the mime module for instructions on adding custom mime types.
 To specify a different port, change `8888` in the example to a different port
 number. To specify a different root directory for your webserver change the
 second parameter from `.` to an absolute path.

Now I know what you're thinking, "sure, static files are all fine and good
 but..." Don't worry, you can have dynamically generated content and it's dead
 simple too! You just write up regular javascript files but instead of using the
 extension `js`, use `jsn`. The only requirement is that `jsn` files export a
 single function that accepts two parameters. The first parameter given
 to the function will be the `response` object, which you will use to send your
 server's response to arbitrary requests made to your `jsn` file. The second
 parameter given to the function will be the `request` object, jam packed with
 everything you'll ever want to know about the request made to your server.
 For an example of a basic `jsn` file scroll down. For details on the `request`
 object see [http://nodejs.org/api/http.html#http_http_incomingmessage](http://nodejs.org/api/http.html#http_http_incomingmessage).
 For details on the `response`object see [http://nodejs.org/api/http.html#http_class_http_serverresponse](http://nodejs.org/api/http.html#http_class_http_serverresponse).

# Basic Usage

Set up a node project with the simplest structure possible:

Note that there is a full example project you can copy and run `npm install`,
 `npm start` on. It's in the examples folder.

```
myProjectFolder
  |
  |___node_modules
  |       |
  |       |___atropa_server
  |
  |___index.html
  |
  |___server.js
  |
  |___serverSideJavaScript.jsn
  |
  |___package.json
```

In index.html put whatever html content you want.

In server.js do:
```
var atropaServer = require('atropa-server');
// starting the server on port 9999
// an optional second parameter for setting the server root
// as an absolute path may be specified. The server root 
// defaults to `path.dirname(process.mainModule.filename)`
atropaServer.start(9999);
```

In serverSideJavaScript.jsn do:
```
module.exports = function (response, request) {
    // change text/plain to text/html if you're sending html
    // change text/plain to application/json if you're sending json
    response.writeHead(200, {'Content-Type' : 'text/plain'});
    response.write('hello', 'utf8');
    response.end();
};
```

After that run `node server.js` and open a web browser to
 `http://localhost:9999` and whatever content you've put into index.html will
 magically appear! Navigate to `http://localhost:9999/serverSideJavaScript.jsn`
 and BANG! you'll see the wonderful wonderment of dynamically lazily loading
 your module. Go ahead and make all the `jsn` files you want and name them
 whatever you want. They'll be cached the first time they're called so they
 don't cost anything until they're needed and only cost something once! Of
 course any changes to `jsn` files will require you to restart the server if the
 changed file has been cached already.


Enjoy!


☭ Hial Atropa!! ☭