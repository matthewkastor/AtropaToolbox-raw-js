
/* vsdoc for atropa.wtf */

(function (window) {
    window.atropa = window.atropa || {};

    window.atropa.wtf = {
        /// <summary></summary>
        /// <field name="dictionary" type="">The Glorious WTFification Dictionary: Turning Shit
        /// Into Polished Turds.</field>
        /// <returns type="atropa.wtf"/>
                
        wtfify: function(target, isHTML) {
            /// <summary>Accepts plain text input and Gloriously WTFifies it.</summary>
            /// <param name="target" type="String">The text to WTFify.</param>
            /// <param name="isHTML" type=""></param>
            /// <returns type="String">Returns Genuine WTFified text.</returns>
        }, 
        
        htmlElement: function(elementReference) {
            /// <summary>WTFifies the &lt;code&gt;textContent&lt;/code&gt; or &lt;code&gt;value&lt;/code&gt; of the
            ///  given element and replaces the element with a pre block
            ///  containing the results of WTFification.</summary>
            /// <param name="elementReference" type="HTMLElement">A reference to an HTML Element.</param>
        }
        
    };

    var $x = window.atropa.wtf;
    $x.__namespace = "true";
    $x.__typeName = "atropa.wtf";
})(this);
