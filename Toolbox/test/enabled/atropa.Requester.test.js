"use strict";
/*jslint
    indent: 4,
    maxerr: 50,
    white: true,
    vars: true
*/
/*globals
    atropa,
    describe,
    it,
    expect,
    beforeEach,
    runs,
    waitsFor
*/
// end header

describe('atropa.Requester', function () {
    var requester;
    
    it('must exist', function () {
        expect(atropa.Requester).not.toEqual(undefined);
    });
    
    try {
        requester = new atropa.Requester();
        
        describe('class is supported in this environment', function () {
            
            describe('makeRequest', function () {
                it('must throw an error when given improper argument types',
                    function () {
                        function thrower() {
                            requester.makeRequest({},'','',function () {});
                        }
                        expect(thrower).toThrow('atropa.Requester.' +
                            'makeRequest unexpected argument type');
                    }
                );
                it('must make an XMLHttpRequest', function () {
                    var stat = false;
                    var requestStatus;
                    var requestData;
                    runs(function () {
                        requester.makeRequest(
                            'GET',
                            'Toolbox/test/dummyScript.js',
                            null,
                            function (status, data) {
                                stat = true;
                                requestStatus = status;
                                requestData = data;
                            }
                        );
                    });
                    
                    waitsFor(function () {
                        return stat;
                    }, 'The request should be successful', 1000);
                    
                    runs(function () {
                        expect(requestStatus).toEqual(true);
                        expect(requestData.responseText).toMatch(
                            /atropa\.Requester/);
                    });
                });
                
            });
            
        });
    } catch (e) {
        describe('class is not supported in this environment', function () {
            function x () {
                requester = new atropa.Requester();
            }
            it('must throw "[...] is not supported in this environment"',
                function () {
                    expect(x).toThrow('The atropa.Requester class is unsupported in this environment.');
                }
            );
            it('must set atropa.data.Requester.support to "unsupported"',
                function () {
                    expect(
                        atropa.data.Requester.support
                    ).toEqual(
                        'unsupported'
                    );
                }
            );
        });
    }
});