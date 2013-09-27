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
    spyOn
*/
// end header

describe("atropa.wtf", function() {

    it("must exist", function() {
        expect(atropa.wtf).not.toEqual(undefined);
    });
    
    describe('wtfify', function () {
        
        try {
            
            atropa.wtf.wtfify('I am the bestest poet ever.');
            
            describe('class is supported in this environment', function () {
                it('must wtfify the given text', function () {
                    var out = atropa.wtf.wtfify('I am...\r\n.');
                    
                    expect(out.wtfCount).toEqual(2);
                    expect(out.wordCount).toEqual(3);
                    expect(out.score).toEqual(2 / 3);
                    expect(out.txt).toMatch(/Kevin are \[shit taco\]/);
                });
                
                it('must output html markup if specified', function () {
                    var out = atropa.wtf.wtfify('I am...\r\n.', true);
                    
                    expect(out.wtfCount).toEqual(2);
                    expect(out.wordCount).toEqual(3);
                    expect(out.score).toEqual(2 / 3);
                    expect(out.txt).toMatch(/<p/);
                    expect(out.txt).toMatch(/<span style/);
                    expect(out.txt).toMatch(/<br/);
                    expect(out.txt).toMatch(/\[shit taco\]/);
                    expect(out.txt).toMatch(/Kevin/);
                });
            });
        } catch (e) {
            describe('class is not supported in this environment', function () {
                it('must throw "[...] is not supported in this environment"',
                    function () {
                        function x () {
                            try {
                                atropa.wtf.wtfify('I am the bestest poet ever.');
                            } catch (e) {
                                return e;
                            }
                        }
                        expect(x()).toMatch(/is not supported in this environment/);
                    }
                );
                it('must set atropa.data.wtf.support to "unsupported"',
                    function () {
                        expect(
                            atropa.data.wtf.support
                        ).toEqual(
                            'unsupported'
                        );
                    }
                );
            });
        }
        
    });
    
    describe('htmlElement', function () {
        
        try {
            
            atropa.supportCheck('wtfHtmlElement');
            
            describe('class is supported in this environment', function () {
                
                it('must return a reference to the given element', function () {
                    var el = document.createElement('div');
                    el.textContent = 'I am...\r\n.';
                    expect(atropa.wtf.htmlElement(el)).toEqual(el);
                });
                
                it('must wtfify the given DIV element', function () {
                    var el = document.createElement('div');
                    el.textContent = 'I am...\r\n.';
                    el = atropa.wtf.htmlElement(el);
                    expect(el.innerHTML).toMatch(/<p/);
                    expect(el.innerHTML).toMatch(/<span style/);
                    expect(el.innerHTML).toMatch(/<br/);
                    expect(el.innerHTML).toMatch(/\[shit taco\]/);
                    expect(el.innerHTML).toMatch(/Kevin/);
                });
                it('must wtfify the given TEXTAREA element', function () {
                    var el = document.createElement('textarea');
                    el.textContent = 'I am...\r\n.';
                    el = atropa.wtf.htmlElement(el);
                    expect(el.innerHTML).toMatch(/&lt;p/);
                    expect(el.innerHTML).toMatch(/&lt;span style/);
                    expect(el.innerHTML).toMatch(/&lt;br/);
                    expect(el.innerHTML).toMatch(/\[shit taco\]/);
                    expect(el.innerHTML).toMatch(/Kevin/);
                });
            });
        } catch (e) {
            describe('class is not supported in this environment', function () {
                function x () {
                    atropa.wtf.htmlElement('I am the bestest poet ever.');
                }
                it('must throw "[...] is not supported in this environment"',
                    function () {
                        expect(x).toThrow('The atropa.wtfHtmlElement class is unsupported in this environment.');
                    }
                );
                it('must set atropa.data.wtfHtmlElement.support to "unsupported"',
                    function () {
                        expect(
                            atropa.data.wtfHtmlElement.support
                        ).toEqual(
                            'unsupported'
                        );
                    }
                );
            });
        }
        
    });
    
});


