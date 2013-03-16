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

describe("atropa.Babbler", function() {
    var babbler;
    it("must exist", function() {
        expect(atropa.Babbler).not.toEqual(undefined);
    });
        
    try {
        babbler = new atropa.Babbler();
        
        describe('class is supported in this environment', function () {
            beforeEach(function () {
                babbler = new atropa.Babbler();
            });
            
            describe('set/get/reset WordCount', function () {
                it('must set and retreive the word count', function () {
                    expect(babbler.setWordCount(100)).toEqual(100);
                    expect(babbler.getWordCount()).toEqual(100);
                    expect(babbler.resetWordCount(200)).toEqual(200);
                    expect(babbler.getWordCount()).toEqual(200);
                });
            });
            
            describe('generateWord', function () {
                it('must generate a random word', function () {
                    expect(babbler.generateWord(2,2).length).toEqual(2);
                    expect(babbler.generateWord(5,5).length).toEqual(5);
                    expect(babbler.generateWord(10,10).length).toEqual(10);
                    expect(babbler.generateWord(30,30)).toMatch(/[a-z]{30}/);
                });
            });
            describe('punctuate', function () {
                it('must generate random punctuation', function () {
                    expect(babbler.punctuate()).toMatch(/(\.|!|\?)/);
                    expect(babbler.punctuate()).toMatch(/(\.|!|\?)/);
                    expect(babbler.punctuate()).toMatch(/(\.|!|\?)/);
                    expect(babbler.punctuate()).toMatch(/(\.|!|\?)/);
                    expect(babbler.punctuate()).toMatch(/(\.|!|\?)/);
                });
            });
            describe('generateSentence', function () {
                it('must generate a random sentence', function () {
                    expect(
                        atropa.string.countWords(babbler.generateSentence(5,5))
                    ).toEqual(5);
                    expect(
                        babbler.generateSentence(50,50)
                    ).toMatch(/[a-zA-Z ]+(\.|!|\?)/);
                    
                });
            });
            describe('get/set/reset babble', function () {
                it('must get/set/reset the babble', function () {
                    expect(babbler.setBabble('babble set')).toEqual('babble set');
                    expect(babbler.getBabble()).toEqual('babble set');
                    expect(babbler.resetBabble()).toEqual('');
                    expect(babbler.getBabble()).toEqual('');
                });
            });
            describe('generateBabble', function () {
                it('must generate babble', function () {
                    expect(babbler.generateBabble()).toMatch(/[a-zA-Z ]+(\.|!|\?)/)
                });
            });
            
        });
    } catch (e) {
        describe('class is not supported in this environment', function () {
            
            it('must throw "[...] is not supported in this environment"',
                function () {
                    function x () {
                        try {
                            var y = new atropa.Babbler();
                        } catch (e) {
                            return e;
                        }
                    }
                    expect(x()).toMatch(/is not supported in this environment/);
                }
            );
            
            it('must set atropa.data.Babbler.support to "unsupported"',
                function () {
                    expect(
                        atropa.data.Babbler.support
                    ).toEqual(
                        'unsupported'
                    );
                }
            );
            
        });
    }
    
});


