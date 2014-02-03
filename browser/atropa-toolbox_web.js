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
arguments[4][5][0].apply(exports,arguments)
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
arguments[4][5][0].apply(exports,arguments)
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
},{"atropa-ArgsInfo":11,"atropa-Babbler":23,"atropa-CookieMonster":25,"atropa-CreateHtmlDocumentsFromXmlhttp":41,"atropa-HTMLParser":43,"atropa-Requester":55,"atropa-SerialActor":57,"atropa-TextAnalyzer":73,"atropa-arrays":77,"atropa-customErrors":79,"atropa-header":80,"atropa-inject":84,"atropa-inquire":86,"atropa-objects":88,"atropa-random":90,"atropa-regex":92,"atropa-removeNodeByReference":94,"atropa-setAsOptionalArg":96,"atropa-string":104,"atropa-url":106,"atropa-waitFor":110,"atropa-wtf":125,"atropa-xpath":131}]},{},[1])
//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXGthc3RvclxcRG9jdW1lbnRzXFxzY3JpcHRzXFxqc1xcQXRyb3BhXFxjdXJyZW50XFxub2RlX21vZHVsZXNcXGJyb3dzZXJpZnlcXG5vZGVfbW9kdWxlc1xcYnJvd3Nlci1wYWNrXFxfcHJlbHVkZS5qcyIsIkM6L1VzZXJzL2thc3Rvci9Eb2N1bWVudHMvc2NyaXB0cy9qcy9BdHJvcGEvY3VycmVudC9kZXYvYnJvd3Nlck1haW4uanMiLCJDOi9Vc2Vycy9rYXN0b3IvRG9jdW1lbnRzL3NjcmlwdHMvanMvQXRyb3BhL2N1cnJlbnQvbm9kZV9tb2R1bGVzL2F0cm9wYS1BcmdzSW5mby9ub2RlX21vZHVsZXMvYXRyb3BhLWFycmF5cy9ub2RlX21vZHVsZXMvYXRyb3BhLWhlYWRlci9zcmMvYXRyb3BhLWhlYWRlci5qcyIsIkM6L1VzZXJzL2thc3Rvci9Eb2N1bWVudHMvc2NyaXB0cy9qcy9BdHJvcGEvY3VycmVudC9ub2RlX21vZHVsZXMvYXRyb3BhLUFyZ3NJbmZvL25vZGVfbW9kdWxlcy9hdHJvcGEtYXJyYXlzL25vZGVfbW9kdWxlcy9hdHJvcGEtaW5xdWlyZS9zcmMvYXRyb3BhLWlucXVpcmUuanMiLCJDOi9Vc2Vycy9rYXN0b3IvRG9jdW1lbnRzL3NjcmlwdHMvanMvQXRyb3BhL2N1cnJlbnQvbm9kZV9tb2R1bGVzL2F0cm9wYS1BcmdzSW5mby9ub2RlX21vZHVsZXMvYXRyb3BhLWFycmF5cy9zcmMvYXRyb3BhLWFycmF5cy5qcyIsIkM6L1VzZXJzL2thc3Rvci9Eb2N1bWVudHMvc2NyaXB0cy9qcy9BdHJvcGEvY3VycmVudC9ub2RlX21vZHVsZXMvYXRyb3BhLUFyZ3NJbmZvL25vZGVfbW9kdWxlcy9hdHJvcGEtY3VzdG9tRXJyb3JzL3NyYy9hdHJvcGEtY3VzdG9tRXJyb3JzLmpzIiwiQzovVXNlcnMva2FzdG9yL0RvY3VtZW50cy9zY3JpcHRzL2pzL0F0cm9wYS9jdXJyZW50L25vZGVfbW9kdWxlcy9hdHJvcGEtQXJnc0luZm8vc3JjL2F0cm9wYS1BcmdzSW5mby5qcyIsIkM6L1VzZXJzL2thc3Rvci9Eb2N1bWVudHMvc2NyaXB0cy9qcy9BdHJvcGEvY3VycmVudC9ub2RlX21vZHVsZXMvYXRyb3BhLUJhYmJsZXIvbm9kZV9tb2R1bGVzL2F0cm9wYS1yYW5kb20vc3JjL2F0cm9wYS1yYW5kb20uanMiLCJDOi9Vc2Vycy9rYXN0b3IvRG9jdW1lbnRzL3NjcmlwdHMvanMvQXRyb3BhL2N1cnJlbnQvbm9kZV9tb2R1bGVzL2F0cm9wYS1CYWJibGVyL25vZGVfbW9kdWxlcy9hdHJvcGEtc3RyaW5nL25vZGVfbW9kdWxlcy9hdHJvcGEtYXJyYXlzL3NyYy9hdHJvcGEtYXJyYXlzLmpzIiwiQzovVXNlcnMva2FzdG9yL0RvY3VtZW50cy9zY3JpcHRzL2pzL0F0cm9wYS9jdXJyZW50L25vZGVfbW9kdWxlcy9hdHJvcGEtQmFiYmxlci9ub2RlX21vZHVsZXMvYXRyb3BhLXN0cmluZy9ub2RlX21vZHVsZXMvYXRyb3BhLXJlZ2V4L3NyYy9hdHJvcGEtcmVnZXguanMiLCJDOi9Vc2Vycy9rYXN0b3IvRG9jdW1lbnRzL3NjcmlwdHMvanMvQXRyb3BhL2N1cnJlbnQvbm9kZV9tb2R1bGVzL2F0cm9wYS1CYWJibGVyL25vZGVfbW9kdWxlcy9hdHJvcGEtc3RyaW5nL3NyYy9hdHJvcGEtc3RyaW5nLmpzIiwiQzovVXNlcnMva2FzdG9yL0RvY3VtZW50cy9zY3JpcHRzL2pzL0F0cm9wYS9jdXJyZW50L25vZGVfbW9kdWxlcy9hdHJvcGEtQmFiYmxlci9zcmMvYXRyb3BhLUJhYmJsZXIuanMiLCJDOi9Vc2Vycy9rYXN0b3IvRG9jdW1lbnRzL3NjcmlwdHMvanMvQXRyb3BhL2N1cnJlbnQvbm9kZV9tb2R1bGVzL2F0cm9wYS1Db29raWVNb25zdGVyL3NyYy9hdHJvcGEtQ29va2llTW9uc3Rlci5qcyIsIkM6L1VzZXJzL2thc3Rvci9Eb2N1bWVudHMvc2NyaXB0cy9qcy9BdHJvcGEvY3VycmVudC9ub2RlX21vZHVsZXMvYXRyb3BhLUNyZWF0ZUh0bWxEb2N1bWVudHNGcm9tWG1saHR0cC9ub2RlX21vZHVsZXMvYXRyb3BhLUhUTUxQYXJzZXIvc3JjL2F0cm9wYS1IVE1MUGFyc2VyLmpzIiwiQzovVXNlcnMva2FzdG9yL0RvY3VtZW50cy9zY3JpcHRzL2pzL0F0cm9wYS9jdXJyZW50L25vZGVfbW9kdWxlcy9hdHJvcGEtQ3JlYXRlSHRtbERvY3VtZW50c0Zyb21YbWxodHRwL25vZGVfbW9kdWxlcy9hdHJvcGEtUmVxdWVzdGVyL25vZGVfbW9kdWxlcy9hdHJvcGEtQXJnc0luZm8vbm9kZV9tb2R1bGVzL2F0cm9wYS1hcnJheXMvc3JjL2F0cm9wYS1hcnJheXMuanMiLCJDOi9Vc2Vycy9rYXN0b3IvRG9jdW1lbnRzL3NjcmlwdHMvanMvQXRyb3BhL2N1cnJlbnQvbm9kZV9tb2R1bGVzL2F0cm9wYS1DcmVhdGVIdG1sRG9jdW1lbnRzRnJvbVhtbGh0dHAvbm9kZV9tb2R1bGVzL2F0cm9wYS1SZXF1ZXN0ZXIvbm9kZV9tb2R1bGVzL2F0cm9wYS1BcmdzSW5mby9zcmMvYXRyb3BhLUFyZ3NJbmZvLmpzIiwiQzovVXNlcnMva2FzdG9yL0RvY3VtZW50cy9zY3JpcHRzL2pzL0F0cm9wYS9jdXJyZW50L25vZGVfbW9kdWxlcy9hdHJvcGEtQ3JlYXRlSHRtbERvY3VtZW50c0Zyb21YbWxodHRwL25vZGVfbW9kdWxlcy9hdHJvcGEtUmVxdWVzdGVyL3NyYy9hdHJvcGEtUmVxdWVzdGVyLmpzIiwiQzovVXNlcnMva2FzdG9yL0RvY3VtZW50cy9zY3JpcHRzL2pzL0F0cm9wYS9jdXJyZW50L25vZGVfbW9kdWxlcy9hdHJvcGEtQ3JlYXRlSHRtbERvY3VtZW50c0Zyb21YbWxodHRwL3NyYy9hdHJvcGEtQ3JlYXRlSHRtbERvY3VtZW50c0Zyb21YbWxodHRwLmpzIiwiQzovVXNlcnMva2FzdG9yL0RvY3VtZW50cy9zY3JpcHRzL2pzL0F0cm9wYS9jdXJyZW50L25vZGVfbW9kdWxlcy9hdHJvcGEtUmVxdWVzdGVyL25vZGVfbW9kdWxlcy9hdHJvcGEtQXJnc0luZm8vbm9kZV9tb2R1bGVzL2F0cm9wYS1hcnJheXMvc3JjL2F0cm9wYS1hcnJheXMuanMiLCJDOi9Vc2Vycy9rYXN0b3IvRG9jdW1lbnRzL3NjcmlwdHMvanMvQXRyb3BhL2N1cnJlbnQvbm9kZV9tb2R1bGVzL2F0cm9wYS1SZXF1ZXN0ZXIvbm9kZV9tb2R1bGVzL2F0cm9wYS1BcmdzSW5mby9zcmMvYXRyb3BhLUFyZ3NJbmZvLmpzIiwiQzovVXNlcnMva2FzdG9yL0RvY3VtZW50cy9zY3JpcHRzL2pzL0F0cm9wYS9jdXJyZW50L25vZGVfbW9kdWxlcy9hdHJvcGEtUmVxdWVzdGVyL3NyYy9hdHJvcGEtUmVxdWVzdGVyLmpzIiwiQzovVXNlcnMva2FzdG9yL0RvY3VtZW50cy9zY3JpcHRzL2pzL0F0cm9wYS9jdXJyZW50L25vZGVfbW9kdWxlcy9hdHJvcGEtU2VyaWFsQWN0b3Ivc3JjL2F0cm9wYS1TZXJpYWxBY3Rvci5qcyIsIkM6L1VzZXJzL2thc3Rvci9Eb2N1bWVudHMvc2NyaXB0cy9qcy9BdHJvcGEvY3VycmVudC9ub2RlX21vZHVsZXMvYXRyb3BhLVRleHRBbmFseXplci9ub2RlX21vZHVsZXMvYXRyb3BhLWFycmF5cy9zcmMvYXRyb3BhLWFycmF5cy5qcyIsIkM6L1VzZXJzL2thc3Rvci9Eb2N1bWVudHMvc2NyaXB0cy9qcy9BdHJvcGEvY3VycmVudC9ub2RlX21vZHVsZXMvYXRyb3BhLVRleHRBbmFseXplci9ub2RlX21vZHVsZXMvYXRyb3BhLXNldEFzT3B0aW9uYWxBcmcvc3JjL2F0cm9wYS1zZXRBc09wdGlvbmFsQXJnLmpzIiwiQzovVXNlcnMva2FzdG9yL0RvY3VtZW50cy9zY3JpcHRzL2pzL0F0cm9wYS9jdXJyZW50L25vZGVfbW9kdWxlcy9hdHJvcGEtVGV4dEFuYWx5emVyL25vZGVfbW9kdWxlcy9hdHJvcGEtc3RyaW5nL25vZGVfbW9kdWxlcy9hdHJvcGEtYXJyYXlzL3NyYy9hdHJvcGEtYXJyYXlzLmpzIiwiQzovVXNlcnMva2FzdG9yL0RvY3VtZW50cy9zY3JpcHRzL2pzL0F0cm9wYS9jdXJyZW50L25vZGVfbW9kdWxlcy9hdHJvcGEtVGV4dEFuYWx5emVyL25vZGVfbW9kdWxlcy9hdHJvcGEtc3RyaW5nL3NyYy9hdHJvcGEtc3RyaW5nLmpzIiwiQzovVXNlcnMva2FzdG9yL0RvY3VtZW50cy9zY3JpcHRzL2pzL0F0cm9wYS9jdXJyZW50L25vZGVfbW9kdWxlcy9hdHJvcGEtVGV4dEFuYWx5emVyL3NyYy9hdHJvcGEtVGV4dEFuYWx5emVyLmpzIiwiQzovVXNlcnMva2FzdG9yL0RvY3VtZW50cy9zY3JpcHRzL2pzL0F0cm9wYS9jdXJyZW50L25vZGVfbW9kdWxlcy9hdHJvcGEtYXJyYXlzL3NyYy9hdHJvcGEtYXJyYXlzLmpzIiwiQzovVXNlcnMva2FzdG9yL0RvY3VtZW50cy9zY3JpcHRzL2pzL0F0cm9wYS9jdXJyZW50L25vZGVfbW9kdWxlcy9hdHJvcGEtaW5qZWN0L3NyYy9hdHJvcGEtaW5qZWN0LmpzIiwiQzovVXNlcnMva2FzdG9yL0RvY3VtZW50cy9zY3JpcHRzL2pzL0F0cm9wYS9jdXJyZW50L25vZGVfbW9kdWxlcy9hdHJvcGEtb2JqZWN0cy9zcmMvYXRyb3BhLW9iamVjdHMuanMiLCJDOi9Vc2Vycy9rYXN0b3IvRG9jdW1lbnRzL3NjcmlwdHMvanMvQXRyb3BhL2N1cnJlbnQvbm9kZV9tb2R1bGVzL2F0cm9wYS1yZWdleC9zcmMvYXRyb3BhLXJlZ2V4LmpzIiwiQzovVXNlcnMva2FzdG9yL0RvY3VtZW50cy9zY3JpcHRzL2pzL0F0cm9wYS9jdXJyZW50L25vZGVfbW9kdWxlcy9hdHJvcGEtcmVtb3ZlTm9kZUJ5UmVmZXJlbmNlL3NyYy9hdHJvcGEtcmVtb3ZlTm9kZUJ5UmVmZXJlbmNlLmpzIiwiQzovVXNlcnMva2FzdG9yL0RvY3VtZW50cy9zY3JpcHRzL2pzL0F0cm9wYS9jdXJyZW50L25vZGVfbW9kdWxlcy9hdHJvcGEtc3RyaW5nL25vZGVfbW9kdWxlcy9hdHJvcGEtYXJyYXlzL3NyYy9hdHJvcGEtYXJyYXlzLmpzIiwiQzovVXNlcnMva2FzdG9yL0RvY3VtZW50cy9zY3JpcHRzL2pzL0F0cm9wYS9jdXJyZW50L25vZGVfbW9kdWxlcy9hdHJvcGEtc3RyaW5nL3NyYy9hdHJvcGEtc3RyaW5nLmpzIiwiQzovVXNlcnMva2FzdG9yL0RvY3VtZW50cy9zY3JpcHRzL2pzL0F0cm9wYS9jdXJyZW50L25vZGVfbW9kdWxlcy9hdHJvcGEtdXJsL3NyYy9hdHJvcGEtdXJsLmpzIiwiQzovVXNlcnMva2FzdG9yL0RvY3VtZW50cy9zY3JpcHRzL2pzL0F0cm9wYS9jdXJyZW50L25vZGVfbW9kdWxlcy9hdHJvcGEtd2FpdEZvci9zcmMvYXRyb3BhLXdhaXRGb3IuanMiLCJDOi9Vc2Vycy9rYXN0b3IvRG9jdW1lbnRzL3NjcmlwdHMvanMvQXRyb3BhL2N1cnJlbnQvbm9kZV9tb2R1bGVzL2F0cm9wYS13dGYvbm9kZV9tb2R1bGVzL2F0cm9wYS1zdHJpbmcvbm9kZV9tb2R1bGVzL2F0cm9wYS1hcnJheXMvc3JjL2F0cm9wYS1hcnJheXMuanMiLCJDOi9Vc2Vycy9rYXN0b3IvRG9jdW1lbnRzL3NjcmlwdHMvanMvQXRyb3BhL2N1cnJlbnQvbm9kZV9tb2R1bGVzL2F0cm9wYS13dGYvbm9kZV9tb2R1bGVzL2F0cm9wYS1zdHJpbmcvc3JjL2F0cm9wYS1zdHJpbmcuanMiLCJDOi9Vc2Vycy9rYXN0b3IvRG9jdW1lbnRzL3NjcmlwdHMvanMvQXRyb3BhL2N1cnJlbnQvbm9kZV9tb2R1bGVzL2F0cm9wYS13dGYvc3JjL2F0cm9wYS13dGYtZGljdGlvbmFyeS5qc29uIiwiQzovVXNlcnMva2FzdG9yL0RvY3VtZW50cy9zY3JpcHRzL2pzL0F0cm9wYS9jdXJyZW50L25vZGVfbW9kdWxlcy9hdHJvcGEtd3RmL3NyYy9hdHJvcGEtd3RmLmpzIiwiQzovVXNlcnMva2FzdG9yL0RvY3VtZW50cy9zY3JpcHRzL2pzL0F0cm9wYS9jdXJyZW50L25vZGVfbW9kdWxlcy9hdHJvcGEteHBhdGgvc3JjL2F0cm9wYS14cGF0aC5qcyIsIkM6L1VzZXJzL2thc3Rvci9Eb2N1bWVudHMvc2NyaXB0cy9qcy9BdHJvcGEvY3VycmVudC9zcmMvYXRyb3BhLXRvb2xib3guanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUM5R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDNWFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUM5REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDbE9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQy9NQTs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqU0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUN6U0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUM3VUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ3pJQTs7Ozs7Ozs7Ozs7O0FDQUE7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUMzTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQzFMQTs7Ozs7Ozs7Ozs7O0FDQUE7Ozs7QUNBQTs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDbldBOzs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDbERBOzs7Ozs7OztBQ0FBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUMxS0E7Ozs7Ozs7Ozs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUN0UUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDeFRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNyRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNsREE7Ozs7Ozs7O0FDQUE7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDbERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvR0E7Ozs7Ozs7O0FDQUE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM2NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDbE1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJhdHJvcGEgPSByZXF1aXJlKCcuLi9zcmMvYXRyb3BhLXRvb2xib3guanMnKTsiLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vZG9jcy92c2RvYy9PcGVuTGF5ZXJzQWxsLmpzXCIvPlxuLypqc2xpbnRcbiAgICBpbmRlbnQ6IDQsXG4gICAgbWF4ZXJyOiA1MCxcbiAgICB3aGl0ZTogdHJ1ZSxcbiAgICBicm93c2VyOiB0cnVlLFxuICAgIGRldmVsOiB0cnVlLFxuICAgIHBsdXNwbHVzOiB0cnVlLFxuICAgIHJlZ2V4cDogdHJ1ZVxuKi9cbi8qZ2xvYmFsIFhQYXRoUmVzdWx0ICovXG4vLyBlbmQgaGVhZGVyXG5cbi8qKlxuICogQ29udGFpbmVyIGZvciBhbGwgR2xvcmlvdXMgY2xhc3NlcywgZnVuY3Rpb25zLCBldGMuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQG5hbWVzcGFjZSBDb250YWluZXIgZm9yIGFsbCBHbG9yaW91cyBjbGFzc2VzLCBmdW5jdGlvbnMsIGV0Yy5cbiAqL1xudmFyIGF0cm9wYSA9IHt9O1xuLyoqXG4gKiBDaGVja3Mgd2hldGhlciB0aGlzIGNsYXNzIGhhcyBiZWVuIG1hcmtlZCBhcyB1bnN1cHBvcnRlZCBhbmQgdGhyb3dzIGFuIFxuICogIGVycm9yIGlmIGl0IGhhcy5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAdmVyc2lvbiAyMDEzMDMwOFxuICogQHBhcmFtIHtTdHJpbmd9IGNsYXNzTmFtZSBUaGUgbmFtZSBvZiB0aGUgY2xhc3MuXG4gKiBAcGFyYW0ge1N0cmluZ30gZXJyb3JNZXNzYWdlIE9wdGlvbmFsLiBBIGN1c3RvbSBlcnJvciBtZXNzYWdlLiBEZWZhdWx0cyB0b1xuICogIGF0cm9wYS5kYXRhW2NsYXNzTmFtZV0uZXJyb3JcbiAqL1xuYXRyb3BhLnN1cHBvcnRDaGVjayA9IGZ1bmN0aW9uIChjbGFzc05hbWUsIGVycm9yTWVzc2FnZSkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIGNsYXNzTmFtZSA9IFN0cmluZyhjbGFzc05hbWUpO1xuICAgIGVycm9yTWVzc2FnZSA9IGVycm9yTWVzc2FnZSB8fCBhdHJvcGEuZGF0YVtjbGFzc05hbWVdLmVycm9yO1xuICAgIGVycm9yTWVzc2FnZSA9IFN0cmluZyhlcnJvck1lc3NhZ2UpO1xuICAgIFxuICAgIGlmKGF0cm9wYS5kYXRhW2NsYXNzTmFtZV0uc3VwcG9ydCA9PT0gJ3Vuc3VwcG9ydGVkJykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JNZXNzYWdlKTtcbiAgICB9XG59O1xuLyoqXG4gKiBQdXNoZXMgYSByZXF1aXJlbWVudCBjaGVjayBpbnRvIGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy4gVGhlIHRlc3RcbiAqICB0ZXN0cyB3aGV0aGVyIHRoZSBjbGFzcyBpcyBzdXBwb3J0ZWQgaW4gdGhpcyBlbnZpcm9ubWVudC4gU2V0c1xuICogIGF0cm9wYS5kYXRhW2NsYXNzTmFtZV0ncyBzdXBwb3J0IHRvIHVuc3VwcG9ydGVkIGFuZCBlcnJvciB0byBlcnJvck1lc3NhZ2VcbiAqICBpZiB0aGUgcmVxdWlyZW1lbnRGbiByZXR1cm5zIGZhbHNlLiBUaGUgcmVxdWlyZW1lbnQgY2hlY2tzIHdpbGwgYWxsIGJlIHJ1blxuICogIGFmdGVyIHRoZSBsaWJyYXJ5IGhhcyBsb2FkZWQuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQHZlcnNpb24gMjAxMzAzMDhcbiAqIEBwYXJhbSB7U3RyaW5nfSBjbGFzc05hbWUgVGhlIG5hbWUgb2YgdGhlIGNsYXNzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVxdWlyZW1lbnRGbiBBIGZ1bmN0aW9uIHRvIHRlc3Qgd2hldGhlciBvciBub3QgdGhlIGNsYXNzXG4gKiAgaXMgc3VwcG9ydGVkIGluIHRoaXMgZW52aXJvbm1lbnQuIElmIHN1cHBvcnRlZCwgcmV0dXJucyB0cnVlIG90aGVyd2lzZVxuICogIHJldHVybiBmYWxzZS5cbiAqIEBwYXJhbSB7U3RyaW5nfSBlcnJvck1lc3NhZ2UgVGhlIGVycm9yIG1lc3NhZ2UgdG8gdXNlIHdoZW4gdGhpcyBjbGFzcyBvciBpdHNcbiAqICBtZXRob2RzIGFyZSBjYWxsZWQgaW4gdW5zdXBwb3J0ZWQgZW52aXJvbm1lbnRzLiBEZWZhdWx0cyB0bzpcbiAqICAnVGhlIGF0cm9wYS4nICsgY2xhc3NOYW1lICsgJyBjbGFzcyBpcyB1bnN1cHBvcnRlZCBpbiB0aGlzIGVudmlyb25tZW50Lic7XG4gKi9cbmF0cm9wYS5yZXF1aXJlcyA9IGZ1bmN0aW9uIChjbGFzc05hbWUsIHJlcXVpcmVtZW50Rm4sIGVycm9yTWVzc2FnZSkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIHZhciBjaGVjayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHRlc3QgPSBmYWxzZTtcbiAgICAgICAgaWYodHlwZW9mIGNsYXNzTmFtZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignYXRyb3BhLnJlcXVpcmVzIHJlcXVpcmVzIHRoZSBjbGFzcyBuYW1lIHRvIGJlICcgK1xuICAgICAgICAgICAgICAgICdzcGVjaWZpZWQnKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYoYXRyb3BhLmRhdGFbY2xhc3NOYW1lXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBhdHJvcGEuZGF0YVtjbGFzc05hbWVdID0ge307XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKHR5cGVvZiByZXF1aXJlbWVudEZuICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgcmVxdWlyZW1lbnRGbiA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZXJyb3JNZXNzYWdlID0gZXJyb3JNZXNzYWdlIHx8ICdUaGUgYXRyb3BhLicgKyBjbGFzc05hbWUgK1xuICAgICAgICAgICAgICAgICAgICAnIGNsYXNzIGlzIHVuc3VwcG9ydGVkIGluIHRoaXMgZW52aXJvbm1lbnQuJztcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgdGVzdCA9IHJlcXVpcmVtZW50Rm4oKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICB0ZXN0ID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGF0cm9wYS5kYXRhW2NsYXNzTmFtZV0uZXJyb3IgPSBlcnJvck1lc3NhZ2U7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKHRlc3QgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgYXRyb3BhLmRhdGFbY2xhc3NOYW1lXS5zdXBwb3J0ID0gJ3Vuc3VwcG9ydGVkJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgXG4gICAgYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLnB1c2goY2hlY2spO1xufTtcbi8qKlxuICogQ29udGFpbmVyIGZvciBnb2JhbCBkYXRhIHJlbGF0ZWQgdG8gdGhlIGNsYXNzZXMgYW5kIGZ1bmN0aW9ucy5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAbmFtZXNwYWNlIENvbnRhaW5lciBmb3IgZ29iYWwgZGF0YSByZWxhdGVkIHRvIHRoZSBjbGFzc2VzIGFuZCBmdW5jdGlvbnMuXG4gKi9cbmF0cm9wYS5kYXRhID0ge307XG5cbmF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cyA9IFtdO1xuXG5hdHJvcGEubm9wID0gZnVuY3Rpb24gbm9wICgpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICByZXR1cm4gbnVsbDtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IGF0cm9wYTtcblxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2RvY3MvdnNkb2MvT3BlbkxheWVyc0FsbC5qc1wiLz5cbnZhciBhdHJvcGEgPSByZXF1aXJlKCdhdHJvcGEtaGVhZGVyJyk7XG4vKmpzbGludFxuICAgIGluZGVudDogNCxcbiAgICBtYXhlcnI6IDUwLFxuICAgIHdoaXRlOiB0cnVlLFxuICAgIGJyb3dzZXI6IHRydWUsXG4gICAgZGV2ZWw6IHRydWUsXG4gICAgcGx1c3BsdXM6IHRydWUsXG4gICAgcmVnZXhwOiB0cnVlXG4qL1xuLypnbG9iYWwgYXRyb3BhICovXG4vLyBlbmQgaGVhZGVyXG5cbi8qKlxuICogQ29udGFpbmVyIGZvciBmdW5jdGlvbnMgdGhhdCB0ZXN0IHRoZSBzdGF0ZSBvZiBpbnB1dHMuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQHZlcnNpb24gMjAxMjA5MDlcbiAqIEBuYW1lc3BhY2UgQ29udGFpbmVyIGZvciBmdW5jdGlvbnMgdGhhdCB0ZXN0IHRoZSBzdGF0ZSBvZiBpbnB1dHMuXG4gKi9cbmF0cm9wYS5pbnF1aXJlID0ge307XG4vKipcbiAqIENoZWNrcyB3aGV0aGVyIHRoZSBpbnB1dCBpcyBudWxsLlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAqIEB2ZXJzaW9uIDIwMTIwOTA5XG4gKiBAcGFyYW0ge01peGVkfSB4IEFueSBpbnB1dCB0aGF0IG1heSBvciBtYXkgbm90IGJlIG51bGwuXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIHggPT09IG51bGwuXG4gKi9cbmF0cm9wYS5pbnF1aXJlLmlzTnVsbCA9IGZ1bmN0aW9uICh4KSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgcmV0dXJuICh4ID09PSBudWxsKTtcbn07XG4vKipcbiAqIENoZWNrcyB3aGV0aGVyIHRoZSBpbnB1dCBpcyBhbiBvYmplY3QuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQHZlcnNpb24gMjAxMjA5MDlcbiAqIEBwYXJhbSB7TWl4ZWR9IHggQW55IGlucHV0IHRoYXQgbWF5IG9yIG1heSBub3QgYmUgYW4gb2JqZWN0LlxuICogQHJldHVybnMge0Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiB0eXBlb2YoeCkgPT09ICdvYmplY3QnLlxuICovXG5hdHJvcGEuaW5xdWlyZS5pc09iamVjdCA9IGZ1bmN0aW9uICh4KSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgcmV0dXJuICh0eXBlb2YgeCA9PT0gJ29iamVjdCcpO1xufTtcbi8qKlxuICogQ2hlY2tzIHdoZXRoZXIgdGhlIGlucHV0IGlzIGJvdGggYW4gb2JqZWN0IGFuZCBub3QgbnVsbC5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAdmVyc2lvbiAyMDEyMDkwOVxuICogQHBhcmFtIHtNaXhlZH0geCBBbnkgaW5wdXQgdGhhdCBtYXkgb3IgbWF5IG5vdCBiZSBib3RoIGFuXG4gKiBvYmplY3QgYW5kIG51bGwuXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIHggaXMgYm90aCBhbiBvYmplY3QgYW5kXG4gKiBub3QgbnVsbC4gKG51bGwgaXMgYW4gb2JqZWN0KS5cbiAqL1xuYXRyb3BhLmlucXVpcmUuaXNPYmplY3ROb3ROdWxsID0gZnVuY3Rpb24gKHgpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICByZXR1cm4gYXRyb3BhLmlucXVpcmUuaXNPYmplY3QoeCkgJiYgKCFhdHJvcGEuaW5xdWlyZS5pc051bGwoeCkpO1xufTtcbi8qKlxuICogQ2hlY2tzIGFuIG9iamVjdCBmb3IgdGhlIGV4aXN0ZW5jZSBvZiBhIHByb3BlcnR5XG4gKiByZWdhcmRsZXNzIG9mIHdoZXRoZXIgdGhlIHByb3BlcnR5IHdhcyBpbmhlcml0ZWRcbiAqIG9yIG5vdC5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAdmVyc2lvbiAyMDEyMDkwOVxuICogQHBhcmFtIHtPYmplY3R9IG9iaiBBbiBvYmplY3Qgd2hpY2ggbWF5IG9yIG1heSBub3RcbiAqIGhhdmUgdGhlIHByb3BlcnR5IGlkZW50aWZpZWQgYnkgcHJvcC5cbiAqIEBwYXJhbSB7U3RyaW5nfSBwcm9wIEEgc3RyaW5nIHZhbHVlIHJlcHJlc2VudGluZyB0aGVcbiAqIG5hbWUgb2YgdGhlIHByb3BlcnR5LlxuICogQHJldHVybnMge0Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiBvYmoucHJvcCBleGlzdHMsXG4gKiBvdGhlcndpc2UgcmV0dXJucyBmYWxzZS5cbiAqL1xuYXRyb3BhLmlucXVpcmUuaGFzUHJvcGVydHkgPSBmdW5jdGlvbiAob2JqLCBwcm9wKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgaWYgKGF0cm9wYS5pbnF1aXJlLmlzT2JqZWN0Tm90TnVsbChvYmopKSB7XG4gICAgICAgIHJldHVybiAocHJvcCBpbiBvYmopO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59O1xuLyoqXG4gKiBDaGVja3Mgd2hldGhlciB0aGUgaW5wdXQgaXMgYW4gZW1wdHkgc3RyaW5nLlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAqIEB2ZXJzaW9uIDIwMTMwMTE4XG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyIFRoZSBzdHJpbmcgeW91IHdhbnQgdG8ga25vdyBhYm91dFxuICogQHJldHVybnMge0Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiBzdHIgaXMgYW4gZW1wdHkgc3RyaW5nLFxuICogIG90aGVyd2lzZSByZXR1cm5zIGZhbHNlLlxuICovXG5hdHJvcGEuaW5xdWlyZS5pc0VtcHR5U3RyaW5nID0gZnVuY3Rpb24gKHN0cikge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIHZhciBvdXQgPSBmYWxzZTtcbiAgICBpZiAoJycgPT09IHN0cikge1xuICAgICAgICBvdXQgPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gb3V0O1xufTtcblxuXG5cblxud2hpbGUoYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLmxlbmd0aCA+IDApIHtcbiAgICBhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMucG9wKCkoKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gYXRyb3BhO1xuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2RvY3MvdnNkb2MvT3BlbkxheWVyc0FsbC5qc1wiLz5cclxudmFyIGF0cm9wYSA9IHJlcXVpcmUoJ2F0cm9wYS1oZWFkZXInKTtcclxuYXRyb3BhLmlucXVpcmUgPSByZXF1aXJlKCdhdHJvcGEtaW5xdWlyZScpLmlucXVpcmU7XHJcbi8qanNsaW50XHJcbiAgICBpbmRlbnQ6IDQsXHJcbiAgICBtYXhlcnI6IDUwLFxyXG4gICAgd2hpdGU6IHRydWUsXHJcbiAgICBicm93c2VyOiB0cnVlLFxyXG4gICAgZGV2ZWw6IHRydWUsXHJcbiAgICBwbHVzcGx1czogdHJ1ZSxcclxuICAgIHJlZ2V4cDogdHJ1ZVxyXG4qL1xyXG4vKmdsb2JhbCBhdHJvcGEgKi9cclxuLy8gZW5kIGhlYWRlclxyXG5cclxuLyoqXHJcbiAqIFV0aWxpdGllcyBmb3IgaGFuZGxpbmcgYXJyYXlzLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzAyMjFcclxuICogQG5hbWVzcGFjZSBVdGlsaXRpZXMgZm9yIGhhbmRsaW5nIGFycmF5cy5cclxuICovXHJcbmF0cm9wYS5hcnJheXMgPSB7fTtcclxuLyoqXHJcbiAqIENvbXBhcmVzIHR3byBhcnJheXMgYmFzZWQgb24gc2l6ZSwgY29udGVudHMsIGFuZCBlbGVtZW50IG9yZGVyLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMjA5MDlcclxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkxIE9uZSBhcnJheSB5b3Ugd2FudCBjb21wYXJlZCB0byBhbm90aGVyLlxyXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheTIgVGhlIG90aGVyIGFycmF5LlxyXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gUmV0dXJucyB0cnVlIG9yIGZhbHNlIGRlcGVuZGluZyBvblxyXG4gKiAgd2hldGhlciBvciBub3QgdGhlIGFycmF5cyBtYXRjaGVkIGluIHNpemUsIGNvbXBvc2l0aW9uLCBhbmRcclxuICogIGVsZW1lbnQgb3JkZXIuXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciB4ID0gWzEsMl07XHJcbiAqIHZhciB5ID0gWzEsMSwzXTtcclxuICogYXRyb3BhLmFycmF5cy5tYXRjaCh4LHkpO1xyXG4gKiAvLyByZXR1cm5zIGZhbHNlXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciB4ID0gWzEsMl07XHJcbiAqIHZhciB5ID0gWzEsMl07XHJcbiAqIGF0cm9wYS5hcnJheXMubWF0Y2goeCx5KTtcclxuICogLy8gcmV0dXJucyB0cnVlXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciB4ID0gWzEsMl07XHJcbiAqIHZhciB5ID0gWzIsMV07XHJcbiAqIGF0cm9wYS5hcnJheXMubWF0Y2goeCx5KTtcclxuICogLy8gcmV0dXJucyBmYWxzZSBiZWNhdXNlIHRoZSBlbGVtZW50cyBhcmUgbm90IGluIHRoZSBzYW1lIG9yZGVyLlxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgeCA9IFsxLHsnYVByb3AnIDogJ2FWYWx1ZSd9XTtcclxuICogdmFyIHkgPSBbMSx7J2FQcm9wJyA6ICdhVmFsdWUnfV07XHJcbiAqIGF0cm9wYS5hcnJheXMubWF0Y2goeCx5KTtcclxuICogLy8gcmV0dXJucyBmYWxzZSBiZWNhdXNlIGV2ZW4gdGhvdWdoIHRoZSBvYmplY3QgbG9va3MgdGhlIHNhbWUsIHRoZVxyXG4gKiAvLyB0d28gb2JqZWN0cyBhcmUgaW4gZmFjdCBkaXN0aW5jdCBvYmplY3RzLlxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgb2JqID0geydhUHJvcCcgOiAnYVZhbHVlJ307XHJcbiAqIHZhciB4ID0gWzEsb2JqXTtcclxuICogdmFyIHkgPSBbMSxvYmpdO1xyXG4gKiBhdHJvcGEuYXJyYXlzLm1hdGNoKHgseSk7XHJcbiAqIC8vIHJldHVybnMgdHJ1ZSBiZWNhdXNlIHRoZSBvYmplY3RzIHJlZmVyZW5jZWQgaW4gdGhlIGFycmF5cyBhcmVcclxuICogLy8gaW4gZmFjdCB0aGUgc2FtZSBvYmplY3QuXHJcbiAqL1xyXG5hdHJvcGEuYXJyYXlzLm1hdGNoID0gZnVuY3Rpb24gYXJyYXlzTWF0Y2goYXJyYXkxLCBhcnJheTIpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgdmFyIHgsXHJcbiAgICBsO1xyXG4gICAgaWYgKGFycmF5MS5sZW5ndGggIT09IGFycmF5Mi5sZW5ndGgpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBsID0gYXJyYXkxLmxlbmd0aDtcclxuICAgIGZvciAoeCA9IDA7IHggPCBsOyB4ICs9IDEpIHtcclxuICAgICAgICBpZiAoYXJyYXkxW3hdICE9PSBhcnJheTJbeF0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0cnVlO1xyXG59O1xyXG4vKipcclxuICogU3VidHJhY3RzIG9uZSBhcnJheSBmcm9tIGFub3RoZXIgYXJyYXkgYmFzZWQgb24gdGhlIHVuaXF1ZSB2YWx1ZXMgaW4gYm90aFxyXG4gKiAgc2V0cy5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwMTEyXHJcbiAqIEBwYXJhbSB7QXJyYXl9IGEgKHN1YnRyYWhlbmQpIFRoZSBhcnJheSB0byBzdWJ0cmFjdC5cclxuICogQHBhcmFtIHtBcnJheX0gZnJvbUIgKG1pbnVlbmQpIFRoZSBhcnJheSB3aXRoIGVsZW1lbnRzIGR1cGxpY2F0ZWQgaW4gPGNvZGU+YTwvY29kZT5cclxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGEgbmV3IGFycmF5IGNvbnRhaW5pbmcgb25seSB0aGUgdW5pcXVlXHJcbiAqICB2YWx1ZXMgZm91bmQgaW4gPGNvZGU+ZnJvbUI8L2NvZGU+IHRoYXQgYXJlIG5vdCBwcmVzZW50IGluIDxjb2RlPmE8L2NvZGU+XHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciB4ID0gWzEsMl07XHJcbiAqIHZhciB5ID0gWzEsMSwzXTtcclxuICogYXRyb3BhLmFycmF5cy5zdWJ0cmFjdCh4LHkpO1xyXG4gKiAvLyByZXR1cm5zIFszXVxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgeCA9IFsxLDNdO1xyXG4gKiB2YXIgeSA9IFszLDFdO1xyXG4gKiBhdHJvcGEuYXJyYXlzLnN1YnRyYWN0KHgseSk7XHJcbiAqIC8vIHJldHVybnMgW11cclxuICogQGV4YW1wbGVcclxuICogdmFyIHggPSBbMSwzXTtcclxuICogdmFyIHkgPSBbMywxLDEsOV07XHJcbiAqIGF0cm9wYS5hcnJheXMuc3VidHJhY3QoeCx5KTtcclxuICogLy8gcmV0dXJucyBbOV1cclxuICogQGV4YW1wbGVcclxuICogdmFyIHggPSBbMSwzLHsnYVByb3AnIDogJ2FWYWwnfV07XHJcbiAqIHZhciB5ID0gWzMsMSx7J2FQcm9wJyA6ICdhVmFsJ31dO1xyXG4gKiBhdHJvcGEuYXJyYXlzLnN1YnRyYWN0KHgseSk7XHJcbiAqIC8vIHJldHVybnMgW3snYVByb3AnIDogJ2FWYWwnfV0gXHJcbiAqIC8vIGJlY2F1c2UgdGhlIHR3byBvYmplY3RzIGFyZSBub3QgdGhlIHNhbWUgb2JqZWN0LlxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgb2JqID0geydhUHJvcCcgOiAnYVZhbCd9O1xyXG4gKiB2YXIgeCA9IFsxLDMsb2JqXTtcclxuICogdmFyIHkgPSBbMywxLHsnYVByb3AnIDogJ2FWYWwnfV07XHJcbiAqIGF0cm9wYS5hcnJheXMuc3VidHJhY3QoeCx5KTtcclxuICogLy8gcmV0dXJucyBbeydhUHJvcCcgOiAnYVZhbCd9XSBcclxuICogLy8gYmVjYXVzZSB0aGUgdHdvIG9iamVjdHMgYXJlIG5vdCB0aGUgc2FtZSBvYmplY3QuXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciBvYmogPSB7J2FQcm9wJyA6ICdhVmFsJ31cclxuICogdmFyIHggPSBbMSwzLG9ial07XHJcbiAqIHZhciB5ID0gWzMsMSxvYmpdO1xyXG4gKiBhdHJvcGEuYXJyYXlzLnN1YnRyYWN0KHgseSk7XHJcbiAqIC8vIHJldHVybnMgW10gXHJcbiAqIC8vIGJlY2F1c2UgdGhlIG9iamVjdHMgcmVmZXJlbmNlZCBpbiB0aGUgYXJyYXlzIGFyZSB0aGUgc2FtZSBvYmplY3QuXHJcbiAqL1xyXG5hdHJvcGEuYXJyYXlzLnN1YnRyYWN0ID0gZnVuY3Rpb24oYSwgZnJvbUIpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgdmFyIHRoZSA9IHt9O1xyXG4gICAgdGhlLnJlc3VsdCA9IFtdO1xyXG4gICAgZnJvbUIuZm9yRWFjaChmdW5jdGlvbihpdGVtKXtcclxuICAgICAgICB0aGUubWFyayA9IGZhbHNlO1xyXG4gICAgICAgIGEuZm9yRWFjaChmdW5jdGlvbihybSl7XHJcbiAgICAgICAgICAgIGlmKGl0ZW0gPT09IHJtKSB7XHJcbiAgICAgICAgICAgICAgICB0aGUubWFyayA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBpZih0aGUubWFyayAhPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICB0aGUucmVzdWx0LnB1c2goaXRlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gdGhlLnJlc3VsdDtcclxufTtcclxuLyoqXHJcbiAqIFJldHVybnMgYW4gYXJyYXkgb2YgdmFsdWVzIGZvdW5kIGluIGJvdGggb2YgdGhlIGdpdmVuIGFycmF5cy5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwMTEyXHJcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5MSBBbiBhcnJheS5cclxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkyIEFub3RoZXIgYXJyYXkuXHJcbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBhbiBhcnJheSBvZiB2YWx1ZXMgZm91bmQgaW4gYm90aCBvZiB0aGUgZ2l2ZW5cclxuICogIGFycmF5cy5cclxuICogQGV4YW1wbGVcclxuICogdmFyIHggPSBbMSwzLDRdO1xyXG4gKiB2YXIgeSA9IFszLDEsNV07XHJcbiAqIGF0cm9wYS5hcnJheXMuaW50ZXJzZWN0KHgseSk7XHJcbiAqIC8vIHJldHVybnMgWzEsM11cclxuICogQGV4YW1wbGVcclxuICogdmFyIHggPSBbMSwxLDMsNF07XHJcbiAqIHZhciB5ID0gWzMsMSwxLDVdO1xyXG4gKiBhdHJvcGEuYXJyYXlzLmludGVyc2VjdCh4LHkpO1xyXG4gKiAvLyByZXR1cm5zIFsxLDEsM11cclxuICogQGV4YW1wbGVcclxuICogdmFyIG9iaiA9IHsnYVByb3AnIDogJ2FWYWwnfTtcclxuICogdmFyIHggPSBbMSwzLG9ial07XHJcbiAqIHZhciB5ID0gWzMsMSxvYmpdO1xyXG4gKiBhdHJvcGEuYXJyYXlzLmludGVyc2VjdCh4LHkpO1xyXG4gKiAvLyByZXR1cm5zIFsxLDMseydhUHJvcCcgOiAnYVZhbCd9XVxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgb2JqID0geydhUHJvcCcgOiAnYVZhbCd9O1xyXG4gKiB2YXIgeCA9IFsxLDMseydhUHJvcCcgOiAnYVZhbCd9XTtcclxuICogdmFyIHkgPSBbMywxLG9ial07XHJcbiAqIGF0cm9wYS5hcnJheXMuaW50ZXJzZWN0KHgseSk7XHJcbiAqIC8vIHJldHVybnMgWzEsM10gYmVjYXVzZSB0aGUgdHdvIG9iamVjdHMgYXJlIG5vdCB0aGUgc2FtZSBvYmplY3QuXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciB4ID0gWzEsMyx7J2FQcm9wJyA6ICdhVmFsJ31dO1xyXG4gKiB2YXIgeSA9IFszLDEseydhUHJvcCcgOiAnYVZhbCd9XTtcclxuICogYXRyb3BhLmFycmF5cy5pbnRlcnNlY3QoeCx5KTtcclxuICogLy8gcmV0dXJucyBbMSwzXSBiZWNhdXNlIHRoZSB0d28gb2JqZWN0cyBhcmUgbm90IHRoZSBzYW1lIG9iamVjdC5cclxuICovXHJcbmF0cm9wYS5hcnJheXMuaW50ZXJzZWN0ID0gZnVuY3Rpb24gaW50ZXJzZWN0KGFycmF5MSwgYXJyYXkyKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHZhciBzbWFsbEFycmF5LCBsYXJnZUFycmF5LCBpbnRlcnNlY3Rpb24gPSBbXTtcclxuICAgIGlmKGFycmF5MS5sZW5ndGggPiBhcnJheTIubGVuZ3RoKSB7XHJcbiAgICAgICAgbGFyZ2VBcnJheSA9IGFycmF5MS5zcGxpY2UoMCk7XHJcbiAgICAgICAgc21hbGxBcnJheSA9IGFycmF5Mi5zcGxpY2UoMCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGxhcmdlQXJyYXkgPSBhcnJheTIuc3BsaWNlKDApO1xyXG4gICAgICAgIHNtYWxsQXJyYXkgPSBhcnJheTEuc3BsaWNlKDApO1xyXG4gICAgfVxyXG4gICAgc21hbGxBcnJheS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgdmFyIGlkeEluTGFyZ2VBcnJheSA9IGxhcmdlQXJyYXkuaW5kZXhPZihpdGVtKTtcclxuICAgICAgICBpZiAoMCA8PSBpZHhJbkxhcmdlQXJyYXkpIHsgLy8gaGFzIHdvcmRcclxuICAgICAgICAgICAgaW50ZXJzZWN0aW9uLnB1c2gobGFyZ2VBcnJheS5zcGxpY2UoaWR4SW5MYXJnZUFycmF5LCAxKVswXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gaW50ZXJzZWN0aW9uO1xyXG59O1xyXG4vKipcclxuICogQ2FsY3VsYXRlcyB0aGUgZnJlcXVlbmN5IG9mIGl0ZW1zIG9jY3VycmluZyBpbiBhbiBhcnJheS5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwMTE4XHJcbiAqIEBwYXJhbSB7QXJyYXl9IGFyciBUaGUgYXJyYXkgdG8gY2FsY3VsYXRlIGZyZXF1ZW5jaWVzIGZyb20uXHJcbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYW4gb2JqZWN0IHdob3NlIGtleXMgYXJlIGVhY2ggdW5pcXVlXHJcbiAqICBlbGVtZW50cyBmcm9tIHRoZSBhcnJheSBhbmQgdGhlaXIgdmFsdWUgaXMgdGhlaXIgZnJlcXVlbmN5IG9mXHJcbiAqICBvY2N1cnJlbmNlIHdpdGhpbiB0aGUgYXJyYXkuIEJlIGNhcmVmdWwgdGhhdCB5b3VyIGFycmF5IGRvZXNcclxuICogIG5vdCBjb250YWluIHZhbHVlcyBtYXRjaGluZyBvYmplY3QgaW5zdGFuY2UgcHJvcGVydHkgbmFtZXMuXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciB4ID0gWzEsMSwxLDEsMSwzLDNdO1xyXG4gKiBhdHJvcGEuYXJyYXlzLmdldEZyZXF1ZW5jeSh4KTtcclxuICogLy8gcmV0dXJucyB7XHJcbiAqIC8vICAgICBcIjFcIjogNSxcclxuICogLy8gICAgIFwiM1wiOiAyXHJcbiAqIC8vIH1cclxuICogQGV4YW1wbGVcclxuICogdmFyIHggPSBbXCJiaWxsXCIsIFwiZnJlZFwiLCBcImZyZWRcIiwgXCJqYW5lXCJdO1xyXG4gKiBhdHJvcGEuYXJyYXlzLmdldEZyZXF1ZW5jeSh4KTtcclxuICogLy8gcmV0dXJucyB7XHJcbiAqIC8vICAgICBcImJpbGxcIjogMSxcclxuICogLy8gICAgIFwiZnJlZFwiOiAyLFxyXG4gKiAvLyAgICAgXCJqYW5lXCI6IDFcclxuICogLy8gfVxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgeCA9IFsxLDMseydhUHJvcCcgOiAnYVZhbCd9XTtcclxuICogYXRyb3BhLmFycmF5cy5nZXRGcmVxdWVuY3koeCk7XHJcbiAqIC8vIHJldHVybnMge1xyXG4gKiAvLyAgICAgXCIxXCI6IDEsXHJcbiAqIC8vICAgICBcIjNcIjogMSxcclxuICogLy8gICAgIFwiW29iamVjdCBPYmplY3RdXCI6IDFcclxuICogLy8gfVxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgb2JqID0geydhUHJvcCcgOiAnYVZhbCd9O1xyXG4gKiB2YXIgb3RoZXJPYmogPSB7fTtcclxuICogdmFyIHggPSBbMSwzLG9iaixvdGhlck9iaix7J2FEb3VnaG51dCcgOiAnc3ByaW5rbGVzJ31dO1xyXG4gKiBhdHJvcGEuYXJyYXlzLmdldEZyZXF1ZW5jeSh4KTtcclxuICogLy8gcmV0dXJucyB7XHJcbiAqIC8vICAgICBcIjFcIjogMSxcclxuICogLy8gICAgIFwiM1wiOiAxLFxyXG4gKiAvLyAgICAgXCJbb2JqZWN0IE9iamVjdF1cIjogM1xyXG4gKiAvLyB9XHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciB4ID0gWzEsMyxcInRvU3RyaW5nXCJdO1xyXG4gKiBhdHJvcGEuYXJyYXlzLmdldEZyZXF1ZW5jeSh4KTtcclxuICogLy8gcmV0dXJucyB7XHJcbiAqIC8vICAgICBcIjFcIjogMSxcclxuICogLy8gICAgIFwiM1wiOiAxLFxyXG4gKiAvLyAgICAgXCJ0b1N0cmluZ1wiOiBcImZ1bmN0aW9uIHRvU3RyaW5nKCkge1xcbiAgICBbbmF0aXZlIGNvZGVdXFxufTFcIlxyXG4gKiAvLyB9XHJcbiAqL1xyXG5hdHJvcGEuYXJyYXlzLmdldEZyZXF1ZW5jeSA9IGZ1bmN0aW9uIChhcnIpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgdmFyIG91dCA9IGFyci5yZWR1Y2UoZnVuY3Rpb24gKGFjYywgY3Vycikge1xyXG4gICAgICAgIGlmIChhY2NbY3Vycl0gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBhY2NbY3Vycl0gPSAxO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGFjY1tjdXJyXSArPSAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYWNjO1xyXG4gICAgfSwge30pO1xyXG4gICAgcmV0dXJuIG91dDtcclxufTtcclxuLyoqXHJcbiAqIEdldHMgVW5pcXVlIHZhbHVlcyBmcm9tIGFuIGFycmF5LlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzAxMThcclxuICogQHBhcmFtIHtBcnJheX0gbGFyZ2VBcnJheSBUaGUgYXJyYXkgd2l0aCBkdXBsaWNhdGUgdmFsdWVzIGluIGl0LlxyXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYSBuZXcgYXJyYXkgY29udGFpbmluZyBvbmx5IHRoZSB1bmlxdWVcclxuICogIHZhbHVlcyBmb3VuZCBpbiB0aGUgbGFyZ2VBcnJheS5cclxuICogQGV4YW1wbGVcclxuICogdmFyIHggPSBbMSwxLDEsNCw0LDMsNl07XHJcbiAqIGF0cm9wYS5hcnJheXMuZ2V0VW5pcXVlKHgpO1xyXG4gKiAvLyByZXR1cm5zIFsgXCIxXCIsIFwiNFwiLCBcIjNcIiwgXCI2XCIgXVxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgeCA9IFtcImJpbGxcIiwgXCJmcmVkXCIsIFwiamFuZVwiLCBcImZyZWRcIl07XHJcbiAqIGF0cm9wYS5hcnJheXMuZ2V0VW5pcXVlKHgpO1xyXG4gKiAvLyByZXR1cm5zIFtcImJpbGxcIiwgXCJmcmVkXCIsIFwiamFuZVwiXVxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgeCA9IFsgXHJcbiAqICAgICBcImJpbGxcIixcclxuICogICAgIHtcImFQcm9wXCIgOiBcImFWYWx1ZVwifSxcclxuICogICAgIHtcImFHdXlcIiA6IFwiZnJlZFwifSxcclxuICogICAgIHtcImFMYWR5XCIgOiBcImphbmVcIn1cclxuICogXTtcclxuICogYXRyb3BhLmFycmF5cy5nZXRVbmlxdWUoeCk7XHJcbiAqIC8vIHJldHVybnMgWyBcImJpbGxcIiwgXCJbb2JqZWN0IE9iamVjdF1cIiBdXHJcbiAqL1xyXG5hdHJvcGEuYXJyYXlzLmdldFVuaXF1ZSA9IGZ1bmN0aW9uIChsYXJnZUFycmF5KSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHJldHVybiBPYmplY3Qua2V5cyhhdHJvcGEuYXJyYXlzLmdldEZyZXF1ZW5jeShsYXJnZUFycmF5KSkuc29ydCgpO1xyXG59O1xyXG4vKipcclxuICogUmVtb3ZlcyBlbXB0eSBzdHJpbmdzIGZyb20gdGhlIGdpdmVuIGFycmF5LlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzAxMThcclxuICogQHBhcmFtIHtBcnJheX0gYXJyYXlXaXRoRW1wdHlFbGVtZW50cyBUaGUgYXJyYXkgd2l0aCBlbXB0eSBzdHJpbmdzIGluIGl0LlxyXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYSBuZXcgYXJyYXkgd2l0aCBlbXB0eSBzdHJpbmdzIHJlbW92ZWQuXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciB4ID0gWyAxMCwgLCA1LCBcIlwiLCAnJywgNyBdO1xyXG4gKiBjb25zb2xlLmxvZygnc3RhcnRpbmcgbGVuZ3RoICcgKyB4Lmxlbmd0aCk7XHJcbiAqIGNvbnNvbGUubG9nKHgpO1xyXG4gKiB4ID0gYXRyb3BhLmFycmF5cy5yZW1vdmVFbXB0eUVsZW1lbnRzKHgpO1xyXG4gKiBjb25zb2xlLmxvZygnZW5kaW5nIGxlbmd0aCAnICsgeC5sZW5ndGgpO1xyXG4gKiBjb25zb2xlLmxvZyh4KTtcclxuICogLy8gZGlzcGxheXMgdGhlIGZvbGxvd2luZ1xyXG4gKiAvLyBzdGFydGluZyBsZW5ndGggNlxyXG4gKiAvLyBbMTAsIHVuZGVmaW5lZCwgNSwgXCJcIiwgXCJcIiwgN11cclxuICogLy8gZW5kaW5nIGxlbmd0aCAzXHJcbiAqIC8vIFsxMCwgNSwgN11cclxuICovXHJcbmF0cm9wYS5hcnJheXMucmVtb3ZlRW1wdHlFbGVtZW50cyA9IGZ1bmN0aW9uIChhcnJheVdpdGhFbXB0eUVsZW1lbnRzKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHJldHVybiBhcnJheVdpdGhFbXB0eUVsZW1lbnRzLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgIHJldHVybiAhYXRyb3BhLmlucXVpcmUuaXNFbXB0eVN0cmluZyhpdGVtKTtcclxuICAgIH0pO1xyXG59O1xyXG4vKipcclxuICogUmVpbmRleGVzIGFuIGFycmF5LlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzAxMThcclxuICogQHBhcmFtIHtBcnJheX0gYXJyIFRoZSBhcnJheSB3aXRoIGRpc2NvbnRpbnVvdXMga2V5cy5cclxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGFuIGFycmF5IHdpdGggY29udGludW91cyBrZXlzLlxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgeCA9IFsgXCJhXCIsIFwiYlwiLCBcImNcIiwgdW5kZWZpbmVkIF07XHJcbiAqIGNvbnNvbGUubG9nKHgpOyAvLyBbIFwiYVwiLCBcImJcIiwgXCJjXCIsIHVuZGVmaW5lZCBdXHJcbiAqIGNvbnNvbGUubG9nKHgubGVuZ3RoKTsgLy8gNFxyXG4gKiBcclxuICogZGVsZXRlIHhbMV07IC8vIGRlbGV0ZXMgdGhlIGtleSBmcm9tIHRoZSBhcnJheSBidXRcclxuICogICAgICAgICAgICAgIC8vIHRoZSBhcnJheSBsZW5ndGggcmVtYWlucyB0aGUgc2FtZVxyXG4gKiAgICAgICAgICAgICAgLy8gYXQgdGhpcyBwb2ludCB0aGUgYXJyYXlzIGtleXMgYXJlIDAsIDIsIGFuZCAzXHJcbiAqIGNvbnNvbGUubG9nKHgpOyAvLyBbIFwiYVwiLCB1bmRlZmluZWQsIFwiY1wiLCB1bmRlZmluZWQgXVxyXG4gKiBjb25zb2xlLmxvZyh4Lmxlbmd0aCk7IC8vIDRcclxuICogXHJcbiAqIHggPSBhdHJvcGEuYXJyYXlzLnJlaW5kZXgoeCk7XHJcbiAqIGNvbnNvbGUubG9nKHgpOyAvLyAgWyBcImFcIiwgXCJjXCIsIHVuZGVmaW5lZCBdXHJcbiAqICAgIC8vIG5vdGUgdGhhdCB0aGUgbGFzdCBlbGVtZW50IGV4aXN0ZWQgaW4gdGhlIGFycmF5LCBpdHMgdmFsdWUgd2FzXHJcbiAqICAgIC8vIHVuZGVmaW5lZCBidXQgaXQgZGlkIGhhdmUgYSBrZXkgc28gdGhlIGVsZW1lbnQgcmVtYWlucyBpbiB0aGUgYXJyYXkuXHJcbiAqICAgIC8vXHJcbiAqICAgIC8vIFRoZSBkZWxldGVkIGVsZW1lbnQgd2FzIGluIGZhY3QgZGVsZXRlZCBmcm9tIHRoZSBhcnJheSBzbyB0aGVyZSB3YXMgbm9cclxuICogICAgLy8ga2V5IHhbMV0gYXQgYWxsLCB3aGVuIHRyeWluZyB0byBhY2Nlc3MgdGhpcyBub24gZXhpc3RpbmcgZWxlbWVudCB0aGVcclxuICogICAgLy8gdmFsdWUgb2YgdW5kZWZpbmVkIHdhcyByZXR1cm5lZC4gVGhpcyBiZWhhdmlvciBpcyBjb25mdXNpbmcgdW5sZXNzIHlvdVxyXG4gKiAgICAvLyB0aGluayBhYm91dCB0aGUgYXJyYXlhcyBhbiBvYmplY3Qgd2hvc2UgcHJvcGVydGllcyBhcmUgbmFtZWQgYnlcclxuICogICAgLy8gbnVtYmVycy4gQWNjZXNzaW5nIGFuIHVuZGVmaW5lZCBwcm9wZXJ0eSByZXR1cm5zIHVuZGVmaW5lZCByZWdhcmRsZXNzXHJcbiAqICAgIC8vIG9mIHdoZXRoZXIgdGhlIHByb3BlcnR5IGV4aXN0ZWQgaW4gdGhlIHBhc3Qgb3Igbm90LlxyXG4gKiBjb25zb2xlLmxvZyh4Lmxlbmd0aCk7IC8vIDNcclxuICovXHJcbmF0cm9wYS5hcnJheXMucmVpbmRleCA9IGZ1bmN0aW9uIHJlaW5kZXgoYXJyKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHZhciBpZHgsIG91dDtcclxuICAgIG91dCA9IFtdO1xyXG4gICAgZm9yKGlkeCBpbiBhcnIpIHtcclxuICAgICAgICBpZihhcnIuaGFzT3duUHJvcGVydHkoaWR4KSkge1xyXG4gICAgICAgICAgICBvdXQucHVzaChhcnJbaWR4XSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG91dDtcclxufTtcclxuLyoqXHJcbiAqIFNvcnRzIGFuIGFycmF5J3MgZWxlbWVudHMgbnVtZXJpY2FsbHkuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDEyMFxyXG4gKiBAcGFyYW0ge0FycmF5fSBhcnIgVGhlIGFycmF5IHRvIHNvcnQuIEFsbCBlbGVtZW50cyBvZiB0aGUgYXJyYXkgbXVzdCBiZVxyXG4gKiAgbnVtYmVyLWlzaC5cclxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGFuIGFycmF5IHdob3NlIGVsZW1lbnRzIGFyZSBpbiBudW1lcmljIG9yZGVyLlxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgeCA9IFszLCAyLCA5LCAyNiwgMTAsIDEsIDk5LCAxNV07XHJcbiAqIGNvbnNvbGUubG9nKCBhdHJvcGEuYXJyYXlzLnNvcnROdW1lcmljYWxseSh4KSApO1xyXG4gKiAvLyBsb2dzIFsxLCAyLCAzLCA5LCAxMCwgMTUsIDI2LCA5OV1cclxuICovXHJcbmF0cm9wYS5hcnJheXMuc29ydE51bWVyaWNhbGx5ID0gZnVuY3Rpb24gc29ydE51bWVyaWNhbGx5KGFycikge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICByZXR1cm4gYXJyLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcclxuICAgICAgICByZXR1cm4gKGEgLSBiKTtcclxuICAgIH0pO1xyXG59O1xyXG4vKipcclxuICogVGhyb3dzIGFuIGVycm9yLCA8Y29kZT5TdHJpbmcucHJvdG90eXBlLmxvY2FsZUNvbXBhcmU8L2NvZGU+IGlzIG5vdCBcclxuICogIHN0YW5kYXJkaXplZC5cclxuICogXHJcbiAqICBZZXMsIGxvY2FsZUNvbXBhcmUgaXMgaW4gdGhlIHN0YW5kYXJkIGJ1dCwgYXQgdGhpcyB0aW1lIHRoZSBhY3R1YWxcclxuICogIGNvbXBhcmlzb24gaXMgaW1wbGVtZW50YXRpb24gZGVwZW5kYW50LiBUaGlzIG1lYW5zIHRoYXQgXCJhbHBoYWJldGljYWwgb3JkZXJcIlxyXG4gKiAgY2FuIGJlIGRpZmZlcmVudCBvbiBkaWZmZXJlbnQgcGxhdGZvcm1zLiBXaGF0IEkgZm91bmQgd2FzIHRoYXQgaW4gbm9kZSB0aGVcclxuICogIGFycmF5IG9mIDxjb2RlPlsnYScsJ1onLCdBJywneiddPC9jb2RlPiB3b3VsZCBiZSBzb3J0ZWQgdG9cclxuICogIDxjb2RlPlsnQScsJ1onLCdhJywnelwiXTwvY29kZT4sIHdoaWxlIG9uXHJcbiAqICBmaXJlZm94IGl0IHdvdWxkIGJlIHNvcnRlZCB0byA8Y29kZT5bJ2EnLCdBJywneicsJ1onXTwvY29kZT4uIFdobyBrbm93cyBpZlxyXG4gKiAgYW5vdGhlciBpbXBsZW1lbnRvciB3b3VsZCBzb3J0IGl0IDxjb2RlPlsnQScsJ2EnLCdaJywneiddPC9jb2RlPj9cclxuICogXHJcbiAqIEluIG9yZGVyIHRvIHByb3ZpZGUgYSByZWxpYWJsZSBpbXBsZW1lbnRhdGlvbiBJIHdvdWxkIGhhdmUgdG8gY3JlYXRlIG15IG93blxyXG4gKiAgaW1wbGVtZW50YXRpb24gb2YgPGNvZGU+U3RyaW5nLnByb3RvdHlwZS5sb2NhbGVDb21wYXJlPC9jb2RlPiBhbmQgdGhhdCdzXHJcbiAqICBqdXN0IHRvbyBtdWNoIHdvcmsgZm9yIG1lIHRvIGRvIGFsb25lLlxyXG4gKiBAdGhyb3dzIHtFcnJvcn0gXCJTdHJpbmcucHJvdG90eXBlLmxvY2FsZUNvbXBhcmUgaXMgbm90IHN0YW5kYXJkaXplZFwiXHJcbiAqL1xyXG5hdHJvcGEuYXJyYXlzLnNvcnRBbHBoYWJldGljYWxseSA9IGZ1bmN0aW9uIHNvcnRBbHBoYWJldGljYWxseShhcnIpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiU3RyaW5nLnByb3RvdHlwZS5sb2NhbGVDb21wYXJlIGlzIG5vdCBzdGFuZGFyZGl6ZWRcIik7XHJcbn07XHJcbi8qKlxyXG4gKiBEZWxldGVzIHRoZSBnaXZlbiBlbGVtZW50IGZyb20gdGhlIGFycmF5IGF0IHRoZSBnaXZlbiBpbmRleC4gSXQgYmFzaWNhbGx5XHJcbiAqICBkb2VzIHdoYXQgeW91IHdvdWxkIGV4cGVjdCB0aGUgZGVsZXRlIG9wZXJhdG9yIHRvIGRvLCBleGNlcHQgdGhlIGRlbGV0ZVxyXG4gKiAgb3BlcmF0b3IgZG9lc24ndCBkbyB3aGF0IHlvdSB3b3VsZCBleHBlY3QuXHJcbiAqIEBwYXJhbSB7QXJyYXl9IGFyciBUaGUgYXJyYXkuXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBpbmRleCBUaGUgaW5kZXggb2YgdGhlIGVsZW1lbnQgdG8gZGVsZXRlLlxyXG4gKiBAcmV0dXJucyBSZXR1cm5zIGFuIGFycmF5IHdpdGggdGhlIGVsZW1lbnQgcmVtb3ZlZCwgY29udGlndW91cyBrZXlzLCBhbmRcclxuICogIHdob3NlIGxlbmd0aCBpcyAxIGxlc3MgdGhhbiB0aGUgaW5wdXQgYXJyYXkuXHJcbiAqL1xyXG5hdHJvcGEuYXJyYXlzLmRlbGV0ZUVsZW1lbnQgPSBmdW5jdGlvbiAoYXJyLCBpbmRleCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICBkZWxldGUgYXJyW2luZGV4XTtcclxuICAgIHJldHVybiBhdHJvcGEuYXJyYXlzLnJlaW5kZXgoYXJyKTtcclxufTtcclxuXHJcblxyXG5cclxuXHJcbndoaWxlKGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5sZW5ndGggPiAwKSB7XHJcbiAgICBhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMucG9wKCkoKTtcclxufVxyXG5tb2R1bGUuZXhwb3J0cyA9IGF0cm9wYTtcclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2RvY3MvdnNkb2MvT3BlbkxheWVyc0FsbC5qc1wiLz5cbnZhciBhdHJvcGEgPSByZXF1aXJlKCdhdHJvcGEtaGVhZGVyJyk7XG4vKmpzbGludFxuICAgIGluZGVudDogNCxcbiAgICBtYXhlcnI6IDUwLFxuICAgIHdoaXRlOiB0cnVlLFxuICAgIGJyb3dzZXI6IHRydWUsXG4gICAgZGV2ZWw6IHRydWUsXG4gICAgcGx1c3BsdXM6IHRydWUsXG4gICAgcmVnZXhwOiB0cnVlXG4qL1xuLypnbG9iYWwgYXRyb3BhICovXG4vLyBlbmQgaGVhZGVyXG4vKipcbiAqIENvbnRhaW5lciBmb3IgY3VzdG9tIEVycm9ycy5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAbmFtZXNwYWNlIENvbnRhaW5lciBmb3IgY3VzdG9tIEVycm9ycy5cbiAqL1xuYXRyb3BhLmN1c3RvbUVycm9ycyA9IHt9O1xuXG4vKipcbiAqIEludmFsaWQgQXJndW1lbnQgVHlwZXMgRXJyb3JcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAdmVyc2lvbiAyMDEzMDIyMVxuICogQGNsYXNzIEludmFsaWQgQXJndW1lbnQgVHlwZXMgRXJyb3JcbiAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlIE9wdGlvbmFsLiBUaGUgZXJyb3IgbWVzc2FnZSB0byBzZW5kLiBEZWZhdWx0cyB0b1xuICogIDxjb2RlPkludmFsaWRBcmd1bWVudFR5cGVzRXJyb3I8L2NvZGU+XG4gKiBAcmV0dXJucyB7RXJyb3J9IFJldHVybnMgYW4gaW5zdGFuY2Ugb2YgdGhlIEludmFsaWRBcmd1bWVudFR5cGVzRXJyb3JcbiAqL1xuYXRyb3BhLmN1c3RvbUVycm9ycy5JbnZhbGlkQXJndW1lbnRUeXBlc0Vycm9yID0gZnVuY3Rpb24gSW52YWxpZEFyZ3VtZW50VHlwZXNFcnJvcihtZXNzYWdlKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuICAgIC8qKlxuICAgICAqIFRoZSBuYW1lIG9mIHRoZSBlcnJvci4gVGVsbHMgdGhlIHVzZXIgd2hhdCBraW5kIG9mIGN1c3RvbVxuICAgICAqIGVycm9yIGhhcyBiZWVuIHRocm93bi5cbiAgICAgKiBAZmllbGRPZiBhdHJvcGEuY3VzdG9tRXJyb3JzLkludmFsaWRBcmd1bWVudFR5cGVzRXJyb3IjXG4gICAgICogQHR5cGUge1N0cmluZ31cbiAgICAgKiBAZGVmYXVsdCBcImF0cm9wYS5jdXN0b21FcnJvcnMuSW52YWxpZEFyZ3VtZW50VHlwZXNFcnJvclwiXG4gICAgICovXG4gICAgdGhpcy5uYW1lID0gXCJhdHJvcGEuY3VzdG9tRXJyb3JzLkludmFsaWRBcmd1bWVudFR5cGVzRXJyb3JcIjtcbiAgICAvKipcbiAgICAgKiBUaGUgZXJyb3IgbWVzc2FnZSB0byBzZW5kLlxuICAgICAqIEBmaWVsZE9mIGF0cm9wYS5jdXN0b21FcnJvcnMuSW52YWxpZEFyZ3VtZW50VHlwZXNFcnJvciNcbiAgICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgICAqIEBkZWZhdWx0IFwiSW52YWxpZEFyZ3VtZW50VHlwZXNFcnJvclwiXG4gICAgICovXG4gICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZSB8fCBcIkludmFsaWRBcmd1bWVudFR5cGVzRXJyb3JcIjtcbn07XG5hdHJvcGEuY3VzdG9tRXJyb3JzLkludmFsaWRBcmd1bWVudFR5cGVzRXJyb3IucHJvdG90eXBlID0gbmV3IEVycm9yKCk7XG5hdHJvcGEuY3VzdG9tRXJyb3JzLkludmFsaWRBcmd1bWVudFR5cGVzRXJyb3IucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gXG4gICAgYXRyb3BhLmN1c3RvbUVycm9ycy5JbnZhbGlkQXJndW1lbnRUeXBlc0Vycm9yO1xuXG5cblxuXG53aGlsZShhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMubGVuZ3RoID4gMCkge1xuICAgIGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5wb3AoKSgpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBhdHJvcGE7XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vZG9jcy92c2RvYy9PcGVuTGF5ZXJzQWxsLmpzXCIvPlxudmFyIGF0cm9wYSA9IHJlcXVpcmUoJ2F0cm9wYS1oZWFkZXInKTtcbmF0cm9wYS5pbnF1aXJlID0gcmVxdWlyZSgnYXRyb3BhLWlucXVpcmUnKS5pbnF1aXJlO1xuYXRyb3BhLmFycmF5cyA9IHJlcXVpcmUoJ2F0cm9wYS1hcnJheXMnKS5hcnJheXM7XG5hdHJvcGEuY3VzdG9tRXJyb3JzID0gcmVxdWlyZSgnYXRyb3BhLWN1c3RvbUVycm9ycycpLmN1c3RvbUVycm9ycztcbi8qanNsaW50XG4gICAgaW5kZW50OiA0LFxuICAgIG1heGVycjogNTAsXG4gICAgd2hpdGU6IHRydWUsXG4gICAgYnJvd3NlcjogdHJ1ZSxcbiAgICBkZXZlbDogdHJ1ZSxcbiAgICBwbHVzcGx1czogdHJ1ZSxcbiAgICByZWdleHA6IHRydWVcbiovXG4vKmdsb2JhbCBhdHJvcGEgKi9cbi8vIGVuZCBoZWFkZXJcblxuLyoqXG4gKiBUaGlzIHJlcHJlc2VudHMgYSBmaWx0ZXIgZm9yIGFyZ3VtZW50cyBiYXNlZCBvbiB0eXBlLlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAqIEB2ZXJzaW9uIDIwMTMwMjIxXG4gKiBAY2xhc3MgVGhpcyByZXByZXNlbnRzIGEgZmlsdGVyIGZvciBhcmd1bWVudHMgYmFzZWQgb24gdHlwZS5cbiAqIEByZXR1cm5zIHtBcmdzSW5mb30gUmV0dXJucyBhbiBBcmdzSW5mbyBmaWx0ZXIuXG4gKiBAcmVxdWlyZXMgYXRyb3BhLmFycmF5cy5tYXRjaFxuICogQGV4YW1wbGVcbiAqIGZ1bmN0aW9uIG15Q2xhc3N5Q29uc3RydWN0b3IodGFrZXMsIGEsIGZldywgYXJncykge1xuICogICAgIHZhciBleHBlY3RlZEFyZ1R5cGVzLCBjaGVja2VyO1xuICogICAgIFxuICogICAgIGV4cGVjdGVkQXJnVHlwZXMgPSB7fTtcbiAqICAgICBleHBlY3RlZEFyZ1R5cGVzLnJlcXVlc3RXaXRoTWVzc2FnZSA9IFxuICogICAgICAgICAgWydzdHJpbmcnLCAnc3RyaW5nJywgJ3N0cmluZycsICdmdW5jdGlvbiddO1xuICogICAgIGV4cGVjdGVkQXJnVHlwZXMucmVxdWVzdE51bGxNZXNzYWdlID0gXG4gKiAgICAgICAgICBbJ3N0cmluZycsICdzdHJpbmcnLCAnb2JqZWN0JywgJ2Z1bmN0aW9uJ107XG4gKiAgICAgXG4gKiAgICAgY2hlY2tlciA9IG5ldyBhdHJvcGEuQXJnc0luZm8oKTtcbiAqICAgICBjaGVja2VyLnNldEV4cGVjdGVkQXJnVHlwZXMoZXhwZWN0ZWRBcmdUeXBlcyk7XG4gKiAgICAgXG4gKiAgICAgdHJ5IHtcbiAqICAgICBcbiAqICAgICAgICAgLy8gQ2hlY2sgdGhlIHN1cHBsaWVkIGFyZ3VtZW50cyBwc2V1ZG8gYXJyYXkncyBhcmd1bWVudCB0eXBlc1xuICogICAgICAgICAvLyBpZiB0aGUgcGF0dGVybiBvZiB0eXBlcyBpbiBhcmd1bWVudHMgbWF0Y2hlcyBvbmUgb2YgdGhlXG4gKiAgICAgICAgIC8vIHBhdHRlcm5zIHNldCBvbiBleHBlY3RlZEFyZ1R5cGVzIHRoZW4gdGhlIG1hdGNoaW5nIHBhdHRlcm5cbiAqICAgICAgICAgLy8gd2lsbCBiZSByZXR1cm5lZC4gT3RoZXJ3aXNlLCBhbiBlcnJvciB3aWxsIGJlIHRocm93bi5cbiAqICAgICAgICAgXG4gKiAgICAgICAgIGNoZWNrZXIuY2hlY2tBcmdUeXBlcyhhcmd1bWVudHMpO1xuICogICAgIH0gY2F0Y2ggKGUpIHtcbiAqICAgICBcbiAqICAgICAgICAgLy8gSW52YWxpZCBhcmd1bWVudCB0eXBlcyBzdXBwbGllZC4gSGFuZGxlXG4gKiAgICAgICAgIC8vIHRoZSBlcnJvciBvciBiYWlsLlxuICogICAgICAgICBcbiAqICAgICB9XG4gKiAgICAgXG4gKiAgICAgLy8gdGhlIGFyZ3VtZW50cyBzdXBwbGllZCB3aWxsIGJlIG9mIHRoZSBwcm9wZXIgdHlwZVxuICogICAgIC8vIHlvdXIgZnVuY3Rpb24gY2FuIGdvIGFoZWFkIGFuZCBkbyB0aGluZ3Mgd2l0aCB0aGVtXG4gKiB9XG4gKi9cbmF0cm9wYS5BcmdzSW5mbyA9IGZ1bmN0aW9uIEFyZ3NJbmZvKCkge1xuICAgICd1c2Ugc3RyaWN0JztcbiAgICB2YXIgZXhwZWN0ZWRBcmdUeXBlcyxcbiAgICBjaGVja0FyZ3MsXG4gICAgdGhhdDtcbiAgICAvKipcbiAgICAgKiBIb2xkcyB0aGUgcHJvcGVyIHJlZmVyZW5jZSB0byA8Y29kZT50aGlzPC9jb2RlPlxuICAgICAqIGZvciBwcml2YXRlIGZ1bmN0aW9ucy5cbiAgICAgKiBAdHlwZSBUaGlzXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAZmllbGRPZiBhdHJvcGEuQXJnc0luZm8tXG4gICAgICovXG4gICAgdGhhdCA9IHRoaXM7XG4gICAgLyoqXG4gICAgICogSG9sZHMgdGhlIGV4cGVjdGVkIGFyZ3VtZW50IHR5cGVzIG9iamVjdC5cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEB0eXBlIEV4cGVjdGVkIEFyZyBUeXBlc1xuICAgICAqIEBmaWVsZE9mIGF0cm9wYS5BcmdzSW5mby1cbiAgICAgKi9cbiAgICBleHBlY3RlZEFyZ1R5cGVzID0ge307XG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgZXhwZWN0ZWQgYXJndW1lbnQgdHlwZXMuXG4gICAgICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gICAgICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gICAgICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICAgICAqIEB2ZXJzaW9uIDIwMTIwOTA5XG4gICAgICogQG1ldGhvZE9mIGF0cm9wYS5BcmdzSW5mbyNcbiAgICAgKiBAcGFyYW0ge0V4cGVjdGVkIEFyZyBUeXBlc30gdHlwZXNPYmogQW4gb2JqZWN0IGNvbnRhaW5pbmcgaW5mb3JtYXRpb25cbiAgICAgKiAgYWJvdXQgdGhlIHR5cGVzIG9mIGFyZ3VtZW50cyB5b3UgZXhwZWN0LiBTcGVjaWZpY2FsbHksIHRoZSBvYmplY3Qgc2hvdWxkXG4gICAgICogIGxvb2sgbGlrZSB0aGUgZXhhbXBsZS5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIC8vIHR5cGVzT2JqIGlzIGV4cGVjdGVkIHRvIGJlIG9mIHRoZSBmb3JtOlxuICAgICAqIFxuICAgICAqIHZhciB0eXBlc09iaiA9IHtcbiAgICAgKiAgICAgXCJuYW1lZEFyZ3VtZW50VHlwZXNBcnJheVwiIDogW1wic3RyaW5nXCIsIFwiZnVuY3Rpb25cIiwgXCJudW1iZXJcIl0sXG4gICAgICogICAgIFwibmFtZWRBbHRlcm5hdGVBcmd1bWVudFR5cGVzQXJyYXlcIiA6IFtcIm9iamVjdFwiLCBcImZ1bmN0aW9uXCIsIFwibnVtYmVyXCJdXG4gICAgICogfTtcbiAgICAgKiBcbiAgICAgKiAvLyBZb3UgbWF5IHVzZSBhcyBtYW55IG5hbWVkIGFycmF5cyBhcyB5b3Ugd2lzaCBhbmQgY2hlY2tBcmdUeXBlcyB3aWxsXG4gICAgICogLy8gdGVzdCBmb3IgYSBtYXRjaCB0byBhdCBsZWFzdCBvbmUgb2YgdGhlIHByb3ZpZGVkIG5hbWVkIGFycmF5cy5cbiAgICAgKiBAdGhyb3dzIHthdHJvcGEuY3VzdG9tRXJyb3JzLkludmFsaWRBcmd1bWVudFR5cGVzRXJyb3J9IFRocm93cyBhbiBlcnJvciBpZiB0aGVcbiAgICAgKiAgdHlwZXNPYmogY2FuIG5vdCBiZSB1c2VkIHRvIHNldCB0aGUgZXhwZWN0ZWQgYXJndW1lbnQgdHlwZXMuXG4gICAgICovXG4gICAgdGhpcy5zZXRFeHBlY3RlZEFyZ1R5cGVzID0gZnVuY3Rpb24gc2V0RXhwZWN0ZWRBcmdUeXBlcyh0eXBlc09iaikge1xuICAgICAgICB2YXIgZXJyb3IsIG5hbWVzO1xuICAgICAgICBcbiAgICAgICAgZXJyb3IgPSBmYWxzZTtcbiAgICAgICAgXG4gICAgICAgIGlmKGF0cm9wYS5pbnF1aXJlLmlzT2JqZWN0Tm90TnVsbCh0eXBlc09iaikpIHtcbiAgICAgICAgICAgIG5hbWVzID0gT2JqZWN0LmtleXModHlwZXNPYmopO1xuICAgICAgICAgICAgaWYgKG5hbWVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBleHBlY3RlZEFyZ1R5cGVzID0gdHlwZXNPYmo7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGVycm9yID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVycm9yID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYoZXJyb3IpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBhdHJvcGEuY3VzdG9tRXJyb3JzLkludmFsaWRBcmd1bWVudFR5cGVzRXJyb3IoXG4gICAgICAgICAgICAgICAgJ3R5cGVzT2JqIGlzIGV4cGVjdGVkIHRvIGJlIG9mIHRoZSBmb3JtOiB2YXIgdHlwZXNPYmogPSAnICtcbiAgICAgICAgICAgICAgICAneyBcIm5hbWVkQXJndW1lbnRUeXBlc0FycmF5XCIgOiAnICtcbiAgICAgICAgICAgICAgICAnICAgIFtcInN0cmluZ1wiLCBcImZ1bmN0aW9uXCIsIFwibnVtYmVyXCJdLCAnICtcbiAgICAgICAgICAgICAgICAnXCJuYW1lZEFsdGVybmF0ZUFyZ3VtZW50VHlwZXNBcnJheVwiIDogJyArXG4gICAgICAgICAgICAgICAgJyAgIFtcIm9iamVjdFwiLCBcImZ1bmN0aW9uXCIsIFwibnVtYmVyXCJdIH07ICcgK1xuICAgICAgICAgICAgICAgICdZb3UgbWF5IHVzZSBhcyBtYW55IG5hbWVkIGFycmF5cyBhcyB5b3Ugd2lzaCBhbmQnICtcbiAgICAgICAgICAgICAgICAnY2hlY2tBcmdUeXBlcyB3aWxsIHRlc3QgZm9yIGEgbWF0Y2ggdG8gYXQgbGVhc3Qgb25lIG9mIHRoZSAnICtcbiAgICAgICAgICAgICAgICAncHJvdmlkZWQgbmFtZWQgYXJyYXlzLidcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHR5cGVzIG9mIGFyZ3VtZW50cy5cbiAgICAgKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAgICAgKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAgICAgKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gICAgICogQHZlcnNpb24gMjAxMjA5MDlcbiAgICAgKiBAbWV0aG9kT2YgYXRyb3BhLkFyZ3NJbmZvI1xuICAgICAqIEBwYXJhbSB7YXJndW1lbnRzfSBhcmdzIEFuIGFyZ3VtZW50cyBvYmplY3QsIG9yIGFueXRoaW5nIHlvdSB3YW50IHRvXG4gICAgICogY2hlY2sgdGhlIHR5cGUgb2YuXG4gICAgICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGFuIGFycmF5IG9mIHRoZSB0eXBlcyBvZiBhcmd1bWVudHMgcGFzc2VkIGluLlxuICAgICAqL1xuICAgIHRoaXMuZ2V0QXJnVHlwZXMgPSBmdW5jdGlvbiBnZXRBcmdUeXBlcyhhcmdzKSB7XG4gICAgICAgIHZhciB4LFxuICAgICAgICBhcmdUeXBlcztcbiAgICAgICAgYXJnVHlwZXMgPSBbXTtcbiAgICAgICAgZm9yICh4IGluIGFyZ3MpIHtcbiAgICAgICAgICAgIGlmIChhcmdzLmhhc093blByb3BlcnR5KHgpKSB7XG4gICAgICAgICAgICAgICAgYXJnVHlwZXMucHVzaCh0eXBlb2YoYXJnc1t4XSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhcmdUeXBlcztcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENvbXBhcmVzIHRoZSBleHBlY3RlZCBhcmd1bWVudHMgdHlwZXMgdG8gdGhlXG4gICAgICogcmVjZWl2ZWQgYXJndW1lbnRzIHR5cGVzLlxuICAgICAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICAgICAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICAgICAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAgICAgKiBAdmVyc2lvbiAyMDEyMDkwOVxuICAgICAqIEBwcml2YXRlXG4gICAgICogQG1ldGhvZE9mIGF0cm9wYS5BcmdzSW5mby1cbiAgICAgKiBAcGFyYW0ge0FycmF5fSBleHBlY3RlZFR5cGVzQXJyYXkgQW4gYXJyYXkgdGFrZW4gZnJvbSB0aGUgdXNlclxuICAgICAqIGNyZWF0ZWQgYXJndW1lbnQgdHlwZXMgb2JqZWN0LlxuICAgICAqIEBwYXJhbSB7YXJndW1lbnRzfSBhcmdzIGFuIGFyZ3VtZW50cyBvYmplY3QuXG4gICAgICogQHJldHVybnMge0Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiB0aGUgZXhwZWN0ZWQgdHlwZXMgbWF0Y2ggZm9yIHR5cGVcbiAgICAgKiAgYW5kIGFyZSBpbiB0aGUgc2FtZSBvcmRlciBhcyB0aGUgcmVjZWl2ZWQgdHlwZXMuXG4gICAgICogQHJlcXVpcmVzIGF0cm9wYS5hcnJheXMubWF0Y2hcbiAgICAgKi9cbiAgICBjaGVja0FyZ3MgPSBmdW5jdGlvbiBjaGVja0FyZ3MoZXhwZWN0ZWRUeXBlc0FycmF5LCBhcmdzKSB7XG4gICAgICAgIHZhciB0eXBlcztcbiAgICAgICAgdHlwZXMgPSB7fTtcbiAgICAgICAgdHlwZXMuZXhwZWN0ZWQgPSBleHBlY3RlZFR5cGVzQXJyYXk7XG4gICAgICAgIHR5cGVzLnJlY2VpdmVkID0gdGhhdC5nZXRBcmdUeXBlcyhhcmdzKTtcbiAgICAgICAgcmV0dXJuIGF0cm9wYS5hcnJheXMubWF0Y2godHlwZXMuZXhwZWN0ZWQsIHR5cGVzLnJlY2VpdmVkKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENoZWNrcyB0aGUgZ2l2ZW4gYXJndW1lbnRzIG9iamVjdCBhZ2FpbnN0IHRoZSBleHBlY3RlZFxuICAgICAqIGFyZ3VtZW50cyB0eXBlcy5cbiAgICAgKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAgICAgKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAgICAgKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gICAgICogQHZlcnNpb24gMjAxMjA5MDlcbiAgICAgKiBAbWV0aG9kT2YgYXRyb3BhLkFyZ3NJbmZvI1xuICAgICAqIEBwYXJhbSB7YXJndW1lbnRzfSBhcmdzIEFuIGFyZ3VtZW50cyBvYmplY3RcbiAgICAgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgdXNlciBhc3NpZ25lZCBrZXkgd2hpY2ggbWF0Y2hlcyB0aGVcbiAgICAgKiBhcmd1bWVudHMgc3VwcGxpZWQsIG9yIHRocm93cyBhbiBlcnJvci5cbiAgICAgKiBAdGhyb3dzIHthdHJvcGEuY3VzdG9tRXJyb3JzLkludmFsaWRBcmd1bWVudFR5cGVzRXJyb3J9IFRocm93cyBhbiBlcnJvciBpZiBubyBtYXRjaGluZ1xuICAgICAqICBwYXR0ZXJuIG9mIGFyZ3VtZW50IHR5cGVzIGNhbiBiZSBmb3VuZCBmb3IgPGNvZGU+YXJnczwvY29kZT5cbiAgICAgKiBAc2VlIGF0cm9wYS5BcmdzSW5mbyNzZXRFeHBlY3RlZEFyZ1R5cGVzXG4gICAgICovXG4gICAgdGhpcy5jaGVja0FyZ1R5cGVzID0gZnVuY3Rpb24gY2hlY2tBcmdUeXBlcyhhcmdzKSB7XG4gICAgICAgIHZhciBleHBlY3RlZFR5cGVzO1xuICAgICAgICBpZiAoT2JqZWN0LmtleXMoZXhwZWN0ZWRBcmdUeXBlcykubGVuZ3RoIDwgMSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IGF0cm9wYS5jdXN0b21FcnJvcnMuSW52YWxpZEFyZ3VtZW50VHlwZXNFcnJvcihcbiAgICAgICAgICAgICAgICAnRXhwZWN0ZWQgYXJndW1lbnQgdHlwZXMgaXMgbm90IHNldC4gVXNlICcgK1xuICAgICAgICAgICAgICAgICdzZXRFeHBlY3RlZEFyZ1R5cGVzKHR5cGVzT2JqKSB0byBzZXQuIHR5cGVzT2JqIGlzIGFuICcgK1xuICAgICAgICAgICAgICAgICdvYmplY3Qgd2hvc2UgcHJvcGVydGllcyBhcmUgYXJyYXlzIG9mIHN0cmluZ3MgcmVwcmVzZW50aW5nICcgK1xuICAgICAgICAgICAgICAgICd0aGUgdHlwZW9mKGFyZ3VtZW50KSBmb3IgZWFjaCBhcmd1bWVudCwgaW4gdGhlIGV4YWN0IG9yZGVyICcgK1xuICAgICAgICAgICAgICAgICdpbiB3aGljaCB0aGV5IHdpbGwgYmUgZ2l2ZW4gdG8gdGhlIGZ1bmN0aW9uLiBVc2luZyBtdWx0aXBsZSAnICtcbiAgICAgICAgICAgICAgICAncHJvcGVydGllcyBpdCBpcyBwb3NzaWJsZSB0byBkZWZpbmUgYWx0ZXJuYXRpdmUgYWNjZXB0YWJsZSAnICtcbiAgICAgICAgICAgICAgICAnYXJndW1lbnQgdHlwZSBzZXRzLiBVc2UgZ2V0QXJnVHlwZXMoYXJndW1lbnRzKSBhcyBhICcgK1xuICAgICAgICAgICAgICAgICdjb252ZW5pZW50IHdheSBvZiBnZXR0aW5nIHRoZSBhcnJheSB5b3Ugd2FudCB0byBoYXJkIGNvZGUgJyArXG4gICAgICAgICAgICAgICAgJ2luIGZvciB2YWxpZGF0aW9uLiBFeGFtcGxlOiB2YXIgdHlwZXNPYmogPSAnICtcbiAgICAgICAgICAgICAgICAneyBcIm1lc3NhZ2VJbmNsdWRlZFwiIDogW1wic3RyaW5nXCIsIFwiZnVuY3Rpb25cIiwgXCJudW1iZXJcIl0sICcgK1xuICAgICAgICAgICAgICAgICdcIm1lc3NhZ2VOb3RJbmNsdWRlZFwiIDogW1wib2JqZWN0XCIsIFwiZnVuY3Rpb25cIiwgXCJudW1iZXJcIl0gfTsnXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoZXhwZWN0ZWRUeXBlcyBpbiBleHBlY3RlZEFyZ1R5cGVzKSB7XG4gICAgICAgICAgICBpZiAoZXhwZWN0ZWRBcmdUeXBlcy5oYXNPd25Qcm9wZXJ0eShleHBlY3RlZFR5cGVzKSkge1xuICAgICAgICAgICAgICAgIGlmIChjaGVja0FyZ3MoZXhwZWN0ZWRBcmdUeXBlc1tleHBlY3RlZFR5cGVzXSwgYXJncykpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGV4cGVjdGVkVHlwZXM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBhdHJvcGEuY3VzdG9tRXJyb3JzLkludmFsaWRBcmd1bWVudFR5cGVzRXJyb3IoXG4gICAgICAgICAgICAnaW52YWxpZCBhcmd1bWVudCB0eXBlIEAgYXRyb3BhLkFyZ3NJbmZvLmNoZWNrQXJnVHlwZXMnKTtcbiAgICB9O1xufTtcblxuXG5cblxud2hpbGUoYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLmxlbmd0aCA+IDApIHtcbiAgICBhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMucG9wKCkoKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gYXRyb3BhO1xuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2RvY3MvdnNkb2MvT3BlbkxheWVyc0FsbC5qc1wiLz5cbnZhciBhdHJvcGEgPSByZXF1aXJlKCdhdHJvcGEtaGVhZGVyJyk7XG4vKmpzbGludFxuICAgIGluZGVudDogNCxcbiAgICBtYXhlcnI6IDUwLFxuICAgIHdoaXRlOiB0cnVlLFxuICAgIGJyb3dzZXI6IHRydWUsXG4gICAgZGV2ZWw6IHRydWUsXG4gICAgcGx1c3BsdXM6IHRydWUsXG4gICAgcmVnZXhwOiB0cnVlXG4qL1xuLypnbG9iYWwgYXRyb3BhICovXG4vLyBlbmQgaGVhZGVyXG5cbi8qKlxuICogUHJvdmlkZXMgcmFuZG9tIHN0cmluZ3MgYW5kIG51bWJlcnMuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQHZlcnNpb24gMjAxMjA5MDlcbiAqIEBuYW1lc3BhY2UgUHJvdmlkZXMgcmFuZG9tIHN0cmluZ3MgYW5kIG51bWJlcnMuXG4gKi9cbmF0cm9wYS5yYW5kb20gPSB7fTtcbi8qKlxuICogR2l2ZXMgeW91IGEgcmFuZG9tIHN0cmluZyB3aG9zZSBsZW5ndGggYW5kIGNoYXJhY3RlcnMgeW91IHNwZWNpZnkuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQHZlcnNpb24gMjAxMjA5MDlcbiAqIEBwYXJhbSB7TnVtYmVyfSBzdHJpbmdMZW5ndGggVGhpcyBpcyB0aGUgbGVuZ3RoIG9mIHRoZSBzdHJpbmcuXG4gKiBAcGFyYW0ge1N0cmluZ30gY2hhcmFjdGVyQ2xhc3MgT3B0aW9uYWwuIE1heSBiZSBvbmUgb2Y6XG4gKiAgbnVtZXJpYywgY2FwcywgbG93ZXIsIGFscGhhLCBhbHBoYW51bWVyaWMsIHB1bmN0dWF0aW9uLCB2b3dlbCwgY29uc29uYW50XG4gKiAgVGhpcyBpcyB0aGUgdHlwZSBvZiBjaGFyYWN0ZXJzIHlvdSB3YW50IHJldHVybmVkIHRvIHlvdS4gRGVmYXVsdHMgdG9cbiAqICBhbHBoYW51bWVyaWMuXG4gKiBAcmV0dXJuIHtTdHJpbmd9IEEgcmFuZG9tIHN0cmluZyBvZiBzcGVjaWZpZWQgbGVuZ3RoIGFuZCBjb21wb3NpdGlvbi5cbiAqL1xuYXRyb3BhLnJhbmRvbS5zdHJpbmcgPSBmdW5jdGlvbiByYW5kb21TdHJpbmcoc3RyaW5nTGVuZ3RoLCBjaGFyYWN0ZXJDbGFzcykge1xuICAgICd1c2Ugc3RyaWN0JztcbiAgICB2YXIgbnVtZXJpYyxcbiAgICB2b3dlbCxcbiAgICBjb25zb25hbnQsXG4gICAgbG93ZXIsXG4gICAgY2FwcyxcbiAgICBhbHBoYSxcbiAgICBhbHBoYW51bWVyaWMsXG4gICAgcHVuY3R1YXRpb24sXG4gICAgY2hhcnMsXG4gICAgc3RyaW5nX2xlbmd0aCxcbiAgICByYW5kb21zdHJpbmcsXG4gICAgaSxcbiAgICBjaGFyYWN0ZXI7XG4gICAgXG4gICAgbnVtZXJpYyA9ICcwMTIzNDU2Nzg5JztcbiAgICB2b3dlbCA9ICdhZWlvdXknO1xuICAgIGNvbnNvbmFudCA9ICdiY2RmZ2hqa2xtbnBxcnN0dnd4eic7XG4gICAgbG93ZXIgPSB2b3dlbCArIGNvbnNvbmFudDtcbiAgICBjYXBzID0gbG93ZXIudG9VcHBlckNhc2UoKTtcbiAgICBhbHBoYSA9IGNhcHMgKyBsb3dlcjtcbiAgICBhbHBoYW51bWVyaWMgPSBudW1lcmljICsgY2FwcyArIGxvd2VyO1xuICAgIHB1bmN0dWF0aW9uID0gJy4/ISc7XG4gICAgcmFuZG9tc3RyaW5nID0gJyc7XG4gICAgc3dpdGNoIChjaGFyYWN0ZXJDbGFzcykge1xuICAgIGNhc2UgJ251bWVyaWMnOlxuICAgICAgICBjaGFycyA9IG51bWVyaWM7XG4gICAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2NhcHMnOlxuICAgICAgICBjaGFycyA9IGNhcHM7XG4gICAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2xvd2VyJzpcbiAgICAgICAgY2hhcnMgPSBsb3dlcjtcbiAgICAgICAgYnJlYWs7XG4gICAgY2FzZSAnYWxwaGEnOlxuICAgICAgICBjaGFycyA9IGFscGhhO1xuICAgICAgICBicmVhaztcbiAgICBjYXNlICdhbHBoYW51bWVyaWMnOlxuICAgICAgICBjaGFycyA9IGFscGhhbnVtZXJpYztcbiAgICAgICAgYnJlYWs7XG4gICAgY2FzZSAncHVuY3R1YXRpb24nOlxuICAgICAgICBjaGFycyA9IHB1bmN0dWF0aW9uO1xuICAgICAgICBicmVhaztcbiAgICBjYXNlICd2b3dlbCc6XG4gICAgICAgIGNoYXJzID0gdm93ZWw7XG4gICAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2NvbnNvbmFudCc6XG4gICAgICAgIGNoYXJzID0gY29uc29uYW50O1xuICAgICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgICBjaGFycyA9IGFscGhhbnVtZXJpYztcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGlmIChzdHJpbmdMZW5ndGggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBzdHJpbmdfbGVuZ3RoID0gNDtcbiAgICB9IGVsc2Uge1xuICAgICAgICBzdHJpbmdfbGVuZ3RoID0gc3RyaW5nTGVuZ3RoO1xuICAgIH1cbiAgICBmb3IgKGkgPSAwOyBpIDwgc3RyaW5nX2xlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNoYXJhY3RlciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGNoYXJzLmxlbmd0aCk7XG4gICAgICAgIHJhbmRvbXN0cmluZyArPSBjaGFyc1tjaGFyYWN0ZXJdO1xuICAgIH1cbiAgICByZXR1cm4gcmFuZG9tc3RyaW5nO1xufTtcbi8qKlxuICogR2VuZXJhdGVzIGEgcmFuZG9tIG51bWJlciBiZXR3ZWVuIHRoZSBzcGVjaWZpZWQgbWluIGFuZCBtYXggdmFsdWUuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQHZlcnNpb24gMjAxMjA5MDlcbiAqIEBwYXJhbSB7TnVtYmVyfSBtaW4gVGhlIGxvd2VzdCBudW1iZXIgeW91IHdhbnQgcmV0dXJuZWRcbiAqIEBwYXJhbSB7TnVtYmVyfSBtYXggVGhlIGhpZ2hlc3QgbnVtYmVyIHlvdSB3YW50IHJldHVybmVkXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBBIHJhbmRvbSBudW1iZXIgd2l0aGluIHRoZSBzcGVjaWZpZWQgcmFuZ2UuXG4gKi9cbmF0cm9wYS5yYW5kb20uaW50ZWdlciA9IGZ1bmN0aW9uIHJhbmRvbUludGVnZXIobWluLCBtYXgpIHtcbiAgICAndXNlIHN0cmljdCc7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSArIG1pbik7XG59O1xuLyoqXG4gKiBHZXQgYSByYW5kb20gcHJvcGVydHkgbmFtZSBmcm9tIHRoZSBnaXZlbiBvYmplY3QuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQHZlcnNpb24gMjAxMjA5MDlcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogVGhlIG9iamVjdCB0byBzZWxlY3QgYSByYW5kb21cbiAqICBwcm9wZXJ0eSBuYW1lIGZyb20uXG4gKiBAcmV0dXJuIHtTdHJpbmd9IEEgcmFuZG9tIHByb3BlcnR5IG5hbWUgZnJvbSB0aGVcbiAqICBnaXZlbiBvYmplY3QuXG4gKi9cbmF0cm9wYS5yYW5kb20uZ2V0UHJvcGVydHlOYW1lID0gZnVuY3Rpb24gKG9iaikge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIHZhciBhcnI7XG4gICAgYXJyID0gT2JqZWN0LmtleXMob2JqKTtcbiAgICByZXR1cm4gYXJyW2F0cm9wYS5yYW5kb20uZ2V0QXJyYXlLZXkoYXJyKV07XG59O1xuLyoqXG4gKiBHZXQgYSByYW5kb20ga2V5IGZyb20gdGhlIGdpdmVuIGFycmF5LlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAqIEB2ZXJzaW9uIDIwMTIwOTA5XG4gKiBAcGFyYW0ge0FycmF5fSBhcnIgVGhlIGFycmF5IHRvIHNlbGVjdCBhIHJhbmRvbVxuICogIGtleSBmcm9tLiBUaGUga2V5cyBvZiB0aGUgYXJyYXkgbXVzdCBiZSBjb250aWd1b3VzLlxuICogQHJldHVybiB7TnVtYmVyfSBBIHJhbmRvbSBpbnRlZ2VyIGJldHdlZW4gMCBhbmRcbiAqICA8Y29kZT5hcnIubGVuZ3RoPC9jb2RlPlxuICovXG5hdHJvcGEucmFuZG9tLmdldEFycmF5S2V5ID0gZnVuY3Rpb24gKGFycikge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBhcnIubGVuZ3RoKTtcbn07XG4vKipcbiAqIEdldCBhIHJhbmRvbSB2YWx1ZSBmcm9tIHRoZSBnaXZlbiBhcnJheS5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAdmVyc2lvbiAyMDEyMDkwOVxuICogQHBhcmFtIHtBcnJheX0gYXJyIFRoZSBhcnJheSB0byBzZWxlY3QgYSByYW5kb21cbiAqICB2YWx1ZSBmcm9tLiBUaGUga2V5cyBvZiB0aGUgYXJyYXkgbXVzdCBiZSBjb250aWd1b3VzLlxuICogQHJldHVybiB7TWl4ZWR9IEEgcmFuZG9tIHZhbHVlIGZyb20gdGhlIGdpdmVuIGFycmF5LlxuICovXG5hdHJvcGEucmFuZG9tLmdldEFycmF5VmFsdWUgPSBmdW5jdGlvbiAoYXJyKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgcmV0dXJuIGFyclthdHJvcGEucmFuZG9tLmdldEFycmF5S2V5KGFycildO1xufTtcbi8qKlxuICogUmVtb3ZlIGEgcmFuZG9tIGVsZW1lbnQgZnJvbSB0aGUgZ2l2ZW4gYXJyYXkuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQHZlcnNpb24gMjAxMjA5MDlcbiAqIEBwYXJhbSB7QXJyYXl9IGFyciBUaGUgYXJyYXkgdG8gcmVtb3ZlIGEgcmFuZG9tXG4gKiAgZWxlbWVudCBmcm9tLiBUaGUga2V5cyBvZiB0aGUgYXJyYXkgbXVzdCBiZSBjb250aWd1b3VzLlxuICogQHJldHVybiB7TWl4ZWR9IEEgcmFuZG9tIHZhbHVlIGZyb20gdGhlIGdpdmVuIGFycmF5LlxuICovXG5hdHJvcGEucmFuZG9tLnB1bGxBcnJheUVsZW1lbnQgPSBmdW5jdGlvbiAoYXJyKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgdmFyIGssXG4gICAgZDtcbiAgICBrID0gYXRyb3BhLnJhbmRvbS5nZXRBcnJheUtleShhcnIpO1xuICAgIGQgPSBhcnJba107XG4gICAgYXJyLnNwbGljZShrLCAxKTtcbiAgICByZXR1cm4gZDtcbn07XG4vKipcbiAqIFJlbW92ZSBhIHJhbmRvbSBwcm9wZXJ0eSBmcm9tIHRoZSBnaXZlbiBvYmplY3QuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQHZlcnNpb24gMjAxMjA5MDlcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogVGhlIG9iamVjdCB0byByZW1vdmUgYSByYW5kb21cbiAqICBwcm9wZXJ0eSBmcm9tLlxuICogQHJldHVybiB7TWl4ZWR9IEEgcmFuZG9tIHZhbHVlIGZyb20gdGhlIGdpdmVuIG9iamVjdC5cbiAqL1xuYXRyb3BhLnJhbmRvbS5wdWxsUHJvcGVydHkgPSBmdW5jdGlvbiAob2JqKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgdmFyIHBOYW1lLFxuICAgIG9iakRhdGE7XG4gICAgcE5hbWUgPSBhdHJvcGEucmFuZG9tLmdldFByb3BlcnR5TmFtZShvYmopO1xuICAgIG9iakRhdGEgPSBvYmpbcE5hbWVdO1xuICAgIGRlbGV0ZSBvYmpbcE5hbWVdO1xuICAgIHJldHVybiBvYmpEYXRhO1xufTtcblxuXG5cblxud2hpbGUoYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLmxlbmd0aCA+IDApIHtcbiAgICBhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMucG9wKCkoKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gYXRyb3BhO1xuIiwiYXJndW1lbnRzWzRdWzVdWzBdLmFwcGx5KGV4cG9ydHMsYXJndW1lbnRzKSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9kb2NzL3ZzZG9jL09wZW5MYXllcnNBbGwuanNcIi8+XG52YXIgYXRyb3BhID0gcmVxdWlyZSgnYXRyb3BhLWhlYWRlcicpO1xuLypqc2xpbnRcbiAgICBpbmRlbnQ6IDQsXG4gICAgbWF4ZXJyOiA1MCxcbiAgICB3aGl0ZTogdHJ1ZSxcbiAgICBicm93c2VyOiB0cnVlLFxuICAgIGRldmVsOiB0cnVlLFxuICAgIHBsdXNwbHVzOiB0cnVlLFxuICAgIHJlZ2V4cDogdHJ1ZVxuKi9cbi8qZ2xvYmFsIGF0cm9wYSAqL1xuLy8gZW5kIGhlYWRlclxuXG4vKipcbiAqIENvbnRhaW5lciBmb3IgcmVnZXggZnVuY3Rpb25zLlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAqIEB2ZXJzaW9uIDIwMTIwOTA5XG4gKiBAbmFtZXNwYWNlIENvbnRhaW5lciBmb3IgcmVnZXggZnVuY3Rpb25zLlxuICovXG5hdHJvcGEucmVnZXggPSB7fTtcbi8qKlxuICogUmVnZXggcGF0dGVybnNcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAbmFtZXNwYWNlIFJlZ2V4IHBhdHRlcm5zLlxuICovXG5hdHJvcGEucmVnZXgucGF0dGVybnMgPSB7XG4gICAgLyoqXG4gICAgICogZmluZHMgcmVwZWF0ZWQgd29yZHMgYW5kIHBocmFzZXNcbiAgICAgKiBAdHlwZSBSZWdFeHBcbiAgICAgKi9cbiAgICByZXBlYXRlZFdvcmRzIDogLyhcXGIuezMsfVxcYilcXHMqKFxcMSkvZyxcbiAgICAvKipcbiAgICAgKiBmaW5kcyBwYXJhZ3JhcGggYnJlYWtzXG4gICAgICogQHR5cGUgUmVnRXhwXG4gICAgICovXG4gICAgcGFyYWdyYXBoQnJlYWtzIDogLyhcXHJcXG5cXHJcXG58XFxuXFxufFxcclxccikvZyxcbiAgICAvKipcbiAgICAgKiBmaW5kcyBsaW5lIGJyZWFrc1xuICAgICAqIEB0eXBlIFJlZ0V4cFxuICAgICAqL1xuICAgIGxpbmVCcmVha3MgOiAvKFxcclxcbnxcXHJ8XFxuKS9nXG59O1xuLyoqXG4gKiBBcHBlbmRzIGNvbW1vbiBwcmVmaXgsIHN1ZmZpeCwgYW5kIHdvcmQgYm91bmRhcnkgcmVnZXggc3RyaW5ncyB0b1xuICogdGhlIHN1cHBsaWVkIHdvcmQuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQHZlcnNpb24gMjAxMzAxMTBcbiAqIEBwYXJhbSB7U3RyaW5nfSB3b3JkIFRoZSB3b3JkIHRvIGFwcGVuZCBwcmVmaXggYW5kIHN1ZmZpeCB0b1xuICogQHBhcmFtIHtJbnRlZ2VyfSB0aHJlc2hvbGQgVGhlIHdvcmQubGVuZ3RoIGF0IHdoaWNoIGl0IGRvZXMgbm90XG4gKiBtYWtlIHNlbnNlIHRvIGFwcGVuZCBwcmVmaXggYW5kIHN1ZmZpeC4gRGVmYXVsdHMgdG8gMy5cbiAqIEByZXR1cm5zIHtTdHJpbmd9IFJldHVybnMgdGhlIHN1cHBsaWVkIHdvcmQgd2l0aCBwcmVmaXgsIHN1ZmZpeCxcbiAqIGFuZCB3b3JkIGJvdW5kYXJpZXMgYXR0YWNoZWQuIElmIHRoZSB3b3JkLmxlbmd0aCB3YXMgbm90IGdyZWF0ZXJcbiAqIHRoYW4gdGhlIHRocmVzaG9sZCwgb25seSB3b3JkIGJvdW5kYXJpZXMgYXJlIGF0dGFjaGVkLiBUaGUgc3RyaW5nXG4gKiByZXByZXNlbnRzIGEgUmVnRXggd2hpY2ggc2hvdWxkIHBpY2sgb3V0IG1vc3QgZm9ybXMgb2YgcmVndWxhclxuICogd29yZHMuXG4gKi9cbmF0cm9wYS5yZWdleC5hcHBlbmRQcmVmaXhlc0FuZFN1ZmZpeGVzID0gZnVuY3Rpb24gKHdvcmQsIHRocmVzaG9sZCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIHZhciBwcmVmaXhlcyxcbiAgICBzdWZmaXhlcztcbiAgICBwcmVmaXhlcyA9ICcocHJlfHVufHJlKT8nO1xuICAgIHN1ZmZpeGVzID0gJyhpZmljYXRpb258JyArXG4gICAgICAgICAgICAgICAgJ3Rpb25hbGx5fCcgK1xuICAgICAgICAgICAgICAgICdpY2F0aW9ufCcgK1xuICAgICAgICAgICAgICAgICdpZmllZHxpc3RpY3xpbmVzc3wnICtcbiAgICAgICAgICAgICAgICAnZmFyZXx0aW9ufGFuY2V8ZW5jZXxsZXNzfGFsbHl8YWJsZXxuZXNzfGl6ZWR8aXNlZHwnICtcbiAgICAgICAgICAgICAgICAnb3VzfGlmeXxpbmd8aXR5fGZ1bHxhbnR8YXRlfGVzdHxpc218aXptfGlzdHwnICtcbiAgICAgICAgICAgICAgICAnaWN8YWx8ZWR8ZXJ8ZXR8bHl8cnN8aW58JyArXG4gICAgICAgICAgICAgICAgJ3l8c3xyfGQpPyc7XG4gICAgXG4gICAgdGhyZXNob2xkID0gdGhyZXNob2xkID09PSB1bmRlZmluZWQgPyAzIDogdGhyZXNob2xkO1xuICAgIFxuICAgIGlmICh3b3JkLmxlbmd0aCA+IHRocmVzaG9sZCkge1xuICAgICAgICB3b3JkID0gJ1xcXFxiJyArIHByZWZpeGVzICsgd29yZCArIHN1ZmZpeGVzICsgJ1xcXFxiJztcbiAgICB9IGVsc2Uge1xuICAgICAgICB3b3JkID0gJ1xcXFxiKCknICsgd29yZCArICcoKVxcXFxiJztcbiAgICB9XG4gICAgcmV0dXJuIHdvcmQ7XG59O1xuXG5cblxuXG53aGlsZShhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMubGVuZ3RoID4gMCkge1xuICAgIGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5wb3AoKSgpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBhdHJvcGE7XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vZG9jcy92c2RvYy9PcGVuTGF5ZXJzQWxsLmpzXCIvPlxudmFyIGF0cm9wYSA9IHJlcXVpcmUoJ2F0cm9wYS1oZWFkZXInKTtcbmF0cm9wYS5yZWdleCA9IHJlcXVpcmUoJ2F0cm9wYS1yZWdleCcpLnJlZ2V4O1xuYXRyb3BhLmFycmF5cyA9IHJlcXVpcmUoJ2F0cm9wYS1hcnJheXMnKS5hcnJheXM7XG4vKmpzbGludFxuICAgIGluZGVudDogNCxcbiAgICBtYXhlcnI6IDUwLFxuICAgIHdoaXRlOiB0cnVlLFxuICAgIGJyb3dzZXI6IHRydWUsXG4gICAgZGV2ZWw6IHRydWUsXG4gICAgcGx1c3BsdXM6IHRydWUsXG4gICAgcmVnZXhwOiB0cnVlXG4qL1xuLypnbG9iYWwgYXRyb3BhICovXG4vLyBlbmQgaGVhZGVyXG5cbi8qKlxuICogQSBmZXcgdXRpbGl0aWVzIGZvciBtYW5pcHVsYXRpbmcgc3RyaW5ncy5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAbmFtZXNwYWNlIEEgZmV3IHV0aWxpdGllcyBmb3IgbWFuaXB1bGF0aW5nIHN0cmluZ3MuXG4gKiBAcmVxdWlyZXMgYXRyb3BhLnJlZ2V4LnBhdHRlcm5zXG4gKi9cbmF0cm9wYS5zdHJpbmcgPSB7fTtcbi8qKlxuICogUmVwbGFjZXMgcmVwZWF0ZWQgd29yZHMgYW5kIHBocmFzZXMgd2l0aCBhIHNpbmdsZSB3b3JkIG9yIHBocmFzZS5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAdmVyc2lvbiAyMDEzMDcwMVxuICogQHBhcmFtIHtTdHJpbmd9IHN0cmluZyBUaGUgc3RyaW5nIHRvIHJlbW92ZSByZXBlYXRlZCB3b3JkcyBmcm9tLlxuICogQHJldHVybnMge1N0cmluZ30gUmV0dXJucyB0aGUgZ2l2ZW4gc3RyaW5nIHdpdGggcmVwZWF0ZWQgd29yZHMgYW5kXG4gKiAgcGhyYXNlcyByZW1vdmVkLlxuICovXG5hdHJvcGEuc3RyaW5nLnJlbW92ZVJlcGVhdGVkV29yZCA9IGZ1bmN0aW9uIHJlbW92ZVJlcGVhdGVkV29yZCAoc3RyaW5nKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKGF0cm9wYS5yZWdleC5wYXR0ZXJucy5yZXBlYXRlZFdvcmRzLCAnJDEnKTtcbn07XG4vKipcbiAqIENyZWF0ZXMgcGFyYWdyYXBoIGJyZWFrcyBhdCBldmVyeSBvY2N1cnJlbmNlIG9mIHR3byBjb25zZWN1dGl2ZSBsaW5lIGJyZWFrcy5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAdmVyc2lvbiAyMDEzMDcwMVxuICogQHBhcmFtIHtTdHJpbmd9IHN0cmluZyBUaGUgc3RyaW5nIHRvIGluc2VydCBwYXJhZ3JhcGggdGFncyBpbnRvLlxuICogQHJldHVybnMge1N0cmluZ30gUmV0dXJucyB0aGUgZ2l2ZW4gc3RyaW5nIHdpdGggcGFyYWdyYXBoIGJyZWFrcyBpbnNlcnRlZC5cbiAqL1xuYXRyb3BhLnN0cmluZy5saW5lQnJlYWtzVG9QYXJhZ3JhcGhUYWdzID0gZnVuY3Rpb24gbGluZUJyZWFrc1RvUGFyYWdyYXBoVGFncyAoc3RyaW5nKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgdmFyIG91dCA9IHN0cmluZy5yZXBsYWNlKGF0cm9wYS5yZWdleC5wYXR0ZXJucy5wYXJhZ3JhcGhCcmVha3MsICc8L3A+PHA+Jyk7XG4gICAgb3V0ID0gJzxwPicgKyBvdXQudHJpbSgpICsgJzwvcD4nO1xuICAgIG91dCA9IG91dC5yZXBsYWNlKC9cXHMrPFxcLyhwfGJyKT4vZywgJzwvJDE+Jyk7XG4gICAgcmV0dXJuIG91dDtcbn07XG4vKipcbiAqIENyZWF0ZXMgYnJlYWsgdGFncyBhdCBldmVyeSBsaW5lIGJyZWFrLlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAqIEB2ZXJzaW9uIDIwMTMwNzAxXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nIFRoZSBzdHJpbmcgdG8gaW5zZXJ0IGJyZWFrIHRhZ3MgaW50by5cbiAqIEByZXR1cm5zIHtTdHJpbmd9IFJldHVybnMgdGhlIGdpdmVuIHN0cmluZyB3aXRoIGJyZWFrIHRhZ3MgaW5zZXJ0ZWQuXG4gKi9cbmF0cm9wYS5zdHJpbmcubGluZUJyZWFrc1RvQnJlYWtUYWdzID0gZnVuY3Rpb24gbGluZUJyZWFrc1RvQnJlYWtUYWdzIChzdHJpbmcpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoYXRyb3BhLnJlZ2V4LnBhdHRlcm5zLmxpbmVCcmVha3MsICc8YnI+Jyk7XG59O1xuLyoqXG4gKiBOb3JtYWxpemVzIGxpbmUgYnJlYWtzIHRvIGBcXG5gLlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAqIEB2ZXJzaW9uIDIwMTMwNzAxXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nIFRoZSBzdHJpbmcgdG8gbm9ybWFsaXplLlxuICogQHJldHVybnMge1N0cmluZ30gUmV0dXJucyB0aGUgZ2l2ZW4gc3RyaW5nIHdpdGggbm9ybWFsaXplZCBsaW5lIGJyZWFrcy5cbiAqL1xuYXRyb3BhLnN0cmluZy5ub3JtYWxpemVFb2wgPSBmdW5jdGlvbiBub3JtYWxpemVFb2wgKHN0cmluZykge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIHJldHVybiBzdHJpbmcucmVwbGFjZShhdHJvcGEucmVnZXgucGF0dGVybnMubGluZUJyZWFrcywgJ1xcbicpO1xufTtcbi8qKlxuICogQ29udmVydHMgdGhlIGZpcnN0IGNoYXJhY3RlciBvZiBhIGdpdmVuIHN0cmluZyB0b1xuICogdXBwZXJjYXNlLlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAqIEB2ZXJzaW9uIDIwMTIwOTA5XG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nIFRoZSBzdHJpbmcgZm9yIHdoaWNoIHlvdSB3YW50IHRoZVxuICogZmlyc3QgbGV0dGVyIHRvIGJlIGluIHVwcGVyIGNhc2UuXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgZ2l2ZW4gc3RyaW5nIHdpdGggaXQncyBmaXJzdCBsZXR0ZXIgY2FwaXRhbGl6ZWQuXG4gKi9cbmF0cm9wYS5zdHJpbmcudWNGaXJzdCA9IGZ1bmN0aW9uIHVjRmlyc3Qoc3RyaW5nKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgc3RyaW5nID0gc3RyaW5nLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3RyaW5nLnNsaWNlKDEpO1xuICAgIHJldHVybiBzdHJpbmc7XG59O1xuLyoqXG4gKiBDb252ZXJ0cyB0aGUgZ2l2ZW4gc3RyaW5nIHRvIGNhbWVsIGNhc2UuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQHZlcnNpb24gMjAxMzA4MjNcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmcgVGhlIHN0cmluZyB0byBjYW1lbGl6ZS5cbiAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBjYW1lbGl6ZWQgc3RyaW5nLlxuICogQGV4YW1wbGVcbiAqICBhdHJvcGEuc3RyaW5nLmNhbWVsaXplKCdnZXQgaXQgdG9nZXRoZXInKTtcbiAqICAvLyByZXR1cm5zIFwiZ2V0SXRUb2dldGhlclwiXG4gKi9cbmF0cm9wYS5zdHJpbmcuY2FtZWxpemUgPSBmdW5jdGlvbiBjYW1lbGl6ZSAoc3RyKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgdmFyIGFyciwgb3V0O1xuICAgIGFyciA9IHN0ci5zcGxpdCgnICcpO1xuICAgIG91dCA9IGFyci5zaGlmdCgpO1xuICAgIGFyciA9IGFyci5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgcmV0dXJuIGF0cm9wYS5zdHJpbmcudWNGaXJzdChpdGVtKTtcbiAgICB9KTtcbiAgICBvdXQgKz0gYXJyLmpvaW4oJycpO1xuICAgIHJldHVybiBvdXQ7XG59O1xuLyoqXG4gKiBDb3VudHMgd29yZHMuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQHZlcnNpb24gMjAxMzAzMTNcbiAqIEBwYXJhbSB7U3RyaW5nfSBzb21lVGV4dCBQbGFpbiB0ZXh0LlxuICogQHJldHVybiB7TnVtYmVyfSBSZXR1cm5zIHRoZSBjb3VudCBvZiB3b3JkcyBpbiBzb21lVGV4dC5cbiAqL1xuYXRyb3BhLnN0cmluZy5jb3VudFdvcmRzID0gZnVuY3Rpb24gY291bnRXb3Jkcyhzb21lVGV4dCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIHZhciB3b3JkQ291bnQsIHJlLCBsZW4gPSAwO1xuICAgIGlmKHNvbWVUZXh0ICE9PSB1bmRlZmluZWQgJiYgc29tZVRleHQgIT09IG51bGwpIHtcbiAgICAgICAgc29tZVRleHQgPSBzb21lVGV4dC50cmltKCk7XG4gICAgICAgIGlmKHNvbWVUZXh0ICE9PSAnJykge1xuICAgICAgICAgICAgd29yZENvdW50ID0gMDtcbiAgICAgICAgICAgIHJlID0gL1xccysvZ2k7XG4gICAgICAgICAgICB3b3JkQ291bnQgPSBzb21lVGV4dC5zcGxpdChyZSk7XG4gICAgICAgICAgICBsZW4gPSB3b3JkQ291bnQubGVuZ3RoO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBsZW47XG59O1xuLyoqXG4gKiBDb252ZXJ0cyBlbmQgb2YgbGluZSBtYXJrZXJzIGludG8gd2hhdGV2ZXIgeW91IHdhbnQuIFxuICogQXV0b21hdGljYWxseSBkZXRlY3RzIGFueSBvZiBcXHJcXG4sIFxcbiwgb3IgXFxyIGFuZCBcbiAqIHJlcGxhY2VzIGl0IHdpdGggdGhlIHVzZXIgc3BlY2lmaWVkIEVPTCBtYXJrZXIuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQHBhcmFtIHtTdHJpbmd9IHRleHQgVGhlIHRleHQgeW91IHdhbnQgcHJvY2Vzc2VkLlxuICogQHBhcmFtIHtTdHJpbmd9IG5ld0VPTCBUaGUgcmVwbGFjZW1lbnQgZm9yIHRoZSBjdXJyZW50IEVPTCBtYXJrcy5cbiAqIEByZXR1cm5zIHtTdHJpbmd9IFJldHVybnMgdGhlIHByb2Nlc3NlZCB0ZXh0LlxuICovXG5hdHJvcGEuc3RyaW5nLmNvbnZlcnRFb2wgPSBmdW5jdGlvbiBjb252ZXJ0RU9MKHRleHQsIG5ld0VPTCkge1xuICAgICd1c2Ugc3RyaWN0JztcbiAgICByZXR1cm4gdGV4dC5yZXBsYWNlKGF0cm9wYS5yZWdleC5wYXR0ZXJucy5saW5lQnJlYWtzLCBuZXdFT0wpO1xufTtcblxuLyoqXG4gKiBSZW1vdmVzIGEgcXVhbnRpdHkgb2YgbGVhZGluZyBzcGFjZXMgc3BlY2lmaWVkIGJ5IG9mZnNldC5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAcGFyYW0ge1N0cmluZ30gdGV4dCBUaGUgdGV4dCB0byBwcm9jZXNzLlxuICogQHBhcmFtIHtOdW1iZXJ9IG9mZnNldCBUaGUgYW1vdW50IG9mIHNwYWNlcyB5b3Ugd2FudCByZW1vdmVkIFxuICogZnJvbSB0aGUgYmVnaW5uaW5nIG9mIHRoZSB0ZXh0LlxuICogQHJldHVybnMgUmV0dXJucyB0aGUgcHJvY2Vzc2VkIHRleHQuXG4gKi9cbmF0cm9wYS5zdHJpbmcub2Zmc2V0V2hpdGVTcGFjZSA9IGZ1bmN0aW9uIG9mZnNldFdoaXRlU3BhY2UodGV4dCwgb2Zmc2V0KSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuICAgIHZhciByZWd4O1xuICAgIHJlZ3ggPSBuZXcgUmVnRXhwKCdeIHsnICsgb2Zmc2V0ICsgJ30nKTtcbiAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKHJlZ3gsICcnKTtcbiAgICByZXR1cm4gdGV4dDtcbn07XG5cbi8qKlxuICogQ29udmVydHMgYWxsIHRhYnMgaW4gbGVhZGluZyB3aGl0ZXNwYWNlIGludG8gZm91ciBzcGFjZXMuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQHBhcmFtIHtTdHJpbmd9IHRleHQgVGhlIHRleHQgdG8gcHJvY2Vzc1xuICogQHJldHVybnMge1N0cmluZ30gUmV0dXJucyB0aGUgcHJvY2Vzc2VkIHRleHQuXG4gKi9cbmF0cm9wYS5zdHJpbmcubm9ybWFsaXplV2hpdGVTcGFjZVByZWZpeCA9IGZ1bmN0aW9uIG5vcm1hbGl6ZVdoaXRlU3BhY2VQcmVmaXgoXG4gICAgdGV4dFxuKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuICAgIHZhciBwcmVmaXggPSB0ZXh0Lm1hdGNoKC9eXFxzKi8pO1xuICAgIGlmKHByZWZpeCkge1xuICAgICAgICBwcmVmaXggPSBwcmVmaXhbMF07XG4gICAgICAgIHByZWZpeCA9IHByZWZpeC5yZXBsYWNlKC9cXHQvZywgJyAgICAnKTtcbiAgICAgICAgdGV4dCA9IHRleHQucmVwbGFjZSgvXlxccyovLCBwcmVmaXgpO1xuICAgIH1cbiAgICByZXR1cm4gdGV4dDtcbn07XG5cbi8qKlxuICogQ29udmVydHMgYWxsIHRhYnMgaW50byBmb3VyIHNwYWNlcy5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAcGFyYW0ge1N0cmluZ30gdGV4dCBUaGUgdGV4dCB0byBwcm9jZXNzXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBSZXR1cm5zIHRoZSBwcm9jZXNzZWQgdGV4dC5cbiAqL1xuYXRyb3BhLnN0cmluZy5ub3JtYWxpemVXaGl0ZVNwYWNlID0gZnVuY3Rpb24gbm9ybWFsaXplV2hpdGVTcGFjZSh0ZXh0KSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuICAgIHRleHQgPSB0ZXh0LnJlcGxhY2UoL1xcdC9nLCAnICAgICcpO1xuICAgIHJldHVybiB0ZXh0O1xufTtcblxuLyoqXG4gKiBDb3VudHMgdGhlIG51bWJlciBvZiBsZWFkaW5nIHNwYWNlIG9yIHRhYiBjaGFyYWN0ZXJzIGJ1dCBub3QgYm90aC5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAcGFyYW0ge1N0cmluZ30gdGV4dCBUaGUgdGV4dCB0byBhbmFseXplLlxuICogQHJldHVybnMge051bWJlcn0gUmV0dXJucyB0aGUgcXVhbnRpdHkgb2YgbGVhZGluZyBzcGFjZXMgb3IgdGFicy5cbiAqL1xuYXRyb3BhLnN0cmluZy5nZXRPZmZzZXQgPSBmdW5jdGlvbiBnZXRPZmZzZXQodGV4dCkge1xuICAgICd1c2Ugc3RyaWN0JztcbiAgICB2YXIgb2Zmc2V0ID0gMCxcbiAgICAgICAgbGVhZGluZ0NoYXIgPSB0ZXh0LmNoYXJBdCgwKTtcbiAgICAgICAgXG4gICAgaWYoIGxlYWRpbmdDaGFyID09PSAnICcgfHwgbGVhZGluZ0NoYXIgPT09ICdcXHQnKSB7XG4gICAgICAgIHdoaWxlKHRleHQuY2hhckF0KG9mZnNldCkgPT09IGxlYWRpbmdDaGFyICYmIG9mZnNldCA8IHRleHQubGVuZ3RoKSB7XG4gICAgICAgICAgICBvZmZzZXQrKztcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb2Zmc2V0O1xufTtcbi8qKlxuICogQnJlYWtzIGEgc3RyaW5nIGludG8gYW4gYXJyYXkgb2Ygd29yZHMuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQHZlcnNpb24gMjAxMzAxMThcbiAqIEBwYXJhbSB7U3RyaW5nfSB0ZXh0IFRoZSB0ZXh0IHRvIGFuYWx5emUuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYW4gYXJyYXkgb2YgdGhlIHdvcmRzIGluXG4gKiAgdGhlIGdpdmVuIHRleHQuXG4gKiBAcmVxdWlyZXMgYXRyb3BhLmFycmF5cy5yZW1vdmVFbXB0eUVsZW1lbnRzXG4gKi9cbmF0cm9wYS5zdHJpbmcuZ2V0V29yZHMgPSBmdW5jdGlvbiAodGV4dCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIHZhciBvdXQgPSBbXTtcbiAgICBmdW5jdGlvbiBpbnZhbGlkQ2hhcnMoZWxlbWVudCkge1xuICAgICAgICB2YXIgbWF0Y2hlZCA9IC9eW1xcLSfigJlgXSskLy50ZXN0KGVsZW1lbnQpO1xuICAgICAgICAvLyBpbnZlcnQgdGhlIHJlc3VsdCBvZiB0ZXN0LiB0aHJvdyBvdXQgZWxlbWVudHMgdGhhdCBtYXRjaC5cbiAgICAgICAgcmV0dXJuICFtYXRjaGVkO1xuICAgIH1cbiAgICBvdXQgPSBhdHJvcGEuYXJyYXlzLnJlbW92ZUVtcHR5RWxlbWVudHMoXG4gICAgICAgIHRleHQuc3BsaXQoL1teQS1aYS16XFwtJ+KAmWBdKy9naSlcbiAgICApO1xuICAgIG91dCA9IG91dC5maWx0ZXIoaW52YWxpZENoYXJzKTtcbiAgICByZXR1cm4gb3V0O1xufTtcbi8qKlxuICogRXNjYXBlcyA8Y29kZT5DREFUQTwvY29kZT4gc2VjdGlvbnMgaW4gdGV4dFxuICogIHNvIHRoYXQgdGhlIHRleHQgbWF5IGJlIGVtYmVkZGVkIGludG8gYSBcbiAqICA8Y29kZT5DREFUQTwvY29kZT4gc2VjdGlvbi4gVGhpcyBzaG91bGQgYmUgcnVuXG4gKiAgb24gYW55IHRleHQgd2hpY2ggbWF5IGNvbnRhaW4gdGhlIHN0cmluZyBcbiAqICA8Y29kZT5dXT48L2NvZGU+IHNpbmNlIHNhaWQgc3RyaW5nIHdpbGwgZWZmZWN0aXZlbHlcbiAqICBlbmQgdGhlIDxjb2RlPkNEQVRBPC9jb2RlPiBzZWN0aW9uIHByZW1hdHVyZWx5LlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAqIEB2ZXJzaW9uIDIwMTMwMTE4XG4gKiBAcGFyYW0ge1N0cmluZ30gdGV4dCBUaGUgdGV4dCBjb250YWluaW5nIFxuICogIDxjb2RlPkNEQVRBPC9jb2RlPiBzZWN0aW9ucyB0byBlc2NhcGUuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYSBzdHJpbmcgd2l0aCBlc2NhcGVkXG4gKiAgPGNvZGU+Q0RBVEE8L2NvZGU+IHNlY3Rpb25zLlxuICogQHNlZSA8YSBocmVmPVwiaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9DREFUQSNOZXN0aW5nXCI+XG4gKiAgaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9DREFUQSNOZXN0aW5nPC9hPlxuICogQHNlZSA8YSBocmVmPVwiaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9OTgxNjhcIj5cbiAqICBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD05ODE2ODwvYT5cbiAqL1xuYXRyb3BhLnN0cmluZy5lc2NhcGVDZGF0YSA9IGZ1bmN0aW9uIGVzY2FwZUNkYXRhKHRleHQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICByZXR1cm4gU3RyaW5nKHRleHQpLnJlcGxhY2UoL1xcXVxcXT4vZywgJ11dXV0+PCFbQ0RBVEFbPicpO1xufTtcblxuXG5cblxud2hpbGUoYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLmxlbmd0aCA+IDApIHtcbiAgICBhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMucG9wKCkoKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gYXRyb3BhO1xuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2RvY3MvdnNkb2MvT3BlbkxheWVyc0FsbC5qc1wiLz5cbnZhciBhdHJvcGEgPSByZXF1aXJlKCdhdHJvcGEtaGVhZGVyJyk7XG5hdHJvcGEucmFuZG9tID0gcmVxdWlyZSgnYXRyb3BhLXJhbmRvbScpLnJhbmRvbTtcbmF0cm9wYS5zdHJpbmcgPSByZXF1aXJlKCdhdHJvcGEtc3RyaW5nJykuc3RyaW5nO1xuLypqc2xpbnRcbiAgICBpbmRlbnQ6IDQsXG4gICAgbWF4ZXJyOiA1MCxcbiAgICB3aGl0ZTogdHJ1ZSxcbiAgICBicm93c2VyOiB0cnVlLFxuICAgIGRldmVsOiB0cnVlLFxuICAgIHBsdXNwbHVzOiB0cnVlLFxuICAgIHJlZ2V4cDogdHJ1ZVxuKi9cbi8qZ2xvYmFsIGF0cm9wYSAqL1xuLy8gZW5kIGhlYWRlclxuXG5hdHJvcGEucmVxdWlyZXMoXG4gICAgJ0JhYmJsZXInLFxuICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgICAgIHZhciBzdXBwb3J0ZWQgPSB0cnVlO1xuICAgICAgICBcbiAgICAgICAgW1xuICAgICAgICAgICAgYXRyb3BhLnJhbmRvbS5pbnRlZ2VyLFxuICAgICAgICAgICAgYXRyb3BhLnN0cmluZy51Y0ZpcnN0LFxuICAgICAgICAgICAgYXRyb3BhLnJhbmRvbS5zdHJpbmdcbiAgICAgICAgXS5mb3JFYWNoKGZ1bmN0aW9uIChwcmVyZXF1aXNpdGUpIHtcbiAgICAgICAgICAgIGlmKHByZXJlcXVpc2l0ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgc3VwcG9ydGVkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gc3VwcG9ydGVkO1xuICAgIH1cbik7XG5cbi8qKlxuICogVGhpcyBjbGFzcyByZXByZXNlbnRzIGEgYmFiYmxlci4gVGhlIGJhYmJsZXJcbiAqIHByb2R1Y2VzIGxvcnVtIGlwc3VtIHRleHQsIHRvIHVzZXIgc3BlY2lmaWNhdGlvbnMuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQHZlcnNpb24gMjAxMzAzMTNcbiAqIEBjbGFzcyBUaGlzIGNsYXNzIHJlcHJlc2VudHMgYSBiYWJibGVyXG4gKiBAcGFyYW0ge051bWJlcn0gd3JkQ291bnQgVGhlIGFtb3VudCBvZiBcIndvcmRzXCIgeW91IHdvdWxkIGxpa2VcbiAqIHRoZSBiYWJibGVyIHRvIHByb2R1Y2UuXG4gKiBAcmV0dXJucyB7QmFiYmxlcn0gUmV0dXJucyBhIGJhYmJsZXIuXG4gKiBAcmVxdWlyZXMgYXRyb3BhLnJhbmRvbS5pbnRlZ2VyXG4gKiBAcmVxdWlyZXMgYXRyb3BhLnN0cmluZy51Y0ZpcnN0XG4gKiBAcmVxdWlyZXMgYXRyb3BhLnJhbmRvbS5zdHJpbmdcbiAqIEBleGFtcGxlXG4gKiB2YXIgYmFiYmxlciA9IG5ldyBhdHJvcGEuQmFiYmxlcigzMCk7XG4gKiAvLyByZXNldHMgdGhlIHdvcmQgY291bnRcbiAqIGJhYmJsZXIucmVzZXRXb3JkQ291bnQoMTApXG4gKiBjb25zb2xlLmxvZyhiYWJibGVyLmdldFdvcmRDb3VudCgpKTtcbiAqIFxuICogLy8gZGlzcGxheXMgYSAxMCB3b3JkIHNlbnRlbmNlIG9mIG5vbnNlbnNlIHdvcmRzLlxuICogY29uc29sZS5sb2coYmFiYmxlci5nZW5lcmF0ZUJhYmJsZSgxMCkpO1xuICogLy8gZGlzcGxheXMgYSAzIHdvcmQgc2VudGVuY2VcbiAqIGNvbnNvbGUubG9nKGJhYmJsZXIuZ2VuZXJhdGVCYWJibGUoMykpO1xuICogXG4gKiAvLyBkaXNwbGF5cyB0aGUgdXNlciBzdG9yZWQgb3IgbGFzdCBnZW5lcmF0ZWQgYmFiYmxlXG4gKiBjb25zb2xlLmxvZyhiYWJibGVyLmdldEJhYmJsZSgpKTtcbiAqIFxuICogLy8gY2xlYXJzIHRoZSBzdG9yZWQgYmFiYmxlXG4gKiBiYWJibGVyLnJlc2V0QmFiYmxlKCk7XG4gKiBjb25zb2xlLmxvZyhiYWJibGVyLmdldEJhYmJsZSgpKTtcbiAqIFxuICogLy8gc2V0cyB0aGUgYmFiYmxlXG4gKiBiYWJibGVyLnNldEJhYmJsZSgnaGVyZSBiZSBnaWJiZXJpc2ggJyk7XG4gKiBjb25zb2xlLmxvZyhiYWJibGVyLmdldEJhYmJsZSgpKTtcbiAqIFxuICogLy8gYXBwZW5kIG1vcmUgZ2liYmVyaXNoIHRvIHRoZSBjdXJyZW50IGJhYmJsZVxuICogYmFiYmxlci5zZXRCYWJibGUoYmFiYmxlci5nZXRCYWJibGUoKSArIGJhYmJsZXIuZ2VuZXJhdGVCYWJibGUoNSkpO1xuICogY29uc29sZS5sb2coYmFiYmxlci5nZXRCYWJibGUoKSk7XG4gKiBcbiAqIC8vIGdlbmVyYXRlIGEgc2VudGVuY2VcbiAqIGJhYmJsZXIucmVzZXRXb3JkQ291bnQoMTApO1xuICogY29uc29sZS5sb2coYmFiYmxlci5nZW5lcmF0ZVNlbnRlbmNlKDUsIDIwKSk7XG4gKiBcbiAqIC8vIGdlbmVyYXRlIHJhbmRvbSBwdW5jdHVhdGlvblxuICogY29uc29sZS5sb2coYmFiYmxlci5wdW5jdHVhdGUoKSk7XG4gKiBcbiAqIC8vIGdlbmVyYXRlIGEgd29yZFxuICogY29uc29sZS5sb2coYmFiYmxlci5nZW5lcmF0ZVdvcmQoMyw3KSk7XG4gKiBjb25zb2xlLmxvZyhiYWJibGVyLmdlbmVyYXRlV29yZCg3LDEwKSk7XG4gKi9cbmF0cm9wYS5CYWJibGVyID0gZnVuY3Rpb24gQmFiYmxlcih3cmRDb3VudCkge1xuICAgICd1c2Ugc3RyaWN0JztcbiAgICB2YXIgbXkgPSB0aGlzLFxuICAgICAgICBiYWJibGUgPSAnJyxcbiAgICAgICAgd29yZENvdW50ID0gMDtcbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSB3b3JkIGNvdW50LlxuICAgICAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICAgICAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICAgICAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAgICAgKiBAdmVyc2lvbiAyMDEzMDMxM1xuICAgICAqIEBtZXRob2RPZiBhdHJvcGEuQmFiYmxlciNcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gd3JkQ291bnQgVGhlIGFtb3VudCBvZiBcIndvcmRzXCIgd2hpY2ggeW91IHdhbnQgdGhlXG4gICAgICogYmFiYmxlciB0byBwcm9kdWNlLlxuICAgICAqIEByZXR1cm5zIHtOdW1iZXJ9IFJldHVybnMgdGhlIHNldCB3b3JkIGNvdW50IGZvciB0aGlzIGJhYmJsZXIuXG4gICAgICovXG4gICAgdGhpcy5zZXRXb3JkQ291bnQgPSBmdW5jdGlvbiAod3JkQ291bnQpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB3cmRDb3VudCAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHdvcmRDb3VudCA9IDI1MDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHdvcmRDb3VudCA9IHdyZENvdW50O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB3b3JkQ291bnQ7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXNldHMgdGhlIHdvcmQgY291bnQgZm9yIHRoaXMgYmFiYmxlci5cbiAgICAgKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAgICAgKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAgICAgKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gICAgICogQHZlcnNpb24gMjAxMzAzMTNcbiAgICAgKiBAbWV0aG9kT2YgYXRyb3BhLkJhYmJsZXIjXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHdvcmRDb3VudCBUaGUgYW1vdW50IG9mIFwid29yZHNcIiB5b3Ugd291bGQgbGlrZVxuICAgICAqIHRvIHNldCBmb3IgdGhpcyBiYWJibGVyLlxuICAgICAqIEByZXR1cm5zIHtOdW1iZXJ9IFJldHVybnMgdGhlIHNldCB3b3JkIGNvdW50IGZvciB0aGlzIGJhYmJsZXIuXG4gICAgICovXG4gICAgdGhpcy5yZXNldFdvcmRDb3VudCA9IGZ1bmN0aW9uIHJlc2V0V29yZENvdW50KHdvcmRDb3VudCkge1xuICAgICAgICBteS5zZXRXb3JkQ291bnQod29yZENvdW50KTtcbiAgICAgICAgcmV0dXJuIHdvcmRDb3VudDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGN1cnJlbnQgd29yZCBjb3VudC5cbiAgICAgKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAgICAgKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAgICAgKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gICAgICogQHZlcnNpb24gMjAxMjA5MDlcbiAgICAgKiBAbWV0aG9kT2YgYXRyb3BhLkJhYmJsZXIjXG4gICAgICogQHJldHVybnMge051bWJlcn0gUmV0dXJucyB0aGUgd29yZCBjb3VudCBmb3IgdGhpcyBiYWJibGVyLlxuICAgICAqL1xuICAgIHRoaXMuZ2V0V29yZENvdW50ID0gZnVuY3Rpb24gZ2V0V29yZENvdW50KCkge1xuICAgICAgICByZXR1cm4gd29yZENvdW50O1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2VuZXJhdGVzIGEgd29yZCB3aXRoIGEgc3BlY2lmaWVkIGxlbmd0aC4gTG93ZXJzIHRoZSB3b3JkIGNvdW50IGJ5IG9uZS5cbiAgICAgKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAgICAgKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAgICAgKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gICAgICogQHZlcnNpb24gMjAxMjA5MDlcbiAgICAgKiBAbWV0aG9kT2YgYXRyb3BhLkJhYmJsZXIjXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHN0cmluZ01pbiB0aGUgc2hvcnRlc3Qgd29yZCwgaW4gY2hhcmFjdGVycy5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gc3RyaW5nTWF4IFRoZSBsb25nZXN0IHdvcmQsIGluIGNoYXJhY3RlcnMuXG4gICAgICogQHJldHVybnMge1N0cmluZ30gUmV0dXJucyBhIHJhbmRvbSBzdHJpbmcgb2YgY2hhcmFjdGVyc1xuICAgICAqIHdpdGhpbiB0aGUgc3BlY2lmaWVkIHJhbmdlIG9mIGxlbmd0aC5cbiAgICAgKiBAcmVxdWlyZXMgYXRyb3BhLnJhbmRvbS5pbnRlZ2VyXG4gICAgICogQHJlcXVpcmVzIGF0cm9wYS5yYW5kb20uc3RyaW5nXG4gICAgICovXG4gICAgdGhpcy5nZW5lcmF0ZVdvcmQgPSBmdW5jdGlvbiBnZW5lcmF0ZVdvcmQoc3RyaW5nTWluLCBzdHJpbmdNYXgpIHtcbiAgICAgICAgdmFyIHdvcmRMZW5ndGgsXG4gICAgICAgIHdvcmQ7XG4gICAgICAgIHdvcmRMZW5ndGggPSBhdHJvcGEucmFuZG9tLmludGVnZXIoc3RyaW5nTWluLCBzdHJpbmdNYXgpO1xuICAgICAgICB3b3JkID0gYXRyb3BhLnJhbmRvbS5zdHJpbmcod29yZExlbmd0aCwgJ2xvd2VyJyk7XG4gICAgICAgIHdvcmRDb3VudC0tO1xuICAgICAgICByZXR1cm4gd29yZDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFByb3ZpZGVzIHJhbmRvbSBwdW5jdHVhdGlvbi5cbiAgICAgKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAgICAgKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAgICAgKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gICAgICogQHZlcnNpb24gMjAxMjA5MDlcbiAgICAgKiBAbWV0aG9kT2YgYXRyb3BhLkJhYmJsZXIjXG4gICAgICogQHJldHVybnMge1N0cmluZ30gUmV0dXJucyBhIHJhbmRvbSBwdW5jdHVhdGlvblxuICAgICAqIGNoYXJhY3RlciAoIC4gISBvciA/ICkuXG4gICAgICogQHJlcXVpcmVzIGF0cm9wYS5yYW5kb20uc3RyaW5nXG4gICAgICovXG4gICAgdGhpcy5wdW5jdHVhdGUgPSBmdW5jdGlvbiBwdW5jdHVhdGUoKSB7XG4gICAgICAgIHZhciBwdW5jdHVhdGlvbjtcbiAgICAgICAgcHVuY3R1YXRpb24gPSBhdHJvcGEucmFuZG9tLnN0cmluZygxLCAncHVuY3R1YXRpb24nKTtcbiAgICAgICAgcmV0dXJuIHB1bmN0dWF0aW9uO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2VuZXJhdGVzIGEgc2VudGVuY2Ugb2Ygc3BlY2lmaWVkIGxlbmd0aCBpbiB3b3Jkcy4gVGhlIHF1YW50aXR5XG4gICAgICogIG9mIHdvcmRzIGluIHRoZSBnZW5lcmF0ZWQgc2VudGVuY2Ugd2lsbCBiZSBiZXR3ZWVuIHRoZSBtaW5pbXVtXG4gICAgICogIGFuZCBtYXhpbXVtIHNldCwgd2l0aCB0aGUgbWF4aW11bSBjYXBwZWQgYXQgdGhlIGN1cnJlbnQgd29yZHNcbiAgICAgKiAgY291bnQuIFRoZSB3b3JkIGNvdW50IHdpbGwgYmUgbG93ZXJlZCBieSB0aGVcbiAgICAgKiAgcXVhbnRpdHkgb2Ygd29yZHMgaW4gdGhlIGdlbmVyYXRlZCBzZW50ZW5jZS4gSWYgdGhlIHdvcmQgY291bnRcbiAgICAgKiAgaXMgMCB0aGVuIHRoZXJlIHdpbGwgYmUgbm8gd29yZHMgaW4gdGhlIHNlbnRlbmNlLiBJZiB0aGUgd29yZFxuICAgICAqICBjb3VudCBpcyAzIHRoZW4gdGhlIG1heGltdW0gcG9zc2libGUgbnVtYmVyIG9mIHdvcmRzIGluIHRoZVxuICAgICAqICBzZW50ZW5jZSB3aWxsIGJlIHRocmVlLlxuICAgICAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICAgICAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICAgICAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAgICAgKiBAdmVyc2lvbiAyMDEzMDMxM1xuICAgICAqIEBtZXRob2RPZiBhdHJvcGEuQmFiYmxlciNcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gc2VudGVuY2VNaW4gVGhlIHNob3J0ZXN0IHNlbnRlbmNlLCBpbiB3b3JkcyxcbiAgICAgKiB5b3Ugd291bGQgbGlrZSByZXR1cm5lZC5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gc2VudGVuY2VNYXggVGhlIGxvbmdlc3Qgc2VudGVuY2UsIGluIHdvcmRzLFxuICAgICAqIHlvdSB3b3VsZCBsaWtlIHJldHVybmVkLlxuICAgICAqIEByZXR1cm5zIHtTdHJpbmd9IFJldHVybnMgYSBcInNlbnRlbmNlXCIgd2l0aGluIHRoZSBzcGVjaWZpZWRcbiAgICAgKiByYW5nZSBvZiBsZW5ndGguXG4gICAgICogQHJlcXVpcmVzIGF0cm9wYS5yYW5kb20uaW50ZWdlclxuICAgICAqIEByZXF1aXJlcyBhdHJvcGEuc3RyaW5nLnVjRmlyc3RcbiAgICAgKi9cbiAgICB0aGlzLmdlbmVyYXRlU2VudGVuY2UgPSBmdW5jdGlvbiBnZW5lcmF0ZVNlbnRlbmNlKFxuICAgICAgICBzZW50ZW5jZU1pbiwgc2VudGVuY2VNYXhcbiAgICApIHtcbiAgICAgICAgdmFyIHdvcmQsXG4gICAgICAgIHNlbnRlbmNlTGVuZ3RoLFxuICAgICAgICBzZW50ZW5jZTtcbiAgICAgICAgc2VudGVuY2VMZW5ndGggPSBhdHJvcGEucmFuZG9tLmludGVnZXIoc2VudGVuY2VNaW4sIHNlbnRlbmNlTWF4KTtcbiAgICAgICAgc2VudGVuY2UgPSAnJztcbiAgICAgICAgaWYgKHNlbnRlbmNlTGVuZ3RoID4gd29yZENvdW50KSB7XG4gICAgICAgICAgICBzZW50ZW5jZUxlbmd0aCA9IHdvcmRDb3VudDtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKHNlbnRlbmNlTGVuZ3RoOyBzZW50ZW5jZUxlbmd0aCA+IDA7IHNlbnRlbmNlTGVuZ3RoLS0pIHtcbiAgICAgICAgICAgIGlmICh3b3JkQ291bnQgPiAwKSB7XG4gICAgICAgICAgICAgICAgd29yZCA9IG15LmdlbmVyYXRlV29yZCg0LCAxMik7XG4gICAgICAgICAgICAgICAgc2VudGVuY2UgKz0gJyAnICsgd29yZDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2VudGVuY2VMZW5ndGggPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHNlbnRlbmNlICs9IG15LnB1bmN0dWF0ZSgpO1xuICAgICAgICByZXR1cm4gYXRyb3BhLnN0cmluZy51Y0ZpcnN0KHNlbnRlbmNlLnRyaW0oKSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBiYWJibGUuXG4gICAgICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gICAgICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gICAgICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICAgICAqIEB2ZXJzaW9uIDIwMTMwMzEzXG4gICAgICogQG1ldGhvZE9mIGF0cm9wYS5CYWJibGVyI1xuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBiYWJibGVTdHJpbmcgU3BlY2lmaWVkIGJhYmJsZSB0byBzZXQuXG4gICAgICogQHJldHVybnMge1N0cmluZ30gUmV0dXJucyB0aGUgc3RvcmVkIGJhYmJsZS5cbiAgICAgKi9cbiAgICB0aGlzLnNldEJhYmJsZSA9IGZ1bmN0aW9uIHNldEJhYmJsZShiYWJibGVTdHJpbmcpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBiYWJibGVTdHJpbmcgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBiYWJibGUgPSBiYWJibGVTdHJpbmc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBteS5yZXNldEJhYmJsZSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBiYWJibGU7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBDbGVhcnMgdGhlIHN0b3JlZCBiYWJibGUuXG4gICAgICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gICAgICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gICAgICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICAgICAqIEB2ZXJzaW9uIDIwMTIwOTA5XG4gICAgICogQG1ldGhvZE9mIGF0cm9wYS5CYWJibGVyI1xuICAgICAqIEByZXR1cm5zIHtTdHJpbmd9IFJldHVybnMgdGhlIHN0b3JlZCBiYWJibGUuXG4gICAgICovXG4gICAgdGhpcy5yZXNldEJhYmJsZSA9IGZ1bmN0aW9uIHJlc2V0QmFiYmxlKCkge1xuICAgICAgICBiYWJibGUgPSAnJztcbiAgICAgICAgcmV0dXJuIGJhYmJsZTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGxhc3QgZ2VuZXJhdGVkIGJhYmJsZS5cbiAgICAgKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAgICAgKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAgICAgKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gICAgICogQHZlcnNpb24gMjAxMjA5MDlcbiAgICAgKiBAbWV0aG9kT2YgYXRyb3BhLkJhYmJsZXIjXG4gICAgICogQHJldHVybnMge1N0cmluZ30gUmV0dXJucyB0aGUgc3RvcmVkIGJhYmJsZS5cbiAgICAgKi9cbiAgICB0aGlzLmdldEJhYmJsZSA9IGZ1bmN0aW9uIGdldEJhYmJsZSgpIHtcbiAgICAgICAgcmV0dXJuIGJhYmJsZTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEdlbmVyYXRlcyBiYWJibGUgdG8gYSB1c2VyIHNwZWNpZmllZCBsZW5ndGggaW4gd29yZHMuXG4gICAgICogIFRoZSB3b3JkIGNvdW50IHdpbGwgYmUgemVybyBhZnRlciB0aGlzIGFuZCB0aGUgc3RvcmVkXG4gICAgICogIGJhYmJsZSB3aWxsIGJlIHNldCB0byB0aGUgZ2VuZXJhdGVkIGJhYmJsZS5cbiAgICAgKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAgICAgKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAgICAgKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gICAgICogQHZlcnNpb24gMjAxMjA5MDlcbiAgICAgKiBAbWV0aG9kT2YgYXRyb3BhLkJhYmJsZXIjXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHdvcmRzQ3QgVGhlIGRlc2lyZWQgd29yZCBjb3VudCBmb3IgdGhlXG4gICAgICogZ2VuZXJhdGVkIGJhYmJsZS5cbiAgICAgKiBAcmV0dXJucyB7U3RyaW5nfSBSZXR1cm5zIGJhYmJsZSBvZiBzcGVjaWZpZWQgbGVuZ3RoIGluIHdvcmRzLlxuICAgICAqIEBzZWUgYXRyb3BhLkJhYmJsZXIjZ2V0V29yZENvdW50XG4gICAgICovXG4gICAgdGhpcy5nZW5lcmF0ZUJhYmJsZSA9IGZ1bmN0aW9uIGdlbmVyYXRlQmFiYmxlKHdvcmRzQ3QpIHtcbiAgICAgICAgbXkucmVzZXRCYWJibGUoKTtcbiAgICAgICAgbXkucmVzZXRXb3JkQ291bnQod29yZHNDdCk7XG4gICAgICAgIGZvciAod29yZENvdW50OyB3b3JkQ291bnQgPiAwOyBiYWJibGUgKz0gJyAnKSB7XG4gICAgICAgICAgICBteS5zZXRCYWJibGUoYmFiYmxlICsgbXkuZ2VuZXJhdGVTZW50ZW5jZSg1LCAyMCkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBiYWJibGU7XG4gICAgfTtcbiAgICBcbiAgICBhdHJvcGEuc3VwcG9ydENoZWNrKCdCYWJibGVyJyk7XG4gICAgdGhpcy5yZXNldFdvcmRDb3VudCh3cmRDb3VudCk7XG59O1xuXG5cblxuXG53aGlsZShhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMubGVuZ3RoID4gMCkge1xuICAgIGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5wb3AoKSgpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBhdHJvcGE7XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vZG9jcy92c2RvYy9PcGVuTGF5ZXJzQWxsLmpzXCIvPlxudmFyIGF0cm9wYSA9IHJlcXVpcmUoJ2F0cm9wYS1oZWFkZXInKTtcbi8qanNsaW50XG4gICAgaW5kZW50OiA0LFxuICAgIG1heGVycjogNTAsXG4gICAgd2hpdGU6IHRydWUsXG4gICAgYnJvd3NlcjogdHJ1ZSxcbiAgICBkZXZlbDogdHJ1ZSxcbiAgICBwbHVzcGx1czogdHJ1ZSxcbiAgICByZWdleHA6IHRydWVcbiovXG4vKmdsb2JhbCBhdHJvcGEgKi9cbi8vIGVuZCBoZWFkZXJcblxuYXRyb3BhLnJlcXVpcmVzKFxuICAgICdDb29raWVNb25zdGVyJyxcbiAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xuICAgICAgICB2YXIgc3VwcG9ydGVkID0gdHJ1ZTtcbiAgICAgICAgXG4gICAgICAgIFtcbiAgICAgICAgICAgIGRvY3VtZW50LmNvb2tpZVxuICAgICAgICBdLmZvckVhY2goZnVuY3Rpb24gKHByZXJlcXVpc2l0ZSkge1xuICAgICAgICAgICAgaWYocHJlcmVxdWlzaXRlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBzdXBwb3J0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBzdXBwb3J0ZWQ7XG4gICAgfVxuKTtcblxuLyoqXG4gKiBUaGlzIGlzIGEgY29va2llIGhhbmRsZXIuXG4gKiBAZXhhbXBsZVxuICogLy8gY29va2llIG9iamVjdFxuICogdmFyIGNvb2tpZU9iaiA9IHtcImtleVwiIDogXCJjb29raWVOYW1lXCIsIFwidmFsXCIgOiBcImNvb2tpZVZhbFwifVxuICogLy8gY29va2llIHN0cmluZyBcbiAqIHZhciBjb29raWVTdHJpbmcgPSBjb29raWVOYW1lPWNvb2tpZVZhbDtcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAdmVyc2lvbiAyMDEzMDIyM1xuICogQGNsYXNzIFRoaXMgcmVwcmVzZW50cyBhIGNvb2tpZSBoYW5kbGVyXG4gKiBAcmV0dXJucyB7Q29va2llTW9uc3Rlcn0gQSBjb29raWUgaGFuZGxlci5cbiAqIEByZXF1aXJlcyBhdHJvcGEuZGF0YVxuICovXG5hdHJvcGEuQ29va2llTW9uc3RlciA9IGZ1bmN0aW9uIENvb2tpZU1vbnN0ZXIoKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuICAgIHZhciBjdXJyZW50Q29va2llcywgZ2V0Q29va2llQ2FsbGJhY2s7XG4gICAgXG4gICAgLyoqXG4gICAgICogVGhpcyBob2xkcyB0aGUgY3VycmVudCBjb29raWUgb2JqZWN0IGFycmF5LlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHR5cGUgQXJyYXlcbiAgICAgKiBAZmllbGRPZiBhdHJvcGEuQ29va2llTW9uc3Rlci1cbiAgICAgKi9cbiAgICBjdXJyZW50Q29va2llcyA9IFtdO1xuICAgIC8qKlxuICAgICAqIENvbnZlcnRzIGEgY29va2llIHN0cmluZyBpbnRvIGFuIG9iamVjdC5cbiAgICAgKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAgICAgKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAgICAgKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gICAgICogQHZlcnNpb24gMjAxMzAyMjNcbiAgICAgKiBAbWV0aG9kT2YgYXRyb3BhLkNvb2tpZU1vbnN0ZXIjXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGNvb2tpZSBBIGNvb2tpZSByZXByZXNlbnRlZCBhcyBhIHN0cmluZ1xuICAgICAqIDxjb2RlPmNvb2tpZU5hbWU9Y29va2llVmFsOzwvY29kZT5cbiAgICAgKiBAcmV0dXJucyB7Y29va2llT2JqfSBSZXR1cm5zIGEgY29va2llIG9iamVjdC5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBjb29raWVNb25zdGVyID0gbmV3IGF0cm9wYS5Db29raWVNb25zdGVyKCk7XG4gICAgICogdmFyIGNvb2tpZU9iaiA9IGNvb2tpZU1vbnN0ZXIuY29va2llMm9iaignYXRyb3BhPWhpYWwgYXRyb3BhISE7Jyk7XG4gICAgICogY29uc29sZS5sb2coY29va2llT2JqKTtcbiAgICAgKi9cbiAgICB0aGlzLmNvb2tpZTJvYmogPSBmdW5jdGlvbiBjb29raWUyb2JqKGNvb2tpZSkge1xuICAgICAgICB2YXIgY29va2llT2JqID0ge307XG4gICAgICAgIGlmICghY29va2llKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgY29va2llT2JqLmtleSA9IGNvb2tpZS5zdWJzdHIoMCwgY29va2llLmluZGV4T2YoXCI9XCIpKS50cmltKCk7XG4gICAgICAgIGNvb2tpZU9iai52YWwgPSBjb29raWUuc3Vic3RyKGNvb2tpZS5pbmRleE9mKFwiPVwiKSArIDEpO1xuICAgICAgICBpZihjb29raWVPYmoudmFsLnN1YnN0cigtMSkgPT09ICc7Jykge1xuICAgICAgICAgICAgY29va2llT2JqLnZhbCA9IGNvb2tpZU9iai52YWwuc3Vic3RyKDAsIGNvb2tpZU9iai52YWwubGVuZ3RoIC0gMSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvb2tpZU9iajtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENvbnZlcnRzIGEgY29va2llIG9iamVjdCB0byBhIGNvb2tpZSBzdHJpbmcuXG4gICAgICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gICAgICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gICAgICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICAgICAqIEB2ZXJzaW9uIDIwMTIwOTA5XG4gICAgICogQG1ldGhvZE9mIGF0cm9wYS5Db29raWVNb25zdGVyI1xuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjb29raWVPYmogQSBjb29raWUgb2JqZWN0XG4gICAgICogQHJldHVybnMge1N0cmluZ30gUmV0dXJucyBhIGNvb2tpZSBzdHJpbmcuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgY29va2llTW9uc3RlciA9IG5ldyBhdHJvcGEuQ29va2llTW9uc3RlcigpO1xuICAgICAqIC8vIGNyZWF0aW5nIGEgY29va2llXG4gICAgICogY29va2llTW9uc3Rlci5zZXRDb29raWUoJ2F0cm9wYScsICdoaWFsIGF0cm9wYSEhJyk7XG4gICAgICogY29uc29sZS5sb2coZG9jdW1lbnQuY29va2llKTtcbiAgICAgKiBcbiAgICAgKiAvLyBnZXR0aW5nIGEgY29va2llIG9iamVjdFxuICAgICAqIHZhciBjb29raWVPYmogPSBjb29raWVNb25zdGVyLmdldENvb2tpZSgnYXRyb3BhJyk7XG4gICAgICogY29uc29sZS5sb2coY29va2llT2JqKTtcbiAgICAgKiBcbiAgICAgKiAvLyBjb252ZXJ0IHRoZSBjb29raWUgb2JqZWN0IHRvIGEgc3RyaW5nXG4gICAgICogY29uc29sZS5sb2coY29va2llTW9uc3Rlci5iYWtlQ29va2llKGNvb2tpZU9iaikpO1xuICAgICAqL1xuICAgIHRoaXMuYmFrZUNvb2tpZSA9IGZ1bmN0aW9uIGJha2VDb29raWUoY29va2llT2JqKSB7XG4gICAgICAgIHZhciBjb29raWUgPSAnJywga2V5LCB2YWw7XG4gICAgICAgIFxuICAgICAgICBrZXkgPSBjb29raWVPYmoua2V5O1xuICAgICAgICB2YWwgPSBjb29raWVPYmoudmFsO1xuICAgICAgICBjb29raWUgPSBrZXkgKyAnPScgKyB2YWwgKyAnOyc7XG4gICAgICAgIHJldHVybiBjb29raWU7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBGaWx0ZXIgY29va2llcyBiYXNlZCBvbiB1c2VyIHNwZWNpZmllZCBjYWxsYmFjay5cbiAgICAgKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAgICAgKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAgICAgKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gICAgICogQHZlcnNpb24gMjAxMzAyMjNcbiAgICAgKiBAbWV0aG9kT2YgYXRyb3BhLkNvb2tpZU1vbnN0ZXIjXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2sgVGhlIGNhbGxiYWNrIGZ1bmN0aW9uIHdpbGwgYmUgcGFzc2VkXG4gICAgICogIHR3byBhcmd1bWVudHMuIFRoZSBmaXJzdCBpcyBhIGNvb2tpZSBvYmplY3QgZnJvbSB0aGUgY3VycmVudFxuICAgICAqICBkb2N1bWVudC4gVGhlIHNlY29uZCBhcmd1bWVudCBpcyB0aGUgdmFsdWUgc3VwcGxpZWQgZm9yXG4gICAgICogIDxjb2RlPmFyZ3M8L2NvZGU+IGlmIHRoZSBjYWxsYmFjayBmdW5jdGlvbiByZXR1cm5zIDxjb2RlPnRydWU8L2NvZGU+XG4gICAgICogIHRoZW4gdGhlIGNvb2tpZSBvYmplY3Qgd2lsbCBiZSBpbmNsdWRlZCBpbiB0aGUgcmV0dXJuIHJlc3VsdHMuXG4gICAgICogQHBhcmFtIHtBcnJheX0gYXJncyBBcmd1bWVudHMgdG8gcGFzcyB0byB0aGUgY2FsbGJhY2tcbiAgICAgKiBmdW5jdGlvbi5cbiAgICAgKiBAcmV0dXJucyB7QXJyYXl9IEFuIGFycmF5IG9mIGNvb2tpZSBvYmplY3RzLlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIGNvb2tpZU1vbnN0ZXIgPSBuZXcgYXRyb3BhLkNvb2tpZU1vbnN0ZXIoKTtcbiAgICAgKiAvLyBjcmVhdGluZyBhIGZldyBjb29raWVzXG4gICAgICogY29va2llTW9uc3Rlci5zZXRDb29raWUoJ2F0cm9wYScsICdoaWFsIGF0cm9wYSEhJyk7XG4gICAgICogY29va2llTW9uc3Rlci5zZXRDb29raWUoJ2thdGppaScsICdtdW5jaGluZycpO1xuICAgICAqIGNvbnNvbGUubG9nKGRvY3VtZW50LmNvb2tpZSk7XG4gICAgICogXG4gICAgICogLy8gZmlsdGVyIGNvb2tpZXNcbiAgICAgKiBmdW5jdGlvbiBjb29raWVGaWx0ZXIoY29va2llT2JqLCBjb29raWVWYWx1ZSkge1xuICAgICAqICAgICBpZihjb29raWVPYmoudmFsID09PSBjb29raWVWYWx1ZSkge1xuICAgICAqICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICogICAgIH0gZWxzZSB7XG4gICAgICogICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICogICAgIH1cbiAgICAgKiB9XG4gICAgICogdmFyIGNvb2tpZU9iakFycmF5ID0gY29va2llTW9uc3Rlci5pbnNwZWN0Q29va2llcyhcbiAgICAgKiAgICAgY29va2llRmlsdGVyLCAnbXVuY2hpbmcnKTtcbiAgICAgKiBjb25zb2xlLmxvZyhjb29raWVPYmpBcnJheSk7XG4gICAgICovXG4gICAgdGhpcy5pbnNwZWN0Q29va2llcyA9IGZ1bmN0aW9uIGluc3BlY3RDb29raWVzKGNhbGxiYWNrLCBhcmdzKSB7XG4gICAgICAgIHZhciB0ZXN0Q29va2llLCBjb29raWVzLCBqYXIgPSBbXTtcbiAgICAgICAgY29va2llcyA9IHRoaXMuZ2V0Q29va2llcygpO1xuICAgICAgICB3aGlsZSAoY29va2llcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0ZXN0Q29va2llID0gY29va2llcy5zaGlmdCgpO1xuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKHRlc3RDb29raWUsIGFyZ3MpID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgamFyLnB1c2godGVzdENvb2tpZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGphcjtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEludGVybmFsIGNhbGxiYWNrIGZ1bmN0aW9uIHVzZWQgd2hpbGUgZ2V0dGluZyB0aGUgY3VycmVudFxuICAgICAqIGNvb2tpZXMuXG4gICAgICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gICAgICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gICAgICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICAgICAqIEB2ZXJzaW9uIDIwMTMwMjIzXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAbWV0aG9kT2YgYXRyb3BhLkNvb2tpZU1vbnN0ZXItXG4gICAgICogQHBhcmFtIHtjb29raWVPYmp9IHRlc3RDb29raWUgQSBjb29raWUgb2JqZWN0XG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGFyZ3MgYXJndW1lbnQgdXNlZCBpbiBjb21wYXJpc29uIGZ1bmN0aW9uXG4gICAgICogQHJldHVybnMge0Jvb2xlYW59IElmIGNvb2tpZSBrZXkgaXMgZXhhY3RseSBlcXVhbCB0byB0aGUgYXJndW1lbnRcbiAgICAgKiB0aGVuIHRoZSBjYWxsYmFjayByZXR1cm5zIHRydWUuXG4gICAgICovXG4gICAgZ2V0Q29va2llQ2FsbGJhY2sgPSBmdW5jdGlvbiBnZXRDb29raWVDYWxsYmFjayh0ZXN0Q29va2llLCBhcmdzKSB7XG4gICAgICAgIHZhciBvdXQ7XG4gICAgICAgIGlmICh0ZXN0Q29va2llLmtleSA9PT0gYXJncykge1xuICAgICAgICAgICAgb3V0ID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG91dCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZXRzIGEgdXNlciByZXF1ZXN0ZWQgY29va2llLlxuICAgICAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICAgICAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICAgICAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAgICAgKiBAdmVyc2lvbiAyMDEzMDIyM1xuICAgICAqIEBtZXRob2RPZiBhdHJvcGEuQ29va2llTW9uc3RlciNcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gd2hpY2hLZXkgVGhlIGNvb2tpZXMga2V5IChuYW1lKVxuICAgICAqIEByZXR1cm5zIHtjb29raWVPYmp8ZmFsc2V9IFJldHVybnMgYSBjb29raWUgb2JqZWN0IGlmXG4gICAgICogIGEgY29va2llIHdpdGggdGhlIHNwZWNpZmllZCBrZXkgaXMgZm91bmQgb3IgZmFsc2UgaWZcbiAgICAgKiAgaXQgaXMgbm90IGZvdW5kLlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIGNvb2tpZU1vbnN0ZXIgPSBuZXcgYXRyb3BhLkNvb2tpZU1vbnN0ZXIoKTtcbiAgICAgKiAvLyBjcmVhdGluZyBhIGNvb2tpZVxuICAgICAqIGNvb2tpZU1vbnN0ZXIuc2V0Q29va2llKCdhdHJvcGEnLCAnaGlhbCBhdHJvcGEhIScpO1xuICAgICAqIGNvbnNvbGUubG9nKGRvY3VtZW50LmNvb2tpZSk7XG4gICAgICogLy8gZ2V0IGEgc3BlY2lmaWMgY29va2llXG4gICAgICogdmFyIGNvb2tpZU9iaiA9IGNvb2tpZU1vbnN0ZXIuZ2V0Q29va2llKCdhdHJvcGEnKTtcbiAgICAgKiBjb25zb2xlLmxvZyhjb29raWVPYmoua2V5KTtcbiAgICAgKiBjb25zb2xlLmxvZyhjb29raWVPYmoudmFsKTtcbiAgICAgKi9cbiAgICB0aGlzLmdldENvb2tpZSA9IGZ1bmN0aW9uIGdldENvb2tpZSh3aGljaEtleSkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gdGhpcy5pbnNwZWN0Q29va2llcyhnZXRDb29raWVDYWxsYmFjaywgd2hpY2hLZXkudHJpbSgpKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdFswXSB8fCBmYWxzZTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEdldCBhbGwgY29va2llcy5cbiAgICAgKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAgICAgKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAgICAgKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gICAgICogQHZlcnNpb24gMjAxMjA5MDlcbiAgICAgKiBAbWV0aG9kT2YgYXRyb3BhLkNvb2tpZU1vbnN0ZXIjXG4gICAgICogQHJldHVybnMge0FycmF5fSBBbiBhcnJheSB3aG9zZSBlbGVtZW50cyBhcmUgY29va2llIG9iamVjdHMuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgY29va2llTW9uc3RlciA9IG5ldyBhdHJvcGEuQ29va2llTW9uc3RlcigpO1xuICAgICAqIC8vIGNyZWF0aW5nIGEgY29va2llXG4gICAgICogY29va2llTW9uc3Rlci5zZXRDb29raWUoJ2F0cm9wYScsICdoaWFsIGF0cm9wYSEhJyk7XG4gICAgICogLy8gZ2V0IGFsbCBjb29raWUgb2JqZWN0cyBpbiBhbiBhcnJheVxuICAgICAqIGNvbnNvbGUubG9nKGNvb2tpZU1vbnN0ZXIuZ2V0Q29va2llcygpKTtcbiAgICAgKi9cbiAgICB0aGlzLmdldENvb2tpZXMgPSBmdW5jdGlvbiBnZXRDb29raWVzKCkge1xuICAgICAgICB2YXIgbiwgbCwgY29va2llQXJyYXksIGNvb2tpZU9iajtcbiAgICAgICAgY3VycmVudENvb2tpZXMgPSBbXTtcbiAgICAgICAgY29va2llQXJyYXkgPSBkb2N1bWVudC5jb29raWUuc3BsaXQoXCI7XCIpO1xuICAgICAgICBmb3IgKG4gPSAwLCBsID0gY29va2llQXJyYXkubGVuZ3RoOyBuIDwgbDsgbisrKSB7XG4gICAgICAgICAgICBjb29raWVPYmogPSBmYWxzZTtcbiAgICAgICAgICAgIGlmIChjb29raWVBcnJheVtuXSkge1xuICAgICAgICAgICAgICAgIGNvb2tpZU9iaiA9IHRoaXMuY29va2llMm9iaihjb29raWVBcnJheVtuXSk7XG4gICAgICAgICAgICAgICAgaWYgKGNvb2tpZU9iaikge1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50Q29va2llcy5wdXNoKGNvb2tpZU9iaik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjdXJyZW50Q29va2llcztcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIERlbGV0ZXMgYSBzcGVjaWZpZWQgY29va2llIGJ5IHVzZXIgc3VibWl0dGVkIHN0cmluZy5cbiAgICAgKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAgICAgKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAgICAgKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gICAgICogQHZlcnNpb24gMjAxMzAyMjNcbiAgICAgKiBAbWV0aG9kT2YgYXRyb3BhLkNvb2tpZU1vbnN0ZXIjXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHdoaWNoS2V5IFRoZSBjb29raWVzIGtleSAobmFtZSkgdGhhdFxuICAgICAqIHdpbGwgYmUgZGVsZXRlZC5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBjb29raWVNb25zdGVyID0gbmV3IGF0cm9wYS5Db29raWVNb25zdGVyKCk7XG4gICAgICogLy8gY3JlYXRpbmcgdGhlIGNvb2tpZSB0byBkZWxldGVcbiAgICAgKiBjb29raWVNb25zdGVyLnNldENvb2tpZSgnYXRyb3BhJywgJ2hpYWwgYXRyb3BhISEnKTtcbiAgICAgKiBjb25zb2xlLmxvZyhkb2N1bWVudC5jb29raWUpO1xuICAgICAqIC8vIGRlbGV0ZSBhIGNvb2tpZVxuICAgICAqIGNvb2tpZU1vbnN0ZXIuZGVsZXRlQ29va2llKCdhdHJvcGEnKTtcbiAgICAgKiBjb25zb2xlLmxvZyhkb2N1bWVudC5jb29raWUpO1xuICAgICAqL1xuICAgIHRoaXMuZGVsZXRlQ29va2llID0gZnVuY3Rpb24gZGVsZXRlQ29va2llKHdoaWNoS2V5KSB7XG4gICAgICAgIHZhciBjb29raWVPYmogPSB7fTtcbiAgICAgICAgY29va2llT2JqLmtleSA9IHdoaWNoS2V5O1xuICAgICAgICBjb29raWVPYmoudmFsID0gJztleHBpcmVzPVRodSwgMiBBdWcgMjAwMSAyMDo0NzoxMSBVVEMnO1xuICAgICAgICBkb2N1bWVudC5jb29raWUgPSB0aGlzLmJha2VDb29raWUoY29va2llT2JqKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIERlbGV0ZXMgYSBzcGVjaWZpZWQgY29va2llIGJ5IHVzZXIgc3VibWl0dGVkIGNvb2tpZU9iai5cbiAgICAgKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAgICAgKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAgICAgKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gICAgICogQHZlcnNpb24gMjAxMjA5MDlcbiAgICAgKiBAbWV0aG9kT2YgYXRyb3BhLkNvb2tpZU1vbnN0ZXIjXG4gICAgICogQHBhcmFtIHtjb29raWVPYmp9IGNvb2tpZU9iaiBBIGNvb2tpZSBvYmplY3QuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgY29va2llTW9uc3RlciA9IG5ldyBhdHJvcGEuQ29va2llTW9uc3RlcigpO1xuICAgICAqIC8vIGNyZWF0aW5nIHRoZSBjb29raWUgdG8gZGVsZXRlXG4gICAgICogY29va2llTW9uc3Rlci5zZXRDb29raWUoJ2F0cm9wYScsICdoaWFsIGF0cm9wYSEhJyk7XG4gICAgICogY29uc29sZS5sb2coZG9jdW1lbnQuY29va2llKTtcbiAgICAgKiAvLyBkZWxldGUgYSBjb29raWVcbiAgICAgKiBjb29raWVNb25zdGVyLmRlbGV0ZUNvb2tpZU9iaihcbiAgICAgKiAgICAge2tleSA6ICdhdHJvcGEnLCB2YWwgOiAnZG9lcyBub3QgbWF0dGVyJ30pO1xuICAgICAqIGNvbnNvbGUubG9nKGRvY3VtZW50LmNvb2tpZSk7XG4gICAgICovXG4gICAgdGhpcy5kZWxldGVDb29raWVPYmogPSBmdW5jdGlvbiBkZWxldGVDb29raWVPYmooY29va2llT2JqKSB7XG4gICAgICAgIHRoaXMuZGVsZXRlQ29va2llKGNvb2tpZU9iai5rZXkpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogU2V0cyBhIGNvb2tpZSBwZXIgdXNlciBzcGVjaWZpY2F0aW9ucyBhcyBzdHJpbmdzLiBUaGUgY29va2llXG4gICAgICogd2lsbCBleHBpcmUgd2hlbiB0aGUgYnJvd3NlciBpcyBjbG9zZWQuXG4gICAgICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gICAgICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gICAgICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICAgICAqIEB2ZXJzaW9uIDIwMTIwOTA5XG4gICAgICogQG1ldGhvZE9mIGF0cm9wYS5Db29raWVNb25zdGVyI1xuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB3aGljaEtleSBUaGUga2V5IChuYW1lKSBvZiB0aGUgbmV3IGNvb2tpZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzZXRUbyBUaGUgdmFsdWUgb2YgdGhlIG5ldyBjb29raWUuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgY29va2llTW9uc3RlciA9IG5ldyBhdHJvcGEuQ29va2llTW9uc3RlcigpO1xuICAgICAqIC8vIHNldCBhIGNvb2tpZVxuICAgICAqIGNvb2tpZU1vbnN0ZXIuc2V0Q29va2llKCdhdHJvcGEnLCAnaGlhbCcpO1xuICAgICAqIGNvbnNvbGUubG9nKGRvY3VtZW50LmNvb2tpZSk7XG4gICAgICovXG4gICAgdGhpcy5zZXRDb29raWUgPSBmdW5jdGlvbiBzZXRDb29raWUod2hpY2hLZXksIHNldFRvKSB7XG4gICAgICAgIHZhciBuZXdDb29raWUgPSB7fTtcbiAgICAgICAgbmV3Q29va2llLmtleSA9IHdoaWNoS2V5O1xuICAgICAgICBuZXdDb29raWUudmFsID0gc2V0VG87XG4gICAgICAgIGRvY3VtZW50LmNvb2tpZSA9IHRoaXMuYmFrZUNvb2tpZShuZXdDb29raWUpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogU2V0cyBhIGNvb2tpZSBwZXIgdXNlciBzcGVjaWZpY2F0aW9ucyBhcyBhbiBvYmplY3QuXG4gICAgICogVGhlIGNvb2tpZSB3aWxsIGV4cGlyZSB3aGVuIHRoZSBicm93c2VyIGlzIGNsb3NlZC5cbiAgICAgKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAgICAgKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAgICAgKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gICAgICogQHZlcnNpb24gMjAxMjA5MDlcbiAgICAgKiBAbWV0aG9kT2YgYXRyb3BhLkNvb2tpZU1vbnN0ZXIjXG4gICAgICogQHBhcmFtIHtjb29raWVPYmp9IGNvb2tpZU9iaiBBIGNvb2tpZSBvYmplY3QuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgY29va2llTW9uc3RlciA9IG5ldyBhdHJvcGEuQ29va2llTW9uc3RlcigpO1xuICAgICAqIC8vIHNldCBhIGNvb2tpZVxuICAgICAqIGNvb2tpZU1vbnN0ZXIuc2V0Q29va2llT2JqKHtrZXkgOiAnYXRyb3BhJywgdmFsIDogJ2hpYWwgYXRyb3BhISEnfSk7XG4gICAgICogY29uc29sZS5sb2coZG9jdW1lbnQuY29va2llKTtcbiAgICAgKi9cbiAgICB0aGlzLnNldENvb2tpZU9iaiA9IGZ1bmN0aW9uIHNldENvb2tpZU9iaihjb29raWVPYmopIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2V0Q29va2llKGNvb2tpZU9iai5rZXksIGNvb2tpZU9iai52YWwpO1xuICAgIH07XG4gICAgXG4gICAgYXRyb3BhLnN1cHBvcnRDaGVjaygnQ29va2llTW9uc3RlcicpO1xufTtcblxuXG5cblxud2hpbGUoYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLmxlbmd0aCA+IDApIHtcbiAgICBhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMucG9wKCkoKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gYXRyb3BhO1xuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2RvY3MvdnNkb2MvT3BlbkxheWVyc0FsbC5qc1wiLz5cbnZhciBhdHJvcGEgPSByZXF1aXJlKCdhdHJvcGEtaGVhZGVyJyk7XG4vKmpzbGludFxuICAgIGluZGVudDogNCxcbiAgICBtYXhlcnI6IDUwLFxuICAgIHdoaXRlOiB0cnVlLFxuICAgIGJyb3dzZXI6IHRydWUsXG4gICAgZGV2ZWw6IHRydWUsXG4gICAgcGx1c3BsdXM6IHRydWUsXG4gICAgcmVnZXhwOiB0cnVlXG4qL1xuLypnbG9iYWwgYXRyb3BhICovXG4vLyBlbmQgaGVhZGVyXG5cbmF0cm9wYS5yZXF1aXJlcyhcbiAgICAnSFRNTFBhcnNlcicsXG4gICAgZnVuY3Rpb24gKCkge1xuICAgICAgICBcInVzZSBzdHJpY3RcIjtcbiAgICAgICAgdmFyIHN1cHBvcnRlZCA9IHRydWU7XG4gICAgICAgIFxuICAgICAgICBbXG4gICAgICAgICAgICBkb2N1bWVudC5pbXBsZW1lbnRhdGlvbi5jcmVhdGVEb2N1bWVudFR5cGUsXG4gICAgICAgICAgICBkb2N1bWVudC5pbXBsZW1lbnRhdGlvbi5jcmVhdGVEb2N1bWVudFxuICAgICAgICBdLmZvckVhY2goZnVuY3Rpb24gKHByZXJlcXVpc2l0ZSkge1xuICAgICAgICAgICAgaWYocHJlcmVxdWlzaXRlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBzdXBwb3J0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBzdXBwb3J0ZWQ7XG4gICAgfVxuKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IEhUTUwgUGFyc2VyPGJyIC8+XG4gKiBDYXJyeSBvdXQgRE9NIG9wZXJhdGlvbnMgd2l0aG91dCBsb2FkaW5nIGNvbnRlbnQgdG8gdGhlIGFjdGl2ZSBkb2N1bWVudC5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAdmVyc2lvbiAyMDEyMDkwOVxuICogQGNsYXNzIENyZWF0ZXMgYSBuZXcgSFRNTCBQYXJzZXJcbiAqIEByZXR1cm5zIHtIVE1MIERPTSBEb2N1bWVudH0gUmV0dXJucyBhIGJsYW5rIEhUTUwgRG9jdW1lbnQgZm9yIHlvdSB0byBsb2FkXG4gKiAgZGF0YSBpbnRvXG4gKiBAcmVxdWlyZXMgYXRyb3BhLmRhdGFcbiAqL1xuYXRyb3BhLkhUTUxQYXJzZXIgPSBmdW5jdGlvbiBIVE1MUGFyc2VyKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIHZhciBteSA9IHRoaXM7XG4gICAgXG4gICAgLyoqXG4gICAgICogSG9sZHMgdGhlIGNyZWF0ZWQgSFRNTCBET00gRG9jdW1lbnQuXG4gICAgICogQHR5cGUgSFRNTCBET00gRG9jdW1lbnRcbiAgICAgKiBAZmllbGRPZiBhdHJvcGEuSFRNTFBhcnNlciNcbiAgICAgKi9cbiAgICB0aGlzLmRvYyA9IHt9O1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBibGFuayBIVE1MIERPTSBEb2N1bWVudC5cbiAgICAgKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAgICAgKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAgICAgKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gICAgICogQHZlcnNpb24gMjAxMjA5MDlcbiAgICAgKiBAbWV0aG9kT2YgYXRyb3BhLkhUTUxQYXJzZXIjXG4gICAgICogQHJldHVybnMge0hUTUwgRE9NIERvY3VtZW50fSBSZXNldHMgdGhlIGRvYyBwcm9wZXJ0eSBvZiB0aGlzIGluc3RhbmNlXG4gICAgICogIGFuZCwgcmV0dXJucyBhIGJsYW5rIEhUTUwgRG9jdW1lbnQgZm9yIHlvdSB0byBsb2FkIGRhdGEgaW50by5cbiAgICAgKi9cbiAgICB0aGlzLm5ld0RvY3VtZW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZHQ7XG4gICAgICAgIGR0ID0gZG9jdW1lbnQuaW1wbGVtZW50YXRpb24uY3JlYXRlRG9jdW1lbnRUeXBlKFxuICAgICAgICAgICAgXCJodG1sXCIsXG4gICAgICAgICAgICBcIi0vL1czQy8vRFREIEhUTUwgNC4wMSBUcmFuc2l0aW9uYWwvL0VOXCIsXG4gICAgICAgICAgICBcImh0dHA6Ly93d3cudzMub3JnL1RSL2h0bWw0L2xvb3NlLmR0ZFwiXG4gICAgICAgICk7XG4gICAgICAgIG15LmRvYyA9IGRvY3VtZW50LmltcGxlbWVudGF0aW9uLmNyZWF0ZURvY3VtZW50KCcnLCAnJywgZHQpO1xuICAgICAgICBpZiAobXkuZG9jLm5vZGVUeXBlICE9PSA5KSB7XG4gICAgICAgICAgICBhdHJvcGEuZGF0YS5IVE1MUGFyc2VyLnN1cHBvcnQgPSAndW5zdXBwb3J0ZWQnO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGF0cm9wYS5kYXRhLkhUTUxQYXJzZXIuZXJyb3IgK1xuICAgICAgICAgICAgICAgICd0aGUgZG9jdW1lbnQgbm9kZVR5cGUgcmV0dXJuZWQgYW4gdW5leHBlY3RlZCB2YWx1ZScpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBteS5kb2M7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IEhUTUwgRE9NIERvY3VtZW50IGFuZCBsb2FkcyB0aGUgZ2l2ZW4gc3RyaW5nIGludG8gaXQuXG4gICAgICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gICAgICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gICAgICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICAgICAqIEB2ZXJzaW9uIDIwMTIwOTA5XG4gICAgICogQG1ldGhvZE9mIGF0cm9wYS5IVE1MUGFyc2VyI1xuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBodG1sc3RyaW5nIGEgc3RyaW5nIG9mIEhUTUwgZGF0YVxuICAgICAqIEByZXR1cm5zIHtIVE1MIERPTSBEb2N1bWVudH0gUmVzZXRzIHRoZSBkb2MgcHJvcGVydHkgb2YgdGhpcyBpbnN0YW5jZSxcbiAgICAgKiBsb2FkaW5nIGEgbmV3IGRvY3VtZW50IHdpdGggdGhlIHN0cmluZyBnaXZlbi5cbiAgICAgKi9cbiAgICB0aGlzLmxvYWRTdHJpbmcgPSBmdW5jdGlvbiAoaHRtbHN0cmluZykge1xuICAgICAgICBpZiAoIWh0bWxzdHJpbmcpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIG15Lm5ld0RvY3VtZW50KCk7XG4gICAgICAgICAgICBteS5kb2MuYXBwZW5kQ2hpbGQobXkuZG9jLmNyZWF0ZUVsZW1lbnQoJ2h0bWwnKSk7XG4gICAgICAgICAgICBteS5kb2MuZG9jdW1lbnRFbGVtZW50LmlubmVySFRNTCA9IGh0bWxzdHJpbmc7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGF0cm9wYS5kYXRhLkhUTUxQYXJzZXIuc3VwcG9ydCA9ICd1bnN1cHBvcnRlZCc7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYXRyb3BhLmRhdGEuSFRNTFBhcnNlci5lcnJvciArXG4gICAgICAgICAgICAgICAgJ2F0cm9wYS5IVE1MUGFyc2VyIGNhbiBub3QgbG9hZCAnICtcbiAgICAgICAgICAgICAgICAndGhlIGhpZGRlbiBkb2N1bWVudCBmcm9tIHN0cmluZyBiZWNhdXNlOiAnICsgZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG15LmRvYztcbiAgICB9O1xuICAgIFxuICAgIGZ1bmN0aW9uIGluaXQgKCkge1xuICAgICAgICB2YXIgZXFUZXN0O1xuICAgICAgICBhdHJvcGEuc3VwcG9ydENoZWNrKCdIVE1MUGFyc2VyJyk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBlcVRlc3QgPSBteS5sb2FkU3RyaW5nKFxuICAgICAgICAgICAgICAgICc8aGVhZD48L2hlYWQ+PGJvZHk+PHA+dGVzdDwvcD48L2JvZHk+J1xuICAgICAgICAgICAgKS5ib2R5LnRleHRDb250ZW50O1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBhdHJvcGEuZGF0YS5IVE1MUGFyc2VyLnN1cHBvcnQgPSAndW5zdXBwb3J0ZWQnO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGF0cm9wYS5kYXRhLkhUTUxQYXJzZXIuZXJyb3IgKyBlKTtcbiAgICAgICAgfVxuICAgICAgICBpZigndGVzdCcgIT09IGVxVGVzdCkge1xuICAgICAgICAgICAgYXRyb3BhLmRhdGEuSFRNTFBhcnNlci5zdXBwb3J0ID0gJ3Vuc3VwcG9ydGVkJztcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihhdHJvcGEuZGF0YS5IVE1MUGFyc2VyLmVycm9yKTtcbiAgICAgICAgfVxuICAgICAgICBteS5uZXdEb2N1bWVudCgpO1xuICAgIH1cbiAgICBcbiAgICBpbml0KCk7XG4gICAgXG59O1xuXG5cblxuXG53aGlsZShhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMubGVuZ3RoID4gMCkge1xuICAgIGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5wb3AoKSgpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBhdHJvcGE7XG4iLCJhcmd1bWVudHNbNF1bNV1bMF0uYXBwbHkoZXhwb3J0cyxhcmd1bWVudHMpIiwiYXJndW1lbnRzWzRdWzExXVswXS5hcHBseShleHBvcnRzLGFyZ3VtZW50cykiLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vZG9jcy92c2RvYy9PcGVuTGF5ZXJzQWxsLmpzXCIvPlxudmFyIGF0cm9wYSA9IHJlcXVpcmUoJ2F0cm9wYS1oZWFkZXInKTtcbmF0cm9wYS5BcmdzSW5mbyA9IHJlcXVpcmUoJ2F0cm9wYS1BcmdzSW5mbycpLkFyZ3NJbmZvO1xuLypqc2xpbnRcbiAgICBpbmRlbnQ6IDQsXG4gICAgbWF4ZXJyOiA1MCxcbiAgICB3aGl0ZTogdHJ1ZSxcbiAgICBicm93c2VyOiB0cnVlLFxuICAgIGRldmVsOiB0cnVlLFxuICAgIHBsdXNwbHVzOiB0cnVlLFxuICAgIHJlZ2V4cDogdHJ1ZVxuKi9cbi8qZ2xvYmFsIGF0cm9wYSAqL1xuLy8gZW5kIGhlYWRlclxuXG4oZnVuY3Rpb24gKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIGF0cm9wYS5yZXF1aXJlcyhcbiAgICAgICAgJ1JlcXVlc3RlcicsXG4gICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBzdXBwb3J0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgYXRyb3BhLkFyZ3NJbmZvLFxuICAgICAgICAgICAgICAgIFhNTEh0dHBSZXF1ZXN0XG4gICAgICAgICAgICBdLmZvckVhY2goZnVuY3Rpb24gKHByZXJlcXVpc2l0ZSkge1xuICAgICAgICAgICAgICAgIGlmKHByZXJlcXVpc2l0ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHN1cHBvcnRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHN1cHBvcnRlZDtcbiAgICAgICAgfVxuICAgICk7XG59KCkpO1xuXG4vKipcbiAqIFRoaXMgcmVwcmVzZW50cyBhbiBYTUxIdHRwUmVxdWVzdC5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAdmVyc2lvbiAyMDEzMDMxMVxuICogQGNsYXNzIFRoaXMgcmVwcmVzZW50cyBhbiBYTUxIdHRwUmVxdWVzdC5cbiAqIEByZXR1cm5zIHtSZXF1ZXN0ZXJ9IFJldHVybnMgYSByZXF1ZXN0ZXIgb2JqZWN0LlxuICogQHJlcXVpcmVzIGF0cm9wYS5BcmdzSW5mbyNjaGVja0FyZ1R5cGVzXG4gKiBAZXhhbXBsZVxuICogdmFyIHJlcXVlc3RlciwgZm9ybURhdGE7XG4gKiBcbiAqIHJlcXVlc3RlciA9IG5ldyBhdHJvcGEuUmVxdWVzdGVyKCk7XG4gKiByZXF1ZXN0ZXIudGltZW91dCA9IDEwMDAwOyAvLyByZXF1ZXN0cyB3aWxsIGFib3J0IGFmdGVyIDEwIHNlY29uZHMuXG4gKiByZXF1ZXN0ZXIucmVxdWVzdEhlYWRlcnMgPSB7XG4gKiAgICAgXCJhSGVhZGVyXCIgOiBcImhlYWRlclZhbHVlXCIsXG4gKiAgICAgXCJhbm90aGVySGVhZGVyXCIgOiBcImFuZFZhbHVlXCJcbiAqIH07XG4gKiBcbiAqIGZ1bmN0aW9uIHNob3dSZXF1ZXN0UmVzdWx0cyhzdGF0dXMsIHJlcXVlc3QpIHtcbiAqICAgICBjb25zb2xlLmxvZyhcIlN0YXR1czogJyArIHN0YXR1cyk7XG4gKiAgICAgY29uc29sZS5kaXIocmVxdWVzdCk7IC8vIGNvbnNvbGUgZGlyIG1heSBvciBtYXkgbm90XG4gKiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGJlIHN1cHBvcnRlZCBpbiB5b3VyIGVudmlyb25tZW50LlxuICogfVxuICogXG4gKiBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICogZm9ybURhdGEuYXBwZW5kKCdhRm9ybUZpZWxkTmFtZScsICdmb3JtRmllbGREYXRhJyk7XG4gKiBmb3JtRGF0YS5hcHBlbmQoJ2Fub3RoZXJGb3JtRmllbGROYW1lJywgJ2FuZERhdGEnKTtcbiAqIFxuICogcmVxdWVzdGVyLm1ha2VSZXF1ZXN0KFxuICogICAgIFwicG9zdFwiLCBcImh0dHA6Ly9leGFtcGxlLmNvbVwiLCBmb3JtRGF0YSwgc2hvd1JlcXVlc3RSZXN1bHRzKTtcbiAqL1xuYXRyb3BhLlJlcXVlc3RlciA9IGZ1bmN0aW9uIFJlcXVlc3RlcigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICBhdHJvcGEuc3VwcG9ydENoZWNrKCdSZXF1ZXN0ZXInKTtcbiAgICB2YXIgZXhwQXJnVHlwZXMsXG4gICAgICAgIGNoZWNrUmVxdWVzdCxcbiAgICAgICAgcmVxdWVzdDtcbiAgICBcbiAgICAvKipcbiAgICAgKiBDb250YWluZXIgb2JqZWN0IGZvciB0aGUgZXhwZWN0ZWQgYXJndW1lbnQgdHlwZXNcbiAgICAgKiBzdXBwbGllZCB0byB0aGlzLm1ha2VSZXF1ZXN0LlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHR5cGUgRXhwZWN0ZWQgQXJnIFR5cGVzXG4gICAgICogQGZpZWxkT2YgYXRyb3BhLlJlcXVlc3Rlci1cbiAgICAgKi9cbiAgICBleHBBcmdUeXBlcyA9IHt9O1xuICAgIGV4cEFyZ1R5cGVzLnJlcXVlc3RXaXRoTWVzc2FnZSA9IFsnc3RyaW5nJywgJ3N0cmluZycsICdzdHJpbmcnLCAnZnVuY3Rpb24nXTtcbiAgICBleHBBcmdUeXBlcy5yZXF1ZXN0TnVsbE1lc3NhZ2UgPSBbJ3N0cmluZycsICdzdHJpbmcnLCAnb2JqZWN0JywgJ2Z1bmN0aW9uJ107XG4gICAgXG4gICAgLyoqXG4gICAgICogVXNlZCB0byBjaGVjayB0aGUgYXJndW1lbnRzIHR5cGVzIHN1cHBsaWVkIHRvIHRoaXMubWFrZVJlcXVlc3QuXG4gICAgICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gICAgICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gICAgICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICAgICAqIEB2ZXJzaW9uIDIwMTIwOTA5XG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAbWV0aG9kT2YgYXRyb3BhLlJlcXVlc3Rlci1cbiAgICAgKiBAcGFyYW0ge0FyZ3VtZW50c30gYXJncyBBbiBhcmd1bWVudHMgYXJyYXlcbiAgICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIGFyZ3MgdHlwZXMgbWF0Y2ggdGhlXG4gICAgICogZXhwZWN0ZWQgdHlwZXMuXG4gICAgICogQHJlcXVpcmVzIGF0cm9wYS5BcmdzSW5mbyNjaGVja0FyZ1R5cGVzXG4gICAgICovXG4gICAgY2hlY2tSZXF1ZXN0ID0gZnVuY3Rpb24gKGFyZ3MpIHtcbiAgICAgICAgdmFyIGNoZWNrZXI7XG4gICAgICAgIGNoZWNrZXIgPSBuZXcgYXRyb3BhLkFyZ3NJbmZvKCk7XG4gICAgICAgIGNoZWNrZXIuc2V0RXhwZWN0ZWRBcmdUeXBlcyhleHBBcmdUeXBlcyk7XG4gICAgICAgIHJldHVybiBjaGVja2VyLmNoZWNrQXJnVHlwZXMoYXJncyk7XG4gICAgfTtcbiAgICBcbiAgICAvKipcbiAgICAgKiBPYmplY3Qgd2hvc2UgcHJvcGVydGllcyBhbmQgdmFsdWVzIGFyZSBoZWFkZXIgbmFtZXMgYW5kIHZhbHVlc1xuICAgICAqICByZXNwZWN0aXZlbHkuXG4gICAgICogQHR5cGUgT2JqZWN0XG4gICAgICogQGZpZWxkT2YgYXRyb3BhLlJlcXVlc3RlciNcbiAgICAgKi9cbiAgICB0aGlzLnJlcXVlc3RIZWFkZXJzID0ge307XG4gICAgXG4gICAgXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSB0aW1lb3V0IHZhbHVlIGZvciB0aGUgcmVxdWVzdCBpbiBtaWxsaXNlY29uZHMuIFRoZSByZXF1ZXN0IHdpbGxcbiAgICAgKiAgYWJvcnQgYWZ0ZXIgdGhpcyBhbW91bnQgb2YgdGltZSBoYXMgcGFzc2VkLlxuICAgICAqIEB0eXBlIE51bWJlclxuICAgICAqIEBmaWVsZE9mIGF0cm9wYS5SZXF1ZXN0ZXIjXG4gICAgICovXG4gICAgdGhpcy50aW1lb3V0ID0gMzAwMDA7XG4gICAgXG4gICAgLyoqXG4gICAgICogWE1MSHR0cFJlcXVlc3Qgb2JqZWN0IHVzZWQgYnkgUmVxdWVzdGVyLlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHR5cGUgWE1MSHR0cFJlcXVlc3RcbiAgICAgKiBAZmllbGRPZiBhdHJvcGEuUmVxdWVzdGVyLVxuICAgICAqL1xuICAgIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICByZXF1ZXN0LmFib3J0ZWQgPSBmYWxzZTtcbiAgICByZXF1ZXN0LmFib3J0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJlcXVlc3QuYWJvcnRlZCA9IHRydWU7XG4gICAgICAgIFhNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZS5hYm9ydC5jYWxsKHRoaXMpO1xuICAgIH07XG4gICAgXG4gICAgLyoqXG4gICAgICogTWFrZXMgYW4gQUpBWCByZXF1ZXN0LlxuICAgICAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICAgICAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICAgICAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAgICAgKiBAdmVyc2lvbiAyMDEzMDMxMVxuICAgICAqIEBtZXRob2RPZiBhdHJvcGEuUmVxdWVzdGVyI1xuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBtZXRob2QgVGhlIEhUVFAgbWV0aG9kIHRvIGJlIHVzZWQgZm9yIHRoaXMgcmVxdWVzdC5cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdXJsIFRoZSBVUkwgdG8gc2VuZCB0aGUgcmVxdWVzdCB0by5cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZUJvZHkgVGhlIGJvZHkgb2YgdGhlIHJlcXVlc3QuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGNhbGxiYWNrIFRoZSBjYWxsYmFjayBmdW5jdGlvbiB0byBleGVjdXRlXG4gICAgICogIHdoZW4gcmVhZHlTdGF0ZSBpcyA0LiBUaGUgY2FsbGJhY2sgaXMgc3VwcGxpZWQgd2l0aCB0d28gYXJndW1lbnRzLiBUaGVcbiAgICAgKiAgZmlyc3QgYXJndW1lbnQgaXMgYSBib29sZWFuIGluZGljYXRpbmcgd2hldGhlciBvciBub3QgdGhlIGh0dHAgc3RhdHVzXG4gICAgICogIHdhcyAyMDAuIFRoZSBzZWNvbmQgYXJndW1lbnQgaXMgdGhlIHJlcXVlc3Qgb2JqZWN0LlxuICAgICAqIEB0aHJvd3MgYXRyb3BhLlJlcXVlc3Rlci5tYWtlUmVxdWVzdCB1bmV4cGVjdGVkIGFyZ3VtZW50IHR5cGVcbiAgICAgKi9cbiAgICB0aGlzLm1ha2VSZXF1ZXN0ID0gZnVuY3Rpb24gKG1ldGhvZCwgdXJsLCBtZXNzYWdlQm9keSwgY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIGhkcjtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNoZWNrUmVxdWVzdChhcmd1bWVudHMpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2F0cm9wYS5SZXF1ZXN0ZXIubWFrZVJlcXVlc3QgdW5leHBlY3RlZCAnICtcbiAgICAgICAgICAgICAgICAnYXJndW1lbnQgdHlwZScpO1xuICAgICAgICB9XG4gICAgICAgIHJlcXVlc3QuYWJvcnRlZCA9IGZhbHNlO1xuICAgICAgICByZXF1ZXN0Lm9wZW4obWV0aG9kLCB1cmwsIHRydWUpO1xuICAgICAgICBmb3IgKGhkciBpbiB0aGlzLnJlcXVlc3RIZWFkZXJzKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5yZXF1ZXN0SGVhZGVycy5oYXNPd25Qcm9wZXJ0eShoZHIpKSB7XG4gICAgICAgICAgICAgICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKGhkciwgdGhpcy5yZXF1ZXN0SGVhZGVyc1toZHJdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEV2ZW50IGxpc3RlbmVyIGZ1bmN0aW9uIGZvciB0aGUgQUpBWCByZXF1ZXN0LlxuICAgICAgICAgKiBUaGlzIGlzIHdoYXQgYWN0dWFsbHkgZmlyZXMgdGhlIGNhbGxiYWNrIHN1cHBsaWVkXG4gICAgICAgICAqIHRvIG1ha2VSZXF1ZXN0LlxuICAgICAgICAgKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAgICAgICAgICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gICAgICAgICAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAgICAgICAgICogQHZlcnNpb24gMjAxMjA5MDlcbiAgICAgICAgICogQG1ldGhvZE9mIGF0cm9wYS5SZXF1ZXN0ZXItcmVxdWVzdFxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgcmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAocmVxdWVzdC5yZWFkeVN0YXRlID09PSA0KSB7XG4gICAgICAgICAgICAgICAgaWYgKHJlcXVlc3Quc3RhdHVzID09PSAyMDApIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sodHJ1ZSwgcmVxdWVzdCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soZmFsc2UsIHJlcXVlc3QpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcmVxdWVzdC5zZW5kKG1lc3NhZ2VCb2R5KTtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAocmVxdWVzdC5hYm9ydGVkID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHJlcXVlc3QuYWJvcnQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdGhpcy50aW1lb3V0KTtcbiAgICB9O1xufTtcblxuXG5cblxud2hpbGUoYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLmxlbmd0aCA+IDApIHtcbiAgICBhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMucG9wKCkoKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gYXRyb3BhO1xuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2RvY3MvdnNkb2MvT3BlbkxheWVyc0FsbC5qc1wiLz5cbnZhciBhdHJvcGEgPSByZXF1aXJlKCdhdHJvcGEtaGVhZGVyJyk7XG5hdHJvcGEuUmVxdWVzdGVyID0gcmVxdWlyZSgnYXRyb3BhLVJlcXVlc3RlcicpLlJlcXVlc3RlcjtcbmF0cm9wYS5IVE1MUGFyc2VyID0gcmVxdWlyZSgnYXRyb3BhLUhUTUxQYXJzZXInKS5IVE1MUGFyc2VyO1xuLypqc2xpbnRcbiAgICBpbmRlbnQ6IDQsXG4gICAgbWF4ZXJyOiA1MCxcbiAgICB3aGl0ZTogdHJ1ZSxcbiAgICBicm93c2VyOiB0cnVlLFxuICAgIGRldmVsOiB0cnVlLFxuICAgIHBsdXNwbHVzOiB0cnVlLFxuICAgIHJlZ2V4cDogdHJ1ZVxuKi9cbi8qZ2xvYmFsIGF0cm9wYSAqL1xuLy8gZW5kIGhlYWRlclxuXG5hdHJvcGEucmVxdWlyZXMoXG4gICAgJ0NyZWF0ZUh0bWxEb2N1bWVudHNGcm9tWG1saHR0cCcsXG4gICAgZnVuY3Rpb24gKCkge1xuICAgICAgICBcInVzZSBzdHJpY3RcIjtcbiAgICAgICAgdmFyIHN1cHBvcnRlZCA9IHRydWU7XG4gICAgICAgIFxuICAgICAgICBbXG4gICAgICAgICAgICBhdHJvcGEuUmVxdWVzdGVyLFxuICAgICAgICAgICAgYXRyb3BhLkhUTUxQYXJzZXJcbiAgICAgICAgXS5mb3JFYWNoKGZ1bmN0aW9uIChwcmVyZXF1aXNpdGUpIHtcbiAgICAgICAgICAgIGlmKHByZXJlcXVpc2l0ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgc3VwcG9ydGVkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gc3VwcG9ydGVkO1xuICAgIH1cbik7XG5cbi8qKlxuICogQ3JlYXRlcyBIVE1MIERPTSBEb2N1bWVudHMgZnJvbSBhbiBYTUxIdHRwUmVxdWVzdCBvYmplY3QuXG4gKiAgVGhpcyB3YXMgdGVzdGVkIG9uIEZpcmVmb3gsIGl0IGRvZXNuJ3Qgd29yayBvbiBnb29nbGUgY2hyb21lLlxuICogIFlvdXIgbWlsZWFnZSBtYXkgdmFyeS5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAdmVyc2lvbiAyMDEzMDIyNVxuICogQGNsYXNzIENyZWF0ZXMgSFRNTCBET00gRG9jdW1lbnRzIGZyb20gYW4gWE1MSHR0cFJlcXVlc3Qgb2JqZWN0LlxuICogQHJlcXVpcmVzIGF0cm9wYS5SZXF1ZXN0ZXJcbiAqIEByZXF1aXJlcyBhdHJvcGEuSFRNTFBhcnNlclxuICogQHJlcXVpcmVzIGF0cm9wYS5kYXRhXG4gKiBAZXhhbXBsZVxuICogdmFyIG1ldGhvZCwgdXJsLCBjYWxsYmFjaywgZG9jcztcbiAqIFxuICogLy8gSFRUUCBSZXF1ZXN0IG1ldGhvZFxuICogbWV0aG9kID0gJ2dldCc7XG4gKiBcbiAqIC8vIHRoZSBwYWdlIHRvIGZldGNoLCB0aGlzIHBhZ2UgbXVzdCBiZSBhY2Nlc3NpYmxlXG4gKiAvLyBzZWN1cml0eSByZXN0cmljdGlvbnMgbWF5IGFwcGx5XG4gKiB1cmwgPSAnZG9jcy9qc2RvYy9zeW1ib2xzL2F0cm9wYS54cGF0aC5odG1sJztcbiAqIFxuICogLy8gdGhlIGNhbGxiYWNrIGZ1bnRpb24gZm9yIHdoZW4gYSBuZXcgZG9jdW1lbnQgaXMgY3JlYXRlZFxuICogY2FsbGJhY2sgPSBmdW5jdGlvbiBuZXdEb2N1bWVudEhhbmRsZXIoZG9jcmVmKSB7XG4gKiAgICAgdHJ5IHtcbiAqICAgICAgICAgaWYgKGZhbHNlID09PSBkb2NyZWYpIHtcbiAqICAgICAgICAgICAgIC8vIGlmIHRoZSBkb2N1bWVudCBjb3VsZCBub3QgYmUgY3JlYXRlZCB0aHJvdyBhbiBlcnJvclxuICogICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdhdHJvcGEuQ3JlYXRlSHRtbERvY3VtZW50c0Zyb21YbWxodHRwICcgK1xuICogICAgICAgICAgICAgICAgICAnQ291bGQgbm90IGNyZWF0ZSBoaWRkZW4gZG9jdW1lbnQnKTtcbiAqICAgICAgICAgfSBlbHNlIHtcbiAqICAgICAgICAgICAgIC8vIGlmIHRoZSBkb2N1bWVudCBjb3VsZCBiZSBjcmVhdGVkIHdlJ2xsIHRyeSB0byB1c2UgaXRcbiAqICAgICAgICAgICAgIGlmKGRvY3JlZi5nZXRFbGVtZW50QnlJZCgnaW5kZXgnKSkge1xuICogICAgICAgICAgICAgICAgIC8vIGlmIHRoZSBkb2N1bWVudCBjb3VsZCBiZSB1c2VkIHRoZW5cbiAqICAgICAgICAgICAgICAgICAvLyBkbyBzb21ldGhpbmcgdXNlZnVsIHdpdGggaXQuXG4gKiAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3N1Y2Nlc3MhJyk7XG4gKiAgICAgICAgICAgICB9IGVsc2Uge1xuICogICAgICAgICAgICAgICAgIC8vIGlmIHRoZSBkb2N1bWVudCBjYW4gbm90IGJlIHVzZWQgdGhyb3cgYW4gZXJyb3JcbiAqICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2F0cm9wYS5DcmVhdGVIdG1sRG9jdW1lbnRzRnJvbVhtbGh0dHAgJyArXG4gKiAgICAgICAgICAgICAgICAgICAgICAnY291bGQgbm90IHVzZSB0aGUgaGlkZGVuIGRvY3VtZW50Jyk7XG4gKiAgICAgICAgICAgICB9XG4gKiAgICAgICAgIH1cbiAqICAgICB9IGNhdGNoIChlKSB7XG4gKiAgICAgICAgIC8vIGNhdGNoaW5nIGFueSBlcnJvcnMgdGhyb3duIGFuZCBoYW5kbGUgdGhlbS5cbiAqICAgICB9XG4gKiAgICAgLy8gQXQgdGhpcyBwb2ludCB0aGUgd29yayB3aXRoIHRoZSBkb2N1bWVudCBpcyBjdXJyZW50bHkgZmluaXNoZWRcbiAqICAgICAvLyB0aGUgZG9jdW1lbnQgd2lsbCBsaXZlIGluIHRoZSBkb2N1bWVudFF1ZXVlIGluIGNhc2UgeW91IG5lZWQgaXRcbiAqICAgICAvLyBsYXRlci4gVGhpcyBpcyB3aGVuIHlvdSB3aWxsIHRyaWdnZXIgYW55IGZ1bmN0aW9uIHdoaWNoIGRlcGVuZHNcbiAqICAgICAvLyBvbiB0aGlzIGhpZGRlbiBkb2N1bWVudCBoYXZpbmcgYmVlbiBjcmVhdGVkLlxuICogICAgIHNob3dEb2N1bWVudFF1ZXVlKCk7XG4gKiB9O1xuICogXG4gKiBmdW5jdGlvbiBzaG93RG9jdW1lbnRRdWV1ZSgpIHtcbiAqICAgICBjb25zb2xlLmRpcihkb2NzLmRvY3VtZW50UXVldWUpO1xuICogfVxuICogXG4gKiAvLyBjcmVhdGUgYW4gaW5zdGFuY2Ugb2YgdGhlIGNsYXNzXG4gKiBkb2NzID0gbmV3IGF0cm9wYS5DcmVhdGVIdG1sRG9jdW1lbnRzRnJvbVhtbGh0dHAoKTtcbiAqIC8vIHRyeSB0byBjcmVhdGUgYSBuZXcgaGlkZGVuIGRvY3VtZW50XG4gKiBkb2NzLm5ld0RvY3VtZW50KG1ldGhvZCwgdXJsLCBudWxsLCBjYWxsYmFjayk7XG4gKi9cbmF0cm9wYS5DcmVhdGVIdG1sRG9jdW1lbnRzRnJvbVhtbGh0dHAgPSBmdW5jdGlvbiBDcmVhdGVIdG1sRG9jdW1lbnRzRnJvbVhtbGh0dHAoXG4pIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICB2YXIgcmVxdWVzdGVyLFxuICAgIGh0bWxkb2N1bWVudCxcbiAgICB0aGF0O1xuICAgIHRoYXQgPSB0aGlzO1xuICAgIC8qKlxuICAgICAqIFF1ZXVlIG9mIGRvY3VtZW50cyBjcmVhdGVkIGJ5IHRoaXMgaW5zdGFuY2UuXG4gICAgICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gICAgICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gICAgICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICAgICAqIEB2ZXJzaW9uIDIwMTIwOTA5XG4gICAgICogQHR5cGUgQXJyYXlcbiAgICAgKiBAZmllbGRPZiBhdHJvcGEuQ3JlYXRlSHRtbERvY3VtZW50c0Zyb21YbWxodHRwI1xuICAgICAqL1xuICAgIHRoaXMuZG9jdW1lbnRRdWV1ZSA9IFtdO1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW4gSFRNTCBET00gRG9jdW1lbnQgYW5kIHB1dHMgaXQgaW4gdGhlIGRvY3VtZW50XG4gICAgICogIHF1ZXVlLCB0aGVuIGV4ZWN1dGVzIHRoZSBjYWxsYmFjayBnaXZlbi4gTm90ZSwgdGhpcyBkb2VzXG4gICAgICogIG5vdCB3b3JrIG9uIGdvb2dsZSBjaHJvbWUuXG4gICAgICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gICAgICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gICAgICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICAgICAqIEB2ZXJzaW9uIDIwMTIwOTA5XG4gICAgICogQG1ldGhvZE9mIGF0cm9wYS5DcmVhdGVIdG1sRG9jdW1lbnRzRnJvbVhtbGh0dHAjXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG1ldGhvZCBBbnkgdmFsaWQgbWV0aG9kIHRvIGJlIHVzZWQgaW5cbiAgICAgKiBhbiBYTUxIdHRwUmVxdWVzdC5cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdXJsIFRoZSBsb2NhdGlvbiBvZiB0aGUgZG9jdW1lbnQncyBzb3VyY2UuXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VCb2R5IG51bGwsIG9yIGEgbWVzc2FnZSBib2R5LlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIFRoZSBmdW5jdGlvbiB0byBleGVjdXRlIHVwb25cbiAgICAgKiByZXF1ZXN0IGNvbXBsZXRpb24uIFRoaXMgZnVuY3Rpb24gd2lsbCBiZSBnaXZlbiBlaXRoZXJcbiAgICAgKiBhbiBIVE1MIERPTSBEb2N1bWVudCBvciBmYWxzZS5cbiAgICAgKiBAcmV0dXJucyB7SFRNTCBET00gRG9jdW1lbnQsIGZhbHNlfSBUaGUgcmV0dXJuIHZhbHVlIGlzXG4gICAgICogZ2l2ZW4gdG8gdGhlIGNhbGxiYWNrIGZ1bmN0aW9uLlxuICAgICAqL1xuICAgIHRoaXMubmV3RG9jdW1lbnQgPSBmdW5jdGlvbiBuZXdEb2N1bWVudChcbiAgICAgICAgbWV0aG9kLCB1cmwsIG1lc3NhZ2VCb2R5LCBjYWxsYmFja1xuICAgICkge1xuICAgICAgICB2YXIgY2I7XG4gICAgICAgIC8qXG4gICAgICAgICAqIEludGVybmFsIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIHByb2Nlc3MgZGF0YSBmcm9tIFhNTEh0dHBSZXF1ZXN0XG4gICAgICAgICAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICAgICAgICAgKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAgICAgICAgICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICAgICAgICAgKiBAdmVyc2lvbiAyMDEyMDkwOVxuICAgICAgICAgKiBAbWV0aG9kT2YgYXRyb3BhLkNyZWF0ZUh0bWxEb2N1bWVudHNGcm9tWG1saHR0cCNuZXdEb2N1bWVudC1cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICogQHByb3BlcnR5IHt0cnVlLGZhbHNlfSBib29sU3RhdHVzIFRoaXMgdGVsbHMgd2hldGhlciBvciBub3QgdGhlXG4gICAgICAgICAqICBYTUxIdHRwUmVxdWVzdCB3YXMgc3VjY2Vzc2Z1bC5cbiAgICAgICAgICogQHByb3BlcnR5IHtYTUxIdHRwIFJlc3BvbnNlIE9iamVjdH0gcmVzcG9uc2VPYmplY3QgVGhpcyBpcyB0aGVcbiAgICAgICAgICogIHJlc3BvbnNlIG9iamVjdCBmcm9tIHRoZSBYTUxIdHRwIFJlcXVlc3Qgb2JqZWN0LlxuICAgICAgICAgKi9cbiAgICAgICAgY2IgPSBmdW5jdGlvbiAoYm9vbFN0YXR1cywgcmVzcG9uc2VPYmplY3QpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmIChib29sU3RhdHVzID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGZhbHNlICE9PSBodG1sZG9jdW1lbnQubG9hZFN0cmluZyhcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2VPYmplY3QucmVzcG9uc2VUZXh0KSlcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGh0bWxkb2N1bWVudC5kb2M7XG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZG9jdW1lbnRRdWV1ZS5wdXNoKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBib29sU3RhdHVzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FsbGJhY2socmVzdWx0KTtcbiAgICAgICAgfTtcbiAgICAgICAgcmVxdWVzdGVyLm1ha2VSZXF1ZXN0KG1ldGhvZCwgdXJsLCBtZXNzYWdlQm9keSwgY2IpO1xuICAgIH07XG4gICAgXG4gICAgXG4gICAgZnVuY3Rpb24gaW5pdCAoKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhdHJvcGEuc3VwcG9ydENoZWNrKCdDcmVhdGVIdG1sRG9jdW1lbnRzRnJvbVhtbGh0dHAnKTtcbiAgICAgICAgICAgIHJlcXVlc3RlciA9IG5ldyBhdHJvcGEuUmVxdWVzdGVyKCk7XG4gICAgICAgICAgICBodG1sZG9jdW1lbnQgPSBuZXcgYXRyb3BhLkhUTUxQYXJzZXIoKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgYXRyb3BhLmRhdGEuQ3JlYXRlSHRtbERvY3VtZW50c0Zyb21YbWxodHRwLnN1cHBvcnQgPSAndW5zdXBwb3J0ZWQnO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGF0cm9wYS5kYXRhLkNyZWF0ZUh0bWxEb2N1bWVudHNGcm9tWG1saHR0cC5lcnJvcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgaW5pdCgpO1xufTtcblxuXG5cblxud2hpbGUoYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLmxlbmd0aCA+IDApIHtcbiAgICBhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMucG9wKCkoKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gYXRyb3BhO1xuIiwiYXJndW1lbnRzWzRdWzVdWzBdLmFwcGx5KGV4cG9ydHMsYXJndW1lbnRzKSIsImFyZ3VtZW50c1s0XVsxMV1bMF0uYXBwbHkoZXhwb3J0cyxhcmd1bWVudHMpIiwiYXJndW1lbnRzWzRdWzM5XVswXS5hcHBseShleHBvcnRzLGFyZ3VtZW50cykiLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vZG9jcy92c2RvYy9PcGVuTGF5ZXJzQWxsLmpzXCIvPlxudmFyIGF0cm9wYSA9IHJlcXVpcmUoJ2F0cm9wYS1oZWFkZXInKTtcbi8qanNsaW50IFxuICAgIGluZGVudDogNCxcbiAgICBtYXhlcnI6IDUwLFxuICAgIHdoaXRlOiB0cnVlLFxuICAgIGJyb3dzZXI6IHRydWUsXG4gICAgZGV2ZWw6IHRydWUsXG4gICAgcGx1c3BsdXM6IHRydWUsXG4gICAgcmVnZXhwOiB0cnVlXG4qL1xuLypnbG9iYWwgYXRyb3BhICovXG4vLyBlbmQgaGVhZGVyXG5cbi8qKlxuICogQSBwb2xsaW5nIGNsYXNzIGRlc2lnbmVkIGZvciBleGVjdXRpbmcgbG9uZyBydW5uaW5nIHByb2Nlc3NlcyB0aGF0IHJldHVyblxuICogIG5vdGhpbmcgYW5kIGhhdmUgbm8gY2FsbGJhY2sgcGFyYW1ldGVyLlxuICogQGNsYXNzIEEgcG9sbGluZyBjbGFzcyBkZXNpZ25lZCBmb3IgZXhlY3V0aW5nIGxvbmcgcnVubmluZyBwcm9jZXNzZXMgdGhhdFxuICogIHJldHVybiBub3RoaW5nIGFuZCBoYXZlIG5vIGNhbGxiYWNrIHBhcmFtZXRlci5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAdmVyc2lvbiAyMDEzMDIyMFxuICogQHBhcmFtIHtTdHJpbmd9IGFjdG9yTmFtZSBUaGUgbmFtZSBmb3IgdGhlIFNlcmlhbEFjdG9yIGluc3RhbmNlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gYWN0b3JGdW5jdGlvbiBUaGUgZnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZVxuICogIFNlcmlhbEFjdG9yIGlzIGZyZWUuIFRoaXMgZnVuY3Rpb24gbXVzdCBjYWxsIHRoZSA8Y29kZT5mcmVlPC9jb2RlPiBmdW5jdGlvblxuICogIHdoZW4gaXQgaXMgZmluaXNoZWQgaW4gb3JkZXIgdG8gYWxsb3cgdGhlIGFjdG9yIHRvIGNvbnRpbnVlLlxuICogQHJldHVybnMge2F0cm9wYS5TZXJpYWxBY3Rvcn0gUmV0dXJucyBhbiA8Y29kZT5hdHJvcGEuU2VyaWFsQWN0b3I8L2NvZGU+XG4gKiAgaW5zdGFuY2UuXG4gKiBAZXhhbXBsZVxuICogZnVuY3Rpb24gZHVtbXlBY3Rvcigpe1xuICogICAgIHZhciB0aGF0ID0gdGhpcztcbiAqICAgICBjb25zb2xlLmxvZygnYWN0b3JGdW5jdGlvbiB3b3VsZCBleGVjdXRlJyk7XG4gKiAgICAgY29uc29sZS5sb2coJ2ZyZWVpbmcgJyArIHRoaXMubmFtZSArICcgaW4gMTAwMDAgbXMnKTtcbiAqICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7dGhhdC5mcmVlKCk7fSwgMTAwMDApO1xuICogfTtcbiAqIHZhciBhY3RvciA9IG5ldyBhdHJvcGEuU2VyaWFsQWN0b3IoJ2R1bW15JywgZHVtbXlBY3Rvcik7XG4gKiAgICAgLy8gY2hhbmdlIHRoZSBuYW1lIG9mIHRoZSBhY3RvciBmcm9tXG4gKiAgICAgLy8gZHVtbXkgdG8gYXdlc29tZVxuICogYWN0b3IubmFtZSA9IFwiYXdlc29tZVwiO1xuICogICAgIC8vIHNldCB0aGUgcG9sbGluZyBpbnRlcnZhbCAobWlsbGlzZWNvbmRzKVxuICogYWN0b3IuaW50ZXJ2YWwgPSAzMDAwO1xuICogICAgIC8vIHNldCB0aGUgYmxvY2tpbmcgdGltZW91dCB2YWx1ZSAobWlsbGlzZWNvbmRzKVxuICogYWN0b3IuYmxvY2tUaW1lb3V0VmFsdWUgPSAxMjAwMDA7XG4gKiAgICAgLy8gc3RhcnQgcG9sbGluZ1xuICogYWN0b3Iuc3RhcnQoKTtcbiAqICAgICAvLyBkeW5hbWljYWxseSBjaGFuZ2UgdGhlIFNlcmlhbEFjdG9yXG4gKiBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gKiAgICAgLy8gY2hhbmdlIHRoZSBwb2xsaW5nIGludGVydmFsXG4gKiAgICAgLy8gd2hpbGUgdGhlIFNlcmlhbEFjdG9yIGlzIHJ1bm5pbmcuXG4gKiAgICAgYWN0b3IuY2hhbmdlSW50ZXJ2YWwoMjAwMCk7XG4gKiAgICAgICAgIC8vIGNoYW5nZSB0aGUgYWN0b3IgZnVuY3Rpb25cbiAqICAgICBhY3Rvci5hY3RvckZ1bmN0aW9uID0gZnVuY3Rpb24oKSB7XG4gKiAgICAgICAgIGNvbnNvbGUubG9nKCduZXcgYWN0b3JGdW5jdGlvbiBleGVjdXRpbmcnKTtcbiAqICAgICAgICAgY29uc29sZS5sb2coJ2ZyZWVpbmcgJyArIHRoaXMubmFtZSArICcgaW1tZWRpYXRlbHknKTtcbiAqICAgICAgICAgdGhpcy5mcmVlKCk7XG4gKiAgICAgfTtcbiAqIH0sMTAwMDApO1xuICovXG5hdHJvcGEuU2VyaWFsQWN0b3IgPSBmdW5jdGlvbihhY3Rvck5hbWUsIGFjdG9yRnVuY3Rpb24pIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICB2YXIgdGhhdCwgZHVtbXlBY3RvcjtcbiAgICAvKipcbiAgICAgKiBSZWZlcmVuY2UgdG8gPGNvZGU+dGhpczwvY29kZT5cbiAgICAgKiBAZmllbGRPZiBhdHJvcGEuU2VyaWFsQWN0b3ItXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAqL1xuICAgIHRoYXQgPSB0aGlzO1xuICAgIC8qKlxuICAgICAqIERlZmF1bHQgYWN0b3JGdW5jdGlvblxuICAgICAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICAgICAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICAgICAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAgICAgKiBAdmVyc2lvbiAyMDEzMDIyMFxuICAgICAqIEBtZXRob2RPZiBhdHJvcGEuU2VyaWFsQWN0b3ItXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAc2VlIGF0cm9wYS5TZXJpYWxBY3RvciNhY3RvckZ1bmN0aW9uXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBkdW1teUFjdG9yID0gZnVuY3Rpb24oKXtcbiAgICAgKiAgICAgY29uc29sZS5sb2coJ2FjdG9yRnVuY3Rpb24gd291bGQgZXhlY3V0ZScpO1xuICAgICAqICAgICBjb25zb2xlLmxvZygnZnJlZWluZyBTZXJpYWwgQWN0b3IgaW4gMTAwMDAgbXMnKTtcbiAgICAgKiAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe3RoYXQuZnJlZSgpO30sIDEwMDAwKTtcbiAgICAgKiB9O1xuICAgICAqL1xuICAgIGR1bW15QWN0b3IgPSBmdW5jdGlvbigpe1xuICAgICAgICBjb25zb2xlLmxvZygnYWN0b3JGdW5jdGlvbiB3b3VsZCBleGVjdXRlJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdmcmVlaW5nIFNlcmlhbCBBY3RvciBpbiAxMDAwMCBtcycpO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7dGhhdC5mcmVlKCk7fSwgMTAwMDApO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogVGhlIG5hbWUgb2YgdGhpcyBpbnN0YW5jZS4gRGVmYXVsdHMgdG8gXCJTZXJpYWxBY3RvclwiXG4gICAgICogQGZpZWxkT2YgYXRyb3BhLlNlcmlhbEFjdG9yI1xuICAgICAqIEB0eXBlIFN0cmluZ1xuICAgICAqIEBkZWZhdWx0IFwiU2VyaWFsQWN0b3JcIlxuICAgICAqL1xuICAgIHRoaXMubmFtZSA9IGF0cm9wYS5zZXRBc09wdGlvbmFsQXJnKCdTZXJpYWxBY3RvcicsIGFjdG9yTmFtZSk7XG4gICAgLyoqXG4gICAgICogUG9sbGluZyBpbnRlcnZhbCBpbiBtaWxsaXNlY29uZHMuIFRoaXMgZGV0ZXJtaW5lcyBob3cgZnJlcXVlbnRseSB0aGVcbiAgICAgKiAgYWN0b3IgZnVuY3Rpb24gd2lsbCB0cnkgdG8gZXhlY3V0ZS4gRGVmYXVsdHMgdG8gMTAwIG1pbGxpc2Vjb25kcy5cbiAgICAgKiBAZmllbGRPZiBhdHJvcGEuU2VyaWFsQWN0b3IjXG4gICAgICogQHR5cGUgTnVtYmVyXG4gICAgICogQGRlZmF1bHQgMTAwXG4gICAgICovXG4gICAgdGhpcy5pbnRlcnZhbCA9IDEwMDsgLy8gbWlsbGlzZWNvbmRzXG4gICAgLyoqXG4gICAgICogVGhlIGlkIG9mIHRoZSBpbnRlcnZhbCBzZXQgdG8gcG9sbCB0aGUgYWN0b3IuIFlvdSBzaG91bGQgbm90IGNoYW5nZVxuICAgICAqICB0aGlzIG1hbnVhbGx5LCB1c2UgdGhlIHN0YXJ0IGFuZCBzdG9wIGZ1bmN0aW9ucyBpbnN0ZWFkLiBEZWZhdWxzIHRvXG4gICAgICogIHVuZGVmaW5lZC5cbiAgICAgKiBAZmllbGRPZiBhdHJvcGEuU2VyaWFsQWN0b3IjXG4gICAgICogQHR5cGUgTnVtYmVyXG4gICAgICogQGRlZmF1bHQgdW5kZWZpbmVkXG4gICAgICovXG4gICAgdGhpcy5pbnRlcnZhbElkID0gdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFRoZSBzdGF0ZSBvZiB0aGUgU2VyaWFsQWN0b3IuIElmIHRydWUsIHRoZSBhY3RvciB3aWxsIHNsZWVwLiBJZiBmYWxzZSB0aGVcbiAgICAgKiAgYWN0b3Igd2lsbCBleGVjdXRlIHRoZSBhY3RvciBmdW5jdGlvbiB3aGVuIG5leHQgcG9sbGVkLiBEZWZhdWx0cyB0b1xuICAgICAqICBmYWxzZS5cbiAgICAgKiBAZmllbGRPZiBhdHJvcGEuU2VyaWFsQWN0b3IjXG4gICAgICogQHR5cGUgQm9vbGVhblxuICAgICAqIEBkZWZhdWx0IGZhbHNlXG4gICAgICovXG4gICAgdGhpcy5ibG9ja2VkID0gZmFsc2U7XG4gICAgLyoqXG4gICAgICogU3RvcmVzIGlkJ3Mgb2YgY3VycmVudGx5IHJ1bm5pbmcgdGltZW91dCBmdW5jdGlvbnMgdXNlZCB0byBmcmVlIHRoZSBhY3RvclxuICAgICAqICBpZiBpdCBoYXMgYmVlbiBibG9ja2VkIGZvciB0b28gbG9uZy5cbiAgICAgKiBAZmllbGRPZiBhdHJvcGEuU2VyaWFsQWN0b3IjXG4gICAgICogQHNlZSBhdHJvcGEuU2VyaWFsQWN0b3IjYmxvY2tUaW1lb3V0VmFsdWVcbiAgICAgKiBAdHlwZSBBcnJheVxuICAgICAqIEBkZWZhdWx0IFtdXG4gICAgICovXG4gICAgdGhpcy50aW1lb3V0cyA9IFtdO1xuICAgIC8qKlxuICAgICAqIFRoZSBtYXhpbXVtIHRpbWUsIGluIG1pbGxpc2Vjb25kcywgd2hpY2ggdGhlIGFjdG9yIG1heSBiZSBibG9ja2VkIGZvci5cbiAgICAgKiAgQWZ0ZXIgdGhpcyBkdXJhdGlvbiBoYXMgYmVlbiByZWFjaGVkIHRoZSBhY3RvciB3aWxsIGJlIGZyZWVkLiBEZWZhdWx0c1xuICAgICAqICB0byA2MCBzZWNvbmRzLlxuICAgICAqIEBmaWVsZE9mIGF0cm9wYS5TZXJpYWxBY3RvciNcbiAgICAgKiBAdHlwZSBOdW1iZXJcbiAgICAgKiBAZGVmYXVsdCA2MDAwMFxuICAgICAqL1xuICAgIHRoaXMuYmxvY2tUaW1lb3V0VmFsdWUgPSA2MDAwMDtcbiAgICAvKipcbiAgICAgKiBUaGUgZnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBTZXJpYWxBY3RvciBpcyBmcmVlLiBUaGlzIGZ1bmN0aW9uXG4gICAgICogIG11c3QgY2FsbCB0aGUgPGNvZGU+ZnJlZTwvY29kZT4gZnVuY3Rpb24gd2hlbiBpdCBpcyBmaW5pc2hlZCBpbiBvcmRlciB0b1xuICAgICAqICBhbGxvdyB0aGUgYWN0b3IgdG8gY29udGludWUuIERlZmF1bHRzIHRvIHRoZSA8Y29kZT5kdW1teUFjdG9yPC9jb2RlPlxuICAgICAqICBmdW5jdGlvbi5cbiAgICAgKiBAZmllbGRPZiBhdHJvcGEuU2VyaWFsQWN0b3IjXG4gICAgICogQHR5cGUgRnVuY3Rpb25cbiAgICAgKiBAZGVmYXVsdCBkdW1teUFjdG9yXG4gICAgICogQHNlZSBhdHJvcGEuU2VyaWFsQWN0b3ItZHVtbXlBY3RvclxuICAgICAqIEBleGFtcGxlXG4gICAgICogZHVtbXlBY3RvciA9IGZ1bmN0aW9uKCl7XG4gICAgICogICAgIGNvbnNvbGUubG9nKCdhY3RvckZ1bmN0aW9uIHdvdWxkIGV4ZWN1dGUnKTtcbiAgICAgKiAgICAgY29uc29sZS5sb2coJ2ZyZWVpbmcgU2VyaWFsIEFjdG9yIGluIDEwMDAwIG1zJyk7XG4gICAgICogICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXt0aGF0LmZyZWUoKTt9LCAxMDAwMCk7XG4gICAgICogfTtcbiAgICAgKi9cbiAgICB0aGlzLmFjdG9yRnVuY3Rpb24gPSBhdHJvcGEuc2V0QXNPcHRpb25hbEFyZyhkdW1teUFjdG9yLCBhY3RvckZ1bmN0aW9uKTtcbiAgICAvKipcbiAgICAgKiBUaGUgYWN0aW9uIGZ1bmN0aW9uIGlzIGNhbGxlZCB3aGVuIHRoZSBhY3RvciBpcyBwb2xsZWQgYW5kIGl0J3MgYmxvY2tlZFxuICAgICAqICBzdGF0ZSBpcyBmYWxzZS4gVGhpcyBtZXRob2Qgc2hvdWxkIG5vdCBiZSBzZXQgb3IgY2FsbGVkIG1hbnVhbGx5LCBzZXRcbiAgICAgKiAgdGhlIDxjb2RlPmFjdG9yRnVuY3Rpb248L2NvZGU+IGluc3RlYWQuXG4gICAgICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gICAgICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gICAgICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICAgICAqIEB2ZXJzaW9uIDIwMTMwMjIwXG4gICAgICogQG1ldGhvZE9mIGF0cm9wYS5TZXJpYWxBY3RvciNcbiAgICAgKiBAc2VlIGF0cm9wYS5TZXJpYWxBY3RvciNhY3RvckZ1bmN0aW9uXG4gICAgICovXG4gICAgdGhpcy5hY3Rpb24gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYoZmFsc2UgPT09IHRoYXQuYmxvY2tlZCkge1xuICAgICAgICAgICAgdGhhdC5ibG9jaygpO1xuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB0aGF0LmFjdG9yRnVuY3Rpb24oKTtcbiAgICAgICAgICAgIH0sIDEwKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoYXQubmFtZSArICcgc2xlZXBpbmcgZm9yICcgKyB0aGF0LmludGVydmFsICsgJyBtcycpO1xuICAgICAgICB9XG4gICAgfTtcbn07XG4vKipcbiAqIFByZXZlbnRzIHRoZSBhY3RvciBmcm9tIGV4ZWN1dGluZyBpdCdzIGFjdG9yRnVuY3Rpb24uIFRoaXMgYmxvY2sgd2lsbCB0aW1lb3V0XG4gKiAgb25jZSB0aGUgPGNvZGU+YmxvY2tUaW1lb3V0VmFsdWU8L2NvZGU+IGhhcyBiZWVuIHJlYWNoZWQuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQHZlcnNpb24gMjAxMzAyMjBcbiAqIEBtZXRob2RPZiBhdHJvcGEuU2VyaWFsQWN0b3IjXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gUmV0dXJucyB0aGUgdmFsdWUgb2YgdGhpcyBpbnN0YW5jZXMgPGNvZGU+YmxvY2tlZDwvY29kZT5cbiAqICBwcm9wZXJ0eS5cbiAqIEBzZWUgYXRyb3BhLlNlcmlhbEFjdG9yI2Jsb2NrZWRcbiAqIEBleGFtcGxlXG4gKiBmdW5jdGlvbiBkKCkge1xuICogICAgIGNvbnNvbGUubG9nKCdkb2luZyBzdHVmZiB0byB0aGluZ3MnKTtcbiAqICAgICB0aGlzLmZyZWUoKTtcbiAqIH1cbiAqIFxuICogdmFyIGFjdG9yID0gbmV3IGF0cm9wYS5TZXJpYWxBY3RvcignZHVtbXknLCBkKTtcbiAqIGFjdG9yLmludGVydmFsID0gMjAwMDtcbiAqIGFjdG9yLmJsb2NrVGltZW91dFZhbHVlID0gNTAwMDtcbiAqIGFjdG9yLnN0YXJ0KCk7XG4gKiAvLyA1IHNlY29uZHMgYWZ0ZXIgc3RhcnRpbmcgdGhlIGFjdG9yIHdpbGwgYmUgYmxvY2tlZC5cbiAqIC8vIEl0IHdpbGwgcmVtYWluIGJsb2NrZWQgdW50aWwgdGhlIGJsb2NrIHRpbWVvdXQgaXMgcmVhY2hlZC5cbiAqIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gKiAgICAgY29uc29sZS5sb2coJ2Jsb2NraW5nISEhJyk7XG4gKiAgICAgYWN0b3IuYmxvY2soKTtcbiAqIH0sIDUwMDApO1xuICovXG5hdHJvcGEuU2VyaWFsQWN0b3IucHJvdG90eXBlLmJsb2NrID0gZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgIGNvbnNvbGUubG9nKHRoaXMubmFtZSArICcgYmxvY2snKTtcbiAgICB0aGlzLmJsb2NrZWQgPSB0cnVlO1xuICAgIHRoaXMudGltZW91dHMucHVzaChcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHt0aGF0LmJsb2NrVGltZW91dCgpO30sIHRoYXQuYmxvY2tUaW1lb3V0VmFsdWUpKTtcbiAgICByZXR1cm4gdGhpcy5ibG9ja2VkO1xufTtcbi8qKlxuICogQ2FsbGVkIHdoZW4gdGhlIDxjb2RlPmJsb2NrVGltZW91dFZhbHVlPC9jb2RlPiBoYXMgYmVlbiByZWFjaGVkLiBUaGlzIGZyZWVzXG4gKiAgdGhlIGFjdG9yIGFuZCByZW1vdmVzIHRoZSB0aW1lb3V0IHJlZmVyZW5jZSBmcm9tIHRoZSB0aW1lb3V0cyBhcnJheS5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAdmVyc2lvbiAyMDEzMDIyMFxuICogQG1ldGhvZE9mIGF0cm9wYS5TZXJpYWxBY3RvciNcbiAqIEByZXR1cm5zIHtCb29sZWFufSBSZXR1cm5zIHRoZSB2YWx1ZSBvZiB0aGlzIGluc3RhbmNlcyA8Y29kZT5ibG9ja2VkPC9jb2RlPlxuICogIHByb3BlcnR5LlxuICogQHNlZSBhdHJvcGEuU2VyaWFsQWN0b3IjYmxvY2tlZFxuICovXG5hdHJvcGEuU2VyaWFsQWN0b3IucHJvdG90eXBlLmJsb2NrVGltZW91dCA9IGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIGNvbnNvbGUubG9nKHRoaXMubmFtZSArICcgYmxvY2sgdGltZW91dCcpO1xuICAgIHJldHVybiB0aGlzLmZyZWUoKTtcbn07XG4vKipcbiAqIEZyZWVzIHRoZSBhY3RvciBzbyBpdCBtYXkgZXhlY3V0ZSBpdHMgYWN0b3IgZnVuY3Rpb24gd2hlbiBuZXh0IHBvbGxlZC5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAdmVyc2lvbiAyMDEzMDIyMFxuICogQG1ldGhvZE9mIGF0cm9wYS5TZXJpYWxBY3RvciNcbiAqIEByZXR1cm5zIHtCb29sZWFufSBSZXR1cm5zIHRoZSB2YWx1ZSBvZiB0aGlzIGluc3RhbmNlcyA8Y29kZT5ibG9ja2VkPC9jb2RlPlxuICogIHByb3BlcnR5LlxuICogQHNlZSBhdHJvcGEuU2VyaWFsQWN0b3IjYmxvY2tlZFxuICogQGV4YW1wbGVcbiAqIGZ1bmN0aW9uIGQoKSB7XG4gKiAgICAgY29uc29sZS5sb2coJ2RvaW5nIHN0dWZmIHRvIHRoaW5ncycpO1xuICogICAgIHRoaXMuZnJlZSgpO1xuICogfVxuICogXG4gKiB2YXIgYWN0b3IgPSBuZXcgYXRyb3BhLlNlcmlhbEFjdG9yKCdkdW1teScsIGQpO1xuICogYWN0b3IuaW50ZXJ2YWwgPSAyMDAwO1xuICogYWN0b3IuYmxvY2tUaW1lb3V0VmFsdWUgPSA1MDAwMDtcbiAqIGFjdG9yLnN0YXJ0KCk7XG4gKiBhY3Rvci5ibG9jaygpO1xuICogLy8gNSBzZWNvbmRzIGFmdGVyIHN0YXJ0aW5nIHRoZSBhY3RvciB3aWxsIGJlIGZyZWVkLlxuICogc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAqICAgICBhY3Rvci5mcmVlKCk7XG4gKiB9LCA1MDAwKTtcbiAqL1xuYXRyb3BhLlNlcmlhbEFjdG9yLnByb3RvdHlwZS5mcmVlID0gZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgY29uc29sZS5sb2codGhpcy5uYW1lICsgJyBmcmVlJyk7XG4gICAgdGhpcy5ibG9ja2VkID0gZmFsc2U7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dHMuc2hpZnQoKSk7XG4gICAgcmV0dXJuIHRoaXMuYmxvY2tlZDtcbn07XG4vKipcbiAqIFN0YXJ0cyBwb2xsaW5nIHRoZSBhY3Rvci5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAdmVyc2lvbiAyMDEzMDIyMFxuICogQG1ldGhvZE9mIGF0cm9wYS5TZXJpYWxBY3RvciNcbiAqIEBwYXJhbSB7TnVtYmVyfSBpbnRlcnZhbCBPcHRpb25hbC4gVGhlIHBvbGxpbmcgaW50ZXJ2YWwuIERlZmF1bHRzIHRvIHRoZVxuICogIHZhbHVlIG9mIDxjb2RlPnRoaXMuaW50ZXJ2YWw8L2NvZGU+XG4gKiBAc2VlIGF0cm9wYS5TZXJpYWxBY3RvciNpbnRlcnZhbFxuICogQHJldHVybnMge051bWJlcn0gUmV0dXJucyB0aGUgdmFsdWUgb2YgdGhpcyBpbnN0YW5jZSdzXG4gKiAgPGNvZGU+aW50ZXJ2YWxJZDwvY29kZT4gcHJvcGVydHkuXG4gKiBAc2VlIGF0cm9wYS5TZXJpYWxBY3RvciNpbnRlcnZhbElkXG4gKiBAZXhhbXBsZVxuICogdmFyIGFjdG9yID0gbmV3IGF0cm9wYS5TZXJpYWxBY3RvcignZHVtbXknKTtcbiAqIGFjdG9yLnN0YXJ0KCk7XG4gKi9cbmF0cm9wYS5TZXJpYWxBY3Rvci5wcm90b3R5cGUuc3RhcnQgPSBmdW5jdGlvbihpbnRlcnZhbCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICB0aGlzLmludGVydmFsID0gYXRyb3BhLnNldEFzT3B0aW9uYWxBcmcodGhpcy5pbnRlcnZhbCwgaW50ZXJ2YWwpO1xuICAgIFxuICAgIGlmKHRoaXMuaW50ZXJ2YWxJZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIC8vIGNsZWFyIHRoZSBvbGQgdGltZW91dCBiZWZvcmUgY3JlYXRpbmcgYSBuZXcgb25lLlxuICAgICAgICB0aGlzLnN0b3AoKTtcbiAgICB9XG4gICAgdGhpcy5pbnRlcnZhbElkID0gc2V0SW50ZXJ2YWwodGhhdC5hY3Rpb24sIHRoYXQuaW50ZXJ2YWwpO1xuICAgIGNvbnNvbGUubG9nKHRoaXMubmFtZSArICcgc3RhcnRlZCcpO1xuICAgIHJldHVybiB0aGlzLmludGVydmFsSWQ7XG59O1xuLyoqXG4gKiBBZGp1c3RzIHRoZSBwb2xsaW5nIGludGVydmFsIGFmdGVyIDxjb2RlPnN0YXJ0PC9jb2RlPiBoYXNcbiAqIGJlZW4gY2FsbGVkLlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAqIEB2ZXJzaW9uIDIwMTMwMjIwXG4gKiBAbWV0aG9kT2YgYXRyb3BhLlNlcmlhbEFjdG9yI1xuICogQHBhcmFtIHtOdW1iZXJ9IGludGVydmFsIFRoZSBuZXcgcG9sbGluZyBpbnRlcnZhbCBpbiBtaWxsaXNlY29uZHMuXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBSZXR1cm5zIHRoZSB2YWx1ZSBvZiB0aGlzIGluc3RhbmNlJ3MgXG4gKiAgPGNvZGU+aW50ZXJ2YWxJZDwvY29kZT4gcHJvcGVydHkuXG4gKiBAc2VlIGF0cm9wYS5TZXJpYWxBY3RvciNpbnRlcnZhbElkXG4gKiBAZXhhbXBsZVxuICogdmFyIGFjdG9yID0gbmV3IGF0cm9wYS5TZXJpYWxBY3RvcignZHVtbXknKTtcbiAqIGFjdG9yLnN0YXJ0KCk7XG4gKiAgICAgLy8gNSBzZWNvbmRzIGFmdGVyIHN0YXJ0aW5nIHRoZSBwb2xsaW5nIGludGVydmFsIHdpbGwgYmUgY2hhbmdlZC5cbiAqIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAqICAgICBhY3Rvci5jaGFuZ2VJbnRlcnZhbCgyMDAwKTtcbiAqIH0sIDUwMDApO1xuICovXG5hdHJvcGEuU2VyaWFsQWN0b3IucHJvdG90eXBlLmNoYW5nZUludGVydmFsID0gZnVuY3Rpb24oaW50ZXJ2YWwpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICBjb25zb2xlLmxvZyh0aGlzLm5hbWUgKyAnIGNoYW5naW5nIGludGVydmFsJyk7XG4gICAgcmV0dXJuIHRoaXMuc3RhcnQoaW50ZXJ2YWwpO1xufTtcbi8qKlxuICogU3RvcHMgcG9sbGluZyB0aGUgYWN0b3IuIE5vdGUgdGhhdCB0aGUgYWN0b3Igd2lsbCBiZSBmcmVlZCBvbmNlIHRoZVxuICogIDxjb2RlPmJsb2NrVGltZW91dFZhbHVlPC9jb2RlPiBoYXMgYmVlbiByZWFjaGVkLiBUaGlzIHdpbGwgbm90IHJlc3RhcnQgdGhlXG4gKiAgcG9sbGluZy5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAdmVyc2lvbiAyMDEzMDIyMFxuICogQG1ldGhvZE9mIGF0cm9wYS5TZXJpYWxBY3RvciNcbiAqIEBzZWUgYXRyb3BhLlNlcmlhbEFjdG9yI2Jsb2NrZWRcbiAqIEBzZWUgYXRyb3BhLlNlcmlhbEFjdG9yI2Jsb2NrVGltZW91dFZhbHVlXG4gKiBAZXhhbXBsZVxuICogdmFyIGFjdG9yID0gbmV3IGF0cm9wYS5TZXJpYWxBY3RvcignZHVtbXknKTtcbiAqIGFjdG9yLnN0YXJ0KCk7XG4gKiAgICAgLy8gNSBzZWNvbmRzIGFmdGVyIHN0YXJ0aW5nIHRoZSBhY3RvciB3aWxsIGJlIHN0b3BwZWQuXG4gKiBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gKiAgICAgYWN0b3Iuc3RvcCgpO1xuICogfSwgNTAwMCk7XG4gKi9cbmF0cm9wYS5TZXJpYWxBY3Rvci5wcm90b3R5cGUuc3RvcCA9IGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbElkKTtcbiAgICB0aGlzLmludGVydmFsSWQgPSB1bmRlZmluZWQ7XG4gICAgY29uc29sZS5sb2codGhpcy5uYW1lICsgJyBzdG9wcGVkJyk7XG59O1xuXG5cblxuXG53aGlsZShhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMubGVuZ3RoID4gMCkge1xuICAgIGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5wb3AoKSgpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBhdHJvcGE7XG4iLCJhcmd1bWVudHNbNF1bNV1bMF0uYXBwbHkoZXhwb3J0cyxhcmd1bWVudHMpIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL2RvY3MvdnNkb2MvT3BlbkxheWVyc0FsbC5qc1wiLz5cbnZhciBhdHJvcGEgPSByZXF1aXJlKCdhdHJvcGEtaGVhZGVyJyk7XG4vKmpzbGludFxuICAgIGluZGVudDogNCxcbiAgICBtYXhlcnI6IDUwLFxuICAgIHdoaXRlOiB0cnVlLFxuICAgIGJyb3dzZXI6IHRydWUsXG4gICAgZGV2ZWw6IHRydWUsXG4gICAgcGx1c3BsdXM6IHRydWUsXG4gICAgcmVnZXhwOiB0cnVlXG4qL1xuLypnbG9iYWwgYXRyb3BhICovXG4vLyBlbmQgaGVhZGVyXG5cbi8qKlxuICogU2V0IGRlZmF1bHQgdmFsdWVzIGZvciBvcHRpb25hbCBmdW5jdGlvbiBwYXJhbWV0ZXJzLlxuICogQGV4YW1wbGVcbiAqIDxwcmU+XG4gKiAgIC8vIFRvIHNldCBhIGRlZmF1bHQgdmFsdWUgZm9yIGFuIG9wdGlvbmFsIHBhcmFtZXRlclxuICogICBmdW5jdGlvbihvcHRpb25hbEFyZykge1xuICogICAgICAgdmFyIGRlZmF1bHRWYWwgPSAnaGVsbG8gdGhlcmUhJztcbiAqICAgICAgIG9wdGlvbmFsQXJnID0gYXRyb3BhLnNldEFzT3B0aW9uYWxBcmcoZGVmYXVsdFZhbCwgb3B0aW9uYWxBcmcpO1xuICogICAgICAgcmV0dXJuIG9wdGlvbmFsQXJnO1xuICogICB9XG4gKiA8L3ByZT5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAdmVyc2lvbiAyMDEyMDkwOVxuICogQHBhcmFtIHtNaXhlZH0gZGVmYXVsdFZhbCBUaGUgZGVmYXVsdCB2YWx1ZSB0byBzZXQuXG4gKiBAcGFyYW0ge01peGVkfSBvcHRpb25hbEFyZyBBIHJlZmVyZW5jZSB0byB0aGUgb3B0aW9uYWwgYXJndW1lbnQuXG4gKiBAcmV0dXJucyB7TWl4ZWR9IFJldHVybnMgdGhlIGRlZmF1bHQgdmFsdWUgc3VwcGxpZWQgd2hlbiB0aGUgb3B0aW9uYWxcbiAqIGFyZ3VtZW50IGlzIHVuZGVmaW5lZCBvciBudWxsLiBPdGhlcndpc2UsIHRoZSBzdXBwbGllZCBvcHRpb25hbCBhcmd1bWVudFxuICogaXMgcmV0dXJuZWQuXG4gKi9cbmF0cm9wYS5zZXRBc09wdGlvbmFsQXJnID0gZnVuY3Rpb24gKGRlZmF1bHRWYWwsIG9wdGlvbmFsQXJnKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgaWYgKG9wdGlvbmFsQXJnID09PSB1bmRlZmluZWQgfHwgb3B0aW9uYWxBcmcgPT09IG51bGwpIHtcbiAgICAgICAgb3B0aW9uYWxBcmcgPSBkZWZhdWx0VmFsO1xuICAgIH1cbiAgICByZXR1cm4gb3B0aW9uYWxBcmc7XG59O1xuXG5cblxuXG53aGlsZShhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMubGVuZ3RoID4gMCkge1xuICAgIGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5wb3AoKSgpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBhdHJvcGE7XG4iLCJhcmd1bWVudHNbNF1bNV1bMF0uYXBwbHkoZXhwb3J0cyxhcmd1bWVudHMpIiwiYXJndW1lbnRzWzRdWzIyXVswXS5hcHBseShleHBvcnRzLGFyZ3VtZW50cykiLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vZG9jcy92c2RvYy9PcGVuTGF5ZXJzQWxsLmpzXCIvPlxudmFyIGF0cm9wYSA9IHJlcXVpcmUoJ2F0cm9wYS1oZWFkZXInKTtcbmF0cm9wYS5zdHJpbmcgPSByZXF1aXJlKCdhdHJvcGEtc3RyaW5nJykuc3RyaW5nO1xuYXRyb3BhLmFycmF5cyA9IHJlcXVpcmUoJ2F0cm9wYS1hcnJheXMnKS5hcnJheXM7XG5hdHJvcGEuc2V0QXNPcHRpb25hbEFyZyA9IHJlcXVpcmUoJ2F0cm9wYS1zZXRBc09wdGlvbmFsQXJnJykuc2V0QXNPcHRpb25hbEFyZztcbi8qanNsaW50XG4gICAgaW5kZW50OiA0LFxuICAgIG1heGVycjogNTAsXG4gICAgd2hpdGU6IHRydWUsXG4gICAgYnJvd3NlcjogdHJ1ZSxcbiAgICBkZXZlbDogdHJ1ZSxcbiAgICBwbHVzcGx1czogdHJ1ZSxcbiAgICByZWdleHA6IHRydWUsXG4gICAgdmFyczogdHJ1ZVxuKi9cbi8qZ2xvYmFsIGF0cm9wYSAqL1xuLy8gZW5kIGhlYWRlclxuXG4oZnVuY3Rpb24gKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIGF0cm9wYS5yZXF1aXJlcyhcbiAgICAgICAgJ1RleHRBbmFseXplcicsXG4gICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBzdXBwb3J0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgYXRyb3BhLnN0cmluZyxcbiAgICAgICAgICAgICAgICBhdHJvcGEuYXJyYXlzLFxuICAgICAgICAgICAgICAgIGF0cm9wYS5zZXRBc09wdGlvbmFsQXJnXG4gICAgICAgICAgICBdLmZvckVhY2goZnVuY3Rpb24gKHByZXJlcXVpc2l0ZSkge1xuICAgICAgICAgICAgICAgIGlmKHByZXJlcXVpc2l0ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHN1cHBvcnRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHN1cHBvcnRlZDtcbiAgICAgICAgfVxuICAgICk7XG59KCkpO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSB1dGlsaXR5IGZvciBhbmFseXppbmcgdGV4dC5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAdmVyc2lvbiAyMDEzMDMxMVxuICogQGNsYXNzIFJlcHJlc2VudHMgYSB1dGlsaXR5IGZvciBhbmFseXppbmcgdGV4dC5cbiAqIEBwYXJhbSB7U3RyaW5nfSB0ZXh0IFRoZSB0ZXh0IHRvIGFuYWx5emUuXG4gKiBAcmV0dXJucyB7VGV4dEFuYWx5emVyfSBSZXR1cm5zIGFuIGluc3RhbmNlIG9mIHRoZSB0ZXh0IGFuYWx5emVyLlxuICogQHJlcXVpcmVzIGF0cm9wYS5zdHJpbmdcbiAqIEByZXF1aXJlcyBhdHJvcGEuYXJyYXlzXG4gKiBAcmVxdWlyZXMgYXRyb3BhLnNldEFzT3B0aW9uYWxBcmdcbiAqL1xuYXRyb3BhLlRleHRBbmFseXplciA9IGZ1bmN0aW9uIFRleHRBbmFseXplcih0ZXh0KSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgIHZhciBjb25zdHJ1Y3Q7XG4gICAgLyoqXG4gICAgKiBUaGUgc3VwcGxpZWQgdGV4dC4gRGVmYXVsdHMgdG8gYW4gZW1wdHkgc3RyaW5nLlxuICAgICogQHR5cGUgU3RyaW5nXG4gICAgKiBAZmllbGRPZiBhdHJvcGEuVGV4dEFuYWx5emVyI1xuICAgICovXG4gICAgdGhpcy50ZXh0ID0gU3RyaW5nKGF0cm9wYS5zZXRBc09wdGlvbmFsQXJnKCcnLCB0ZXh0KSk7XG4gICAgLyoqXG4gICAgKiBHaXZlcyB0aGUgY291bnQgb2Ygd29yZHMgaW4gdGhlIHRleHQuIERlZmF1bHRzIHRvIDAuXG4gICAgKiBAdHlwZSBOdW1iZXJcbiAgICAqIEBmaWVsZE9mIGF0cm9wYS5UZXh0QW5hbHl6ZXIjXG4gICAgKi9cbiAgICB0aGlzLndvcmRDb3VudCA9IDA7XG4gICAgLyoqXG4gICAgKiBBbiBhcnJheSBvZiBldmVyeSB3b3JkIGluIHRoZSBzdXBwbGllZCB0ZXh0LlxuICAgICogIERlZmF1bHRzIHRvIGFuIGVtcHR5IGFycmF5LlxuICAgICogQHR5cGUgQXJyYXlcbiAgICAqIEBmaWVsZE9mIGF0cm9wYS5UZXh0QW5hbHl6ZXIjXG4gICAgKi9cbiAgICB0aGlzLndvcmRzID0gW107XG4gICAgLyoqXG4gICAgKiBTZXRzIHRoZSBiYXNpYyBwcm9wZXJ0aWVzIG9mIHRoZSB0ZXh0IGFuYWx5emVyLlxuICAgICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gICAgKiBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICAgICog4pitIEhpYWwgQXRyb3BhISEg4pitXG4gICAgKiBAcHJpdmF0ZVxuICAgICogQHZlcnNpb24gMjAxMzAzMTFcbiAgICAqIEBtZXRob2RPZiBhdHJvcGEuVGV4dEFuYWx5emVyLVxuICAgICovXG4gICAgY29uc3RydWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBhdHJvcGEuc3VwcG9ydENoZWNrKCdUZXh0QW5hbHl6ZXInKTtcbiAgICAgICAgdGhhdC50ZXh0ID0gYXRyb3BhLnN0cmluZy5jb252ZXJ0RW9sKHRoYXQudGV4dCwgJ1xcbicpO1xuICAgICAgICB0aGF0LndvcmRDb3VudCA9IGF0cm9wYS5zdHJpbmcuY291bnRXb3Jkcyh0aGF0LnRleHQpO1xuICAgICAgICB0aGF0LndvcmRzID0gYXRyb3BhLnN0cmluZy5nZXRXb3Jkcyh0aGF0LnRleHQpO1xuICAgIH07XG4gICAgXG4gICAgY29uc3RydWN0KCk7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuLyoqXG4gKiBHZXRzIGFuIGluZGV4IG9mIHRoZSB0ZXh0LlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAqIEB2ZXJzaW9uIDIwMTMwMTE4XG4gKiBAbWV0aG9kT2YgYXRyb3BhLlRleHRBbmFseXplciNcbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBhbiBhcnJheSBvZiB1bmlxdWUgdmFsdWVzXG4gKiAgZGVyaXZlZCBmcm9tIHRoZSB0ZXh0IGdpdmVuLlxuICovXG5hdHJvcGEuVGV4dEFuYWx5emVyLnByb3RvdHlwZS5nZXRJbmRleCA9IGZ1bmN0aW9uICgpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICB0aGlzLndvcmRzID0gYXRyb3BhLmFycmF5cy5yZWluZGV4KHRoaXMud29yZHMpO1xuICAgIHJldHVybiBhdHJvcGEuYXJyYXlzLmdldFVuaXF1ZSh0aGlzLndvcmRzKTtcbn07XG4vKipcbiAqIEdldCB0aGUgZnJlcXVlbmN5IGRhdGEgZm9yIGVhY2ggdW5pcXVlIHdvcmQgaW5cbiAqICB0aGUgdGV4dC5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAdmVyc2lvbiAyMDEzMDExOFxuICogQG1ldGhvZE9mIGF0cm9wYS5UZXh0QW5hbHl6ZXIjXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGFuIG9iamVjdCB3aG9zZSBrZXlzIGFyZVxuICogIHRoZSB1bmlxdWUgd29yZHMgZnJvbSB0aGUgZ2l2ZW4gdGV4dCBhbmQgd2hvc2VcbiAqICB2YWx1ZXMgYXJlIHRoZSBjb3VudCBvZiBlYWNoIHdvcmRzIG9jY3VycmVuY2UuXG4gKi9cbmF0cm9wYS5UZXh0QW5hbHl6ZXIucHJvdG90eXBlLmdldFdvcmRGcmVxdWVuY3kgPSBmdW5jdGlvbiAoKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgdGhpcy53b3JkcyA9IGF0cm9wYS5hcnJheXMucmVpbmRleCh0aGlzLndvcmRzKTtcbiAgICByZXR1cm4gYXRyb3BhLmFycmF5cy5nZXRGcmVxdWVuY3kodGhpcy53b3Jkcyk7XG59O1xuLyoqXG4gKiBHZXRzIHBocmFzZXMgb2YgdGhlIHNwZWNpZmllZCBsZW5ndGggZnJvbSB0aGUgdGV4dC5cbiAqIEBwYXJhbSB7TnVtYmVyfSBwaHJhc2VMZW5ndGggVGhlIGxlbmd0aCBvZiB0aGUgcGhyYXNlc1xuICogIHRvIGV4dHJhY3QgZnJvbSB0aGUgdGV4dC4gRGVmYXVsdHMgdG8gMi5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYW4gb2JqZWN0IHdob3NlIGtleXMgYXJlIHBocmFzZXNcbiAqICBhbmQgd2hvc2UgdmFsdWVzIGFyZSB0aGUgbnVtYmVyIG9mIG9jY3VycmVuY2VzIG9mIHRoZSBwaHJhc2UuXG4gKi9cbmF0cm9wYS5UZXh0QW5hbHl6ZXIucHJvdG90eXBlLmdldFBocmFzZUZyZXF1ZW5jeSA9IGZ1bmN0aW9uIGdldFBocmFzZUZyZXF1ZW5jeShcbiAgICBwaHJhc2VMZW5ndGhcbikge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIHBocmFzZUxlbmd0aCA9IGF0cm9wYS5zZXRBc09wdGlvbmFsQXJnKDIsIHBocmFzZUxlbmd0aCk7XG4gICAgaWYoMiA+IHBocmFzZUxlbmd0aCkge1xuICAgICAgICBwaHJhc2VMZW5ndGggPSAyO1xuICAgIH1cbiAgICB2YXIgY291bnRlciA9IDAsIHByb3AsIG91dCA9IFtdO1xuICAgIFxuICAgIHRoaXMud29yZHMgPSBhdHJvcGEuYXJyYXlzLnJlaW5kZXgodGhpcy53b3Jkcyk7XG4gICAgXG4gICAgdGhpcy53b3Jkcy5tYXAoZnVuY3Rpb24oZWxlbWVudCwgaW5kZXgsIGFycikge1xuICAgICAgICBjb3VudGVyID0gMTsgIC8vIGVsZW1lbnQgaXMgd29yZCAxIG9mIHBocmFzZUxlbmd0aFxuICAgICAgICAvLyBtYWtpbmcgc3VyZSB0aGVyZSBhcmUgZW5vdWdoIHdvcmRzIHRvIGNvbmNhdGVuYXRlIGEgcGhyYXNlIG9mIHRoZVxuICAgICAgICAvLyBwcm9wZXIgbGVuZ3RoLlxuICAgICAgICBpZihhcnJbaW5kZXggKyBwaHJhc2VMZW5ndGggLSAxXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBwcm9wID0gU3RyaW5nKGVsZW1lbnQgKyAnICcpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICBmb3IoY291bnRlcjsgY291bnRlciAhPT0gcGhyYXNlTGVuZ3RoOyBjb3VudGVyKyspIHtcbiAgICAgICAgICAgICAgICBwcm9wICs9IFN0cmluZyhhcnJbaW5kZXggKyBjb3VudGVyXSArICcgJykudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG91dC5wdXNoKHByb3AudHJpbSgpKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIFxuICAgIG91dCA9IGF0cm9wYS5hcnJheXMuZ2V0RnJlcXVlbmN5KG91dCk7XG4gICAgXG4gICAgcmV0dXJuIG91dDtcbn07XG5cblxuXG5cbndoaWxlKGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5sZW5ndGggPiAwKSB7XG4gICAgYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLnBvcCgpKCk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGF0cm9wYTtcbiIsImFyZ3VtZW50c1s0XVs1XVswXS5hcHBseShleHBvcnRzLGFyZ3VtZW50cykiLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vZG9jcy92c2RvYy9PcGVuTGF5ZXJzQWxsLmpzXCIvPlxyXG52YXIgYXRyb3BhID0gcmVxdWlyZSgnYXRyb3BhLWhlYWRlcicpO1xyXG5hdHJvcGEuc2V0QXNPcHRpb25hbEFyZyA9IHJlcXVpcmUoJ2F0cm9wYS1zZXRBc09wdGlvbmFsQXJnJykuc2V0QXNPcHRpb25hbEFyZztcclxuLypqc2xpbnRcclxuICAgIGluZGVudDogNCxcclxuICAgIG1heGVycjogNTAsXHJcbiAgICB3aGl0ZTogdHJ1ZSxcclxuICAgIGJyb3dzZXI6IHRydWUsXHJcbiAgICBkZXZlbDogdHJ1ZSxcclxuICAgIHBsdXNwbHVzOiB0cnVlLFxyXG4gICAgcmVnZXhwOiB0cnVlXHJcbiovXHJcbi8qZ2xvYmFsIGF0cm9wYSAqL1xyXG4vLyBlbmQgaGVhZGVyXHJcblxyXG5cclxuYXRyb3BhLnJlcXVpcmVzKFxyXG4gICAgJ2luamVjdCcsXHJcbiAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICAgICAgaWYoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbik7XHJcblxyXG4vKipcclxuICogQ29udGFpbnMgdG9vbHMgZm9yIGluamVjdGluZyBlbGVtZW50cyBhbmQgYXNzZW1ibGllcy5cclxuICogaW50byB0aGUgcGFnZS5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwMzA4XHJcbiAqIEBuYW1lc3BhY2UgQ29udGFpbnMgdG9vbHMgZm9yIGluamVjdGluZyBlbGVtZW50cyBhbmQgYXNzZW1ibGllcy5cclxuICogQHJlcXVpcmVzIGF0cm9wYS5kYXRhXHJcbiAqIEByZXF1aXJlcyBhdHJvcGEuc3VwcG9ydENoZWNrXHJcbiAqIEByZXF1aXJlcyBhdHJvcGEuc2V0QXNPcHRpb25hbEFyZ1xyXG4gKi9cclxuYXRyb3BhLmluamVjdCA9IHt9O1xyXG4vKipcclxuICogR2VuZXJpYyBFbGVtZW50IEluamVjdG9yLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMjA5MDlcclxuICogQHBhcmFtIHtTdHJpbmd9IGVsZW1lbnRUeXBlIFRoZSB0eXBlIG9mIGVsZW1lbnQgdG8gYmUgaW5qZWN0ZWQuXHJcbiAqIEBwYXJhbSB7SFRNTCBET00gRG9jdW1lbnR9IGRvY3JlZiBPcHRpb25hbC4gQSByZWZlcmVuY2UgdG8gdGhlIGRvY3VtZW50IHRvXHJcbiAqICB0YXJnZXQsIGRlZmF1bHRzIHRvIDxjb2RlPmRvY3VtZW50PC9jb2RlPi5cclxuICogQHBhcmFtIHtET00gTm9kZX0gcGFyZW50Tm9kIE9wdGlvbmFsLiBBIHJlZmVyZW5jZSB0byB0aGUgcGFyZW50IG5vZGUgdG9cclxuICogIHRhcmdldCwgZGVmYXVsdHMgdG8gPGNvZGU+ZG9jcmVmLmJvZHk8L2NvZGU+LlxyXG4gKiBAcGFyYW0ge09iamVjdH0gYXR0cmlidXRlcyBPcHRpb25hbC4gQW4gb2JqZWN0IHdob3NlIHByb3BlcnRpZXMgYXJlIG5hbWVzIG9mXHJcbiAqICBIVE1MIGF0dHJpYnV0ZXMsIGRlZmF1bHRzIHRvIDxjb2RlPnt9PC9jb2RlPi4gVGhlIHZhbHVlIG9mIHRoZXNlIHByb3BlcnRpZXNcclxuICogIGFyZSB0byBiZSBzdHJpbmdzIHJlcHJlc2VudGluZyB0aGUgdmFsdWVzIG9mIHRoZSBIVE1MIGF0dHJpYnV0ZXMgYXMgdGhleSBhcmVcclxuICogIHRvIGJlIGFwcGxpZWQgdG8gdGhlIGluamVjdGVkIGVsZW1lbnQuXHJcbiAqIEBleGFtcGxlIEV4YW1wbGUgYXR0cmlidXRlcyBvYmplY3QgOlxyXG4gKlxyXG4gKiBhdHRyaWJ1dGVzT2JqID0ge1xyXG4gKiAgICAgXCJpZFwiIDogXCJlbGVtZW50SURcIixcclxuICogICAgIFwiY2xhc3NcIiA6IFwiY2xhc3N5XCJcclxuICogfTtcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gb25sb2FkSGFuZGxlciBPcHRpb25hbC4gSWYgdGhlIGVsZW1lbnQgYmVpbmcgaW5qZWN0ZWQgd2lsbFxyXG4gKiAgZmlyZSBhIGxvYWQgZXZlbnQsIHRoaXMgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQuIERlZmF1bHRzIHRvXHJcbiAqICA8Y29kZT5mdW5jdGlvbiAoKSB7fTwvY29kZT4uXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIE9wdGlvbmFsLiBUaGlzIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIGp1c3QgYmVmb3JlXHJcbiAqICB0aGUgZWxlbWVudCBpcyB0byBiZSBhcHBlbmRlZCB0byB0aGUgcGFnZS4gVGhlIGNhbGxiYWNrIHdpbGwgcmVjZWl2ZSB0aGVcclxuICogIGVsZW1lbnQgaW4gaXRzIGN1cnJlbnQgc3RhdGUgZm9yIGFueSBhZGRpdGlvbmFsIHByb2Nlc3NpbmcgdG8gYmUgZG9uZSBwcmlvclxyXG4gKiAgdG8gaXQncyBhdHRhY2htZW50IG9uIGNhbGxiYWNrIGNvbXBsZXRpb24uIERlZmF1bHRzIHRvXHJcbiAqICA8Y29kZT5mdW5jdGlvbiAoKSB7fTwvY29kZT4uXHJcbiAqIEByZXR1cm4ge0hUTUwgRWxlbWVudH0gUmV0dXJucyBhIHJlZmVyZW5jZSB0byB0aGUgSFRNTCBFbGVtZW50IGNyZWF0ZWQgYW5kXHJcbiAqICBpbmplY3RlZC5cclxuICogQHNlZSA8YSBocmVmPVwiaHR0cDovL3d3dy53My5vcmcvU2VjdXJpdHkvd2lraS9TYW1lX09yaWdpbl9Qb2xpY3lcIj5cclxuICogaHR0cDovL3d3dy53My5vcmcvU2VjdXJpdHkvd2lraS9TYW1lX09yaWdpbl9Qb2xpY3k8L2E+XHJcbiAqIEBleGFtcGxlXHJcbiAqICAvLyB0aGlzIHdpbGwgaW5qZWN0IGEgZGl2IGVsZW1lbnQgaW50byB0aGUgZG9jdW1lbnQgYm9keS5cclxuICogIHZhciBlbCA9IGF0cm9wYS5pbmplY3QuZWxlbWVudCAoJ2RpdicpO1xyXG4gKiAgXHJcbiAqICAvLyBUaGlzIHdpbGwgaW5qZWN0IGEgZGl2IHdpdGggdGhlIGlkIFwibXlJZFwiIGludG8gdGhlIGVsZW1lbnQgcmVmZXJlbmNlZCBieVxyXG4gKiAgLy8gXCJjb250YWluZXJcIlxyXG4gKiAgdmFyIGVsID0gYXRyb3BhLmluamVjdC5lbGVtZW50IChcclxuICogICAgICAnZGl2JywgZG9jdW1lbnQsIGNvbnRhaW5lciwgeyAnaWQnOiAnbXlJZCcgfSwgbnVsbCwgbnVsbFxyXG4gKiAgKTtcclxuICogIFxyXG4gKiAgLy8gdGhpcyB3aWxsIGluamVjdCBhIGRpdiBpbnRvIHRoZSBkb2N1bWVudCBvZiBhbiBpZnJhbWUgcmVmZXJlbmNlZCB3aXRoIFwiZmRvY1wiXHJcbiAqICAvLyBKdXN0IGJlZm9yZSB0aGUgZGl2IGlzIGluamVjdGVkIHRoZSBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZCBhbmQgdGhlIGVsZW1lbnRcclxuICogIC8vIG1heSBiZSBhdWdtZW50ZWQuIFdoZW4gdGhlIGNhbGxiYWNrIHJldHVybnMgdGhlIGVsZW1lbnQgd2lsbCBiZSBpbmplY3RlZC5cclxuICogIHZhciBmZG9jID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NvbWVGcmFtZScpLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQ7XHJcbiAqICBcclxuICogIHZhciBlbCA9IGF0cm9wYS5pbmplY3QuZWxlbWVudCAoXHJcbiAqICAgICAgJ2RpdicsIGZkb2MsIGZkb2MuYm9keSwgeyAnaWQnOiAnbXlJZCcgfSxcclxuICogICAgICBudWxsLFxyXG4gKiAgICAgIGZ1bmN0aW9uIChteURpdikge1xyXG4gKiAgICAgICAgICBteURpdi50ZXh0Q29udGVudCA9ICdJIGNvdWxkIGhhdmUgYXR0YWNoZWQgZXZlbnQgaGFuZGxlcnMnO1xyXG4gKiAgICAgIH1cclxuICogICk7XHJcbiAqICBcclxuICogIC8vIHRoaXMgd2lsbCBpbmplY3QgYW4gaWZyYW1lIGludG8gdGhlIGRvY3VtZW50XHJcbiAqICAvLyBvbmNlIHRoZSBpZnJhbWUncyBkb2N1bWVudCBoYXMgZmluaXNoZWQgbG9hZGluZyB0aGUgb25sb2FkIGhhbmRsZXIgd2lsbCBiZVxyXG4gKiAgLy8gY2FsbGVkLiBJZiB0aGUgZG9jdW1lbnQgYW5kIHRoZSBpZnJhbWUgYXJlIG9uIHRoZSBzYW1lIGRvbWFpbiwgc2NyaXB0cyBvblxyXG4gKiAgLy8gdGhlIGZyYW1lIGFuZCB0aGUgcGFyZW50IGRvY3VtZW50IHdpbGwgYmUgYWJsZSB0byBjb21tdWluY2F0ZSB3aXRoIGVhY2hcclxuICogIC8vIG90aGVyLlxyXG4gKiAgZnVuY3Rpb24gaWZyYW1lSGFzTG9hZGVkIChtZXNzYWdlKSB7XHJcbiAqICAgICAgY29uc29sZS5sb2cobWVzc2FnZSk7XHJcbiAqICB9XHJcbiAqICBcclxuICogIHZhciBlbCA9IGF0cm9wYS5pbmplY3QuZWxlbWVudCAoXHJcbiAqICAgICAgJ2lmcmFtZScsIGRvY3VtZW50LCBkb2N1bWVudC5ib2R5LFxyXG4gKiAgICAgIHsgJ2lkJzogJ215SWQnLCAnc3JjJyA6ICdodHRwOi8vbG9jYWxob3N0JyB9LFxyXG4gKiAgICAgIGZ1bmN0aW9uICgpIHtcclxuICogICAgICAgICAgaWZyYW1lSGFzTG9hZGVkKCdoZXkgbG9vayBhdCB0aGF0LCB0aGUgZnJhbWUgaXMgcmVhZHkhJyk7XHJcbiAqICAgICAgICAgIC8vIHdoYXQgY291bGQgSSBkbyB3aXRoIHRoZSBmcmFtZT8gYW55dGhpbmcgSSB3YW50IVxyXG4gKiAgICAgIH0sXHJcbiAqICAgICAgbnVsbFxyXG4gKiAgKTtcclxuICovXHJcbmF0cm9wYS5pbmplY3QuZWxlbWVudCA9IGZ1bmN0aW9uIChcclxuICAgIGVsZW1lbnRUeXBlLCBkb2NyZWYsIHBhcmVudE5vZCwgYXR0cmlidXRlcywgb25sb2FkSGFuZGxlciwgY2FsbGJhY2tcclxuKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIGF0cm9wYS5zdXBwb3J0Q2hlY2soJ2luamVjdCcpO1xyXG4gICAgXHJcbiAgICB2YXIgZWwsXHJcbiAgICB4O1xyXG4gICAgZG9jcmVmID0gYXRyb3BhLnNldEFzT3B0aW9uYWxBcmcoZG9jdW1lbnQsIGRvY3JlZik7XHJcbiAgICBwYXJlbnROb2QgPSBhdHJvcGEuc2V0QXNPcHRpb25hbEFyZyhkb2NyZWYuYm9keSwgcGFyZW50Tm9kKTtcclxuICAgIGF0dHJpYnV0ZXMgPSBhdHJvcGEuc2V0QXNPcHRpb25hbEFyZyh7fSwgYXR0cmlidXRlcyk7XHJcbiAgICBvbmxvYWRIYW5kbGVyID0gYXRyb3BhLnNldEFzT3B0aW9uYWxBcmcoYXRyb3BhLm5vcCwgb25sb2FkSGFuZGxlcik7XHJcbiAgICBjYWxsYmFjayA9IGF0cm9wYS5zZXRBc09wdGlvbmFsQXJnKGF0cm9wYS5ub3AsIGNhbGxiYWNrKTtcclxuICAgIFxyXG4gICAgZWwgPSBkb2NyZWYuY3JlYXRlRWxlbWVudChlbGVtZW50VHlwZSk7XHJcbiAgICBmb3IgKHggaW4gYXR0cmlidXRlcykge1xyXG4gICAgICAgIGlmIChhdHRyaWJ1dGVzLmhhc093blByb3BlcnR5KHgpKSB7XHJcbiAgICAgICAgICAgIGVsLnNldEF0dHJpYnV0ZSh4LCBhdHRyaWJ1dGVzW3hdKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgb25sb2FkSGFuZGxlciwgdHJ1ZSk7XHJcbiAgICBjYWxsYmFjayhlbCk7XHJcbiAgICBwYXJlbnROb2QuYXBwZW5kQ2hpbGQoZWwpO1xyXG4gICAgcmV0dXJuIGVsO1xyXG59O1xyXG4vKipcclxuICogSGlkZGVuIElmcmFtZSBJbmplY3Rvci5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwMzA4XHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBpZCBUaGUgaWQgb2YgdGhlIGVsZW1lbnQgdG8gYmUgaW5qZWN0ZWQuXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBzcmNVcmwgVGhlIFVSTCB0byBsb2FkIGluIHRoZSBpZnJhbWUuXHJcbiAqIEBwYXJhbSB7SFRNTCBET00gRG9jdW1lbnR9IGRvY3JlZiBPcHRpb25hbC4gUmVmZXJlbmNlIHRvIHRoZSBkb2N1bWVudCB0b1xyXG4gKiAgaW5qZWN0IHRoZSBpZnJhbWUgaW4uIERlZmF1bHRzIHRvIGRvY3VtZW50LlxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvbmxvYWRIYW5kbGVyIE9wdGlvbmFsLiBUaGUgb25sb2FkIGhhbmRsZXIgZm9yIHRoZSBpZnJhbWUuXHJcbiAqIEBwYXJhbSB7RE9NIE5vZGV9IHBhcmVudE5vZCBPcHRpb25hbC4gUmVmZXJlbmN0IHRvIHRoZSBwYXJlbnQgbm9kZSB0b1xyXG4gKiAgYXBwZW5kIHRoZSBpZnJhbWUgdG8uIERlZmF1bHRzIHRvIGRvY3JlZi5ib2R5XHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIE9wdGlvbmFsLiBDYWxsYmFjayBmdW5jdGlvbiBmb3IgcHJlcHJvY2Vzc2luZ1xyXG4gKiAgdGhlIGlmcmFtZSBwcmlvciB0byBpbmplY3Rpb24uIENhbGxlZCB3aXRoIGEgcmVmZXJlbmNlIHRvIHRoZSBpZnJhbWUuXHJcbiAqIEByZXR1cm4ge0hUTUwgRWxlbWVudH0gUmV0dXJucyBhIHJlZmVyZW5jZSB0byB0aGUgSFRNTCBFbGVtZW50IGNyZWF0ZWQgYW5kXHJcbiAqICBpbmplY3RlZC5cclxuICogQHNlZSBhdHJvcGEuaW5qZWN0LmVsZW1lbnRcclxuICogQHNlZSA8YSBocmVmPVwiaHR0cDovL3d3dy53My5vcmcvU2VjdXJpdHkvd2lraS9TYW1lX09yaWdpbl9Qb2xpY3lcIj5cclxuICogaHR0cDovL3d3dy53My5vcmcvU2VjdXJpdHkvd2lraS9TYW1lX09yaWdpbl9Qb2xpY3k8L2E+XHJcbiAqIEBleGFtcGxlXHJcbiAqICBlbCA9IGF0cm9wYS5pbmplY3QuaGlkZGVuRnJhbWUoXHJcbiAqICAgICAgJ2luamVjdEhpZGRlbkZyYW1lMycsXHJcbiAqICAgICAgJ2h0dHA6Ly9sb2NhbGhvc3QvJyxcclxuICogICAgICBudWxsLFxyXG4gKiAgICAgIGZ1bmN0aW9uICgpIHtcclxuICogICAgICAgICAgY29uc29sZS5sb2coJ2hleSBsb29rIGF0IHRoYXQsIHRoZSBmcmFtZSBpcyByZWFkeSEnKTtcclxuICogICAgICB9LFxyXG4gKiAgICAgIG51bGwsXHJcbiAqICAgICAgbnVsbFxyXG4gKiAgKTtcclxuICovXHJcbmF0cm9wYS5pbmplY3QuaGlkZGVuRnJhbWUgPSBmdW5jdGlvbiAoXHJcbiAgICBpZCwgc3JjVVJMLCBkb2NyZWYsIG9ubG9hZEhhbmRsZXIsIHBhcmVudE5vZCwgY2FsbGJhY2tcclxuKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIGF0cm9wYS5zdXBwb3J0Q2hlY2soJ2luamVjdCcpO1xyXG4gICAgXHJcbiAgICByZXR1cm4gYXRyb3BhLmluamVjdC5lbGVtZW50KFxyXG4gICAgICAgICdpZnJhbWUnLFxyXG4gICAgICAgIGRvY3JlZixcclxuICAgICAgICBwYXJlbnROb2QsXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBcImlkXCIgOiBpZCxcclxuICAgICAgICAgICAgXCJzcmNcIiA6IHNyY1VSTCxcclxuICAgICAgICAgICAgXCJ3aWR0aFwiIDogXCIwcHhcIixcclxuICAgICAgICAgICAgXCJoZWlnaHRcIiA6IFwiMHB4XCIsXHJcbiAgICAgICAgICAgIFwiYm9yZGVyXCIgOiBcIjBweFwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBvbmxvYWRIYW5kbGVyLFxyXG4gICAgICAgIGNhbGxiYWNrXHJcbiAgICApO1xyXG59O1xyXG4vKipcclxuICogU2NyaXB0IEluamVjdG9yLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMjA5MDlcclxuICogQHBhcmFtIHtTdHJpbmd9IGlkIFRoZSBpZCBvZiB0aGUgZWxlbWVudCB0byBiZSBpbmplY3RlZC5cclxuICogQHBhcmFtIHtTdHJpbmd9IHNyY1VybCBUaGUgVVJMIHdoZXJlIHRoZSBzY3JpcHQgaXMgbG9jYXRlZC5cclxuICogQHBhcmFtIHtIVE1MIERPTSBEb2N1bWVudH0gZG9jcmVmIE9wdGlvbmFsLiBUaGUgZG9jdW1lbnQgdG8gaW5qZWN0IHRoZVxyXG4gKiAgc2NyaXB0IGludG8uIERlZmF1bHRzIHRvIGRvY3VtZW50LlxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBPcHRpb25hbC4gQSBmdW5jdGlvbiB0byBleGVjdXRlIG9uY2UgdGhlIHNjcmlwdFxyXG4gKiAgaGFzIGxvYWRlZC4gRGVmYXVsdHMgdG8gZnVuY3Rpb24gKCkge307XHJcbiAqIEByZXR1cm4ge0hUTUwgRWxlbWVudH0gUmV0dXJucyBhIHJlZmVyZW5jZSB0byB0aGUgSFRNTCBFbGVtZW50IGNyZWF0ZWQgYW5kXHJcbiAqICBpbmplY3RlZC5cclxuICogQHNlZSBhdHJvcGEuaW5qZWN0LmVsZW1lbnRcclxuICogQHNlZSA8YSBocmVmPVwiaHR0cDovL3d3dy53My5vcmcvU2VjdXJpdHkvd2lraS9TYW1lX09yaWdpbl9Qb2xpY3lcIj5cclxuICogaHR0cDovL3d3dy53My5vcmcvU2VjdXJpdHkvd2lraS9TYW1lX09yaWdpbl9Qb2xpY3k8L2E+XHJcbiAqIEBleGFtcGxlXHJcbiAqICAvLyBHaXZlbiBhIHNjcmlwdCBcImR1bW15LmpzXCIgbG9jYXRlZCBhdCBcImh0dHA6Ly9sb2NhbGhvc3QvZHVtbXkuanNcIlxyXG4gKiAgLy8geW91IGNhbiBmZXRjaCB0aGUgc2NyaXB0IGFuZCBleGVjdXRlIGZ1bmN0aW9ucyBmcm9tIHdpdGhpbiBpdFxyXG4gKiAgLy8gYXMgc29vbiBhcyBpdCBoYXMgbG9hZGVkIGludG8gdGhlIHBhZ2UuXHJcbiAqICBcclxuICogIC8vIGNvbnRlbnRzIG9mIFwiZHVtbXkuanNcIlxyXG4gKiAgZnVuY3Rpb24gZHVtbXkoKSB7XHJcbiAqICAgICAgcmV0dXJuICdkdW1teSc7XHJcbiAqICB9XHJcbiAqICBcclxuICogIC8vIGluamVjdGluZyBcImR1bW15LmpzXCIgaW50byBhbnkgcGFnZS4gVGhlIHNjcmlwdCB0YWcgaXNuJ3QgcmVzdHJpY3RlZCBieVxyXG4gKiAgLy8gdGhlIHNhbWUgb3JpZ2luIHBvbGljeS4gSG9zdCB5b3VyIHNjcmlwdCBhbnl3aGVyZSBhbmQgaW5qZWN0IGl0IHRvIGFueVxyXG4gKiAgLy8gcGFnZSBvbiB0aGUgbmV0IHRoYXQgeW91IHdhbnQgdG8uXHJcbiAqICBlbCA9IGF0cm9wYS5pbmplY3Quc2NyaXB0KFxyXG4gKiAgICAgICdpbmplY3RTY3JpcHQnLFxyXG4gKiAgICAgICdodHRwOi8vbG9jYWxob3N0LycsXHJcbiAqICAgICAgZG9jdW1lbnQsXHJcbiAqICAgICAgZnVuY3Rpb24gKCkge1xyXG4gKiAgICAgICAgICBjb25zb2xlLmxvZyhkdW1teSgpKTtcclxuICogICAgICB9XHJcbiAqICApO1xyXG4gKiAgLy8geW91IG1heSBhbHNvIGxvYWQgc2NyaXB0cyBpbnRvIGlmcmFtZXMgYnkgcmVwbGFjaW5nIHRoZSB0aGlyZCBwYXJhbWV0ZXJcclxuICogIC8vIHdpdGggYSByZWZlcmVuY2UgdG8gdGhlIGlmcmFtZSdzIGRvY3VtZW50IG9iamVjdC5cclxuICovXHJcbmF0cm9wYS5pbmplY3Quc2NyaXB0ID0gZnVuY3Rpb24gKGlkLCBzcmNVUkwsIGRvY3JlZiwgY2FsbGJhY2spIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgYXRyb3BhLnN1cHBvcnRDaGVjaygnaW5qZWN0Jyk7XHJcbiAgICBcclxuICAgIHZhciBhdHRyaWJ1dGVzLFxyXG4gICAgZWxlbWVudFR5cGUsXHJcbiAgICBwYXJlbnROb2QgPSBudWxsLFxyXG4gICAgb25sb2FkSGFuZGxlcixcclxuICAgIGVsO1xyXG4gICAgYXR0cmlidXRlcyA9IHtcclxuICAgICAgICBcImlkXCIgOiBpZCxcclxuICAgICAgICBcInR5cGVcIiA6IFwidGV4dC9qYXZhc2NyaXB0XCIsXHJcbiAgICAgICAgXCJzcmNcIiA6IHNyY1VSTFxyXG4gICAgfTtcclxuICAgIGVsZW1lbnRUeXBlID0gJ3NjcmlwdCc7XHJcbiAgICBvbmxvYWRIYW5kbGVyID0gY2FsbGJhY2s7XHJcbiAgICBlbCA9IGF0cm9wYS5pbmplY3QuZWxlbWVudChcclxuICAgICAgICBlbGVtZW50VHlwZSwgZG9jcmVmLCBwYXJlbnROb2QsIGF0dHJpYnV0ZXMsIG9ubG9hZEhhbmRsZXIpO1xyXG4gICAgcmV0dXJuIGVsO1xyXG59O1xyXG5cclxuXHJcblxyXG5cclxud2hpbGUoYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLmxlbmd0aCA+IDApIHtcclxuICAgIGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5wb3AoKSgpO1xyXG59XHJcbm1vZHVsZS5leHBvcnRzID0gYXRyb3BhO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vZG9jcy92c2RvYy9PcGVuTGF5ZXJzQWxsLmpzXCIvPlxyXG52YXIgYXRyb3BhID0gcmVxdWlyZSgnYXRyb3BhLWhlYWRlcicpO1xyXG4vKmpzbGludFxyXG4gICAgaW5kZW50OiA0LFxyXG4gICAgbWF4ZXJyOiA1MCxcclxuICAgIHdoaXRlOiB0cnVlLFxyXG4gICAgYnJvd3NlcjogdHJ1ZSxcclxuICAgIGRldmVsOiB0cnVlLFxyXG4gICAgcGx1c3BsdXM6IHRydWUsXHJcbiAgICByZWdleHA6IHRydWVcclxuKi9cclxuLypnbG9iYWwgYXRyb3BhLCBYUGF0aFJlc3VsdCAqL1xyXG4vLyBlbmQgaGVhZGVyXHJcblxyXG4vKipcclxuICogVXRpbGl0aWVzIGZvciBoYW5kbGluZyBvYmplY3RzLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzAxMjFcclxuICogQG5hbWVzcGFjZSBVdGlsaXRpZXMgZm9yIGhhbmRsaW5nIG9iamVjdHMuXHJcbiAqL1xyXG5hdHJvcGEub2JqZWN0cyA9IHt9O1xyXG4vKipcclxuICogQ29udmVydHMgYW4gb2JqZWN0IGludG8gYW4gYXJyYXkgb2YgYXJyYXlzIHRvIG1ha2UgaXQgcG9zc2libGUgdG8gc29ydCBhbmRcclxuICogIGVudW1lcmF0ZSBwcm9wZXJ0aWVzIHJlbGlhYmx5LlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzAxMjBcclxuICogQG1ldGhvZE9mIGF0cm9wYS5vYmplY3RzLlxyXG4gKiBAZXhhbXBsZVxyXG4gKiAgdmFyIHggPSB7XHJcbiAqICAgICAgXCJzdHVmZmluZ1wiIDogXCJjb3R0b25cIixcclxuICogICAgICBcIm5vc2VcIiA6IFwiYnV0dG9uXCIsXHJcbiAqICAgICAgXCJuYW1lXCIgOiBcImJlYXJcIlxyXG4gKiAgfTtcclxuICogIGNvbnNvbGUubG9nKCBhdHJvcGEub2JqZWN0cy5jb252ZXJ0T2JqZWN0VG9BcnJheSh4KSApO1xyXG4gKiAgLy8gbG9ncyBbW1wic3R1ZmZpbmdcIiwgXCJjb3R0b25cIl0sIFtcIm5vc2VcIiwgXCJidXR0b25cIl0sIFtcIm5hbWVcIiwgXCJiZWFyXCJdXVxyXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIEFuIG9iamVjdC5cclxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGFuIGFycmF5IG9mIGFycmF5cyB3aGVyZSBlYWNoXHJcbiAqICBuZXN0ZWQgYXJyYXkgd2lsbCBoYXZlIHRoZSBvYmplY3QncyBrZXkgc3RvcmVkIGluIGVsZW1lbnQgMCBhbmRcclxuICogIHRoZSB2YWx1ZSBzdG9yZWQgaW4gZWxlbWVudCAxLiBUaGUgcmVhc29uIGFuIGFycmF5IG9mIGFycmF5cyBpc1xyXG4gKiAgcmV0dXJuZWQgaXMgYmVjYXVzZSBKYXZhU2NyaXB0IGRvZXMgbm90IGd1YXJhbnRlZSB0aGUgb3JkZXIgb2ZcclxuICogIHByb3BlcnRpZXMgb24gYW4gb2JqZWN0IHNvIHRoZXJlIGlzIG5vIHJlbGl6YmxlIHdheSB0byBzb3J0XHJcbiAqICBhbiBvYmplY3RzIGtleXMgb3IgdmFsdWVzLlxyXG4gKiBAc2VlIFwiVGhlIG1lY2hhbmljcyBhbmQgb3JkZXIgb2YgZW51bWVyYXRpbmcgdGhlIHByb3BlcnRpZXMgW29mIGFuIG9iamVjdF1cclxuICogIGlzIG5vdCBzcGVjaWZpZWQuXCIgXHJcbiAqICA8YSBocmVmPVwiaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzUuMS8jc2VjLTEyLjYuNFwiPlxyXG4gKiAgaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzUuMS8jc2VjLTEyLjYuNDwvYT5cclxuICovXHJcbmF0cm9wYS5vYmplY3RzLmNvbnZlcnRPYmplY3RUb0FycmF5ID0gZnVuY3Rpb24gY29udmVydE9iamVjdFRvQXJyYXkob2JqKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHZhciBwcm9wLCBvdXQgPSBbXTtcclxuICAgIGZvciAocHJvcCBpbiBvYmopIHtcclxuICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KHByb3ApKSB7XHJcbiAgICAgICAgICAgIG91dC5wdXNoKFtwcm9wLCBvYmpbcHJvcF1dKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gb3V0O1xyXG59O1xyXG4vKipcclxuICogQ29udmVydHMgYW4gb2JqZWN0IGludG8gYW4gYXJyYXkgb2YgYXJyYXlzIGFuZCBhbGxvd3MgZm9yIHJlbGlhYmxlIHNvcnRpbmdcclxuICogIGFuZCBlbnVtZXJhdGlvbi5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwMTIwXHJcbiAqIEBleGFtcGxlXHJcbiAqICB2YXIgd29yZHNDb3VudGVkLCBzb3J0ZWRCeVZhbHVlcywgc29ydGVkQnlQcm9wZXJ0aWVzO1xyXG4gKiAgd29yZHNDb3VudGVkID0ge1xyXG4gKiAgICAgIFwiZG9jdW1lbnQzXCIgOiAxNTAsXHJcbiAqICAgICAgXCJkb2N1bWVudDFcIiA6IDMwMCxcclxuICogICAgICBcImRvY3VtZW50MlwiIDogMjVcclxuICogIH07XHJcbiAqICAvLyBzb3J0aW5nIGJ5IHByb3BlcnR5IHZhbHVlIGFzIG51bWJlcnNcclxuICogIGZ1bmN0aW9uIHZhbFNvcnQoYSwgYikge1xyXG4gKiAgICAgIHJldHVybiBhWzFdIC0gYlsxXTtcclxuICogIH1cclxuICogIC8vIHNvcnRpbmcgYnkgcHJvcGVydHkgbmFtZXMgYXMgc3RyaW5nc1xyXG4gKiAgZnVuY3Rpb24gcHJvcFNvcnQoYSwgYikge1xyXG4gKiAgICAgIHJldHVybiBhWzBdLmxvY2FsZUNvbXBhcmUoYlswXSk7XHJcbiAqICB9XHJcbiAqICBzb3J0ZWRCeVZhbHVlcyA9IGF0cm9wYS5vYmplY3RzLnNvcnQod29yZHNDb3VudGVkLCB2YWxTb3J0KTtcclxuICogIHNvcnRlZEJ5UHJvcGVydGllcyA9IGF0cm9wYS5vYmplY3RzLnNvcnQod29yZHNDb3VudGVkLCBwcm9wU29ydCk7XHJcbiAqICBjb25zb2xlLmxvZygnc29ydGVkIGJ5IHZhbHVlOiAnLCBzb3J0ZWRCeVZhbHVlcyk7XHJcbiAqICBjb25zb2xlLmxvZygnc29ydGVkIGJ5IHByb3BlcnRpZXM6ICcsIHNvcnRlZEJ5UHJvcGVydGllcyk7XHJcbiAqICBcclxuICogIC8vIGxvZ3M6XHJcbiAqICAvLyBzb3J0ZWQgYnkgdmFsdWU6IFtcclxuICogIC8vICAgICBbXCJkb2N1bWVudDJcIiwgMjVdLFxyXG4gKiAgLy8gICAgIFtcImRvY3VtZW50M1wiLCAxNTBdLFxyXG4gKiAgLy8gICAgIFtcImRvY3VtZW50MVwiLCAzMDBdXHJcbiAqICAvLyBdXHJcbiAqICAvLyBzb3J0ZWQgYnkgcHJvcGVydGllczogW1xyXG4gKiAgLy8gICAgIFtcImRvY3VtZW50MVwiLCAzMDBdLFxyXG4gKiAgLy8gICAgIFtcImRvY3VtZW50MlwiLCAyNV0sXHJcbiAqICAvLyAgICAgW1wiZG9jdW1lbnQzXCIsIDE1MF1cclxuICogIC8vIF1cclxuICogQGV4YW1wbGVcclxuICogIExleGljb2dyYXBoaWMgc29ydGluZzpcclxuICogIFRoaXMgICAgWzEsIDIsIDEwLCAnQScsICdhJywnWicsICd6J11cclxuICogIGJlY29tZXMgWzEsIDEwLCAyLCBcIkFcIiwgXCJaXCIsIFwiYVwiLCBcInpcIl1cclxuICogQHBhcmFtIHtPYmplY3R9IG9iaiBBbiBvYmplY3QuXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHNvcnRGbiBPcHRpb25hbC4gVGhlIHNvcnRpbmcgZnVuY3Rpb24uIFRoaXMgZnVuY3Rpb24gd2lsbFxyXG4gKiAgYmUgZ2l2ZW4gdHdvIGFyZ3VtZW50cy4gQ29tcGFyZSB0aGUgdHdvIGFyZ3VtZW50cyBhbmQgcmV0dXJuOlxyXG4gKiAgMCBpZiB0aGV5IGFyZSBlcXVhbCwgZ3JlYXRlciB0aGFuIHplcm8gaWYgdGhlIGZpcnN0IGFyZ3VtZW50XHJcbiAqICBpcyBncmVhdGVyIHRoYW4gdGhlIHNlY29uZCwgb3IgbGVzcyB0aGFuIHplcm8gaWYgdGhlIHNlY29uZFxyXG4gKiAgYXJndW1lbnQgaXMgZ3JlYXRlciB0aGFuIHRoZSBmaXJzdC4gSWYgdGhlIHNvcnRpbmcgZnVuY3Rpb25cclxuICogIGlzIG5vdCBnaXZlbiwgdGhlIGFycmF5IHdpbGwgYmUgc29ydGVkIGxleG9ncmFwaGljYWxseSBieVxyXG4gKiAgZWFjaCBlbGVtZW50cyA8Y29kZT50b1N0cmluZzwvY29kZT4gdmFsdWUuXHJcbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBhbiBhcnJheSBvZiBhcnJheXMgd2hlcmUgZWFjaFxyXG4gKiAgbmVzdGVkIGFycmF5IHdpbGwgaGF2ZSB0aGUgb2JqZWN0cyBrZXkgc3RvcmVkIGluIGVsZW1lbnQgMCBhbmRcclxuICogIHRoZSB2YWx1ZSBzdG9yZWQgaW4gZWxlbWVudCAxLiBUaGUgcmVhc29uIGFuIGFycmF5IG9mIGFycmF5cyBpc1xyXG4gKiAgcmV0dXJuZWQgaXMgYmVjYXVzZSBKYXZhU2NyaXB0IGRvZXMgbm90IGd1YXJhbnRlZSB0aGUgb3JkZXIgb2ZcclxuICogIHByb3BlcnRpZXMgb24gYW4gb2JqZWN0IHNvIHRoZXJlIGlzIG5vIHJlbGl6YmxlIHdheSB0byBzb3J0XHJcbiAqICBhbiBvYmplY3RzIGtleXMgb3IgdmFsdWVzLlxyXG4gKiBAc2VlIGF0cm9wYS5vYmplY3RzLmNvbnZlcnRPYmplY3RUb0FycmF5XHJcbiAqIEBzZWUgPGEgaHJlZj1cImh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi81LjEvI3NlYy0xNS40LjQuMTFcIj5cclxuICogIGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi81LjEvI3NlYy0xNS40LjQuMTE8L2E+XHJcbiAqIEBzZWUgPGEgaHJlZj1cImh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvQXJyYXkvc29ydFwiPlxyXG4gKiAgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9BcnJheS9zb3J0PC9hPlxyXG4gKi9cclxuYXRyb3BhLm9iamVjdHMuc29ydCA9IGZ1bmN0aW9uIHNvcnQob2JqLCBzb3J0Rm4pIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgcmV0dXJuIGF0cm9wYS5vYmplY3RzLmNvbnZlcnRPYmplY3RUb0FycmF5KG9iaikuc29ydChzb3J0Rm4pO1xyXG59O1xyXG4vKipcclxuICogU29ydHMgYW4gb2JqZWN0IGJ5IGl0cyB2YWx1ZXMgdXNpbmcgYSB1c2VyIGRlZmluZWQgYWxnb3JpdGhtLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzAxMjBcclxuICogQGV4YW1wbGVcclxuICogIHZhciB3b3Jkc0NvdW50ZWQ7XHJcbiAqICB3b3Jkc0NvdW50ZWQgPSB7XHJcbiAqICAgICAgXCJkb2N1bWVudDNcIiA6IDE1MCxcclxuICogICAgICBcImRvY3VtZW50MVwiIDogMzAwLFxyXG4gKiAgICAgIFwiZG9jdW1lbnQyXCIgOiAyNVxyXG4gKiAgfTtcclxuICogIC8vIHNvcnRpbmcgYnkgdmFsdWVzIGFzIG51bWJlcnNcclxuICogIGZ1bmN0aW9uIHNvcnRGbihhLCBiKSB7XHJcbiAqICAgICAgcmV0dXJuIGEgLSBiO1xyXG4gKiAgfVxyXG4gKiAgY29uc29sZS5sb2coIGF0cm9wYS5vYmplY3RzLnNvcnRWYWx1ZXMod29yZHNDb3VudGVkLCBzb3J0Rm4pICk7XHJcbiAqICAvLyBsb2dzOiBbW1wiZG9jdW1lbnQyXCIsIDI1XSwgW1wiZG9jdW1lbnQzXCIsIDE1MF0sIFtcImRvY3VtZW50MVwiLCAzMDBdXVxyXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIEFuIG9iamVjdC5cclxuICogQHBhcmFtIHtGdW5jdGlvbn0gc29ydEZuIFRoZSBzb3J0aW5nIGZ1bmN0aW9uLiBUaGlzIGZ1bmN0aW9uIHdpbGxcclxuICogIGJlIGdpdmVuIHR3byBhcmd1bWVudHMuIENvbXBhcmUgdGhlIHR3byBhcmd1bWVudHMgYW5kIHJldHVybjpcclxuICogIDAgaWYgdGhleSBhcmUgZXF1YWwsIGdyZWF0ZXIgdGhhbiB6ZXJvIGlmIHRoZSBmaXJzdCBhcmd1bWVudFxyXG4gKiAgaXMgZ3JlYXRlciB0aGFuIHRoZSBzZWNvbmQsIG9yIGxlc3MgdGhhbiB6ZXJvIGlmIHRoZSBzZWNvbmRcclxuICogIGFyZ3VtZW50IGlzIGdyZWF0ZXIgdGhhbiB0aGUgZmlyc3QuXHJcbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBhbiBhcnJheSBvZiBhcnJheXMgd2hlcmUgZWFjaFxyXG4gKiAgbmVzdGVkIGFycmF5IHdpbGwgaGF2ZSB0aGUgb2JqZWN0cyBrZXkgc3RvcmVkIGluIGVsZW1lbnQgMCBhbmRcclxuICogIHRoZSB2YWx1ZSBzdG9yZWQgaW4gZWxlbWVudCAxLlxyXG4gKiBAc2VlIGF0cm9wYS5vYmplY3RzLnNvcnRcclxuICovXHJcbmF0cm9wYS5vYmplY3RzLnNvcnRWYWx1ZXMgPSBmdW5jdGlvbiBzb3J0VmFsdWVzKG9iaiwgc29ydEZuKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHZhciB2YWxTb3J0ID0gZnVuY3Rpb24oYSwgYikge1xyXG4gICAgICAgIHJldHVybiBzb3J0Rm4oYVsxXSwgYlsxXSk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIGF0cm9wYS5vYmplY3RzLnNvcnQob2JqLCB2YWxTb3J0KTtcclxufTtcclxuLyoqXHJcbiAqIFNvcnRzIGFuIG9iamVjdCBieSBpdHMgcHJvcGVydGllcyB1c2luZyBhIHVzZXIgZGVmaW5lZCBhbGdvcml0aG0uXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDEyMFxyXG4gKiBAZXhhbXBsZVxyXG4gKiAgdmFyIHdvcmRzQ291bnRlZDtcclxuICogIHdvcmRzQ291bnRlZCA9IHtcclxuICogICAgICBcImRvY3VtZW50M1wiIDogMTUwLFxyXG4gKiAgICAgIFwiZG9jdW1lbnQxXCIgOiAzMDAsXHJcbiAqICAgICAgXCJkb2N1bWVudDJcIiA6IDI1XHJcbiAqICB9O1xyXG4gKiAgLy8gc29ydGluZyBieSBwcm9wZXJ0eSBuYW1lcyBhcyBzdHJpbmdzXHJcbiAqICBmdW5jdGlvbiBzb3J0Rm4oYSwgYikge1xyXG4gKiAgICAgIHJldHVybiBhLmxvY2FsZUNvbXBhcmUoYik7XHJcbiAqICB9XHJcbiAqICBjb25zb2xlLmxvZyggYXRyb3BhLm9iamVjdHMuc29ydFByb3BlcnRpZXMod29yZHNDb3VudGVkLCBzb3J0Rm4pICk7XHJcbiAqICAvLyBsb2dzOiBbW1wiZG9jdW1lbnQxXCIsIDMwMF0sIFtcImRvY3VtZW50MlwiLCAyNV0sIFtcImRvY3VtZW50M1wiLCAxNTBdXVxyXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIEFuIG9iamVjdC5cclxuICogQHBhcmFtIHtGdW5jdGlvbn0gc29ydEZuIFRoZSBzb3J0aW5nIGZ1bmN0aW9uLiBUaGlzIGZ1bmN0aW9uIHdpbGxcclxuICogIGJlIGdpdmVuIHR3byBhcmd1bWVudHMuIENvbXBhcmUgdGhlIHR3byBhcmd1bWVudHMgYW5kIHJldHVybjpcclxuICogIDAgaWYgdGhleSBhcmUgZXF1YWwsIGdyZWF0ZXIgdGhhbiB6ZXJvIGlmIHRoZSBmaXJzdCBhcmd1bWVudFxyXG4gKiAgaXMgZ3JlYXRlciB0aGFuIHRoZSBzZWNvbmQsIG9yIGxlc3MgdGhhbiB6ZXJvIGlmIHRoZSBzZWNvbmRcclxuICogIGFyZ3VtZW50IGlzIGdyZWF0ZXIgdGhhbiB0aGUgZmlyc3QuXHJcbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBhbiBhcnJheSBvZiBhcnJheXMgd2hlcmUgZWFjaFxyXG4gKiAgbmVzdGVkIGFycmF5IHdpbGwgaGF2ZSB0aGUgb2JqZWN0cyBrZXkgc3RvcmVkIGluIGVsZW1lbnQgMCBhbmRcclxuICogIHRoZSB2YWx1ZSBzdG9yZWQgaW4gZWxlbWVudCAxLlxyXG4gKiBAc2VlIGF0cm9wYS5vYmplY3RzLnNvcnRcclxuICovXHJcbmF0cm9wYS5vYmplY3RzLnNvcnRQcm9wZXJ0aWVzID0gZnVuY3Rpb24gc29ydFZhbHVlcyhvYmosIHNvcnRGbikge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICB2YXIgcHJvcFNvcnQgPSBmdW5jdGlvbihhLCBiKSB7XHJcbiAgICAgICAgcmV0dXJuIHNvcnRGbihhWzBdLCBiWzBdKTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gYXRyb3BhLm9iamVjdHMuc29ydChvYmosIHByb3BTb3J0KTtcclxufTtcclxuLyoqXHJcbiAqIFNvcnRzIGFuIG9iamVjdCBieSBpdHMgdmFsdWVzIG51bWVyaWNhbGx5LlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzAxMjBcclxuICogQGV4YW1wbGVcclxuICogIHZhciB3b3Jkc0NvdW50ZWQ7XHJcbiAqICB3b3Jkc0NvdW50ZWQgPSB7XHJcbiAqICAgICAgXCJkb2N1bWVudDNcIiA6IDE1MCxcclxuICogICAgICBcImRvY3VtZW50MVwiIDogMzAwLFxyXG4gKiAgICAgIFwiZG9jdW1lbnQyXCIgOiAyNVxyXG4gKiAgfTtcclxuICogIGNvbnNvbGUubG9nKCBhdHJvcGEub2JqZWN0cy5zb3J0VmFsdWVzTnVtZXJpY2FsbHkod29yZHNDb3VudGVkKSApO1xyXG4gKiAgLy8gbG9ncyBbW1wiZG9jdW1lbnQyXCIsIDI1XSwgW1wiZG9jdW1lbnQzXCIsIDE1MF0sIFtcImRvY3VtZW50MVwiLCAzMDBdXVxyXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIEEgc2ltcGxlIG9iamVjdCB3aGVyZSB0aGUgcHJvcGVydGllc1xyXG4gKiAgYWxsIGhhdmUgbnVtZXJpYy1pc2ggdmFsdWVzLlxyXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYW4gYXJyYXkgb2YgYXJyYXlzIHdoZXJlIGVhY2hcclxuICogIG5lc3RlZCBhcnJheSB3aWxsIGhhdmUgdGhlIG9iamVjdHMga2V5IHN0b3JlZCBpbiBlbGVtZW50IDAgYW5kXHJcbiAqICB0aGUgdmFsdWUgc3RvcmVkIGluIGVsZW1lbnQgMS5cclxuICogQHNlZSBhdHJvcGEub2JqZWN0cy5zb3J0XHJcbiAqL1xyXG5hdHJvcGEub2JqZWN0cy5zb3J0VmFsdWVzTnVtZXJpY2FsbHkgPSBmdW5jdGlvbiBzb3J0VmFsdWVzTnVtZXJpY2FsbHkob2JqKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIGZ1bmN0aW9uIHNvcnRGbihhLCBiKSB7XHJcbiAgICAgICAgcmV0dXJuIChhIC0gYik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXRyb3BhLm9iamVjdHMuc29ydFZhbHVlcyhvYmosIHNvcnRGbik7XHJcbn07XHJcbi8qKlxyXG4gKiBUaHJvd3MgYW4gZXJyb3IsIDxjb2RlPlN0cmluZy5wcm90b3R5cGUubG9jYWxlQ29tcGFyZTwvY29kZT4gaXMgbm90IFxyXG4gKiAgc3RhbmRhcmRpemVkLlxyXG4gKiBcclxuICogIFllcywgbG9jYWxlQ29tcGFyZSBpcyBpbiB0aGUgc3RhbmRhcmQgYnV0LCBhdCB0aGlzIHRpbWUgdGhlIGFjdHVhbFxyXG4gKiAgY29tcGFyaXNvbiBpcyBpbXBsZW1lbnRhdGlvbiBkZXBlbmRhbnQuIFRoaXMgbWVhbnMgdGhhdCBcImFscGhhYmV0aWNhbCBvcmRlclwiXHJcbiAqICBjYW4gYmUgZGlmZmVyZW50IG9uIGRpZmZlcmVudCBwbGF0Zm9ybXMuIFdoYXQgSSBmb3VuZCB3YXMgdGhhdCBpbiBub2RlIHRoZVxyXG4gKiAgYXJyYXkgb2YgPGNvZGU+WydhJywnWicsJ0EnLCd6J108L2NvZGU+IHdvdWxkIGJlIHNvcnRlZCB0b1xyXG4gKiAgPGNvZGU+WydBJywnWicsJ2EnLCd6XCJdPC9jb2RlPiwgd2hpbGUgb25cclxuICogIGZpcmVmb3ggaXQgd291bGQgYmUgc29ydGVkIHRvIDxjb2RlPlsnYScsJ0EnLCd6JywnWiddPC9jb2RlPi4gV2hvIGtub3dzIGlmXHJcbiAqICBhbm90aGVyIGltcGxlbWVudG9yIHdvdWxkIHNvcnQgaXQgPGNvZGU+WydBJywnYScsJ1onLCd6J108L2NvZGU+P1xyXG4gKiBcclxuICogSW4gb3JkZXIgdG8gcHJvdmlkZSBhIHJlbGlhYmxlIGltcGxlbWVudGF0aW9uIEkgd291bGQgaGF2ZSB0byBjcmVhdGUgbXkgb3duXHJcbiAqICBpbXBsZW1lbnRhdGlvbiBvZiA8Y29kZT5TdHJpbmcucHJvdG90eXBlLmxvY2FsZUNvbXBhcmU8L2NvZGU+IGFuZCB0aGF0J3NcclxuICogIGp1c3QgdG9vIG11Y2ggd29yayBmb3IgbWUgdG8gZG8gYWxvbmUuXHJcbiAqIEB0aHJvd3Mge0Vycm9yfSBcIlN0cmluZy5wcm90b3R5cGUubG9jYWxlQ29tcGFyZSBpcyBub3Qgc3RhbmRhcmRpemVkXCJcclxuICovXHJcbmF0cm9wYS5vYmplY3RzLnNvcnRWYWx1ZXNBbHBoYWJldGljYWxseSA9IGZ1bmN0aW9uIHNvcnRWYWx1ZXNBbHBoYWJldGljYWxseSgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiU3RyaW5nLnByb3RvdHlwZS5sb2NhbGVDb21wYXJlIGlzIG5vdCBzdGFuZGFyZGl6ZWRcIik7XHJcbn07XHJcbi8qKlxyXG4gKiBTb3J0cyBhbiBvYmplY3QgYnkgaXRzIHByb3BlcnRpZXMgbnVtZXJpY2FsbHkuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDEyMFxyXG4gKiBAZXhhbXBsZVxyXG4gKiAgdmFyIHdvcmRzQ291bnRlZDtcclxuICogIHdvcmRzQ291bnRlZCA9IHtcclxuICogICAgICBcIjNcIiA6IFwiRG9jdW1lbnQgQVwiLFxyXG4gKiAgICAgIFwiMlwiIDogXCJEb2N1bWVudCBaXCIsXHJcbiAqICAgICAgXCIxXCIgOiBcIkRvY3VtZW50IE1cIlxyXG4gKiAgfTtcclxuICogIGNvbnNvbGUubG9nKCBhdHJvcGEub2JqZWN0cy5zb3J0UHJvcGVydGllc051bWVyaWNhbGx5KHdvcmRzQ291bnRlZCkgKTtcclxuICogIC8vIGxvZ3M6IFtbXCIxXCIsIFwiRG9jdW1lbnQgTVwiXSwgW1wiMlwiLCBcIkRvY3VtZW50IFpcIl0sIFtcIjNcIiwgXCJEb2N1bWVudCBBXCJdXVxyXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIEEgc2ltcGxlIG9iamVjdCB3aGVyZSB0aGUgcHJvcGVydGllc1xyXG4gKiAgYWxsIGhhdmUgbnVtZXJpYy1pc2ggdmFsdWVzLlxyXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYW4gYXJyYXkgb2YgYXJyYXlzIHdoZXJlIGVhY2hcclxuICogIG5lc3RlZCBhcnJheSB3aWxsIGhhdmUgdGhlIG9iamVjdHMga2V5IHN0b3JlZCBpbiBlbGVtZW50IDAgYW5kXHJcbiAqICB0aGUgdmFsdWUgc3RvcmVkIGluIGVsZW1lbnQgMS5cclxuICogQHNlZSBhdHJvcGEub2JqZWN0cy5zb3J0XHJcbiAqL1xyXG5hdHJvcGEub2JqZWN0cy5zb3J0UHJvcGVydGllc051bWVyaWNhbGx5ID0gZnVuY3Rpb24gc29ydFByb3BlcnRpZXNOdW1lcmljYWxseShcclxuICAgIG9ialxyXG4pIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgZnVuY3Rpb24gc29ydEZuKGEsIGIpIHtcclxuICAgICAgICByZXR1cm4gKGEgLSBiKTtcclxuICAgIH1cclxuICAgIHJldHVybiBhdHJvcGEub2JqZWN0cy5zb3J0UHJvcGVydGllcyhvYmosIHNvcnRGbik7XHJcbn07XHJcbi8qKlxyXG4gKiBUaHJvd3MgYW4gZXJyb3IsIDxjb2RlPlN0cmluZy5wcm90b3R5cGUubG9jYWxlQ29tcGFyZTwvY29kZT4gaXMgbm90IFxyXG4gKiAgc3RhbmRhcmRpemVkLlxyXG4gKiBcclxuICogIFllcywgbG9jYWxlQ29tcGFyZSBpcyBpbiB0aGUgc3RhbmRhcmQgYnV0LCBhdCB0aGlzIHRpbWUgdGhlIGFjdHVhbFxyXG4gKiAgY29tcGFyaXNvbiBpcyBpbXBsZW1lbnRhdGlvbiBkZXBlbmRhbnQuIFRoaXMgbWVhbnMgdGhhdCBcImFscGhhYmV0aWNhbCBvcmRlclwiXHJcbiAqICBjYW4gYmUgZGlmZmVyZW50IG9uIGRpZmZlcmVudCBwbGF0Zm9ybXMuIFdoYXQgSSBmb3VuZCB3YXMgdGhhdCBpbiBub2RlIHRoZVxyXG4gKiAgYXJyYXkgb2YgPGNvZGU+WydhJywnWicsJ0EnLCd6J108L2NvZGU+IHdvdWxkIGJlIHNvcnRlZCB0b1xyXG4gKiAgPGNvZGU+WydBJywnWicsJ2EnLCd6XCJdPC9jb2RlPiwgd2hpbGUgb25cclxuICogIGZpcmVmb3ggaXQgd291bGQgYmUgc29ydGVkIHRvIDxjb2RlPlsnYScsJ0EnLCd6JywnWiddPC9jb2RlPi4gV2hvIGtub3dzIGlmXHJcbiAqICBhbm90aGVyIGltcGxlbWVudG9yIHdvdWxkIHNvcnQgaXQgPGNvZGU+WydBJywnYScsJ1onLCd6J108L2NvZGU+P1xyXG4gKiBcclxuICogSW4gb3JkZXIgdG8gcHJvdmlkZSBhIHJlbGlhYmxlIGltcGxlbWVudGF0aW9uIEkgd291bGQgaGF2ZSB0byBjcmVhdGUgbXkgb3duXHJcbiAqICBpbXBsZW1lbnRhdGlvbiBvZiA8Y29kZT5TdHJpbmcucHJvdG90eXBlLmxvY2FsZUNvbXBhcmU8L2NvZGU+IGFuZCB0aGF0J3NcclxuICogIGp1c3QgdG9vIG11Y2ggd29yayBmb3IgbWUgdG8gZG8gYWxvbmUuXHJcbiAqIEB0aHJvd3Mge0Vycm9yfSBcIlN0cmluZy5wcm90b3R5cGUubG9jYWxlQ29tcGFyZSBpcyBub3Qgc3RhbmRhcmRpemVkXCJcclxuICovXHJcbmF0cm9wYS5vYmplY3RzLnNvcnRQcm9wZXJ0aWVzQWxwaGFiZXRpY2FsbHkgPSBcclxuZnVuY3Rpb24gc29ydFByb3BlcnRpZXNBbHBoYWJldGljYWxseShvYmopIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiU3RyaW5nLnByb3RvdHlwZS5sb2NhbGVDb21wYXJlIGlzIG5vdCBzdGFuZGFyZGl6ZWRcIik7XHJcbn07XHJcblxyXG5cclxuXHJcblxyXG53aGlsZShhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMubGVuZ3RoID4gMCkge1xyXG4gICAgYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLnBvcCgpKCk7XHJcbn1cclxubW9kdWxlLmV4cG9ydHMgPSBhdHJvcGE7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9kb2NzL3ZzZG9jL09wZW5MYXllcnNBbGwuanNcIi8+XG52YXIgYXRyb3BhID0gcmVxdWlyZSgnYXRyb3BhLWhlYWRlcicpO1xuLypqc2xpbnRcbiAgICBpbmRlbnQ6IDQsXG4gICAgbWF4ZXJyOiA1MCxcbiAgICB3aGl0ZTogdHJ1ZSxcbiAgICBicm93c2VyOiB0cnVlLFxuICAgIGRldmVsOiB0cnVlLFxuICAgIHBsdXNwbHVzOiB0cnVlLFxuICAgIHJlZ2V4cDogdHJ1ZVxuKi9cbi8qZ2xvYmFsIGF0cm9wYSAqL1xuLy8gZW5kIGhlYWRlclxuXG4vKipcbiAqIENvbnRhaW5lciBmb3IgcmVnZXggZnVuY3Rpb25zLlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAqIEB2ZXJzaW9uIDIwMTIwOTA5XG4gKiBAbmFtZXNwYWNlIENvbnRhaW5lciBmb3IgcmVnZXggZnVuY3Rpb25zLlxuICovXG5hdHJvcGEucmVnZXggPSB7fTtcbi8qKlxuICogUmVnZXggcGF0dGVybnMuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQG5hbWVzcGFjZSBSZWdleCBwYXR0ZXJucy5cbiAqL1xuYXRyb3BhLnJlZ2V4LnBhdHRlcm5zID0ge1xuICAgIC8qKiBmaW5kcyByZXBlYXRlZCB3b3JkcyBhbmQgcGhyYXNlcyAqL1xuICAgIHJlcGVhdGVkV29yZHMgOiAvKFxcYi57Myx9XFxiKVxccyooXFwxKS9nLFxuICAgIC8qKiBmaW5kcyBwYXJhZ3JhcGggYnJlYWtzICovXG4gICAgcGFyYWdyYXBoQnJlYWtzIDogLyhcXHJcXG5cXHJcXG58XFxuXFxufFxcclxccikvZyxcbiAgICAvKiogZmluZHMgbGluZSBicmVha3MgKi9cbiAgICBsaW5lQnJlYWtzIDogLyhcXHJcXG58XFxyfFxcbikvZ1xufTtcbi8qKlxuICogQXBwZW5kcyBjb21tb24gcHJlZml4LCBzdWZmaXgsIGFuZCB3b3JkIGJvdW5kYXJ5IHJlZ2V4IHN0cmluZ3MgdG9cbiAqIHRoZSBzdXBwbGllZCB3b3JkLlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAqIEB2ZXJzaW9uIDIwMTMwMTEwXG4gKiBAcGFyYW0ge1N0cmluZ30gd29yZCBUaGUgd29yZCB0byBhcHBlbmQgcHJlZml4IGFuZCBzdWZmaXggdG9cbiAqIEBwYXJhbSB7SW50ZWdlcn0gdGhyZXNob2xkIFRoZSB3b3JkLmxlbmd0aCBhdCB3aGljaCBpdCBkb2VzIG5vdFxuICogbWFrZSBzZW5zZSB0byBhcHBlbmQgcHJlZml4IGFuZCBzdWZmaXguIERlZmF1bHRzIHRvIDMuXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBSZXR1cm5zIHRoZSBzdXBwbGllZCB3b3JkIHdpdGggcHJlZml4LCBzdWZmaXgsXG4gKiBhbmQgd29yZCBib3VuZGFyaWVzIGF0dGFjaGVkLiBJZiB0aGUgd29yZC5sZW5ndGggd2FzIG5vdCBncmVhdGVyXG4gKiB0aGFuIHRoZSB0aHJlc2hvbGQsIG9ubHkgd29yZCBib3VuZGFyaWVzIGFyZSBhdHRhY2hlZC4gVGhlIHN0cmluZ1xuICogcmVwcmVzZW50cyBhIFJlZ0V4IHdoaWNoIHNob3VsZCBwaWNrIG91dCBtb3N0IGZvcm1zIG9mIHJlZ3VsYXJcbiAqIHdvcmRzLlxuICovXG5hdHJvcGEucmVnZXguYXBwZW5kUHJlZml4ZXNBbmRTdWZmaXhlcyA9IGZ1bmN0aW9uICh3b3JkLCB0aHJlc2hvbGQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICB2YXIgcHJlZml4ZXMsXG4gICAgc3VmZml4ZXM7XG4gICAgcHJlZml4ZXMgPSAnKHByZXx1bnxyZSk/JztcbiAgICBzdWZmaXhlcyA9ICcoaWZpY2F0aW9ufCcgK1xuICAgICAgICAgICAgICAgICd0aW9uYWxseXwnICtcbiAgICAgICAgICAgICAgICAnaWNhdGlvbnwnICtcbiAgICAgICAgICAgICAgICAnaWZpZWR8aXN0aWN8aW5lc3N8JyArXG4gICAgICAgICAgICAgICAgJ2ZhcmV8dGlvbnxhbmNlfGVuY2V8bGVzc3xhbGx5fGFibGV8bmVzc3xpemVkfGlzZWR8JyArXG4gICAgICAgICAgICAgICAgJ291c3xpZnl8aW5nfGl0eXxmdWx8YW50fGF0ZXxlc3R8aXNtfGl6bXxpc3R8JyArXG4gICAgICAgICAgICAgICAgJ2ljfGFsfGVkfGVyfGV0fGx5fHJzfGlufCcgK1xuICAgICAgICAgICAgICAgICd5fHN8cnxkKT8nO1xuICAgIFxuICAgIHRocmVzaG9sZCA9IHRocmVzaG9sZCA9PT0gdW5kZWZpbmVkID8gMyA6IHRocmVzaG9sZDtcbiAgICBcbiAgICBpZiAod29yZC5sZW5ndGggPiB0aHJlc2hvbGQpIHtcbiAgICAgICAgd29yZCA9ICdcXFxcYicgKyBwcmVmaXhlcyArIHdvcmQgKyBzdWZmaXhlcyArICdcXFxcYic7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgd29yZCA9ICdcXFxcYigpJyArIHdvcmQgKyAnKClcXFxcYic7XG4gICAgfVxuICAgIHJldHVybiB3b3JkO1xufTtcblxuXG5cblxud2hpbGUoYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLmxlbmd0aCA+IDApIHtcbiAgICBhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMucG9wKCkoKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gYXRyb3BhO1xuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2RvY3MvdnNkb2MvT3BlbkxheWVyc0FsbC5qc1wiLz5cbnZhciBhdHJvcGEgPSByZXF1aXJlKCdhdHJvcGEtaGVhZGVyJyk7XG4vKmpzbGludFxuICAgIGluZGVudDogNCxcbiAgICBtYXhlcnI6IDUwLFxuICAgIHdoaXRlOiB0cnVlLFxuICAgIGJyb3dzZXI6IHRydWUsXG4gICAgZGV2ZWw6IHRydWUsXG4gICAgcGx1c3BsdXM6IHRydWUsXG4gICAgcmVnZXhwOiB0cnVlXG4qL1xuLypnbG9iYWwgYXRyb3BhICovXG4vLyBlbmQgaGVhZGVyXG5cbmF0cm9wYS5yZXF1aXJlcyhcbiAgICAncmVtb3ZlTm9kZUJ5UmVmZXJlbmNlJyxcbiAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xuICAgICAgICBpZihkb2N1bWVudCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuKTtcblxuLyoqXG4gKiBSZW1vdmVzIERPTSBOb2Rlcy5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAdmVyc2lvbiAyMDEyMDkwOVxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge0RPTSBOb2RlfSBlbGVtZW50UmVmZXJlbmNlIEEgcmVmZXJlbmNlIHRvIHRoZSBET00gTm9kZSB5b3Ugd2FudFxuICogdG8gcmVtb3ZlLlxuICovXG5hdHJvcGEucmVtb3ZlTm9kZUJ5UmVmZXJlbmNlID0gZnVuY3Rpb24gKGVsZW1lbnRSZWZlcmVuY2UpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICBhdHJvcGEuc3VwcG9ydENoZWNrKCdyZW1vdmVOb2RlQnlSZWZlcmVuY2UnKTtcbiAgICBpZihlbGVtZW50UmVmZXJlbmNlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgZWxlbWVudFJlZmVyZW5jZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsZW1lbnRSZWZlcmVuY2UpO1xuICAgIH1cbn07XG5cblxuXG5cbndoaWxlKGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5sZW5ndGggPiAwKSB7XG4gICAgYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLnBvcCgpKCk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGF0cm9wYTtcbiIsImFyZ3VtZW50c1s0XVs1XVswXS5hcHBseShleHBvcnRzLGFyZ3VtZW50cykiLCJhcmd1bWVudHNbNF1bMjJdWzBdLmFwcGx5KGV4cG9ydHMsYXJndW1lbnRzKSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9kb2NzL3ZzZG9jL09wZW5MYXllcnNBbGwuanNcIi8+XHJcbnZhciBhdHJvcGEgPSByZXF1aXJlKCdhdHJvcGEtaGVhZGVyJyk7XHJcbi8qanNsaW50XHJcbiAgICBpbmRlbnQ6IDQsXHJcbiAgICBtYXhlcnI6IDUwLFxyXG4gICAgd2hpdGU6IHRydWUsXHJcbiAgICBicm93c2VyOiB0cnVlLFxyXG4gICAgZGV2ZWw6IHRydWUsXHJcbiAgICBwbHVzcGx1czogdHJ1ZSxcclxuICAgIHJlZ2V4cDogdHJ1ZVxyXG4qL1xyXG4vKmdsb2JhbCBhdHJvcGEgKi9cclxuLy8gZW5kIGhlYWRlclxyXG5cclxuLyoqXHJcbiAqIFV0aWxpdGllcyBmb3IgaGFuZGxpbmcgdXJscy5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwNzEzXHJcbiAqIEBuYW1lc3BhY2UgVXRpbGl0aWVzIGZvciBoYW5kbGluZyB1cmxzLlxyXG4gKi9cclxuYXRyb3BhLnVybCA9IHt9O1xyXG4vKipcclxuICogR2V0cyB0aGUgZmlsZW5hbWUgcG9ydGlvbiBvZiBhIHVybFxyXG4gKiBAZnVuY3Rpb25cclxuICogQHBhcmFtIHtTdHJpbmd9IHVybCBUaGUgdXJsLlxyXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBSZXR1cm5zIGV2ZXJ5dGhpbmcgYWZ0ZXIgdGhlIGxhc3QgLyBpbiB0aGUgdXJsLlxyXG4gKi9cclxuYXRyb3BhLnVybC5nZXRGaWxlbmFtZSA9IGZ1bmN0aW9uKHVybCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICB2YXIgZmlsZW5hbWU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGZpbGVuYW1lID0gU3RyaW5nKHVybCkucmVwbGFjZSgvLio6XFwvXFwvW15cXC9dKy8sICcnKS5yZXBsYWNlKC9bI3w/XS4qJC8sICcnKS5tYXRjaCgvW15cXC9dKyQvKVswXTtcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICBmaWxlbmFtZSA9ICcnO1xyXG4gICAgfVxyXG4gICAgaWYodXJsID09PSBmaWxlbmFtZSkge1xyXG4gICAgICAgIGZpbGVuYW1lID0gJyc7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmlsZW5hbWU7XHJcbn07XHJcblxyXG5cclxuXHJcblxyXG53aGlsZShhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMubGVuZ3RoID4gMCkge1xyXG4gICAgYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLnBvcCgpKCk7XHJcbn1cclxubW9kdWxlLmV4cG9ydHMgPSBhdHJvcGE7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9kb2NzL3ZzZG9jL09wZW5MYXllcnNBbGwuanNcIi8+XG52YXIgYXRyb3BhID0gcmVxdWlyZSgnYXRyb3BhLWhlYWRlcicpO1xuYXRyb3BhLnNldEFzT3B0aW9uYWxBcmcgPSByZXF1aXJlKCdhdHJvcGEtc2V0QXNPcHRpb25hbEFyZycpLnNldEFzT3B0aW9uYWxBcmc7XG4vKmpzbGludFxuICAgIGluZGVudDogNCxcbiAgICBtYXhlcnI6IDUwLFxuICAgIHdoaXRlOiB0cnVlLFxuICAgIGJyb3dzZXI6IHRydWUsXG4gICAgZGV2ZWw6IHRydWUsXG4gICAgcGx1c3BsdXM6IHRydWUsXG4gICAgcmVnZXhwOiB0cnVlXG4qL1xuLypnbG9iYWwgYXRyb3BhICovXG4vLyBlbmQgaGVhZGVyXG5cbi8qKlxuICogUG9sbGluZyBmdW5jdGlvbnMgZm9yIHF1aWNrIGFuZCBzbG9wcHkgd29yay5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAdmVyc2lvbiAyMDEyMDkwOVxuICogQG5hbWVzcGFjZSBQb2xsaW5nIGZ1bmN0aW9ucyBmb3IgcXVpY2sgYW5kIHNsb3BweSB3b3JrLlxuICovXG5hdHJvcGEud2FpdEZvciA9IHt9O1xuLyoqXG4gKiBHZW5lcmljIFdhaXQgZm9yIHRydWUuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQHZlcnNpb24gMjAxMjA5MDlcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHRlc3RGbiBBIGZ1bmN0aW9uIHRvIHRlbGwgd2hlbiB0aGUgd2FpdCBpcyBvdmVyLiBNdXN0XG4gKiAgcmV0dXJuIHRydWUgb24gc3VjY2VzcywgZmFsc2Ugb24gZmFpbHVyZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9uU3VjY2Vzc0NhbGxiYWNrIE9wdGlvbmFsLiBUaGUgZnVuY3Rpb24gdG8gcnVuIHdoZW4gdGVzdEZuXG4gKiAgcmV0dXJucyB0cnVlLiBEZWZhdWx0cyB0byA8Y29kZT5mdW5jdGlvbiAoKSB7fSA8L2NvZGU+XG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBvbk1heFBvbGxDYWxsYmFjayBPcHRpb25hbC4gVGhlIGZ1bmN0aW9uIHRvIHJ1biB3aGVuIHRlc3RGblxuICogIGhhcyBiZWVuIHJ1biBtYXhQb2xsIHRpbWVzIGFuZCB0aGUgd2FpdCBpcyBiZWluZyBnaXZlbiB1cC5cbiAqIERlZmF1bHRzIHRvIDxjb2RlPmZ1bmN0aW9uICgpIHt9PC9jb2RlPlxuICogQHBhcmFtIHtJbnRlZ2VyfSBwb2xsSW50ZXJ2YWwgT3B0aW9uYWwuIFRoZSBhbW91bnQgb2YgdGltZSBpbiBtcyBiZXR3ZWVuXG4gKiAgcG9sbGluZyB0ZXN0Rm4gdG8gc2VlIGlmIGl0IHJldHVybnMgdHJ1ZS4gRGVmYXVsdHMgdG8gMjAwbXMuXG4gKiBAcGFyYW0ge0ludGVnZXJ9IG1heFBvbGwgT3B0aW9uYWwuIFRoZSBxdWFudGl0eSBvZiBwb2xscyBhdCB3aGljaCBpdCBtYWtlc1xuICogIHNlbnNlIHRvIGdpdmUgdXAgd2FpdGluZy4gRGVmYXVsdHMgdG8gNTAuXG4gKi9cbmF0cm9wYS53YWl0Rm9yLnRlc3QgPSBmdW5jdGlvbiB0ZXN0KFxuICAgIHRlc3RGbiwgb25TdWNjZXNzQ2FsbGJhY2ssIG9uTWF4UG9sbENhbGxiYWNrLCBwb2xsSW50ZXJ2YWwsIG1heFBvbGxcbikge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIHBvbGxJbnRlcnZhbCA9IGF0cm9wYS5zZXRBc09wdGlvbmFsQXJnKDIwMCwgcG9sbEludGVydmFsKTtcbiAgICBtYXhQb2xsID0gYXRyb3BhLnNldEFzT3B0aW9uYWxBcmcoNTAsIG1heFBvbGwpO1xuICAgIG9uTWF4UG9sbENhbGxiYWNrID0gYXRyb3BhLnNldEFzT3B0aW9uYWxBcmcoYXRyb3BhLm5vcCwgb25NYXhQb2xsQ2FsbGJhY2spO1xuICAgIG9uU3VjY2Vzc0NhbGxiYWNrID0gYXRyb3BhLnNldEFzT3B0aW9uYWxBcmcoYXRyb3BhLm5vcCwgb25TdWNjZXNzQ2FsbGJhY2spO1xuICAgIHZhciBteUludDtcbiAgICB2YXIgbXlDb3VudGVyID0gMDtcbiAgICBmdW5jdGlvbiB3YWl0Rm9yVGVzdFJlY3Vyc29yICgpIHtcbiAgICAgICAgbXlDb3VudGVyKys7XG4gICAgICAgIGlmICh0ZXN0Rm4oKSkge1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChteUludCk7XG4gICAgICAgICAgICBvblN1Y2Nlc3NDYWxsYmFjaygpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChteUNvdW50ZXIgPT09IG1heFBvbGwpIHtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwobXlJbnQpO1xuICAgICAgICAgICAgb25NYXhQb2xsQ2FsbGJhY2soKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBteUludCA9IHNldEludGVydmFsKHdhaXRGb3JUZXN0UmVjdXJzb3IsIHBvbGxJbnRlcnZhbCk7XG59O1xuLyoqXG4gKiBXYWl0IGZvciBFbGVtZW50XG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQHZlcnNpb24gMjAxMjA5MDlcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHRlc3RGbiBBIGZ1bmN0aW9uIHdoaWNoIHJldHVybnMgYSByZWZlcmVuY2UgdG8gYW4gSFRNTFxuICogIEVsZW1lbnQuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBPcHRpb25hbC4gb25TdWNjZXNzQ2FsbGJhY2tcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IE9wdGlvbmFsLiBvbk1heFBvbGxDYWxsYmFjayBcbiAqIEBwYXJhbSB7SW50ZWdlcn0gT3B0aW9uYWwuIHBvbGxJbnRlcnZhbFxuICogQHBhcmFtIHtJbnRlZ2VyfSBPcHRpb25hbC4gbWF4UG9sbFxuICogQHNlZSBhdHJvcGEud2FpdEZvci50ZXN0IGZvciBtb3JlIGluZm9ybWF0aW9uIGFuZCBkZWZhdWx0IHZhbHVlcyBmb3IgdGhlXG4gKiAgb3B0aW9uYWwgcGFyYW1ldGVycy5cbiAqL1xuYXRyb3BhLndhaXRGb3IuZWxlbWVudCA9IGZ1bmN0aW9uIChcbiAgICB0ZXN0Rm4sIG9uU3VjY2Vzc0NhbGxiYWNrLCBvbk1heFBvbGxDYWxsYmFjaywgcG9sbEludGVydmFsLCBtYXhQb2xsXG4pIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIEhUTUwgRE9NIERvY3VtZW50IGFuZCBwdXRzIGl0IGluIHRoZSBkb2N1bWVudFxuICAgICAqIHF1ZXVlLCB0aGVuIGV4ZWN1dGVzIHRoZSBjYWxsYmFjayBnaXZlbi5cbiAgICAgKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAgICAgKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAgICAgKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gICAgICogQHZlcnNpb24gMjAxMjA5MDlcbiAgICAgKiBAbWV0aG9kT2YgYXRyb3BhLndhaXRGb3IuZWxlbWVudC1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEByZXR1cm5zIHtCb29sZWFufSBSZXR1cm5zIHRydWUgb3IgZmFsc2UgZGVwZW5kaW5nIG9uIHdoZXRoZXIgdGhlIG9iamVjdFxuICAgICAqICBoYXMgYSB0YWcgbmFtZSBwcm9wZXJ0eS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBlbGVtZW50VGVzdCAoKSB7XG4gICAgICAgIHJldHVybiBhdHJvcGEuaW5xdWlyZS5oYXNQcm9wZXJ0eSh0ZXN0Rm4oKSwgJ3RhZ05hbWUnKTtcbiAgICB9XG4gICAgYXRyb3BhLndhaXRGb3IudGVzdChcbiAgICAgICAgZWxlbWVudFRlc3QsIG9uU3VjY2Vzc0NhbGxiYWNrLCBvbk1heFBvbGxDYWxsYmFjaywgcG9sbEludGVydmFsLCBtYXhQb2xsXG4gICAgKTtcbn07XG5cblxuXG5cbndoaWxlKGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5sZW5ndGggPiAwKSB7XG4gICAgYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLnBvcCgpKCk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGF0cm9wYTtcbiIsImFyZ3VtZW50c1s0XVs1XVswXS5hcHBseShleHBvcnRzLGFyZ3VtZW50cykiLCJhcmd1bWVudHNbNF1bMjJdWzBdLmFwcGx5KGV4cG9ydHMsYXJndW1lbnRzKSIsIm1vZHVsZS5leHBvcnRzPXtcclxuICAgIFwibm92ZWx0eSBxdWlja2x5IHdlYXJzIG9mZlwiOiBcImR1bWIgc2hpdCBnaXRzIG9sZCBmYXN0XCIsXHJcbiAgICBcInRoZSB3YXkgaXQgaXNcIjogXCJob3cgaXQgYmVcIixcclxuICAgIFwicHV0IHVwIHdpdGhcIjogXCJtYW5oYW5kbGVcIixcclxuICAgIFwieWV0XCI6IFwiaW1tZWRpYXRlbHlcIixcclxuICAgIFwibG9zZVwiOiBcInNoYWtlXCIsXHJcbiAgICBcImZvciBubyByZWFzb25cIjogXCJtYWlhY2FsbHlcIixcclxuICAgIFwiZ2l2ZW4gYSBjaG9pY2VcIjogXCJleHRvcnRlZFwiLFxyXG4gICAgXCJub3Qgc3Ryb25nIGVub3VnaFwiOiBcImFpbid0IGdvdCB0aGUgbnV0c1wiLFxyXG4gICAgXCJub3cgYXQgYW4gZW5kXCI6IFwiYnJhbmQgc3BhbmtpbiBuZXdcIixcclxuICAgIFwiYmUgdG9nZXRoZXJcIjogXCJtYXNoIHVwXCIsXHJcbiAgICBcImFwb2NhbHlwc2VcIjogXCJwYXJ0eSB0aW1lXCIsXHJcbiAgICBcIm5vdGhpbmcgaXMgYXNzdXJlZFwiOiBcIndlIGxpdmUgdG8gZGVsaXZlclwiLFxyXG4gICAgXCJ0byBubyBhdmFpbFwiOiBcImZvciBncmVhdCBnb29kXCIsXHJcbiAgICBcInRvbyBnb29kIHRvIGJlIHRydWVcIjogXCJmdWNraW5nIGZhbnRhc3RpY1wiLFxyXG4gICAgXCJncm93aW5nIGFwYXJ0XCI6IFwiZnVja2luZyBvdGhlciBwZW9wbGVcIixcclxuICAgIFwicmVzdCBpbiBwZWFjZVwiOiBcInBhcnR5IGxpa2UgaXQncyAxOTk5XCIsXHJcbiAgICBcImJhY2sgc3RhYlwiOiBcInJ1bXAgc2hha2VcIixcclxuICAgIFwiYmFjayBzdGFiYlwiOiBcInJ1bXAgc2hha2VcIixcclxuICAgIFwibG9vayBpbnRvIHRoZWlyIGV5ZXNcIjogXCJnaXZlIHRoZW0gQUlEU1wiLFxyXG4gICAgXCJsb29rIGludG8gaGVyIGV5ZXNcIjogXCJnaXZlIGhlciBBSURTXCIsXHJcbiAgICBcImxvb2sgaW50byBoaXMgZXllc1wiOiBcImdpdmUgaGltIEFJRFNcIixcclxuICAgIFwiY2FuJ3QgbGl2ZSB3aXRob3V0XCI6IFwidG91Y2ggbXlzZWxmIGFib3V0XCIsXHJcbiAgICBcImNhbid0IGJlIHdpdGhvdXRcIjogXCJ0b3VjaCBteXNlbGYgYWJvdXRcIixcclxuICAgIFwiY291bGQgbmV2ZXIgYmUgd2l0aG91dFwiOiBcImNhbid0IHdvcmsgYW5hbCBiZWFkcyB3aXRob3V0XCIsXHJcbiAgICBcIm5vIG1hdHRlclwiOiBcImlycmVnYXJkbGVzcyBvZlwiLFxyXG4gICAgXCJ3aWxsIGJlIHRoZXJlXCI6IFwic3RpY2sgbGlrZSBzaGl0XCIsXHJcbiAgICBcIndpbGwgYWx3YXlzIGJlIHRoZXJlXCI6IFwic3RpY2sgbGlrZSB3ZXQgc2hpdFwiLFxyXG4gICAgXCJob2xkaW5nIHRoZW0gY2xvc2UgdG9cIjogXCJoYW5kY3VmZmluZyB0aGVtIHRvXCIsXHJcbiAgICBcImJ5IHlvdXIgc2lkZVwiOiBcIm9uIHlvdXIgYXNzXCIsXHJcbiAgICBcImJ5IG15IHNpZGVcIjogXCJvbiBteSBhc3NcIixcclxuICAgIFwiYnkgaGlzIHNpZGVcIjogXCJvbiBoaXMgYXNzXCIsXHJcbiAgICBcImJ5IGhlciBzaWRlXCI6IFwib24gaGVyIGFzc1wiLFxyXG4gICAgXCJsZWF2ZSB5b3VyIHNpZGVcIjogXCJnZXQgb2ZmIHlvdXIgYXNzXCIsXHJcbiAgICBcImxlYXZlIG15IHNpZGVcIjogXCJnZXQgb2ZmIG15IGFzc1wiLFxyXG4gICAgXCJsZWF2ZSBoaXMgc2lkZVwiOiBcImdldCBvZmYgaGlzIGFzc1wiLFxyXG4gICAgXCJsZWF2ZSBoZXIgc2lkZVwiOiBcImdldCBvZmYgaGVyIGFzc1wiLFxyXG4gICAgXCJkb2Vzbid0IGhhcHBlbiBvdmVyXCI6IFwiY2FydHdoZWVscyBzdHJhaWdodCBhY3Jvc3NcIixcclxuICAgIFwibWVhbnMgbWFueSB0aGluZ3NcIjogXCJpcyBiZXN0IGRlc2NyaWJlZCB3aXRoIGxpZXNcIixcclxuICAgIFwibGF5aW5nIGluIGJlZFwiOiBcInRha2luZyBhIHNoaXRcIixcclxuICAgIFwicHJvbWlzZVwiOiBcImxpZVwiLFxyXG4gICAgXCJsaWFyXCI6IFwiZmliYmVyXCIsXHJcbiAgICBcImxpZVwiOiBcImZpYlwiLFxyXG4gICAgXCJsaWVzXCI6IFwiZmlic1wiLFxyXG4gICAgXCJ3aGF0J3MgdGhlIHBvaW50XCI6IFwidGhlIGZ1Y2tzIHRoaXMgbWVhblwiLFxyXG4gICAgXCJpdCBtdXN0IGJlIHRydWVcIjogXCJmb3IgcmVhbCAnbicgc2hpdFwiLFxyXG4gICAgXCJ3aGF0IHBlb3BsZSBzYXlcIjogXCJtdXRoYXBodWtrYXMgYmUgdGFsa2luXCIsXHJcbiAgICBcImV0Y2hlZFwiOiBcImdyb3VuZFwiLFxyXG4gICAgXCJkb24ndCBoYXZlIGEgY2x1ZVwiOiBcImdvdCBzaGl0IHR3aXN0ZWRcIixcclxuICAgIFwidmlzY2lvdXMgY3ljbGVcIjogXCJjbHVzdGVyZnVja1wiLFxyXG4gICAgXCJkb24ndCBuZWVkXCI6IFwiY291bGQgZ2l2ZSBhIGZ1Y2sgYWJvdXRcIixcclxuICAgIFwicmF2ZW5cIjogXCJwaWdlb25cIixcclxuICAgIFwidG8gZ2V0IGF3YXlcIjogXCJ0byBmdWNraW5nIHJ1blwiLFxyXG4gICAgXCJ0byBhIGJldHRlclwiOiBcImZvciBzb21lIGdsaXR0ZXJlZFwiLFxyXG4gICAgXCJiZWF1dGlmdWwgZmFjZVwiOiBcImVub3Jtb3VzIHRpdHNcIixcclxuICAgIFwibWlnaHQgYXMgd2VsbFwiOiBcIm9oIGZ1Y2sgSSBvdWdodHRhXCIsXHJcbiAgICBcInRoZSBmaXJzdCBtb21lbnRcIjogXCJzdHJhaWdodGF3YXlcIixcclxuICAgIFwiYXMgd2VsbFwiOiBcImFsc29cIixcclxuICAgIFwic28gZ29vZFwiOiBcIm5lYXRvXCIsXHJcbiAgICBcImNvdWxkIGRvIGFueXRoaW5nXCI6IFwiaXMgZnVja2luZyBpbnNhbmVcIixcclxuICAgIFwic2V0IHRoZSBtb29kXCI6IFwid2hpcCBpdCBvdXRcIixcclxuICAgIFwiYmFieSBpZlwiOiBcImxvb2sgYml0Y2gsXCIsXHJcbiAgICBcInRocm91Z2ggeW91ciBoYWlyXCI6IFwidXBzaWRlIHlvdXIgaGVhZFwiLFxyXG4gICAgXCJlbnRlcmVkIHRoZSBob3VzZSBvZlwiOiBcImdvdCB1cCBpbiB0aGUgYmFybiBmb3JcIixcclxuICAgIFwiYWx3YXlzIGxvdmUgeW91IHRoZSBzYW1lXCI6IFwiYWx3YXlzIGxvdmUgeW91IGxpa2UgbXkgb3RoZXIgc3Vja2Vyc1wiLFxyXG4gICAgXCJraXNzaW5nIG90aGVyXCI6IFwiZ29pbmcgZG93biBvblwiLFxyXG4gICAgXCJuZXZlciB0aG91Z2h0IHlvdSB3b3VsZCBkbyB0aGF0XCI6IFwiZ290IHR1cm5lZCBvdXQgbGlrZSBhIGR1bWIgZnVja1wiLFxyXG4gICAgXCJsYXlpbmcgb24gdGhlIGZsb29yXCI6IFwiYmVnZ2luZyBmb3IgaXRcIixcclxuICAgIFwiZmlyc3QgbGFpZCBleWVzIG9uXCI6IFwiZmlyc3QgdHJpZWQgZ3JvcGluZ1wiLFxyXG4gICAgXCJtb3N0IHBlb3BsZSBjYW4gb25seVwiOiBcIm1vc3QgZnJlYWtzIGFuZCBkb3BlIGZpZW5kc1wiLFxyXG4gICAgXCJ5b3Ugd2VyZSB0aGUgb25lXCI6IFwieW91IHdlcmUgbXkgdGFyZ2V0XCIsXHJcbiAgICBcInN0YW5kaW5nIG91dCBmcm9tIHRoZSBjcm93ZFwiOiBcIndvYmJsaW5nIGxpa2UgYW4gZWxlcGhhbnQgb24gYSBiaWN5Y2xlXCIsXHJcbiAgICBcInN0b29kIG91dCBmcm9tIHRoZSBjcm93ZFwiOiBcImppZ2dsZWQgbGlrZSBhIGplbGxvIFNhbnRhXCIsXHJcbiAgICBcInN0YW5kIG91dCBmcm9tIHRoZSBjcm93ZFwiOiBcImxvb2sgbGlrZSBhIGphY2thc3NcIixcclxuICAgIFwic3RhbmRzIG91dCBmcm9tIHRoZSBjcm93ZFwiOiBcInNtZWxscyBsaWtlIG9sZCBkaWNrXCIsXHJcbiAgICBcImkndmUgbmV2ZXIgZmVsdCB0aGlzIHdheVwiOiBcImkndmUgZG9uZSB0aGlzXCIsXHJcbiAgICBcIndpdGggZXZlcnkgZmliZXJcIjogXCJmcm9tIHBpdGh5IHBpdHNcIixcclxuICAgIFwid2FuZGVyXCI6IFwic3R1bWJsZVwiLFxyXG4gICAgXCJoYXVudFwiOiBcInN0YWxrXCIsXHJcbiAgICBcIm1hc2tcIjogXCJ0cmFzaGJhZ1wiLFxyXG4gICAgXCJkZW1vbmljIGFuZ2VsXCI6IFwiYXNzIHBpcmF0ZVwiLFxyXG4gICAgXCJhbmdlbGljIGRlbW9uXCI6IFwiYXNzIHBpcmF0ZVwiLFxyXG4gICAgXCJjdW5uaW5nXCI6IFwiZGVzcGVyYXRlXCIsXHJcbiAgICBcImRhbmdlcm91c1wiOiBcImNvY2sgY2F0Y2hpbmdcIixcclxuICAgIFwiZGVtaS1nb2RcIjogXCJwdW5rIGJpdGNoXCIsXHJcbiAgICBcImRlbWlnb2RcIjogXCJwdW5rIGJpdGNoXCIsXHJcbiAgICBcIm1vcnRhbFwiOiBcInF1ZWVyXCIsXHJcbiAgICBcImltbW9ydGFsXCI6IFwid2hpbnlcIixcclxuICAgIFwiYmV0cmF5YWxcIjogXCJnYW1lXCIsXHJcbiAgICBcImJldHJheVwiOiBcInNjcmV3XCIsXHJcbiAgICBcImdhdmUgdXAgb25cIjogXCJkb24ndCBnaXZlIGEgZnVjayBhYm91dFwiLFxyXG4gICAgXCJnaXZlIHVwIG9uXCI6IFwid29uJ3QgZ2l2ZSBhIGZ1Y2sgYWJvdXRcIixcclxuICAgIFwiZ2l2ZW4gdXAgb25cIjogXCJkb24ndCBnaXZlIGEgZnVjayBhYm91dFwiLFxyXG4gICAgXCJnaXZpbmcgdXAgb25cIjogXCJhaW4ndCBnaXZpbiBhIGZ1Y2sgYWJvdXRcIixcclxuICAgIFwiY29mZmluXCI6IFwidG9ib2dhblwiLFxyXG4gICAgXCJiZWF1dGlmdWxcIjogXCJnYXVkeVwiLFxyXG4gICAgXCJ0aGUgYmVzdFwiOiBcInRoZSBiYWRkZXN0XCIsXHJcbiAgICBcInNlbGZpc2hcIjogXCJ0aGlldmluZ1wiLFxyXG4gICAgXCJ3YWxrZWQgb3V0XCI6IFwibmFycm93bHkgZXNjYXBlZFwiLFxyXG4gICAgXCJ3YWxrIG91dFwiOiBcIm5hcnJvd2x5IGVzY2FwZVwiLFxyXG4gICAgXCJ3YWxraW5nIG91dFwiOiBcIm5hcnJvd2x5IGVzY2FwaW5nXCIsXHJcbiAgICBcImdvdCBpbiB5b3VyIHdheVwiOiBcImdvdCBhbGwgdXAgaW4geW91ciBzaGl0XCIsXHJcbiAgICBcInRyeVwiOiBcInNob290XCIsXHJcbiAgICBcInRoZSBwb2ludCBvZiBubyByZXR1cm5cIjogXCJ0aGUgZmF0IGdpcmxzIGJlZHJvb29tIGRvb3JcIixcclxuICAgIFwib25seSB3YW50ZWRcIjogXCJiZWdnZWQgZm9yXCIsXHJcbiAgICBcImd1ZXNzIGl0IGRvZXNuJ3QgbWF0dGVyXCI6IFwia25vdyB0aGlzIHNoaXQgaXMgcG9pbnRsZXNzXCIsXHJcbiAgICBcImxvb2sgYmFja1wiOiBcImxpY2sgd2luZG93c1wiLFxyXG4gICAgXCJwYXRoXCI6IFwic2lkZXdhbGtcIixcclxuICAgIFwic2hpbmVcIjogXCJibGluZ1wiLFxyXG4gICAgXCJpbiB0aGUgbWlkZGxlIG9mXCI6IFwiYWxsIHVwIGluXCIsXHJcbiAgICBcImRlZXAgZG93biBpbnNpZGVcIjogXCJpbiB0aGUgYm90dG9tIG9mIHRoZSB0YW5rXCIsXHJcbiAgICBcInBpZWNlIGJ5IHBpZWNlXCI6IFwib25lIGhhbmRqb2IgYXQgYSB0aW1lXCIsXHJcbiAgICBcImF1cmFcIjogXCJzdGVuY2hcIixcclxuICAgIFwiY2FuZGxlXCI6IFwiZ2xvd3N0aWNrXCIsXHJcbiAgICBcImZvciBoZXJcIjogXCJ0byB0aGF0IGJyb2Fkc1wiLFxyXG4gICAgXCJmb3Igc2hlXCI6IFwiJ2NhdXNlIHRoZSBjdW50XCIsXHJcbiAgICBcImZvciBoZVwiOiBcInRoaXMgZHVtYiBtb3RoZXIgZnVja2VyXCIsXHJcbiAgICBcImZvcmVzdFwiOiBcImNhbXBncm91bmRcIixcclxuICAgIFwiaGFuZCBpbiBoYW5kXCI6IFwiY29jayB0byBqYXdcIixcclxuICAgIFwiaGFuZCB0byBob2xkXCI6IFwibnV0cyB0byBncmlwXCIsXHJcbiAgICBcImdpcmwgbWVldHMgYm95XCI6IFwiaG9ybnkga2lkcyBob29rIHVwXCIsXHJcbiAgICBcImJveSBtZWV0cyBnaXJsXCI6IFwiaG9ybnkga2lkcyBob29rIHVwXCIsXHJcbiAgICBcInN1bm55XCI6IFwic3dlbHRlcmluZ1wiLFxyXG4gICAgXCJzbyBuZXJ2b3VzXCI6IFwic28gZnVja2luZyBkcnVua1wiLFxyXG4gICAgXCJraXNzXCI6IFwic2xhcFwiLFxyXG4gICAgXCJmaW5nZXJ0aXBzXCI6IFwiY2hpY2tlbiBudWdnZXRzXCIsXHJcbiAgICBcInRlbGwgeW91IGknbSBmaW5lXCI6IFwic2NyZW0gSSdNIEZVQ0tJTiBPS1wiLFxyXG4gICAgXCJ3cml0ZVwiOiBcInNjcmF3bFwiLFxyXG4gICAgXCJ3cml0dGVuXCI6IFwic2NyYXdsZWRcIixcclxuICAgIFwid3JvdGVcIjogXCJzY3Jhd2xlZFwiLFxyXG4gICAgXCJmaXJzdCBvZiBhbGxcIjogXCJtbS1rYXlcIixcclxuICAgIFwiYnJpbmcgZm9ydGhcIjogXCJ3aGlwIG91dFwiLFxyXG4gICAgXCJpbnRvIHRoZSBsaWdodFwiOiBcIm9uIHRvIHRoZSBsaWdodFwiLFxyXG4gICAgXCJ0aGUgb25seSBvbmVcIjogXCJmdWNraW5nIHN0dXBpZFwiLFxyXG4gICAgXCJ0byB0aGUgbGlnaHRcIjogXCJvdXQgaW4gcHVibGljXCIsXHJcbiAgICBcInRhbGtcIjogXCJjdXNzXCIsXHJcbiAgICBcImZ1bGwgb2YgbGlmZVwiOiBcImZ1bGwgb2Ygc2hpdFwiLFxyXG4gICAgXCJjYW4ndCBmaW5kIHRoZSB3b3JkcyB0byBzYXlcIjogXCJjb3VsZCBibHVydCBvdXQgc29tZSBkdW1iIHNoaXRcIixcclxuICAgIFwiY29uc3VtZVwiOiBcInN1Y2tcIixcclxuICAgIFwiY29uc3VtaW5nXCI6IFwic3Vja2luZ1wiLFxyXG4gICAgXCJwaWxsb3dcIjogXCJzdG9uZVwiLFxyXG4gICAgXCJhZHZpY2VcIjogXCJidWxsc2hpdFwiLFxyXG4gICAgXCJ1bml2ZXJzZVwiOiBcInRvaWxldCBib3dsXCIsXHJcbiAgICBcImVsZGVyXCI6IFwib2xkIGZvbGtcIixcclxuICAgIFwibWFnaWNrXCI6IFwiZGVsdXNpb25cIixcclxuICAgIFwibWFnaWNcIjogXCJob3BlXCIsXHJcbiAgICBcImFyY2FuZVwiOiBcImZvb2xpc2hcIixcclxuICAgIFwic3BlYWsgb2ZcIjogXCJ0YWxrIGFib3V0XCIsXHJcbiAgICBcInNoYWxsXCI6IFwic2hvdWxkLXdpbGxcIixcclxuICAgIFwib2J0YWluXCI6IFwiZ2V0XCIsXHJcbiAgICBcImJhdHRsZVwiOiBcInNxdWFiYmxlXCIsXHJcbiAgICBcIm1pZG5pZ2h0XCI6IFwiZGF5YnJlYWtcIixcclxuICAgIFwic29ycm93XCI6IFwid2hpbXBlclwiLFxyXG4gICAgXCJjcmltc29uXCI6IFwiYXp1cmVcIixcclxuICAgIFwiYmxhY2tcIjogXCJ5ZWxsb3dcIixcclxuICAgIFwid29uJ3QgbWFrZSBpdCB0aHJvdWdoXCI6IFwiY291bGQgc2hpbW15IHBhc3RcIixcclxuICAgIFwibmlnaHRcIjogXCJiZWR0aW1lXCIsXHJcbiAgICBcImRheVwiOiBcIm1vcm5pbmdcIixcclxuICAgIFwiZnJhZ2lsZVwiOiBcInN0dXJkeVwiLFxyXG4gICAgXCJjcmFja1wiOiBcIm1lbmRcIixcclxuICAgIFwic29saXR1ZGVcIjogXCJhbWJpYW5jZVwiLFxyXG4gICAgXCJ0b3JtZW50XCI6IFwidGlja2xlXCIsXHJcbiAgICBcImluY2FudGF0aW9uXCI6IFwibXVjaCB5YW1tZXJpbmdcIixcclxuICAgIFwiaG9wZWxlc3NcIjogXCJwaXRpZnVsXCIsXHJcbiAgICBcImRlcHJlc3NpbmdcIjogXCJpbmVicmlhdGluZ1wiLFxyXG4gICAgXCJkZXByZXNzZWRcIjogXCJkcnVua1wiLFxyXG4gICAgXCJkZXByZXNzaW9uXCI6IFwic28gbXVjaCBib296ZVwiLFxyXG4gICAgXCJzYWRkZW5lZFwiOiBcIm1hZGUgZmxhY2NpZFwiLFxyXG4gICAgXCJzYWRuZXNzXCI6IFwiaW1wb3RlbmNlXCIsXHJcbiAgICBcIm5ldmVyZW5kaW5nXCI6IFwibmV2ZXIgZW5kaW5nXCIsXHJcbiAgICBcIm5ldmVyIGVuZGluZ1wiOiBcInJlbGVudGxlc3NcIixcclxuICAgIFwibmV2ZXIgZ29pbmdcIjogXCJmdWNrZWQgZm9yIHRyeWluZ1wiLFxyXG4gICAgXCJjaGFuZ2Ugb25lIHRoaW5nXCI6IFwiZnVjayBzb21lJ24gdXBcIixcclxuICAgIFwibmV2ZXIgZW5kXCI6IFwiZHJhZyBvblwiLFxyXG4gICAgXCJ3aWxsIG5vdCBoZWFsXCI6IFwiZmVzdGVyc1wiLFxyXG4gICAgXCJvdXR3YXJkIGFwcGVhcmFuY2VcIjogXCJmYWNhZGVcIixcclxuICAgIFwiZW1vXCI6IFwiY2xvc2V0IGhvbW9cIixcclxuICAgIFwiYmxhY2tlbmVkIHdhbGxzXCI6IFwiZmlsdGh5IHJvb21zXCIsXHJcbiAgICBcImZhcmV3ZWxsXCI6IFwiYWRpb3NcIixcclxuICAgIFwibWVldCBhZ2FpblwiOiBcImhhdmUgYW5vdGhlciBnby1yb3VuZFwiLFxyXG4gICAgXCJzYWRkXCI6IFwiZmxhY2NpZFwiLFxyXG4gICAgXCJzYWRcIjogXCJpbXBvdGVudFwiLFxyXG4gICAgXCJhbWlkc3RcIjogXCJhbGwgdXAgaW5cIixcclxuICAgIFwibWlkc3RcIjogXCJwYW50c1wiLFxyXG4gICAgXCJrbm93bGVkZ2VcIjogXCJ0cml2aWFcIixcclxuICAgIFwia25vd25cIjogXCJnb3RcIixcclxuICAgIFwia25vd1wiOiBcImdldFwiLFxyXG4gICAgXCJrbmV3XCI6IFwiZ290XCIsXHJcbiAgICBcInBhc3Npb25hdGVcIjogXCJkZWxpcmlvdXNcIixcclxuICAgIFwicGFzc2lvblwiOiBcImRlbGlyaXVtXCIsXHJcbiAgICBcIm8nXCI6IFwidWhcIixcclxuICAgIFwib1wiOiBcInVoXCIsXHJcbiAgICBcImZhbmdcIjogXCJkZW50dXJlXCIsXHJcbiAgICBcImN1cnNlXCI6IFwic3RhaW5cIixcclxuICAgIFwibG92ZVwiOiBcImNvbmZ1c2VcIixcclxuICAgIFwidmFtcGlyaWNcIjogXCJwZWRvcGhpbGljXCIsXHJcbiAgICBcInZhbXB5cmVcIjogXCJwZWRvcGh5bGVcIixcclxuICAgIFwidmFtcGlyZVwiOiBcInBlZG9waGlsZVwiLFxyXG4gICAgXCJwcm9ibGVtXCI6IFwidXNlbGVzcyBjb25jZXJuXCIsXHJcbiAgICBcImZlZWxcIjogXCJmb25kbGVcIixcclxuICAgIFwid29lXCI6IFwiY2hsYW15ZGlhXCIsXHJcbiAgICBcImVtcHR5XCI6IFwiYmxvYXRlZFwiLFxyXG4gICAgXCJoYXRyZWRcIjogXCJvZGl1bVwiLFxyXG4gICAgXCJoYXRlXCI6IFwiZGlzbGlrZVwiLFxyXG4gICAgXCJzY2FycmVkXCI6IFwic3RyaWF0ZWRcIixcclxuICAgIFwic2NhcnNcIjogXCJzdHJpYWVcIixcclxuICAgIFwic2NhcmVcIjogXCJ0aWNrbGVcIixcclxuICAgIFwic2NhcnlcIjogXCJ0aWNrbHlcIixcclxuICAgIFwic2NhclwiOiBcInN0cmlhXCIsXHJcbiAgICBcIndvdW5kXCI6IFwib3VjaGllXCIsXHJcbiAgICBcInNsaXRcIjogXCJjcmV2aWNlXCIsXHJcbiAgICBcInNsaWNlXCI6IFwicGV0XCIsXHJcbiAgICBcInR3YXNcIjogXCJpdCB3YXNcIixcclxuICAgIFwiYmlnIGJyb3RoZXJcIjogXCJteSBwYXJhbm9pYVwiLFxyXG4gICAgXCJldGVybml0eVwiOiBcImF3aGlsZVwiLFxyXG4gICAgXCJldGVybmFsbHlcIjogXCJmb3IgYSBiaXRcIixcclxuICAgIFwiZXRlcm5hbFwiOiBcImltYWdpbmVkXCIsXHJcbiAgICBcInByb3BoZXRcIjogXCJpbnNvbW5pYWNcIixcclxuICAgIFwicHJvcGhlY2llc1wiOiBcIndpdmVzIHRhbGVzXCIsXHJcbiAgICBcInByb3BoZWN5XCI6IFwid2l2ZXMgdGFsZVwiLFxyXG4gICAgXCJzb2xkaWVyXCI6IFwibWFuaWFjXCIsXHJcbiAgICBcIm1pbGl0aWFcIjogXCJnYW5nXCIsXHJcbiAgICBcIm1pbGl0YXJ5XCI6IFwiZ2FuZ3N0ZXJcIixcclxuICAgIFwibWlsaXRhbnRcIjogXCJtYW5pYWNhbFwiLFxyXG4gICAgXCJnb2RkZXNzXCI6IFwiS3lsZWUgU3RydXR0XCIsXHJcbiAgICBcImhpZ2hlciBwb3dlclwiOiBcImNydXN0eSBzb2NrXCIsXHJcbiAgICBcImRhcmtcIjogXCJlZmZlcnZlc2NlbnRcIixcclxuICAgIFwiYW5jaWVudFwiOiBcImVsZGVybHlcIixcclxuICAgIFwicXVlc3RcIjogXCJzdHJvbGxcIixcclxuICAgIFwiaGVhcnRiZWF0XCI6IFwiY29jayBiZWF0XCIsXHJcbiAgICBcImhlYXJ0XCI6IFwiY29ja1wiLFxyXG4gICAgXCJibG9vZFwiOiBcImdyZWFzZVwiLFxyXG4gICAgXCJibGVlZFwiOiBcIndoaW5lXCIsXHJcbiAgICBcImN1dFwiOiBcIm11dGlsYXRlXCIsXHJcbiAgICBcInNsYXNoXCI6IFwibXV0aWxhdGVcIixcclxuICAgIFwibW9vbmxpZ2h0XCI6IFwibW9vbnNoaW5lXCIsXHJcbiAgICBcIm1vb25cIjogXCJuaWdodCBsaWdodFwiLFxyXG4gICAgXCJzdGVlbFwiOiBcImxhdGV4XCIsXHJcbiAgICBcImtuaWZlXCI6IFwiZGlsZG9cIixcclxuICAgIFwicmF6b3JibGFkZVwiOiBcImJ1dHQgcGx1Z1wiLFxyXG4gICAgXCJyYXpvclwiOiBcImRpbGRvXCIsXHJcbiAgICBcImJsYWRlXCI6IFwiaGFuZGxlXCIsXHJcbiAgICBcInBhaW5cIjogXCJob3Qgc2V4XCIsXHJcbiAgICBcImVtb3Rpb25hbFwiOiBcImNoaWxkaXNoXCIsXHJcbiAgICBcImVtb3Rpb25cIjogXCJsdWJyaWNhbnRcIixcclxuICAgIFwidGVhcmRyb3BcIjogXCJ0ZWFyIGRyb3BcIixcclxuICAgIFwidGVhclwiOiBcInNwZXJtZVwiLFxyXG4gICAgXCJjYXN0bGVcIjogXCJjaGF0ZWF1XCIsXHJcbiAgICBcIndvcmxkXCI6IFwiaGFuZCB0b3dlbFwiLFxyXG4gICAgXCJkZWFkXCI6IFwiaW5lcnRcIixcclxuICAgIFwiZ29vZGJ5ZVwiOiBcInBlYWNlIHknYWxsXCIsXHJcbiAgICBcImdvb2QtYnllXCI6IFwiZ2V0IHRoZSBmdWNrIG91dFwiLFxyXG4gICAgXCJnb29kIGJ5ZVwiOiBcImZ1Y2sgb2ZmXCIsXHJcbiAgICBcImRlYXRoXCI6IFwiU2FudGFcIixcclxuICAgIFwicGFsZVwiOiBcInNleHlcIixcclxuICAgIFwiZHJpZnRcIjogXCJoaW0taGF3XCIsXHJcbiAgICBcImZhZGVcIjogXCJoaW0taGF3XCIsXHJcbiAgICBcImZsZXNoXCI6IFwidHdpbmtpZVwiLFxyXG4gICAgXCJjb3Jwc2VcIjogXCJtYW5uZXF1aW5cIixcclxuICAgIFwic2tpblwiOiBcInR3aW5raWVzXCIsXHJcbiAgICBcInB1dHJpZFwiOiBcInBsZWFzYW50XCIsXHJcbiAgICBcImJyZWF0aGVcIjogXCJwYXVzZSBhd2t3YXJkbHlcIixcclxuICAgIFwiYnJlYXRoXCI6IFwiYXdrd2FyZCBwYXVzZVwiLFxyXG4gICAgXCJzdG9wcFwiOiBcInB1c2hcIixcclxuICAgIFwic3RvcFwiOiBcInB1c2hcIixcclxuICAgIFwic2NyZWFtXCI6IFwiZ3J1bnRcIixcclxuICAgIFwidGhpbmtcIjogXCJzY2hlbWVcIixcclxuICAgIFwic3Bpcml0dWFsXCI6IFwiYmFuYW5hIGNyYXZpbmdcIixcclxuICAgIFwic3Bpcml0XCI6IFwiYmFuYW5hXCIsXHJcbiAgICBcInNvdWxcIjogXCJiYW5hbmFcIixcclxuICAgIFwiZ2hvc3RcIjogXCJpbWFnaW5hcnkgZnJpZW5kXCIsXHJcbiAgICBcIm1vbnN0ZXJcIjogXCJkaXNsZXhpYyBsb3ZlclwiLFxyXG4gICAgXCJiZWFzdFwiOiBcImVyZWN0aW9uXCIsXHJcbiAgICBcImRlbW9uXCI6IFwiaGFyZC1vblwiLFxyXG4gICAgXCJhbmdlbFwiOiBcInBvcm4gc3RhclwiLFxyXG4gICAgXCJzaG9vdGluZyBzdGFyXCI6IFwic3dpZnQgbWlzc2lsZVwiLFxyXG4gICAgXCJzdGFyXCI6IFwibWlzc2lsZVwiLFxyXG4gICAgXCJsb3N0XCI6IFwiYXJvdXNlZFwiLFxyXG4gICAgXCJ0aW1lXCI6IFwidGhyb2JiaW5nXCIsXHJcbiAgICBcImNoZWVrXCI6IFwicnVtcFwiLFxyXG4gICAgXCJmaW5nZXJzXCI6IFwic2F1c2FnZVwiLFxyXG4gICAgXCJkYXlkcmVhbVwiOiBcImZhbnRhc2l6ZVwiLFxyXG4gICAgXCJ0aGUgc3ByaW5nXCI6IFwidHViZSBzb2NrXCIsXHJcbiAgICBcInNwcmluZ1wiOiBcInR1YmUgc29ja3NcIixcclxuICAgIFwiaWxsdXNpb25cIjogXCJkcnVua2VuIG1pc3Rha2VcIixcclxuICAgIFwibG9uZWxpbmVzc1wiOiBcImFyb3VzYWxcIixcclxuICAgIFwibG9uZWx5XCI6IFwiaG9ybnlcIixcclxuICAgIFwiYWxvbmVcIjogXCJlY3N0YXRpY1wiLFxyXG4gICAgXCJsb25lXCI6IFwic2luZ2xlXCIsXHJcbiAgICBcInBlcmZlY3RcIjogXCJmdWNrZWRcIixcclxuICAgIFwiaGlkZGVuXCI6IFwic3Rhc2hlZFwiLFxyXG4gICAgXCJteXN0ZXJ5XCI6IFwibmVvbiBzaWduXCIsXHJcbiAgICBcIm15c3Rlcmllc1wiOiBcIm5lb24gc2lnbnNcIixcclxuICAgIFwicm9zZVwiOiBcImJ1dHQgaG9sZVwiLFxyXG4gICAgXCJwZXRhbFwiOiBcImRpbmdsZWJlcnJ5XCIsXHJcbiAgICBcImRpZmZlcmVudFwiOiBcImF3a3dhcmRcIixcclxuICAgIFwid3JvbmdcIjogXCJidXp6aW5nXCIsXHJcbiAgICBcImZhdGVcIjogXCJjb2luY2lkZW5jZVwiLFxyXG4gICAgXCJjb2xkXCI6IFwiZnV6enlcIixcclxuICAgIFwiaGVsbGZpcmVcIjogXCJoZWxsIGZpcmVcIixcclxuICAgIFwiaGVsbFwiOiBcIm15IGNvY2snc1wiLFxyXG4gICAgXCJjcnlzdGFsXCI6IFwiYmVkYXpsZXJcIixcclxuICAgIFwicmFpbmJvd1wiOiBcInBpenphenpcIixcclxuICAgIFwicmFpblwiOiBcImppenp1bVwiLFxyXG4gICAgXCJzdG9ybVwiOiBcIm9yZ3lcIixcclxuICAgIFwid2luZFwiOiBcImJsb3dcIixcclxuICAgIFwiYnJlZXplXCI6IFwiZHJhZnRcIixcclxuICAgIFwiYnJpbGxpYW5jZVwiOiBcInNoaW55bmVzc1wiLFxyXG4gICAgXCJicmlsbGlhbnRcIjogXCJzaGlueVwiLFxyXG4gICAgXCJkcmVhbWxhbmRcIjogXCJvYnNlc3Npb24gaXNsYW5kXCIsXHJcbiAgICBcImRyZWFtc1wiOiBcIm9ic2Vzc2lvbnNcIixcclxuICAgIFwiZHJlYW1cIjogXCJvYnNlc3NcIixcclxuICAgIFwicHJpc29uXCI6IFwib3V0aG91c2VcIixcclxuICAgIFwiZ29sZGVuIHJheVwiOiBcImdhdWR5IHNjcmliYmxlXCIsXHJcbiAgICBcInJheVwiOiBcInNjcmliYmxlXCIsXHJcbiAgICBcImRlYWRseVwiOiBcImZlcnRpbGVcIixcclxuICAgIFwidHJ1dGhcIjogXCJ0cml2aWFcIixcclxuICAgIFwic3VuXCI6IFwieWVsbG93IGRpc2tcIixcclxuICAgIFwiY3J1ZWxcIjogXCJoYXBoYXphcmRcIixcclxuICAgIFwiY2xvdWRcIjogXCJiYWxsb29uXCIsXHJcbiAgICBcInR3aW5rbGVcIjogXCJzdHJvYmVcIixcclxuICAgIFwidHdpbmtsaW5nXCI6IFwic3Ryb2JpbmdcIixcclxuICAgIFwiZXNjYXBlXCI6IFwic251Z2dsZVwiLFxyXG4gICAgXCJ1bmRlcnN0YW5kXCI6IFwic3Ryb2tlIG15IGVnb1wiLFxyXG4gICAgXCJyZW1lbWJlclwiOiBcIm11bWJsZVwiLFxyXG4gICAgXCJpbGx1bWluYXRpb25cIjogXCJtdW1ibyBqdW1ib1wiLFxyXG4gICAgXCJyZWFsaXR5XCI6IFwidG9pbGV0IGJvd2xcIixcclxuICAgIFwiYmluZFwiOiBcImNvZGRsZVwiLFxyXG4gICAgXCJib3VuZFwiOiBcImNvZGRsZWRcIixcclxuICAgIFwidG9yblwiOiBcImh1Z2dsZWRcIixcclxuICAgIFwiZGllZFwiOiBcIm1hZGUgbWFyc2htYWxsb3dzXCIsXHJcbiAgICBcImRpZXNcIjogXCJtYWtlcyBtYXJzaG1hbGxvd3NcIixcclxuICAgIFwiZGllXCI6IFwibWFrZSBtYXJzaG1hbGxvd3NcIixcclxuICAgIFwiZHlpbmdcIjogXCJtYWtpbmcgbWFyc2htYWxsb3dzXCIsXHJcbiAgICBcImJvZHlcIjogXCJqaWdnbGluZyBjbHVtcFwiLFxyXG4gICAgXCJib2RpZXNcIjogXCJqaWdnbGluZyBwaWxlc1wiLFxyXG4gICAgXCJ3YXJmYXJlXCI6IFwiY2hpbGRyZW4gbGF1Z2hpbmdcIixcclxuICAgIFwiZGVidXRhbnRlc1wiOiBcImhvb2tlcnNcIixcclxuICAgIFwic2xhdmVcIjogXCJnaW1wXCIsXHJcbiAgICBcInBvZXRpY1wiOiBcImZsYXR1bGVudFwiLFxyXG4gICAgXCJwb2V0cnlcIjogXCJiYWQgZ2FzXCIsXHJcbiAgICBcInBvZXRcIjogXCJob2JvXCIsXHJcbiAgICBcInBvZW1cIjogXCJzY3JpYmJsZVwiLFxyXG4gICAgXCJjb3VudHJ5XCI6IFwiYmF0aHJvb21cIixcclxuICAgIFwibmFrZWRcIjogXCJ1bnNoYXZlZFwiLFxyXG4gICAgXCJqZXN1cyBjaHJpc3RcIjogXCJqaW0gYm9iIGpyXCIsXHJcbiAgICBcImNocmlzdFwiOiBcImppbSBib2IganJcIixcclxuICAgIFwiamVzdXNcIjogXCJqaW0gYm9iIGpyXCIsXHJcbiAgICBcImhlYWxlclwiOiBcImZvbmRsZXJcIixcclxuICAgIFwiZ29kc1wiOiBcImppbSBib2Igc3IgZXQgYWwuXCIsXHJcbiAgICBcImdvZFwiOiBcImppbSBib2Igc3JcIixcclxuICAgIFwid2VhcG9uXCI6IFwicG9ja2V0IHB1c3N5XCIsXHJcbiAgICBcImV4aXN0ZW5jZVwiOiBcIndoYXRldmVyXCIsXHJcbiAgICBcIm1pbmlvblwiOiBcImhvcm55IHBpcmF0ZVwiLFxyXG4gICAgXCJyYXBpbmdcIjogXCJ3aGF0XCIsXHJcbiAgICBcInJhcGVcIjogXCJ3aGF0XCIsXHJcbiAgICBcImdyYXZlc3RvbmVcIjogXCJtaWxlIG1hcmtlclwiLFxyXG4gICAgXCJncmF2ZVwiOiBcInBlcnNvbmFsIHNwYWNlXCIsXHJcbiAgICBcImluZmluaXRlXCI6IFwiYWJzdHJhY3RcIixcclxuICAgIFwic3VpY2lkZVwiOiBcIm11cmRlclwiLFxyXG4gICAgXCJicmlua1wiOiBcImJvcmRlclwiLFxyXG4gICAgXCJjcmllZFwiOiBcImNhbWVcIixcclxuICAgIFwiY3JpZXNcIjogXCJza2VldHNcIixcclxuICAgIFwiY3J5aW5nXCI6IFwiY3VtbWluZ1wiLFxyXG4gICAgXCJoYWQgZG9uZVwiOiBcImRvbmUgZGlkXCIsXHJcbiAgICBcImNyeVwiOiBcImN1bVwiLFxyXG4gICAgXCJjcnlwdGljXCI6IFwiZHJ1bmtlblwiLFxyXG4gICAgXCJjcnlwdFwiOiBcInVyaW5hbFwiLFxyXG4gICAgXCJteXN0aWNcIjogXCJ0cmFuc2V4dWFsXCIsXHJcbiAgICBcImJhbGFuY2VkIGluZGl2aWR1YWxcIjogXCJwc3ljaG9cIixcclxuICAgIFwiYmFsYW5jZWQgcGVyc29uXCI6IFwicHN5Y2hvXCIsXHJcbiAgICBcImJhbGFuY2VkIG1hblwiOiBcInBzeWNob1wiLFxyXG4gICAgXCJiYWxhbmNlZCB3b21hblwiOiBcInBzeWNob1wiLFxyXG4gICAgXCJ3aXNkb21cIjogXCJidWxsIHNoaXRcIixcclxuICAgIFwid2lzZVwiOiBcImJ1bGwgc2hpdHRpbmdcIixcclxuICAgIFwiYmxlc3NlZCBiZVwiOiBcInN1Y2sgZWdnc1wiLFxyXG4gICAgXCJlbmVyZ3lcIjogXCJqdWljZVwiLFxyXG4gICAgXCJyaWRkbGVcIjogXCJwb2xrYSBkb3RcIixcclxuICAgIFwibXkgbG9yZFwiOiBcInN3ZWV0IHBhbG1cIixcclxuICAgIFwic28gbW90ZSBpdCBiZVwiOiBcIml0J3MgcmVhbCBpbiBteSBoZWFkXCIsXHJcbiAgICBcInByYXlcIjogXCJtdXJtdXJcIixcclxuICAgIFwibm9tYWRcIjogXCJkcnVuayBob2JvXCIsXHJcbiAgICBcImRlc3RpbnlcIjogXCJ0YXhlc1wiLFxyXG4gICAgXCJzd29yZFwiOiBcImRpbGRvXCIsXHJcbiAgICBcInZvaWRcIjogXCJidWNrZXRcIixcclxuICAgIFwianVzdFwiOiBcInN1cmVcIixcclxuICAgIFwidmVuZ2VhbmNlXCI6IFwic2xhcCBoYXBwaW5lc3NcIixcclxuICAgIFwiYXZlbmdlXCI6IFwiZ2l0IHJvd2R5IGZvclwiLFxyXG4gICAgXCJ2ZW5nZVwiOiBcIi1yb3dkeS1cIixcclxuICAgIFwiaGVhdmVuc1wiOiBcInNraWVzXCIsXHJcbiAgICBcImhlYXZlblwiOiBcInNreVwiLFxyXG4gICAgXCJlbmRsZXNzXCI6IFwicmVhbCBsb25nXCIsXHJcbiAgICBcInZhbGxleVwiOiBcImRpdGNoXCIsXHJcbiAgICBcImFyZHVvdXNcIjogXCJub3QgZWFzeVwiLFxyXG4gICAgXCJ0b3VjaFwiOiBcImdyb3BlXCIsXHJcbiAgICBcIndyZXRjaGVkXCI6IFwic2tlZXp5XCIsXHJcbiAgICBcIndyZXRjaFwiOiBcInNrZWV6ZVwiLFxyXG4gICAgXCJhd2VcIjogXCJmZWFyZnVsIHJldmVyZW5jZVwiLFxyXG4gICAgXCJyaXR1YWxcIjogXCJiYW5hbmEgZGFuY2VcIixcclxuICAgIFwiYmVob2xkXCI6IFwib29nbGVcIixcclxuICAgIFwidmVpbFwiOiBcImRpc2d1aXNlXCIsXHJcbiAgICBcInZpc3RhXCI6IFwic2NlbmVcIixcclxuICAgIFwiYWx3YXlzXCI6IFwidXN1YWxseVwiLFxyXG4gICAgXCJiZWxpZXZlXCI6IFwiYnV5XCIsXHJcbiAgICBcIndpc2hcIjogXCJ3YW50XCIsXHJcbiAgICBcImZlbGxcIjogXCJmbG9wcGVkXCIsXHJcbiAgICBcImZhbGxcIjogXCJmbG9wXCIsXHJcbiAgICBcInJpZ2h0ZW91c1wiOiBcImFycm9nYW50XCIsXHJcbiAgICBcIndhcnJpb3JcIjogXCJraXR0ZW5cIixcclxuICAgIFwidW5jYXJpbmdcIjogXCJwcmlja2lzaFwiLFxyXG4gICAgXCJjYXJlIHRvIGdpdmVcIjogXCJzaGl0IHRvIGdpdmVcIixcclxuICAgIFwidGFrZSBjYXJlIG9mXCI6IFwiZGVjaW1hdGVcIixcclxuICAgIFwidGFraW5nIGNhcmVcIjogXCJmb3JnZXRpbmdcIixcclxuICAgIFwidGFrZXMgY2FyZVwiOiBcImZvcmdldHNcIixcclxuICAgIFwidGFrZSBjYXJlXCI6IFwiZm9yZ2V0XCIsXHJcbiAgICBcImZvcmdldFwiOiBcImRpc3JlbWVtYmVyXCIsXHJcbiAgICBcImNhcmluZ1wiOiBcImdpdmluZyBhIHNoaXRcIixcclxuICAgIFwiY2FyZWRcIjogXCJnYXZlIGEgc2hpdFwiLFxyXG4gICAgXCJjYXJlXCI6IFwiZ2l2ZSBhIHNoaXRcIixcclxuICAgIFwid2llbGRcIjogXCJqZXJrXCIsXHJcbiAgICBcIm9jZWFuXCI6IFwic2V3ZXJcIixcclxuICAgIFwic2VhXCI6IFwiYmF0aFwiLFxyXG4gICAgXCJiYXlcIjogXCJzaW5rXCIsXHJcbiAgICBcInR3aWxpZ2h0XCI6IFwibW9vbnNoaW5lXCIsXHJcbiAgICBcImJyb2tlblwiOiBcImJlYXRlblwiLFxyXG4gICAgXCJicm9rZVwiOiBcImJlYXRcIixcclxuICAgIFwiYnJlYWtcIjogXCJiZWF0XCIsXHJcbiAgICBcImZvcmV2ZXJcIjogXCJzbyB2ZXJ5XCIsXHJcbiAgICBcImh1bWFuIHJhY2VcIjogXCJnZXJiaWwgZW1waXJlXCIsXHJcbiAgICBcIm5pZ2h0bWFyZVwiOiBcInRhbnRydW1cIixcclxuICAgIFwic3VmZmVyXCI6IFwicGlyb3VldHRlXCIsXHJcbiAgICBcIm15c2VsZlwiOiBcIm15IG11Y2huZXNzXCIsXHJcbiAgICBcIm1lXCI6IFwiaVwiLFxyXG4gICAgXCJteVwiOiBcImkncyBcIixcclxuICAgIFwibWluZVwiOiBcImknc1wiLFxyXG4gICAgXCJ3YXMgaVwiOiBcIndlcmUgaVwiLFxyXG4gICAgXCJhbSBpXCI6IFwiYXJlIGlcIixcclxuICAgIFwiaW1cIjogXCJpJ21cIixcclxuICAgIFwiaSdtXCI6IFwiaSBhcmVcIixcclxuICAgIFwiaSd2ZVwiOiBcImkgaGF2ZVwiLFxyXG4gICAgXCJpJ2xsXCI6IFwiaSB3aWxsXCIsXHJcbiAgICBcImkgYW1cIjogXCJpIGFyZVwiLFxyXG4gICAgXCJ5b3Vyc2VsZlwiOiBcInlvdSdzIG11Y2huZXNzXCIsXHJcbiAgICBcInlvdXJzXCI6IFwieW91J3NcIixcclxuICAgIFwieW91clwiOiBcInlvdSdzXCIsXHJcbiAgICBcInlvdSBhbGxcIjogXCJhbGwgeW91XCIsXHJcbiAgICBcInlvdSdsbFwiOiBcInlvdSB3aWxsXCIsXHJcbiAgICBcInlvdSd2ZVwiOiBcInlvdSBoYXNcIixcclxuICAgIFwieW91J3JlXCI6IFwieW91IGlzXCIsXHJcbiAgICBcInRoZWVcIjogXCJ5b3VcIixcclxuICAgIFwidGhpbmVcIjogXCJ5b3Unc1wiLFxyXG4gICAgXCJ0aG91XCI6IFwieW91XCIsXHJcbiAgICBcIndlXCI6IFwidGhleVwiLFxyXG4gICAgXCJ1c1wiOiBcInRoZW1cIixcclxuICAgIFwib3VyXCI6IFwidGhlaXJcIixcclxuICAgIFwib3Vyc1wiOiBcInRoZWlyc1wiLFxyXG4gICAgXCJpXCI6IFwiS2V2aW5cIixcclxuICAgIFwieW91XCI6IFwiUmV0YXJkc1wiXHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2RvY3MvdnNkb2MvT3BlbkxheWVyc0FsbC5qc1wiLz5cclxuLypqc2xpbnRcclxuICAgIG5vZGU6IHRydWVcclxuKi9cclxudmFyIGF0cm9wYSA9IHJlcXVpcmUoJ2F0cm9wYS1oZWFkZXInKTtcclxuYXRyb3BhLnJlZ2V4ID0gcmVxdWlyZSgnYXRyb3BhLXJlZ2V4JykucmVnZXg7XHJcbmF0cm9wYS5zdHJpbmcgPSByZXF1aXJlKCdhdHJvcGEtc3RyaW5nJykuc3RyaW5nO1xyXG5hdHJvcGEuc2V0QXNPcHRpb25hbEFyZyA9IHJlcXVpcmUoJ2F0cm9wYS1zZXRBc09wdGlvbmFsQXJnJykuc2V0QXNPcHRpb25hbEFyZztcclxuLypqc2xpbnRcclxuICAgIGluZGVudDogNCxcclxuICAgIG1heGVycjogNTAsXHJcbiAgICB3aGl0ZTogdHJ1ZSxcclxuICAgIGJyb3dzZXI6IHRydWUsXHJcbiAgICBkZXZlbDogdHJ1ZSxcclxuICAgIHBsdXNwbHVzOiB0cnVlLFxyXG4gICAgcmVnZXhwOiB0cnVlLFxyXG4gICAgdmFyczogdHJ1ZVxyXG4qL1xyXG4vKmdsb2JhbCBhdHJvcGEgKi9cclxuLy8gZW5kIGhlYWRlclxyXG4oZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICBhdHJvcGEucmVxdWlyZXMoXHJcbiAgICAgICAgJ3d0ZicsXHJcbiAgICAgICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgc3VwcG9ydGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgIGF0cm9wYS5yZWdleCxcclxuICAgICAgICAgICAgICAgIGF0cm9wYS5zdHJpbmcuY291bnRXb3JkcyxcclxuICAgICAgICAgICAgICAgIGF0cm9wYS5zZXRBc09wdGlvbmFsQXJnXHJcbiAgICAgICAgICAgIF0uZm9yRWFjaChmdW5jdGlvbiAocHJlcmVxdWlzaXRlKSB7XHJcbiAgICAgICAgICAgICAgICBpZihwcmVyZXF1aXNpdGUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN1cHBvcnRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIHN1cHBvcnRlZDtcclxuICAgICAgICB9XHJcbiAgICApO1xyXG59KCkpO1xyXG5cclxuKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgYXRyb3BhLnJlcXVpcmVzKFxyXG4gICAgICAgICd3dGZIdG1sRWxlbWVudCcsXHJcbiAgICAgICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgc3VwcG9ydGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgIHdpbmRvd1xyXG4gICAgICAgICAgICBdLmZvckVhY2goZnVuY3Rpb24gKHByZXJlcXVpc2l0ZSkge1xyXG4gICAgICAgICAgICAgICAgaWYocHJlcmVxdWlzaXRlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdXBwb3J0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBzdXBwb3J0ZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgKTtcclxufSgpKTtcclxuXHJcbi8qKlxyXG4gKiBDb250YWluZXIgZm9yIGFsbCBHbG9yaW91cyBXVEZpZmllciByZWxhdGVkIGZ1bmN0aW9ucyBhbmQgc3VjaC5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTIwOTA5XHJcbiAqIEBuYW1lc3BhY2UgQ29udGFpbmVyIGZvciBhbGwgR2xvcmlvdXMgV1RGaWZpZXIgcmVsYXRlZCBmdW5jdGlvbnMgYW5kIHN1Y2guXHJcbiAqIEByZXF1aXJlcyBhdHJvcGEucmVnZXhcclxuICogQHJlcXVpcmVzIGF0cm9wYS53dGYuZGljdGlvbmFyeVxyXG4gKi9cclxuYXRyb3BhLnd0ZiA9IHt9O1xyXG4vKipcclxuICogVGhlIEdsb3Jpb3VzIFdURmlmaWNhdGlvbiBEaWN0aW9uYXJ5OiBUdXJuaW5nIFNoaXRcclxuICogSW50byBQb2xpc2hlZCBUdXJkcy5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwMTEwXHJcbiAqL1xyXG5hdHJvcGEud3RmLmRpY3Rpb25hcnkgPSByZXF1aXJlKCcuL2F0cm9wYS13dGYtZGljdGlvbmFyeS5qc29uJyk7XHJcbi8qKlxyXG4gKiBBY2NlcHRzIHBsYWluIHRleHQgaW5wdXQgYW5kIEdsb3Jpb3VzbHkgV1RGaWZpZXMgaXQuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDExMFxyXG4gKiBAcGFyYW0ge1N0cmluZ30gdGFyZ2V0IFRoZSB0ZXh0IHRvIFdURmlmeS5cclxuICogQHBhcmFtIHtCb29sZWFufSBvdXRwdXRIVE1MIFNwZWNpZmllcyBpZiB5b3Ugd2FudCB0aGUgb3V0cHV0XHJcbiAqICBpbiBIVE1MIGZvcm1hdC4gSWYgZmFsc2UsIHdpbGwgb3V0cHV0IHBsYWluIHRleHQuIERlZmF1bHRzXHJcbiAqICB0byBmYWxzZS5cclxuICogQHJldHVybiB7U3RyaW5nfSBSZXR1cm5zIEdlbnVpbmUgV1RGaWZpZWQgdGV4dC5cclxuICovXHJcbmF0cm9wYS53dGYud3RmaWZ5ID0gZnVuY3Rpb24gKHRhcmdldCwgb3V0cHV0SFRNTCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICBhdHJvcGEuc3VwcG9ydENoZWNrKCd3dGYnKTtcclxuICAgIFxyXG4gICAgdmFyIHJlZ2V4VmFsdWUsXHJcbiAgICAgICAgcmVwbGFjZW1lbnRUZXh0LFxyXG4gICAgICAgIG9sZFdvcmQsXHJcbiAgICAgICAgd3RmQ291bnQsXHJcbiAgICAgICAgd29yZENvdW50LFxyXG4gICAgICAgIHJldCxcclxuICAgICAgICB3b3JkO1xyXG4gICAgXHJcbiAgICBpZih0cnVlICE9PSBvdXRwdXRIVE1MKSB7XHJcbiAgICAgICAgb3V0cHV0SFRNTCA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcmV0ID0ge307XHJcbiAgICB3dGZDb3VudCA9IDA7XHJcbiAgICB0YXJnZXQgPSB0YXJnZXQudHJpbSgpO1xyXG4gICAgd29yZENvdW50ID0gYXRyb3BhLnN0cmluZy5jb3VudFdvcmRzKHRhcmdldCk7XHJcbiAgICBpZih0cnVlID09PSBvdXRwdXRIVE1MKSB7XHJcbiAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0LnJlcGxhY2UoXHJcbiAgICAgICAgICAgIC8oXFwuID8pezIsfS9naSxcclxuICAgICAgICAgICAgJzxzcGFuIHN0eWxlPVwiY29sb3IgOiBicm93biA7XCI+IFtzaGl0IHRhY29dIDwvc3Bhbj4nXHJcbiAgICAgICAgKTtcclxuICAgICAgICB0YXJnZXQgPSAnPHA+ICcgKyB0YXJnZXQucmVwbGFjZSgvKFxcclxcbnxcXHJ8XFxuKS9nLCcgPGJyLz4gJykgKyAnIDwvcD4nO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB0YXJnZXQgPSB0YXJnZXQucmVwbGFjZSgvKFxcLiA/KXsyLH0vZ2ksICcgW3NoaXQgdGFjb10gJyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIEFjY2VwdHMgcGxhaW4gdGV4dCBpbnB1dCBhbmQgR2xvcmlvdXNseSBXVEZpZmllcyBpdC5cclxuICAgICAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gICAgICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAgICAgKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAgICAgKiBAdmVyc2lvbiAyMDEzMDExMlxyXG4gICAgICogQG1ldGhvZE9mIGF0cm9wYS53dGYud3RmaWZ5LVxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBtIEZpcnN0IG1hdGNoZWQgcGF0dGVybiBpbiBzdHJpbmcgc2VhcmNoZWQuXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gc3ViMSBGaXJzdCBtYXRjaGVkIHN1YnBhdHRlcm4gaW4gc3RyaW5nIHNlYXJjaGVkLlxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHN1YjIgU2Vjb25kIG1hdGNoZWQgc3VicGF0dGVybiBpbiBzdHJpbmcgc2VhcmNoZWQuXHJcbiAgICAgKi9cclxuICAgICAvKmpzbGludCB1bnBhcmFtOiB0cnVlKi9cclxuICAgIHJlcGxhY2VtZW50VGV4dCA9IGZ1bmN0aW9uIChtLCBzdWIxLCBzdWIyKSB7XHJcbiAgICAgICAgd3RmQ291bnQrKztcclxuICAgICAgICBzdWIxID0gYXRyb3BhLnNldEFzT3B0aW9uYWxBcmcoJycsIHN1YjEpO1xyXG4gICAgICAgIHN1YjIgPSBhdHJvcGEuc2V0QXNPcHRpb25hbEFyZygnJywgc3ViMik7XHJcbiAgICAgICAgdmFyIG91dDtcclxuICAgICAgICBpZih0cnVlID09PSBvdXRwdXRIVE1MKSB7XHJcbiAgICAgICAgICAgIG91dCA9ICc8c3BhbiBzdHlsZT1cImNvbG9yIDogcmVkIDtcIj4nICtcclxuICAgICAgICAgICAgICAgIHN1YjEgKyBhdHJvcGEud3RmLmRpY3Rpb25hcnlbd29yZF0gKyBzdWIyICtcclxuICAgICAgICAgICAgICAgICc8L3NwYW4+JztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBvdXQgPSBzdWIxICsgYXRyb3BhLnd0Zi5kaWN0aW9uYXJ5W3dvcmRdICsgc3ViMjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH07XHJcbiAgICAvKmpzbGludCB1bnBhcmFtOiBmYWxzZSovXHJcbiAgICAvLyB3b3JkIGlzIGRlZmluZWQgaW4gdGhlIGNvbnRhaW5pbmcgc2NvcGUgYW5kXHJcbiAgICAvLyBpcyBub3QgZ2xvYmFsLCBqc2hpbnQgaXMgd3JvbmdcclxuICAgIGZvciAod29yZCBpbiBhdHJvcGEud3RmLmRpY3Rpb25hcnkpIHtcclxuICAgICAgICBpZiAoYXRyb3BhLnd0Zi5kaWN0aW9uYXJ5Lmhhc093blByb3BlcnR5KHdvcmQpKSB7XHJcbiAgICAgICAgICAgIG9sZFdvcmQgPSBhdHJvcGEucmVnZXguYXBwZW5kUHJlZml4ZXNBbmRTdWZmaXhlcyh3b3JkKTtcclxuICAgICAgICAgICAgcmVnZXhWYWx1ZSA9IG5ldyBSZWdFeHAob2xkV29yZCwgJ2dpJyk7XHJcbiAgICAgICAgICAgIHRhcmdldCA9IHRhcmdldC5yZXBsYWNlKHJlZ2V4VmFsdWUsIHJlcGxhY2VtZW50VGV4dCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0Lnd0ZkNvdW50ID0gd3RmQ291bnQ7XHJcbiAgICByZXQud29yZENvdW50ID0gd29yZENvdW50O1xyXG4gICAgcmV0LnNjb3JlID0gd3RmQ291bnQgLyB3b3JkQ291bnQ7XHJcbiAgICByZXQudHh0ID0gdGFyZ2V0O1xyXG4gICAgcmV0dXJuIHJldDtcclxufTtcclxuLyoqXHJcbiAqIFdURmlmaWVzIHRoZSA8Y29kZT50ZXh0Q29udGVudDwvY29kZT4gb3IgPGNvZGU+dmFsdWU8L2NvZGU+IG9mIHRoZVxyXG4gKiAgZ2l2ZW4gZWxlbWVudCBhbmQgcmVwbGFjZXMgdGhlIGVsZW1lbnQncyBpbm5lckhUTUwgd2l0aCBhIHByZSBibG9ja1xyXG4gKiAgY29udGFpbmluZyB0aGUgcmVzdWx0cyBvZiBXVEZpZmljYXRpb24uXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRSZWZlcmVuY2UgQSByZWZlcmVuY2UgdG8gYW4gSFRNTCBFbGVtZW50LlxyXG4gKiBAcmV0dXJucyB7SFRNTEVsZW1lbnR9IFJldHVybnMgdGhlIGdpdmVuIGVsZW1lbnQgYWZ0ZXIgd3RmaWZpY2F0aW9uLlxyXG4gKiBAdmVyc2lvbiAyMDEzMDMxM1xyXG4gKi9cclxuYXRyb3BhLnd0Zi5odG1sRWxlbWVudCA9IGZ1bmN0aW9uIChlbGVtZW50UmVmZXJlbmNlKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIGF0cm9wYS5zdXBwb3J0Q2hlY2soJ3d0Zkh0bWxFbGVtZW50Jyk7XHJcbiAgICBcclxuICAgIHZhciB3dGZpZmllZCwgdHh0O1xyXG4gICAgZWxlbWVudFJlZmVyZW5jZS5pbm5lckhUTUwgPSBlbGVtZW50UmVmZXJlbmNlLmlubmVySFRNTC5yZXBsYWNlKFxyXG4gICAgICAgIC88YnI+KFxccyspPyhcXHJcXG58XFxyfFxcbik/L2csICdcXHJcXG4nKTtcclxuICAgIHR4dCA9IGVsZW1lbnRSZWZlcmVuY2UudmFsdWUgfHwgZWxlbWVudFJlZmVyZW5jZS50ZXh0Q29udGVudDtcclxuICAgIHd0ZmlmaWVkID0gYXRyb3BhLnd0Zi53dGZpZnkodHh0LCB0cnVlKTtcclxuICAgIGVsZW1lbnRSZWZlcmVuY2UuaW5uZXJIVE1MID1cclxuICAgICAgICAnPHByZSBzdHlsZT1cImNvbG9yOmJsYWNrOyBiYWNrZ3JvdW5kOndoaXRlOyB3aGl0ZS1zcGFjZTpwcmUtd3JhcDtcIj4nICtcclxuICAgICAgICB3dGZpZmllZC50eHQgK1xyXG4gICAgICAgICc8L3ByZT4nO1xyXG4gICAgcmV0dXJuIGVsZW1lbnRSZWZlcmVuY2U7XHJcbn07XHJcblxyXG5cclxuXHJcblxyXG53aGlsZShhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMubGVuZ3RoID4gMCkge1xyXG4gICAgYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLnBvcCgpKCk7XHJcbn1cclxubW9kdWxlLmV4cG9ydHMgPSBhdHJvcGE7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9kb2NzL3ZzZG9jL09wZW5MYXllcnNBbGwuanNcIi8+XHJcbnZhciBhdHJvcGEgPSByZXF1aXJlKCdhdHJvcGEtaGVhZGVyJyk7XHJcbmF0cm9wYS5zZXRBc09wdGlvbmFsQXJnID0gcmVxdWlyZSgnYXRyb3BhLXNldEFzT3B0aW9uYWxBcmcnKS5zZXRBc09wdGlvbmFsQXJnO1xyXG5hdHJvcGEucmVtb3ZlTm9kZUJ5UmVmZXJlbmNlID0gcmVxdWlyZSgnYXRyb3BhLXJlbW92ZU5vZGVCeVJlZmVyZW5jZScpLnJlbW92ZU5vZGVCeVJlZmVyZW5jZTtcclxuLypqc2xpbnRcclxuICAgIGluZGVudDogNCxcclxuICAgIG1heGVycjogNTAsXHJcbiAgICB3aGl0ZTogdHJ1ZSxcclxuICAgIGJyb3dzZXI6IHRydWUsXHJcbiAgICBkZXZlbDogdHJ1ZSxcclxuICAgIHBsdXNwbHVzOiB0cnVlLFxyXG4gICAgcmVnZXhwOiB0cnVlXHJcbiovXHJcbi8qZ2xvYmFsIGF0cm9wYSwgWFBhdGhSZXN1bHQgKi9cclxuLy8gZW5kIGhlYWRlclxyXG5cclxuXHJcbihmdW5jdGlvbiAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIGF0cm9wYS5yZXF1aXJlcyhcclxuICAgICAgICAneHBhdGgnLFxyXG4gICAgICAgIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHN1cHBvcnRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICB3aW5kb3csXHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ldmFsdWF0ZVxyXG4gICAgICAgICAgICBdLmZvckVhY2goZnVuY3Rpb24gKHByZXJlcXVpc2l0ZSkge1xyXG4gICAgICAgICAgICAgICAgaWYocHJlcmVxdWlzaXRlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdXBwb3J0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBzdXBwb3J0ZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgKTtcclxufSgpKTtcclxuXHJcbi8qKlxyXG4gKiBBbiBYcGF0aCB0b29sa2l0IGZvciBtYW5pcHVsYXRpbmcgdGhlIERPTS5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwMzEzXHJcbiAqIEBuYW1lc3BhY2UgQW4gWHBhdGggdG9vbGtpdCBmb3IgbWFuaXB1bGF0aW5nIHRoZSBET00uXHJcbiAqL1xyXG5hdHJvcGEueHBhdGggPSB7fTtcclxuLyoqXHJcbiAqIFByb2Nlc3NlcyBub2RlcyBmcm9tIHRoZSBET00gdXNpbmcgYW4gWHBhdGggZXhwcmVzc2lvbi5cclxuICogQGV4YW1wbGVcclxuICogICAvLyBTYXkgeW91IHdhbnRlZCB0byB0b3VjaCBhbGwgdGhlIGFuY2hvcnMgYW5kIGxpbmtzIGluIHdpbmRvdy5kb2N1bWVudFxyXG4gKiAgIHZhciB4cGF0aEV4cHJlc3Npb24sIGNhbGxiYWNrO1xyXG4gKiAgIHhwYXRoRXhwcmVzc2lvbiA9ICcuLy9hJztcclxuICogICBjYWxsYmFjayA9IGZ1bmN0aW9uKG9uZU5vZGUpIHtcclxuICogICAgICAgb25lTm9kZS50b3VjaGVkID0gdHJ1ZTtcclxuICogICB9XHJcbiAqICAgYXRyb3BhLnhwYXRoLnByb2Nlc3NOb2Rlc0J5WHBhdGgoXHJcbiAqICAgICAgIHhwYXRoRXhwcmVzc2lvbiwgZG9jdW1lbnQsIGRvY3VtZW50LCBjYWxsYmFjayk7XHJcbiAqICAgXHJcbiAqICAgLy8gT3Igc2F5IHlvdSBoYXZlIGFuIGlmcmFtZSwgd2l0aCB0aGUgaWQgJ215RnJhbWUnLiBJbiB0aGUgaWZyYW1lIHRoZXJlXHJcbiAqICAgLy8gaXMgYSBkaXYgd2l0aCB0aGUgaWQgbXlEaXYuXHJcbiAqICAgLy8gSGVyZSBpcyBob3cgeW91IHdvdWxkIHJlbW92ZSBhbGwgdGhlIGFuY2hvcnMgaW4gdGhhdCBkaXYuXHJcbiAqICAgdmFyIG15RnJhbWUsIHhwYXRoRXhwcmVzc2lvbiwgY29udGV4dE5vZGUsIGRvY3JlZiwgY2FsbGJhY2s7XHJcbiAqICAgbXlGcmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdteUZyYW1lJyk7XHJcbiAqICAgZG9jcmVmID0gbXlGcmFtZS5jb250ZW50V2luZG93LmRvY3VtZW50O1xyXG4gKiAgIGNvbnRleHROb2RlID0gZG9jcmVmLmdldEVsZW1lbnRCeUlkKCdteURpdicpO1xyXG4gKiAgIHhwYXRoRXhwcmVzc2lvbiA9ICcuLy9hJztcclxuICogICBjYWxsYmFjayA9IGZ1bmN0aW9uKG9uZU5vZGUpIHtcclxuICogICAgICAgYXRyb3BhLnJlbW92ZU5vZGVCeVJlZmVyZW5jZShvbmVOb2RlKTtcclxuICogICB9XHJcbiAqICAgYXRyb3BhLnhwYXRoLnByb2Nlc3NOb2Rlc0J5WHBhdGgoXHJcbiAqICAgICAgIHhwYXRoRXhwcmVzc2lvbiwgY29udGV4dE5vZGUsIGRvY3JlZiwgY2FsbGJhY2spO1xyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzAzMTNcclxuICogQHBhcmFtIHtTdHJpbmd9IHhwYXRoRXhwcmVzc2lvbiBBbiBYcGF0aCBleHByZXNzaW9uIGFzIGEgc3RyaW5nXHJcbiAqIEBwYXJhbSB7RE9NIE5vZGV9IGNvbnRleHROb2RlIE9wdGlvbmFsLiBUaGUgbm9kZSB3aGljaCBpcyB0byBzZXJ2ZSBhcyB0aGUgcm9vdFxyXG4gKiBmb3IgdGhlIHN1cHBsaWVkIFhwYXRoIGV4cHJlc3Npb24uIERlZmF1bHRzIHRvIHdoYXRldmVyIGRvY3JlZiBpcy5cclxuICogSWYgeW91IGFyZSB1c2luZyBhIHJlbGF0aXZlIHBhdGggc3VjaCBhcyA8Y29kZT4uLy9hPC9jb2RlPiBhbmQsIHlvdSBvbmx5XHJcbiAqIHdhbnQgdGhlIGFuY2hvcnMgdGhhdCBhcmUgZGVzY2VuZGFudHMgb2YgYW5vdGhlciBlbGVtZW50LCB5b3Ugd291bGRcclxuICogc3VwcGx5IGEgcmVmZXJlbmNlIHRvIHRoYXQgZWxlbWVudCBmb3IgdGhpcyBhcmd1bWVudC4gV2hlbiB1c2luZyBhXHJcbiAqIGNvbnRleHQgbm9kZSwgdGhlIGRvY3JlZiBhcmd1bWVudCBtdXN0IHJlZmVyIHRvIHRoZSBjb250ZXh0IG5vZGUnc1xyXG4gKiBjb250YWluaW5nIGRvY3VtZW50LlxyXG4gKiBAcGFyYW0ge0RPTSBEb2N1bWVudH0gZG9jcmVmIE9wdGlvbmFsLiBBIHJlZmVyZW5jZSB0byB0aGUgZG9jdW1lbnQgeW91XHJcbiAqIGFyZSBzZWFyY2hpbmcsIGRlZmF1bHRzIHRvIGRvY3VtZW50LiBJZiB5b3UgaGF2ZSBjcmVhdGVkIGEgc2VwYXJhdGVcclxuICogRE9NRG9jdW1lbnQgd2l0aCB0aGUgPGNvZGU+YXRyb3BhLkhUTUxQYXJzZXI8L2NvZGU+LCBhbiBpZnJhbWUsIG9yIGJ5XHJcbiAqIHNvbWUgb3RoZXIgbWVhbnMsIHlvdSB3b3VsZCBwdXQgYSByZWZlcmVuY2UgdG8gdGhhdCBkb2N1bWVudCBoZXJlIHRvXHJcbiAqIGluZGljYXRlIHRoYXQgeW91IGludGVuZCB0byB1c2UgdGhhdCBkb2N1bWVudCdzIHJvb3QuXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIEEgZnVuY3Rpb24gYXBwbGllZCB0byBldmVyeSBlbGVtZW50IGZvdW5kXHJcbiAqIHVzaW5nIHRoZSBzdXBwbGllZCB4cGF0aCBleHByZXNzaW9uLiBUaGUgY2FsbGJhY2sgcmVjZWl2ZXMgYSBzaW5nbGVcclxuICogZWxlbWVudCBhcyBpdCdzIG9ubHkgYXJndW1lbnQuXHJcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IFJldHVybnMgdGhlIHF1YW50aXR5IG9mIG5vZGVzIHByb2Nlc3NlZC5cclxuICovXHJcbmF0cm9wYS54cGF0aC5wcm9jZXNzTm9kZXNCeVhwYXRoID0gZnVuY3Rpb24gcHJvY2Vzc05vZGVzQnlYcGF0aChcclxuICAgIHhwYXRoRXhwcmVzc2lvbiwgY29udGV4dE5vZGUsIGRvY3JlZiwgY2FsbGJhY2tcclxuKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIGF0cm9wYS5zdXBwb3J0Q2hlY2soJ3hwYXRoJyk7XHJcbiAgICBkb2NyZWYgPSBhdHJvcGEuc2V0QXNPcHRpb25hbEFyZyhkb2N1bWVudCwgZG9jcmVmKTtcclxuICAgIGNvbnRleHROb2RlID0gYXRyb3BhLnNldEFzT3B0aW9uYWxBcmcoZG9jcmVmLCBjb250ZXh0Tm9kZSk7XHJcbiAgICB2YXIgbm9kZXNTbmFwc2hvdCxcclxuICAgIG5zbCxcclxuICAgIGksXHJcbiAgICBuc2k7XHJcbiAgICBub2Rlc1NuYXBzaG90ID0gZG9jcmVmLmV2YWx1YXRlKFxyXG4gICAgICAgIHhwYXRoRXhwcmVzc2lvbixcclxuICAgICAgICBjb250ZXh0Tm9kZSxcclxuICAgICAgICBudWxsLFxyXG4gICAgICAgIFhQYXRoUmVzdWx0Lk9SREVSRURfTk9ERV9TTkFQU0hPVF9UWVBFLFxyXG4gICAgICAgIG51bGxcclxuICAgICk7XHJcbiAgICBuc2wgPSBub2Rlc1NuYXBzaG90LnNuYXBzaG90TGVuZ3RoO1xyXG4gICAgZm9yIChpID0gMDsgaSA8IG5zbDsgaSsrKSB7XHJcbiAgICAgICAgbnNpID0gbm9kZXNTbmFwc2hvdC5zbmFwc2hvdEl0ZW0oaSk7XHJcbiAgICAgICAgY2FsbGJhY2sobnNpKTtcclxuICAgIH1cclxuICAgIHJldHVybiBpO1xyXG59O1xyXG4vKipcclxuICogUmVtb3ZlcyBub2RlcyBmcm9tIHRoZSBET00gdXNpbmcgYW4gWHBhdGggZXhwcmVzc2lvbi5cclxuICogQGV4YW1wbGVcclxuICogICAvLyB0byByZW1vdmUgYWxsIGFuY2hvcnMgd2l0aCB0aGUgY2xhc3MgXCJvb3BzXCIgaW5zaWRlIG9mIGFueSBkaXYgaW5cclxuICogICAvLyBkb2N1bWVudFxyXG4gKiAgIHZhciB4cGF0aEV4cHJlc3Npb24gPSBcIi4vL2Rpdi8vYVtAY2xhc3M9J29vcHMnXVwiO1xyXG4gKiAgIGF0cm9wYS54cGF0aC5yZW1vdmVOb2Rlc0J5WHBhdGgoeHBhdGhFeHByZXNzaW9uKTtcclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwMzEzXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSB4cGF0aEV4cHJlc3Npb24gQW4gWHBhdGggZXhwcmVzc2lvbiBhcyBhIHN0cmluZ1xyXG4gKiBAcGFyYW0ge0RPTSBOb2RlfSBjb250ZXh0Tm9kZSBPcHRpb25hbC4gVGhlIG5vZGUgd2hpY2ggaXMgdG8gc2VydmUgYXMgdGhlIHJvb3RcclxuICogZm9yIHRoZSBzdXBwbGllZCBYcGF0aCBleHByZXNzaW9uLiBEZWZhdWx0cyB0byB3aGF0ZXZlciBkb2NyZWYgaXMuXHJcbiAqIEBwYXJhbSB7RE9NIERvY3VtZW50fSBkb2NyZWYgT3B0aW9uYWwuIEEgcmVmZXJlbmNlIHRvIHRoZSBkb2N1bWVudCB5b3VcclxuICogYXJlIHNlYXJjaGluZywgZGVmYXVsdHMgdG8gZG9jdW1lbnQuXHJcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IFJldHVybnMgdGhlIHF1YW50aXR5IG9mIG5vZGVzIHJlbW92ZWQuXHJcbiAqIEBzZWUgYXRyb3BhLnhwYXRoLnByb2Nlc3NOb2Rlc0J5WHBhdGggZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqL1xyXG5hdHJvcGEueHBhdGgucmVtb3ZlTm9kZXNCeVhwYXRoID0gZnVuY3Rpb24gcmVtb3ZlTm9kZXNCeVhwYXRoKFxyXG4gICAgeHBhdGhFeHByZXNzaW9uLCBjb250ZXh0Tm9kZSwgZG9jcmVmXHJcbikge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICBhdHJvcGEuc3VwcG9ydENoZWNrKCd4cGF0aCcpO1xyXG4gICAgdmFyIGNvdW50O1xyXG4gICAgY291bnQgPSBhdHJvcGEueHBhdGgucHJvY2Vzc05vZGVzQnlYcGF0aChcclxuICAgICAgICB4cGF0aEV4cHJlc3Npb24sXHJcbiAgICAgICAgY29udGV4dE5vZGUsXHJcbiAgICAgICAgZG9jcmVmLFxyXG4gICAgICAgIGZ1bmN0aW9uIChlbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGF0cm9wYS5yZW1vdmVOb2RlQnlSZWZlcmVuY2UoZWxlbWVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgKTtcclxuICAgIHJldHVybiBjb3VudDtcclxufTtcclxuLyoqXHJcbiAqIFNlbGVjdHMgbm9kZXMgZnJvbSB0aGUgRE9NIHVzaW5nIGFuIFhwYXRoIGV4cHJlc3Npb24uXHJcbiAqIEBleGFtcGxlXHJcbiAqIDxwcmU+XHJcbiAqICAgLy8gVG8gZ2V0IGFsbCB0aGUgZWxlbWVudHMgaW4gdGhlIGRvY3VtZW50IHdpdGggYSBzcmMgYXR0cmlidXRlOlxyXG4gKiAgIHZhciBzcmNFbGVtZW50cyA9IGF0cm9wYS54cGF0aC5nZXROb2Rlc0J5WHBhdGgoJ1tAc3JjXScpO1xyXG4gKiA8L3ByZT5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwMzEzXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSB4cGF0aEV4cHJlc3Npb24gQW4gWHBhdGggZXhwcmVzc2lvbiBhcyBhIHN0cmluZ1xyXG4gKiBAcGFyYW0ge0RPTSBOb2RlfSBjb250ZXh0Tm9kZSBPcHRpb25hbC4gVGhlIG5vZGUgd2hpY2ggaXMgdG8gc2VydmUgYXMgdGhlIHJvb3RcclxuICogZm9yIHRoZSBzdXBwbGllZCBYcGF0aCBleHByZXNzaW9uLiBEZWZhdWx0cyB0byB0aGUgZG9jdW1lbnQncyByb290IG5vZGUuXHJcbiAqIEBwYXJhbSB7RE9NIERvY3VtZW50fSBkb2NyZWYgT3B0aW9uYWwuIEEgcmVmZXJlbmNlIHRvIHRoZSBkb2N1bWVudCB5b3VcclxuICogYXJlIHNlYXJjaGluZywgZGVmYXVsdHMgdG8gZG9jdW1lbnQuXHJcbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBhbiBhcnJheSB3aG9zZSBlbGVtZW50cyBhcmUgRE9NIE5vZGVzXHJcbiAqIEBzZWUgYXRyb3BhLnhwYXRoLnByb2Nlc3NOb2Rlc0J5WHBhdGggZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqL1xyXG5hdHJvcGEueHBhdGguZ2V0Tm9kZXNCeVhwYXRoID0gZnVuY3Rpb24gZ2V0Tm9kZXNCeVhwYXRoKFxyXG4gICAgeHBhdGhFeHByZXNzaW9uLCBjb250ZXh0Tm9kZSwgZG9jcmVmXHJcbikge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG4gICAgYXRyb3BhLnN1cHBvcnRDaGVjaygneHBhdGgnKTtcclxuICAgIHZhciBlbGVtZW50UmVmZXJlbmNlcztcclxuICAgIGVsZW1lbnRSZWZlcmVuY2VzID0gW107XHJcbiAgICBhdHJvcGEueHBhdGgucHJvY2Vzc05vZGVzQnlYcGF0aChcclxuICAgICAgICB4cGF0aEV4cHJlc3Npb24sXHJcbiAgICAgICAgY29udGV4dE5vZGUsXHJcbiAgICAgICAgZG9jcmVmLFxyXG4gICAgICAgIGZ1bmN0aW9uIChlbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGVsZW1lbnRSZWZlcmVuY2VzLnB1c2goZWxlbWVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgKTtcclxuICAgIHJldHVybiBlbGVtZW50UmVmZXJlbmNlcztcclxufTtcclxuLyoqXHJcbiAqIEVzY2FwZXMgc2luZ2xlIHF1b3RlcyAoYXBvc3Ryb3BlKSBpbiBYcGF0aCBxdWVyaWVzLlxyXG4gKiBAZXhhbXBsZVxyXG4gKiA8cHJlPlxyXG4gKiAgLy8gdGhpcyBpcyB1c2VmdWwgZm9yIHVzaW5nIGFyYml0cmFyeSBzdHJpbmdzIGluIHlvdXIgcXVlcmllcy5cclxuICogIHZhciBhcmJTdHIsIGVzY2FwZWRTdHIsIHhwYXRoRXhwcmVzc2lvbiwgZm91bmROb2RlcztcclxuICogIGFyYlN0ciA9IFwiSmltbXkgYWluJ3QgbmV2ZXIgc2FpZCBcXFwiU2h1clxcXCIgV2h5PyBJIGRvbid0IGtub3chXCI7XHJcbiAqICBlc2NhcGVkU3RyID0gYXRyb3BhLnhwYXRoLmVzY2FwZVF1b3Rlc1hwYXRoKGFyYlN0cik7XHJcbiAqICAvLyBwcm9kdWNlczogY29uY2F0KCdKaW1teSBhaW4nLCBcIidcIiwgJ3QgbmV2ZXIgc2FpZCBcIlNodXJcIiBXaHk/IEkgZG9uJywgXCInXCIsXHJcbiAqICAvLyAndCBrbm93IScpXHJcbiAqICAvLyBpdCBpcyBtdWNoIGVhc2llciB0byBkZWFsIHdpdGggdGhlIHZhcmlhYmxlIG5hbWUgdGhhbiBpdCBpcyB0byBkZWFsIHdpdGhcclxuICogIC8vIGFsbCB0aG9zZSBxdW90ZXMgYW5kIGNvbW1hcyFcclxuICogIHhwYXRoRXhwcmVzc2lvbiA9ICcuLy9wW2NvbnRhaW5zKHRleHQoKSwnICsgZXNjYXBlZFN0ciArICcpXSc7XHJcbiAqICBmb3VuZE5vZGVzID0gYXRyb3BhLnhwYXRoLmdldE5vZGVzQnlYcGF0aCh4cGF0aEV4cHJlc3Npb24pO1xyXG4gKiAgLy8gZm91bmQgbm9kZXMgd2lsbCBjb250YWluIHRoZSBwIGVsZW1lbnRzIHdoZXJlIHRoZSB0ZXh0IHdhcyBtYXRjaGVkLlxyXG4gKiA8L3ByZT5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTIwOTA5XHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmcgQW4gWHBhdGggcXVlcnlcclxuICogQHJldHVybnMge1N0cmluZ30gUmV0dXJucyBhIHN0cmluZyByZXByZXNlbnRpbmcgYSBjb25jYXQgZnVuY3Rpb24gaW4gWHBhdGhcclxuICogd2hpY2ggd2lsbCBlZmZlY3RpdmVseSB3b3JrIGluIGVzY2FwaW5nIHF1b3RlcyBpbiB5b3VyIHhwYXRoIHF1ZXJ5LlxyXG4gKi9cclxuYXRyb3BhLnhwYXRoLmVzY2FwZVF1b3Rlc1hwYXRoID0gZnVuY3Rpb24gZXNjYXBlUXVvdGVzWHBhdGgoc3RyaW5nKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcbiAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvXFwnL2csIFwiJywgXFxcIidcXFwiLCAnXCIpO1xyXG4gICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoL14oLiopJC9nLCBcImNvbmNhdCgnJDEnKVwiKTtcclxuICAgIHJldHVybiBzdHJpbmc7XHJcbn07XHJcblxyXG5cclxuXHJcblxyXG53aGlsZShhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMubGVuZ3RoID4gMCkge1xyXG4gICAgYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLnBvcCgpKCk7XHJcbn1cclxubW9kdWxlLmV4cG9ydHMgPSBhdHJvcGE7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9kb2NzL3ZzZG9jL09wZW5MYXllcnNBbGwuanNcIi8+XHJcbi8qanNsaW50XHJcbiAgICBub2RlIDogdHJ1ZVxyXG4qL1xyXG5cclxudmFyIGF0cm9wYSA9IHJlcXVpcmUoJ2F0cm9wYS1oZWFkZXInKTtcclxuXHJcbmZ1bmN0aW9uIGxpbmtEYXRhKG9iaikge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG4gICAgT2JqZWN0LmtleXMob2JqLmRhdGEpLmZpbHRlcihmdW5jdGlvbiAocHJvcCkge1xyXG4gICAgICAgIHJldHVybiBwcm9wICE9PSAncmVxdWlyZW1lbnRzJztcclxuICAgIH0pLmZvckVhY2goZnVuY3Rpb24gKHByb3ApIHtcclxuICAgICAgICBhdHJvcGEuZGF0YVtwcm9wXSA9IG9iai5kYXRhW3Byb3BdO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbnZhciBBcmdzSW5mbyA9IHJlcXVpcmUoJ2F0cm9wYS1BcmdzSW5mbycpO1xyXG5saW5rRGF0YShBcmdzSW5mbyk7XHJcbmF0cm9wYS5BcmdzSW5mbyA9IEFyZ3NJbmZvLkFyZ3NJbmZvO1xyXG5cclxudmFyIGFycmF5cyA9IHJlcXVpcmUoJ2F0cm9wYS1hcnJheXMnKTtcclxubGlua0RhdGEoYXJyYXlzKTtcclxuYXRyb3BhLmFycmF5cyA9IGFycmF5cy5hcnJheXM7XHJcblxyXG52YXIgQmFiYmxlciA9IHJlcXVpcmUoJ2F0cm9wYS1CYWJibGVyJyk7XHJcbmxpbmtEYXRhKEJhYmJsZXIpO1xyXG5hdHJvcGEuQmFiYmxlciA9IEJhYmJsZXIuQmFiYmxlcjtcclxuXHJcbnZhciBDb29raWVNb25zdGVyID0gcmVxdWlyZSgnYXRyb3BhLUNvb2tpZU1vbnN0ZXInKTtcclxubGlua0RhdGEoQ29va2llTW9uc3Rlcik7XHJcbmF0cm9wYS5Db29raWVNb25zdGVyID0gQ29va2llTW9uc3Rlci5Db29raWVNb25zdGVyO1xyXG5cclxudmFyIENyZWF0ZUh0bWxEb2N1bWVudHNGcm9tWG1saHR0cCA9IHJlcXVpcmUoJ2F0cm9wYS1DcmVhdGVIdG1sRG9jdW1lbnRzRnJvbVhtbGh0dHAnKTtcclxubGlua0RhdGEoQ3JlYXRlSHRtbERvY3VtZW50c0Zyb21YbWxodHRwKTtcclxuYXRyb3BhLkNyZWF0ZUh0bWxEb2N1bWVudHNGcm9tWG1saHR0cCA9IENyZWF0ZUh0bWxEb2N1bWVudHNGcm9tWG1saHR0cC5DcmVhdGVIdG1sRG9jdW1lbnRzRnJvbVhtbGh0dHA7XHJcblxyXG52YXIgY3VzdG9tRXJyb3JzID0gcmVxdWlyZSgnYXRyb3BhLWN1c3RvbUVycm9ycycpO1xyXG5saW5rRGF0YShjdXN0b21FcnJvcnMpO1xyXG5hdHJvcGEuY3VzdG9tRXJyb3JzID0gY3VzdG9tRXJyb3JzLmN1c3RvbUVycm9ycztcclxuXHJcbnZhciBIVE1MUGFyc2VyID0gcmVxdWlyZSgnYXRyb3BhLUhUTUxQYXJzZXInKTtcclxubGlua0RhdGEoSFRNTFBhcnNlcik7XHJcbmF0cm9wYS5IVE1MUGFyc2VyID0gSFRNTFBhcnNlci5IVE1MUGFyc2VyO1xyXG5cclxudmFyIGluamVjdCA9IHJlcXVpcmUoJ2F0cm9wYS1pbmplY3QnKTtcclxubGlua0RhdGEoaW5qZWN0KTtcclxuYXRyb3BhLmluamVjdCA9IGluamVjdC5pbmplY3Q7XHJcblxyXG52YXIgaW5xdWlyZSA9IHJlcXVpcmUoJ2F0cm9wYS1pbnF1aXJlJyk7XHJcbmxpbmtEYXRhKGlucXVpcmUpO1xyXG5hdHJvcGEuaW5xdWlyZSA9IGlucXVpcmUuaW5xdWlyZTtcclxuXHJcbnZhciBvYmplY3RzID0gcmVxdWlyZSgnYXRyb3BhLW9iamVjdHMnKTtcclxubGlua0RhdGEob2JqZWN0cyk7XHJcbmF0cm9wYS5vYmplY3RzID0gb2JqZWN0cy5vYmplY3RzO1xyXG5cclxudmFyIHJhbmRvbSA9IHJlcXVpcmUoJ2F0cm9wYS1yYW5kb20nKTtcclxubGlua0RhdGEocmFuZG9tKTtcclxuYXRyb3BhLnJhbmRvbSA9IHJhbmRvbS5yYW5kb207XHJcblxyXG52YXIgcmVnZXggPSByZXF1aXJlKCdhdHJvcGEtcmVnZXgnKTtcclxubGlua0RhdGEocmVnZXgpO1xyXG5hdHJvcGEucmVnZXggPSByZWdleC5yZWdleDtcclxuXHJcbnZhciByZW1vdmVOb2RlQnlSZWZlcmVuY2UgPSByZXF1aXJlKCdhdHJvcGEtcmVtb3ZlTm9kZUJ5UmVmZXJlbmNlJyk7XHJcbmxpbmtEYXRhKHJlbW92ZU5vZGVCeVJlZmVyZW5jZSk7XHJcbmF0cm9wYS5yZW1vdmVOb2RlQnlSZWZlcmVuY2UgPSByZW1vdmVOb2RlQnlSZWZlcmVuY2UucmVtb3ZlTm9kZUJ5UmVmZXJlbmNlO1xyXG5cclxudmFyIFJlcXVlc3RlciA9IHJlcXVpcmUoJ2F0cm9wYS1SZXF1ZXN0ZXInKTtcclxubGlua0RhdGEoUmVxdWVzdGVyKTtcclxuYXRyb3BhLlJlcXVlc3RlciA9IFJlcXVlc3Rlci5SZXF1ZXN0ZXI7XHJcblxyXG52YXIgU2VyaWFsQWN0b3IgPSByZXF1aXJlKCdhdHJvcGEtU2VyaWFsQWN0b3InKTtcclxubGlua0RhdGEoU2VyaWFsQWN0b3IpO1xyXG5hdHJvcGEuU2VyaWFsQWN0b3IgPSBTZXJpYWxBY3Rvci5TZXJpYWxBY3RvcjtcclxuXHJcbnZhciBzZXRBc09wdGlvbmFsQXJnID0gcmVxdWlyZSgnYXRyb3BhLXNldEFzT3B0aW9uYWxBcmcnKTtcclxubGlua0RhdGEoc2V0QXNPcHRpb25hbEFyZyk7XHJcbmF0cm9wYS5zZXRBc09wdGlvbmFsQXJnID0gc2V0QXNPcHRpb25hbEFyZy5zZXRBc09wdGlvbmFsQXJnO1xyXG5cclxudmFyIHN0cmluZyA9IHJlcXVpcmUoJ2F0cm9wYS1zdHJpbmcnKTtcclxubGlua0RhdGEoc3RyaW5nKTtcclxuYXRyb3BhLnN0cmluZyA9IHN0cmluZy5zdHJpbmc7XHJcblxyXG52YXIgVGV4dEFuYWx5emVyID0gcmVxdWlyZSgnYXRyb3BhLVRleHRBbmFseXplcicpO1xyXG5saW5rRGF0YShUZXh0QW5hbHl6ZXIpO1xyXG5hdHJvcGEuVGV4dEFuYWx5emVyID0gVGV4dEFuYWx5emVyLlRleHRBbmFseXplcjtcclxuXHJcbnZhciB1cmwgPSByZXF1aXJlKCdhdHJvcGEtdXJsJyk7XHJcbmxpbmtEYXRhKHVybCk7XHJcbmF0cm9wYS51cmwgPSB1cmwudXJsO1xyXG5cclxudmFyIHdhaXRGb3IgPSByZXF1aXJlKCdhdHJvcGEtd2FpdEZvcicpO1xyXG5saW5rRGF0YSh3YWl0Rm9yKTtcclxuYXRyb3BhLndhaXRGb3IgPSB3YWl0Rm9yLndhaXRGb3I7XHJcblxyXG52YXIgd3RmID0gcmVxdWlyZSgnYXRyb3BhLXd0ZicpO1xyXG5saW5rRGF0YSh3dGYpO1xyXG5hdHJvcGEud3RmID0gd3RmLnd0ZjtcclxuXHJcbnZhciB4cGF0aCA9IHJlcXVpcmUoJ2F0cm9wYS14cGF0aCcpO1xyXG5saW5rRGF0YSh4cGF0aCk7XHJcbmF0cm9wYS54cGF0aCA9IHhwYXRoLnhwYXRoO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBhdHJvcGE7Il19
