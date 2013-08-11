#The AtropaToolbox's JavaScript bits!

Score!

Read the docs online at : [http://matthewkastor.github.com/AtropaToolbox-raw-js/](http://matthewkastor.github.com/AtropaToolbox-raw-js/)


To rebuild this project you'll need to have [Node](http://nodejs.org/) and [Java](http://www.java.com/) installed and available in your path. Then run `jake` from this directory. To see a list of Jake tasks run `jake -T`

The built AtropaToolbox is located at `src/AtropaToolbox.js`. To contribute to this project, edit or add files to `Toolbox/enabled`. Tests are added or edited in `Toolbox/test/enabled`. To run the tests open `AtropaToolboxTests.html` in your browser. Some of the tests will fail when viewing this file locally (`file://`) because of browser security restrictions. There is a server included in this project which is run as a jake task with `jake docServ`. Running the test page on the local server will show the behavior of the AtropaToolbox in your current browser when using it against a live server.

All JavaScript files are to be saved with `utf8 encoding without BOM` / `Unicode UTF-8 without signature - Codepage 65001`. See your code editor's documentation for instructions on how to set the file encoding when saving files.

Documentation is located in the `docs/jsdoc` folder and appear exactly as they do [online](http://matthewkastor.github.com/AtropaToolbox-raw-js/docs/jsdoc/index.html).

Visual studio intellisense files are located in the `docs/vsdoc` folder. When adding new files to `Toolbox/enabled` add a reference to the vsdocs at the top of the file:
```
/// <reference path="../../docs/vsdoc/OpenLayersAll.js"/>
```
Adding the reference will add intellisense code completion support to the file. By writing jsdoc-toolkit compatible doc comments, any code you add to the project will be automatically documented and available to intellisense through that same reference listed above. Simply run `jake` to rebuild the project which will add the documentation and intellisense support for any new code.
