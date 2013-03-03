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
                url = './index.html';
                docs = new atropa.CreateHtmlDocumentsFromXmlhttp();
                
                runs(function () {
                    callback = jasmine.createSpy();
                    docs.newDocument(method, url, null, callback);
                });
                
                waitsFor(function () {
                    return callback.mostRecentCall.args !== undefined;
                }, 'the document queue length to increase', 10000);
            });
            
            it('must call the callback with a valid document',  function() {
                expect(callback).toHaveBeenCalled();
                expect(callback.mostRecentCall.args[0].nodeType).toEqual(9);
            });
            
            it('must put the document into the document queue', function () {
                expect(docs.documentQueue.length).toEqual(1);
                expect(
                    callback.mostRecentCall.args[0]
                ).toEqual(
                    docs.documentQueue[0]
                );
            });
            
            it('must produce a document which may be manipulated', function () {
                var doc = docs.documentQueue[0]
                function make(element) {
                    return doc.createElement(element);
                }
                function append(element) {
                    doc.documentElement.appendChild(element);
                }
                var p = make('p');
                p.textContent = 'test';
                p.setAttribute('id', 'testPara');
                doc.body.appendChild(p);
                expect(doc.getElementById('testPara').textContent).toEqual('test');
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
            
            it('must call the callback with false', function() {
                expect(callback).toHaveBeenCalled();
                expect(callback.mostRecentCall.args[0]).toEqual(false);
            });
            
            it('must not put anything in the document queue', function () {
                expect(docs.documentQueue.length).toEqual(0);
            });
        });
    });

});
