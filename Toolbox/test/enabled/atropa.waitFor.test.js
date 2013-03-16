"use strict";
/*jslint
    indent: 4,
    maxerr: 50,
    white: true,
    browser: true,
    vars: true
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
    spyOn
*/
// end header

describe("atropa.waitFor", function() {

    it("must exist", function() {
        expect(atropa.waitFor).not.toEqual(undefined);
    });
    
    var waiting = true;
    var success = false;
    var fail = false;
    var polled = 0;
    
    var settings = {
        'testFn' : function () {
            polled = polled + 1;
            return !waiting;
        },
        'onSuccessCallback' : function () {
            waiting = false;
            success = true;
        },
        'onMaxPollCallback' : function () {
            waiting = false;
            fail = true;
        },
        'pollInterval' : 200,
        'maxPoll' : 50
    };
    
    beforeEach(function () {
        waiting = true;
        success = false;
        fail = false;
        polled = 0;
        spyOn(settings, 'testFn').andCallThrough();
        spyOn(settings, 'onSuccessCallback').andCallThrough();
        spyOn(settings, 'onMaxPollCallback').andCallThrough();
    });
    
    describe('test', function () {
        
        it('must execute the test function', function () {
            settings.pollInterval = 10;
            
            runs(function (){
                atropa.waitFor.test(
                    settings.testFn,
                    settings.onSuccessCallback,
                    settings.onMaxPollCallback,
                    settings.pollInterval,
                    settings.maxPoll
                );
                waiting = false;
            });
            
            waitsFor(function () {
                return polled > 0;
            }, 'should have found what it was waiting for', 300);
            
            runs(function () {
                expect(settings.testFn).toHaveBeenCalled();
                expect(polled).toEqual(1);
            });
        });
        
        it('must execute onSuccessCallback on success', function () {
            settings.pollInterval = 10;
            
            runs(function (){
                atropa.waitFor.test(
                    settings.testFn,
                    settings.onSuccessCallback,
                    settings.onMaxPollCallback,
                    settings.pollInterval,
                    settings.maxPoll
                );
                waiting = false;
            });
            
            waitsFor(function () {
                return success;
            }, 'should have found what it was waiting for', 300);
            
            runs(function () {
                expect(settings.onSuccessCallback).toHaveBeenCalled();
                expect(polled).toEqual(1);
            });
        });
        
        it('must execute onMaxPollCallback on failure', function () {
            settings.pollInterval = 10;
            settings.maxPoll = 2;
            
            runs(function (){
                atropa.waitFor.test(
                    settings.testFn,
                    settings.onSuccessCallback,
                    settings.onMaxPollCallback,
                    settings.pollInterval,
                    settings.maxPoll
                );
            });
            
            waitsFor(function () {
                return fail;
            }, 'should have found what it was waiting for', 300);
            
            runs(function () {
                expect(settings.onMaxPollCallback).toHaveBeenCalled();
                expect(polled).toEqual(2);
            });
        });
        
    });
    
    describe('element', function () {
        
        it('must execute onSuccessCallback on success', function () {
            settings.pollInterval = 10;
            settings.testFn = function () {
                polled = polled + 1;
                waiting = false;
                return { 'tagName' : 'has it'};
            };
            spyOn(settings, 'testFn').andCallThrough();
            
            runs(function (){
                atropa.waitFor.test(
                    settings.testFn,
                    settings.onSuccessCallback,
                    settings.onMaxPollCallback,
                    settings.pollInterval,
                    settings.maxPoll
                );
                waiting = false;
            });
            
            waitsFor(function () {
                return polled > 0;
            }, 'should have found what it was waiting for', 300);
            
            runs(function () {
                expect(settings.testFn).toHaveBeenCalled();
                expect(polled).toEqual(1);
                expect(success).toEqual(true);
            });
        });
    });
    
    
});


