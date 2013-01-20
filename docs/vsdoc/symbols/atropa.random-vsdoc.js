
/* vsdoc for atropa.random */

(function (window) {
    window.atropa = window.atropa || {};

    window.atropa.random = {
        /// <summary></summary>
        /// <returns type="atropa.random"/>
                
        string: function(stringLength, characterClass) {
            /// <summary>Gives you a random string whose length and characters you specify.</summary>
            /// <param name="stringLength" type="Number">This is the length of the string.</param>
            /// <param name="characterClass" type="String">May be one of:
            /// numeric, caps, lower, alpha, alphanumeric, punctuation, vowel, constant
            /// This is the type of characters you want
            /// returned to you.</param>
            /// <returns type="String">A random string of specified length and composition.</returns>
        }, 
        
        integer: function(min, max) {
            /// <summary>Generates a random number.</summary>
            /// <param name="min" type="Number">The lowest number you want returned</param>
            /// <param name="max" type="Number">The highest number you want returned</param>
            /// <returns type="Number">A random number within the specified range.</returns>
        }, 
        
        getPropertyName: function(obj) {
            /// <summary></summary>
            /// <param name="obj" type=""></param>
        }, 
        
        getArrayKey: function(arr) {
            /// <summary></summary>
            /// <param name="arr" type=""></param>
        }, 
        
        getArrayValue: function(arr) {
            /// <summary></summary>
            /// <param name="arr" type=""></param>
        }, 
        
        pullArrayElement: function(arr) {
            /// <summary></summary>
            /// <param name="arr" type=""></param>
        }, 
        
        pullProperty: function(obj) {
            /// <summary></summary>
            /// <param name="obj" type=""></param>
        }
        
    };

    var $x = window.atropa.random;
    $x.__namespace = "true";
    $x.__typeName = "atropa.random";
})(this);
