/// <reference path="../../docs/vsdoc/OpenLayersAll.js"/>
/*jslint indent: 4, maxerr: 50, white: true, browser: true, devel: true, plusplus: true, regexp: true */
/*global atropa */

/**
 * Utilities for handling urls.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20120909
 * @namespace Utilities for handling urls.
 */
atropa.url = {};
/**
 * Gets the filename portion of a url
 * @function
 * @param {String} url The url.
 * @returns {String} Returns everything after the last / in the url.
 */
atropa.url.getFilename = function(url) {
    "use strict";
    return String(url).replace(/^.*\//,'');
};


