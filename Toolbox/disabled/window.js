/// <reference path="../../docs/vsdoc/OpenLayersAll.js"/>
/*jslint
    indent: 4,
    maxerr: 50,
    white: true,
    browser: true,
    devel: true,
    plusplus: true,
    regexp: true
*/
/*global atropa */
// end header

atropa.requires(
    'window',
    function () {
        "use strict";
        if(window === undefined) {
            return false;
        }
        return true;
    },
    'atropa.window requires the window object present in web ' +
        'browsers in order to be useful. This function is not supported in ' +
        'this environment'
);

atropa.requires(
    'windowOpen',
    function () {
        "use strict";
        if(window.open === undefined) {
            return false;
        }
        return true;
    },
    'atropa.window.open requires the window object present in web ' +
        'browsers in order to be useful. This function is not supported in ' +
        'this environment'
);

/**
 * Container for all window functions and classes.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @namespace Container for all window functions and classes.
 * @see <a href="../../../AtropaToolboxTests.html?spec=atropa.window">tests</a>
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
 *  the windows document.readystate === 'complete'. This callback will receive
 *  one argument, a reference to the opened window and will be fired before the
 *  window navigates to the given url.
 * @param {Function} testFn Optional. An alternate test for when you want to
 *  wait for the window to navigate to the given url before firing the callback.
 *  The callback will be given a reference to the opened window as its first
 *  argument. Return something truthy and the callback will fire, return
 *  something falsy and continue waiting. Your test will be tried
 *  every 250ms until it returns something truthy.
 * @returns {Object} Returns a reference to the opened window.
 * @see <a href="http://www.w3.org/Security/wiki/Same_Origin_Policy">
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
    atropa.supportCheck('windowOpen');
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
    if(!win) {
        atropa.data.windowOpen.support = 'unsupported';
        throw new Error('Could not open a window. atropa.window.open is not ' +
            'supported in this environment.');
    }
    setTimeout(blks, 0, win);
    return win;
};


