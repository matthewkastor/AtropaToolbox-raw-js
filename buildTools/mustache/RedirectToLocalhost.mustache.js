exports.generateRedirectToLocalhostHtml = function(port) {
    var fs, path, MustacheComb, comb;
    
    fs = require('fs');
    path = require('path');
    MustacheComb = require('atropa-mustache-comb').MustacheComb;
    comb = new MustacheComb();

    comb.addTemplateByFile(
        'AtropaToolboxTests',
        'buildTools/mustache/RedirectToLocalhost.html.mustache',
        'utf8'
    );
    
    comb.views.push({"port" : port});
    
    MustacheComb.prototype.renderer = function renderer(view) {
        var out;
        this.mustacheTagHandlers.port = view.port;
        out = this.Mustache.to_html(
            this.templates.AtropaToolboxTests,
            this.mustacheTagHandlers);
        fs.writeFileSync('RedirectToLocalhost.html', out, 'utf8');
    };
    
    comb.renderViews(comb.renderer);
}