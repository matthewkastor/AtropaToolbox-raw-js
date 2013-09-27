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
    waitsFor
*/
// end header

describe('atropa.CookieMonster', function () {
    var cookieMonster;
    
    it('must exist', function () {
        expect(atropa.CookieMonster).not.toEqual(undefined);
    });
    
    
    try {
        // throw an error in unsupported environments
        cookieMonster = new atropa.CookieMonster();
        
        describe('class is supported in this environment', function () {
            
            beforeEach(function () {
                cookieMonster = new atropa.CookieMonster();
            });
            
            describe('cookie2obj', function () {
                it('converts a cookie string into an object', function () {
                    var cookieObj = cookieMonster.cookie2obj(
                        'atropa=hial atropa!!;');
                    expect(
                        cookieObj
                    ).toEqual(
                        { key : 'atropa', val : 'hial atropa!!' }
                    );
                });
            });
            
            describe('bakeCookie', function () {
                it('converts a cookie object to a cookie string', function () {
                    var cs = cookieMonster.bakeCookie(
                        { key : "atropa", val : "hial atropa!!"}
                    );
                    expect(cs).toEqual('atropa=hial atropa!!;');
                });
            });
            
            describe('setCookie', function () {
                it('sets a cookie per user specifications as strings',
                    function () {
                        expect(document.cookie).not.toContain('hial atropa!!');
                        cookieMonster.setCookie('atropa', 'hial atropa!!');
                        expect(document.cookie).toContain('hial atropa!!');
                    }
                );
            });
            
            describe('setCookieObj', function () {
                it('sets a cookie per user specifications as an object',
                    function () {
                        expect(document.cookie).not.toContain('munchin');
                        cookieMonster.setCookieObj(
                            { 'key' : 'katjii', 'val' : 'munchin' }
                        );
                        expect(document.cookie).toContain('munchin');
                    }
                );
            });
            
            describe('inspectCookies', function () {
                it('filters cookies based on user specified callback',
                    function () {
                        function cookieFilter(cookieObj, cookieValue) {
                            if(cookieObj.val === cookieValue) {
                                return true;
                            } else {
                                return false;
                            }
                        }
                        expect(
                            cookieMonster.inspectCookies(
                                cookieFilter, 'munchin'
                            )
                        ).toEqual(
                            [{ "key" : "katjii", "val" : "munchin" }]
                        );
                    }
                );
            });
            
            describe('getCookie', function () {
                it('gets a user requested cookie', function () {
                    var cookieObj = cookieMonster.getCookie('atropa');
                    expect(
                        cookieObj
                    ).toEqual(
                        { "key" : "atropa", "val" : "hial atropa!!"}
                    );
                });
            });
            
            describe('getCookies', function () {
                it('get all cookies', function () {
                    var cookies = cookieMonster.getCookies();
                    expect(cookies.length >= 2).toEqual(true);
                    expect(cookies[0].key).toEqual('atropa');
                    expect(cookies[1].key).toEqual('katjii');
                });
            });
            
            describe('deleteCookie', function () {
                it('deletes a specified cookie by user submitted string',
                    function () {
                        expect(document.cookie).toContain('atropa');
                        cookieMonster.deleteCookie('atropa');
                        expect(document.cookie).not.toContain('atropa');
                    }
                );
            });
            
            describe('deleteCookieObj', function () {
                it('deletes a specified cookie by user submitted cookieObj',
                    function () {
                        expect(document.cookie).toContain('munchin');
                        cookieMonster.deleteCookieObj(
                            {'key' : 'katjii', 'val' : ''}
                        );
                        expect(document.cookie).not.toContain('munchin');
                    }
                );
            });
        });
    } catch (e) {
        describe('class is not supported in this environment', function () {
            function x () {
                return new atropa.CookieMonster();
            }
            it('must throw if class is not supported in this environment',
                function () {
                    expect(x).toThrow('The atropa.CookieMonster class is unsupported in this environment.');
                }
            );
            it('must set atropa.data.CookieMonster.support to "unsupported"',
                function () {
                    expect(
                        atropa.data.CookieMonster.support
                    ).toEqual(
                        'unsupported'
                    );
                }
            );
        });
    }
    
});