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
 * Creates a new HTML Parser<br />
 * Carry out DOM operations without loading content to the active document.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20120909
 * @class Creates a new HTML Parser
 * @returns {HTML DOM Document} Returns a blank HTML Document for you to load
 *  data into
 * @requires atropa.data
 * @see <a href="../../../AtropaToolboxTests.html?spec=atropa.HTMLParser">tests</a>
 */
atropa.HTMLParser = function HTMLParser() {
    "use strict";
    var my = this;
    /**
     * Tests if this class will work in the current environment and throws
     *  an error if it won't.
     * @private
     * @methodOf atropa.HTMLParser#
     * @return Returns true or throws an error if this class is not supported
     *  in the current environment.
     * @throws {Error} Throws errors if this class can not be used in the
     *  current environment.
     */
    function selfTest() {
        atropa.data.HTMLParser = {};
        try {
            my.newDocument();
            
            try {
                if (my.doc.nodeType !== 9) {
                    throw new Error('the document nodeType returned an ' +
                        'unexpected value');
                }
            } catch (e) {
                throw new Error('atropa.HTMLParser can not create a new ' +
                    'document because: ' + e);
            }
            
            try {
                my.loadString(
                    '<head></head><body><p id="testPara">test</p></body>'
                );
            } catch (f) {
                throw new Error('atropa.HTMLParser can not load ' +
                    'the hidden document from string because: ' + f);
            }
            
            try {
                if (my.doc.getElementById('testPara').textContent !== 'test') {
                    throw new Error('the test textContent was not the ' +
                        'expected value');
                }
            } catch (g) {
                throw new Error('atropa.HTMLParser can not access ' +
                    'or manipulate the hidden document because: ' + g);
            }
        } catch (h) {
            atropa.data.HTMLParser.support = 'unsupported';
            atropa.data.HTMLParser.error = 'The atropa.HTMLParser Class can ' +
                'not be used, it is not supported by the current environment ' +
                'because: ' + h;
            throw new Error(atropa.data.HTMLParser.error);
        }
    }
    /**
     * Holds the created HTML DOM Document.
     * @type HTML DOM Document
     * @fieldOf atropa.HTMLParser#
     */
    this.doc = {};
    /**
     * Creates a blank HTML DOM Document.
     * @author <a href="mailto:matthewkastor@gmail.com">
     *  Matthew Christopher Kastor-Inare III </a><br />
     *  ☭ Hial Atropa!! ☭
     * @version 20120909
     * @methodOf atropa.HTMLParser#
     * @returns {HTML DOM Document} Resets the doc property of this instance
     *  and, returns a blank HTML Document for you to load data into.
     */
    this.newDocument = function () {
        var dt;
        dt = document.implementation.createDocumentType(
            "html",
            "-//W3C//DTD HTML 4.01 Transitional//EN",
            "http://www.w3.org/TR/html4/loose.dtd"
        );
        this.doc = document.implementation.createDocument('', '', dt);
        return this.doc;
    };
    /**
     * Creates a new HTML DOM Document and loads the given string into it.
     * @author <a href="mailto:matthewkastor@gmail.com">
     *  Matthew Christopher Kastor-Inare III </a><br />
     *  ☭ Hial Atropa!! ☭
     * @version 20120909
     * @methodOf atropa.HTMLParser#
     * @param {String} htmlstring a string of HTML data
     * @returns {HTML DOM Document} Resets the doc property of this instance,
     * loading a new document with the string given.
     */
    this.loadString = function (htmlstring) {
        if (!htmlstring) {
            return false;
        }
        this.newDocument();
        this.doc.appendChild(this.doc.createElement('html'));
        this.doc.documentElement.innerHTML = htmlstring;
        return this.doc;
    };
    
    if(atropa.data.HTMLParser === undefined) {
        selfTest();
    } else {
        if(atropa.data.HTMLParser.support === 'unsupported') {
            throw new Error(atropa.data.HTMLParser.error);
        } else {
            this.newDocument();
            return this;
        }
    }
};


