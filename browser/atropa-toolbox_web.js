(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
atropa = require('../src/atropa-toolbox.js');
},{"../src/atropa-toolbox.js":25}],2:[function(require,module,exports){
/// <reference path="../docs/vsdoc/OpenLayersAll.js"/>
var atropa = require('atropa-header');
atropa.inquire = require('atropa-inquire').inquire;
atropa.arrays = require('atropa-arrays').arrays;
atropa.customErrors = require('atropa-customErrors').customErrors;
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
 * This represents a filter for arguments based on type.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130221
 * @class This represents a filter for arguments based on type.
 * @returns {ArgsInfo} Returns an ArgsInfo filter.
 * @requires atropa.arrays.match
 * @example
 * function myClassyConstructor(takes, a, few, args) {
 *     var expectedArgTypes, checker;
 *     
 *     expectedArgTypes = {};
 *     expectedArgTypes.requestWithMessage = 
 *          ['string', 'string', 'string', 'function'];
 *     expectedArgTypes.requestNullMessage = 
 *          ['string', 'string', 'object', 'function'];
 *     
 *     checker = new atropa.ArgsInfo();
 *     checker.setExpectedArgTypes(expectedArgTypes);
 *     
 *     try {
 *     
 *         // Check the supplied arguments pseudo array's argument types
 *         // if the pattern of types in arguments matches one of the
 *         // patterns set on expectedArgTypes then the matching pattern
 *         // will be returned. Otherwise, an error will be thrown.
 *         
 *         checker.checkArgTypes(arguments);
 *     } catch (e) {
 *     
 *         // Invalid argument types supplied. Handle
 *         // the error or bail.
 *         
 *     }
 *     
 *     // the arguments supplied will be of the proper type
 *     // your function can go ahead and do things with them
 * }
 */
atropa.ArgsInfo = function ArgsInfo() {
    'use strict';
    var expectedArgTypes,
    checkArgs,
    that;
    /**
     * Holds the proper reference to <code>this</code>
     * for private functions.
     * @type This
     * @private
     * @fieldOf atropa.ArgsInfo-
     */
    that = this;
    /**
     * Holds the expected argument types object.
     * @private
     * @type Expected Arg Types
     * @fieldOf atropa.ArgsInfo-
     */
    expectedArgTypes = {};
    /**
     * Sets the expected argument types.
     * @author <a href="mailto:matthewkastor@gmail.com">
     *  Matthew Christopher Kastor-Inare III </a><br />
     *  ☭ Hial Atropa!! ☭
     * @version 20120909
     * @methodOf atropa.ArgsInfo#
     * @param {Expected Arg Types} typesObj An object containing information
     *  about the types of arguments you expect. Specifically, the object should
     *  look like the example.
     * @example
     * // typesObj is expected to be of the form:
     * 
     * var typesObj = {
     *     "namedArgumentTypesArray" : ["string", "function", "number"],
     *     "namedAlternateArgumentTypesArray" : ["object", "function", "number"]
     * };
     * 
     * // You may use as many named arrays as you wish and checkArgTypes will
     * // test for a match to at least one of the provided named arrays.
     * @throws {atropa.customErrors.InvalidArgumentTypesError} Throws an error if the
     *  typesObj can not be used to set the expected argument types.
     */
    this.setExpectedArgTypes = function setExpectedArgTypes(typesObj) {
        var error, names;
        
        error = false;
        
        if(atropa.inquire.isObjectNotNull(typesObj)) {
            names = Object.keys(typesObj);
            if (names.length > 0) {
                expectedArgTypes = typesObj;
            } else {
                error = true;
            }
        } else {
            error = true;
        }
        
        if(error) {
            throw new atropa.customErrors.InvalidArgumentTypesError(
                'typesObj is expected to be of the form: var typesObj = ' +
                '{ "namedArgumentTypesArray" : ' +
                '    ["string", "function", "number"], ' +
                '"namedAlternateArgumentTypesArray" : ' +
                '   ["object", "function", "number"] }; ' +
                'You may use as many named arrays as you wish and' +
                'checkArgTypes will test for a match to at least one of the ' +
                'provided named arrays.'
            );
        }
    };
    /**
     * Gets the types of arguments.
     * @author <a href="mailto:matthewkastor@gmail.com">
     *  Matthew Christopher Kastor-Inare III </a><br />
     *  ☭ Hial Atropa!! ☭
     * @version 20120909
     * @methodOf atropa.ArgsInfo#
     * @param {arguments} args An arguments object, or anything you want to
     * check the type of.
     * @returns {Array} Returns an array of the types of arguments passed in.
     */
    this.getArgTypes = function getArgTypes(args) {
        var x,
        argTypes;
        argTypes = [];
        for (x in args) {
            if (args.hasOwnProperty(x)) {
                argTypes.push(typeof(args[x]));
            }
        }
        return argTypes;
    };
    /**
     * Compares the expected arguments types to the
     * received arguments types.
     * @author <a href="mailto:matthewkastor@gmail.com">
     *  Matthew Christopher Kastor-Inare III </a><br />
     *  ☭ Hial Atropa!! ☭
     * @version 20120909
     * @private
     * @methodOf atropa.ArgsInfo-
     * @param {Array} expectedTypesArray An array taken from the user
     * created argument types object.
     * @param {arguments} args an arguments object.
     * @returns {Boolean} Returns true if the expected types match for type
     *  and are in the same order as the received types.
     * @requires atropa.arrays.match
     */
    checkArgs = function checkArgs(expectedTypesArray, args) {
        var types;
        types = {};
        types.expected = expectedTypesArray;
        types.received = that.getArgTypes(args);
        return atropa.arrays.match(types.expected, types.received);
    };
    /**
     * Checks the given arguments object against the expected
     * arguments types.
     * @author <a href="mailto:matthewkastor@gmail.com">
     *  Matthew Christopher Kastor-Inare III </a><br />
     *  ☭ Hial Atropa!! ☭
     * @version 20120909
     * @methodOf atropa.ArgsInfo#
     * @param {arguments} args An arguments object
     * @returns {String} The user assigned key which matches the
     * arguments supplied, or throws an error.
     * @throws {atropa.customErrors.InvalidArgumentTypesError} Throws an error if no matching
     *  pattern of argument types can be found for <code>args</code>
     * @see atropa.ArgsInfo#setExpectedArgTypes
     */
    this.checkArgTypes = function checkArgTypes(args) {
        var expectedTypes;
        if (Object.keys(expectedArgTypes).length < 1) {
            throw new atropa.customErrors.InvalidArgumentTypesError(
                'Expected argument types is not set. Use ' +
                'setExpectedArgTypes(typesObj) to set. typesObj is an ' +
                'object whose properties are arrays of strings representing ' +
                'the typeof(argument) for each argument, in the exact order ' +
                'in which they will be given to the function. Using multiple ' +
                'properties it is possible to define alternative acceptable ' +
                'argument type sets. Use getArgTypes(arguments) as a ' +
                'convenient way of getting the array you want to hard code ' +
                'in for validation. Example: var typesObj = ' +
                '{ "messageIncluded" : ["string", "function", "number"], ' +
                '"messageNotIncluded" : ["object", "function", "number"] };'
            );
        }
        for (expectedTypes in expectedArgTypes) {
            if (expectedArgTypes.hasOwnProperty(expectedTypes)) {
                if (checkArgs(expectedArgTypes[expectedTypes], args)) {
                    return expectedTypes;
                }
            }
        }
        throw new atropa.customErrors.InvalidArgumentTypesError(
            'invalid argument type @ atropa.ArgsInfo.checkArgTypes');
    };
};




while(atropa.data.requirements.length > 0) {
    atropa.data.requirements.pop()();
}
module.exports = atropa;

},{"atropa-arrays":10,"atropa-customErrors":11,"atropa-header":12,"atropa-inquire":14}],3:[function(require,module,exports){
/// <reference path="../docs/vsdoc/OpenLayersAll.js"/>
var atropa = require('atropa-header');
atropa.random = require('atropa-random').random;
atropa.string = require('atropa-string').string;
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
    'Babbler',
    function () {
        "use strict";
        var supported = true;
        
        [
            atropa.random.integer,
            atropa.string.ucFirst,
            atropa.random.string
        ].forEach(function (prerequisite) {
            if(prerequisite === undefined) {
                supported = false;
            }
        });
        return supported;
    }
);

/**
 * This class represents a babbler. The babbler
 * produces lorum ipsum text, to user specifications.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130313
 * @class This class represents a babbler
 * @param {Number} wrdCount The amount of "words" you would like
 * the babbler to produce.
 * @returns {Babbler} Returns a babbler.
 * @requires atropa.random.integer
 * @requires atropa.string.ucFirst
 * @requires atropa.random.string
 * @example
 * var babbler = new atropa.Babbler(30);
 * // resets the word count
 * babbler.resetWordCount(10)
 * console.log(babbler.getWordCount());
 * 
 * // displays a 10 word sentence of nonsense words.
 * console.log(babbler.generateBabble(10));
 * // displays a 3 word sentence
 * console.log(babbler.generateBabble(3));
 * 
 * // displays the user stored or last generated babble
 * console.log(babbler.getBabble());
 * 
 * // clears the stored babble
 * babbler.resetBabble();
 * console.log(babbler.getBabble());
 * 
 * // sets the babble
 * babbler.setBabble('here be gibberish ');
 * console.log(babbler.getBabble());
 * 
 * // append more gibberish to the current babble
 * babbler.setBabble(babbler.getBabble() + babbler.generateBabble(5));
 * console.log(babbler.getBabble());
 * 
 * // generate a sentence
 * babbler.resetWordCount(10);
 * console.log(babbler.generateSentence(5, 20));
 * 
 * // generate random punctuation
 * console.log(babbler.punctuate());
 * 
 * // generate a word
 * console.log(babbler.generateWord(3,7));
 * console.log(babbler.generateWord(7,10));
 */
atropa.Babbler = function Babbler(wrdCount) {
    'use strict';
    var my = this,
        babble = '',
        wordCount = 0;
    /**
     * Sets the word count.
     * @author <a href="mailto:matthewkastor@gmail.com">
     *  Matthew Christopher Kastor-Inare III </a><br />
     *  ☭ Hial Atropa!! ☭
     * @version 20130313
     * @methodOf atropa.Babbler#
     * @param {Number} wrdCount The amount of "words" which you want the
     * babbler to produce.
     * @returns {Number} Returns the set word count for this babbler.
     */
    this.setWordCount = function (wrdCount) {
        if (typeof wrdCount !== 'number') {
            wordCount = 250;
        } else {
            wordCount = wrdCount;
        }
        return wordCount;
    };
    /**
     * Resets the word count for this babbler.
     * @author <a href="mailto:matthewkastor@gmail.com">
     *  Matthew Christopher Kastor-Inare III </a><br />
     *  ☭ Hial Atropa!! ☭
     * @version 20130313
     * @methodOf atropa.Babbler#
     * @param {Number} wordCount The amount of "words" you would like
     * to set for this babbler.
     * @returns {Number} Returns the set word count for this babbler.
     */
    this.resetWordCount = function resetWordCount(wordCount) {
        my.setWordCount(wordCount);
        return wordCount;
    };
    /**
     * Gets the current word count.
     * @author <a href="mailto:matthewkastor@gmail.com">
     *  Matthew Christopher Kastor-Inare III </a><br />
     *  ☭ Hial Atropa!! ☭
     * @version 20120909
     * @methodOf atropa.Babbler#
     * @returns {Number} Returns the word count for this babbler.
     */
    this.getWordCount = function getWordCount() {
        return wordCount;
    };
    /**
     * Generates a word with a specified length. Lowers the word count by one.
     * @author <a href="mailto:matthewkastor@gmail.com">
     *  Matthew Christopher Kastor-Inare III </a><br />
     *  ☭ Hial Atropa!! ☭
     * @version 20120909
     * @methodOf atropa.Babbler#
     * @param {Number} stringMin the shortest word, in characters.
     * @param {Number} stringMax The longest word, in characters.
     * @returns {String} Returns a random string of characters
     * within the specified range of length.
     * @requires atropa.random.integer
     * @requires atropa.random.string
     */
    this.generateWord = function generateWord(stringMin, stringMax) {
        var wordLength,
        word;
        wordLength = atropa.random.integer(stringMin, stringMax);
        word = atropa.random.string(wordLength, 'lower');
        wordCount--;
        return word;
    };
    /**
     * Provides random punctuation.
     * @author <a href="mailto:matthewkastor@gmail.com">
     *  Matthew Christopher Kastor-Inare III </a><br />
     *  ☭ Hial Atropa!! ☭
     * @version 20120909
     * @methodOf atropa.Babbler#
     * @returns {String} Returns a random punctuation
     * character ( . ! or ? ).
     * @requires atropa.random.string
     */
    this.punctuate = function punctuate() {
        var punctuation;
        punctuation = atropa.random.string(1, 'punctuation');
        return punctuation;
    };
    /**
     * Generates a sentence of specified length in words. The quantity
     *  of words in the generated sentence will be between the minimum
     *  and maximum set, with the maximum capped at the current words
     *  count. The word count will be lowered by the
     *  quantity of words in the generated sentence. If the word count
     *  is 0 then there will be no words in the sentence. If the word
     *  count is 3 then the maximum possible number of words in the
     *  sentence will be three.
     * @author <a href="mailto:matthewkastor@gmail.com">
     *  Matthew Christopher Kastor-Inare III </a><br />
     *  ☭ Hial Atropa!! ☭
     * @version 20130313
     * @methodOf atropa.Babbler#
     * @param {Number} sentenceMin The shortest sentence, in words,
     * you would like returned.
     * @param {Number} sentenceMax The longest sentence, in words,
     * you would like returned.
     * @returns {String} Returns a "sentence" within the specified
     * range of length.
     * @requires atropa.random.integer
     * @requires atropa.string.ucFirst
     */
    this.generateSentence = function generateSentence(
        sentenceMin, sentenceMax
    ) {
        var word,
        sentenceLength,
        sentence;
        sentenceLength = atropa.random.integer(sentenceMin, sentenceMax);
        sentence = '';
        if (sentenceLength > wordCount) {
            sentenceLength = wordCount;
        }
        for (sentenceLength; sentenceLength > 0; sentenceLength--) {
            if (wordCount > 0) {
                word = my.generateWord(4, 12);
                sentence += ' ' + word;
            } else {
                sentenceLength = 0;
            }
        }
        sentence += my.punctuate();
        return atropa.string.ucFirst(sentence.trim());
    };
    /**
     * Sets the babble.
     * @author <a href="mailto:matthewkastor@gmail.com">
     *  Matthew Christopher Kastor-Inare III </a><br />
     *  ☭ Hial Atropa!! ☭
     * @version 20130313
     * @methodOf atropa.Babbler#
     * @param {String} babbleString Specified babble to set.
     * @returns {String} Returns the stored babble.
     */
    this.setBabble = function setBabble(babbleString) {
        if (typeof babbleString === 'string') {
            babble = babbleString;
        } else {
            my.resetBabble();
        }
        return babble;
    };
    /**
     * Clears the stored babble.
     * @author <a href="mailto:matthewkastor@gmail.com">
     *  Matthew Christopher Kastor-Inare III </a><br />
     *  ☭ Hial Atropa!! ☭
     * @version 20120909
     * @methodOf atropa.Babbler#
     * @returns {String} Returns the stored babble.
     */
    this.resetBabble = function resetBabble() {
        babble = '';
        return babble;
    };
    /**
     * Gets the last generated babble.
     * @author <a href="mailto:matthewkastor@gmail.com">
     *  Matthew Christopher Kastor-Inare III </a><br />
     *  ☭ Hial Atropa!! ☭
     * @version 20120909
     * @methodOf atropa.Babbler#
     * @returns {String} Returns the stored babble.
     */
    this.getBabble = function getBabble() {
        return babble;
    };
    /**
     * Generates babble to a user specified length in words.
     *  The word count will be zero after this and the stored
     *  babble will be set to the generated babble.
     * @author <a href="mailto:matthewkastor@gmail.com">
     *  Matthew Christopher Kastor-Inare III </a><br />
     *  ☭ Hial Atropa!! ☭
     * @version 20120909
     * @methodOf atropa.Babbler#
     * @param {Number} wordsCt The desired word count for the
     * generated babble.
     * @returns {String} Returns babble of specified length in words.
     * @see atropa.Babbler#getWordCount
     */
    this.generateBabble = function generateBabble(wordsCt) {
        my.resetBabble();
        my.resetWordCount(wordsCt);
        for (wordCount; wordCount > 0; babble += ' ') {
            my.setBabble(babble + my.generateSentence(5, 20));
        }
        return babble;
    };
    
    atropa.supportCheck('Babbler');
    this.resetWordCount(wrdCount);
};




while(atropa.data.requirements.length > 0) {
    atropa.data.requirements.pop()();
}
module.exports = atropa;

},{"atropa-header":12,"atropa-random":16,"atropa-string":20}],4:[function(require,module,exports){
/// <reference path="../docs/vsdoc/OpenLayersAll.js"/>
var atropa = require('atropa-header');
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
    'CookieMonster',
    function () {
        "use strict";
        var supported = true;
        
        [
            document.cookie
        ].forEach(function (prerequisite) {
            if(prerequisite === undefined) {
                supported = false;
            }
        });
        return supported;
    }
);

/**
 * This is a cookie handler.
 * @example
 * // cookie object
 * var cookieObj = {"key" : "cookieName", "val" : "cookieVal"}
 * // cookie string 
 * var cookieString = cookieName=cookieVal;
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130223
 * @class This represents a cookie handler
 * @returns {CookieMonster} A cookie handler.
 * @requires atropa.data
 */
atropa.CookieMonster = function CookieMonster() {
    'use strict';
    var currentCookies, getCookieCallback;
    
    /**
     * This holds the current cookie object array.
     * @private
     * @type Array
     * @fieldOf atropa.CookieMonster-
     */
    currentCookies = [];
    /**
     * Converts a cookie string into an object.
     * @author <a href="mailto:matthewkastor@gmail.com">
     *  Matthew Christopher Kastor-Inare III </a><br />
     *  ☭ Hial Atropa!! ☭
     * @version 20130223
     * @methodOf atropa.CookieMonster#
     * @param {String} cookie A cookie represented as a string
     * <code>cookieName=cookieVal;</code>
     * @returns {cookieObj} Returns a cookie object.
     * @example
     * var cookieMonster = new atropa.CookieMonster();
     * var cookieObj = cookieMonster.cookie2obj('atropa=hial atropa!!;');
     * console.log(cookieObj);
     */
    this.cookie2obj = function cookie2obj(cookie) {
        var cookieObj = {};
        if (!cookie) {
            return false;
        }
        cookieObj.key = cookie.substr(0, cookie.indexOf("=")).trim();
        cookieObj.val = cookie.substr(cookie.indexOf("=") + 1);
        if(cookieObj.val.substr(-1) === ';') {
            cookieObj.val = cookieObj.val.substr(0, cookieObj.val.length - 1);
        }
        return cookieObj;
    };
    /**
     * Converts a cookie object to a cookie string.
     * @author <a href="mailto:matthewkastor@gmail.com">
     *  Matthew Christopher Kastor-Inare III </a><br />
     *  ☭ Hial Atropa!! ☭
     * @version 20120909
     * @methodOf atropa.CookieMonster#
     * @param {Object} cookieObj A cookie object
     * @returns {String} Returns a cookie string.
     * @example
     * var cookieMonster = new atropa.CookieMonster();
     * // creating a cookie
     * cookieMonster.setCookie('atropa', 'hial atropa!!');
     * console.log(document.cookie);
     * 
     * // getting a cookie object
     * var cookieObj = cookieMonster.getCookie('atropa');
     * console.log(cookieObj);
     * 
     * // convert the cookie object to a string
     * console.log(cookieMonster.bakeCookie(cookieObj));
     */
    this.bakeCookie = function bakeCookie(cookieObj) {
        var cookie = '', key, val;
        
        key = cookieObj.key;
        val = cookieObj.val;
        cookie = key + '=' + val + ';';
        return cookie;
    };
    /**
     * Filter cookies based on user specified callback.
     * @author <a href="mailto:matthewkastor@gmail.com">
     *  Matthew Christopher Kastor-Inare III </a><br />
     *  ☭ Hial Atropa!! ☭
     * @version 20130223
     * @methodOf atropa.CookieMonster#
     * @param {function} callback The callback function will be passed
     *  two arguments. The first is a cookie object from the current
     *  document. The second argument is the value supplied for
     *  <code>args</code> if the callback function returns <code>true</code>
     *  then the cookie object will be included in the return results.
     * @param {Array} args Arguments to pass to the callback
     * function.
     * @returns {Array} An array of cookie objects.
     * @example
     * var cookieMonster = new atropa.CookieMonster();
     * // creating a few cookies
     * cookieMonster.setCookie('atropa', 'hial atropa!!');
     * cookieMonster.setCookie('katjii', 'munching');
     * console.log(document.cookie);
     * 
     * // filter cookies
     * function cookieFilter(cookieObj, cookieValue) {
     *     if(cookieObj.val === cookieValue) {
     *         return true;
     *     } else {
     *         return false;
     *     }
     * }
     * var cookieObjArray = cookieMonster.inspectCookies(
     *     cookieFilter, 'munching');
     * console.log(cookieObjArray);
     */
    this.inspectCookies = function inspectCookies(callback, args) {
        var testCookie, cookies, jar = [];
        cookies = this.getCookies();
        while (cookies.length > 0) {
            testCookie = cookies.shift();
            if (callback(testCookie, args) === true) {
                jar.push(testCookie);
            }
        }
        return jar;
    };
    /**
     * Internal callback function used while getting the current
     * cookies.
     * @author <a href="mailto:matthewkastor@gmail.com">
     *  Matthew Christopher Kastor-Inare III </a><br />
     *  ☭ Hial Atropa!! ☭
     * @version 20130223
     * @private
     * @methodOf atropa.CookieMonster-
     * @param {cookieObj} testCookie A cookie object
     * @param {String} args argument used in comparison function
     * @returns {Boolean} If cookie key is exactly equal to the argument
     * then the callback returns true.
     */
    getCookieCallback = function getCookieCallback(testCookie, args) {
        var out;
        if (testCookie.key === args) {
            out = true;
        } else {
            out = false;
        }
        return out;
    };
    /**
     * Gets a user requested cookie.
     * @author <a href="mailto:matthewkastor@gmail.com">
     *  Matthew Christopher Kastor-Inare III </a><br />
     *  ☭ Hial Atropa!! ☭
     * @version 20130223
     * @methodOf atropa.CookieMonster#
     * @param {String} whichKey The cookies key (name)
     * @returns {cookieObj|false} Returns a cookie object if
     *  a cookie with the specified key is found or false if
     *  it is not found.
     * @example
     * var cookieMonster = new atropa.CookieMonster();
     * // creating a cookie
     * cookieMonster.setCookie('atropa', 'hial atropa!!');
     * console.log(document.cookie);
     * // get a specific cookie
     * var cookieObj = cookieMonster.getCookie('atropa');
     * console.log(cookieObj.key);
     * console.log(cookieObj.val);
     */
    this.getCookie = function getCookie(whichKey) {
        var result = this.inspectCookies(getCookieCallback, whichKey.trim());
        return result[0] || false;
    };
    /**
     * Get all cookies.
     * @author <a href="mailto:matthewkastor@gmail.com">
     *  Matthew Christopher Kastor-Inare III </a><br />
     *  ☭ Hial Atropa!! ☭
     * @version 20120909
     * @methodOf atropa.CookieMonster#
     * @returns {Array} An array whose elements are cookie objects.
     * @example
     * var cookieMonster = new atropa.CookieMonster();
     * // creating a cookie
     * cookieMonster.setCookie('atropa', 'hial atropa!!');
     * // get all cookie objects in an array
     * console.log(cookieMonster.getCookies());
     */
    this.getCookies = function getCookies() {
        var n, l, cookieArray, cookieObj;
        currentCookies = [];
        cookieArray = document.cookie.split(";");
        for (n = 0, l = cookieArray.length; n < l; n++) {
            cookieObj = false;
            if (cookieArray[n]) {
                cookieObj = this.cookie2obj(cookieArray[n]);
                if (cookieObj) {
                    currentCookies.push(cookieObj);
                }
            }
        }
        return currentCookies;
    };
    /**
     * Deletes a specified cookie by user submitted string.
     * @author <a href="mailto:matthewkastor@gmail.com">
     *  Matthew Christopher Kastor-Inare III </a><br />
     *  ☭ Hial Atropa!! ☭
     * @version 20130223
     * @methodOf atropa.CookieMonster#
     * @param {String} whichKey The cookies key (name) that
     * will be deleted.
     * @example
     * var cookieMonster = new atropa.CookieMonster();
     * // creating the cookie to delete
     * cookieMonster.setCookie('atropa', 'hial atropa!!');
     * console.log(document.cookie);
     * // delete a cookie
     * cookieMonster.deleteCookie('atropa');
     * console.log(document.cookie);
     */
    this.deleteCookie = function deleteCookie(whichKey) {
        var cookieObj = {};
        cookieObj.key = whichKey;
        cookieObj.val = ';expires=Thu, 2 Aug 2001 20:47:11 UTC';
        document.cookie = this.bakeCookie(cookieObj);
    };
    /**
     * Deletes a specified cookie by user submitted cookieObj.
     * @author <a href="mailto:matthewkastor@gmail.com">
     *  Matthew Christopher Kastor-Inare III </a><br />
     *  ☭ Hial Atropa!! ☭
     * @version 20120909
     * @methodOf atropa.CookieMonster#
     * @param {cookieObj} cookieObj A cookie object.
     * @example
     * var cookieMonster = new atropa.CookieMonster();
     * // creating the cookie to delete
     * cookieMonster.setCookie('atropa', 'hial atropa!!');
     * console.log(document.cookie);
     * // delete a cookie
     * cookieMonster.deleteCookieObj(
     *     {key : 'atropa', val : 'does not matter'});
     * console.log(document.cookie);
     */
    this.deleteCookieObj = function deleteCookieObj(cookieObj) {
        this.deleteCookie(cookieObj.key);
    };
    /**
     * Sets a cookie per user specifications as strings. The cookie
     * will expire when the browser is closed.
     * @author <a href="mailto:matthewkastor@gmail.com">
     *  Matthew Christopher Kastor-Inare III </a><br />
     *  ☭ Hial Atropa!! ☭
     * @version 20120909
     * @methodOf atropa.CookieMonster#
     * @param {String} whichKey The key (name) of the new cookie
     * @param {String} setTo The value of the new cookie.
     * @example
     * var cookieMonster = new atropa.CookieMonster();
     * // set a cookie
     * cookieMonster.setCookie('atropa', 'hial');
     * console.log(document.cookie);
     */
    this.setCookie = function setCookie(whichKey, setTo) {
        var newCookie = {};
        newCookie.key = whichKey;
        newCookie.val = setTo;
        document.cookie = this.bakeCookie(newCookie);
    };
    /**
     * Sets a cookie per user specifications as an object.
     * The cookie will expire when the browser is closed.
     * @author <a href="mailto:matthewkastor@gmail.com">
     *  Matthew Christopher Kastor-Inare III </a><br />
     *  ☭ Hial Atropa!! ☭
     * @version 20120909
     * @methodOf atropa.CookieMonster#
     * @param {cookieObj} cookieObj A cookie object.
     * @example
     * var cookieMonster = new atropa.CookieMonster();
     * // set a cookie
     * cookieMonster.setCookieObj({key : 'atropa', val : 'hial atropa!!'});
     * console.log(document.cookie);
     */
    this.setCookieObj = function setCookieObj(cookieObj) {
        return this.setCookie(cookieObj.key, cookieObj.val);
    };
    
    atropa.supportCheck('CookieMonster');
};




while(atropa.data.requirements.length > 0) {
    atropa.data.requirements.pop()();
}
module.exports = atropa;

},{"atropa-header":12}],5:[function(require,module,exports){
/// <reference path="../docs/vsdoc/OpenLayersAll.js"/>
var atropa = require('atropa-header');
atropa.Requester = require('atropa-Requester').Requester;
atropa.HTMLParser = require('atropa-HTMLParser').HTMLParser;
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
    'CreateHtmlDocumentsFromXmlhttp',
    function () {
        "use strict";
        var supported = true;
        
        [
            atropa.Requester,
            atropa.HTMLParser
        ].forEach(function (prerequisite) {
            if(prerequisite === undefined) {
                supported = false;
            }
        });
        return supported;
    }
);

/**
 * Creates HTML DOM Documents from an XMLHttpRequest object.
 *  This was tested on Firefox, it doesn't work on google chrome.
 *  Your mileage may vary.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130225
 * @class Creates HTML DOM Documents from an XMLHttpRequest object.
 * @requires atropa.Requester
 * @requires atropa.HTMLParser
 * @requires atropa.data
 * @example
 * var method, url, callback, docs;
 * 
 * // HTTP Request method
 * method = 'get';
 * 
 * // the page to fetch, this page must be accessible
 * // security restrictions may apply
 * url = 'docs/jsdoc/symbols/atropa.xpath.html';
 * 
 * // the callback funtion for when a new document is created
 * callback = function newDocumentHandler(docref) {
 *     try {
 *         if (false === docref) {
 *             // if the document could not be created throw an error
 *             throw new Error('atropa.CreateHtmlDocumentsFromXmlhttp ' +
 *                  'Could not create hidden document');
 *         } else {
 *             // if the document could be created we'll try to use it
 *             if(docref.getElementById('index')) {
 *                 // if the document could be used then
 *                 // do something useful with it.
 *                 console.log('success!');
 *             } else {
 *                 // if the document can not be used throw an error
 *                 throw new Error('atropa.CreateHtmlDocumentsFromXmlhttp ' +
 *                      'could not use the hidden document');
 *             }
 *         }
 *     } catch (e) {
 *         // catching any errors thrown and handle them.
 *     }
 *     // At this point the work with the document is currently finished
 *     // the document will live in the documentQueue in case you need it
 *     // later. This is when you will trigger any function which depends
 *     // on this hidden document having been created.
 *     showDocumentQueue();
 * };
 * 
 * function showDocumentQueue() {
 *     console.dir(docs.documentQueue);
 * }
 * 
 * // create an instance of the class
 * docs = new atropa.CreateHtmlDocumentsFromXmlhttp();
 * // try to create a new hidden document
 * docs.newDocument(method, url, null, callback);
 */
atropa.CreateHtmlDocumentsFromXmlhttp = function CreateHtmlDocumentsFromXmlhttp(
) {
    "use strict";
    var requester,
    htmldocument,
    that;
    that = this;
    /**
     * Queue of documents created by this instance.
     * @author <a href="mailto:matthewkastor@gmail.com">
     *  Matthew Christopher Kastor-Inare III </a><br />
     *  ☭ Hial Atropa!! ☭
     * @version 20120909
     * @type Array
     * @fieldOf atropa.CreateHtmlDocumentsFromXmlhttp#
     */
    this.documentQueue = [];
    /**
     * Creates an HTML DOM Document and puts it in the document
     *  queue, then executes the callback given. Note, this does
     *  not work on google chrome.
     * @author <a href="mailto:matthewkastor@gmail.com">
     *  Matthew Christopher Kastor-Inare III </a><br />
     *  ☭ Hial Atropa!! ☭
     * @version 20120909
     * @methodOf atropa.CreateHtmlDocumentsFromXmlhttp#
     * @param {String} method Any valid method to be used in
     * an XMLHttpRequest.
     * @param {String} url The location of the document's source.
     * @param {String} messageBody null, or a message body.
     * @param {Function} callback The function to execute upon
     * request completion. This function will be given either
     * an HTML DOM Document or false.
     * @returns {HTML DOM Document, false} The return value is
     * given to the callback function.
     */
    this.newDocument = function newDocument(
        method, url, messageBody, callback
    ) {
        var cb;
        /*
         * Internal callback function to process data from XMLHttpRequest
         * @author <a href="mailto:matthewkastor@gmail.com">
         *  Matthew Christopher Kastor-Inare III </a><br />
         *  ☭ Hial Atropa!! ☭
         * @version 20120909
         * @methodOf atropa.CreateHtmlDocumentsFromXmlhttp#newDocument-
         * @private
         * @property {true,false} boolStatus This tells whether or not the
         *  XMLHttpRequest was successful.
         * @property {XMLHttp Response Object} responseObject This is the
         *  response object from the XMLHttp Request object.
         */
        cb = function (boolStatus, responseObject) {
            var result = false;
            if (boolStatus === true) {
                if (false !== htmldocument.loadString(
                    responseObject.responseText))
                {
                    result = htmldocument.doc;
                    that.documentQueue.push(result);
                }
            } else {
                result = boolStatus;
            }
            callback(result);
        };
        requester.makeRequest(method, url, messageBody, cb);
    };
    
    
    function init () {
        try {
            atropa.supportCheck('CreateHtmlDocumentsFromXmlhttp');
            requester = new atropa.Requester();
            htmldocument = new atropa.HTMLParser();
        } catch (e) {
            atropa.data.CreateHtmlDocumentsFromXmlhttp.support = 'unsupported';
            throw new Error(atropa.data.CreateHtmlDocumentsFromXmlhttp.error);
        }
    }
    
    init();
};




while(atropa.data.requirements.length > 0) {
    atropa.data.requirements.pop()();
}
module.exports = atropa;

},{"atropa-HTMLParser":6,"atropa-Requester":7,"atropa-header":12}],6:[function(require,module,exports){
/// <reference path="../docs/vsdoc/OpenLayersAll.js"/>
var atropa = require('atropa-header');
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
    'HTMLParser',
    function () {
        "use strict";
        var supported = true;
        
        [
            document.implementation.createDocumentType,
            document.implementation.createDocument
        ].forEach(function (prerequisite) {
            if(prerequisite === undefined) {
                supported = false;
            }
        });
        return supported;
    }
);

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
 */
atropa.HTMLParser = function HTMLParser() {
    "use strict";
    var my = this;
    
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
        my.doc = document.implementation.createDocument('', '', dt);
        if (my.doc.nodeType !== 9) {
            atropa.data.HTMLParser.support = 'unsupported';
            throw new Error(atropa.data.HTMLParser.error +
                'the document nodeType returned an unexpected value');
        }
        return my.doc;
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
        
        try {
            my.newDocument();
            my.doc.appendChild(my.doc.createElement('html'));
            my.doc.documentElement.innerHTML = htmlstring;
        } catch (e) {
            atropa.data.HTMLParser.support = 'unsupported';
            throw new Error(atropa.data.HTMLParser.error +
                'atropa.HTMLParser can not load ' +
                'the hidden document from string because: ' + e);
        }
        return my.doc;
    };
    
    function init () {
        var eqTest;
        atropa.supportCheck('HTMLParser');
        try {
            eqTest = my.loadString(
                '<head></head><body><p>test</p></body>'
            ).body.textContent;
        } catch (e) {
            atropa.data.HTMLParser.support = 'unsupported';
            throw new Error(atropa.data.HTMLParser.error + e);
        }
        if('test' !== eqTest) {
            atropa.data.HTMLParser.support = 'unsupported';
            throw new Error(atropa.data.HTMLParser.error);
        }
        my.newDocument();
    }
    
    init();
    
};




while(atropa.data.requirements.length > 0) {
    atropa.data.requirements.pop()();
}
module.exports = atropa;

},{"atropa-header":12}],7:[function(require,module,exports){
/// <reference path="../../docs/vsdoc/OpenLayersAll.js"/>
var atropa = require('atropa-header');
atropa.ArgsInfo = require('atropa-ArgsInfo').ArgsInfo;
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

(function () {
    "use strict";
    atropa.requires(
        'Requester',
        function () {
            var supported = true;
            
            [
                atropa.ArgsInfo,
                XMLHttpRequest
            ].forEach(function (prerequisite) {
                if(prerequisite === undefined) {
                    supported = false;
                }
            });
            return supported;
        }
    );
}());

/**
 * This represents an XMLHttpRequest.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130311
 * @class This represents an XMLHttpRequest.
 * @returns {Requester} Returns a requester object.
 * @requires atropa.ArgsInfo#checkArgTypes
 * @example
 * var requester, formData;
 * 
 * requester = new atropa.Requester();
 * requester.timeout = 10000; // requests will abort after 10 seconds.
 * requester.requestHeaders = {
 *     "aHeader" : "headerValue",
 *     "anotherHeader" : "andValue"
 * };
 * 
 * function showRequestResults(status, request) {
 *     console.log("Status: ' + status);
 *     console.dir(request); // console dir may or may not
 *                        // be supported in your environment.
 * }
 * 
 * formData = new FormData();
 * formData.append('aFormFieldName', 'formFieldData');
 * formData.append('anotherFormFieldName', 'andData');
 * 
 * requester.makeRequest(
 *     "post", "http://example.com", formData, showRequestResults);
 */
atropa.Requester = function Requester() {
    "use strict";
    atropa.supportCheck('Requester');
    var expArgTypes,
        checkRequest,
        request;
    
    /**
     * Container object for the expected argument types
     * supplied to this.makeRequest.
     * @private
     * @type Expected Arg Types
     * @fieldOf atropa.Requester-
     */
    expArgTypes = {};
    expArgTypes.requestWithMessage = ['string', 'string', 'string', 'function'];
    expArgTypes.requestNullMessage = ['string', 'string', 'object', 'function'];
    
    /**
     * Used to check the arguments types supplied to this.makeRequest.
     * @author <a href="mailto:matthewkastor@gmail.com">
     *  Matthew Christopher Kastor-Inare III </a><br />
     *  ☭ Hial Atropa!! ☭
     * @version 20120909
     * @private
     * @methodOf atropa.Requester-
     * @param {Arguments} args An arguments array
     * @returns {Boolean} Returns true if args types match the
     * expected types.
     * @requires atropa.ArgsInfo#checkArgTypes
     */
    checkRequest = function (args) {
        var checker;
        checker = new atropa.ArgsInfo();
        checker.setExpectedArgTypes(expArgTypes);
        return checker.checkArgTypes(args);
    };
    
    /**
     * Object whose properties and values are header names and values
     *  respectively.
     * @type Request Headers Object
     * @fieldOf atropa.Requester#
     */
    this.requestHeaders = {};
    
    
    /**
     * Set the timeout value for the request in milliseconds. The request will
     *  abort after this amount of time has passed.
     * @type Number
     * @fieldOf atropa.Requester#
     */
    this.timeout = 30000;
    
    /**
     * XMLHttpRequest object used by Requester.
     * @private
     * @type XMLHttpRequest
     * @fieldOf atropa.Requester-
     */
    request = new XMLHttpRequest();
    request.aborted = false;
    request.abort = function() {
        request.aborted = true;
        XMLHttpRequest.prototype.abort.call(this);
    };
    
    /**
     * Makes an AJAX request.
     * @author <a href="mailto:matthewkastor@gmail.com">
     *  Matthew Christopher Kastor-Inare III </a><br />
     *  ☭ Hial Atropa!! ☭
     * @version 20130311
     * @methodOf atropa.Requester#
     * @param {String} method The HTTP method to be used for this request.
     * @param {String} url The URL to send the request to.
     * @param {String} messageBody The body of the request.
     * @param {Object} callback The callback function to execute
     *  when readyState is 4. The callback is supplied with two arguments. The
     *  first argument is a boolean indicating whether or not the http status
     *  was 200. The second argument is the request object.
     * @throws atropa.Requester.makeRequest unexpected argument type
     */
    this.makeRequest = function (method, url, messageBody, callback) {
        var hdr;
        try {
            checkRequest(arguments);
        } catch (e) {
            throw new Error('atropa.Requester.makeRequest unexpected ' +
                'argument type');
        }
        request.aborted = false;
        request.open(method, url, true);
        for (hdr in this.requestHeaders) {
            if (this.requestHeaders.hasOwnProperty(hdr)) {
                request.setRequestHeader(hdr, this.requestHeaders[hdr]);
            }
        }
        
        /**
         * Event listener function for the AJAX request.
         * This is what actually fires the callback supplied
         * to makeRequest.
         * @author <a href="mailto:matthewkastor@gmail.com">
         *  Matthew Christopher Kastor-Inare III </a><br />
         *  ☭ Hial Atropa!! ☭
         * @version 20120909
         * @methodOf atropa.Requester-request
         * @private
         */
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if (request.status === 200) {
                    callback(true, request);
                } else {
                    callback(false, request);
                }
            }
        };
        request.send(messageBody);
        setTimeout(function () {
            if (request.aborted === false) {
                request.abort();
            }
        }, this.timeout);
    };
};




while(atropa.data.requirements.length > 0) {
    atropa.data.requirements.pop()();
}
module.exports = atropa;

},{"atropa-ArgsInfo":2,"atropa-header":12}],8:[function(require,module,exports){
/// <reference path="../docs/vsdoc/OpenLayersAll.js"/>
var atropa = require('atropa-header');
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
 * A polling class designed for executing long running processes that return
 *  nothing and have no callback parameter.
 * @class A polling class designed for executing long running processes that
 *  return nothing and have no callback parameter.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130220
 * @param {String} actorName The name for the SerialActor instance.
 * @param {Function} actorFunction The function to execute when the
 *  SerialActor is free. This function must call the <code>free</code> function
 *  when it is finished in order to allow the actor to continue.
 * @returns {atropa.SerialActor} Returns an <code>atropa.SerialActor</code>
 *  instance.
 * @example
 * function dummyActor(){
 *     var that = this;
 *     console.log('actorFunction would execute');
 *     console.log('freeing ' + this.name + ' in 10000 ms');
 *     setTimeout(function(){that.free();}, 10000);
 * };
 * var actor = new atropa.SerialActor('dummy', dummyActor);
 *     // change the name of the actor from
 *     // dummy to awesome
 * actor.name = "awesome";
 *     // set the polling interval (milliseconds)
 * actor.interval = 3000;
 *     // set the blocking timeout value (milliseconds)
 * actor.blockTimeoutValue = 120000;
 *     // start polling
 * actor.start();
 *     // dynamically change the SerialActor
 * setTimeout(function(){
 *     // change the polling interval
 *     // while the SerialActor is running.
 *     actor.changeInterval(2000);
 *         // change the actor function
 *     actor.actorFunction = function() {
 *         console.log('new actorFunction executing');
 *         console.log('freeing ' + this.name + ' immediately');
 *         this.free();
 *     };
 * },10000);
 */
atropa.SerialActor = function(actorName, actorFunction) {
    "use strict";
    var that, dummyActor;
    /**
     * Reference to <code>this</code>
     * @fieldOf atropa.SerialActor-
     * @private
     * @type {Object}
     */
    that = this;
    /**
     * Default actorFunction
     * @author <a href="mailto:matthewkastor@gmail.com">
     *  Matthew Christopher Kastor-Inare III </a><br />
     *  ☭ Hial Atropa!! ☭
     * @version 20130220
     * @methodOf atropa.SerialActor-
     * @private
     * @see atropa.SerialActor#actorFunction
     * @example
     * dummyActor = function(){
     *     console.log('actorFunction would execute');
     *     console.log('freeing Serial Actor in 10000 ms');
     *     setTimeout(function(){that.free();}, 10000);
     * };
     */
    dummyActor = function(){
        console.log('actorFunction would execute');
        console.log('freeing Serial Actor in 10000 ms');
        setTimeout(function(){that.free();}, 10000);
    };
    /**
     * The name of this instance. Defaults to "SerialActor"
     * @fieldOf atropa.SerialActor#
     * @type String
     * @default "SerialActor"
     */
    this.name = atropa.setAsOptionalArg('SerialActor', actorName);
    /**
     * Polling interval in milliseconds. This determines how frequently the
     *  actor function will try to execute. Defaults to 100 milliseconds.
     * @fieldOf atropa.SerialActor#
     * @type Number
     * @default 100
     */
    this.interval = 100; // milliseconds
    /**
     * The id of the interval set to poll the actor. You should not change
     *  this manually, use the start and stop functions instead. Defauls to
     *  undefined.
     * @fieldOf atropa.SerialActor#
     * @type Number
     * @default undefined
     */
    this.intervalId = undefined;
    /**
     * The state of the SerialActor. If true, the actor will sleep. If false the
     *  actor will execute the actor function when next polled. Defaults to
     *  false.
     * @fieldOf atropa.SerialActor#
     * @type Boolean
     * @default false
     */
    this.blocked = false;
    /**
     * Stores id's of currently running timeout functions used to free the actor
     *  if it has been blocked for too long.
     * @fieldOf atropa.SerialActor#
     * @see atropa.SerialActor#blockTimeoutValue
     * @type Array
     * @default []
     */
    this.timeouts = [];
    /**
     * The maximum time, in milliseconds, which the actor may be blocked for.
     *  After this duration has been reached the actor will be freed. Defaults
     *  to 60 seconds.
     * @fieldOf atropa.SerialActor#
     * @type Number
     * @default 60000
     */
    this.blockTimeoutValue = 60000;
    /**
     * The function to execute when the SerialActor is free. This function
     *  must call the <code>free</code> function when it is finished in order to
     *  allow the actor to continue. Defaults to the <code>dummyActor</code>
     *  function.
     * @fieldOf atropa.SerialActor#
     * @type Function
     * @default dummyActor
     * @see atropa.SerialActor-dummyActor
     * @example
     * dummyActor = function(){
     *     console.log('actorFunction would execute');
     *     console.log('freeing Serial Actor in 10000 ms');
     *     setTimeout(function(){that.free();}, 10000);
     * };
     */
    this.actorFunction = atropa.setAsOptionalArg(dummyActor, actorFunction);
    /**
     * The action function is called when the actor is polled and it's blocked
     *  state is false. This method should not be set or called manually, set
     *  the <code>actorFunction</code> instead.
     * @author <a href="mailto:matthewkastor@gmail.com">
     *  Matthew Christopher Kastor-Inare III </a><br />
     *  ☭ Hial Atropa!! ☭
     * @version 20130220
     * @methodOf atropa.SerialActor#
     * @see atropa.SerialActor#actorFunction
     */
    this.action = function() {
        if(false === that.blocked) {
            that.block();
            setTimeout(function() {
                that.actorFunction();
            }, 10);
        } else {
            console.log(that.name + ' sleeping for ' + that.interval + ' ms');
        }
    };
};
/**
 * Prevents the actor from executing it's actorFunction. This block will timeout
 *  once the <code>blockTimeoutValue</code> has been reached.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130220
 * @methodOf atropa.SerialActor#
 * @returns {Boolean} Returns the value of this instances <code>blocked</code>
 *  property.
 * @see atropa.SerialActor#blocked
 * @example
 * function d() {
 *     console.log('doing stuff to things');
 *     this.free();
 * }
 * 
 * var actor = new atropa.SerialActor('dummy', d);
 * actor.interval = 2000;
 * actor.blockTimeoutValue = 5000;
 * actor.start();
 * // 5 seconds after starting the actor will be blocked.
 * // It will remain blocked until the block timeout is reached.
 * setTimeout(function() {
 *     console.log('blocking!!!');
 *     actor.block();
 * }, 5000);
 */
atropa.SerialActor.prototype.block = function() {
    "use strict";
    var that = this;
    console.log(this.name + ' block');
    this.blocked = true;
    this.timeouts.push(
        setTimeout(function() {that.blockTimeout();}, that.blockTimeoutValue));
    return this.blocked;
};
/**
 * Called when the <code>blockTimeoutValue</code> has been reached. This frees
 *  the actor and removes the timeout reference from the timeouts array.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130220
 * @methodOf atropa.SerialActor#
 * @returns {Boolean} Returns the value of this instances <code>blocked</code>
 *  property.
 * @see atropa.SerialActor#blocked
 */
atropa.SerialActor.prototype.blockTimeout = function() {
    "use strict";
    console.log(this.name + ' block timeout');
    return this.free();
};
/**
 * Frees the actor so it may execute its actor function when next polled.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130220
 * @methodOf atropa.SerialActor#
 * @returns {Boolean} Returns the value of this instances <code>blocked</code>
 *  property.
 * @see atropa.SerialActor#blocked
 * @example
 * function d() {
 *     console.log('doing stuff to things');
 *     this.free();
 * }
 * 
 * var actor = new atropa.SerialActor('dummy', d);
 * actor.interval = 2000;
 * actor.blockTimeoutValue = 50000;
 * actor.start();
 * actor.block();
 * // 5 seconds after starting the actor will be freed.
 * setTimeout(function() {
 *     actor.free();
 * }, 5000);
 */
atropa.SerialActor.prototype.free = function() {
    "use strict";
    console.log(this.name + ' free');
    this.blocked = false;
    clearTimeout(this.timeouts.shift());
    return this.blocked;
};
/**
 * Starts polling the actor.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130220
 * @methodOf atropa.SerialActor#
 * @param {Number} interval Optional. The polling interval. Defaults to the
 *  value of <code>this.interval</code>
 * @see atropa.SerialActor#interval
 * @returns {Number} Returns the value of this instance's
 *  <code>intervalId</code> property.
 * @see atropa.SerialActor#intervalId
 * @example
 * var actor = new atropa.SerialActor('dummy');
 * actor.start();
 */
atropa.SerialActor.prototype.start = function(interval) {
    "use strict";
    var that = this;
    this.interval = atropa.setAsOptionalArg(this.interval, interval);
    
    if(this.intervalId !== undefined) {
        // clear the old timeout before creating a new one.
        this.stop();
    }
    this.intervalId = setInterval(that.action, that.interval);
    console.log(this.name + ' started');
    return this.intervalId;
};
/**
 * Adjusts the polling interval after <code>start</code> has
 * been called.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130220
 * @methodOf atropa.SerialActor#
 * @param {Number} interval The new polling interval in milliseconds.
 * @returns {Number} Returns the value of this instance's 
 *  <code>intervalId</code> property.
 * @see atropa.SerialActor#intervalId
 * @example
 * var actor = new atropa.SerialActor('dummy');
 * actor.start();
 *     // 5 seconds after starting the polling interval will be changed.
 * setTimeout(function(){
 *     actor.changeInterval(2000);
 * }, 5000);
 */
atropa.SerialActor.prototype.changeInterval = function(interval) {
    "use strict";
    console.log(this.name + ' changing interval');
    return this.start(interval);
};
/**
 * Stops polling the actor. Note that the actor will be freed once the
 *  <code>blockTimeoutValue</code> has been reached. This will not restart the
 *  polling.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130220
 * @methodOf atropa.SerialActor#
 * @see atropa.SerialActor#blocked
 * @see atropa.SerialActor#blockTimeoutValue
 * @example
 * var actor = new atropa.SerialActor('dummy');
 * actor.start();
 *     // 5 seconds after starting the actor will be stopped.
 * setTimeout(function(){
 *     actor.stop();
 * }, 5000);
 */
atropa.SerialActor.prototype.stop = function() {
    "use strict";
    clearInterval(this.intervalId);
    this.intervalId = undefined;
    console.log(this.name + ' stopped');
};




while(atropa.data.requirements.length > 0) {
    atropa.data.requirements.pop()();
}
module.exports = atropa;

},{"atropa-header":12}],9:[function(require,module,exports){
/// <reference path="../../docs/vsdoc/OpenLayersAll.js"/>
var atropa = require('atropa-header');
atropa.string = require('atropa-string').string;
atropa.arrays = require('atropa-arrays').arrays;
atropa.setAsOptionalArg = require('atropa-setAsOptionalArg').setAsOptionalArg;
/*jslint
    indent: 4,
    maxerr: 50,
    white: true,
    browser: true,
    devel: true,
    plusplus: true,
    regexp: true,
    vars: true
*/
/*global atropa */
// end header

(function () {
    "use strict";
    atropa.requires(
        'TextAnalyzer',
        function () {
            var supported = true;
            
            [
                atropa.string,
                atropa.arrays,
                atropa.setAsOptionalArg
            ].forEach(function (prerequisite) {
                if(prerequisite === undefined) {
                    supported = false;
                }
            });
            return supported;
        }
    );
}());

/**
 * Represents a utility for analyzing text.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130311
 * @class Represents a utility for analyzing text.
 * @param {String} text The text to analyze.
 * @returns {TextAnalyzer} Returns an instance of the text analyzer.
 * @requires atropa.string
 * @requires atropa.arrays
 * @requires atropa.setAsOptionalArg
 */
atropa.TextAnalyzer = function TextAnalyzer(text) {
    "use strict";
    var that = this;
    var construct;
    /**
    * The supplied text. Defaults to an empty string.
    * @type String
    * @fieldOf atropa.TextAnalyzer#
    */
    this.text = String(atropa.setAsOptionalArg('', text));
    /**
    * Gives the count of words in the text. Defaults to 0.
    * @type Number
    * @fieldOf atropa.TextAnalyzer#
    */
    this.wordCount = 0;
    /**
    * An array of every word in the supplied text.
    *  Defaults to an empty array.
    * @type Array
    * @fieldOf atropa.TextAnalyzer#
    */
    this.words = [];
    /**
    * Sets the basic properties of the text analyzer.
    * @author <a href="mailto:matthewkastor@gmail.com">
    * Matthew Christopher Kastor-Inare III </a><br />
    * ☭ Hial Atropa!! ☭
    * @private
    * @version 20130311
    * @methodOf atropa.TextAnalyzer-
    */
    construct = function () {
        atropa.supportCheck('TextAnalyzer');
        that.text = atropa.string.convertEol(that.text, '\n');
        that.wordCount = atropa.string.countWords(that.text);
        that.words = atropa.string.getWords(that.text);
    };
    
    construct();
    return this;
};
/**
 * Gets an index of the text.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130118
 * @methodOf atropa.TextAnalyzer#
 * @returns {Array} Returns an array of unique values
 *  derived from the text given.
 */
atropa.TextAnalyzer.prototype.getIndex = function () {
    "use strict";
    this.words = atropa.arrays.reindex(this.words);
    return atropa.arrays.getUnique(this.words);
};
/**
 * Get the frequency data for each unique word in
 *  the text.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130118
 * @methodOf atropa.TextAnalyzer#
 * @returns {Object} Returns an object whose keys are
 *  the unique words from the given text and whose
 *  values are the count of each words occurrence.
 */
atropa.TextAnalyzer.prototype.getWordFrequency = function () {
    "use strict";
    this.words = atropa.arrays.reindex(this.words);
    return atropa.arrays.getFrequency(this.words);
};
/**
 * Gets phrases of the specified length from the text.
 * @param {Number} phraseLength The length of the phrases
 *  to extract from the text. Defaults to 2.
 * @returns {Object} Returns an object whose keys are phrases
 *  and whose values are the number of occurrences of the phrase.
 */
atropa.TextAnalyzer.prototype.getPhraseFrequency = function getPhraseFrequency(
    phraseLength
) {
    "use strict";
    phraseLength = atropa.setAsOptionalArg(2, phraseLength);
    if(2 > phraseLength) {
        phraseLength = 2;
    }
    var counter = 0, prop, out = [];
    
    this.words = atropa.arrays.reindex(this.words);
    
    this.words.map(function(element, index, arr) {
        counter = 1;  // element is word 1 of phraseLength
        // making sure there are enough words to concatenate a phrase of the
        // proper length.
        if(arr[index + phraseLength - 1] !== undefined) {
            prop = String(element + ' ').toLowerCase();
            for(counter; counter !== phraseLength; counter++) {
                prop += String(arr[index + counter] + ' ').toLowerCase();
            }
            out.push(prop.trim());
        }
    });
    
    out = atropa.arrays.getFrequency(out);
    
    return out;
};




while(atropa.data.requirements.length > 0) {
    atropa.data.requirements.pop()();
}
module.exports = atropa;

},{"atropa-arrays":10,"atropa-header":12,"atropa-setAsOptionalArg":19,"atropa-string":20}],10:[function(require,module,exports){
/// <reference path="../docs/vsdoc/OpenLayersAll.js"/>
var atropa = require('atropa-header');
atropa.inquire = require('atropa-inquire').inquire;
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
 * Utilities for handling arrays.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130221
 * @namespace Utilities for handling arrays.
 */
atropa.arrays = {};
/**
 * Compares two arrays based on size, contents, and element order.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20120909
 * @param {Array} array1 One array you want compared to another.
 * @param {Array} array2 The other array.
 * @returns {Boolean} Returns true or false depending on
 *  whether or not the arrays matched in size, composition, and
 *  element order.
 * @example
 * var x = [1,2];
 * var y = [1,1,3];
 * atropa.arrays.match(x,y);
 * // returns false
 * @example
 * var x = [1,2];
 * var y = [1,2];
 * atropa.arrays.match(x,y);
 * // returns true
 * @example
 * var x = [1,2];
 * var y = [2,1];
 * atropa.arrays.match(x,y);
 * // returns false because the elements are not in the same order.
 * @example
 * var x = [1,{'aProp' : 'aValue'}];
 * var y = [1,{'aProp' : 'aValue'}];
 * atropa.arrays.match(x,y);
 * // returns false because even though the object looks the same, the
 * // two objects are in fact distinct objects.
 * @example
 * var obj = {'aProp' : 'aValue'};
 * var x = [1,obj];
 * var y = [1,obj];
 * atropa.arrays.match(x,y);
 * // returns true because the objects referenced in the arrays are
 * // in fact the same object.
 */
atropa.arrays.match = function arraysMatch(array1, array2) {
    "use strict";
    var x,
    l;
    if (array1.length !== array2.length) {
        return false;
    }
    l = array1.length;
    for (x = 0; x < l; x += 1) {
        if (array1[x] !== array2[x]) {
            return false;
        }
    }
    return true;
};
/**
 * Subtracts one array from another array based on the unique values in both
 *  sets.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130112
 * @param {Array} a (subtrahend) The array to subtract.
 * @param {Array} (minuend) fromB The array with elements duplicated in <code>a</code>
 * @returns {Array} Returns a new array containing only the unique
 *  values found in <code>fromB</code> that are not present in <code>a</code>
 * @example
 * var x = [1,2];
 * var y = [1,1,3];
 * atropa.arrays.subtract(x,y);
 * // returns [3]
 * @example
 * var x = [1,3];
 * var y = [3,1];
 * atropa.arrays.subtract(x,y);
 * // returns []
 * @example
 * var x = [1,3];
 * var y = [3,1,1,9];
 * atropa.arrays.subtract(x,y);
 * // returns [9]
 * @example
 * var x = [1,3,{'aProp' : 'aVal'}];
 * var y = [3,1,{'aProp' : 'aVal'}];
 * atropa.arrays.subtract(x,y);
 * // returns [{'aProp' : 'aVal'}] 
 * // because the two objects are not the same object.
 * @example
 * var obj = {'aProp' : 'aVal'};
 * var x = [1,3,obj];
 * var y = [3,1,{'aProp' : 'aVal'}];
 * atropa.arrays.subtract(x,y);
 * // returns [{'aProp' : 'aVal'}] 
 * // because the two objects are not the same object.
 * @example
 * var obj = {'aProp' : 'aVal'}
 * var x = [1,3,obj];
 * var y = [3,1,obj];
 * atropa.arrays.subtract(x,y);
 * // returns [] 
 * // because the objects referenced in the arrays are the same object.
 */
atropa.arrays.subtract = function(a, fromB) {
    "use strict";
    var the = {};
    the.result = [];
    fromB.forEach(function(item){
        the.mark = false;
        a.forEach(function(rm){
            if(item === rm) {
                the.mark = true;
            }
        });
        if(the.mark !== true) {
            the.result.push(item);
        }
    });
    return the.result;
};
/**
 * Returns an array of values found in both of the given arrays.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130112
 * @param {Array} array1 An array.
 * @param {Array} array2 Another array.
 * @returns {Array} Returns an array of values found in both of the given
 *  arrays.
 * @example
 * var x = [1,3,4];
 * var y = [3,1,5];
 * atropa.arrays.intersect(x,y);
 * // returns [1,3]
 * @example
 * var x = [1,1,3,4];
 * var y = [3,1,1,5];
 * atropa.arrays.intersect(x,y);
 * // returns [1,1,3]
 * @example
 * var obj = {'aProp' : 'aVal'};
 * var x = [1,3,obj];
 * var y = [3,1,obj];
 * atropa.arrays.intersect(x,y);
 * // returns [1,3,{'aProp' : 'aVal'}]
 * @example
 * var obj = {'aProp' : 'aVal'};
 * var x = [1,3,{'aProp' : 'aVal'}];
 * var y = [3,1,obj];
 * atropa.arrays.intersect(x,y);
 * // returns [1,3] because the two objects are not the same object.
 * @example
 * var x = [1,3,{'aProp' : 'aVal'}];
 * var y = [3,1,{'aProp' : 'aVal'}];
 * atropa.arrays.intersect(x,y);
 * // returns [1,3] because the two objects are not the same object.
 */
atropa.arrays.intersect = function intersect(array1, array2) {
    "use strict";
    var smallArray, largeArray, intersection = [];
    if(array1.length > array2.length) {
        largeArray = array1.splice(0);
        smallArray = array2.splice(0);
    } else {
        largeArray = array2.splice(0);
        smallArray = array1.splice(0);
    }
    smallArray.forEach(function (item) {
        var idxInLargeArray = largeArray.indexOf(item);
        if (0 <= idxInLargeArray) { // has word
            intersection.push(largeArray.splice(idxInLargeArray, 1)[0]);
        }
    });
    return intersection;
};
/**
 * Calculates the frequency of items occurring in an array.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130118
 * @param {Array} arr The array to calculate frequencies from.
 * @returns {Object} Returns an object whose keys are each unique
 *  elements from the array and their value is their frequency of
 *  occurrence within the array. Be careful that your array does
 *  not contain values matching object instance property names.
 * @example
 * var x = [1,1,1,1,1,3,3];
 * atropa.arrays.getFrequency(x);
 * // returns {
 * //     "1": 5,
 * //     "3": 2
 * // }
 * @example
 * var x = ["bill", "fred", "fred", "jane"];
 * atropa.arrays.getFrequency(x);
 * // returns {
 * //     "bill": 1,
 * //     "fred": 2,
 * //     "jane": 1
 * // }
 * @example
 * var x = [1,3,{'aProp' : 'aVal'}];
 * atropa.arrays.getFrequency(x);
 * // returns {
 * //     "1": 1,
 * //     "3": 1,
 * //     "[object Object]": 1
 * // }
 * @example
 * var obj = {'aProp' : 'aVal'};
 * var otherObj = {};
 * var x = [1,3,obj,otherObj,{'aDoughnut' : 'sprinkles'}];
 * atropa.arrays.getFrequency(x);
 * // returns {
 * //     "1": 1,
 * //     "3": 1,
 * //     "[object Object]": 3
 * // }
 * @example
 * var x = [1,3,"toString"];
 * atropa.arrays.getFrequency(x);
 * // returns {
 * //     "1": 1,
 * //     "3": 1,
 * //     "toString": "function toString() {\n    [native code]\n}1"
 * // }
 */
atropa.arrays.getFrequency = function (arr) {
    "use strict";
    var out = arr.reduce(function (acc, curr) {
        if (acc[curr] === undefined) {
            acc[curr] = 1;
        } else {
            acc[curr] += 1;
        }
        return acc;
    }, {});
    return out;
};
/**
 * Gets Unique values from an array.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130118
 * @param {Array} largeArray The array with duplicate values in it.
 * @returns {Array} Returns a new array containing only the unique
 *  values found in the largeArray.
 * @example
 * var x = [1,1,1,4,4,3,6];
 * atropa.arrays.getUnique(x);
 * // returns [ "1", "4", "3", "6" ]
 * @example
 * var x = ["bill", "fred", "jane", "fred"];
 * atropa.arrays.getUnique(x);
 * // returns ["bill", "fred", "jane"]
 * @example
 * var x = [ 
 *     "bill",
 *     {"aProp" : "aValue"},
 *     {"aGuy" : "fred"},
 *     {"aLady" : "jane"}
 * ];
 * atropa.arrays.getUnique(x);
 * // returns [ "bill", "[object Object]" ]
 */
atropa.arrays.getUnique = function (largeArray) {
    "use strict";
    return Object.keys(atropa.arrays.getFrequency(largeArray)).sort();
};
/**
 * Removes empty strings from the given array.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130118
 * @param {Array} arrayWithEmptyElements The array with empty strings in it.
 * @returns {Array} Returns a new array with empty strings removed.
 * @example
 * var x = [ 10, , 5, "", '', 7 ];
 * console.log('starting length ' + x.length);
 * console.log(x);
 * x = atropa.arrays.removeEmptyElements(x);
 * console.log('ending length ' + x.length);
 * console.log(x);
 * // displays the following
 * // starting length 6
 * // [10, undefined, 5, "", "", 7]
 * // ending length 3
 * // [10, 5, 7]
 */
atropa.arrays.removeEmptyElements = function (arrayWithEmptyElements) {
    "use strict";
    return arrayWithEmptyElements.filter(function (item) {
        return !atropa.inquire.isEmptyString(item);
    });
};
/**
 * Reindexes an array.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130118
 * @param {Array} arr The array with discontinuous keys.
 * @returns {Array} Returns an array with continuous keys.
 * @example
 * var x = [ "a", "b", "c", undefined ];
 * console.log(x); // [ "a", "b", "c", undefined ]
 * console.log(x.length); // 4
 * 
 * delete x[1]; // deletes the key from the array but
 *              // the array length remains the same
 *              // at this point the arrays keys are 0, 2, and 3
 * console.log(x); // [ "a", undefined, "c", undefined ]
 * console.log(x.length); // 4
 * 
 * x = atropa.arrays.reindex(x);
 * console.log(x); //  [ "a", "c", undefined ]
 *    // note that the last element existed in the array, its value was
 *    // undefined but it did have a key so the element remains in the array.
 *    //
 *    // The deleted element was in fact deleted from the array so there was no
 *    // key x[1] at all, when trying to access this non existing element the
 *    // value of undefined was returned. This behavior is confusing unless you
 *    // think about the arrayas an object whose properties are named by
 *    // numbers. Accessing an undefined property returns undefined regardless
 *    // of whether the property existed in the past or not.
 * console.log(x.length); // 3
 */
atropa.arrays.reindex = function reindex(arr) {
    "use strict";
    var idx, out;
    out = [];
    for(idx in arr) {
        if(arr.hasOwnProperty(idx)) {
            out.push(arr[idx]);
        }
    }
    return out;
};
/**
 * Sorts an array's elements numerically.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130120
 * @param {Array} arr The array to sort. All elements of the array must be
 *  number-ish.
 * @returns {Array} Returns an array whose elements are in numeric order.
 * @example
 * var x = [3, 2, 9, 26, 10, 1, 99, 15];
 * console.log( atropa.arrays.sortNumerically(x) );
 * // logs [1, 2, 3, 9, 10, 15, 26, 99]
 */
atropa.arrays.sortNumerically = function sortNumerically(arr) {
    "use strict";
    return arr.sort(function (a, b) {
        return (a - b);
    });
};
/**
 * Throws an error, <code>String.prototype.localeCompare</code> is not 
 *  standardized.
 * 
 *  Yes, localeCompare is in the standard but, at this time the actual
 *  comparison is implementation dependant. This means that "alphabetical order"
 *  can be different on different platforms. What I found was that in node the
 *  array of <code>['a','Z','A','z']</code> would be sorted to
 *  <code>['A','Z','a','z"]</code>, while on
 *  firefox it would be sorted to <code>['a','A','z','Z']</code>. Who knows if
 *  another implementor would sort it <code>['A','a','Z','z']</code>?
 * 
 * In order to provide a reliable implementation I would have to create my own
 *  implementation of <code>String.prototype.localeCompare</code> and that's
 *  just too much work for me to do alone.
 * @throws {Error} "String.prototype.localeCompare is not standardized"
 */
atropa.arrays.sortAlphabetically = function sortAlphabetically(arr) {
    "use strict";
    throw new Error("String.prototype.localeCompare is not standardized");
};
/**
 * Deletes the given element from the array at the given index. It basically
 *  does what you would expect the delete operator to do, except the delete
 *  operator doesn't do what you would expect.
 * @param {Array} arr The array.
 * @param {Number} index The index of the element to delete.
 * @returns Returns an array with the element removed, contiguous keys, and
 *  whose length is 1 less than the input array.
 */
atropa.arrays.deleteElement = function (arr, index) {
    "use strict";
    delete arr[index];
    return atropa.arrays.reindex(arr);
};




while(atropa.data.requirements.length > 0) {
    atropa.data.requirements.pop()();
}
module.exports = atropa;

},{"atropa-header":12,"atropa-inquire":14}],11:[function(require,module,exports){
/// <reference path="../docs/vsdoc/OpenLayersAll.js"/>
var atropa = require('atropa-header');
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
 * Container for custom Errors.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @namespace Container for custom Errors.
 */
atropa.customErrors = {};

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
 */
atropa.customErrors.InvalidArgumentTypesError = function InvalidArgumentTypesError(message) {
    'use strict';
    /**
     * The name of the error. Tells the user what kind of custom
     * error has been thrown.
     * @fieldOf atropa.customErrors.InvalidArgumentTypesError#
     * @type {String}
     * @default "atropa.customErrors.InvalidArgumentTypesError"
     */
    this.name = "atropa.customErrors.InvalidArgumentTypesError";
    /**
     * The error message to send.
     * @fieldOf atropa.customErrors.InvalidArgumentTypesError#
     * @type {String}
     * @default "InvalidArgumentTypesError"
     */
    this.message = message || "InvalidArgumentTypesError";
};
atropa.customErrors.InvalidArgumentTypesError.prototype = new Error();
atropa.customErrors.InvalidArgumentTypesError.prototype.constructor = 
    atropa.customErrors.InvalidArgumentTypesError;




while(atropa.data.requirements.length > 0) {
    atropa.data.requirements.pop()();
}
module.exports = atropa;

},{"atropa-header":12}],12:[function(require,module,exports){
/// <reference path="../docs/vsdoc/OpenLayersAll.js"/>
/*jslint
    indent: 4,
    maxerr: 50,
    white: true,
    browser: true,
    devel: true,
    plusplus: true,
    regexp: true
*/
/*global XPathResult */
// end header

/**
 * Container for all Glorious classes, functions, etc.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @namespace Container for all Glorious classes, functions, etc.
 */
var atropa = {};
/**
 * Checks whether this class has been marked as unsupported and throws an 
 *  error if it has.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130308
 * @param {String} className The name of the class.
 * @param {String} errorMessage Optional. A custom error message. Defaults to
 *  atropa.data[className].error
 */
atropa.supportCheck = function (className, errorMessage) {
    "use strict";
    className = String(className);
    errorMessage = errorMessage || atropa.data[className].error;
    errorMessage = String(errorMessage);
    
    if(atropa.data[className].support === 'unsupported') {
        throw new Error(errorMessage);
    }
};
/**
 * Pushes a requirement check into atropa.data.requirements. The test
 *  tests whether the class is supported in this environment. Sets
 *  atropa.data[className]'s support to unsupported and error to errorMessage
 *  if the requirementFn returns false. The requirement checks will all be run
 *  after the library has loaded.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130308
 * @param {String} className The name of the class.
 * @param {Function} requirementFn A function to test whether or not the class
 *  is supported in this environment. If supported, returns true otherwise
 *  return false.
 * @param {String} errorMessage The error message to use when this class or its
 *  methods are called in unsupported environments. Defaults to:
 *  'The atropa.' + className + ' class is unsupported in this environment.';
 */
atropa.requires = function (className, requirementFn, errorMessage) {
    "use strict";
    var check = function () {
        var test = false;
        if(typeof className !== 'string') {
            throw new Error('atropa.requires requires the class name to be ' +
                'specified');
        }
        
        if(atropa.data[className] === undefined) {
            atropa.data[className] = {};
            
            if(typeof requirementFn !== 'function') {
                requirementFn = false;
            }
            errorMessage = errorMessage || 'The atropa.' + className +
                    ' class is unsupported in this environment.';
            try {
                test = requirementFn();
            } catch (e) {
                test = false;
            }
            
            atropa.data[className].error = errorMessage;
            
            if(test === false) {
                atropa.data[className].support = 'unsupported';
            }
        }
    };
    
    atropa.data.requirements.push(check);
};
/**
 * Container for gobal data related to the classes and functions.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @namespace Container for gobal data related to the classes and functions.
 */
atropa.data = {};

atropa.data.requirements = [];

atropa.nop = function nop () {
    "use strict";
    return null;
};
module.exports = atropa;


},{}],13:[function(require,module,exports){
/// <reference path="../docs/vsdoc/OpenLayersAll.js"/>
var atropa = require('atropa-header');
atropa.setAsOptionalArg = require('atropa-setAsOptionalArg').setAsOptionalArg;
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
    }
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
 * @requires atropa.supportCheck
 * @requires atropa.setAsOptionalArg
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
 * @see <a href="http://www.w3.org/Security/wiki/Same_Origin_Policy">
 * http://www.w3.org/Security/wiki/Same_Origin_Policy</a>
 * @example
 *  // this will inject a div element into the document body.
 *  var el = atropa.inject.element ('div');
 *  
 *  // This will inject a div with the id "myId" into the element referenced by
 *  // "container"
 *  var el = atropa.inject.element (
 *      'div', document, container, { 'id': 'myId' }, null, null
 *  );
 *  
 *  // this will inject a div into the document of an iframe referenced with "fdoc"
 *  // Just before the div is injected the callback will be called and the element
 *  // may be augmented. When the callback returns the element will be injected.
 *  var fdoc = document.getElementById('someFrame').contentWindow.document;
 *  
 *  var el = atropa.inject.element (
 *      'div', fdoc, fdoc.body, { 'id': 'myId' },
 *      null,
 *      function (myDiv) {
 *          myDiv.textContent = 'I could have attached event handlers';
 *      }
 *  );
 *  
 *  // this will inject an iframe into the document
 *  // once the iframe's document has finished loading the onload handler will be
 *  // called. If the document and the iframe are on the same domain, scripts on
 *  // the frame and the parent document will be able to commuincate with each
 *  // other.
 *  function iframeHasLoaded (message) {
 *      console.log(message);
 *  }
 *  
 *  var el = atropa.inject.element (
 *      'iframe', document, document.body,
 *      { 'id': 'myId', 'src' : 'http://localhost' },
 *      function () {
 *          iframeHasLoaded('hey look at that, the frame is ready!');
 *          // what could I do with the frame? anything I want!
 *      },
 *      null
 *  );
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
    onloadHandler = atropa.setAsOptionalArg(atropa.nop, onloadHandler);
    callback = atropa.setAsOptionalArg(atropa.nop, callback);
    
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
 * @see <a href="http://www.w3.org/Security/wiki/Same_Origin_Policy">
 * http://www.w3.org/Security/wiki/Same_Origin_Policy</a>
 * @example
 *  el = atropa.inject.hiddenFrame(
 *      'injectHiddenFrame3',
 *      'http://localhost/',
 *      null,
 *      function () {
 *          console.log('hey look at that, the frame is ready!');
 *      },
 *      null,
 *      null
 *  );
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
 * @see <a href="http://www.w3.org/Security/wiki/Same_Origin_Policy">
 * http://www.w3.org/Security/wiki/Same_Origin_Policy</a>
 * @example
 *  // Given a script "dummy.js" located at "http://localhost/dummy.js"
 *  // you can fetch the script and execute functions from within it
 *  // as soon as it has loaded into the page.
 *  
 *  // contents of "dummy.js"
 *  function dummy() {
 *      return 'dummy';
 *  }
 *  
 *  // injecting "dummy.js" into any page. The script tag isn't restricted by
 *  // the same origin policy. Host your script anywhere and inject it to any
 *  // page on the net that you want to.
 *  el = atropa.inject.script(
 *      'injectScript',
 *      'http://localhost/',
 *      document,
 *      function () {
 *          console.log(dummy());
 *      }
 *  );
 *  // you may also load scripts into iframes by replacing the third parameter
 *  // with a reference to the iframe's document object.
 */
atropa.inject.script = function (id, srcURL, docref, callback) {
    "use strict";
    atropa.supportCheck('inject');
    
    var attributes,
    elementType,
    parentNod = null,
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




while(atropa.data.requirements.length > 0) {
    atropa.data.requirements.pop()();
}
module.exports = atropa;

},{"atropa-header":12,"atropa-setAsOptionalArg":19}],14:[function(require,module,exports){
/// <reference path="../docs/vsdoc/OpenLayersAll.js"/>
var atropa = require('atropa-header');
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
 * Container for functions that test the state of inputs.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20120909
 * @namespace Container for functions that test the state of inputs.
 */
atropa.inquire = {};
/**
 * Checks whether the input is null.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20120909
 * @param {Mixed} x Any input that may or may not be null.
 * @returns {Boolean} Returns true if x === null.
 */
atropa.inquire.isNull = function (x) {
    "use strict";
    return (x === null);
};
/**
 * Checks whether the input is an object.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20120909
 * @param {Mixed} x Any input that may or may not be an object.
 * @returns {Boolean} Returns true if typeof(x) === 'object'.
 */
atropa.inquire.isObject = function (x) {
    "use strict";
    return (typeof x === 'object');
};
/**
 * Checks whether the input is both an object and not null.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20120909
 * @param {Mixed} x Any input that may or may not be both an
 * object and null.
 * @returns {Boolean} Returns true if x is both an object and
 * not null. (null is an object).
 */
atropa.inquire.isObjectNotNull = function (x) {
    "use strict";
    return atropa.inquire.isObject(x) && (!atropa.inquire.isNull(x));
};
/**
 * Checks an object for the existence of a property
 * regardless of whether the property was inherited
 * or not.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20120909
 * @param {Object} obj An object which may or may not
 * have the property identified by prop.
 * @param {String} prop A string value representing the
 * name of the property.
 * @returns {Boolean} Returns true if obj.prop exists,
 * otherwise returns false.
 */
atropa.inquire.hasProperty = function (obj, prop) {
    "use strict";
    if (atropa.inquire.isObjectNotNull(obj)) {
        return (prop in obj);
    }
    return false;
};
/**
 * Checks whether the input is an empty string.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130118
 * @param {String} str The string you want to know about
 * @returns {Boolean} Returns true if str is an empty string,
 *  otherwise returns false.
 */
atropa.inquire.isEmptyString = function (str) {
    "use strict";
    var out = false;
    if ('' === str) {
        out = true;
    }
    return out;
};




while(atropa.data.requirements.length > 0) {
    atropa.data.requirements.pop()();
}
module.exports = atropa;

},{"atropa-header":12}],15:[function(require,module,exports){
/// <reference path="../docs/vsdoc/OpenLayersAll.js"/>
var atropa = require('atropa-header');
/*jslint
    indent: 4,
    maxerr: 50,
    white: true,
    browser: true,
    devel: true,
    plusplus: true,
    regexp: true
*/
/*global atropa, XPathResult */
// end header

/**
 * Utilities for handling objects.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130121
 * @namespace Utilities for handling objects.
 */
atropa.objects = {};
/**
 * Converts an object into an array of arrays to make it possible to sort and
 *  enumerate properties reliably.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130120
 * @methodOf atropa.objects.
 * @example
 *  var x = {
 *      "stuffing" : "cotton",
 *      "nose" : "button",
 *      "name" : "bear"
 *  };
 *  console.log( atropa.objects.convertObjectToArray(x) );
 *  // logs [["stuffing", "cotton"], ["nose", "button"], ["name", "bear"]]
 * @param {Object} obj An object.
 * @returns {Array} Returns an array of arrays where each
 *  nested array will have the object's key stored in element 0 and
 *  the value stored in element 1. The reason an array of arrays is
 *  returned is because JavaScript does not guarantee the order of
 *  properties on an object so there is no relizble way to sort
 *  an objects keys or values.
 * @see "The mechanics and order of enumerating the properties [of an object]
 *  is not specified." 
 *  <a href="http://www.ecma-international.org/ecma-262/5.1/#sec-12.6.4">
 *  http://www.ecma-international.org/ecma-262/5.1/#sec-12.6.4</a>
 */
atropa.objects.convertObjectToArray = function convertObjectToArray(obj) {
    "use strict";
    var prop, out = [];
    for (prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            out.push([prop, obj[prop]]);
        }
    }
    return out;
};
/**
 * Converts an object into an array of arrays and allows for reliable sorting
 *  and enumeration.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130120
 * @example
 *  var wordsCounted, sortedByValues, sortedByProperties;
 *  wordsCounted = {
 *      "document3" : 150,
 *      "document1" : 300,
 *      "document2" : 25
 *  };
 *  // sorting by property value as numbers
 *  function valSort(a, b) {
 *      return a[1] - b[1];
 *  }
 *  // sorting by property names as strings
 *  function propSort(a, b) {
 *      return a[0].localeCompare(b[0]);
 *  }
 *  sortedByValues = atropa.objects.sort(wordsCounted, valSort);
 *  sortedByProperties = atropa.objects.sort(wordsCounted, propSort);
 *  console.log('sorted by value: ', sortedByValues);
 *  console.log('sorted by properties: ', sortedByProperties);
 *  
 *  // logs:
 *  // sorted by value: [
 *  //     ["document2", 25],
 *  //     ["document3", 150],
 *  //     ["document1", 300]
 *  // ]
 *  // sorted by properties: [
 *  //     ["document1", 300],
 *  //     ["document2", 25],
 *  //     ["document3", 150]
 *  // ]
 * @example
 *  Lexicographic sorting:
 *  This    [1, 2, 10, 'A', 'a','Z', 'z']
 *  becomes [1, 10, 2, "A", "Z", "a", "z"]
 * @param {Object} obj An object.
 * @param {Function} sortFn Optional. The sorting function. This function will
 *  be given two arguments. Compare the two arguments and return:
 *  0 if they are equal, greater than zero if the first argument
 *  is greater than the second, or less than zero if the second
 *  argument is greater than the first. If the sorting function
 *  is not given, the array will be sorted lexographically by
 *  each elements <code>toString</code> value.
 * @returns {Array} Returns an array of arrays where each
 *  nested array will have the objects key stored in element 0 and
 *  the value stored in element 1. The reason an array of arrays is
 *  returned is because JavaScript does not guarantee the order of
 *  properties on an object so there is no relizble way to sort
 *  an objects keys or values.
 * @see atropa.objects.convertObjectToArray
 * @see <a href="http://www.ecma-international.org/ecma-262/5.1/#sec-15.4.4.11">
 *  http://www.ecma-international.org/ecma-262/5.1/#sec-15.4.4.11</a>
 * @see <a href="https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/sort">
 *  https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/sort</a>
 */
atropa.objects.sort = function sort(obj, sortFn) {
    "use strict";
    return atropa.objects.convertObjectToArray(obj).sort(sortFn);
};
/**
 * Sorts an object by its values using a user defined algorithm.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130120
 * @example
 *  var wordsCounted;
 *  wordsCounted = {
 *      "document3" : 150,
 *      "document1" : 300,
 *      "document2" : 25
 *  };
 *  // sorting by values as numbers
 *  function sortFn(a, b) {
 *      return a - b;
 *  }
 *  console.log( atropa.objects.sortValues(wordsCounted, sortFn) );
 *  // logs: [["document2", 25], ["document3", 150], ["document1", 300]]
 * @param {Object} obj An object.
 * @param {Function} sortFn The sorting function. This function will
 *  be given two arguments. Compare the two arguments and return:
 *  0 if they are equal, greater than zero if the first argument
 *  is greater than the second, or less than zero if the second
 *  argument is greater than the first.
 * @returns {Array} Returns an array of arrays where each
 *  nested array will have the objects key stored in element 0 and
 *  the value stored in element 1.
 * @see atropa.objects.sort
 */
atropa.objects.sortValues = function sortValues(obj, sortFn) {
    "use strict";
    var valSort = function(a, b) {
        return sortFn(a[1], b[1]);
    };
    return atropa.objects.sort(obj, valSort);
};
/**
 * Sorts an object by its properties using a user defined algorithm.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130120
 * @example
 *  var wordsCounted;
 *  wordsCounted = {
 *      "document3" : 150,
 *      "document1" : 300,
 *      "document2" : 25
 *  };
 *  // sorting by property names as strings
 *  function sortFn(a, b) {
 *      return a.localeCompare(b);
 *  }
 *  console.log( atropa.objects.sortProperties(wordsCounted, sortFn) );
 *  // logs: [["document1", 300], ["document2", 25], ["document3", 150]]
 * @param {Object} obj An object.
 * @param {Function} sortFn The sorting function. This function will
 *  be given two arguments. Compare the two arguments and return:
 *  0 if they are equal, greater than zero if the first argument
 *  is greater than the second, or less than zero if the second
 *  argument is greater than the first.
 * @returns {Array} Returns an array of arrays where each
 *  nested array will have the objects key stored in element 0 and
 *  the value stored in element 1.
 * @see atropa.objects.sort
 */
atropa.objects.sortProperties = function sortValues(obj, sortFn) {
    "use strict";
    var propSort = function(a, b) {
        return sortFn(a[0], b[0]);
    };
    return atropa.objects.sort(obj, propSort);
};
/**
 * Sorts an object by its values numerically.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130120
 * @example
 *  var wordsCounted;
 *  wordsCounted = {
 *      "document3" : 150,
 *      "document1" : 300,
 *      "document2" : 25
 *  };
 *  console.log( atropa.objects.sortValuesNumerically(wordsCounted) );
 *  // logs [["document2", 25], ["document3", 150], ["document1", 300]]
 * @param {Object} obj A simple object where the properties
 *  all have numeric-ish values.
 * @returns {Array} Returns an array of arrays where each
 *  nested array will have the objects key stored in element 0 and
 *  the value stored in element 1.
 * @see atropa.objects.sort
 */
atropa.objects.sortValuesNumerically = function sortValuesNumerically(obj) {
    "use strict";
    function sortFn(a, b) {
        return (a - b);
    }
    return atropa.objects.sortValues(obj, sortFn);
};
/**
 * Throws an error, <code>String.prototype.localeCompare</code> is not 
 *  standardized.
 * 
 *  Yes, localeCompare is in the standard but, at this time the actual
 *  comparison is implementation dependant. This means that "alphabetical order"
 *  can be different on different platforms. What I found was that in node the
 *  array of <code>['a','Z','A','z']</code> would be sorted to
 *  <code>['A','Z','a','z"]</code>, while on
 *  firefox it would be sorted to <code>['a','A','z','Z']</code>. Who knows if
 *  another implementor would sort it <code>['A','a','Z','z']</code>?
 * 
 * In order to provide a reliable implementation I would have to create my own
 *  implementation of <code>String.prototype.localeCompare</code> and that's
 *  just too much work for me to do alone.
 * @throws {Error} "String.prototype.localeCompare is not standardized"
 */
atropa.objects.sortValuesAlphabetically = function sortValuesAlphabetically() {
    "use strict";
    throw new Error("String.prototype.localeCompare is not standardized");
};
/**
 * Sorts an object by its properties numerically.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130120
 * @example
 *  var wordsCounted;
 *  wordsCounted = {
 *      "3" : "Document A",
 *      "2" : "Document Z",
 *      "1" : "Document M"
 *  };
 *  console.log( atropa.objects.sortPropertiesNumerically(wordsCounted) );
 *  // logs: [["1", "Document M"], ["2", "Document Z"], ["3", "Document A"]]
 * @param {Object} obj A simple object where the properties
 *  all have numeric-ish values.
 * @returns {Array} Returns an array of arrays where each
 *  nested array will have the objects key stored in element 0 and
 *  the value stored in element 1.
 * @see atropa.objects.sort
 */
atropa.objects.sortPropertiesNumerically = function sortPropertiesNumerically(
    obj
) {
    "use strict";
    function sortFn(a, b) {
        return (a - b);
    }
    return atropa.objects.sortProperties(obj, sortFn);
};
/**
 * Throws an error, <code>String.prototype.localeCompare</code> is not 
 *  standardized.
 * 
 *  Yes, localeCompare is in the standard but, at this time the actual
 *  comparison is implementation dependant. This means that "alphabetical order"
 *  can be different on different platforms. What I found was that in node the
 *  array of <code>['a','Z','A','z']</code> would be sorted to
 *  <code>['A','Z','a','z"]</code>, while on
 *  firefox it would be sorted to <code>['a','A','z','Z']</code>. Who knows if
 *  another implementor would sort it <code>['A','a','Z','z']</code>?
 * 
 * In order to provide a reliable implementation I would have to create my own
 *  implementation of <code>String.prototype.localeCompare</code> and that's
 *  just too much work for me to do alone.
 * @throws {Error} "String.prototype.localeCompare is not standardized"
 */
atropa.objects.sortPropertiesAlphabetically = 
function sortPropertiesAlphabetically(obj) {
    "use strict";
    throw new Error("String.prototype.localeCompare is not standardized");
};




while(atropa.data.requirements.length > 0) {
    atropa.data.requirements.pop()();
}
module.exports = atropa;

},{"atropa-header":12}],16:[function(require,module,exports){
/// <reference path="../docs/vsdoc/OpenLayersAll.js"/>
var atropa = require('atropa-header');
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
 * Provides random strings and numbers.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20120909
 * @namespace Provides random strings and numbers.
 */
atropa.random = {};
/**
 * Gives you a random string whose length and characters you specify.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20120909
 * @param {Number} stringLength This is the length of the string.
 * @param {String} characterClass Optional. May be one of:
 *  numeric, caps, lower, alpha, alphanumeric, punctuation, vowel, consonant
 *  This is the type of characters you want returned to you. Defaults to
 *  alphanumeric.
 * @return {String} A random string of specified length and composition.
 */
atropa.random.string = function randomString(stringLength, characterClass) {
    'use strict';
    var numeric,
    vowel,
    consonant,
    lower,
    caps,
    alpha,
    alphanumeric,
    punctuation,
    chars,
    string_length,
    randomstring,
    i,
    character;
    
    numeric = '0123456789';
    vowel = 'aeiouy';
    consonant = 'bcdfghjklmnpqrstvwxz';
    lower = vowel + consonant;
    caps = lower.toUpperCase();
    alpha = caps + lower;
    alphanumeric = numeric + caps + lower;
    punctuation = '.?!';
    randomstring = '';
    switch (characterClass) {
    case 'numeric':
        chars = numeric;
        break;
    case 'caps':
        chars = caps;
        break;
    case 'lower':
        chars = lower;
        break;
    case 'alpha':
        chars = alpha;
        break;
    case 'alphanumeric':
        chars = alphanumeric;
        break;
    case 'punctuation':
        chars = punctuation;
        break;
    case 'vowel':
        chars = vowel;
        break;
    case 'consonant':
        chars = consonant;
        break;
    default:
        chars = alphanumeric;
        break;
    }
    if (stringLength === undefined) {
        string_length = 4;
    } else {
        string_length = stringLength;
    }
    for (i = 0; i < string_length; i++) {
        character = Math.floor(Math.random() * chars.length);
        randomstring += chars[character];
    }
    return randomstring;
};
/**
 * Generates a random number between the specified min and max value.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20120909
 * @param {Number} min The lowest number you want returned
 * @param {Number} max The highest number you want returned
 * @returns {Number} A random number within the specified range.
 */
atropa.random.integer = function randomInteger(min, max) {
    'use strict';
    return Math.floor(Math.random() * (max - min + 1) + min);
};
/**
 * Get a random property name from the given object.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20120909
 * @param {Object} obj The object to select a random
 *  property name from.
 * @return {String} A random property name from the
 *  given object.
 */
atropa.random.getPropertyName = function (obj) {
    "use strict";
    var arr;
    arr = Object.keys(obj);
    return arr[atropa.random.getArrayKey(arr)];
};
/**
 * Get a random key from the given array.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20120909
 * @param {Array} arr The array to select a random
 *  key from. The keys of the array must be contiguous.
 * @return {Number} A random integer between 0 and
 *  <code>arr.length</code>
 */
atropa.random.getArrayKey = function (arr) {
    "use strict";
    return Math.floor(Math.random() * arr.length);
};
/**
 * Get a random value from the given array.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20120909
 * @param {Array} arr The array to select a random
 *  value from. The keys of the array must be contiguous.
 * @return {Mixed} A random value from the given array.
 */
atropa.random.getArrayValue = function (arr) {
    "use strict";
    return arr[atropa.random.getArrayKey(arr)];
};
/**
 * Remove a random element from the given array.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20120909
 * @param {Array} arr The array to remove a random
 *  element from. The keys of the array must be contiguous.
 * @return {Mixed} A random value from the given array.
 */
atropa.random.pullArrayElement = function (arr) {
    "use strict";
    var k,
    d;
    k = atropa.random.getArrayKey(arr);
    d = arr[k];
    arr.splice(k, 1);
    return d;
};
/**
 * Remove a random property from the given object.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20120909
 * @param {Object} obj The object to remove a random
 *  property from.
 * @return {Mixed} A random value from the given object.
 */
atropa.random.pullProperty = function (obj) {
    "use strict";
    var pName,
    objData;
    pName = atropa.random.getPropertyName(obj);
    objData = obj[pName];
    delete obj[pName];
    return objData;
};




while(atropa.data.requirements.length > 0) {
    atropa.data.requirements.pop()();
}
module.exports = atropa;

},{"atropa-header":12}],17:[function(require,module,exports){
/// <reference path="../docs/vsdoc/OpenLayersAll.js"/>
var atropa = require('atropa-header');
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
 * Container for regex functions.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20120909
 * @namespace Container for regex functions.
 */
atropa.regex = {};
/**
 * Regex patterns.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @namespace Regex patterns.
 */
atropa.regex.patterns = {
    /** finds repeated words and phrases */
    repeatedWords : /(\b.{3,}\b)\s*(\1)/g,
    /** finds paragraph breaks */
    paragraphBreaks : /(\r\n\r\n|\n\n|\r\r)/g,
    /** finds line breaks */
    lineBreaks : /(\r\n|\r|\n)/g
};
/**
 * Appends common prefix, suffix, and word boundary regex strings to
 * the supplied word.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130110
 * @param {String} word The word to append prefix and suffix to
 * @param {Integer} threshold The word.length at which it does not
 * make sense to append prefix and suffix. Defaults to 3.
 * @returns {String} Returns the supplied word with prefix, suffix,
 * and word boundaries attached. If the word.length was not greater
 * than the threshold, only word boundaries are attached. The string
 * represents a RegEx which should pick out most forms of regular
 * words.
 */
atropa.regex.appendPrefixesAndSuffixes = function (word, threshold) {
    "use strict";
    var prefixes,
    suffixes;
    prefixes = '(pre|un|re)?';
    suffixes = '(ification|' +
                'tionally|' +
                'ication|' +
                'ified|istic|iness|' +
                'fare|tion|ance|ence|less|ally|able|ness|ized|ised|' +
                'ous|ify|ing|ity|ful|ant|ate|est|ism|izm|ist|' +
                'ic|al|ed|er|et|ly|rs|in|' +
                'y|s|r|d)?';
    
    threshold = threshold === undefined ? 3 : threshold;
    
    if (word.length > threshold) {
        word = '\\b' + prefixes + word + suffixes + '\\b';
    } else {
        word = '\\b()' + word + '()\\b';
    }
    return word;
};




while(atropa.data.requirements.length > 0) {
    atropa.data.requirements.pop()();
}
module.exports = atropa;

},{"atropa-header":12}],18:[function(require,module,exports){
/// <reference path="../docs/vsdoc/OpenLayersAll.js"/>
var atropa = require('atropa-header');
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
    'removeNodeByReference',
    function () {
        "use strict";
        if(document === undefined) {
            return false;
        }
        return true;
    }
);

/**
 * Removes DOM Nodes.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20120909
 * @function
 * @param {DOM Node} elementReference A reference to the DOM Node you want
 * to remove.
 */
atropa.removeNodeByReference = function (elementReference) {
    "use strict";
    atropa.supportCheck('removeNodeByReference');
    if(elementReference !== undefined) {
        elementReference.parentNode.removeChild(elementReference);
    }
};




while(atropa.data.requirements.length > 0) {
    atropa.data.requirements.pop()();
}
module.exports = atropa;

},{"atropa-header":12}],19:[function(require,module,exports){
/// <reference path="../../docs/vsdoc/OpenLayersAll.js"/>
var atropa = require('atropa-header');
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
 * Set default values for optional function parameters.
 * @example
 * <pre>
 *   // To set a default value for an optional parameter
 *   function(optionalArg) {
 *       var defaultVal = 'hello there!';
 *       optionalArg = atropa.setAsOptionalArg(defaultVal, optionalArg);
 *       return optionalArg;
 *   }
 * </pre>
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20120909
 * @param {Mixed} defaultVal The default value to set.
 * @param {Mixed} optionalArg A reference to the optional argument.
 * @returns {Mixed} Returns the default value supplied when the optional
 * argument is undefined or null. Otherwise, the supplied optional argument
 * is returned.
 */
atropa.setAsOptionalArg = function (defaultVal, optionalArg) {
    "use strict";
    if (optionalArg === undefined || optionalArg === null) {
        optionalArg = defaultVal;
    }
    return optionalArg;
};




while(atropa.data.requirements.length > 0) {
    atropa.data.requirements.pop()();
}
module.exports = atropa;

},{"atropa-header":12}],20:[function(require,module,exports){
/// <reference path="../../docs/vsdoc/OpenLayersAll.js"/>
var atropa = require('atropa-header');
atropa.regex = require('atropa-regex').regex;
atropa.arrays = require('atropa-arrays').arrays;
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
 * A few utilities for manipulating strings.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @namespace A few utilities for manipulating strings.
 * @requires atropa.regex.patterns
 */
atropa.string = {};
/**
 * Replaces repeated words and phrases with a single word or phrase.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130701
 * @param {String} string The string to remove repeated words from.
 * @returns {String} Returns the given string with repeated words and
 *  phrases removed.
 */
atropa.string.removeRepeatedWord = function removeRepeatedWord (string) {
    "use strict";
    return string.replace(atropa.regex.patterns.repeatedWords, '$1');
};
/**
 * Creates paragraph breaks at every occurrence of two consecutive line breaks.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130701
 * @param {String} string The string to insert paragraph tags into.
 * @returns {String} Returns the given string with paragraph breaks inserted.
 */
atropa.string.lineBreaksToParagraphTags = function lineBreaksToParagraphTags (string) {
    "use strict";
    var out = string.replace(atropa.regex.patterns.paragraphBreaks, '</p><p>');
    out = '<p>' + out.trim() + '</p>';
    out = out.replace(/\s+<\/(p|br)>/g, '</$1>');
    return out;
};
/**
 * Creates break tags at every line break.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130701
 * @param {String} string The string to insert break tags into.
 * @returns {String} Returns the given string with break tags inserted.
 */
atropa.string.lineBreaksToBreakTags = function lineBreaksToBreakTags (string) {
    "use strict";
    return string.replace(atropa.regex.patterns.lineBreaks, '<br>');
};
/**
 * Normalizes line breaks to `\n`.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130701
 * @param {String} string The string to normalize.
 * @returns {String} Returns the given string with normalized line breaks.
 */
atropa.string.normalizeEol = function normalizeEol (string) {
    "use strict";
    return string.replace(atropa.regex.patterns.lineBreaks, '\n');
};
/**
 * Converts the first character of a given string to
 * uppercase.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20120909
 * @param {String} string The string for which you want the
 * first letter to be in upper case.
 * @returns {String} The given string with it's first letter capitalized.
 */
atropa.string.ucFirst = function ucFirst(string) {
    "use strict";
    string = string.charAt(0).toUpperCase() + string.slice(1);
    return string;
};
/**
 * Converts the given string to camel case.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130823
 * @param {String} string The string to camelize.
 * @returns {String} The camelized string.
 * @example
 *  atropa.string.camelize('get it together');
 *  // returns "getItTogether"
 */
atropa.string.camelize = function camelize (str) {
    "use strict";
    var arr, out;
    arr = str.split(' ');
    out = arr.shift();
    arr = arr.map(function (item) {
        return atropa.string.ucFirst(item);
    });
    out += arr.join('');
    return out;
};
/**
 * Counts words.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130313
 * @param {String} someText Plain text.
 * @return {Number} Returns the count of words in someText.
 */
atropa.string.countWords = function countWords(someText) {
    "use strict";
    var wordCount, re, len = 0;
    if(someText !== undefined && someText !== null) {
        someText = someText.trim();
        if(someText !== '') {
            wordCount = 0;
            re = /\s+/gi;
            wordCount = someText.split(re);
            len = wordCount.length;
        }
    }
    return len;
};
/**
 * Converts end of line markers into whatever you want. 
 * Automatically detects any of \r\n, \n, or \r and 
 * replaces it with the user specified EOL marker.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @param {String} text The text you want processed.
 * @param {String} newEOL The replacement for the current EOL marks.
 * @returns {String} Returns the processed text.
 */
atropa.string.convertEol = function convertEOL(text, newEOL) {
    'use strict';
    return text.replace(atropa.regex.patterns.lineBreaks, newEOL);
};

/**
 * Removes a quantity of leading spaces specified by offset.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @param {String} text The text to process.
 * @param {Number} offset The amount of spaces you want removed 
 * from the beginning of the text.
 * @returns Returns the processed text.
 */
atropa.string.offsetWhiteSpace = function offsetWhiteSpace(text, offset) {
    'use strict';
    var regx;
    regx = new RegExp('^ {' + offset + '}');
    text = text.replace(regx, '');
    return text;
};

/**
 * Converts all tabs in leading whitespace into four spaces.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @param {String} text The text to process
 * @returns {String} Returns the processed text.
 */
atropa.string.normalizeWhiteSpacePrefix = function normalizeWhiteSpacePrefix(
    text
) {
    'use strict';
    var prefix = text.match(/^\s*/);
    if(prefix) {
        prefix = prefix[0];
        prefix = prefix.replace(/\t/g, '    ');
        text = text.replace(/^\s*/, prefix);
    }
    return text;
};

/**
 * Converts all tabs into four spaces.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @param {String} text The text to process
 * @returns {String} Returns the processed text.
 */
atropa.string.normalizeWhiteSpace = function normalizeWhiteSpace(text) {
    'use strict';
    text = text.replace(/\t/g, '    ');
    return text;
};

/**
 * Counts the number of leading space or tab characters but not both.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @param {String} text The text to analyze.
 * @returns {Number} Returns the quantity of leading spaces or tabs.
 */
atropa.string.getOffset = function getOffset(text) {
    'use strict';
    var offset = 0,
        leadingChar = text.charAt(0);
        
    if( leadingChar === ' ' || leadingChar === '\t') {
        while(text.charAt(offset) === leadingChar && offset < text.length) {
            offset++;
        }
    }
    return offset;
};
/**
 * Breaks a string into an array of words.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130118
 * @param {String} text The text to analyze.
 * @returns {Array} Returns an array of the words in
 *  the given text.
 * @requires atropa.arrays.removeEmptyElements
 */
atropa.string.getWords = function (text) {
    "use strict";
    var out = [];
    function invalidChars(element) {
        var matched = /^[\-'’`]+$/.test(element);
        // invert the result of test. throw out elements that match.
        return !matched;
    }
    out = atropa.arrays.removeEmptyElements(
        text.split(/[^A-Za-z\-'’`]+/gi)
    );
    out = out.filter(invalidChars);
    return out;
};
/**
 * Escapes <code>CDATA</code> sections in text
 *  so that the text may be embedded into a 
 *  <code>CDATA</code> section. This should be run
 *  on any text which may contain the string 
 *  <code>]]></code> since said string will effectively
 *  end the <code>CDATA</code> section prematurely.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130118
 * @param {String} text The text containing 
 *  <code>CDATA</code> sections to escape.
 * @returns {Array} Returns a string with escaped
 *  <code>CDATA</code> sections.
 * @see <a href="http://en.wikipedia.org/wiki/CDATA#Nesting">
 *  http://en.wikipedia.org/wiki/CDATA#Nesting</a>
 * @see <a href="https://bugzilla.mozilla.org/show_bug.cgi?id=98168">
 *  https://bugzilla.mozilla.org/show_bug.cgi?id=98168</a>
 */
atropa.string.escapeCdata = function escapeCdata(text) {
    "use strict";
    return String(text).replace(/\]\]>/g, ']]]]><![CDATA[>');
};




while(atropa.data.requirements.length > 0) {
    atropa.data.requirements.pop()();
}
module.exports = atropa;

},{"atropa-arrays":10,"atropa-header":12,"atropa-regex":17}],21:[function(require,module,exports){
/// <reference path="../../docs/vsdoc/OpenLayersAll.js"/>
var atropa = require('atropa-header');
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
 * Utilities for handling urls.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130713
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
    var filename;
    try {
        filename = String(url).replace(/.*:\/\/[^\/]+/, '').replace(/[#|?].*$/, '').match(/[^\/]+$/)[0];
    } catch (e) {
        filename = '';
    }
    if(url === filename) {
        filename = '';
    }
    return filename;
};




while(atropa.data.requirements.length > 0) {
    atropa.data.requirements.pop()();
}
module.exports = atropa;

},{"atropa-header":12}],22:[function(require,module,exports){
/// <reference path="../../docs/vsdoc/OpenLayersAll.js"/>
var atropa = require('atropa-header');
atropa.setAsOptionalArg = require('atropa-setAsOptionalArg').setAsOptionalArg;
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
 * @param {Function} testFn A function to tell when the wait is over. Must
 *  return true on success, false on failure.
 * @param {Function} onSuccessCallback Optional. The function to run when testFn
 *  returns true. Defaults to <code>function () {} </code>
 * @param {function} onMaxPollCallback Optional. The function to run when testFn
 *  has been run maxPoll times and the wait is being given up.
 * Defaults to <code>function () {}</code>
 * @param {Integer} pollInterval Optional. The amount of time in ms between
 *  polling testFn to see if it returns true. Defaults to 200ms.
 * @param {Integer} maxPoll Optional. The quantity of polls at which it makes
 *  sense to give up waiting. Defaults to 50.
 */
atropa.waitFor.test = function test(
    testFn, onSuccessCallback, onMaxPollCallback, pollInterval, maxPoll
) {
    "use strict";
    pollInterval = atropa.setAsOptionalArg(200, pollInterval);
    maxPoll = atropa.setAsOptionalArg(50, maxPoll);
    onMaxPollCallback = atropa.setAsOptionalArg(atropa.nop, onMaxPollCallback);
    onSuccessCallback = atropa.setAsOptionalArg(atropa.nop, onSuccessCallback);
    var myInt;
    var myCounter = 0;
    function waitForTestRecursor () {
        myCounter++;
        if (testFn()) {
            clearInterval(myInt);
            onSuccessCallback();
        }
        if (myCounter === maxPoll) {
            clearInterval(myInt);
            onMaxPollCallback();
        }
    }
    myInt = setInterval(waitForTestRecursor, pollInterval);
};
/**
 * Wait for Element
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20120909
 * @param {Function} testFn A function which returns a reference to an HTML
 *  Element.
 * @param {Function} Optional. onSuccessCallback
 * @param {function} Optional. onMaxPollCallback 
 * @param {Integer} Optional. pollInterval
 * @param {Integer} Optional. maxPoll
 * @see atropa.waitFor.test for more information and default values for the
 *  optional parameters.
 */
atropa.waitFor.element = function (
    testFn, onSuccessCallback, onMaxPollCallback, pollInterval, maxPoll
) {
    "use strict";
    /**
     * Creates an HTML DOM Document and puts it in the document
     * queue, then executes the callback given.
     * @author <a href="mailto:matthewkastor@gmail.com">
     *  Matthew Christopher Kastor-Inare III </a><br />
     *  ☭ Hial Atropa!! ☭
     * @version 20120909
     * @methodOf atropa.waitFor.element-
     * @private
     * @returns {Boolean} Returns true or false depending on whether the object
     *  has a tag name property.
     */
    function elementTest () {
        return atropa.inquire.hasProperty(testFn(), 'tagName');
    }
    atropa.waitFor.test(
        elementTest, onSuccessCallback, onMaxPollCallback, pollInterval, maxPoll
    );
};




while(atropa.data.requirements.length > 0) {
    atropa.data.requirements.pop()();
}
module.exports = atropa;

},{"atropa-header":12,"atropa-setAsOptionalArg":19}],23:[function(require,module,exports){
/// <reference path="../../docs/vsdoc/OpenLayersAll.js"/>
var atropa = require('atropa-header');
atropa.regex = require('atropa-regex').regex;
atropa.string = require('atropa-string').string;
atropa.setAsOptionalArg = require('atropa-setAsOptionalArg').setAsOptionalArg;
/*jslint
    indent: 4,
    maxerr: 50,
    white: true,
    browser: true,
    devel: true,
    plusplus: true,
    regexp: true,
    vars: true
*/
/*global atropa */
// end header


(function () {
    "use strict";
    atropa.requires(
        'wtf',
        function () {
            var supported = true;
            
            [
                atropa.regex,
                atropa.string.countWords,
                atropa.setAsOptionalArg
            ].forEach(function (prerequisite) {
                if(prerequisite === undefined) {
                    supported = false;
                }
            });
            return supported;
        }
    );
}());

(function () {
    "use strict";
    atropa.requires(
        'wtfHtmlElement',
        function () {
            var supported = true;
            
            [
                window
            ].forEach(function (prerequisite) {
                if(prerequisite === undefined) {
                    supported = false;
                }
            });
            return supported;
        }
    );
}());

/**
 * Container for all Glorious WTFifier related functions and such.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20120909
 * @namespace Container for all Glorious WTFifier related functions and such.
 * @requires atropa.regex
 * @requires atropa.wtf.dictionary
 */
atropa.wtf = {};
/**
 * The Glorious WTFification Dictionary: Turning Shit
 * Into Polished Turds.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130110
 */
atropa.wtf.dictionary = {
    "novelty quickly wears off" : "dumb shit gits old fast",
    "the way it is" : "how it be",
    "put up with" : "manhandle",
    "yet" : "immediately",
    "lose" : "shake",
    "for no reason" : "maiacally",
    "given a choice" : "extorted",
    "not strong enough" : "ain't got the nuts",
    "now at an end" : "brand spankin new",
    "be together" : "mash up",
    "apocalypse" : "party time",
    "nothing is assured" : "we live to deliver",
    "to no avail" : "for great good",
    "too good to be true" : "fucking fantastic",
    "growing apart" : "fucking other people",
    "rest in peace" : "party like it's 1999",
    "back stab" : "rump shake",
    "back stabb" : "rump shake",
    "look into their eyes" : "give them AIDS",
    "look into her eyes" : "give her AIDS",
    "look into his eyes" : "give him AIDS",
    "can't live without" : "touch myself about",
    "can't be without" : "touch myself about",
    "could never be without" : "can't work anal beads without",
    "no matter" : "irregardless of",
    "will be there" : "stick like shit",
    "will always be there" : "stick like wet shit",
    "holding them close to" : "handcuffing them to",
    "by your side" : "on your ass",
    "by my side" : "on my ass",
    "by his side" : "on his ass",
    "by her side" : "on her ass",
    "leave your side" : "get off your ass",
    "leave my side"   : "get off my ass",
    "leave his side"  : "get off his ass",
    "leave her side"  : "get off her ass",
    "doesn't happen over" : "cartwheels straight across",
    "means many things" : "is best described with lies",
    "laying in bed" : "taking a shit",
    "promise" : "lie",
    "liar" : "fibber",
    "lie" : "fib",
    "lies" : "fibs",
    "what's the point" : "the fucks this mean",
    "it must be true" : "for real 'n' shit",
    "what people say" : "muthaphukkas be talkin",
    "etched" : "ground",
    "don't have a clue" : "got shit twisted",
    "viscious cycle" : "clusterfuck",
    "don't need" : "could give a fuck about",
    "raven" : "pigeon",
    "to get away" : "to fucking run",
    "to a better" : "for some glittered",
    "beautiful face" : "enormous tits",
    "might as well" : "oh fuck I oughtta",
    "the first moment" : "straightaway",
    "as well" : "also",
    "so good" : "neato",
    "could do anything" : "is fucking insane",
    "set the mood" : "whip it out",
    "baby if" : "look bitch,",
    "through your hair" : "upside your head",
    "entered the house of" : "got up in the barn for",
    "always love you the same" : "always love you like my other suckers",
    "kissing other" : "going down on",
    "never thought you would do that" : "got turned out like a dumb fuck",
    "laying on the floor" : "begging for it",
    "first laid eyes on" : "first tried groping",
    "most people can only" : "most freaks and dope fiends",
    "you were the one" : "you were my target",
    "standing out from the crowd" : "wobbling like an elephant on a bicycle",
    "stood out from the crowd" : "jiggled like a jello Santa",
    "stand out from the crowd" : "look like a jackass",
    "stands out from the crowd" : "smells like old dick",
    "i've never felt this way" : "i've done this",
    "with every fiber" : "from pithy pits",
    "wander" : "stumble",
    "haunt" : "stalk",
    "mask" : "trashbag",
    "demonic angel" : "ass pirate",
    "angelic demon" : "ass pirate",
    "cunning" : "desperate",
    "dangerous" : "cock catching",
    "demi-god" : "punk bitch",
    "demigod" : "punk bitch",
    "mortal" : "queer",
    "immortal" : "whiny",
    "betrayal" : "game",
    "betray" : "screw",
    "gave up on" : "don't give a fuck about",
    "give up on" : "won't give a fuck about",
    "given up on" : "don't give a fuck about",
    "giving up on" : "ain't givin a fuck about",
    "coffin" : "tobogan",
    "beautiful" : "gaudy",
    "the best" : "the baddest",
    "selfish" : "thieving",
    "walked out" : "narrowly escaped",
    "walk out" : "narrowly escape",
    "walking out" : "narrowly escaping",
    "got in your way" : "got all up in your shit",
    "try" : "shoot",
    "the point of no return" : "the fat girls bedrooom door",
    "only wanted" : "begged for",
    "guess it doesn't matter" : "know this shit is pointless",
    "look back" : "lick windows",
    "path" : "sidewalk",
    "shine" : "bling",
    "in the middle of" : "all up in",
    "deep down inside" : "in the bottom of the tank",
    "piece by piece" : "one handjob at a time",
    "aura" : "stench",
    "candle" : "glowstick",
    "for her" : "to that broads",
    "for she" : "'cause the cunt",
    "for he" : "this dumb mother fucker",
    "forest" : "campground",
    "hand in hand" : "cock to jaw",
    "hand to hold" : "nuts to grip",
    "girl meets boy" : "horny kids hook up",
    "boy meets girl" : "horny kids hook up",
    "sunny" : "sweltering",
    "so nervous" : "so fucking drunk",
    "kiss" : "slap",
    "fingertips" : "chicken nuggets",
    "tell you i'm fine" : "screm I'M FUCKIN OK",
    "write" : "scrawl",
    "written" : "scrawled",
    "wrote" : "scrawled",
    "first of all" : "mm-kay",
    "bring forth" : "whip out",
    "into the light" : "on to the light",
    "the only one" : "fucking stupid",
    "to the light" : "out in public",
    "talk" : "cuss",
    "full of life" : "full of shit",
    "can't find the words to say" : "could blurt out some dumb shit",
    "consume" : "suck",
    "consuming" : "sucking",
    "pillow" : "stone",
    "advice" : "bullshit",
    "universe" : "toilet bowl",
    "elder" : "old folk",
    "magick" : "delusion",
    "magic" : "hope",
    "arcane" : "foolish",
    "speak of" : "talk about",
    "shall" : "should-will",
    "obtain" : "get",
    "battle" : "squabble",
    "midnight" : "daybreak",
    "sorrow" : "whimper",
    "crimson" : "azure",
    "black" : "yellow",
    "won't make it through" : "could shimmy past",
    "night" : "bedtime",
    "day" : "morning",
    "fragile" : "sturdy",
    "crack" : "mend",
    "solitude" : "ambiance",
    "torment" : "tickle",
    "incantation" : "much yammering",
    "hopeless" : "pitiful",
    "depressing" : "inebriating",
    "depressed" : "drunk",
    "depression" : "so much booze",
    "saddened" : "made flaccid",
    "sadness" : "impotence",
    "neverending" : "never ending",
    "never ending" : "relentless",
    "never going" : "fucked for trying",
    "change one thing" : "fuck some'n up",
    "never end" : "drag on",
    "will not heal" : "festers",
    "outward appearance" : "facade",
    "emo" : "closet homo",
    "blackened walls" : "filthy rooms",
    "farewell" : "adios",
    "meet again" : "have another go-round",
    "sadd" : "flaccid",
    "sad" : "impotent",
    "amidst" : "all up in",
    "midst" : "pants",
    "knowledge" : "trivia",
    "known" : "got",
    "know" : "get",
    "knew" : "got",
    "passionate" : "delirious",
    "passion" : "delirium",
    "o'" : "uh",
    "o" : "uh",
    "fang" : "denture",
    "curse" : "stain",
    "love" : "confuse",
    "vampiric" : "pedophilic",
    "vampyre" : "pedophyle",
    "vampire" : "pedophile",
    "problem" : "useless concern",
    "feel" : "fondle",
    "woe" : "chlamydia",
    "empty" : "bloated",
    "hatred" : "odium",
    "hate" : "dislike",
    "scarred" : "striated",
    "scars" : "striae",
    "scare" : "tickle",
    "scary" : "tickly",
    "scar" : "stria",
    "wound" : "ouchie",
    "slit" : "crevice",
    "slice" : "pet",
    "twas" : "it was",
    "big brother" : "my paranoia",
    "eternity" : "awhile",
    "eternally" : "for a bit",
    "eternal" : "imagined",
    "prophet" : "insomniac",
    "prophecies" : "wives tales",
    "prophecy" : "wives tale",
    "soldier" : "maniac",
    "militia" : "gang",
    "military" : "gangster",
    "militant" : "maniacal",
    "goddess" : "Kylee Strutt",
    "higher power" : "crusty sock",
    "dark" : "effervescent",
    "ancient" : "elderly",
    "quest" : "stroll",
    "heartbeat" : "cock beat",
    "heart" : "cock",
    "blood" : "grease",
    "bleed" : "whine",
    "cut" : "mutilate",
    "slash" : "mutilate",
    "moonlight" : "moonshine",
    "moon" : "night light",
    "steel" : "latex",
    "knife" : "dildo",
    "razorblade" : "butt plug",
    "razor" : "dildo",
    "blade" : "handle",
    "pain" : "hot sex",
    "emotional" : "childish",
    "emotion" : "lubricant",
    "teardrop" : "tear drop",
    "tear" : "sperme",
    "castle" : "chateau",
    "world" : "hand towel",
    "dead" : "inert",
    "goodbye" : "peace y'all",
    "good-bye" : "get the fuck out",
    "good bye" : "fuck off",
    "death" : "Santa",
    "pale" : "sexy",
    "drift" : "him-haw",
    "fade" : "him-haw",
    "flesh" : "twinkie",
    "corpse" : "mannequin",
    "skin" : "twinkies",
    "putrid" : "pleasant",
    "breathe" : "pause awkwardly",
    "breath" : "awkward pause",
    "stopp" : "push",
    "stop" : "push",
    "scream" : "grunt",
    "think" : "scheme",
    "spiritual" : "banana craving",
    "spirit" : "banana",
    "soul" : "banana",
    "ghost" : "imaginary friend",
    "monster" : "dislexic lover",
    "beast" : "erection",
    "demon" : "hard-on",
    "angel" : "porn star",
    "shooting star" : "swift missile",
    "star" : "missile",
    "lost" : "aroused",
    "time" : "throbbing",
    "cheek" : "rump",
    "fingers" : "sausage",
    "daydream" : "fantasize",
    "the spring" : "tube sock",
    "spring" : "tube socks",
    "illusion" : "drunken mistake",
    "loneliness" : "arousal",
    "lonely" : "horny",
    "alone" : "ecstatic",
    "lone" : "single",
    "perfect" : "fucked",
    "hidden" : "stashed",
    "mystery" : "neon sign",
    "mysteries" : "neon signs",
    "rose" : "butt hole",
    "petal" : "dingleberry",
    "different" : "awkward",
    "wrong" : "buzzing",
    "fate" : "coincidence",
    "cold" : "fuzzy",
    "hellfire" : "hell fire",
    "hell" : "my cock's",
    "crystal" : "bedazler",
    "rainbow" : "pizzazz",
    "rain" : "jizzum",
    "storm" : "orgy",
    "wind" : "blow",
    "breeze" : "draft",
    "brilliance" : "shinyness",
    "brilliant" : "shiny",
    "dreamland" : "obsession island",
    "dreams" : "obsessions",
    "dream" : "obsess",
    "prison" : "outhouse",
    "golden ray" : "gaudy scribble",
    "ray" : "scribble",
    "deadly" : "fertile",
    "truth" : "trivia",
    "sun" : "yellow disk",
    "cruel" : "haphazard",
    "cloud" : "balloon",
    "twinkle" : "strobe",
    "twinkling" : "strobing",
    "escape" : "snuggle",
    "understand" : "stroke my ego",
    "remember" : "mumble",
    "illumination" : "mumbo jumbo",
    "reality" : "toilet bowl",
    "bind" : "coddle",
    "bound" : "coddled",
    "torn" : "huggled",
    "died" : "made marshmallows",
    "dies" : "makes marshmallows",
    "die" : "make marshmallows",
    "dying" : "making marshmallows",
    "body" : "jiggling clump",
    "bodies" : "jiggling piles",
    "warfare" : "children laughing",
    "debutantes" : "hookers",
    "slave" : "gimp",
    "poetic" : "flatulent",
    "poetry" : "bad gas",
    "poet" : "hobo",
    "poem" : "scribble",
    "country" : "bathroom",
    "naked" : "unshaved",
    "jesus christ" : "jim bob jr",
    "christ" : "jim bob jr",
    "jesus" : "jim bob jr",
    "healer" : "fondler",
    "gods" : "jim bob sr et al.",
    "god" : "jim bob sr",
    "weapon" : "pocket pussy",
    "existence" : "whatever",
    "minion" : "horny pirate",
    "raping" : "what",
    "rape" : "what",
    "gravestone" : "mile marker",
    "grave" : "personal space",
    "infinite" : "abstract",
    "suicide" : "murder",
    "brink" : "border",
    "cried" : "came",
    "cries" : "skeets",
    "crying" : "cumming",
    "had done" : "done did",
    "cry" : "cum",
    "cryptic" : "drunken",
    "crypt" : "urinal",
    "mystic" : "transexual",
    "balanced individual" : "psycho",
    "balanced person" : "psycho",
    "balanced man" : "psycho",
    "balanced woman" : "psycho",
    "wisdom" : "bull shit",
    "wise" : "bull shitting",
    "blessed be" : "suck eggs",
    "energy" : "juice",
    "riddle" : "polka dot",
    "my lord" : "sweet palm",
    "so mote it be" : "it's real in my head",
    "pray" : "murmur",
    "nomad" : "drunk hobo",
    "destiny" : "taxes",
    "sword" : "dildo",
    "void" : "bucket",
    "just" : "sure",
    "vengeance" : "slap happiness",
    "avenge" : "git rowdy for",
    "venge" : "-rowdy-",
    "heavens" : "skies",
    "heaven" : "sky",
    "endless" : "real long",
    "valley" : "ditch",
    "arduous" : "not easy",
    "touch" : "grope",
    "wretched" : "skeezy",
    "wretch" : "skeeze",
    "awe" : "fearful reverence",
    "ritual" : "banana dance",
    "behold" : "oogle",
    "veil" : "disguise",
    "vista" : "scene",
    "always" : "usually",
    "believe" : "buy",
    "wish" : "want",
    "fell" : "flopped",
    "fall" : "flop",
    "righteous" : "arrogant",
    "warrior" : "kitten",
    "uncaring" : "prickish",
    "care to give" : "shit to give",
    "take care of" : "decimate",
    "taking care" : "forgeting",
    "takes care" : "forgets",
    "take care" : "forget",
    "forget" : "disremember",
    "caring" : "giving a shit",
    "cared" : "gave a shit",
    "care" : "give a shit",
    "wield" : "jerk",
    "ocean" : "sewer",
    "sea" : "bath",
    "bay" : "sink",
    "twilight" : "moonshine",
    "broken" : "beaten",
    "broke" : "beat",
    "break" : "beat",
    "forever" : "so very",
    "human race" : "gerbil empire",
    "nightmare" : "tantrum",
    "suffer" : "pirouette",
    "myself" : "my muchness",
    "me" : "i",
    "my" : "i's ",
    "mine" : "i's",
    "was i" : "were i",
    "am i" : "are i",
    "im" : "i'm",
    "i'm" : "i are",
    "i've" : "i have",
    "i'll" : "i will",
    "i am" : "i are",
    "yourself" : "you's muchness",
    "yours" : "you's",
    "your" : "you's",
    "you all" : "all you",
    "you'll" : "you will",
    "you've" : "you has",
    "you're" : "you is",
    "thee" : "you",
    "thine" : "you's",
    "thou" : "you",
    "we" : "they",
    "us" : "them",
    "our" : "their",
    "ours" : "theirs",
    "i" : "Kevin",
    "you" : "Retards"
};
/**
 * Accepts plain text input and Gloriously WTFifies it.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130110
 * @param {String} target The text to WTFify.
 * @param {Boolean} outputHTML Specifies if you want the output
 *  in HTML format. If false, will output plain text. Defaults
 *  to false.
 * @return {String} Returns Genuine WTFified text.
 */
atropa.wtf.wtfify = function (target, outputHTML) {
    "use strict";
    atropa.supportCheck('wtf');
    
    var regexValue,
        replacementText,
        oldWord,
        wtfCount,
        wordCount,
        ret,
        word;
    
    if(true !== outputHTML) {
        outputHTML = false;
    }
    ret = {};
    wtfCount = 0;
    target = target.trim();
    wordCount = atropa.string.countWords(target);
    if(true === outputHTML) {
        target = target.replace(
            /(\. ?){2,}/gi,
            '<span style="color : brown ;"> [shit taco] </span>'
        );
        target = '<p> ' + target.replace(/(\r\n|\r|\n)/g,' <br/> ') + ' </p>';
    } else {
        target = target.replace(/(\. ?){2,}/gi, ' [shit taco] ');
    }
    /**
     * Accepts plain text input and Gloriously WTFifies it.
     * @author <a href="mailto:matthewkastor@gmail.com">
     *  Matthew Christopher Kastor-Inare III </a><br />
     *  ☭ Hial Atropa!! ☭
     * @version 20130112
     * @methodOf atropa.wtf.wtfify-
     * @private
     * @param {String} m First matched pattern in string searched.
     * @param {String} sub1 First matched subpattern in string searched.
     * @param {String} sub2 Second matched subpattern in string searched.
     */
    replacementText = function (m, sub1, sub2) {
        wtfCount++;
        sub1 = atropa.setAsOptionalArg('', sub1);
        sub2 = atropa.setAsOptionalArg('', sub2);
        var out;
        if(true === outputHTML) {
            out = '<span style="color : red ;">' +
                sub1 + atropa.wtf.dictionary[word] + sub2 +
                '</span>';
        } else {
            out = sub1 + atropa.wtf.dictionary[word] + sub2;
        }
        return out;
    };
    // word is defined in the containing scope and
    // is not global, jshint is wrong
    for (word in atropa.wtf.dictionary) {
        if (atropa.wtf.dictionary.hasOwnProperty(word)) {
            oldWord = atropa.regex.appendPrefixesAndSuffixes(word);
            regexValue = new RegExp(oldWord, 'gi');
            target = target.replace(regexValue, replacementText);
        }
    }
    ret.wtfCount = wtfCount;
    ret.wordCount = wordCount;
    ret.score = wtfCount / wordCount;
    ret.txt = target;
    return ret;
};
/**
 * WTFifies the <code>textContent</code> or <code>value</code> of the
 *  given element and replaces the element's innerHTML with a pre block
 *  containing the results of WTFification.
 * @param {HTMLElement} elementReference A reference to an HTML Element.
 * @returns {HTMLElement} Returns the given element after wtfification.
 * @version 20130313
 */
atropa.wtf.htmlElement = function (elementReference) {
    "use strict";
    atropa.supportCheck('wtfHtmlElement');
    
    var wtfified, txt;
    elementReference.innerHTML = elementReference.innerHTML.replace(
        /<br>(\s+)?(\r\n|\r|\n)?/g, '\r\n');
    txt = elementReference.value || elementReference.textContent;
    wtfified = atropa.wtf.wtfify(txt, true);
    elementReference.innerHTML =
        '<pre style="color:black; background:white; white-space:pre-wrap;">' +
        wtfified.txt +
        '</pre>';
    return elementReference;
};




while(atropa.data.requirements.length > 0) {
    atropa.data.requirements.pop()();
}
module.exports = atropa;

},{"atropa-header":12,"atropa-regex":17,"atropa-setAsOptionalArg":19,"atropa-string":20}],24:[function(require,module,exports){
/// <reference path="../../docs/vsdoc/OpenLayersAll.js"/>
var atropa = require('atropa-header');
atropa.setAsOptionalArg = require('atropa-setAsOptionalArg').setAsOptionalArg;
atropa.removeNodeByReference = require('atropa-removeNodeByReference').removeNodeByReference;
/*jslint
    indent: 4,
    maxerr: 50,
    white: true,
    browser: true,
    devel: true,
    plusplus: true,
    regexp: true
*/
/*global atropa, XPathResult */
// end header


(function () {
    "use strict";
    atropa.requires(
        'xpath',
        function () {
            var supported = true;
            
            [
                window,
                document.evaluate
            ].forEach(function (prerequisite) {
                if(prerequisite === undefined) {
                    supported = false;
                }
            });
            return supported;
        }
    );
}());

/**
 * An Xpath toolkit for manipulating the DOM.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130313
 * @namespace An Xpath toolkit for manipulating the DOM.
 */
atropa.xpath = {};
/**
 * Processes nodes from the DOM using an Xpath expression.
 * @example
 *   // Say you wanted to touch all the anchors and links in window.document
 *   var xpathExpression, callback;
 *   xpathExpression = './/a';
 *   callback = function(oneNode) {
 *       oneNode.touched = true;
 *   }
 *   atropa.xpath.processNodesByXpath(
 *       xpathExpression, document, document, callback);
 *   
 *   // Or say you have an iframe, with the id 'myFrame'. In the iframe there
 *   // is a div with the id myDiv.
 *   // Here is how you would remove all the anchors in that div.
 *   var myFrame, xpathExpression, contextNode, docref, callback;
 *   myFrame = document.getElementById('myFrame');
 *   docref = myFrame.contentWindow.document;
 *   contextNode = docref.getElementById('myDiv');
 *   xpathExpression = './/a';
 *   callback = function(oneNode) {
 *       atropa.removeNodeByReference(oneNode);
 *   }
 *   atropa.xpath.processNodesByXpath(
 *       xpathExpression, contextNode, docref, callback);
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130313
 * @param {String} xpathExpression An Xpath expression as a string
 * @param {DOM Node} contextNode Optional. The node which is to serve as the root
 * for the supplied Xpath expression. Defaults to whatever docref is.
 * If you are using a relative path such as <code>.//a</code> and, you only
 * want the anchors that are descendants of another element, you would
 * supply a reference to that element for this argument. When using a
 * context node, the docref argument must refer to the context node's
 * containing document.
 * @param {DOM Document} docref Optional. A reference to the document you
 * are searching, defaults to document. If you have created a separate
 * DOMDocument with the <code>atropa.HTMLParser</code>, an iframe, or by
 * some other means, you would put a reference to that document here to
 * indicate that you intend to use that document's root.
 * @param {Function} callback A function applied to every element found
 * using the supplied xpath expression. The callback receives a single
 * element as it's only argument.
 * @returns {Number} Returns the quantity of nodes processed.
 */
atropa.xpath.processNodesByXpath = function processNodesByXpath(
    xpathExpression, contextNode, docref, callback
) {
    "use strict";
    atropa.supportCheck('xpath');
    docref = atropa.setAsOptionalArg(document, docref);
    contextNode = atropa.setAsOptionalArg(docref, contextNode);
    var nodesSnapshot,
    nsl,
    i,
    nsi;
    nodesSnapshot = docref.evaluate(
        xpathExpression,
        contextNode,
        null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null
    );
    nsl = nodesSnapshot.snapshotLength;
    for (i = 0; i < nsl; i++) {
        nsi = nodesSnapshot.snapshotItem(i);
        callback(nsi);
    }
    return i;
};
/**
 * Removes nodes from the DOM using an Xpath expression.
 * @example
 *   // to remove all anchors with the class "oops" inside of any div in
 *   // document
 *   var xpathExpression = ".//div//a[@class='oops']";
 *   atropa.xpath.removeNodesByXpath(xpathExpression);
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130313
 * @param {String} xpathExpression An Xpath expression as a string
 * @param {DOM Node} contextNode Optional. The node which is to serve as the root
 * for the supplied Xpath expression. Defaults to whatever docref is.
 * @param {DOM Document} docref Optional. A reference to the document you
 * are searching, defaults to document.
 * @returns {Number} Returns the quantity of nodes removed.
 * @see atropa.xpath.processNodesByXpath for more information.
 */
atropa.xpath.removeNodesByXpath = function removeNodesByXpath(
    xpathExpression, contextNode, docref
) {
    "use strict";
    atropa.supportCheck('xpath');
    var count;
    count = atropa.xpath.processNodesByXpath(
        xpathExpression,
        contextNode,
        docref,
        function (element) {
            atropa.removeNodeByReference(element);
        }
    );
    return count;
};
/**
 * Selects nodes from the DOM using an Xpath expression.
 * @example
 * <pre>
 *   // To get all the elements in the document with a src attribute:
 *   var srcElements = atropa.xpath.getNodesByXpath('[@src]');
 * </pre>
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130313
 * @param {String} xpathExpression An Xpath expression as a string
 * @param {DOM Node} contextNode Optional. The node which is to serve as the root
 * for the supplied Xpath expression. Defaults to the document's root node.
 * @param {DOM Document} docref Optional. A reference to the document you
 * are searching, defaults to document.
 * @returns {Array} Returns an array whose elements are DOM Nodes
 * @see atropa.xpath.processNodesByXpath for more information.
 */
atropa.xpath.getNodesByXpath = function getNodesByXpath(
    xpathExpression, contextNode, docref
) {
    'use strict';
    atropa.supportCheck('xpath');
    var elementReferences;
    elementReferences = [];
    atropa.xpath.processNodesByXpath(
        xpathExpression,
        contextNode,
        docref,
        function (element) {
            elementReferences.push(element);
        }
    );
    return elementReferences;
};
/**
 * Escapes single quotes (apostrope) in Xpath queries.
 * @example
 * <pre>
 *  // this is useful for using arbitrary strings in your queries.
 *  var arbStr, escapedStr, xpathExpression, foundNodes;
 *  arbStr = "Jimmy ain't never said \"Shur\" Why? I don't know!";
 *  escapedStr = atropa.xpath.escapeQuotesXpath(arbStr);
 *  // produces: concat('Jimmy ain', "'", 't never said "Shur" Why? I don', "'",
 *  // 't know!')
 *  // it is much easier to deal with the variable name than it is to deal with
 *  // all those quotes and commas!
 *  xpathExpression = './/p[contains(text(),' + escapedStr + ')]';
 *  foundNodes = atropa.xpath.getNodesByXpath(xpathExpression);
 *  // found nodes will contain the p elements where the text was matched.
 * </pre>
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20120909
 * @param {String} string An Xpath query
 * @returns {String} Returns a string representing a concat function in Xpath
 * which will effectively work in escaping quotes in your xpath query.
 */
atropa.xpath.escapeQuotesXpath = function escapeQuotesXpath(string) {
    'use strict';
    string = string.replace(/\'/g, "', \"'\", '");
    string = string.replace(/^(.*)$/g, "concat('$1')");
    return string;
};




while(atropa.data.requirements.length > 0) {
    atropa.data.requirements.pop()();
}
module.exports = atropa;

},{"atropa-header":12,"atropa-removeNodeByReference":18,"atropa-setAsOptionalArg":19}],25:[function(require,module,exports){
/*jslint
    node : true
*/

var atropa = require('atropa-header');

function linkData(obj) {
    'use strict';
    Object.keys(obj.data).filter(function (prop) {
        return prop !== 'requirements';
    }).forEach(function (prop) {
        atropa.data[prop] = obj.data[prop];
    });
}

var ArgsInfo = require('atropa-ArgsInfo');
linkData(ArgsInfo);
atropa.ArgsInfo = ArgsInfo.ArgsInfo;

var arrays = require('atropa-arrays');
linkData(arrays);
atropa.arrays = arrays.arrays;

var Babbler = require('atropa-Babbler');
linkData(Babbler);
atropa.Babbler = Babbler.Babbler;

var CookieMonster = require('atropa-CookieMonster');
linkData(CookieMonster);
atropa.CookieMonster = CookieMonster.CookieMonster;

var CreateHtmlDocumentsFromXmlhttp = require('atropa-CreateHtmlDocumentsFromXmlhttp');
linkData(CreateHtmlDocumentsFromXmlhttp);
atropa.CreateHtmlDocumentsFromXmlhttp = CreateHtmlDocumentsFromXmlhttp.CreateHtmlDocumentsFromXmlhttp;

var customErrors = require('atropa-customErrors');
linkData(customErrors);
atropa.customErrors = customErrors.customErrors;

var HTMLParser = require('atropa-HTMLParser');
linkData(HTMLParser);
atropa.HTMLParser = HTMLParser.HTMLParser;

var inject = require('atropa-inject');
linkData(inject);
atropa.inject = inject.inject;

var inquire = require('atropa-inquire');
linkData(inquire);
atropa.inquire = inquire.inquire;

var objects = require('atropa-objects');
linkData(objects);
atropa.objects = objects.objects;

var random = require('atropa-random');
linkData(random);
atropa.random = random.random;

var regex = require('atropa-regex');
linkData(regex);
atropa.regex = regex.regex;

var removeNodeByReference = require('atropa-removeNodeByReference');
linkData(removeNodeByReference);
atropa.removeNodeByReference = removeNodeByReference.removeNodeByReference;

var Requester = require('atropa-Requester');
linkData(Requester);
atropa.Requester = Requester.Requester;

var SerialActor = require('atropa-SerialActor');
linkData(SerialActor);
atropa.SerialActor = SerialActor.SerialActor;

var setAsOptionalArg = require('atropa-setAsOptionalArg');
linkData(setAsOptionalArg);
atropa.setAsOptionalArg = setAsOptionalArg.setAsOptionalArg;

var string = require('atropa-string');
linkData(string);
atropa.string = string.string;

var TextAnalyzer = require('atropa-TextAnalyzer');
linkData(TextAnalyzer);
atropa.TextAnalyzer = TextAnalyzer.TextAnalyzer;

var url = require('atropa-url');
linkData(url);
atropa.url = url.url;

var waitFor = require('atropa-waitFor');
linkData(waitFor);
atropa.waitFor = waitFor.waitFor;

var wtf = require('atropa-wtf');
linkData(wtf);
atropa.wtf = wtf.wtf;

var xpath = require('atropa-xpath');
linkData(xpath);
atropa.xpath = xpath.xpath;

module.exports = atropa;
},{"atropa-ArgsInfo":2,"atropa-Babbler":3,"atropa-CookieMonster":4,"atropa-CreateHtmlDocumentsFromXmlhttp":5,"atropa-HTMLParser":6,"atropa-Requester":7,"atropa-SerialActor":8,"atropa-TextAnalyzer":9,"atropa-arrays":10,"atropa-customErrors":11,"atropa-header":12,"atropa-inject":13,"atropa-inquire":14,"atropa-objects":15,"atropa-random":16,"atropa-regex":17,"atropa-removeNodeByReference":18,"atropa-setAsOptionalArg":19,"atropa-string":20,"atropa-url":21,"atropa-waitFor":22,"atropa-wtf":23,"atropa-xpath":24}]},{},[1])
//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXGthc3RvclxcRGVza3RvcFxcbm9kZV9tb2R1bGVzXFxhdHJvcGEtdG9vbGJveFxcbm9kZV9tb2R1bGVzXFxicm93c2VyaWZ5XFxub2RlX21vZHVsZXNcXGJyb3dzZXItcGFja1xcX3ByZWx1ZGUuanMiLCJDOi9Vc2Vycy9rYXN0b3IvRGVza3RvcC9ub2RlX21vZHVsZXMvYXRyb3BhLXRvb2xib3gvZGV2L2Jyb3dzZXJNYWluLmpzIiwiQzovVXNlcnMva2FzdG9yL0Rlc2t0b3Avbm9kZV9tb2R1bGVzL2F0cm9wYS10b29sYm94L25vZGVfbW9kdWxlcy9hdHJvcGEtQXJnc0luZm8vc3JjL2F0cm9wYS1BcmdzSW5mby5qcyIsIkM6L1VzZXJzL2thc3Rvci9EZXNrdG9wL25vZGVfbW9kdWxlcy9hdHJvcGEtdG9vbGJveC9ub2RlX21vZHVsZXMvYXRyb3BhLUJhYmJsZXIvc3JjL2F0cm9wYS1CYWJibGVyLmpzIiwiQzovVXNlcnMva2FzdG9yL0Rlc2t0b3Avbm9kZV9tb2R1bGVzL2F0cm9wYS10b29sYm94L25vZGVfbW9kdWxlcy9hdHJvcGEtQ29va2llTW9uc3Rlci9zcmMvYXRyb3BhLUNvb2tpZU1vbnN0ZXIuanMiLCJDOi9Vc2Vycy9rYXN0b3IvRGVza3RvcC9ub2RlX21vZHVsZXMvYXRyb3BhLXRvb2xib3gvbm9kZV9tb2R1bGVzL2F0cm9wYS1DcmVhdGVIdG1sRG9jdW1lbnRzRnJvbVhtbGh0dHAvc3JjL2F0cm9wYS1DcmVhdGVIdG1sRG9jdW1lbnRzRnJvbVhtbGh0dHAuanMiLCJDOi9Vc2Vycy9rYXN0b3IvRGVza3RvcC9ub2RlX21vZHVsZXMvYXRyb3BhLXRvb2xib3gvbm9kZV9tb2R1bGVzL2F0cm9wYS1IVE1MUGFyc2VyL3NyYy9hdHJvcGEtSFRNTFBhcnNlci5qcyIsIkM6L1VzZXJzL2thc3Rvci9EZXNrdG9wL25vZGVfbW9kdWxlcy9hdHJvcGEtdG9vbGJveC9ub2RlX21vZHVsZXMvYXRyb3BhLVJlcXVlc3Rlci9zcmMvYXRyb3BhLVJlcXVlc3Rlci5qcyIsIkM6L1VzZXJzL2thc3Rvci9EZXNrdG9wL25vZGVfbW9kdWxlcy9hdHJvcGEtdG9vbGJveC9ub2RlX21vZHVsZXMvYXRyb3BhLVNlcmlhbEFjdG9yL3NyYy9hdHJvcGEtU2VyaWFsQWN0b3IuanMiLCJDOi9Vc2Vycy9rYXN0b3IvRGVza3RvcC9ub2RlX21vZHVsZXMvYXRyb3BhLXRvb2xib3gvbm9kZV9tb2R1bGVzL2F0cm9wYS1UZXh0QW5hbHl6ZXIvc3JjL2F0cm9wYS1UZXh0QW5hbHl6ZXIuanMiLCJDOi9Vc2Vycy9rYXN0b3IvRGVza3RvcC9ub2RlX21vZHVsZXMvYXRyb3BhLXRvb2xib3gvbm9kZV9tb2R1bGVzL2F0cm9wYS1hcnJheXMvc3JjL2F0cm9wYS1hcnJheXMuanMiLCJDOi9Vc2Vycy9rYXN0b3IvRGVza3RvcC9ub2RlX21vZHVsZXMvYXRyb3BhLXRvb2xib3gvbm9kZV9tb2R1bGVzL2F0cm9wYS1jdXN0b21FcnJvcnMvc3JjL2F0cm9wYS1jdXN0b21FcnJvcnMuanMiLCJDOi9Vc2Vycy9rYXN0b3IvRGVza3RvcC9ub2RlX21vZHVsZXMvYXRyb3BhLXRvb2xib3gvbm9kZV9tb2R1bGVzL2F0cm9wYS1oZWFkZXIvc3JjL2F0cm9wYS1oZWFkZXIuanMiLCJDOi9Vc2Vycy9rYXN0b3IvRGVza3RvcC9ub2RlX21vZHVsZXMvYXRyb3BhLXRvb2xib3gvbm9kZV9tb2R1bGVzL2F0cm9wYS1pbmplY3Qvc3JjL2F0cm9wYS1pbmplY3QuanMiLCJDOi9Vc2Vycy9rYXN0b3IvRGVza3RvcC9ub2RlX21vZHVsZXMvYXRyb3BhLXRvb2xib3gvbm9kZV9tb2R1bGVzL2F0cm9wYS1pbnF1aXJlL3NyYy9hdHJvcGEtaW5xdWlyZS5qcyIsIkM6L1VzZXJzL2thc3Rvci9EZXNrdG9wL25vZGVfbW9kdWxlcy9hdHJvcGEtdG9vbGJveC9ub2RlX21vZHVsZXMvYXRyb3BhLW9iamVjdHMvc3JjL2F0cm9wYS1vYmplY3RzLmpzIiwiQzovVXNlcnMva2FzdG9yL0Rlc2t0b3Avbm9kZV9tb2R1bGVzL2F0cm9wYS10b29sYm94L25vZGVfbW9kdWxlcy9hdHJvcGEtcmFuZG9tL3NyYy9hdHJvcGEtcmFuZG9tLmpzIiwiQzovVXNlcnMva2FzdG9yL0Rlc2t0b3Avbm9kZV9tb2R1bGVzL2F0cm9wYS10b29sYm94L25vZGVfbW9kdWxlcy9hdHJvcGEtcmVnZXgvc3JjL2F0cm9wYS1yZWdleC5qcyIsIkM6L1VzZXJzL2thc3Rvci9EZXNrdG9wL25vZGVfbW9kdWxlcy9hdHJvcGEtdG9vbGJveC9ub2RlX21vZHVsZXMvYXRyb3BhLXJlbW92ZU5vZGVCeVJlZmVyZW5jZS9zcmMvYXRyb3BhLXJlbW92ZU5vZGVCeVJlZmVyZW5jZS5qcyIsIkM6L1VzZXJzL2thc3Rvci9EZXNrdG9wL25vZGVfbW9kdWxlcy9hdHJvcGEtdG9vbGJveC9ub2RlX21vZHVsZXMvYXRyb3BhLXNldEFzT3B0aW9uYWxBcmcvc3JjL2F0cm9wYS1zZXRBc09wdGlvbmFsQXJnLmpzIiwiQzovVXNlcnMva2FzdG9yL0Rlc2t0b3Avbm9kZV9tb2R1bGVzL2F0cm9wYS10b29sYm94L25vZGVfbW9kdWxlcy9hdHJvcGEtc3RyaW5nL3NyYy9hdHJvcGEtc3RyaW5nLmpzIiwiQzovVXNlcnMva2FzdG9yL0Rlc2t0b3Avbm9kZV9tb2R1bGVzL2F0cm9wYS10b29sYm94L25vZGVfbW9kdWxlcy9hdHJvcGEtdXJsL3NyYy9hdHJvcGEtdXJsLmpzIiwiQzovVXNlcnMva2FzdG9yL0Rlc2t0b3Avbm9kZV9tb2R1bGVzL2F0cm9wYS10b29sYm94L25vZGVfbW9kdWxlcy9hdHJvcGEtd2FpdEZvci9zcmMvYXRyb3BhLXdhaXRGb3IuanMiLCJDOi9Vc2Vycy9rYXN0b3IvRGVza3RvcC9ub2RlX21vZHVsZXMvYXRyb3BhLXRvb2xib3gvbm9kZV9tb2R1bGVzL2F0cm9wYS13dGYvc3JjL2F0cm9wYS13dGYuanMiLCJDOi9Vc2Vycy9rYXN0b3IvRGVza3RvcC9ub2RlX21vZHVsZXMvYXRyb3BhLXRvb2xib3gvbm9kZV9tb2R1bGVzL2F0cm9wYS14cGF0aC9zcmMvYXRyb3BhLXhwYXRoLmpzIiwiQzovVXNlcnMva2FzdG9yL0Rlc2t0b3Avbm9kZV9tb2R1bGVzL2F0cm9wYS10b29sYm94L3NyYy9hdHJvcGEtdG9vbGJveC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbE9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3VUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUxBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25XQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1YUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdFFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDalNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0dBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDem9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbk9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImF0cm9wYSA9IHJlcXVpcmUoJy4uL3NyYy9hdHJvcGEtdG9vbGJveC5qcycpOyIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9kb2NzL3ZzZG9jL09wZW5MYXllcnNBbGwuanNcIi8+XG52YXIgYXRyb3BhID0gcmVxdWlyZSgnYXRyb3BhLWhlYWRlcicpO1xuYXRyb3BhLmlucXVpcmUgPSByZXF1aXJlKCdhdHJvcGEtaW5xdWlyZScpLmlucXVpcmU7XG5hdHJvcGEuYXJyYXlzID0gcmVxdWlyZSgnYXRyb3BhLWFycmF5cycpLmFycmF5cztcbmF0cm9wYS5jdXN0b21FcnJvcnMgPSByZXF1aXJlKCdhdHJvcGEtY3VzdG9tRXJyb3JzJykuY3VzdG9tRXJyb3JzO1xuLypqc2xpbnRcbiAgICBpbmRlbnQ6IDQsXG4gICAgbWF4ZXJyOiA1MCxcbiAgICB3aGl0ZTogdHJ1ZSxcbiAgICBicm93c2VyOiB0cnVlLFxuICAgIGRldmVsOiB0cnVlLFxuICAgIHBsdXNwbHVzOiB0cnVlLFxuICAgIHJlZ2V4cDogdHJ1ZVxuKi9cbi8qZ2xvYmFsIGF0cm9wYSAqL1xuLy8gZW5kIGhlYWRlclxuXG4vKipcbiAqIFRoaXMgcmVwcmVzZW50cyBhIGZpbHRlciBmb3IgYXJndW1lbnRzIGJhc2VkIG9uIHR5cGUuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQHZlcnNpb24gMjAxMzAyMjFcbiAqIEBjbGFzcyBUaGlzIHJlcHJlc2VudHMgYSBmaWx0ZXIgZm9yIGFyZ3VtZW50cyBiYXNlZCBvbiB0eXBlLlxuICogQHJldHVybnMge0FyZ3NJbmZvfSBSZXR1cm5zIGFuIEFyZ3NJbmZvIGZpbHRlci5cbiAqIEByZXF1aXJlcyBhdHJvcGEuYXJyYXlzLm1hdGNoXG4gKiBAZXhhbXBsZVxuICogZnVuY3Rpb24gbXlDbGFzc3lDb25zdHJ1Y3Rvcih0YWtlcywgYSwgZmV3LCBhcmdzKSB7XG4gKiAgICAgdmFyIGV4cGVjdGVkQXJnVHlwZXMsIGNoZWNrZXI7XG4gKiAgICAgXG4gKiAgICAgZXhwZWN0ZWRBcmdUeXBlcyA9IHt9O1xuICogICAgIGV4cGVjdGVkQXJnVHlwZXMucmVxdWVzdFdpdGhNZXNzYWdlID0gXG4gKiAgICAgICAgICBbJ3N0cmluZycsICdzdHJpbmcnLCAnc3RyaW5nJywgJ2Z1bmN0aW9uJ107XG4gKiAgICAgZXhwZWN0ZWRBcmdUeXBlcy5yZXF1ZXN0TnVsbE1lc3NhZ2UgPSBcbiAqICAgICAgICAgIFsnc3RyaW5nJywgJ3N0cmluZycsICdvYmplY3QnLCAnZnVuY3Rpb24nXTtcbiAqICAgICBcbiAqICAgICBjaGVja2VyID0gbmV3IGF0cm9wYS5BcmdzSW5mbygpO1xuICogICAgIGNoZWNrZXIuc2V0RXhwZWN0ZWRBcmdUeXBlcyhleHBlY3RlZEFyZ1R5cGVzKTtcbiAqICAgICBcbiAqICAgICB0cnkge1xuICogICAgIFxuICogICAgICAgICAvLyBDaGVjayB0aGUgc3VwcGxpZWQgYXJndW1lbnRzIHBzZXVkbyBhcnJheSdzIGFyZ3VtZW50IHR5cGVzXG4gKiAgICAgICAgIC8vIGlmIHRoZSBwYXR0ZXJuIG9mIHR5cGVzIGluIGFyZ3VtZW50cyBtYXRjaGVzIG9uZSBvZiB0aGVcbiAqICAgICAgICAgLy8gcGF0dGVybnMgc2V0IG9uIGV4cGVjdGVkQXJnVHlwZXMgdGhlbiB0aGUgbWF0Y2hpbmcgcGF0dGVyblxuICogICAgICAgICAvLyB3aWxsIGJlIHJldHVybmVkLiBPdGhlcndpc2UsIGFuIGVycm9yIHdpbGwgYmUgdGhyb3duLlxuICogICAgICAgICBcbiAqICAgICAgICAgY2hlY2tlci5jaGVja0FyZ1R5cGVzKGFyZ3VtZW50cyk7XG4gKiAgICAgfSBjYXRjaCAoZSkge1xuICogICAgIFxuICogICAgICAgICAvLyBJbnZhbGlkIGFyZ3VtZW50IHR5cGVzIHN1cHBsaWVkLiBIYW5kbGVcbiAqICAgICAgICAgLy8gdGhlIGVycm9yIG9yIGJhaWwuXG4gKiAgICAgICAgIFxuICogICAgIH1cbiAqICAgICBcbiAqICAgICAvLyB0aGUgYXJndW1lbnRzIHN1cHBsaWVkIHdpbGwgYmUgb2YgdGhlIHByb3BlciB0eXBlXG4gKiAgICAgLy8geW91ciBmdW5jdGlvbiBjYW4gZ28gYWhlYWQgYW5kIGRvIHRoaW5ncyB3aXRoIHRoZW1cbiAqIH1cbiAqL1xuYXRyb3BhLkFyZ3NJbmZvID0gZnVuY3Rpb24gQXJnc0luZm8oKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuICAgIHZhciBleHBlY3RlZEFyZ1R5cGVzLFxuICAgIGNoZWNrQXJncyxcbiAgICB0aGF0O1xuICAgIC8qKlxuICAgICAqIEhvbGRzIHRoZSBwcm9wZXIgcmVmZXJlbmNlIHRvIDxjb2RlPnRoaXM8L2NvZGU+XG4gICAgICogZm9yIHByaXZhdGUgZnVuY3Rpb25zLlxuICAgICAqIEB0eXBlIFRoaXNcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBmaWVsZE9mIGF0cm9wYS5BcmdzSW5mby1cbiAgICAgKi9cbiAgICB0aGF0ID0gdGhpcztcbiAgICAvKipcbiAgICAgKiBIb2xkcyB0aGUgZXhwZWN0ZWQgYXJndW1lbnQgdHlwZXMgb2JqZWN0LlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHR5cGUgRXhwZWN0ZWQgQXJnIFR5cGVzXG4gICAgICogQGZpZWxkT2YgYXRyb3BhLkFyZ3NJbmZvLVxuICAgICAqL1xuICAgIGV4cGVjdGVkQXJnVHlwZXMgPSB7fTtcbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBleHBlY3RlZCBhcmd1bWVudCB0eXBlcy5cbiAgICAgKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAgICAgKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAgICAgKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gICAgICogQHZlcnNpb24gMjAxMjA5MDlcbiAgICAgKiBAbWV0aG9kT2YgYXRyb3BhLkFyZ3NJbmZvI1xuICAgICAqIEBwYXJhbSB7RXhwZWN0ZWQgQXJnIFR5cGVzfSB0eXBlc09iaiBBbiBvYmplY3QgY29udGFpbmluZyBpbmZvcm1hdGlvblxuICAgICAqICBhYm91dCB0aGUgdHlwZXMgb2YgYXJndW1lbnRzIHlvdSBleHBlY3QuIFNwZWNpZmljYWxseSwgdGhlIG9iamVjdCBzaG91bGRcbiAgICAgKiAgbG9vayBsaWtlIHRoZSBleGFtcGxlLlxuICAgICAqIEBleGFtcGxlXG4gICAgICogLy8gdHlwZXNPYmogaXMgZXhwZWN0ZWQgdG8gYmUgb2YgdGhlIGZvcm06XG4gICAgICogXG4gICAgICogdmFyIHR5cGVzT2JqID0ge1xuICAgICAqICAgICBcIm5hbWVkQXJndW1lbnRUeXBlc0FycmF5XCIgOiBbXCJzdHJpbmdcIiwgXCJmdW5jdGlvblwiLCBcIm51bWJlclwiXSxcbiAgICAgKiAgICAgXCJuYW1lZEFsdGVybmF0ZUFyZ3VtZW50VHlwZXNBcnJheVwiIDogW1wib2JqZWN0XCIsIFwiZnVuY3Rpb25cIiwgXCJudW1iZXJcIl1cbiAgICAgKiB9O1xuICAgICAqIFxuICAgICAqIC8vIFlvdSBtYXkgdXNlIGFzIG1hbnkgbmFtZWQgYXJyYXlzIGFzIHlvdSB3aXNoIGFuZCBjaGVja0FyZ1R5cGVzIHdpbGxcbiAgICAgKiAvLyB0ZXN0IGZvciBhIG1hdGNoIHRvIGF0IGxlYXN0IG9uZSBvZiB0aGUgcHJvdmlkZWQgbmFtZWQgYXJyYXlzLlxuICAgICAqIEB0aHJvd3Mge2F0cm9wYS5jdXN0b21FcnJvcnMuSW52YWxpZEFyZ3VtZW50VHlwZXNFcnJvcn0gVGhyb3dzIGFuIGVycm9yIGlmIHRoZVxuICAgICAqICB0eXBlc09iaiBjYW4gbm90IGJlIHVzZWQgdG8gc2V0IHRoZSBleHBlY3RlZCBhcmd1bWVudCB0eXBlcy5cbiAgICAgKi9cbiAgICB0aGlzLnNldEV4cGVjdGVkQXJnVHlwZXMgPSBmdW5jdGlvbiBzZXRFeHBlY3RlZEFyZ1R5cGVzKHR5cGVzT2JqKSB7XG4gICAgICAgIHZhciBlcnJvciwgbmFtZXM7XG4gICAgICAgIFxuICAgICAgICBlcnJvciA9IGZhbHNlO1xuICAgICAgICBcbiAgICAgICAgaWYoYXRyb3BhLmlucXVpcmUuaXNPYmplY3ROb3ROdWxsKHR5cGVzT2JqKSkge1xuICAgICAgICAgICAgbmFtZXMgPSBPYmplY3Qua2V5cyh0eXBlc09iaik7XG4gICAgICAgICAgICBpZiAobmFtZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGV4cGVjdGVkQXJnVHlwZXMgPSB0eXBlc09iajtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZXJyb3IgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZXJyb3IgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZihlcnJvcikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IGF0cm9wYS5jdXN0b21FcnJvcnMuSW52YWxpZEFyZ3VtZW50VHlwZXNFcnJvcihcbiAgICAgICAgICAgICAgICAndHlwZXNPYmogaXMgZXhwZWN0ZWQgdG8gYmUgb2YgdGhlIGZvcm06IHZhciB0eXBlc09iaiA9ICcgK1xuICAgICAgICAgICAgICAgICd7IFwibmFtZWRBcmd1bWVudFR5cGVzQXJyYXlcIiA6ICcgK1xuICAgICAgICAgICAgICAgICcgICAgW1wic3RyaW5nXCIsIFwiZnVuY3Rpb25cIiwgXCJudW1iZXJcIl0sICcgK1xuICAgICAgICAgICAgICAgICdcIm5hbWVkQWx0ZXJuYXRlQXJndW1lbnRUeXBlc0FycmF5XCIgOiAnICtcbiAgICAgICAgICAgICAgICAnICAgW1wib2JqZWN0XCIsIFwiZnVuY3Rpb25cIiwgXCJudW1iZXJcIl0gfTsgJyArXG4gICAgICAgICAgICAgICAgJ1lvdSBtYXkgdXNlIGFzIG1hbnkgbmFtZWQgYXJyYXlzIGFzIHlvdSB3aXNoIGFuZCcgK1xuICAgICAgICAgICAgICAgICdjaGVja0FyZ1R5cGVzIHdpbGwgdGVzdCBmb3IgYSBtYXRjaCB0byBhdCBsZWFzdCBvbmUgb2YgdGhlICcgK1xuICAgICAgICAgICAgICAgICdwcm92aWRlZCBuYW1lZCBhcnJheXMuJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgdHlwZXMgb2YgYXJndW1lbnRzLlxuICAgICAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICAgICAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICAgICAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAgICAgKiBAdmVyc2lvbiAyMDEyMDkwOVxuICAgICAqIEBtZXRob2RPZiBhdHJvcGEuQXJnc0luZm8jXG4gICAgICogQHBhcmFtIHthcmd1bWVudHN9IGFyZ3MgQW4gYXJndW1lbnRzIG9iamVjdCwgb3IgYW55dGhpbmcgeW91IHdhbnQgdG9cbiAgICAgKiBjaGVjayB0aGUgdHlwZSBvZi5cbiAgICAgKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYW4gYXJyYXkgb2YgdGhlIHR5cGVzIG9mIGFyZ3VtZW50cyBwYXNzZWQgaW4uXG4gICAgICovXG4gICAgdGhpcy5nZXRBcmdUeXBlcyA9IGZ1bmN0aW9uIGdldEFyZ1R5cGVzKGFyZ3MpIHtcbiAgICAgICAgdmFyIHgsXG4gICAgICAgIGFyZ1R5cGVzO1xuICAgICAgICBhcmdUeXBlcyA9IFtdO1xuICAgICAgICBmb3IgKHggaW4gYXJncykge1xuICAgICAgICAgICAgaWYgKGFyZ3MuaGFzT3duUHJvcGVydHkoeCkpIHtcbiAgICAgICAgICAgICAgICBhcmdUeXBlcy5wdXNoKHR5cGVvZihhcmdzW3hdKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFyZ1R5cGVzO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQ29tcGFyZXMgdGhlIGV4cGVjdGVkIGFyZ3VtZW50cyB0eXBlcyB0byB0aGVcbiAgICAgKiByZWNlaXZlZCBhcmd1bWVudHMgdHlwZXMuXG4gICAgICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gICAgICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gICAgICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICAgICAqIEB2ZXJzaW9uIDIwMTIwOTA5XG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAbWV0aG9kT2YgYXRyb3BhLkFyZ3NJbmZvLVxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGV4cGVjdGVkVHlwZXNBcnJheSBBbiBhcnJheSB0YWtlbiBmcm9tIHRoZSB1c2VyXG4gICAgICogY3JlYXRlZCBhcmd1bWVudCB0eXBlcyBvYmplY3QuXG4gICAgICogQHBhcmFtIHthcmd1bWVudHN9IGFyZ3MgYW4gYXJndW1lbnRzIG9iamVjdC5cbiAgICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIHRoZSBleHBlY3RlZCB0eXBlcyBtYXRjaCBmb3IgdHlwZVxuICAgICAqICBhbmQgYXJlIGluIHRoZSBzYW1lIG9yZGVyIGFzIHRoZSByZWNlaXZlZCB0eXBlcy5cbiAgICAgKiBAcmVxdWlyZXMgYXRyb3BhLmFycmF5cy5tYXRjaFxuICAgICAqL1xuICAgIGNoZWNrQXJncyA9IGZ1bmN0aW9uIGNoZWNrQXJncyhleHBlY3RlZFR5cGVzQXJyYXksIGFyZ3MpIHtcbiAgICAgICAgdmFyIHR5cGVzO1xuICAgICAgICB0eXBlcyA9IHt9O1xuICAgICAgICB0eXBlcy5leHBlY3RlZCA9IGV4cGVjdGVkVHlwZXNBcnJheTtcbiAgICAgICAgdHlwZXMucmVjZWl2ZWQgPSB0aGF0LmdldEFyZ1R5cGVzKGFyZ3MpO1xuICAgICAgICByZXR1cm4gYXRyb3BhLmFycmF5cy5tYXRjaCh0eXBlcy5leHBlY3RlZCwgdHlwZXMucmVjZWl2ZWQpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQ2hlY2tzIHRoZSBnaXZlbiBhcmd1bWVudHMgb2JqZWN0IGFnYWluc3QgdGhlIGV4cGVjdGVkXG4gICAgICogYXJndW1lbnRzIHR5cGVzLlxuICAgICAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICAgICAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICAgICAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAgICAgKiBAdmVyc2lvbiAyMDEyMDkwOVxuICAgICAqIEBtZXRob2RPZiBhdHJvcGEuQXJnc0luZm8jXG4gICAgICogQHBhcmFtIHthcmd1bWVudHN9IGFyZ3MgQW4gYXJndW1lbnRzIG9iamVjdFxuICAgICAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSB1c2VyIGFzc2lnbmVkIGtleSB3aGljaCBtYXRjaGVzIHRoZVxuICAgICAqIGFyZ3VtZW50cyBzdXBwbGllZCwgb3IgdGhyb3dzIGFuIGVycm9yLlxuICAgICAqIEB0aHJvd3Mge2F0cm9wYS5jdXN0b21FcnJvcnMuSW52YWxpZEFyZ3VtZW50VHlwZXNFcnJvcn0gVGhyb3dzIGFuIGVycm9yIGlmIG5vIG1hdGNoaW5nXG4gICAgICogIHBhdHRlcm4gb2YgYXJndW1lbnQgdHlwZXMgY2FuIGJlIGZvdW5kIGZvciA8Y29kZT5hcmdzPC9jb2RlPlxuICAgICAqIEBzZWUgYXRyb3BhLkFyZ3NJbmZvI3NldEV4cGVjdGVkQXJnVHlwZXNcbiAgICAgKi9cbiAgICB0aGlzLmNoZWNrQXJnVHlwZXMgPSBmdW5jdGlvbiBjaGVja0FyZ1R5cGVzKGFyZ3MpIHtcbiAgICAgICAgdmFyIGV4cGVjdGVkVHlwZXM7XG4gICAgICAgIGlmIChPYmplY3Qua2V5cyhleHBlY3RlZEFyZ1R5cGVzKS5sZW5ndGggPCAxKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgYXRyb3BhLmN1c3RvbUVycm9ycy5JbnZhbGlkQXJndW1lbnRUeXBlc0Vycm9yKFxuICAgICAgICAgICAgICAgICdFeHBlY3RlZCBhcmd1bWVudCB0eXBlcyBpcyBub3Qgc2V0LiBVc2UgJyArXG4gICAgICAgICAgICAgICAgJ3NldEV4cGVjdGVkQXJnVHlwZXModHlwZXNPYmopIHRvIHNldC4gdHlwZXNPYmogaXMgYW4gJyArXG4gICAgICAgICAgICAgICAgJ29iamVjdCB3aG9zZSBwcm9wZXJ0aWVzIGFyZSBhcnJheXMgb2Ygc3RyaW5ncyByZXByZXNlbnRpbmcgJyArXG4gICAgICAgICAgICAgICAgJ3RoZSB0eXBlb2YoYXJndW1lbnQpIGZvciBlYWNoIGFyZ3VtZW50LCBpbiB0aGUgZXhhY3Qgb3JkZXIgJyArXG4gICAgICAgICAgICAgICAgJ2luIHdoaWNoIHRoZXkgd2lsbCBiZSBnaXZlbiB0byB0aGUgZnVuY3Rpb24uIFVzaW5nIG11bHRpcGxlICcgK1xuICAgICAgICAgICAgICAgICdwcm9wZXJ0aWVzIGl0IGlzIHBvc3NpYmxlIHRvIGRlZmluZSBhbHRlcm5hdGl2ZSBhY2NlcHRhYmxlICcgK1xuICAgICAgICAgICAgICAgICdhcmd1bWVudCB0eXBlIHNldHMuIFVzZSBnZXRBcmdUeXBlcyhhcmd1bWVudHMpIGFzIGEgJyArXG4gICAgICAgICAgICAgICAgJ2NvbnZlbmllbnQgd2F5IG9mIGdldHRpbmcgdGhlIGFycmF5IHlvdSB3YW50IHRvIGhhcmQgY29kZSAnICtcbiAgICAgICAgICAgICAgICAnaW4gZm9yIHZhbGlkYXRpb24uIEV4YW1wbGU6IHZhciB0eXBlc09iaiA9ICcgK1xuICAgICAgICAgICAgICAgICd7IFwibWVzc2FnZUluY2x1ZGVkXCIgOiBbXCJzdHJpbmdcIiwgXCJmdW5jdGlvblwiLCBcIm51bWJlclwiXSwgJyArXG4gICAgICAgICAgICAgICAgJ1wibWVzc2FnZU5vdEluY2x1ZGVkXCIgOiBbXCJvYmplY3RcIiwgXCJmdW5jdGlvblwiLCBcIm51bWJlclwiXSB9OydcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChleHBlY3RlZFR5cGVzIGluIGV4cGVjdGVkQXJnVHlwZXMpIHtcbiAgICAgICAgICAgIGlmIChleHBlY3RlZEFyZ1R5cGVzLmhhc093blByb3BlcnR5KGV4cGVjdGVkVHlwZXMpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNoZWNrQXJncyhleHBlY3RlZEFyZ1R5cGVzW2V4cGVjdGVkVHlwZXNdLCBhcmdzKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXhwZWN0ZWRUeXBlcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgbmV3IGF0cm9wYS5jdXN0b21FcnJvcnMuSW52YWxpZEFyZ3VtZW50VHlwZXNFcnJvcihcbiAgICAgICAgICAgICdpbnZhbGlkIGFyZ3VtZW50IHR5cGUgQCBhdHJvcGEuQXJnc0luZm8uY2hlY2tBcmdUeXBlcycpO1xuICAgIH07XG59O1xuXG5cblxuXG53aGlsZShhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMubGVuZ3RoID4gMCkge1xuICAgIGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5wb3AoKSgpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBhdHJvcGE7XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vZG9jcy92c2RvYy9PcGVuTGF5ZXJzQWxsLmpzXCIvPlxudmFyIGF0cm9wYSA9IHJlcXVpcmUoJ2F0cm9wYS1oZWFkZXInKTtcbmF0cm9wYS5yYW5kb20gPSByZXF1aXJlKCdhdHJvcGEtcmFuZG9tJykucmFuZG9tO1xuYXRyb3BhLnN0cmluZyA9IHJlcXVpcmUoJ2F0cm9wYS1zdHJpbmcnKS5zdHJpbmc7XG4vKmpzbGludFxuICAgIGluZGVudDogNCxcbiAgICBtYXhlcnI6IDUwLFxuICAgIHdoaXRlOiB0cnVlLFxuICAgIGJyb3dzZXI6IHRydWUsXG4gICAgZGV2ZWw6IHRydWUsXG4gICAgcGx1c3BsdXM6IHRydWUsXG4gICAgcmVnZXhwOiB0cnVlXG4qL1xuLypnbG9iYWwgYXRyb3BhICovXG4vLyBlbmQgaGVhZGVyXG5cbmF0cm9wYS5yZXF1aXJlcyhcbiAgICAnQmFiYmxlcicsXG4gICAgZnVuY3Rpb24gKCkge1xuICAgICAgICBcInVzZSBzdHJpY3RcIjtcbiAgICAgICAgdmFyIHN1cHBvcnRlZCA9IHRydWU7XG4gICAgICAgIFxuICAgICAgICBbXG4gICAgICAgICAgICBhdHJvcGEucmFuZG9tLmludGVnZXIsXG4gICAgICAgICAgICBhdHJvcGEuc3RyaW5nLnVjRmlyc3QsXG4gICAgICAgICAgICBhdHJvcGEucmFuZG9tLnN0cmluZ1xuICAgICAgICBdLmZvckVhY2goZnVuY3Rpb24gKHByZXJlcXVpc2l0ZSkge1xuICAgICAgICAgICAgaWYocHJlcmVxdWlzaXRlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBzdXBwb3J0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBzdXBwb3J0ZWQ7XG4gICAgfVxuKTtcblxuLyoqXG4gKiBUaGlzIGNsYXNzIHJlcHJlc2VudHMgYSBiYWJibGVyLiBUaGUgYmFiYmxlclxuICogcHJvZHVjZXMgbG9ydW0gaXBzdW0gdGV4dCwgdG8gdXNlciBzcGVjaWZpY2F0aW9ucy5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAdmVyc2lvbiAyMDEzMDMxM1xuICogQGNsYXNzIFRoaXMgY2xhc3MgcmVwcmVzZW50cyBhIGJhYmJsZXJcbiAqIEBwYXJhbSB7TnVtYmVyfSB3cmRDb3VudCBUaGUgYW1vdW50IG9mIFwid29yZHNcIiB5b3Ugd291bGQgbGlrZVxuICogdGhlIGJhYmJsZXIgdG8gcHJvZHVjZS5cbiAqIEByZXR1cm5zIHtCYWJibGVyfSBSZXR1cm5zIGEgYmFiYmxlci5cbiAqIEByZXF1aXJlcyBhdHJvcGEucmFuZG9tLmludGVnZXJcbiAqIEByZXF1aXJlcyBhdHJvcGEuc3RyaW5nLnVjRmlyc3RcbiAqIEByZXF1aXJlcyBhdHJvcGEucmFuZG9tLnN0cmluZ1xuICogQGV4YW1wbGVcbiAqIHZhciBiYWJibGVyID0gbmV3IGF0cm9wYS5CYWJibGVyKDMwKTtcbiAqIC8vIHJlc2V0cyB0aGUgd29yZCBjb3VudFxuICogYmFiYmxlci5yZXNldFdvcmRDb3VudCgxMClcbiAqIGNvbnNvbGUubG9nKGJhYmJsZXIuZ2V0V29yZENvdW50KCkpO1xuICogXG4gKiAvLyBkaXNwbGF5cyBhIDEwIHdvcmQgc2VudGVuY2Ugb2Ygbm9uc2Vuc2Ugd29yZHMuXG4gKiBjb25zb2xlLmxvZyhiYWJibGVyLmdlbmVyYXRlQmFiYmxlKDEwKSk7XG4gKiAvLyBkaXNwbGF5cyBhIDMgd29yZCBzZW50ZW5jZVxuICogY29uc29sZS5sb2coYmFiYmxlci5nZW5lcmF0ZUJhYmJsZSgzKSk7XG4gKiBcbiAqIC8vIGRpc3BsYXlzIHRoZSB1c2VyIHN0b3JlZCBvciBsYXN0IGdlbmVyYXRlZCBiYWJibGVcbiAqIGNvbnNvbGUubG9nKGJhYmJsZXIuZ2V0QmFiYmxlKCkpO1xuICogXG4gKiAvLyBjbGVhcnMgdGhlIHN0b3JlZCBiYWJibGVcbiAqIGJhYmJsZXIucmVzZXRCYWJibGUoKTtcbiAqIGNvbnNvbGUubG9nKGJhYmJsZXIuZ2V0QmFiYmxlKCkpO1xuICogXG4gKiAvLyBzZXRzIHRoZSBiYWJibGVcbiAqIGJhYmJsZXIuc2V0QmFiYmxlKCdoZXJlIGJlIGdpYmJlcmlzaCAnKTtcbiAqIGNvbnNvbGUubG9nKGJhYmJsZXIuZ2V0QmFiYmxlKCkpO1xuICogXG4gKiAvLyBhcHBlbmQgbW9yZSBnaWJiZXJpc2ggdG8gdGhlIGN1cnJlbnQgYmFiYmxlXG4gKiBiYWJibGVyLnNldEJhYmJsZShiYWJibGVyLmdldEJhYmJsZSgpICsgYmFiYmxlci5nZW5lcmF0ZUJhYmJsZSg1KSk7XG4gKiBjb25zb2xlLmxvZyhiYWJibGVyLmdldEJhYmJsZSgpKTtcbiAqIFxuICogLy8gZ2VuZXJhdGUgYSBzZW50ZW5jZVxuICogYmFiYmxlci5yZXNldFdvcmRDb3VudCgxMCk7XG4gKiBjb25zb2xlLmxvZyhiYWJibGVyLmdlbmVyYXRlU2VudGVuY2UoNSwgMjApKTtcbiAqIFxuICogLy8gZ2VuZXJhdGUgcmFuZG9tIHB1bmN0dWF0aW9uXG4gKiBjb25zb2xlLmxvZyhiYWJibGVyLnB1bmN0dWF0ZSgpKTtcbiAqIFxuICogLy8gZ2VuZXJhdGUgYSB3b3JkXG4gKiBjb25zb2xlLmxvZyhiYWJibGVyLmdlbmVyYXRlV29yZCgzLDcpKTtcbiAqIGNvbnNvbGUubG9nKGJhYmJsZXIuZ2VuZXJhdGVXb3JkKDcsMTApKTtcbiAqL1xuYXRyb3BhLkJhYmJsZXIgPSBmdW5jdGlvbiBCYWJibGVyKHdyZENvdW50KSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuICAgIHZhciBteSA9IHRoaXMsXG4gICAgICAgIGJhYmJsZSA9ICcnLFxuICAgICAgICB3b3JkQ291bnQgPSAwO1xuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIHdvcmQgY291bnQuXG4gICAgICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gICAgICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gICAgICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICAgICAqIEB2ZXJzaW9uIDIwMTMwMzEzXG4gICAgICogQG1ldGhvZE9mIGF0cm9wYS5CYWJibGVyI1xuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB3cmRDb3VudCBUaGUgYW1vdW50IG9mIFwid29yZHNcIiB3aGljaCB5b3Ugd2FudCB0aGVcbiAgICAgKiBiYWJibGVyIHRvIHByb2R1Y2UuXG4gICAgICogQHJldHVybnMge051bWJlcn0gUmV0dXJucyB0aGUgc2V0IHdvcmQgY291bnQgZm9yIHRoaXMgYmFiYmxlci5cbiAgICAgKi9cbiAgICB0aGlzLnNldFdvcmRDb3VudCA9IGZ1bmN0aW9uICh3cmRDb3VudCkge1xuICAgICAgICBpZiAodHlwZW9mIHdyZENvdW50ICE9PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgd29yZENvdW50ID0gMjUwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgd29yZENvdW50ID0gd3JkQ291bnQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHdvcmRDb3VudDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJlc2V0cyB0aGUgd29yZCBjb3VudCBmb3IgdGhpcyBiYWJibGVyLlxuICAgICAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICAgICAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICAgICAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAgICAgKiBAdmVyc2lvbiAyMDEzMDMxM1xuICAgICAqIEBtZXRob2RPZiBhdHJvcGEuQmFiYmxlciNcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gd29yZENvdW50IFRoZSBhbW91bnQgb2YgXCJ3b3Jkc1wiIHlvdSB3b3VsZCBsaWtlXG4gICAgICogdG8gc2V0IGZvciB0aGlzIGJhYmJsZXIuXG4gICAgICogQHJldHVybnMge051bWJlcn0gUmV0dXJucyB0aGUgc2V0IHdvcmQgY291bnQgZm9yIHRoaXMgYmFiYmxlci5cbiAgICAgKi9cbiAgICB0aGlzLnJlc2V0V29yZENvdW50ID0gZnVuY3Rpb24gcmVzZXRXb3JkQ291bnQod29yZENvdW50KSB7XG4gICAgICAgIG15LnNldFdvcmRDb3VudCh3b3JkQ291bnQpO1xuICAgICAgICByZXR1cm4gd29yZENvdW50O1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgY3VycmVudCB3b3JkIGNvdW50LlxuICAgICAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICAgICAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICAgICAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAgICAgKiBAdmVyc2lvbiAyMDEyMDkwOVxuICAgICAqIEBtZXRob2RPZiBhdHJvcGEuQmFiYmxlciNcbiAgICAgKiBAcmV0dXJucyB7TnVtYmVyfSBSZXR1cm5zIHRoZSB3b3JkIGNvdW50IGZvciB0aGlzIGJhYmJsZXIuXG4gICAgICovXG4gICAgdGhpcy5nZXRXb3JkQ291bnQgPSBmdW5jdGlvbiBnZXRXb3JkQ291bnQoKSB7XG4gICAgICAgIHJldHVybiB3b3JkQ291bnQ7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZW5lcmF0ZXMgYSB3b3JkIHdpdGggYSBzcGVjaWZpZWQgbGVuZ3RoLiBMb3dlcnMgdGhlIHdvcmQgY291bnQgYnkgb25lLlxuICAgICAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICAgICAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICAgICAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAgICAgKiBAdmVyc2lvbiAyMDEyMDkwOVxuICAgICAqIEBtZXRob2RPZiBhdHJvcGEuQmFiYmxlciNcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gc3RyaW5nTWluIHRoZSBzaG9ydGVzdCB3b3JkLCBpbiBjaGFyYWN0ZXJzLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBzdHJpbmdNYXggVGhlIGxvbmdlc3Qgd29yZCwgaW4gY2hhcmFjdGVycy5cbiAgICAgKiBAcmV0dXJucyB7U3RyaW5nfSBSZXR1cm5zIGEgcmFuZG9tIHN0cmluZyBvZiBjaGFyYWN0ZXJzXG4gICAgICogd2l0aGluIHRoZSBzcGVjaWZpZWQgcmFuZ2Ugb2YgbGVuZ3RoLlxuICAgICAqIEByZXF1aXJlcyBhdHJvcGEucmFuZG9tLmludGVnZXJcbiAgICAgKiBAcmVxdWlyZXMgYXRyb3BhLnJhbmRvbS5zdHJpbmdcbiAgICAgKi9cbiAgICB0aGlzLmdlbmVyYXRlV29yZCA9IGZ1bmN0aW9uIGdlbmVyYXRlV29yZChzdHJpbmdNaW4sIHN0cmluZ01heCkge1xuICAgICAgICB2YXIgd29yZExlbmd0aCxcbiAgICAgICAgd29yZDtcbiAgICAgICAgd29yZExlbmd0aCA9IGF0cm9wYS5yYW5kb20uaW50ZWdlcihzdHJpbmdNaW4sIHN0cmluZ01heCk7XG4gICAgICAgIHdvcmQgPSBhdHJvcGEucmFuZG9tLnN0cmluZyh3b3JkTGVuZ3RoLCAnbG93ZXInKTtcbiAgICAgICAgd29yZENvdW50LS07XG4gICAgICAgIHJldHVybiB3b3JkO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUHJvdmlkZXMgcmFuZG9tIHB1bmN0dWF0aW9uLlxuICAgICAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICAgICAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICAgICAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAgICAgKiBAdmVyc2lvbiAyMDEyMDkwOVxuICAgICAqIEBtZXRob2RPZiBhdHJvcGEuQmFiYmxlciNcbiAgICAgKiBAcmV0dXJucyB7U3RyaW5nfSBSZXR1cm5zIGEgcmFuZG9tIHB1bmN0dWF0aW9uXG4gICAgICogY2hhcmFjdGVyICggLiAhIG9yID8gKS5cbiAgICAgKiBAcmVxdWlyZXMgYXRyb3BhLnJhbmRvbS5zdHJpbmdcbiAgICAgKi9cbiAgICB0aGlzLnB1bmN0dWF0ZSA9IGZ1bmN0aW9uIHB1bmN0dWF0ZSgpIHtcbiAgICAgICAgdmFyIHB1bmN0dWF0aW9uO1xuICAgICAgICBwdW5jdHVhdGlvbiA9IGF0cm9wYS5yYW5kb20uc3RyaW5nKDEsICdwdW5jdHVhdGlvbicpO1xuICAgICAgICByZXR1cm4gcHVuY3R1YXRpb247XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZW5lcmF0ZXMgYSBzZW50ZW5jZSBvZiBzcGVjaWZpZWQgbGVuZ3RoIGluIHdvcmRzLiBUaGUgcXVhbnRpdHlcbiAgICAgKiAgb2Ygd29yZHMgaW4gdGhlIGdlbmVyYXRlZCBzZW50ZW5jZSB3aWxsIGJlIGJldHdlZW4gdGhlIG1pbmltdW1cbiAgICAgKiAgYW5kIG1heGltdW0gc2V0LCB3aXRoIHRoZSBtYXhpbXVtIGNhcHBlZCBhdCB0aGUgY3VycmVudCB3b3Jkc1xuICAgICAqICBjb3VudC4gVGhlIHdvcmQgY291bnQgd2lsbCBiZSBsb3dlcmVkIGJ5IHRoZVxuICAgICAqICBxdWFudGl0eSBvZiB3b3JkcyBpbiB0aGUgZ2VuZXJhdGVkIHNlbnRlbmNlLiBJZiB0aGUgd29yZCBjb3VudFxuICAgICAqICBpcyAwIHRoZW4gdGhlcmUgd2lsbCBiZSBubyB3b3JkcyBpbiB0aGUgc2VudGVuY2UuIElmIHRoZSB3b3JkXG4gICAgICogIGNvdW50IGlzIDMgdGhlbiB0aGUgbWF4aW11bSBwb3NzaWJsZSBudW1iZXIgb2Ygd29yZHMgaW4gdGhlXG4gICAgICogIHNlbnRlbmNlIHdpbGwgYmUgdGhyZWUuXG4gICAgICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gICAgICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gICAgICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICAgICAqIEB2ZXJzaW9uIDIwMTMwMzEzXG4gICAgICogQG1ldGhvZE9mIGF0cm9wYS5CYWJibGVyI1xuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBzZW50ZW5jZU1pbiBUaGUgc2hvcnRlc3Qgc2VudGVuY2UsIGluIHdvcmRzLFxuICAgICAqIHlvdSB3b3VsZCBsaWtlIHJldHVybmVkLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBzZW50ZW5jZU1heCBUaGUgbG9uZ2VzdCBzZW50ZW5jZSwgaW4gd29yZHMsXG4gICAgICogeW91IHdvdWxkIGxpa2UgcmV0dXJuZWQuXG4gICAgICogQHJldHVybnMge1N0cmluZ30gUmV0dXJucyBhIFwic2VudGVuY2VcIiB3aXRoaW4gdGhlIHNwZWNpZmllZFxuICAgICAqIHJhbmdlIG9mIGxlbmd0aC5cbiAgICAgKiBAcmVxdWlyZXMgYXRyb3BhLnJhbmRvbS5pbnRlZ2VyXG4gICAgICogQHJlcXVpcmVzIGF0cm9wYS5zdHJpbmcudWNGaXJzdFxuICAgICAqL1xuICAgIHRoaXMuZ2VuZXJhdGVTZW50ZW5jZSA9IGZ1bmN0aW9uIGdlbmVyYXRlU2VudGVuY2UoXG4gICAgICAgIHNlbnRlbmNlTWluLCBzZW50ZW5jZU1heFxuICAgICkge1xuICAgICAgICB2YXIgd29yZCxcbiAgICAgICAgc2VudGVuY2VMZW5ndGgsXG4gICAgICAgIHNlbnRlbmNlO1xuICAgICAgICBzZW50ZW5jZUxlbmd0aCA9IGF0cm9wYS5yYW5kb20uaW50ZWdlcihzZW50ZW5jZU1pbiwgc2VudGVuY2VNYXgpO1xuICAgICAgICBzZW50ZW5jZSA9ICcnO1xuICAgICAgICBpZiAoc2VudGVuY2VMZW5ndGggPiB3b3JkQ291bnQpIHtcbiAgICAgICAgICAgIHNlbnRlbmNlTGVuZ3RoID0gd29yZENvdW50O1xuICAgICAgICB9XG4gICAgICAgIGZvciAoc2VudGVuY2VMZW5ndGg7IHNlbnRlbmNlTGVuZ3RoID4gMDsgc2VudGVuY2VMZW5ndGgtLSkge1xuICAgICAgICAgICAgaWYgKHdvcmRDb3VudCA+IDApIHtcbiAgICAgICAgICAgICAgICB3b3JkID0gbXkuZ2VuZXJhdGVXb3JkKDQsIDEyKTtcbiAgICAgICAgICAgICAgICBzZW50ZW5jZSArPSAnICcgKyB3b3JkO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZW50ZW5jZUxlbmd0aCA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgc2VudGVuY2UgKz0gbXkucHVuY3R1YXRlKCk7XG4gICAgICAgIHJldHVybiBhdHJvcGEuc3RyaW5nLnVjRmlyc3Qoc2VudGVuY2UudHJpbSgpKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIGJhYmJsZS5cbiAgICAgKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAgICAgKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAgICAgKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gICAgICogQHZlcnNpb24gMjAxMzAzMTNcbiAgICAgKiBAbWV0aG9kT2YgYXRyb3BhLkJhYmJsZXIjXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGJhYmJsZVN0cmluZyBTcGVjaWZpZWQgYmFiYmxlIHRvIHNldC5cbiAgICAgKiBAcmV0dXJucyB7U3RyaW5nfSBSZXR1cm5zIHRoZSBzdG9yZWQgYmFiYmxlLlxuICAgICAqL1xuICAgIHRoaXMuc2V0QmFiYmxlID0gZnVuY3Rpb24gc2V0QmFiYmxlKGJhYmJsZVN0cmluZykge1xuICAgICAgICBpZiAodHlwZW9mIGJhYmJsZVN0cmluZyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGJhYmJsZSA9IGJhYmJsZVN0cmluZztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG15LnJlc2V0QmFiYmxlKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJhYmJsZTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENsZWFycyB0aGUgc3RvcmVkIGJhYmJsZS5cbiAgICAgKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAgICAgKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAgICAgKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gICAgICogQHZlcnNpb24gMjAxMjA5MDlcbiAgICAgKiBAbWV0aG9kT2YgYXRyb3BhLkJhYmJsZXIjXG4gICAgICogQHJldHVybnMge1N0cmluZ30gUmV0dXJucyB0aGUgc3RvcmVkIGJhYmJsZS5cbiAgICAgKi9cbiAgICB0aGlzLnJlc2V0QmFiYmxlID0gZnVuY3Rpb24gcmVzZXRCYWJibGUoKSB7XG4gICAgICAgIGJhYmJsZSA9ICcnO1xuICAgICAgICByZXR1cm4gYmFiYmxlO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgbGFzdCBnZW5lcmF0ZWQgYmFiYmxlLlxuICAgICAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICAgICAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICAgICAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAgICAgKiBAdmVyc2lvbiAyMDEyMDkwOVxuICAgICAqIEBtZXRob2RPZiBhdHJvcGEuQmFiYmxlciNcbiAgICAgKiBAcmV0dXJucyB7U3RyaW5nfSBSZXR1cm5zIHRoZSBzdG9yZWQgYmFiYmxlLlxuICAgICAqL1xuICAgIHRoaXMuZ2V0QmFiYmxlID0gZnVuY3Rpb24gZ2V0QmFiYmxlKCkge1xuICAgICAgICByZXR1cm4gYmFiYmxlO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2VuZXJhdGVzIGJhYmJsZSB0byBhIHVzZXIgc3BlY2lmaWVkIGxlbmd0aCBpbiB3b3Jkcy5cbiAgICAgKiAgVGhlIHdvcmQgY291bnQgd2lsbCBiZSB6ZXJvIGFmdGVyIHRoaXMgYW5kIHRoZSBzdG9yZWRcbiAgICAgKiAgYmFiYmxlIHdpbGwgYmUgc2V0IHRvIHRoZSBnZW5lcmF0ZWQgYmFiYmxlLlxuICAgICAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICAgICAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICAgICAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAgICAgKiBAdmVyc2lvbiAyMDEyMDkwOVxuICAgICAqIEBtZXRob2RPZiBhdHJvcGEuQmFiYmxlciNcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gd29yZHNDdCBUaGUgZGVzaXJlZCB3b3JkIGNvdW50IGZvciB0aGVcbiAgICAgKiBnZW5lcmF0ZWQgYmFiYmxlLlxuICAgICAqIEByZXR1cm5zIHtTdHJpbmd9IFJldHVybnMgYmFiYmxlIG9mIHNwZWNpZmllZCBsZW5ndGggaW4gd29yZHMuXG4gICAgICogQHNlZSBhdHJvcGEuQmFiYmxlciNnZXRXb3JkQ291bnRcbiAgICAgKi9cbiAgICB0aGlzLmdlbmVyYXRlQmFiYmxlID0gZnVuY3Rpb24gZ2VuZXJhdGVCYWJibGUod29yZHNDdCkge1xuICAgICAgICBteS5yZXNldEJhYmJsZSgpO1xuICAgICAgICBteS5yZXNldFdvcmRDb3VudCh3b3Jkc0N0KTtcbiAgICAgICAgZm9yICh3b3JkQ291bnQ7IHdvcmRDb3VudCA+IDA7IGJhYmJsZSArPSAnICcpIHtcbiAgICAgICAgICAgIG15LnNldEJhYmJsZShiYWJibGUgKyBteS5nZW5lcmF0ZVNlbnRlbmNlKDUsIDIwKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJhYmJsZTtcbiAgICB9O1xuICAgIFxuICAgIGF0cm9wYS5zdXBwb3J0Q2hlY2soJ0JhYmJsZXInKTtcbiAgICB0aGlzLnJlc2V0V29yZENvdW50KHdyZENvdW50KTtcbn07XG5cblxuXG5cbndoaWxlKGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5sZW5ndGggPiAwKSB7XG4gICAgYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLnBvcCgpKCk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGF0cm9wYTtcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9kb2NzL3ZzZG9jL09wZW5MYXllcnNBbGwuanNcIi8+XG52YXIgYXRyb3BhID0gcmVxdWlyZSgnYXRyb3BhLWhlYWRlcicpO1xuLypqc2xpbnRcbiAgICBpbmRlbnQ6IDQsXG4gICAgbWF4ZXJyOiA1MCxcbiAgICB3aGl0ZTogdHJ1ZSxcbiAgICBicm93c2VyOiB0cnVlLFxuICAgIGRldmVsOiB0cnVlLFxuICAgIHBsdXNwbHVzOiB0cnVlLFxuICAgIHJlZ2V4cDogdHJ1ZVxuKi9cbi8qZ2xvYmFsIGF0cm9wYSAqL1xuLy8gZW5kIGhlYWRlclxuXG5hdHJvcGEucmVxdWlyZXMoXG4gICAgJ0Nvb2tpZU1vbnN0ZXInLFxuICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgICAgIHZhciBzdXBwb3J0ZWQgPSB0cnVlO1xuICAgICAgICBcbiAgICAgICAgW1xuICAgICAgICAgICAgZG9jdW1lbnQuY29va2llXG4gICAgICAgIF0uZm9yRWFjaChmdW5jdGlvbiAocHJlcmVxdWlzaXRlKSB7XG4gICAgICAgICAgICBpZihwcmVyZXF1aXNpdGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHN1cHBvcnRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHN1cHBvcnRlZDtcbiAgICB9XG4pO1xuXG4vKipcbiAqIFRoaXMgaXMgYSBjb29raWUgaGFuZGxlci5cbiAqIEBleGFtcGxlXG4gKiAvLyBjb29raWUgb2JqZWN0XG4gKiB2YXIgY29va2llT2JqID0ge1wia2V5XCIgOiBcImNvb2tpZU5hbWVcIiwgXCJ2YWxcIiA6IFwiY29va2llVmFsXCJ9XG4gKiAvLyBjb29raWUgc3RyaW5nIFxuICogdmFyIGNvb2tpZVN0cmluZyA9IGNvb2tpZU5hbWU9Y29va2llVmFsO1xuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAqIEB2ZXJzaW9uIDIwMTMwMjIzXG4gKiBAY2xhc3MgVGhpcyByZXByZXNlbnRzIGEgY29va2llIGhhbmRsZXJcbiAqIEByZXR1cm5zIHtDb29raWVNb25zdGVyfSBBIGNvb2tpZSBoYW5kbGVyLlxuICogQHJlcXVpcmVzIGF0cm9wYS5kYXRhXG4gKi9cbmF0cm9wYS5Db29raWVNb25zdGVyID0gZnVuY3Rpb24gQ29va2llTW9uc3RlcigpIHtcbiAgICAndXNlIHN0cmljdCc7XG4gICAgdmFyIGN1cnJlbnRDb29raWVzLCBnZXRDb29raWVDYWxsYmFjaztcbiAgICBcbiAgICAvKipcbiAgICAgKiBUaGlzIGhvbGRzIHRoZSBjdXJyZW50IGNvb2tpZSBvYmplY3QgYXJyYXkuXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAdHlwZSBBcnJheVxuICAgICAqIEBmaWVsZE9mIGF0cm9wYS5Db29raWVNb25zdGVyLVxuICAgICAqL1xuICAgIGN1cnJlbnRDb29raWVzID0gW107XG4gICAgLyoqXG4gICAgICogQ29udmVydHMgYSBjb29raWUgc3RyaW5nIGludG8gYW4gb2JqZWN0LlxuICAgICAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICAgICAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICAgICAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAgICAgKiBAdmVyc2lvbiAyMDEzMDIyM1xuICAgICAqIEBtZXRob2RPZiBhdHJvcGEuQ29va2llTW9uc3RlciNcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gY29va2llIEEgY29va2llIHJlcHJlc2VudGVkIGFzIGEgc3RyaW5nXG4gICAgICogPGNvZGU+Y29va2llTmFtZT1jb29raWVWYWw7PC9jb2RlPlxuICAgICAqIEByZXR1cm5zIHtjb29raWVPYmp9IFJldHVybnMgYSBjb29raWUgb2JqZWN0LlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIGNvb2tpZU1vbnN0ZXIgPSBuZXcgYXRyb3BhLkNvb2tpZU1vbnN0ZXIoKTtcbiAgICAgKiB2YXIgY29va2llT2JqID0gY29va2llTW9uc3Rlci5jb29raWUyb2JqKCdhdHJvcGE9aGlhbCBhdHJvcGEhITsnKTtcbiAgICAgKiBjb25zb2xlLmxvZyhjb29raWVPYmopO1xuICAgICAqL1xuICAgIHRoaXMuY29va2llMm9iaiA9IGZ1bmN0aW9uIGNvb2tpZTJvYmooY29va2llKSB7XG4gICAgICAgIHZhciBjb29raWVPYmogPSB7fTtcbiAgICAgICAgaWYgKCFjb29raWUpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBjb29raWVPYmoua2V5ID0gY29va2llLnN1YnN0cigwLCBjb29raWUuaW5kZXhPZihcIj1cIikpLnRyaW0oKTtcbiAgICAgICAgY29va2llT2JqLnZhbCA9IGNvb2tpZS5zdWJzdHIoY29va2llLmluZGV4T2YoXCI9XCIpICsgMSk7XG4gICAgICAgIGlmKGNvb2tpZU9iai52YWwuc3Vic3RyKC0xKSA9PT0gJzsnKSB7XG4gICAgICAgICAgICBjb29raWVPYmoudmFsID0gY29va2llT2JqLnZhbC5zdWJzdHIoMCwgY29va2llT2JqLnZhbC5sZW5ndGggLSAxKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29va2llT2JqO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQ29udmVydHMgYSBjb29raWUgb2JqZWN0IHRvIGEgY29va2llIHN0cmluZy5cbiAgICAgKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAgICAgKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAgICAgKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gICAgICogQHZlcnNpb24gMjAxMjA5MDlcbiAgICAgKiBAbWV0aG9kT2YgYXRyb3BhLkNvb2tpZU1vbnN0ZXIjXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGNvb2tpZU9iaiBBIGNvb2tpZSBvYmplY3RcbiAgICAgKiBAcmV0dXJucyB7U3RyaW5nfSBSZXR1cm5zIGEgY29va2llIHN0cmluZy5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBjb29raWVNb25zdGVyID0gbmV3IGF0cm9wYS5Db29raWVNb25zdGVyKCk7XG4gICAgICogLy8gY3JlYXRpbmcgYSBjb29raWVcbiAgICAgKiBjb29raWVNb25zdGVyLnNldENvb2tpZSgnYXRyb3BhJywgJ2hpYWwgYXRyb3BhISEnKTtcbiAgICAgKiBjb25zb2xlLmxvZyhkb2N1bWVudC5jb29raWUpO1xuICAgICAqIFxuICAgICAqIC8vIGdldHRpbmcgYSBjb29raWUgb2JqZWN0XG4gICAgICogdmFyIGNvb2tpZU9iaiA9IGNvb2tpZU1vbnN0ZXIuZ2V0Q29va2llKCdhdHJvcGEnKTtcbiAgICAgKiBjb25zb2xlLmxvZyhjb29raWVPYmopO1xuICAgICAqIFxuICAgICAqIC8vIGNvbnZlcnQgdGhlIGNvb2tpZSBvYmplY3QgdG8gYSBzdHJpbmdcbiAgICAgKiBjb25zb2xlLmxvZyhjb29raWVNb25zdGVyLmJha2VDb29raWUoY29va2llT2JqKSk7XG4gICAgICovXG4gICAgdGhpcy5iYWtlQ29va2llID0gZnVuY3Rpb24gYmFrZUNvb2tpZShjb29raWVPYmopIHtcbiAgICAgICAgdmFyIGNvb2tpZSA9ICcnLCBrZXksIHZhbDtcbiAgICAgICAgXG4gICAgICAgIGtleSA9IGNvb2tpZU9iai5rZXk7XG4gICAgICAgIHZhbCA9IGNvb2tpZU9iai52YWw7XG4gICAgICAgIGNvb2tpZSA9IGtleSArICc9JyArIHZhbCArICc7JztcbiAgICAgICAgcmV0dXJuIGNvb2tpZTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEZpbHRlciBjb29raWVzIGJhc2VkIG9uIHVzZXIgc3BlY2lmaWVkIGNhbGxiYWNrLlxuICAgICAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICAgICAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICAgICAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAgICAgKiBAdmVyc2lvbiAyMDEzMDIyM1xuICAgICAqIEBtZXRob2RPZiBhdHJvcGEuQ29va2llTW9uc3RlciNcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFjayBUaGUgY2FsbGJhY2sgZnVuY3Rpb24gd2lsbCBiZSBwYXNzZWRcbiAgICAgKiAgdHdvIGFyZ3VtZW50cy4gVGhlIGZpcnN0IGlzIGEgY29va2llIG9iamVjdCBmcm9tIHRoZSBjdXJyZW50XG4gICAgICogIGRvY3VtZW50LiBUaGUgc2Vjb25kIGFyZ3VtZW50IGlzIHRoZSB2YWx1ZSBzdXBwbGllZCBmb3JcbiAgICAgKiAgPGNvZGU+YXJnczwvY29kZT4gaWYgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uIHJldHVybnMgPGNvZGU+dHJ1ZTwvY29kZT5cbiAgICAgKiAgdGhlbiB0aGUgY29va2llIG9iamVjdCB3aWxsIGJlIGluY2x1ZGVkIGluIHRoZSByZXR1cm4gcmVzdWx0cy5cbiAgICAgKiBAcGFyYW0ge0FycmF5fSBhcmdzIEFyZ3VtZW50cyB0byBwYXNzIHRvIHRoZSBjYWxsYmFja1xuICAgICAqIGZ1bmN0aW9uLlxuICAgICAqIEByZXR1cm5zIHtBcnJheX0gQW4gYXJyYXkgb2YgY29va2llIG9iamVjdHMuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgY29va2llTW9uc3RlciA9IG5ldyBhdHJvcGEuQ29va2llTW9uc3RlcigpO1xuICAgICAqIC8vIGNyZWF0aW5nIGEgZmV3IGNvb2tpZXNcbiAgICAgKiBjb29raWVNb25zdGVyLnNldENvb2tpZSgnYXRyb3BhJywgJ2hpYWwgYXRyb3BhISEnKTtcbiAgICAgKiBjb29raWVNb25zdGVyLnNldENvb2tpZSgna2F0amlpJywgJ211bmNoaW5nJyk7XG4gICAgICogY29uc29sZS5sb2coZG9jdW1lbnQuY29va2llKTtcbiAgICAgKiBcbiAgICAgKiAvLyBmaWx0ZXIgY29va2llc1xuICAgICAqIGZ1bmN0aW9uIGNvb2tpZUZpbHRlcihjb29raWVPYmosIGNvb2tpZVZhbHVlKSB7XG4gICAgICogICAgIGlmKGNvb2tpZU9iai52YWwgPT09IGNvb2tpZVZhbHVlKSB7XG4gICAgICogICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgKiAgICAgfSBlbHNlIHtcbiAgICAgKiAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgKiAgICAgfVxuICAgICAqIH1cbiAgICAgKiB2YXIgY29va2llT2JqQXJyYXkgPSBjb29raWVNb25zdGVyLmluc3BlY3RDb29raWVzKFxuICAgICAqICAgICBjb29raWVGaWx0ZXIsICdtdW5jaGluZycpO1xuICAgICAqIGNvbnNvbGUubG9nKGNvb2tpZU9iakFycmF5KTtcbiAgICAgKi9cbiAgICB0aGlzLmluc3BlY3RDb29raWVzID0gZnVuY3Rpb24gaW5zcGVjdENvb2tpZXMoY2FsbGJhY2ssIGFyZ3MpIHtcbiAgICAgICAgdmFyIHRlc3RDb29raWUsIGNvb2tpZXMsIGphciA9IFtdO1xuICAgICAgICBjb29raWVzID0gdGhpcy5nZXRDb29raWVzKCk7XG4gICAgICAgIHdoaWxlIChjb29raWVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRlc3RDb29raWUgPSBjb29raWVzLnNoaWZ0KCk7XG4gICAgICAgICAgICBpZiAoY2FsbGJhY2sodGVzdENvb2tpZSwgYXJncykgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBqYXIucHVzaCh0ZXN0Q29va2llKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gamFyO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogSW50ZXJuYWwgY2FsbGJhY2sgZnVuY3Rpb24gdXNlZCB3aGlsZSBnZXR0aW5nIHRoZSBjdXJyZW50XG4gICAgICogY29va2llcy5cbiAgICAgKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAgICAgKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAgICAgKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gICAgICogQHZlcnNpb24gMjAxMzAyMjNcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBtZXRob2RPZiBhdHJvcGEuQ29va2llTW9uc3Rlci1cbiAgICAgKiBAcGFyYW0ge2Nvb2tpZU9ian0gdGVzdENvb2tpZSBBIGNvb2tpZSBvYmplY3RcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gYXJncyBhcmd1bWVudCB1c2VkIGluIGNvbXBhcmlzb24gZnVuY3Rpb25cbiAgICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gSWYgY29va2llIGtleSBpcyBleGFjdGx5IGVxdWFsIHRvIHRoZSBhcmd1bWVudFxuICAgICAqIHRoZW4gdGhlIGNhbGxiYWNrIHJldHVybnMgdHJ1ZS5cbiAgICAgKi9cbiAgICBnZXRDb29raWVDYWxsYmFjayA9IGZ1bmN0aW9uIGdldENvb2tpZUNhbGxiYWNrKHRlc3RDb29raWUsIGFyZ3MpIHtcbiAgICAgICAgdmFyIG91dDtcbiAgICAgICAgaWYgKHRlc3RDb29raWUua2V5ID09PSBhcmdzKSB7XG4gICAgICAgICAgICBvdXQgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb3V0ID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEdldHMgYSB1c2VyIHJlcXVlc3RlZCBjb29raWUuXG4gICAgICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gICAgICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gICAgICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICAgICAqIEB2ZXJzaW9uIDIwMTMwMjIzXG4gICAgICogQG1ldGhvZE9mIGF0cm9wYS5Db29raWVNb25zdGVyI1xuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB3aGljaEtleSBUaGUgY29va2llcyBrZXkgKG5hbWUpXG4gICAgICogQHJldHVybnMge2Nvb2tpZU9ianxmYWxzZX0gUmV0dXJucyBhIGNvb2tpZSBvYmplY3QgaWZcbiAgICAgKiAgYSBjb29raWUgd2l0aCB0aGUgc3BlY2lmaWVkIGtleSBpcyBmb3VuZCBvciBmYWxzZSBpZlxuICAgICAqICBpdCBpcyBub3QgZm91bmQuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgY29va2llTW9uc3RlciA9IG5ldyBhdHJvcGEuQ29va2llTW9uc3RlcigpO1xuICAgICAqIC8vIGNyZWF0aW5nIGEgY29va2llXG4gICAgICogY29va2llTW9uc3Rlci5zZXRDb29raWUoJ2F0cm9wYScsICdoaWFsIGF0cm9wYSEhJyk7XG4gICAgICogY29uc29sZS5sb2coZG9jdW1lbnQuY29va2llKTtcbiAgICAgKiAvLyBnZXQgYSBzcGVjaWZpYyBjb29raWVcbiAgICAgKiB2YXIgY29va2llT2JqID0gY29va2llTW9uc3Rlci5nZXRDb29raWUoJ2F0cm9wYScpO1xuICAgICAqIGNvbnNvbGUubG9nKGNvb2tpZU9iai5rZXkpO1xuICAgICAqIGNvbnNvbGUubG9nKGNvb2tpZU9iai52YWwpO1xuICAgICAqL1xuICAgIHRoaXMuZ2V0Q29va2llID0gZnVuY3Rpb24gZ2V0Q29va2llKHdoaWNoS2V5KSB7XG4gICAgICAgIHZhciByZXN1bHQgPSB0aGlzLmluc3BlY3RDb29raWVzKGdldENvb2tpZUNhbGxiYWNrLCB3aGljaEtleS50cmltKCkpO1xuICAgICAgICByZXR1cm4gcmVzdWx0WzBdIHx8IGZhbHNlO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0IGFsbCBjb29raWVzLlxuICAgICAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICAgICAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICAgICAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAgICAgKiBAdmVyc2lvbiAyMDEyMDkwOVxuICAgICAqIEBtZXRob2RPZiBhdHJvcGEuQ29va2llTW9uc3RlciNcbiAgICAgKiBAcmV0dXJucyB7QXJyYXl9IEFuIGFycmF5IHdob3NlIGVsZW1lbnRzIGFyZSBjb29raWUgb2JqZWN0cy5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBjb29raWVNb25zdGVyID0gbmV3IGF0cm9wYS5Db29raWVNb25zdGVyKCk7XG4gICAgICogLy8gY3JlYXRpbmcgYSBjb29raWVcbiAgICAgKiBjb29raWVNb25zdGVyLnNldENvb2tpZSgnYXRyb3BhJywgJ2hpYWwgYXRyb3BhISEnKTtcbiAgICAgKiAvLyBnZXQgYWxsIGNvb2tpZSBvYmplY3RzIGluIGFuIGFycmF5XG4gICAgICogY29uc29sZS5sb2coY29va2llTW9uc3Rlci5nZXRDb29raWVzKCkpO1xuICAgICAqL1xuICAgIHRoaXMuZ2V0Q29va2llcyA9IGZ1bmN0aW9uIGdldENvb2tpZXMoKSB7XG4gICAgICAgIHZhciBuLCBsLCBjb29raWVBcnJheSwgY29va2llT2JqO1xuICAgICAgICBjdXJyZW50Q29va2llcyA9IFtdO1xuICAgICAgICBjb29raWVBcnJheSA9IGRvY3VtZW50LmNvb2tpZS5zcGxpdChcIjtcIik7XG4gICAgICAgIGZvciAobiA9IDAsIGwgPSBjb29raWVBcnJheS5sZW5ndGg7IG4gPCBsOyBuKyspIHtcbiAgICAgICAgICAgIGNvb2tpZU9iaiA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKGNvb2tpZUFycmF5W25dKSB7XG4gICAgICAgICAgICAgICAgY29va2llT2JqID0gdGhpcy5jb29raWUyb2JqKGNvb2tpZUFycmF5W25dKTtcbiAgICAgICAgICAgICAgICBpZiAoY29va2llT2JqKSB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRDb29raWVzLnB1c2goY29va2llT2JqKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGN1cnJlbnRDb29raWVzO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogRGVsZXRlcyBhIHNwZWNpZmllZCBjb29raWUgYnkgdXNlciBzdWJtaXR0ZWQgc3RyaW5nLlxuICAgICAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICAgICAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICAgICAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAgICAgKiBAdmVyc2lvbiAyMDEzMDIyM1xuICAgICAqIEBtZXRob2RPZiBhdHJvcGEuQ29va2llTW9uc3RlciNcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gd2hpY2hLZXkgVGhlIGNvb2tpZXMga2V5IChuYW1lKSB0aGF0XG4gICAgICogd2lsbCBiZSBkZWxldGVkLlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIGNvb2tpZU1vbnN0ZXIgPSBuZXcgYXRyb3BhLkNvb2tpZU1vbnN0ZXIoKTtcbiAgICAgKiAvLyBjcmVhdGluZyB0aGUgY29va2llIHRvIGRlbGV0ZVxuICAgICAqIGNvb2tpZU1vbnN0ZXIuc2V0Q29va2llKCdhdHJvcGEnLCAnaGlhbCBhdHJvcGEhIScpO1xuICAgICAqIGNvbnNvbGUubG9nKGRvY3VtZW50LmNvb2tpZSk7XG4gICAgICogLy8gZGVsZXRlIGEgY29va2llXG4gICAgICogY29va2llTW9uc3Rlci5kZWxldGVDb29raWUoJ2F0cm9wYScpO1xuICAgICAqIGNvbnNvbGUubG9nKGRvY3VtZW50LmNvb2tpZSk7XG4gICAgICovXG4gICAgdGhpcy5kZWxldGVDb29raWUgPSBmdW5jdGlvbiBkZWxldGVDb29raWUod2hpY2hLZXkpIHtcbiAgICAgICAgdmFyIGNvb2tpZU9iaiA9IHt9O1xuICAgICAgICBjb29raWVPYmoua2V5ID0gd2hpY2hLZXk7XG4gICAgICAgIGNvb2tpZU9iai52YWwgPSAnO2V4cGlyZXM9VGh1LCAyIEF1ZyAyMDAxIDIwOjQ3OjExIFVUQyc7XG4gICAgICAgIGRvY3VtZW50LmNvb2tpZSA9IHRoaXMuYmFrZUNvb2tpZShjb29raWVPYmopO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogRGVsZXRlcyBhIHNwZWNpZmllZCBjb29raWUgYnkgdXNlciBzdWJtaXR0ZWQgY29va2llT2JqLlxuICAgICAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICAgICAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICAgICAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAgICAgKiBAdmVyc2lvbiAyMDEyMDkwOVxuICAgICAqIEBtZXRob2RPZiBhdHJvcGEuQ29va2llTW9uc3RlciNcbiAgICAgKiBAcGFyYW0ge2Nvb2tpZU9ian0gY29va2llT2JqIEEgY29va2llIG9iamVjdC5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBjb29raWVNb25zdGVyID0gbmV3IGF0cm9wYS5Db29raWVNb25zdGVyKCk7XG4gICAgICogLy8gY3JlYXRpbmcgdGhlIGNvb2tpZSB0byBkZWxldGVcbiAgICAgKiBjb29raWVNb25zdGVyLnNldENvb2tpZSgnYXRyb3BhJywgJ2hpYWwgYXRyb3BhISEnKTtcbiAgICAgKiBjb25zb2xlLmxvZyhkb2N1bWVudC5jb29raWUpO1xuICAgICAqIC8vIGRlbGV0ZSBhIGNvb2tpZVxuICAgICAqIGNvb2tpZU1vbnN0ZXIuZGVsZXRlQ29va2llT2JqKFxuICAgICAqICAgICB7a2V5IDogJ2F0cm9wYScsIHZhbCA6ICdkb2VzIG5vdCBtYXR0ZXInfSk7XG4gICAgICogY29uc29sZS5sb2coZG9jdW1lbnQuY29va2llKTtcbiAgICAgKi9cbiAgICB0aGlzLmRlbGV0ZUNvb2tpZU9iaiA9IGZ1bmN0aW9uIGRlbGV0ZUNvb2tpZU9iaihjb29raWVPYmopIHtcbiAgICAgICAgdGhpcy5kZWxldGVDb29raWUoY29va2llT2JqLmtleSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBTZXRzIGEgY29va2llIHBlciB1c2VyIHNwZWNpZmljYXRpb25zIGFzIHN0cmluZ3MuIFRoZSBjb29raWVcbiAgICAgKiB3aWxsIGV4cGlyZSB3aGVuIHRoZSBicm93c2VyIGlzIGNsb3NlZC5cbiAgICAgKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAgICAgKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAgICAgKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gICAgICogQHZlcnNpb24gMjAxMjA5MDlcbiAgICAgKiBAbWV0aG9kT2YgYXRyb3BhLkNvb2tpZU1vbnN0ZXIjXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHdoaWNoS2V5IFRoZSBrZXkgKG5hbWUpIG9mIHRoZSBuZXcgY29va2llXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHNldFRvIFRoZSB2YWx1ZSBvZiB0aGUgbmV3IGNvb2tpZS5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBjb29raWVNb25zdGVyID0gbmV3IGF0cm9wYS5Db29raWVNb25zdGVyKCk7XG4gICAgICogLy8gc2V0IGEgY29va2llXG4gICAgICogY29va2llTW9uc3Rlci5zZXRDb29raWUoJ2F0cm9wYScsICdoaWFsJyk7XG4gICAgICogY29uc29sZS5sb2coZG9jdW1lbnQuY29va2llKTtcbiAgICAgKi9cbiAgICB0aGlzLnNldENvb2tpZSA9IGZ1bmN0aW9uIHNldENvb2tpZSh3aGljaEtleSwgc2V0VG8pIHtcbiAgICAgICAgdmFyIG5ld0Nvb2tpZSA9IHt9O1xuICAgICAgICBuZXdDb29raWUua2V5ID0gd2hpY2hLZXk7XG4gICAgICAgIG5ld0Nvb2tpZS52YWwgPSBzZXRUbztcbiAgICAgICAgZG9jdW1lbnQuY29va2llID0gdGhpcy5iYWtlQ29va2llKG5ld0Nvb2tpZSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBTZXRzIGEgY29va2llIHBlciB1c2VyIHNwZWNpZmljYXRpb25zIGFzIGFuIG9iamVjdC5cbiAgICAgKiBUaGUgY29va2llIHdpbGwgZXhwaXJlIHdoZW4gdGhlIGJyb3dzZXIgaXMgY2xvc2VkLlxuICAgICAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICAgICAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICAgICAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAgICAgKiBAdmVyc2lvbiAyMDEyMDkwOVxuICAgICAqIEBtZXRob2RPZiBhdHJvcGEuQ29va2llTW9uc3RlciNcbiAgICAgKiBAcGFyYW0ge2Nvb2tpZU9ian0gY29va2llT2JqIEEgY29va2llIG9iamVjdC5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBjb29raWVNb25zdGVyID0gbmV3IGF0cm9wYS5Db29raWVNb25zdGVyKCk7XG4gICAgICogLy8gc2V0IGEgY29va2llXG4gICAgICogY29va2llTW9uc3Rlci5zZXRDb29raWVPYmooe2tleSA6ICdhdHJvcGEnLCB2YWwgOiAnaGlhbCBhdHJvcGEhISd9KTtcbiAgICAgKiBjb25zb2xlLmxvZyhkb2N1bWVudC5jb29raWUpO1xuICAgICAqL1xuICAgIHRoaXMuc2V0Q29va2llT2JqID0gZnVuY3Rpb24gc2V0Q29va2llT2JqKGNvb2tpZU9iaikge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXRDb29raWUoY29va2llT2JqLmtleSwgY29va2llT2JqLnZhbCk7XG4gICAgfTtcbiAgICBcbiAgICBhdHJvcGEuc3VwcG9ydENoZWNrKCdDb29raWVNb25zdGVyJyk7XG59O1xuXG5cblxuXG53aGlsZShhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMubGVuZ3RoID4gMCkge1xuICAgIGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5wb3AoKSgpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBhdHJvcGE7XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vZG9jcy92c2RvYy9PcGVuTGF5ZXJzQWxsLmpzXCIvPlxudmFyIGF0cm9wYSA9IHJlcXVpcmUoJ2F0cm9wYS1oZWFkZXInKTtcbmF0cm9wYS5SZXF1ZXN0ZXIgPSByZXF1aXJlKCdhdHJvcGEtUmVxdWVzdGVyJykuUmVxdWVzdGVyO1xuYXRyb3BhLkhUTUxQYXJzZXIgPSByZXF1aXJlKCdhdHJvcGEtSFRNTFBhcnNlcicpLkhUTUxQYXJzZXI7XG4vKmpzbGludFxuICAgIGluZGVudDogNCxcbiAgICBtYXhlcnI6IDUwLFxuICAgIHdoaXRlOiB0cnVlLFxuICAgIGJyb3dzZXI6IHRydWUsXG4gICAgZGV2ZWw6IHRydWUsXG4gICAgcGx1c3BsdXM6IHRydWUsXG4gICAgcmVnZXhwOiB0cnVlXG4qL1xuLypnbG9iYWwgYXRyb3BhICovXG4vLyBlbmQgaGVhZGVyXG5cbmF0cm9wYS5yZXF1aXJlcyhcbiAgICAnQ3JlYXRlSHRtbERvY3VtZW50c0Zyb21YbWxodHRwJyxcbiAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xuICAgICAgICB2YXIgc3VwcG9ydGVkID0gdHJ1ZTtcbiAgICAgICAgXG4gICAgICAgIFtcbiAgICAgICAgICAgIGF0cm9wYS5SZXF1ZXN0ZXIsXG4gICAgICAgICAgICBhdHJvcGEuSFRNTFBhcnNlclxuICAgICAgICBdLmZvckVhY2goZnVuY3Rpb24gKHByZXJlcXVpc2l0ZSkge1xuICAgICAgICAgICAgaWYocHJlcmVxdWlzaXRlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBzdXBwb3J0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBzdXBwb3J0ZWQ7XG4gICAgfVxuKTtcblxuLyoqXG4gKiBDcmVhdGVzIEhUTUwgRE9NIERvY3VtZW50cyBmcm9tIGFuIFhNTEh0dHBSZXF1ZXN0IG9iamVjdC5cbiAqICBUaGlzIHdhcyB0ZXN0ZWQgb24gRmlyZWZveCwgaXQgZG9lc24ndCB3b3JrIG9uIGdvb2dsZSBjaHJvbWUuXG4gKiAgWW91ciBtaWxlYWdlIG1heSB2YXJ5LlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAqIEB2ZXJzaW9uIDIwMTMwMjI1XG4gKiBAY2xhc3MgQ3JlYXRlcyBIVE1MIERPTSBEb2N1bWVudHMgZnJvbSBhbiBYTUxIdHRwUmVxdWVzdCBvYmplY3QuXG4gKiBAcmVxdWlyZXMgYXRyb3BhLlJlcXVlc3RlclxuICogQHJlcXVpcmVzIGF0cm9wYS5IVE1MUGFyc2VyXG4gKiBAcmVxdWlyZXMgYXRyb3BhLmRhdGFcbiAqIEBleGFtcGxlXG4gKiB2YXIgbWV0aG9kLCB1cmwsIGNhbGxiYWNrLCBkb2NzO1xuICogXG4gKiAvLyBIVFRQIFJlcXVlc3QgbWV0aG9kXG4gKiBtZXRob2QgPSAnZ2V0JztcbiAqIFxuICogLy8gdGhlIHBhZ2UgdG8gZmV0Y2gsIHRoaXMgcGFnZSBtdXN0IGJlIGFjY2Vzc2libGVcbiAqIC8vIHNlY3VyaXR5IHJlc3RyaWN0aW9ucyBtYXkgYXBwbHlcbiAqIHVybCA9ICdkb2NzL2pzZG9jL3N5bWJvbHMvYXRyb3BhLnhwYXRoLmh0bWwnO1xuICogXG4gKiAvLyB0aGUgY2FsbGJhY2sgZnVudGlvbiBmb3Igd2hlbiBhIG5ldyBkb2N1bWVudCBpcyBjcmVhdGVkXG4gKiBjYWxsYmFjayA9IGZ1bmN0aW9uIG5ld0RvY3VtZW50SGFuZGxlcihkb2NyZWYpIHtcbiAqICAgICB0cnkge1xuICogICAgICAgICBpZiAoZmFsc2UgPT09IGRvY3JlZikge1xuICogICAgICAgICAgICAgLy8gaWYgdGhlIGRvY3VtZW50IGNvdWxkIG5vdCBiZSBjcmVhdGVkIHRocm93IGFuIGVycm9yXG4gKiAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2F0cm9wYS5DcmVhdGVIdG1sRG9jdW1lbnRzRnJvbVhtbGh0dHAgJyArXG4gKiAgICAgICAgICAgICAgICAgICdDb3VsZCBub3QgY3JlYXRlIGhpZGRlbiBkb2N1bWVudCcpO1xuICogICAgICAgICB9IGVsc2Uge1xuICogICAgICAgICAgICAgLy8gaWYgdGhlIGRvY3VtZW50IGNvdWxkIGJlIGNyZWF0ZWQgd2UnbGwgdHJ5IHRvIHVzZSBpdFxuICogICAgICAgICAgICAgaWYoZG9jcmVmLmdldEVsZW1lbnRCeUlkKCdpbmRleCcpKSB7XG4gKiAgICAgICAgICAgICAgICAgLy8gaWYgdGhlIGRvY3VtZW50IGNvdWxkIGJlIHVzZWQgdGhlblxuICogICAgICAgICAgICAgICAgIC8vIGRvIHNvbWV0aGluZyB1c2VmdWwgd2l0aCBpdC5cbiAqICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnc3VjY2VzcyEnKTtcbiAqICAgICAgICAgICAgIH0gZWxzZSB7XG4gKiAgICAgICAgICAgICAgICAgLy8gaWYgdGhlIGRvY3VtZW50IGNhbiBub3QgYmUgdXNlZCB0aHJvdyBhbiBlcnJvclxuICogICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignYXRyb3BhLkNyZWF0ZUh0bWxEb2N1bWVudHNGcm9tWG1saHR0cCAnICtcbiAqICAgICAgICAgICAgICAgICAgICAgICdjb3VsZCBub3QgdXNlIHRoZSBoaWRkZW4gZG9jdW1lbnQnKTtcbiAqICAgICAgICAgICAgIH1cbiAqICAgICAgICAgfVxuICogICAgIH0gY2F0Y2ggKGUpIHtcbiAqICAgICAgICAgLy8gY2F0Y2hpbmcgYW55IGVycm9ycyB0aHJvd24gYW5kIGhhbmRsZSB0aGVtLlxuICogICAgIH1cbiAqICAgICAvLyBBdCB0aGlzIHBvaW50IHRoZSB3b3JrIHdpdGggdGhlIGRvY3VtZW50IGlzIGN1cnJlbnRseSBmaW5pc2hlZFxuICogICAgIC8vIHRoZSBkb2N1bWVudCB3aWxsIGxpdmUgaW4gdGhlIGRvY3VtZW50UXVldWUgaW4gY2FzZSB5b3UgbmVlZCBpdFxuICogICAgIC8vIGxhdGVyLiBUaGlzIGlzIHdoZW4geW91IHdpbGwgdHJpZ2dlciBhbnkgZnVuY3Rpb24gd2hpY2ggZGVwZW5kc1xuICogICAgIC8vIG9uIHRoaXMgaGlkZGVuIGRvY3VtZW50IGhhdmluZyBiZWVuIGNyZWF0ZWQuXG4gKiAgICAgc2hvd0RvY3VtZW50UXVldWUoKTtcbiAqIH07XG4gKiBcbiAqIGZ1bmN0aW9uIHNob3dEb2N1bWVudFF1ZXVlKCkge1xuICogICAgIGNvbnNvbGUuZGlyKGRvY3MuZG9jdW1lbnRRdWV1ZSk7XG4gKiB9XG4gKiBcbiAqIC8vIGNyZWF0ZSBhbiBpbnN0YW5jZSBvZiB0aGUgY2xhc3NcbiAqIGRvY3MgPSBuZXcgYXRyb3BhLkNyZWF0ZUh0bWxEb2N1bWVudHNGcm9tWG1saHR0cCgpO1xuICogLy8gdHJ5IHRvIGNyZWF0ZSBhIG5ldyBoaWRkZW4gZG9jdW1lbnRcbiAqIGRvY3MubmV3RG9jdW1lbnQobWV0aG9kLCB1cmwsIG51bGwsIGNhbGxiYWNrKTtcbiAqL1xuYXRyb3BhLkNyZWF0ZUh0bWxEb2N1bWVudHNGcm9tWG1saHR0cCA9IGZ1bmN0aW9uIENyZWF0ZUh0bWxEb2N1bWVudHNGcm9tWG1saHR0cChcbikge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIHZhciByZXF1ZXN0ZXIsXG4gICAgaHRtbGRvY3VtZW50LFxuICAgIHRoYXQ7XG4gICAgdGhhdCA9IHRoaXM7XG4gICAgLyoqXG4gICAgICogUXVldWUgb2YgZG9jdW1lbnRzIGNyZWF0ZWQgYnkgdGhpcyBpbnN0YW5jZS5cbiAgICAgKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAgICAgKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAgICAgKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gICAgICogQHZlcnNpb24gMjAxMjA5MDlcbiAgICAgKiBAdHlwZSBBcnJheVxuICAgICAqIEBmaWVsZE9mIGF0cm9wYS5DcmVhdGVIdG1sRG9jdW1lbnRzRnJvbVhtbGh0dHAjXG4gICAgICovXG4gICAgdGhpcy5kb2N1bWVudFF1ZXVlID0gW107XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBIVE1MIERPTSBEb2N1bWVudCBhbmQgcHV0cyBpdCBpbiB0aGUgZG9jdW1lbnRcbiAgICAgKiAgcXVldWUsIHRoZW4gZXhlY3V0ZXMgdGhlIGNhbGxiYWNrIGdpdmVuLiBOb3RlLCB0aGlzIGRvZXNcbiAgICAgKiAgbm90IHdvcmsgb24gZ29vZ2xlIGNocm9tZS5cbiAgICAgKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAgICAgKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAgICAgKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gICAgICogQHZlcnNpb24gMjAxMjA5MDlcbiAgICAgKiBAbWV0aG9kT2YgYXRyb3BhLkNyZWF0ZUh0bWxEb2N1bWVudHNGcm9tWG1saHR0cCNcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbWV0aG9kIEFueSB2YWxpZCBtZXRob2QgdG8gYmUgdXNlZCBpblxuICAgICAqIGFuIFhNTEh0dHBSZXF1ZXN0LlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB1cmwgVGhlIGxvY2F0aW9uIG9mIHRoZSBkb2N1bWVudCdzIHNvdXJjZS5cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZUJvZHkgbnVsbCwgb3IgYSBtZXNzYWdlIGJvZHkuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgVGhlIGZ1bmN0aW9uIHRvIGV4ZWN1dGUgdXBvblxuICAgICAqIHJlcXVlc3QgY29tcGxldGlvbi4gVGhpcyBmdW5jdGlvbiB3aWxsIGJlIGdpdmVuIGVpdGhlclxuICAgICAqIGFuIEhUTUwgRE9NIERvY3VtZW50IG9yIGZhbHNlLlxuICAgICAqIEByZXR1cm5zIHtIVE1MIERPTSBEb2N1bWVudCwgZmFsc2V9IFRoZSByZXR1cm4gdmFsdWUgaXNcbiAgICAgKiBnaXZlbiB0byB0aGUgY2FsbGJhY2sgZnVuY3Rpb24uXG4gICAgICovXG4gICAgdGhpcy5uZXdEb2N1bWVudCA9IGZ1bmN0aW9uIG5ld0RvY3VtZW50KFxuICAgICAgICBtZXRob2QsIHVybCwgbWVzc2FnZUJvZHksIGNhbGxiYWNrXG4gICAgKSB7XG4gICAgICAgIHZhciBjYjtcbiAgICAgICAgLypcbiAgICAgICAgICogSW50ZXJuYWwgY2FsbGJhY2sgZnVuY3Rpb24gdG8gcHJvY2VzcyBkYXRhIGZyb20gWE1MSHR0cFJlcXVlc3RcbiAgICAgICAgICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gICAgICAgICAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICAgICAgICAgKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gICAgICAgICAqIEB2ZXJzaW9uIDIwMTIwOTA5XG4gICAgICAgICAqIEBtZXRob2RPZiBhdHJvcGEuQ3JlYXRlSHRtbERvY3VtZW50c0Zyb21YbWxodHRwI25ld0RvY3VtZW50LVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKiBAcHJvcGVydHkge3RydWUsZmFsc2V9IGJvb2xTdGF0dXMgVGhpcyB0ZWxscyB3aGV0aGVyIG9yIG5vdCB0aGVcbiAgICAgICAgICogIFhNTEh0dHBSZXF1ZXN0IHdhcyBzdWNjZXNzZnVsLlxuICAgICAgICAgKiBAcHJvcGVydHkge1hNTEh0dHAgUmVzcG9uc2UgT2JqZWN0fSByZXNwb25zZU9iamVjdCBUaGlzIGlzIHRoZVxuICAgICAgICAgKiAgcmVzcG9uc2Ugb2JqZWN0IGZyb20gdGhlIFhNTEh0dHAgUmVxdWVzdCBvYmplY3QuXG4gICAgICAgICAqL1xuICAgICAgICBjYiA9IGZ1bmN0aW9uIChib29sU3RhdHVzLCByZXNwb25zZU9iamVjdCkge1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKGJvb2xTdGF0dXMgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBpZiAoZmFsc2UgIT09IGh0bWxkb2N1bWVudC5sb2FkU3RyaW5nKFxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZU9iamVjdC5yZXNwb25zZVRleHQpKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gaHRtbGRvY3VtZW50LmRvYztcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5kb2N1bWVudFF1ZXVlLnB1c2gocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGJvb2xTdGF0dXM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYWxsYmFjayhyZXN1bHQpO1xuICAgICAgICB9O1xuICAgICAgICByZXF1ZXN0ZXIubWFrZVJlcXVlc3QobWV0aG9kLCB1cmwsIG1lc3NhZ2VCb2R5LCBjYik7XG4gICAgfTtcbiAgICBcbiAgICBcbiAgICBmdW5jdGlvbiBpbml0ICgpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGF0cm9wYS5zdXBwb3J0Q2hlY2soJ0NyZWF0ZUh0bWxEb2N1bWVudHNGcm9tWG1saHR0cCcpO1xuICAgICAgICAgICAgcmVxdWVzdGVyID0gbmV3IGF0cm9wYS5SZXF1ZXN0ZXIoKTtcbiAgICAgICAgICAgIGh0bWxkb2N1bWVudCA9IG5ldyBhdHJvcGEuSFRNTFBhcnNlcigpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBhdHJvcGEuZGF0YS5DcmVhdGVIdG1sRG9jdW1lbnRzRnJvbVhtbGh0dHAuc3VwcG9ydCA9ICd1bnN1cHBvcnRlZCc7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYXRyb3BhLmRhdGEuQ3JlYXRlSHRtbERvY3VtZW50c0Zyb21YbWxodHRwLmVycm9yKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBpbml0KCk7XG59O1xuXG5cblxuXG53aGlsZShhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMubGVuZ3RoID4gMCkge1xuICAgIGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5wb3AoKSgpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBhdHJvcGE7XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vZG9jcy92c2RvYy9PcGVuTGF5ZXJzQWxsLmpzXCIvPlxudmFyIGF0cm9wYSA9IHJlcXVpcmUoJ2F0cm9wYS1oZWFkZXInKTtcbi8qanNsaW50XG4gICAgaW5kZW50OiA0LFxuICAgIG1heGVycjogNTAsXG4gICAgd2hpdGU6IHRydWUsXG4gICAgYnJvd3NlcjogdHJ1ZSxcbiAgICBkZXZlbDogdHJ1ZSxcbiAgICBwbHVzcGx1czogdHJ1ZSxcbiAgICByZWdleHA6IHRydWVcbiovXG4vKmdsb2JhbCBhdHJvcGEgKi9cbi8vIGVuZCBoZWFkZXJcblxuYXRyb3BhLnJlcXVpcmVzKFxuICAgICdIVE1MUGFyc2VyJyxcbiAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xuICAgICAgICB2YXIgc3VwcG9ydGVkID0gdHJ1ZTtcbiAgICAgICAgXG4gICAgICAgIFtcbiAgICAgICAgICAgIGRvY3VtZW50LmltcGxlbWVudGF0aW9uLmNyZWF0ZURvY3VtZW50VHlwZSxcbiAgICAgICAgICAgIGRvY3VtZW50LmltcGxlbWVudGF0aW9uLmNyZWF0ZURvY3VtZW50XG4gICAgICAgIF0uZm9yRWFjaChmdW5jdGlvbiAocHJlcmVxdWlzaXRlKSB7XG4gICAgICAgICAgICBpZihwcmVyZXF1aXNpdGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHN1cHBvcnRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHN1cHBvcnRlZDtcbiAgICB9XG4pO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgSFRNTCBQYXJzZXI8YnIgLz5cbiAqIENhcnJ5IG91dCBET00gb3BlcmF0aW9ucyB3aXRob3V0IGxvYWRpbmcgY29udGVudCB0byB0aGUgYWN0aXZlIGRvY3VtZW50LlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAqIEB2ZXJzaW9uIDIwMTIwOTA5XG4gKiBAY2xhc3MgQ3JlYXRlcyBhIG5ldyBIVE1MIFBhcnNlclxuICogQHJldHVybnMge0hUTUwgRE9NIERvY3VtZW50fSBSZXR1cm5zIGEgYmxhbmsgSFRNTCBEb2N1bWVudCBmb3IgeW91IHRvIGxvYWRcbiAqICBkYXRhIGludG9cbiAqIEByZXF1aXJlcyBhdHJvcGEuZGF0YVxuICovXG5hdHJvcGEuSFRNTFBhcnNlciA9IGZ1bmN0aW9uIEhUTUxQYXJzZXIoKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgdmFyIG15ID0gdGhpcztcbiAgICBcbiAgICAvKipcbiAgICAgKiBIb2xkcyB0aGUgY3JlYXRlZCBIVE1MIERPTSBEb2N1bWVudC5cbiAgICAgKiBAdHlwZSBIVE1MIERPTSBEb2N1bWVudFxuICAgICAqIEBmaWVsZE9mIGF0cm9wYS5IVE1MUGFyc2VyI1xuICAgICAqL1xuICAgIHRoaXMuZG9jID0ge307XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIGJsYW5rIEhUTUwgRE9NIERvY3VtZW50LlxuICAgICAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICAgICAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICAgICAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAgICAgKiBAdmVyc2lvbiAyMDEyMDkwOVxuICAgICAqIEBtZXRob2RPZiBhdHJvcGEuSFRNTFBhcnNlciNcbiAgICAgKiBAcmV0dXJucyB7SFRNTCBET00gRG9jdW1lbnR9IFJlc2V0cyB0aGUgZG9jIHByb3BlcnR5IG9mIHRoaXMgaW5zdGFuY2VcbiAgICAgKiAgYW5kLCByZXR1cm5zIGEgYmxhbmsgSFRNTCBEb2N1bWVudCBmb3IgeW91IHRvIGxvYWQgZGF0YSBpbnRvLlxuICAgICAqL1xuICAgIHRoaXMubmV3RG9jdW1lbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkdDtcbiAgICAgICAgZHQgPSBkb2N1bWVudC5pbXBsZW1lbnRhdGlvbi5jcmVhdGVEb2N1bWVudFR5cGUoXG4gICAgICAgICAgICBcImh0bWxcIixcbiAgICAgICAgICAgIFwiLS8vVzNDLy9EVEQgSFRNTCA0LjAxIFRyYW5zaXRpb25hbC8vRU5cIixcbiAgICAgICAgICAgIFwiaHR0cDovL3d3dy53My5vcmcvVFIvaHRtbDQvbG9vc2UuZHRkXCJcbiAgICAgICAgKTtcbiAgICAgICAgbXkuZG9jID0gZG9jdW1lbnQuaW1wbGVtZW50YXRpb24uY3JlYXRlRG9jdW1lbnQoJycsICcnLCBkdCk7XG4gICAgICAgIGlmIChteS5kb2Mubm9kZVR5cGUgIT09IDkpIHtcbiAgICAgICAgICAgIGF0cm9wYS5kYXRhLkhUTUxQYXJzZXIuc3VwcG9ydCA9ICd1bnN1cHBvcnRlZCc7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYXRyb3BhLmRhdGEuSFRNTFBhcnNlci5lcnJvciArXG4gICAgICAgICAgICAgICAgJ3RoZSBkb2N1bWVudCBub2RlVHlwZSByZXR1cm5lZCBhbiB1bmV4cGVjdGVkIHZhbHVlJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG15LmRvYztcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgSFRNTCBET00gRG9jdW1lbnQgYW5kIGxvYWRzIHRoZSBnaXZlbiBzdHJpbmcgaW50byBpdC5cbiAgICAgKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAgICAgKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAgICAgKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gICAgICogQHZlcnNpb24gMjAxMjA5MDlcbiAgICAgKiBAbWV0aG9kT2YgYXRyb3BhLkhUTUxQYXJzZXIjXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGh0bWxzdHJpbmcgYSBzdHJpbmcgb2YgSFRNTCBkYXRhXG4gICAgICogQHJldHVybnMge0hUTUwgRE9NIERvY3VtZW50fSBSZXNldHMgdGhlIGRvYyBwcm9wZXJ0eSBvZiB0aGlzIGluc3RhbmNlLFxuICAgICAqIGxvYWRpbmcgYSBuZXcgZG9jdW1lbnQgd2l0aCB0aGUgc3RyaW5nIGdpdmVuLlxuICAgICAqL1xuICAgIHRoaXMubG9hZFN0cmluZyA9IGZ1bmN0aW9uIChodG1sc3RyaW5nKSB7XG4gICAgICAgIGlmICghaHRtbHN0cmluZykge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbXkubmV3RG9jdW1lbnQoKTtcbiAgICAgICAgICAgIG15LmRvYy5hcHBlbmRDaGlsZChteS5kb2MuY3JlYXRlRWxlbWVudCgnaHRtbCcpKTtcbiAgICAgICAgICAgIG15LmRvYy5kb2N1bWVudEVsZW1lbnQuaW5uZXJIVE1MID0gaHRtbHN0cmluZztcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgYXRyb3BhLmRhdGEuSFRNTFBhcnNlci5zdXBwb3J0ID0gJ3Vuc3VwcG9ydGVkJztcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihhdHJvcGEuZGF0YS5IVE1MUGFyc2VyLmVycm9yICtcbiAgICAgICAgICAgICAgICAnYXRyb3BhLkhUTUxQYXJzZXIgY2FuIG5vdCBsb2FkICcgK1xuICAgICAgICAgICAgICAgICd0aGUgaGlkZGVuIGRvY3VtZW50IGZyb20gc3RyaW5nIGJlY2F1c2U6ICcgKyBlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbXkuZG9jO1xuICAgIH07XG4gICAgXG4gICAgZnVuY3Rpb24gaW5pdCAoKSB7XG4gICAgICAgIHZhciBlcVRlc3Q7XG4gICAgICAgIGF0cm9wYS5zdXBwb3J0Q2hlY2soJ0hUTUxQYXJzZXInKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGVxVGVzdCA9IG15LmxvYWRTdHJpbmcoXG4gICAgICAgICAgICAgICAgJzxoZWFkPjwvaGVhZD48Ym9keT48cD50ZXN0PC9wPjwvYm9keT4nXG4gICAgICAgICAgICApLmJvZHkudGV4dENvbnRlbnQ7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGF0cm9wYS5kYXRhLkhUTUxQYXJzZXIuc3VwcG9ydCA9ICd1bnN1cHBvcnRlZCc7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYXRyb3BhLmRhdGEuSFRNTFBhcnNlci5lcnJvciArIGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmKCd0ZXN0JyAhPT0gZXFUZXN0KSB7XG4gICAgICAgICAgICBhdHJvcGEuZGF0YS5IVE1MUGFyc2VyLnN1cHBvcnQgPSAndW5zdXBwb3J0ZWQnO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGF0cm9wYS5kYXRhLkhUTUxQYXJzZXIuZXJyb3IpO1xuICAgICAgICB9XG4gICAgICAgIG15Lm5ld0RvY3VtZW50KCk7XG4gICAgfVxuICAgIFxuICAgIGluaXQoKTtcbiAgICBcbn07XG5cblxuXG5cbndoaWxlKGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5sZW5ndGggPiAwKSB7XG4gICAgYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLnBvcCgpKCk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGF0cm9wYTtcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9kb2NzL3ZzZG9jL09wZW5MYXllcnNBbGwuanNcIi8+XG52YXIgYXRyb3BhID0gcmVxdWlyZSgnYXRyb3BhLWhlYWRlcicpO1xuYXRyb3BhLkFyZ3NJbmZvID0gcmVxdWlyZSgnYXRyb3BhLUFyZ3NJbmZvJykuQXJnc0luZm87XG4vKmpzbGludFxuICAgIGluZGVudDogNCxcbiAgICBtYXhlcnI6IDUwLFxuICAgIHdoaXRlOiB0cnVlLFxuICAgIGJyb3dzZXI6IHRydWUsXG4gICAgZGV2ZWw6IHRydWUsXG4gICAgcGx1c3BsdXM6IHRydWUsXG4gICAgcmVnZXhwOiB0cnVlXG4qL1xuLypnbG9iYWwgYXRyb3BhICovXG4vLyBlbmQgaGVhZGVyXG5cbihmdW5jdGlvbiAoKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgYXRyb3BhLnJlcXVpcmVzKFxuICAgICAgICAnUmVxdWVzdGVyJyxcbiAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHN1cHBvcnRlZCA9IHRydWU7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBhdHJvcGEuQXJnc0luZm8sXG4gICAgICAgICAgICAgICAgWE1MSHR0cFJlcXVlc3RcbiAgICAgICAgICAgIF0uZm9yRWFjaChmdW5jdGlvbiAocHJlcmVxdWlzaXRlKSB7XG4gICAgICAgICAgICAgICAgaWYocHJlcmVxdWlzaXRlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgc3VwcG9ydGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gc3VwcG9ydGVkO1xuICAgICAgICB9XG4gICAgKTtcbn0oKSk7XG5cbi8qKlxuICogVGhpcyByZXByZXNlbnRzIGFuIFhNTEh0dHBSZXF1ZXN0LlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAqIEB2ZXJzaW9uIDIwMTMwMzExXG4gKiBAY2xhc3MgVGhpcyByZXByZXNlbnRzIGFuIFhNTEh0dHBSZXF1ZXN0LlxuICogQHJldHVybnMge1JlcXVlc3Rlcn0gUmV0dXJucyBhIHJlcXVlc3RlciBvYmplY3QuXG4gKiBAcmVxdWlyZXMgYXRyb3BhLkFyZ3NJbmZvI2NoZWNrQXJnVHlwZXNcbiAqIEBleGFtcGxlXG4gKiB2YXIgcmVxdWVzdGVyLCBmb3JtRGF0YTtcbiAqIFxuICogcmVxdWVzdGVyID0gbmV3IGF0cm9wYS5SZXF1ZXN0ZXIoKTtcbiAqIHJlcXVlc3Rlci50aW1lb3V0ID0gMTAwMDA7IC8vIHJlcXVlc3RzIHdpbGwgYWJvcnQgYWZ0ZXIgMTAgc2Vjb25kcy5cbiAqIHJlcXVlc3Rlci5yZXF1ZXN0SGVhZGVycyA9IHtcbiAqICAgICBcImFIZWFkZXJcIiA6IFwiaGVhZGVyVmFsdWVcIixcbiAqICAgICBcImFub3RoZXJIZWFkZXJcIiA6IFwiYW5kVmFsdWVcIlxuICogfTtcbiAqIFxuICogZnVuY3Rpb24gc2hvd1JlcXVlc3RSZXN1bHRzKHN0YXR1cywgcmVxdWVzdCkge1xuICogICAgIGNvbnNvbGUubG9nKFwiU3RhdHVzOiAnICsgc3RhdHVzKTtcbiAqICAgICBjb25zb2xlLmRpcihyZXF1ZXN0KTsgLy8gY29uc29sZSBkaXIgbWF5IG9yIG1heSBub3RcbiAqICAgICAgICAgICAgICAgICAgICAgICAgLy8gYmUgc3VwcG9ydGVkIGluIHlvdXIgZW52aXJvbm1lbnQuXG4gKiB9XG4gKiBcbiAqIGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gKiBmb3JtRGF0YS5hcHBlbmQoJ2FGb3JtRmllbGROYW1lJywgJ2Zvcm1GaWVsZERhdGEnKTtcbiAqIGZvcm1EYXRhLmFwcGVuZCgnYW5vdGhlckZvcm1GaWVsZE5hbWUnLCAnYW5kRGF0YScpO1xuICogXG4gKiByZXF1ZXN0ZXIubWFrZVJlcXVlc3QoXG4gKiAgICAgXCJwb3N0XCIsIFwiaHR0cDovL2V4YW1wbGUuY29tXCIsIGZvcm1EYXRhLCBzaG93UmVxdWVzdFJlc3VsdHMpO1xuICovXG5hdHJvcGEuUmVxdWVzdGVyID0gZnVuY3Rpb24gUmVxdWVzdGVyKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIGF0cm9wYS5zdXBwb3J0Q2hlY2soJ1JlcXVlc3RlcicpO1xuICAgIHZhciBleHBBcmdUeXBlcyxcbiAgICAgICAgY2hlY2tSZXF1ZXN0LFxuICAgICAgICByZXF1ZXN0O1xuICAgIFxuICAgIC8qKlxuICAgICAqIENvbnRhaW5lciBvYmplY3QgZm9yIHRoZSBleHBlY3RlZCBhcmd1bWVudCB0eXBlc1xuICAgICAqIHN1cHBsaWVkIHRvIHRoaXMubWFrZVJlcXVlc3QuXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAdHlwZSBFeHBlY3RlZCBBcmcgVHlwZXNcbiAgICAgKiBAZmllbGRPZiBhdHJvcGEuUmVxdWVzdGVyLVxuICAgICAqL1xuICAgIGV4cEFyZ1R5cGVzID0ge307XG4gICAgZXhwQXJnVHlwZXMucmVxdWVzdFdpdGhNZXNzYWdlID0gWydzdHJpbmcnLCAnc3RyaW5nJywgJ3N0cmluZycsICdmdW5jdGlvbiddO1xuICAgIGV4cEFyZ1R5cGVzLnJlcXVlc3ROdWxsTWVzc2FnZSA9IFsnc3RyaW5nJywgJ3N0cmluZycsICdvYmplY3QnLCAnZnVuY3Rpb24nXTtcbiAgICBcbiAgICAvKipcbiAgICAgKiBVc2VkIHRvIGNoZWNrIHRoZSBhcmd1bWVudHMgdHlwZXMgc3VwcGxpZWQgdG8gdGhpcy5tYWtlUmVxdWVzdC5cbiAgICAgKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAgICAgKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAgICAgKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gICAgICogQHZlcnNpb24gMjAxMjA5MDlcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBtZXRob2RPZiBhdHJvcGEuUmVxdWVzdGVyLVxuICAgICAqIEBwYXJhbSB7QXJndW1lbnRzfSBhcmdzIEFuIGFyZ3VtZW50cyBhcnJheVxuICAgICAqIEByZXR1cm5zIHtCb29sZWFufSBSZXR1cm5zIHRydWUgaWYgYXJncyB0eXBlcyBtYXRjaCB0aGVcbiAgICAgKiBleHBlY3RlZCB0eXBlcy5cbiAgICAgKiBAcmVxdWlyZXMgYXRyb3BhLkFyZ3NJbmZvI2NoZWNrQXJnVHlwZXNcbiAgICAgKi9cbiAgICBjaGVja1JlcXVlc3QgPSBmdW5jdGlvbiAoYXJncykge1xuICAgICAgICB2YXIgY2hlY2tlcjtcbiAgICAgICAgY2hlY2tlciA9IG5ldyBhdHJvcGEuQXJnc0luZm8oKTtcbiAgICAgICAgY2hlY2tlci5zZXRFeHBlY3RlZEFyZ1R5cGVzKGV4cEFyZ1R5cGVzKTtcbiAgICAgICAgcmV0dXJuIGNoZWNrZXIuY2hlY2tBcmdUeXBlcyhhcmdzKTtcbiAgICB9O1xuICAgIFxuICAgIC8qKlxuICAgICAqIE9iamVjdCB3aG9zZSBwcm9wZXJ0aWVzIGFuZCB2YWx1ZXMgYXJlIGhlYWRlciBuYW1lcyBhbmQgdmFsdWVzXG4gICAgICogIHJlc3BlY3RpdmVseS5cbiAgICAgKiBAdHlwZSBSZXF1ZXN0IEhlYWRlcnMgT2JqZWN0XG4gICAgICogQGZpZWxkT2YgYXRyb3BhLlJlcXVlc3RlciNcbiAgICAgKi9cbiAgICB0aGlzLnJlcXVlc3RIZWFkZXJzID0ge307XG4gICAgXG4gICAgXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSB0aW1lb3V0IHZhbHVlIGZvciB0aGUgcmVxdWVzdCBpbiBtaWxsaXNlY29uZHMuIFRoZSByZXF1ZXN0IHdpbGxcbiAgICAgKiAgYWJvcnQgYWZ0ZXIgdGhpcyBhbW91bnQgb2YgdGltZSBoYXMgcGFzc2VkLlxuICAgICAqIEB0eXBlIE51bWJlclxuICAgICAqIEBmaWVsZE9mIGF0cm9wYS5SZXF1ZXN0ZXIjXG4gICAgICovXG4gICAgdGhpcy50aW1lb3V0ID0gMzAwMDA7XG4gICAgXG4gICAgLyoqXG4gICAgICogWE1MSHR0cFJlcXVlc3Qgb2JqZWN0IHVzZWQgYnkgUmVxdWVzdGVyLlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHR5cGUgWE1MSHR0cFJlcXVlc3RcbiAgICAgKiBAZmllbGRPZiBhdHJvcGEuUmVxdWVzdGVyLVxuICAgICAqL1xuICAgIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICByZXF1ZXN0LmFib3J0ZWQgPSBmYWxzZTtcbiAgICByZXF1ZXN0LmFib3J0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJlcXVlc3QuYWJvcnRlZCA9IHRydWU7XG4gICAgICAgIFhNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZS5hYm9ydC5jYWxsKHRoaXMpO1xuICAgIH07XG4gICAgXG4gICAgLyoqXG4gICAgICogTWFrZXMgYW4gQUpBWCByZXF1ZXN0LlxuICAgICAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICAgICAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICAgICAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAgICAgKiBAdmVyc2lvbiAyMDEzMDMxMVxuICAgICAqIEBtZXRob2RPZiBhdHJvcGEuUmVxdWVzdGVyI1xuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBtZXRob2QgVGhlIEhUVFAgbWV0aG9kIHRvIGJlIHVzZWQgZm9yIHRoaXMgcmVxdWVzdC5cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdXJsIFRoZSBVUkwgdG8gc2VuZCB0aGUgcmVxdWVzdCB0by5cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZUJvZHkgVGhlIGJvZHkgb2YgdGhlIHJlcXVlc3QuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGNhbGxiYWNrIFRoZSBjYWxsYmFjayBmdW5jdGlvbiB0byBleGVjdXRlXG4gICAgICogIHdoZW4gcmVhZHlTdGF0ZSBpcyA0LiBUaGUgY2FsbGJhY2sgaXMgc3VwcGxpZWQgd2l0aCB0d28gYXJndW1lbnRzLiBUaGVcbiAgICAgKiAgZmlyc3QgYXJndW1lbnQgaXMgYSBib29sZWFuIGluZGljYXRpbmcgd2hldGhlciBvciBub3QgdGhlIGh0dHAgc3RhdHVzXG4gICAgICogIHdhcyAyMDAuIFRoZSBzZWNvbmQgYXJndW1lbnQgaXMgdGhlIHJlcXVlc3Qgb2JqZWN0LlxuICAgICAqIEB0aHJvd3MgYXRyb3BhLlJlcXVlc3Rlci5tYWtlUmVxdWVzdCB1bmV4cGVjdGVkIGFyZ3VtZW50IHR5cGVcbiAgICAgKi9cbiAgICB0aGlzLm1ha2VSZXF1ZXN0ID0gZnVuY3Rpb24gKG1ldGhvZCwgdXJsLCBtZXNzYWdlQm9keSwgY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIGhkcjtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNoZWNrUmVxdWVzdChhcmd1bWVudHMpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2F0cm9wYS5SZXF1ZXN0ZXIubWFrZVJlcXVlc3QgdW5leHBlY3RlZCAnICtcbiAgICAgICAgICAgICAgICAnYXJndW1lbnQgdHlwZScpO1xuICAgICAgICB9XG4gICAgICAgIHJlcXVlc3QuYWJvcnRlZCA9IGZhbHNlO1xuICAgICAgICByZXF1ZXN0Lm9wZW4obWV0aG9kLCB1cmwsIHRydWUpO1xuICAgICAgICBmb3IgKGhkciBpbiB0aGlzLnJlcXVlc3RIZWFkZXJzKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5yZXF1ZXN0SGVhZGVycy5oYXNPd25Qcm9wZXJ0eShoZHIpKSB7XG4gICAgICAgICAgICAgICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKGhkciwgdGhpcy5yZXF1ZXN0SGVhZGVyc1toZHJdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEV2ZW50IGxpc3RlbmVyIGZ1bmN0aW9uIGZvciB0aGUgQUpBWCByZXF1ZXN0LlxuICAgICAgICAgKiBUaGlzIGlzIHdoYXQgYWN0dWFsbHkgZmlyZXMgdGhlIGNhbGxiYWNrIHN1cHBsaWVkXG4gICAgICAgICAqIHRvIG1ha2VSZXF1ZXN0LlxuICAgICAgICAgKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAgICAgICAgICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gICAgICAgICAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAgICAgICAgICogQHZlcnNpb24gMjAxMjA5MDlcbiAgICAgICAgICogQG1ldGhvZE9mIGF0cm9wYS5SZXF1ZXN0ZXItcmVxdWVzdFxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgcmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAocmVxdWVzdC5yZWFkeVN0YXRlID09PSA0KSB7XG4gICAgICAgICAgICAgICAgaWYgKHJlcXVlc3Quc3RhdHVzID09PSAyMDApIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sodHJ1ZSwgcmVxdWVzdCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soZmFsc2UsIHJlcXVlc3QpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcmVxdWVzdC5zZW5kKG1lc3NhZ2VCb2R5KTtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAocmVxdWVzdC5hYm9ydGVkID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHJlcXVlc3QuYWJvcnQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdGhpcy50aW1lb3V0KTtcbiAgICB9O1xufTtcblxuXG5cblxud2hpbGUoYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLmxlbmd0aCA+IDApIHtcbiAgICBhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMucG9wKCkoKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gYXRyb3BhO1xuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2RvY3MvdnNkb2MvT3BlbkxheWVyc0FsbC5qc1wiLz5cbnZhciBhdHJvcGEgPSByZXF1aXJlKCdhdHJvcGEtaGVhZGVyJyk7XG4vKmpzbGludCBcbiAgICBpbmRlbnQ6IDQsXG4gICAgbWF4ZXJyOiA1MCxcbiAgICB3aGl0ZTogdHJ1ZSxcbiAgICBicm93c2VyOiB0cnVlLFxuICAgIGRldmVsOiB0cnVlLFxuICAgIHBsdXNwbHVzOiB0cnVlLFxuICAgIHJlZ2V4cDogdHJ1ZVxuKi9cbi8qZ2xvYmFsIGF0cm9wYSAqL1xuLy8gZW5kIGhlYWRlclxuXG4vKipcbiAqIEEgcG9sbGluZyBjbGFzcyBkZXNpZ25lZCBmb3IgZXhlY3V0aW5nIGxvbmcgcnVubmluZyBwcm9jZXNzZXMgdGhhdCByZXR1cm5cbiAqICBub3RoaW5nIGFuZCBoYXZlIG5vIGNhbGxiYWNrIHBhcmFtZXRlci5cbiAqIEBjbGFzcyBBIHBvbGxpbmcgY2xhc3MgZGVzaWduZWQgZm9yIGV4ZWN1dGluZyBsb25nIHJ1bm5pbmcgcHJvY2Vzc2VzIHRoYXRcbiAqICByZXR1cm4gbm90aGluZyBhbmQgaGF2ZSBubyBjYWxsYmFjayBwYXJhbWV0ZXIuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQHZlcnNpb24gMjAxMzAyMjBcbiAqIEBwYXJhbSB7U3RyaW5nfSBhY3Rvck5hbWUgVGhlIG5hbWUgZm9yIHRoZSBTZXJpYWxBY3RvciBpbnN0YW5jZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGFjdG9yRnVuY3Rpb24gVGhlIGZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGVcbiAqICBTZXJpYWxBY3RvciBpcyBmcmVlLiBUaGlzIGZ1bmN0aW9uIG11c3QgY2FsbCB0aGUgPGNvZGU+ZnJlZTwvY29kZT4gZnVuY3Rpb25cbiAqICB3aGVuIGl0IGlzIGZpbmlzaGVkIGluIG9yZGVyIHRvIGFsbG93IHRoZSBhY3RvciB0byBjb250aW51ZS5cbiAqIEByZXR1cm5zIHthdHJvcGEuU2VyaWFsQWN0b3J9IFJldHVybnMgYW4gPGNvZGU+YXRyb3BhLlNlcmlhbEFjdG9yPC9jb2RlPlxuICogIGluc3RhbmNlLlxuICogQGV4YW1wbGVcbiAqIGZ1bmN0aW9uIGR1bW15QWN0b3IoKXtcbiAqICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gKiAgICAgY29uc29sZS5sb2coJ2FjdG9yRnVuY3Rpb24gd291bGQgZXhlY3V0ZScpO1xuICogICAgIGNvbnNvbGUubG9nKCdmcmVlaW5nICcgKyB0aGlzLm5hbWUgKyAnIGluIDEwMDAwIG1zJyk7XG4gKiAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe3RoYXQuZnJlZSgpO30sIDEwMDAwKTtcbiAqIH07XG4gKiB2YXIgYWN0b3IgPSBuZXcgYXRyb3BhLlNlcmlhbEFjdG9yKCdkdW1teScsIGR1bW15QWN0b3IpO1xuICogICAgIC8vIGNoYW5nZSB0aGUgbmFtZSBvZiB0aGUgYWN0b3IgZnJvbVxuICogICAgIC8vIGR1bW15IHRvIGF3ZXNvbWVcbiAqIGFjdG9yLm5hbWUgPSBcImF3ZXNvbWVcIjtcbiAqICAgICAvLyBzZXQgdGhlIHBvbGxpbmcgaW50ZXJ2YWwgKG1pbGxpc2Vjb25kcylcbiAqIGFjdG9yLmludGVydmFsID0gMzAwMDtcbiAqICAgICAvLyBzZXQgdGhlIGJsb2NraW5nIHRpbWVvdXQgdmFsdWUgKG1pbGxpc2Vjb25kcylcbiAqIGFjdG9yLmJsb2NrVGltZW91dFZhbHVlID0gMTIwMDAwO1xuICogICAgIC8vIHN0YXJ0IHBvbGxpbmdcbiAqIGFjdG9yLnN0YXJ0KCk7XG4gKiAgICAgLy8gZHluYW1pY2FsbHkgY2hhbmdlIHRoZSBTZXJpYWxBY3RvclxuICogc2V0VGltZW91dChmdW5jdGlvbigpe1xuICogICAgIC8vIGNoYW5nZSB0aGUgcG9sbGluZyBpbnRlcnZhbFxuICogICAgIC8vIHdoaWxlIHRoZSBTZXJpYWxBY3RvciBpcyBydW5uaW5nLlxuICogICAgIGFjdG9yLmNoYW5nZUludGVydmFsKDIwMDApO1xuICogICAgICAgICAvLyBjaGFuZ2UgdGhlIGFjdG9yIGZ1bmN0aW9uXG4gKiAgICAgYWN0b3IuYWN0b3JGdW5jdGlvbiA9IGZ1bmN0aW9uKCkge1xuICogICAgICAgICBjb25zb2xlLmxvZygnbmV3IGFjdG9yRnVuY3Rpb24gZXhlY3V0aW5nJyk7XG4gKiAgICAgICAgIGNvbnNvbGUubG9nKCdmcmVlaW5nICcgKyB0aGlzLm5hbWUgKyAnIGltbWVkaWF0ZWx5Jyk7XG4gKiAgICAgICAgIHRoaXMuZnJlZSgpO1xuICogICAgIH07XG4gKiB9LDEwMDAwKTtcbiAqL1xuYXRyb3BhLlNlcmlhbEFjdG9yID0gZnVuY3Rpb24oYWN0b3JOYW1lLCBhY3RvckZ1bmN0aW9uKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgdmFyIHRoYXQsIGR1bW15QWN0b3I7XG4gICAgLyoqXG4gICAgICogUmVmZXJlbmNlIHRvIDxjb2RlPnRoaXM8L2NvZGU+XG4gICAgICogQGZpZWxkT2YgYXRyb3BhLlNlcmlhbEFjdG9yLVxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHR5cGUge09iamVjdH1cbiAgICAgKi9cbiAgICB0aGF0ID0gdGhpcztcbiAgICAvKipcbiAgICAgKiBEZWZhdWx0IGFjdG9yRnVuY3Rpb25cbiAgICAgKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAgICAgKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAgICAgKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gICAgICogQHZlcnNpb24gMjAxMzAyMjBcbiAgICAgKiBAbWV0aG9kT2YgYXRyb3BhLlNlcmlhbEFjdG9yLVxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHNlZSBhdHJvcGEuU2VyaWFsQWN0b3IjYWN0b3JGdW5jdGlvblxuICAgICAqIEBleGFtcGxlXG4gICAgICogZHVtbXlBY3RvciA9IGZ1bmN0aW9uKCl7XG4gICAgICogICAgIGNvbnNvbGUubG9nKCdhY3RvckZ1bmN0aW9uIHdvdWxkIGV4ZWN1dGUnKTtcbiAgICAgKiAgICAgY29uc29sZS5sb2coJ2ZyZWVpbmcgU2VyaWFsIEFjdG9yIGluIDEwMDAwIG1zJyk7XG4gICAgICogICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXt0aGF0LmZyZWUoKTt9LCAxMDAwMCk7XG4gICAgICogfTtcbiAgICAgKi9cbiAgICBkdW1teUFjdG9yID0gZnVuY3Rpb24oKXtcbiAgICAgICAgY29uc29sZS5sb2coJ2FjdG9yRnVuY3Rpb24gd291bGQgZXhlY3V0ZScpO1xuICAgICAgICBjb25zb2xlLmxvZygnZnJlZWluZyBTZXJpYWwgQWN0b3IgaW4gMTAwMDAgbXMnKTtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe3RoYXQuZnJlZSgpO30sIDEwMDAwKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRoZSBuYW1lIG9mIHRoaXMgaW5zdGFuY2UuIERlZmF1bHRzIHRvIFwiU2VyaWFsQWN0b3JcIlxuICAgICAqIEBmaWVsZE9mIGF0cm9wYS5TZXJpYWxBY3RvciNcbiAgICAgKiBAdHlwZSBTdHJpbmdcbiAgICAgKiBAZGVmYXVsdCBcIlNlcmlhbEFjdG9yXCJcbiAgICAgKi9cbiAgICB0aGlzLm5hbWUgPSBhdHJvcGEuc2V0QXNPcHRpb25hbEFyZygnU2VyaWFsQWN0b3InLCBhY3Rvck5hbWUpO1xuICAgIC8qKlxuICAgICAqIFBvbGxpbmcgaW50ZXJ2YWwgaW4gbWlsbGlzZWNvbmRzLiBUaGlzIGRldGVybWluZXMgaG93IGZyZXF1ZW50bHkgdGhlXG4gICAgICogIGFjdG9yIGZ1bmN0aW9uIHdpbGwgdHJ5IHRvIGV4ZWN1dGUuIERlZmF1bHRzIHRvIDEwMCBtaWxsaXNlY29uZHMuXG4gICAgICogQGZpZWxkT2YgYXRyb3BhLlNlcmlhbEFjdG9yI1xuICAgICAqIEB0eXBlIE51bWJlclxuICAgICAqIEBkZWZhdWx0IDEwMFxuICAgICAqL1xuICAgIHRoaXMuaW50ZXJ2YWwgPSAxMDA7IC8vIG1pbGxpc2Vjb25kc1xuICAgIC8qKlxuICAgICAqIFRoZSBpZCBvZiB0aGUgaW50ZXJ2YWwgc2V0IHRvIHBvbGwgdGhlIGFjdG9yLiBZb3Ugc2hvdWxkIG5vdCBjaGFuZ2VcbiAgICAgKiAgdGhpcyBtYW51YWxseSwgdXNlIHRoZSBzdGFydCBhbmQgc3RvcCBmdW5jdGlvbnMgaW5zdGVhZC4gRGVmYXVscyB0b1xuICAgICAqICB1bmRlZmluZWQuXG4gICAgICogQGZpZWxkT2YgYXRyb3BhLlNlcmlhbEFjdG9yI1xuICAgICAqIEB0eXBlIE51bWJlclxuICAgICAqIEBkZWZhdWx0IHVuZGVmaW5lZFxuICAgICAqL1xuICAgIHRoaXMuaW50ZXJ2YWxJZCA9IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBUaGUgc3RhdGUgb2YgdGhlIFNlcmlhbEFjdG9yLiBJZiB0cnVlLCB0aGUgYWN0b3Igd2lsbCBzbGVlcC4gSWYgZmFsc2UgdGhlXG4gICAgICogIGFjdG9yIHdpbGwgZXhlY3V0ZSB0aGUgYWN0b3IgZnVuY3Rpb24gd2hlbiBuZXh0IHBvbGxlZC4gRGVmYXVsdHMgdG9cbiAgICAgKiAgZmFsc2UuXG4gICAgICogQGZpZWxkT2YgYXRyb3BhLlNlcmlhbEFjdG9yI1xuICAgICAqIEB0eXBlIEJvb2xlYW5cbiAgICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgICAqL1xuICAgIHRoaXMuYmxvY2tlZCA9IGZhbHNlO1xuICAgIC8qKlxuICAgICAqIFN0b3JlcyBpZCdzIG9mIGN1cnJlbnRseSBydW5uaW5nIHRpbWVvdXQgZnVuY3Rpb25zIHVzZWQgdG8gZnJlZSB0aGUgYWN0b3JcbiAgICAgKiAgaWYgaXQgaGFzIGJlZW4gYmxvY2tlZCBmb3IgdG9vIGxvbmcuXG4gICAgICogQGZpZWxkT2YgYXRyb3BhLlNlcmlhbEFjdG9yI1xuICAgICAqIEBzZWUgYXRyb3BhLlNlcmlhbEFjdG9yI2Jsb2NrVGltZW91dFZhbHVlXG4gICAgICogQHR5cGUgQXJyYXlcbiAgICAgKiBAZGVmYXVsdCBbXVxuICAgICAqL1xuICAgIHRoaXMudGltZW91dHMgPSBbXTtcbiAgICAvKipcbiAgICAgKiBUaGUgbWF4aW11bSB0aW1lLCBpbiBtaWxsaXNlY29uZHMsIHdoaWNoIHRoZSBhY3RvciBtYXkgYmUgYmxvY2tlZCBmb3IuXG4gICAgICogIEFmdGVyIHRoaXMgZHVyYXRpb24gaGFzIGJlZW4gcmVhY2hlZCB0aGUgYWN0b3Igd2lsbCBiZSBmcmVlZC4gRGVmYXVsdHNcbiAgICAgKiAgdG8gNjAgc2Vjb25kcy5cbiAgICAgKiBAZmllbGRPZiBhdHJvcGEuU2VyaWFsQWN0b3IjXG4gICAgICogQHR5cGUgTnVtYmVyXG4gICAgICogQGRlZmF1bHQgNjAwMDBcbiAgICAgKi9cbiAgICB0aGlzLmJsb2NrVGltZW91dFZhbHVlID0gNjAwMDA7XG4gICAgLyoqXG4gICAgICogVGhlIGZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgU2VyaWFsQWN0b3IgaXMgZnJlZS4gVGhpcyBmdW5jdGlvblxuICAgICAqICBtdXN0IGNhbGwgdGhlIDxjb2RlPmZyZWU8L2NvZGU+IGZ1bmN0aW9uIHdoZW4gaXQgaXMgZmluaXNoZWQgaW4gb3JkZXIgdG9cbiAgICAgKiAgYWxsb3cgdGhlIGFjdG9yIHRvIGNvbnRpbnVlLiBEZWZhdWx0cyB0byB0aGUgPGNvZGU+ZHVtbXlBY3RvcjwvY29kZT5cbiAgICAgKiAgZnVuY3Rpb24uXG4gICAgICogQGZpZWxkT2YgYXRyb3BhLlNlcmlhbEFjdG9yI1xuICAgICAqIEB0eXBlIEZ1bmN0aW9uXG4gICAgICogQGRlZmF1bHQgZHVtbXlBY3RvclxuICAgICAqIEBzZWUgYXRyb3BhLlNlcmlhbEFjdG9yLWR1bW15QWN0b3JcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGR1bW15QWN0b3IgPSBmdW5jdGlvbigpe1xuICAgICAqICAgICBjb25zb2xlLmxvZygnYWN0b3JGdW5jdGlvbiB3b3VsZCBleGVjdXRlJyk7XG4gICAgICogICAgIGNvbnNvbGUubG9nKCdmcmVlaW5nIFNlcmlhbCBBY3RvciBpbiAxMDAwMCBtcycpO1xuICAgICAqICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7dGhhdC5mcmVlKCk7fSwgMTAwMDApO1xuICAgICAqIH07XG4gICAgICovXG4gICAgdGhpcy5hY3RvckZ1bmN0aW9uID0gYXRyb3BhLnNldEFzT3B0aW9uYWxBcmcoZHVtbXlBY3RvciwgYWN0b3JGdW5jdGlvbik7XG4gICAgLyoqXG4gICAgICogVGhlIGFjdGlvbiBmdW5jdGlvbiBpcyBjYWxsZWQgd2hlbiB0aGUgYWN0b3IgaXMgcG9sbGVkIGFuZCBpdCdzIGJsb2NrZWRcbiAgICAgKiAgc3RhdGUgaXMgZmFsc2UuIFRoaXMgbWV0aG9kIHNob3VsZCBub3QgYmUgc2V0IG9yIGNhbGxlZCBtYW51YWxseSwgc2V0XG4gICAgICogIHRoZSA8Y29kZT5hY3RvckZ1bmN0aW9uPC9jb2RlPiBpbnN0ZWFkLlxuICAgICAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICAgICAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICAgICAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAgICAgKiBAdmVyc2lvbiAyMDEzMDIyMFxuICAgICAqIEBtZXRob2RPZiBhdHJvcGEuU2VyaWFsQWN0b3IjXG4gICAgICogQHNlZSBhdHJvcGEuU2VyaWFsQWN0b3IjYWN0b3JGdW5jdGlvblxuICAgICAqL1xuICAgIHRoaXMuYWN0aW9uID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmKGZhbHNlID09PSB0aGF0LmJsb2NrZWQpIHtcbiAgICAgICAgICAgIHRoYXQuYmxvY2soKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdGhhdC5hY3RvckZ1bmN0aW9uKCk7XG4gICAgICAgICAgICB9LCAxMCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGF0Lm5hbWUgKyAnIHNsZWVwaW5nIGZvciAnICsgdGhhdC5pbnRlcnZhbCArICcgbXMnKTtcbiAgICAgICAgfVxuICAgIH07XG59O1xuLyoqXG4gKiBQcmV2ZW50cyB0aGUgYWN0b3IgZnJvbSBleGVjdXRpbmcgaXQncyBhY3RvckZ1bmN0aW9uLiBUaGlzIGJsb2NrIHdpbGwgdGltZW91dFxuICogIG9uY2UgdGhlIDxjb2RlPmJsb2NrVGltZW91dFZhbHVlPC9jb2RlPiBoYXMgYmVlbiByZWFjaGVkLlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAqIEB2ZXJzaW9uIDIwMTMwMjIwXG4gKiBAbWV0aG9kT2YgYXRyb3BhLlNlcmlhbEFjdG9yI1xuICogQHJldHVybnMge0Jvb2xlYW59IFJldHVybnMgdGhlIHZhbHVlIG9mIHRoaXMgaW5zdGFuY2VzIDxjb2RlPmJsb2NrZWQ8L2NvZGU+XG4gKiAgcHJvcGVydHkuXG4gKiBAc2VlIGF0cm9wYS5TZXJpYWxBY3RvciNibG9ja2VkXG4gKiBAZXhhbXBsZVxuICogZnVuY3Rpb24gZCgpIHtcbiAqICAgICBjb25zb2xlLmxvZygnZG9pbmcgc3R1ZmYgdG8gdGhpbmdzJyk7XG4gKiAgICAgdGhpcy5mcmVlKCk7XG4gKiB9XG4gKiBcbiAqIHZhciBhY3RvciA9IG5ldyBhdHJvcGEuU2VyaWFsQWN0b3IoJ2R1bW15JywgZCk7XG4gKiBhY3Rvci5pbnRlcnZhbCA9IDIwMDA7XG4gKiBhY3Rvci5ibG9ja1RpbWVvdXRWYWx1ZSA9IDUwMDA7XG4gKiBhY3Rvci5zdGFydCgpO1xuICogLy8gNSBzZWNvbmRzIGFmdGVyIHN0YXJ0aW5nIHRoZSBhY3RvciB3aWxsIGJlIGJsb2NrZWQuXG4gKiAvLyBJdCB3aWxsIHJlbWFpbiBibG9ja2VkIHVudGlsIHRoZSBibG9jayB0aW1lb3V0IGlzIHJlYWNoZWQuXG4gKiBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICogICAgIGNvbnNvbGUubG9nKCdibG9ja2luZyEhIScpO1xuICogICAgIGFjdG9yLmJsb2NrKCk7XG4gKiB9LCA1MDAwKTtcbiAqL1xuYXRyb3BhLlNlcmlhbEFjdG9yLnByb3RvdHlwZS5ibG9jayA9IGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICBjb25zb2xlLmxvZyh0aGlzLm5hbWUgKyAnIGJsb2NrJyk7XG4gICAgdGhpcy5ibG9ja2VkID0gdHJ1ZTtcbiAgICB0aGlzLnRpbWVvdXRzLnB1c2goXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7dGhhdC5ibG9ja1RpbWVvdXQoKTt9LCB0aGF0LmJsb2NrVGltZW91dFZhbHVlKSk7XG4gICAgcmV0dXJuIHRoaXMuYmxvY2tlZDtcbn07XG4vKipcbiAqIENhbGxlZCB3aGVuIHRoZSA8Y29kZT5ibG9ja1RpbWVvdXRWYWx1ZTwvY29kZT4gaGFzIGJlZW4gcmVhY2hlZC4gVGhpcyBmcmVlc1xuICogIHRoZSBhY3RvciBhbmQgcmVtb3ZlcyB0aGUgdGltZW91dCByZWZlcmVuY2UgZnJvbSB0aGUgdGltZW91dHMgYXJyYXkuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQHZlcnNpb24gMjAxMzAyMjBcbiAqIEBtZXRob2RPZiBhdHJvcGEuU2VyaWFsQWN0b3IjXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gUmV0dXJucyB0aGUgdmFsdWUgb2YgdGhpcyBpbnN0YW5jZXMgPGNvZGU+YmxvY2tlZDwvY29kZT5cbiAqICBwcm9wZXJ0eS5cbiAqIEBzZWUgYXRyb3BhLlNlcmlhbEFjdG9yI2Jsb2NrZWRcbiAqL1xuYXRyb3BhLlNlcmlhbEFjdG9yLnByb3RvdHlwZS5ibG9ja1RpbWVvdXQgPSBmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICBjb25zb2xlLmxvZyh0aGlzLm5hbWUgKyAnIGJsb2NrIHRpbWVvdXQnKTtcbiAgICByZXR1cm4gdGhpcy5mcmVlKCk7XG59O1xuLyoqXG4gKiBGcmVlcyB0aGUgYWN0b3Igc28gaXQgbWF5IGV4ZWN1dGUgaXRzIGFjdG9yIGZ1bmN0aW9uIHdoZW4gbmV4dCBwb2xsZWQuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQHZlcnNpb24gMjAxMzAyMjBcbiAqIEBtZXRob2RPZiBhdHJvcGEuU2VyaWFsQWN0b3IjXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gUmV0dXJucyB0aGUgdmFsdWUgb2YgdGhpcyBpbnN0YW5jZXMgPGNvZGU+YmxvY2tlZDwvY29kZT5cbiAqICBwcm9wZXJ0eS5cbiAqIEBzZWUgYXRyb3BhLlNlcmlhbEFjdG9yI2Jsb2NrZWRcbiAqIEBleGFtcGxlXG4gKiBmdW5jdGlvbiBkKCkge1xuICogICAgIGNvbnNvbGUubG9nKCdkb2luZyBzdHVmZiB0byB0aGluZ3MnKTtcbiAqICAgICB0aGlzLmZyZWUoKTtcbiAqIH1cbiAqIFxuICogdmFyIGFjdG9yID0gbmV3IGF0cm9wYS5TZXJpYWxBY3RvcignZHVtbXknLCBkKTtcbiAqIGFjdG9yLmludGVydmFsID0gMjAwMDtcbiAqIGFjdG9yLmJsb2NrVGltZW91dFZhbHVlID0gNTAwMDA7XG4gKiBhY3Rvci5zdGFydCgpO1xuICogYWN0b3IuYmxvY2soKTtcbiAqIC8vIDUgc2Vjb25kcyBhZnRlciBzdGFydGluZyB0aGUgYWN0b3Igd2lsbCBiZSBmcmVlZC5cbiAqIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gKiAgICAgYWN0b3IuZnJlZSgpO1xuICogfSwgNTAwMCk7XG4gKi9cbmF0cm9wYS5TZXJpYWxBY3Rvci5wcm90b3R5cGUuZnJlZSA9IGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIGNvbnNvbGUubG9nKHRoaXMubmFtZSArICcgZnJlZScpO1xuICAgIHRoaXMuYmxvY2tlZCA9IGZhbHNlO1xuICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXRzLnNoaWZ0KCkpO1xuICAgIHJldHVybiB0aGlzLmJsb2NrZWQ7XG59O1xuLyoqXG4gKiBTdGFydHMgcG9sbGluZyB0aGUgYWN0b3IuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQHZlcnNpb24gMjAxMzAyMjBcbiAqIEBtZXRob2RPZiBhdHJvcGEuU2VyaWFsQWN0b3IjXG4gKiBAcGFyYW0ge051bWJlcn0gaW50ZXJ2YWwgT3B0aW9uYWwuIFRoZSBwb2xsaW5nIGludGVydmFsLiBEZWZhdWx0cyB0byB0aGVcbiAqICB2YWx1ZSBvZiA8Y29kZT50aGlzLmludGVydmFsPC9jb2RlPlxuICogQHNlZSBhdHJvcGEuU2VyaWFsQWN0b3IjaW50ZXJ2YWxcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IFJldHVybnMgdGhlIHZhbHVlIG9mIHRoaXMgaW5zdGFuY2Unc1xuICogIDxjb2RlPmludGVydmFsSWQ8L2NvZGU+IHByb3BlcnR5LlxuICogQHNlZSBhdHJvcGEuU2VyaWFsQWN0b3IjaW50ZXJ2YWxJZFxuICogQGV4YW1wbGVcbiAqIHZhciBhY3RvciA9IG5ldyBhdHJvcGEuU2VyaWFsQWN0b3IoJ2R1bW15Jyk7XG4gKiBhY3Rvci5zdGFydCgpO1xuICovXG5hdHJvcGEuU2VyaWFsQWN0b3IucHJvdG90eXBlLnN0YXJ0ID0gZnVuY3Rpb24oaW50ZXJ2YWwpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgdGhpcy5pbnRlcnZhbCA9IGF0cm9wYS5zZXRBc09wdGlvbmFsQXJnKHRoaXMuaW50ZXJ2YWwsIGludGVydmFsKTtcbiAgICBcbiAgICBpZih0aGlzLmludGVydmFsSWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAvLyBjbGVhciB0aGUgb2xkIHRpbWVvdXQgYmVmb3JlIGNyZWF0aW5nIGEgbmV3IG9uZS5cbiAgICAgICAgdGhpcy5zdG9wKCk7XG4gICAgfVxuICAgIHRoaXMuaW50ZXJ2YWxJZCA9IHNldEludGVydmFsKHRoYXQuYWN0aW9uLCB0aGF0LmludGVydmFsKTtcbiAgICBjb25zb2xlLmxvZyh0aGlzLm5hbWUgKyAnIHN0YXJ0ZWQnKTtcbiAgICByZXR1cm4gdGhpcy5pbnRlcnZhbElkO1xufTtcbi8qKlxuICogQWRqdXN0cyB0aGUgcG9sbGluZyBpbnRlcnZhbCBhZnRlciA8Y29kZT5zdGFydDwvY29kZT4gaGFzXG4gKiBiZWVuIGNhbGxlZC5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAdmVyc2lvbiAyMDEzMDIyMFxuICogQG1ldGhvZE9mIGF0cm9wYS5TZXJpYWxBY3RvciNcbiAqIEBwYXJhbSB7TnVtYmVyfSBpbnRlcnZhbCBUaGUgbmV3IHBvbGxpbmcgaW50ZXJ2YWwgaW4gbWlsbGlzZWNvbmRzLlxuICogQHJldHVybnMge051bWJlcn0gUmV0dXJucyB0aGUgdmFsdWUgb2YgdGhpcyBpbnN0YW5jZSdzIFxuICogIDxjb2RlPmludGVydmFsSWQ8L2NvZGU+IHByb3BlcnR5LlxuICogQHNlZSBhdHJvcGEuU2VyaWFsQWN0b3IjaW50ZXJ2YWxJZFxuICogQGV4YW1wbGVcbiAqIHZhciBhY3RvciA9IG5ldyBhdHJvcGEuU2VyaWFsQWN0b3IoJ2R1bW15Jyk7XG4gKiBhY3Rvci5zdGFydCgpO1xuICogICAgIC8vIDUgc2Vjb25kcyBhZnRlciBzdGFydGluZyB0aGUgcG9sbGluZyBpbnRlcnZhbCB3aWxsIGJlIGNoYW5nZWQuXG4gKiBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gKiAgICAgYWN0b3IuY2hhbmdlSW50ZXJ2YWwoMjAwMCk7XG4gKiB9LCA1MDAwKTtcbiAqL1xuYXRyb3BhLlNlcmlhbEFjdG9yLnByb3RvdHlwZS5jaGFuZ2VJbnRlcnZhbCA9IGZ1bmN0aW9uKGludGVydmFsKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgY29uc29sZS5sb2codGhpcy5uYW1lICsgJyBjaGFuZ2luZyBpbnRlcnZhbCcpO1xuICAgIHJldHVybiB0aGlzLnN0YXJ0KGludGVydmFsKTtcbn07XG4vKipcbiAqIFN0b3BzIHBvbGxpbmcgdGhlIGFjdG9yLiBOb3RlIHRoYXQgdGhlIGFjdG9yIHdpbGwgYmUgZnJlZWQgb25jZSB0aGVcbiAqICA8Y29kZT5ibG9ja1RpbWVvdXRWYWx1ZTwvY29kZT4gaGFzIGJlZW4gcmVhY2hlZC4gVGhpcyB3aWxsIG5vdCByZXN0YXJ0IHRoZVxuICogIHBvbGxpbmcuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQHZlcnNpb24gMjAxMzAyMjBcbiAqIEBtZXRob2RPZiBhdHJvcGEuU2VyaWFsQWN0b3IjXG4gKiBAc2VlIGF0cm9wYS5TZXJpYWxBY3RvciNibG9ja2VkXG4gKiBAc2VlIGF0cm9wYS5TZXJpYWxBY3RvciNibG9ja1RpbWVvdXRWYWx1ZVxuICogQGV4YW1wbGVcbiAqIHZhciBhY3RvciA9IG5ldyBhdHJvcGEuU2VyaWFsQWN0b3IoJ2R1bW15Jyk7XG4gKiBhY3Rvci5zdGFydCgpO1xuICogICAgIC8vIDUgc2Vjb25kcyBhZnRlciBzdGFydGluZyB0aGUgYWN0b3Igd2lsbCBiZSBzdG9wcGVkLlxuICogc2V0VGltZW91dChmdW5jdGlvbigpe1xuICogICAgIGFjdG9yLnN0b3AoKTtcbiAqIH0sIDUwMDApO1xuICovXG5hdHJvcGEuU2VyaWFsQWN0b3IucHJvdG90eXBlLnN0b3AgPSBmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWxJZCk7XG4gICAgdGhpcy5pbnRlcnZhbElkID0gdW5kZWZpbmVkO1xuICAgIGNvbnNvbGUubG9nKHRoaXMubmFtZSArICcgc3RvcHBlZCcpO1xufTtcblxuXG5cblxud2hpbGUoYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLmxlbmd0aCA+IDApIHtcbiAgICBhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMucG9wKCkoKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gYXRyb3BhO1xuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL2RvY3MvdnNkb2MvT3BlbkxheWVyc0FsbC5qc1wiLz5cbnZhciBhdHJvcGEgPSByZXF1aXJlKCdhdHJvcGEtaGVhZGVyJyk7XG5hdHJvcGEuc3RyaW5nID0gcmVxdWlyZSgnYXRyb3BhLXN0cmluZycpLnN0cmluZztcbmF0cm9wYS5hcnJheXMgPSByZXF1aXJlKCdhdHJvcGEtYXJyYXlzJykuYXJyYXlzO1xuYXRyb3BhLnNldEFzT3B0aW9uYWxBcmcgPSByZXF1aXJlKCdhdHJvcGEtc2V0QXNPcHRpb25hbEFyZycpLnNldEFzT3B0aW9uYWxBcmc7XG4vKmpzbGludFxuICAgIGluZGVudDogNCxcbiAgICBtYXhlcnI6IDUwLFxuICAgIHdoaXRlOiB0cnVlLFxuICAgIGJyb3dzZXI6IHRydWUsXG4gICAgZGV2ZWw6IHRydWUsXG4gICAgcGx1c3BsdXM6IHRydWUsXG4gICAgcmVnZXhwOiB0cnVlLFxuICAgIHZhcnM6IHRydWVcbiovXG4vKmdsb2JhbCBhdHJvcGEgKi9cbi8vIGVuZCBoZWFkZXJcblxuKGZ1bmN0aW9uICgpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICBhdHJvcGEucmVxdWlyZXMoXG4gICAgICAgICdUZXh0QW5hbHl6ZXInLFxuICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgc3VwcG9ydGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIGF0cm9wYS5zdHJpbmcsXG4gICAgICAgICAgICAgICAgYXRyb3BhLmFycmF5cyxcbiAgICAgICAgICAgICAgICBhdHJvcGEuc2V0QXNPcHRpb25hbEFyZ1xuICAgICAgICAgICAgXS5mb3JFYWNoKGZ1bmN0aW9uIChwcmVyZXF1aXNpdGUpIHtcbiAgICAgICAgICAgICAgICBpZihwcmVyZXF1aXNpdGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBzdXBwb3J0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBzdXBwb3J0ZWQ7XG4gICAgICAgIH1cbiAgICApO1xufSgpKTtcblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgdXRpbGl0eSBmb3IgYW5hbHl6aW5nIHRleHQuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQHZlcnNpb24gMjAxMzAzMTFcbiAqIEBjbGFzcyBSZXByZXNlbnRzIGEgdXRpbGl0eSBmb3IgYW5hbHl6aW5nIHRleHQuXG4gKiBAcGFyYW0ge1N0cmluZ30gdGV4dCBUaGUgdGV4dCB0byBhbmFseXplLlxuICogQHJldHVybnMge1RleHRBbmFseXplcn0gUmV0dXJucyBhbiBpbnN0YW5jZSBvZiB0aGUgdGV4dCBhbmFseXplci5cbiAqIEByZXF1aXJlcyBhdHJvcGEuc3RyaW5nXG4gKiBAcmVxdWlyZXMgYXRyb3BhLmFycmF5c1xuICogQHJlcXVpcmVzIGF0cm9wYS5zZXRBc09wdGlvbmFsQXJnXG4gKi9cbmF0cm9wYS5UZXh0QW5hbHl6ZXIgPSBmdW5jdGlvbiBUZXh0QW5hbHl6ZXIodGV4dCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICB2YXIgY29uc3RydWN0O1xuICAgIC8qKlxuICAgICogVGhlIHN1cHBsaWVkIHRleHQuIERlZmF1bHRzIHRvIGFuIGVtcHR5IHN0cmluZy5cbiAgICAqIEB0eXBlIFN0cmluZ1xuICAgICogQGZpZWxkT2YgYXRyb3BhLlRleHRBbmFseXplciNcbiAgICAqL1xuICAgIHRoaXMudGV4dCA9IFN0cmluZyhhdHJvcGEuc2V0QXNPcHRpb25hbEFyZygnJywgdGV4dCkpO1xuICAgIC8qKlxuICAgICogR2l2ZXMgdGhlIGNvdW50IG9mIHdvcmRzIGluIHRoZSB0ZXh0LiBEZWZhdWx0cyB0byAwLlxuICAgICogQHR5cGUgTnVtYmVyXG4gICAgKiBAZmllbGRPZiBhdHJvcGEuVGV4dEFuYWx5emVyI1xuICAgICovXG4gICAgdGhpcy53b3JkQ291bnQgPSAwO1xuICAgIC8qKlxuICAgICogQW4gYXJyYXkgb2YgZXZlcnkgd29yZCBpbiB0aGUgc3VwcGxpZWQgdGV4dC5cbiAgICAqICBEZWZhdWx0cyB0byBhbiBlbXB0eSBhcnJheS5cbiAgICAqIEB0eXBlIEFycmF5XG4gICAgKiBAZmllbGRPZiBhdHJvcGEuVGV4dEFuYWx5emVyI1xuICAgICovXG4gICAgdGhpcy53b3JkcyA9IFtdO1xuICAgIC8qKlxuICAgICogU2V0cyB0aGUgYmFzaWMgcHJvcGVydGllcyBvZiB0aGUgdGV4dCBhbmFseXplci5cbiAgICAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICAgICogTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAgICAqIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICAgICogQHByaXZhdGVcbiAgICAqIEB2ZXJzaW9uIDIwMTMwMzExXG4gICAgKiBAbWV0aG9kT2YgYXRyb3BhLlRleHRBbmFseXplci1cbiAgICAqL1xuICAgIGNvbnN0cnVjdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgYXRyb3BhLnN1cHBvcnRDaGVjaygnVGV4dEFuYWx5emVyJyk7XG4gICAgICAgIHRoYXQudGV4dCA9IGF0cm9wYS5zdHJpbmcuY29udmVydEVvbCh0aGF0LnRleHQsICdcXG4nKTtcbiAgICAgICAgdGhhdC53b3JkQ291bnQgPSBhdHJvcGEuc3RyaW5nLmNvdW50V29yZHModGhhdC50ZXh0KTtcbiAgICAgICAgdGhhdC53b3JkcyA9IGF0cm9wYS5zdHJpbmcuZ2V0V29yZHModGhhdC50ZXh0KTtcbiAgICB9O1xuICAgIFxuICAgIGNvbnN0cnVjdCgpO1xuICAgIHJldHVybiB0aGlzO1xufTtcbi8qKlxuICogR2V0cyBhbiBpbmRleCBvZiB0aGUgdGV4dC5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAdmVyc2lvbiAyMDEzMDExOFxuICogQG1ldGhvZE9mIGF0cm9wYS5UZXh0QW5hbHl6ZXIjXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYW4gYXJyYXkgb2YgdW5pcXVlIHZhbHVlc1xuICogIGRlcml2ZWQgZnJvbSB0aGUgdGV4dCBnaXZlbi5cbiAqL1xuYXRyb3BhLlRleHRBbmFseXplci5wcm90b3R5cGUuZ2V0SW5kZXggPSBmdW5jdGlvbiAoKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgdGhpcy53b3JkcyA9IGF0cm9wYS5hcnJheXMucmVpbmRleCh0aGlzLndvcmRzKTtcbiAgICByZXR1cm4gYXRyb3BhLmFycmF5cy5nZXRVbmlxdWUodGhpcy53b3Jkcyk7XG59O1xuLyoqXG4gKiBHZXQgdGhlIGZyZXF1ZW5jeSBkYXRhIGZvciBlYWNoIHVuaXF1ZSB3b3JkIGluXG4gKiAgdGhlIHRleHQuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQHZlcnNpb24gMjAxMzAxMThcbiAqIEBtZXRob2RPZiBhdHJvcGEuVGV4dEFuYWx5emVyI1xuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBhbiBvYmplY3Qgd2hvc2Uga2V5cyBhcmVcbiAqICB0aGUgdW5pcXVlIHdvcmRzIGZyb20gdGhlIGdpdmVuIHRleHQgYW5kIHdob3NlXG4gKiAgdmFsdWVzIGFyZSB0aGUgY291bnQgb2YgZWFjaCB3b3JkcyBvY2N1cnJlbmNlLlxuICovXG5hdHJvcGEuVGV4dEFuYWx5emVyLnByb3RvdHlwZS5nZXRXb3JkRnJlcXVlbmN5ID0gZnVuY3Rpb24gKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIHRoaXMud29yZHMgPSBhdHJvcGEuYXJyYXlzLnJlaW5kZXgodGhpcy53b3Jkcyk7XG4gICAgcmV0dXJuIGF0cm9wYS5hcnJheXMuZ2V0RnJlcXVlbmN5KHRoaXMud29yZHMpO1xufTtcbi8qKlxuICogR2V0cyBwaHJhc2VzIG9mIHRoZSBzcGVjaWZpZWQgbGVuZ3RoIGZyb20gdGhlIHRleHQuXG4gKiBAcGFyYW0ge051bWJlcn0gcGhyYXNlTGVuZ3RoIFRoZSBsZW5ndGggb2YgdGhlIHBocmFzZXNcbiAqICB0byBleHRyYWN0IGZyb20gdGhlIHRleHQuIERlZmF1bHRzIHRvIDIuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGFuIG9iamVjdCB3aG9zZSBrZXlzIGFyZSBwaHJhc2VzXG4gKiAgYW5kIHdob3NlIHZhbHVlcyBhcmUgdGhlIG51bWJlciBvZiBvY2N1cnJlbmNlcyBvZiB0aGUgcGhyYXNlLlxuICovXG5hdHJvcGEuVGV4dEFuYWx5emVyLnByb3RvdHlwZS5nZXRQaHJhc2VGcmVxdWVuY3kgPSBmdW5jdGlvbiBnZXRQaHJhc2VGcmVxdWVuY3koXG4gICAgcGhyYXNlTGVuZ3RoXG4pIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICBwaHJhc2VMZW5ndGggPSBhdHJvcGEuc2V0QXNPcHRpb25hbEFyZygyLCBwaHJhc2VMZW5ndGgpO1xuICAgIGlmKDIgPiBwaHJhc2VMZW5ndGgpIHtcbiAgICAgICAgcGhyYXNlTGVuZ3RoID0gMjtcbiAgICB9XG4gICAgdmFyIGNvdW50ZXIgPSAwLCBwcm9wLCBvdXQgPSBbXTtcbiAgICBcbiAgICB0aGlzLndvcmRzID0gYXRyb3BhLmFycmF5cy5yZWluZGV4KHRoaXMud29yZHMpO1xuICAgIFxuICAgIHRoaXMud29yZHMubWFwKGZ1bmN0aW9uKGVsZW1lbnQsIGluZGV4LCBhcnIpIHtcbiAgICAgICAgY291bnRlciA9IDE7ICAvLyBlbGVtZW50IGlzIHdvcmQgMSBvZiBwaHJhc2VMZW5ndGhcbiAgICAgICAgLy8gbWFraW5nIHN1cmUgdGhlcmUgYXJlIGVub3VnaCB3b3JkcyB0byBjb25jYXRlbmF0ZSBhIHBocmFzZSBvZiB0aGVcbiAgICAgICAgLy8gcHJvcGVyIGxlbmd0aC5cbiAgICAgICAgaWYoYXJyW2luZGV4ICsgcGhyYXNlTGVuZ3RoIC0gMV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcHJvcCA9IFN0cmluZyhlbGVtZW50ICsgJyAnKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgZm9yKGNvdW50ZXI7IGNvdW50ZXIgIT09IHBocmFzZUxlbmd0aDsgY291bnRlcisrKSB7XG4gICAgICAgICAgICAgICAgcHJvcCArPSBTdHJpbmcoYXJyW2luZGV4ICsgY291bnRlcl0gKyAnICcpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvdXQucHVzaChwcm9wLnRyaW0oKSk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBcbiAgICBvdXQgPSBhdHJvcGEuYXJyYXlzLmdldEZyZXF1ZW5jeShvdXQpO1xuICAgIFxuICAgIHJldHVybiBvdXQ7XG59O1xuXG5cblxuXG53aGlsZShhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMubGVuZ3RoID4gMCkge1xuICAgIGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5wb3AoKSgpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBhdHJvcGE7XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vZG9jcy92c2RvYy9PcGVuTGF5ZXJzQWxsLmpzXCIvPlxyXG52YXIgYXRyb3BhID0gcmVxdWlyZSgnYXRyb3BhLWhlYWRlcicpO1xyXG5hdHJvcGEuaW5xdWlyZSA9IHJlcXVpcmUoJ2F0cm9wYS1pbnF1aXJlJykuaW5xdWlyZTtcclxuLypqc2xpbnRcclxuICAgIGluZGVudDogNCxcclxuICAgIG1heGVycjogNTAsXHJcbiAgICB3aGl0ZTogdHJ1ZSxcclxuICAgIGJyb3dzZXI6IHRydWUsXHJcbiAgICBkZXZlbDogdHJ1ZSxcclxuICAgIHBsdXNwbHVzOiB0cnVlLFxyXG4gICAgcmVnZXhwOiB0cnVlXHJcbiovXHJcbi8qZ2xvYmFsIGF0cm9wYSAqL1xyXG4vLyBlbmQgaGVhZGVyXHJcblxyXG4vKipcclxuICogVXRpbGl0aWVzIGZvciBoYW5kbGluZyBhcnJheXMuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDIyMVxyXG4gKiBAbmFtZXNwYWNlIFV0aWxpdGllcyBmb3IgaGFuZGxpbmcgYXJyYXlzLlxyXG4gKi9cclxuYXRyb3BhLmFycmF5cyA9IHt9O1xyXG4vKipcclxuICogQ29tcGFyZXMgdHdvIGFycmF5cyBiYXNlZCBvbiBzaXplLCBjb250ZW50cywgYW5kIGVsZW1lbnQgb3JkZXIuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEyMDkwOVxyXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheTEgT25lIGFycmF5IHlvdSB3YW50IGNvbXBhcmVkIHRvIGFub3RoZXIuXHJcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5MiBUaGUgb3RoZXIgYXJyYXkuXHJcbiAqIEByZXR1cm5zIHtCb29sZWFufSBSZXR1cm5zIHRydWUgb3IgZmFsc2UgZGVwZW5kaW5nIG9uXHJcbiAqICB3aGV0aGVyIG9yIG5vdCB0aGUgYXJyYXlzIG1hdGNoZWQgaW4gc2l6ZSwgY29tcG9zaXRpb24sIGFuZFxyXG4gKiAgZWxlbWVudCBvcmRlci5cclxuICogQGV4YW1wbGVcclxuICogdmFyIHggPSBbMSwyXTtcclxuICogdmFyIHkgPSBbMSwxLDNdO1xyXG4gKiBhdHJvcGEuYXJyYXlzLm1hdGNoKHgseSk7XHJcbiAqIC8vIHJldHVybnMgZmFsc2VcclxuICogQGV4YW1wbGVcclxuICogdmFyIHggPSBbMSwyXTtcclxuICogdmFyIHkgPSBbMSwyXTtcclxuICogYXRyb3BhLmFycmF5cy5tYXRjaCh4LHkpO1xyXG4gKiAvLyByZXR1cm5zIHRydWVcclxuICogQGV4YW1wbGVcclxuICogdmFyIHggPSBbMSwyXTtcclxuICogdmFyIHkgPSBbMiwxXTtcclxuICogYXRyb3BhLmFycmF5cy5tYXRjaCh4LHkpO1xyXG4gKiAvLyByZXR1cm5zIGZhbHNlIGJlY2F1c2UgdGhlIGVsZW1lbnRzIGFyZSBub3QgaW4gdGhlIHNhbWUgb3JkZXIuXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciB4ID0gWzEseydhUHJvcCcgOiAnYVZhbHVlJ31dO1xyXG4gKiB2YXIgeSA9IFsxLHsnYVByb3AnIDogJ2FWYWx1ZSd9XTtcclxuICogYXRyb3BhLmFycmF5cy5tYXRjaCh4LHkpO1xyXG4gKiAvLyByZXR1cm5zIGZhbHNlIGJlY2F1c2UgZXZlbiB0aG91Z2ggdGhlIG9iamVjdCBsb29rcyB0aGUgc2FtZSwgdGhlXHJcbiAqIC8vIHR3byBvYmplY3RzIGFyZSBpbiBmYWN0IGRpc3RpbmN0IG9iamVjdHMuXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciBvYmogPSB7J2FQcm9wJyA6ICdhVmFsdWUnfTtcclxuICogdmFyIHggPSBbMSxvYmpdO1xyXG4gKiB2YXIgeSA9IFsxLG9ial07XHJcbiAqIGF0cm9wYS5hcnJheXMubWF0Y2goeCx5KTtcclxuICogLy8gcmV0dXJucyB0cnVlIGJlY2F1c2UgdGhlIG9iamVjdHMgcmVmZXJlbmNlZCBpbiB0aGUgYXJyYXlzIGFyZVxyXG4gKiAvLyBpbiBmYWN0IHRoZSBzYW1lIG9iamVjdC5cclxuICovXHJcbmF0cm9wYS5hcnJheXMubWF0Y2ggPSBmdW5jdGlvbiBhcnJheXNNYXRjaChhcnJheTEsIGFycmF5Mikge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICB2YXIgeCxcclxuICAgIGw7XHJcbiAgICBpZiAoYXJyYXkxLmxlbmd0aCAhPT0gYXJyYXkyLmxlbmd0aCkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGwgPSBhcnJheTEubGVuZ3RoO1xyXG4gICAgZm9yICh4ID0gMDsgeCA8IGw7IHggKz0gMSkge1xyXG4gICAgICAgIGlmIChhcnJheTFbeF0gIT09IGFycmF5Mlt4XSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbn07XHJcbi8qKlxyXG4gKiBTdWJ0cmFjdHMgb25lIGFycmF5IGZyb20gYW5vdGhlciBhcnJheSBiYXNlZCBvbiB0aGUgdW5pcXVlIHZhbHVlcyBpbiBib3RoXHJcbiAqICBzZXRzLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzAxMTJcclxuICogQHBhcmFtIHtBcnJheX0gYSAoc3VidHJhaGVuZCkgVGhlIGFycmF5IHRvIHN1YnRyYWN0LlxyXG4gKiBAcGFyYW0ge0FycmF5fSAobWludWVuZCkgZnJvbUIgVGhlIGFycmF5IHdpdGggZWxlbWVudHMgZHVwbGljYXRlZCBpbiA8Y29kZT5hPC9jb2RlPlxyXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYSBuZXcgYXJyYXkgY29udGFpbmluZyBvbmx5IHRoZSB1bmlxdWVcclxuICogIHZhbHVlcyBmb3VuZCBpbiA8Y29kZT5mcm9tQjwvY29kZT4gdGhhdCBhcmUgbm90IHByZXNlbnQgaW4gPGNvZGU+YTwvY29kZT5cclxuICogQGV4YW1wbGVcclxuICogdmFyIHggPSBbMSwyXTtcclxuICogdmFyIHkgPSBbMSwxLDNdO1xyXG4gKiBhdHJvcGEuYXJyYXlzLnN1YnRyYWN0KHgseSk7XHJcbiAqIC8vIHJldHVybnMgWzNdXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciB4ID0gWzEsM107XHJcbiAqIHZhciB5ID0gWzMsMV07XHJcbiAqIGF0cm9wYS5hcnJheXMuc3VidHJhY3QoeCx5KTtcclxuICogLy8gcmV0dXJucyBbXVxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgeCA9IFsxLDNdO1xyXG4gKiB2YXIgeSA9IFszLDEsMSw5XTtcclxuICogYXRyb3BhLmFycmF5cy5zdWJ0cmFjdCh4LHkpO1xyXG4gKiAvLyByZXR1cm5zIFs5XVxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgeCA9IFsxLDMseydhUHJvcCcgOiAnYVZhbCd9XTtcclxuICogdmFyIHkgPSBbMywxLHsnYVByb3AnIDogJ2FWYWwnfV07XHJcbiAqIGF0cm9wYS5hcnJheXMuc3VidHJhY3QoeCx5KTtcclxuICogLy8gcmV0dXJucyBbeydhUHJvcCcgOiAnYVZhbCd9XSBcclxuICogLy8gYmVjYXVzZSB0aGUgdHdvIG9iamVjdHMgYXJlIG5vdCB0aGUgc2FtZSBvYmplY3QuXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciBvYmogPSB7J2FQcm9wJyA6ICdhVmFsJ307XHJcbiAqIHZhciB4ID0gWzEsMyxvYmpdO1xyXG4gKiB2YXIgeSA9IFszLDEseydhUHJvcCcgOiAnYVZhbCd9XTtcclxuICogYXRyb3BhLmFycmF5cy5zdWJ0cmFjdCh4LHkpO1xyXG4gKiAvLyByZXR1cm5zIFt7J2FQcm9wJyA6ICdhVmFsJ31dIFxyXG4gKiAvLyBiZWNhdXNlIHRoZSB0d28gb2JqZWN0cyBhcmUgbm90IHRoZSBzYW1lIG9iamVjdC5cclxuICogQGV4YW1wbGVcclxuICogdmFyIG9iaiA9IHsnYVByb3AnIDogJ2FWYWwnfVxyXG4gKiB2YXIgeCA9IFsxLDMsb2JqXTtcclxuICogdmFyIHkgPSBbMywxLG9ial07XHJcbiAqIGF0cm9wYS5hcnJheXMuc3VidHJhY3QoeCx5KTtcclxuICogLy8gcmV0dXJucyBbXSBcclxuICogLy8gYmVjYXVzZSB0aGUgb2JqZWN0cyByZWZlcmVuY2VkIGluIHRoZSBhcnJheXMgYXJlIHRoZSBzYW1lIG9iamVjdC5cclxuICovXHJcbmF0cm9wYS5hcnJheXMuc3VidHJhY3QgPSBmdW5jdGlvbihhLCBmcm9tQikge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICB2YXIgdGhlID0ge307XHJcbiAgICB0aGUucmVzdWx0ID0gW107XHJcbiAgICBmcm9tQi5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pe1xyXG4gICAgICAgIHRoZS5tYXJrID0gZmFsc2U7XHJcbiAgICAgICAgYS5mb3JFYWNoKGZ1bmN0aW9uKHJtKXtcclxuICAgICAgICAgICAgaWYoaXRlbSA9PT0gcm0pIHtcclxuICAgICAgICAgICAgICAgIHRoZS5tYXJrID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmKHRoZS5tYXJrICE9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIHRoZS5yZXN1bHQucHVzaChpdGVtKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiB0aGUucmVzdWx0O1xyXG59O1xyXG4vKipcclxuICogUmV0dXJucyBhbiBhcnJheSBvZiB2YWx1ZXMgZm91bmQgaW4gYm90aCBvZiB0aGUgZ2l2ZW4gYXJyYXlzLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzAxMTJcclxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkxIEFuIGFycmF5LlxyXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheTIgQW5vdGhlciBhcnJheS5cclxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGFuIGFycmF5IG9mIHZhbHVlcyBmb3VuZCBpbiBib3RoIG9mIHRoZSBnaXZlblxyXG4gKiAgYXJyYXlzLlxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgeCA9IFsxLDMsNF07XHJcbiAqIHZhciB5ID0gWzMsMSw1XTtcclxuICogYXRyb3BhLmFycmF5cy5pbnRlcnNlY3QoeCx5KTtcclxuICogLy8gcmV0dXJucyBbMSwzXVxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgeCA9IFsxLDEsMyw0XTtcclxuICogdmFyIHkgPSBbMywxLDEsNV07XHJcbiAqIGF0cm9wYS5hcnJheXMuaW50ZXJzZWN0KHgseSk7XHJcbiAqIC8vIHJldHVybnMgWzEsMSwzXVxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgb2JqID0geydhUHJvcCcgOiAnYVZhbCd9O1xyXG4gKiB2YXIgeCA9IFsxLDMsb2JqXTtcclxuICogdmFyIHkgPSBbMywxLG9ial07XHJcbiAqIGF0cm9wYS5hcnJheXMuaW50ZXJzZWN0KHgseSk7XHJcbiAqIC8vIHJldHVybnMgWzEsMyx7J2FQcm9wJyA6ICdhVmFsJ31dXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciBvYmogPSB7J2FQcm9wJyA6ICdhVmFsJ307XHJcbiAqIHZhciB4ID0gWzEsMyx7J2FQcm9wJyA6ICdhVmFsJ31dO1xyXG4gKiB2YXIgeSA9IFszLDEsb2JqXTtcclxuICogYXRyb3BhLmFycmF5cy5pbnRlcnNlY3QoeCx5KTtcclxuICogLy8gcmV0dXJucyBbMSwzXSBiZWNhdXNlIHRoZSB0d28gb2JqZWN0cyBhcmUgbm90IHRoZSBzYW1lIG9iamVjdC5cclxuICogQGV4YW1wbGVcclxuICogdmFyIHggPSBbMSwzLHsnYVByb3AnIDogJ2FWYWwnfV07XHJcbiAqIHZhciB5ID0gWzMsMSx7J2FQcm9wJyA6ICdhVmFsJ31dO1xyXG4gKiBhdHJvcGEuYXJyYXlzLmludGVyc2VjdCh4LHkpO1xyXG4gKiAvLyByZXR1cm5zIFsxLDNdIGJlY2F1c2UgdGhlIHR3byBvYmplY3RzIGFyZSBub3QgdGhlIHNhbWUgb2JqZWN0LlxyXG4gKi9cclxuYXRyb3BhLmFycmF5cy5pbnRlcnNlY3QgPSBmdW5jdGlvbiBpbnRlcnNlY3QoYXJyYXkxLCBhcnJheTIpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgdmFyIHNtYWxsQXJyYXksIGxhcmdlQXJyYXksIGludGVyc2VjdGlvbiA9IFtdO1xyXG4gICAgaWYoYXJyYXkxLmxlbmd0aCA+IGFycmF5Mi5sZW5ndGgpIHtcclxuICAgICAgICBsYXJnZUFycmF5ID0gYXJyYXkxLnNwbGljZSgwKTtcclxuICAgICAgICBzbWFsbEFycmF5ID0gYXJyYXkyLnNwbGljZSgwKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbGFyZ2VBcnJheSA9IGFycmF5Mi5zcGxpY2UoMCk7XHJcbiAgICAgICAgc21hbGxBcnJheSA9IGFycmF5MS5zcGxpY2UoMCk7XHJcbiAgICB9XHJcbiAgICBzbWFsbEFycmF5LmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICB2YXIgaWR4SW5MYXJnZUFycmF5ID0gbGFyZ2VBcnJheS5pbmRleE9mKGl0ZW0pO1xyXG4gICAgICAgIGlmICgwIDw9IGlkeEluTGFyZ2VBcnJheSkgeyAvLyBoYXMgd29yZFxyXG4gICAgICAgICAgICBpbnRlcnNlY3Rpb24ucHVzaChsYXJnZUFycmF5LnNwbGljZShpZHhJbkxhcmdlQXJyYXksIDEpWzBdKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBpbnRlcnNlY3Rpb247XHJcbn07XHJcbi8qKlxyXG4gKiBDYWxjdWxhdGVzIHRoZSBmcmVxdWVuY3kgb2YgaXRlbXMgb2NjdXJyaW5nIGluIGFuIGFycmF5LlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzAxMThcclxuICogQHBhcmFtIHtBcnJheX0gYXJyIFRoZSBhcnJheSB0byBjYWxjdWxhdGUgZnJlcXVlbmNpZXMgZnJvbS5cclxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBhbiBvYmplY3Qgd2hvc2Uga2V5cyBhcmUgZWFjaCB1bmlxdWVcclxuICogIGVsZW1lbnRzIGZyb20gdGhlIGFycmF5IGFuZCB0aGVpciB2YWx1ZSBpcyB0aGVpciBmcmVxdWVuY3kgb2ZcclxuICogIG9jY3VycmVuY2Ugd2l0aGluIHRoZSBhcnJheS4gQmUgY2FyZWZ1bCB0aGF0IHlvdXIgYXJyYXkgZG9lc1xyXG4gKiAgbm90IGNvbnRhaW4gdmFsdWVzIG1hdGNoaW5nIG9iamVjdCBpbnN0YW5jZSBwcm9wZXJ0eSBuYW1lcy5cclxuICogQGV4YW1wbGVcclxuICogdmFyIHggPSBbMSwxLDEsMSwxLDMsM107XHJcbiAqIGF0cm9wYS5hcnJheXMuZ2V0RnJlcXVlbmN5KHgpO1xyXG4gKiAvLyByZXR1cm5zIHtcclxuICogLy8gICAgIFwiMVwiOiA1LFxyXG4gKiAvLyAgICAgXCIzXCI6IDJcclxuICogLy8gfVxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgeCA9IFtcImJpbGxcIiwgXCJmcmVkXCIsIFwiZnJlZFwiLCBcImphbmVcIl07XHJcbiAqIGF0cm9wYS5hcnJheXMuZ2V0RnJlcXVlbmN5KHgpO1xyXG4gKiAvLyByZXR1cm5zIHtcclxuICogLy8gICAgIFwiYmlsbFwiOiAxLFxyXG4gKiAvLyAgICAgXCJmcmVkXCI6IDIsXHJcbiAqIC8vICAgICBcImphbmVcIjogMVxyXG4gKiAvLyB9XHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciB4ID0gWzEsMyx7J2FQcm9wJyA6ICdhVmFsJ31dO1xyXG4gKiBhdHJvcGEuYXJyYXlzLmdldEZyZXF1ZW5jeSh4KTtcclxuICogLy8gcmV0dXJucyB7XHJcbiAqIC8vICAgICBcIjFcIjogMSxcclxuICogLy8gICAgIFwiM1wiOiAxLFxyXG4gKiAvLyAgICAgXCJbb2JqZWN0IE9iamVjdF1cIjogMVxyXG4gKiAvLyB9XHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciBvYmogPSB7J2FQcm9wJyA6ICdhVmFsJ307XHJcbiAqIHZhciBvdGhlck9iaiA9IHt9O1xyXG4gKiB2YXIgeCA9IFsxLDMsb2JqLG90aGVyT2JqLHsnYURvdWdobnV0JyA6ICdzcHJpbmtsZXMnfV07XHJcbiAqIGF0cm9wYS5hcnJheXMuZ2V0RnJlcXVlbmN5KHgpO1xyXG4gKiAvLyByZXR1cm5zIHtcclxuICogLy8gICAgIFwiMVwiOiAxLFxyXG4gKiAvLyAgICAgXCIzXCI6IDEsXHJcbiAqIC8vICAgICBcIltvYmplY3QgT2JqZWN0XVwiOiAzXHJcbiAqIC8vIH1cclxuICogQGV4YW1wbGVcclxuICogdmFyIHggPSBbMSwzLFwidG9TdHJpbmdcIl07XHJcbiAqIGF0cm9wYS5hcnJheXMuZ2V0RnJlcXVlbmN5KHgpO1xyXG4gKiAvLyByZXR1cm5zIHtcclxuICogLy8gICAgIFwiMVwiOiAxLFxyXG4gKiAvLyAgICAgXCIzXCI6IDEsXHJcbiAqIC8vICAgICBcInRvU3RyaW5nXCI6IFwiZnVuY3Rpb24gdG9TdHJpbmcoKSB7XFxuICAgIFtuYXRpdmUgY29kZV1cXG59MVwiXHJcbiAqIC8vIH1cclxuICovXHJcbmF0cm9wYS5hcnJheXMuZ2V0RnJlcXVlbmN5ID0gZnVuY3Rpb24gKGFycikge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICB2YXIgb3V0ID0gYXJyLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBjdXJyKSB7XHJcbiAgICAgICAgaWYgKGFjY1tjdXJyXSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGFjY1tjdXJyXSA9IDE7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYWNjW2N1cnJdICs9IDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhY2M7XHJcbiAgICB9LCB7fSk7XHJcbiAgICByZXR1cm4gb3V0O1xyXG59O1xyXG4vKipcclxuICogR2V0cyBVbmlxdWUgdmFsdWVzIGZyb20gYW4gYXJyYXkuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDExOFxyXG4gKiBAcGFyYW0ge0FycmF5fSBsYXJnZUFycmF5IFRoZSBhcnJheSB3aXRoIGR1cGxpY2F0ZSB2YWx1ZXMgaW4gaXQuXHJcbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBhIG5ldyBhcnJheSBjb250YWluaW5nIG9ubHkgdGhlIHVuaXF1ZVxyXG4gKiAgdmFsdWVzIGZvdW5kIGluIHRoZSBsYXJnZUFycmF5LlxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgeCA9IFsxLDEsMSw0LDQsMyw2XTtcclxuICogYXRyb3BhLmFycmF5cy5nZXRVbmlxdWUoeCk7XHJcbiAqIC8vIHJldHVybnMgWyBcIjFcIiwgXCI0XCIsIFwiM1wiLCBcIjZcIiBdXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciB4ID0gW1wiYmlsbFwiLCBcImZyZWRcIiwgXCJqYW5lXCIsIFwiZnJlZFwiXTtcclxuICogYXRyb3BhLmFycmF5cy5nZXRVbmlxdWUoeCk7XHJcbiAqIC8vIHJldHVybnMgW1wiYmlsbFwiLCBcImZyZWRcIiwgXCJqYW5lXCJdXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciB4ID0gWyBcclxuICogICAgIFwiYmlsbFwiLFxyXG4gKiAgICAge1wiYVByb3BcIiA6IFwiYVZhbHVlXCJ9LFxyXG4gKiAgICAge1wiYUd1eVwiIDogXCJmcmVkXCJ9LFxyXG4gKiAgICAge1wiYUxhZHlcIiA6IFwiamFuZVwifVxyXG4gKiBdO1xyXG4gKiBhdHJvcGEuYXJyYXlzLmdldFVuaXF1ZSh4KTtcclxuICogLy8gcmV0dXJucyBbIFwiYmlsbFwiLCBcIltvYmplY3QgT2JqZWN0XVwiIF1cclxuICovXHJcbmF0cm9wYS5hcnJheXMuZ2V0VW5pcXVlID0gZnVuY3Rpb24gKGxhcmdlQXJyYXkpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKGF0cm9wYS5hcnJheXMuZ2V0RnJlcXVlbmN5KGxhcmdlQXJyYXkpKS5zb3J0KCk7XHJcbn07XHJcbi8qKlxyXG4gKiBSZW1vdmVzIGVtcHR5IHN0cmluZ3MgZnJvbSB0aGUgZ2l2ZW4gYXJyYXkuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDExOFxyXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheVdpdGhFbXB0eUVsZW1lbnRzIFRoZSBhcnJheSB3aXRoIGVtcHR5IHN0cmluZ3MgaW4gaXQuXHJcbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBhIG5ldyBhcnJheSB3aXRoIGVtcHR5IHN0cmluZ3MgcmVtb3ZlZC5cclxuICogQGV4YW1wbGVcclxuICogdmFyIHggPSBbIDEwLCAsIDUsIFwiXCIsICcnLCA3IF07XHJcbiAqIGNvbnNvbGUubG9nKCdzdGFydGluZyBsZW5ndGggJyArIHgubGVuZ3RoKTtcclxuICogY29uc29sZS5sb2coeCk7XHJcbiAqIHggPSBhdHJvcGEuYXJyYXlzLnJlbW92ZUVtcHR5RWxlbWVudHMoeCk7XHJcbiAqIGNvbnNvbGUubG9nKCdlbmRpbmcgbGVuZ3RoICcgKyB4Lmxlbmd0aCk7XHJcbiAqIGNvbnNvbGUubG9nKHgpO1xyXG4gKiAvLyBkaXNwbGF5cyB0aGUgZm9sbG93aW5nXHJcbiAqIC8vIHN0YXJ0aW5nIGxlbmd0aCA2XHJcbiAqIC8vIFsxMCwgdW5kZWZpbmVkLCA1LCBcIlwiLCBcIlwiLCA3XVxyXG4gKiAvLyBlbmRpbmcgbGVuZ3RoIDNcclxuICogLy8gWzEwLCA1LCA3XVxyXG4gKi9cclxuYXRyb3BhLmFycmF5cy5yZW1vdmVFbXB0eUVsZW1lbnRzID0gZnVuY3Rpb24gKGFycmF5V2l0aEVtcHR5RWxlbWVudHMpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgcmV0dXJuIGFycmF5V2l0aEVtcHR5RWxlbWVudHMuZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgcmV0dXJuICFhdHJvcGEuaW5xdWlyZS5pc0VtcHR5U3RyaW5nKGl0ZW0pO1xyXG4gICAgfSk7XHJcbn07XHJcbi8qKlxyXG4gKiBSZWluZGV4ZXMgYW4gYXJyYXkuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDExOFxyXG4gKiBAcGFyYW0ge0FycmF5fSBhcnIgVGhlIGFycmF5IHdpdGggZGlzY29udGludW91cyBrZXlzLlxyXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYW4gYXJyYXkgd2l0aCBjb250aW51b3VzIGtleXMuXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciB4ID0gWyBcImFcIiwgXCJiXCIsIFwiY1wiLCB1bmRlZmluZWQgXTtcclxuICogY29uc29sZS5sb2coeCk7IC8vIFsgXCJhXCIsIFwiYlwiLCBcImNcIiwgdW5kZWZpbmVkIF1cclxuICogY29uc29sZS5sb2coeC5sZW5ndGgpOyAvLyA0XHJcbiAqIFxyXG4gKiBkZWxldGUgeFsxXTsgLy8gZGVsZXRlcyB0aGUga2V5IGZyb20gdGhlIGFycmF5IGJ1dFxyXG4gKiAgICAgICAgICAgICAgLy8gdGhlIGFycmF5IGxlbmd0aCByZW1haW5zIHRoZSBzYW1lXHJcbiAqICAgICAgICAgICAgICAvLyBhdCB0aGlzIHBvaW50IHRoZSBhcnJheXMga2V5cyBhcmUgMCwgMiwgYW5kIDNcclxuICogY29uc29sZS5sb2coeCk7IC8vIFsgXCJhXCIsIHVuZGVmaW5lZCwgXCJjXCIsIHVuZGVmaW5lZCBdXHJcbiAqIGNvbnNvbGUubG9nKHgubGVuZ3RoKTsgLy8gNFxyXG4gKiBcclxuICogeCA9IGF0cm9wYS5hcnJheXMucmVpbmRleCh4KTtcclxuICogY29uc29sZS5sb2coeCk7IC8vICBbIFwiYVwiLCBcImNcIiwgdW5kZWZpbmVkIF1cclxuICogICAgLy8gbm90ZSB0aGF0IHRoZSBsYXN0IGVsZW1lbnQgZXhpc3RlZCBpbiB0aGUgYXJyYXksIGl0cyB2YWx1ZSB3YXNcclxuICogICAgLy8gdW5kZWZpbmVkIGJ1dCBpdCBkaWQgaGF2ZSBhIGtleSBzbyB0aGUgZWxlbWVudCByZW1haW5zIGluIHRoZSBhcnJheS5cclxuICogICAgLy9cclxuICogICAgLy8gVGhlIGRlbGV0ZWQgZWxlbWVudCB3YXMgaW4gZmFjdCBkZWxldGVkIGZyb20gdGhlIGFycmF5IHNvIHRoZXJlIHdhcyBub1xyXG4gKiAgICAvLyBrZXkgeFsxXSBhdCBhbGwsIHdoZW4gdHJ5aW5nIHRvIGFjY2VzcyB0aGlzIG5vbiBleGlzdGluZyBlbGVtZW50IHRoZVxyXG4gKiAgICAvLyB2YWx1ZSBvZiB1bmRlZmluZWQgd2FzIHJldHVybmVkLiBUaGlzIGJlaGF2aW9yIGlzIGNvbmZ1c2luZyB1bmxlc3MgeW91XHJcbiAqICAgIC8vIHRoaW5rIGFib3V0IHRoZSBhcnJheWFzIGFuIG9iamVjdCB3aG9zZSBwcm9wZXJ0aWVzIGFyZSBuYW1lZCBieVxyXG4gKiAgICAvLyBudW1iZXJzLiBBY2Nlc3NpbmcgYW4gdW5kZWZpbmVkIHByb3BlcnR5IHJldHVybnMgdW5kZWZpbmVkIHJlZ2FyZGxlc3NcclxuICogICAgLy8gb2Ygd2hldGhlciB0aGUgcHJvcGVydHkgZXhpc3RlZCBpbiB0aGUgcGFzdCBvciBub3QuXHJcbiAqIGNvbnNvbGUubG9nKHgubGVuZ3RoKTsgLy8gM1xyXG4gKi9cclxuYXRyb3BhLmFycmF5cy5yZWluZGV4ID0gZnVuY3Rpb24gcmVpbmRleChhcnIpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgdmFyIGlkeCwgb3V0O1xyXG4gICAgb3V0ID0gW107XHJcbiAgICBmb3IoaWR4IGluIGFycikge1xyXG4gICAgICAgIGlmKGFyci5oYXNPd25Qcm9wZXJ0eShpZHgpKSB7XHJcbiAgICAgICAgICAgIG91dC5wdXNoKGFycltpZHhdKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gb3V0O1xyXG59O1xyXG4vKipcclxuICogU29ydHMgYW4gYXJyYXkncyBlbGVtZW50cyBudW1lcmljYWxseS5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwMTIwXHJcbiAqIEBwYXJhbSB7QXJyYXl9IGFyciBUaGUgYXJyYXkgdG8gc29ydC4gQWxsIGVsZW1lbnRzIG9mIHRoZSBhcnJheSBtdXN0IGJlXHJcbiAqICBudW1iZXItaXNoLlxyXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYW4gYXJyYXkgd2hvc2UgZWxlbWVudHMgYXJlIGluIG51bWVyaWMgb3JkZXIuXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciB4ID0gWzMsIDIsIDksIDI2LCAxMCwgMSwgOTksIDE1XTtcclxuICogY29uc29sZS5sb2coIGF0cm9wYS5hcnJheXMuc29ydE51bWVyaWNhbGx5KHgpICk7XHJcbiAqIC8vIGxvZ3MgWzEsIDIsIDMsIDksIDEwLCAxNSwgMjYsIDk5XVxyXG4gKi9cclxuYXRyb3BhLmFycmF5cy5zb3J0TnVtZXJpY2FsbHkgPSBmdW5jdGlvbiBzb3J0TnVtZXJpY2FsbHkoYXJyKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHJldHVybiBhcnIuc29ydChmdW5jdGlvbiAoYSwgYikge1xyXG4gICAgICAgIHJldHVybiAoYSAtIGIpO1xyXG4gICAgfSk7XHJcbn07XHJcbi8qKlxyXG4gKiBUaHJvd3MgYW4gZXJyb3IsIDxjb2RlPlN0cmluZy5wcm90b3R5cGUubG9jYWxlQ29tcGFyZTwvY29kZT4gaXMgbm90IFxyXG4gKiAgc3RhbmRhcmRpemVkLlxyXG4gKiBcclxuICogIFllcywgbG9jYWxlQ29tcGFyZSBpcyBpbiB0aGUgc3RhbmRhcmQgYnV0LCBhdCB0aGlzIHRpbWUgdGhlIGFjdHVhbFxyXG4gKiAgY29tcGFyaXNvbiBpcyBpbXBsZW1lbnRhdGlvbiBkZXBlbmRhbnQuIFRoaXMgbWVhbnMgdGhhdCBcImFscGhhYmV0aWNhbCBvcmRlclwiXHJcbiAqICBjYW4gYmUgZGlmZmVyZW50IG9uIGRpZmZlcmVudCBwbGF0Zm9ybXMuIFdoYXQgSSBmb3VuZCB3YXMgdGhhdCBpbiBub2RlIHRoZVxyXG4gKiAgYXJyYXkgb2YgPGNvZGU+WydhJywnWicsJ0EnLCd6J108L2NvZGU+IHdvdWxkIGJlIHNvcnRlZCB0b1xyXG4gKiAgPGNvZGU+WydBJywnWicsJ2EnLCd6XCJdPC9jb2RlPiwgd2hpbGUgb25cclxuICogIGZpcmVmb3ggaXQgd291bGQgYmUgc29ydGVkIHRvIDxjb2RlPlsnYScsJ0EnLCd6JywnWiddPC9jb2RlPi4gV2hvIGtub3dzIGlmXHJcbiAqICBhbm90aGVyIGltcGxlbWVudG9yIHdvdWxkIHNvcnQgaXQgPGNvZGU+WydBJywnYScsJ1onLCd6J108L2NvZGU+P1xyXG4gKiBcclxuICogSW4gb3JkZXIgdG8gcHJvdmlkZSBhIHJlbGlhYmxlIGltcGxlbWVudGF0aW9uIEkgd291bGQgaGF2ZSB0byBjcmVhdGUgbXkgb3duXHJcbiAqICBpbXBsZW1lbnRhdGlvbiBvZiA8Y29kZT5TdHJpbmcucHJvdG90eXBlLmxvY2FsZUNvbXBhcmU8L2NvZGU+IGFuZCB0aGF0J3NcclxuICogIGp1c3QgdG9vIG11Y2ggd29yayBmb3IgbWUgdG8gZG8gYWxvbmUuXHJcbiAqIEB0aHJvd3Mge0Vycm9yfSBcIlN0cmluZy5wcm90b3R5cGUubG9jYWxlQ29tcGFyZSBpcyBub3Qgc3RhbmRhcmRpemVkXCJcclxuICovXHJcbmF0cm9wYS5hcnJheXMuc29ydEFscGhhYmV0aWNhbGx5ID0gZnVuY3Rpb24gc29ydEFscGhhYmV0aWNhbGx5KGFycikge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJTdHJpbmcucHJvdG90eXBlLmxvY2FsZUNvbXBhcmUgaXMgbm90IHN0YW5kYXJkaXplZFwiKTtcclxufTtcclxuLyoqXHJcbiAqIERlbGV0ZXMgdGhlIGdpdmVuIGVsZW1lbnQgZnJvbSB0aGUgYXJyYXkgYXQgdGhlIGdpdmVuIGluZGV4LiBJdCBiYXNpY2FsbHlcclxuICogIGRvZXMgd2hhdCB5b3Ugd291bGQgZXhwZWN0IHRoZSBkZWxldGUgb3BlcmF0b3IgdG8gZG8sIGV4Y2VwdCB0aGUgZGVsZXRlXHJcbiAqICBvcGVyYXRvciBkb2Vzbid0IGRvIHdoYXQgeW91IHdvdWxkIGV4cGVjdC5cclxuICogQHBhcmFtIHtBcnJheX0gYXJyIFRoZSBhcnJheS5cclxuICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4IFRoZSBpbmRleCBvZiB0aGUgZWxlbWVudCB0byBkZWxldGUuXHJcbiAqIEByZXR1cm5zIFJldHVybnMgYW4gYXJyYXkgd2l0aCB0aGUgZWxlbWVudCByZW1vdmVkLCBjb250aWd1b3VzIGtleXMsIGFuZFxyXG4gKiAgd2hvc2UgbGVuZ3RoIGlzIDEgbGVzcyB0aGFuIHRoZSBpbnB1dCBhcnJheS5cclxuICovXHJcbmF0cm9wYS5hcnJheXMuZGVsZXRlRWxlbWVudCA9IGZ1bmN0aW9uIChhcnIsIGluZGV4KSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIGRlbGV0ZSBhcnJbaW5kZXhdO1xyXG4gICAgcmV0dXJuIGF0cm9wYS5hcnJheXMucmVpbmRleChhcnIpO1xyXG59O1xyXG5cclxuXHJcblxyXG5cclxud2hpbGUoYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLmxlbmd0aCA+IDApIHtcclxuICAgIGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5wb3AoKSgpO1xyXG59XHJcbm1vZHVsZS5leHBvcnRzID0gYXRyb3BhO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vZG9jcy92c2RvYy9PcGVuTGF5ZXJzQWxsLmpzXCIvPlxudmFyIGF0cm9wYSA9IHJlcXVpcmUoJ2F0cm9wYS1oZWFkZXInKTtcbi8qanNsaW50XG4gICAgaW5kZW50OiA0LFxuICAgIG1heGVycjogNTAsXG4gICAgd2hpdGU6IHRydWUsXG4gICAgYnJvd3NlcjogdHJ1ZSxcbiAgICBkZXZlbDogdHJ1ZSxcbiAgICBwbHVzcGx1czogdHJ1ZSxcbiAgICByZWdleHA6IHRydWVcbiovXG4vKmdsb2JhbCBhdHJvcGEgKi9cbi8vIGVuZCBoZWFkZXJcbi8qKlxuICogQ29udGFpbmVyIGZvciBjdXN0b20gRXJyb3JzLlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAqIEBuYW1lc3BhY2UgQ29udGFpbmVyIGZvciBjdXN0b20gRXJyb3JzLlxuICovXG5hdHJvcGEuY3VzdG9tRXJyb3JzID0ge307XG5cbi8qKlxuICogSW52YWxpZCBBcmd1bWVudCBUeXBlcyBFcnJvclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAqIEB2ZXJzaW9uIDIwMTMwMjIxXG4gKiBAY2xhc3MgSW52YWxpZCBBcmd1bWVudCBUeXBlcyBFcnJvclxuICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2UgT3B0aW9uYWwuIFRoZSBlcnJvciBtZXNzYWdlIHRvIHNlbmQuIERlZmF1bHRzIHRvXG4gKiAgPGNvZGU+SW52YWxpZEFyZ3VtZW50VHlwZXNFcnJvcjwvY29kZT5cbiAqIEByZXR1cm5zIHtFcnJvcn0gUmV0dXJucyBhbiBpbnN0YW5jZSBvZiB0aGUgSW52YWxpZEFyZ3VtZW50VHlwZXNFcnJvclxuICovXG5hdHJvcGEuY3VzdG9tRXJyb3JzLkludmFsaWRBcmd1bWVudFR5cGVzRXJyb3IgPSBmdW5jdGlvbiBJbnZhbGlkQXJndW1lbnRUeXBlc0Vycm9yKG1lc3NhZ2UpIHtcbiAgICAndXNlIHN0cmljdCc7XG4gICAgLyoqXG4gICAgICogVGhlIG5hbWUgb2YgdGhlIGVycm9yLiBUZWxscyB0aGUgdXNlciB3aGF0IGtpbmQgb2YgY3VzdG9tXG4gICAgICogZXJyb3IgaGFzIGJlZW4gdGhyb3duLlxuICAgICAqIEBmaWVsZE9mIGF0cm9wYS5jdXN0b21FcnJvcnMuSW52YWxpZEFyZ3VtZW50VHlwZXNFcnJvciNcbiAgICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgICAqIEBkZWZhdWx0IFwiYXRyb3BhLmN1c3RvbUVycm9ycy5JbnZhbGlkQXJndW1lbnRUeXBlc0Vycm9yXCJcbiAgICAgKi9cbiAgICB0aGlzLm5hbWUgPSBcImF0cm9wYS5jdXN0b21FcnJvcnMuSW52YWxpZEFyZ3VtZW50VHlwZXNFcnJvclwiO1xuICAgIC8qKlxuICAgICAqIFRoZSBlcnJvciBtZXNzYWdlIHRvIHNlbmQuXG4gICAgICogQGZpZWxkT2YgYXRyb3BhLmN1c3RvbUVycm9ycy5JbnZhbGlkQXJndW1lbnRUeXBlc0Vycm9yI1xuICAgICAqIEB0eXBlIHtTdHJpbmd9XG4gICAgICogQGRlZmF1bHQgXCJJbnZhbGlkQXJndW1lbnRUeXBlc0Vycm9yXCJcbiAgICAgKi9cbiAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlIHx8IFwiSW52YWxpZEFyZ3VtZW50VHlwZXNFcnJvclwiO1xufTtcbmF0cm9wYS5jdXN0b21FcnJvcnMuSW52YWxpZEFyZ3VtZW50VHlwZXNFcnJvci5wcm90b3R5cGUgPSBuZXcgRXJyb3IoKTtcbmF0cm9wYS5jdXN0b21FcnJvcnMuSW52YWxpZEFyZ3VtZW50VHlwZXNFcnJvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBcbiAgICBhdHJvcGEuY3VzdG9tRXJyb3JzLkludmFsaWRBcmd1bWVudFR5cGVzRXJyb3I7XG5cblxuXG5cbndoaWxlKGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5sZW5ndGggPiAwKSB7XG4gICAgYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLnBvcCgpKCk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGF0cm9wYTtcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9kb2NzL3ZzZG9jL09wZW5MYXllcnNBbGwuanNcIi8+XG4vKmpzbGludFxuICAgIGluZGVudDogNCxcbiAgICBtYXhlcnI6IDUwLFxuICAgIHdoaXRlOiB0cnVlLFxuICAgIGJyb3dzZXI6IHRydWUsXG4gICAgZGV2ZWw6IHRydWUsXG4gICAgcGx1c3BsdXM6IHRydWUsXG4gICAgcmVnZXhwOiB0cnVlXG4qL1xuLypnbG9iYWwgWFBhdGhSZXN1bHQgKi9cbi8vIGVuZCBoZWFkZXJcblxuLyoqXG4gKiBDb250YWluZXIgZm9yIGFsbCBHbG9yaW91cyBjbGFzc2VzLCBmdW5jdGlvbnMsIGV0Yy5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAbmFtZXNwYWNlIENvbnRhaW5lciBmb3IgYWxsIEdsb3Jpb3VzIGNsYXNzZXMsIGZ1bmN0aW9ucywgZXRjLlxuICovXG52YXIgYXRyb3BhID0ge307XG4vKipcbiAqIENoZWNrcyB3aGV0aGVyIHRoaXMgY2xhc3MgaGFzIGJlZW4gbWFya2VkIGFzIHVuc3VwcG9ydGVkIGFuZCB0aHJvd3MgYW4gXG4gKiAgZXJyb3IgaWYgaXQgaGFzLlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAqIEB2ZXJzaW9uIDIwMTMwMzA4XG4gKiBAcGFyYW0ge1N0cmluZ30gY2xhc3NOYW1lIFRoZSBuYW1lIG9mIHRoZSBjbGFzcy5cbiAqIEBwYXJhbSB7U3RyaW5nfSBlcnJvck1lc3NhZ2UgT3B0aW9uYWwuIEEgY3VzdG9tIGVycm9yIG1lc3NhZ2UuIERlZmF1bHRzIHRvXG4gKiAgYXRyb3BhLmRhdGFbY2xhc3NOYW1lXS5lcnJvclxuICovXG5hdHJvcGEuc3VwcG9ydENoZWNrID0gZnVuY3Rpb24gKGNsYXNzTmFtZSwgZXJyb3JNZXNzYWdlKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgY2xhc3NOYW1lID0gU3RyaW5nKGNsYXNzTmFtZSk7XG4gICAgZXJyb3JNZXNzYWdlID0gZXJyb3JNZXNzYWdlIHx8IGF0cm9wYS5kYXRhW2NsYXNzTmFtZV0uZXJyb3I7XG4gICAgZXJyb3JNZXNzYWdlID0gU3RyaW5nKGVycm9yTWVzc2FnZSk7XG4gICAgXG4gICAgaWYoYXRyb3BhLmRhdGFbY2xhc3NOYW1lXS5zdXBwb3J0ID09PSAndW5zdXBwb3J0ZWQnKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvck1lc3NhZ2UpO1xuICAgIH1cbn07XG4vKipcbiAqIFB1c2hlcyBhIHJlcXVpcmVtZW50IGNoZWNrIGludG8gYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLiBUaGUgdGVzdFxuICogIHRlc3RzIHdoZXRoZXIgdGhlIGNsYXNzIGlzIHN1cHBvcnRlZCBpbiB0aGlzIGVudmlyb25tZW50LiBTZXRzXG4gKiAgYXRyb3BhLmRhdGFbY2xhc3NOYW1lXSdzIHN1cHBvcnQgdG8gdW5zdXBwb3J0ZWQgYW5kIGVycm9yIHRvIGVycm9yTWVzc2FnZVxuICogIGlmIHRoZSByZXF1aXJlbWVudEZuIHJldHVybnMgZmFsc2UuIFRoZSByZXF1aXJlbWVudCBjaGVja3Mgd2lsbCBhbGwgYmUgcnVuXG4gKiAgYWZ0ZXIgdGhlIGxpYnJhcnkgaGFzIGxvYWRlZC5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAdmVyc2lvbiAyMDEzMDMwOFxuICogQHBhcmFtIHtTdHJpbmd9IGNsYXNzTmFtZSBUaGUgbmFtZSBvZiB0aGUgY2xhc3MuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZXF1aXJlbWVudEZuIEEgZnVuY3Rpb24gdG8gdGVzdCB3aGV0aGVyIG9yIG5vdCB0aGUgY2xhc3NcbiAqICBpcyBzdXBwb3J0ZWQgaW4gdGhpcyBlbnZpcm9ubWVudC4gSWYgc3VwcG9ydGVkLCByZXR1cm5zIHRydWUgb3RoZXJ3aXNlXG4gKiAgcmV0dXJuIGZhbHNlLlxuICogQHBhcmFtIHtTdHJpbmd9IGVycm9yTWVzc2FnZSBUaGUgZXJyb3IgbWVzc2FnZSB0byB1c2Ugd2hlbiB0aGlzIGNsYXNzIG9yIGl0c1xuICogIG1ldGhvZHMgYXJlIGNhbGxlZCBpbiB1bnN1cHBvcnRlZCBlbnZpcm9ubWVudHMuIERlZmF1bHRzIHRvOlxuICogICdUaGUgYXRyb3BhLicgKyBjbGFzc05hbWUgKyAnIGNsYXNzIGlzIHVuc3VwcG9ydGVkIGluIHRoaXMgZW52aXJvbm1lbnQuJztcbiAqL1xuYXRyb3BhLnJlcXVpcmVzID0gZnVuY3Rpb24gKGNsYXNzTmFtZSwgcmVxdWlyZW1lbnRGbiwgZXJyb3JNZXNzYWdlKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgdmFyIGNoZWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgdGVzdCA9IGZhbHNlO1xuICAgICAgICBpZih0eXBlb2YgY2xhc3NOYW1lICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdhdHJvcGEucmVxdWlyZXMgcmVxdWlyZXMgdGhlIGNsYXNzIG5hbWUgdG8gYmUgJyArXG4gICAgICAgICAgICAgICAgJ3NwZWNpZmllZCcpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZihhdHJvcGEuZGF0YVtjbGFzc05hbWVdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGF0cm9wYS5kYXRhW2NsYXNzTmFtZV0gPSB7fTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYodHlwZW9mIHJlcXVpcmVtZW50Rm4gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICByZXF1aXJlbWVudEZuID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlcnJvck1lc3NhZ2UgPSBlcnJvck1lc3NhZ2UgfHwgJ1RoZSBhdHJvcGEuJyArIGNsYXNzTmFtZSArXG4gICAgICAgICAgICAgICAgICAgICcgY2xhc3MgaXMgdW5zdXBwb3J0ZWQgaW4gdGhpcyBlbnZpcm9ubWVudC4nO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB0ZXN0ID0gcmVxdWlyZW1lbnRGbigpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIHRlc3QgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgYXRyb3BhLmRhdGFbY2xhc3NOYW1lXS5lcnJvciA9IGVycm9yTWVzc2FnZTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYodGVzdCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBhdHJvcGEuZGF0YVtjbGFzc05hbWVdLnN1cHBvcnQgPSAndW5zdXBwb3J0ZWQnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBcbiAgICBhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMucHVzaChjaGVjayk7XG59O1xuLyoqXG4gKiBDb250YWluZXIgZm9yIGdvYmFsIGRhdGEgcmVsYXRlZCB0byB0aGUgY2xhc3NlcyBhbmQgZnVuY3Rpb25zLlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAqIEBuYW1lc3BhY2UgQ29udGFpbmVyIGZvciBnb2JhbCBkYXRhIHJlbGF0ZWQgdG8gdGhlIGNsYXNzZXMgYW5kIGZ1bmN0aW9ucy5cbiAqL1xuYXRyb3BhLmRhdGEgPSB7fTtcblxuYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzID0gW107XG5cbmF0cm9wYS5ub3AgPSBmdW5jdGlvbiBub3AgKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIHJldHVybiBudWxsO1xufTtcbm1vZHVsZS5leHBvcnRzID0gYXRyb3BhO1xuXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vZG9jcy92c2RvYy9PcGVuTGF5ZXJzQWxsLmpzXCIvPlxyXG52YXIgYXRyb3BhID0gcmVxdWlyZSgnYXRyb3BhLWhlYWRlcicpO1xyXG5hdHJvcGEuc2V0QXNPcHRpb25hbEFyZyA9IHJlcXVpcmUoJ2F0cm9wYS1zZXRBc09wdGlvbmFsQXJnJykuc2V0QXNPcHRpb25hbEFyZztcclxuLypqc2xpbnRcclxuICAgIGluZGVudDogNCxcclxuICAgIG1heGVycjogNTAsXHJcbiAgICB3aGl0ZTogdHJ1ZSxcclxuICAgIGJyb3dzZXI6IHRydWUsXHJcbiAgICBkZXZlbDogdHJ1ZSxcclxuICAgIHBsdXNwbHVzOiB0cnVlLFxyXG4gICAgcmVnZXhwOiB0cnVlXHJcbiovXHJcbi8qZ2xvYmFsIGF0cm9wYSAqL1xyXG4vLyBlbmQgaGVhZGVyXHJcblxyXG5cclxuYXRyb3BhLnJlcXVpcmVzKFxyXG4gICAgJ2luamVjdCcsXHJcbiAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICAgICAgaWYoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbik7XHJcblxyXG4vKipcclxuICogQ29udGFpbnMgdG9vbHMgZm9yIGluamVjdGluZyBlbGVtZW50cyBhbmQgYXNzZW1ibGllcy5cclxuICogaW50byB0aGUgcGFnZS5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwMzA4XHJcbiAqIEBuYW1lc3BhY2UgQ29udGFpbnMgdG9vbHMgZm9yIGluamVjdGluZyBlbGVtZW50cyBhbmQgYXNzZW1ibGllcy5cclxuICogQHJlcXVpcmVzIGF0cm9wYS5kYXRhXHJcbiAqIEByZXF1aXJlcyBhdHJvcGEuc3VwcG9ydENoZWNrXHJcbiAqIEByZXF1aXJlcyBhdHJvcGEuc2V0QXNPcHRpb25hbEFyZ1xyXG4gKi9cclxuYXRyb3BhLmluamVjdCA9IHt9O1xyXG4vKipcclxuICogR2VuZXJpYyBFbGVtZW50IEluamVjdG9yLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMjA5MDlcclxuICogQHBhcmFtIHtTdHJpbmd9IGVsZW1lbnRUeXBlIFRoZSB0eXBlIG9mIGVsZW1lbnQgdG8gYmUgaW5qZWN0ZWQuXHJcbiAqIEBwYXJhbSB7SFRNTCBET00gRG9jdW1lbnR9IGRvY3JlZiBPcHRpb25hbC4gQSByZWZlcmVuY2UgdG8gdGhlIGRvY3VtZW50IHRvXHJcbiAqICB0YXJnZXQsIGRlZmF1bHRzIHRvIDxjb2RlPmRvY3VtZW50PC9jb2RlPi5cclxuICogQHBhcmFtIHtET00gTm9kZX0gcGFyZW50Tm9kIE9wdGlvbmFsLiBBIHJlZmVyZW5jZSB0byB0aGUgcGFyZW50IG5vZGUgdG9cclxuICogIHRhcmdldCwgZGVmYXVsdHMgdG8gPGNvZGU+ZG9jcmVmLmJvZHk8L2NvZGU+LlxyXG4gKiBAcGFyYW0ge09iamVjdH0gYXR0cmlidXRlcyBPcHRpb25hbC4gQW4gb2JqZWN0IHdob3NlIHByb3BlcnRpZXMgYXJlIG5hbWVzIG9mXHJcbiAqICBIVE1MIGF0dHJpYnV0ZXMsIGRlZmF1bHRzIHRvIDxjb2RlPnt9PC9jb2RlPi4gVGhlIHZhbHVlIG9mIHRoZXNlIHByb3BlcnRpZXNcclxuICogIGFyZSB0byBiZSBzdHJpbmdzIHJlcHJlc2VudGluZyB0aGUgdmFsdWVzIG9mIHRoZSBIVE1MIGF0dHJpYnV0ZXMgYXMgdGhleSBhcmVcclxuICogIHRvIGJlIGFwcGxpZWQgdG8gdGhlIGluamVjdGVkIGVsZW1lbnQuXHJcbiAqIEBleGFtcGxlIEV4YW1wbGUgYXR0cmlidXRlcyBvYmplY3QgOlxyXG4gKlxyXG4gKiBhdHRyaWJ1dGVzT2JqID0ge1xyXG4gKiAgICAgXCJpZFwiIDogXCJlbGVtZW50SURcIixcclxuICogICAgIFwiY2xhc3NcIiA6IFwiY2xhc3N5XCJcclxuICogfTtcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gb25sb2FkSGFuZGxlciBPcHRpb25hbC4gSWYgdGhlIGVsZW1lbnQgYmVpbmcgaW5qZWN0ZWQgd2lsbFxyXG4gKiAgZmlyZSBhIGxvYWQgZXZlbnQsIHRoaXMgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQuIERlZmF1bHRzIHRvXHJcbiAqICA8Y29kZT5mdW5jdGlvbiAoKSB7fTwvY29kZT4uXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIE9wdGlvbmFsLiBUaGlzIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIGp1c3QgYmVmb3JlXHJcbiAqICB0aGUgZWxlbWVudCBpcyB0byBiZSBhcHBlbmRlZCB0byB0aGUgcGFnZS4gVGhlIGNhbGxiYWNrIHdpbGwgcmVjZWl2ZSB0aGVcclxuICogIGVsZW1lbnQgaW4gaXRzIGN1cnJlbnQgc3RhdGUgZm9yIGFueSBhZGRpdGlvbmFsIHByb2Nlc3NpbmcgdG8gYmUgZG9uZSBwcmlvclxyXG4gKiAgdG8gaXQncyBhdHRhY2htZW50IG9uIGNhbGxiYWNrIGNvbXBsZXRpb24uIERlZmF1bHRzIHRvXHJcbiAqICA8Y29kZT5mdW5jdGlvbiAoKSB7fTwvY29kZT4uXHJcbiAqIEByZXR1cm4ge0hUTUwgRWxlbWVudH0gUmV0dXJucyBhIHJlZmVyZW5jZSB0byB0aGUgSFRNTCBFbGVtZW50IGNyZWF0ZWQgYW5kXHJcbiAqICBpbmplY3RlZC5cclxuICogQHNlZSA8YSBocmVmPVwiaHR0cDovL3d3dy53My5vcmcvU2VjdXJpdHkvd2lraS9TYW1lX09yaWdpbl9Qb2xpY3lcIj5cclxuICogaHR0cDovL3d3dy53My5vcmcvU2VjdXJpdHkvd2lraS9TYW1lX09yaWdpbl9Qb2xpY3k8L2E+XHJcbiAqIEBleGFtcGxlXHJcbiAqICAvLyB0aGlzIHdpbGwgaW5qZWN0IGEgZGl2IGVsZW1lbnQgaW50byB0aGUgZG9jdW1lbnQgYm9keS5cclxuICogIHZhciBlbCA9IGF0cm9wYS5pbmplY3QuZWxlbWVudCAoJ2RpdicpO1xyXG4gKiAgXHJcbiAqICAvLyBUaGlzIHdpbGwgaW5qZWN0IGEgZGl2IHdpdGggdGhlIGlkIFwibXlJZFwiIGludG8gdGhlIGVsZW1lbnQgcmVmZXJlbmNlZCBieVxyXG4gKiAgLy8gXCJjb250YWluZXJcIlxyXG4gKiAgdmFyIGVsID0gYXRyb3BhLmluamVjdC5lbGVtZW50IChcclxuICogICAgICAnZGl2JywgZG9jdW1lbnQsIGNvbnRhaW5lciwgeyAnaWQnOiAnbXlJZCcgfSwgbnVsbCwgbnVsbFxyXG4gKiAgKTtcclxuICogIFxyXG4gKiAgLy8gdGhpcyB3aWxsIGluamVjdCBhIGRpdiBpbnRvIHRoZSBkb2N1bWVudCBvZiBhbiBpZnJhbWUgcmVmZXJlbmNlZCB3aXRoIFwiZmRvY1wiXHJcbiAqICAvLyBKdXN0IGJlZm9yZSB0aGUgZGl2IGlzIGluamVjdGVkIHRoZSBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZCBhbmQgdGhlIGVsZW1lbnRcclxuICogIC8vIG1heSBiZSBhdWdtZW50ZWQuIFdoZW4gdGhlIGNhbGxiYWNrIHJldHVybnMgdGhlIGVsZW1lbnQgd2lsbCBiZSBpbmplY3RlZC5cclxuICogIHZhciBmZG9jID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NvbWVGcmFtZScpLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQ7XHJcbiAqICBcclxuICogIHZhciBlbCA9IGF0cm9wYS5pbmplY3QuZWxlbWVudCAoXHJcbiAqICAgICAgJ2RpdicsIGZkb2MsIGZkb2MuYm9keSwgeyAnaWQnOiAnbXlJZCcgfSxcclxuICogICAgICBudWxsLFxyXG4gKiAgICAgIGZ1bmN0aW9uIChteURpdikge1xyXG4gKiAgICAgICAgICBteURpdi50ZXh0Q29udGVudCA9ICdJIGNvdWxkIGhhdmUgYXR0YWNoZWQgZXZlbnQgaGFuZGxlcnMnO1xyXG4gKiAgICAgIH1cclxuICogICk7XHJcbiAqICBcclxuICogIC8vIHRoaXMgd2lsbCBpbmplY3QgYW4gaWZyYW1lIGludG8gdGhlIGRvY3VtZW50XHJcbiAqICAvLyBvbmNlIHRoZSBpZnJhbWUncyBkb2N1bWVudCBoYXMgZmluaXNoZWQgbG9hZGluZyB0aGUgb25sb2FkIGhhbmRsZXIgd2lsbCBiZVxyXG4gKiAgLy8gY2FsbGVkLiBJZiB0aGUgZG9jdW1lbnQgYW5kIHRoZSBpZnJhbWUgYXJlIG9uIHRoZSBzYW1lIGRvbWFpbiwgc2NyaXB0cyBvblxyXG4gKiAgLy8gdGhlIGZyYW1lIGFuZCB0aGUgcGFyZW50IGRvY3VtZW50IHdpbGwgYmUgYWJsZSB0byBjb21tdWluY2F0ZSB3aXRoIGVhY2hcclxuICogIC8vIG90aGVyLlxyXG4gKiAgZnVuY3Rpb24gaWZyYW1lSGFzTG9hZGVkIChtZXNzYWdlKSB7XHJcbiAqICAgICAgY29uc29sZS5sb2cobWVzc2FnZSk7XHJcbiAqICB9XHJcbiAqICBcclxuICogIHZhciBlbCA9IGF0cm9wYS5pbmplY3QuZWxlbWVudCAoXHJcbiAqICAgICAgJ2lmcmFtZScsIGRvY3VtZW50LCBkb2N1bWVudC5ib2R5LFxyXG4gKiAgICAgIHsgJ2lkJzogJ215SWQnLCAnc3JjJyA6ICdodHRwOi8vbG9jYWxob3N0JyB9LFxyXG4gKiAgICAgIGZ1bmN0aW9uICgpIHtcclxuICogICAgICAgICAgaWZyYW1lSGFzTG9hZGVkKCdoZXkgbG9vayBhdCB0aGF0LCB0aGUgZnJhbWUgaXMgcmVhZHkhJyk7XHJcbiAqICAgICAgICAgIC8vIHdoYXQgY291bGQgSSBkbyB3aXRoIHRoZSBmcmFtZT8gYW55dGhpbmcgSSB3YW50IVxyXG4gKiAgICAgIH0sXHJcbiAqICAgICAgbnVsbFxyXG4gKiAgKTtcclxuICovXHJcbmF0cm9wYS5pbmplY3QuZWxlbWVudCA9IGZ1bmN0aW9uIChcclxuICAgIGVsZW1lbnRUeXBlLCBkb2NyZWYsIHBhcmVudE5vZCwgYXR0cmlidXRlcywgb25sb2FkSGFuZGxlciwgY2FsbGJhY2tcclxuKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIGF0cm9wYS5zdXBwb3J0Q2hlY2soJ2luamVjdCcpO1xyXG4gICAgXHJcbiAgICB2YXIgZWwsXHJcbiAgICB4O1xyXG4gICAgZG9jcmVmID0gYXRyb3BhLnNldEFzT3B0aW9uYWxBcmcoZG9jdW1lbnQsIGRvY3JlZik7XHJcbiAgICBwYXJlbnROb2QgPSBhdHJvcGEuc2V0QXNPcHRpb25hbEFyZyhkb2NyZWYuYm9keSwgcGFyZW50Tm9kKTtcclxuICAgIGF0dHJpYnV0ZXMgPSBhdHJvcGEuc2V0QXNPcHRpb25hbEFyZyh7fSwgYXR0cmlidXRlcyk7XHJcbiAgICBvbmxvYWRIYW5kbGVyID0gYXRyb3BhLnNldEFzT3B0aW9uYWxBcmcoYXRyb3BhLm5vcCwgb25sb2FkSGFuZGxlcik7XHJcbiAgICBjYWxsYmFjayA9IGF0cm9wYS5zZXRBc09wdGlvbmFsQXJnKGF0cm9wYS5ub3AsIGNhbGxiYWNrKTtcclxuICAgIFxyXG4gICAgZWwgPSBkb2NyZWYuY3JlYXRlRWxlbWVudChlbGVtZW50VHlwZSk7XHJcbiAgICBmb3IgKHggaW4gYXR0cmlidXRlcykge1xyXG4gICAgICAgIGlmIChhdHRyaWJ1dGVzLmhhc093blByb3BlcnR5KHgpKSB7XHJcbiAgICAgICAgICAgIGVsLnNldEF0dHJpYnV0ZSh4LCBhdHRyaWJ1dGVzW3hdKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgb25sb2FkSGFuZGxlciwgdHJ1ZSk7XHJcbiAgICBjYWxsYmFjayhlbCk7XHJcbiAgICBwYXJlbnROb2QuYXBwZW5kQ2hpbGQoZWwpO1xyXG4gICAgcmV0dXJuIGVsO1xyXG59O1xyXG4vKipcclxuICogSGlkZGVuIElmcmFtZSBJbmplY3Rvci5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwMzA4XHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBpZCBUaGUgaWQgb2YgdGhlIGVsZW1lbnQgdG8gYmUgaW5qZWN0ZWQuXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBzcmNVcmwgVGhlIFVSTCB0byBsb2FkIGluIHRoZSBpZnJhbWUuXHJcbiAqIEBwYXJhbSB7SFRNTCBET00gRG9jdW1lbnR9IGRvY3JlZiBPcHRpb25hbC4gUmVmZXJlbmNlIHRvIHRoZSBkb2N1bWVudCB0b1xyXG4gKiAgaW5qZWN0IHRoZSBpZnJhbWUgaW4uIERlZmF1bHRzIHRvIGRvY3VtZW50LlxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvbmxvYWRIYW5kbGVyIE9wdGlvbmFsLiBUaGUgb25sb2FkIGhhbmRsZXIgZm9yIHRoZSBpZnJhbWUuXHJcbiAqIEBwYXJhbSB7RE9NIE5vZGV9IHBhcmVudE5vZCBPcHRpb25hbC4gUmVmZXJlbmN0IHRvIHRoZSBwYXJlbnQgbm9kZSB0b1xyXG4gKiAgYXBwZW5kIHRoZSBpZnJhbWUgdG8uIERlZmF1bHRzIHRvIGRvY3JlZi5ib2R5XHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIE9wdGlvbmFsLiBDYWxsYmFjayBmdW5jdGlvbiBmb3IgcHJlcHJvY2Vzc2luZ1xyXG4gKiAgdGhlIGlmcmFtZSBwcmlvciB0byBpbmplY3Rpb24uIENhbGxlZCB3aXRoIGEgcmVmZXJlbmNlIHRvIHRoZSBpZnJhbWUuXHJcbiAqIEByZXR1cm4ge0hUTUwgRWxlbWVudH0gUmV0dXJucyBhIHJlZmVyZW5jZSB0byB0aGUgSFRNTCBFbGVtZW50IGNyZWF0ZWQgYW5kXHJcbiAqICBpbmplY3RlZC5cclxuICogQHNlZSBhdHJvcGEuaW5qZWN0LmVsZW1lbnRcclxuICogQHNlZSA8YSBocmVmPVwiaHR0cDovL3d3dy53My5vcmcvU2VjdXJpdHkvd2lraS9TYW1lX09yaWdpbl9Qb2xpY3lcIj5cclxuICogaHR0cDovL3d3dy53My5vcmcvU2VjdXJpdHkvd2lraS9TYW1lX09yaWdpbl9Qb2xpY3k8L2E+XHJcbiAqIEBleGFtcGxlXHJcbiAqICBlbCA9IGF0cm9wYS5pbmplY3QuaGlkZGVuRnJhbWUoXHJcbiAqICAgICAgJ2luamVjdEhpZGRlbkZyYW1lMycsXHJcbiAqICAgICAgJ2h0dHA6Ly9sb2NhbGhvc3QvJyxcclxuICogICAgICBudWxsLFxyXG4gKiAgICAgIGZ1bmN0aW9uICgpIHtcclxuICogICAgICAgICAgY29uc29sZS5sb2coJ2hleSBsb29rIGF0IHRoYXQsIHRoZSBmcmFtZSBpcyByZWFkeSEnKTtcclxuICogICAgICB9LFxyXG4gKiAgICAgIG51bGwsXHJcbiAqICAgICAgbnVsbFxyXG4gKiAgKTtcclxuICovXHJcbmF0cm9wYS5pbmplY3QuaGlkZGVuRnJhbWUgPSBmdW5jdGlvbiAoXHJcbiAgICBpZCwgc3JjVVJMLCBkb2NyZWYsIG9ubG9hZEhhbmRsZXIsIHBhcmVudE5vZCwgY2FsbGJhY2tcclxuKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIGF0cm9wYS5zdXBwb3J0Q2hlY2soJ2luamVjdCcpO1xyXG4gICAgXHJcbiAgICByZXR1cm4gYXRyb3BhLmluamVjdC5lbGVtZW50KFxyXG4gICAgICAgICdpZnJhbWUnLFxyXG4gICAgICAgIGRvY3JlZixcclxuICAgICAgICBwYXJlbnROb2QsXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBcImlkXCIgOiBpZCxcclxuICAgICAgICAgICAgXCJzcmNcIiA6IHNyY1VSTCxcclxuICAgICAgICAgICAgXCJ3aWR0aFwiIDogXCIwcHhcIixcclxuICAgICAgICAgICAgXCJoZWlnaHRcIiA6IFwiMHB4XCIsXHJcbiAgICAgICAgICAgIFwiYm9yZGVyXCIgOiBcIjBweFwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBvbmxvYWRIYW5kbGVyLFxyXG4gICAgICAgIGNhbGxiYWNrXHJcbiAgICApO1xyXG59O1xyXG4vKipcclxuICogU2NyaXB0IEluamVjdG9yLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMjA5MDlcclxuICogQHBhcmFtIHtTdHJpbmd9IGlkIFRoZSBpZCBvZiB0aGUgZWxlbWVudCB0byBiZSBpbmplY3RlZC5cclxuICogQHBhcmFtIHtTdHJpbmd9IHNyY1VybCBUaGUgVVJMIHdoZXJlIHRoZSBzY3JpcHQgaXMgbG9jYXRlZC5cclxuICogQHBhcmFtIHtIVE1MIERPTSBEb2N1bWVudH0gZG9jcmVmIE9wdGlvbmFsLiBUaGUgZG9jdW1lbnQgdG8gaW5qZWN0IHRoZVxyXG4gKiAgc2NyaXB0IGludG8uIERlZmF1bHRzIHRvIGRvY3VtZW50LlxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBPcHRpb25hbC4gQSBmdW5jdGlvbiB0byBleGVjdXRlIG9uY2UgdGhlIHNjcmlwdFxyXG4gKiAgaGFzIGxvYWRlZC4gRGVmYXVsdHMgdG8gZnVuY3Rpb24gKCkge307XHJcbiAqIEByZXR1cm4ge0hUTUwgRWxlbWVudH0gUmV0dXJucyBhIHJlZmVyZW5jZSB0byB0aGUgSFRNTCBFbGVtZW50IGNyZWF0ZWQgYW5kXHJcbiAqICBpbmplY3RlZC5cclxuICogQHNlZSBhdHJvcGEuaW5qZWN0LmVsZW1lbnRcclxuICogQHNlZSA8YSBocmVmPVwiaHR0cDovL3d3dy53My5vcmcvU2VjdXJpdHkvd2lraS9TYW1lX09yaWdpbl9Qb2xpY3lcIj5cclxuICogaHR0cDovL3d3dy53My5vcmcvU2VjdXJpdHkvd2lraS9TYW1lX09yaWdpbl9Qb2xpY3k8L2E+XHJcbiAqIEBleGFtcGxlXHJcbiAqICAvLyBHaXZlbiBhIHNjcmlwdCBcImR1bW15LmpzXCIgbG9jYXRlZCBhdCBcImh0dHA6Ly9sb2NhbGhvc3QvZHVtbXkuanNcIlxyXG4gKiAgLy8geW91IGNhbiBmZXRjaCB0aGUgc2NyaXB0IGFuZCBleGVjdXRlIGZ1bmN0aW9ucyBmcm9tIHdpdGhpbiBpdFxyXG4gKiAgLy8gYXMgc29vbiBhcyBpdCBoYXMgbG9hZGVkIGludG8gdGhlIHBhZ2UuXHJcbiAqICBcclxuICogIC8vIGNvbnRlbnRzIG9mIFwiZHVtbXkuanNcIlxyXG4gKiAgZnVuY3Rpb24gZHVtbXkoKSB7XHJcbiAqICAgICAgcmV0dXJuICdkdW1teSc7XHJcbiAqICB9XHJcbiAqICBcclxuICogIC8vIGluamVjdGluZyBcImR1bW15LmpzXCIgaW50byBhbnkgcGFnZS4gVGhlIHNjcmlwdCB0YWcgaXNuJ3QgcmVzdHJpY3RlZCBieVxyXG4gKiAgLy8gdGhlIHNhbWUgb3JpZ2luIHBvbGljeS4gSG9zdCB5b3VyIHNjcmlwdCBhbnl3aGVyZSBhbmQgaW5qZWN0IGl0IHRvIGFueVxyXG4gKiAgLy8gcGFnZSBvbiB0aGUgbmV0IHRoYXQgeW91IHdhbnQgdG8uXHJcbiAqICBlbCA9IGF0cm9wYS5pbmplY3Quc2NyaXB0KFxyXG4gKiAgICAgICdpbmplY3RTY3JpcHQnLFxyXG4gKiAgICAgICdodHRwOi8vbG9jYWxob3N0LycsXHJcbiAqICAgICAgZG9jdW1lbnQsXHJcbiAqICAgICAgZnVuY3Rpb24gKCkge1xyXG4gKiAgICAgICAgICBjb25zb2xlLmxvZyhkdW1teSgpKTtcclxuICogICAgICB9XHJcbiAqICApO1xyXG4gKiAgLy8geW91IG1heSBhbHNvIGxvYWQgc2NyaXB0cyBpbnRvIGlmcmFtZXMgYnkgcmVwbGFjaW5nIHRoZSB0aGlyZCBwYXJhbWV0ZXJcclxuICogIC8vIHdpdGggYSByZWZlcmVuY2UgdG8gdGhlIGlmcmFtZSdzIGRvY3VtZW50IG9iamVjdC5cclxuICovXHJcbmF0cm9wYS5pbmplY3Quc2NyaXB0ID0gZnVuY3Rpb24gKGlkLCBzcmNVUkwsIGRvY3JlZiwgY2FsbGJhY2spIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgYXRyb3BhLnN1cHBvcnRDaGVjaygnaW5qZWN0Jyk7XHJcbiAgICBcclxuICAgIHZhciBhdHRyaWJ1dGVzLFxyXG4gICAgZWxlbWVudFR5cGUsXHJcbiAgICBwYXJlbnROb2QgPSBudWxsLFxyXG4gICAgb25sb2FkSGFuZGxlcixcclxuICAgIGVsO1xyXG4gICAgYXR0cmlidXRlcyA9IHtcclxuICAgICAgICBcImlkXCIgOiBpZCxcclxuICAgICAgICBcInR5cGVcIiA6IFwidGV4dC9qYXZhc2NyaXB0XCIsXHJcbiAgICAgICAgXCJzcmNcIiA6IHNyY1VSTFxyXG4gICAgfTtcclxuICAgIGVsZW1lbnRUeXBlID0gJ3NjcmlwdCc7XHJcbiAgICBvbmxvYWRIYW5kbGVyID0gY2FsbGJhY2s7XHJcbiAgICBlbCA9IGF0cm9wYS5pbmplY3QuZWxlbWVudChcclxuICAgICAgICBlbGVtZW50VHlwZSwgZG9jcmVmLCBwYXJlbnROb2QsIGF0dHJpYnV0ZXMsIG9ubG9hZEhhbmRsZXIpO1xyXG4gICAgcmV0dXJuIGVsO1xyXG59O1xyXG5cclxuXHJcblxyXG5cclxud2hpbGUoYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLmxlbmd0aCA+IDApIHtcclxuICAgIGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5wb3AoKSgpO1xyXG59XHJcbm1vZHVsZS5leHBvcnRzID0gYXRyb3BhO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vZG9jcy92c2RvYy9PcGVuTGF5ZXJzQWxsLmpzXCIvPlxyXG52YXIgYXRyb3BhID0gcmVxdWlyZSgnYXRyb3BhLWhlYWRlcicpO1xyXG4vKmpzbGludFxyXG4gICAgaW5kZW50OiA0LFxyXG4gICAgbWF4ZXJyOiA1MCxcclxuICAgIHdoaXRlOiB0cnVlLFxyXG4gICAgYnJvd3NlcjogdHJ1ZSxcclxuICAgIGRldmVsOiB0cnVlLFxyXG4gICAgcGx1c3BsdXM6IHRydWUsXHJcbiAgICByZWdleHA6IHRydWVcclxuKi9cclxuLypnbG9iYWwgYXRyb3BhICovXHJcbi8vIGVuZCBoZWFkZXJcclxuXHJcbi8qKlxyXG4gKiBDb250YWluZXIgZm9yIGZ1bmN0aW9ucyB0aGF0IHRlc3QgdGhlIHN0YXRlIG9mIGlucHV0cy5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTIwOTA5XHJcbiAqIEBuYW1lc3BhY2UgQ29udGFpbmVyIGZvciBmdW5jdGlvbnMgdGhhdCB0ZXN0IHRoZSBzdGF0ZSBvZiBpbnB1dHMuXHJcbiAqL1xyXG5hdHJvcGEuaW5xdWlyZSA9IHt9O1xyXG4vKipcclxuICogQ2hlY2tzIHdoZXRoZXIgdGhlIGlucHV0IGlzIG51bGwuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEyMDkwOVxyXG4gKiBAcGFyYW0ge01peGVkfSB4IEFueSBpbnB1dCB0aGF0IG1heSBvciBtYXkgbm90IGJlIG51bGwuXHJcbiAqIEByZXR1cm5zIHtCb29sZWFufSBSZXR1cm5zIHRydWUgaWYgeCA9PT0gbnVsbC5cclxuICovXHJcbmF0cm9wYS5pbnF1aXJlLmlzTnVsbCA9IGZ1bmN0aW9uICh4KSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHJldHVybiAoeCA9PT0gbnVsbCk7XHJcbn07XHJcbi8qKlxyXG4gKiBDaGVja3Mgd2hldGhlciB0aGUgaW5wdXQgaXMgYW4gb2JqZWN0LlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMjA5MDlcclxuICogQHBhcmFtIHtNaXhlZH0geCBBbnkgaW5wdXQgdGhhdCBtYXkgb3IgbWF5IG5vdCBiZSBhbiBvYmplY3QuXHJcbiAqIEByZXR1cm5zIHtCb29sZWFufSBSZXR1cm5zIHRydWUgaWYgdHlwZW9mKHgpID09PSAnb2JqZWN0Jy5cclxuICovXHJcbmF0cm9wYS5pbnF1aXJlLmlzT2JqZWN0ID0gZnVuY3Rpb24gKHgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgcmV0dXJuICh0eXBlb2YgeCA9PT0gJ29iamVjdCcpO1xyXG59O1xyXG4vKipcclxuICogQ2hlY2tzIHdoZXRoZXIgdGhlIGlucHV0IGlzIGJvdGggYW4gb2JqZWN0IGFuZCBub3QgbnVsbC5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTIwOTA5XHJcbiAqIEBwYXJhbSB7TWl4ZWR9IHggQW55IGlucHV0IHRoYXQgbWF5IG9yIG1heSBub3QgYmUgYm90aCBhblxyXG4gKiBvYmplY3QgYW5kIG51bGwuXHJcbiAqIEByZXR1cm5zIHtCb29sZWFufSBSZXR1cm5zIHRydWUgaWYgeCBpcyBib3RoIGFuIG9iamVjdCBhbmRcclxuICogbm90IG51bGwuIChudWxsIGlzIGFuIG9iamVjdCkuXHJcbiAqL1xyXG5hdHJvcGEuaW5xdWlyZS5pc09iamVjdE5vdE51bGwgPSBmdW5jdGlvbiAoeCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICByZXR1cm4gYXRyb3BhLmlucXVpcmUuaXNPYmplY3QoeCkgJiYgKCFhdHJvcGEuaW5xdWlyZS5pc051bGwoeCkpO1xyXG59O1xyXG4vKipcclxuICogQ2hlY2tzIGFuIG9iamVjdCBmb3IgdGhlIGV4aXN0ZW5jZSBvZiBhIHByb3BlcnR5XHJcbiAqIHJlZ2FyZGxlc3Mgb2Ygd2hldGhlciB0aGUgcHJvcGVydHkgd2FzIGluaGVyaXRlZFxyXG4gKiBvciBub3QuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEyMDkwOVxyXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIEFuIG9iamVjdCB3aGljaCBtYXkgb3IgbWF5IG5vdFxyXG4gKiBoYXZlIHRoZSBwcm9wZXJ0eSBpZGVudGlmaWVkIGJ5IHByb3AuXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBwcm9wIEEgc3RyaW5nIHZhbHVlIHJlcHJlc2VudGluZyB0aGVcclxuICogbmFtZSBvZiB0aGUgcHJvcGVydHkuXHJcbiAqIEByZXR1cm5zIHtCb29sZWFufSBSZXR1cm5zIHRydWUgaWYgb2JqLnByb3AgZXhpc3RzLFxyXG4gKiBvdGhlcndpc2UgcmV0dXJucyBmYWxzZS5cclxuICovXHJcbmF0cm9wYS5pbnF1aXJlLmhhc1Byb3BlcnR5ID0gZnVuY3Rpb24gKG9iaiwgcHJvcCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICBpZiAoYXRyb3BhLmlucXVpcmUuaXNPYmplY3ROb3ROdWxsKG9iaikpIHtcclxuICAgICAgICByZXR1cm4gKHByb3AgaW4gb2JqKTtcclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxufTtcclxuLyoqXHJcbiAqIENoZWNrcyB3aGV0aGVyIHRoZSBpbnB1dCBpcyBhbiBlbXB0eSBzdHJpbmcuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDExOFxyXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyIFRoZSBzdHJpbmcgeW91IHdhbnQgdG8ga25vdyBhYm91dFxyXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIHN0ciBpcyBhbiBlbXB0eSBzdHJpbmcsXHJcbiAqICBvdGhlcndpc2UgcmV0dXJucyBmYWxzZS5cclxuICovXHJcbmF0cm9wYS5pbnF1aXJlLmlzRW1wdHlTdHJpbmcgPSBmdW5jdGlvbiAoc3RyKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHZhciBvdXQgPSBmYWxzZTtcclxuICAgIGlmICgnJyA9PT0gc3RyKSB7XHJcbiAgICAgICAgb3V0ID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiBvdXQ7XHJcbn07XHJcblxyXG5cclxuXHJcblxyXG53aGlsZShhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMubGVuZ3RoID4gMCkge1xyXG4gICAgYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLnBvcCgpKCk7XHJcbn1cclxubW9kdWxlLmV4cG9ydHMgPSBhdHJvcGE7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9kb2NzL3ZzZG9jL09wZW5MYXllcnNBbGwuanNcIi8+XHJcbnZhciBhdHJvcGEgPSByZXF1aXJlKCdhdHJvcGEtaGVhZGVyJyk7XHJcbi8qanNsaW50XHJcbiAgICBpbmRlbnQ6IDQsXHJcbiAgICBtYXhlcnI6IDUwLFxyXG4gICAgd2hpdGU6IHRydWUsXHJcbiAgICBicm93c2VyOiB0cnVlLFxyXG4gICAgZGV2ZWw6IHRydWUsXHJcbiAgICBwbHVzcGx1czogdHJ1ZSxcclxuICAgIHJlZ2V4cDogdHJ1ZVxyXG4qL1xyXG4vKmdsb2JhbCBhdHJvcGEsIFhQYXRoUmVzdWx0ICovXHJcbi8vIGVuZCBoZWFkZXJcclxuXHJcbi8qKlxyXG4gKiBVdGlsaXRpZXMgZm9yIGhhbmRsaW5nIG9iamVjdHMuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDEyMVxyXG4gKiBAbmFtZXNwYWNlIFV0aWxpdGllcyBmb3IgaGFuZGxpbmcgb2JqZWN0cy5cclxuICovXHJcbmF0cm9wYS5vYmplY3RzID0ge307XHJcbi8qKlxyXG4gKiBDb252ZXJ0cyBhbiBvYmplY3QgaW50byBhbiBhcnJheSBvZiBhcnJheXMgdG8gbWFrZSBpdCBwb3NzaWJsZSB0byBzb3J0IGFuZFxyXG4gKiAgZW51bWVyYXRlIHByb3BlcnRpZXMgcmVsaWFibHkuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDEyMFxyXG4gKiBAbWV0aG9kT2YgYXRyb3BhLm9iamVjdHMuXHJcbiAqIEBleGFtcGxlXHJcbiAqICB2YXIgeCA9IHtcclxuICogICAgICBcInN0dWZmaW5nXCIgOiBcImNvdHRvblwiLFxyXG4gKiAgICAgIFwibm9zZVwiIDogXCJidXR0b25cIixcclxuICogICAgICBcIm5hbWVcIiA6IFwiYmVhclwiXHJcbiAqICB9O1xyXG4gKiAgY29uc29sZS5sb2coIGF0cm9wYS5vYmplY3RzLmNvbnZlcnRPYmplY3RUb0FycmF5KHgpICk7XHJcbiAqICAvLyBsb2dzIFtbXCJzdHVmZmluZ1wiLCBcImNvdHRvblwiXSwgW1wibm9zZVwiLCBcImJ1dHRvblwiXSwgW1wibmFtZVwiLCBcImJlYXJcIl1dXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogQW4gb2JqZWN0LlxyXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYW4gYXJyYXkgb2YgYXJyYXlzIHdoZXJlIGVhY2hcclxuICogIG5lc3RlZCBhcnJheSB3aWxsIGhhdmUgdGhlIG9iamVjdCdzIGtleSBzdG9yZWQgaW4gZWxlbWVudCAwIGFuZFxyXG4gKiAgdGhlIHZhbHVlIHN0b3JlZCBpbiBlbGVtZW50IDEuIFRoZSByZWFzb24gYW4gYXJyYXkgb2YgYXJyYXlzIGlzXHJcbiAqICByZXR1cm5lZCBpcyBiZWNhdXNlIEphdmFTY3JpcHQgZG9lcyBub3QgZ3VhcmFudGVlIHRoZSBvcmRlciBvZlxyXG4gKiAgcHJvcGVydGllcyBvbiBhbiBvYmplY3Qgc28gdGhlcmUgaXMgbm8gcmVsaXpibGUgd2F5IHRvIHNvcnRcclxuICogIGFuIG9iamVjdHMga2V5cyBvciB2YWx1ZXMuXHJcbiAqIEBzZWUgXCJUaGUgbWVjaGFuaWNzIGFuZCBvcmRlciBvZiBlbnVtZXJhdGluZyB0aGUgcHJvcGVydGllcyBbb2YgYW4gb2JqZWN0XVxyXG4gKiAgaXMgbm90IHNwZWNpZmllZC5cIiBcclxuICogIDxhIGhyZWY9XCJodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNS4xLyNzZWMtMTIuNi40XCI+XHJcbiAqICBodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNS4xLyNzZWMtMTIuNi40PC9hPlxyXG4gKi9cclxuYXRyb3BhLm9iamVjdHMuY29udmVydE9iamVjdFRvQXJyYXkgPSBmdW5jdGlvbiBjb252ZXJ0T2JqZWN0VG9BcnJheShvYmopIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgdmFyIHByb3AsIG91dCA9IFtdO1xyXG4gICAgZm9yIChwcm9wIGluIG9iaikge1xyXG4gICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkocHJvcCkpIHtcclxuICAgICAgICAgICAgb3V0LnB1c2goW3Byb3AsIG9ialtwcm9wXV0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBvdXQ7XHJcbn07XHJcbi8qKlxyXG4gKiBDb252ZXJ0cyBhbiBvYmplY3QgaW50byBhbiBhcnJheSBvZiBhcnJheXMgYW5kIGFsbG93cyBmb3IgcmVsaWFibGUgc29ydGluZ1xyXG4gKiAgYW5kIGVudW1lcmF0aW9uLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzAxMjBcclxuICogQGV4YW1wbGVcclxuICogIHZhciB3b3Jkc0NvdW50ZWQsIHNvcnRlZEJ5VmFsdWVzLCBzb3J0ZWRCeVByb3BlcnRpZXM7XHJcbiAqICB3b3Jkc0NvdW50ZWQgPSB7XHJcbiAqICAgICAgXCJkb2N1bWVudDNcIiA6IDE1MCxcclxuICogICAgICBcImRvY3VtZW50MVwiIDogMzAwLFxyXG4gKiAgICAgIFwiZG9jdW1lbnQyXCIgOiAyNVxyXG4gKiAgfTtcclxuICogIC8vIHNvcnRpbmcgYnkgcHJvcGVydHkgdmFsdWUgYXMgbnVtYmVyc1xyXG4gKiAgZnVuY3Rpb24gdmFsU29ydChhLCBiKSB7XHJcbiAqICAgICAgcmV0dXJuIGFbMV0gLSBiWzFdO1xyXG4gKiAgfVxyXG4gKiAgLy8gc29ydGluZyBieSBwcm9wZXJ0eSBuYW1lcyBhcyBzdHJpbmdzXHJcbiAqICBmdW5jdGlvbiBwcm9wU29ydChhLCBiKSB7XHJcbiAqICAgICAgcmV0dXJuIGFbMF0ubG9jYWxlQ29tcGFyZShiWzBdKTtcclxuICogIH1cclxuICogIHNvcnRlZEJ5VmFsdWVzID0gYXRyb3BhLm9iamVjdHMuc29ydCh3b3Jkc0NvdW50ZWQsIHZhbFNvcnQpO1xyXG4gKiAgc29ydGVkQnlQcm9wZXJ0aWVzID0gYXRyb3BhLm9iamVjdHMuc29ydCh3b3Jkc0NvdW50ZWQsIHByb3BTb3J0KTtcclxuICogIGNvbnNvbGUubG9nKCdzb3J0ZWQgYnkgdmFsdWU6ICcsIHNvcnRlZEJ5VmFsdWVzKTtcclxuICogIGNvbnNvbGUubG9nKCdzb3J0ZWQgYnkgcHJvcGVydGllczogJywgc29ydGVkQnlQcm9wZXJ0aWVzKTtcclxuICogIFxyXG4gKiAgLy8gbG9nczpcclxuICogIC8vIHNvcnRlZCBieSB2YWx1ZTogW1xyXG4gKiAgLy8gICAgIFtcImRvY3VtZW50MlwiLCAyNV0sXHJcbiAqICAvLyAgICAgW1wiZG9jdW1lbnQzXCIsIDE1MF0sXHJcbiAqICAvLyAgICAgW1wiZG9jdW1lbnQxXCIsIDMwMF1cclxuICogIC8vIF1cclxuICogIC8vIHNvcnRlZCBieSBwcm9wZXJ0aWVzOiBbXHJcbiAqICAvLyAgICAgW1wiZG9jdW1lbnQxXCIsIDMwMF0sXHJcbiAqICAvLyAgICAgW1wiZG9jdW1lbnQyXCIsIDI1XSxcclxuICogIC8vICAgICBbXCJkb2N1bWVudDNcIiwgMTUwXVxyXG4gKiAgLy8gXVxyXG4gKiBAZXhhbXBsZVxyXG4gKiAgTGV4aWNvZ3JhcGhpYyBzb3J0aW5nOlxyXG4gKiAgVGhpcyAgICBbMSwgMiwgMTAsICdBJywgJ2EnLCdaJywgJ3onXVxyXG4gKiAgYmVjb21lcyBbMSwgMTAsIDIsIFwiQVwiLCBcIlpcIiwgXCJhXCIsIFwielwiXVxyXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIEFuIG9iamVjdC5cclxuICogQHBhcmFtIHtGdW5jdGlvbn0gc29ydEZuIE9wdGlvbmFsLiBUaGUgc29ydGluZyBmdW5jdGlvbi4gVGhpcyBmdW5jdGlvbiB3aWxsXHJcbiAqICBiZSBnaXZlbiB0d28gYXJndW1lbnRzLiBDb21wYXJlIHRoZSB0d28gYXJndW1lbnRzIGFuZCByZXR1cm46XHJcbiAqICAwIGlmIHRoZXkgYXJlIGVxdWFsLCBncmVhdGVyIHRoYW4gemVybyBpZiB0aGUgZmlyc3QgYXJndW1lbnRcclxuICogIGlzIGdyZWF0ZXIgdGhhbiB0aGUgc2Vjb25kLCBvciBsZXNzIHRoYW4gemVybyBpZiB0aGUgc2Vjb25kXHJcbiAqICBhcmd1bWVudCBpcyBncmVhdGVyIHRoYW4gdGhlIGZpcnN0LiBJZiB0aGUgc29ydGluZyBmdW5jdGlvblxyXG4gKiAgaXMgbm90IGdpdmVuLCB0aGUgYXJyYXkgd2lsbCBiZSBzb3J0ZWQgbGV4b2dyYXBoaWNhbGx5IGJ5XHJcbiAqICBlYWNoIGVsZW1lbnRzIDxjb2RlPnRvU3RyaW5nPC9jb2RlPiB2YWx1ZS5cclxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGFuIGFycmF5IG9mIGFycmF5cyB3aGVyZSBlYWNoXHJcbiAqICBuZXN0ZWQgYXJyYXkgd2lsbCBoYXZlIHRoZSBvYmplY3RzIGtleSBzdG9yZWQgaW4gZWxlbWVudCAwIGFuZFxyXG4gKiAgdGhlIHZhbHVlIHN0b3JlZCBpbiBlbGVtZW50IDEuIFRoZSByZWFzb24gYW4gYXJyYXkgb2YgYXJyYXlzIGlzXHJcbiAqICByZXR1cm5lZCBpcyBiZWNhdXNlIEphdmFTY3JpcHQgZG9lcyBub3QgZ3VhcmFudGVlIHRoZSBvcmRlciBvZlxyXG4gKiAgcHJvcGVydGllcyBvbiBhbiBvYmplY3Qgc28gdGhlcmUgaXMgbm8gcmVsaXpibGUgd2F5IHRvIHNvcnRcclxuICogIGFuIG9iamVjdHMga2V5cyBvciB2YWx1ZXMuXHJcbiAqIEBzZWUgYXRyb3BhLm9iamVjdHMuY29udmVydE9iamVjdFRvQXJyYXlcclxuICogQHNlZSA8YSBocmVmPVwiaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzUuMS8jc2VjLTE1LjQuNC4xMVwiPlxyXG4gKiAgaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzUuMS8jc2VjLTE1LjQuNC4xMTwvYT5cclxuICogQHNlZSA8YSBocmVmPVwiaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9BcnJheS9zb3J0XCI+XHJcbiAqICBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL0FycmF5L3NvcnQ8L2E+XHJcbiAqL1xyXG5hdHJvcGEub2JqZWN0cy5zb3J0ID0gZnVuY3Rpb24gc29ydChvYmosIHNvcnRGbikge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICByZXR1cm4gYXRyb3BhLm9iamVjdHMuY29udmVydE9iamVjdFRvQXJyYXkob2JqKS5zb3J0KHNvcnRGbik7XHJcbn07XHJcbi8qKlxyXG4gKiBTb3J0cyBhbiBvYmplY3QgYnkgaXRzIHZhbHVlcyB1c2luZyBhIHVzZXIgZGVmaW5lZCBhbGdvcml0aG0uXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDEyMFxyXG4gKiBAZXhhbXBsZVxyXG4gKiAgdmFyIHdvcmRzQ291bnRlZDtcclxuICogIHdvcmRzQ291bnRlZCA9IHtcclxuICogICAgICBcImRvY3VtZW50M1wiIDogMTUwLFxyXG4gKiAgICAgIFwiZG9jdW1lbnQxXCIgOiAzMDAsXHJcbiAqICAgICAgXCJkb2N1bWVudDJcIiA6IDI1XHJcbiAqICB9O1xyXG4gKiAgLy8gc29ydGluZyBieSB2YWx1ZXMgYXMgbnVtYmVyc1xyXG4gKiAgZnVuY3Rpb24gc29ydEZuKGEsIGIpIHtcclxuICogICAgICByZXR1cm4gYSAtIGI7XHJcbiAqICB9XHJcbiAqICBjb25zb2xlLmxvZyggYXRyb3BhLm9iamVjdHMuc29ydFZhbHVlcyh3b3Jkc0NvdW50ZWQsIHNvcnRGbikgKTtcclxuICogIC8vIGxvZ3M6IFtbXCJkb2N1bWVudDJcIiwgMjVdLCBbXCJkb2N1bWVudDNcIiwgMTUwXSwgW1wiZG9jdW1lbnQxXCIsIDMwMF1dXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogQW4gb2JqZWN0LlxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBzb3J0Rm4gVGhlIHNvcnRpbmcgZnVuY3Rpb24uIFRoaXMgZnVuY3Rpb24gd2lsbFxyXG4gKiAgYmUgZ2l2ZW4gdHdvIGFyZ3VtZW50cy4gQ29tcGFyZSB0aGUgdHdvIGFyZ3VtZW50cyBhbmQgcmV0dXJuOlxyXG4gKiAgMCBpZiB0aGV5IGFyZSBlcXVhbCwgZ3JlYXRlciB0aGFuIHplcm8gaWYgdGhlIGZpcnN0IGFyZ3VtZW50XHJcbiAqICBpcyBncmVhdGVyIHRoYW4gdGhlIHNlY29uZCwgb3IgbGVzcyB0aGFuIHplcm8gaWYgdGhlIHNlY29uZFxyXG4gKiAgYXJndW1lbnQgaXMgZ3JlYXRlciB0aGFuIHRoZSBmaXJzdC5cclxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGFuIGFycmF5IG9mIGFycmF5cyB3aGVyZSBlYWNoXHJcbiAqICBuZXN0ZWQgYXJyYXkgd2lsbCBoYXZlIHRoZSBvYmplY3RzIGtleSBzdG9yZWQgaW4gZWxlbWVudCAwIGFuZFxyXG4gKiAgdGhlIHZhbHVlIHN0b3JlZCBpbiBlbGVtZW50IDEuXHJcbiAqIEBzZWUgYXRyb3BhLm9iamVjdHMuc29ydFxyXG4gKi9cclxuYXRyb3BhLm9iamVjdHMuc29ydFZhbHVlcyA9IGZ1bmN0aW9uIHNvcnRWYWx1ZXMob2JqLCBzb3J0Rm4pIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgdmFyIHZhbFNvcnQgPSBmdW5jdGlvbihhLCBiKSB7XHJcbiAgICAgICAgcmV0dXJuIHNvcnRGbihhWzFdLCBiWzFdKTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gYXRyb3BhLm9iamVjdHMuc29ydChvYmosIHZhbFNvcnQpO1xyXG59O1xyXG4vKipcclxuICogU29ydHMgYW4gb2JqZWN0IGJ5IGl0cyBwcm9wZXJ0aWVzIHVzaW5nIGEgdXNlciBkZWZpbmVkIGFsZ29yaXRobS5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwMTIwXHJcbiAqIEBleGFtcGxlXHJcbiAqICB2YXIgd29yZHNDb3VudGVkO1xyXG4gKiAgd29yZHNDb3VudGVkID0ge1xyXG4gKiAgICAgIFwiZG9jdW1lbnQzXCIgOiAxNTAsXHJcbiAqICAgICAgXCJkb2N1bWVudDFcIiA6IDMwMCxcclxuICogICAgICBcImRvY3VtZW50MlwiIDogMjVcclxuICogIH07XHJcbiAqICAvLyBzb3J0aW5nIGJ5IHByb3BlcnR5IG5hbWVzIGFzIHN0cmluZ3NcclxuICogIGZ1bmN0aW9uIHNvcnRGbihhLCBiKSB7XHJcbiAqICAgICAgcmV0dXJuIGEubG9jYWxlQ29tcGFyZShiKTtcclxuICogIH1cclxuICogIGNvbnNvbGUubG9nKCBhdHJvcGEub2JqZWN0cy5zb3J0UHJvcGVydGllcyh3b3Jkc0NvdW50ZWQsIHNvcnRGbikgKTtcclxuICogIC8vIGxvZ3M6IFtbXCJkb2N1bWVudDFcIiwgMzAwXSwgW1wiZG9jdW1lbnQyXCIsIDI1XSwgW1wiZG9jdW1lbnQzXCIsIDE1MF1dXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogQW4gb2JqZWN0LlxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBzb3J0Rm4gVGhlIHNvcnRpbmcgZnVuY3Rpb24uIFRoaXMgZnVuY3Rpb24gd2lsbFxyXG4gKiAgYmUgZ2l2ZW4gdHdvIGFyZ3VtZW50cy4gQ29tcGFyZSB0aGUgdHdvIGFyZ3VtZW50cyBhbmQgcmV0dXJuOlxyXG4gKiAgMCBpZiB0aGV5IGFyZSBlcXVhbCwgZ3JlYXRlciB0aGFuIHplcm8gaWYgdGhlIGZpcnN0IGFyZ3VtZW50XHJcbiAqICBpcyBncmVhdGVyIHRoYW4gdGhlIHNlY29uZCwgb3IgbGVzcyB0aGFuIHplcm8gaWYgdGhlIHNlY29uZFxyXG4gKiAgYXJndW1lbnQgaXMgZ3JlYXRlciB0aGFuIHRoZSBmaXJzdC5cclxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGFuIGFycmF5IG9mIGFycmF5cyB3aGVyZSBlYWNoXHJcbiAqICBuZXN0ZWQgYXJyYXkgd2lsbCBoYXZlIHRoZSBvYmplY3RzIGtleSBzdG9yZWQgaW4gZWxlbWVudCAwIGFuZFxyXG4gKiAgdGhlIHZhbHVlIHN0b3JlZCBpbiBlbGVtZW50IDEuXHJcbiAqIEBzZWUgYXRyb3BhLm9iamVjdHMuc29ydFxyXG4gKi9cclxuYXRyb3BhLm9iamVjdHMuc29ydFByb3BlcnRpZXMgPSBmdW5jdGlvbiBzb3J0VmFsdWVzKG9iaiwgc29ydEZuKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHZhciBwcm9wU29ydCA9IGZ1bmN0aW9uKGEsIGIpIHtcclxuICAgICAgICByZXR1cm4gc29ydEZuKGFbMF0sIGJbMF0pO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBhdHJvcGEub2JqZWN0cy5zb3J0KG9iaiwgcHJvcFNvcnQpO1xyXG59O1xyXG4vKipcclxuICogU29ydHMgYW4gb2JqZWN0IGJ5IGl0cyB2YWx1ZXMgbnVtZXJpY2FsbHkuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDEyMFxyXG4gKiBAZXhhbXBsZVxyXG4gKiAgdmFyIHdvcmRzQ291bnRlZDtcclxuICogIHdvcmRzQ291bnRlZCA9IHtcclxuICogICAgICBcImRvY3VtZW50M1wiIDogMTUwLFxyXG4gKiAgICAgIFwiZG9jdW1lbnQxXCIgOiAzMDAsXHJcbiAqICAgICAgXCJkb2N1bWVudDJcIiA6IDI1XHJcbiAqICB9O1xyXG4gKiAgY29uc29sZS5sb2coIGF0cm9wYS5vYmplY3RzLnNvcnRWYWx1ZXNOdW1lcmljYWxseSh3b3Jkc0NvdW50ZWQpICk7XHJcbiAqICAvLyBsb2dzIFtbXCJkb2N1bWVudDJcIiwgMjVdLCBbXCJkb2N1bWVudDNcIiwgMTUwXSwgW1wiZG9jdW1lbnQxXCIsIDMwMF1dXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogQSBzaW1wbGUgb2JqZWN0IHdoZXJlIHRoZSBwcm9wZXJ0aWVzXHJcbiAqICBhbGwgaGF2ZSBudW1lcmljLWlzaCB2YWx1ZXMuXHJcbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBhbiBhcnJheSBvZiBhcnJheXMgd2hlcmUgZWFjaFxyXG4gKiAgbmVzdGVkIGFycmF5IHdpbGwgaGF2ZSB0aGUgb2JqZWN0cyBrZXkgc3RvcmVkIGluIGVsZW1lbnQgMCBhbmRcclxuICogIHRoZSB2YWx1ZSBzdG9yZWQgaW4gZWxlbWVudCAxLlxyXG4gKiBAc2VlIGF0cm9wYS5vYmplY3RzLnNvcnRcclxuICovXHJcbmF0cm9wYS5vYmplY3RzLnNvcnRWYWx1ZXNOdW1lcmljYWxseSA9IGZ1bmN0aW9uIHNvcnRWYWx1ZXNOdW1lcmljYWxseShvYmopIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgZnVuY3Rpb24gc29ydEZuKGEsIGIpIHtcclxuICAgICAgICByZXR1cm4gKGEgLSBiKTtcclxuICAgIH1cclxuICAgIHJldHVybiBhdHJvcGEub2JqZWN0cy5zb3J0VmFsdWVzKG9iaiwgc29ydEZuKTtcclxufTtcclxuLyoqXHJcbiAqIFRocm93cyBhbiBlcnJvciwgPGNvZGU+U3RyaW5nLnByb3RvdHlwZS5sb2NhbGVDb21wYXJlPC9jb2RlPiBpcyBub3QgXHJcbiAqICBzdGFuZGFyZGl6ZWQuXHJcbiAqIFxyXG4gKiAgWWVzLCBsb2NhbGVDb21wYXJlIGlzIGluIHRoZSBzdGFuZGFyZCBidXQsIGF0IHRoaXMgdGltZSB0aGUgYWN0dWFsXHJcbiAqICBjb21wYXJpc29uIGlzIGltcGxlbWVudGF0aW9uIGRlcGVuZGFudC4gVGhpcyBtZWFucyB0aGF0IFwiYWxwaGFiZXRpY2FsIG9yZGVyXCJcclxuICogIGNhbiBiZSBkaWZmZXJlbnQgb24gZGlmZmVyZW50IHBsYXRmb3Jtcy4gV2hhdCBJIGZvdW5kIHdhcyB0aGF0IGluIG5vZGUgdGhlXHJcbiAqICBhcnJheSBvZiA8Y29kZT5bJ2EnLCdaJywnQScsJ3onXTwvY29kZT4gd291bGQgYmUgc29ydGVkIHRvXHJcbiAqICA8Y29kZT5bJ0EnLCdaJywnYScsJ3pcIl08L2NvZGU+LCB3aGlsZSBvblxyXG4gKiAgZmlyZWZveCBpdCB3b3VsZCBiZSBzb3J0ZWQgdG8gPGNvZGU+WydhJywnQScsJ3onLCdaJ108L2NvZGU+LiBXaG8ga25vd3MgaWZcclxuICogIGFub3RoZXIgaW1wbGVtZW50b3Igd291bGQgc29ydCBpdCA8Y29kZT5bJ0EnLCdhJywnWicsJ3onXTwvY29kZT4/XHJcbiAqIFxyXG4gKiBJbiBvcmRlciB0byBwcm92aWRlIGEgcmVsaWFibGUgaW1wbGVtZW50YXRpb24gSSB3b3VsZCBoYXZlIHRvIGNyZWF0ZSBteSBvd25cclxuICogIGltcGxlbWVudGF0aW9uIG9mIDxjb2RlPlN0cmluZy5wcm90b3R5cGUubG9jYWxlQ29tcGFyZTwvY29kZT4gYW5kIHRoYXQnc1xyXG4gKiAganVzdCB0b28gbXVjaCB3b3JrIGZvciBtZSB0byBkbyBhbG9uZS5cclxuICogQHRocm93cyB7RXJyb3J9IFwiU3RyaW5nLnByb3RvdHlwZS5sb2NhbGVDb21wYXJlIGlzIG5vdCBzdGFuZGFyZGl6ZWRcIlxyXG4gKi9cclxuYXRyb3BhLm9iamVjdHMuc29ydFZhbHVlc0FscGhhYmV0aWNhbGx5ID0gZnVuY3Rpb24gc29ydFZhbHVlc0FscGhhYmV0aWNhbGx5KCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJTdHJpbmcucHJvdG90eXBlLmxvY2FsZUNvbXBhcmUgaXMgbm90IHN0YW5kYXJkaXplZFwiKTtcclxufTtcclxuLyoqXHJcbiAqIFNvcnRzIGFuIG9iamVjdCBieSBpdHMgcHJvcGVydGllcyBudW1lcmljYWxseS5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwMTIwXHJcbiAqIEBleGFtcGxlXHJcbiAqICB2YXIgd29yZHNDb3VudGVkO1xyXG4gKiAgd29yZHNDb3VudGVkID0ge1xyXG4gKiAgICAgIFwiM1wiIDogXCJEb2N1bWVudCBBXCIsXHJcbiAqICAgICAgXCIyXCIgOiBcIkRvY3VtZW50IFpcIixcclxuICogICAgICBcIjFcIiA6IFwiRG9jdW1lbnQgTVwiXHJcbiAqICB9O1xyXG4gKiAgY29uc29sZS5sb2coIGF0cm9wYS5vYmplY3RzLnNvcnRQcm9wZXJ0aWVzTnVtZXJpY2FsbHkod29yZHNDb3VudGVkKSApO1xyXG4gKiAgLy8gbG9nczogW1tcIjFcIiwgXCJEb2N1bWVudCBNXCJdLCBbXCIyXCIsIFwiRG9jdW1lbnQgWlwiXSwgW1wiM1wiLCBcIkRvY3VtZW50IEFcIl1dXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogQSBzaW1wbGUgb2JqZWN0IHdoZXJlIHRoZSBwcm9wZXJ0aWVzXHJcbiAqICBhbGwgaGF2ZSBudW1lcmljLWlzaCB2YWx1ZXMuXHJcbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBhbiBhcnJheSBvZiBhcnJheXMgd2hlcmUgZWFjaFxyXG4gKiAgbmVzdGVkIGFycmF5IHdpbGwgaGF2ZSB0aGUgb2JqZWN0cyBrZXkgc3RvcmVkIGluIGVsZW1lbnQgMCBhbmRcclxuICogIHRoZSB2YWx1ZSBzdG9yZWQgaW4gZWxlbWVudCAxLlxyXG4gKiBAc2VlIGF0cm9wYS5vYmplY3RzLnNvcnRcclxuICovXHJcbmF0cm9wYS5vYmplY3RzLnNvcnRQcm9wZXJ0aWVzTnVtZXJpY2FsbHkgPSBmdW5jdGlvbiBzb3J0UHJvcGVydGllc051bWVyaWNhbGx5KFxyXG4gICAgb2JqXHJcbikge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICBmdW5jdGlvbiBzb3J0Rm4oYSwgYikge1xyXG4gICAgICAgIHJldHVybiAoYSAtIGIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGF0cm9wYS5vYmplY3RzLnNvcnRQcm9wZXJ0aWVzKG9iaiwgc29ydEZuKTtcclxufTtcclxuLyoqXHJcbiAqIFRocm93cyBhbiBlcnJvciwgPGNvZGU+U3RyaW5nLnByb3RvdHlwZS5sb2NhbGVDb21wYXJlPC9jb2RlPiBpcyBub3QgXHJcbiAqICBzdGFuZGFyZGl6ZWQuXHJcbiAqIFxyXG4gKiAgWWVzLCBsb2NhbGVDb21wYXJlIGlzIGluIHRoZSBzdGFuZGFyZCBidXQsIGF0IHRoaXMgdGltZSB0aGUgYWN0dWFsXHJcbiAqICBjb21wYXJpc29uIGlzIGltcGxlbWVudGF0aW9uIGRlcGVuZGFudC4gVGhpcyBtZWFucyB0aGF0IFwiYWxwaGFiZXRpY2FsIG9yZGVyXCJcclxuICogIGNhbiBiZSBkaWZmZXJlbnQgb24gZGlmZmVyZW50IHBsYXRmb3Jtcy4gV2hhdCBJIGZvdW5kIHdhcyB0aGF0IGluIG5vZGUgdGhlXHJcbiAqICBhcnJheSBvZiA8Y29kZT5bJ2EnLCdaJywnQScsJ3onXTwvY29kZT4gd291bGQgYmUgc29ydGVkIHRvXHJcbiAqICA8Y29kZT5bJ0EnLCdaJywnYScsJ3pcIl08L2NvZGU+LCB3aGlsZSBvblxyXG4gKiAgZmlyZWZveCBpdCB3b3VsZCBiZSBzb3J0ZWQgdG8gPGNvZGU+WydhJywnQScsJ3onLCdaJ108L2NvZGU+LiBXaG8ga25vd3MgaWZcclxuICogIGFub3RoZXIgaW1wbGVtZW50b3Igd291bGQgc29ydCBpdCA8Y29kZT5bJ0EnLCdhJywnWicsJ3onXTwvY29kZT4/XHJcbiAqIFxyXG4gKiBJbiBvcmRlciB0byBwcm92aWRlIGEgcmVsaWFibGUgaW1wbGVtZW50YXRpb24gSSB3b3VsZCBoYXZlIHRvIGNyZWF0ZSBteSBvd25cclxuICogIGltcGxlbWVudGF0aW9uIG9mIDxjb2RlPlN0cmluZy5wcm90b3R5cGUubG9jYWxlQ29tcGFyZTwvY29kZT4gYW5kIHRoYXQnc1xyXG4gKiAganVzdCB0b28gbXVjaCB3b3JrIGZvciBtZSB0byBkbyBhbG9uZS5cclxuICogQHRocm93cyB7RXJyb3J9IFwiU3RyaW5nLnByb3RvdHlwZS5sb2NhbGVDb21wYXJlIGlzIG5vdCBzdGFuZGFyZGl6ZWRcIlxyXG4gKi9cclxuYXRyb3BhLm9iamVjdHMuc29ydFByb3BlcnRpZXNBbHBoYWJldGljYWxseSA9IFxyXG5mdW5jdGlvbiBzb3J0UHJvcGVydGllc0FscGhhYmV0aWNhbGx5KG9iaikge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJTdHJpbmcucHJvdG90eXBlLmxvY2FsZUNvbXBhcmUgaXMgbm90IHN0YW5kYXJkaXplZFwiKTtcclxufTtcclxuXHJcblxyXG5cclxuXHJcbndoaWxlKGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5sZW5ndGggPiAwKSB7XHJcbiAgICBhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMucG9wKCkoKTtcclxufVxyXG5tb2R1bGUuZXhwb3J0cyA9IGF0cm9wYTtcclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2RvY3MvdnNkb2MvT3BlbkxheWVyc0FsbC5qc1wiLz5cclxudmFyIGF0cm9wYSA9IHJlcXVpcmUoJ2F0cm9wYS1oZWFkZXInKTtcclxuLypqc2xpbnRcclxuICAgIGluZGVudDogNCxcclxuICAgIG1heGVycjogNTAsXHJcbiAgICB3aGl0ZTogdHJ1ZSxcclxuICAgIGJyb3dzZXI6IHRydWUsXHJcbiAgICBkZXZlbDogdHJ1ZSxcclxuICAgIHBsdXNwbHVzOiB0cnVlLFxyXG4gICAgcmVnZXhwOiB0cnVlXHJcbiovXHJcbi8qZ2xvYmFsIGF0cm9wYSAqL1xyXG4vLyBlbmQgaGVhZGVyXHJcblxyXG4vKipcclxuICogUHJvdmlkZXMgcmFuZG9tIHN0cmluZ3MgYW5kIG51bWJlcnMuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEyMDkwOVxyXG4gKiBAbmFtZXNwYWNlIFByb3ZpZGVzIHJhbmRvbSBzdHJpbmdzIGFuZCBudW1iZXJzLlxyXG4gKi9cclxuYXRyb3BhLnJhbmRvbSA9IHt9O1xyXG4vKipcclxuICogR2l2ZXMgeW91IGEgcmFuZG9tIHN0cmluZyB3aG9zZSBsZW5ndGggYW5kIGNoYXJhY3RlcnMgeW91IHNwZWNpZnkuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEyMDkwOVxyXG4gKiBAcGFyYW0ge051bWJlcn0gc3RyaW5nTGVuZ3RoIFRoaXMgaXMgdGhlIGxlbmd0aCBvZiB0aGUgc3RyaW5nLlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gY2hhcmFjdGVyQ2xhc3MgT3B0aW9uYWwuIE1heSBiZSBvbmUgb2Y6XHJcbiAqICBudW1lcmljLCBjYXBzLCBsb3dlciwgYWxwaGEsIGFscGhhbnVtZXJpYywgcHVuY3R1YXRpb24sIHZvd2VsLCBjb25zb25hbnRcclxuICogIFRoaXMgaXMgdGhlIHR5cGUgb2YgY2hhcmFjdGVycyB5b3Ugd2FudCByZXR1cm5lZCB0byB5b3UuIERlZmF1bHRzIHRvXHJcbiAqICBhbHBoYW51bWVyaWMuXHJcbiAqIEByZXR1cm4ge1N0cmluZ30gQSByYW5kb20gc3RyaW5nIG9mIHNwZWNpZmllZCBsZW5ndGggYW5kIGNvbXBvc2l0aW9uLlxyXG4gKi9cclxuYXRyb3BhLnJhbmRvbS5zdHJpbmcgPSBmdW5jdGlvbiByYW5kb21TdHJpbmcoc3RyaW5nTGVuZ3RoLCBjaGFyYWN0ZXJDbGFzcykge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG4gICAgdmFyIG51bWVyaWMsXHJcbiAgICB2b3dlbCxcclxuICAgIGNvbnNvbmFudCxcclxuICAgIGxvd2VyLFxyXG4gICAgY2FwcyxcclxuICAgIGFscGhhLFxyXG4gICAgYWxwaGFudW1lcmljLFxyXG4gICAgcHVuY3R1YXRpb24sXHJcbiAgICBjaGFycyxcclxuICAgIHN0cmluZ19sZW5ndGgsXHJcbiAgICByYW5kb21zdHJpbmcsXHJcbiAgICBpLFxyXG4gICAgY2hhcmFjdGVyO1xyXG4gICAgXHJcbiAgICBudW1lcmljID0gJzAxMjM0NTY3ODknO1xyXG4gICAgdm93ZWwgPSAnYWVpb3V5JztcclxuICAgIGNvbnNvbmFudCA9ICdiY2RmZ2hqa2xtbnBxcnN0dnd4eic7XHJcbiAgICBsb3dlciA9IHZvd2VsICsgY29uc29uYW50O1xyXG4gICAgY2FwcyA9IGxvd2VyLnRvVXBwZXJDYXNlKCk7XHJcbiAgICBhbHBoYSA9IGNhcHMgKyBsb3dlcjtcclxuICAgIGFscGhhbnVtZXJpYyA9IG51bWVyaWMgKyBjYXBzICsgbG93ZXI7XHJcbiAgICBwdW5jdHVhdGlvbiA9ICcuPyEnO1xyXG4gICAgcmFuZG9tc3RyaW5nID0gJyc7XHJcbiAgICBzd2l0Y2ggKGNoYXJhY3RlckNsYXNzKSB7XHJcbiAgICBjYXNlICdudW1lcmljJzpcclxuICAgICAgICBjaGFycyA9IG51bWVyaWM7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICBjYXNlICdjYXBzJzpcclxuICAgICAgICBjaGFycyA9IGNhcHM7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICBjYXNlICdsb3dlcic6XHJcbiAgICAgICAgY2hhcnMgPSBsb3dlcjtcclxuICAgICAgICBicmVhaztcclxuICAgIGNhc2UgJ2FscGhhJzpcclxuICAgICAgICBjaGFycyA9IGFscGhhO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAnYWxwaGFudW1lcmljJzpcclxuICAgICAgICBjaGFycyA9IGFscGhhbnVtZXJpYztcclxuICAgICAgICBicmVhaztcclxuICAgIGNhc2UgJ3B1bmN0dWF0aW9uJzpcclxuICAgICAgICBjaGFycyA9IHB1bmN0dWF0aW9uO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAndm93ZWwnOlxyXG4gICAgICAgIGNoYXJzID0gdm93ZWw7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICBjYXNlICdjb25zb25hbnQnOlxyXG4gICAgICAgIGNoYXJzID0gY29uc29uYW50O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgZGVmYXVsdDpcclxuICAgICAgICBjaGFycyA9IGFscGhhbnVtZXJpYztcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICAgIGlmIChzdHJpbmdMZW5ndGggPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHN0cmluZ19sZW5ndGggPSA0O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBzdHJpbmdfbGVuZ3RoID0gc3RyaW5nTGVuZ3RoO1xyXG4gICAgfVxyXG4gICAgZm9yIChpID0gMDsgaSA8IHN0cmluZ19sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGNoYXJhY3RlciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGNoYXJzLmxlbmd0aCk7XHJcbiAgICAgICAgcmFuZG9tc3RyaW5nICs9IGNoYXJzW2NoYXJhY3Rlcl07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmFuZG9tc3RyaW5nO1xyXG59O1xyXG4vKipcclxuICogR2VuZXJhdGVzIGEgcmFuZG9tIG51bWJlciBiZXR3ZWVuIHRoZSBzcGVjaWZpZWQgbWluIGFuZCBtYXggdmFsdWUuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEyMDkwOVxyXG4gKiBAcGFyYW0ge051bWJlcn0gbWluIFRoZSBsb3dlc3QgbnVtYmVyIHlvdSB3YW50IHJldHVybmVkXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBtYXggVGhlIGhpZ2hlc3QgbnVtYmVyIHlvdSB3YW50IHJldHVybmVkXHJcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IEEgcmFuZG9tIG51bWJlciB3aXRoaW4gdGhlIHNwZWNpZmllZCByYW5nZS5cclxuICovXHJcbmF0cm9wYS5yYW5kb20uaW50ZWdlciA9IGZ1bmN0aW9uIHJhbmRvbUludGVnZXIobWluLCBtYXgpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkgKyBtaW4pO1xyXG59O1xyXG4vKipcclxuICogR2V0IGEgcmFuZG9tIHByb3BlcnR5IG5hbWUgZnJvbSB0aGUgZ2l2ZW4gb2JqZWN0LlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMjA5MDlcclxuICogQHBhcmFtIHtPYmplY3R9IG9iaiBUaGUgb2JqZWN0IHRvIHNlbGVjdCBhIHJhbmRvbVxyXG4gKiAgcHJvcGVydHkgbmFtZSBmcm9tLlxyXG4gKiBAcmV0dXJuIHtTdHJpbmd9IEEgcmFuZG9tIHByb3BlcnR5IG5hbWUgZnJvbSB0aGVcclxuICogIGdpdmVuIG9iamVjdC5cclxuICovXHJcbmF0cm9wYS5yYW5kb20uZ2V0UHJvcGVydHlOYW1lID0gZnVuY3Rpb24gKG9iaikge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICB2YXIgYXJyO1xyXG4gICAgYXJyID0gT2JqZWN0LmtleXMob2JqKTtcclxuICAgIHJldHVybiBhcnJbYXRyb3BhLnJhbmRvbS5nZXRBcnJheUtleShhcnIpXTtcclxufTtcclxuLyoqXHJcbiAqIEdldCBhIHJhbmRvbSBrZXkgZnJvbSB0aGUgZ2l2ZW4gYXJyYXkuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEyMDkwOVxyXG4gKiBAcGFyYW0ge0FycmF5fSBhcnIgVGhlIGFycmF5IHRvIHNlbGVjdCBhIHJhbmRvbVxyXG4gKiAga2V5IGZyb20uIFRoZSBrZXlzIG9mIHRoZSBhcnJheSBtdXN0IGJlIGNvbnRpZ3VvdXMuXHJcbiAqIEByZXR1cm4ge051bWJlcn0gQSByYW5kb20gaW50ZWdlciBiZXR3ZWVuIDAgYW5kXHJcbiAqICA8Y29kZT5hcnIubGVuZ3RoPC9jb2RlPlxyXG4gKi9cclxuYXRyb3BhLnJhbmRvbS5nZXRBcnJheUtleSA9IGZ1bmN0aW9uIChhcnIpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGFyci5sZW5ndGgpO1xyXG59O1xyXG4vKipcclxuICogR2V0IGEgcmFuZG9tIHZhbHVlIGZyb20gdGhlIGdpdmVuIGFycmF5LlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMjA5MDlcclxuICogQHBhcmFtIHtBcnJheX0gYXJyIFRoZSBhcnJheSB0byBzZWxlY3QgYSByYW5kb21cclxuICogIHZhbHVlIGZyb20uIFRoZSBrZXlzIG9mIHRoZSBhcnJheSBtdXN0IGJlIGNvbnRpZ3VvdXMuXHJcbiAqIEByZXR1cm4ge01peGVkfSBBIHJhbmRvbSB2YWx1ZSBmcm9tIHRoZSBnaXZlbiBhcnJheS5cclxuICovXHJcbmF0cm9wYS5yYW5kb20uZ2V0QXJyYXlWYWx1ZSA9IGZ1bmN0aW9uIChhcnIpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgcmV0dXJuIGFyclthdHJvcGEucmFuZG9tLmdldEFycmF5S2V5KGFycildO1xyXG59O1xyXG4vKipcclxuICogUmVtb3ZlIGEgcmFuZG9tIGVsZW1lbnQgZnJvbSB0aGUgZ2l2ZW4gYXJyYXkuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEyMDkwOVxyXG4gKiBAcGFyYW0ge0FycmF5fSBhcnIgVGhlIGFycmF5IHRvIHJlbW92ZSBhIHJhbmRvbVxyXG4gKiAgZWxlbWVudCBmcm9tLiBUaGUga2V5cyBvZiB0aGUgYXJyYXkgbXVzdCBiZSBjb250aWd1b3VzLlxyXG4gKiBAcmV0dXJuIHtNaXhlZH0gQSByYW5kb20gdmFsdWUgZnJvbSB0aGUgZ2l2ZW4gYXJyYXkuXHJcbiAqL1xyXG5hdHJvcGEucmFuZG9tLnB1bGxBcnJheUVsZW1lbnQgPSBmdW5jdGlvbiAoYXJyKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHZhciBrLFxyXG4gICAgZDtcclxuICAgIGsgPSBhdHJvcGEucmFuZG9tLmdldEFycmF5S2V5KGFycik7XHJcbiAgICBkID0gYXJyW2tdO1xyXG4gICAgYXJyLnNwbGljZShrLCAxKTtcclxuICAgIHJldHVybiBkO1xyXG59O1xyXG4vKipcclxuICogUmVtb3ZlIGEgcmFuZG9tIHByb3BlcnR5IGZyb20gdGhlIGdpdmVuIG9iamVjdC5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTIwOTA5XHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogVGhlIG9iamVjdCB0byByZW1vdmUgYSByYW5kb21cclxuICogIHByb3BlcnR5IGZyb20uXHJcbiAqIEByZXR1cm4ge01peGVkfSBBIHJhbmRvbSB2YWx1ZSBmcm9tIHRoZSBnaXZlbiBvYmplY3QuXHJcbiAqL1xyXG5hdHJvcGEucmFuZG9tLnB1bGxQcm9wZXJ0eSA9IGZ1bmN0aW9uIChvYmopIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgdmFyIHBOYW1lLFxyXG4gICAgb2JqRGF0YTtcclxuICAgIHBOYW1lID0gYXRyb3BhLnJhbmRvbS5nZXRQcm9wZXJ0eU5hbWUob2JqKTtcclxuICAgIG9iakRhdGEgPSBvYmpbcE5hbWVdO1xyXG4gICAgZGVsZXRlIG9ialtwTmFtZV07XHJcbiAgICByZXR1cm4gb2JqRGF0YTtcclxufTtcclxuXHJcblxyXG5cclxuXHJcbndoaWxlKGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5sZW5ndGggPiAwKSB7XHJcbiAgICBhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMucG9wKCkoKTtcclxufVxyXG5tb2R1bGUuZXhwb3J0cyA9IGF0cm9wYTtcclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2RvY3MvdnNkb2MvT3BlbkxheWVyc0FsbC5qc1wiLz5cclxudmFyIGF0cm9wYSA9IHJlcXVpcmUoJ2F0cm9wYS1oZWFkZXInKTtcclxuLypqc2xpbnRcclxuICAgIGluZGVudDogNCxcclxuICAgIG1heGVycjogNTAsXHJcbiAgICB3aGl0ZTogdHJ1ZSxcclxuICAgIGJyb3dzZXI6IHRydWUsXHJcbiAgICBkZXZlbDogdHJ1ZSxcclxuICAgIHBsdXNwbHVzOiB0cnVlLFxyXG4gICAgcmVnZXhwOiB0cnVlXHJcbiovXHJcbi8qZ2xvYmFsIGF0cm9wYSAqL1xyXG4vLyBlbmQgaGVhZGVyXHJcblxyXG4vKipcclxuICogQ29udGFpbmVyIGZvciByZWdleCBmdW5jdGlvbnMuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEyMDkwOVxyXG4gKiBAbmFtZXNwYWNlIENvbnRhaW5lciBmb3IgcmVnZXggZnVuY3Rpb25zLlxyXG4gKi9cclxuYXRyb3BhLnJlZ2V4ID0ge307XHJcbi8qKlxyXG4gKiBSZWdleCBwYXR0ZXJucy5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEBuYW1lc3BhY2UgUmVnZXggcGF0dGVybnMuXHJcbiAqL1xyXG5hdHJvcGEucmVnZXgucGF0dGVybnMgPSB7XHJcbiAgICAvKiogZmluZHMgcmVwZWF0ZWQgd29yZHMgYW5kIHBocmFzZXMgKi9cclxuICAgIHJlcGVhdGVkV29yZHMgOiAvKFxcYi57Myx9XFxiKVxccyooXFwxKS9nLFxyXG4gICAgLyoqIGZpbmRzIHBhcmFncmFwaCBicmVha3MgKi9cclxuICAgIHBhcmFncmFwaEJyZWFrcyA6IC8oXFxyXFxuXFxyXFxufFxcblxcbnxcXHJcXHIpL2csXHJcbiAgICAvKiogZmluZHMgbGluZSBicmVha3MgKi9cclxuICAgIGxpbmVCcmVha3MgOiAvKFxcclxcbnxcXHJ8XFxuKS9nXHJcbn07XHJcbi8qKlxyXG4gKiBBcHBlbmRzIGNvbW1vbiBwcmVmaXgsIHN1ZmZpeCwgYW5kIHdvcmQgYm91bmRhcnkgcmVnZXggc3RyaW5ncyB0b1xyXG4gKiB0aGUgc3VwcGxpZWQgd29yZC5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwMTEwXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSB3b3JkIFRoZSB3b3JkIHRvIGFwcGVuZCBwcmVmaXggYW5kIHN1ZmZpeCB0b1xyXG4gKiBAcGFyYW0ge0ludGVnZXJ9IHRocmVzaG9sZCBUaGUgd29yZC5sZW5ndGggYXQgd2hpY2ggaXQgZG9lcyBub3RcclxuICogbWFrZSBzZW5zZSB0byBhcHBlbmQgcHJlZml4IGFuZCBzdWZmaXguIERlZmF1bHRzIHRvIDMuXHJcbiAqIEByZXR1cm5zIHtTdHJpbmd9IFJldHVybnMgdGhlIHN1cHBsaWVkIHdvcmQgd2l0aCBwcmVmaXgsIHN1ZmZpeCxcclxuICogYW5kIHdvcmQgYm91bmRhcmllcyBhdHRhY2hlZC4gSWYgdGhlIHdvcmQubGVuZ3RoIHdhcyBub3QgZ3JlYXRlclxyXG4gKiB0aGFuIHRoZSB0aHJlc2hvbGQsIG9ubHkgd29yZCBib3VuZGFyaWVzIGFyZSBhdHRhY2hlZC4gVGhlIHN0cmluZ1xyXG4gKiByZXByZXNlbnRzIGEgUmVnRXggd2hpY2ggc2hvdWxkIHBpY2sgb3V0IG1vc3QgZm9ybXMgb2YgcmVndWxhclxyXG4gKiB3b3Jkcy5cclxuICovXHJcbmF0cm9wYS5yZWdleC5hcHBlbmRQcmVmaXhlc0FuZFN1ZmZpeGVzID0gZnVuY3Rpb24gKHdvcmQsIHRocmVzaG9sZCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICB2YXIgcHJlZml4ZXMsXHJcbiAgICBzdWZmaXhlcztcclxuICAgIHByZWZpeGVzID0gJyhwcmV8dW58cmUpPyc7XHJcbiAgICBzdWZmaXhlcyA9ICcoaWZpY2F0aW9ufCcgK1xyXG4gICAgICAgICAgICAgICAgJ3Rpb25hbGx5fCcgK1xyXG4gICAgICAgICAgICAgICAgJ2ljYXRpb258JyArXHJcbiAgICAgICAgICAgICAgICAnaWZpZWR8aXN0aWN8aW5lc3N8JyArXHJcbiAgICAgICAgICAgICAgICAnZmFyZXx0aW9ufGFuY2V8ZW5jZXxsZXNzfGFsbHl8YWJsZXxuZXNzfGl6ZWR8aXNlZHwnICtcclxuICAgICAgICAgICAgICAgICdvdXN8aWZ5fGluZ3xpdHl8ZnVsfGFudHxhdGV8ZXN0fGlzbXxpem18aXN0fCcgK1xyXG4gICAgICAgICAgICAgICAgJ2ljfGFsfGVkfGVyfGV0fGx5fHJzfGlufCcgK1xyXG4gICAgICAgICAgICAgICAgJ3l8c3xyfGQpPyc7XHJcbiAgICBcclxuICAgIHRocmVzaG9sZCA9IHRocmVzaG9sZCA9PT0gdW5kZWZpbmVkID8gMyA6IHRocmVzaG9sZDtcclxuICAgIFxyXG4gICAgaWYgKHdvcmQubGVuZ3RoID4gdGhyZXNob2xkKSB7XHJcbiAgICAgICAgd29yZCA9ICdcXFxcYicgKyBwcmVmaXhlcyArIHdvcmQgKyBzdWZmaXhlcyArICdcXFxcYic7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHdvcmQgPSAnXFxcXGIoKScgKyB3b3JkICsgJygpXFxcXGInO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHdvcmQ7XHJcbn07XHJcblxyXG5cclxuXHJcblxyXG53aGlsZShhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMubGVuZ3RoID4gMCkge1xyXG4gICAgYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLnBvcCgpKCk7XHJcbn1cclxubW9kdWxlLmV4cG9ydHMgPSBhdHJvcGE7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9kb2NzL3ZzZG9jL09wZW5MYXllcnNBbGwuanNcIi8+XG52YXIgYXRyb3BhID0gcmVxdWlyZSgnYXRyb3BhLWhlYWRlcicpO1xuLypqc2xpbnRcbiAgICBpbmRlbnQ6IDQsXG4gICAgbWF4ZXJyOiA1MCxcbiAgICB3aGl0ZTogdHJ1ZSxcbiAgICBicm93c2VyOiB0cnVlLFxuICAgIGRldmVsOiB0cnVlLFxuICAgIHBsdXNwbHVzOiB0cnVlLFxuICAgIHJlZ2V4cDogdHJ1ZVxuKi9cbi8qZ2xvYmFsIGF0cm9wYSAqL1xuLy8gZW5kIGhlYWRlclxuXG5hdHJvcGEucmVxdWlyZXMoXG4gICAgJ3JlbW92ZU5vZGVCeVJlZmVyZW5jZScsXG4gICAgZnVuY3Rpb24gKCkge1xuICAgICAgICBcInVzZSBzdHJpY3RcIjtcbiAgICAgICAgaWYoZG9jdW1lbnQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbik7XG5cbi8qKlxuICogUmVtb3ZlcyBET00gTm9kZXMuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQHZlcnNpb24gMjAxMjA5MDlcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtET00gTm9kZX0gZWxlbWVudFJlZmVyZW5jZSBBIHJlZmVyZW5jZSB0byB0aGUgRE9NIE5vZGUgeW91IHdhbnRcbiAqIHRvIHJlbW92ZS5cbiAqL1xuYXRyb3BhLnJlbW92ZU5vZGVCeVJlZmVyZW5jZSA9IGZ1bmN0aW9uIChlbGVtZW50UmVmZXJlbmNlKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgYXRyb3BhLnN1cHBvcnRDaGVjaygncmVtb3ZlTm9kZUJ5UmVmZXJlbmNlJyk7XG4gICAgaWYoZWxlbWVudFJlZmVyZW5jZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGVsZW1lbnRSZWZlcmVuY2UucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbGVtZW50UmVmZXJlbmNlKTtcbiAgICB9XG59O1xuXG5cblxuXG53aGlsZShhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMubGVuZ3RoID4gMCkge1xuICAgIGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5wb3AoKSgpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBhdHJvcGE7XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vZG9jcy92c2RvYy9PcGVuTGF5ZXJzQWxsLmpzXCIvPlxudmFyIGF0cm9wYSA9IHJlcXVpcmUoJ2F0cm9wYS1oZWFkZXInKTtcbi8qanNsaW50XG4gICAgaW5kZW50OiA0LFxuICAgIG1heGVycjogNTAsXG4gICAgd2hpdGU6IHRydWUsXG4gICAgYnJvd3NlcjogdHJ1ZSxcbiAgICBkZXZlbDogdHJ1ZSxcbiAgICBwbHVzcGx1czogdHJ1ZSxcbiAgICByZWdleHA6IHRydWVcbiovXG4vKmdsb2JhbCBhdHJvcGEgKi9cbi8vIGVuZCBoZWFkZXJcblxuLyoqXG4gKiBTZXQgZGVmYXVsdCB2YWx1ZXMgZm9yIG9wdGlvbmFsIGZ1bmN0aW9uIHBhcmFtZXRlcnMuXG4gKiBAZXhhbXBsZVxuICogPHByZT5cbiAqICAgLy8gVG8gc2V0IGEgZGVmYXVsdCB2YWx1ZSBmb3IgYW4gb3B0aW9uYWwgcGFyYW1ldGVyXG4gKiAgIGZ1bmN0aW9uKG9wdGlvbmFsQXJnKSB7XG4gKiAgICAgICB2YXIgZGVmYXVsdFZhbCA9ICdoZWxsbyB0aGVyZSEnO1xuICogICAgICAgb3B0aW9uYWxBcmcgPSBhdHJvcGEuc2V0QXNPcHRpb25hbEFyZyhkZWZhdWx0VmFsLCBvcHRpb25hbEFyZyk7XG4gKiAgICAgICByZXR1cm4gb3B0aW9uYWxBcmc7XG4gKiAgIH1cbiAqIDwvcHJlPlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAqIEB2ZXJzaW9uIDIwMTIwOTA5XG4gKiBAcGFyYW0ge01peGVkfSBkZWZhdWx0VmFsIFRoZSBkZWZhdWx0IHZhbHVlIHRvIHNldC5cbiAqIEBwYXJhbSB7TWl4ZWR9IG9wdGlvbmFsQXJnIEEgcmVmZXJlbmNlIHRvIHRoZSBvcHRpb25hbCBhcmd1bWVudC5cbiAqIEByZXR1cm5zIHtNaXhlZH0gUmV0dXJucyB0aGUgZGVmYXVsdCB2YWx1ZSBzdXBwbGllZCB3aGVuIHRoZSBvcHRpb25hbFxuICogYXJndW1lbnQgaXMgdW5kZWZpbmVkIG9yIG51bGwuIE90aGVyd2lzZSwgdGhlIHN1cHBsaWVkIG9wdGlvbmFsIGFyZ3VtZW50XG4gKiBpcyByZXR1cm5lZC5cbiAqL1xuYXRyb3BhLnNldEFzT3B0aW9uYWxBcmcgPSBmdW5jdGlvbiAoZGVmYXVsdFZhbCwgb3B0aW9uYWxBcmcpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICBpZiAob3B0aW9uYWxBcmcgPT09IHVuZGVmaW5lZCB8fCBvcHRpb25hbEFyZyA9PT0gbnVsbCkge1xuICAgICAgICBvcHRpb25hbEFyZyA9IGRlZmF1bHRWYWw7XG4gICAgfVxuICAgIHJldHVybiBvcHRpb25hbEFyZztcbn07XG5cblxuXG5cbndoaWxlKGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5sZW5ndGggPiAwKSB7XG4gICAgYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLnBvcCgpKCk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGF0cm9wYTtcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9kb2NzL3ZzZG9jL09wZW5MYXllcnNBbGwuanNcIi8+XHJcbnZhciBhdHJvcGEgPSByZXF1aXJlKCdhdHJvcGEtaGVhZGVyJyk7XHJcbmF0cm9wYS5yZWdleCA9IHJlcXVpcmUoJ2F0cm9wYS1yZWdleCcpLnJlZ2V4O1xyXG5hdHJvcGEuYXJyYXlzID0gcmVxdWlyZSgnYXRyb3BhLWFycmF5cycpLmFycmF5cztcclxuLypqc2xpbnRcclxuICAgIGluZGVudDogNCxcclxuICAgIG1heGVycjogNTAsXHJcbiAgICB3aGl0ZTogdHJ1ZSxcclxuICAgIGJyb3dzZXI6IHRydWUsXHJcbiAgICBkZXZlbDogdHJ1ZSxcclxuICAgIHBsdXNwbHVzOiB0cnVlLFxyXG4gICAgcmVnZXhwOiB0cnVlXHJcbiovXHJcbi8qZ2xvYmFsIGF0cm9wYSAqL1xyXG4vLyBlbmQgaGVhZGVyXHJcblxyXG4vKipcclxuICogQSBmZXcgdXRpbGl0aWVzIGZvciBtYW5pcHVsYXRpbmcgc3RyaW5ncy5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEBuYW1lc3BhY2UgQSBmZXcgdXRpbGl0aWVzIGZvciBtYW5pcHVsYXRpbmcgc3RyaW5ncy5cclxuICogQHJlcXVpcmVzIGF0cm9wYS5yZWdleC5wYXR0ZXJuc1xyXG4gKi9cclxuYXRyb3BhLnN0cmluZyA9IHt9O1xyXG4vKipcclxuICogUmVwbGFjZXMgcmVwZWF0ZWQgd29yZHMgYW5kIHBocmFzZXMgd2l0aCBhIHNpbmdsZSB3b3JkIG9yIHBocmFzZS5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwNzAxXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmcgVGhlIHN0cmluZyB0byByZW1vdmUgcmVwZWF0ZWQgd29yZHMgZnJvbS5cclxuICogQHJldHVybnMge1N0cmluZ30gUmV0dXJucyB0aGUgZ2l2ZW4gc3RyaW5nIHdpdGggcmVwZWF0ZWQgd29yZHMgYW5kXHJcbiAqICBwaHJhc2VzIHJlbW92ZWQuXHJcbiAqL1xyXG5hdHJvcGEuc3RyaW5nLnJlbW92ZVJlcGVhdGVkV29yZCA9IGZ1bmN0aW9uIHJlbW92ZVJlcGVhdGVkV29yZCAoc3RyaW5nKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHJldHVybiBzdHJpbmcucmVwbGFjZShhdHJvcGEucmVnZXgucGF0dGVybnMucmVwZWF0ZWRXb3JkcywgJyQxJyk7XHJcbn07XHJcbi8qKlxyXG4gKiBDcmVhdGVzIHBhcmFncmFwaCBicmVha3MgYXQgZXZlcnkgb2NjdXJyZW5jZSBvZiB0d28gY29uc2VjdXRpdmUgbGluZSBicmVha3MuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDcwMVxyXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nIFRoZSBzdHJpbmcgdG8gaW5zZXJ0IHBhcmFncmFwaCB0YWdzIGludG8uXHJcbiAqIEByZXR1cm5zIHtTdHJpbmd9IFJldHVybnMgdGhlIGdpdmVuIHN0cmluZyB3aXRoIHBhcmFncmFwaCBicmVha3MgaW5zZXJ0ZWQuXHJcbiAqL1xyXG5hdHJvcGEuc3RyaW5nLmxpbmVCcmVha3NUb1BhcmFncmFwaFRhZ3MgPSBmdW5jdGlvbiBsaW5lQnJlYWtzVG9QYXJhZ3JhcGhUYWdzIChzdHJpbmcpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgdmFyIG91dCA9IHN0cmluZy5yZXBsYWNlKGF0cm9wYS5yZWdleC5wYXR0ZXJucy5wYXJhZ3JhcGhCcmVha3MsICc8L3A+PHA+Jyk7XHJcbiAgICBvdXQgPSAnPHA+JyArIG91dC50cmltKCkgKyAnPC9wPic7XHJcbiAgICBvdXQgPSBvdXQucmVwbGFjZSgvXFxzKzxcXC8ocHxicik+L2csICc8LyQxPicpO1xyXG4gICAgcmV0dXJuIG91dDtcclxufTtcclxuLyoqXHJcbiAqIENyZWF0ZXMgYnJlYWsgdGFncyBhdCBldmVyeSBsaW5lIGJyZWFrLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzA3MDFcclxuICogQHBhcmFtIHtTdHJpbmd9IHN0cmluZyBUaGUgc3RyaW5nIHRvIGluc2VydCBicmVhayB0YWdzIGludG8uXHJcbiAqIEByZXR1cm5zIHtTdHJpbmd9IFJldHVybnMgdGhlIGdpdmVuIHN0cmluZyB3aXRoIGJyZWFrIHRhZ3MgaW5zZXJ0ZWQuXHJcbiAqL1xyXG5hdHJvcGEuc3RyaW5nLmxpbmVCcmVha3NUb0JyZWFrVGFncyA9IGZ1bmN0aW9uIGxpbmVCcmVha3NUb0JyZWFrVGFncyAoc3RyaW5nKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHJldHVybiBzdHJpbmcucmVwbGFjZShhdHJvcGEucmVnZXgucGF0dGVybnMubGluZUJyZWFrcywgJzxicj4nKTtcclxufTtcclxuLyoqXHJcbiAqIE5vcm1hbGl6ZXMgbGluZSBicmVha3MgdG8gYFxcbmAuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDcwMVxyXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nIFRoZSBzdHJpbmcgdG8gbm9ybWFsaXplLlxyXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBSZXR1cm5zIHRoZSBnaXZlbiBzdHJpbmcgd2l0aCBub3JtYWxpemVkIGxpbmUgYnJlYWtzLlxyXG4gKi9cclxuYXRyb3BhLnN0cmluZy5ub3JtYWxpemVFb2wgPSBmdW5jdGlvbiBub3JtYWxpemVFb2wgKHN0cmluZykge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoYXRyb3BhLnJlZ2V4LnBhdHRlcm5zLmxpbmVCcmVha3MsICdcXG4nKTtcclxufTtcclxuLyoqXHJcbiAqIENvbnZlcnRzIHRoZSBmaXJzdCBjaGFyYWN0ZXIgb2YgYSBnaXZlbiBzdHJpbmcgdG9cclxuICogdXBwZXJjYXNlLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMjA5MDlcclxuICogQHBhcmFtIHtTdHJpbmd9IHN0cmluZyBUaGUgc3RyaW5nIGZvciB3aGljaCB5b3Ugd2FudCB0aGVcclxuICogZmlyc3QgbGV0dGVyIHRvIGJlIGluIHVwcGVyIGNhc2UuXHJcbiAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBnaXZlbiBzdHJpbmcgd2l0aCBpdCdzIGZpcnN0IGxldHRlciBjYXBpdGFsaXplZC5cclxuICovXHJcbmF0cm9wYS5zdHJpbmcudWNGaXJzdCA9IGZ1bmN0aW9uIHVjRmlyc3Qoc3RyaW5nKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHN0cmluZyA9IHN0cmluZy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0cmluZy5zbGljZSgxKTtcclxuICAgIHJldHVybiBzdHJpbmc7XHJcbn07XHJcbi8qKlxyXG4gKiBDb252ZXJ0cyB0aGUgZ2l2ZW4gc3RyaW5nIHRvIGNhbWVsIGNhc2UuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDgyM1xyXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nIFRoZSBzdHJpbmcgdG8gY2FtZWxpemUuXHJcbiAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBjYW1lbGl6ZWQgc3RyaW5nLlxyXG4gKiBAZXhhbXBsZVxyXG4gKiAgYXRyb3BhLnN0cmluZy5jYW1lbGl6ZSgnZ2V0IGl0IHRvZ2V0aGVyJyk7XHJcbiAqICAvLyByZXR1cm5zIFwiZ2V0SXRUb2dldGhlclwiXHJcbiAqL1xyXG5hdHJvcGEuc3RyaW5nLmNhbWVsaXplID0gZnVuY3Rpb24gY2FtZWxpemUgKHN0cikge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICB2YXIgYXJyLCBvdXQ7XHJcbiAgICBhcnIgPSBzdHIuc3BsaXQoJyAnKTtcclxuICAgIG91dCA9IGFyci5zaGlmdCgpO1xyXG4gICAgYXJyID0gYXJyLm1hcChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgIHJldHVybiBhdHJvcGEuc3RyaW5nLnVjRmlyc3QoaXRlbSk7XHJcbiAgICB9KTtcclxuICAgIG91dCArPSBhcnIuam9pbignJyk7XHJcbiAgICByZXR1cm4gb3V0O1xyXG59O1xyXG4vKipcclxuICogQ291bnRzIHdvcmRzLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzAzMTNcclxuICogQHBhcmFtIHtTdHJpbmd9IHNvbWVUZXh0IFBsYWluIHRleHQuXHJcbiAqIEByZXR1cm4ge051bWJlcn0gUmV0dXJucyB0aGUgY291bnQgb2Ygd29yZHMgaW4gc29tZVRleHQuXHJcbiAqL1xyXG5hdHJvcGEuc3RyaW5nLmNvdW50V29yZHMgPSBmdW5jdGlvbiBjb3VudFdvcmRzKHNvbWVUZXh0KSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHZhciB3b3JkQ291bnQsIHJlLCBsZW4gPSAwO1xyXG4gICAgaWYoc29tZVRleHQgIT09IHVuZGVmaW5lZCAmJiBzb21lVGV4dCAhPT0gbnVsbCkge1xyXG4gICAgICAgIHNvbWVUZXh0ID0gc29tZVRleHQudHJpbSgpO1xyXG4gICAgICAgIGlmKHNvbWVUZXh0ICE9PSAnJykge1xyXG4gICAgICAgICAgICB3b3JkQ291bnQgPSAwO1xyXG4gICAgICAgICAgICByZSA9IC9cXHMrL2dpO1xyXG4gICAgICAgICAgICB3b3JkQ291bnQgPSBzb21lVGV4dC5zcGxpdChyZSk7XHJcbiAgICAgICAgICAgIGxlbiA9IHdvcmRDb3VudC5sZW5ndGg7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGxlbjtcclxufTtcclxuLyoqXHJcbiAqIENvbnZlcnRzIGVuZCBvZiBsaW5lIG1hcmtlcnMgaW50byB3aGF0ZXZlciB5b3Ugd2FudC4gXHJcbiAqIEF1dG9tYXRpY2FsbHkgZGV0ZWN0cyBhbnkgb2YgXFxyXFxuLCBcXG4sIG9yIFxcciBhbmQgXHJcbiAqIHJlcGxhY2VzIGl0IHdpdGggdGhlIHVzZXIgc3BlY2lmaWVkIEVPTCBtYXJrZXIuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAcGFyYW0ge1N0cmluZ30gdGV4dCBUaGUgdGV4dCB5b3Ugd2FudCBwcm9jZXNzZWQuXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBuZXdFT0wgVGhlIHJlcGxhY2VtZW50IGZvciB0aGUgY3VycmVudCBFT0wgbWFya3MuXHJcbiAqIEByZXR1cm5zIHtTdHJpbmd9IFJldHVybnMgdGhlIHByb2Nlc3NlZCB0ZXh0LlxyXG4gKi9cclxuYXRyb3BhLnN0cmluZy5jb252ZXJ0RW9sID0gZnVuY3Rpb24gY29udmVydEVPTCh0ZXh0LCBuZXdFT0wpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuICAgIHJldHVybiB0ZXh0LnJlcGxhY2UoYXRyb3BhLnJlZ2V4LnBhdHRlcm5zLmxpbmVCcmVha3MsIG5ld0VPTCk7XHJcbn07XHJcblxyXG4vKipcclxuICogUmVtb3ZlcyBhIHF1YW50aXR5IG9mIGxlYWRpbmcgc3BhY2VzIHNwZWNpZmllZCBieSBvZmZzZXQuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAcGFyYW0ge1N0cmluZ30gdGV4dCBUaGUgdGV4dCB0byBwcm9jZXNzLlxyXG4gKiBAcGFyYW0ge051bWJlcn0gb2Zmc2V0IFRoZSBhbW91bnQgb2Ygc3BhY2VzIHlvdSB3YW50IHJlbW92ZWQgXHJcbiAqIGZyb20gdGhlIGJlZ2lubmluZyBvZiB0aGUgdGV4dC5cclxuICogQHJldHVybnMgUmV0dXJucyB0aGUgcHJvY2Vzc2VkIHRleHQuXHJcbiAqL1xyXG5hdHJvcGEuc3RyaW5nLm9mZnNldFdoaXRlU3BhY2UgPSBmdW5jdGlvbiBvZmZzZXRXaGl0ZVNwYWNlKHRleHQsIG9mZnNldCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG4gICAgdmFyIHJlZ3g7XHJcbiAgICByZWd4ID0gbmV3IFJlZ0V4cCgnXiB7JyArIG9mZnNldCArICd9Jyk7XHJcbiAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKHJlZ3gsICcnKTtcclxuICAgIHJldHVybiB0ZXh0O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENvbnZlcnRzIGFsbCB0YWJzIGluIGxlYWRpbmcgd2hpdGVzcGFjZSBpbnRvIGZvdXIgc3BhY2VzLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHBhcmFtIHtTdHJpbmd9IHRleHQgVGhlIHRleHQgdG8gcHJvY2Vzc1xyXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBSZXR1cm5zIHRoZSBwcm9jZXNzZWQgdGV4dC5cclxuICovXHJcbmF0cm9wYS5zdHJpbmcubm9ybWFsaXplV2hpdGVTcGFjZVByZWZpeCA9IGZ1bmN0aW9uIG5vcm1hbGl6ZVdoaXRlU3BhY2VQcmVmaXgoXHJcbiAgICB0ZXh0XHJcbikge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG4gICAgdmFyIHByZWZpeCA9IHRleHQubWF0Y2goL15cXHMqLyk7XHJcbiAgICBpZihwcmVmaXgpIHtcclxuICAgICAgICBwcmVmaXggPSBwcmVmaXhbMF07XHJcbiAgICAgICAgcHJlZml4ID0gcHJlZml4LnJlcGxhY2UoL1xcdC9nLCAnICAgICcpO1xyXG4gICAgICAgIHRleHQgPSB0ZXh0LnJlcGxhY2UoL15cXHMqLywgcHJlZml4KTtcclxuICAgIH1cclxuICAgIHJldHVybiB0ZXh0O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENvbnZlcnRzIGFsbCB0YWJzIGludG8gZm91ciBzcGFjZXMuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAcGFyYW0ge1N0cmluZ30gdGV4dCBUaGUgdGV4dCB0byBwcm9jZXNzXHJcbiAqIEByZXR1cm5zIHtTdHJpbmd9IFJldHVybnMgdGhlIHByb2Nlc3NlZCB0ZXh0LlxyXG4gKi9cclxuYXRyb3BhLnN0cmluZy5ub3JtYWxpemVXaGl0ZVNwYWNlID0gZnVuY3Rpb24gbm9ybWFsaXplV2hpdGVTcGFjZSh0ZXh0KSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcbiAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC9cXHQvZywgJyAgICAnKTtcclxuICAgIHJldHVybiB0ZXh0O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENvdW50cyB0aGUgbnVtYmVyIG9mIGxlYWRpbmcgc3BhY2Ugb3IgdGFiIGNoYXJhY3RlcnMgYnV0IG5vdCBib3RoLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHBhcmFtIHtTdHJpbmd9IHRleHQgVGhlIHRleHQgdG8gYW5hbHl6ZS5cclxuICogQHJldHVybnMge051bWJlcn0gUmV0dXJucyB0aGUgcXVhbnRpdHkgb2YgbGVhZGluZyBzcGFjZXMgb3IgdGFicy5cclxuICovXHJcbmF0cm9wYS5zdHJpbmcuZ2V0T2Zmc2V0ID0gZnVuY3Rpb24gZ2V0T2Zmc2V0KHRleHQpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuICAgIHZhciBvZmZzZXQgPSAwLFxyXG4gICAgICAgIGxlYWRpbmdDaGFyID0gdGV4dC5jaGFyQXQoMCk7XHJcbiAgICAgICAgXHJcbiAgICBpZiggbGVhZGluZ0NoYXIgPT09ICcgJyB8fCBsZWFkaW5nQ2hhciA9PT0gJ1xcdCcpIHtcclxuICAgICAgICB3aGlsZSh0ZXh0LmNoYXJBdChvZmZzZXQpID09PSBsZWFkaW5nQ2hhciAmJiBvZmZzZXQgPCB0ZXh0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICBvZmZzZXQrKztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gb2Zmc2V0O1xyXG59O1xyXG4vKipcclxuICogQnJlYWtzIGEgc3RyaW5nIGludG8gYW4gYXJyYXkgb2Ygd29yZHMuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDExOFxyXG4gKiBAcGFyYW0ge1N0cmluZ30gdGV4dCBUaGUgdGV4dCB0byBhbmFseXplLlxyXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYW4gYXJyYXkgb2YgdGhlIHdvcmRzIGluXHJcbiAqICB0aGUgZ2l2ZW4gdGV4dC5cclxuICogQHJlcXVpcmVzIGF0cm9wYS5hcnJheXMucmVtb3ZlRW1wdHlFbGVtZW50c1xyXG4gKi9cclxuYXRyb3BhLnN0cmluZy5nZXRXb3JkcyA9IGZ1bmN0aW9uICh0ZXh0KSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHZhciBvdXQgPSBbXTtcclxuICAgIGZ1bmN0aW9uIGludmFsaWRDaGFycyhlbGVtZW50KSB7XHJcbiAgICAgICAgdmFyIG1hdGNoZWQgPSAvXltcXC0n4oCZYF0rJC8udGVzdChlbGVtZW50KTtcclxuICAgICAgICAvLyBpbnZlcnQgdGhlIHJlc3VsdCBvZiB0ZXN0LiB0aHJvdyBvdXQgZWxlbWVudHMgdGhhdCBtYXRjaC5cclxuICAgICAgICByZXR1cm4gIW1hdGNoZWQ7XHJcbiAgICB9XHJcbiAgICBvdXQgPSBhdHJvcGEuYXJyYXlzLnJlbW92ZUVtcHR5RWxlbWVudHMoXHJcbiAgICAgICAgdGV4dC5zcGxpdCgvW15BLVphLXpcXC0n4oCZYF0rL2dpKVxyXG4gICAgKTtcclxuICAgIG91dCA9IG91dC5maWx0ZXIoaW52YWxpZENoYXJzKTtcclxuICAgIHJldHVybiBvdXQ7XHJcbn07XHJcbi8qKlxyXG4gKiBFc2NhcGVzIDxjb2RlPkNEQVRBPC9jb2RlPiBzZWN0aW9ucyBpbiB0ZXh0XHJcbiAqICBzbyB0aGF0IHRoZSB0ZXh0IG1heSBiZSBlbWJlZGRlZCBpbnRvIGEgXHJcbiAqICA8Y29kZT5DREFUQTwvY29kZT4gc2VjdGlvbi4gVGhpcyBzaG91bGQgYmUgcnVuXHJcbiAqICBvbiBhbnkgdGV4dCB3aGljaCBtYXkgY29udGFpbiB0aGUgc3RyaW5nIFxyXG4gKiAgPGNvZGU+XV0+PC9jb2RlPiBzaW5jZSBzYWlkIHN0cmluZyB3aWxsIGVmZmVjdGl2ZWx5XHJcbiAqICBlbmQgdGhlIDxjb2RlPkNEQVRBPC9jb2RlPiBzZWN0aW9uIHByZW1hdHVyZWx5LlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzAxMThcclxuICogQHBhcmFtIHtTdHJpbmd9IHRleHQgVGhlIHRleHQgY29udGFpbmluZyBcclxuICogIDxjb2RlPkNEQVRBPC9jb2RlPiBzZWN0aW9ucyB0byBlc2NhcGUuXHJcbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBhIHN0cmluZyB3aXRoIGVzY2FwZWRcclxuICogIDxjb2RlPkNEQVRBPC9jb2RlPiBzZWN0aW9ucy5cclxuICogQHNlZSA8YSBocmVmPVwiaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9DREFUQSNOZXN0aW5nXCI+XHJcbiAqICBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0NEQVRBI05lc3Rpbmc8L2E+XHJcbiAqIEBzZWUgPGEgaHJlZj1cImh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTk4MTY4XCI+XHJcbiAqICBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD05ODE2ODwvYT5cclxuICovXHJcbmF0cm9wYS5zdHJpbmcuZXNjYXBlQ2RhdGEgPSBmdW5jdGlvbiBlc2NhcGVDZGF0YSh0ZXh0KSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHJldHVybiBTdHJpbmcodGV4dCkucmVwbGFjZSgvXFxdXFxdPi9nLCAnXV1dXT48IVtDREFUQVs+Jyk7XHJcbn07XHJcblxyXG5cclxuXHJcblxyXG53aGlsZShhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMubGVuZ3RoID4gMCkge1xyXG4gICAgYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLnBvcCgpKCk7XHJcbn1cclxubW9kdWxlLmV4cG9ydHMgPSBhdHJvcGE7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9kb2NzL3ZzZG9jL09wZW5MYXllcnNBbGwuanNcIi8+XHJcbnZhciBhdHJvcGEgPSByZXF1aXJlKCdhdHJvcGEtaGVhZGVyJyk7XHJcbi8qanNsaW50XHJcbiAgICBpbmRlbnQ6IDQsXHJcbiAgICBtYXhlcnI6IDUwLFxyXG4gICAgd2hpdGU6IHRydWUsXHJcbiAgICBicm93c2VyOiB0cnVlLFxyXG4gICAgZGV2ZWw6IHRydWUsXHJcbiAgICBwbHVzcGx1czogdHJ1ZSxcclxuICAgIHJlZ2V4cDogdHJ1ZVxyXG4qL1xyXG4vKmdsb2JhbCBhdHJvcGEgKi9cclxuLy8gZW5kIGhlYWRlclxyXG5cclxuLyoqXHJcbiAqIFV0aWxpdGllcyBmb3IgaGFuZGxpbmcgdXJscy5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwNzEzXHJcbiAqIEBuYW1lc3BhY2UgVXRpbGl0aWVzIGZvciBoYW5kbGluZyB1cmxzLlxyXG4gKi9cclxuYXRyb3BhLnVybCA9IHt9O1xyXG4vKipcclxuICogR2V0cyB0aGUgZmlsZW5hbWUgcG9ydGlvbiBvZiBhIHVybFxyXG4gKiBAZnVuY3Rpb25cclxuICogQHBhcmFtIHtTdHJpbmd9IHVybCBUaGUgdXJsLlxyXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBSZXR1cm5zIGV2ZXJ5dGhpbmcgYWZ0ZXIgdGhlIGxhc3QgLyBpbiB0aGUgdXJsLlxyXG4gKi9cclxuYXRyb3BhLnVybC5nZXRGaWxlbmFtZSA9IGZ1bmN0aW9uKHVybCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICB2YXIgZmlsZW5hbWU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGZpbGVuYW1lID0gU3RyaW5nKHVybCkucmVwbGFjZSgvLio6XFwvXFwvW15cXC9dKy8sICcnKS5yZXBsYWNlKC9bI3w/XS4qJC8sICcnKS5tYXRjaCgvW15cXC9dKyQvKVswXTtcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICBmaWxlbmFtZSA9ICcnO1xyXG4gICAgfVxyXG4gICAgaWYodXJsID09PSBmaWxlbmFtZSkge1xyXG4gICAgICAgIGZpbGVuYW1lID0gJyc7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmlsZW5hbWU7XHJcbn07XHJcblxyXG5cclxuXHJcblxyXG53aGlsZShhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMubGVuZ3RoID4gMCkge1xyXG4gICAgYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLnBvcCgpKCk7XHJcbn1cclxubW9kdWxlLmV4cG9ydHMgPSBhdHJvcGE7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9kb2NzL3ZzZG9jL09wZW5MYXllcnNBbGwuanNcIi8+XG52YXIgYXRyb3BhID0gcmVxdWlyZSgnYXRyb3BhLWhlYWRlcicpO1xuYXRyb3BhLnNldEFzT3B0aW9uYWxBcmcgPSByZXF1aXJlKCdhdHJvcGEtc2V0QXNPcHRpb25hbEFyZycpLnNldEFzT3B0aW9uYWxBcmc7XG4vKmpzbGludFxuICAgIGluZGVudDogNCxcbiAgICBtYXhlcnI6IDUwLFxuICAgIHdoaXRlOiB0cnVlLFxuICAgIGJyb3dzZXI6IHRydWUsXG4gICAgZGV2ZWw6IHRydWUsXG4gICAgcGx1c3BsdXM6IHRydWUsXG4gICAgcmVnZXhwOiB0cnVlXG4qL1xuLypnbG9iYWwgYXRyb3BhICovXG4vLyBlbmQgaGVhZGVyXG5cbi8qKlxuICogUG9sbGluZyBmdW5jdGlvbnMgZm9yIHF1aWNrIGFuZCBzbG9wcHkgd29yay5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAdmVyc2lvbiAyMDEyMDkwOVxuICogQG5hbWVzcGFjZSBQb2xsaW5nIGZ1bmN0aW9ucyBmb3IgcXVpY2sgYW5kIHNsb3BweSB3b3JrLlxuICovXG5hdHJvcGEud2FpdEZvciA9IHt9O1xuLyoqXG4gKiBHZW5lcmljIFdhaXQgZm9yIHRydWUuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQHZlcnNpb24gMjAxMjA5MDlcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHRlc3RGbiBBIGZ1bmN0aW9uIHRvIHRlbGwgd2hlbiB0aGUgd2FpdCBpcyBvdmVyLiBNdXN0XG4gKiAgcmV0dXJuIHRydWUgb24gc3VjY2VzcywgZmFsc2Ugb24gZmFpbHVyZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9uU3VjY2Vzc0NhbGxiYWNrIE9wdGlvbmFsLiBUaGUgZnVuY3Rpb24gdG8gcnVuIHdoZW4gdGVzdEZuXG4gKiAgcmV0dXJucyB0cnVlLiBEZWZhdWx0cyB0byA8Y29kZT5mdW5jdGlvbiAoKSB7fSA8L2NvZGU+XG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBvbk1heFBvbGxDYWxsYmFjayBPcHRpb25hbC4gVGhlIGZ1bmN0aW9uIHRvIHJ1biB3aGVuIHRlc3RGblxuICogIGhhcyBiZWVuIHJ1biBtYXhQb2xsIHRpbWVzIGFuZCB0aGUgd2FpdCBpcyBiZWluZyBnaXZlbiB1cC5cbiAqIERlZmF1bHRzIHRvIDxjb2RlPmZ1bmN0aW9uICgpIHt9PC9jb2RlPlxuICogQHBhcmFtIHtJbnRlZ2VyfSBwb2xsSW50ZXJ2YWwgT3B0aW9uYWwuIFRoZSBhbW91bnQgb2YgdGltZSBpbiBtcyBiZXR3ZWVuXG4gKiAgcG9sbGluZyB0ZXN0Rm4gdG8gc2VlIGlmIGl0IHJldHVybnMgdHJ1ZS4gRGVmYXVsdHMgdG8gMjAwbXMuXG4gKiBAcGFyYW0ge0ludGVnZXJ9IG1heFBvbGwgT3B0aW9uYWwuIFRoZSBxdWFudGl0eSBvZiBwb2xscyBhdCB3aGljaCBpdCBtYWtlc1xuICogIHNlbnNlIHRvIGdpdmUgdXAgd2FpdGluZy4gRGVmYXVsdHMgdG8gNTAuXG4gKi9cbmF0cm9wYS53YWl0Rm9yLnRlc3QgPSBmdW5jdGlvbiB0ZXN0KFxuICAgIHRlc3RGbiwgb25TdWNjZXNzQ2FsbGJhY2ssIG9uTWF4UG9sbENhbGxiYWNrLCBwb2xsSW50ZXJ2YWwsIG1heFBvbGxcbikge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIHBvbGxJbnRlcnZhbCA9IGF0cm9wYS5zZXRBc09wdGlvbmFsQXJnKDIwMCwgcG9sbEludGVydmFsKTtcbiAgICBtYXhQb2xsID0gYXRyb3BhLnNldEFzT3B0aW9uYWxBcmcoNTAsIG1heFBvbGwpO1xuICAgIG9uTWF4UG9sbENhbGxiYWNrID0gYXRyb3BhLnNldEFzT3B0aW9uYWxBcmcoYXRyb3BhLm5vcCwgb25NYXhQb2xsQ2FsbGJhY2spO1xuICAgIG9uU3VjY2Vzc0NhbGxiYWNrID0gYXRyb3BhLnNldEFzT3B0aW9uYWxBcmcoYXRyb3BhLm5vcCwgb25TdWNjZXNzQ2FsbGJhY2spO1xuICAgIHZhciBteUludDtcbiAgICB2YXIgbXlDb3VudGVyID0gMDtcbiAgICBmdW5jdGlvbiB3YWl0Rm9yVGVzdFJlY3Vyc29yICgpIHtcbiAgICAgICAgbXlDb3VudGVyKys7XG4gICAgICAgIGlmICh0ZXN0Rm4oKSkge1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChteUludCk7XG4gICAgICAgICAgICBvblN1Y2Nlc3NDYWxsYmFjaygpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChteUNvdW50ZXIgPT09IG1heFBvbGwpIHtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwobXlJbnQpO1xuICAgICAgICAgICAgb25NYXhQb2xsQ2FsbGJhY2soKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBteUludCA9IHNldEludGVydmFsKHdhaXRGb3JUZXN0UmVjdXJzb3IsIHBvbGxJbnRlcnZhbCk7XG59O1xuLyoqXG4gKiBXYWl0IGZvciBFbGVtZW50XG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQHZlcnNpb24gMjAxMjA5MDlcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHRlc3RGbiBBIGZ1bmN0aW9uIHdoaWNoIHJldHVybnMgYSByZWZlcmVuY2UgdG8gYW4gSFRNTFxuICogIEVsZW1lbnQuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBPcHRpb25hbC4gb25TdWNjZXNzQ2FsbGJhY2tcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IE9wdGlvbmFsLiBvbk1heFBvbGxDYWxsYmFjayBcbiAqIEBwYXJhbSB7SW50ZWdlcn0gT3B0aW9uYWwuIHBvbGxJbnRlcnZhbFxuICogQHBhcmFtIHtJbnRlZ2VyfSBPcHRpb25hbC4gbWF4UG9sbFxuICogQHNlZSBhdHJvcGEud2FpdEZvci50ZXN0IGZvciBtb3JlIGluZm9ybWF0aW9uIGFuZCBkZWZhdWx0IHZhbHVlcyBmb3IgdGhlXG4gKiAgb3B0aW9uYWwgcGFyYW1ldGVycy5cbiAqL1xuYXRyb3BhLndhaXRGb3IuZWxlbWVudCA9IGZ1bmN0aW9uIChcbiAgICB0ZXN0Rm4sIG9uU3VjY2Vzc0NhbGxiYWNrLCBvbk1heFBvbGxDYWxsYmFjaywgcG9sbEludGVydmFsLCBtYXhQb2xsXG4pIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIEhUTUwgRE9NIERvY3VtZW50IGFuZCBwdXRzIGl0IGluIHRoZSBkb2N1bWVudFxuICAgICAqIHF1ZXVlLCB0aGVuIGV4ZWN1dGVzIHRoZSBjYWxsYmFjayBnaXZlbi5cbiAgICAgKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAgICAgKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAgICAgKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gICAgICogQHZlcnNpb24gMjAxMjA5MDlcbiAgICAgKiBAbWV0aG9kT2YgYXRyb3BhLndhaXRGb3IuZWxlbWVudC1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEByZXR1cm5zIHtCb29sZWFufSBSZXR1cm5zIHRydWUgb3IgZmFsc2UgZGVwZW5kaW5nIG9uIHdoZXRoZXIgdGhlIG9iamVjdFxuICAgICAqICBoYXMgYSB0YWcgbmFtZSBwcm9wZXJ0eS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBlbGVtZW50VGVzdCAoKSB7XG4gICAgICAgIHJldHVybiBhdHJvcGEuaW5xdWlyZS5oYXNQcm9wZXJ0eSh0ZXN0Rm4oKSwgJ3RhZ05hbWUnKTtcbiAgICB9XG4gICAgYXRyb3BhLndhaXRGb3IudGVzdChcbiAgICAgICAgZWxlbWVudFRlc3QsIG9uU3VjY2Vzc0NhbGxiYWNrLCBvbk1heFBvbGxDYWxsYmFjaywgcG9sbEludGVydmFsLCBtYXhQb2xsXG4gICAgKTtcbn07XG5cblxuXG5cbndoaWxlKGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5sZW5ndGggPiAwKSB7XG4gICAgYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLnBvcCgpKCk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGF0cm9wYTtcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9kb2NzL3ZzZG9jL09wZW5MYXllcnNBbGwuanNcIi8+XHJcbnZhciBhdHJvcGEgPSByZXF1aXJlKCdhdHJvcGEtaGVhZGVyJyk7XHJcbmF0cm9wYS5yZWdleCA9IHJlcXVpcmUoJ2F0cm9wYS1yZWdleCcpLnJlZ2V4O1xyXG5hdHJvcGEuc3RyaW5nID0gcmVxdWlyZSgnYXRyb3BhLXN0cmluZycpLnN0cmluZztcclxuYXRyb3BhLnNldEFzT3B0aW9uYWxBcmcgPSByZXF1aXJlKCdhdHJvcGEtc2V0QXNPcHRpb25hbEFyZycpLnNldEFzT3B0aW9uYWxBcmc7XHJcbi8qanNsaW50XHJcbiAgICBpbmRlbnQ6IDQsXHJcbiAgICBtYXhlcnI6IDUwLFxyXG4gICAgd2hpdGU6IHRydWUsXHJcbiAgICBicm93c2VyOiB0cnVlLFxyXG4gICAgZGV2ZWw6IHRydWUsXHJcbiAgICBwbHVzcGx1czogdHJ1ZSxcclxuICAgIHJlZ2V4cDogdHJ1ZSxcclxuICAgIHZhcnM6IHRydWVcclxuKi9cclxuLypnbG9iYWwgYXRyb3BhICovXHJcbi8vIGVuZCBoZWFkZXJcclxuXHJcblxyXG4oZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICBhdHJvcGEucmVxdWlyZXMoXHJcbiAgICAgICAgJ3d0ZicsXHJcbiAgICAgICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgc3VwcG9ydGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgIGF0cm9wYS5yZWdleCxcclxuICAgICAgICAgICAgICAgIGF0cm9wYS5zdHJpbmcuY291bnRXb3JkcyxcclxuICAgICAgICAgICAgICAgIGF0cm9wYS5zZXRBc09wdGlvbmFsQXJnXHJcbiAgICAgICAgICAgIF0uZm9yRWFjaChmdW5jdGlvbiAocHJlcmVxdWlzaXRlKSB7XHJcbiAgICAgICAgICAgICAgICBpZihwcmVyZXF1aXNpdGUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN1cHBvcnRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIHN1cHBvcnRlZDtcclxuICAgICAgICB9XHJcbiAgICApO1xyXG59KCkpO1xyXG5cclxuKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgYXRyb3BhLnJlcXVpcmVzKFxyXG4gICAgICAgICd3dGZIdG1sRWxlbWVudCcsXHJcbiAgICAgICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgc3VwcG9ydGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgIHdpbmRvd1xyXG4gICAgICAgICAgICBdLmZvckVhY2goZnVuY3Rpb24gKHByZXJlcXVpc2l0ZSkge1xyXG4gICAgICAgICAgICAgICAgaWYocHJlcmVxdWlzaXRlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdXBwb3J0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBzdXBwb3J0ZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgKTtcclxufSgpKTtcclxuXHJcbi8qKlxyXG4gKiBDb250YWluZXIgZm9yIGFsbCBHbG9yaW91cyBXVEZpZmllciByZWxhdGVkIGZ1bmN0aW9ucyBhbmQgc3VjaC5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTIwOTA5XHJcbiAqIEBuYW1lc3BhY2UgQ29udGFpbmVyIGZvciBhbGwgR2xvcmlvdXMgV1RGaWZpZXIgcmVsYXRlZCBmdW5jdGlvbnMgYW5kIHN1Y2guXHJcbiAqIEByZXF1aXJlcyBhdHJvcGEucmVnZXhcclxuICogQHJlcXVpcmVzIGF0cm9wYS53dGYuZGljdGlvbmFyeVxyXG4gKi9cclxuYXRyb3BhLnd0ZiA9IHt9O1xyXG4vKipcclxuICogVGhlIEdsb3Jpb3VzIFdURmlmaWNhdGlvbiBEaWN0aW9uYXJ5OiBUdXJuaW5nIFNoaXRcclxuICogSW50byBQb2xpc2hlZCBUdXJkcy5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwMTEwXHJcbiAqL1xyXG5hdHJvcGEud3RmLmRpY3Rpb25hcnkgPSB7XHJcbiAgICBcIm5vdmVsdHkgcXVpY2tseSB3ZWFycyBvZmZcIiA6IFwiZHVtYiBzaGl0IGdpdHMgb2xkIGZhc3RcIixcclxuICAgIFwidGhlIHdheSBpdCBpc1wiIDogXCJob3cgaXQgYmVcIixcclxuICAgIFwicHV0IHVwIHdpdGhcIiA6IFwibWFuaGFuZGxlXCIsXHJcbiAgICBcInlldFwiIDogXCJpbW1lZGlhdGVseVwiLFxyXG4gICAgXCJsb3NlXCIgOiBcInNoYWtlXCIsXHJcbiAgICBcImZvciBubyByZWFzb25cIiA6IFwibWFpYWNhbGx5XCIsXHJcbiAgICBcImdpdmVuIGEgY2hvaWNlXCIgOiBcImV4dG9ydGVkXCIsXHJcbiAgICBcIm5vdCBzdHJvbmcgZW5vdWdoXCIgOiBcImFpbid0IGdvdCB0aGUgbnV0c1wiLFxyXG4gICAgXCJub3cgYXQgYW4gZW5kXCIgOiBcImJyYW5kIHNwYW5raW4gbmV3XCIsXHJcbiAgICBcImJlIHRvZ2V0aGVyXCIgOiBcIm1hc2ggdXBcIixcclxuICAgIFwiYXBvY2FseXBzZVwiIDogXCJwYXJ0eSB0aW1lXCIsXHJcbiAgICBcIm5vdGhpbmcgaXMgYXNzdXJlZFwiIDogXCJ3ZSBsaXZlIHRvIGRlbGl2ZXJcIixcclxuICAgIFwidG8gbm8gYXZhaWxcIiA6IFwiZm9yIGdyZWF0IGdvb2RcIixcclxuICAgIFwidG9vIGdvb2QgdG8gYmUgdHJ1ZVwiIDogXCJmdWNraW5nIGZhbnRhc3RpY1wiLFxyXG4gICAgXCJncm93aW5nIGFwYXJ0XCIgOiBcImZ1Y2tpbmcgb3RoZXIgcGVvcGxlXCIsXHJcbiAgICBcInJlc3QgaW4gcGVhY2VcIiA6IFwicGFydHkgbGlrZSBpdCdzIDE5OTlcIixcclxuICAgIFwiYmFjayBzdGFiXCIgOiBcInJ1bXAgc2hha2VcIixcclxuICAgIFwiYmFjayBzdGFiYlwiIDogXCJydW1wIHNoYWtlXCIsXHJcbiAgICBcImxvb2sgaW50byB0aGVpciBleWVzXCIgOiBcImdpdmUgdGhlbSBBSURTXCIsXHJcbiAgICBcImxvb2sgaW50byBoZXIgZXllc1wiIDogXCJnaXZlIGhlciBBSURTXCIsXHJcbiAgICBcImxvb2sgaW50byBoaXMgZXllc1wiIDogXCJnaXZlIGhpbSBBSURTXCIsXHJcbiAgICBcImNhbid0IGxpdmUgd2l0aG91dFwiIDogXCJ0b3VjaCBteXNlbGYgYWJvdXRcIixcclxuICAgIFwiY2FuJ3QgYmUgd2l0aG91dFwiIDogXCJ0b3VjaCBteXNlbGYgYWJvdXRcIixcclxuICAgIFwiY291bGQgbmV2ZXIgYmUgd2l0aG91dFwiIDogXCJjYW4ndCB3b3JrIGFuYWwgYmVhZHMgd2l0aG91dFwiLFxyXG4gICAgXCJubyBtYXR0ZXJcIiA6IFwiaXJyZWdhcmRsZXNzIG9mXCIsXHJcbiAgICBcIndpbGwgYmUgdGhlcmVcIiA6IFwic3RpY2sgbGlrZSBzaGl0XCIsXHJcbiAgICBcIndpbGwgYWx3YXlzIGJlIHRoZXJlXCIgOiBcInN0aWNrIGxpa2Ugd2V0IHNoaXRcIixcclxuICAgIFwiaG9sZGluZyB0aGVtIGNsb3NlIHRvXCIgOiBcImhhbmRjdWZmaW5nIHRoZW0gdG9cIixcclxuICAgIFwiYnkgeW91ciBzaWRlXCIgOiBcIm9uIHlvdXIgYXNzXCIsXHJcbiAgICBcImJ5IG15IHNpZGVcIiA6IFwib24gbXkgYXNzXCIsXHJcbiAgICBcImJ5IGhpcyBzaWRlXCIgOiBcIm9uIGhpcyBhc3NcIixcclxuICAgIFwiYnkgaGVyIHNpZGVcIiA6IFwib24gaGVyIGFzc1wiLFxyXG4gICAgXCJsZWF2ZSB5b3VyIHNpZGVcIiA6IFwiZ2V0IG9mZiB5b3VyIGFzc1wiLFxyXG4gICAgXCJsZWF2ZSBteSBzaWRlXCIgICA6IFwiZ2V0IG9mZiBteSBhc3NcIixcclxuICAgIFwibGVhdmUgaGlzIHNpZGVcIiAgOiBcImdldCBvZmYgaGlzIGFzc1wiLFxyXG4gICAgXCJsZWF2ZSBoZXIgc2lkZVwiICA6IFwiZ2V0IG9mZiBoZXIgYXNzXCIsXHJcbiAgICBcImRvZXNuJ3QgaGFwcGVuIG92ZXJcIiA6IFwiY2FydHdoZWVscyBzdHJhaWdodCBhY3Jvc3NcIixcclxuICAgIFwibWVhbnMgbWFueSB0aGluZ3NcIiA6IFwiaXMgYmVzdCBkZXNjcmliZWQgd2l0aCBsaWVzXCIsXHJcbiAgICBcImxheWluZyBpbiBiZWRcIiA6IFwidGFraW5nIGEgc2hpdFwiLFxyXG4gICAgXCJwcm9taXNlXCIgOiBcImxpZVwiLFxyXG4gICAgXCJsaWFyXCIgOiBcImZpYmJlclwiLFxyXG4gICAgXCJsaWVcIiA6IFwiZmliXCIsXHJcbiAgICBcImxpZXNcIiA6IFwiZmlic1wiLFxyXG4gICAgXCJ3aGF0J3MgdGhlIHBvaW50XCIgOiBcInRoZSBmdWNrcyB0aGlzIG1lYW5cIixcclxuICAgIFwiaXQgbXVzdCBiZSB0cnVlXCIgOiBcImZvciByZWFsICduJyBzaGl0XCIsXHJcbiAgICBcIndoYXQgcGVvcGxlIHNheVwiIDogXCJtdXRoYXBodWtrYXMgYmUgdGFsa2luXCIsXHJcbiAgICBcImV0Y2hlZFwiIDogXCJncm91bmRcIixcclxuICAgIFwiZG9uJ3QgaGF2ZSBhIGNsdWVcIiA6IFwiZ290IHNoaXQgdHdpc3RlZFwiLFxyXG4gICAgXCJ2aXNjaW91cyBjeWNsZVwiIDogXCJjbHVzdGVyZnVja1wiLFxyXG4gICAgXCJkb24ndCBuZWVkXCIgOiBcImNvdWxkIGdpdmUgYSBmdWNrIGFib3V0XCIsXHJcbiAgICBcInJhdmVuXCIgOiBcInBpZ2VvblwiLFxyXG4gICAgXCJ0byBnZXQgYXdheVwiIDogXCJ0byBmdWNraW5nIHJ1blwiLFxyXG4gICAgXCJ0byBhIGJldHRlclwiIDogXCJmb3Igc29tZSBnbGl0dGVyZWRcIixcclxuICAgIFwiYmVhdXRpZnVsIGZhY2VcIiA6IFwiZW5vcm1vdXMgdGl0c1wiLFxyXG4gICAgXCJtaWdodCBhcyB3ZWxsXCIgOiBcIm9oIGZ1Y2sgSSBvdWdodHRhXCIsXHJcbiAgICBcInRoZSBmaXJzdCBtb21lbnRcIiA6IFwic3RyYWlnaHRhd2F5XCIsXHJcbiAgICBcImFzIHdlbGxcIiA6IFwiYWxzb1wiLFxyXG4gICAgXCJzbyBnb29kXCIgOiBcIm5lYXRvXCIsXHJcbiAgICBcImNvdWxkIGRvIGFueXRoaW5nXCIgOiBcImlzIGZ1Y2tpbmcgaW5zYW5lXCIsXHJcbiAgICBcInNldCB0aGUgbW9vZFwiIDogXCJ3aGlwIGl0IG91dFwiLFxyXG4gICAgXCJiYWJ5IGlmXCIgOiBcImxvb2sgYml0Y2gsXCIsXHJcbiAgICBcInRocm91Z2ggeW91ciBoYWlyXCIgOiBcInVwc2lkZSB5b3VyIGhlYWRcIixcclxuICAgIFwiZW50ZXJlZCB0aGUgaG91c2Ugb2ZcIiA6IFwiZ290IHVwIGluIHRoZSBiYXJuIGZvclwiLFxyXG4gICAgXCJhbHdheXMgbG92ZSB5b3UgdGhlIHNhbWVcIiA6IFwiYWx3YXlzIGxvdmUgeW91IGxpa2UgbXkgb3RoZXIgc3Vja2Vyc1wiLFxyXG4gICAgXCJraXNzaW5nIG90aGVyXCIgOiBcImdvaW5nIGRvd24gb25cIixcclxuICAgIFwibmV2ZXIgdGhvdWdodCB5b3Ugd291bGQgZG8gdGhhdFwiIDogXCJnb3QgdHVybmVkIG91dCBsaWtlIGEgZHVtYiBmdWNrXCIsXHJcbiAgICBcImxheWluZyBvbiB0aGUgZmxvb3JcIiA6IFwiYmVnZ2luZyBmb3IgaXRcIixcclxuICAgIFwiZmlyc3QgbGFpZCBleWVzIG9uXCIgOiBcImZpcnN0IHRyaWVkIGdyb3BpbmdcIixcclxuICAgIFwibW9zdCBwZW9wbGUgY2FuIG9ubHlcIiA6IFwibW9zdCBmcmVha3MgYW5kIGRvcGUgZmllbmRzXCIsXHJcbiAgICBcInlvdSB3ZXJlIHRoZSBvbmVcIiA6IFwieW91IHdlcmUgbXkgdGFyZ2V0XCIsXHJcbiAgICBcInN0YW5kaW5nIG91dCBmcm9tIHRoZSBjcm93ZFwiIDogXCJ3b2JibGluZyBsaWtlIGFuIGVsZXBoYW50IG9uIGEgYmljeWNsZVwiLFxyXG4gICAgXCJzdG9vZCBvdXQgZnJvbSB0aGUgY3Jvd2RcIiA6IFwiamlnZ2xlZCBsaWtlIGEgamVsbG8gU2FudGFcIixcclxuICAgIFwic3RhbmQgb3V0IGZyb20gdGhlIGNyb3dkXCIgOiBcImxvb2sgbGlrZSBhIGphY2thc3NcIixcclxuICAgIFwic3RhbmRzIG91dCBmcm9tIHRoZSBjcm93ZFwiIDogXCJzbWVsbHMgbGlrZSBvbGQgZGlja1wiLFxyXG4gICAgXCJpJ3ZlIG5ldmVyIGZlbHQgdGhpcyB3YXlcIiA6IFwiaSd2ZSBkb25lIHRoaXNcIixcclxuICAgIFwid2l0aCBldmVyeSBmaWJlclwiIDogXCJmcm9tIHBpdGh5IHBpdHNcIixcclxuICAgIFwid2FuZGVyXCIgOiBcInN0dW1ibGVcIixcclxuICAgIFwiaGF1bnRcIiA6IFwic3RhbGtcIixcclxuICAgIFwibWFza1wiIDogXCJ0cmFzaGJhZ1wiLFxyXG4gICAgXCJkZW1vbmljIGFuZ2VsXCIgOiBcImFzcyBwaXJhdGVcIixcclxuICAgIFwiYW5nZWxpYyBkZW1vblwiIDogXCJhc3MgcGlyYXRlXCIsXHJcbiAgICBcImN1bm5pbmdcIiA6IFwiZGVzcGVyYXRlXCIsXHJcbiAgICBcImRhbmdlcm91c1wiIDogXCJjb2NrIGNhdGNoaW5nXCIsXHJcbiAgICBcImRlbWktZ29kXCIgOiBcInB1bmsgYml0Y2hcIixcclxuICAgIFwiZGVtaWdvZFwiIDogXCJwdW5rIGJpdGNoXCIsXHJcbiAgICBcIm1vcnRhbFwiIDogXCJxdWVlclwiLFxyXG4gICAgXCJpbW1vcnRhbFwiIDogXCJ3aGlueVwiLFxyXG4gICAgXCJiZXRyYXlhbFwiIDogXCJnYW1lXCIsXHJcbiAgICBcImJldHJheVwiIDogXCJzY3Jld1wiLFxyXG4gICAgXCJnYXZlIHVwIG9uXCIgOiBcImRvbid0IGdpdmUgYSBmdWNrIGFib3V0XCIsXHJcbiAgICBcImdpdmUgdXAgb25cIiA6IFwid29uJ3QgZ2l2ZSBhIGZ1Y2sgYWJvdXRcIixcclxuICAgIFwiZ2l2ZW4gdXAgb25cIiA6IFwiZG9uJ3QgZ2l2ZSBhIGZ1Y2sgYWJvdXRcIixcclxuICAgIFwiZ2l2aW5nIHVwIG9uXCIgOiBcImFpbid0IGdpdmluIGEgZnVjayBhYm91dFwiLFxyXG4gICAgXCJjb2ZmaW5cIiA6IFwidG9ib2dhblwiLFxyXG4gICAgXCJiZWF1dGlmdWxcIiA6IFwiZ2F1ZHlcIixcclxuICAgIFwidGhlIGJlc3RcIiA6IFwidGhlIGJhZGRlc3RcIixcclxuICAgIFwic2VsZmlzaFwiIDogXCJ0aGlldmluZ1wiLFxyXG4gICAgXCJ3YWxrZWQgb3V0XCIgOiBcIm5hcnJvd2x5IGVzY2FwZWRcIixcclxuICAgIFwid2FsayBvdXRcIiA6IFwibmFycm93bHkgZXNjYXBlXCIsXHJcbiAgICBcIndhbGtpbmcgb3V0XCIgOiBcIm5hcnJvd2x5IGVzY2FwaW5nXCIsXHJcbiAgICBcImdvdCBpbiB5b3VyIHdheVwiIDogXCJnb3QgYWxsIHVwIGluIHlvdXIgc2hpdFwiLFxyXG4gICAgXCJ0cnlcIiA6IFwic2hvb3RcIixcclxuICAgIFwidGhlIHBvaW50IG9mIG5vIHJldHVyblwiIDogXCJ0aGUgZmF0IGdpcmxzIGJlZHJvb29tIGRvb3JcIixcclxuICAgIFwib25seSB3YW50ZWRcIiA6IFwiYmVnZ2VkIGZvclwiLFxyXG4gICAgXCJndWVzcyBpdCBkb2Vzbid0IG1hdHRlclwiIDogXCJrbm93IHRoaXMgc2hpdCBpcyBwb2ludGxlc3NcIixcclxuICAgIFwibG9vayBiYWNrXCIgOiBcImxpY2sgd2luZG93c1wiLFxyXG4gICAgXCJwYXRoXCIgOiBcInNpZGV3YWxrXCIsXHJcbiAgICBcInNoaW5lXCIgOiBcImJsaW5nXCIsXHJcbiAgICBcImluIHRoZSBtaWRkbGUgb2ZcIiA6IFwiYWxsIHVwIGluXCIsXHJcbiAgICBcImRlZXAgZG93biBpbnNpZGVcIiA6IFwiaW4gdGhlIGJvdHRvbSBvZiB0aGUgdGFua1wiLFxyXG4gICAgXCJwaWVjZSBieSBwaWVjZVwiIDogXCJvbmUgaGFuZGpvYiBhdCBhIHRpbWVcIixcclxuICAgIFwiYXVyYVwiIDogXCJzdGVuY2hcIixcclxuICAgIFwiY2FuZGxlXCIgOiBcImdsb3dzdGlja1wiLFxyXG4gICAgXCJmb3IgaGVyXCIgOiBcInRvIHRoYXQgYnJvYWRzXCIsXHJcbiAgICBcImZvciBzaGVcIiA6IFwiJ2NhdXNlIHRoZSBjdW50XCIsXHJcbiAgICBcImZvciBoZVwiIDogXCJ0aGlzIGR1bWIgbW90aGVyIGZ1Y2tlclwiLFxyXG4gICAgXCJmb3Jlc3RcIiA6IFwiY2FtcGdyb3VuZFwiLFxyXG4gICAgXCJoYW5kIGluIGhhbmRcIiA6IFwiY29jayB0byBqYXdcIixcclxuICAgIFwiaGFuZCB0byBob2xkXCIgOiBcIm51dHMgdG8gZ3JpcFwiLFxyXG4gICAgXCJnaXJsIG1lZXRzIGJveVwiIDogXCJob3JueSBraWRzIGhvb2sgdXBcIixcclxuICAgIFwiYm95IG1lZXRzIGdpcmxcIiA6IFwiaG9ybnkga2lkcyBob29rIHVwXCIsXHJcbiAgICBcInN1bm55XCIgOiBcInN3ZWx0ZXJpbmdcIixcclxuICAgIFwic28gbmVydm91c1wiIDogXCJzbyBmdWNraW5nIGRydW5rXCIsXHJcbiAgICBcImtpc3NcIiA6IFwic2xhcFwiLFxyXG4gICAgXCJmaW5nZXJ0aXBzXCIgOiBcImNoaWNrZW4gbnVnZ2V0c1wiLFxyXG4gICAgXCJ0ZWxsIHlvdSBpJ20gZmluZVwiIDogXCJzY3JlbSBJJ00gRlVDS0lOIE9LXCIsXHJcbiAgICBcIndyaXRlXCIgOiBcInNjcmF3bFwiLFxyXG4gICAgXCJ3cml0dGVuXCIgOiBcInNjcmF3bGVkXCIsXHJcbiAgICBcIndyb3RlXCIgOiBcInNjcmF3bGVkXCIsXHJcbiAgICBcImZpcnN0IG9mIGFsbFwiIDogXCJtbS1rYXlcIixcclxuICAgIFwiYnJpbmcgZm9ydGhcIiA6IFwid2hpcCBvdXRcIixcclxuICAgIFwiaW50byB0aGUgbGlnaHRcIiA6IFwib24gdG8gdGhlIGxpZ2h0XCIsXHJcbiAgICBcInRoZSBvbmx5IG9uZVwiIDogXCJmdWNraW5nIHN0dXBpZFwiLFxyXG4gICAgXCJ0byB0aGUgbGlnaHRcIiA6IFwib3V0IGluIHB1YmxpY1wiLFxyXG4gICAgXCJ0YWxrXCIgOiBcImN1c3NcIixcclxuICAgIFwiZnVsbCBvZiBsaWZlXCIgOiBcImZ1bGwgb2Ygc2hpdFwiLFxyXG4gICAgXCJjYW4ndCBmaW5kIHRoZSB3b3JkcyB0byBzYXlcIiA6IFwiY291bGQgYmx1cnQgb3V0IHNvbWUgZHVtYiBzaGl0XCIsXHJcbiAgICBcImNvbnN1bWVcIiA6IFwic3Vja1wiLFxyXG4gICAgXCJjb25zdW1pbmdcIiA6IFwic3Vja2luZ1wiLFxyXG4gICAgXCJwaWxsb3dcIiA6IFwic3RvbmVcIixcclxuICAgIFwiYWR2aWNlXCIgOiBcImJ1bGxzaGl0XCIsXHJcbiAgICBcInVuaXZlcnNlXCIgOiBcInRvaWxldCBib3dsXCIsXHJcbiAgICBcImVsZGVyXCIgOiBcIm9sZCBmb2xrXCIsXHJcbiAgICBcIm1hZ2lja1wiIDogXCJkZWx1c2lvblwiLFxyXG4gICAgXCJtYWdpY1wiIDogXCJob3BlXCIsXHJcbiAgICBcImFyY2FuZVwiIDogXCJmb29saXNoXCIsXHJcbiAgICBcInNwZWFrIG9mXCIgOiBcInRhbGsgYWJvdXRcIixcclxuICAgIFwic2hhbGxcIiA6IFwic2hvdWxkLXdpbGxcIixcclxuICAgIFwib2J0YWluXCIgOiBcImdldFwiLFxyXG4gICAgXCJiYXR0bGVcIiA6IFwic3F1YWJibGVcIixcclxuICAgIFwibWlkbmlnaHRcIiA6IFwiZGF5YnJlYWtcIixcclxuICAgIFwic29ycm93XCIgOiBcIndoaW1wZXJcIixcclxuICAgIFwiY3JpbXNvblwiIDogXCJhenVyZVwiLFxyXG4gICAgXCJibGFja1wiIDogXCJ5ZWxsb3dcIixcclxuICAgIFwid29uJ3QgbWFrZSBpdCB0aHJvdWdoXCIgOiBcImNvdWxkIHNoaW1teSBwYXN0XCIsXHJcbiAgICBcIm5pZ2h0XCIgOiBcImJlZHRpbWVcIixcclxuICAgIFwiZGF5XCIgOiBcIm1vcm5pbmdcIixcclxuICAgIFwiZnJhZ2lsZVwiIDogXCJzdHVyZHlcIixcclxuICAgIFwiY3JhY2tcIiA6IFwibWVuZFwiLFxyXG4gICAgXCJzb2xpdHVkZVwiIDogXCJhbWJpYW5jZVwiLFxyXG4gICAgXCJ0b3JtZW50XCIgOiBcInRpY2tsZVwiLFxyXG4gICAgXCJpbmNhbnRhdGlvblwiIDogXCJtdWNoIHlhbW1lcmluZ1wiLFxyXG4gICAgXCJob3BlbGVzc1wiIDogXCJwaXRpZnVsXCIsXHJcbiAgICBcImRlcHJlc3NpbmdcIiA6IFwiaW5lYnJpYXRpbmdcIixcclxuICAgIFwiZGVwcmVzc2VkXCIgOiBcImRydW5rXCIsXHJcbiAgICBcImRlcHJlc3Npb25cIiA6IFwic28gbXVjaCBib296ZVwiLFxyXG4gICAgXCJzYWRkZW5lZFwiIDogXCJtYWRlIGZsYWNjaWRcIixcclxuICAgIFwic2FkbmVzc1wiIDogXCJpbXBvdGVuY2VcIixcclxuICAgIFwibmV2ZXJlbmRpbmdcIiA6IFwibmV2ZXIgZW5kaW5nXCIsXHJcbiAgICBcIm5ldmVyIGVuZGluZ1wiIDogXCJyZWxlbnRsZXNzXCIsXHJcbiAgICBcIm5ldmVyIGdvaW5nXCIgOiBcImZ1Y2tlZCBmb3IgdHJ5aW5nXCIsXHJcbiAgICBcImNoYW5nZSBvbmUgdGhpbmdcIiA6IFwiZnVjayBzb21lJ24gdXBcIixcclxuICAgIFwibmV2ZXIgZW5kXCIgOiBcImRyYWcgb25cIixcclxuICAgIFwid2lsbCBub3QgaGVhbFwiIDogXCJmZXN0ZXJzXCIsXHJcbiAgICBcIm91dHdhcmQgYXBwZWFyYW5jZVwiIDogXCJmYWNhZGVcIixcclxuICAgIFwiZW1vXCIgOiBcImNsb3NldCBob21vXCIsXHJcbiAgICBcImJsYWNrZW5lZCB3YWxsc1wiIDogXCJmaWx0aHkgcm9vbXNcIixcclxuICAgIFwiZmFyZXdlbGxcIiA6IFwiYWRpb3NcIixcclxuICAgIFwibWVldCBhZ2FpblwiIDogXCJoYXZlIGFub3RoZXIgZ28tcm91bmRcIixcclxuICAgIFwic2FkZFwiIDogXCJmbGFjY2lkXCIsXHJcbiAgICBcInNhZFwiIDogXCJpbXBvdGVudFwiLFxyXG4gICAgXCJhbWlkc3RcIiA6IFwiYWxsIHVwIGluXCIsXHJcbiAgICBcIm1pZHN0XCIgOiBcInBhbnRzXCIsXHJcbiAgICBcImtub3dsZWRnZVwiIDogXCJ0cml2aWFcIixcclxuICAgIFwia25vd25cIiA6IFwiZ290XCIsXHJcbiAgICBcImtub3dcIiA6IFwiZ2V0XCIsXHJcbiAgICBcImtuZXdcIiA6IFwiZ290XCIsXHJcbiAgICBcInBhc3Npb25hdGVcIiA6IFwiZGVsaXJpb3VzXCIsXHJcbiAgICBcInBhc3Npb25cIiA6IFwiZGVsaXJpdW1cIixcclxuICAgIFwibydcIiA6IFwidWhcIixcclxuICAgIFwib1wiIDogXCJ1aFwiLFxyXG4gICAgXCJmYW5nXCIgOiBcImRlbnR1cmVcIixcclxuICAgIFwiY3Vyc2VcIiA6IFwic3RhaW5cIixcclxuICAgIFwibG92ZVwiIDogXCJjb25mdXNlXCIsXHJcbiAgICBcInZhbXBpcmljXCIgOiBcInBlZG9waGlsaWNcIixcclxuICAgIFwidmFtcHlyZVwiIDogXCJwZWRvcGh5bGVcIixcclxuICAgIFwidmFtcGlyZVwiIDogXCJwZWRvcGhpbGVcIixcclxuICAgIFwicHJvYmxlbVwiIDogXCJ1c2VsZXNzIGNvbmNlcm5cIixcclxuICAgIFwiZmVlbFwiIDogXCJmb25kbGVcIixcclxuICAgIFwid29lXCIgOiBcImNobGFteWRpYVwiLFxyXG4gICAgXCJlbXB0eVwiIDogXCJibG9hdGVkXCIsXHJcbiAgICBcImhhdHJlZFwiIDogXCJvZGl1bVwiLFxyXG4gICAgXCJoYXRlXCIgOiBcImRpc2xpa2VcIixcclxuICAgIFwic2NhcnJlZFwiIDogXCJzdHJpYXRlZFwiLFxyXG4gICAgXCJzY2Fyc1wiIDogXCJzdHJpYWVcIixcclxuICAgIFwic2NhcmVcIiA6IFwidGlja2xlXCIsXHJcbiAgICBcInNjYXJ5XCIgOiBcInRpY2tseVwiLFxyXG4gICAgXCJzY2FyXCIgOiBcInN0cmlhXCIsXHJcbiAgICBcIndvdW5kXCIgOiBcIm91Y2hpZVwiLFxyXG4gICAgXCJzbGl0XCIgOiBcImNyZXZpY2VcIixcclxuICAgIFwic2xpY2VcIiA6IFwicGV0XCIsXHJcbiAgICBcInR3YXNcIiA6IFwiaXQgd2FzXCIsXHJcbiAgICBcImJpZyBicm90aGVyXCIgOiBcIm15IHBhcmFub2lhXCIsXHJcbiAgICBcImV0ZXJuaXR5XCIgOiBcImF3aGlsZVwiLFxyXG4gICAgXCJldGVybmFsbHlcIiA6IFwiZm9yIGEgYml0XCIsXHJcbiAgICBcImV0ZXJuYWxcIiA6IFwiaW1hZ2luZWRcIixcclxuICAgIFwicHJvcGhldFwiIDogXCJpbnNvbW5pYWNcIixcclxuICAgIFwicHJvcGhlY2llc1wiIDogXCJ3aXZlcyB0YWxlc1wiLFxyXG4gICAgXCJwcm9waGVjeVwiIDogXCJ3aXZlcyB0YWxlXCIsXHJcbiAgICBcInNvbGRpZXJcIiA6IFwibWFuaWFjXCIsXHJcbiAgICBcIm1pbGl0aWFcIiA6IFwiZ2FuZ1wiLFxyXG4gICAgXCJtaWxpdGFyeVwiIDogXCJnYW5nc3RlclwiLFxyXG4gICAgXCJtaWxpdGFudFwiIDogXCJtYW5pYWNhbFwiLFxyXG4gICAgXCJnb2RkZXNzXCIgOiBcIkt5bGVlIFN0cnV0dFwiLFxyXG4gICAgXCJoaWdoZXIgcG93ZXJcIiA6IFwiY3J1c3R5IHNvY2tcIixcclxuICAgIFwiZGFya1wiIDogXCJlZmZlcnZlc2NlbnRcIixcclxuICAgIFwiYW5jaWVudFwiIDogXCJlbGRlcmx5XCIsXHJcbiAgICBcInF1ZXN0XCIgOiBcInN0cm9sbFwiLFxyXG4gICAgXCJoZWFydGJlYXRcIiA6IFwiY29jayBiZWF0XCIsXHJcbiAgICBcImhlYXJ0XCIgOiBcImNvY2tcIixcclxuICAgIFwiYmxvb2RcIiA6IFwiZ3JlYXNlXCIsXHJcbiAgICBcImJsZWVkXCIgOiBcIndoaW5lXCIsXHJcbiAgICBcImN1dFwiIDogXCJtdXRpbGF0ZVwiLFxyXG4gICAgXCJzbGFzaFwiIDogXCJtdXRpbGF0ZVwiLFxyXG4gICAgXCJtb29ubGlnaHRcIiA6IFwibW9vbnNoaW5lXCIsXHJcbiAgICBcIm1vb25cIiA6IFwibmlnaHQgbGlnaHRcIixcclxuICAgIFwic3RlZWxcIiA6IFwibGF0ZXhcIixcclxuICAgIFwia25pZmVcIiA6IFwiZGlsZG9cIixcclxuICAgIFwicmF6b3JibGFkZVwiIDogXCJidXR0IHBsdWdcIixcclxuICAgIFwicmF6b3JcIiA6IFwiZGlsZG9cIixcclxuICAgIFwiYmxhZGVcIiA6IFwiaGFuZGxlXCIsXHJcbiAgICBcInBhaW5cIiA6IFwiaG90IHNleFwiLFxyXG4gICAgXCJlbW90aW9uYWxcIiA6IFwiY2hpbGRpc2hcIixcclxuICAgIFwiZW1vdGlvblwiIDogXCJsdWJyaWNhbnRcIixcclxuICAgIFwidGVhcmRyb3BcIiA6IFwidGVhciBkcm9wXCIsXHJcbiAgICBcInRlYXJcIiA6IFwic3Blcm1lXCIsXHJcbiAgICBcImNhc3RsZVwiIDogXCJjaGF0ZWF1XCIsXHJcbiAgICBcIndvcmxkXCIgOiBcImhhbmQgdG93ZWxcIixcclxuICAgIFwiZGVhZFwiIDogXCJpbmVydFwiLFxyXG4gICAgXCJnb29kYnllXCIgOiBcInBlYWNlIHknYWxsXCIsXHJcbiAgICBcImdvb2QtYnllXCIgOiBcImdldCB0aGUgZnVjayBvdXRcIixcclxuICAgIFwiZ29vZCBieWVcIiA6IFwiZnVjayBvZmZcIixcclxuICAgIFwiZGVhdGhcIiA6IFwiU2FudGFcIixcclxuICAgIFwicGFsZVwiIDogXCJzZXh5XCIsXHJcbiAgICBcImRyaWZ0XCIgOiBcImhpbS1oYXdcIixcclxuICAgIFwiZmFkZVwiIDogXCJoaW0taGF3XCIsXHJcbiAgICBcImZsZXNoXCIgOiBcInR3aW5raWVcIixcclxuICAgIFwiY29ycHNlXCIgOiBcIm1hbm5lcXVpblwiLFxyXG4gICAgXCJza2luXCIgOiBcInR3aW5raWVzXCIsXHJcbiAgICBcInB1dHJpZFwiIDogXCJwbGVhc2FudFwiLFxyXG4gICAgXCJicmVhdGhlXCIgOiBcInBhdXNlIGF3a3dhcmRseVwiLFxyXG4gICAgXCJicmVhdGhcIiA6IFwiYXdrd2FyZCBwYXVzZVwiLFxyXG4gICAgXCJzdG9wcFwiIDogXCJwdXNoXCIsXHJcbiAgICBcInN0b3BcIiA6IFwicHVzaFwiLFxyXG4gICAgXCJzY3JlYW1cIiA6IFwiZ3J1bnRcIixcclxuICAgIFwidGhpbmtcIiA6IFwic2NoZW1lXCIsXHJcbiAgICBcInNwaXJpdHVhbFwiIDogXCJiYW5hbmEgY3JhdmluZ1wiLFxyXG4gICAgXCJzcGlyaXRcIiA6IFwiYmFuYW5hXCIsXHJcbiAgICBcInNvdWxcIiA6IFwiYmFuYW5hXCIsXHJcbiAgICBcImdob3N0XCIgOiBcImltYWdpbmFyeSBmcmllbmRcIixcclxuICAgIFwibW9uc3RlclwiIDogXCJkaXNsZXhpYyBsb3ZlclwiLFxyXG4gICAgXCJiZWFzdFwiIDogXCJlcmVjdGlvblwiLFxyXG4gICAgXCJkZW1vblwiIDogXCJoYXJkLW9uXCIsXHJcbiAgICBcImFuZ2VsXCIgOiBcInBvcm4gc3RhclwiLFxyXG4gICAgXCJzaG9vdGluZyBzdGFyXCIgOiBcInN3aWZ0IG1pc3NpbGVcIixcclxuICAgIFwic3RhclwiIDogXCJtaXNzaWxlXCIsXHJcbiAgICBcImxvc3RcIiA6IFwiYXJvdXNlZFwiLFxyXG4gICAgXCJ0aW1lXCIgOiBcInRocm9iYmluZ1wiLFxyXG4gICAgXCJjaGVla1wiIDogXCJydW1wXCIsXHJcbiAgICBcImZpbmdlcnNcIiA6IFwic2F1c2FnZVwiLFxyXG4gICAgXCJkYXlkcmVhbVwiIDogXCJmYW50YXNpemVcIixcclxuICAgIFwidGhlIHNwcmluZ1wiIDogXCJ0dWJlIHNvY2tcIixcclxuICAgIFwic3ByaW5nXCIgOiBcInR1YmUgc29ja3NcIixcclxuICAgIFwiaWxsdXNpb25cIiA6IFwiZHJ1bmtlbiBtaXN0YWtlXCIsXHJcbiAgICBcImxvbmVsaW5lc3NcIiA6IFwiYXJvdXNhbFwiLFxyXG4gICAgXCJsb25lbHlcIiA6IFwiaG9ybnlcIixcclxuICAgIFwiYWxvbmVcIiA6IFwiZWNzdGF0aWNcIixcclxuICAgIFwibG9uZVwiIDogXCJzaW5nbGVcIixcclxuICAgIFwicGVyZmVjdFwiIDogXCJmdWNrZWRcIixcclxuICAgIFwiaGlkZGVuXCIgOiBcInN0YXNoZWRcIixcclxuICAgIFwibXlzdGVyeVwiIDogXCJuZW9uIHNpZ25cIixcclxuICAgIFwibXlzdGVyaWVzXCIgOiBcIm5lb24gc2lnbnNcIixcclxuICAgIFwicm9zZVwiIDogXCJidXR0IGhvbGVcIixcclxuICAgIFwicGV0YWxcIiA6IFwiZGluZ2xlYmVycnlcIixcclxuICAgIFwiZGlmZmVyZW50XCIgOiBcImF3a3dhcmRcIixcclxuICAgIFwid3JvbmdcIiA6IFwiYnV6emluZ1wiLFxyXG4gICAgXCJmYXRlXCIgOiBcImNvaW5jaWRlbmNlXCIsXHJcbiAgICBcImNvbGRcIiA6IFwiZnV6enlcIixcclxuICAgIFwiaGVsbGZpcmVcIiA6IFwiaGVsbCBmaXJlXCIsXHJcbiAgICBcImhlbGxcIiA6IFwibXkgY29jaydzXCIsXHJcbiAgICBcImNyeXN0YWxcIiA6IFwiYmVkYXpsZXJcIixcclxuICAgIFwicmFpbmJvd1wiIDogXCJwaXp6YXp6XCIsXHJcbiAgICBcInJhaW5cIiA6IFwiaml6enVtXCIsXHJcbiAgICBcInN0b3JtXCIgOiBcIm9yZ3lcIixcclxuICAgIFwid2luZFwiIDogXCJibG93XCIsXHJcbiAgICBcImJyZWV6ZVwiIDogXCJkcmFmdFwiLFxyXG4gICAgXCJicmlsbGlhbmNlXCIgOiBcInNoaW55bmVzc1wiLFxyXG4gICAgXCJicmlsbGlhbnRcIiA6IFwic2hpbnlcIixcclxuICAgIFwiZHJlYW1sYW5kXCIgOiBcIm9ic2Vzc2lvbiBpc2xhbmRcIixcclxuICAgIFwiZHJlYW1zXCIgOiBcIm9ic2Vzc2lvbnNcIixcclxuICAgIFwiZHJlYW1cIiA6IFwib2JzZXNzXCIsXHJcbiAgICBcInByaXNvblwiIDogXCJvdXRob3VzZVwiLFxyXG4gICAgXCJnb2xkZW4gcmF5XCIgOiBcImdhdWR5IHNjcmliYmxlXCIsXHJcbiAgICBcInJheVwiIDogXCJzY3JpYmJsZVwiLFxyXG4gICAgXCJkZWFkbHlcIiA6IFwiZmVydGlsZVwiLFxyXG4gICAgXCJ0cnV0aFwiIDogXCJ0cml2aWFcIixcclxuICAgIFwic3VuXCIgOiBcInllbGxvdyBkaXNrXCIsXHJcbiAgICBcImNydWVsXCIgOiBcImhhcGhhemFyZFwiLFxyXG4gICAgXCJjbG91ZFwiIDogXCJiYWxsb29uXCIsXHJcbiAgICBcInR3aW5rbGVcIiA6IFwic3Ryb2JlXCIsXHJcbiAgICBcInR3aW5rbGluZ1wiIDogXCJzdHJvYmluZ1wiLFxyXG4gICAgXCJlc2NhcGVcIiA6IFwic251Z2dsZVwiLFxyXG4gICAgXCJ1bmRlcnN0YW5kXCIgOiBcInN0cm9rZSBteSBlZ29cIixcclxuICAgIFwicmVtZW1iZXJcIiA6IFwibXVtYmxlXCIsXHJcbiAgICBcImlsbHVtaW5hdGlvblwiIDogXCJtdW1ibyBqdW1ib1wiLFxyXG4gICAgXCJyZWFsaXR5XCIgOiBcInRvaWxldCBib3dsXCIsXHJcbiAgICBcImJpbmRcIiA6IFwiY29kZGxlXCIsXHJcbiAgICBcImJvdW5kXCIgOiBcImNvZGRsZWRcIixcclxuICAgIFwidG9yblwiIDogXCJodWdnbGVkXCIsXHJcbiAgICBcImRpZWRcIiA6IFwibWFkZSBtYXJzaG1hbGxvd3NcIixcclxuICAgIFwiZGllc1wiIDogXCJtYWtlcyBtYXJzaG1hbGxvd3NcIixcclxuICAgIFwiZGllXCIgOiBcIm1ha2UgbWFyc2htYWxsb3dzXCIsXHJcbiAgICBcImR5aW5nXCIgOiBcIm1ha2luZyBtYXJzaG1hbGxvd3NcIixcclxuICAgIFwiYm9keVwiIDogXCJqaWdnbGluZyBjbHVtcFwiLFxyXG4gICAgXCJib2RpZXNcIiA6IFwiamlnZ2xpbmcgcGlsZXNcIixcclxuICAgIFwid2FyZmFyZVwiIDogXCJjaGlsZHJlbiBsYXVnaGluZ1wiLFxyXG4gICAgXCJkZWJ1dGFudGVzXCIgOiBcImhvb2tlcnNcIixcclxuICAgIFwic2xhdmVcIiA6IFwiZ2ltcFwiLFxyXG4gICAgXCJwb2V0aWNcIiA6IFwiZmxhdHVsZW50XCIsXHJcbiAgICBcInBvZXRyeVwiIDogXCJiYWQgZ2FzXCIsXHJcbiAgICBcInBvZXRcIiA6IFwiaG9ib1wiLFxyXG4gICAgXCJwb2VtXCIgOiBcInNjcmliYmxlXCIsXHJcbiAgICBcImNvdW50cnlcIiA6IFwiYmF0aHJvb21cIixcclxuICAgIFwibmFrZWRcIiA6IFwidW5zaGF2ZWRcIixcclxuICAgIFwiamVzdXMgY2hyaXN0XCIgOiBcImppbSBib2IganJcIixcclxuICAgIFwiY2hyaXN0XCIgOiBcImppbSBib2IganJcIixcclxuICAgIFwiamVzdXNcIiA6IFwiamltIGJvYiBqclwiLFxyXG4gICAgXCJoZWFsZXJcIiA6IFwiZm9uZGxlclwiLFxyXG4gICAgXCJnb2RzXCIgOiBcImppbSBib2Igc3IgZXQgYWwuXCIsXHJcbiAgICBcImdvZFwiIDogXCJqaW0gYm9iIHNyXCIsXHJcbiAgICBcIndlYXBvblwiIDogXCJwb2NrZXQgcHVzc3lcIixcclxuICAgIFwiZXhpc3RlbmNlXCIgOiBcIndoYXRldmVyXCIsXHJcbiAgICBcIm1pbmlvblwiIDogXCJob3JueSBwaXJhdGVcIixcclxuICAgIFwicmFwaW5nXCIgOiBcIndoYXRcIixcclxuICAgIFwicmFwZVwiIDogXCJ3aGF0XCIsXHJcbiAgICBcImdyYXZlc3RvbmVcIiA6IFwibWlsZSBtYXJrZXJcIixcclxuICAgIFwiZ3JhdmVcIiA6IFwicGVyc29uYWwgc3BhY2VcIixcclxuICAgIFwiaW5maW5pdGVcIiA6IFwiYWJzdHJhY3RcIixcclxuICAgIFwic3VpY2lkZVwiIDogXCJtdXJkZXJcIixcclxuICAgIFwiYnJpbmtcIiA6IFwiYm9yZGVyXCIsXHJcbiAgICBcImNyaWVkXCIgOiBcImNhbWVcIixcclxuICAgIFwiY3JpZXNcIiA6IFwic2tlZXRzXCIsXHJcbiAgICBcImNyeWluZ1wiIDogXCJjdW1taW5nXCIsXHJcbiAgICBcImhhZCBkb25lXCIgOiBcImRvbmUgZGlkXCIsXHJcbiAgICBcImNyeVwiIDogXCJjdW1cIixcclxuICAgIFwiY3J5cHRpY1wiIDogXCJkcnVua2VuXCIsXHJcbiAgICBcImNyeXB0XCIgOiBcInVyaW5hbFwiLFxyXG4gICAgXCJteXN0aWNcIiA6IFwidHJhbnNleHVhbFwiLFxyXG4gICAgXCJiYWxhbmNlZCBpbmRpdmlkdWFsXCIgOiBcInBzeWNob1wiLFxyXG4gICAgXCJiYWxhbmNlZCBwZXJzb25cIiA6IFwicHN5Y2hvXCIsXHJcbiAgICBcImJhbGFuY2VkIG1hblwiIDogXCJwc3ljaG9cIixcclxuICAgIFwiYmFsYW5jZWQgd29tYW5cIiA6IFwicHN5Y2hvXCIsXHJcbiAgICBcIndpc2RvbVwiIDogXCJidWxsIHNoaXRcIixcclxuICAgIFwid2lzZVwiIDogXCJidWxsIHNoaXR0aW5nXCIsXHJcbiAgICBcImJsZXNzZWQgYmVcIiA6IFwic3VjayBlZ2dzXCIsXHJcbiAgICBcImVuZXJneVwiIDogXCJqdWljZVwiLFxyXG4gICAgXCJyaWRkbGVcIiA6IFwicG9sa2EgZG90XCIsXHJcbiAgICBcIm15IGxvcmRcIiA6IFwic3dlZXQgcGFsbVwiLFxyXG4gICAgXCJzbyBtb3RlIGl0IGJlXCIgOiBcIml0J3MgcmVhbCBpbiBteSBoZWFkXCIsXHJcbiAgICBcInByYXlcIiA6IFwibXVybXVyXCIsXHJcbiAgICBcIm5vbWFkXCIgOiBcImRydW5rIGhvYm9cIixcclxuICAgIFwiZGVzdGlueVwiIDogXCJ0YXhlc1wiLFxyXG4gICAgXCJzd29yZFwiIDogXCJkaWxkb1wiLFxyXG4gICAgXCJ2b2lkXCIgOiBcImJ1Y2tldFwiLFxyXG4gICAgXCJqdXN0XCIgOiBcInN1cmVcIixcclxuICAgIFwidmVuZ2VhbmNlXCIgOiBcInNsYXAgaGFwcGluZXNzXCIsXHJcbiAgICBcImF2ZW5nZVwiIDogXCJnaXQgcm93ZHkgZm9yXCIsXHJcbiAgICBcInZlbmdlXCIgOiBcIi1yb3dkeS1cIixcclxuICAgIFwiaGVhdmVuc1wiIDogXCJza2llc1wiLFxyXG4gICAgXCJoZWF2ZW5cIiA6IFwic2t5XCIsXHJcbiAgICBcImVuZGxlc3NcIiA6IFwicmVhbCBsb25nXCIsXHJcbiAgICBcInZhbGxleVwiIDogXCJkaXRjaFwiLFxyXG4gICAgXCJhcmR1b3VzXCIgOiBcIm5vdCBlYXN5XCIsXHJcbiAgICBcInRvdWNoXCIgOiBcImdyb3BlXCIsXHJcbiAgICBcIndyZXRjaGVkXCIgOiBcInNrZWV6eVwiLFxyXG4gICAgXCJ3cmV0Y2hcIiA6IFwic2tlZXplXCIsXHJcbiAgICBcImF3ZVwiIDogXCJmZWFyZnVsIHJldmVyZW5jZVwiLFxyXG4gICAgXCJyaXR1YWxcIiA6IFwiYmFuYW5hIGRhbmNlXCIsXHJcbiAgICBcImJlaG9sZFwiIDogXCJvb2dsZVwiLFxyXG4gICAgXCJ2ZWlsXCIgOiBcImRpc2d1aXNlXCIsXHJcbiAgICBcInZpc3RhXCIgOiBcInNjZW5lXCIsXHJcbiAgICBcImFsd2F5c1wiIDogXCJ1c3VhbGx5XCIsXHJcbiAgICBcImJlbGlldmVcIiA6IFwiYnV5XCIsXHJcbiAgICBcIndpc2hcIiA6IFwid2FudFwiLFxyXG4gICAgXCJmZWxsXCIgOiBcImZsb3BwZWRcIixcclxuICAgIFwiZmFsbFwiIDogXCJmbG9wXCIsXHJcbiAgICBcInJpZ2h0ZW91c1wiIDogXCJhcnJvZ2FudFwiLFxyXG4gICAgXCJ3YXJyaW9yXCIgOiBcImtpdHRlblwiLFxyXG4gICAgXCJ1bmNhcmluZ1wiIDogXCJwcmlja2lzaFwiLFxyXG4gICAgXCJjYXJlIHRvIGdpdmVcIiA6IFwic2hpdCB0byBnaXZlXCIsXHJcbiAgICBcInRha2UgY2FyZSBvZlwiIDogXCJkZWNpbWF0ZVwiLFxyXG4gICAgXCJ0YWtpbmcgY2FyZVwiIDogXCJmb3JnZXRpbmdcIixcclxuICAgIFwidGFrZXMgY2FyZVwiIDogXCJmb3JnZXRzXCIsXHJcbiAgICBcInRha2UgY2FyZVwiIDogXCJmb3JnZXRcIixcclxuICAgIFwiZm9yZ2V0XCIgOiBcImRpc3JlbWVtYmVyXCIsXHJcbiAgICBcImNhcmluZ1wiIDogXCJnaXZpbmcgYSBzaGl0XCIsXHJcbiAgICBcImNhcmVkXCIgOiBcImdhdmUgYSBzaGl0XCIsXHJcbiAgICBcImNhcmVcIiA6IFwiZ2l2ZSBhIHNoaXRcIixcclxuICAgIFwid2llbGRcIiA6IFwiamVya1wiLFxyXG4gICAgXCJvY2VhblwiIDogXCJzZXdlclwiLFxyXG4gICAgXCJzZWFcIiA6IFwiYmF0aFwiLFxyXG4gICAgXCJiYXlcIiA6IFwic2lua1wiLFxyXG4gICAgXCJ0d2lsaWdodFwiIDogXCJtb29uc2hpbmVcIixcclxuICAgIFwiYnJva2VuXCIgOiBcImJlYXRlblwiLFxyXG4gICAgXCJicm9rZVwiIDogXCJiZWF0XCIsXHJcbiAgICBcImJyZWFrXCIgOiBcImJlYXRcIixcclxuICAgIFwiZm9yZXZlclwiIDogXCJzbyB2ZXJ5XCIsXHJcbiAgICBcImh1bWFuIHJhY2VcIiA6IFwiZ2VyYmlsIGVtcGlyZVwiLFxyXG4gICAgXCJuaWdodG1hcmVcIiA6IFwidGFudHJ1bVwiLFxyXG4gICAgXCJzdWZmZXJcIiA6IFwicGlyb3VldHRlXCIsXHJcbiAgICBcIm15c2VsZlwiIDogXCJteSBtdWNobmVzc1wiLFxyXG4gICAgXCJtZVwiIDogXCJpXCIsXHJcbiAgICBcIm15XCIgOiBcImkncyBcIixcclxuICAgIFwibWluZVwiIDogXCJpJ3NcIixcclxuICAgIFwid2FzIGlcIiA6IFwid2VyZSBpXCIsXHJcbiAgICBcImFtIGlcIiA6IFwiYXJlIGlcIixcclxuICAgIFwiaW1cIiA6IFwiaSdtXCIsXHJcbiAgICBcImknbVwiIDogXCJpIGFyZVwiLFxyXG4gICAgXCJpJ3ZlXCIgOiBcImkgaGF2ZVwiLFxyXG4gICAgXCJpJ2xsXCIgOiBcImkgd2lsbFwiLFxyXG4gICAgXCJpIGFtXCIgOiBcImkgYXJlXCIsXHJcbiAgICBcInlvdXJzZWxmXCIgOiBcInlvdSdzIG11Y2huZXNzXCIsXHJcbiAgICBcInlvdXJzXCIgOiBcInlvdSdzXCIsXHJcbiAgICBcInlvdXJcIiA6IFwieW91J3NcIixcclxuICAgIFwieW91IGFsbFwiIDogXCJhbGwgeW91XCIsXHJcbiAgICBcInlvdSdsbFwiIDogXCJ5b3Ugd2lsbFwiLFxyXG4gICAgXCJ5b3UndmVcIiA6IFwieW91IGhhc1wiLFxyXG4gICAgXCJ5b3UncmVcIiA6IFwieW91IGlzXCIsXHJcbiAgICBcInRoZWVcIiA6IFwieW91XCIsXHJcbiAgICBcInRoaW5lXCIgOiBcInlvdSdzXCIsXHJcbiAgICBcInRob3VcIiA6IFwieW91XCIsXHJcbiAgICBcIndlXCIgOiBcInRoZXlcIixcclxuICAgIFwidXNcIiA6IFwidGhlbVwiLFxyXG4gICAgXCJvdXJcIiA6IFwidGhlaXJcIixcclxuICAgIFwib3Vyc1wiIDogXCJ0aGVpcnNcIixcclxuICAgIFwiaVwiIDogXCJLZXZpblwiLFxyXG4gICAgXCJ5b3VcIiA6IFwiUmV0YXJkc1wiXHJcbn07XHJcbi8qKlxyXG4gKiBBY2NlcHRzIHBsYWluIHRleHQgaW5wdXQgYW5kIEdsb3Jpb3VzbHkgV1RGaWZpZXMgaXQuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDExMFxyXG4gKiBAcGFyYW0ge1N0cmluZ30gdGFyZ2V0IFRoZSB0ZXh0IHRvIFdURmlmeS5cclxuICogQHBhcmFtIHtCb29sZWFufSBvdXRwdXRIVE1MIFNwZWNpZmllcyBpZiB5b3Ugd2FudCB0aGUgb3V0cHV0XHJcbiAqICBpbiBIVE1MIGZvcm1hdC4gSWYgZmFsc2UsIHdpbGwgb3V0cHV0IHBsYWluIHRleHQuIERlZmF1bHRzXHJcbiAqICB0byBmYWxzZS5cclxuICogQHJldHVybiB7U3RyaW5nfSBSZXR1cm5zIEdlbnVpbmUgV1RGaWZpZWQgdGV4dC5cclxuICovXHJcbmF0cm9wYS53dGYud3RmaWZ5ID0gZnVuY3Rpb24gKHRhcmdldCwgb3V0cHV0SFRNTCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICBhdHJvcGEuc3VwcG9ydENoZWNrKCd3dGYnKTtcclxuICAgIFxyXG4gICAgdmFyIHJlZ2V4VmFsdWUsXHJcbiAgICAgICAgcmVwbGFjZW1lbnRUZXh0LFxyXG4gICAgICAgIG9sZFdvcmQsXHJcbiAgICAgICAgd3RmQ291bnQsXHJcbiAgICAgICAgd29yZENvdW50LFxyXG4gICAgICAgIHJldCxcclxuICAgICAgICB3b3JkO1xyXG4gICAgXHJcbiAgICBpZih0cnVlICE9PSBvdXRwdXRIVE1MKSB7XHJcbiAgICAgICAgb3V0cHV0SFRNTCA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcmV0ID0ge307XHJcbiAgICB3dGZDb3VudCA9IDA7XHJcbiAgICB0YXJnZXQgPSB0YXJnZXQudHJpbSgpO1xyXG4gICAgd29yZENvdW50ID0gYXRyb3BhLnN0cmluZy5jb3VudFdvcmRzKHRhcmdldCk7XHJcbiAgICBpZih0cnVlID09PSBvdXRwdXRIVE1MKSB7XHJcbiAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0LnJlcGxhY2UoXHJcbiAgICAgICAgICAgIC8oXFwuID8pezIsfS9naSxcclxuICAgICAgICAgICAgJzxzcGFuIHN0eWxlPVwiY29sb3IgOiBicm93biA7XCI+IFtzaGl0IHRhY29dIDwvc3Bhbj4nXHJcbiAgICAgICAgKTtcclxuICAgICAgICB0YXJnZXQgPSAnPHA+ICcgKyB0YXJnZXQucmVwbGFjZSgvKFxcclxcbnxcXHJ8XFxuKS9nLCcgPGJyLz4gJykgKyAnIDwvcD4nO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB0YXJnZXQgPSB0YXJnZXQucmVwbGFjZSgvKFxcLiA/KXsyLH0vZ2ksICcgW3NoaXQgdGFjb10gJyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIEFjY2VwdHMgcGxhaW4gdGV4dCBpbnB1dCBhbmQgR2xvcmlvdXNseSBXVEZpZmllcyBpdC5cclxuICAgICAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gICAgICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAgICAgKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAgICAgKiBAdmVyc2lvbiAyMDEzMDExMlxyXG4gICAgICogQG1ldGhvZE9mIGF0cm9wYS53dGYud3RmaWZ5LVxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBtIEZpcnN0IG1hdGNoZWQgcGF0dGVybiBpbiBzdHJpbmcgc2VhcmNoZWQuXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gc3ViMSBGaXJzdCBtYXRjaGVkIHN1YnBhdHRlcm4gaW4gc3RyaW5nIHNlYXJjaGVkLlxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHN1YjIgU2Vjb25kIG1hdGNoZWQgc3VicGF0dGVybiBpbiBzdHJpbmcgc2VhcmNoZWQuXHJcbiAgICAgKi9cclxuICAgIHJlcGxhY2VtZW50VGV4dCA9IGZ1bmN0aW9uIChtLCBzdWIxLCBzdWIyKSB7XHJcbiAgICAgICAgd3RmQ291bnQrKztcclxuICAgICAgICBzdWIxID0gYXRyb3BhLnNldEFzT3B0aW9uYWxBcmcoJycsIHN1YjEpO1xyXG4gICAgICAgIHN1YjIgPSBhdHJvcGEuc2V0QXNPcHRpb25hbEFyZygnJywgc3ViMik7XHJcbiAgICAgICAgdmFyIG91dDtcclxuICAgICAgICBpZih0cnVlID09PSBvdXRwdXRIVE1MKSB7XHJcbiAgICAgICAgICAgIG91dCA9ICc8c3BhbiBzdHlsZT1cImNvbG9yIDogcmVkIDtcIj4nICtcclxuICAgICAgICAgICAgICAgIHN1YjEgKyBhdHJvcGEud3RmLmRpY3Rpb25hcnlbd29yZF0gKyBzdWIyICtcclxuICAgICAgICAgICAgICAgICc8L3NwYW4+JztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBvdXQgPSBzdWIxICsgYXRyb3BhLnd0Zi5kaWN0aW9uYXJ5W3dvcmRdICsgc3ViMjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH07XHJcbiAgICAvLyB3b3JkIGlzIGRlZmluZWQgaW4gdGhlIGNvbnRhaW5pbmcgc2NvcGUgYW5kXHJcbiAgICAvLyBpcyBub3QgZ2xvYmFsLCBqc2hpbnQgaXMgd3JvbmdcclxuICAgIGZvciAod29yZCBpbiBhdHJvcGEud3RmLmRpY3Rpb25hcnkpIHtcclxuICAgICAgICBpZiAoYXRyb3BhLnd0Zi5kaWN0aW9uYXJ5Lmhhc093blByb3BlcnR5KHdvcmQpKSB7XHJcbiAgICAgICAgICAgIG9sZFdvcmQgPSBhdHJvcGEucmVnZXguYXBwZW5kUHJlZml4ZXNBbmRTdWZmaXhlcyh3b3JkKTtcclxuICAgICAgICAgICAgcmVnZXhWYWx1ZSA9IG5ldyBSZWdFeHAob2xkV29yZCwgJ2dpJyk7XHJcbiAgICAgICAgICAgIHRhcmdldCA9IHRhcmdldC5yZXBsYWNlKHJlZ2V4VmFsdWUsIHJlcGxhY2VtZW50VGV4dCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0Lnd0ZkNvdW50ID0gd3RmQ291bnQ7XHJcbiAgICByZXQud29yZENvdW50ID0gd29yZENvdW50O1xyXG4gICAgcmV0LnNjb3JlID0gd3RmQ291bnQgLyB3b3JkQ291bnQ7XHJcbiAgICByZXQudHh0ID0gdGFyZ2V0O1xyXG4gICAgcmV0dXJuIHJldDtcclxufTtcclxuLyoqXHJcbiAqIFdURmlmaWVzIHRoZSA8Y29kZT50ZXh0Q29udGVudDwvY29kZT4gb3IgPGNvZGU+dmFsdWU8L2NvZGU+IG9mIHRoZVxyXG4gKiAgZ2l2ZW4gZWxlbWVudCBhbmQgcmVwbGFjZXMgdGhlIGVsZW1lbnQncyBpbm5lckhUTUwgd2l0aCBhIHByZSBibG9ja1xyXG4gKiAgY29udGFpbmluZyB0aGUgcmVzdWx0cyBvZiBXVEZpZmljYXRpb24uXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRSZWZlcmVuY2UgQSByZWZlcmVuY2UgdG8gYW4gSFRNTCBFbGVtZW50LlxyXG4gKiBAcmV0dXJucyB7SFRNTEVsZW1lbnR9IFJldHVybnMgdGhlIGdpdmVuIGVsZW1lbnQgYWZ0ZXIgd3RmaWZpY2F0aW9uLlxyXG4gKiBAdmVyc2lvbiAyMDEzMDMxM1xyXG4gKi9cclxuYXRyb3BhLnd0Zi5odG1sRWxlbWVudCA9IGZ1bmN0aW9uIChlbGVtZW50UmVmZXJlbmNlKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIGF0cm9wYS5zdXBwb3J0Q2hlY2soJ3d0Zkh0bWxFbGVtZW50Jyk7XHJcbiAgICBcclxuICAgIHZhciB3dGZpZmllZCwgdHh0O1xyXG4gICAgZWxlbWVudFJlZmVyZW5jZS5pbm5lckhUTUwgPSBlbGVtZW50UmVmZXJlbmNlLmlubmVySFRNTC5yZXBsYWNlKFxyXG4gICAgICAgIC88YnI+KFxccyspPyhcXHJcXG58XFxyfFxcbik/L2csICdcXHJcXG4nKTtcclxuICAgIHR4dCA9IGVsZW1lbnRSZWZlcmVuY2UudmFsdWUgfHwgZWxlbWVudFJlZmVyZW5jZS50ZXh0Q29udGVudDtcclxuICAgIHd0ZmlmaWVkID0gYXRyb3BhLnd0Zi53dGZpZnkodHh0LCB0cnVlKTtcclxuICAgIGVsZW1lbnRSZWZlcmVuY2UuaW5uZXJIVE1MID1cclxuICAgICAgICAnPHByZSBzdHlsZT1cImNvbG9yOmJsYWNrOyBiYWNrZ3JvdW5kOndoaXRlOyB3aGl0ZS1zcGFjZTpwcmUtd3JhcDtcIj4nICtcclxuICAgICAgICB3dGZpZmllZC50eHQgK1xyXG4gICAgICAgICc8L3ByZT4nO1xyXG4gICAgcmV0dXJuIGVsZW1lbnRSZWZlcmVuY2U7XHJcbn07XHJcblxyXG5cclxuXHJcblxyXG53aGlsZShhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMubGVuZ3RoID4gMCkge1xyXG4gICAgYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLnBvcCgpKCk7XHJcbn1cclxubW9kdWxlLmV4cG9ydHMgPSBhdHJvcGE7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9kb2NzL3ZzZG9jL09wZW5MYXllcnNBbGwuanNcIi8+XHJcbnZhciBhdHJvcGEgPSByZXF1aXJlKCdhdHJvcGEtaGVhZGVyJyk7XHJcbmF0cm9wYS5zZXRBc09wdGlvbmFsQXJnID0gcmVxdWlyZSgnYXRyb3BhLXNldEFzT3B0aW9uYWxBcmcnKS5zZXRBc09wdGlvbmFsQXJnO1xyXG5hdHJvcGEucmVtb3ZlTm9kZUJ5UmVmZXJlbmNlID0gcmVxdWlyZSgnYXRyb3BhLXJlbW92ZU5vZGVCeVJlZmVyZW5jZScpLnJlbW92ZU5vZGVCeVJlZmVyZW5jZTtcclxuLypqc2xpbnRcclxuICAgIGluZGVudDogNCxcclxuICAgIG1heGVycjogNTAsXHJcbiAgICB3aGl0ZTogdHJ1ZSxcclxuICAgIGJyb3dzZXI6IHRydWUsXHJcbiAgICBkZXZlbDogdHJ1ZSxcclxuICAgIHBsdXNwbHVzOiB0cnVlLFxyXG4gICAgcmVnZXhwOiB0cnVlXHJcbiovXHJcbi8qZ2xvYmFsIGF0cm9wYSwgWFBhdGhSZXN1bHQgKi9cclxuLy8gZW5kIGhlYWRlclxyXG5cclxuXHJcbihmdW5jdGlvbiAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIGF0cm9wYS5yZXF1aXJlcyhcclxuICAgICAgICAneHBhdGgnLFxyXG4gICAgICAgIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHN1cHBvcnRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICB3aW5kb3csXHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ldmFsdWF0ZVxyXG4gICAgICAgICAgICBdLmZvckVhY2goZnVuY3Rpb24gKHByZXJlcXVpc2l0ZSkge1xyXG4gICAgICAgICAgICAgICAgaWYocHJlcmVxdWlzaXRlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdXBwb3J0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBzdXBwb3J0ZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgKTtcclxufSgpKTtcclxuXHJcbi8qKlxyXG4gKiBBbiBYcGF0aCB0b29sa2l0IGZvciBtYW5pcHVsYXRpbmcgdGhlIERPTS5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwMzEzXHJcbiAqIEBuYW1lc3BhY2UgQW4gWHBhdGggdG9vbGtpdCBmb3IgbWFuaXB1bGF0aW5nIHRoZSBET00uXHJcbiAqL1xyXG5hdHJvcGEueHBhdGggPSB7fTtcclxuLyoqXHJcbiAqIFByb2Nlc3NlcyBub2RlcyBmcm9tIHRoZSBET00gdXNpbmcgYW4gWHBhdGggZXhwcmVzc2lvbi5cclxuICogQGV4YW1wbGVcclxuICogICAvLyBTYXkgeW91IHdhbnRlZCB0byB0b3VjaCBhbGwgdGhlIGFuY2hvcnMgYW5kIGxpbmtzIGluIHdpbmRvdy5kb2N1bWVudFxyXG4gKiAgIHZhciB4cGF0aEV4cHJlc3Npb24sIGNhbGxiYWNrO1xyXG4gKiAgIHhwYXRoRXhwcmVzc2lvbiA9ICcuLy9hJztcclxuICogICBjYWxsYmFjayA9IGZ1bmN0aW9uKG9uZU5vZGUpIHtcclxuICogICAgICAgb25lTm9kZS50b3VjaGVkID0gdHJ1ZTtcclxuICogICB9XHJcbiAqICAgYXRyb3BhLnhwYXRoLnByb2Nlc3NOb2Rlc0J5WHBhdGgoXHJcbiAqICAgICAgIHhwYXRoRXhwcmVzc2lvbiwgZG9jdW1lbnQsIGRvY3VtZW50LCBjYWxsYmFjayk7XHJcbiAqICAgXHJcbiAqICAgLy8gT3Igc2F5IHlvdSBoYXZlIGFuIGlmcmFtZSwgd2l0aCB0aGUgaWQgJ215RnJhbWUnLiBJbiB0aGUgaWZyYW1lIHRoZXJlXHJcbiAqICAgLy8gaXMgYSBkaXYgd2l0aCB0aGUgaWQgbXlEaXYuXHJcbiAqICAgLy8gSGVyZSBpcyBob3cgeW91IHdvdWxkIHJlbW92ZSBhbGwgdGhlIGFuY2hvcnMgaW4gdGhhdCBkaXYuXHJcbiAqICAgdmFyIG15RnJhbWUsIHhwYXRoRXhwcmVzc2lvbiwgY29udGV4dE5vZGUsIGRvY3JlZiwgY2FsbGJhY2s7XHJcbiAqICAgbXlGcmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdteUZyYW1lJyk7XHJcbiAqICAgZG9jcmVmID0gbXlGcmFtZS5jb250ZW50V2luZG93LmRvY3VtZW50O1xyXG4gKiAgIGNvbnRleHROb2RlID0gZG9jcmVmLmdldEVsZW1lbnRCeUlkKCdteURpdicpO1xyXG4gKiAgIHhwYXRoRXhwcmVzc2lvbiA9ICcuLy9hJztcclxuICogICBjYWxsYmFjayA9IGZ1bmN0aW9uKG9uZU5vZGUpIHtcclxuICogICAgICAgYXRyb3BhLnJlbW92ZU5vZGVCeVJlZmVyZW5jZShvbmVOb2RlKTtcclxuICogICB9XHJcbiAqICAgYXRyb3BhLnhwYXRoLnByb2Nlc3NOb2Rlc0J5WHBhdGgoXHJcbiAqICAgICAgIHhwYXRoRXhwcmVzc2lvbiwgY29udGV4dE5vZGUsIGRvY3JlZiwgY2FsbGJhY2spO1xyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzAzMTNcclxuICogQHBhcmFtIHtTdHJpbmd9IHhwYXRoRXhwcmVzc2lvbiBBbiBYcGF0aCBleHByZXNzaW9uIGFzIGEgc3RyaW5nXHJcbiAqIEBwYXJhbSB7RE9NIE5vZGV9IGNvbnRleHROb2RlIE9wdGlvbmFsLiBUaGUgbm9kZSB3aGljaCBpcyB0byBzZXJ2ZSBhcyB0aGUgcm9vdFxyXG4gKiBmb3IgdGhlIHN1cHBsaWVkIFhwYXRoIGV4cHJlc3Npb24uIERlZmF1bHRzIHRvIHdoYXRldmVyIGRvY3JlZiBpcy5cclxuICogSWYgeW91IGFyZSB1c2luZyBhIHJlbGF0aXZlIHBhdGggc3VjaCBhcyA8Y29kZT4uLy9hPC9jb2RlPiBhbmQsIHlvdSBvbmx5XHJcbiAqIHdhbnQgdGhlIGFuY2hvcnMgdGhhdCBhcmUgZGVzY2VuZGFudHMgb2YgYW5vdGhlciBlbGVtZW50LCB5b3Ugd291bGRcclxuICogc3VwcGx5IGEgcmVmZXJlbmNlIHRvIHRoYXQgZWxlbWVudCBmb3IgdGhpcyBhcmd1bWVudC4gV2hlbiB1c2luZyBhXHJcbiAqIGNvbnRleHQgbm9kZSwgdGhlIGRvY3JlZiBhcmd1bWVudCBtdXN0IHJlZmVyIHRvIHRoZSBjb250ZXh0IG5vZGUnc1xyXG4gKiBjb250YWluaW5nIGRvY3VtZW50LlxyXG4gKiBAcGFyYW0ge0RPTSBEb2N1bWVudH0gZG9jcmVmIE9wdGlvbmFsLiBBIHJlZmVyZW5jZSB0byB0aGUgZG9jdW1lbnQgeW91XHJcbiAqIGFyZSBzZWFyY2hpbmcsIGRlZmF1bHRzIHRvIGRvY3VtZW50LiBJZiB5b3UgaGF2ZSBjcmVhdGVkIGEgc2VwYXJhdGVcclxuICogRE9NRG9jdW1lbnQgd2l0aCB0aGUgPGNvZGU+YXRyb3BhLkhUTUxQYXJzZXI8L2NvZGU+LCBhbiBpZnJhbWUsIG9yIGJ5XHJcbiAqIHNvbWUgb3RoZXIgbWVhbnMsIHlvdSB3b3VsZCBwdXQgYSByZWZlcmVuY2UgdG8gdGhhdCBkb2N1bWVudCBoZXJlIHRvXHJcbiAqIGluZGljYXRlIHRoYXQgeW91IGludGVuZCB0byB1c2UgdGhhdCBkb2N1bWVudCdzIHJvb3QuXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIEEgZnVuY3Rpb24gYXBwbGllZCB0byBldmVyeSBlbGVtZW50IGZvdW5kXHJcbiAqIHVzaW5nIHRoZSBzdXBwbGllZCB4cGF0aCBleHByZXNzaW9uLiBUaGUgY2FsbGJhY2sgcmVjZWl2ZXMgYSBzaW5nbGVcclxuICogZWxlbWVudCBhcyBpdCdzIG9ubHkgYXJndW1lbnQuXHJcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IFJldHVybnMgdGhlIHF1YW50aXR5IG9mIG5vZGVzIHByb2Nlc3NlZC5cclxuICovXHJcbmF0cm9wYS54cGF0aC5wcm9jZXNzTm9kZXNCeVhwYXRoID0gZnVuY3Rpb24gcHJvY2Vzc05vZGVzQnlYcGF0aChcclxuICAgIHhwYXRoRXhwcmVzc2lvbiwgY29udGV4dE5vZGUsIGRvY3JlZiwgY2FsbGJhY2tcclxuKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIGF0cm9wYS5zdXBwb3J0Q2hlY2soJ3hwYXRoJyk7XHJcbiAgICBkb2NyZWYgPSBhdHJvcGEuc2V0QXNPcHRpb25hbEFyZyhkb2N1bWVudCwgZG9jcmVmKTtcclxuICAgIGNvbnRleHROb2RlID0gYXRyb3BhLnNldEFzT3B0aW9uYWxBcmcoZG9jcmVmLCBjb250ZXh0Tm9kZSk7XHJcbiAgICB2YXIgbm9kZXNTbmFwc2hvdCxcclxuICAgIG5zbCxcclxuICAgIGksXHJcbiAgICBuc2k7XHJcbiAgICBub2Rlc1NuYXBzaG90ID0gZG9jcmVmLmV2YWx1YXRlKFxyXG4gICAgICAgIHhwYXRoRXhwcmVzc2lvbixcclxuICAgICAgICBjb250ZXh0Tm9kZSxcclxuICAgICAgICBudWxsLFxyXG4gICAgICAgIFhQYXRoUmVzdWx0Lk9SREVSRURfTk9ERV9TTkFQU0hPVF9UWVBFLFxyXG4gICAgICAgIG51bGxcclxuICAgICk7XHJcbiAgICBuc2wgPSBub2Rlc1NuYXBzaG90LnNuYXBzaG90TGVuZ3RoO1xyXG4gICAgZm9yIChpID0gMDsgaSA8IG5zbDsgaSsrKSB7XHJcbiAgICAgICAgbnNpID0gbm9kZXNTbmFwc2hvdC5zbmFwc2hvdEl0ZW0oaSk7XHJcbiAgICAgICAgY2FsbGJhY2sobnNpKTtcclxuICAgIH1cclxuICAgIHJldHVybiBpO1xyXG59O1xyXG4vKipcclxuICogUmVtb3ZlcyBub2RlcyBmcm9tIHRoZSBET00gdXNpbmcgYW4gWHBhdGggZXhwcmVzc2lvbi5cclxuICogQGV4YW1wbGVcclxuICogICAvLyB0byByZW1vdmUgYWxsIGFuY2hvcnMgd2l0aCB0aGUgY2xhc3MgXCJvb3BzXCIgaW5zaWRlIG9mIGFueSBkaXYgaW5cclxuICogICAvLyBkb2N1bWVudFxyXG4gKiAgIHZhciB4cGF0aEV4cHJlc3Npb24gPSBcIi4vL2Rpdi8vYVtAY2xhc3M9J29vcHMnXVwiO1xyXG4gKiAgIGF0cm9wYS54cGF0aC5yZW1vdmVOb2Rlc0J5WHBhdGgoeHBhdGhFeHByZXNzaW9uKTtcclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwMzEzXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSB4cGF0aEV4cHJlc3Npb24gQW4gWHBhdGggZXhwcmVzc2lvbiBhcyBhIHN0cmluZ1xyXG4gKiBAcGFyYW0ge0RPTSBOb2RlfSBjb250ZXh0Tm9kZSBPcHRpb25hbC4gVGhlIG5vZGUgd2hpY2ggaXMgdG8gc2VydmUgYXMgdGhlIHJvb3RcclxuICogZm9yIHRoZSBzdXBwbGllZCBYcGF0aCBleHByZXNzaW9uLiBEZWZhdWx0cyB0byB3aGF0ZXZlciBkb2NyZWYgaXMuXHJcbiAqIEBwYXJhbSB7RE9NIERvY3VtZW50fSBkb2NyZWYgT3B0aW9uYWwuIEEgcmVmZXJlbmNlIHRvIHRoZSBkb2N1bWVudCB5b3VcclxuICogYXJlIHNlYXJjaGluZywgZGVmYXVsdHMgdG8gZG9jdW1lbnQuXHJcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IFJldHVybnMgdGhlIHF1YW50aXR5IG9mIG5vZGVzIHJlbW92ZWQuXHJcbiAqIEBzZWUgYXRyb3BhLnhwYXRoLnByb2Nlc3NOb2Rlc0J5WHBhdGggZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqL1xyXG5hdHJvcGEueHBhdGgucmVtb3ZlTm9kZXNCeVhwYXRoID0gZnVuY3Rpb24gcmVtb3ZlTm9kZXNCeVhwYXRoKFxyXG4gICAgeHBhdGhFeHByZXNzaW9uLCBjb250ZXh0Tm9kZSwgZG9jcmVmXHJcbikge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICBhdHJvcGEuc3VwcG9ydENoZWNrKCd4cGF0aCcpO1xyXG4gICAgdmFyIGNvdW50O1xyXG4gICAgY291bnQgPSBhdHJvcGEueHBhdGgucHJvY2Vzc05vZGVzQnlYcGF0aChcclxuICAgICAgICB4cGF0aEV4cHJlc3Npb24sXHJcbiAgICAgICAgY29udGV4dE5vZGUsXHJcbiAgICAgICAgZG9jcmVmLFxyXG4gICAgICAgIGZ1bmN0aW9uIChlbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGF0cm9wYS5yZW1vdmVOb2RlQnlSZWZlcmVuY2UoZWxlbWVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgKTtcclxuICAgIHJldHVybiBjb3VudDtcclxufTtcclxuLyoqXHJcbiAqIFNlbGVjdHMgbm9kZXMgZnJvbSB0aGUgRE9NIHVzaW5nIGFuIFhwYXRoIGV4cHJlc3Npb24uXHJcbiAqIEBleGFtcGxlXHJcbiAqIDxwcmU+XHJcbiAqICAgLy8gVG8gZ2V0IGFsbCB0aGUgZWxlbWVudHMgaW4gdGhlIGRvY3VtZW50IHdpdGggYSBzcmMgYXR0cmlidXRlOlxyXG4gKiAgIHZhciBzcmNFbGVtZW50cyA9IGF0cm9wYS54cGF0aC5nZXROb2Rlc0J5WHBhdGgoJ1tAc3JjXScpO1xyXG4gKiA8L3ByZT5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwMzEzXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSB4cGF0aEV4cHJlc3Npb24gQW4gWHBhdGggZXhwcmVzc2lvbiBhcyBhIHN0cmluZ1xyXG4gKiBAcGFyYW0ge0RPTSBOb2RlfSBjb250ZXh0Tm9kZSBPcHRpb25hbC4gVGhlIG5vZGUgd2hpY2ggaXMgdG8gc2VydmUgYXMgdGhlIHJvb3RcclxuICogZm9yIHRoZSBzdXBwbGllZCBYcGF0aCBleHByZXNzaW9uLiBEZWZhdWx0cyB0byB0aGUgZG9jdW1lbnQncyByb290IG5vZGUuXHJcbiAqIEBwYXJhbSB7RE9NIERvY3VtZW50fSBkb2NyZWYgT3B0aW9uYWwuIEEgcmVmZXJlbmNlIHRvIHRoZSBkb2N1bWVudCB5b3VcclxuICogYXJlIHNlYXJjaGluZywgZGVmYXVsdHMgdG8gZG9jdW1lbnQuXHJcbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBhbiBhcnJheSB3aG9zZSBlbGVtZW50cyBhcmUgRE9NIE5vZGVzXHJcbiAqIEBzZWUgYXRyb3BhLnhwYXRoLnByb2Nlc3NOb2Rlc0J5WHBhdGggZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqL1xyXG5hdHJvcGEueHBhdGguZ2V0Tm9kZXNCeVhwYXRoID0gZnVuY3Rpb24gZ2V0Tm9kZXNCeVhwYXRoKFxyXG4gICAgeHBhdGhFeHByZXNzaW9uLCBjb250ZXh0Tm9kZSwgZG9jcmVmXHJcbikge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG4gICAgYXRyb3BhLnN1cHBvcnRDaGVjaygneHBhdGgnKTtcclxuICAgIHZhciBlbGVtZW50UmVmZXJlbmNlcztcclxuICAgIGVsZW1lbnRSZWZlcmVuY2VzID0gW107XHJcbiAgICBhdHJvcGEueHBhdGgucHJvY2Vzc05vZGVzQnlYcGF0aChcclxuICAgICAgICB4cGF0aEV4cHJlc3Npb24sXHJcbiAgICAgICAgY29udGV4dE5vZGUsXHJcbiAgICAgICAgZG9jcmVmLFxyXG4gICAgICAgIGZ1bmN0aW9uIChlbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGVsZW1lbnRSZWZlcmVuY2VzLnB1c2goZWxlbWVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgKTtcclxuICAgIHJldHVybiBlbGVtZW50UmVmZXJlbmNlcztcclxufTtcclxuLyoqXHJcbiAqIEVzY2FwZXMgc2luZ2xlIHF1b3RlcyAoYXBvc3Ryb3BlKSBpbiBYcGF0aCBxdWVyaWVzLlxyXG4gKiBAZXhhbXBsZVxyXG4gKiA8cHJlPlxyXG4gKiAgLy8gdGhpcyBpcyB1c2VmdWwgZm9yIHVzaW5nIGFyYml0cmFyeSBzdHJpbmdzIGluIHlvdXIgcXVlcmllcy5cclxuICogIHZhciBhcmJTdHIsIGVzY2FwZWRTdHIsIHhwYXRoRXhwcmVzc2lvbiwgZm91bmROb2RlcztcclxuICogIGFyYlN0ciA9IFwiSmltbXkgYWluJ3QgbmV2ZXIgc2FpZCBcXFwiU2h1clxcXCIgV2h5PyBJIGRvbid0IGtub3chXCI7XHJcbiAqICBlc2NhcGVkU3RyID0gYXRyb3BhLnhwYXRoLmVzY2FwZVF1b3Rlc1hwYXRoKGFyYlN0cik7XHJcbiAqICAvLyBwcm9kdWNlczogY29uY2F0KCdKaW1teSBhaW4nLCBcIidcIiwgJ3QgbmV2ZXIgc2FpZCBcIlNodXJcIiBXaHk/IEkgZG9uJywgXCInXCIsXHJcbiAqICAvLyAndCBrbm93IScpXHJcbiAqICAvLyBpdCBpcyBtdWNoIGVhc2llciB0byBkZWFsIHdpdGggdGhlIHZhcmlhYmxlIG5hbWUgdGhhbiBpdCBpcyB0byBkZWFsIHdpdGhcclxuICogIC8vIGFsbCB0aG9zZSBxdW90ZXMgYW5kIGNvbW1hcyFcclxuICogIHhwYXRoRXhwcmVzc2lvbiA9ICcuLy9wW2NvbnRhaW5zKHRleHQoKSwnICsgZXNjYXBlZFN0ciArICcpXSc7XHJcbiAqICBmb3VuZE5vZGVzID0gYXRyb3BhLnhwYXRoLmdldE5vZGVzQnlYcGF0aCh4cGF0aEV4cHJlc3Npb24pO1xyXG4gKiAgLy8gZm91bmQgbm9kZXMgd2lsbCBjb250YWluIHRoZSBwIGVsZW1lbnRzIHdoZXJlIHRoZSB0ZXh0IHdhcyBtYXRjaGVkLlxyXG4gKiA8L3ByZT5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTIwOTA5XHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmcgQW4gWHBhdGggcXVlcnlcclxuICogQHJldHVybnMge1N0cmluZ30gUmV0dXJucyBhIHN0cmluZyByZXByZXNlbnRpbmcgYSBjb25jYXQgZnVuY3Rpb24gaW4gWHBhdGhcclxuICogd2hpY2ggd2lsbCBlZmZlY3RpdmVseSB3b3JrIGluIGVzY2FwaW5nIHF1b3RlcyBpbiB5b3VyIHhwYXRoIHF1ZXJ5LlxyXG4gKi9cclxuYXRyb3BhLnhwYXRoLmVzY2FwZVF1b3Rlc1hwYXRoID0gZnVuY3Rpb24gZXNjYXBlUXVvdGVzWHBhdGgoc3RyaW5nKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcbiAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvXFwnL2csIFwiJywgXFxcIidcXFwiLCAnXCIpO1xyXG4gICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoL14oLiopJC9nLCBcImNvbmNhdCgnJDEnKVwiKTtcclxuICAgIHJldHVybiBzdHJpbmc7XHJcbn07XHJcblxyXG5cclxuXHJcblxyXG53aGlsZShhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMubGVuZ3RoID4gMCkge1xyXG4gICAgYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLnBvcCgpKCk7XHJcbn1cclxubW9kdWxlLmV4cG9ydHMgPSBhdHJvcGE7XHJcbiIsIi8qanNsaW50XHJcbiAgICBub2RlIDogdHJ1ZVxyXG4qL1xyXG5cclxudmFyIGF0cm9wYSA9IHJlcXVpcmUoJ2F0cm9wYS1oZWFkZXInKTtcclxuXHJcbmZ1bmN0aW9uIGxpbmtEYXRhKG9iaikge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG4gICAgT2JqZWN0LmtleXMob2JqLmRhdGEpLmZpbHRlcihmdW5jdGlvbiAocHJvcCkge1xyXG4gICAgICAgIHJldHVybiBwcm9wICE9PSAncmVxdWlyZW1lbnRzJztcclxuICAgIH0pLmZvckVhY2goZnVuY3Rpb24gKHByb3ApIHtcclxuICAgICAgICBhdHJvcGEuZGF0YVtwcm9wXSA9IG9iai5kYXRhW3Byb3BdO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbnZhciBBcmdzSW5mbyA9IHJlcXVpcmUoJ2F0cm9wYS1BcmdzSW5mbycpO1xyXG5saW5rRGF0YShBcmdzSW5mbyk7XHJcbmF0cm9wYS5BcmdzSW5mbyA9IEFyZ3NJbmZvLkFyZ3NJbmZvO1xyXG5cclxudmFyIGFycmF5cyA9IHJlcXVpcmUoJ2F0cm9wYS1hcnJheXMnKTtcclxubGlua0RhdGEoYXJyYXlzKTtcclxuYXRyb3BhLmFycmF5cyA9IGFycmF5cy5hcnJheXM7XHJcblxyXG52YXIgQmFiYmxlciA9IHJlcXVpcmUoJ2F0cm9wYS1CYWJibGVyJyk7XHJcbmxpbmtEYXRhKEJhYmJsZXIpO1xyXG5hdHJvcGEuQmFiYmxlciA9IEJhYmJsZXIuQmFiYmxlcjtcclxuXHJcbnZhciBDb29raWVNb25zdGVyID0gcmVxdWlyZSgnYXRyb3BhLUNvb2tpZU1vbnN0ZXInKTtcclxubGlua0RhdGEoQ29va2llTW9uc3Rlcik7XHJcbmF0cm9wYS5Db29raWVNb25zdGVyID0gQ29va2llTW9uc3Rlci5Db29raWVNb25zdGVyO1xyXG5cclxudmFyIENyZWF0ZUh0bWxEb2N1bWVudHNGcm9tWG1saHR0cCA9IHJlcXVpcmUoJ2F0cm9wYS1DcmVhdGVIdG1sRG9jdW1lbnRzRnJvbVhtbGh0dHAnKTtcclxubGlua0RhdGEoQ3JlYXRlSHRtbERvY3VtZW50c0Zyb21YbWxodHRwKTtcclxuYXRyb3BhLkNyZWF0ZUh0bWxEb2N1bWVudHNGcm9tWG1saHR0cCA9IENyZWF0ZUh0bWxEb2N1bWVudHNGcm9tWG1saHR0cC5DcmVhdGVIdG1sRG9jdW1lbnRzRnJvbVhtbGh0dHA7XHJcblxyXG52YXIgY3VzdG9tRXJyb3JzID0gcmVxdWlyZSgnYXRyb3BhLWN1c3RvbUVycm9ycycpO1xyXG5saW5rRGF0YShjdXN0b21FcnJvcnMpO1xyXG5hdHJvcGEuY3VzdG9tRXJyb3JzID0gY3VzdG9tRXJyb3JzLmN1c3RvbUVycm9ycztcclxuXHJcbnZhciBIVE1MUGFyc2VyID0gcmVxdWlyZSgnYXRyb3BhLUhUTUxQYXJzZXInKTtcclxubGlua0RhdGEoSFRNTFBhcnNlcik7XHJcbmF0cm9wYS5IVE1MUGFyc2VyID0gSFRNTFBhcnNlci5IVE1MUGFyc2VyO1xyXG5cclxudmFyIGluamVjdCA9IHJlcXVpcmUoJ2F0cm9wYS1pbmplY3QnKTtcclxubGlua0RhdGEoaW5qZWN0KTtcclxuYXRyb3BhLmluamVjdCA9IGluamVjdC5pbmplY3Q7XHJcblxyXG52YXIgaW5xdWlyZSA9IHJlcXVpcmUoJ2F0cm9wYS1pbnF1aXJlJyk7XHJcbmxpbmtEYXRhKGlucXVpcmUpO1xyXG5hdHJvcGEuaW5xdWlyZSA9IGlucXVpcmUuaW5xdWlyZTtcclxuXHJcbnZhciBvYmplY3RzID0gcmVxdWlyZSgnYXRyb3BhLW9iamVjdHMnKTtcclxubGlua0RhdGEob2JqZWN0cyk7XHJcbmF0cm9wYS5vYmplY3RzID0gb2JqZWN0cy5vYmplY3RzO1xyXG5cclxudmFyIHJhbmRvbSA9IHJlcXVpcmUoJ2F0cm9wYS1yYW5kb20nKTtcclxubGlua0RhdGEocmFuZG9tKTtcclxuYXRyb3BhLnJhbmRvbSA9IHJhbmRvbS5yYW5kb207XHJcblxyXG52YXIgcmVnZXggPSByZXF1aXJlKCdhdHJvcGEtcmVnZXgnKTtcclxubGlua0RhdGEocmVnZXgpO1xyXG5hdHJvcGEucmVnZXggPSByZWdleC5yZWdleDtcclxuXHJcbnZhciByZW1vdmVOb2RlQnlSZWZlcmVuY2UgPSByZXF1aXJlKCdhdHJvcGEtcmVtb3ZlTm9kZUJ5UmVmZXJlbmNlJyk7XHJcbmxpbmtEYXRhKHJlbW92ZU5vZGVCeVJlZmVyZW5jZSk7XHJcbmF0cm9wYS5yZW1vdmVOb2RlQnlSZWZlcmVuY2UgPSByZW1vdmVOb2RlQnlSZWZlcmVuY2UucmVtb3ZlTm9kZUJ5UmVmZXJlbmNlO1xyXG5cclxudmFyIFJlcXVlc3RlciA9IHJlcXVpcmUoJ2F0cm9wYS1SZXF1ZXN0ZXInKTtcclxubGlua0RhdGEoUmVxdWVzdGVyKTtcclxuYXRyb3BhLlJlcXVlc3RlciA9IFJlcXVlc3Rlci5SZXF1ZXN0ZXI7XHJcblxyXG52YXIgU2VyaWFsQWN0b3IgPSByZXF1aXJlKCdhdHJvcGEtU2VyaWFsQWN0b3InKTtcclxubGlua0RhdGEoU2VyaWFsQWN0b3IpO1xyXG5hdHJvcGEuU2VyaWFsQWN0b3IgPSBTZXJpYWxBY3Rvci5TZXJpYWxBY3RvcjtcclxuXHJcbnZhciBzZXRBc09wdGlvbmFsQXJnID0gcmVxdWlyZSgnYXRyb3BhLXNldEFzT3B0aW9uYWxBcmcnKTtcclxubGlua0RhdGEoc2V0QXNPcHRpb25hbEFyZyk7XHJcbmF0cm9wYS5zZXRBc09wdGlvbmFsQXJnID0gc2V0QXNPcHRpb25hbEFyZy5zZXRBc09wdGlvbmFsQXJnO1xyXG5cclxudmFyIHN0cmluZyA9IHJlcXVpcmUoJ2F0cm9wYS1zdHJpbmcnKTtcclxubGlua0RhdGEoc3RyaW5nKTtcclxuYXRyb3BhLnN0cmluZyA9IHN0cmluZy5zdHJpbmc7XHJcblxyXG52YXIgVGV4dEFuYWx5emVyID0gcmVxdWlyZSgnYXRyb3BhLVRleHRBbmFseXplcicpO1xyXG5saW5rRGF0YShUZXh0QW5hbHl6ZXIpO1xyXG5hdHJvcGEuVGV4dEFuYWx5emVyID0gVGV4dEFuYWx5emVyLlRleHRBbmFseXplcjtcclxuXHJcbnZhciB1cmwgPSByZXF1aXJlKCdhdHJvcGEtdXJsJyk7XHJcbmxpbmtEYXRhKHVybCk7XHJcbmF0cm9wYS51cmwgPSB1cmwudXJsO1xyXG5cclxudmFyIHdhaXRGb3IgPSByZXF1aXJlKCdhdHJvcGEtd2FpdEZvcicpO1xyXG5saW5rRGF0YSh3YWl0Rm9yKTtcclxuYXRyb3BhLndhaXRGb3IgPSB3YWl0Rm9yLndhaXRGb3I7XHJcblxyXG52YXIgd3RmID0gcmVxdWlyZSgnYXRyb3BhLXd0ZicpO1xyXG5saW5rRGF0YSh3dGYpO1xyXG5hdHJvcGEud3RmID0gd3RmLnd0ZjtcclxuXHJcbnZhciB4cGF0aCA9IHJlcXVpcmUoJ2F0cm9wYS14cGF0aCcpO1xyXG5saW5rRGF0YSh4cGF0aCk7XHJcbmF0cm9wYS54cGF0aCA9IHhwYXRoLnhwYXRoO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBhdHJvcGE7Il19
