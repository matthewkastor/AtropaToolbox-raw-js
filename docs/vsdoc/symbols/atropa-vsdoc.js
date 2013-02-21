
/* vsdoc for atropa */

(function (window) {
    

    window.atropa = {
        /// <summary></summary>
        /// <field name="arrays" type="">Utilities for handling arrays.</field>
        /// <field name="inject" type="">Contains tools for injecting elements and assemblies.
        /// into the page.</field>
        /// <field name="inquire" type="">Container for functions that test the state of inputs.</field>
        /// <field name="objects" type="">Utilities for handling objects.</field>
        /// <field name="random" type="">Provides random strings and numbers.</field>
        /// <field name="regex" type="">Container for regex functions.</field>
        /// <field name="string" type="">A few utilities for manipulating strings.</field>
        /// <field name="url" type="">Utilities for handling urls.</field>
        /// <field name="waitFor" type="">Polling functions for quick and sloppy work.</field>
        /// <field name="window" type="">Container for all window functions and classes.</field>
        /// <field name="wtf" type="">Container for all Glorious WTFifier related functions and such.</field>
        /// <field name="xpath" type="">An Xpath toolkit for manipulating the DOM.</field>
        /// <returns type="atropa"/>
                
        InvalidArgumentTypesError: function(message) {
            /// <summary></summary>
            /// <param name="message" type=""></param>
        }, 
        
        removeNodeByReference: function(elementReference) {
            /// <summary>Removes DOM Nodes.</summary>
            /// <param name="elementReference" type="DOM Node">A reference to the DOM Node you want
            /// to remove.</param>
        }, 
        
        setAsOptionalArg: function(defaultVal, optionalArg) {
            /// <summary>Set default values for optional function parameters.</summary>
            /// <param name="defaultVal" type="Mixed">The default value to set.</param>
            /// <param name="optionalArg" type="Mixed">A reference to the optional argument.</param>
            /// <returns type="Mixed">Returns the default value supplied when the optional
            /// argument is undefined or null. Otherwise, the supplied optional argument
            /// is returned.</returns>
        }
        
    };

    var $x = window.atropa;
    $x.__namespace = "true";
    $x.__typeName = "atropa";
})(this);
