
/* vsdoc for atropa.Babbler */

(function (window) {
    window.atropa = window.atropa || {};

    window.atropa.Babbler = function(wrdCount){
        /// <summary>This class represents a babbler. The babbler
        /// /// produces lorum ipsum text, to user specifications.</summary>
        /// <param name="wrdCount" type="Number">The amount of &quot;words&quot; you would like
        /// the babbler to produce.</param>
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
            /// <summary>Generates a word with a specified length. Lowers the word count by one.</summary>
            /// <param name="stringMin" type="Number">the shortest word, in characters.</param>
            /// <param name="stringMax" type="Number">The longest word, in characters.</param>
            /// <returns type="String">Returns a random string of characters
            /// within the specified range of length.</returns>
        }, 
        
        punctuate: function() {
            /// <summary>Provides random punctuation.</summary>
            /// <returns type="String">Returns a random punctuation
            /// character ( . ! or ? ).</returns>
        }, 
        
        generateSentence: function(sentenceMin, sentenceMax) {
            /// <summary>Generates a sentence of specified length in words. The quantity
            ///  of words in the generated sentence will be between the minimum
            ///  and maximum set, with the maximum capped at the current words
            ///  count. The word count will be lowered by the
            ///  quantity of words in the generated sentence. If the word count
            ///  is 0 then there will be no words in the sentence. If the word
            ///  count is 3 then the maximum possible number of words in the
            ///  sentence will be three.</summary>
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
            /// <returns type="String">Returns the stored babble.</returns>
        }, 
        
        resetBabble: function() {
            /// <summary>Clears the stored babble.</summary>
            /// <returns type="String">Returns the stored babble.</returns>
        }, 
        
        getBabble: function() {
            /// <summary>Gets the last generated babble.</summary>
            /// <returns type="String">Returns the stored babble.</returns>
        }, 
        
        generateBabble: function(wordsCt) {
            /// <summary>Generates babble to a user specified length in words.
            ///  The word count will be zero after this and the stored
            ///  babble will be set to the generated babble.</summary>
            /// <param name="wordsCt" type="Number">The desired word count for the
            /// generated babble.</param>
            /// <returns type="String">Returns babble of specified length in words.</returns>
        }
        
    };

    $x.__class = "true";
    $x.__typeName = "atropa.Babbler";
})(this);
