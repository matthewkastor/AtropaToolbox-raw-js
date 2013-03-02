/*jslint
    indent: 4,
    maxerr: 50,
    white: true,
    node: true,
    stupid: true
*/
/*global Mustache */

// templates.example, templates.includes

/**
 * @file This file contains the base MustacheComb class.
 * @author <a href="matthewkastor@gmail.com">Matthew Kastor</a>
 * @version 20121030
 * @requires events
 * @requires util
 * @requires fs
 * @requires path
 * @requires mustache
 * @requires textTransformers
 * @exports MustacheComb
 */

'use strict';
var events, util, fs, path;

events = require('events');
util   = require('util');
fs     = require('fs');
path   = require('path');

/**
 * The Base MustacheComb class. The templates
 *  and tag handlers shown in their registries will be loaded so, if
 *  you want to use this class directly then you'll need to reference
 *  your own tag handler and template registries.
 * @class
 * @param {Array} views An array of view objects. Defaults to an empty array.
 * @requires events
 * @requires util
 * @requires fs
 * @requires path
 * @requires mustache
 * @requires textTransformers
 * @example
 *  var MustacheComb, comb;
 *  
 *  MustacheComb = require('atropa-mustache-comb').MustacheComb;
 *  
 *  comb = new MustacheComb();
 *  
 *  // adds handling of "thingy" tags.
 *  // this function must be appended to the prototype in order
 *  // for the addTagHandlerFunction to work properly
 *  // "thingy" tags will be replaced with their original text content
 *  // concatenated with "woop woop!!"
 *  MustacheComb.prototype.formatThingy = function (text) {
 *      return text + ' woop woop!!';
 *  };
 *  comb.addTagHandlerFunction('thingy', 'formatThingy');
 *  
 *  // adds "wonderful" template by string
 *   comb.addTemplateByString('wonderful', 'OMFG!! OMFG!! {{greatNews}}\r\n' +
 *       '{{#thingy}}Ain\'t it great news{{/thingy}}\r\n{{>sig}}');
 *  
 *  // you could also just add string templates directly to the templates
 *  // property
 *  // comb.templates.wonderful = 'OMFG!! OMFG!! {{greatNews}}\r\n' +
 *  //     '{{#thingy}}Ain\'t it great news{{/thingy}}\r\n{{>sig}}';
 *  
 *  // if the wonderful template were in a file called wonderful.mustache
 *  // then we could add it with
 *  // comb.addTemplateByFile('wonderful', 'wonderful.mustache', 'utf8');
 *  
 *  // a view is just an object.
 *  var sticker = {};
 *  sticker.greatNews = 'I got a free sticker!';
 *  sticker.signature = 'Huzzah!';
 *  
 *  // add a view by pushing it onto the views array
 *  comb.views.push(
 *      sticker,
 *      { 'greatNews' : 'I got a coconut!', 'signature' : 'Jimmy!' },
 *      { 'greatNews' : 'I got a penny!', 'signature' : 'Jane!' }
 *  );
 *  
 *  // to render views you need to define a renderer function
 *  // this renderer function does not have to be appended to the
 *  // MustacheComb prototype but I find it convenient to do so.
 *  // the renderer function will take a view, and render it to the screen,
 *  // to a file, or however you see fit. This renderer function will
 *  // then be given as the argument to renderViews which will pass it
 *  // each view. Or you can do something more complex and confusing.
 *  
 *  MustacheComb.prototype.renderer = function renderer(view) {
 *      var out, mustacheTemplateParts;
 *      // the generic page structure used repeatedly.
 *      mustacheTemplateParts = {
 *          "sig" : view.signature
 *      };
 *      out = this.Mustache.to_html(
 *          this.templates.wonderful,
 *          this.mustacheTagHandlers,
 *          mustacheTemplateParts);
 *      console.log(out);
 *  };
 *  
 *  comb.renderViews(comb.renderer);
 *  
 */
function MustacheComb(views) {
    events.EventEmitter.call(this);
    
    var my = this;
    
    my.textTransformers= require('atropa-text-transformers');
    my.Mustache        = require('mustache');
    my.views           = views || [];
    
    /**
     * Contains functions for handling mustache tags.
     * @type {Object}
     */
    my.mustacheTagHandlers = {};
    
    /**
     * Mustache Templates
     * @type {Object}
     */
    my.templates = {
        "example"  : "<pre>{{{codeBody}}}</pre>",
        "includes" : "{{>includes}}"
    };
    
    /**
     * Adds a template file to the templates object.
     * @param {String} templateName The template name will become the property of
     *  this.templates which refers to the template loaded.
     * @param {String} pathToTemplate The path to the template file.
     * @param {String} encoding The encoding of the template file. Valid values are the same as
     *  valid values for fs.readFileSync. Defaults to utf8.
     */
    my.addTemplateByFile = function(templateName, pathToTemplate, encoding) {
        encoding = encoding || 'utf8';
        my.templates[templateName] = String(fs.readFileSync(path.resolve(pathToTemplate), encoding));
    };
    
    /**
     * Adds a template string to the templates object.
     * @param {String} templateName The template name will become the property of
     *  this.templates which refers to the template loaded.
     * @param {String} template The template.
     */
    my.addTemplateByString = function(templateName, template) {
        my.templates[templateName] = template;
    };
    
    /**
     * Adds a handler function for mustache tags. You will be responsible
     *  for generating whatever you want the tag to be replaced with. In
     *  general, the text can be run through mustache to parse any tags in
     *  it or tags can be used as markers for where you're going to
     *  programatically generate content and insert it.
     * @function
     * @param {String} handles The name of the tag to handle {{#whatever}}{{/whatever}}
     * @param {String} func The name of a function which has been added
     *  to the MustacheComb prototype. It will receive two arguments: text, and
     *  whatever. Text is the text content from within the mustache tag.
     * @see MustacheComb
     */
    my.addTagHandlerFunction = function(handles, func) {
        my.mustacheTagHandlers[handles] = function() {
            return function(text, whatever) {
                return my[func](text, whatever);
            };
        };
    };
    
    my.addTagHandlerFunction('example', 'formatExample');
    my.addTagHandlerFunction('include', 'mustacheIncluder');
    my.addTagHandlerFunction('includeExample', 'includeExample');
}
util.inherits(MustacheComb, events.EventEmitter);

/**
 * Tag handler for the example tag. Formats the text for html
 *  and prettification.
 * @function`
 * @param {String} text A string of text (example code) to process.
 */
MustacheComb.prototype.formatExample = function formatExample(text) {
    var my, parts, offset, code, html;
    
    my = this;
    
    // normalizing line endings
    text  = my.textTransformers.convertEOL(text, '\n');
    // creating an array of lines.
    parts = text.split('\n');
    // converting any tabs in white space preceeding the line, into four spaces.
    parts = parts.map(function (text) {
        return my.textTransformers.normalizeWhiteSpace(text);
    });
    // Since indentation in the article is directly transferred to the displayed 
    // example, we may need to remove some white space. (thinks of shift+tab).
    offset = my.textTransformers.getOffset(parts[0]);
    parts  = parts.map(function(text) {
        return my.textTransformers.offsetWhiteSpace(text, offset);
    });
    // creating a string from an array of lines.
    code = parts.join('\n');
    // filtering out characters that screw up the html.
    code = code.replace(/[<]/g, '&lt;');
    // Formatting the data into html.
    html = my.Mustache.to_html(
        my.templates.example, {
        codeBody  : code
    });
    return html;
};

/**
 * Base Function for including files. Fetches file contents.
 * @param {String} relPath The path to the file to include.
 * @returns Returns the contents of the file or an html link to the unreadable
 *  path.
 */
MustacheComb.prototype.includeFile = function includeFile(relPath) {
    var out;
        
    relPath = relPath.trim();
    
    try {
        out = String(fs.readFileSync(relPath));
    } catch (e) {
        console.log('  MustacheComb.includeFile : ');
        console.log(String(e));
        out = '<p>File not found at <a href="' + relPath + '"><code>' + relPath + '</code></a></p>';
    }
    return out;
};

/**
 * Function for including example code from files.
 * @param {String} text The path to the file to include.
 * @returns Returns the contents of the file formatted for HTML.
 */
MustacheComb.prototype.includeExample = function includeExample(relPath) {
    var out;
    out = this.includeFile(relPath);
    out = this.formatExample(out);
    return out;
};

/**
 * Function for including files. Files may contain mustache tags.
 * @param {String} text The path to the file to include.
 * @returns Returns the contents of the file.
 */
MustacheComb.prototype.mustacheIncluder = function mustacheIncluder(relPath) {
    var out;
    // the text of the include tag is a path.
    out = this.includeFile(relPath);
    // Run the output through Mustache to parse any mustache tags it may contain.
    out = this.Mustache.to_html(this.templates.includes, this.mustacheTagHandlers, {includes : out});
    return out;
};

/**
 * Renders views from this.views objects array.
 * @function
 * @property {Function} callback A callback function to perform on each view.
 *  The callback receives  the rendered view. The callback could write the view
 *  to a file, store it in a variable, etc.
 */
MustacheComb.prototype.renderViews = function renderViews(callback) {
    var my = this;
    this.views.forEach(function (view) {
        my.emit('view render attempt ', {"view" : view});
        callback.call(my, view);
        my.emit('view rendered ', {"view" : view});
    });
};

exports.MustacheComb = MustacheComb;