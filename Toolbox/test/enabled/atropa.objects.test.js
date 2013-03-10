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

describe("atropa.objects", function() {

    var wordsCounted = {
        "document3" : 150,
        "document1" : 300,
        "document2" : 25
    };
    
    it("must exist", function() {
        expect(atropa.objects).not.toEqual(undefined);
    });
    
    describe('convertObjectToArray', function () {
        it('must convert an object to an array of arrays', function () {
            var x = {
                "stuffing" : "cotton",
                "nose" : "button",
                "name" : "bear"
            };
            expect(
                atropa.objects.convertObjectToArray(x)
            ).toEqual(
                [["stuffing", "cotton"], ["nose", "button"], ["name", "bear"]]
            );
        });
    });
    
    describe('sort', function () {
        it('must sort object properties lexicographically by default',
            function () {
                expect(
                    atropa.objects.sort(wordsCounted)
                ).toEqual(
                    [
                        [ "document1", 300 ],
                        [ "document2", 25 ],
                        [ "document3", 150 ]
                    ]
                );
            }
        );
        
        it('must sort object properties using the given sort function',
            function () {
                
                function valSort(a, b) {
                    return a[1] - b[1];
                }
                
                function propSort(a, b) {
                    return a[0].localeCompare(b[0]);
                }
                
                expect(
                    atropa.objects.sort(wordsCounted, valSort)
                ).toEqual([
                    ["document2", 25],
                    ["document3", 150],
                    ["document1", 300]
                ]);
                
                expect(
                    atropa.objects.sort(wordsCounted, propSort)
                ).toEqual([
                    ["document1", 300],
                    ["document2", 25],
                    ["document3", 150]
                ]);
            }
        );
    });
    
    describe('sortValues', function () {
        it("must sort an objects properties by values using the given " +
            'sort function',
            function () {
                function sortFn(a, b) {
                    return a - b;
                }
                expect(
                    atropa.objects.sortValues(wordsCounted, sortFn)
                ).toEqual(
                    [["document2", 25], ["document3", 150], ["document1", 300]]
                );
            }
        );
    });
    
    describe('sortProperties', function () {
        it("must sort an objects properties using the given " +
            'sort function',
            function () {
                function sortFn(a, b) {
                    return a.localeCompare(b);
                }
                expect(
                    atropa.objects.sortProperties(wordsCounted, sortFn)
                ).toEqual(
                    [["document1", 300], ["document2", 25], ["document3", 150]]
                );
            }
        );
    });
    
    describe('sortValuesNumerically', function () {
        it("must sort an objects properties by values numerically",
            function () {
                expect(
                    atropa.objects.sortValuesNumerically(wordsCounted)
                ).toEqual(
                    [["document2", 25], ["document3", 150], ["document1", 300]]
                );
            }
        );
    });
    
    describe('sortValuesAlphabetically', function () {
        it("must sort an objects properties by values lexicographically",
            function () {
                var wordsCounted = {
                    "3" : "Document A",
                    "2" : "Document Z",
                    "1" : "Document M"
                };
                expect(
                    atropa.objects.sortValuesAlphabetically(wordsCounted)
                ).toEqual(
                    [["3", "Document A"], ["1", "Document M"], ["2", "Document Z"]]
                );
            }
        );
    });
    
    describe('sortPropertiesNumerically', function () {
        it("must sort an objects properties numerically",
            function () {
                var wordsCounted = {
                    "3" : "Document A",
                    "2" : "Document Z",
                    "1" : "Document M"
                };
                expect(
                    atropa.objects.sortPropertiesNumerically(wordsCounted)
                ).toEqual(
                    [["1", "Document M"], ["2", "Document Z"], ["3", "Document A"]]
                );
            }
        );
    });
    
    describe('sortPropertiesAlphabetically', function () {
        it("must sort an objects properties lexicographically",
            function () {
                var wordsCounted = {
                    "Document A" : "2",
                    "Document Z" : "1",
                    "Document M" : "3"
                };
                expect(
                    atropa.objects.sortPropertiesAlphabetically(wordsCounted)
                ).toEqual(
                    [["Document A", "2"], ["Document M", "3"], ["Document Z", "1"]]
                );
            }
        );
    });
});


