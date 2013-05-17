/*jslint indent: 4, maxerr: 50, white: true, node: true, stupid: true */

var cmd, syncy, asyncy;


cmd = require('atropa-cmd');
syncy = new cmd.commandRegister.Synchronous('Syncy');
asyncy = new cmd.commandRegister.Asynchronous('Asyncy');
showOffCommandRegister(syncy);
showOffCommandRegister(asyncy);

function showOffCommandRegister(register) {
    register.on('command queue begin process', function(e) {
        console.log('command queue begin process');
        console.dir(e);
        console.log();
    });
    register.on('command executing', function(e) {
        console.log('command executing');
        console.dir(e);
        console.log();
    });
    register.on('command complete', function(e) {
        console.log('command complete');
        console.dir(e);
        console.log();
    });
    register.on('waiting for commands to complete', function(e) {
        console.log('waiting for commands to complete');
        console.dir(e);
        console.log();
    });
    register.on('command queue processed', function(e) {
        console.log('command queue processed');
        console.dir(e);
        console.log();
    });
    
    function logOutput(err, stdout, stderr) {
        if(stdout) {
            console.log(stdout);
        }
        if(stderr) {
            console.error(stderr);
        }
        if(err) {
            console.error(err);
        }
    }

    register.addCommand('dir', 'C:\\Users\\kastor\\Desktop', logStdout);
    register.addCommand('ping google.com', null, logStdout);
    register.process();
}