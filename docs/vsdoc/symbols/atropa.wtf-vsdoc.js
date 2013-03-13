
/* vsdoc for atropa.wtf */

(function (window) {
    window.atropa = window.atropa || {};

    window.atropa.wtf = {
        /// <summary></summary>
        /// <field name="dictionary" type="">The Glorious WTFification Dictionary: Turning Shit
        /// Into Polished Turds.</field>
        /// <returns type="atropa.wtf"/>
                
        wtfify: function(target, outputHTML) {
            /// <summary>Accepts plain text input and Gloriously WTFifies it.</summary>
            /// <param name="target" type="String">The text to WTFify.</param>
            /// <param name="outputHTML" type="Boolean">Specifies if you want the output
            ///  in HTML format. If false, will output plain text. Defaults
            ///  to false.</param>
            /// <returns type="String">Returns Genuine WTFified text.</returns>
        }, 
        
        htmlElement: function(elementReference) {
            /// <summary>WTFifies the &lt;code&gt;textContent&lt;/code&gt; or &lt;code&gt;value&lt;/code&gt; of the
            ///  given element and replaces the element&apos;s innerHTML with a pre block
            ///  containing the results of WTFification.</summary>
            /// <param name="elementReference" type="HTMLElement">A reference to an HTML Element.</param>
            /// <returns type="HTMLElement">Returns the given element after wtfification.</returns>
        }
        
    };

    var $x = window.atropa.wtf;
    $x.__namespace = "true";
    $x.__typeName = "atropa.wtf";
})(this);
