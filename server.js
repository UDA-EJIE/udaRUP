var express = require('express'),
    bodyParser = require('body-parser'),
    http = require('http'),
    routesTabs = require('./demo/routes/tabs'),
    routesAutocomplete = require('./demo/routes/autocomplete'),
    routesCombo = require('./demo/routes/combo');

var app = express();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static('./'));

app.get('/demo/fragmento1', routesTabs.tabsContent1);
app.get('/demo/fragmento2', routesTabs.tabsContent1);
app.get('/demo/fragmento3', routesTabs.tabsContent1);
app.get('/demo/tab2Fragment', routesTabs.tabsContent2);
app.get('/demo/tab3Fragment', routesTabs.tabsContent3);
//Autocomplete
app.get('/demo/autocomplete/remote', routesAutocomplete.remote);
// Combo
app.get('/demo/comboSimple/remote', routesCombo.comboSimple.remote);
app.get('/demo/comboSimple/remoteGroup', routesCombo.comboSimple.remoteGroup);
app.get('/demo/comboSimple/remoteGroupEnlazado', routesCombo.comboSimple.remoteGroupEnlazado);
app.get('/demo/comboEnlazadoSimple/remoteEnlazadoProvincia', routesCombo.comboEnlazadoSimple.remoteEnlazadoProvincia);
app.get('/demo/comboEnlazadoSimple/remoteEnlazadoComarca', routesCombo.comboEnlazadoSimple.remoteEnlazadoComarca);
app.get('/demo/comboEnlazadoSimple/remoteEnlazadoLocalidad', routesCombo.comboEnlazadoSimple.remoteEnlazadoLocalidad);
app.get('/demo/comboEnlazadoMultiple/departamentoRemote', routesCombo.comboEnlazadoMultiple.departamentoRemote);
app.get('/demo/comboEnlazadoMultiple/provinciaRemote', routesCombo.comboEnlazadoMultiple.provinciaRemote);
app.get('/demo/comboEnlazadoMultiple/dptoProvRemote', routesCombo.comboEnlazadoMultiple.dptoProvRemote);



app.listen(8080);

console.log('Listening on port 8080...');
