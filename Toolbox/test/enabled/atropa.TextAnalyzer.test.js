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

describe('atropa.TextAnalyzer', function () {
    var analyzer;
    
    it('must exist', function () {
        expect(atropa.TextAnalyzer).not.toEqual(undefined);
    });
    
    try {
        analyzer = new atropa.TextAnalyzer();
        
        describe('class is supported in this environment', function () {
            
            describe('text', function () {
                it('must return an empty string if not set on instantiation',
                    function () {
                        analyzer = new atropa.TextAnalyzer();
                        expect(analyzer.text).toEqual('');
                    }
                );
                it('must return the given string set on instantiation',
                    function () {
                        analyzer = new atropa.TextAnalyzer('dog');
                        expect(analyzer.text).toEqual('dog');
                    }
                );
            });
            
            describe('wordCount', function () {
                it('must default to 0', function () {
                    analyzer = new atropa.TextAnalyzer();
                    expect(analyzer.wordCount).toEqual(0);
                });
                it('must return the number of words in constructor text',
                    function () {
                        analyzer = new atropa.TextAnalyzer('wee wee wee wee');
                        expect(analyzer.wordCount).toEqual(4);
                        analyzer = new atropa.TextAnalyzer();
                        expect(analyzer.wordCount).toEqual(0);
                        analyzer = new atropa.TextAnalyzer('');
                        expect(analyzer.wordCount).toEqual(0);
                        analyzer = new atropa.TextAnalyzer(undefined);
                        expect(analyzer.wordCount).toEqual(0);
                        analyzer = new atropa.TextAnalyzer(null);
                        expect(analyzer.wordCount).toEqual(0);
                    }
                );
            });
            
            describe('words', function () {
                it('must default to an empty array', function () {
                    analyzer = new atropa.TextAnalyzer();
                    expect(analyzer.words).toEqual([]);
                    analyzer = new atropa.TextAnalyzer('');
                    expect(analyzer.words).toEqual([]);
                    analyzer = new atropa.TextAnalyzer(undefined);
                    expect(analyzer.words).toEqual([]);
                    analyzer = new atropa.TextAnalyzer(null);
                    expect(analyzer.words).toEqual([]);
                });
                it('must return an array of all words given', function () {
                    analyzer = new atropa.TextAnalyzer('wee wee wee wee');
                    expect(analyzer.words).toEqual(['wee', 'wee', 'wee', 'wee']);
                });
            });
            
            describe('getIndex', function () {
                it('must return an array of each unique word', function () {
                    analyzer = new atropa.TextAnalyzer('wee wee wohoo');
                    expect(analyzer.getIndex()).toEqual(['wee', 'wohoo']);
                    analyzer = new atropa.TextAnalyzer();
                    expect(analyzer.getIndex()).toEqual([]);
                    analyzer = new atropa.TextAnalyzer('');
                    expect(analyzer.getIndex()).toEqual([]);
                    analyzer = new atropa.TextAnalyzer(null);
                    expect(analyzer.getIndex()).toEqual([]);
                    analyzer = new atropa.TextAnalyzer(undefined);
                    expect(analyzer.getIndex()).toEqual([]);
                });
            });
            
            describe('getWordFrequency', function () {
                it('must return a frequency report object reflecting each ' +
                        'unique word and it\'s frequency in the given text',
                    function () {
                        analyzer = new atropa.TextAnalyzer('wee wee wohoo');
                        expect(analyzer.getWordFrequency()).toEqual(
                            { 'wee' : 2, 'wohoo' : 1 }
                        );
                        analyzer = new atropa.TextAnalyzer();
                        expect(analyzer.getWordFrequency()).toEqual({});
                        analyzer = new atropa.TextAnalyzer('');
                        expect(analyzer.getWordFrequency()).toEqual({});
                        analyzer = new atropa.TextAnalyzer(null);
                        expect(analyzer.getWordFrequency()).toEqual({});
                        analyzer = new atropa.TextAnalyzer(undefined);
                        expect(analyzer.getWordFrequency()).toEqual({});
                    }
                );
            });
            
            describe('getPhraseFrequency', function () {
                it('must default to a phrase length of 2', function () {
                    analyzer = new atropa.TextAnalyzer('wee wee wee wohoo');
                    expect(analyzer.getPhraseFrequency()).toEqual(
                        { 'wee wee' : 2, 'wee wohoo' : 1 }
                    );
                });
                it('must return an empty object if the analyzer\'s words = []',
                    function () {
                        analyzer = new atropa.TextAnalyzer();
                        expect(analyzer.getPhraseFrequency()).toEqual({});
                        analyzer = new atropa.TextAnalyzer('');
                        expect(analyzer.getPhraseFrequency()).toEqual({});
                        analyzer = new atropa.TextAnalyzer(null);
                        expect(analyzer.getPhraseFrequency()).toEqual({});
                        analyzer = new atropa.TextAnalyzer(undefined);
                        expect(analyzer.getPhraseFrequency()).toEqual({});
                    }
                );
                it('must return a frequency report object reflecting each ' +
                        'unique phrase and it\'s frequency in the given ' +
                        'text, using the given phrase length',
                    function () {
                        analyzer = new atropa.TextAnalyzer(
                            'wee wee wee wee woot woot');
                        expect(analyzer.getPhraseFrequency(3)).toEqual(
                            {
                                'wee wee wee' : 2,
                                'wee wee woot' : 1,
                                'wee woot woot' : 1
                            }
                        );
                    }
                );
            });
            
        });
    } catch (e) {
        describe('class is not supported in this environment', function () {
            function x () {
                try {
                    analyzer = new atropa.TextAnalyzer();
                } catch (e) {
                    return e;
                }
            }
            it('must throw "[...] is not supported in this environment"',
                function () {
                    expect(x()).toMatch(/is not supported in this environment/);
                }
            );
            it('must set atropa.data.TextAnalyzer.support to "unsupported"',
                function () {
                    expect(
                        atropa.data.TextAnalyzer.support
                    ).toEqual(
                        'unsupported'
                    );
                }
            );
        });
    }
});