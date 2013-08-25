"use strict";
/*jslint
    indent: 4,
    maxerr: 50,
    white: true,
    browser: true,
    vars: true,
    stringp: true
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

describe("atropa.string", function() {

    it("must exist", function() {
        expect(atropa.string).not.toEqual(undefined);
    });
    
    describe('removeRepeatedWord', function () {
        it('must replace repeated words with a single word', function () {
            expect(atropa.string.removeRepeatedWord('wee wee x')).toEqual('wee x');
        });
        it('must replace repeated phrases with a single phrase', function () {
            expect(
                atropa.string.removeRepeatedWord('be wee wee x')
            ).toEqual('be wee x');
        });
    });
    
    describe('lineBreaksToParagraphTags', function () {
        it('must create paragraph breaks at every occurrence of two consecutive line breaks', function () {
            expect(
                atropa.string.lineBreaksToParagraphTags('n\n\nn')
            ).toEqual('<p>n</p><p>n</p>');
            expect(
                atropa.string.lineBreaksToParagraphTags('rn\r\n\r\nrn')
            ).toEqual('<p>rn</p><p>rn</p>');
            expect(
                atropa.string.lineBreaksToParagraphTags('r\r\rr')
            ).toEqual('<p>r</p><p>r</p>');
        });
    });
    
    describe('lineBreaksToBreakTags', function () {
        it('must create break tags at every line break', function () {
            expect(
                atropa.string.lineBreaksToBreakTags('rn\r\nrn\r\n')
            ).toEqual('rn<br>rn<br>');
            expect(
                atropa.string.lineBreaksToBreakTags('n\nn\n')
            ).toEqual('n<br>n<br>');
            expect(
                atropa.string.lineBreaksToBreakTags('r\rr\r')
            ).toEqual('r<br>r<br>');
        });
    });
    
    describe('normalizeEol', function () {
        it('must normalize line breaks to `\n`', function () {
            expect(
                atropa.string.normalizeEol('rn\r\nr\rn\n')
            ).toEqual('rn\nr\nn\n');
        });
    });
    
    describe('ucFirst', function () {
        it('must capitalize the first letter of the given string', function () {
            expect(atropa.string.ucFirst('wee')).toEqual('Wee');
        });
    });
    
    describe('camelize', function () {
        it('must convert the given string to camel case', function () {
            expect(
                atropa.string.camelize('get it together')
            ).toEqual('getItTogether');
        });
    });
    
    describe('countWords', function () {
        it('must count the words in the given string', function () {
            expect(atropa.string.countWords('wee wee')).toEqual(2);
        });
        it('must return 0 if the given text is undefined, null, or empty ' +
                'string',
            function () {
                expect(atropa.string.countWords('')).toEqual(0);
                expect(atropa.string.countWords(undefined)).toEqual(0);
                expect(atropa.string.countWords(null)).toEqual(0);
            }
        )
    });
    
    describe('convertEol', function () {
        it('must convert \\r\\n, \\n or \\r', function () {
            expect(atropa.string.convertEol('wee\r\n', 'e')).toEqual('weee');
            expect(atropa.string.convertEol('wee\n', 'e')).toEqual('weee');
            expect(atropa.string.convertEol('wee\r', 'e')).toEqual('weee');
        });
    });
    
    describe('offsetWhiteSpace', function () {
        it('must remove the specified quantity of leading spaces', function () {
            expect(
                atropa.string.offsetWhiteSpace('    wee', 4)
            ).toEqual('wee');
        });
    });
    
    describe('normalizeWhiteSpacePrefix', function () {
        it('must convert tabs in leading whitespace into 4 spaces',
            function () {
                expect(
                    atropa.string.normalizeWhiteSpacePrefix(' \t \twee\t')
                ).toEqual('          wee\t');
            }
        );
    });
    
    describe('normalizeWhiteSpace', function () {
        it('must convert all tabs to 4 spaces', function () {
            expect(
                atropa.string.normalizeWhiteSpace(' \t \twee\t')
            ).toEqual('          wee    ');
        });
    });
    
    describe('getOffset', function () {
        it('must count the number of leading spaces or tabs', function () {
            expect(
                atropa.string.getOffset('    wee')
            ).toEqual(4);
            expect(
                atropa.string.getOffset('\twee')
            ).toEqual(1);
            expect(
                atropa.string.getOffset('\t \twee')
            ).toEqual(1);
            expect(
                atropa.string.getOffset(' \t wee')
            ).toEqual(1);
        });
    });
    
    describe('getWords', function () {
        it('must return an array of words from the given text', function () {
            expect(
                atropa.string.getWords('wee wee wee')
            ).toEqual(['wee', 'wee', 'wee']);
        });
    });
    
    describe('escapeCdata', function () {
        it('must escape cdata tags', function () {
            expect(
                atropa.string.escapeCdata('<![CDATA[wee wee wee]]>')
            ).toEqual('<![CDATA[wee wee wee]]]]><![CDATA[>');
        });
    });

});


