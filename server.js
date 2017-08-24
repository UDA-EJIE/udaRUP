const createFrontendServer = require('./frontend.js');
const createBackendServer = require('./backend.js');

createBackendServer(8081);
createFrontendServer(8080, 8081);
