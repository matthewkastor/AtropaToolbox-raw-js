var fs = require('fs');

var loc = __dirname + '/../test/enabled/';

var atropa = require(__dirname + '/../../src/AtropaToolbox.js');

fs.readdirSync(loc).forEach(function (item) {
    eval(fs.readFileSync(loc + item, 'utf8'));
});




