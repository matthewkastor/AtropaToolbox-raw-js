"use strict";
describe("atropa.CreateHtmlDocumentsFromXmlhttp", function() {
    it("must exist", function() {
        expect(atropa.CreateHtmlDocumentsFromXmlhttp).not.toEqual(undefined);
    });
    
    describe('newDocument', function () {
        
        it("must exist", function() {
            var docs = new atropa.CreateHtmlDocumentsFromXmlhttp();
            expect(docs.newDocument).not.toEqual(undefined);
        });
        
        describe('with valid url', function () {
            var method, url, docs, callback;
            
            beforeEach(function (){
                method = 'get';
                url = '/index.html';
                docs = new atropa.CreateHtmlDocumentsFromXmlhttp();
                
                runs(function () {
                    callback = jasmine.createSpy();
                    docs.newDocument(method, url, null, callback);
                });
                
                waitsFor(function () {
                    return callback.mostRecentCall.args !== undefined;
                }, 'the document queue length to increase', 1000);
            });
            
            it("must call the callback", function() {
                expect(callback).toHaveBeenCalled();
                expect(callback.mostRecentCall.args[0]).not.toEqual(false);
            });
            
            it('must put the document into the document queue', function () {
                expect(docs.documentQueue.length).toEqual(1);
            });
        });
        
        describe('with invalid url', function () {
            var method, url, docs, callback;
            
            beforeEach(function (){
                method = 'get';
                url = '/PageDoesNotExist';
                docs = new atropa.CreateHtmlDocumentsFromXmlhttp();
                
                runs(function () {
                    callback = jasmine.createSpy();
                    docs.newDocument(method, url, null, callback);
                });
                
                waitsFor(function () {
                    return callback.mostRecentCall.args !== undefined;
                }, 'the document queue length to increase', 1000);
            });
            
            it("must call the callback", function() {
                expect(callback).toHaveBeenCalled();
                expect(callback.mostRecentCall.args[0]).toEqual(false);
            });
            
            it('must not put anything in the document queue', function () {
                expect(docs.documentQueue.length).toEqual(0);
            });
        });
    });

});
