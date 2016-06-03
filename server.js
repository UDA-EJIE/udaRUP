var express = require('express'),
    http = require('http');
    // accesoFamilias = require('./routes/accesoFamilias'),
    // listadoEscritorios = require('./routes/listadoEscritorios'),
    // userData = require('./routes/userData'),
    // cargaEscritorio = require('./routes/cargaEscritorio'),
    // expedientesRecientes = require('./routes/expedientesRecientes'),
    // accesoFamiliasSinOCE = require('./routes/accesoFamiliasSinOCE'),
    // listadoFavoritos = require('./routes/listadoFavoritos'),
    // genericaFilter = require('./routes/genericaFilter'),
    // bodyParser = require('body-parser'),


var app = express();
/*
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
*/
app.use(express.static('./'));
/*
app.get('/y52bEscritorioWar/escritorios/accesoFamilias', accesoFamilias.findAll);
app.get('/y52bEscritorioWar/escritorios/listadoEscritorios', listadoEscritorios.findAll);
app.get('/y52bEscritorioWar/escritorios/userData', userData.findAll);
app.get('/y52bEscritorioWar/escritorios/cargaEscritorio/:id', cargaEscritorio.findById);
app.post('/y52bEscritorioWar/escritorios/cargaInicial/filter', expedientesRecientes.filter);
app.get('/y52bEscritorioWar/escritorios/accesoFamiliasSinOCE', accesoFamiliasSinOCE.get);
app.post('/y52bEscritorioWar/escritorios/favoritos/filter', listadoFavoritos.filter);
app.post('/y52bEscritorioWar/escritorios/expRecientes/5/filter', expedientesRecientes.get5Filter);
app.post('/y52bEscritorioWar/escritorios/generica/filter', genericaFilter.filter);
*/

//app.get('/wines/:id', wines.findById);

app.listen(8080);
console.log('Listening on port 8080...');
