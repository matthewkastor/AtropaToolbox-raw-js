"use strict";
describe('atropa.arrays', function () {
    var aa = atropa.arrays;
    it('must exist', function () {
        expect(atropa.arrays).not.toEqual(undefined);
    });
    
    describe('match', function () {
        it('given [1,2], [1,1,3] return false', function () {
            expect(aa.match([1,2], [1,1,3])).toEqual(false);
        });
        it('given [1,2], [1,2] return true', function () {
            expect(aa.match([1,2], [1,2])).toEqual(true);
        });
        it('given [1,2], [2,1] return false', function () {
            expect(aa.match([1,2], [2,1])).toEqual(false);
        });
        it('given [1,{"aProp" : "aValue"}], [1,{"aProp" : "aValue"}] ' +
                'return false',
            function () {
                expect(aa.match([1,{"aProp" : "aValue"}],
                    [1,{"aProp" : "aValue"}])).toEqual(false);
            }
        );
        it('given [1, obj], [1, obj] when obj = {"aProp" : "aValue"}; ' +
                'return true',
            function () {
                var obj = {"aProp" : "aValue"};
                expect(aa.match([1, obj], [1, obj])).toEqual(true);
            }
        );
    });

    describe('subtract', function () {
        it('given [1,2], [1,1,3] return [3]', function () {
            expect(aa.subtract([1,2], [1,1,3])).toEqual([3]);
        });
        it('given [1,3], [3,1] return []', function () {
            expect(aa.subtract([1,3], [3,1])).toEqual([]);
        });
        it('given [1,3], [3,1,1,9] return [9]', function () {
            expect(aa.subtract([1,3], [3,1,1,9])).toEqual([9]);
        });
        it('given [1,3,{"aProp" : "aVal"}], [3,1,{"aProp" : "aVal"}] ' +
                'return [{"aProp" : "aVal"}]',
            function () {
                expect(aa.subtract(
                    [1,3,{"aProp" : "aVal"}],
                    [3,1,{"aProp" : "aVal"}]
                )).toEqual(
                    [{"aProp" : "aVal"}]
                );
            }
        );
        it('given [1,3,obj], [3,1,{"aProp" : "aVal"}] ' +
                'where obj = {"aProp" : "aVal"} ' +
                'return [{"aProp" : "aVal"}]',
            function () {
                var obj = {'aProp' : 'aVal'};
                expect(aa.subtract(
                    [1,3,obj],
                    [3,1,{"aProp" : "aVal"}]
                )).toEqual(
                    [{"aProp" : "aVal"}]
                );
            }
        );
        it('given [1,3,obj], [3,1,obj] ' +
                'where obj = {"aProp" : "aVal"} ' +
                'return []',
            function () {
                var obj = {'aProp' : 'aVal'};
                expect(aa.subtract(
                    [1,3,obj],
                    [3,1,obj]
                )).toEqual([]);
            }
        );
    });

    describe('intersect', function () {
        it('given [1,3,4], [3,1,5] ' +
                'return [1,3]',
            function () {
                expect(aa.intersect([1,3,4], [3,1,5])).toEqual([1,3]);
            }
        );
        it('given [1,1,3,4], [3,1,1,5] ' +
                'return [1,1,3]',
            function () {
                expect(aa.intersect([1,1,3,4], [3,1,1,5])).toEqual([1,1,3]);
            }
        );
        it('given [1,3,obj], [3,1,obj] ' +
                'where obj = {"aProp" : "aVal"} ' +
                'return [1,3,{"aProp" : "aVal"}]',
            function () {
                var obj = {'aProp' : 'aVal'};
                expect(aa.intersect(
                    [1,3,obj],
                    [3,1,obj]
                )).toEqual(
                    [1,3,{"aProp" : "aVal"}]
                );
            }
        );
        it('given [1,3,{"aProp" : "aVal"}], [3,1,obj] ' +
                'where obj = {"aProp" : "aVal"} ' +
                'return [1,3]',
            function () {
                var obj = {'aProp' : 'aVal'};
                expect(aa.intersect(
                    [1,3,{"aProp" : "aVal"}], [3,1,obj]
                )).toEqual([1,3]);
            }
        );
        it('given [1,3,{"aProp" : "aVal"}], [3,1,{"aProp" : "aVal"}] ' +
                'return [1,3]',
            function () {
                expect(aa.intersect(
                    [1,3,{"aProp" : "aVal"}],
                    [3,1,{"aProp" : "aVal"}]
                )).toEqual(
                    [1,3]
                );
            }
        );
    });

    describe('getFrequency', function () {
        it('given [1,1,1,1,1,3,3] ' +
                'return {"1": 5,"3": 2}',
            function () {
                expect(aa.getFrequency(
                    [1,1,1,1,1,3,3]
                )).toEqual(
                    {"1": 5,"3": 2}
                );
            }
        );
        it('given ["bill", "fred", "fred", "jane"] ' +
                'return {"bill": 1,"fred": 2,"jane": 1}',
            function () {
                expect(aa.getFrequency(
                    ["bill", "fred", "fred", "jane"]
                )).toEqual(
                    {"bill": 1,"fred": 2,"jane": 1}
                );
            }
        );
        it('given [1,3,{"aProp" : "aVal"}] ' +
                'return {"1": 1,"3": 1,"[object Object]": 1}',
            function () {
                expect(aa.getFrequency(
                    [1,3,{"aProp" : "aVal"}]
                )).toEqual(
                    {"1": 1,"3": 1,"[object Object]": 1}
                );
            }
        );
        it('given [1,3,obj,otherObj,{"aDoughnut" : "sprinkles"}] ' +
                'where obj =  {"aProp" : "aVal"} and otherObj = {} ' +
                'return {"1": 1,"3": 1,"[object Object]": 3}',
            function () {
                var obj = {'aProp' : 'aVal'};
                var otherObj = {};
                expect(aa.getFrequency(
                    [1,3,obj,otherObj,{"aDoughnut" : "sprinkles"}]
                )).toEqual(
                    {"1": 1,"3": 1,"[object Object]": 3}
                );
            }
        );
    });

    describe('getUnique', function () {
        it('given [1,1,1,4,4,3,6] ' +
                'return [ "1", "4", "3", "6" ]',
            function () {
                expect(aa.getUnique([
                    1,1,1,4,4,3,6
                ])).toEqual([
                    "1", "3", "4", "6"
                ]);
            }
        );
        it('given ["bill", "fred", "jane", "fred"] ' +
                'return ["bill", "fred", "jane"]',
            function () {
                expect(aa.getUnique([
                    "bill", "fred", "jane", "fred"
                ])).toEqual([
                    "bill", "fred", "jane"
                ]);
            }
        );
        it('given ["bill", {"aProp":"aValue"},' +
                '{"aGuy":"fred"},{"aLady":"jane"}] ' +
                'return [ "bill", "[object Object]"]',
            function () {
            expect(aa.getUnique([ 
                "bill",
                {"aProp" : "aValue"},
                {"aGuy" : "fred"},
                {"aLady" : "jane"}
            ])).toEqual([
                "[object Object]",
                "bill"
            ]);
        });
        
    });

    describe('removeEmptyElements', function () {
        it('given [ 10, , 5, "", \'\', 7 ] return [10, 5, 7]',
            function () {
                var x = [ 10, , 5, "", '', 7 ];
                console.log('starting length ' + x.length);
                expect(x.length).toEqual(6);
                x = atropa.arrays.removeEmptyElements(x);
                expect(x.length).toEqual(3);
                expect(x).toEqual([10,5,7]);
            }
        );
    });

    describe('reindex', function () {
        it('must reindex the array', function () {
            var x = [ "a", "b", "c", undefined ];
            expect(x.length).toEqual(4);
            
            delete x[1]; // deletes the key from the array but
                         // the array length remains the same
                         // at this point the arrays keys are 0, 2, and 3
                        // [ "a", undefined, "c", undefined ]
            expect(x.length).toEqual(4);
            
            x = atropa.arrays.reindex(x);
            expect(x).toEqual([ "a", "c", undefined ]);
            expect(x.length).toEqual(3);
        });
    });

    describe('sortNumerically', function () {
        var x = [3, 2, 9, 26, 10, 1, 99, 15];
        it('must exist', function () {
            expect(
                aa.sortNumerically(x)
            ).toEqual(
                [ 1, 2, 3, 9, 10, 15, 26, 99 ]
            );
        });
    });

    describe('sortAlphabetically', function () {
        it('must exist', function () {
            var x = ['Z','a', '1', '2', '10', 'A', 'z'];
            console.log( atropa.arrays.sortAlphabetically(x) );
            // logs ["1", "10", "2", "a", "A", "z", "Z"]
            expect(aa.sortAlphabetically(x)).toEqual(["1", "10", "2", "a", "A", "z", "Z"]);
        });
    });
});


