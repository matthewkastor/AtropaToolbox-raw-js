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

describe('atropa.InvalidArgumentTypesError', function () {
    var errInstance = new atropa.InvalidArgumentTypesError();
    it('must exist', function () {
        expect(atropa.InvalidArgumentTypesError).not.toEqual(undefined);
    });
    
    it('has a default name of "atropa.InvalidArgumentTypesError"',
        function () {
            expect(
                errInstance.name
            ).toEqual(
                'atropa.InvalidArgumentTypesError'
            );
        }
    );
    
    it('has a default message of "InvalidArgumentTypesError"', function () {
        expect(errInstance.message).toEqual('InvalidArgumentTypesError');
    });
    
    it('allows the user to specify the error message', function() {
        var errInstance = new atropa.InvalidArgumentTypesError(
            'custom message'
        );
        expect(errInstance.message).toEqual('custom message');
    });
    
    it('is an instanceof the Error class', function () {
        expect(errInstance instanceof Error).toBe(true);
    });
});