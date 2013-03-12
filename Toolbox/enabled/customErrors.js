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


/**
 * Invalid Argument Types Error
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130221
 * @class Invalid Argument Types Error
 * @param {String} message Optional. The error message to send. Defaults to
 *  <code>InvalidArgumentTypesError</code>
 * @returns {Error} Returns an instance of the InvalidArgumentTypesError
 * @see <a href="../../../AtropaToolboxTests.html?spec=atropa.customErrors">tests</a>
 */
atropa.InvalidArgumentTypesError = function InvalidArgumentTypesError(message) {
    'use strict';
    /**
     * The name of the error. Tells the user what kind of custom
     * error has been thrown.
     * @fieldOf atropa.InvalidArgumentTypesError#
     * @type {String}
     * @default "atropa.InvalidArgumentTypesError"
     */
    this.name = "atropa.InvalidArgumentTypesError";
    /**
     * The error message to send.
     * @fieldOf atropa.InvalidArgumentTypesError#
     * @type {String}
     * @default "InvalidArgumentTypesError"
     */
    this.message = message || "InvalidArgumentTypesError";
};
atropa.InvalidArgumentTypesError.prototype = new Error();
atropa.InvalidArgumentTypesError.prototype.constructor = 
    atropa.InvalidArgumentTypesError;


