"use strict";
/*jslint
    indent: 4,
    maxerr: 50,
    white: true,
    browser: true,
    vars: true
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
    dummy,
    spyOn
*/
// end header

describe("atropa.window", function() {
    
    it("must exist", function() {
        expect(atropa.window).not.toEqual(undefined);
    });
    
    try {
        
        atropa.supportCheck('window');
        
        describe('class is supported in this environment', function () {
            var callbackFired, title, settings;
            
            describe('open', function () {
                beforeEach(function () {
                    callbackFired = false;
                    title = false;
                    
                    settings = {
                        'url' : './index.html',
                        'callback' : function (windowRef) {
                            callbackFired = true;
                        },
                        'testFn' : function (windowRef) {
                            try {
                                title = windowRef.document.getElementsByTagName('title')[0].textContent.trim();
                                return title;
                            } catch (e) {
                                return false;
                            }
                        }
                    };
                    
                    spyOn(settings, 'callback').andCallThrough();
                    spyOn(settings, 'testFn').andCallThrough();
                });
                
                it('must call the callback', function () {
                    var win;
                    settings.url = 'about:blank';
                    
                    runs(function () {
                        win = atropa.window.open(
                            settings.url,
                            settings.callback
                        );
                    });
                    
                    waitsFor(function () {
                        return callbackFired;
                    }, 'the callback did not fire', 300);
                    
                    runs(function () {
                        expect(win.document.body.nodeType).toEqual(1);
                        expect(settings.callback).toHaveBeenCalledWith(win);
                        expect(callbackFired).toEqual(true);
                        win.close();
                    });
                });
                
                it('must use the testFn if supplied', function () {
                    var win;
                    
                    runs(function () {
                        win = atropa.window.open(
                            settings.url,
                            settings.callback,
                            settings.testFn
                        );
                    });
                    
                    waitsFor(function () {
                        return callbackFired;
                    }, 'the callback did not fire', 3000);
                    
                    runs(function () {
                        expect(win.document.body.nodeType).toEqual(1);
                        expect(settings.callback).toHaveBeenCalledWith(win);
                        expect(callbackFired).toEqual(true);
                        expect(title).toEqual(
                            'AtropaToolbox\'s Raw JS'
                        );
                        win.close();
                    });
                });
            });
            
        });
    } catch (e) {
        describe('class is not supported in this environment', function () {
            it('must throw "[...] is not supported in this environment"',
                function () {
                    function x () {
                        try {
                            atropa.window.open(
                                'AtropaToolboxTests.html',
                                function () {},
                                function () {}
                            );
                        } catch (e) {
                            return e;
                        }
                    }
                    expect(x()).toMatch(/is not supported in this environment/);
                }
            );
            it('must set atropa.data.window.support to "unsupported"',
                function () {
                    expect(
                        atropa.data.window.support
                    ).toEqual(
                        'unsupported'
                    );
                }
            );
        });
    }
});
