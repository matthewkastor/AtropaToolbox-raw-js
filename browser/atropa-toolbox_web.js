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
//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXGthc3RvclxcRG9jdW1lbnRzXFxzY3JpcHRzXFxqc1xcQXRyb3BhXFxjdXJyZW50XFxub2RlX21vZHVsZXNcXGJyb3dzZXJpZnlcXG5vZGVfbW9kdWxlc1xcYnJvd3Nlci1wYWNrXFxfcHJlbHVkZS5qcyIsIkM6L1VzZXJzL2thc3Rvci9Eb2N1bWVudHMvc2NyaXB0cy9qcy9BdHJvcGEvY3VycmVudC9kZXYvYnJvd3Nlck1haW4uanMiLCJDOi9Vc2Vycy9rYXN0b3IvRG9jdW1lbnRzL3NjcmlwdHMvanMvQXRyb3BhL2N1cnJlbnQvbm9kZV9tb2R1bGVzL2F0cm9wYS1BcmdzSW5mby9zcmMvYXRyb3BhLUFyZ3NJbmZvLmpzIiwiQzovVXNlcnMva2FzdG9yL0RvY3VtZW50cy9zY3JpcHRzL2pzL0F0cm9wYS9jdXJyZW50L25vZGVfbW9kdWxlcy9hdHJvcGEtQmFiYmxlci9zcmMvYXRyb3BhLUJhYmJsZXIuanMiLCJDOi9Vc2Vycy9rYXN0b3IvRG9jdW1lbnRzL3NjcmlwdHMvanMvQXRyb3BhL2N1cnJlbnQvbm9kZV9tb2R1bGVzL2F0cm9wYS1Db29raWVNb25zdGVyL3NyYy9hdHJvcGEtQ29va2llTW9uc3Rlci5qcyIsIkM6L1VzZXJzL2thc3Rvci9Eb2N1bWVudHMvc2NyaXB0cy9qcy9BdHJvcGEvY3VycmVudC9ub2RlX21vZHVsZXMvYXRyb3BhLUNyZWF0ZUh0bWxEb2N1bWVudHNGcm9tWG1saHR0cC9zcmMvYXRyb3BhLUNyZWF0ZUh0bWxEb2N1bWVudHNGcm9tWG1saHR0cC5qcyIsIkM6L1VzZXJzL2thc3Rvci9Eb2N1bWVudHMvc2NyaXB0cy9qcy9BdHJvcGEvY3VycmVudC9ub2RlX21vZHVsZXMvYXRyb3BhLUhUTUxQYXJzZXIvc3JjL2F0cm9wYS1IVE1MUGFyc2VyLmpzIiwiQzovVXNlcnMva2FzdG9yL0RvY3VtZW50cy9zY3JpcHRzL2pzL0F0cm9wYS9jdXJyZW50L25vZGVfbW9kdWxlcy9hdHJvcGEtUmVxdWVzdGVyL3NyYy9hdHJvcGEtUmVxdWVzdGVyLmpzIiwiQzovVXNlcnMva2FzdG9yL0RvY3VtZW50cy9zY3JpcHRzL2pzL0F0cm9wYS9jdXJyZW50L25vZGVfbW9kdWxlcy9hdHJvcGEtU2VyaWFsQWN0b3Ivc3JjL2F0cm9wYS1TZXJpYWxBY3Rvci5qcyIsIkM6L1VzZXJzL2thc3Rvci9Eb2N1bWVudHMvc2NyaXB0cy9qcy9BdHJvcGEvY3VycmVudC9ub2RlX21vZHVsZXMvYXRyb3BhLVRleHRBbmFseXplci9zcmMvYXRyb3BhLVRleHRBbmFseXplci5qcyIsIkM6L1VzZXJzL2thc3Rvci9Eb2N1bWVudHMvc2NyaXB0cy9qcy9BdHJvcGEvY3VycmVudC9ub2RlX21vZHVsZXMvYXRyb3BhLWFycmF5cy9zcmMvYXRyb3BhLWFycmF5cy5qcyIsIkM6L1VzZXJzL2thc3Rvci9Eb2N1bWVudHMvc2NyaXB0cy9qcy9BdHJvcGEvY3VycmVudC9ub2RlX21vZHVsZXMvYXRyb3BhLWN1c3RvbUVycm9ycy9zcmMvYXRyb3BhLWN1c3RvbUVycm9ycy5qcyIsIkM6L1VzZXJzL2thc3Rvci9Eb2N1bWVudHMvc2NyaXB0cy9qcy9BdHJvcGEvY3VycmVudC9ub2RlX21vZHVsZXMvYXRyb3BhLWhlYWRlci9zcmMvYXRyb3BhLWhlYWRlci5qcyIsIkM6L1VzZXJzL2thc3Rvci9Eb2N1bWVudHMvc2NyaXB0cy9qcy9BdHJvcGEvY3VycmVudC9ub2RlX21vZHVsZXMvYXRyb3BhLWluamVjdC9zcmMvYXRyb3BhLWluamVjdC5qcyIsIkM6L1VzZXJzL2thc3Rvci9Eb2N1bWVudHMvc2NyaXB0cy9qcy9BdHJvcGEvY3VycmVudC9ub2RlX21vZHVsZXMvYXRyb3BhLWlucXVpcmUvc3JjL2F0cm9wYS1pbnF1aXJlLmpzIiwiQzovVXNlcnMva2FzdG9yL0RvY3VtZW50cy9zY3JpcHRzL2pzL0F0cm9wYS9jdXJyZW50L25vZGVfbW9kdWxlcy9hdHJvcGEtb2JqZWN0cy9zcmMvYXRyb3BhLW9iamVjdHMuanMiLCJDOi9Vc2Vycy9rYXN0b3IvRG9jdW1lbnRzL3NjcmlwdHMvanMvQXRyb3BhL2N1cnJlbnQvbm9kZV9tb2R1bGVzL2F0cm9wYS1yYW5kb20vc3JjL2F0cm9wYS1yYW5kb20uanMiLCJDOi9Vc2Vycy9rYXN0b3IvRG9jdW1lbnRzL3NjcmlwdHMvanMvQXRyb3BhL2N1cnJlbnQvbm9kZV9tb2R1bGVzL2F0cm9wYS1yZWdleC9zcmMvYXRyb3BhLXJlZ2V4LmpzIiwiQzovVXNlcnMva2FzdG9yL0RvY3VtZW50cy9zY3JpcHRzL2pzL0F0cm9wYS9jdXJyZW50L25vZGVfbW9kdWxlcy9hdHJvcGEtcmVtb3ZlTm9kZUJ5UmVmZXJlbmNlL3NyYy9hdHJvcGEtcmVtb3ZlTm9kZUJ5UmVmZXJlbmNlLmpzIiwiQzovVXNlcnMva2FzdG9yL0RvY3VtZW50cy9zY3JpcHRzL2pzL0F0cm9wYS9jdXJyZW50L25vZGVfbW9kdWxlcy9hdHJvcGEtc2V0QXNPcHRpb25hbEFyZy9zcmMvYXRyb3BhLXNldEFzT3B0aW9uYWxBcmcuanMiLCJDOi9Vc2Vycy9rYXN0b3IvRG9jdW1lbnRzL3NjcmlwdHMvanMvQXRyb3BhL2N1cnJlbnQvbm9kZV9tb2R1bGVzL2F0cm9wYS1zdHJpbmcvc3JjL2F0cm9wYS1zdHJpbmcuanMiLCJDOi9Vc2Vycy9rYXN0b3IvRG9jdW1lbnRzL3NjcmlwdHMvanMvQXRyb3BhL2N1cnJlbnQvbm9kZV9tb2R1bGVzL2F0cm9wYS11cmwvc3JjL2F0cm9wYS11cmwuanMiLCJDOi9Vc2Vycy9rYXN0b3IvRG9jdW1lbnRzL3NjcmlwdHMvanMvQXRyb3BhL2N1cnJlbnQvbm9kZV9tb2R1bGVzL2F0cm9wYS13YWl0Rm9yL3NyYy9hdHJvcGEtd2FpdEZvci5qcyIsIkM6L1VzZXJzL2thc3Rvci9Eb2N1bWVudHMvc2NyaXB0cy9qcy9BdHJvcGEvY3VycmVudC9ub2RlX21vZHVsZXMvYXRyb3BhLXd0Zi9zcmMvYXRyb3BhLXd0Zi5qcyIsIkM6L1VzZXJzL2thc3Rvci9Eb2N1bWVudHMvc2NyaXB0cy9qcy9BdHJvcGEvY3VycmVudC9ub2RlX21vZHVsZXMvYXRyb3BhLXhwYXRoL3NyYy9hdHJvcGEteHBhdGguanMiLCJDOi9Vc2Vycy9rYXN0b3IvRG9jdW1lbnRzL3NjcmlwdHMvanMvQXRyb3BhL2N1cnJlbnQvc3JjL2F0cm9wYS10b29sYm94LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDelNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdVQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM01BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbldBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVhQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0UUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeFRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9NQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqU0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6b0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiYXRyb3BhID0gcmVxdWlyZSgnLi4vc3JjL2F0cm9wYS10b29sYm94LmpzJyk7IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2RvY3MvdnNkb2MvT3BlbkxheWVyc0FsbC5qc1wiLz5cbnZhciBhdHJvcGEgPSByZXF1aXJlKCdhdHJvcGEtaGVhZGVyJyk7XG5hdHJvcGEuaW5xdWlyZSA9IHJlcXVpcmUoJ2F0cm9wYS1pbnF1aXJlJykuaW5xdWlyZTtcbmF0cm9wYS5hcnJheXMgPSByZXF1aXJlKCdhdHJvcGEtYXJyYXlzJykuYXJyYXlzO1xuYXRyb3BhLmN1c3RvbUVycm9ycyA9IHJlcXVpcmUoJ2F0cm9wYS1jdXN0b21FcnJvcnMnKS5jdXN0b21FcnJvcnM7XG4vKmpzbGludFxuICAgIGluZGVudDogNCxcbiAgICBtYXhlcnI6IDUwLFxuICAgIHdoaXRlOiB0cnVlLFxuICAgIGJyb3dzZXI6IHRydWUsXG4gICAgZGV2ZWw6IHRydWUsXG4gICAgcGx1c3BsdXM6IHRydWUsXG4gICAgcmVnZXhwOiB0cnVlXG4qL1xuLypnbG9iYWwgYXRyb3BhICovXG4vLyBlbmQgaGVhZGVyXG5cbi8qKlxuICogVGhpcyByZXByZXNlbnRzIGEgZmlsdGVyIGZvciBhcmd1bWVudHMgYmFzZWQgb24gdHlwZS5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAdmVyc2lvbiAyMDEzMDIyMVxuICogQGNsYXNzIFRoaXMgcmVwcmVzZW50cyBhIGZpbHRlciBmb3IgYXJndW1lbnRzIGJhc2VkIG9uIHR5cGUuXG4gKiBAcmV0dXJucyB7QXJnc0luZm99IFJldHVybnMgYW4gQXJnc0luZm8gZmlsdGVyLlxuICogQHJlcXVpcmVzIGF0cm9wYS5hcnJheXMubWF0Y2hcbiAqIEBleGFtcGxlXG4gKiBmdW5jdGlvbiBteUNsYXNzeUNvbnN0cnVjdG9yKHRha2VzLCBhLCBmZXcsIGFyZ3MpIHtcbiAqICAgICB2YXIgZXhwZWN0ZWRBcmdUeXBlcywgY2hlY2tlcjtcbiAqICAgICBcbiAqICAgICBleHBlY3RlZEFyZ1R5cGVzID0ge307XG4gKiAgICAgZXhwZWN0ZWRBcmdUeXBlcy5yZXF1ZXN0V2l0aE1lc3NhZ2UgPSBcbiAqICAgICAgICAgIFsnc3RyaW5nJywgJ3N0cmluZycsICdzdHJpbmcnLCAnZnVuY3Rpb24nXTtcbiAqICAgICBleHBlY3RlZEFyZ1R5cGVzLnJlcXVlc3ROdWxsTWVzc2FnZSA9IFxuICogICAgICAgICAgWydzdHJpbmcnLCAnc3RyaW5nJywgJ29iamVjdCcsICdmdW5jdGlvbiddO1xuICogICAgIFxuICogICAgIGNoZWNrZXIgPSBuZXcgYXRyb3BhLkFyZ3NJbmZvKCk7XG4gKiAgICAgY2hlY2tlci5zZXRFeHBlY3RlZEFyZ1R5cGVzKGV4cGVjdGVkQXJnVHlwZXMpO1xuICogICAgIFxuICogICAgIHRyeSB7XG4gKiAgICAgXG4gKiAgICAgICAgIC8vIENoZWNrIHRoZSBzdXBwbGllZCBhcmd1bWVudHMgcHNldWRvIGFycmF5J3MgYXJndW1lbnQgdHlwZXNcbiAqICAgICAgICAgLy8gaWYgdGhlIHBhdHRlcm4gb2YgdHlwZXMgaW4gYXJndW1lbnRzIG1hdGNoZXMgb25lIG9mIHRoZVxuICogICAgICAgICAvLyBwYXR0ZXJucyBzZXQgb24gZXhwZWN0ZWRBcmdUeXBlcyB0aGVuIHRoZSBtYXRjaGluZyBwYXR0ZXJuXG4gKiAgICAgICAgIC8vIHdpbGwgYmUgcmV0dXJuZWQuIE90aGVyd2lzZSwgYW4gZXJyb3Igd2lsbCBiZSB0aHJvd24uXG4gKiAgICAgICAgIFxuICogICAgICAgICBjaGVja2VyLmNoZWNrQXJnVHlwZXMoYXJndW1lbnRzKTtcbiAqICAgICB9IGNhdGNoIChlKSB7XG4gKiAgICAgXG4gKiAgICAgICAgIC8vIEludmFsaWQgYXJndW1lbnQgdHlwZXMgc3VwcGxpZWQuIEhhbmRsZVxuICogICAgICAgICAvLyB0aGUgZXJyb3Igb3IgYmFpbC5cbiAqICAgICAgICAgXG4gKiAgICAgfVxuICogICAgIFxuICogICAgIC8vIHRoZSBhcmd1bWVudHMgc3VwcGxpZWQgd2lsbCBiZSBvZiB0aGUgcHJvcGVyIHR5cGVcbiAqICAgICAvLyB5b3VyIGZ1bmN0aW9uIGNhbiBnbyBhaGVhZCBhbmQgZG8gdGhpbmdzIHdpdGggdGhlbVxuICogfVxuICovXG5hdHJvcGEuQXJnc0luZm8gPSBmdW5jdGlvbiBBcmdzSW5mbygpIHtcbiAgICAndXNlIHN0cmljdCc7XG4gICAgdmFyIGV4cGVjdGVkQXJnVHlwZXMsXG4gICAgY2hlY2tBcmdzLFxuICAgIHRoYXQ7XG4gICAgLyoqXG4gICAgICogSG9sZHMgdGhlIHByb3BlciByZWZlcmVuY2UgdG8gPGNvZGU+dGhpczwvY29kZT5cbiAgICAgKiBmb3IgcHJpdmF0ZSBmdW5jdGlvbnMuXG4gICAgICogQHR5cGUgVGhpc1xuICAgICAqIEBwcml2YXRlXG4gICAgICogQGZpZWxkT2YgYXRyb3BhLkFyZ3NJbmZvLVxuICAgICAqL1xuICAgIHRoYXQgPSB0aGlzO1xuICAgIC8qKlxuICAgICAqIEhvbGRzIHRoZSBleHBlY3RlZCBhcmd1bWVudCB0eXBlcyBvYmplY3QuXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAdHlwZSBFeHBlY3RlZCBBcmcgVHlwZXNcbiAgICAgKiBAZmllbGRPZiBhdHJvcGEuQXJnc0luZm8tXG4gICAgICovXG4gICAgZXhwZWN0ZWRBcmdUeXBlcyA9IHt9O1xuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIGV4cGVjdGVkIGFyZ3VtZW50IHR5cGVzLlxuICAgICAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICAgICAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICAgICAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAgICAgKiBAdmVyc2lvbiAyMDEyMDkwOVxuICAgICAqIEBtZXRob2RPZiBhdHJvcGEuQXJnc0luZm8jXG4gICAgICogQHBhcmFtIHtFeHBlY3RlZCBBcmcgVHlwZXN9IHR5cGVzT2JqIEFuIG9iamVjdCBjb250YWluaW5nIGluZm9ybWF0aW9uXG4gICAgICogIGFib3V0IHRoZSB0eXBlcyBvZiBhcmd1bWVudHMgeW91IGV4cGVjdC4gU3BlY2lmaWNhbGx5LCB0aGUgb2JqZWN0IHNob3VsZFxuICAgICAqICBsb29rIGxpa2UgdGhlIGV4YW1wbGUuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiAvLyB0eXBlc09iaiBpcyBleHBlY3RlZCB0byBiZSBvZiB0aGUgZm9ybTpcbiAgICAgKiBcbiAgICAgKiB2YXIgdHlwZXNPYmogPSB7XG4gICAgICogICAgIFwibmFtZWRBcmd1bWVudFR5cGVzQXJyYXlcIiA6IFtcInN0cmluZ1wiLCBcImZ1bmN0aW9uXCIsIFwibnVtYmVyXCJdLFxuICAgICAqICAgICBcIm5hbWVkQWx0ZXJuYXRlQXJndW1lbnRUeXBlc0FycmF5XCIgOiBbXCJvYmplY3RcIiwgXCJmdW5jdGlvblwiLCBcIm51bWJlclwiXVxuICAgICAqIH07XG4gICAgICogXG4gICAgICogLy8gWW91IG1heSB1c2UgYXMgbWFueSBuYW1lZCBhcnJheXMgYXMgeW91IHdpc2ggYW5kIGNoZWNrQXJnVHlwZXMgd2lsbFxuICAgICAqIC8vIHRlc3QgZm9yIGEgbWF0Y2ggdG8gYXQgbGVhc3Qgb25lIG9mIHRoZSBwcm92aWRlZCBuYW1lZCBhcnJheXMuXG4gICAgICogQHRocm93cyB7YXRyb3BhLmN1c3RvbUVycm9ycy5JbnZhbGlkQXJndW1lbnRUeXBlc0Vycm9yfSBUaHJvd3MgYW4gZXJyb3IgaWYgdGhlXG4gICAgICogIHR5cGVzT2JqIGNhbiBub3QgYmUgdXNlZCB0byBzZXQgdGhlIGV4cGVjdGVkIGFyZ3VtZW50IHR5cGVzLlxuICAgICAqL1xuICAgIHRoaXMuc2V0RXhwZWN0ZWRBcmdUeXBlcyA9IGZ1bmN0aW9uIHNldEV4cGVjdGVkQXJnVHlwZXModHlwZXNPYmopIHtcbiAgICAgICAgdmFyIGVycm9yLCBuYW1lcztcbiAgICAgICAgXG4gICAgICAgIGVycm9yID0gZmFsc2U7XG4gICAgICAgIFxuICAgICAgICBpZihhdHJvcGEuaW5xdWlyZS5pc09iamVjdE5vdE51bGwodHlwZXNPYmopKSB7XG4gICAgICAgICAgICBuYW1lcyA9IE9iamVjdC5rZXlzKHR5cGVzT2JqKTtcbiAgICAgICAgICAgIGlmIChuYW1lcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgZXhwZWN0ZWRBcmdUeXBlcyA9IHR5cGVzT2JqO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBlcnJvciA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlcnJvciA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmKGVycm9yKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgYXRyb3BhLmN1c3RvbUVycm9ycy5JbnZhbGlkQXJndW1lbnRUeXBlc0Vycm9yKFxuICAgICAgICAgICAgICAgICd0eXBlc09iaiBpcyBleHBlY3RlZCB0byBiZSBvZiB0aGUgZm9ybTogdmFyIHR5cGVzT2JqID0gJyArXG4gICAgICAgICAgICAgICAgJ3sgXCJuYW1lZEFyZ3VtZW50VHlwZXNBcnJheVwiIDogJyArXG4gICAgICAgICAgICAgICAgJyAgICBbXCJzdHJpbmdcIiwgXCJmdW5jdGlvblwiLCBcIm51bWJlclwiXSwgJyArXG4gICAgICAgICAgICAgICAgJ1wibmFtZWRBbHRlcm5hdGVBcmd1bWVudFR5cGVzQXJyYXlcIiA6ICcgK1xuICAgICAgICAgICAgICAgICcgICBbXCJvYmplY3RcIiwgXCJmdW5jdGlvblwiLCBcIm51bWJlclwiXSB9OyAnICtcbiAgICAgICAgICAgICAgICAnWW91IG1heSB1c2UgYXMgbWFueSBuYW1lZCBhcnJheXMgYXMgeW91IHdpc2ggYW5kJyArXG4gICAgICAgICAgICAgICAgJ2NoZWNrQXJnVHlwZXMgd2lsbCB0ZXN0IGZvciBhIG1hdGNoIHRvIGF0IGxlYXN0IG9uZSBvZiB0aGUgJyArXG4gICAgICAgICAgICAgICAgJ3Byb3ZpZGVkIG5hbWVkIGFycmF5cy4nXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSB0eXBlcyBvZiBhcmd1bWVudHMuXG4gICAgICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gICAgICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gICAgICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICAgICAqIEB2ZXJzaW9uIDIwMTIwOTA5XG4gICAgICogQG1ldGhvZE9mIGF0cm9wYS5BcmdzSW5mbyNcbiAgICAgKiBAcGFyYW0ge2FyZ3VtZW50c30gYXJncyBBbiBhcmd1bWVudHMgb2JqZWN0LCBvciBhbnl0aGluZyB5b3Ugd2FudCB0b1xuICAgICAqIGNoZWNrIHRoZSB0eXBlIG9mLlxuICAgICAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBhbiBhcnJheSBvZiB0aGUgdHlwZXMgb2YgYXJndW1lbnRzIHBhc3NlZCBpbi5cbiAgICAgKi9cbiAgICB0aGlzLmdldEFyZ1R5cGVzID0gZnVuY3Rpb24gZ2V0QXJnVHlwZXMoYXJncykge1xuICAgICAgICB2YXIgeCxcbiAgICAgICAgYXJnVHlwZXM7XG4gICAgICAgIGFyZ1R5cGVzID0gW107XG4gICAgICAgIGZvciAoeCBpbiBhcmdzKSB7XG4gICAgICAgICAgICBpZiAoYXJncy5oYXNPd25Qcm9wZXJ0eSh4KSkge1xuICAgICAgICAgICAgICAgIGFyZ1R5cGVzLnB1c2godHlwZW9mKGFyZ3NbeF0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXJnVHlwZXM7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBDb21wYXJlcyB0aGUgZXhwZWN0ZWQgYXJndW1lbnRzIHR5cGVzIHRvIHRoZVxuICAgICAqIHJlY2VpdmVkIGFyZ3VtZW50cyB0eXBlcy5cbiAgICAgKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAgICAgKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAgICAgKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gICAgICogQHZlcnNpb24gMjAxMjA5MDlcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBtZXRob2RPZiBhdHJvcGEuQXJnc0luZm8tXG4gICAgICogQHBhcmFtIHtBcnJheX0gZXhwZWN0ZWRUeXBlc0FycmF5IEFuIGFycmF5IHRha2VuIGZyb20gdGhlIHVzZXJcbiAgICAgKiBjcmVhdGVkIGFyZ3VtZW50IHR5cGVzIG9iamVjdC5cbiAgICAgKiBAcGFyYW0ge2FyZ3VtZW50c30gYXJncyBhbiBhcmd1bWVudHMgb2JqZWN0LlxuICAgICAqIEByZXR1cm5zIHtCb29sZWFufSBSZXR1cm5zIHRydWUgaWYgdGhlIGV4cGVjdGVkIHR5cGVzIG1hdGNoIGZvciB0eXBlXG4gICAgICogIGFuZCBhcmUgaW4gdGhlIHNhbWUgb3JkZXIgYXMgdGhlIHJlY2VpdmVkIHR5cGVzLlxuICAgICAqIEByZXF1aXJlcyBhdHJvcGEuYXJyYXlzLm1hdGNoXG4gICAgICovXG4gICAgY2hlY2tBcmdzID0gZnVuY3Rpb24gY2hlY2tBcmdzKGV4cGVjdGVkVHlwZXNBcnJheSwgYXJncykge1xuICAgICAgICB2YXIgdHlwZXM7XG4gICAgICAgIHR5cGVzID0ge307XG4gICAgICAgIHR5cGVzLmV4cGVjdGVkID0gZXhwZWN0ZWRUeXBlc0FycmF5O1xuICAgICAgICB0eXBlcy5yZWNlaXZlZCA9IHRoYXQuZ2V0QXJnVHlwZXMoYXJncyk7XG4gICAgICAgIHJldHVybiBhdHJvcGEuYXJyYXlzLm1hdGNoKHR5cGVzLmV4cGVjdGVkLCB0eXBlcy5yZWNlaXZlZCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBDaGVja3MgdGhlIGdpdmVuIGFyZ3VtZW50cyBvYmplY3QgYWdhaW5zdCB0aGUgZXhwZWN0ZWRcbiAgICAgKiBhcmd1bWVudHMgdHlwZXMuXG4gICAgICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gICAgICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gICAgICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICAgICAqIEB2ZXJzaW9uIDIwMTIwOTA5XG4gICAgICogQG1ldGhvZE9mIGF0cm9wYS5BcmdzSW5mbyNcbiAgICAgKiBAcGFyYW0ge2FyZ3VtZW50c30gYXJncyBBbiBhcmd1bWVudHMgb2JqZWN0XG4gICAgICogQHJldHVybnMge1N0cmluZ30gVGhlIHVzZXIgYXNzaWduZWQga2V5IHdoaWNoIG1hdGNoZXMgdGhlXG4gICAgICogYXJndW1lbnRzIHN1cHBsaWVkLCBvciB0aHJvd3MgYW4gZXJyb3IuXG4gICAgICogQHRocm93cyB7YXRyb3BhLmN1c3RvbUVycm9ycy5JbnZhbGlkQXJndW1lbnRUeXBlc0Vycm9yfSBUaHJvd3MgYW4gZXJyb3IgaWYgbm8gbWF0Y2hpbmdcbiAgICAgKiAgcGF0dGVybiBvZiBhcmd1bWVudCB0eXBlcyBjYW4gYmUgZm91bmQgZm9yIDxjb2RlPmFyZ3M8L2NvZGU+XG4gICAgICogQHNlZSBhdHJvcGEuQXJnc0luZm8jc2V0RXhwZWN0ZWRBcmdUeXBlc1xuICAgICAqL1xuICAgIHRoaXMuY2hlY2tBcmdUeXBlcyA9IGZ1bmN0aW9uIGNoZWNrQXJnVHlwZXMoYXJncykge1xuICAgICAgICB2YXIgZXhwZWN0ZWRUeXBlcztcbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKGV4cGVjdGVkQXJnVHlwZXMpLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBhdHJvcGEuY3VzdG9tRXJyb3JzLkludmFsaWRBcmd1bWVudFR5cGVzRXJyb3IoXG4gICAgICAgICAgICAgICAgJ0V4cGVjdGVkIGFyZ3VtZW50IHR5cGVzIGlzIG5vdCBzZXQuIFVzZSAnICtcbiAgICAgICAgICAgICAgICAnc2V0RXhwZWN0ZWRBcmdUeXBlcyh0eXBlc09iaikgdG8gc2V0LiB0eXBlc09iaiBpcyBhbiAnICtcbiAgICAgICAgICAgICAgICAnb2JqZWN0IHdob3NlIHByb3BlcnRpZXMgYXJlIGFycmF5cyBvZiBzdHJpbmdzIHJlcHJlc2VudGluZyAnICtcbiAgICAgICAgICAgICAgICAndGhlIHR5cGVvZihhcmd1bWVudCkgZm9yIGVhY2ggYXJndW1lbnQsIGluIHRoZSBleGFjdCBvcmRlciAnICtcbiAgICAgICAgICAgICAgICAnaW4gd2hpY2ggdGhleSB3aWxsIGJlIGdpdmVuIHRvIHRoZSBmdW5jdGlvbi4gVXNpbmcgbXVsdGlwbGUgJyArXG4gICAgICAgICAgICAgICAgJ3Byb3BlcnRpZXMgaXQgaXMgcG9zc2libGUgdG8gZGVmaW5lIGFsdGVybmF0aXZlIGFjY2VwdGFibGUgJyArXG4gICAgICAgICAgICAgICAgJ2FyZ3VtZW50IHR5cGUgc2V0cy4gVXNlIGdldEFyZ1R5cGVzKGFyZ3VtZW50cykgYXMgYSAnICtcbiAgICAgICAgICAgICAgICAnY29udmVuaWVudCB3YXkgb2YgZ2V0dGluZyB0aGUgYXJyYXkgeW91IHdhbnQgdG8gaGFyZCBjb2RlICcgK1xuICAgICAgICAgICAgICAgICdpbiBmb3IgdmFsaWRhdGlvbi4gRXhhbXBsZTogdmFyIHR5cGVzT2JqID0gJyArXG4gICAgICAgICAgICAgICAgJ3sgXCJtZXNzYWdlSW5jbHVkZWRcIiA6IFtcInN0cmluZ1wiLCBcImZ1bmN0aW9uXCIsIFwibnVtYmVyXCJdLCAnICtcbiAgICAgICAgICAgICAgICAnXCJtZXNzYWdlTm90SW5jbHVkZWRcIiA6IFtcIm9iamVjdFwiLCBcImZ1bmN0aW9uXCIsIFwibnVtYmVyXCJdIH07J1xuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGV4cGVjdGVkVHlwZXMgaW4gZXhwZWN0ZWRBcmdUeXBlcykge1xuICAgICAgICAgICAgaWYgKGV4cGVjdGVkQXJnVHlwZXMuaGFzT3duUHJvcGVydHkoZXhwZWN0ZWRUeXBlcykpIHtcbiAgICAgICAgICAgICAgICBpZiAoY2hlY2tBcmdzKGV4cGVjdGVkQXJnVHlwZXNbZXhwZWN0ZWRUeXBlc10sIGFyZ3MpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBleHBlY3RlZFR5cGVzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgYXRyb3BhLmN1c3RvbUVycm9ycy5JbnZhbGlkQXJndW1lbnRUeXBlc0Vycm9yKFxuICAgICAgICAgICAgJ2ludmFsaWQgYXJndW1lbnQgdHlwZSBAIGF0cm9wYS5BcmdzSW5mby5jaGVja0FyZ1R5cGVzJyk7XG4gICAgfTtcbn07XG5cblxuXG5cbndoaWxlKGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5sZW5ndGggPiAwKSB7XG4gICAgYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLnBvcCgpKCk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGF0cm9wYTtcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9kb2NzL3ZzZG9jL09wZW5MYXllcnNBbGwuanNcIi8+XG52YXIgYXRyb3BhID0gcmVxdWlyZSgnYXRyb3BhLWhlYWRlcicpO1xuYXRyb3BhLnJhbmRvbSA9IHJlcXVpcmUoJ2F0cm9wYS1yYW5kb20nKS5yYW5kb207XG5hdHJvcGEuc3RyaW5nID0gcmVxdWlyZSgnYXRyb3BhLXN0cmluZycpLnN0cmluZztcbi8qanNsaW50XG4gICAgaW5kZW50OiA0LFxuICAgIG1heGVycjogNTAsXG4gICAgd2hpdGU6IHRydWUsXG4gICAgYnJvd3NlcjogdHJ1ZSxcbiAgICBkZXZlbDogdHJ1ZSxcbiAgICBwbHVzcGx1czogdHJ1ZSxcbiAgICByZWdleHA6IHRydWVcbiovXG4vKmdsb2JhbCBhdHJvcGEgKi9cbi8vIGVuZCBoZWFkZXJcblxuYXRyb3BhLnJlcXVpcmVzKFxuICAgICdCYWJibGVyJyxcbiAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xuICAgICAgICB2YXIgc3VwcG9ydGVkID0gdHJ1ZTtcbiAgICAgICAgXG4gICAgICAgIFtcbiAgICAgICAgICAgIGF0cm9wYS5yYW5kb20uaW50ZWdlcixcbiAgICAgICAgICAgIGF0cm9wYS5zdHJpbmcudWNGaXJzdCxcbiAgICAgICAgICAgIGF0cm9wYS5yYW5kb20uc3RyaW5nXG4gICAgICAgIF0uZm9yRWFjaChmdW5jdGlvbiAocHJlcmVxdWlzaXRlKSB7XG4gICAgICAgICAgICBpZihwcmVyZXF1aXNpdGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHN1cHBvcnRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHN1cHBvcnRlZDtcbiAgICB9XG4pO1xuXG4vKipcbiAqIFRoaXMgY2xhc3MgcmVwcmVzZW50cyBhIGJhYmJsZXIuIFRoZSBiYWJibGVyXG4gKiBwcm9kdWNlcyBsb3J1bSBpcHN1bSB0ZXh0LCB0byB1c2VyIHNwZWNpZmljYXRpb25zLlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAqIEB2ZXJzaW9uIDIwMTMwMzEzXG4gKiBAY2xhc3MgVGhpcyBjbGFzcyByZXByZXNlbnRzIGEgYmFiYmxlclxuICogQHBhcmFtIHtOdW1iZXJ9IHdyZENvdW50IFRoZSBhbW91bnQgb2YgXCJ3b3Jkc1wiIHlvdSB3b3VsZCBsaWtlXG4gKiB0aGUgYmFiYmxlciB0byBwcm9kdWNlLlxuICogQHJldHVybnMge0JhYmJsZXJ9IFJldHVybnMgYSBiYWJibGVyLlxuICogQHJlcXVpcmVzIGF0cm9wYS5yYW5kb20uaW50ZWdlclxuICogQHJlcXVpcmVzIGF0cm9wYS5zdHJpbmcudWNGaXJzdFxuICogQHJlcXVpcmVzIGF0cm9wYS5yYW5kb20uc3RyaW5nXG4gKiBAZXhhbXBsZVxuICogdmFyIGJhYmJsZXIgPSBuZXcgYXRyb3BhLkJhYmJsZXIoMzApO1xuICogLy8gcmVzZXRzIHRoZSB3b3JkIGNvdW50XG4gKiBiYWJibGVyLnJlc2V0V29yZENvdW50KDEwKVxuICogY29uc29sZS5sb2coYmFiYmxlci5nZXRXb3JkQ291bnQoKSk7XG4gKiBcbiAqIC8vIGRpc3BsYXlzIGEgMTAgd29yZCBzZW50ZW5jZSBvZiBub25zZW5zZSB3b3Jkcy5cbiAqIGNvbnNvbGUubG9nKGJhYmJsZXIuZ2VuZXJhdGVCYWJibGUoMTApKTtcbiAqIC8vIGRpc3BsYXlzIGEgMyB3b3JkIHNlbnRlbmNlXG4gKiBjb25zb2xlLmxvZyhiYWJibGVyLmdlbmVyYXRlQmFiYmxlKDMpKTtcbiAqIFxuICogLy8gZGlzcGxheXMgdGhlIHVzZXIgc3RvcmVkIG9yIGxhc3QgZ2VuZXJhdGVkIGJhYmJsZVxuICogY29uc29sZS5sb2coYmFiYmxlci5nZXRCYWJibGUoKSk7XG4gKiBcbiAqIC8vIGNsZWFycyB0aGUgc3RvcmVkIGJhYmJsZVxuICogYmFiYmxlci5yZXNldEJhYmJsZSgpO1xuICogY29uc29sZS5sb2coYmFiYmxlci5nZXRCYWJibGUoKSk7XG4gKiBcbiAqIC8vIHNldHMgdGhlIGJhYmJsZVxuICogYmFiYmxlci5zZXRCYWJibGUoJ2hlcmUgYmUgZ2liYmVyaXNoICcpO1xuICogY29uc29sZS5sb2coYmFiYmxlci5nZXRCYWJibGUoKSk7XG4gKiBcbiAqIC8vIGFwcGVuZCBtb3JlIGdpYmJlcmlzaCB0byB0aGUgY3VycmVudCBiYWJibGVcbiAqIGJhYmJsZXIuc2V0QmFiYmxlKGJhYmJsZXIuZ2V0QmFiYmxlKCkgKyBiYWJibGVyLmdlbmVyYXRlQmFiYmxlKDUpKTtcbiAqIGNvbnNvbGUubG9nKGJhYmJsZXIuZ2V0QmFiYmxlKCkpO1xuICogXG4gKiAvLyBnZW5lcmF0ZSBhIHNlbnRlbmNlXG4gKiBiYWJibGVyLnJlc2V0V29yZENvdW50KDEwKTtcbiAqIGNvbnNvbGUubG9nKGJhYmJsZXIuZ2VuZXJhdGVTZW50ZW5jZSg1LCAyMCkpO1xuICogXG4gKiAvLyBnZW5lcmF0ZSByYW5kb20gcHVuY3R1YXRpb25cbiAqIGNvbnNvbGUubG9nKGJhYmJsZXIucHVuY3R1YXRlKCkpO1xuICogXG4gKiAvLyBnZW5lcmF0ZSBhIHdvcmRcbiAqIGNvbnNvbGUubG9nKGJhYmJsZXIuZ2VuZXJhdGVXb3JkKDMsNykpO1xuICogY29uc29sZS5sb2coYmFiYmxlci5nZW5lcmF0ZVdvcmQoNywxMCkpO1xuICovXG5hdHJvcGEuQmFiYmxlciA9IGZ1bmN0aW9uIEJhYmJsZXIod3JkQ291bnQpIHtcbiAgICAndXNlIHN0cmljdCc7XG4gICAgdmFyIG15ID0gdGhpcyxcbiAgICAgICAgYmFiYmxlID0gJycsXG4gICAgICAgIHdvcmRDb3VudCA9IDA7XG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgd29yZCBjb3VudC5cbiAgICAgKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAgICAgKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAgICAgKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gICAgICogQHZlcnNpb24gMjAxMzAzMTNcbiAgICAgKiBAbWV0aG9kT2YgYXRyb3BhLkJhYmJsZXIjXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHdyZENvdW50IFRoZSBhbW91bnQgb2YgXCJ3b3Jkc1wiIHdoaWNoIHlvdSB3YW50IHRoZVxuICAgICAqIGJhYmJsZXIgdG8gcHJvZHVjZS5cbiAgICAgKiBAcmV0dXJucyB7TnVtYmVyfSBSZXR1cm5zIHRoZSBzZXQgd29yZCBjb3VudCBmb3IgdGhpcyBiYWJibGVyLlxuICAgICAqL1xuICAgIHRoaXMuc2V0V29yZENvdW50ID0gZnVuY3Rpb24gKHdyZENvdW50KSB7XG4gICAgICAgIGlmICh0eXBlb2Ygd3JkQ291bnQgIT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICB3b3JkQ291bnQgPSAyNTA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3b3JkQ291bnQgPSB3cmRDb3VudDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gd29yZENvdW50O1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmVzZXRzIHRoZSB3b3JkIGNvdW50IGZvciB0aGlzIGJhYmJsZXIuXG4gICAgICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gICAgICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gICAgICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICAgICAqIEB2ZXJzaW9uIDIwMTMwMzEzXG4gICAgICogQG1ldGhvZE9mIGF0cm9wYS5CYWJibGVyI1xuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB3b3JkQ291bnQgVGhlIGFtb3VudCBvZiBcIndvcmRzXCIgeW91IHdvdWxkIGxpa2VcbiAgICAgKiB0byBzZXQgZm9yIHRoaXMgYmFiYmxlci5cbiAgICAgKiBAcmV0dXJucyB7TnVtYmVyfSBSZXR1cm5zIHRoZSBzZXQgd29yZCBjb3VudCBmb3IgdGhpcyBiYWJibGVyLlxuICAgICAqL1xuICAgIHRoaXMucmVzZXRXb3JkQ291bnQgPSBmdW5jdGlvbiByZXNldFdvcmRDb3VudCh3b3JkQ291bnQpIHtcbiAgICAgICAgbXkuc2V0V29yZENvdW50KHdvcmRDb3VudCk7XG4gICAgICAgIHJldHVybiB3b3JkQ291bnQ7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBjdXJyZW50IHdvcmQgY291bnQuXG4gICAgICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gICAgICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gICAgICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICAgICAqIEB2ZXJzaW9uIDIwMTIwOTA5XG4gICAgICogQG1ldGhvZE9mIGF0cm9wYS5CYWJibGVyI1xuICAgICAqIEByZXR1cm5zIHtOdW1iZXJ9IFJldHVybnMgdGhlIHdvcmQgY291bnQgZm9yIHRoaXMgYmFiYmxlci5cbiAgICAgKi9cbiAgICB0aGlzLmdldFdvcmRDb3VudCA9IGZ1bmN0aW9uIGdldFdvcmRDb3VudCgpIHtcbiAgICAgICAgcmV0dXJuIHdvcmRDb3VudDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEdlbmVyYXRlcyBhIHdvcmQgd2l0aCBhIHNwZWNpZmllZCBsZW5ndGguIExvd2VycyB0aGUgd29yZCBjb3VudCBieSBvbmUuXG4gICAgICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gICAgICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gICAgICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICAgICAqIEB2ZXJzaW9uIDIwMTIwOTA5XG4gICAgICogQG1ldGhvZE9mIGF0cm9wYS5CYWJibGVyI1xuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBzdHJpbmdNaW4gdGhlIHNob3J0ZXN0IHdvcmQsIGluIGNoYXJhY3RlcnMuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHN0cmluZ01heCBUaGUgbG9uZ2VzdCB3b3JkLCBpbiBjaGFyYWN0ZXJzLlxuICAgICAqIEByZXR1cm5zIHtTdHJpbmd9IFJldHVybnMgYSByYW5kb20gc3RyaW5nIG9mIGNoYXJhY3RlcnNcbiAgICAgKiB3aXRoaW4gdGhlIHNwZWNpZmllZCByYW5nZSBvZiBsZW5ndGguXG4gICAgICogQHJlcXVpcmVzIGF0cm9wYS5yYW5kb20uaW50ZWdlclxuICAgICAqIEByZXF1aXJlcyBhdHJvcGEucmFuZG9tLnN0cmluZ1xuICAgICAqL1xuICAgIHRoaXMuZ2VuZXJhdGVXb3JkID0gZnVuY3Rpb24gZ2VuZXJhdGVXb3JkKHN0cmluZ01pbiwgc3RyaW5nTWF4KSB7XG4gICAgICAgIHZhciB3b3JkTGVuZ3RoLFxuICAgICAgICB3b3JkO1xuICAgICAgICB3b3JkTGVuZ3RoID0gYXRyb3BhLnJhbmRvbS5pbnRlZ2VyKHN0cmluZ01pbiwgc3RyaW5nTWF4KTtcbiAgICAgICAgd29yZCA9IGF0cm9wYS5yYW5kb20uc3RyaW5nKHdvcmRMZW5ndGgsICdsb3dlcicpO1xuICAgICAgICB3b3JkQ291bnQtLTtcbiAgICAgICAgcmV0dXJuIHdvcmQ7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBQcm92aWRlcyByYW5kb20gcHVuY3R1YXRpb24uXG4gICAgICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gICAgICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gICAgICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICAgICAqIEB2ZXJzaW9uIDIwMTIwOTA5XG4gICAgICogQG1ldGhvZE9mIGF0cm9wYS5CYWJibGVyI1xuICAgICAqIEByZXR1cm5zIHtTdHJpbmd9IFJldHVybnMgYSByYW5kb20gcHVuY3R1YXRpb25cbiAgICAgKiBjaGFyYWN0ZXIgKCAuICEgb3IgPyApLlxuICAgICAqIEByZXF1aXJlcyBhdHJvcGEucmFuZG9tLnN0cmluZ1xuICAgICAqL1xuICAgIHRoaXMucHVuY3R1YXRlID0gZnVuY3Rpb24gcHVuY3R1YXRlKCkge1xuICAgICAgICB2YXIgcHVuY3R1YXRpb247XG4gICAgICAgIHB1bmN0dWF0aW9uID0gYXRyb3BhLnJhbmRvbS5zdHJpbmcoMSwgJ3B1bmN0dWF0aW9uJyk7XG4gICAgICAgIHJldHVybiBwdW5jdHVhdGlvbjtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEdlbmVyYXRlcyBhIHNlbnRlbmNlIG9mIHNwZWNpZmllZCBsZW5ndGggaW4gd29yZHMuIFRoZSBxdWFudGl0eVxuICAgICAqICBvZiB3b3JkcyBpbiB0aGUgZ2VuZXJhdGVkIHNlbnRlbmNlIHdpbGwgYmUgYmV0d2VlbiB0aGUgbWluaW11bVxuICAgICAqICBhbmQgbWF4aW11bSBzZXQsIHdpdGggdGhlIG1heGltdW0gY2FwcGVkIGF0IHRoZSBjdXJyZW50IHdvcmRzXG4gICAgICogIGNvdW50LiBUaGUgd29yZCBjb3VudCB3aWxsIGJlIGxvd2VyZWQgYnkgdGhlXG4gICAgICogIHF1YW50aXR5IG9mIHdvcmRzIGluIHRoZSBnZW5lcmF0ZWQgc2VudGVuY2UuIElmIHRoZSB3b3JkIGNvdW50XG4gICAgICogIGlzIDAgdGhlbiB0aGVyZSB3aWxsIGJlIG5vIHdvcmRzIGluIHRoZSBzZW50ZW5jZS4gSWYgdGhlIHdvcmRcbiAgICAgKiAgY291bnQgaXMgMyB0aGVuIHRoZSBtYXhpbXVtIHBvc3NpYmxlIG51bWJlciBvZiB3b3JkcyBpbiB0aGVcbiAgICAgKiAgc2VudGVuY2Ugd2lsbCBiZSB0aHJlZS5cbiAgICAgKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAgICAgKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAgICAgKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gICAgICogQHZlcnNpb24gMjAxMzAzMTNcbiAgICAgKiBAbWV0aG9kT2YgYXRyb3BhLkJhYmJsZXIjXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHNlbnRlbmNlTWluIFRoZSBzaG9ydGVzdCBzZW50ZW5jZSwgaW4gd29yZHMsXG4gICAgICogeW91IHdvdWxkIGxpa2UgcmV0dXJuZWQuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHNlbnRlbmNlTWF4IFRoZSBsb25nZXN0IHNlbnRlbmNlLCBpbiB3b3JkcyxcbiAgICAgKiB5b3Ugd291bGQgbGlrZSByZXR1cm5lZC5cbiAgICAgKiBAcmV0dXJucyB7U3RyaW5nfSBSZXR1cm5zIGEgXCJzZW50ZW5jZVwiIHdpdGhpbiB0aGUgc3BlY2lmaWVkXG4gICAgICogcmFuZ2Ugb2YgbGVuZ3RoLlxuICAgICAqIEByZXF1aXJlcyBhdHJvcGEucmFuZG9tLmludGVnZXJcbiAgICAgKiBAcmVxdWlyZXMgYXRyb3BhLnN0cmluZy51Y0ZpcnN0XG4gICAgICovXG4gICAgdGhpcy5nZW5lcmF0ZVNlbnRlbmNlID0gZnVuY3Rpb24gZ2VuZXJhdGVTZW50ZW5jZShcbiAgICAgICAgc2VudGVuY2VNaW4sIHNlbnRlbmNlTWF4XG4gICAgKSB7XG4gICAgICAgIHZhciB3b3JkLFxuICAgICAgICBzZW50ZW5jZUxlbmd0aCxcbiAgICAgICAgc2VudGVuY2U7XG4gICAgICAgIHNlbnRlbmNlTGVuZ3RoID0gYXRyb3BhLnJhbmRvbS5pbnRlZ2VyKHNlbnRlbmNlTWluLCBzZW50ZW5jZU1heCk7XG4gICAgICAgIHNlbnRlbmNlID0gJyc7XG4gICAgICAgIGlmIChzZW50ZW5jZUxlbmd0aCA+IHdvcmRDb3VudCkge1xuICAgICAgICAgICAgc2VudGVuY2VMZW5ndGggPSB3b3JkQ291bnQ7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChzZW50ZW5jZUxlbmd0aDsgc2VudGVuY2VMZW5ndGggPiAwOyBzZW50ZW5jZUxlbmd0aC0tKSB7XG4gICAgICAgICAgICBpZiAod29yZENvdW50ID4gMCkge1xuICAgICAgICAgICAgICAgIHdvcmQgPSBteS5nZW5lcmF0ZVdvcmQoNCwgMTIpO1xuICAgICAgICAgICAgICAgIHNlbnRlbmNlICs9ICcgJyArIHdvcmQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNlbnRlbmNlTGVuZ3RoID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBzZW50ZW5jZSArPSBteS5wdW5jdHVhdGUoKTtcbiAgICAgICAgcmV0dXJuIGF0cm9wYS5zdHJpbmcudWNGaXJzdChzZW50ZW5jZS50cmltKCkpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgYmFiYmxlLlxuICAgICAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICAgICAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICAgICAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAgICAgKiBAdmVyc2lvbiAyMDEzMDMxM1xuICAgICAqIEBtZXRob2RPZiBhdHJvcGEuQmFiYmxlciNcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gYmFiYmxlU3RyaW5nIFNwZWNpZmllZCBiYWJibGUgdG8gc2V0LlxuICAgICAqIEByZXR1cm5zIHtTdHJpbmd9IFJldHVybnMgdGhlIHN0b3JlZCBiYWJibGUuXG4gICAgICovXG4gICAgdGhpcy5zZXRCYWJibGUgPSBmdW5jdGlvbiBzZXRCYWJibGUoYmFiYmxlU3RyaW5nKSB7XG4gICAgICAgIGlmICh0eXBlb2YgYmFiYmxlU3RyaW5nID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgYmFiYmxlID0gYmFiYmxlU3RyaW5nO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbXkucmVzZXRCYWJibGUoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYmFiYmxlO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQ2xlYXJzIHRoZSBzdG9yZWQgYmFiYmxlLlxuICAgICAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICAgICAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICAgICAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAgICAgKiBAdmVyc2lvbiAyMDEyMDkwOVxuICAgICAqIEBtZXRob2RPZiBhdHJvcGEuQmFiYmxlciNcbiAgICAgKiBAcmV0dXJucyB7U3RyaW5nfSBSZXR1cm5zIHRoZSBzdG9yZWQgYmFiYmxlLlxuICAgICAqL1xuICAgIHRoaXMucmVzZXRCYWJibGUgPSBmdW5jdGlvbiByZXNldEJhYmJsZSgpIHtcbiAgICAgICAgYmFiYmxlID0gJyc7XG4gICAgICAgIHJldHVybiBiYWJibGU7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBsYXN0IGdlbmVyYXRlZCBiYWJibGUuXG4gICAgICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gICAgICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gICAgICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICAgICAqIEB2ZXJzaW9uIDIwMTIwOTA5XG4gICAgICogQG1ldGhvZE9mIGF0cm9wYS5CYWJibGVyI1xuICAgICAqIEByZXR1cm5zIHtTdHJpbmd9IFJldHVybnMgdGhlIHN0b3JlZCBiYWJibGUuXG4gICAgICovXG4gICAgdGhpcy5nZXRCYWJibGUgPSBmdW5jdGlvbiBnZXRCYWJibGUoKSB7XG4gICAgICAgIHJldHVybiBiYWJibGU7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZW5lcmF0ZXMgYmFiYmxlIHRvIGEgdXNlciBzcGVjaWZpZWQgbGVuZ3RoIGluIHdvcmRzLlxuICAgICAqICBUaGUgd29yZCBjb3VudCB3aWxsIGJlIHplcm8gYWZ0ZXIgdGhpcyBhbmQgdGhlIHN0b3JlZFxuICAgICAqICBiYWJibGUgd2lsbCBiZSBzZXQgdG8gdGhlIGdlbmVyYXRlZCBiYWJibGUuXG4gICAgICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gICAgICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gICAgICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICAgICAqIEB2ZXJzaW9uIDIwMTIwOTA5XG4gICAgICogQG1ldGhvZE9mIGF0cm9wYS5CYWJibGVyI1xuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB3b3Jkc0N0IFRoZSBkZXNpcmVkIHdvcmQgY291bnQgZm9yIHRoZVxuICAgICAqIGdlbmVyYXRlZCBiYWJibGUuXG4gICAgICogQHJldHVybnMge1N0cmluZ30gUmV0dXJucyBiYWJibGUgb2Ygc3BlY2lmaWVkIGxlbmd0aCBpbiB3b3Jkcy5cbiAgICAgKiBAc2VlIGF0cm9wYS5CYWJibGVyI2dldFdvcmRDb3VudFxuICAgICAqL1xuICAgIHRoaXMuZ2VuZXJhdGVCYWJibGUgPSBmdW5jdGlvbiBnZW5lcmF0ZUJhYmJsZSh3b3Jkc0N0KSB7XG4gICAgICAgIG15LnJlc2V0QmFiYmxlKCk7XG4gICAgICAgIG15LnJlc2V0V29yZENvdW50KHdvcmRzQ3QpO1xuICAgICAgICBmb3IgKHdvcmRDb3VudDsgd29yZENvdW50ID4gMDsgYmFiYmxlICs9ICcgJykge1xuICAgICAgICAgICAgbXkuc2V0QmFiYmxlKGJhYmJsZSArIG15LmdlbmVyYXRlU2VudGVuY2UoNSwgMjApKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYmFiYmxlO1xuICAgIH07XG4gICAgXG4gICAgYXRyb3BhLnN1cHBvcnRDaGVjaygnQmFiYmxlcicpO1xuICAgIHRoaXMucmVzZXRXb3JkQ291bnQod3JkQ291bnQpO1xufTtcblxuXG5cblxud2hpbGUoYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLmxlbmd0aCA+IDApIHtcbiAgICBhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMucG9wKCkoKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gYXRyb3BhO1xuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2RvY3MvdnNkb2MvT3BlbkxheWVyc0FsbC5qc1wiLz5cbnZhciBhdHJvcGEgPSByZXF1aXJlKCdhdHJvcGEtaGVhZGVyJyk7XG4vKmpzbGludFxuICAgIGluZGVudDogNCxcbiAgICBtYXhlcnI6IDUwLFxuICAgIHdoaXRlOiB0cnVlLFxuICAgIGJyb3dzZXI6IHRydWUsXG4gICAgZGV2ZWw6IHRydWUsXG4gICAgcGx1c3BsdXM6IHRydWUsXG4gICAgcmVnZXhwOiB0cnVlXG4qL1xuLypnbG9iYWwgYXRyb3BhICovXG4vLyBlbmQgaGVhZGVyXG5cbmF0cm9wYS5yZXF1aXJlcyhcbiAgICAnQ29va2llTW9uc3RlcicsXG4gICAgZnVuY3Rpb24gKCkge1xuICAgICAgICBcInVzZSBzdHJpY3RcIjtcbiAgICAgICAgdmFyIHN1cHBvcnRlZCA9IHRydWU7XG4gICAgICAgIFxuICAgICAgICBbXG4gICAgICAgICAgICBkb2N1bWVudC5jb29raWVcbiAgICAgICAgXS5mb3JFYWNoKGZ1bmN0aW9uIChwcmVyZXF1aXNpdGUpIHtcbiAgICAgICAgICAgIGlmKHByZXJlcXVpc2l0ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgc3VwcG9ydGVkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gc3VwcG9ydGVkO1xuICAgIH1cbik7XG5cbi8qKlxuICogVGhpcyBpcyBhIGNvb2tpZSBoYW5kbGVyLlxuICogQGV4YW1wbGVcbiAqIC8vIGNvb2tpZSBvYmplY3RcbiAqIHZhciBjb29raWVPYmogPSB7XCJrZXlcIiA6IFwiY29va2llTmFtZVwiLCBcInZhbFwiIDogXCJjb29raWVWYWxcIn1cbiAqIC8vIGNvb2tpZSBzdHJpbmcgXG4gKiB2YXIgY29va2llU3RyaW5nID0gY29va2llTmFtZT1jb29raWVWYWw7XG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQHZlcnNpb24gMjAxMzAyMjNcbiAqIEBjbGFzcyBUaGlzIHJlcHJlc2VudHMgYSBjb29raWUgaGFuZGxlclxuICogQHJldHVybnMge0Nvb2tpZU1vbnN0ZXJ9IEEgY29va2llIGhhbmRsZXIuXG4gKiBAcmVxdWlyZXMgYXRyb3BhLmRhdGFcbiAqL1xuYXRyb3BhLkNvb2tpZU1vbnN0ZXIgPSBmdW5jdGlvbiBDb29raWVNb25zdGVyKCkge1xuICAgICd1c2Ugc3RyaWN0JztcbiAgICB2YXIgY3VycmVudENvb2tpZXMsIGdldENvb2tpZUNhbGxiYWNrO1xuICAgIFxuICAgIC8qKlxuICAgICAqIFRoaXMgaG9sZHMgdGhlIGN1cnJlbnQgY29va2llIG9iamVjdCBhcnJheS5cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEB0eXBlIEFycmF5XG4gICAgICogQGZpZWxkT2YgYXRyb3BhLkNvb2tpZU1vbnN0ZXItXG4gICAgICovXG4gICAgY3VycmVudENvb2tpZXMgPSBbXTtcbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyBhIGNvb2tpZSBzdHJpbmcgaW50byBhbiBvYmplY3QuXG4gICAgICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gICAgICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gICAgICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICAgICAqIEB2ZXJzaW9uIDIwMTMwMjIzXG4gICAgICogQG1ldGhvZE9mIGF0cm9wYS5Db29raWVNb25zdGVyI1xuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBjb29raWUgQSBjb29raWUgcmVwcmVzZW50ZWQgYXMgYSBzdHJpbmdcbiAgICAgKiA8Y29kZT5jb29raWVOYW1lPWNvb2tpZVZhbDs8L2NvZGU+XG4gICAgICogQHJldHVybnMge2Nvb2tpZU9ian0gUmV0dXJucyBhIGNvb2tpZSBvYmplY3QuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgY29va2llTW9uc3RlciA9IG5ldyBhdHJvcGEuQ29va2llTW9uc3RlcigpO1xuICAgICAqIHZhciBjb29raWVPYmogPSBjb29raWVNb25zdGVyLmNvb2tpZTJvYmooJ2F0cm9wYT1oaWFsIGF0cm9wYSEhOycpO1xuICAgICAqIGNvbnNvbGUubG9nKGNvb2tpZU9iaik7XG4gICAgICovXG4gICAgdGhpcy5jb29raWUyb2JqID0gZnVuY3Rpb24gY29va2llMm9iaihjb29raWUpIHtcbiAgICAgICAgdmFyIGNvb2tpZU9iaiA9IHt9O1xuICAgICAgICBpZiAoIWNvb2tpZSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGNvb2tpZU9iai5rZXkgPSBjb29raWUuc3Vic3RyKDAsIGNvb2tpZS5pbmRleE9mKFwiPVwiKSkudHJpbSgpO1xuICAgICAgICBjb29raWVPYmoudmFsID0gY29va2llLnN1YnN0cihjb29raWUuaW5kZXhPZihcIj1cIikgKyAxKTtcbiAgICAgICAgaWYoY29va2llT2JqLnZhbC5zdWJzdHIoLTEpID09PSAnOycpIHtcbiAgICAgICAgICAgIGNvb2tpZU9iai52YWwgPSBjb29raWVPYmoudmFsLnN1YnN0cigwLCBjb29raWVPYmoudmFsLmxlbmd0aCAtIDEpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb29raWVPYmo7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyBhIGNvb2tpZSBvYmplY3QgdG8gYSBjb29raWUgc3RyaW5nLlxuICAgICAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICAgICAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICAgICAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAgICAgKiBAdmVyc2lvbiAyMDEyMDkwOVxuICAgICAqIEBtZXRob2RPZiBhdHJvcGEuQ29va2llTW9uc3RlciNcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gY29va2llT2JqIEEgY29va2llIG9iamVjdFxuICAgICAqIEByZXR1cm5zIHtTdHJpbmd9IFJldHVybnMgYSBjb29raWUgc3RyaW5nLlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIGNvb2tpZU1vbnN0ZXIgPSBuZXcgYXRyb3BhLkNvb2tpZU1vbnN0ZXIoKTtcbiAgICAgKiAvLyBjcmVhdGluZyBhIGNvb2tpZVxuICAgICAqIGNvb2tpZU1vbnN0ZXIuc2V0Q29va2llKCdhdHJvcGEnLCAnaGlhbCBhdHJvcGEhIScpO1xuICAgICAqIGNvbnNvbGUubG9nKGRvY3VtZW50LmNvb2tpZSk7XG4gICAgICogXG4gICAgICogLy8gZ2V0dGluZyBhIGNvb2tpZSBvYmplY3RcbiAgICAgKiB2YXIgY29va2llT2JqID0gY29va2llTW9uc3Rlci5nZXRDb29raWUoJ2F0cm9wYScpO1xuICAgICAqIGNvbnNvbGUubG9nKGNvb2tpZU9iaik7XG4gICAgICogXG4gICAgICogLy8gY29udmVydCB0aGUgY29va2llIG9iamVjdCB0byBhIHN0cmluZ1xuICAgICAqIGNvbnNvbGUubG9nKGNvb2tpZU1vbnN0ZXIuYmFrZUNvb2tpZShjb29raWVPYmopKTtcbiAgICAgKi9cbiAgICB0aGlzLmJha2VDb29raWUgPSBmdW5jdGlvbiBiYWtlQ29va2llKGNvb2tpZU9iaikge1xuICAgICAgICB2YXIgY29va2llID0gJycsIGtleSwgdmFsO1xuICAgICAgICBcbiAgICAgICAga2V5ID0gY29va2llT2JqLmtleTtcbiAgICAgICAgdmFsID0gY29va2llT2JqLnZhbDtcbiAgICAgICAgY29va2llID0ga2V5ICsgJz0nICsgdmFsICsgJzsnO1xuICAgICAgICByZXR1cm4gY29va2llO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogRmlsdGVyIGNvb2tpZXMgYmFzZWQgb24gdXNlciBzcGVjaWZpZWQgY2FsbGJhY2suXG4gICAgICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gICAgICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gICAgICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICAgICAqIEB2ZXJzaW9uIDIwMTMwMjIzXG4gICAgICogQG1ldGhvZE9mIGF0cm9wYS5Db29raWVNb25zdGVyI1xuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrIFRoZSBjYWxsYmFjayBmdW5jdGlvbiB3aWxsIGJlIHBhc3NlZFxuICAgICAqICB0d28gYXJndW1lbnRzLiBUaGUgZmlyc3QgaXMgYSBjb29raWUgb2JqZWN0IGZyb20gdGhlIGN1cnJlbnRcbiAgICAgKiAgZG9jdW1lbnQuIFRoZSBzZWNvbmQgYXJndW1lbnQgaXMgdGhlIHZhbHVlIHN1cHBsaWVkIGZvclxuICAgICAqICA8Y29kZT5hcmdzPC9jb2RlPiBpZiB0aGUgY2FsbGJhY2sgZnVuY3Rpb24gcmV0dXJucyA8Y29kZT50cnVlPC9jb2RlPlxuICAgICAqICB0aGVuIHRoZSBjb29raWUgb2JqZWN0IHdpbGwgYmUgaW5jbHVkZWQgaW4gdGhlIHJldHVybiByZXN1bHRzLlxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGFyZ3MgQXJndW1lbnRzIHRvIHBhc3MgdG8gdGhlIGNhbGxiYWNrXG4gICAgICogZnVuY3Rpb24uXG4gICAgICogQHJldHVybnMge0FycmF5fSBBbiBhcnJheSBvZiBjb29raWUgb2JqZWN0cy5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBjb29raWVNb25zdGVyID0gbmV3IGF0cm9wYS5Db29raWVNb25zdGVyKCk7XG4gICAgICogLy8gY3JlYXRpbmcgYSBmZXcgY29va2llc1xuICAgICAqIGNvb2tpZU1vbnN0ZXIuc2V0Q29va2llKCdhdHJvcGEnLCAnaGlhbCBhdHJvcGEhIScpO1xuICAgICAqIGNvb2tpZU1vbnN0ZXIuc2V0Q29va2llKCdrYXRqaWknLCAnbXVuY2hpbmcnKTtcbiAgICAgKiBjb25zb2xlLmxvZyhkb2N1bWVudC5jb29raWUpO1xuICAgICAqIFxuICAgICAqIC8vIGZpbHRlciBjb29raWVzXG4gICAgICogZnVuY3Rpb24gY29va2llRmlsdGVyKGNvb2tpZU9iaiwgY29va2llVmFsdWUpIHtcbiAgICAgKiAgICAgaWYoY29va2llT2JqLnZhbCA9PT0gY29va2llVmFsdWUpIHtcbiAgICAgKiAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAqICAgICB9IGVsc2Uge1xuICAgICAqICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAqICAgICB9XG4gICAgICogfVxuICAgICAqIHZhciBjb29raWVPYmpBcnJheSA9IGNvb2tpZU1vbnN0ZXIuaW5zcGVjdENvb2tpZXMoXG4gICAgICogICAgIGNvb2tpZUZpbHRlciwgJ211bmNoaW5nJyk7XG4gICAgICogY29uc29sZS5sb2coY29va2llT2JqQXJyYXkpO1xuICAgICAqL1xuICAgIHRoaXMuaW5zcGVjdENvb2tpZXMgPSBmdW5jdGlvbiBpbnNwZWN0Q29va2llcyhjYWxsYmFjaywgYXJncykge1xuICAgICAgICB2YXIgdGVzdENvb2tpZSwgY29va2llcywgamFyID0gW107XG4gICAgICAgIGNvb2tpZXMgPSB0aGlzLmdldENvb2tpZXMoKTtcbiAgICAgICAgd2hpbGUgKGNvb2tpZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGVzdENvb2tpZSA9IGNvb2tpZXMuc2hpZnQoKTtcbiAgICAgICAgICAgIGlmIChjYWxsYmFjayh0ZXN0Q29va2llLCBhcmdzKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIGphci5wdXNoKHRlc3RDb29raWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBqYXI7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBJbnRlcm5hbCBjYWxsYmFjayBmdW5jdGlvbiB1c2VkIHdoaWxlIGdldHRpbmcgdGhlIGN1cnJlbnRcbiAgICAgKiBjb29raWVzLlxuICAgICAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICAgICAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICAgICAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAgICAgKiBAdmVyc2lvbiAyMDEzMDIyM1xuICAgICAqIEBwcml2YXRlXG4gICAgICogQG1ldGhvZE9mIGF0cm9wYS5Db29raWVNb25zdGVyLVxuICAgICAqIEBwYXJhbSB7Y29va2llT2JqfSB0ZXN0Q29va2llIEEgY29va2llIG9iamVjdFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBhcmdzIGFyZ3VtZW50IHVzZWQgaW4gY29tcGFyaXNvbiBmdW5jdGlvblxuICAgICAqIEByZXR1cm5zIHtCb29sZWFufSBJZiBjb29raWUga2V5IGlzIGV4YWN0bHkgZXF1YWwgdG8gdGhlIGFyZ3VtZW50XG4gICAgICogdGhlbiB0aGUgY2FsbGJhY2sgcmV0dXJucyB0cnVlLlxuICAgICAqL1xuICAgIGdldENvb2tpZUNhbGxiYWNrID0gZnVuY3Rpb24gZ2V0Q29va2llQ2FsbGJhY2sodGVzdENvb2tpZSwgYXJncykge1xuICAgICAgICB2YXIgb3V0O1xuICAgICAgICBpZiAodGVzdENvb2tpZS5rZXkgPT09IGFyZ3MpIHtcbiAgICAgICAgICAgIG91dCA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvdXQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0cyBhIHVzZXIgcmVxdWVzdGVkIGNvb2tpZS5cbiAgICAgKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAgICAgKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAgICAgKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gICAgICogQHZlcnNpb24gMjAxMzAyMjNcbiAgICAgKiBAbWV0aG9kT2YgYXRyb3BhLkNvb2tpZU1vbnN0ZXIjXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHdoaWNoS2V5IFRoZSBjb29raWVzIGtleSAobmFtZSlcbiAgICAgKiBAcmV0dXJucyB7Y29va2llT2JqfGZhbHNlfSBSZXR1cm5zIGEgY29va2llIG9iamVjdCBpZlxuICAgICAqICBhIGNvb2tpZSB3aXRoIHRoZSBzcGVjaWZpZWQga2V5IGlzIGZvdW5kIG9yIGZhbHNlIGlmXG4gICAgICogIGl0IGlzIG5vdCBmb3VuZC5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBjb29raWVNb25zdGVyID0gbmV3IGF0cm9wYS5Db29raWVNb25zdGVyKCk7XG4gICAgICogLy8gY3JlYXRpbmcgYSBjb29raWVcbiAgICAgKiBjb29raWVNb25zdGVyLnNldENvb2tpZSgnYXRyb3BhJywgJ2hpYWwgYXRyb3BhISEnKTtcbiAgICAgKiBjb25zb2xlLmxvZyhkb2N1bWVudC5jb29raWUpO1xuICAgICAqIC8vIGdldCBhIHNwZWNpZmljIGNvb2tpZVxuICAgICAqIHZhciBjb29raWVPYmogPSBjb29raWVNb25zdGVyLmdldENvb2tpZSgnYXRyb3BhJyk7XG4gICAgICogY29uc29sZS5sb2coY29va2llT2JqLmtleSk7XG4gICAgICogY29uc29sZS5sb2coY29va2llT2JqLnZhbCk7XG4gICAgICovXG4gICAgdGhpcy5nZXRDb29raWUgPSBmdW5jdGlvbiBnZXRDb29raWUod2hpY2hLZXkpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHRoaXMuaW5zcGVjdENvb2tpZXMoZ2V0Q29va2llQ2FsbGJhY2ssIHdoaWNoS2V5LnRyaW0oKSk7XG4gICAgICAgIHJldHVybiByZXN1bHRbMF0gfHwgZmFsc2U7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZXQgYWxsIGNvb2tpZXMuXG4gICAgICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gICAgICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gICAgICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICAgICAqIEB2ZXJzaW9uIDIwMTIwOTA5XG4gICAgICogQG1ldGhvZE9mIGF0cm9wYS5Db29raWVNb25zdGVyI1xuICAgICAqIEByZXR1cm5zIHtBcnJheX0gQW4gYXJyYXkgd2hvc2UgZWxlbWVudHMgYXJlIGNvb2tpZSBvYmplY3RzLlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIGNvb2tpZU1vbnN0ZXIgPSBuZXcgYXRyb3BhLkNvb2tpZU1vbnN0ZXIoKTtcbiAgICAgKiAvLyBjcmVhdGluZyBhIGNvb2tpZVxuICAgICAqIGNvb2tpZU1vbnN0ZXIuc2V0Q29va2llKCdhdHJvcGEnLCAnaGlhbCBhdHJvcGEhIScpO1xuICAgICAqIC8vIGdldCBhbGwgY29va2llIG9iamVjdHMgaW4gYW4gYXJyYXlcbiAgICAgKiBjb25zb2xlLmxvZyhjb29raWVNb25zdGVyLmdldENvb2tpZXMoKSk7XG4gICAgICovXG4gICAgdGhpcy5nZXRDb29raWVzID0gZnVuY3Rpb24gZ2V0Q29va2llcygpIHtcbiAgICAgICAgdmFyIG4sIGwsIGNvb2tpZUFycmF5LCBjb29raWVPYmo7XG4gICAgICAgIGN1cnJlbnRDb29raWVzID0gW107XG4gICAgICAgIGNvb2tpZUFycmF5ID0gZG9jdW1lbnQuY29va2llLnNwbGl0KFwiO1wiKTtcbiAgICAgICAgZm9yIChuID0gMCwgbCA9IGNvb2tpZUFycmF5Lmxlbmd0aDsgbiA8IGw7IG4rKykge1xuICAgICAgICAgICAgY29va2llT2JqID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAoY29va2llQXJyYXlbbl0pIHtcbiAgICAgICAgICAgICAgICBjb29raWVPYmogPSB0aGlzLmNvb2tpZTJvYmooY29va2llQXJyYXlbbl0pO1xuICAgICAgICAgICAgICAgIGlmIChjb29raWVPYmopIHtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudENvb2tpZXMucHVzaChjb29raWVPYmopO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY3VycmVudENvb2tpZXM7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBEZWxldGVzIGEgc3BlY2lmaWVkIGNvb2tpZSBieSB1c2VyIHN1Ym1pdHRlZCBzdHJpbmcuXG4gICAgICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gICAgICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gICAgICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICAgICAqIEB2ZXJzaW9uIDIwMTMwMjIzXG4gICAgICogQG1ldGhvZE9mIGF0cm9wYS5Db29raWVNb25zdGVyI1xuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB3aGljaEtleSBUaGUgY29va2llcyBrZXkgKG5hbWUpIHRoYXRcbiAgICAgKiB3aWxsIGJlIGRlbGV0ZWQuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgY29va2llTW9uc3RlciA9IG5ldyBhdHJvcGEuQ29va2llTW9uc3RlcigpO1xuICAgICAqIC8vIGNyZWF0aW5nIHRoZSBjb29raWUgdG8gZGVsZXRlXG4gICAgICogY29va2llTW9uc3Rlci5zZXRDb29raWUoJ2F0cm9wYScsICdoaWFsIGF0cm9wYSEhJyk7XG4gICAgICogY29uc29sZS5sb2coZG9jdW1lbnQuY29va2llKTtcbiAgICAgKiAvLyBkZWxldGUgYSBjb29raWVcbiAgICAgKiBjb29raWVNb25zdGVyLmRlbGV0ZUNvb2tpZSgnYXRyb3BhJyk7XG4gICAgICogY29uc29sZS5sb2coZG9jdW1lbnQuY29va2llKTtcbiAgICAgKi9cbiAgICB0aGlzLmRlbGV0ZUNvb2tpZSA9IGZ1bmN0aW9uIGRlbGV0ZUNvb2tpZSh3aGljaEtleSkge1xuICAgICAgICB2YXIgY29va2llT2JqID0ge307XG4gICAgICAgIGNvb2tpZU9iai5rZXkgPSB3aGljaEtleTtcbiAgICAgICAgY29va2llT2JqLnZhbCA9ICc7ZXhwaXJlcz1UaHUsIDIgQXVnIDIwMDEgMjA6NDc6MTEgVVRDJztcbiAgICAgICAgZG9jdW1lbnQuY29va2llID0gdGhpcy5iYWtlQ29va2llKGNvb2tpZU9iaik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBEZWxldGVzIGEgc3BlY2lmaWVkIGNvb2tpZSBieSB1c2VyIHN1Ym1pdHRlZCBjb29raWVPYmouXG4gICAgICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gICAgICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gICAgICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICAgICAqIEB2ZXJzaW9uIDIwMTIwOTA5XG4gICAgICogQG1ldGhvZE9mIGF0cm9wYS5Db29raWVNb25zdGVyI1xuICAgICAqIEBwYXJhbSB7Y29va2llT2JqfSBjb29raWVPYmogQSBjb29raWUgb2JqZWN0LlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIGNvb2tpZU1vbnN0ZXIgPSBuZXcgYXRyb3BhLkNvb2tpZU1vbnN0ZXIoKTtcbiAgICAgKiAvLyBjcmVhdGluZyB0aGUgY29va2llIHRvIGRlbGV0ZVxuICAgICAqIGNvb2tpZU1vbnN0ZXIuc2V0Q29va2llKCdhdHJvcGEnLCAnaGlhbCBhdHJvcGEhIScpO1xuICAgICAqIGNvbnNvbGUubG9nKGRvY3VtZW50LmNvb2tpZSk7XG4gICAgICogLy8gZGVsZXRlIGEgY29va2llXG4gICAgICogY29va2llTW9uc3Rlci5kZWxldGVDb29raWVPYmooXG4gICAgICogICAgIHtrZXkgOiAnYXRyb3BhJywgdmFsIDogJ2RvZXMgbm90IG1hdHRlcid9KTtcbiAgICAgKiBjb25zb2xlLmxvZyhkb2N1bWVudC5jb29raWUpO1xuICAgICAqL1xuICAgIHRoaXMuZGVsZXRlQ29va2llT2JqID0gZnVuY3Rpb24gZGVsZXRlQ29va2llT2JqKGNvb2tpZU9iaikge1xuICAgICAgICB0aGlzLmRlbGV0ZUNvb2tpZShjb29raWVPYmoua2V5KTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFNldHMgYSBjb29raWUgcGVyIHVzZXIgc3BlY2lmaWNhdGlvbnMgYXMgc3RyaW5ncy4gVGhlIGNvb2tpZVxuICAgICAqIHdpbGwgZXhwaXJlIHdoZW4gdGhlIGJyb3dzZXIgaXMgY2xvc2VkLlxuICAgICAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICAgICAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICAgICAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAgICAgKiBAdmVyc2lvbiAyMDEyMDkwOVxuICAgICAqIEBtZXRob2RPZiBhdHJvcGEuQ29va2llTW9uc3RlciNcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gd2hpY2hLZXkgVGhlIGtleSAobmFtZSkgb2YgdGhlIG5ldyBjb29raWVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gc2V0VG8gVGhlIHZhbHVlIG9mIHRoZSBuZXcgY29va2llLlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIGNvb2tpZU1vbnN0ZXIgPSBuZXcgYXRyb3BhLkNvb2tpZU1vbnN0ZXIoKTtcbiAgICAgKiAvLyBzZXQgYSBjb29raWVcbiAgICAgKiBjb29raWVNb25zdGVyLnNldENvb2tpZSgnYXRyb3BhJywgJ2hpYWwnKTtcbiAgICAgKiBjb25zb2xlLmxvZyhkb2N1bWVudC5jb29raWUpO1xuICAgICAqL1xuICAgIHRoaXMuc2V0Q29va2llID0gZnVuY3Rpb24gc2V0Q29va2llKHdoaWNoS2V5LCBzZXRUbykge1xuICAgICAgICB2YXIgbmV3Q29va2llID0ge307XG4gICAgICAgIG5ld0Nvb2tpZS5rZXkgPSB3aGljaEtleTtcbiAgICAgICAgbmV3Q29va2llLnZhbCA9IHNldFRvO1xuICAgICAgICBkb2N1bWVudC5jb29raWUgPSB0aGlzLmJha2VDb29raWUobmV3Q29va2llKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFNldHMgYSBjb29raWUgcGVyIHVzZXIgc3BlY2lmaWNhdGlvbnMgYXMgYW4gb2JqZWN0LlxuICAgICAqIFRoZSBjb29raWUgd2lsbCBleHBpcmUgd2hlbiB0aGUgYnJvd3NlciBpcyBjbG9zZWQuXG4gICAgICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gICAgICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gICAgICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICAgICAqIEB2ZXJzaW9uIDIwMTIwOTA5XG4gICAgICogQG1ldGhvZE9mIGF0cm9wYS5Db29raWVNb25zdGVyI1xuICAgICAqIEBwYXJhbSB7Y29va2llT2JqfSBjb29raWVPYmogQSBjb29raWUgb2JqZWN0LlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIGNvb2tpZU1vbnN0ZXIgPSBuZXcgYXRyb3BhLkNvb2tpZU1vbnN0ZXIoKTtcbiAgICAgKiAvLyBzZXQgYSBjb29raWVcbiAgICAgKiBjb29raWVNb25zdGVyLnNldENvb2tpZU9iaih7a2V5IDogJ2F0cm9wYScsIHZhbCA6ICdoaWFsIGF0cm9wYSEhJ30pO1xuICAgICAqIGNvbnNvbGUubG9nKGRvY3VtZW50LmNvb2tpZSk7XG4gICAgICovXG4gICAgdGhpcy5zZXRDb29raWVPYmogPSBmdW5jdGlvbiBzZXRDb29raWVPYmooY29va2llT2JqKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNldENvb2tpZShjb29raWVPYmoua2V5LCBjb29raWVPYmoudmFsKTtcbiAgICB9O1xuICAgIFxuICAgIGF0cm9wYS5zdXBwb3J0Q2hlY2soJ0Nvb2tpZU1vbnN0ZXInKTtcbn07XG5cblxuXG5cbndoaWxlKGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5sZW5ndGggPiAwKSB7XG4gICAgYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLnBvcCgpKCk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGF0cm9wYTtcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9kb2NzL3ZzZG9jL09wZW5MYXllcnNBbGwuanNcIi8+XG52YXIgYXRyb3BhID0gcmVxdWlyZSgnYXRyb3BhLWhlYWRlcicpO1xuYXRyb3BhLlJlcXVlc3RlciA9IHJlcXVpcmUoJ2F0cm9wYS1SZXF1ZXN0ZXInKS5SZXF1ZXN0ZXI7XG5hdHJvcGEuSFRNTFBhcnNlciA9IHJlcXVpcmUoJ2F0cm9wYS1IVE1MUGFyc2VyJykuSFRNTFBhcnNlcjtcbi8qanNsaW50XG4gICAgaW5kZW50OiA0LFxuICAgIG1heGVycjogNTAsXG4gICAgd2hpdGU6IHRydWUsXG4gICAgYnJvd3NlcjogdHJ1ZSxcbiAgICBkZXZlbDogdHJ1ZSxcbiAgICBwbHVzcGx1czogdHJ1ZSxcbiAgICByZWdleHA6IHRydWVcbiovXG4vKmdsb2JhbCBhdHJvcGEgKi9cbi8vIGVuZCBoZWFkZXJcblxuYXRyb3BhLnJlcXVpcmVzKFxuICAgICdDcmVhdGVIdG1sRG9jdW1lbnRzRnJvbVhtbGh0dHAnLFxuICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgICAgIHZhciBzdXBwb3J0ZWQgPSB0cnVlO1xuICAgICAgICBcbiAgICAgICAgW1xuICAgICAgICAgICAgYXRyb3BhLlJlcXVlc3RlcixcbiAgICAgICAgICAgIGF0cm9wYS5IVE1MUGFyc2VyXG4gICAgICAgIF0uZm9yRWFjaChmdW5jdGlvbiAocHJlcmVxdWlzaXRlKSB7XG4gICAgICAgICAgICBpZihwcmVyZXF1aXNpdGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHN1cHBvcnRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHN1cHBvcnRlZDtcbiAgICB9XG4pO1xuXG4vKipcbiAqIENyZWF0ZXMgSFRNTCBET00gRG9jdW1lbnRzIGZyb20gYW4gWE1MSHR0cFJlcXVlc3Qgb2JqZWN0LlxuICogIFRoaXMgd2FzIHRlc3RlZCBvbiBGaXJlZm94LCBpdCBkb2Vzbid0IHdvcmsgb24gZ29vZ2xlIGNocm9tZS5cbiAqICBZb3VyIG1pbGVhZ2UgbWF5IHZhcnkuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQHZlcnNpb24gMjAxMzAyMjVcbiAqIEBjbGFzcyBDcmVhdGVzIEhUTUwgRE9NIERvY3VtZW50cyBmcm9tIGFuIFhNTEh0dHBSZXF1ZXN0IG9iamVjdC5cbiAqIEByZXF1aXJlcyBhdHJvcGEuUmVxdWVzdGVyXG4gKiBAcmVxdWlyZXMgYXRyb3BhLkhUTUxQYXJzZXJcbiAqIEByZXF1aXJlcyBhdHJvcGEuZGF0YVxuICogQGV4YW1wbGVcbiAqIHZhciBtZXRob2QsIHVybCwgY2FsbGJhY2ssIGRvY3M7XG4gKiBcbiAqIC8vIEhUVFAgUmVxdWVzdCBtZXRob2RcbiAqIG1ldGhvZCA9ICdnZXQnO1xuICogXG4gKiAvLyB0aGUgcGFnZSB0byBmZXRjaCwgdGhpcyBwYWdlIG11c3QgYmUgYWNjZXNzaWJsZVxuICogLy8gc2VjdXJpdHkgcmVzdHJpY3Rpb25zIG1heSBhcHBseVxuICogdXJsID0gJ2RvY3MvanNkb2Mvc3ltYm9scy9hdHJvcGEueHBhdGguaHRtbCc7XG4gKiBcbiAqIC8vIHRoZSBjYWxsYmFjayBmdW50aW9uIGZvciB3aGVuIGEgbmV3IGRvY3VtZW50IGlzIGNyZWF0ZWRcbiAqIGNhbGxiYWNrID0gZnVuY3Rpb24gbmV3RG9jdW1lbnRIYW5kbGVyKGRvY3JlZikge1xuICogICAgIHRyeSB7XG4gKiAgICAgICAgIGlmIChmYWxzZSA9PT0gZG9jcmVmKSB7XG4gKiAgICAgICAgICAgICAvLyBpZiB0aGUgZG9jdW1lbnQgY291bGQgbm90IGJlIGNyZWF0ZWQgdGhyb3cgYW4gZXJyb3JcbiAqICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignYXRyb3BhLkNyZWF0ZUh0bWxEb2N1bWVudHNGcm9tWG1saHR0cCAnICtcbiAqICAgICAgICAgICAgICAgICAgJ0NvdWxkIG5vdCBjcmVhdGUgaGlkZGVuIGRvY3VtZW50Jyk7XG4gKiAgICAgICAgIH0gZWxzZSB7XG4gKiAgICAgICAgICAgICAvLyBpZiB0aGUgZG9jdW1lbnQgY291bGQgYmUgY3JlYXRlZCB3ZSdsbCB0cnkgdG8gdXNlIGl0XG4gKiAgICAgICAgICAgICBpZihkb2NyZWYuZ2V0RWxlbWVudEJ5SWQoJ2luZGV4JykpIHtcbiAqICAgICAgICAgICAgICAgICAvLyBpZiB0aGUgZG9jdW1lbnQgY291bGQgYmUgdXNlZCB0aGVuXG4gKiAgICAgICAgICAgICAgICAgLy8gZG8gc29tZXRoaW5nIHVzZWZ1bCB3aXRoIGl0LlxuICogICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzdWNjZXNzIScpO1xuICogICAgICAgICAgICAgfSBlbHNlIHtcbiAqICAgICAgICAgICAgICAgICAvLyBpZiB0aGUgZG9jdW1lbnQgY2FuIG5vdCBiZSB1c2VkIHRocm93IGFuIGVycm9yXG4gKiAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdhdHJvcGEuQ3JlYXRlSHRtbERvY3VtZW50c0Zyb21YbWxodHRwICcgK1xuICogICAgICAgICAgICAgICAgICAgICAgJ2NvdWxkIG5vdCB1c2UgdGhlIGhpZGRlbiBkb2N1bWVudCcpO1xuICogICAgICAgICAgICAgfVxuICogICAgICAgICB9XG4gKiAgICAgfSBjYXRjaCAoZSkge1xuICogICAgICAgICAvLyBjYXRjaGluZyBhbnkgZXJyb3JzIHRocm93biBhbmQgaGFuZGxlIHRoZW0uXG4gKiAgICAgfVxuICogICAgIC8vIEF0IHRoaXMgcG9pbnQgdGhlIHdvcmsgd2l0aCB0aGUgZG9jdW1lbnQgaXMgY3VycmVudGx5IGZpbmlzaGVkXG4gKiAgICAgLy8gdGhlIGRvY3VtZW50IHdpbGwgbGl2ZSBpbiB0aGUgZG9jdW1lbnRRdWV1ZSBpbiBjYXNlIHlvdSBuZWVkIGl0XG4gKiAgICAgLy8gbGF0ZXIuIFRoaXMgaXMgd2hlbiB5b3Ugd2lsbCB0cmlnZ2VyIGFueSBmdW5jdGlvbiB3aGljaCBkZXBlbmRzXG4gKiAgICAgLy8gb24gdGhpcyBoaWRkZW4gZG9jdW1lbnQgaGF2aW5nIGJlZW4gY3JlYXRlZC5cbiAqICAgICBzaG93RG9jdW1lbnRRdWV1ZSgpO1xuICogfTtcbiAqIFxuICogZnVuY3Rpb24gc2hvd0RvY3VtZW50UXVldWUoKSB7XG4gKiAgICAgY29uc29sZS5kaXIoZG9jcy5kb2N1bWVudFF1ZXVlKTtcbiAqIH1cbiAqIFxuICogLy8gY3JlYXRlIGFuIGluc3RhbmNlIG9mIHRoZSBjbGFzc1xuICogZG9jcyA9IG5ldyBhdHJvcGEuQ3JlYXRlSHRtbERvY3VtZW50c0Zyb21YbWxodHRwKCk7XG4gKiAvLyB0cnkgdG8gY3JlYXRlIGEgbmV3IGhpZGRlbiBkb2N1bWVudFxuICogZG9jcy5uZXdEb2N1bWVudChtZXRob2QsIHVybCwgbnVsbCwgY2FsbGJhY2spO1xuICovXG5hdHJvcGEuQ3JlYXRlSHRtbERvY3VtZW50c0Zyb21YbWxodHRwID0gZnVuY3Rpb24gQ3JlYXRlSHRtbERvY3VtZW50c0Zyb21YbWxodHRwKFxuKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgdmFyIHJlcXVlc3RlcixcbiAgICBodG1sZG9jdW1lbnQsXG4gICAgdGhhdDtcbiAgICB0aGF0ID0gdGhpcztcbiAgICAvKipcbiAgICAgKiBRdWV1ZSBvZiBkb2N1bWVudHMgY3JlYXRlZCBieSB0aGlzIGluc3RhbmNlLlxuICAgICAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICAgICAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICAgICAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAgICAgKiBAdmVyc2lvbiAyMDEyMDkwOVxuICAgICAqIEB0eXBlIEFycmF5XG4gICAgICogQGZpZWxkT2YgYXRyb3BhLkNyZWF0ZUh0bWxEb2N1bWVudHNGcm9tWG1saHR0cCNcbiAgICAgKi9cbiAgICB0aGlzLmRvY3VtZW50UXVldWUgPSBbXTtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIEhUTUwgRE9NIERvY3VtZW50IGFuZCBwdXRzIGl0IGluIHRoZSBkb2N1bWVudFxuICAgICAqICBxdWV1ZSwgdGhlbiBleGVjdXRlcyB0aGUgY2FsbGJhY2sgZ2l2ZW4uIE5vdGUsIHRoaXMgZG9lc1xuICAgICAqICBub3Qgd29yayBvbiBnb29nbGUgY2hyb21lLlxuICAgICAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICAgICAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICAgICAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAgICAgKiBAdmVyc2lvbiAyMDEyMDkwOVxuICAgICAqIEBtZXRob2RPZiBhdHJvcGEuQ3JlYXRlSHRtbERvY3VtZW50c0Zyb21YbWxodHRwI1xuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBtZXRob2QgQW55IHZhbGlkIG1ldGhvZCB0byBiZSB1c2VkIGluXG4gICAgICogYW4gWE1MSHR0cFJlcXVlc3QuXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHVybCBUaGUgbG9jYXRpb24gb2YgdGhlIGRvY3VtZW50J3Mgc291cmNlLlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlQm9keSBudWxsLCBvciBhIG1lc3NhZ2UgYm9keS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBUaGUgZnVuY3Rpb24gdG8gZXhlY3V0ZSB1cG9uXG4gICAgICogcmVxdWVzdCBjb21wbGV0aW9uLiBUaGlzIGZ1bmN0aW9uIHdpbGwgYmUgZ2l2ZW4gZWl0aGVyXG4gICAgICogYW4gSFRNTCBET00gRG9jdW1lbnQgb3IgZmFsc2UuXG4gICAgICogQHJldHVybnMge0hUTUwgRE9NIERvY3VtZW50LCBmYWxzZX0gVGhlIHJldHVybiB2YWx1ZSBpc1xuICAgICAqIGdpdmVuIHRvIHRoZSBjYWxsYmFjayBmdW5jdGlvbi5cbiAgICAgKi9cbiAgICB0aGlzLm5ld0RvY3VtZW50ID0gZnVuY3Rpb24gbmV3RG9jdW1lbnQoXG4gICAgICAgIG1ldGhvZCwgdXJsLCBtZXNzYWdlQm9keSwgY2FsbGJhY2tcbiAgICApIHtcbiAgICAgICAgdmFyIGNiO1xuICAgICAgICAvKlxuICAgICAgICAgKiBJbnRlcm5hbCBjYWxsYmFjayBmdW5jdGlvbiB0byBwcm9jZXNzIGRhdGEgZnJvbSBYTUxIdHRwUmVxdWVzdFxuICAgICAgICAgKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAgICAgICAgICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gICAgICAgICAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAgICAgICAgICogQHZlcnNpb24gMjAxMjA5MDlcbiAgICAgICAgICogQG1ldGhvZE9mIGF0cm9wYS5DcmVhdGVIdG1sRG9jdW1lbnRzRnJvbVhtbGh0dHAjbmV3RG9jdW1lbnQtXG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7dHJ1ZSxmYWxzZX0gYm9vbFN0YXR1cyBUaGlzIHRlbGxzIHdoZXRoZXIgb3Igbm90IHRoZVxuICAgICAgICAgKiAgWE1MSHR0cFJlcXVlc3Qgd2FzIHN1Y2Nlc3NmdWwuXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7WE1MSHR0cCBSZXNwb25zZSBPYmplY3R9IHJlc3BvbnNlT2JqZWN0IFRoaXMgaXMgdGhlXG4gICAgICAgICAqICByZXNwb25zZSBvYmplY3QgZnJvbSB0aGUgWE1MSHR0cCBSZXF1ZXN0IG9iamVjdC5cbiAgICAgICAgICovXG4gICAgICAgIGNiID0gZnVuY3Rpb24gKGJvb2xTdGF0dXMsIHJlc3BvbnNlT2JqZWN0KSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAoYm9vbFN0YXR1cyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIGlmIChmYWxzZSAhPT0gaHRtbGRvY3VtZW50LmxvYWRTdHJpbmcoXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlT2JqZWN0LnJlc3BvbnNlVGV4dCkpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBodG1sZG9jdW1lbnQuZG9jO1xuICAgICAgICAgICAgICAgICAgICB0aGF0LmRvY3VtZW50UXVldWUucHVzaChyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gYm9vbFN0YXR1cztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhbGxiYWNrKHJlc3VsdCk7XG4gICAgICAgIH07XG4gICAgICAgIHJlcXVlc3Rlci5tYWtlUmVxdWVzdChtZXRob2QsIHVybCwgbWVzc2FnZUJvZHksIGNiKTtcbiAgICB9O1xuICAgIFxuICAgIFxuICAgIGZ1bmN0aW9uIGluaXQgKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgYXRyb3BhLnN1cHBvcnRDaGVjaygnQ3JlYXRlSHRtbERvY3VtZW50c0Zyb21YbWxodHRwJyk7XG4gICAgICAgICAgICByZXF1ZXN0ZXIgPSBuZXcgYXRyb3BhLlJlcXVlc3RlcigpO1xuICAgICAgICAgICAgaHRtbGRvY3VtZW50ID0gbmV3IGF0cm9wYS5IVE1MUGFyc2VyKCk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGF0cm9wYS5kYXRhLkNyZWF0ZUh0bWxEb2N1bWVudHNGcm9tWG1saHR0cC5zdXBwb3J0ID0gJ3Vuc3VwcG9ydGVkJztcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihhdHJvcGEuZGF0YS5DcmVhdGVIdG1sRG9jdW1lbnRzRnJvbVhtbGh0dHAuZXJyb3IpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIGluaXQoKTtcbn07XG5cblxuXG5cbndoaWxlKGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5sZW5ndGggPiAwKSB7XG4gICAgYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLnBvcCgpKCk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGF0cm9wYTtcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9kb2NzL3ZzZG9jL09wZW5MYXllcnNBbGwuanNcIi8+XG52YXIgYXRyb3BhID0gcmVxdWlyZSgnYXRyb3BhLWhlYWRlcicpO1xuLypqc2xpbnRcbiAgICBpbmRlbnQ6IDQsXG4gICAgbWF4ZXJyOiA1MCxcbiAgICB3aGl0ZTogdHJ1ZSxcbiAgICBicm93c2VyOiB0cnVlLFxuICAgIGRldmVsOiB0cnVlLFxuICAgIHBsdXNwbHVzOiB0cnVlLFxuICAgIHJlZ2V4cDogdHJ1ZVxuKi9cbi8qZ2xvYmFsIGF0cm9wYSAqL1xuLy8gZW5kIGhlYWRlclxuXG5hdHJvcGEucmVxdWlyZXMoXG4gICAgJ0hUTUxQYXJzZXInLFxuICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgICAgIHZhciBzdXBwb3J0ZWQgPSB0cnVlO1xuICAgICAgICBcbiAgICAgICAgW1xuICAgICAgICAgICAgZG9jdW1lbnQuaW1wbGVtZW50YXRpb24uY3JlYXRlRG9jdW1lbnRUeXBlLFxuICAgICAgICAgICAgZG9jdW1lbnQuaW1wbGVtZW50YXRpb24uY3JlYXRlRG9jdW1lbnRcbiAgICAgICAgXS5mb3JFYWNoKGZ1bmN0aW9uIChwcmVyZXF1aXNpdGUpIHtcbiAgICAgICAgICAgIGlmKHByZXJlcXVpc2l0ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgc3VwcG9ydGVkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gc3VwcG9ydGVkO1xuICAgIH1cbik7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBIVE1MIFBhcnNlcjxiciAvPlxuICogQ2Fycnkgb3V0IERPTSBvcGVyYXRpb25zIHdpdGhvdXQgbG9hZGluZyBjb250ZW50IHRvIHRoZSBhY3RpdmUgZG9jdW1lbnQuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQHZlcnNpb24gMjAxMjA5MDlcbiAqIEBjbGFzcyBDcmVhdGVzIGEgbmV3IEhUTUwgUGFyc2VyXG4gKiBAcmV0dXJucyB7SFRNTCBET00gRG9jdW1lbnR9IFJldHVybnMgYSBibGFuayBIVE1MIERvY3VtZW50IGZvciB5b3UgdG8gbG9hZFxuICogIGRhdGEgaW50b1xuICogQHJlcXVpcmVzIGF0cm9wYS5kYXRhXG4gKi9cbmF0cm9wYS5IVE1MUGFyc2VyID0gZnVuY3Rpb24gSFRNTFBhcnNlcigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICB2YXIgbXkgPSB0aGlzO1xuICAgIFxuICAgIC8qKlxuICAgICAqIEhvbGRzIHRoZSBjcmVhdGVkIEhUTUwgRE9NIERvY3VtZW50LlxuICAgICAqIEB0eXBlIEhUTUwgRE9NIERvY3VtZW50XG4gICAgICogQGZpZWxkT2YgYXRyb3BhLkhUTUxQYXJzZXIjXG4gICAgICovXG4gICAgdGhpcy5kb2MgPSB7fTtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgYmxhbmsgSFRNTCBET00gRG9jdW1lbnQuXG4gICAgICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gICAgICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gICAgICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICAgICAqIEB2ZXJzaW9uIDIwMTIwOTA5XG4gICAgICogQG1ldGhvZE9mIGF0cm9wYS5IVE1MUGFyc2VyI1xuICAgICAqIEByZXR1cm5zIHtIVE1MIERPTSBEb2N1bWVudH0gUmVzZXRzIHRoZSBkb2MgcHJvcGVydHkgb2YgdGhpcyBpbnN0YW5jZVxuICAgICAqICBhbmQsIHJldHVybnMgYSBibGFuayBIVE1MIERvY3VtZW50IGZvciB5b3UgdG8gbG9hZCBkYXRhIGludG8uXG4gICAgICovXG4gICAgdGhpcy5uZXdEb2N1bWVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGR0O1xuICAgICAgICBkdCA9IGRvY3VtZW50LmltcGxlbWVudGF0aW9uLmNyZWF0ZURvY3VtZW50VHlwZShcbiAgICAgICAgICAgIFwiaHRtbFwiLFxuICAgICAgICAgICAgXCItLy9XM0MvL0RURCBIVE1MIDQuMDEgVHJhbnNpdGlvbmFsLy9FTlwiLFxuICAgICAgICAgICAgXCJodHRwOi8vd3d3LnczLm9yZy9UUi9odG1sNC9sb29zZS5kdGRcIlxuICAgICAgICApO1xuICAgICAgICBteS5kb2MgPSBkb2N1bWVudC5pbXBsZW1lbnRhdGlvbi5jcmVhdGVEb2N1bWVudCgnJywgJycsIGR0KTtcbiAgICAgICAgaWYgKG15LmRvYy5ub2RlVHlwZSAhPT0gOSkge1xuICAgICAgICAgICAgYXRyb3BhLmRhdGEuSFRNTFBhcnNlci5zdXBwb3J0ID0gJ3Vuc3VwcG9ydGVkJztcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihhdHJvcGEuZGF0YS5IVE1MUGFyc2VyLmVycm9yICtcbiAgICAgICAgICAgICAgICAndGhlIGRvY3VtZW50IG5vZGVUeXBlIHJldHVybmVkIGFuIHVuZXhwZWN0ZWQgdmFsdWUnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbXkuZG9jO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyBIVE1MIERPTSBEb2N1bWVudCBhbmQgbG9hZHMgdGhlIGdpdmVuIHN0cmluZyBpbnRvIGl0LlxuICAgICAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICAgICAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICAgICAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAgICAgKiBAdmVyc2lvbiAyMDEyMDkwOVxuICAgICAqIEBtZXRob2RPZiBhdHJvcGEuSFRNTFBhcnNlciNcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gaHRtbHN0cmluZyBhIHN0cmluZyBvZiBIVE1MIGRhdGFcbiAgICAgKiBAcmV0dXJucyB7SFRNTCBET00gRG9jdW1lbnR9IFJlc2V0cyB0aGUgZG9jIHByb3BlcnR5IG9mIHRoaXMgaW5zdGFuY2UsXG4gICAgICogbG9hZGluZyBhIG5ldyBkb2N1bWVudCB3aXRoIHRoZSBzdHJpbmcgZ2l2ZW4uXG4gICAgICovXG4gICAgdGhpcy5sb2FkU3RyaW5nID0gZnVuY3Rpb24gKGh0bWxzdHJpbmcpIHtcbiAgICAgICAgaWYgKCFodG1sc3RyaW5nKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBteS5uZXdEb2N1bWVudCgpO1xuICAgICAgICAgICAgbXkuZG9jLmFwcGVuZENoaWxkKG15LmRvYy5jcmVhdGVFbGVtZW50KCdodG1sJykpO1xuICAgICAgICAgICAgbXkuZG9jLmRvY3VtZW50RWxlbWVudC5pbm5lckhUTUwgPSBodG1sc3RyaW5nO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBhdHJvcGEuZGF0YS5IVE1MUGFyc2VyLnN1cHBvcnQgPSAndW5zdXBwb3J0ZWQnO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGF0cm9wYS5kYXRhLkhUTUxQYXJzZXIuZXJyb3IgK1xuICAgICAgICAgICAgICAgICdhdHJvcGEuSFRNTFBhcnNlciBjYW4gbm90IGxvYWQgJyArXG4gICAgICAgICAgICAgICAgJ3RoZSBoaWRkZW4gZG9jdW1lbnQgZnJvbSBzdHJpbmcgYmVjYXVzZTogJyArIGUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBteS5kb2M7XG4gICAgfTtcbiAgICBcbiAgICBmdW5jdGlvbiBpbml0ICgpIHtcbiAgICAgICAgdmFyIGVxVGVzdDtcbiAgICAgICAgYXRyb3BhLnN1cHBvcnRDaGVjaygnSFRNTFBhcnNlcicpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZXFUZXN0ID0gbXkubG9hZFN0cmluZyhcbiAgICAgICAgICAgICAgICAnPGhlYWQ+PC9oZWFkPjxib2R5PjxwPnRlc3Q8L3A+PC9ib2R5PidcbiAgICAgICAgICAgICkuYm9keS50ZXh0Q29udGVudDtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgYXRyb3BhLmRhdGEuSFRNTFBhcnNlci5zdXBwb3J0ID0gJ3Vuc3VwcG9ydGVkJztcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihhdHJvcGEuZGF0YS5IVE1MUGFyc2VyLmVycm9yICsgZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYoJ3Rlc3QnICE9PSBlcVRlc3QpIHtcbiAgICAgICAgICAgIGF0cm9wYS5kYXRhLkhUTUxQYXJzZXIuc3VwcG9ydCA9ICd1bnN1cHBvcnRlZCc7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYXRyb3BhLmRhdGEuSFRNTFBhcnNlci5lcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgbXkubmV3RG9jdW1lbnQoKTtcbiAgICB9XG4gICAgXG4gICAgaW5pdCgpO1xuICAgIFxufTtcblxuXG5cblxud2hpbGUoYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLmxlbmd0aCA+IDApIHtcbiAgICBhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMucG9wKCkoKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gYXRyb3BhO1xuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL2RvY3MvdnNkb2MvT3BlbkxheWVyc0FsbC5qc1wiLz5cbnZhciBhdHJvcGEgPSByZXF1aXJlKCdhdHJvcGEtaGVhZGVyJyk7XG5hdHJvcGEuQXJnc0luZm8gPSByZXF1aXJlKCdhdHJvcGEtQXJnc0luZm8nKS5BcmdzSW5mbztcbi8qanNsaW50XG4gICAgaW5kZW50OiA0LFxuICAgIG1heGVycjogNTAsXG4gICAgd2hpdGU6IHRydWUsXG4gICAgYnJvd3NlcjogdHJ1ZSxcbiAgICBkZXZlbDogdHJ1ZSxcbiAgICBwbHVzcGx1czogdHJ1ZSxcbiAgICByZWdleHA6IHRydWVcbiovXG4vKmdsb2JhbCBhdHJvcGEgKi9cbi8vIGVuZCBoZWFkZXJcblxuKGZ1bmN0aW9uICgpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICBhdHJvcGEucmVxdWlyZXMoXG4gICAgICAgICdSZXF1ZXN0ZXInLFxuICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgc3VwcG9ydGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIGF0cm9wYS5BcmdzSW5mbyxcbiAgICAgICAgICAgICAgICBYTUxIdHRwUmVxdWVzdFxuICAgICAgICAgICAgXS5mb3JFYWNoKGZ1bmN0aW9uIChwcmVyZXF1aXNpdGUpIHtcbiAgICAgICAgICAgICAgICBpZihwcmVyZXF1aXNpdGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBzdXBwb3J0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBzdXBwb3J0ZWQ7XG4gICAgICAgIH1cbiAgICApO1xufSgpKTtcblxuLyoqXG4gKiBUaGlzIHJlcHJlc2VudHMgYW4gWE1MSHR0cFJlcXVlc3QuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQHZlcnNpb24gMjAxMzAzMTFcbiAqIEBjbGFzcyBUaGlzIHJlcHJlc2VudHMgYW4gWE1MSHR0cFJlcXVlc3QuXG4gKiBAcmV0dXJucyB7UmVxdWVzdGVyfSBSZXR1cm5zIGEgcmVxdWVzdGVyIG9iamVjdC5cbiAqIEByZXF1aXJlcyBhdHJvcGEuQXJnc0luZm8jY2hlY2tBcmdUeXBlc1xuICogQGV4YW1wbGVcbiAqIHZhciByZXF1ZXN0ZXIsIGZvcm1EYXRhO1xuICogXG4gKiByZXF1ZXN0ZXIgPSBuZXcgYXRyb3BhLlJlcXVlc3RlcigpO1xuICogcmVxdWVzdGVyLnRpbWVvdXQgPSAxMDAwMDsgLy8gcmVxdWVzdHMgd2lsbCBhYm9ydCBhZnRlciAxMCBzZWNvbmRzLlxuICogcmVxdWVzdGVyLnJlcXVlc3RIZWFkZXJzID0ge1xuICogICAgIFwiYUhlYWRlclwiIDogXCJoZWFkZXJWYWx1ZVwiLFxuICogICAgIFwiYW5vdGhlckhlYWRlclwiIDogXCJhbmRWYWx1ZVwiXG4gKiB9O1xuICogXG4gKiBmdW5jdGlvbiBzaG93UmVxdWVzdFJlc3VsdHMoc3RhdHVzLCByZXF1ZXN0KSB7XG4gKiAgICAgY29uc29sZS5sb2coXCJTdGF0dXM6ICcgKyBzdGF0dXMpO1xuICogICAgIGNvbnNvbGUuZGlyKHJlcXVlc3QpOyAvLyBjb25zb2xlIGRpciBtYXkgb3IgbWF5IG5vdFxuICogICAgICAgICAgICAgICAgICAgICAgICAvLyBiZSBzdXBwb3J0ZWQgaW4geW91ciBlbnZpcm9ubWVudC5cbiAqIH1cbiAqIFxuICogZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAqIGZvcm1EYXRhLmFwcGVuZCgnYUZvcm1GaWVsZE5hbWUnLCAnZm9ybUZpZWxkRGF0YScpO1xuICogZm9ybURhdGEuYXBwZW5kKCdhbm90aGVyRm9ybUZpZWxkTmFtZScsICdhbmREYXRhJyk7XG4gKiBcbiAqIHJlcXVlc3Rlci5tYWtlUmVxdWVzdChcbiAqICAgICBcInBvc3RcIiwgXCJodHRwOi8vZXhhbXBsZS5jb21cIiwgZm9ybURhdGEsIHNob3dSZXF1ZXN0UmVzdWx0cyk7XG4gKi9cbmF0cm9wYS5SZXF1ZXN0ZXIgPSBmdW5jdGlvbiBSZXF1ZXN0ZXIoKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgYXRyb3BhLnN1cHBvcnRDaGVjaygnUmVxdWVzdGVyJyk7XG4gICAgdmFyIGV4cEFyZ1R5cGVzLFxuICAgICAgICBjaGVja1JlcXVlc3QsXG4gICAgICAgIHJlcXVlc3Q7XG4gICAgXG4gICAgLyoqXG4gICAgICogQ29udGFpbmVyIG9iamVjdCBmb3IgdGhlIGV4cGVjdGVkIGFyZ3VtZW50IHR5cGVzXG4gICAgICogc3VwcGxpZWQgdG8gdGhpcy5tYWtlUmVxdWVzdC5cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEB0eXBlIEV4cGVjdGVkIEFyZyBUeXBlc1xuICAgICAqIEBmaWVsZE9mIGF0cm9wYS5SZXF1ZXN0ZXItXG4gICAgICovXG4gICAgZXhwQXJnVHlwZXMgPSB7fTtcbiAgICBleHBBcmdUeXBlcy5yZXF1ZXN0V2l0aE1lc3NhZ2UgPSBbJ3N0cmluZycsICdzdHJpbmcnLCAnc3RyaW5nJywgJ2Z1bmN0aW9uJ107XG4gICAgZXhwQXJnVHlwZXMucmVxdWVzdE51bGxNZXNzYWdlID0gWydzdHJpbmcnLCAnc3RyaW5nJywgJ29iamVjdCcsICdmdW5jdGlvbiddO1xuICAgIFxuICAgIC8qKlxuICAgICAqIFVzZWQgdG8gY2hlY2sgdGhlIGFyZ3VtZW50cyB0eXBlcyBzdXBwbGllZCB0byB0aGlzLm1ha2VSZXF1ZXN0LlxuICAgICAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICAgICAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICAgICAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAgICAgKiBAdmVyc2lvbiAyMDEyMDkwOVxuICAgICAqIEBwcml2YXRlXG4gICAgICogQG1ldGhvZE9mIGF0cm9wYS5SZXF1ZXN0ZXItXG4gICAgICogQHBhcmFtIHtBcmd1bWVudHN9IGFyZ3MgQW4gYXJndW1lbnRzIGFycmF5XG4gICAgICogQHJldHVybnMge0Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiBhcmdzIHR5cGVzIG1hdGNoIHRoZVxuICAgICAqIGV4cGVjdGVkIHR5cGVzLlxuICAgICAqIEByZXF1aXJlcyBhdHJvcGEuQXJnc0luZm8jY2hlY2tBcmdUeXBlc1xuICAgICAqL1xuICAgIGNoZWNrUmVxdWVzdCA9IGZ1bmN0aW9uIChhcmdzKSB7XG4gICAgICAgIHZhciBjaGVja2VyO1xuICAgICAgICBjaGVja2VyID0gbmV3IGF0cm9wYS5BcmdzSW5mbygpO1xuICAgICAgICBjaGVja2VyLnNldEV4cGVjdGVkQXJnVHlwZXMoZXhwQXJnVHlwZXMpO1xuICAgICAgICByZXR1cm4gY2hlY2tlci5jaGVja0FyZ1R5cGVzKGFyZ3MpO1xuICAgIH07XG4gICAgXG4gICAgLyoqXG4gICAgICogT2JqZWN0IHdob3NlIHByb3BlcnRpZXMgYW5kIHZhbHVlcyBhcmUgaGVhZGVyIG5hbWVzIGFuZCB2YWx1ZXNcbiAgICAgKiAgcmVzcGVjdGl2ZWx5LlxuICAgICAqIEB0eXBlIFJlcXVlc3QgSGVhZGVycyBPYmplY3RcbiAgICAgKiBAZmllbGRPZiBhdHJvcGEuUmVxdWVzdGVyI1xuICAgICAqL1xuICAgIHRoaXMucmVxdWVzdEhlYWRlcnMgPSB7fTtcbiAgICBcbiAgICBcbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIHRpbWVvdXQgdmFsdWUgZm9yIHRoZSByZXF1ZXN0IGluIG1pbGxpc2Vjb25kcy4gVGhlIHJlcXVlc3Qgd2lsbFxuICAgICAqICBhYm9ydCBhZnRlciB0aGlzIGFtb3VudCBvZiB0aW1lIGhhcyBwYXNzZWQuXG4gICAgICogQHR5cGUgTnVtYmVyXG4gICAgICogQGZpZWxkT2YgYXRyb3BhLlJlcXVlc3RlciNcbiAgICAgKi9cbiAgICB0aGlzLnRpbWVvdXQgPSAzMDAwMDtcbiAgICBcbiAgICAvKipcbiAgICAgKiBYTUxIdHRwUmVxdWVzdCBvYmplY3QgdXNlZCBieSBSZXF1ZXN0ZXIuXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAdHlwZSBYTUxIdHRwUmVxdWVzdFxuICAgICAqIEBmaWVsZE9mIGF0cm9wYS5SZXF1ZXN0ZXItXG4gICAgICovXG4gICAgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgIHJlcXVlc3QuYWJvcnRlZCA9IGZhbHNlO1xuICAgIHJlcXVlc3QuYWJvcnQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVxdWVzdC5hYm9ydGVkID0gdHJ1ZTtcbiAgICAgICAgWE1MSHR0cFJlcXVlc3QucHJvdG90eXBlLmFib3J0LmNhbGwodGhpcyk7XG4gICAgfTtcbiAgICBcbiAgICAvKipcbiAgICAgKiBNYWtlcyBhbiBBSkFYIHJlcXVlc3QuXG4gICAgICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gICAgICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gICAgICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICAgICAqIEB2ZXJzaW9uIDIwMTMwMzExXG4gICAgICogQG1ldGhvZE9mIGF0cm9wYS5SZXF1ZXN0ZXIjXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG1ldGhvZCBUaGUgSFRUUCBtZXRob2QgdG8gYmUgdXNlZCBmb3IgdGhpcyByZXF1ZXN0LlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB1cmwgVGhlIFVSTCB0byBzZW5kIHRoZSByZXF1ZXN0IHRvLlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlQm9keSBUaGUgYm9keSBvZiB0aGUgcmVxdWVzdC5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gY2FsbGJhY2sgVGhlIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGV4ZWN1dGVcbiAgICAgKiAgd2hlbiByZWFkeVN0YXRlIGlzIDQuIFRoZSBjYWxsYmFjayBpcyBzdXBwbGllZCB3aXRoIHR3byBhcmd1bWVudHMuIFRoZVxuICAgICAqICBmaXJzdCBhcmd1bWVudCBpcyBhIGJvb2xlYW4gaW5kaWNhdGluZyB3aGV0aGVyIG9yIG5vdCB0aGUgaHR0cCBzdGF0dXNcbiAgICAgKiAgd2FzIDIwMC4gVGhlIHNlY29uZCBhcmd1bWVudCBpcyB0aGUgcmVxdWVzdCBvYmplY3QuXG4gICAgICogQHRocm93cyBhdHJvcGEuUmVxdWVzdGVyLm1ha2VSZXF1ZXN0IHVuZXhwZWN0ZWQgYXJndW1lbnQgdHlwZVxuICAgICAqL1xuICAgIHRoaXMubWFrZVJlcXVlc3QgPSBmdW5jdGlvbiAobWV0aG9kLCB1cmwsIG1lc3NhZ2VCb2R5LCBjYWxsYmFjaykge1xuICAgICAgICB2YXIgaGRyO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY2hlY2tSZXF1ZXN0KGFyZ3VtZW50cyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignYXRyb3BhLlJlcXVlc3Rlci5tYWtlUmVxdWVzdCB1bmV4cGVjdGVkICcgK1xuICAgICAgICAgICAgICAgICdhcmd1bWVudCB0eXBlJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmVxdWVzdC5hYm9ydGVkID0gZmFsc2U7XG4gICAgICAgIHJlcXVlc3Qub3BlbihtZXRob2QsIHVybCwgdHJ1ZSk7XG4gICAgICAgIGZvciAoaGRyIGluIHRoaXMucmVxdWVzdEhlYWRlcnMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnJlcXVlc3RIZWFkZXJzLmhhc093blByb3BlcnR5KGhkcikpIHtcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoaGRyLCB0aGlzLnJlcXVlc3RIZWFkZXJzW2hkcl0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvKipcbiAgICAgICAgICogRXZlbnQgbGlzdGVuZXIgZnVuY3Rpb24gZm9yIHRoZSBBSkFYIHJlcXVlc3QuXG4gICAgICAgICAqIFRoaXMgaXMgd2hhdCBhY3R1YWxseSBmaXJlcyB0aGUgY2FsbGJhY2sgc3VwcGxpZWRcbiAgICAgICAgICogdG8gbWFrZVJlcXVlc3QuXG4gICAgICAgICAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICAgICAgICAgKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAgICAgICAgICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICAgICAgICAgKiBAdmVyc2lvbiAyMDEyMDkwOVxuICAgICAgICAgKiBAbWV0aG9kT2YgYXRyb3BhLlJlcXVlc3Rlci1yZXF1ZXN0XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICByZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChyZXF1ZXN0LnJlYWR5U3RhdGUgPT09IDQpIHtcbiAgICAgICAgICAgICAgICBpZiAocmVxdWVzdC5zdGF0dXMgPT09IDIwMCkge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayh0cnVlLCByZXF1ZXN0KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhmYWxzZSwgcmVxdWVzdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICByZXF1ZXN0LnNlbmQobWVzc2FnZUJvZHkpO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChyZXF1ZXN0LmFib3J0ZWQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgcmVxdWVzdC5hYm9ydCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB0aGlzLnRpbWVvdXQpO1xuICAgIH07XG59O1xuXG5cblxuXG53aGlsZShhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMubGVuZ3RoID4gMCkge1xuICAgIGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5wb3AoKSgpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBhdHJvcGE7XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vZG9jcy92c2RvYy9PcGVuTGF5ZXJzQWxsLmpzXCIvPlxudmFyIGF0cm9wYSA9IHJlcXVpcmUoJ2F0cm9wYS1oZWFkZXInKTtcbi8qanNsaW50IFxuICAgIGluZGVudDogNCxcbiAgICBtYXhlcnI6IDUwLFxuICAgIHdoaXRlOiB0cnVlLFxuICAgIGJyb3dzZXI6IHRydWUsXG4gICAgZGV2ZWw6IHRydWUsXG4gICAgcGx1c3BsdXM6IHRydWUsXG4gICAgcmVnZXhwOiB0cnVlXG4qL1xuLypnbG9iYWwgYXRyb3BhICovXG4vLyBlbmQgaGVhZGVyXG5cbi8qKlxuICogQSBwb2xsaW5nIGNsYXNzIGRlc2lnbmVkIGZvciBleGVjdXRpbmcgbG9uZyBydW5uaW5nIHByb2Nlc3NlcyB0aGF0IHJldHVyblxuICogIG5vdGhpbmcgYW5kIGhhdmUgbm8gY2FsbGJhY2sgcGFyYW1ldGVyLlxuICogQGNsYXNzIEEgcG9sbGluZyBjbGFzcyBkZXNpZ25lZCBmb3IgZXhlY3V0aW5nIGxvbmcgcnVubmluZyBwcm9jZXNzZXMgdGhhdFxuICogIHJldHVybiBub3RoaW5nIGFuZCBoYXZlIG5vIGNhbGxiYWNrIHBhcmFtZXRlci5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAdmVyc2lvbiAyMDEzMDIyMFxuICogQHBhcmFtIHtTdHJpbmd9IGFjdG9yTmFtZSBUaGUgbmFtZSBmb3IgdGhlIFNlcmlhbEFjdG9yIGluc3RhbmNlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gYWN0b3JGdW5jdGlvbiBUaGUgZnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZVxuICogIFNlcmlhbEFjdG9yIGlzIGZyZWUuIFRoaXMgZnVuY3Rpb24gbXVzdCBjYWxsIHRoZSA8Y29kZT5mcmVlPC9jb2RlPiBmdW5jdGlvblxuICogIHdoZW4gaXQgaXMgZmluaXNoZWQgaW4gb3JkZXIgdG8gYWxsb3cgdGhlIGFjdG9yIHRvIGNvbnRpbnVlLlxuICogQHJldHVybnMge2F0cm9wYS5TZXJpYWxBY3Rvcn0gUmV0dXJucyBhbiA8Y29kZT5hdHJvcGEuU2VyaWFsQWN0b3I8L2NvZGU+XG4gKiAgaW5zdGFuY2UuXG4gKiBAZXhhbXBsZVxuICogZnVuY3Rpb24gZHVtbXlBY3Rvcigpe1xuICogICAgIHZhciB0aGF0ID0gdGhpcztcbiAqICAgICBjb25zb2xlLmxvZygnYWN0b3JGdW5jdGlvbiB3b3VsZCBleGVjdXRlJyk7XG4gKiAgICAgY29uc29sZS5sb2coJ2ZyZWVpbmcgJyArIHRoaXMubmFtZSArICcgaW4gMTAwMDAgbXMnKTtcbiAqICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7dGhhdC5mcmVlKCk7fSwgMTAwMDApO1xuICogfTtcbiAqIHZhciBhY3RvciA9IG5ldyBhdHJvcGEuU2VyaWFsQWN0b3IoJ2R1bW15JywgZHVtbXlBY3Rvcik7XG4gKiAgICAgLy8gY2hhbmdlIHRoZSBuYW1lIG9mIHRoZSBhY3RvciBmcm9tXG4gKiAgICAgLy8gZHVtbXkgdG8gYXdlc29tZVxuICogYWN0b3IubmFtZSA9IFwiYXdlc29tZVwiO1xuICogICAgIC8vIHNldCB0aGUgcG9sbGluZyBpbnRlcnZhbCAobWlsbGlzZWNvbmRzKVxuICogYWN0b3IuaW50ZXJ2YWwgPSAzMDAwO1xuICogICAgIC8vIHNldCB0aGUgYmxvY2tpbmcgdGltZW91dCB2YWx1ZSAobWlsbGlzZWNvbmRzKVxuICogYWN0b3IuYmxvY2tUaW1lb3V0VmFsdWUgPSAxMjAwMDA7XG4gKiAgICAgLy8gc3RhcnQgcG9sbGluZ1xuICogYWN0b3Iuc3RhcnQoKTtcbiAqICAgICAvLyBkeW5hbWljYWxseSBjaGFuZ2UgdGhlIFNlcmlhbEFjdG9yXG4gKiBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gKiAgICAgLy8gY2hhbmdlIHRoZSBwb2xsaW5nIGludGVydmFsXG4gKiAgICAgLy8gd2hpbGUgdGhlIFNlcmlhbEFjdG9yIGlzIHJ1bm5pbmcuXG4gKiAgICAgYWN0b3IuY2hhbmdlSW50ZXJ2YWwoMjAwMCk7XG4gKiAgICAgICAgIC8vIGNoYW5nZSB0aGUgYWN0b3IgZnVuY3Rpb25cbiAqICAgICBhY3Rvci5hY3RvckZ1bmN0aW9uID0gZnVuY3Rpb24oKSB7XG4gKiAgICAgICAgIGNvbnNvbGUubG9nKCduZXcgYWN0b3JGdW5jdGlvbiBleGVjdXRpbmcnKTtcbiAqICAgICAgICAgY29uc29sZS5sb2coJ2ZyZWVpbmcgJyArIHRoaXMubmFtZSArICcgaW1tZWRpYXRlbHknKTtcbiAqICAgICAgICAgdGhpcy5mcmVlKCk7XG4gKiAgICAgfTtcbiAqIH0sMTAwMDApO1xuICovXG5hdHJvcGEuU2VyaWFsQWN0b3IgPSBmdW5jdGlvbihhY3Rvck5hbWUsIGFjdG9yRnVuY3Rpb24pIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICB2YXIgdGhhdCwgZHVtbXlBY3RvcjtcbiAgICAvKipcbiAgICAgKiBSZWZlcmVuY2UgdG8gPGNvZGU+dGhpczwvY29kZT5cbiAgICAgKiBAZmllbGRPZiBhdHJvcGEuU2VyaWFsQWN0b3ItXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAqL1xuICAgIHRoYXQgPSB0aGlzO1xuICAgIC8qKlxuICAgICAqIERlZmF1bHQgYWN0b3JGdW5jdGlvblxuICAgICAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICAgICAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICAgICAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAgICAgKiBAdmVyc2lvbiAyMDEzMDIyMFxuICAgICAqIEBtZXRob2RPZiBhdHJvcGEuU2VyaWFsQWN0b3ItXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAc2VlIGF0cm9wYS5TZXJpYWxBY3RvciNhY3RvckZ1bmN0aW9uXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBkdW1teUFjdG9yID0gZnVuY3Rpb24oKXtcbiAgICAgKiAgICAgY29uc29sZS5sb2coJ2FjdG9yRnVuY3Rpb24gd291bGQgZXhlY3V0ZScpO1xuICAgICAqICAgICBjb25zb2xlLmxvZygnZnJlZWluZyBTZXJpYWwgQWN0b3IgaW4gMTAwMDAgbXMnKTtcbiAgICAgKiAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe3RoYXQuZnJlZSgpO30sIDEwMDAwKTtcbiAgICAgKiB9O1xuICAgICAqL1xuICAgIGR1bW15QWN0b3IgPSBmdW5jdGlvbigpe1xuICAgICAgICBjb25zb2xlLmxvZygnYWN0b3JGdW5jdGlvbiB3b3VsZCBleGVjdXRlJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdmcmVlaW5nIFNlcmlhbCBBY3RvciBpbiAxMDAwMCBtcycpO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7dGhhdC5mcmVlKCk7fSwgMTAwMDApO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogVGhlIG5hbWUgb2YgdGhpcyBpbnN0YW5jZS4gRGVmYXVsdHMgdG8gXCJTZXJpYWxBY3RvclwiXG4gICAgICogQGZpZWxkT2YgYXRyb3BhLlNlcmlhbEFjdG9yI1xuICAgICAqIEB0eXBlIFN0cmluZ1xuICAgICAqIEBkZWZhdWx0IFwiU2VyaWFsQWN0b3JcIlxuICAgICAqL1xuICAgIHRoaXMubmFtZSA9IGF0cm9wYS5zZXRBc09wdGlvbmFsQXJnKCdTZXJpYWxBY3RvcicsIGFjdG9yTmFtZSk7XG4gICAgLyoqXG4gICAgICogUG9sbGluZyBpbnRlcnZhbCBpbiBtaWxsaXNlY29uZHMuIFRoaXMgZGV0ZXJtaW5lcyBob3cgZnJlcXVlbnRseSB0aGVcbiAgICAgKiAgYWN0b3IgZnVuY3Rpb24gd2lsbCB0cnkgdG8gZXhlY3V0ZS4gRGVmYXVsdHMgdG8gMTAwIG1pbGxpc2Vjb25kcy5cbiAgICAgKiBAZmllbGRPZiBhdHJvcGEuU2VyaWFsQWN0b3IjXG4gICAgICogQHR5cGUgTnVtYmVyXG4gICAgICogQGRlZmF1bHQgMTAwXG4gICAgICovXG4gICAgdGhpcy5pbnRlcnZhbCA9IDEwMDsgLy8gbWlsbGlzZWNvbmRzXG4gICAgLyoqXG4gICAgICogVGhlIGlkIG9mIHRoZSBpbnRlcnZhbCBzZXQgdG8gcG9sbCB0aGUgYWN0b3IuIFlvdSBzaG91bGQgbm90IGNoYW5nZVxuICAgICAqICB0aGlzIG1hbnVhbGx5LCB1c2UgdGhlIHN0YXJ0IGFuZCBzdG9wIGZ1bmN0aW9ucyBpbnN0ZWFkLiBEZWZhdWxzIHRvXG4gICAgICogIHVuZGVmaW5lZC5cbiAgICAgKiBAZmllbGRPZiBhdHJvcGEuU2VyaWFsQWN0b3IjXG4gICAgICogQHR5cGUgTnVtYmVyXG4gICAgICogQGRlZmF1bHQgdW5kZWZpbmVkXG4gICAgICovXG4gICAgdGhpcy5pbnRlcnZhbElkID0gdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFRoZSBzdGF0ZSBvZiB0aGUgU2VyaWFsQWN0b3IuIElmIHRydWUsIHRoZSBhY3RvciB3aWxsIHNsZWVwLiBJZiBmYWxzZSB0aGVcbiAgICAgKiAgYWN0b3Igd2lsbCBleGVjdXRlIHRoZSBhY3RvciBmdW5jdGlvbiB3aGVuIG5leHQgcG9sbGVkLiBEZWZhdWx0cyB0b1xuICAgICAqICBmYWxzZS5cbiAgICAgKiBAZmllbGRPZiBhdHJvcGEuU2VyaWFsQWN0b3IjXG4gICAgICogQHR5cGUgQm9vbGVhblxuICAgICAqIEBkZWZhdWx0IGZhbHNlXG4gICAgICovXG4gICAgdGhpcy5ibG9ja2VkID0gZmFsc2U7XG4gICAgLyoqXG4gICAgICogU3RvcmVzIGlkJ3Mgb2YgY3VycmVudGx5IHJ1bm5pbmcgdGltZW91dCBmdW5jdGlvbnMgdXNlZCB0byBmcmVlIHRoZSBhY3RvclxuICAgICAqICBpZiBpdCBoYXMgYmVlbiBibG9ja2VkIGZvciB0b28gbG9uZy5cbiAgICAgKiBAZmllbGRPZiBhdHJvcGEuU2VyaWFsQWN0b3IjXG4gICAgICogQHNlZSBhdHJvcGEuU2VyaWFsQWN0b3IjYmxvY2tUaW1lb3V0VmFsdWVcbiAgICAgKiBAdHlwZSBBcnJheVxuICAgICAqIEBkZWZhdWx0IFtdXG4gICAgICovXG4gICAgdGhpcy50aW1lb3V0cyA9IFtdO1xuICAgIC8qKlxuICAgICAqIFRoZSBtYXhpbXVtIHRpbWUsIGluIG1pbGxpc2Vjb25kcywgd2hpY2ggdGhlIGFjdG9yIG1heSBiZSBibG9ja2VkIGZvci5cbiAgICAgKiAgQWZ0ZXIgdGhpcyBkdXJhdGlvbiBoYXMgYmVlbiByZWFjaGVkIHRoZSBhY3RvciB3aWxsIGJlIGZyZWVkLiBEZWZhdWx0c1xuICAgICAqICB0byA2MCBzZWNvbmRzLlxuICAgICAqIEBmaWVsZE9mIGF0cm9wYS5TZXJpYWxBY3RvciNcbiAgICAgKiBAdHlwZSBOdW1iZXJcbiAgICAgKiBAZGVmYXVsdCA2MDAwMFxuICAgICAqL1xuICAgIHRoaXMuYmxvY2tUaW1lb3V0VmFsdWUgPSA2MDAwMDtcbiAgICAvKipcbiAgICAgKiBUaGUgZnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBTZXJpYWxBY3RvciBpcyBmcmVlLiBUaGlzIGZ1bmN0aW9uXG4gICAgICogIG11c3QgY2FsbCB0aGUgPGNvZGU+ZnJlZTwvY29kZT4gZnVuY3Rpb24gd2hlbiBpdCBpcyBmaW5pc2hlZCBpbiBvcmRlciB0b1xuICAgICAqICBhbGxvdyB0aGUgYWN0b3IgdG8gY29udGludWUuIERlZmF1bHRzIHRvIHRoZSA8Y29kZT5kdW1teUFjdG9yPC9jb2RlPlxuICAgICAqICBmdW5jdGlvbi5cbiAgICAgKiBAZmllbGRPZiBhdHJvcGEuU2VyaWFsQWN0b3IjXG4gICAgICogQHR5cGUgRnVuY3Rpb25cbiAgICAgKiBAZGVmYXVsdCBkdW1teUFjdG9yXG4gICAgICogQHNlZSBhdHJvcGEuU2VyaWFsQWN0b3ItZHVtbXlBY3RvclxuICAgICAqIEBleGFtcGxlXG4gICAgICogZHVtbXlBY3RvciA9IGZ1bmN0aW9uKCl7XG4gICAgICogICAgIGNvbnNvbGUubG9nKCdhY3RvckZ1bmN0aW9uIHdvdWxkIGV4ZWN1dGUnKTtcbiAgICAgKiAgICAgY29uc29sZS5sb2coJ2ZyZWVpbmcgU2VyaWFsIEFjdG9yIGluIDEwMDAwIG1zJyk7XG4gICAgICogICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXt0aGF0LmZyZWUoKTt9LCAxMDAwMCk7XG4gICAgICogfTtcbiAgICAgKi9cbiAgICB0aGlzLmFjdG9yRnVuY3Rpb24gPSBhdHJvcGEuc2V0QXNPcHRpb25hbEFyZyhkdW1teUFjdG9yLCBhY3RvckZ1bmN0aW9uKTtcbiAgICAvKipcbiAgICAgKiBUaGUgYWN0aW9uIGZ1bmN0aW9uIGlzIGNhbGxlZCB3aGVuIHRoZSBhY3RvciBpcyBwb2xsZWQgYW5kIGl0J3MgYmxvY2tlZFxuICAgICAqICBzdGF0ZSBpcyBmYWxzZS4gVGhpcyBtZXRob2Qgc2hvdWxkIG5vdCBiZSBzZXQgb3IgY2FsbGVkIG1hbnVhbGx5LCBzZXRcbiAgICAgKiAgdGhlIDxjb2RlPmFjdG9yRnVuY3Rpb248L2NvZGU+IGluc3RlYWQuXG4gICAgICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gICAgICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gICAgICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICAgICAqIEB2ZXJzaW9uIDIwMTMwMjIwXG4gICAgICogQG1ldGhvZE9mIGF0cm9wYS5TZXJpYWxBY3RvciNcbiAgICAgKiBAc2VlIGF0cm9wYS5TZXJpYWxBY3RvciNhY3RvckZ1bmN0aW9uXG4gICAgICovXG4gICAgdGhpcy5hY3Rpb24gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYoZmFsc2UgPT09IHRoYXQuYmxvY2tlZCkge1xuICAgICAgICAgICAgdGhhdC5ibG9jaygpO1xuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB0aGF0LmFjdG9yRnVuY3Rpb24oKTtcbiAgICAgICAgICAgIH0sIDEwKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoYXQubmFtZSArICcgc2xlZXBpbmcgZm9yICcgKyB0aGF0LmludGVydmFsICsgJyBtcycpO1xuICAgICAgICB9XG4gICAgfTtcbn07XG4vKipcbiAqIFByZXZlbnRzIHRoZSBhY3RvciBmcm9tIGV4ZWN1dGluZyBpdCdzIGFjdG9yRnVuY3Rpb24uIFRoaXMgYmxvY2sgd2lsbCB0aW1lb3V0XG4gKiAgb25jZSB0aGUgPGNvZGU+YmxvY2tUaW1lb3V0VmFsdWU8L2NvZGU+IGhhcyBiZWVuIHJlYWNoZWQuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQHZlcnNpb24gMjAxMzAyMjBcbiAqIEBtZXRob2RPZiBhdHJvcGEuU2VyaWFsQWN0b3IjXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gUmV0dXJucyB0aGUgdmFsdWUgb2YgdGhpcyBpbnN0YW5jZXMgPGNvZGU+YmxvY2tlZDwvY29kZT5cbiAqICBwcm9wZXJ0eS5cbiAqIEBzZWUgYXRyb3BhLlNlcmlhbEFjdG9yI2Jsb2NrZWRcbiAqIEBleGFtcGxlXG4gKiBmdW5jdGlvbiBkKCkge1xuICogICAgIGNvbnNvbGUubG9nKCdkb2luZyBzdHVmZiB0byB0aGluZ3MnKTtcbiAqICAgICB0aGlzLmZyZWUoKTtcbiAqIH1cbiAqIFxuICogdmFyIGFjdG9yID0gbmV3IGF0cm9wYS5TZXJpYWxBY3RvcignZHVtbXknLCBkKTtcbiAqIGFjdG9yLmludGVydmFsID0gMjAwMDtcbiAqIGFjdG9yLmJsb2NrVGltZW91dFZhbHVlID0gNTAwMDtcbiAqIGFjdG9yLnN0YXJ0KCk7XG4gKiAvLyA1IHNlY29uZHMgYWZ0ZXIgc3RhcnRpbmcgdGhlIGFjdG9yIHdpbGwgYmUgYmxvY2tlZC5cbiAqIC8vIEl0IHdpbGwgcmVtYWluIGJsb2NrZWQgdW50aWwgdGhlIGJsb2NrIHRpbWVvdXQgaXMgcmVhY2hlZC5cbiAqIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gKiAgICAgY29uc29sZS5sb2coJ2Jsb2NraW5nISEhJyk7XG4gKiAgICAgYWN0b3IuYmxvY2soKTtcbiAqIH0sIDUwMDApO1xuICovXG5hdHJvcGEuU2VyaWFsQWN0b3IucHJvdG90eXBlLmJsb2NrID0gZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgIGNvbnNvbGUubG9nKHRoaXMubmFtZSArICcgYmxvY2snKTtcbiAgICB0aGlzLmJsb2NrZWQgPSB0cnVlO1xuICAgIHRoaXMudGltZW91dHMucHVzaChcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHt0aGF0LmJsb2NrVGltZW91dCgpO30sIHRoYXQuYmxvY2tUaW1lb3V0VmFsdWUpKTtcbiAgICByZXR1cm4gdGhpcy5ibG9ja2VkO1xufTtcbi8qKlxuICogQ2FsbGVkIHdoZW4gdGhlIDxjb2RlPmJsb2NrVGltZW91dFZhbHVlPC9jb2RlPiBoYXMgYmVlbiByZWFjaGVkLiBUaGlzIGZyZWVzXG4gKiAgdGhlIGFjdG9yIGFuZCByZW1vdmVzIHRoZSB0aW1lb3V0IHJlZmVyZW5jZSBmcm9tIHRoZSB0aW1lb3V0cyBhcnJheS5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAdmVyc2lvbiAyMDEzMDIyMFxuICogQG1ldGhvZE9mIGF0cm9wYS5TZXJpYWxBY3RvciNcbiAqIEByZXR1cm5zIHtCb29sZWFufSBSZXR1cm5zIHRoZSB2YWx1ZSBvZiB0aGlzIGluc3RhbmNlcyA8Y29kZT5ibG9ja2VkPC9jb2RlPlxuICogIHByb3BlcnR5LlxuICogQHNlZSBhdHJvcGEuU2VyaWFsQWN0b3IjYmxvY2tlZFxuICovXG5hdHJvcGEuU2VyaWFsQWN0b3IucHJvdG90eXBlLmJsb2NrVGltZW91dCA9IGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIGNvbnNvbGUubG9nKHRoaXMubmFtZSArICcgYmxvY2sgdGltZW91dCcpO1xuICAgIHJldHVybiB0aGlzLmZyZWUoKTtcbn07XG4vKipcbiAqIEZyZWVzIHRoZSBhY3RvciBzbyBpdCBtYXkgZXhlY3V0ZSBpdHMgYWN0b3IgZnVuY3Rpb24gd2hlbiBuZXh0IHBvbGxlZC5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAdmVyc2lvbiAyMDEzMDIyMFxuICogQG1ldGhvZE9mIGF0cm9wYS5TZXJpYWxBY3RvciNcbiAqIEByZXR1cm5zIHtCb29sZWFufSBSZXR1cm5zIHRoZSB2YWx1ZSBvZiB0aGlzIGluc3RhbmNlcyA8Y29kZT5ibG9ja2VkPC9jb2RlPlxuICogIHByb3BlcnR5LlxuICogQHNlZSBhdHJvcGEuU2VyaWFsQWN0b3IjYmxvY2tlZFxuICogQGV4YW1wbGVcbiAqIGZ1bmN0aW9uIGQoKSB7XG4gKiAgICAgY29uc29sZS5sb2coJ2RvaW5nIHN0dWZmIHRvIHRoaW5ncycpO1xuICogICAgIHRoaXMuZnJlZSgpO1xuICogfVxuICogXG4gKiB2YXIgYWN0b3IgPSBuZXcgYXRyb3BhLlNlcmlhbEFjdG9yKCdkdW1teScsIGQpO1xuICogYWN0b3IuaW50ZXJ2YWwgPSAyMDAwO1xuICogYWN0b3IuYmxvY2tUaW1lb3V0VmFsdWUgPSA1MDAwMDtcbiAqIGFjdG9yLnN0YXJ0KCk7XG4gKiBhY3Rvci5ibG9jaygpO1xuICogLy8gNSBzZWNvbmRzIGFmdGVyIHN0YXJ0aW5nIHRoZSBhY3RvciB3aWxsIGJlIGZyZWVkLlxuICogc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAqICAgICBhY3Rvci5mcmVlKCk7XG4gKiB9LCA1MDAwKTtcbiAqL1xuYXRyb3BhLlNlcmlhbEFjdG9yLnByb3RvdHlwZS5mcmVlID0gZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgY29uc29sZS5sb2codGhpcy5uYW1lICsgJyBmcmVlJyk7XG4gICAgdGhpcy5ibG9ja2VkID0gZmFsc2U7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dHMuc2hpZnQoKSk7XG4gICAgcmV0dXJuIHRoaXMuYmxvY2tlZDtcbn07XG4vKipcbiAqIFN0YXJ0cyBwb2xsaW5nIHRoZSBhY3Rvci5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAdmVyc2lvbiAyMDEzMDIyMFxuICogQG1ldGhvZE9mIGF0cm9wYS5TZXJpYWxBY3RvciNcbiAqIEBwYXJhbSB7TnVtYmVyfSBpbnRlcnZhbCBPcHRpb25hbC4gVGhlIHBvbGxpbmcgaW50ZXJ2YWwuIERlZmF1bHRzIHRvIHRoZVxuICogIHZhbHVlIG9mIDxjb2RlPnRoaXMuaW50ZXJ2YWw8L2NvZGU+XG4gKiBAc2VlIGF0cm9wYS5TZXJpYWxBY3RvciNpbnRlcnZhbFxuICogQHJldHVybnMge051bWJlcn0gUmV0dXJucyB0aGUgdmFsdWUgb2YgdGhpcyBpbnN0YW5jZSdzXG4gKiAgPGNvZGU+aW50ZXJ2YWxJZDwvY29kZT4gcHJvcGVydHkuXG4gKiBAc2VlIGF0cm9wYS5TZXJpYWxBY3RvciNpbnRlcnZhbElkXG4gKiBAZXhhbXBsZVxuICogdmFyIGFjdG9yID0gbmV3IGF0cm9wYS5TZXJpYWxBY3RvcignZHVtbXknKTtcbiAqIGFjdG9yLnN0YXJ0KCk7XG4gKi9cbmF0cm9wYS5TZXJpYWxBY3Rvci5wcm90b3R5cGUuc3RhcnQgPSBmdW5jdGlvbihpbnRlcnZhbCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICB0aGlzLmludGVydmFsID0gYXRyb3BhLnNldEFzT3B0aW9uYWxBcmcodGhpcy5pbnRlcnZhbCwgaW50ZXJ2YWwpO1xuICAgIFxuICAgIGlmKHRoaXMuaW50ZXJ2YWxJZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIC8vIGNsZWFyIHRoZSBvbGQgdGltZW91dCBiZWZvcmUgY3JlYXRpbmcgYSBuZXcgb25lLlxuICAgICAgICB0aGlzLnN0b3AoKTtcbiAgICB9XG4gICAgdGhpcy5pbnRlcnZhbElkID0gc2V0SW50ZXJ2YWwodGhhdC5hY3Rpb24sIHRoYXQuaW50ZXJ2YWwpO1xuICAgIGNvbnNvbGUubG9nKHRoaXMubmFtZSArICcgc3RhcnRlZCcpO1xuICAgIHJldHVybiB0aGlzLmludGVydmFsSWQ7XG59O1xuLyoqXG4gKiBBZGp1c3RzIHRoZSBwb2xsaW5nIGludGVydmFsIGFmdGVyIDxjb2RlPnN0YXJ0PC9jb2RlPiBoYXNcbiAqIGJlZW4gY2FsbGVkLlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAqIEB2ZXJzaW9uIDIwMTMwMjIwXG4gKiBAbWV0aG9kT2YgYXRyb3BhLlNlcmlhbEFjdG9yI1xuICogQHBhcmFtIHtOdW1iZXJ9IGludGVydmFsIFRoZSBuZXcgcG9sbGluZyBpbnRlcnZhbCBpbiBtaWxsaXNlY29uZHMuXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBSZXR1cm5zIHRoZSB2YWx1ZSBvZiB0aGlzIGluc3RhbmNlJ3MgXG4gKiAgPGNvZGU+aW50ZXJ2YWxJZDwvY29kZT4gcHJvcGVydHkuXG4gKiBAc2VlIGF0cm9wYS5TZXJpYWxBY3RvciNpbnRlcnZhbElkXG4gKiBAZXhhbXBsZVxuICogdmFyIGFjdG9yID0gbmV3IGF0cm9wYS5TZXJpYWxBY3RvcignZHVtbXknKTtcbiAqIGFjdG9yLnN0YXJ0KCk7XG4gKiAgICAgLy8gNSBzZWNvbmRzIGFmdGVyIHN0YXJ0aW5nIHRoZSBwb2xsaW5nIGludGVydmFsIHdpbGwgYmUgY2hhbmdlZC5cbiAqIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAqICAgICBhY3Rvci5jaGFuZ2VJbnRlcnZhbCgyMDAwKTtcbiAqIH0sIDUwMDApO1xuICovXG5hdHJvcGEuU2VyaWFsQWN0b3IucHJvdG90eXBlLmNoYW5nZUludGVydmFsID0gZnVuY3Rpb24oaW50ZXJ2YWwpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICBjb25zb2xlLmxvZyh0aGlzLm5hbWUgKyAnIGNoYW5naW5nIGludGVydmFsJyk7XG4gICAgcmV0dXJuIHRoaXMuc3RhcnQoaW50ZXJ2YWwpO1xufTtcbi8qKlxuICogU3RvcHMgcG9sbGluZyB0aGUgYWN0b3IuIE5vdGUgdGhhdCB0aGUgYWN0b3Igd2lsbCBiZSBmcmVlZCBvbmNlIHRoZVxuICogIDxjb2RlPmJsb2NrVGltZW91dFZhbHVlPC9jb2RlPiBoYXMgYmVlbiByZWFjaGVkLiBUaGlzIHdpbGwgbm90IHJlc3RhcnQgdGhlXG4gKiAgcG9sbGluZy5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAdmVyc2lvbiAyMDEzMDIyMFxuICogQG1ldGhvZE9mIGF0cm9wYS5TZXJpYWxBY3RvciNcbiAqIEBzZWUgYXRyb3BhLlNlcmlhbEFjdG9yI2Jsb2NrZWRcbiAqIEBzZWUgYXRyb3BhLlNlcmlhbEFjdG9yI2Jsb2NrVGltZW91dFZhbHVlXG4gKiBAZXhhbXBsZVxuICogdmFyIGFjdG9yID0gbmV3IGF0cm9wYS5TZXJpYWxBY3RvcignZHVtbXknKTtcbiAqIGFjdG9yLnN0YXJ0KCk7XG4gKiAgICAgLy8gNSBzZWNvbmRzIGFmdGVyIHN0YXJ0aW5nIHRoZSBhY3RvciB3aWxsIGJlIHN0b3BwZWQuXG4gKiBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gKiAgICAgYWN0b3Iuc3RvcCgpO1xuICogfSwgNTAwMCk7XG4gKi9cbmF0cm9wYS5TZXJpYWxBY3Rvci5wcm90b3R5cGUuc3RvcCA9IGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbElkKTtcbiAgICB0aGlzLmludGVydmFsSWQgPSB1bmRlZmluZWQ7XG4gICAgY29uc29sZS5sb2codGhpcy5uYW1lICsgJyBzdG9wcGVkJyk7XG59O1xuXG5cblxuXG53aGlsZShhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMubGVuZ3RoID4gMCkge1xuICAgIGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5wb3AoKSgpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBhdHJvcGE7XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vZG9jcy92c2RvYy9PcGVuTGF5ZXJzQWxsLmpzXCIvPlxudmFyIGF0cm9wYSA9IHJlcXVpcmUoJ2F0cm9wYS1oZWFkZXInKTtcbmF0cm9wYS5zdHJpbmcgPSByZXF1aXJlKCdhdHJvcGEtc3RyaW5nJykuc3RyaW5nO1xuYXRyb3BhLmFycmF5cyA9IHJlcXVpcmUoJ2F0cm9wYS1hcnJheXMnKS5hcnJheXM7XG5hdHJvcGEuc2V0QXNPcHRpb25hbEFyZyA9IHJlcXVpcmUoJ2F0cm9wYS1zZXRBc09wdGlvbmFsQXJnJykuc2V0QXNPcHRpb25hbEFyZztcbi8qanNsaW50XG4gICAgaW5kZW50OiA0LFxuICAgIG1heGVycjogNTAsXG4gICAgd2hpdGU6IHRydWUsXG4gICAgYnJvd3NlcjogdHJ1ZSxcbiAgICBkZXZlbDogdHJ1ZSxcbiAgICBwbHVzcGx1czogdHJ1ZSxcbiAgICByZWdleHA6IHRydWUsXG4gICAgdmFyczogdHJ1ZVxuKi9cbi8qZ2xvYmFsIGF0cm9wYSAqL1xuLy8gZW5kIGhlYWRlclxuXG4oZnVuY3Rpb24gKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIGF0cm9wYS5yZXF1aXJlcyhcbiAgICAgICAgJ1RleHRBbmFseXplcicsXG4gICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBzdXBwb3J0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgYXRyb3BhLnN0cmluZyxcbiAgICAgICAgICAgICAgICBhdHJvcGEuYXJyYXlzLFxuICAgICAgICAgICAgICAgIGF0cm9wYS5zZXRBc09wdGlvbmFsQXJnXG4gICAgICAgICAgICBdLmZvckVhY2goZnVuY3Rpb24gKHByZXJlcXVpc2l0ZSkge1xuICAgICAgICAgICAgICAgIGlmKHByZXJlcXVpc2l0ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHN1cHBvcnRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHN1cHBvcnRlZDtcbiAgICAgICAgfVxuICAgICk7XG59KCkpO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSB1dGlsaXR5IGZvciBhbmFseXppbmcgdGV4dC5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAdmVyc2lvbiAyMDEzMDMxMVxuICogQGNsYXNzIFJlcHJlc2VudHMgYSB1dGlsaXR5IGZvciBhbmFseXppbmcgdGV4dC5cbiAqIEBwYXJhbSB7U3RyaW5nfSB0ZXh0IFRoZSB0ZXh0IHRvIGFuYWx5emUuXG4gKiBAcmV0dXJucyB7VGV4dEFuYWx5emVyfSBSZXR1cm5zIGFuIGluc3RhbmNlIG9mIHRoZSB0ZXh0IGFuYWx5emVyLlxuICogQHJlcXVpcmVzIGF0cm9wYS5zdHJpbmdcbiAqIEByZXF1aXJlcyBhdHJvcGEuYXJyYXlzXG4gKiBAcmVxdWlyZXMgYXRyb3BhLnNldEFzT3B0aW9uYWxBcmdcbiAqL1xuYXRyb3BhLlRleHRBbmFseXplciA9IGZ1bmN0aW9uIFRleHRBbmFseXplcih0ZXh0KSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgIHZhciBjb25zdHJ1Y3Q7XG4gICAgLyoqXG4gICAgKiBUaGUgc3VwcGxpZWQgdGV4dC4gRGVmYXVsdHMgdG8gYW4gZW1wdHkgc3RyaW5nLlxuICAgICogQHR5cGUgU3RyaW5nXG4gICAgKiBAZmllbGRPZiBhdHJvcGEuVGV4dEFuYWx5emVyI1xuICAgICovXG4gICAgdGhpcy50ZXh0ID0gU3RyaW5nKGF0cm9wYS5zZXRBc09wdGlvbmFsQXJnKCcnLCB0ZXh0KSk7XG4gICAgLyoqXG4gICAgKiBHaXZlcyB0aGUgY291bnQgb2Ygd29yZHMgaW4gdGhlIHRleHQuIERlZmF1bHRzIHRvIDAuXG4gICAgKiBAdHlwZSBOdW1iZXJcbiAgICAqIEBmaWVsZE9mIGF0cm9wYS5UZXh0QW5hbHl6ZXIjXG4gICAgKi9cbiAgICB0aGlzLndvcmRDb3VudCA9IDA7XG4gICAgLyoqXG4gICAgKiBBbiBhcnJheSBvZiBldmVyeSB3b3JkIGluIHRoZSBzdXBwbGllZCB0ZXh0LlxuICAgICogIERlZmF1bHRzIHRvIGFuIGVtcHR5IGFycmF5LlxuICAgICogQHR5cGUgQXJyYXlcbiAgICAqIEBmaWVsZE9mIGF0cm9wYS5UZXh0QW5hbHl6ZXIjXG4gICAgKi9cbiAgICB0aGlzLndvcmRzID0gW107XG4gICAgLyoqXG4gICAgKiBTZXRzIHRoZSBiYXNpYyBwcm9wZXJ0aWVzIG9mIHRoZSB0ZXh0IGFuYWx5emVyLlxuICAgICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gICAgKiBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICAgICog4pitIEhpYWwgQXRyb3BhISEg4pitXG4gICAgKiBAcHJpdmF0ZVxuICAgICogQHZlcnNpb24gMjAxMzAzMTFcbiAgICAqIEBtZXRob2RPZiBhdHJvcGEuVGV4dEFuYWx5emVyLVxuICAgICovXG4gICAgY29uc3RydWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBhdHJvcGEuc3VwcG9ydENoZWNrKCdUZXh0QW5hbHl6ZXInKTtcbiAgICAgICAgdGhhdC50ZXh0ID0gYXRyb3BhLnN0cmluZy5jb252ZXJ0RW9sKHRoYXQudGV4dCwgJ1xcbicpO1xuICAgICAgICB0aGF0LndvcmRDb3VudCA9IGF0cm9wYS5zdHJpbmcuY291bnRXb3Jkcyh0aGF0LnRleHQpO1xuICAgICAgICB0aGF0LndvcmRzID0gYXRyb3BhLnN0cmluZy5nZXRXb3Jkcyh0aGF0LnRleHQpO1xuICAgIH07XG4gICAgXG4gICAgY29uc3RydWN0KCk7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuLyoqXG4gKiBHZXRzIGFuIGluZGV4IG9mIHRoZSB0ZXh0LlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAqIEB2ZXJzaW9uIDIwMTMwMTE4XG4gKiBAbWV0aG9kT2YgYXRyb3BhLlRleHRBbmFseXplciNcbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBhbiBhcnJheSBvZiB1bmlxdWUgdmFsdWVzXG4gKiAgZGVyaXZlZCBmcm9tIHRoZSB0ZXh0IGdpdmVuLlxuICovXG5hdHJvcGEuVGV4dEFuYWx5emVyLnByb3RvdHlwZS5nZXRJbmRleCA9IGZ1bmN0aW9uICgpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICB0aGlzLndvcmRzID0gYXRyb3BhLmFycmF5cy5yZWluZGV4KHRoaXMud29yZHMpO1xuICAgIHJldHVybiBhdHJvcGEuYXJyYXlzLmdldFVuaXF1ZSh0aGlzLndvcmRzKTtcbn07XG4vKipcbiAqIEdldCB0aGUgZnJlcXVlbmN5IGRhdGEgZm9yIGVhY2ggdW5pcXVlIHdvcmQgaW5cbiAqICB0aGUgdGV4dC5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAdmVyc2lvbiAyMDEzMDExOFxuICogQG1ldGhvZE9mIGF0cm9wYS5UZXh0QW5hbHl6ZXIjXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGFuIG9iamVjdCB3aG9zZSBrZXlzIGFyZVxuICogIHRoZSB1bmlxdWUgd29yZHMgZnJvbSB0aGUgZ2l2ZW4gdGV4dCBhbmQgd2hvc2VcbiAqICB2YWx1ZXMgYXJlIHRoZSBjb3VudCBvZiBlYWNoIHdvcmRzIG9jY3VycmVuY2UuXG4gKi9cbmF0cm9wYS5UZXh0QW5hbHl6ZXIucHJvdG90eXBlLmdldFdvcmRGcmVxdWVuY3kgPSBmdW5jdGlvbiAoKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgdGhpcy53b3JkcyA9IGF0cm9wYS5hcnJheXMucmVpbmRleCh0aGlzLndvcmRzKTtcbiAgICByZXR1cm4gYXRyb3BhLmFycmF5cy5nZXRGcmVxdWVuY3kodGhpcy53b3Jkcyk7XG59O1xuLyoqXG4gKiBHZXRzIHBocmFzZXMgb2YgdGhlIHNwZWNpZmllZCBsZW5ndGggZnJvbSB0aGUgdGV4dC5cbiAqIEBwYXJhbSB7TnVtYmVyfSBwaHJhc2VMZW5ndGggVGhlIGxlbmd0aCBvZiB0aGUgcGhyYXNlc1xuICogIHRvIGV4dHJhY3QgZnJvbSB0aGUgdGV4dC4gRGVmYXVsdHMgdG8gMi5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYW4gb2JqZWN0IHdob3NlIGtleXMgYXJlIHBocmFzZXNcbiAqICBhbmQgd2hvc2UgdmFsdWVzIGFyZSB0aGUgbnVtYmVyIG9mIG9jY3VycmVuY2VzIG9mIHRoZSBwaHJhc2UuXG4gKi9cbmF0cm9wYS5UZXh0QW5hbHl6ZXIucHJvdG90eXBlLmdldFBocmFzZUZyZXF1ZW5jeSA9IGZ1bmN0aW9uIGdldFBocmFzZUZyZXF1ZW5jeShcbiAgICBwaHJhc2VMZW5ndGhcbikge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIHBocmFzZUxlbmd0aCA9IGF0cm9wYS5zZXRBc09wdGlvbmFsQXJnKDIsIHBocmFzZUxlbmd0aCk7XG4gICAgaWYoMiA+IHBocmFzZUxlbmd0aCkge1xuICAgICAgICBwaHJhc2VMZW5ndGggPSAyO1xuICAgIH1cbiAgICB2YXIgY291bnRlciA9IDAsIHByb3AsIG91dCA9IFtdO1xuICAgIFxuICAgIHRoaXMud29yZHMgPSBhdHJvcGEuYXJyYXlzLnJlaW5kZXgodGhpcy53b3Jkcyk7XG4gICAgXG4gICAgdGhpcy53b3Jkcy5tYXAoZnVuY3Rpb24oZWxlbWVudCwgaW5kZXgsIGFycikge1xuICAgICAgICBjb3VudGVyID0gMTsgIC8vIGVsZW1lbnQgaXMgd29yZCAxIG9mIHBocmFzZUxlbmd0aFxuICAgICAgICAvLyBtYWtpbmcgc3VyZSB0aGVyZSBhcmUgZW5vdWdoIHdvcmRzIHRvIGNvbmNhdGVuYXRlIGEgcGhyYXNlIG9mIHRoZVxuICAgICAgICAvLyBwcm9wZXIgbGVuZ3RoLlxuICAgICAgICBpZihhcnJbaW5kZXggKyBwaHJhc2VMZW5ndGggLSAxXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBwcm9wID0gU3RyaW5nKGVsZW1lbnQgKyAnICcpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICBmb3IoY291bnRlcjsgY291bnRlciAhPT0gcGhyYXNlTGVuZ3RoOyBjb3VudGVyKyspIHtcbiAgICAgICAgICAgICAgICBwcm9wICs9IFN0cmluZyhhcnJbaW5kZXggKyBjb3VudGVyXSArICcgJykudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG91dC5wdXNoKHByb3AudHJpbSgpKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIFxuICAgIG91dCA9IGF0cm9wYS5hcnJheXMuZ2V0RnJlcXVlbmN5KG91dCk7XG4gICAgXG4gICAgcmV0dXJuIG91dDtcbn07XG5cblxuXG5cbndoaWxlKGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5sZW5ndGggPiAwKSB7XG4gICAgYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLnBvcCgpKCk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGF0cm9wYTtcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9kb2NzL3ZzZG9jL09wZW5MYXllcnNBbGwuanNcIi8+XHJcbnZhciBhdHJvcGEgPSByZXF1aXJlKCdhdHJvcGEtaGVhZGVyJyk7XHJcbmF0cm9wYS5pbnF1aXJlID0gcmVxdWlyZSgnYXRyb3BhLWlucXVpcmUnKS5pbnF1aXJlO1xyXG4vKmpzbGludFxyXG4gICAgaW5kZW50OiA0LFxyXG4gICAgbWF4ZXJyOiA1MCxcclxuICAgIHdoaXRlOiB0cnVlLFxyXG4gICAgYnJvd3NlcjogdHJ1ZSxcclxuICAgIGRldmVsOiB0cnVlLFxyXG4gICAgcGx1c3BsdXM6IHRydWUsXHJcbiAgICByZWdleHA6IHRydWVcclxuKi9cclxuLypnbG9iYWwgYXRyb3BhICovXHJcbi8vIGVuZCBoZWFkZXJcclxuXHJcbi8qKlxyXG4gKiBVdGlsaXRpZXMgZm9yIGhhbmRsaW5nIGFycmF5cy5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwMjIxXHJcbiAqIEBuYW1lc3BhY2UgVXRpbGl0aWVzIGZvciBoYW5kbGluZyBhcnJheXMuXHJcbiAqL1xyXG5hdHJvcGEuYXJyYXlzID0ge307XHJcbi8qKlxyXG4gKiBDb21wYXJlcyB0d28gYXJyYXlzIGJhc2VkIG9uIHNpemUsIGNvbnRlbnRzLCBhbmQgZWxlbWVudCBvcmRlci5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTIwOTA5XHJcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5MSBPbmUgYXJyYXkgeW91IHdhbnQgY29tcGFyZWQgdG8gYW5vdGhlci5cclxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkyIFRoZSBvdGhlciBhcnJheS5cclxuICogQHJldHVybnMge0Jvb2xlYW59IFJldHVybnMgdHJ1ZSBvciBmYWxzZSBkZXBlbmRpbmcgb25cclxuICogIHdoZXRoZXIgb3Igbm90IHRoZSBhcnJheXMgbWF0Y2hlZCBpbiBzaXplLCBjb21wb3NpdGlvbiwgYW5kXHJcbiAqICBlbGVtZW50IG9yZGVyLlxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgeCA9IFsxLDJdO1xyXG4gKiB2YXIgeSA9IFsxLDEsM107XHJcbiAqIGF0cm9wYS5hcnJheXMubWF0Y2goeCx5KTtcclxuICogLy8gcmV0dXJucyBmYWxzZVxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgeCA9IFsxLDJdO1xyXG4gKiB2YXIgeSA9IFsxLDJdO1xyXG4gKiBhdHJvcGEuYXJyYXlzLm1hdGNoKHgseSk7XHJcbiAqIC8vIHJldHVybnMgdHJ1ZVxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgeCA9IFsxLDJdO1xyXG4gKiB2YXIgeSA9IFsyLDFdO1xyXG4gKiBhdHJvcGEuYXJyYXlzLm1hdGNoKHgseSk7XHJcbiAqIC8vIHJldHVybnMgZmFsc2UgYmVjYXVzZSB0aGUgZWxlbWVudHMgYXJlIG5vdCBpbiB0aGUgc2FtZSBvcmRlci5cclxuICogQGV4YW1wbGVcclxuICogdmFyIHggPSBbMSx7J2FQcm9wJyA6ICdhVmFsdWUnfV07XHJcbiAqIHZhciB5ID0gWzEseydhUHJvcCcgOiAnYVZhbHVlJ31dO1xyXG4gKiBhdHJvcGEuYXJyYXlzLm1hdGNoKHgseSk7XHJcbiAqIC8vIHJldHVybnMgZmFsc2UgYmVjYXVzZSBldmVuIHRob3VnaCB0aGUgb2JqZWN0IGxvb2tzIHRoZSBzYW1lLCB0aGVcclxuICogLy8gdHdvIG9iamVjdHMgYXJlIGluIGZhY3QgZGlzdGluY3Qgb2JqZWN0cy5cclxuICogQGV4YW1wbGVcclxuICogdmFyIG9iaiA9IHsnYVByb3AnIDogJ2FWYWx1ZSd9O1xyXG4gKiB2YXIgeCA9IFsxLG9ial07XHJcbiAqIHZhciB5ID0gWzEsb2JqXTtcclxuICogYXRyb3BhLmFycmF5cy5tYXRjaCh4LHkpO1xyXG4gKiAvLyByZXR1cm5zIHRydWUgYmVjYXVzZSB0aGUgb2JqZWN0cyByZWZlcmVuY2VkIGluIHRoZSBhcnJheXMgYXJlXHJcbiAqIC8vIGluIGZhY3QgdGhlIHNhbWUgb2JqZWN0LlxyXG4gKi9cclxuYXRyb3BhLmFycmF5cy5tYXRjaCA9IGZ1bmN0aW9uIGFycmF5c01hdGNoKGFycmF5MSwgYXJyYXkyKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHZhciB4LFxyXG4gICAgbDtcclxuICAgIGlmIChhcnJheTEubGVuZ3RoICE9PSBhcnJheTIubGVuZ3RoKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgbCA9IGFycmF5MS5sZW5ndGg7XHJcbiAgICBmb3IgKHggPSAwOyB4IDwgbDsgeCArPSAxKSB7XHJcbiAgICAgICAgaWYgKGFycmF5MVt4XSAhPT0gYXJyYXkyW3hdKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxufTtcclxuLyoqXHJcbiAqIFN1YnRyYWN0cyBvbmUgYXJyYXkgZnJvbSBhbm90aGVyIGFycmF5IGJhc2VkIG9uIHRoZSB1bmlxdWUgdmFsdWVzIGluIGJvdGhcclxuICogIHNldHMuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDExMlxyXG4gKiBAcGFyYW0ge0FycmF5fSBhIChzdWJ0cmFoZW5kKSBUaGUgYXJyYXkgdG8gc3VidHJhY3QuXHJcbiAqIEBwYXJhbSB7QXJyYXl9IChtaW51ZW5kKSBmcm9tQiBUaGUgYXJyYXkgd2l0aCBlbGVtZW50cyBkdXBsaWNhdGVkIGluIDxjb2RlPmE8L2NvZGU+XHJcbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBhIG5ldyBhcnJheSBjb250YWluaW5nIG9ubHkgdGhlIHVuaXF1ZVxyXG4gKiAgdmFsdWVzIGZvdW5kIGluIDxjb2RlPmZyb21CPC9jb2RlPiB0aGF0IGFyZSBub3QgcHJlc2VudCBpbiA8Y29kZT5hPC9jb2RlPlxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgeCA9IFsxLDJdO1xyXG4gKiB2YXIgeSA9IFsxLDEsM107XHJcbiAqIGF0cm9wYS5hcnJheXMuc3VidHJhY3QoeCx5KTtcclxuICogLy8gcmV0dXJucyBbM11cclxuICogQGV4YW1wbGVcclxuICogdmFyIHggPSBbMSwzXTtcclxuICogdmFyIHkgPSBbMywxXTtcclxuICogYXRyb3BhLmFycmF5cy5zdWJ0cmFjdCh4LHkpO1xyXG4gKiAvLyByZXR1cm5zIFtdXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciB4ID0gWzEsM107XHJcbiAqIHZhciB5ID0gWzMsMSwxLDldO1xyXG4gKiBhdHJvcGEuYXJyYXlzLnN1YnRyYWN0KHgseSk7XHJcbiAqIC8vIHJldHVybnMgWzldXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciB4ID0gWzEsMyx7J2FQcm9wJyA6ICdhVmFsJ31dO1xyXG4gKiB2YXIgeSA9IFszLDEseydhUHJvcCcgOiAnYVZhbCd9XTtcclxuICogYXRyb3BhLmFycmF5cy5zdWJ0cmFjdCh4LHkpO1xyXG4gKiAvLyByZXR1cm5zIFt7J2FQcm9wJyA6ICdhVmFsJ31dIFxyXG4gKiAvLyBiZWNhdXNlIHRoZSB0d28gb2JqZWN0cyBhcmUgbm90IHRoZSBzYW1lIG9iamVjdC5cclxuICogQGV4YW1wbGVcclxuICogdmFyIG9iaiA9IHsnYVByb3AnIDogJ2FWYWwnfTtcclxuICogdmFyIHggPSBbMSwzLG9ial07XHJcbiAqIHZhciB5ID0gWzMsMSx7J2FQcm9wJyA6ICdhVmFsJ31dO1xyXG4gKiBhdHJvcGEuYXJyYXlzLnN1YnRyYWN0KHgseSk7XHJcbiAqIC8vIHJldHVybnMgW3snYVByb3AnIDogJ2FWYWwnfV0gXHJcbiAqIC8vIGJlY2F1c2UgdGhlIHR3byBvYmplY3RzIGFyZSBub3QgdGhlIHNhbWUgb2JqZWN0LlxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgb2JqID0geydhUHJvcCcgOiAnYVZhbCd9XHJcbiAqIHZhciB4ID0gWzEsMyxvYmpdO1xyXG4gKiB2YXIgeSA9IFszLDEsb2JqXTtcclxuICogYXRyb3BhLmFycmF5cy5zdWJ0cmFjdCh4LHkpO1xyXG4gKiAvLyByZXR1cm5zIFtdIFxyXG4gKiAvLyBiZWNhdXNlIHRoZSBvYmplY3RzIHJlZmVyZW5jZWQgaW4gdGhlIGFycmF5cyBhcmUgdGhlIHNhbWUgb2JqZWN0LlxyXG4gKi9cclxuYXRyb3BhLmFycmF5cy5zdWJ0cmFjdCA9IGZ1bmN0aW9uKGEsIGZyb21CKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHZhciB0aGUgPSB7fTtcclxuICAgIHRoZS5yZXN1bHQgPSBbXTtcclxuICAgIGZyb21CLmZvckVhY2goZnVuY3Rpb24oaXRlbSl7XHJcbiAgICAgICAgdGhlLm1hcmsgPSBmYWxzZTtcclxuICAgICAgICBhLmZvckVhY2goZnVuY3Rpb24ocm0pe1xyXG4gICAgICAgICAgICBpZihpdGVtID09PSBybSkge1xyXG4gICAgICAgICAgICAgICAgdGhlLm1hcmsgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYodGhlLm1hcmsgIT09IHRydWUpIHtcclxuICAgICAgICAgICAgdGhlLnJlc3VsdC5wdXNoKGl0ZW0pO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHRoZS5yZXN1bHQ7XHJcbn07XHJcbi8qKlxyXG4gKiBSZXR1cm5zIGFuIGFycmF5IG9mIHZhbHVlcyBmb3VuZCBpbiBib3RoIG9mIHRoZSBnaXZlbiBhcnJheXMuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDExMlxyXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheTEgQW4gYXJyYXkuXHJcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5MiBBbm90aGVyIGFycmF5LlxyXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYW4gYXJyYXkgb2YgdmFsdWVzIGZvdW5kIGluIGJvdGggb2YgdGhlIGdpdmVuXHJcbiAqICBhcnJheXMuXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciB4ID0gWzEsMyw0XTtcclxuICogdmFyIHkgPSBbMywxLDVdO1xyXG4gKiBhdHJvcGEuYXJyYXlzLmludGVyc2VjdCh4LHkpO1xyXG4gKiAvLyByZXR1cm5zIFsxLDNdXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciB4ID0gWzEsMSwzLDRdO1xyXG4gKiB2YXIgeSA9IFszLDEsMSw1XTtcclxuICogYXRyb3BhLmFycmF5cy5pbnRlcnNlY3QoeCx5KTtcclxuICogLy8gcmV0dXJucyBbMSwxLDNdXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciBvYmogPSB7J2FQcm9wJyA6ICdhVmFsJ307XHJcbiAqIHZhciB4ID0gWzEsMyxvYmpdO1xyXG4gKiB2YXIgeSA9IFszLDEsb2JqXTtcclxuICogYXRyb3BhLmFycmF5cy5pbnRlcnNlY3QoeCx5KTtcclxuICogLy8gcmV0dXJucyBbMSwzLHsnYVByb3AnIDogJ2FWYWwnfV1cclxuICogQGV4YW1wbGVcclxuICogdmFyIG9iaiA9IHsnYVByb3AnIDogJ2FWYWwnfTtcclxuICogdmFyIHggPSBbMSwzLHsnYVByb3AnIDogJ2FWYWwnfV07XHJcbiAqIHZhciB5ID0gWzMsMSxvYmpdO1xyXG4gKiBhdHJvcGEuYXJyYXlzLmludGVyc2VjdCh4LHkpO1xyXG4gKiAvLyByZXR1cm5zIFsxLDNdIGJlY2F1c2UgdGhlIHR3byBvYmplY3RzIGFyZSBub3QgdGhlIHNhbWUgb2JqZWN0LlxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgeCA9IFsxLDMseydhUHJvcCcgOiAnYVZhbCd9XTtcclxuICogdmFyIHkgPSBbMywxLHsnYVByb3AnIDogJ2FWYWwnfV07XHJcbiAqIGF0cm9wYS5hcnJheXMuaW50ZXJzZWN0KHgseSk7XHJcbiAqIC8vIHJldHVybnMgWzEsM10gYmVjYXVzZSB0aGUgdHdvIG9iamVjdHMgYXJlIG5vdCB0aGUgc2FtZSBvYmplY3QuXHJcbiAqL1xyXG5hdHJvcGEuYXJyYXlzLmludGVyc2VjdCA9IGZ1bmN0aW9uIGludGVyc2VjdChhcnJheTEsIGFycmF5Mikge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICB2YXIgc21hbGxBcnJheSwgbGFyZ2VBcnJheSwgaW50ZXJzZWN0aW9uID0gW107XHJcbiAgICBpZihhcnJheTEubGVuZ3RoID4gYXJyYXkyLmxlbmd0aCkge1xyXG4gICAgICAgIGxhcmdlQXJyYXkgPSBhcnJheTEuc3BsaWNlKDApO1xyXG4gICAgICAgIHNtYWxsQXJyYXkgPSBhcnJheTIuc3BsaWNlKDApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBsYXJnZUFycmF5ID0gYXJyYXkyLnNwbGljZSgwKTtcclxuICAgICAgICBzbWFsbEFycmF5ID0gYXJyYXkxLnNwbGljZSgwKTtcclxuICAgIH1cclxuICAgIHNtYWxsQXJyYXkuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgIHZhciBpZHhJbkxhcmdlQXJyYXkgPSBsYXJnZUFycmF5LmluZGV4T2YoaXRlbSk7XHJcbiAgICAgICAgaWYgKDAgPD0gaWR4SW5MYXJnZUFycmF5KSB7IC8vIGhhcyB3b3JkXHJcbiAgICAgICAgICAgIGludGVyc2VjdGlvbi5wdXNoKGxhcmdlQXJyYXkuc3BsaWNlKGlkeEluTGFyZ2VBcnJheSwgMSlbMF0pO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGludGVyc2VjdGlvbjtcclxufTtcclxuLyoqXHJcbiAqIENhbGN1bGF0ZXMgdGhlIGZyZXF1ZW5jeSBvZiBpdGVtcyBvY2N1cnJpbmcgaW4gYW4gYXJyYXkuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDExOFxyXG4gKiBAcGFyYW0ge0FycmF5fSBhcnIgVGhlIGFycmF5IHRvIGNhbGN1bGF0ZSBmcmVxdWVuY2llcyBmcm9tLlxyXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGFuIG9iamVjdCB3aG9zZSBrZXlzIGFyZSBlYWNoIHVuaXF1ZVxyXG4gKiAgZWxlbWVudHMgZnJvbSB0aGUgYXJyYXkgYW5kIHRoZWlyIHZhbHVlIGlzIHRoZWlyIGZyZXF1ZW5jeSBvZlxyXG4gKiAgb2NjdXJyZW5jZSB3aXRoaW4gdGhlIGFycmF5LiBCZSBjYXJlZnVsIHRoYXQgeW91ciBhcnJheSBkb2VzXHJcbiAqICBub3QgY29udGFpbiB2YWx1ZXMgbWF0Y2hpbmcgb2JqZWN0IGluc3RhbmNlIHByb3BlcnR5IG5hbWVzLlxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgeCA9IFsxLDEsMSwxLDEsMywzXTtcclxuICogYXRyb3BhLmFycmF5cy5nZXRGcmVxdWVuY3koeCk7XHJcbiAqIC8vIHJldHVybnMge1xyXG4gKiAvLyAgICAgXCIxXCI6IDUsXHJcbiAqIC8vICAgICBcIjNcIjogMlxyXG4gKiAvLyB9XHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciB4ID0gW1wiYmlsbFwiLCBcImZyZWRcIiwgXCJmcmVkXCIsIFwiamFuZVwiXTtcclxuICogYXRyb3BhLmFycmF5cy5nZXRGcmVxdWVuY3koeCk7XHJcbiAqIC8vIHJldHVybnMge1xyXG4gKiAvLyAgICAgXCJiaWxsXCI6IDEsXHJcbiAqIC8vICAgICBcImZyZWRcIjogMixcclxuICogLy8gICAgIFwiamFuZVwiOiAxXHJcbiAqIC8vIH1cclxuICogQGV4YW1wbGVcclxuICogdmFyIHggPSBbMSwzLHsnYVByb3AnIDogJ2FWYWwnfV07XHJcbiAqIGF0cm9wYS5hcnJheXMuZ2V0RnJlcXVlbmN5KHgpO1xyXG4gKiAvLyByZXR1cm5zIHtcclxuICogLy8gICAgIFwiMVwiOiAxLFxyXG4gKiAvLyAgICAgXCIzXCI6IDEsXHJcbiAqIC8vICAgICBcIltvYmplY3QgT2JqZWN0XVwiOiAxXHJcbiAqIC8vIH1cclxuICogQGV4YW1wbGVcclxuICogdmFyIG9iaiA9IHsnYVByb3AnIDogJ2FWYWwnfTtcclxuICogdmFyIG90aGVyT2JqID0ge307XHJcbiAqIHZhciB4ID0gWzEsMyxvYmosb3RoZXJPYmoseydhRG91Z2hudXQnIDogJ3Nwcmlua2xlcyd9XTtcclxuICogYXRyb3BhLmFycmF5cy5nZXRGcmVxdWVuY3koeCk7XHJcbiAqIC8vIHJldHVybnMge1xyXG4gKiAvLyAgICAgXCIxXCI6IDEsXHJcbiAqIC8vICAgICBcIjNcIjogMSxcclxuICogLy8gICAgIFwiW29iamVjdCBPYmplY3RdXCI6IDNcclxuICogLy8gfVxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgeCA9IFsxLDMsXCJ0b1N0cmluZ1wiXTtcclxuICogYXRyb3BhLmFycmF5cy5nZXRGcmVxdWVuY3koeCk7XHJcbiAqIC8vIHJldHVybnMge1xyXG4gKiAvLyAgICAgXCIxXCI6IDEsXHJcbiAqIC8vICAgICBcIjNcIjogMSxcclxuICogLy8gICAgIFwidG9TdHJpbmdcIjogXCJmdW5jdGlvbiB0b1N0cmluZygpIHtcXG4gICAgW25hdGl2ZSBjb2RlXVxcbn0xXCJcclxuICogLy8gfVxyXG4gKi9cclxuYXRyb3BhLmFycmF5cy5nZXRGcmVxdWVuY3kgPSBmdW5jdGlvbiAoYXJyKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHZhciBvdXQgPSBhcnIucmVkdWNlKGZ1bmN0aW9uIChhY2MsIGN1cnIpIHtcclxuICAgICAgICBpZiAoYWNjW2N1cnJdID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgYWNjW2N1cnJdID0gMTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBhY2NbY3Vycl0gKz0gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGFjYztcclxuICAgIH0sIHt9KTtcclxuICAgIHJldHVybiBvdXQ7XHJcbn07XHJcbi8qKlxyXG4gKiBHZXRzIFVuaXF1ZSB2YWx1ZXMgZnJvbSBhbiBhcnJheS5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwMTE4XHJcbiAqIEBwYXJhbSB7QXJyYXl9IGxhcmdlQXJyYXkgVGhlIGFycmF5IHdpdGggZHVwbGljYXRlIHZhbHVlcyBpbiBpdC5cclxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGEgbmV3IGFycmF5IGNvbnRhaW5pbmcgb25seSB0aGUgdW5pcXVlXHJcbiAqICB2YWx1ZXMgZm91bmQgaW4gdGhlIGxhcmdlQXJyYXkuXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciB4ID0gWzEsMSwxLDQsNCwzLDZdO1xyXG4gKiBhdHJvcGEuYXJyYXlzLmdldFVuaXF1ZSh4KTtcclxuICogLy8gcmV0dXJucyBbIFwiMVwiLCBcIjRcIiwgXCIzXCIsIFwiNlwiIF1cclxuICogQGV4YW1wbGVcclxuICogdmFyIHggPSBbXCJiaWxsXCIsIFwiZnJlZFwiLCBcImphbmVcIiwgXCJmcmVkXCJdO1xyXG4gKiBhdHJvcGEuYXJyYXlzLmdldFVuaXF1ZSh4KTtcclxuICogLy8gcmV0dXJucyBbXCJiaWxsXCIsIFwiZnJlZFwiLCBcImphbmVcIl1cclxuICogQGV4YW1wbGVcclxuICogdmFyIHggPSBbIFxyXG4gKiAgICAgXCJiaWxsXCIsXHJcbiAqICAgICB7XCJhUHJvcFwiIDogXCJhVmFsdWVcIn0sXHJcbiAqICAgICB7XCJhR3V5XCIgOiBcImZyZWRcIn0sXHJcbiAqICAgICB7XCJhTGFkeVwiIDogXCJqYW5lXCJ9XHJcbiAqIF07XHJcbiAqIGF0cm9wYS5hcnJheXMuZ2V0VW5pcXVlKHgpO1xyXG4gKiAvLyByZXR1cm5zIFsgXCJiaWxsXCIsIFwiW29iamVjdCBPYmplY3RdXCIgXVxyXG4gKi9cclxuYXRyb3BhLmFycmF5cy5nZXRVbmlxdWUgPSBmdW5jdGlvbiAobGFyZ2VBcnJheSkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICByZXR1cm4gT2JqZWN0LmtleXMoYXRyb3BhLmFycmF5cy5nZXRGcmVxdWVuY3kobGFyZ2VBcnJheSkpLnNvcnQoKTtcclxufTtcclxuLyoqXHJcbiAqIFJlbW92ZXMgZW1wdHkgc3RyaW5ncyBmcm9tIHRoZSBnaXZlbiBhcnJheS5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwMTE4XHJcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5V2l0aEVtcHR5RWxlbWVudHMgVGhlIGFycmF5IHdpdGggZW1wdHkgc3RyaW5ncyBpbiBpdC5cclxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGEgbmV3IGFycmF5IHdpdGggZW1wdHkgc3RyaW5ncyByZW1vdmVkLlxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgeCA9IFsgMTAsICwgNSwgXCJcIiwgJycsIDcgXTtcclxuICogY29uc29sZS5sb2coJ3N0YXJ0aW5nIGxlbmd0aCAnICsgeC5sZW5ndGgpO1xyXG4gKiBjb25zb2xlLmxvZyh4KTtcclxuICogeCA9IGF0cm9wYS5hcnJheXMucmVtb3ZlRW1wdHlFbGVtZW50cyh4KTtcclxuICogY29uc29sZS5sb2coJ2VuZGluZyBsZW5ndGggJyArIHgubGVuZ3RoKTtcclxuICogY29uc29sZS5sb2coeCk7XHJcbiAqIC8vIGRpc3BsYXlzIHRoZSBmb2xsb3dpbmdcclxuICogLy8gc3RhcnRpbmcgbGVuZ3RoIDZcclxuICogLy8gWzEwLCB1bmRlZmluZWQsIDUsIFwiXCIsIFwiXCIsIDddXHJcbiAqIC8vIGVuZGluZyBsZW5ndGggM1xyXG4gKiAvLyBbMTAsIDUsIDddXHJcbiAqL1xyXG5hdHJvcGEuYXJyYXlzLnJlbW92ZUVtcHR5RWxlbWVudHMgPSBmdW5jdGlvbiAoYXJyYXlXaXRoRW1wdHlFbGVtZW50cykge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICByZXR1cm4gYXJyYXlXaXRoRW1wdHlFbGVtZW50cy5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICByZXR1cm4gIWF0cm9wYS5pbnF1aXJlLmlzRW1wdHlTdHJpbmcoaXRlbSk7XHJcbiAgICB9KTtcclxufTtcclxuLyoqXHJcbiAqIFJlaW5kZXhlcyBhbiBhcnJheS5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwMTE4XHJcbiAqIEBwYXJhbSB7QXJyYXl9IGFyciBUaGUgYXJyYXkgd2l0aCBkaXNjb250aW51b3VzIGtleXMuXHJcbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBhbiBhcnJheSB3aXRoIGNvbnRpbnVvdXMga2V5cy5cclxuICogQGV4YW1wbGVcclxuICogdmFyIHggPSBbIFwiYVwiLCBcImJcIiwgXCJjXCIsIHVuZGVmaW5lZCBdO1xyXG4gKiBjb25zb2xlLmxvZyh4KTsgLy8gWyBcImFcIiwgXCJiXCIsIFwiY1wiLCB1bmRlZmluZWQgXVxyXG4gKiBjb25zb2xlLmxvZyh4Lmxlbmd0aCk7IC8vIDRcclxuICogXHJcbiAqIGRlbGV0ZSB4WzFdOyAvLyBkZWxldGVzIHRoZSBrZXkgZnJvbSB0aGUgYXJyYXkgYnV0XHJcbiAqICAgICAgICAgICAgICAvLyB0aGUgYXJyYXkgbGVuZ3RoIHJlbWFpbnMgdGhlIHNhbWVcclxuICogICAgICAgICAgICAgIC8vIGF0IHRoaXMgcG9pbnQgdGhlIGFycmF5cyBrZXlzIGFyZSAwLCAyLCBhbmQgM1xyXG4gKiBjb25zb2xlLmxvZyh4KTsgLy8gWyBcImFcIiwgdW5kZWZpbmVkLCBcImNcIiwgdW5kZWZpbmVkIF1cclxuICogY29uc29sZS5sb2coeC5sZW5ndGgpOyAvLyA0XHJcbiAqIFxyXG4gKiB4ID0gYXRyb3BhLmFycmF5cy5yZWluZGV4KHgpO1xyXG4gKiBjb25zb2xlLmxvZyh4KTsgLy8gIFsgXCJhXCIsIFwiY1wiLCB1bmRlZmluZWQgXVxyXG4gKiAgICAvLyBub3RlIHRoYXQgdGhlIGxhc3QgZWxlbWVudCBleGlzdGVkIGluIHRoZSBhcnJheSwgaXRzIHZhbHVlIHdhc1xyXG4gKiAgICAvLyB1bmRlZmluZWQgYnV0IGl0IGRpZCBoYXZlIGEga2V5IHNvIHRoZSBlbGVtZW50IHJlbWFpbnMgaW4gdGhlIGFycmF5LlxyXG4gKiAgICAvL1xyXG4gKiAgICAvLyBUaGUgZGVsZXRlZCBlbGVtZW50IHdhcyBpbiBmYWN0IGRlbGV0ZWQgZnJvbSB0aGUgYXJyYXkgc28gdGhlcmUgd2FzIG5vXHJcbiAqICAgIC8vIGtleSB4WzFdIGF0IGFsbCwgd2hlbiB0cnlpbmcgdG8gYWNjZXNzIHRoaXMgbm9uIGV4aXN0aW5nIGVsZW1lbnQgdGhlXHJcbiAqICAgIC8vIHZhbHVlIG9mIHVuZGVmaW5lZCB3YXMgcmV0dXJuZWQuIFRoaXMgYmVoYXZpb3IgaXMgY29uZnVzaW5nIHVubGVzcyB5b3VcclxuICogICAgLy8gdGhpbmsgYWJvdXQgdGhlIGFycmF5YXMgYW4gb2JqZWN0IHdob3NlIHByb3BlcnRpZXMgYXJlIG5hbWVkIGJ5XHJcbiAqICAgIC8vIG51bWJlcnMuIEFjY2Vzc2luZyBhbiB1bmRlZmluZWQgcHJvcGVydHkgcmV0dXJucyB1bmRlZmluZWQgcmVnYXJkbGVzc1xyXG4gKiAgICAvLyBvZiB3aGV0aGVyIHRoZSBwcm9wZXJ0eSBleGlzdGVkIGluIHRoZSBwYXN0IG9yIG5vdC5cclxuICogY29uc29sZS5sb2coeC5sZW5ndGgpOyAvLyAzXHJcbiAqL1xyXG5hdHJvcGEuYXJyYXlzLnJlaW5kZXggPSBmdW5jdGlvbiByZWluZGV4KGFycikge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICB2YXIgaWR4LCBvdXQ7XHJcbiAgICBvdXQgPSBbXTtcclxuICAgIGZvcihpZHggaW4gYXJyKSB7XHJcbiAgICAgICAgaWYoYXJyLmhhc093blByb3BlcnR5KGlkeCkpIHtcclxuICAgICAgICAgICAgb3V0LnB1c2goYXJyW2lkeF0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBvdXQ7XHJcbn07XHJcbi8qKlxyXG4gKiBTb3J0cyBhbiBhcnJheSdzIGVsZW1lbnRzIG51bWVyaWNhbGx5LlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzAxMjBcclxuICogQHBhcmFtIHtBcnJheX0gYXJyIFRoZSBhcnJheSB0byBzb3J0LiBBbGwgZWxlbWVudHMgb2YgdGhlIGFycmF5IG11c3QgYmVcclxuICogIG51bWJlci1pc2guXHJcbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBhbiBhcnJheSB3aG9zZSBlbGVtZW50cyBhcmUgaW4gbnVtZXJpYyBvcmRlci5cclxuICogQGV4YW1wbGVcclxuICogdmFyIHggPSBbMywgMiwgOSwgMjYsIDEwLCAxLCA5OSwgMTVdO1xyXG4gKiBjb25zb2xlLmxvZyggYXRyb3BhLmFycmF5cy5zb3J0TnVtZXJpY2FsbHkoeCkgKTtcclxuICogLy8gbG9ncyBbMSwgMiwgMywgOSwgMTAsIDE1LCAyNiwgOTldXHJcbiAqL1xyXG5hdHJvcGEuYXJyYXlzLnNvcnROdW1lcmljYWxseSA9IGZ1bmN0aW9uIHNvcnROdW1lcmljYWxseShhcnIpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgcmV0dXJuIGFyci5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XHJcbiAgICAgICAgcmV0dXJuIChhIC0gYik7XHJcbiAgICB9KTtcclxufTtcclxuLyoqXHJcbiAqIFRocm93cyBhbiBlcnJvciwgPGNvZGU+U3RyaW5nLnByb3RvdHlwZS5sb2NhbGVDb21wYXJlPC9jb2RlPiBpcyBub3QgXHJcbiAqICBzdGFuZGFyZGl6ZWQuXHJcbiAqIFxyXG4gKiAgWWVzLCBsb2NhbGVDb21wYXJlIGlzIGluIHRoZSBzdGFuZGFyZCBidXQsIGF0IHRoaXMgdGltZSB0aGUgYWN0dWFsXHJcbiAqICBjb21wYXJpc29uIGlzIGltcGxlbWVudGF0aW9uIGRlcGVuZGFudC4gVGhpcyBtZWFucyB0aGF0IFwiYWxwaGFiZXRpY2FsIG9yZGVyXCJcclxuICogIGNhbiBiZSBkaWZmZXJlbnQgb24gZGlmZmVyZW50IHBsYXRmb3Jtcy4gV2hhdCBJIGZvdW5kIHdhcyB0aGF0IGluIG5vZGUgdGhlXHJcbiAqICBhcnJheSBvZiA8Y29kZT5bJ2EnLCdaJywnQScsJ3onXTwvY29kZT4gd291bGQgYmUgc29ydGVkIHRvXHJcbiAqICA8Y29kZT5bJ0EnLCdaJywnYScsJ3pcIl08L2NvZGU+LCB3aGlsZSBvblxyXG4gKiAgZmlyZWZveCBpdCB3b3VsZCBiZSBzb3J0ZWQgdG8gPGNvZGU+WydhJywnQScsJ3onLCdaJ108L2NvZGU+LiBXaG8ga25vd3MgaWZcclxuICogIGFub3RoZXIgaW1wbGVtZW50b3Igd291bGQgc29ydCBpdCA8Y29kZT5bJ0EnLCdhJywnWicsJ3onXTwvY29kZT4/XHJcbiAqIFxyXG4gKiBJbiBvcmRlciB0byBwcm92aWRlIGEgcmVsaWFibGUgaW1wbGVtZW50YXRpb24gSSB3b3VsZCBoYXZlIHRvIGNyZWF0ZSBteSBvd25cclxuICogIGltcGxlbWVudGF0aW9uIG9mIDxjb2RlPlN0cmluZy5wcm90b3R5cGUubG9jYWxlQ29tcGFyZTwvY29kZT4gYW5kIHRoYXQnc1xyXG4gKiAganVzdCB0b28gbXVjaCB3b3JrIGZvciBtZSB0byBkbyBhbG9uZS5cclxuICogQHRocm93cyB7RXJyb3J9IFwiU3RyaW5nLnByb3RvdHlwZS5sb2NhbGVDb21wYXJlIGlzIG5vdCBzdGFuZGFyZGl6ZWRcIlxyXG4gKi9cclxuYXRyb3BhLmFycmF5cy5zb3J0QWxwaGFiZXRpY2FsbHkgPSBmdW5jdGlvbiBzb3J0QWxwaGFiZXRpY2FsbHkoYXJyKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHRocm93IG5ldyBFcnJvcihcIlN0cmluZy5wcm90b3R5cGUubG9jYWxlQ29tcGFyZSBpcyBub3Qgc3RhbmRhcmRpemVkXCIpO1xyXG59O1xyXG4vKipcclxuICogRGVsZXRlcyB0aGUgZ2l2ZW4gZWxlbWVudCBmcm9tIHRoZSBhcnJheSBhdCB0aGUgZ2l2ZW4gaW5kZXguIEl0IGJhc2ljYWxseVxyXG4gKiAgZG9lcyB3aGF0IHlvdSB3b3VsZCBleHBlY3QgdGhlIGRlbGV0ZSBvcGVyYXRvciB0byBkbywgZXhjZXB0IHRoZSBkZWxldGVcclxuICogIG9wZXJhdG9yIGRvZXNuJ3QgZG8gd2hhdCB5b3Ugd291bGQgZXhwZWN0LlxyXG4gKiBAcGFyYW0ge0FycmF5fSBhcnIgVGhlIGFycmF5LlxyXG4gKiBAcGFyYW0ge051bWJlcn0gaW5kZXggVGhlIGluZGV4IG9mIHRoZSBlbGVtZW50IHRvIGRlbGV0ZS5cclxuICogQHJldHVybnMgUmV0dXJucyBhbiBhcnJheSB3aXRoIHRoZSBlbGVtZW50IHJlbW92ZWQsIGNvbnRpZ3VvdXMga2V5cywgYW5kXHJcbiAqICB3aG9zZSBsZW5ndGggaXMgMSBsZXNzIHRoYW4gdGhlIGlucHV0IGFycmF5LlxyXG4gKi9cclxuYXRyb3BhLmFycmF5cy5kZWxldGVFbGVtZW50ID0gZnVuY3Rpb24gKGFyciwgaW5kZXgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgZGVsZXRlIGFycltpbmRleF07XHJcbiAgICByZXR1cm4gYXRyb3BhLmFycmF5cy5yZWluZGV4KGFycik7XHJcbn07XHJcblxyXG5cclxuXHJcblxyXG53aGlsZShhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMubGVuZ3RoID4gMCkge1xyXG4gICAgYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLnBvcCgpKCk7XHJcbn1cclxubW9kdWxlLmV4cG9ydHMgPSBhdHJvcGE7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9kb2NzL3ZzZG9jL09wZW5MYXllcnNBbGwuanNcIi8+XG52YXIgYXRyb3BhID0gcmVxdWlyZSgnYXRyb3BhLWhlYWRlcicpO1xuLypqc2xpbnRcbiAgICBpbmRlbnQ6IDQsXG4gICAgbWF4ZXJyOiA1MCxcbiAgICB3aGl0ZTogdHJ1ZSxcbiAgICBicm93c2VyOiB0cnVlLFxuICAgIGRldmVsOiB0cnVlLFxuICAgIHBsdXNwbHVzOiB0cnVlLFxuICAgIHJlZ2V4cDogdHJ1ZVxuKi9cbi8qZ2xvYmFsIGF0cm9wYSAqL1xuLy8gZW5kIGhlYWRlclxuLyoqXG4gKiBDb250YWluZXIgZm9yIGN1c3RvbSBFcnJvcnMuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQG5hbWVzcGFjZSBDb250YWluZXIgZm9yIGN1c3RvbSBFcnJvcnMuXG4gKi9cbmF0cm9wYS5jdXN0b21FcnJvcnMgPSB7fTtcblxuLyoqXG4gKiBJbnZhbGlkIEFyZ3VtZW50IFR5cGVzIEVycm9yXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQHZlcnNpb24gMjAxMzAyMjFcbiAqIEBjbGFzcyBJbnZhbGlkIEFyZ3VtZW50IFR5cGVzIEVycm9yXG4gKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZSBPcHRpb25hbC4gVGhlIGVycm9yIG1lc3NhZ2UgdG8gc2VuZC4gRGVmYXVsdHMgdG9cbiAqICA8Y29kZT5JbnZhbGlkQXJndW1lbnRUeXBlc0Vycm9yPC9jb2RlPlxuICogQHJldHVybnMge0Vycm9yfSBSZXR1cm5zIGFuIGluc3RhbmNlIG9mIHRoZSBJbnZhbGlkQXJndW1lbnRUeXBlc0Vycm9yXG4gKi9cbmF0cm9wYS5jdXN0b21FcnJvcnMuSW52YWxpZEFyZ3VtZW50VHlwZXNFcnJvciA9IGZ1bmN0aW9uIEludmFsaWRBcmd1bWVudFR5cGVzRXJyb3IobWVzc2FnZSkge1xuICAgICd1c2Ugc3RyaWN0JztcbiAgICAvKipcbiAgICAgKiBUaGUgbmFtZSBvZiB0aGUgZXJyb3IuIFRlbGxzIHRoZSB1c2VyIHdoYXQga2luZCBvZiBjdXN0b21cbiAgICAgKiBlcnJvciBoYXMgYmVlbiB0aHJvd24uXG4gICAgICogQGZpZWxkT2YgYXRyb3BhLmN1c3RvbUVycm9ycy5JbnZhbGlkQXJndW1lbnRUeXBlc0Vycm9yI1xuICAgICAqIEB0eXBlIHtTdHJpbmd9XG4gICAgICogQGRlZmF1bHQgXCJhdHJvcGEuY3VzdG9tRXJyb3JzLkludmFsaWRBcmd1bWVudFR5cGVzRXJyb3JcIlxuICAgICAqL1xuICAgIHRoaXMubmFtZSA9IFwiYXRyb3BhLmN1c3RvbUVycm9ycy5JbnZhbGlkQXJndW1lbnRUeXBlc0Vycm9yXCI7XG4gICAgLyoqXG4gICAgICogVGhlIGVycm9yIG1lc3NhZ2UgdG8gc2VuZC5cbiAgICAgKiBAZmllbGRPZiBhdHJvcGEuY3VzdG9tRXJyb3JzLkludmFsaWRBcmd1bWVudFR5cGVzRXJyb3IjXG4gICAgICogQHR5cGUge1N0cmluZ31cbiAgICAgKiBAZGVmYXVsdCBcIkludmFsaWRBcmd1bWVudFR5cGVzRXJyb3JcIlxuICAgICAqL1xuICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2UgfHwgXCJJbnZhbGlkQXJndW1lbnRUeXBlc0Vycm9yXCI7XG59O1xuYXRyb3BhLmN1c3RvbUVycm9ycy5JbnZhbGlkQXJndW1lbnRUeXBlc0Vycm9yLnByb3RvdHlwZSA9IG5ldyBFcnJvcigpO1xuYXRyb3BhLmN1c3RvbUVycm9ycy5JbnZhbGlkQXJndW1lbnRUeXBlc0Vycm9yLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFxuICAgIGF0cm9wYS5jdXN0b21FcnJvcnMuSW52YWxpZEFyZ3VtZW50VHlwZXNFcnJvcjtcblxuXG5cblxud2hpbGUoYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLmxlbmd0aCA+IDApIHtcbiAgICBhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMucG9wKCkoKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gYXRyb3BhO1xuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2RvY3MvdnNkb2MvT3BlbkxheWVyc0FsbC5qc1wiLz5cbi8qanNsaW50XG4gICAgaW5kZW50OiA0LFxuICAgIG1heGVycjogNTAsXG4gICAgd2hpdGU6IHRydWUsXG4gICAgYnJvd3NlcjogdHJ1ZSxcbiAgICBkZXZlbDogdHJ1ZSxcbiAgICBwbHVzcGx1czogdHJ1ZSxcbiAgICByZWdleHA6IHRydWVcbiovXG4vKmdsb2JhbCBYUGF0aFJlc3VsdCAqL1xuLy8gZW5kIGhlYWRlclxuXG4vKipcbiAqIENvbnRhaW5lciBmb3IgYWxsIEdsb3Jpb3VzIGNsYXNzZXMsIGZ1bmN0aW9ucywgZXRjLlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAqIEBuYW1lc3BhY2UgQ29udGFpbmVyIGZvciBhbGwgR2xvcmlvdXMgY2xhc3NlcywgZnVuY3Rpb25zLCBldGMuXG4gKi9cbnZhciBhdHJvcGEgPSB7fTtcbi8qKlxuICogQ2hlY2tzIHdoZXRoZXIgdGhpcyBjbGFzcyBoYXMgYmVlbiBtYXJrZWQgYXMgdW5zdXBwb3J0ZWQgYW5kIHRocm93cyBhbiBcbiAqICBlcnJvciBpZiBpdCBoYXMuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQHZlcnNpb24gMjAxMzAzMDhcbiAqIEBwYXJhbSB7U3RyaW5nfSBjbGFzc05hbWUgVGhlIG5hbWUgb2YgdGhlIGNsYXNzLlxuICogQHBhcmFtIHtTdHJpbmd9IGVycm9yTWVzc2FnZSBPcHRpb25hbC4gQSBjdXN0b20gZXJyb3IgbWVzc2FnZS4gRGVmYXVsdHMgdG9cbiAqICBhdHJvcGEuZGF0YVtjbGFzc05hbWVdLmVycm9yXG4gKi9cbmF0cm9wYS5zdXBwb3J0Q2hlY2sgPSBmdW5jdGlvbiAoY2xhc3NOYW1lLCBlcnJvck1lc3NhZ2UpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICBjbGFzc05hbWUgPSBTdHJpbmcoY2xhc3NOYW1lKTtcbiAgICBlcnJvck1lc3NhZ2UgPSBlcnJvck1lc3NhZ2UgfHwgYXRyb3BhLmRhdGFbY2xhc3NOYW1lXS5lcnJvcjtcbiAgICBlcnJvck1lc3NhZ2UgPSBTdHJpbmcoZXJyb3JNZXNzYWdlKTtcbiAgICBcbiAgICBpZihhdHJvcGEuZGF0YVtjbGFzc05hbWVdLnN1cHBvcnQgPT09ICd1bnN1cHBvcnRlZCcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yTWVzc2FnZSk7XG4gICAgfVxufTtcbi8qKlxuICogUHVzaGVzIGEgcmVxdWlyZW1lbnQgY2hlY2sgaW50byBhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMuIFRoZSB0ZXN0XG4gKiAgdGVzdHMgd2hldGhlciB0aGUgY2xhc3MgaXMgc3VwcG9ydGVkIGluIHRoaXMgZW52aXJvbm1lbnQuIFNldHNcbiAqICBhdHJvcGEuZGF0YVtjbGFzc05hbWVdJ3Mgc3VwcG9ydCB0byB1bnN1cHBvcnRlZCBhbmQgZXJyb3IgdG8gZXJyb3JNZXNzYWdlXG4gKiAgaWYgdGhlIHJlcXVpcmVtZW50Rm4gcmV0dXJucyBmYWxzZS4gVGhlIHJlcXVpcmVtZW50IGNoZWNrcyB3aWxsIGFsbCBiZSBydW5cbiAqICBhZnRlciB0aGUgbGlicmFyeSBoYXMgbG9hZGVkLlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAqIEB2ZXJzaW9uIDIwMTMwMzA4XG4gKiBAcGFyYW0ge1N0cmluZ30gY2xhc3NOYW1lIFRoZSBuYW1lIG9mIHRoZSBjbGFzcy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlcXVpcmVtZW50Rm4gQSBmdW5jdGlvbiB0byB0ZXN0IHdoZXRoZXIgb3Igbm90IHRoZSBjbGFzc1xuICogIGlzIHN1cHBvcnRlZCBpbiB0aGlzIGVudmlyb25tZW50LiBJZiBzdXBwb3J0ZWQsIHJldHVybnMgdHJ1ZSBvdGhlcndpc2VcbiAqICByZXR1cm4gZmFsc2UuXG4gKiBAcGFyYW0ge1N0cmluZ30gZXJyb3JNZXNzYWdlIFRoZSBlcnJvciBtZXNzYWdlIHRvIHVzZSB3aGVuIHRoaXMgY2xhc3Mgb3IgaXRzXG4gKiAgbWV0aG9kcyBhcmUgY2FsbGVkIGluIHVuc3VwcG9ydGVkIGVudmlyb25tZW50cy4gRGVmYXVsdHMgdG86XG4gKiAgJ1RoZSBhdHJvcGEuJyArIGNsYXNzTmFtZSArICcgY2xhc3MgaXMgdW5zdXBwb3J0ZWQgaW4gdGhpcyBlbnZpcm9ubWVudC4nO1xuICovXG5hdHJvcGEucmVxdWlyZXMgPSBmdW5jdGlvbiAoY2xhc3NOYW1lLCByZXF1aXJlbWVudEZuLCBlcnJvck1lc3NhZ2UpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICB2YXIgY2hlY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB0ZXN0ID0gZmFsc2U7XG4gICAgICAgIGlmKHR5cGVvZiBjbGFzc05hbWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2F0cm9wYS5yZXF1aXJlcyByZXF1aXJlcyB0aGUgY2xhc3MgbmFtZSB0byBiZSAnICtcbiAgICAgICAgICAgICAgICAnc3BlY2lmaWVkJyk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmKGF0cm9wYS5kYXRhW2NsYXNzTmFtZV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgYXRyb3BhLmRhdGFbY2xhc3NOYW1lXSA9IHt9O1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZih0eXBlb2YgcmVxdWlyZW1lbnRGbiAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIHJlcXVpcmVtZW50Rm4gPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVycm9yTWVzc2FnZSA9IGVycm9yTWVzc2FnZSB8fCAnVGhlIGF0cm9wYS4nICsgY2xhc3NOYW1lICtcbiAgICAgICAgICAgICAgICAgICAgJyBjbGFzcyBpcyB1bnN1cHBvcnRlZCBpbiB0aGlzIGVudmlyb25tZW50Lic7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHRlc3QgPSByZXF1aXJlbWVudEZuKCk7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgdGVzdCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBhdHJvcGEuZGF0YVtjbGFzc05hbWVdLmVycm9yID0gZXJyb3JNZXNzYWdlO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZih0ZXN0ID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIGF0cm9wYS5kYXRhW2NsYXNzTmFtZV0uc3VwcG9ydCA9ICd1bnN1cHBvcnRlZCc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFxuICAgIGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5wdXNoKGNoZWNrKTtcbn07XG4vKipcbiAqIENvbnRhaW5lciBmb3IgZ29iYWwgZGF0YSByZWxhdGVkIHRvIHRoZSBjbGFzc2VzIGFuZCBmdW5jdGlvbnMuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQG5hbWVzcGFjZSBDb250YWluZXIgZm9yIGdvYmFsIGRhdGEgcmVsYXRlZCB0byB0aGUgY2xhc3NlcyBhbmQgZnVuY3Rpb25zLlxuICovXG5hdHJvcGEuZGF0YSA9IHt9O1xuXG5hdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMgPSBbXTtcblxuYXRyb3BhLm5vcCA9IGZ1bmN0aW9uIG5vcCAoKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgcmV0dXJuIG51bGw7XG59O1xubW9kdWxlLmV4cG9ydHMgPSBhdHJvcGE7XG5cbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9kb2NzL3ZzZG9jL09wZW5MYXllcnNBbGwuanNcIi8+XHJcbnZhciBhdHJvcGEgPSByZXF1aXJlKCdhdHJvcGEtaGVhZGVyJyk7XHJcbmF0cm9wYS5zZXRBc09wdGlvbmFsQXJnID0gcmVxdWlyZSgnYXRyb3BhLXNldEFzT3B0aW9uYWxBcmcnKS5zZXRBc09wdGlvbmFsQXJnO1xyXG4vKmpzbGludFxyXG4gICAgaW5kZW50OiA0LFxyXG4gICAgbWF4ZXJyOiA1MCxcclxuICAgIHdoaXRlOiB0cnVlLFxyXG4gICAgYnJvd3NlcjogdHJ1ZSxcclxuICAgIGRldmVsOiB0cnVlLFxyXG4gICAgcGx1c3BsdXM6IHRydWUsXHJcbiAgICByZWdleHA6IHRydWVcclxuKi9cclxuLypnbG9iYWwgYXRyb3BhICovXHJcbi8vIGVuZCBoZWFkZXJcclxuXHJcblxyXG5hdHJvcGEucmVxdWlyZXMoXHJcbiAgICAnaW5qZWN0JyxcclxuICAgIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgICAgICBpZihkb2N1bWVudC5jcmVhdGVFbGVtZW50ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuKTtcclxuXHJcbi8qKlxyXG4gKiBDb250YWlucyB0b29scyBmb3IgaW5qZWN0aW5nIGVsZW1lbnRzIGFuZCBhc3NlbWJsaWVzLlxyXG4gKiBpbnRvIHRoZSBwYWdlLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzAzMDhcclxuICogQG5hbWVzcGFjZSBDb250YWlucyB0b29scyBmb3IgaW5qZWN0aW5nIGVsZW1lbnRzIGFuZCBhc3NlbWJsaWVzLlxyXG4gKiBAcmVxdWlyZXMgYXRyb3BhLmRhdGFcclxuICogQHJlcXVpcmVzIGF0cm9wYS5zdXBwb3J0Q2hlY2tcclxuICogQHJlcXVpcmVzIGF0cm9wYS5zZXRBc09wdGlvbmFsQXJnXHJcbiAqL1xyXG5hdHJvcGEuaW5qZWN0ID0ge307XHJcbi8qKlxyXG4gKiBHZW5lcmljIEVsZW1lbnQgSW5qZWN0b3IuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEyMDkwOVxyXG4gKiBAcGFyYW0ge1N0cmluZ30gZWxlbWVudFR5cGUgVGhlIHR5cGUgb2YgZWxlbWVudCB0byBiZSBpbmplY3RlZC5cclxuICogQHBhcmFtIHtIVE1MIERPTSBEb2N1bWVudH0gZG9jcmVmIE9wdGlvbmFsLiBBIHJlZmVyZW5jZSB0byB0aGUgZG9jdW1lbnQgdG9cclxuICogIHRhcmdldCwgZGVmYXVsdHMgdG8gPGNvZGU+ZG9jdW1lbnQ8L2NvZGU+LlxyXG4gKiBAcGFyYW0ge0RPTSBOb2RlfSBwYXJlbnROb2QgT3B0aW9uYWwuIEEgcmVmZXJlbmNlIHRvIHRoZSBwYXJlbnQgbm9kZSB0b1xyXG4gKiAgdGFyZ2V0LCBkZWZhdWx0cyB0byA8Y29kZT5kb2NyZWYuYm9keTwvY29kZT4uXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBhdHRyaWJ1dGVzIE9wdGlvbmFsLiBBbiBvYmplY3Qgd2hvc2UgcHJvcGVydGllcyBhcmUgbmFtZXMgb2ZcclxuICogIEhUTUwgYXR0cmlidXRlcywgZGVmYXVsdHMgdG8gPGNvZGU+e308L2NvZGU+LiBUaGUgdmFsdWUgb2YgdGhlc2UgcHJvcGVydGllc1xyXG4gKiAgYXJlIHRvIGJlIHN0cmluZ3MgcmVwcmVzZW50aW5nIHRoZSB2YWx1ZXMgb2YgdGhlIEhUTUwgYXR0cmlidXRlcyBhcyB0aGV5IGFyZVxyXG4gKiAgdG8gYmUgYXBwbGllZCB0byB0aGUgaW5qZWN0ZWQgZWxlbWVudC5cclxuICogQGV4YW1wbGUgRXhhbXBsZSBhdHRyaWJ1dGVzIG9iamVjdCA6XHJcbiAqXHJcbiAqIGF0dHJpYnV0ZXNPYmogPSB7XHJcbiAqICAgICBcImlkXCIgOiBcImVsZW1lbnRJRFwiLFxyXG4gKiAgICAgXCJjbGFzc1wiIDogXCJjbGFzc3lcIlxyXG4gKiB9O1xyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvbmxvYWRIYW5kbGVyIE9wdGlvbmFsLiBJZiB0aGUgZWxlbWVudCBiZWluZyBpbmplY3RlZCB3aWxsXHJcbiAqICBmaXJlIGEgbG9hZCBldmVudCwgdGhpcyBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZC4gRGVmYXVsdHMgdG9cclxuICogIDxjb2RlPmZ1bmN0aW9uICgpIHt9PC9jb2RlPi5cclxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgT3B0aW9uYWwuIFRoaXMgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQganVzdCBiZWZvcmVcclxuICogIHRoZSBlbGVtZW50IGlzIHRvIGJlIGFwcGVuZGVkIHRvIHRoZSBwYWdlLiBUaGUgY2FsbGJhY2sgd2lsbCByZWNlaXZlIHRoZVxyXG4gKiAgZWxlbWVudCBpbiBpdHMgY3VycmVudCBzdGF0ZSBmb3IgYW55IGFkZGl0aW9uYWwgcHJvY2Vzc2luZyB0byBiZSBkb25lIHByaW9yXHJcbiAqICB0byBpdCdzIGF0dGFjaG1lbnQgb24gY2FsbGJhY2sgY29tcGxldGlvbi4gRGVmYXVsdHMgdG9cclxuICogIDxjb2RlPmZ1bmN0aW9uICgpIHt9PC9jb2RlPi5cclxuICogQHJldHVybiB7SFRNTCBFbGVtZW50fSBSZXR1cm5zIGEgcmVmZXJlbmNlIHRvIHRoZSBIVE1MIEVsZW1lbnQgY3JlYXRlZCBhbmRcclxuICogIGluamVjdGVkLlxyXG4gKiBAc2VlIDxhIGhyZWY9XCJodHRwOi8vd3d3LnczLm9yZy9TZWN1cml0eS93aWtpL1NhbWVfT3JpZ2luX1BvbGljeVwiPlxyXG4gKiBodHRwOi8vd3d3LnczLm9yZy9TZWN1cml0eS93aWtpL1NhbWVfT3JpZ2luX1BvbGljeTwvYT5cclxuICogQGV4YW1wbGVcclxuICogIC8vIHRoaXMgd2lsbCBpbmplY3QgYSBkaXYgZWxlbWVudCBpbnRvIHRoZSBkb2N1bWVudCBib2R5LlxyXG4gKiAgdmFyIGVsID0gYXRyb3BhLmluamVjdC5lbGVtZW50ICgnZGl2Jyk7XHJcbiAqICBcclxuICogIC8vIFRoaXMgd2lsbCBpbmplY3QgYSBkaXYgd2l0aCB0aGUgaWQgXCJteUlkXCIgaW50byB0aGUgZWxlbWVudCByZWZlcmVuY2VkIGJ5XHJcbiAqICAvLyBcImNvbnRhaW5lclwiXHJcbiAqICB2YXIgZWwgPSBhdHJvcGEuaW5qZWN0LmVsZW1lbnQgKFxyXG4gKiAgICAgICdkaXYnLCBkb2N1bWVudCwgY29udGFpbmVyLCB7ICdpZCc6ICdteUlkJyB9LCBudWxsLCBudWxsXHJcbiAqICApO1xyXG4gKiAgXHJcbiAqICAvLyB0aGlzIHdpbGwgaW5qZWN0IGEgZGl2IGludG8gdGhlIGRvY3VtZW50IG9mIGFuIGlmcmFtZSByZWZlcmVuY2VkIHdpdGggXCJmZG9jXCJcclxuICogIC8vIEp1c3QgYmVmb3JlIHRoZSBkaXYgaXMgaW5qZWN0ZWQgdGhlIGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIGFuZCB0aGUgZWxlbWVudFxyXG4gKiAgLy8gbWF5IGJlIGF1Z21lbnRlZC4gV2hlbiB0aGUgY2FsbGJhY2sgcmV0dXJucyB0aGUgZWxlbWVudCB3aWxsIGJlIGluamVjdGVkLlxyXG4gKiAgdmFyIGZkb2MgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc29tZUZyYW1lJykuY29udGVudFdpbmRvdy5kb2N1bWVudDtcclxuICogIFxyXG4gKiAgdmFyIGVsID0gYXRyb3BhLmluamVjdC5lbGVtZW50IChcclxuICogICAgICAnZGl2JywgZmRvYywgZmRvYy5ib2R5LCB7ICdpZCc6ICdteUlkJyB9LFxyXG4gKiAgICAgIG51bGwsXHJcbiAqICAgICAgZnVuY3Rpb24gKG15RGl2KSB7XHJcbiAqICAgICAgICAgIG15RGl2LnRleHRDb250ZW50ID0gJ0kgY291bGQgaGF2ZSBhdHRhY2hlZCBldmVudCBoYW5kbGVycyc7XHJcbiAqICAgICAgfVxyXG4gKiAgKTtcclxuICogIFxyXG4gKiAgLy8gdGhpcyB3aWxsIGluamVjdCBhbiBpZnJhbWUgaW50byB0aGUgZG9jdW1lbnRcclxuICogIC8vIG9uY2UgdGhlIGlmcmFtZSdzIGRvY3VtZW50IGhhcyBmaW5pc2hlZCBsb2FkaW5nIHRoZSBvbmxvYWQgaGFuZGxlciB3aWxsIGJlXHJcbiAqICAvLyBjYWxsZWQuIElmIHRoZSBkb2N1bWVudCBhbmQgdGhlIGlmcmFtZSBhcmUgb24gdGhlIHNhbWUgZG9tYWluLCBzY3JpcHRzIG9uXHJcbiAqICAvLyB0aGUgZnJhbWUgYW5kIHRoZSBwYXJlbnQgZG9jdW1lbnQgd2lsbCBiZSBhYmxlIHRvIGNvbW11aW5jYXRlIHdpdGggZWFjaFxyXG4gKiAgLy8gb3RoZXIuXHJcbiAqICBmdW5jdGlvbiBpZnJhbWVIYXNMb2FkZWQgKG1lc3NhZ2UpIHtcclxuICogICAgICBjb25zb2xlLmxvZyhtZXNzYWdlKTtcclxuICogIH1cclxuICogIFxyXG4gKiAgdmFyIGVsID0gYXRyb3BhLmluamVjdC5lbGVtZW50IChcclxuICogICAgICAnaWZyYW1lJywgZG9jdW1lbnQsIGRvY3VtZW50LmJvZHksXHJcbiAqICAgICAgeyAnaWQnOiAnbXlJZCcsICdzcmMnIDogJ2h0dHA6Ly9sb2NhbGhvc3QnIH0sXHJcbiAqICAgICAgZnVuY3Rpb24gKCkge1xyXG4gKiAgICAgICAgICBpZnJhbWVIYXNMb2FkZWQoJ2hleSBsb29rIGF0IHRoYXQsIHRoZSBmcmFtZSBpcyByZWFkeSEnKTtcclxuICogICAgICAgICAgLy8gd2hhdCBjb3VsZCBJIGRvIHdpdGggdGhlIGZyYW1lPyBhbnl0aGluZyBJIHdhbnQhXHJcbiAqICAgICAgfSxcclxuICogICAgICBudWxsXHJcbiAqICApO1xyXG4gKi9cclxuYXRyb3BhLmluamVjdC5lbGVtZW50ID0gZnVuY3Rpb24gKFxyXG4gICAgZWxlbWVudFR5cGUsIGRvY3JlZiwgcGFyZW50Tm9kLCBhdHRyaWJ1dGVzLCBvbmxvYWRIYW5kbGVyLCBjYWxsYmFja1xyXG4pIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgYXRyb3BhLnN1cHBvcnRDaGVjaygnaW5qZWN0Jyk7XHJcbiAgICBcclxuICAgIHZhciBlbCxcclxuICAgIHg7XHJcbiAgICBkb2NyZWYgPSBhdHJvcGEuc2V0QXNPcHRpb25hbEFyZyhkb2N1bWVudCwgZG9jcmVmKTtcclxuICAgIHBhcmVudE5vZCA9IGF0cm9wYS5zZXRBc09wdGlvbmFsQXJnKGRvY3JlZi5ib2R5LCBwYXJlbnROb2QpO1xyXG4gICAgYXR0cmlidXRlcyA9IGF0cm9wYS5zZXRBc09wdGlvbmFsQXJnKHt9LCBhdHRyaWJ1dGVzKTtcclxuICAgIG9ubG9hZEhhbmRsZXIgPSBhdHJvcGEuc2V0QXNPcHRpb25hbEFyZyhhdHJvcGEubm9wLCBvbmxvYWRIYW5kbGVyKTtcclxuICAgIGNhbGxiYWNrID0gYXRyb3BhLnNldEFzT3B0aW9uYWxBcmcoYXRyb3BhLm5vcCwgY2FsbGJhY2spO1xyXG4gICAgXHJcbiAgICBlbCA9IGRvY3JlZi5jcmVhdGVFbGVtZW50KGVsZW1lbnRUeXBlKTtcclxuICAgIGZvciAoeCBpbiBhdHRyaWJ1dGVzKSB7XHJcbiAgICAgICAgaWYgKGF0dHJpYnV0ZXMuaGFzT3duUHJvcGVydHkoeCkpIHtcclxuICAgICAgICAgICAgZWwuc2V0QXR0cmlidXRlKHgsIGF0dHJpYnV0ZXNbeF0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBvbmxvYWRIYW5kbGVyLCB0cnVlKTtcclxuICAgIGNhbGxiYWNrKGVsKTtcclxuICAgIHBhcmVudE5vZC5hcHBlbmRDaGlsZChlbCk7XHJcbiAgICByZXR1cm4gZWw7XHJcbn07XHJcbi8qKlxyXG4gKiBIaWRkZW4gSWZyYW1lIEluamVjdG9yLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzAzMDhcclxuICogQHBhcmFtIHtTdHJpbmd9IGlkIFRoZSBpZCBvZiB0aGUgZWxlbWVudCB0byBiZSBpbmplY3RlZC5cclxuICogQHBhcmFtIHtTdHJpbmd9IHNyY1VybCBUaGUgVVJMIHRvIGxvYWQgaW4gdGhlIGlmcmFtZS5cclxuICogQHBhcmFtIHtIVE1MIERPTSBEb2N1bWVudH0gZG9jcmVmIE9wdGlvbmFsLiBSZWZlcmVuY2UgdG8gdGhlIGRvY3VtZW50IHRvXHJcbiAqICBpbmplY3QgdGhlIGlmcmFtZSBpbi4gRGVmYXVsdHMgdG8gZG9jdW1lbnQuXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9ubG9hZEhhbmRsZXIgT3B0aW9uYWwuIFRoZSBvbmxvYWQgaGFuZGxlciBmb3IgdGhlIGlmcmFtZS5cclxuICogQHBhcmFtIHtET00gTm9kZX0gcGFyZW50Tm9kIE9wdGlvbmFsLiBSZWZlcmVuY3QgdG8gdGhlIHBhcmVudCBub2RlIHRvXHJcbiAqICBhcHBlbmQgdGhlIGlmcmFtZSB0by4gRGVmYXVsdHMgdG8gZG9jcmVmLmJvZHlcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgT3B0aW9uYWwuIENhbGxiYWNrIGZ1bmN0aW9uIGZvciBwcmVwcm9jZXNzaW5nXHJcbiAqICB0aGUgaWZyYW1lIHByaW9yIHRvIGluamVjdGlvbi4gQ2FsbGVkIHdpdGggYSByZWZlcmVuY2UgdG8gdGhlIGlmcmFtZS5cclxuICogQHJldHVybiB7SFRNTCBFbGVtZW50fSBSZXR1cm5zIGEgcmVmZXJlbmNlIHRvIHRoZSBIVE1MIEVsZW1lbnQgY3JlYXRlZCBhbmRcclxuICogIGluamVjdGVkLlxyXG4gKiBAc2VlIGF0cm9wYS5pbmplY3QuZWxlbWVudFxyXG4gKiBAc2VlIDxhIGhyZWY9XCJodHRwOi8vd3d3LnczLm9yZy9TZWN1cml0eS93aWtpL1NhbWVfT3JpZ2luX1BvbGljeVwiPlxyXG4gKiBodHRwOi8vd3d3LnczLm9yZy9TZWN1cml0eS93aWtpL1NhbWVfT3JpZ2luX1BvbGljeTwvYT5cclxuICogQGV4YW1wbGVcclxuICogIGVsID0gYXRyb3BhLmluamVjdC5oaWRkZW5GcmFtZShcclxuICogICAgICAnaW5qZWN0SGlkZGVuRnJhbWUzJyxcclxuICogICAgICAnaHR0cDovL2xvY2FsaG9zdC8nLFxyXG4gKiAgICAgIG51bGwsXHJcbiAqICAgICAgZnVuY3Rpb24gKCkge1xyXG4gKiAgICAgICAgICBjb25zb2xlLmxvZygnaGV5IGxvb2sgYXQgdGhhdCwgdGhlIGZyYW1lIGlzIHJlYWR5IScpO1xyXG4gKiAgICAgIH0sXHJcbiAqICAgICAgbnVsbCxcclxuICogICAgICBudWxsXHJcbiAqICApO1xyXG4gKi9cclxuYXRyb3BhLmluamVjdC5oaWRkZW5GcmFtZSA9IGZ1bmN0aW9uIChcclxuICAgIGlkLCBzcmNVUkwsIGRvY3JlZiwgb25sb2FkSGFuZGxlciwgcGFyZW50Tm9kLCBjYWxsYmFja1xyXG4pIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgYXRyb3BhLnN1cHBvcnRDaGVjaygnaW5qZWN0Jyk7XHJcbiAgICBcclxuICAgIHJldHVybiBhdHJvcGEuaW5qZWN0LmVsZW1lbnQoXHJcbiAgICAgICAgJ2lmcmFtZScsXHJcbiAgICAgICAgZG9jcmVmLFxyXG4gICAgICAgIHBhcmVudE5vZCxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFwiaWRcIiA6IGlkLFxyXG4gICAgICAgICAgICBcInNyY1wiIDogc3JjVVJMLFxyXG4gICAgICAgICAgICBcIndpZHRoXCIgOiBcIjBweFwiLFxyXG4gICAgICAgICAgICBcImhlaWdodFwiIDogXCIwcHhcIixcclxuICAgICAgICAgICAgXCJib3JkZXJcIiA6IFwiMHB4XCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIG9ubG9hZEhhbmRsZXIsXHJcbiAgICAgICAgY2FsbGJhY2tcclxuICAgICk7XHJcbn07XHJcbi8qKlxyXG4gKiBTY3JpcHQgSW5qZWN0b3IuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEyMDkwOVxyXG4gKiBAcGFyYW0ge1N0cmluZ30gaWQgVGhlIGlkIG9mIHRoZSBlbGVtZW50IHRvIGJlIGluamVjdGVkLlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gc3JjVXJsIFRoZSBVUkwgd2hlcmUgdGhlIHNjcmlwdCBpcyBsb2NhdGVkLlxyXG4gKiBAcGFyYW0ge0hUTUwgRE9NIERvY3VtZW50fSBkb2NyZWYgT3B0aW9uYWwuIFRoZSBkb2N1bWVudCB0byBpbmplY3QgdGhlXHJcbiAqICBzY3JpcHQgaW50by4gRGVmYXVsdHMgdG8gZG9jdW1lbnQuXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIE9wdGlvbmFsLiBBIGZ1bmN0aW9uIHRvIGV4ZWN1dGUgb25jZSB0aGUgc2NyaXB0XHJcbiAqICBoYXMgbG9hZGVkLiBEZWZhdWx0cyB0byBmdW5jdGlvbiAoKSB7fTtcclxuICogQHJldHVybiB7SFRNTCBFbGVtZW50fSBSZXR1cm5zIGEgcmVmZXJlbmNlIHRvIHRoZSBIVE1MIEVsZW1lbnQgY3JlYXRlZCBhbmRcclxuICogIGluamVjdGVkLlxyXG4gKiBAc2VlIGF0cm9wYS5pbmplY3QuZWxlbWVudFxyXG4gKiBAc2VlIDxhIGhyZWY9XCJodHRwOi8vd3d3LnczLm9yZy9TZWN1cml0eS93aWtpL1NhbWVfT3JpZ2luX1BvbGljeVwiPlxyXG4gKiBodHRwOi8vd3d3LnczLm9yZy9TZWN1cml0eS93aWtpL1NhbWVfT3JpZ2luX1BvbGljeTwvYT5cclxuICogQGV4YW1wbGVcclxuICogIC8vIEdpdmVuIGEgc2NyaXB0IFwiZHVtbXkuanNcIiBsb2NhdGVkIGF0IFwiaHR0cDovL2xvY2FsaG9zdC9kdW1teS5qc1wiXHJcbiAqICAvLyB5b3UgY2FuIGZldGNoIHRoZSBzY3JpcHQgYW5kIGV4ZWN1dGUgZnVuY3Rpb25zIGZyb20gd2l0aGluIGl0XHJcbiAqICAvLyBhcyBzb29uIGFzIGl0IGhhcyBsb2FkZWQgaW50byB0aGUgcGFnZS5cclxuICogIFxyXG4gKiAgLy8gY29udGVudHMgb2YgXCJkdW1teS5qc1wiXHJcbiAqICBmdW5jdGlvbiBkdW1teSgpIHtcclxuICogICAgICByZXR1cm4gJ2R1bW15JztcclxuICogIH1cclxuICogIFxyXG4gKiAgLy8gaW5qZWN0aW5nIFwiZHVtbXkuanNcIiBpbnRvIGFueSBwYWdlLiBUaGUgc2NyaXB0IHRhZyBpc24ndCByZXN0cmljdGVkIGJ5XHJcbiAqICAvLyB0aGUgc2FtZSBvcmlnaW4gcG9saWN5LiBIb3N0IHlvdXIgc2NyaXB0IGFueXdoZXJlIGFuZCBpbmplY3QgaXQgdG8gYW55XHJcbiAqICAvLyBwYWdlIG9uIHRoZSBuZXQgdGhhdCB5b3Ugd2FudCB0by5cclxuICogIGVsID0gYXRyb3BhLmluamVjdC5zY3JpcHQoXHJcbiAqICAgICAgJ2luamVjdFNjcmlwdCcsXHJcbiAqICAgICAgJ2h0dHA6Ly9sb2NhbGhvc3QvJyxcclxuICogICAgICBkb2N1bWVudCxcclxuICogICAgICBmdW5jdGlvbiAoKSB7XHJcbiAqICAgICAgICAgIGNvbnNvbGUubG9nKGR1bW15KCkpO1xyXG4gKiAgICAgIH1cclxuICogICk7XHJcbiAqICAvLyB5b3UgbWF5IGFsc28gbG9hZCBzY3JpcHRzIGludG8gaWZyYW1lcyBieSByZXBsYWNpbmcgdGhlIHRoaXJkIHBhcmFtZXRlclxyXG4gKiAgLy8gd2l0aCBhIHJlZmVyZW5jZSB0byB0aGUgaWZyYW1lJ3MgZG9jdW1lbnQgb2JqZWN0LlxyXG4gKi9cclxuYXRyb3BhLmluamVjdC5zY3JpcHQgPSBmdW5jdGlvbiAoaWQsIHNyY1VSTCwgZG9jcmVmLCBjYWxsYmFjaykge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICBhdHJvcGEuc3VwcG9ydENoZWNrKCdpbmplY3QnKTtcclxuICAgIFxyXG4gICAgdmFyIGF0dHJpYnV0ZXMsXHJcbiAgICBlbGVtZW50VHlwZSxcclxuICAgIHBhcmVudE5vZCA9IG51bGwsXHJcbiAgICBvbmxvYWRIYW5kbGVyLFxyXG4gICAgZWw7XHJcbiAgICBhdHRyaWJ1dGVzID0ge1xyXG4gICAgICAgIFwiaWRcIiA6IGlkLFxyXG4gICAgICAgIFwidHlwZVwiIDogXCJ0ZXh0L2phdmFzY3JpcHRcIixcclxuICAgICAgICBcInNyY1wiIDogc3JjVVJMXHJcbiAgICB9O1xyXG4gICAgZWxlbWVudFR5cGUgPSAnc2NyaXB0JztcclxuICAgIG9ubG9hZEhhbmRsZXIgPSBjYWxsYmFjaztcclxuICAgIGVsID0gYXRyb3BhLmluamVjdC5lbGVtZW50KFxyXG4gICAgICAgIGVsZW1lbnRUeXBlLCBkb2NyZWYsIHBhcmVudE5vZCwgYXR0cmlidXRlcywgb25sb2FkSGFuZGxlcik7XHJcbiAgICByZXR1cm4gZWw7XHJcbn07XHJcblxyXG5cclxuXHJcblxyXG53aGlsZShhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMubGVuZ3RoID4gMCkge1xyXG4gICAgYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLnBvcCgpKCk7XHJcbn1cclxubW9kdWxlLmV4cG9ydHMgPSBhdHJvcGE7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9kb2NzL3ZzZG9jL09wZW5MYXllcnNBbGwuanNcIi8+XHJcbnZhciBhdHJvcGEgPSByZXF1aXJlKCdhdHJvcGEtaGVhZGVyJyk7XHJcbi8qanNsaW50XHJcbiAgICBpbmRlbnQ6IDQsXHJcbiAgICBtYXhlcnI6IDUwLFxyXG4gICAgd2hpdGU6IHRydWUsXHJcbiAgICBicm93c2VyOiB0cnVlLFxyXG4gICAgZGV2ZWw6IHRydWUsXHJcbiAgICBwbHVzcGx1czogdHJ1ZSxcclxuICAgIHJlZ2V4cDogdHJ1ZVxyXG4qL1xyXG4vKmdsb2JhbCBhdHJvcGEgKi9cclxuLy8gZW5kIGhlYWRlclxyXG5cclxuLyoqXHJcbiAqIENvbnRhaW5lciBmb3IgZnVuY3Rpb25zIHRoYXQgdGVzdCB0aGUgc3RhdGUgb2YgaW5wdXRzLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMjA5MDlcclxuICogQG5hbWVzcGFjZSBDb250YWluZXIgZm9yIGZ1bmN0aW9ucyB0aGF0IHRlc3QgdGhlIHN0YXRlIG9mIGlucHV0cy5cclxuICovXHJcbmF0cm9wYS5pbnF1aXJlID0ge307XHJcbi8qKlxyXG4gKiBDaGVja3Mgd2hldGhlciB0aGUgaW5wdXQgaXMgbnVsbC5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTIwOTA5XHJcbiAqIEBwYXJhbSB7TWl4ZWR9IHggQW55IGlucHV0IHRoYXQgbWF5IG9yIG1heSBub3QgYmUgbnVsbC5cclxuICogQHJldHVybnMge0Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiB4ID09PSBudWxsLlxyXG4gKi9cclxuYXRyb3BhLmlucXVpcmUuaXNOdWxsID0gZnVuY3Rpb24gKHgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgcmV0dXJuICh4ID09PSBudWxsKTtcclxufTtcclxuLyoqXHJcbiAqIENoZWNrcyB3aGV0aGVyIHRoZSBpbnB1dCBpcyBhbiBvYmplY3QuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEyMDkwOVxyXG4gKiBAcGFyYW0ge01peGVkfSB4IEFueSBpbnB1dCB0aGF0IG1heSBvciBtYXkgbm90IGJlIGFuIG9iamVjdC5cclxuICogQHJldHVybnMge0Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiB0eXBlb2YoeCkgPT09ICdvYmplY3QnLlxyXG4gKi9cclxuYXRyb3BhLmlucXVpcmUuaXNPYmplY3QgPSBmdW5jdGlvbiAoeCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICByZXR1cm4gKHR5cGVvZiB4ID09PSAnb2JqZWN0Jyk7XHJcbn07XHJcbi8qKlxyXG4gKiBDaGVja3Mgd2hldGhlciB0aGUgaW5wdXQgaXMgYm90aCBhbiBvYmplY3QgYW5kIG5vdCBudWxsLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMjA5MDlcclxuICogQHBhcmFtIHtNaXhlZH0geCBBbnkgaW5wdXQgdGhhdCBtYXkgb3IgbWF5IG5vdCBiZSBib3RoIGFuXHJcbiAqIG9iamVjdCBhbmQgbnVsbC5cclxuICogQHJldHVybnMge0Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiB4IGlzIGJvdGggYW4gb2JqZWN0IGFuZFxyXG4gKiBub3QgbnVsbC4gKG51bGwgaXMgYW4gb2JqZWN0KS5cclxuICovXHJcbmF0cm9wYS5pbnF1aXJlLmlzT2JqZWN0Tm90TnVsbCA9IGZ1bmN0aW9uICh4KSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHJldHVybiBhdHJvcGEuaW5xdWlyZS5pc09iamVjdCh4KSAmJiAoIWF0cm9wYS5pbnF1aXJlLmlzTnVsbCh4KSk7XHJcbn07XHJcbi8qKlxyXG4gKiBDaGVja3MgYW4gb2JqZWN0IGZvciB0aGUgZXhpc3RlbmNlIG9mIGEgcHJvcGVydHlcclxuICogcmVnYXJkbGVzcyBvZiB3aGV0aGVyIHRoZSBwcm9wZXJ0eSB3YXMgaW5oZXJpdGVkXHJcbiAqIG9yIG5vdC5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTIwOTA5XHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogQW4gb2JqZWN0IHdoaWNoIG1heSBvciBtYXkgbm90XHJcbiAqIGhhdmUgdGhlIHByb3BlcnR5IGlkZW50aWZpZWQgYnkgcHJvcC5cclxuICogQHBhcmFtIHtTdHJpbmd9IHByb3AgQSBzdHJpbmcgdmFsdWUgcmVwcmVzZW50aW5nIHRoZVxyXG4gKiBuYW1lIG9mIHRoZSBwcm9wZXJ0eS5cclxuICogQHJldHVybnMge0Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiBvYmoucHJvcCBleGlzdHMsXHJcbiAqIG90aGVyd2lzZSByZXR1cm5zIGZhbHNlLlxyXG4gKi9cclxuYXRyb3BhLmlucXVpcmUuaGFzUHJvcGVydHkgPSBmdW5jdGlvbiAob2JqLCBwcm9wKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIGlmIChhdHJvcGEuaW5xdWlyZS5pc09iamVjdE5vdE51bGwob2JqKSkge1xyXG4gICAgICAgIHJldHVybiAocHJvcCBpbiBvYmopO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59O1xyXG4vKipcclxuICogQ2hlY2tzIHdoZXRoZXIgdGhlIGlucHV0IGlzIGFuIGVtcHR5IHN0cmluZy5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwMTE4XHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHIgVGhlIHN0cmluZyB5b3Ugd2FudCB0byBrbm93IGFib3V0XHJcbiAqIEByZXR1cm5zIHtCb29sZWFufSBSZXR1cm5zIHRydWUgaWYgc3RyIGlzIGFuIGVtcHR5IHN0cmluZyxcclxuICogIG90aGVyd2lzZSByZXR1cm5zIGZhbHNlLlxyXG4gKi9cclxuYXRyb3BhLmlucXVpcmUuaXNFbXB0eVN0cmluZyA9IGZ1bmN0aW9uIChzdHIpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgdmFyIG91dCA9IGZhbHNlO1xyXG4gICAgaWYgKCcnID09PSBzdHIpIHtcclxuICAgICAgICBvdXQgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG91dDtcclxufTtcclxuXHJcblxyXG5cclxuXHJcbndoaWxlKGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5sZW5ndGggPiAwKSB7XHJcbiAgICBhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMucG9wKCkoKTtcclxufVxyXG5tb2R1bGUuZXhwb3J0cyA9IGF0cm9wYTtcclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2RvY3MvdnNkb2MvT3BlbkxheWVyc0FsbC5qc1wiLz5cclxudmFyIGF0cm9wYSA9IHJlcXVpcmUoJ2F0cm9wYS1oZWFkZXInKTtcclxuLypqc2xpbnRcclxuICAgIGluZGVudDogNCxcclxuICAgIG1heGVycjogNTAsXHJcbiAgICB3aGl0ZTogdHJ1ZSxcclxuICAgIGJyb3dzZXI6IHRydWUsXHJcbiAgICBkZXZlbDogdHJ1ZSxcclxuICAgIHBsdXNwbHVzOiB0cnVlLFxyXG4gICAgcmVnZXhwOiB0cnVlXHJcbiovXHJcbi8qZ2xvYmFsIGF0cm9wYSwgWFBhdGhSZXN1bHQgKi9cclxuLy8gZW5kIGhlYWRlclxyXG5cclxuLyoqXHJcbiAqIFV0aWxpdGllcyBmb3IgaGFuZGxpbmcgb2JqZWN0cy5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwMTIxXHJcbiAqIEBuYW1lc3BhY2UgVXRpbGl0aWVzIGZvciBoYW5kbGluZyBvYmplY3RzLlxyXG4gKi9cclxuYXRyb3BhLm9iamVjdHMgPSB7fTtcclxuLyoqXHJcbiAqIENvbnZlcnRzIGFuIG9iamVjdCBpbnRvIGFuIGFycmF5IG9mIGFycmF5cyB0byBtYWtlIGl0IHBvc3NpYmxlIHRvIHNvcnQgYW5kXHJcbiAqICBlbnVtZXJhdGUgcHJvcGVydGllcyByZWxpYWJseS5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwMTIwXHJcbiAqIEBtZXRob2RPZiBhdHJvcGEub2JqZWN0cy5cclxuICogQGV4YW1wbGVcclxuICogIHZhciB4ID0ge1xyXG4gKiAgICAgIFwic3R1ZmZpbmdcIiA6IFwiY290dG9uXCIsXHJcbiAqICAgICAgXCJub3NlXCIgOiBcImJ1dHRvblwiLFxyXG4gKiAgICAgIFwibmFtZVwiIDogXCJiZWFyXCJcclxuICogIH07XHJcbiAqICBjb25zb2xlLmxvZyggYXRyb3BhLm9iamVjdHMuY29udmVydE9iamVjdFRvQXJyYXkoeCkgKTtcclxuICogIC8vIGxvZ3MgW1tcInN0dWZmaW5nXCIsIFwiY290dG9uXCJdLCBbXCJub3NlXCIsIFwiYnV0dG9uXCJdLCBbXCJuYW1lXCIsIFwiYmVhclwiXV1cclxuICogQHBhcmFtIHtPYmplY3R9IG9iaiBBbiBvYmplY3QuXHJcbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBhbiBhcnJheSBvZiBhcnJheXMgd2hlcmUgZWFjaFxyXG4gKiAgbmVzdGVkIGFycmF5IHdpbGwgaGF2ZSB0aGUgb2JqZWN0J3Mga2V5IHN0b3JlZCBpbiBlbGVtZW50IDAgYW5kXHJcbiAqICB0aGUgdmFsdWUgc3RvcmVkIGluIGVsZW1lbnQgMS4gVGhlIHJlYXNvbiBhbiBhcnJheSBvZiBhcnJheXMgaXNcclxuICogIHJldHVybmVkIGlzIGJlY2F1c2UgSmF2YVNjcmlwdCBkb2VzIG5vdCBndWFyYW50ZWUgdGhlIG9yZGVyIG9mXHJcbiAqICBwcm9wZXJ0aWVzIG9uIGFuIG9iamVjdCBzbyB0aGVyZSBpcyBubyByZWxpemJsZSB3YXkgdG8gc29ydFxyXG4gKiAgYW4gb2JqZWN0cyBrZXlzIG9yIHZhbHVlcy5cclxuICogQHNlZSBcIlRoZSBtZWNoYW5pY3MgYW5kIG9yZGVyIG9mIGVudW1lcmF0aW5nIHRoZSBwcm9wZXJ0aWVzIFtvZiBhbiBvYmplY3RdXHJcbiAqICBpcyBub3Qgc3BlY2lmaWVkLlwiIFxyXG4gKiAgPGEgaHJlZj1cImh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi81LjEvI3NlYy0xMi42LjRcIj5cclxuICogIGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi81LjEvI3NlYy0xMi42LjQ8L2E+XHJcbiAqL1xyXG5hdHJvcGEub2JqZWN0cy5jb252ZXJ0T2JqZWN0VG9BcnJheSA9IGZ1bmN0aW9uIGNvbnZlcnRPYmplY3RUb0FycmF5KG9iaikge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICB2YXIgcHJvcCwgb3V0ID0gW107XHJcbiAgICBmb3IgKHByb3AgaW4gb2JqKSB7XHJcbiAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xyXG4gICAgICAgICAgICBvdXQucHVzaChbcHJvcCwgb2JqW3Byb3BdXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG91dDtcclxufTtcclxuLyoqXHJcbiAqIENvbnZlcnRzIGFuIG9iamVjdCBpbnRvIGFuIGFycmF5IG9mIGFycmF5cyBhbmQgYWxsb3dzIGZvciByZWxpYWJsZSBzb3J0aW5nXHJcbiAqICBhbmQgZW51bWVyYXRpb24uXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDEyMFxyXG4gKiBAZXhhbXBsZVxyXG4gKiAgdmFyIHdvcmRzQ291bnRlZCwgc29ydGVkQnlWYWx1ZXMsIHNvcnRlZEJ5UHJvcGVydGllcztcclxuICogIHdvcmRzQ291bnRlZCA9IHtcclxuICogICAgICBcImRvY3VtZW50M1wiIDogMTUwLFxyXG4gKiAgICAgIFwiZG9jdW1lbnQxXCIgOiAzMDAsXHJcbiAqICAgICAgXCJkb2N1bWVudDJcIiA6IDI1XHJcbiAqICB9O1xyXG4gKiAgLy8gc29ydGluZyBieSBwcm9wZXJ0eSB2YWx1ZSBhcyBudW1iZXJzXHJcbiAqICBmdW5jdGlvbiB2YWxTb3J0KGEsIGIpIHtcclxuICogICAgICByZXR1cm4gYVsxXSAtIGJbMV07XHJcbiAqICB9XHJcbiAqICAvLyBzb3J0aW5nIGJ5IHByb3BlcnR5IG5hbWVzIGFzIHN0cmluZ3NcclxuICogIGZ1bmN0aW9uIHByb3BTb3J0KGEsIGIpIHtcclxuICogICAgICByZXR1cm4gYVswXS5sb2NhbGVDb21wYXJlKGJbMF0pO1xyXG4gKiAgfVxyXG4gKiAgc29ydGVkQnlWYWx1ZXMgPSBhdHJvcGEub2JqZWN0cy5zb3J0KHdvcmRzQ291bnRlZCwgdmFsU29ydCk7XHJcbiAqICBzb3J0ZWRCeVByb3BlcnRpZXMgPSBhdHJvcGEub2JqZWN0cy5zb3J0KHdvcmRzQ291bnRlZCwgcHJvcFNvcnQpO1xyXG4gKiAgY29uc29sZS5sb2coJ3NvcnRlZCBieSB2YWx1ZTogJywgc29ydGVkQnlWYWx1ZXMpO1xyXG4gKiAgY29uc29sZS5sb2coJ3NvcnRlZCBieSBwcm9wZXJ0aWVzOiAnLCBzb3J0ZWRCeVByb3BlcnRpZXMpO1xyXG4gKiAgXHJcbiAqICAvLyBsb2dzOlxyXG4gKiAgLy8gc29ydGVkIGJ5IHZhbHVlOiBbXHJcbiAqICAvLyAgICAgW1wiZG9jdW1lbnQyXCIsIDI1XSxcclxuICogIC8vICAgICBbXCJkb2N1bWVudDNcIiwgMTUwXSxcclxuICogIC8vICAgICBbXCJkb2N1bWVudDFcIiwgMzAwXVxyXG4gKiAgLy8gXVxyXG4gKiAgLy8gc29ydGVkIGJ5IHByb3BlcnRpZXM6IFtcclxuICogIC8vICAgICBbXCJkb2N1bWVudDFcIiwgMzAwXSxcclxuICogIC8vICAgICBbXCJkb2N1bWVudDJcIiwgMjVdLFxyXG4gKiAgLy8gICAgIFtcImRvY3VtZW50M1wiLCAxNTBdXHJcbiAqICAvLyBdXHJcbiAqIEBleGFtcGxlXHJcbiAqICBMZXhpY29ncmFwaGljIHNvcnRpbmc6XHJcbiAqICBUaGlzICAgIFsxLCAyLCAxMCwgJ0EnLCAnYScsJ1onLCAneiddXHJcbiAqICBiZWNvbWVzIFsxLCAxMCwgMiwgXCJBXCIsIFwiWlwiLCBcImFcIiwgXCJ6XCJdXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogQW4gb2JqZWN0LlxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBzb3J0Rm4gT3B0aW9uYWwuIFRoZSBzb3J0aW5nIGZ1bmN0aW9uLiBUaGlzIGZ1bmN0aW9uIHdpbGxcclxuICogIGJlIGdpdmVuIHR3byBhcmd1bWVudHMuIENvbXBhcmUgdGhlIHR3byBhcmd1bWVudHMgYW5kIHJldHVybjpcclxuICogIDAgaWYgdGhleSBhcmUgZXF1YWwsIGdyZWF0ZXIgdGhhbiB6ZXJvIGlmIHRoZSBmaXJzdCBhcmd1bWVudFxyXG4gKiAgaXMgZ3JlYXRlciB0aGFuIHRoZSBzZWNvbmQsIG9yIGxlc3MgdGhhbiB6ZXJvIGlmIHRoZSBzZWNvbmRcclxuICogIGFyZ3VtZW50IGlzIGdyZWF0ZXIgdGhhbiB0aGUgZmlyc3QuIElmIHRoZSBzb3J0aW5nIGZ1bmN0aW9uXHJcbiAqICBpcyBub3QgZ2l2ZW4sIHRoZSBhcnJheSB3aWxsIGJlIHNvcnRlZCBsZXhvZ3JhcGhpY2FsbHkgYnlcclxuICogIGVhY2ggZWxlbWVudHMgPGNvZGU+dG9TdHJpbmc8L2NvZGU+IHZhbHVlLlxyXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYW4gYXJyYXkgb2YgYXJyYXlzIHdoZXJlIGVhY2hcclxuICogIG5lc3RlZCBhcnJheSB3aWxsIGhhdmUgdGhlIG9iamVjdHMga2V5IHN0b3JlZCBpbiBlbGVtZW50IDAgYW5kXHJcbiAqICB0aGUgdmFsdWUgc3RvcmVkIGluIGVsZW1lbnQgMS4gVGhlIHJlYXNvbiBhbiBhcnJheSBvZiBhcnJheXMgaXNcclxuICogIHJldHVybmVkIGlzIGJlY2F1c2UgSmF2YVNjcmlwdCBkb2VzIG5vdCBndWFyYW50ZWUgdGhlIG9yZGVyIG9mXHJcbiAqICBwcm9wZXJ0aWVzIG9uIGFuIG9iamVjdCBzbyB0aGVyZSBpcyBubyByZWxpemJsZSB3YXkgdG8gc29ydFxyXG4gKiAgYW4gb2JqZWN0cyBrZXlzIG9yIHZhbHVlcy5cclxuICogQHNlZSBhdHJvcGEub2JqZWN0cy5jb252ZXJ0T2JqZWN0VG9BcnJheVxyXG4gKiBAc2VlIDxhIGhyZWY9XCJodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNS4xLyNzZWMtMTUuNC40LjExXCI+XHJcbiAqICBodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNS4xLyNzZWMtMTUuNC40LjExPC9hPlxyXG4gKiBAc2VlIDxhIGhyZWY9XCJodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL0FycmF5L3NvcnRcIj5cclxuICogIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvQXJyYXkvc29ydDwvYT5cclxuICovXHJcbmF0cm9wYS5vYmplY3RzLnNvcnQgPSBmdW5jdGlvbiBzb3J0KG9iaiwgc29ydEZuKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHJldHVybiBhdHJvcGEub2JqZWN0cy5jb252ZXJ0T2JqZWN0VG9BcnJheShvYmopLnNvcnQoc29ydEZuKTtcclxufTtcclxuLyoqXHJcbiAqIFNvcnRzIGFuIG9iamVjdCBieSBpdHMgdmFsdWVzIHVzaW5nIGEgdXNlciBkZWZpbmVkIGFsZ29yaXRobS5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwMTIwXHJcbiAqIEBleGFtcGxlXHJcbiAqICB2YXIgd29yZHNDb3VudGVkO1xyXG4gKiAgd29yZHNDb3VudGVkID0ge1xyXG4gKiAgICAgIFwiZG9jdW1lbnQzXCIgOiAxNTAsXHJcbiAqICAgICAgXCJkb2N1bWVudDFcIiA6IDMwMCxcclxuICogICAgICBcImRvY3VtZW50MlwiIDogMjVcclxuICogIH07XHJcbiAqICAvLyBzb3J0aW5nIGJ5IHZhbHVlcyBhcyBudW1iZXJzXHJcbiAqICBmdW5jdGlvbiBzb3J0Rm4oYSwgYikge1xyXG4gKiAgICAgIHJldHVybiBhIC0gYjtcclxuICogIH1cclxuICogIGNvbnNvbGUubG9nKCBhdHJvcGEub2JqZWN0cy5zb3J0VmFsdWVzKHdvcmRzQ291bnRlZCwgc29ydEZuKSApO1xyXG4gKiAgLy8gbG9nczogW1tcImRvY3VtZW50MlwiLCAyNV0sIFtcImRvY3VtZW50M1wiLCAxNTBdLCBbXCJkb2N1bWVudDFcIiwgMzAwXV1cclxuICogQHBhcmFtIHtPYmplY3R9IG9iaiBBbiBvYmplY3QuXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHNvcnRGbiBUaGUgc29ydGluZyBmdW5jdGlvbi4gVGhpcyBmdW5jdGlvbiB3aWxsXHJcbiAqICBiZSBnaXZlbiB0d28gYXJndW1lbnRzLiBDb21wYXJlIHRoZSB0d28gYXJndW1lbnRzIGFuZCByZXR1cm46XHJcbiAqICAwIGlmIHRoZXkgYXJlIGVxdWFsLCBncmVhdGVyIHRoYW4gemVybyBpZiB0aGUgZmlyc3QgYXJndW1lbnRcclxuICogIGlzIGdyZWF0ZXIgdGhhbiB0aGUgc2Vjb25kLCBvciBsZXNzIHRoYW4gemVybyBpZiB0aGUgc2Vjb25kXHJcbiAqICBhcmd1bWVudCBpcyBncmVhdGVyIHRoYW4gdGhlIGZpcnN0LlxyXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYW4gYXJyYXkgb2YgYXJyYXlzIHdoZXJlIGVhY2hcclxuICogIG5lc3RlZCBhcnJheSB3aWxsIGhhdmUgdGhlIG9iamVjdHMga2V5IHN0b3JlZCBpbiBlbGVtZW50IDAgYW5kXHJcbiAqICB0aGUgdmFsdWUgc3RvcmVkIGluIGVsZW1lbnQgMS5cclxuICogQHNlZSBhdHJvcGEub2JqZWN0cy5zb3J0XHJcbiAqL1xyXG5hdHJvcGEub2JqZWN0cy5zb3J0VmFsdWVzID0gZnVuY3Rpb24gc29ydFZhbHVlcyhvYmosIHNvcnRGbikge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICB2YXIgdmFsU29ydCA9IGZ1bmN0aW9uKGEsIGIpIHtcclxuICAgICAgICByZXR1cm4gc29ydEZuKGFbMV0sIGJbMV0pO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBhdHJvcGEub2JqZWN0cy5zb3J0KG9iaiwgdmFsU29ydCk7XHJcbn07XHJcbi8qKlxyXG4gKiBTb3J0cyBhbiBvYmplY3QgYnkgaXRzIHByb3BlcnRpZXMgdXNpbmcgYSB1c2VyIGRlZmluZWQgYWxnb3JpdGhtLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzAxMjBcclxuICogQGV4YW1wbGVcclxuICogIHZhciB3b3Jkc0NvdW50ZWQ7XHJcbiAqICB3b3Jkc0NvdW50ZWQgPSB7XHJcbiAqICAgICAgXCJkb2N1bWVudDNcIiA6IDE1MCxcclxuICogICAgICBcImRvY3VtZW50MVwiIDogMzAwLFxyXG4gKiAgICAgIFwiZG9jdW1lbnQyXCIgOiAyNVxyXG4gKiAgfTtcclxuICogIC8vIHNvcnRpbmcgYnkgcHJvcGVydHkgbmFtZXMgYXMgc3RyaW5nc1xyXG4gKiAgZnVuY3Rpb24gc29ydEZuKGEsIGIpIHtcclxuICogICAgICByZXR1cm4gYS5sb2NhbGVDb21wYXJlKGIpO1xyXG4gKiAgfVxyXG4gKiAgY29uc29sZS5sb2coIGF0cm9wYS5vYmplY3RzLnNvcnRQcm9wZXJ0aWVzKHdvcmRzQ291bnRlZCwgc29ydEZuKSApO1xyXG4gKiAgLy8gbG9nczogW1tcImRvY3VtZW50MVwiLCAzMDBdLCBbXCJkb2N1bWVudDJcIiwgMjVdLCBbXCJkb2N1bWVudDNcIiwgMTUwXV1cclxuICogQHBhcmFtIHtPYmplY3R9IG9iaiBBbiBvYmplY3QuXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHNvcnRGbiBUaGUgc29ydGluZyBmdW5jdGlvbi4gVGhpcyBmdW5jdGlvbiB3aWxsXHJcbiAqICBiZSBnaXZlbiB0d28gYXJndW1lbnRzLiBDb21wYXJlIHRoZSB0d28gYXJndW1lbnRzIGFuZCByZXR1cm46XHJcbiAqICAwIGlmIHRoZXkgYXJlIGVxdWFsLCBncmVhdGVyIHRoYW4gemVybyBpZiB0aGUgZmlyc3QgYXJndW1lbnRcclxuICogIGlzIGdyZWF0ZXIgdGhhbiB0aGUgc2Vjb25kLCBvciBsZXNzIHRoYW4gemVybyBpZiB0aGUgc2Vjb25kXHJcbiAqICBhcmd1bWVudCBpcyBncmVhdGVyIHRoYW4gdGhlIGZpcnN0LlxyXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYW4gYXJyYXkgb2YgYXJyYXlzIHdoZXJlIGVhY2hcclxuICogIG5lc3RlZCBhcnJheSB3aWxsIGhhdmUgdGhlIG9iamVjdHMga2V5IHN0b3JlZCBpbiBlbGVtZW50IDAgYW5kXHJcbiAqICB0aGUgdmFsdWUgc3RvcmVkIGluIGVsZW1lbnQgMS5cclxuICogQHNlZSBhdHJvcGEub2JqZWN0cy5zb3J0XHJcbiAqL1xyXG5hdHJvcGEub2JqZWN0cy5zb3J0UHJvcGVydGllcyA9IGZ1bmN0aW9uIHNvcnRWYWx1ZXMob2JqLCBzb3J0Rm4pIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgdmFyIHByb3BTb3J0ID0gZnVuY3Rpb24oYSwgYikge1xyXG4gICAgICAgIHJldHVybiBzb3J0Rm4oYVswXSwgYlswXSk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIGF0cm9wYS5vYmplY3RzLnNvcnQob2JqLCBwcm9wU29ydCk7XHJcbn07XHJcbi8qKlxyXG4gKiBTb3J0cyBhbiBvYmplY3QgYnkgaXRzIHZhbHVlcyBudW1lcmljYWxseS5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwMTIwXHJcbiAqIEBleGFtcGxlXHJcbiAqICB2YXIgd29yZHNDb3VudGVkO1xyXG4gKiAgd29yZHNDb3VudGVkID0ge1xyXG4gKiAgICAgIFwiZG9jdW1lbnQzXCIgOiAxNTAsXHJcbiAqICAgICAgXCJkb2N1bWVudDFcIiA6IDMwMCxcclxuICogICAgICBcImRvY3VtZW50MlwiIDogMjVcclxuICogIH07XHJcbiAqICBjb25zb2xlLmxvZyggYXRyb3BhLm9iamVjdHMuc29ydFZhbHVlc051bWVyaWNhbGx5KHdvcmRzQ291bnRlZCkgKTtcclxuICogIC8vIGxvZ3MgW1tcImRvY3VtZW50MlwiLCAyNV0sIFtcImRvY3VtZW50M1wiLCAxNTBdLCBbXCJkb2N1bWVudDFcIiwgMzAwXV1cclxuICogQHBhcmFtIHtPYmplY3R9IG9iaiBBIHNpbXBsZSBvYmplY3Qgd2hlcmUgdGhlIHByb3BlcnRpZXNcclxuICogIGFsbCBoYXZlIG51bWVyaWMtaXNoIHZhbHVlcy5cclxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGFuIGFycmF5IG9mIGFycmF5cyB3aGVyZSBlYWNoXHJcbiAqICBuZXN0ZWQgYXJyYXkgd2lsbCBoYXZlIHRoZSBvYmplY3RzIGtleSBzdG9yZWQgaW4gZWxlbWVudCAwIGFuZFxyXG4gKiAgdGhlIHZhbHVlIHN0b3JlZCBpbiBlbGVtZW50IDEuXHJcbiAqIEBzZWUgYXRyb3BhLm9iamVjdHMuc29ydFxyXG4gKi9cclxuYXRyb3BhLm9iamVjdHMuc29ydFZhbHVlc051bWVyaWNhbGx5ID0gZnVuY3Rpb24gc29ydFZhbHVlc051bWVyaWNhbGx5KG9iaikge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICBmdW5jdGlvbiBzb3J0Rm4oYSwgYikge1xyXG4gICAgICAgIHJldHVybiAoYSAtIGIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGF0cm9wYS5vYmplY3RzLnNvcnRWYWx1ZXMob2JqLCBzb3J0Rm4pO1xyXG59O1xyXG4vKipcclxuICogVGhyb3dzIGFuIGVycm9yLCA8Y29kZT5TdHJpbmcucHJvdG90eXBlLmxvY2FsZUNvbXBhcmU8L2NvZGU+IGlzIG5vdCBcclxuICogIHN0YW5kYXJkaXplZC5cclxuICogXHJcbiAqICBZZXMsIGxvY2FsZUNvbXBhcmUgaXMgaW4gdGhlIHN0YW5kYXJkIGJ1dCwgYXQgdGhpcyB0aW1lIHRoZSBhY3R1YWxcclxuICogIGNvbXBhcmlzb24gaXMgaW1wbGVtZW50YXRpb24gZGVwZW5kYW50LiBUaGlzIG1lYW5zIHRoYXQgXCJhbHBoYWJldGljYWwgb3JkZXJcIlxyXG4gKiAgY2FuIGJlIGRpZmZlcmVudCBvbiBkaWZmZXJlbnQgcGxhdGZvcm1zLiBXaGF0IEkgZm91bmQgd2FzIHRoYXQgaW4gbm9kZSB0aGVcclxuICogIGFycmF5IG9mIDxjb2RlPlsnYScsJ1onLCdBJywneiddPC9jb2RlPiB3b3VsZCBiZSBzb3J0ZWQgdG9cclxuICogIDxjb2RlPlsnQScsJ1onLCdhJywnelwiXTwvY29kZT4sIHdoaWxlIG9uXHJcbiAqICBmaXJlZm94IGl0IHdvdWxkIGJlIHNvcnRlZCB0byA8Y29kZT5bJ2EnLCdBJywneicsJ1onXTwvY29kZT4uIFdobyBrbm93cyBpZlxyXG4gKiAgYW5vdGhlciBpbXBsZW1lbnRvciB3b3VsZCBzb3J0IGl0IDxjb2RlPlsnQScsJ2EnLCdaJywneiddPC9jb2RlPj9cclxuICogXHJcbiAqIEluIG9yZGVyIHRvIHByb3ZpZGUgYSByZWxpYWJsZSBpbXBsZW1lbnRhdGlvbiBJIHdvdWxkIGhhdmUgdG8gY3JlYXRlIG15IG93blxyXG4gKiAgaW1wbGVtZW50YXRpb24gb2YgPGNvZGU+U3RyaW5nLnByb3RvdHlwZS5sb2NhbGVDb21wYXJlPC9jb2RlPiBhbmQgdGhhdCdzXHJcbiAqICBqdXN0IHRvbyBtdWNoIHdvcmsgZm9yIG1lIHRvIGRvIGFsb25lLlxyXG4gKiBAdGhyb3dzIHtFcnJvcn0gXCJTdHJpbmcucHJvdG90eXBlLmxvY2FsZUNvbXBhcmUgaXMgbm90IHN0YW5kYXJkaXplZFwiXHJcbiAqL1xyXG5hdHJvcGEub2JqZWN0cy5zb3J0VmFsdWVzQWxwaGFiZXRpY2FsbHkgPSBmdW5jdGlvbiBzb3J0VmFsdWVzQWxwaGFiZXRpY2FsbHkoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHRocm93IG5ldyBFcnJvcihcIlN0cmluZy5wcm90b3R5cGUubG9jYWxlQ29tcGFyZSBpcyBub3Qgc3RhbmRhcmRpemVkXCIpO1xyXG59O1xyXG4vKipcclxuICogU29ydHMgYW4gb2JqZWN0IGJ5IGl0cyBwcm9wZXJ0aWVzIG51bWVyaWNhbGx5LlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzAxMjBcclxuICogQGV4YW1wbGVcclxuICogIHZhciB3b3Jkc0NvdW50ZWQ7XHJcbiAqICB3b3Jkc0NvdW50ZWQgPSB7XHJcbiAqICAgICAgXCIzXCIgOiBcIkRvY3VtZW50IEFcIixcclxuICogICAgICBcIjJcIiA6IFwiRG9jdW1lbnQgWlwiLFxyXG4gKiAgICAgIFwiMVwiIDogXCJEb2N1bWVudCBNXCJcclxuICogIH07XHJcbiAqICBjb25zb2xlLmxvZyggYXRyb3BhLm9iamVjdHMuc29ydFByb3BlcnRpZXNOdW1lcmljYWxseSh3b3Jkc0NvdW50ZWQpICk7XHJcbiAqICAvLyBsb2dzOiBbW1wiMVwiLCBcIkRvY3VtZW50IE1cIl0sIFtcIjJcIiwgXCJEb2N1bWVudCBaXCJdLCBbXCIzXCIsIFwiRG9jdW1lbnQgQVwiXV1cclxuICogQHBhcmFtIHtPYmplY3R9IG9iaiBBIHNpbXBsZSBvYmplY3Qgd2hlcmUgdGhlIHByb3BlcnRpZXNcclxuICogIGFsbCBoYXZlIG51bWVyaWMtaXNoIHZhbHVlcy5cclxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGFuIGFycmF5IG9mIGFycmF5cyB3aGVyZSBlYWNoXHJcbiAqICBuZXN0ZWQgYXJyYXkgd2lsbCBoYXZlIHRoZSBvYmplY3RzIGtleSBzdG9yZWQgaW4gZWxlbWVudCAwIGFuZFxyXG4gKiAgdGhlIHZhbHVlIHN0b3JlZCBpbiBlbGVtZW50IDEuXHJcbiAqIEBzZWUgYXRyb3BhLm9iamVjdHMuc29ydFxyXG4gKi9cclxuYXRyb3BhLm9iamVjdHMuc29ydFByb3BlcnRpZXNOdW1lcmljYWxseSA9IGZ1bmN0aW9uIHNvcnRQcm9wZXJ0aWVzTnVtZXJpY2FsbHkoXHJcbiAgICBvYmpcclxuKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIGZ1bmN0aW9uIHNvcnRGbihhLCBiKSB7XHJcbiAgICAgICAgcmV0dXJuIChhIC0gYik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXRyb3BhLm9iamVjdHMuc29ydFByb3BlcnRpZXMob2JqLCBzb3J0Rm4pO1xyXG59O1xyXG4vKipcclxuICogVGhyb3dzIGFuIGVycm9yLCA8Y29kZT5TdHJpbmcucHJvdG90eXBlLmxvY2FsZUNvbXBhcmU8L2NvZGU+IGlzIG5vdCBcclxuICogIHN0YW5kYXJkaXplZC5cclxuICogXHJcbiAqICBZZXMsIGxvY2FsZUNvbXBhcmUgaXMgaW4gdGhlIHN0YW5kYXJkIGJ1dCwgYXQgdGhpcyB0aW1lIHRoZSBhY3R1YWxcclxuICogIGNvbXBhcmlzb24gaXMgaW1wbGVtZW50YXRpb24gZGVwZW5kYW50LiBUaGlzIG1lYW5zIHRoYXQgXCJhbHBoYWJldGljYWwgb3JkZXJcIlxyXG4gKiAgY2FuIGJlIGRpZmZlcmVudCBvbiBkaWZmZXJlbnQgcGxhdGZvcm1zLiBXaGF0IEkgZm91bmQgd2FzIHRoYXQgaW4gbm9kZSB0aGVcclxuICogIGFycmF5IG9mIDxjb2RlPlsnYScsJ1onLCdBJywneiddPC9jb2RlPiB3b3VsZCBiZSBzb3J0ZWQgdG9cclxuICogIDxjb2RlPlsnQScsJ1onLCdhJywnelwiXTwvY29kZT4sIHdoaWxlIG9uXHJcbiAqICBmaXJlZm94IGl0IHdvdWxkIGJlIHNvcnRlZCB0byA8Y29kZT5bJ2EnLCdBJywneicsJ1onXTwvY29kZT4uIFdobyBrbm93cyBpZlxyXG4gKiAgYW5vdGhlciBpbXBsZW1lbnRvciB3b3VsZCBzb3J0IGl0IDxjb2RlPlsnQScsJ2EnLCdaJywneiddPC9jb2RlPj9cclxuICogXHJcbiAqIEluIG9yZGVyIHRvIHByb3ZpZGUgYSByZWxpYWJsZSBpbXBsZW1lbnRhdGlvbiBJIHdvdWxkIGhhdmUgdG8gY3JlYXRlIG15IG93blxyXG4gKiAgaW1wbGVtZW50YXRpb24gb2YgPGNvZGU+U3RyaW5nLnByb3RvdHlwZS5sb2NhbGVDb21wYXJlPC9jb2RlPiBhbmQgdGhhdCdzXHJcbiAqICBqdXN0IHRvbyBtdWNoIHdvcmsgZm9yIG1lIHRvIGRvIGFsb25lLlxyXG4gKiBAdGhyb3dzIHtFcnJvcn0gXCJTdHJpbmcucHJvdG90eXBlLmxvY2FsZUNvbXBhcmUgaXMgbm90IHN0YW5kYXJkaXplZFwiXHJcbiAqL1xyXG5hdHJvcGEub2JqZWN0cy5zb3J0UHJvcGVydGllc0FscGhhYmV0aWNhbGx5ID0gXHJcbmZ1bmN0aW9uIHNvcnRQcm9wZXJ0aWVzQWxwaGFiZXRpY2FsbHkob2JqKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHRocm93IG5ldyBFcnJvcihcIlN0cmluZy5wcm90b3R5cGUubG9jYWxlQ29tcGFyZSBpcyBub3Qgc3RhbmRhcmRpemVkXCIpO1xyXG59O1xyXG5cclxuXHJcblxyXG5cclxud2hpbGUoYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLmxlbmd0aCA+IDApIHtcclxuICAgIGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5wb3AoKSgpO1xyXG59XHJcbm1vZHVsZS5leHBvcnRzID0gYXRyb3BhO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vZG9jcy92c2RvYy9PcGVuTGF5ZXJzQWxsLmpzXCIvPlxyXG52YXIgYXRyb3BhID0gcmVxdWlyZSgnYXRyb3BhLWhlYWRlcicpO1xyXG4vKmpzbGludFxyXG4gICAgaW5kZW50OiA0LFxyXG4gICAgbWF4ZXJyOiA1MCxcclxuICAgIHdoaXRlOiB0cnVlLFxyXG4gICAgYnJvd3NlcjogdHJ1ZSxcclxuICAgIGRldmVsOiB0cnVlLFxyXG4gICAgcGx1c3BsdXM6IHRydWUsXHJcbiAgICByZWdleHA6IHRydWVcclxuKi9cclxuLypnbG9iYWwgYXRyb3BhICovXHJcbi8vIGVuZCBoZWFkZXJcclxuXHJcbi8qKlxyXG4gKiBQcm92aWRlcyByYW5kb20gc3RyaW5ncyBhbmQgbnVtYmVycy5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTIwOTA5XHJcbiAqIEBuYW1lc3BhY2UgUHJvdmlkZXMgcmFuZG9tIHN0cmluZ3MgYW5kIG51bWJlcnMuXHJcbiAqL1xyXG5hdHJvcGEucmFuZG9tID0ge307XHJcbi8qKlxyXG4gKiBHaXZlcyB5b3UgYSByYW5kb20gc3RyaW5nIHdob3NlIGxlbmd0aCBhbmQgY2hhcmFjdGVycyB5b3Ugc3BlY2lmeS5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTIwOTA5XHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBzdHJpbmdMZW5ndGggVGhpcyBpcyB0aGUgbGVuZ3RoIG9mIHRoZSBzdHJpbmcuXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBjaGFyYWN0ZXJDbGFzcyBPcHRpb25hbC4gTWF5IGJlIG9uZSBvZjpcclxuICogIG51bWVyaWMsIGNhcHMsIGxvd2VyLCBhbHBoYSwgYWxwaGFudW1lcmljLCBwdW5jdHVhdGlvbiwgdm93ZWwsIGNvbnNvbmFudFxyXG4gKiAgVGhpcyBpcyB0aGUgdHlwZSBvZiBjaGFyYWN0ZXJzIHlvdSB3YW50IHJldHVybmVkIHRvIHlvdS4gRGVmYXVsdHMgdG9cclxuICogIGFscGhhbnVtZXJpYy5cclxuICogQHJldHVybiB7U3RyaW5nfSBBIHJhbmRvbSBzdHJpbmcgb2Ygc3BlY2lmaWVkIGxlbmd0aCBhbmQgY29tcG9zaXRpb24uXHJcbiAqL1xyXG5hdHJvcGEucmFuZG9tLnN0cmluZyA9IGZ1bmN0aW9uIHJhbmRvbVN0cmluZyhzdHJpbmdMZW5ndGgsIGNoYXJhY3RlckNsYXNzKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcbiAgICB2YXIgbnVtZXJpYyxcclxuICAgIHZvd2VsLFxyXG4gICAgY29uc29uYW50LFxyXG4gICAgbG93ZXIsXHJcbiAgICBjYXBzLFxyXG4gICAgYWxwaGEsXHJcbiAgICBhbHBoYW51bWVyaWMsXHJcbiAgICBwdW5jdHVhdGlvbixcclxuICAgIGNoYXJzLFxyXG4gICAgc3RyaW5nX2xlbmd0aCxcclxuICAgIHJhbmRvbXN0cmluZyxcclxuICAgIGksXHJcbiAgICBjaGFyYWN0ZXI7XHJcbiAgICBcclxuICAgIG51bWVyaWMgPSAnMDEyMzQ1Njc4OSc7XHJcbiAgICB2b3dlbCA9ICdhZWlvdXknO1xyXG4gICAgY29uc29uYW50ID0gJ2JjZGZnaGprbG1ucHFyc3R2d3h6JztcclxuICAgIGxvd2VyID0gdm93ZWwgKyBjb25zb25hbnQ7XHJcbiAgICBjYXBzID0gbG93ZXIudG9VcHBlckNhc2UoKTtcclxuICAgIGFscGhhID0gY2FwcyArIGxvd2VyO1xyXG4gICAgYWxwaGFudW1lcmljID0gbnVtZXJpYyArIGNhcHMgKyBsb3dlcjtcclxuICAgIHB1bmN0dWF0aW9uID0gJy4/ISc7XHJcbiAgICByYW5kb21zdHJpbmcgPSAnJztcclxuICAgIHN3aXRjaCAoY2hhcmFjdGVyQ2xhc3MpIHtcclxuICAgIGNhc2UgJ251bWVyaWMnOlxyXG4gICAgICAgIGNoYXJzID0gbnVtZXJpYztcclxuICAgICAgICBicmVhaztcclxuICAgIGNhc2UgJ2NhcHMnOlxyXG4gICAgICAgIGNoYXJzID0gY2FwcztcclxuICAgICAgICBicmVhaztcclxuICAgIGNhc2UgJ2xvd2VyJzpcclxuICAgICAgICBjaGFycyA9IGxvd2VyO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAnYWxwaGEnOlxyXG4gICAgICAgIGNoYXJzID0gYWxwaGE7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICBjYXNlICdhbHBoYW51bWVyaWMnOlxyXG4gICAgICAgIGNoYXJzID0gYWxwaGFudW1lcmljO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAncHVuY3R1YXRpb24nOlxyXG4gICAgICAgIGNoYXJzID0gcHVuY3R1YXRpb247XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICBjYXNlICd2b3dlbCc6XHJcbiAgICAgICAgY2hhcnMgPSB2b3dlbDtcclxuICAgICAgICBicmVhaztcclxuICAgIGNhc2UgJ2NvbnNvbmFudCc6XHJcbiAgICAgICAgY2hhcnMgPSBjb25zb25hbnQ7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICAgIGNoYXJzID0gYWxwaGFudW1lcmljO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gICAgaWYgKHN0cmluZ0xlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgc3RyaW5nX2xlbmd0aCA9IDQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHN0cmluZ19sZW5ndGggPSBzdHJpbmdMZW5ndGg7XHJcbiAgICB9XHJcbiAgICBmb3IgKGkgPSAwOyBpIDwgc3RyaW5nX2xlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgY2hhcmFjdGVyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogY2hhcnMubGVuZ3RoKTtcclxuICAgICAgICByYW5kb21zdHJpbmcgKz0gY2hhcnNbY2hhcmFjdGVyXTtcclxuICAgIH1cclxuICAgIHJldHVybiByYW5kb21zdHJpbmc7XHJcbn07XHJcbi8qKlxyXG4gKiBHZW5lcmF0ZXMgYSByYW5kb20gbnVtYmVyIGJldHdlZW4gdGhlIHNwZWNpZmllZCBtaW4gYW5kIG1heCB2YWx1ZS5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTIwOTA5XHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBtaW4gVGhlIGxvd2VzdCBudW1iZXIgeW91IHdhbnQgcmV0dXJuZWRcclxuICogQHBhcmFtIHtOdW1iZXJ9IG1heCBUaGUgaGlnaGVzdCBudW1iZXIgeW91IHdhbnQgcmV0dXJuZWRcclxuICogQHJldHVybnMge051bWJlcn0gQSByYW5kb20gbnVtYmVyIHdpdGhpbiB0aGUgc3BlY2lmaWVkIHJhbmdlLlxyXG4gKi9cclxuYXRyb3BhLnJhbmRvbS5pbnRlZ2VyID0gZnVuY3Rpb24gcmFuZG9tSW50ZWdlcihtaW4sIG1heCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSArIG1pbik7XHJcbn07XHJcbi8qKlxyXG4gKiBHZXQgYSByYW5kb20gcHJvcGVydHkgbmFtZSBmcm9tIHRoZSBnaXZlbiBvYmplY3QuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEyMDkwOVxyXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIFRoZSBvYmplY3QgdG8gc2VsZWN0IGEgcmFuZG9tXHJcbiAqICBwcm9wZXJ0eSBuYW1lIGZyb20uXHJcbiAqIEByZXR1cm4ge1N0cmluZ30gQSByYW5kb20gcHJvcGVydHkgbmFtZSBmcm9tIHRoZVxyXG4gKiAgZ2l2ZW4gb2JqZWN0LlxyXG4gKi9cclxuYXRyb3BhLnJhbmRvbS5nZXRQcm9wZXJ0eU5hbWUgPSBmdW5jdGlvbiAob2JqKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHZhciBhcnI7XHJcbiAgICBhcnIgPSBPYmplY3Qua2V5cyhvYmopO1xyXG4gICAgcmV0dXJuIGFyclthdHJvcGEucmFuZG9tLmdldEFycmF5S2V5KGFycildO1xyXG59O1xyXG4vKipcclxuICogR2V0IGEgcmFuZG9tIGtleSBmcm9tIHRoZSBnaXZlbiBhcnJheS5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTIwOTA5XHJcbiAqIEBwYXJhbSB7QXJyYXl9IGFyciBUaGUgYXJyYXkgdG8gc2VsZWN0IGEgcmFuZG9tXHJcbiAqICBrZXkgZnJvbS4gVGhlIGtleXMgb2YgdGhlIGFycmF5IG11c3QgYmUgY29udGlndW91cy5cclxuICogQHJldHVybiB7TnVtYmVyfSBBIHJhbmRvbSBpbnRlZ2VyIGJldHdlZW4gMCBhbmRcclxuICogIDxjb2RlPmFyci5sZW5ndGg8L2NvZGU+XHJcbiAqL1xyXG5hdHJvcGEucmFuZG9tLmdldEFycmF5S2V5ID0gZnVuY3Rpb24gKGFycikge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYXJyLmxlbmd0aCk7XHJcbn07XHJcbi8qKlxyXG4gKiBHZXQgYSByYW5kb20gdmFsdWUgZnJvbSB0aGUgZ2l2ZW4gYXJyYXkuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEyMDkwOVxyXG4gKiBAcGFyYW0ge0FycmF5fSBhcnIgVGhlIGFycmF5IHRvIHNlbGVjdCBhIHJhbmRvbVxyXG4gKiAgdmFsdWUgZnJvbS4gVGhlIGtleXMgb2YgdGhlIGFycmF5IG11c3QgYmUgY29udGlndW91cy5cclxuICogQHJldHVybiB7TWl4ZWR9IEEgcmFuZG9tIHZhbHVlIGZyb20gdGhlIGdpdmVuIGFycmF5LlxyXG4gKi9cclxuYXRyb3BhLnJhbmRvbS5nZXRBcnJheVZhbHVlID0gZnVuY3Rpb24gKGFycikge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICByZXR1cm4gYXJyW2F0cm9wYS5yYW5kb20uZ2V0QXJyYXlLZXkoYXJyKV07XHJcbn07XHJcbi8qKlxyXG4gKiBSZW1vdmUgYSByYW5kb20gZWxlbWVudCBmcm9tIHRoZSBnaXZlbiBhcnJheS5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTIwOTA5XHJcbiAqIEBwYXJhbSB7QXJyYXl9IGFyciBUaGUgYXJyYXkgdG8gcmVtb3ZlIGEgcmFuZG9tXHJcbiAqICBlbGVtZW50IGZyb20uIFRoZSBrZXlzIG9mIHRoZSBhcnJheSBtdXN0IGJlIGNvbnRpZ3VvdXMuXHJcbiAqIEByZXR1cm4ge01peGVkfSBBIHJhbmRvbSB2YWx1ZSBmcm9tIHRoZSBnaXZlbiBhcnJheS5cclxuICovXHJcbmF0cm9wYS5yYW5kb20ucHVsbEFycmF5RWxlbWVudCA9IGZ1bmN0aW9uIChhcnIpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgdmFyIGssXHJcbiAgICBkO1xyXG4gICAgayA9IGF0cm9wYS5yYW5kb20uZ2V0QXJyYXlLZXkoYXJyKTtcclxuICAgIGQgPSBhcnJba107XHJcbiAgICBhcnIuc3BsaWNlKGssIDEpO1xyXG4gICAgcmV0dXJuIGQ7XHJcbn07XHJcbi8qKlxyXG4gKiBSZW1vdmUgYSByYW5kb20gcHJvcGVydHkgZnJvbSB0aGUgZ2l2ZW4gb2JqZWN0LlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMjA5MDlcclxuICogQHBhcmFtIHtPYmplY3R9IG9iaiBUaGUgb2JqZWN0IHRvIHJlbW92ZSBhIHJhbmRvbVxyXG4gKiAgcHJvcGVydHkgZnJvbS5cclxuICogQHJldHVybiB7TWl4ZWR9IEEgcmFuZG9tIHZhbHVlIGZyb20gdGhlIGdpdmVuIG9iamVjdC5cclxuICovXHJcbmF0cm9wYS5yYW5kb20ucHVsbFByb3BlcnR5ID0gZnVuY3Rpb24gKG9iaikge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICB2YXIgcE5hbWUsXHJcbiAgICBvYmpEYXRhO1xyXG4gICAgcE5hbWUgPSBhdHJvcGEucmFuZG9tLmdldFByb3BlcnR5TmFtZShvYmopO1xyXG4gICAgb2JqRGF0YSA9IG9ialtwTmFtZV07XHJcbiAgICBkZWxldGUgb2JqW3BOYW1lXTtcclxuICAgIHJldHVybiBvYmpEYXRhO1xyXG59O1xyXG5cclxuXHJcblxyXG5cclxud2hpbGUoYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLmxlbmd0aCA+IDApIHtcclxuICAgIGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5wb3AoKSgpO1xyXG59XHJcbm1vZHVsZS5leHBvcnRzID0gYXRyb3BhO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vZG9jcy92c2RvYy9PcGVuTGF5ZXJzQWxsLmpzXCIvPlxyXG52YXIgYXRyb3BhID0gcmVxdWlyZSgnYXRyb3BhLWhlYWRlcicpO1xyXG4vKmpzbGludFxyXG4gICAgaW5kZW50OiA0LFxyXG4gICAgbWF4ZXJyOiA1MCxcclxuICAgIHdoaXRlOiB0cnVlLFxyXG4gICAgYnJvd3NlcjogdHJ1ZSxcclxuICAgIGRldmVsOiB0cnVlLFxyXG4gICAgcGx1c3BsdXM6IHRydWUsXHJcbiAgICByZWdleHA6IHRydWVcclxuKi9cclxuLypnbG9iYWwgYXRyb3BhICovXHJcbi8vIGVuZCBoZWFkZXJcclxuXHJcbi8qKlxyXG4gKiBDb250YWluZXIgZm9yIHJlZ2V4IGZ1bmN0aW9ucy5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTIwOTA5XHJcbiAqIEBuYW1lc3BhY2UgQ29udGFpbmVyIGZvciByZWdleCBmdW5jdGlvbnMuXHJcbiAqL1xyXG5hdHJvcGEucmVnZXggPSB7fTtcclxuLyoqXHJcbiAqIFJlZ2V4IHBhdHRlcm5zLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQG5hbWVzcGFjZSBSZWdleCBwYXR0ZXJucy5cclxuICovXHJcbmF0cm9wYS5yZWdleC5wYXR0ZXJucyA9IHtcclxuICAgIC8qKiBmaW5kcyByZXBlYXRlZCB3b3JkcyBhbmQgcGhyYXNlcyAqL1xyXG4gICAgcmVwZWF0ZWRXb3JkcyA6IC8oXFxiLnszLH1cXGIpXFxzKihcXDEpL2csXHJcbiAgICAvKiogZmluZHMgcGFyYWdyYXBoIGJyZWFrcyAqL1xyXG4gICAgcGFyYWdyYXBoQnJlYWtzIDogLyhcXHJcXG5cXHJcXG58XFxuXFxufFxcclxccikvZyxcclxuICAgIC8qKiBmaW5kcyBsaW5lIGJyZWFrcyAqL1xyXG4gICAgbGluZUJyZWFrcyA6IC8oXFxyXFxufFxccnxcXG4pL2dcclxufTtcclxuLyoqXHJcbiAqIEFwcGVuZHMgY29tbW9uIHByZWZpeCwgc3VmZml4LCBhbmQgd29yZCBib3VuZGFyeSByZWdleCBzdHJpbmdzIHRvXHJcbiAqIHRoZSBzdXBwbGllZCB3b3JkLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzAxMTBcclxuICogQHBhcmFtIHtTdHJpbmd9IHdvcmQgVGhlIHdvcmQgdG8gYXBwZW5kIHByZWZpeCBhbmQgc3VmZml4IHRvXHJcbiAqIEBwYXJhbSB7SW50ZWdlcn0gdGhyZXNob2xkIFRoZSB3b3JkLmxlbmd0aCBhdCB3aGljaCBpdCBkb2VzIG5vdFxyXG4gKiBtYWtlIHNlbnNlIHRvIGFwcGVuZCBwcmVmaXggYW5kIHN1ZmZpeC4gRGVmYXVsdHMgdG8gMy5cclxuICogQHJldHVybnMge1N0cmluZ30gUmV0dXJucyB0aGUgc3VwcGxpZWQgd29yZCB3aXRoIHByZWZpeCwgc3VmZml4LFxyXG4gKiBhbmQgd29yZCBib3VuZGFyaWVzIGF0dGFjaGVkLiBJZiB0aGUgd29yZC5sZW5ndGggd2FzIG5vdCBncmVhdGVyXHJcbiAqIHRoYW4gdGhlIHRocmVzaG9sZCwgb25seSB3b3JkIGJvdW5kYXJpZXMgYXJlIGF0dGFjaGVkLiBUaGUgc3RyaW5nXHJcbiAqIHJlcHJlc2VudHMgYSBSZWdFeCB3aGljaCBzaG91bGQgcGljayBvdXQgbW9zdCBmb3JtcyBvZiByZWd1bGFyXHJcbiAqIHdvcmRzLlxyXG4gKi9cclxuYXRyb3BhLnJlZ2V4LmFwcGVuZFByZWZpeGVzQW5kU3VmZml4ZXMgPSBmdW5jdGlvbiAod29yZCwgdGhyZXNob2xkKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHZhciBwcmVmaXhlcyxcclxuICAgIHN1ZmZpeGVzO1xyXG4gICAgcHJlZml4ZXMgPSAnKHByZXx1bnxyZSk/JztcclxuICAgIHN1ZmZpeGVzID0gJyhpZmljYXRpb258JyArXHJcbiAgICAgICAgICAgICAgICAndGlvbmFsbHl8JyArXHJcbiAgICAgICAgICAgICAgICAnaWNhdGlvbnwnICtcclxuICAgICAgICAgICAgICAgICdpZmllZHxpc3RpY3xpbmVzc3wnICtcclxuICAgICAgICAgICAgICAgICdmYXJlfHRpb258YW5jZXxlbmNlfGxlc3N8YWxseXxhYmxlfG5lc3N8aXplZHxpc2VkfCcgK1xyXG4gICAgICAgICAgICAgICAgJ291c3xpZnl8aW5nfGl0eXxmdWx8YW50fGF0ZXxlc3R8aXNtfGl6bXxpc3R8JyArXHJcbiAgICAgICAgICAgICAgICAnaWN8YWx8ZWR8ZXJ8ZXR8bHl8cnN8aW58JyArXHJcbiAgICAgICAgICAgICAgICAneXxzfHJ8ZCk/JztcclxuICAgIFxyXG4gICAgdGhyZXNob2xkID0gdGhyZXNob2xkID09PSB1bmRlZmluZWQgPyAzIDogdGhyZXNob2xkO1xyXG4gICAgXHJcbiAgICBpZiAod29yZC5sZW5ndGggPiB0aHJlc2hvbGQpIHtcclxuICAgICAgICB3b3JkID0gJ1xcXFxiJyArIHByZWZpeGVzICsgd29yZCArIHN1ZmZpeGVzICsgJ1xcXFxiJztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgd29yZCA9ICdcXFxcYigpJyArIHdvcmQgKyAnKClcXFxcYic7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gd29yZDtcclxufTtcclxuXHJcblxyXG5cclxuXHJcbndoaWxlKGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5sZW5ndGggPiAwKSB7XHJcbiAgICBhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMucG9wKCkoKTtcclxufVxyXG5tb2R1bGUuZXhwb3J0cyA9IGF0cm9wYTtcclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2RvY3MvdnNkb2MvT3BlbkxheWVyc0FsbC5qc1wiLz5cbnZhciBhdHJvcGEgPSByZXF1aXJlKCdhdHJvcGEtaGVhZGVyJyk7XG4vKmpzbGludFxuICAgIGluZGVudDogNCxcbiAgICBtYXhlcnI6IDUwLFxuICAgIHdoaXRlOiB0cnVlLFxuICAgIGJyb3dzZXI6IHRydWUsXG4gICAgZGV2ZWw6IHRydWUsXG4gICAgcGx1c3BsdXM6IHRydWUsXG4gICAgcmVnZXhwOiB0cnVlXG4qL1xuLypnbG9iYWwgYXRyb3BhICovXG4vLyBlbmQgaGVhZGVyXG5cbmF0cm9wYS5yZXF1aXJlcyhcbiAgICAncmVtb3ZlTm9kZUJ5UmVmZXJlbmNlJyxcbiAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xuICAgICAgICBpZihkb2N1bWVudCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuKTtcblxuLyoqXG4gKiBSZW1vdmVzIERPTSBOb2Rlcy5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAdmVyc2lvbiAyMDEyMDkwOVxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge0RPTSBOb2RlfSBlbGVtZW50UmVmZXJlbmNlIEEgcmVmZXJlbmNlIHRvIHRoZSBET00gTm9kZSB5b3Ugd2FudFxuICogdG8gcmVtb3ZlLlxuICovXG5hdHJvcGEucmVtb3ZlTm9kZUJ5UmVmZXJlbmNlID0gZnVuY3Rpb24gKGVsZW1lbnRSZWZlcmVuY2UpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICBhdHJvcGEuc3VwcG9ydENoZWNrKCdyZW1vdmVOb2RlQnlSZWZlcmVuY2UnKTtcbiAgICBpZihlbGVtZW50UmVmZXJlbmNlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgZWxlbWVudFJlZmVyZW5jZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsZW1lbnRSZWZlcmVuY2UpO1xuICAgIH1cbn07XG5cblxuXG5cbndoaWxlKGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5sZW5ndGggPiAwKSB7XG4gICAgYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLnBvcCgpKCk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGF0cm9wYTtcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9kb2NzL3ZzZG9jL09wZW5MYXllcnNBbGwuanNcIi8+XG52YXIgYXRyb3BhID0gcmVxdWlyZSgnYXRyb3BhLWhlYWRlcicpO1xuLypqc2xpbnRcbiAgICBpbmRlbnQ6IDQsXG4gICAgbWF4ZXJyOiA1MCxcbiAgICB3aGl0ZTogdHJ1ZSxcbiAgICBicm93c2VyOiB0cnVlLFxuICAgIGRldmVsOiB0cnVlLFxuICAgIHBsdXNwbHVzOiB0cnVlLFxuICAgIHJlZ2V4cDogdHJ1ZVxuKi9cbi8qZ2xvYmFsIGF0cm9wYSAqL1xuLy8gZW5kIGhlYWRlclxuXG4vKipcbiAqIFNldCBkZWZhdWx0IHZhbHVlcyBmb3Igb3B0aW9uYWwgZnVuY3Rpb24gcGFyYW1ldGVycy5cbiAqIEBleGFtcGxlXG4gKiA8cHJlPlxuICogICAvLyBUbyBzZXQgYSBkZWZhdWx0IHZhbHVlIGZvciBhbiBvcHRpb25hbCBwYXJhbWV0ZXJcbiAqICAgZnVuY3Rpb24ob3B0aW9uYWxBcmcpIHtcbiAqICAgICAgIHZhciBkZWZhdWx0VmFsID0gJ2hlbGxvIHRoZXJlISc7XG4gKiAgICAgICBvcHRpb25hbEFyZyA9IGF0cm9wYS5zZXRBc09wdGlvbmFsQXJnKGRlZmF1bHRWYWwsIG9wdGlvbmFsQXJnKTtcbiAqICAgICAgIHJldHVybiBvcHRpb25hbEFyZztcbiAqICAgfVxuICogPC9wcmU+XG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQHZlcnNpb24gMjAxMjA5MDlcbiAqIEBwYXJhbSB7TWl4ZWR9IGRlZmF1bHRWYWwgVGhlIGRlZmF1bHQgdmFsdWUgdG8gc2V0LlxuICogQHBhcmFtIHtNaXhlZH0gb3B0aW9uYWxBcmcgQSByZWZlcmVuY2UgdG8gdGhlIG9wdGlvbmFsIGFyZ3VtZW50LlxuICogQHJldHVybnMge01peGVkfSBSZXR1cm5zIHRoZSBkZWZhdWx0IHZhbHVlIHN1cHBsaWVkIHdoZW4gdGhlIG9wdGlvbmFsXG4gKiBhcmd1bWVudCBpcyB1bmRlZmluZWQgb3IgbnVsbC4gT3RoZXJ3aXNlLCB0aGUgc3VwcGxpZWQgb3B0aW9uYWwgYXJndW1lbnRcbiAqIGlzIHJldHVybmVkLlxuICovXG5hdHJvcGEuc2V0QXNPcHRpb25hbEFyZyA9IGZ1bmN0aW9uIChkZWZhdWx0VmFsLCBvcHRpb25hbEFyZykge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIGlmIChvcHRpb25hbEFyZyA9PT0gdW5kZWZpbmVkIHx8IG9wdGlvbmFsQXJnID09PSBudWxsKSB7XG4gICAgICAgIG9wdGlvbmFsQXJnID0gZGVmYXVsdFZhbDtcbiAgICB9XG4gICAgcmV0dXJuIG9wdGlvbmFsQXJnO1xufTtcblxuXG5cblxud2hpbGUoYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLmxlbmd0aCA+IDApIHtcbiAgICBhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMucG9wKCkoKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gYXRyb3BhO1xuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL2RvY3MvdnNkb2MvT3BlbkxheWVyc0FsbC5qc1wiLz5cclxudmFyIGF0cm9wYSA9IHJlcXVpcmUoJ2F0cm9wYS1oZWFkZXInKTtcclxuYXRyb3BhLnJlZ2V4ID0gcmVxdWlyZSgnYXRyb3BhLXJlZ2V4JykucmVnZXg7XHJcbmF0cm9wYS5hcnJheXMgPSByZXF1aXJlKCdhdHJvcGEtYXJyYXlzJykuYXJyYXlzO1xyXG4vKmpzbGludFxyXG4gICAgaW5kZW50OiA0LFxyXG4gICAgbWF4ZXJyOiA1MCxcclxuICAgIHdoaXRlOiB0cnVlLFxyXG4gICAgYnJvd3NlcjogdHJ1ZSxcclxuICAgIGRldmVsOiB0cnVlLFxyXG4gICAgcGx1c3BsdXM6IHRydWUsXHJcbiAgICByZWdleHA6IHRydWVcclxuKi9cclxuLypnbG9iYWwgYXRyb3BhICovXHJcbi8vIGVuZCBoZWFkZXJcclxuXHJcbi8qKlxyXG4gKiBBIGZldyB1dGlsaXRpZXMgZm9yIG1hbmlwdWxhdGluZyBzdHJpbmdzLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQG5hbWVzcGFjZSBBIGZldyB1dGlsaXRpZXMgZm9yIG1hbmlwdWxhdGluZyBzdHJpbmdzLlxyXG4gKiBAcmVxdWlyZXMgYXRyb3BhLnJlZ2V4LnBhdHRlcm5zXHJcbiAqL1xyXG5hdHJvcGEuc3RyaW5nID0ge307XHJcbi8qKlxyXG4gKiBSZXBsYWNlcyByZXBlYXRlZCB3b3JkcyBhbmQgcGhyYXNlcyB3aXRoIGEgc2luZ2xlIHdvcmQgb3IgcGhyYXNlLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzA3MDFcclxuICogQHBhcmFtIHtTdHJpbmd9IHN0cmluZyBUaGUgc3RyaW5nIHRvIHJlbW92ZSByZXBlYXRlZCB3b3JkcyBmcm9tLlxyXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBSZXR1cm5zIHRoZSBnaXZlbiBzdHJpbmcgd2l0aCByZXBlYXRlZCB3b3JkcyBhbmRcclxuICogIHBocmFzZXMgcmVtb3ZlZC5cclxuICovXHJcbmF0cm9wYS5zdHJpbmcucmVtb3ZlUmVwZWF0ZWRXb3JkID0gZnVuY3Rpb24gcmVtb3ZlUmVwZWF0ZWRXb3JkIChzdHJpbmcpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKGF0cm9wYS5yZWdleC5wYXR0ZXJucy5yZXBlYXRlZFdvcmRzLCAnJDEnKTtcclxufTtcclxuLyoqXHJcbiAqIENyZWF0ZXMgcGFyYWdyYXBoIGJyZWFrcyBhdCBldmVyeSBvY2N1cnJlbmNlIG9mIHR3byBjb25zZWN1dGl2ZSBsaW5lIGJyZWFrcy5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwNzAxXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmcgVGhlIHN0cmluZyB0byBpbnNlcnQgcGFyYWdyYXBoIHRhZ3MgaW50by5cclxuICogQHJldHVybnMge1N0cmluZ30gUmV0dXJucyB0aGUgZ2l2ZW4gc3RyaW5nIHdpdGggcGFyYWdyYXBoIGJyZWFrcyBpbnNlcnRlZC5cclxuICovXHJcbmF0cm9wYS5zdHJpbmcubGluZUJyZWFrc1RvUGFyYWdyYXBoVGFncyA9IGZ1bmN0aW9uIGxpbmVCcmVha3NUb1BhcmFncmFwaFRhZ3MgKHN0cmluZykge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICB2YXIgb3V0ID0gc3RyaW5nLnJlcGxhY2UoYXRyb3BhLnJlZ2V4LnBhdHRlcm5zLnBhcmFncmFwaEJyZWFrcywgJzwvcD48cD4nKTtcclxuICAgIG91dCA9ICc8cD4nICsgb3V0LnRyaW0oKSArICc8L3A+JztcclxuICAgIG91dCA9IG91dC5yZXBsYWNlKC9cXHMrPFxcLyhwfGJyKT4vZywgJzwvJDE+Jyk7XHJcbiAgICByZXR1cm4gb3V0O1xyXG59O1xyXG4vKipcclxuICogQ3JlYXRlcyBicmVhayB0YWdzIGF0IGV2ZXJ5IGxpbmUgYnJlYWsuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDcwMVxyXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nIFRoZSBzdHJpbmcgdG8gaW5zZXJ0IGJyZWFrIHRhZ3MgaW50by5cclxuICogQHJldHVybnMge1N0cmluZ30gUmV0dXJucyB0aGUgZ2l2ZW4gc3RyaW5nIHdpdGggYnJlYWsgdGFncyBpbnNlcnRlZC5cclxuICovXHJcbmF0cm9wYS5zdHJpbmcubGluZUJyZWFrc1RvQnJlYWtUYWdzID0gZnVuY3Rpb24gbGluZUJyZWFrc1RvQnJlYWtUYWdzIChzdHJpbmcpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKGF0cm9wYS5yZWdleC5wYXR0ZXJucy5saW5lQnJlYWtzLCAnPGJyPicpO1xyXG59O1xyXG4vKipcclxuICogTm9ybWFsaXplcyBsaW5lIGJyZWFrcyB0byBgXFxuYC5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwNzAxXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmcgVGhlIHN0cmluZyB0byBub3JtYWxpemUuXHJcbiAqIEByZXR1cm5zIHtTdHJpbmd9IFJldHVybnMgdGhlIGdpdmVuIHN0cmluZyB3aXRoIG5vcm1hbGl6ZWQgbGluZSBicmVha3MuXHJcbiAqL1xyXG5hdHJvcGEuc3RyaW5nLm5vcm1hbGl6ZUVvbCA9IGZ1bmN0aW9uIG5vcm1hbGl6ZUVvbCAoc3RyaW5nKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHJldHVybiBzdHJpbmcucmVwbGFjZShhdHJvcGEucmVnZXgucGF0dGVybnMubGluZUJyZWFrcywgJ1xcbicpO1xyXG59O1xyXG4vKipcclxuICogQ29udmVydHMgdGhlIGZpcnN0IGNoYXJhY3RlciBvZiBhIGdpdmVuIHN0cmluZyB0b1xyXG4gKiB1cHBlcmNhc2UuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEyMDkwOVxyXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nIFRoZSBzdHJpbmcgZm9yIHdoaWNoIHlvdSB3YW50IHRoZVxyXG4gKiBmaXJzdCBsZXR0ZXIgdG8gYmUgaW4gdXBwZXIgY2FzZS5cclxuICogQHJldHVybnMge1N0cmluZ30gVGhlIGdpdmVuIHN0cmluZyB3aXRoIGl0J3MgZmlyc3QgbGV0dGVyIGNhcGl0YWxpemVkLlxyXG4gKi9cclxuYXRyb3BhLnN0cmluZy51Y0ZpcnN0ID0gZnVuY3Rpb24gdWNGaXJzdChzdHJpbmcpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgc3RyaW5nID0gc3RyaW5nLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3RyaW5nLnNsaWNlKDEpO1xyXG4gICAgcmV0dXJuIHN0cmluZztcclxufTtcclxuLyoqXHJcbiAqIENvbnZlcnRzIHRoZSBnaXZlbiBzdHJpbmcgdG8gY2FtZWwgY2FzZS5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwODIzXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmcgVGhlIHN0cmluZyB0byBjYW1lbGl6ZS5cclxuICogQHJldHVybnMge1N0cmluZ30gVGhlIGNhbWVsaXplZCBzdHJpbmcuXHJcbiAqIEBleGFtcGxlXHJcbiAqICBhdHJvcGEuc3RyaW5nLmNhbWVsaXplKCdnZXQgaXQgdG9nZXRoZXInKTtcclxuICogIC8vIHJldHVybnMgXCJnZXRJdFRvZ2V0aGVyXCJcclxuICovXHJcbmF0cm9wYS5zdHJpbmcuY2FtZWxpemUgPSBmdW5jdGlvbiBjYW1lbGl6ZSAoc3RyKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHZhciBhcnIsIG91dDtcclxuICAgIGFyciA9IHN0ci5zcGxpdCgnICcpO1xyXG4gICAgb3V0ID0gYXJyLnNoaWZ0KCk7XHJcbiAgICBhcnIgPSBhcnIubWFwKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgcmV0dXJuIGF0cm9wYS5zdHJpbmcudWNGaXJzdChpdGVtKTtcclxuICAgIH0pO1xyXG4gICAgb3V0ICs9IGFyci5qb2luKCcnKTtcclxuICAgIHJldHVybiBvdXQ7XHJcbn07XHJcbi8qKlxyXG4gKiBDb3VudHMgd29yZHMuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDMxM1xyXG4gKiBAcGFyYW0ge1N0cmluZ30gc29tZVRleHQgUGxhaW4gdGV4dC5cclxuICogQHJldHVybiB7TnVtYmVyfSBSZXR1cm5zIHRoZSBjb3VudCBvZiB3b3JkcyBpbiBzb21lVGV4dC5cclxuICovXHJcbmF0cm9wYS5zdHJpbmcuY291bnRXb3JkcyA9IGZ1bmN0aW9uIGNvdW50V29yZHMoc29tZVRleHQpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgdmFyIHdvcmRDb3VudCwgcmUsIGxlbiA9IDA7XHJcbiAgICBpZihzb21lVGV4dCAhPT0gdW5kZWZpbmVkICYmIHNvbWVUZXh0ICE9PSBudWxsKSB7XHJcbiAgICAgICAgc29tZVRleHQgPSBzb21lVGV4dC50cmltKCk7XHJcbiAgICAgICAgaWYoc29tZVRleHQgIT09ICcnKSB7XHJcbiAgICAgICAgICAgIHdvcmRDb3VudCA9IDA7XHJcbiAgICAgICAgICAgIHJlID0gL1xccysvZ2k7XHJcbiAgICAgICAgICAgIHdvcmRDb3VudCA9IHNvbWVUZXh0LnNwbGl0KHJlKTtcclxuICAgICAgICAgICAgbGVuID0gd29yZENvdW50Lmxlbmd0aDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbGVuO1xyXG59O1xyXG4vKipcclxuICogQ29udmVydHMgZW5kIG9mIGxpbmUgbWFya2VycyBpbnRvIHdoYXRldmVyIHlvdSB3YW50LiBcclxuICogQXV0b21hdGljYWxseSBkZXRlY3RzIGFueSBvZiBcXHJcXG4sIFxcbiwgb3IgXFxyIGFuZCBcclxuICogcmVwbGFjZXMgaXQgd2l0aCB0aGUgdXNlciBzcGVjaWZpZWQgRU9MIG1hcmtlci5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSB0ZXh0IFRoZSB0ZXh0IHlvdSB3YW50IHByb2Nlc3NlZC5cclxuICogQHBhcmFtIHtTdHJpbmd9IG5ld0VPTCBUaGUgcmVwbGFjZW1lbnQgZm9yIHRoZSBjdXJyZW50IEVPTCBtYXJrcy5cclxuICogQHJldHVybnMge1N0cmluZ30gUmV0dXJucyB0aGUgcHJvY2Vzc2VkIHRleHQuXHJcbiAqL1xyXG5hdHJvcGEuc3RyaW5nLmNvbnZlcnRFb2wgPSBmdW5jdGlvbiBjb252ZXJ0RU9MKHRleHQsIG5ld0VPTCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG4gICAgcmV0dXJuIHRleHQucmVwbGFjZShhdHJvcGEucmVnZXgucGF0dGVybnMubGluZUJyZWFrcywgbmV3RU9MKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZW1vdmVzIGEgcXVhbnRpdHkgb2YgbGVhZGluZyBzcGFjZXMgc3BlY2lmaWVkIGJ5IG9mZnNldC5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSB0ZXh0IFRoZSB0ZXh0IHRvIHByb2Nlc3MuXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBvZmZzZXQgVGhlIGFtb3VudCBvZiBzcGFjZXMgeW91IHdhbnQgcmVtb3ZlZCBcclxuICogZnJvbSB0aGUgYmVnaW5uaW5nIG9mIHRoZSB0ZXh0LlxyXG4gKiBAcmV0dXJucyBSZXR1cm5zIHRoZSBwcm9jZXNzZWQgdGV4dC5cclxuICovXHJcbmF0cm9wYS5zdHJpbmcub2Zmc2V0V2hpdGVTcGFjZSA9IGZ1bmN0aW9uIG9mZnNldFdoaXRlU3BhY2UodGV4dCwgb2Zmc2V0KSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcbiAgICB2YXIgcmVneDtcclxuICAgIHJlZ3ggPSBuZXcgUmVnRXhwKCdeIHsnICsgb2Zmc2V0ICsgJ30nKTtcclxuICAgIHRleHQgPSB0ZXh0LnJlcGxhY2UocmVneCwgJycpO1xyXG4gICAgcmV0dXJuIHRleHQ7XHJcbn07XHJcblxyXG4vKipcclxuICogQ29udmVydHMgYWxsIHRhYnMgaW4gbGVhZGluZyB3aGl0ZXNwYWNlIGludG8gZm91ciBzcGFjZXMuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAcGFyYW0ge1N0cmluZ30gdGV4dCBUaGUgdGV4dCB0byBwcm9jZXNzXHJcbiAqIEByZXR1cm5zIHtTdHJpbmd9IFJldHVybnMgdGhlIHByb2Nlc3NlZCB0ZXh0LlxyXG4gKi9cclxuYXRyb3BhLnN0cmluZy5ub3JtYWxpemVXaGl0ZVNwYWNlUHJlZml4ID0gZnVuY3Rpb24gbm9ybWFsaXplV2hpdGVTcGFjZVByZWZpeChcclxuICAgIHRleHRcclxuKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcbiAgICB2YXIgcHJlZml4ID0gdGV4dC5tYXRjaCgvXlxccyovKTtcclxuICAgIGlmKHByZWZpeCkge1xyXG4gICAgICAgIHByZWZpeCA9IHByZWZpeFswXTtcclxuICAgICAgICBwcmVmaXggPSBwcmVmaXgucmVwbGFjZSgvXFx0L2csICcgICAgJyk7XHJcbiAgICAgICAgdGV4dCA9IHRleHQucmVwbGFjZSgvXlxccyovLCBwcmVmaXgpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRleHQ7XHJcbn07XHJcblxyXG4vKipcclxuICogQ29udmVydHMgYWxsIHRhYnMgaW50byBmb3VyIHNwYWNlcy5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSB0ZXh0IFRoZSB0ZXh0IHRvIHByb2Nlc3NcclxuICogQHJldHVybnMge1N0cmluZ30gUmV0dXJucyB0aGUgcHJvY2Vzc2VkIHRleHQuXHJcbiAqL1xyXG5hdHJvcGEuc3RyaW5nLm5vcm1hbGl6ZVdoaXRlU3BhY2UgPSBmdW5jdGlvbiBub3JtYWxpemVXaGl0ZVNwYWNlKHRleHQpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuICAgIHRleHQgPSB0ZXh0LnJlcGxhY2UoL1xcdC9nLCAnICAgICcpO1xyXG4gICAgcmV0dXJuIHRleHQ7XHJcbn07XHJcblxyXG4vKipcclxuICogQ291bnRzIHRoZSBudW1iZXIgb2YgbGVhZGluZyBzcGFjZSBvciB0YWIgY2hhcmFjdGVycyBidXQgbm90IGJvdGguXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAcGFyYW0ge1N0cmluZ30gdGV4dCBUaGUgdGV4dCB0byBhbmFseXplLlxyXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBSZXR1cm5zIHRoZSBxdWFudGl0eSBvZiBsZWFkaW5nIHNwYWNlcyBvciB0YWJzLlxyXG4gKi9cclxuYXRyb3BhLnN0cmluZy5nZXRPZmZzZXQgPSBmdW5jdGlvbiBnZXRPZmZzZXQodGV4dCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG4gICAgdmFyIG9mZnNldCA9IDAsXHJcbiAgICAgICAgbGVhZGluZ0NoYXIgPSB0ZXh0LmNoYXJBdCgwKTtcclxuICAgICAgICBcclxuICAgIGlmKCBsZWFkaW5nQ2hhciA9PT0gJyAnIHx8IGxlYWRpbmdDaGFyID09PSAnXFx0Jykge1xyXG4gICAgICAgIHdoaWxlKHRleHQuY2hhckF0KG9mZnNldCkgPT09IGxlYWRpbmdDaGFyICYmIG9mZnNldCA8IHRleHQubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIG9mZnNldCsrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBvZmZzZXQ7XHJcbn07XHJcbi8qKlxyXG4gKiBCcmVha3MgYSBzdHJpbmcgaW50byBhbiBhcnJheSBvZiB3b3Jkcy5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwMTE4XHJcbiAqIEBwYXJhbSB7U3RyaW5nfSB0ZXh0IFRoZSB0ZXh0IHRvIGFuYWx5emUuXHJcbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBhbiBhcnJheSBvZiB0aGUgd29yZHMgaW5cclxuICogIHRoZSBnaXZlbiB0ZXh0LlxyXG4gKiBAcmVxdWlyZXMgYXRyb3BhLmFycmF5cy5yZW1vdmVFbXB0eUVsZW1lbnRzXHJcbiAqL1xyXG5hdHJvcGEuc3RyaW5nLmdldFdvcmRzID0gZnVuY3Rpb24gKHRleHQpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgdmFyIG91dCA9IFtdO1xyXG4gICAgZnVuY3Rpb24gaW52YWxpZENoYXJzKGVsZW1lbnQpIHtcclxuICAgICAgICB2YXIgbWF0Y2hlZCA9IC9eW1xcLSfigJlgXSskLy50ZXN0KGVsZW1lbnQpO1xyXG4gICAgICAgIC8vIGludmVydCB0aGUgcmVzdWx0IG9mIHRlc3QuIHRocm93IG91dCBlbGVtZW50cyB0aGF0IG1hdGNoLlxyXG4gICAgICAgIHJldHVybiAhbWF0Y2hlZDtcclxuICAgIH1cclxuICAgIG91dCA9IGF0cm9wYS5hcnJheXMucmVtb3ZlRW1wdHlFbGVtZW50cyhcclxuICAgICAgICB0ZXh0LnNwbGl0KC9bXkEtWmEtelxcLSfigJlgXSsvZ2kpXHJcbiAgICApO1xyXG4gICAgb3V0ID0gb3V0LmZpbHRlcihpbnZhbGlkQ2hhcnMpO1xyXG4gICAgcmV0dXJuIG91dDtcclxufTtcclxuLyoqXHJcbiAqIEVzY2FwZXMgPGNvZGU+Q0RBVEE8L2NvZGU+IHNlY3Rpb25zIGluIHRleHRcclxuICogIHNvIHRoYXQgdGhlIHRleHQgbWF5IGJlIGVtYmVkZGVkIGludG8gYSBcclxuICogIDxjb2RlPkNEQVRBPC9jb2RlPiBzZWN0aW9uLiBUaGlzIHNob3VsZCBiZSBydW5cclxuICogIG9uIGFueSB0ZXh0IHdoaWNoIG1heSBjb250YWluIHRoZSBzdHJpbmcgXHJcbiAqICA8Y29kZT5dXT48L2NvZGU+IHNpbmNlIHNhaWQgc3RyaW5nIHdpbGwgZWZmZWN0aXZlbHlcclxuICogIGVuZCB0aGUgPGNvZGU+Q0RBVEE8L2NvZGU+IHNlY3Rpb24gcHJlbWF0dXJlbHkuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDExOFxyXG4gKiBAcGFyYW0ge1N0cmluZ30gdGV4dCBUaGUgdGV4dCBjb250YWluaW5nIFxyXG4gKiAgPGNvZGU+Q0RBVEE8L2NvZGU+IHNlY3Rpb25zIHRvIGVzY2FwZS5cclxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGEgc3RyaW5nIHdpdGggZXNjYXBlZFxyXG4gKiAgPGNvZGU+Q0RBVEE8L2NvZGU+IHNlY3Rpb25zLlxyXG4gKiBAc2VlIDxhIGhyZWY9XCJodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0NEQVRBI05lc3RpbmdcIj5cclxuICogIGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvQ0RBVEEjTmVzdGluZzwvYT5cclxuICogQHNlZSA8YSBocmVmPVwiaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9OTgxNjhcIj5cclxuICogIGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTk4MTY4PC9hPlxyXG4gKi9cclxuYXRyb3BhLnN0cmluZy5lc2NhcGVDZGF0YSA9IGZ1bmN0aW9uIGVzY2FwZUNkYXRhKHRleHQpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgcmV0dXJuIFN0cmluZyh0ZXh0KS5yZXBsYWNlKC9cXF1cXF0+L2csICddXV1dPjwhW0NEQVRBWz4nKTtcclxufTtcclxuXHJcblxyXG5cclxuXHJcbndoaWxlKGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5sZW5ndGggPiAwKSB7XHJcbiAgICBhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMucG9wKCkoKTtcclxufVxyXG5tb2R1bGUuZXhwb3J0cyA9IGF0cm9wYTtcclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL2RvY3MvdnNkb2MvT3BlbkxheWVyc0FsbC5qc1wiLz5cclxudmFyIGF0cm9wYSA9IHJlcXVpcmUoJ2F0cm9wYS1oZWFkZXInKTtcclxuLypqc2xpbnRcclxuICAgIGluZGVudDogNCxcclxuICAgIG1heGVycjogNTAsXHJcbiAgICB3aGl0ZTogdHJ1ZSxcclxuICAgIGJyb3dzZXI6IHRydWUsXHJcbiAgICBkZXZlbDogdHJ1ZSxcclxuICAgIHBsdXNwbHVzOiB0cnVlLFxyXG4gICAgcmVnZXhwOiB0cnVlXHJcbiovXHJcbi8qZ2xvYmFsIGF0cm9wYSAqL1xyXG4vLyBlbmQgaGVhZGVyXHJcblxyXG4vKipcclxuICogVXRpbGl0aWVzIGZvciBoYW5kbGluZyB1cmxzLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzA3MTNcclxuICogQG5hbWVzcGFjZSBVdGlsaXRpZXMgZm9yIGhhbmRsaW5nIHVybHMuXHJcbiAqL1xyXG5hdHJvcGEudXJsID0ge307XHJcbi8qKlxyXG4gKiBHZXRzIHRoZSBmaWxlbmFtZSBwb3J0aW9uIG9mIGEgdXJsXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJsIFRoZSB1cmwuXHJcbiAqIEByZXR1cm5zIHtTdHJpbmd9IFJldHVybnMgZXZlcnl0aGluZyBhZnRlciB0aGUgbGFzdCAvIGluIHRoZSB1cmwuXHJcbiAqL1xyXG5hdHJvcGEudXJsLmdldEZpbGVuYW1lID0gZnVuY3Rpb24odXJsKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHZhciBmaWxlbmFtZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgZmlsZW5hbWUgPSBTdHJpbmcodXJsKS5yZXBsYWNlKC8uKjpcXC9cXC9bXlxcL10rLywgJycpLnJlcGxhY2UoL1sjfD9dLiokLywgJycpLm1hdGNoKC9bXlxcL10rJC8pWzBdO1xyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgIGZpbGVuYW1lID0gJyc7XHJcbiAgICB9XHJcbiAgICBpZih1cmwgPT09IGZpbGVuYW1lKSB7XHJcbiAgICAgICAgZmlsZW5hbWUgPSAnJztcclxuICAgIH1cclxuICAgIHJldHVybiBmaWxlbmFtZTtcclxufTtcclxuXHJcblxyXG5cclxuXHJcbndoaWxlKGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5sZW5ndGggPiAwKSB7XHJcbiAgICBhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMucG9wKCkoKTtcclxufVxyXG5tb2R1bGUuZXhwb3J0cyA9IGF0cm9wYTtcclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL2RvY3MvdnNkb2MvT3BlbkxheWVyc0FsbC5qc1wiLz5cbnZhciBhdHJvcGEgPSByZXF1aXJlKCdhdHJvcGEtaGVhZGVyJyk7XG5hdHJvcGEuc2V0QXNPcHRpb25hbEFyZyA9IHJlcXVpcmUoJ2F0cm9wYS1zZXRBc09wdGlvbmFsQXJnJykuc2V0QXNPcHRpb25hbEFyZztcbi8qanNsaW50XG4gICAgaW5kZW50OiA0LFxuICAgIG1heGVycjogNTAsXG4gICAgd2hpdGU6IHRydWUsXG4gICAgYnJvd3NlcjogdHJ1ZSxcbiAgICBkZXZlbDogdHJ1ZSxcbiAgICBwbHVzcGx1czogdHJ1ZSxcbiAgICByZWdleHA6IHRydWVcbiovXG4vKmdsb2JhbCBhdHJvcGEgKi9cbi8vIGVuZCBoZWFkZXJcblxuLyoqXG4gKiBQb2xsaW5nIGZ1bmN0aW9ucyBmb3IgcXVpY2sgYW5kIHNsb3BweSB3b3JrLlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAqIEB2ZXJzaW9uIDIwMTIwOTA5XG4gKiBAbmFtZXNwYWNlIFBvbGxpbmcgZnVuY3Rpb25zIGZvciBxdWljayBhbmQgc2xvcHB5IHdvcmsuXG4gKi9cbmF0cm9wYS53YWl0Rm9yID0ge307XG4vKipcbiAqIEdlbmVyaWMgV2FpdCBmb3IgdHJ1ZS5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAdmVyc2lvbiAyMDEyMDkwOVxuICogQHBhcmFtIHtGdW5jdGlvbn0gdGVzdEZuIEEgZnVuY3Rpb24gdG8gdGVsbCB3aGVuIHRoZSB3YWl0IGlzIG92ZXIuIE11c3RcbiAqICByZXR1cm4gdHJ1ZSBvbiBzdWNjZXNzLCBmYWxzZSBvbiBmYWlsdXJlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb25TdWNjZXNzQ2FsbGJhY2sgT3B0aW9uYWwuIFRoZSBmdW5jdGlvbiB0byBydW4gd2hlbiB0ZXN0Rm5cbiAqICByZXR1cm5zIHRydWUuIERlZmF1bHRzIHRvIDxjb2RlPmZ1bmN0aW9uICgpIHt9IDwvY29kZT5cbiAqIEBwYXJhbSB7ZnVuY3Rpb259IG9uTWF4UG9sbENhbGxiYWNrIE9wdGlvbmFsLiBUaGUgZnVuY3Rpb24gdG8gcnVuIHdoZW4gdGVzdEZuXG4gKiAgaGFzIGJlZW4gcnVuIG1heFBvbGwgdGltZXMgYW5kIHRoZSB3YWl0IGlzIGJlaW5nIGdpdmVuIHVwLlxuICogRGVmYXVsdHMgdG8gPGNvZGU+ZnVuY3Rpb24gKCkge308L2NvZGU+XG4gKiBAcGFyYW0ge0ludGVnZXJ9IHBvbGxJbnRlcnZhbCBPcHRpb25hbC4gVGhlIGFtb3VudCBvZiB0aW1lIGluIG1zIGJldHdlZW5cbiAqICBwb2xsaW5nIHRlc3RGbiB0byBzZWUgaWYgaXQgcmV0dXJucyB0cnVlLiBEZWZhdWx0cyB0byAyMDBtcy5cbiAqIEBwYXJhbSB7SW50ZWdlcn0gbWF4UG9sbCBPcHRpb25hbC4gVGhlIHF1YW50aXR5IG9mIHBvbGxzIGF0IHdoaWNoIGl0IG1ha2VzXG4gKiAgc2Vuc2UgdG8gZ2l2ZSB1cCB3YWl0aW5nLiBEZWZhdWx0cyB0byA1MC5cbiAqL1xuYXRyb3BhLndhaXRGb3IudGVzdCA9IGZ1bmN0aW9uIHRlc3QoXG4gICAgdGVzdEZuLCBvblN1Y2Nlc3NDYWxsYmFjaywgb25NYXhQb2xsQ2FsbGJhY2ssIHBvbGxJbnRlcnZhbCwgbWF4UG9sbFxuKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgcG9sbEludGVydmFsID0gYXRyb3BhLnNldEFzT3B0aW9uYWxBcmcoMjAwLCBwb2xsSW50ZXJ2YWwpO1xuICAgIG1heFBvbGwgPSBhdHJvcGEuc2V0QXNPcHRpb25hbEFyZyg1MCwgbWF4UG9sbCk7XG4gICAgb25NYXhQb2xsQ2FsbGJhY2sgPSBhdHJvcGEuc2V0QXNPcHRpb25hbEFyZyhhdHJvcGEubm9wLCBvbk1heFBvbGxDYWxsYmFjayk7XG4gICAgb25TdWNjZXNzQ2FsbGJhY2sgPSBhdHJvcGEuc2V0QXNPcHRpb25hbEFyZyhhdHJvcGEubm9wLCBvblN1Y2Nlc3NDYWxsYmFjayk7XG4gICAgdmFyIG15SW50O1xuICAgIHZhciBteUNvdW50ZXIgPSAwO1xuICAgIGZ1bmN0aW9uIHdhaXRGb3JUZXN0UmVjdXJzb3IgKCkge1xuICAgICAgICBteUNvdW50ZXIrKztcbiAgICAgICAgaWYgKHRlc3RGbigpKSB7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKG15SW50KTtcbiAgICAgICAgICAgIG9uU3VjY2Vzc0NhbGxiYWNrKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG15Q291bnRlciA9PT0gbWF4UG9sbCkge1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChteUludCk7XG4gICAgICAgICAgICBvbk1heFBvbGxDYWxsYmFjaygpO1xuICAgICAgICB9XG4gICAgfVxuICAgIG15SW50ID0gc2V0SW50ZXJ2YWwod2FpdEZvclRlc3RSZWN1cnNvciwgcG9sbEludGVydmFsKTtcbn07XG4vKipcbiAqIFdhaXQgZm9yIEVsZW1lbnRcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAdmVyc2lvbiAyMDEyMDkwOVxuICogQHBhcmFtIHtGdW5jdGlvbn0gdGVzdEZuIEEgZnVuY3Rpb24gd2hpY2ggcmV0dXJucyBhIHJlZmVyZW5jZSB0byBhbiBIVE1MXG4gKiAgRWxlbWVudC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IE9wdGlvbmFsLiBvblN1Y2Nlc3NDYWxsYmFja1xuICogQHBhcmFtIHtmdW5jdGlvbn0gT3B0aW9uYWwuIG9uTWF4UG9sbENhbGxiYWNrIFxuICogQHBhcmFtIHtJbnRlZ2VyfSBPcHRpb25hbC4gcG9sbEludGVydmFsXG4gKiBAcGFyYW0ge0ludGVnZXJ9IE9wdGlvbmFsLiBtYXhQb2xsXG4gKiBAc2VlIGF0cm9wYS53YWl0Rm9yLnRlc3QgZm9yIG1vcmUgaW5mb3JtYXRpb24gYW5kIGRlZmF1bHQgdmFsdWVzIGZvciB0aGVcbiAqICBvcHRpb25hbCBwYXJhbWV0ZXJzLlxuICovXG5hdHJvcGEud2FpdEZvci5lbGVtZW50ID0gZnVuY3Rpb24gKFxuICAgIHRlc3RGbiwgb25TdWNjZXNzQ2FsbGJhY2ssIG9uTWF4UG9sbENhbGxiYWNrLCBwb2xsSW50ZXJ2YWwsIG1heFBvbGxcbikge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW4gSFRNTCBET00gRG9jdW1lbnQgYW5kIHB1dHMgaXQgaW4gdGhlIGRvY3VtZW50XG4gICAgICogcXVldWUsIHRoZW4gZXhlY3V0ZXMgdGhlIGNhbGxiYWNrIGdpdmVuLlxuICAgICAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICAgICAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICAgICAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAgICAgKiBAdmVyc2lvbiAyMDEyMDkwOVxuICAgICAqIEBtZXRob2RPZiBhdHJvcGEud2FpdEZvci5lbGVtZW50LVxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHJldHVybnMge0Jvb2xlYW59IFJldHVybnMgdHJ1ZSBvciBmYWxzZSBkZXBlbmRpbmcgb24gd2hldGhlciB0aGUgb2JqZWN0XG4gICAgICogIGhhcyBhIHRhZyBuYW1lIHByb3BlcnR5LlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGVsZW1lbnRUZXN0ICgpIHtcbiAgICAgICAgcmV0dXJuIGF0cm9wYS5pbnF1aXJlLmhhc1Byb3BlcnR5KHRlc3RGbigpLCAndGFnTmFtZScpO1xuICAgIH1cbiAgICBhdHJvcGEud2FpdEZvci50ZXN0KFxuICAgICAgICBlbGVtZW50VGVzdCwgb25TdWNjZXNzQ2FsbGJhY2ssIG9uTWF4UG9sbENhbGxiYWNrLCBwb2xsSW50ZXJ2YWwsIG1heFBvbGxcbiAgICApO1xufTtcblxuXG5cblxud2hpbGUoYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLmxlbmd0aCA+IDApIHtcbiAgICBhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMucG9wKCkoKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gYXRyb3BhO1xuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL2RvY3MvdnNkb2MvT3BlbkxheWVyc0FsbC5qc1wiLz5cclxudmFyIGF0cm9wYSA9IHJlcXVpcmUoJ2F0cm9wYS1oZWFkZXInKTtcclxuYXRyb3BhLnJlZ2V4ID0gcmVxdWlyZSgnYXRyb3BhLXJlZ2V4JykucmVnZXg7XHJcbmF0cm9wYS5zdHJpbmcgPSByZXF1aXJlKCdhdHJvcGEtc3RyaW5nJykuc3RyaW5nO1xyXG5hdHJvcGEuc2V0QXNPcHRpb25hbEFyZyA9IHJlcXVpcmUoJ2F0cm9wYS1zZXRBc09wdGlvbmFsQXJnJykuc2V0QXNPcHRpb25hbEFyZztcclxuLypqc2xpbnRcclxuICAgIGluZGVudDogNCxcclxuICAgIG1heGVycjogNTAsXHJcbiAgICB3aGl0ZTogdHJ1ZSxcclxuICAgIGJyb3dzZXI6IHRydWUsXHJcbiAgICBkZXZlbDogdHJ1ZSxcclxuICAgIHBsdXNwbHVzOiB0cnVlLFxyXG4gICAgcmVnZXhwOiB0cnVlLFxyXG4gICAgdmFyczogdHJ1ZVxyXG4qL1xyXG4vKmdsb2JhbCBhdHJvcGEgKi9cclxuLy8gZW5kIGhlYWRlclxyXG5cclxuXHJcbihmdW5jdGlvbiAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIGF0cm9wYS5yZXF1aXJlcyhcclxuICAgICAgICAnd3RmJyxcclxuICAgICAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBzdXBwb3J0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgYXRyb3BhLnJlZ2V4LFxyXG4gICAgICAgICAgICAgICAgYXRyb3BhLnN0cmluZy5jb3VudFdvcmRzLFxyXG4gICAgICAgICAgICAgICAgYXRyb3BhLnNldEFzT3B0aW9uYWxBcmdcclxuICAgICAgICAgICAgXS5mb3JFYWNoKGZ1bmN0aW9uIChwcmVyZXF1aXNpdGUpIHtcclxuICAgICAgICAgICAgICAgIGlmKHByZXJlcXVpc2l0ZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3VwcG9ydGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gc3VwcG9ydGVkO1xyXG4gICAgICAgIH1cclxuICAgICk7XHJcbn0oKSk7XHJcblxyXG4oZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICBhdHJvcGEucmVxdWlyZXMoXHJcbiAgICAgICAgJ3d0Zkh0bWxFbGVtZW50JyxcclxuICAgICAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBzdXBwb3J0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgd2luZG93XHJcbiAgICAgICAgICAgIF0uZm9yRWFjaChmdW5jdGlvbiAocHJlcmVxdWlzaXRlKSB7XHJcbiAgICAgICAgICAgICAgICBpZihwcmVyZXF1aXNpdGUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN1cHBvcnRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIHN1cHBvcnRlZDtcclxuICAgICAgICB9XHJcbiAgICApO1xyXG59KCkpO1xyXG5cclxuLyoqXHJcbiAqIENvbnRhaW5lciBmb3IgYWxsIEdsb3Jpb3VzIFdURmlmaWVyIHJlbGF0ZWQgZnVuY3Rpb25zIGFuZCBzdWNoLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMjA5MDlcclxuICogQG5hbWVzcGFjZSBDb250YWluZXIgZm9yIGFsbCBHbG9yaW91cyBXVEZpZmllciByZWxhdGVkIGZ1bmN0aW9ucyBhbmQgc3VjaC5cclxuICogQHJlcXVpcmVzIGF0cm9wYS5yZWdleFxyXG4gKiBAcmVxdWlyZXMgYXRyb3BhLnd0Zi5kaWN0aW9uYXJ5XHJcbiAqL1xyXG5hdHJvcGEud3RmID0ge307XHJcbi8qKlxyXG4gKiBUaGUgR2xvcmlvdXMgV1RGaWZpY2F0aW9uIERpY3Rpb25hcnk6IFR1cm5pbmcgU2hpdFxyXG4gKiBJbnRvIFBvbGlzaGVkIFR1cmRzLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzAxMTBcclxuICovXHJcbmF0cm9wYS53dGYuZGljdGlvbmFyeSA9IHtcclxuICAgIFwibm92ZWx0eSBxdWlja2x5IHdlYXJzIG9mZlwiIDogXCJkdW1iIHNoaXQgZ2l0cyBvbGQgZmFzdFwiLFxyXG4gICAgXCJ0aGUgd2F5IGl0IGlzXCIgOiBcImhvdyBpdCBiZVwiLFxyXG4gICAgXCJwdXQgdXAgd2l0aFwiIDogXCJtYW5oYW5kbGVcIixcclxuICAgIFwieWV0XCIgOiBcImltbWVkaWF0ZWx5XCIsXHJcbiAgICBcImxvc2VcIiA6IFwic2hha2VcIixcclxuICAgIFwiZm9yIG5vIHJlYXNvblwiIDogXCJtYWlhY2FsbHlcIixcclxuICAgIFwiZ2l2ZW4gYSBjaG9pY2VcIiA6IFwiZXh0b3J0ZWRcIixcclxuICAgIFwibm90IHN0cm9uZyBlbm91Z2hcIiA6IFwiYWluJ3QgZ290IHRoZSBudXRzXCIsXHJcbiAgICBcIm5vdyBhdCBhbiBlbmRcIiA6IFwiYnJhbmQgc3BhbmtpbiBuZXdcIixcclxuICAgIFwiYmUgdG9nZXRoZXJcIiA6IFwibWFzaCB1cFwiLFxyXG4gICAgXCJhcG9jYWx5cHNlXCIgOiBcInBhcnR5IHRpbWVcIixcclxuICAgIFwibm90aGluZyBpcyBhc3N1cmVkXCIgOiBcIndlIGxpdmUgdG8gZGVsaXZlclwiLFxyXG4gICAgXCJ0byBubyBhdmFpbFwiIDogXCJmb3IgZ3JlYXQgZ29vZFwiLFxyXG4gICAgXCJ0b28gZ29vZCB0byBiZSB0cnVlXCIgOiBcImZ1Y2tpbmcgZmFudGFzdGljXCIsXHJcbiAgICBcImdyb3dpbmcgYXBhcnRcIiA6IFwiZnVja2luZyBvdGhlciBwZW9wbGVcIixcclxuICAgIFwicmVzdCBpbiBwZWFjZVwiIDogXCJwYXJ0eSBsaWtlIGl0J3MgMTk5OVwiLFxyXG4gICAgXCJiYWNrIHN0YWJcIiA6IFwicnVtcCBzaGFrZVwiLFxyXG4gICAgXCJiYWNrIHN0YWJiXCIgOiBcInJ1bXAgc2hha2VcIixcclxuICAgIFwibG9vayBpbnRvIHRoZWlyIGV5ZXNcIiA6IFwiZ2l2ZSB0aGVtIEFJRFNcIixcclxuICAgIFwibG9vayBpbnRvIGhlciBleWVzXCIgOiBcImdpdmUgaGVyIEFJRFNcIixcclxuICAgIFwibG9vayBpbnRvIGhpcyBleWVzXCIgOiBcImdpdmUgaGltIEFJRFNcIixcclxuICAgIFwiY2FuJ3QgbGl2ZSB3aXRob3V0XCIgOiBcInRvdWNoIG15c2VsZiBhYm91dFwiLFxyXG4gICAgXCJjYW4ndCBiZSB3aXRob3V0XCIgOiBcInRvdWNoIG15c2VsZiBhYm91dFwiLFxyXG4gICAgXCJjb3VsZCBuZXZlciBiZSB3aXRob3V0XCIgOiBcImNhbid0IHdvcmsgYW5hbCBiZWFkcyB3aXRob3V0XCIsXHJcbiAgICBcIm5vIG1hdHRlclwiIDogXCJpcnJlZ2FyZGxlc3Mgb2ZcIixcclxuICAgIFwid2lsbCBiZSB0aGVyZVwiIDogXCJzdGljayBsaWtlIHNoaXRcIixcclxuICAgIFwid2lsbCBhbHdheXMgYmUgdGhlcmVcIiA6IFwic3RpY2sgbGlrZSB3ZXQgc2hpdFwiLFxyXG4gICAgXCJob2xkaW5nIHRoZW0gY2xvc2UgdG9cIiA6IFwiaGFuZGN1ZmZpbmcgdGhlbSB0b1wiLFxyXG4gICAgXCJieSB5b3VyIHNpZGVcIiA6IFwib24geW91ciBhc3NcIixcclxuICAgIFwiYnkgbXkgc2lkZVwiIDogXCJvbiBteSBhc3NcIixcclxuICAgIFwiYnkgaGlzIHNpZGVcIiA6IFwib24gaGlzIGFzc1wiLFxyXG4gICAgXCJieSBoZXIgc2lkZVwiIDogXCJvbiBoZXIgYXNzXCIsXHJcbiAgICBcImxlYXZlIHlvdXIgc2lkZVwiIDogXCJnZXQgb2ZmIHlvdXIgYXNzXCIsXHJcbiAgICBcImxlYXZlIG15IHNpZGVcIiAgIDogXCJnZXQgb2ZmIG15IGFzc1wiLFxyXG4gICAgXCJsZWF2ZSBoaXMgc2lkZVwiICA6IFwiZ2V0IG9mZiBoaXMgYXNzXCIsXHJcbiAgICBcImxlYXZlIGhlciBzaWRlXCIgIDogXCJnZXQgb2ZmIGhlciBhc3NcIixcclxuICAgIFwiZG9lc24ndCBoYXBwZW4gb3ZlclwiIDogXCJjYXJ0d2hlZWxzIHN0cmFpZ2h0IGFjcm9zc1wiLFxyXG4gICAgXCJtZWFucyBtYW55IHRoaW5nc1wiIDogXCJpcyBiZXN0IGRlc2NyaWJlZCB3aXRoIGxpZXNcIixcclxuICAgIFwibGF5aW5nIGluIGJlZFwiIDogXCJ0YWtpbmcgYSBzaGl0XCIsXHJcbiAgICBcInByb21pc2VcIiA6IFwibGllXCIsXHJcbiAgICBcImxpYXJcIiA6IFwiZmliYmVyXCIsXHJcbiAgICBcImxpZVwiIDogXCJmaWJcIixcclxuICAgIFwibGllc1wiIDogXCJmaWJzXCIsXHJcbiAgICBcIndoYXQncyB0aGUgcG9pbnRcIiA6IFwidGhlIGZ1Y2tzIHRoaXMgbWVhblwiLFxyXG4gICAgXCJpdCBtdXN0IGJlIHRydWVcIiA6IFwiZm9yIHJlYWwgJ24nIHNoaXRcIixcclxuICAgIFwid2hhdCBwZW9wbGUgc2F5XCIgOiBcIm11dGhhcGh1a2thcyBiZSB0YWxraW5cIixcclxuICAgIFwiZXRjaGVkXCIgOiBcImdyb3VuZFwiLFxyXG4gICAgXCJkb24ndCBoYXZlIGEgY2x1ZVwiIDogXCJnb3Qgc2hpdCB0d2lzdGVkXCIsXHJcbiAgICBcInZpc2Npb3VzIGN5Y2xlXCIgOiBcImNsdXN0ZXJmdWNrXCIsXHJcbiAgICBcImRvbid0IG5lZWRcIiA6IFwiY291bGQgZ2l2ZSBhIGZ1Y2sgYWJvdXRcIixcclxuICAgIFwicmF2ZW5cIiA6IFwicGlnZW9uXCIsXHJcbiAgICBcInRvIGdldCBhd2F5XCIgOiBcInRvIGZ1Y2tpbmcgcnVuXCIsXHJcbiAgICBcInRvIGEgYmV0dGVyXCIgOiBcImZvciBzb21lIGdsaXR0ZXJlZFwiLFxyXG4gICAgXCJiZWF1dGlmdWwgZmFjZVwiIDogXCJlbm9ybW91cyB0aXRzXCIsXHJcbiAgICBcIm1pZ2h0IGFzIHdlbGxcIiA6IFwib2ggZnVjayBJIG91Z2h0dGFcIixcclxuICAgIFwidGhlIGZpcnN0IG1vbWVudFwiIDogXCJzdHJhaWdodGF3YXlcIixcclxuICAgIFwiYXMgd2VsbFwiIDogXCJhbHNvXCIsXHJcbiAgICBcInNvIGdvb2RcIiA6IFwibmVhdG9cIixcclxuICAgIFwiY291bGQgZG8gYW55dGhpbmdcIiA6IFwiaXMgZnVja2luZyBpbnNhbmVcIixcclxuICAgIFwic2V0IHRoZSBtb29kXCIgOiBcIndoaXAgaXQgb3V0XCIsXHJcbiAgICBcImJhYnkgaWZcIiA6IFwibG9vayBiaXRjaCxcIixcclxuICAgIFwidGhyb3VnaCB5b3VyIGhhaXJcIiA6IFwidXBzaWRlIHlvdXIgaGVhZFwiLFxyXG4gICAgXCJlbnRlcmVkIHRoZSBob3VzZSBvZlwiIDogXCJnb3QgdXAgaW4gdGhlIGJhcm4gZm9yXCIsXHJcbiAgICBcImFsd2F5cyBsb3ZlIHlvdSB0aGUgc2FtZVwiIDogXCJhbHdheXMgbG92ZSB5b3UgbGlrZSBteSBvdGhlciBzdWNrZXJzXCIsXHJcbiAgICBcImtpc3Npbmcgb3RoZXJcIiA6IFwiZ29pbmcgZG93biBvblwiLFxyXG4gICAgXCJuZXZlciB0aG91Z2h0IHlvdSB3b3VsZCBkbyB0aGF0XCIgOiBcImdvdCB0dXJuZWQgb3V0IGxpa2UgYSBkdW1iIGZ1Y2tcIixcclxuICAgIFwibGF5aW5nIG9uIHRoZSBmbG9vclwiIDogXCJiZWdnaW5nIGZvciBpdFwiLFxyXG4gICAgXCJmaXJzdCBsYWlkIGV5ZXMgb25cIiA6IFwiZmlyc3QgdHJpZWQgZ3JvcGluZ1wiLFxyXG4gICAgXCJtb3N0IHBlb3BsZSBjYW4gb25seVwiIDogXCJtb3N0IGZyZWFrcyBhbmQgZG9wZSBmaWVuZHNcIixcclxuICAgIFwieW91IHdlcmUgdGhlIG9uZVwiIDogXCJ5b3Ugd2VyZSBteSB0YXJnZXRcIixcclxuICAgIFwic3RhbmRpbmcgb3V0IGZyb20gdGhlIGNyb3dkXCIgOiBcIndvYmJsaW5nIGxpa2UgYW4gZWxlcGhhbnQgb24gYSBiaWN5Y2xlXCIsXHJcbiAgICBcInN0b29kIG91dCBmcm9tIHRoZSBjcm93ZFwiIDogXCJqaWdnbGVkIGxpa2UgYSBqZWxsbyBTYW50YVwiLFxyXG4gICAgXCJzdGFuZCBvdXQgZnJvbSB0aGUgY3Jvd2RcIiA6IFwibG9vayBsaWtlIGEgamFja2Fzc1wiLFxyXG4gICAgXCJzdGFuZHMgb3V0IGZyb20gdGhlIGNyb3dkXCIgOiBcInNtZWxscyBsaWtlIG9sZCBkaWNrXCIsXHJcbiAgICBcImkndmUgbmV2ZXIgZmVsdCB0aGlzIHdheVwiIDogXCJpJ3ZlIGRvbmUgdGhpc1wiLFxyXG4gICAgXCJ3aXRoIGV2ZXJ5IGZpYmVyXCIgOiBcImZyb20gcGl0aHkgcGl0c1wiLFxyXG4gICAgXCJ3YW5kZXJcIiA6IFwic3R1bWJsZVwiLFxyXG4gICAgXCJoYXVudFwiIDogXCJzdGFsa1wiLFxyXG4gICAgXCJtYXNrXCIgOiBcInRyYXNoYmFnXCIsXHJcbiAgICBcImRlbW9uaWMgYW5nZWxcIiA6IFwiYXNzIHBpcmF0ZVwiLFxyXG4gICAgXCJhbmdlbGljIGRlbW9uXCIgOiBcImFzcyBwaXJhdGVcIixcclxuICAgIFwiY3VubmluZ1wiIDogXCJkZXNwZXJhdGVcIixcclxuICAgIFwiZGFuZ2Vyb3VzXCIgOiBcImNvY2sgY2F0Y2hpbmdcIixcclxuICAgIFwiZGVtaS1nb2RcIiA6IFwicHVuayBiaXRjaFwiLFxyXG4gICAgXCJkZW1pZ29kXCIgOiBcInB1bmsgYml0Y2hcIixcclxuICAgIFwibW9ydGFsXCIgOiBcInF1ZWVyXCIsXHJcbiAgICBcImltbW9ydGFsXCIgOiBcIndoaW55XCIsXHJcbiAgICBcImJldHJheWFsXCIgOiBcImdhbWVcIixcclxuICAgIFwiYmV0cmF5XCIgOiBcInNjcmV3XCIsXHJcbiAgICBcImdhdmUgdXAgb25cIiA6IFwiZG9uJ3QgZ2l2ZSBhIGZ1Y2sgYWJvdXRcIixcclxuICAgIFwiZ2l2ZSB1cCBvblwiIDogXCJ3b24ndCBnaXZlIGEgZnVjayBhYm91dFwiLFxyXG4gICAgXCJnaXZlbiB1cCBvblwiIDogXCJkb24ndCBnaXZlIGEgZnVjayBhYm91dFwiLFxyXG4gICAgXCJnaXZpbmcgdXAgb25cIiA6IFwiYWluJ3QgZ2l2aW4gYSBmdWNrIGFib3V0XCIsXHJcbiAgICBcImNvZmZpblwiIDogXCJ0b2JvZ2FuXCIsXHJcbiAgICBcImJlYXV0aWZ1bFwiIDogXCJnYXVkeVwiLFxyXG4gICAgXCJ0aGUgYmVzdFwiIDogXCJ0aGUgYmFkZGVzdFwiLFxyXG4gICAgXCJzZWxmaXNoXCIgOiBcInRoaWV2aW5nXCIsXHJcbiAgICBcIndhbGtlZCBvdXRcIiA6IFwibmFycm93bHkgZXNjYXBlZFwiLFxyXG4gICAgXCJ3YWxrIG91dFwiIDogXCJuYXJyb3dseSBlc2NhcGVcIixcclxuICAgIFwid2Fsa2luZyBvdXRcIiA6IFwibmFycm93bHkgZXNjYXBpbmdcIixcclxuICAgIFwiZ290IGluIHlvdXIgd2F5XCIgOiBcImdvdCBhbGwgdXAgaW4geW91ciBzaGl0XCIsXHJcbiAgICBcInRyeVwiIDogXCJzaG9vdFwiLFxyXG4gICAgXCJ0aGUgcG9pbnQgb2Ygbm8gcmV0dXJuXCIgOiBcInRoZSBmYXQgZ2lybHMgYmVkcm9vb20gZG9vclwiLFxyXG4gICAgXCJvbmx5IHdhbnRlZFwiIDogXCJiZWdnZWQgZm9yXCIsXHJcbiAgICBcImd1ZXNzIGl0IGRvZXNuJ3QgbWF0dGVyXCIgOiBcImtub3cgdGhpcyBzaGl0IGlzIHBvaW50bGVzc1wiLFxyXG4gICAgXCJsb29rIGJhY2tcIiA6IFwibGljayB3aW5kb3dzXCIsXHJcbiAgICBcInBhdGhcIiA6IFwic2lkZXdhbGtcIixcclxuICAgIFwic2hpbmVcIiA6IFwiYmxpbmdcIixcclxuICAgIFwiaW4gdGhlIG1pZGRsZSBvZlwiIDogXCJhbGwgdXAgaW5cIixcclxuICAgIFwiZGVlcCBkb3duIGluc2lkZVwiIDogXCJpbiB0aGUgYm90dG9tIG9mIHRoZSB0YW5rXCIsXHJcbiAgICBcInBpZWNlIGJ5IHBpZWNlXCIgOiBcIm9uZSBoYW5kam9iIGF0IGEgdGltZVwiLFxyXG4gICAgXCJhdXJhXCIgOiBcInN0ZW5jaFwiLFxyXG4gICAgXCJjYW5kbGVcIiA6IFwiZ2xvd3N0aWNrXCIsXHJcbiAgICBcImZvciBoZXJcIiA6IFwidG8gdGhhdCBicm9hZHNcIixcclxuICAgIFwiZm9yIHNoZVwiIDogXCInY2F1c2UgdGhlIGN1bnRcIixcclxuICAgIFwiZm9yIGhlXCIgOiBcInRoaXMgZHVtYiBtb3RoZXIgZnVja2VyXCIsXHJcbiAgICBcImZvcmVzdFwiIDogXCJjYW1wZ3JvdW5kXCIsXHJcbiAgICBcImhhbmQgaW4gaGFuZFwiIDogXCJjb2NrIHRvIGphd1wiLFxyXG4gICAgXCJoYW5kIHRvIGhvbGRcIiA6IFwibnV0cyB0byBncmlwXCIsXHJcbiAgICBcImdpcmwgbWVldHMgYm95XCIgOiBcImhvcm55IGtpZHMgaG9vayB1cFwiLFxyXG4gICAgXCJib3kgbWVldHMgZ2lybFwiIDogXCJob3JueSBraWRzIGhvb2sgdXBcIixcclxuICAgIFwic3VubnlcIiA6IFwic3dlbHRlcmluZ1wiLFxyXG4gICAgXCJzbyBuZXJ2b3VzXCIgOiBcInNvIGZ1Y2tpbmcgZHJ1bmtcIixcclxuICAgIFwia2lzc1wiIDogXCJzbGFwXCIsXHJcbiAgICBcImZpbmdlcnRpcHNcIiA6IFwiY2hpY2tlbiBudWdnZXRzXCIsXHJcbiAgICBcInRlbGwgeW91IGknbSBmaW5lXCIgOiBcInNjcmVtIEknTSBGVUNLSU4gT0tcIixcclxuICAgIFwid3JpdGVcIiA6IFwic2NyYXdsXCIsXHJcbiAgICBcIndyaXR0ZW5cIiA6IFwic2NyYXdsZWRcIixcclxuICAgIFwid3JvdGVcIiA6IFwic2NyYXdsZWRcIixcclxuICAgIFwiZmlyc3Qgb2YgYWxsXCIgOiBcIm1tLWtheVwiLFxyXG4gICAgXCJicmluZyBmb3J0aFwiIDogXCJ3aGlwIG91dFwiLFxyXG4gICAgXCJpbnRvIHRoZSBsaWdodFwiIDogXCJvbiB0byB0aGUgbGlnaHRcIixcclxuICAgIFwidGhlIG9ubHkgb25lXCIgOiBcImZ1Y2tpbmcgc3R1cGlkXCIsXHJcbiAgICBcInRvIHRoZSBsaWdodFwiIDogXCJvdXQgaW4gcHVibGljXCIsXHJcbiAgICBcInRhbGtcIiA6IFwiY3Vzc1wiLFxyXG4gICAgXCJmdWxsIG9mIGxpZmVcIiA6IFwiZnVsbCBvZiBzaGl0XCIsXHJcbiAgICBcImNhbid0IGZpbmQgdGhlIHdvcmRzIHRvIHNheVwiIDogXCJjb3VsZCBibHVydCBvdXQgc29tZSBkdW1iIHNoaXRcIixcclxuICAgIFwiY29uc3VtZVwiIDogXCJzdWNrXCIsXHJcbiAgICBcImNvbnN1bWluZ1wiIDogXCJzdWNraW5nXCIsXHJcbiAgICBcInBpbGxvd1wiIDogXCJzdG9uZVwiLFxyXG4gICAgXCJhZHZpY2VcIiA6IFwiYnVsbHNoaXRcIixcclxuICAgIFwidW5pdmVyc2VcIiA6IFwidG9pbGV0IGJvd2xcIixcclxuICAgIFwiZWxkZXJcIiA6IFwib2xkIGZvbGtcIixcclxuICAgIFwibWFnaWNrXCIgOiBcImRlbHVzaW9uXCIsXHJcbiAgICBcIm1hZ2ljXCIgOiBcImhvcGVcIixcclxuICAgIFwiYXJjYW5lXCIgOiBcImZvb2xpc2hcIixcclxuICAgIFwic3BlYWsgb2ZcIiA6IFwidGFsayBhYm91dFwiLFxyXG4gICAgXCJzaGFsbFwiIDogXCJzaG91bGQtd2lsbFwiLFxyXG4gICAgXCJvYnRhaW5cIiA6IFwiZ2V0XCIsXHJcbiAgICBcImJhdHRsZVwiIDogXCJzcXVhYmJsZVwiLFxyXG4gICAgXCJtaWRuaWdodFwiIDogXCJkYXlicmVha1wiLFxyXG4gICAgXCJzb3Jyb3dcIiA6IFwid2hpbXBlclwiLFxyXG4gICAgXCJjcmltc29uXCIgOiBcImF6dXJlXCIsXHJcbiAgICBcImJsYWNrXCIgOiBcInllbGxvd1wiLFxyXG4gICAgXCJ3b24ndCBtYWtlIGl0IHRocm91Z2hcIiA6IFwiY291bGQgc2hpbW15IHBhc3RcIixcclxuICAgIFwibmlnaHRcIiA6IFwiYmVkdGltZVwiLFxyXG4gICAgXCJkYXlcIiA6IFwibW9ybmluZ1wiLFxyXG4gICAgXCJmcmFnaWxlXCIgOiBcInN0dXJkeVwiLFxyXG4gICAgXCJjcmFja1wiIDogXCJtZW5kXCIsXHJcbiAgICBcInNvbGl0dWRlXCIgOiBcImFtYmlhbmNlXCIsXHJcbiAgICBcInRvcm1lbnRcIiA6IFwidGlja2xlXCIsXHJcbiAgICBcImluY2FudGF0aW9uXCIgOiBcIm11Y2ggeWFtbWVyaW5nXCIsXHJcbiAgICBcImhvcGVsZXNzXCIgOiBcInBpdGlmdWxcIixcclxuICAgIFwiZGVwcmVzc2luZ1wiIDogXCJpbmVicmlhdGluZ1wiLFxyXG4gICAgXCJkZXByZXNzZWRcIiA6IFwiZHJ1bmtcIixcclxuICAgIFwiZGVwcmVzc2lvblwiIDogXCJzbyBtdWNoIGJvb3plXCIsXHJcbiAgICBcInNhZGRlbmVkXCIgOiBcIm1hZGUgZmxhY2NpZFwiLFxyXG4gICAgXCJzYWRuZXNzXCIgOiBcImltcG90ZW5jZVwiLFxyXG4gICAgXCJuZXZlcmVuZGluZ1wiIDogXCJuZXZlciBlbmRpbmdcIixcclxuICAgIFwibmV2ZXIgZW5kaW5nXCIgOiBcInJlbGVudGxlc3NcIixcclxuICAgIFwibmV2ZXIgZ29pbmdcIiA6IFwiZnVja2VkIGZvciB0cnlpbmdcIixcclxuICAgIFwiY2hhbmdlIG9uZSB0aGluZ1wiIDogXCJmdWNrIHNvbWUnbiB1cFwiLFxyXG4gICAgXCJuZXZlciBlbmRcIiA6IFwiZHJhZyBvblwiLFxyXG4gICAgXCJ3aWxsIG5vdCBoZWFsXCIgOiBcImZlc3RlcnNcIixcclxuICAgIFwib3V0d2FyZCBhcHBlYXJhbmNlXCIgOiBcImZhY2FkZVwiLFxyXG4gICAgXCJlbW9cIiA6IFwiY2xvc2V0IGhvbW9cIixcclxuICAgIFwiYmxhY2tlbmVkIHdhbGxzXCIgOiBcImZpbHRoeSByb29tc1wiLFxyXG4gICAgXCJmYXJld2VsbFwiIDogXCJhZGlvc1wiLFxyXG4gICAgXCJtZWV0IGFnYWluXCIgOiBcImhhdmUgYW5vdGhlciBnby1yb3VuZFwiLFxyXG4gICAgXCJzYWRkXCIgOiBcImZsYWNjaWRcIixcclxuICAgIFwic2FkXCIgOiBcImltcG90ZW50XCIsXHJcbiAgICBcImFtaWRzdFwiIDogXCJhbGwgdXAgaW5cIixcclxuICAgIFwibWlkc3RcIiA6IFwicGFudHNcIixcclxuICAgIFwia25vd2xlZGdlXCIgOiBcInRyaXZpYVwiLFxyXG4gICAgXCJrbm93blwiIDogXCJnb3RcIixcclxuICAgIFwia25vd1wiIDogXCJnZXRcIixcclxuICAgIFwia25ld1wiIDogXCJnb3RcIixcclxuICAgIFwicGFzc2lvbmF0ZVwiIDogXCJkZWxpcmlvdXNcIixcclxuICAgIFwicGFzc2lvblwiIDogXCJkZWxpcml1bVwiLFxyXG4gICAgXCJvJ1wiIDogXCJ1aFwiLFxyXG4gICAgXCJvXCIgOiBcInVoXCIsXHJcbiAgICBcImZhbmdcIiA6IFwiZGVudHVyZVwiLFxyXG4gICAgXCJjdXJzZVwiIDogXCJzdGFpblwiLFxyXG4gICAgXCJsb3ZlXCIgOiBcImNvbmZ1c2VcIixcclxuICAgIFwidmFtcGlyaWNcIiA6IFwicGVkb3BoaWxpY1wiLFxyXG4gICAgXCJ2YW1weXJlXCIgOiBcInBlZG9waHlsZVwiLFxyXG4gICAgXCJ2YW1waXJlXCIgOiBcInBlZG9waGlsZVwiLFxyXG4gICAgXCJwcm9ibGVtXCIgOiBcInVzZWxlc3MgY29uY2VyblwiLFxyXG4gICAgXCJmZWVsXCIgOiBcImZvbmRsZVwiLFxyXG4gICAgXCJ3b2VcIiA6IFwiY2hsYW15ZGlhXCIsXHJcbiAgICBcImVtcHR5XCIgOiBcImJsb2F0ZWRcIixcclxuICAgIFwiaGF0cmVkXCIgOiBcIm9kaXVtXCIsXHJcbiAgICBcImhhdGVcIiA6IFwiZGlzbGlrZVwiLFxyXG4gICAgXCJzY2FycmVkXCIgOiBcInN0cmlhdGVkXCIsXHJcbiAgICBcInNjYXJzXCIgOiBcInN0cmlhZVwiLFxyXG4gICAgXCJzY2FyZVwiIDogXCJ0aWNrbGVcIixcclxuICAgIFwic2NhcnlcIiA6IFwidGlja2x5XCIsXHJcbiAgICBcInNjYXJcIiA6IFwic3RyaWFcIixcclxuICAgIFwid291bmRcIiA6IFwib3VjaGllXCIsXHJcbiAgICBcInNsaXRcIiA6IFwiY3JldmljZVwiLFxyXG4gICAgXCJzbGljZVwiIDogXCJwZXRcIixcclxuICAgIFwidHdhc1wiIDogXCJpdCB3YXNcIixcclxuICAgIFwiYmlnIGJyb3RoZXJcIiA6IFwibXkgcGFyYW5vaWFcIixcclxuICAgIFwiZXRlcm5pdHlcIiA6IFwiYXdoaWxlXCIsXHJcbiAgICBcImV0ZXJuYWxseVwiIDogXCJmb3IgYSBiaXRcIixcclxuICAgIFwiZXRlcm5hbFwiIDogXCJpbWFnaW5lZFwiLFxyXG4gICAgXCJwcm9waGV0XCIgOiBcImluc29tbmlhY1wiLFxyXG4gICAgXCJwcm9waGVjaWVzXCIgOiBcIndpdmVzIHRhbGVzXCIsXHJcbiAgICBcInByb3BoZWN5XCIgOiBcIndpdmVzIHRhbGVcIixcclxuICAgIFwic29sZGllclwiIDogXCJtYW5pYWNcIixcclxuICAgIFwibWlsaXRpYVwiIDogXCJnYW5nXCIsXHJcbiAgICBcIm1pbGl0YXJ5XCIgOiBcImdhbmdzdGVyXCIsXHJcbiAgICBcIm1pbGl0YW50XCIgOiBcIm1hbmlhY2FsXCIsXHJcbiAgICBcImdvZGRlc3NcIiA6IFwiS3lsZWUgU3RydXR0XCIsXHJcbiAgICBcImhpZ2hlciBwb3dlclwiIDogXCJjcnVzdHkgc29ja1wiLFxyXG4gICAgXCJkYXJrXCIgOiBcImVmZmVydmVzY2VudFwiLFxyXG4gICAgXCJhbmNpZW50XCIgOiBcImVsZGVybHlcIixcclxuICAgIFwicXVlc3RcIiA6IFwic3Ryb2xsXCIsXHJcbiAgICBcImhlYXJ0YmVhdFwiIDogXCJjb2NrIGJlYXRcIixcclxuICAgIFwiaGVhcnRcIiA6IFwiY29ja1wiLFxyXG4gICAgXCJibG9vZFwiIDogXCJncmVhc2VcIixcclxuICAgIFwiYmxlZWRcIiA6IFwid2hpbmVcIixcclxuICAgIFwiY3V0XCIgOiBcIm11dGlsYXRlXCIsXHJcbiAgICBcInNsYXNoXCIgOiBcIm11dGlsYXRlXCIsXHJcbiAgICBcIm1vb25saWdodFwiIDogXCJtb29uc2hpbmVcIixcclxuICAgIFwibW9vblwiIDogXCJuaWdodCBsaWdodFwiLFxyXG4gICAgXCJzdGVlbFwiIDogXCJsYXRleFwiLFxyXG4gICAgXCJrbmlmZVwiIDogXCJkaWxkb1wiLFxyXG4gICAgXCJyYXpvcmJsYWRlXCIgOiBcImJ1dHQgcGx1Z1wiLFxyXG4gICAgXCJyYXpvclwiIDogXCJkaWxkb1wiLFxyXG4gICAgXCJibGFkZVwiIDogXCJoYW5kbGVcIixcclxuICAgIFwicGFpblwiIDogXCJob3Qgc2V4XCIsXHJcbiAgICBcImVtb3Rpb25hbFwiIDogXCJjaGlsZGlzaFwiLFxyXG4gICAgXCJlbW90aW9uXCIgOiBcImx1YnJpY2FudFwiLFxyXG4gICAgXCJ0ZWFyZHJvcFwiIDogXCJ0ZWFyIGRyb3BcIixcclxuICAgIFwidGVhclwiIDogXCJzcGVybWVcIixcclxuICAgIFwiY2FzdGxlXCIgOiBcImNoYXRlYXVcIixcclxuICAgIFwid29ybGRcIiA6IFwiaGFuZCB0b3dlbFwiLFxyXG4gICAgXCJkZWFkXCIgOiBcImluZXJ0XCIsXHJcbiAgICBcImdvb2RieWVcIiA6IFwicGVhY2UgeSdhbGxcIixcclxuICAgIFwiZ29vZC1ieWVcIiA6IFwiZ2V0IHRoZSBmdWNrIG91dFwiLFxyXG4gICAgXCJnb29kIGJ5ZVwiIDogXCJmdWNrIG9mZlwiLFxyXG4gICAgXCJkZWF0aFwiIDogXCJTYW50YVwiLFxyXG4gICAgXCJwYWxlXCIgOiBcInNleHlcIixcclxuICAgIFwiZHJpZnRcIiA6IFwiaGltLWhhd1wiLFxyXG4gICAgXCJmYWRlXCIgOiBcImhpbS1oYXdcIixcclxuICAgIFwiZmxlc2hcIiA6IFwidHdpbmtpZVwiLFxyXG4gICAgXCJjb3Jwc2VcIiA6IFwibWFubmVxdWluXCIsXHJcbiAgICBcInNraW5cIiA6IFwidHdpbmtpZXNcIixcclxuICAgIFwicHV0cmlkXCIgOiBcInBsZWFzYW50XCIsXHJcbiAgICBcImJyZWF0aGVcIiA6IFwicGF1c2UgYXdrd2FyZGx5XCIsXHJcbiAgICBcImJyZWF0aFwiIDogXCJhd2t3YXJkIHBhdXNlXCIsXHJcbiAgICBcInN0b3BwXCIgOiBcInB1c2hcIixcclxuICAgIFwic3RvcFwiIDogXCJwdXNoXCIsXHJcbiAgICBcInNjcmVhbVwiIDogXCJncnVudFwiLFxyXG4gICAgXCJ0aGlua1wiIDogXCJzY2hlbWVcIixcclxuICAgIFwic3Bpcml0dWFsXCIgOiBcImJhbmFuYSBjcmF2aW5nXCIsXHJcbiAgICBcInNwaXJpdFwiIDogXCJiYW5hbmFcIixcclxuICAgIFwic291bFwiIDogXCJiYW5hbmFcIixcclxuICAgIFwiZ2hvc3RcIiA6IFwiaW1hZ2luYXJ5IGZyaWVuZFwiLFxyXG4gICAgXCJtb25zdGVyXCIgOiBcImRpc2xleGljIGxvdmVyXCIsXHJcbiAgICBcImJlYXN0XCIgOiBcImVyZWN0aW9uXCIsXHJcbiAgICBcImRlbW9uXCIgOiBcImhhcmQtb25cIixcclxuICAgIFwiYW5nZWxcIiA6IFwicG9ybiBzdGFyXCIsXHJcbiAgICBcInNob290aW5nIHN0YXJcIiA6IFwic3dpZnQgbWlzc2lsZVwiLFxyXG4gICAgXCJzdGFyXCIgOiBcIm1pc3NpbGVcIixcclxuICAgIFwibG9zdFwiIDogXCJhcm91c2VkXCIsXHJcbiAgICBcInRpbWVcIiA6IFwidGhyb2JiaW5nXCIsXHJcbiAgICBcImNoZWVrXCIgOiBcInJ1bXBcIixcclxuICAgIFwiZmluZ2Vyc1wiIDogXCJzYXVzYWdlXCIsXHJcbiAgICBcImRheWRyZWFtXCIgOiBcImZhbnRhc2l6ZVwiLFxyXG4gICAgXCJ0aGUgc3ByaW5nXCIgOiBcInR1YmUgc29ja1wiLFxyXG4gICAgXCJzcHJpbmdcIiA6IFwidHViZSBzb2Nrc1wiLFxyXG4gICAgXCJpbGx1c2lvblwiIDogXCJkcnVua2VuIG1pc3Rha2VcIixcclxuICAgIFwibG9uZWxpbmVzc1wiIDogXCJhcm91c2FsXCIsXHJcbiAgICBcImxvbmVseVwiIDogXCJob3JueVwiLFxyXG4gICAgXCJhbG9uZVwiIDogXCJlY3N0YXRpY1wiLFxyXG4gICAgXCJsb25lXCIgOiBcInNpbmdsZVwiLFxyXG4gICAgXCJwZXJmZWN0XCIgOiBcImZ1Y2tlZFwiLFxyXG4gICAgXCJoaWRkZW5cIiA6IFwic3Rhc2hlZFwiLFxyXG4gICAgXCJteXN0ZXJ5XCIgOiBcIm5lb24gc2lnblwiLFxyXG4gICAgXCJteXN0ZXJpZXNcIiA6IFwibmVvbiBzaWduc1wiLFxyXG4gICAgXCJyb3NlXCIgOiBcImJ1dHQgaG9sZVwiLFxyXG4gICAgXCJwZXRhbFwiIDogXCJkaW5nbGViZXJyeVwiLFxyXG4gICAgXCJkaWZmZXJlbnRcIiA6IFwiYXdrd2FyZFwiLFxyXG4gICAgXCJ3cm9uZ1wiIDogXCJidXp6aW5nXCIsXHJcbiAgICBcImZhdGVcIiA6IFwiY29pbmNpZGVuY2VcIixcclxuICAgIFwiY29sZFwiIDogXCJmdXp6eVwiLFxyXG4gICAgXCJoZWxsZmlyZVwiIDogXCJoZWxsIGZpcmVcIixcclxuICAgIFwiaGVsbFwiIDogXCJteSBjb2NrJ3NcIixcclxuICAgIFwiY3J5c3RhbFwiIDogXCJiZWRhemxlclwiLFxyXG4gICAgXCJyYWluYm93XCIgOiBcInBpenphenpcIixcclxuICAgIFwicmFpblwiIDogXCJqaXp6dW1cIixcclxuICAgIFwic3Rvcm1cIiA6IFwib3JneVwiLFxyXG4gICAgXCJ3aW5kXCIgOiBcImJsb3dcIixcclxuICAgIFwiYnJlZXplXCIgOiBcImRyYWZ0XCIsXHJcbiAgICBcImJyaWxsaWFuY2VcIiA6IFwic2hpbnluZXNzXCIsXHJcbiAgICBcImJyaWxsaWFudFwiIDogXCJzaGlueVwiLFxyXG4gICAgXCJkcmVhbWxhbmRcIiA6IFwib2JzZXNzaW9uIGlzbGFuZFwiLFxyXG4gICAgXCJkcmVhbXNcIiA6IFwib2JzZXNzaW9uc1wiLFxyXG4gICAgXCJkcmVhbVwiIDogXCJvYnNlc3NcIixcclxuICAgIFwicHJpc29uXCIgOiBcIm91dGhvdXNlXCIsXHJcbiAgICBcImdvbGRlbiByYXlcIiA6IFwiZ2F1ZHkgc2NyaWJibGVcIixcclxuICAgIFwicmF5XCIgOiBcInNjcmliYmxlXCIsXHJcbiAgICBcImRlYWRseVwiIDogXCJmZXJ0aWxlXCIsXHJcbiAgICBcInRydXRoXCIgOiBcInRyaXZpYVwiLFxyXG4gICAgXCJzdW5cIiA6IFwieWVsbG93IGRpc2tcIixcclxuICAgIFwiY3J1ZWxcIiA6IFwiaGFwaGF6YXJkXCIsXHJcbiAgICBcImNsb3VkXCIgOiBcImJhbGxvb25cIixcclxuICAgIFwidHdpbmtsZVwiIDogXCJzdHJvYmVcIixcclxuICAgIFwidHdpbmtsaW5nXCIgOiBcInN0cm9iaW5nXCIsXHJcbiAgICBcImVzY2FwZVwiIDogXCJzbnVnZ2xlXCIsXHJcbiAgICBcInVuZGVyc3RhbmRcIiA6IFwic3Ryb2tlIG15IGVnb1wiLFxyXG4gICAgXCJyZW1lbWJlclwiIDogXCJtdW1ibGVcIixcclxuICAgIFwiaWxsdW1pbmF0aW9uXCIgOiBcIm11bWJvIGp1bWJvXCIsXHJcbiAgICBcInJlYWxpdHlcIiA6IFwidG9pbGV0IGJvd2xcIixcclxuICAgIFwiYmluZFwiIDogXCJjb2RkbGVcIixcclxuICAgIFwiYm91bmRcIiA6IFwiY29kZGxlZFwiLFxyXG4gICAgXCJ0b3JuXCIgOiBcImh1Z2dsZWRcIixcclxuICAgIFwiZGllZFwiIDogXCJtYWRlIG1hcnNobWFsbG93c1wiLFxyXG4gICAgXCJkaWVzXCIgOiBcIm1ha2VzIG1hcnNobWFsbG93c1wiLFxyXG4gICAgXCJkaWVcIiA6IFwibWFrZSBtYXJzaG1hbGxvd3NcIixcclxuICAgIFwiZHlpbmdcIiA6IFwibWFraW5nIG1hcnNobWFsbG93c1wiLFxyXG4gICAgXCJib2R5XCIgOiBcImppZ2dsaW5nIGNsdW1wXCIsXHJcbiAgICBcImJvZGllc1wiIDogXCJqaWdnbGluZyBwaWxlc1wiLFxyXG4gICAgXCJ3YXJmYXJlXCIgOiBcImNoaWxkcmVuIGxhdWdoaW5nXCIsXHJcbiAgICBcImRlYnV0YW50ZXNcIiA6IFwiaG9va2Vyc1wiLFxyXG4gICAgXCJzbGF2ZVwiIDogXCJnaW1wXCIsXHJcbiAgICBcInBvZXRpY1wiIDogXCJmbGF0dWxlbnRcIixcclxuICAgIFwicG9ldHJ5XCIgOiBcImJhZCBnYXNcIixcclxuICAgIFwicG9ldFwiIDogXCJob2JvXCIsXHJcbiAgICBcInBvZW1cIiA6IFwic2NyaWJibGVcIixcclxuICAgIFwiY291bnRyeVwiIDogXCJiYXRocm9vbVwiLFxyXG4gICAgXCJuYWtlZFwiIDogXCJ1bnNoYXZlZFwiLFxyXG4gICAgXCJqZXN1cyBjaHJpc3RcIiA6IFwiamltIGJvYiBqclwiLFxyXG4gICAgXCJjaHJpc3RcIiA6IFwiamltIGJvYiBqclwiLFxyXG4gICAgXCJqZXN1c1wiIDogXCJqaW0gYm9iIGpyXCIsXHJcbiAgICBcImhlYWxlclwiIDogXCJmb25kbGVyXCIsXHJcbiAgICBcImdvZHNcIiA6IFwiamltIGJvYiBzciBldCBhbC5cIixcclxuICAgIFwiZ29kXCIgOiBcImppbSBib2Igc3JcIixcclxuICAgIFwid2VhcG9uXCIgOiBcInBvY2tldCBwdXNzeVwiLFxyXG4gICAgXCJleGlzdGVuY2VcIiA6IFwid2hhdGV2ZXJcIixcclxuICAgIFwibWluaW9uXCIgOiBcImhvcm55IHBpcmF0ZVwiLFxyXG4gICAgXCJyYXBpbmdcIiA6IFwid2hhdFwiLFxyXG4gICAgXCJyYXBlXCIgOiBcIndoYXRcIixcclxuICAgIFwiZ3JhdmVzdG9uZVwiIDogXCJtaWxlIG1hcmtlclwiLFxyXG4gICAgXCJncmF2ZVwiIDogXCJwZXJzb25hbCBzcGFjZVwiLFxyXG4gICAgXCJpbmZpbml0ZVwiIDogXCJhYnN0cmFjdFwiLFxyXG4gICAgXCJzdWljaWRlXCIgOiBcIm11cmRlclwiLFxyXG4gICAgXCJicmlua1wiIDogXCJib3JkZXJcIixcclxuICAgIFwiY3JpZWRcIiA6IFwiY2FtZVwiLFxyXG4gICAgXCJjcmllc1wiIDogXCJza2VldHNcIixcclxuICAgIFwiY3J5aW5nXCIgOiBcImN1bW1pbmdcIixcclxuICAgIFwiaGFkIGRvbmVcIiA6IFwiZG9uZSBkaWRcIixcclxuICAgIFwiY3J5XCIgOiBcImN1bVwiLFxyXG4gICAgXCJjcnlwdGljXCIgOiBcImRydW5rZW5cIixcclxuICAgIFwiY3J5cHRcIiA6IFwidXJpbmFsXCIsXHJcbiAgICBcIm15c3RpY1wiIDogXCJ0cmFuc2V4dWFsXCIsXHJcbiAgICBcImJhbGFuY2VkIGluZGl2aWR1YWxcIiA6IFwicHN5Y2hvXCIsXHJcbiAgICBcImJhbGFuY2VkIHBlcnNvblwiIDogXCJwc3ljaG9cIixcclxuICAgIFwiYmFsYW5jZWQgbWFuXCIgOiBcInBzeWNob1wiLFxyXG4gICAgXCJiYWxhbmNlZCB3b21hblwiIDogXCJwc3ljaG9cIixcclxuICAgIFwid2lzZG9tXCIgOiBcImJ1bGwgc2hpdFwiLFxyXG4gICAgXCJ3aXNlXCIgOiBcImJ1bGwgc2hpdHRpbmdcIixcclxuICAgIFwiYmxlc3NlZCBiZVwiIDogXCJzdWNrIGVnZ3NcIixcclxuICAgIFwiZW5lcmd5XCIgOiBcImp1aWNlXCIsXHJcbiAgICBcInJpZGRsZVwiIDogXCJwb2xrYSBkb3RcIixcclxuICAgIFwibXkgbG9yZFwiIDogXCJzd2VldCBwYWxtXCIsXHJcbiAgICBcInNvIG1vdGUgaXQgYmVcIiA6IFwiaXQncyByZWFsIGluIG15IGhlYWRcIixcclxuICAgIFwicHJheVwiIDogXCJtdXJtdXJcIixcclxuICAgIFwibm9tYWRcIiA6IFwiZHJ1bmsgaG9ib1wiLFxyXG4gICAgXCJkZXN0aW55XCIgOiBcInRheGVzXCIsXHJcbiAgICBcInN3b3JkXCIgOiBcImRpbGRvXCIsXHJcbiAgICBcInZvaWRcIiA6IFwiYnVja2V0XCIsXHJcbiAgICBcImp1c3RcIiA6IFwic3VyZVwiLFxyXG4gICAgXCJ2ZW5nZWFuY2VcIiA6IFwic2xhcCBoYXBwaW5lc3NcIixcclxuICAgIFwiYXZlbmdlXCIgOiBcImdpdCByb3dkeSBmb3JcIixcclxuICAgIFwidmVuZ2VcIiA6IFwiLXJvd2R5LVwiLFxyXG4gICAgXCJoZWF2ZW5zXCIgOiBcInNraWVzXCIsXHJcbiAgICBcImhlYXZlblwiIDogXCJza3lcIixcclxuICAgIFwiZW5kbGVzc1wiIDogXCJyZWFsIGxvbmdcIixcclxuICAgIFwidmFsbGV5XCIgOiBcImRpdGNoXCIsXHJcbiAgICBcImFyZHVvdXNcIiA6IFwibm90IGVhc3lcIixcclxuICAgIFwidG91Y2hcIiA6IFwiZ3JvcGVcIixcclxuICAgIFwid3JldGNoZWRcIiA6IFwic2tlZXp5XCIsXHJcbiAgICBcIndyZXRjaFwiIDogXCJza2VlemVcIixcclxuICAgIFwiYXdlXCIgOiBcImZlYXJmdWwgcmV2ZXJlbmNlXCIsXHJcbiAgICBcInJpdHVhbFwiIDogXCJiYW5hbmEgZGFuY2VcIixcclxuICAgIFwiYmVob2xkXCIgOiBcIm9vZ2xlXCIsXHJcbiAgICBcInZlaWxcIiA6IFwiZGlzZ3Vpc2VcIixcclxuICAgIFwidmlzdGFcIiA6IFwic2NlbmVcIixcclxuICAgIFwiYWx3YXlzXCIgOiBcInVzdWFsbHlcIixcclxuICAgIFwiYmVsaWV2ZVwiIDogXCJidXlcIixcclxuICAgIFwid2lzaFwiIDogXCJ3YW50XCIsXHJcbiAgICBcImZlbGxcIiA6IFwiZmxvcHBlZFwiLFxyXG4gICAgXCJmYWxsXCIgOiBcImZsb3BcIixcclxuICAgIFwicmlnaHRlb3VzXCIgOiBcImFycm9nYW50XCIsXHJcbiAgICBcIndhcnJpb3JcIiA6IFwia2l0dGVuXCIsXHJcbiAgICBcInVuY2FyaW5nXCIgOiBcInByaWNraXNoXCIsXHJcbiAgICBcImNhcmUgdG8gZ2l2ZVwiIDogXCJzaGl0IHRvIGdpdmVcIixcclxuICAgIFwidGFrZSBjYXJlIG9mXCIgOiBcImRlY2ltYXRlXCIsXHJcbiAgICBcInRha2luZyBjYXJlXCIgOiBcImZvcmdldGluZ1wiLFxyXG4gICAgXCJ0YWtlcyBjYXJlXCIgOiBcImZvcmdldHNcIixcclxuICAgIFwidGFrZSBjYXJlXCIgOiBcImZvcmdldFwiLFxyXG4gICAgXCJmb3JnZXRcIiA6IFwiZGlzcmVtZW1iZXJcIixcclxuICAgIFwiY2FyaW5nXCIgOiBcImdpdmluZyBhIHNoaXRcIixcclxuICAgIFwiY2FyZWRcIiA6IFwiZ2F2ZSBhIHNoaXRcIixcclxuICAgIFwiY2FyZVwiIDogXCJnaXZlIGEgc2hpdFwiLFxyXG4gICAgXCJ3aWVsZFwiIDogXCJqZXJrXCIsXHJcbiAgICBcIm9jZWFuXCIgOiBcInNld2VyXCIsXHJcbiAgICBcInNlYVwiIDogXCJiYXRoXCIsXHJcbiAgICBcImJheVwiIDogXCJzaW5rXCIsXHJcbiAgICBcInR3aWxpZ2h0XCIgOiBcIm1vb25zaGluZVwiLFxyXG4gICAgXCJicm9rZW5cIiA6IFwiYmVhdGVuXCIsXHJcbiAgICBcImJyb2tlXCIgOiBcImJlYXRcIixcclxuICAgIFwiYnJlYWtcIiA6IFwiYmVhdFwiLFxyXG4gICAgXCJmb3JldmVyXCIgOiBcInNvIHZlcnlcIixcclxuICAgIFwiaHVtYW4gcmFjZVwiIDogXCJnZXJiaWwgZW1waXJlXCIsXHJcbiAgICBcIm5pZ2h0bWFyZVwiIDogXCJ0YW50cnVtXCIsXHJcbiAgICBcInN1ZmZlclwiIDogXCJwaXJvdWV0dGVcIixcclxuICAgIFwibXlzZWxmXCIgOiBcIm15IG11Y2huZXNzXCIsXHJcbiAgICBcIm1lXCIgOiBcImlcIixcclxuICAgIFwibXlcIiA6IFwiaSdzIFwiLFxyXG4gICAgXCJtaW5lXCIgOiBcImknc1wiLFxyXG4gICAgXCJ3YXMgaVwiIDogXCJ3ZXJlIGlcIixcclxuICAgIFwiYW0gaVwiIDogXCJhcmUgaVwiLFxyXG4gICAgXCJpbVwiIDogXCJpJ21cIixcclxuICAgIFwiaSdtXCIgOiBcImkgYXJlXCIsXHJcbiAgICBcImkndmVcIiA6IFwiaSBoYXZlXCIsXHJcbiAgICBcImknbGxcIiA6IFwiaSB3aWxsXCIsXHJcbiAgICBcImkgYW1cIiA6IFwiaSBhcmVcIixcclxuICAgIFwieW91cnNlbGZcIiA6IFwieW91J3MgbXVjaG5lc3NcIixcclxuICAgIFwieW91cnNcIiA6IFwieW91J3NcIixcclxuICAgIFwieW91clwiIDogXCJ5b3Unc1wiLFxyXG4gICAgXCJ5b3UgYWxsXCIgOiBcImFsbCB5b3VcIixcclxuICAgIFwieW91J2xsXCIgOiBcInlvdSB3aWxsXCIsXHJcbiAgICBcInlvdSd2ZVwiIDogXCJ5b3UgaGFzXCIsXHJcbiAgICBcInlvdSdyZVwiIDogXCJ5b3UgaXNcIixcclxuICAgIFwidGhlZVwiIDogXCJ5b3VcIixcclxuICAgIFwidGhpbmVcIiA6IFwieW91J3NcIixcclxuICAgIFwidGhvdVwiIDogXCJ5b3VcIixcclxuICAgIFwid2VcIiA6IFwidGhleVwiLFxyXG4gICAgXCJ1c1wiIDogXCJ0aGVtXCIsXHJcbiAgICBcIm91clwiIDogXCJ0aGVpclwiLFxyXG4gICAgXCJvdXJzXCIgOiBcInRoZWlyc1wiLFxyXG4gICAgXCJpXCIgOiBcIktldmluXCIsXHJcbiAgICBcInlvdVwiIDogXCJSZXRhcmRzXCJcclxufTtcclxuLyoqXHJcbiAqIEFjY2VwdHMgcGxhaW4gdGV4dCBpbnB1dCBhbmQgR2xvcmlvdXNseSBXVEZpZmllcyBpdC5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwMTEwXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSB0YXJnZXQgVGhlIHRleHQgdG8gV1RGaWZ5LlxyXG4gKiBAcGFyYW0ge0Jvb2xlYW59IG91dHB1dEhUTUwgU3BlY2lmaWVzIGlmIHlvdSB3YW50IHRoZSBvdXRwdXRcclxuICogIGluIEhUTUwgZm9ybWF0LiBJZiBmYWxzZSwgd2lsbCBvdXRwdXQgcGxhaW4gdGV4dC4gRGVmYXVsdHNcclxuICogIHRvIGZhbHNlLlxyXG4gKiBAcmV0dXJuIHtTdHJpbmd9IFJldHVybnMgR2VudWluZSBXVEZpZmllZCB0ZXh0LlxyXG4gKi9cclxuYXRyb3BhLnd0Zi53dGZpZnkgPSBmdW5jdGlvbiAodGFyZ2V0LCBvdXRwdXRIVE1MKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIGF0cm9wYS5zdXBwb3J0Q2hlY2soJ3d0ZicpO1xyXG4gICAgXHJcbiAgICB2YXIgcmVnZXhWYWx1ZSxcclxuICAgICAgICByZXBsYWNlbWVudFRleHQsXHJcbiAgICAgICAgb2xkV29yZCxcclxuICAgICAgICB3dGZDb3VudCxcclxuICAgICAgICB3b3JkQ291bnQsXHJcbiAgICAgICAgcmV0LFxyXG4gICAgICAgIHdvcmQ7XHJcbiAgICBcclxuICAgIGlmKHRydWUgIT09IG91dHB1dEhUTUwpIHtcclxuICAgICAgICBvdXRwdXRIVE1MID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICByZXQgPSB7fTtcclxuICAgIHd0ZkNvdW50ID0gMDtcclxuICAgIHRhcmdldCA9IHRhcmdldC50cmltKCk7XHJcbiAgICB3b3JkQ291bnQgPSBhdHJvcGEuc3RyaW5nLmNvdW50V29yZHModGFyZ2V0KTtcclxuICAgIGlmKHRydWUgPT09IG91dHB1dEhUTUwpIHtcclxuICAgICAgICB0YXJnZXQgPSB0YXJnZXQucmVwbGFjZShcclxuICAgICAgICAgICAgLyhcXC4gPyl7Mix9L2dpLFxyXG4gICAgICAgICAgICAnPHNwYW4gc3R5bGU9XCJjb2xvciA6IGJyb3duIDtcIj4gW3NoaXQgdGFjb10gPC9zcGFuPidcclxuICAgICAgICApO1xyXG4gICAgICAgIHRhcmdldCA9ICc8cD4gJyArIHRhcmdldC5yZXBsYWNlKC8oXFxyXFxufFxccnxcXG4pL2csJyA8YnIvPiAnKSArICcgPC9wPic7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRhcmdldCA9IHRhcmdldC5yZXBsYWNlKC8oXFwuID8pezIsfS9naSwgJyBbc2hpdCB0YWNvXSAnKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogQWNjZXB0cyBwbGFpbiB0ZXh0IGlucHV0IGFuZCBHbG9yaW91c2x5IFdURmlmaWVzIGl0LlxyXG4gICAgICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAgICAgKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICAgICAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICAgICAqIEB2ZXJzaW9uIDIwMTMwMTEyXHJcbiAgICAgKiBAbWV0aG9kT2YgYXRyb3BhLnd0Zi53dGZpZnktXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG0gRmlyc3QgbWF0Y2hlZCBwYXR0ZXJuIGluIHN0cmluZyBzZWFyY2hlZC5cclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzdWIxIEZpcnN0IG1hdGNoZWQgc3VicGF0dGVybiBpbiBzdHJpbmcgc2VhcmNoZWQuXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gc3ViMiBTZWNvbmQgbWF0Y2hlZCBzdWJwYXR0ZXJuIGluIHN0cmluZyBzZWFyY2hlZC5cclxuICAgICAqL1xyXG4gICAgcmVwbGFjZW1lbnRUZXh0ID0gZnVuY3Rpb24gKG0sIHN1YjEsIHN1YjIpIHtcclxuICAgICAgICB3dGZDb3VudCsrO1xyXG4gICAgICAgIHN1YjEgPSBhdHJvcGEuc2V0QXNPcHRpb25hbEFyZygnJywgc3ViMSk7XHJcbiAgICAgICAgc3ViMiA9IGF0cm9wYS5zZXRBc09wdGlvbmFsQXJnKCcnLCBzdWIyKTtcclxuICAgICAgICB2YXIgb3V0O1xyXG4gICAgICAgIGlmKHRydWUgPT09IG91dHB1dEhUTUwpIHtcclxuICAgICAgICAgICAgb3V0ID0gJzxzcGFuIHN0eWxlPVwiY29sb3IgOiByZWQgO1wiPicgK1xyXG4gICAgICAgICAgICAgICAgc3ViMSArIGF0cm9wYS53dGYuZGljdGlvbmFyeVt3b3JkXSArIHN1YjIgK1xyXG4gICAgICAgICAgICAgICAgJzwvc3Bhbj4nO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG91dCA9IHN1YjEgKyBhdHJvcGEud3RmLmRpY3Rpb25hcnlbd29yZF0gKyBzdWIyO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfTtcclxuICAgIC8vIHdvcmQgaXMgZGVmaW5lZCBpbiB0aGUgY29udGFpbmluZyBzY29wZSBhbmRcclxuICAgIC8vIGlzIG5vdCBnbG9iYWwsIGpzaGludCBpcyB3cm9uZ1xyXG4gICAgZm9yICh3b3JkIGluIGF0cm9wYS53dGYuZGljdGlvbmFyeSkge1xyXG4gICAgICAgIGlmIChhdHJvcGEud3RmLmRpY3Rpb25hcnkuaGFzT3duUHJvcGVydHkod29yZCkpIHtcclxuICAgICAgICAgICAgb2xkV29yZCA9IGF0cm9wYS5yZWdleC5hcHBlbmRQcmVmaXhlc0FuZFN1ZmZpeGVzKHdvcmQpO1xyXG4gICAgICAgICAgICByZWdleFZhbHVlID0gbmV3IFJlZ0V4cChvbGRXb3JkLCAnZ2knKTtcclxuICAgICAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0LnJlcGxhY2UocmVnZXhWYWx1ZSwgcmVwbGFjZW1lbnRUZXh0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXQud3RmQ291bnQgPSB3dGZDb3VudDtcclxuICAgIHJldC53b3JkQ291bnQgPSB3b3JkQ291bnQ7XHJcbiAgICByZXQuc2NvcmUgPSB3dGZDb3VudCAvIHdvcmRDb3VudDtcclxuICAgIHJldC50eHQgPSB0YXJnZXQ7XHJcbiAgICByZXR1cm4gcmV0O1xyXG59O1xyXG4vKipcclxuICogV1RGaWZpZXMgdGhlIDxjb2RlPnRleHRDb250ZW50PC9jb2RlPiBvciA8Y29kZT52YWx1ZTwvY29kZT4gb2YgdGhlXHJcbiAqICBnaXZlbiBlbGVtZW50IGFuZCByZXBsYWNlcyB0aGUgZWxlbWVudCdzIGlubmVySFRNTCB3aXRoIGEgcHJlIGJsb2NrXHJcbiAqICBjb250YWluaW5nIHRoZSByZXN1bHRzIG9mIFdURmlmaWNhdGlvbi5cclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFJlZmVyZW5jZSBBIHJlZmVyZW5jZSB0byBhbiBIVE1MIEVsZW1lbnQuXHJcbiAqIEByZXR1cm5zIHtIVE1MRWxlbWVudH0gUmV0dXJucyB0aGUgZ2l2ZW4gZWxlbWVudCBhZnRlciB3dGZpZmljYXRpb24uXHJcbiAqIEB2ZXJzaW9uIDIwMTMwMzEzXHJcbiAqL1xyXG5hdHJvcGEud3RmLmh0bWxFbGVtZW50ID0gZnVuY3Rpb24gKGVsZW1lbnRSZWZlcmVuY2UpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgYXRyb3BhLnN1cHBvcnRDaGVjaygnd3RmSHRtbEVsZW1lbnQnKTtcclxuICAgIFxyXG4gICAgdmFyIHd0ZmlmaWVkLCB0eHQ7XHJcbiAgICBlbGVtZW50UmVmZXJlbmNlLmlubmVySFRNTCA9IGVsZW1lbnRSZWZlcmVuY2UuaW5uZXJIVE1MLnJlcGxhY2UoXHJcbiAgICAgICAgLzxicj4oXFxzKyk/KFxcclxcbnxcXHJ8XFxuKT8vZywgJ1xcclxcbicpO1xyXG4gICAgdHh0ID0gZWxlbWVudFJlZmVyZW5jZS52YWx1ZSB8fCBlbGVtZW50UmVmZXJlbmNlLnRleHRDb250ZW50O1xyXG4gICAgd3RmaWZpZWQgPSBhdHJvcGEud3RmLnd0ZmlmeSh0eHQsIHRydWUpO1xyXG4gICAgZWxlbWVudFJlZmVyZW5jZS5pbm5lckhUTUwgPVxyXG4gICAgICAgICc8cHJlIHN0eWxlPVwiY29sb3I6YmxhY2s7IGJhY2tncm91bmQ6d2hpdGU7IHdoaXRlLXNwYWNlOnByZS13cmFwO1wiPicgK1xyXG4gICAgICAgIHd0ZmlmaWVkLnR4dCArXHJcbiAgICAgICAgJzwvcHJlPic7XHJcbiAgICByZXR1cm4gZWxlbWVudFJlZmVyZW5jZTtcclxufTtcclxuXHJcblxyXG5cclxuXHJcbndoaWxlKGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5sZW5ndGggPiAwKSB7XHJcbiAgICBhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMucG9wKCkoKTtcclxufVxyXG5tb2R1bGUuZXhwb3J0cyA9IGF0cm9wYTtcclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL2RvY3MvdnNkb2MvT3BlbkxheWVyc0FsbC5qc1wiLz5cclxudmFyIGF0cm9wYSA9IHJlcXVpcmUoJ2F0cm9wYS1oZWFkZXInKTtcclxuYXRyb3BhLnNldEFzT3B0aW9uYWxBcmcgPSByZXF1aXJlKCdhdHJvcGEtc2V0QXNPcHRpb25hbEFyZycpLnNldEFzT3B0aW9uYWxBcmc7XHJcbmF0cm9wYS5yZW1vdmVOb2RlQnlSZWZlcmVuY2UgPSByZXF1aXJlKCdhdHJvcGEtcmVtb3ZlTm9kZUJ5UmVmZXJlbmNlJykucmVtb3ZlTm9kZUJ5UmVmZXJlbmNlO1xyXG4vKmpzbGludFxyXG4gICAgaW5kZW50OiA0LFxyXG4gICAgbWF4ZXJyOiA1MCxcclxuICAgIHdoaXRlOiB0cnVlLFxyXG4gICAgYnJvd3NlcjogdHJ1ZSxcclxuICAgIGRldmVsOiB0cnVlLFxyXG4gICAgcGx1c3BsdXM6IHRydWUsXHJcbiAgICByZWdleHA6IHRydWVcclxuKi9cclxuLypnbG9iYWwgYXRyb3BhLCBYUGF0aFJlc3VsdCAqL1xyXG4vLyBlbmQgaGVhZGVyXHJcblxyXG5cclxuKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgYXRyb3BhLnJlcXVpcmVzKFxyXG4gICAgICAgICd4cGF0aCcsXHJcbiAgICAgICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgc3VwcG9ydGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgIHdpbmRvdyxcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmV2YWx1YXRlXHJcbiAgICAgICAgICAgIF0uZm9yRWFjaChmdW5jdGlvbiAocHJlcmVxdWlzaXRlKSB7XHJcbiAgICAgICAgICAgICAgICBpZihwcmVyZXF1aXNpdGUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN1cHBvcnRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIHN1cHBvcnRlZDtcclxuICAgICAgICB9XHJcbiAgICApO1xyXG59KCkpO1xyXG5cclxuLyoqXHJcbiAqIEFuIFhwYXRoIHRvb2xraXQgZm9yIG1hbmlwdWxhdGluZyB0aGUgRE9NLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzAzMTNcclxuICogQG5hbWVzcGFjZSBBbiBYcGF0aCB0b29sa2l0IGZvciBtYW5pcHVsYXRpbmcgdGhlIERPTS5cclxuICovXHJcbmF0cm9wYS54cGF0aCA9IHt9O1xyXG4vKipcclxuICogUHJvY2Vzc2VzIG5vZGVzIGZyb20gdGhlIERPTSB1c2luZyBhbiBYcGF0aCBleHByZXNzaW9uLlxyXG4gKiBAZXhhbXBsZVxyXG4gKiAgIC8vIFNheSB5b3Ugd2FudGVkIHRvIHRvdWNoIGFsbCB0aGUgYW5jaG9ycyBhbmQgbGlua3MgaW4gd2luZG93LmRvY3VtZW50XHJcbiAqICAgdmFyIHhwYXRoRXhwcmVzc2lvbiwgY2FsbGJhY2s7XHJcbiAqICAgeHBhdGhFeHByZXNzaW9uID0gJy4vL2EnO1xyXG4gKiAgIGNhbGxiYWNrID0gZnVuY3Rpb24ob25lTm9kZSkge1xyXG4gKiAgICAgICBvbmVOb2RlLnRvdWNoZWQgPSB0cnVlO1xyXG4gKiAgIH1cclxuICogICBhdHJvcGEueHBhdGgucHJvY2Vzc05vZGVzQnlYcGF0aChcclxuICogICAgICAgeHBhdGhFeHByZXNzaW9uLCBkb2N1bWVudCwgZG9jdW1lbnQsIGNhbGxiYWNrKTtcclxuICogICBcclxuICogICAvLyBPciBzYXkgeW91IGhhdmUgYW4gaWZyYW1lLCB3aXRoIHRoZSBpZCAnbXlGcmFtZScuIEluIHRoZSBpZnJhbWUgdGhlcmVcclxuICogICAvLyBpcyBhIGRpdiB3aXRoIHRoZSBpZCBteURpdi5cclxuICogICAvLyBIZXJlIGlzIGhvdyB5b3Ugd291bGQgcmVtb3ZlIGFsbCB0aGUgYW5jaG9ycyBpbiB0aGF0IGRpdi5cclxuICogICB2YXIgbXlGcmFtZSwgeHBhdGhFeHByZXNzaW9uLCBjb250ZXh0Tm9kZSwgZG9jcmVmLCBjYWxsYmFjaztcclxuICogICBteUZyYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ215RnJhbWUnKTtcclxuICogICBkb2NyZWYgPSBteUZyYW1lLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQ7XHJcbiAqICAgY29udGV4dE5vZGUgPSBkb2NyZWYuZ2V0RWxlbWVudEJ5SWQoJ215RGl2Jyk7XHJcbiAqICAgeHBhdGhFeHByZXNzaW9uID0gJy4vL2EnO1xyXG4gKiAgIGNhbGxiYWNrID0gZnVuY3Rpb24ob25lTm9kZSkge1xyXG4gKiAgICAgICBhdHJvcGEucmVtb3ZlTm9kZUJ5UmVmZXJlbmNlKG9uZU5vZGUpO1xyXG4gKiAgIH1cclxuICogICBhdHJvcGEueHBhdGgucHJvY2Vzc05vZGVzQnlYcGF0aChcclxuICogICAgICAgeHBhdGhFeHByZXNzaW9uLCBjb250ZXh0Tm9kZSwgZG9jcmVmLCBjYWxsYmFjayk7XHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDMxM1xyXG4gKiBAcGFyYW0ge1N0cmluZ30geHBhdGhFeHByZXNzaW9uIEFuIFhwYXRoIGV4cHJlc3Npb24gYXMgYSBzdHJpbmdcclxuICogQHBhcmFtIHtET00gTm9kZX0gY29udGV4dE5vZGUgT3B0aW9uYWwuIFRoZSBub2RlIHdoaWNoIGlzIHRvIHNlcnZlIGFzIHRoZSByb290XHJcbiAqIGZvciB0aGUgc3VwcGxpZWQgWHBhdGggZXhwcmVzc2lvbi4gRGVmYXVsdHMgdG8gd2hhdGV2ZXIgZG9jcmVmIGlzLlxyXG4gKiBJZiB5b3UgYXJlIHVzaW5nIGEgcmVsYXRpdmUgcGF0aCBzdWNoIGFzIDxjb2RlPi4vL2E8L2NvZGU+IGFuZCwgeW91IG9ubHlcclxuICogd2FudCB0aGUgYW5jaG9ycyB0aGF0IGFyZSBkZXNjZW5kYW50cyBvZiBhbm90aGVyIGVsZW1lbnQsIHlvdSB3b3VsZFxyXG4gKiBzdXBwbHkgYSByZWZlcmVuY2UgdG8gdGhhdCBlbGVtZW50IGZvciB0aGlzIGFyZ3VtZW50LiBXaGVuIHVzaW5nIGFcclxuICogY29udGV4dCBub2RlLCB0aGUgZG9jcmVmIGFyZ3VtZW50IG11c3QgcmVmZXIgdG8gdGhlIGNvbnRleHQgbm9kZSdzXHJcbiAqIGNvbnRhaW5pbmcgZG9jdW1lbnQuXHJcbiAqIEBwYXJhbSB7RE9NIERvY3VtZW50fSBkb2NyZWYgT3B0aW9uYWwuIEEgcmVmZXJlbmNlIHRvIHRoZSBkb2N1bWVudCB5b3VcclxuICogYXJlIHNlYXJjaGluZywgZGVmYXVsdHMgdG8gZG9jdW1lbnQuIElmIHlvdSBoYXZlIGNyZWF0ZWQgYSBzZXBhcmF0ZVxyXG4gKiBET01Eb2N1bWVudCB3aXRoIHRoZSA8Y29kZT5hdHJvcGEuSFRNTFBhcnNlcjwvY29kZT4sIGFuIGlmcmFtZSwgb3IgYnlcclxuICogc29tZSBvdGhlciBtZWFucywgeW91IHdvdWxkIHB1dCBhIHJlZmVyZW5jZSB0byB0aGF0IGRvY3VtZW50IGhlcmUgdG9cclxuICogaW5kaWNhdGUgdGhhdCB5b3UgaW50ZW5kIHRvIHVzZSB0aGF0IGRvY3VtZW50J3Mgcm9vdC5cclxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgQSBmdW5jdGlvbiBhcHBsaWVkIHRvIGV2ZXJ5IGVsZW1lbnQgZm91bmRcclxuICogdXNpbmcgdGhlIHN1cHBsaWVkIHhwYXRoIGV4cHJlc3Npb24uIFRoZSBjYWxsYmFjayByZWNlaXZlcyBhIHNpbmdsZVxyXG4gKiBlbGVtZW50IGFzIGl0J3Mgb25seSBhcmd1bWVudC5cclxuICogQHJldHVybnMge051bWJlcn0gUmV0dXJucyB0aGUgcXVhbnRpdHkgb2Ygbm9kZXMgcHJvY2Vzc2VkLlxyXG4gKi9cclxuYXRyb3BhLnhwYXRoLnByb2Nlc3NOb2Rlc0J5WHBhdGggPSBmdW5jdGlvbiBwcm9jZXNzTm9kZXNCeVhwYXRoKFxyXG4gICAgeHBhdGhFeHByZXNzaW9uLCBjb250ZXh0Tm9kZSwgZG9jcmVmLCBjYWxsYmFja1xyXG4pIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgYXRyb3BhLnN1cHBvcnRDaGVjaygneHBhdGgnKTtcclxuICAgIGRvY3JlZiA9IGF0cm9wYS5zZXRBc09wdGlvbmFsQXJnKGRvY3VtZW50LCBkb2NyZWYpO1xyXG4gICAgY29udGV4dE5vZGUgPSBhdHJvcGEuc2V0QXNPcHRpb25hbEFyZyhkb2NyZWYsIGNvbnRleHROb2RlKTtcclxuICAgIHZhciBub2Rlc1NuYXBzaG90LFxyXG4gICAgbnNsLFxyXG4gICAgaSxcclxuICAgIG5zaTtcclxuICAgIG5vZGVzU25hcHNob3QgPSBkb2NyZWYuZXZhbHVhdGUoXHJcbiAgICAgICAgeHBhdGhFeHByZXNzaW9uLFxyXG4gICAgICAgIGNvbnRleHROb2RlLFxyXG4gICAgICAgIG51bGwsXHJcbiAgICAgICAgWFBhdGhSZXN1bHQuT1JERVJFRF9OT0RFX1NOQVBTSE9UX1RZUEUsXHJcbiAgICAgICAgbnVsbFxyXG4gICAgKTtcclxuICAgIG5zbCA9IG5vZGVzU25hcHNob3Quc25hcHNob3RMZW5ndGg7XHJcbiAgICBmb3IgKGkgPSAwOyBpIDwgbnNsOyBpKyspIHtcclxuICAgICAgICBuc2kgPSBub2Rlc1NuYXBzaG90LnNuYXBzaG90SXRlbShpKTtcclxuICAgICAgICBjYWxsYmFjayhuc2kpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGk7XHJcbn07XHJcbi8qKlxyXG4gKiBSZW1vdmVzIG5vZGVzIGZyb20gdGhlIERPTSB1c2luZyBhbiBYcGF0aCBleHByZXNzaW9uLlxyXG4gKiBAZXhhbXBsZVxyXG4gKiAgIC8vIHRvIHJlbW92ZSBhbGwgYW5jaG9ycyB3aXRoIHRoZSBjbGFzcyBcIm9vcHNcIiBpbnNpZGUgb2YgYW55IGRpdiBpblxyXG4gKiAgIC8vIGRvY3VtZW50XHJcbiAqICAgdmFyIHhwYXRoRXhwcmVzc2lvbiA9IFwiLi8vZGl2Ly9hW0BjbGFzcz0nb29wcyddXCI7XHJcbiAqICAgYXRyb3BhLnhwYXRoLnJlbW92ZU5vZGVzQnlYcGF0aCh4cGF0aEV4cHJlc3Npb24pO1xyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzAzMTNcclxuICogQHBhcmFtIHtTdHJpbmd9IHhwYXRoRXhwcmVzc2lvbiBBbiBYcGF0aCBleHByZXNzaW9uIGFzIGEgc3RyaW5nXHJcbiAqIEBwYXJhbSB7RE9NIE5vZGV9IGNvbnRleHROb2RlIE9wdGlvbmFsLiBUaGUgbm9kZSB3aGljaCBpcyB0byBzZXJ2ZSBhcyB0aGUgcm9vdFxyXG4gKiBmb3IgdGhlIHN1cHBsaWVkIFhwYXRoIGV4cHJlc3Npb24uIERlZmF1bHRzIHRvIHdoYXRldmVyIGRvY3JlZiBpcy5cclxuICogQHBhcmFtIHtET00gRG9jdW1lbnR9IGRvY3JlZiBPcHRpb25hbC4gQSByZWZlcmVuY2UgdG8gdGhlIGRvY3VtZW50IHlvdVxyXG4gKiBhcmUgc2VhcmNoaW5nLCBkZWZhdWx0cyB0byBkb2N1bWVudC5cclxuICogQHJldHVybnMge051bWJlcn0gUmV0dXJucyB0aGUgcXVhbnRpdHkgb2Ygbm9kZXMgcmVtb3ZlZC5cclxuICogQHNlZSBhdHJvcGEueHBhdGgucHJvY2Vzc05vZGVzQnlYcGF0aCBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICovXHJcbmF0cm9wYS54cGF0aC5yZW1vdmVOb2Rlc0J5WHBhdGggPSBmdW5jdGlvbiByZW1vdmVOb2Rlc0J5WHBhdGgoXHJcbiAgICB4cGF0aEV4cHJlc3Npb24sIGNvbnRleHROb2RlLCBkb2NyZWZcclxuKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIGF0cm9wYS5zdXBwb3J0Q2hlY2soJ3hwYXRoJyk7XHJcbiAgICB2YXIgY291bnQ7XHJcbiAgICBjb3VudCA9IGF0cm9wYS54cGF0aC5wcm9jZXNzTm9kZXNCeVhwYXRoKFxyXG4gICAgICAgIHhwYXRoRXhwcmVzc2lvbixcclxuICAgICAgICBjb250ZXh0Tm9kZSxcclxuICAgICAgICBkb2NyZWYsXHJcbiAgICAgICAgZnVuY3Rpb24gKGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgYXRyb3BhLnJlbW92ZU5vZGVCeVJlZmVyZW5jZShlbGVtZW50KTtcclxuICAgICAgICB9XHJcbiAgICApO1xyXG4gICAgcmV0dXJuIGNvdW50O1xyXG59O1xyXG4vKipcclxuICogU2VsZWN0cyBub2RlcyBmcm9tIHRoZSBET00gdXNpbmcgYW4gWHBhdGggZXhwcmVzc2lvbi5cclxuICogQGV4YW1wbGVcclxuICogPHByZT5cclxuICogICAvLyBUbyBnZXQgYWxsIHRoZSBlbGVtZW50cyBpbiB0aGUgZG9jdW1lbnQgd2l0aCBhIHNyYyBhdHRyaWJ1dGU6XHJcbiAqICAgdmFyIHNyY0VsZW1lbnRzID0gYXRyb3BhLnhwYXRoLmdldE5vZGVzQnlYcGF0aCgnW0BzcmNdJyk7XHJcbiAqIDwvcHJlPlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzAzMTNcclxuICogQHBhcmFtIHtTdHJpbmd9IHhwYXRoRXhwcmVzc2lvbiBBbiBYcGF0aCBleHByZXNzaW9uIGFzIGEgc3RyaW5nXHJcbiAqIEBwYXJhbSB7RE9NIE5vZGV9IGNvbnRleHROb2RlIE9wdGlvbmFsLiBUaGUgbm9kZSB3aGljaCBpcyB0byBzZXJ2ZSBhcyB0aGUgcm9vdFxyXG4gKiBmb3IgdGhlIHN1cHBsaWVkIFhwYXRoIGV4cHJlc3Npb24uIERlZmF1bHRzIHRvIHRoZSBkb2N1bWVudCdzIHJvb3Qgbm9kZS5cclxuICogQHBhcmFtIHtET00gRG9jdW1lbnR9IGRvY3JlZiBPcHRpb25hbC4gQSByZWZlcmVuY2UgdG8gdGhlIGRvY3VtZW50IHlvdVxyXG4gKiBhcmUgc2VhcmNoaW5nLCBkZWZhdWx0cyB0byBkb2N1bWVudC5cclxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGFuIGFycmF5IHdob3NlIGVsZW1lbnRzIGFyZSBET00gTm9kZXNcclxuICogQHNlZSBhdHJvcGEueHBhdGgucHJvY2Vzc05vZGVzQnlYcGF0aCBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICovXHJcbmF0cm9wYS54cGF0aC5nZXROb2Rlc0J5WHBhdGggPSBmdW5jdGlvbiBnZXROb2Rlc0J5WHBhdGgoXHJcbiAgICB4cGF0aEV4cHJlc3Npb24sIGNvbnRleHROb2RlLCBkb2NyZWZcclxuKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcbiAgICBhdHJvcGEuc3VwcG9ydENoZWNrKCd4cGF0aCcpO1xyXG4gICAgdmFyIGVsZW1lbnRSZWZlcmVuY2VzO1xyXG4gICAgZWxlbWVudFJlZmVyZW5jZXMgPSBbXTtcclxuICAgIGF0cm9wYS54cGF0aC5wcm9jZXNzTm9kZXNCeVhwYXRoKFxyXG4gICAgICAgIHhwYXRoRXhwcmVzc2lvbixcclxuICAgICAgICBjb250ZXh0Tm9kZSxcclxuICAgICAgICBkb2NyZWYsXHJcbiAgICAgICAgZnVuY3Rpb24gKGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgZWxlbWVudFJlZmVyZW5jZXMucHVzaChlbGVtZW50KTtcclxuICAgICAgICB9XHJcbiAgICApO1xyXG4gICAgcmV0dXJuIGVsZW1lbnRSZWZlcmVuY2VzO1xyXG59O1xyXG4vKipcclxuICogRXNjYXBlcyBzaW5nbGUgcXVvdGVzIChhcG9zdHJvcGUpIGluIFhwYXRoIHF1ZXJpZXMuXHJcbiAqIEBleGFtcGxlXHJcbiAqIDxwcmU+XHJcbiAqICAvLyB0aGlzIGlzIHVzZWZ1bCBmb3IgdXNpbmcgYXJiaXRyYXJ5IHN0cmluZ3MgaW4geW91ciBxdWVyaWVzLlxyXG4gKiAgdmFyIGFyYlN0ciwgZXNjYXBlZFN0ciwgeHBhdGhFeHByZXNzaW9uLCBmb3VuZE5vZGVzO1xyXG4gKiAgYXJiU3RyID0gXCJKaW1teSBhaW4ndCBuZXZlciBzYWlkIFxcXCJTaHVyXFxcIiBXaHk/IEkgZG9uJ3Qga25vdyFcIjtcclxuICogIGVzY2FwZWRTdHIgPSBhdHJvcGEueHBhdGguZXNjYXBlUXVvdGVzWHBhdGgoYXJiU3RyKTtcclxuICogIC8vIHByb2R1Y2VzOiBjb25jYXQoJ0ppbW15IGFpbicsIFwiJ1wiLCAndCBuZXZlciBzYWlkIFwiU2h1clwiIFdoeT8gSSBkb24nLCBcIidcIixcclxuICogIC8vICd0IGtub3chJylcclxuICogIC8vIGl0IGlzIG11Y2ggZWFzaWVyIHRvIGRlYWwgd2l0aCB0aGUgdmFyaWFibGUgbmFtZSB0aGFuIGl0IGlzIHRvIGRlYWwgd2l0aFxyXG4gKiAgLy8gYWxsIHRob3NlIHF1b3RlcyBhbmQgY29tbWFzIVxyXG4gKiAgeHBhdGhFeHByZXNzaW9uID0gJy4vL3BbY29udGFpbnModGV4dCgpLCcgKyBlc2NhcGVkU3RyICsgJyldJztcclxuICogIGZvdW5kTm9kZXMgPSBhdHJvcGEueHBhdGguZ2V0Tm9kZXNCeVhwYXRoKHhwYXRoRXhwcmVzc2lvbik7XHJcbiAqICAvLyBmb3VuZCBub2RlcyB3aWxsIGNvbnRhaW4gdGhlIHAgZWxlbWVudHMgd2hlcmUgdGhlIHRleHQgd2FzIG1hdGNoZWQuXHJcbiAqIDwvcHJlPlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMjA5MDlcclxuICogQHBhcmFtIHtTdHJpbmd9IHN0cmluZyBBbiBYcGF0aCBxdWVyeVxyXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBSZXR1cm5zIGEgc3RyaW5nIHJlcHJlc2VudGluZyBhIGNvbmNhdCBmdW5jdGlvbiBpbiBYcGF0aFxyXG4gKiB3aGljaCB3aWxsIGVmZmVjdGl2ZWx5IHdvcmsgaW4gZXNjYXBpbmcgcXVvdGVzIGluIHlvdXIgeHBhdGggcXVlcnkuXHJcbiAqL1xyXG5hdHJvcGEueHBhdGguZXNjYXBlUXVvdGVzWHBhdGggPSBmdW5jdGlvbiBlc2NhcGVRdW90ZXNYcGF0aChzdHJpbmcpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC9cXCcvZywgXCInLCBcXFwiJ1xcXCIsICdcIik7XHJcbiAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvXiguKikkL2csIFwiY29uY2F0KCckMScpXCIpO1xyXG4gICAgcmV0dXJuIHN0cmluZztcclxufTtcclxuXHJcblxyXG5cclxuXHJcbndoaWxlKGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5sZW5ndGggPiAwKSB7XHJcbiAgICBhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMucG9wKCkoKTtcclxufVxyXG5tb2R1bGUuZXhwb3J0cyA9IGF0cm9wYTtcclxuIiwiLypqc2xpbnRcclxuICAgIG5vZGUgOiB0cnVlXHJcbiovXHJcblxyXG52YXIgYXRyb3BhID0gcmVxdWlyZSgnYXRyb3BhLWhlYWRlcicpO1xyXG5cclxuZnVuY3Rpb24gbGlua0RhdGEob2JqKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcbiAgICBPYmplY3Qua2V5cyhvYmouZGF0YSkuZmlsdGVyKGZ1bmN0aW9uIChwcm9wKSB7XHJcbiAgICAgICAgcmV0dXJuIHByb3AgIT09ICdyZXF1aXJlbWVudHMnO1xyXG4gICAgfSkuZm9yRWFjaChmdW5jdGlvbiAocHJvcCkge1xyXG4gICAgICAgIGF0cm9wYS5kYXRhW3Byb3BdID0gb2JqLmRhdGFbcHJvcF07XHJcbiAgICB9KTtcclxufVxyXG5cclxudmFyIEFyZ3NJbmZvID0gcmVxdWlyZSgnYXRyb3BhLUFyZ3NJbmZvJyk7XHJcbmxpbmtEYXRhKEFyZ3NJbmZvKTtcclxuYXRyb3BhLkFyZ3NJbmZvID0gQXJnc0luZm8uQXJnc0luZm87XHJcblxyXG52YXIgYXJyYXlzID0gcmVxdWlyZSgnYXRyb3BhLWFycmF5cycpO1xyXG5saW5rRGF0YShhcnJheXMpO1xyXG5hdHJvcGEuYXJyYXlzID0gYXJyYXlzLmFycmF5cztcclxuXHJcbnZhciBCYWJibGVyID0gcmVxdWlyZSgnYXRyb3BhLUJhYmJsZXInKTtcclxubGlua0RhdGEoQmFiYmxlcik7XHJcbmF0cm9wYS5CYWJibGVyID0gQmFiYmxlci5CYWJibGVyO1xyXG5cclxudmFyIENvb2tpZU1vbnN0ZXIgPSByZXF1aXJlKCdhdHJvcGEtQ29va2llTW9uc3RlcicpO1xyXG5saW5rRGF0YShDb29raWVNb25zdGVyKTtcclxuYXRyb3BhLkNvb2tpZU1vbnN0ZXIgPSBDb29raWVNb25zdGVyLkNvb2tpZU1vbnN0ZXI7XHJcblxyXG52YXIgQ3JlYXRlSHRtbERvY3VtZW50c0Zyb21YbWxodHRwID0gcmVxdWlyZSgnYXRyb3BhLUNyZWF0ZUh0bWxEb2N1bWVudHNGcm9tWG1saHR0cCcpO1xyXG5saW5rRGF0YShDcmVhdGVIdG1sRG9jdW1lbnRzRnJvbVhtbGh0dHApO1xyXG5hdHJvcGEuQ3JlYXRlSHRtbERvY3VtZW50c0Zyb21YbWxodHRwID0gQ3JlYXRlSHRtbERvY3VtZW50c0Zyb21YbWxodHRwLkNyZWF0ZUh0bWxEb2N1bWVudHNGcm9tWG1saHR0cDtcclxuXHJcbnZhciBjdXN0b21FcnJvcnMgPSByZXF1aXJlKCdhdHJvcGEtY3VzdG9tRXJyb3JzJyk7XHJcbmxpbmtEYXRhKGN1c3RvbUVycm9ycyk7XHJcbmF0cm9wYS5jdXN0b21FcnJvcnMgPSBjdXN0b21FcnJvcnMuY3VzdG9tRXJyb3JzO1xyXG5cclxudmFyIEhUTUxQYXJzZXIgPSByZXF1aXJlKCdhdHJvcGEtSFRNTFBhcnNlcicpO1xyXG5saW5rRGF0YShIVE1MUGFyc2VyKTtcclxuYXRyb3BhLkhUTUxQYXJzZXIgPSBIVE1MUGFyc2VyLkhUTUxQYXJzZXI7XHJcblxyXG52YXIgaW5qZWN0ID0gcmVxdWlyZSgnYXRyb3BhLWluamVjdCcpO1xyXG5saW5rRGF0YShpbmplY3QpO1xyXG5hdHJvcGEuaW5qZWN0ID0gaW5qZWN0LmluamVjdDtcclxuXHJcbnZhciBpbnF1aXJlID0gcmVxdWlyZSgnYXRyb3BhLWlucXVpcmUnKTtcclxubGlua0RhdGEoaW5xdWlyZSk7XHJcbmF0cm9wYS5pbnF1aXJlID0gaW5xdWlyZS5pbnF1aXJlO1xyXG5cclxudmFyIG9iamVjdHMgPSByZXF1aXJlKCdhdHJvcGEtb2JqZWN0cycpO1xyXG5saW5rRGF0YShvYmplY3RzKTtcclxuYXRyb3BhLm9iamVjdHMgPSBvYmplY3RzLm9iamVjdHM7XHJcblxyXG52YXIgcmFuZG9tID0gcmVxdWlyZSgnYXRyb3BhLXJhbmRvbScpO1xyXG5saW5rRGF0YShyYW5kb20pO1xyXG5hdHJvcGEucmFuZG9tID0gcmFuZG9tLnJhbmRvbTtcclxuXHJcbnZhciByZWdleCA9IHJlcXVpcmUoJ2F0cm9wYS1yZWdleCcpO1xyXG5saW5rRGF0YShyZWdleCk7XHJcbmF0cm9wYS5yZWdleCA9IHJlZ2V4LnJlZ2V4O1xyXG5cclxudmFyIHJlbW92ZU5vZGVCeVJlZmVyZW5jZSA9IHJlcXVpcmUoJ2F0cm9wYS1yZW1vdmVOb2RlQnlSZWZlcmVuY2UnKTtcclxubGlua0RhdGEocmVtb3ZlTm9kZUJ5UmVmZXJlbmNlKTtcclxuYXRyb3BhLnJlbW92ZU5vZGVCeVJlZmVyZW5jZSA9IHJlbW92ZU5vZGVCeVJlZmVyZW5jZS5yZW1vdmVOb2RlQnlSZWZlcmVuY2U7XHJcblxyXG52YXIgUmVxdWVzdGVyID0gcmVxdWlyZSgnYXRyb3BhLVJlcXVlc3RlcicpO1xyXG5saW5rRGF0YShSZXF1ZXN0ZXIpO1xyXG5hdHJvcGEuUmVxdWVzdGVyID0gUmVxdWVzdGVyLlJlcXVlc3RlcjtcclxuXHJcbnZhciBTZXJpYWxBY3RvciA9IHJlcXVpcmUoJ2F0cm9wYS1TZXJpYWxBY3RvcicpO1xyXG5saW5rRGF0YShTZXJpYWxBY3Rvcik7XHJcbmF0cm9wYS5TZXJpYWxBY3RvciA9IFNlcmlhbEFjdG9yLlNlcmlhbEFjdG9yO1xyXG5cclxudmFyIHNldEFzT3B0aW9uYWxBcmcgPSByZXF1aXJlKCdhdHJvcGEtc2V0QXNPcHRpb25hbEFyZycpO1xyXG5saW5rRGF0YShzZXRBc09wdGlvbmFsQXJnKTtcclxuYXRyb3BhLnNldEFzT3B0aW9uYWxBcmcgPSBzZXRBc09wdGlvbmFsQXJnLnNldEFzT3B0aW9uYWxBcmc7XHJcblxyXG52YXIgc3RyaW5nID0gcmVxdWlyZSgnYXRyb3BhLXN0cmluZycpO1xyXG5saW5rRGF0YShzdHJpbmcpO1xyXG5hdHJvcGEuc3RyaW5nID0gc3RyaW5nLnN0cmluZztcclxuXHJcbnZhciBUZXh0QW5hbHl6ZXIgPSByZXF1aXJlKCdhdHJvcGEtVGV4dEFuYWx5emVyJyk7XHJcbmxpbmtEYXRhKFRleHRBbmFseXplcik7XHJcbmF0cm9wYS5UZXh0QW5hbHl6ZXIgPSBUZXh0QW5hbHl6ZXIuVGV4dEFuYWx5emVyO1xyXG5cclxudmFyIHVybCA9IHJlcXVpcmUoJ2F0cm9wYS11cmwnKTtcclxubGlua0RhdGEodXJsKTtcclxuYXRyb3BhLnVybCA9IHVybC51cmw7XHJcblxyXG52YXIgd2FpdEZvciA9IHJlcXVpcmUoJ2F0cm9wYS13YWl0Rm9yJyk7XHJcbmxpbmtEYXRhKHdhaXRGb3IpO1xyXG5hdHJvcGEud2FpdEZvciA9IHdhaXRGb3Iud2FpdEZvcjtcclxuXHJcbnZhciB3dGYgPSByZXF1aXJlKCdhdHJvcGEtd3RmJyk7XHJcbmxpbmtEYXRhKHd0Zik7XHJcbmF0cm9wYS53dGYgPSB3dGYud3RmO1xyXG5cclxudmFyIHhwYXRoID0gcmVxdWlyZSgnYXRyb3BhLXhwYXRoJyk7XHJcbmxpbmtEYXRhKHhwYXRoKTtcclxuYXRyb3BhLnhwYXRoID0geHBhdGgueHBhdGg7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGF0cm9wYTsiXX0=
