
/* vsdoc for atropa.customErrors.InvalidArgumentTypesError */

(function (window) {
    window.atropa.customErrors = window.atropa.customErrors || {};

    window.atropa.customErrors.InvalidArgumentTypesError = function(message){
        /// <summary>Invalid Argument Types Error</summary>
        /// <param name="message" type="String">Optional. The error message to send. Defaults to
        ///  &lt;code&gt;InvalidArgumentTypesError&lt;/code&gt;</param>
        /// <field name="name" type="">The name of the error. Tells the user what kind of custom
        /// error has been thrown.</field>
        name : {}, 
        /// <field name="message" type="">The error message to send.</field>
        message : {}
    };

    var $x = window.atropa.customErrors.InvalidArgumentTypesError;
    $x.prototype = {
                
    };

    $x.__class = "true";
    $x.__typeName = "atropa.customErrors.InvalidArgumentTypesError";
})(this);
