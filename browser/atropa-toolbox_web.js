(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
atropa = require('../src/atropa-toolbox.js');
},{"../src/atropa-toolbox.js":37}],2:[function(require,module,exports){
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
 * @param {Array} fromB (minuend) The array with elements duplicated in <code>a</code>
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

},{"atropa-header":23,"atropa-inquire":3}],3:[function(require,module,exports){
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

},{"atropa-header":23}],4:[function(require,module,exports){
/// <reference path="../docs/vsdoc/OpenLayersAll.js"/>
/*jslint
    node: true
*/
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

},{"atropa-arrays":2,"atropa-customErrors":22,"atropa-header":23,"atropa-inquire":3}],5:[function(require,module,exports){
arguments[4][2][0].apply(exports,arguments)
},{"atropa-header":23,"atropa-inquire":6,"dup":2}],6:[function(require,module,exports){
arguments[4][3][0].apply(exports,arguments)
},{"atropa-header":23,"dup":3}],7:[function(require,module,exports){
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

},{"atropa-header":23}],8:[function(require,module,exports){
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
 * Regex patterns
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @namespace Regex patterns.
 */
atropa.regex.patterns = {
    /**
     * finds repeated words and phrases
     * @type RegExp
     */
    repeatedWords : /(\b.{3,}\b)\s*(\1)/g,
    /**
     * finds paragraph breaks
     * @type RegExp
     */
    paragraphBreaks : /(\r\n\r\n|\n\n|\r\r)/g,
    /**
     * finds line breaks
     * @type RegExp
     */
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

},{"atropa-header":23}],9:[function(require,module,exports){
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

},{"atropa-arrays":5,"atropa-header":23,"atropa-regex":8}],10:[function(require,module,exports){
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

},{"atropa-header":23,"atropa-random":7,"atropa-string":9}],11:[function(require,module,exports){
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
     * Removes a specified cookie by user submitted string.
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
     * Removes a specified cookie by user submitted cookieObj.
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

},{"atropa-header":23}],12:[function(require,module,exports){
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

},{"atropa-HTMLParser":13,"atropa-Requester":14,"atropa-header":23}],13:[function(require,module,exports){
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

},{"atropa-header":23}],14:[function(require,module,exports){
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
     * @type Object
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

},{"atropa-ArgsInfo":4,"atropa-header":23}],15:[function(require,module,exports){
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

},{"atropa-header":23}],16:[function(require,module,exports){
arguments[4][2][0].apply(exports,arguments)
},{"atropa-header":23,"atropa-inquire":17,"dup":2}],17:[function(require,module,exports){
arguments[4][3][0].apply(exports,arguments)
},{"atropa-header":23,"dup":3}],18:[function(require,module,exports){
arguments[4][8][0].apply(exports,arguments)
},{"atropa-header":23,"dup":8}],19:[function(require,module,exports){
arguments[4][9][0].apply(exports,arguments)
},{"atropa-arrays":16,"atropa-header":23,"atropa-regex":18,"dup":9}],20:[function(require,module,exports){
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

},{"atropa-arrays":16,"atropa-header":23,"atropa-setAsOptionalArg":30,"atropa-string":19}],21:[function(require,module,exports){
arguments[4][2][0].apply(exports,arguments)
},{"atropa-header":23,"atropa-inquire":25,"dup":2}],22:[function(require,module,exports){
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

},{"atropa-header":23}],23:[function(require,module,exports){
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


},{}],24:[function(require,module,exports){
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

},{"atropa-header":23,"atropa-setAsOptionalArg":30}],25:[function(require,module,exports){
arguments[4][3][0].apply(exports,arguments)
},{"atropa-header":23,"dup":3}],26:[function(require,module,exports){
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

},{"atropa-header":23}],27:[function(require,module,exports){
arguments[4][7][0].apply(exports,arguments)
},{"atropa-header":23,"dup":7}],28:[function(require,module,exports){
arguments[4][8][0].apply(exports,arguments)
},{"atropa-header":23,"dup":8}],29:[function(require,module,exports){
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

},{"atropa-header":23}],30:[function(require,module,exports){
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

},{"atropa-header":23}],31:[function(require,module,exports){
arguments[4][9][0].apply(exports,arguments)
},{"atropa-arrays":21,"atropa-header":23,"atropa-regex":28,"dup":9}],32:[function(require,module,exports){
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

},{"atropa-header":23}],33:[function(require,module,exports){
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

},{"atropa-header":23,"atropa-setAsOptionalArg":30}],34:[function(require,module,exports){
module.exports={
  "adapt": "adopt",
  "adaptation": "adaption",
  "adapted": "adopted",
  "administer": "minister",
  "admittance": "admission",
  "advice": "bullshit",
  "aesthetic": "ascetic",
  "affect": "effect",
  "agreement": "agreeance",
  "aid": "aide",
  "aide": "aid",
  "air": "err",
  "aisle": "isle",
  "all": "ball",
  "allowed": "aloud",
  "allude": "refer",
  "alone": "ecstatic",
  "aloud": "allowed",
  "alternate": "alternative",
  "always love you the same": "always love you like my other suckers",
  "always": "usually",
  "am i": "are i",
  "ambiguous": "ambivalent",
  "amidst": "all up in",
  "amongst": "among",
  "analysis": "analyzation",
  "ancient": "elderly",
  "anecdote": "antidote",
  "angel": "wrestler",
  "angelic demon": "villanous wrestler",
  "ant": "aunt",
  "anyways": "anywise",
  "apocalypse": "party time",
  "appraise": "apprise",
  "apropos": "appropriate",
  "arc": "ark",
  "arcane": "foolish",
  "arduous": "not easy",
  "ark": "arc",
  "as well": "also",
  "asphixiate": "finixiate",
  "assure": "ensure",
  "astigmatism": "stigmatism",
  "ate": "eight",
  "attached": "attacked",
  "attic": "anus",
  "audition": "auction",
  "aunt": "ant",
  "aura": "stench",
  "avenge": "git rowdy for",
  "awe": "fearful reverence",
  "baby if": "look bitch,",
  "back stab": "rump shake",
  "back stabb": "rump shake",
  "bad": "mad",
  "badly": "poorly",
  "bagel": "baby",
  "bah": "bag",
  "balanced individual": "psycho",
  "balanced man": "psycho",
  "balanced person": "psycho",
  "balanced woman": "psycho",
  "ball": "all",
  "ballad": "salad",
  "banners": "manners",
  "bare": "bear",
  "base": "bass",
  "bass": "base",
  "battle": "squabble",
  "bay": "sink",
  "be together": "mash up",
  "be": "bee",
  "beach": "beech",
  "beans": "jeans",
  "bear": "bare",
  "beast": "erection",
  "beat": "beet",
  "beaurocrats": "beaurocraps",
  "beautiful face": "enormous feet",
  "beautiful": "gaudy",
  "bedding": "wedding",
  "bee": "be",
  "beech": "beach",
  "beet": "beat",
  "behold": "oogle",
  "believe": "buy",
  "bells": "wells",
  "belly": "jelly",
  "berry": "bury",
  "berth": "birth",
  "best": "adequate",
  "betray": "catfish",
  "betrayal": "game",
  "big brother": "my paranoia",
  "bind": "coddle",
  "bionic": "bisontonical",
  "birth": "berth",
  "bite": "byte",
  "black": "yellow",
  "blackened walls": "filthy rooms",
  "blade": "handle",
  "bleed": "whine",
  "blessed be": "suck eggs",
  "blew": "blue",
  "blood": "grease",
  "blow": "crow",
  "blue": "blew",
  "blushing": "crushing",
  "boar": "bre",
  "bodies": "jiggling piles",
  "body": "jiggling clump",
  "bore": "boar",
  "bough": "bow",
  "bought": "boughten",
  "bound": "coddled",
  "bowel": "foul",
  "bowl": "soul",
  "boy meets girl": "rubber meets road",
  "brake": "break",
  "bread": "bred",
  "break": "beat",
  "breath": "awkward pause",
  "breathe": "pause awkwardly",
  "breeze": "draft",
  "brilliance": "shinyness",
  "brilliant": "shiny",
  "bring forth": "whip out",
  "brink": "border",
  "broach": "brooch",
  "broke": "beat",
  "broken": "beaten",
  "brows": "browse",
  "bubbling": "babbling",
  "bunny": "money",
  "buoy": "boy",
  "burrow": "burro",
  "bury": "berry",
  "busy": "dizzy",
  "butterfly": "flutter by",
  "buy": "by",
  "by her side": "on her back",
  "by his side": "on his back",
  "by my side": "on my back",
  "by your side": "on your back",
  "bye": "eye",
  "byte": "bite",
  "can't be without": "touch myself about",
  "can't find the words to say": "could blurt out some dumb shit",
  "can't live without": "touch myself about",
  "candle": "glowstick",
  "capture": "captivate",
  "care to give": "shit to give",
  "care": "give a shit",
  "cared": "gave a shit",
  "careen": "career",
  "caring": "giving a shit",
  "castle": "chateau",
  "caustic": "crastic",
  "cell": "sell",
  "cent": "sent",
  "cereal": "serial",
  "change one thing": "ruin everything",
  "cheek": "rump",
  "chili": "chilly",
  "chinese": "children",
  "chip": "flip",
  "chord": "cord",
  "christ": "John Doe jr",
  "chromosomes": "kromo-stones",
  "cite": "site",
  "civic": "civil",
  "classic": "classical",
  "cliff-hanger": "cliff-dweller",
  "close": "clothes",
  "cloud": "balloon",
  "coffin": "tobogan",
  "cold": "fuzzy",
  "collaborate": "corroborate",
  "collected": "collective",
  "college": "collage",
  "comedic": "comical",
  "commentate": "comment",
  "complement": "compliment",
  "comprehension": "apprehension",
  "comprised": "composed",
  "concentration": "consecration",
  "confiscate": "confisticate",
  "conscientious": "conscious",
  "consume": "suck",
  "consuming": "sucking",
  "control": "patrol",
  "converse": "conversate",
  "coop": "coupe",
  "cop porn": "popcorn",
  "corpse": "mannequin",
  "corpuscles": "corpsuckels",
  "correct": "catrectal",
  "could do anything": "embracing mania",
  "could never be without": "can't function without",
  "council": "counsel",
  "country": "bathroom",
  "coupe": "coop",
  "coupon": "puke on",
  "crack": "mend",
  "creak": "creek",
  "credible": "credulous",
  "cremated": "incremented",
  "crews": "cruise",
  "cried": "came",
  "cries": "comes",
  "crimson": "azure",
  "critique": "criticize",
  "crock": "crack",
  "crow": "blow",
  "cruel": "haphazard",
  "crushing": "blushing",
  "cry": "coming",
  "crying": "coming",
  "crypt": "urinal",
  "cryptic": "drunken",
  "crystal": "bedazler",
  "cunning": "desperate",
  "curse": "stain",
  "cut": "mutilate",
  "damn": "donut",
  "damp": "stamp",
  "dangerous": "con catching",
  "dark": "effervescent",
  "day": "morning",
  "daydream": "fantasize",
  "dead": "inert",
  "deadly": "fertile",
  "dealer": "stealer",
  "dear": "schmuck",
  "death": "Santa",
  "debutantes": "posh ladies",
  "deep down inside": "in the bottom of the tank",
  "demi-god": "mad plumber",
  "demigod": "mad plumber",
  "demon": "hard-on",
  "demonic angel": "bad contradiction",
  "depreciate": "deprecate",
  "depressed": "drunk",
  "depressing": "inebriating",
  "depression": "so much booze",
  "derogatory": "suppository",
  "destiny": "taxes",
  "deterrent": "detergent",
  "die": "make marshmallows",
  "died": "made marshmallows",
  "dies": "makes marshmallows",
  "different": "awkward",
  "disinterested": "uninterested",
  "disney": "divorce",
  "dissension": "dysentery",
  "dissenting": "descending",
  "distinguished": "extinguished",
  "dizzy": "busy",
  "do": "dew",
  "doctoral": "doctorial",
  "doe": "dough",
  "doesn't happen over": "cartwheels straight across",
  "don't have a clue": "got shit twisted",
  "don't need": "could give a fuck about",
  "dramatic": "dramatical",
  "dream": "obsess",
  "dreamland": "obsession island",
  "dreams": "obsessions",
  "dribble": "drivel",
  "drift": "him-haw",
  "dual": "duel",
  "dude": "doodie",
  "dying": "making marshmallows",
  "dysentery": "dissension",
  "ears": "tears",
  "ease": "tease",
  "ecology": "ecrology",
  "effect": "affect",
  "egoist": "egotist",
  "eight": "ate",
  "elder": "old folk",
  "elective": "electoral",
  "eleviate": "elebate",
  "emotion": "lubricant",
  "emotional": "childish",
  "empathy": "sympathy",
  "empty": "bloated",
  "endless": "real long",
  "energy": "juice",
  "enormity": "immensity",
  "ensure": "insure",
  "entered the house of": "got up in the barn for",
  "entrepreneur": "entramanore",
  "erogenous": "geronimous",
  "err": "air",
  "escape": "snuggle",
  "etched": "ground",
  "eternal": "imagined",
  "eternally": "for a bit",
  "eternity": "awhile",
  "ewe": "you",
  "existence": "whatever",
  "eye": "bye",
  "face": "race",
  "fade": "him-haw",
  "fair": "fare",
  "fairy": "ferry",
  "fall on deaf ears": "fall on death ears",
  "fall": "flop",
  "fanatic": "phonetic",
  "fang": "denture",
  "farewell": "adios",
  "farther": "further",
  "fate": "coincidence",
  "faze": "phase",
  "feast": "beast",
  "feat": "feet",
  "feel": "fondle",
  "fell": "flopped",
  "feminine": "femine",
  "fight in your race": "right in your face",
  "fight": "right",
  "fingers": "sausage",
  "fingertips": "chicken nuggets",
  "fir": "fur",
  "first laid eyes on": "first tried groping",
  "first of all": "mm-kay",
  "fish": "wish",
  "flags": "hags",
  "flammable": "inflammable",
  "flaunt": "flout",
  "flea": "flee",
  "flesh": "twinkie",
  "fleshout": "flushout",
  "flew": "flu",
  "flip": "chip",
  "flounder": "founder",
  "flour": "flower",
  "flung": "hung",
  "flutter by": "butterfly",
  "for all intents and purposes": "for all intensive purposes",
  "for he": "this dumb mother fucker",
  "for no reason": "maiacally",
  "for she": "'cause the cunt",
  "for": "four",
  "foreplay": "floorplay",
  "forest": "campground",
  "forever": "so very",
  "forget": "disremember",
  "form": "warm",
  "formally": "formerly",
  "forth": "fourth",
  "fortuitous": "fortunate",
  "foul": "bowel",
  "fragile": "sturdy",
  "frustrated": "flustrated",
  "fuck": "fridge",
  "full of life": "full of shit",
  "funeral": "venereal",
  "gall": "garlic",
  "gangster": "hamster",
  "gansta": "hamsta",
  "garage": "grave",
  "gave up on": "don't give a fuck about",
  "gentle": "genital",
  "ghost": "imaginary friend",
  "girl meets boy": "adolescent mistakes",
  "give up on": "won't give a fuck about",
  "given a choice": "extorted",
  "given up on": "don't give a fuck about",
  "giving up on": "ain't givin a fuck about",
  "god": "John Doe sr",
  "goddess": "Jane Doe",
  "gods": "John Doe sr et al.",
  "golden ray": "gaudy scribble",
  "good bye": "fuck off",
  "good": "well",
  "good-bye": "fuck off",
  "goodbye": "fuck off",
  "gorilla": "guerrilla",
  "got in your way": "tried to trap you",
  "grave": "personal space",
  "gravestone": "mile marker",
  "growing apart": "getting bored",
  "guess it doesn't matter": "know this shit is pointless",
  "gynecologist": "groinacologist",
  "had done": "done did",
  "hags": "flags",
  "hair": "hare",
  "hall": "haul",
  "halve": "have",
  "hand in hand": "foot in shoe",
  "hand to hold": "steak to eat",
  "hate": "dislike",
  "hatred": "odium",
  "haunt": "stalk",
  "hay": "hey",
  "heal": "heel",
  "healer": "fondler",
  "hearing": "earring",
  "heart": "crotch",
  "heartbeat": "crotch fire",
  "heaven": "sky",
  "heavens": "skies",
  "hell": "Antarctica",
  "hellfire": "hemorrhoid",
  "hi": "high",
  "hick": "sick",
  "hidden": "stashed",
  "higher power": "crusty sock",
  "hiss and lear": "listen here",
  "hissed": "missed",
  "historic": "historical",
  "history": "mystery",
  "hoarse": "horse",
  "holding them close to": "handcuffing them to",
  "hole": "whole",
  "holey": "holy",
  "honein": "homein",
  "hopeless": "pitiful",
  "horizontal": "Vertizontal",
  "horses": "hornets",
  "hottie": "hogtie",
  "hour": "our",
  "house": "tent",
  "human race": "gerbil empire",
  "hung": "flung",
  "hungry": "horny",
  "hypodemic needle": "hypodermic nurdle",
  "hysterical": "hilarious",
  "i am": "i are",
  "I couldn't care less": "I could care less",
  "i": "Kevin",
  "i'll": "i will",
  "i'm": "i are",
  "i've never felt this way": "i've done this",
  "i've": "i have",
  "illumination": "mumbo jumbo",
  "illusion": "drunken mistake",
  "im": "i'm",
  "immortal": "whiny",
  "imply": "infer",
  "in the middle of": "all up in",
  "incantation": "much yammering",
  "incense": "incest",
  "incidents": "instance",
  "infinite": "abstract",
  "ingenuous": "ingenious",
  "insensible": "insensitive",
  "install": "instill",
  "insulation": "installation",
  "intense": "intensive",
  "interior": "inferior",
  "interment": "internment",
  "interpret": "interpretate",
  "intimate": "iminent",
  "into the light": "on to the light",
  "intuition": "intermission",
  "invite": "knife",
  "isle": "aisle",
  "it must be true": "for real 'n' shit",
  "it's a dog-eat-dog world": "it's a doggy dog world",
  "jeans": "beans",
  "jelly beans": "belly jeans",
  "jelly": "belly",
  "jesus christ": "John Doe jr",
  "jesus": "John Doe jr",
  "jetlag": "jetlock",
  "jump": "dump",
  "just": "sure",
  "kiss": "slap",
  "kissing other": "going down on",
  "knead": "need",
  "knew": "got",
  "knife": "dildo",
  "knight": "night",
  "knot": "not",
  "know": "get",
  "knowledge": "trivia",
  "known": "got",
  "lack": "pack",
  "later": "latter",
  "lay": "lie",
  "laying in bed": "taking a shit",
  "laying on the floor": "begging for it",
  "lead": "speed",
  "leave her side": "get off her ass",
  "leave his side": "get off his ass",
  "leave my side": "get off my ass",
  "leave your side": "get off your ass",
  "leave": "let",
  "leopard": "shepherd",
  "lessen": "lesson",
  "liar": "fibber",
  "liberation": "lubrication",
  "lie": "fib",
  "lies": "fibs",
  "light": "spite",
  "lighted": "lit",
  "listen here": "hiss and lear",
  "loan": "lone",
  "lone": "single",
  "loneliness": "arousal",
  "lonely": "horny",
  "look back": "lick windows",
  "look into her eyes": "give her diseases",
  "look into his eyes": "give him diseases",
  "look into their eyes": "give them diseases",
  "loose": "lose",
  "lose": "shake",
  "lost": "aroused",
  "love": "confuse",
  "loving": "shoving",
  "luxuriant": "luxurious",
  "mad": "bad",
  "made": "maid",
  "magic": "hope",
  "magick": "delusion",
  "manners": "banners",
  "marry": "merry",
  "martial": "marshal",
  "mask": "trashbag",
  "massacres": "mascaras",
  "masseuse": "masseur",
  "mazeltov": "molotov",
  "me": "i",
  "means many things": "is best described with lies",
  "meat": "meet",
  "median": "medium",
  "meditate": "menstruate",
  "medium": "median",
  "meet again": "have another go-round",
  "melting": "smelting",
  "memorial": "memorium",
  "memoriam": "memorial",
  "mend": "send",
  "mescaline": "masculine",
  "midnight": "daybreak",
  "midst": "pants",
  "might as well": "oh fuck I oughtta",
  "militant": "maniacal",
  "military": "gangster",
  "militia": "gang",
  "mine": "i's",
  "minion": "horny pirate",
  "minorities": "minororities",
  "minors": "miners",
  "minstrel": "menstrual",
  "mischievous": "mischievious",
  "missed": "hissed",
  "money": "bunny",
  "monster": "dislexic lover",
  "moon": "night light",
  "moonlight": "moonshine",
  "mortal": "queer",
  "most people can only": "most freaks and dope fiends",
  "mustered": "mustard",
  "my lord": "sweet palm",
  "my": "i's ",
  "myself": "my muchness",
  "mysteries": "neon signs",
  "mystery": "neon sign",
  "mystic": "alcoholic",
  "nails": "tails",
  "naked": "unshaved",
  "needle": "nurdle",
  "never end": "drag on",
  "never ending": "relentless",
  "never going": "fucked for trying",
  "never thought you would do that": "got turned out like a dumb fuck",
  "neverending": "never ending",
  "nick": "pick",
  "night": "bedtime",
  "nightmare": "tantrum",
  "no matter": "irregardless of",
  "no tails": "toe nails",
  "nomad": "drunk hobo",
  "none": "nun",
  "not strong enough": "ain't got the nuts",
  "nothing is assured": "we live to deliver",
  "novelty quickly wears off": "dumb shit gits old fast",
  "now at an end": "brand spankin new",
  "o": "uh",
  "o'": "uh",
  "obtain": "get",
  "ocean": "sewer",
  "oh": "owe",
  "one": "won",
  "only wanted": "begged for",
  "oppress": "repress",
  "orient": "orientate",
  "ostensibly": "ostensively",
  "our": "their",
  "ours": "theirs",
  "out": "shout",
  "outward appearance": "facade",
  "overdo": "overdue",
  "oversee": "overlook",
  "pack": "lack",
  "paid": "laid",
  "pail": "pale",
  "pain": "lethargy",
  "pale": "sexy",
  "paralysis": "paralyzation",
  "parameters": "perimeters",
  "passion": "delirium",
  "passionate": "delirious",
  "path": "sidewalk",
  "peace": "piece",
  "peak": "peek",
  "pen": "penis",
  "perfect": "fucked",
  "persecute": "execute",
  "perspective": "prospective",
  "perspire": "expire",
  "pervert": "orevert",
  "petal": "dingleberry",
  "phone": "thong",
  "piece by piece": "chortle by chortle",
  "pillow": "stone",
  "plain": "plane",
  "poem": "scribble",
  "poet": "hobo",
  "poetic": "flatulent",
  "poetry": "bad gas",
  "pole": "poll",
  "poor": "pour",
  "popcorn": "cop porn",
  "practical": "practicle",
  "practice": "practise",
  "pray": "murmur",
  "pre-marital": "premartial",
  "prearranged": "prederranged",
  "precede": "proceed",
  "precipitate": "precipitous",
  "prescribe": "proscribe",
  "principal": "principle",
  "prison": "outhouse",
  "problem": "useless concern",
  "promise": "lie",
  "prophecies": "wives tales",
  "prophecy": "wives tale",
  "prophet": "insomniac",
  "prostate": "prostrate",
  "puke on": "coupon",
  "put up with": "manhandle",
  "putrid": "pleasant",
  "qualifications": "qualifidations",
  "quest": "stroll",
  "quiet": "quite",
  "race": "face",
  "rain": "spunk",
  "rainbow": "pizzazz",
  "rap": "wrap",
  "rape": "what",
  "raping": "what",
  "rare": "rarified",
  "rationale": "rationalization",
  "ravaging": "ravishing",
  "raven": "pigeon",
  "ravishing": "ravenous",
  "ray": "scribble",
  "razor": "dildo",
  "razorblade": "butt plug",
  "reactionary": "reactive",
  "real": "reel",
  "reality": "toilet bowl",
  "rebelling": "revolting",
  "rebut": "refute",
  "reckless": "wreckless",
  "refute": "refudiate",
  "regardless": "irregardless",
  "regretfully": "regrettably",
  "regurgitate": "detergerate",
  "rehabilitate": "debilitate",
  "releave": "relive",
  "remember": "mumble",
  "repel": "repulse",
  "repute": "refute",
  "rest in peace": "party like it's 1999",
  "riddle": "polka dot",
  "right": "fight",
  "righteous": "arrogant",
  "ring": "wring",
  "ritual": "banana dance",
  "role": "roll",
  "rose": "anus",
  "sad": "impotent",
  "sadd": "flaccid",
  "saddened": "made flaccid",
  "sadness": "impotence",
  "sail": "sale",
  "salad": "ballad",
  "salient": "saline",
  "sanitarium": "saniquarium",
  "save": "wave",
  "scapegoat": "escape goat",
  "scar": "stria",
  "scare": "tickle",
  "scarred": "striated",
  "scars": "striae",
  "scary": "tickly",
  "scene": "seen",
  "scream": "grunt",
  "sea": "bath",
  "seal": "heal",
  "seam": "seem",
  "segue": "segway",
  "self esteem": "self of steam",
  "self-depreciating": "self-deficating",
  "selfish": "thieving",
  "send": "mend",
  "sense": "since",
  "set the mood": "whip it out",
  "shake": "take",
  "shall": "should-will",
  "shelled": "unshelled",
  "shepherd": "leopard",
  "shine": "bling",
  "shooting star": "swift missile",
  "shout": "out",
  "shoving": "loving",
  "shower": "tower",
  "sick": "hick",
  "since": "sense",
  "site": "sight",
  "skin": "biscuits",
  "slash": "mutilate",
  "slave": "gimp",
  "slice": "pet",
  "slit": "crevice",
  "so good": "neato",
  "so mote it be": "it's real in my head",
  "so nervous": "so fucking drunk",
  "so": "sew",
  "soar": "sore",
  "social": "societal",
  "soil": "toil",
  "soldier": "maniac",
  "sole": "soul",
  "solitude": "ambiance",
  "some": "sum",
  "sons": "tons",
  "soon": "slutty",
  "sorrow": "whimper",
  "soul": "banana",
  "speak of": "talk about",
  "specially": "especially",
  "speed": "lead",
  "spirit": "banana",
  "spiritual": "banana craving",
  "spite": "light",
  "spread": "sores",
  "spring": "tube socks",
  "stamp": "damp",
  "stand out from the crowd": "look like a jackass",
  "standing out from the crowd": "wobbling like an elephant on a bicycle",
  "stands out from the crowd": "smells like old dick",
  "star": "missile",
  "stature": "statue",
  "steal": "steel",
  "stealer": "dealer",
  "steel": "latex",
  "stood out from the crowd": "jiggled like a jello Santa",
  "stop": "push",
  "stopp": "push",
  "storm": "orgy",
  "strategies": "tragedies",
  "studying": "studding",
  "substantial": "substantive",
  "suffer": "pirouette",
  "suicide": "murder",
  "sun": "yellow disk",
  "sunny": "sweltering",
  "supposedly": "supposably",
  "sweat": "fart",
  "sword": "dildo",
  "synchronize": "sympathize",
  "tail": "tale",
  "take care of": "decimate",
  "take care": "forget",
  "take": "shake",
  "takes care": "forgets",
  "taking care": "forgeting",
  "talk": "cuss",
  "taste": "waste",
  "taunt": "taut",
  "tear": "spunk",
  "teardrop": "tear drop",
  "tears": "ears",
  "tease": "ease",
  "tell you i'm fine": "screm I'M FUCKIN OK",
  "tenant": "tenet",
  "tenets": "tenants",
  "term": "worm",
  "testament": "tentacle",
  "the best": "the baddest",
  "the first moment": "straightaway",
  "the only one": "fucking stupid",
  "the point of no return": "the stranger's sex dungeon",
  "the spring": "tube sock",
  "the way it is": "how it be",
  "thee": "you",
  "their": "there",
  "therefor": "therefore",
  "thine": "you's",
  "think": "scheme",
  "thorough": "thoroughgoing",
  "thou": "you",
  "throne": "throb",
  "through your hair": "upside your head",
  "thusly": "thus",
  "time": "throbbing",
  "to a better": "for some glittered",
  "to get away": "to fucking run",
  "to no avail": "for great good",
  "to the light": "out in public",
  "toe": "tow",
  "toil": "soil",
  "toilet": "terlit",
  "tons": "sons",
  "too good to be true": "fucking fantastic",
  "torment": "tickle",
  "torn": "huggled",
  "tornado": "tomato",
  "touch": "grope",
  "tout": "taut",
  "toward": "towards",
  "tower": "shower",
  "tragedies": "strategies",
  "trampoline": "trampaloon",
  "truth": "trivia",
  "try": "shoot",
  "tupperware": "underwear",
  "twas": "it was",
  "twilight": "moonshine",
  "twinkle": "strobe",
  "twinkling": "strobing",
  "ulterior": "alterior",
  "uncaring": "prickish",
  "unconscious": "unconscience",
  "understand": "stroke my ego",
  "uniform": "unicorn",
  "united": "untied",
  "universe": "toilet bowl",
  "unparalled": "unparalyzed",
  "unparalleled": "unparalyzed",
  "untied": "united",
  "upmost": "utmost",
  "upped the ante": "upped the annie",
  "us": "them",
  "usage": "use",
  "utilize": "use",
  "vacation": "vocation",
  "valley": "ditch",
  "vampire": "pedophile",
  "vampiric": "pedophilic",
  "vampyre": "pedophyle",
  "vary": "very",
  "veil": "disguise",
  "venge": "-rowdy-",
  "vengeance": "slap happiness",
  "verbiage": "verbage",
  "vericose": "very close",
  "vice versa": "ipso fatso",
  "viola": "voila",
  "violence": "violins",
  "virtue": "virgin",
  "viscious cycle": "clusterfuck",
  "viscous circle": "vicious cycle",
  "vista": "scene",
  "void": "bucket",
  "voluptuous": "volumptuous",
  "wail": "whale",
  "waist": "waste",
  "wait": "weight",
  "walk out": "narrowly escape",
  "walked out": "narrowly escaped",
  "walking out": "narrowly escaping",
  "wander": "stumble",
  "war": "wore",
  "warfare": "children laughing",
  "warm": "form",
  "warn": "worn",
  "warrantee": "warranty",
  "warrior": "kitten",
  "wary": "weary",
  "was i": "were i",
  "waste": "taste",
  "wave": "save",
  "way": "weigh",
  "wayside": "wasteside",
  "we": "they",
  "weak": "week",
  "weapon": "cap gun",
  "weary": "leery",
  "weather": "whether",
  "wedding": "bedding",
  "week": "weed",
  "wells": "bells",
  "werewolf": "weirdwolf",
  "whales": "sails",
  "what people say": "muthaphukkas be talkin",
  "what's the point": "the fucks this mean",
  "which": "witch",
  "wield": "jerk",
  "will always be there": "stick like wet shit",
  "will be there": "stick like shit",
  "will not heal": "festers",
  "wind": "blow",
  "wisdom": "bull shit",
  "wise": "bull shitting",
  "wish": "want",
  "with every fiber": "from pithy pits",
  "woe": "chlamydia",
  "won't make it through": "could shimmy past",
  "world": "hand towel",
  "worm": "term",
  "worse comes to worst": "worst comes to worst",
  "worthwhile": "worthwild",
  "wound": "ouchie",
  "wretch": "skeeze",
  "wretched": "skeezy",
  "write": "scrawl",
  "written": "scrawled",
  "wrong": "buzzing",
  "wrote": "scrawled",
  "yet": "immediately",
  "you all": "all you",
  "you were the one": "you were my target",
  "you": "Dummie's",
  "you'll": "you will",
  "you're": "you is",
  "you've": "you has",
  "your": "you's",
  "yours": "you's",
  "yourself": "you's muchness",
  "zebras": "zeberellas",
  "zucchini": "cuisini"
}

},{}],35:[function(require,module,exports){
/// <reference path="../docs/vsdoc/OpenLayersAll.js"/>
/*jslint
    node: true
*/
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
    'use strict';
    atropa.requires('wtf', function () {
        var supported = true;
        [
            atropa.regex,
            atropa.string.countWords,
            atropa.setAsOptionalArg
        ].forEach(function (prerequisite) {
            if (prerequisite === undefined) {
                supported = false;
            }
        });
        return supported;
    });
}());
(function () {
    'use strict';
    atropa.requires('wtfHtmlElement', function () {
        var supported = true;
        [window].forEach(function (prerequisite) {
            if (prerequisite === undefined) {
                supported = false;
            }
        });
        return supported;
    });
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
atropa.wtf.dictionary = require('./atropa-wtf-dictionary.json');
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
    'use strict';
    atropa.supportCheck('wtf');
    var regexValue, replacementText, oldWord, wtfCount, wordCount, ret, word;
    if (true !== outputHTML) {
        outputHTML = false;
    }
    ret = {};
    wtfCount = 0;
    target = target.trim();
    wordCount = atropa.string.countWords(target);
    if (true === outputHTML) {
        target = target.replace(/(\. ?){2,}/gi, '<span style="color : brown ;"> [shit taco] </span>');
        target = '<p> ' + target.replace(/(\r\n|\r|\n)/g, ' <br/> ') + ' </p>';
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
    /*jslint unparam: true*/
    replacementText = function (m, sub1, sub2) {
        wtfCount++;
        sub1 = atropa.setAsOptionalArg('', sub1);
        sub2 = atropa.setAsOptionalArg('', sub2);
        var out;
        if (true === outputHTML) {
            out = '<span style="color : red ;">' + sub1 + atropa.wtf.dictionary[word] + sub2 + '</span>';
        } else {
            out = sub1 + atropa.wtf.dictionary[word] + sub2;
        }
        return out;
    };
    /*jslint unparam: false*/
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
    'use strict';
    atropa.supportCheck('wtfHtmlElement');
    var wtfified, txt;
    elementReference.innerHTML = elementReference.innerHTML.replace(/<br>(\s+)?(\r\n|\r|\n)?/g, '\r\n');
    txt = elementReference.value || elementReference.textContent;
    wtfified = atropa.wtf.wtfify(txt, true);
    elementReference.innerHTML = '<pre style="color:black; background:white; white-space:pre-wrap;">' + wtfified.txt + '</pre>';
    return elementReference;
};
while (atropa.data.requirements.length > 0) {
    atropa.data.requirements.pop()();
}
module.exports = atropa;
},{"./atropa-wtf-dictionary.json":34,"atropa-header":23,"atropa-regex":28,"atropa-setAsOptionalArg":30,"atropa-string":31}],36:[function(require,module,exports){
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

},{"atropa-header":23,"atropa-removeNodeByReference":29,"atropa-setAsOptionalArg":30}],37:[function(require,module,exports){
/// <reference path="../docs/vsdoc/OpenLayersAll.js"/>
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
},{"atropa-ArgsInfo":4,"atropa-Babbler":10,"atropa-CookieMonster":11,"atropa-CreateHtmlDocumentsFromXmlhttp":12,"atropa-HTMLParser":13,"atropa-Requester":14,"atropa-SerialActor":15,"atropa-TextAnalyzer":20,"atropa-arrays":21,"atropa-customErrors":22,"atropa-header":23,"atropa-inject":24,"atropa-inquire":25,"atropa-objects":26,"atropa-random":27,"atropa-regex":28,"atropa-removeNodeByReference":29,"atropa-setAsOptionalArg":30,"atropa-string":31,"atropa-url":32,"atropa-waitFor":33,"atropa-wtf":35,"atropa-xpath":36}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvYnJvd3Nlck1haW4uanMiLCJub2RlX21vZHVsZXMvYXRyb3BhLUFyZ3NJbmZvL25vZGVfbW9kdWxlcy9hdHJvcGEtYXJyYXlzL3NyYy9hdHJvcGEtYXJyYXlzLmpzIiwibm9kZV9tb2R1bGVzL2F0cm9wYS1BcmdzSW5mby9ub2RlX21vZHVsZXMvYXRyb3BhLWlucXVpcmUvc3JjL2F0cm9wYS1pbnF1aXJlLmpzIiwibm9kZV9tb2R1bGVzL2F0cm9wYS1BcmdzSW5mby9zcmMvYXRyb3BhLUFyZ3NJbmZvLmpzIiwibm9kZV9tb2R1bGVzL2F0cm9wYS1CYWJibGVyL25vZGVfbW9kdWxlcy9hdHJvcGEtcmFuZG9tL3NyYy9hdHJvcGEtcmFuZG9tLmpzIiwibm9kZV9tb2R1bGVzL2F0cm9wYS1CYWJibGVyL25vZGVfbW9kdWxlcy9hdHJvcGEtcmVnZXgvc3JjL2F0cm9wYS1yZWdleC5qcyIsIm5vZGVfbW9kdWxlcy9hdHJvcGEtQmFiYmxlci9ub2RlX21vZHVsZXMvYXRyb3BhLXN0cmluZy9zcmMvYXRyb3BhLXN0cmluZy5qcyIsIm5vZGVfbW9kdWxlcy9hdHJvcGEtQmFiYmxlci9zcmMvYXRyb3BhLUJhYmJsZXIuanMiLCJub2RlX21vZHVsZXMvYXRyb3BhLUNvb2tpZU1vbnN0ZXIvc3JjL2F0cm9wYS1Db29raWVNb25zdGVyLmpzIiwibm9kZV9tb2R1bGVzL2F0cm9wYS1DcmVhdGVIdG1sRG9jdW1lbnRzRnJvbVhtbGh0dHAvc3JjL2F0cm9wYS1DcmVhdGVIdG1sRG9jdW1lbnRzRnJvbVhtbGh0dHAuanMiLCJub2RlX21vZHVsZXMvYXRyb3BhLUhUTUxQYXJzZXIvc3JjL2F0cm9wYS1IVE1MUGFyc2VyLmpzIiwibm9kZV9tb2R1bGVzL2F0cm9wYS1SZXF1ZXN0ZXIvc3JjL2F0cm9wYS1SZXF1ZXN0ZXIuanMiLCJub2RlX21vZHVsZXMvYXRyb3BhLVNlcmlhbEFjdG9yL3NyYy9hdHJvcGEtU2VyaWFsQWN0b3IuanMiLCJub2RlX21vZHVsZXMvYXRyb3BhLVRleHRBbmFseXplci9zcmMvYXRyb3BhLVRleHRBbmFseXplci5qcyIsIm5vZGVfbW9kdWxlcy9hdHJvcGEtY3VzdG9tRXJyb3JzL3NyYy9hdHJvcGEtY3VzdG9tRXJyb3JzLmpzIiwibm9kZV9tb2R1bGVzL2F0cm9wYS1oZWFkZXIvc3JjL2F0cm9wYS1oZWFkZXIuanMiLCJub2RlX21vZHVsZXMvYXRyb3BhLWluamVjdC9zcmMvYXRyb3BhLWluamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9hdHJvcGEtb2JqZWN0cy9zcmMvYXRyb3BhLW9iamVjdHMuanMiLCJub2RlX21vZHVsZXMvYXRyb3BhLXJlbW92ZU5vZGVCeVJlZmVyZW5jZS9zcmMvYXRyb3BhLXJlbW92ZU5vZGVCeVJlZmVyZW5jZS5qcyIsIm5vZGVfbW9kdWxlcy9hdHJvcGEtc2V0QXNPcHRpb25hbEFyZy9zcmMvYXRyb3BhLXNldEFzT3B0aW9uYWxBcmcuanMiLCJub2RlX21vZHVsZXMvYXRyb3BhLXVybC9zcmMvYXRyb3BhLXVybC5qcyIsIm5vZGVfbW9kdWxlcy9hdHJvcGEtd2FpdEZvci9zcmMvYXRyb3BhLXdhaXRGb3IuanMiLCJub2RlX21vZHVsZXMvYXRyb3BhLXd0Zi9zcmMvYXRyb3BhLXd0Zi1kaWN0aW9uYXJ5Lmpzb24iLCJub2RlX21vZHVsZXMvYXRyb3BhLXd0Zi9zcmMvYXRyb3BhLXd0Zi5qcyIsIm5vZGVfbW9kdWxlcy9hdHJvcGEteHBhdGgvc3JjL2F0cm9wYS14cGF0aC5qcyIsInNyYy9hdHJvcGEtdG9vbGJveC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1YUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDck9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9NQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6U0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN1VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeklBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ25XQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUMxS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUN0UUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ3hUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ2xEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9HQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNzZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25PQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJhdHJvcGEgPSByZXF1aXJlKCcuLi9zcmMvYXRyb3BhLXRvb2xib3guanMnKTsiLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vZG9jcy92c2RvYy9PcGVuTGF5ZXJzQWxsLmpzXCIvPlxyXG52YXIgYXRyb3BhID0gcmVxdWlyZSgnYXRyb3BhLWhlYWRlcicpO1xyXG5hdHJvcGEuaW5xdWlyZSA9IHJlcXVpcmUoJ2F0cm9wYS1pbnF1aXJlJykuaW5xdWlyZTtcclxuLypqc2xpbnRcclxuICAgIGluZGVudDogNCxcclxuICAgIG1heGVycjogNTAsXHJcbiAgICB3aGl0ZTogdHJ1ZSxcclxuICAgIGJyb3dzZXI6IHRydWUsXHJcbiAgICBkZXZlbDogdHJ1ZSxcclxuICAgIHBsdXNwbHVzOiB0cnVlLFxyXG4gICAgcmVnZXhwOiB0cnVlXHJcbiovXHJcbi8qZ2xvYmFsIGF0cm9wYSAqL1xyXG4vLyBlbmQgaGVhZGVyXHJcblxyXG4vKipcclxuICogVXRpbGl0aWVzIGZvciBoYW5kbGluZyBhcnJheXMuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDIyMVxyXG4gKiBAbmFtZXNwYWNlIFV0aWxpdGllcyBmb3IgaGFuZGxpbmcgYXJyYXlzLlxyXG4gKi9cclxuYXRyb3BhLmFycmF5cyA9IHt9O1xyXG4vKipcclxuICogQ29tcGFyZXMgdHdvIGFycmF5cyBiYXNlZCBvbiBzaXplLCBjb250ZW50cywgYW5kIGVsZW1lbnQgb3JkZXIuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEyMDkwOVxyXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheTEgT25lIGFycmF5IHlvdSB3YW50IGNvbXBhcmVkIHRvIGFub3RoZXIuXHJcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5MiBUaGUgb3RoZXIgYXJyYXkuXHJcbiAqIEByZXR1cm5zIHtCb29sZWFufSBSZXR1cm5zIHRydWUgb3IgZmFsc2UgZGVwZW5kaW5nIG9uXHJcbiAqICB3aGV0aGVyIG9yIG5vdCB0aGUgYXJyYXlzIG1hdGNoZWQgaW4gc2l6ZSwgY29tcG9zaXRpb24sIGFuZFxyXG4gKiAgZWxlbWVudCBvcmRlci5cclxuICogQGV4YW1wbGVcclxuICogdmFyIHggPSBbMSwyXTtcclxuICogdmFyIHkgPSBbMSwxLDNdO1xyXG4gKiBhdHJvcGEuYXJyYXlzLm1hdGNoKHgseSk7XHJcbiAqIC8vIHJldHVybnMgZmFsc2VcclxuICogQGV4YW1wbGVcclxuICogdmFyIHggPSBbMSwyXTtcclxuICogdmFyIHkgPSBbMSwyXTtcclxuICogYXRyb3BhLmFycmF5cy5tYXRjaCh4LHkpO1xyXG4gKiAvLyByZXR1cm5zIHRydWVcclxuICogQGV4YW1wbGVcclxuICogdmFyIHggPSBbMSwyXTtcclxuICogdmFyIHkgPSBbMiwxXTtcclxuICogYXRyb3BhLmFycmF5cy5tYXRjaCh4LHkpO1xyXG4gKiAvLyByZXR1cm5zIGZhbHNlIGJlY2F1c2UgdGhlIGVsZW1lbnRzIGFyZSBub3QgaW4gdGhlIHNhbWUgb3JkZXIuXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciB4ID0gWzEseydhUHJvcCcgOiAnYVZhbHVlJ31dO1xyXG4gKiB2YXIgeSA9IFsxLHsnYVByb3AnIDogJ2FWYWx1ZSd9XTtcclxuICogYXRyb3BhLmFycmF5cy5tYXRjaCh4LHkpO1xyXG4gKiAvLyByZXR1cm5zIGZhbHNlIGJlY2F1c2UgZXZlbiB0aG91Z2ggdGhlIG9iamVjdCBsb29rcyB0aGUgc2FtZSwgdGhlXHJcbiAqIC8vIHR3byBvYmplY3RzIGFyZSBpbiBmYWN0IGRpc3RpbmN0IG9iamVjdHMuXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciBvYmogPSB7J2FQcm9wJyA6ICdhVmFsdWUnfTtcclxuICogdmFyIHggPSBbMSxvYmpdO1xyXG4gKiB2YXIgeSA9IFsxLG9ial07XHJcbiAqIGF0cm9wYS5hcnJheXMubWF0Y2goeCx5KTtcclxuICogLy8gcmV0dXJucyB0cnVlIGJlY2F1c2UgdGhlIG9iamVjdHMgcmVmZXJlbmNlZCBpbiB0aGUgYXJyYXlzIGFyZVxyXG4gKiAvLyBpbiBmYWN0IHRoZSBzYW1lIG9iamVjdC5cclxuICovXHJcbmF0cm9wYS5hcnJheXMubWF0Y2ggPSBmdW5jdGlvbiBhcnJheXNNYXRjaChhcnJheTEsIGFycmF5Mikge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICB2YXIgeCxcclxuICAgIGw7XHJcbiAgICBpZiAoYXJyYXkxLmxlbmd0aCAhPT0gYXJyYXkyLmxlbmd0aCkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGwgPSBhcnJheTEubGVuZ3RoO1xyXG4gICAgZm9yICh4ID0gMDsgeCA8IGw7IHggKz0gMSkge1xyXG4gICAgICAgIGlmIChhcnJheTFbeF0gIT09IGFycmF5Mlt4XSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbn07XHJcbi8qKlxyXG4gKiBTdWJ0cmFjdHMgb25lIGFycmF5IGZyb20gYW5vdGhlciBhcnJheSBiYXNlZCBvbiB0aGUgdW5pcXVlIHZhbHVlcyBpbiBib3RoXHJcbiAqICBzZXRzLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzAxMTJcclxuICogQHBhcmFtIHtBcnJheX0gYSAoc3VidHJhaGVuZCkgVGhlIGFycmF5IHRvIHN1YnRyYWN0LlxyXG4gKiBAcGFyYW0ge0FycmF5fSBmcm9tQiAobWludWVuZCkgVGhlIGFycmF5IHdpdGggZWxlbWVudHMgZHVwbGljYXRlZCBpbiA8Y29kZT5hPC9jb2RlPlxyXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYSBuZXcgYXJyYXkgY29udGFpbmluZyBvbmx5IHRoZSB1bmlxdWVcclxuICogIHZhbHVlcyBmb3VuZCBpbiA8Y29kZT5mcm9tQjwvY29kZT4gdGhhdCBhcmUgbm90IHByZXNlbnQgaW4gPGNvZGU+YTwvY29kZT5cclxuICogQGV4YW1wbGVcclxuICogdmFyIHggPSBbMSwyXTtcclxuICogdmFyIHkgPSBbMSwxLDNdO1xyXG4gKiBhdHJvcGEuYXJyYXlzLnN1YnRyYWN0KHgseSk7XHJcbiAqIC8vIHJldHVybnMgWzNdXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciB4ID0gWzEsM107XHJcbiAqIHZhciB5ID0gWzMsMV07XHJcbiAqIGF0cm9wYS5hcnJheXMuc3VidHJhY3QoeCx5KTtcclxuICogLy8gcmV0dXJucyBbXVxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgeCA9IFsxLDNdO1xyXG4gKiB2YXIgeSA9IFszLDEsMSw5XTtcclxuICogYXRyb3BhLmFycmF5cy5zdWJ0cmFjdCh4LHkpO1xyXG4gKiAvLyByZXR1cm5zIFs5XVxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgeCA9IFsxLDMseydhUHJvcCcgOiAnYVZhbCd9XTtcclxuICogdmFyIHkgPSBbMywxLHsnYVByb3AnIDogJ2FWYWwnfV07XHJcbiAqIGF0cm9wYS5hcnJheXMuc3VidHJhY3QoeCx5KTtcclxuICogLy8gcmV0dXJucyBbeydhUHJvcCcgOiAnYVZhbCd9XSBcclxuICogLy8gYmVjYXVzZSB0aGUgdHdvIG9iamVjdHMgYXJlIG5vdCB0aGUgc2FtZSBvYmplY3QuXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciBvYmogPSB7J2FQcm9wJyA6ICdhVmFsJ307XHJcbiAqIHZhciB4ID0gWzEsMyxvYmpdO1xyXG4gKiB2YXIgeSA9IFszLDEseydhUHJvcCcgOiAnYVZhbCd9XTtcclxuICogYXRyb3BhLmFycmF5cy5zdWJ0cmFjdCh4LHkpO1xyXG4gKiAvLyByZXR1cm5zIFt7J2FQcm9wJyA6ICdhVmFsJ31dIFxyXG4gKiAvLyBiZWNhdXNlIHRoZSB0d28gb2JqZWN0cyBhcmUgbm90IHRoZSBzYW1lIG9iamVjdC5cclxuICogQGV4YW1wbGVcclxuICogdmFyIG9iaiA9IHsnYVByb3AnIDogJ2FWYWwnfVxyXG4gKiB2YXIgeCA9IFsxLDMsb2JqXTtcclxuICogdmFyIHkgPSBbMywxLG9ial07XHJcbiAqIGF0cm9wYS5hcnJheXMuc3VidHJhY3QoeCx5KTtcclxuICogLy8gcmV0dXJucyBbXSBcclxuICogLy8gYmVjYXVzZSB0aGUgb2JqZWN0cyByZWZlcmVuY2VkIGluIHRoZSBhcnJheXMgYXJlIHRoZSBzYW1lIG9iamVjdC5cclxuICovXHJcbmF0cm9wYS5hcnJheXMuc3VidHJhY3QgPSBmdW5jdGlvbihhLCBmcm9tQikge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICB2YXIgdGhlID0ge307XHJcbiAgICB0aGUucmVzdWx0ID0gW107XHJcbiAgICBmcm9tQi5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pe1xyXG4gICAgICAgIHRoZS5tYXJrID0gZmFsc2U7XHJcbiAgICAgICAgYS5mb3JFYWNoKGZ1bmN0aW9uKHJtKXtcclxuICAgICAgICAgICAgaWYoaXRlbSA9PT0gcm0pIHtcclxuICAgICAgICAgICAgICAgIHRoZS5tYXJrID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmKHRoZS5tYXJrICE9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIHRoZS5yZXN1bHQucHVzaChpdGVtKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiB0aGUucmVzdWx0O1xyXG59O1xyXG4vKipcclxuICogUmV0dXJucyBhbiBhcnJheSBvZiB2YWx1ZXMgZm91bmQgaW4gYm90aCBvZiB0aGUgZ2l2ZW4gYXJyYXlzLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzAxMTJcclxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkxIEFuIGFycmF5LlxyXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheTIgQW5vdGhlciBhcnJheS5cclxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGFuIGFycmF5IG9mIHZhbHVlcyBmb3VuZCBpbiBib3RoIG9mIHRoZSBnaXZlblxyXG4gKiAgYXJyYXlzLlxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgeCA9IFsxLDMsNF07XHJcbiAqIHZhciB5ID0gWzMsMSw1XTtcclxuICogYXRyb3BhLmFycmF5cy5pbnRlcnNlY3QoeCx5KTtcclxuICogLy8gcmV0dXJucyBbMSwzXVxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgeCA9IFsxLDEsMyw0XTtcclxuICogdmFyIHkgPSBbMywxLDEsNV07XHJcbiAqIGF0cm9wYS5hcnJheXMuaW50ZXJzZWN0KHgseSk7XHJcbiAqIC8vIHJldHVybnMgWzEsMSwzXVxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgb2JqID0geydhUHJvcCcgOiAnYVZhbCd9O1xyXG4gKiB2YXIgeCA9IFsxLDMsb2JqXTtcclxuICogdmFyIHkgPSBbMywxLG9ial07XHJcbiAqIGF0cm9wYS5hcnJheXMuaW50ZXJzZWN0KHgseSk7XHJcbiAqIC8vIHJldHVybnMgWzEsMyx7J2FQcm9wJyA6ICdhVmFsJ31dXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciBvYmogPSB7J2FQcm9wJyA6ICdhVmFsJ307XHJcbiAqIHZhciB4ID0gWzEsMyx7J2FQcm9wJyA6ICdhVmFsJ31dO1xyXG4gKiB2YXIgeSA9IFszLDEsb2JqXTtcclxuICogYXRyb3BhLmFycmF5cy5pbnRlcnNlY3QoeCx5KTtcclxuICogLy8gcmV0dXJucyBbMSwzXSBiZWNhdXNlIHRoZSB0d28gb2JqZWN0cyBhcmUgbm90IHRoZSBzYW1lIG9iamVjdC5cclxuICogQGV4YW1wbGVcclxuICogdmFyIHggPSBbMSwzLHsnYVByb3AnIDogJ2FWYWwnfV07XHJcbiAqIHZhciB5ID0gWzMsMSx7J2FQcm9wJyA6ICdhVmFsJ31dO1xyXG4gKiBhdHJvcGEuYXJyYXlzLmludGVyc2VjdCh4LHkpO1xyXG4gKiAvLyByZXR1cm5zIFsxLDNdIGJlY2F1c2UgdGhlIHR3byBvYmplY3RzIGFyZSBub3QgdGhlIHNhbWUgb2JqZWN0LlxyXG4gKi9cclxuYXRyb3BhLmFycmF5cy5pbnRlcnNlY3QgPSBmdW5jdGlvbiBpbnRlcnNlY3QoYXJyYXkxLCBhcnJheTIpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgdmFyIHNtYWxsQXJyYXksIGxhcmdlQXJyYXksIGludGVyc2VjdGlvbiA9IFtdO1xyXG4gICAgaWYoYXJyYXkxLmxlbmd0aCA+IGFycmF5Mi5sZW5ndGgpIHtcclxuICAgICAgICBsYXJnZUFycmF5ID0gYXJyYXkxLnNwbGljZSgwKTtcclxuICAgICAgICBzbWFsbEFycmF5ID0gYXJyYXkyLnNwbGljZSgwKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbGFyZ2VBcnJheSA9IGFycmF5Mi5zcGxpY2UoMCk7XHJcbiAgICAgICAgc21hbGxBcnJheSA9IGFycmF5MS5zcGxpY2UoMCk7XHJcbiAgICB9XHJcbiAgICBzbWFsbEFycmF5LmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICB2YXIgaWR4SW5MYXJnZUFycmF5ID0gbGFyZ2VBcnJheS5pbmRleE9mKGl0ZW0pO1xyXG4gICAgICAgIGlmICgwIDw9IGlkeEluTGFyZ2VBcnJheSkgeyAvLyBoYXMgd29yZFxyXG4gICAgICAgICAgICBpbnRlcnNlY3Rpb24ucHVzaChsYXJnZUFycmF5LnNwbGljZShpZHhJbkxhcmdlQXJyYXksIDEpWzBdKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBpbnRlcnNlY3Rpb247XHJcbn07XHJcbi8qKlxyXG4gKiBDYWxjdWxhdGVzIHRoZSBmcmVxdWVuY3kgb2YgaXRlbXMgb2NjdXJyaW5nIGluIGFuIGFycmF5LlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzAxMThcclxuICogQHBhcmFtIHtBcnJheX0gYXJyIFRoZSBhcnJheSB0byBjYWxjdWxhdGUgZnJlcXVlbmNpZXMgZnJvbS5cclxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBhbiBvYmplY3Qgd2hvc2Uga2V5cyBhcmUgZWFjaCB1bmlxdWVcclxuICogIGVsZW1lbnRzIGZyb20gdGhlIGFycmF5IGFuZCB0aGVpciB2YWx1ZSBpcyB0aGVpciBmcmVxdWVuY3kgb2ZcclxuICogIG9jY3VycmVuY2Ugd2l0aGluIHRoZSBhcnJheS4gQmUgY2FyZWZ1bCB0aGF0IHlvdXIgYXJyYXkgZG9lc1xyXG4gKiAgbm90IGNvbnRhaW4gdmFsdWVzIG1hdGNoaW5nIG9iamVjdCBpbnN0YW5jZSBwcm9wZXJ0eSBuYW1lcy5cclxuICogQGV4YW1wbGVcclxuICogdmFyIHggPSBbMSwxLDEsMSwxLDMsM107XHJcbiAqIGF0cm9wYS5hcnJheXMuZ2V0RnJlcXVlbmN5KHgpO1xyXG4gKiAvLyByZXR1cm5zIHtcclxuICogLy8gICAgIFwiMVwiOiA1LFxyXG4gKiAvLyAgICAgXCIzXCI6IDJcclxuICogLy8gfVxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgeCA9IFtcImJpbGxcIiwgXCJmcmVkXCIsIFwiZnJlZFwiLCBcImphbmVcIl07XHJcbiAqIGF0cm9wYS5hcnJheXMuZ2V0RnJlcXVlbmN5KHgpO1xyXG4gKiAvLyByZXR1cm5zIHtcclxuICogLy8gICAgIFwiYmlsbFwiOiAxLFxyXG4gKiAvLyAgICAgXCJmcmVkXCI6IDIsXHJcbiAqIC8vICAgICBcImphbmVcIjogMVxyXG4gKiAvLyB9XHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciB4ID0gWzEsMyx7J2FQcm9wJyA6ICdhVmFsJ31dO1xyXG4gKiBhdHJvcGEuYXJyYXlzLmdldEZyZXF1ZW5jeSh4KTtcclxuICogLy8gcmV0dXJucyB7XHJcbiAqIC8vICAgICBcIjFcIjogMSxcclxuICogLy8gICAgIFwiM1wiOiAxLFxyXG4gKiAvLyAgICAgXCJbb2JqZWN0IE9iamVjdF1cIjogMVxyXG4gKiAvLyB9XHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciBvYmogPSB7J2FQcm9wJyA6ICdhVmFsJ307XHJcbiAqIHZhciBvdGhlck9iaiA9IHt9O1xyXG4gKiB2YXIgeCA9IFsxLDMsb2JqLG90aGVyT2JqLHsnYURvdWdobnV0JyA6ICdzcHJpbmtsZXMnfV07XHJcbiAqIGF0cm9wYS5hcnJheXMuZ2V0RnJlcXVlbmN5KHgpO1xyXG4gKiAvLyByZXR1cm5zIHtcclxuICogLy8gICAgIFwiMVwiOiAxLFxyXG4gKiAvLyAgICAgXCIzXCI6IDEsXHJcbiAqIC8vICAgICBcIltvYmplY3QgT2JqZWN0XVwiOiAzXHJcbiAqIC8vIH1cclxuICogQGV4YW1wbGVcclxuICogdmFyIHggPSBbMSwzLFwidG9TdHJpbmdcIl07XHJcbiAqIGF0cm9wYS5hcnJheXMuZ2V0RnJlcXVlbmN5KHgpO1xyXG4gKiAvLyByZXR1cm5zIHtcclxuICogLy8gICAgIFwiMVwiOiAxLFxyXG4gKiAvLyAgICAgXCIzXCI6IDEsXHJcbiAqIC8vICAgICBcInRvU3RyaW5nXCI6IFwiZnVuY3Rpb24gdG9TdHJpbmcoKSB7XFxuICAgIFtuYXRpdmUgY29kZV1cXG59MVwiXHJcbiAqIC8vIH1cclxuICovXHJcbmF0cm9wYS5hcnJheXMuZ2V0RnJlcXVlbmN5ID0gZnVuY3Rpb24gKGFycikge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICB2YXIgb3V0ID0gYXJyLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBjdXJyKSB7XHJcbiAgICAgICAgaWYgKGFjY1tjdXJyXSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGFjY1tjdXJyXSA9IDE7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYWNjW2N1cnJdICs9IDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhY2M7XHJcbiAgICB9LCB7fSk7XHJcbiAgICByZXR1cm4gb3V0O1xyXG59O1xyXG4vKipcclxuICogR2V0cyBVbmlxdWUgdmFsdWVzIGZyb20gYW4gYXJyYXkuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDExOFxyXG4gKiBAcGFyYW0ge0FycmF5fSBsYXJnZUFycmF5IFRoZSBhcnJheSB3aXRoIGR1cGxpY2F0ZSB2YWx1ZXMgaW4gaXQuXHJcbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBhIG5ldyBhcnJheSBjb250YWluaW5nIG9ubHkgdGhlIHVuaXF1ZVxyXG4gKiAgdmFsdWVzIGZvdW5kIGluIHRoZSBsYXJnZUFycmF5LlxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgeCA9IFsxLDEsMSw0LDQsMyw2XTtcclxuICogYXRyb3BhLmFycmF5cy5nZXRVbmlxdWUoeCk7XHJcbiAqIC8vIHJldHVybnMgWyBcIjFcIiwgXCI0XCIsIFwiM1wiLCBcIjZcIiBdXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciB4ID0gW1wiYmlsbFwiLCBcImZyZWRcIiwgXCJqYW5lXCIsIFwiZnJlZFwiXTtcclxuICogYXRyb3BhLmFycmF5cy5nZXRVbmlxdWUoeCk7XHJcbiAqIC8vIHJldHVybnMgW1wiYmlsbFwiLCBcImZyZWRcIiwgXCJqYW5lXCJdXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciB4ID0gWyBcclxuICogICAgIFwiYmlsbFwiLFxyXG4gKiAgICAge1wiYVByb3BcIiA6IFwiYVZhbHVlXCJ9LFxyXG4gKiAgICAge1wiYUd1eVwiIDogXCJmcmVkXCJ9LFxyXG4gKiAgICAge1wiYUxhZHlcIiA6IFwiamFuZVwifVxyXG4gKiBdO1xyXG4gKiBhdHJvcGEuYXJyYXlzLmdldFVuaXF1ZSh4KTtcclxuICogLy8gcmV0dXJucyBbIFwiYmlsbFwiLCBcIltvYmplY3QgT2JqZWN0XVwiIF1cclxuICovXHJcbmF0cm9wYS5hcnJheXMuZ2V0VW5pcXVlID0gZnVuY3Rpb24gKGxhcmdlQXJyYXkpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKGF0cm9wYS5hcnJheXMuZ2V0RnJlcXVlbmN5KGxhcmdlQXJyYXkpKS5zb3J0KCk7XHJcbn07XHJcbi8qKlxyXG4gKiBSZW1vdmVzIGVtcHR5IHN0cmluZ3MgZnJvbSB0aGUgZ2l2ZW4gYXJyYXkuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDExOFxyXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheVdpdGhFbXB0eUVsZW1lbnRzIFRoZSBhcnJheSB3aXRoIGVtcHR5IHN0cmluZ3MgaW4gaXQuXHJcbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBhIG5ldyBhcnJheSB3aXRoIGVtcHR5IHN0cmluZ3MgcmVtb3ZlZC5cclxuICogQGV4YW1wbGVcclxuICogdmFyIHggPSBbIDEwLCAsIDUsIFwiXCIsICcnLCA3IF07XHJcbiAqIGNvbnNvbGUubG9nKCdzdGFydGluZyBsZW5ndGggJyArIHgubGVuZ3RoKTtcclxuICogY29uc29sZS5sb2coeCk7XHJcbiAqIHggPSBhdHJvcGEuYXJyYXlzLnJlbW92ZUVtcHR5RWxlbWVudHMoeCk7XHJcbiAqIGNvbnNvbGUubG9nKCdlbmRpbmcgbGVuZ3RoICcgKyB4Lmxlbmd0aCk7XHJcbiAqIGNvbnNvbGUubG9nKHgpO1xyXG4gKiAvLyBkaXNwbGF5cyB0aGUgZm9sbG93aW5nXHJcbiAqIC8vIHN0YXJ0aW5nIGxlbmd0aCA2XHJcbiAqIC8vIFsxMCwgdW5kZWZpbmVkLCA1LCBcIlwiLCBcIlwiLCA3XVxyXG4gKiAvLyBlbmRpbmcgbGVuZ3RoIDNcclxuICogLy8gWzEwLCA1LCA3XVxyXG4gKi9cclxuYXRyb3BhLmFycmF5cy5yZW1vdmVFbXB0eUVsZW1lbnRzID0gZnVuY3Rpb24gKGFycmF5V2l0aEVtcHR5RWxlbWVudHMpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgcmV0dXJuIGFycmF5V2l0aEVtcHR5RWxlbWVudHMuZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgcmV0dXJuICFhdHJvcGEuaW5xdWlyZS5pc0VtcHR5U3RyaW5nKGl0ZW0pO1xyXG4gICAgfSk7XHJcbn07XHJcbi8qKlxyXG4gKiBSZWluZGV4ZXMgYW4gYXJyYXkuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDExOFxyXG4gKiBAcGFyYW0ge0FycmF5fSBhcnIgVGhlIGFycmF5IHdpdGggZGlzY29udGludW91cyBrZXlzLlxyXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYW4gYXJyYXkgd2l0aCBjb250aW51b3VzIGtleXMuXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciB4ID0gWyBcImFcIiwgXCJiXCIsIFwiY1wiLCB1bmRlZmluZWQgXTtcclxuICogY29uc29sZS5sb2coeCk7IC8vIFsgXCJhXCIsIFwiYlwiLCBcImNcIiwgdW5kZWZpbmVkIF1cclxuICogY29uc29sZS5sb2coeC5sZW5ndGgpOyAvLyA0XHJcbiAqIFxyXG4gKiBkZWxldGUgeFsxXTsgLy8gZGVsZXRlcyB0aGUga2V5IGZyb20gdGhlIGFycmF5IGJ1dFxyXG4gKiAgICAgICAgICAgICAgLy8gdGhlIGFycmF5IGxlbmd0aCByZW1haW5zIHRoZSBzYW1lXHJcbiAqICAgICAgICAgICAgICAvLyBhdCB0aGlzIHBvaW50IHRoZSBhcnJheXMga2V5cyBhcmUgMCwgMiwgYW5kIDNcclxuICogY29uc29sZS5sb2coeCk7IC8vIFsgXCJhXCIsIHVuZGVmaW5lZCwgXCJjXCIsIHVuZGVmaW5lZCBdXHJcbiAqIGNvbnNvbGUubG9nKHgubGVuZ3RoKTsgLy8gNFxyXG4gKiBcclxuICogeCA9IGF0cm9wYS5hcnJheXMucmVpbmRleCh4KTtcclxuICogY29uc29sZS5sb2coeCk7IC8vICBbIFwiYVwiLCBcImNcIiwgdW5kZWZpbmVkIF1cclxuICogICAgLy8gbm90ZSB0aGF0IHRoZSBsYXN0IGVsZW1lbnQgZXhpc3RlZCBpbiB0aGUgYXJyYXksIGl0cyB2YWx1ZSB3YXNcclxuICogICAgLy8gdW5kZWZpbmVkIGJ1dCBpdCBkaWQgaGF2ZSBhIGtleSBzbyB0aGUgZWxlbWVudCByZW1haW5zIGluIHRoZSBhcnJheS5cclxuICogICAgLy9cclxuICogICAgLy8gVGhlIGRlbGV0ZWQgZWxlbWVudCB3YXMgaW4gZmFjdCBkZWxldGVkIGZyb20gdGhlIGFycmF5IHNvIHRoZXJlIHdhcyBub1xyXG4gKiAgICAvLyBrZXkgeFsxXSBhdCBhbGwsIHdoZW4gdHJ5aW5nIHRvIGFjY2VzcyB0aGlzIG5vbiBleGlzdGluZyBlbGVtZW50IHRoZVxyXG4gKiAgICAvLyB2YWx1ZSBvZiB1bmRlZmluZWQgd2FzIHJldHVybmVkLiBUaGlzIGJlaGF2aW9yIGlzIGNvbmZ1c2luZyB1bmxlc3MgeW91XHJcbiAqICAgIC8vIHRoaW5rIGFib3V0IHRoZSBhcnJheWFzIGFuIG9iamVjdCB3aG9zZSBwcm9wZXJ0aWVzIGFyZSBuYW1lZCBieVxyXG4gKiAgICAvLyBudW1iZXJzLiBBY2Nlc3NpbmcgYW4gdW5kZWZpbmVkIHByb3BlcnR5IHJldHVybnMgdW5kZWZpbmVkIHJlZ2FyZGxlc3NcclxuICogICAgLy8gb2Ygd2hldGhlciB0aGUgcHJvcGVydHkgZXhpc3RlZCBpbiB0aGUgcGFzdCBvciBub3QuXHJcbiAqIGNvbnNvbGUubG9nKHgubGVuZ3RoKTsgLy8gM1xyXG4gKi9cclxuYXRyb3BhLmFycmF5cy5yZWluZGV4ID0gZnVuY3Rpb24gcmVpbmRleChhcnIpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgdmFyIGlkeCwgb3V0O1xyXG4gICAgb3V0ID0gW107XHJcbiAgICBmb3IoaWR4IGluIGFycikge1xyXG4gICAgICAgIGlmKGFyci5oYXNPd25Qcm9wZXJ0eShpZHgpKSB7XHJcbiAgICAgICAgICAgIG91dC5wdXNoKGFycltpZHhdKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gb3V0O1xyXG59O1xyXG4vKipcclxuICogU29ydHMgYW4gYXJyYXkncyBlbGVtZW50cyBudW1lcmljYWxseS5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwMTIwXHJcbiAqIEBwYXJhbSB7QXJyYXl9IGFyciBUaGUgYXJyYXkgdG8gc29ydC4gQWxsIGVsZW1lbnRzIG9mIHRoZSBhcnJheSBtdXN0IGJlXHJcbiAqICBudW1iZXItaXNoLlxyXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYW4gYXJyYXkgd2hvc2UgZWxlbWVudHMgYXJlIGluIG51bWVyaWMgb3JkZXIuXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciB4ID0gWzMsIDIsIDksIDI2LCAxMCwgMSwgOTksIDE1XTtcclxuICogY29uc29sZS5sb2coIGF0cm9wYS5hcnJheXMuc29ydE51bWVyaWNhbGx5KHgpICk7XHJcbiAqIC8vIGxvZ3MgWzEsIDIsIDMsIDksIDEwLCAxNSwgMjYsIDk5XVxyXG4gKi9cclxuYXRyb3BhLmFycmF5cy5zb3J0TnVtZXJpY2FsbHkgPSBmdW5jdGlvbiBzb3J0TnVtZXJpY2FsbHkoYXJyKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHJldHVybiBhcnIuc29ydChmdW5jdGlvbiAoYSwgYikge1xyXG4gICAgICAgIHJldHVybiAoYSAtIGIpO1xyXG4gICAgfSk7XHJcbn07XHJcbi8qKlxyXG4gKiBUaHJvd3MgYW4gZXJyb3IsIDxjb2RlPlN0cmluZy5wcm90b3R5cGUubG9jYWxlQ29tcGFyZTwvY29kZT4gaXMgbm90IFxyXG4gKiAgc3RhbmRhcmRpemVkLlxyXG4gKiBcclxuICogIFllcywgbG9jYWxlQ29tcGFyZSBpcyBpbiB0aGUgc3RhbmRhcmQgYnV0LCBhdCB0aGlzIHRpbWUgdGhlIGFjdHVhbFxyXG4gKiAgY29tcGFyaXNvbiBpcyBpbXBsZW1lbnRhdGlvbiBkZXBlbmRhbnQuIFRoaXMgbWVhbnMgdGhhdCBcImFscGhhYmV0aWNhbCBvcmRlclwiXHJcbiAqICBjYW4gYmUgZGlmZmVyZW50IG9uIGRpZmZlcmVudCBwbGF0Zm9ybXMuIFdoYXQgSSBmb3VuZCB3YXMgdGhhdCBpbiBub2RlIHRoZVxyXG4gKiAgYXJyYXkgb2YgPGNvZGU+WydhJywnWicsJ0EnLCd6J108L2NvZGU+IHdvdWxkIGJlIHNvcnRlZCB0b1xyXG4gKiAgPGNvZGU+WydBJywnWicsJ2EnLCd6XCJdPC9jb2RlPiwgd2hpbGUgb25cclxuICogIGZpcmVmb3ggaXQgd291bGQgYmUgc29ydGVkIHRvIDxjb2RlPlsnYScsJ0EnLCd6JywnWiddPC9jb2RlPi4gV2hvIGtub3dzIGlmXHJcbiAqICBhbm90aGVyIGltcGxlbWVudG9yIHdvdWxkIHNvcnQgaXQgPGNvZGU+WydBJywnYScsJ1onLCd6J108L2NvZGU+P1xyXG4gKiBcclxuICogSW4gb3JkZXIgdG8gcHJvdmlkZSBhIHJlbGlhYmxlIGltcGxlbWVudGF0aW9uIEkgd291bGQgaGF2ZSB0byBjcmVhdGUgbXkgb3duXHJcbiAqICBpbXBsZW1lbnRhdGlvbiBvZiA8Y29kZT5TdHJpbmcucHJvdG90eXBlLmxvY2FsZUNvbXBhcmU8L2NvZGU+IGFuZCB0aGF0J3NcclxuICogIGp1c3QgdG9vIG11Y2ggd29yayBmb3IgbWUgdG8gZG8gYWxvbmUuXHJcbiAqIEB0aHJvd3Mge0Vycm9yfSBcIlN0cmluZy5wcm90b3R5cGUubG9jYWxlQ29tcGFyZSBpcyBub3Qgc3RhbmRhcmRpemVkXCJcclxuICovXHJcbmF0cm9wYS5hcnJheXMuc29ydEFscGhhYmV0aWNhbGx5ID0gZnVuY3Rpb24gc29ydEFscGhhYmV0aWNhbGx5KGFycikge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJTdHJpbmcucHJvdG90eXBlLmxvY2FsZUNvbXBhcmUgaXMgbm90IHN0YW5kYXJkaXplZFwiKTtcclxufTtcclxuLyoqXHJcbiAqIERlbGV0ZXMgdGhlIGdpdmVuIGVsZW1lbnQgZnJvbSB0aGUgYXJyYXkgYXQgdGhlIGdpdmVuIGluZGV4LiBJdCBiYXNpY2FsbHlcclxuICogIGRvZXMgd2hhdCB5b3Ugd291bGQgZXhwZWN0IHRoZSBkZWxldGUgb3BlcmF0b3IgdG8gZG8sIGV4Y2VwdCB0aGUgZGVsZXRlXHJcbiAqICBvcGVyYXRvciBkb2Vzbid0IGRvIHdoYXQgeW91IHdvdWxkIGV4cGVjdC5cclxuICogQHBhcmFtIHtBcnJheX0gYXJyIFRoZSBhcnJheS5cclxuICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4IFRoZSBpbmRleCBvZiB0aGUgZWxlbWVudCB0byBkZWxldGUuXHJcbiAqIEByZXR1cm5zIFJldHVybnMgYW4gYXJyYXkgd2l0aCB0aGUgZWxlbWVudCByZW1vdmVkLCBjb250aWd1b3VzIGtleXMsIGFuZFxyXG4gKiAgd2hvc2UgbGVuZ3RoIGlzIDEgbGVzcyB0aGFuIHRoZSBpbnB1dCBhcnJheS5cclxuICovXHJcbmF0cm9wYS5hcnJheXMuZGVsZXRlRWxlbWVudCA9IGZ1bmN0aW9uIChhcnIsIGluZGV4KSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIGRlbGV0ZSBhcnJbaW5kZXhdO1xyXG4gICAgcmV0dXJuIGF0cm9wYS5hcnJheXMucmVpbmRleChhcnIpO1xyXG59O1xyXG5cclxuXHJcblxyXG5cclxud2hpbGUoYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLmxlbmd0aCA+IDApIHtcclxuICAgIGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5wb3AoKSgpO1xyXG59XHJcbm1vZHVsZS5leHBvcnRzID0gYXRyb3BhO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vZG9jcy92c2RvYy9PcGVuTGF5ZXJzQWxsLmpzXCIvPlxyXG52YXIgYXRyb3BhID0gcmVxdWlyZSgnYXRyb3BhLWhlYWRlcicpO1xyXG4vKmpzbGludFxyXG4gICAgaW5kZW50OiA0LFxyXG4gICAgbWF4ZXJyOiA1MCxcclxuICAgIHdoaXRlOiB0cnVlLFxyXG4gICAgYnJvd3NlcjogdHJ1ZSxcclxuICAgIGRldmVsOiB0cnVlLFxyXG4gICAgcGx1c3BsdXM6IHRydWUsXHJcbiAgICByZWdleHA6IHRydWVcclxuKi9cclxuLypnbG9iYWwgYXRyb3BhICovXHJcbi8vIGVuZCBoZWFkZXJcclxuXHJcbi8qKlxyXG4gKiBDb250YWluZXIgZm9yIGZ1bmN0aW9ucyB0aGF0IHRlc3QgdGhlIHN0YXRlIG9mIGlucHV0cy5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTIwOTA5XHJcbiAqIEBuYW1lc3BhY2UgQ29udGFpbmVyIGZvciBmdW5jdGlvbnMgdGhhdCB0ZXN0IHRoZSBzdGF0ZSBvZiBpbnB1dHMuXHJcbiAqL1xyXG5hdHJvcGEuaW5xdWlyZSA9IHt9O1xyXG4vKipcclxuICogQ2hlY2tzIHdoZXRoZXIgdGhlIGlucHV0IGlzIG51bGwuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEyMDkwOVxyXG4gKiBAcGFyYW0ge01peGVkfSB4IEFueSBpbnB1dCB0aGF0IG1heSBvciBtYXkgbm90IGJlIG51bGwuXHJcbiAqIEByZXR1cm5zIHtCb29sZWFufSBSZXR1cm5zIHRydWUgaWYgeCA9PT0gbnVsbC5cclxuICovXHJcbmF0cm9wYS5pbnF1aXJlLmlzTnVsbCA9IGZ1bmN0aW9uICh4KSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHJldHVybiAoeCA9PT0gbnVsbCk7XHJcbn07XHJcbi8qKlxyXG4gKiBDaGVja3Mgd2hldGhlciB0aGUgaW5wdXQgaXMgYW4gb2JqZWN0LlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMjA5MDlcclxuICogQHBhcmFtIHtNaXhlZH0geCBBbnkgaW5wdXQgdGhhdCBtYXkgb3IgbWF5IG5vdCBiZSBhbiBvYmplY3QuXHJcbiAqIEByZXR1cm5zIHtCb29sZWFufSBSZXR1cm5zIHRydWUgaWYgdHlwZW9mKHgpID09PSAnb2JqZWN0Jy5cclxuICovXHJcbmF0cm9wYS5pbnF1aXJlLmlzT2JqZWN0ID0gZnVuY3Rpb24gKHgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgcmV0dXJuICh0eXBlb2YgeCA9PT0gJ29iamVjdCcpO1xyXG59O1xyXG4vKipcclxuICogQ2hlY2tzIHdoZXRoZXIgdGhlIGlucHV0IGlzIGJvdGggYW4gb2JqZWN0IGFuZCBub3QgbnVsbC5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTIwOTA5XHJcbiAqIEBwYXJhbSB7TWl4ZWR9IHggQW55IGlucHV0IHRoYXQgbWF5IG9yIG1heSBub3QgYmUgYm90aCBhblxyXG4gKiBvYmplY3QgYW5kIG51bGwuXHJcbiAqIEByZXR1cm5zIHtCb29sZWFufSBSZXR1cm5zIHRydWUgaWYgeCBpcyBib3RoIGFuIG9iamVjdCBhbmRcclxuICogbm90IG51bGwuIChudWxsIGlzIGFuIG9iamVjdCkuXHJcbiAqL1xyXG5hdHJvcGEuaW5xdWlyZS5pc09iamVjdE5vdE51bGwgPSBmdW5jdGlvbiAoeCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICByZXR1cm4gYXRyb3BhLmlucXVpcmUuaXNPYmplY3QoeCkgJiYgKCFhdHJvcGEuaW5xdWlyZS5pc051bGwoeCkpO1xyXG59O1xyXG4vKipcclxuICogQ2hlY2tzIGFuIG9iamVjdCBmb3IgdGhlIGV4aXN0ZW5jZSBvZiBhIHByb3BlcnR5XHJcbiAqIHJlZ2FyZGxlc3Mgb2Ygd2hldGhlciB0aGUgcHJvcGVydHkgd2FzIGluaGVyaXRlZFxyXG4gKiBvciBub3QuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEyMDkwOVxyXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIEFuIG9iamVjdCB3aGljaCBtYXkgb3IgbWF5IG5vdFxyXG4gKiBoYXZlIHRoZSBwcm9wZXJ0eSBpZGVudGlmaWVkIGJ5IHByb3AuXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBwcm9wIEEgc3RyaW5nIHZhbHVlIHJlcHJlc2VudGluZyB0aGVcclxuICogbmFtZSBvZiB0aGUgcHJvcGVydHkuXHJcbiAqIEByZXR1cm5zIHtCb29sZWFufSBSZXR1cm5zIHRydWUgaWYgb2JqLnByb3AgZXhpc3RzLFxyXG4gKiBvdGhlcndpc2UgcmV0dXJucyBmYWxzZS5cclxuICovXHJcbmF0cm9wYS5pbnF1aXJlLmhhc1Byb3BlcnR5ID0gZnVuY3Rpb24gKG9iaiwgcHJvcCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICBpZiAoYXRyb3BhLmlucXVpcmUuaXNPYmplY3ROb3ROdWxsKG9iaikpIHtcclxuICAgICAgICByZXR1cm4gKHByb3AgaW4gb2JqKTtcclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxufTtcclxuLyoqXHJcbiAqIENoZWNrcyB3aGV0aGVyIHRoZSBpbnB1dCBpcyBhbiBlbXB0eSBzdHJpbmcuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDExOFxyXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyIFRoZSBzdHJpbmcgeW91IHdhbnQgdG8ga25vdyBhYm91dFxyXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIHN0ciBpcyBhbiBlbXB0eSBzdHJpbmcsXHJcbiAqICBvdGhlcndpc2UgcmV0dXJucyBmYWxzZS5cclxuICovXHJcbmF0cm9wYS5pbnF1aXJlLmlzRW1wdHlTdHJpbmcgPSBmdW5jdGlvbiAoc3RyKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHZhciBvdXQgPSBmYWxzZTtcclxuICAgIGlmICgnJyA9PT0gc3RyKSB7XHJcbiAgICAgICAgb3V0ID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiBvdXQ7XHJcbn07XHJcblxyXG5cclxuXHJcblxyXG53aGlsZShhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMubGVuZ3RoID4gMCkge1xyXG4gICAgYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLnBvcCgpKCk7XHJcbn1cclxubW9kdWxlLmV4cG9ydHMgPSBhdHJvcGE7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9kb2NzL3ZzZG9jL09wZW5MYXllcnNBbGwuanNcIi8+XHJcbi8qanNsaW50XHJcbiAgICBub2RlOiB0cnVlXHJcbiovXHJcbnZhciBhdHJvcGEgPSByZXF1aXJlKCdhdHJvcGEtaGVhZGVyJyk7XHJcbmF0cm9wYS5pbnF1aXJlID0gcmVxdWlyZSgnYXRyb3BhLWlucXVpcmUnKS5pbnF1aXJlO1xyXG5hdHJvcGEuYXJyYXlzID0gcmVxdWlyZSgnYXRyb3BhLWFycmF5cycpLmFycmF5cztcclxuYXRyb3BhLmN1c3RvbUVycm9ycyA9IHJlcXVpcmUoJ2F0cm9wYS1jdXN0b21FcnJvcnMnKS5jdXN0b21FcnJvcnM7XHJcbi8qanNsaW50XHJcbiAgICBpbmRlbnQ6IDQsXHJcbiAgICBtYXhlcnI6IDUwLFxyXG4gICAgd2hpdGU6IHRydWUsXHJcbiAgICBicm93c2VyOiB0cnVlLFxyXG4gICAgZGV2ZWw6IHRydWUsXHJcbiAgICBwbHVzcGx1czogdHJ1ZSxcclxuICAgIHJlZ2V4cDogdHJ1ZVxyXG4qL1xyXG4vKmdsb2JhbCBhdHJvcGEgKi9cclxuLy8gZW5kIGhlYWRlclxyXG5cclxuLyoqXHJcbiAqIFRoaXMgcmVwcmVzZW50cyBhIGZpbHRlciBmb3IgYXJndW1lbnRzIGJhc2VkIG9uIHR5cGUuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDIyMVxyXG4gKiBAY2xhc3MgVGhpcyByZXByZXNlbnRzIGEgZmlsdGVyIGZvciBhcmd1bWVudHMgYmFzZWQgb24gdHlwZS5cclxuICogQHJldHVybnMge0FyZ3NJbmZvfSBSZXR1cm5zIGFuIEFyZ3NJbmZvIGZpbHRlci5cclxuICogQHJlcXVpcmVzIGF0cm9wYS5hcnJheXMubWF0Y2hcclxuICogQGV4YW1wbGVcclxuICogZnVuY3Rpb24gbXlDbGFzc3lDb25zdHJ1Y3Rvcih0YWtlcywgYSwgZmV3LCBhcmdzKSB7XHJcbiAqICAgICB2YXIgZXhwZWN0ZWRBcmdUeXBlcywgY2hlY2tlcjtcclxuICogICAgIFxyXG4gKiAgICAgZXhwZWN0ZWRBcmdUeXBlcyA9IHt9O1xyXG4gKiAgICAgZXhwZWN0ZWRBcmdUeXBlcy5yZXF1ZXN0V2l0aE1lc3NhZ2UgPSBcclxuICogICAgICAgICAgWydzdHJpbmcnLCAnc3RyaW5nJywgJ3N0cmluZycsICdmdW5jdGlvbiddO1xyXG4gKiAgICAgZXhwZWN0ZWRBcmdUeXBlcy5yZXF1ZXN0TnVsbE1lc3NhZ2UgPSBcclxuICogICAgICAgICAgWydzdHJpbmcnLCAnc3RyaW5nJywgJ29iamVjdCcsICdmdW5jdGlvbiddO1xyXG4gKiAgICAgXHJcbiAqICAgICBjaGVja2VyID0gbmV3IGF0cm9wYS5BcmdzSW5mbygpO1xyXG4gKiAgICAgY2hlY2tlci5zZXRFeHBlY3RlZEFyZ1R5cGVzKGV4cGVjdGVkQXJnVHlwZXMpO1xyXG4gKiAgICAgXHJcbiAqICAgICB0cnkge1xyXG4gKiAgICAgXHJcbiAqICAgICAgICAgLy8gQ2hlY2sgdGhlIHN1cHBsaWVkIGFyZ3VtZW50cyBwc2V1ZG8gYXJyYXkncyBhcmd1bWVudCB0eXBlc1xyXG4gKiAgICAgICAgIC8vIGlmIHRoZSBwYXR0ZXJuIG9mIHR5cGVzIGluIGFyZ3VtZW50cyBtYXRjaGVzIG9uZSBvZiB0aGVcclxuICogICAgICAgICAvLyBwYXR0ZXJucyBzZXQgb24gZXhwZWN0ZWRBcmdUeXBlcyB0aGVuIHRoZSBtYXRjaGluZyBwYXR0ZXJuXHJcbiAqICAgICAgICAgLy8gd2lsbCBiZSByZXR1cm5lZC4gT3RoZXJ3aXNlLCBhbiBlcnJvciB3aWxsIGJlIHRocm93bi5cclxuICogICAgICAgICBcclxuICogICAgICAgICBjaGVja2VyLmNoZWNrQXJnVHlwZXMoYXJndW1lbnRzKTtcclxuICogICAgIH0gY2F0Y2ggKGUpIHtcclxuICogICAgIFxyXG4gKiAgICAgICAgIC8vIEludmFsaWQgYXJndW1lbnQgdHlwZXMgc3VwcGxpZWQuIEhhbmRsZVxyXG4gKiAgICAgICAgIC8vIHRoZSBlcnJvciBvciBiYWlsLlxyXG4gKiAgICAgICAgIFxyXG4gKiAgICAgfVxyXG4gKiAgICAgXHJcbiAqICAgICAvLyB0aGUgYXJndW1lbnRzIHN1cHBsaWVkIHdpbGwgYmUgb2YgdGhlIHByb3BlciB0eXBlXHJcbiAqICAgICAvLyB5b3VyIGZ1bmN0aW9uIGNhbiBnbyBhaGVhZCBhbmQgZG8gdGhpbmdzIHdpdGggdGhlbVxyXG4gKiB9XHJcbiAqL1xyXG5hdHJvcGEuQXJnc0luZm8gPSBmdW5jdGlvbiBBcmdzSW5mbygpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuICAgIHZhciBleHBlY3RlZEFyZ1R5cGVzLFxyXG4gICAgY2hlY2tBcmdzLFxyXG4gICAgdGhhdDtcclxuICAgIC8qKlxyXG4gICAgICogSG9sZHMgdGhlIHByb3BlciByZWZlcmVuY2UgdG8gPGNvZGU+dGhpczwvY29kZT5cclxuICAgICAqIGZvciBwcml2YXRlIGZ1bmN0aW9ucy5cclxuICAgICAqIEB0eXBlIFRoaXNcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAZmllbGRPZiBhdHJvcGEuQXJnc0luZm8tXHJcbiAgICAgKi9cclxuICAgIHRoYXQgPSB0aGlzO1xyXG4gICAgLyoqXHJcbiAgICAgKiBIb2xkcyB0aGUgZXhwZWN0ZWQgYXJndW1lbnQgdHlwZXMgb2JqZWN0LlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEB0eXBlIEV4cGVjdGVkIEFyZyBUeXBlc1xyXG4gICAgICogQGZpZWxkT2YgYXRyb3BhLkFyZ3NJbmZvLVxyXG4gICAgICovXHJcbiAgICBleHBlY3RlZEFyZ1R5cGVzID0ge307XHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGV4cGVjdGVkIGFyZ3VtZW50IHR5cGVzLlxyXG4gICAgICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAgICAgKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICAgICAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICAgICAqIEB2ZXJzaW9uIDIwMTIwOTA5XHJcbiAgICAgKiBAbWV0aG9kT2YgYXRyb3BhLkFyZ3NJbmZvI1xyXG4gICAgICogQHBhcmFtIHtFeHBlY3RlZCBBcmcgVHlwZXN9IHR5cGVzT2JqIEFuIG9iamVjdCBjb250YWluaW5nIGluZm9ybWF0aW9uXHJcbiAgICAgKiAgYWJvdXQgdGhlIHR5cGVzIG9mIGFyZ3VtZW50cyB5b3UgZXhwZWN0LiBTcGVjaWZpY2FsbHksIHRoZSBvYmplY3Qgc2hvdWxkXHJcbiAgICAgKiAgbG9vayBsaWtlIHRoZSBleGFtcGxlLlxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIC8vIHR5cGVzT2JqIGlzIGV4cGVjdGVkIHRvIGJlIG9mIHRoZSBmb3JtOlxyXG4gICAgICogXHJcbiAgICAgKiB2YXIgdHlwZXNPYmogPSB7XHJcbiAgICAgKiAgICAgXCJuYW1lZEFyZ3VtZW50VHlwZXNBcnJheVwiIDogW1wic3RyaW5nXCIsIFwiZnVuY3Rpb25cIiwgXCJudW1iZXJcIl0sXHJcbiAgICAgKiAgICAgXCJuYW1lZEFsdGVybmF0ZUFyZ3VtZW50VHlwZXNBcnJheVwiIDogW1wib2JqZWN0XCIsIFwiZnVuY3Rpb25cIiwgXCJudW1iZXJcIl1cclxuICAgICAqIH07XHJcbiAgICAgKiBcclxuICAgICAqIC8vIFlvdSBtYXkgdXNlIGFzIG1hbnkgbmFtZWQgYXJyYXlzIGFzIHlvdSB3aXNoIGFuZCBjaGVja0FyZ1R5cGVzIHdpbGxcclxuICAgICAqIC8vIHRlc3QgZm9yIGEgbWF0Y2ggdG8gYXQgbGVhc3Qgb25lIG9mIHRoZSBwcm92aWRlZCBuYW1lZCBhcnJheXMuXHJcbiAgICAgKiBAdGhyb3dzIHthdHJvcGEuY3VzdG9tRXJyb3JzLkludmFsaWRBcmd1bWVudFR5cGVzRXJyb3J9IFRocm93cyBhbiBlcnJvciBpZiB0aGVcclxuICAgICAqICB0eXBlc09iaiBjYW4gbm90IGJlIHVzZWQgdG8gc2V0IHRoZSBleHBlY3RlZCBhcmd1bWVudCB0eXBlcy5cclxuICAgICAqL1xyXG4gICAgdGhpcy5zZXRFeHBlY3RlZEFyZ1R5cGVzID0gZnVuY3Rpb24gc2V0RXhwZWN0ZWRBcmdUeXBlcyh0eXBlc09iaikge1xyXG4gICAgICAgIHZhciBlcnJvciwgbmFtZXM7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZXJyb3IgPSBmYWxzZTtcclxuICAgICAgICBcclxuICAgICAgICBpZihhdHJvcGEuaW5xdWlyZS5pc09iamVjdE5vdE51bGwodHlwZXNPYmopKSB7XHJcbiAgICAgICAgICAgIG5hbWVzID0gT2JqZWN0LmtleXModHlwZXNPYmopO1xyXG4gICAgICAgICAgICBpZiAobmFtZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0ZWRBcmdUeXBlcyA9IHR5cGVzT2JqO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZXJyb3IgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZXJyb3IgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBpZihlcnJvcikge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgYXRyb3BhLmN1c3RvbUVycm9ycy5JbnZhbGlkQXJndW1lbnRUeXBlc0Vycm9yKFxyXG4gICAgICAgICAgICAgICAgJ3R5cGVzT2JqIGlzIGV4cGVjdGVkIHRvIGJlIG9mIHRoZSBmb3JtOiB2YXIgdHlwZXNPYmogPSAnICtcclxuICAgICAgICAgICAgICAgICd7IFwibmFtZWRBcmd1bWVudFR5cGVzQXJyYXlcIiA6ICcgK1xyXG4gICAgICAgICAgICAgICAgJyAgICBbXCJzdHJpbmdcIiwgXCJmdW5jdGlvblwiLCBcIm51bWJlclwiXSwgJyArXHJcbiAgICAgICAgICAgICAgICAnXCJuYW1lZEFsdGVybmF0ZUFyZ3VtZW50VHlwZXNBcnJheVwiIDogJyArXHJcbiAgICAgICAgICAgICAgICAnICAgW1wib2JqZWN0XCIsIFwiZnVuY3Rpb25cIiwgXCJudW1iZXJcIl0gfTsgJyArXHJcbiAgICAgICAgICAgICAgICAnWW91IG1heSB1c2UgYXMgbWFueSBuYW1lZCBhcnJheXMgYXMgeW91IHdpc2ggYW5kJyArXHJcbiAgICAgICAgICAgICAgICAnY2hlY2tBcmdUeXBlcyB3aWxsIHRlc3QgZm9yIGEgbWF0Y2ggdG8gYXQgbGVhc3Qgb25lIG9mIHRoZSAnICtcclxuICAgICAgICAgICAgICAgICdwcm92aWRlZCBuYW1lZCBhcnJheXMuJ1xyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIHR5cGVzIG9mIGFyZ3VtZW50cy5cclxuICAgICAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gICAgICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAgICAgKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAgICAgKiBAdmVyc2lvbiAyMDEyMDkwOVxyXG4gICAgICogQG1ldGhvZE9mIGF0cm9wYS5BcmdzSW5mbyNcclxuICAgICAqIEBwYXJhbSB7YXJndW1lbnRzfSBhcmdzIEFuIGFyZ3VtZW50cyBvYmplY3QsIG9yIGFueXRoaW5nIHlvdSB3YW50IHRvXHJcbiAgICAgKiBjaGVjayB0aGUgdHlwZSBvZi5cclxuICAgICAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBhbiBhcnJheSBvZiB0aGUgdHlwZXMgb2YgYXJndW1lbnRzIHBhc3NlZCBpbi5cclxuICAgICAqL1xyXG4gICAgdGhpcy5nZXRBcmdUeXBlcyA9IGZ1bmN0aW9uIGdldEFyZ1R5cGVzKGFyZ3MpIHtcclxuICAgICAgICB2YXIgeCxcclxuICAgICAgICBhcmdUeXBlcztcclxuICAgICAgICBhcmdUeXBlcyA9IFtdO1xyXG4gICAgICAgIGZvciAoeCBpbiBhcmdzKSB7XHJcbiAgICAgICAgICAgIGlmIChhcmdzLmhhc093blByb3BlcnR5KHgpKSB7XHJcbiAgICAgICAgICAgICAgICBhcmdUeXBlcy5wdXNoKHR5cGVvZihhcmdzW3hdKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGFyZ1R5cGVzO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQ29tcGFyZXMgdGhlIGV4cGVjdGVkIGFyZ3VtZW50cyB0eXBlcyB0byB0aGVcclxuICAgICAqIHJlY2VpdmVkIGFyZ3VtZW50cyB0eXBlcy5cclxuICAgICAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gICAgICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAgICAgKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAgICAgKiBAdmVyc2lvbiAyMDEyMDkwOVxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZXRob2RPZiBhdHJvcGEuQXJnc0luZm8tXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBleHBlY3RlZFR5cGVzQXJyYXkgQW4gYXJyYXkgdGFrZW4gZnJvbSB0aGUgdXNlclxyXG4gICAgICogY3JlYXRlZCBhcmd1bWVudCB0eXBlcyBvYmplY3QuXHJcbiAgICAgKiBAcGFyYW0ge2FyZ3VtZW50c30gYXJncyBhbiBhcmd1bWVudHMgb2JqZWN0LlxyXG4gICAgICogQHJldHVybnMge0Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiB0aGUgZXhwZWN0ZWQgdHlwZXMgbWF0Y2ggZm9yIHR5cGVcclxuICAgICAqICBhbmQgYXJlIGluIHRoZSBzYW1lIG9yZGVyIGFzIHRoZSByZWNlaXZlZCB0eXBlcy5cclxuICAgICAqIEByZXF1aXJlcyBhdHJvcGEuYXJyYXlzLm1hdGNoXHJcbiAgICAgKi9cclxuICAgIGNoZWNrQXJncyA9IGZ1bmN0aW9uIGNoZWNrQXJncyhleHBlY3RlZFR5cGVzQXJyYXksIGFyZ3MpIHtcclxuICAgICAgICB2YXIgdHlwZXM7XHJcbiAgICAgICAgdHlwZXMgPSB7fTtcclxuICAgICAgICB0eXBlcy5leHBlY3RlZCA9IGV4cGVjdGVkVHlwZXNBcnJheTtcclxuICAgICAgICB0eXBlcy5yZWNlaXZlZCA9IHRoYXQuZ2V0QXJnVHlwZXMoYXJncyk7XHJcbiAgICAgICAgcmV0dXJuIGF0cm9wYS5hcnJheXMubWF0Y2godHlwZXMuZXhwZWN0ZWQsIHR5cGVzLnJlY2VpdmVkKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIENoZWNrcyB0aGUgZ2l2ZW4gYXJndW1lbnRzIG9iamVjdCBhZ2FpbnN0IHRoZSBleHBlY3RlZFxyXG4gICAgICogYXJndW1lbnRzIHR5cGVzLlxyXG4gICAgICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAgICAgKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICAgICAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICAgICAqIEB2ZXJzaW9uIDIwMTIwOTA5XHJcbiAgICAgKiBAbWV0aG9kT2YgYXRyb3BhLkFyZ3NJbmZvI1xyXG4gICAgICogQHBhcmFtIHthcmd1bWVudHN9IGFyZ3MgQW4gYXJndW1lbnRzIG9iamVjdFxyXG4gICAgICogQHJldHVybnMge1N0cmluZ30gVGhlIHVzZXIgYXNzaWduZWQga2V5IHdoaWNoIG1hdGNoZXMgdGhlXHJcbiAgICAgKiBhcmd1bWVudHMgc3VwcGxpZWQsIG9yIHRocm93cyBhbiBlcnJvci5cclxuICAgICAqIEB0aHJvd3Mge2F0cm9wYS5jdXN0b21FcnJvcnMuSW52YWxpZEFyZ3VtZW50VHlwZXNFcnJvcn0gVGhyb3dzIGFuIGVycm9yIGlmIG5vIG1hdGNoaW5nXHJcbiAgICAgKiAgcGF0dGVybiBvZiBhcmd1bWVudCB0eXBlcyBjYW4gYmUgZm91bmQgZm9yIDxjb2RlPmFyZ3M8L2NvZGU+XHJcbiAgICAgKiBAc2VlIGF0cm9wYS5BcmdzSW5mbyNzZXRFeHBlY3RlZEFyZ1R5cGVzXHJcbiAgICAgKi9cclxuICAgIHRoaXMuY2hlY2tBcmdUeXBlcyA9IGZ1bmN0aW9uIGNoZWNrQXJnVHlwZXMoYXJncykge1xyXG4gICAgICAgIHZhciBleHBlY3RlZFR5cGVzO1xyXG4gICAgICAgIGlmIChPYmplY3Qua2V5cyhleHBlY3RlZEFyZ1R5cGVzKS5sZW5ndGggPCAxKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBhdHJvcGEuY3VzdG9tRXJyb3JzLkludmFsaWRBcmd1bWVudFR5cGVzRXJyb3IoXHJcbiAgICAgICAgICAgICAgICAnRXhwZWN0ZWQgYXJndW1lbnQgdHlwZXMgaXMgbm90IHNldC4gVXNlICcgK1xyXG4gICAgICAgICAgICAgICAgJ3NldEV4cGVjdGVkQXJnVHlwZXModHlwZXNPYmopIHRvIHNldC4gdHlwZXNPYmogaXMgYW4gJyArXHJcbiAgICAgICAgICAgICAgICAnb2JqZWN0IHdob3NlIHByb3BlcnRpZXMgYXJlIGFycmF5cyBvZiBzdHJpbmdzIHJlcHJlc2VudGluZyAnICtcclxuICAgICAgICAgICAgICAgICd0aGUgdHlwZW9mKGFyZ3VtZW50KSBmb3IgZWFjaCBhcmd1bWVudCwgaW4gdGhlIGV4YWN0IG9yZGVyICcgK1xyXG4gICAgICAgICAgICAgICAgJ2luIHdoaWNoIHRoZXkgd2lsbCBiZSBnaXZlbiB0byB0aGUgZnVuY3Rpb24uIFVzaW5nIG11bHRpcGxlICcgK1xyXG4gICAgICAgICAgICAgICAgJ3Byb3BlcnRpZXMgaXQgaXMgcG9zc2libGUgdG8gZGVmaW5lIGFsdGVybmF0aXZlIGFjY2VwdGFibGUgJyArXHJcbiAgICAgICAgICAgICAgICAnYXJndW1lbnQgdHlwZSBzZXRzLiBVc2UgZ2V0QXJnVHlwZXMoYXJndW1lbnRzKSBhcyBhICcgK1xyXG4gICAgICAgICAgICAgICAgJ2NvbnZlbmllbnQgd2F5IG9mIGdldHRpbmcgdGhlIGFycmF5IHlvdSB3YW50IHRvIGhhcmQgY29kZSAnICtcclxuICAgICAgICAgICAgICAgICdpbiBmb3IgdmFsaWRhdGlvbi4gRXhhbXBsZTogdmFyIHR5cGVzT2JqID0gJyArXHJcbiAgICAgICAgICAgICAgICAneyBcIm1lc3NhZ2VJbmNsdWRlZFwiIDogW1wic3RyaW5nXCIsIFwiZnVuY3Rpb25cIiwgXCJudW1iZXJcIl0sICcgK1xyXG4gICAgICAgICAgICAgICAgJ1wibWVzc2FnZU5vdEluY2x1ZGVkXCIgOiBbXCJvYmplY3RcIiwgXCJmdW5jdGlvblwiLCBcIm51bWJlclwiXSB9OydcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChleHBlY3RlZFR5cGVzIGluIGV4cGVjdGVkQXJnVHlwZXMpIHtcclxuICAgICAgICAgICAgaWYgKGV4cGVjdGVkQXJnVHlwZXMuaGFzT3duUHJvcGVydHkoZXhwZWN0ZWRUeXBlcykpIHtcclxuICAgICAgICAgICAgICAgIGlmIChjaGVja0FyZ3MoZXhwZWN0ZWRBcmdUeXBlc1tleHBlY3RlZFR5cGVzXSwgYXJncykpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXhwZWN0ZWRUeXBlcztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aHJvdyBuZXcgYXRyb3BhLmN1c3RvbUVycm9ycy5JbnZhbGlkQXJndW1lbnRUeXBlc0Vycm9yKFxyXG4gICAgICAgICAgICAnaW52YWxpZCBhcmd1bWVudCB0eXBlIEAgYXRyb3BhLkFyZ3NJbmZvLmNoZWNrQXJnVHlwZXMnKTtcclxuICAgIH07XHJcbn07XHJcblxyXG5cclxuXHJcblxyXG53aGlsZShhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMubGVuZ3RoID4gMCkge1xyXG4gICAgYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLnBvcCgpKCk7XHJcbn1cclxubW9kdWxlLmV4cG9ydHMgPSBhdHJvcGE7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9kb2NzL3ZzZG9jL09wZW5MYXllcnNBbGwuanNcIi8+XHJcbnZhciBhdHJvcGEgPSByZXF1aXJlKCdhdHJvcGEtaGVhZGVyJyk7XHJcbi8qanNsaW50XHJcbiAgICBpbmRlbnQ6IDQsXHJcbiAgICBtYXhlcnI6IDUwLFxyXG4gICAgd2hpdGU6IHRydWUsXHJcbiAgICBicm93c2VyOiB0cnVlLFxyXG4gICAgZGV2ZWw6IHRydWUsXHJcbiAgICBwbHVzcGx1czogdHJ1ZSxcclxuICAgIHJlZ2V4cDogdHJ1ZVxyXG4qL1xyXG4vKmdsb2JhbCBhdHJvcGEgKi9cclxuLy8gZW5kIGhlYWRlclxyXG5cclxuLyoqXHJcbiAqIFByb3ZpZGVzIHJhbmRvbSBzdHJpbmdzIGFuZCBudW1iZXJzLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMjA5MDlcclxuICogQG5hbWVzcGFjZSBQcm92aWRlcyByYW5kb20gc3RyaW5ncyBhbmQgbnVtYmVycy5cclxuICovXHJcbmF0cm9wYS5yYW5kb20gPSB7fTtcclxuLyoqXHJcbiAqIEdpdmVzIHlvdSBhIHJhbmRvbSBzdHJpbmcgd2hvc2UgbGVuZ3RoIGFuZCBjaGFyYWN0ZXJzIHlvdSBzcGVjaWZ5LlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMjA5MDlcclxuICogQHBhcmFtIHtOdW1iZXJ9IHN0cmluZ0xlbmd0aCBUaGlzIGlzIHRoZSBsZW5ndGggb2YgdGhlIHN0cmluZy5cclxuICogQHBhcmFtIHtTdHJpbmd9IGNoYXJhY3RlckNsYXNzIE9wdGlvbmFsLiBNYXkgYmUgb25lIG9mOlxyXG4gKiAgbnVtZXJpYywgY2FwcywgbG93ZXIsIGFscGhhLCBhbHBoYW51bWVyaWMsIHB1bmN0dWF0aW9uLCB2b3dlbCwgY29uc29uYW50XHJcbiAqICBUaGlzIGlzIHRoZSB0eXBlIG9mIGNoYXJhY3RlcnMgeW91IHdhbnQgcmV0dXJuZWQgdG8geW91LiBEZWZhdWx0cyB0b1xyXG4gKiAgYWxwaGFudW1lcmljLlxyXG4gKiBAcmV0dXJuIHtTdHJpbmd9IEEgcmFuZG9tIHN0cmluZyBvZiBzcGVjaWZpZWQgbGVuZ3RoIGFuZCBjb21wb3NpdGlvbi5cclxuICovXHJcbmF0cm9wYS5yYW5kb20uc3RyaW5nID0gZnVuY3Rpb24gcmFuZG9tU3RyaW5nKHN0cmluZ0xlbmd0aCwgY2hhcmFjdGVyQ2xhc3MpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuICAgIHZhciBudW1lcmljLFxyXG4gICAgdm93ZWwsXHJcbiAgICBjb25zb25hbnQsXHJcbiAgICBsb3dlcixcclxuICAgIGNhcHMsXHJcbiAgICBhbHBoYSxcclxuICAgIGFscGhhbnVtZXJpYyxcclxuICAgIHB1bmN0dWF0aW9uLFxyXG4gICAgY2hhcnMsXHJcbiAgICBzdHJpbmdfbGVuZ3RoLFxyXG4gICAgcmFuZG9tc3RyaW5nLFxyXG4gICAgaSxcclxuICAgIGNoYXJhY3RlcjtcclxuICAgIFxyXG4gICAgbnVtZXJpYyA9ICcwMTIzNDU2Nzg5JztcclxuICAgIHZvd2VsID0gJ2FlaW91eSc7XHJcbiAgICBjb25zb25hbnQgPSAnYmNkZmdoamtsbW5wcXJzdHZ3eHonO1xyXG4gICAgbG93ZXIgPSB2b3dlbCArIGNvbnNvbmFudDtcclxuICAgIGNhcHMgPSBsb3dlci50b1VwcGVyQ2FzZSgpO1xyXG4gICAgYWxwaGEgPSBjYXBzICsgbG93ZXI7XHJcbiAgICBhbHBoYW51bWVyaWMgPSBudW1lcmljICsgY2FwcyArIGxvd2VyO1xyXG4gICAgcHVuY3R1YXRpb24gPSAnLj8hJztcclxuICAgIHJhbmRvbXN0cmluZyA9ICcnO1xyXG4gICAgc3dpdGNoIChjaGFyYWN0ZXJDbGFzcykge1xyXG4gICAgY2FzZSAnbnVtZXJpYyc6XHJcbiAgICAgICAgY2hhcnMgPSBudW1lcmljO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAnY2Fwcyc6XHJcbiAgICAgICAgY2hhcnMgPSBjYXBzO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAnbG93ZXInOlxyXG4gICAgICAgIGNoYXJzID0gbG93ZXI7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICBjYXNlICdhbHBoYSc6XHJcbiAgICAgICAgY2hhcnMgPSBhbHBoYTtcclxuICAgICAgICBicmVhaztcclxuICAgIGNhc2UgJ2FscGhhbnVtZXJpYyc6XHJcbiAgICAgICAgY2hhcnMgPSBhbHBoYW51bWVyaWM7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICBjYXNlICdwdW5jdHVhdGlvbic6XHJcbiAgICAgICAgY2hhcnMgPSBwdW5jdHVhdGlvbjtcclxuICAgICAgICBicmVhaztcclxuICAgIGNhc2UgJ3Zvd2VsJzpcclxuICAgICAgICBjaGFycyA9IHZvd2VsO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAnY29uc29uYW50JzpcclxuICAgICAgICBjaGFycyA9IGNvbnNvbmFudDtcclxuICAgICAgICBicmVhaztcclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgY2hhcnMgPSBhbHBoYW51bWVyaWM7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgICBpZiAoc3RyaW5nTGVuZ3RoID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBzdHJpbmdfbGVuZ3RoID0gNDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc3RyaW5nX2xlbmd0aCA9IHN0cmluZ0xlbmd0aDtcclxuICAgIH1cclxuICAgIGZvciAoaSA9IDA7IGkgPCBzdHJpbmdfbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBjaGFyYWN0ZXIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjaGFycy5sZW5ndGgpO1xyXG4gICAgICAgIHJhbmRvbXN0cmluZyArPSBjaGFyc1tjaGFyYWN0ZXJdO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJhbmRvbXN0cmluZztcclxufTtcclxuLyoqXHJcbiAqIEdlbmVyYXRlcyBhIHJhbmRvbSBudW1iZXIgYmV0d2VlbiB0aGUgc3BlY2lmaWVkIG1pbiBhbmQgbWF4IHZhbHVlLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMjA5MDlcclxuICogQHBhcmFtIHtOdW1iZXJ9IG1pbiBUaGUgbG93ZXN0IG51bWJlciB5b3Ugd2FudCByZXR1cm5lZFxyXG4gKiBAcGFyYW0ge051bWJlcn0gbWF4IFRoZSBoaWdoZXN0IG51bWJlciB5b3Ugd2FudCByZXR1cm5lZFxyXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBBIHJhbmRvbSBudW1iZXIgd2l0aGluIHRoZSBzcGVjaWZpZWQgcmFuZ2UuXHJcbiAqL1xyXG5hdHJvcGEucmFuZG9tLmludGVnZXIgPSBmdW5jdGlvbiByYW5kb21JbnRlZ2VyKG1pbiwgbWF4KSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpICsgbWluKTtcclxufTtcclxuLyoqXHJcbiAqIEdldCBhIHJhbmRvbSBwcm9wZXJ0eSBuYW1lIGZyb20gdGhlIGdpdmVuIG9iamVjdC5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTIwOTA5XHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogVGhlIG9iamVjdCB0byBzZWxlY3QgYSByYW5kb21cclxuICogIHByb3BlcnR5IG5hbWUgZnJvbS5cclxuICogQHJldHVybiB7U3RyaW5nfSBBIHJhbmRvbSBwcm9wZXJ0eSBuYW1lIGZyb20gdGhlXHJcbiAqICBnaXZlbiBvYmplY3QuXHJcbiAqL1xyXG5hdHJvcGEucmFuZG9tLmdldFByb3BlcnR5TmFtZSA9IGZ1bmN0aW9uIChvYmopIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgdmFyIGFycjtcclxuICAgIGFyciA9IE9iamVjdC5rZXlzKG9iaik7XHJcbiAgICByZXR1cm4gYXJyW2F0cm9wYS5yYW5kb20uZ2V0QXJyYXlLZXkoYXJyKV07XHJcbn07XHJcbi8qKlxyXG4gKiBHZXQgYSByYW5kb20ga2V5IGZyb20gdGhlIGdpdmVuIGFycmF5LlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMjA5MDlcclxuICogQHBhcmFtIHtBcnJheX0gYXJyIFRoZSBhcnJheSB0byBzZWxlY3QgYSByYW5kb21cclxuICogIGtleSBmcm9tLiBUaGUga2V5cyBvZiB0aGUgYXJyYXkgbXVzdCBiZSBjb250aWd1b3VzLlxyXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IEEgcmFuZG9tIGludGVnZXIgYmV0d2VlbiAwIGFuZFxyXG4gKiAgPGNvZGU+YXJyLmxlbmd0aDwvY29kZT5cclxuICovXHJcbmF0cm9wYS5yYW5kb20uZ2V0QXJyYXlLZXkgPSBmdW5jdGlvbiAoYXJyKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBhcnIubGVuZ3RoKTtcclxufTtcclxuLyoqXHJcbiAqIEdldCBhIHJhbmRvbSB2YWx1ZSBmcm9tIHRoZSBnaXZlbiBhcnJheS5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTIwOTA5XHJcbiAqIEBwYXJhbSB7QXJyYXl9IGFyciBUaGUgYXJyYXkgdG8gc2VsZWN0IGEgcmFuZG9tXHJcbiAqICB2YWx1ZSBmcm9tLiBUaGUga2V5cyBvZiB0aGUgYXJyYXkgbXVzdCBiZSBjb250aWd1b3VzLlxyXG4gKiBAcmV0dXJuIHtNaXhlZH0gQSByYW5kb20gdmFsdWUgZnJvbSB0aGUgZ2l2ZW4gYXJyYXkuXHJcbiAqL1xyXG5hdHJvcGEucmFuZG9tLmdldEFycmF5VmFsdWUgPSBmdW5jdGlvbiAoYXJyKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHJldHVybiBhcnJbYXRyb3BhLnJhbmRvbS5nZXRBcnJheUtleShhcnIpXTtcclxufTtcclxuLyoqXHJcbiAqIFJlbW92ZSBhIHJhbmRvbSBlbGVtZW50IGZyb20gdGhlIGdpdmVuIGFycmF5LlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMjA5MDlcclxuICogQHBhcmFtIHtBcnJheX0gYXJyIFRoZSBhcnJheSB0byByZW1vdmUgYSByYW5kb21cclxuICogIGVsZW1lbnQgZnJvbS4gVGhlIGtleXMgb2YgdGhlIGFycmF5IG11c3QgYmUgY29udGlndW91cy5cclxuICogQHJldHVybiB7TWl4ZWR9IEEgcmFuZG9tIHZhbHVlIGZyb20gdGhlIGdpdmVuIGFycmF5LlxyXG4gKi9cclxuYXRyb3BhLnJhbmRvbS5wdWxsQXJyYXlFbGVtZW50ID0gZnVuY3Rpb24gKGFycikge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICB2YXIgayxcclxuICAgIGQ7XHJcbiAgICBrID0gYXRyb3BhLnJhbmRvbS5nZXRBcnJheUtleShhcnIpO1xyXG4gICAgZCA9IGFycltrXTtcclxuICAgIGFyci5zcGxpY2UoaywgMSk7XHJcbiAgICByZXR1cm4gZDtcclxufTtcclxuLyoqXHJcbiAqIFJlbW92ZSBhIHJhbmRvbSBwcm9wZXJ0eSBmcm9tIHRoZSBnaXZlbiBvYmplY3QuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEyMDkwOVxyXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIFRoZSBvYmplY3QgdG8gcmVtb3ZlIGEgcmFuZG9tXHJcbiAqICBwcm9wZXJ0eSBmcm9tLlxyXG4gKiBAcmV0dXJuIHtNaXhlZH0gQSByYW5kb20gdmFsdWUgZnJvbSB0aGUgZ2l2ZW4gb2JqZWN0LlxyXG4gKi9cclxuYXRyb3BhLnJhbmRvbS5wdWxsUHJvcGVydHkgPSBmdW5jdGlvbiAob2JqKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHZhciBwTmFtZSxcclxuICAgIG9iakRhdGE7XHJcbiAgICBwTmFtZSA9IGF0cm9wYS5yYW5kb20uZ2V0UHJvcGVydHlOYW1lKG9iaik7XHJcbiAgICBvYmpEYXRhID0gb2JqW3BOYW1lXTtcclxuICAgIGRlbGV0ZSBvYmpbcE5hbWVdO1xyXG4gICAgcmV0dXJuIG9iakRhdGE7XHJcbn07XHJcblxyXG5cclxuXHJcblxyXG53aGlsZShhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMubGVuZ3RoID4gMCkge1xyXG4gICAgYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLnBvcCgpKCk7XHJcbn1cclxubW9kdWxlLmV4cG9ydHMgPSBhdHJvcGE7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9kb2NzL3ZzZG9jL09wZW5MYXllcnNBbGwuanNcIi8+XHJcbnZhciBhdHJvcGEgPSByZXF1aXJlKCdhdHJvcGEtaGVhZGVyJyk7XHJcbi8qanNsaW50XHJcbiAgICBpbmRlbnQ6IDQsXHJcbiAgICBtYXhlcnI6IDUwLFxyXG4gICAgd2hpdGU6IHRydWUsXHJcbiAgICBicm93c2VyOiB0cnVlLFxyXG4gICAgZGV2ZWw6IHRydWUsXHJcbiAgICBwbHVzcGx1czogdHJ1ZSxcclxuICAgIHJlZ2V4cDogdHJ1ZVxyXG4qL1xyXG4vKmdsb2JhbCBhdHJvcGEgKi9cclxuLy8gZW5kIGhlYWRlclxyXG5cclxuLyoqXHJcbiAqIENvbnRhaW5lciBmb3IgcmVnZXggZnVuY3Rpb25zLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMjA5MDlcclxuICogQG5hbWVzcGFjZSBDb250YWluZXIgZm9yIHJlZ2V4IGZ1bmN0aW9ucy5cclxuICovXHJcbmF0cm9wYS5yZWdleCA9IHt9O1xyXG4vKipcclxuICogUmVnZXggcGF0dGVybnNcclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEBuYW1lc3BhY2UgUmVnZXggcGF0dGVybnMuXHJcbiAqL1xyXG5hdHJvcGEucmVnZXgucGF0dGVybnMgPSB7XHJcbiAgICAvKipcclxuICAgICAqIGZpbmRzIHJlcGVhdGVkIHdvcmRzIGFuZCBwaHJhc2VzXHJcbiAgICAgKiBAdHlwZSBSZWdFeHBcclxuICAgICAqL1xyXG4gICAgcmVwZWF0ZWRXb3JkcyA6IC8oXFxiLnszLH1cXGIpXFxzKihcXDEpL2csXHJcbiAgICAvKipcclxuICAgICAqIGZpbmRzIHBhcmFncmFwaCBicmVha3NcclxuICAgICAqIEB0eXBlIFJlZ0V4cFxyXG4gICAgICovXHJcbiAgICBwYXJhZ3JhcGhCcmVha3MgOiAvKFxcclxcblxcclxcbnxcXG5cXG58XFxyXFxyKS9nLFxyXG4gICAgLyoqXHJcbiAgICAgKiBmaW5kcyBsaW5lIGJyZWFrc1xyXG4gICAgICogQHR5cGUgUmVnRXhwXHJcbiAgICAgKi9cclxuICAgIGxpbmVCcmVha3MgOiAvKFxcclxcbnxcXHJ8XFxuKS9nXHJcbn07XHJcbi8qKlxyXG4gKiBBcHBlbmRzIGNvbW1vbiBwcmVmaXgsIHN1ZmZpeCwgYW5kIHdvcmQgYm91bmRhcnkgcmVnZXggc3RyaW5ncyB0b1xyXG4gKiB0aGUgc3VwcGxpZWQgd29yZC5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwMTEwXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSB3b3JkIFRoZSB3b3JkIHRvIGFwcGVuZCBwcmVmaXggYW5kIHN1ZmZpeCB0b1xyXG4gKiBAcGFyYW0ge0ludGVnZXJ9IHRocmVzaG9sZCBUaGUgd29yZC5sZW5ndGggYXQgd2hpY2ggaXQgZG9lcyBub3RcclxuICogbWFrZSBzZW5zZSB0byBhcHBlbmQgcHJlZml4IGFuZCBzdWZmaXguIERlZmF1bHRzIHRvIDMuXHJcbiAqIEByZXR1cm5zIHtTdHJpbmd9IFJldHVybnMgdGhlIHN1cHBsaWVkIHdvcmQgd2l0aCBwcmVmaXgsIHN1ZmZpeCxcclxuICogYW5kIHdvcmQgYm91bmRhcmllcyBhdHRhY2hlZC4gSWYgdGhlIHdvcmQubGVuZ3RoIHdhcyBub3QgZ3JlYXRlclxyXG4gKiB0aGFuIHRoZSB0aHJlc2hvbGQsIG9ubHkgd29yZCBib3VuZGFyaWVzIGFyZSBhdHRhY2hlZC4gVGhlIHN0cmluZ1xyXG4gKiByZXByZXNlbnRzIGEgUmVnRXggd2hpY2ggc2hvdWxkIHBpY2sgb3V0IG1vc3QgZm9ybXMgb2YgcmVndWxhclxyXG4gKiB3b3Jkcy5cclxuICovXHJcbmF0cm9wYS5yZWdleC5hcHBlbmRQcmVmaXhlc0FuZFN1ZmZpeGVzID0gZnVuY3Rpb24gKHdvcmQsIHRocmVzaG9sZCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICB2YXIgcHJlZml4ZXMsXHJcbiAgICBzdWZmaXhlcztcclxuICAgIHByZWZpeGVzID0gJyhwcmV8dW58cmUpPyc7XHJcbiAgICBzdWZmaXhlcyA9ICcoaWZpY2F0aW9ufCcgK1xyXG4gICAgICAgICAgICAgICAgJ3Rpb25hbGx5fCcgK1xyXG4gICAgICAgICAgICAgICAgJ2ljYXRpb258JyArXHJcbiAgICAgICAgICAgICAgICAnaWZpZWR8aXN0aWN8aW5lc3N8JyArXHJcbiAgICAgICAgICAgICAgICAnZmFyZXx0aW9ufGFuY2V8ZW5jZXxsZXNzfGFsbHl8YWJsZXxuZXNzfGl6ZWR8aXNlZHwnICtcclxuICAgICAgICAgICAgICAgICdvdXN8aWZ5fGluZ3xpdHl8ZnVsfGFudHxhdGV8ZXN0fGlzbXxpem18aXN0fCcgK1xyXG4gICAgICAgICAgICAgICAgJ2ljfGFsfGVkfGVyfGV0fGx5fHJzfGlufCcgK1xyXG4gICAgICAgICAgICAgICAgJ3l8c3xyfGQpPyc7XHJcbiAgICBcclxuICAgIHRocmVzaG9sZCA9IHRocmVzaG9sZCA9PT0gdW5kZWZpbmVkID8gMyA6IHRocmVzaG9sZDtcclxuICAgIFxyXG4gICAgaWYgKHdvcmQubGVuZ3RoID4gdGhyZXNob2xkKSB7XHJcbiAgICAgICAgd29yZCA9ICdcXFxcYicgKyBwcmVmaXhlcyArIHdvcmQgKyBzdWZmaXhlcyArICdcXFxcYic7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHdvcmQgPSAnXFxcXGIoKScgKyB3b3JkICsgJygpXFxcXGInO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHdvcmQ7XHJcbn07XHJcblxyXG5cclxuXHJcblxyXG53aGlsZShhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMubGVuZ3RoID4gMCkge1xyXG4gICAgYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLnBvcCgpKCk7XHJcbn1cclxubW9kdWxlLmV4cG9ydHMgPSBhdHJvcGE7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9kb2NzL3ZzZG9jL09wZW5MYXllcnNBbGwuanNcIi8+XHJcbnZhciBhdHJvcGEgPSByZXF1aXJlKCdhdHJvcGEtaGVhZGVyJyk7XHJcbmF0cm9wYS5yZWdleCA9IHJlcXVpcmUoJ2F0cm9wYS1yZWdleCcpLnJlZ2V4O1xyXG5hdHJvcGEuYXJyYXlzID0gcmVxdWlyZSgnYXRyb3BhLWFycmF5cycpLmFycmF5cztcclxuLypqc2xpbnRcclxuICAgIGluZGVudDogNCxcclxuICAgIG1heGVycjogNTAsXHJcbiAgICB3aGl0ZTogdHJ1ZSxcclxuICAgIGJyb3dzZXI6IHRydWUsXHJcbiAgICBkZXZlbDogdHJ1ZSxcclxuICAgIHBsdXNwbHVzOiB0cnVlLFxyXG4gICAgcmVnZXhwOiB0cnVlXHJcbiovXHJcbi8qZ2xvYmFsIGF0cm9wYSAqL1xyXG4vLyBlbmQgaGVhZGVyXHJcblxyXG4vKipcclxuICogQSBmZXcgdXRpbGl0aWVzIGZvciBtYW5pcHVsYXRpbmcgc3RyaW5ncy5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEBuYW1lc3BhY2UgQSBmZXcgdXRpbGl0aWVzIGZvciBtYW5pcHVsYXRpbmcgc3RyaW5ncy5cclxuICogQHJlcXVpcmVzIGF0cm9wYS5yZWdleC5wYXR0ZXJuc1xyXG4gKi9cclxuYXRyb3BhLnN0cmluZyA9IHt9O1xyXG4vKipcclxuICogUmVwbGFjZXMgcmVwZWF0ZWQgd29yZHMgYW5kIHBocmFzZXMgd2l0aCBhIHNpbmdsZSB3b3JkIG9yIHBocmFzZS5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwNzAxXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmcgVGhlIHN0cmluZyB0byByZW1vdmUgcmVwZWF0ZWQgd29yZHMgZnJvbS5cclxuICogQHJldHVybnMge1N0cmluZ30gUmV0dXJucyB0aGUgZ2l2ZW4gc3RyaW5nIHdpdGggcmVwZWF0ZWQgd29yZHMgYW5kXHJcbiAqICBwaHJhc2VzIHJlbW92ZWQuXHJcbiAqL1xyXG5hdHJvcGEuc3RyaW5nLnJlbW92ZVJlcGVhdGVkV29yZCA9IGZ1bmN0aW9uIHJlbW92ZVJlcGVhdGVkV29yZCAoc3RyaW5nKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHJldHVybiBzdHJpbmcucmVwbGFjZShhdHJvcGEucmVnZXgucGF0dGVybnMucmVwZWF0ZWRXb3JkcywgJyQxJyk7XHJcbn07XHJcbi8qKlxyXG4gKiBDcmVhdGVzIHBhcmFncmFwaCBicmVha3MgYXQgZXZlcnkgb2NjdXJyZW5jZSBvZiB0d28gY29uc2VjdXRpdmUgbGluZSBicmVha3MuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDcwMVxyXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nIFRoZSBzdHJpbmcgdG8gaW5zZXJ0IHBhcmFncmFwaCB0YWdzIGludG8uXHJcbiAqIEByZXR1cm5zIHtTdHJpbmd9IFJldHVybnMgdGhlIGdpdmVuIHN0cmluZyB3aXRoIHBhcmFncmFwaCBicmVha3MgaW5zZXJ0ZWQuXHJcbiAqL1xyXG5hdHJvcGEuc3RyaW5nLmxpbmVCcmVha3NUb1BhcmFncmFwaFRhZ3MgPSBmdW5jdGlvbiBsaW5lQnJlYWtzVG9QYXJhZ3JhcGhUYWdzIChzdHJpbmcpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgdmFyIG91dCA9IHN0cmluZy5yZXBsYWNlKGF0cm9wYS5yZWdleC5wYXR0ZXJucy5wYXJhZ3JhcGhCcmVha3MsICc8L3A+PHA+Jyk7XHJcbiAgICBvdXQgPSAnPHA+JyArIG91dC50cmltKCkgKyAnPC9wPic7XHJcbiAgICBvdXQgPSBvdXQucmVwbGFjZSgvXFxzKzxcXC8ocHxicik+L2csICc8LyQxPicpO1xyXG4gICAgcmV0dXJuIG91dDtcclxufTtcclxuLyoqXHJcbiAqIENyZWF0ZXMgYnJlYWsgdGFncyBhdCBldmVyeSBsaW5lIGJyZWFrLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzA3MDFcclxuICogQHBhcmFtIHtTdHJpbmd9IHN0cmluZyBUaGUgc3RyaW5nIHRvIGluc2VydCBicmVhayB0YWdzIGludG8uXHJcbiAqIEByZXR1cm5zIHtTdHJpbmd9IFJldHVybnMgdGhlIGdpdmVuIHN0cmluZyB3aXRoIGJyZWFrIHRhZ3MgaW5zZXJ0ZWQuXHJcbiAqL1xyXG5hdHJvcGEuc3RyaW5nLmxpbmVCcmVha3NUb0JyZWFrVGFncyA9IGZ1bmN0aW9uIGxpbmVCcmVha3NUb0JyZWFrVGFncyAoc3RyaW5nKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHJldHVybiBzdHJpbmcucmVwbGFjZShhdHJvcGEucmVnZXgucGF0dGVybnMubGluZUJyZWFrcywgJzxicj4nKTtcclxufTtcclxuLyoqXHJcbiAqIE5vcm1hbGl6ZXMgbGluZSBicmVha3MgdG8gYFxcbmAuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDcwMVxyXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nIFRoZSBzdHJpbmcgdG8gbm9ybWFsaXplLlxyXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBSZXR1cm5zIHRoZSBnaXZlbiBzdHJpbmcgd2l0aCBub3JtYWxpemVkIGxpbmUgYnJlYWtzLlxyXG4gKi9cclxuYXRyb3BhLnN0cmluZy5ub3JtYWxpemVFb2wgPSBmdW5jdGlvbiBub3JtYWxpemVFb2wgKHN0cmluZykge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoYXRyb3BhLnJlZ2V4LnBhdHRlcm5zLmxpbmVCcmVha3MsICdcXG4nKTtcclxufTtcclxuLyoqXHJcbiAqIENvbnZlcnRzIHRoZSBmaXJzdCBjaGFyYWN0ZXIgb2YgYSBnaXZlbiBzdHJpbmcgdG9cclxuICogdXBwZXJjYXNlLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMjA5MDlcclxuICogQHBhcmFtIHtTdHJpbmd9IHN0cmluZyBUaGUgc3RyaW5nIGZvciB3aGljaCB5b3Ugd2FudCB0aGVcclxuICogZmlyc3QgbGV0dGVyIHRvIGJlIGluIHVwcGVyIGNhc2UuXHJcbiAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBnaXZlbiBzdHJpbmcgd2l0aCBpdCdzIGZpcnN0IGxldHRlciBjYXBpdGFsaXplZC5cclxuICovXHJcbmF0cm9wYS5zdHJpbmcudWNGaXJzdCA9IGZ1bmN0aW9uIHVjRmlyc3Qoc3RyaW5nKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHN0cmluZyA9IHN0cmluZy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0cmluZy5zbGljZSgxKTtcclxuICAgIHJldHVybiBzdHJpbmc7XHJcbn07XHJcbi8qKlxyXG4gKiBDb252ZXJ0cyB0aGUgZ2l2ZW4gc3RyaW5nIHRvIGNhbWVsIGNhc2UuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDgyM1xyXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nIFRoZSBzdHJpbmcgdG8gY2FtZWxpemUuXHJcbiAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBjYW1lbGl6ZWQgc3RyaW5nLlxyXG4gKiBAZXhhbXBsZVxyXG4gKiAgYXRyb3BhLnN0cmluZy5jYW1lbGl6ZSgnZ2V0IGl0IHRvZ2V0aGVyJyk7XHJcbiAqICAvLyByZXR1cm5zIFwiZ2V0SXRUb2dldGhlclwiXHJcbiAqL1xyXG5hdHJvcGEuc3RyaW5nLmNhbWVsaXplID0gZnVuY3Rpb24gY2FtZWxpemUgKHN0cikge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICB2YXIgYXJyLCBvdXQ7XHJcbiAgICBhcnIgPSBzdHIuc3BsaXQoJyAnKTtcclxuICAgIG91dCA9IGFyci5zaGlmdCgpO1xyXG4gICAgYXJyID0gYXJyLm1hcChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgIHJldHVybiBhdHJvcGEuc3RyaW5nLnVjRmlyc3QoaXRlbSk7XHJcbiAgICB9KTtcclxuICAgIG91dCArPSBhcnIuam9pbignJyk7XHJcbiAgICByZXR1cm4gb3V0O1xyXG59O1xyXG4vKipcclxuICogQ291bnRzIHdvcmRzLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzAzMTNcclxuICogQHBhcmFtIHtTdHJpbmd9IHNvbWVUZXh0IFBsYWluIHRleHQuXHJcbiAqIEByZXR1cm4ge051bWJlcn0gUmV0dXJucyB0aGUgY291bnQgb2Ygd29yZHMgaW4gc29tZVRleHQuXHJcbiAqL1xyXG5hdHJvcGEuc3RyaW5nLmNvdW50V29yZHMgPSBmdW5jdGlvbiBjb3VudFdvcmRzKHNvbWVUZXh0KSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHZhciB3b3JkQ291bnQsIHJlLCBsZW4gPSAwO1xyXG4gICAgaWYoc29tZVRleHQgIT09IHVuZGVmaW5lZCAmJiBzb21lVGV4dCAhPT0gbnVsbCkge1xyXG4gICAgICAgIHNvbWVUZXh0ID0gc29tZVRleHQudHJpbSgpO1xyXG4gICAgICAgIGlmKHNvbWVUZXh0ICE9PSAnJykge1xyXG4gICAgICAgICAgICB3b3JkQ291bnQgPSAwO1xyXG4gICAgICAgICAgICByZSA9IC9cXHMrL2dpO1xyXG4gICAgICAgICAgICB3b3JkQ291bnQgPSBzb21lVGV4dC5zcGxpdChyZSk7XHJcbiAgICAgICAgICAgIGxlbiA9IHdvcmRDb3VudC5sZW5ndGg7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGxlbjtcclxufTtcclxuLyoqXHJcbiAqIENvbnZlcnRzIGVuZCBvZiBsaW5lIG1hcmtlcnMgaW50byB3aGF0ZXZlciB5b3Ugd2FudC4gXHJcbiAqIEF1dG9tYXRpY2FsbHkgZGV0ZWN0cyBhbnkgb2YgXFxyXFxuLCBcXG4sIG9yIFxcciBhbmQgXHJcbiAqIHJlcGxhY2VzIGl0IHdpdGggdGhlIHVzZXIgc3BlY2lmaWVkIEVPTCBtYXJrZXIuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAcGFyYW0ge1N0cmluZ30gdGV4dCBUaGUgdGV4dCB5b3Ugd2FudCBwcm9jZXNzZWQuXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBuZXdFT0wgVGhlIHJlcGxhY2VtZW50IGZvciB0aGUgY3VycmVudCBFT0wgbWFya3MuXHJcbiAqIEByZXR1cm5zIHtTdHJpbmd9IFJldHVybnMgdGhlIHByb2Nlc3NlZCB0ZXh0LlxyXG4gKi9cclxuYXRyb3BhLnN0cmluZy5jb252ZXJ0RW9sID0gZnVuY3Rpb24gY29udmVydEVPTCh0ZXh0LCBuZXdFT0wpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuICAgIHJldHVybiB0ZXh0LnJlcGxhY2UoYXRyb3BhLnJlZ2V4LnBhdHRlcm5zLmxpbmVCcmVha3MsIG5ld0VPTCk7XHJcbn07XHJcblxyXG4vKipcclxuICogUmVtb3ZlcyBhIHF1YW50aXR5IG9mIGxlYWRpbmcgc3BhY2VzIHNwZWNpZmllZCBieSBvZmZzZXQuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAcGFyYW0ge1N0cmluZ30gdGV4dCBUaGUgdGV4dCB0byBwcm9jZXNzLlxyXG4gKiBAcGFyYW0ge051bWJlcn0gb2Zmc2V0IFRoZSBhbW91bnQgb2Ygc3BhY2VzIHlvdSB3YW50IHJlbW92ZWQgXHJcbiAqIGZyb20gdGhlIGJlZ2lubmluZyBvZiB0aGUgdGV4dC5cclxuICogQHJldHVybnMgUmV0dXJucyB0aGUgcHJvY2Vzc2VkIHRleHQuXHJcbiAqL1xyXG5hdHJvcGEuc3RyaW5nLm9mZnNldFdoaXRlU3BhY2UgPSBmdW5jdGlvbiBvZmZzZXRXaGl0ZVNwYWNlKHRleHQsIG9mZnNldCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG4gICAgdmFyIHJlZ3g7XHJcbiAgICByZWd4ID0gbmV3IFJlZ0V4cCgnXiB7JyArIG9mZnNldCArICd9Jyk7XHJcbiAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKHJlZ3gsICcnKTtcclxuICAgIHJldHVybiB0ZXh0O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENvbnZlcnRzIGFsbCB0YWJzIGluIGxlYWRpbmcgd2hpdGVzcGFjZSBpbnRvIGZvdXIgc3BhY2VzLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHBhcmFtIHtTdHJpbmd9IHRleHQgVGhlIHRleHQgdG8gcHJvY2Vzc1xyXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBSZXR1cm5zIHRoZSBwcm9jZXNzZWQgdGV4dC5cclxuICovXHJcbmF0cm9wYS5zdHJpbmcubm9ybWFsaXplV2hpdGVTcGFjZVByZWZpeCA9IGZ1bmN0aW9uIG5vcm1hbGl6ZVdoaXRlU3BhY2VQcmVmaXgoXHJcbiAgICB0ZXh0XHJcbikge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG4gICAgdmFyIHByZWZpeCA9IHRleHQubWF0Y2goL15cXHMqLyk7XHJcbiAgICBpZihwcmVmaXgpIHtcclxuICAgICAgICBwcmVmaXggPSBwcmVmaXhbMF07XHJcbiAgICAgICAgcHJlZml4ID0gcHJlZml4LnJlcGxhY2UoL1xcdC9nLCAnICAgICcpO1xyXG4gICAgICAgIHRleHQgPSB0ZXh0LnJlcGxhY2UoL15cXHMqLywgcHJlZml4KTtcclxuICAgIH1cclxuICAgIHJldHVybiB0ZXh0O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENvbnZlcnRzIGFsbCB0YWJzIGludG8gZm91ciBzcGFjZXMuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAcGFyYW0ge1N0cmluZ30gdGV4dCBUaGUgdGV4dCB0byBwcm9jZXNzXHJcbiAqIEByZXR1cm5zIHtTdHJpbmd9IFJldHVybnMgdGhlIHByb2Nlc3NlZCB0ZXh0LlxyXG4gKi9cclxuYXRyb3BhLnN0cmluZy5ub3JtYWxpemVXaGl0ZVNwYWNlID0gZnVuY3Rpb24gbm9ybWFsaXplV2hpdGVTcGFjZSh0ZXh0KSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcbiAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC9cXHQvZywgJyAgICAnKTtcclxuICAgIHJldHVybiB0ZXh0O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENvdW50cyB0aGUgbnVtYmVyIG9mIGxlYWRpbmcgc3BhY2Ugb3IgdGFiIGNoYXJhY3RlcnMgYnV0IG5vdCBib3RoLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHBhcmFtIHtTdHJpbmd9IHRleHQgVGhlIHRleHQgdG8gYW5hbHl6ZS5cclxuICogQHJldHVybnMge051bWJlcn0gUmV0dXJucyB0aGUgcXVhbnRpdHkgb2YgbGVhZGluZyBzcGFjZXMgb3IgdGFicy5cclxuICovXHJcbmF0cm9wYS5zdHJpbmcuZ2V0T2Zmc2V0ID0gZnVuY3Rpb24gZ2V0T2Zmc2V0KHRleHQpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuICAgIHZhciBvZmZzZXQgPSAwLFxyXG4gICAgICAgIGxlYWRpbmdDaGFyID0gdGV4dC5jaGFyQXQoMCk7XHJcbiAgICAgICAgXHJcbiAgICBpZiggbGVhZGluZ0NoYXIgPT09ICcgJyB8fCBsZWFkaW5nQ2hhciA9PT0gJ1xcdCcpIHtcclxuICAgICAgICB3aGlsZSh0ZXh0LmNoYXJBdChvZmZzZXQpID09PSBsZWFkaW5nQ2hhciAmJiBvZmZzZXQgPCB0ZXh0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICBvZmZzZXQrKztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gb2Zmc2V0O1xyXG59O1xyXG4vKipcclxuICogQnJlYWtzIGEgc3RyaW5nIGludG8gYW4gYXJyYXkgb2Ygd29yZHMuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDExOFxyXG4gKiBAcGFyYW0ge1N0cmluZ30gdGV4dCBUaGUgdGV4dCB0byBhbmFseXplLlxyXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYW4gYXJyYXkgb2YgdGhlIHdvcmRzIGluXHJcbiAqICB0aGUgZ2l2ZW4gdGV4dC5cclxuICogQHJlcXVpcmVzIGF0cm9wYS5hcnJheXMucmVtb3ZlRW1wdHlFbGVtZW50c1xyXG4gKi9cclxuYXRyb3BhLnN0cmluZy5nZXRXb3JkcyA9IGZ1bmN0aW9uICh0ZXh0KSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHZhciBvdXQgPSBbXTtcclxuICAgIGZ1bmN0aW9uIGludmFsaWRDaGFycyhlbGVtZW50KSB7XHJcbiAgICAgICAgdmFyIG1hdGNoZWQgPSAvXltcXC0n4oCZYF0rJC8udGVzdChlbGVtZW50KTtcclxuICAgICAgICAvLyBpbnZlcnQgdGhlIHJlc3VsdCBvZiB0ZXN0LiB0aHJvdyBvdXQgZWxlbWVudHMgdGhhdCBtYXRjaC5cclxuICAgICAgICByZXR1cm4gIW1hdGNoZWQ7XHJcbiAgICB9XHJcbiAgICBvdXQgPSBhdHJvcGEuYXJyYXlzLnJlbW92ZUVtcHR5RWxlbWVudHMoXHJcbiAgICAgICAgdGV4dC5zcGxpdCgvW15BLVphLXpcXC0n4oCZYF0rL2dpKVxyXG4gICAgKTtcclxuICAgIG91dCA9IG91dC5maWx0ZXIoaW52YWxpZENoYXJzKTtcclxuICAgIHJldHVybiBvdXQ7XHJcbn07XHJcbi8qKlxyXG4gKiBFc2NhcGVzIDxjb2RlPkNEQVRBPC9jb2RlPiBzZWN0aW9ucyBpbiB0ZXh0XHJcbiAqICBzbyB0aGF0IHRoZSB0ZXh0IG1heSBiZSBlbWJlZGRlZCBpbnRvIGEgXHJcbiAqICA8Y29kZT5DREFUQTwvY29kZT4gc2VjdGlvbi4gVGhpcyBzaG91bGQgYmUgcnVuXHJcbiAqICBvbiBhbnkgdGV4dCB3aGljaCBtYXkgY29udGFpbiB0aGUgc3RyaW5nIFxyXG4gKiAgPGNvZGU+XV0+PC9jb2RlPiBzaW5jZSBzYWlkIHN0cmluZyB3aWxsIGVmZmVjdGl2ZWx5XHJcbiAqICBlbmQgdGhlIDxjb2RlPkNEQVRBPC9jb2RlPiBzZWN0aW9uIHByZW1hdHVyZWx5LlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzAxMThcclxuICogQHBhcmFtIHtTdHJpbmd9IHRleHQgVGhlIHRleHQgY29udGFpbmluZyBcclxuICogIDxjb2RlPkNEQVRBPC9jb2RlPiBzZWN0aW9ucyB0byBlc2NhcGUuXHJcbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBhIHN0cmluZyB3aXRoIGVzY2FwZWRcclxuICogIDxjb2RlPkNEQVRBPC9jb2RlPiBzZWN0aW9ucy5cclxuICogQHNlZSA8YSBocmVmPVwiaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9DREFUQSNOZXN0aW5nXCI+XHJcbiAqICBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0NEQVRBI05lc3Rpbmc8L2E+XHJcbiAqIEBzZWUgPGEgaHJlZj1cImh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTk4MTY4XCI+XHJcbiAqICBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD05ODE2ODwvYT5cclxuICovXHJcbmF0cm9wYS5zdHJpbmcuZXNjYXBlQ2RhdGEgPSBmdW5jdGlvbiBlc2NhcGVDZGF0YSh0ZXh0KSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHJldHVybiBTdHJpbmcodGV4dCkucmVwbGFjZSgvXFxdXFxdPi9nLCAnXV1dXT48IVtDREFUQVs+Jyk7XHJcbn07XHJcblxyXG5cclxuXHJcblxyXG53aGlsZShhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMubGVuZ3RoID4gMCkge1xyXG4gICAgYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLnBvcCgpKCk7XHJcbn1cclxubW9kdWxlLmV4cG9ydHMgPSBhdHJvcGE7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9kb2NzL3ZzZG9jL09wZW5MYXllcnNBbGwuanNcIi8+XHJcbnZhciBhdHJvcGEgPSByZXF1aXJlKCdhdHJvcGEtaGVhZGVyJyk7XHJcbmF0cm9wYS5yYW5kb20gPSByZXF1aXJlKCdhdHJvcGEtcmFuZG9tJykucmFuZG9tO1xyXG5hdHJvcGEuc3RyaW5nID0gcmVxdWlyZSgnYXRyb3BhLXN0cmluZycpLnN0cmluZztcclxuLypqc2xpbnRcclxuICAgIGluZGVudDogNCxcclxuICAgIG1heGVycjogNTAsXHJcbiAgICB3aGl0ZTogdHJ1ZSxcclxuICAgIGJyb3dzZXI6IHRydWUsXHJcbiAgICBkZXZlbDogdHJ1ZSxcclxuICAgIHBsdXNwbHVzOiB0cnVlLFxyXG4gICAgcmVnZXhwOiB0cnVlXHJcbiovXHJcbi8qZ2xvYmFsIGF0cm9wYSAqL1xyXG4vLyBlbmQgaGVhZGVyXHJcblxyXG5hdHJvcGEucmVxdWlyZXMoXHJcbiAgICAnQmFiYmxlcicsXHJcbiAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICAgICAgdmFyIHN1cHBvcnRlZCA9IHRydWU7XHJcbiAgICAgICAgXHJcbiAgICAgICAgW1xyXG4gICAgICAgICAgICBhdHJvcGEucmFuZG9tLmludGVnZXIsXHJcbiAgICAgICAgICAgIGF0cm9wYS5zdHJpbmcudWNGaXJzdCxcclxuICAgICAgICAgICAgYXRyb3BhLnJhbmRvbS5zdHJpbmdcclxuICAgICAgICBdLmZvckVhY2goZnVuY3Rpb24gKHByZXJlcXVpc2l0ZSkge1xyXG4gICAgICAgICAgICBpZihwcmVyZXF1aXNpdGUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgc3VwcG9ydGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gc3VwcG9ydGVkO1xyXG4gICAgfVxyXG4pO1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgY2xhc3MgcmVwcmVzZW50cyBhIGJhYmJsZXIuIFRoZSBiYWJibGVyXHJcbiAqIHByb2R1Y2VzIGxvcnVtIGlwc3VtIHRleHQsIHRvIHVzZXIgc3BlY2lmaWNhdGlvbnMuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDMxM1xyXG4gKiBAY2xhc3MgVGhpcyBjbGFzcyByZXByZXNlbnRzIGEgYmFiYmxlclxyXG4gKiBAcGFyYW0ge051bWJlcn0gd3JkQ291bnQgVGhlIGFtb3VudCBvZiBcIndvcmRzXCIgeW91IHdvdWxkIGxpa2VcclxuICogdGhlIGJhYmJsZXIgdG8gcHJvZHVjZS5cclxuICogQHJldHVybnMge0JhYmJsZXJ9IFJldHVybnMgYSBiYWJibGVyLlxyXG4gKiBAcmVxdWlyZXMgYXRyb3BhLnJhbmRvbS5pbnRlZ2VyXHJcbiAqIEByZXF1aXJlcyBhdHJvcGEuc3RyaW5nLnVjRmlyc3RcclxuICogQHJlcXVpcmVzIGF0cm9wYS5yYW5kb20uc3RyaW5nXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciBiYWJibGVyID0gbmV3IGF0cm9wYS5CYWJibGVyKDMwKTtcclxuICogLy8gcmVzZXRzIHRoZSB3b3JkIGNvdW50XHJcbiAqIGJhYmJsZXIucmVzZXRXb3JkQ291bnQoMTApXHJcbiAqIGNvbnNvbGUubG9nKGJhYmJsZXIuZ2V0V29yZENvdW50KCkpO1xyXG4gKiBcclxuICogLy8gZGlzcGxheXMgYSAxMCB3b3JkIHNlbnRlbmNlIG9mIG5vbnNlbnNlIHdvcmRzLlxyXG4gKiBjb25zb2xlLmxvZyhiYWJibGVyLmdlbmVyYXRlQmFiYmxlKDEwKSk7XHJcbiAqIC8vIGRpc3BsYXlzIGEgMyB3b3JkIHNlbnRlbmNlXHJcbiAqIGNvbnNvbGUubG9nKGJhYmJsZXIuZ2VuZXJhdGVCYWJibGUoMykpO1xyXG4gKiBcclxuICogLy8gZGlzcGxheXMgdGhlIHVzZXIgc3RvcmVkIG9yIGxhc3QgZ2VuZXJhdGVkIGJhYmJsZVxyXG4gKiBjb25zb2xlLmxvZyhiYWJibGVyLmdldEJhYmJsZSgpKTtcclxuICogXHJcbiAqIC8vIGNsZWFycyB0aGUgc3RvcmVkIGJhYmJsZVxyXG4gKiBiYWJibGVyLnJlc2V0QmFiYmxlKCk7XHJcbiAqIGNvbnNvbGUubG9nKGJhYmJsZXIuZ2V0QmFiYmxlKCkpO1xyXG4gKiBcclxuICogLy8gc2V0cyB0aGUgYmFiYmxlXHJcbiAqIGJhYmJsZXIuc2V0QmFiYmxlKCdoZXJlIGJlIGdpYmJlcmlzaCAnKTtcclxuICogY29uc29sZS5sb2coYmFiYmxlci5nZXRCYWJibGUoKSk7XHJcbiAqIFxyXG4gKiAvLyBhcHBlbmQgbW9yZSBnaWJiZXJpc2ggdG8gdGhlIGN1cnJlbnQgYmFiYmxlXHJcbiAqIGJhYmJsZXIuc2V0QmFiYmxlKGJhYmJsZXIuZ2V0QmFiYmxlKCkgKyBiYWJibGVyLmdlbmVyYXRlQmFiYmxlKDUpKTtcclxuICogY29uc29sZS5sb2coYmFiYmxlci5nZXRCYWJibGUoKSk7XHJcbiAqIFxyXG4gKiAvLyBnZW5lcmF0ZSBhIHNlbnRlbmNlXHJcbiAqIGJhYmJsZXIucmVzZXRXb3JkQ291bnQoMTApO1xyXG4gKiBjb25zb2xlLmxvZyhiYWJibGVyLmdlbmVyYXRlU2VudGVuY2UoNSwgMjApKTtcclxuICogXHJcbiAqIC8vIGdlbmVyYXRlIHJhbmRvbSBwdW5jdHVhdGlvblxyXG4gKiBjb25zb2xlLmxvZyhiYWJibGVyLnB1bmN0dWF0ZSgpKTtcclxuICogXHJcbiAqIC8vIGdlbmVyYXRlIGEgd29yZFxyXG4gKiBjb25zb2xlLmxvZyhiYWJibGVyLmdlbmVyYXRlV29yZCgzLDcpKTtcclxuICogY29uc29sZS5sb2coYmFiYmxlci5nZW5lcmF0ZVdvcmQoNywxMCkpO1xyXG4gKi9cclxuYXRyb3BhLkJhYmJsZXIgPSBmdW5jdGlvbiBCYWJibGVyKHdyZENvdW50KSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcbiAgICB2YXIgbXkgPSB0aGlzLFxyXG4gICAgICAgIGJhYmJsZSA9ICcnLFxyXG4gICAgICAgIHdvcmRDb3VudCA9IDA7XHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIHdvcmQgY291bnQuXHJcbiAgICAgKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICAgICAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gICAgICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gICAgICogQHZlcnNpb24gMjAxMzAzMTNcclxuICAgICAqIEBtZXRob2RPZiBhdHJvcGEuQmFiYmxlciNcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB3cmRDb3VudCBUaGUgYW1vdW50IG9mIFwid29yZHNcIiB3aGljaCB5b3Ugd2FudCB0aGVcclxuICAgICAqIGJhYmJsZXIgdG8gcHJvZHVjZS5cclxuICAgICAqIEByZXR1cm5zIHtOdW1iZXJ9IFJldHVybnMgdGhlIHNldCB3b3JkIGNvdW50IGZvciB0aGlzIGJhYmJsZXIuXHJcbiAgICAgKi9cclxuICAgIHRoaXMuc2V0V29yZENvdW50ID0gZnVuY3Rpb24gKHdyZENvdW50KSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB3cmRDb3VudCAhPT0gJ251bWJlcicpIHtcclxuICAgICAgICAgICAgd29yZENvdW50ID0gMjUwO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHdvcmRDb3VudCA9IHdyZENvdW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gd29yZENvdW50O1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogUmVzZXRzIHRoZSB3b3JkIGNvdW50IGZvciB0aGlzIGJhYmJsZXIuXHJcbiAgICAgKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICAgICAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gICAgICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gICAgICogQHZlcnNpb24gMjAxMzAzMTNcclxuICAgICAqIEBtZXRob2RPZiBhdHJvcGEuQmFiYmxlciNcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB3b3JkQ291bnQgVGhlIGFtb3VudCBvZiBcIndvcmRzXCIgeW91IHdvdWxkIGxpa2VcclxuICAgICAqIHRvIHNldCBmb3IgdGhpcyBiYWJibGVyLlxyXG4gICAgICogQHJldHVybnMge051bWJlcn0gUmV0dXJucyB0aGUgc2V0IHdvcmQgY291bnQgZm9yIHRoaXMgYmFiYmxlci5cclxuICAgICAqL1xyXG4gICAgdGhpcy5yZXNldFdvcmRDb3VudCA9IGZ1bmN0aW9uIHJlc2V0V29yZENvdW50KHdvcmRDb3VudCkge1xyXG4gICAgICAgIG15LnNldFdvcmRDb3VudCh3b3JkQ291bnQpO1xyXG4gICAgICAgIHJldHVybiB3b3JkQ291bnQ7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBjdXJyZW50IHdvcmQgY291bnQuXHJcbiAgICAgKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICAgICAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gICAgICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gICAgICogQHZlcnNpb24gMjAxMjA5MDlcclxuICAgICAqIEBtZXRob2RPZiBhdHJvcGEuQmFiYmxlciNcclxuICAgICAqIEByZXR1cm5zIHtOdW1iZXJ9IFJldHVybnMgdGhlIHdvcmQgY291bnQgZm9yIHRoaXMgYmFiYmxlci5cclxuICAgICAqL1xyXG4gICAgdGhpcy5nZXRXb3JkQ291bnQgPSBmdW5jdGlvbiBnZXRXb3JkQ291bnQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHdvcmRDb3VudDtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEdlbmVyYXRlcyBhIHdvcmQgd2l0aCBhIHNwZWNpZmllZCBsZW5ndGguIExvd2VycyB0aGUgd29yZCBjb3VudCBieSBvbmUuXHJcbiAgICAgKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICAgICAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gICAgICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gICAgICogQHZlcnNpb24gMjAxMjA5MDlcclxuICAgICAqIEBtZXRob2RPZiBhdHJvcGEuQmFiYmxlciNcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBzdHJpbmdNaW4gdGhlIHNob3J0ZXN0IHdvcmQsIGluIGNoYXJhY3RlcnMuXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gc3RyaW5nTWF4IFRoZSBsb25nZXN0IHdvcmQsIGluIGNoYXJhY3RlcnMuXHJcbiAgICAgKiBAcmV0dXJucyB7U3RyaW5nfSBSZXR1cm5zIGEgcmFuZG9tIHN0cmluZyBvZiBjaGFyYWN0ZXJzXHJcbiAgICAgKiB3aXRoaW4gdGhlIHNwZWNpZmllZCByYW5nZSBvZiBsZW5ndGguXHJcbiAgICAgKiBAcmVxdWlyZXMgYXRyb3BhLnJhbmRvbS5pbnRlZ2VyXHJcbiAgICAgKiBAcmVxdWlyZXMgYXRyb3BhLnJhbmRvbS5zdHJpbmdcclxuICAgICAqL1xyXG4gICAgdGhpcy5nZW5lcmF0ZVdvcmQgPSBmdW5jdGlvbiBnZW5lcmF0ZVdvcmQoc3RyaW5nTWluLCBzdHJpbmdNYXgpIHtcclxuICAgICAgICB2YXIgd29yZExlbmd0aCxcclxuICAgICAgICB3b3JkO1xyXG4gICAgICAgIHdvcmRMZW5ndGggPSBhdHJvcGEucmFuZG9tLmludGVnZXIoc3RyaW5nTWluLCBzdHJpbmdNYXgpO1xyXG4gICAgICAgIHdvcmQgPSBhdHJvcGEucmFuZG9tLnN0cmluZyh3b3JkTGVuZ3RoLCAnbG93ZXInKTtcclxuICAgICAgICB3b3JkQ291bnQtLTtcclxuICAgICAgICByZXR1cm4gd29yZDtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFByb3ZpZGVzIHJhbmRvbSBwdW5jdHVhdGlvbi5cclxuICAgICAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gICAgICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAgICAgKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAgICAgKiBAdmVyc2lvbiAyMDEyMDkwOVxyXG4gICAgICogQG1ldGhvZE9mIGF0cm9wYS5CYWJibGVyI1xyXG4gICAgICogQHJldHVybnMge1N0cmluZ30gUmV0dXJucyBhIHJhbmRvbSBwdW5jdHVhdGlvblxyXG4gICAgICogY2hhcmFjdGVyICggLiAhIG9yID8gKS5cclxuICAgICAqIEByZXF1aXJlcyBhdHJvcGEucmFuZG9tLnN0cmluZ1xyXG4gICAgICovXHJcbiAgICB0aGlzLnB1bmN0dWF0ZSA9IGZ1bmN0aW9uIHB1bmN0dWF0ZSgpIHtcclxuICAgICAgICB2YXIgcHVuY3R1YXRpb247XHJcbiAgICAgICAgcHVuY3R1YXRpb24gPSBhdHJvcGEucmFuZG9tLnN0cmluZygxLCAncHVuY3R1YXRpb24nKTtcclxuICAgICAgICByZXR1cm4gcHVuY3R1YXRpb247XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBHZW5lcmF0ZXMgYSBzZW50ZW5jZSBvZiBzcGVjaWZpZWQgbGVuZ3RoIGluIHdvcmRzLiBUaGUgcXVhbnRpdHlcclxuICAgICAqICBvZiB3b3JkcyBpbiB0aGUgZ2VuZXJhdGVkIHNlbnRlbmNlIHdpbGwgYmUgYmV0d2VlbiB0aGUgbWluaW11bVxyXG4gICAgICogIGFuZCBtYXhpbXVtIHNldCwgd2l0aCB0aGUgbWF4aW11bSBjYXBwZWQgYXQgdGhlIGN1cnJlbnQgd29yZHNcclxuICAgICAqICBjb3VudC4gVGhlIHdvcmQgY291bnQgd2lsbCBiZSBsb3dlcmVkIGJ5IHRoZVxyXG4gICAgICogIHF1YW50aXR5IG9mIHdvcmRzIGluIHRoZSBnZW5lcmF0ZWQgc2VudGVuY2UuIElmIHRoZSB3b3JkIGNvdW50XHJcbiAgICAgKiAgaXMgMCB0aGVuIHRoZXJlIHdpbGwgYmUgbm8gd29yZHMgaW4gdGhlIHNlbnRlbmNlLiBJZiB0aGUgd29yZFxyXG4gICAgICogIGNvdW50IGlzIDMgdGhlbiB0aGUgbWF4aW11bSBwb3NzaWJsZSBudW1iZXIgb2Ygd29yZHMgaW4gdGhlXHJcbiAgICAgKiAgc2VudGVuY2Ugd2lsbCBiZSB0aHJlZS5cclxuICAgICAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gICAgICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAgICAgKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAgICAgKiBAdmVyc2lvbiAyMDEzMDMxM1xyXG4gICAgICogQG1ldGhvZE9mIGF0cm9wYS5CYWJibGVyI1xyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHNlbnRlbmNlTWluIFRoZSBzaG9ydGVzdCBzZW50ZW5jZSwgaW4gd29yZHMsXHJcbiAgICAgKiB5b3Ugd291bGQgbGlrZSByZXR1cm5lZC5cclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBzZW50ZW5jZU1heCBUaGUgbG9uZ2VzdCBzZW50ZW5jZSwgaW4gd29yZHMsXHJcbiAgICAgKiB5b3Ugd291bGQgbGlrZSByZXR1cm5lZC5cclxuICAgICAqIEByZXR1cm5zIHtTdHJpbmd9IFJldHVybnMgYSBcInNlbnRlbmNlXCIgd2l0aGluIHRoZSBzcGVjaWZpZWRcclxuICAgICAqIHJhbmdlIG9mIGxlbmd0aC5cclxuICAgICAqIEByZXF1aXJlcyBhdHJvcGEucmFuZG9tLmludGVnZXJcclxuICAgICAqIEByZXF1aXJlcyBhdHJvcGEuc3RyaW5nLnVjRmlyc3RcclxuICAgICAqL1xyXG4gICAgdGhpcy5nZW5lcmF0ZVNlbnRlbmNlID0gZnVuY3Rpb24gZ2VuZXJhdGVTZW50ZW5jZShcclxuICAgICAgICBzZW50ZW5jZU1pbiwgc2VudGVuY2VNYXhcclxuICAgICkge1xyXG4gICAgICAgIHZhciB3b3JkLFxyXG4gICAgICAgIHNlbnRlbmNlTGVuZ3RoLFxyXG4gICAgICAgIHNlbnRlbmNlO1xyXG4gICAgICAgIHNlbnRlbmNlTGVuZ3RoID0gYXRyb3BhLnJhbmRvbS5pbnRlZ2VyKHNlbnRlbmNlTWluLCBzZW50ZW5jZU1heCk7XHJcbiAgICAgICAgc2VudGVuY2UgPSAnJztcclxuICAgICAgICBpZiAoc2VudGVuY2VMZW5ndGggPiB3b3JkQ291bnQpIHtcclxuICAgICAgICAgICAgc2VudGVuY2VMZW5ndGggPSB3b3JkQ291bnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAoc2VudGVuY2VMZW5ndGg7IHNlbnRlbmNlTGVuZ3RoID4gMDsgc2VudGVuY2VMZW5ndGgtLSkge1xyXG4gICAgICAgICAgICBpZiAod29yZENvdW50ID4gMCkge1xyXG4gICAgICAgICAgICAgICAgd29yZCA9IG15LmdlbmVyYXRlV29yZCg0LCAxMik7XHJcbiAgICAgICAgICAgICAgICBzZW50ZW5jZSArPSAnICcgKyB3b3JkO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2VudGVuY2VMZW5ndGggPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNlbnRlbmNlICs9IG15LnB1bmN0dWF0ZSgpO1xyXG4gICAgICAgIHJldHVybiBhdHJvcGEuc3RyaW5nLnVjRmlyc3Qoc2VudGVuY2UudHJpbSgpKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGJhYmJsZS5cclxuICAgICAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gICAgICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAgICAgKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAgICAgKiBAdmVyc2lvbiAyMDEzMDMxM1xyXG4gICAgICogQG1ldGhvZE9mIGF0cm9wYS5CYWJibGVyI1xyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGJhYmJsZVN0cmluZyBTcGVjaWZpZWQgYmFiYmxlIHRvIHNldC5cclxuICAgICAqIEByZXR1cm5zIHtTdHJpbmd9IFJldHVybnMgdGhlIHN0b3JlZCBiYWJibGUuXHJcbiAgICAgKi9cclxuICAgIHRoaXMuc2V0QmFiYmxlID0gZnVuY3Rpb24gc2V0QmFiYmxlKGJhYmJsZVN0cmluZykge1xyXG4gICAgICAgIGlmICh0eXBlb2YgYmFiYmxlU3RyaW5nID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICBiYWJibGUgPSBiYWJibGVTdHJpbmc7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbXkucmVzZXRCYWJibGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGJhYmJsZTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIENsZWFycyB0aGUgc3RvcmVkIGJhYmJsZS5cclxuICAgICAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gICAgICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAgICAgKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAgICAgKiBAdmVyc2lvbiAyMDEyMDkwOVxyXG4gICAgICogQG1ldGhvZE9mIGF0cm9wYS5CYWJibGVyI1xyXG4gICAgICogQHJldHVybnMge1N0cmluZ30gUmV0dXJucyB0aGUgc3RvcmVkIGJhYmJsZS5cclxuICAgICAqL1xyXG4gICAgdGhpcy5yZXNldEJhYmJsZSA9IGZ1bmN0aW9uIHJlc2V0QmFiYmxlKCkge1xyXG4gICAgICAgIGJhYmJsZSA9ICcnO1xyXG4gICAgICAgIHJldHVybiBiYWJibGU7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBsYXN0IGdlbmVyYXRlZCBiYWJibGUuXHJcbiAgICAgKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICAgICAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gICAgICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gICAgICogQHZlcnNpb24gMjAxMjA5MDlcclxuICAgICAqIEBtZXRob2RPZiBhdHJvcGEuQmFiYmxlciNcclxuICAgICAqIEByZXR1cm5zIHtTdHJpbmd9IFJldHVybnMgdGhlIHN0b3JlZCBiYWJibGUuXHJcbiAgICAgKi9cclxuICAgIHRoaXMuZ2V0QmFiYmxlID0gZnVuY3Rpb24gZ2V0QmFiYmxlKCkge1xyXG4gICAgICAgIHJldHVybiBiYWJibGU7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBHZW5lcmF0ZXMgYmFiYmxlIHRvIGEgdXNlciBzcGVjaWZpZWQgbGVuZ3RoIGluIHdvcmRzLlxyXG4gICAgICogIFRoZSB3b3JkIGNvdW50IHdpbGwgYmUgemVybyBhZnRlciB0aGlzIGFuZCB0aGUgc3RvcmVkXHJcbiAgICAgKiAgYmFiYmxlIHdpbGwgYmUgc2V0IHRvIHRoZSBnZW5lcmF0ZWQgYmFiYmxlLlxyXG4gICAgICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAgICAgKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICAgICAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICAgICAqIEB2ZXJzaW9uIDIwMTIwOTA5XHJcbiAgICAgKiBAbWV0aG9kT2YgYXRyb3BhLkJhYmJsZXIjXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gd29yZHNDdCBUaGUgZGVzaXJlZCB3b3JkIGNvdW50IGZvciB0aGVcclxuICAgICAqIGdlbmVyYXRlZCBiYWJibGUuXHJcbiAgICAgKiBAcmV0dXJucyB7U3RyaW5nfSBSZXR1cm5zIGJhYmJsZSBvZiBzcGVjaWZpZWQgbGVuZ3RoIGluIHdvcmRzLlxyXG4gICAgICogQHNlZSBhdHJvcGEuQmFiYmxlciNnZXRXb3JkQ291bnRcclxuICAgICAqL1xyXG4gICAgdGhpcy5nZW5lcmF0ZUJhYmJsZSA9IGZ1bmN0aW9uIGdlbmVyYXRlQmFiYmxlKHdvcmRzQ3QpIHtcclxuICAgICAgICBteS5yZXNldEJhYmJsZSgpO1xyXG4gICAgICAgIG15LnJlc2V0V29yZENvdW50KHdvcmRzQ3QpO1xyXG4gICAgICAgIGZvciAod29yZENvdW50OyB3b3JkQ291bnQgPiAwOyBiYWJibGUgKz0gJyAnKSB7XHJcbiAgICAgICAgICAgIG15LnNldEJhYmJsZShiYWJibGUgKyBteS5nZW5lcmF0ZVNlbnRlbmNlKDUsIDIwKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBiYWJibGU7XHJcbiAgICB9O1xyXG4gICAgXHJcbiAgICBhdHJvcGEuc3VwcG9ydENoZWNrKCdCYWJibGVyJyk7XHJcbiAgICB0aGlzLnJlc2V0V29yZENvdW50KHdyZENvdW50KTtcclxufTtcclxuXHJcblxyXG5cclxuXHJcbndoaWxlKGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5sZW5ndGggPiAwKSB7XHJcbiAgICBhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMucG9wKCkoKTtcclxufVxyXG5tb2R1bGUuZXhwb3J0cyA9IGF0cm9wYTtcclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2RvY3MvdnNkb2MvT3BlbkxheWVyc0FsbC5qc1wiLz5cclxudmFyIGF0cm9wYSA9IHJlcXVpcmUoJ2F0cm9wYS1oZWFkZXInKTtcclxuLypqc2xpbnRcclxuICAgIGluZGVudDogNCxcclxuICAgIG1heGVycjogNTAsXHJcbiAgICB3aGl0ZTogdHJ1ZSxcclxuICAgIGJyb3dzZXI6IHRydWUsXHJcbiAgICBkZXZlbDogdHJ1ZSxcclxuICAgIHBsdXNwbHVzOiB0cnVlLFxyXG4gICAgcmVnZXhwOiB0cnVlXHJcbiovXHJcbi8qZ2xvYmFsIGF0cm9wYSAqL1xyXG4vLyBlbmQgaGVhZGVyXHJcblxyXG5hdHJvcGEucmVxdWlyZXMoXHJcbiAgICAnQ29va2llTW9uc3RlcicsXHJcbiAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICAgICAgdmFyIHN1cHBvcnRlZCA9IHRydWU7XHJcbiAgICAgICAgXHJcbiAgICAgICAgW1xyXG4gICAgICAgICAgICBkb2N1bWVudC5jb29raWVcclxuICAgICAgICBdLmZvckVhY2goZnVuY3Rpb24gKHByZXJlcXVpc2l0ZSkge1xyXG4gICAgICAgICAgICBpZihwcmVyZXF1aXNpdGUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgc3VwcG9ydGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gc3VwcG9ydGVkO1xyXG4gICAgfVxyXG4pO1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgaXMgYSBjb29raWUgaGFuZGxlci5cclxuICogQGV4YW1wbGVcclxuICogLy8gY29va2llIG9iamVjdFxyXG4gKiB2YXIgY29va2llT2JqID0ge1wia2V5XCIgOiBcImNvb2tpZU5hbWVcIiwgXCJ2YWxcIiA6IFwiY29va2llVmFsXCJ9XHJcbiAqIC8vIGNvb2tpZSBzdHJpbmcgXHJcbiAqIHZhciBjb29raWVTdHJpbmcgPSBjb29raWVOYW1lPWNvb2tpZVZhbDtcclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwMjIzXHJcbiAqIEBjbGFzcyBUaGlzIHJlcHJlc2VudHMgYSBjb29raWUgaGFuZGxlclxyXG4gKiBAcmV0dXJucyB7Q29va2llTW9uc3Rlcn0gQSBjb29raWUgaGFuZGxlci5cclxuICogQHJlcXVpcmVzIGF0cm9wYS5kYXRhXHJcbiAqL1xyXG5hdHJvcGEuQ29va2llTW9uc3RlciA9IGZ1bmN0aW9uIENvb2tpZU1vbnN0ZXIoKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcbiAgICB2YXIgY3VycmVudENvb2tpZXMsIGdldENvb2tpZUNhbGxiYWNrO1xyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgaG9sZHMgdGhlIGN1cnJlbnQgY29va2llIG9iamVjdCBhcnJheS5cclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAdHlwZSBBcnJheVxyXG4gICAgICogQGZpZWxkT2YgYXRyb3BhLkNvb2tpZU1vbnN0ZXItXHJcbiAgICAgKi9cclxuICAgIGN1cnJlbnRDb29raWVzID0gW107XHJcbiAgICAvKipcclxuICAgICAqIENvbnZlcnRzIGEgY29va2llIHN0cmluZyBpbnRvIGFuIG9iamVjdC5cclxuICAgICAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gICAgICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAgICAgKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAgICAgKiBAdmVyc2lvbiAyMDEzMDIyM1xyXG4gICAgICogQG1ldGhvZE9mIGF0cm9wYS5Db29raWVNb25zdGVyI1xyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGNvb2tpZSBBIGNvb2tpZSByZXByZXNlbnRlZCBhcyBhIHN0cmluZ1xyXG4gICAgICogPGNvZGU+Y29va2llTmFtZT1jb29raWVWYWw7PC9jb2RlPlxyXG4gICAgICogQHJldHVybnMge2Nvb2tpZU9ian0gUmV0dXJucyBhIGNvb2tpZSBvYmplY3QuXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogdmFyIGNvb2tpZU1vbnN0ZXIgPSBuZXcgYXRyb3BhLkNvb2tpZU1vbnN0ZXIoKTtcclxuICAgICAqIHZhciBjb29raWVPYmogPSBjb29raWVNb25zdGVyLmNvb2tpZTJvYmooJ2F0cm9wYT1oaWFsIGF0cm9wYSEhOycpO1xyXG4gICAgICogY29uc29sZS5sb2coY29va2llT2JqKTtcclxuICAgICAqL1xyXG4gICAgdGhpcy5jb29raWUyb2JqID0gZnVuY3Rpb24gY29va2llMm9iaihjb29raWUpIHtcclxuICAgICAgICB2YXIgY29va2llT2JqID0ge307XHJcbiAgICAgICAgaWYgKCFjb29raWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb29raWVPYmoua2V5ID0gY29va2llLnN1YnN0cigwLCBjb29raWUuaW5kZXhPZihcIj1cIikpLnRyaW0oKTtcclxuICAgICAgICBjb29raWVPYmoudmFsID0gY29va2llLnN1YnN0cihjb29raWUuaW5kZXhPZihcIj1cIikgKyAxKTtcclxuICAgICAgICBpZihjb29raWVPYmoudmFsLnN1YnN0cigtMSkgPT09ICc7Jykge1xyXG4gICAgICAgICAgICBjb29raWVPYmoudmFsID0gY29va2llT2JqLnZhbC5zdWJzdHIoMCwgY29va2llT2JqLnZhbC5sZW5ndGggLSAxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNvb2tpZU9iajtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIENvbnZlcnRzIGEgY29va2llIG9iamVjdCB0byBhIGNvb2tpZSBzdHJpbmcuXHJcbiAgICAgKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICAgICAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gICAgICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gICAgICogQHZlcnNpb24gMjAxMjA5MDlcclxuICAgICAqIEBtZXRob2RPZiBhdHJvcGEuQ29va2llTW9uc3RlciNcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjb29raWVPYmogQSBjb29raWUgb2JqZWN0XHJcbiAgICAgKiBAcmV0dXJucyB7U3RyaW5nfSBSZXR1cm5zIGEgY29va2llIHN0cmluZy5cclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiB2YXIgY29va2llTW9uc3RlciA9IG5ldyBhdHJvcGEuQ29va2llTW9uc3RlcigpO1xyXG4gICAgICogLy8gY3JlYXRpbmcgYSBjb29raWVcclxuICAgICAqIGNvb2tpZU1vbnN0ZXIuc2V0Q29va2llKCdhdHJvcGEnLCAnaGlhbCBhdHJvcGEhIScpO1xyXG4gICAgICogY29uc29sZS5sb2coZG9jdW1lbnQuY29va2llKTtcclxuICAgICAqIFxyXG4gICAgICogLy8gZ2V0dGluZyBhIGNvb2tpZSBvYmplY3RcclxuICAgICAqIHZhciBjb29raWVPYmogPSBjb29raWVNb25zdGVyLmdldENvb2tpZSgnYXRyb3BhJyk7XHJcbiAgICAgKiBjb25zb2xlLmxvZyhjb29raWVPYmopO1xyXG4gICAgICogXHJcbiAgICAgKiAvLyBjb252ZXJ0IHRoZSBjb29raWUgb2JqZWN0IHRvIGEgc3RyaW5nXHJcbiAgICAgKiBjb25zb2xlLmxvZyhjb29raWVNb25zdGVyLmJha2VDb29raWUoY29va2llT2JqKSk7XHJcbiAgICAgKi9cclxuICAgIHRoaXMuYmFrZUNvb2tpZSA9IGZ1bmN0aW9uIGJha2VDb29raWUoY29va2llT2JqKSB7XHJcbiAgICAgICAgdmFyIGNvb2tpZSA9ICcnLCBrZXksIHZhbDtcclxuICAgICAgICBcclxuICAgICAgICBrZXkgPSBjb29raWVPYmoua2V5O1xyXG4gICAgICAgIHZhbCA9IGNvb2tpZU9iai52YWw7XHJcbiAgICAgICAgY29va2llID0ga2V5ICsgJz0nICsgdmFsICsgJzsnO1xyXG4gICAgICAgIHJldHVybiBjb29raWU7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBGaWx0ZXIgY29va2llcyBiYXNlZCBvbiB1c2VyIHNwZWNpZmllZCBjYWxsYmFjay5cclxuICAgICAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gICAgICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAgICAgKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAgICAgKiBAdmVyc2lvbiAyMDEzMDIyM1xyXG4gICAgICogQG1ldGhvZE9mIGF0cm9wYS5Db29raWVNb25zdGVyI1xyXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2sgVGhlIGNhbGxiYWNrIGZ1bmN0aW9uIHdpbGwgYmUgcGFzc2VkXHJcbiAgICAgKiAgdHdvIGFyZ3VtZW50cy4gVGhlIGZpcnN0IGlzIGEgY29va2llIG9iamVjdCBmcm9tIHRoZSBjdXJyZW50XHJcbiAgICAgKiAgZG9jdW1lbnQuIFRoZSBzZWNvbmQgYXJndW1lbnQgaXMgdGhlIHZhbHVlIHN1cHBsaWVkIGZvclxyXG4gICAgICogIDxjb2RlPmFyZ3M8L2NvZGU+IGlmIHRoZSBjYWxsYmFjayBmdW5jdGlvbiByZXR1cm5zIDxjb2RlPnRydWU8L2NvZGU+XHJcbiAgICAgKiAgdGhlbiB0aGUgY29va2llIG9iamVjdCB3aWxsIGJlIGluY2x1ZGVkIGluIHRoZSByZXR1cm4gcmVzdWx0cy5cclxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGFyZ3MgQXJndW1lbnRzIHRvIHBhc3MgdG8gdGhlIGNhbGxiYWNrXHJcbiAgICAgKiBmdW5jdGlvbi5cclxuICAgICAqIEByZXR1cm5zIHtBcnJheX0gQW4gYXJyYXkgb2YgY29va2llIG9iamVjdHMuXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogdmFyIGNvb2tpZU1vbnN0ZXIgPSBuZXcgYXRyb3BhLkNvb2tpZU1vbnN0ZXIoKTtcclxuICAgICAqIC8vIGNyZWF0aW5nIGEgZmV3IGNvb2tpZXNcclxuICAgICAqIGNvb2tpZU1vbnN0ZXIuc2V0Q29va2llKCdhdHJvcGEnLCAnaGlhbCBhdHJvcGEhIScpO1xyXG4gICAgICogY29va2llTW9uc3Rlci5zZXRDb29raWUoJ2thdGppaScsICdtdW5jaGluZycpO1xyXG4gICAgICogY29uc29sZS5sb2coZG9jdW1lbnQuY29va2llKTtcclxuICAgICAqIFxyXG4gICAgICogLy8gZmlsdGVyIGNvb2tpZXNcclxuICAgICAqIGZ1bmN0aW9uIGNvb2tpZUZpbHRlcihjb29raWVPYmosIGNvb2tpZVZhbHVlKSB7XHJcbiAgICAgKiAgICAgaWYoY29va2llT2JqLnZhbCA9PT0gY29va2llVmFsdWUpIHtcclxuICAgICAqICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgKiAgICAgfSBlbHNlIHtcclxuICAgICAqICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICogICAgIH1cclxuICAgICAqIH1cclxuICAgICAqIHZhciBjb29raWVPYmpBcnJheSA9IGNvb2tpZU1vbnN0ZXIuaW5zcGVjdENvb2tpZXMoXHJcbiAgICAgKiAgICAgY29va2llRmlsdGVyLCAnbXVuY2hpbmcnKTtcclxuICAgICAqIGNvbnNvbGUubG9nKGNvb2tpZU9iakFycmF5KTtcclxuICAgICAqL1xyXG4gICAgdGhpcy5pbnNwZWN0Q29va2llcyA9IGZ1bmN0aW9uIGluc3BlY3RDb29raWVzKGNhbGxiYWNrLCBhcmdzKSB7XHJcbiAgICAgICAgdmFyIHRlc3RDb29raWUsIGNvb2tpZXMsIGphciA9IFtdO1xyXG4gICAgICAgIGNvb2tpZXMgPSB0aGlzLmdldENvb2tpZXMoKTtcclxuICAgICAgICB3aGlsZSAoY29va2llcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHRlc3RDb29raWUgPSBjb29raWVzLnNoaWZ0KCk7XHJcbiAgICAgICAgICAgIGlmIChjYWxsYmFjayh0ZXN0Q29va2llLCBhcmdzKSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgamFyLnB1c2godGVzdENvb2tpZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGphcjtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEludGVybmFsIGNhbGxiYWNrIGZ1bmN0aW9uIHVzZWQgd2hpbGUgZ2V0dGluZyB0aGUgY3VycmVudFxyXG4gICAgICogY29va2llcy5cclxuICAgICAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gICAgICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAgICAgKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAgICAgKiBAdmVyc2lvbiAyMDEzMDIyM1xyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZXRob2RPZiBhdHJvcGEuQ29va2llTW9uc3Rlci1cclxuICAgICAqIEBwYXJhbSB7Y29va2llT2JqfSB0ZXN0Q29va2llIEEgY29va2llIG9iamVjdFxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGFyZ3MgYXJndW1lbnQgdXNlZCBpbiBjb21wYXJpc29uIGZ1bmN0aW9uXHJcbiAgICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gSWYgY29va2llIGtleSBpcyBleGFjdGx5IGVxdWFsIHRvIHRoZSBhcmd1bWVudFxyXG4gICAgICogdGhlbiB0aGUgY2FsbGJhY2sgcmV0dXJucyB0cnVlLlxyXG4gICAgICovXHJcbiAgICBnZXRDb29raWVDYWxsYmFjayA9IGZ1bmN0aW9uIGdldENvb2tpZUNhbGxiYWNrKHRlc3RDb29raWUsIGFyZ3MpIHtcclxuICAgICAgICB2YXIgb3V0O1xyXG4gICAgICAgIGlmICh0ZXN0Q29va2llLmtleSA9PT0gYXJncykge1xyXG4gICAgICAgICAgICBvdXQgPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG91dCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBhIHVzZXIgcmVxdWVzdGVkIGNvb2tpZS5cclxuICAgICAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gICAgICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAgICAgKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAgICAgKiBAdmVyc2lvbiAyMDEzMDIyM1xyXG4gICAgICogQG1ldGhvZE9mIGF0cm9wYS5Db29raWVNb25zdGVyI1xyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHdoaWNoS2V5IFRoZSBjb29raWVzIGtleSAobmFtZSlcclxuICAgICAqIEByZXR1cm5zIHtjb29raWVPYmp8ZmFsc2V9IFJldHVybnMgYSBjb29raWUgb2JqZWN0IGlmXHJcbiAgICAgKiAgYSBjb29raWUgd2l0aCB0aGUgc3BlY2lmaWVkIGtleSBpcyBmb3VuZCBvciBmYWxzZSBpZlxyXG4gICAgICogIGl0IGlzIG5vdCBmb3VuZC5cclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiB2YXIgY29va2llTW9uc3RlciA9IG5ldyBhdHJvcGEuQ29va2llTW9uc3RlcigpO1xyXG4gICAgICogLy8gY3JlYXRpbmcgYSBjb29raWVcclxuICAgICAqIGNvb2tpZU1vbnN0ZXIuc2V0Q29va2llKCdhdHJvcGEnLCAnaGlhbCBhdHJvcGEhIScpO1xyXG4gICAgICogY29uc29sZS5sb2coZG9jdW1lbnQuY29va2llKTtcclxuICAgICAqIC8vIGdldCBhIHNwZWNpZmljIGNvb2tpZVxyXG4gICAgICogdmFyIGNvb2tpZU9iaiA9IGNvb2tpZU1vbnN0ZXIuZ2V0Q29va2llKCdhdHJvcGEnKTtcclxuICAgICAqIGNvbnNvbGUubG9nKGNvb2tpZU9iai5rZXkpO1xyXG4gICAgICogY29uc29sZS5sb2coY29va2llT2JqLnZhbCk7XHJcbiAgICAgKi9cclxuICAgIHRoaXMuZ2V0Q29va2llID0gZnVuY3Rpb24gZ2V0Q29va2llKHdoaWNoS2V5KSB7XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9IHRoaXMuaW5zcGVjdENvb2tpZXMoZ2V0Q29va2llQ2FsbGJhY2ssIHdoaWNoS2V5LnRyaW0oKSk7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdFswXSB8fCBmYWxzZTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEdldCBhbGwgY29va2llcy5cclxuICAgICAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gICAgICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAgICAgKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAgICAgKiBAdmVyc2lvbiAyMDEyMDkwOVxyXG4gICAgICogQG1ldGhvZE9mIGF0cm9wYS5Db29raWVNb25zdGVyI1xyXG4gICAgICogQHJldHVybnMge0FycmF5fSBBbiBhcnJheSB3aG9zZSBlbGVtZW50cyBhcmUgY29va2llIG9iamVjdHMuXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogdmFyIGNvb2tpZU1vbnN0ZXIgPSBuZXcgYXRyb3BhLkNvb2tpZU1vbnN0ZXIoKTtcclxuICAgICAqIC8vIGNyZWF0aW5nIGEgY29va2llXHJcbiAgICAgKiBjb29raWVNb25zdGVyLnNldENvb2tpZSgnYXRyb3BhJywgJ2hpYWwgYXRyb3BhISEnKTtcclxuICAgICAqIC8vIGdldCBhbGwgY29va2llIG9iamVjdHMgaW4gYW4gYXJyYXlcclxuICAgICAqIGNvbnNvbGUubG9nKGNvb2tpZU1vbnN0ZXIuZ2V0Q29va2llcygpKTtcclxuICAgICAqL1xyXG4gICAgdGhpcy5nZXRDb29raWVzID0gZnVuY3Rpb24gZ2V0Q29va2llcygpIHtcclxuICAgICAgICB2YXIgbiwgbCwgY29va2llQXJyYXksIGNvb2tpZU9iajtcclxuICAgICAgICBjdXJyZW50Q29va2llcyA9IFtdO1xyXG4gICAgICAgIGNvb2tpZUFycmF5ID0gZG9jdW1lbnQuY29va2llLnNwbGl0KFwiO1wiKTtcclxuICAgICAgICBmb3IgKG4gPSAwLCBsID0gY29va2llQXJyYXkubGVuZ3RoOyBuIDwgbDsgbisrKSB7XHJcbiAgICAgICAgICAgIGNvb2tpZU9iaiA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAoY29va2llQXJyYXlbbl0pIHtcclxuICAgICAgICAgICAgICAgIGNvb2tpZU9iaiA9IHRoaXMuY29va2llMm9iaihjb29raWVBcnJheVtuXSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29va2llT2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudENvb2tpZXMucHVzaChjb29raWVPYmopO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjdXJyZW50Q29va2llcztcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZXMgYSBzcGVjaWZpZWQgY29va2llIGJ5IHVzZXIgc3VibWl0dGVkIHN0cmluZy5cclxuICAgICAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gICAgICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAgICAgKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAgICAgKiBAdmVyc2lvbiAyMDEzMDIyM1xyXG4gICAgICogQG1ldGhvZE9mIGF0cm9wYS5Db29raWVNb25zdGVyI1xyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHdoaWNoS2V5IFRoZSBjb29raWVzIGtleSAobmFtZSkgdGhhdFxyXG4gICAgICogd2lsbCBiZSBkZWxldGVkLlxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIHZhciBjb29raWVNb25zdGVyID0gbmV3IGF0cm9wYS5Db29raWVNb25zdGVyKCk7XHJcbiAgICAgKiAvLyBjcmVhdGluZyB0aGUgY29va2llIHRvIGRlbGV0ZVxyXG4gICAgICogY29va2llTW9uc3Rlci5zZXRDb29raWUoJ2F0cm9wYScsICdoaWFsIGF0cm9wYSEhJyk7XHJcbiAgICAgKiBjb25zb2xlLmxvZyhkb2N1bWVudC5jb29raWUpO1xyXG4gICAgICogLy8gZGVsZXRlIGEgY29va2llXHJcbiAgICAgKiBjb29raWVNb25zdGVyLmRlbGV0ZUNvb2tpZSgnYXRyb3BhJyk7XHJcbiAgICAgKiBjb25zb2xlLmxvZyhkb2N1bWVudC5jb29raWUpO1xyXG4gICAgICovXHJcbiAgICB0aGlzLmRlbGV0ZUNvb2tpZSA9IGZ1bmN0aW9uIGRlbGV0ZUNvb2tpZSh3aGljaEtleSkge1xyXG4gICAgICAgIHZhciBjb29raWVPYmogPSB7fTtcclxuICAgICAgICBjb29raWVPYmoua2V5ID0gd2hpY2hLZXk7XHJcbiAgICAgICAgY29va2llT2JqLnZhbCA9ICc7ZXhwaXJlcz1UaHUsIDIgQXVnIDIwMDEgMjA6NDc6MTEgVVRDJztcclxuICAgICAgICBkb2N1bWVudC5jb29raWUgPSB0aGlzLmJha2VDb29raWUoY29va2llT2JqKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZXMgYSBzcGVjaWZpZWQgY29va2llIGJ5IHVzZXIgc3VibWl0dGVkIGNvb2tpZU9iai5cclxuICAgICAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gICAgICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAgICAgKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAgICAgKiBAdmVyc2lvbiAyMDEyMDkwOVxyXG4gICAgICogQG1ldGhvZE9mIGF0cm9wYS5Db29raWVNb25zdGVyI1xyXG4gICAgICogQHBhcmFtIHtjb29raWVPYmp9IGNvb2tpZU9iaiBBIGNvb2tpZSBvYmplY3QuXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogdmFyIGNvb2tpZU1vbnN0ZXIgPSBuZXcgYXRyb3BhLkNvb2tpZU1vbnN0ZXIoKTtcclxuICAgICAqIC8vIGNyZWF0aW5nIHRoZSBjb29raWUgdG8gZGVsZXRlXHJcbiAgICAgKiBjb29raWVNb25zdGVyLnNldENvb2tpZSgnYXRyb3BhJywgJ2hpYWwgYXRyb3BhISEnKTtcclxuICAgICAqIGNvbnNvbGUubG9nKGRvY3VtZW50LmNvb2tpZSk7XHJcbiAgICAgKiAvLyBkZWxldGUgYSBjb29raWVcclxuICAgICAqIGNvb2tpZU1vbnN0ZXIuZGVsZXRlQ29va2llT2JqKFxyXG4gICAgICogICAgIHtrZXkgOiAnYXRyb3BhJywgdmFsIDogJ2RvZXMgbm90IG1hdHRlcid9KTtcclxuICAgICAqIGNvbnNvbGUubG9nKGRvY3VtZW50LmNvb2tpZSk7XHJcbiAgICAgKi9cclxuICAgIHRoaXMuZGVsZXRlQ29va2llT2JqID0gZnVuY3Rpb24gZGVsZXRlQ29va2llT2JqKGNvb2tpZU9iaikge1xyXG4gICAgICAgIHRoaXMuZGVsZXRlQ29va2llKGNvb2tpZU9iai5rZXkpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogU2V0cyBhIGNvb2tpZSBwZXIgdXNlciBzcGVjaWZpY2F0aW9ucyBhcyBzdHJpbmdzLiBUaGUgY29va2llXHJcbiAgICAgKiB3aWxsIGV4cGlyZSB3aGVuIHRoZSBicm93c2VyIGlzIGNsb3NlZC5cclxuICAgICAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gICAgICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAgICAgKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAgICAgKiBAdmVyc2lvbiAyMDEyMDkwOVxyXG4gICAgICogQG1ldGhvZE9mIGF0cm9wYS5Db29raWVNb25zdGVyI1xyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHdoaWNoS2V5IFRoZSBrZXkgKG5hbWUpIG9mIHRoZSBuZXcgY29va2llXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gc2V0VG8gVGhlIHZhbHVlIG9mIHRoZSBuZXcgY29va2llLlxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIHZhciBjb29raWVNb25zdGVyID0gbmV3IGF0cm9wYS5Db29raWVNb25zdGVyKCk7XHJcbiAgICAgKiAvLyBzZXQgYSBjb29raWVcclxuICAgICAqIGNvb2tpZU1vbnN0ZXIuc2V0Q29va2llKCdhdHJvcGEnLCAnaGlhbCcpO1xyXG4gICAgICogY29uc29sZS5sb2coZG9jdW1lbnQuY29va2llKTtcclxuICAgICAqL1xyXG4gICAgdGhpcy5zZXRDb29raWUgPSBmdW5jdGlvbiBzZXRDb29raWUod2hpY2hLZXksIHNldFRvKSB7XHJcbiAgICAgICAgdmFyIG5ld0Nvb2tpZSA9IHt9O1xyXG4gICAgICAgIG5ld0Nvb2tpZS5rZXkgPSB3aGljaEtleTtcclxuICAgICAgICBuZXdDb29raWUudmFsID0gc2V0VG87XHJcbiAgICAgICAgZG9jdW1lbnQuY29va2llID0gdGhpcy5iYWtlQ29va2llKG5ld0Nvb2tpZSk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIGEgY29va2llIHBlciB1c2VyIHNwZWNpZmljYXRpb25zIGFzIGFuIG9iamVjdC5cclxuICAgICAqIFRoZSBjb29raWUgd2lsbCBleHBpcmUgd2hlbiB0aGUgYnJvd3NlciBpcyBjbG9zZWQuXHJcbiAgICAgKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICAgICAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gICAgICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gICAgICogQHZlcnNpb24gMjAxMjA5MDlcclxuICAgICAqIEBtZXRob2RPZiBhdHJvcGEuQ29va2llTW9uc3RlciNcclxuICAgICAqIEBwYXJhbSB7Y29va2llT2JqfSBjb29raWVPYmogQSBjb29raWUgb2JqZWN0LlxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIHZhciBjb29raWVNb25zdGVyID0gbmV3IGF0cm9wYS5Db29raWVNb25zdGVyKCk7XHJcbiAgICAgKiAvLyBzZXQgYSBjb29raWVcclxuICAgICAqIGNvb2tpZU1vbnN0ZXIuc2V0Q29va2llT2JqKHtrZXkgOiAnYXRyb3BhJywgdmFsIDogJ2hpYWwgYXRyb3BhISEnfSk7XHJcbiAgICAgKiBjb25zb2xlLmxvZyhkb2N1bWVudC5jb29raWUpO1xyXG4gICAgICovXHJcbiAgICB0aGlzLnNldENvb2tpZU9iaiA9IGZ1bmN0aW9uIHNldENvb2tpZU9iaihjb29raWVPYmopIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zZXRDb29raWUoY29va2llT2JqLmtleSwgY29va2llT2JqLnZhbCk7XHJcbiAgICB9O1xyXG4gICAgXHJcbiAgICBhdHJvcGEuc3VwcG9ydENoZWNrKCdDb29raWVNb25zdGVyJyk7XHJcbn07XHJcblxyXG5cclxuXHJcblxyXG53aGlsZShhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMubGVuZ3RoID4gMCkge1xyXG4gICAgYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLnBvcCgpKCk7XHJcbn1cclxubW9kdWxlLmV4cG9ydHMgPSBhdHJvcGE7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9kb2NzL3ZzZG9jL09wZW5MYXllcnNBbGwuanNcIi8+XHJcbnZhciBhdHJvcGEgPSByZXF1aXJlKCdhdHJvcGEtaGVhZGVyJyk7XHJcbmF0cm9wYS5SZXF1ZXN0ZXIgPSByZXF1aXJlKCdhdHJvcGEtUmVxdWVzdGVyJykuUmVxdWVzdGVyO1xyXG5hdHJvcGEuSFRNTFBhcnNlciA9IHJlcXVpcmUoJ2F0cm9wYS1IVE1MUGFyc2VyJykuSFRNTFBhcnNlcjtcclxuLypqc2xpbnRcclxuICAgIGluZGVudDogNCxcclxuICAgIG1heGVycjogNTAsXHJcbiAgICB3aGl0ZTogdHJ1ZSxcclxuICAgIGJyb3dzZXI6IHRydWUsXHJcbiAgICBkZXZlbDogdHJ1ZSxcclxuICAgIHBsdXNwbHVzOiB0cnVlLFxyXG4gICAgcmVnZXhwOiB0cnVlXHJcbiovXHJcbi8qZ2xvYmFsIGF0cm9wYSAqL1xyXG4vLyBlbmQgaGVhZGVyXHJcblxyXG5hdHJvcGEucmVxdWlyZXMoXHJcbiAgICAnQ3JlYXRlSHRtbERvY3VtZW50c0Zyb21YbWxodHRwJyxcclxuICAgIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgICAgICB2YXIgc3VwcG9ydGVkID0gdHJ1ZTtcclxuICAgICAgICBcclxuICAgICAgICBbXHJcbiAgICAgICAgICAgIGF0cm9wYS5SZXF1ZXN0ZXIsXHJcbiAgICAgICAgICAgIGF0cm9wYS5IVE1MUGFyc2VyXHJcbiAgICAgICAgXS5mb3JFYWNoKGZ1bmN0aW9uIChwcmVyZXF1aXNpdGUpIHtcclxuICAgICAgICAgICAgaWYocHJlcmVxdWlzaXRlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHN1cHBvcnRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHN1cHBvcnRlZDtcclxuICAgIH1cclxuKTtcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGVzIEhUTUwgRE9NIERvY3VtZW50cyBmcm9tIGFuIFhNTEh0dHBSZXF1ZXN0IG9iamVjdC5cclxuICogIFRoaXMgd2FzIHRlc3RlZCBvbiBGaXJlZm94LCBpdCBkb2Vzbid0IHdvcmsgb24gZ29vZ2xlIGNocm9tZS5cclxuICogIFlvdXIgbWlsZWFnZSBtYXkgdmFyeS5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwMjI1XHJcbiAqIEBjbGFzcyBDcmVhdGVzIEhUTUwgRE9NIERvY3VtZW50cyBmcm9tIGFuIFhNTEh0dHBSZXF1ZXN0IG9iamVjdC5cclxuICogQHJlcXVpcmVzIGF0cm9wYS5SZXF1ZXN0ZXJcclxuICogQHJlcXVpcmVzIGF0cm9wYS5IVE1MUGFyc2VyXHJcbiAqIEByZXF1aXJlcyBhdHJvcGEuZGF0YVxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgbWV0aG9kLCB1cmwsIGNhbGxiYWNrLCBkb2NzO1xyXG4gKiBcclxuICogLy8gSFRUUCBSZXF1ZXN0IG1ldGhvZFxyXG4gKiBtZXRob2QgPSAnZ2V0JztcclxuICogXHJcbiAqIC8vIHRoZSBwYWdlIHRvIGZldGNoLCB0aGlzIHBhZ2UgbXVzdCBiZSBhY2Nlc3NpYmxlXHJcbiAqIC8vIHNlY3VyaXR5IHJlc3RyaWN0aW9ucyBtYXkgYXBwbHlcclxuICogdXJsID0gJ2RvY3MvanNkb2Mvc3ltYm9scy9hdHJvcGEueHBhdGguaHRtbCc7XHJcbiAqIFxyXG4gKiAvLyB0aGUgY2FsbGJhY2sgZnVudGlvbiBmb3Igd2hlbiBhIG5ldyBkb2N1bWVudCBpcyBjcmVhdGVkXHJcbiAqIGNhbGxiYWNrID0gZnVuY3Rpb24gbmV3RG9jdW1lbnRIYW5kbGVyKGRvY3JlZikge1xyXG4gKiAgICAgdHJ5IHtcclxuICogICAgICAgICBpZiAoZmFsc2UgPT09IGRvY3JlZikge1xyXG4gKiAgICAgICAgICAgICAvLyBpZiB0aGUgZG9jdW1lbnQgY291bGQgbm90IGJlIGNyZWF0ZWQgdGhyb3cgYW4gZXJyb3JcclxuICogICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdhdHJvcGEuQ3JlYXRlSHRtbERvY3VtZW50c0Zyb21YbWxodHRwICcgK1xyXG4gKiAgICAgICAgICAgICAgICAgICdDb3VsZCBub3QgY3JlYXRlIGhpZGRlbiBkb2N1bWVudCcpO1xyXG4gKiAgICAgICAgIH0gZWxzZSB7XHJcbiAqICAgICAgICAgICAgIC8vIGlmIHRoZSBkb2N1bWVudCBjb3VsZCBiZSBjcmVhdGVkIHdlJ2xsIHRyeSB0byB1c2UgaXRcclxuICogICAgICAgICAgICAgaWYoZG9jcmVmLmdldEVsZW1lbnRCeUlkKCdpbmRleCcpKSB7XHJcbiAqICAgICAgICAgICAgICAgICAvLyBpZiB0aGUgZG9jdW1lbnQgY291bGQgYmUgdXNlZCB0aGVuXHJcbiAqICAgICAgICAgICAgICAgICAvLyBkbyBzb21ldGhpbmcgdXNlZnVsIHdpdGggaXQuXHJcbiAqICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnc3VjY2VzcyEnKTtcclxuICogICAgICAgICAgICAgfSBlbHNlIHtcclxuICogICAgICAgICAgICAgICAgIC8vIGlmIHRoZSBkb2N1bWVudCBjYW4gbm90IGJlIHVzZWQgdGhyb3cgYW4gZXJyb3JcclxuICogICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignYXRyb3BhLkNyZWF0ZUh0bWxEb2N1bWVudHNGcm9tWG1saHR0cCAnICtcclxuICogICAgICAgICAgICAgICAgICAgICAgJ2NvdWxkIG5vdCB1c2UgdGhlIGhpZGRlbiBkb2N1bWVudCcpO1xyXG4gKiAgICAgICAgICAgICB9XHJcbiAqICAgICAgICAgfVxyXG4gKiAgICAgfSBjYXRjaCAoZSkge1xyXG4gKiAgICAgICAgIC8vIGNhdGNoaW5nIGFueSBlcnJvcnMgdGhyb3duIGFuZCBoYW5kbGUgdGhlbS5cclxuICogICAgIH1cclxuICogICAgIC8vIEF0IHRoaXMgcG9pbnQgdGhlIHdvcmsgd2l0aCB0aGUgZG9jdW1lbnQgaXMgY3VycmVudGx5IGZpbmlzaGVkXHJcbiAqICAgICAvLyB0aGUgZG9jdW1lbnQgd2lsbCBsaXZlIGluIHRoZSBkb2N1bWVudFF1ZXVlIGluIGNhc2UgeW91IG5lZWQgaXRcclxuICogICAgIC8vIGxhdGVyLiBUaGlzIGlzIHdoZW4geW91IHdpbGwgdHJpZ2dlciBhbnkgZnVuY3Rpb24gd2hpY2ggZGVwZW5kc1xyXG4gKiAgICAgLy8gb24gdGhpcyBoaWRkZW4gZG9jdW1lbnQgaGF2aW5nIGJlZW4gY3JlYXRlZC5cclxuICogICAgIHNob3dEb2N1bWVudFF1ZXVlKCk7XHJcbiAqIH07XHJcbiAqIFxyXG4gKiBmdW5jdGlvbiBzaG93RG9jdW1lbnRRdWV1ZSgpIHtcclxuICogICAgIGNvbnNvbGUuZGlyKGRvY3MuZG9jdW1lbnRRdWV1ZSk7XHJcbiAqIH1cclxuICogXHJcbiAqIC8vIGNyZWF0ZSBhbiBpbnN0YW5jZSBvZiB0aGUgY2xhc3NcclxuICogZG9jcyA9IG5ldyBhdHJvcGEuQ3JlYXRlSHRtbERvY3VtZW50c0Zyb21YbWxodHRwKCk7XHJcbiAqIC8vIHRyeSB0byBjcmVhdGUgYSBuZXcgaGlkZGVuIGRvY3VtZW50XHJcbiAqIGRvY3MubmV3RG9jdW1lbnQobWV0aG9kLCB1cmwsIG51bGwsIGNhbGxiYWNrKTtcclxuICovXHJcbmF0cm9wYS5DcmVhdGVIdG1sRG9jdW1lbnRzRnJvbVhtbGh0dHAgPSBmdW5jdGlvbiBDcmVhdGVIdG1sRG9jdW1lbnRzRnJvbVhtbGh0dHAoXHJcbikge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICB2YXIgcmVxdWVzdGVyLFxyXG4gICAgaHRtbGRvY3VtZW50LFxyXG4gICAgdGhhdDtcclxuICAgIHRoYXQgPSB0aGlzO1xyXG4gICAgLyoqXHJcbiAgICAgKiBRdWV1ZSBvZiBkb2N1bWVudHMgY3JlYXRlZCBieSB0aGlzIGluc3RhbmNlLlxyXG4gICAgICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAgICAgKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICAgICAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICAgICAqIEB2ZXJzaW9uIDIwMTIwOTA5XHJcbiAgICAgKiBAdHlwZSBBcnJheVxyXG4gICAgICogQGZpZWxkT2YgYXRyb3BhLkNyZWF0ZUh0bWxEb2N1bWVudHNGcm9tWG1saHR0cCNcclxuICAgICAqL1xyXG4gICAgdGhpcy5kb2N1bWVudFF1ZXVlID0gW107XHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gSFRNTCBET00gRG9jdW1lbnQgYW5kIHB1dHMgaXQgaW4gdGhlIGRvY3VtZW50XHJcbiAgICAgKiAgcXVldWUsIHRoZW4gZXhlY3V0ZXMgdGhlIGNhbGxiYWNrIGdpdmVuLiBOb3RlLCB0aGlzIGRvZXNcclxuICAgICAqICBub3Qgd29yayBvbiBnb29nbGUgY2hyb21lLlxyXG4gICAgICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAgICAgKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICAgICAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICAgICAqIEB2ZXJzaW9uIDIwMTIwOTA5XHJcbiAgICAgKiBAbWV0aG9kT2YgYXRyb3BhLkNyZWF0ZUh0bWxEb2N1bWVudHNGcm9tWG1saHR0cCNcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBtZXRob2QgQW55IHZhbGlkIG1ldGhvZCB0byBiZSB1c2VkIGluXHJcbiAgICAgKiBhbiBYTUxIdHRwUmVxdWVzdC5cclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB1cmwgVGhlIGxvY2F0aW9uIG9mIHRoZSBkb2N1bWVudCdzIHNvdXJjZS5cclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlQm9keSBudWxsLCBvciBhIG1lc3NhZ2UgYm9keS5cclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIFRoZSBmdW5jdGlvbiB0byBleGVjdXRlIHVwb25cclxuICAgICAqIHJlcXVlc3QgY29tcGxldGlvbi4gVGhpcyBmdW5jdGlvbiB3aWxsIGJlIGdpdmVuIGVpdGhlclxyXG4gICAgICogYW4gSFRNTCBET00gRG9jdW1lbnQgb3IgZmFsc2UuXHJcbiAgICAgKiBAcmV0dXJucyB7SFRNTCBET00gRG9jdW1lbnQsIGZhbHNlfSBUaGUgcmV0dXJuIHZhbHVlIGlzXHJcbiAgICAgKiBnaXZlbiB0byB0aGUgY2FsbGJhY2sgZnVuY3Rpb24uXHJcbiAgICAgKi9cclxuICAgIHRoaXMubmV3RG9jdW1lbnQgPSBmdW5jdGlvbiBuZXdEb2N1bWVudChcclxuICAgICAgICBtZXRob2QsIHVybCwgbWVzc2FnZUJvZHksIGNhbGxiYWNrXHJcbiAgICApIHtcclxuICAgICAgICB2YXIgY2I7XHJcbiAgICAgICAgLypcclxuICAgICAgICAgKiBJbnRlcm5hbCBjYWxsYmFjayBmdW5jdGlvbiB0byBwcm9jZXNzIGRhdGEgZnJvbSBYTUxIdHRwUmVxdWVzdFxyXG4gICAgICAgICAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gICAgICAgICAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gICAgICAgICAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICAgICAgICAgKiBAdmVyc2lvbiAyMDEyMDkwOVxyXG4gICAgICAgICAqIEBtZXRob2RPZiBhdHJvcGEuQ3JlYXRlSHRtbERvY3VtZW50c0Zyb21YbWxodHRwI25ld0RvY3VtZW50LVxyXG4gICAgICAgICAqIEBwcml2YXRlXHJcbiAgICAgICAgICogQHByb3BlcnR5IHt0cnVlLGZhbHNlfSBib29sU3RhdHVzIFRoaXMgdGVsbHMgd2hldGhlciBvciBub3QgdGhlXHJcbiAgICAgICAgICogIFhNTEh0dHBSZXF1ZXN0IHdhcyBzdWNjZXNzZnVsLlxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7WE1MSHR0cCBSZXNwb25zZSBPYmplY3R9IHJlc3BvbnNlT2JqZWN0IFRoaXMgaXMgdGhlXHJcbiAgICAgICAgICogIHJlc3BvbnNlIG9iamVjdCBmcm9tIHRoZSBYTUxIdHRwIFJlcXVlc3Qgb2JqZWN0LlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGNiID0gZnVuY3Rpb24gKGJvb2xTdGF0dXMsIHJlc3BvbnNlT2JqZWN0KSB7XHJcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKGJvb2xTdGF0dXMgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChmYWxzZSAhPT0gaHRtbGRvY3VtZW50LmxvYWRTdHJpbmcoXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2VPYmplY3QucmVzcG9uc2VUZXh0KSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBodG1sZG9jdW1lbnQuZG9jO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZG9jdW1lbnRRdWV1ZS5wdXNoKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBib29sU3RhdHVzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKHJlc3VsdCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXF1ZXN0ZXIubWFrZVJlcXVlc3QobWV0aG9kLCB1cmwsIG1lc3NhZ2VCb2R5LCBjYik7XHJcbiAgICB9O1xyXG4gICAgXHJcbiAgICBcclxuICAgIGZ1bmN0aW9uIGluaXQgKCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGF0cm9wYS5zdXBwb3J0Q2hlY2soJ0NyZWF0ZUh0bWxEb2N1bWVudHNGcm9tWG1saHR0cCcpO1xyXG4gICAgICAgICAgICByZXF1ZXN0ZXIgPSBuZXcgYXRyb3BhLlJlcXVlc3RlcigpO1xyXG4gICAgICAgICAgICBodG1sZG9jdW1lbnQgPSBuZXcgYXRyb3BhLkhUTUxQYXJzZXIoKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIGF0cm9wYS5kYXRhLkNyZWF0ZUh0bWxEb2N1bWVudHNGcm9tWG1saHR0cC5zdXBwb3J0ID0gJ3Vuc3VwcG9ydGVkJztcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGF0cm9wYS5kYXRhLkNyZWF0ZUh0bWxEb2N1bWVudHNGcm9tWG1saHR0cC5lcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBpbml0KCk7XHJcbn07XHJcblxyXG5cclxuXHJcblxyXG53aGlsZShhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMubGVuZ3RoID4gMCkge1xyXG4gICAgYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLnBvcCgpKCk7XHJcbn1cclxubW9kdWxlLmV4cG9ydHMgPSBhdHJvcGE7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9kb2NzL3ZzZG9jL09wZW5MYXllcnNBbGwuanNcIi8+XHJcbnZhciBhdHJvcGEgPSByZXF1aXJlKCdhdHJvcGEtaGVhZGVyJyk7XHJcbi8qanNsaW50XHJcbiAgICBpbmRlbnQ6IDQsXHJcbiAgICBtYXhlcnI6IDUwLFxyXG4gICAgd2hpdGU6IHRydWUsXHJcbiAgICBicm93c2VyOiB0cnVlLFxyXG4gICAgZGV2ZWw6IHRydWUsXHJcbiAgICBwbHVzcGx1czogdHJ1ZSxcclxuICAgIHJlZ2V4cDogdHJ1ZVxyXG4qL1xyXG4vKmdsb2JhbCBhdHJvcGEgKi9cclxuLy8gZW5kIGhlYWRlclxyXG5cclxuYXRyb3BhLnJlcXVpcmVzKFxyXG4gICAgJ0hUTUxQYXJzZXInLFxyXG4gICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgICAgIHZhciBzdXBwb3J0ZWQgPSB0cnVlO1xyXG4gICAgICAgIFxyXG4gICAgICAgIFtcclxuICAgICAgICAgICAgZG9jdW1lbnQuaW1wbGVtZW50YXRpb24uY3JlYXRlRG9jdW1lbnRUeXBlLFxyXG4gICAgICAgICAgICBkb2N1bWVudC5pbXBsZW1lbnRhdGlvbi5jcmVhdGVEb2N1bWVudFxyXG4gICAgICAgIF0uZm9yRWFjaChmdW5jdGlvbiAocHJlcmVxdWlzaXRlKSB7XHJcbiAgICAgICAgICAgIGlmKHByZXJlcXVpc2l0ZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBzdXBwb3J0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBzdXBwb3J0ZWQ7XHJcbiAgICB9XHJcbik7XHJcblxyXG4vKipcclxuICogQ3JlYXRlcyBhIG5ldyBIVE1MIFBhcnNlcjxiciAvPlxyXG4gKiBDYXJyeSBvdXQgRE9NIG9wZXJhdGlvbnMgd2l0aG91dCBsb2FkaW5nIGNvbnRlbnQgdG8gdGhlIGFjdGl2ZSBkb2N1bWVudC5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTIwOTA5XHJcbiAqIEBjbGFzcyBDcmVhdGVzIGEgbmV3IEhUTUwgUGFyc2VyXHJcbiAqIEByZXR1cm5zIHtIVE1MIERPTSBEb2N1bWVudH0gUmV0dXJucyBhIGJsYW5rIEhUTUwgRG9jdW1lbnQgZm9yIHlvdSB0byBsb2FkXHJcbiAqICBkYXRhIGludG9cclxuICogQHJlcXVpcmVzIGF0cm9wYS5kYXRhXHJcbiAqL1xyXG5hdHJvcGEuSFRNTFBhcnNlciA9IGZ1bmN0aW9uIEhUTUxQYXJzZXIoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHZhciBteSA9IHRoaXM7XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogSG9sZHMgdGhlIGNyZWF0ZWQgSFRNTCBET00gRG9jdW1lbnQuXHJcbiAgICAgKiBAdHlwZSBIVE1MIERPTSBEb2N1bWVudFxyXG4gICAgICogQGZpZWxkT2YgYXRyb3BhLkhUTUxQYXJzZXIjXHJcbiAgICAgKi9cclxuICAgIHRoaXMuZG9jID0ge307XHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBibGFuayBIVE1MIERPTSBEb2N1bWVudC5cclxuICAgICAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gICAgICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAgICAgKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAgICAgKiBAdmVyc2lvbiAyMDEyMDkwOVxyXG4gICAgICogQG1ldGhvZE9mIGF0cm9wYS5IVE1MUGFyc2VyI1xyXG4gICAgICogQHJldHVybnMge0hUTUwgRE9NIERvY3VtZW50fSBSZXNldHMgdGhlIGRvYyBwcm9wZXJ0eSBvZiB0aGlzIGluc3RhbmNlXHJcbiAgICAgKiAgYW5kLCByZXR1cm5zIGEgYmxhbmsgSFRNTCBEb2N1bWVudCBmb3IgeW91IHRvIGxvYWQgZGF0YSBpbnRvLlxyXG4gICAgICovXHJcbiAgICB0aGlzLm5ld0RvY3VtZW50ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBkdDtcclxuICAgICAgICBkdCA9IGRvY3VtZW50LmltcGxlbWVudGF0aW9uLmNyZWF0ZURvY3VtZW50VHlwZShcclxuICAgICAgICAgICAgXCJodG1sXCIsXHJcbiAgICAgICAgICAgIFwiLS8vVzNDLy9EVEQgSFRNTCA0LjAxIFRyYW5zaXRpb25hbC8vRU5cIixcclxuICAgICAgICAgICAgXCJodHRwOi8vd3d3LnczLm9yZy9UUi9odG1sNC9sb29zZS5kdGRcIlxyXG4gICAgICAgICk7XHJcbiAgICAgICAgbXkuZG9jID0gZG9jdW1lbnQuaW1wbGVtZW50YXRpb24uY3JlYXRlRG9jdW1lbnQoJycsICcnLCBkdCk7XHJcbiAgICAgICAgaWYgKG15LmRvYy5ub2RlVHlwZSAhPT0gOSkge1xyXG4gICAgICAgICAgICBhdHJvcGEuZGF0YS5IVE1MUGFyc2VyLnN1cHBvcnQgPSAndW5zdXBwb3J0ZWQnO1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYXRyb3BhLmRhdGEuSFRNTFBhcnNlci5lcnJvciArXHJcbiAgICAgICAgICAgICAgICAndGhlIGRvY3VtZW50IG5vZGVUeXBlIHJldHVybmVkIGFuIHVuZXhwZWN0ZWQgdmFsdWUnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG15LmRvYztcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBuZXcgSFRNTCBET00gRG9jdW1lbnQgYW5kIGxvYWRzIHRoZSBnaXZlbiBzdHJpbmcgaW50byBpdC5cclxuICAgICAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gICAgICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAgICAgKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAgICAgKiBAdmVyc2lvbiAyMDEyMDkwOVxyXG4gICAgICogQG1ldGhvZE9mIGF0cm9wYS5IVE1MUGFyc2VyI1xyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGh0bWxzdHJpbmcgYSBzdHJpbmcgb2YgSFRNTCBkYXRhXHJcbiAgICAgKiBAcmV0dXJucyB7SFRNTCBET00gRG9jdW1lbnR9IFJlc2V0cyB0aGUgZG9jIHByb3BlcnR5IG9mIHRoaXMgaW5zdGFuY2UsXHJcbiAgICAgKiBsb2FkaW5nIGEgbmV3IGRvY3VtZW50IHdpdGggdGhlIHN0cmluZyBnaXZlbi5cclxuICAgICAqL1xyXG4gICAgdGhpcy5sb2FkU3RyaW5nID0gZnVuY3Rpb24gKGh0bWxzdHJpbmcpIHtcclxuICAgICAgICBpZiAoIWh0bWxzdHJpbmcpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBteS5uZXdEb2N1bWVudCgpO1xyXG4gICAgICAgICAgICBteS5kb2MuYXBwZW5kQ2hpbGQobXkuZG9jLmNyZWF0ZUVsZW1lbnQoJ2h0bWwnKSk7XHJcbiAgICAgICAgICAgIG15LmRvYy5kb2N1bWVudEVsZW1lbnQuaW5uZXJIVE1MID0gaHRtbHN0cmluZztcclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIGF0cm9wYS5kYXRhLkhUTUxQYXJzZXIuc3VwcG9ydCA9ICd1bnN1cHBvcnRlZCc7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihhdHJvcGEuZGF0YS5IVE1MUGFyc2VyLmVycm9yICtcclxuICAgICAgICAgICAgICAgICdhdHJvcGEuSFRNTFBhcnNlciBjYW4gbm90IGxvYWQgJyArXHJcbiAgICAgICAgICAgICAgICAndGhlIGhpZGRlbiBkb2N1bWVudCBmcm9tIHN0cmluZyBiZWNhdXNlOiAnICsgZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBteS5kb2M7XHJcbiAgICB9O1xyXG4gICAgXHJcbiAgICBmdW5jdGlvbiBpbml0ICgpIHtcclxuICAgICAgICB2YXIgZXFUZXN0O1xyXG4gICAgICAgIGF0cm9wYS5zdXBwb3J0Q2hlY2soJ0hUTUxQYXJzZXInKTtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBlcVRlc3QgPSBteS5sb2FkU3RyaW5nKFxyXG4gICAgICAgICAgICAgICAgJzxoZWFkPjwvaGVhZD48Ym9keT48cD50ZXN0PC9wPjwvYm9keT4nXHJcbiAgICAgICAgICAgICkuYm9keS50ZXh0Q29udGVudDtcclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIGF0cm9wYS5kYXRhLkhUTUxQYXJzZXIuc3VwcG9ydCA9ICd1bnN1cHBvcnRlZCc7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihhdHJvcGEuZGF0YS5IVE1MUGFyc2VyLmVycm9yICsgZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKCd0ZXN0JyAhPT0gZXFUZXN0KSB7XHJcbiAgICAgICAgICAgIGF0cm9wYS5kYXRhLkhUTUxQYXJzZXIuc3VwcG9ydCA9ICd1bnN1cHBvcnRlZCc7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihhdHJvcGEuZGF0YS5IVE1MUGFyc2VyLmVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbXkubmV3RG9jdW1lbnQoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgaW5pdCgpO1xyXG4gICAgXHJcbn07XHJcblxyXG5cclxuXHJcblxyXG53aGlsZShhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMubGVuZ3RoID4gMCkge1xyXG4gICAgYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLnBvcCgpKCk7XHJcbn1cclxubW9kdWxlLmV4cG9ydHMgPSBhdHJvcGE7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9kb2NzL3ZzZG9jL09wZW5MYXllcnNBbGwuanNcIi8+XHJcbnZhciBhdHJvcGEgPSByZXF1aXJlKCdhdHJvcGEtaGVhZGVyJyk7XHJcbmF0cm9wYS5BcmdzSW5mbyA9IHJlcXVpcmUoJ2F0cm9wYS1BcmdzSW5mbycpLkFyZ3NJbmZvO1xyXG4vKmpzbGludFxyXG4gICAgaW5kZW50OiA0LFxyXG4gICAgbWF4ZXJyOiA1MCxcclxuICAgIHdoaXRlOiB0cnVlLFxyXG4gICAgYnJvd3NlcjogdHJ1ZSxcclxuICAgIGRldmVsOiB0cnVlLFxyXG4gICAgcGx1c3BsdXM6IHRydWUsXHJcbiAgICByZWdleHA6IHRydWVcclxuKi9cclxuLypnbG9iYWwgYXRyb3BhICovXHJcbi8vIGVuZCBoZWFkZXJcclxuXHJcbihmdW5jdGlvbiAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIGF0cm9wYS5yZXF1aXJlcyhcclxuICAgICAgICAnUmVxdWVzdGVyJyxcclxuICAgICAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBzdXBwb3J0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgYXRyb3BhLkFyZ3NJbmZvLFxyXG4gICAgICAgICAgICAgICAgWE1MSHR0cFJlcXVlc3RcclxuICAgICAgICAgICAgXS5mb3JFYWNoKGZ1bmN0aW9uIChwcmVyZXF1aXNpdGUpIHtcclxuICAgICAgICAgICAgICAgIGlmKHByZXJlcXVpc2l0ZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3VwcG9ydGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gc3VwcG9ydGVkO1xyXG4gICAgICAgIH1cclxuICAgICk7XHJcbn0oKSk7XHJcblxyXG4vKipcclxuICogVGhpcyByZXByZXNlbnRzIGFuIFhNTEh0dHBSZXF1ZXN0LlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzAzMTFcclxuICogQGNsYXNzIFRoaXMgcmVwcmVzZW50cyBhbiBYTUxIdHRwUmVxdWVzdC5cclxuICogQHJldHVybnMge1JlcXVlc3Rlcn0gUmV0dXJucyBhIHJlcXVlc3RlciBvYmplY3QuXHJcbiAqIEByZXF1aXJlcyBhdHJvcGEuQXJnc0luZm8jY2hlY2tBcmdUeXBlc1xyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgcmVxdWVzdGVyLCBmb3JtRGF0YTtcclxuICogXHJcbiAqIHJlcXVlc3RlciA9IG5ldyBhdHJvcGEuUmVxdWVzdGVyKCk7XHJcbiAqIHJlcXVlc3Rlci50aW1lb3V0ID0gMTAwMDA7IC8vIHJlcXVlc3RzIHdpbGwgYWJvcnQgYWZ0ZXIgMTAgc2Vjb25kcy5cclxuICogcmVxdWVzdGVyLnJlcXVlc3RIZWFkZXJzID0ge1xyXG4gKiAgICAgXCJhSGVhZGVyXCIgOiBcImhlYWRlclZhbHVlXCIsXHJcbiAqICAgICBcImFub3RoZXJIZWFkZXJcIiA6IFwiYW5kVmFsdWVcIlxyXG4gKiB9O1xyXG4gKiBcclxuICogZnVuY3Rpb24gc2hvd1JlcXVlc3RSZXN1bHRzKHN0YXR1cywgcmVxdWVzdCkge1xyXG4gKiAgICAgY29uc29sZS5sb2coXCJTdGF0dXM6ICcgKyBzdGF0dXMpO1xyXG4gKiAgICAgY29uc29sZS5kaXIocmVxdWVzdCk7IC8vIGNvbnNvbGUgZGlyIG1heSBvciBtYXkgbm90XHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgLy8gYmUgc3VwcG9ydGVkIGluIHlvdXIgZW52aXJvbm1lbnQuXHJcbiAqIH1cclxuICogXHJcbiAqIGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XHJcbiAqIGZvcm1EYXRhLmFwcGVuZCgnYUZvcm1GaWVsZE5hbWUnLCAnZm9ybUZpZWxkRGF0YScpO1xyXG4gKiBmb3JtRGF0YS5hcHBlbmQoJ2Fub3RoZXJGb3JtRmllbGROYW1lJywgJ2FuZERhdGEnKTtcclxuICogXHJcbiAqIHJlcXVlc3Rlci5tYWtlUmVxdWVzdChcclxuICogICAgIFwicG9zdFwiLCBcImh0dHA6Ly9leGFtcGxlLmNvbVwiLCBmb3JtRGF0YSwgc2hvd1JlcXVlc3RSZXN1bHRzKTtcclxuICovXHJcbmF0cm9wYS5SZXF1ZXN0ZXIgPSBmdW5jdGlvbiBSZXF1ZXN0ZXIoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIGF0cm9wYS5zdXBwb3J0Q2hlY2soJ1JlcXVlc3RlcicpO1xyXG4gICAgdmFyIGV4cEFyZ1R5cGVzLFxyXG4gICAgICAgIGNoZWNrUmVxdWVzdCxcclxuICAgICAgICByZXF1ZXN0O1xyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIENvbnRhaW5lciBvYmplY3QgZm9yIHRoZSBleHBlY3RlZCBhcmd1bWVudCB0eXBlc1xyXG4gICAgICogc3VwcGxpZWQgdG8gdGhpcy5tYWtlUmVxdWVzdC5cclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAdHlwZSBFeHBlY3RlZCBBcmcgVHlwZXNcclxuICAgICAqIEBmaWVsZE9mIGF0cm9wYS5SZXF1ZXN0ZXItXHJcbiAgICAgKi9cclxuICAgIGV4cEFyZ1R5cGVzID0ge307XHJcbiAgICBleHBBcmdUeXBlcy5yZXF1ZXN0V2l0aE1lc3NhZ2UgPSBbJ3N0cmluZycsICdzdHJpbmcnLCAnc3RyaW5nJywgJ2Z1bmN0aW9uJ107XHJcbiAgICBleHBBcmdUeXBlcy5yZXF1ZXN0TnVsbE1lc3NhZ2UgPSBbJ3N0cmluZycsICdzdHJpbmcnLCAnb2JqZWN0JywgJ2Z1bmN0aW9uJ107XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogVXNlZCB0byBjaGVjayB0aGUgYXJndW1lbnRzIHR5cGVzIHN1cHBsaWVkIHRvIHRoaXMubWFrZVJlcXVlc3QuXHJcbiAgICAgKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICAgICAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gICAgICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gICAgICogQHZlcnNpb24gMjAxMjA5MDlcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWV0aG9kT2YgYXRyb3BhLlJlcXVlc3Rlci1cclxuICAgICAqIEBwYXJhbSB7QXJndW1lbnRzfSBhcmdzIEFuIGFyZ3VtZW50cyBhcnJheVxyXG4gICAgICogQHJldHVybnMge0Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiBhcmdzIHR5cGVzIG1hdGNoIHRoZVxyXG4gICAgICogZXhwZWN0ZWQgdHlwZXMuXHJcbiAgICAgKiBAcmVxdWlyZXMgYXRyb3BhLkFyZ3NJbmZvI2NoZWNrQXJnVHlwZXNcclxuICAgICAqL1xyXG4gICAgY2hlY2tSZXF1ZXN0ID0gZnVuY3Rpb24gKGFyZ3MpIHtcclxuICAgICAgICB2YXIgY2hlY2tlcjtcclxuICAgICAgICBjaGVja2VyID0gbmV3IGF0cm9wYS5BcmdzSW5mbygpO1xyXG4gICAgICAgIGNoZWNrZXIuc2V0RXhwZWN0ZWRBcmdUeXBlcyhleHBBcmdUeXBlcyk7XHJcbiAgICAgICAgcmV0dXJuIGNoZWNrZXIuY2hlY2tBcmdUeXBlcyhhcmdzKTtcclxuICAgIH07XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogT2JqZWN0IHdob3NlIHByb3BlcnRpZXMgYW5kIHZhbHVlcyBhcmUgaGVhZGVyIG5hbWVzIGFuZCB2YWx1ZXNcclxuICAgICAqICByZXNwZWN0aXZlbHkuXHJcbiAgICAgKiBAdHlwZSBPYmplY3RcclxuICAgICAqIEBmaWVsZE9mIGF0cm9wYS5SZXF1ZXN0ZXIjXHJcbiAgICAgKi9cclxuICAgIHRoaXMucmVxdWVzdEhlYWRlcnMgPSB7fTtcclxuICAgIFxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFNldCB0aGUgdGltZW91dCB2YWx1ZSBmb3IgdGhlIHJlcXVlc3QgaW4gbWlsbGlzZWNvbmRzLiBUaGUgcmVxdWVzdCB3aWxsXHJcbiAgICAgKiAgYWJvcnQgYWZ0ZXIgdGhpcyBhbW91bnQgb2YgdGltZSBoYXMgcGFzc2VkLlxyXG4gICAgICogQHR5cGUgTnVtYmVyXHJcbiAgICAgKiBAZmllbGRPZiBhdHJvcGEuUmVxdWVzdGVyI1xyXG4gICAgICovXHJcbiAgICB0aGlzLnRpbWVvdXQgPSAzMDAwMDtcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBYTUxIdHRwUmVxdWVzdCBvYmplY3QgdXNlZCBieSBSZXF1ZXN0ZXIuXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHR5cGUgWE1MSHR0cFJlcXVlc3RcclxuICAgICAqIEBmaWVsZE9mIGF0cm9wYS5SZXF1ZXN0ZXItXHJcbiAgICAgKi9cclxuICAgIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgIHJlcXVlc3QuYWJvcnRlZCA9IGZhbHNlO1xyXG4gICAgcmVxdWVzdC5hYm9ydCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJlcXVlc3QuYWJvcnRlZCA9IHRydWU7XHJcbiAgICAgICAgWE1MSHR0cFJlcXVlc3QucHJvdG90eXBlLmFib3J0LmNhbGwodGhpcyk7XHJcbiAgICB9O1xyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIE1ha2VzIGFuIEFKQVggcmVxdWVzdC5cclxuICAgICAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gICAgICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAgICAgKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAgICAgKiBAdmVyc2lvbiAyMDEzMDMxMVxyXG4gICAgICogQG1ldGhvZE9mIGF0cm9wYS5SZXF1ZXN0ZXIjXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbWV0aG9kIFRoZSBIVFRQIG1ldGhvZCB0byBiZSB1c2VkIGZvciB0aGlzIHJlcXVlc3QuXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdXJsIFRoZSBVUkwgdG8gc2VuZCB0aGUgcmVxdWVzdCB0by5cclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlQm9keSBUaGUgYm9keSBvZiB0aGUgcmVxdWVzdC5cclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjYWxsYmFjayBUaGUgY2FsbGJhY2sgZnVuY3Rpb24gdG8gZXhlY3V0ZVxyXG4gICAgICogIHdoZW4gcmVhZHlTdGF0ZSBpcyA0LiBUaGUgY2FsbGJhY2sgaXMgc3VwcGxpZWQgd2l0aCB0d28gYXJndW1lbnRzLiBUaGVcclxuICAgICAqICBmaXJzdCBhcmd1bWVudCBpcyBhIGJvb2xlYW4gaW5kaWNhdGluZyB3aGV0aGVyIG9yIG5vdCB0aGUgaHR0cCBzdGF0dXNcclxuICAgICAqICB3YXMgMjAwLiBUaGUgc2Vjb25kIGFyZ3VtZW50IGlzIHRoZSByZXF1ZXN0IG9iamVjdC5cclxuICAgICAqIEB0aHJvd3MgYXRyb3BhLlJlcXVlc3Rlci5tYWtlUmVxdWVzdCB1bmV4cGVjdGVkIGFyZ3VtZW50IHR5cGVcclxuICAgICAqL1xyXG4gICAgdGhpcy5tYWtlUmVxdWVzdCA9IGZ1bmN0aW9uIChtZXRob2QsIHVybCwgbWVzc2FnZUJvZHksIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgdmFyIGhkcjtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjaGVja1JlcXVlc3QoYXJndW1lbnRzKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignYXRyb3BhLlJlcXVlc3Rlci5tYWtlUmVxdWVzdCB1bmV4cGVjdGVkICcgK1xyXG4gICAgICAgICAgICAgICAgJ2FyZ3VtZW50IHR5cGUnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmVxdWVzdC5hYm9ydGVkID0gZmFsc2U7XHJcbiAgICAgICAgcmVxdWVzdC5vcGVuKG1ldGhvZCwgdXJsLCB0cnVlKTtcclxuICAgICAgICBmb3IgKGhkciBpbiB0aGlzLnJlcXVlc3RIZWFkZXJzKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnJlcXVlc3RIZWFkZXJzLmhhc093blByb3BlcnR5KGhkcikpIHtcclxuICAgICAgICAgICAgICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcihoZHIsIHRoaXMucmVxdWVzdEhlYWRlcnNbaGRyXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRXZlbnQgbGlzdGVuZXIgZnVuY3Rpb24gZm9yIHRoZSBBSkFYIHJlcXVlc3QuXHJcbiAgICAgICAgICogVGhpcyBpcyB3aGF0IGFjdHVhbGx5IGZpcmVzIHRoZSBjYWxsYmFjayBzdXBwbGllZFxyXG4gICAgICAgICAqIHRvIG1ha2VSZXF1ZXN0LlxyXG4gICAgICAgICAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gICAgICAgICAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gICAgICAgICAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICAgICAgICAgKiBAdmVyc2lvbiAyMDEyMDkwOVxyXG4gICAgICAgICAqIEBtZXRob2RPZiBhdHJvcGEuUmVxdWVzdGVyLXJlcXVlc3RcclxuICAgICAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAocmVxdWVzdC5yZWFkeVN0YXRlID09PSA0KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVxdWVzdC5zdGF0dXMgPT09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKHRydWUsIHJlcXVlc3QpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhmYWxzZSwgcmVxdWVzdCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHJlcXVlc3Quc2VuZChtZXNzYWdlQm9keSk7XHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChyZXF1ZXN0LmFib3J0ZWQgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICByZXF1ZXN0LmFib3J0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCB0aGlzLnRpbWVvdXQpO1xyXG4gICAgfTtcclxufTtcclxuXHJcblxyXG5cclxuXHJcbndoaWxlKGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5sZW5ndGggPiAwKSB7XHJcbiAgICBhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMucG9wKCkoKTtcclxufVxyXG5tb2R1bGUuZXhwb3J0cyA9IGF0cm9wYTtcclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2RvY3MvdnNkb2MvT3BlbkxheWVyc0FsbC5qc1wiLz5cclxudmFyIGF0cm9wYSA9IHJlcXVpcmUoJ2F0cm9wYS1oZWFkZXInKTtcclxuLypqc2xpbnQgXHJcbiAgICBpbmRlbnQ6IDQsXHJcbiAgICBtYXhlcnI6IDUwLFxyXG4gICAgd2hpdGU6IHRydWUsXHJcbiAgICBicm93c2VyOiB0cnVlLFxyXG4gICAgZGV2ZWw6IHRydWUsXHJcbiAgICBwbHVzcGx1czogdHJ1ZSxcclxuICAgIHJlZ2V4cDogdHJ1ZVxyXG4qL1xyXG4vKmdsb2JhbCBhdHJvcGEgKi9cclxuLy8gZW5kIGhlYWRlclxyXG5cclxuLyoqXHJcbiAqIEEgcG9sbGluZyBjbGFzcyBkZXNpZ25lZCBmb3IgZXhlY3V0aW5nIGxvbmcgcnVubmluZyBwcm9jZXNzZXMgdGhhdCByZXR1cm5cclxuICogIG5vdGhpbmcgYW5kIGhhdmUgbm8gY2FsbGJhY2sgcGFyYW1ldGVyLlxyXG4gKiBAY2xhc3MgQSBwb2xsaW5nIGNsYXNzIGRlc2lnbmVkIGZvciBleGVjdXRpbmcgbG9uZyBydW5uaW5nIHByb2Nlc3NlcyB0aGF0XHJcbiAqICByZXR1cm4gbm90aGluZyBhbmQgaGF2ZSBubyBjYWxsYmFjayBwYXJhbWV0ZXIuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDIyMFxyXG4gKiBAcGFyYW0ge1N0cmluZ30gYWN0b3JOYW1lIFRoZSBuYW1lIGZvciB0aGUgU2VyaWFsQWN0b3IgaW5zdGFuY2UuXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGFjdG9yRnVuY3Rpb24gVGhlIGZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGVcclxuICogIFNlcmlhbEFjdG9yIGlzIGZyZWUuIFRoaXMgZnVuY3Rpb24gbXVzdCBjYWxsIHRoZSA8Y29kZT5mcmVlPC9jb2RlPiBmdW5jdGlvblxyXG4gKiAgd2hlbiBpdCBpcyBmaW5pc2hlZCBpbiBvcmRlciB0byBhbGxvdyB0aGUgYWN0b3IgdG8gY29udGludWUuXHJcbiAqIEByZXR1cm5zIHthdHJvcGEuU2VyaWFsQWN0b3J9IFJldHVybnMgYW4gPGNvZGU+YXRyb3BhLlNlcmlhbEFjdG9yPC9jb2RlPlxyXG4gKiAgaW5zdGFuY2UuXHJcbiAqIEBleGFtcGxlXHJcbiAqIGZ1bmN0aW9uIGR1bW15QWN0b3IoKXtcclxuICogICAgIHZhciB0aGF0ID0gdGhpcztcclxuICogICAgIGNvbnNvbGUubG9nKCdhY3RvckZ1bmN0aW9uIHdvdWxkIGV4ZWN1dGUnKTtcclxuICogICAgIGNvbnNvbGUubG9nKCdmcmVlaW5nICcgKyB0aGlzLm5hbWUgKyAnIGluIDEwMDAwIG1zJyk7XHJcbiAqICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7dGhhdC5mcmVlKCk7fSwgMTAwMDApO1xyXG4gKiB9O1xyXG4gKiB2YXIgYWN0b3IgPSBuZXcgYXRyb3BhLlNlcmlhbEFjdG9yKCdkdW1teScsIGR1bW15QWN0b3IpO1xyXG4gKiAgICAgLy8gY2hhbmdlIHRoZSBuYW1lIG9mIHRoZSBhY3RvciBmcm9tXHJcbiAqICAgICAvLyBkdW1teSB0byBhd2Vzb21lXHJcbiAqIGFjdG9yLm5hbWUgPSBcImF3ZXNvbWVcIjtcclxuICogICAgIC8vIHNldCB0aGUgcG9sbGluZyBpbnRlcnZhbCAobWlsbGlzZWNvbmRzKVxyXG4gKiBhY3Rvci5pbnRlcnZhbCA9IDMwMDA7XHJcbiAqICAgICAvLyBzZXQgdGhlIGJsb2NraW5nIHRpbWVvdXQgdmFsdWUgKG1pbGxpc2Vjb25kcylcclxuICogYWN0b3IuYmxvY2tUaW1lb3V0VmFsdWUgPSAxMjAwMDA7XHJcbiAqICAgICAvLyBzdGFydCBwb2xsaW5nXHJcbiAqIGFjdG9yLnN0YXJ0KCk7XHJcbiAqICAgICAvLyBkeW5hbWljYWxseSBjaGFuZ2UgdGhlIFNlcmlhbEFjdG9yXHJcbiAqIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICogICAgIC8vIGNoYW5nZSB0aGUgcG9sbGluZyBpbnRlcnZhbFxyXG4gKiAgICAgLy8gd2hpbGUgdGhlIFNlcmlhbEFjdG9yIGlzIHJ1bm5pbmcuXHJcbiAqICAgICBhY3Rvci5jaGFuZ2VJbnRlcnZhbCgyMDAwKTtcclxuICogICAgICAgICAvLyBjaGFuZ2UgdGhlIGFjdG9yIGZ1bmN0aW9uXHJcbiAqICAgICBhY3Rvci5hY3RvckZ1bmN0aW9uID0gZnVuY3Rpb24oKSB7XHJcbiAqICAgICAgICAgY29uc29sZS5sb2coJ25ldyBhY3RvckZ1bmN0aW9uIGV4ZWN1dGluZycpO1xyXG4gKiAgICAgICAgIGNvbnNvbGUubG9nKCdmcmVlaW5nICcgKyB0aGlzLm5hbWUgKyAnIGltbWVkaWF0ZWx5Jyk7XHJcbiAqICAgICAgICAgdGhpcy5mcmVlKCk7XHJcbiAqICAgICB9O1xyXG4gKiB9LDEwMDAwKTtcclxuICovXHJcbmF0cm9wYS5TZXJpYWxBY3RvciA9IGZ1bmN0aW9uKGFjdG9yTmFtZSwgYWN0b3JGdW5jdGlvbikge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICB2YXIgdGhhdCwgZHVtbXlBY3RvcjtcclxuICAgIC8qKlxyXG4gICAgICogUmVmZXJlbmNlIHRvIDxjb2RlPnRoaXM8L2NvZGU+XHJcbiAgICAgKiBAZmllbGRPZiBhdHJvcGEuU2VyaWFsQWN0b3ItXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHR5cGUge09iamVjdH1cclxuICAgICAqL1xyXG4gICAgdGhhdCA9IHRoaXM7XHJcbiAgICAvKipcclxuICAgICAqIERlZmF1bHQgYWN0b3JGdW5jdGlvblxyXG4gICAgICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAgICAgKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICAgICAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICAgICAqIEB2ZXJzaW9uIDIwMTMwMjIwXHJcbiAgICAgKiBAbWV0aG9kT2YgYXRyb3BhLlNlcmlhbEFjdG9yLVxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBzZWUgYXRyb3BhLlNlcmlhbEFjdG9yI2FjdG9yRnVuY3Rpb25cclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiBkdW1teUFjdG9yID0gZnVuY3Rpb24oKXtcclxuICAgICAqICAgICBjb25zb2xlLmxvZygnYWN0b3JGdW5jdGlvbiB3b3VsZCBleGVjdXRlJyk7XHJcbiAgICAgKiAgICAgY29uc29sZS5sb2coJ2ZyZWVpbmcgU2VyaWFsIEFjdG9yIGluIDEwMDAwIG1zJyk7XHJcbiAgICAgKiAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe3RoYXQuZnJlZSgpO30sIDEwMDAwKTtcclxuICAgICAqIH07XHJcbiAgICAgKi9cclxuICAgIGR1bW15QWN0b3IgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdhY3RvckZ1bmN0aW9uIHdvdWxkIGV4ZWN1dGUnKTtcclxuICAgICAgICBjb25zb2xlLmxvZygnZnJlZWluZyBTZXJpYWwgQWN0b3IgaW4gMTAwMDAgbXMnKTtcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7dGhhdC5mcmVlKCk7fSwgMTAwMDApO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogVGhlIG5hbWUgb2YgdGhpcyBpbnN0YW5jZS4gRGVmYXVsdHMgdG8gXCJTZXJpYWxBY3RvclwiXHJcbiAgICAgKiBAZmllbGRPZiBhdHJvcGEuU2VyaWFsQWN0b3IjXHJcbiAgICAgKiBAdHlwZSBTdHJpbmdcclxuICAgICAqIEBkZWZhdWx0IFwiU2VyaWFsQWN0b3JcIlxyXG4gICAgICovXHJcbiAgICB0aGlzLm5hbWUgPSBhdHJvcGEuc2V0QXNPcHRpb25hbEFyZygnU2VyaWFsQWN0b3InLCBhY3Rvck5hbWUpO1xyXG4gICAgLyoqXHJcbiAgICAgKiBQb2xsaW5nIGludGVydmFsIGluIG1pbGxpc2Vjb25kcy4gVGhpcyBkZXRlcm1pbmVzIGhvdyBmcmVxdWVudGx5IHRoZVxyXG4gICAgICogIGFjdG9yIGZ1bmN0aW9uIHdpbGwgdHJ5IHRvIGV4ZWN1dGUuIERlZmF1bHRzIHRvIDEwMCBtaWxsaXNlY29uZHMuXHJcbiAgICAgKiBAZmllbGRPZiBhdHJvcGEuU2VyaWFsQWN0b3IjXHJcbiAgICAgKiBAdHlwZSBOdW1iZXJcclxuICAgICAqIEBkZWZhdWx0IDEwMFxyXG4gICAgICovXHJcbiAgICB0aGlzLmludGVydmFsID0gMTAwOyAvLyBtaWxsaXNlY29uZHNcclxuICAgIC8qKlxyXG4gICAgICogVGhlIGlkIG9mIHRoZSBpbnRlcnZhbCBzZXQgdG8gcG9sbCB0aGUgYWN0b3IuIFlvdSBzaG91bGQgbm90IGNoYW5nZVxyXG4gICAgICogIHRoaXMgbWFudWFsbHksIHVzZSB0aGUgc3RhcnQgYW5kIHN0b3AgZnVuY3Rpb25zIGluc3RlYWQuIERlZmF1bHMgdG9cclxuICAgICAqICB1bmRlZmluZWQuXHJcbiAgICAgKiBAZmllbGRPZiBhdHJvcGEuU2VyaWFsQWN0b3IjXHJcbiAgICAgKiBAdHlwZSBOdW1iZXJcclxuICAgICAqIEBkZWZhdWx0IHVuZGVmaW5lZFxyXG4gICAgICovXHJcbiAgICB0aGlzLmludGVydmFsSWQgPSB1bmRlZmluZWQ7XHJcbiAgICAvKipcclxuICAgICAqIFRoZSBzdGF0ZSBvZiB0aGUgU2VyaWFsQWN0b3IuIElmIHRydWUsIHRoZSBhY3RvciB3aWxsIHNsZWVwLiBJZiBmYWxzZSB0aGVcclxuICAgICAqICBhY3RvciB3aWxsIGV4ZWN1dGUgdGhlIGFjdG9yIGZ1bmN0aW9uIHdoZW4gbmV4dCBwb2xsZWQuIERlZmF1bHRzIHRvXHJcbiAgICAgKiAgZmFsc2UuXHJcbiAgICAgKiBAZmllbGRPZiBhdHJvcGEuU2VyaWFsQWN0b3IjXHJcbiAgICAgKiBAdHlwZSBCb29sZWFuXHJcbiAgICAgKiBAZGVmYXVsdCBmYWxzZVxyXG4gICAgICovXHJcbiAgICB0aGlzLmJsb2NrZWQgPSBmYWxzZTtcclxuICAgIC8qKlxyXG4gICAgICogU3RvcmVzIGlkJ3Mgb2YgY3VycmVudGx5IHJ1bm5pbmcgdGltZW91dCBmdW5jdGlvbnMgdXNlZCB0byBmcmVlIHRoZSBhY3RvclxyXG4gICAgICogIGlmIGl0IGhhcyBiZWVuIGJsb2NrZWQgZm9yIHRvbyBsb25nLlxyXG4gICAgICogQGZpZWxkT2YgYXRyb3BhLlNlcmlhbEFjdG9yI1xyXG4gICAgICogQHNlZSBhdHJvcGEuU2VyaWFsQWN0b3IjYmxvY2tUaW1lb3V0VmFsdWVcclxuICAgICAqIEB0eXBlIEFycmF5XHJcbiAgICAgKiBAZGVmYXVsdCBbXVxyXG4gICAgICovXHJcbiAgICB0aGlzLnRpbWVvdXRzID0gW107XHJcbiAgICAvKipcclxuICAgICAqIFRoZSBtYXhpbXVtIHRpbWUsIGluIG1pbGxpc2Vjb25kcywgd2hpY2ggdGhlIGFjdG9yIG1heSBiZSBibG9ja2VkIGZvci5cclxuICAgICAqICBBZnRlciB0aGlzIGR1cmF0aW9uIGhhcyBiZWVuIHJlYWNoZWQgdGhlIGFjdG9yIHdpbGwgYmUgZnJlZWQuIERlZmF1bHRzXHJcbiAgICAgKiAgdG8gNjAgc2Vjb25kcy5cclxuICAgICAqIEBmaWVsZE9mIGF0cm9wYS5TZXJpYWxBY3RvciNcclxuICAgICAqIEB0eXBlIE51bWJlclxyXG4gICAgICogQGRlZmF1bHQgNjAwMDBcclxuICAgICAqL1xyXG4gICAgdGhpcy5ibG9ja1RpbWVvdXRWYWx1ZSA9IDYwMDAwO1xyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgZnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBTZXJpYWxBY3RvciBpcyBmcmVlLiBUaGlzIGZ1bmN0aW9uXHJcbiAgICAgKiAgbXVzdCBjYWxsIHRoZSA8Y29kZT5mcmVlPC9jb2RlPiBmdW5jdGlvbiB3aGVuIGl0IGlzIGZpbmlzaGVkIGluIG9yZGVyIHRvXHJcbiAgICAgKiAgYWxsb3cgdGhlIGFjdG9yIHRvIGNvbnRpbnVlLiBEZWZhdWx0cyB0byB0aGUgPGNvZGU+ZHVtbXlBY3RvcjwvY29kZT5cclxuICAgICAqICBmdW5jdGlvbi5cclxuICAgICAqIEBmaWVsZE9mIGF0cm9wYS5TZXJpYWxBY3RvciNcclxuICAgICAqIEB0eXBlIEZ1bmN0aW9uXHJcbiAgICAgKiBAZGVmYXVsdCBkdW1teUFjdG9yXHJcbiAgICAgKiBAc2VlIGF0cm9wYS5TZXJpYWxBY3Rvci1kdW1teUFjdG9yXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogZHVtbXlBY3RvciA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgKiAgICAgY29uc29sZS5sb2coJ2FjdG9yRnVuY3Rpb24gd291bGQgZXhlY3V0ZScpO1xyXG4gICAgICogICAgIGNvbnNvbGUubG9nKCdmcmVlaW5nIFNlcmlhbCBBY3RvciBpbiAxMDAwMCBtcycpO1xyXG4gICAgICogICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXt0aGF0LmZyZWUoKTt9LCAxMDAwMCk7XHJcbiAgICAgKiB9O1xyXG4gICAgICovXHJcbiAgICB0aGlzLmFjdG9yRnVuY3Rpb24gPSBhdHJvcGEuc2V0QXNPcHRpb25hbEFyZyhkdW1teUFjdG9yLCBhY3RvckZ1bmN0aW9uKTtcclxuICAgIC8qKlxyXG4gICAgICogVGhlIGFjdGlvbiBmdW5jdGlvbiBpcyBjYWxsZWQgd2hlbiB0aGUgYWN0b3IgaXMgcG9sbGVkIGFuZCBpdCdzIGJsb2NrZWRcclxuICAgICAqICBzdGF0ZSBpcyBmYWxzZS4gVGhpcyBtZXRob2Qgc2hvdWxkIG5vdCBiZSBzZXQgb3IgY2FsbGVkIG1hbnVhbGx5LCBzZXRcclxuICAgICAqICB0aGUgPGNvZGU+YWN0b3JGdW5jdGlvbjwvY29kZT4gaW5zdGVhZC5cclxuICAgICAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gICAgICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAgICAgKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAgICAgKiBAdmVyc2lvbiAyMDEzMDIyMFxyXG4gICAgICogQG1ldGhvZE9mIGF0cm9wYS5TZXJpYWxBY3RvciNcclxuICAgICAqIEBzZWUgYXRyb3BhLlNlcmlhbEFjdG9yI2FjdG9yRnVuY3Rpb25cclxuICAgICAqL1xyXG4gICAgdGhpcy5hY3Rpb24gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZihmYWxzZSA9PT0gdGhhdC5ibG9ja2VkKSB7XHJcbiAgICAgICAgICAgIHRoYXQuYmxvY2soKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuYWN0b3JGdW5jdGlvbigpO1xyXG4gICAgICAgICAgICB9LCAxMCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codGhhdC5uYW1lICsgJyBzbGVlcGluZyBmb3IgJyArIHRoYXQuaW50ZXJ2YWwgKyAnIG1zJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufTtcclxuLyoqXHJcbiAqIFByZXZlbnRzIHRoZSBhY3RvciBmcm9tIGV4ZWN1dGluZyBpdCdzIGFjdG9yRnVuY3Rpb24uIFRoaXMgYmxvY2sgd2lsbCB0aW1lb3V0XHJcbiAqICBvbmNlIHRoZSA8Y29kZT5ibG9ja1RpbWVvdXRWYWx1ZTwvY29kZT4gaGFzIGJlZW4gcmVhY2hlZC5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwMjIwXHJcbiAqIEBtZXRob2RPZiBhdHJvcGEuU2VyaWFsQWN0b3IjXHJcbiAqIEByZXR1cm5zIHtCb29sZWFufSBSZXR1cm5zIHRoZSB2YWx1ZSBvZiB0aGlzIGluc3RhbmNlcyA8Y29kZT5ibG9ja2VkPC9jb2RlPlxyXG4gKiAgcHJvcGVydHkuXHJcbiAqIEBzZWUgYXRyb3BhLlNlcmlhbEFjdG9yI2Jsb2NrZWRcclxuICogQGV4YW1wbGVcclxuICogZnVuY3Rpb24gZCgpIHtcclxuICogICAgIGNvbnNvbGUubG9nKCdkb2luZyBzdHVmZiB0byB0aGluZ3MnKTtcclxuICogICAgIHRoaXMuZnJlZSgpO1xyXG4gKiB9XHJcbiAqIFxyXG4gKiB2YXIgYWN0b3IgPSBuZXcgYXRyb3BhLlNlcmlhbEFjdG9yKCdkdW1teScsIGQpO1xyXG4gKiBhY3Rvci5pbnRlcnZhbCA9IDIwMDA7XHJcbiAqIGFjdG9yLmJsb2NrVGltZW91dFZhbHVlID0gNTAwMDtcclxuICogYWN0b3Iuc3RhcnQoKTtcclxuICogLy8gNSBzZWNvbmRzIGFmdGVyIHN0YXJ0aW5nIHRoZSBhY3RvciB3aWxsIGJlIGJsb2NrZWQuXHJcbiAqIC8vIEl0IHdpbGwgcmVtYWluIGJsb2NrZWQgdW50aWwgdGhlIGJsb2NrIHRpbWVvdXQgaXMgcmVhY2hlZC5cclxuICogc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICogICAgIGNvbnNvbGUubG9nKCdibG9ja2luZyEhIScpO1xyXG4gKiAgICAgYWN0b3IuYmxvY2soKTtcclxuICogfSwgNTAwMCk7XHJcbiAqL1xyXG5hdHJvcGEuU2VyaWFsQWN0b3IucHJvdG90eXBlLmJsb2NrID0gZnVuY3Rpb24oKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgIGNvbnNvbGUubG9nKHRoaXMubmFtZSArICcgYmxvY2snKTtcclxuICAgIHRoaXMuYmxvY2tlZCA9IHRydWU7XHJcbiAgICB0aGlzLnRpbWVvdXRzLnB1c2goXHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHt0aGF0LmJsb2NrVGltZW91dCgpO30sIHRoYXQuYmxvY2tUaW1lb3V0VmFsdWUpKTtcclxuICAgIHJldHVybiB0aGlzLmJsb2NrZWQ7XHJcbn07XHJcbi8qKlxyXG4gKiBDYWxsZWQgd2hlbiB0aGUgPGNvZGU+YmxvY2tUaW1lb3V0VmFsdWU8L2NvZGU+IGhhcyBiZWVuIHJlYWNoZWQuIFRoaXMgZnJlZXNcclxuICogIHRoZSBhY3RvciBhbmQgcmVtb3ZlcyB0aGUgdGltZW91dCByZWZlcmVuY2UgZnJvbSB0aGUgdGltZW91dHMgYXJyYXkuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDIyMFxyXG4gKiBAbWV0aG9kT2YgYXRyb3BhLlNlcmlhbEFjdG9yI1xyXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gUmV0dXJucyB0aGUgdmFsdWUgb2YgdGhpcyBpbnN0YW5jZXMgPGNvZGU+YmxvY2tlZDwvY29kZT5cclxuICogIHByb3BlcnR5LlxyXG4gKiBAc2VlIGF0cm9wYS5TZXJpYWxBY3RvciNibG9ja2VkXHJcbiAqL1xyXG5hdHJvcGEuU2VyaWFsQWN0b3IucHJvdG90eXBlLmJsb2NrVGltZW91dCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICBjb25zb2xlLmxvZyh0aGlzLm5hbWUgKyAnIGJsb2NrIHRpbWVvdXQnKTtcclxuICAgIHJldHVybiB0aGlzLmZyZWUoKTtcclxufTtcclxuLyoqXHJcbiAqIEZyZWVzIHRoZSBhY3RvciBzbyBpdCBtYXkgZXhlY3V0ZSBpdHMgYWN0b3IgZnVuY3Rpb24gd2hlbiBuZXh0IHBvbGxlZC5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwMjIwXHJcbiAqIEBtZXRob2RPZiBhdHJvcGEuU2VyaWFsQWN0b3IjXHJcbiAqIEByZXR1cm5zIHtCb29sZWFufSBSZXR1cm5zIHRoZSB2YWx1ZSBvZiB0aGlzIGluc3RhbmNlcyA8Y29kZT5ibG9ja2VkPC9jb2RlPlxyXG4gKiAgcHJvcGVydHkuXHJcbiAqIEBzZWUgYXRyb3BhLlNlcmlhbEFjdG9yI2Jsb2NrZWRcclxuICogQGV4YW1wbGVcclxuICogZnVuY3Rpb24gZCgpIHtcclxuICogICAgIGNvbnNvbGUubG9nKCdkb2luZyBzdHVmZiB0byB0aGluZ3MnKTtcclxuICogICAgIHRoaXMuZnJlZSgpO1xyXG4gKiB9XHJcbiAqIFxyXG4gKiB2YXIgYWN0b3IgPSBuZXcgYXRyb3BhLlNlcmlhbEFjdG9yKCdkdW1teScsIGQpO1xyXG4gKiBhY3Rvci5pbnRlcnZhbCA9IDIwMDA7XHJcbiAqIGFjdG9yLmJsb2NrVGltZW91dFZhbHVlID0gNTAwMDA7XHJcbiAqIGFjdG9yLnN0YXJ0KCk7XHJcbiAqIGFjdG9yLmJsb2NrKCk7XHJcbiAqIC8vIDUgc2Vjb25kcyBhZnRlciBzdGFydGluZyB0aGUgYWN0b3Igd2lsbCBiZSBmcmVlZC5cclxuICogc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICogICAgIGFjdG9yLmZyZWUoKTtcclxuICogfSwgNTAwMCk7XHJcbiAqL1xyXG5hdHJvcGEuU2VyaWFsQWN0b3IucHJvdG90eXBlLmZyZWUgPSBmdW5jdGlvbigpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgY29uc29sZS5sb2codGhpcy5uYW1lICsgJyBmcmVlJyk7XHJcbiAgICB0aGlzLmJsb2NrZWQgPSBmYWxzZTtcclxuICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXRzLnNoaWZ0KCkpO1xyXG4gICAgcmV0dXJuIHRoaXMuYmxvY2tlZDtcclxufTtcclxuLyoqXHJcbiAqIFN0YXJ0cyBwb2xsaW5nIHRoZSBhY3Rvci5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwMjIwXHJcbiAqIEBtZXRob2RPZiBhdHJvcGEuU2VyaWFsQWN0b3IjXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBpbnRlcnZhbCBPcHRpb25hbC4gVGhlIHBvbGxpbmcgaW50ZXJ2YWwuIERlZmF1bHRzIHRvIHRoZVxyXG4gKiAgdmFsdWUgb2YgPGNvZGU+dGhpcy5pbnRlcnZhbDwvY29kZT5cclxuICogQHNlZSBhdHJvcGEuU2VyaWFsQWN0b3IjaW50ZXJ2YWxcclxuICogQHJldHVybnMge051bWJlcn0gUmV0dXJucyB0aGUgdmFsdWUgb2YgdGhpcyBpbnN0YW5jZSdzXHJcbiAqICA8Y29kZT5pbnRlcnZhbElkPC9jb2RlPiBwcm9wZXJ0eS5cclxuICogQHNlZSBhdHJvcGEuU2VyaWFsQWN0b3IjaW50ZXJ2YWxJZFxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgYWN0b3IgPSBuZXcgYXRyb3BhLlNlcmlhbEFjdG9yKCdkdW1teScpO1xyXG4gKiBhY3Rvci5zdGFydCgpO1xyXG4gKi9cclxuYXRyb3BhLlNlcmlhbEFjdG9yLnByb3RvdHlwZS5zdGFydCA9IGZ1bmN0aW9uKGludGVydmFsKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgIHRoaXMuaW50ZXJ2YWwgPSBhdHJvcGEuc2V0QXNPcHRpb25hbEFyZyh0aGlzLmludGVydmFsLCBpbnRlcnZhbCk7XHJcbiAgICBcclxuICAgIGlmKHRoaXMuaW50ZXJ2YWxJZCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgLy8gY2xlYXIgdGhlIG9sZCB0aW1lb3V0IGJlZm9yZSBjcmVhdGluZyBhIG5ldyBvbmUuXHJcbiAgICAgICAgdGhpcy5zdG9wKCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmludGVydmFsSWQgPSBzZXRJbnRlcnZhbCh0aGF0LmFjdGlvbiwgdGhhdC5pbnRlcnZhbCk7XHJcbiAgICBjb25zb2xlLmxvZyh0aGlzLm5hbWUgKyAnIHN0YXJ0ZWQnKTtcclxuICAgIHJldHVybiB0aGlzLmludGVydmFsSWQ7XHJcbn07XHJcbi8qKlxyXG4gKiBBZGp1c3RzIHRoZSBwb2xsaW5nIGludGVydmFsIGFmdGVyIDxjb2RlPnN0YXJ0PC9jb2RlPiBoYXNcclxuICogYmVlbiBjYWxsZWQuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDIyMFxyXG4gKiBAbWV0aG9kT2YgYXRyb3BhLlNlcmlhbEFjdG9yI1xyXG4gKiBAcGFyYW0ge051bWJlcn0gaW50ZXJ2YWwgVGhlIG5ldyBwb2xsaW5nIGludGVydmFsIGluIG1pbGxpc2Vjb25kcy5cclxuICogQHJldHVybnMge051bWJlcn0gUmV0dXJucyB0aGUgdmFsdWUgb2YgdGhpcyBpbnN0YW5jZSdzIFxyXG4gKiAgPGNvZGU+aW50ZXJ2YWxJZDwvY29kZT4gcHJvcGVydHkuXHJcbiAqIEBzZWUgYXRyb3BhLlNlcmlhbEFjdG9yI2ludGVydmFsSWRcclxuICogQGV4YW1wbGVcclxuICogdmFyIGFjdG9yID0gbmV3IGF0cm9wYS5TZXJpYWxBY3RvcignZHVtbXknKTtcclxuICogYWN0b3Iuc3RhcnQoKTtcclxuICogICAgIC8vIDUgc2Vjb25kcyBhZnRlciBzdGFydGluZyB0aGUgcG9sbGluZyBpbnRlcnZhbCB3aWxsIGJlIGNoYW5nZWQuXHJcbiAqIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICogICAgIGFjdG9yLmNoYW5nZUludGVydmFsKDIwMDApO1xyXG4gKiB9LCA1MDAwKTtcclxuICovXHJcbmF0cm9wYS5TZXJpYWxBY3Rvci5wcm90b3R5cGUuY2hhbmdlSW50ZXJ2YWwgPSBmdW5jdGlvbihpbnRlcnZhbCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICBjb25zb2xlLmxvZyh0aGlzLm5hbWUgKyAnIGNoYW5naW5nIGludGVydmFsJyk7XHJcbiAgICByZXR1cm4gdGhpcy5zdGFydChpbnRlcnZhbCk7XHJcbn07XHJcbi8qKlxyXG4gKiBTdG9wcyBwb2xsaW5nIHRoZSBhY3Rvci4gTm90ZSB0aGF0IHRoZSBhY3RvciB3aWxsIGJlIGZyZWVkIG9uY2UgdGhlXHJcbiAqICA8Y29kZT5ibG9ja1RpbWVvdXRWYWx1ZTwvY29kZT4gaGFzIGJlZW4gcmVhY2hlZC4gVGhpcyB3aWxsIG5vdCByZXN0YXJ0IHRoZVxyXG4gKiAgcG9sbGluZy5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwMjIwXHJcbiAqIEBtZXRob2RPZiBhdHJvcGEuU2VyaWFsQWN0b3IjXHJcbiAqIEBzZWUgYXRyb3BhLlNlcmlhbEFjdG9yI2Jsb2NrZWRcclxuICogQHNlZSBhdHJvcGEuU2VyaWFsQWN0b3IjYmxvY2tUaW1lb3V0VmFsdWVcclxuICogQGV4YW1wbGVcclxuICogdmFyIGFjdG9yID0gbmV3IGF0cm9wYS5TZXJpYWxBY3RvcignZHVtbXknKTtcclxuICogYWN0b3Iuc3RhcnQoKTtcclxuICogICAgIC8vIDUgc2Vjb25kcyBhZnRlciBzdGFydGluZyB0aGUgYWN0b3Igd2lsbCBiZSBzdG9wcGVkLlxyXG4gKiBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAqICAgICBhY3Rvci5zdG9wKCk7XHJcbiAqIH0sIDUwMDApO1xyXG4gKi9cclxuYXRyb3BhLlNlcmlhbEFjdG9yLnByb3RvdHlwZS5zdG9wID0gZnVuY3Rpb24oKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbElkKTtcclxuICAgIHRoaXMuaW50ZXJ2YWxJZCA9IHVuZGVmaW5lZDtcclxuICAgIGNvbnNvbGUubG9nKHRoaXMubmFtZSArICcgc3RvcHBlZCcpO1xyXG59O1xyXG5cclxuXHJcblxyXG5cclxud2hpbGUoYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLmxlbmd0aCA+IDApIHtcclxuICAgIGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5wb3AoKSgpO1xyXG59XHJcbm1vZHVsZS5leHBvcnRzID0gYXRyb3BhO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vZG9jcy92c2RvYy9PcGVuTGF5ZXJzQWxsLmpzXCIvPlxyXG52YXIgYXRyb3BhID0gcmVxdWlyZSgnYXRyb3BhLWhlYWRlcicpO1xyXG5hdHJvcGEuc3RyaW5nID0gcmVxdWlyZSgnYXRyb3BhLXN0cmluZycpLnN0cmluZztcclxuYXRyb3BhLmFycmF5cyA9IHJlcXVpcmUoJ2F0cm9wYS1hcnJheXMnKS5hcnJheXM7XHJcbmF0cm9wYS5zZXRBc09wdGlvbmFsQXJnID0gcmVxdWlyZSgnYXRyb3BhLXNldEFzT3B0aW9uYWxBcmcnKS5zZXRBc09wdGlvbmFsQXJnO1xyXG4vKmpzbGludFxyXG4gICAgaW5kZW50OiA0LFxyXG4gICAgbWF4ZXJyOiA1MCxcclxuICAgIHdoaXRlOiB0cnVlLFxyXG4gICAgYnJvd3NlcjogdHJ1ZSxcclxuICAgIGRldmVsOiB0cnVlLFxyXG4gICAgcGx1c3BsdXM6IHRydWUsXHJcbiAgICByZWdleHA6IHRydWUsXHJcbiAgICB2YXJzOiB0cnVlXHJcbiovXHJcbi8qZ2xvYmFsIGF0cm9wYSAqL1xyXG4vLyBlbmQgaGVhZGVyXHJcblxyXG4oZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICBhdHJvcGEucmVxdWlyZXMoXHJcbiAgICAgICAgJ1RleHRBbmFseXplcicsXHJcbiAgICAgICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgc3VwcG9ydGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgIGF0cm9wYS5zdHJpbmcsXHJcbiAgICAgICAgICAgICAgICBhdHJvcGEuYXJyYXlzLFxyXG4gICAgICAgICAgICAgICAgYXRyb3BhLnNldEFzT3B0aW9uYWxBcmdcclxuICAgICAgICAgICAgXS5mb3JFYWNoKGZ1bmN0aW9uIChwcmVyZXF1aXNpdGUpIHtcclxuICAgICAgICAgICAgICAgIGlmKHByZXJlcXVpc2l0ZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3VwcG9ydGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gc3VwcG9ydGVkO1xyXG4gICAgICAgIH1cclxuICAgICk7XHJcbn0oKSk7XHJcblxyXG4vKipcclxuICogUmVwcmVzZW50cyBhIHV0aWxpdHkgZm9yIGFuYWx5emluZyB0ZXh0LlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzAzMTFcclxuICogQGNsYXNzIFJlcHJlc2VudHMgYSB1dGlsaXR5IGZvciBhbmFseXppbmcgdGV4dC5cclxuICogQHBhcmFtIHtTdHJpbmd9IHRleHQgVGhlIHRleHQgdG8gYW5hbHl6ZS5cclxuICogQHJldHVybnMge1RleHRBbmFseXplcn0gUmV0dXJucyBhbiBpbnN0YW5jZSBvZiB0aGUgdGV4dCBhbmFseXplci5cclxuICogQHJlcXVpcmVzIGF0cm9wYS5zdHJpbmdcclxuICogQHJlcXVpcmVzIGF0cm9wYS5hcnJheXNcclxuICogQHJlcXVpcmVzIGF0cm9wYS5zZXRBc09wdGlvbmFsQXJnXHJcbiAqL1xyXG5hdHJvcGEuVGV4dEFuYWx5emVyID0gZnVuY3Rpb24gVGV4dEFuYWx5emVyKHRleHQpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgdmFyIGNvbnN0cnVjdDtcclxuICAgIC8qKlxyXG4gICAgKiBUaGUgc3VwcGxpZWQgdGV4dC4gRGVmYXVsdHMgdG8gYW4gZW1wdHkgc3RyaW5nLlxyXG4gICAgKiBAdHlwZSBTdHJpbmdcclxuICAgICogQGZpZWxkT2YgYXRyb3BhLlRleHRBbmFseXplciNcclxuICAgICovXHJcbiAgICB0aGlzLnRleHQgPSBTdHJpbmcoYXRyb3BhLnNldEFzT3B0aW9uYWxBcmcoJycsIHRleHQpKTtcclxuICAgIC8qKlxyXG4gICAgKiBHaXZlcyB0aGUgY291bnQgb2Ygd29yZHMgaW4gdGhlIHRleHQuIERlZmF1bHRzIHRvIDAuXHJcbiAgICAqIEB0eXBlIE51bWJlclxyXG4gICAgKiBAZmllbGRPZiBhdHJvcGEuVGV4dEFuYWx5emVyI1xyXG4gICAgKi9cclxuICAgIHRoaXMud29yZENvdW50ID0gMDtcclxuICAgIC8qKlxyXG4gICAgKiBBbiBhcnJheSBvZiBldmVyeSB3b3JkIGluIHRoZSBzdXBwbGllZCB0ZXh0LlxyXG4gICAgKiAgRGVmYXVsdHMgdG8gYW4gZW1wdHkgYXJyYXkuXHJcbiAgICAqIEB0eXBlIEFycmF5XHJcbiAgICAqIEBmaWVsZE9mIGF0cm9wYS5UZXh0QW5hbHl6ZXIjXHJcbiAgICAqL1xyXG4gICAgdGhpcy53b3JkcyA9IFtdO1xyXG4gICAgLyoqXHJcbiAgICAqIFNldHMgdGhlIGJhc2ljIHByb3BlcnRpZXMgb2YgdGhlIHRleHQgYW5hbHl6ZXIuXHJcbiAgICAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gICAgKiBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gICAgKiDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICAgICogQHByaXZhdGVcclxuICAgICogQHZlcnNpb24gMjAxMzAzMTFcclxuICAgICogQG1ldGhvZE9mIGF0cm9wYS5UZXh0QW5hbHl6ZXItXHJcbiAgICAqL1xyXG4gICAgY29uc3RydWN0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGF0cm9wYS5zdXBwb3J0Q2hlY2soJ1RleHRBbmFseXplcicpO1xyXG4gICAgICAgIHRoYXQudGV4dCA9IGF0cm9wYS5zdHJpbmcuY29udmVydEVvbCh0aGF0LnRleHQsICdcXG4nKTtcclxuICAgICAgICB0aGF0LndvcmRDb3VudCA9IGF0cm9wYS5zdHJpbmcuY291bnRXb3Jkcyh0aGF0LnRleHQpO1xyXG4gICAgICAgIHRoYXQud29yZHMgPSBhdHJvcGEuc3RyaW5nLmdldFdvcmRzKHRoYXQudGV4dCk7XHJcbiAgICB9O1xyXG4gICAgXHJcbiAgICBjb25zdHJ1Y3QoKTtcclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG4vKipcclxuICogR2V0cyBhbiBpbmRleCBvZiB0aGUgdGV4dC5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwMTE4XHJcbiAqIEBtZXRob2RPZiBhdHJvcGEuVGV4dEFuYWx5emVyI1xyXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYW4gYXJyYXkgb2YgdW5pcXVlIHZhbHVlc1xyXG4gKiAgZGVyaXZlZCBmcm9tIHRoZSB0ZXh0IGdpdmVuLlxyXG4gKi9cclxuYXRyb3BhLlRleHRBbmFseXplci5wcm90b3R5cGUuZ2V0SW5kZXggPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHRoaXMud29yZHMgPSBhdHJvcGEuYXJyYXlzLnJlaW5kZXgodGhpcy53b3Jkcyk7XHJcbiAgICByZXR1cm4gYXRyb3BhLmFycmF5cy5nZXRVbmlxdWUodGhpcy53b3Jkcyk7XHJcbn07XHJcbi8qKlxyXG4gKiBHZXQgdGhlIGZyZXF1ZW5jeSBkYXRhIGZvciBlYWNoIHVuaXF1ZSB3b3JkIGluXHJcbiAqICB0aGUgdGV4dC5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwMTE4XHJcbiAqIEBtZXRob2RPZiBhdHJvcGEuVGV4dEFuYWx5emVyI1xyXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGFuIG9iamVjdCB3aG9zZSBrZXlzIGFyZVxyXG4gKiAgdGhlIHVuaXF1ZSB3b3JkcyBmcm9tIHRoZSBnaXZlbiB0ZXh0IGFuZCB3aG9zZVxyXG4gKiAgdmFsdWVzIGFyZSB0aGUgY291bnQgb2YgZWFjaCB3b3JkcyBvY2N1cnJlbmNlLlxyXG4gKi9cclxuYXRyb3BhLlRleHRBbmFseXplci5wcm90b3R5cGUuZ2V0V29yZEZyZXF1ZW5jeSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgdGhpcy53b3JkcyA9IGF0cm9wYS5hcnJheXMucmVpbmRleCh0aGlzLndvcmRzKTtcclxuICAgIHJldHVybiBhdHJvcGEuYXJyYXlzLmdldEZyZXF1ZW5jeSh0aGlzLndvcmRzKTtcclxufTtcclxuLyoqXHJcbiAqIEdldHMgcGhyYXNlcyBvZiB0aGUgc3BlY2lmaWVkIGxlbmd0aCBmcm9tIHRoZSB0ZXh0LlxyXG4gKiBAcGFyYW0ge051bWJlcn0gcGhyYXNlTGVuZ3RoIFRoZSBsZW5ndGggb2YgdGhlIHBocmFzZXNcclxuICogIHRvIGV4dHJhY3QgZnJvbSB0aGUgdGV4dC4gRGVmYXVsdHMgdG8gMi5cclxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBhbiBvYmplY3Qgd2hvc2Uga2V5cyBhcmUgcGhyYXNlc1xyXG4gKiAgYW5kIHdob3NlIHZhbHVlcyBhcmUgdGhlIG51bWJlciBvZiBvY2N1cnJlbmNlcyBvZiB0aGUgcGhyYXNlLlxyXG4gKi9cclxuYXRyb3BhLlRleHRBbmFseXplci5wcm90b3R5cGUuZ2V0UGhyYXNlRnJlcXVlbmN5ID0gZnVuY3Rpb24gZ2V0UGhyYXNlRnJlcXVlbmN5KFxyXG4gICAgcGhyYXNlTGVuZ3RoXHJcbikge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICBwaHJhc2VMZW5ndGggPSBhdHJvcGEuc2V0QXNPcHRpb25hbEFyZygyLCBwaHJhc2VMZW5ndGgpO1xyXG4gICAgaWYoMiA+IHBocmFzZUxlbmd0aCkge1xyXG4gICAgICAgIHBocmFzZUxlbmd0aCA9IDI7XHJcbiAgICB9XHJcbiAgICB2YXIgY291bnRlciA9IDAsIHByb3AsIG91dCA9IFtdO1xyXG4gICAgXHJcbiAgICB0aGlzLndvcmRzID0gYXRyb3BhLmFycmF5cy5yZWluZGV4KHRoaXMud29yZHMpO1xyXG4gICAgXHJcbiAgICB0aGlzLndvcmRzLm1hcChmdW5jdGlvbihlbGVtZW50LCBpbmRleCwgYXJyKSB7XHJcbiAgICAgICAgY291bnRlciA9IDE7ICAvLyBlbGVtZW50IGlzIHdvcmQgMSBvZiBwaHJhc2VMZW5ndGhcclxuICAgICAgICAvLyBtYWtpbmcgc3VyZSB0aGVyZSBhcmUgZW5vdWdoIHdvcmRzIHRvIGNvbmNhdGVuYXRlIGEgcGhyYXNlIG9mIHRoZVxyXG4gICAgICAgIC8vIHByb3BlciBsZW5ndGguXHJcbiAgICAgICAgaWYoYXJyW2luZGV4ICsgcGhyYXNlTGVuZ3RoIC0gMV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBwcm9wID0gU3RyaW5nKGVsZW1lbnQgKyAnICcpLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICAgIGZvcihjb3VudGVyOyBjb3VudGVyICE9PSBwaHJhc2VMZW5ndGg7IGNvdW50ZXIrKykge1xyXG4gICAgICAgICAgICAgICAgcHJvcCArPSBTdHJpbmcoYXJyW2luZGV4ICsgY291bnRlcl0gKyAnICcpLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3V0LnB1c2gocHJvcC50cmltKCkpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICBvdXQgPSBhdHJvcGEuYXJyYXlzLmdldEZyZXF1ZW5jeShvdXQpO1xyXG4gICAgXHJcbiAgICByZXR1cm4gb3V0O1xyXG59O1xyXG5cclxuXHJcblxyXG5cclxud2hpbGUoYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLmxlbmd0aCA+IDApIHtcclxuICAgIGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5wb3AoKSgpO1xyXG59XHJcbm1vZHVsZS5leHBvcnRzID0gYXRyb3BhO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vZG9jcy92c2RvYy9PcGVuTGF5ZXJzQWxsLmpzXCIvPlxyXG52YXIgYXRyb3BhID0gcmVxdWlyZSgnYXRyb3BhLWhlYWRlcicpO1xyXG4vKmpzbGludFxyXG4gICAgaW5kZW50OiA0LFxyXG4gICAgbWF4ZXJyOiA1MCxcclxuICAgIHdoaXRlOiB0cnVlLFxyXG4gICAgYnJvd3NlcjogdHJ1ZSxcclxuICAgIGRldmVsOiB0cnVlLFxyXG4gICAgcGx1c3BsdXM6IHRydWUsXHJcbiAgICByZWdleHA6IHRydWVcclxuKi9cclxuLypnbG9iYWwgYXRyb3BhICovXHJcbi8vIGVuZCBoZWFkZXJcclxuLyoqXHJcbiAqIENvbnRhaW5lciBmb3IgY3VzdG9tIEVycm9ycy5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEBuYW1lc3BhY2UgQ29udGFpbmVyIGZvciBjdXN0b20gRXJyb3JzLlxyXG4gKi9cclxuYXRyb3BhLmN1c3RvbUVycm9ycyA9IHt9O1xyXG5cclxuLyoqXHJcbiAqIEludmFsaWQgQXJndW1lbnQgVHlwZXMgRXJyb3JcclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwMjIxXHJcbiAqIEBjbGFzcyBJbnZhbGlkIEFyZ3VtZW50IFR5cGVzIEVycm9yXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlIE9wdGlvbmFsLiBUaGUgZXJyb3IgbWVzc2FnZSB0byBzZW5kLiBEZWZhdWx0cyB0b1xyXG4gKiAgPGNvZGU+SW52YWxpZEFyZ3VtZW50VHlwZXNFcnJvcjwvY29kZT5cclxuICogQHJldHVybnMge0Vycm9yfSBSZXR1cm5zIGFuIGluc3RhbmNlIG9mIHRoZSBJbnZhbGlkQXJndW1lbnRUeXBlc0Vycm9yXHJcbiAqL1xyXG5hdHJvcGEuY3VzdG9tRXJyb3JzLkludmFsaWRBcmd1bWVudFR5cGVzRXJyb3IgPSBmdW5jdGlvbiBJbnZhbGlkQXJndW1lbnRUeXBlc0Vycm9yKG1lc3NhZ2UpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuICAgIC8qKlxyXG4gICAgICogVGhlIG5hbWUgb2YgdGhlIGVycm9yLiBUZWxscyB0aGUgdXNlciB3aGF0IGtpbmQgb2YgY3VzdG9tXHJcbiAgICAgKiBlcnJvciBoYXMgYmVlbiB0aHJvd24uXHJcbiAgICAgKiBAZmllbGRPZiBhdHJvcGEuY3VzdG9tRXJyb3JzLkludmFsaWRBcmd1bWVudFR5cGVzRXJyb3IjXHJcbiAgICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgICogQGRlZmF1bHQgXCJhdHJvcGEuY3VzdG9tRXJyb3JzLkludmFsaWRBcmd1bWVudFR5cGVzRXJyb3JcIlxyXG4gICAgICovXHJcbiAgICB0aGlzLm5hbWUgPSBcImF0cm9wYS5jdXN0b21FcnJvcnMuSW52YWxpZEFyZ3VtZW50VHlwZXNFcnJvclwiO1xyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgZXJyb3IgbWVzc2FnZSB0byBzZW5kLlxyXG4gICAgICogQGZpZWxkT2YgYXRyb3BhLmN1c3RvbUVycm9ycy5JbnZhbGlkQXJndW1lbnRUeXBlc0Vycm9yI1xyXG4gICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICAqIEBkZWZhdWx0IFwiSW52YWxpZEFyZ3VtZW50VHlwZXNFcnJvclwiXHJcbiAgICAgKi9cclxuICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2UgfHwgXCJJbnZhbGlkQXJndW1lbnRUeXBlc0Vycm9yXCI7XHJcbn07XHJcbmF0cm9wYS5jdXN0b21FcnJvcnMuSW52YWxpZEFyZ3VtZW50VHlwZXNFcnJvci5wcm90b3R5cGUgPSBuZXcgRXJyb3IoKTtcclxuYXRyb3BhLmN1c3RvbUVycm9ycy5JbnZhbGlkQXJndW1lbnRUeXBlc0Vycm9yLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFxyXG4gICAgYXRyb3BhLmN1c3RvbUVycm9ycy5JbnZhbGlkQXJndW1lbnRUeXBlc0Vycm9yO1xyXG5cclxuXHJcblxyXG5cclxud2hpbGUoYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLmxlbmd0aCA+IDApIHtcclxuICAgIGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5wb3AoKSgpO1xyXG59XHJcbm1vZHVsZS5leHBvcnRzID0gYXRyb3BhO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vZG9jcy92c2RvYy9PcGVuTGF5ZXJzQWxsLmpzXCIvPlxyXG4vKmpzbGludFxyXG4gICAgaW5kZW50OiA0LFxyXG4gICAgbWF4ZXJyOiA1MCxcclxuICAgIHdoaXRlOiB0cnVlLFxyXG4gICAgYnJvd3NlcjogdHJ1ZSxcclxuICAgIGRldmVsOiB0cnVlLFxyXG4gICAgcGx1c3BsdXM6IHRydWUsXHJcbiAgICByZWdleHA6IHRydWVcclxuKi9cclxuLypnbG9iYWwgWFBhdGhSZXN1bHQgKi9cclxuLy8gZW5kIGhlYWRlclxyXG5cclxuLyoqXHJcbiAqIENvbnRhaW5lciBmb3IgYWxsIEdsb3Jpb3VzIGNsYXNzZXMsIGZ1bmN0aW9ucywgZXRjLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQG5hbWVzcGFjZSBDb250YWluZXIgZm9yIGFsbCBHbG9yaW91cyBjbGFzc2VzLCBmdW5jdGlvbnMsIGV0Yy5cclxuICovXHJcbnZhciBhdHJvcGEgPSB7fTtcclxuLyoqXHJcbiAqIENoZWNrcyB3aGV0aGVyIHRoaXMgY2xhc3MgaGFzIGJlZW4gbWFya2VkIGFzIHVuc3VwcG9ydGVkIGFuZCB0aHJvd3MgYW4gXHJcbiAqICBlcnJvciBpZiBpdCBoYXMuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDMwOFxyXG4gKiBAcGFyYW0ge1N0cmluZ30gY2xhc3NOYW1lIFRoZSBuYW1lIG9mIHRoZSBjbGFzcy5cclxuICogQHBhcmFtIHtTdHJpbmd9IGVycm9yTWVzc2FnZSBPcHRpb25hbC4gQSBjdXN0b20gZXJyb3IgbWVzc2FnZS4gRGVmYXVsdHMgdG9cclxuICogIGF0cm9wYS5kYXRhW2NsYXNzTmFtZV0uZXJyb3JcclxuICovXHJcbmF0cm9wYS5zdXBwb3J0Q2hlY2sgPSBmdW5jdGlvbiAoY2xhc3NOYW1lLCBlcnJvck1lc3NhZ2UpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgY2xhc3NOYW1lID0gU3RyaW5nKGNsYXNzTmFtZSk7XHJcbiAgICBlcnJvck1lc3NhZ2UgPSBlcnJvck1lc3NhZ2UgfHwgYXRyb3BhLmRhdGFbY2xhc3NOYW1lXS5lcnJvcjtcclxuICAgIGVycm9yTWVzc2FnZSA9IFN0cmluZyhlcnJvck1lc3NhZ2UpO1xyXG4gICAgXHJcbiAgICBpZihhdHJvcGEuZGF0YVtjbGFzc05hbWVdLnN1cHBvcnQgPT09ICd1bnN1cHBvcnRlZCcpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JNZXNzYWdlKTtcclxuICAgIH1cclxufTtcclxuLyoqXHJcbiAqIFB1c2hlcyBhIHJlcXVpcmVtZW50IGNoZWNrIGludG8gYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLiBUaGUgdGVzdFxyXG4gKiAgdGVzdHMgd2hldGhlciB0aGUgY2xhc3MgaXMgc3VwcG9ydGVkIGluIHRoaXMgZW52aXJvbm1lbnQuIFNldHNcclxuICogIGF0cm9wYS5kYXRhW2NsYXNzTmFtZV0ncyBzdXBwb3J0IHRvIHVuc3VwcG9ydGVkIGFuZCBlcnJvciB0byBlcnJvck1lc3NhZ2VcclxuICogIGlmIHRoZSByZXF1aXJlbWVudEZuIHJldHVybnMgZmFsc2UuIFRoZSByZXF1aXJlbWVudCBjaGVja3Mgd2lsbCBhbGwgYmUgcnVuXHJcbiAqICBhZnRlciB0aGUgbGlicmFyeSBoYXMgbG9hZGVkLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzAzMDhcclxuICogQHBhcmFtIHtTdHJpbmd9IGNsYXNzTmFtZSBUaGUgbmFtZSBvZiB0aGUgY2xhc3MuXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlcXVpcmVtZW50Rm4gQSBmdW5jdGlvbiB0byB0ZXN0IHdoZXRoZXIgb3Igbm90IHRoZSBjbGFzc1xyXG4gKiAgaXMgc3VwcG9ydGVkIGluIHRoaXMgZW52aXJvbm1lbnQuIElmIHN1cHBvcnRlZCwgcmV0dXJucyB0cnVlIG90aGVyd2lzZVxyXG4gKiAgcmV0dXJuIGZhbHNlLlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gZXJyb3JNZXNzYWdlIFRoZSBlcnJvciBtZXNzYWdlIHRvIHVzZSB3aGVuIHRoaXMgY2xhc3Mgb3IgaXRzXHJcbiAqICBtZXRob2RzIGFyZSBjYWxsZWQgaW4gdW5zdXBwb3J0ZWQgZW52aXJvbm1lbnRzLiBEZWZhdWx0cyB0bzpcclxuICogICdUaGUgYXRyb3BhLicgKyBjbGFzc05hbWUgKyAnIGNsYXNzIGlzIHVuc3VwcG9ydGVkIGluIHRoaXMgZW52aXJvbm1lbnQuJztcclxuICovXHJcbmF0cm9wYS5yZXF1aXJlcyA9IGZ1bmN0aW9uIChjbGFzc05hbWUsIHJlcXVpcmVtZW50Rm4sIGVycm9yTWVzc2FnZSkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICB2YXIgY2hlY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHRlc3QgPSBmYWxzZTtcclxuICAgICAgICBpZih0eXBlb2YgY2xhc3NOYW1lICE9PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2F0cm9wYS5yZXF1aXJlcyByZXF1aXJlcyB0aGUgY2xhc3MgbmFtZSB0byBiZSAnICtcclxuICAgICAgICAgICAgICAgICdzcGVjaWZpZWQnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoYXRyb3BhLmRhdGFbY2xhc3NOYW1lXSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGF0cm9wYS5kYXRhW2NsYXNzTmFtZV0gPSB7fTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKHR5cGVvZiByZXF1aXJlbWVudEZuICE9PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgICAgICByZXF1aXJlbWVudEZuID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZXJyb3JNZXNzYWdlID0gZXJyb3JNZXNzYWdlIHx8ICdUaGUgYXRyb3BhLicgKyBjbGFzc05hbWUgK1xyXG4gICAgICAgICAgICAgICAgICAgICcgY2xhc3MgaXMgdW5zdXBwb3J0ZWQgaW4gdGhpcyBlbnZpcm9ubWVudC4nO1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgdGVzdCA9IHJlcXVpcmVtZW50Rm4oKTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgdGVzdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBhdHJvcGEuZGF0YVtjbGFzc05hbWVdLmVycm9yID0gZXJyb3JNZXNzYWdlO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYodGVzdCA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIGF0cm9wYS5kYXRhW2NsYXNzTmFtZV0uc3VwcG9ydCA9ICd1bnN1cHBvcnRlZCc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgXHJcbiAgICBhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMucHVzaChjaGVjayk7XHJcbn07XHJcbi8qKlxyXG4gKiBDb250YWluZXIgZm9yIGdvYmFsIGRhdGEgcmVsYXRlZCB0byB0aGUgY2xhc3NlcyBhbmQgZnVuY3Rpb25zLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQG5hbWVzcGFjZSBDb250YWluZXIgZm9yIGdvYmFsIGRhdGEgcmVsYXRlZCB0byB0aGUgY2xhc3NlcyBhbmQgZnVuY3Rpb25zLlxyXG4gKi9cclxuYXRyb3BhLmRhdGEgPSB7fTtcclxuXHJcbmF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cyA9IFtdO1xyXG5cclxuYXRyb3BhLm5vcCA9IGZ1bmN0aW9uIG5vcCAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHJldHVybiBudWxsO1xyXG59O1xyXG5tb2R1bGUuZXhwb3J0cyA9IGF0cm9wYTtcclxuXHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9kb2NzL3ZzZG9jL09wZW5MYXllcnNBbGwuanNcIi8+XHJcbnZhciBhdHJvcGEgPSByZXF1aXJlKCdhdHJvcGEtaGVhZGVyJyk7XHJcbmF0cm9wYS5zZXRBc09wdGlvbmFsQXJnID0gcmVxdWlyZSgnYXRyb3BhLXNldEFzT3B0aW9uYWxBcmcnKS5zZXRBc09wdGlvbmFsQXJnO1xyXG4vKmpzbGludFxyXG4gICAgaW5kZW50OiA0LFxyXG4gICAgbWF4ZXJyOiA1MCxcclxuICAgIHdoaXRlOiB0cnVlLFxyXG4gICAgYnJvd3NlcjogdHJ1ZSxcclxuICAgIGRldmVsOiB0cnVlLFxyXG4gICAgcGx1c3BsdXM6IHRydWUsXHJcbiAgICByZWdleHA6IHRydWVcclxuKi9cclxuLypnbG9iYWwgYXRyb3BhICovXHJcbi8vIGVuZCBoZWFkZXJcclxuXHJcblxyXG5hdHJvcGEucmVxdWlyZXMoXHJcbiAgICAnaW5qZWN0JyxcclxuICAgIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgICAgICBpZihkb2N1bWVudC5jcmVhdGVFbGVtZW50ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuKTtcclxuXHJcbi8qKlxyXG4gKiBDb250YWlucyB0b29scyBmb3IgaW5qZWN0aW5nIGVsZW1lbnRzIGFuZCBhc3NlbWJsaWVzLlxyXG4gKiBpbnRvIHRoZSBwYWdlLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzAzMDhcclxuICogQG5hbWVzcGFjZSBDb250YWlucyB0b29scyBmb3IgaW5qZWN0aW5nIGVsZW1lbnRzIGFuZCBhc3NlbWJsaWVzLlxyXG4gKiBAcmVxdWlyZXMgYXRyb3BhLmRhdGFcclxuICogQHJlcXVpcmVzIGF0cm9wYS5zdXBwb3J0Q2hlY2tcclxuICogQHJlcXVpcmVzIGF0cm9wYS5zZXRBc09wdGlvbmFsQXJnXHJcbiAqL1xyXG5hdHJvcGEuaW5qZWN0ID0ge307XHJcbi8qKlxyXG4gKiBHZW5lcmljIEVsZW1lbnQgSW5qZWN0b3IuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEyMDkwOVxyXG4gKiBAcGFyYW0ge1N0cmluZ30gZWxlbWVudFR5cGUgVGhlIHR5cGUgb2YgZWxlbWVudCB0byBiZSBpbmplY3RlZC5cclxuICogQHBhcmFtIHtIVE1MIERPTSBEb2N1bWVudH0gZG9jcmVmIE9wdGlvbmFsLiBBIHJlZmVyZW5jZSB0byB0aGUgZG9jdW1lbnQgdG9cclxuICogIHRhcmdldCwgZGVmYXVsdHMgdG8gPGNvZGU+ZG9jdW1lbnQ8L2NvZGU+LlxyXG4gKiBAcGFyYW0ge0RPTSBOb2RlfSBwYXJlbnROb2QgT3B0aW9uYWwuIEEgcmVmZXJlbmNlIHRvIHRoZSBwYXJlbnQgbm9kZSB0b1xyXG4gKiAgdGFyZ2V0LCBkZWZhdWx0cyB0byA8Y29kZT5kb2NyZWYuYm9keTwvY29kZT4uXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBhdHRyaWJ1dGVzIE9wdGlvbmFsLiBBbiBvYmplY3Qgd2hvc2UgcHJvcGVydGllcyBhcmUgbmFtZXMgb2ZcclxuICogIEhUTUwgYXR0cmlidXRlcywgZGVmYXVsdHMgdG8gPGNvZGU+e308L2NvZGU+LiBUaGUgdmFsdWUgb2YgdGhlc2UgcHJvcGVydGllc1xyXG4gKiAgYXJlIHRvIGJlIHN0cmluZ3MgcmVwcmVzZW50aW5nIHRoZSB2YWx1ZXMgb2YgdGhlIEhUTUwgYXR0cmlidXRlcyBhcyB0aGV5IGFyZVxyXG4gKiAgdG8gYmUgYXBwbGllZCB0byB0aGUgaW5qZWN0ZWQgZWxlbWVudC5cclxuICogQGV4YW1wbGUgRXhhbXBsZSBhdHRyaWJ1dGVzIG9iamVjdCA6XHJcbiAqXHJcbiAqIGF0dHJpYnV0ZXNPYmogPSB7XHJcbiAqICAgICBcImlkXCIgOiBcImVsZW1lbnRJRFwiLFxyXG4gKiAgICAgXCJjbGFzc1wiIDogXCJjbGFzc3lcIlxyXG4gKiB9O1xyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvbmxvYWRIYW5kbGVyIE9wdGlvbmFsLiBJZiB0aGUgZWxlbWVudCBiZWluZyBpbmplY3RlZCB3aWxsXHJcbiAqICBmaXJlIGEgbG9hZCBldmVudCwgdGhpcyBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZC4gRGVmYXVsdHMgdG9cclxuICogIDxjb2RlPmZ1bmN0aW9uICgpIHt9PC9jb2RlPi5cclxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgT3B0aW9uYWwuIFRoaXMgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQganVzdCBiZWZvcmVcclxuICogIHRoZSBlbGVtZW50IGlzIHRvIGJlIGFwcGVuZGVkIHRvIHRoZSBwYWdlLiBUaGUgY2FsbGJhY2sgd2lsbCByZWNlaXZlIHRoZVxyXG4gKiAgZWxlbWVudCBpbiBpdHMgY3VycmVudCBzdGF0ZSBmb3IgYW55IGFkZGl0aW9uYWwgcHJvY2Vzc2luZyB0byBiZSBkb25lIHByaW9yXHJcbiAqICB0byBpdCdzIGF0dGFjaG1lbnQgb24gY2FsbGJhY2sgY29tcGxldGlvbi4gRGVmYXVsdHMgdG9cclxuICogIDxjb2RlPmZ1bmN0aW9uICgpIHt9PC9jb2RlPi5cclxuICogQHJldHVybiB7SFRNTCBFbGVtZW50fSBSZXR1cm5zIGEgcmVmZXJlbmNlIHRvIHRoZSBIVE1MIEVsZW1lbnQgY3JlYXRlZCBhbmRcclxuICogIGluamVjdGVkLlxyXG4gKiBAc2VlIDxhIGhyZWY9XCJodHRwOi8vd3d3LnczLm9yZy9TZWN1cml0eS93aWtpL1NhbWVfT3JpZ2luX1BvbGljeVwiPlxyXG4gKiBodHRwOi8vd3d3LnczLm9yZy9TZWN1cml0eS93aWtpL1NhbWVfT3JpZ2luX1BvbGljeTwvYT5cclxuICogQGV4YW1wbGVcclxuICogIC8vIHRoaXMgd2lsbCBpbmplY3QgYSBkaXYgZWxlbWVudCBpbnRvIHRoZSBkb2N1bWVudCBib2R5LlxyXG4gKiAgdmFyIGVsID0gYXRyb3BhLmluamVjdC5lbGVtZW50ICgnZGl2Jyk7XHJcbiAqICBcclxuICogIC8vIFRoaXMgd2lsbCBpbmplY3QgYSBkaXYgd2l0aCB0aGUgaWQgXCJteUlkXCIgaW50byB0aGUgZWxlbWVudCByZWZlcmVuY2VkIGJ5XHJcbiAqICAvLyBcImNvbnRhaW5lclwiXHJcbiAqICB2YXIgZWwgPSBhdHJvcGEuaW5qZWN0LmVsZW1lbnQgKFxyXG4gKiAgICAgICdkaXYnLCBkb2N1bWVudCwgY29udGFpbmVyLCB7ICdpZCc6ICdteUlkJyB9LCBudWxsLCBudWxsXHJcbiAqICApO1xyXG4gKiAgXHJcbiAqICAvLyB0aGlzIHdpbGwgaW5qZWN0IGEgZGl2IGludG8gdGhlIGRvY3VtZW50IG9mIGFuIGlmcmFtZSByZWZlcmVuY2VkIHdpdGggXCJmZG9jXCJcclxuICogIC8vIEp1c3QgYmVmb3JlIHRoZSBkaXYgaXMgaW5qZWN0ZWQgdGhlIGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIGFuZCB0aGUgZWxlbWVudFxyXG4gKiAgLy8gbWF5IGJlIGF1Z21lbnRlZC4gV2hlbiB0aGUgY2FsbGJhY2sgcmV0dXJucyB0aGUgZWxlbWVudCB3aWxsIGJlIGluamVjdGVkLlxyXG4gKiAgdmFyIGZkb2MgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc29tZUZyYW1lJykuY29udGVudFdpbmRvdy5kb2N1bWVudDtcclxuICogIFxyXG4gKiAgdmFyIGVsID0gYXRyb3BhLmluamVjdC5lbGVtZW50IChcclxuICogICAgICAnZGl2JywgZmRvYywgZmRvYy5ib2R5LCB7ICdpZCc6ICdteUlkJyB9LFxyXG4gKiAgICAgIG51bGwsXHJcbiAqICAgICAgZnVuY3Rpb24gKG15RGl2KSB7XHJcbiAqICAgICAgICAgIG15RGl2LnRleHRDb250ZW50ID0gJ0kgY291bGQgaGF2ZSBhdHRhY2hlZCBldmVudCBoYW5kbGVycyc7XHJcbiAqICAgICAgfVxyXG4gKiAgKTtcclxuICogIFxyXG4gKiAgLy8gdGhpcyB3aWxsIGluamVjdCBhbiBpZnJhbWUgaW50byB0aGUgZG9jdW1lbnRcclxuICogIC8vIG9uY2UgdGhlIGlmcmFtZSdzIGRvY3VtZW50IGhhcyBmaW5pc2hlZCBsb2FkaW5nIHRoZSBvbmxvYWQgaGFuZGxlciB3aWxsIGJlXHJcbiAqICAvLyBjYWxsZWQuIElmIHRoZSBkb2N1bWVudCBhbmQgdGhlIGlmcmFtZSBhcmUgb24gdGhlIHNhbWUgZG9tYWluLCBzY3JpcHRzIG9uXHJcbiAqICAvLyB0aGUgZnJhbWUgYW5kIHRoZSBwYXJlbnQgZG9jdW1lbnQgd2lsbCBiZSBhYmxlIHRvIGNvbW11aW5jYXRlIHdpdGggZWFjaFxyXG4gKiAgLy8gb3RoZXIuXHJcbiAqICBmdW5jdGlvbiBpZnJhbWVIYXNMb2FkZWQgKG1lc3NhZ2UpIHtcclxuICogICAgICBjb25zb2xlLmxvZyhtZXNzYWdlKTtcclxuICogIH1cclxuICogIFxyXG4gKiAgdmFyIGVsID0gYXRyb3BhLmluamVjdC5lbGVtZW50IChcclxuICogICAgICAnaWZyYW1lJywgZG9jdW1lbnQsIGRvY3VtZW50LmJvZHksXHJcbiAqICAgICAgeyAnaWQnOiAnbXlJZCcsICdzcmMnIDogJ2h0dHA6Ly9sb2NhbGhvc3QnIH0sXHJcbiAqICAgICAgZnVuY3Rpb24gKCkge1xyXG4gKiAgICAgICAgICBpZnJhbWVIYXNMb2FkZWQoJ2hleSBsb29rIGF0IHRoYXQsIHRoZSBmcmFtZSBpcyByZWFkeSEnKTtcclxuICogICAgICAgICAgLy8gd2hhdCBjb3VsZCBJIGRvIHdpdGggdGhlIGZyYW1lPyBhbnl0aGluZyBJIHdhbnQhXHJcbiAqICAgICAgfSxcclxuICogICAgICBudWxsXHJcbiAqICApO1xyXG4gKi9cclxuYXRyb3BhLmluamVjdC5lbGVtZW50ID0gZnVuY3Rpb24gKFxyXG4gICAgZWxlbWVudFR5cGUsIGRvY3JlZiwgcGFyZW50Tm9kLCBhdHRyaWJ1dGVzLCBvbmxvYWRIYW5kbGVyLCBjYWxsYmFja1xyXG4pIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgYXRyb3BhLnN1cHBvcnRDaGVjaygnaW5qZWN0Jyk7XHJcbiAgICBcclxuICAgIHZhciBlbCxcclxuICAgIHg7XHJcbiAgICBkb2NyZWYgPSBhdHJvcGEuc2V0QXNPcHRpb25hbEFyZyhkb2N1bWVudCwgZG9jcmVmKTtcclxuICAgIHBhcmVudE5vZCA9IGF0cm9wYS5zZXRBc09wdGlvbmFsQXJnKGRvY3JlZi5ib2R5LCBwYXJlbnROb2QpO1xyXG4gICAgYXR0cmlidXRlcyA9IGF0cm9wYS5zZXRBc09wdGlvbmFsQXJnKHt9LCBhdHRyaWJ1dGVzKTtcclxuICAgIG9ubG9hZEhhbmRsZXIgPSBhdHJvcGEuc2V0QXNPcHRpb25hbEFyZyhhdHJvcGEubm9wLCBvbmxvYWRIYW5kbGVyKTtcclxuICAgIGNhbGxiYWNrID0gYXRyb3BhLnNldEFzT3B0aW9uYWxBcmcoYXRyb3BhLm5vcCwgY2FsbGJhY2spO1xyXG4gICAgXHJcbiAgICBlbCA9IGRvY3JlZi5jcmVhdGVFbGVtZW50KGVsZW1lbnRUeXBlKTtcclxuICAgIGZvciAoeCBpbiBhdHRyaWJ1dGVzKSB7XHJcbiAgICAgICAgaWYgKGF0dHJpYnV0ZXMuaGFzT3duUHJvcGVydHkoeCkpIHtcclxuICAgICAgICAgICAgZWwuc2V0QXR0cmlidXRlKHgsIGF0dHJpYnV0ZXNbeF0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBvbmxvYWRIYW5kbGVyLCB0cnVlKTtcclxuICAgIGNhbGxiYWNrKGVsKTtcclxuICAgIHBhcmVudE5vZC5hcHBlbmRDaGlsZChlbCk7XHJcbiAgICByZXR1cm4gZWw7XHJcbn07XHJcbi8qKlxyXG4gKiBIaWRkZW4gSWZyYW1lIEluamVjdG9yLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzAzMDhcclxuICogQHBhcmFtIHtTdHJpbmd9IGlkIFRoZSBpZCBvZiB0aGUgZWxlbWVudCB0byBiZSBpbmplY3RlZC5cclxuICogQHBhcmFtIHtTdHJpbmd9IHNyY1VybCBUaGUgVVJMIHRvIGxvYWQgaW4gdGhlIGlmcmFtZS5cclxuICogQHBhcmFtIHtIVE1MIERPTSBEb2N1bWVudH0gZG9jcmVmIE9wdGlvbmFsLiBSZWZlcmVuY2UgdG8gdGhlIGRvY3VtZW50IHRvXHJcbiAqICBpbmplY3QgdGhlIGlmcmFtZSBpbi4gRGVmYXVsdHMgdG8gZG9jdW1lbnQuXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9ubG9hZEhhbmRsZXIgT3B0aW9uYWwuIFRoZSBvbmxvYWQgaGFuZGxlciBmb3IgdGhlIGlmcmFtZS5cclxuICogQHBhcmFtIHtET00gTm9kZX0gcGFyZW50Tm9kIE9wdGlvbmFsLiBSZWZlcmVuY3QgdG8gdGhlIHBhcmVudCBub2RlIHRvXHJcbiAqICBhcHBlbmQgdGhlIGlmcmFtZSB0by4gRGVmYXVsdHMgdG8gZG9jcmVmLmJvZHlcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgT3B0aW9uYWwuIENhbGxiYWNrIGZ1bmN0aW9uIGZvciBwcmVwcm9jZXNzaW5nXHJcbiAqICB0aGUgaWZyYW1lIHByaW9yIHRvIGluamVjdGlvbi4gQ2FsbGVkIHdpdGggYSByZWZlcmVuY2UgdG8gdGhlIGlmcmFtZS5cclxuICogQHJldHVybiB7SFRNTCBFbGVtZW50fSBSZXR1cm5zIGEgcmVmZXJlbmNlIHRvIHRoZSBIVE1MIEVsZW1lbnQgY3JlYXRlZCBhbmRcclxuICogIGluamVjdGVkLlxyXG4gKiBAc2VlIGF0cm9wYS5pbmplY3QuZWxlbWVudFxyXG4gKiBAc2VlIDxhIGhyZWY9XCJodHRwOi8vd3d3LnczLm9yZy9TZWN1cml0eS93aWtpL1NhbWVfT3JpZ2luX1BvbGljeVwiPlxyXG4gKiBodHRwOi8vd3d3LnczLm9yZy9TZWN1cml0eS93aWtpL1NhbWVfT3JpZ2luX1BvbGljeTwvYT5cclxuICogQGV4YW1wbGVcclxuICogIGVsID0gYXRyb3BhLmluamVjdC5oaWRkZW5GcmFtZShcclxuICogICAgICAnaW5qZWN0SGlkZGVuRnJhbWUzJyxcclxuICogICAgICAnaHR0cDovL2xvY2FsaG9zdC8nLFxyXG4gKiAgICAgIG51bGwsXHJcbiAqICAgICAgZnVuY3Rpb24gKCkge1xyXG4gKiAgICAgICAgICBjb25zb2xlLmxvZygnaGV5IGxvb2sgYXQgdGhhdCwgdGhlIGZyYW1lIGlzIHJlYWR5IScpO1xyXG4gKiAgICAgIH0sXHJcbiAqICAgICAgbnVsbCxcclxuICogICAgICBudWxsXHJcbiAqICApO1xyXG4gKi9cclxuYXRyb3BhLmluamVjdC5oaWRkZW5GcmFtZSA9IGZ1bmN0aW9uIChcclxuICAgIGlkLCBzcmNVUkwsIGRvY3JlZiwgb25sb2FkSGFuZGxlciwgcGFyZW50Tm9kLCBjYWxsYmFja1xyXG4pIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgYXRyb3BhLnN1cHBvcnRDaGVjaygnaW5qZWN0Jyk7XHJcbiAgICBcclxuICAgIHJldHVybiBhdHJvcGEuaW5qZWN0LmVsZW1lbnQoXHJcbiAgICAgICAgJ2lmcmFtZScsXHJcbiAgICAgICAgZG9jcmVmLFxyXG4gICAgICAgIHBhcmVudE5vZCxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFwiaWRcIiA6IGlkLFxyXG4gICAgICAgICAgICBcInNyY1wiIDogc3JjVVJMLFxyXG4gICAgICAgICAgICBcIndpZHRoXCIgOiBcIjBweFwiLFxyXG4gICAgICAgICAgICBcImhlaWdodFwiIDogXCIwcHhcIixcclxuICAgICAgICAgICAgXCJib3JkZXJcIiA6IFwiMHB4XCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIG9ubG9hZEhhbmRsZXIsXHJcbiAgICAgICAgY2FsbGJhY2tcclxuICAgICk7XHJcbn07XHJcbi8qKlxyXG4gKiBTY3JpcHQgSW5qZWN0b3IuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEyMDkwOVxyXG4gKiBAcGFyYW0ge1N0cmluZ30gaWQgVGhlIGlkIG9mIHRoZSBlbGVtZW50IHRvIGJlIGluamVjdGVkLlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gc3JjVXJsIFRoZSBVUkwgd2hlcmUgdGhlIHNjcmlwdCBpcyBsb2NhdGVkLlxyXG4gKiBAcGFyYW0ge0hUTUwgRE9NIERvY3VtZW50fSBkb2NyZWYgT3B0aW9uYWwuIFRoZSBkb2N1bWVudCB0byBpbmplY3QgdGhlXHJcbiAqICBzY3JpcHQgaW50by4gRGVmYXVsdHMgdG8gZG9jdW1lbnQuXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIE9wdGlvbmFsLiBBIGZ1bmN0aW9uIHRvIGV4ZWN1dGUgb25jZSB0aGUgc2NyaXB0XHJcbiAqICBoYXMgbG9hZGVkLiBEZWZhdWx0cyB0byBmdW5jdGlvbiAoKSB7fTtcclxuICogQHJldHVybiB7SFRNTCBFbGVtZW50fSBSZXR1cm5zIGEgcmVmZXJlbmNlIHRvIHRoZSBIVE1MIEVsZW1lbnQgY3JlYXRlZCBhbmRcclxuICogIGluamVjdGVkLlxyXG4gKiBAc2VlIGF0cm9wYS5pbmplY3QuZWxlbWVudFxyXG4gKiBAc2VlIDxhIGhyZWY9XCJodHRwOi8vd3d3LnczLm9yZy9TZWN1cml0eS93aWtpL1NhbWVfT3JpZ2luX1BvbGljeVwiPlxyXG4gKiBodHRwOi8vd3d3LnczLm9yZy9TZWN1cml0eS93aWtpL1NhbWVfT3JpZ2luX1BvbGljeTwvYT5cclxuICogQGV4YW1wbGVcclxuICogIC8vIEdpdmVuIGEgc2NyaXB0IFwiZHVtbXkuanNcIiBsb2NhdGVkIGF0IFwiaHR0cDovL2xvY2FsaG9zdC9kdW1teS5qc1wiXHJcbiAqICAvLyB5b3UgY2FuIGZldGNoIHRoZSBzY3JpcHQgYW5kIGV4ZWN1dGUgZnVuY3Rpb25zIGZyb20gd2l0aGluIGl0XHJcbiAqICAvLyBhcyBzb29uIGFzIGl0IGhhcyBsb2FkZWQgaW50byB0aGUgcGFnZS5cclxuICogIFxyXG4gKiAgLy8gY29udGVudHMgb2YgXCJkdW1teS5qc1wiXHJcbiAqICBmdW5jdGlvbiBkdW1teSgpIHtcclxuICogICAgICByZXR1cm4gJ2R1bW15JztcclxuICogIH1cclxuICogIFxyXG4gKiAgLy8gaW5qZWN0aW5nIFwiZHVtbXkuanNcIiBpbnRvIGFueSBwYWdlLiBUaGUgc2NyaXB0IHRhZyBpc24ndCByZXN0cmljdGVkIGJ5XHJcbiAqICAvLyB0aGUgc2FtZSBvcmlnaW4gcG9saWN5LiBIb3N0IHlvdXIgc2NyaXB0IGFueXdoZXJlIGFuZCBpbmplY3QgaXQgdG8gYW55XHJcbiAqICAvLyBwYWdlIG9uIHRoZSBuZXQgdGhhdCB5b3Ugd2FudCB0by5cclxuICogIGVsID0gYXRyb3BhLmluamVjdC5zY3JpcHQoXHJcbiAqICAgICAgJ2luamVjdFNjcmlwdCcsXHJcbiAqICAgICAgJ2h0dHA6Ly9sb2NhbGhvc3QvJyxcclxuICogICAgICBkb2N1bWVudCxcclxuICogICAgICBmdW5jdGlvbiAoKSB7XHJcbiAqICAgICAgICAgIGNvbnNvbGUubG9nKGR1bW15KCkpO1xyXG4gKiAgICAgIH1cclxuICogICk7XHJcbiAqICAvLyB5b3UgbWF5IGFsc28gbG9hZCBzY3JpcHRzIGludG8gaWZyYW1lcyBieSByZXBsYWNpbmcgdGhlIHRoaXJkIHBhcmFtZXRlclxyXG4gKiAgLy8gd2l0aCBhIHJlZmVyZW5jZSB0byB0aGUgaWZyYW1lJ3MgZG9jdW1lbnQgb2JqZWN0LlxyXG4gKi9cclxuYXRyb3BhLmluamVjdC5zY3JpcHQgPSBmdW5jdGlvbiAoaWQsIHNyY1VSTCwgZG9jcmVmLCBjYWxsYmFjaykge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICBhdHJvcGEuc3VwcG9ydENoZWNrKCdpbmplY3QnKTtcclxuICAgIFxyXG4gICAgdmFyIGF0dHJpYnV0ZXMsXHJcbiAgICBlbGVtZW50VHlwZSxcclxuICAgIHBhcmVudE5vZCA9IG51bGwsXHJcbiAgICBvbmxvYWRIYW5kbGVyLFxyXG4gICAgZWw7XHJcbiAgICBhdHRyaWJ1dGVzID0ge1xyXG4gICAgICAgIFwiaWRcIiA6IGlkLFxyXG4gICAgICAgIFwidHlwZVwiIDogXCJ0ZXh0L2phdmFzY3JpcHRcIixcclxuICAgICAgICBcInNyY1wiIDogc3JjVVJMXHJcbiAgICB9O1xyXG4gICAgZWxlbWVudFR5cGUgPSAnc2NyaXB0JztcclxuICAgIG9ubG9hZEhhbmRsZXIgPSBjYWxsYmFjaztcclxuICAgIGVsID0gYXRyb3BhLmluamVjdC5lbGVtZW50KFxyXG4gICAgICAgIGVsZW1lbnRUeXBlLCBkb2NyZWYsIHBhcmVudE5vZCwgYXR0cmlidXRlcywgb25sb2FkSGFuZGxlcik7XHJcbiAgICByZXR1cm4gZWw7XHJcbn07XHJcblxyXG5cclxuXHJcblxyXG53aGlsZShhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMubGVuZ3RoID4gMCkge1xyXG4gICAgYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLnBvcCgpKCk7XHJcbn1cclxubW9kdWxlLmV4cG9ydHMgPSBhdHJvcGE7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9kb2NzL3ZzZG9jL09wZW5MYXllcnNBbGwuanNcIi8+XHJcbnZhciBhdHJvcGEgPSByZXF1aXJlKCdhdHJvcGEtaGVhZGVyJyk7XHJcbi8qanNsaW50XHJcbiAgICBpbmRlbnQ6IDQsXHJcbiAgICBtYXhlcnI6IDUwLFxyXG4gICAgd2hpdGU6IHRydWUsXHJcbiAgICBicm93c2VyOiB0cnVlLFxyXG4gICAgZGV2ZWw6IHRydWUsXHJcbiAgICBwbHVzcGx1czogdHJ1ZSxcclxuICAgIHJlZ2V4cDogdHJ1ZVxyXG4qL1xyXG4vKmdsb2JhbCBhdHJvcGEsIFhQYXRoUmVzdWx0ICovXHJcbi8vIGVuZCBoZWFkZXJcclxuXHJcbi8qKlxyXG4gKiBVdGlsaXRpZXMgZm9yIGhhbmRsaW5nIG9iamVjdHMuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDEyMVxyXG4gKiBAbmFtZXNwYWNlIFV0aWxpdGllcyBmb3IgaGFuZGxpbmcgb2JqZWN0cy5cclxuICovXHJcbmF0cm9wYS5vYmplY3RzID0ge307XHJcbi8qKlxyXG4gKiBDb252ZXJ0cyBhbiBvYmplY3QgaW50byBhbiBhcnJheSBvZiBhcnJheXMgdG8gbWFrZSBpdCBwb3NzaWJsZSB0byBzb3J0IGFuZFxyXG4gKiAgZW51bWVyYXRlIHByb3BlcnRpZXMgcmVsaWFibHkuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDEyMFxyXG4gKiBAbWV0aG9kT2YgYXRyb3BhLm9iamVjdHMuXHJcbiAqIEBleGFtcGxlXHJcbiAqICB2YXIgeCA9IHtcclxuICogICAgICBcInN0dWZmaW5nXCIgOiBcImNvdHRvblwiLFxyXG4gKiAgICAgIFwibm9zZVwiIDogXCJidXR0b25cIixcclxuICogICAgICBcIm5hbWVcIiA6IFwiYmVhclwiXHJcbiAqICB9O1xyXG4gKiAgY29uc29sZS5sb2coIGF0cm9wYS5vYmplY3RzLmNvbnZlcnRPYmplY3RUb0FycmF5KHgpICk7XHJcbiAqICAvLyBsb2dzIFtbXCJzdHVmZmluZ1wiLCBcImNvdHRvblwiXSwgW1wibm9zZVwiLCBcImJ1dHRvblwiXSwgW1wibmFtZVwiLCBcImJlYXJcIl1dXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogQW4gb2JqZWN0LlxyXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYW4gYXJyYXkgb2YgYXJyYXlzIHdoZXJlIGVhY2hcclxuICogIG5lc3RlZCBhcnJheSB3aWxsIGhhdmUgdGhlIG9iamVjdCdzIGtleSBzdG9yZWQgaW4gZWxlbWVudCAwIGFuZFxyXG4gKiAgdGhlIHZhbHVlIHN0b3JlZCBpbiBlbGVtZW50IDEuIFRoZSByZWFzb24gYW4gYXJyYXkgb2YgYXJyYXlzIGlzXHJcbiAqICByZXR1cm5lZCBpcyBiZWNhdXNlIEphdmFTY3JpcHQgZG9lcyBub3QgZ3VhcmFudGVlIHRoZSBvcmRlciBvZlxyXG4gKiAgcHJvcGVydGllcyBvbiBhbiBvYmplY3Qgc28gdGhlcmUgaXMgbm8gcmVsaXpibGUgd2F5IHRvIHNvcnRcclxuICogIGFuIG9iamVjdHMga2V5cyBvciB2YWx1ZXMuXHJcbiAqIEBzZWUgXCJUaGUgbWVjaGFuaWNzIGFuZCBvcmRlciBvZiBlbnVtZXJhdGluZyB0aGUgcHJvcGVydGllcyBbb2YgYW4gb2JqZWN0XVxyXG4gKiAgaXMgbm90IHNwZWNpZmllZC5cIiBcclxuICogIDxhIGhyZWY9XCJodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNS4xLyNzZWMtMTIuNi40XCI+XHJcbiAqICBodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNS4xLyNzZWMtMTIuNi40PC9hPlxyXG4gKi9cclxuYXRyb3BhLm9iamVjdHMuY29udmVydE9iamVjdFRvQXJyYXkgPSBmdW5jdGlvbiBjb252ZXJ0T2JqZWN0VG9BcnJheShvYmopIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgdmFyIHByb3AsIG91dCA9IFtdO1xyXG4gICAgZm9yIChwcm9wIGluIG9iaikge1xyXG4gICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkocHJvcCkpIHtcclxuICAgICAgICAgICAgb3V0LnB1c2goW3Byb3AsIG9ialtwcm9wXV0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBvdXQ7XHJcbn07XHJcbi8qKlxyXG4gKiBDb252ZXJ0cyBhbiBvYmplY3QgaW50byBhbiBhcnJheSBvZiBhcnJheXMgYW5kIGFsbG93cyBmb3IgcmVsaWFibGUgc29ydGluZ1xyXG4gKiAgYW5kIGVudW1lcmF0aW9uLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzAxMjBcclxuICogQGV4YW1wbGVcclxuICogIHZhciB3b3Jkc0NvdW50ZWQsIHNvcnRlZEJ5VmFsdWVzLCBzb3J0ZWRCeVByb3BlcnRpZXM7XHJcbiAqICB3b3Jkc0NvdW50ZWQgPSB7XHJcbiAqICAgICAgXCJkb2N1bWVudDNcIiA6IDE1MCxcclxuICogICAgICBcImRvY3VtZW50MVwiIDogMzAwLFxyXG4gKiAgICAgIFwiZG9jdW1lbnQyXCIgOiAyNVxyXG4gKiAgfTtcclxuICogIC8vIHNvcnRpbmcgYnkgcHJvcGVydHkgdmFsdWUgYXMgbnVtYmVyc1xyXG4gKiAgZnVuY3Rpb24gdmFsU29ydChhLCBiKSB7XHJcbiAqICAgICAgcmV0dXJuIGFbMV0gLSBiWzFdO1xyXG4gKiAgfVxyXG4gKiAgLy8gc29ydGluZyBieSBwcm9wZXJ0eSBuYW1lcyBhcyBzdHJpbmdzXHJcbiAqICBmdW5jdGlvbiBwcm9wU29ydChhLCBiKSB7XHJcbiAqICAgICAgcmV0dXJuIGFbMF0ubG9jYWxlQ29tcGFyZShiWzBdKTtcclxuICogIH1cclxuICogIHNvcnRlZEJ5VmFsdWVzID0gYXRyb3BhLm9iamVjdHMuc29ydCh3b3Jkc0NvdW50ZWQsIHZhbFNvcnQpO1xyXG4gKiAgc29ydGVkQnlQcm9wZXJ0aWVzID0gYXRyb3BhLm9iamVjdHMuc29ydCh3b3Jkc0NvdW50ZWQsIHByb3BTb3J0KTtcclxuICogIGNvbnNvbGUubG9nKCdzb3J0ZWQgYnkgdmFsdWU6ICcsIHNvcnRlZEJ5VmFsdWVzKTtcclxuICogIGNvbnNvbGUubG9nKCdzb3J0ZWQgYnkgcHJvcGVydGllczogJywgc29ydGVkQnlQcm9wZXJ0aWVzKTtcclxuICogIFxyXG4gKiAgLy8gbG9nczpcclxuICogIC8vIHNvcnRlZCBieSB2YWx1ZTogW1xyXG4gKiAgLy8gICAgIFtcImRvY3VtZW50MlwiLCAyNV0sXHJcbiAqICAvLyAgICAgW1wiZG9jdW1lbnQzXCIsIDE1MF0sXHJcbiAqICAvLyAgICAgW1wiZG9jdW1lbnQxXCIsIDMwMF1cclxuICogIC8vIF1cclxuICogIC8vIHNvcnRlZCBieSBwcm9wZXJ0aWVzOiBbXHJcbiAqICAvLyAgICAgW1wiZG9jdW1lbnQxXCIsIDMwMF0sXHJcbiAqICAvLyAgICAgW1wiZG9jdW1lbnQyXCIsIDI1XSxcclxuICogIC8vICAgICBbXCJkb2N1bWVudDNcIiwgMTUwXVxyXG4gKiAgLy8gXVxyXG4gKiBAZXhhbXBsZVxyXG4gKiAgTGV4aWNvZ3JhcGhpYyBzb3J0aW5nOlxyXG4gKiAgVGhpcyAgICBbMSwgMiwgMTAsICdBJywgJ2EnLCdaJywgJ3onXVxyXG4gKiAgYmVjb21lcyBbMSwgMTAsIDIsIFwiQVwiLCBcIlpcIiwgXCJhXCIsIFwielwiXVxyXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIEFuIG9iamVjdC5cclxuICogQHBhcmFtIHtGdW5jdGlvbn0gc29ydEZuIE9wdGlvbmFsLiBUaGUgc29ydGluZyBmdW5jdGlvbi4gVGhpcyBmdW5jdGlvbiB3aWxsXHJcbiAqICBiZSBnaXZlbiB0d28gYXJndW1lbnRzLiBDb21wYXJlIHRoZSB0d28gYXJndW1lbnRzIGFuZCByZXR1cm46XHJcbiAqICAwIGlmIHRoZXkgYXJlIGVxdWFsLCBncmVhdGVyIHRoYW4gemVybyBpZiB0aGUgZmlyc3QgYXJndW1lbnRcclxuICogIGlzIGdyZWF0ZXIgdGhhbiB0aGUgc2Vjb25kLCBvciBsZXNzIHRoYW4gemVybyBpZiB0aGUgc2Vjb25kXHJcbiAqICBhcmd1bWVudCBpcyBncmVhdGVyIHRoYW4gdGhlIGZpcnN0LiBJZiB0aGUgc29ydGluZyBmdW5jdGlvblxyXG4gKiAgaXMgbm90IGdpdmVuLCB0aGUgYXJyYXkgd2lsbCBiZSBzb3J0ZWQgbGV4b2dyYXBoaWNhbGx5IGJ5XHJcbiAqICBlYWNoIGVsZW1lbnRzIDxjb2RlPnRvU3RyaW5nPC9jb2RlPiB2YWx1ZS5cclxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGFuIGFycmF5IG9mIGFycmF5cyB3aGVyZSBlYWNoXHJcbiAqICBuZXN0ZWQgYXJyYXkgd2lsbCBoYXZlIHRoZSBvYmplY3RzIGtleSBzdG9yZWQgaW4gZWxlbWVudCAwIGFuZFxyXG4gKiAgdGhlIHZhbHVlIHN0b3JlZCBpbiBlbGVtZW50IDEuIFRoZSByZWFzb24gYW4gYXJyYXkgb2YgYXJyYXlzIGlzXHJcbiAqICByZXR1cm5lZCBpcyBiZWNhdXNlIEphdmFTY3JpcHQgZG9lcyBub3QgZ3VhcmFudGVlIHRoZSBvcmRlciBvZlxyXG4gKiAgcHJvcGVydGllcyBvbiBhbiBvYmplY3Qgc28gdGhlcmUgaXMgbm8gcmVsaXpibGUgd2F5IHRvIHNvcnRcclxuICogIGFuIG9iamVjdHMga2V5cyBvciB2YWx1ZXMuXHJcbiAqIEBzZWUgYXRyb3BhLm9iamVjdHMuY29udmVydE9iamVjdFRvQXJyYXlcclxuICogQHNlZSA8YSBocmVmPVwiaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzUuMS8jc2VjLTE1LjQuNC4xMVwiPlxyXG4gKiAgaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzUuMS8jc2VjLTE1LjQuNC4xMTwvYT5cclxuICogQHNlZSA8YSBocmVmPVwiaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9BcnJheS9zb3J0XCI+XHJcbiAqICBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL0FycmF5L3NvcnQ8L2E+XHJcbiAqL1xyXG5hdHJvcGEub2JqZWN0cy5zb3J0ID0gZnVuY3Rpb24gc29ydChvYmosIHNvcnRGbikge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICByZXR1cm4gYXRyb3BhLm9iamVjdHMuY29udmVydE9iamVjdFRvQXJyYXkob2JqKS5zb3J0KHNvcnRGbik7XHJcbn07XHJcbi8qKlxyXG4gKiBTb3J0cyBhbiBvYmplY3QgYnkgaXRzIHZhbHVlcyB1c2luZyBhIHVzZXIgZGVmaW5lZCBhbGdvcml0aG0uXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDEyMFxyXG4gKiBAZXhhbXBsZVxyXG4gKiAgdmFyIHdvcmRzQ291bnRlZDtcclxuICogIHdvcmRzQ291bnRlZCA9IHtcclxuICogICAgICBcImRvY3VtZW50M1wiIDogMTUwLFxyXG4gKiAgICAgIFwiZG9jdW1lbnQxXCIgOiAzMDAsXHJcbiAqICAgICAgXCJkb2N1bWVudDJcIiA6IDI1XHJcbiAqICB9O1xyXG4gKiAgLy8gc29ydGluZyBieSB2YWx1ZXMgYXMgbnVtYmVyc1xyXG4gKiAgZnVuY3Rpb24gc29ydEZuKGEsIGIpIHtcclxuICogICAgICByZXR1cm4gYSAtIGI7XHJcbiAqICB9XHJcbiAqICBjb25zb2xlLmxvZyggYXRyb3BhLm9iamVjdHMuc29ydFZhbHVlcyh3b3Jkc0NvdW50ZWQsIHNvcnRGbikgKTtcclxuICogIC8vIGxvZ3M6IFtbXCJkb2N1bWVudDJcIiwgMjVdLCBbXCJkb2N1bWVudDNcIiwgMTUwXSwgW1wiZG9jdW1lbnQxXCIsIDMwMF1dXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogQW4gb2JqZWN0LlxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBzb3J0Rm4gVGhlIHNvcnRpbmcgZnVuY3Rpb24uIFRoaXMgZnVuY3Rpb24gd2lsbFxyXG4gKiAgYmUgZ2l2ZW4gdHdvIGFyZ3VtZW50cy4gQ29tcGFyZSB0aGUgdHdvIGFyZ3VtZW50cyBhbmQgcmV0dXJuOlxyXG4gKiAgMCBpZiB0aGV5IGFyZSBlcXVhbCwgZ3JlYXRlciB0aGFuIHplcm8gaWYgdGhlIGZpcnN0IGFyZ3VtZW50XHJcbiAqICBpcyBncmVhdGVyIHRoYW4gdGhlIHNlY29uZCwgb3IgbGVzcyB0aGFuIHplcm8gaWYgdGhlIHNlY29uZFxyXG4gKiAgYXJndW1lbnQgaXMgZ3JlYXRlciB0aGFuIHRoZSBmaXJzdC5cclxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGFuIGFycmF5IG9mIGFycmF5cyB3aGVyZSBlYWNoXHJcbiAqICBuZXN0ZWQgYXJyYXkgd2lsbCBoYXZlIHRoZSBvYmplY3RzIGtleSBzdG9yZWQgaW4gZWxlbWVudCAwIGFuZFxyXG4gKiAgdGhlIHZhbHVlIHN0b3JlZCBpbiBlbGVtZW50IDEuXHJcbiAqIEBzZWUgYXRyb3BhLm9iamVjdHMuc29ydFxyXG4gKi9cclxuYXRyb3BhLm9iamVjdHMuc29ydFZhbHVlcyA9IGZ1bmN0aW9uIHNvcnRWYWx1ZXMob2JqLCBzb3J0Rm4pIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgdmFyIHZhbFNvcnQgPSBmdW5jdGlvbihhLCBiKSB7XHJcbiAgICAgICAgcmV0dXJuIHNvcnRGbihhWzFdLCBiWzFdKTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gYXRyb3BhLm9iamVjdHMuc29ydChvYmosIHZhbFNvcnQpO1xyXG59O1xyXG4vKipcclxuICogU29ydHMgYW4gb2JqZWN0IGJ5IGl0cyBwcm9wZXJ0aWVzIHVzaW5nIGEgdXNlciBkZWZpbmVkIGFsZ29yaXRobS5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwMTIwXHJcbiAqIEBleGFtcGxlXHJcbiAqICB2YXIgd29yZHNDb3VudGVkO1xyXG4gKiAgd29yZHNDb3VudGVkID0ge1xyXG4gKiAgICAgIFwiZG9jdW1lbnQzXCIgOiAxNTAsXHJcbiAqICAgICAgXCJkb2N1bWVudDFcIiA6IDMwMCxcclxuICogICAgICBcImRvY3VtZW50MlwiIDogMjVcclxuICogIH07XHJcbiAqICAvLyBzb3J0aW5nIGJ5IHByb3BlcnR5IG5hbWVzIGFzIHN0cmluZ3NcclxuICogIGZ1bmN0aW9uIHNvcnRGbihhLCBiKSB7XHJcbiAqICAgICAgcmV0dXJuIGEubG9jYWxlQ29tcGFyZShiKTtcclxuICogIH1cclxuICogIGNvbnNvbGUubG9nKCBhdHJvcGEub2JqZWN0cy5zb3J0UHJvcGVydGllcyh3b3Jkc0NvdW50ZWQsIHNvcnRGbikgKTtcclxuICogIC8vIGxvZ3M6IFtbXCJkb2N1bWVudDFcIiwgMzAwXSwgW1wiZG9jdW1lbnQyXCIsIDI1XSwgW1wiZG9jdW1lbnQzXCIsIDE1MF1dXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogQW4gb2JqZWN0LlxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBzb3J0Rm4gVGhlIHNvcnRpbmcgZnVuY3Rpb24uIFRoaXMgZnVuY3Rpb24gd2lsbFxyXG4gKiAgYmUgZ2l2ZW4gdHdvIGFyZ3VtZW50cy4gQ29tcGFyZSB0aGUgdHdvIGFyZ3VtZW50cyBhbmQgcmV0dXJuOlxyXG4gKiAgMCBpZiB0aGV5IGFyZSBlcXVhbCwgZ3JlYXRlciB0aGFuIHplcm8gaWYgdGhlIGZpcnN0IGFyZ3VtZW50XHJcbiAqICBpcyBncmVhdGVyIHRoYW4gdGhlIHNlY29uZCwgb3IgbGVzcyB0aGFuIHplcm8gaWYgdGhlIHNlY29uZFxyXG4gKiAgYXJndW1lbnQgaXMgZ3JlYXRlciB0aGFuIHRoZSBmaXJzdC5cclxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGFuIGFycmF5IG9mIGFycmF5cyB3aGVyZSBlYWNoXHJcbiAqICBuZXN0ZWQgYXJyYXkgd2lsbCBoYXZlIHRoZSBvYmplY3RzIGtleSBzdG9yZWQgaW4gZWxlbWVudCAwIGFuZFxyXG4gKiAgdGhlIHZhbHVlIHN0b3JlZCBpbiBlbGVtZW50IDEuXHJcbiAqIEBzZWUgYXRyb3BhLm9iamVjdHMuc29ydFxyXG4gKi9cclxuYXRyb3BhLm9iamVjdHMuc29ydFByb3BlcnRpZXMgPSBmdW5jdGlvbiBzb3J0VmFsdWVzKG9iaiwgc29ydEZuKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHZhciBwcm9wU29ydCA9IGZ1bmN0aW9uKGEsIGIpIHtcclxuICAgICAgICByZXR1cm4gc29ydEZuKGFbMF0sIGJbMF0pO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBhdHJvcGEub2JqZWN0cy5zb3J0KG9iaiwgcHJvcFNvcnQpO1xyXG59O1xyXG4vKipcclxuICogU29ydHMgYW4gb2JqZWN0IGJ5IGl0cyB2YWx1ZXMgbnVtZXJpY2FsbHkuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDEyMFxyXG4gKiBAZXhhbXBsZVxyXG4gKiAgdmFyIHdvcmRzQ291bnRlZDtcclxuICogIHdvcmRzQ291bnRlZCA9IHtcclxuICogICAgICBcImRvY3VtZW50M1wiIDogMTUwLFxyXG4gKiAgICAgIFwiZG9jdW1lbnQxXCIgOiAzMDAsXHJcbiAqICAgICAgXCJkb2N1bWVudDJcIiA6IDI1XHJcbiAqICB9O1xyXG4gKiAgY29uc29sZS5sb2coIGF0cm9wYS5vYmplY3RzLnNvcnRWYWx1ZXNOdW1lcmljYWxseSh3b3Jkc0NvdW50ZWQpICk7XHJcbiAqICAvLyBsb2dzIFtbXCJkb2N1bWVudDJcIiwgMjVdLCBbXCJkb2N1bWVudDNcIiwgMTUwXSwgW1wiZG9jdW1lbnQxXCIsIDMwMF1dXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogQSBzaW1wbGUgb2JqZWN0IHdoZXJlIHRoZSBwcm9wZXJ0aWVzXHJcbiAqICBhbGwgaGF2ZSBudW1lcmljLWlzaCB2YWx1ZXMuXHJcbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBhbiBhcnJheSBvZiBhcnJheXMgd2hlcmUgZWFjaFxyXG4gKiAgbmVzdGVkIGFycmF5IHdpbGwgaGF2ZSB0aGUgb2JqZWN0cyBrZXkgc3RvcmVkIGluIGVsZW1lbnQgMCBhbmRcclxuICogIHRoZSB2YWx1ZSBzdG9yZWQgaW4gZWxlbWVudCAxLlxyXG4gKiBAc2VlIGF0cm9wYS5vYmplY3RzLnNvcnRcclxuICovXHJcbmF0cm9wYS5vYmplY3RzLnNvcnRWYWx1ZXNOdW1lcmljYWxseSA9IGZ1bmN0aW9uIHNvcnRWYWx1ZXNOdW1lcmljYWxseShvYmopIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgZnVuY3Rpb24gc29ydEZuKGEsIGIpIHtcclxuICAgICAgICByZXR1cm4gKGEgLSBiKTtcclxuICAgIH1cclxuICAgIHJldHVybiBhdHJvcGEub2JqZWN0cy5zb3J0VmFsdWVzKG9iaiwgc29ydEZuKTtcclxufTtcclxuLyoqXHJcbiAqIFRocm93cyBhbiBlcnJvciwgPGNvZGU+U3RyaW5nLnByb3RvdHlwZS5sb2NhbGVDb21wYXJlPC9jb2RlPiBpcyBub3QgXHJcbiAqICBzdGFuZGFyZGl6ZWQuXHJcbiAqIFxyXG4gKiAgWWVzLCBsb2NhbGVDb21wYXJlIGlzIGluIHRoZSBzdGFuZGFyZCBidXQsIGF0IHRoaXMgdGltZSB0aGUgYWN0dWFsXHJcbiAqICBjb21wYXJpc29uIGlzIGltcGxlbWVudGF0aW9uIGRlcGVuZGFudC4gVGhpcyBtZWFucyB0aGF0IFwiYWxwaGFiZXRpY2FsIG9yZGVyXCJcclxuICogIGNhbiBiZSBkaWZmZXJlbnQgb24gZGlmZmVyZW50IHBsYXRmb3Jtcy4gV2hhdCBJIGZvdW5kIHdhcyB0aGF0IGluIG5vZGUgdGhlXHJcbiAqICBhcnJheSBvZiA8Y29kZT5bJ2EnLCdaJywnQScsJ3onXTwvY29kZT4gd291bGQgYmUgc29ydGVkIHRvXHJcbiAqICA8Y29kZT5bJ0EnLCdaJywnYScsJ3pcIl08L2NvZGU+LCB3aGlsZSBvblxyXG4gKiAgZmlyZWZveCBpdCB3b3VsZCBiZSBzb3J0ZWQgdG8gPGNvZGU+WydhJywnQScsJ3onLCdaJ108L2NvZGU+LiBXaG8ga25vd3MgaWZcclxuICogIGFub3RoZXIgaW1wbGVtZW50b3Igd291bGQgc29ydCBpdCA8Y29kZT5bJ0EnLCdhJywnWicsJ3onXTwvY29kZT4/XHJcbiAqIFxyXG4gKiBJbiBvcmRlciB0byBwcm92aWRlIGEgcmVsaWFibGUgaW1wbGVtZW50YXRpb24gSSB3b3VsZCBoYXZlIHRvIGNyZWF0ZSBteSBvd25cclxuICogIGltcGxlbWVudGF0aW9uIG9mIDxjb2RlPlN0cmluZy5wcm90b3R5cGUubG9jYWxlQ29tcGFyZTwvY29kZT4gYW5kIHRoYXQnc1xyXG4gKiAganVzdCB0b28gbXVjaCB3b3JrIGZvciBtZSB0byBkbyBhbG9uZS5cclxuICogQHRocm93cyB7RXJyb3J9IFwiU3RyaW5nLnByb3RvdHlwZS5sb2NhbGVDb21wYXJlIGlzIG5vdCBzdGFuZGFyZGl6ZWRcIlxyXG4gKi9cclxuYXRyb3BhLm9iamVjdHMuc29ydFZhbHVlc0FscGhhYmV0aWNhbGx5ID0gZnVuY3Rpb24gc29ydFZhbHVlc0FscGhhYmV0aWNhbGx5KCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJTdHJpbmcucHJvdG90eXBlLmxvY2FsZUNvbXBhcmUgaXMgbm90IHN0YW5kYXJkaXplZFwiKTtcclxufTtcclxuLyoqXHJcbiAqIFNvcnRzIGFuIG9iamVjdCBieSBpdHMgcHJvcGVydGllcyBudW1lcmljYWxseS5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwMTIwXHJcbiAqIEBleGFtcGxlXHJcbiAqICB2YXIgd29yZHNDb3VudGVkO1xyXG4gKiAgd29yZHNDb3VudGVkID0ge1xyXG4gKiAgICAgIFwiM1wiIDogXCJEb2N1bWVudCBBXCIsXHJcbiAqICAgICAgXCIyXCIgOiBcIkRvY3VtZW50IFpcIixcclxuICogICAgICBcIjFcIiA6IFwiRG9jdW1lbnQgTVwiXHJcbiAqICB9O1xyXG4gKiAgY29uc29sZS5sb2coIGF0cm9wYS5vYmplY3RzLnNvcnRQcm9wZXJ0aWVzTnVtZXJpY2FsbHkod29yZHNDb3VudGVkKSApO1xyXG4gKiAgLy8gbG9nczogW1tcIjFcIiwgXCJEb2N1bWVudCBNXCJdLCBbXCIyXCIsIFwiRG9jdW1lbnQgWlwiXSwgW1wiM1wiLCBcIkRvY3VtZW50IEFcIl1dXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogQSBzaW1wbGUgb2JqZWN0IHdoZXJlIHRoZSBwcm9wZXJ0aWVzXHJcbiAqICBhbGwgaGF2ZSBudW1lcmljLWlzaCB2YWx1ZXMuXHJcbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBhbiBhcnJheSBvZiBhcnJheXMgd2hlcmUgZWFjaFxyXG4gKiAgbmVzdGVkIGFycmF5IHdpbGwgaGF2ZSB0aGUgb2JqZWN0cyBrZXkgc3RvcmVkIGluIGVsZW1lbnQgMCBhbmRcclxuICogIHRoZSB2YWx1ZSBzdG9yZWQgaW4gZWxlbWVudCAxLlxyXG4gKiBAc2VlIGF0cm9wYS5vYmplY3RzLnNvcnRcclxuICovXHJcbmF0cm9wYS5vYmplY3RzLnNvcnRQcm9wZXJ0aWVzTnVtZXJpY2FsbHkgPSBmdW5jdGlvbiBzb3J0UHJvcGVydGllc051bWVyaWNhbGx5KFxyXG4gICAgb2JqXHJcbikge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICBmdW5jdGlvbiBzb3J0Rm4oYSwgYikge1xyXG4gICAgICAgIHJldHVybiAoYSAtIGIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGF0cm9wYS5vYmplY3RzLnNvcnRQcm9wZXJ0aWVzKG9iaiwgc29ydEZuKTtcclxufTtcclxuLyoqXHJcbiAqIFRocm93cyBhbiBlcnJvciwgPGNvZGU+U3RyaW5nLnByb3RvdHlwZS5sb2NhbGVDb21wYXJlPC9jb2RlPiBpcyBub3QgXHJcbiAqICBzdGFuZGFyZGl6ZWQuXHJcbiAqIFxyXG4gKiAgWWVzLCBsb2NhbGVDb21wYXJlIGlzIGluIHRoZSBzdGFuZGFyZCBidXQsIGF0IHRoaXMgdGltZSB0aGUgYWN0dWFsXHJcbiAqICBjb21wYXJpc29uIGlzIGltcGxlbWVudGF0aW9uIGRlcGVuZGFudC4gVGhpcyBtZWFucyB0aGF0IFwiYWxwaGFiZXRpY2FsIG9yZGVyXCJcclxuICogIGNhbiBiZSBkaWZmZXJlbnQgb24gZGlmZmVyZW50IHBsYXRmb3Jtcy4gV2hhdCBJIGZvdW5kIHdhcyB0aGF0IGluIG5vZGUgdGhlXHJcbiAqICBhcnJheSBvZiA8Y29kZT5bJ2EnLCdaJywnQScsJ3onXTwvY29kZT4gd291bGQgYmUgc29ydGVkIHRvXHJcbiAqICA8Y29kZT5bJ0EnLCdaJywnYScsJ3pcIl08L2NvZGU+LCB3aGlsZSBvblxyXG4gKiAgZmlyZWZveCBpdCB3b3VsZCBiZSBzb3J0ZWQgdG8gPGNvZGU+WydhJywnQScsJ3onLCdaJ108L2NvZGU+LiBXaG8ga25vd3MgaWZcclxuICogIGFub3RoZXIgaW1wbGVtZW50b3Igd291bGQgc29ydCBpdCA8Y29kZT5bJ0EnLCdhJywnWicsJ3onXTwvY29kZT4/XHJcbiAqIFxyXG4gKiBJbiBvcmRlciB0byBwcm92aWRlIGEgcmVsaWFibGUgaW1wbGVtZW50YXRpb24gSSB3b3VsZCBoYXZlIHRvIGNyZWF0ZSBteSBvd25cclxuICogIGltcGxlbWVudGF0aW9uIG9mIDxjb2RlPlN0cmluZy5wcm90b3R5cGUubG9jYWxlQ29tcGFyZTwvY29kZT4gYW5kIHRoYXQnc1xyXG4gKiAganVzdCB0b28gbXVjaCB3b3JrIGZvciBtZSB0byBkbyBhbG9uZS5cclxuICogQHRocm93cyB7RXJyb3J9IFwiU3RyaW5nLnByb3RvdHlwZS5sb2NhbGVDb21wYXJlIGlzIG5vdCBzdGFuZGFyZGl6ZWRcIlxyXG4gKi9cclxuYXRyb3BhLm9iamVjdHMuc29ydFByb3BlcnRpZXNBbHBoYWJldGljYWxseSA9IFxyXG5mdW5jdGlvbiBzb3J0UHJvcGVydGllc0FscGhhYmV0aWNhbGx5KG9iaikge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJTdHJpbmcucHJvdG90eXBlLmxvY2FsZUNvbXBhcmUgaXMgbm90IHN0YW5kYXJkaXplZFwiKTtcclxufTtcclxuXHJcblxyXG5cclxuXHJcbndoaWxlKGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5sZW5ndGggPiAwKSB7XHJcbiAgICBhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMucG9wKCkoKTtcclxufVxyXG5tb2R1bGUuZXhwb3J0cyA9IGF0cm9wYTtcclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2RvY3MvdnNkb2MvT3BlbkxheWVyc0FsbC5qc1wiLz5cclxudmFyIGF0cm9wYSA9IHJlcXVpcmUoJ2F0cm9wYS1oZWFkZXInKTtcclxuLypqc2xpbnRcclxuICAgIGluZGVudDogNCxcclxuICAgIG1heGVycjogNTAsXHJcbiAgICB3aGl0ZTogdHJ1ZSxcclxuICAgIGJyb3dzZXI6IHRydWUsXHJcbiAgICBkZXZlbDogdHJ1ZSxcclxuICAgIHBsdXNwbHVzOiB0cnVlLFxyXG4gICAgcmVnZXhwOiB0cnVlXHJcbiovXHJcbi8qZ2xvYmFsIGF0cm9wYSAqL1xyXG4vLyBlbmQgaGVhZGVyXHJcblxyXG5hdHJvcGEucmVxdWlyZXMoXHJcbiAgICAncmVtb3ZlTm9kZUJ5UmVmZXJlbmNlJyxcclxuICAgIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgICAgICBpZihkb2N1bWVudCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbik7XHJcblxyXG4vKipcclxuICogUmVtb3ZlcyBET00gTm9kZXMuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEyMDkwOVxyXG4gKiBAZnVuY3Rpb25cclxuICogQHBhcmFtIHtET00gTm9kZX0gZWxlbWVudFJlZmVyZW5jZSBBIHJlZmVyZW5jZSB0byB0aGUgRE9NIE5vZGUgeW91IHdhbnRcclxuICogdG8gcmVtb3ZlLlxyXG4gKi9cclxuYXRyb3BhLnJlbW92ZU5vZGVCeVJlZmVyZW5jZSA9IGZ1bmN0aW9uIChlbGVtZW50UmVmZXJlbmNlKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIGF0cm9wYS5zdXBwb3J0Q2hlY2soJ3JlbW92ZU5vZGVCeVJlZmVyZW5jZScpO1xyXG4gICAgaWYoZWxlbWVudFJlZmVyZW5jZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgZWxlbWVudFJlZmVyZW5jZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsZW1lbnRSZWZlcmVuY2UpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuXHJcblxyXG5cclxud2hpbGUoYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLmxlbmd0aCA+IDApIHtcclxuICAgIGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5wb3AoKSgpO1xyXG59XHJcbm1vZHVsZS5leHBvcnRzID0gYXRyb3BhO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vZG9jcy92c2RvYy9PcGVuTGF5ZXJzQWxsLmpzXCIvPlxyXG52YXIgYXRyb3BhID0gcmVxdWlyZSgnYXRyb3BhLWhlYWRlcicpO1xyXG4vKmpzbGludFxyXG4gICAgaW5kZW50OiA0LFxyXG4gICAgbWF4ZXJyOiA1MCxcclxuICAgIHdoaXRlOiB0cnVlLFxyXG4gICAgYnJvd3NlcjogdHJ1ZSxcclxuICAgIGRldmVsOiB0cnVlLFxyXG4gICAgcGx1c3BsdXM6IHRydWUsXHJcbiAgICByZWdleHA6IHRydWVcclxuKi9cclxuLypnbG9iYWwgYXRyb3BhICovXHJcbi8vIGVuZCBoZWFkZXJcclxuXHJcbi8qKlxyXG4gKiBTZXQgZGVmYXVsdCB2YWx1ZXMgZm9yIG9wdGlvbmFsIGZ1bmN0aW9uIHBhcmFtZXRlcnMuXHJcbiAqIEBleGFtcGxlXHJcbiAqIDxwcmU+XHJcbiAqICAgLy8gVG8gc2V0IGEgZGVmYXVsdCB2YWx1ZSBmb3IgYW4gb3B0aW9uYWwgcGFyYW1ldGVyXHJcbiAqICAgZnVuY3Rpb24ob3B0aW9uYWxBcmcpIHtcclxuICogICAgICAgdmFyIGRlZmF1bHRWYWwgPSAnaGVsbG8gdGhlcmUhJztcclxuICogICAgICAgb3B0aW9uYWxBcmcgPSBhdHJvcGEuc2V0QXNPcHRpb25hbEFyZyhkZWZhdWx0VmFsLCBvcHRpb25hbEFyZyk7XHJcbiAqICAgICAgIHJldHVybiBvcHRpb25hbEFyZztcclxuICogICB9XHJcbiAqIDwvcHJlPlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMjA5MDlcclxuICogQHBhcmFtIHtNaXhlZH0gZGVmYXVsdFZhbCBUaGUgZGVmYXVsdCB2YWx1ZSB0byBzZXQuXHJcbiAqIEBwYXJhbSB7TWl4ZWR9IG9wdGlvbmFsQXJnIEEgcmVmZXJlbmNlIHRvIHRoZSBvcHRpb25hbCBhcmd1bWVudC5cclxuICogQHJldHVybnMge01peGVkfSBSZXR1cm5zIHRoZSBkZWZhdWx0IHZhbHVlIHN1cHBsaWVkIHdoZW4gdGhlIG9wdGlvbmFsXHJcbiAqIGFyZ3VtZW50IGlzIHVuZGVmaW5lZCBvciBudWxsLiBPdGhlcndpc2UsIHRoZSBzdXBwbGllZCBvcHRpb25hbCBhcmd1bWVudFxyXG4gKiBpcyByZXR1cm5lZC5cclxuICovXHJcbmF0cm9wYS5zZXRBc09wdGlvbmFsQXJnID0gZnVuY3Rpb24gKGRlZmF1bHRWYWwsIG9wdGlvbmFsQXJnKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIGlmIChvcHRpb25hbEFyZyA9PT0gdW5kZWZpbmVkIHx8IG9wdGlvbmFsQXJnID09PSBudWxsKSB7XHJcbiAgICAgICAgb3B0aW9uYWxBcmcgPSBkZWZhdWx0VmFsO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG9wdGlvbmFsQXJnO1xyXG59O1xyXG5cclxuXHJcblxyXG5cclxud2hpbGUoYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLmxlbmd0aCA+IDApIHtcclxuICAgIGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5wb3AoKSgpO1xyXG59XHJcbm1vZHVsZS5leHBvcnRzID0gYXRyb3BhO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vZG9jcy92c2RvYy9PcGVuTGF5ZXJzQWxsLmpzXCIvPlxyXG52YXIgYXRyb3BhID0gcmVxdWlyZSgnYXRyb3BhLWhlYWRlcicpO1xyXG4vKmpzbGludFxyXG4gICAgaW5kZW50OiA0LFxyXG4gICAgbWF4ZXJyOiA1MCxcclxuICAgIHdoaXRlOiB0cnVlLFxyXG4gICAgYnJvd3NlcjogdHJ1ZSxcclxuICAgIGRldmVsOiB0cnVlLFxyXG4gICAgcGx1c3BsdXM6IHRydWUsXHJcbiAgICByZWdleHA6IHRydWVcclxuKi9cclxuLypnbG9iYWwgYXRyb3BhICovXHJcbi8vIGVuZCBoZWFkZXJcclxuXHJcbi8qKlxyXG4gKiBVdGlsaXRpZXMgZm9yIGhhbmRsaW5nIHVybHMuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDcxM1xyXG4gKiBAbmFtZXNwYWNlIFV0aWxpdGllcyBmb3IgaGFuZGxpbmcgdXJscy5cclxuICovXHJcbmF0cm9wYS51cmwgPSB7fTtcclxuLyoqXHJcbiAqIEdldHMgdGhlIGZpbGVuYW1lIHBvcnRpb24gb2YgYSB1cmxcclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSB1cmwgVGhlIHVybC5cclxuICogQHJldHVybnMge1N0cmluZ30gUmV0dXJucyBldmVyeXRoaW5nIGFmdGVyIHRoZSBsYXN0IC8gaW4gdGhlIHVybC5cclxuICovXHJcbmF0cm9wYS51cmwuZ2V0RmlsZW5hbWUgPSBmdW5jdGlvbih1cmwpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgdmFyIGZpbGVuYW1lO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBmaWxlbmFtZSA9IFN0cmluZyh1cmwpLnJlcGxhY2UoLy4qOlxcL1xcL1teXFwvXSsvLCAnJykucmVwbGFjZSgvWyN8P10uKiQvLCAnJykubWF0Y2goL1teXFwvXSskLylbMF07XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgZmlsZW5hbWUgPSAnJztcclxuICAgIH1cclxuICAgIGlmKHVybCA9PT0gZmlsZW5hbWUpIHtcclxuICAgICAgICBmaWxlbmFtZSA9ICcnO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZpbGVuYW1lO1xyXG59O1xyXG5cclxuXHJcblxyXG5cclxud2hpbGUoYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLmxlbmd0aCA+IDApIHtcclxuICAgIGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5wb3AoKSgpO1xyXG59XHJcbm1vZHVsZS5leHBvcnRzID0gYXRyb3BhO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vZG9jcy92c2RvYy9PcGVuTGF5ZXJzQWxsLmpzXCIvPlxyXG52YXIgYXRyb3BhID0gcmVxdWlyZSgnYXRyb3BhLWhlYWRlcicpO1xyXG5hdHJvcGEuc2V0QXNPcHRpb25hbEFyZyA9IHJlcXVpcmUoJ2F0cm9wYS1zZXRBc09wdGlvbmFsQXJnJykuc2V0QXNPcHRpb25hbEFyZztcclxuLypqc2xpbnRcclxuICAgIGluZGVudDogNCxcclxuICAgIG1heGVycjogNTAsXHJcbiAgICB3aGl0ZTogdHJ1ZSxcclxuICAgIGJyb3dzZXI6IHRydWUsXHJcbiAgICBkZXZlbDogdHJ1ZSxcclxuICAgIHBsdXNwbHVzOiB0cnVlLFxyXG4gICAgcmVnZXhwOiB0cnVlXHJcbiovXHJcbi8qZ2xvYmFsIGF0cm9wYSAqL1xyXG4vLyBlbmQgaGVhZGVyXHJcblxyXG4vKipcclxuICogUG9sbGluZyBmdW5jdGlvbnMgZm9yIHF1aWNrIGFuZCBzbG9wcHkgd29yay5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTIwOTA5XHJcbiAqIEBuYW1lc3BhY2UgUG9sbGluZyBmdW5jdGlvbnMgZm9yIHF1aWNrIGFuZCBzbG9wcHkgd29yay5cclxuICovXHJcbmF0cm9wYS53YWl0Rm9yID0ge307XHJcbi8qKlxyXG4gKiBHZW5lcmljIFdhaXQgZm9yIHRydWUuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEyMDkwOVxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSB0ZXN0Rm4gQSBmdW5jdGlvbiB0byB0ZWxsIHdoZW4gdGhlIHdhaXQgaXMgb3Zlci4gTXVzdFxyXG4gKiAgcmV0dXJuIHRydWUgb24gc3VjY2VzcywgZmFsc2Ugb24gZmFpbHVyZS5cclxuICogQHBhcmFtIHtGdW5jdGlvbn0gb25TdWNjZXNzQ2FsbGJhY2sgT3B0aW9uYWwuIFRoZSBmdW5jdGlvbiB0byBydW4gd2hlbiB0ZXN0Rm5cclxuICogIHJldHVybnMgdHJ1ZS4gRGVmYXVsdHMgdG8gPGNvZGU+ZnVuY3Rpb24gKCkge30gPC9jb2RlPlxyXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBvbk1heFBvbGxDYWxsYmFjayBPcHRpb25hbC4gVGhlIGZ1bmN0aW9uIHRvIHJ1biB3aGVuIHRlc3RGblxyXG4gKiAgaGFzIGJlZW4gcnVuIG1heFBvbGwgdGltZXMgYW5kIHRoZSB3YWl0IGlzIGJlaW5nIGdpdmVuIHVwLlxyXG4gKiBEZWZhdWx0cyB0byA8Y29kZT5mdW5jdGlvbiAoKSB7fTwvY29kZT5cclxuICogQHBhcmFtIHtJbnRlZ2VyfSBwb2xsSW50ZXJ2YWwgT3B0aW9uYWwuIFRoZSBhbW91bnQgb2YgdGltZSBpbiBtcyBiZXR3ZWVuXHJcbiAqICBwb2xsaW5nIHRlc3RGbiB0byBzZWUgaWYgaXQgcmV0dXJucyB0cnVlLiBEZWZhdWx0cyB0byAyMDBtcy5cclxuICogQHBhcmFtIHtJbnRlZ2VyfSBtYXhQb2xsIE9wdGlvbmFsLiBUaGUgcXVhbnRpdHkgb2YgcG9sbHMgYXQgd2hpY2ggaXQgbWFrZXNcclxuICogIHNlbnNlIHRvIGdpdmUgdXAgd2FpdGluZy4gRGVmYXVsdHMgdG8gNTAuXHJcbiAqL1xyXG5hdHJvcGEud2FpdEZvci50ZXN0ID0gZnVuY3Rpb24gdGVzdChcclxuICAgIHRlc3RGbiwgb25TdWNjZXNzQ2FsbGJhY2ssIG9uTWF4UG9sbENhbGxiYWNrLCBwb2xsSW50ZXJ2YWwsIG1heFBvbGxcclxuKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHBvbGxJbnRlcnZhbCA9IGF0cm9wYS5zZXRBc09wdGlvbmFsQXJnKDIwMCwgcG9sbEludGVydmFsKTtcclxuICAgIG1heFBvbGwgPSBhdHJvcGEuc2V0QXNPcHRpb25hbEFyZyg1MCwgbWF4UG9sbCk7XHJcbiAgICBvbk1heFBvbGxDYWxsYmFjayA9IGF0cm9wYS5zZXRBc09wdGlvbmFsQXJnKGF0cm9wYS5ub3AsIG9uTWF4UG9sbENhbGxiYWNrKTtcclxuICAgIG9uU3VjY2Vzc0NhbGxiYWNrID0gYXRyb3BhLnNldEFzT3B0aW9uYWxBcmcoYXRyb3BhLm5vcCwgb25TdWNjZXNzQ2FsbGJhY2spO1xyXG4gICAgdmFyIG15SW50O1xyXG4gICAgdmFyIG15Q291bnRlciA9IDA7XHJcbiAgICBmdW5jdGlvbiB3YWl0Rm9yVGVzdFJlY3Vyc29yICgpIHtcclxuICAgICAgICBteUNvdW50ZXIrKztcclxuICAgICAgICBpZiAodGVzdEZuKCkpIHtcclxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChteUludCk7XHJcbiAgICAgICAgICAgIG9uU3VjY2Vzc0NhbGxiYWNrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChteUNvdW50ZXIgPT09IG1heFBvbGwpIHtcclxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChteUludCk7XHJcbiAgICAgICAgICAgIG9uTWF4UG9sbENhbGxiYWNrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgbXlJbnQgPSBzZXRJbnRlcnZhbCh3YWl0Rm9yVGVzdFJlY3Vyc29yLCBwb2xsSW50ZXJ2YWwpO1xyXG59O1xyXG4vKipcclxuICogV2FpdCBmb3IgRWxlbWVudFxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMjA5MDlcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gdGVzdEZuIEEgZnVuY3Rpb24gd2hpY2ggcmV0dXJucyBhIHJlZmVyZW5jZSB0byBhbiBIVE1MXHJcbiAqICBFbGVtZW50LlxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBPcHRpb25hbC4gb25TdWNjZXNzQ2FsbGJhY2tcclxuICogQHBhcmFtIHtmdW5jdGlvbn0gT3B0aW9uYWwuIG9uTWF4UG9sbENhbGxiYWNrIFxyXG4gKiBAcGFyYW0ge0ludGVnZXJ9IE9wdGlvbmFsLiBwb2xsSW50ZXJ2YWxcclxuICogQHBhcmFtIHtJbnRlZ2VyfSBPcHRpb25hbC4gbWF4UG9sbFxyXG4gKiBAc2VlIGF0cm9wYS53YWl0Rm9yLnRlc3QgZm9yIG1vcmUgaW5mb3JtYXRpb24gYW5kIGRlZmF1bHQgdmFsdWVzIGZvciB0aGVcclxuICogIG9wdGlvbmFsIHBhcmFtZXRlcnMuXHJcbiAqL1xyXG5hdHJvcGEud2FpdEZvci5lbGVtZW50ID0gZnVuY3Rpb24gKFxyXG4gICAgdGVzdEZuLCBvblN1Y2Nlc3NDYWxsYmFjaywgb25NYXhQb2xsQ2FsbGJhY2ssIHBvbGxJbnRlcnZhbCwgbWF4UG9sbFxyXG4pIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIEhUTUwgRE9NIERvY3VtZW50IGFuZCBwdXRzIGl0IGluIHRoZSBkb2N1bWVudFxyXG4gICAgICogcXVldWUsIHRoZW4gZXhlY3V0ZXMgdGhlIGNhbGxiYWNrIGdpdmVuLlxyXG4gICAgICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAgICAgKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICAgICAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICAgICAqIEB2ZXJzaW9uIDIwMTIwOTA5XHJcbiAgICAgKiBAbWV0aG9kT2YgYXRyb3BhLndhaXRGb3IuZWxlbWVudC1cclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gUmV0dXJucyB0cnVlIG9yIGZhbHNlIGRlcGVuZGluZyBvbiB3aGV0aGVyIHRoZSBvYmplY3RcclxuICAgICAqICBoYXMgYSB0YWcgbmFtZSBwcm9wZXJ0eS5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gZWxlbWVudFRlc3QgKCkge1xyXG4gICAgICAgIHJldHVybiBhdHJvcGEuaW5xdWlyZS5oYXNQcm9wZXJ0eSh0ZXN0Rm4oKSwgJ3RhZ05hbWUnKTtcclxuICAgIH1cclxuICAgIGF0cm9wYS53YWl0Rm9yLnRlc3QoXHJcbiAgICAgICAgZWxlbWVudFRlc3QsIG9uU3VjY2Vzc0NhbGxiYWNrLCBvbk1heFBvbGxDYWxsYmFjaywgcG9sbEludGVydmFsLCBtYXhQb2xsXHJcbiAgICApO1xyXG59O1xyXG5cclxuXHJcblxyXG5cclxud2hpbGUoYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLmxlbmd0aCA+IDApIHtcclxuICAgIGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5wb3AoKSgpO1xyXG59XHJcbm1vZHVsZS5leHBvcnRzID0gYXRyb3BhO1xyXG4iLCJtb2R1bGUuZXhwb3J0cz17XHJcbiAgXCJhZGFwdFwiOiBcImFkb3B0XCIsXHJcbiAgXCJhZGFwdGF0aW9uXCI6IFwiYWRhcHRpb25cIixcclxuICBcImFkYXB0ZWRcIjogXCJhZG9wdGVkXCIsXHJcbiAgXCJhZG1pbmlzdGVyXCI6IFwibWluaXN0ZXJcIixcclxuICBcImFkbWl0dGFuY2VcIjogXCJhZG1pc3Npb25cIixcclxuICBcImFkdmljZVwiOiBcImJ1bGxzaGl0XCIsXHJcbiAgXCJhZXN0aGV0aWNcIjogXCJhc2NldGljXCIsXHJcbiAgXCJhZmZlY3RcIjogXCJlZmZlY3RcIixcclxuICBcImFncmVlbWVudFwiOiBcImFncmVlYW5jZVwiLFxyXG4gIFwiYWlkXCI6IFwiYWlkZVwiLFxyXG4gIFwiYWlkZVwiOiBcImFpZFwiLFxyXG4gIFwiYWlyXCI6IFwiZXJyXCIsXHJcbiAgXCJhaXNsZVwiOiBcImlzbGVcIixcclxuICBcImFsbFwiOiBcImJhbGxcIixcclxuICBcImFsbG93ZWRcIjogXCJhbG91ZFwiLFxyXG4gIFwiYWxsdWRlXCI6IFwicmVmZXJcIixcclxuICBcImFsb25lXCI6IFwiZWNzdGF0aWNcIixcclxuICBcImFsb3VkXCI6IFwiYWxsb3dlZFwiLFxyXG4gIFwiYWx0ZXJuYXRlXCI6IFwiYWx0ZXJuYXRpdmVcIixcclxuICBcImFsd2F5cyBsb3ZlIHlvdSB0aGUgc2FtZVwiOiBcImFsd2F5cyBsb3ZlIHlvdSBsaWtlIG15IG90aGVyIHN1Y2tlcnNcIixcclxuICBcImFsd2F5c1wiOiBcInVzdWFsbHlcIixcclxuICBcImFtIGlcIjogXCJhcmUgaVwiLFxyXG4gIFwiYW1iaWd1b3VzXCI6IFwiYW1iaXZhbGVudFwiLFxyXG4gIFwiYW1pZHN0XCI6IFwiYWxsIHVwIGluXCIsXHJcbiAgXCJhbW9uZ3N0XCI6IFwiYW1vbmdcIixcclxuICBcImFuYWx5c2lzXCI6IFwiYW5hbHl6YXRpb25cIixcclxuICBcImFuY2llbnRcIjogXCJlbGRlcmx5XCIsXHJcbiAgXCJhbmVjZG90ZVwiOiBcImFudGlkb3RlXCIsXHJcbiAgXCJhbmdlbFwiOiBcIndyZXN0bGVyXCIsXHJcbiAgXCJhbmdlbGljIGRlbW9uXCI6IFwidmlsbGFub3VzIHdyZXN0bGVyXCIsXHJcbiAgXCJhbnRcIjogXCJhdW50XCIsXHJcbiAgXCJhbnl3YXlzXCI6IFwiYW55d2lzZVwiLFxyXG4gIFwiYXBvY2FseXBzZVwiOiBcInBhcnR5IHRpbWVcIixcclxuICBcImFwcHJhaXNlXCI6IFwiYXBwcmlzZVwiLFxyXG4gIFwiYXByb3Bvc1wiOiBcImFwcHJvcHJpYXRlXCIsXHJcbiAgXCJhcmNcIjogXCJhcmtcIixcclxuICBcImFyY2FuZVwiOiBcImZvb2xpc2hcIixcclxuICBcImFyZHVvdXNcIjogXCJub3QgZWFzeVwiLFxyXG4gIFwiYXJrXCI6IFwiYXJjXCIsXHJcbiAgXCJhcyB3ZWxsXCI6IFwiYWxzb1wiLFxyXG4gIFwiYXNwaGl4aWF0ZVwiOiBcImZpbml4aWF0ZVwiLFxyXG4gIFwiYXNzdXJlXCI6IFwiZW5zdXJlXCIsXHJcbiAgXCJhc3RpZ21hdGlzbVwiOiBcInN0aWdtYXRpc21cIixcclxuICBcImF0ZVwiOiBcImVpZ2h0XCIsXHJcbiAgXCJhdHRhY2hlZFwiOiBcImF0dGFja2VkXCIsXHJcbiAgXCJhdHRpY1wiOiBcImFudXNcIixcclxuICBcImF1ZGl0aW9uXCI6IFwiYXVjdGlvblwiLFxyXG4gIFwiYXVudFwiOiBcImFudFwiLFxyXG4gIFwiYXVyYVwiOiBcInN0ZW5jaFwiLFxyXG4gIFwiYXZlbmdlXCI6IFwiZ2l0IHJvd2R5IGZvclwiLFxyXG4gIFwiYXdlXCI6IFwiZmVhcmZ1bCByZXZlcmVuY2VcIixcclxuICBcImJhYnkgaWZcIjogXCJsb29rIGJpdGNoLFwiLFxyXG4gIFwiYmFjayBzdGFiXCI6IFwicnVtcCBzaGFrZVwiLFxyXG4gIFwiYmFjayBzdGFiYlwiOiBcInJ1bXAgc2hha2VcIixcclxuICBcImJhZFwiOiBcIm1hZFwiLFxyXG4gIFwiYmFkbHlcIjogXCJwb29ybHlcIixcclxuICBcImJhZ2VsXCI6IFwiYmFieVwiLFxyXG4gIFwiYmFoXCI6IFwiYmFnXCIsXHJcbiAgXCJiYWxhbmNlZCBpbmRpdmlkdWFsXCI6IFwicHN5Y2hvXCIsXHJcbiAgXCJiYWxhbmNlZCBtYW5cIjogXCJwc3ljaG9cIixcclxuICBcImJhbGFuY2VkIHBlcnNvblwiOiBcInBzeWNob1wiLFxyXG4gIFwiYmFsYW5jZWQgd29tYW5cIjogXCJwc3ljaG9cIixcclxuICBcImJhbGxcIjogXCJhbGxcIixcclxuICBcImJhbGxhZFwiOiBcInNhbGFkXCIsXHJcbiAgXCJiYW5uZXJzXCI6IFwibWFubmVyc1wiLFxyXG4gIFwiYmFyZVwiOiBcImJlYXJcIixcclxuICBcImJhc2VcIjogXCJiYXNzXCIsXHJcbiAgXCJiYXNzXCI6IFwiYmFzZVwiLFxyXG4gIFwiYmF0dGxlXCI6IFwic3F1YWJibGVcIixcclxuICBcImJheVwiOiBcInNpbmtcIixcclxuICBcImJlIHRvZ2V0aGVyXCI6IFwibWFzaCB1cFwiLFxyXG4gIFwiYmVcIjogXCJiZWVcIixcclxuICBcImJlYWNoXCI6IFwiYmVlY2hcIixcclxuICBcImJlYW5zXCI6IFwiamVhbnNcIixcclxuICBcImJlYXJcIjogXCJiYXJlXCIsXHJcbiAgXCJiZWFzdFwiOiBcImVyZWN0aW9uXCIsXHJcbiAgXCJiZWF0XCI6IFwiYmVldFwiLFxyXG4gIFwiYmVhdXJvY3JhdHNcIjogXCJiZWF1cm9jcmFwc1wiLFxyXG4gIFwiYmVhdXRpZnVsIGZhY2VcIjogXCJlbm9ybW91cyBmZWV0XCIsXHJcbiAgXCJiZWF1dGlmdWxcIjogXCJnYXVkeVwiLFxyXG4gIFwiYmVkZGluZ1wiOiBcIndlZGRpbmdcIixcclxuICBcImJlZVwiOiBcImJlXCIsXHJcbiAgXCJiZWVjaFwiOiBcImJlYWNoXCIsXHJcbiAgXCJiZWV0XCI6IFwiYmVhdFwiLFxyXG4gIFwiYmVob2xkXCI6IFwib29nbGVcIixcclxuICBcImJlbGlldmVcIjogXCJidXlcIixcclxuICBcImJlbGxzXCI6IFwid2VsbHNcIixcclxuICBcImJlbGx5XCI6IFwiamVsbHlcIixcclxuICBcImJlcnJ5XCI6IFwiYnVyeVwiLFxyXG4gIFwiYmVydGhcIjogXCJiaXJ0aFwiLFxyXG4gIFwiYmVzdFwiOiBcImFkZXF1YXRlXCIsXHJcbiAgXCJiZXRyYXlcIjogXCJjYXRmaXNoXCIsXHJcbiAgXCJiZXRyYXlhbFwiOiBcImdhbWVcIixcclxuICBcImJpZyBicm90aGVyXCI6IFwibXkgcGFyYW5vaWFcIixcclxuICBcImJpbmRcIjogXCJjb2RkbGVcIixcclxuICBcImJpb25pY1wiOiBcImJpc29udG9uaWNhbFwiLFxyXG4gIFwiYmlydGhcIjogXCJiZXJ0aFwiLFxyXG4gIFwiYml0ZVwiOiBcImJ5dGVcIixcclxuICBcImJsYWNrXCI6IFwieWVsbG93XCIsXHJcbiAgXCJibGFja2VuZWQgd2FsbHNcIjogXCJmaWx0aHkgcm9vbXNcIixcclxuICBcImJsYWRlXCI6IFwiaGFuZGxlXCIsXHJcbiAgXCJibGVlZFwiOiBcIndoaW5lXCIsXHJcbiAgXCJibGVzc2VkIGJlXCI6IFwic3VjayBlZ2dzXCIsXHJcbiAgXCJibGV3XCI6IFwiYmx1ZVwiLFxyXG4gIFwiYmxvb2RcIjogXCJncmVhc2VcIixcclxuICBcImJsb3dcIjogXCJjcm93XCIsXHJcbiAgXCJibHVlXCI6IFwiYmxld1wiLFxyXG4gIFwiYmx1c2hpbmdcIjogXCJjcnVzaGluZ1wiLFxyXG4gIFwiYm9hclwiOiBcImJyZVwiLFxyXG4gIFwiYm9kaWVzXCI6IFwiamlnZ2xpbmcgcGlsZXNcIixcclxuICBcImJvZHlcIjogXCJqaWdnbGluZyBjbHVtcFwiLFxyXG4gIFwiYm9yZVwiOiBcImJvYXJcIixcclxuICBcImJvdWdoXCI6IFwiYm93XCIsXHJcbiAgXCJib3VnaHRcIjogXCJib3VnaHRlblwiLFxyXG4gIFwiYm91bmRcIjogXCJjb2RkbGVkXCIsXHJcbiAgXCJib3dlbFwiOiBcImZvdWxcIixcclxuICBcImJvd2xcIjogXCJzb3VsXCIsXHJcbiAgXCJib3kgbWVldHMgZ2lybFwiOiBcInJ1YmJlciBtZWV0cyByb2FkXCIsXHJcbiAgXCJicmFrZVwiOiBcImJyZWFrXCIsXHJcbiAgXCJicmVhZFwiOiBcImJyZWRcIixcclxuICBcImJyZWFrXCI6IFwiYmVhdFwiLFxyXG4gIFwiYnJlYXRoXCI6IFwiYXdrd2FyZCBwYXVzZVwiLFxyXG4gIFwiYnJlYXRoZVwiOiBcInBhdXNlIGF3a3dhcmRseVwiLFxyXG4gIFwiYnJlZXplXCI6IFwiZHJhZnRcIixcclxuICBcImJyaWxsaWFuY2VcIjogXCJzaGlueW5lc3NcIixcclxuICBcImJyaWxsaWFudFwiOiBcInNoaW55XCIsXHJcbiAgXCJicmluZyBmb3J0aFwiOiBcIndoaXAgb3V0XCIsXHJcbiAgXCJicmlua1wiOiBcImJvcmRlclwiLFxyXG4gIFwiYnJvYWNoXCI6IFwiYnJvb2NoXCIsXHJcbiAgXCJicm9rZVwiOiBcImJlYXRcIixcclxuICBcImJyb2tlblwiOiBcImJlYXRlblwiLFxyXG4gIFwiYnJvd3NcIjogXCJicm93c2VcIixcclxuICBcImJ1YmJsaW5nXCI6IFwiYmFiYmxpbmdcIixcclxuICBcImJ1bm55XCI6IFwibW9uZXlcIixcclxuICBcImJ1b3lcIjogXCJib3lcIixcclxuICBcImJ1cnJvd1wiOiBcImJ1cnJvXCIsXHJcbiAgXCJidXJ5XCI6IFwiYmVycnlcIixcclxuICBcImJ1c3lcIjogXCJkaXp6eVwiLFxyXG4gIFwiYnV0dGVyZmx5XCI6IFwiZmx1dHRlciBieVwiLFxyXG4gIFwiYnV5XCI6IFwiYnlcIixcclxuICBcImJ5IGhlciBzaWRlXCI6IFwib24gaGVyIGJhY2tcIixcclxuICBcImJ5IGhpcyBzaWRlXCI6IFwib24gaGlzIGJhY2tcIixcclxuICBcImJ5IG15IHNpZGVcIjogXCJvbiBteSBiYWNrXCIsXHJcbiAgXCJieSB5b3VyIHNpZGVcIjogXCJvbiB5b3VyIGJhY2tcIixcclxuICBcImJ5ZVwiOiBcImV5ZVwiLFxyXG4gIFwiYnl0ZVwiOiBcImJpdGVcIixcclxuICBcImNhbid0IGJlIHdpdGhvdXRcIjogXCJ0b3VjaCBteXNlbGYgYWJvdXRcIixcclxuICBcImNhbid0IGZpbmQgdGhlIHdvcmRzIHRvIHNheVwiOiBcImNvdWxkIGJsdXJ0IG91dCBzb21lIGR1bWIgc2hpdFwiLFxyXG4gIFwiY2FuJ3QgbGl2ZSB3aXRob3V0XCI6IFwidG91Y2ggbXlzZWxmIGFib3V0XCIsXHJcbiAgXCJjYW5kbGVcIjogXCJnbG93c3RpY2tcIixcclxuICBcImNhcHR1cmVcIjogXCJjYXB0aXZhdGVcIixcclxuICBcImNhcmUgdG8gZ2l2ZVwiOiBcInNoaXQgdG8gZ2l2ZVwiLFxyXG4gIFwiY2FyZVwiOiBcImdpdmUgYSBzaGl0XCIsXHJcbiAgXCJjYXJlZFwiOiBcImdhdmUgYSBzaGl0XCIsXHJcbiAgXCJjYXJlZW5cIjogXCJjYXJlZXJcIixcclxuICBcImNhcmluZ1wiOiBcImdpdmluZyBhIHNoaXRcIixcclxuICBcImNhc3RsZVwiOiBcImNoYXRlYXVcIixcclxuICBcImNhdXN0aWNcIjogXCJjcmFzdGljXCIsXHJcbiAgXCJjZWxsXCI6IFwic2VsbFwiLFxyXG4gIFwiY2VudFwiOiBcInNlbnRcIixcclxuICBcImNlcmVhbFwiOiBcInNlcmlhbFwiLFxyXG4gIFwiY2hhbmdlIG9uZSB0aGluZ1wiOiBcInJ1aW4gZXZlcnl0aGluZ1wiLFxyXG4gIFwiY2hlZWtcIjogXCJydW1wXCIsXHJcbiAgXCJjaGlsaVwiOiBcImNoaWxseVwiLFxyXG4gIFwiY2hpbmVzZVwiOiBcImNoaWxkcmVuXCIsXHJcbiAgXCJjaGlwXCI6IFwiZmxpcFwiLFxyXG4gIFwiY2hvcmRcIjogXCJjb3JkXCIsXHJcbiAgXCJjaHJpc3RcIjogXCJKb2huIERvZSBqclwiLFxyXG4gIFwiY2hyb21vc29tZXNcIjogXCJrcm9tby1zdG9uZXNcIixcclxuICBcImNpdGVcIjogXCJzaXRlXCIsXHJcbiAgXCJjaXZpY1wiOiBcImNpdmlsXCIsXHJcbiAgXCJjbGFzc2ljXCI6IFwiY2xhc3NpY2FsXCIsXHJcbiAgXCJjbGlmZi1oYW5nZXJcIjogXCJjbGlmZi1kd2VsbGVyXCIsXHJcbiAgXCJjbG9zZVwiOiBcImNsb3RoZXNcIixcclxuICBcImNsb3VkXCI6IFwiYmFsbG9vblwiLFxyXG4gIFwiY29mZmluXCI6IFwidG9ib2dhblwiLFxyXG4gIFwiY29sZFwiOiBcImZ1enp5XCIsXHJcbiAgXCJjb2xsYWJvcmF0ZVwiOiBcImNvcnJvYm9yYXRlXCIsXHJcbiAgXCJjb2xsZWN0ZWRcIjogXCJjb2xsZWN0aXZlXCIsXHJcbiAgXCJjb2xsZWdlXCI6IFwiY29sbGFnZVwiLFxyXG4gIFwiY29tZWRpY1wiOiBcImNvbWljYWxcIixcclxuICBcImNvbW1lbnRhdGVcIjogXCJjb21tZW50XCIsXHJcbiAgXCJjb21wbGVtZW50XCI6IFwiY29tcGxpbWVudFwiLFxyXG4gIFwiY29tcHJlaGVuc2lvblwiOiBcImFwcHJlaGVuc2lvblwiLFxyXG4gIFwiY29tcHJpc2VkXCI6IFwiY29tcG9zZWRcIixcclxuICBcImNvbmNlbnRyYXRpb25cIjogXCJjb25zZWNyYXRpb25cIixcclxuICBcImNvbmZpc2NhdGVcIjogXCJjb25maXN0aWNhdGVcIixcclxuICBcImNvbnNjaWVudGlvdXNcIjogXCJjb25zY2lvdXNcIixcclxuICBcImNvbnN1bWVcIjogXCJzdWNrXCIsXHJcbiAgXCJjb25zdW1pbmdcIjogXCJzdWNraW5nXCIsXHJcbiAgXCJjb250cm9sXCI6IFwicGF0cm9sXCIsXHJcbiAgXCJjb252ZXJzZVwiOiBcImNvbnZlcnNhdGVcIixcclxuICBcImNvb3BcIjogXCJjb3VwZVwiLFxyXG4gIFwiY29wIHBvcm5cIjogXCJwb3Bjb3JuXCIsXHJcbiAgXCJjb3Jwc2VcIjogXCJtYW5uZXF1aW5cIixcclxuICBcImNvcnB1c2NsZXNcIjogXCJjb3Jwc3Vja2Vsc1wiLFxyXG4gIFwiY29ycmVjdFwiOiBcImNhdHJlY3RhbFwiLFxyXG4gIFwiY291bGQgZG8gYW55dGhpbmdcIjogXCJlbWJyYWNpbmcgbWFuaWFcIixcclxuICBcImNvdWxkIG5ldmVyIGJlIHdpdGhvdXRcIjogXCJjYW4ndCBmdW5jdGlvbiB3aXRob3V0XCIsXHJcbiAgXCJjb3VuY2lsXCI6IFwiY291bnNlbFwiLFxyXG4gIFwiY291bnRyeVwiOiBcImJhdGhyb29tXCIsXHJcbiAgXCJjb3VwZVwiOiBcImNvb3BcIixcclxuICBcImNvdXBvblwiOiBcInB1a2Ugb25cIixcclxuICBcImNyYWNrXCI6IFwibWVuZFwiLFxyXG4gIFwiY3JlYWtcIjogXCJjcmVla1wiLFxyXG4gIFwiY3JlZGlibGVcIjogXCJjcmVkdWxvdXNcIixcclxuICBcImNyZW1hdGVkXCI6IFwiaW5jcmVtZW50ZWRcIixcclxuICBcImNyZXdzXCI6IFwiY3J1aXNlXCIsXHJcbiAgXCJjcmllZFwiOiBcImNhbWVcIixcclxuICBcImNyaWVzXCI6IFwiY29tZXNcIixcclxuICBcImNyaW1zb25cIjogXCJhenVyZVwiLFxyXG4gIFwiY3JpdGlxdWVcIjogXCJjcml0aWNpemVcIixcclxuICBcImNyb2NrXCI6IFwiY3JhY2tcIixcclxuICBcImNyb3dcIjogXCJibG93XCIsXHJcbiAgXCJjcnVlbFwiOiBcImhhcGhhemFyZFwiLFxyXG4gIFwiY3J1c2hpbmdcIjogXCJibHVzaGluZ1wiLFxyXG4gIFwiY3J5XCI6IFwiY29taW5nXCIsXHJcbiAgXCJjcnlpbmdcIjogXCJjb21pbmdcIixcclxuICBcImNyeXB0XCI6IFwidXJpbmFsXCIsXHJcbiAgXCJjcnlwdGljXCI6IFwiZHJ1bmtlblwiLFxyXG4gIFwiY3J5c3RhbFwiOiBcImJlZGF6bGVyXCIsXHJcbiAgXCJjdW5uaW5nXCI6IFwiZGVzcGVyYXRlXCIsXHJcbiAgXCJjdXJzZVwiOiBcInN0YWluXCIsXHJcbiAgXCJjdXRcIjogXCJtdXRpbGF0ZVwiLFxyXG4gIFwiZGFtblwiOiBcImRvbnV0XCIsXHJcbiAgXCJkYW1wXCI6IFwic3RhbXBcIixcclxuICBcImRhbmdlcm91c1wiOiBcImNvbiBjYXRjaGluZ1wiLFxyXG4gIFwiZGFya1wiOiBcImVmZmVydmVzY2VudFwiLFxyXG4gIFwiZGF5XCI6IFwibW9ybmluZ1wiLFxyXG4gIFwiZGF5ZHJlYW1cIjogXCJmYW50YXNpemVcIixcclxuICBcImRlYWRcIjogXCJpbmVydFwiLFxyXG4gIFwiZGVhZGx5XCI6IFwiZmVydGlsZVwiLFxyXG4gIFwiZGVhbGVyXCI6IFwic3RlYWxlclwiLFxyXG4gIFwiZGVhclwiOiBcInNjaG11Y2tcIixcclxuICBcImRlYXRoXCI6IFwiU2FudGFcIixcclxuICBcImRlYnV0YW50ZXNcIjogXCJwb3NoIGxhZGllc1wiLFxyXG4gIFwiZGVlcCBkb3duIGluc2lkZVwiOiBcImluIHRoZSBib3R0b20gb2YgdGhlIHRhbmtcIixcclxuICBcImRlbWktZ29kXCI6IFwibWFkIHBsdW1iZXJcIixcclxuICBcImRlbWlnb2RcIjogXCJtYWQgcGx1bWJlclwiLFxyXG4gIFwiZGVtb25cIjogXCJoYXJkLW9uXCIsXHJcbiAgXCJkZW1vbmljIGFuZ2VsXCI6IFwiYmFkIGNvbnRyYWRpY3Rpb25cIixcclxuICBcImRlcHJlY2lhdGVcIjogXCJkZXByZWNhdGVcIixcclxuICBcImRlcHJlc3NlZFwiOiBcImRydW5rXCIsXHJcbiAgXCJkZXByZXNzaW5nXCI6IFwiaW5lYnJpYXRpbmdcIixcclxuICBcImRlcHJlc3Npb25cIjogXCJzbyBtdWNoIGJvb3plXCIsXHJcbiAgXCJkZXJvZ2F0b3J5XCI6IFwic3VwcG9zaXRvcnlcIixcclxuICBcImRlc3RpbnlcIjogXCJ0YXhlc1wiLFxyXG4gIFwiZGV0ZXJyZW50XCI6IFwiZGV0ZXJnZW50XCIsXHJcbiAgXCJkaWVcIjogXCJtYWtlIG1hcnNobWFsbG93c1wiLFxyXG4gIFwiZGllZFwiOiBcIm1hZGUgbWFyc2htYWxsb3dzXCIsXHJcbiAgXCJkaWVzXCI6IFwibWFrZXMgbWFyc2htYWxsb3dzXCIsXHJcbiAgXCJkaWZmZXJlbnRcIjogXCJhd2t3YXJkXCIsXHJcbiAgXCJkaXNpbnRlcmVzdGVkXCI6IFwidW5pbnRlcmVzdGVkXCIsXHJcbiAgXCJkaXNuZXlcIjogXCJkaXZvcmNlXCIsXHJcbiAgXCJkaXNzZW5zaW9uXCI6IFwiZHlzZW50ZXJ5XCIsXHJcbiAgXCJkaXNzZW50aW5nXCI6IFwiZGVzY2VuZGluZ1wiLFxyXG4gIFwiZGlzdGluZ3Vpc2hlZFwiOiBcImV4dGluZ3Vpc2hlZFwiLFxyXG4gIFwiZGl6enlcIjogXCJidXN5XCIsXHJcbiAgXCJkb1wiOiBcImRld1wiLFxyXG4gIFwiZG9jdG9yYWxcIjogXCJkb2N0b3JpYWxcIixcclxuICBcImRvZVwiOiBcImRvdWdoXCIsXHJcbiAgXCJkb2Vzbid0IGhhcHBlbiBvdmVyXCI6IFwiY2FydHdoZWVscyBzdHJhaWdodCBhY3Jvc3NcIixcclxuICBcImRvbid0IGhhdmUgYSBjbHVlXCI6IFwiZ290IHNoaXQgdHdpc3RlZFwiLFxyXG4gIFwiZG9uJ3QgbmVlZFwiOiBcImNvdWxkIGdpdmUgYSBmdWNrIGFib3V0XCIsXHJcbiAgXCJkcmFtYXRpY1wiOiBcImRyYW1hdGljYWxcIixcclxuICBcImRyZWFtXCI6IFwib2JzZXNzXCIsXHJcbiAgXCJkcmVhbWxhbmRcIjogXCJvYnNlc3Npb24gaXNsYW5kXCIsXHJcbiAgXCJkcmVhbXNcIjogXCJvYnNlc3Npb25zXCIsXHJcbiAgXCJkcmliYmxlXCI6IFwiZHJpdmVsXCIsXHJcbiAgXCJkcmlmdFwiOiBcImhpbS1oYXdcIixcclxuICBcImR1YWxcIjogXCJkdWVsXCIsXHJcbiAgXCJkdWRlXCI6IFwiZG9vZGllXCIsXHJcbiAgXCJkeWluZ1wiOiBcIm1ha2luZyBtYXJzaG1hbGxvd3NcIixcclxuICBcImR5c2VudGVyeVwiOiBcImRpc3NlbnNpb25cIixcclxuICBcImVhcnNcIjogXCJ0ZWFyc1wiLFxyXG4gIFwiZWFzZVwiOiBcInRlYXNlXCIsXHJcbiAgXCJlY29sb2d5XCI6IFwiZWNyb2xvZ3lcIixcclxuICBcImVmZmVjdFwiOiBcImFmZmVjdFwiLFxyXG4gIFwiZWdvaXN0XCI6IFwiZWdvdGlzdFwiLFxyXG4gIFwiZWlnaHRcIjogXCJhdGVcIixcclxuICBcImVsZGVyXCI6IFwib2xkIGZvbGtcIixcclxuICBcImVsZWN0aXZlXCI6IFwiZWxlY3RvcmFsXCIsXHJcbiAgXCJlbGV2aWF0ZVwiOiBcImVsZWJhdGVcIixcclxuICBcImVtb3Rpb25cIjogXCJsdWJyaWNhbnRcIixcclxuICBcImVtb3Rpb25hbFwiOiBcImNoaWxkaXNoXCIsXHJcbiAgXCJlbXBhdGh5XCI6IFwic3ltcGF0aHlcIixcclxuICBcImVtcHR5XCI6IFwiYmxvYXRlZFwiLFxyXG4gIFwiZW5kbGVzc1wiOiBcInJlYWwgbG9uZ1wiLFxyXG4gIFwiZW5lcmd5XCI6IFwianVpY2VcIixcclxuICBcImVub3JtaXR5XCI6IFwiaW1tZW5zaXR5XCIsXHJcbiAgXCJlbnN1cmVcIjogXCJpbnN1cmVcIixcclxuICBcImVudGVyZWQgdGhlIGhvdXNlIG9mXCI6IFwiZ290IHVwIGluIHRoZSBiYXJuIGZvclwiLFxyXG4gIFwiZW50cmVwcmVuZXVyXCI6IFwiZW50cmFtYW5vcmVcIixcclxuICBcImVyb2dlbm91c1wiOiBcImdlcm9uaW1vdXNcIixcclxuICBcImVyclwiOiBcImFpclwiLFxyXG4gIFwiZXNjYXBlXCI6IFwic251Z2dsZVwiLFxyXG4gIFwiZXRjaGVkXCI6IFwiZ3JvdW5kXCIsXHJcbiAgXCJldGVybmFsXCI6IFwiaW1hZ2luZWRcIixcclxuICBcImV0ZXJuYWxseVwiOiBcImZvciBhIGJpdFwiLFxyXG4gIFwiZXRlcm5pdHlcIjogXCJhd2hpbGVcIixcclxuICBcImV3ZVwiOiBcInlvdVwiLFxyXG4gIFwiZXhpc3RlbmNlXCI6IFwid2hhdGV2ZXJcIixcclxuICBcImV5ZVwiOiBcImJ5ZVwiLFxyXG4gIFwiZmFjZVwiOiBcInJhY2VcIixcclxuICBcImZhZGVcIjogXCJoaW0taGF3XCIsXHJcbiAgXCJmYWlyXCI6IFwiZmFyZVwiLFxyXG4gIFwiZmFpcnlcIjogXCJmZXJyeVwiLFxyXG4gIFwiZmFsbCBvbiBkZWFmIGVhcnNcIjogXCJmYWxsIG9uIGRlYXRoIGVhcnNcIixcclxuICBcImZhbGxcIjogXCJmbG9wXCIsXHJcbiAgXCJmYW5hdGljXCI6IFwicGhvbmV0aWNcIixcclxuICBcImZhbmdcIjogXCJkZW50dXJlXCIsXHJcbiAgXCJmYXJld2VsbFwiOiBcImFkaW9zXCIsXHJcbiAgXCJmYXJ0aGVyXCI6IFwiZnVydGhlclwiLFxyXG4gIFwiZmF0ZVwiOiBcImNvaW5jaWRlbmNlXCIsXHJcbiAgXCJmYXplXCI6IFwicGhhc2VcIixcclxuICBcImZlYXN0XCI6IFwiYmVhc3RcIixcclxuICBcImZlYXRcIjogXCJmZWV0XCIsXHJcbiAgXCJmZWVsXCI6IFwiZm9uZGxlXCIsXHJcbiAgXCJmZWxsXCI6IFwiZmxvcHBlZFwiLFxyXG4gIFwiZmVtaW5pbmVcIjogXCJmZW1pbmVcIixcclxuICBcImZpZ2h0IGluIHlvdXIgcmFjZVwiOiBcInJpZ2h0IGluIHlvdXIgZmFjZVwiLFxyXG4gIFwiZmlnaHRcIjogXCJyaWdodFwiLFxyXG4gIFwiZmluZ2Vyc1wiOiBcInNhdXNhZ2VcIixcclxuICBcImZpbmdlcnRpcHNcIjogXCJjaGlja2VuIG51Z2dldHNcIixcclxuICBcImZpclwiOiBcImZ1clwiLFxyXG4gIFwiZmlyc3QgbGFpZCBleWVzIG9uXCI6IFwiZmlyc3QgdHJpZWQgZ3JvcGluZ1wiLFxyXG4gIFwiZmlyc3Qgb2YgYWxsXCI6IFwibW0ta2F5XCIsXHJcbiAgXCJmaXNoXCI6IFwid2lzaFwiLFxyXG4gIFwiZmxhZ3NcIjogXCJoYWdzXCIsXHJcbiAgXCJmbGFtbWFibGVcIjogXCJpbmZsYW1tYWJsZVwiLFxyXG4gIFwiZmxhdW50XCI6IFwiZmxvdXRcIixcclxuICBcImZsZWFcIjogXCJmbGVlXCIsXHJcbiAgXCJmbGVzaFwiOiBcInR3aW5raWVcIixcclxuICBcImZsZXNob3V0XCI6IFwiZmx1c2hvdXRcIixcclxuICBcImZsZXdcIjogXCJmbHVcIixcclxuICBcImZsaXBcIjogXCJjaGlwXCIsXHJcbiAgXCJmbG91bmRlclwiOiBcImZvdW5kZXJcIixcclxuICBcImZsb3VyXCI6IFwiZmxvd2VyXCIsXHJcbiAgXCJmbHVuZ1wiOiBcImh1bmdcIixcclxuICBcImZsdXR0ZXIgYnlcIjogXCJidXR0ZXJmbHlcIixcclxuICBcImZvciBhbGwgaW50ZW50cyBhbmQgcHVycG9zZXNcIjogXCJmb3IgYWxsIGludGVuc2l2ZSBwdXJwb3Nlc1wiLFxyXG4gIFwiZm9yIGhlXCI6IFwidGhpcyBkdW1iIG1vdGhlciBmdWNrZXJcIixcclxuICBcImZvciBubyByZWFzb25cIjogXCJtYWlhY2FsbHlcIixcclxuICBcImZvciBzaGVcIjogXCInY2F1c2UgdGhlIGN1bnRcIixcclxuICBcImZvclwiOiBcImZvdXJcIixcclxuICBcImZvcmVwbGF5XCI6IFwiZmxvb3JwbGF5XCIsXHJcbiAgXCJmb3Jlc3RcIjogXCJjYW1wZ3JvdW5kXCIsXHJcbiAgXCJmb3JldmVyXCI6IFwic28gdmVyeVwiLFxyXG4gIFwiZm9yZ2V0XCI6IFwiZGlzcmVtZW1iZXJcIixcclxuICBcImZvcm1cIjogXCJ3YXJtXCIsXHJcbiAgXCJmb3JtYWxseVwiOiBcImZvcm1lcmx5XCIsXHJcbiAgXCJmb3J0aFwiOiBcImZvdXJ0aFwiLFxyXG4gIFwiZm9ydHVpdG91c1wiOiBcImZvcnR1bmF0ZVwiLFxyXG4gIFwiZm91bFwiOiBcImJvd2VsXCIsXHJcbiAgXCJmcmFnaWxlXCI6IFwic3R1cmR5XCIsXHJcbiAgXCJmcnVzdHJhdGVkXCI6IFwiZmx1c3RyYXRlZFwiLFxyXG4gIFwiZnVja1wiOiBcImZyaWRnZVwiLFxyXG4gIFwiZnVsbCBvZiBsaWZlXCI6IFwiZnVsbCBvZiBzaGl0XCIsXHJcbiAgXCJmdW5lcmFsXCI6IFwidmVuZXJlYWxcIixcclxuICBcImdhbGxcIjogXCJnYXJsaWNcIixcclxuICBcImdhbmdzdGVyXCI6IFwiaGFtc3RlclwiLFxyXG4gIFwiZ2Fuc3RhXCI6IFwiaGFtc3RhXCIsXHJcbiAgXCJnYXJhZ2VcIjogXCJncmF2ZVwiLFxyXG4gIFwiZ2F2ZSB1cCBvblwiOiBcImRvbid0IGdpdmUgYSBmdWNrIGFib3V0XCIsXHJcbiAgXCJnZW50bGVcIjogXCJnZW5pdGFsXCIsXHJcbiAgXCJnaG9zdFwiOiBcImltYWdpbmFyeSBmcmllbmRcIixcclxuICBcImdpcmwgbWVldHMgYm95XCI6IFwiYWRvbGVzY2VudCBtaXN0YWtlc1wiLFxyXG4gIFwiZ2l2ZSB1cCBvblwiOiBcIndvbid0IGdpdmUgYSBmdWNrIGFib3V0XCIsXHJcbiAgXCJnaXZlbiBhIGNob2ljZVwiOiBcImV4dG9ydGVkXCIsXHJcbiAgXCJnaXZlbiB1cCBvblwiOiBcImRvbid0IGdpdmUgYSBmdWNrIGFib3V0XCIsXHJcbiAgXCJnaXZpbmcgdXAgb25cIjogXCJhaW4ndCBnaXZpbiBhIGZ1Y2sgYWJvdXRcIixcclxuICBcImdvZFwiOiBcIkpvaG4gRG9lIHNyXCIsXHJcbiAgXCJnb2RkZXNzXCI6IFwiSmFuZSBEb2VcIixcclxuICBcImdvZHNcIjogXCJKb2huIERvZSBzciBldCBhbC5cIixcclxuICBcImdvbGRlbiByYXlcIjogXCJnYXVkeSBzY3JpYmJsZVwiLFxyXG4gIFwiZ29vZCBieWVcIjogXCJmdWNrIG9mZlwiLFxyXG4gIFwiZ29vZFwiOiBcIndlbGxcIixcclxuICBcImdvb2QtYnllXCI6IFwiZnVjayBvZmZcIixcclxuICBcImdvb2RieWVcIjogXCJmdWNrIG9mZlwiLFxyXG4gIFwiZ29yaWxsYVwiOiBcImd1ZXJyaWxsYVwiLFxyXG4gIFwiZ290IGluIHlvdXIgd2F5XCI6IFwidHJpZWQgdG8gdHJhcCB5b3VcIixcclxuICBcImdyYXZlXCI6IFwicGVyc29uYWwgc3BhY2VcIixcclxuICBcImdyYXZlc3RvbmVcIjogXCJtaWxlIG1hcmtlclwiLFxyXG4gIFwiZ3Jvd2luZyBhcGFydFwiOiBcImdldHRpbmcgYm9yZWRcIixcclxuICBcImd1ZXNzIGl0IGRvZXNuJ3QgbWF0dGVyXCI6IFwia25vdyB0aGlzIHNoaXQgaXMgcG9pbnRsZXNzXCIsXHJcbiAgXCJneW5lY29sb2dpc3RcIjogXCJncm9pbmFjb2xvZ2lzdFwiLFxyXG4gIFwiaGFkIGRvbmVcIjogXCJkb25lIGRpZFwiLFxyXG4gIFwiaGFnc1wiOiBcImZsYWdzXCIsXHJcbiAgXCJoYWlyXCI6IFwiaGFyZVwiLFxyXG4gIFwiaGFsbFwiOiBcImhhdWxcIixcclxuICBcImhhbHZlXCI6IFwiaGF2ZVwiLFxyXG4gIFwiaGFuZCBpbiBoYW5kXCI6IFwiZm9vdCBpbiBzaG9lXCIsXHJcbiAgXCJoYW5kIHRvIGhvbGRcIjogXCJzdGVhayB0byBlYXRcIixcclxuICBcImhhdGVcIjogXCJkaXNsaWtlXCIsXHJcbiAgXCJoYXRyZWRcIjogXCJvZGl1bVwiLFxyXG4gIFwiaGF1bnRcIjogXCJzdGFsa1wiLFxyXG4gIFwiaGF5XCI6IFwiaGV5XCIsXHJcbiAgXCJoZWFsXCI6IFwiaGVlbFwiLFxyXG4gIFwiaGVhbGVyXCI6IFwiZm9uZGxlclwiLFxyXG4gIFwiaGVhcmluZ1wiOiBcImVhcnJpbmdcIixcclxuICBcImhlYXJ0XCI6IFwiY3JvdGNoXCIsXHJcbiAgXCJoZWFydGJlYXRcIjogXCJjcm90Y2ggZmlyZVwiLFxyXG4gIFwiaGVhdmVuXCI6IFwic2t5XCIsXHJcbiAgXCJoZWF2ZW5zXCI6IFwic2tpZXNcIixcclxuICBcImhlbGxcIjogXCJBbnRhcmN0aWNhXCIsXHJcbiAgXCJoZWxsZmlyZVwiOiBcImhlbW9ycmhvaWRcIixcclxuICBcImhpXCI6IFwiaGlnaFwiLFxyXG4gIFwiaGlja1wiOiBcInNpY2tcIixcclxuICBcImhpZGRlblwiOiBcInN0YXNoZWRcIixcclxuICBcImhpZ2hlciBwb3dlclwiOiBcImNydXN0eSBzb2NrXCIsXHJcbiAgXCJoaXNzIGFuZCBsZWFyXCI6IFwibGlzdGVuIGhlcmVcIixcclxuICBcImhpc3NlZFwiOiBcIm1pc3NlZFwiLFxyXG4gIFwiaGlzdG9yaWNcIjogXCJoaXN0b3JpY2FsXCIsXHJcbiAgXCJoaXN0b3J5XCI6IFwibXlzdGVyeVwiLFxyXG4gIFwiaG9hcnNlXCI6IFwiaG9yc2VcIixcclxuICBcImhvbGRpbmcgdGhlbSBjbG9zZSB0b1wiOiBcImhhbmRjdWZmaW5nIHRoZW0gdG9cIixcclxuICBcImhvbGVcIjogXCJ3aG9sZVwiLFxyXG4gIFwiaG9sZXlcIjogXCJob2x5XCIsXHJcbiAgXCJob25laW5cIjogXCJob21laW5cIixcclxuICBcImhvcGVsZXNzXCI6IFwicGl0aWZ1bFwiLFxyXG4gIFwiaG9yaXpvbnRhbFwiOiBcIlZlcnRpem9udGFsXCIsXHJcbiAgXCJob3JzZXNcIjogXCJob3JuZXRzXCIsXHJcbiAgXCJob3R0aWVcIjogXCJob2d0aWVcIixcclxuICBcImhvdXJcIjogXCJvdXJcIixcclxuICBcImhvdXNlXCI6IFwidGVudFwiLFxyXG4gIFwiaHVtYW4gcmFjZVwiOiBcImdlcmJpbCBlbXBpcmVcIixcclxuICBcImh1bmdcIjogXCJmbHVuZ1wiLFxyXG4gIFwiaHVuZ3J5XCI6IFwiaG9ybnlcIixcclxuICBcImh5cG9kZW1pYyBuZWVkbGVcIjogXCJoeXBvZGVybWljIG51cmRsZVwiLFxyXG4gIFwiaHlzdGVyaWNhbFwiOiBcImhpbGFyaW91c1wiLFxyXG4gIFwiaSBhbVwiOiBcImkgYXJlXCIsXHJcbiAgXCJJIGNvdWxkbid0IGNhcmUgbGVzc1wiOiBcIkkgY291bGQgY2FyZSBsZXNzXCIsXHJcbiAgXCJpXCI6IFwiS2V2aW5cIixcclxuICBcImknbGxcIjogXCJpIHdpbGxcIixcclxuICBcImknbVwiOiBcImkgYXJlXCIsXHJcbiAgXCJpJ3ZlIG5ldmVyIGZlbHQgdGhpcyB3YXlcIjogXCJpJ3ZlIGRvbmUgdGhpc1wiLFxyXG4gIFwiaSd2ZVwiOiBcImkgaGF2ZVwiLFxyXG4gIFwiaWxsdW1pbmF0aW9uXCI6IFwibXVtYm8ganVtYm9cIixcclxuICBcImlsbHVzaW9uXCI6IFwiZHJ1bmtlbiBtaXN0YWtlXCIsXHJcbiAgXCJpbVwiOiBcImknbVwiLFxyXG4gIFwiaW1tb3J0YWxcIjogXCJ3aGlueVwiLFxyXG4gIFwiaW1wbHlcIjogXCJpbmZlclwiLFxyXG4gIFwiaW4gdGhlIG1pZGRsZSBvZlwiOiBcImFsbCB1cCBpblwiLFxyXG4gIFwiaW5jYW50YXRpb25cIjogXCJtdWNoIHlhbW1lcmluZ1wiLFxyXG4gIFwiaW5jZW5zZVwiOiBcImluY2VzdFwiLFxyXG4gIFwiaW5jaWRlbnRzXCI6IFwiaW5zdGFuY2VcIixcclxuICBcImluZmluaXRlXCI6IFwiYWJzdHJhY3RcIixcclxuICBcImluZ2VudW91c1wiOiBcImluZ2VuaW91c1wiLFxyXG4gIFwiaW5zZW5zaWJsZVwiOiBcImluc2Vuc2l0aXZlXCIsXHJcbiAgXCJpbnN0YWxsXCI6IFwiaW5zdGlsbFwiLFxyXG4gIFwiaW5zdWxhdGlvblwiOiBcImluc3RhbGxhdGlvblwiLFxyXG4gIFwiaW50ZW5zZVwiOiBcImludGVuc2l2ZVwiLFxyXG4gIFwiaW50ZXJpb3JcIjogXCJpbmZlcmlvclwiLFxyXG4gIFwiaW50ZXJtZW50XCI6IFwiaW50ZXJubWVudFwiLFxyXG4gIFwiaW50ZXJwcmV0XCI6IFwiaW50ZXJwcmV0YXRlXCIsXHJcbiAgXCJpbnRpbWF0ZVwiOiBcImltaW5lbnRcIixcclxuICBcImludG8gdGhlIGxpZ2h0XCI6IFwib24gdG8gdGhlIGxpZ2h0XCIsXHJcbiAgXCJpbnR1aXRpb25cIjogXCJpbnRlcm1pc3Npb25cIixcclxuICBcImludml0ZVwiOiBcImtuaWZlXCIsXHJcbiAgXCJpc2xlXCI6IFwiYWlzbGVcIixcclxuICBcIml0IG11c3QgYmUgdHJ1ZVwiOiBcImZvciByZWFsICduJyBzaGl0XCIsXHJcbiAgXCJpdCdzIGEgZG9nLWVhdC1kb2cgd29ybGRcIjogXCJpdCdzIGEgZG9nZ3kgZG9nIHdvcmxkXCIsXHJcbiAgXCJqZWFuc1wiOiBcImJlYW5zXCIsXHJcbiAgXCJqZWxseSBiZWFuc1wiOiBcImJlbGx5IGplYW5zXCIsXHJcbiAgXCJqZWxseVwiOiBcImJlbGx5XCIsXHJcbiAgXCJqZXN1cyBjaHJpc3RcIjogXCJKb2huIERvZSBqclwiLFxyXG4gIFwiamVzdXNcIjogXCJKb2huIERvZSBqclwiLFxyXG4gIFwiamV0bGFnXCI6IFwiamV0bG9ja1wiLFxyXG4gIFwianVtcFwiOiBcImR1bXBcIixcclxuICBcImp1c3RcIjogXCJzdXJlXCIsXHJcbiAgXCJraXNzXCI6IFwic2xhcFwiLFxyXG4gIFwia2lzc2luZyBvdGhlclwiOiBcImdvaW5nIGRvd24gb25cIixcclxuICBcImtuZWFkXCI6IFwibmVlZFwiLFxyXG4gIFwia25ld1wiOiBcImdvdFwiLFxyXG4gIFwia25pZmVcIjogXCJkaWxkb1wiLFxyXG4gIFwia25pZ2h0XCI6IFwibmlnaHRcIixcclxuICBcImtub3RcIjogXCJub3RcIixcclxuICBcImtub3dcIjogXCJnZXRcIixcclxuICBcImtub3dsZWRnZVwiOiBcInRyaXZpYVwiLFxyXG4gIFwia25vd25cIjogXCJnb3RcIixcclxuICBcImxhY2tcIjogXCJwYWNrXCIsXHJcbiAgXCJsYXRlclwiOiBcImxhdHRlclwiLFxyXG4gIFwibGF5XCI6IFwibGllXCIsXHJcbiAgXCJsYXlpbmcgaW4gYmVkXCI6IFwidGFraW5nIGEgc2hpdFwiLFxyXG4gIFwibGF5aW5nIG9uIHRoZSBmbG9vclwiOiBcImJlZ2dpbmcgZm9yIGl0XCIsXHJcbiAgXCJsZWFkXCI6IFwic3BlZWRcIixcclxuICBcImxlYXZlIGhlciBzaWRlXCI6IFwiZ2V0IG9mZiBoZXIgYXNzXCIsXHJcbiAgXCJsZWF2ZSBoaXMgc2lkZVwiOiBcImdldCBvZmYgaGlzIGFzc1wiLFxyXG4gIFwibGVhdmUgbXkgc2lkZVwiOiBcImdldCBvZmYgbXkgYXNzXCIsXHJcbiAgXCJsZWF2ZSB5b3VyIHNpZGVcIjogXCJnZXQgb2ZmIHlvdXIgYXNzXCIsXHJcbiAgXCJsZWF2ZVwiOiBcImxldFwiLFxyXG4gIFwibGVvcGFyZFwiOiBcInNoZXBoZXJkXCIsXHJcbiAgXCJsZXNzZW5cIjogXCJsZXNzb25cIixcclxuICBcImxpYXJcIjogXCJmaWJiZXJcIixcclxuICBcImxpYmVyYXRpb25cIjogXCJsdWJyaWNhdGlvblwiLFxyXG4gIFwibGllXCI6IFwiZmliXCIsXHJcbiAgXCJsaWVzXCI6IFwiZmlic1wiLFxyXG4gIFwibGlnaHRcIjogXCJzcGl0ZVwiLFxyXG4gIFwibGlnaHRlZFwiOiBcImxpdFwiLFxyXG4gIFwibGlzdGVuIGhlcmVcIjogXCJoaXNzIGFuZCBsZWFyXCIsXHJcbiAgXCJsb2FuXCI6IFwibG9uZVwiLFxyXG4gIFwibG9uZVwiOiBcInNpbmdsZVwiLFxyXG4gIFwibG9uZWxpbmVzc1wiOiBcImFyb3VzYWxcIixcclxuICBcImxvbmVseVwiOiBcImhvcm55XCIsXHJcbiAgXCJsb29rIGJhY2tcIjogXCJsaWNrIHdpbmRvd3NcIixcclxuICBcImxvb2sgaW50byBoZXIgZXllc1wiOiBcImdpdmUgaGVyIGRpc2Vhc2VzXCIsXHJcbiAgXCJsb29rIGludG8gaGlzIGV5ZXNcIjogXCJnaXZlIGhpbSBkaXNlYXNlc1wiLFxyXG4gIFwibG9vayBpbnRvIHRoZWlyIGV5ZXNcIjogXCJnaXZlIHRoZW0gZGlzZWFzZXNcIixcclxuICBcImxvb3NlXCI6IFwibG9zZVwiLFxyXG4gIFwibG9zZVwiOiBcInNoYWtlXCIsXHJcbiAgXCJsb3N0XCI6IFwiYXJvdXNlZFwiLFxyXG4gIFwibG92ZVwiOiBcImNvbmZ1c2VcIixcclxuICBcImxvdmluZ1wiOiBcInNob3ZpbmdcIixcclxuICBcImx1eHVyaWFudFwiOiBcImx1eHVyaW91c1wiLFxyXG4gIFwibWFkXCI6IFwiYmFkXCIsXHJcbiAgXCJtYWRlXCI6IFwibWFpZFwiLFxyXG4gIFwibWFnaWNcIjogXCJob3BlXCIsXHJcbiAgXCJtYWdpY2tcIjogXCJkZWx1c2lvblwiLFxyXG4gIFwibWFubmVyc1wiOiBcImJhbm5lcnNcIixcclxuICBcIm1hcnJ5XCI6IFwibWVycnlcIixcclxuICBcIm1hcnRpYWxcIjogXCJtYXJzaGFsXCIsXHJcbiAgXCJtYXNrXCI6IFwidHJhc2hiYWdcIixcclxuICBcIm1hc3NhY3Jlc1wiOiBcIm1hc2NhcmFzXCIsXHJcbiAgXCJtYXNzZXVzZVwiOiBcIm1hc3NldXJcIixcclxuICBcIm1hemVsdG92XCI6IFwibW9sb3RvdlwiLFxyXG4gIFwibWVcIjogXCJpXCIsXHJcbiAgXCJtZWFucyBtYW55IHRoaW5nc1wiOiBcImlzIGJlc3QgZGVzY3JpYmVkIHdpdGggbGllc1wiLFxyXG4gIFwibWVhdFwiOiBcIm1lZXRcIixcclxuICBcIm1lZGlhblwiOiBcIm1lZGl1bVwiLFxyXG4gIFwibWVkaXRhdGVcIjogXCJtZW5zdHJ1YXRlXCIsXHJcbiAgXCJtZWRpdW1cIjogXCJtZWRpYW5cIixcclxuICBcIm1lZXQgYWdhaW5cIjogXCJoYXZlIGFub3RoZXIgZ28tcm91bmRcIixcclxuICBcIm1lbHRpbmdcIjogXCJzbWVsdGluZ1wiLFxyXG4gIFwibWVtb3JpYWxcIjogXCJtZW1vcml1bVwiLFxyXG4gIFwibWVtb3JpYW1cIjogXCJtZW1vcmlhbFwiLFxyXG4gIFwibWVuZFwiOiBcInNlbmRcIixcclxuICBcIm1lc2NhbGluZVwiOiBcIm1hc2N1bGluZVwiLFxyXG4gIFwibWlkbmlnaHRcIjogXCJkYXlicmVha1wiLFxyXG4gIFwibWlkc3RcIjogXCJwYW50c1wiLFxyXG4gIFwibWlnaHQgYXMgd2VsbFwiOiBcIm9oIGZ1Y2sgSSBvdWdodHRhXCIsXHJcbiAgXCJtaWxpdGFudFwiOiBcIm1hbmlhY2FsXCIsXHJcbiAgXCJtaWxpdGFyeVwiOiBcImdhbmdzdGVyXCIsXHJcbiAgXCJtaWxpdGlhXCI6IFwiZ2FuZ1wiLFxyXG4gIFwibWluZVwiOiBcImknc1wiLFxyXG4gIFwibWluaW9uXCI6IFwiaG9ybnkgcGlyYXRlXCIsXHJcbiAgXCJtaW5vcml0aWVzXCI6IFwibWlub3Jvcml0aWVzXCIsXHJcbiAgXCJtaW5vcnNcIjogXCJtaW5lcnNcIixcclxuICBcIm1pbnN0cmVsXCI6IFwibWVuc3RydWFsXCIsXHJcbiAgXCJtaXNjaGlldm91c1wiOiBcIm1pc2NoaWV2aW91c1wiLFxyXG4gIFwibWlzc2VkXCI6IFwiaGlzc2VkXCIsXHJcbiAgXCJtb25leVwiOiBcImJ1bm55XCIsXHJcbiAgXCJtb25zdGVyXCI6IFwiZGlzbGV4aWMgbG92ZXJcIixcclxuICBcIm1vb25cIjogXCJuaWdodCBsaWdodFwiLFxyXG4gIFwibW9vbmxpZ2h0XCI6IFwibW9vbnNoaW5lXCIsXHJcbiAgXCJtb3J0YWxcIjogXCJxdWVlclwiLFxyXG4gIFwibW9zdCBwZW9wbGUgY2FuIG9ubHlcIjogXCJtb3N0IGZyZWFrcyBhbmQgZG9wZSBmaWVuZHNcIixcclxuICBcIm11c3RlcmVkXCI6IFwibXVzdGFyZFwiLFxyXG4gIFwibXkgbG9yZFwiOiBcInN3ZWV0IHBhbG1cIixcclxuICBcIm15XCI6IFwiaSdzIFwiLFxyXG4gIFwibXlzZWxmXCI6IFwibXkgbXVjaG5lc3NcIixcclxuICBcIm15c3Rlcmllc1wiOiBcIm5lb24gc2lnbnNcIixcclxuICBcIm15c3RlcnlcIjogXCJuZW9uIHNpZ25cIixcclxuICBcIm15c3RpY1wiOiBcImFsY29ob2xpY1wiLFxyXG4gIFwibmFpbHNcIjogXCJ0YWlsc1wiLFxyXG4gIFwibmFrZWRcIjogXCJ1bnNoYXZlZFwiLFxyXG4gIFwibmVlZGxlXCI6IFwibnVyZGxlXCIsXHJcbiAgXCJuZXZlciBlbmRcIjogXCJkcmFnIG9uXCIsXHJcbiAgXCJuZXZlciBlbmRpbmdcIjogXCJyZWxlbnRsZXNzXCIsXHJcbiAgXCJuZXZlciBnb2luZ1wiOiBcImZ1Y2tlZCBmb3IgdHJ5aW5nXCIsXHJcbiAgXCJuZXZlciB0aG91Z2h0IHlvdSB3b3VsZCBkbyB0aGF0XCI6IFwiZ290IHR1cm5lZCBvdXQgbGlrZSBhIGR1bWIgZnVja1wiLFxyXG4gIFwibmV2ZXJlbmRpbmdcIjogXCJuZXZlciBlbmRpbmdcIixcclxuICBcIm5pY2tcIjogXCJwaWNrXCIsXHJcbiAgXCJuaWdodFwiOiBcImJlZHRpbWVcIixcclxuICBcIm5pZ2h0bWFyZVwiOiBcInRhbnRydW1cIixcclxuICBcIm5vIG1hdHRlclwiOiBcImlycmVnYXJkbGVzcyBvZlwiLFxyXG4gIFwibm8gdGFpbHNcIjogXCJ0b2UgbmFpbHNcIixcclxuICBcIm5vbWFkXCI6IFwiZHJ1bmsgaG9ib1wiLFxyXG4gIFwibm9uZVwiOiBcIm51blwiLFxyXG4gIFwibm90IHN0cm9uZyBlbm91Z2hcIjogXCJhaW4ndCBnb3QgdGhlIG51dHNcIixcclxuICBcIm5vdGhpbmcgaXMgYXNzdXJlZFwiOiBcIndlIGxpdmUgdG8gZGVsaXZlclwiLFxyXG4gIFwibm92ZWx0eSBxdWlja2x5IHdlYXJzIG9mZlwiOiBcImR1bWIgc2hpdCBnaXRzIG9sZCBmYXN0XCIsXHJcbiAgXCJub3cgYXQgYW4gZW5kXCI6IFwiYnJhbmQgc3BhbmtpbiBuZXdcIixcclxuICBcIm9cIjogXCJ1aFwiLFxyXG4gIFwibydcIjogXCJ1aFwiLFxyXG4gIFwib2J0YWluXCI6IFwiZ2V0XCIsXHJcbiAgXCJvY2VhblwiOiBcInNld2VyXCIsXHJcbiAgXCJvaFwiOiBcIm93ZVwiLFxyXG4gIFwib25lXCI6IFwid29uXCIsXHJcbiAgXCJvbmx5IHdhbnRlZFwiOiBcImJlZ2dlZCBmb3JcIixcclxuICBcIm9wcHJlc3NcIjogXCJyZXByZXNzXCIsXHJcbiAgXCJvcmllbnRcIjogXCJvcmllbnRhdGVcIixcclxuICBcIm9zdGVuc2libHlcIjogXCJvc3RlbnNpdmVseVwiLFxyXG4gIFwib3VyXCI6IFwidGhlaXJcIixcclxuICBcIm91cnNcIjogXCJ0aGVpcnNcIixcclxuICBcIm91dFwiOiBcInNob3V0XCIsXHJcbiAgXCJvdXR3YXJkIGFwcGVhcmFuY2VcIjogXCJmYWNhZGVcIixcclxuICBcIm92ZXJkb1wiOiBcIm92ZXJkdWVcIixcclxuICBcIm92ZXJzZWVcIjogXCJvdmVybG9va1wiLFxyXG4gIFwicGFja1wiOiBcImxhY2tcIixcclxuICBcInBhaWRcIjogXCJsYWlkXCIsXHJcbiAgXCJwYWlsXCI6IFwicGFsZVwiLFxyXG4gIFwicGFpblwiOiBcImxldGhhcmd5XCIsXHJcbiAgXCJwYWxlXCI6IFwic2V4eVwiLFxyXG4gIFwicGFyYWx5c2lzXCI6IFwicGFyYWx5emF0aW9uXCIsXHJcbiAgXCJwYXJhbWV0ZXJzXCI6IFwicGVyaW1ldGVyc1wiLFxyXG4gIFwicGFzc2lvblwiOiBcImRlbGlyaXVtXCIsXHJcbiAgXCJwYXNzaW9uYXRlXCI6IFwiZGVsaXJpb3VzXCIsXHJcbiAgXCJwYXRoXCI6IFwic2lkZXdhbGtcIixcclxuICBcInBlYWNlXCI6IFwicGllY2VcIixcclxuICBcInBlYWtcIjogXCJwZWVrXCIsXHJcbiAgXCJwZW5cIjogXCJwZW5pc1wiLFxyXG4gIFwicGVyZmVjdFwiOiBcImZ1Y2tlZFwiLFxyXG4gIFwicGVyc2VjdXRlXCI6IFwiZXhlY3V0ZVwiLFxyXG4gIFwicGVyc3BlY3RpdmVcIjogXCJwcm9zcGVjdGl2ZVwiLFxyXG4gIFwicGVyc3BpcmVcIjogXCJleHBpcmVcIixcclxuICBcInBlcnZlcnRcIjogXCJvcmV2ZXJ0XCIsXHJcbiAgXCJwZXRhbFwiOiBcImRpbmdsZWJlcnJ5XCIsXHJcbiAgXCJwaG9uZVwiOiBcInRob25nXCIsXHJcbiAgXCJwaWVjZSBieSBwaWVjZVwiOiBcImNob3J0bGUgYnkgY2hvcnRsZVwiLFxyXG4gIFwicGlsbG93XCI6IFwic3RvbmVcIixcclxuICBcInBsYWluXCI6IFwicGxhbmVcIixcclxuICBcInBvZW1cIjogXCJzY3JpYmJsZVwiLFxyXG4gIFwicG9ldFwiOiBcImhvYm9cIixcclxuICBcInBvZXRpY1wiOiBcImZsYXR1bGVudFwiLFxyXG4gIFwicG9ldHJ5XCI6IFwiYmFkIGdhc1wiLFxyXG4gIFwicG9sZVwiOiBcInBvbGxcIixcclxuICBcInBvb3JcIjogXCJwb3VyXCIsXHJcbiAgXCJwb3Bjb3JuXCI6IFwiY29wIHBvcm5cIixcclxuICBcInByYWN0aWNhbFwiOiBcInByYWN0aWNsZVwiLFxyXG4gIFwicHJhY3RpY2VcIjogXCJwcmFjdGlzZVwiLFxyXG4gIFwicHJheVwiOiBcIm11cm11clwiLFxyXG4gIFwicHJlLW1hcml0YWxcIjogXCJwcmVtYXJ0aWFsXCIsXHJcbiAgXCJwcmVhcnJhbmdlZFwiOiBcInByZWRlcnJhbmdlZFwiLFxyXG4gIFwicHJlY2VkZVwiOiBcInByb2NlZWRcIixcclxuICBcInByZWNpcGl0YXRlXCI6IFwicHJlY2lwaXRvdXNcIixcclxuICBcInByZXNjcmliZVwiOiBcInByb3NjcmliZVwiLFxyXG4gIFwicHJpbmNpcGFsXCI6IFwicHJpbmNpcGxlXCIsXHJcbiAgXCJwcmlzb25cIjogXCJvdXRob3VzZVwiLFxyXG4gIFwicHJvYmxlbVwiOiBcInVzZWxlc3MgY29uY2VyblwiLFxyXG4gIFwicHJvbWlzZVwiOiBcImxpZVwiLFxyXG4gIFwicHJvcGhlY2llc1wiOiBcIndpdmVzIHRhbGVzXCIsXHJcbiAgXCJwcm9waGVjeVwiOiBcIndpdmVzIHRhbGVcIixcclxuICBcInByb3BoZXRcIjogXCJpbnNvbW5pYWNcIixcclxuICBcInByb3N0YXRlXCI6IFwicHJvc3RyYXRlXCIsXHJcbiAgXCJwdWtlIG9uXCI6IFwiY291cG9uXCIsXHJcbiAgXCJwdXQgdXAgd2l0aFwiOiBcIm1hbmhhbmRsZVwiLFxyXG4gIFwicHV0cmlkXCI6IFwicGxlYXNhbnRcIixcclxuICBcInF1YWxpZmljYXRpb25zXCI6IFwicXVhbGlmaWRhdGlvbnNcIixcclxuICBcInF1ZXN0XCI6IFwic3Ryb2xsXCIsXHJcbiAgXCJxdWlldFwiOiBcInF1aXRlXCIsXHJcbiAgXCJyYWNlXCI6IFwiZmFjZVwiLFxyXG4gIFwicmFpblwiOiBcInNwdW5rXCIsXHJcbiAgXCJyYWluYm93XCI6IFwicGl6emF6elwiLFxyXG4gIFwicmFwXCI6IFwid3JhcFwiLFxyXG4gIFwicmFwZVwiOiBcIndoYXRcIixcclxuICBcInJhcGluZ1wiOiBcIndoYXRcIixcclxuICBcInJhcmVcIjogXCJyYXJpZmllZFwiLFxyXG4gIFwicmF0aW9uYWxlXCI6IFwicmF0aW9uYWxpemF0aW9uXCIsXHJcbiAgXCJyYXZhZ2luZ1wiOiBcInJhdmlzaGluZ1wiLFxyXG4gIFwicmF2ZW5cIjogXCJwaWdlb25cIixcclxuICBcInJhdmlzaGluZ1wiOiBcInJhdmVub3VzXCIsXHJcbiAgXCJyYXlcIjogXCJzY3JpYmJsZVwiLFxyXG4gIFwicmF6b3JcIjogXCJkaWxkb1wiLFxyXG4gIFwicmF6b3JibGFkZVwiOiBcImJ1dHQgcGx1Z1wiLFxyXG4gIFwicmVhY3Rpb25hcnlcIjogXCJyZWFjdGl2ZVwiLFxyXG4gIFwicmVhbFwiOiBcInJlZWxcIixcclxuICBcInJlYWxpdHlcIjogXCJ0b2lsZXQgYm93bFwiLFxyXG4gIFwicmViZWxsaW5nXCI6IFwicmV2b2x0aW5nXCIsXHJcbiAgXCJyZWJ1dFwiOiBcInJlZnV0ZVwiLFxyXG4gIFwicmVja2xlc3NcIjogXCJ3cmVja2xlc3NcIixcclxuICBcInJlZnV0ZVwiOiBcInJlZnVkaWF0ZVwiLFxyXG4gIFwicmVnYXJkbGVzc1wiOiBcImlycmVnYXJkbGVzc1wiLFxyXG4gIFwicmVncmV0ZnVsbHlcIjogXCJyZWdyZXR0YWJseVwiLFxyXG4gIFwicmVndXJnaXRhdGVcIjogXCJkZXRlcmdlcmF0ZVwiLFxyXG4gIFwicmVoYWJpbGl0YXRlXCI6IFwiZGViaWxpdGF0ZVwiLFxyXG4gIFwicmVsZWF2ZVwiOiBcInJlbGl2ZVwiLFxyXG4gIFwicmVtZW1iZXJcIjogXCJtdW1ibGVcIixcclxuICBcInJlcGVsXCI6IFwicmVwdWxzZVwiLFxyXG4gIFwicmVwdXRlXCI6IFwicmVmdXRlXCIsXHJcbiAgXCJyZXN0IGluIHBlYWNlXCI6IFwicGFydHkgbGlrZSBpdCdzIDE5OTlcIixcclxuICBcInJpZGRsZVwiOiBcInBvbGthIGRvdFwiLFxyXG4gIFwicmlnaHRcIjogXCJmaWdodFwiLFxyXG4gIFwicmlnaHRlb3VzXCI6IFwiYXJyb2dhbnRcIixcclxuICBcInJpbmdcIjogXCJ3cmluZ1wiLFxyXG4gIFwicml0dWFsXCI6IFwiYmFuYW5hIGRhbmNlXCIsXHJcbiAgXCJyb2xlXCI6IFwicm9sbFwiLFxyXG4gIFwicm9zZVwiOiBcImFudXNcIixcclxuICBcInNhZFwiOiBcImltcG90ZW50XCIsXHJcbiAgXCJzYWRkXCI6IFwiZmxhY2NpZFwiLFxyXG4gIFwic2FkZGVuZWRcIjogXCJtYWRlIGZsYWNjaWRcIixcclxuICBcInNhZG5lc3NcIjogXCJpbXBvdGVuY2VcIixcclxuICBcInNhaWxcIjogXCJzYWxlXCIsXHJcbiAgXCJzYWxhZFwiOiBcImJhbGxhZFwiLFxyXG4gIFwic2FsaWVudFwiOiBcInNhbGluZVwiLFxyXG4gIFwic2FuaXRhcml1bVwiOiBcInNhbmlxdWFyaXVtXCIsXHJcbiAgXCJzYXZlXCI6IFwid2F2ZVwiLFxyXG4gIFwic2NhcGVnb2F0XCI6IFwiZXNjYXBlIGdvYXRcIixcclxuICBcInNjYXJcIjogXCJzdHJpYVwiLFxyXG4gIFwic2NhcmVcIjogXCJ0aWNrbGVcIixcclxuICBcInNjYXJyZWRcIjogXCJzdHJpYXRlZFwiLFxyXG4gIFwic2NhcnNcIjogXCJzdHJpYWVcIixcclxuICBcInNjYXJ5XCI6IFwidGlja2x5XCIsXHJcbiAgXCJzY2VuZVwiOiBcInNlZW5cIixcclxuICBcInNjcmVhbVwiOiBcImdydW50XCIsXHJcbiAgXCJzZWFcIjogXCJiYXRoXCIsXHJcbiAgXCJzZWFsXCI6IFwiaGVhbFwiLFxyXG4gIFwic2VhbVwiOiBcInNlZW1cIixcclxuICBcInNlZ3VlXCI6IFwic2Vnd2F5XCIsXHJcbiAgXCJzZWxmIGVzdGVlbVwiOiBcInNlbGYgb2Ygc3RlYW1cIixcclxuICBcInNlbGYtZGVwcmVjaWF0aW5nXCI6IFwic2VsZi1kZWZpY2F0aW5nXCIsXHJcbiAgXCJzZWxmaXNoXCI6IFwidGhpZXZpbmdcIixcclxuICBcInNlbmRcIjogXCJtZW5kXCIsXHJcbiAgXCJzZW5zZVwiOiBcInNpbmNlXCIsXHJcbiAgXCJzZXQgdGhlIG1vb2RcIjogXCJ3aGlwIGl0IG91dFwiLFxyXG4gIFwic2hha2VcIjogXCJ0YWtlXCIsXHJcbiAgXCJzaGFsbFwiOiBcInNob3VsZC13aWxsXCIsXHJcbiAgXCJzaGVsbGVkXCI6IFwidW5zaGVsbGVkXCIsXHJcbiAgXCJzaGVwaGVyZFwiOiBcImxlb3BhcmRcIixcclxuICBcInNoaW5lXCI6IFwiYmxpbmdcIixcclxuICBcInNob290aW5nIHN0YXJcIjogXCJzd2lmdCBtaXNzaWxlXCIsXHJcbiAgXCJzaG91dFwiOiBcIm91dFwiLFxyXG4gIFwic2hvdmluZ1wiOiBcImxvdmluZ1wiLFxyXG4gIFwic2hvd2VyXCI6IFwidG93ZXJcIixcclxuICBcInNpY2tcIjogXCJoaWNrXCIsXHJcbiAgXCJzaW5jZVwiOiBcInNlbnNlXCIsXHJcbiAgXCJzaXRlXCI6IFwic2lnaHRcIixcclxuICBcInNraW5cIjogXCJiaXNjdWl0c1wiLFxyXG4gIFwic2xhc2hcIjogXCJtdXRpbGF0ZVwiLFxyXG4gIFwic2xhdmVcIjogXCJnaW1wXCIsXHJcbiAgXCJzbGljZVwiOiBcInBldFwiLFxyXG4gIFwic2xpdFwiOiBcImNyZXZpY2VcIixcclxuICBcInNvIGdvb2RcIjogXCJuZWF0b1wiLFxyXG4gIFwic28gbW90ZSBpdCBiZVwiOiBcIml0J3MgcmVhbCBpbiBteSBoZWFkXCIsXHJcbiAgXCJzbyBuZXJ2b3VzXCI6IFwic28gZnVja2luZyBkcnVua1wiLFxyXG4gIFwic29cIjogXCJzZXdcIixcclxuICBcInNvYXJcIjogXCJzb3JlXCIsXHJcbiAgXCJzb2NpYWxcIjogXCJzb2NpZXRhbFwiLFxyXG4gIFwic29pbFwiOiBcInRvaWxcIixcclxuICBcInNvbGRpZXJcIjogXCJtYW5pYWNcIixcclxuICBcInNvbGVcIjogXCJzb3VsXCIsXHJcbiAgXCJzb2xpdHVkZVwiOiBcImFtYmlhbmNlXCIsXHJcbiAgXCJzb21lXCI6IFwic3VtXCIsXHJcbiAgXCJzb25zXCI6IFwidG9uc1wiLFxyXG4gIFwic29vblwiOiBcInNsdXR0eVwiLFxyXG4gIFwic29ycm93XCI6IFwid2hpbXBlclwiLFxyXG4gIFwic291bFwiOiBcImJhbmFuYVwiLFxyXG4gIFwic3BlYWsgb2ZcIjogXCJ0YWxrIGFib3V0XCIsXHJcbiAgXCJzcGVjaWFsbHlcIjogXCJlc3BlY2lhbGx5XCIsXHJcbiAgXCJzcGVlZFwiOiBcImxlYWRcIixcclxuICBcInNwaXJpdFwiOiBcImJhbmFuYVwiLFxyXG4gIFwic3Bpcml0dWFsXCI6IFwiYmFuYW5hIGNyYXZpbmdcIixcclxuICBcInNwaXRlXCI6IFwibGlnaHRcIixcclxuICBcInNwcmVhZFwiOiBcInNvcmVzXCIsXHJcbiAgXCJzcHJpbmdcIjogXCJ0dWJlIHNvY2tzXCIsXHJcbiAgXCJzdGFtcFwiOiBcImRhbXBcIixcclxuICBcInN0YW5kIG91dCBmcm9tIHRoZSBjcm93ZFwiOiBcImxvb2sgbGlrZSBhIGphY2thc3NcIixcclxuICBcInN0YW5kaW5nIG91dCBmcm9tIHRoZSBjcm93ZFwiOiBcIndvYmJsaW5nIGxpa2UgYW4gZWxlcGhhbnQgb24gYSBiaWN5Y2xlXCIsXHJcbiAgXCJzdGFuZHMgb3V0IGZyb20gdGhlIGNyb3dkXCI6IFwic21lbGxzIGxpa2Ugb2xkIGRpY2tcIixcclxuICBcInN0YXJcIjogXCJtaXNzaWxlXCIsXHJcbiAgXCJzdGF0dXJlXCI6IFwic3RhdHVlXCIsXHJcbiAgXCJzdGVhbFwiOiBcInN0ZWVsXCIsXHJcbiAgXCJzdGVhbGVyXCI6IFwiZGVhbGVyXCIsXHJcbiAgXCJzdGVlbFwiOiBcImxhdGV4XCIsXHJcbiAgXCJzdG9vZCBvdXQgZnJvbSB0aGUgY3Jvd2RcIjogXCJqaWdnbGVkIGxpa2UgYSBqZWxsbyBTYW50YVwiLFxyXG4gIFwic3RvcFwiOiBcInB1c2hcIixcclxuICBcInN0b3BwXCI6IFwicHVzaFwiLFxyXG4gIFwic3Rvcm1cIjogXCJvcmd5XCIsXHJcbiAgXCJzdHJhdGVnaWVzXCI6IFwidHJhZ2VkaWVzXCIsXHJcbiAgXCJzdHVkeWluZ1wiOiBcInN0dWRkaW5nXCIsXHJcbiAgXCJzdWJzdGFudGlhbFwiOiBcInN1YnN0YW50aXZlXCIsXHJcbiAgXCJzdWZmZXJcIjogXCJwaXJvdWV0dGVcIixcclxuICBcInN1aWNpZGVcIjogXCJtdXJkZXJcIixcclxuICBcInN1blwiOiBcInllbGxvdyBkaXNrXCIsXHJcbiAgXCJzdW5ueVwiOiBcInN3ZWx0ZXJpbmdcIixcclxuICBcInN1cHBvc2VkbHlcIjogXCJzdXBwb3NhYmx5XCIsXHJcbiAgXCJzd2VhdFwiOiBcImZhcnRcIixcclxuICBcInN3b3JkXCI6IFwiZGlsZG9cIixcclxuICBcInN5bmNocm9uaXplXCI6IFwic3ltcGF0aGl6ZVwiLFxyXG4gIFwidGFpbFwiOiBcInRhbGVcIixcclxuICBcInRha2UgY2FyZSBvZlwiOiBcImRlY2ltYXRlXCIsXHJcbiAgXCJ0YWtlIGNhcmVcIjogXCJmb3JnZXRcIixcclxuICBcInRha2VcIjogXCJzaGFrZVwiLFxyXG4gIFwidGFrZXMgY2FyZVwiOiBcImZvcmdldHNcIixcclxuICBcInRha2luZyBjYXJlXCI6IFwiZm9yZ2V0aW5nXCIsXHJcbiAgXCJ0YWxrXCI6IFwiY3Vzc1wiLFxyXG4gIFwidGFzdGVcIjogXCJ3YXN0ZVwiLFxyXG4gIFwidGF1bnRcIjogXCJ0YXV0XCIsXHJcbiAgXCJ0ZWFyXCI6IFwic3B1bmtcIixcclxuICBcInRlYXJkcm9wXCI6IFwidGVhciBkcm9wXCIsXHJcbiAgXCJ0ZWFyc1wiOiBcImVhcnNcIixcclxuICBcInRlYXNlXCI6IFwiZWFzZVwiLFxyXG4gIFwidGVsbCB5b3UgaSdtIGZpbmVcIjogXCJzY3JlbSBJJ00gRlVDS0lOIE9LXCIsXHJcbiAgXCJ0ZW5hbnRcIjogXCJ0ZW5ldFwiLFxyXG4gIFwidGVuZXRzXCI6IFwidGVuYW50c1wiLFxyXG4gIFwidGVybVwiOiBcIndvcm1cIixcclxuICBcInRlc3RhbWVudFwiOiBcInRlbnRhY2xlXCIsXHJcbiAgXCJ0aGUgYmVzdFwiOiBcInRoZSBiYWRkZXN0XCIsXHJcbiAgXCJ0aGUgZmlyc3QgbW9tZW50XCI6IFwic3RyYWlnaHRhd2F5XCIsXHJcbiAgXCJ0aGUgb25seSBvbmVcIjogXCJmdWNraW5nIHN0dXBpZFwiLFxyXG4gIFwidGhlIHBvaW50IG9mIG5vIHJldHVyblwiOiBcInRoZSBzdHJhbmdlcidzIHNleCBkdW5nZW9uXCIsXHJcbiAgXCJ0aGUgc3ByaW5nXCI6IFwidHViZSBzb2NrXCIsXHJcbiAgXCJ0aGUgd2F5IGl0IGlzXCI6IFwiaG93IGl0IGJlXCIsXHJcbiAgXCJ0aGVlXCI6IFwieW91XCIsXHJcbiAgXCJ0aGVpclwiOiBcInRoZXJlXCIsXHJcbiAgXCJ0aGVyZWZvclwiOiBcInRoZXJlZm9yZVwiLFxyXG4gIFwidGhpbmVcIjogXCJ5b3Unc1wiLFxyXG4gIFwidGhpbmtcIjogXCJzY2hlbWVcIixcclxuICBcInRob3JvdWdoXCI6IFwidGhvcm91Z2hnb2luZ1wiLFxyXG4gIFwidGhvdVwiOiBcInlvdVwiLFxyXG4gIFwidGhyb25lXCI6IFwidGhyb2JcIixcclxuICBcInRocm91Z2ggeW91ciBoYWlyXCI6IFwidXBzaWRlIHlvdXIgaGVhZFwiLFxyXG4gIFwidGh1c2x5XCI6IFwidGh1c1wiLFxyXG4gIFwidGltZVwiOiBcInRocm9iYmluZ1wiLFxyXG4gIFwidG8gYSBiZXR0ZXJcIjogXCJmb3Igc29tZSBnbGl0dGVyZWRcIixcclxuICBcInRvIGdldCBhd2F5XCI6IFwidG8gZnVja2luZyBydW5cIixcclxuICBcInRvIG5vIGF2YWlsXCI6IFwiZm9yIGdyZWF0IGdvb2RcIixcclxuICBcInRvIHRoZSBsaWdodFwiOiBcIm91dCBpbiBwdWJsaWNcIixcclxuICBcInRvZVwiOiBcInRvd1wiLFxyXG4gIFwidG9pbFwiOiBcInNvaWxcIixcclxuICBcInRvaWxldFwiOiBcInRlcmxpdFwiLFxyXG4gIFwidG9uc1wiOiBcInNvbnNcIixcclxuICBcInRvbyBnb29kIHRvIGJlIHRydWVcIjogXCJmdWNraW5nIGZhbnRhc3RpY1wiLFxyXG4gIFwidG9ybWVudFwiOiBcInRpY2tsZVwiLFxyXG4gIFwidG9yblwiOiBcImh1Z2dsZWRcIixcclxuICBcInRvcm5hZG9cIjogXCJ0b21hdG9cIixcclxuICBcInRvdWNoXCI6IFwiZ3JvcGVcIixcclxuICBcInRvdXRcIjogXCJ0YXV0XCIsXHJcbiAgXCJ0b3dhcmRcIjogXCJ0b3dhcmRzXCIsXHJcbiAgXCJ0b3dlclwiOiBcInNob3dlclwiLFxyXG4gIFwidHJhZ2VkaWVzXCI6IFwic3RyYXRlZ2llc1wiLFxyXG4gIFwidHJhbXBvbGluZVwiOiBcInRyYW1wYWxvb25cIixcclxuICBcInRydXRoXCI6IFwidHJpdmlhXCIsXHJcbiAgXCJ0cnlcIjogXCJzaG9vdFwiLFxyXG4gIFwidHVwcGVyd2FyZVwiOiBcInVuZGVyd2VhclwiLFxyXG4gIFwidHdhc1wiOiBcIml0IHdhc1wiLFxyXG4gIFwidHdpbGlnaHRcIjogXCJtb29uc2hpbmVcIixcclxuICBcInR3aW5rbGVcIjogXCJzdHJvYmVcIixcclxuICBcInR3aW5rbGluZ1wiOiBcInN0cm9iaW5nXCIsXHJcbiAgXCJ1bHRlcmlvclwiOiBcImFsdGVyaW9yXCIsXHJcbiAgXCJ1bmNhcmluZ1wiOiBcInByaWNraXNoXCIsXHJcbiAgXCJ1bmNvbnNjaW91c1wiOiBcInVuY29uc2NpZW5jZVwiLFxyXG4gIFwidW5kZXJzdGFuZFwiOiBcInN0cm9rZSBteSBlZ29cIixcclxuICBcInVuaWZvcm1cIjogXCJ1bmljb3JuXCIsXHJcbiAgXCJ1bml0ZWRcIjogXCJ1bnRpZWRcIixcclxuICBcInVuaXZlcnNlXCI6IFwidG9pbGV0IGJvd2xcIixcclxuICBcInVucGFyYWxsZWRcIjogXCJ1bnBhcmFseXplZFwiLFxyXG4gIFwidW5wYXJhbGxlbGVkXCI6IFwidW5wYXJhbHl6ZWRcIixcclxuICBcInVudGllZFwiOiBcInVuaXRlZFwiLFxyXG4gIFwidXBtb3N0XCI6IFwidXRtb3N0XCIsXHJcbiAgXCJ1cHBlZCB0aGUgYW50ZVwiOiBcInVwcGVkIHRoZSBhbm5pZVwiLFxyXG4gIFwidXNcIjogXCJ0aGVtXCIsXHJcbiAgXCJ1c2FnZVwiOiBcInVzZVwiLFxyXG4gIFwidXRpbGl6ZVwiOiBcInVzZVwiLFxyXG4gIFwidmFjYXRpb25cIjogXCJ2b2NhdGlvblwiLFxyXG4gIFwidmFsbGV5XCI6IFwiZGl0Y2hcIixcclxuICBcInZhbXBpcmVcIjogXCJwZWRvcGhpbGVcIixcclxuICBcInZhbXBpcmljXCI6IFwicGVkb3BoaWxpY1wiLFxyXG4gIFwidmFtcHlyZVwiOiBcInBlZG9waHlsZVwiLFxyXG4gIFwidmFyeVwiOiBcInZlcnlcIixcclxuICBcInZlaWxcIjogXCJkaXNndWlzZVwiLFxyXG4gIFwidmVuZ2VcIjogXCItcm93ZHktXCIsXHJcbiAgXCJ2ZW5nZWFuY2VcIjogXCJzbGFwIGhhcHBpbmVzc1wiLFxyXG4gIFwidmVyYmlhZ2VcIjogXCJ2ZXJiYWdlXCIsXHJcbiAgXCJ2ZXJpY29zZVwiOiBcInZlcnkgY2xvc2VcIixcclxuICBcInZpY2UgdmVyc2FcIjogXCJpcHNvIGZhdHNvXCIsXHJcbiAgXCJ2aW9sYVwiOiBcInZvaWxhXCIsXHJcbiAgXCJ2aW9sZW5jZVwiOiBcInZpb2xpbnNcIixcclxuICBcInZpcnR1ZVwiOiBcInZpcmdpblwiLFxyXG4gIFwidmlzY2lvdXMgY3ljbGVcIjogXCJjbHVzdGVyZnVja1wiLFxyXG4gIFwidmlzY291cyBjaXJjbGVcIjogXCJ2aWNpb3VzIGN5Y2xlXCIsXHJcbiAgXCJ2aXN0YVwiOiBcInNjZW5lXCIsXHJcbiAgXCJ2b2lkXCI6IFwiYnVja2V0XCIsXHJcbiAgXCJ2b2x1cHR1b3VzXCI6IFwidm9sdW1wdHVvdXNcIixcclxuICBcIndhaWxcIjogXCJ3aGFsZVwiLFxyXG4gIFwid2Fpc3RcIjogXCJ3YXN0ZVwiLFxyXG4gIFwid2FpdFwiOiBcIndlaWdodFwiLFxyXG4gIFwid2FsayBvdXRcIjogXCJuYXJyb3dseSBlc2NhcGVcIixcclxuICBcIndhbGtlZCBvdXRcIjogXCJuYXJyb3dseSBlc2NhcGVkXCIsXHJcbiAgXCJ3YWxraW5nIG91dFwiOiBcIm5hcnJvd2x5IGVzY2FwaW5nXCIsXHJcbiAgXCJ3YW5kZXJcIjogXCJzdHVtYmxlXCIsXHJcbiAgXCJ3YXJcIjogXCJ3b3JlXCIsXHJcbiAgXCJ3YXJmYXJlXCI6IFwiY2hpbGRyZW4gbGF1Z2hpbmdcIixcclxuICBcIndhcm1cIjogXCJmb3JtXCIsXHJcbiAgXCJ3YXJuXCI6IFwid29yblwiLFxyXG4gIFwid2FycmFudGVlXCI6IFwid2FycmFudHlcIixcclxuICBcIndhcnJpb3JcIjogXCJraXR0ZW5cIixcclxuICBcIndhcnlcIjogXCJ3ZWFyeVwiLFxyXG4gIFwid2FzIGlcIjogXCJ3ZXJlIGlcIixcclxuICBcIndhc3RlXCI6IFwidGFzdGVcIixcclxuICBcIndhdmVcIjogXCJzYXZlXCIsXHJcbiAgXCJ3YXlcIjogXCJ3ZWlnaFwiLFxyXG4gIFwid2F5c2lkZVwiOiBcIndhc3Rlc2lkZVwiLFxyXG4gIFwid2VcIjogXCJ0aGV5XCIsXHJcbiAgXCJ3ZWFrXCI6IFwid2Vla1wiLFxyXG4gIFwid2VhcG9uXCI6IFwiY2FwIGd1blwiLFxyXG4gIFwid2VhcnlcIjogXCJsZWVyeVwiLFxyXG4gIFwid2VhdGhlclwiOiBcIndoZXRoZXJcIixcclxuICBcIndlZGRpbmdcIjogXCJiZWRkaW5nXCIsXHJcbiAgXCJ3ZWVrXCI6IFwid2VlZFwiLFxyXG4gIFwid2VsbHNcIjogXCJiZWxsc1wiLFxyXG4gIFwid2VyZXdvbGZcIjogXCJ3ZWlyZHdvbGZcIixcclxuICBcIndoYWxlc1wiOiBcInNhaWxzXCIsXHJcbiAgXCJ3aGF0IHBlb3BsZSBzYXlcIjogXCJtdXRoYXBodWtrYXMgYmUgdGFsa2luXCIsXHJcbiAgXCJ3aGF0J3MgdGhlIHBvaW50XCI6IFwidGhlIGZ1Y2tzIHRoaXMgbWVhblwiLFxyXG4gIFwid2hpY2hcIjogXCJ3aXRjaFwiLFxyXG4gIFwid2llbGRcIjogXCJqZXJrXCIsXHJcbiAgXCJ3aWxsIGFsd2F5cyBiZSB0aGVyZVwiOiBcInN0aWNrIGxpa2Ugd2V0IHNoaXRcIixcclxuICBcIndpbGwgYmUgdGhlcmVcIjogXCJzdGljayBsaWtlIHNoaXRcIixcclxuICBcIndpbGwgbm90IGhlYWxcIjogXCJmZXN0ZXJzXCIsXHJcbiAgXCJ3aW5kXCI6IFwiYmxvd1wiLFxyXG4gIFwid2lzZG9tXCI6IFwiYnVsbCBzaGl0XCIsXHJcbiAgXCJ3aXNlXCI6IFwiYnVsbCBzaGl0dGluZ1wiLFxyXG4gIFwid2lzaFwiOiBcIndhbnRcIixcclxuICBcIndpdGggZXZlcnkgZmliZXJcIjogXCJmcm9tIHBpdGh5IHBpdHNcIixcclxuICBcIndvZVwiOiBcImNobGFteWRpYVwiLFxyXG4gIFwid29uJ3QgbWFrZSBpdCB0aHJvdWdoXCI6IFwiY291bGQgc2hpbW15IHBhc3RcIixcclxuICBcIndvcmxkXCI6IFwiaGFuZCB0b3dlbFwiLFxyXG4gIFwid29ybVwiOiBcInRlcm1cIixcclxuICBcIndvcnNlIGNvbWVzIHRvIHdvcnN0XCI6IFwid29yc3QgY29tZXMgdG8gd29yc3RcIixcclxuICBcIndvcnRod2hpbGVcIjogXCJ3b3J0aHdpbGRcIixcclxuICBcIndvdW5kXCI6IFwib3VjaGllXCIsXHJcbiAgXCJ3cmV0Y2hcIjogXCJza2VlemVcIixcclxuICBcIndyZXRjaGVkXCI6IFwic2tlZXp5XCIsXHJcbiAgXCJ3cml0ZVwiOiBcInNjcmF3bFwiLFxyXG4gIFwid3JpdHRlblwiOiBcInNjcmF3bGVkXCIsXHJcbiAgXCJ3cm9uZ1wiOiBcImJ1enppbmdcIixcclxuICBcIndyb3RlXCI6IFwic2NyYXdsZWRcIixcclxuICBcInlldFwiOiBcImltbWVkaWF0ZWx5XCIsXHJcbiAgXCJ5b3UgYWxsXCI6IFwiYWxsIHlvdVwiLFxyXG4gIFwieW91IHdlcmUgdGhlIG9uZVwiOiBcInlvdSB3ZXJlIG15IHRhcmdldFwiLFxyXG4gIFwieW91XCI6IFwiRHVtbWllJ3NcIixcclxuICBcInlvdSdsbFwiOiBcInlvdSB3aWxsXCIsXHJcbiAgXCJ5b3UncmVcIjogXCJ5b3UgaXNcIixcclxuICBcInlvdSd2ZVwiOiBcInlvdSBoYXNcIixcclxuICBcInlvdXJcIjogXCJ5b3Unc1wiLFxyXG4gIFwieW91cnNcIjogXCJ5b3Unc1wiLFxyXG4gIFwieW91cnNlbGZcIjogXCJ5b3UncyBtdWNobmVzc1wiLFxyXG4gIFwiemVicmFzXCI6IFwiemViZXJlbGxhc1wiLFxyXG4gIFwienVjY2hpbmlcIjogXCJjdWlzaW5pXCJcclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vZG9jcy92c2RvYy9PcGVuTGF5ZXJzQWxsLmpzXCIvPlxyXG4vKmpzbGludFxyXG4gICAgbm9kZTogdHJ1ZVxyXG4qL1xyXG52YXIgYXRyb3BhID0gcmVxdWlyZSgnYXRyb3BhLWhlYWRlcicpO1xyXG5hdHJvcGEucmVnZXggPSByZXF1aXJlKCdhdHJvcGEtcmVnZXgnKS5yZWdleDtcclxuYXRyb3BhLnN0cmluZyA9IHJlcXVpcmUoJ2F0cm9wYS1zdHJpbmcnKS5zdHJpbmc7XHJcbmF0cm9wYS5zZXRBc09wdGlvbmFsQXJnID0gcmVxdWlyZSgnYXRyb3BhLXNldEFzT3B0aW9uYWxBcmcnKS5zZXRBc09wdGlvbmFsQXJnO1xyXG4vKmpzbGludFxyXG4gICAgaW5kZW50OiA0LFxyXG4gICAgbWF4ZXJyOiA1MCxcclxuICAgIHdoaXRlOiB0cnVlLFxyXG4gICAgYnJvd3NlcjogdHJ1ZSxcclxuICAgIGRldmVsOiB0cnVlLFxyXG4gICAgcGx1c3BsdXM6IHRydWUsXHJcbiAgICByZWdleHA6IHRydWUsXHJcbiAgICB2YXJzOiB0cnVlXHJcbiovXHJcbi8qZ2xvYmFsIGF0cm9wYSAqL1xyXG4vLyBlbmQgaGVhZGVyXHJcbihmdW5jdGlvbiAoKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcbiAgICBhdHJvcGEucmVxdWlyZXMoJ3d0ZicsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgc3VwcG9ydGVkID0gdHJ1ZTtcclxuICAgICAgICBbXHJcbiAgICAgICAgICAgIGF0cm9wYS5yZWdleCxcclxuICAgICAgICAgICAgYXRyb3BhLnN0cmluZy5jb3VudFdvcmRzLFxyXG4gICAgICAgICAgICBhdHJvcGEuc2V0QXNPcHRpb25hbEFyZ1xyXG4gICAgICAgIF0uZm9yRWFjaChmdW5jdGlvbiAocHJlcmVxdWlzaXRlKSB7XHJcbiAgICAgICAgICAgIGlmIChwcmVyZXF1aXNpdGUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgc3VwcG9ydGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gc3VwcG9ydGVkO1xyXG4gICAgfSk7XHJcbn0oKSk7XHJcbihmdW5jdGlvbiAoKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcbiAgICBhdHJvcGEucmVxdWlyZXMoJ3d0Zkh0bWxFbGVtZW50JywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBzdXBwb3J0ZWQgPSB0cnVlO1xyXG4gICAgICAgIFt3aW5kb3ddLmZvckVhY2goZnVuY3Rpb24gKHByZXJlcXVpc2l0ZSkge1xyXG4gICAgICAgICAgICBpZiAocHJlcmVxdWlzaXRlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHN1cHBvcnRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHN1cHBvcnRlZDtcclxuICAgIH0pO1xyXG59KCkpO1xyXG4vKipcclxuICogQ29udGFpbmVyIGZvciBhbGwgR2xvcmlvdXMgV1RGaWZpZXIgcmVsYXRlZCBmdW5jdGlvbnMgYW5kIHN1Y2guXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEyMDkwOVxyXG4gKiBAbmFtZXNwYWNlIENvbnRhaW5lciBmb3IgYWxsIEdsb3Jpb3VzIFdURmlmaWVyIHJlbGF0ZWQgZnVuY3Rpb25zIGFuZCBzdWNoLlxyXG4gKiBAcmVxdWlyZXMgYXRyb3BhLnJlZ2V4XHJcbiAqIEByZXF1aXJlcyBhdHJvcGEud3RmLmRpY3Rpb25hcnlcclxuICovXHJcbmF0cm9wYS53dGYgPSB7fTtcclxuLyoqXHJcbiAqIFRoZSBHbG9yaW91cyBXVEZpZmljYXRpb24gRGljdGlvbmFyeTogVHVybmluZyBTaGl0XHJcbiAqIEludG8gUG9saXNoZWQgVHVyZHMuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDExMFxyXG4gKi9cclxuYXRyb3BhLnd0Zi5kaWN0aW9uYXJ5ID0gcmVxdWlyZSgnLi9hdHJvcGEtd3RmLWRpY3Rpb25hcnkuanNvbicpO1xyXG4vKipcclxuICogQWNjZXB0cyBwbGFpbiB0ZXh0IGlucHV0IGFuZCBHbG9yaW91c2x5IFdURmlmaWVzIGl0LlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzAxMTBcclxuICogQHBhcmFtIHtTdHJpbmd9IHRhcmdldCBUaGUgdGV4dCB0byBXVEZpZnkuXHJcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gb3V0cHV0SFRNTCBTcGVjaWZpZXMgaWYgeW91IHdhbnQgdGhlIG91dHB1dFxyXG4gKiAgaW4gSFRNTCBmb3JtYXQuIElmIGZhbHNlLCB3aWxsIG91dHB1dCBwbGFpbiB0ZXh0LiBEZWZhdWx0c1xyXG4gKiAgdG8gZmFsc2UuXHJcbiAqIEByZXR1cm4ge1N0cmluZ30gUmV0dXJucyBHZW51aW5lIFdURmlmaWVkIHRleHQuXHJcbiAqL1xyXG5hdHJvcGEud3RmLnd0ZmlmeSA9IGZ1bmN0aW9uICh0YXJnZXQsIG91dHB1dEhUTUwpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuICAgIGF0cm9wYS5zdXBwb3J0Q2hlY2soJ3d0ZicpO1xyXG4gICAgdmFyIHJlZ2V4VmFsdWUsIHJlcGxhY2VtZW50VGV4dCwgb2xkV29yZCwgd3RmQ291bnQsIHdvcmRDb3VudCwgcmV0LCB3b3JkO1xyXG4gICAgaWYgKHRydWUgIT09IG91dHB1dEhUTUwpIHtcclxuICAgICAgICBvdXRwdXRIVE1MID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICByZXQgPSB7fTtcclxuICAgIHd0ZkNvdW50ID0gMDtcclxuICAgIHRhcmdldCA9IHRhcmdldC50cmltKCk7XHJcbiAgICB3b3JkQ291bnQgPSBhdHJvcGEuc3RyaW5nLmNvdW50V29yZHModGFyZ2V0KTtcclxuICAgIGlmICh0cnVlID09PSBvdXRwdXRIVE1MKSB7XHJcbiAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0LnJlcGxhY2UoLyhcXC4gPyl7Mix9L2dpLCAnPHNwYW4gc3R5bGU9XCJjb2xvciA6IGJyb3duIDtcIj4gW3NoaXQgdGFjb10gPC9zcGFuPicpO1xyXG4gICAgICAgIHRhcmdldCA9ICc8cD4gJyArIHRhcmdldC5yZXBsYWNlKC8oXFxyXFxufFxccnxcXG4pL2csICcgPGJyLz4gJykgKyAnIDwvcD4nO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB0YXJnZXQgPSB0YXJnZXQucmVwbGFjZSgvKFxcLiA/KXsyLH0vZ2ksICcgW3NoaXQgdGFjb10gJyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIEFjY2VwdHMgcGxhaW4gdGV4dCBpbnB1dCBhbmQgR2xvcmlvdXNseSBXVEZpZmllcyBpdC5cclxuICAgICAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gICAgICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAgICAgKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAgICAgKiBAdmVyc2lvbiAyMDEzMDExMlxyXG4gICAgICogQG1ldGhvZE9mIGF0cm9wYS53dGYud3RmaWZ5LVxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBtIEZpcnN0IG1hdGNoZWQgcGF0dGVybiBpbiBzdHJpbmcgc2VhcmNoZWQuXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gc3ViMSBGaXJzdCBtYXRjaGVkIHN1YnBhdHRlcm4gaW4gc3RyaW5nIHNlYXJjaGVkLlxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHN1YjIgU2Vjb25kIG1hdGNoZWQgc3VicGF0dGVybiBpbiBzdHJpbmcgc2VhcmNoZWQuXHJcbiAgICAgKi9cclxuICAgIC8qanNsaW50IHVucGFyYW06IHRydWUqL1xyXG4gICAgcmVwbGFjZW1lbnRUZXh0ID0gZnVuY3Rpb24gKG0sIHN1YjEsIHN1YjIpIHtcclxuICAgICAgICB3dGZDb3VudCsrO1xyXG4gICAgICAgIHN1YjEgPSBhdHJvcGEuc2V0QXNPcHRpb25hbEFyZygnJywgc3ViMSk7XHJcbiAgICAgICAgc3ViMiA9IGF0cm9wYS5zZXRBc09wdGlvbmFsQXJnKCcnLCBzdWIyKTtcclxuICAgICAgICB2YXIgb3V0O1xyXG4gICAgICAgIGlmICh0cnVlID09PSBvdXRwdXRIVE1MKSB7XHJcbiAgICAgICAgICAgIG91dCA9ICc8c3BhbiBzdHlsZT1cImNvbG9yIDogcmVkIDtcIj4nICsgc3ViMSArIGF0cm9wYS53dGYuZGljdGlvbmFyeVt3b3JkXSArIHN1YjIgKyAnPC9zcGFuPic7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgb3V0ID0gc3ViMSArIGF0cm9wYS53dGYuZGljdGlvbmFyeVt3b3JkXSArIHN1YjI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9O1xyXG4gICAgLypqc2xpbnQgdW5wYXJhbTogZmFsc2UqL1xyXG4gICAgLy8gd29yZCBpcyBkZWZpbmVkIGluIHRoZSBjb250YWluaW5nIHNjb3BlIGFuZFxyXG4gICAgLy8gaXMgbm90IGdsb2JhbCwganNoaW50IGlzIHdyb25nXHJcbiAgICBmb3IgKHdvcmQgaW4gYXRyb3BhLnd0Zi5kaWN0aW9uYXJ5KSB7XHJcbiAgICAgICAgaWYgKGF0cm9wYS53dGYuZGljdGlvbmFyeS5oYXNPd25Qcm9wZXJ0eSh3b3JkKSkge1xyXG4gICAgICAgICAgICBvbGRXb3JkID0gYXRyb3BhLnJlZ2V4LmFwcGVuZFByZWZpeGVzQW5kU3VmZml4ZXMod29yZCk7XHJcbiAgICAgICAgICAgIHJlZ2V4VmFsdWUgPSBuZXcgUmVnRXhwKG9sZFdvcmQsICdnaScpO1xyXG4gICAgICAgICAgICB0YXJnZXQgPSB0YXJnZXQucmVwbGFjZShyZWdleFZhbHVlLCByZXBsYWNlbWVudFRleHQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldC53dGZDb3VudCA9IHd0ZkNvdW50O1xyXG4gICAgcmV0LndvcmRDb3VudCA9IHdvcmRDb3VudDtcclxuICAgIHJldC5zY29yZSA9IHd0ZkNvdW50IC8gd29yZENvdW50O1xyXG4gICAgcmV0LnR4dCA9IHRhcmdldDtcclxuICAgIHJldHVybiByZXQ7XHJcbn07XHJcbi8qKlxyXG4gKiBXVEZpZmllcyB0aGUgPGNvZGU+dGV4dENvbnRlbnQ8L2NvZGU+IG9yIDxjb2RlPnZhbHVlPC9jb2RlPiBvZiB0aGVcclxuICogIGdpdmVuIGVsZW1lbnQgYW5kIHJlcGxhY2VzIHRoZSBlbGVtZW50J3MgaW5uZXJIVE1MIHdpdGggYSBwcmUgYmxvY2tcclxuICogIGNvbnRhaW5pbmcgdGhlIHJlc3VsdHMgb2YgV1RGaWZpY2F0aW9uLlxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50UmVmZXJlbmNlIEEgcmVmZXJlbmNlIHRvIGFuIEhUTUwgRWxlbWVudC5cclxuICogQHJldHVybnMge0hUTUxFbGVtZW50fSBSZXR1cm5zIHRoZSBnaXZlbiBlbGVtZW50IGFmdGVyIHd0ZmlmaWNhdGlvbi5cclxuICogQHZlcnNpb24gMjAxMzAzMTNcclxuICovXHJcbmF0cm9wYS53dGYuaHRtbEVsZW1lbnQgPSBmdW5jdGlvbiAoZWxlbWVudFJlZmVyZW5jZSkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG4gICAgYXRyb3BhLnN1cHBvcnRDaGVjaygnd3RmSHRtbEVsZW1lbnQnKTtcclxuICAgIHZhciB3dGZpZmllZCwgdHh0O1xyXG4gICAgZWxlbWVudFJlZmVyZW5jZS5pbm5lckhUTUwgPSBlbGVtZW50UmVmZXJlbmNlLmlubmVySFRNTC5yZXBsYWNlKC88YnI+KFxccyspPyhcXHJcXG58XFxyfFxcbik/L2csICdcXHJcXG4nKTtcclxuICAgIHR4dCA9IGVsZW1lbnRSZWZlcmVuY2UudmFsdWUgfHwgZWxlbWVudFJlZmVyZW5jZS50ZXh0Q29udGVudDtcclxuICAgIHd0ZmlmaWVkID0gYXRyb3BhLnd0Zi53dGZpZnkodHh0LCB0cnVlKTtcclxuICAgIGVsZW1lbnRSZWZlcmVuY2UuaW5uZXJIVE1MID0gJzxwcmUgc3R5bGU9XCJjb2xvcjpibGFjazsgYmFja2dyb3VuZDp3aGl0ZTsgd2hpdGUtc3BhY2U6cHJlLXdyYXA7XCI+JyArIHd0ZmlmaWVkLnR4dCArICc8L3ByZT4nO1xyXG4gICAgcmV0dXJuIGVsZW1lbnRSZWZlcmVuY2U7XHJcbn07XHJcbndoaWxlIChhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMubGVuZ3RoID4gMCkge1xyXG4gICAgYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLnBvcCgpKCk7XHJcbn1cclxubW9kdWxlLmV4cG9ydHMgPSBhdHJvcGE7IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL2RvY3MvdnNkb2MvT3BlbkxheWVyc0FsbC5qc1wiLz5cclxudmFyIGF0cm9wYSA9IHJlcXVpcmUoJ2F0cm9wYS1oZWFkZXInKTtcclxuYXRyb3BhLnNldEFzT3B0aW9uYWxBcmcgPSByZXF1aXJlKCdhdHJvcGEtc2V0QXNPcHRpb25hbEFyZycpLnNldEFzT3B0aW9uYWxBcmc7XHJcbmF0cm9wYS5yZW1vdmVOb2RlQnlSZWZlcmVuY2UgPSByZXF1aXJlKCdhdHJvcGEtcmVtb3ZlTm9kZUJ5UmVmZXJlbmNlJykucmVtb3ZlTm9kZUJ5UmVmZXJlbmNlO1xyXG4vKmpzbGludFxyXG4gICAgaW5kZW50OiA0LFxyXG4gICAgbWF4ZXJyOiA1MCxcclxuICAgIHdoaXRlOiB0cnVlLFxyXG4gICAgYnJvd3NlcjogdHJ1ZSxcclxuICAgIGRldmVsOiB0cnVlLFxyXG4gICAgcGx1c3BsdXM6IHRydWUsXHJcbiAgICByZWdleHA6IHRydWVcclxuKi9cclxuLypnbG9iYWwgYXRyb3BhLCBYUGF0aFJlc3VsdCAqL1xyXG4vLyBlbmQgaGVhZGVyXHJcblxyXG5cclxuKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgYXRyb3BhLnJlcXVpcmVzKFxyXG4gICAgICAgICd4cGF0aCcsXHJcbiAgICAgICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgc3VwcG9ydGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgIHdpbmRvdyxcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmV2YWx1YXRlXHJcbiAgICAgICAgICAgIF0uZm9yRWFjaChmdW5jdGlvbiAocHJlcmVxdWlzaXRlKSB7XHJcbiAgICAgICAgICAgICAgICBpZihwcmVyZXF1aXNpdGUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN1cHBvcnRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIHN1cHBvcnRlZDtcclxuICAgICAgICB9XHJcbiAgICApO1xyXG59KCkpO1xyXG5cclxuLyoqXHJcbiAqIEFuIFhwYXRoIHRvb2xraXQgZm9yIG1hbmlwdWxhdGluZyB0aGUgRE9NLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzAzMTNcclxuICogQG5hbWVzcGFjZSBBbiBYcGF0aCB0b29sa2l0IGZvciBtYW5pcHVsYXRpbmcgdGhlIERPTS5cclxuICovXHJcbmF0cm9wYS54cGF0aCA9IHt9O1xyXG4vKipcclxuICogUHJvY2Vzc2VzIG5vZGVzIGZyb20gdGhlIERPTSB1c2luZyBhbiBYcGF0aCBleHByZXNzaW9uLlxyXG4gKiBAZXhhbXBsZVxyXG4gKiAgIC8vIFNheSB5b3Ugd2FudGVkIHRvIHRvdWNoIGFsbCB0aGUgYW5jaG9ycyBhbmQgbGlua3MgaW4gd2luZG93LmRvY3VtZW50XHJcbiAqICAgdmFyIHhwYXRoRXhwcmVzc2lvbiwgY2FsbGJhY2s7XHJcbiAqICAgeHBhdGhFeHByZXNzaW9uID0gJy4vL2EnO1xyXG4gKiAgIGNhbGxiYWNrID0gZnVuY3Rpb24ob25lTm9kZSkge1xyXG4gKiAgICAgICBvbmVOb2RlLnRvdWNoZWQgPSB0cnVlO1xyXG4gKiAgIH1cclxuICogICBhdHJvcGEueHBhdGgucHJvY2Vzc05vZGVzQnlYcGF0aChcclxuICogICAgICAgeHBhdGhFeHByZXNzaW9uLCBkb2N1bWVudCwgZG9jdW1lbnQsIGNhbGxiYWNrKTtcclxuICogICBcclxuICogICAvLyBPciBzYXkgeW91IGhhdmUgYW4gaWZyYW1lLCB3aXRoIHRoZSBpZCAnbXlGcmFtZScuIEluIHRoZSBpZnJhbWUgdGhlcmVcclxuICogICAvLyBpcyBhIGRpdiB3aXRoIHRoZSBpZCBteURpdi5cclxuICogICAvLyBIZXJlIGlzIGhvdyB5b3Ugd291bGQgcmVtb3ZlIGFsbCB0aGUgYW5jaG9ycyBpbiB0aGF0IGRpdi5cclxuICogICB2YXIgbXlGcmFtZSwgeHBhdGhFeHByZXNzaW9uLCBjb250ZXh0Tm9kZSwgZG9jcmVmLCBjYWxsYmFjaztcclxuICogICBteUZyYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ215RnJhbWUnKTtcclxuICogICBkb2NyZWYgPSBteUZyYW1lLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQ7XHJcbiAqICAgY29udGV4dE5vZGUgPSBkb2NyZWYuZ2V0RWxlbWVudEJ5SWQoJ215RGl2Jyk7XHJcbiAqICAgeHBhdGhFeHByZXNzaW9uID0gJy4vL2EnO1xyXG4gKiAgIGNhbGxiYWNrID0gZnVuY3Rpb24ob25lTm9kZSkge1xyXG4gKiAgICAgICBhdHJvcGEucmVtb3ZlTm9kZUJ5UmVmZXJlbmNlKG9uZU5vZGUpO1xyXG4gKiAgIH1cclxuICogICBhdHJvcGEueHBhdGgucHJvY2Vzc05vZGVzQnlYcGF0aChcclxuICogICAgICAgeHBhdGhFeHByZXNzaW9uLCBjb250ZXh0Tm9kZSwgZG9jcmVmLCBjYWxsYmFjayk7XHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDMxM1xyXG4gKiBAcGFyYW0ge1N0cmluZ30geHBhdGhFeHByZXNzaW9uIEFuIFhwYXRoIGV4cHJlc3Npb24gYXMgYSBzdHJpbmdcclxuICogQHBhcmFtIHtET00gTm9kZX0gY29udGV4dE5vZGUgT3B0aW9uYWwuIFRoZSBub2RlIHdoaWNoIGlzIHRvIHNlcnZlIGFzIHRoZSByb290XHJcbiAqIGZvciB0aGUgc3VwcGxpZWQgWHBhdGggZXhwcmVzc2lvbi4gRGVmYXVsdHMgdG8gd2hhdGV2ZXIgZG9jcmVmIGlzLlxyXG4gKiBJZiB5b3UgYXJlIHVzaW5nIGEgcmVsYXRpdmUgcGF0aCBzdWNoIGFzIDxjb2RlPi4vL2E8L2NvZGU+IGFuZCwgeW91IG9ubHlcclxuICogd2FudCB0aGUgYW5jaG9ycyB0aGF0IGFyZSBkZXNjZW5kYW50cyBvZiBhbm90aGVyIGVsZW1lbnQsIHlvdSB3b3VsZFxyXG4gKiBzdXBwbHkgYSByZWZlcmVuY2UgdG8gdGhhdCBlbGVtZW50IGZvciB0aGlzIGFyZ3VtZW50LiBXaGVuIHVzaW5nIGFcclxuICogY29udGV4dCBub2RlLCB0aGUgZG9jcmVmIGFyZ3VtZW50IG11c3QgcmVmZXIgdG8gdGhlIGNvbnRleHQgbm9kZSdzXHJcbiAqIGNvbnRhaW5pbmcgZG9jdW1lbnQuXHJcbiAqIEBwYXJhbSB7RE9NIERvY3VtZW50fSBkb2NyZWYgT3B0aW9uYWwuIEEgcmVmZXJlbmNlIHRvIHRoZSBkb2N1bWVudCB5b3VcclxuICogYXJlIHNlYXJjaGluZywgZGVmYXVsdHMgdG8gZG9jdW1lbnQuIElmIHlvdSBoYXZlIGNyZWF0ZWQgYSBzZXBhcmF0ZVxyXG4gKiBET01Eb2N1bWVudCB3aXRoIHRoZSA8Y29kZT5hdHJvcGEuSFRNTFBhcnNlcjwvY29kZT4sIGFuIGlmcmFtZSwgb3IgYnlcclxuICogc29tZSBvdGhlciBtZWFucywgeW91IHdvdWxkIHB1dCBhIHJlZmVyZW5jZSB0byB0aGF0IGRvY3VtZW50IGhlcmUgdG9cclxuICogaW5kaWNhdGUgdGhhdCB5b3UgaW50ZW5kIHRvIHVzZSB0aGF0IGRvY3VtZW50J3Mgcm9vdC5cclxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgQSBmdW5jdGlvbiBhcHBsaWVkIHRvIGV2ZXJ5IGVsZW1lbnQgZm91bmRcclxuICogdXNpbmcgdGhlIHN1cHBsaWVkIHhwYXRoIGV4cHJlc3Npb24uIFRoZSBjYWxsYmFjayByZWNlaXZlcyBhIHNpbmdsZVxyXG4gKiBlbGVtZW50IGFzIGl0J3Mgb25seSBhcmd1bWVudC5cclxuICogQHJldHVybnMge051bWJlcn0gUmV0dXJucyB0aGUgcXVhbnRpdHkgb2Ygbm9kZXMgcHJvY2Vzc2VkLlxyXG4gKi9cclxuYXRyb3BhLnhwYXRoLnByb2Nlc3NOb2Rlc0J5WHBhdGggPSBmdW5jdGlvbiBwcm9jZXNzTm9kZXNCeVhwYXRoKFxyXG4gICAgeHBhdGhFeHByZXNzaW9uLCBjb250ZXh0Tm9kZSwgZG9jcmVmLCBjYWxsYmFja1xyXG4pIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgYXRyb3BhLnN1cHBvcnRDaGVjaygneHBhdGgnKTtcclxuICAgIGRvY3JlZiA9IGF0cm9wYS5zZXRBc09wdGlvbmFsQXJnKGRvY3VtZW50LCBkb2NyZWYpO1xyXG4gICAgY29udGV4dE5vZGUgPSBhdHJvcGEuc2V0QXNPcHRpb25hbEFyZyhkb2NyZWYsIGNvbnRleHROb2RlKTtcclxuICAgIHZhciBub2Rlc1NuYXBzaG90LFxyXG4gICAgbnNsLFxyXG4gICAgaSxcclxuICAgIG5zaTtcclxuICAgIG5vZGVzU25hcHNob3QgPSBkb2NyZWYuZXZhbHVhdGUoXHJcbiAgICAgICAgeHBhdGhFeHByZXNzaW9uLFxyXG4gICAgICAgIGNvbnRleHROb2RlLFxyXG4gICAgICAgIG51bGwsXHJcbiAgICAgICAgWFBhdGhSZXN1bHQuT1JERVJFRF9OT0RFX1NOQVBTSE9UX1RZUEUsXHJcbiAgICAgICAgbnVsbFxyXG4gICAgKTtcclxuICAgIG5zbCA9IG5vZGVzU25hcHNob3Quc25hcHNob3RMZW5ndGg7XHJcbiAgICBmb3IgKGkgPSAwOyBpIDwgbnNsOyBpKyspIHtcclxuICAgICAgICBuc2kgPSBub2Rlc1NuYXBzaG90LnNuYXBzaG90SXRlbShpKTtcclxuICAgICAgICBjYWxsYmFjayhuc2kpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGk7XHJcbn07XHJcbi8qKlxyXG4gKiBSZW1vdmVzIG5vZGVzIGZyb20gdGhlIERPTSB1c2luZyBhbiBYcGF0aCBleHByZXNzaW9uLlxyXG4gKiBAZXhhbXBsZVxyXG4gKiAgIC8vIHRvIHJlbW92ZSBhbGwgYW5jaG9ycyB3aXRoIHRoZSBjbGFzcyBcIm9vcHNcIiBpbnNpZGUgb2YgYW55IGRpdiBpblxyXG4gKiAgIC8vIGRvY3VtZW50XHJcbiAqICAgdmFyIHhwYXRoRXhwcmVzc2lvbiA9IFwiLi8vZGl2Ly9hW0BjbGFzcz0nb29wcyddXCI7XHJcbiAqICAgYXRyb3BhLnhwYXRoLnJlbW92ZU5vZGVzQnlYcGF0aCh4cGF0aEV4cHJlc3Npb24pO1xyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzAzMTNcclxuICogQHBhcmFtIHtTdHJpbmd9IHhwYXRoRXhwcmVzc2lvbiBBbiBYcGF0aCBleHByZXNzaW9uIGFzIGEgc3RyaW5nXHJcbiAqIEBwYXJhbSB7RE9NIE5vZGV9IGNvbnRleHROb2RlIE9wdGlvbmFsLiBUaGUgbm9kZSB3aGljaCBpcyB0byBzZXJ2ZSBhcyB0aGUgcm9vdFxyXG4gKiBmb3IgdGhlIHN1cHBsaWVkIFhwYXRoIGV4cHJlc3Npb24uIERlZmF1bHRzIHRvIHdoYXRldmVyIGRvY3JlZiBpcy5cclxuICogQHBhcmFtIHtET00gRG9jdW1lbnR9IGRvY3JlZiBPcHRpb25hbC4gQSByZWZlcmVuY2UgdG8gdGhlIGRvY3VtZW50IHlvdVxyXG4gKiBhcmUgc2VhcmNoaW5nLCBkZWZhdWx0cyB0byBkb2N1bWVudC5cclxuICogQHJldHVybnMge051bWJlcn0gUmV0dXJucyB0aGUgcXVhbnRpdHkgb2Ygbm9kZXMgcmVtb3ZlZC5cclxuICogQHNlZSBhdHJvcGEueHBhdGgucHJvY2Vzc05vZGVzQnlYcGF0aCBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICovXHJcbmF0cm9wYS54cGF0aC5yZW1vdmVOb2Rlc0J5WHBhdGggPSBmdW5jdGlvbiByZW1vdmVOb2Rlc0J5WHBhdGgoXHJcbiAgICB4cGF0aEV4cHJlc3Npb24sIGNvbnRleHROb2RlLCBkb2NyZWZcclxuKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIGF0cm9wYS5zdXBwb3J0Q2hlY2soJ3hwYXRoJyk7XHJcbiAgICB2YXIgY291bnQ7XHJcbiAgICBjb3VudCA9IGF0cm9wYS54cGF0aC5wcm9jZXNzTm9kZXNCeVhwYXRoKFxyXG4gICAgICAgIHhwYXRoRXhwcmVzc2lvbixcclxuICAgICAgICBjb250ZXh0Tm9kZSxcclxuICAgICAgICBkb2NyZWYsXHJcbiAgICAgICAgZnVuY3Rpb24gKGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgYXRyb3BhLnJlbW92ZU5vZGVCeVJlZmVyZW5jZShlbGVtZW50KTtcclxuICAgICAgICB9XHJcbiAgICApO1xyXG4gICAgcmV0dXJuIGNvdW50O1xyXG59O1xyXG4vKipcclxuICogU2VsZWN0cyBub2RlcyBmcm9tIHRoZSBET00gdXNpbmcgYW4gWHBhdGggZXhwcmVzc2lvbi5cclxuICogQGV4YW1wbGVcclxuICogPHByZT5cclxuICogICAvLyBUbyBnZXQgYWxsIHRoZSBlbGVtZW50cyBpbiB0aGUgZG9jdW1lbnQgd2l0aCBhIHNyYyBhdHRyaWJ1dGU6XHJcbiAqICAgdmFyIHNyY0VsZW1lbnRzID0gYXRyb3BhLnhwYXRoLmdldE5vZGVzQnlYcGF0aCgnW0BzcmNdJyk7XHJcbiAqIDwvcHJlPlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzAzMTNcclxuICogQHBhcmFtIHtTdHJpbmd9IHhwYXRoRXhwcmVzc2lvbiBBbiBYcGF0aCBleHByZXNzaW9uIGFzIGEgc3RyaW5nXHJcbiAqIEBwYXJhbSB7RE9NIE5vZGV9IGNvbnRleHROb2RlIE9wdGlvbmFsLiBUaGUgbm9kZSB3aGljaCBpcyB0byBzZXJ2ZSBhcyB0aGUgcm9vdFxyXG4gKiBmb3IgdGhlIHN1cHBsaWVkIFhwYXRoIGV4cHJlc3Npb24uIERlZmF1bHRzIHRvIHRoZSBkb2N1bWVudCdzIHJvb3Qgbm9kZS5cclxuICogQHBhcmFtIHtET00gRG9jdW1lbnR9IGRvY3JlZiBPcHRpb25hbC4gQSByZWZlcmVuY2UgdG8gdGhlIGRvY3VtZW50IHlvdVxyXG4gKiBhcmUgc2VhcmNoaW5nLCBkZWZhdWx0cyB0byBkb2N1bWVudC5cclxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGFuIGFycmF5IHdob3NlIGVsZW1lbnRzIGFyZSBET00gTm9kZXNcclxuICogQHNlZSBhdHJvcGEueHBhdGgucHJvY2Vzc05vZGVzQnlYcGF0aCBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICovXHJcbmF0cm9wYS54cGF0aC5nZXROb2Rlc0J5WHBhdGggPSBmdW5jdGlvbiBnZXROb2Rlc0J5WHBhdGgoXHJcbiAgICB4cGF0aEV4cHJlc3Npb24sIGNvbnRleHROb2RlLCBkb2NyZWZcclxuKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcbiAgICBhdHJvcGEuc3VwcG9ydENoZWNrKCd4cGF0aCcpO1xyXG4gICAgdmFyIGVsZW1lbnRSZWZlcmVuY2VzO1xyXG4gICAgZWxlbWVudFJlZmVyZW5jZXMgPSBbXTtcclxuICAgIGF0cm9wYS54cGF0aC5wcm9jZXNzTm9kZXNCeVhwYXRoKFxyXG4gICAgICAgIHhwYXRoRXhwcmVzc2lvbixcclxuICAgICAgICBjb250ZXh0Tm9kZSxcclxuICAgICAgICBkb2NyZWYsXHJcbiAgICAgICAgZnVuY3Rpb24gKGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgZWxlbWVudFJlZmVyZW5jZXMucHVzaChlbGVtZW50KTtcclxuICAgICAgICB9XHJcbiAgICApO1xyXG4gICAgcmV0dXJuIGVsZW1lbnRSZWZlcmVuY2VzO1xyXG59O1xyXG4vKipcclxuICogRXNjYXBlcyBzaW5nbGUgcXVvdGVzIChhcG9zdHJvcGUpIGluIFhwYXRoIHF1ZXJpZXMuXHJcbiAqIEBleGFtcGxlXHJcbiAqIDxwcmU+XHJcbiAqICAvLyB0aGlzIGlzIHVzZWZ1bCBmb3IgdXNpbmcgYXJiaXRyYXJ5IHN0cmluZ3MgaW4geW91ciBxdWVyaWVzLlxyXG4gKiAgdmFyIGFyYlN0ciwgZXNjYXBlZFN0ciwgeHBhdGhFeHByZXNzaW9uLCBmb3VuZE5vZGVzO1xyXG4gKiAgYXJiU3RyID0gXCJKaW1teSBhaW4ndCBuZXZlciBzYWlkIFxcXCJTaHVyXFxcIiBXaHk/IEkgZG9uJ3Qga25vdyFcIjtcclxuICogIGVzY2FwZWRTdHIgPSBhdHJvcGEueHBhdGguZXNjYXBlUXVvdGVzWHBhdGgoYXJiU3RyKTtcclxuICogIC8vIHByb2R1Y2VzOiBjb25jYXQoJ0ppbW15IGFpbicsIFwiJ1wiLCAndCBuZXZlciBzYWlkIFwiU2h1clwiIFdoeT8gSSBkb24nLCBcIidcIixcclxuICogIC8vICd0IGtub3chJylcclxuICogIC8vIGl0IGlzIG11Y2ggZWFzaWVyIHRvIGRlYWwgd2l0aCB0aGUgdmFyaWFibGUgbmFtZSB0aGFuIGl0IGlzIHRvIGRlYWwgd2l0aFxyXG4gKiAgLy8gYWxsIHRob3NlIHF1b3RlcyBhbmQgY29tbWFzIVxyXG4gKiAgeHBhdGhFeHByZXNzaW9uID0gJy4vL3BbY29udGFpbnModGV4dCgpLCcgKyBlc2NhcGVkU3RyICsgJyldJztcclxuICogIGZvdW5kTm9kZXMgPSBhdHJvcGEueHBhdGguZ2V0Tm9kZXNCeVhwYXRoKHhwYXRoRXhwcmVzc2lvbik7XHJcbiAqICAvLyBmb3VuZCBub2RlcyB3aWxsIGNvbnRhaW4gdGhlIHAgZWxlbWVudHMgd2hlcmUgdGhlIHRleHQgd2FzIG1hdGNoZWQuXHJcbiAqIDwvcHJlPlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMjA5MDlcclxuICogQHBhcmFtIHtTdHJpbmd9IHN0cmluZyBBbiBYcGF0aCBxdWVyeVxyXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBSZXR1cm5zIGEgc3RyaW5nIHJlcHJlc2VudGluZyBhIGNvbmNhdCBmdW5jdGlvbiBpbiBYcGF0aFxyXG4gKiB3aGljaCB3aWxsIGVmZmVjdGl2ZWx5IHdvcmsgaW4gZXNjYXBpbmcgcXVvdGVzIGluIHlvdXIgeHBhdGggcXVlcnkuXHJcbiAqL1xyXG5hdHJvcGEueHBhdGguZXNjYXBlUXVvdGVzWHBhdGggPSBmdW5jdGlvbiBlc2NhcGVRdW90ZXNYcGF0aChzdHJpbmcpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC9cXCcvZywgXCInLCBcXFwiJ1xcXCIsICdcIik7XHJcbiAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvXiguKikkL2csIFwiY29uY2F0KCckMScpXCIpO1xyXG4gICAgcmV0dXJuIHN0cmluZztcclxufTtcclxuXHJcblxyXG5cclxuXHJcbndoaWxlKGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5sZW5ndGggPiAwKSB7XHJcbiAgICBhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMucG9wKCkoKTtcclxufVxyXG5tb2R1bGUuZXhwb3J0cyA9IGF0cm9wYTtcclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2RvY3MvdnNkb2MvT3BlbkxheWVyc0FsbC5qc1wiLz5cclxuLypqc2xpbnRcclxuICAgIG5vZGUgOiB0cnVlXHJcbiovXHJcblxyXG52YXIgYXRyb3BhID0gcmVxdWlyZSgnYXRyb3BhLWhlYWRlcicpO1xyXG5cclxuZnVuY3Rpb24gbGlua0RhdGEob2JqKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcbiAgICBPYmplY3Qua2V5cyhvYmouZGF0YSkuZmlsdGVyKGZ1bmN0aW9uIChwcm9wKSB7XHJcbiAgICAgICAgcmV0dXJuIHByb3AgIT09ICdyZXF1aXJlbWVudHMnO1xyXG4gICAgfSkuZm9yRWFjaChmdW5jdGlvbiAocHJvcCkge1xyXG4gICAgICAgIGF0cm9wYS5kYXRhW3Byb3BdID0gb2JqLmRhdGFbcHJvcF07XHJcbiAgICB9KTtcclxufVxyXG5cclxudmFyIEFyZ3NJbmZvID0gcmVxdWlyZSgnYXRyb3BhLUFyZ3NJbmZvJyk7XHJcbmxpbmtEYXRhKEFyZ3NJbmZvKTtcclxuYXRyb3BhLkFyZ3NJbmZvID0gQXJnc0luZm8uQXJnc0luZm87XHJcblxyXG52YXIgYXJyYXlzID0gcmVxdWlyZSgnYXRyb3BhLWFycmF5cycpO1xyXG5saW5rRGF0YShhcnJheXMpO1xyXG5hdHJvcGEuYXJyYXlzID0gYXJyYXlzLmFycmF5cztcclxuXHJcbnZhciBCYWJibGVyID0gcmVxdWlyZSgnYXRyb3BhLUJhYmJsZXInKTtcclxubGlua0RhdGEoQmFiYmxlcik7XHJcbmF0cm9wYS5CYWJibGVyID0gQmFiYmxlci5CYWJibGVyO1xyXG5cclxudmFyIENvb2tpZU1vbnN0ZXIgPSByZXF1aXJlKCdhdHJvcGEtQ29va2llTW9uc3RlcicpO1xyXG5saW5rRGF0YShDb29raWVNb25zdGVyKTtcclxuYXRyb3BhLkNvb2tpZU1vbnN0ZXIgPSBDb29raWVNb25zdGVyLkNvb2tpZU1vbnN0ZXI7XHJcblxyXG52YXIgQ3JlYXRlSHRtbERvY3VtZW50c0Zyb21YbWxodHRwID0gcmVxdWlyZSgnYXRyb3BhLUNyZWF0ZUh0bWxEb2N1bWVudHNGcm9tWG1saHR0cCcpO1xyXG5saW5rRGF0YShDcmVhdGVIdG1sRG9jdW1lbnRzRnJvbVhtbGh0dHApO1xyXG5hdHJvcGEuQ3JlYXRlSHRtbERvY3VtZW50c0Zyb21YbWxodHRwID0gQ3JlYXRlSHRtbERvY3VtZW50c0Zyb21YbWxodHRwLkNyZWF0ZUh0bWxEb2N1bWVudHNGcm9tWG1saHR0cDtcclxuXHJcbnZhciBjdXN0b21FcnJvcnMgPSByZXF1aXJlKCdhdHJvcGEtY3VzdG9tRXJyb3JzJyk7XHJcbmxpbmtEYXRhKGN1c3RvbUVycm9ycyk7XHJcbmF0cm9wYS5jdXN0b21FcnJvcnMgPSBjdXN0b21FcnJvcnMuY3VzdG9tRXJyb3JzO1xyXG5cclxudmFyIEhUTUxQYXJzZXIgPSByZXF1aXJlKCdhdHJvcGEtSFRNTFBhcnNlcicpO1xyXG5saW5rRGF0YShIVE1MUGFyc2VyKTtcclxuYXRyb3BhLkhUTUxQYXJzZXIgPSBIVE1MUGFyc2VyLkhUTUxQYXJzZXI7XHJcblxyXG52YXIgaW5qZWN0ID0gcmVxdWlyZSgnYXRyb3BhLWluamVjdCcpO1xyXG5saW5rRGF0YShpbmplY3QpO1xyXG5hdHJvcGEuaW5qZWN0ID0gaW5qZWN0LmluamVjdDtcclxuXHJcbnZhciBpbnF1aXJlID0gcmVxdWlyZSgnYXRyb3BhLWlucXVpcmUnKTtcclxubGlua0RhdGEoaW5xdWlyZSk7XHJcbmF0cm9wYS5pbnF1aXJlID0gaW5xdWlyZS5pbnF1aXJlO1xyXG5cclxudmFyIG9iamVjdHMgPSByZXF1aXJlKCdhdHJvcGEtb2JqZWN0cycpO1xyXG5saW5rRGF0YShvYmplY3RzKTtcclxuYXRyb3BhLm9iamVjdHMgPSBvYmplY3RzLm9iamVjdHM7XHJcblxyXG52YXIgcmFuZG9tID0gcmVxdWlyZSgnYXRyb3BhLXJhbmRvbScpO1xyXG5saW5rRGF0YShyYW5kb20pO1xyXG5hdHJvcGEucmFuZG9tID0gcmFuZG9tLnJhbmRvbTtcclxuXHJcbnZhciByZWdleCA9IHJlcXVpcmUoJ2F0cm9wYS1yZWdleCcpO1xyXG5saW5rRGF0YShyZWdleCk7XHJcbmF0cm9wYS5yZWdleCA9IHJlZ2V4LnJlZ2V4O1xyXG5cclxudmFyIHJlbW92ZU5vZGVCeVJlZmVyZW5jZSA9IHJlcXVpcmUoJ2F0cm9wYS1yZW1vdmVOb2RlQnlSZWZlcmVuY2UnKTtcclxubGlua0RhdGEocmVtb3ZlTm9kZUJ5UmVmZXJlbmNlKTtcclxuYXRyb3BhLnJlbW92ZU5vZGVCeVJlZmVyZW5jZSA9IHJlbW92ZU5vZGVCeVJlZmVyZW5jZS5yZW1vdmVOb2RlQnlSZWZlcmVuY2U7XHJcblxyXG52YXIgUmVxdWVzdGVyID0gcmVxdWlyZSgnYXRyb3BhLVJlcXVlc3RlcicpO1xyXG5saW5rRGF0YShSZXF1ZXN0ZXIpO1xyXG5hdHJvcGEuUmVxdWVzdGVyID0gUmVxdWVzdGVyLlJlcXVlc3RlcjtcclxuXHJcbnZhciBTZXJpYWxBY3RvciA9IHJlcXVpcmUoJ2F0cm9wYS1TZXJpYWxBY3RvcicpO1xyXG5saW5rRGF0YShTZXJpYWxBY3Rvcik7XHJcbmF0cm9wYS5TZXJpYWxBY3RvciA9IFNlcmlhbEFjdG9yLlNlcmlhbEFjdG9yO1xyXG5cclxudmFyIHNldEFzT3B0aW9uYWxBcmcgPSByZXF1aXJlKCdhdHJvcGEtc2V0QXNPcHRpb25hbEFyZycpO1xyXG5saW5rRGF0YShzZXRBc09wdGlvbmFsQXJnKTtcclxuYXRyb3BhLnNldEFzT3B0aW9uYWxBcmcgPSBzZXRBc09wdGlvbmFsQXJnLnNldEFzT3B0aW9uYWxBcmc7XHJcblxyXG52YXIgc3RyaW5nID0gcmVxdWlyZSgnYXRyb3BhLXN0cmluZycpO1xyXG5saW5rRGF0YShzdHJpbmcpO1xyXG5hdHJvcGEuc3RyaW5nID0gc3RyaW5nLnN0cmluZztcclxuXHJcbnZhciBUZXh0QW5hbHl6ZXIgPSByZXF1aXJlKCdhdHJvcGEtVGV4dEFuYWx5emVyJyk7XHJcbmxpbmtEYXRhKFRleHRBbmFseXplcik7XHJcbmF0cm9wYS5UZXh0QW5hbHl6ZXIgPSBUZXh0QW5hbHl6ZXIuVGV4dEFuYWx5emVyO1xyXG5cclxudmFyIHVybCA9IHJlcXVpcmUoJ2F0cm9wYS11cmwnKTtcclxubGlua0RhdGEodXJsKTtcclxuYXRyb3BhLnVybCA9IHVybC51cmw7XHJcblxyXG52YXIgd2FpdEZvciA9IHJlcXVpcmUoJ2F0cm9wYS13YWl0Rm9yJyk7XHJcbmxpbmtEYXRhKHdhaXRGb3IpO1xyXG5hdHJvcGEud2FpdEZvciA9IHdhaXRGb3Iud2FpdEZvcjtcclxuXHJcbnZhciB3dGYgPSByZXF1aXJlKCdhdHJvcGEtd3RmJyk7XHJcbmxpbmtEYXRhKHd0Zik7XHJcbmF0cm9wYS53dGYgPSB3dGYud3RmO1xyXG5cclxudmFyIHhwYXRoID0gcmVxdWlyZSgnYXRyb3BhLXhwYXRoJyk7XHJcbmxpbmtEYXRhKHhwYXRoKTtcclxuYXRyb3BhLnhwYXRoID0geHBhdGgueHBhdGg7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGF0cm9wYTsiXX0=
