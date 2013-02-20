
/* vsdoc for atropa.Requester */

(function (window) {
    window.atropa = window.atropa || {};

    window.atropa.Requester = function(){
        /// <summary></summary>
        /// <field name="expArgTypes" type="Expected Arg Types">Container object for the expected argument types
        /// supplied to this.makeRequest.</field>
        /// <field name="requestHeaders" type="Request Headers Object">Object whose properties and values are header names and values respectively.</field>
        /// <field name="timeout" type="">Set the timeout value for the request.</field>
        /// <field name="request" type="XMLHttpRequest">XMLHttpRequest object used by Requester.</field>
        /// <returns type="atropa.Requester"/>
    };

    var $x = window.atropa.Requester;
    $x.prototype = {
                
        checkRequest: function(args) {
            /// <summary>Used to check the arguments types supplied to this.makeRequest.</summary>
            /// <param name="args" type="Arguments">An arguments array</param>
            /// <returns type="Boolean">Returns true if args types match the
            /// expected types.</returns>
        }, 
        
        makeRequest: function(method, url, messageBody, callback) {
            /// <summary>Makes an AJAX request.</summary>
            /// <param name="method" type="String">The HTTP method to be used for this request.</param>
            /// <param name="url" type="String">The URL to send the request to.</param>
            /// <param name="messageBody" type="String">The body of the request.</param>
            /// <param name="callback" type="Object">The callback function to execute
            ///  when readyState is 4. The callback is supplied with two arguments. The
            ///  first argument is a boolean indicating whether or not the http status was 200.
            ///  The second argument is the request object.</param>
        }
        
    };

    $x.__class = "true";
    $x.__typeName = "atropa.Requester";
})(this);
