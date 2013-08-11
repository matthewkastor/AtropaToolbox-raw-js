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

You'll find the current build in the `src` directory. Read the docs online at : [http://matthewkastor.github.com/AtropaToolbox-raw-js/](http://matthewkastor.github.com/AtropaToolbox-raw-js/)

Documentation is located in the `docs/jsdoc` folder and appear exactly as they do [online](http://matthewkastor.github.com/AtropaToolbox-raw-js/docs/jsdoc/index.html).

##Can I hack it?

Yes.

To rebuild this project you'll need to have [Node](http://nodejs.org/) and [Java](http://www.java.com/) installed and available in your path. Then run `jake` from this directory. To see a list of Jake tasks run `jake -T`. You may have to adjust the path in `jake` or `jake.bat` to get them to work if you've already installed jake somewhere else and it isn't in the `node_modules` folder of this project. Also, if you've installed Plato in an alternate location you will have to specify the path to plato at the top of `jakefile`.

The built AtropaToolbox is located at `src/AtropaToolbox.js`. To hack this project, edit or add files to `Toolbox/enabled`. Tests are added or edited in `Toolbox/test/enabled` and are run by [jasmine](http://pivotal.github.io/jasmine/). After you've modified or added files rebuild by running `jake` from this directory.

All JavaScript files are to be saved with `utf8 encoding without BOM` / `Unicode UTF-8 without signature - Codepage 65001`. See your code editor's documentation for instructions on how to set the file encoding when saving files.

When adding new files to `Toolbox/enabled` add a reference to the vsdocs at the top of the file:
```
/// <reference path="../../docs/vsdoc/OpenLayersAll.js"/>
```
Adding the reference will add intellisense code completion support to the file. By writing jsdoc-toolkit compatible doc comments, any code you add to the project will be automatically documented and available to intellisense through that same reference listed above. Simply run `jake` to rebuild the project which will add the documentation and intellisense support for any new code.

##What about tests?

To run the tests open `AtropaToolboxTests.html` in your browser. Some of the tests will fail when viewing this file locally (`file://`) because of browser security restrictions. Some of the tests will fail if you do not allow popups as well. There is a server included in this project which is run as a jake task with `jake docServ`. Running the test page on the local server will show the behavior of the AtropaToolbox in your current browser when using it against a live server.

##How can I contribute?

Submit a pull request on github.
