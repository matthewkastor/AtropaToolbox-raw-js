
/* vsdoc for atropa.arrays */

(function (window) {
    window.atropa = window.atropa || {};

    window.atropa.arrays = {
        /// <summary></summary>
        /// <returns type="atropa.arrays"/>
                
        match: function(array1, array2) {
            /// <summary>Compares two arrays based on size and contents.</summary>
            /// <param name="array1" type="Array">One array you want compared to another.</param>
            /// <param name="array2" type="Array">The other array.</param>
            /// <returns type="Boolean">Returns true or false depending on
            /// whether or not the arrays matched in size and composition.</returns>
        }, 
        
        subtract: function(a, fromB) {
            /// <summary>Subtracts one array of scalar values from another array of scalar values.</summary>
            /// <param name="a" type="Array">The array to subtract.</param>
            /// <param name="fromB" type="Array">The array with elements duplicated in &lt;code&gt;a&lt;/code&gt;</param>
            /// <returns type="Array">Returns a new array containing only the unique
            ///  values found in the largeArray.</returns>
        }, 
        
        intersect: function(array1, array2) {
            /// <summary></summary>
            /// <param name="array1" type=""></param>
            /// <param name="array2" type=""></param>
        }, 
        
        getFrequency: function(arr) {
            /// <summary>Calculates the frequency of items occurring in an array.</summary>
            /// <param name="arr" type="Array">The array to calculate frequencies from.</param>
            /// <returns type="Object">Returns an object whose keys are each unique
            ///  elements from the array and their value is their frequency of
            ///  occurrence within the array.</returns>
        }, 
        
        getUnique: function(largeArray) {
            /// <summary>Gets Unique values from an array.</summary>
            /// <param name="largeArray" type="Array">The array with duplicate values in it.</param>
            /// <returns type="Array">Returns a new array containing only the unique
            ///  values found in the largeArray.</returns>
        }, 
        
        removeEmptyElements: function(arrayWithEmptyElements) {
            /// <summary>Removes empty strings from the given array.</summary>
            /// <param name="arrayWithEmptyElements" type="Array">The array with empty strings in it.</param>
            /// <returns type="Array">Returns a new array with empty strings removed.</returns>
        }, 
        
        reindex: function(arr) {
            /// <summary>Reindexes an array.</summary>
            /// <param name="arr" type="Array">The array with discontinuous keys.</param>
            /// <returns type="Array">Returns an array with continuous keys.</returns>
        }, 
        
        sortNumerically: function(arr) {
            /// <summary>Sorts an array&apos;s elements numerically.</summary>
            /// <param name="arr" type="Array">The array to sort. All elements of the array must be number-ish.</param>
            /// <returns type="Array">Returns an array whose elements are in numeric order.</returns>
        }, 
        
        sortAlphabetically: function(arr) {
            /// <summary>Sorts an array&apos;s elements lexicographically.</summary>
            /// <param name="arr" type="Array">The array to sort. All elements of the array must be strings.</param>
            /// <returns type="Array">Returns an array whose elements are in alphabetic order.</returns>
        }
        
    };

    var $x = window.atropa.arrays;
    $x.__namespace = "true";
    $x.__typeName = "atropa.arrays";
})(this);