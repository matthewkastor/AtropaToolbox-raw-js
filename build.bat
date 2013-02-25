REM See the build tools\README.txt for details about plato and jsdoc-toolkit

type Toolbox\headers\atropaToolboxHeader.js > src\AtropaToolbox.js
type Toolbox\headers\atropaHeader.js >> src\AtropaToolbox.js
type Toolbox\enabled\*.js >> src\AtropaToolbox.js

type src\AtropaToolbox.js > testBuild\AtropaToolbox.test.js
type Toolbox\test\atropa.test.js >> testBuild\AtropaToolbox.test.js
type Toolbox\test\enabled\*.js >> testBuild\AtropaToolbox.test.js
type Toolbox\test\atropa.test.runner.js >> testBuild\AtropaToolbox.test.js


call plato.bat --recurse --title "Code Analysis of The Glorious AtropaToolbox" --dir report Toolbox\enabled

call jsdoc-toolkit.bat "src"
