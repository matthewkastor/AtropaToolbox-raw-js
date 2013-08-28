var fs = require('fs');
var loc = __dirname + '/../test/enabled/';
var jsdom = require('jsdom');
// javascript written for the browser expects global
// window and document objects
var document = global.document = jsdom.jsdom('', null, {
    features: {
        FetchExternalResources : false,
        ProcessExternalResources : ["script"]
    }
});

var window = global.window = document.parentWindow;
window.console = console;


// The `global.window` and `global.document`
// assignments aren't strictly necessary
// but they're convenient because they'll
// allow you to `require` plain old javascript
// files and have them act on your window and
// document objects without altering the plain
// old javascript files.

var atropa = require(__dirname + '/../../src/AtropaToolbox.js');

fs.readdirSync(loc).forEach(function (item) {
    eval(fs.readFileSync(loc + item, 'utf8'));
});