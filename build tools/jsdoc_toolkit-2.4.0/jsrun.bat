@echo off
SET jsdocToolkitLoc=%~dp0

:findJsdocToolkitLoc
IF NOT EXIST "%jsdocToolkitLoc%jsrun.jar" (
	SET /P jsdocToolkitLoc=[Enter the full path to jsrun.jar including trailing backslash]
	GOTO findJsdocToolkitLoc
)


SET jsdocTemplateLoc=%jsdocToolkitLoc%templates
SET jsdocRunJsLoc=%jsdocToolkitLoc%app\run.js
SET jsdocJsRunLoc=%jsdocToolkitLoc%jsrun.jar

IF "%~1"=="" (
	SET /P src=[Enter the full path to your source folder without trailing backslash]
) ELSE (
	SET src=%~1
)
SET docsOutputDir=%src%\..\docs
SET jsdocLogOutputDir=%src%\..\logs
SET jsdocLogFileName=jsdoc-toolkit-error-log.txt
SET jsdocLogOutput=%jsdocLogOutputDir%\%jsdocLogFileName%

IF EXIST "%jsdocLogOutput%" (
	DEL /F /Q "%jsdocLogOutput%"
)
IF EXIST "%docsOutputDir%" (
	RMDIR /S /Q "%docsOutputDir%"
)
IF NOT EXIST "%jsdocLogOutputDir%" (
	MKDIR "%jsdocLogOutputDir%"
)

echo Generating API documentation to "%docsOutputDir%\jsdoc"
java -jar "%jsdocJsRunLoc%" "%jsdocRunJsLoc%" -r=10 -a -p -d="%docsOutputDir%\jsdoc" -o="%jsdocLogOutput%" -t="%jsdocTemplateLoc%\jsdoc" "%src%"

echo Generating XML doc comments for Visual Studio intellisense to "%docsOutputDir%\vsdoc"
echo Remember to reference the vsdoc in your javascript file  /// ^<reference path="OpenLayersAll.js" /^>
java -jar "%jsdocJsRunLoc%" "%jsdocRunJsLoc%" -r=10 -a -p -d="%docsOutputDir%\vsdoc" -o="%jsdocLogOutput%" -t="%jsdocTemplateLoc%\vsdoc" "%src%"

echo Errors, if any, have been logged to %jsdocLogOutput%
