
/* vsdoc for atropa.TextAnalyzer */

(function (window) {
    window.atropa = window.atropa || {};

    window.atropa.TextAnalyzer = function(text){
        /// <summary></summary>
        /// <param name="text" type="String">The text to analyze.</param>
        /// <field name="text" type="String">The supplied text. Defaults to an empty string.</field>
        /// <field name="wordCount" type="Number">Gives the count of words in the text. Defaults to 0.</field>
        /// <field name="words" type="Array">An array of every word in the supplied text.
        ///  Defaults to an empty array.</field>
        /// <returns type="atropa.TextAnalyzer"/>
    };

    var $x = window.atropa.TextAnalyzer;
    $x.prototype = {
                
        getIndex: function() {
            /// <summary>Gets an index of the text.</summary>
            /// <returns type="Array">Returns an array of unique values
            ///  derived from the text given.</returns>
        }, 
        
        getWordFrequency: function() {
            /// <summary>Get the frequency data for each unique word in
            ///  the text.</summary>
            /// <returns type="Object">Returns an object whose keys are
            ///  the unique words from the given text and whose
            ///  values are the count of each words occurrence.</returns>
        }, 
        
        getPhraseFrequency: function(phraseLength) {
            /// <summary>Gets phrases of the specified length from the text.</summary>
            /// <param name="phraseLength" type="Number">The length of the phrases
            ///  to extract from the text. Defaults to 2.</param>
            /// <returns type="Object">Returns an object whose keys are phrases
            ///  and whose values are the number of occurrences of the phrase.</returns>
        }
        
    };

    $x.__class = "true";
    $x.__typeName = "atropa.TextAnalyzer";
})(this);
