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

describe("atropa.setAsOptionalArg", function() {

    it("must exist", function() {
        expect(atropa.setAsOptionalArg).not.toEqual(undefined);
    });
    
    it('must return the default if option is undefined or null', function () {
        expect(
            atropa.setAsOptionalArg('default', undefined)
        ).toEqual('default');
        expect(
            atropa.setAsOptionalArg('default', null)
        ).toEqual('default');
        expect(
            atropa.setAsOptionalArg('default')
        ).toEqual('default');
    });
    
    it('must return the option if it is not undefined or null', function () {
        expect(
            atropa.setAsOptionalArg('default', 'option')
        ).toEqual('option');
    });
});


