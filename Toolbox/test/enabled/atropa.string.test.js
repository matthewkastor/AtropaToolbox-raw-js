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

describe("atropa.string", function() {

    it("must exist", function() {
        expect(atropa.string).not.toEqual(undefined);
    });
    
    describe('ucFirst', function () {
        it('must capitalize the first letter of the given string', function () {
            expect(atropa.string.ucFirst('wee')).toEqual('Wee');
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


