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

describe('atropa.customErrors.InvalidArgumentTypesError', function () {
    var errInstance = new atropa.customErrors.InvalidArgumentTypesError();
    it('must exist', function () {
        expect(atropa.customErrors.InvalidArgumentTypesError).not.toEqual(undefined);
    });
    
    it('has a default name of "atropa.customErrors.InvalidArgumentTypesError"',
        function () {
            expect(
                errInstance.name
            ).toEqual(
                'atropa.customErrors.InvalidArgumentTypesError'
            );
        }
    );
    
    it('has a default message of "InvalidArgumentTypesError"', function () {
        expect(errInstance.message).toEqual('InvalidArgumentTypesError');
    });
    
    it('allows the user to specify the error message', function() {
        var errInstance = new atropa.customErrors.InvalidArgumentTypesError(
            'custom message'
        );
        expect(errInstance.message).toEqual('custom message');
    });
    
    it('is an instanceof the Error class', function () {
        expect(errInstance instanceof Error).toBe(true);
    });
});