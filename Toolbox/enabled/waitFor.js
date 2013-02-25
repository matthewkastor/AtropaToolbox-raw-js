/// <reference path="../../docs/vsdoc/OpenLayersAll.js"/>
/*jslint indent: 4, maxerr: 50, white: true, browser: true, devel: true, plusplus: true, regexp: true */
/*global atropa */

/**
 * Polling functions for quick and sloppy work.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20120909
 * @namespace Polling functions for quick and sloppy work.
 */
atropa.waitFor = {};
/**
 * Generic Wait for true.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20120909
 * @param {Function} testFn A function to tell when the wait is over. Must return true on success, false on failure.
 * @param {Function} onSuccessCallback Optional. The function to run when testFn returns true. Defaults to <code>function () {} </code>
 * @param {function} onMaxPollCallback Optional. The function to run when testFn has been run maxPoll times and the wait is being given up.
 * Defaults to <code>function () {}</code>
 * @param {Integer} pollInterval The amount of time in ms between polling testFn to see if it returns true. Defaults to 200ms.
 * @param {Integer} maxPoll The quantity of polls at which it makes sense to give up waiting. Defaults to 50.
 */
atropa.waitFor.test = function test(testFn, onSuccessCallback, onMaxPollCallback, pollInterval, maxPoll) {
    "use strict";
    pollInterval = atropa.setAsOptionalArg(200, pollInterval);
    maxPoll = atropa.setAsOptionalArg(50, maxPoll);
    onMaxPollCallback = atropa.setAsOptionalArg(function () {}, onMaxPollCallback);
    onSuccessCallback = atropa.setAsOptionalArg(function () {}, onSuccessCallback);
    var myInt,
    myCounter;
    myCounter = 0;
    myInt = setInterval(function () {
            myCounter++;
            if (testFn()) {
                clearInterval(myInt);
                onSuccessCallback();
            }
            if (myCounter === maxPoll) {
                clearInterval(myInt);
                onMaxPollCallback();
            }
        }, pollInterval);
};
/**
 * Wait for Element
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20120909
 * @param {Function} testFn A function which returns a reference to an HTML Element.
 * @param {Function} onSuccessCallback Optional.
 * @param {function} onMaxPollCallback Optional.
 * @param {Integer} pollInterval
 * @param {Integer} maxPoll
 * @see atropa.waitFor.test for more information and default values for the optional parameters.
 */
atropa.waitFor.element = function (testFn, onSuccessCallback, onMaxPollCallback, pollInterval, maxPoll) {
    "use strict";
    var elementTest;
    /**
     * Creates an HTML DOM Document and puts it in the document
     * queue, then executes the callback given.
     * @author <a href="mailto:matthewkastor@gmail.com">
     *  Matthew Christopher Kastor-Inare III </a><br />
     *  ☭ Hial Atropa!! ☭
     * @version 20120909
     * @methodOf atropa.waitFor.element-
     * @private
     * @returns {Boolean} Returns true or false depending on whether the object has a tag name property.
     */
    elementTest = function () {
        var obj;
        obj = testFn();
        return atropa.inquire.hasProperty(obj, 'tagName');
    };
    atropa.waitFor.test(elementTest, onSuccessCallback, onMaxPollCallback, pollInterval, maxPoll);
};

