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
// end header

describe("atropa.inquire", function() {
    
    it("must exist", function() {
        expect(atropa.inquire).not.toEqual(undefined);
    });
    
    describe('isNull', function () {
        it('must return true if the given value is null', function () {
            expect(
                atropa.inquire.isNull(null)
            ).toEqual(true);
        });
        it('must return false if the given value is not specified',
            function () {
                expect(
                    atropa.inquire.isNull()
                ).toEqual(false);
            }
        );
        it('must return false if the given value is an empty string',
            function () {
                expect(
                    atropa.inquire.isNull('')
                ).toEqual(false);
            }
        );
        it('must return false if the given value is undefined', function () {
            expect(
                atropa.inquire.isNull(undefined)
            ).toEqual(false);
        });
        it('must return false if the given value is an empty object',
            function () {
                expect(
                    atropa.inquire.isNull({})
                ).toEqual(false);
            }
        );
    });
    
    describe('isObject', function () {
        it('must return true if given value is an object', function () {
            [
                {},
                null,
                new Object(null)
            ].forEach(function (item) {
                expect(atropa.inquire.isObject(item)).toEqual(true);
            });
        });
        it('must return false if given value is not an object', function () {
            [
                '',
                1,
                undefined,
                true,
                false,
                function () {},
                String('wee' + 1)
            ].forEach(function (item) {
                expect(atropa.inquire.isObject(item)).toEqual(false);
            });
        });
    });
    
    describe('isObjectNotNull', function () {
        it('Must return true if given value is an object and is not null',
            function () {
                expect(atropa.inquire.isObjectNotNull({})).toEqual(true);
            }
        );
        it('Must return false if given value is null', function () {
            expect(atropa.inquire.isObjectNotNull(null)).toEqual(false);
        });
        it('must return false if given value is not an object', function () {
            expect(atropa.inquire.isObjectNotNull('')).toEqual(false);
        });
    });
    
    describe('hasProperty', function () {
        it('must return true if the property exists regardless of whether it' +
                'was inherited or not',
            function () {
                expect(
                    atropa.inquire.hasProperty({}, 'toString')
                ).toEqual(true);
            }
        );
        it('must return false if the property does not exist', function () {
            expect(atropa.inquire.hasProperty({}, 'mashPotato')).toEqual(false);
        });
        it('must return false if the given object is null', function () {
            expect(atropa.inquire.hasProperty(null, 'toString')).toEqual(false);
        });
    });
    
    describe('isEmptyString', function () {
        it('must return true when given an empty string', function () {
            expect(atropa.inquire.isEmptyString('')).toEqual(true);
            expect(atropa.inquire.isEmptyString(String())).toEqual(true);
        });
        it('must return false when given undefined', function () {
            expect(atropa.inquire.isEmptyString(undefined)).toEqual(false);
        });
        it('must return false when given null', function () {
            expect(atropa.inquire.isEmptyString(null)).toEqual(false);
        });
        it('must return false when given false', function () {
            expect(atropa.inquire.isEmptyString(false)).toEqual(false);
        });
        it('must return false when given nothing', function () {
            expect(atropa.inquire.isEmptyString()).toEqual(false);
        });
    });
    
});