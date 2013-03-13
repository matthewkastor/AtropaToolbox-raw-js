
/* vsdoc for atropa */

(function (window) {
    

    window.atropa = {
        /// <summary></summary>
        /// <field name="data" type="">Container for gobal data related to the classes and functions.</field>
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
                
        supportCheck: function(className, errorMessage) {
            /// <summary>Checks whether this class has been marked as unsupported and throws an 
            ///  error if it has.</summary>
            /// <param name="className" type="String">The name of the class.</param>
            /// <param name="errorMessage" type="String">Optional. A custom error message. Defaults to
            ///  atropa.data[className].error</param>
        }, 
        
        requires: function(className, requirementFn, errorMessage) {
            /// <summary>Pushes a requirement check into atropa.data.requirements. The test
            ///  tests whether the class is supported in this environment. Sets
            ///  atropa.data[className]&apos;s support to unsupported and error to errorMessage
            ///  if the requirementFn returns false. The requirement checks will all be run
            ///  after the library has loaded.</summary>
            /// <param name="className" type="String">The name of the class.</param>
            /// <param name="requirementFn" type="Function">A function to test whether or not the class
            ///  is supported in this environment. If supported, returns true otherwise
            ///  return false.</param>
            /// <param name="errorMessage" type="String">The error message to use when this class or its
            ///  methods are called in unsupported environments. Defaults to:
            ///  &apos;The atropa.&apos; + className + &apos; class is unsupported in this environment.&apos;;</param>
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
