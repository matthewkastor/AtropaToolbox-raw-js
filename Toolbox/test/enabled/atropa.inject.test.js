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
                    }
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
                        console.log(frameDoc);
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
                        
                        el = atropa.inject.element (
                            settings.elementType,
                            settings.docref,
                            settings.parentNod,
                            settings.attributes,
                            settings.onloadHandler,
                            settings.callback
                        );
                        
                        expect(false).toEqual(true);
                    }
                );
                
                it("must be able to set an onload handler on the injected " +
                        "element",
                    function() {
                        
                        settings.attributes.id = 'test4';
                        
                        el = atropa.inject.element (
                            settings.elementType,
                            settings.docref,
                            settings.parentNod,
                            settings.attributes,
                            settings.onloadHandler,
                            settings.callback
                        );
                        
                        expect(false).toEqual(true);
                    }
                );
                
                it("must feed the element to a callback function just prior" +
                        "to appending the element to the page",
                    function() {
                        
                        settings.attributes.id = 'test5';
                        
                        el = atropa.inject.element (
                            settings.elementType,
                            settings.docref,
                            settings.parentNod,
                            settings.attributes,
                            settings.onloadHandler,
                            settings.callback
                        );
                        
                        expect(false).toEqual(true);
                    }
                );
                
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
