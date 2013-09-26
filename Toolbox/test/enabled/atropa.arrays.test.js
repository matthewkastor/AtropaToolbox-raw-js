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
    expect
*/
// end header

describe('atropa.arrays', function () {
    var aa = atropa.arrays;
    
    it('must exist', function () {
        expect(atropa.arrays).not.toEqual(undefined);
    });
    
    describe('match', function () {
        
        var obj = {"aProp" : "aValue"};
        
        it('returns true if elements in both arrays are in the same ' +
            'order and are strictly equal to one another',
            function () {
                expect(aa.match([obj], [obj])).toEqual(true);
                expect(aa.match([1,2], [1,2])).toEqual(true);
                expect(aa.match(['apple'], ['apple'])).toEqual(true);
            }
        );
        it('returns false if elements in both arrays are not in the same ' +
            'order or are not strictly equal to one another',
            function () {
                expect(aa.match(['1'], [1])).toEqual(false);
                expect(aa.match([2], [1])).toEqual(false);
                expect(aa.match([1,2], [2,1])).toEqual(false);
            }
        );
        it('returns false when comparing arrays containing object literals ' +
            'because object literals are neither strictly equal to ' +
            'one another nor to other objects',
            function () {
                expect(aa.match([{"aProp" : "aValue"}],
                        [{"aProp" : "aValue"}])).toEqual(false);
                expect(aa.match([{"aProp" : "aValue"}], [obj])).toEqual(false);
            }
        );
    });

    describe('subtract', function () {
        it('returns an array consisting of all elements of the minuend not ' +
            'found in the subtrahend',
            function () {
                expect(aa.subtract([1,2], [1,1,3,3])).toEqual([3,3]);
            }
        );
        it('will not remove corresponding object literals because they are ' +
            'distinctly different objects',
            function () {
                expect(
                    aa.subtract([{"aProp" : "aVal"}], [{"aProp" : "aVal"}])
                ).toEqual(
                    [{"aProp" : "aVal"}]
                );
            }
        );
        it('will not remove object literals corresponding to object ' +
            'references because they are distinct objects',
            function () {
                var obj = {'aProp' : 'aVal'};
                expect(
                    aa.subtract([obj], [{"aProp" : "aVal"}])
                ).toEqual(
                    [{"aProp" : "aVal"}]
                );
            }
        );
        it('will remove object references that point to the same object',
            function () {
                var obj = {'aProp' : 'aVal'};
                expect(aa.subtract([obj], [obj])).toEqual([]);
            }
        );
    });

    describe('intersect', function () {
        it('returns an array containing an element corresponding to each ' +
            'set of matching elements found in the arrays',
            function () {
                expect(aa.intersect([1,3,4], [3,1,5])).toEqual([1,3]);
            }
        );
        it('does not return an array of unique values',
            function () {
                expect(aa.intersect([1,1,3,4], [3,1,1,5])).toEqual([1,1,3]);
            }
        );
        it('considers object references pointing to the same object to be an ' +
            'intersection',
            function () {
                var obj = {'aProp' : 'aVal'};
                expect(
                    aa.intersect([1,3,obj], [3,1,obj])
                ).toEqual(
                    [1,3,{"aProp" : "aVal"}]
                );
            }
        );
        it('does not consider object literals and references with ' +
            'identical definitions to be an intersection',
            function () {
                var obj = {'aProp' : 'aVal'};
                expect(
                    aa.intersect([1,3,{"aProp" : "aVal"}], [3,1,obj])
                ).toEqual([1,3]);
            }
        );
        
        it('does not consider identical object literals to be an intersection',
            function () {
                expect(
                    aa.intersect([1,3,{"aProp" : "aVal"}],
                        [3,1,{"aProp" : "aVal"}])
                ).toEqual(
                    [1,3]
                );
            }
        );
    });

    describe('getFrequency', function () {
        it('returns an object whose keys correspond to unique values from ' +
            'the given array and whose values are a count of the number of ' +
            'occurrences of that unique value', function () {
                expect(
                    aa.getFrequency([1,1,1,1,1,3,3])
                ).toEqual(
                    {"1": 5,"3": 2}
                );
            });
        it('considers everything in terms of string values so all given ' +
            'objects are regarded as an occurrence of "[object Object]"',
            function () {
                expect(
                    aa.getFrequency(
                        [1,3,{"aProp" : "aVal"},{},{"aDoughnut" : "sprinkles"}])
                ).toEqual({"1": 1,"3": 1,"[object Object]": 3});
            }
        );
    });

    describe('getUnique', function () {
        it('returns an array of strings corresponding to the unique elements ' +
            'of the given array', function () {
                expect(
                    aa.getUnique([1,1,1,4,4,3,6])
                ).toEqual([ "1", "3", "4", "6" ]);
            }
        );
        
        it('considers everything in terms of string values so all given ' +
            'objects are regarded as an occurrence of "[object Object]"',
            function () {
                expect(
                    aa.getUnique(
                        [
                            "bill",
                            {"aProp":"aValue"},
                            {"aGuy":"fred"},
                            {"aLady":"jane"}
                        ]
                    )
                ).toEqual([ "[object Object]", "bill" ]);
            }
        );
    });

    describe('removeEmptyElements', function () {
        it('returns an array of non empty elements from the given array',
            function () {
                expect(aa.removeEmptyElements([ 10, , 5, "", '', 7])
                ).toEqual([10, 5, 7]);
            }
        );
        it('does not remove elements explicitly set to undefined or null',
            function () {
                expect(aa.removeEmptyElements([ null, undefined ])
                ).toEqual([null, undefined]);
            }
        );
        it('does remove deleted elements',
            function () {
                var x;
                x = ['a','b'];
                delete x[0];
                expect(x.length).toEqual(2);
                expect(x).toEqual([undefined,'b']);
                x = aa.removeEmptyElements(x);
                expect(x.length).toEqual(1);
                expect(x).toEqual(['b']);
                
            }
        );
    });

    describe('reindex', function () {
        var x;
        x = [ "a", "b", "c", undefined, null ];
        it('returns an array whose keys are contiguous and whose elements ' +
            'correspond to the elements of the given array which have not ' +
            'been deleted',
            function () {
                delete x[1];
                expect(x).toEqual([ "a", undefined, "c", undefined, null ]);
                x = aa.reindex(x);
                expect(x).toEqual([ "a", "c", undefined, null ]);
            }
        );
    });

    describe('sortNumerically', function () {
        it('sorts arrays composed of numeric elements numerically',
            function () {
                expect(
                    aa.sortNumerically(
                        [3, 2, 9, 26, 10, 1, 99, 15])
                ).toEqual([ 1, 2, 3, 9, 10, 15, 26, 99 ]);
            }
        );
    });

    describe('sortAlphabetically', function () {
        it('throws an error',
            function () {
                expect(function () {
                    aa.sortAlphabetically(
                        ['Z','a', '1', '2', '10', 'A', 'z'])
                }).toThrow("String.prototype.localeCompare is not standardized");
            }
        );
    });
    
    describe('deleteElement', function () {
        it('Returns an array with the element removed, contiguous keys, and ' +
            'whose length is 1 less than the input array',
            function () {
                var x = ['a', 'b', 'c'];
                expect(x.length).toEqual(3);
                x = aa.deleteElement(x, 1);
                expect(x).toEqual(['a','c']);
                expect(x.length).toEqual(2);
            }
        );
    });
});


