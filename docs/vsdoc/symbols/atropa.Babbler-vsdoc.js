
/* vsdoc for atropa.Babbler */

(function (window) {
    window.atropa = window.atropa || {};

    window.atropa.Babbler = function(wrdCount){
        /// <summary></summary>
        /// <param name="wrdCount" type="Number">The amount of &quot;words&quot; you would like
        /// the babbler to produce.</param>
        /// <returns type="atropa.Babbler"/>
    };

    var $x = window.atropa.Babbler;
    $x.prototype = {
                
        setWordCount: function(wrdCount) {
            /// <summary>Sets the word count.</summary>
            /// <param name="wrdCount" type="Number">The amount of &quot;words&quot; which you want the
            /// babbler to produce.</param>
            /// <returns type="Number">Returns the set word count for this babbler.</returns>
        }, 
        
        resetWordCount: function(wordCount) {
            /// <summary>Resets the word count for this babbler.</summary>
            /// <param name="wordCount" type="Number">The amount of &quot;words&quot; you would like
            /// to set for this babbler.</param>
            /// <returns type="Number">Returns the set word count for this babbler.</returns>
        }, 
        
        getWordCount: function() {
            /// <summary>Gets the current word count.</summary>
            /// <returns type="Number">Returns the word count for this babbler.</returns>
        }, 
        
        generateWord: function(stringMin, stringMax) {
            /// <summary>Generates a word with a specified length.</summary>
            /// <param name="stringMin" type="Number">the shortest word, in characters.</param>
            /// <param name="stringMax" type="Number">The longest word, in characters.</param>
            /// <returns type="String">Returns a random string of characters
            /// within the specified range of length.</returns>
        }, 
        
        punctuate: function() {
            /// <summary>Adds punctuation to the babble.</summary>
            /// <returns type="String">Returns a random punctuation
            /// character ( . ! or ? ).</returns>
        }, 
        
        generateSentence: function(sentenceMin, sentenceMax) {
            /// <summary>Generates a sentence of specified length in words.</summary>
            /// <param name="sentenceMin" type="Number">The shortest sentence, in words,
            /// you would like returned.</param>
            /// <param name="sentenceMax" type="Number">The longest sentence, in words,
            /// you would like returned.</param>
            /// <returns type="String">Returns a &quot;sentence&quot; within the specified
            /// range of length.</returns>
        }, 
        
        setBabble: function(babbleString) {
            /// <summary>Sets the babble.</summary>
            /// <param name="babbleString" type="String">Specified babble to set.</param>
            /// <returns type="String">Returns Babble.</returns>
        }, 
        
        resetBabble: function() {
            /// <summary>Resets the babble.</summary>
            /// <returns type="String">Returns an empty string.</returns>
        }, 
        
        getBabble: function() {
            /// <summary>Gets the babble.</summary>
            /// <returns type="String">Returns Babble.</returns>
        }, 
        
        generateBabble: function(wordsCt) {
            /// <summary>Generates babble to a user specified length in words.</summary>
            /// <param name="wordsCt" type="Number">The desired word count for the
            /// generated babble.</param>
            /// <returns type="String">Returns babble of specified length in words.</returns>
        }
        
    };

    $x.__class = "true";
    $x.__typeName = "atropa.Babbler";
})(this);
