atropa.test.tests.CreateHtmlDocumentsFromXmlhttp = function () {
    "use strict";
    var method, url, callback, docs;
    
    // HTTP Request method
    method = 'get';
    
    // the page to fetch, this page must be accessible
    // security restrictions may apply
    url = 'docs/jsdoc/symbols/atropa.xpath.html';
    
    // the callback funtion for when a new document is created
    callback = function newDocumentHandler(docref) {
        try {
            if (false === docref) {
                // if the document could not be created the test fails
                throw new atropa.TestFailureError(
                    'atropa.CreateHtmlDocumentsFromXmlhttp',
                    'Could not create hidden document');
            } else {
                // if the document could be created we'll try to access it
                if(docref.getElementById('index')) {
                    // if the document could be accessed and we've found
                    // an element we expected to find then the test passes
                    atropa.test.results.pass.push(
                        ['atropa.CreateHtmlDocumentsFromXmlhttp','']);
                } else {
                    // if the document could not be accessed or the element
                    // we're looking for was not present then the test fails
                    throw new atropa.TestFailureError(
                        'atropa.CreateHtmlDocumentsFromXmlhttp',
                        'could not use the hidden document');
                }
            }
        } catch (e) {
            // catching any errors thrown and handle them.
        }
        // after the test has run log the results to the console.
        atropa.test.functions.done();
    };
    
    // create an instance of the class
    docs = new atropa.CreateHtmlDocumentsFromXmlhttp();
    // try to create a new hidden document
    docs.newDocument(method, url, null, callback);
};


