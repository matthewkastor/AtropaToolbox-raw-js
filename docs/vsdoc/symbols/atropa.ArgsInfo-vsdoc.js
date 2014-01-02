
/* vsdoc for atropa.ArgsInfo */

(function (window) {
    window.atropa = window.atropa || {};

    window.atropa.ArgsInfo = function(){
        /// <summary></summary>
        /// <returns type="atropa.ArgsInfo"/>
    };

    var $x = window.atropa.ArgsInfo;
    $x.prototype = {
                
        setExpectedArgTypes: function(typesObj) {
            /// <summary>Sets the expected argument types.</summary>
            /// <param name="typesObj" type="Expected Arg Types">An object containing information
            ///  about the types of arguments you expect. Specifically, the object should
            ///  look like the example.</param>
        }, 
        
        getArgTypes: function(args) {
            /// <summary>Gets the types of arguments.</summary>
            /// <param name="args" type="arguments">An arguments object, or anything you want to
            /// check the type of.</param>
            /// <returns type="Array">Returns an array of the types of arguments passed in.</returns>
        }, 
        
        checkArgTypes: function(args) {
            /// <summary>Checks the given arguments object against the expected
            /// arguments types.</summary>
            /// <param name="args" type="arguments">An arguments object</param>
            /// <returns type="String">The user assigned key which matches the
            /// arguments supplied, or throws an error.</returns>
        }
        
    };

    $x.__class = "true";
    $x.__typeName = "atropa.ArgsInfo";
})(this);
