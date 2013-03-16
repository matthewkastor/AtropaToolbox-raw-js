"use strict";
/*jslint
    indent: 4,
    maxerr: 50,
    white: true,
    browser: true,
    vars: true,
    setAsOptionalArgp: true
*/
/*globals
    atropa,
    describe,
    it,
    expect,
    beforeEach,
    runs,
    jasmine,
    waitsFor,
    dummy
*/
// end header

describe("atropa.url", function() {

    it("must exist", function() {
        expect(atropa.url).not.toEqual(undefined);
    });
    
    it('must return the filename part of a url', function () {
        expect(
            atropa.url.getFilename('http://example.com/afile.html')
        ).toEqual('afile.html');
    });
    
    it('must return an empty string if no filename present', function () {
        expect(
            atropa.url.getFilename('http://example.com')
        ).toEqual('');
        expect(
            atropa.url.getFilename('http://example.com/')
        ).toEqual('');
    });
    
    
});


