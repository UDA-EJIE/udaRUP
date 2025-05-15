const context = require.context('./spec', true, /(?<!X21a.*)\.spec\.js$/);
// var context = require.context('./spec', true, /(list)\.spec\.js$/);
// var context = require.context('./spec/table', true, /(?<!X21a.*)\.spec\.js$/);
// var context = require.context('./spec', true, /(accordion|breadcrumb|button|calendar|chart|contextMenu|date|dialog|feedback|form|lang|list|message|navbar|progressbar|report|select|selectAutocomplete|selectAutocompleteMultiple|slider|spinner|table|maestroDetalle|tabs|time|toolbar|tooltip|tree|upload|utils|validate|wizard)\.spec\.js$/);

var testsContext = context;
var srcContext = context;
testsContext.keys().forEach(testsContext);
srcContext.keys().forEach(srcContext);