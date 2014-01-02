#The AtropaToolbox's JavaScript bits!

Score!

##Where do I get it?

The Atropa Toolbox can be installed through npm on node

```
npm install atropa-toolbox
```

You can also download it from [github](https://github.com/matthewkastor/AtropaToolbox-raw-js/).

##How do I use it?

Visual studio intellisense files are located in the `docs/vsdoc` folder. 

You'll find the current build in the `browser` directory. Read the docs online at : [http://matthewkastor.github.com/AtropaToolbox-raw-js/](http://matthewkastor.github.com/AtropaToolbox-raw-js/)

Documentation is located in the `docs/jsdoc` folder and appear exactly as they do [online](http://matthewkastor.github.com/AtropaToolbox-raw-js/docs/jsdoc/index.html).

##Can I hack it?

Yes.

To rebuild this project you'll run the various scripts listed in `package.json`. The browser build is created by running `npm run-script buildBrowserModule`.

The built AtropaToolbox is located at `browser/atropa-toolbox_web.js`. To hack this project, edit `src/atropa-toolbox.js`. Tests are added or edited in `browser/tests/atropa-toolbox.test.js` and are run by [jasmine](http://pivotal.github.io/jasmine/). After you've modified the tests you can run them in node with `npm test` or open `browser/atropa-toolbox_tests.html` in your browser. See below for more information about running the tests in your browser.

Visual studio intellisense is available in `src/atropa-toolbox.js` because of the reference to
```
/// <reference path="../docs/vsdoc/OpenLayersAll.js"/>
```

Adding the reference will add intellisense code completion support to any file, as long as the path is updated accordingly. By writing jsdoc-toolkit compatible doc comments, any code you add to the project will be automatically documented and available to intellisense through that same reference listed above. Simply run `npm run-script buildVsdocs` to rebuild the vsdocs after modifying `src/atropa-toolbox.js`

##What about tests?

To run the tests open `browser/atropa-toolbox_tests.html` in your browser. Some of the tests will fail when viewing this file locally (`file://`) because of browser security restrictions. Some of the tests will fail if you do not allow popups as well. There is a server included in this project which is run with `npm start`. Running the test page on the local server will show the behavior of the AtropaToolbox in your current browser when using it against a live server.

##How can I contribute?

Submit a pull request on github.
