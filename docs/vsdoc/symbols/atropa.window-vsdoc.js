
/* vsdoc for atropa.window */

(function (window) {
    window.atropa = window.atropa || {};

    window.atropa.window = {
        /// <summary></summary>
        /// <returns type="atropa.window"/>
                
        open: function(url, callback, testFn) {
            /// <summary>Opens a new window and fires a callback once the window has loaded.
            ///  Optionally, a test function may be provided to fire the callback.</summary>
            /// <param name="url" type="String">The url to load in the window.</param>
            /// <param name="callback" type="Function">The callback function to execute when
            ///  the window has loaded. This callback will receive one argument,
            ///  a reference to the opened window.</param>
            /// <param name="testFn" type="Function">Optional. An alternate test for windows
            ///  containing too many slow loading external resources. The callback
            ///  will be given a reference to the opened window as its first artument.
            ///  Return something truthy and the callback will fire, return
            ///  something falsy and continue waiting. Your test will be tried
            ///  every 250ms until it returns something truthy.</param>
            /// <returns type="Object">Returns a reference to the opened window.</returns>
        }
        
    };

    var $x = window.atropa.window;
    $x.__namespace = "true";
    $x.__typeName = "atropa.window";
})(this);
