
/* vsdoc for atropa.regex.patterns */

(function (window) {
    window.atropa.regex = window.atropa.regex || {};

    window.atropa.regex.patterns = {
        /// <summary>Regex patterns</summary>
        /// <returns type="atropa.regex.patterns"/>
      
        /// <field name="repeatedWords" type="RegExp">finds repeated words and phrases</field>
        repeatedWords : new RegExp(), 
      
        /// <field name="paragraphBreaks" type="RegExp">finds paragraph breaks</field>
        paragraphBreaks : new RegExp(), 
      
        /// <field name="lineBreaks" type="RegExp">finds line breaks</field>
        lineBreaks : new RegExp()
                
    };

    var $x = window.atropa.regex.patterns;
    $x.__namespace = "true";
    $x.__typeName = "atropa.regex.patterns";
})(this);
