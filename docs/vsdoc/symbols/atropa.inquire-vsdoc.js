
/* vsdoc for atropa.inquire */

(function (window) {
    window.atropa = window.atropa || {};

    window.atropa.inquire = {
        /// <summary></summary>
        /// <returns type="atropa.inquire"/>
                
        isNull: function(x) {
            /// <summary>Checks whether the input is null.</summary>
            /// <param name="x" type="Mixed">Any input that may or may not be null.</param>
            /// <returns type="Boolean">Returns true if x === null.</returns>
        }, 
        
        isObject: function(x) {
            /// <summary>Checks whether the input is an object.</summary>
            /// <param name="x" type="Mixed">Any input that may or may not be an object.</param>
            /// <returns type="Boolean">Returns true if typeof(x) === &apos;object&apos;.</returns>
        }, 
        
        isObjectNotNull: function(x) {
            /// <summary>Checks whether the input is both an object and not null.</summary>
            /// <param name="x" type="Mixed">Any input that may or may not be both an
            /// object and null.</param>
            /// <returns type="Boolean">Returns true if x is both an object and
            /// not null. (null is an object).</returns>
        }, 
        
        hasProperty: function(obj, prop) {
            /// <summary>Checks an object for the existence of a property
            /// regardless of whether the property was inherited
            /// or not.</summary>
            /// <param name="obj" type="Object">An object which may or may not
            /// have the property identified by prop.</param>
            /// <param name="prop" type="String">A string value representing the
            /// name of the property.</param>
            /// <returns type="Boolean">Returns true if obj.prop exists,
            /// otherwise returns false.</returns>
        }, 
        
        isEmptyString: function(str) {
            /// <summary>Checks whether the input is an empty string.</summary>
            /// <param name="str" type="String">The string you want to know about</param>
            /// <returns type="Boolean">Returns true if str is an empty string,
            ///  otherwise returns false.</returns>
        }
        
    };

    var $x = window.atropa.inquire;
    $x.__namespace = "true";
    $x.__typeName = "atropa.inquire";
})(this);
