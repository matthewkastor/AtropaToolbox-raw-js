"use strict";
/*jslint
    indent: 4,
    maxerr: 50,
    white: true,
    browser: true,
    vars: true,
    regexp: true
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

describe("atropa.random", function() {

    it("must exist", function() {
        expect(atropa.random).not.toEqual(undefined);
    });
    
    describe('string', function () {
        it('must return a random string of specified length when only one arg given',
            function () {
                expect(
                    atropa.random.string(25).length
                ).toEqual(
                    25
                );
            }
        );
        
        describe('character class tests', function () {
            var characterClasses = [
                'numeric',
                'caps',
                'lower',
                'alpha',
                'alphanumeric',
                'punctuation',
                'vowel',
                'consonant'
            ];
            
            characterClasses.forEach(function (characterClass) {
                var testData = atropa.random.string(25, characterClass);
                it('must return a random ' + characterClass + ' string',
                    function () {
                        expect(testData.length).toEqual(25);
                        switch (characterClass) {
                            case 'numeric' :
                                expect(testData).not.toMatch(/[^0-9]/);
                                break;
                            case 'caps' :
                                expect(testData).not.toMatch(/[^A-Z]/);
                                break;
                            case 'lower' :
                                expect(testData).not.toMatch(/[^a-z]/);
                                break;
                            case 'alpha' :
                                expect(testData).not.toMatch(/[^a-zA-Z]/);
                                break;
                            case 'alphanumeric' :
                                expect(testData).not.toMatch(/[^a-zA-Z0-9]/);
                                break;
                            case 'punctuation' :
                                expect(testData).not.toMatch(/[a-zA-Z0-9]/);
                                break;
                            case 'vowel' :
                                expect(testData).not.toMatch(/[^aeiouy]/);
                                break;
                            case 'consonant' :
                                expect(testData).not.toMatch(/[^bcdfghjklmnpqrstvwxz]/);
                                break;
                        }
                    }
                );
            });
        });
    });
    
    describe('integer', function () {
        it('must return a random number between the given max and min value',
            function () {
                expect(
                    9 < (atropa.random.integer(10, 20)) < 21
                ).toEqual(true);
            }
        );
    });
    
    describe('getPropertyName', function () {
        it('must return a random property name from the given object',
            function () {
                var d = {
                    'a' : 1,
                    'b' : 2,
                    'c' : 3
                };
                expect(
                    atropa.random.getPropertyName(d) in d
                ).toEqual(true);
            }
        );
    });
    
    describe('getArrayKey', function () {
        it('must return a random key in the given array',
            function () {
                var d = ['a', 'b', 'c'];
                var key = atropa.random.getArrayKey(d);
                var item = d[key];
                expect(
                    d.indexOf(item)
                ).toEqual(key);
            }
        );
    });
    
    describe('getArrayValue', function () {
        it('must return a random value from the given array',
            function () {
                var d = ['a', 'b', 'c'];
                var value = atropa.random.getArrayValue(d);
                var key = d.indexOf(value);
                expect(
                    d[key]
                ).toEqual(value);
            }
        );
    });
    
    describe('pullArrayElement', function () {
        it('must remove a random value from the given array and return it',
            function () {
                var d = ['a', 'b', 'c'];
                var len1 = d.length;
                var value = atropa.random.pullArrayElement(d);
                var len2 = d.length;
                expect(len1 - len2).toEqual(1);
                expect(d.indexOf(value)).toEqual(-1);
                expect(value).toMatch(/(a|b|c)/);
            }
        );
    });
    
    describe('pullProperty', function () {
        it('must remove a random property from an object and return its value',
            function () {
                var d = {
                    'a' : 'a',
                    'b' : 'b',
                    'c' : 'c'
                };
                var value = atropa.random.pullProperty(d);
                expect(value).toMatch(/(a|b|c)/);
                expect(d[value]).toEqual(undefined);
            }
        );
    });
});


