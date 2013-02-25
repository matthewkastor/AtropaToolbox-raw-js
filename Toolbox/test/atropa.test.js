/**
 * Test Failure Error
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130221
 * @class Test Failure Error
 * @param {String} message Optional. The error message to send. Defaults to
 *  <code>TestFailureError</code>
 * @returns {Error} Returns an instance of the TestFailureError
 */
atropa.TestFailureError = function TestFailureError(testName, message) {
    /**
     * The name of the error. Tells the user what kind of custom
     * error has been thrown.
     * @fieldOf atropa.TestFailureError#
     * @type {String}
     * @default "atropa.TestFailureError"
     */
    this.name = "atropa.TestFailureError";
    /**
     * The error message to send.
     * @fieldOf atropa.TestFailureError#
     * @type {String}
     * @default "TestFailureError"
     */
    this.message = message || "TestFailureError";
    /**
     * The test throwing this error.
     * @fieldOf atropa.TestFailureError#
     * @type {String}
     * @default "Anonymous Test"
     */
    this.testName = testName || "Anonymous Test";
    
    atropa.test.results.fail.push([this.testName, this.message]);
};
atropa.TestFailureError.prototype = new Error();
atropa.TestFailureError.prototype.constructor = atropa.TestFailureError;



atropa.test = {};
atropa.test.tests = {};
atropa.test.results = {};
atropa.test.results.pass = [];
atropa.test.results.fail = [];
atropa.test.register = [];
atropa.test.functions = {};

/**
 * Default test results reporter. Replace this function with your own reporting function.
 */
atropa.test.functions.report = function(results) {
    console.dir(results);
};

/**
 * Function called when a test is finished and the next test may begin.
 */
atropa.test.functions.done = function done() {
    var testName = atropa.test.register.shift();
    if(typeof atropa.test.tests[testName] === 'function') {
        console.log('Running test : ' + testName);
        atropa.test.tests[testName]();
    } else {
        atropa.test.functions.report(atropa.test.results);
    }
};

/**
 * Starts the tests.
 */
atropa.test.functions.startTests = function startTests() {
    atropa.test.register = Object.keys(atropa.test.tests);
    atropa.test.functions.done();
};


