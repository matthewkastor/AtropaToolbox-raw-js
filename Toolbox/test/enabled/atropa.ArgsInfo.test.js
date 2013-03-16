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

describe('atropa.ArgsInfo', function () {
    it('must exist', function () {
        expect(atropa.ArgsInfo).not.toEqual(undefined);
    });
    
    describe('setExpectedArgTypes', function () {
        var checker = new atropa.ArgsInfo();
        
        it('must throw when called with no arguments', function () {
            function noArgs () {
                checker.setExpectedArgTypes();
            }
            expect(noArgs).toThrow();
        });
        
    });
    
    describe('getArgTypes', function () {
        var checker, types;
        
        checker = new atropa.ArgsInfo();
        
        it('returns an empty array when input is undefined', function () {
            types = checker.getArgTypes();
            expect(types).toEqual([]);
        });
        
        it('must return an array of types of args passed in', function () {
            function d () {
                return checker.getArgTypes(arguments);
            }
            types = d({}, [], 'string');
            expect(types).toEqual(['object', 'object', 'string']);
        });
    });
    
    describe('checkArgTypes', function () {
        it('must throw if expected arg types are not set', function () {
            function d () {
                var checker = new atropa.ArgsInfo();
                checker.checkArgTypes(arguments);
            }
            expect(d).toThrow();
        });
        
        it('must throw if expected arg types ' +
            'do not exactly match given arg types',
            function () {
                function d () {
                    var checker, argTypes;
                    checker = new atropa.ArgsInfo();
                    argTypes = {"basic" : ['string', 'number']};
                    checker.setExpectedArgTypes(argTypes);
                    checker.checkArgTypes(arguments);
                }
                function e () {
                    d(10, 'wee');
                }
                expect(e).toThrow();
            }
        );
        
        it('must return the user assigned key which matches the ' +
            'arguments supplied',
            function () {
                var result;
                function d () {
                    var checker, argTypes;
                    checker = new atropa.ArgsInfo();
                    argTypes = { "basic" : ["string", "number"] };
                    checker.setExpectedArgTypes(argTypes);
                    return checker.checkArgTypes(arguments);
                }
                
                result = d('wee', 10);
                expect(result).toEqual('basic');
            }
        );
    });
});