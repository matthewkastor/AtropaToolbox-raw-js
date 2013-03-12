
  
/* vsdoc for _global_ */

(function (window) {
    

    window._global_ = {
        /// <summary></summary>
        /// <returns type="_global_"/>
                
        requirementFn: function() {
            /// <summary></summary>
        }
        
    };

    var $x = window._global_;
    $x.__namespace = "true";
    $x.__typeName = "_global_";
})(this);

  

  
/* vsdoc for atropa */

(function (window) {
    

    window.atropa = {
        /// <summary></summary>
        /// <field name="data" type="">Container for gobal data related to the classes and functions.</field>
        /// <field name="arrays" type="">Utilities for handling arrays.</field>
        /// <field name="inject" type="">Contains tools for injecting elements and assemblies.
        /// into the page.</field>
        /// <field name="inquire" type="">Container for functions that test the state of inputs.</field>
        /// <field name="objects" type="">Utilities for handling objects.</field>
        /// <field name="random" type="">Provides random strings and numbers.</field>
        /// <field name="regex" type="">Container for regex functions.</field>
        /// <field name="string" type="">A few utilities for manipulating strings.</field>
        /// <field name="url" type="">Utilities for handling urls.</field>
        /// <field name="waitFor" type="">Polling functions for quick and sloppy work.</field>
        /// <field name="window" type="">Container for all window functions and classes.</field>
        /// <field name="wtf" type="">Container for all Glorious WTFifier related functions and such.</field>
        /// <field name="xpath" type="">An Xpath toolkit for manipulating the DOM.</field>
        /// <returns type="atropa"/>
                
        supportCheck: function(className, errorMessage) {
            /// <summary>Checks whether this class has been marked as unsupported and throws an 
            ///  error if it has.</summary>
            /// <param name="className" type="String">The name of the class.</param>
            /// <param name="errorMessage" type="String">Optional. A custom error message. Defaults to
            ///  atropa.data[className].error</param>
        }, 
        
        requires: function(className, requirementFn, errorMessage) {
            /// <summary>Tests whether the class is supported in this environment. Sets
            ///  atropa.data[className]&apos;s support to unsupported and error to errorMessage
            ///  if the requirementFn returns false.</summary>
            /// <param name="className" type="String">The name of the class.</param>
            /// <param name="requirementFn" type="Function">A function to test whether or not the class
            ///  is supported in this environment. If supported, returns true otherwise
            ///  return false.</param>
            /// <param name="errorMessage" type="String">The error message to use when this class or its
            ///  methods are called in unsupported environments. Defaults to:
            ///  &apos;The atropa.&apos; + className + &apos; class is unsupported in this environment.&apos;;</param>
        }, 
        
        removeNodeByReference: function(elementReference) {
            /// <summary>Removes DOM Nodes.</summary>
            /// <param name="elementReference" type="DOM Node">A reference to the DOM Node you want
            /// to remove.</param>
        }, 
        
        setAsOptionalArg: function(defaultVal, optionalArg) {
            /// <summary>Set default values for optional function parameters.</summary>
            /// <param name="defaultVal" type="Mixed">The default value to set.</param>
            /// <param name="optionalArg" type="Mixed">A reference to the optional argument.</param>
            /// <returns type="Mixed">Returns the default value supplied when the optional
            /// argument is undefined or null. Otherwise, the supplied optional argument
            /// is returned.</returns>
        }
        
    };

    var $x = window.atropa;
    $x.__namespace = "true";
    $x.__typeName = "atropa";
})(this);

  

  
  
/* vsdoc for atropa.ArgsInfo */

(function (window) {
    window.atropa = window.atropa || {};

    window.atropa.ArgsInfo = function(){
        /// <summary></summary>
        /// <field name="that" type="This">Holds the proper reference to &lt;code&gt;this&lt;/code&gt;
        /// for private functions.</field>
        /// <field name="expectedArgTypes" type="Expected Arg Types">Holds the expected argument types object.</field>
        /// <returns type="atropa.ArgsInfo"/>
    };

    var $x = window.atropa.ArgsInfo;
    $x.prototype = {
                
        setExpectedArgTypes: function(typesObj) {
            /// <summary>Sets the expected argument types.</summary>
            /// <param name="typesObj" type="Expected Arg Types">An object containing information
            ///  about the types of arguments you expect. Specifically, the object should
            ///  look like the example.</param>
        }, 
        
        getArgTypes: function(args) {
            /// <summary>Gets the types of arguments.</summary>
            /// <param name="args" type="arguments">An arguments object, or anything you want to
            /// check the type of.</param>
            /// <returns type="Array">Returns an array of the types of arguments passed in.</returns>
        }, 
        
        checkArgs: function(expectedTypesArray, args) {
            /// <summary>Compares the expected arguments types to the
            /// received arguments types.</summary>
            /// <param name="expectedTypesArray" type="Array">An array taken from the user
            /// created argument types object.</param>
            /// <param name="args" type="arguments">an arguments object.</param>
            /// <returns type="Boolean">Returns true if the expected types match for type
            ///  and are in the same order as the received types.</returns>
        }, 
        
        checkArgTypes: function(args) {
            /// <summary>Checks the given arguments object against the expected
            /// arguments types.</summary>
            /// <param name="args" type="arguments">An arguments object</param>
            /// <returns type="String">The user assigned key which matches the
            /// arguments supplied, or throws an error.</returns>
        }
        
    };

    $x.__class = "true";
    $x.__typeName = "atropa.ArgsInfo";
})(this);


  
/* vsdoc for atropa.arrays */

(function (window) {
    window.atropa = window.atropa || {};

    window.atropa.arrays = {
        /// <summary></summary>
        /// <returns type="atropa.arrays"/>
                
        match: function(array1, array2) {
            /// <summary>Compares two arrays based on size, contents, and element order.</summary>
            /// <param name="array1" type="Array">One array you want compared to another.</param>
            /// <param name="array2" type="Array">The other array.</param>
            /// <returns type="Boolean">Returns true or false depending on
            ///  whether or not the arrays matched in size, composition, and
            ///  element order.</returns>
        }, 
        
        subtract: function(a, (minuend)) {
            /// <summary>Subtracts one array from another array based on the unique values in both
            ///  sets.</summary>
            /// <param name="a" type="Array">(subtrahend) The array to subtract.</param>
            /// <param name="(minuend)" type="Array">fromB The array with elements duplicated in &lt;code&gt;a&lt;/code&gt;</param>
            /// <returns type="Array">Returns a new array containing only the unique
            ///  values found in &lt;code&gt;fromB&lt;/code&gt; that are not present in &lt;code&gt;a&lt;/code&gt;</returns>
        }, 
        
        intersect: function(array1, array2) {
            /// <summary>Returns an array of values found in both of the given arrays.</summary>
            /// <param name="array1" type="Array">An array.</param>
            /// <param name="array2" type="Array">Another array.</param>
            /// <returns type="Array">Returns an array of values found in both of the given
            ///  arrays.</returns>
        }, 
        
        getFrequency: function(arr) {
            /// <summary>Calculates the frequency of items occurring in an array.</summary>
            /// <param name="arr" type="Array">The array to calculate frequencies from.</param>
            /// <returns type="Object">Returns an object whose keys are each unique
            ///  elements from the array and their value is their frequency of
            ///  occurrence within the array. Be careful that your array does
            ///  not contain values matching object instance property names.</returns>
        }, 
        
        getUnique: function(largeArray) {
            /// <summary>Gets Unique values from an array.</summary>
            /// <param name="largeArray" type="Array">The array with duplicate values in it.</param>
            /// <returns type="Array">Returns a new array containing only the unique
            ///  values found in the largeArray.</returns>
        }, 
        
        removeEmptyElements: function(arrayWithEmptyElements) {
            /// <summary>Removes empty strings from the given array.</summary>
            /// <param name="arrayWithEmptyElements" type="Array">The array with empty strings in it.</param>
            /// <returns type="Array">Returns a new array with empty strings removed.</returns>
        }, 
        
        reindex: function(arr) {
            /// <summary>Reindexes an array.</summary>
            /// <param name="arr" type="Array">The array with discontinuous keys.</param>
            /// <returns type="Array">Returns an array with continuous keys.</returns>
        }, 
        
        sortNumerically: function(arr) {
            /// <summary>Sorts an array&apos;s elements numerically.</summary>
            /// <param name="arr" type="Array">The array to sort. All elements of the array must be
            ///  number-ish.</param>
            /// <returns type="Array">Returns an array whose elements are in numeric order.</returns>
        }, 
        
        sortAlphabetically: function(arr) {
            /// <summary>Sorts an array&apos;s elements lexicographically.</summary>
            /// <param name="arr" type="Array">The array to sort. All elements of the array must be
            ///  strings.</param>
            /// <returns type="Array">Returns an array whose elements are in alphabetic order.</returns>
        }, 
        
        "delete": function(arr, index) {
            /// <summary>Deletes the given element from the array at the given index. It basically
            ///  does what you would expect the delete operator to do, except the delete
            ///  operator doesn&apos;t do what you would expect.</summary>
            /// <param name="arr" type="Array">The array.</param>
            /// <param name="index" type="Number">The index of the element to delete.</param>
            /// <returns type="">Returns an array with the element removed, contiguous keys, and
            ///  whose length is 1 less than the input array.</returns>
        }
        
    };

    var $x = window.atropa.arrays;
    $x.__namespace = "true";
    $x.__typeName = "atropa.arrays";
})(this);

  

  
  
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


  
  
/* vsdoc for atropa.CookieMonster */

(function (window) {
    window.atropa = window.atropa || {};

    window.atropa.CookieMonster = function(){
        /// <summary></summary>
        /// <field name="currentCookies" type="Array">This holds the current cookie object array.</field>
        /// <returns type="atropa.CookieMonster"/>
    };

    var $x = window.atropa.CookieMonster;
    $x.prototype = {
                
        cookie2obj: function(cookie) {
            /// <summary>Converts a cookie string into an object.</summary>
            /// <param name="cookie" type="String">A cookie represented as a string
            /// &lt;code&gt;cookieName=cookieVal;&lt;/code&gt;</param>
            /// <returns type="cookieObj">Returns a cookie object.</returns>
        }, 
        
        bakeCookie: function(cookieObj) {
            /// <summary>Converts a cookie object to a cookie string.</summary>
            /// <param name="cookieObj" type="Object">A cookie object</param>
            /// <returns type="String">Returns a cookie string.</returns>
        }, 
        
        inspectCookies: function(callback, args) {
            /// <summary>Filter cookies based on user specified callback.</summary>
            /// <param name="callback" type="function">The callback function will be passed
            ///  two arguments. The first is a cookie object from the current
            ///  document. The second argument is the value supplied for
            ///  &lt;code&gt;args&lt;/code&gt; if the callback function returns &lt;code&gt;true&lt;/code&gt;
            ///  then the cookie object will be included in the return results.</param>
            /// <param name="args" type="Array">Arguments to pass to the callback
            /// function.</param>
            /// <returns type="Array">An array of cookie objects.</returns>
        }, 
        
        getCookieCallback: function(testCookie, args) {
            /// <summary>Internal callback function used while getting the current
            /// cookies.</summary>
            /// <param name="testCookie" type="cookieObj">A cookie object</param>
            /// <param name="args" type="String">argument used in comparison function</param>
            /// <returns type="Boolean">If cookie key is exactly equal to the argument
            /// then the callback returns true.</returns>
        }, 
        
        getCookie: function(whichKey) {
            /// <summary>Gets a user requested cookie.</summary>
            /// <param name="whichKey" type="String">The cookies key (name)</param>
            /// <returns type="cookieObj|false">Returns a cookie object if
            ///  a cookie with the specified key is found or false if
            ///  it is not found.</returns>
        }, 
        
        getCookies: function() {
            /// <summary>Get all cookies.</summary>
            /// <returns type="Array">An array whose elements are cookie objects.</returns>
        }, 
        
        "delete": function(whichKey) {
            /// <summary>Deletes a specified cookie by user submitted string.</summary>
            /// <param name="whichKey" type="String">The cookies key (name) that
            /// will be deleted.</param>
        }, 
        
        "delete": function(cookieObj) {
            /// <summary>Deletes a specified cookie by user submitted cookieObj.</summary>
            /// <param name="cookieObj" type="cookieObj">A cookie object.</param>
        }, 
        
        setCookie: function(whichKey, setTo) {
            /// <summary>Sets a cookie per user specifications as strings. The cookie
            /// will expire when the browser is closed.</summary>
            /// <param name="whichKey" type="String">The key (name) of the new cookie</param>
            /// <param name="setTo" type="String">The value of the new cookie.</param>
        }, 
        
        setCookieObj: function(cookieObj) {
            /// <summary>Sets a cookie per user specifications as an object.
            /// The cookie will expire when the browser is closed.</summary>
            /// <param name="cookieObj" type="cookieObj">A cookie object.</param>
        }, 
        
        init: function() {
            /// <summary></summary>
        }
        
    };

    $x.__class = "true";
    $x.__typeName = "atropa.CookieMonster";
})(this);


  
  
/* vsdoc for atropa.CreateHtmlDocumentsFromXmlhttp */

(function (window) {
    window.atropa = window.atropa || {};

    window.atropa.CreateHtmlDocumentsFromXmlhttp = function(){
        /// <summary></summary>
        /// <field name="documentQueue" type="Array">Queue of documents created by this instance.</field>
        /// <returns type="atropa.CreateHtmlDocumentsFromXmlhttp"/>
    };

    var $x = window.atropa.CreateHtmlDocumentsFromXmlhttp;
    $x.prototype = {
                
        newDocument: function(method, url, messageBody, callback) {
            /// <summary>Creates an HTML DOM Document and puts it in the document
            ///  queue, then executes the callback given. Note, this does
            ///  not work on google chrome.</summary>
            /// <param name="method" type="String">Any valid method to be used in
            /// an XMLHttpRequest.</param>
            /// <param name="url" type="String">The location of the document&apos;s source.</param>
            /// <param name="messageBody" type="String">null, or a message body.</param>
            /// <param name="callback" type="Function">The function to execute upon
            /// request completion. This function will be given either
            /// an HTML DOM Document or false.</param>
            /// <returns type="HTML DOM Document|false">The return value is
            /// given to the callback function.</returns>
        }, 
        
        init: function() {
            /// <summary></summary>
        }
        
    };

    $x.__class = "true";
    $x.__typeName = "atropa.CreateHtmlDocumentsFromXmlhttp";
})(this);


  
/* vsdoc for atropa.data */

(function (window) {
    window.atropa = window.atropa || {};

    window.atropa.data = {
        /// <summary></summary>
        /// <returns type="atropa.data"/>
                
    };

    var $x = window.atropa.data;
    $x.__namespace = "true";
    $x.__typeName = "atropa.data";
})(this);

  

  
  
/* vsdoc for atropa.HTMLParser */

(function (window) {
    window.atropa = window.atropa || {};

    window.atropa.HTMLParser = function(){
        /// <summary></summary>
        /// <field name="doc" type="HTML DOM Document">Holds the created HTML DOM Document.</field>
        /// <returns type="atropa.HTMLParser"/>
    };

    var $x = window.atropa.HTMLParser;
    $x.prototype = {
                
        selfTest: function() {
            /// <summary>Tests if this class will work in the current environment and throws
            ///  an error if it won&apos;t.</summary>
            /// <returns type="">Returns true or throws an error if this class is not supported
            ///  in the current environment.</returns>
        }, 
        
        newDocument: function() {
            /// <summary>Creates a blank HTML DOM Document.</summary>
            /// <returns type="HTML DOM Document">Resets the doc property of this instance
            ///  and, returns a blank HTML Document for you to load data into.</returns>
        }, 
        
        loadString: function(htmlstring) {
            /// <summary>Creates a new HTML DOM Document and loads the given string into it.</summary>
            /// <param name="htmlstring" type="String">a string of HTML data</param>
            /// <returns type="HTML DOM Document">Resets the doc property of this instance,
            /// loading a new document with the string given.</returns>
        }
        
    };

    $x.__class = "true";
    $x.__typeName = "atropa.HTMLParser";
})(this);


  
/* vsdoc for atropa.inject */

(function (window) {
    window.atropa = window.atropa || {};

    window.atropa.inject = {
        /// <summary></summary>
        /// <returns type="atropa.inject"/>
                
        element: function(elementType, docref, parentNod, attributes, onloadHandler, callback) {
            /// <summary>Generic Element Injector.</summary>
            /// <param name="elementType" type="String">The type of element to be injected.</param>
            /// <param name="docref" type="HTML DOM Document">Optional. A reference to the document to
            ///  target, defaults to &lt;code&gt;document&lt;/code&gt;.</param>
            /// <param name="parentNod" type="DOM Node">Optional. A reference to the parent node to
            ///  target, defaults to &lt;code&gt;docref.body&lt;/code&gt;.</param>
            /// <param name="attributes" type="Object">Optional. An object whose properties are names of
            ///  HTML attributes, defaults to &lt;code&gt;{}&lt;/code&gt;. The value of these properties
            ///  are to be strings representing the values of the HTML attributes as they are
            ///  to be applied to the injected element.</param>
            /// <param name="onloadHandler" type="Function">Optional. If the element being injected will
            ///  fire a load event, this function will be called. Defaults to
            ///  &lt;code&gt;function () {}&lt;/code&gt;.</param>
            /// <param name="callback" type="Function">Optional. This function will be called just before
            ///  the element is to be appended to the page. The callback will receive the
            ///  element in its current state for any additional processing to be done prior
            ///  to it&apos;s attachment on callback completion. Defaults to
            ///  &lt;code&gt;function () {}&lt;/code&gt;.</param>
            /// <returns type="HTML Element">Returns a reference to the HTML Element created and
            ///  injected.</returns>
        }, 
        
        hiddenFrame: function(id, srcUrl, docref, onloadHandler, parentNod, callback) {
            /// <summary>Hidden Iframe Injector.</summary>
            /// <param name="id" type="String">The id of the element to be injected.</param>
            /// <param name="srcUrl" type="String">The URL to load in the iframe.</param>
            /// <param name="docref" type="HTML DOM Document">Optional. Reference to the document to
            ///  inject the iframe in. Defaults to document.</param>
            /// <param name="onloadHandler" type="Function">Optional. The onload handler for the iframe.</param>
            /// <param name="parentNod" type="DOM Node">Optional. Referenct to the parent node to
            ///  append the iframe to. Defaults to docref.body</param>
            /// <param name="callback" type="Function">Optional. Callback function for preprocessing
            ///  the iframe prior to injection. Called with a reference to the iframe.</param>
            /// <returns type="HTML Element">Returns a reference to the HTML Element created and
            ///  injected.</returns>
        }, 
        
        script: function(id, srcUrl, docref, callback) {
            /// <summary>Script Injector.</summary>
            /// <param name="id" type="String">The id of the element to be injected.</param>
            /// <param name="srcUrl" type="String">The URL where the script is located.</param>
            /// <param name="docref" type="HTML DOM Document">Optional. The document to inject the
            ///  script into. Defaults to document.</param>
            /// <param name="callback" type="Function">Optional. A function to execute once the script
            ///  has loaded. Defaults to function () {};</param>
            /// <returns type="HTML Element">Returns a reference to the HTML Element created and
            ///  injected.</returns>
        }
        
    };

    var $x = window.atropa.inject;
    $x.__namespace = "true";
    $x.__typeName = "atropa.inject";
})(this);

  

  
/* vsdoc for atropa.inquire */

(function (window) {
    window.atropa = window.atropa || {};

    window.atropa.inquire = {
        /// <summary></summary>
        /// <returns type="atropa.inquire"/>
                
        isNull: function(x) {
            /// <summary>Checks whether the input is null.</summary>
            /// <param name="x" type="Mixed">Any input that may or may not be null.</param>
            /// <returns type="Boolean">Returns true if x === null.</returns>
        }, 
        
        isObject: function(x) {
            /// <summary>Checks whether the input is an object.</summary>
            /// <param name="x" type="Mixed">Any input that may or may not be an object.</param>
            /// <returns type="Boolean">Returns true if typeof(x) === &apos;object&apos;.</returns>
        }, 
        
        isObjectNotNull: function(x) {
            /// <summary>Checks whether the input is both an object and not null.</summary>
            /// <param name="x" type="Mixed">Any input that may or may not be both an
            /// object and null.</param>
            /// <returns type="Boolean">Returns true if x is both an object and
            /// not null. (null is an object).</returns>
        }, 
        
        hasProperty: function(obj, prop) {
            /// <summary>Checks an object for the existence of a property
            /// regardless of whether the property was inherited
            /// or not.</summary>
            /// <param name="obj" type="Object">An object which may or may not
            /// have the property identified by prop.</param>
            /// <param name="prop" type="String">A string value representing the
            /// name of the property.</param>
            /// <returns type="Boolean">Returns true if obj.prop exists,
            /// otherwise returns false.</returns>
        }, 
        
        isEmptyString: function(str) {
            /// <summary>Checks whether the input is an empty string.</summary>
            /// <param name="str" type="String">The string you want to know about</param>
            /// <returns type="Boolean">Returns true if str is an empty string,
            ///  otherwise returns false.</returns>
        }
        
    };

    var $x = window.atropa.inquire;
    $x.__namespace = "true";
    $x.__typeName = "atropa.inquire";
})(this);

  

  
  
/* vsdoc for atropa.InvalidArgumentTypesError */

(function (window) {
    window.atropa = window.atropa || {};

    window.atropa.InvalidArgumentTypesError = function(message){
        /// <summary></summary>
        /// <param name="message" type="String">Optional. The error message to send. Defaults to
        ///  &lt;code&gt;InvalidArgumentTypesError&lt;/code&gt;</param>
        /// <field name="name" type="">The name of the error. Tells the user what kind of custom
        /// error has been thrown.</field>
        /// <field name="message" type="">The error message to send.</field>
        /// <returns type="atropa.InvalidArgumentTypesError"/>
    };

    var $x = window.atropa.InvalidArgumentTypesError;
    $x.prototype = {
                
    };

    $x.__class = "true";
    $x.__typeName = "atropa.InvalidArgumentTypesError";
})(this);


  
/* vsdoc for atropa.objects */

(function (window) {
    window.atropa = window.atropa || {};

    window.atropa.objects = {
        /// <summary></summary>
        /// <returns type="atropa.objects"/>
                
        convertObjectToArray: function(obj) {
            /// <summary>Converts an object into an array of arrays to make it possible to sort and
            ///  enumerate properties reliably.</summary>
            /// <param name="obj" type="Object">An object.</param>
            /// <returns type="Array">Returns an array of arrays where each
            ///  nested array will have the object&apos;s key stored in element 0 and
            ///  the value stored in element 1. The reason an array of arrays is
            ///  returned is because JavaScript does not guarantee the order of
            ///  properties on an object so there is no relizble way to sort
            ///  an objects keys or values.</returns>
        }, 
        
        sort: function(obj, sortFn) {
            /// <summary>Converts an object into an array of arrays and allows for reliable sorting
            ///  and enumeration.</summary>
            /// <param name="obj" type="Object">An object.</param>
            /// <param name="sortFn" type="Function">Optional. The sorting function. This function will
            ///  be given two arguments. Compare the two arguments and return:
            ///  0 if they are equal, greater than zero if the first argument
            ///  is greater than the second, or less than zero if the second
            ///  argument is greater than the first. If the sorting function
            ///  is not given, the array will be sorted lexographically by
            ///  each elements &lt;code&gt;toString&lt;/code&gt; value.</param>
            /// <returns type="Array">Returns an array of arrays where each
            ///  nested array will have the objects key stored in element 0 and
            ///  the value stored in element 1. The reason an array of arrays is
            ///  returned is because JavaScript does not guarantee the order of
            ///  properties on an object so there is no relizble way to sort
            ///  an objects keys or values.</returns>
        }, 
        
        sortValues: function(obj, sortFn) {
            /// <summary>Sorts an object by its values using a user defined algorithm.</summary>
            /// <param name="obj" type="Object">An object.</param>
            /// <param name="sortFn" type="Function">The sorting function. This function will
            ///  be given two arguments. Compare the two arguments and return:
            ///  0 if they are equal, greater than zero if the first argument
            ///  is greater than the second, or less than zero if the second
            ///  argument is greater than the first.</param>
            /// <returns type="Array">Returns an array of arrays where each
            ///  nested array will have the objects key stored in element 0 and
            ///  the value stored in element 1.</returns>
        }, 
        
        sortProperties: function(obj, sortFn) {
            /// <summary>Sorts an object by its properties using a user defined algorithm.</summary>
            /// <param name="obj" type="Object">An object.</param>
            /// <param name="sortFn" type="Function">The sorting function. This function will
            ///  be given two arguments. Compare the two arguments and return:
            ///  0 if they are equal, greater than zero if the first argument
            ///  is greater than the second, or less than zero if the second
            ///  argument is greater than the first.</param>
            /// <returns type="Array">Returns an array of arrays where each
            ///  nested array will have the objects key stored in element 0 and
            ///  the value stored in element 1.</returns>
        }, 
        
        sortValuesNumerically: function(obj) {
            /// <summary>Sorts an object by its values numerically.</summary>
            /// <param name="obj" type="Object">A simple object where the properties
            ///  all have numeric-ish values.</param>
            /// <returns type="Array">Returns an array of arrays where each
            ///  nested array will have the objects key stored in element 0 and
            ///  the value stored in element 1.</returns>
        }, 
        
        sortValuesAlphabetically: function(obj) {
            /// <summary>Sorts an object by its values lexicographically.</summary>
            /// <param name="obj" type="Object">A simple object where the properties
            ///  all have string values.</param>
            /// <returns type="Array">Returns an array of arrays where each
            ///  nested array will have the objects key stored in element 0 and
            ///  the value stored in element 1.</returns>
        }, 
        
        sortPropertiesNumerically: function(obj) {
            /// <summary>Sorts an object by its properties numerically.</summary>
            /// <param name="obj" type="Object">A simple object where the properties
            ///  all have numeric-ish values.</param>
            /// <returns type="Array">Returns an array of arrays where each
            ///  nested array will have the objects key stored in element 0 and
            ///  the value stored in element 1.</returns>
        }, 
        
        sortPropertiesAlphabetically: function(obj) {
            /// <summary>Sorts an object by its properties lexicographically.</summary>
            /// <param name="obj" type="Object">A simple object where the properties
            ///  all have string values.</param>
            /// <returns type="Array">Returns an array of arrays where each
            ///  nested array will have the objects key stored in element 0 and
            ///  the value stored in element 1.</returns>
        }
        
    };

    var $x = window.atropa.objects;
    $x.__namespace = "true";
    $x.__typeName = "atropa.objects";
})(this);

  

  
/* vsdoc for atropa.random */

(function (window) {
    window.atropa = window.atropa || {};

    window.atropa.random = {
        /// <summary></summary>
        /// <returns type="atropa.random"/>
                
        string: function(stringLength, characterClass) {
            /// <summary>Gives you a random string whose length and characters you specify.</summary>
            /// <param name="stringLength" type="Number">This is the length of the string.</param>
            /// <param name="characterClass" type="String">Optional. May be one of:
            ///  numeric, caps, lower, alpha, alphanumeric, punctuation, vowel, consonant
            ///  This is the type of characters you want returned to you. Defaults to
            ///  alphanumeric.</param>
            /// <returns type="String">A random string of specified length and composition.</returns>
        }, 
        
        integer: function(min, max) {
            /// <summary>Generates a random number between the specified min and max value.</summary>
            /// <param name="min" type="Number">The lowest number you want returned</param>
            /// <param name="max" type="Number">The highest number you want returned</param>
            /// <returns type="Number">A random number within the specified range.</returns>
        }, 
        
        getPropertyName: function(obj) {
            /// <summary>Get a random property name from the given object.</summary>
            /// <param name="obj" type="Object">The object to select a random
            ///  property name from.</param>
            /// <returns type="String">A random property name from the
            ///  given object.</returns>
        }, 
        
        getArrayKey: function(arr) {
            /// <summary>Get a random key from the given array.</summary>
            /// <param name="arr" type="Array">The array to select a random
            ///  key from. The keys of the array must be contiguous.</param>
            /// <returns type="Number">A random integer between 0 and
            ///  &lt;code&gt;arr.length&lt;/code&gt;</returns>
        }, 
        
        getArrayValue: function(arr) {
            /// <summary>Get a random value from the given array.</summary>
            /// <param name="arr" type="Array">The array to select a random
            ///  value from. The keys of the array must be contiguous.</param>
            /// <returns type="Mixed">A random value from the given array.</returns>
        }, 
        
        pullArrayElement: function(arr) {
            /// <summary>Remove a random element from the given array.</summary>
            /// <param name="arr" type="Array">The array to remove a random
            ///  element from. The keys of the array must be contiguous.</param>
            /// <returns type="Mixed">A random value from the given array.</returns>
        }, 
        
        pullProperty: function(obj) {
            /// <summary>Remove a random property from the given object.</summary>
            /// <param name="obj" type="Object">The object to remove a random
            ///  property from.</param>
            /// <returns type="Mixed">A random value from the given object.</returns>
        }
        
    };

    var $x = window.atropa.random;
    $x.__namespace = "true";
    $x.__typeName = "atropa.random";
})(this);

  

  
/* vsdoc for atropa.regex */

(function (window) {
    window.atropa = window.atropa || {};

    window.atropa.regex = {
        /// <summary></summary>
        /// <returns type="atropa.regex"/>
                
        appendPrefixesAndSuffixes: function(word, threshold) {
            /// <summary>Appends common prefix, suffix, and word boundary regex strings to
            /// the supplied word.</summary>
            /// <param name="word" type="String">The word to append prefix and suffix to</param>
            /// <param name="threshold" type="Integer" integer="true">The word.length at which it does not
            /// make sense to append prefix and suffix. Defaults to 3.</param>
            /// <returns type="String">Returns the supplied word with prefix, suffix,
            /// and word boundaries attached. If the word.length was not greater
            /// than the threshold, only word boundaries are attached. The string
            /// represents a RegEx which should pick out most forms of regular
            /// words.</returns>
        }
        
    };

    var $x = window.atropa.regex;
    $x.__namespace = "true";
    $x.__typeName = "atropa.regex";
})(this);

  

  
  
/* vsdoc for atropa.Requester */

(function (window) {
    window.atropa = window.atropa || {};

    window.atropa.Requester = function(){
        /// <summary></summary>
        /// <field name="expArgTypes" type="Expected Arg Types">Container object for the expected argument types
        /// supplied to this.makeRequest.</field>
        /// <field name="requestHeaders" type="Request Headers Object">Object whose properties and values are header names and values
        ///  respectively.</field>
        /// <field name="timeout" type="Number">Set the timeout value for the request in milliseconds. The request will
        ///  abort after this amount of time has passed.</field>
        /// <field name="request" type="XMLHttpRequest">XMLHttpRequest object used by Requester.</field>
        /// <returns type="atropa.Requester"/>
    };

    var $x = window.atropa.Requester;
    $x.prototype = {
                
        checkRequest: function(args) {
            /// <summary>Used to check the arguments types supplied to this.makeRequest.</summary>
            /// <param name="args" type="Arguments">An arguments array</param>
            /// <returns type="Boolean">Returns true if args types match the
            /// expected types.</returns>
        }, 
        
        makeRequest: function(method, url, messageBody, callback) {
            /// <summary>Makes an AJAX request.</summary>
            /// <param name="method" type="String">The HTTP method to be used for this request.</param>
            /// <param name="url" type="String">The URL to send the request to.</param>
            /// <param name="messageBody" type="String">The body of the request.</param>
            /// <param name="callback" type="Object">The callback function to execute
            ///  when readyState is 4. The callback is supplied with two arguments. The
            ///  first argument is a boolean indicating whether or not the http status
            ///  was 200. The second argument is the request object.</param>
        }, 
        
        init: function() {
            /// <summary></summary>
        }
        
    };

    $x.__class = "true";
    $x.__typeName = "atropa.Requester";
})(this);


  
  
/* vsdoc for atropa.SerialActor */

(function (window) {
    window.atropa = window.atropa || {};

    window.atropa.SerialActor = function(actorName, actorFunction){
        /// <summary></summary>
        /// <param name="actorName" type="String">The name for the SerialActor instance.</param>
        /// <param name="actorFunction" type="Function">The function to execute when the
        ///  SerialActor is free. This function must call the &lt;code&gt;free&lt;/code&gt; function
        ///  when it is finished in order to allow the actor to continue.</param>
        /// <field name="name" type="String">The name of this instance. Defaults to &quot;SerialActor&quot;</field>
        /// <field name="interval" type="Number">Polling interval in milliseconds. This determines how frequently the
        ///  actor function will try to execute. Defaults to 100 milliseconds.</field>
        /// <field name="intervalId" type="Number">The id of the interval set to poll the actor. You should not change
        ///  this manually, use the start and stop functions instead. Defauls to
        ///  undefined.</field>
        /// <field name="blocked" type="Boolean">The state of the SerialActor. If true, the actor will sleep. If false the
        ///  actor will execute the actor function when next polled. Defaults to
        ///  false.</field>
        /// <field name="timeouts" type="Array">Stores id&apos;s of currently running timeout functions used to free the actor
        ///  if it has been blocked for too long.</field>
        /// <field name="blockTimeoutValue" type="Number">The maximum time, in milliseconds, which the actor may be blocked for.
        ///  After this duration has been reached the actor will be freed. Defaults
        ///  to 60 seconds.</field>
        /// <field name="actorFunction" type="Function">The function to execute when the SerialActor is free. This function
        ///  must call the &lt;code&gt;free&lt;/code&gt; function when it is finished in order to
        ///  allow the actor to continue. Defaults to the &lt;code&gt;dummyActor&lt;/code&gt;
        ///  function.</field>
        /// <returns type="atropa.SerialActor"/>
    };

    var $x = window.atropa.SerialActor;
    $x.prototype = {
                
        dummyActor: function() {
            /// <summary>Default actorFunction</summary>
        }, 
        
        action: function() {
            /// <summary>The action function is called when the actor is polled and it&apos;s blocked
            ///  state is false. This method should not be set or called manually, set
            ///  the &lt;code&gt;actorFunction&lt;/code&gt; instead.</summary>
        }, 
        
        block: function() {
            /// <summary>Prevents the actor from executing it&apos;s actorFunction. This block will timeout
            ///  once the &lt;code&gt;blockTimeoutValue&lt;/code&gt; has been reached.</summary>
            /// <returns type="Boolean">Returns the value of this instances &lt;code&gt;blocked&lt;/code&gt;
            ///  property.</returns>
        }, 
        
        blockTimeout: function() {
            /// <summary>Called when the &lt;code&gt;blockTimeoutValue&lt;/code&gt; has been reached. This frees
            ///  the actor and removes the timeout reference from the timeouts array.</summary>
            /// <returns type="Boolean">Returns the value of this instances &lt;code&gt;blocked&lt;/code&gt;
            ///  property.</returns>
        }, 
        
        free: function() {
            /// <summary>Frees the actor so it may execute its actor function when next polled.</summary>
            /// <returns type="Boolean">Returns the value of this instances &lt;code&gt;blocked&lt;/code&gt;
            ///  property.</returns>
        }, 
        
        start: function(interval) {
            /// <summary>Starts polling the actor.</summary>
            /// <param name="interval" type="Number">Optional. The polling interval. Defaults to the
            ///  value of &lt;code&gt;this.interval&lt;/code&gt;</param>
            /// <returns type="Number">Returns the value of this instance&apos;s
            ///  &lt;code&gt;intervalId&lt;/code&gt; property.</returns>
        }, 
        
        changeInterval: function(interval) {
            /// <summary>Adjusts the polling interval after &lt;code&gt;start&lt;/code&gt; has
            /// been called.</summary>
            /// <param name="interval" type="Number">The new polling interval in milliseconds.</param>
            /// <returns type="Number">Returns the value of this instance&apos;s 
            ///  &lt;code&gt;intervalId&lt;/code&gt; property.</returns>
        }, 
        
        stop: function() {
            /// <summary>Stops polling the actor. Note that the actor will be freed once the
            ///  &lt;code&gt;blockTimeoutValue&lt;/code&gt; has been reached. This will not restart the
            ///  polling.</summary>
        }
        
    };

    $x.__class = "true";
    $x.__typeName = "atropa.SerialActor";
})(this);


  
/* vsdoc for atropa.string */

(function (window) {
    window.atropa = window.atropa || {};

    window.atropa.string = {
        /// <summary></summary>
        /// <returns type="atropa.string"/>
                
        ucFirst: function(string) {
            /// <summary>Converts the first character of a given string to
            /// uppercase.</summary>
            /// <param name="string" type="String">The string for which you want the
            /// first letter to be in upper case.</param>
            /// <returns type="String">The given string with it&apos;s first letter capitalized.</returns>
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
                
        construct: function() {
            /// <summary>Sets the basic properties of the text analyzer.</summary>
        }, 
        
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


  
/* vsdoc for atropa.url */

(function (window) {
    window.atropa = window.atropa || {};

    window.atropa.url = {
        /// <summary></summary>
        /// <returns type="atropa.url"/>
                
        getFilename: function(url) {
            /// <summary>Gets the filename portion of a url</summary>
            /// <param name="url" type="String">The url.</param>
            /// <returns type="String">Returns everything after the last / in the url.</returns>
        }
        
    };

    var $x = window.atropa.url;
    $x.__namespace = "true";
    $x.__typeName = "atropa.url";
})(this);

  

  
/* vsdoc for atropa.waitFor */

(function (window) {
    window.atropa = window.atropa || {};

    window.atropa.waitFor = {
        /// <summary></summary>
        /// <returns type="atropa.waitFor"/>
                
        test: function(testFn, onSuccessCallback, onMaxPollCallback, pollInterval, maxPoll) {
            /// <summary>Generic Wait for true.</summary>
            /// <param name="testFn" type="Function">A function to tell when the wait is over. Must
            ///  return true on success, false on failure.</param>
            /// <param name="onSuccessCallback" type="Function">Optional. The function to run when testFn
            ///  returns true. Defaults to &lt;code&gt;function () {} &lt;/code&gt;</param>
            /// <param name="onMaxPollCallback" type="function">Optional. The function to run when testFn
            ///  has been run maxPoll times and the wait is being given up.
            /// Defaults to &lt;code&gt;function () {}&lt;/code&gt;</param>
            /// <param name="pollInterval" type="Integer" integer="true">The amount of time in ms between polling testFn
            ///  to see if it returns true. Defaults to 200ms.</param>
            /// <param name="maxPoll" type="Integer" integer="true">The quantity of polls at which it makes sense to 
            ///  give up waiting. Defaults to 50.</param>
        }, 
        
        element: function(testFn, onSuccessCallback, onMaxPollCallback, pollInterval, maxPoll) {
            /// <summary>Wait for Element</summary>
            /// <param name="testFn" type="Function">A function which returns a reference to an HTML
            ///  Element.</param>
            /// <param name="onSuccessCallback" type="Function">Optional.</param>
            /// <param name="onMaxPollCallback" type="function">Optional.</param>
            /// <param name="pollInterval" type="Integer" integer="true"></param>
            /// <param name="maxPoll" type="Integer" integer="true"></param>
        }
        
    };

    var $x = window.atropa.waitFor;
    $x.__namespace = "true";
    $x.__typeName = "atropa.waitFor";
})(this);

  

  
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
            ///  the window has loaded. This callback will receive one argument,
            ///  a reference to the opened window.</param>
            /// <param name="testFn" type="Function">Optional. An alternate test for windows
            ///  containing too many slow loading external resources. The callback
            ///  will be given a reference to the opened window as its first artument.
            ///  Return something truthy and the callback will fire, return
            ///  something falsy and continue waiting. Your test will be tried
            ///  every 250ms until it returns something truthy.</param>
            /// <returns type="Object">Returns a reference to the opened window.</returns>
        }
        
    };

    var $x = window.atropa.window;
    $x.__namespace = "true";
    $x.__typeName = "atropa.window";
})(this);

  

  
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
            ///  given element and replaces the element with a pre block
            ///  containing the results of WTFification.</summary>
            /// <param name="elementReference" type="HTMLElement">A reference to an HTML Element.</param>
        }
        
    };

    var $x = window.atropa.wtf;
    $x.__namespace = "true";
    $x.__typeName = "atropa.wtf";
})(this);

  

  
/* vsdoc for atropa.xpath */

(function (window) {
    window.atropa = window.atropa || {};

    window.atropa.xpath = {
        /// <summary></summary>
        /// <returns type="atropa.xpath"/>
                
        processNodesByXpath: function(xpathExpression, contxtNode, docref, callback) {
            /// <summary>Processes nodes from the DOM using an Xpath expression.</summary>
            /// <param name="xpathExpression" type="String">An Xpath expression as a string</param>
            /// <param name="contxtNode" type="DOM Node">The node which is to serve as the root
            /// for the supplied Xpath expression. Defaults to whatever docref is.
            /// If you are using a relative path such as &lt;code&gt;.//a&lt;/code&gt; and, you only
            /// want the anchors that are descendants of another element, you would
            /// supply a reference to that element for this argument. When using a
            /// context node, the docref argument must refer to the context node&apos;s
            /// containing document.</param>
            /// <param name="docref" type="DOM Document">A reference to the document you
            /// are searching, defaults to document. If you have created a separate
            /// DOMDocument with the &lt;code&gt;atropa.HTMLParser&lt;/code&gt;, an iframe, or by
            /// some other means, you would put a reference to that document here to
            /// indicate that you intend to use that document&apos;s root.</param>
            /// <param name="callback" type="Function">A function applied to every element found
            /// using the supplied xpath expression. The callback receives a single
            /// element as it&apos;s only argument.</param>
            /// <returns type="Number">Returns the quantity of nodes processed.</returns>
        }, 
        
        removeNodesByXpath: function(xpathExpression, contxtNode, docref) {
            /// <summary>Removes nodes from the DOM using an Xpath expression.</summary>
            /// <param name="xpathExpression" type="String">An Xpath expression as a string</param>
            /// <param name="contxtNode" type="DOM Node">The node which is to serve as the root
            /// for the supplied Xpath expression. Defaults to whatever docref is.</param>
            /// <param name="docref" type="DOM Document">A reference to the document you
            /// are searching, defaults to document.</param>
            /// <returns type="Number">Returns the quantity of nodes removed.</returns>
        }, 
        
        getNodesByXpath: function(xpathExpression, contxtNode, docref) {
            /// <summary>Selects nodes from the DOM using an Xpath expression.</summary>
            /// <param name="xpathExpression" type="String">An Xpath expression as a string</param>
            /// <param name="contxtNode" type="DOM Node">The node which is to serve as the root
            /// for the supplied Xpath expression. Defaults to the document&apos;s root node.</param>
            /// <param name="docref" type="DOM Document">A reference to the document you
            /// are searching, defaults to document.</param>
            /// <returns type="Array">Returns an array whose elements are DOM Nodes</returns>
        }, 
        
        escapeQuotesXpath: function(string) {
            /// <summary>Escapes single quotes (apostrope) in Xpath queries.</summary>
            /// <param name="string" type="String">An Xpath query</param>
            /// <returns type="String">Returns a string representing a concat function in Xpath
            /// which will effectively work in escaping quotes in your xpath query.</returns>
        }
        
    };

    var $x = window.atropa.xpath;
    $x.__namespace = "true";
    $x.__typeName = "atropa.xpath";
})(this);

  

