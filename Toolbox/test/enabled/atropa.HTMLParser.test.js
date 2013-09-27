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
    beforeEach
*/
// end header

describe('atropa.HTMLParser', function () {
    var parser;
    
    it('must exist', function () {
        expect(atropa.HTMLParser).not.toEqual(undefined);
    });
    
    try {
        parser = new atropa.HTMLParser();
        
        describe('class is supported in this environment', function () {
            beforeEach(function () {
                parser = new atropa.HTMLParser();
            });
            
            describe('doc', function () {
                it('must have an initial doc property with a valid document object',
                    function () {
                        expect(parser.doc.nodeType).toEqual(9);
                    }
                );
            });
            
            describe('newDocument', function () {
                it('must return a new valid document', function () {
                    parser.doc = '';
                    expect(parser.doc).toEqual('');
                    expect(parser.newDocument().nodeType).toEqual(9);
                });
                
                it('must reset the current document stored in doc', function () {
                    parser.doc = '';
                    expect(parser.doc).toEqual('');
                    parser.newDocument();
                    expect(parser.doc.nodeType).toEqual(9);
                });
                
                it('must produce a document which may be manipulated', function () {
                    parser.newDocument();
                    function make(element) {
                        return parser.doc.createElement(element);
                    }
                    function append(element) {
                        parser.doc.documentElement.appendChild(element);
                    }
                    var p = make('p');
                    p.textContent = 'test';
                    parser.doc.appendChild(make('HTML'));
                    append(make('head'));
                    append(make('body'));
                    parser.doc.body.appendChild(p);
                    expect(parser.doc.body.firstChild.textContent).toEqual('test');
                });
            });
            
            describe('loadString', function () {
                it('must return false if no argument is supplied', function () {
                    expect(parser.loadString()).toEqual(false);
                });
                
                it('must reset the current document stored in doc', function () {
                    parser.doc = '';
                    expect(parser.doc).toEqual('');
                    parser.loadString('xd');
                    expect(parser.doc.nodeType).toEqual(9);
                });
                
                it('must load the given string into the document', function () {
                    parser.loadString('<head></head><body><p>test</p></body>');
                    expect(parser.doc.body.textContent).toEqual('test');
                });
                
                it('must return a new valid document with the given string loaded ' +
                    'into it',
                    function () {
                        expect(
                            parser.loadString(
                                '<head></head><body><p>test</p></body>'
                            ).body.textContent
                        ).toEqual('test');
                    }
                );
            });
        });
    } catch (e) {
        describe('class is not supported in this environment', function () {
            function x () {
                parser = new atropa.HTMLParser();
            }
            it('must throw if class is not supported in this environment',
                function () {
                    expect(x).toThrow('The atropa.HTMLParser class is unsupported in this environment.');
                }
            );
            it('must set atropa.data.HTMLParser.support to "unsupported"',
                function () {
                    expect(
                        atropa.data.HTMLParser.support
                    ).toEqual(
                        'unsupported'
                    );
                }
            );
        });
    }
});