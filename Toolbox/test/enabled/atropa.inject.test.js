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
// end header

describe("atropa.inject", function() {
    
    it("must exist", function() {
        expect(atropa.inject).not.toEqual(undefined);
    });
    
    try {
        
        atropa.supportCheck('inject');
        
        describe('class is supported in this environment', function () {
            
            describe('element', function () {
                var el,
                    settings = {};
                
                beforeEach(function () {
                    el = '';
                    settings = {
                        'elementType'  : 'div',
                        'docref'       : document,
                        'parentNod'    : document.body,
                        'attributes'   : { 'id': 'myId' },
                        'onloadHandler': null,
                        'callback'     : null
                    };
                });
                
                it("must be able to inject an element of a specific type " +
                        "with user defined attributes and return a reference " +
                        "to the element",
                    function() {
                        
                        settings.attributes.id = 'test1';
                        
                        el = atropa.inject.element (
                            settings.elementType,
                            settings.docref,
                            settings.parentNod,
                            settings.attributes,
                            settings.onloadHandler,
                            settings.callback
                        );
                        
                        expect(
                            el
                        ).toEqual(
                            document.getElementById(settings.attributes.id)
                        );
                        
                        expect(el.tagName.toLowerCase()).toEqual('div');
                    }
                );
                
                it("must be able to target a specific document and default " +
                        "to targeting the body element", function() {
                    var frame, frameDoc;
                    
                    runs(function () {
                        settings.attributes.id = 'test2frame';
                        settings.attributes.width = '0px';
                        settings.attributes.height = '0px';
                        
                        frame = atropa.inject.element (
                            'iframe',
                            settings.docref,
                            settings.parentNod,
                            settings.attributes,
                            settings.onloadHandler,
                            settings.callback
                        );
                    });
                    
                    waitsFor(
                        function () {
                            var frame;
                            frame = document.getElementById(
                                settings.attributes.id);
                            if(frame) {
                                if(frame.contentWindow.document) {
                                    return true;
                                }
                            }
                            return false;
                        },
                        'The document object of the frame should be accessible',
                        1000
                    );
                    
                    runs(function () {
                        
                        settings.attributes.id = 'test2div';
                        
                        el = atropa.inject.element (
                            settings.elementType,
                            frame.contentWindow.document,
                            null,
                            settings.attributes,
                            settings.onloadHandler,
                            settings.callback
                        );
                        
                        frameDoc = frame.contentWindow.document;
                        expect(
                            frameDoc.getElementById(
                                settings.attributes.id
                            )
                        ).toEqual(
                            el
                        );
                    });
                    
                });
                
                it("must be able to target a specific element / parent node",
                    function() {
                        
                        settings.attributes.id = 'test3';
                        settings.parentNod = document.getElementById('test1');
                        
                        el = atropa.inject.element (
                            settings.elementType,
                            settings.docref,
                            settings.parentNod,
                            settings.attributes,
                            settings.onloadHandler,
                            settings.callback
                        );
                        
                        expect(
                            document.getElementById('test3').parentNode
                        ).toEqual(
                            document.getElementById('test1')
                        );
                    }
                );
                
                it("must be able to set an onload handler on the injected " +
                        "element",
                    function() {
                        var handled = false;
                        
                        settings.elementType = 'iframe';
                        settings.attributes.id = 'test4';
                        settings.attributes.width = '0px';
                        settings.attributes.height = '0px';
                        settings.onloadHandler = function () {
                            handled = true;
                        };
                        
                        runs(function () {
                            el = atropa.inject.element (
                                settings.elementType,
                                settings.docref,
                                settings.parentNod,
                                settings.attributes,
                                settings.onloadHandler,
                                settings.callback
                            );
                        });
                        
                        waitsFor(
                            function () {
                                return handled;
                            },
                            'The onload function must be called',
                            250
                        );
                        
                        runs(function () {
                            expect(handled).toEqual(true);
                        });
                        
                    }
                );
                
                it("must feed the element to a callback function just prior " +
                        "to appending the element to the page",
                    function() {
                        var callbackFired = false;
                        
                        settings.attributes.id = 'test5';
                        settings.callback = function (element) {
                            callbackFired = (
                                element.nodeName.toLowerCase() === 'div'
                            );
                        };
                        runs(function () {
                            el = atropa.inject.element (
                                settings.elementType,
                                settings.docref,
                                settings.parentNod,
                                settings.attributes,
                                settings.onloadHandler,
                                settings.callback
                            );
                        });
                        
                        waitsFor(
                            function () {
                                return callbackFired;
                            },
                            'The callback must receive a reference to the ' +
                                'injected element',
                            1000
                        );
                        
                        runs(function () {
                            expect(callbackFired).toEqual(true);
                        });
                    }
                );
                
            });
            
            describe('hiddenFrame', function () {
                var el,
                    settings = {},
                    handled = false,
                    callbackFired = false;
                
                beforeEach(function () {
                    el = '';
                    handled = false;
                    callbackFired = false;
                    settings = {
                        'id'           : null,
                        'srcURL'       : document.location.protocol + "//" + document.location.hostname,
                        'docref'       : null,
                        'onloadHandler': null,
                        'parentNod'    : null,
                        'callback'     : null
                    };
                });
                
                it("must return a reference to the injected frame",
                    function() {
                        settings.id = 'injectHiddenFrame1';
                        el = atropa.inject.hiddenFrame(
                            settings.id,
                            settings.srcURL,
                            settings.docref,
                            settings.onloadHandler,
                            settings.parentNod,
                            settings.callback
                        );
                        expect(
                            el.src.replace(/\/$/, '')
                        ).toEqual(
                            settings.srcURL.replace(/\/$/, '')
                        );
                        expect(
                            document.getElementById(
                                settings.id).getAttribute('id')
                        ).toEqual(
                            settings.id
                        );
                        expect(el.tagName.toLowerCase()).toEqual('iframe');
                    }
                );
                
                it("must append the frame to the given parent node",
                    function() {
                        settings.id = 'injectHiddenFrame2';
                        settings.parentNod = document.body;
                        el = atropa.inject.hiddenFrame(
                            settings.id,
                            settings.srcURL,
                            settings.docref,
                            settings.onloadHandler,
                            settings.parentNod,
                            settings.callback
                        );
                        expect(
                            el.parentNode
                        ).toEqual(
                            settings.parentNod
                        );
                    }
                );
                
                it("must set the onload handler of the injected frame",
                    function() {
                        runs(function () {
                            settings.id = 'injectHiddenFrame3';
                            settings.onloadHandler = function () {
                                handled = true;
                            };
                            el = atropa.inject.hiddenFrame(
                                settings.id,
                                settings.srcURL,
                                settings.docref,
                                settings.onloadHandler,
                                settings.parentNod,
                                settings.callback
                            );
                        });
                        
                        waitsFor(function () {
                            return handled;
                        }, 'The onload handler should fire.', 1000);
                        
                        runs(function () {
                            expect(
                                handled
                            ).toEqual(
                                true
                            );
                        });
                    }
                );
                
                it("must call the callback before injecting the frame",
                    function() {
                        runs(function () {
                            settings.id = 'injectHiddenFrame4';
                            settings.callback = function (element) {
                                callbackFired = (element.nodeType === 1);
                            };
                            el = atropa.inject.hiddenFrame(
                                settings.id,
                                settings.srcURL,
                                settings.docref,
                                settings.onloadHandler,
                                settings.parentNod,
                                settings.callback
                            );
                        });
                        
                        waitsFor(function () {
                            return callbackFired;
                        }, 'The callback should be fired', 1000);
                        
                        runs(function () {
                            expect(
                                callbackFired
                            ).toEqual(
                                true
                            );
                        });
                    }
                );
            });
            
            describe('script', function () {
                var el,
                    settings = {},
                    callbackFired = false;
                
                beforeEach(function () {
                    el = '';
                    callbackFired = false;
                    settings = {
                        'id'           : null,
                        'srcURL'       : 'Toolbox/test/dummyScript.js',
                        'docref'       : null,
                        'callback'     : null
                    };
                });
                
                it("must return a reference to the injected script",
                    function() {
                        settings.id = 'injectScript1';
                        el = atropa.inject.script(
                            settings.id,
                            settings.srcURL,
                            settings.docref,
                            settings.callback
                        );
                        expect(el.src).toMatch(settings.srcURL);
                        expect(
                            document.getElementById(
                                settings.id).getAttribute('id')
                        ).toEqual(
                            settings.id
                        );
                        expect(el.tagName.toLowerCase()).toEqual('script');
                    }
                );
                
                it("must append the script to the given document",
                    function() {
                        settings.id = 'injectScript2';
                        settings.docref = document;
                        el = atropa.inject.script(
                            settings.id,
                            settings.srcURL,
                            settings.docref,
                            settings.callback
                        );
                        expect(
                            el.ownerDocument
                        ).toEqual(
                            settings.docref
                        );
                    }
                );
                
                it("must call the callback after the script has loaded.",
                    function() {
                        runs(function () {
                            settings.id = 'injectScript3';
                            settings.callback = function () {
                                callbackFired = true;
                            };
                            el = atropa.inject.script(
                                settings.id,
                                settings.srcURL,
                                settings.docref,
                                settings.callback
                            );
                        });
                        
                        waitsFor(function () {
                            return callbackFired;
                        }, 'The callback should fire.', 1000);
                        
                        runs(function () {
                            expect(callbackFired).toEqual(true);
                            expect(dummy()).toEqual('dummy');
                        });
                    }
                );
            });
            
        });
    } catch (e) {
        describe('class is not supported in this environment', function () {
            function x () {
                atropa.supportCheck('inject');
            }
            it('it must throw an error',
                function () {
                    expect(x).toThrow('The atropa.inject class is unsupported in this environment.');
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
