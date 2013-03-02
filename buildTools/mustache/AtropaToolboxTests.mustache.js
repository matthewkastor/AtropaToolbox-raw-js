exports.generateAtropaToolboxTestsHtml = function() {
    var fs, path, MustacheComb, comb;

    fs = require('fs');
    path = require('path');
    MustacheComb = require('atropa-mustache-comb').MustacheComb;
    comb = new MustacheComb();

    comb.addTemplateByFile(
        'AtropaToolboxTests',
        'buildTools/mustache/AtropaToolboxTests.html.mustache',
        'utf8'
    );

    var tests = {};
    tests.testSpec = fs.readdirSync(path.normalize('Toolbox/test/enabled/'), 'utf8');
    comb.views.push(tests);


    MustacheComb.prototype.renderer = function renderer(view) {
        var out;
        this.mustacheTagHandlers.testSpec = view.testSpec;
        out = this.Mustache.to_html(
            this.templates.AtropaToolboxTests,
            this.mustacheTagHandlers);
        fs.writeFileSync('AtropaToolboxTests.html', out, 'utf8');
    };

    comb.renderViews(comb.renderer);
}