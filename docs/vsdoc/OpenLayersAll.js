
  
/* vsdoc for _global_ */

(function (window) {
    

    window._global_ = {
        /// <summary></summary>
        /// <returns type="_global_"/>
                
    };

    var $x = window._global_;
    $x.__namespace = "true";
    $x.__typeName = "_global_";
})(this);

  

  
/* vsdoc for atropa */

(function (window) {
    

    window.atropa = {
        /// <summary>Container for all Glorious classes, functions, etc.</summary>
        /// <returns type="atropa"/>
      
        /// <field name="data" type="">Container for gobal data related to the classes and functions.</field>
        data : {}, 
      
        /// <field name="arrays" type="">Utilities for handling arrays.</field>
        arrays : {}, 
      
        /// <field name="customErrors" type="">Container for custom Errors.</field>
        customErrors : {}, 
      
        /// <field name="inject" type="">Contains tools for injecting elements and assemblies.
        /// into the page.</field>
        inject : {}, 
      
        /// <field name="inquire" type="">Container for functions that test the state of inputs.</field>
        inquire : {}, 
      
        /// <field name="objects" type="">Utilities for handling objects.</field>
        objects : {}, 
      
        /// <field name="random" type="">Provides random strings and numbers.</field>
        random : {}, 
      
        /// <field name="regex" type="">Container for regex functions.</field>
        regex : {}, 
      
        /// <field name="string" type="">A few utilities for manipulating strings.</field>
        string : {}, 
      
        /// <field name="url" type="">Utilities for handling urls.</field>
        url : {}, 
      
        /// <field name="waitFor" type="">Polling functions for quick and sloppy work.</field>
        waitFor : {}, 
      
        /// <field name="wtf" type="">Container for all Glorious WTFifier related functions and such.</field>
        wtf : {}, 
      
        /// <field name="xpath" type="">An Xpath toolkit for manipulating the DOM.</field>
        xpath : {}, 
                
        supportCheck: function(className, errorMessage) {
            /// <summary>Checks whether this class has been marked as unsupported and throws an 
            ///  error if it has.</summary>
            /// <param name="className" type="String">The name of the class.</param>
            /// <param name="errorMessage" type="String">Optional. A custom error message. Defaults to
            ///  atropa.data[className].error</param>
        }, 
        
        requires: function(className, requirementFn, errorMessage) {
            /// <summary>Pushes a requirement check into atropa.data.requirements. The test
            ///  tests whether the class is supported in this environment. Sets
            ///  atropa.data[className]&apos;s support to unsupported and error to errorMessage
            ///  if the requirementFn returns false. The requirement checks will all be run
            ///  after the library has loaded.</summary>
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
        /// <summary>This represents a filter for arguments based on type.</summary>
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
        /// <summary>Utilities for handling arrays.</summary>
        /// <returns type="atropa.arrays"/>
                
        match: function(array1, array2) {
            /// <summary>Compares two arrays based on size, contents, and element order.</summary>
            /// <param name="array1" type="Array">One array you want compared to another.</param>
            /// <param name="array2" type="Array">The other array.</param>
            /// <returns type="Boolean">Returns true or false depending on
            ///  whether or not the arrays matched in size, composition, and
            ///  element order.</returns>
        }, 
        
        subtract: function(a, fromB) {
            /// <summary>Subtracts one array from another array based on the unique values in both
            ///  sets.</summary>
            /// <param name="a" type="Array">(subtrahend) The array to subtract.</param>
            /// <param name="fromB" type="Array">(minuend) The array with elements duplicated in &lt;code&gt;a&lt;/code&gt;</param>
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
            /// <summary>Throws an error, &lt;code&gt;String.prototype.localeCompare&lt;/code&gt; is not 
            ///  standardized.
            /// 
            ///  Yes, localeCompare is in the standard but, at this time the actual
            ///  comparison is implementation dependant. This means that &quot;alphabetical order&quot;
            ///  can be different on different platforms. What I found was that in node the
            ///  array of &lt;code&gt;[&apos;a&apos;,&apos;Z&apos;,&apos;A&apos;,&apos;z&apos;]&lt;/code&gt; would be sorted to
            ///  &lt;code&gt;[&apos;A&apos;,&apos;Z&apos;,&apos;a&apos;,&apos;z&quot;]&lt;/code&gt;, while on
            ///  firefox it would be sorted to &lt;code&gt;[&apos;a&apos;,&apos;A&apos;,&apos;z&apos;,&apos;Z&apos;]&lt;/code&gt;. Who knows if
            ///  another implementor would sort it &lt;code&gt;[&apos;A&apos;,&apos;a&apos;,&apos;Z&apos;,&apos;z&apos;]&lt;/code&gt;?
            /// 
            /// In order to provide a reliable implementation I would have to create my own
            ///  implementation of &lt;code&gt;String.prototype.localeCompare&lt;/code&gt; and that&apos;s
            ///  just too much work for me to do alone.</summary>
            /// <param name="arr" type=""></param>
        }, 
        
        deleteElement: function(arr, index) {
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


  
  
/* vsdoc for atropa.CookieMonster */

(function (window) {
    window.atropa = window.atropa || {};

    window.atropa.CookieMonster = function(){
        /// <summary>This is a cookie handler.</summary>
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
        
        deleteCookie: function(whichKey) {
            /// <summary>Deletes a specified cookie by user submitted string.</summary>
            /// <param name="whichKey" type="String">The cookies key (name) that
            /// will be deleted.</param>
        }, 
        
        deleteCookieObj: function(cookieObj) {
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
        }
        
    };

    $x.__class = "true";
    $x.__typeName = "atropa.CookieMonster";
})(this);


  
  
/* vsdoc for atropa.CreateHtmlDocumentsFromXmlhttp */

(function (window) {
    window.atropa = window.atropa || {};

    window.atropa.CreateHtmlDocumentsFromXmlhttp = function(){
        /// <summary>Creates HTML DOM Documents from an XMLHttpRequest object.
        /// ///  This was tested on Firefox, it doesn&amp;apos;t work on google chrome.
        /// ///  Your mileage may vary.</summary>
        /// <field name="documentQueue" type="Array">Queue of documents created by this instance.</field>
        documentQueue : new Array(), 
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
        }
        
    };

    $x.__class = "true";
    $x.__typeName = "atropa.CreateHtmlDocumentsFromXmlhttp";
})(this);


  
/* vsdoc for atropa.customErrors */

(function (window) {
    window.atropa = window.atropa || {};

    window.atropa.customErrors = {
        /// <summary>Container for custom Errors.</summary>
        /// <returns type="atropa.customErrors"/>
                
    };

    var $x = window.atropa.customErrors;
    $x.__namespace = "true";
    $x.__typeName = "atropa.customErrors";
})(this);

  

  
  
/* vsdoc for atropa.customErrors.InvalidArgumentTypesError */

(function (window) {
    window.atropa.customErrors = window.atropa.customErrors || {};

    window.atropa.customErrors.InvalidArgumentTypesError = function(message){
        /// <summary>Invalid Argument Types Error</summary>
        /// <param name="message" type="String">Optional. The error message to send. Defaults to
        ///  &lt;code&gt;InvalidArgumentTypesError&lt;/code&gt;</param>
        /// <field name="name" type="">The name of the error. Tells the user what kind of custom
        /// error has been thrown.</field>
        name : {}, 
        /// <field name="message" type="">The error message to send.</field>
        message : {}
    };

    var $x = window.atropa.customErrors.InvalidArgumentTypesError;
    $x.prototype = {
                
    };

    $x.__class = "true";
    $x.__typeName = "atropa.customErrors.InvalidArgumentTypesError";
})(this);


  
/* vsdoc for atropa.data */

(function (window) {
    window.atropa = window.atropa || {};

    window.atropa.data = {
        /// <summary>Container for gobal data related to the classes and functions.</summary>
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
        /// <summary>Creates a new HTML Parser<br />
        /// /// Carry out DOM operations without loading content to the active document.</summary>
        /// <field name="doc" type="HTML DOM Document">Holds the created HTML DOM Document.</field>
        doc : new HTML DOM Document(), 
    };

    var $x = window.atropa.HTMLParser;
    $x.prototype = {
                
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
        /// <summary>Contains tools for injecting elements and assemblies.
        /// /// into the page.</summary>
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
        /// <summary>Container for functions that test the state of inputs.</summary>
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

  

  
/* vsdoc for atropa.objects */

(function (window) {
    window.atropa = window.atropa || {};

    window.atropa.objects = {
        /// <summary>Utilities for handling objects.</summary>
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
        
        sortValuesAlphabetically: function() {
            /// <summary>Throws an error, &lt;code&gt;String.prototype.localeCompare&lt;/code&gt; is not 
            ///  standardized.
            /// 
            ///  Yes, localeCompare is in the standard but, at this time the actual
            ///  comparison is implementation dependant. This means that &quot;alphabetical order&quot;
            ///  can be different on different platforms. What I found was that in node the
            ///  array of &lt;code&gt;[&apos;a&apos;,&apos;Z&apos;,&apos;A&apos;,&apos;z&apos;]&lt;/code&gt; would be sorted to
            ///  &lt;code&gt;[&apos;A&apos;,&apos;Z&apos;,&apos;a&apos;,&apos;z&quot;]&lt;/code&gt;, while on
            ///  firefox it would be sorted to &lt;code&gt;[&apos;a&apos;,&apos;A&apos;,&apos;z&apos;,&apos;Z&apos;]&lt;/code&gt;. Who knows if
            ///  another implementor would sort it &lt;code&gt;[&apos;A&apos;,&apos;a&apos;,&apos;Z&apos;,&apos;z&apos;]&lt;/code&gt;?
            /// 
            /// In order to provide a reliable implementation I would have to create my own
            ///  implementation of &lt;code&gt;String.prototype.localeCompare&lt;/code&gt; and that&apos;s
            ///  just too much work for me to do alone.</summary>
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
            /// <summary>Throws an error, &lt;code&gt;String.prototype.localeCompare&lt;/code&gt; is not 
            ///  standardized.
            /// 
            ///  Yes, localeCompare is in the standard but, at this time the actual
            ///  comparison is implementation dependant. This means that &quot;alphabetical order&quot;
            ///  can be different on different platforms. What I found was that in node the
            ///  array of &lt;code&gt;[&apos;a&apos;,&apos;Z&apos;,&apos;A&apos;,&apos;z&apos;]&lt;/code&gt; would be sorted to
            ///  &lt;code&gt;[&apos;A&apos;,&apos;Z&apos;,&apos;a&apos;,&apos;z&quot;]&lt;/code&gt;, while on
            ///  firefox it would be sorted to &lt;code&gt;[&apos;a&apos;,&apos;A&apos;,&apos;z&apos;,&apos;Z&apos;]&lt;/code&gt;. Who knows if
            ///  another implementor would sort it &lt;code&gt;[&apos;A&apos;,&apos;a&apos;,&apos;Z&apos;,&apos;z&apos;]&lt;/code&gt;?
            /// 
            /// In order to provide a reliable implementation I would have to create my own
            ///  implementation of &lt;code&gt;String.prototype.localeCompare&lt;/code&gt; and that&apos;s
            ///  just too much work for me to do alone.</summary>
            /// <param name="obj" type=""></param>
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
        /// <summary>Provides random strings and numbers.</summary>
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
        /// <summary>Container for regex functions.</summary>
        /// <returns type="atropa.regex"/>
      
        /// <field name="patterns" type="">Regex patterns.</field>
        patterns : {}, 
                
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

  

  
/* vsdoc for atropa.regex.patterns */

(function (window) {
    window.atropa.regex = window.atropa.regex || {};

    window.atropa.regex.patterns = {
        /// <summary>Regex patterns.</summary>
        /// <returns type="atropa.regex.patterns"/>
      
        /// <field name="repeatedWords" type="">finds repeated words and phrases</field>
        repeatedWords : {}, 
      
        /// <field name="paragraphBreaks" type="">finds paragraph breaks</field>
        paragraphBreaks : {}, 
      
        /// <field name="lineBreaks" type="">finds line breaks</field>
        lineBreaks : {}
                
    };

    var $x = window.atropa.regex.patterns;
    $x.__namespace = "true";
    $x.__typeName = "atropa.regex.patterns";
})(this);

  

  
  
/* vsdoc for atropa.Requester */

(function (window) {
    window.atropa = window.atropa || {};

    window.atropa.Requester = function(){
        /// <summary>This represents an XMLHttpRequest.</summary>
        /// <field name="requestHeaders" type="Object">Object whose properties and values are header names and values
        ///  respectively.</field>
        requestHeaders : new Object(), 
        /// <field name="timeout" type="Number">Set the timeout value for the request in milliseconds. The request will
        ///  abort after this amount of time has passed.</field>
        timeout : new Number(), 
    };

    var $x = window.atropa.Requester;
    $x.prototype = {
                
        makeRequest: function(method, url, messageBody, callback) {
            /// <summary>Makes an AJAX request.</summary>
            /// <param name="method" type="String">The HTTP method to be used for this request.</param>
            /// <param name="url" type="String">The URL to send the request to.</param>
            /// <param name="messageBody" type="String">The body of the request.</param>
            /// <param name="callback" type="Object">The callback function to execute
            ///  when readyState is 4. The callback is supplied with two arguments. The
            ///  first argument is a boolean indicating whether or not the http status
            ///  was 200. The second argument is the request object.</param>
        }
        
    };

    $x.__class = "true";
    $x.__typeName = "atropa.Requester";
})(this);


  
  
/* vsdoc for atropa.SerialActor */

(function (window) {
    window.atropa = window.atropa || {};

    window.atropa.SerialActor = function(actorName, actorFunction){
        /// <summary>A polling class designed for executing long running processes that return
        /// ///  nothing and have no callback parameter.</summary>
        /// <param name="actorName" type="String">The name for the SerialActor instance.</param>
        /// <param name="actorFunction" type="Function">The function to execute when the
        ///  SerialActor is free. This function must call the &lt;code&gt;free&lt;/code&gt; function
        ///  when it is finished in order to allow the actor to continue.</param>
        /// <field name="name" type="String">The name of this instance. Defaults to &quot;SerialActor&quot;</field>
        name : new String(), 
        /// <field name="interval" type="Number">Polling interval in milliseconds. This determines how frequently the
        ///  actor function will try to execute. Defaults to 100 milliseconds.</field>
        interval : new Number(), 
        /// <field name="intervalId" type="Number">The id of the interval set to poll the actor. You should not change
        ///  this manually, use the start and stop functions instead. Defauls to
        ///  undefined.</field>
        intervalId : new Number(), 
        /// <field name="blocked" type="Boolean">The state of the SerialActor. If true, the actor will sleep. If false the
        ///  actor will execute the actor function when next polled. Defaults to
        ///  false.</field>
        blocked : new Boolean(), 
        /// <field name="timeouts" type="Array">Stores id&apos;s of currently running timeout functions used to free the actor
        ///  if it has been blocked for too long.</field>
        timeouts : new Array(), 
        /// <field name="blockTimeoutValue" type="Number">The maximum time, in milliseconds, which the actor may be blocked for.
        ///  After this duration has been reached the actor will be freed. Defaults
        ///  to 60 seconds.</field>
        blockTimeoutValue : new Number(), 
        /// <field name="actorFunction" type="Function">The function to execute when the SerialActor is free. This function
        ///  must call the &lt;code&gt;free&lt;/code&gt; function when it is finished in order to
        ///  allow the actor to continue. Defaults to the &lt;code&gt;dummyActor&lt;/code&gt;
        ///  function.</field>
        actorFunction : new Function(), 
    };

    var $x = window.atropa.SerialActor;
    $x.prototype = {
                
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

  

  
  
/* vsdoc for atropa.TextAnalyzer */

(function (window) {
    window.atropa = window.atropa || {};

    window.atropa.TextAnalyzer = function(text){
        /// <summary>Represents a utility for analyzing text.</summary>
        /// <param name="text" type="String">The text to analyze.</param>
        /// <field name="text" type="String">The supplied text. Defaults to an empty string.</field>
        text : new String(), 
        /// <field name="wordCount" type="Number">Gives the count of words in the text. Defaults to 0.</field>
        wordCount : new Number(), 
        /// <field name="words" type="Array">An array of every word in the supplied text.
        ///  Defaults to an empty array.</field>
        words : new Array(), 
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


  
/* vsdoc for atropa.url */

(function (window) {
    window.atropa = window.atropa || {};

    window.atropa.url = {
        /// <summary>Utilities for handling urls.</summary>
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
        /// <summary>Polling functions for quick and sloppy work.</summary>
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
            /// <param name="pollInterval" type="Integer" integer="true">Optional. The amount of time in ms between
            ///  polling testFn to see if it returns true. Defaults to 200ms.</param>
            /// <param name="maxPoll" type="Integer" integer="true">Optional. The quantity of polls at which it makes
            ///  sense to give up waiting. Defaults to 50.</param>
        }, 
        
        element: function(testFn, Optional., Optional., Optional., Optional.) {
            /// <summary>Wait for Element</summary>
            /// <param name="testFn" type="Function">A function which returns a reference to an HTML
            ///  Element.</param>
            /// <param name="Optional." type="Function">onSuccessCallback</param>
            /// <param name="Optional." type="function">onMaxPollCallback</param>
            /// <param name="Optional." type="Integer" integer="true">pollInterval</param>
            /// <param name="Optional." type="Integer" integer="true">maxPoll</param>
        }
        
    };

    var $x = window.atropa.waitFor;
    $x.__namespace = "true";
    $x.__typeName = "atropa.waitFor";
})(this);

  

  
/* vsdoc for atropa.wtf */

(function (window) {
    window.atropa = window.atropa || {};

    window.atropa.wtf = {
        /// <summary>Container for all Glorious WTFifier related functions and such.</summary>
        /// <returns type="atropa.wtf"/>
      
        /// <field name="dictionary" type="">The Glorious WTFification Dictionary: Turning Shit
        /// Into Polished Turds.</field>
        dictionary : {}, 
                
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

  

  
/* vsdoc for atropa.xpath */

(function (window) {
    window.atropa = window.atropa || {};

    window.atropa.xpath = {
        /// <summary>An Xpath toolkit for manipulating the DOM.</summary>
        /// <returns type="atropa.xpath"/>
                
        processNodesByXpath: function(xpathExpression, contextNode, docref, callback) {
            /// <summary>Processes nodes from the DOM using an Xpath expression.</summary>
            /// <param name="xpathExpression" type="String">An Xpath expression as a string</param>
            /// <param name="contextNode" type="DOM Node">Optional. The node which is to serve as the root
            /// for the supplied Xpath expression. Defaults to whatever docref is.
            /// If you are using a relative path such as &lt;code&gt;.//a&lt;/code&gt; and, you only
            /// want the anchors that are descendants of another element, you would
            /// supply a reference to that element for this argument. When using a
            /// context node, the docref argument must refer to the context node&apos;s
            /// containing document.</param>
            /// <param name="docref" type="DOM Document">Optional. A reference to the document you
            /// are searching, defaults to document. If you have created a separate
            /// DOMDocument with the &lt;code&gt;atropa.HTMLParser&lt;/code&gt;, an iframe, or by
            /// some other means, you would put a reference to that document here to
            /// indicate that you intend to use that document&apos;s root.</param>
            /// <param name="callback" type="Function">A function applied to every element found
            /// using the supplied xpath expression. The callback receives a single
            /// element as it&apos;s only argument.</param>
            /// <returns type="Number">Returns the quantity of nodes processed.</returns>
        }, 
        
        removeNodesByXpath: function(xpathExpression, contextNode, docref) {
            /// <summary>Removes nodes from the DOM using an Xpath expression.</summary>
            /// <param name="xpathExpression" type="String">An Xpath expression as a string</param>
            /// <param name="contextNode" type="DOM Node">Optional. The node which is to serve as the root
            /// for the supplied Xpath expression. Defaults to whatever docref is.</param>
            /// <param name="docref" type="DOM Document">Optional. A reference to the document you
            /// are searching, defaults to document.</param>
            /// <returns type="Number">Returns the quantity of nodes removed.</returns>
        }, 
        
        getNodesByXpath: function(xpathExpression, contextNode, docref) {
            /// <summary>Selects nodes from the DOM using an Xpath expression.</summary>
            /// <param name="xpathExpression" type="String">An Xpath expression as a string</param>
            /// <param name="contextNode" type="DOM Node">Optional. The node which is to serve as the root
            /// for the supplied Xpath expression. Defaults to the document&apos;s root node.</param>
            /// <param name="docref" type="DOM Document">Optional. A reference to the document you
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

  

