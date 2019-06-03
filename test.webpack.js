//var testsContext = require.context('./spec', true, /(?<!X21a.*)\.spec\.js$/);
//var testsContext = require.context('./spec', true, /(wizard)(?<!X21a.*)\.spec\.js$/);
var testsContext = require.context('./spec', true, /(accordion|audit|autocomplete|breadcrumb|button|calendar|chart|combo|contextMenu|date|dialog|feedback|form|message|navbar|progressbar|report|slider|spinner|tabs|time|toolbar|tooltip|tree|upload|utils|validate|wizard)(?<!X21a.*)\.spec\.js$/);
testsContext.keys().forEach(testsContext);

//var srcContext = require.context('./spec', true, /(?<!X21a.*)\.spec\.js$/);
//var srcContext = require.context('./spec', true, /(wizard)(?<!X21a.*)\.spec\.js$/);
var srcContext = require.context('./spec', true, /(accordion|audit|autocomplete|breadcrumb|button|calendar|chart|combo|contextMenu|date|dialog|feedback|form|message|navbar|progressbar|report|slider|spinner|tabs|time|toolbar|tooltip|tree|upload|utils|validate|wizard)(?<!X21a.*)\.spec\.js$/);
srcContext.keys().forEach(srcContext);