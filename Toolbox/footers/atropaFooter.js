while(atropa.data.requirements.length > 0) {
    atropa.data.requirements.pop()();
}


try {
    module.exports = atropa;
} catch (ignore) {
    // module.exports does not exist.
}


