
/* vsdoc for atropa.SerialActor */

(function (window) {
    window.atropa = window.atropa || {};

    window.atropa.SerialActor = function(actorName, actorFunction){
        /// <summary></summary>
        /// <param name="actorName" type="String">The name for the SerialActor instance.</param>
        /// <param name="actorFunction" type="Function">The function to execute when the
        ///  actor is free.</param>
        /// <field name="name" type="String">The name of this instance. Defaults to &quot;SerialActor&quot;</field>
        /// <field name="interval" type="Number">Polling interval in milliseconds. This determines how frequently the actor function will
        ///  try to execute. Defaults to 100 milliseconds.</field>
        /// <field name="intervalId" type="Number">The id of the interval set to poll the actor. You should not change
        ///  this manually, use the start and stop functions instead. Defauls to undefined.</field>
        /// <field name="blocked" type="Boolean">The state of the SerialActor. If true, the actor will sleep. If false the actor
        ///  will execute the actor function when next polled. Defaults to false.</field>
        /// <field name="timeouts" type="Array">Stores id&apos;s of currently running timeout functions used to free the actor
        ///  if it has been blocked for too long.</field>
        /// <field name="blockTimeoutValue" type="Number">The maximum time, in milliseconds, which the actor may be blocked for.
        ///  After this duration has been reached the actor will be freed. Defaults to 60 seconds.</field>
        /// <field name="actorFunction" type="Function">The function to execute when the actor is free. Defaults to the &lt;code&gt;dummyActor&lt;/code&gt;
        ///  function defined above.</field>
        /// <returns type="atropa.SerialActor"/>
    };

    var $x = window.atropa.SerialActor;
    $x.prototype = {
                
        dummyActor: function() {
            /// <summary>Default actorFunction</summary>
        }, 
        
        action: function() {
            /// <summary>The action function is called when the actor is polled and it&apos;s blocked state is false.
            ///  This method should not be set manually, set the &lt;code&gt;actorFunction&lt;/code&gt; instead.</summary>
        }, 
        
        block: function() {
            /// <summary>Prevents the actor from executing it&apos;s actorFunction.
            ///  This block will timeout once the &lt;code&gt;blockTimeoutValue&lt;/code&gt; has been reached.</summary>
        }, 
        
        blockTimeout: function() {
            /// <summary>Called when the &lt;code&gt;blockTimeoutValue&lt;/code&gt; has been reached. This frees the actor
            ///  and removes the timeout reference from the timeouts array.</summary>
        }, 
        
        free: function() {
            /// <summary>Frees the actor so it may execute its actor function when next polled.</summary>
        }, 
        
        start: function(interval) {
            /// <summary>Starts polling the actor.</summary>
            /// <param name="interval" type="Number">Optional. The polling interval. Defaults to the value
            ///  of &lt;code&gt;this.interval&lt;/code&gt;</param>
        }, 
        
        changeInterval: function(interval) {
            /// <summary>Adjusts the polling interval after &lt;code&gt;start&lt;/code&gt; has
            /// been called.</summary>
            /// <param name="interval" type="Number">The new polling interval in milliseconds.</param>
        }, 
        
        stop: function() {
            /// <summary>Stops polling the actor. Note that the actor will be freed once the
            ///  &lt;code&gt;blockTimeoutValue&lt;/code&gt; has been reached. This will not restart the polling.</summary>
        }
        
    };

    $x.__class = "true";
    $x.__typeName = "atropa.SerialActor";
})(this);
