
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
            /// <param name="callback" type="Function">The callback function to execute.</param>
            /// <param name="testFn" type="Function">An optional alternate test for windows
            ///  containing too many slow loading external resources. If the
            ///  content you&apos;re trying to manipulate is present in the page
            ///  then you may as well get right to work on it. Return something
            ///  truthy and the callback will fire, return something falsy and
            ///  continue waiting. Your test will be tried every 250ms until it
            ///  returns something truthy.</param>
        }
        
    };

    var $x = window.atropa.window;
    $x.__namespace = "true";
    $x.__typeName = "atropa.window";
})(this);
