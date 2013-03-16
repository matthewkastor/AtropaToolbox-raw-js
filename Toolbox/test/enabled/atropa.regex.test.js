"use strict";
/*jslint
    indent: 4,
    maxerr: 50,
    white: true,
    browser: true,
    vars: true,
    regexp: true
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

describe("atropa.regex", function() {

    it("must exist", function() {
        expect(atropa.regex).not.toEqual(undefined);
    });
    
    describe('appendPrefixesAndSuffixes', function () {
        it('must append common prefix, suffix and word boundary to given word',
            function () {
                expect(
                    atropa.regex.appendPrefixesAndSuffixes('aaaaa').length
                ).toBeGreaterThan(20);
            }
        );
        
        it('must not append prefixes and suffixes if given word is ' +
                'shorter than the given threshold',
            function () {
                expect(
                    atropa.regex.appendPrefixesAndSuffixes('aaaaa', 5)
                ).toEqual('\\b()aaaaa()\\b');
            }
        );
    });
});


