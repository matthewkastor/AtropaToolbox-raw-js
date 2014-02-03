
/* vsdoc for atropa.string */

(function (window) {
    window.atropa = window.atropa || {};

    window.atropa.string = {
        /// <summary>A few utilities for manipulating strings.</summary>
        /// <returns type="atropa.string"/>
                
        removeRepeatedWord: function(string) {
            /// <summary>Replaces repeated words and phrases with a single word or phrase.</summary>
            /// <param name="string" type="String">The string to remove repeated words from.</param>
            /// <returns type="String">Returns the given string with repeated words and
            ///  phrases removed.</returns>
        }, 
        
        lineBreaksToParagraphTags: function(string) {
            /// <summary>Creates paragraph breaks at every occurrence of two consecutive line breaks.</summary>
            /// <param name="string" type="String">The string to insert paragraph tags into.</param>
            /// <returns type="String">Returns the given string with paragraph breaks inserted.</returns>
        }, 
        
        lineBreaksToBreakTags: function(string) {
            /// <summary>Creates break tags at every line break.</summary>
            /// <param name="string" type="String">The string to insert break tags into.</param>
            /// <returns type="String">Returns the given string with break tags inserted.</returns>
        }, 
        
        normalizeEol: function(string) {
            /// <summary>Normalizes line breaks to `\n`.</summary>
            /// <param name="string" type="String">The string to normalize.</param>
            /// <returns type="String">Returns the given string with normalized line breaks.</returns>
        }, 
        
        ucFirst: function(string) {
            /// <summary>Converts the first character of a given string to
            /// uppercase.</summary>
            /// <param name="string" type="String">The string for which you want the
            /// first letter to be in upper case.</param>
            /// <returns type="String">The given string with it&apos;s first letter capitalized.</returns>
        }, 
        
        camelize: function(string) {
            /// <summary>Converts the given string to camel case.</summary>
            /// <param name="string" type="String">The string to camelize.</param>
            /// <returns type="String">The camelized string.</returns>
        }, 
        
        countWords: function(someText) {
            /// <summary>Counts words.</summary>
            /// <param name="someText" type="String">Plain text.</param>
            /// <returns type="Number">Returns the count of words in someText.</returns>
        }, 
        
        convertEol: function(text, newEOL) {
            /// <summary>Converts end of line markers into whatever you want. 
            /// Automatically detects any of \r\n, \n, or \r and 
            /// replaces it with the user specified EOL marker.</summary>
            /// <param name="text" type="String">The text you want processed.</param>
            /// <param name="newEOL" type="String">The replacement for the current EOL marks.</param>
            /// <returns type="String">Returns the processed text.</returns>
        }, 
        
        offsetWhiteSpace: function(text, offset) {
            /// <summary>Removes a quantity of leading spaces specified by offset.</summary>
            /// <param name="text" type="String">The text to process.</param>
            /// <param name="offset" type="Number">The amount of spaces you want removed 
            /// from the beginning of the text.</param>
            /// <returns type="">Returns the processed text.</returns>
        }, 
        
        normalizeWhiteSpacePrefix: function(text) {
            /// <summary>Converts all tabs in leading whitespace into four spaces.</summary>
            /// <param name="text" type="String">The text to process</param>
            /// <returns type="String">Returns the processed text.</returns>
        }, 
        
        normalizeWhiteSpace: function(text) {
            /// <summary>Converts all tabs into four spaces.</summary>
            /// <param name="text" type="String">The text to process</param>
            /// <returns type="String">Returns the processed text.</returns>
        }, 
        
        getOffset: function(text) {
            /// <summary>Counts the number of leading space or tab characters but not both.</summary>
            /// <param name="text" type="String">The text to analyze.</param>
            /// <returns type="Number">Returns the quantity of leading spaces or tabs.</returns>
        }, 
        
        getWords: function(text) {
            /// <summary>Breaks a string into an array of words.</summary>
            /// <param name="text" type="String">The text to analyze.</param>
            /// <returns type="Array">Returns an array of the words in
            ///  the given text.</returns>
        }, 
        
        escapeCdata: function(text) {
            /// <summary>Escapes &lt;code&gt;CDATA&lt;/code&gt; sections in text
            ///  so that the text may be embedded into a 
            ///  &lt;code&gt;CDATA&lt;/code&gt; section. This should be run
            ///  on any text which may contain the string 
            ///  &lt;code&gt;]]>&lt;/code&gt; since said string will effectively
            ///  end the &lt;code&gt;CDATA&lt;/code&gt; section prematurely.</summary>
            /// <param name="text" type="String">The text containing 
            ///  &lt;code&gt;CDATA&lt;/code&gt; sections to escape.</param>
            /// <returns type="Array">Returns a string with escaped
            ///  &lt;code&gt;CDATA&lt;/code&gt; sections.</returns>
        }
        
    };

    var $x = window.atropa.string;
    $x.__namespace = "true";
    $x.__typeName = "atropa.string";
})(this);
