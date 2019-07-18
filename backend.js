/* global require */
var express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    http = require('http'),

    //Table database
    lokijs = require('lokijs'),
    LokiDb = require('./lokiDb'),
    lokiNativescriptAdapter = require('lokijs/src/loki-nativescript-adapter'),
    routesNora = require('./demo/routes/nora'),
    dummyjson = require('dummy-json'),
    //Routes
    routesTabs = require('./demo/routes/tabs'),
    routesAutocomplete = require('./demo/routes/autocomplete'),
    routesTree = require('./demo/routes/tree'),
    routesCombo = require('./demo/routes/combo'),
    routesTable = require('./demo/routes/table'),
    routesJqtable = require('./demo/routes/jqtable'),
    routesUpload = require('./demo/routes/upload'),
    dashboardTable = require('./demo/routes/dashboard'),
    routesAudit = require('./demo/routes/audit'),
    routesCalendar = require('./demo/routes/calendar'),
    routesDialog = require('./demo/routes/dialog');

// db
//var db = new lokijs('uda');

module.exports = (PORT) => {

    //var ldb = new LokiDb();
    LokiDb.log();
    LokiDb.setText('Inicializando LokiDB');
    LokiDb.initialize();

    var app = express();

    app.use(bodyParser.json()); // support json encoded bodies
    app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
    app.use(cookieParser());

    var cors = require('cors');
    app.use(cors());
    app.use(function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
    });

    app.use(express.static('./'));

    app.get('/', function(req, res){
        if (req.cookies.language===undefined){
            res.cookie('language' , 'es',{expire : new Date() + 9999});
        }
        res.redirect('/demo/index.html');
    });

    app.get('/test', function(req, res){
        res.redirect('/spec/specRunner_require.html');
    });

    app.get('/demo/fragmento1', routesTabs.tabsContent1);
    app.get('/demo/fragmento2', routesTabs.tabsContent1);
    app.get('/demo/fragmento3', routesTabs.tabsContent1);
    app.get('/demo/tab2Fragment', routesTabs.tabsContent2);
    app.get('/demo/tab3Fragment', routesTabs.tabsContent3);
    //Autocomplete
    app.get('/demo/autocomplete/remote', routesAutocomplete.remote);
    //Tree
    app.get('/demo/ajaxTree', routesTree.json);
    app.get('/demo/tree/remote/json', routesTree.json);
    app.get('/demo/tree/remote/xml', routesTree.xml);
    // Combo
    app.get('/demo/comboSimple/remote', routesCombo.comboSimple.remote);
    app.get('/demo/comboSimple/remoteDos', routesCombo.comboSimple.remoteDos);
    app.get('/demo/comboSimple/remoteGroup', routesCombo.comboSimple.remoteGroup);
    app.get('/demo/comboSimple/remoteGroupEnlazado', routesCombo.comboSimple.remoteGroupEnlazado);
    app.get('/demo/comboEnlazadoSimple/remoteEnlazadoProvincia', routesCombo.comboEnlazadoSimple.remoteEnlazadoProvincia);
    app.get('/demo/comboEnlazadoSimple/remoteEnlazadoComarca', routesCombo.comboEnlazadoSimple.remoteEnlazadoComarca);
    app.get('/demo/comboEnlazadoSimple/remoteEnlazadoLocalidad', routesCombo.comboEnlazadoSimple.remoteEnlazadoLocalidad);
    app.get('/demo/comboEnlazadoMultiple/departamentoRemote', routesCombo.comboEnlazadoMultiple.departamentoRemote);
    app.get('/demo/comboEnlazadoMultiple/provinciaRemote', routesCombo.comboEnlazadoMultiple.provinciaRemote);
    app.get('/demo/comboEnlazadoMultiple/dptoProvRemote', routesCombo.comboEnlazadoMultiple.dptoProvRemote);
    // Form
    app.get('/demo/nora/pais', routesNora.pais);
    app.get('/demo/nora/autonomia', routesNora.autonomia);
    app.get('/demo/nora/provincia', routesNora.provincia);
    app.post('/demo/nora', routesNora.submit);
    // Jqtable
    app.post('/demo/jqGridUsuario/filter', routesJqtable.filter);
    app.get('/demo/jqGridUsuario/:id', routesJqtable.get);
    app.put('/demo/jqGridUsuario', routesJqtable.put);
    app.post('/demo/jqGridUsuario', routesJqtable.post);

    // Upload
    app.post('/upload', routesUpload.upload);

    app.post('/demo/jqGridUsuario/filter', routesJqtable.filter);
    app.get('/demo/jqGridUsuario/:id', routesJqtable.get);
    app.put('/demo/jqGridUsuario', routesJqtable.put);
    app.post('/demo/jqGridUsuario', routesJqtable.post);


    // Dashboard
    app.get('/dashboard/getAll', dashboardTable.getAll);
    app.get('/dashboard/get/:id', dashboardTable.get);
    app.post('/dashboard/post', dashboardTable.post);
    app.put('/dashboard/put', dashboardTable.put);

    //Table
    app.post('/demo/table/remote/filter', routesTable.filter);
    app.post('/demo/table/remote/search', routesTable.search);
    app.put('/demo/table/remote/simple', routesTable.simple);
    app.post('/demo/table/remote', routesTable.formEdit);
    app.put('/demo/table/remote', routesTable.formEdit);
    app.delete('/demo/table/remote/:id', routesTable.delete);

    //Audit
    app.post('/audit', routesAudit.audit);
    app.get('/audit', routesAudit.getAudited);

    app.options('/demo/table/remote', function (req, res) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'PUT,POST,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
        res.sendStatus(200);
    });
	
    //Calendar
    app.get('/demo/calendar/events', routesCalendar.getEvents);
    app.post('/demo/calendar/events/add', routesCalendar.addEvent);
    app.post('/demo/calendar/events/restore', routesCalendar.restore);

    //Dialog
    app.get('/demo/dialog/dialogAjax', routesDialog.getHTML);

    app.listen(PORT);

    console.log(`Listening on port ${PORT}...`);
    return;
};
