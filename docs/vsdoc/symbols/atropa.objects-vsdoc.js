
/* vsdoc for atropa.objects */

(function (window) {
    window.atropa = window.atropa || {};

    window.atropa.objects = {
        /// <summary></summary>
        /// <returns type="atropa.objects"/>
                
        convertObjectToArray: function(obj) {
            /// <summary>Converts an object into an array of arrays to make it possible to sort and enumerate properties reliably.</summary>
            /// <param name="obj" type="Object">An object.</param>
            /// <returns type="Array">Returns an array of arrays where each
            ///  nested array will have the object&apos;s key stored in element 0 and
            ///  the value stored in element 1. The reason an array of arrays is
            ///  returned is because JavaScript does not guarantee the order of
            ///  properties on an object so there is no relizble way to sort
            ///  an objects keys or values.</returns>
        }, 
        
        sort: function(obj, sortFn) {
            /// <summary>Converts an object into an array of arrays and allows for reliable sorting and enumeration.</summary>
            /// <param name="obj" type="Object">An object.</param>
            /// <param name="sortFn" type="Function">Optional. The sorting function. This function will
            ///  be given two arguments. Compare the two arguments and return:
            ///  0 if they are equal, greater than zero if the first argument
            ///  is greater than the second, or less than zero if the second
            ///  argument is greater than the first. If the sorting function
            ///  is not given, the array will be sorted lexographically by
            ///  each elements &lt;code&gt;toString&lt;/code&gt; value.</param>
            /// <returns type="Array">Returns an array of arrays where each
            ///  nested array will have the objects key stored in element 0 and
            ///  the value stored in element 1. The reason an array of arrays is
            ///  returned is because JavaScript does not guarantee the order of
            ///  properties on an object so there is no relizble way to sort
            ///  an objects keys or values.</returns>
        }, 
        
        sortValues: function(obj, sortFn) {
            /// <summary>Sorts an object by its values using a user defined algorithm.</summary>
            /// <param name="obj" type="Object">An object.</param>
            /// <param name="sortFn" type="Function">The sorting function. This function will
            ///  be given two arguments. Compare the two arguments and return:
            ///  0 if they are equal, greater than zero if the first argument
            ///  is greater than the second, or less than zero if the second
            ///  argument is greater than the first.</param>
            /// <returns type="Array">Returns an array of arrays where each
            ///  nested array will have the objects key stored in element 0 and
            ///  the value stored in element 1.</returns>
        }, 
        
        sortProperties: function(obj, sortFn) {
            /// <summary>Sorts an object by its properties using a user defined algorithm.</summary>
            /// <param name="obj" type="Object">An object.</param>
            /// <param name="sortFn" type="Function">The sorting function. This function will
            ///  be given two arguments. Compare the two arguments and return:
            ///  0 if they are equal, greater than zero if the first argument
            ///  is greater than the second, or less than zero if the second
            ///  argument is greater than the first.</param>
            /// <returns type="Array">Returns an array of arrays where each
            ///  nested array will have the objects key stored in element 0 and
            ///  the value stored in element 1.</returns>
        }, 
        
        sortValuesNumerically: function(obj) {
            /// <summary>Sorts an object by its values numerically.</summary>
            /// <param name="obj" type="Object">A simple object where the properties
            ///  all have numeric-ish values.</param>
            /// <returns type="Array">Returns an array of arrays where each
            ///  nested array will have the objects key stored in element 0 and
            ///  the value stored in element 1.</returns>
        }, 
        
        sortValuesAlphabetically: function(obj) {
            /// <summary>Sorts an object by its values lexicographically.</summary>
            /// <param name="obj" type="Object">A simple object where the properties
            ///  all have string values.</param>
            /// <returns type="Array">Returns an array of arrays where each
            ///  nested array will have the objects key stored in element 0 and
            ///  the value stored in element 1.</returns>
        }, 
        
        sortPropertiesNumerically: function(obj) {
            /// <summary>Sorts an object by its properties numerically.</summary>
            /// <param name="obj" type="Object">A simple object where the properties
            ///  all have numeric-ish values.</param>
            /// <returns type="Array">Returns an array of arrays where each
            ///  nested array will have the objects key stored in element 0 and
            ///  the value stored in element 1.</returns>
        }, 
        
        sortPropertiesAlphabetically: function(obj) {
            /// <summary>Sorts an object by its properties lexicographically.</summary>
            /// <param name="obj" type="Object">A simple object where the properties
            ///  all have string values.</param>
            /// <returns type="Array">Returns an array of arrays where each
            ///  nested array will have the objects key stored in element 0 and
            ///  the value stored in element 1.</returns>
        }
        
    };

    var $x = window.atropa.objects;
    $x.__namespace = "true";
    $x.__typeName = "atropa.objects";
})(this);
