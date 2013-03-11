"use strict";
/*jslint
    indent: 4,
    maxerr: 50,
    white: true,
    browser: true
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

describe("atropa.removeNodeByReference", function() {
    
    it("must exist", function() {
        expect(atropa.removeNodeByReference).not.toEqual(undefined);
    });
    
    try {
        
        atropa.supportCheck('removeNodeByReference');
        
        describe('class is supported in this environment', function () {
            
            it('must remove the referenced element', function () {
            
                var el = document.createElement('div');
                el.setAttribute('id', 'removeNodeByReference');
                document.body.appendChild(el);
                atropa.removeNodeByReference(el);
                
                expect(
                    document.getElementById('removeNodeByReference')
                ).toEqual(
                    undefined
                );
            });
            
        });
    } catch (e) {
        describe('class is not supported in this environment', function () {
            it('it must throw an error',
                function () {
                    function x () {
                        atropa.supportCheck('removeNodeByReference');
                    }
                    expect(x).toThrow();
                }
            );
            it('must set atropa.data.removeNodeByReference.support to ' +
                    '"unsupported"',
                function () {
                    expect(
                        atropa.data.removeNodeByReference.support
                    ).toEqual(
                        'unsupported'
                    );
                }
            );
        });
    }
});


