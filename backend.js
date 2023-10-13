/* global require */
/* eslint no-console:0 */

var express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    routesNora = require('./demo/routes/nora'),
    //Routes
    routesTabs = require('./demo/routes/tabs'),
    routesAutocomplete = require('./demo/routes/autocomplete'),
    routesTree = require('./demo/routes/tree'),
    routesCombo = require('./demo/routes/combo'),
    routesSelect = require('./demo/routes/select'),
    routesTable = require('./demo/routes/table'),
    routesJqtable = require('./demo/routes/jqtable'),
    routesUpload = require('./demo/routes/upload'),
    dashboardTable = require('./demo/routes/dashboard'),
    routesAudit = require('./demo/routes/audit'),
    routesCalendar = require('./demo/routes/calendar'),
    routesDialog = require('./demo/routes/dialog'),
    routesList = require('./demo/routes/list');

// db
//var db = new lokijs('uda');

module.exports = (PORT) => {
    var app = express();

    app.on('error', function (er) {
        console.error('error', er.stack);
    });

    app.use(bodyParser.json()); // support json encoded bodies
    app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
    app.use(cookieParser());

    var cors = require('cors');
    app.use(cors());

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
	// Select
    app.get('/demo/selectSimple/remote', routesSelect.selectSimple.remote);
    app.get('/demo/selectAutocomplete/remote', routesSelect.autocomplete.remote);
    app.get('/demo/remoteEnlazadoProvincia/remote', routesSelect.selectEnlazadoSimple.remoteEnlazadoProvincia);
    app.get('/demo/remoteEnlazadoComarca/remote', routesSelect.selectEnlazadoSimple.remoteEnlazadoComarca);
    app.get('/demo/remoteEnlazadoLocalidad/remote', routesSelect.selectEnlazadoSimple.remoteEnlazadoLocalidad);
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
    app.post('/demo/jqGridUsuario/search', routesJqtable.search);

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
    app.post('/demo/table/remote/edit', routesTable.formEditInline);
    app.put('/demo/table/remote/edit', routesTable.formEditInline);
    app.post('/demo/table/remote/add', routesTable.formEdit);
    app.post('/demo/table/remote/deleteEnd', routesTable.deleteEnd);
    app.delete('/demo/table/remote/:id', routesTable.delete);
    app.get('/demo/table/remote/:id', routesTable.getReg);
    app.get('/demo/table/reset', routesTable.reset);
    app.post('/demo/table/remote/editForm', routesTable.editForm);
    app.post('/demo/table/remote/inlineEdit', routesTable.inlineEdit);

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

    //List
    app.post('/demo/list/filter', routesList.filter);
    app.get('/demo/list/filter/multiFilter/getAll', routesList.multiFilterAll);
    app.get('/demo/list/filter/multiFilter/getDefault', routesList.multiFilterDefault);
    app.post('/demo/list/filter/multiFilter/add', routesList.multiFilterAdd);
    app.post('/demo/list/filter/multiFilter/delete', routesList.multiFilterDelete);

    //Dialog
    app.get('/demo/dialog/dialogAjax', routesDialog.getHTML);

    var server = app.listen(PORT);

    console.log(`Listening on port ${PORT}...`);
    return server;
};
