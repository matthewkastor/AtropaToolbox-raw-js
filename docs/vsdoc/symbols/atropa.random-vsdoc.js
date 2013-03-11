
/* vsdoc for atropa.random */

(function (window) {
    window.atropa = window.atropa || {};

    window.atropa.random = {
        /// <summary></summary>
        /// <returns type="atropa.random"/>
                
        string: function(stringLength, characterClass) {
            /// <summary>Gives you a random string whose length and characters you specify.</summary>
            /// <param name="stringLength" type="Number">This is the length of the string.</param>
            /// <param name="characterClass" type="String">Optional. May be one of:
            ///  numeric, caps, lower, alpha, alphanumeric, punctuation, vowel, consonant
            ///  This is the type of characters you want returned to you. Defaults to
            ///  alphanumeric.</param>
            /// <returns type="String">A random string of specified length and composition.</returns>
        }, 
        
        integer: function(min, max) {
            /// <summary>Generates a random number between the specified min and max value.</summary>
            /// <param name="min" type="Number">The lowest number you want returned</param>
            /// <param name="max" type="Number">The highest number you want returned</param>
            /// <returns type="Number">A random number within the specified range.</returns>
        }, 
        
        getPropertyName: function(obj) {
            /// <summary>Get a random property name from the given object.</summary>
            /// <param name="obj" type="Object">The object to select a random
            ///  property name from.</param>
            /// <returns type="String">A random property name from the
            ///  given object.</returns>
        }, 
        
        getArrayKey: function(arr) {
            /// <summary>Get a random key from the given array.</summary>
            /// <param name="arr" type="Array">The array to select a random
            ///  key from. The keys of the array must be contiguous.</param>
            /// <returns type="Number">A random integer between 0 and
            ///  &lt;code&gt;arr.length&lt;/code&gt;</returns>
        }, 
        
        getArrayValue: function(arr) {
            /// <summary>Get a random value from the given array.</summary>
            /// <param name="arr" type="Array">The array to select a random
            ///  value from. The keys of the array must be contiguous.</param>
            /// <returns type="Mixed">A random value from the given array.</returns>
        }, 
        
        pullArrayElement: function(arr) {
            /// <summary>Remove a random element from the given array.</summary>
            /// <param name="arr" type="Array">The array to remove a random
            ///  element from. The keys of the array must be contiguous.</param>
            /// <returns type="Mixed">A random value from the given array.</returns>
        }, 
        
        pullProperty: function(obj) {
            /// <summary>Remove a random property from the given object.</summary>
            /// <param name="obj" type="Object">The object to remove a random
            ///  property from.</param>
            /// <returns type="Mixed">A random value from the given object.</returns>
        }
        
    };

    var $x = window.atropa.random;
    $x.__namespace = "true";
    $x.__typeName = "atropa.random";
})(this);
