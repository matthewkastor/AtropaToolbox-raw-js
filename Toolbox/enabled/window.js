/// <reference path="../../docs/vsdoc/OpenLayersAll.js"/>
/*jslint indent: 4, maxerr: 50, white: true, browser: true, devel: true, plusplus: true, regexp: true */
/*global atropa */

/**
 * Container for all window functions and classes.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @namespace Container for all window functions and classes.
 */
atropa.window = {};
/**
 * Opens a new window and fires a callback once the window has loaded.
 *  Optionally, a test function may be provided to fire the callback.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130222
 * @function
 * @param {String} url The url to load in the window.
 * @param {Function} callback The callback function to execute when
 *  the window has loaded. This callback will receive one argument,
 *  a reference to the opened window.
 * @param {Function} testFn Optional. An alternate test for windows
 *  containing too many slow loading external resources. The callback
 *  will be given a reference to the opened window as its first artument.
 *  Return something truthy and the callback will fire, return
 *  something falsy and continue waiting. Your test will be tried
 *  every 250ms until it returns something truthy.
 * @returns {Object} Returns a reference to the opened window.
 * @link <a href="http://www.w3.org/Security/wiki/Same_Origin_Policy">
 * Same Origin Policy</a>
 * @example
 * // note, this example must be run in the context of google.com
 * // because of cross domain security restrictions.
 * 
 * function cb(win) {
 *     // setting a search term in the box on google.
 *     var searchTerm = '"hial atropa!!" site:github.com';
 *     var searchBox = win.document.getElementById('gbqfq');
 *     searchBox.value = searchTerm;
 * }
 * 
 * function testFn(win) {
 *     // returns null or a reference to the element
 *     // this will be called about 4 times per second
 *     // until the element is found.
 *     return win.document.getElementById('gbqfq');
 * }
 * 
 * atropa.window.open('http://www.google.com', cb, testFn);
 */
atropa.window.open = function open(url, callback, testFn) {
    "use strict";
    var win;
    
    function defaultTestFn(win){
        return win.document.readyState === 'complete';
    }
    
    testFn = atropa.setAsOptionalArg(defaultTestFn, testFn);
    
    function opens(url) {
        return window.open(url);
    }
    
    function blks(win) {
        if(testFn(win)) {
            callback(win);
        } else {
            setTimeout(blks, 250, win);
        }
    }
    
    win = opens(url);
    setTimeout(blks, 0, win);
    return win;
};


