/// <reference path="../../docs/vsdoc/OpenLayersAll.js"/>
/*jslint
    indent: 4,
    maxerr: 50,
    white: true,
    browser: true,
    devel: true,
    plusplus: true,
    regexp: true,
    vars: true
*/
/*global atropa */
// end header

while(atropa.data.requirements.length > 0) {
    atropa.data.requirements.pop()();
}


try {
    module.exports = atropa;
} catch (e) {
    // module.exports does not exist.
}