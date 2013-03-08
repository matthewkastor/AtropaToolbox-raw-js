"use strict";
/*jslint
    indent: 4,
    maxerr: 50,
    white: true
*/
/*globals
    atropa,
    describe,
    it,
    expect,
    beforeEach,
    runs,
    jasmine,
    waitsFor
*/

describe("atropa.inject", function() {
    
    it("must exist", function() {
        expect(atropa.inject).not.toEqual(undefined);
    });
    
    try {
        
        atropa.supportCheck('inject');
        
        describe('class is supported in this environment', function () {
            
            describe('element', function () {
                it("fails", function() {
                    expect(false).toEqual(true);
                });
            });
            describe('hiddenFrame', function () {
                it("fails", function() {
                    expect(false).toEqual(true);
                });
            });
            describe('script', function () {
                it("fails", function() {
                    expect(false).toEqual(true);
                });
            });
        });
    } catch (e) {
        console.log(e);
        describe('class is not supported in this environment', function () {
            it('it must throw an error',
                function () {
                    function x () {
                        atropa.supportCheck('atropa.inject');
                    }
                    expect(x).toThrow();
                }
            );
            it('must set atropa.data.inject.support to "unsupported"',
                function () {
                    expect(
                        atropa.data.inject.support
                    ).toEqual(
                        'unsupported'
                    );
                }
            );
        });
    }
});
