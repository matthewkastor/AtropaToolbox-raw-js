
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
            ///  the windows document.readystate === &apos;complete&apos;. This callback will receive
            ///  one argument, a reference to the opened window and will be fired before the
            ///  window navigates to the given url.</param>
            /// <param name="testFn" type="Function">Optional. An alternate test for when you want to
            ///  wait for the window to navigate to the given url before firing the callback.
            ///  The callback will be given a reference to the opened window as its first
            ///  argument. Return something truthy and the callback will fire, return
            ///  something falsy and continue waiting. Your test will be tried
            ///  every 250ms until it returns something truthy.</param>
            /// <returns type="Object">Returns a reference to the opened window.</returns>
        }
        
    };

    var $x = window.atropa.window;
    $x.__namespace = "true";
    $x.__typeName = "atropa.window";
})(this);
