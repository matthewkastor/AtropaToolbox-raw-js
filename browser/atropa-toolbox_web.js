(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
atropa = require('../src/atropa-toolbox.js');
},{"../src/atropa-toolbox.js":132}],2:[function(require,module,exports){
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


},{}],3:[function(require,module,exports){
module.exports=require(2)
},{}],4:[function(require,module,exports){
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

},{"atropa-header":3}],5:[function(require,module,exports){
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

},{"atropa-header":2,"atropa-inquire":4}],6:[function(require,module,exports){
module.exports=require(2)
},{}],7:[function(require,module,exports){
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

},{"atropa-header":6}],8:[function(require,module,exports){
module.exports=require(2)
},{}],9:[function(require,module,exports){
module.exports=require(2)
},{}],10:[function(require,module,exports){
module.exports=require(4)
},{"atropa-header":9}],11:[function(require,module,exports){
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

},{"atropa-arrays":5,"atropa-customErrors":7,"atropa-header":8,"atropa-inquire":10}],12:[function(require,module,exports){
module.exports=require(2)
},{}],13:[function(require,module,exports){
module.exports=require(2)
},{}],14:[function(require,module,exports){
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

},{"atropa-header":13}],15:[function(require,module,exports){
module.exports=require(2)
},{}],16:[function(require,module,exports){
module.exports=require(2)
},{}],17:[function(require,module,exports){
module.exports=require(4)
},{"atropa-header":16}],18:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"atropa-header":15,"atropa-inquire":17}],19:[function(require,module,exports){
module.exports=require(2)
},{}],20:[function(require,module,exports){
module.exports=require(2)
},{}],21:[function(require,module,exports){
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

},{"atropa-header":20}],22:[function(require,module,exports){
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

},{"atropa-arrays":18,"atropa-header":19,"atropa-regex":21}],23:[function(require,module,exports){
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

},{"atropa-header":12,"atropa-random":14,"atropa-string":22}],24:[function(require,module,exports){
module.exports=require(2)
},{}],25:[function(require,module,exports){
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

},{"atropa-header":24}],26:[function(require,module,exports){
module.exports=require(2)
},{}],27:[function(require,module,exports){
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

},{"atropa-header":26}],28:[function(require,module,exports){
module.exports=require(2)
},{}],29:[function(require,module,exports){
module.exports=require(2)
},{}],30:[function(require,module,exports){
module.exports=require(4)
},{"atropa-header":29}],31:[function(require,module,exports){
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

},{"atropa-header":28,"atropa-inquire":30}],32:[function(require,module,exports){
module.exports=require(2)
},{}],33:[function(require,module,exports){
module.exports=require(7)
},{"atropa-header":32}],34:[function(require,module,exports){
module.exports=require(2)
},{}],35:[function(require,module,exports){
module.exports=require(2)
},{}],36:[function(require,module,exports){
module.exports=require(4)
},{"atropa-header":35}],37:[function(require,module,exports){
arguments[4][11][0].apply(exports,arguments)
},{"atropa-arrays":31,"atropa-customErrors":33,"atropa-header":34,"atropa-inquire":36}],38:[function(require,module,exports){
module.exports=require(2)
},{}],39:[function(require,module,exports){
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

},{"atropa-ArgsInfo":37,"atropa-header":38}],40:[function(require,module,exports){
module.exports=require(2)
},{}],41:[function(require,module,exports){
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

},{"atropa-HTMLParser":27,"atropa-Requester":39,"atropa-header":40}],42:[function(require,module,exports){
module.exports=require(2)
},{}],43:[function(require,module,exports){
module.exports=require(27)
},{"atropa-header":42}],44:[function(require,module,exports){
module.exports=require(2)
},{}],45:[function(require,module,exports){
module.exports=require(2)
},{}],46:[function(require,module,exports){
module.exports=require(4)
},{"atropa-header":45}],47:[function(require,module,exports){
arguments[4][31][0].apply(exports,arguments)
},{"atropa-header":44,"atropa-inquire":46}],48:[function(require,module,exports){
module.exports=require(2)
},{}],49:[function(require,module,exports){
module.exports=require(7)
},{"atropa-header":48}],50:[function(require,module,exports){
module.exports=require(2)
},{}],51:[function(require,module,exports){
module.exports=require(2)
},{}],52:[function(require,module,exports){
module.exports=require(4)
},{"atropa-header":51}],53:[function(require,module,exports){
arguments[4][11][0].apply(exports,arguments)
},{"atropa-arrays":47,"atropa-customErrors":49,"atropa-header":50,"atropa-inquire":52}],54:[function(require,module,exports){
module.exports=require(2)
},{}],55:[function(require,module,exports){
arguments[4][39][0].apply(exports,arguments)
},{"atropa-ArgsInfo":53,"atropa-header":54}],56:[function(require,module,exports){
module.exports=require(2)
},{}],57:[function(require,module,exports){
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

},{"atropa-header":56}],58:[function(require,module,exports){
module.exports=require(2)
},{}],59:[function(require,module,exports){
module.exports=require(2)
},{}],60:[function(require,module,exports){
module.exports=require(4)
},{"atropa-header":59}],61:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"atropa-header":58,"atropa-inquire":60}],62:[function(require,module,exports){
module.exports=require(2)
},{}],63:[function(require,module,exports){
module.exports=require(2)
},{}],64:[function(require,module,exports){
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

},{"atropa-header":63}],65:[function(require,module,exports){
module.exports=require(2)
},{}],66:[function(require,module,exports){
module.exports=require(2)
},{}],67:[function(require,module,exports){
module.exports=require(4)
},{"atropa-header":66}],68:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"atropa-header":65,"atropa-inquire":67}],69:[function(require,module,exports){
module.exports=require(2)
},{}],70:[function(require,module,exports){
module.exports=require(2)
},{}],71:[function(require,module,exports){
module.exports=require(21)
},{"atropa-header":70}],72:[function(require,module,exports){
arguments[4][22][0].apply(exports,arguments)
},{"atropa-arrays":68,"atropa-header":69,"atropa-regex":71}],73:[function(require,module,exports){
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

},{"atropa-arrays":61,"atropa-header":62,"atropa-setAsOptionalArg":64,"atropa-string":72}],74:[function(require,module,exports){
module.exports=require(2)
},{}],75:[function(require,module,exports){
module.exports=require(2)
},{}],76:[function(require,module,exports){
module.exports=require(4)
},{"atropa-header":75}],77:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"atropa-header":74,"atropa-inquire":76}],78:[function(require,module,exports){
module.exports=require(2)
},{}],79:[function(require,module,exports){
module.exports=require(7)
},{"atropa-header":78}],80:[function(require,module,exports){
module.exports=require(2)
},{}],81:[function(require,module,exports){
module.exports=require(2)
},{}],82:[function(require,module,exports){
module.exports=require(2)
},{}],83:[function(require,module,exports){
module.exports=require(64)
},{"atropa-header":82}],84:[function(require,module,exports){
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

},{"atropa-header":81,"atropa-setAsOptionalArg":83}],85:[function(require,module,exports){
module.exports=require(2)
},{}],86:[function(require,module,exports){
module.exports=require(4)
},{"atropa-header":85}],87:[function(require,module,exports){
module.exports=require(2)
},{}],88:[function(require,module,exports){
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

},{"atropa-header":87}],89:[function(require,module,exports){
module.exports=require(2)
},{}],90:[function(require,module,exports){
module.exports=require(14)
},{"atropa-header":89}],91:[function(require,module,exports){
module.exports=require(2)
},{}],92:[function(require,module,exports){
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

},{"atropa-header":91}],93:[function(require,module,exports){
module.exports=require(2)
},{}],94:[function(require,module,exports){
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

},{"atropa-header":93}],95:[function(require,module,exports){
module.exports=require(2)
},{}],96:[function(require,module,exports){
module.exports=require(64)
},{"atropa-header":95}],97:[function(require,module,exports){
module.exports=require(2)
},{}],98:[function(require,module,exports){
module.exports=require(2)
},{}],99:[function(require,module,exports){
module.exports=require(4)
},{"atropa-header":98}],100:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"atropa-header":97,"atropa-inquire":99}],101:[function(require,module,exports){
module.exports=require(2)
},{}],102:[function(require,module,exports){
module.exports=require(2)
},{}],103:[function(require,module,exports){
module.exports=require(92)
},{"atropa-header":102}],104:[function(require,module,exports){
arguments[4][22][0].apply(exports,arguments)
},{"atropa-arrays":100,"atropa-header":101,"atropa-regex":103}],105:[function(require,module,exports){
module.exports=require(2)
},{}],106:[function(require,module,exports){
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

},{"atropa-header":105}],107:[function(require,module,exports){
module.exports=require(2)
},{}],108:[function(require,module,exports){
module.exports=require(2)
},{}],109:[function(require,module,exports){
module.exports=require(64)
},{"atropa-header":108}],110:[function(require,module,exports){
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

},{"atropa-header":107,"atropa-setAsOptionalArg":109}],111:[function(require,module,exports){
module.exports=require(2)
},{}],112:[function(require,module,exports){
module.exports=require(2)
},{}],113:[function(require,module,exports){
module.exports=require(92)
},{"atropa-header":112}],114:[function(require,module,exports){
module.exports=require(2)
},{}],115:[function(require,module,exports){
module.exports=require(64)
},{"atropa-header":114}],116:[function(require,module,exports){
module.exports=require(2)
},{}],117:[function(require,module,exports){
module.exports=require(2)
},{}],118:[function(require,module,exports){
module.exports=require(4)
},{"atropa-header":117}],119:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"atropa-header":116,"atropa-inquire":118}],120:[function(require,module,exports){
module.exports=require(2)
},{}],121:[function(require,module,exports){
module.exports=require(2)
},{}],122:[function(require,module,exports){
module.exports=require(92)
},{"atropa-header":121}],123:[function(require,module,exports){
arguments[4][22][0].apply(exports,arguments)
},{"atropa-arrays":119,"atropa-header":120,"atropa-regex":122}],124:[function(require,module,exports){
module.exports={
    "novelty quickly wears off": "dumb shit gits old fast",
    "the way it is": "how it be",
    "put up with": "manhandle",
    "yet": "immediately",
    "lose": "shake",
    "for no reason": "maiacally",
    "given a choice": "extorted",
    "not strong enough": "ain't got the nuts",
    "now at an end": "brand spankin new",
    "be together": "mash up",
    "apocalypse": "party time",
    "nothing is assured": "we live to deliver",
    "to no avail": "for great good",
    "too good to be true": "fucking fantastic",
    "growing apart": "fucking other people",
    "rest in peace": "party like it's 1999",
    "back stab": "rump shake",
    "back stabb": "rump shake",
    "look into their eyes": "give them AIDS",
    "look into her eyes": "give her AIDS",
    "look into his eyes": "give him AIDS",
    "can't live without": "touch myself about",
    "can't be without": "touch myself about",
    "could never be without": "can't work anal beads without",
    "no matter": "irregardless of",
    "will be there": "stick like shit",
    "will always be there": "stick like wet shit",
    "holding them close to": "handcuffing them to",
    "by your side": "on your ass",
    "by my side": "on my ass",
    "by his side": "on his ass",
    "by her side": "on her ass",
    "leave your side": "get off your ass",
    "leave my side": "get off my ass",
    "leave his side": "get off his ass",
    "leave her side": "get off her ass",
    "doesn't happen over": "cartwheels straight across",
    "means many things": "is best described with lies",
    "laying in bed": "taking a shit",
    "promise": "lie",
    "liar": "fibber",
    "lie": "fib",
    "lies": "fibs",
    "what's the point": "the fucks this mean",
    "it must be true": "for real 'n' shit",
    "what people say": "muthaphukkas be talkin",
    "etched": "ground",
    "don't have a clue": "got shit twisted",
    "viscious cycle": "clusterfuck",
    "don't need": "could give a fuck about",
    "raven": "pigeon",
    "to get away": "to fucking run",
    "to a better": "for some glittered",
    "beautiful face": "enormous tits",
    "might as well": "oh fuck I oughtta",
    "the first moment": "straightaway",
    "as well": "also",
    "so good": "neato",
    "could do anything": "is fucking insane",
    "set the mood": "whip it out",
    "baby if": "look bitch,",
    "through your hair": "upside your head",
    "entered the house of": "got up in the barn for",
    "always love you the same": "always love you like my other suckers",
    "kissing other": "going down on",
    "never thought you would do that": "got turned out like a dumb fuck",
    "laying on the floor": "begging for it",
    "first laid eyes on": "first tried groping",
    "most people can only": "most freaks and dope fiends",
    "you were the one": "you were my target",
    "standing out from the crowd": "wobbling like an elephant on a bicycle",
    "stood out from the crowd": "jiggled like a jello Santa",
    "stand out from the crowd": "look like a jackass",
    "stands out from the crowd": "smells like old dick",
    "i've never felt this way": "i've done this",
    "with every fiber": "from pithy pits",
    "wander": "stumble",
    "haunt": "stalk",
    "mask": "trashbag",
    "demonic angel": "ass pirate",
    "angelic demon": "ass pirate",
    "cunning": "desperate",
    "dangerous": "cock catching",
    "demi-god": "punk bitch",
    "demigod": "punk bitch",
    "mortal": "queer",
    "immortal": "whiny",
    "betrayal": "game",
    "betray": "screw",
    "gave up on": "don't give a fuck about",
    "give up on": "won't give a fuck about",
    "given up on": "don't give a fuck about",
    "giving up on": "ain't givin a fuck about",
    "coffin": "tobogan",
    "beautiful": "gaudy",
    "the best": "the baddest",
    "selfish": "thieving",
    "walked out": "narrowly escaped",
    "walk out": "narrowly escape",
    "walking out": "narrowly escaping",
    "got in your way": "got all up in your shit",
    "try": "shoot",
    "the point of no return": "the fat girls bedrooom door",
    "only wanted": "begged for",
    "guess it doesn't matter": "know this shit is pointless",
    "look back": "lick windows",
    "path": "sidewalk",
    "shine": "bling",
    "in the middle of": "all up in",
    "deep down inside": "in the bottom of the tank",
    "piece by piece": "one handjob at a time",
    "aura": "stench",
    "candle": "glowstick",
    "for her": "to that broads",
    "for she": "'cause the cunt",
    "for he": "this dumb mother fucker",
    "forest": "campground",
    "hand in hand": "cock to jaw",
    "hand to hold": "nuts to grip",
    "girl meets boy": "horny kids hook up",
    "boy meets girl": "horny kids hook up",
    "sunny": "sweltering",
    "so nervous": "so fucking drunk",
    "kiss": "slap",
    "fingertips": "chicken nuggets",
    "tell you i'm fine": "screm I'M FUCKIN OK",
    "write": "scrawl",
    "written": "scrawled",
    "wrote": "scrawled",
    "first of all": "mm-kay",
    "bring forth": "whip out",
    "into the light": "on to the light",
    "the only one": "fucking stupid",
    "to the light": "out in public",
    "talk": "cuss",
    "full of life": "full of shit",
    "can't find the words to say": "could blurt out some dumb shit",
    "consume": "suck",
    "consuming": "sucking",
    "pillow": "stone",
    "advice": "bullshit",
    "universe": "toilet bowl",
    "elder": "old folk",
    "magick": "delusion",
    "magic": "hope",
    "arcane": "foolish",
    "speak of": "talk about",
    "shall": "should-will",
    "obtain": "get",
    "battle": "squabble",
    "midnight": "daybreak",
    "sorrow": "whimper",
    "crimson": "azure",
    "black": "yellow",
    "won't make it through": "could shimmy past",
    "night": "bedtime",
    "day": "morning",
    "fragile": "sturdy",
    "crack": "mend",
    "solitude": "ambiance",
    "torment": "tickle",
    "incantation": "much yammering",
    "hopeless": "pitiful",
    "depressing": "inebriating",
    "depressed": "drunk",
    "depression": "so much booze",
    "saddened": "made flaccid",
    "sadness": "impotence",
    "neverending": "never ending",
    "never ending": "relentless",
    "never going": "fucked for trying",
    "change one thing": "fuck some'n up",
    "never end": "drag on",
    "will not heal": "festers",
    "outward appearance": "facade",
    "emo": "closet homo",
    "blackened walls": "filthy rooms",
    "farewell": "adios",
    "meet again": "have another go-round",
    "sadd": "flaccid",
    "sad": "impotent",
    "amidst": "all up in",
    "midst": "pants",
    "knowledge": "trivia",
    "known": "got",
    "know": "get",
    "knew": "got",
    "passionate": "delirious",
    "passion": "delirium",
    "o'": "uh",
    "o": "uh",
    "fang": "denture",
    "curse": "stain",
    "love": "confuse",
    "vampiric": "pedophilic",
    "vampyre": "pedophyle",
    "vampire": "pedophile",
    "problem": "useless concern",
    "feel": "fondle",
    "woe": "chlamydia",
    "empty": "bloated",
    "hatred": "odium",
    "hate": "dislike",
    "scarred": "striated",
    "scars": "striae",
    "scare": "tickle",
    "scary": "tickly",
    "scar": "stria",
    "wound": "ouchie",
    "slit": "crevice",
    "slice": "pet",
    "twas": "it was",
    "big brother": "my paranoia",
    "eternity": "awhile",
    "eternally": "for a bit",
    "eternal": "imagined",
    "prophet": "insomniac",
    "prophecies": "wives tales",
    "prophecy": "wives tale",
    "soldier": "maniac",
    "militia": "gang",
    "military": "gangster",
    "militant": "maniacal",
    "goddess": "Kylee Strutt",
    "higher power": "crusty sock",
    "dark": "effervescent",
    "ancient": "elderly",
    "quest": "stroll",
    "heartbeat": "cock beat",
    "heart": "cock",
    "blood": "grease",
    "bleed": "whine",
    "cut": "mutilate",
    "slash": "mutilate",
    "moonlight": "moonshine",
    "moon": "night light",
    "steel": "latex",
    "knife": "dildo",
    "razorblade": "butt plug",
    "razor": "dildo",
    "blade": "handle",
    "pain": "hot sex",
    "emotional": "childish",
    "emotion": "lubricant",
    "teardrop": "tear drop",
    "tear": "sperme",
    "castle": "chateau",
    "world": "hand towel",
    "dead": "inert",
    "goodbye": "peace y'all",
    "good-bye": "get the fuck out",
    "good bye": "fuck off",
    "death": "Santa",
    "pale": "sexy",
    "drift": "him-haw",
    "fade": "him-haw",
    "flesh": "twinkie",
    "corpse": "mannequin",
    "skin": "twinkies",
    "putrid": "pleasant",
    "breathe": "pause awkwardly",
    "breath": "awkward pause",
    "stopp": "push",
    "stop": "push",
    "scream": "grunt",
    "think": "scheme",
    "spiritual": "banana craving",
    "spirit": "banana",
    "soul": "banana",
    "ghost": "imaginary friend",
    "monster": "dislexic lover",
    "beast": "erection",
    "demon": "hard-on",
    "angel": "porn star",
    "shooting star": "swift missile",
    "star": "missile",
    "lost": "aroused",
    "time": "throbbing",
    "cheek": "rump",
    "fingers": "sausage",
    "daydream": "fantasize",
    "the spring": "tube sock",
    "spring": "tube socks",
    "illusion": "drunken mistake",
    "loneliness": "arousal",
    "lonely": "horny",
    "alone": "ecstatic",
    "lone": "single",
    "perfect": "fucked",
    "hidden": "stashed",
    "mystery": "neon sign",
    "mysteries": "neon signs",
    "rose": "butt hole",
    "petal": "dingleberry",
    "different": "awkward",
    "wrong": "buzzing",
    "fate": "coincidence",
    "cold": "fuzzy",
    "hellfire": "hell fire",
    "hell": "my cock's",
    "crystal": "bedazler",
    "rainbow": "pizzazz",
    "rain": "jizzum",
    "storm": "orgy",
    "wind": "blow",
    "breeze": "draft",
    "brilliance": "shinyness",
    "brilliant": "shiny",
    "dreamland": "obsession island",
    "dreams": "obsessions",
    "dream": "obsess",
    "prison": "outhouse",
    "golden ray": "gaudy scribble",
    "ray": "scribble",
    "deadly": "fertile",
    "truth": "trivia",
    "sun": "yellow disk",
    "cruel": "haphazard",
    "cloud": "balloon",
    "twinkle": "strobe",
    "twinkling": "strobing",
    "escape": "snuggle",
    "understand": "stroke my ego",
    "remember": "mumble",
    "illumination": "mumbo jumbo",
    "reality": "toilet bowl",
    "bind": "coddle",
    "bound": "coddled",
    "torn": "huggled",
    "died": "made marshmallows",
    "dies": "makes marshmallows",
    "die": "make marshmallows",
    "dying": "making marshmallows",
    "body": "jiggling clump",
    "bodies": "jiggling piles",
    "warfare": "children laughing",
    "debutantes": "hookers",
    "slave": "gimp",
    "poetic": "flatulent",
    "poetry": "bad gas",
    "poet": "hobo",
    "poem": "scribble",
    "country": "bathroom",
    "naked": "unshaved",
    "jesus christ": "jim bob jr",
    "christ": "jim bob jr",
    "jesus": "jim bob jr",
    "healer": "fondler",
    "gods": "jim bob sr et al.",
    "god": "jim bob sr",
    "weapon": "pocket pussy",
    "existence": "whatever",
    "minion": "horny pirate",
    "raping": "what",
    "rape": "what",
    "gravestone": "mile marker",
    "grave": "personal space",
    "infinite": "abstract",
    "suicide": "murder",
    "brink": "border",
    "cried": "came",
    "cries": "skeets",
    "crying": "cumming",
    "had done": "done did",
    "cry": "cum",
    "cryptic": "drunken",
    "crypt": "urinal",
    "mystic": "transexual",
    "balanced individual": "psycho",
    "balanced person": "psycho",
    "balanced man": "psycho",
    "balanced woman": "psycho",
    "wisdom": "bull shit",
    "wise": "bull shitting",
    "blessed be": "suck eggs",
    "energy": "juice",
    "riddle": "polka dot",
    "my lord": "sweet palm",
    "so mote it be": "it's real in my head",
    "pray": "murmur",
    "nomad": "drunk hobo",
    "destiny": "taxes",
    "sword": "dildo",
    "void": "bucket",
    "just": "sure",
    "vengeance": "slap happiness",
    "avenge": "git rowdy for",
    "venge": "-rowdy-",
    "heavens": "skies",
    "heaven": "sky",
    "endless": "real long",
    "valley": "ditch",
    "arduous": "not easy",
    "touch": "grope",
    "wretched": "skeezy",
    "wretch": "skeeze",
    "awe": "fearful reverence",
    "ritual": "banana dance",
    "behold": "oogle",
    "veil": "disguise",
    "vista": "scene",
    "always": "usually",
    "believe": "buy",
    "wish": "want",
    "fell": "flopped",
    "fall": "flop",
    "righteous": "arrogant",
    "warrior": "kitten",
    "uncaring": "prickish",
    "care to give": "shit to give",
    "take care of": "decimate",
    "taking care": "forgeting",
    "takes care": "forgets",
    "take care": "forget",
    "forget": "disremember",
    "caring": "giving a shit",
    "cared": "gave a shit",
    "care": "give a shit",
    "wield": "jerk",
    "ocean": "sewer",
    "sea": "bath",
    "bay": "sink",
    "twilight": "moonshine",
    "broken": "beaten",
    "broke": "beat",
    "break": "beat",
    "forever": "so very",
    "human race": "gerbil empire",
    "nightmare": "tantrum",
    "suffer": "pirouette",
    "myself": "my muchness",
    "me": "i",
    "my": "i's ",
    "mine": "i's",
    "was i": "were i",
    "am i": "are i",
    "im": "i'm",
    "i'm": "i are",
    "i've": "i have",
    "i'll": "i will",
    "i am": "i are",
    "yourself": "you's muchness",
    "yours": "you's",
    "your": "you's",
    "you all": "all you",
    "you'll": "you will",
    "you've": "you has",
    "you're": "you is",
    "thee": "you",
    "thine": "you's",
    "thou": "you",
    "we": "they",
    "us": "them",
    "our": "their",
    "ours": "theirs",
    "i": "Kevin",
    "you": "Retards"
}

},{}],125:[function(require,module,exports){
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
     /*jslint unparam: true*/
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

},{"./atropa-wtf-dictionary.json":124,"atropa-header":111,"atropa-regex":113,"atropa-setAsOptionalArg":115,"atropa-string":123}],126:[function(require,module,exports){
module.exports=require(2)
},{}],127:[function(require,module,exports){
module.exports=require(2)
},{}],128:[function(require,module,exports){
module.exports=require(94)
},{"atropa-header":127}],129:[function(require,module,exports){
module.exports=require(2)
},{}],130:[function(require,module,exports){
module.exports=require(64)
},{"atropa-header":129}],131:[function(require,module,exports){
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

},{"atropa-header":126,"atropa-removeNodeByReference":128,"atropa-setAsOptionalArg":130}],132:[function(require,module,exports){
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
},{"atropa-ArgsInfo":11,"atropa-Babbler":23,"atropa-CookieMonster":25,"atropa-CreateHtmlDocumentsFromXmlhttp":41,"atropa-HTMLParser":43,"atropa-Requester":55,"atropa-SerialActor":57,"atropa-TextAnalyzer":73,"atropa-arrays":77,"atropa-customErrors":79,"atropa-header":80,"atropa-inject":84,"atropa-inquire":86,"atropa-objects":88,"atropa-random":90,"atropa-regex":92,"atropa-removeNodeByReference":94,"atropa-setAsOptionalArg":96,"atropa-string":104,"atropa-url":106,"atropa-waitFor":110,"atropa-wtf":125,"atropa-xpath":131}]},{},[1])
//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXGthc3RvclxcRG9jdW1lbnRzXFxzY3JpcHRzXFxqc1xcQXRyb3BhXFxjdXJyZW50XFxub2RlX21vZHVsZXNcXGJyb3dzZXJpZnlcXG5vZGVfbW9kdWxlc1xcYnJvd3Nlci1wYWNrXFxfcHJlbHVkZS5qcyIsIkM6L1VzZXJzL2thc3Rvci9Eb2N1bWVudHMvc2NyaXB0cy9qcy9BdHJvcGEvY3VycmVudC9kZXYvYnJvd3Nlck1haW4uanMiLCJDOi9Vc2Vycy9rYXN0b3IvRG9jdW1lbnRzL3NjcmlwdHMvanMvQXRyb3BhL2N1cnJlbnQvbm9kZV9tb2R1bGVzL2F0cm9wYS1BcmdzSW5mby9ub2RlX21vZHVsZXMvYXRyb3BhLWFycmF5cy9ub2RlX21vZHVsZXMvYXRyb3BhLWhlYWRlci9zcmMvYXRyb3BhLWhlYWRlci5qcyIsIkM6L1VzZXJzL2thc3Rvci9Eb2N1bWVudHMvc2NyaXB0cy9qcy9BdHJvcGEvY3VycmVudC9ub2RlX21vZHVsZXMvYXRyb3BhLUFyZ3NJbmZvL25vZGVfbW9kdWxlcy9hdHJvcGEtYXJyYXlzL25vZGVfbW9kdWxlcy9hdHJvcGEtaW5xdWlyZS9zcmMvYXRyb3BhLWlucXVpcmUuanMiLCJDOi9Vc2Vycy9rYXN0b3IvRG9jdW1lbnRzL3NjcmlwdHMvanMvQXRyb3BhL2N1cnJlbnQvbm9kZV9tb2R1bGVzL2F0cm9wYS1BcmdzSW5mby9ub2RlX21vZHVsZXMvYXRyb3BhLWFycmF5cy9zcmMvYXRyb3BhLWFycmF5cy5qcyIsIkM6L1VzZXJzL2thc3Rvci9Eb2N1bWVudHMvc2NyaXB0cy9qcy9BdHJvcGEvY3VycmVudC9ub2RlX21vZHVsZXMvYXRyb3BhLUFyZ3NJbmZvL25vZGVfbW9kdWxlcy9hdHJvcGEtY3VzdG9tRXJyb3JzL3NyYy9hdHJvcGEtY3VzdG9tRXJyb3JzLmpzIiwiQzovVXNlcnMva2FzdG9yL0RvY3VtZW50cy9zY3JpcHRzL2pzL0F0cm9wYS9jdXJyZW50L25vZGVfbW9kdWxlcy9hdHJvcGEtQXJnc0luZm8vc3JjL2F0cm9wYS1BcmdzSW5mby5qcyIsIkM6L1VzZXJzL2thc3Rvci9Eb2N1bWVudHMvc2NyaXB0cy9qcy9BdHJvcGEvY3VycmVudC9ub2RlX21vZHVsZXMvYXRyb3BhLUJhYmJsZXIvbm9kZV9tb2R1bGVzL2F0cm9wYS1yYW5kb20vc3JjL2F0cm9wYS1yYW5kb20uanMiLCJDOi9Vc2Vycy9rYXN0b3IvRG9jdW1lbnRzL3NjcmlwdHMvanMvQXRyb3BhL2N1cnJlbnQvbm9kZV9tb2R1bGVzL2F0cm9wYS1CYWJibGVyL25vZGVfbW9kdWxlcy9hdHJvcGEtc3RyaW5nL25vZGVfbW9kdWxlcy9hdHJvcGEtYXJyYXlzL3NyYy9hdHJvcGEtYXJyYXlzLmpzIiwiQzovVXNlcnMva2FzdG9yL0RvY3VtZW50cy9zY3JpcHRzL2pzL0F0cm9wYS9jdXJyZW50L25vZGVfbW9kdWxlcy9hdHJvcGEtQmFiYmxlci9ub2RlX21vZHVsZXMvYXRyb3BhLXN0cmluZy9ub2RlX21vZHVsZXMvYXRyb3BhLXJlZ2V4L3NyYy9hdHJvcGEtcmVnZXguanMiLCJDOi9Vc2Vycy9rYXN0b3IvRG9jdW1lbnRzL3NjcmlwdHMvanMvQXRyb3BhL2N1cnJlbnQvbm9kZV9tb2R1bGVzL2F0cm9wYS1CYWJibGVyL25vZGVfbW9kdWxlcy9hdHJvcGEtc3RyaW5nL3NyYy9hdHJvcGEtc3RyaW5nLmpzIiwiQzovVXNlcnMva2FzdG9yL0RvY3VtZW50cy9zY3JpcHRzL2pzL0F0cm9wYS9jdXJyZW50L25vZGVfbW9kdWxlcy9hdHJvcGEtQmFiYmxlci9zcmMvYXRyb3BhLUJhYmJsZXIuanMiLCJDOi9Vc2Vycy9rYXN0b3IvRG9jdW1lbnRzL3NjcmlwdHMvanMvQXRyb3BhL2N1cnJlbnQvbm9kZV9tb2R1bGVzL2F0cm9wYS1Db29raWVNb25zdGVyL3NyYy9hdHJvcGEtQ29va2llTW9uc3Rlci5qcyIsIkM6L1VzZXJzL2thc3Rvci9Eb2N1bWVudHMvc2NyaXB0cy9qcy9BdHJvcGEvY3VycmVudC9ub2RlX21vZHVsZXMvYXRyb3BhLUNyZWF0ZUh0bWxEb2N1bWVudHNGcm9tWG1saHR0cC9ub2RlX21vZHVsZXMvYXRyb3BhLUhUTUxQYXJzZXIvc3JjL2F0cm9wYS1IVE1MUGFyc2VyLmpzIiwiQzovVXNlcnMva2FzdG9yL0RvY3VtZW50cy9zY3JpcHRzL2pzL0F0cm9wYS9jdXJyZW50L25vZGVfbW9kdWxlcy9hdHJvcGEtQ3JlYXRlSHRtbERvY3VtZW50c0Zyb21YbWxodHRwL25vZGVfbW9kdWxlcy9hdHJvcGEtUmVxdWVzdGVyL25vZGVfbW9kdWxlcy9hdHJvcGEtQXJnc0luZm8vbm9kZV9tb2R1bGVzL2F0cm9wYS1hcnJheXMvc3JjL2F0cm9wYS1hcnJheXMuanMiLCJDOi9Vc2Vycy9rYXN0b3IvRG9jdW1lbnRzL3NjcmlwdHMvanMvQXRyb3BhL2N1cnJlbnQvbm9kZV9tb2R1bGVzL2F0cm9wYS1DcmVhdGVIdG1sRG9jdW1lbnRzRnJvbVhtbGh0dHAvbm9kZV9tb2R1bGVzL2F0cm9wYS1SZXF1ZXN0ZXIvbm9kZV9tb2R1bGVzL2F0cm9wYS1BcmdzSW5mby9zcmMvYXRyb3BhLUFyZ3NJbmZvLmpzIiwiQzovVXNlcnMva2FzdG9yL0RvY3VtZW50cy9zY3JpcHRzL2pzL0F0cm9wYS9jdXJyZW50L25vZGVfbW9kdWxlcy9hdHJvcGEtQ3JlYXRlSHRtbERvY3VtZW50c0Zyb21YbWxodHRwL25vZGVfbW9kdWxlcy9hdHJvcGEtUmVxdWVzdGVyL3NyYy9hdHJvcGEtUmVxdWVzdGVyLmpzIiwiQzovVXNlcnMva2FzdG9yL0RvY3VtZW50cy9zY3JpcHRzL2pzL0F0cm9wYS9jdXJyZW50L25vZGVfbW9kdWxlcy9hdHJvcGEtQ3JlYXRlSHRtbERvY3VtZW50c0Zyb21YbWxodHRwL3NyYy9hdHJvcGEtQ3JlYXRlSHRtbERvY3VtZW50c0Zyb21YbWxodHRwLmpzIiwiQzovVXNlcnMva2FzdG9yL0RvY3VtZW50cy9zY3JpcHRzL2pzL0F0cm9wYS9jdXJyZW50L25vZGVfbW9kdWxlcy9hdHJvcGEtUmVxdWVzdGVyL25vZGVfbW9kdWxlcy9hdHJvcGEtQXJnc0luZm8vbm9kZV9tb2R1bGVzL2F0cm9wYS1hcnJheXMvc3JjL2F0cm9wYS1hcnJheXMuanMiLCJDOi9Vc2Vycy9rYXN0b3IvRG9jdW1lbnRzL3NjcmlwdHMvanMvQXRyb3BhL2N1cnJlbnQvbm9kZV9tb2R1bGVzL2F0cm9wYS1SZXF1ZXN0ZXIvbm9kZV9tb2R1bGVzL2F0cm9wYS1BcmdzSW5mby9zcmMvYXRyb3BhLUFyZ3NJbmZvLmpzIiwiQzovVXNlcnMva2FzdG9yL0RvY3VtZW50cy9zY3JpcHRzL2pzL0F0cm9wYS9jdXJyZW50L25vZGVfbW9kdWxlcy9hdHJvcGEtUmVxdWVzdGVyL3NyYy9hdHJvcGEtUmVxdWVzdGVyLmpzIiwiQzovVXNlcnMva2FzdG9yL0RvY3VtZW50cy9zY3JpcHRzL2pzL0F0cm9wYS9jdXJyZW50L25vZGVfbW9kdWxlcy9hdHJvcGEtU2VyaWFsQWN0b3Ivc3JjL2F0cm9wYS1TZXJpYWxBY3Rvci5qcyIsIkM6L1VzZXJzL2thc3Rvci9Eb2N1bWVudHMvc2NyaXB0cy9qcy9BdHJvcGEvY3VycmVudC9ub2RlX21vZHVsZXMvYXRyb3BhLVRleHRBbmFseXplci9ub2RlX21vZHVsZXMvYXRyb3BhLWFycmF5cy9zcmMvYXRyb3BhLWFycmF5cy5qcyIsIkM6L1VzZXJzL2thc3Rvci9Eb2N1bWVudHMvc2NyaXB0cy9qcy9BdHJvcGEvY3VycmVudC9ub2RlX21vZHVsZXMvYXRyb3BhLVRleHRBbmFseXplci9ub2RlX21vZHVsZXMvYXRyb3BhLXNldEFzT3B0aW9uYWxBcmcvc3JjL2F0cm9wYS1zZXRBc09wdGlvbmFsQXJnLmpzIiwiQzovVXNlcnMva2FzdG9yL0RvY3VtZW50cy9zY3JpcHRzL2pzL0F0cm9wYS9jdXJyZW50L25vZGVfbW9kdWxlcy9hdHJvcGEtVGV4dEFuYWx5emVyL25vZGVfbW9kdWxlcy9hdHJvcGEtc3RyaW5nL25vZGVfbW9kdWxlcy9hdHJvcGEtYXJyYXlzL3NyYy9hdHJvcGEtYXJyYXlzLmpzIiwiQzovVXNlcnMva2FzdG9yL0RvY3VtZW50cy9zY3JpcHRzL2pzL0F0cm9wYS9jdXJyZW50L25vZGVfbW9kdWxlcy9hdHJvcGEtVGV4dEFuYWx5emVyL25vZGVfbW9kdWxlcy9hdHJvcGEtc3RyaW5nL3NyYy9hdHJvcGEtc3RyaW5nLmpzIiwiQzovVXNlcnMva2FzdG9yL0RvY3VtZW50cy9zY3JpcHRzL2pzL0F0cm9wYS9jdXJyZW50L25vZGVfbW9kdWxlcy9hdHJvcGEtVGV4dEFuYWx5emVyL3NyYy9hdHJvcGEtVGV4dEFuYWx5emVyLmpzIiwiQzovVXNlcnMva2FzdG9yL0RvY3VtZW50cy9zY3JpcHRzL2pzL0F0cm9wYS9jdXJyZW50L25vZGVfbW9kdWxlcy9hdHJvcGEtYXJyYXlzL3NyYy9hdHJvcGEtYXJyYXlzLmpzIiwiQzovVXNlcnMva2FzdG9yL0RvY3VtZW50cy9zY3JpcHRzL2pzL0F0cm9wYS9jdXJyZW50L25vZGVfbW9kdWxlcy9hdHJvcGEtaW5qZWN0L3NyYy9hdHJvcGEtaW5qZWN0LmpzIiwiQzovVXNlcnMva2FzdG9yL0RvY3VtZW50cy9zY3JpcHRzL2pzL0F0cm9wYS9jdXJyZW50L25vZGVfbW9kdWxlcy9hdHJvcGEtb2JqZWN0cy9zcmMvYXRyb3BhLW9iamVjdHMuanMiLCJDOi9Vc2Vycy9rYXN0b3IvRG9jdW1lbnRzL3NjcmlwdHMvanMvQXRyb3BhL2N1cnJlbnQvbm9kZV9tb2R1bGVzL2F0cm9wYS1yZWdleC9zcmMvYXRyb3BhLXJlZ2V4LmpzIiwiQzovVXNlcnMva2FzdG9yL0RvY3VtZW50cy9zY3JpcHRzL2pzL0F0cm9wYS9jdXJyZW50L25vZGVfbW9kdWxlcy9hdHJvcGEtcmVtb3ZlTm9kZUJ5UmVmZXJlbmNlL3NyYy9hdHJvcGEtcmVtb3ZlTm9kZUJ5UmVmZXJlbmNlLmpzIiwiQzovVXNlcnMva2FzdG9yL0RvY3VtZW50cy9zY3JpcHRzL2pzL0F0cm9wYS9jdXJyZW50L25vZGVfbW9kdWxlcy9hdHJvcGEtc3RyaW5nL25vZGVfbW9kdWxlcy9hdHJvcGEtYXJyYXlzL3NyYy9hdHJvcGEtYXJyYXlzLmpzIiwiQzovVXNlcnMva2FzdG9yL0RvY3VtZW50cy9zY3JpcHRzL2pzL0F0cm9wYS9jdXJyZW50L25vZGVfbW9kdWxlcy9hdHJvcGEtc3RyaW5nL3NyYy9hdHJvcGEtc3RyaW5nLmpzIiwiQzovVXNlcnMva2FzdG9yL0RvY3VtZW50cy9zY3JpcHRzL2pzL0F0cm9wYS9jdXJyZW50L25vZGVfbW9kdWxlcy9hdHJvcGEtdXJsL3NyYy9hdHJvcGEtdXJsLmpzIiwiQzovVXNlcnMva2FzdG9yL0RvY3VtZW50cy9zY3JpcHRzL2pzL0F0cm9wYS9jdXJyZW50L25vZGVfbW9kdWxlcy9hdHJvcGEtd2FpdEZvci9zcmMvYXRyb3BhLXdhaXRGb3IuanMiLCJDOi9Vc2Vycy9rYXN0b3IvRG9jdW1lbnRzL3NjcmlwdHMvanMvQXRyb3BhL2N1cnJlbnQvbm9kZV9tb2R1bGVzL2F0cm9wYS13dGYvbm9kZV9tb2R1bGVzL2F0cm9wYS1zdHJpbmcvbm9kZV9tb2R1bGVzL2F0cm9wYS1hcnJheXMvc3JjL2F0cm9wYS1hcnJheXMuanMiLCJDOi9Vc2Vycy9rYXN0b3IvRG9jdW1lbnRzL3NjcmlwdHMvanMvQXRyb3BhL2N1cnJlbnQvbm9kZV9tb2R1bGVzL2F0cm9wYS13dGYvbm9kZV9tb2R1bGVzL2F0cm9wYS1zdHJpbmcvc3JjL2F0cm9wYS1zdHJpbmcuanMiLCJDOi9Vc2Vycy9rYXN0b3IvRG9jdW1lbnRzL3NjcmlwdHMvanMvQXRyb3BhL2N1cnJlbnQvbm9kZV9tb2R1bGVzL2F0cm9wYS13dGYvc3JjL2F0cm9wYS13dGYtZGljdGlvbmFyeS5qc29uIiwiQzovVXNlcnMva2FzdG9yL0RvY3VtZW50cy9zY3JpcHRzL2pzL0F0cm9wYS9jdXJyZW50L25vZGVfbW9kdWxlcy9hdHJvcGEtd3RmL3NyYy9hdHJvcGEtd3RmLmpzIiwiQzovVXNlcnMva2FzdG9yL0RvY3VtZW50cy9zY3JpcHRzL2pzL0F0cm9wYS9jdXJyZW50L25vZGVfbW9kdWxlcy9hdHJvcGEteHBhdGgvc3JjL2F0cm9wYS14cGF0aC5qcyIsIkM6L1VzZXJzL2thc3Rvci9Eb2N1bWVudHMvc2NyaXB0cy9qcy9BdHJvcGEvY3VycmVudC9zcmMvYXRyb3BhLXRvb2xib3guanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUM5R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDNWFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUM5REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDbE9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQy9NQTs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqU0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUN6U0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUM3VUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ3pJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQzVhQTs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQzNNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDMUxBOzs7Ozs7Ozs7Ozs7QUNBQTs7OztBQ0FBOzs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNuV0E7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNsREE7Ozs7Ozs7O0FDQUE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQzFLQTs7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ3RRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUN4VEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ3JGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2xEQTs7Ozs7Ozs7QUNBQTs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNsREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQy9HQTs7Ozs7Ozs7QUNBQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzY0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNsTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25PQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJhdHJvcGEgPSByZXF1aXJlKCcuLi9zcmMvYXRyb3BhLXRvb2xib3guanMnKTsiLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vZG9jcy92c2RvYy9PcGVuTGF5ZXJzQWxsLmpzXCIvPlxuLypqc2xpbnRcbiAgICBpbmRlbnQ6IDQsXG4gICAgbWF4ZXJyOiA1MCxcbiAgICB3aGl0ZTogdHJ1ZSxcbiAgICBicm93c2VyOiB0cnVlLFxuICAgIGRldmVsOiB0cnVlLFxuICAgIHBsdXNwbHVzOiB0cnVlLFxuICAgIHJlZ2V4cDogdHJ1ZVxuKi9cbi8qZ2xvYmFsIFhQYXRoUmVzdWx0ICovXG4vLyBlbmQgaGVhZGVyXG5cbi8qKlxuICogQ29udGFpbmVyIGZvciBhbGwgR2xvcmlvdXMgY2xhc3NlcywgZnVuY3Rpb25zLCBldGMuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQG5hbWVzcGFjZSBDb250YWluZXIgZm9yIGFsbCBHbG9yaW91cyBjbGFzc2VzLCBmdW5jdGlvbnMsIGV0Yy5cbiAqL1xudmFyIGF0cm9wYSA9IHt9O1xuLyoqXG4gKiBDaGVja3Mgd2hldGhlciB0aGlzIGNsYXNzIGhhcyBiZWVuIG1hcmtlZCBhcyB1bnN1cHBvcnRlZCBhbmQgdGhyb3dzIGFuIFxuICogIGVycm9yIGlmIGl0IGhhcy5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAdmVyc2lvbiAyMDEzMDMwOFxuICogQHBhcmFtIHtTdHJpbmd9IGNsYXNzTmFtZSBUaGUgbmFtZSBvZiB0aGUgY2xhc3MuXG4gKiBAcGFyYW0ge1N0cmluZ30gZXJyb3JNZXNzYWdlIE9wdGlvbmFsLiBBIGN1c3RvbSBlcnJvciBtZXNzYWdlLiBEZWZhdWx0cyB0b1xuICogIGF0cm9wYS5kYXRhW2NsYXNzTmFtZV0uZXJyb3JcbiAqL1xuYXRyb3BhLnN1cHBvcnRDaGVjayA9IGZ1bmN0aW9uIChjbGFzc05hbWUsIGVycm9yTWVzc2FnZSkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIGNsYXNzTmFtZSA9IFN0cmluZyhjbGFzc05hbWUpO1xuICAgIGVycm9yTWVzc2FnZSA9IGVycm9yTWVzc2FnZSB8fCBhdHJvcGEuZGF0YVtjbGFzc05hbWVdLmVycm9yO1xuICAgIGVycm9yTWVzc2FnZSA9IFN0cmluZyhlcnJvck1lc3NhZ2UpO1xuICAgIFxuICAgIGlmKGF0cm9wYS5kYXRhW2NsYXNzTmFtZV0uc3VwcG9ydCA9PT0gJ3Vuc3VwcG9ydGVkJykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JNZXNzYWdlKTtcbiAgICB9XG59O1xuLyoqXG4gKiBQdXNoZXMgYSByZXF1aXJlbWVudCBjaGVjayBpbnRvIGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy4gVGhlIHRlc3RcbiAqICB0ZXN0cyB3aGV0aGVyIHRoZSBjbGFzcyBpcyBzdXBwb3J0ZWQgaW4gdGhpcyBlbnZpcm9ubWVudC4gU2V0c1xuICogIGF0cm9wYS5kYXRhW2NsYXNzTmFtZV0ncyBzdXBwb3J0IHRvIHVuc3VwcG9ydGVkIGFuZCBlcnJvciB0byBlcnJvck1lc3NhZ2VcbiAqICBpZiB0aGUgcmVxdWlyZW1lbnRGbiByZXR1cm5zIGZhbHNlLiBUaGUgcmVxdWlyZW1lbnQgY2hlY2tzIHdpbGwgYWxsIGJlIHJ1blxuICogIGFmdGVyIHRoZSBsaWJyYXJ5IGhhcyBsb2FkZWQuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQHZlcnNpb24gMjAxMzAzMDhcbiAqIEBwYXJhbSB7U3RyaW5nfSBjbGFzc05hbWUgVGhlIG5hbWUgb2YgdGhlIGNsYXNzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVxdWlyZW1lbnRGbiBBIGZ1bmN0aW9uIHRvIHRlc3Qgd2hldGhlciBvciBub3QgdGhlIGNsYXNzXG4gKiAgaXMgc3VwcG9ydGVkIGluIHRoaXMgZW52aXJvbm1lbnQuIElmIHN1cHBvcnRlZCwgcmV0dXJucyB0cnVlIG90aGVyd2lzZVxuICogIHJldHVybiBmYWxzZS5cbiAqIEBwYXJhbSB7U3RyaW5nfSBlcnJvck1lc3NhZ2UgVGhlIGVycm9yIG1lc3NhZ2UgdG8gdXNlIHdoZW4gdGhpcyBjbGFzcyBvciBpdHNcbiAqICBtZXRob2RzIGFyZSBjYWxsZWQgaW4gdW5zdXBwb3J0ZWQgZW52aXJvbm1lbnRzLiBEZWZhdWx0cyB0bzpcbiAqICAnVGhlIGF0cm9wYS4nICsgY2xhc3NOYW1lICsgJyBjbGFzcyBpcyB1bnN1cHBvcnRlZCBpbiB0aGlzIGVudmlyb25tZW50Lic7XG4gKi9cbmF0cm9wYS5yZXF1aXJlcyA9IGZ1bmN0aW9uIChjbGFzc05hbWUsIHJlcXVpcmVtZW50Rm4sIGVycm9yTWVzc2FnZSkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIHZhciBjaGVjayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHRlc3QgPSBmYWxzZTtcbiAgICAgICAgaWYodHlwZW9mIGNsYXNzTmFtZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignYXRyb3BhLnJlcXVpcmVzIHJlcXVpcmVzIHRoZSBjbGFzcyBuYW1lIHRvIGJlICcgK1xuICAgICAgICAgICAgICAgICdzcGVjaWZpZWQnKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYoYXRyb3BhLmRhdGFbY2xhc3NOYW1lXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBhdHJvcGEuZGF0YVtjbGFzc05hbWVdID0ge307XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKHR5cGVvZiByZXF1aXJlbWVudEZuICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgcmVxdWlyZW1lbnRGbiA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZXJyb3JNZXNzYWdlID0gZXJyb3JNZXNzYWdlIHx8ICdUaGUgYXRyb3BhLicgKyBjbGFzc05hbWUgK1xuICAgICAgICAgICAgICAgICAgICAnIGNsYXNzIGlzIHVuc3VwcG9ydGVkIGluIHRoaXMgZW52aXJvbm1lbnQuJztcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgdGVzdCA9IHJlcXVpcmVtZW50Rm4oKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICB0ZXN0ID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGF0cm9wYS5kYXRhW2NsYXNzTmFtZV0uZXJyb3IgPSBlcnJvck1lc3NhZ2U7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKHRlc3QgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgYXRyb3BhLmRhdGFbY2xhc3NOYW1lXS5zdXBwb3J0ID0gJ3Vuc3VwcG9ydGVkJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgXG4gICAgYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLnB1c2goY2hlY2spO1xufTtcbi8qKlxuICogQ29udGFpbmVyIGZvciBnb2JhbCBkYXRhIHJlbGF0ZWQgdG8gdGhlIGNsYXNzZXMgYW5kIGZ1bmN0aW9ucy5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAbmFtZXNwYWNlIENvbnRhaW5lciBmb3IgZ29iYWwgZGF0YSByZWxhdGVkIHRvIHRoZSBjbGFzc2VzIGFuZCBmdW5jdGlvbnMuXG4gKi9cbmF0cm9wYS5kYXRhID0ge307XG5cbmF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cyA9IFtdO1xuXG5hdHJvcGEubm9wID0gZnVuY3Rpb24gbm9wICgpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICByZXR1cm4gbnVsbDtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IGF0cm9wYTtcblxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2RvY3MvdnNkb2MvT3BlbkxheWVyc0FsbC5qc1wiLz5cbnZhciBhdHJvcGEgPSByZXF1aXJlKCdhdHJvcGEtaGVhZGVyJyk7XG4vKmpzbGludFxuICAgIGluZGVudDogNCxcbiAgICBtYXhlcnI6IDUwLFxuICAgIHdoaXRlOiB0cnVlLFxuICAgIGJyb3dzZXI6IHRydWUsXG4gICAgZGV2ZWw6IHRydWUsXG4gICAgcGx1c3BsdXM6IHRydWUsXG4gICAgcmVnZXhwOiB0cnVlXG4qL1xuLypnbG9iYWwgYXRyb3BhICovXG4vLyBlbmQgaGVhZGVyXG5cbi8qKlxuICogQ29udGFpbmVyIGZvciBmdW5jdGlvbnMgdGhhdCB0ZXN0IHRoZSBzdGF0ZSBvZiBpbnB1dHMuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQHZlcnNpb24gMjAxMjA5MDlcbiAqIEBuYW1lc3BhY2UgQ29udGFpbmVyIGZvciBmdW5jdGlvbnMgdGhhdCB0ZXN0IHRoZSBzdGF0ZSBvZiBpbnB1dHMuXG4gKi9cbmF0cm9wYS5pbnF1aXJlID0ge307XG4vKipcbiAqIENoZWNrcyB3aGV0aGVyIHRoZSBpbnB1dCBpcyBudWxsLlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAqIEB2ZXJzaW9uIDIwMTIwOTA5XG4gKiBAcGFyYW0ge01peGVkfSB4IEFueSBpbnB1dCB0aGF0IG1heSBvciBtYXkgbm90IGJlIG51bGwuXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIHggPT09IG51bGwuXG4gKi9cbmF0cm9wYS5pbnF1aXJlLmlzTnVsbCA9IGZ1bmN0aW9uICh4KSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgcmV0dXJuICh4ID09PSBudWxsKTtcbn07XG4vKipcbiAqIENoZWNrcyB3aGV0aGVyIHRoZSBpbnB1dCBpcyBhbiBvYmplY3QuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQHZlcnNpb24gMjAxMjA5MDlcbiAqIEBwYXJhbSB7TWl4ZWR9IHggQW55IGlucHV0IHRoYXQgbWF5IG9yIG1heSBub3QgYmUgYW4gb2JqZWN0LlxuICogQHJldHVybnMge0Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiB0eXBlb2YoeCkgPT09ICdvYmplY3QnLlxuICovXG5hdHJvcGEuaW5xdWlyZS5pc09iamVjdCA9IGZ1bmN0aW9uICh4KSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgcmV0dXJuICh0eXBlb2YgeCA9PT0gJ29iamVjdCcpO1xufTtcbi8qKlxuICogQ2hlY2tzIHdoZXRoZXIgdGhlIGlucHV0IGlzIGJvdGggYW4gb2JqZWN0IGFuZCBub3QgbnVsbC5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAdmVyc2lvbiAyMDEyMDkwOVxuICogQHBhcmFtIHtNaXhlZH0geCBBbnkgaW5wdXQgdGhhdCBtYXkgb3IgbWF5IG5vdCBiZSBib3RoIGFuXG4gKiBvYmplY3QgYW5kIG51bGwuXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIHggaXMgYm90aCBhbiBvYmplY3QgYW5kXG4gKiBub3QgbnVsbC4gKG51bGwgaXMgYW4gb2JqZWN0KS5cbiAqL1xuYXRyb3BhLmlucXVpcmUuaXNPYmplY3ROb3ROdWxsID0gZnVuY3Rpb24gKHgpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICByZXR1cm4gYXRyb3BhLmlucXVpcmUuaXNPYmplY3QoeCkgJiYgKCFhdHJvcGEuaW5xdWlyZS5pc051bGwoeCkpO1xufTtcbi8qKlxuICogQ2hlY2tzIGFuIG9iamVjdCBmb3IgdGhlIGV4aXN0ZW5jZSBvZiBhIHByb3BlcnR5XG4gKiByZWdhcmRsZXNzIG9mIHdoZXRoZXIgdGhlIHByb3BlcnR5IHdhcyBpbmhlcml0ZWRcbiAqIG9yIG5vdC5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAdmVyc2lvbiAyMDEyMDkwOVxuICogQHBhcmFtIHtPYmplY3R9IG9iaiBBbiBvYmplY3Qgd2hpY2ggbWF5IG9yIG1heSBub3RcbiAqIGhhdmUgdGhlIHByb3BlcnR5IGlkZW50aWZpZWQgYnkgcHJvcC5cbiAqIEBwYXJhbSB7U3RyaW5nfSBwcm9wIEEgc3RyaW5nIHZhbHVlIHJlcHJlc2VudGluZyB0aGVcbiAqIG5hbWUgb2YgdGhlIHByb3BlcnR5LlxuICogQHJldHVybnMge0Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiBvYmoucHJvcCBleGlzdHMsXG4gKiBvdGhlcndpc2UgcmV0dXJucyBmYWxzZS5cbiAqL1xuYXRyb3BhLmlucXVpcmUuaGFzUHJvcGVydHkgPSBmdW5jdGlvbiAob2JqLCBwcm9wKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgaWYgKGF0cm9wYS5pbnF1aXJlLmlzT2JqZWN0Tm90TnVsbChvYmopKSB7XG4gICAgICAgIHJldHVybiAocHJvcCBpbiBvYmopO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59O1xuLyoqXG4gKiBDaGVja3Mgd2hldGhlciB0aGUgaW5wdXQgaXMgYW4gZW1wdHkgc3RyaW5nLlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAqIEB2ZXJzaW9uIDIwMTMwMTE4XG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyIFRoZSBzdHJpbmcgeW91IHdhbnQgdG8ga25vdyBhYm91dFxuICogQHJldHVybnMge0Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiBzdHIgaXMgYW4gZW1wdHkgc3RyaW5nLFxuICogIG90aGVyd2lzZSByZXR1cm5zIGZhbHNlLlxuICovXG5hdHJvcGEuaW5xdWlyZS5pc0VtcHR5U3RyaW5nID0gZnVuY3Rpb24gKHN0cikge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIHZhciBvdXQgPSBmYWxzZTtcbiAgICBpZiAoJycgPT09IHN0cikge1xuICAgICAgICBvdXQgPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gb3V0O1xufTtcblxuXG5cblxud2hpbGUoYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLmxlbmd0aCA+IDApIHtcbiAgICBhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMucG9wKCkoKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gYXRyb3BhO1xuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2RvY3MvdnNkb2MvT3BlbkxheWVyc0FsbC5qc1wiLz5cbnZhciBhdHJvcGEgPSByZXF1aXJlKCdhdHJvcGEtaGVhZGVyJyk7XG5hdHJvcGEuaW5xdWlyZSA9IHJlcXVpcmUoJ2F0cm9wYS1pbnF1aXJlJykuaW5xdWlyZTtcbi8qanNsaW50XG4gICAgaW5kZW50OiA0LFxuICAgIG1heGVycjogNTAsXG4gICAgd2hpdGU6IHRydWUsXG4gICAgYnJvd3NlcjogdHJ1ZSxcbiAgICBkZXZlbDogdHJ1ZSxcbiAgICBwbHVzcGx1czogdHJ1ZSxcbiAgICByZWdleHA6IHRydWVcbiovXG4vKmdsb2JhbCBhdHJvcGEgKi9cbi8vIGVuZCBoZWFkZXJcblxuLyoqXG4gKiBVdGlsaXRpZXMgZm9yIGhhbmRsaW5nIGFycmF5cy5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAdmVyc2lvbiAyMDEzMDIyMVxuICogQG5hbWVzcGFjZSBVdGlsaXRpZXMgZm9yIGhhbmRsaW5nIGFycmF5cy5cbiAqL1xuYXRyb3BhLmFycmF5cyA9IHt9O1xuLyoqXG4gKiBDb21wYXJlcyB0d28gYXJyYXlzIGJhc2VkIG9uIHNpemUsIGNvbnRlbnRzLCBhbmQgZWxlbWVudCBvcmRlci5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAdmVyc2lvbiAyMDEyMDkwOVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkxIE9uZSBhcnJheSB5b3Ugd2FudCBjb21wYXJlZCB0byBhbm90aGVyLlxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkyIFRoZSBvdGhlciBhcnJheS5cbiAqIEByZXR1cm5zIHtCb29sZWFufSBSZXR1cm5zIHRydWUgb3IgZmFsc2UgZGVwZW5kaW5nIG9uXG4gKiAgd2hldGhlciBvciBub3QgdGhlIGFycmF5cyBtYXRjaGVkIGluIHNpemUsIGNvbXBvc2l0aW9uLCBhbmRcbiAqICBlbGVtZW50IG9yZGVyLlxuICogQGV4YW1wbGVcbiAqIHZhciB4ID0gWzEsMl07XG4gKiB2YXIgeSA9IFsxLDEsM107XG4gKiBhdHJvcGEuYXJyYXlzLm1hdGNoKHgseSk7XG4gKiAvLyByZXR1cm5zIGZhbHNlXG4gKiBAZXhhbXBsZVxuICogdmFyIHggPSBbMSwyXTtcbiAqIHZhciB5ID0gWzEsMl07XG4gKiBhdHJvcGEuYXJyYXlzLm1hdGNoKHgseSk7XG4gKiAvLyByZXR1cm5zIHRydWVcbiAqIEBleGFtcGxlXG4gKiB2YXIgeCA9IFsxLDJdO1xuICogdmFyIHkgPSBbMiwxXTtcbiAqIGF0cm9wYS5hcnJheXMubWF0Y2goeCx5KTtcbiAqIC8vIHJldHVybnMgZmFsc2UgYmVjYXVzZSB0aGUgZWxlbWVudHMgYXJlIG5vdCBpbiB0aGUgc2FtZSBvcmRlci5cbiAqIEBleGFtcGxlXG4gKiB2YXIgeCA9IFsxLHsnYVByb3AnIDogJ2FWYWx1ZSd9XTtcbiAqIHZhciB5ID0gWzEseydhUHJvcCcgOiAnYVZhbHVlJ31dO1xuICogYXRyb3BhLmFycmF5cy5tYXRjaCh4LHkpO1xuICogLy8gcmV0dXJucyBmYWxzZSBiZWNhdXNlIGV2ZW4gdGhvdWdoIHRoZSBvYmplY3QgbG9va3MgdGhlIHNhbWUsIHRoZVxuICogLy8gdHdvIG9iamVjdHMgYXJlIGluIGZhY3QgZGlzdGluY3Qgb2JqZWN0cy5cbiAqIEBleGFtcGxlXG4gKiB2YXIgb2JqID0geydhUHJvcCcgOiAnYVZhbHVlJ307XG4gKiB2YXIgeCA9IFsxLG9ial07XG4gKiB2YXIgeSA9IFsxLG9ial07XG4gKiBhdHJvcGEuYXJyYXlzLm1hdGNoKHgseSk7XG4gKiAvLyByZXR1cm5zIHRydWUgYmVjYXVzZSB0aGUgb2JqZWN0cyByZWZlcmVuY2VkIGluIHRoZSBhcnJheXMgYXJlXG4gKiAvLyBpbiBmYWN0IHRoZSBzYW1lIG9iamVjdC5cbiAqL1xuYXRyb3BhLmFycmF5cy5tYXRjaCA9IGZ1bmN0aW9uIGFycmF5c01hdGNoKGFycmF5MSwgYXJyYXkyKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgdmFyIHgsXG4gICAgbDtcbiAgICBpZiAoYXJyYXkxLmxlbmd0aCAhPT0gYXJyYXkyLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGwgPSBhcnJheTEubGVuZ3RoO1xuICAgIGZvciAoeCA9IDA7IHggPCBsOyB4ICs9IDEpIHtcbiAgICAgICAgaWYgKGFycmF5MVt4XSAhPT0gYXJyYXkyW3hdKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG59O1xuLyoqXG4gKiBTdWJ0cmFjdHMgb25lIGFycmF5IGZyb20gYW5vdGhlciBhcnJheSBiYXNlZCBvbiB0aGUgdW5pcXVlIHZhbHVlcyBpbiBib3RoXG4gKiAgc2V0cy5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAdmVyc2lvbiAyMDEzMDExMlxuICogQHBhcmFtIHtBcnJheX0gYSAoc3VidHJhaGVuZCkgVGhlIGFycmF5IHRvIHN1YnRyYWN0LlxuICogQHBhcmFtIHtBcnJheX0gKG1pbnVlbmQpIGZyb21CIFRoZSBhcnJheSB3aXRoIGVsZW1lbnRzIGR1cGxpY2F0ZWQgaW4gPGNvZGU+YTwvY29kZT5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBhIG5ldyBhcnJheSBjb250YWluaW5nIG9ubHkgdGhlIHVuaXF1ZVxuICogIHZhbHVlcyBmb3VuZCBpbiA8Y29kZT5mcm9tQjwvY29kZT4gdGhhdCBhcmUgbm90IHByZXNlbnQgaW4gPGNvZGU+YTwvY29kZT5cbiAqIEBleGFtcGxlXG4gKiB2YXIgeCA9IFsxLDJdO1xuICogdmFyIHkgPSBbMSwxLDNdO1xuICogYXRyb3BhLmFycmF5cy5zdWJ0cmFjdCh4LHkpO1xuICogLy8gcmV0dXJucyBbM11cbiAqIEBleGFtcGxlXG4gKiB2YXIgeCA9IFsxLDNdO1xuICogdmFyIHkgPSBbMywxXTtcbiAqIGF0cm9wYS5hcnJheXMuc3VidHJhY3QoeCx5KTtcbiAqIC8vIHJldHVybnMgW11cbiAqIEBleGFtcGxlXG4gKiB2YXIgeCA9IFsxLDNdO1xuICogdmFyIHkgPSBbMywxLDEsOV07XG4gKiBhdHJvcGEuYXJyYXlzLnN1YnRyYWN0KHgseSk7XG4gKiAvLyByZXR1cm5zIFs5XVxuICogQGV4YW1wbGVcbiAqIHZhciB4ID0gWzEsMyx7J2FQcm9wJyA6ICdhVmFsJ31dO1xuICogdmFyIHkgPSBbMywxLHsnYVByb3AnIDogJ2FWYWwnfV07XG4gKiBhdHJvcGEuYXJyYXlzLnN1YnRyYWN0KHgseSk7XG4gKiAvLyByZXR1cm5zIFt7J2FQcm9wJyA6ICdhVmFsJ31dIFxuICogLy8gYmVjYXVzZSB0aGUgdHdvIG9iamVjdHMgYXJlIG5vdCB0aGUgc2FtZSBvYmplY3QuXG4gKiBAZXhhbXBsZVxuICogdmFyIG9iaiA9IHsnYVByb3AnIDogJ2FWYWwnfTtcbiAqIHZhciB4ID0gWzEsMyxvYmpdO1xuICogdmFyIHkgPSBbMywxLHsnYVByb3AnIDogJ2FWYWwnfV07XG4gKiBhdHJvcGEuYXJyYXlzLnN1YnRyYWN0KHgseSk7XG4gKiAvLyByZXR1cm5zIFt7J2FQcm9wJyA6ICdhVmFsJ31dIFxuICogLy8gYmVjYXVzZSB0aGUgdHdvIG9iamVjdHMgYXJlIG5vdCB0aGUgc2FtZSBvYmplY3QuXG4gKiBAZXhhbXBsZVxuICogdmFyIG9iaiA9IHsnYVByb3AnIDogJ2FWYWwnfVxuICogdmFyIHggPSBbMSwzLG9ial07XG4gKiB2YXIgeSA9IFszLDEsb2JqXTtcbiAqIGF0cm9wYS5hcnJheXMuc3VidHJhY3QoeCx5KTtcbiAqIC8vIHJldHVybnMgW10gXG4gKiAvLyBiZWNhdXNlIHRoZSBvYmplY3RzIHJlZmVyZW5jZWQgaW4gdGhlIGFycmF5cyBhcmUgdGhlIHNhbWUgb2JqZWN0LlxuICovXG5hdHJvcGEuYXJyYXlzLnN1YnRyYWN0ID0gZnVuY3Rpb24oYSwgZnJvbUIpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICB2YXIgdGhlID0ge307XG4gICAgdGhlLnJlc3VsdCA9IFtdO1xuICAgIGZyb21CLmZvckVhY2goZnVuY3Rpb24oaXRlbSl7XG4gICAgICAgIHRoZS5tYXJrID0gZmFsc2U7XG4gICAgICAgIGEuZm9yRWFjaChmdW5jdGlvbihybSl7XG4gICAgICAgICAgICBpZihpdGVtID09PSBybSkge1xuICAgICAgICAgICAgICAgIHRoZS5tYXJrID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmKHRoZS5tYXJrICE9PSB0cnVlKSB7XG4gICAgICAgICAgICB0aGUucmVzdWx0LnB1c2goaXRlbSk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gdGhlLnJlc3VsdDtcbn07XG4vKipcbiAqIFJldHVybnMgYW4gYXJyYXkgb2YgdmFsdWVzIGZvdW5kIGluIGJvdGggb2YgdGhlIGdpdmVuIGFycmF5cy5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAdmVyc2lvbiAyMDEzMDExMlxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkxIEFuIGFycmF5LlxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkyIEFub3RoZXIgYXJyYXkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYW4gYXJyYXkgb2YgdmFsdWVzIGZvdW5kIGluIGJvdGggb2YgdGhlIGdpdmVuXG4gKiAgYXJyYXlzLlxuICogQGV4YW1wbGVcbiAqIHZhciB4ID0gWzEsMyw0XTtcbiAqIHZhciB5ID0gWzMsMSw1XTtcbiAqIGF0cm9wYS5hcnJheXMuaW50ZXJzZWN0KHgseSk7XG4gKiAvLyByZXR1cm5zIFsxLDNdXG4gKiBAZXhhbXBsZVxuICogdmFyIHggPSBbMSwxLDMsNF07XG4gKiB2YXIgeSA9IFszLDEsMSw1XTtcbiAqIGF0cm9wYS5hcnJheXMuaW50ZXJzZWN0KHgseSk7XG4gKiAvLyByZXR1cm5zIFsxLDEsM11cbiAqIEBleGFtcGxlXG4gKiB2YXIgb2JqID0geydhUHJvcCcgOiAnYVZhbCd9O1xuICogdmFyIHggPSBbMSwzLG9ial07XG4gKiB2YXIgeSA9IFszLDEsb2JqXTtcbiAqIGF0cm9wYS5hcnJheXMuaW50ZXJzZWN0KHgseSk7XG4gKiAvLyByZXR1cm5zIFsxLDMseydhUHJvcCcgOiAnYVZhbCd9XVxuICogQGV4YW1wbGVcbiAqIHZhciBvYmogPSB7J2FQcm9wJyA6ICdhVmFsJ307XG4gKiB2YXIgeCA9IFsxLDMseydhUHJvcCcgOiAnYVZhbCd9XTtcbiAqIHZhciB5ID0gWzMsMSxvYmpdO1xuICogYXRyb3BhLmFycmF5cy5pbnRlcnNlY3QoeCx5KTtcbiAqIC8vIHJldHVybnMgWzEsM10gYmVjYXVzZSB0aGUgdHdvIG9iamVjdHMgYXJlIG5vdCB0aGUgc2FtZSBvYmplY3QuXG4gKiBAZXhhbXBsZVxuICogdmFyIHggPSBbMSwzLHsnYVByb3AnIDogJ2FWYWwnfV07XG4gKiB2YXIgeSA9IFszLDEseydhUHJvcCcgOiAnYVZhbCd9XTtcbiAqIGF0cm9wYS5hcnJheXMuaW50ZXJzZWN0KHgseSk7XG4gKiAvLyByZXR1cm5zIFsxLDNdIGJlY2F1c2UgdGhlIHR3byBvYmplY3RzIGFyZSBub3QgdGhlIHNhbWUgb2JqZWN0LlxuICovXG5hdHJvcGEuYXJyYXlzLmludGVyc2VjdCA9IGZ1bmN0aW9uIGludGVyc2VjdChhcnJheTEsIGFycmF5Mikge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIHZhciBzbWFsbEFycmF5LCBsYXJnZUFycmF5LCBpbnRlcnNlY3Rpb24gPSBbXTtcbiAgICBpZihhcnJheTEubGVuZ3RoID4gYXJyYXkyLmxlbmd0aCkge1xuICAgICAgICBsYXJnZUFycmF5ID0gYXJyYXkxLnNwbGljZSgwKTtcbiAgICAgICAgc21hbGxBcnJheSA9IGFycmF5Mi5zcGxpY2UoMCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgbGFyZ2VBcnJheSA9IGFycmF5Mi5zcGxpY2UoMCk7XG4gICAgICAgIHNtYWxsQXJyYXkgPSBhcnJheTEuc3BsaWNlKDApO1xuICAgIH1cbiAgICBzbWFsbEFycmF5LmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgdmFyIGlkeEluTGFyZ2VBcnJheSA9IGxhcmdlQXJyYXkuaW5kZXhPZihpdGVtKTtcbiAgICAgICAgaWYgKDAgPD0gaWR4SW5MYXJnZUFycmF5KSB7IC8vIGhhcyB3b3JkXG4gICAgICAgICAgICBpbnRlcnNlY3Rpb24ucHVzaChsYXJnZUFycmF5LnNwbGljZShpZHhJbkxhcmdlQXJyYXksIDEpWzBdKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBpbnRlcnNlY3Rpb247XG59O1xuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBmcmVxdWVuY3kgb2YgaXRlbXMgb2NjdXJyaW5nIGluIGFuIGFycmF5LlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAqIEB2ZXJzaW9uIDIwMTMwMTE4XG4gKiBAcGFyYW0ge0FycmF5fSBhcnIgVGhlIGFycmF5IHRvIGNhbGN1bGF0ZSBmcmVxdWVuY2llcyBmcm9tLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBhbiBvYmplY3Qgd2hvc2Uga2V5cyBhcmUgZWFjaCB1bmlxdWVcbiAqICBlbGVtZW50cyBmcm9tIHRoZSBhcnJheSBhbmQgdGhlaXIgdmFsdWUgaXMgdGhlaXIgZnJlcXVlbmN5IG9mXG4gKiAgb2NjdXJyZW5jZSB3aXRoaW4gdGhlIGFycmF5LiBCZSBjYXJlZnVsIHRoYXQgeW91ciBhcnJheSBkb2VzXG4gKiAgbm90IGNvbnRhaW4gdmFsdWVzIG1hdGNoaW5nIG9iamVjdCBpbnN0YW5jZSBwcm9wZXJ0eSBuYW1lcy5cbiAqIEBleGFtcGxlXG4gKiB2YXIgeCA9IFsxLDEsMSwxLDEsMywzXTtcbiAqIGF0cm9wYS5hcnJheXMuZ2V0RnJlcXVlbmN5KHgpO1xuICogLy8gcmV0dXJucyB7XG4gKiAvLyAgICAgXCIxXCI6IDUsXG4gKiAvLyAgICAgXCIzXCI6IDJcbiAqIC8vIH1cbiAqIEBleGFtcGxlXG4gKiB2YXIgeCA9IFtcImJpbGxcIiwgXCJmcmVkXCIsIFwiZnJlZFwiLCBcImphbmVcIl07XG4gKiBhdHJvcGEuYXJyYXlzLmdldEZyZXF1ZW5jeSh4KTtcbiAqIC8vIHJldHVybnMge1xuICogLy8gICAgIFwiYmlsbFwiOiAxLFxuICogLy8gICAgIFwiZnJlZFwiOiAyLFxuICogLy8gICAgIFwiamFuZVwiOiAxXG4gKiAvLyB9XG4gKiBAZXhhbXBsZVxuICogdmFyIHggPSBbMSwzLHsnYVByb3AnIDogJ2FWYWwnfV07XG4gKiBhdHJvcGEuYXJyYXlzLmdldEZyZXF1ZW5jeSh4KTtcbiAqIC8vIHJldHVybnMge1xuICogLy8gICAgIFwiMVwiOiAxLFxuICogLy8gICAgIFwiM1wiOiAxLFxuICogLy8gICAgIFwiW29iamVjdCBPYmplY3RdXCI6IDFcbiAqIC8vIH1cbiAqIEBleGFtcGxlXG4gKiB2YXIgb2JqID0geydhUHJvcCcgOiAnYVZhbCd9O1xuICogdmFyIG90aGVyT2JqID0ge307XG4gKiB2YXIgeCA9IFsxLDMsb2JqLG90aGVyT2JqLHsnYURvdWdobnV0JyA6ICdzcHJpbmtsZXMnfV07XG4gKiBhdHJvcGEuYXJyYXlzLmdldEZyZXF1ZW5jeSh4KTtcbiAqIC8vIHJldHVybnMge1xuICogLy8gICAgIFwiMVwiOiAxLFxuICogLy8gICAgIFwiM1wiOiAxLFxuICogLy8gICAgIFwiW29iamVjdCBPYmplY3RdXCI6IDNcbiAqIC8vIH1cbiAqIEBleGFtcGxlXG4gKiB2YXIgeCA9IFsxLDMsXCJ0b1N0cmluZ1wiXTtcbiAqIGF0cm9wYS5hcnJheXMuZ2V0RnJlcXVlbmN5KHgpO1xuICogLy8gcmV0dXJucyB7XG4gKiAvLyAgICAgXCIxXCI6IDEsXG4gKiAvLyAgICAgXCIzXCI6IDEsXG4gKiAvLyAgICAgXCJ0b1N0cmluZ1wiOiBcImZ1bmN0aW9uIHRvU3RyaW5nKCkge1xcbiAgICBbbmF0aXZlIGNvZGVdXFxufTFcIlxuICogLy8gfVxuICovXG5hdHJvcGEuYXJyYXlzLmdldEZyZXF1ZW5jeSA9IGZ1bmN0aW9uIChhcnIpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICB2YXIgb3V0ID0gYXJyLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBjdXJyKSB7XG4gICAgICAgIGlmIChhY2NbY3Vycl0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgYWNjW2N1cnJdID0gMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFjY1tjdXJyXSArPSAxO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhY2M7XG4gICAgfSwge30pO1xuICAgIHJldHVybiBvdXQ7XG59O1xuLyoqXG4gKiBHZXRzIFVuaXF1ZSB2YWx1ZXMgZnJvbSBhbiBhcnJheS5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAdmVyc2lvbiAyMDEzMDExOFxuICogQHBhcmFtIHtBcnJheX0gbGFyZ2VBcnJheSBUaGUgYXJyYXkgd2l0aCBkdXBsaWNhdGUgdmFsdWVzIGluIGl0LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGEgbmV3IGFycmF5IGNvbnRhaW5pbmcgb25seSB0aGUgdW5pcXVlXG4gKiAgdmFsdWVzIGZvdW5kIGluIHRoZSBsYXJnZUFycmF5LlxuICogQGV4YW1wbGVcbiAqIHZhciB4ID0gWzEsMSwxLDQsNCwzLDZdO1xuICogYXRyb3BhLmFycmF5cy5nZXRVbmlxdWUoeCk7XG4gKiAvLyByZXR1cm5zIFsgXCIxXCIsIFwiNFwiLCBcIjNcIiwgXCI2XCIgXVxuICogQGV4YW1wbGVcbiAqIHZhciB4ID0gW1wiYmlsbFwiLCBcImZyZWRcIiwgXCJqYW5lXCIsIFwiZnJlZFwiXTtcbiAqIGF0cm9wYS5hcnJheXMuZ2V0VW5pcXVlKHgpO1xuICogLy8gcmV0dXJucyBbXCJiaWxsXCIsIFwiZnJlZFwiLCBcImphbmVcIl1cbiAqIEBleGFtcGxlXG4gKiB2YXIgeCA9IFsgXG4gKiAgICAgXCJiaWxsXCIsXG4gKiAgICAge1wiYVByb3BcIiA6IFwiYVZhbHVlXCJ9LFxuICogICAgIHtcImFHdXlcIiA6IFwiZnJlZFwifSxcbiAqICAgICB7XCJhTGFkeVwiIDogXCJqYW5lXCJ9XG4gKiBdO1xuICogYXRyb3BhLmFycmF5cy5nZXRVbmlxdWUoeCk7XG4gKiAvLyByZXR1cm5zIFsgXCJiaWxsXCIsIFwiW29iamVjdCBPYmplY3RdXCIgXVxuICovXG5hdHJvcGEuYXJyYXlzLmdldFVuaXF1ZSA9IGZ1bmN0aW9uIChsYXJnZUFycmF5KSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKGF0cm9wYS5hcnJheXMuZ2V0RnJlcXVlbmN5KGxhcmdlQXJyYXkpKS5zb3J0KCk7XG59O1xuLyoqXG4gKiBSZW1vdmVzIGVtcHR5IHN0cmluZ3MgZnJvbSB0aGUgZ2l2ZW4gYXJyYXkuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQHZlcnNpb24gMjAxMzAxMThcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5V2l0aEVtcHR5RWxlbWVudHMgVGhlIGFycmF5IHdpdGggZW1wdHkgc3RyaW5ncyBpbiBpdC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBhIG5ldyBhcnJheSB3aXRoIGVtcHR5IHN0cmluZ3MgcmVtb3ZlZC5cbiAqIEBleGFtcGxlXG4gKiB2YXIgeCA9IFsgMTAsICwgNSwgXCJcIiwgJycsIDcgXTtcbiAqIGNvbnNvbGUubG9nKCdzdGFydGluZyBsZW5ndGggJyArIHgubGVuZ3RoKTtcbiAqIGNvbnNvbGUubG9nKHgpO1xuICogeCA9IGF0cm9wYS5hcnJheXMucmVtb3ZlRW1wdHlFbGVtZW50cyh4KTtcbiAqIGNvbnNvbGUubG9nKCdlbmRpbmcgbGVuZ3RoICcgKyB4Lmxlbmd0aCk7XG4gKiBjb25zb2xlLmxvZyh4KTtcbiAqIC8vIGRpc3BsYXlzIHRoZSBmb2xsb3dpbmdcbiAqIC8vIHN0YXJ0aW5nIGxlbmd0aCA2XG4gKiAvLyBbMTAsIHVuZGVmaW5lZCwgNSwgXCJcIiwgXCJcIiwgN11cbiAqIC8vIGVuZGluZyBsZW5ndGggM1xuICogLy8gWzEwLCA1LCA3XVxuICovXG5hdHJvcGEuYXJyYXlzLnJlbW92ZUVtcHR5RWxlbWVudHMgPSBmdW5jdGlvbiAoYXJyYXlXaXRoRW1wdHlFbGVtZW50cykge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIHJldHVybiBhcnJheVdpdGhFbXB0eUVsZW1lbnRzLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICByZXR1cm4gIWF0cm9wYS5pbnF1aXJlLmlzRW1wdHlTdHJpbmcoaXRlbSk7XG4gICAgfSk7XG59O1xuLyoqXG4gKiBSZWluZGV4ZXMgYW4gYXJyYXkuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQHZlcnNpb24gMjAxMzAxMThcbiAqIEBwYXJhbSB7QXJyYXl9IGFyciBUaGUgYXJyYXkgd2l0aCBkaXNjb250aW51b3VzIGtleXMuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYW4gYXJyYXkgd2l0aCBjb250aW51b3VzIGtleXMuXG4gKiBAZXhhbXBsZVxuICogdmFyIHggPSBbIFwiYVwiLCBcImJcIiwgXCJjXCIsIHVuZGVmaW5lZCBdO1xuICogY29uc29sZS5sb2coeCk7IC8vIFsgXCJhXCIsIFwiYlwiLCBcImNcIiwgdW5kZWZpbmVkIF1cbiAqIGNvbnNvbGUubG9nKHgubGVuZ3RoKTsgLy8gNFxuICogXG4gKiBkZWxldGUgeFsxXTsgLy8gZGVsZXRlcyB0aGUga2V5IGZyb20gdGhlIGFycmF5IGJ1dFxuICogICAgICAgICAgICAgIC8vIHRoZSBhcnJheSBsZW5ndGggcmVtYWlucyB0aGUgc2FtZVxuICogICAgICAgICAgICAgIC8vIGF0IHRoaXMgcG9pbnQgdGhlIGFycmF5cyBrZXlzIGFyZSAwLCAyLCBhbmQgM1xuICogY29uc29sZS5sb2coeCk7IC8vIFsgXCJhXCIsIHVuZGVmaW5lZCwgXCJjXCIsIHVuZGVmaW5lZCBdXG4gKiBjb25zb2xlLmxvZyh4Lmxlbmd0aCk7IC8vIDRcbiAqIFxuICogeCA9IGF0cm9wYS5hcnJheXMucmVpbmRleCh4KTtcbiAqIGNvbnNvbGUubG9nKHgpOyAvLyAgWyBcImFcIiwgXCJjXCIsIHVuZGVmaW5lZCBdXG4gKiAgICAvLyBub3RlIHRoYXQgdGhlIGxhc3QgZWxlbWVudCBleGlzdGVkIGluIHRoZSBhcnJheSwgaXRzIHZhbHVlIHdhc1xuICogICAgLy8gdW5kZWZpbmVkIGJ1dCBpdCBkaWQgaGF2ZSBhIGtleSBzbyB0aGUgZWxlbWVudCByZW1haW5zIGluIHRoZSBhcnJheS5cbiAqICAgIC8vXG4gKiAgICAvLyBUaGUgZGVsZXRlZCBlbGVtZW50IHdhcyBpbiBmYWN0IGRlbGV0ZWQgZnJvbSB0aGUgYXJyYXkgc28gdGhlcmUgd2FzIG5vXG4gKiAgICAvLyBrZXkgeFsxXSBhdCBhbGwsIHdoZW4gdHJ5aW5nIHRvIGFjY2VzcyB0aGlzIG5vbiBleGlzdGluZyBlbGVtZW50IHRoZVxuICogICAgLy8gdmFsdWUgb2YgdW5kZWZpbmVkIHdhcyByZXR1cm5lZC4gVGhpcyBiZWhhdmlvciBpcyBjb25mdXNpbmcgdW5sZXNzIHlvdVxuICogICAgLy8gdGhpbmsgYWJvdXQgdGhlIGFycmF5YXMgYW4gb2JqZWN0IHdob3NlIHByb3BlcnRpZXMgYXJlIG5hbWVkIGJ5XG4gKiAgICAvLyBudW1iZXJzLiBBY2Nlc3NpbmcgYW4gdW5kZWZpbmVkIHByb3BlcnR5IHJldHVybnMgdW5kZWZpbmVkIHJlZ2FyZGxlc3NcbiAqICAgIC8vIG9mIHdoZXRoZXIgdGhlIHByb3BlcnR5IGV4aXN0ZWQgaW4gdGhlIHBhc3Qgb3Igbm90LlxuICogY29uc29sZS5sb2coeC5sZW5ndGgpOyAvLyAzXG4gKi9cbmF0cm9wYS5hcnJheXMucmVpbmRleCA9IGZ1bmN0aW9uIHJlaW5kZXgoYXJyKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgdmFyIGlkeCwgb3V0O1xuICAgIG91dCA9IFtdO1xuICAgIGZvcihpZHggaW4gYXJyKSB7XG4gICAgICAgIGlmKGFyci5oYXNPd25Qcm9wZXJ0eShpZHgpKSB7XG4gICAgICAgICAgICBvdXQucHVzaChhcnJbaWR4XSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG91dDtcbn07XG4vKipcbiAqIFNvcnRzIGFuIGFycmF5J3MgZWxlbWVudHMgbnVtZXJpY2FsbHkuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQHZlcnNpb24gMjAxMzAxMjBcbiAqIEBwYXJhbSB7QXJyYXl9IGFyciBUaGUgYXJyYXkgdG8gc29ydC4gQWxsIGVsZW1lbnRzIG9mIHRoZSBhcnJheSBtdXN0IGJlXG4gKiAgbnVtYmVyLWlzaC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBhbiBhcnJheSB3aG9zZSBlbGVtZW50cyBhcmUgaW4gbnVtZXJpYyBvcmRlci5cbiAqIEBleGFtcGxlXG4gKiB2YXIgeCA9IFszLCAyLCA5LCAyNiwgMTAsIDEsIDk5LCAxNV07XG4gKiBjb25zb2xlLmxvZyggYXRyb3BhLmFycmF5cy5zb3J0TnVtZXJpY2FsbHkoeCkgKTtcbiAqIC8vIGxvZ3MgWzEsIDIsIDMsIDksIDEwLCAxNSwgMjYsIDk5XVxuICovXG5hdHJvcGEuYXJyYXlzLnNvcnROdW1lcmljYWxseSA9IGZ1bmN0aW9uIHNvcnROdW1lcmljYWxseShhcnIpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICByZXR1cm4gYXJyLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIChhIC0gYik7XG4gICAgfSk7XG59O1xuLyoqXG4gKiBUaHJvd3MgYW4gZXJyb3IsIDxjb2RlPlN0cmluZy5wcm90b3R5cGUubG9jYWxlQ29tcGFyZTwvY29kZT4gaXMgbm90IFxuICogIHN0YW5kYXJkaXplZC5cbiAqIFxuICogIFllcywgbG9jYWxlQ29tcGFyZSBpcyBpbiB0aGUgc3RhbmRhcmQgYnV0LCBhdCB0aGlzIHRpbWUgdGhlIGFjdHVhbFxuICogIGNvbXBhcmlzb24gaXMgaW1wbGVtZW50YXRpb24gZGVwZW5kYW50LiBUaGlzIG1lYW5zIHRoYXQgXCJhbHBoYWJldGljYWwgb3JkZXJcIlxuICogIGNhbiBiZSBkaWZmZXJlbnQgb24gZGlmZmVyZW50IHBsYXRmb3Jtcy4gV2hhdCBJIGZvdW5kIHdhcyB0aGF0IGluIG5vZGUgdGhlXG4gKiAgYXJyYXkgb2YgPGNvZGU+WydhJywnWicsJ0EnLCd6J108L2NvZGU+IHdvdWxkIGJlIHNvcnRlZCB0b1xuICogIDxjb2RlPlsnQScsJ1onLCdhJywnelwiXTwvY29kZT4sIHdoaWxlIG9uXG4gKiAgZmlyZWZveCBpdCB3b3VsZCBiZSBzb3J0ZWQgdG8gPGNvZGU+WydhJywnQScsJ3onLCdaJ108L2NvZGU+LiBXaG8ga25vd3MgaWZcbiAqICBhbm90aGVyIGltcGxlbWVudG9yIHdvdWxkIHNvcnQgaXQgPGNvZGU+WydBJywnYScsJ1onLCd6J108L2NvZGU+P1xuICogXG4gKiBJbiBvcmRlciB0byBwcm92aWRlIGEgcmVsaWFibGUgaW1wbGVtZW50YXRpb24gSSB3b3VsZCBoYXZlIHRvIGNyZWF0ZSBteSBvd25cbiAqICBpbXBsZW1lbnRhdGlvbiBvZiA8Y29kZT5TdHJpbmcucHJvdG90eXBlLmxvY2FsZUNvbXBhcmU8L2NvZGU+IGFuZCB0aGF0J3NcbiAqICBqdXN0IHRvbyBtdWNoIHdvcmsgZm9yIG1lIHRvIGRvIGFsb25lLlxuICogQHRocm93cyB7RXJyb3J9IFwiU3RyaW5nLnByb3RvdHlwZS5sb2NhbGVDb21wYXJlIGlzIG5vdCBzdGFuZGFyZGl6ZWRcIlxuICovXG5hdHJvcGEuYXJyYXlzLnNvcnRBbHBoYWJldGljYWxseSA9IGZ1bmN0aW9uIHNvcnRBbHBoYWJldGljYWxseShhcnIpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJTdHJpbmcucHJvdG90eXBlLmxvY2FsZUNvbXBhcmUgaXMgbm90IHN0YW5kYXJkaXplZFwiKTtcbn07XG4vKipcbiAqIERlbGV0ZXMgdGhlIGdpdmVuIGVsZW1lbnQgZnJvbSB0aGUgYXJyYXkgYXQgdGhlIGdpdmVuIGluZGV4LiBJdCBiYXNpY2FsbHlcbiAqICBkb2VzIHdoYXQgeW91IHdvdWxkIGV4cGVjdCB0aGUgZGVsZXRlIG9wZXJhdG9yIHRvIGRvLCBleGNlcHQgdGhlIGRlbGV0ZVxuICogIG9wZXJhdG9yIGRvZXNuJ3QgZG8gd2hhdCB5b3Ugd291bGQgZXhwZWN0LlxuICogQHBhcmFtIHtBcnJheX0gYXJyIFRoZSBhcnJheS5cbiAqIEBwYXJhbSB7TnVtYmVyfSBpbmRleCBUaGUgaW5kZXggb2YgdGhlIGVsZW1lbnQgdG8gZGVsZXRlLlxuICogQHJldHVybnMgUmV0dXJucyBhbiBhcnJheSB3aXRoIHRoZSBlbGVtZW50IHJlbW92ZWQsIGNvbnRpZ3VvdXMga2V5cywgYW5kXG4gKiAgd2hvc2UgbGVuZ3RoIGlzIDEgbGVzcyB0aGFuIHRoZSBpbnB1dCBhcnJheS5cbiAqL1xuYXRyb3BhLmFycmF5cy5kZWxldGVFbGVtZW50ID0gZnVuY3Rpb24gKGFyciwgaW5kZXgpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICBkZWxldGUgYXJyW2luZGV4XTtcbiAgICByZXR1cm4gYXRyb3BhLmFycmF5cy5yZWluZGV4KGFycik7XG59O1xuXG5cblxuXG53aGlsZShhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMubGVuZ3RoID4gMCkge1xuICAgIGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5wb3AoKSgpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBhdHJvcGE7XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vZG9jcy92c2RvYy9PcGVuTGF5ZXJzQWxsLmpzXCIvPlxudmFyIGF0cm9wYSA9IHJlcXVpcmUoJ2F0cm9wYS1oZWFkZXInKTtcbi8qanNsaW50XG4gICAgaW5kZW50OiA0LFxuICAgIG1heGVycjogNTAsXG4gICAgd2hpdGU6IHRydWUsXG4gICAgYnJvd3NlcjogdHJ1ZSxcbiAgICBkZXZlbDogdHJ1ZSxcbiAgICBwbHVzcGx1czogdHJ1ZSxcbiAgICByZWdleHA6IHRydWVcbiovXG4vKmdsb2JhbCBhdHJvcGEgKi9cbi8vIGVuZCBoZWFkZXJcbi8qKlxuICogQ29udGFpbmVyIGZvciBjdXN0b20gRXJyb3JzLlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAqIEBuYW1lc3BhY2UgQ29udGFpbmVyIGZvciBjdXN0b20gRXJyb3JzLlxuICovXG5hdHJvcGEuY3VzdG9tRXJyb3JzID0ge307XG5cbi8qKlxuICogSW52YWxpZCBBcmd1bWVudCBUeXBlcyBFcnJvclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAqIEB2ZXJzaW9uIDIwMTMwMjIxXG4gKiBAY2xhc3MgSW52YWxpZCBBcmd1bWVudCBUeXBlcyBFcnJvclxuICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2UgT3B0aW9uYWwuIFRoZSBlcnJvciBtZXNzYWdlIHRvIHNlbmQuIERlZmF1bHRzIHRvXG4gKiAgPGNvZGU+SW52YWxpZEFyZ3VtZW50VHlwZXNFcnJvcjwvY29kZT5cbiAqIEByZXR1cm5zIHtFcnJvcn0gUmV0dXJucyBhbiBpbnN0YW5jZSBvZiB0aGUgSW52YWxpZEFyZ3VtZW50VHlwZXNFcnJvclxuICovXG5hdHJvcGEuY3VzdG9tRXJyb3JzLkludmFsaWRBcmd1bWVudFR5cGVzRXJyb3IgPSBmdW5jdGlvbiBJbnZhbGlkQXJndW1lbnRUeXBlc0Vycm9yKG1lc3NhZ2UpIHtcbiAgICAndXNlIHN0cmljdCc7XG4gICAgLyoqXG4gICAgICogVGhlIG5hbWUgb2YgdGhlIGVycm9yLiBUZWxscyB0aGUgdXNlciB3aGF0IGtpbmQgb2YgY3VzdG9tXG4gICAgICogZXJyb3IgaGFzIGJlZW4gdGhyb3duLlxuICAgICAqIEBmaWVsZE9mIGF0cm9wYS5jdXN0b21FcnJvcnMuSW52YWxpZEFyZ3VtZW50VHlwZXNFcnJvciNcbiAgICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgICAqIEBkZWZhdWx0IFwiYXRyb3BhLmN1c3RvbUVycm9ycy5JbnZhbGlkQXJndW1lbnRUeXBlc0Vycm9yXCJcbiAgICAgKi9cbiAgICB0aGlzLm5hbWUgPSBcImF0cm9wYS5jdXN0b21FcnJvcnMuSW52YWxpZEFyZ3VtZW50VHlwZXNFcnJvclwiO1xuICAgIC8qKlxuICAgICAqIFRoZSBlcnJvciBtZXNzYWdlIHRvIHNlbmQuXG4gICAgICogQGZpZWxkT2YgYXRyb3BhLmN1c3RvbUVycm9ycy5JbnZhbGlkQXJndW1lbnRUeXBlc0Vycm9yI1xuICAgICAqIEB0eXBlIHtTdHJpbmd9XG4gICAgICogQGRlZmF1bHQgXCJJbnZhbGlkQXJndW1lbnRUeXBlc0Vycm9yXCJcbiAgICAgKi9cbiAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlIHx8IFwiSW52YWxpZEFyZ3VtZW50VHlwZXNFcnJvclwiO1xufTtcbmF0cm9wYS5jdXN0b21FcnJvcnMuSW52YWxpZEFyZ3VtZW50VHlwZXNFcnJvci5wcm90b3R5cGUgPSBuZXcgRXJyb3IoKTtcbmF0cm9wYS5jdXN0b21FcnJvcnMuSW52YWxpZEFyZ3VtZW50VHlwZXNFcnJvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBcbiAgICBhdHJvcGEuY3VzdG9tRXJyb3JzLkludmFsaWRBcmd1bWVudFR5cGVzRXJyb3I7XG5cblxuXG5cbndoaWxlKGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5sZW5ndGggPiAwKSB7XG4gICAgYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLnBvcCgpKCk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGF0cm9wYTtcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9kb2NzL3ZzZG9jL09wZW5MYXllcnNBbGwuanNcIi8+XG52YXIgYXRyb3BhID0gcmVxdWlyZSgnYXRyb3BhLWhlYWRlcicpO1xuYXRyb3BhLmlucXVpcmUgPSByZXF1aXJlKCdhdHJvcGEtaW5xdWlyZScpLmlucXVpcmU7XG5hdHJvcGEuYXJyYXlzID0gcmVxdWlyZSgnYXRyb3BhLWFycmF5cycpLmFycmF5cztcbmF0cm9wYS5jdXN0b21FcnJvcnMgPSByZXF1aXJlKCdhdHJvcGEtY3VzdG9tRXJyb3JzJykuY3VzdG9tRXJyb3JzO1xuLypqc2xpbnRcbiAgICBpbmRlbnQ6IDQsXG4gICAgbWF4ZXJyOiA1MCxcbiAgICB3aGl0ZTogdHJ1ZSxcbiAgICBicm93c2VyOiB0cnVlLFxuICAgIGRldmVsOiB0cnVlLFxuICAgIHBsdXNwbHVzOiB0cnVlLFxuICAgIHJlZ2V4cDogdHJ1ZVxuKi9cbi8qZ2xvYmFsIGF0cm9wYSAqL1xuLy8gZW5kIGhlYWRlclxuXG4vKipcbiAqIFRoaXMgcmVwcmVzZW50cyBhIGZpbHRlciBmb3IgYXJndW1lbnRzIGJhc2VkIG9uIHR5cGUuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQHZlcnNpb24gMjAxMzAyMjFcbiAqIEBjbGFzcyBUaGlzIHJlcHJlc2VudHMgYSBmaWx0ZXIgZm9yIGFyZ3VtZW50cyBiYXNlZCBvbiB0eXBlLlxuICogQHJldHVybnMge0FyZ3NJbmZvfSBSZXR1cm5zIGFuIEFyZ3NJbmZvIGZpbHRlci5cbiAqIEByZXF1aXJlcyBhdHJvcGEuYXJyYXlzLm1hdGNoXG4gKiBAZXhhbXBsZVxuICogZnVuY3Rpb24gbXlDbGFzc3lDb25zdHJ1Y3Rvcih0YWtlcywgYSwgZmV3LCBhcmdzKSB7XG4gKiAgICAgdmFyIGV4cGVjdGVkQXJnVHlwZXMsIGNoZWNrZXI7XG4gKiAgICAgXG4gKiAgICAgZXhwZWN0ZWRBcmdUeXBlcyA9IHt9O1xuICogICAgIGV4cGVjdGVkQXJnVHlwZXMucmVxdWVzdFdpdGhNZXNzYWdlID0gXG4gKiAgICAgICAgICBbJ3N0cmluZycsICdzdHJpbmcnLCAnc3RyaW5nJywgJ2Z1bmN0aW9uJ107XG4gKiAgICAgZXhwZWN0ZWRBcmdUeXBlcy5yZXF1ZXN0TnVsbE1lc3NhZ2UgPSBcbiAqICAgICAgICAgIFsnc3RyaW5nJywgJ3N0cmluZycsICdvYmplY3QnLCAnZnVuY3Rpb24nXTtcbiAqICAgICBcbiAqICAgICBjaGVja2VyID0gbmV3IGF0cm9wYS5BcmdzSW5mbygpO1xuICogICAgIGNoZWNrZXIuc2V0RXhwZWN0ZWRBcmdUeXBlcyhleHBlY3RlZEFyZ1R5cGVzKTtcbiAqICAgICBcbiAqICAgICB0cnkge1xuICogICAgIFxuICogICAgICAgICAvLyBDaGVjayB0aGUgc3VwcGxpZWQgYXJndW1lbnRzIHBzZXVkbyBhcnJheSdzIGFyZ3VtZW50IHR5cGVzXG4gKiAgICAgICAgIC8vIGlmIHRoZSBwYXR0ZXJuIG9mIHR5cGVzIGluIGFyZ3VtZW50cyBtYXRjaGVzIG9uZSBvZiB0aGVcbiAqICAgICAgICAgLy8gcGF0dGVybnMgc2V0IG9uIGV4cGVjdGVkQXJnVHlwZXMgdGhlbiB0aGUgbWF0Y2hpbmcgcGF0dGVyblxuICogICAgICAgICAvLyB3aWxsIGJlIHJldHVybmVkLiBPdGhlcndpc2UsIGFuIGVycm9yIHdpbGwgYmUgdGhyb3duLlxuICogICAgICAgICBcbiAqICAgICAgICAgY2hlY2tlci5jaGVja0FyZ1R5cGVzKGFyZ3VtZW50cyk7XG4gKiAgICAgfSBjYXRjaCAoZSkge1xuICogICAgIFxuICogICAgICAgICAvLyBJbnZhbGlkIGFyZ3VtZW50IHR5cGVzIHN1cHBsaWVkLiBIYW5kbGVcbiAqICAgICAgICAgLy8gdGhlIGVycm9yIG9yIGJhaWwuXG4gKiAgICAgICAgIFxuICogICAgIH1cbiAqICAgICBcbiAqICAgICAvLyB0aGUgYXJndW1lbnRzIHN1cHBsaWVkIHdpbGwgYmUgb2YgdGhlIHByb3BlciB0eXBlXG4gKiAgICAgLy8geW91ciBmdW5jdGlvbiBjYW4gZ28gYWhlYWQgYW5kIGRvIHRoaW5ncyB3aXRoIHRoZW1cbiAqIH1cbiAqL1xuYXRyb3BhLkFyZ3NJbmZvID0gZnVuY3Rpb24gQXJnc0luZm8oKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuICAgIHZhciBleHBlY3RlZEFyZ1R5cGVzLFxuICAgIGNoZWNrQXJncyxcbiAgICB0aGF0O1xuICAgIC8qKlxuICAgICAqIEhvbGRzIHRoZSBwcm9wZXIgcmVmZXJlbmNlIHRvIDxjb2RlPnRoaXM8L2NvZGU+XG4gICAgICogZm9yIHByaXZhdGUgZnVuY3Rpb25zLlxuICAgICAqIEB0eXBlIFRoaXNcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBmaWVsZE9mIGF0cm9wYS5BcmdzSW5mby1cbiAgICAgKi9cbiAgICB0aGF0ID0gdGhpcztcbiAgICAvKipcbiAgICAgKiBIb2xkcyB0aGUgZXhwZWN0ZWQgYXJndW1lbnQgdHlwZXMgb2JqZWN0LlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHR5cGUgRXhwZWN0ZWQgQXJnIFR5cGVzXG4gICAgICogQGZpZWxkT2YgYXRyb3BhLkFyZ3NJbmZvLVxuICAgICAqL1xuICAgIGV4cGVjdGVkQXJnVHlwZXMgPSB7fTtcbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBleHBlY3RlZCBhcmd1bWVudCB0eXBlcy5cbiAgICAgKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAgICAgKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAgICAgKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gICAgICogQHZlcnNpb24gMjAxMjA5MDlcbiAgICAgKiBAbWV0aG9kT2YgYXRyb3BhLkFyZ3NJbmZvI1xuICAgICAqIEBwYXJhbSB7RXhwZWN0ZWQgQXJnIFR5cGVzfSB0eXBlc09iaiBBbiBvYmplY3QgY29udGFpbmluZyBpbmZvcm1hdGlvblxuICAgICAqICBhYm91dCB0aGUgdHlwZXMgb2YgYXJndW1lbnRzIHlvdSBleHBlY3QuIFNwZWNpZmljYWxseSwgdGhlIG9iamVjdCBzaG91bGRcbiAgICAgKiAgbG9vayBsaWtlIHRoZSBleGFtcGxlLlxuICAgICAqIEBleGFtcGxlXG4gICAgICogLy8gdHlwZXNPYmogaXMgZXhwZWN0ZWQgdG8gYmUgb2YgdGhlIGZvcm06XG4gICAgICogXG4gICAgICogdmFyIHR5cGVzT2JqID0ge1xuICAgICAqICAgICBcIm5hbWVkQXJndW1lbnRUeXBlc0FycmF5XCIgOiBbXCJzdHJpbmdcIiwgXCJmdW5jdGlvblwiLCBcIm51bWJlclwiXSxcbiAgICAgKiAgICAgXCJuYW1lZEFsdGVybmF0ZUFyZ3VtZW50VHlwZXNBcnJheVwiIDogW1wib2JqZWN0XCIsIFwiZnVuY3Rpb25cIiwgXCJudW1iZXJcIl1cbiAgICAgKiB9O1xuICAgICAqIFxuICAgICAqIC8vIFlvdSBtYXkgdXNlIGFzIG1hbnkgbmFtZWQgYXJyYXlzIGFzIHlvdSB3aXNoIGFuZCBjaGVja0FyZ1R5cGVzIHdpbGxcbiAgICAgKiAvLyB0ZXN0IGZvciBhIG1hdGNoIHRvIGF0IGxlYXN0IG9uZSBvZiB0aGUgcHJvdmlkZWQgbmFtZWQgYXJyYXlzLlxuICAgICAqIEB0aHJvd3Mge2F0cm9wYS5jdXN0b21FcnJvcnMuSW52YWxpZEFyZ3VtZW50VHlwZXNFcnJvcn0gVGhyb3dzIGFuIGVycm9yIGlmIHRoZVxuICAgICAqICB0eXBlc09iaiBjYW4gbm90IGJlIHVzZWQgdG8gc2V0IHRoZSBleHBlY3RlZCBhcmd1bWVudCB0eXBlcy5cbiAgICAgKi9cbiAgICB0aGlzLnNldEV4cGVjdGVkQXJnVHlwZXMgPSBmdW5jdGlvbiBzZXRFeHBlY3RlZEFyZ1R5cGVzKHR5cGVzT2JqKSB7XG4gICAgICAgIHZhciBlcnJvciwgbmFtZXM7XG4gICAgICAgIFxuICAgICAgICBlcnJvciA9IGZhbHNlO1xuICAgICAgICBcbiAgICAgICAgaWYoYXRyb3BhLmlucXVpcmUuaXNPYmplY3ROb3ROdWxsKHR5cGVzT2JqKSkge1xuICAgICAgICAgICAgbmFtZXMgPSBPYmplY3Qua2V5cyh0eXBlc09iaik7XG4gICAgICAgICAgICBpZiAobmFtZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGV4cGVjdGVkQXJnVHlwZXMgPSB0eXBlc09iajtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZXJyb3IgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZXJyb3IgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZihlcnJvcikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IGF0cm9wYS5jdXN0b21FcnJvcnMuSW52YWxpZEFyZ3VtZW50VHlwZXNFcnJvcihcbiAgICAgICAgICAgICAgICAndHlwZXNPYmogaXMgZXhwZWN0ZWQgdG8gYmUgb2YgdGhlIGZvcm06IHZhciB0eXBlc09iaiA9ICcgK1xuICAgICAgICAgICAgICAgICd7IFwibmFtZWRBcmd1bWVudFR5cGVzQXJyYXlcIiA6ICcgK1xuICAgICAgICAgICAgICAgICcgICAgW1wic3RyaW5nXCIsIFwiZnVuY3Rpb25cIiwgXCJudW1iZXJcIl0sICcgK1xuICAgICAgICAgICAgICAgICdcIm5hbWVkQWx0ZXJuYXRlQXJndW1lbnRUeXBlc0FycmF5XCIgOiAnICtcbiAgICAgICAgICAgICAgICAnICAgW1wib2JqZWN0XCIsIFwiZnVuY3Rpb25cIiwgXCJudW1iZXJcIl0gfTsgJyArXG4gICAgICAgICAgICAgICAgJ1lvdSBtYXkgdXNlIGFzIG1hbnkgbmFtZWQgYXJyYXlzIGFzIHlvdSB3aXNoIGFuZCcgK1xuICAgICAgICAgICAgICAgICdjaGVja0FyZ1R5cGVzIHdpbGwgdGVzdCBmb3IgYSBtYXRjaCB0byBhdCBsZWFzdCBvbmUgb2YgdGhlICcgK1xuICAgICAgICAgICAgICAgICdwcm92aWRlZCBuYW1lZCBhcnJheXMuJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgdHlwZXMgb2YgYXJndW1lbnRzLlxuICAgICAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICAgICAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICAgICAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAgICAgKiBAdmVyc2lvbiAyMDEyMDkwOVxuICAgICAqIEBtZXRob2RPZiBhdHJvcGEuQXJnc0luZm8jXG4gICAgICogQHBhcmFtIHthcmd1bWVudHN9IGFyZ3MgQW4gYXJndW1lbnRzIG9iamVjdCwgb3IgYW55dGhpbmcgeW91IHdhbnQgdG9cbiAgICAgKiBjaGVjayB0aGUgdHlwZSBvZi5cbiAgICAgKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYW4gYXJyYXkgb2YgdGhlIHR5cGVzIG9mIGFyZ3VtZW50cyBwYXNzZWQgaW4uXG4gICAgICovXG4gICAgdGhpcy5nZXRBcmdUeXBlcyA9IGZ1bmN0aW9uIGdldEFyZ1R5cGVzKGFyZ3MpIHtcbiAgICAgICAgdmFyIHgsXG4gICAgICAgIGFyZ1R5cGVzO1xuICAgICAgICBhcmdUeXBlcyA9IFtdO1xuICAgICAgICBmb3IgKHggaW4gYXJncykge1xuICAgICAgICAgICAgaWYgKGFyZ3MuaGFzT3duUHJvcGVydHkoeCkpIHtcbiAgICAgICAgICAgICAgICBhcmdUeXBlcy5wdXNoKHR5cGVvZihhcmdzW3hdKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFyZ1R5cGVzO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQ29tcGFyZXMgdGhlIGV4cGVjdGVkIGFyZ3VtZW50cyB0eXBlcyB0byB0aGVcbiAgICAgKiByZWNlaXZlZCBhcmd1bWVudHMgdHlwZXMuXG4gICAgICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gICAgICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gICAgICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICAgICAqIEB2ZXJzaW9uIDIwMTIwOTA5XG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAbWV0aG9kT2YgYXRyb3BhLkFyZ3NJbmZvLVxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGV4cGVjdGVkVHlwZXNBcnJheSBBbiBhcnJheSB0YWtlbiBmcm9tIHRoZSB1c2VyXG4gICAgICogY3JlYXRlZCBhcmd1bWVudCB0eXBlcyBvYmplY3QuXG4gICAgICogQHBhcmFtIHthcmd1bWVudHN9IGFyZ3MgYW4gYXJndW1lbnRzIG9iamVjdC5cbiAgICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIHRoZSBleHBlY3RlZCB0eXBlcyBtYXRjaCBmb3IgdHlwZVxuICAgICAqICBhbmQgYXJlIGluIHRoZSBzYW1lIG9yZGVyIGFzIHRoZSByZWNlaXZlZCB0eXBlcy5cbiAgICAgKiBAcmVxdWlyZXMgYXRyb3BhLmFycmF5cy5tYXRjaFxuICAgICAqL1xuICAgIGNoZWNrQXJncyA9IGZ1bmN0aW9uIGNoZWNrQXJncyhleHBlY3RlZFR5cGVzQXJyYXksIGFyZ3MpIHtcbiAgICAgICAgdmFyIHR5cGVzO1xuICAgICAgICB0eXBlcyA9IHt9O1xuICAgICAgICB0eXBlcy5leHBlY3RlZCA9IGV4cGVjdGVkVHlwZXNBcnJheTtcbiAgICAgICAgdHlwZXMucmVjZWl2ZWQgPSB0aGF0LmdldEFyZ1R5cGVzKGFyZ3MpO1xuICAgICAgICByZXR1cm4gYXRyb3BhLmFycmF5cy5tYXRjaCh0eXBlcy5leHBlY3RlZCwgdHlwZXMucmVjZWl2ZWQpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQ2hlY2tzIHRoZSBnaXZlbiBhcmd1bWVudHMgb2JqZWN0IGFnYWluc3QgdGhlIGV4cGVjdGVkXG4gICAgICogYXJndW1lbnRzIHR5cGVzLlxuICAgICAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICAgICAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICAgICAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAgICAgKiBAdmVyc2lvbiAyMDEyMDkwOVxuICAgICAqIEBtZXRob2RPZiBhdHJvcGEuQXJnc0luZm8jXG4gICAgICogQHBhcmFtIHthcmd1bWVudHN9IGFyZ3MgQW4gYXJndW1lbnRzIG9iamVjdFxuICAgICAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSB1c2VyIGFzc2lnbmVkIGtleSB3aGljaCBtYXRjaGVzIHRoZVxuICAgICAqIGFyZ3VtZW50cyBzdXBwbGllZCwgb3IgdGhyb3dzIGFuIGVycm9yLlxuICAgICAqIEB0aHJvd3Mge2F0cm9wYS5jdXN0b21FcnJvcnMuSW52YWxpZEFyZ3VtZW50VHlwZXNFcnJvcn0gVGhyb3dzIGFuIGVycm9yIGlmIG5vIG1hdGNoaW5nXG4gICAgICogIHBhdHRlcm4gb2YgYXJndW1lbnQgdHlwZXMgY2FuIGJlIGZvdW5kIGZvciA8Y29kZT5hcmdzPC9jb2RlPlxuICAgICAqIEBzZWUgYXRyb3BhLkFyZ3NJbmZvI3NldEV4cGVjdGVkQXJnVHlwZXNcbiAgICAgKi9cbiAgICB0aGlzLmNoZWNrQXJnVHlwZXMgPSBmdW5jdGlvbiBjaGVja0FyZ1R5cGVzKGFyZ3MpIHtcbiAgICAgICAgdmFyIGV4cGVjdGVkVHlwZXM7XG4gICAgICAgIGlmIChPYmplY3Qua2V5cyhleHBlY3RlZEFyZ1R5cGVzKS5sZW5ndGggPCAxKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgYXRyb3BhLmN1c3RvbUVycm9ycy5JbnZhbGlkQXJndW1lbnRUeXBlc0Vycm9yKFxuICAgICAgICAgICAgICAgICdFeHBlY3RlZCBhcmd1bWVudCB0eXBlcyBpcyBub3Qgc2V0LiBVc2UgJyArXG4gICAgICAgICAgICAgICAgJ3NldEV4cGVjdGVkQXJnVHlwZXModHlwZXNPYmopIHRvIHNldC4gdHlwZXNPYmogaXMgYW4gJyArXG4gICAgICAgICAgICAgICAgJ29iamVjdCB3aG9zZSBwcm9wZXJ0aWVzIGFyZSBhcnJheXMgb2Ygc3RyaW5ncyByZXByZXNlbnRpbmcgJyArXG4gICAgICAgICAgICAgICAgJ3RoZSB0eXBlb2YoYXJndW1lbnQpIGZvciBlYWNoIGFyZ3VtZW50LCBpbiB0aGUgZXhhY3Qgb3JkZXIgJyArXG4gICAgICAgICAgICAgICAgJ2luIHdoaWNoIHRoZXkgd2lsbCBiZSBnaXZlbiB0byB0aGUgZnVuY3Rpb24uIFVzaW5nIG11bHRpcGxlICcgK1xuICAgICAgICAgICAgICAgICdwcm9wZXJ0aWVzIGl0IGlzIHBvc3NpYmxlIHRvIGRlZmluZSBhbHRlcm5hdGl2ZSBhY2NlcHRhYmxlICcgK1xuICAgICAgICAgICAgICAgICdhcmd1bWVudCB0eXBlIHNldHMuIFVzZSBnZXRBcmdUeXBlcyhhcmd1bWVudHMpIGFzIGEgJyArXG4gICAgICAgICAgICAgICAgJ2NvbnZlbmllbnQgd2F5IG9mIGdldHRpbmcgdGhlIGFycmF5IHlvdSB3YW50IHRvIGhhcmQgY29kZSAnICtcbiAgICAgICAgICAgICAgICAnaW4gZm9yIHZhbGlkYXRpb24uIEV4YW1wbGU6IHZhciB0eXBlc09iaiA9ICcgK1xuICAgICAgICAgICAgICAgICd7IFwibWVzc2FnZUluY2x1ZGVkXCIgOiBbXCJzdHJpbmdcIiwgXCJmdW5jdGlvblwiLCBcIm51bWJlclwiXSwgJyArXG4gICAgICAgICAgICAgICAgJ1wibWVzc2FnZU5vdEluY2x1ZGVkXCIgOiBbXCJvYmplY3RcIiwgXCJmdW5jdGlvblwiLCBcIm51bWJlclwiXSB9OydcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChleHBlY3RlZFR5cGVzIGluIGV4cGVjdGVkQXJnVHlwZXMpIHtcbiAgICAgICAgICAgIGlmIChleHBlY3RlZEFyZ1R5cGVzLmhhc093blByb3BlcnR5KGV4cGVjdGVkVHlwZXMpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNoZWNrQXJncyhleHBlY3RlZEFyZ1R5cGVzW2V4cGVjdGVkVHlwZXNdLCBhcmdzKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXhwZWN0ZWRUeXBlcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgbmV3IGF0cm9wYS5jdXN0b21FcnJvcnMuSW52YWxpZEFyZ3VtZW50VHlwZXNFcnJvcihcbiAgICAgICAgICAgICdpbnZhbGlkIGFyZ3VtZW50IHR5cGUgQCBhdHJvcGEuQXJnc0luZm8uY2hlY2tBcmdUeXBlcycpO1xuICAgIH07XG59O1xuXG5cblxuXG53aGlsZShhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMubGVuZ3RoID4gMCkge1xuICAgIGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5wb3AoKSgpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBhdHJvcGE7XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vZG9jcy92c2RvYy9PcGVuTGF5ZXJzQWxsLmpzXCIvPlxudmFyIGF0cm9wYSA9IHJlcXVpcmUoJ2F0cm9wYS1oZWFkZXInKTtcbi8qanNsaW50XG4gICAgaW5kZW50OiA0LFxuICAgIG1heGVycjogNTAsXG4gICAgd2hpdGU6IHRydWUsXG4gICAgYnJvd3NlcjogdHJ1ZSxcbiAgICBkZXZlbDogdHJ1ZSxcbiAgICBwbHVzcGx1czogdHJ1ZSxcbiAgICByZWdleHA6IHRydWVcbiovXG4vKmdsb2JhbCBhdHJvcGEgKi9cbi8vIGVuZCBoZWFkZXJcblxuLyoqXG4gKiBQcm92aWRlcyByYW5kb20gc3RyaW5ncyBhbmQgbnVtYmVycy5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAdmVyc2lvbiAyMDEyMDkwOVxuICogQG5hbWVzcGFjZSBQcm92aWRlcyByYW5kb20gc3RyaW5ncyBhbmQgbnVtYmVycy5cbiAqL1xuYXRyb3BhLnJhbmRvbSA9IHt9O1xuLyoqXG4gKiBHaXZlcyB5b3UgYSByYW5kb20gc3RyaW5nIHdob3NlIGxlbmd0aCBhbmQgY2hhcmFjdGVycyB5b3Ugc3BlY2lmeS5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAdmVyc2lvbiAyMDEyMDkwOVxuICogQHBhcmFtIHtOdW1iZXJ9IHN0cmluZ0xlbmd0aCBUaGlzIGlzIHRoZSBsZW5ndGggb2YgdGhlIHN0cmluZy5cbiAqIEBwYXJhbSB7U3RyaW5nfSBjaGFyYWN0ZXJDbGFzcyBPcHRpb25hbC4gTWF5IGJlIG9uZSBvZjpcbiAqICBudW1lcmljLCBjYXBzLCBsb3dlciwgYWxwaGEsIGFscGhhbnVtZXJpYywgcHVuY3R1YXRpb24sIHZvd2VsLCBjb25zb25hbnRcbiAqICBUaGlzIGlzIHRoZSB0eXBlIG9mIGNoYXJhY3RlcnMgeW91IHdhbnQgcmV0dXJuZWQgdG8geW91LiBEZWZhdWx0cyB0b1xuICogIGFscGhhbnVtZXJpYy5cbiAqIEByZXR1cm4ge1N0cmluZ30gQSByYW5kb20gc3RyaW5nIG9mIHNwZWNpZmllZCBsZW5ndGggYW5kIGNvbXBvc2l0aW9uLlxuICovXG5hdHJvcGEucmFuZG9tLnN0cmluZyA9IGZ1bmN0aW9uIHJhbmRvbVN0cmluZyhzdHJpbmdMZW5ndGgsIGNoYXJhY3RlckNsYXNzKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuICAgIHZhciBudW1lcmljLFxuICAgIHZvd2VsLFxuICAgIGNvbnNvbmFudCxcbiAgICBsb3dlcixcbiAgICBjYXBzLFxuICAgIGFscGhhLFxuICAgIGFscGhhbnVtZXJpYyxcbiAgICBwdW5jdHVhdGlvbixcbiAgICBjaGFycyxcbiAgICBzdHJpbmdfbGVuZ3RoLFxuICAgIHJhbmRvbXN0cmluZyxcbiAgICBpLFxuICAgIGNoYXJhY3RlcjtcbiAgICBcbiAgICBudW1lcmljID0gJzAxMjM0NTY3ODknO1xuICAgIHZvd2VsID0gJ2FlaW91eSc7XG4gICAgY29uc29uYW50ID0gJ2JjZGZnaGprbG1ucHFyc3R2d3h6JztcbiAgICBsb3dlciA9IHZvd2VsICsgY29uc29uYW50O1xuICAgIGNhcHMgPSBsb3dlci50b1VwcGVyQ2FzZSgpO1xuICAgIGFscGhhID0gY2FwcyArIGxvd2VyO1xuICAgIGFscGhhbnVtZXJpYyA9IG51bWVyaWMgKyBjYXBzICsgbG93ZXI7XG4gICAgcHVuY3R1YXRpb24gPSAnLj8hJztcbiAgICByYW5kb21zdHJpbmcgPSAnJztcbiAgICBzd2l0Y2ggKGNoYXJhY3RlckNsYXNzKSB7XG4gICAgY2FzZSAnbnVtZXJpYyc6XG4gICAgICAgIGNoYXJzID0gbnVtZXJpYztcbiAgICAgICAgYnJlYWs7XG4gICAgY2FzZSAnY2Fwcyc6XG4gICAgICAgIGNoYXJzID0gY2FwcztcbiAgICAgICAgYnJlYWs7XG4gICAgY2FzZSAnbG93ZXInOlxuICAgICAgICBjaGFycyA9IGxvd2VyO1xuICAgICAgICBicmVhaztcbiAgICBjYXNlICdhbHBoYSc6XG4gICAgICAgIGNoYXJzID0gYWxwaGE7XG4gICAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2FscGhhbnVtZXJpYyc6XG4gICAgICAgIGNoYXJzID0gYWxwaGFudW1lcmljO1xuICAgICAgICBicmVhaztcbiAgICBjYXNlICdwdW5jdHVhdGlvbic6XG4gICAgICAgIGNoYXJzID0gcHVuY3R1YXRpb247XG4gICAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3Zvd2VsJzpcbiAgICAgICAgY2hhcnMgPSB2b3dlbDtcbiAgICAgICAgYnJlYWs7XG4gICAgY2FzZSAnY29uc29uYW50JzpcbiAgICAgICAgY2hhcnMgPSBjb25zb25hbnQ7XG4gICAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICAgIGNoYXJzID0gYWxwaGFudW1lcmljO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgaWYgKHN0cmluZ0xlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHN0cmluZ19sZW5ndGggPSA0O1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHN0cmluZ19sZW5ndGggPSBzdHJpbmdMZW5ndGg7XG4gICAgfVxuICAgIGZvciAoaSA9IDA7IGkgPCBzdHJpbmdfbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY2hhcmFjdGVyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogY2hhcnMubGVuZ3RoKTtcbiAgICAgICAgcmFuZG9tc3RyaW5nICs9IGNoYXJzW2NoYXJhY3Rlcl07XG4gICAgfVxuICAgIHJldHVybiByYW5kb21zdHJpbmc7XG59O1xuLyoqXG4gKiBHZW5lcmF0ZXMgYSByYW5kb20gbnVtYmVyIGJldHdlZW4gdGhlIHNwZWNpZmllZCBtaW4gYW5kIG1heCB2YWx1ZS5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAdmVyc2lvbiAyMDEyMDkwOVxuICogQHBhcmFtIHtOdW1iZXJ9IG1pbiBUaGUgbG93ZXN0IG51bWJlciB5b3Ugd2FudCByZXR1cm5lZFxuICogQHBhcmFtIHtOdW1iZXJ9IG1heCBUaGUgaGlnaGVzdCBudW1iZXIgeW91IHdhbnQgcmV0dXJuZWRcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IEEgcmFuZG9tIG51bWJlciB3aXRoaW4gdGhlIHNwZWNpZmllZCByYW5nZS5cbiAqL1xuYXRyb3BhLnJhbmRvbS5pbnRlZ2VyID0gZnVuY3Rpb24gcmFuZG9tSW50ZWdlcihtaW4sIG1heCkge1xuICAgICd1c2Ugc3RyaWN0JztcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpICsgbWluKTtcbn07XG4vKipcbiAqIEdldCBhIHJhbmRvbSBwcm9wZXJ0eSBuYW1lIGZyb20gdGhlIGdpdmVuIG9iamVjdC5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAdmVyc2lvbiAyMDEyMDkwOVxuICogQHBhcmFtIHtPYmplY3R9IG9iaiBUaGUgb2JqZWN0IHRvIHNlbGVjdCBhIHJhbmRvbVxuICogIHByb3BlcnR5IG5hbWUgZnJvbS5cbiAqIEByZXR1cm4ge1N0cmluZ30gQSByYW5kb20gcHJvcGVydHkgbmFtZSBmcm9tIHRoZVxuICogIGdpdmVuIG9iamVjdC5cbiAqL1xuYXRyb3BhLnJhbmRvbS5nZXRQcm9wZXJ0eU5hbWUgPSBmdW5jdGlvbiAob2JqKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgdmFyIGFycjtcbiAgICBhcnIgPSBPYmplY3Qua2V5cyhvYmopO1xuICAgIHJldHVybiBhcnJbYXRyb3BhLnJhbmRvbS5nZXRBcnJheUtleShhcnIpXTtcbn07XG4vKipcbiAqIEdldCBhIHJhbmRvbSBrZXkgZnJvbSB0aGUgZ2l2ZW4gYXJyYXkuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQHZlcnNpb24gMjAxMjA5MDlcbiAqIEBwYXJhbSB7QXJyYXl9IGFyciBUaGUgYXJyYXkgdG8gc2VsZWN0IGEgcmFuZG9tXG4gKiAga2V5IGZyb20uIFRoZSBrZXlzIG9mIHRoZSBhcnJheSBtdXN0IGJlIGNvbnRpZ3VvdXMuXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IEEgcmFuZG9tIGludGVnZXIgYmV0d2VlbiAwIGFuZFxuICogIDxjb2RlPmFyci5sZW5ndGg8L2NvZGU+XG4gKi9cbmF0cm9wYS5yYW5kb20uZ2V0QXJyYXlLZXkgPSBmdW5jdGlvbiAoYXJyKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGFyci5sZW5ndGgpO1xufTtcbi8qKlxuICogR2V0IGEgcmFuZG9tIHZhbHVlIGZyb20gdGhlIGdpdmVuIGFycmF5LlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAqIEB2ZXJzaW9uIDIwMTIwOTA5XG4gKiBAcGFyYW0ge0FycmF5fSBhcnIgVGhlIGFycmF5IHRvIHNlbGVjdCBhIHJhbmRvbVxuICogIHZhbHVlIGZyb20uIFRoZSBrZXlzIG9mIHRoZSBhcnJheSBtdXN0IGJlIGNvbnRpZ3VvdXMuXG4gKiBAcmV0dXJuIHtNaXhlZH0gQSByYW5kb20gdmFsdWUgZnJvbSB0aGUgZ2l2ZW4gYXJyYXkuXG4gKi9cbmF0cm9wYS5yYW5kb20uZ2V0QXJyYXlWYWx1ZSA9IGZ1bmN0aW9uIChhcnIpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICByZXR1cm4gYXJyW2F0cm9wYS5yYW5kb20uZ2V0QXJyYXlLZXkoYXJyKV07XG59O1xuLyoqXG4gKiBSZW1vdmUgYSByYW5kb20gZWxlbWVudCBmcm9tIHRoZSBnaXZlbiBhcnJheS5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAdmVyc2lvbiAyMDEyMDkwOVxuICogQHBhcmFtIHtBcnJheX0gYXJyIFRoZSBhcnJheSB0byByZW1vdmUgYSByYW5kb21cbiAqICBlbGVtZW50IGZyb20uIFRoZSBrZXlzIG9mIHRoZSBhcnJheSBtdXN0IGJlIGNvbnRpZ3VvdXMuXG4gKiBAcmV0dXJuIHtNaXhlZH0gQSByYW5kb20gdmFsdWUgZnJvbSB0aGUgZ2l2ZW4gYXJyYXkuXG4gKi9cbmF0cm9wYS5yYW5kb20ucHVsbEFycmF5RWxlbWVudCA9IGZ1bmN0aW9uIChhcnIpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICB2YXIgayxcbiAgICBkO1xuICAgIGsgPSBhdHJvcGEucmFuZG9tLmdldEFycmF5S2V5KGFycik7XG4gICAgZCA9IGFycltrXTtcbiAgICBhcnIuc3BsaWNlKGssIDEpO1xuICAgIHJldHVybiBkO1xufTtcbi8qKlxuICogUmVtb3ZlIGEgcmFuZG9tIHByb3BlcnR5IGZyb20gdGhlIGdpdmVuIG9iamVjdC5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAdmVyc2lvbiAyMDEyMDkwOVxuICogQHBhcmFtIHtPYmplY3R9IG9iaiBUaGUgb2JqZWN0IHRvIHJlbW92ZSBhIHJhbmRvbVxuICogIHByb3BlcnR5IGZyb20uXG4gKiBAcmV0dXJuIHtNaXhlZH0gQSByYW5kb20gdmFsdWUgZnJvbSB0aGUgZ2l2ZW4gb2JqZWN0LlxuICovXG5hdHJvcGEucmFuZG9tLnB1bGxQcm9wZXJ0eSA9IGZ1bmN0aW9uIChvYmopIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICB2YXIgcE5hbWUsXG4gICAgb2JqRGF0YTtcbiAgICBwTmFtZSA9IGF0cm9wYS5yYW5kb20uZ2V0UHJvcGVydHlOYW1lKG9iaik7XG4gICAgb2JqRGF0YSA9IG9ialtwTmFtZV07XG4gICAgZGVsZXRlIG9ialtwTmFtZV07XG4gICAgcmV0dXJuIG9iakRhdGE7XG59O1xuXG5cblxuXG53aGlsZShhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMubGVuZ3RoID4gMCkge1xuICAgIGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5wb3AoKSgpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBhdHJvcGE7XG4iLCJhcmd1bWVudHNbNF1bNV1bMF0uYXBwbHkoZXhwb3J0cyxhcmd1bWVudHMpIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2RvY3MvdnNkb2MvT3BlbkxheWVyc0FsbC5qc1wiLz5cbnZhciBhdHJvcGEgPSByZXF1aXJlKCdhdHJvcGEtaGVhZGVyJyk7XG4vKmpzbGludFxuICAgIGluZGVudDogNCxcbiAgICBtYXhlcnI6IDUwLFxuICAgIHdoaXRlOiB0cnVlLFxuICAgIGJyb3dzZXI6IHRydWUsXG4gICAgZGV2ZWw6IHRydWUsXG4gICAgcGx1c3BsdXM6IHRydWUsXG4gICAgcmVnZXhwOiB0cnVlXG4qL1xuLypnbG9iYWwgYXRyb3BhICovXG4vLyBlbmQgaGVhZGVyXG5cbi8qKlxuICogQ29udGFpbmVyIGZvciByZWdleCBmdW5jdGlvbnMuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQHZlcnNpb24gMjAxMjA5MDlcbiAqIEBuYW1lc3BhY2UgQ29udGFpbmVyIGZvciByZWdleCBmdW5jdGlvbnMuXG4gKi9cbmF0cm9wYS5yZWdleCA9IHt9O1xuLyoqXG4gKiBSZWdleCBwYXR0ZXJuc1xuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAqIEBuYW1lc3BhY2UgUmVnZXggcGF0dGVybnMuXG4gKi9cbmF0cm9wYS5yZWdleC5wYXR0ZXJucyA9IHtcbiAgICAvKipcbiAgICAgKiBmaW5kcyByZXBlYXRlZCB3b3JkcyBhbmQgcGhyYXNlc1xuICAgICAqIEB0eXBlIFJlZ0V4cFxuICAgICAqL1xuICAgIHJlcGVhdGVkV29yZHMgOiAvKFxcYi57Myx9XFxiKVxccyooXFwxKS9nLFxuICAgIC8qKlxuICAgICAqIGZpbmRzIHBhcmFncmFwaCBicmVha3NcbiAgICAgKiBAdHlwZSBSZWdFeHBcbiAgICAgKi9cbiAgICBwYXJhZ3JhcGhCcmVha3MgOiAvKFxcclxcblxcclxcbnxcXG5cXG58XFxyXFxyKS9nLFxuICAgIC8qKlxuICAgICAqIGZpbmRzIGxpbmUgYnJlYWtzXG4gICAgICogQHR5cGUgUmVnRXhwXG4gICAgICovXG4gICAgbGluZUJyZWFrcyA6IC8oXFxyXFxufFxccnxcXG4pL2dcbn07XG4vKipcbiAqIEFwcGVuZHMgY29tbW9uIHByZWZpeCwgc3VmZml4LCBhbmQgd29yZCBib3VuZGFyeSByZWdleCBzdHJpbmdzIHRvXG4gKiB0aGUgc3VwcGxpZWQgd29yZC5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAdmVyc2lvbiAyMDEzMDExMFxuICogQHBhcmFtIHtTdHJpbmd9IHdvcmQgVGhlIHdvcmQgdG8gYXBwZW5kIHByZWZpeCBhbmQgc3VmZml4IHRvXG4gKiBAcGFyYW0ge0ludGVnZXJ9IHRocmVzaG9sZCBUaGUgd29yZC5sZW5ndGggYXQgd2hpY2ggaXQgZG9lcyBub3RcbiAqIG1ha2Ugc2Vuc2UgdG8gYXBwZW5kIHByZWZpeCBhbmQgc3VmZml4LiBEZWZhdWx0cyB0byAzLlxuICogQHJldHVybnMge1N0cmluZ30gUmV0dXJucyB0aGUgc3VwcGxpZWQgd29yZCB3aXRoIHByZWZpeCwgc3VmZml4LFxuICogYW5kIHdvcmQgYm91bmRhcmllcyBhdHRhY2hlZC4gSWYgdGhlIHdvcmQubGVuZ3RoIHdhcyBub3QgZ3JlYXRlclxuICogdGhhbiB0aGUgdGhyZXNob2xkLCBvbmx5IHdvcmQgYm91bmRhcmllcyBhcmUgYXR0YWNoZWQuIFRoZSBzdHJpbmdcbiAqIHJlcHJlc2VudHMgYSBSZWdFeCB3aGljaCBzaG91bGQgcGljayBvdXQgbW9zdCBmb3JtcyBvZiByZWd1bGFyXG4gKiB3b3Jkcy5cbiAqL1xuYXRyb3BhLnJlZ2V4LmFwcGVuZFByZWZpeGVzQW5kU3VmZml4ZXMgPSBmdW5jdGlvbiAod29yZCwgdGhyZXNob2xkKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgdmFyIHByZWZpeGVzLFxuICAgIHN1ZmZpeGVzO1xuICAgIHByZWZpeGVzID0gJyhwcmV8dW58cmUpPyc7XG4gICAgc3VmZml4ZXMgPSAnKGlmaWNhdGlvbnwnICtcbiAgICAgICAgICAgICAgICAndGlvbmFsbHl8JyArXG4gICAgICAgICAgICAgICAgJ2ljYXRpb258JyArXG4gICAgICAgICAgICAgICAgJ2lmaWVkfGlzdGljfGluZXNzfCcgK1xuICAgICAgICAgICAgICAgICdmYXJlfHRpb258YW5jZXxlbmNlfGxlc3N8YWxseXxhYmxlfG5lc3N8aXplZHxpc2VkfCcgK1xuICAgICAgICAgICAgICAgICdvdXN8aWZ5fGluZ3xpdHl8ZnVsfGFudHxhdGV8ZXN0fGlzbXxpem18aXN0fCcgK1xuICAgICAgICAgICAgICAgICdpY3xhbHxlZHxlcnxldHxseXxyc3xpbnwnICtcbiAgICAgICAgICAgICAgICAneXxzfHJ8ZCk/JztcbiAgICBcbiAgICB0aHJlc2hvbGQgPSB0aHJlc2hvbGQgPT09IHVuZGVmaW5lZCA/IDMgOiB0aHJlc2hvbGQ7XG4gICAgXG4gICAgaWYgKHdvcmQubGVuZ3RoID4gdGhyZXNob2xkKSB7XG4gICAgICAgIHdvcmQgPSAnXFxcXGInICsgcHJlZml4ZXMgKyB3b3JkICsgc3VmZml4ZXMgKyAnXFxcXGInO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHdvcmQgPSAnXFxcXGIoKScgKyB3b3JkICsgJygpXFxcXGInO1xuICAgIH1cbiAgICByZXR1cm4gd29yZDtcbn07XG5cblxuXG5cbndoaWxlKGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5sZW5ndGggPiAwKSB7XG4gICAgYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLnBvcCgpKCk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGF0cm9wYTtcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9kb2NzL3ZzZG9jL09wZW5MYXllcnNBbGwuanNcIi8+XG52YXIgYXRyb3BhID0gcmVxdWlyZSgnYXRyb3BhLWhlYWRlcicpO1xuYXRyb3BhLnJlZ2V4ID0gcmVxdWlyZSgnYXRyb3BhLXJlZ2V4JykucmVnZXg7XG5hdHJvcGEuYXJyYXlzID0gcmVxdWlyZSgnYXRyb3BhLWFycmF5cycpLmFycmF5cztcbi8qanNsaW50XG4gICAgaW5kZW50OiA0LFxuICAgIG1heGVycjogNTAsXG4gICAgd2hpdGU6IHRydWUsXG4gICAgYnJvd3NlcjogdHJ1ZSxcbiAgICBkZXZlbDogdHJ1ZSxcbiAgICBwbHVzcGx1czogdHJ1ZSxcbiAgICByZWdleHA6IHRydWVcbiovXG4vKmdsb2JhbCBhdHJvcGEgKi9cbi8vIGVuZCBoZWFkZXJcblxuLyoqXG4gKiBBIGZldyB1dGlsaXRpZXMgZm9yIG1hbmlwdWxhdGluZyBzdHJpbmdzLlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAqIEBuYW1lc3BhY2UgQSBmZXcgdXRpbGl0aWVzIGZvciBtYW5pcHVsYXRpbmcgc3RyaW5ncy5cbiAqIEByZXF1aXJlcyBhdHJvcGEucmVnZXgucGF0dGVybnNcbiAqL1xuYXRyb3BhLnN0cmluZyA9IHt9O1xuLyoqXG4gKiBSZXBsYWNlcyByZXBlYXRlZCB3b3JkcyBhbmQgcGhyYXNlcyB3aXRoIGEgc2luZ2xlIHdvcmQgb3IgcGhyYXNlLlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAqIEB2ZXJzaW9uIDIwMTMwNzAxXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nIFRoZSBzdHJpbmcgdG8gcmVtb3ZlIHJlcGVhdGVkIHdvcmRzIGZyb20uXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBSZXR1cm5zIHRoZSBnaXZlbiBzdHJpbmcgd2l0aCByZXBlYXRlZCB3b3JkcyBhbmRcbiAqICBwaHJhc2VzIHJlbW92ZWQuXG4gKi9cbmF0cm9wYS5zdHJpbmcucmVtb3ZlUmVwZWF0ZWRXb3JkID0gZnVuY3Rpb24gcmVtb3ZlUmVwZWF0ZWRXb3JkIChzdHJpbmcpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoYXRyb3BhLnJlZ2V4LnBhdHRlcm5zLnJlcGVhdGVkV29yZHMsICckMScpO1xufTtcbi8qKlxuICogQ3JlYXRlcyBwYXJhZ3JhcGggYnJlYWtzIGF0IGV2ZXJ5IG9jY3VycmVuY2Ugb2YgdHdvIGNvbnNlY3V0aXZlIGxpbmUgYnJlYWtzLlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAqIEB2ZXJzaW9uIDIwMTMwNzAxXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nIFRoZSBzdHJpbmcgdG8gaW5zZXJ0IHBhcmFncmFwaCB0YWdzIGludG8uXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBSZXR1cm5zIHRoZSBnaXZlbiBzdHJpbmcgd2l0aCBwYXJhZ3JhcGggYnJlYWtzIGluc2VydGVkLlxuICovXG5hdHJvcGEuc3RyaW5nLmxpbmVCcmVha3NUb1BhcmFncmFwaFRhZ3MgPSBmdW5jdGlvbiBsaW5lQnJlYWtzVG9QYXJhZ3JhcGhUYWdzIChzdHJpbmcpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICB2YXIgb3V0ID0gc3RyaW5nLnJlcGxhY2UoYXRyb3BhLnJlZ2V4LnBhdHRlcm5zLnBhcmFncmFwaEJyZWFrcywgJzwvcD48cD4nKTtcbiAgICBvdXQgPSAnPHA+JyArIG91dC50cmltKCkgKyAnPC9wPic7XG4gICAgb3V0ID0gb3V0LnJlcGxhY2UoL1xccys8XFwvKHB8YnIpPi9nLCAnPC8kMT4nKTtcbiAgICByZXR1cm4gb3V0O1xufTtcbi8qKlxuICogQ3JlYXRlcyBicmVhayB0YWdzIGF0IGV2ZXJ5IGxpbmUgYnJlYWsuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQHZlcnNpb24gMjAxMzA3MDFcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmcgVGhlIHN0cmluZyB0byBpbnNlcnQgYnJlYWsgdGFncyBpbnRvLlxuICogQHJldHVybnMge1N0cmluZ30gUmV0dXJucyB0aGUgZ2l2ZW4gc3RyaW5nIHdpdGggYnJlYWsgdGFncyBpbnNlcnRlZC5cbiAqL1xuYXRyb3BhLnN0cmluZy5saW5lQnJlYWtzVG9CcmVha1RhZ3MgPSBmdW5jdGlvbiBsaW5lQnJlYWtzVG9CcmVha1RhZ3MgKHN0cmluZykge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIHJldHVybiBzdHJpbmcucmVwbGFjZShhdHJvcGEucmVnZXgucGF0dGVybnMubGluZUJyZWFrcywgJzxicj4nKTtcbn07XG4vKipcbiAqIE5vcm1hbGl6ZXMgbGluZSBicmVha3MgdG8gYFxcbmAuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQHZlcnNpb24gMjAxMzA3MDFcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmcgVGhlIHN0cmluZyB0byBub3JtYWxpemUuXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBSZXR1cm5zIHRoZSBnaXZlbiBzdHJpbmcgd2l0aCBub3JtYWxpemVkIGxpbmUgYnJlYWtzLlxuICovXG5hdHJvcGEuc3RyaW5nLm5vcm1hbGl6ZUVvbCA9IGZ1bmN0aW9uIG5vcm1hbGl6ZUVvbCAoc3RyaW5nKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKGF0cm9wYS5yZWdleC5wYXR0ZXJucy5saW5lQnJlYWtzLCAnXFxuJyk7XG59O1xuLyoqXG4gKiBDb252ZXJ0cyB0aGUgZmlyc3QgY2hhcmFjdGVyIG9mIGEgZ2l2ZW4gc3RyaW5nIHRvXG4gKiB1cHBlcmNhc2UuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQHZlcnNpb24gMjAxMjA5MDlcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmcgVGhlIHN0cmluZyBmb3Igd2hpY2ggeW91IHdhbnQgdGhlXG4gKiBmaXJzdCBsZXR0ZXIgdG8gYmUgaW4gdXBwZXIgY2FzZS5cbiAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBnaXZlbiBzdHJpbmcgd2l0aCBpdCdzIGZpcnN0IGxldHRlciBjYXBpdGFsaXplZC5cbiAqL1xuYXRyb3BhLnN0cmluZy51Y0ZpcnN0ID0gZnVuY3Rpb24gdWNGaXJzdChzdHJpbmcpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICBzdHJpbmcgPSBzdHJpbmcuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHJpbmcuc2xpY2UoMSk7XG4gICAgcmV0dXJuIHN0cmluZztcbn07XG4vKipcbiAqIENvbnZlcnRzIHRoZSBnaXZlbiBzdHJpbmcgdG8gY2FtZWwgY2FzZS5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAdmVyc2lvbiAyMDEzMDgyM1xuICogQHBhcmFtIHtTdHJpbmd9IHN0cmluZyBUaGUgc3RyaW5nIHRvIGNhbWVsaXplLlxuICogQHJldHVybnMge1N0cmluZ30gVGhlIGNhbWVsaXplZCBzdHJpbmcuXG4gKiBAZXhhbXBsZVxuICogIGF0cm9wYS5zdHJpbmcuY2FtZWxpemUoJ2dldCBpdCB0b2dldGhlcicpO1xuICogIC8vIHJldHVybnMgXCJnZXRJdFRvZ2V0aGVyXCJcbiAqL1xuYXRyb3BhLnN0cmluZy5jYW1lbGl6ZSA9IGZ1bmN0aW9uIGNhbWVsaXplIChzdHIpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICB2YXIgYXJyLCBvdXQ7XG4gICAgYXJyID0gc3RyLnNwbGl0KCcgJyk7XG4gICAgb3V0ID0gYXJyLnNoaWZ0KCk7XG4gICAgYXJyID0gYXJyLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICByZXR1cm4gYXRyb3BhLnN0cmluZy51Y0ZpcnN0KGl0ZW0pO1xuICAgIH0pO1xuICAgIG91dCArPSBhcnIuam9pbignJyk7XG4gICAgcmV0dXJuIG91dDtcbn07XG4vKipcbiAqIENvdW50cyB3b3Jkcy5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAdmVyc2lvbiAyMDEzMDMxM1xuICogQHBhcmFtIHtTdHJpbmd9IHNvbWVUZXh0IFBsYWluIHRleHQuXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IFJldHVybnMgdGhlIGNvdW50IG9mIHdvcmRzIGluIHNvbWVUZXh0LlxuICovXG5hdHJvcGEuc3RyaW5nLmNvdW50V29yZHMgPSBmdW5jdGlvbiBjb3VudFdvcmRzKHNvbWVUZXh0KSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgdmFyIHdvcmRDb3VudCwgcmUsIGxlbiA9IDA7XG4gICAgaWYoc29tZVRleHQgIT09IHVuZGVmaW5lZCAmJiBzb21lVGV4dCAhPT0gbnVsbCkge1xuICAgICAgICBzb21lVGV4dCA9IHNvbWVUZXh0LnRyaW0oKTtcbiAgICAgICAgaWYoc29tZVRleHQgIT09ICcnKSB7XG4gICAgICAgICAgICB3b3JkQ291bnQgPSAwO1xuICAgICAgICAgICAgcmUgPSAvXFxzKy9naTtcbiAgICAgICAgICAgIHdvcmRDb3VudCA9IHNvbWVUZXh0LnNwbGl0KHJlKTtcbiAgICAgICAgICAgIGxlbiA9IHdvcmRDb3VudC5sZW5ndGg7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGxlbjtcbn07XG4vKipcbiAqIENvbnZlcnRzIGVuZCBvZiBsaW5lIG1hcmtlcnMgaW50byB3aGF0ZXZlciB5b3Ugd2FudC4gXG4gKiBBdXRvbWF0aWNhbGx5IGRldGVjdHMgYW55IG9mIFxcclxcbiwgXFxuLCBvciBcXHIgYW5kIFxuICogcmVwbGFjZXMgaXQgd2l0aCB0aGUgdXNlciBzcGVjaWZpZWQgRU9MIG1hcmtlci5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAcGFyYW0ge1N0cmluZ30gdGV4dCBUaGUgdGV4dCB5b3Ugd2FudCBwcm9jZXNzZWQuXG4gKiBAcGFyYW0ge1N0cmluZ30gbmV3RU9MIFRoZSByZXBsYWNlbWVudCBmb3IgdGhlIGN1cnJlbnQgRU9MIG1hcmtzLlxuICogQHJldHVybnMge1N0cmluZ30gUmV0dXJucyB0aGUgcHJvY2Vzc2VkIHRleHQuXG4gKi9cbmF0cm9wYS5zdHJpbmcuY29udmVydEVvbCA9IGZ1bmN0aW9uIGNvbnZlcnRFT0wodGV4dCwgbmV3RU9MKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuICAgIHJldHVybiB0ZXh0LnJlcGxhY2UoYXRyb3BhLnJlZ2V4LnBhdHRlcm5zLmxpbmVCcmVha3MsIG5ld0VPTCk7XG59O1xuXG4vKipcbiAqIFJlbW92ZXMgYSBxdWFudGl0eSBvZiBsZWFkaW5nIHNwYWNlcyBzcGVjaWZpZWQgYnkgb2Zmc2V0LlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAqIEBwYXJhbSB7U3RyaW5nfSB0ZXh0IFRoZSB0ZXh0IHRvIHByb2Nlc3MuXG4gKiBAcGFyYW0ge051bWJlcn0gb2Zmc2V0IFRoZSBhbW91bnQgb2Ygc3BhY2VzIHlvdSB3YW50IHJlbW92ZWQgXG4gKiBmcm9tIHRoZSBiZWdpbm5pbmcgb2YgdGhlIHRleHQuXG4gKiBAcmV0dXJucyBSZXR1cm5zIHRoZSBwcm9jZXNzZWQgdGV4dC5cbiAqL1xuYXRyb3BhLnN0cmluZy5vZmZzZXRXaGl0ZVNwYWNlID0gZnVuY3Rpb24gb2Zmc2V0V2hpdGVTcGFjZSh0ZXh0LCBvZmZzZXQpIHtcbiAgICAndXNlIHN0cmljdCc7XG4gICAgdmFyIHJlZ3g7XG4gICAgcmVneCA9IG5ldyBSZWdFeHAoJ14geycgKyBvZmZzZXQgKyAnfScpO1xuICAgIHRleHQgPSB0ZXh0LnJlcGxhY2UocmVneCwgJycpO1xuICAgIHJldHVybiB0ZXh0O1xufTtcblxuLyoqXG4gKiBDb252ZXJ0cyBhbGwgdGFicyBpbiBsZWFkaW5nIHdoaXRlc3BhY2UgaW50byBmb3VyIHNwYWNlcy5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAcGFyYW0ge1N0cmluZ30gdGV4dCBUaGUgdGV4dCB0byBwcm9jZXNzXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBSZXR1cm5zIHRoZSBwcm9jZXNzZWQgdGV4dC5cbiAqL1xuYXRyb3BhLnN0cmluZy5ub3JtYWxpemVXaGl0ZVNwYWNlUHJlZml4ID0gZnVuY3Rpb24gbm9ybWFsaXplV2hpdGVTcGFjZVByZWZpeChcbiAgICB0ZXh0XG4pIHtcbiAgICAndXNlIHN0cmljdCc7XG4gICAgdmFyIHByZWZpeCA9IHRleHQubWF0Y2goL15cXHMqLyk7XG4gICAgaWYocHJlZml4KSB7XG4gICAgICAgIHByZWZpeCA9IHByZWZpeFswXTtcbiAgICAgICAgcHJlZml4ID0gcHJlZml4LnJlcGxhY2UoL1xcdC9nLCAnICAgICcpO1xuICAgICAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC9eXFxzKi8sIHByZWZpeCk7XG4gICAgfVxuICAgIHJldHVybiB0ZXh0O1xufTtcblxuLyoqXG4gKiBDb252ZXJ0cyBhbGwgdGFicyBpbnRvIGZvdXIgc3BhY2VzLlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAqIEBwYXJhbSB7U3RyaW5nfSB0ZXh0IFRoZSB0ZXh0IHRvIHByb2Nlc3NcbiAqIEByZXR1cm5zIHtTdHJpbmd9IFJldHVybnMgdGhlIHByb2Nlc3NlZCB0ZXh0LlxuICovXG5hdHJvcGEuc3RyaW5nLm5vcm1hbGl6ZVdoaXRlU3BhY2UgPSBmdW5jdGlvbiBub3JtYWxpemVXaGl0ZVNwYWNlKHRleHQpIHtcbiAgICAndXNlIHN0cmljdCc7XG4gICAgdGV4dCA9IHRleHQucmVwbGFjZSgvXFx0L2csICcgICAgJyk7XG4gICAgcmV0dXJuIHRleHQ7XG59O1xuXG4vKipcbiAqIENvdW50cyB0aGUgbnVtYmVyIG9mIGxlYWRpbmcgc3BhY2Ugb3IgdGFiIGNoYXJhY3RlcnMgYnV0IG5vdCBib3RoLlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAqIEBwYXJhbSB7U3RyaW5nfSB0ZXh0IFRoZSB0ZXh0IHRvIGFuYWx5emUuXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBSZXR1cm5zIHRoZSBxdWFudGl0eSBvZiBsZWFkaW5nIHNwYWNlcyBvciB0YWJzLlxuICovXG5hdHJvcGEuc3RyaW5nLmdldE9mZnNldCA9IGZ1bmN0aW9uIGdldE9mZnNldCh0ZXh0KSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuICAgIHZhciBvZmZzZXQgPSAwLFxuICAgICAgICBsZWFkaW5nQ2hhciA9IHRleHQuY2hhckF0KDApO1xuICAgICAgICBcbiAgICBpZiggbGVhZGluZ0NoYXIgPT09ICcgJyB8fCBsZWFkaW5nQ2hhciA9PT0gJ1xcdCcpIHtcbiAgICAgICAgd2hpbGUodGV4dC5jaGFyQXQob2Zmc2V0KSA9PT0gbGVhZGluZ0NoYXIgJiYgb2Zmc2V0IDwgdGV4dC5sZW5ndGgpIHtcbiAgICAgICAgICAgIG9mZnNldCsrO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvZmZzZXQ7XG59O1xuLyoqXG4gKiBCcmVha3MgYSBzdHJpbmcgaW50byBhbiBhcnJheSBvZiB3b3Jkcy5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAdmVyc2lvbiAyMDEzMDExOFxuICogQHBhcmFtIHtTdHJpbmd9IHRleHQgVGhlIHRleHQgdG8gYW5hbHl6ZS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBhbiBhcnJheSBvZiB0aGUgd29yZHMgaW5cbiAqICB0aGUgZ2l2ZW4gdGV4dC5cbiAqIEByZXF1aXJlcyBhdHJvcGEuYXJyYXlzLnJlbW92ZUVtcHR5RWxlbWVudHNcbiAqL1xuYXRyb3BhLnN0cmluZy5nZXRXb3JkcyA9IGZ1bmN0aW9uICh0ZXh0KSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgdmFyIG91dCA9IFtdO1xuICAgIGZ1bmN0aW9uIGludmFsaWRDaGFycyhlbGVtZW50KSB7XG4gICAgICAgIHZhciBtYXRjaGVkID0gL15bXFwtJ+KAmWBdKyQvLnRlc3QoZWxlbWVudCk7XG4gICAgICAgIC8vIGludmVydCB0aGUgcmVzdWx0IG9mIHRlc3QuIHRocm93IG91dCBlbGVtZW50cyB0aGF0IG1hdGNoLlxuICAgICAgICByZXR1cm4gIW1hdGNoZWQ7XG4gICAgfVxuICAgIG91dCA9IGF0cm9wYS5hcnJheXMucmVtb3ZlRW1wdHlFbGVtZW50cyhcbiAgICAgICAgdGV4dC5zcGxpdCgvW15BLVphLXpcXC0n4oCZYF0rL2dpKVxuICAgICk7XG4gICAgb3V0ID0gb3V0LmZpbHRlcihpbnZhbGlkQ2hhcnMpO1xuICAgIHJldHVybiBvdXQ7XG59O1xuLyoqXG4gKiBFc2NhcGVzIDxjb2RlPkNEQVRBPC9jb2RlPiBzZWN0aW9ucyBpbiB0ZXh0XG4gKiAgc28gdGhhdCB0aGUgdGV4dCBtYXkgYmUgZW1iZWRkZWQgaW50byBhIFxuICogIDxjb2RlPkNEQVRBPC9jb2RlPiBzZWN0aW9uLiBUaGlzIHNob3VsZCBiZSBydW5cbiAqICBvbiBhbnkgdGV4dCB3aGljaCBtYXkgY29udGFpbiB0aGUgc3RyaW5nIFxuICogIDxjb2RlPl1dPjwvY29kZT4gc2luY2Ugc2FpZCBzdHJpbmcgd2lsbCBlZmZlY3RpdmVseVxuICogIGVuZCB0aGUgPGNvZGU+Q0RBVEE8L2NvZGU+IHNlY3Rpb24gcHJlbWF0dXJlbHkuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQHZlcnNpb24gMjAxMzAxMThcbiAqIEBwYXJhbSB7U3RyaW5nfSB0ZXh0IFRoZSB0ZXh0IGNvbnRhaW5pbmcgXG4gKiAgPGNvZGU+Q0RBVEE8L2NvZGU+IHNlY3Rpb25zIHRvIGVzY2FwZS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBhIHN0cmluZyB3aXRoIGVzY2FwZWRcbiAqICA8Y29kZT5DREFUQTwvY29kZT4gc2VjdGlvbnMuXG4gKiBAc2VlIDxhIGhyZWY9XCJodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0NEQVRBI05lc3RpbmdcIj5cbiAqICBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0NEQVRBI05lc3Rpbmc8L2E+XG4gKiBAc2VlIDxhIGhyZWY9XCJodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD05ODE2OFwiPlxuICogIGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTk4MTY4PC9hPlxuICovXG5hdHJvcGEuc3RyaW5nLmVzY2FwZUNkYXRhID0gZnVuY3Rpb24gZXNjYXBlQ2RhdGEodGV4dCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIHJldHVybiBTdHJpbmcodGV4dCkucmVwbGFjZSgvXFxdXFxdPi9nLCAnXV1dXT48IVtDREFUQVs+Jyk7XG59O1xuXG5cblxuXG53aGlsZShhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMubGVuZ3RoID4gMCkge1xuICAgIGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5wb3AoKSgpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBhdHJvcGE7XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vZG9jcy92c2RvYy9PcGVuTGF5ZXJzQWxsLmpzXCIvPlxudmFyIGF0cm9wYSA9IHJlcXVpcmUoJ2F0cm9wYS1oZWFkZXInKTtcbmF0cm9wYS5yYW5kb20gPSByZXF1aXJlKCdhdHJvcGEtcmFuZG9tJykucmFuZG9tO1xuYXRyb3BhLnN0cmluZyA9IHJlcXVpcmUoJ2F0cm9wYS1zdHJpbmcnKS5zdHJpbmc7XG4vKmpzbGludFxuICAgIGluZGVudDogNCxcbiAgICBtYXhlcnI6IDUwLFxuICAgIHdoaXRlOiB0cnVlLFxuICAgIGJyb3dzZXI6IHRydWUsXG4gICAgZGV2ZWw6IHRydWUsXG4gICAgcGx1c3BsdXM6IHRydWUsXG4gICAgcmVnZXhwOiB0cnVlXG4qL1xuLypnbG9iYWwgYXRyb3BhICovXG4vLyBlbmQgaGVhZGVyXG5cbmF0cm9wYS5yZXF1aXJlcyhcbiAgICAnQmFiYmxlcicsXG4gICAgZnVuY3Rpb24gKCkge1xuICAgICAgICBcInVzZSBzdHJpY3RcIjtcbiAgICAgICAgdmFyIHN1cHBvcnRlZCA9IHRydWU7XG4gICAgICAgIFxuICAgICAgICBbXG4gICAgICAgICAgICBhdHJvcGEucmFuZG9tLmludGVnZXIsXG4gICAgICAgICAgICBhdHJvcGEuc3RyaW5nLnVjRmlyc3QsXG4gICAgICAgICAgICBhdHJvcGEucmFuZG9tLnN0cmluZ1xuICAgICAgICBdLmZvckVhY2goZnVuY3Rpb24gKHByZXJlcXVpc2l0ZSkge1xuICAgICAgICAgICAgaWYocHJlcmVxdWlzaXRlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBzdXBwb3J0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBzdXBwb3J0ZWQ7XG4gICAgfVxuKTtcblxuLyoqXG4gKiBUaGlzIGNsYXNzIHJlcHJlc2VudHMgYSBiYWJibGVyLiBUaGUgYmFiYmxlclxuICogcHJvZHVjZXMgbG9ydW0gaXBzdW0gdGV4dCwgdG8gdXNlciBzcGVjaWZpY2F0aW9ucy5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAdmVyc2lvbiAyMDEzMDMxM1xuICogQGNsYXNzIFRoaXMgY2xhc3MgcmVwcmVzZW50cyBhIGJhYmJsZXJcbiAqIEBwYXJhbSB7TnVtYmVyfSB3cmRDb3VudCBUaGUgYW1vdW50IG9mIFwid29yZHNcIiB5b3Ugd291bGQgbGlrZVxuICogdGhlIGJhYmJsZXIgdG8gcHJvZHVjZS5cbiAqIEByZXR1cm5zIHtCYWJibGVyfSBSZXR1cm5zIGEgYmFiYmxlci5cbiAqIEByZXF1aXJlcyBhdHJvcGEucmFuZG9tLmludGVnZXJcbiAqIEByZXF1aXJlcyBhdHJvcGEuc3RyaW5nLnVjRmlyc3RcbiAqIEByZXF1aXJlcyBhdHJvcGEucmFuZG9tLnN0cmluZ1xuICogQGV4YW1wbGVcbiAqIHZhciBiYWJibGVyID0gbmV3IGF0cm9wYS5CYWJibGVyKDMwKTtcbiAqIC8vIHJlc2V0cyB0aGUgd29yZCBjb3VudFxuICogYmFiYmxlci5yZXNldFdvcmRDb3VudCgxMClcbiAqIGNvbnNvbGUubG9nKGJhYmJsZXIuZ2V0V29yZENvdW50KCkpO1xuICogXG4gKiAvLyBkaXNwbGF5cyBhIDEwIHdvcmQgc2VudGVuY2Ugb2Ygbm9uc2Vuc2Ugd29yZHMuXG4gKiBjb25zb2xlLmxvZyhiYWJibGVyLmdlbmVyYXRlQmFiYmxlKDEwKSk7XG4gKiAvLyBkaXNwbGF5cyBhIDMgd29yZCBzZW50ZW5jZVxuICogY29uc29sZS5sb2coYmFiYmxlci5nZW5lcmF0ZUJhYmJsZSgzKSk7XG4gKiBcbiAqIC8vIGRpc3BsYXlzIHRoZSB1c2VyIHN0b3JlZCBvciBsYXN0IGdlbmVyYXRlZCBiYWJibGVcbiAqIGNvbnNvbGUubG9nKGJhYmJsZXIuZ2V0QmFiYmxlKCkpO1xuICogXG4gKiAvLyBjbGVhcnMgdGhlIHN0b3JlZCBiYWJibGVcbiAqIGJhYmJsZXIucmVzZXRCYWJibGUoKTtcbiAqIGNvbnNvbGUubG9nKGJhYmJsZXIuZ2V0QmFiYmxlKCkpO1xuICogXG4gKiAvLyBzZXRzIHRoZSBiYWJibGVcbiAqIGJhYmJsZXIuc2V0QmFiYmxlKCdoZXJlIGJlIGdpYmJlcmlzaCAnKTtcbiAqIGNvbnNvbGUubG9nKGJhYmJsZXIuZ2V0QmFiYmxlKCkpO1xuICogXG4gKiAvLyBhcHBlbmQgbW9yZSBnaWJiZXJpc2ggdG8gdGhlIGN1cnJlbnQgYmFiYmxlXG4gKiBiYWJibGVyLnNldEJhYmJsZShiYWJibGVyLmdldEJhYmJsZSgpICsgYmFiYmxlci5nZW5lcmF0ZUJhYmJsZSg1KSk7XG4gKiBjb25zb2xlLmxvZyhiYWJibGVyLmdldEJhYmJsZSgpKTtcbiAqIFxuICogLy8gZ2VuZXJhdGUgYSBzZW50ZW5jZVxuICogYmFiYmxlci5yZXNldFdvcmRDb3VudCgxMCk7XG4gKiBjb25zb2xlLmxvZyhiYWJibGVyLmdlbmVyYXRlU2VudGVuY2UoNSwgMjApKTtcbiAqIFxuICogLy8gZ2VuZXJhdGUgcmFuZG9tIHB1bmN0dWF0aW9uXG4gKiBjb25zb2xlLmxvZyhiYWJibGVyLnB1bmN0dWF0ZSgpKTtcbiAqIFxuICogLy8gZ2VuZXJhdGUgYSB3b3JkXG4gKiBjb25zb2xlLmxvZyhiYWJibGVyLmdlbmVyYXRlV29yZCgzLDcpKTtcbiAqIGNvbnNvbGUubG9nKGJhYmJsZXIuZ2VuZXJhdGVXb3JkKDcsMTApKTtcbiAqL1xuYXRyb3BhLkJhYmJsZXIgPSBmdW5jdGlvbiBCYWJibGVyKHdyZENvdW50KSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuICAgIHZhciBteSA9IHRoaXMsXG4gICAgICAgIGJhYmJsZSA9ICcnLFxuICAgICAgICB3b3JkQ291bnQgPSAwO1xuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIHdvcmQgY291bnQuXG4gICAgICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gICAgICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gICAgICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICAgICAqIEB2ZXJzaW9uIDIwMTMwMzEzXG4gICAgICogQG1ldGhvZE9mIGF0cm9wYS5CYWJibGVyI1xuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB3cmRDb3VudCBUaGUgYW1vdW50IG9mIFwid29yZHNcIiB3aGljaCB5b3Ugd2FudCB0aGVcbiAgICAgKiBiYWJibGVyIHRvIHByb2R1Y2UuXG4gICAgICogQHJldHVybnMge051bWJlcn0gUmV0dXJucyB0aGUgc2V0IHdvcmQgY291bnQgZm9yIHRoaXMgYmFiYmxlci5cbiAgICAgKi9cbiAgICB0aGlzLnNldFdvcmRDb3VudCA9IGZ1bmN0aW9uICh3cmRDb3VudCkge1xuICAgICAgICBpZiAodHlwZW9mIHdyZENvdW50ICE9PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgd29yZENvdW50ID0gMjUwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgd29yZENvdW50ID0gd3JkQ291bnQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHdvcmRDb3VudDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJlc2V0cyB0aGUgd29yZCBjb3VudCBmb3IgdGhpcyBiYWJibGVyLlxuICAgICAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICAgICAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICAgICAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAgICAgKiBAdmVyc2lvbiAyMDEzMDMxM1xuICAgICAqIEBtZXRob2RPZiBhdHJvcGEuQmFiYmxlciNcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gd29yZENvdW50IFRoZSBhbW91bnQgb2YgXCJ3b3Jkc1wiIHlvdSB3b3VsZCBsaWtlXG4gICAgICogdG8gc2V0IGZvciB0aGlzIGJhYmJsZXIuXG4gICAgICogQHJldHVybnMge051bWJlcn0gUmV0dXJucyB0aGUgc2V0IHdvcmQgY291bnQgZm9yIHRoaXMgYmFiYmxlci5cbiAgICAgKi9cbiAgICB0aGlzLnJlc2V0V29yZENvdW50ID0gZnVuY3Rpb24gcmVzZXRXb3JkQ291bnQod29yZENvdW50KSB7XG4gICAgICAgIG15LnNldFdvcmRDb3VudCh3b3JkQ291bnQpO1xuICAgICAgICByZXR1cm4gd29yZENvdW50O1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgY3VycmVudCB3b3JkIGNvdW50LlxuICAgICAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICAgICAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICAgICAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAgICAgKiBAdmVyc2lvbiAyMDEyMDkwOVxuICAgICAqIEBtZXRob2RPZiBhdHJvcGEuQmFiYmxlciNcbiAgICAgKiBAcmV0dXJucyB7TnVtYmVyfSBSZXR1cm5zIHRoZSB3b3JkIGNvdW50IGZvciB0aGlzIGJhYmJsZXIuXG4gICAgICovXG4gICAgdGhpcy5nZXRXb3JkQ291bnQgPSBmdW5jdGlvbiBnZXRXb3JkQ291bnQoKSB7XG4gICAgICAgIHJldHVybiB3b3JkQ291bnQ7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZW5lcmF0ZXMgYSB3b3JkIHdpdGggYSBzcGVjaWZpZWQgbGVuZ3RoLiBMb3dlcnMgdGhlIHdvcmQgY291bnQgYnkgb25lLlxuICAgICAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICAgICAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICAgICAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAgICAgKiBAdmVyc2lvbiAyMDEyMDkwOVxuICAgICAqIEBtZXRob2RPZiBhdHJvcGEuQmFiYmxlciNcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gc3RyaW5nTWluIHRoZSBzaG9ydGVzdCB3b3JkLCBpbiBjaGFyYWN0ZXJzLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBzdHJpbmdNYXggVGhlIGxvbmdlc3Qgd29yZCwgaW4gY2hhcmFjdGVycy5cbiAgICAgKiBAcmV0dXJucyB7U3RyaW5nfSBSZXR1cm5zIGEgcmFuZG9tIHN0cmluZyBvZiBjaGFyYWN0ZXJzXG4gICAgICogd2l0aGluIHRoZSBzcGVjaWZpZWQgcmFuZ2Ugb2YgbGVuZ3RoLlxuICAgICAqIEByZXF1aXJlcyBhdHJvcGEucmFuZG9tLmludGVnZXJcbiAgICAgKiBAcmVxdWlyZXMgYXRyb3BhLnJhbmRvbS5zdHJpbmdcbiAgICAgKi9cbiAgICB0aGlzLmdlbmVyYXRlV29yZCA9IGZ1bmN0aW9uIGdlbmVyYXRlV29yZChzdHJpbmdNaW4sIHN0cmluZ01heCkge1xuICAgICAgICB2YXIgd29yZExlbmd0aCxcbiAgICAgICAgd29yZDtcbiAgICAgICAgd29yZExlbmd0aCA9IGF0cm9wYS5yYW5kb20uaW50ZWdlcihzdHJpbmdNaW4sIHN0cmluZ01heCk7XG4gICAgICAgIHdvcmQgPSBhdHJvcGEucmFuZG9tLnN0cmluZyh3b3JkTGVuZ3RoLCAnbG93ZXInKTtcbiAgICAgICAgd29yZENvdW50LS07XG4gICAgICAgIHJldHVybiB3b3JkO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUHJvdmlkZXMgcmFuZG9tIHB1bmN0dWF0aW9uLlxuICAgICAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICAgICAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICAgICAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAgICAgKiBAdmVyc2lvbiAyMDEyMDkwOVxuICAgICAqIEBtZXRob2RPZiBhdHJvcGEuQmFiYmxlciNcbiAgICAgKiBAcmV0dXJucyB7U3RyaW5nfSBSZXR1cm5zIGEgcmFuZG9tIHB1bmN0dWF0aW9uXG4gICAgICogY2hhcmFjdGVyICggLiAhIG9yID8gKS5cbiAgICAgKiBAcmVxdWlyZXMgYXRyb3BhLnJhbmRvbS5zdHJpbmdcbiAgICAgKi9cbiAgICB0aGlzLnB1bmN0dWF0ZSA9IGZ1bmN0aW9uIHB1bmN0dWF0ZSgpIHtcbiAgICAgICAgdmFyIHB1bmN0dWF0aW9uO1xuICAgICAgICBwdW5jdHVhdGlvbiA9IGF0cm9wYS5yYW5kb20uc3RyaW5nKDEsICdwdW5jdHVhdGlvbicpO1xuICAgICAgICByZXR1cm4gcHVuY3R1YXRpb247XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZW5lcmF0ZXMgYSBzZW50ZW5jZSBvZiBzcGVjaWZpZWQgbGVuZ3RoIGluIHdvcmRzLiBUaGUgcXVhbnRpdHlcbiAgICAgKiAgb2Ygd29yZHMgaW4gdGhlIGdlbmVyYXRlZCBzZW50ZW5jZSB3aWxsIGJlIGJldHdlZW4gdGhlIG1pbmltdW1cbiAgICAgKiAgYW5kIG1heGltdW0gc2V0LCB3aXRoIHRoZSBtYXhpbXVtIGNhcHBlZCBhdCB0aGUgY3VycmVudCB3b3Jkc1xuICAgICAqICBjb3VudC4gVGhlIHdvcmQgY291bnQgd2lsbCBiZSBsb3dlcmVkIGJ5IHRoZVxuICAgICAqICBxdWFudGl0eSBvZiB3b3JkcyBpbiB0aGUgZ2VuZXJhdGVkIHNlbnRlbmNlLiBJZiB0aGUgd29yZCBjb3VudFxuICAgICAqICBpcyAwIHRoZW4gdGhlcmUgd2lsbCBiZSBubyB3b3JkcyBpbiB0aGUgc2VudGVuY2UuIElmIHRoZSB3b3JkXG4gICAgICogIGNvdW50IGlzIDMgdGhlbiB0aGUgbWF4aW11bSBwb3NzaWJsZSBudW1iZXIgb2Ygd29yZHMgaW4gdGhlXG4gICAgICogIHNlbnRlbmNlIHdpbGwgYmUgdGhyZWUuXG4gICAgICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gICAgICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gICAgICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICAgICAqIEB2ZXJzaW9uIDIwMTMwMzEzXG4gICAgICogQG1ldGhvZE9mIGF0cm9wYS5CYWJibGVyI1xuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBzZW50ZW5jZU1pbiBUaGUgc2hvcnRlc3Qgc2VudGVuY2UsIGluIHdvcmRzLFxuICAgICAqIHlvdSB3b3VsZCBsaWtlIHJldHVybmVkLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBzZW50ZW5jZU1heCBUaGUgbG9uZ2VzdCBzZW50ZW5jZSwgaW4gd29yZHMsXG4gICAgICogeW91IHdvdWxkIGxpa2UgcmV0dXJuZWQuXG4gICAgICogQHJldHVybnMge1N0cmluZ30gUmV0dXJucyBhIFwic2VudGVuY2VcIiB3aXRoaW4gdGhlIHNwZWNpZmllZFxuICAgICAqIHJhbmdlIG9mIGxlbmd0aC5cbiAgICAgKiBAcmVxdWlyZXMgYXRyb3BhLnJhbmRvbS5pbnRlZ2VyXG4gICAgICogQHJlcXVpcmVzIGF0cm9wYS5zdHJpbmcudWNGaXJzdFxuICAgICAqL1xuICAgIHRoaXMuZ2VuZXJhdGVTZW50ZW5jZSA9IGZ1bmN0aW9uIGdlbmVyYXRlU2VudGVuY2UoXG4gICAgICAgIHNlbnRlbmNlTWluLCBzZW50ZW5jZU1heFxuICAgICkge1xuICAgICAgICB2YXIgd29yZCxcbiAgICAgICAgc2VudGVuY2VMZW5ndGgsXG4gICAgICAgIHNlbnRlbmNlO1xuICAgICAgICBzZW50ZW5jZUxlbmd0aCA9IGF0cm9wYS5yYW5kb20uaW50ZWdlcihzZW50ZW5jZU1pbiwgc2VudGVuY2VNYXgpO1xuICAgICAgICBzZW50ZW5jZSA9ICcnO1xuICAgICAgICBpZiAoc2VudGVuY2VMZW5ndGggPiB3b3JkQ291bnQpIHtcbiAgICAgICAgICAgIHNlbnRlbmNlTGVuZ3RoID0gd29yZENvdW50O1xuICAgICAgICB9XG4gICAgICAgIGZvciAoc2VudGVuY2VMZW5ndGg7IHNlbnRlbmNlTGVuZ3RoID4gMDsgc2VudGVuY2VMZW5ndGgtLSkge1xuICAgICAgICAgICAgaWYgKHdvcmRDb3VudCA+IDApIHtcbiAgICAgICAgICAgICAgICB3b3JkID0gbXkuZ2VuZXJhdGVXb3JkKDQsIDEyKTtcbiAgICAgICAgICAgICAgICBzZW50ZW5jZSArPSAnICcgKyB3b3JkO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZW50ZW5jZUxlbmd0aCA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgc2VudGVuY2UgKz0gbXkucHVuY3R1YXRlKCk7XG4gICAgICAgIHJldHVybiBhdHJvcGEuc3RyaW5nLnVjRmlyc3Qoc2VudGVuY2UudHJpbSgpKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIGJhYmJsZS5cbiAgICAgKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAgICAgKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAgICAgKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gICAgICogQHZlcnNpb24gMjAxMzAzMTNcbiAgICAgKiBAbWV0aG9kT2YgYXRyb3BhLkJhYmJsZXIjXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGJhYmJsZVN0cmluZyBTcGVjaWZpZWQgYmFiYmxlIHRvIHNldC5cbiAgICAgKiBAcmV0dXJucyB7U3RyaW5nfSBSZXR1cm5zIHRoZSBzdG9yZWQgYmFiYmxlLlxuICAgICAqL1xuICAgIHRoaXMuc2V0QmFiYmxlID0gZnVuY3Rpb24gc2V0QmFiYmxlKGJhYmJsZVN0cmluZykge1xuICAgICAgICBpZiAodHlwZW9mIGJhYmJsZVN0cmluZyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGJhYmJsZSA9IGJhYmJsZVN0cmluZztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG15LnJlc2V0QmFiYmxlKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJhYmJsZTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENsZWFycyB0aGUgc3RvcmVkIGJhYmJsZS5cbiAgICAgKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAgICAgKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAgICAgKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gICAgICogQHZlcnNpb24gMjAxMjA5MDlcbiAgICAgKiBAbWV0aG9kT2YgYXRyb3BhLkJhYmJsZXIjXG4gICAgICogQHJldHVybnMge1N0cmluZ30gUmV0dXJucyB0aGUgc3RvcmVkIGJhYmJsZS5cbiAgICAgKi9cbiAgICB0aGlzLnJlc2V0QmFiYmxlID0gZnVuY3Rpb24gcmVzZXRCYWJibGUoKSB7XG4gICAgICAgIGJhYmJsZSA9ICcnO1xuICAgICAgICByZXR1cm4gYmFiYmxlO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgbGFzdCBnZW5lcmF0ZWQgYmFiYmxlLlxuICAgICAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICAgICAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICAgICAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAgICAgKiBAdmVyc2lvbiAyMDEyMDkwOVxuICAgICAqIEBtZXRob2RPZiBhdHJvcGEuQmFiYmxlciNcbiAgICAgKiBAcmV0dXJucyB7U3RyaW5nfSBSZXR1cm5zIHRoZSBzdG9yZWQgYmFiYmxlLlxuICAgICAqL1xuICAgIHRoaXMuZ2V0QmFiYmxlID0gZnVuY3Rpb24gZ2V0QmFiYmxlKCkge1xuICAgICAgICByZXR1cm4gYmFiYmxlO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2VuZXJhdGVzIGJhYmJsZSB0byBhIHVzZXIgc3BlY2lmaWVkIGxlbmd0aCBpbiB3b3Jkcy5cbiAgICAgKiAgVGhlIHdvcmQgY291bnQgd2lsbCBiZSB6ZXJvIGFmdGVyIHRoaXMgYW5kIHRoZSBzdG9yZWRcbiAgICAgKiAgYmFiYmxlIHdpbGwgYmUgc2V0IHRvIHRoZSBnZW5lcmF0ZWQgYmFiYmxlLlxuICAgICAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICAgICAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICAgICAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAgICAgKiBAdmVyc2lvbiAyMDEyMDkwOVxuICAgICAqIEBtZXRob2RPZiBhdHJvcGEuQmFiYmxlciNcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gd29yZHNDdCBUaGUgZGVzaXJlZCB3b3JkIGNvdW50IGZvciB0aGVcbiAgICAgKiBnZW5lcmF0ZWQgYmFiYmxlLlxuICAgICAqIEByZXR1cm5zIHtTdHJpbmd9IFJldHVybnMgYmFiYmxlIG9mIHNwZWNpZmllZCBsZW5ndGggaW4gd29yZHMuXG4gICAgICogQHNlZSBhdHJvcGEuQmFiYmxlciNnZXRXb3JkQ291bnRcbiAgICAgKi9cbiAgICB0aGlzLmdlbmVyYXRlQmFiYmxlID0gZnVuY3Rpb24gZ2VuZXJhdGVCYWJibGUod29yZHNDdCkge1xuICAgICAgICBteS5yZXNldEJhYmJsZSgpO1xuICAgICAgICBteS5yZXNldFdvcmRDb3VudCh3b3Jkc0N0KTtcbiAgICAgICAgZm9yICh3b3JkQ291bnQ7IHdvcmRDb3VudCA+IDA7IGJhYmJsZSArPSAnICcpIHtcbiAgICAgICAgICAgIG15LnNldEJhYmJsZShiYWJibGUgKyBteS5nZW5lcmF0ZVNlbnRlbmNlKDUsIDIwKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJhYmJsZTtcbiAgICB9O1xuICAgIFxuICAgIGF0cm9wYS5zdXBwb3J0Q2hlY2soJ0JhYmJsZXInKTtcbiAgICB0aGlzLnJlc2V0V29yZENvdW50KHdyZENvdW50KTtcbn07XG5cblxuXG5cbndoaWxlKGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5sZW5ndGggPiAwKSB7XG4gICAgYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLnBvcCgpKCk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGF0cm9wYTtcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9kb2NzL3ZzZG9jL09wZW5MYXllcnNBbGwuanNcIi8+XG52YXIgYXRyb3BhID0gcmVxdWlyZSgnYXRyb3BhLWhlYWRlcicpO1xuLypqc2xpbnRcbiAgICBpbmRlbnQ6IDQsXG4gICAgbWF4ZXJyOiA1MCxcbiAgICB3aGl0ZTogdHJ1ZSxcbiAgICBicm93c2VyOiB0cnVlLFxuICAgIGRldmVsOiB0cnVlLFxuICAgIHBsdXNwbHVzOiB0cnVlLFxuICAgIHJlZ2V4cDogdHJ1ZVxuKi9cbi8qZ2xvYmFsIGF0cm9wYSAqL1xuLy8gZW5kIGhlYWRlclxuXG5hdHJvcGEucmVxdWlyZXMoXG4gICAgJ0Nvb2tpZU1vbnN0ZXInLFxuICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgICAgIHZhciBzdXBwb3J0ZWQgPSB0cnVlO1xuICAgICAgICBcbiAgICAgICAgW1xuICAgICAgICAgICAgZG9jdW1lbnQuY29va2llXG4gICAgICAgIF0uZm9yRWFjaChmdW5jdGlvbiAocHJlcmVxdWlzaXRlKSB7XG4gICAgICAgICAgICBpZihwcmVyZXF1aXNpdGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHN1cHBvcnRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHN1cHBvcnRlZDtcbiAgICB9XG4pO1xuXG4vKipcbiAqIFRoaXMgaXMgYSBjb29raWUgaGFuZGxlci5cbiAqIEBleGFtcGxlXG4gKiAvLyBjb29raWUgb2JqZWN0XG4gKiB2YXIgY29va2llT2JqID0ge1wia2V5XCIgOiBcImNvb2tpZU5hbWVcIiwgXCJ2YWxcIiA6IFwiY29va2llVmFsXCJ9XG4gKiAvLyBjb29raWUgc3RyaW5nIFxuICogdmFyIGNvb2tpZVN0cmluZyA9IGNvb2tpZU5hbWU9Y29va2llVmFsO1xuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAqIEB2ZXJzaW9uIDIwMTMwMjIzXG4gKiBAY2xhc3MgVGhpcyByZXByZXNlbnRzIGEgY29va2llIGhhbmRsZXJcbiAqIEByZXR1cm5zIHtDb29raWVNb25zdGVyfSBBIGNvb2tpZSBoYW5kbGVyLlxuICogQHJlcXVpcmVzIGF0cm9wYS5kYXRhXG4gKi9cbmF0cm9wYS5Db29raWVNb25zdGVyID0gZnVuY3Rpb24gQ29va2llTW9uc3RlcigpIHtcbiAgICAndXNlIHN0cmljdCc7XG4gICAgdmFyIGN1cnJlbnRDb29raWVzLCBnZXRDb29raWVDYWxsYmFjaztcbiAgICBcbiAgICAvKipcbiAgICAgKiBUaGlzIGhvbGRzIHRoZSBjdXJyZW50IGNvb2tpZSBvYmplY3QgYXJyYXkuXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAdHlwZSBBcnJheVxuICAgICAqIEBmaWVsZE9mIGF0cm9wYS5Db29raWVNb25zdGVyLVxuICAgICAqL1xuICAgIGN1cnJlbnRDb29raWVzID0gW107XG4gICAgLyoqXG4gICAgICogQ29udmVydHMgYSBjb29raWUgc3RyaW5nIGludG8gYW4gb2JqZWN0LlxuICAgICAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICAgICAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICAgICAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAgICAgKiBAdmVyc2lvbiAyMDEzMDIyM1xuICAgICAqIEBtZXRob2RPZiBhdHJvcGEuQ29va2llTW9uc3RlciNcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gY29va2llIEEgY29va2llIHJlcHJlc2VudGVkIGFzIGEgc3RyaW5nXG4gICAgICogPGNvZGU+Y29va2llTmFtZT1jb29raWVWYWw7PC9jb2RlPlxuICAgICAqIEByZXR1cm5zIHtjb29raWVPYmp9IFJldHVybnMgYSBjb29raWUgb2JqZWN0LlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIGNvb2tpZU1vbnN0ZXIgPSBuZXcgYXRyb3BhLkNvb2tpZU1vbnN0ZXIoKTtcbiAgICAgKiB2YXIgY29va2llT2JqID0gY29va2llTW9uc3Rlci5jb29raWUyb2JqKCdhdHJvcGE9aGlhbCBhdHJvcGEhITsnKTtcbiAgICAgKiBjb25zb2xlLmxvZyhjb29raWVPYmopO1xuICAgICAqL1xuICAgIHRoaXMuY29va2llMm9iaiA9IGZ1bmN0aW9uIGNvb2tpZTJvYmooY29va2llKSB7XG4gICAgICAgIHZhciBjb29raWVPYmogPSB7fTtcbiAgICAgICAgaWYgKCFjb29raWUpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBjb29raWVPYmoua2V5ID0gY29va2llLnN1YnN0cigwLCBjb29raWUuaW5kZXhPZihcIj1cIikpLnRyaW0oKTtcbiAgICAgICAgY29va2llT2JqLnZhbCA9IGNvb2tpZS5zdWJzdHIoY29va2llLmluZGV4T2YoXCI9XCIpICsgMSk7XG4gICAgICAgIGlmKGNvb2tpZU9iai52YWwuc3Vic3RyKC0xKSA9PT0gJzsnKSB7XG4gICAgICAgICAgICBjb29raWVPYmoudmFsID0gY29va2llT2JqLnZhbC5zdWJzdHIoMCwgY29va2llT2JqLnZhbC5sZW5ndGggLSAxKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29va2llT2JqO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQ29udmVydHMgYSBjb29raWUgb2JqZWN0IHRvIGEgY29va2llIHN0cmluZy5cbiAgICAgKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAgICAgKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAgICAgKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gICAgICogQHZlcnNpb24gMjAxMjA5MDlcbiAgICAgKiBAbWV0aG9kT2YgYXRyb3BhLkNvb2tpZU1vbnN0ZXIjXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGNvb2tpZU9iaiBBIGNvb2tpZSBvYmplY3RcbiAgICAgKiBAcmV0dXJucyB7U3RyaW5nfSBSZXR1cm5zIGEgY29va2llIHN0cmluZy5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBjb29raWVNb25zdGVyID0gbmV3IGF0cm9wYS5Db29raWVNb25zdGVyKCk7XG4gICAgICogLy8gY3JlYXRpbmcgYSBjb29raWVcbiAgICAgKiBjb29raWVNb25zdGVyLnNldENvb2tpZSgnYXRyb3BhJywgJ2hpYWwgYXRyb3BhISEnKTtcbiAgICAgKiBjb25zb2xlLmxvZyhkb2N1bWVudC5jb29raWUpO1xuICAgICAqIFxuICAgICAqIC8vIGdldHRpbmcgYSBjb29raWUgb2JqZWN0XG4gICAgICogdmFyIGNvb2tpZU9iaiA9IGNvb2tpZU1vbnN0ZXIuZ2V0Q29va2llKCdhdHJvcGEnKTtcbiAgICAgKiBjb25zb2xlLmxvZyhjb29raWVPYmopO1xuICAgICAqIFxuICAgICAqIC8vIGNvbnZlcnQgdGhlIGNvb2tpZSBvYmplY3QgdG8gYSBzdHJpbmdcbiAgICAgKiBjb25zb2xlLmxvZyhjb29raWVNb25zdGVyLmJha2VDb29raWUoY29va2llT2JqKSk7XG4gICAgICovXG4gICAgdGhpcy5iYWtlQ29va2llID0gZnVuY3Rpb24gYmFrZUNvb2tpZShjb29raWVPYmopIHtcbiAgICAgICAgdmFyIGNvb2tpZSA9ICcnLCBrZXksIHZhbDtcbiAgICAgICAgXG4gICAgICAgIGtleSA9IGNvb2tpZU9iai5rZXk7XG4gICAgICAgIHZhbCA9IGNvb2tpZU9iai52YWw7XG4gICAgICAgIGNvb2tpZSA9IGtleSArICc9JyArIHZhbCArICc7JztcbiAgICAgICAgcmV0dXJuIGNvb2tpZTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEZpbHRlciBjb29raWVzIGJhc2VkIG9uIHVzZXIgc3BlY2lmaWVkIGNhbGxiYWNrLlxuICAgICAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICAgICAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICAgICAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAgICAgKiBAdmVyc2lvbiAyMDEzMDIyM1xuICAgICAqIEBtZXRob2RPZiBhdHJvcGEuQ29va2llTW9uc3RlciNcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFjayBUaGUgY2FsbGJhY2sgZnVuY3Rpb24gd2lsbCBiZSBwYXNzZWRcbiAgICAgKiAgdHdvIGFyZ3VtZW50cy4gVGhlIGZpcnN0IGlzIGEgY29va2llIG9iamVjdCBmcm9tIHRoZSBjdXJyZW50XG4gICAgICogIGRvY3VtZW50LiBUaGUgc2Vjb25kIGFyZ3VtZW50IGlzIHRoZSB2YWx1ZSBzdXBwbGllZCBmb3JcbiAgICAgKiAgPGNvZGU+YXJnczwvY29kZT4gaWYgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uIHJldHVybnMgPGNvZGU+dHJ1ZTwvY29kZT5cbiAgICAgKiAgdGhlbiB0aGUgY29va2llIG9iamVjdCB3aWxsIGJlIGluY2x1ZGVkIGluIHRoZSByZXR1cm4gcmVzdWx0cy5cbiAgICAgKiBAcGFyYW0ge0FycmF5fSBhcmdzIEFyZ3VtZW50cyB0byBwYXNzIHRvIHRoZSBjYWxsYmFja1xuICAgICAqIGZ1bmN0aW9uLlxuICAgICAqIEByZXR1cm5zIHtBcnJheX0gQW4gYXJyYXkgb2YgY29va2llIG9iamVjdHMuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgY29va2llTW9uc3RlciA9IG5ldyBhdHJvcGEuQ29va2llTW9uc3RlcigpO1xuICAgICAqIC8vIGNyZWF0aW5nIGEgZmV3IGNvb2tpZXNcbiAgICAgKiBjb29raWVNb25zdGVyLnNldENvb2tpZSgnYXRyb3BhJywgJ2hpYWwgYXRyb3BhISEnKTtcbiAgICAgKiBjb29raWVNb25zdGVyLnNldENvb2tpZSgna2F0amlpJywgJ211bmNoaW5nJyk7XG4gICAgICogY29uc29sZS5sb2coZG9jdW1lbnQuY29va2llKTtcbiAgICAgKiBcbiAgICAgKiAvLyBmaWx0ZXIgY29va2llc1xuICAgICAqIGZ1bmN0aW9uIGNvb2tpZUZpbHRlcihjb29raWVPYmosIGNvb2tpZVZhbHVlKSB7XG4gICAgICogICAgIGlmKGNvb2tpZU9iai52YWwgPT09IGNvb2tpZVZhbHVlKSB7XG4gICAgICogICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgKiAgICAgfSBlbHNlIHtcbiAgICAgKiAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgKiAgICAgfVxuICAgICAqIH1cbiAgICAgKiB2YXIgY29va2llT2JqQXJyYXkgPSBjb29raWVNb25zdGVyLmluc3BlY3RDb29raWVzKFxuICAgICAqICAgICBjb29raWVGaWx0ZXIsICdtdW5jaGluZycpO1xuICAgICAqIGNvbnNvbGUubG9nKGNvb2tpZU9iakFycmF5KTtcbiAgICAgKi9cbiAgICB0aGlzLmluc3BlY3RDb29raWVzID0gZnVuY3Rpb24gaW5zcGVjdENvb2tpZXMoY2FsbGJhY2ssIGFyZ3MpIHtcbiAgICAgICAgdmFyIHRlc3RDb29raWUsIGNvb2tpZXMsIGphciA9IFtdO1xuICAgICAgICBjb29raWVzID0gdGhpcy5nZXRDb29raWVzKCk7XG4gICAgICAgIHdoaWxlIChjb29raWVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRlc3RDb29raWUgPSBjb29raWVzLnNoaWZ0KCk7XG4gICAgICAgICAgICBpZiAoY2FsbGJhY2sodGVzdENvb2tpZSwgYXJncykgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBqYXIucHVzaCh0ZXN0Q29va2llKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gamFyO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogSW50ZXJuYWwgY2FsbGJhY2sgZnVuY3Rpb24gdXNlZCB3aGlsZSBnZXR0aW5nIHRoZSBjdXJyZW50XG4gICAgICogY29va2llcy5cbiAgICAgKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAgICAgKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAgICAgKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gICAgICogQHZlcnNpb24gMjAxMzAyMjNcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBtZXRob2RPZiBhdHJvcGEuQ29va2llTW9uc3Rlci1cbiAgICAgKiBAcGFyYW0ge2Nvb2tpZU9ian0gdGVzdENvb2tpZSBBIGNvb2tpZSBvYmplY3RcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gYXJncyBhcmd1bWVudCB1c2VkIGluIGNvbXBhcmlzb24gZnVuY3Rpb25cbiAgICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gSWYgY29va2llIGtleSBpcyBleGFjdGx5IGVxdWFsIHRvIHRoZSBhcmd1bWVudFxuICAgICAqIHRoZW4gdGhlIGNhbGxiYWNrIHJldHVybnMgdHJ1ZS5cbiAgICAgKi9cbiAgICBnZXRDb29raWVDYWxsYmFjayA9IGZ1bmN0aW9uIGdldENvb2tpZUNhbGxiYWNrKHRlc3RDb29raWUsIGFyZ3MpIHtcbiAgICAgICAgdmFyIG91dDtcbiAgICAgICAgaWYgKHRlc3RDb29raWUua2V5ID09PSBhcmdzKSB7XG4gICAgICAgICAgICBvdXQgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb3V0ID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEdldHMgYSB1c2VyIHJlcXVlc3RlZCBjb29raWUuXG4gICAgICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gICAgICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gICAgICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICAgICAqIEB2ZXJzaW9uIDIwMTMwMjIzXG4gICAgICogQG1ldGhvZE9mIGF0cm9wYS5Db29raWVNb25zdGVyI1xuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB3aGljaEtleSBUaGUgY29va2llcyBrZXkgKG5hbWUpXG4gICAgICogQHJldHVybnMge2Nvb2tpZU9ianxmYWxzZX0gUmV0dXJucyBhIGNvb2tpZSBvYmplY3QgaWZcbiAgICAgKiAgYSBjb29raWUgd2l0aCB0aGUgc3BlY2lmaWVkIGtleSBpcyBmb3VuZCBvciBmYWxzZSBpZlxuICAgICAqICBpdCBpcyBub3QgZm91bmQuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgY29va2llTW9uc3RlciA9IG5ldyBhdHJvcGEuQ29va2llTW9uc3RlcigpO1xuICAgICAqIC8vIGNyZWF0aW5nIGEgY29va2llXG4gICAgICogY29va2llTW9uc3Rlci5zZXRDb29raWUoJ2F0cm9wYScsICdoaWFsIGF0cm9wYSEhJyk7XG4gICAgICogY29uc29sZS5sb2coZG9jdW1lbnQuY29va2llKTtcbiAgICAgKiAvLyBnZXQgYSBzcGVjaWZpYyBjb29raWVcbiAgICAgKiB2YXIgY29va2llT2JqID0gY29va2llTW9uc3Rlci5nZXRDb29raWUoJ2F0cm9wYScpO1xuICAgICAqIGNvbnNvbGUubG9nKGNvb2tpZU9iai5rZXkpO1xuICAgICAqIGNvbnNvbGUubG9nKGNvb2tpZU9iai52YWwpO1xuICAgICAqL1xuICAgIHRoaXMuZ2V0Q29va2llID0gZnVuY3Rpb24gZ2V0Q29va2llKHdoaWNoS2V5KSB7XG4gICAgICAgIHZhciByZXN1bHQgPSB0aGlzLmluc3BlY3RDb29raWVzKGdldENvb2tpZUNhbGxiYWNrLCB3aGljaEtleS50cmltKCkpO1xuICAgICAgICByZXR1cm4gcmVzdWx0WzBdIHx8IGZhbHNlO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0IGFsbCBjb29raWVzLlxuICAgICAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICAgICAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICAgICAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAgICAgKiBAdmVyc2lvbiAyMDEyMDkwOVxuICAgICAqIEBtZXRob2RPZiBhdHJvcGEuQ29va2llTW9uc3RlciNcbiAgICAgKiBAcmV0dXJucyB7QXJyYXl9IEFuIGFycmF5IHdob3NlIGVsZW1lbnRzIGFyZSBjb29raWUgb2JqZWN0cy5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBjb29raWVNb25zdGVyID0gbmV3IGF0cm9wYS5Db29raWVNb25zdGVyKCk7XG4gICAgICogLy8gY3JlYXRpbmcgYSBjb29raWVcbiAgICAgKiBjb29raWVNb25zdGVyLnNldENvb2tpZSgnYXRyb3BhJywgJ2hpYWwgYXRyb3BhISEnKTtcbiAgICAgKiAvLyBnZXQgYWxsIGNvb2tpZSBvYmplY3RzIGluIGFuIGFycmF5XG4gICAgICogY29uc29sZS5sb2coY29va2llTW9uc3Rlci5nZXRDb29raWVzKCkpO1xuICAgICAqL1xuICAgIHRoaXMuZ2V0Q29va2llcyA9IGZ1bmN0aW9uIGdldENvb2tpZXMoKSB7XG4gICAgICAgIHZhciBuLCBsLCBjb29raWVBcnJheSwgY29va2llT2JqO1xuICAgICAgICBjdXJyZW50Q29va2llcyA9IFtdO1xuICAgICAgICBjb29raWVBcnJheSA9IGRvY3VtZW50LmNvb2tpZS5zcGxpdChcIjtcIik7XG4gICAgICAgIGZvciAobiA9IDAsIGwgPSBjb29raWVBcnJheS5sZW5ndGg7IG4gPCBsOyBuKyspIHtcbiAgICAgICAgICAgIGNvb2tpZU9iaiA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKGNvb2tpZUFycmF5W25dKSB7XG4gICAgICAgICAgICAgICAgY29va2llT2JqID0gdGhpcy5jb29raWUyb2JqKGNvb2tpZUFycmF5W25dKTtcbiAgICAgICAgICAgICAgICBpZiAoY29va2llT2JqKSB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRDb29raWVzLnB1c2goY29va2llT2JqKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGN1cnJlbnRDb29raWVzO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogRGVsZXRlcyBhIHNwZWNpZmllZCBjb29raWUgYnkgdXNlciBzdWJtaXR0ZWQgc3RyaW5nLlxuICAgICAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICAgICAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICAgICAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAgICAgKiBAdmVyc2lvbiAyMDEzMDIyM1xuICAgICAqIEBtZXRob2RPZiBhdHJvcGEuQ29va2llTW9uc3RlciNcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gd2hpY2hLZXkgVGhlIGNvb2tpZXMga2V5IChuYW1lKSB0aGF0XG4gICAgICogd2lsbCBiZSBkZWxldGVkLlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIGNvb2tpZU1vbnN0ZXIgPSBuZXcgYXRyb3BhLkNvb2tpZU1vbnN0ZXIoKTtcbiAgICAgKiAvLyBjcmVhdGluZyB0aGUgY29va2llIHRvIGRlbGV0ZVxuICAgICAqIGNvb2tpZU1vbnN0ZXIuc2V0Q29va2llKCdhdHJvcGEnLCAnaGlhbCBhdHJvcGEhIScpO1xuICAgICAqIGNvbnNvbGUubG9nKGRvY3VtZW50LmNvb2tpZSk7XG4gICAgICogLy8gZGVsZXRlIGEgY29va2llXG4gICAgICogY29va2llTW9uc3Rlci5kZWxldGVDb29raWUoJ2F0cm9wYScpO1xuICAgICAqIGNvbnNvbGUubG9nKGRvY3VtZW50LmNvb2tpZSk7XG4gICAgICovXG4gICAgdGhpcy5kZWxldGVDb29raWUgPSBmdW5jdGlvbiBkZWxldGVDb29raWUod2hpY2hLZXkpIHtcbiAgICAgICAgdmFyIGNvb2tpZU9iaiA9IHt9O1xuICAgICAgICBjb29raWVPYmoua2V5ID0gd2hpY2hLZXk7XG4gICAgICAgIGNvb2tpZU9iai52YWwgPSAnO2V4cGlyZXM9VGh1LCAyIEF1ZyAyMDAxIDIwOjQ3OjExIFVUQyc7XG4gICAgICAgIGRvY3VtZW50LmNvb2tpZSA9IHRoaXMuYmFrZUNvb2tpZShjb29raWVPYmopO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogRGVsZXRlcyBhIHNwZWNpZmllZCBjb29raWUgYnkgdXNlciBzdWJtaXR0ZWQgY29va2llT2JqLlxuICAgICAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICAgICAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICAgICAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAgICAgKiBAdmVyc2lvbiAyMDEyMDkwOVxuICAgICAqIEBtZXRob2RPZiBhdHJvcGEuQ29va2llTW9uc3RlciNcbiAgICAgKiBAcGFyYW0ge2Nvb2tpZU9ian0gY29va2llT2JqIEEgY29va2llIG9iamVjdC5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBjb29raWVNb25zdGVyID0gbmV3IGF0cm9wYS5Db29raWVNb25zdGVyKCk7XG4gICAgICogLy8gY3JlYXRpbmcgdGhlIGNvb2tpZSB0byBkZWxldGVcbiAgICAgKiBjb29raWVNb25zdGVyLnNldENvb2tpZSgnYXRyb3BhJywgJ2hpYWwgYXRyb3BhISEnKTtcbiAgICAgKiBjb25zb2xlLmxvZyhkb2N1bWVudC5jb29raWUpO1xuICAgICAqIC8vIGRlbGV0ZSBhIGNvb2tpZVxuICAgICAqIGNvb2tpZU1vbnN0ZXIuZGVsZXRlQ29va2llT2JqKFxuICAgICAqICAgICB7a2V5IDogJ2F0cm9wYScsIHZhbCA6ICdkb2VzIG5vdCBtYXR0ZXInfSk7XG4gICAgICogY29uc29sZS5sb2coZG9jdW1lbnQuY29va2llKTtcbiAgICAgKi9cbiAgICB0aGlzLmRlbGV0ZUNvb2tpZU9iaiA9IGZ1bmN0aW9uIGRlbGV0ZUNvb2tpZU9iaihjb29raWVPYmopIHtcbiAgICAgICAgdGhpcy5kZWxldGVDb29raWUoY29va2llT2JqLmtleSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBTZXRzIGEgY29va2llIHBlciB1c2VyIHNwZWNpZmljYXRpb25zIGFzIHN0cmluZ3MuIFRoZSBjb29raWVcbiAgICAgKiB3aWxsIGV4cGlyZSB3aGVuIHRoZSBicm93c2VyIGlzIGNsb3NlZC5cbiAgICAgKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAgICAgKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAgICAgKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gICAgICogQHZlcnNpb24gMjAxMjA5MDlcbiAgICAgKiBAbWV0aG9kT2YgYXRyb3BhLkNvb2tpZU1vbnN0ZXIjXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHdoaWNoS2V5IFRoZSBrZXkgKG5hbWUpIG9mIHRoZSBuZXcgY29va2llXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHNldFRvIFRoZSB2YWx1ZSBvZiB0aGUgbmV3IGNvb2tpZS5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBjb29raWVNb25zdGVyID0gbmV3IGF0cm9wYS5Db29raWVNb25zdGVyKCk7XG4gICAgICogLy8gc2V0IGEgY29va2llXG4gICAgICogY29va2llTW9uc3Rlci5zZXRDb29raWUoJ2F0cm9wYScsICdoaWFsJyk7XG4gICAgICogY29uc29sZS5sb2coZG9jdW1lbnQuY29va2llKTtcbiAgICAgKi9cbiAgICB0aGlzLnNldENvb2tpZSA9IGZ1bmN0aW9uIHNldENvb2tpZSh3aGljaEtleSwgc2V0VG8pIHtcbiAgICAgICAgdmFyIG5ld0Nvb2tpZSA9IHt9O1xuICAgICAgICBuZXdDb29raWUua2V5ID0gd2hpY2hLZXk7XG4gICAgICAgIG5ld0Nvb2tpZS52YWwgPSBzZXRUbztcbiAgICAgICAgZG9jdW1lbnQuY29va2llID0gdGhpcy5iYWtlQ29va2llKG5ld0Nvb2tpZSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBTZXRzIGEgY29va2llIHBlciB1c2VyIHNwZWNpZmljYXRpb25zIGFzIGFuIG9iamVjdC5cbiAgICAgKiBUaGUgY29va2llIHdpbGwgZXhwaXJlIHdoZW4gdGhlIGJyb3dzZXIgaXMgY2xvc2VkLlxuICAgICAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICAgICAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICAgICAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAgICAgKiBAdmVyc2lvbiAyMDEyMDkwOVxuICAgICAqIEBtZXRob2RPZiBhdHJvcGEuQ29va2llTW9uc3RlciNcbiAgICAgKiBAcGFyYW0ge2Nvb2tpZU9ian0gY29va2llT2JqIEEgY29va2llIG9iamVjdC5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBjb29raWVNb25zdGVyID0gbmV3IGF0cm9wYS5Db29raWVNb25zdGVyKCk7XG4gICAgICogLy8gc2V0IGEgY29va2llXG4gICAgICogY29va2llTW9uc3Rlci5zZXRDb29raWVPYmooe2tleSA6ICdhdHJvcGEnLCB2YWwgOiAnaGlhbCBhdHJvcGEhISd9KTtcbiAgICAgKiBjb25zb2xlLmxvZyhkb2N1bWVudC5jb29raWUpO1xuICAgICAqL1xuICAgIHRoaXMuc2V0Q29va2llT2JqID0gZnVuY3Rpb24gc2V0Q29va2llT2JqKGNvb2tpZU9iaikge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXRDb29raWUoY29va2llT2JqLmtleSwgY29va2llT2JqLnZhbCk7XG4gICAgfTtcbiAgICBcbiAgICBhdHJvcGEuc3VwcG9ydENoZWNrKCdDb29raWVNb25zdGVyJyk7XG59O1xuXG5cblxuXG53aGlsZShhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMubGVuZ3RoID4gMCkge1xuICAgIGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5wb3AoKSgpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBhdHJvcGE7XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vZG9jcy92c2RvYy9PcGVuTGF5ZXJzQWxsLmpzXCIvPlxudmFyIGF0cm9wYSA9IHJlcXVpcmUoJ2F0cm9wYS1oZWFkZXInKTtcbi8qanNsaW50XG4gICAgaW5kZW50OiA0LFxuICAgIG1heGVycjogNTAsXG4gICAgd2hpdGU6IHRydWUsXG4gICAgYnJvd3NlcjogdHJ1ZSxcbiAgICBkZXZlbDogdHJ1ZSxcbiAgICBwbHVzcGx1czogdHJ1ZSxcbiAgICByZWdleHA6IHRydWVcbiovXG4vKmdsb2JhbCBhdHJvcGEgKi9cbi8vIGVuZCBoZWFkZXJcblxuYXRyb3BhLnJlcXVpcmVzKFxuICAgICdIVE1MUGFyc2VyJyxcbiAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xuICAgICAgICB2YXIgc3VwcG9ydGVkID0gdHJ1ZTtcbiAgICAgICAgXG4gICAgICAgIFtcbiAgICAgICAgICAgIGRvY3VtZW50LmltcGxlbWVudGF0aW9uLmNyZWF0ZURvY3VtZW50VHlwZSxcbiAgICAgICAgICAgIGRvY3VtZW50LmltcGxlbWVudGF0aW9uLmNyZWF0ZURvY3VtZW50XG4gICAgICAgIF0uZm9yRWFjaChmdW5jdGlvbiAocHJlcmVxdWlzaXRlKSB7XG4gICAgICAgICAgICBpZihwcmVyZXF1aXNpdGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHN1cHBvcnRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHN1cHBvcnRlZDtcbiAgICB9XG4pO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgSFRNTCBQYXJzZXI8YnIgLz5cbiAqIENhcnJ5IG91dCBET00gb3BlcmF0aW9ucyB3aXRob3V0IGxvYWRpbmcgY29udGVudCB0byB0aGUgYWN0aXZlIGRvY3VtZW50LlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAqIEB2ZXJzaW9uIDIwMTIwOTA5XG4gKiBAY2xhc3MgQ3JlYXRlcyBhIG5ldyBIVE1MIFBhcnNlclxuICogQHJldHVybnMge0hUTUwgRE9NIERvY3VtZW50fSBSZXR1cm5zIGEgYmxhbmsgSFRNTCBEb2N1bWVudCBmb3IgeW91IHRvIGxvYWRcbiAqICBkYXRhIGludG9cbiAqIEByZXF1aXJlcyBhdHJvcGEuZGF0YVxuICovXG5hdHJvcGEuSFRNTFBhcnNlciA9IGZ1bmN0aW9uIEhUTUxQYXJzZXIoKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgdmFyIG15ID0gdGhpcztcbiAgICBcbiAgICAvKipcbiAgICAgKiBIb2xkcyB0aGUgY3JlYXRlZCBIVE1MIERPTSBEb2N1bWVudC5cbiAgICAgKiBAdHlwZSBIVE1MIERPTSBEb2N1bWVudFxuICAgICAqIEBmaWVsZE9mIGF0cm9wYS5IVE1MUGFyc2VyI1xuICAgICAqL1xuICAgIHRoaXMuZG9jID0ge307XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIGJsYW5rIEhUTUwgRE9NIERvY3VtZW50LlxuICAgICAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICAgICAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICAgICAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAgICAgKiBAdmVyc2lvbiAyMDEyMDkwOVxuICAgICAqIEBtZXRob2RPZiBhdHJvcGEuSFRNTFBhcnNlciNcbiAgICAgKiBAcmV0dXJucyB7SFRNTCBET00gRG9jdW1lbnR9IFJlc2V0cyB0aGUgZG9jIHByb3BlcnR5IG9mIHRoaXMgaW5zdGFuY2VcbiAgICAgKiAgYW5kLCByZXR1cm5zIGEgYmxhbmsgSFRNTCBEb2N1bWVudCBmb3IgeW91IHRvIGxvYWQgZGF0YSBpbnRvLlxuICAgICAqL1xuICAgIHRoaXMubmV3RG9jdW1lbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkdDtcbiAgICAgICAgZHQgPSBkb2N1bWVudC5pbXBsZW1lbnRhdGlvbi5jcmVhdGVEb2N1bWVudFR5cGUoXG4gICAgICAgICAgICBcImh0bWxcIixcbiAgICAgICAgICAgIFwiLS8vVzNDLy9EVEQgSFRNTCA0LjAxIFRyYW5zaXRpb25hbC8vRU5cIixcbiAgICAgICAgICAgIFwiaHR0cDovL3d3dy53My5vcmcvVFIvaHRtbDQvbG9vc2UuZHRkXCJcbiAgICAgICAgKTtcbiAgICAgICAgbXkuZG9jID0gZG9jdW1lbnQuaW1wbGVtZW50YXRpb24uY3JlYXRlRG9jdW1lbnQoJycsICcnLCBkdCk7XG4gICAgICAgIGlmIChteS5kb2Mubm9kZVR5cGUgIT09IDkpIHtcbiAgICAgICAgICAgIGF0cm9wYS5kYXRhLkhUTUxQYXJzZXIuc3VwcG9ydCA9ICd1bnN1cHBvcnRlZCc7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYXRyb3BhLmRhdGEuSFRNTFBhcnNlci5lcnJvciArXG4gICAgICAgICAgICAgICAgJ3RoZSBkb2N1bWVudCBub2RlVHlwZSByZXR1cm5lZCBhbiB1bmV4cGVjdGVkIHZhbHVlJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG15LmRvYztcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgSFRNTCBET00gRG9jdW1lbnQgYW5kIGxvYWRzIHRoZSBnaXZlbiBzdHJpbmcgaW50byBpdC5cbiAgICAgKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAgICAgKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAgICAgKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gICAgICogQHZlcnNpb24gMjAxMjA5MDlcbiAgICAgKiBAbWV0aG9kT2YgYXRyb3BhLkhUTUxQYXJzZXIjXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGh0bWxzdHJpbmcgYSBzdHJpbmcgb2YgSFRNTCBkYXRhXG4gICAgICogQHJldHVybnMge0hUTUwgRE9NIERvY3VtZW50fSBSZXNldHMgdGhlIGRvYyBwcm9wZXJ0eSBvZiB0aGlzIGluc3RhbmNlLFxuICAgICAqIGxvYWRpbmcgYSBuZXcgZG9jdW1lbnQgd2l0aCB0aGUgc3RyaW5nIGdpdmVuLlxuICAgICAqL1xuICAgIHRoaXMubG9hZFN0cmluZyA9IGZ1bmN0aW9uIChodG1sc3RyaW5nKSB7XG4gICAgICAgIGlmICghaHRtbHN0cmluZykge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbXkubmV3RG9jdW1lbnQoKTtcbiAgICAgICAgICAgIG15LmRvYy5hcHBlbmRDaGlsZChteS5kb2MuY3JlYXRlRWxlbWVudCgnaHRtbCcpKTtcbiAgICAgICAgICAgIG15LmRvYy5kb2N1bWVudEVsZW1lbnQuaW5uZXJIVE1MID0gaHRtbHN0cmluZztcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgYXRyb3BhLmRhdGEuSFRNTFBhcnNlci5zdXBwb3J0ID0gJ3Vuc3VwcG9ydGVkJztcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihhdHJvcGEuZGF0YS5IVE1MUGFyc2VyLmVycm9yICtcbiAgICAgICAgICAgICAgICAnYXRyb3BhLkhUTUxQYXJzZXIgY2FuIG5vdCBsb2FkICcgK1xuICAgICAgICAgICAgICAgICd0aGUgaGlkZGVuIGRvY3VtZW50IGZyb20gc3RyaW5nIGJlY2F1c2U6ICcgKyBlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbXkuZG9jO1xuICAgIH07XG4gICAgXG4gICAgZnVuY3Rpb24gaW5pdCAoKSB7XG4gICAgICAgIHZhciBlcVRlc3Q7XG4gICAgICAgIGF0cm9wYS5zdXBwb3J0Q2hlY2soJ0hUTUxQYXJzZXInKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGVxVGVzdCA9IG15LmxvYWRTdHJpbmcoXG4gICAgICAgICAgICAgICAgJzxoZWFkPjwvaGVhZD48Ym9keT48cD50ZXN0PC9wPjwvYm9keT4nXG4gICAgICAgICAgICApLmJvZHkudGV4dENvbnRlbnQ7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGF0cm9wYS5kYXRhLkhUTUxQYXJzZXIuc3VwcG9ydCA9ICd1bnN1cHBvcnRlZCc7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYXRyb3BhLmRhdGEuSFRNTFBhcnNlci5lcnJvciArIGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmKCd0ZXN0JyAhPT0gZXFUZXN0KSB7XG4gICAgICAgICAgICBhdHJvcGEuZGF0YS5IVE1MUGFyc2VyLnN1cHBvcnQgPSAndW5zdXBwb3J0ZWQnO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGF0cm9wYS5kYXRhLkhUTUxQYXJzZXIuZXJyb3IpO1xuICAgICAgICB9XG4gICAgICAgIG15Lm5ld0RvY3VtZW50KCk7XG4gICAgfVxuICAgIFxuICAgIGluaXQoKTtcbiAgICBcbn07XG5cblxuXG5cbndoaWxlKGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5sZW5ndGggPiAwKSB7XG4gICAgYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLnBvcCgpKCk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGF0cm9wYTtcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9kb2NzL3ZzZG9jL09wZW5MYXllcnNBbGwuanNcIi8+XG52YXIgYXRyb3BhID0gcmVxdWlyZSgnYXRyb3BhLWhlYWRlcicpO1xuYXRyb3BhLmlucXVpcmUgPSByZXF1aXJlKCdhdHJvcGEtaW5xdWlyZScpLmlucXVpcmU7XG4vKmpzbGludFxuICAgIGluZGVudDogNCxcbiAgICBtYXhlcnI6IDUwLFxuICAgIHdoaXRlOiB0cnVlLFxuICAgIGJyb3dzZXI6IHRydWUsXG4gICAgZGV2ZWw6IHRydWUsXG4gICAgcGx1c3BsdXM6IHRydWUsXG4gICAgcmVnZXhwOiB0cnVlXG4qL1xuLypnbG9iYWwgYXRyb3BhICovXG4vLyBlbmQgaGVhZGVyXG5cbi8qKlxuICogVXRpbGl0aWVzIGZvciBoYW5kbGluZyBhcnJheXMuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQHZlcnNpb24gMjAxMzAyMjFcbiAqIEBuYW1lc3BhY2UgVXRpbGl0aWVzIGZvciBoYW5kbGluZyBhcnJheXMuXG4gKi9cbmF0cm9wYS5hcnJheXMgPSB7fTtcbi8qKlxuICogQ29tcGFyZXMgdHdvIGFycmF5cyBiYXNlZCBvbiBzaXplLCBjb250ZW50cywgYW5kIGVsZW1lbnQgb3JkZXIuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQHZlcnNpb24gMjAxMjA5MDlcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5MSBPbmUgYXJyYXkgeW91IHdhbnQgY29tcGFyZWQgdG8gYW5vdGhlci5cbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5MiBUaGUgb3RoZXIgYXJyYXkuXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gUmV0dXJucyB0cnVlIG9yIGZhbHNlIGRlcGVuZGluZyBvblxuICogIHdoZXRoZXIgb3Igbm90IHRoZSBhcnJheXMgbWF0Y2hlZCBpbiBzaXplLCBjb21wb3NpdGlvbiwgYW5kXG4gKiAgZWxlbWVudCBvcmRlci5cbiAqIEBleGFtcGxlXG4gKiB2YXIgeCA9IFsxLDJdO1xuICogdmFyIHkgPSBbMSwxLDNdO1xuICogYXRyb3BhLmFycmF5cy5tYXRjaCh4LHkpO1xuICogLy8gcmV0dXJucyBmYWxzZVxuICogQGV4YW1wbGVcbiAqIHZhciB4ID0gWzEsMl07XG4gKiB2YXIgeSA9IFsxLDJdO1xuICogYXRyb3BhLmFycmF5cy5tYXRjaCh4LHkpO1xuICogLy8gcmV0dXJucyB0cnVlXG4gKiBAZXhhbXBsZVxuICogdmFyIHggPSBbMSwyXTtcbiAqIHZhciB5ID0gWzIsMV07XG4gKiBhdHJvcGEuYXJyYXlzLm1hdGNoKHgseSk7XG4gKiAvLyByZXR1cm5zIGZhbHNlIGJlY2F1c2UgdGhlIGVsZW1lbnRzIGFyZSBub3QgaW4gdGhlIHNhbWUgb3JkZXIuXG4gKiBAZXhhbXBsZVxuICogdmFyIHggPSBbMSx7J2FQcm9wJyA6ICdhVmFsdWUnfV07XG4gKiB2YXIgeSA9IFsxLHsnYVByb3AnIDogJ2FWYWx1ZSd9XTtcbiAqIGF0cm9wYS5hcnJheXMubWF0Y2goeCx5KTtcbiAqIC8vIHJldHVybnMgZmFsc2UgYmVjYXVzZSBldmVuIHRob3VnaCB0aGUgb2JqZWN0IGxvb2tzIHRoZSBzYW1lLCB0aGVcbiAqIC8vIHR3byBvYmplY3RzIGFyZSBpbiBmYWN0IGRpc3RpbmN0IG9iamVjdHMuXG4gKiBAZXhhbXBsZVxuICogdmFyIG9iaiA9IHsnYVByb3AnIDogJ2FWYWx1ZSd9O1xuICogdmFyIHggPSBbMSxvYmpdO1xuICogdmFyIHkgPSBbMSxvYmpdO1xuICogYXRyb3BhLmFycmF5cy5tYXRjaCh4LHkpO1xuICogLy8gcmV0dXJucyB0cnVlIGJlY2F1c2UgdGhlIG9iamVjdHMgcmVmZXJlbmNlZCBpbiB0aGUgYXJyYXlzIGFyZVxuICogLy8gaW4gZmFjdCB0aGUgc2FtZSBvYmplY3QuXG4gKi9cbmF0cm9wYS5hcnJheXMubWF0Y2ggPSBmdW5jdGlvbiBhcnJheXNNYXRjaChhcnJheTEsIGFycmF5Mikge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIHZhciB4LFxuICAgIGw7XG4gICAgaWYgKGFycmF5MS5sZW5ndGggIT09IGFycmF5Mi5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBsID0gYXJyYXkxLmxlbmd0aDtcbiAgICBmb3IgKHggPSAwOyB4IDwgbDsgeCArPSAxKSB7XG4gICAgICAgIGlmIChhcnJheTFbeF0gIT09IGFycmF5Mlt4XSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xufTtcbi8qKlxuICogU3VidHJhY3RzIG9uZSBhcnJheSBmcm9tIGFub3RoZXIgYXJyYXkgYmFzZWQgb24gdGhlIHVuaXF1ZSB2YWx1ZXMgaW4gYm90aFxuICogIHNldHMuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQHZlcnNpb24gMjAxMzAxMTJcbiAqIEBwYXJhbSB7QXJyYXl9IGEgKHN1YnRyYWhlbmQpIFRoZSBhcnJheSB0byBzdWJ0cmFjdC5cbiAqIEBwYXJhbSB7QXJyYXl9IGZyb21CIChtaW51ZW5kKSBUaGUgYXJyYXkgd2l0aCBlbGVtZW50cyBkdXBsaWNhdGVkIGluIDxjb2RlPmE8L2NvZGU+XG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYSBuZXcgYXJyYXkgY29udGFpbmluZyBvbmx5IHRoZSB1bmlxdWVcbiAqICB2YWx1ZXMgZm91bmQgaW4gPGNvZGU+ZnJvbUI8L2NvZGU+IHRoYXQgYXJlIG5vdCBwcmVzZW50IGluIDxjb2RlPmE8L2NvZGU+XG4gKiBAZXhhbXBsZVxuICogdmFyIHggPSBbMSwyXTtcbiAqIHZhciB5ID0gWzEsMSwzXTtcbiAqIGF0cm9wYS5hcnJheXMuc3VidHJhY3QoeCx5KTtcbiAqIC8vIHJldHVybnMgWzNdXG4gKiBAZXhhbXBsZVxuICogdmFyIHggPSBbMSwzXTtcbiAqIHZhciB5ID0gWzMsMV07XG4gKiBhdHJvcGEuYXJyYXlzLnN1YnRyYWN0KHgseSk7XG4gKiAvLyByZXR1cm5zIFtdXG4gKiBAZXhhbXBsZVxuICogdmFyIHggPSBbMSwzXTtcbiAqIHZhciB5ID0gWzMsMSwxLDldO1xuICogYXRyb3BhLmFycmF5cy5zdWJ0cmFjdCh4LHkpO1xuICogLy8gcmV0dXJucyBbOV1cbiAqIEBleGFtcGxlXG4gKiB2YXIgeCA9IFsxLDMseydhUHJvcCcgOiAnYVZhbCd9XTtcbiAqIHZhciB5ID0gWzMsMSx7J2FQcm9wJyA6ICdhVmFsJ31dO1xuICogYXRyb3BhLmFycmF5cy5zdWJ0cmFjdCh4LHkpO1xuICogLy8gcmV0dXJucyBbeydhUHJvcCcgOiAnYVZhbCd9XSBcbiAqIC8vIGJlY2F1c2UgdGhlIHR3byBvYmplY3RzIGFyZSBub3QgdGhlIHNhbWUgb2JqZWN0LlxuICogQGV4YW1wbGVcbiAqIHZhciBvYmogPSB7J2FQcm9wJyA6ICdhVmFsJ307XG4gKiB2YXIgeCA9IFsxLDMsb2JqXTtcbiAqIHZhciB5ID0gWzMsMSx7J2FQcm9wJyA6ICdhVmFsJ31dO1xuICogYXRyb3BhLmFycmF5cy5zdWJ0cmFjdCh4LHkpO1xuICogLy8gcmV0dXJucyBbeydhUHJvcCcgOiAnYVZhbCd9XSBcbiAqIC8vIGJlY2F1c2UgdGhlIHR3byBvYmplY3RzIGFyZSBub3QgdGhlIHNhbWUgb2JqZWN0LlxuICogQGV4YW1wbGVcbiAqIHZhciBvYmogPSB7J2FQcm9wJyA6ICdhVmFsJ31cbiAqIHZhciB4ID0gWzEsMyxvYmpdO1xuICogdmFyIHkgPSBbMywxLG9ial07XG4gKiBhdHJvcGEuYXJyYXlzLnN1YnRyYWN0KHgseSk7XG4gKiAvLyByZXR1cm5zIFtdIFxuICogLy8gYmVjYXVzZSB0aGUgb2JqZWN0cyByZWZlcmVuY2VkIGluIHRoZSBhcnJheXMgYXJlIHRoZSBzYW1lIG9iamVjdC5cbiAqL1xuYXRyb3BhLmFycmF5cy5zdWJ0cmFjdCA9IGZ1bmN0aW9uKGEsIGZyb21CKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgdmFyIHRoZSA9IHt9O1xuICAgIHRoZS5yZXN1bHQgPSBbXTtcbiAgICBmcm9tQi5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pe1xuICAgICAgICB0aGUubWFyayA9IGZhbHNlO1xuICAgICAgICBhLmZvckVhY2goZnVuY3Rpb24ocm0pe1xuICAgICAgICAgICAgaWYoaXRlbSA9PT0gcm0pIHtcbiAgICAgICAgICAgICAgICB0aGUubWFyayA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZih0aGUubWFyayAhPT0gdHJ1ZSkge1xuICAgICAgICAgICAgdGhlLnJlc3VsdC5wdXNoKGl0ZW0pO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHRoZS5yZXN1bHQ7XG59O1xuLyoqXG4gKiBSZXR1cm5zIGFuIGFycmF5IG9mIHZhbHVlcyBmb3VuZCBpbiBib3RoIG9mIHRoZSBnaXZlbiBhcnJheXMuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQHZlcnNpb24gMjAxMzAxMTJcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5MSBBbiBhcnJheS5cbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5MiBBbm90aGVyIGFycmF5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGFuIGFycmF5IG9mIHZhbHVlcyBmb3VuZCBpbiBib3RoIG9mIHRoZSBnaXZlblxuICogIGFycmF5cy5cbiAqIEBleGFtcGxlXG4gKiB2YXIgeCA9IFsxLDMsNF07XG4gKiB2YXIgeSA9IFszLDEsNV07XG4gKiBhdHJvcGEuYXJyYXlzLmludGVyc2VjdCh4LHkpO1xuICogLy8gcmV0dXJucyBbMSwzXVxuICogQGV4YW1wbGVcbiAqIHZhciB4ID0gWzEsMSwzLDRdO1xuICogdmFyIHkgPSBbMywxLDEsNV07XG4gKiBhdHJvcGEuYXJyYXlzLmludGVyc2VjdCh4LHkpO1xuICogLy8gcmV0dXJucyBbMSwxLDNdXG4gKiBAZXhhbXBsZVxuICogdmFyIG9iaiA9IHsnYVByb3AnIDogJ2FWYWwnfTtcbiAqIHZhciB4ID0gWzEsMyxvYmpdO1xuICogdmFyIHkgPSBbMywxLG9ial07XG4gKiBhdHJvcGEuYXJyYXlzLmludGVyc2VjdCh4LHkpO1xuICogLy8gcmV0dXJucyBbMSwzLHsnYVByb3AnIDogJ2FWYWwnfV1cbiAqIEBleGFtcGxlXG4gKiB2YXIgb2JqID0geydhUHJvcCcgOiAnYVZhbCd9O1xuICogdmFyIHggPSBbMSwzLHsnYVByb3AnIDogJ2FWYWwnfV07XG4gKiB2YXIgeSA9IFszLDEsb2JqXTtcbiAqIGF0cm9wYS5hcnJheXMuaW50ZXJzZWN0KHgseSk7XG4gKiAvLyByZXR1cm5zIFsxLDNdIGJlY2F1c2UgdGhlIHR3byBvYmplY3RzIGFyZSBub3QgdGhlIHNhbWUgb2JqZWN0LlxuICogQGV4YW1wbGVcbiAqIHZhciB4ID0gWzEsMyx7J2FQcm9wJyA6ICdhVmFsJ31dO1xuICogdmFyIHkgPSBbMywxLHsnYVByb3AnIDogJ2FWYWwnfV07XG4gKiBhdHJvcGEuYXJyYXlzLmludGVyc2VjdCh4LHkpO1xuICogLy8gcmV0dXJucyBbMSwzXSBiZWNhdXNlIHRoZSB0d28gb2JqZWN0cyBhcmUgbm90IHRoZSBzYW1lIG9iamVjdC5cbiAqL1xuYXRyb3BhLmFycmF5cy5pbnRlcnNlY3QgPSBmdW5jdGlvbiBpbnRlcnNlY3QoYXJyYXkxLCBhcnJheTIpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICB2YXIgc21hbGxBcnJheSwgbGFyZ2VBcnJheSwgaW50ZXJzZWN0aW9uID0gW107XG4gICAgaWYoYXJyYXkxLmxlbmd0aCA+IGFycmF5Mi5sZW5ndGgpIHtcbiAgICAgICAgbGFyZ2VBcnJheSA9IGFycmF5MS5zcGxpY2UoMCk7XG4gICAgICAgIHNtYWxsQXJyYXkgPSBhcnJheTIuc3BsaWNlKDApO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGxhcmdlQXJyYXkgPSBhcnJheTIuc3BsaWNlKDApO1xuICAgICAgICBzbWFsbEFycmF5ID0gYXJyYXkxLnNwbGljZSgwKTtcbiAgICB9XG4gICAgc21hbGxBcnJheS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIHZhciBpZHhJbkxhcmdlQXJyYXkgPSBsYXJnZUFycmF5LmluZGV4T2YoaXRlbSk7XG4gICAgICAgIGlmICgwIDw9IGlkeEluTGFyZ2VBcnJheSkgeyAvLyBoYXMgd29yZFxuICAgICAgICAgICAgaW50ZXJzZWN0aW9uLnB1c2gobGFyZ2VBcnJheS5zcGxpY2UoaWR4SW5MYXJnZUFycmF5LCAxKVswXSk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gaW50ZXJzZWN0aW9uO1xufTtcbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgZnJlcXVlbmN5IG9mIGl0ZW1zIG9jY3VycmluZyBpbiBhbiBhcnJheS5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAdmVyc2lvbiAyMDEzMDExOFxuICogQHBhcmFtIHtBcnJheX0gYXJyIFRoZSBhcnJheSB0byBjYWxjdWxhdGUgZnJlcXVlbmNpZXMgZnJvbS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYW4gb2JqZWN0IHdob3NlIGtleXMgYXJlIGVhY2ggdW5pcXVlXG4gKiAgZWxlbWVudHMgZnJvbSB0aGUgYXJyYXkgYW5kIHRoZWlyIHZhbHVlIGlzIHRoZWlyIGZyZXF1ZW5jeSBvZlxuICogIG9jY3VycmVuY2Ugd2l0aGluIHRoZSBhcnJheS4gQmUgY2FyZWZ1bCB0aGF0IHlvdXIgYXJyYXkgZG9lc1xuICogIG5vdCBjb250YWluIHZhbHVlcyBtYXRjaGluZyBvYmplY3QgaW5zdGFuY2UgcHJvcGVydHkgbmFtZXMuXG4gKiBAZXhhbXBsZVxuICogdmFyIHggPSBbMSwxLDEsMSwxLDMsM107XG4gKiBhdHJvcGEuYXJyYXlzLmdldEZyZXF1ZW5jeSh4KTtcbiAqIC8vIHJldHVybnMge1xuICogLy8gICAgIFwiMVwiOiA1LFxuICogLy8gICAgIFwiM1wiOiAyXG4gKiAvLyB9XG4gKiBAZXhhbXBsZVxuICogdmFyIHggPSBbXCJiaWxsXCIsIFwiZnJlZFwiLCBcImZyZWRcIiwgXCJqYW5lXCJdO1xuICogYXRyb3BhLmFycmF5cy5nZXRGcmVxdWVuY3koeCk7XG4gKiAvLyByZXR1cm5zIHtcbiAqIC8vICAgICBcImJpbGxcIjogMSxcbiAqIC8vICAgICBcImZyZWRcIjogMixcbiAqIC8vICAgICBcImphbmVcIjogMVxuICogLy8gfVxuICogQGV4YW1wbGVcbiAqIHZhciB4ID0gWzEsMyx7J2FQcm9wJyA6ICdhVmFsJ31dO1xuICogYXRyb3BhLmFycmF5cy5nZXRGcmVxdWVuY3koeCk7XG4gKiAvLyByZXR1cm5zIHtcbiAqIC8vICAgICBcIjFcIjogMSxcbiAqIC8vICAgICBcIjNcIjogMSxcbiAqIC8vICAgICBcIltvYmplY3QgT2JqZWN0XVwiOiAxXG4gKiAvLyB9XG4gKiBAZXhhbXBsZVxuICogdmFyIG9iaiA9IHsnYVByb3AnIDogJ2FWYWwnfTtcbiAqIHZhciBvdGhlck9iaiA9IHt9O1xuICogdmFyIHggPSBbMSwzLG9iaixvdGhlck9iaix7J2FEb3VnaG51dCcgOiAnc3ByaW5rbGVzJ31dO1xuICogYXRyb3BhLmFycmF5cy5nZXRGcmVxdWVuY3koeCk7XG4gKiAvLyByZXR1cm5zIHtcbiAqIC8vICAgICBcIjFcIjogMSxcbiAqIC8vICAgICBcIjNcIjogMSxcbiAqIC8vICAgICBcIltvYmplY3QgT2JqZWN0XVwiOiAzXG4gKiAvLyB9XG4gKiBAZXhhbXBsZVxuICogdmFyIHggPSBbMSwzLFwidG9TdHJpbmdcIl07XG4gKiBhdHJvcGEuYXJyYXlzLmdldEZyZXF1ZW5jeSh4KTtcbiAqIC8vIHJldHVybnMge1xuICogLy8gICAgIFwiMVwiOiAxLFxuICogLy8gICAgIFwiM1wiOiAxLFxuICogLy8gICAgIFwidG9TdHJpbmdcIjogXCJmdW5jdGlvbiB0b1N0cmluZygpIHtcXG4gICAgW25hdGl2ZSBjb2RlXVxcbn0xXCJcbiAqIC8vIH1cbiAqL1xuYXRyb3BhLmFycmF5cy5nZXRGcmVxdWVuY3kgPSBmdW5jdGlvbiAoYXJyKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgdmFyIG91dCA9IGFyci5yZWR1Y2UoZnVuY3Rpb24gKGFjYywgY3Vycikge1xuICAgICAgICBpZiAoYWNjW2N1cnJdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGFjY1tjdXJyXSA9IDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhY2NbY3Vycl0gKz0gMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYWNjO1xuICAgIH0sIHt9KTtcbiAgICByZXR1cm4gb3V0O1xufTtcbi8qKlxuICogR2V0cyBVbmlxdWUgdmFsdWVzIGZyb20gYW4gYXJyYXkuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQHZlcnNpb24gMjAxMzAxMThcbiAqIEBwYXJhbSB7QXJyYXl9IGxhcmdlQXJyYXkgVGhlIGFycmF5IHdpdGggZHVwbGljYXRlIHZhbHVlcyBpbiBpdC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBhIG5ldyBhcnJheSBjb250YWluaW5nIG9ubHkgdGhlIHVuaXF1ZVxuICogIHZhbHVlcyBmb3VuZCBpbiB0aGUgbGFyZ2VBcnJheS5cbiAqIEBleGFtcGxlXG4gKiB2YXIgeCA9IFsxLDEsMSw0LDQsMyw2XTtcbiAqIGF0cm9wYS5hcnJheXMuZ2V0VW5pcXVlKHgpO1xuICogLy8gcmV0dXJucyBbIFwiMVwiLCBcIjRcIiwgXCIzXCIsIFwiNlwiIF1cbiAqIEBleGFtcGxlXG4gKiB2YXIgeCA9IFtcImJpbGxcIiwgXCJmcmVkXCIsIFwiamFuZVwiLCBcImZyZWRcIl07XG4gKiBhdHJvcGEuYXJyYXlzLmdldFVuaXF1ZSh4KTtcbiAqIC8vIHJldHVybnMgW1wiYmlsbFwiLCBcImZyZWRcIiwgXCJqYW5lXCJdXG4gKiBAZXhhbXBsZVxuICogdmFyIHggPSBbIFxuICogICAgIFwiYmlsbFwiLFxuICogICAgIHtcImFQcm9wXCIgOiBcImFWYWx1ZVwifSxcbiAqICAgICB7XCJhR3V5XCIgOiBcImZyZWRcIn0sXG4gKiAgICAge1wiYUxhZHlcIiA6IFwiamFuZVwifVxuICogXTtcbiAqIGF0cm9wYS5hcnJheXMuZ2V0VW5pcXVlKHgpO1xuICogLy8gcmV0dXJucyBbIFwiYmlsbFwiLCBcIltvYmplY3QgT2JqZWN0XVwiIF1cbiAqL1xuYXRyb3BhLmFycmF5cy5nZXRVbmlxdWUgPSBmdW5jdGlvbiAobGFyZ2VBcnJheSkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhhdHJvcGEuYXJyYXlzLmdldEZyZXF1ZW5jeShsYXJnZUFycmF5KSkuc29ydCgpO1xufTtcbi8qKlxuICogUmVtb3ZlcyBlbXB0eSBzdHJpbmdzIGZyb20gdGhlIGdpdmVuIGFycmF5LlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAqIEB2ZXJzaW9uIDIwMTMwMTE4XG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheVdpdGhFbXB0eUVsZW1lbnRzIFRoZSBhcnJheSB3aXRoIGVtcHR5IHN0cmluZ3MgaW4gaXQuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYSBuZXcgYXJyYXkgd2l0aCBlbXB0eSBzdHJpbmdzIHJlbW92ZWQuXG4gKiBAZXhhbXBsZVxuICogdmFyIHggPSBbIDEwLCAsIDUsIFwiXCIsICcnLCA3IF07XG4gKiBjb25zb2xlLmxvZygnc3RhcnRpbmcgbGVuZ3RoICcgKyB4Lmxlbmd0aCk7XG4gKiBjb25zb2xlLmxvZyh4KTtcbiAqIHggPSBhdHJvcGEuYXJyYXlzLnJlbW92ZUVtcHR5RWxlbWVudHMoeCk7XG4gKiBjb25zb2xlLmxvZygnZW5kaW5nIGxlbmd0aCAnICsgeC5sZW5ndGgpO1xuICogY29uc29sZS5sb2coeCk7XG4gKiAvLyBkaXNwbGF5cyB0aGUgZm9sbG93aW5nXG4gKiAvLyBzdGFydGluZyBsZW5ndGggNlxuICogLy8gWzEwLCB1bmRlZmluZWQsIDUsIFwiXCIsIFwiXCIsIDddXG4gKiAvLyBlbmRpbmcgbGVuZ3RoIDNcbiAqIC8vIFsxMCwgNSwgN11cbiAqL1xuYXRyb3BhLmFycmF5cy5yZW1vdmVFbXB0eUVsZW1lbnRzID0gZnVuY3Rpb24gKGFycmF5V2l0aEVtcHR5RWxlbWVudHMpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICByZXR1cm4gYXJyYXlXaXRoRW1wdHlFbGVtZW50cy5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgcmV0dXJuICFhdHJvcGEuaW5xdWlyZS5pc0VtcHR5U3RyaW5nKGl0ZW0pO1xuICAgIH0pO1xufTtcbi8qKlxuICogUmVpbmRleGVzIGFuIGFycmF5LlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAqIEB2ZXJzaW9uIDIwMTMwMTE4XG4gKiBAcGFyYW0ge0FycmF5fSBhcnIgVGhlIGFycmF5IHdpdGggZGlzY29udGludW91cyBrZXlzLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGFuIGFycmF5IHdpdGggY29udGludW91cyBrZXlzLlxuICogQGV4YW1wbGVcbiAqIHZhciB4ID0gWyBcImFcIiwgXCJiXCIsIFwiY1wiLCB1bmRlZmluZWQgXTtcbiAqIGNvbnNvbGUubG9nKHgpOyAvLyBbIFwiYVwiLCBcImJcIiwgXCJjXCIsIHVuZGVmaW5lZCBdXG4gKiBjb25zb2xlLmxvZyh4Lmxlbmd0aCk7IC8vIDRcbiAqIFxuICogZGVsZXRlIHhbMV07IC8vIGRlbGV0ZXMgdGhlIGtleSBmcm9tIHRoZSBhcnJheSBidXRcbiAqICAgICAgICAgICAgICAvLyB0aGUgYXJyYXkgbGVuZ3RoIHJlbWFpbnMgdGhlIHNhbWVcbiAqICAgICAgICAgICAgICAvLyBhdCB0aGlzIHBvaW50IHRoZSBhcnJheXMga2V5cyBhcmUgMCwgMiwgYW5kIDNcbiAqIGNvbnNvbGUubG9nKHgpOyAvLyBbIFwiYVwiLCB1bmRlZmluZWQsIFwiY1wiLCB1bmRlZmluZWQgXVxuICogY29uc29sZS5sb2coeC5sZW5ndGgpOyAvLyA0XG4gKiBcbiAqIHggPSBhdHJvcGEuYXJyYXlzLnJlaW5kZXgoeCk7XG4gKiBjb25zb2xlLmxvZyh4KTsgLy8gIFsgXCJhXCIsIFwiY1wiLCB1bmRlZmluZWQgXVxuICogICAgLy8gbm90ZSB0aGF0IHRoZSBsYXN0IGVsZW1lbnQgZXhpc3RlZCBpbiB0aGUgYXJyYXksIGl0cyB2YWx1ZSB3YXNcbiAqICAgIC8vIHVuZGVmaW5lZCBidXQgaXQgZGlkIGhhdmUgYSBrZXkgc28gdGhlIGVsZW1lbnQgcmVtYWlucyBpbiB0aGUgYXJyYXkuXG4gKiAgICAvL1xuICogICAgLy8gVGhlIGRlbGV0ZWQgZWxlbWVudCB3YXMgaW4gZmFjdCBkZWxldGVkIGZyb20gdGhlIGFycmF5IHNvIHRoZXJlIHdhcyBub1xuICogICAgLy8ga2V5IHhbMV0gYXQgYWxsLCB3aGVuIHRyeWluZyB0byBhY2Nlc3MgdGhpcyBub24gZXhpc3RpbmcgZWxlbWVudCB0aGVcbiAqICAgIC8vIHZhbHVlIG9mIHVuZGVmaW5lZCB3YXMgcmV0dXJuZWQuIFRoaXMgYmVoYXZpb3IgaXMgY29uZnVzaW5nIHVubGVzcyB5b3VcbiAqICAgIC8vIHRoaW5rIGFib3V0IHRoZSBhcnJheWFzIGFuIG9iamVjdCB3aG9zZSBwcm9wZXJ0aWVzIGFyZSBuYW1lZCBieVxuICogICAgLy8gbnVtYmVycy4gQWNjZXNzaW5nIGFuIHVuZGVmaW5lZCBwcm9wZXJ0eSByZXR1cm5zIHVuZGVmaW5lZCByZWdhcmRsZXNzXG4gKiAgICAvLyBvZiB3aGV0aGVyIHRoZSBwcm9wZXJ0eSBleGlzdGVkIGluIHRoZSBwYXN0IG9yIG5vdC5cbiAqIGNvbnNvbGUubG9nKHgubGVuZ3RoKTsgLy8gM1xuICovXG5hdHJvcGEuYXJyYXlzLnJlaW5kZXggPSBmdW5jdGlvbiByZWluZGV4KGFycikge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIHZhciBpZHgsIG91dDtcbiAgICBvdXQgPSBbXTtcbiAgICBmb3IoaWR4IGluIGFycikge1xuICAgICAgICBpZihhcnIuaGFzT3duUHJvcGVydHkoaWR4KSkge1xuICAgICAgICAgICAgb3V0LnB1c2goYXJyW2lkeF0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvdXQ7XG59O1xuLyoqXG4gKiBTb3J0cyBhbiBhcnJheSdzIGVsZW1lbnRzIG51bWVyaWNhbGx5LlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAqIEB2ZXJzaW9uIDIwMTMwMTIwXG4gKiBAcGFyYW0ge0FycmF5fSBhcnIgVGhlIGFycmF5IHRvIHNvcnQuIEFsbCBlbGVtZW50cyBvZiB0aGUgYXJyYXkgbXVzdCBiZVxuICogIG51bWJlci1pc2guXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYW4gYXJyYXkgd2hvc2UgZWxlbWVudHMgYXJlIGluIG51bWVyaWMgb3JkZXIuXG4gKiBAZXhhbXBsZVxuICogdmFyIHggPSBbMywgMiwgOSwgMjYsIDEwLCAxLCA5OSwgMTVdO1xuICogY29uc29sZS5sb2coIGF0cm9wYS5hcnJheXMuc29ydE51bWVyaWNhbGx5KHgpICk7XG4gKiAvLyBsb2dzIFsxLCAyLCAzLCA5LCAxMCwgMTUsIDI2LCA5OV1cbiAqL1xuYXRyb3BhLmFycmF5cy5zb3J0TnVtZXJpY2FsbHkgPSBmdW5jdGlvbiBzb3J0TnVtZXJpY2FsbHkoYXJyKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgcmV0dXJuIGFyci5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgIHJldHVybiAoYSAtIGIpO1xuICAgIH0pO1xufTtcbi8qKlxuICogVGhyb3dzIGFuIGVycm9yLCA8Y29kZT5TdHJpbmcucHJvdG90eXBlLmxvY2FsZUNvbXBhcmU8L2NvZGU+IGlzIG5vdCBcbiAqICBzdGFuZGFyZGl6ZWQuXG4gKiBcbiAqICBZZXMsIGxvY2FsZUNvbXBhcmUgaXMgaW4gdGhlIHN0YW5kYXJkIGJ1dCwgYXQgdGhpcyB0aW1lIHRoZSBhY3R1YWxcbiAqICBjb21wYXJpc29uIGlzIGltcGxlbWVudGF0aW9uIGRlcGVuZGFudC4gVGhpcyBtZWFucyB0aGF0IFwiYWxwaGFiZXRpY2FsIG9yZGVyXCJcbiAqICBjYW4gYmUgZGlmZmVyZW50IG9uIGRpZmZlcmVudCBwbGF0Zm9ybXMuIFdoYXQgSSBmb3VuZCB3YXMgdGhhdCBpbiBub2RlIHRoZVxuICogIGFycmF5IG9mIDxjb2RlPlsnYScsJ1onLCdBJywneiddPC9jb2RlPiB3b3VsZCBiZSBzb3J0ZWQgdG9cbiAqICA8Y29kZT5bJ0EnLCdaJywnYScsJ3pcIl08L2NvZGU+LCB3aGlsZSBvblxuICogIGZpcmVmb3ggaXQgd291bGQgYmUgc29ydGVkIHRvIDxjb2RlPlsnYScsJ0EnLCd6JywnWiddPC9jb2RlPi4gV2hvIGtub3dzIGlmXG4gKiAgYW5vdGhlciBpbXBsZW1lbnRvciB3b3VsZCBzb3J0IGl0IDxjb2RlPlsnQScsJ2EnLCdaJywneiddPC9jb2RlPj9cbiAqIFxuICogSW4gb3JkZXIgdG8gcHJvdmlkZSBhIHJlbGlhYmxlIGltcGxlbWVudGF0aW9uIEkgd291bGQgaGF2ZSB0byBjcmVhdGUgbXkgb3duXG4gKiAgaW1wbGVtZW50YXRpb24gb2YgPGNvZGU+U3RyaW5nLnByb3RvdHlwZS5sb2NhbGVDb21wYXJlPC9jb2RlPiBhbmQgdGhhdCdzXG4gKiAganVzdCB0b28gbXVjaCB3b3JrIGZvciBtZSB0byBkbyBhbG9uZS5cbiAqIEB0aHJvd3Mge0Vycm9yfSBcIlN0cmluZy5wcm90b3R5cGUubG9jYWxlQ29tcGFyZSBpcyBub3Qgc3RhbmRhcmRpemVkXCJcbiAqL1xuYXRyb3BhLmFycmF5cy5zb3J0QWxwaGFiZXRpY2FsbHkgPSBmdW5jdGlvbiBzb3J0QWxwaGFiZXRpY2FsbHkoYXJyKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiU3RyaW5nLnByb3RvdHlwZS5sb2NhbGVDb21wYXJlIGlzIG5vdCBzdGFuZGFyZGl6ZWRcIik7XG59O1xuLyoqXG4gKiBEZWxldGVzIHRoZSBnaXZlbiBlbGVtZW50IGZyb20gdGhlIGFycmF5IGF0IHRoZSBnaXZlbiBpbmRleC4gSXQgYmFzaWNhbGx5XG4gKiAgZG9lcyB3aGF0IHlvdSB3b3VsZCBleHBlY3QgdGhlIGRlbGV0ZSBvcGVyYXRvciB0byBkbywgZXhjZXB0IHRoZSBkZWxldGVcbiAqICBvcGVyYXRvciBkb2Vzbid0IGRvIHdoYXQgeW91IHdvdWxkIGV4cGVjdC5cbiAqIEBwYXJhbSB7QXJyYXl9IGFyciBUaGUgYXJyYXkuXG4gKiBAcGFyYW0ge051bWJlcn0gaW5kZXggVGhlIGluZGV4IG9mIHRoZSBlbGVtZW50IHRvIGRlbGV0ZS5cbiAqIEByZXR1cm5zIFJldHVybnMgYW4gYXJyYXkgd2l0aCB0aGUgZWxlbWVudCByZW1vdmVkLCBjb250aWd1b3VzIGtleXMsIGFuZFxuICogIHdob3NlIGxlbmd0aCBpcyAxIGxlc3MgdGhhbiB0aGUgaW5wdXQgYXJyYXkuXG4gKi9cbmF0cm9wYS5hcnJheXMuZGVsZXRlRWxlbWVudCA9IGZ1bmN0aW9uIChhcnIsIGluZGV4KSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgZGVsZXRlIGFycltpbmRleF07XG4gICAgcmV0dXJuIGF0cm9wYS5hcnJheXMucmVpbmRleChhcnIpO1xufTtcblxuXG5cblxud2hpbGUoYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLmxlbmd0aCA+IDApIHtcbiAgICBhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMucG9wKCkoKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gYXRyb3BhO1xuIiwiYXJndW1lbnRzWzRdWzExXVswXS5hcHBseShleHBvcnRzLGFyZ3VtZW50cykiLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vZG9jcy92c2RvYy9PcGVuTGF5ZXJzQWxsLmpzXCIvPlxudmFyIGF0cm9wYSA9IHJlcXVpcmUoJ2F0cm9wYS1oZWFkZXInKTtcbmF0cm9wYS5BcmdzSW5mbyA9IHJlcXVpcmUoJ2F0cm9wYS1BcmdzSW5mbycpLkFyZ3NJbmZvO1xuLypqc2xpbnRcbiAgICBpbmRlbnQ6IDQsXG4gICAgbWF4ZXJyOiA1MCxcbiAgICB3aGl0ZTogdHJ1ZSxcbiAgICBicm93c2VyOiB0cnVlLFxuICAgIGRldmVsOiB0cnVlLFxuICAgIHBsdXNwbHVzOiB0cnVlLFxuICAgIHJlZ2V4cDogdHJ1ZVxuKi9cbi8qZ2xvYmFsIGF0cm9wYSAqL1xuLy8gZW5kIGhlYWRlclxuXG4oZnVuY3Rpb24gKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIGF0cm9wYS5yZXF1aXJlcyhcbiAgICAgICAgJ1JlcXVlc3RlcicsXG4gICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBzdXBwb3J0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgYXRyb3BhLkFyZ3NJbmZvLFxuICAgICAgICAgICAgICAgIFhNTEh0dHBSZXF1ZXN0XG4gICAgICAgICAgICBdLmZvckVhY2goZnVuY3Rpb24gKHByZXJlcXVpc2l0ZSkge1xuICAgICAgICAgICAgICAgIGlmKHByZXJlcXVpc2l0ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHN1cHBvcnRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHN1cHBvcnRlZDtcbiAgICAgICAgfVxuICAgICk7XG59KCkpO1xuXG4vKipcbiAqIFRoaXMgcmVwcmVzZW50cyBhbiBYTUxIdHRwUmVxdWVzdC5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAdmVyc2lvbiAyMDEzMDMxMVxuICogQGNsYXNzIFRoaXMgcmVwcmVzZW50cyBhbiBYTUxIdHRwUmVxdWVzdC5cbiAqIEByZXR1cm5zIHtSZXF1ZXN0ZXJ9IFJldHVybnMgYSByZXF1ZXN0ZXIgb2JqZWN0LlxuICogQHJlcXVpcmVzIGF0cm9wYS5BcmdzSW5mbyNjaGVja0FyZ1R5cGVzXG4gKiBAZXhhbXBsZVxuICogdmFyIHJlcXVlc3RlciwgZm9ybURhdGE7XG4gKiBcbiAqIHJlcXVlc3RlciA9IG5ldyBhdHJvcGEuUmVxdWVzdGVyKCk7XG4gKiByZXF1ZXN0ZXIudGltZW91dCA9IDEwMDAwOyAvLyByZXF1ZXN0cyB3aWxsIGFib3J0IGFmdGVyIDEwIHNlY29uZHMuXG4gKiByZXF1ZXN0ZXIucmVxdWVzdEhlYWRlcnMgPSB7XG4gKiAgICAgXCJhSGVhZGVyXCIgOiBcImhlYWRlclZhbHVlXCIsXG4gKiAgICAgXCJhbm90aGVySGVhZGVyXCIgOiBcImFuZFZhbHVlXCJcbiAqIH07XG4gKiBcbiAqIGZ1bmN0aW9uIHNob3dSZXF1ZXN0UmVzdWx0cyhzdGF0dXMsIHJlcXVlc3QpIHtcbiAqICAgICBjb25zb2xlLmxvZyhcIlN0YXR1czogJyArIHN0YXR1cyk7XG4gKiAgICAgY29uc29sZS5kaXIocmVxdWVzdCk7IC8vIGNvbnNvbGUgZGlyIG1heSBvciBtYXkgbm90XG4gKiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGJlIHN1cHBvcnRlZCBpbiB5b3VyIGVudmlyb25tZW50LlxuICogfVxuICogXG4gKiBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICogZm9ybURhdGEuYXBwZW5kKCdhRm9ybUZpZWxkTmFtZScsICdmb3JtRmllbGREYXRhJyk7XG4gKiBmb3JtRGF0YS5hcHBlbmQoJ2Fub3RoZXJGb3JtRmllbGROYW1lJywgJ2FuZERhdGEnKTtcbiAqIFxuICogcmVxdWVzdGVyLm1ha2VSZXF1ZXN0KFxuICogICAgIFwicG9zdFwiLCBcImh0dHA6Ly9leGFtcGxlLmNvbVwiLCBmb3JtRGF0YSwgc2hvd1JlcXVlc3RSZXN1bHRzKTtcbiAqL1xuYXRyb3BhLlJlcXVlc3RlciA9IGZ1bmN0aW9uIFJlcXVlc3RlcigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICBhdHJvcGEuc3VwcG9ydENoZWNrKCdSZXF1ZXN0ZXInKTtcbiAgICB2YXIgZXhwQXJnVHlwZXMsXG4gICAgICAgIGNoZWNrUmVxdWVzdCxcbiAgICAgICAgcmVxdWVzdDtcbiAgICBcbiAgICAvKipcbiAgICAgKiBDb250YWluZXIgb2JqZWN0IGZvciB0aGUgZXhwZWN0ZWQgYXJndW1lbnQgdHlwZXNcbiAgICAgKiBzdXBwbGllZCB0byB0aGlzLm1ha2VSZXF1ZXN0LlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHR5cGUgRXhwZWN0ZWQgQXJnIFR5cGVzXG4gICAgICogQGZpZWxkT2YgYXRyb3BhLlJlcXVlc3Rlci1cbiAgICAgKi9cbiAgICBleHBBcmdUeXBlcyA9IHt9O1xuICAgIGV4cEFyZ1R5cGVzLnJlcXVlc3RXaXRoTWVzc2FnZSA9IFsnc3RyaW5nJywgJ3N0cmluZycsICdzdHJpbmcnLCAnZnVuY3Rpb24nXTtcbiAgICBleHBBcmdUeXBlcy5yZXF1ZXN0TnVsbE1lc3NhZ2UgPSBbJ3N0cmluZycsICdzdHJpbmcnLCAnb2JqZWN0JywgJ2Z1bmN0aW9uJ107XG4gICAgXG4gICAgLyoqXG4gICAgICogVXNlZCB0byBjaGVjayB0aGUgYXJndW1lbnRzIHR5cGVzIHN1cHBsaWVkIHRvIHRoaXMubWFrZVJlcXVlc3QuXG4gICAgICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gICAgICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gICAgICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICAgICAqIEB2ZXJzaW9uIDIwMTIwOTA5XG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAbWV0aG9kT2YgYXRyb3BhLlJlcXVlc3Rlci1cbiAgICAgKiBAcGFyYW0ge0FyZ3VtZW50c30gYXJncyBBbiBhcmd1bWVudHMgYXJyYXlcbiAgICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIGFyZ3MgdHlwZXMgbWF0Y2ggdGhlXG4gICAgICogZXhwZWN0ZWQgdHlwZXMuXG4gICAgICogQHJlcXVpcmVzIGF0cm9wYS5BcmdzSW5mbyNjaGVja0FyZ1R5cGVzXG4gICAgICovXG4gICAgY2hlY2tSZXF1ZXN0ID0gZnVuY3Rpb24gKGFyZ3MpIHtcbiAgICAgICAgdmFyIGNoZWNrZXI7XG4gICAgICAgIGNoZWNrZXIgPSBuZXcgYXRyb3BhLkFyZ3NJbmZvKCk7XG4gICAgICAgIGNoZWNrZXIuc2V0RXhwZWN0ZWRBcmdUeXBlcyhleHBBcmdUeXBlcyk7XG4gICAgICAgIHJldHVybiBjaGVja2VyLmNoZWNrQXJnVHlwZXMoYXJncyk7XG4gICAgfTtcbiAgICBcbiAgICAvKipcbiAgICAgKiBPYmplY3Qgd2hvc2UgcHJvcGVydGllcyBhbmQgdmFsdWVzIGFyZSBoZWFkZXIgbmFtZXMgYW5kIHZhbHVlc1xuICAgICAqICByZXNwZWN0aXZlbHkuXG4gICAgICogQHR5cGUgT2JqZWN0XG4gICAgICogQGZpZWxkT2YgYXRyb3BhLlJlcXVlc3RlciNcbiAgICAgKi9cbiAgICB0aGlzLnJlcXVlc3RIZWFkZXJzID0ge307XG4gICAgXG4gICAgXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSB0aW1lb3V0IHZhbHVlIGZvciB0aGUgcmVxdWVzdCBpbiBtaWxsaXNlY29uZHMuIFRoZSByZXF1ZXN0IHdpbGxcbiAgICAgKiAgYWJvcnQgYWZ0ZXIgdGhpcyBhbW91bnQgb2YgdGltZSBoYXMgcGFzc2VkLlxuICAgICAqIEB0eXBlIE51bWJlclxuICAgICAqIEBmaWVsZE9mIGF0cm9wYS5SZXF1ZXN0ZXIjXG4gICAgICovXG4gICAgdGhpcy50aW1lb3V0ID0gMzAwMDA7XG4gICAgXG4gICAgLyoqXG4gICAgICogWE1MSHR0cFJlcXVlc3Qgb2JqZWN0IHVzZWQgYnkgUmVxdWVzdGVyLlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHR5cGUgWE1MSHR0cFJlcXVlc3RcbiAgICAgKiBAZmllbGRPZiBhdHJvcGEuUmVxdWVzdGVyLVxuICAgICAqL1xuICAgIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICByZXF1ZXN0LmFib3J0ZWQgPSBmYWxzZTtcbiAgICByZXF1ZXN0LmFib3J0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJlcXVlc3QuYWJvcnRlZCA9IHRydWU7XG4gICAgICAgIFhNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZS5hYm9ydC5jYWxsKHRoaXMpO1xuICAgIH07XG4gICAgXG4gICAgLyoqXG4gICAgICogTWFrZXMgYW4gQUpBWCByZXF1ZXN0LlxuICAgICAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICAgICAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICAgICAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAgICAgKiBAdmVyc2lvbiAyMDEzMDMxMVxuICAgICAqIEBtZXRob2RPZiBhdHJvcGEuUmVxdWVzdGVyI1xuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBtZXRob2QgVGhlIEhUVFAgbWV0aG9kIHRvIGJlIHVzZWQgZm9yIHRoaXMgcmVxdWVzdC5cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdXJsIFRoZSBVUkwgdG8gc2VuZCB0aGUgcmVxdWVzdCB0by5cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZUJvZHkgVGhlIGJvZHkgb2YgdGhlIHJlcXVlc3QuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGNhbGxiYWNrIFRoZSBjYWxsYmFjayBmdW5jdGlvbiB0byBleGVjdXRlXG4gICAgICogIHdoZW4gcmVhZHlTdGF0ZSBpcyA0LiBUaGUgY2FsbGJhY2sgaXMgc3VwcGxpZWQgd2l0aCB0d28gYXJndW1lbnRzLiBUaGVcbiAgICAgKiAgZmlyc3QgYXJndW1lbnQgaXMgYSBib29sZWFuIGluZGljYXRpbmcgd2hldGhlciBvciBub3QgdGhlIGh0dHAgc3RhdHVzXG4gICAgICogIHdhcyAyMDAuIFRoZSBzZWNvbmQgYXJndW1lbnQgaXMgdGhlIHJlcXVlc3Qgb2JqZWN0LlxuICAgICAqIEB0aHJvd3MgYXRyb3BhLlJlcXVlc3Rlci5tYWtlUmVxdWVzdCB1bmV4cGVjdGVkIGFyZ3VtZW50IHR5cGVcbiAgICAgKi9cbiAgICB0aGlzLm1ha2VSZXF1ZXN0ID0gZnVuY3Rpb24gKG1ldGhvZCwgdXJsLCBtZXNzYWdlQm9keSwgY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIGhkcjtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNoZWNrUmVxdWVzdChhcmd1bWVudHMpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2F0cm9wYS5SZXF1ZXN0ZXIubWFrZVJlcXVlc3QgdW5leHBlY3RlZCAnICtcbiAgICAgICAgICAgICAgICAnYXJndW1lbnQgdHlwZScpO1xuICAgICAgICB9XG4gICAgICAgIHJlcXVlc3QuYWJvcnRlZCA9IGZhbHNlO1xuICAgICAgICByZXF1ZXN0Lm9wZW4obWV0aG9kLCB1cmwsIHRydWUpO1xuICAgICAgICBmb3IgKGhkciBpbiB0aGlzLnJlcXVlc3RIZWFkZXJzKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5yZXF1ZXN0SGVhZGVycy5oYXNPd25Qcm9wZXJ0eShoZHIpKSB7XG4gICAgICAgICAgICAgICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKGhkciwgdGhpcy5yZXF1ZXN0SGVhZGVyc1toZHJdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEV2ZW50IGxpc3RlbmVyIGZ1bmN0aW9uIGZvciB0aGUgQUpBWCByZXF1ZXN0LlxuICAgICAgICAgKiBUaGlzIGlzIHdoYXQgYWN0dWFsbHkgZmlyZXMgdGhlIGNhbGxiYWNrIHN1cHBsaWVkXG4gICAgICAgICAqIHRvIG1ha2VSZXF1ZXN0LlxuICAgICAgICAgKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAgICAgICAgICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gICAgICAgICAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAgICAgICAgICogQHZlcnNpb24gMjAxMjA5MDlcbiAgICAgICAgICogQG1ldGhvZE9mIGF0cm9wYS5SZXF1ZXN0ZXItcmVxdWVzdFxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgcmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAocmVxdWVzdC5yZWFkeVN0YXRlID09PSA0KSB7XG4gICAgICAgICAgICAgICAgaWYgKHJlcXVlc3Quc3RhdHVzID09PSAyMDApIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sodHJ1ZSwgcmVxdWVzdCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soZmFsc2UsIHJlcXVlc3QpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcmVxdWVzdC5zZW5kKG1lc3NhZ2VCb2R5KTtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAocmVxdWVzdC5hYm9ydGVkID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHJlcXVlc3QuYWJvcnQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdGhpcy50aW1lb3V0KTtcbiAgICB9O1xufTtcblxuXG5cblxud2hpbGUoYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLmxlbmd0aCA+IDApIHtcbiAgICBhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMucG9wKCkoKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gYXRyb3BhO1xuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2RvY3MvdnNkb2MvT3BlbkxheWVyc0FsbC5qc1wiLz5cbnZhciBhdHJvcGEgPSByZXF1aXJlKCdhdHJvcGEtaGVhZGVyJyk7XG5hdHJvcGEuUmVxdWVzdGVyID0gcmVxdWlyZSgnYXRyb3BhLVJlcXVlc3RlcicpLlJlcXVlc3RlcjtcbmF0cm9wYS5IVE1MUGFyc2VyID0gcmVxdWlyZSgnYXRyb3BhLUhUTUxQYXJzZXInKS5IVE1MUGFyc2VyO1xuLypqc2xpbnRcbiAgICBpbmRlbnQ6IDQsXG4gICAgbWF4ZXJyOiA1MCxcbiAgICB3aGl0ZTogdHJ1ZSxcbiAgICBicm93c2VyOiB0cnVlLFxuICAgIGRldmVsOiB0cnVlLFxuICAgIHBsdXNwbHVzOiB0cnVlLFxuICAgIHJlZ2V4cDogdHJ1ZVxuKi9cbi8qZ2xvYmFsIGF0cm9wYSAqL1xuLy8gZW5kIGhlYWRlclxuXG5hdHJvcGEucmVxdWlyZXMoXG4gICAgJ0NyZWF0ZUh0bWxEb2N1bWVudHNGcm9tWG1saHR0cCcsXG4gICAgZnVuY3Rpb24gKCkge1xuICAgICAgICBcInVzZSBzdHJpY3RcIjtcbiAgICAgICAgdmFyIHN1cHBvcnRlZCA9IHRydWU7XG4gICAgICAgIFxuICAgICAgICBbXG4gICAgICAgICAgICBhdHJvcGEuUmVxdWVzdGVyLFxuICAgICAgICAgICAgYXRyb3BhLkhUTUxQYXJzZXJcbiAgICAgICAgXS5mb3JFYWNoKGZ1bmN0aW9uIChwcmVyZXF1aXNpdGUpIHtcbiAgICAgICAgICAgIGlmKHByZXJlcXVpc2l0ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgc3VwcG9ydGVkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gc3VwcG9ydGVkO1xuICAgIH1cbik7XG5cbi8qKlxuICogQ3JlYXRlcyBIVE1MIERPTSBEb2N1bWVudHMgZnJvbSBhbiBYTUxIdHRwUmVxdWVzdCBvYmplY3QuXG4gKiAgVGhpcyB3YXMgdGVzdGVkIG9uIEZpcmVmb3gsIGl0IGRvZXNuJ3Qgd29yayBvbiBnb29nbGUgY2hyb21lLlxuICogIFlvdXIgbWlsZWFnZSBtYXkgdmFyeS5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAdmVyc2lvbiAyMDEzMDIyNVxuICogQGNsYXNzIENyZWF0ZXMgSFRNTCBET00gRG9jdW1lbnRzIGZyb20gYW4gWE1MSHR0cFJlcXVlc3Qgb2JqZWN0LlxuICogQHJlcXVpcmVzIGF0cm9wYS5SZXF1ZXN0ZXJcbiAqIEByZXF1aXJlcyBhdHJvcGEuSFRNTFBhcnNlclxuICogQHJlcXVpcmVzIGF0cm9wYS5kYXRhXG4gKiBAZXhhbXBsZVxuICogdmFyIG1ldGhvZCwgdXJsLCBjYWxsYmFjaywgZG9jcztcbiAqIFxuICogLy8gSFRUUCBSZXF1ZXN0IG1ldGhvZFxuICogbWV0aG9kID0gJ2dldCc7XG4gKiBcbiAqIC8vIHRoZSBwYWdlIHRvIGZldGNoLCB0aGlzIHBhZ2UgbXVzdCBiZSBhY2Nlc3NpYmxlXG4gKiAvLyBzZWN1cml0eSByZXN0cmljdGlvbnMgbWF5IGFwcGx5XG4gKiB1cmwgPSAnZG9jcy9qc2RvYy9zeW1ib2xzL2F0cm9wYS54cGF0aC5odG1sJztcbiAqIFxuICogLy8gdGhlIGNhbGxiYWNrIGZ1bnRpb24gZm9yIHdoZW4gYSBuZXcgZG9jdW1lbnQgaXMgY3JlYXRlZFxuICogY2FsbGJhY2sgPSBmdW5jdGlvbiBuZXdEb2N1bWVudEhhbmRsZXIoZG9jcmVmKSB7XG4gKiAgICAgdHJ5IHtcbiAqICAgICAgICAgaWYgKGZhbHNlID09PSBkb2NyZWYpIHtcbiAqICAgICAgICAgICAgIC8vIGlmIHRoZSBkb2N1bWVudCBjb3VsZCBub3QgYmUgY3JlYXRlZCB0aHJvdyBhbiBlcnJvclxuICogICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdhdHJvcGEuQ3JlYXRlSHRtbERvY3VtZW50c0Zyb21YbWxodHRwICcgK1xuICogICAgICAgICAgICAgICAgICAnQ291bGQgbm90IGNyZWF0ZSBoaWRkZW4gZG9jdW1lbnQnKTtcbiAqICAgICAgICAgfSBlbHNlIHtcbiAqICAgICAgICAgICAgIC8vIGlmIHRoZSBkb2N1bWVudCBjb3VsZCBiZSBjcmVhdGVkIHdlJ2xsIHRyeSB0byB1c2UgaXRcbiAqICAgICAgICAgICAgIGlmKGRvY3JlZi5nZXRFbGVtZW50QnlJZCgnaW5kZXgnKSkge1xuICogICAgICAgICAgICAgICAgIC8vIGlmIHRoZSBkb2N1bWVudCBjb3VsZCBiZSB1c2VkIHRoZW5cbiAqICAgICAgICAgICAgICAgICAvLyBkbyBzb21ldGhpbmcgdXNlZnVsIHdpdGggaXQuXG4gKiAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3N1Y2Nlc3MhJyk7XG4gKiAgICAgICAgICAgICB9IGVsc2Uge1xuICogICAgICAgICAgICAgICAgIC8vIGlmIHRoZSBkb2N1bWVudCBjYW4gbm90IGJlIHVzZWQgdGhyb3cgYW4gZXJyb3JcbiAqICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2F0cm9wYS5DcmVhdGVIdG1sRG9jdW1lbnRzRnJvbVhtbGh0dHAgJyArXG4gKiAgICAgICAgICAgICAgICAgICAgICAnY291bGQgbm90IHVzZSB0aGUgaGlkZGVuIGRvY3VtZW50Jyk7XG4gKiAgICAgICAgICAgICB9XG4gKiAgICAgICAgIH1cbiAqICAgICB9IGNhdGNoIChlKSB7XG4gKiAgICAgICAgIC8vIGNhdGNoaW5nIGFueSBlcnJvcnMgdGhyb3duIGFuZCBoYW5kbGUgdGhlbS5cbiAqICAgICB9XG4gKiAgICAgLy8gQXQgdGhpcyBwb2ludCB0aGUgd29yayB3aXRoIHRoZSBkb2N1bWVudCBpcyBjdXJyZW50bHkgZmluaXNoZWRcbiAqICAgICAvLyB0aGUgZG9jdW1lbnQgd2lsbCBsaXZlIGluIHRoZSBkb2N1bWVudFF1ZXVlIGluIGNhc2UgeW91IG5lZWQgaXRcbiAqICAgICAvLyBsYXRlci4gVGhpcyBpcyB3aGVuIHlvdSB3aWxsIHRyaWdnZXIgYW55IGZ1bmN0aW9uIHdoaWNoIGRlcGVuZHNcbiAqICAgICAvLyBvbiB0aGlzIGhpZGRlbiBkb2N1bWVudCBoYXZpbmcgYmVlbiBjcmVhdGVkLlxuICogICAgIHNob3dEb2N1bWVudFF1ZXVlKCk7XG4gKiB9O1xuICogXG4gKiBmdW5jdGlvbiBzaG93RG9jdW1lbnRRdWV1ZSgpIHtcbiAqICAgICBjb25zb2xlLmRpcihkb2NzLmRvY3VtZW50UXVldWUpO1xuICogfVxuICogXG4gKiAvLyBjcmVhdGUgYW4gaW5zdGFuY2Ugb2YgdGhlIGNsYXNzXG4gKiBkb2NzID0gbmV3IGF0cm9wYS5DcmVhdGVIdG1sRG9jdW1lbnRzRnJvbVhtbGh0dHAoKTtcbiAqIC8vIHRyeSB0byBjcmVhdGUgYSBuZXcgaGlkZGVuIGRvY3VtZW50XG4gKiBkb2NzLm5ld0RvY3VtZW50KG1ldGhvZCwgdXJsLCBudWxsLCBjYWxsYmFjayk7XG4gKi9cbmF0cm9wYS5DcmVhdGVIdG1sRG9jdW1lbnRzRnJvbVhtbGh0dHAgPSBmdW5jdGlvbiBDcmVhdGVIdG1sRG9jdW1lbnRzRnJvbVhtbGh0dHAoXG4pIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICB2YXIgcmVxdWVzdGVyLFxuICAgIGh0bWxkb2N1bWVudCxcbiAgICB0aGF0O1xuICAgIHRoYXQgPSB0aGlzO1xuICAgIC8qKlxuICAgICAqIFF1ZXVlIG9mIGRvY3VtZW50cyBjcmVhdGVkIGJ5IHRoaXMgaW5zdGFuY2UuXG4gICAgICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gICAgICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gICAgICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICAgICAqIEB2ZXJzaW9uIDIwMTIwOTA5XG4gICAgICogQHR5cGUgQXJyYXlcbiAgICAgKiBAZmllbGRPZiBhdHJvcGEuQ3JlYXRlSHRtbERvY3VtZW50c0Zyb21YbWxodHRwI1xuICAgICAqL1xuICAgIHRoaXMuZG9jdW1lbnRRdWV1ZSA9IFtdO1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW4gSFRNTCBET00gRG9jdW1lbnQgYW5kIHB1dHMgaXQgaW4gdGhlIGRvY3VtZW50XG4gICAgICogIHF1ZXVlLCB0aGVuIGV4ZWN1dGVzIHRoZSBjYWxsYmFjayBnaXZlbi4gTm90ZSwgdGhpcyBkb2VzXG4gICAgICogIG5vdCB3b3JrIG9uIGdvb2dsZSBjaHJvbWUuXG4gICAgICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gICAgICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gICAgICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICAgICAqIEB2ZXJzaW9uIDIwMTIwOTA5XG4gICAgICogQG1ldGhvZE9mIGF0cm9wYS5DcmVhdGVIdG1sRG9jdW1lbnRzRnJvbVhtbGh0dHAjXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG1ldGhvZCBBbnkgdmFsaWQgbWV0aG9kIHRvIGJlIHVzZWQgaW5cbiAgICAgKiBhbiBYTUxIdHRwUmVxdWVzdC5cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdXJsIFRoZSBsb2NhdGlvbiBvZiB0aGUgZG9jdW1lbnQncyBzb3VyY2UuXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VCb2R5IG51bGwsIG9yIGEgbWVzc2FnZSBib2R5LlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIFRoZSBmdW5jdGlvbiB0byBleGVjdXRlIHVwb25cbiAgICAgKiByZXF1ZXN0IGNvbXBsZXRpb24uIFRoaXMgZnVuY3Rpb24gd2lsbCBiZSBnaXZlbiBlaXRoZXJcbiAgICAgKiBhbiBIVE1MIERPTSBEb2N1bWVudCBvciBmYWxzZS5cbiAgICAgKiBAcmV0dXJucyB7SFRNTCBET00gRG9jdW1lbnQsIGZhbHNlfSBUaGUgcmV0dXJuIHZhbHVlIGlzXG4gICAgICogZ2l2ZW4gdG8gdGhlIGNhbGxiYWNrIGZ1bmN0aW9uLlxuICAgICAqL1xuICAgIHRoaXMubmV3RG9jdW1lbnQgPSBmdW5jdGlvbiBuZXdEb2N1bWVudChcbiAgICAgICAgbWV0aG9kLCB1cmwsIG1lc3NhZ2VCb2R5LCBjYWxsYmFja1xuICAgICkge1xuICAgICAgICB2YXIgY2I7XG4gICAgICAgIC8qXG4gICAgICAgICAqIEludGVybmFsIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIHByb2Nlc3MgZGF0YSBmcm9tIFhNTEh0dHBSZXF1ZXN0XG4gICAgICAgICAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICAgICAgICAgKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAgICAgICAgICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICAgICAgICAgKiBAdmVyc2lvbiAyMDEyMDkwOVxuICAgICAgICAgKiBAbWV0aG9kT2YgYXRyb3BhLkNyZWF0ZUh0bWxEb2N1bWVudHNGcm9tWG1saHR0cCNuZXdEb2N1bWVudC1cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICogQHByb3BlcnR5IHt0cnVlLGZhbHNlfSBib29sU3RhdHVzIFRoaXMgdGVsbHMgd2hldGhlciBvciBub3QgdGhlXG4gICAgICAgICAqICBYTUxIdHRwUmVxdWVzdCB3YXMgc3VjY2Vzc2Z1bC5cbiAgICAgICAgICogQHByb3BlcnR5IHtYTUxIdHRwIFJlc3BvbnNlIE9iamVjdH0gcmVzcG9uc2VPYmplY3QgVGhpcyBpcyB0aGVcbiAgICAgICAgICogIHJlc3BvbnNlIG9iamVjdCBmcm9tIHRoZSBYTUxIdHRwIFJlcXVlc3Qgb2JqZWN0LlxuICAgICAgICAgKi9cbiAgICAgICAgY2IgPSBmdW5jdGlvbiAoYm9vbFN0YXR1cywgcmVzcG9uc2VPYmplY3QpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmIChib29sU3RhdHVzID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGZhbHNlICE9PSBodG1sZG9jdW1lbnQubG9hZFN0cmluZyhcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2VPYmplY3QucmVzcG9uc2VUZXh0KSlcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGh0bWxkb2N1bWVudC5kb2M7XG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZG9jdW1lbnRRdWV1ZS5wdXNoKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBib29sU3RhdHVzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FsbGJhY2socmVzdWx0KTtcbiAgICAgICAgfTtcbiAgICAgICAgcmVxdWVzdGVyLm1ha2VSZXF1ZXN0KG1ldGhvZCwgdXJsLCBtZXNzYWdlQm9keSwgY2IpO1xuICAgIH07XG4gICAgXG4gICAgXG4gICAgZnVuY3Rpb24gaW5pdCAoKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhdHJvcGEuc3VwcG9ydENoZWNrKCdDcmVhdGVIdG1sRG9jdW1lbnRzRnJvbVhtbGh0dHAnKTtcbiAgICAgICAgICAgIHJlcXVlc3RlciA9IG5ldyBhdHJvcGEuUmVxdWVzdGVyKCk7XG4gICAgICAgICAgICBodG1sZG9jdW1lbnQgPSBuZXcgYXRyb3BhLkhUTUxQYXJzZXIoKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgYXRyb3BhLmRhdGEuQ3JlYXRlSHRtbERvY3VtZW50c0Zyb21YbWxodHRwLnN1cHBvcnQgPSAndW5zdXBwb3J0ZWQnO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGF0cm9wYS5kYXRhLkNyZWF0ZUh0bWxEb2N1bWVudHNGcm9tWG1saHR0cC5lcnJvcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgaW5pdCgpO1xufTtcblxuXG5cblxud2hpbGUoYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLmxlbmd0aCA+IDApIHtcbiAgICBhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMucG9wKCkoKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gYXRyb3BhO1xuIiwiYXJndW1lbnRzWzRdWzMxXVswXS5hcHBseShleHBvcnRzLGFyZ3VtZW50cykiLCJhcmd1bWVudHNbNF1bMTFdWzBdLmFwcGx5KGV4cG9ydHMsYXJndW1lbnRzKSIsImFyZ3VtZW50c1s0XVszOV1bMF0uYXBwbHkoZXhwb3J0cyxhcmd1bWVudHMpIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2RvY3MvdnNkb2MvT3BlbkxheWVyc0FsbC5qc1wiLz5cbnZhciBhdHJvcGEgPSByZXF1aXJlKCdhdHJvcGEtaGVhZGVyJyk7XG4vKmpzbGludCBcbiAgICBpbmRlbnQ6IDQsXG4gICAgbWF4ZXJyOiA1MCxcbiAgICB3aGl0ZTogdHJ1ZSxcbiAgICBicm93c2VyOiB0cnVlLFxuICAgIGRldmVsOiB0cnVlLFxuICAgIHBsdXNwbHVzOiB0cnVlLFxuICAgIHJlZ2V4cDogdHJ1ZVxuKi9cbi8qZ2xvYmFsIGF0cm9wYSAqL1xuLy8gZW5kIGhlYWRlclxuXG4vKipcbiAqIEEgcG9sbGluZyBjbGFzcyBkZXNpZ25lZCBmb3IgZXhlY3V0aW5nIGxvbmcgcnVubmluZyBwcm9jZXNzZXMgdGhhdCByZXR1cm5cbiAqICBub3RoaW5nIGFuZCBoYXZlIG5vIGNhbGxiYWNrIHBhcmFtZXRlci5cbiAqIEBjbGFzcyBBIHBvbGxpbmcgY2xhc3MgZGVzaWduZWQgZm9yIGV4ZWN1dGluZyBsb25nIHJ1bm5pbmcgcHJvY2Vzc2VzIHRoYXRcbiAqICByZXR1cm4gbm90aGluZyBhbmQgaGF2ZSBubyBjYWxsYmFjayBwYXJhbWV0ZXIuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQHZlcnNpb24gMjAxMzAyMjBcbiAqIEBwYXJhbSB7U3RyaW5nfSBhY3Rvck5hbWUgVGhlIG5hbWUgZm9yIHRoZSBTZXJpYWxBY3RvciBpbnN0YW5jZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGFjdG9yRnVuY3Rpb24gVGhlIGZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGVcbiAqICBTZXJpYWxBY3RvciBpcyBmcmVlLiBUaGlzIGZ1bmN0aW9uIG11c3QgY2FsbCB0aGUgPGNvZGU+ZnJlZTwvY29kZT4gZnVuY3Rpb25cbiAqICB3aGVuIGl0IGlzIGZpbmlzaGVkIGluIG9yZGVyIHRvIGFsbG93IHRoZSBhY3RvciB0byBjb250aW51ZS5cbiAqIEByZXR1cm5zIHthdHJvcGEuU2VyaWFsQWN0b3J9IFJldHVybnMgYW4gPGNvZGU+YXRyb3BhLlNlcmlhbEFjdG9yPC9jb2RlPlxuICogIGluc3RhbmNlLlxuICogQGV4YW1wbGVcbiAqIGZ1bmN0aW9uIGR1bW15QWN0b3IoKXtcbiAqICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gKiAgICAgY29uc29sZS5sb2coJ2FjdG9yRnVuY3Rpb24gd291bGQgZXhlY3V0ZScpO1xuICogICAgIGNvbnNvbGUubG9nKCdmcmVlaW5nICcgKyB0aGlzLm5hbWUgKyAnIGluIDEwMDAwIG1zJyk7XG4gKiAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe3RoYXQuZnJlZSgpO30sIDEwMDAwKTtcbiAqIH07XG4gKiB2YXIgYWN0b3IgPSBuZXcgYXRyb3BhLlNlcmlhbEFjdG9yKCdkdW1teScsIGR1bW15QWN0b3IpO1xuICogICAgIC8vIGNoYW5nZSB0aGUgbmFtZSBvZiB0aGUgYWN0b3IgZnJvbVxuICogICAgIC8vIGR1bW15IHRvIGF3ZXNvbWVcbiAqIGFjdG9yLm5hbWUgPSBcImF3ZXNvbWVcIjtcbiAqICAgICAvLyBzZXQgdGhlIHBvbGxpbmcgaW50ZXJ2YWwgKG1pbGxpc2Vjb25kcylcbiAqIGFjdG9yLmludGVydmFsID0gMzAwMDtcbiAqICAgICAvLyBzZXQgdGhlIGJsb2NraW5nIHRpbWVvdXQgdmFsdWUgKG1pbGxpc2Vjb25kcylcbiAqIGFjdG9yLmJsb2NrVGltZW91dFZhbHVlID0gMTIwMDAwO1xuICogICAgIC8vIHN0YXJ0IHBvbGxpbmdcbiAqIGFjdG9yLnN0YXJ0KCk7XG4gKiAgICAgLy8gZHluYW1pY2FsbHkgY2hhbmdlIHRoZSBTZXJpYWxBY3RvclxuICogc2V0VGltZW91dChmdW5jdGlvbigpe1xuICogICAgIC8vIGNoYW5nZSB0aGUgcG9sbGluZyBpbnRlcnZhbFxuICogICAgIC8vIHdoaWxlIHRoZSBTZXJpYWxBY3RvciBpcyBydW5uaW5nLlxuICogICAgIGFjdG9yLmNoYW5nZUludGVydmFsKDIwMDApO1xuICogICAgICAgICAvLyBjaGFuZ2UgdGhlIGFjdG9yIGZ1bmN0aW9uXG4gKiAgICAgYWN0b3IuYWN0b3JGdW5jdGlvbiA9IGZ1bmN0aW9uKCkge1xuICogICAgICAgICBjb25zb2xlLmxvZygnbmV3IGFjdG9yRnVuY3Rpb24gZXhlY3V0aW5nJyk7XG4gKiAgICAgICAgIGNvbnNvbGUubG9nKCdmcmVlaW5nICcgKyB0aGlzLm5hbWUgKyAnIGltbWVkaWF0ZWx5Jyk7XG4gKiAgICAgICAgIHRoaXMuZnJlZSgpO1xuICogICAgIH07XG4gKiB9LDEwMDAwKTtcbiAqL1xuYXRyb3BhLlNlcmlhbEFjdG9yID0gZnVuY3Rpb24oYWN0b3JOYW1lLCBhY3RvckZ1bmN0aW9uKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgdmFyIHRoYXQsIGR1bW15QWN0b3I7XG4gICAgLyoqXG4gICAgICogUmVmZXJlbmNlIHRvIDxjb2RlPnRoaXM8L2NvZGU+XG4gICAgICogQGZpZWxkT2YgYXRyb3BhLlNlcmlhbEFjdG9yLVxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHR5cGUge09iamVjdH1cbiAgICAgKi9cbiAgICB0aGF0ID0gdGhpcztcbiAgICAvKipcbiAgICAgKiBEZWZhdWx0IGFjdG9yRnVuY3Rpb25cbiAgICAgKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAgICAgKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAgICAgKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gICAgICogQHZlcnNpb24gMjAxMzAyMjBcbiAgICAgKiBAbWV0aG9kT2YgYXRyb3BhLlNlcmlhbEFjdG9yLVxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHNlZSBhdHJvcGEuU2VyaWFsQWN0b3IjYWN0b3JGdW5jdGlvblxuICAgICAqIEBleGFtcGxlXG4gICAgICogZHVtbXlBY3RvciA9IGZ1bmN0aW9uKCl7XG4gICAgICogICAgIGNvbnNvbGUubG9nKCdhY3RvckZ1bmN0aW9uIHdvdWxkIGV4ZWN1dGUnKTtcbiAgICAgKiAgICAgY29uc29sZS5sb2coJ2ZyZWVpbmcgU2VyaWFsIEFjdG9yIGluIDEwMDAwIG1zJyk7XG4gICAgICogICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXt0aGF0LmZyZWUoKTt9LCAxMDAwMCk7XG4gICAgICogfTtcbiAgICAgKi9cbiAgICBkdW1teUFjdG9yID0gZnVuY3Rpb24oKXtcbiAgICAgICAgY29uc29sZS5sb2coJ2FjdG9yRnVuY3Rpb24gd291bGQgZXhlY3V0ZScpO1xuICAgICAgICBjb25zb2xlLmxvZygnZnJlZWluZyBTZXJpYWwgQWN0b3IgaW4gMTAwMDAgbXMnKTtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe3RoYXQuZnJlZSgpO30sIDEwMDAwKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRoZSBuYW1lIG9mIHRoaXMgaW5zdGFuY2UuIERlZmF1bHRzIHRvIFwiU2VyaWFsQWN0b3JcIlxuICAgICAqIEBmaWVsZE9mIGF0cm9wYS5TZXJpYWxBY3RvciNcbiAgICAgKiBAdHlwZSBTdHJpbmdcbiAgICAgKiBAZGVmYXVsdCBcIlNlcmlhbEFjdG9yXCJcbiAgICAgKi9cbiAgICB0aGlzLm5hbWUgPSBhdHJvcGEuc2V0QXNPcHRpb25hbEFyZygnU2VyaWFsQWN0b3InLCBhY3Rvck5hbWUpO1xuICAgIC8qKlxuICAgICAqIFBvbGxpbmcgaW50ZXJ2YWwgaW4gbWlsbGlzZWNvbmRzLiBUaGlzIGRldGVybWluZXMgaG93IGZyZXF1ZW50bHkgdGhlXG4gICAgICogIGFjdG9yIGZ1bmN0aW9uIHdpbGwgdHJ5IHRvIGV4ZWN1dGUuIERlZmF1bHRzIHRvIDEwMCBtaWxsaXNlY29uZHMuXG4gICAgICogQGZpZWxkT2YgYXRyb3BhLlNlcmlhbEFjdG9yI1xuICAgICAqIEB0eXBlIE51bWJlclxuICAgICAqIEBkZWZhdWx0IDEwMFxuICAgICAqL1xuICAgIHRoaXMuaW50ZXJ2YWwgPSAxMDA7IC8vIG1pbGxpc2Vjb25kc1xuICAgIC8qKlxuICAgICAqIFRoZSBpZCBvZiB0aGUgaW50ZXJ2YWwgc2V0IHRvIHBvbGwgdGhlIGFjdG9yLiBZb3Ugc2hvdWxkIG5vdCBjaGFuZ2VcbiAgICAgKiAgdGhpcyBtYW51YWxseSwgdXNlIHRoZSBzdGFydCBhbmQgc3RvcCBmdW5jdGlvbnMgaW5zdGVhZC4gRGVmYXVscyB0b1xuICAgICAqICB1bmRlZmluZWQuXG4gICAgICogQGZpZWxkT2YgYXRyb3BhLlNlcmlhbEFjdG9yI1xuICAgICAqIEB0eXBlIE51bWJlclxuICAgICAqIEBkZWZhdWx0IHVuZGVmaW5lZFxuICAgICAqL1xuICAgIHRoaXMuaW50ZXJ2YWxJZCA9IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBUaGUgc3RhdGUgb2YgdGhlIFNlcmlhbEFjdG9yLiBJZiB0cnVlLCB0aGUgYWN0b3Igd2lsbCBzbGVlcC4gSWYgZmFsc2UgdGhlXG4gICAgICogIGFjdG9yIHdpbGwgZXhlY3V0ZSB0aGUgYWN0b3IgZnVuY3Rpb24gd2hlbiBuZXh0IHBvbGxlZC4gRGVmYXVsdHMgdG9cbiAgICAgKiAgZmFsc2UuXG4gICAgICogQGZpZWxkT2YgYXRyb3BhLlNlcmlhbEFjdG9yI1xuICAgICAqIEB0eXBlIEJvb2xlYW5cbiAgICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgICAqL1xuICAgIHRoaXMuYmxvY2tlZCA9IGZhbHNlO1xuICAgIC8qKlxuICAgICAqIFN0b3JlcyBpZCdzIG9mIGN1cnJlbnRseSBydW5uaW5nIHRpbWVvdXQgZnVuY3Rpb25zIHVzZWQgdG8gZnJlZSB0aGUgYWN0b3JcbiAgICAgKiAgaWYgaXQgaGFzIGJlZW4gYmxvY2tlZCBmb3IgdG9vIGxvbmcuXG4gICAgICogQGZpZWxkT2YgYXRyb3BhLlNlcmlhbEFjdG9yI1xuICAgICAqIEBzZWUgYXRyb3BhLlNlcmlhbEFjdG9yI2Jsb2NrVGltZW91dFZhbHVlXG4gICAgICogQHR5cGUgQXJyYXlcbiAgICAgKiBAZGVmYXVsdCBbXVxuICAgICAqL1xuICAgIHRoaXMudGltZW91dHMgPSBbXTtcbiAgICAvKipcbiAgICAgKiBUaGUgbWF4aW11bSB0aW1lLCBpbiBtaWxsaXNlY29uZHMsIHdoaWNoIHRoZSBhY3RvciBtYXkgYmUgYmxvY2tlZCBmb3IuXG4gICAgICogIEFmdGVyIHRoaXMgZHVyYXRpb24gaGFzIGJlZW4gcmVhY2hlZCB0aGUgYWN0b3Igd2lsbCBiZSBmcmVlZC4gRGVmYXVsdHNcbiAgICAgKiAgdG8gNjAgc2Vjb25kcy5cbiAgICAgKiBAZmllbGRPZiBhdHJvcGEuU2VyaWFsQWN0b3IjXG4gICAgICogQHR5cGUgTnVtYmVyXG4gICAgICogQGRlZmF1bHQgNjAwMDBcbiAgICAgKi9cbiAgICB0aGlzLmJsb2NrVGltZW91dFZhbHVlID0gNjAwMDA7XG4gICAgLyoqXG4gICAgICogVGhlIGZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgU2VyaWFsQWN0b3IgaXMgZnJlZS4gVGhpcyBmdW5jdGlvblxuICAgICAqICBtdXN0IGNhbGwgdGhlIDxjb2RlPmZyZWU8L2NvZGU+IGZ1bmN0aW9uIHdoZW4gaXQgaXMgZmluaXNoZWQgaW4gb3JkZXIgdG9cbiAgICAgKiAgYWxsb3cgdGhlIGFjdG9yIHRvIGNvbnRpbnVlLiBEZWZhdWx0cyB0byB0aGUgPGNvZGU+ZHVtbXlBY3RvcjwvY29kZT5cbiAgICAgKiAgZnVuY3Rpb24uXG4gICAgICogQGZpZWxkT2YgYXRyb3BhLlNlcmlhbEFjdG9yI1xuICAgICAqIEB0eXBlIEZ1bmN0aW9uXG4gICAgICogQGRlZmF1bHQgZHVtbXlBY3RvclxuICAgICAqIEBzZWUgYXRyb3BhLlNlcmlhbEFjdG9yLWR1bW15QWN0b3JcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGR1bW15QWN0b3IgPSBmdW5jdGlvbigpe1xuICAgICAqICAgICBjb25zb2xlLmxvZygnYWN0b3JGdW5jdGlvbiB3b3VsZCBleGVjdXRlJyk7XG4gICAgICogICAgIGNvbnNvbGUubG9nKCdmcmVlaW5nIFNlcmlhbCBBY3RvciBpbiAxMDAwMCBtcycpO1xuICAgICAqICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7dGhhdC5mcmVlKCk7fSwgMTAwMDApO1xuICAgICAqIH07XG4gICAgICovXG4gICAgdGhpcy5hY3RvckZ1bmN0aW9uID0gYXRyb3BhLnNldEFzT3B0aW9uYWxBcmcoZHVtbXlBY3RvciwgYWN0b3JGdW5jdGlvbik7XG4gICAgLyoqXG4gICAgICogVGhlIGFjdGlvbiBmdW5jdGlvbiBpcyBjYWxsZWQgd2hlbiB0aGUgYWN0b3IgaXMgcG9sbGVkIGFuZCBpdCdzIGJsb2NrZWRcbiAgICAgKiAgc3RhdGUgaXMgZmFsc2UuIFRoaXMgbWV0aG9kIHNob3VsZCBub3QgYmUgc2V0IG9yIGNhbGxlZCBtYW51YWxseSwgc2V0XG4gICAgICogIHRoZSA8Y29kZT5hY3RvckZ1bmN0aW9uPC9jb2RlPiBpbnN0ZWFkLlxuICAgICAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICAgICAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICAgICAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAgICAgKiBAdmVyc2lvbiAyMDEzMDIyMFxuICAgICAqIEBtZXRob2RPZiBhdHJvcGEuU2VyaWFsQWN0b3IjXG4gICAgICogQHNlZSBhdHJvcGEuU2VyaWFsQWN0b3IjYWN0b3JGdW5jdGlvblxuICAgICAqL1xuICAgIHRoaXMuYWN0aW9uID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmKGZhbHNlID09PSB0aGF0LmJsb2NrZWQpIHtcbiAgICAgICAgICAgIHRoYXQuYmxvY2soKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdGhhdC5hY3RvckZ1bmN0aW9uKCk7XG4gICAgICAgICAgICB9LCAxMCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGF0Lm5hbWUgKyAnIHNsZWVwaW5nIGZvciAnICsgdGhhdC5pbnRlcnZhbCArICcgbXMnKTtcbiAgICAgICAgfVxuICAgIH07XG59O1xuLyoqXG4gKiBQcmV2ZW50cyB0aGUgYWN0b3IgZnJvbSBleGVjdXRpbmcgaXQncyBhY3RvckZ1bmN0aW9uLiBUaGlzIGJsb2NrIHdpbGwgdGltZW91dFxuICogIG9uY2UgdGhlIDxjb2RlPmJsb2NrVGltZW91dFZhbHVlPC9jb2RlPiBoYXMgYmVlbiByZWFjaGVkLlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAqIEB2ZXJzaW9uIDIwMTMwMjIwXG4gKiBAbWV0aG9kT2YgYXRyb3BhLlNlcmlhbEFjdG9yI1xuICogQHJldHVybnMge0Jvb2xlYW59IFJldHVybnMgdGhlIHZhbHVlIG9mIHRoaXMgaW5zdGFuY2VzIDxjb2RlPmJsb2NrZWQ8L2NvZGU+XG4gKiAgcHJvcGVydHkuXG4gKiBAc2VlIGF0cm9wYS5TZXJpYWxBY3RvciNibG9ja2VkXG4gKiBAZXhhbXBsZVxuICogZnVuY3Rpb24gZCgpIHtcbiAqICAgICBjb25zb2xlLmxvZygnZG9pbmcgc3R1ZmYgdG8gdGhpbmdzJyk7XG4gKiAgICAgdGhpcy5mcmVlKCk7XG4gKiB9XG4gKiBcbiAqIHZhciBhY3RvciA9IG5ldyBhdHJvcGEuU2VyaWFsQWN0b3IoJ2R1bW15JywgZCk7XG4gKiBhY3Rvci5pbnRlcnZhbCA9IDIwMDA7XG4gKiBhY3Rvci5ibG9ja1RpbWVvdXRWYWx1ZSA9IDUwMDA7XG4gKiBhY3Rvci5zdGFydCgpO1xuICogLy8gNSBzZWNvbmRzIGFmdGVyIHN0YXJ0aW5nIHRoZSBhY3RvciB3aWxsIGJlIGJsb2NrZWQuXG4gKiAvLyBJdCB3aWxsIHJlbWFpbiBibG9ja2VkIHVudGlsIHRoZSBibG9jayB0aW1lb3V0IGlzIHJlYWNoZWQuXG4gKiBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICogICAgIGNvbnNvbGUubG9nKCdibG9ja2luZyEhIScpO1xuICogICAgIGFjdG9yLmJsb2NrKCk7XG4gKiB9LCA1MDAwKTtcbiAqL1xuYXRyb3BhLlNlcmlhbEFjdG9yLnByb3RvdHlwZS5ibG9jayA9IGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICBjb25zb2xlLmxvZyh0aGlzLm5hbWUgKyAnIGJsb2NrJyk7XG4gICAgdGhpcy5ibG9ja2VkID0gdHJ1ZTtcbiAgICB0aGlzLnRpbWVvdXRzLnB1c2goXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7dGhhdC5ibG9ja1RpbWVvdXQoKTt9LCB0aGF0LmJsb2NrVGltZW91dFZhbHVlKSk7XG4gICAgcmV0dXJuIHRoaXMuYmxvY2tlZDtcbn07XG4vKipcbiAqIENhbGxlZCB3aGVuIHRoZSA8Y29kZT5ibG9ja1RpbWVvdXRWYWx1ZTwvY29kZT4gaGFzIGJlZW4gcmVhY2hlZC4gVGhpcyBmcmVlc1xuICogIHRoZSBhY3RvciBhbmQgcmVtb3ZlcyB0aGUgdGltZW91dCByZWZlcmVuY2UgZnJvbSB0aGUgdGltZW91dHMgYXJyYXkuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQHZlcnNpb24gMjAxMzAyMjBcbiAqIEBtZXRob2RPZiBhdHJvcGEuU2VyaWFsQWN0b3IjXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gUmV0dXJucyB0aGUgdmFsdWUgb2YgdGhpcyBpbnN0YW5jZXMgPGNvZGU+YmxvY2tlZDwvY29kZT5cbiAqICBwcm9wZXJ0eS5cbiAqIEBzZWUgYXRyb3BhLlNlcmlhbEFjdG9yI2Jsb2NrZWRcbiAqL1xuYXRyb3BhLlNlcmlhbEFjdG9yLnByb3RvdHlwZS5ibG9ja1RpbWVvdXQgPSBmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICBjb25zb2xlLmxvZyh0aGlzLm5hbWUgKyAnIGJsb2NrIHRpbWVvdXQnKTtcbiAgICByZXR1cm4gdGhpcy5mcmVlKCk7XG59O1xuLyoqXG4gKiBGcmVlcyB0aGUgYWN0b3Igc28gaXQgbWF5IGV4ZWN1dGUgaXRzIGFjdG9yIGZ1bmN0aW9uIHdoZW4gbmV4dCBwb2xsZWQuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQHZlcnNpb24gMjAxMzAyMjBcbiAqIEBtZXRob2RPZiBhdHJvcGEuU2VyaWFsQWN0b3IjXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gUmV0dXJucyB0aGUgdmFsdWUgb2YgdGhpcyBpbnN0YW5jZXMgPGNvZGU+YmxvY2tlZDwvY29kZT5cbiAqICBwcm9wZXJ0eS5cbiAqIEBzZWUgYXRyb3BhLlNlcmlhbEFjdG9yI2Jsb2NrZWRcbiAqIEBleGFtcGxlXG4gKiBmdW5jdGlvbiBkKCkge1xuICogICAgIGNvbnNvbGUubG9nKCdkb2luZyBzdHVmZiB0byB0aGluZ3MnKTtcbiAqICAgICB0aGlzLmZyZWUoKTtcbiAqIH1cbiAqIFxuICogdmFyIGFjdG9yID0gbmV3IGF0cm9wYS5TZXJpYWxBY3RvcignZHVtbXknLCBkKTtcbiAqIGFjdG9yLmludGVydmFsID0gMjAwMDtcbiAqIGFjdG9yLmJsb2NrVGltZW91dFZhbHVlID0gNTAwMDA7XG4gKiBhY3Rvci5zdGFydCgpO1xuICogYWN0b3IuYmxvY2soKTtcbiAqIC8vIDUgc2Vjb25kcyBhZnRlciBzdGFydGluZyB0aGUgYWN0b3Igd2lsbCBiZSBmcmVlZC5cbiAqIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gKiAgICAgYWN0b3IuZnJlZSgpO1xuICogfSwgNTAwMCk7XG4gKi9cbmF0cm9wYS5TZXJpYWxBY3Rvci5wcm90b3R5cGUuZnJlZSA9IGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIGNvbnNvbGUubG9nKHRoaXMubmFtZSArICcgZnJlZScpO1xuICAgIHRoaXMuYmxvY2tlZCA9IGZhbHNlO1xuICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXRzLnNoaWZ0KCkpO1xuICAgIHJldHVybiB0aGlzLmJsb2NrZWQ7XG59O1xuLyoqXG4gKiBTdGFydHMgcG9sbGluZyB0aGUgYWN0b3IuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQHZlcnNpb24gMjAxMzAyMjBcbiAqIEBtZXRob2RPZiBhdHJvcGEuU2VyaWFsQWN0b3IjXG4gKiBAcGFyYW0ge051bWJlcn0gaW50ZXJ2YWwgT3B0aW9uYWwuIFRoZSBwb2xsaW5nIGludGVydmFsLiBEZWZhdWx0cyB0byB0aGVcbiAqICB2YWx1ZSBvZiA8Y29kZT50aGlzLmludGVydmFsPC9jb2RlPlxuICogQHNlZSBhdHJvcGEuU2VyaWFsQWN0b3IjaW50ZXJ2YWxcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IFJldHVybnMgdGhlIHZhbHVlIG9mIHRoaXMgaW5zdGFuY2Unc1xuICogIDxjb2RlPmludGVydmFsSWQ8L2NvZGU+IHByb3BlcnR5LlxuICogQHNlZSBhdHJvcGEuU2VyaWFsQWN0b3IjaW50ZXJ2YWxJZFxuICogQGV4YW1wbGVcbiAqIHZhciBhY3RvciA9IG5ldyBhdHJvcGEuU2VyaWFsQWN0b3IoJ2R1bW15Jyk7XG4gKiBhY3Rvci5zdGFydCgpO1xuICovXG5hdHJvcGEuU2VyaWFsQWN0b3IucHJvdG90eXBlLnN0YXJ0ID0gZnVuY3Rpb24oaW50ZXJ2YWwpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgdGhpcy5pbnRlcnZhbCA9IGF0cm9wYS5zZXRBc09wdGlvbmFsQXJnKHRoaXMuaW50ZXJ2YWwsIGludGVydmFsKTtcbiAgICBcbiAgICBpZih0aGlzLmludGVydmFsSWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAvLyBjbGVhciB0aGUgb2xkIHRpbWVvdXQgYmVmb3JlIGNyZWF0aW5nIGEgbmV3IG9uZS5cbiAgICAgICAgdGhpcy5zdG9wKCk7XG4gICAgfVxuICAgIHRoaXMuaW50ZXJ2YWxJZCA9IHNldEludGVydmFsKHRoYXQuYWN0aW9uLCB0aGF0LmludGVydmFsKTtcbiAgICBjb25zb2xlLmxvZyh0aGlzLm5hbWUgKyAnIHN0YXJ0ZWQnKTtcbiAgICByZXR1cm4gdGhpcy5pbnRlcnZhbElkO1xufTtcbi8qKlxuICogQWRqdXN0cyB0aGUgcG9sbGluZyBpbnRlcnZhbCBhZnRlciA8Y29kZT5zdGFydDwvY29kZT4gaGFzXG4gKiBiZWVuIGNhbGxlZC5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAdmVyc2lvbiAyMDEzMDIyMFxuICogQG1ldGhvZE9mIGF0cm9wYS5TZXJpYWxBY3RvciNcbiAqIEBwYXJhbSB7TnVtYmVyfSBpbnRlcnZhbCBUaGUgbmV3IHBvbGxpbmcgaW50ZXJ2YWwgaW4gbWlsbGlzZWNvbmRzLlxuICogQHJldHVybnMge051bWJlcn0gUmV0dXJucyB0aGUgdmFsdWUgb2YgdGhpcyBpbnN0YW5jZSdzIFxuICogIDxjb2RlPmludGVydmFsSWQ8L2NvZGU+IHByb3BlcnR5LlxuICogQHNlZSBhdHJvcGEuU2VyaWFsQWN0b3IjaW50ZXJ2YWxJZFxuICogQGV4YW1wbGVcbiAqIHZhciBhY3RvciA9IG5ldyBhdHJvcGEuU2VyaWFsQWN0b3IoJ2R1bW15Jyk7XG4gKiBhY3Rvci5zdGFydCgpO1xuICogICAgIC8vIDUgc2Vjb25kcyBhZnRlciBzdGFydGluZyB0aGUgcG9sbGluZyBpbnRlcnZhbCB3aWxsIGJlIGNoYW5nZWQuXG4gKiBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gKiAgICAgYWN0b3IuY2hhbmdlSW50ZXJ2YWwoMjAwMCk7XG4gKiB9LCA1MDAwKTtcbiAqL1xuYXRyb3BhLlNlcmlhbEFjdG9yLnByb3RvdHlwZS5jaGFuZ2VJbnRlcnZhbCA9IGZ1bmN0aW9uKGludGVydmFsKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgY29uc29sZS5sb2codGhpcy5uYW1lICsgJyBjaGFuZ2luZyBpbnRlcnZhbCcpO1xuICAgIHJldHVybiB0aGlzLnN0YXJ0KGludGVydmFsKTtcbn07XG4vKipcbiAqIFN0b3BzIHBvbGxpbmcgdGhlIGFjdG9yLiBOb3RlIHRoYXQgdGhlIGFjdG9yIHdpbGwgYmUgZnJlZWQgb25jZSB0aGVcbiAqICA8Y29kZT5ibG9ja1RpbWVvdXRWYWx1ZTwvY29kZT4gaGFzIGJlZW4gcmVhY2hlZC4gVGhpcyB3aWxsIG5vdCByZXN0YXJ0IHRoZVxuICogIHBvbGxpbmcuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQHZlcnNpb24gMjAxMzAyMjBcbiAqIEBtZXRob2RPZiBhdHJvcGEuU2VyaWFsQWN0b3IjXG4gKiBAc2VlIGF0cm9wYS5TZXJpYWxBY3RvciNibG9ja2VkXG4gKiBAc2VlIGF0cm9wYS5TZXJpYWxBY3RvciNibG9ja1RpbWVvdXRWYWx1ZVxuICogQGV4YW1wbGVcbiAqIHZhciBhY3RvciA9IG5ldyBhdHJvcGEuU2VyaWFsQWN0b3IoJ2R1bW15Jyk7XG4gKiBhY3Rvci5zdGFydCgpO1xuICogICAgIC8vIDUgc2Vjb25kcyBhZnRlciBzdGFydGluZyB0aGUgYWN0b3Igd2lsbCBiZSBzdG9wcGVkLlxuICogc2V0VGltZW91dChmdW5jdGlvbigpe1xuICogICAgIGFjdG9yLnN0b3AoKTtcbiAqIH0sIDUwMDApO1xuICovXG5hdHJvcGEuU2VyaWFsQWN0b3IucHJvdG90eXBlLnN0b3AgPSBmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWxJZCk7XG4gICAgdGhpcy5pbnRlcnZhbElkID0gdW5kZWZpbmVkO1xuICAgIGNvbnNvbGUubG9nKHRoaXMubmFtZSArICcgc3RvcHBlZCcpO1xufTtcblxuXG5cblxud2hpbGUoYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLmxlbmd0aCA+IDApIHtcbiAgICBhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMucG9wKCkoKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gYXRyb3BhO1xuIiwiYXJndW1lbnRzWzRdWzVdWzBdLmFwcGx5KGV4cG9ydHMsYXJndW1lbnRzKSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9kb2NzL3ZzZG9jL09wZW5MYXllcnNBbGwuanNcIi8+XG52YXIgYXRyb3BhID0gcmVxdWlyZSgnYXRyb3BhLWhlYWRlcicpO1xuLypqc2xpbnRcbiAgICBpbmRlbnQ6IDQsXG4gICAgbWF4ZXJyOiA1MCxcbiAgICB3aGl0ZTogdHJ1ZSxcbiAgICBicm93c2VyOiB0cnVlLFxuICAgIGRldmVsOiB0cnVlLFxuICAgIHBsdXNwbHVzOiB0cnVlLFxuICAgIHJlZ2V4cDogdHJ1ZVxuKi9cbi8qZ2xvYmFsIGF0cm9wYSAqL1xuLy8gZW5kIGhlYWRlclxuXG4vKipcbiAqIFNldCBkZWZhdWx0IHZhbHVlcyBmb3Igb3B0aW9uYWwgZnVuY3Rpb24gcGFyYW1ldGVycy5cbiAqIEBleGFtcGxlXG4gKiA8cHJlPlxuICogICAvLyBUbyBzZXQgYSBkZWZhdWx0IHZhbHVlIGZvciBhbiBvcHRpb25hbCBwYXJhbWV0ZXJcbiAqICAgZnVuY3Rpb24ob3B0aW9uYWxBcmcpIHtcbiAqICAgICAgIHZhciBkZWZhdWx0VmFsID0gJ2hlbGxvIHRoZXJlISc7XG4gKiAgICAgICBvcHRpb25hbEFyZyA9IGF0cm9wYS5zZXRBc09wdGlvbmFsQXJnKGRlZmF1bHRWYWwsIG9wdGlvbmFsQXJnKTtcbiAqICAgICAgIHJldHVybiBvcHRpb25hbEFyZztcbiAqICAgfVxuICogPC9wcmU+XG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQHZlcnNpb24gMjAxMjA5MDlcbiAqIEBwYXJhbSB7TWl4ZWR9IGRlZmF1bHRWYWwgVGhlIGRlZmF1bHQgdmFsdWUgdG8gc2V0LlxuICogQHBhcmFtIHtNaXhlZH0gb3B0aW9uYWxBcmcgQSByZWZlcmVuY2UgdG8gdGhlIG9wdGlvbmFsIGFyZ3VtZW50LlxuICogQHJldHVybnMge01peGVkfSBSZXR1cm5zIHRoZSBkZWZhdWx0IHZhbHVlIHN1cHBsaWVkIHdoZW4gdGhlIG9wdGlvbmFsXG4gKiBhcmd1bWVudCBpcyB1bmRlZmluZWQgb3IgbnVsbC4gT3RoZXJ3aXNlLCB0aGUgc3VwcGxpZWQgb3B0aW9uYWwgYXJndW1lbnRcbiAqIGlzIHJldHVybmVkLlxuICovXG5hdHJvcGEuc2V0QXNPcHRpb25hbEFyZyA9IGZ1bmN0aW9uIChkZWZhdWx0VmFsLCBvcHRpb25hbEFyZykge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIGlmIChvcHRpb25hbEFyZyA9PT0gdW5kZWZpbmVkIHx8IG9wdGlvbmFsQXJnID09PSBudWxsKSB7XG4gICAgICAgIG9wdGlvbmFsQXJnID0gZGVmYXVsdFZhbDtcbiAgICB9XG4gICAgcmV0dXJuIG9wdGlvbmFsQXJnO1xufTtcblxuXG5cblxud2hpbGUoYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLmxlbmd0aCA+IDApIHtcbiAgICBhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMucG9wKCkoKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gYXRyb3BhO1xuIiwiYXJndW1lbnRzWzRdWzVdWzBdLmFwcGx5KGV4cG9ydHMsYXJndW1lbnRzKSIsImFyZ3VtZW50c1s0XVsyMl1bMF0uYXBwbHkoZXhwb3J0cyxhcmd1bWVudHMpIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL2RvY3MvdnNkb2MvT3BlbkxheWVyc0FsbC5qc1wiLz5cbnZhciBhdHJvcGEgPSByZXF1aXJlKCdhdHJvcGEtaGVhZGVyJyk7XG5hdHJvcGEuc3RyaW5nID0gcmVxdWlyZSgnYXRyb3BhLXN0cmluZycpLnN0cmluZztcbmF0cm9wYS5hcnJheXMgPSByZXF1aXJlKCdhdHJvcGEtYXJyYXlzJykuYXJyYXlzO1xuYXRyb3BhLnNldEFzT3B0aW9uYWxBcmcgPSByZXF1aXJlKCdhdHJvcGEtc2V0QXNPcHRpb25hbEFyZycpLnNldEFzT3B0aW9uYWxBcmc7XG4vKmpzbGludFxuICAgIGluZGVudDogNCxcbiAgICBtYXhlcnI6IDUwLFxuICAgIHdoaXRlOiB0cnVlLFxuICAgIGJyb3dzZXI6IHRydWUsXG4gICAgZGV2ZWw6IHRydWUsXG4gICAgcGx1c3BsdXM6IHRydWUsXG4gICAgcmVnZXhwOiB0cnVlLFxuICAgIHZhcnM6IHRydWVcbiovXG4vKmdsb2JhbCBhdHJvcGEgKi9cbi8vIGVuZCBoZWFkZXJcblxuKGZ1bmN0aW9uICgpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICBhdHJvcGEucmVxdWlyZXMoXG4gICAgICAgICdUZXh0QW5hbHl6ZXInLFxuICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgc3VwcG9ydGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIGF0cm9wYS5zdHJpbmcsXG4gICAgICAgICAgICAgICAgYXRyb3BhLmFycmF5cyxcbiAgICAgICAgICAgICAgICBhdHJvcGEuc2V0QXNPcHRpb25hbEFyZ1xuICAgICAgICAgICAgXS5mb3JFYWNoKGZ1bmN0aW9uIChwcmVyZXF1aXNpdGUpIHtcbiAgICAgICAgICAgICAgICBpZihwcmVyZXF1aXNpdGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBzdXBwb3J0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBzdXBwb3J0ZWQ7XG4gICAgICAgIH1cbiAgICApO1xufSgpKTtcblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgdXRpbGl0eSBmb3IgYW5hbHl6aW5nIHRleHQuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQHZlcnNpb24gMjAxMzAzMTFcbiAqIEBjbGFzcyBSZXByZXNlbnRzIGEgdXRpbGl0eSBmb3IgYW5hbHl6aW5nIHRleHQuXG4gKiBAcGFyYW0ge1N0cmluZ30gdGV4dCBUaGUgdGV4dCB0byBhbmFseXplLlxuICogQHJldHVybnMge1RleHRBbmFseXplcn0gUmV0dXJucyBhbiBpbnN0YW5jZSBvZiB0aGUgdGV4dCBhbmFseXplci5cbiAqIEByZXF1aXJlcyBhdHJvcGEuc3RyaW5nXG4gKiBAcmVxdWlyZXMgYXRyb3BhLmFycmF5c1xuICogQHJlcXVpcmVzIGF0cm9wYS5zZXRBc09wdGlvbmFsQXJnXG4gKi9cbmF0cm9wYS5UZXh0QW5hbHl6ZXIgPSBmdW5jdGlvbiBUZXh0QW5hbHl6ZXIodGV4dCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICB2YXIgY29uc3RydWN0O1xuICAgIC8qKlxuICAgICogVGhlIHN1cHBsaWVkIHRleHQuIERlZmF1bHRzIHRvIGFuIGVtcHR5IHN0cmluZy5cbiAgICAqIEB0eXBlIFN0cmluZ1xuICAgICogQGZpZWxkT2YgYXRyb3BhLlRleHRBbmFseXplciNcbiAgICAqL1xuICAgIHRoaXMudGV4dCA9IFN0cmluZyhhdHJvcGEuc2V0QXNPcHRpb25hbEFyZygnJywgdGV4dCkpO1xuICAgIC8qKlxuICAgICogR2l2ZXMgdGhlIGNvdW50IG9mIHdvcmRzIGluIHRoZSB0ZXh0LiBEZWZhdWx0cyB0byAwLlxuICAgICogQHR5cGUgTnVtYmVyXG4gICAgKiBAZmllbGRPZiBhdHJvcGEuVGV4dEFuYWx5emVyI1xuICAgICovXG4gICAgdGhpcy53b3JkQ291bnQgPSAwO1xuICAgIC8qKlxuICAgICogQW4gYXJyYXkgb2YgZXZlcnkgd29yZCBpbiB0aGUgc3VwcGxpZWQgdGV4dC5cbiAgICAqICBEZWZhdWx0cyB0byBhbiBlbXB0eSBhcnJheS5cbiAgICAqIEB0eXBlIEFycmF5XG4gICAgKiBAZmllbGRPZiBhdHJvcGEuVGV4dEFuYWx5emVyI1xuICAgICovXG4gICAgdGhpcy53b3JkcyA9IFtdO1xuICAgIC8qKlxuICAgICogU2V0cyB0aGUgYmFzaWMgcHJvcGVydGllcyBvZiB0aGUgdGV4dCBhbmFseXplci5cbiAgICAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICAgICogTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAgICAqIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICAgICogQHByaXZhdGVcbiAgICAqIEB2ZXJzaW9uIDIwMTMwMzExXG4gICAgKiBAbWV0aG9kT2YgYXRyb3BhLlRleHRBbmFseXplci1cbiAgICAqL1xuICAgIGNvbnN0cnVjdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgYXRyb3BhLnN1cHBvcnRDaGVjaygnVGV4dEFuYWx5emVyJyk7XG4gICAgICAgIHRoYXQudGV4dCA9IGF0cm9wYS5zdHJpbmcuY29udmVydEVvbCh0aGF0LnRleHQsICdcXG4nKTtcbiAgICAgICAgdGhhdC53b3JkQ291bnQgPSBhdHJvcGEuc3RyaW5nLmNvdW50V29yZHModGhhdC50ZXh0KTtcbiAgICAgICAgdGhhdC53b3JkcyA9IGF0cm9wYS5zdHJpbmcuZ2V0V29yZHModGhhdC50ZXh0KTtcbiAgICB9O1xuICAgIFxuICAgIGNvbnN0cnVjdCgpO1xuICAgIHJldHVybiB0aGlzO1xufTtcbi8qKlxuICogR2V0cyBhbiBpbmRleCBvZiB0aGUgdGV4dC5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAdmVyc2lvbiAyMDEzMDExOFxuICogQG1ldGhvZE9mIGF0cm9wYS5UZXh0QW5hbHl6ZXIjXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYW4gYXJyYXkgb2YgdW5pcXVlIHZhbHVlc1xuICogIGRlcml2ZWQgZnJvbSB0aGUgdGV4dCBnaXZlbi5cbiAqL1xuYXRyb3BhLlRleHRBbmFseXplci5wcm90b3R5cGUuZ2V0SW5kZXggPSBmdW5jdGlvbiAoKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgdGhpcy53b3JkcyA9IGF0cm9wYS5hcnJheXMucmVpbmRleCh0aGlzLndvcmRzKTtcbiAgICByZXR1cm4gYXRyb3BhLmFycmF5cy5nZXRVbmlxdWUodGhpcy53b3Jkcyk7XG59O1xuLyoqXG4gKiBHZXQgdGhlIGZyZXF1ZW5jeSBkYXRhIGZvciBlYWNoIHVuaXF1ZSB3b3JkIGluXG4gKiAgdGhlIHRleHQuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQHZlcnNpb24gMjAxMzAxMThcbiAqIEBtZXRob2RPZiBhdHJvcGEuVGV4dEFuYWx5emVyI1xuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBhbiBvYmplY3Qgd2hvc2Uga2V5cyBhcmVcbiAqICB0aGUgdW5pcXVlIHdvcmRzIGZyb20gdGhlIGdpdmVuIHRleHQgYW5kIHdob3NlXG4gKiAgdmFsdWVzIGFyZSB0aGUgY291bnQgb2YgZWFjaCB3b3JkcyBvY2N1cnJlbmNlLlxuICovXG5hdHJvcGEuVGV4dEFuYWx5emVyLnByb3RvdHlwZS5nZXRXb3JkRnJlcXVlbmN5ID0gZnVuY3Rpb24gKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIHRoaXMud29yZHMgPSBhdHJvcGEuYXJyYXlzLnJlaW5kZXgodGhpcy53b3Jkcyk7XG4gICAgcmV0dXJuIGF0cm9wYS5hcnJheXMuZ2V0RnJlcXVlbmN5KHRoaXMud29yZHMpO1xufTtcbi8qKlxuICogR2V0cyBwaHJhc2VzIG9mIHRoZSBzcGVjaWZpZWQgbGVuZ3RoIGZyb20gdGhlIHRleHQuXG4gKiBAcGFyYW0ge051bWJlcn0gcGhyYXNlTGVuZ3RoIFRoZSBsZW5ndGggb2YgdGhlIHBocmFzZXNcbiAqICB0byBleHRyYWN0IGZyb20gdGhlIHRleHQuIERlZmF1bHRzIHRvIDIuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGFuIG9iamVjdCB3aG9zZSBrZXlzIGFyZSBwaHJhc2VzXG4gKiAgYW5kIHdob3NlIHZhbHVlcyBhcmUgdGhlIG51bWJlciBvZiBvY2N1cnJlbmNlcyBvZiB0aGUgcGhyYXNlLlxuICovXG5hdHJvcGEuVGV4dEFuYWx5emVyLnByb3RvdHlwZS5nZXRQaHJhc2VGcmVxdWVuY3kgPSBmdW5jdGlvbiBnZXRQaHJhc2VGcmVxdWVuY3koXG4gICAgcGhyYXNlTGVuZ3RoXG4pIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICBwaHJhc2VMZW5ndGggPSBhdHJvcGEuc2V0QXNPcHRpb25hbEFyZygyLCBwaHJhc2VMZW5ndGgpO1xuICAgIGlmKDIgPiBwaHJhc2VMZW5ndGgpIHtcbiAgICAgICAgcGhyYXNlTGVuZ3RoID0gMjtcbiAgICB9XG4gICAgdmFyIGNvdW50ZXIgPSAwLCBwcm9wLCBvdXQgPSBbXTtcbiAgICBcbiAgICB0aGlzLndvcmRzID0gYXRyb3BhLmFycmF5cy5yZWluZGV4KHRoaXMud29yZHMpO1xuICAgIFxuICAgIHRoaXMud29yZHMubWFwKGZ1bmN0aW9uKGVsZW1lbnQsIGluZGV4LCBhcnIpIHtcbiAgICAgICAgY291bnRlciA9IDE7ICAvLyBlbGVtZW50IGlzIHdvcmQgMSBvZiBwaHJhc2VMZW5ndGhcbiAgICAgICAgLy8gbWFraW5nIHN1cmUgdGhlcmUgYXJlIGVub3VnaCB3b3JkcyB0byBjb25jYXRlbmF0ZSBhIHBocmFzZSBvZiB0aGVcbiAgICAgICAgLy8gcHJvcGVyIGxlbmd0aC5cbiAgICAgICAgaWYoYXJyW2luZGV4ICsgcGhyYXNlTGVuZ3RoIC0gMV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcHJvcCA9IFN0cmluZyhlbGVtZW50ICsgJyAnKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgZm9yKGNvdW50ZXI7IGNvdW50ZXIgIT09IHBocmFzZUxlbmd0aDsgY291bnRlcisrKSB7XG4gICAgICAgICAgICAgICAgcHJvcCArPSBTdHJpbmcoYXJyW2luZGV4ICsgY291bnRlcl0gKyAnICcpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvdXQucHVzaChwcm9wLnRyaW0oKSk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBcbiAgICBvdXQgPSBhdHJvcGEuYXJyYXlzLmdldEZyZXF1ZW5jeShvdXQpO1xuICAgIFxuICAgIHJldHVybiBvdXQ7XG59O1xuXG5cblxuXG53aGlsZShhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMubGVuZ3RoID4gMCkge1xuICAgIGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5wb3AoKSgpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBhdHJvcGE7XG4iLCJhcmd1bWVudHNbNF1bNV1bMF0uYXBwbHkoZXhwb3J0cyxhcmd1bWVudHMpIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2RvY3MvdnNkb2MvT3BlbkxheWVyc0FsbC5qc1wiLz5cclxudmFyIGF0cm9wYSA9IHJlcXVpcmUoJ2F0cm9wYS1oZWFkZXInKTtcclxuYXRyb3BhLnNldEFzT3B0aW9uYWxBcmcgPSByZXF1aXJlKCdhdHJvcGEtc2V0QXNPcHRpb25hbEFyZycpLnNldEFzT3B0aW9uYWxBcmc7XHJcbi8qanNsaW50XHJcbiAgICBpbmRlbnQ6IDQsXHJcbiAgICBtYXhlcnI6IDUwLFxyXG4gICAgd2hpdGU6IHRydWUsXHJcbiAgICBicm93c2VyOiB0cnVlLFxyXG4gICAgZGV2ZWw6IHRydWUsXHJcbiAgICBwbHVzcGx1czogdHJ1ZSxcclxuICAgIHJlZ2V4cDogdHJ1ZVxyXG4qL1xyXG4vKmdsb2JhbCBhdHJvcGEgKi9cclxuLy8gZW5kIGhlYWRlclxyXG5cclxuXHJcbmF0cm9wYS5yZXF1aXJlcyhcclxuICAgICdpbmplY3QnLFxyXG4gICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgICAgIGlmKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4pO1xyXG5cclxuLyoqXHJcbiAqIENvbnRhaW5zIHRvb2xzIGZvciBpbmplY3RpbmcgZWxlbWVudHMgYW5kIGFzc2VtYmxpZXMuXHJcbiAqIGludG8gdGhlIHBhZ2UuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDMwOFxyXG4gKiBAbmFtZXNwYWNlIENvbnRhaW5zIHRvb2xzIGZvciBpbmplY3RpbmcgZWxlbWVudHMgYW5kIGFzc2VtYmxpZXMuXHJcbiAqIEByZXF1aXJlcyBhdHJvcGEuZGF0YVxyXG4gKiBAcmVxdWlyZXMgYXRyb3BhLnN1cHBvcnRDaGVja1xyXG4gKiBAcmVxdWlyZXMgYXRyb3BhLnNldEFzT3B0aW9uYWxBcmdcclxuICovXHJcbmF0cm9wYS5pbmplY3QgPSB7fTtcclxuLyoqXHJcbiAqIEdlbmVyaWMgRWxlbWVudCBJbmplY3Rvci5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTIwOTA5XHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBlbGVtZW50VHlwZSBUaGUgdHlwZSBvZiBlbGVtZW50IHRvIGJlIGluamVjdGVkLlxyXG4gKiBAcGFyYW0ge0hUTUwgRE9NIERvY3VtZW50fSBkb2NyZWYgT3B0aW9uYWwuIEEgcmVmZXJlbmNlIHRvIHRoZSBkb2N1bWVudCB0b1xyXG4gKiAgdGFyZ2V0LCBkZWZhdWx0cyB0byA8Y29kZT5kb2N1bWVudDwvY29kZT4uXHJcbiAqIEBwYXJhbSB7RE9NIE5vZGV9IHBhcmVudE5vZCBPcHRpb25hbC4gQSByZWZlcmVuY2UgdG8gdGhlIHBhcmVudCBub2RlIHRvXHJcbiAqICB0YXJnZXQsIGRlZmF1bHRzIHRvIDxjb2RlPmRvY3JlZi5ib2R5PC9jb2RlPi5cclxuICogQHBhcmFtIHtPYmplY3R9IGF0dHJpYnV0ZXMgT3B0aW9uYWwuIEFuIG9iamVjdCB3aG9zZSBwcm9wZXJ0aWVzIGFyZSBuYW1lcyBvZlxyXG4gKiAgSFRNTCBhdHRyaWJ1dGVzLCBkZWZhdWx0cyB0byA8Y29kZT57fTwvY29kZT4uIFRoZSB2YWx1ZSBvZiB0aGVzZSBwcm9wZXJ0aWVzXHJcbiAqICBhcmUgdG8gYmUgc3RyaW5ncyByZXByZXNlbnRpbmcgdGhlIHZhbHVlcyBvZiB0aGUgSFRNTCBhdHRyaWJ1dGVzIGFzIHRoZXkgYXJlXHJcbiAqICB0byBiZSBhcHBsaWVkIHRvIHRoZSBpbmplY3RlZCBlbGVtZW50LlxyXG4gKiBAZXhhbXBsZSBFeGFtcGxlIGF0dHJpYnV0ZXMgb2JqZWN0IDpcclxuICpcclxuICogYXR0cmlidXRlc09iaiA9IHtcclxuICogICAgIFwiaWRcIiA6IFwiZWxlbWVudElEXCIsXHJcbiAqICAgICBcImNsYXNzXCIgOiBcImNsYXNzeVwiXHJcbiAqIH07XHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9ubG9hZEhhbmRsZXIgT3B0aW9uYWwuIElmIHRoZSBlbGVtZW50IGJlaW5nIGluamVjdGVkIHdpbGxcclxuICogIGZpcmUgYSBsb2FkIGV2ZW50LCB0aGlzIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkLiBEZWZhdWx0cyB0b1xyXG4gKiAgPGNvZGU+ZnVuY3Rpb24gKCkge308L2NvZGU+LlxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBPcHRpb25hbC4gVGhpcyBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCBqdXN0IGJlZm9yZVxyXG4gKiAgdGhlIGVsZW1lbnQgaXMgdG8gYmUgYXBwZW5kZWQgdG8gdGhlIHBhZ2UuIFRoZSBjYWxsYmFjayB3aWxsIHJlY2VpdmUgdGhlXHJcbiAqICBlbGVtZW50IGluIGl0cyBjdXJyZW50IHN0YXRlIGZvciBhbnkgYWRkaXRpb25hbCBwcm9jZXNzaW5nIHRvIGJlIGRvbmUgcHJpb3JcclxuICogIHRvIGl0J3MgYXR0YWNobWVudCBvbiBjYWxsYmFjayBjb21wbGV0aW9uLiBEZWZhdWx0cyB0b1xyXG4gKiAgPGNvZGU+ZnVuY3Rpb24gKCkge308L2NvZGU+LlxyXG4gKiBAcmV0dXJuIHtIVE1MIEVsZW1lbnR9IFJldHVybnMgYSByZWZlcmVuY2UgdG8gdGhlIEhUTUwgRWxlbWVudCBjcmVhdGVkIGFuZFxyXG4gKiAgaW5qZWN0ZWQuXHJcbiAqIEBzZWUgPGEgaHJlZj1cImh0dHA6Ly93d3cudzMub3JnL1NlY3VyaXR5L3dpa2kvU2FtZV9PcmlnaW5fUG9saWN5XCI+XHJcbiAqIGh0dHA6Ly93d3cudzMub3JnL1NlY3VyaXR5L3dpa2kvU2FtZV9PcmlnaW5fUG9saWN5PC9hPlxyXG4gKiBAZXhhbXBsZVxyXG4gKiAgLy8gdGhpcyB3aWxsIGluamVjdCBhIGRpdiBlbGVtZW50IGludG8gdGhlIGRvY3VtZW50IGJvZHkuXHJcbiAqICB2YXIgZWwgPSBhdHJvcGEuaW5qZWN0LmVsZW1lbnQgKCdkaXYnKTtcclxuICogIFxyXG4gKiAgLy8gVGhpcyB3aWxsIGluamVjdCBhIGRpdiB3aXRoIHRoZSBpZCBcIm15SWRcIiBpbnRvIHRoZSBlbGVtZW50IHJlZmVyZW5jZWQgYnlcclxuICogIC8vIFwiY29udGFpbmVyXCJcclxuICogIHZhciBlbCA9IGF0cm9wYS5pbmplY3QuZWxlbWVudCAoXHJcbiAqICAgICAgJ2RpdicsIGRvY3VtZW50LCBjb250YWluZXIsIHsgJ2lkJzogJ215SWQnIH0sIG51bGwsIG51bGxcclxuICogICk7XHJcbiAqICBcclxuICogIC8vIHRoaXMgd2lsbCBpbmplY3QgYSBkaXYgaW50byB0aGUgZG9jdW1lbnQgb2YgYW4gaWZyYW1lIHJlZmVyZW5jZWQgd2l0aCBcImZkb2NcIlxyXG4gKiAgLy8gSnVzdCBiZWZvcmUgdGhlIGRpdiBpcyBpbmplY3RlZCB0aGUgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgYW5kIHRoZSBlbGVtZW50XHJcbiAqICAvLyBtYXkgYmUgYXVnbWVudGVkLiBXaGVuIHRoZSBjYWxsYmFjayByZXR1cm5zIHRoZSBlbGVtZW50IHdpbGwgYmUgaW5qZWN0ZWQuXHJcbiAqICB2YXIgZmRvYyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzb21lRnJhbWUnKS5jb250ZW50V2luZG93LmRvY3VtZW50O1xyXG4gKiAgXHJcbiAqICB2YXIgZWwgPSBhdHJvcGEuaW5qZWN0LmVsZW1lbnQgKFxyXG4gKiAgICAgICdkaXYnLCBmZG9jLCBmZG9jLmJvZHksIHsgJ2lkJzogJ215SWQnIH0sXHJcbiAqICAgICAgbnVsbCxcclxuICogICAgICBmdW5jdGlvbiAobXlEaXYpIHtcclxuICogICAgICAgICAgbXlEaXYudGV4dENvbnRlbnQgPSAnSSBjb3VsZCBoYXZlIGF0dGFjaGVkIGV2ZW50IGhhbmRsZXJzJztcclxuICogICAgICB9XHJcbiAqICApO1xyXG4gKiAgXHJcbiAqICAvLyB0aGlzIHdpbGwgaW5qZWN0IGFuIGlmcmFtZSBpbnRvIHRoZSBkb2N1bWVudFxyXG4gKiAgLy8gb25jZSB0aGUgaWZyYW1lJ3MgZG9jdW1lbnQgaGFzIGZpbmlzaGVkIGxvYWRpbmcgdGhlIG9ubG9hZCBoYW5kbGVyIHdpbGwgYmVcclxuICogIC8vIGNhbGxlZC4gSWYgdGhlIGRvY3VtZW50IGFuZCB0aGUgaWZyYW1lIGFyZSBvbiB0aGUgc2FtZSBkb21haW4sIHNjcmlwdHMgb25cclxuICogIC8vIHRoZSBmcmFtZSBhbmQgdGhlIHBhcmVudCBkb2N1bWVudCB3aWxsIGJlIGFibGUgdG8gY29tbXVpbmNhdGUgd2l0aCBlYWNoXHJcbiAqICAvLyBvdGhlci5cclxuICogIGZ1bmN0aW9uIGlmcmFtZUhhc0xvYWRlZCAobWVzc2FnZSkge1xyXG4gKiAgICAgIGNvbnNvbGUubG9nKG1lc3NhZ2UpO1xyXG4gKiAgfVxyXG4gKiAgXHJcbiAqICB2YXIgZWwgPSBhdHJvcGEuaW5qZWN0LmVsZW1lbnQgKFxyXG4gKiAgICAgICdpZnJhbWUnLCBkb2N1bWVudCwgZG9jdW1lbnQuYm9keSxcclxuICogICAgICB7ICdpZCc6ICdteUlkJywgJ3NyYycgOiAnaHR0cDovL2xvY2FsaG9zdCcgfSxcclxuICogICAgICBmdW5jdGlvbiAoKSB7XHJcbiAqICAgICAgICAgIGlmcmFtZUhhc0xvYWRlZCgnaGV5IGxvb2sgYXQgdGhhdCwgdGhlIGZyYW1lIGlzIHJlYWR5IScpO1xyXG4gKiAgICAgICAgICAvLyB3aGF0IGNvdWxkIEkgZG8gd2l0aCB0aGUgZnJhbWU/IGFueXRoaW5nIEkgd2FudCFcclxuICogICAgICB9LFxyXG4gKiAgICAgIG51bGxcclxuICogICk7XHJcbiAqL1xyXG5hdHJvcGEuaW5qZWN0LmVsZW1lbnQgPSBmdW5jdGlvbiAoXHJcbiAgICBlbGVtZW50VHlwZSwgZG9jcmVmLCBwYXJlbnROb2QsIGF0dHJpYnV0ZXMsIG9ubG9hZEhhbmRsZXIsIGNhbGxiYWNrXHJcbikge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICBhdHJvcGEuc3VwcG9ydENoZWNrKCdpbmplY3QnKTtcclxuICAgIFxyXG4gICAgdmFyIGVsLFxyXG4gICAgeDtcclxuICAgIGRvY3JlZiA9IGF0cm9wYS5zZXRBc09wdGlvbmFsQXJnKGRvY3VtZW50LCBkb2NyZWYpO1xyXG4gICAgcGFyZW50Tm9kID0gYXRyb3BhLnNldEFzT3B0aW9uYWxBcmcoZG9jcmVmLmJvZHksIHBhcmVudE5vZCk7XHJcbiAgICBhdHRyaWJ1dGVzID0gYXRyb3BhLnNldEFzT3B0aW9uYWxBcmcoe30sIGF0dHJpYnV0ZXMpO1xyXG4gICAgb25sb2FkSGFuZGxlciA9IGF0cm9wYS5zZXRBc09wdGlvbmFsQXJnKGF0cm9wYS5ub3AsIG9ubG9hZEhhbmRsZXIpO1xyXG4gICAgY2FsbGJhY2sgPSBhdHJvcGEuc2V0QXNPcHRpb25hbEFyZyhhdHJvcGEubm9wLCBjYWxsYmFjayk7XHJcbiAgICBcclxuICAgIGVsID0gZG9jcmVmLmNyZWF0ZUVsZW1lbnQoZWxlbWVudFR5cGUpO1xyXG4gICAgZm9yICh4IGluIGF0dHJpYnV0ZXMpIHtcclxuICAgICAgICBpZiAoYXR0cmlidXRlcy5oYXNPd25Qcm9wZXJ0eSh4KSkge1xyXG4gICAgICAgICAgICBlbC5zZXRBdHRyaWJ1dGUoeCwgYXR0cmlidXRlc1t4XSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIG9ubG9hZEhhbmRsZXIsIHRydWUpO1xyXG4gICAgY2FsbGJhY2soZWwpO1xyXG4gICAgcGFyZW50Tm9kLmFwcGVuZENoaWxkKGVsKTtcclxuICAgIHJldHVybiBlbDtcclxufTtcclxuLyoqXHJcbiAqIEhpZGRlbiBJZnJhbWUgSW5qZWN0b3IuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDMwOFxyXG4gKiBAcGFyYW0ge1N0cmluZ30gaWQgVGhlIGlkIG9mIHRoZSBlbGVtZW50IHRvIGJlIGluamVjdGVkLlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gc3JjVXJsIFRoZSBVUkwgdG8gbG9hZCBpbiB0aGUgaWZyYW1lLlxyXG4gKiBAcGFyYW0ge0hUTUwgRE9NIERvY3VtZW50fSBkb2NyZWYgT3B0aW9uYWwuIFJlZmVyZW5jZSB0byB0aGUgZG9jdW1lbnQgdG9cclxuICogIGluamVjdCB0aGUgaWZyYW1lIGluLiBEZWZhdWx0cyB0byBkb2N1bWVudC5cclxuICogQHBhcmFtIHtGdW5jdGlvbn0gb25sb2FkSGFuZGxlciBPcHRpb25hbC4gVGhlIG9ubG9hZCBoYW5kbGVyIGZvciB0aGUgaWZyYW1lLlxyXG4gKiBAcGFyYW0ge0RPTSBOb2RlfSBwYXJlbnROb2QgT3B0aW9uYWwuIFJlZmVyZW5jdCB0byB0aGUgcGFyZW50IG5vZGUgdG9cclxuICogIGFwcGVuZCB0aGUgaWZyYW1lIHRvLiBEZWZhdWx0cyB0byBkb2NyZWYuYm9keVxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBPcHRpb25hbC4gQ2FsbGJhY2sgZnVuY3Rpb24gZm9yIHByZXByb2Nlc3NpbmdcclxuICogIHRoZSBpZnJhbWUgcHJpb3IgdG8gaW5qZWN0aW9uLiBDYWxsZWQgd2l0aCBhIHJlZmVyZW5jZSB0byB0aGUgaWZyYW1lLlxyXG4gKiBAcmV0dXJuIHtIVE1MIEVsZW1lbnR9IFJldHVybnMgYSByZWZlcmVuY2UgdG8gdGhlIEhUTUwgRWxlbWVudCBjcmVhdGVkIGFuZFxyXG4gKiAgaW5qZWN0ZWQuXHJcbiAqIEBzZWUgYXRyb3BhLmluamVjdC5lbGVtZW50XHJcbiAqIEBzZWUgPGEgaHJlZj1cImh0dHA6Ly93d3cudzMub3JnL1NlY3VyaXR5L3dpa2kvU2FtZV9PcmlnaW5fUG9saWN5XCI+XHJcbiAqIGh0dHA6Ly93d3cudzMub3JnL1NlY3VyaXR5L3dpa2kvU2FtZV9PcmlnaW5fUG9saWN5PC9hPlxyXG4gKiBAZXhhbXBsZVxyXG4gKiAgZWwgPSBhdHJvcGEuaW5qZWN0LmhpZGRlbkZyYW1lKFxyXG4gKiAgICAgICdpbmplY3RIaWRkZW5GcmFtZTMnLFxyXG4gKiAgICAgICdodHRwOi8vbG9jYWxob3N0LycsXHJcbiAqICAgICAgbnVsbCxcclxuICogICAgICBmdW5jdGlvbiAoKSB7XHJcbiAqICAgICAgICAgIGNvbnNvbGUubG9nKCdoZXkgbG9vayBhdCB0aGF0LCB0aGUgZnJhbWUgaXMgcmVhZHkhJyk7XHJcbiAqICAgICAgfSxcclxuICogICAgICBudWxsLFxyXG4gKiAgICAgIG51bGxcclxuICogICk7XHJcbiAqL1xyXG5hdHJvcGEuaW5qZWN0LmhpZGRlbkZyYW1lID0gZnVuY3Rpb24gKFxyXG4gICAgaWQsIHNyY1VSTCwgZG9jcmVmLCBvbmxvYWRIYW5kbGVyLCBwYXJlbnROb2QsIGNhbGxiYWNrXHJcbikge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICBhdHJvcGEuc3VwcG9ydENoZWNrKCdpbmplY3QnKTtcclxuICAgIFxyXG4gICAgcmV0dXJuIGF0cm9wYS5pbmplY3QuZWxlbWVudChcclxuICAgICAgICAnaWZyYW1lJyxcclxuICAgICAgICBkb2NyZWYsXHJcbiAgICAgICAgcGFyZW50Tm9kLFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgXCJpZFwiIDogaWQsXHJcbiAgICAgICAgICAgIFwic3JjXCIgOiBzcmNVUkwsXHJcbiAgICAgICAgICAgIFwid2lkdGhcIiA6IFwiMHB4XCIsXHJcbiAgICAgICAgICAgIFwiaGVpZ2h0XCIgOiBcIjBweFwiLFxyXG4gICAgICAgICAgICBcImJvcmRlclwiIDogXCIwcHhcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb25sb2FkSGFuZGxlcixcclxuICAgICAgICBjYWxsYmFja1xyXG4gICAgKTtcclxufTtcclxuLyoqXHJcbiAqIFNjcmlwdCBJbmplY3Rvci5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTIwOTA5XHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBpZCBUaGUgaWQgb2YgdGhlIGVsZW1lbnQgdG8gYmUgaW5qZWN0ZWQuXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBzcmNVcmwgVGhlIFVSTCB3aGVyZSB0aGUgc2NyaXB0IGlzIGxvY2F0ZWQuXHJcbiAqIEBwYXJhbSB7SFRNTCBET00gRG9jdW1lbnR9IGRvY3JlZiBPcHRpb25hbC4gVGhlIGRvY3VtZW50IHRvIGluamVjdCB0aGVcclxuICogIHNjcmlwdCBpbnRvLiBEZWZhdWx0cyB0byBkb2N1bWVudC5cclxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgT3B0aW9uYWwuIEEgZnVuY3Rpb24gdG8gZXhlY3V0ZSBvbmNlIHRoZSBzY3JpcHRcclxuICogIGhhcyBsb2FkZWQuIERlZmF1bHRzIHRvIGZ1bmN0aW9uICgpIHt9O1xyXG4gKiBAcmV0dXJuIHtIVE1MIEVsZW1lbnR9IFJldHVybnMgYSByZWZlcmVuY2UgdG8gdGhlIEhUTUwgRWxlbWVudCBjcmVhdGVkIGFuZFxyXG4gKiAgaW5qZWN0ZWQuXHJcbiAqIEBzZWUgYXRyb3BhLmluamVjdC5lbGVtZW50XHJcbiAqIEBzZWUgPGEgaHJlZj1cImh0dHA6Ly93d3cudzMub3JnL1NlY3VyaXR5L3dpa2kvU2FtZV9PcmlnaW5fUG9saWN5XCI+XHJcbiAqIGh0dHA6Ly93d3cudzMub3JnL1NlY3VyaXR5L3dpa2kvU2FtZV9PcmlnaW5fUG9saWN5PC9hPlxyXG4gKiBAZXhhbXBsZVxyXG4gKiAgLy8gR2l2ZW4gYSBzY3JpcHQgXCJkdW1teS5qc1wiIGxvY2F0ZWQgYXQgXCJodHRwOi8vbG9jYWxob3N0L2R1bW15LmpzXCJcclxuICogIC8vIHlvdSBjYW4gZmV0Y2ggdGhlIHNjcmlwdCBhbmQgZXhlY3V0ZSBmdW5jdGlvbnMgZnJvbSB3aXRoaW4gaXRcclxuICogIC8vIGFzIHNvb24gYXMgaXQgaGFzIGxvYWRlZCBpbnRvIHRoZSBwYWdlLlxyXG4gKiAgXHJcbiAqICAvLyBjb250ZW50cyBvZiBcImR1bW15LmpzXCJcclxuICogIGZ1bmN0aW9uIGR1bW15KCkge1xyXG4gKiAgICAgIHJldHVybiAnZHVtbXknO1xyXG4gKiAgfVxyXG4gKiAgXHJcbiAqICAvLyBpbmplY3RpbmcgXCJkdW1teS5qc1wiIGludG8gYW55IHBhZ2UuIFRoZSBzY3JpcHQgdGFnIGlzbid0IHJlc3RyaWN0ZWQgYnlcclxuICogIC8vIHRoZSBzYW1lIG9yaWdpbiBwb2xpY3kuIEhvc3QgeW91ciBzY3JpcHQgYW55d2hlcmUgYW5kIGluamVjdCBpdCB0byBhbnlcclxuICogIC8vIHBhZ2Ugb24gdGhlIG5ldCB0aGF0IHlvdSB3YW50IHRvLlxyXG4gKiAgZWwgPSBhdHJvcGEuaW5qZWN0LnNjcmlwdChcclxuICogICAgICAnaW5qZWN0U2NyaXB0JyxcclxuICogICAgICAnaHR0cDovL2xvY2FsaG9zdC8nLFxyXG4gKiAgICAgIGRvY3VtZW50LFxyXG4gKiAgICAgIGZ1bmN0aW9uICgpIHtcclxuICogICAgICAgICAgY29uc29sZS5sb2coZHVtbXkoKSk7XHJcbiAqICAgICAgfVxyXG4gKiAgKTtcclxuICogIC8vIHlvdSBtYXkgYWxzbyBsb2FkIHNjcmlwdHMgaW50byBpZnJhbWVzIGJ5IHJlcGxhY2luZyB0aGUgdGhpcmQgcGFyYW1ldGVyXHJcbiAqICAvLyB3aXRoIGEgcmVmZXJlbmNlIHRvIHRoZSBpZnJhbWUncyBkb2N1bWVudCBvYmplY3QuXHJcbiAqL1xyXG5hdHJvcGEuaW5qZWN0LnNjcmlwdCA9IGZ1bmN0aW9uIChpZCwgc3JjVVJMLCBkb2NyZWYsIGNhbGxiYWNrKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIGF0cm9wYS5zdXBwb3J0Q2hlY2soJ2luamVjdCcpO1xyXG4gICAgXHJcbiAgICB2YXIgYXR0cmlidXRlcyxcclxuICAgIGVsZW1lbnRUeXBlLFxyXG4gICAgcGFyZW50Tm9kID0gbnVsbCxcclxuICAgIG9ubG9hZEhhbmRsZXIsXHJcbiAgICBlbDtcclxuICAgIGF0dHJpYnV0ZXMgPSB7XHJcbiAgICAgICAgXCJpZFwiIDogaWQsXHJcbiAgICAgICAgXCJ0eXBlXCIgOiBcInRleHQvamF2YXNjcmlwdFwiLFxyXG4gICAgICAgIFwic3JjXCIgOiBzcmNVUkxcclxuICAgIH07XHJcbiAgICBlbGVtZW50VHlwZSA9ICdzY3JpcHQnO1xyXG4gICAgb25sb2FkSGFuZGxlciA9IGNhbGxiYWNrO1xyXG4gICAgZWwgPSBhdHJvcGEuaW5qZWN0LmVsZW1lbnQoXHJcbiAgICAgICAgZWxlbWVudFR5cGUsIGRvY3JlZiwgcGFyZW50Tm9kLCBhdHRyaWJ1dGVzLCBvbmxvYWRIYW5kbGVyKTtcclxuICAgIHJldHVybiBlbDtcclxufTtcclxuXHJcblxyXG5cclxuXHJcbndoaWxlKGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5sZW5ndGggPiAwKSB7XHJcbiAgICBhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMucG9wKCkoKTtcclxufVxyXG5tb2R1bGUuZXhwb3J0cyA9IGF0cm9wYTtcclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2RvY3MvdnNkb2MvT3BlbkxheWVyc0FsbC5qc1wiLz5cclxudmFyIGF0cm9wYSA9IHJlcXVpcmUoJ2F0cm9wYS1oZWFkZXInKTtcclxuLypqc2xpbnRcclxuICAgIGluZGVudDogNCxcclxuICAgIG1heGVycjogNTAsXHJcbiAgICB3aGl0ZTogdHJ1ZSxcclxuICAgIGJyb3dzZXI6IHRydWUsXHJcbiAgICBkZXZlbDogdHJ1ZSxcclxuICAgIHBsdXNwbHVzOiB0cnVlLFxyXG4gICAgcmVnZXhwOiB0cnVlXHJcbiovXHJcbi8qZ2xvYmFsIGF0cm9wYSwgWFBhdGhSZXN1bHQgKi9cclxuLy8gZW5kIGhlYWRlclxyXG5cclxuLyoqXHJcbiAqIFV0aWxpdGllcyBmb3IgaGFuZGxpbmcgb2JqZWN0cy5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwMTIxXHJcbiAqIEBuYW1lc3BhY2UgVXRpbGl0aWVzIGZvciBoYW5kbGluZyBvYmplY3RzLlxyXG4gKi9cclxuYXRyb3BhLm9iamVjdHMgPSB7fTtcclxuLyoqXHJcbiAqIENvbnZlcnRzIGFuIG9iamVjdCBpbnRvIGFuIGFycmF5IG9mIGFycmF5cyB0byBtYWtlIGl0IHBvc3NpYmxlIHRvIHNvcnQgYW5kXHJcbiAqICBlbnVtZXJhdGUgcHJvcGVydGllcyByZWxpYWJseS5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwMTIwXHJcbiAqIEBtZXRob2RPZiBhdHJvcGEub2JqZWN0cy5cclxuICogQGV4YW1wbGVcclxuICogIHZhciB4ID0ge1xyXG4gKiAgICAgIFwic3R1ZmZpbmdcIiA6IFwiY290dG9uXCIsXHJcbiAqICAgICAgXCJub3NlXCIgOiBcImJ1dHRvblwiLFxyXG4gKiAgICAgIFwibmFtZVwiIDogXCJiZWFyXCJcclxuICogIH07XHJcbiAqICBjb25zb2xlLmxvZyggYXRyb3BhLm9iamVjdHMuY29udmVydE9iamVjdFRvQXJyYXkoeCkgKTtcclxuICogIC8vIGxvZ3MgW1tcInN0dWZmaW5nXCIsIFwiY290dG9uXCJdLCBbXCJub3NlXCIsIFwiYnV0dG9uXCJdLCBbXCJuYW1lXCIsIFwiYmVhclwiXV1cclxuICogQHBhcmFtIHtPYmplY3R9IG9iaiBBbiBvYmplY3QuXHJcbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBhbiBhcnJheSBvZiBhcnJheXMgd2hlcmUgZWFjaFxyXG4gKiAgbmVzdGVkIGFycmF5IHdpbGwgaGF2ZSB0aGUgb2JqZWN0J3Mga2V5IHN0b3JlZCBpbiBlbGVtZW50IDAgYW5kXHJcbiAqICB0aGUgdmFsdWUgc3RvcmVkIGluIGVsZW1lbnQgMS4gVGhlIHJlYXNvbiBhbiBhcnJheSBvZiBhcnJheXMgaXNcclxuICogIHJldHVybmVkIGlzIGJlY2F1c2UgSmF2YVNjcmlwdCBkb2VzIG5vdCBndWFyYW50ZWUgdGhlIG9yZGVyIG9mXHJcbiAqICBwcm9wZXJ0aWVzIG9uIGFuIG9iamVjdCBzbyB0aGVyZSBpcyBubyByZWxpemJsZSB3YXkgdG8gc29ydFxyXG4gKiAgYW4gb2JqZWN0cyBrZXlzIG9yIHZhbHVlcy5cclxuICogQHNlZSBcIlRoZSBtZWNoYW5pY3MgYW5kIG9yZGVyIG9mIGVudW1lcmF0aW5nIHRoZSBwcm9wZXJ0aWVzIFtvZiBhbiBvYmplY3RdXHJcbiAqICBpcyBub3Qgc3BlY2lmaWVkLlwiIFxyXG4gKiAgPGEgaHJlZj1cImh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi81LjEvI3NlYy0xMi42LjRcIj5cclxuICogIGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi81LjEvI3NlYy0xMi42LjQ8L2E+XHJcbiAqL1xyXG5hdHJvcGEub2JqZWN0cy5jb252ZXJ0T2JqZWN0VG9BcnJheSA9IGZ1bmN0aW9uIGNvbnZlcnRPYmplY3RUb0FycmF5KG9iaikge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICB2YXIgcHJvcCwgb3V0ID0gW107XHJcbiAgICBmb3IgKHByb3AgaW4gb2JqKSB7XHJcbiAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xyXG4gICAgICAgICAgICBvdXQucHVzaChbcHJvcCwgb2JqW3Byb3BdXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG91dDtcclxufTtcclxuLyoqXHJcbiAqIENvbnZlcnRzIGFuIG9iamVjdCBpbnRvIGFuIGFycmF5IG9mIGFycmF5cyBhbmQgYWxsb3dzIGZvciByZWxpYWJsZSBzb3J0aW5nXHJcbiAqICBhbmQgZW51bWVyYXRpb24uXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDEyMFxyXG4gKiBAZXhhbXBsZVxyXG4gKiAgdmFyIHdvcmRzQ291bnRlZCwgc29ydGVkQnlWYWx1ZXMsIHNvcnRlZEJ5UHJvcGVydGllcztcclxuICogIHdvcmRzQ291bnRlZCA9IHtcclxuICogICAgICBcImRvY3VtZW50M1wiIDogMTUwLFxyXG4gKiAgICAgIFwiZG9jdW1lbnQxXCIgOiAzMDAsXHJcbiAqICAgICAgXCJkb2N1bWVudDJcIiA6IDI1XHJcbiAqICB9O1xyXG4gKiAgLy8gc29ydGluZyBieSBwcm9wZXJ0eSB2YWx1ZSBhcyBudW1iZXJzXHJcbiAqICBmdW5jdGlvbiB2YWxTb3J0KGEsIGIpIHtcclxuICogICAgICByZXR1cm4gYVsxXSAtIGJbMV07XHJcbiAqICB9XHJcbiAqICAvLyBzb3J0aW5nIGJ5IHByb3BlcnR5IG5hbWVzIGFzIHN0cmluZ3NcclxuICogIGZ1bmN0aW9uIHByb3BTb3J0KGEsIGIpIHtcclxuICogICAgICByZXR1cm4gYVswXS5sb2NhbGVDb21wYXJlKGJbMF0pO1xyXG4gKiAgfVxyXG4gKiAgc29ydGVkQnlWYWx1ZXMgPSBhdHJvcGEub2JqZWN0cy5zb3J0KHdvcmRzQ291bnRlZCwgdmFsU29ydCk7XHJcbiAqICBzb3J0ZWRCeVByb3BlcnRpZXMgPSBhdHJvcGEub2JqZWN0cy5zb3J0KHdvcmRzQ291bnRlZCwgcHJvcFNvcnQpO1xyXG4gKiAgY29uc29sZS5sb2coJ3NvcnRlZCBieSB2YWx1ZTogJywgc29ydGVkQnlWYWx1ZXMpO1xyXG4gKiAgY29uc29sZS5sb2coJ3NvcnRlZCBieSBwcm9wZXJ0aWVzOiAnLCBzb3J0ZWRCeVByb3BlcnRpZXMpO1xyXG4gKiAgXHJcbiAqICAvLyBsb2dzOlxyXG4gKiAgLy8gc29ydGVkIGJ5IHZhbHVlOiBbXHJcbiAqICAvLyAgICAgW1wiZG9jdW1lbnQyXCIsIDI1XSxcclxuICogIC8vICAgICBbXCJkb2N1bWVudDNcIiwgMTUwXSxcclxuICogIC8vICAgICBbXCJkb2N1bWVudDFcIiwgMzAwXVxyXG4gKiAgLy8gXVxyXG4gKiAgLy8gc29ydGVkIGJ5IHByb3BlcnRpZXM6IFtcclxuICogIC8vICAgICBbXCJkb2N1bWVudDFcIiwgMzAwXSxcclxuICogIC8vICAgICBbXCJkb2N1bWVudDJcIiwgMjVdLFxyXG4gKiAgLy8gICAgIFtcImRvY3VtZW50M1wiLCAxNTBdXHJcbiAqICAvLyBdXHJcbiAqIEBleGFtcGxlXHJcbiAqICBMZXhpY29ncmFwaGljIHNvcnRpbmc6XHJcbiAqICBUaGlzICAgIFsxLCAyLCAxMCwgJ0EnLCAnYScsJ1onLCAneiddXHJcbiAqICBiZWNvbWVzIFsxLCAxMCwgMiwgXCJBXCIsIFwiWlwiLCBcImFcIiwgXCJ6XCJdXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogQW4gb2JqZWN0LlxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBzb3J0Rm4gT3B0aW9uYWwuIFRoZSBzb3J0aW5nIGZ1bmN0aW9uLiBUaGlzIGZ1bmN0aW9uIHdpbGxcclxuICogIGJlIGdpdmVuIHR3byBhcmd1bWVudHMuIENvbXBhcmUgdGhlIHR3byBhcmd1bWVudHMgYW5kIHJldHVybjpcclxuICogIDAgaWYgdGhleSBhcmUgZXF1YWwsIGdyZWF0ZXIgdGhhbiB6ZXJvIGlmIHRoZSBmaXJzdCBhcmd1bWVudFxyXG4gKiAgaXMgZ3JlYXRlciB0aGFuIHRoZSBzZWNvbmQsIG9yIGxlc3MgdGhhbiB6ZXJvIGlmIHRoZSBzZWNvbmRcclxuICogIGFyZ3VtZW50IGlzIGdyZWF0ZXIgdGhhbiB0aGUgZmlyc3QuIElmIHRoZSBzb3J0aW5nIGZ1bmN0aW9uXHJcbiAqICBpcyBub3QgZ2l2ZW4sIHRoZSBhcnJheSB3aWxsIGJlIHNvcnRlZCBsZXhvZ3JhcGhpY2FsbHkgYnlcclxuICogIGVhY2ggZWxlbWVudHMgPGNvZGU+dG9TdHJpbmc8L2NvZGU+IHZhbHVlLlxyXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYW4gYXJyYXkgb2YgYXJyYXlzIHdoZXJlIGVhY2hcclxuICogIG5lc3RlZCBhcnJheSB3aWxsIGhhdmUgdGhlIG9iamVjdHMga2V5IHN0b3JlZCBpbiBlbGVtZW50IDAgYW5kXHJcbiAqICB0aGUgdmFsdWUgc3RvcmVkIGluIGVsZW1lbnQgMS4gVGhlIHJlYXNvbiBhbiBhcnJheSBvZiBhcnJheXMgaXNcclxuICogIHJldHVybmVkIGlzIGJlY2F1c2UgSmF2YVNjcmlwdCBkb2VzIG5vdCBndWFyYW50ZWUgdGhlIG9yZGVyIG9mXHJcbiAqICBwcm9wZXJ0aWVzIG9uIGFuIG9iamVjdCBzbyB0aGVyZSBpcyBubyByZWxpemJsZSB3YXkgdG8gc29ydFxyXG4gKiAgYW4gb2JqZWN0cyBrZXlzIG9yIHZhbHVlcy5cclxuICogQHNlZSBhdHJvcGEub2JqZWN0cy5jb252ZXJ0T2JqZWN0VG9BcnJheVxyXG4gKiBAc2VlIDxhIGhyZWY9XCJodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNS4xLyNzZWMtMTUuNC40LjExXCI+XHJcbiAqICBodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNS4xLyNzZWMtMTUuNC40LjExPC9hPlxyXG4gKiBAc2VlIDxhIGhyZWY9XCJodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL0FycmF5L3NvcnRcIj5cclxuICogIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvQXJyYXkvc29ydDwvYT5cclxuICovXHJcbmF0cm9wYS5vYmplY3RzLnNvcnQgPSBmdW5jdGlvbiBzb3J0KG9iaiwgc29ydEZuKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHJldHVybiBhdHJvcGEub2JqZWN0cy5jb252ZXJ0T2JqZWN0VG9BcnJheShvYmopLnNvcnQoc29ydEZuKTtcclxufTtcclxuLyoqXHJcbiAqIFNvcnRzIGFuIG9iamVjdCBieSBpdHMgdmFsdWVzIHVzaW5nIGEgdXNlciBkZWZpbmVkIGFsZ29yaXRobS5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwMTIwXHJcbiAqIEBleGFtcGxlXHJcbiAqICB2YXIgd29yZHNDb3VudGVkO1xyXG4gKiAgd29yZHNDb3VudGVkID0ge1xyXG4gKiAgICAgIFwiZG9jdW1lbnQzXCIgOiAxNTAsXHJcbiAqICAgICAgXCJkb2N1bWVudDFcIiA6IDMwMCxcclxuICogICAgICBcImRvY3VtZW50MlwiIDogMjVcclxuICogIH07XHJcbiAqICAvLyBzb3J0aW5nIGJ5IHZhbHVlcyBhcyBudW1iZXJzXHJcbiAqICBmdW5jdGlvbiBzb3J0Rm4oYSwgYikge1xyXG4gKiAgICAgIHJldHVybiBhIC0gYjtcclxuICogIH1cclxuICogIGNvbnNvbGUubG9nKCBhdHJvcGEub2JqZWN0cy5zb3J0VmFsdWVzKHdvcmRzQ291bnRlZCwgc29ydEZuKSApO1xyXG4gKiAgLy8gbG9nczogW1tcImRvY3VtZW50MlwiLCAyNV0sIFtcImRvY3VtZW50M1wiLCAxNTBdLCBbXCJkb2N1bWVudDFcIiwgMzAwXV1cclxuICogQHBhcmFtIHtPYmplY3R9IG9iaiBBbiBvYmplY3QuXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHNvcnRGbiBUaGUgc29ydGluZyBmdW5jdGlvbi4gVGhpcyBmdW5jdGlvbiB3aWxsXHJcbiAqICBiZSBnaXZlbiB0d28gYXJndW1lbnRzLiBDb21wYXJlIHRoZSB0d28gYXJndW1lbnRzIGFuZCByZXR1cm46XHJcbiAqICAwIGlmIHRoZXkgYXJlIGVxdWFsLCBncmVhdGVyIHRoYW4gemVybyBpZiB0aGUgZmlyc3QgYXJndW1lbnRcclxuICogIGlzIGdyZWF0ZXIgdGhhbiB0aGUgc2Vjb25kLCBvciBsZXNzIHRoYW4gemVybyBpZiB0aGUgc2Vjb25kXHJcbiAqICBhcmd1bWVudCBpcyBncmVhdGVyIHRoYW4gdGhlIGZpcnN0LlxyXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYW4gYXJyYXkgb2YgYXJyYXlzIHdoZXJlIGVhY2hcclxuICogIG5lc3RlZCBhcnJheSB3aWxsIGhhdmUgdGhlIG9iamVjdHMga2V5IHN0b3JlZCBpbiBlbGVtZW50IDAgYW5kXHJcbiAqICB0aGUgdmFsdWUgc3RvcmVkIGluIGVsZW1lbnQgMS5cclxuICogQHNlZSBhdHJvcGEub2JqZWN0cy5zb3J0XHJcbiAqL1xyXG5hdHJvcGEub2JqZWN0cy5zb3J0VmFsdWVzID0gZnVuY3Rpb24gc29ydFZhbHVlcyhvYmosIHNvcnRGbikge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICB2YXIgdmFsU29ydCA9IGZ1bmN0aW9uKGEsIGIpIHtcclxuICAgICAgICByZXR1cm4gc29ydEZuKGFbMV0sIGJbMV0pO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBhdHJvcGEub2JqZWN0cy5zb3J0KG9iaiwgdmFsU29ydCk7XHJcbn07XHJcbi8qKlxyXG4gKiBTb3J0cyBhbiBvYmplY3QgYnkgaXRzIHByb3BlcnRpZXMgdXNpbmcgYSB1c2VyIGRlZmluZWQgYWxnb3JpdGhtLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzAxMjBcclxuICogQGV4YW1wbGVcclxuICogIHZhciB3b3Jkc0NvdW50ZWQ7XHJcbiAqICB3b3Jkc0NvdW50ZWQgPSB7XHJcbiAqICAgICAgXCJkb2N1bWVudDNcIiA6IDE1MCxcclxuICogICAgICBcImRvY3VtZW50MVwiIDogMzAwLFxyXG4gKiAgICAgIFwiZG9jdW1lbnQyXCIgOiAyNVxyXG4gKiAgfTtcclxuICogIC8vIHNvcnRpbmcgYnkgcHJvcGVydHkgbmFtZXMgYXMgc3RyaW5nc1xyXG4gKiAgZnVuY3Rpb24gc29ydEZuKGEsIGIpIHtcclxuICogICAgICByZXR1cm4gYS5sb2NhbGVDb21wYXJlKGIpO1xyXG4gKiAgfVxyXG4gKiAgY29uc29sZS5sb2coIGF0cm9wYS5vYmplY3RzLnNvcnRQcm9wZXJ0aWVzKHdvcmRzQ291bnRlZCwgc29ydEZuKSApO1xyXG4gKiAgLy8gbG9nczogW1tcImRvY3VtZW50MVwiLCAzMDBdLCBbXCJkb2N1bWVudDJcIiwgMjVdLCBbXCJkb2N1bWVudDNcIiwgMTUwXV1cclxuICogQHBhcmFtIHtPYmplY3R9IG9iaiBBbiBvYmplY3QuXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHNvcnRGbiBUaGUgc29ydGluZyBmdW5jdGlvbi4gVGhpcyBmdW5jdGlvbiB3aWxsXHJcbiAqICBiZSBnaXZlbiB0d28gYXJndW1lbnRzLiBDb21wYXJlIHRoZSB0d28gYXJndW1lbnRzIGFuZCByZXR1cm46XHJcbiAqICAwIGlmIHRoZXkgYXJlIGVxdWFsLCBncmVhdGVyIHRoYW4gemVybyBpZiB0aGUgZmlyc3QgYXJndW1lbnRcclxuICogIGlzIGdyZWF0ZXIgdGhhbiB0aGUgc2Vjb25kLCBvciBsZXNzIHRoYW4gemVybyBpZiB0aGUgc2Vjb25kXHJcbiAqICBhcmd1bWVudCBpcyBncmVhdGVyIHRoYW4gdGhlIGZpcnN0LlxyXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYW4gYXJyYXkgb2YgYXJyYXlzIHdoZXJlIGVhY2hcclxuICogIG5lc3RlZCBhcnJheSB3aWxsIGhhdmUgdGhlIG9iamVjdHMga2V5IHN0b3JlZCBpbiBlbGVtZW50IDAgYW5kXHJcbiAqICB0aGUgdmFsdWUgc3RvcmVkIGluIGVsZW1lbnQgMS5cclxuICogQHNlZSBhdHJvcGEub2JqZWN0cy5zb3J0XHJcbiAqL1xyXG5hdHJvcGEub2JqZWN0cy5zb3J0UHJvcGVydGllcyA9IGZ1bmN0aW9uIHNvcnRWYWx1ZXMob2JqLCBzb3J0Rm4pIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgdmFyIHByb3BTb3J0ID0gZnVuY3Rpb24oYSwgYikge1xyXG4gICAgICAgIHJldHVybiBzb3J0Rm4oYVswXSwgYlswXSk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIGF0cm9wYS5vYmplY3RzLnNvcnQob2JqLCBwcm9wU29ydCk7XHJcbn07XHJcbi8qKlxyXG4gKiBTb3J0cyBhbiBvYmplY3QgYnkgaXRzIHZhbHVlcyBudW1lcmljYWxseS5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwMTIwXHJcbiAqIEBleGFtcGxlXHJcbiAqICB2YXIgd29yZHNDb3VudGVkO1xyXG4gKiAgd29yZHNDb3VudGVkID0ge1xyXG4gKiAgICAgIFwiZG9jdW1lbnQzXCIgOiAxNTAsXHJcbiAqICAgICAgXCJkb2N1bWVudDFcIiA6IDMwMCxcclxuICogICAgICBcImRvY3VtZW50MlwiIDogMjVcclxuICogIH07XHJcbiAqICBjb25zb2xlLmxvZyggYXRyb3BhLm9iamVjdHMuc29ydFZhbHVlc051bWVyaWNhbGx5KHdvcmRzQ291bnRlZCkgKTtcclxuICogIC8vIGxvZ3MgW1tcImRvY3VtZW50MlwiLCAyNV0sIFtcImRvY3VtZW50M1wiLCAxNTBdLCBbXCJkb2N1bWVudDFcIiwgMzAwXV1cclxuICogQHBhcmFtIHtPYmplY3R9IG9iaiBBIHNpbXBsZSBvYmplY3Qgd2hlcmUgdGhlIHByb3BlcnRpZXNcclxuICogIGFsbCBoYXZlIG51bWVyaWMtaXNoIHZhbHVlcy5cclxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGFuIGFycmF5IG9mIGFycmF5cyB3aGVyZSBlYWNoXHJcbiAqICBuZXN0ZWQgYXJyYXkgd2lsbCBoYXZlIHRoZSBvYmplY3RzIGtleSBzdG9yZWQgaW4gZWxlbWVudCAwIGFuZFxyXG4gKiAgdGhlIHZhbHVlIHN0b3JlZCBpbiBlbGVtZW50IDEuXHJcbiAqIEBzZWUgYXRyb3BhLm9iamVjdHMuc29ydFxyXG4gKi9cclxuYXRyb3BhLm9iamVjdHMuc29ydFZhbHVlc051bWVyaWNhbGx5ID0gZnVuY3Rpb24gc29ydFZhbHVlc051bWVyaWNhbGx5KG9iaikge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICBmdW5jdGlvbiBzb3J0Rm4oYSwgYikge1xyXG4gICAgICAgIHJldHVybiAoYSAtIGIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGF0cm9wYS5vYmplY3RzLnNvcnRWYWx1ZXMob2JqLCBzb3J0Rm4pO1xyXG59O1xyXG4vKipcclxuICogVGhyb3dzIGFuIGVycm9yLCA8Y29kZT5TdHJpbmcucHJvdG90eXBlLmxvY2FsZUNvbXBhcmU8L2NvZGU+IGlzIG5vdCBcclxuICogIHN0YW5kYXJkaXplZC5cclxuICogXHJcbiAqICBZZXMsIGxvY2FsZUNvbXBhcmUgaXMgaW4gdGhlIHN0YW5kYXJkIGJ1dCwgYXQgdGhpcyB0aW1lIHRoZSBhY3R1YWxcclxuICogIGNvbXBhcmlzb24gaXMgaW1wbGVtZW50YXRpb24gZGVwZW5kYW50LiBUaGlzIG1lYW5zIHRoYXQgXCJhbHBoYWJldGljYWwgb3JkZXJcIlxyXG4gKiAgY2FuIGJlIGRpZmZlcmVudCBvbiBkaWZmZXJlbnQgcGxhdGZvcm1zLiBXaGF0IEkgZm91bmQgd2FzIHRoYXQgaW4gbm9kZSB0aGVcclxuICogIGFycmF5IG9mIDxjb2RlPlsnYScsJ1onLCdBJywneiddPC9jb2RlPiB3b3VsZCBiZSBzb3J0ZWQgdG9cclxuICogIDxjb2RlPlsnQScsJ1onLCdhJywnelwiXTwvY29kZT4sIHdoaWxlIG9uXHJcbiAqICBmaXJlZm94IGl0IHdvdWxkIGJlIHNvcnRlZCB0byA8Y29kZT5bJ2EnLCdBJywneicsJ1onXTwvY29kZT4uIFdobyBrbm93cyBpZlxyXG4gKiAgYW5vdGhlciBpbXBsZW1lbnRvciB3b3VsZCBzb3J0IGl0IDxjb2RlPlsnQScsJ2EnLCdaJywneiddPC9jb2RlPj9cclxuICogXHJcbiAqIEluIG9yZGVyIHRvIHByb3ZpZGUgYSByZWxpYWJsZSBpbXBsZW1lbnRhdGlvbiBJIHdvdWxkIGhhdmUgdG8gY3JlYXRlIG15IG93blxyXG4gKiAgaW1wbGVtZW50YXRpb24gb2YgPGNvZGU+U3RyaW5nLnByb3RvdHlwZS5sb2NhbGVDb21wYXJlPC9jb2RlPiBhbmQgdGhhdCdzXHJcbiAqICBqdXN0IHRvbyBtdWNoIHdvcmsgZm9yIG1lIHRvIGRvIGFsb25lLlxyXG4gKiBAdGhyb3dzIHtFcnJvcn0gXCJTdHJpbmcucHJvdG90eXBlLmxvY2FsZUNvbXBhcmUgaXMgbm90IHN0YW5kYXJkaXplZFwiXHJcbiAqL1xyXG5hdHJvcGEub2JqZWN0cy5zb3J0VmFsdWVzQWxwaGFiZXRpY2FsbHkgPSBmdW5jdGlvbiBzb3J0VmFsdWVzQWxwaGFiZXRpY2FsbHkoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHRocm93IG5ldyBFcnJvcihcIlN0cmluZy5wcm90b3R5cGUubG9jYWxlQ29tcGFyZSBpcyBub3Qgc3RhbmRhcmRpemVkXCIpO1xyXG59O1xyXG4vKipcclxuICogU29ydHMgYW4gb2JqZWN0IGJ5IGl0cyBwcm9wZXJ0aWVzIG51bWVyaWNhbGx5LlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzAxMjBcclxuICogQGV4YW1wbGVcclxuICogIHZhciB3b3Jkc0NvdW50ZWQ7XHJcbiAqICB3b3Jkc0NvdW50ZWQgPSB7XHJcbiAqICAgICAgXCIzXCIgOiBcIkRvY3VtZW50IEFcIixcclxuICogICAgICBcIjJcIiA6IFwiRG9jdW1lbnQgWlwiLFxyXG4gKiAgICAgIFwiMVwiIDogXCJEb2N1bWVudCBNXCJcclxuICogIH07XHJcbiAqICBjb25zb2xlLmxvZyggYXRyb3BhLm9iamVjdHMuc29ydFByb3BlcnRpZXNOdW1lcmljYWxseSh3b3Jkc0NvdW50ZWQpICk7XHJcbiAqICAvLyBsb2dzOiBbW1wiMVwiLCBcIkRvY3VtZW50IE1cIl0sIFtcIjJcIiwgXCJEb2N1bWVudCBaXCJdLCBbXCIzXCIsIFwiRG9jdW1lbnQgQVwiXV1cclxuICogQHBhcmFtIHtPYmplY3R9IG9iaiBBIHNpbXBsZSBvYmplY3Qgd2hlcmUgdGhlIHByb3BlcnRpZXNcclxuICogIGFsbCBoYXZlIG51bWVyaWMtaXNoIHZhbHVlcy5cclxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGFuIGFycmF5IG9mIGFycmF5cyB3aGVyZSBlYWNoXHJcbiAqICBuZXN0ZWQgYXJyYXkgd2lsbCBoYXZlIHRoZSBvYmplY3RzIGtleSBzdG9yZWQgaW4gZWxlbWVudCAwIGFuZFxyXG4gKiAgdGhlIHZhbHVlIHN0b3JlZCBpbiBlbGVtZW50IDEuXHJcbiAqIEBzZWUgYXRyb3BhLm9iamVjdHMuc29ydFxyXG4gKi9cclxuYXRyb3BhLm9iamVjdHMuc29ydFByb3BlcnRpZXNOdW1lcmljYWxseSA9IGZ1bmN0aW9uIHNvcnRQcm9wZXJ0aWVzTnVtZXJpY2FsbHkoXHJcbiAgICBvYmpcclxuKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIGZ1bmN0aW9uIHNvcnRGbihhLCBiKSB7XHJcbiAgICAgICAgcmV0dXJuIChhIC0gYik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXRyb3BhLm9iamVjdHMuc29ydFByb3BlcnRpZXMob2JqLCBzb3J0Rm4pO1xyXG59O1xyXG4vKipcclxuICogVGhyb3dzIGFuIGVycm9yLCA8Y29kZT5TdHJpbmcucHJvdG90eXBlLmxvY2FsZUNvbXBhcmU8L2NvZGU+IGlzIG5vdCBcclxuICogIHN0YW5kYXJkaXplZC5cclxuICogXHJcbiAqICBZZXMsIGxvY2FsZUNvbXBhcmUgaXMgaW4gdGhlIHN0YW5kYXJkIGJ1dCwgYXQgdGhpcyB0aW1lIHRoZSBhY3R1YWxcclxuICogIGNvbXBhcmlzb24gaXMgaW1wbGVtZW50YXRpb24gZGVwZW5kYW50LiBUaGlzIG1lYW5zIHRoYXQgXCJhbHBoYWJldGljYWwgb3JkZXJcIlxyXG4gKiAgY2FuIGJlIGRpZmZlcmVudCBvbiBkaWZmZXJlbnQgcGxhdGZvcm1zLiBXaGF0IEkgZm91bmQgd2FzIHRoYXQgaW4gbm9kZSB0aGVcclxuICogIGFycmF5IG9mIDxjb2RlPlsnYScsJ1onLCdBJywneiddPC9jb2RlPiB3b3VsZCBiZSBzb3J0ZWQgdG9cclxuICogIDxjb2RlPlsnQScsJ1onLCdhJywnelwiXTwvY29kZT4sIHdoaWxlIG9uXHJcbiAqICBmaXJlZm94IGl0IHdvdWxkIGJlIHNvcnRlZCB0byA8Y29kZT5bJ2EnLCdBJywneicsJ1onXTwvY29kZT4uIFdobyBrbm93cyBpZlxyXG4gKiAgYW5vdGhlciBpbXBsZW1lbnRvciB3b3VsZCBzb3J0IGl0IDxjb2RlPlsnQScsJ2EnLCdaJywneiddPC9jb2RlPj9cclxuICogXHJcbiAqIEluIG9yZGVyIHRvIHByb3ZpZGUgYSByZWxpYWJsZSBpbXBsZW1lbnRhdGlvbiBJIHdvdWxkIGhhdmUgdG8gY3JlYXRlIG15IG93blxyXG4gKiAgaW1wbGVtZW50YXRpb24gb2YgPGNvZGU+U3RyaW5nLnByb3RvdHlwZS5sb2NhbGVDb21wYXJlPC9jb2RlPiBhbmQgdGhhdCdzXHJcbiAqICBqdXN0IHRvbyBtdWNoIHdvcmsgZm9yIG1lIHRvIGRvIGFsb25lLlxyXG4gKiBAdGhyb3dzIHtFcnJvcn0gXCJTdHJpbmcucHJvdG90eXBlLmxvY2FsZUNvbXBhcmUgaXMgbm90IHN0YW5kYXJkaXplZFwiXHJcbiAqL1xyXG5hdHJvcGEub2JqZWN0cy5zb3J0UHJvcGVydGllc0FscGhhYmV0aWNhbGx5ID0gXHJcbmZ1bmN0aW9uIHNvcnRQcm9wZXJ0aWVzQWxwaGFiZXRpY2FsbHkob2JqKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHRocm93IG5ldyBFcnJvcihcIlN0cmluZy5wcm90b3R5cGUubG9jYWxlQ29tcGFyZSBpcyBub3Qgc3RhbmRhcmRpemVkXCIpO1xyXG59O1xyXG5cclxuXHJcblxyXG5cclxud2hpbGUoYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLmxlbmd0aCA+IDApIHtcclxuICAgIGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5wb3AoKSgpO1xyXG59XHJcbm1vZHVsZS5leHBvcnRzID0gYXRyb3BhO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vZG9jcy92c2RvYy9PcGVuTGF5ZXJzQWxsLmpzXCIvPlxudmFyIGF0cm9wYSA9IHJlcXVpcmUoJ2F0cm9wYS1oZWFkZXInKTtcbi8qanNsaW50XG4gICAgaW5kZW50OiA0LFxuICAgIG1heGVycjogNTAsXG4gICAgd2hpdGU6IHRydWUsXG4gICAgYnJvd3NlcjogdHJ1ZSxcbiAgICBkZXZlbDogdHJ1ZSxcbiAgICBwbHVzcGx1czogdHJ1ZSxcbiAgICByZWdleHA6IHRydWVcbiovXG4vKmdsb2JhbCBhdHJvcGEgKi9cbi8vIGVuZCBoZWFkZXJcblxuLyoqXG4gKiBDb250YWluZXIgZm9yIHJlZ2V4IGZ1bmN0aW9ucy5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAdmVyc2lvbiAyMDEyMDkwOVxuICogQG5hbWVzcGFjZSBDb250YWluZXIgZm9yIHJlZ2V4IGZ1bmN0aW9ucy5cbiAqL1xuYXRyb3BhLnJlZ2V4ID0ge307XG4vKipcbiAqIFJlZ2V4IHBhdHRlcm5zLlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAqIEBuYW1lc3BhY2UgUmVnZXggcGF0dGVybnMuXG4gKi9cbmF0cm9wYS5yZWdleC5wYXR0ZXJucyA9IHtcbiAgICAvKiogZmluZHMgcmVwZWF0ZWQgd29yZHMgYW5kIHBocmFzZXMgKi9cbiAgICByZXBlYXRlZFdvcmRzIDogLyhcXGIuezMsfVxcYilcXHMqKFxcMSkvZyxcbiAgICAvKiogZmluZHMgcGFyYWdyYXBoIGJyZWFrcyAqL1xuICAgIHBhcmFncmFwaEJyZWFrcyA6IC8oXFxyXFxuXFxyXFxufFxcblxcbnxcXHJcXHIpL2csXG4gICAgLyoqIGZpbmRzIGxpbmUgYnJlYWtzICovXG4gICAgbGluZUJyZWFrcyA6IC8oXFxyXFxufFxccnxcXG4pL2dcbn07XG4vKipcbiAqIEFwcGVuZHMgY29tbW9uIHByZWZpeCwgc3VmZml4LCBhbmQgd29yZCBib3VuZGFyeSByZWdleCBzdHJpbmdzIHRvXG4gKiB0aGUgc3VwcGxpZWQgd29yZC5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAdmVyc2lvbiAyMDEzMDExMFxuICogQHBhcmFtIHtTdHJpbmd9IHdvcmQgVGhlIHdvcmQgdG8gYXBwZW5kIHByZWZpeCBhbmQgc3VmZml4IHRvXG4gKiBAcGFyYW0ge0ludGVnZXJ9IHRocmVzaG9sZCBUaGUgd29yZC5sZW5ndGggYXQgd2hpY2ggaXQgZG9lcyBub3RcbiAqIG1ha2Ugc2Vuc2UgdG8gYXBwZW5kIHByZWZpeCBhbmQgc3VmZml4LiBEZWZhdWx0cyB0byAzLlxuICogQHJldHVybnMge1N0cmluZ30gUmV0dXJucyB0aGUgc3VwcGxpZWQgd29yZCB3aXRoIHByZWZpeCwgc3VmZml4LFxuICogYW5kIHdvcmQgYm91bmRhcmllcyBhdHRhY2hlZC4gSWYgdGhlIHdvcmQubGVuZ3RoIHdhcyBub3QgZ3JlYXRlclxuICogdGhhbiB0aGUgdGhyZXNob2xkLCBvbmx5IHdvcmQgYm91bmRhcmllcyBhcmUgYXR0YWNoZWQuIFRoZSBzdHJpbmdcbiAqIHJlcHJlc2VudHMgYSBSZWdFeCB3aGljaCBzaG91bGQgcGljayBvdXQgbW9zdCBmb3JtcyBvZiByZWd1bGFyXG4gKiB3b3Jkcy5cbiAqL1xuYXRyb3BhLnJlZ2V4LmFwcGVuZFByZWZpeGVzQW5kU3VmZml4ZXMgPSBmdW5jdGlvbiAod29yZCwgdGhyZXNob2xkKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgdmFyIHByZWZpeGVzLFxuICAgIHN1ZmZpeGVzO1xuICAgIHByZWZpeGVzID0gJyhwcmV8dW58cmUpPyc7XG4gICAgc3VmZml4ZXMgPSAnKGlmaWNhdGlvbnwnICtcbiAgICAgICAgICAgICAgICAndGlvbmFsbHl8JyArXG4gICAgICAgICAgICAgICAgJ2ljYXRpb258JyArXG4gICAgICAgICAgICAgICAgJ2lmaWVkfGlzdGljfGluZXNzfCcgK1xuICAgICAgICAgICAgICAgICdmYXJlfHRpb258YW5jZXxlbmNlfGxlc3N8YWxseXxhYmxlfG5lc3N8aXplZHxpc2VkfCcgK1xuICAgICAgICAgICAgICAgICdvdXN8aWZ5fGluZ3xpdHl8ZnVsfGFudHxhdGV8ZXN0fGlzbXxpem18aXN0fCcgK1xuICAgICAgICAgICAgICAgICdpY3xhbHxlZHxlcnxldHxseXxyc3xpbnwnICtcbiAgICAgICAgICAgICAgICAneXxzfHJ8ZCk/JztcbiAgICBcbiAgICB0aHJlc2hvbGQgPSB0aHJlc2hvbGQgPT09IHVuZGVmaW5lZCA/IDMgOiB0aHJlc2hvbGQ7XG4gICAgXG4gICAgaWYgKHdvcmQubGVuZ3RoID4gdGhyZXNob2xkKSB7XG4gICAgICAgIHdvcmQgPSAnXFxcXGInICsgcHJlZml4ZXMgKyB3b3JkICsgc3VmZml4ZXMgKyAnXFxcXGInO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHdvcmQgPSAnXFxcXGIoKScgKyB3b3JkICsgJygpXFxcXGInO1xuICAgIH1cbiAgICByZXR1cm4gd29yZDtcbn07XG5cblxuXG5cbndoaWxlKGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5sZW5ndGggPiAwKSB7XG4gICAgYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLnBvcCgpKCk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGF0cm9wYTtcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9kb2NzL3ZzZG9jL09wZW5MYXllcnNBbGwuanNcIi8+XG52YXIgYXRyb3BhID0gcmVxdWlyZSgnYXRyb3BhLWhlYWRlcicpO1xuLypqc2xpbnRcbiAgICBpbmRlbnQ6IDQsXG4gICAgbWF4ZXJyOiA1MCxcbiAgICB3aGl0ZTogdHJ1ZSxcbiAgICBicm93c2VyOiB0cnVlLFxuICAgIGRldmVsOiB0cnVlLFxuICAgIHBsdXNwbHVzOiB0cnVlLFxuICAgIHJlZ2V4cDogdHJ1ZVxuKi9cbi8qZ2xvYmFsIGF0cm9wYSAqL1xuLy8gZW5kIGhlYWRlclxuXG5hdHJvcGEucmVxdWlyZXMoXG4gICAgJ3JlbW92ZU5vZGVCeVJlZmVyZW5jZScsXG4gICAgZnVuY3Rpb24gKCkge1xuICAgICAgICBcInVzZSBzdHJpY3RcIjtcbiAgICAgICAgaWYoZG9jdW1lbnQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbik7XG5cbi8qKlxuICogUmVtb3ZlcyBET00gTm9kZXMuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQHZlcnNpb24gMjAxMjA5MDlcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtET00gTm9kZX0gZWxlbWVudFJlZmVyZW5jZSBBIHJlZmVyZW5jZSB0byB0aGUgRE9NIE5vZGUgeW91IHdhbnRcbiAqIHRvIHJlbW92ZS5cbiAqL1xuYXRyb3BhLnJlbW92ZU5vZGVCeVJlZmVyZW5jZSA9IGZ1bmN0aW9uIChlbGVtZW50UmVmZXJlbmNlKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgYXRyb3BhLnN1cHBvcnRDaGVjaygncmVtb3ZlTm9kZUJ5UmVmZXJlbmNlJyk7XG4gICAgaWYoZWxlbWVudFJlZmVyZW5jZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGVsZW1lbnRSZWZlcmVuY2UucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbGVtZW50UmVmZXJlbmNlKTtcbiAgICB9XG59O1xuXG5cblxuXG53aGlsZShhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMubGVuZ3RoID4gMCkge1xuICAgIGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5wb3AoKSgpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBhdHJvcGE7XG4iLCJhcmd1bWVudHNbNF1bNV1bMF0uYXBwbHkoZXhwb3J0cyxhcmd1bWVudHMpIiwiYXJndW1lbnRzWzRdWzIyXVswXS5hcHBseShleHBvcnRzLGFyZ3VtZW50cykiLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vZG9jcy92c2RvYy9PcGVuTGF5ZXJzQWxsLmpzXCIvPlxyXG52YXIgYXRyb3BhID0gcmVxdWlyZSgnYXRyb3BhLWhlYWRlcicpO1xyXG4vKmpzbGludFxyXG4gICAgaW5kZW50OiA0LFxyXG4gICAgbWF4ZXJyOiA1MCxcclxuICAgIHdoaXRlOiB0cnVlLFxyXG4gICAgYnJvd3NlcjogdHJ1ZSxcclxuICAgIGRldmVsOiB0cnVlLFxyXG4gICAgcGx1c3BsdXM6IHRydWUsXHJcbiAgICByZWdleHA6IHRydWVcclxuKi9cclxuLypnbG9iYWwgYXRyb3BhICovXHJcbi8vIGVuZCBoZWFkZXJcclxuXHJcbi8qKlxyXG4gKiBVdGlsaXRpZXMgZm9yIGhhbmRsaW5nIHVybHMuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDcxM1xyXG4gKiBAbmFtZXNwYWNlIFV0aWxpdGllcyBmb3IgaGFuZGxpbmcgdXJscy5cclxuICovXHJcbmF0cm9wYS51cmwgPSB7fTtcclxuLyoqXHJcbiAqIEdldHMgdGhlIGZpbGVuYW1lIHBvcnRpb24gb2YgYSB1cmxcclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSB1cmwgVGhlIHVybC5cclxuICogQHJldHVybnMge1N0cmluZ30gUmV0dXJucyBldmVyeXRoaW5nIGFmdGVyIHRoZSBsYXN0IC8gaW4gdGhlIHVybC5cclxuICovXHJcbmF0cm9wYS51cmwuZ2V0RmlsZW5hbWUgPSBmdW5jdGlvbih1cmwpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgdmFyIGZpbGVuYW1lO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBmaWxlbmFtZSA9IFN0cmluZyh1cmwpLnJlcGxhY2UoLy4qOlxcL1xcL1teXFwvXSsvLCAnJykucmVwbGFjZSgvWyN8P10uKiQvLCAnJykubWF0Y2goL1teXFwvXSskLylbMF07XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgZmlsZW5hbWUgPSAnJztcclxuICAgIH1cclxuICAgIGlmKHVybCA9PT0gZmlsZW5hbWUpIHtcclxuICAgICAgICBmaWxlbmFtZSA9ICcnO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZpbGVuYW1lO1xyXG59O1xyXG5cclxuXHJcblxyXG5cclxud2hpbGUoYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLmxlbmd0aCA+IDApIHtcclxuICAgIGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5wb3AoKSgpO1xyXG59XHJcbm1vZHVsZS5leHBvcnRzID0gYXRyb3BhO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vZG9jcy92c2RvYy9PcGVuTGF5ZXJzQWxsLmpzXCIvPlxudmFyIGF0cm9wYSA9IHJlcXVpcmUoJ2F0cm9wYS1oZWFkZXInKTtcbmF0cm9wYS5zZXRBc09wdGlvbmFsQXJnID0gcmVxdWlyZSgnYXRyb3BhLXNldEFzT3B0aW9uYWxBcmcnKS5zZXRBc09wdGlvbmFsQXJnO1xuLypqc2xpbnRcbiAgICBpbmRlbnQ6IDQsXG4gICAgbWF4ZXJyOiA1MCxcbiAgICB3aGl0ZTogdHJ1ZSxcbiAgICBicm93c2VyOiB0cnVlLFxuICAgIGRldmVsOiB0cnVlLFxuICAgIHBsdXNwbHVzOiB0cnVlLFxuICAgIHJlZ2V4cDogdHJ1ZVxuKi9cbi8qZ2xvYmFsIGF0cm9wYSAqL1xuLy8gZW5kIGhlYWRlclxuXG4vKipcbiAqIFBvbGxpbmcgZnVuY3Rpb25zIGZvciBxdWljayBhbmQgc2xvcHB5IHdvcmsuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQHZlcnNpb24gMjAxMjA5MDlcbiAqIEBuYW1lc3BhY2UgUG9sbGluZyBmdW5jdGlvbnMgZm9yIHF1aWNrIGFuZCBzbG9wcHkgd29yay5cbiAqL1xuYXRyb3BhLndhaXRGb3IgPSB7fTtcbi8qKlxuICogR2VuZXJpYyBXYWl0IGZvciB0cnVlLlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAqIEB2ZXJzaW9uIDIwMTIwOTA5XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSB0ZXN0Rm4gQSBmdW5jdGlvbiB0byB0ZWxsIHdoZW4gdGhlIHdhaXQgaXMgb3Zlci4gTXVzdFxuICogIHJldHVybiB0cnVlIG9uIHN1Y2Nlc3MsIGZhbHNlIG9uIGZhaWx1cmUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvblN1Y2Nlc3NDYWxsYmFjayBPcHRpb25hbC4gVGhlIGZ1bmN0aW9uIHRvIHJ1biB3aGVuIHRlc3RGblxuICogIHJldHVybnMgdHJ1ZS4gRGVmYXVsdHMgdG8gPGNvZGU+ZnVuY3Rpb24gKCkge30gPC9jb2RlPlxuICogQHBhcmFtIHtmdW5jdGlvbn0gb25NYXhQb2xsQ2FsbGJhY2sgT3B0aW9uYWwuIFRoZSBmdW5jdGlvbiB0byBydW4gd2hlbiB0ZXN0Rm5cbiAqICBoYXMgYmVlbiBydW4gbWF4UG9sbCB0aW1lcyBhbmQgdGhlIHdhaXQgaXMgYmVpbmcgZ2l2ZW4gdXAuXG4gKiBEZWZhdWx0cyB0byA8Y29kZT5mdW5jdGlvbiAoKSB7fTwvY29kZT5cbiAqIEBwYXJhbSB7SW50ZWdlcn0gcG9sbEludGVydmFsIE9wdGlvbmFsLiBUaGUgYW1vdW50IG9mIHRpbWUgaW4gbXMgYmV0d2VlblxuICogIHBvbGxpbmcgdGVzdEZuIHRvIHNlZSBpZiBpdCByZXR1cm5zIHRydWUuIERlZmF1bHRzIHRvIDIwMG1zLlxuICogQHBhcmFtIHtJbnRlZ2VyfSBtYXhQb2xsIE9wdGlvbmFsLiBUaGUgcXVhbnRpdHkgb2YgcG9sbHMgYXQgd2hpY2ggaXQgbWFrZXNcbiAqICBzZW5zZSB0byBnaXZlIHVwIHdhaXRpbmcuIERlZmF1bHRzIHRvIDUwLlxuICovXG5hdHJvcGEud2FpdEZvci50ZXN0ID0gZnVuY3Rpb24gdGVzdChcbiAgICB0ZXN0Rm4sIG9uU3VjY2Vzc0NhbGxiYWNrLCBvbk1heFBvbGxDYWxsYmFjaywgcG9sbEludGVydmFsLCBtYXhQb2xsXG4pIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICBwb2xsSW50ZXJ2YWwgPSBhdHJvcGEuc2V0QXNPcHRpb25hbEFyZygyMDAsIHBvbGxJbnRlcnZhbCk7XG4gICAgbWF4UG9sbCA9IGF0cm9wYS5zZXRBc09wdGlvbmFsQXJnKDUwLCBtYXhQb2xsKTtcbiAgICBvbk1heFBvbGxDYWxsYmFjayA9IGF0cm9wYS5zZXRBc09wdGlvbmFsQXJnKGF0cm9wYS5ub3AsIG9uTWF4UG9sbENhbGxiYWNrKTtcbiAgICBvblN1Y2Nlc3NDYWxsYmFjayA9IGF0cm9wYS5zZXRBc09wdGlvbmFsQXJnKGF0cm9wYS5ub3AsIG9uU3VjY2Vzc0NhbGxiYWNrKTtcbiAgICB2YXIgbXlJbnQ7XG4gICAgdmFyIG15Q291bnRlciA9IDA7XG4gICAgZnVuY3Rpb24gd2FpdEZvclRlc3RSZWN1cnNvciAoKSB7XG4gICAgICAgIG15Q291bnRlcisrO1xuICAgICAgICBpZiAodGVzdEZuKCkpIHtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwobXlJbnQpO1xuICAgICAgICAgICAgb25TdWNjZXNzQ2FsbGJhY2soKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobXlDb3VudGVyID09PSBtYXhQb2xsKSB7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKG15SW50KTtcbiAgICAgICAgICAgIG9uTWF4UG9sbENhbGxiYWNrKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgbXlJbnQgPSBzZXRJbnRlcnZhbCh3YWl0Rm9yVGVzdFJlY3Vyc29yLCBwb2xsSW50ZXJ2YWwpO1xufTtcbi8qKlxuICogV2FpdCBmb3IgRWxlbWVudFxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAqIEB2ZXJzaW9uIDIwMTIwOTA5XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSB0ZXN0Rm4gQSBmdW5jdGlvbiB3aGljaCByZXR1cm5zIGEgcmVmZXJlbmNlIHRvIGFuIEhUTUxcbiAqICBFbGVtZW50LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gT3B0aW9uYWwuIG9uU3VjY2Vzc0NhbGxiYWNrXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBPcHRpb25hbC4gb25NYXhQb2xsQ2FsbGJhY2sgXG4gKiBAcGFyYW0ge0ludGVnZXJ9IE9wdGlvbmFsLiBwb2xsSW50ZXJ2YWxcbiAqIEBwYXJhbSB7SW50ZWdlcn0gT3B0aW9uYWwuIG1heFBvbGxcbiAqIEBzZWUgYXRyb3BhLndhaXRGb3IudGVzdCBmb3IgbW9yZSBpbmZvcm1hdGlvbiBhbmQgZGVmYXVsdCB2YWx1ZXMgZm9yIHRoZVxuICogIG9wdGlvbmFsIHBhcmFtZXRlcnMuXG4gKi9cbmF0cm9wYS53YWl0Rm9yLmVsZW1lbnQgPSBmdW5jdGlvbiAoXG4gICAgdGVzdEZuLCBvblN1Y2Nlc3NDYWxsYmFjaywgb25NYXhQb2xsQ2FsbGJhY2ssIHBvbGxJbnRlcnZhbCwgbWF4UG9sbFxuKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBIVE1MIERPTSBEb2N1bWVudCBhbmQgcHV0cyBpdCBpbiB0aGUgZG9jdW1lbnRcbiAgICAgKiBxdWV1ZSwgdGhlbiBleGVjdXRlcyB0aGUgY2FsbGJhY2sgZ2l2ZW4uXG4gICAgICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gICAgICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gICAgICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICAgICAqIEB2ZXJzaW9uIDIwMTIwOTA5XG4gICAgICogQG1ldGhvZE9mIGF0cm9wYS53YWl0Rm9yLmVsZW1lbnQtXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gUmV0dXJucyB0cnVlIG9yIGZhbHNlIGRlcGVuZGluZyBvbiB3aGV0aGVyIHRoZSBvYmplY3RcbiAgICAgKiAgaGFzIGEgdGFnIG5hbWUgcHJvcGVydHkuXG4gICAgICovXG4gICAgZnVuY3Rpb24gZWxlbWVudFRlc3QgKCkge1xuICAgICAgICByZXR1cm4gYXRyb3BhLmlucXVpcmUuaGFzUHJvcGVydHkodGVzdEZuKCksICd0YWdOYW1lJyk7XG4gICAgfVxuICAgIGF0cm9wYS53YWl0Rm9yLnRlc3QoXG4gICAgICAgIGVsZW1lbnRUZXN0LCBvblN1Y2Nlc3NDYWxsYmFjaywgb25NYXhQb2xsQ2FsbGJhY2ssIHBvbGxJbnRlcnZhbCwgbWF4UG9sbFxuICAgICk7XG59O1xuXG5cblxuXG53aGlsZShhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMubGVuZ3RoID4gMCkge1xuICAgIGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5wb3AoKSgpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBhdHJvcGE7XG4iLCJhcmd1bWVudHNbNF1bNV1bMF0uYXBwbHkoZXhwb3J0cyxhcmd1bWVudHMpIiwiYXJndW1lbnRzWzRdWzIyXVswXS5hcHBseShleHBvcnRzLGFyZ3VtZW50cykiLCJtb2R1bGUuZXhwb3J0cz17XHJcbiAgICBcIm5vdmVsdHkgcXVpY2tseSB3ZWFycyBvZmZcIjogXCJkdW1iIHNoaXQgZ2l0cyBvbGQgZmFzdFwiLFxyXG4gICAgXCJ0aGUgd2F5IGl0IGlzXCI6IFwiaG93IGl0IGJlXCIsXHJcbiAgICBcInB1dCB1cCB3aXRoXCI6IFwibWFuaGFuZGxlXCIsXHJcbiAgICBcInlldFwiOiBcImltbWVkaWF0ZWx5XCIsXHJcbiAgICBcImxvc2VcIjogXCJzaGFrZVwiLFxyXG4gICAgXCJmb3Igbm8gcmVhc29uXCI6IFwibWFpYWNhbGx5XCIsXHJcbiAgICBcImdpdmVuIGEgY2hvaWNlXCI6IFwiZXh0b3J0ZWRcIixcclxuICAgIFwibm90IHN0cm9uZyBlbm91Z2hcIjogXCJhaW4ndCBnb3QgdGhlIG51dHNcIixcclxuICAgIFwibm93IGF0IGFuIGVuZFwiOiBcImJyYW5kIHNwYW5raW4gbmV3XCIsXHJcbiAgICBcImJlIHRvZ2V0aGVyXCI6IFwibWFzaCB1cFwiLFxyXG4gICAgXCJhcG9jYWx5cHNlXCI6IFwicGFydHkgdGltZVwiLFxyXG4gICAgXCJub3RoaW5nIGlzIGFzc3VyZWRcIjogXCJ3ZSBsaXZlIHRvIGRlbGl2ZXJcIixcclxuICAgIFwidG8gbm8gYXZhaWxcIjogXCJmb3IgZ3JlYXQgZ29vZFwiLFxyXG4gICAgXCJ0b28gZ29vZCB0byBiZSB0cnVlXCI6IFwiZnVja2luZyBmYW50YXN0aWNcIixcclxuICAgIFwiZ3Jvd2luZyBhcGFydFwiOiBcImZ1Y2tpbmcgb3RoZXIgcGVvcGxlXCIsXHJcbiAgICBcInJlc3QgaW4gcGVhY2VcIjogXCJwYXJ0eSBsaWtlIGl0J3MgMTk5OVwiLFxyXG4gICAgXCJiYWNrIHN0YWJcIjogXCJydW1wIHNoYWtlXCIsXHJcbiAgICBcImJhY2sgc3RhYmJcIjogXCJydW1wIHNoYWtlXCIsXHJcbiAgICBcImxvb2sgaW50byB0aGVpciBleWVzXCI6IFwiZ2l2ZSB0aGVtIEFJRFNcIixcclxuICAgIFwibG9vayBpbnRvIGhlciBleWVzXCI6IFwiZ2l2ZSBoZXIgQUlEU1wiLFxyXG4gICAgXCJsb29rIGludG8gaGlzIGV5ZXNcIjogXCJnaXZlIGhpbSBBSURTXCIsXHJcbiAgICBcImNhbid0IGxpdmUgd2l0aG91dFwiOiBcInRvdWNoIG15c2VsZiBhYm91dFwiLFxyXG4gICAgXCJjYW4ndCBiZSB3aXRob3V0XCI6IFwidG91Y2ggbXlzZWxmIGFib3V0XCIsXHJcbiAgICBcImNvdWxkIG5ldmVyIGJlIHdpdGhvdXRcIjogXCJjYW4ndCB3b3JrIGFuYWwgYmVhZHMgd2l0aG91dFwiLFxyXG4gICAgXCJubyBtYXR0ZXJcIjogXCJpcnJlZ2FyZGxlc3Mgb2ZcIixcclxuICAgIFwid2lsbCBiZSB0aGVyZVwiOiBcInN0aWNrIGxpa2Ugc2hpdFwiLFxyXG4gICAgXCJ3aWxsIGFsd2F5cyBiZSB0aGVyZVwiOiBcInN0aWNrIGxpa2Ugd2V0IHNoaXRcIixcclxuICAgIFwiaG9sZGluZyB0aGVtIGNsb3NlIHRvXCI6IFwiaGFuZGN1ZmZpbmcgdGhlbSB0b1wiLFxyXG4gICAgXCJieSB5b3VyIHNpZGVcIjogXCJvbiB5b3VyIGFzc1wiLFxyXG4gICAgXCJieSBteSBzaWRlXCI6IFwib24gbXkgYXNzXCIsXHJcbiAgICBcImJ5IGhpcyBzaWRlXCI6IFwib24gaGlzIGFzc1wiLFxyXG4gICAgXCJieSBoZXIgc2lkZVwiOiBcIm9uIGhlciBhc3NcIixcclxuICAgIFwibGVhdmUgeW91ciBzaWRlXCI6IFwiZ2V0IG9mZiB5b3VyIGFzc1wiLFxyXG4gICAgXCJsZWF2ZSBteSBzaWRlXCI6IFwiZ2V0IG9mZiBteSBhc3NcIixcclxuICAgIFwibGVhdmUgaGlzIHNpZGVcIjogXCJnZXQgb2ZmIGhpcyBhc3NcIixcclxuICAgIFwibGVhdmUgaGVyIHNpZGVcIjogXCJnZXQgb2ZmIGhlciBhc3NcIixcclxuICAgIFwiZG9lc24ndCBoYXBwZW4gb3ZlclwiOiBcImNhcnR3aGVlbHMgc3RyYWlnaHQgYWNyb3NzXCIsXHJcbiAgICBcIm1lYW5zIG1hbnkgdGhpbmdzXCI6IFwiaXMgYmVzdCBkZXNjcmliZWQgd2l0aCBsaWVzXCIsXHJcbiAgICBcImxheWluZyBpbiBiZWRcIjogXCJ0YWtpbmcgYSBzaGl0XCIsXHJcbiAgICBcInByb21pc2VcIjogXCJsaWVcIixcclxuICAgIFwibGlhclwiOiBcImZpYmJlclwiLFxyXG4gICAgXCJsaWVcIjogXCJmaWJcIixcclxuICAgIFwibGllc1wiOiBcImZpYnNcIixcclxuICAgIFwid2hhdCdzIHRoZSBwb2ludFwiOiBcInRoZSBmdWNrcyB0aGlzIG1lYW5cIixcclxuICAgIFwiaXQgbXVzdCBiZSB0cnVlXCI6IFwiZm9yIHJlYWwgJ24nIHNoaXRcIixcclxuICAgIFwid2hhdCBwZW9wbGUgc2F5XCI6IFwibXV0aGFwaHVra2FzIGJlIHRhbGtpblwiLFxyXG4gICAgXCJldGNoZWRcIjogXCJncm91bmRcIixcclxuICAgIFwiZG9uJ3QgaGF2ZSBhIGNsdWVcIjogXCJnb3Qgc2hpdCB0d2lzdGVkXCIsXHJcbiAgICBcInZpc2Npb3VzIGN5Y2xlXCI6IFwiY2x1c3RlcmZ1Y2tcIixcclxuICAgIFwiZG9uJ3QgbmVlZFwiOiBcImNvdWxkIGdpdmUgYSBmdWNrIGFib3V0XCIsXHJcbiAgICBcInJhdmVuXCI6IFwicGlnZW9uXCIsXHJcbiAgICBcInRvIGdldCBhd2F5XCI6IFwidG8gZnVja2luZyBydW5cIixcclxuICAgIFwidG8gYSBiZXR0ZXJcIjogXCJmb3Igc29tZSBnbGl0dGVyZWRcIixcclxuICAgIFwiYmVhdXRpZnVsIGZhY2VcIjogXCJlbm9ybW91cyB0aXRzXCIsXHJcbiAgICBcIm1pZ2h0IGFzIHdlbGxcIjogXCJvaCBmdWNrIEkgb3VnaHR0YVwiLFxyXG4gICAgXCJ0aGUgZmlyc3QgbW9tZW50XCI6IFwic3RyYWlnaHRhd2F5XCIsXHJcbiAgICBcImFzIHdlbGxcIjogXCJhbHNvXCIsXHJcbiAgICBcInNvIGdvb2RcIjogXCJuZWF0b1wiLFxyXG4gICAgXCJjb3VsZCBkbyBhbnl0aGluZ1wiOiBcImlzIGZ1Y2tpbmcgaW5zYW5lXCIsXHJcbiAgICBcInNldCB0aGUgbW9vZFwiOiBcIndoaXAgaXQgb3V0XCIsXHJcbiAgICBcImJhYnkgaWZcIjogXCJsb29rIGJpdGNoLFwiLFxyXG4gICAgXCJ0aHJvdWdoIHlvdXIgaGFpclwiOiBcInVwc2lkZSB5b3VyIGhlYWRcIixcclxuICAgIFwiZW50ZXJlZCB0aGUgaG91c2Ugb2ZcIjogXCJnb3QgdXAgaW4gdGhlIGJhcm4gZm9yXCIsXHJcbiAgICBcImFsd2F5cyBsb3ZlIHlvdSB0aGUgc2FtZVwiOiBcImFsd2F5cyBsb3ZlIHlvdSBsaWtlIG15IG90aGVyIHN1Y2tlcnNcIixcclxuICAgIFwia2lzc2luZyBvdGhlclwiOiBcImdvaW5nIGRvd24gb25cIixcclxuICAgIFwibmV2ZXIgdGhvdWdodCB5b3Ugd291bGQgZG8gdGhhdFwiOiBcImdvdCB0dXJuZWQgb3V0IGxpa2UgYSBkdW1iIGZ1Y2tcIixcclxuICAgIFwibGF5aW5nIG9uIHRoZSBmbG9vclwiOiBcImJlZ2dpbmcgZm9yIGl0XCIsXHJcbiAgICBcImZpcnN0IGxhaWQgZXllcyBvblwiOiBcImZpcnN0IHRyaWVkIGdyb3BpbmdcIixcclxuICAgIFwibW9zdCBwZW9wbGUgY2FuIG9ubHlcIjogXCJtb3N0IGZyZWFrcyBhbmQgZG9wZSBmaWVuZHNcIixcclxuICAgIFwieW91IHdlcmUgdGhlIG9uZVwiOiBcInlvdSB3ZXJlIG15IHRhcmdldFwiLFxyXG4gICAgXCJzdGFuZGluZyBvdXQgZnJvbSB0aGUgY3Jvd2RcIjogXCJ3b2JibGluZyBsaWtlIGFuIGVsZXBoYW50IG9uIGEgYmljeWNsZVwiLFxyXG4gICAgXCJzdG9vZCBvdXQgZnJvbSB0aGUgY3Jvd2RcIjogXCJqaWdnbGVkIGxpa2UgYSBqZWxsbyBTYW50YVwiLFxyXG4gICAgXCJzdGFuZCBvdXQgZnJvbSB0aGUgY3Jvd2RcIjogXCJsb29rIGxpa2UgYSBqYWNrYXNzXCIsXHJcbiAgICBcInN0YW5kcyBvdXQgZnJvbSB0aGUgY3Jvd2RcIjogXCJzbWVsbHMgbGlrZSBvbGQgZGlja1wiLFxyXG4gICAgXCJpJ3ZlIG5ldmVyIGZlbHQgdGhpcyB3YXlcIjogXCJpJ3ZlIGRvbmUgdGhpc1wiLFxyXG4gICAgXCJ3aXRoIGV2ZXJ5IGZpYmVyXCI6IFwiZnJvbSBwaXRoeSBwaXRzXCIsXHJcbiAgICBcIndhbmRlclwiOiBcInN0dW1ibGVcIixcclxuICAgIFwiaGF1bnRcIjogXCJzdGFsa1wiLFxyXG4gICAgXCJtYXNrXCI6IFwidHJhc2hiYWdcIixcclxuICAgIFwiZGVtb25pYyBhbmdlbFwiOiBcImFzcyBwaXJhdGVcIixcclxuICAgIFwiYW5nZWxpYyBkZW1vblwiOiBcImFzcyBwaXJhdGVcIixcclxuICAgIFwiY3VubmluZ1wiOiBcImRlc3BlcmF0ZVwiLFxyXG4gICAgXCJkYW5nZXJvdXNcIjogXCJjb2NrIGNhdGNoaW5nXCIsXHJcbiAgICBcImRlbWktZ29kXCI6IFwicHVuayBiaXRjaFwiLFxyXG4gICAgXCJkZW1pZ29kXCI6IFwicHVuayBiaXRjaFwiLFxyXG4gICAgXCJtb3J0YWxcIjogXCJxdWVlclwiLFxyXG4gICAgXCJpbW1vcnRhbFwiOiBcIndoaW55XCIsXHJcbiAgICBcImJldHJheWFsXCI6IFwiZ2FtZVwiLFxyXG4gICAgXCJiZXRyYXlcIjogXCJzY3Jld1wiLFxyXG4gICAgXCJnYXZlIHVwIG9uXCI6IFwiZG9uJ3QgZ2l2ZSBhIGZ1Y2sgYWJvdXRcIixcclxuICAgIFwiZ2l2ZSB1cCBvblwiOiBcIndvbid0IGdpdmUgYSBmdWNrIGFib3V0XCIsXHJcbiAgICBcImdpdmVuIHVwIG9uXCI6IFwiZG9uJ3QgZ2l2ZSBhIGZ1Y2sgYWJvdXRcIixcclxuICAgIFwiZ2l2aW5nIHVwIG9uXCI6IFwiYWluJ3QgZ2l2aW4gYSBmdWNrIGFib3V0XCIsXHJcbiAgICBcImNvZmZpblwiOiBcInRvYm9nYW5cIixcclxuICAgIFwiYmVhdXRpZnVsXCI6IFwiZ2F1ZHlcIixcclxuICAgIFwidGhlIGJlc3RcIjogXCJ0aGUgYmFkZGVzdFwiLFxyXG4gICAgXCJzZWxmaXNoXCI6IFwidGhpZXZpbmdcIixcclxuICAgIFwid2Fsa2VkIG91dFwiOiBcIm5hcnJvd2x5IGVzY2FwZWRcIixcclxuICAgIFwid2FsayBvdXRcIjogXCJuYXJyb3dseSBlc2NhcGVcIixcclxuICAgIFwid2Fsa2luZyBvdXRcIjogXCJuYXJyb3dseSBlc2NhcGluZ1wiLFxyXG4gICAgXCJnb3QgaW4geW91ciB3YXlcIjogXCJnb3QgYWxsIHVwIGluIHlvdXIgc2hpdFwiLFxyXG4gICAgXCJ0cnlcIjogXCJzaG9vdFwiLFxyXG4gICAgXCJ0aGUgcG9pbnQgb2Ygbm8gcmV0dXJuXCI6IFwidGhlIGZhdCBnaXJscyBiZWRyb29vbSBkb29yXCIsXHJcbiAgICBcIm9ubHkgd2FudGVkXCI6IFwiYmVnZ2VkIGZvclwiLFxyXG4gICAgXCJndWVzcyBpdCBkb2Vzbid0IG1hdHRlclwiOiBcImtub3cgdGhpcyBzaGl0IGlzIHBvaW50bGVzc1wiLFxyXG4gICAgXCJsb29rIGJhY2tcIjogXCJsaWNrIHdpbmRvd3NcIixcclxuICAgIFwicGF0aFwiOiBcInNpZGV3YWxrXCIsXHJcbiAgICBcInNoaW5lXCI6IFwiYmxpbmdcIixcclxuICAgIFwiaW4gdGhlIG1pZGRsZSBvZlwiOiBcImFsbCB1cCBpblwiLFxyXG4gICAgXCJkZWVwIGRvd24gaW5zaWRlXCI6IFwiaW4gdGhlIGJvdHRvbSBvZiB0aGUgdGFua1wiLFxyXG4gICAgXCJwaWVjZSBieSBwaWVjZVwiOiBcIm9uZSBoYW5kam9iIGF0IGEgdGltZVwiLFxyXG4gICAgXCJhdXJhXCI6IFwic3RlbmNoXCIsXHJcbiAgICBcImNhbmRsZVwiOiBcImdsb3dzdGlja1wiLFxyXG4gICAgXCJmb3IgaGVyXCI6IFwidG8gdGhhdCBicm9hZHNcIixcclxuICAgIFwiZm9yIHNoZVwiOiBcIidjYXVzZSB0aGUgY3VudFwiLFxyXG4gICAgXCJmb3IgaGVcIjogXCJ0aGlzIGR1bWIgbW90aGVyIGZ1Y2tlclwiLFxyXG4gICAgXCJmb3Jlc3RcIjogXCJjYW1wZ3JvdW5kXCIsXHJcbiAgICBcImhhbmQgaW4gaGFuZFwiOiBcImNvY2sgdG8gamF3XCIsXHJcbiAgICBcImhhbmQgdG8gaG9sZFwiOiBcIm51dHMgdG8gZ3JpcFwiLFxyXG4gICAgXCJnaXJsIG1lZXRzIGJveVwiOiBcImhvcm55IGtpZHMgaG9vayB1cFwiLFxyXG4gICAgXCJib3kgbWVldHMgZ2lybFwiOiBcImhvcm55IGtpZHMgaG9vayB1cFwiLFxyXG4gICAgXCJzdW5ueVwiOiBcInN3ZWx0ZXJpbmdcIixcclxuICAgIFwic28gbmVydm91c1wiOiBcInNvIGZ1Y2tpbmcgZHJ1bmtcIixcclxuICAgIFwia2lzc1wiOiBcInNsYXBcIixcclxuICAgIFwiZmluZ2VydGlwc1wiOiBcImNoaWNrZW4gbnVnZ2V0c1wiLFxyXG4gICAgXCJ0ZWxsIHlvdSBpJ20gZmluZVwiOiBcInNjcmVtIEknTSBGVUNLSU4gT0tcIixcclxuICAgIFwid3JpdGVcIjogXCJzY3Jhd2xcIixcclxuICAgIFwid3JpdHRlblwiOiBcInNjcmF3bGVkXCIsXHJcbiAgICBcIndyb3RlXCI6IFwic2NyYXdsZWRcIixcclxuICAgIFwiZmlyc3Qgb2YgYWxsXCI6IFwibW0ta2F5XCIsXHJcbiAgICBcImJyaW5nIGZvcnRoXCI6IFwid2hpcCBvdXRcIixcclxuICAgIFwiaW50byB0aGUgbGlnaHRcIjogXCJvbiB0byB0aGUgbGlnaHRcIixcclxuICAgIFwidGhlIG9ubHkgb25lXCI6IFwiZnVja2luZyBzdHVwaWRcIixcclxuICAgIFwidG8gdGhlIGxpZ2h0XCI6IFwib3V0IGluIHB1YmxpY1wiLFxyXG4gICAgXCJ0YWxrXCI6IFwiY3Vzc1wiLFxyXG4gICAgXCJmdWxsIG9mIGxpZmVcIjogXCJmdWxsIG9mIHNoaXRcIixcclxuICAgIFwiY2FuJ3QgZmluZCB0aGUgd29yZHMgdG8gc2F5XCI6IFwiY291bGQgYmx1cnQgb3V0IHNvbWUgZHVtYiBzaGl0XCIsXHJcbiAgICBcImNvbnN1bWVcIjogXCJzdWNrXCIsXHJcbiAgICBcImNvbnN1bWluZ1wiOiBcInN1Y2tpbmdcIixcclxuICAgIFwicGlsbG93XCI6IFwic3RvbmVcIixcclxuICAgIFwiYWR2aWNlXCI6IFwiYnVsbHNoaXRcIixcclxuICAgIFwidW5pdmVyc2VcIjogXCJ0b2lsZXQgYm93bFwiLFxyXG4gICAgXCJlbGRlclwiOiBcIm9sZCBmb2xrXCIsXHJcbiAgICBcIm1hZ2lja1wiOiBcImRlbHVzaW9uXCIsXHJcbiAgICBcIm1hZ2ljXCI6IFwiaG9wZVwiLFxyXG4gICAgXCJhcmNhbmVcIjogXCJmb29saXNoXCIsXHJcbiAgICBcInNwZWFrIG9mXCI6IFwidGFsayBhYm91dFwiLFxyXG4gICAgXCJzaGFsbFwiOiBcInNob3VsZC13aWxsXCIsXHJcbiAgICBcIm9idGFpblwiOiBcImdldFwiLFxyXG4gICAgXCJiYXR0bGVcIjogXCJzcXVhYmJsZVwiLFxyXG4gICAgXCJtaWRuaWdodFwiOiBcImRheWJyZWFrXCIsXHJcbiAgICBcInNvcnJvd1wiOiBcIndoaW1wZXJcIixcclxuICAgIFwiY3JpbXNvblwiOiBcImF6dXJlXCIsXHJcbiAgICBcImJsYWNrXCI6IFwieWVsbG93XCIsXHJcbiAgICBcIndvbid0IG1ha2UgaXQgdGhyb3VnaFwiOiBcImNvdWxkIHNoaW1teSBwYXN0XCIsXHJcbiAgICBcIm5pZ2h0XCI6IFwiYmVkdGltZVwiLFxyXG4gICAgXCJkYXlcIjogXCJtb3JuaW5nXCIsXHJcbiAgICBcImZyYWdpbGVcIjogXCJzdHVyZHlcIixcclxuICAgIFwiY3JhY2tcIjogXCJtZW5kXCIsXHJcbiAgICBcInNvbGl0dWRlXCI6IFwiYW1iaWFuY2VcIixcclxuICAgIFwidG9ybWVudFwiOiBcInRpY2tsZVwiLFxyXG4gICAgXCJpbmNhbnRhdGlvblwiOiBcIm11Y2ggeWFtbWVyaW5nXCIsXHJcbiAgICBcImhvcGVsZXNzXCI6IFwicGl0aWZ1bFwiLFxyXG4gICAgXCJkZXByZXNzaW5nXCI6IFwiaW5lYnJpYXRpbmdcIixcclxuICAgIFwiZGVwcmVzc2VkXCI6IFwiZHJ1bmtcIixcclxuICAgIFwiZGVwcmVzc2lvblwiOiBcInNvIG11Y2ggYm9vemVcIixcclxuICAgIFwic2FkZGVuZWRcIjogXCJtYWRlIGZsYWNjaWRcIixcclxuICAgIFwic2FkbmVzc1wiOiBcImltcG90ZW5jZVwiLFxyXG4gICAgXCJuZXZlcmVuZGluZ1wiOiBcIm5ldmVyIGVuZGluZ1wiLFxyXG4gICAgXCJuZXZlciBlbmRpbmdcIjogXCJyZWxlbnRsZXNzXCIsXHJcbiAgICBcIm5ldmVyIGdvaW5nXCI6IFwiZnVja2VkIGZvciB0cnlpbmdcIixcclxuICAgIFwiY2hhbmdlIG9uZSB0aGluZ1wiOiBcImZ1Y2sgc29tZSduIHVwXCIsXHJcbiAgICBcIm5ldmVyIGVuZFwiOiBcImRyYWcgb25cIixcclxuICAgIFwid2lsbCBub3QgaGVhbFwiOiBcImZlc3RlcnNcIixcclxuICAgIFwib3V0d2FyZCBhcHBlYXJhbmNlXCI6IFwiZmFjYWRlXCIsXHJcbiAgICBcImVtb1wiOiBcImNsb3NldCBob21vXCIsXHJcbiAgICBcImJsYWNrZW5lZCB3YWxsc1wiOiBcImZpbHRoeSByb29tc1wiLFxyXG4gICAgXCJmYXJld2VsbFwiOiBcImFkaW9zXCIsXHJcbiAgICBcIm1lZXQgYWdhaW5cIjogXCJoYXZlIGFub3RoZXIgZ28tcm91bmRcIixcclxuICAgIFwic2FkZFwiOiBcImZsYWNjaWRcIixcclxuICAgIFwic2FkXCI6IFwiaW1wb3RlbnRcIixcclxuICAgIFwiYW1pZHN0XCI6IFwiYWxsIHVwIGluXCIsXHJcbiAgICBcIm1pZHN0XCI6IFwicGFudHNcIixcclxuICAgIFwia25vd2xlZGdlXCI6IFwidHJpdmlhXCIsXHJcbiAgICBcImtub3duXCI6IFwiZ290XCIsXHJcbiAgICBcImtub3dcIjogXCJnZXRcIixcclxuICAgIFwia25ld1wiOiBcImdvdFwiLFxyXG4gICAgXCJwYXNzaW9uYXRlXCI6IFwiZGVsaXJpb3VzXCIsXHJcbiAgICBcInBhc3Npb25cIjogXCJkZWxpcml1bVwiLFxyXG4gICAgXCJvJ1wiOiBcInVoXCIsXHJcbiAgICBcIm9cIjogXCJ1aFwiLFxyXG4gICAgXCJmYW5nXCI6IFwiZGVudHVyZVwiLFxyXG4gICAgXCJjdXJzZVwiOiBcInN0YWluXCIsXHJcbiAgICBcImxvdmVcIjogXCJjb25mdXNlXCIsXHJcbiAgICBcInZhbXBpcmljXCI6IFwicGVkb3BoaWxpY1wiLFxyXG4gICAgXCJ2YW1weXJlXCI6IFwicGVkb3BoeWxlXCIsXHJcbiAgICBcInZhbXBpcmVcIjogXCJwZWRvcGhpbGVcIixcclxuICAgIFwicHJvYmxlbVwiOiBcInVzZWxlc3MgY29uY2VyblwiLFxyXG4gICAgXCJmZWVsXCI6IFwiZm9uZGxlXCIsXHJcbiAgICBcIndvZVwiOiBcImNobGFteWRpYVwiLFxyXG4gICAgXCJlbXB0eVwiOiBcImJsb2F0ZWRcIixcclxuICAgIFwiaGF0cmVkXCI6IFwib2RpdW1cIixcclxuICAgIFwiaGF0ZVwiOiBcImRpc2xpa2VcIixcclxuICAgIFwic2NhcnJlZFwiOiBcInN0cmlhdGVkXCIsXHJcbiAgICBcInNjYXJzXCI6IFwic3RyaWFlXCIsXHJcbiAgICBcInNjYXJlXCI6IFwidGlja2xlXCIsXHJcbiAgICBcInNjYXJ5XCI6IFwidGlja2x5XCIsXHJcbiAgICBcInNjYXJcIjogXCJzdHJpYVwiLFxyXG4gICAgXCJ3b3VuZFwiOiBcIm91Y2hpZVwiLFxyXG4gICAgXCJzbGl0XCI6IFwiY3JldmljZVwiLFxyXG4gICAgXCJzbGljZVwiOiBcInBldFwiLFxyXG4gICAgXCJ0d2FzXCI6IFwiaXQgd2FzXCIsXHJcbiAgICBcImJpZyBicm90aGVyXCI6IFwibXkgcGFyYW5vaWFcIixcclxuICAgIFwiZXRlcm5pdHlcIjogXCJhd2hpbGVcIixcclxuICAgIFwiZXRlcm5hbGx5XCI6IFwiZm9yIGEgYml0XCIsXHJcbiAgICBcImV0ZXJuYWxcIjogXCJpbWFnaW5lZFwiLFxyXG4gICAgXCJwcm9waGV0XCI6IFwiaW5zb21uaWFjXCIsXHJcbiAgICBcInByb3BoZWNpZXNcIjogXCJ3aXZlcyB0YWxlc1wiLFxyXG4gICAgXCJwcm9waGVjeVwiOiBcIndpdmVzIHRhbGVcIixcclxuICAgIFwic29sZGllclwiOiBcIm1hbmlhY1wiLFxyXG4gICAgXCJtaWxpdGlhXCI6IFwiZ2FuZ1wiLFxyXG4gICAgXCJtaWxpdGFyeVwiOiBcImdhbmdzdGVyXCIsXHJcbiAgICBcIm1pbGl0YW50XCI6IFwibWFuaWFjYWxcIixcclxuICAgIFwiZ29kZGVzc1wiOiBcIkt5bGVlIFN0cnV0dFwiLFxyXG4gICAgXCJoaWdoZXIgcG93ZXJcIjogXCJjcnVzdHkgc29ja1wiLFxyXG4gICAgXCJkYXJrXCI6IFwiZWZmZXJ2ZXNjZW50XCIsXHJcbiAgICBcImFuY2llbnRcIjogXCJlbGRlcmx5XCIsXHJcbiAgICBcInF1ZXN0XCI6IFwic3Ryb2xsXCIsXHJcbiAgICBcImhlYXJ0YmVhdFwiOiBcImNvY2sgYmVhdFwiLFxyXG4gICAgXCJoZWFydFwiOiBcImNvY2tcIixcclxuICAgIFwiYmxvb2RcIjogXCJncmVhc2VcIixcclxuICAgIFwiYmxlZWRcIjogXCJ3aGluZVwiLFxyXG4gICAgXCJjdXRcIjogXCJtdXRpbGF0ZVwiLFxyXG4gICAgXCJzbGFzaFwiOiBcIm11dGlsYXRlXCIsXHJcbiAgICBcIm1vb25saWdodFwiOiBcIm1vb25zaGluZVwiLFxyXG4gICAgXCJtb29uXCI6IFwibmlnaHQgbGlnaHRcIixcclxuICAgIFwic3RlZWxcIjogXCJsYXRleFwiLFxyXG4gICAgXCJrbmlmZVwiOiBcImRpbGRvXCIsXHJcbiAgICBcInJhem9yYmxhZGVcIjogXCJidXR0IHBsdWdcIixcclxuICAgIFwicmF6b3JcIjogXCJkaWxkb1wiLFxyXG4gICAgXCJibGFkZVwiOiBcImhhbmRsZVwiLFxyXG4gICAgXCJwYWluXCI6IFwiaG90IHNleFwiLFxyXG4gICAgXCJlbW90aW9uYWxcIjogXCJjaGlsZGlzaFwiLFxyXG4gICAgXCJlbW90aW9uXCI6IFwibHVicmljYW50XCIsXHJcbiAgICBcInRlYXJkcm9wXCI6IFwidGVhciBkcm9wXCIsXHJcbiAgICBcInRlYXJcIjogXCJzcGVybWVcIixcclxuICAgIFwiY2FzdGxlXCI6IFwiY2hhdGVhdVwiLFxyXG4gICAgXCJ3b3JsZFwiOiBcImhhbmQgdG93ZWxcIixcclxuICAgIFwiZGVhZFwiOiBcImluZXJ0XCIsXHJcbiAgICBcImdvb2RieWVcIjogXCJwZWFjZSB5J2FsbFwiLFxyXG4gICAgXCJnb29kLWJ5ZVwiOiBcImdldCB0aGUgZnVjayBvdXRcIixcclxuICAgIFwiZ29vZCBieWVcIjogXCJmdWNrIG9mZlwiLFxyXG4gICAgXCJkZWF0aFwiOiBcIlNhbnRhXCIsXHJcbiAgICBcInBhbGVcIjogXCJzZXh5XCIsXHJcbiAgICBcImRyaWZ0XCI6IFwiaGltLWhhd1wiLFxyXG4gICAgXCJmYWRlXCI6IFwiaGltLWhhd1wiLFxyXG4gICAgXCJmbGVzaFwiOiBcInR3aW5raWVcIixcclxuICAgIFwiY29ycHNlXCI6IFwibWFubmVxdWluXCIsXHJcbiAgICBcInNraW5cIjogXCJ0d2lua2llc1wiLFxyXG4gICAgXCJwdXRyaWRcIjogXCJwbGVhc2FudFwiLFxyXG4gICAgXCJicmVhdGhlXCI6IFwicGF1c2UgYXdrd2FyZGx5XCIsXHJcbiAgICBcImJyZWF0aFwiOiBcImF3a3dhcmQgcGF1c2VcIixcclxuICAgIFwic3RvcHBcIjogXCJwdXNoXCIsXHJcbiAgICBcInN0b3BcIjogXCJwdXNoXCIsXHJcbiAgICBcInNjcmVhbVwiOiBcImdydW50XCIsXHJcbiAgICBcInRoaW5rXCI6IFwic2NoZW1lXCIsXHJcbiAgICBcInNwaXJpdHVhbFwiOiBcImJhbmFuYSBjcmF2aW5nXCIsXHJcbiAgICBcInNwaXJpdFwiOiBcImJhbmFuYVwiLFxyXG4gICAgXCJzb3VsXCI6IFwiYmFuYW5hXCIsXHJcbiAgICBcImdob3N0XCI6IFwiaW1hZ2luYXJ5IGZyaWVuZFwiLFxyXG4gICAgXCJtb25zdGVyXCI6IFwiZGlzbGV4aWMgbG92ZXJcIixcclxuICAgIFwiYmVhc3RcIjogXCJlcmVjdGlvblwiLFxyXG4gICAgXCJkZW1vblwiOiBcImhhcmQtb25cIixcclxuICAgIFwiYW5nZWxcIjogXCJwb3JuIHN0YXJcIixcclxuICAgIFwic2hvb3Rpbmcgc3RhclwiOiBcInN3aWZ0IG1pc3NpbGVcIixcclxuICAgIFwic3RhclwiOiBcIm1pc3NpbGVcIixcclxuICAgIFwibG9zdFwiOiBcImFyb3VzZWRcIixcclxuICAgIFwidGltZVwiOiBcInRocm9iYmluZ1wiLFxyXG4gICAgXCJjaGVla1wiOiBcInJ1bXBcIixcclxuICAgIFwiZmluZ2Vyc1wiOiBcInNhdXNhZ2VcIixcclxuICAgIFwiZGF5ZHJlYW1cIjogXCJmYW50YXNpemVcIixcclxuICAgIFwidGhlIHNwcmluZ1wiOiBcInR1YmUgc29ja1wiLFxyXG4gICAgXCJzcHJpbmdcIjogXCJ0dWJlIHNvY2tzXCIsXHJcbiAgICBcImlsbHVzaW9uXCI6IFwiZHJ1bmtlbiBtaXN0YWtlXCIsXHJcbiAgICBcImxvbmVsaW5lc3NcIjogXCJhcm91c2FsXCIsXHJcbiAgICBcImxvbmVseVwiOiBcImhvcm55XCIsXHJcbiAgICBcImFsb25lXCI6IFwiZWNzdGF0aWNcIixcclxuICAgIFwibG9uZVwiOiBcInNpbmdsZVwiLFxyXG4gICAgXCJwZXJmZWN0XCI6IFwiZnVja2VkXCIsXHJcbiAgICBcImhpZGRlblwiOiBcInN0YXNoZWRcIixcclxuICAgIFwibXlzdGVyeVwiOiBcIm5lb24gc2lnblwiLFxyXG4gICAgXCJteXN0ZXJpZXNcIjogXCJuZW9uIHNpZ25zXCIsXHJcbiAgICBcInJvc2VcIjogXCJidXR0IGhvbGVcIixcclxuICAgIFwicGV0YWxcIjogXCJkaW5nbGViZXJyeVwiLFxyXG4gICAgXCJkaWZmZXJlbnRcIjogXCJhd2t3YXJkXCIsXHJcbiAgICBcIndyb25nXCI6IFwiYnV6emluZ1wiLFxyXG4gICAgXCJmYXRlXCI6IFwiY29pbmNpZGVuY2VcIixcclxuICAgIFwiY29sZFwiOiBcImZ1enp5XCIsXHJcbiAgICBcImhlbGxmaXJlXCI6IFwiaGVsbCBmaXJlXCIsXHJcbiAgICBcImhlbGxcIjogXCJteSBjb2NrJ3NcIixcclxuICAgIFwiY3J5c3RhbFwiOiBcImJlZGF6bGVyXCIsXHJcbiAgICBcInJhaW5ib3dcIjogXCJwaXp6YXp6XCIsXHJcbiAgICBcInJhaW5cIjogXCJqaXp6dW1cIixcclxuICAgIFwic3Rvcm1cIjogXCJvcmd5XCIsXHJcbiAgICBcIndpbmRcIjogXCJibG93XCIsXHJcbiAgICBcImJyZWV6ZVwiOiBcImRyYWZ0XCIsXHJcbiAgICBcImJyaWxsaWFuY2VcIjogXCJzaGlueW5lc3NcIixcclxuICAgIFwiYnJpbGxpYW50XCI6IFwic2hpbnlcIixcclxuICAgIFwiZHJlYW1sYW5kXCI6IFwib2JzZXNzaW9uIGlzbGFuZFwiLFxyXG4gICAgXCJkcmVhbXNcIjogXCJvYnNlc3Npb25zXCIsXHJcbiAgICBcImRyZWFtXCI6IFwib2JzZXNzXCIsXHJcbiAgICBcInByaXNvblwiOiBcIm91dGhvdXNlXCIsXHJcbiAgICBcImdvbGRlbiByYXlcIjogXCJnYXVkeSBzY3JpYmJsZVwiLFxyXG4gICAgXCJyYXlcIjogXCJzY3JpYmJsZVwiLFxyXG4gICAgXCJkZWFkbHlcIjogXCJmZXJ0aWxlXCIsXHJcbiAgICBcInRydXRoXCI6IFwidHJpdmlhXCIsXHJcbiAgICBcInN1blwiOiBcInllbGxvdyBkaXNrXCIsXHJcbiAgICBcImNydWVsXCI6IFwiaGFwaGF6YXJkXCIsXHJcbiAgICBcImNsb3VkXCI6IFwiYmFsbG9vblwiLFxyXG4gICAgXCJ0d2lua2xlXCI6IFwic3Ryb2JlXCIsXHJcbiAgICBcInR3aW5rbGluZ1wiOiBcInN0cm9iaW5nXCIsXHJcbiAgICBcImVzY2FwZVwiOiBcInNudWdnbGVcIixcclxuICAgIFwidW5kZXJzdGFuZFwiOiBcInN0cm9rZSBteSBlZ29cIixcclxuICAgIFwicmVtZW1iZXJcIjogXCJtdW1ibGVcIixcclxuICAgIFwiaWxsdW1pbmF0aW9uXCI6IFwibXVtYm8ganVtYm9cIixcclxuICAgIFwicmVhbGl0eVwiOiBcInRvaWxldCBib3dsXCIsXHJcbiAgICBcImJpbmRcIjogXCJjb2RkbGVcIixcclxuICAgIFwiYm91bmRcIjogXCJjb2RkbGVkXCIsXHJcbiAgICBcInRvcm5cIjogXCJodWdnbGVkXCIsXHJcbiAgICBcImRpZWRcIjogXCJtYWRlIG1hcnNobWFsbG93c1wiLFxyXG4gICAgXCJkaWVzXCI6IFwibWFrZXMgbWFyc2htYWxsb3dzXCIsXHJcbiAgICBcImRpZVwiOiBcIm1ha2UgbWFyc2htYWxsb3dzXCIsXHJcbiAgICBcImR5aW5nXCI6IFwibWFraW5nIG1hcnNobWFsbG93c1wiLFxyXG4gICAgXCJib2R5XCI6IFwiamlnZ2xpbmcgY2x1bXBcIixcclxuICAgIFwiYm9kaWVzXCI6IFwiamlnZ2xpbmcgcGlsZXNcIixcclxuICAgIFwid2FyZmFyZVwiOiBcImNoaWxkcmVuIGxhdWdoaW5nXCIsXHJcbiAgICBcImRlYnV0YW50ZXNcIjogXCJob29rZXJzXCIsXHJcbiAgICBcInNsYXZlXCI6IFwiZ2ltcFwiLFxyXG4gICAgXCJwb2V0aWNcIjogXCJmbGF0dWxlbnRcIixcclxuICAgIFwicG9ldHJ5XCI6IFwiYmFkIGdhc1wiLFxyXG4gICAgXCJwb2V0XCI6IFwiaG9ib1wiLFxyXG4gICAgXCJwb2VtXCI6IFwic2NyaWJibGVcIixcclxuICAgIFwiY291bnRyeVwiOiBcImJhdGhyb29tXCIsXHJcbiAgICBcIm5ha2VkXCI6IFwidW5zaGF2ZWRcIixcclxuICAgIFwiamVzdXMgY2hyaXN0XCI6IFwiamltIGJvYiBqclwiLFxyXG4gICAgXCJjaHJpc3RcIjogXCJqaW0gYm9iIGpyXCIsXHJcbiAgICBcImplc3VzXCI6IFwiamltIGJvYiBqclwiLFxyXG4gICAgXCJoZWFsZXJcIjogXCJmb25kbGVyXCIsXHJcbiAgICBcImdvZHNcIjogXCJqaW0gYm9iIHNyIGV0IGFsLlwiLFxyXG4gICAgXCJnb2RcIjogXCJqaW0gYm9iIHNyXCIsXHJcbiAgICBcIndlYXBvblwiOiBcInBvY2tldCBwdXNzeVwiLFxyXG4gICAgXCJleGlzdGVuY2VcIjogXCJ3aGF0ZXZlclwiLFxyXG4gICAgXCJtaW5pb25cIjogXCJob3JueSBwaXJhdGVcIixcclxuICAgIFwicmFwaW5nXCI6IFwid2hhdFwiLFxyXG4gICAgXCJyYXBlXCI6IFwid2hhdFwiLFxyXG4gICAgXCJncmF2ZXN0b25lXCI6IFwibWlsZSBtYXJrZXJcIixcclxuICAgIFwiZ3JhdmVcIjogXCJwZXJzb25hbCBzcGFjZVwiLFxyXG4gICAgXCJpbmZpbml0ZVwiOiBcImFic3RyYWN0XCIsXHJcbiAgICBcInN1aWNpZGVcIjogXCJtdXJkZXJcIixcclxuICAgIFwiYnJpbmtcIjogXCJib3JkZXJcIixcclxuICAgIFwiY3JpZWRcIjogXCJjYW1lXCIsXHJcbiAgICBcImNyaWVzXCI6IFwic2tlZXRzXCIsXHJcbiAgICBcImNyeWluZ1wiOiBcImN1bW1pbmdcIixcclxuICAgIFwiaGFkIGRvbmVcIjogXCJkb25lIGRpZFwiLFxyXG4gICAgXCJjcnlcIjogXCJjdW1cIixcclxuICAgIFwiY3J5cHRpY1wiOiBcImRydW5rZW5cIixcclxuICAgIFwiY3J5cHRcIjogXCJ1cmluYWxcIixcclxuICAgIFwibXlzdGljXCI6IFwidHJhbnNleHVhbFwiLFxyXG4gICAgXCJiYWxhbmNlZCBpbmRpdmlkdWFsXCI6IFwicHN5Y2hvXCIsXHJcbiAgICBcImJhbGFuY2VkIHBlcnNvblwiOiBcInBzeWNob1wiLFxyXG4gICAgXCJiYWxhbmNlZCBtYW5cIjogXCJwc3ljaG9cIixcclxuICAgIFwiYmFsYW5jZWQgd29tYW5cIjogXCJwc3ljaG9cIixcclxuICAgIFwid2lzZG9tXCI6IFwiYnVsbCBzaGl0XCIsXHJcbiAgICBcIndpc2VcIjogXCJidWxsIHNoaXR0aW5nXCIsXHJcbiAgICBcImJsZXNzZWQgYmVcIjogXCJzdWNrIGVnZ3NcIixcclxuICAgIFwiZW5lcmd5XCI6IFwianVpY2VcIixcclxuICAgIFwicmlkZGxlXCI6IFwicG9sa2EgZG90XCIsXHJcbiAgICBcIm15IGxvcmRcIjogXCJzd2VldCBwYWxtXCIsXHJcbiAgICBcInNvIG1vdGUgaXQgYmVcIjogXCJpdCdzIHJlYWwgaW4gbXkgaGVhZFwiLFxyXG4gICAgXCJwcmF5XCI6IFwibXVybXVyXCIsXHJcbiAgICBcIm5vbWFkXCI6IFwiZHJ1bmsgaG9ib1wiLFxyXG4gICAgXCJkZXN0aW55XCI6IFwidGF4ZXNcIixcclxuICAgIFwic3dvcmRcIjogXCJkaWxkb1wiLFxyXG4gICAgXCJ2b2lkXCI6IFwiYnVja2V0XCIsXHJcbiAgICBcImp1c3RcIjogXCJzdXJlXCIsXHJcbiAgICBcInZlbmdlYW5jZVwiOiBcInNsYXAgaGFwcGluZXNzXCIsXHJcbiAgICBcImF2ZW5nZVwiOiBcImdpdCByb3dkeSBmb3JcIixcclxuICAgIFwidmVuZ2VcIjogXCItcm93ZHktXCIsXHJcbiAgICBcImhlYXZlbnNcIjogXCJza2llc1wiLFxyXG4gICAgXCJoZWF2ZW5cIjogXCJza3lcIixcclxuICAgIFwiZW5kbGVzc1wiOiBcInJlYWwgbG9uZ1wiLFxyXG4gICAgXCJ2YWxsZXlcIjogXCJkaXRjaFwiLFxyXG4gICAgXCJhcmR1b3VzXCI6IFwibm90IGVhc3lcIixcclxuICAgIFwidG91Y2hcIjogXCJncm9wZVwiLFxyXG4gICAgXCJ3cmV0Y2hlZFwiOiBcInNrZWV6eVwiLFxyXG4gICAgXCJ3cmV0Y2hcIjogXCJza2VlemVcIixcclxuICAgIFwiYXdlXCI6IFwiZmVhcmZ1bCByZXZlcmVuY2VcIixcclxuICAgIFwicml0dWFsXCI6IFwiYmFuYW5hIGRhbmNlXCIsXHJcbiAgICBcImJlaG9sZFwiOiBcIm9vZ2xlXCIsXHJcbiAgICBcInZlaWxcIjogXCJkaXNndWlzZVwiLFxyXG4gICAgXCJ2aXN0YVwiOiBcInNjZW5lXCIsXHJcbiAgICBcImFsd2F5c1wiOiBcInVzdWFsbHlcIixcclxuICAgIFwiYmVsaWV2ZVwiOiBcImJ1eVwiLFxyXG4gICAgXCJ3aXNoXCI6IFwid2FudFwiLFxyXG4gICAgXCJmZWxsXCI6IFwiZmxvcHBlZFwiLFxyXG4gICAgXCJmYWxsXCI6IFwiZmxvcFwiLFxyXG4gICAgXCJyaWdodGVvdXNcIjogXCJhcnJvZ2FudFwiLFxyXG4gICAgXCJ3YXJyaW9yXCI6IFwia2l0dGVuXCIsXHJcbiAgICBcInVuY2FyaW5nXCI6IFwicHJpY2tpc2hcIixcclxuICAgIFwiY2FyZSB0byBnaXZlXCI6IFwic2hpdCB0byBnaXZlXCIsXHJcbiAgICBcInRha2UgY2FyZSBvZlwiOiBcImRlY2ltYXRlXCIsXHJcbiAgICBcInRha2luZyBjYXJlXCI6IFwiZm9yZ2V0aW5nXCIsXHJcbiAgICBcInRha2VzIGNhcmVcIjogXCJmb3JnZXRzXCIsXHJcbiAgICBcInRha2UgY2FyZVwiOiBcImZvcmdldFwiLFxyXG4gICAgXCJmb3JnZXRcIjogXCJkaXNyZW1lbWJlclwiLFxyXG4gICAgXCJjYXJpbmdcIjogXCJnaXZpbmcgYSBzaGl0XCIsXHJcbiAgICBcImNhcmVkXCI6IFwiZ2F2ZSBhIHNoaXRcIixcclxuICAgIFwiY2FyZVwiOiBcImdpdmUgYSBzaGl0XCIsXHJcbiAgICBcIndpZWxkXCI6IFwiamVya1wiLFxyXG4gICAgXCJvY2VhblwiOiBcInNld2VyXCIsXHJcbiAgICBcInNlYVwiOiBcImJhdGhcIixcclxuICAgIFwiYmF5XCI6IFwic2lua1wiLFxyXG4gICAgXCJ0d2lsaWdodFwiOiBcIm1vb25zaGluZVwiLFxyXG4gICAgXCJicm9rZW5cIjogXCJiZWF0ZW5cIixcclxuICAgIFwiYnJva2VcIjogXCJiZWF0XCIsXHJcbiAgICBcImJyZWFrXCI6IFwiYmVhdFwiLFxyXG4gICAgXCJmb3JldmVyXCI6IFwic28gdmVyeVwiLFxyXG4gICAgXCJodW1hbiByYWNlXCI6IFwiZ2VyYmlsIGVtcGlyZVwiLFxyXG4gICAgXCJuaWdodG1hcmVcIjogXCJ0YW50cnVtXCIsXHJcbiAgICBcInN1ZmZlclwiOiBcInBpcm91ZXR0ZVwiLFxyXG4gICAgXCJteXNlbGZcIjogXCJteSBtdWNobmVzc1wiLFxyXG4gICAgXCJtZVwiOiBcImlcIixcclxuICAgIFwibXlcIjogXCJpJ3MgXCIsXHJcbiAgICBcIm1pbmVcIjogXCJpJ3NcIixcclxuICAgIFwid2FzIGlcIjogXCJ3ZXJlIGlcIixcclxuICAgIFwiYW0gaVwiOiBcImFyZSBpXCIsXHJcbiAgICBcImltXCI6IFwiaSdtXCIsXHJcbiAgICBcImknbVwiOiBcImkgYXJlXCIsXHJcbiAgICBcImkndmVcIjogXCJpIGhhdmVcIixcclxuICAgIFwiaSdsbFwiOiBcImkgd2lsbFwiLFxyXG4gICAgXCJpIGFtXCI6IFwiaSBhcmVcIixcclxuICAgIFwieW91cnNlbGZcIjogXCJ5b3UncyBtdWNobmVzc1wiLFxyXG4gICAgXCJ5b3Vyc1wiOiBcInlvdSdzXCIsXHJcbiAgICBcInlvdXJcIjogXCJ5b3Unc1wiLFxyXG4gICAgXCJ5b3UgYWxsXCI6IFwiYWxsIHlvdVwiLFxyXG4gICAgXCJ5b3UnbGxcIjogXCJ5b3Ugd2lsbFwiLFxyXG4gICAgXCJ5b3UndmVcIjogXCJ5b3UgaGFzXCIsXHJcbiAgICBcInlvdSdyZVwiOiBcInlvdSBpc1wiLFxyXG4gICAgXCJ0aGVlXCI6IFwieW91XCIsXHJcbiAgICBcInRoaW5lXCI6IFwieW91J3NcIixcclxuICAgIFwidGhvdVwiOiBcInlvdVwiLFxyXG4gICAgXCJ3ZVwiOiBcInRoZXlcIixcclxuICAgIFwidXNcIjogXCJ0aGVtXCIsXHJcbiAgICBcIm91clwiOiBcInRoZWlyXCIsXHJcbiAgICBcIm91cnNcIjogXCJ0aGVpcnNcIixcclxuICAgIFwiaVwiOiBcIktldmluXCIsXHJcbiAgICBcInlvdVwiOiBcIlJldGFyZHNcIlxyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9kb2NzL3ZzZG9jL09wZW5MYXllcnNBbGwuanNcIi8+XHJcbi8qanNsaW50XHJcbiAgICBub2RlOiB0cnVlXHJcbiovXHJcbnZhciBhdHJvcGEgPSByZXF1aXJlKCdhdHJvcGEtaGVhZGVyJyk7XHJcbmF0cm9wYS5yZWdleCA9IHJlcXVpcmUoJ2F0cm9wYS1yZWdleCcpLnJlZ2V4O1xyXG5hdHJvcGEuc3RyaW5nID0gcmVxdWlyZSgnYXRyb3BhLXN0cmluZycpLnN0cmluZztcclxuYXRyb3BhLnNldEFzT3B0aW9uYWxBcmcgPSByZXF1aXJlKCdhdHJvcGEtc2V0QXNPcHRpb25hbEFyZycpLnNldEFzT3B0aW9uYWxBcmc7XHJcbi8qanNsaW50XHJcbiAgICBpbmRlbnQ6IDQsXHJcbiAgICBtYXhlcnI6IDUwLFxyXG4gICAgd2hpdGU6IHRydWUsXHJcbiAgICBicm93c2VyOiB0cnVlLFxyXG4gICAgZGV2ZWw6IHRydWUsXHJcbiAgICBwbHVzcGx1czogdHJ1ZSxcclxuICAgIHJlZ2V4cDogdHJ1ZSxcclxuICAgIHZhcnM6IHRydWVcclxuKi9cclxuLypnbG9iYWwgYXRyb3BhICovXHJcbi8vIGVuZCBoZWFkZXJcclxuKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgYXRyb3BhLnJlcXVpcmVzKFxyXG4gICAgICAgICd3dGYnLFxyXG4gICAgICAgIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHN1cHBvcnRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICBhdHJvcGEucmVnZXgsXHJcbiAgICAgICAgICAgICAgICBhdHJvcGEuc3RyaW5nLmNvdW50V29yZHMsXHJcbiAgICAgICAgICAgICAgICBhdHJvcGEuc2V0QXNPcHRpb25hbEFyZ1xyXG4gICAgICAgICAgICBdLmZvckVhY2goZnVuY3Rpb24gKHByZXJlcXVpc2l0ZSkge1xyXG4gICAgICAgICAgICAgICAgaWYocHJlcmVxdWlzaXRlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdXBwb3J0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBzdXBwb3J0ZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgKTtcclxufSgpKTtcclxuXHJcbihmdW5jdGlvbiAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIGF0cm9wYS5yZXF1aXJlcyhcclxuICAgICAgICAnd3RmSHRtbEVsZW1lbnQnLFxyXG4gICAgICAgIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHN1cHBvcnRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICB3aW5kb3dcclxuICAgICAgICAgICAgXS5mb3JFYWNoKGZ1bmN0aW9uIChwcmVyZXF1aXNpdGUpIHtcclxuICAgICAgICAgICAgICAgIGlmKHByZXJlcXVpc2l0ZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3VwcG9ydGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gc3VwcG9ydGVkO1xyXG4gICAgICAgIH1cclxuICAgICk7XHJcbn0oKSk7XHJcblxyXG4vKipcclxuICogQ29udGFpbmVyIGZvciBhbGwgR2xvcmlvdXMgV1RGaWZpZXIgcmVsYXRlZCBmdW5jdGlvbnMgYW5kIHN1Y2guXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEyMDkwOVxyXG4gKiBAbmFtZXNwYWNlIENvbnRhaW5lciBmb3IgYWxsIEdsb3Jpb3VzIFdURmlmaWVyIHJlbGF0ZWQgZnVuY3Rpb25zIGFuZCBzdWNoLlxyXG4gKiBAcmVxdWlyZXMgYXRyb3BhLnJlZ2V4XHJcbiAqIEByZXF1aXJlcyBhdHJvcGEud3RmLmRpY3Rpb25hcnlcclxuICovXHJcbmF0cm9wYS53dGYgPSB7fTtcclxuLyoqXHJcbiAqIFRoZSBHbG9yaW91cyBXVEZpZmljYXRpb24gRGljdGlvbmFyeTogVHVybmluZyBTaGl0XHJcbiAqIEludG8gUG9saXNoZWQgVHVyZHMuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDExMFxyXG4gKi9cclxuYXRyb3BhLnd0Zi5kaWN0aW9uYXJ5ID0gcmVxdWlyZSgnLi9hdHJvcGEtd3RmLWRpY3Rpb25hcnkuanNvbicpO1xyXG4vKipcclxuICogQWNjZXB0cyBwbGFpbiB0ZXh0IGlucHV0IGFuZCBHbG9yaW91c2x5IFdURmlmaWVzIGl0LlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzAxMTBcclxuICogQHBhcmFtIHtTdHJpbmd9IHRhcmdldCBUaGUgdGV4dCB0byBXVEZpZnkuXHJcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gb3V0cHV0SFRNTCBTcGVjaWZpZXMgaWYgeW91IHdhbnQgdGhlIG91dHB1dFxyXG4gKiAgaW4gSFRNTCBmb3JtYXQuIElmIGZhbHNlLCB3aWxsIG91dHB1dCBwbGFpbiB0ZXh0LiBEZWZhdWx0c1xyXG4gKiAgdG8gZmFsc2UuXHJcbiAqIEByZXR1cm4ge1N0cmluZ30gUmV0dXJucyBHZW51aW5lIFdURmlmaWVkIHRleHQuXHJcbiAqL1xyXG5hdHJvcGEud3RmLnd0ZmlmeSA9IGZ1bmN0aW9uICh0YXJnZXQsIG91dHB1dEhUTUwpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgYXRyb3BhLnN1cHBvcnRDaGVjaygnd3RmJyk7XHJcbiAgICBcclxuICAgIHZhciByZWdleFZhbHVlLFxyXG4gICAgICAgIHJlcGxhY2VtZW50VGV4dCxcclxuICAgICAgICBvbGRXb3JkLFxyXG4gICAgICAgIHd0ZkNvdW50LFxyXG4gICAgICAgIHdvcmRDb3VudCxcclxuICAgICAgICByZXQsXHJcbiAgICAgICAgd29yZDtcclxuICAgIFxyXG4gICAgaWYodHJ1ZSAhPT0gb3V0cHV0SFRNTCkge1xyXG4gICAgICAgIG91dHB1dEhUTUwgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIHJldCA9IHt9O1xyXG4gICAgd3RmQ291bnQgPSAwO1xyXG4gICAgdGFyZ2V0ID0gdGFyZ2V0LnRyaW0oKTtcclxuICAgIHdvcmRDb3VudCA9IGF0cm9wYS5zdHJpbmcuY291bnRXb3Jkcyh0YXJnZXQpO1xyXG4gICAgaWYodHJ1ZSA9PT0gb3V0cHV0SFRNTCkge1xyXG4gICAgICAgIHRhcmdldCA9IHRhcmdldC5yZXBsYWNlKFxyXG4gICAgICAgICAgICAvKFxcLiA/KXsyLH0vZ2ksXHJcbiAgICAgICAgICAgICc8c3BhbiBzdHlsZT1cImNvbG9yIDogYnJvd24gO1wiPiBbc2hpdCB0YWNvXSA8L3NwYW4+J1xyXG4gICAgICAgICk7XHJcbiAgICAgICAgdGFyZ2V0ID0gJzxwPiAnICsgdGFyZ2V0LnJlcGxhY2UoLyhcXHJcXG58XFxyfFxcbikvZywnIDxici8+ICcpICsgJyA8L3A+JztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0LnJlcGxhY2UoLyhcXC4gPyl7Mix9L2dpLCAnIFtzaGl0IHRhY29dICcpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBBY2NlcHRzIHBsYWluIHRleHQgaW5wdXQgYW5kIEdsb3Jpb3VzbHkgV1RGaWZpZXMgaXQuXHJcbiAgICAgKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICAgICAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gICAgICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gICAgICogQHZlcnNpb24gMjAxMzAxMTJcclxuICAgICAqIEBtZXRob2RPZiBhdHJvcGEud3RmLnd0ZmlmeS1cclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbSBGaXJzdCBtYXRjaGVkIHBhdHRlcm4gaW4gc3RyaW5nIHNlYXJjaGVkLlxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHN1YjEgRmlyc3QgbWF0Y2hlZCBzdWJwYXR0ZXJuIGluIHN0cmluZyBzZWFyY2hlZC5cclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzdWIyIFNlY29uZCBtYXRjaGVkIHN1YnBhdHRlcm4gaW4gc3RyaW5nIHNlYXJjaGVkLlxyXG4gICAgICovXHJcbiAgICAgLypqc2xpbnQgdW5wYXJhbTogdHJ1ZSovXHJcbiAgICByZXBsYWNlbWVudFRleHQgPSBmdW5jdGlvbiAobSwgc3ViMSwgc3ViMikge1xyXG4gICAgICAgIHd0ZkNvdW50Kys7XHJcbiAgICAgICAgc3ViMSA9IGF0cm9wYS5zZXRBc09wdGlvbmFsQXJnKCcnLCBzdWIxKTtcclxuICAgICAgICBzdWIyID0gYXRyb3BhLnNldEFzT3B0aW9uYWxBcmcoJycsIHN1YjIpO1xyXG4gICAgICAgIHZhciBvdXQ7XHJcbiAgICAgICAgaWYodHJ1ZSA9PT0gb3V0cHV0SFRNTCkge1xyXG4gICAgICAgICAgICBvdXQgPSAnPHNwYW4gc3R5bGU9XCJjb2xvciA6IHJlZCA7XCI+JyArXHJcbiAgICAgICAgICAgICAgICBzdWIxICsgYXRyb3BhLnd0Zi5kaWN0aW9uYXJ5W3dvcmRdICsgc3ViMiArXHJcbiAgICAgICAgICAgICAgICAnPC9zcGFuPic7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgb3V0ID0gc3ViMSArIGF0cm9wYS53dGYuZGljdGlvbmFyeVt3b3JkXSArIHN1YjI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9O1xyXG4gICAgLypqc2xpbnQgdW5wYXJhbTogZmFsc2UqL1xyXG4gICAgLy8gd29yZCBpcyBkZWZpbmVkIGluIHRoZSBjb250YWluaW5nIHNjb3BlIGFuZFxyXG4gICAgLy8gaXMgbm90IGdsb2JhbCwganNoaW50IGlzIHdyb25nXHJcbiAgICBmb3IgKHdvcmQgaW4gYXRyb3BhLnd0Zi5kaWN0aW9uYXJ5KSB7XHJcbiAgICAgICAgaWYgKGF0cm9wYS53dGYuZGljdGlvbmFyeS5oYXNPd25Qcm9wZXJ0eSh3b3JkKSkge1xyXG4gICAgICAgICAgICBvbGRXb3JkID0gYXRyb3BhLnJlZ2V4LmFwcGVuZFByZWZpeGVzQW5kU3VmZml4ZXMod29yZCk7XHJcbiAgICAgICAgICAgIHJlZ2V4VmFsdWUgPSBuZXcgUmVnRXhwKG9sZFdvcmQsICdnaScpO1xyXG4gICAgICAgICAgICB0YXJnZXQgPSB0YXJnZXQucmVwbGFjZShyZWdleFZhbHVlLCByZXBsYWNlbWVudFRleHQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldC53dGZDb3VudCA9IHd0ZkNvdW50O1xyXG4gICAgcmV0LndvcmRDb3VudCA9IHdvcmRDb3VudDtcclxuICAgIHJldC5zY29yZSA9IHd0ZkNvdW50IC8gd29yZENvdW50O1xyXG4gICAgcmV0LnR4dCA9IHRhcmdldDtcclxuICAgIHJldHVybiByZXQ7XHJcbn07XHJcbi8qKlxyXG4gKiBXVEZpZmllcyB0aGUgPGNvZGU+dGV4dENvbnRlbnQ8L2NvZGU+IG9yIDxjb2RlPnZhbHVlPC9jb2RlPiBvZiB0aGVcclxuICogIGdpdmVuIGVsZW1lbnQgYW5kIHJlcGxhY2VzIHRoZSBlbGVtZW50J3MgaW5uZXJIVE1MIHdpdGggYSBwcmUgYmxvY2tcclxuICogIGNvbnRhaW5pbmcgdGhlIHJlc3VsdHMgb2YgV1RGaWZpY2F0aW9uLlxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50UmVmZXJlbmNlIEEgcmVmZXJlbmNlIHRvIGFuIEhUTUwgRWxlbWVudC5cclxuICogQHJldHVybnMge0hUTUxFbGVtZW50fSBSZXR1cm5zIHRoZSBnaXZlbiBlbGVtZW50IGFmdGVyIHd0ZmlmaWNhdGlvbi5cclxuICogQHZlcnNpb24gMjAxMzAzMTNcclxuICovXHJcbmF0cm9wYS53dGYuaHRtbEVsZW1lbnQgPSBmdW5jdGlvbiAoZWxlbWVudFJlZmVyZW5jZSkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICBhdHJvcGEuc3VwcG9ydENoZWNrKCd3dGZIdG1sRWxlbWVudCcpO1xyXG4gICAgXHJcbiAgICB2YXIgd3RmaWZpZWQsIHR4dDtcclxuICAgIGVsZW1lbnRSZWZlcmVuY2UuaW5uZXJIVE1MID0gZWxlbWVudFJlZmVyZW5jZS5pbm5lckhUTUwucmVwbGFjZShcclxuICAgICAgICAvPGJyPihcXHMrKT8oXFxyXFxufFxccnxcXG4pPy9nLCAnXFxyXFxuJyk7XHJcbiAgICB0eHQgPSBlbGVtZW50UmVmZXJlbmNlLnZhbHVlIHx8IGVsZW1lbnRSZWZlcmVuY2UudGV4dENvbnRlbnQ7XHJcbiAgICB3dGZpZmllZCA9IGF0cm9wYS53dGYud3RmaWZ5KHR4dCwgdHJ1ZSk7XHJcbiAgICBlbGVtZW50UmVmZXJlbmNlLmlubmVySFRNTCA9XHJcbiAgICAgICAgJzxwcmUgc3R5bGU9XCJjb2xvcjpibGFjazsgYmFja2dyb3VuZDp3aGl0ZTsgd2hpdGUtc3BhY2U6cHJlLXdyYXA7XCI+JyArXHJcbiAgICAgICAgd3RmaWZpZWQudHh0ICtcclxuICAgICAgICAnPC9wcmU+JztcclxuICAgIHJldHVybiBlbGVtZW50UmVmZXJlbmNlO1xyXG59O1xyXG5cclxuXHJcblxyXG5cclxud2hpbGUoYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLmxlbmd0aCA+IDApIHtcclxuICAgIGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5wb3AoKSgpO1xyXG59XHJcbm1vZHVsZS5leHBvcnRzID0gYXRyb3BhO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vZG9jcy92c2RvYy9PcGVuTGF5ZXJzQWxsLmpzXCIvPlxyXG52YXIgYXRyb3BhID0gcmVxdWlyZSgnYXRyb3BhLWhlYWRlcicpO1xyXG5hdHJvcGEuc2V0QXNPcHRpb25hbEFyZyA9IHJlcXVpcmUoJ2F0cm9wYS1zZXRBc09wdGlvbmFsQXJnJykuc2V0QXNPcHRpb25hbEFyZztcclxuYXRyb3BhLnJlbW92ZU5vZGVCeVJlZmVyZW5jZSA9IHJlcXVpcmUoJ2F0cm9wYS1yZW1vdmVOb2RlQnlSZWZlcmVuY2UnKS5yZW1vdmVOb2RlQnlSZWZlcmVuY2U7XHJcbi8qanNsaW50XHJcbiAgICBpbmRlbnQ6IDQsXHJcbiAgICBtYXhlcnI6IDUwLFxyXG4gICAgd2hpdGU6IHRydWUsXHJcbiAgICBicm93c2VyOiB0cnVlLFxyXG4gICAgZGV2ZWw6IHRydWUsXHJcbiAgICBwbHVzcGx1czogdHJ1ZSxcclxuICAgIHJlZ2V4cDogdHJ1ZVxyXG4qL1xyXG4vKmdsb2JhbCBhdHJvcGEsIFhQYXRoUmVzdWx0ICovXHJcbi8vIGVuZCBoZWFkZXJcclxuXHJcblxyXG4oZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICBhdHJvcGEucmVxdWlyZXMoXHJcbiAgICAgICAgJ3hwYXRoJyxcclxuICAgICAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBzdXBwb3J0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgd2luZG93LFxyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZXZhbHVhdGVcclxuICAgICAgICAgICAgXS5mb3JFYWNoKGZ1bmN0aW9uIChwcmVyZXF1aXNpdGUpIHtcclxuICAgICAgICAgICAgICAgIGlmKHByZXJlcXVpc2l0ZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3VwcG9ydGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gc3VwcG9ydGVkO1xyXG4gICAgICAgIH1cclxuICAgICk7XHJcbn0oKSk7XHJcblxyXG4vKipcclxuICogQW4gWHBhdGggdG9vbGtpdCBmb3IgbWFuaXB1bGF0aW5nIHRoZSBET00uXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDMxM1xyXG4gKiBAbmFtZXNwYWNlIEFuIFhwYXRoIHRvb2xraXQgZm9yIG1hbmlwdWxhdGluZyB0aGUgRE9NLlxyXG4gKi9cclxuYXRyb3BhLnhwYXRoID0ge307XHJcbi8qKlxyXG4gKiBQcm9jZXNzZXMgbm9kZXMgZnJvbSB0aGUgRE9NIHVzaW5nIGFuIFhwYXRoIGV4cHJlc3Npb24uXHJcbiAqIEBleGFtcGxlXHJcbiAqICAgLy8gU2F5IHlvdSB3YW50ZWQgdG8gdG91Y2ggYWxsIHRoZSBhbmNob3JzIGFuZCBsaW5rcyBpbiB3aW5kb3cuZG9jdW1lbnRcclxuICogICB2YXIgeHBhdGhFeHByZXNzaW9uLCBjYWxsYmFjaztcclxuICogICB4cGF0aEV4cHJlc3Npb24gPSAnLi8vYSc7XHJcbiAqICAgY2FsbGJhY2sgPSBmdW5jdGlvbihvbmVOb2RlKSB7XHJcbiAqICAgICAgIG9uZU5vZGUudG91Y2hlZCA9IHRydWU7XHJcbiAqICAgfVxyXG4gKiAgIGF0cm9wYS54cGF0aC5wcm9jZXNzTm9kZXNCeVhwYXRoKFxyXG4gKiAgICAgICB4cGF0aEV4cHJlc3Npb24sIGRvY3VtZW50LCBkb2N1bWVudCwgY2FsbGJhY2spO1xyXG4gKiAgIFxyXG4gKiAgIC8vIE9yIHNheSB5b3UgaGF2ZSBhbiBpZnJhbWUsIHdpdGggdGhlIGlkICdteUZyYW1lJy4gSW4gdGhlIGlmcmFtZSB0aGVyZVxyXG4gKiAgIC8vIGlzIGEgZGl2IHdpdGggdGhlIGlkIG15RGl2LlxyXG4gKiAgIC8vIEhlcmUgaXMgaG93IHlvdSB3b3VsZCByZW1vdmUgYWxsIHRoZSBhbmNob3JzIGluIHRoYXQgZGl2LlxyXG4gKiAgIHZhciBteUZyYW1lLCB4cGF0aEV4cHJlc3Npb24sIGNvbnRleHROb2RlLCBkb2NyZWYsIGNhbGxiYWNrO1xyXG4gKiAgIG15RnJhbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbXlGcmFtZScpO1xyXG4gKiAgIGRvY3JlZiA9IG15RnJhbWUuY29udGVudFdpbmRvdy5kb2N1bWVudDtcclxuICogICBjb250ZXh0Tm9kZSA9IGRvY3JlZi5nZXRFbGVtZW50QnlJZCgnbXlEaXYnKTtcclxuICogICB4cGF0aEV4cHJlc3Npb24gPSAnLi8vYSc7XHJcbiAqICAgY2FsbGJhY2sgPSBmdW5jdGlvbihvbmVOb2RlKSB7XHJcbiAqICAgICAgIGF0cm9wYS5yZW1vdmVOb2RlQnlSZWZlcmVuY2Uob25lTm9kZSk7XHJcbiAqICAgfVxyXG4gKiAgIGF0cm9wYS54cGF0aC5wcm9jZXNzTm9kZXNCeVhwYXRoKFxyXG4gKiAgICAgICB4cGF0aEV4cHJlc3Npb24sIGNvbnRleHROb2RlLCBkb2NyZWYsIGNhbGxiYWNrKTtcclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwMzEzXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSB4cGF0aEV4cHJlc3Npb24gQW4gWHBhdGggZXhwcmVzc2lvbiBhcyBhIHN0cmluZ1xyXG4gKiBAcGFyYW0ge0RPTSBOb2RlfSBjb250ZXh0Tm9kZSBPcHRpb25hbC4gVGhlIG5vZGUgd2hpY2ggaXMgdG8gc2VydmUgYXMgdGhlIHJvb3RcclxuICogZm9yIHRoZSBzdXBwbGllZCBYcGF0aCBleHByZXNzaW9uLiBEZWZhdWx0cyB0byB3aGF0ZXZlciBkb2NyZWYgaXMuXHJcbiAqIElmIHlvdSBhcmUgdXNpbmcgYSByZWxhdGl2ZSBwYXRoIHN1Y2ggYXMgPGNvZGU+Li8vYTwvY29kZT4gYW5kLCB5b3Ugb25seVxyXG4gKiB3YW50IHRoZSBhbmNob3JzIHRoYXQgYXJlIGRlc2NlbmRhbnRzIG9mIGFub3RoZXIgZWxlbWVudCwgeW91IHdvdWxkXHJcbiAqIHN1cHBseSBhIHJlZmVyZW5jZSB0byB0aGF0IGVsZW1lbnQgZm9yIHRoaXMgYXJndW1lbnQuIFdoZW4gdXNpbmcgYVxyXG4gKiBjb250ZXh0IG5vZGUsIHRoZSBkb2NyZWYgYXJndW1lbnQgbXVzdCByZWZlciB0byB0aGUgY29udGV4dCBub2RlJ3NcclxuICogY29udGFpbmluZyBkb2N1bWVudC5cclxuICogQHBhcmFtIHtET00gRG9jdW1lbnR9IGRvY3JlZiBPcHRpb25hbC4gQSByZWZlcmVuY2UgdG8gdGhlIGRvY3VtZW50IHlvdVxyXG4gKiBhcmUgc2VhcmNoaW5nLCBkZWZhdWx0cyB0byBkb2N1bWVudC4gSWYgeW91IGhhdmUgY3JlYXRlZCBhIHNlcGFyYXRlXHJcbiAqIERPTURvY3VtZW50IHdpdGggdGhlIDxjb2RlPmF0cm9wYS5IVE1MUGFyc2VyPC9jb2RlPiwgYW4gaWZyYW1lLCBvciBieVxyXG4gKiBzb21lIG90aGVyIG1lYW5zLCB5b3Ugd291bGQgcHV0IGEgcmVmZXJlbmNlIHRvIHRoYXQgZG9jdW1lbnQgaGVyZSB0b1xyXG4gKiBpbmRpY2F0ZSB0aGF0IHlvdSBpbnRlbmQgdG8gdXNlIHRoYXQgZG9jdW1lbnQncyByb290LlxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBBIGZ1bmN0aW9uIGFwcGxpZWQgdG8gZXZlcnkgZWxlbWVudCBmb3VuZFxyXG4gKiB1c2luZyB0aGUgc3VwcGxpZWQgeHBhdGggZXhwcmVzc2lvbi4gVGhlIGNhbGxiYWNrIHJlY2VpdmVzIGEgc2luZ2xlXHJcbiAqIGVsZW1lbnQgYXMgaXQncyBvbmx5IGFyZ3VtZW50LlxyXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBSZXR1cm5zIHRoZSBxdWFudGl0eSBvZiBub2RlcyBwcm9jZXNzZWQuXHJcbiAqL1xyXG5hdHJvcGEueHBhdGgucHJvY2Vzc05vZGVzQnlYcGF0aCA9IGZ1bmN0aW9uIHByb2Nlc3NOb2Rlc0J5WHBhdGgoXHJcbiAgICB4cGF0aEV4cHJlc3Npb24sIGNvbnRleHROb2RlLCBkb2NyZWYsIGNhbGxiYWNrXHJcbikge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICBhdHJvcGEuc3VwcG9ydENoZWNrKCd4cGF0aCcpO1xyXG4gICAgZG9jcmVmID0gYXRyb3BhLnNldEFzT3B0aW9uYWxBcmcoZG9jdW1lbnQsIGRvY3JlZik7XHJcbiAgICBjb250ZXh0Tm9kZSA9IGF0cm9wYS5zZXRBc09wdGlvbmFsQXJnKGRvY3JlZiwgY29udGV4dE5vZGUpO1xyXG4gICAgdmFyIG5vZGVzU25hcHNob3QsXHJcbiAgICBuc2wsXHJcbiAgICBpLFxyXG4gICAgbnNpO1xyXG4gICAgbm9kZXNTbmFwc2hvdCA9IGRvY3JlZi5ldmFsdWF0ZShcclxuICAgICAgICB4cGF0aEV4cHJlc3Npb24sXHJcbiAgICAgICAgY29udGV4dE5vZGUsXHJcbiAgICAgICAgbnVsbCxcclxuICAgICAgICBYUGF0aFJlc3VsdC5PUkRFUkVEX05PREVfU05BUFNIT1RfVFlQRSxcclxuICAgICAgICBudWxsXHJcbiAgICApO1xyXG4gICAgbnNsID0gbm9kZXNTbmFwc2hvdC5zbmFwc2hvdExlbmd0aDtcclxuICAgIGZvciAoaSA9IDA7IGkgPCBuc2w7IGkrKykge1xyXG4gICAgICAgIG5zaSA9IG5vZGVzU25hcHNob3Quc25hcHNob3RJdGVtKGkpO1xyXG4gICAgICAgIGNhbGxiYWNrKG5zaSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gaTtcclxufTtcclxuLyoqXHJcbiAqIFJlbW92ZXMgbm9kZXMgZnJvbSB0aGUgRE9NIHVzaW5nIGFuIFhwYXRoIGV4cHJlc3Npb24uXHJcbiAqIEBleGFtcGxlXHJcbiAqICAgLy8gdG8gcmVtb3ZlIGFsbCBhbmNob3JzIHdpdGggdGhlIGNsYXNzIFwib29wc1wiIGluc2lkZSBvZiBhbnkgZGl2IGluXHJcbiAqICAgLy8gZG9jdW1lbnRcclxuICogICB2YXIgeHBhdGhFeHByZXNzaW9uID0gXCIuLy9kaXYvL2FbQGNsYXNzPSdvb3BzJ11cIjtcclxuICogICBhdHJvcGEueHBhdGgucmVtb3ZlTm9kZXNCeVhwYXRoKHhwYXRoRXhwcmVzc2lvbik7XHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDMxM1xyXG4gKiBAcGFyYW0ge1N0cmluZ30geHBhdGhFeHByZXNzaW9uIEFuIFhwYXRoIGV4cHJlc3Npb24gYXMgYSBzdHJpbmdcclxuICogQHBhcmFtIHtET00gTm9kZX0gY29udGV4dE5vZGUgT3B0aW9uYWwuIFRoZSBub2RlIHdoaWNoIGlzIHRvIHNlcnZlIGFzIHRoZSByb290XHJcbiAqIGZvciB0aGUgc3VwcGxpZWQgWHBhdGggZXhwcmVzc2lvbi4gRGVmYXVsdHMgdG8gd2hhdGV2ZXIgZG9jcmVmIGlzLlxyXG4gKiBAcGFyYW0ge0RPTSBEb2N1bWVudH0gZG9jcmVmIE9wdGlvbmFsLiBBIHJlZmVyZW5jZSB0byB0aGUgZG9jdW1lbnQgeW91XHJcbiAqIGFyZSBzZWFyY2hpbmcsIGRlZmF1bHRzIHRvIGRvY3VtZW50LlxyXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBSZXR1cm5zIHRoZSBxdWFudGl0eSBvZiBub2RlcyByZW1vdmVkLlxyXG4gKiBAc2VlIGF0cm9wYS54cGF0aC5wcm9jZXNzTm9kZXNCeVhwYXRoIGZvciBtb3JlIGluZm9ybWF0aW9uLlxyXG4gKi9cclxuYXRyb3BhLnhwYXRoLnJlbW92ZU5vZGVzQnlYcGF0aCA9IGZ1bmN0aW9uIHJlbW92ZU5vZGVzQnlYcGF0aChcclxuICAgIHhwYXRoRXhwcmVzc2lvbiwgY29udGV4dE5vZGUsIGRvY3JlZlxyXG4pIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgYXRyb3BhLnN1cHBvcnRDaGVjaygneHBhdGgnKTtcclxuICAgIHZhciBjb3VudDtcclxuICAgIGNvdW50ID0gYXRyb3BhLnhwYXRoLnByb2Nlc3NOb2Rlc0J5WHBhdGgoXHJcbiAgICAgICAgeHBhdGhFeHByZXNzaW9uLFxyXG4gICAgICAgIGNvbnRleHROb2RlLFxyXG4gICAgICAgIGRvY3JlZixcclxuICAgICAgICBmdW5jdGlvbiAoZWxlbWVudCkge1xyXG4gICAgICAgICAgICBhdHJvcGEucmVtb3ZlTm9kZUJ5UmVmZXJlbmNlKGVsZW1lbnQpO1xyXG4gICAgICAgIH1cclxuICAgICk7XHJcbiAgICByZXR1cm4gY291bnQ7XHJcbn07XHJcbi8qKlxyXG4gKiBTZWxlY3RzIG5vZGVzIGZyb20gdGhlIERPTSB1c2luZyBhbiBYcGF0aCBleHByZXNzaW9uLlxyXG4gKiBAZXhhbXBsZVxyXG4gKiA8cHJlPlxyXG4gKiAgIC8vIFRvIGdldCBhbGwgdGhlIGVsZW1lbnRzIGluIHRoZSBkb2N1bWVudCB3aXRoIGEgc3JjIGF0dHJpYnV0ZTpcclxuICogICB2YXIgc3JjRWxlbWVudHMgPSBhdHJvcGEueHBhdGguZ2V0Tm9kZXNCeVhwYXRoKCdbQHNyY10nKTtcclxuICogPC9wcmU+XHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDMxM1xyXG4gKiBAcGFyYW0ge1N0cmluZ30geHBhdGhFeHByZXNzaW9uIEFuIFhwYXRoIGV4cHJlc3Npb24gYXMgYSBzdHJpbmdcclxuICogQHBhcmFtIHtET00gTm9kZX0gY29udGV4dE5vZGUgT3B0aW9uYWwuIFRoZSBub2RlIHdoaWNoIGlzIHRvIHNlcnZlIGFzIHRoZSByb290XHJcbiAqIGZvciB0aGUgc3VwcGxpZWQgWHBhdGggZXhwcmVzc2lvbi4gRGVmYXVsdHMgdG8gdGhlIGRvY3VtZW50J3Mgcm9vdCBub2RlLlxyXG4gKiBAcGFyYW0ge0RPTSBEb2N1bWVudH0gZG9jcmVmIE9wdGlvbmFsLiBBIHJlZmVyZW5jZSB0byB0aGUgZG9jdW1lbnQgeW91XHJcbiAqIGFyZSBzZWFyY2hpbmcsIGRlZmF1bHRzIHRvIGRvY3VtZW50LlxyXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYW4gYXJyYXkgd2hvc2UgZWxlbWVudHMgYXJlIERPTSBOb2Rlc1xyXG4gKiBAc2VlIGF0cm9wYS54cGF0aC5wcm9jZXNzTm9kZXNCeVhwYXRoIGZvciBtb3JlIGluZm9ybWF0aW9uLlxyXG4gKi9cclxuYXRyb3BhLnhwYXRoLmdldE5vZGVzQnlYcGF0aCA9IGZ1bmN0aW9uIGdldE5vZGVzQnlYcGF0aChcclxuICAgIHhwYXRoRXhwcmVzc2lvbiwgY29udGV4dE5vZGUsIGRvY3JlZlxyXG4pIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuICAgIGF0cm9wYS5zdXBwb3J0Q2hlY2soJ3hwYXRoJyk7XHJcbiAgICB2YXIgZWxlbWVudFJlZmVyZW5jZXM7XHJcbiAgICBlbGVtZW50UmVmZXJlbmNlcyA9IFtdO1xyXG4gICAgYXRyb3BhLnhwYXRoLnByb2Nlc3NOb2Rlc0J5WHBhdGgoXHJcbiAgICAgICAgeHBhdGhFeHByZXNzaW9uLFxyXG4gICAgICAgIGNvbnRleHROb2RlLFxyXG4gICAgICAgIGRvY3JlZixcclxuICAgICAgICBmdW5jdGlvbiAoZWxlbWVudCkge1xyXG4gICAgICAgICAgICBlbGVtZW50UmVmZXJlbmNlcy5wdXNoKGVsZW1lbnQpO1xyXG4gICAgICAgIH1cclxuICAgICk7XHJcbiAgICByZXR1cm4gZWxlbWVudFJlZmVyZW5jZXM7XHJcbn07XHJcbi8qKlxyXG4gKiBFc2NhcGVzIHNpbmdsZSBxdW90ZXMgKGFwb3N0cm9wZSkgaW4gWHBhdGggcXVlcmllcy5cclxuICogQGV4YW1wbGVcclxuICogPHByZT5cclxuICogIC8vIHRoaXMgaXMgdXNlZnVsIGZvciB1c2luZyBhcmJpdHJhcnkgc3RyaW5ncyBpbiB5b3VyIHF1ZXJpZXMuXHJcbiAqICB2YXIgYXJiU3RyLCBlc2NhcGVkU3RyLCB4cGF0aEV4cHJlc3Npb24sIGZvdW5kTm9kZXM7XHJcbiAqICBhcmJTdHIgPSBcIkppbW15IGFpbid0IG5ldmVyIHNhaWQgXFxcIlNodXJcXFwiIFdoeT8gSSBkb24ndCBrbm93IVwiO1xyXG4gKiAgZXNjYXBlZFN0ciA9IGF0cm9wYS54cGF0aC5lc2NhcGVRdW90ZXNYcGF0aChhcmJTdHIpO1xyXG4gKiAgLy8gcHJvZHVjZXM6IGNvbmNhdCgnSmltbXkgYWluJywgXCInXCIsICd0IG5ldmVyIHNhaWQgXCJTaHVyXCIgV2h5PyBJIGRvbicsIFwiJ1wiLFxyXG4gKiAgLy8gJ3Qga25vdyEnKVxyXG4gKiAgLy8gaXQgaXMgbXVjaCBlYXNpZXIgdG8gZGVhbCB3aXRoIHRoZSB2YXJpYWJsZSBuYW1lIHRoYW4gaXQgaXMgdG8gZGVhbCB3aXRoXHJcbiAqICAvLyBhbGwgdGhvc2UgcXVvdGVzIGFuZCBjb21tYXMhXHJcbiAqICB4cGF0aEV4cHJlc3Npb24gPSAnLi8vcFtjb250YWlucyh0ZXh0KCksJyArIGVzY2FwZWRTdHIgKyAnKV0nO1xyXG4gKiAgZm91bmROb2RlcyA9IGF0cm9wYS54cGF0aC5nZXROb2Rlc0J5WHBhdGgoeHBhdGhFeHByZXNzaW9uKTtcclxuICogIC8vIGZvdW5kIG5vZGVzIHdpbGwgY29udGFpbiB0aGUgcCBlbGVtZW50cyB3aGVyZSB0aGUgdGV4dCB3YXMgbWF0Y2hlZC5cclxuICogPC9wcmU+XHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEyMDkwOVxyXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nIEFuIFhwYXRoIHF1ZXJ5XHJcbiAqIEByZXR1cm5zIHtTdHJpbmd9IFJldHVybnMgYSBzdHJpbmcgcmVwcmVzZW50aW5nIGEgY29uY2F0IGZ1bmN0aW9uIGluIFhwYXRoXHJcbiAqIHdoaWNoIHdpbGwgZWZmZWN0aXZlbHkgd29yayBpbiBlc2NhcGluZyBxdW90ZXMgaW4geW91ciB4cGF0aCBxdWVyeS5cclxuICovXHJcbmF0cm9wYS54cGF0aC5lc2NhcGVRdW90ZXNYcGF0aCA9IGZ1bmN0aW9uIGVzY2FwZVF1b3Rlc1hwYXRoKHN0cmluZykge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG4gICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoL1xcJy9nLCBcIicsIFxcXCInXFxcIiwgJ1wiKTtcclxuICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC9eKC4qKSQvZywgXCJjb25jYXQoJyQxJylcIik7XHJcbiAgICByZXR1cm4gc3RyaW5nO1xyXG59O1xyXG5cclxuXHJcblxyXG5cclxud2hpbGUoYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLmxlbmd0aCA+IDApIHtcclxuICAgIGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5wb3AoKSgpO1xyXG59XHJcbm1vZHVsZS5leHBvcnRzID0gYXRyb3BhO1xyXG4iLCIvKmpzbGludFxyXG4gICAgbm9kZSA6IHRydWVcclxuKi9cclxuXHJcbnZhciBhdHJvcGEgPSByZXF1aXJlKCdhdHJvcGEtaGVhZGVyJyk7XHJcblxyXG5mdW5jdGlvbiBsaW5rRGF0YShvYmopIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuICAgIE9iamVjdC5rZXlzKG9iai5kYXRhKS5maWx0ZXIoZnVuY3Rpb24gKHByb3ApIHtcclxuICAgICAgICByZXR1cm4gcHJvcCAhPT0gJ3JlcXVpcmVtZW50cyc7XHJcbiAgICB9KS5mb3JFYWNoKGZ1bmN0aW9uIChwcm9wKSB7XHJcbiAgICAgICAgYXRyb3BhLmRhdGFbcHJvcF0gPSBvYmouZGF0YVtwcm9wXTtcclxuICAgIH0pO1xyXG59XHJcblxyXG52YXIgQXJnc0luZm8gPSByZXF1aXJlKCdhdHJvcGEtQXJnc0luZm8nKTtcclxubGlua0RhdGEoQXJnc0luZm8pO1xyXG5hdHJvcGEuQXJnc0luZm8gPSBBcmdzSW5mby5BcmdzSW5mbztcclxuXHJcbnZhciBhcnJheXMgPSByZXF1aXJlKCdhdHJvcGEtYXJyYXlzJyk7XHJcbmxpbmtEYXRhKGFycmF5cyk7XHJcbmF0cm9wYS5hcnJheXMgPSBhcnJheXMuYXJyYXlzO1xyXG5cclxudmFyIEJhYmJsZXIgPSByZXF1aXJlKCdhdHJvcGEtQmFiYmxlcicpO1xyXG5saW5rRGF0YShCYWJibGVyKTtcclxuYXRyb3BhLkJhYmJsZXIgPSBCYWJibGVyLkJhYmJsZXI7XHJcblxyXG52YXIgQ29va2llTW9uc3RlciA9IHJlcXVpcmUoJ2F0cm9wYS1Db29raWVNb25zdGVyJyk7XHJcbmxpbmtEYXRhKENvb2tpZU1vbnN0ZXIpO1xyXG5hdHJvcGEuQ29va2llTW9uc3RlciA9IENvb2tpZU1vbnN0ZXIuQ29va2llTW9uc3RlcjtcclxuXHJcbnZhciBDcmVhdGVIdG1sRG9jdW1lbnRzRnJvbVhtbGh0dHAgPSByZXF1aXJlKCdhdHJvcGEtQ3JlYXRlSHRtbERvY3VtZW50c0Zyb21YbWxodHRwJyk7XHJcbmxpbmtEYXRhKENyZWF0ZUh0bWxEb2N1bWVudHNGcm9tWG1saHR0cCk7XHJcbmF0cm9wYS5DcmVhdGVIdG1sRG9jdW1lbnRzRnJvbVhtbGh0dHAgPSBDcmVhdGVIdG1sRG9jdW1lbnRzRnJvbVhtbGh0dHAuQ3JlYXRlSHRtbERvY3VtZW50c0Zyb21YbWxodHRwO1xyXG5cclxudmFyIGN1c3RvbUVycm9ycyA9IHJlcXVpcmUoJ2F0cm9wYS1jdXN0b21FcnJvcnMnKTtcclxubGlua0RhdGEoY3VzdG9tRXJyb3JzKTtcclxuYXRyb3BhLmN1c3RvbUVycm9ycyA9IGN1c3RvbUVycm9ycy5jdXN0b21FcnJvcnM7XHJcblxyXG52YXIgSFRNTFBhcnNlciA9IHJlcXVpcmUoJ2F0cm9wYS1IVE1MUGFyc2VyJyk7XHJcbmxpbmtEYXRhKEhUTUxQYXJzZXIpO1xyXG5hdHJvcGEuSFRNTFBhcnNlciA9IEhUTUxQYXJzZXIuSFRNTFBhcnNlcjtcclxuXHJcbnZhciBpbmplY3QgPSByZXF1aXJlKCdhdHJvcGEtaW5qZWN0Jyk7XHJcbmxpbmtEYXRhKGluamVjdCk7XHJcbmF0cm9wYS5pbmplY3QgPSBpbmplY3QuaW5qZWN0O1xyXG5cclxudmFyIGlucXVpcmUgPSByZXF1aXJlKCdhdHJvcGEtaW5xdWlyZScpO1xyXG5saW5rRGF0YShpbnF1aXJlKTtcclxuYXRyb3BhLmlucXVpcmUgPSBpbnF1aXJlLmlucXVpcmU7XHJcblxyXG52YXIgb2JqZWN0cyA9IHJlcXVpcmUoJ2F0cm9wYS1vYmplY3RzJyk7XHJcbmxpbmtEYXRhKG9iamVjdHMpO1xyXG5hdHJvcGEub2JqZWN0cyA9IG9iamVjdHMub2JqZWN0cztcclxuXHJcbnZhciByYW5kb20gPSByZXF1aXJlKCdhdHJvcGEtcmFuZG9tJyk7XHJcbmxpbmtEYXRhKHJhbmRvbSk7XHJcbmF0cm9wYS5yYW5kb20gPSByYW5kb20ucmFuZG9tO1xyXG5cclxudmFyIHJlZ2V4ID0gcmVxdWlyZSgnYXRyb3BhLXJlZ2V4Jyk7XHJcbmxpbmtEYXRhKHJlZ2V4KTtcclxuYXRyb3BhLnJlZ2V4ID0gcmVnZXgucmVnZXg7XHJcblxyXG52YXIgcmVtb3ZlTm9kZUJ5UmVmZXJlbmNlID0gcmVxdWlyZSgnYXRyb3BhLXJlbW92ZU5vZGVCeVJlZmVyZW5jZScpO1xyXG5saW5rRGF0YShyZW1vdmVOb2RlQnlSZWZlcmVuY2UpO1xyXG5hdHJvcGEucmVtb3ZlTm9kZUJ5UmVmZXJlbmNlID0gcmVtb3ZlTm9kZUJ5UmVmZXJlbmNlLnJlbW92ZU5vZGVCeVJlZmVyZW5jZTtcclxuXHJcbnZhciBSZXF1ZXN0ZXIgPSByZXF1aXJlKCdhdHJvcGEtUmVxdWVzdGVyJyk7XHJcbmxpbmtEYXRhKFJlcXVlc3Rlcik7XHJcbmF0cm9wYS5SZXF1ZXN0ZXIgPSBSZXF1ZXN0ZXIuUmVxdWVzdGVyO1xyXG5cclxudmFyIFNlcmlhbEFjdG9yID0gcmVxdWlyZSgnYXRyb3BhLVNlcmlhbEFjdG9yJyk7XHJcbmxpbmtEYXRhKFNlcmlhbEFjdG9yKTtcclxuYXRyb3BhLlNlcmlhbEFjdG9yID0gU2VyaWFsQWN0b3IuU2VyaWFsQWN0b3I7XHJcblxyXG52YXIgc2V0QXNPcHRpb25hbEFyZyA9IHJlcXVpcmUoJ2F0cm9wYS1zZXRBc09wdGlvbmFsQXJnJyk7XHJcbmxpbmtEYXRhKHNldEFzT3B0aW9uYWxBcmcpO1xyXG5hdHJvcGEuc2V0QXNPcHRpb25hbEFyZyA9IHNldEFzT3B0aW9uYWxBcmcuc2V0QXNPcHRpb25hbEFyZztcclxuXHJcbnZhciBzdHJpbmcgPSByZXF1aXJlKCdhdHJvcGEtc3RyaW5nJyk7XHJcbmxpbmtEYXRhKHN0cmluZyk7XHJcbmF0cm9wYS5zdHJpbmcgPSBzdHJpbmcuc3RyaW5nO1xyXG5cclxudmFyIFRleHRBbmFseXplciA9IHJlcXVpcmUoJ2F0cm9wYS1UZXh0QW5hbHl6ZXInKTtcclxubGlua0RhdGEoVGV4dEFuYWx5emVyKTtcclxuYXRyb3BhLlRleHRBbmFseXplciA9IFRleHRBbmFseXplci5UZXh0QW5hbHl6ZXI7XHJcblxyXG52YXIgdXJsID0gcmVxdWlyZSgnYXRyb3BhLXVybCcpO1xyXG5saW5rRGF0YSh1cmwpO1xyXG5hdHJvcGEudXJsID0gdXJsLnVybDtcclxuXHJcbnZhciB3YWl0Rm9yID0gcmVxdWlyZSgnYXRyb3BhLXdhaXRGb3InKTtcclxubGlua0RhdGEod2FpdEZvcik7XHJcbmF0cm9wYS53YWl0Rm9yID0gd2FpdEZvci53YWl0Rm9yO1xyXG5cclxudmFyIHd0ZiA9IHJlcXVpcmUoJ2F0cm9wYS13dGYnKTtcclxubGlua0RhdGEod3RmKTtcclxuYXRyb3BhLnd0ZiA9IHd0Zi53dGY7XHJcblxyXG52YXIgeHBhdGggPSByZXF1aXJlKCdhdHJvcGEteHBhdGgnKTtcclxubGlua0RhdGEoeHBhdGgpO1xyXG5hdHJvcGEueHBhdGggPSB4cGF0aC54cGF0aDtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gYXRyb3BhOyJdfQ==
