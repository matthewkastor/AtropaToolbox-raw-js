/*jslint
node : true,
white : true,
nomen : true
*/
var JasmineSpecRunnerGenerator = require(
    'atropa-jasmine-spec-runner-generator-html');

var specRunner = new JasmineSpecRunnerGenerator(
    'jasmine/', 'browser/atropa-toolbox_tests.html', 'Atropa Toolbox Tests');

specRunner.addSources('browser/', '');

specRunner.addSpecs('browser/tests/', 'tests/');

specRunner.addSpecs('node_modules/atropa-ArgsInfo/browser/tests/', '../node_modules/atropa-ArgsInfo/browser/tests/');
specRunner.addSpecs('node_modules/atropa-arrays/browser/tests/', '../node_modules/atropa-arrays/browser/tests/');
specRunner.addSpecs('node_modules/atropa-Babbler/browser/tests/', '../node_modules/atropa-Babbler/browser/tests/');
specRunner.addSpecs('node_modules/atropa-CookieMonster/browser/tests/', '../node_modules/atropa-CookieMonster/browser/tests/');
specRunner.addSpecs('node_modules/atropa-CreateHtmlDocumentsFromXmlhttp/browser/tests/', '../node_modules/atropa-CreateHtmlDocumentsFromXmlhttp/browser/tests/');
specRunner.addSpecs('node_modules/atropa-customErrors/browser/tests/', '../node_modules/atropa-customErrors/browser/tests/');
specRunner.addSpecs('node_modules/atropa-header/browser/tests/', '../node_modules/atropa-header/browser/tests/');
specRunner.addSpecs('node_modules/atropa-HTMLParser/browser/tests/', '../node_modules/atropa-HTMLParser/browser/tests/');
specRunner.addSpecs('node_modules/atropa-inject/browser/tests/', '../node_modules/atropa-inject/browser/tests/');
specRunner.addSpecs('node_modules/atropa-inquire/browser/tests/', '../node_modules/atropa-inquire/browser/tests/');
specRunner.addSpecs('node_modules/atropa-objects/browser/tests/', '../node_modules/atropa-objects/browser/tests/');
specRunner.addSpecs('node_modules/atropa-random/browser/tests/', '../node_modules/atropa-random/browser/tests/');
specRunner.addSpecs('node_modules/atropa-regex/browser/tests/', '../node_modules/atropa-regex/browser/tests/');
specRunner.addSpecs('node_modules/atropa-removeNodeByReference/browser/tests/', '../node_modules/atropa-removeNodeByReference/browser/tests/');
specRunner.addSpecs('node_modules/atropa-Requester/browser/tests/', '../node_modules/atropa-Requester/browser/tests/');
specRunner.addSpecs('node_modules/atropa-SerialActor/browser/tests/', '../node_modules/atropa-SerialActor/browser/tests/');
specRunner.addSpecs('node_modules/atropa-setAsOptionalArg/browser/tests/', '../node_modules/atropa-setAsOptionalArg/browser/tests/');
specRunner.addSpecs('node_modules/atropa-string/browser/tests/', '../node_modules/atropa-string/browser/tests/');
specRunner.addSpecs('node_modules/atropa-TextAnalyzer/browser/tests/', '../node_modules/atropa-TextAnalyzer/browser/tests/');
specRunner.addSpecs('node_modules/atropa-url/browser/tests/', '../node_modules/atropa-url/browser/tests/');
specRunner.addSpecs('node_modules/atropa-waitFor/browser/tests/', '../node_modules/atropa-waitFor/browser/tests/');
specRunner.addSpecs('node_modules/atropa-wtf/browser/tests/', '../node_modules/atropa-wtf/browser/tests/');
specRunner.addSpecs('node_modules/atropa-xpath/browser/tests/', '../node_modules/atropa-xpath/browser/tests/');

//specRunner.generate(console.log);

/*
*/
specRunner.generateFile(
    function () {
        console.log('ok');
    }
);