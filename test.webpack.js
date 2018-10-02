var testsContext = require.context('./spec/', true, /spec\.js$/);
testsContext.keys().forEach(testsContext);

// var srcContext = require.context('./spec', true, /^((?!__tests__).)*.js$/);
var srcContext = require.context('./spec/', true, /spec\.js$/);
srcContext.keys().forEach(srcContext);
