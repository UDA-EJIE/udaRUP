var testsContext = require.context('./spec', true, /(?<!X21a.*)\.spec\.js$/);
//var testsContext = require.context('./spec', true, /(combo)(?<!X21a.*)\.spec\.js$/);
//var testsContext = require.context('./spec', true, /(accordion|audit|autocomplete|breadcrumb|button|calendar|chart|combo)(?<!X21a.*)\.spec\.js$/);
testsContext.keys().forEach(testsContext);

var srcContext = require.context('./spec', true, /(?<!X21a.*)\.spec\.js$/);
//var srcContext = require.context('./spec', true, /(combo)(?<!X21a.*)\.spec\.js$/);
//var srcContext = require.context('./spec', true, /(accordion|audit|autocomplete|breadcrumb|button|calendar|chart|combo)(?<!X21a.*)\.spec\.js$/);
srcContext.keys().forEach(srcContext);
