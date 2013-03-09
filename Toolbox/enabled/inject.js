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
    'inject',
    function () {
        "use strict";
        if(document.createElement === undefined) {
            return false;
        }
        return true;
    },
    'The atropa.inject class requires the window object present in web ' +
        'browsers in order to be useful. atropa.inject is not supported in ' +
        'this environment'
);

/**
 * Contains tools for injecting elements and assemblies.
 * into the page.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130308
 * @namespace Contains tools for injecting elements and assemblies.
 * @requires atropa.data
 */
atropa.inject = {};
/**
 * Generic Element Injector.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20120909
 * @param {String} elementType The type of element to be injected.
 * @param {HTML DOM Document} docref Optional. A reference to the document to
 *  target, defaults to <code>document</code>.
 * @param {DOM Node} parentNod Optional. A reference to the parent node to
 *  target, defaults to <code>docref.body</code>.
 * @param {Object} attributes Optional. An object whose properties are names of
 *  HTML attributes, defaults to <code>{}</code>. The value of these properties
 *  are to be strings representing the values of the HTML attributes as they are
 *  to be applied to the injected element.
 * @example Example attributes object :
 *
 * attributesObj = {
 *     "id" : "elementID",
 *     "class" : "classy"
 * };
 * @param {Function} onloadHandler Optional. If the element being injected will
 *  fire a load event, this function will be called. Defaults to
 *  <code>function () {}</code>.
 * @param {Function} callback Optional. This function will be called just before
 *  the element is to be appended to the page. The callback will receive the
 *  element in its current state for any additional processing to be done prior
 *  to it's attachment on callback completion. Defaults to
 *  <code>function () {}</code>.
 * @return {HTML Element} Returns a reference to the HTML Element created and
 *  injected.
 */
atropa.inject.element = function (
    elementType, docref, parentNod, attributes, onloadHandler, callback
) {
    "use strict";
    atropa.supportCheck('inject');
    
    var el,
    x;
    docref = atropa.setAsOptionalArg(document, docref);
    parentNod = atropa.setAsOptionalArg(docref.body, parentNod);
    attributes = atropa.setAsOptionalArg({}, attributes);
    onloadHandler = atropa.setAsOptionalArg(function () {}, onloadHandler);
    callback = atropa.setAsOptionalArg(function () {}, callback);
    
    el = docref.createElement(elementType);
    for (x in attributes) {
        if (attributes.hasOwnProperty(x)) {
            el.setAttribute(x, attributes[x]);
        }
    }
    el.addEventListener('load', onloadHandler, true);
    callback(el);
    parentNod.appendChild(el);
    return el;
};
/**
 * Hidden Iframe Injector.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130308
 * @param {String} id The id of the element to be injected.
 * @param {String} srcUrl The URL to load in the iframe.
 * @param {HTML DOM Document} docref Optional. Reference to the document to
 *  inject the iframe in. Defaults to document.
 * @param {Function} onloadHandler Optional. The onload handler for the iframe.
 * @param {DOM Node} parentNod Optional. Referenct to the parent node to
 *  append the iframe to. Defaults to docref.body
 * @param {Function} callback Optional. Callback function for preprocessing
 *  the iframe prior to injection. Called with a reference to the iframe.
 * @return {HTML Element} Returns a reference to the HTML Element created and
 *  injected.
 * @see atropa.inject.element
 */
atropa.inject.hiddenFrame = function (
    id, srcURL, docref, onloadHandler, parentNod, callback
) {
    "use strict";
    atropa.supportCheck('inject');
    
    return atropa.inject.element(
        'iframe',
        docref,
        parentNod,
        {
            "id" : id,
            "src" : srcURL,
            "width" : "0px",
            "height" : "0px",
            "border" : "0px"
        },
        onloadHandler,
        callback
    );
};
/**
 * Script Injector.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20120909
 * @param {String} id The id of the element to be injected.
 * @param {String} srcUrl The URL where the script is located.
 * @param {HTML DOM Document} docref Optional. The document to inject the
 *  script into. Defaults to document.
 * @param {Function} callback Optional. A function to execute once the script
 *  has loaded. Defaults to function () {};
 * @return {HTML Element} Returns a reference to the HTML Element created and
 *  injected.
 * @see atropa.inject.element
 */
atropa.inject.script = function (id, srcURL, docref, callback) {
    "use strict";
    atropa.supportCheck('inject');
    
    var attributes,
    elementType,
    parentNod,
    onloadHandler,
    el;
    attributes = {
        "id" : id,
        "type" : "text/javascript",
        "src" : srcURL
    };
    elementType = 'script';
    onloadHandler = callback;
    el = atropa.inject.element(
        elementType, docref, parentNod, attributes, onloadHandler);
    return el;
};


