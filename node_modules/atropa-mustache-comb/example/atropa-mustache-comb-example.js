var MustacheComb, comb;

MustacheComb = require('atropa-mustache-comb').MustacheComb;

comb = new MustacheComb();

/**
 * Main mustache function for generating pages. This may
 *  be used to process a single view.
 * @param {Object} view The view object to process.
 * @returns {String} Returns the html view as transformed by mustache.
 */
MustacheComb.prototype.mainMustache = function mainMustache(view) {
    var out, mustacheTemplateParts;
    // the generic page structure used repeatedly.
    mustacheTemplateParts = {
        "body" : view.body + ' the title is: {{title}}'
    };
    console.log(mustacheTemplateParts);
    this.mustacheTagHandlers.title = view.title;
    out = this.Mustache.render(this.templates.html, this.mustacheTagHandlers, mustacheTemplateParts);
    return out;
};

comb.addTemplateByFile('html', 'html.mustache');

comb.views.push(
    {
        "body" : "weeeeee",
        "title" : "Awesome"
    },
    {
        "body" : "Wohoooo!",
        "title" : "Awesome2"
    }
);
function cb(view) {
    console.log(comb.mainMustache(view));
}

comb.renderViews(cb);