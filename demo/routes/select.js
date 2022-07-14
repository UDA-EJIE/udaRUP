exports.selectSimple = {};
exports.comboEnlazadoSimple = {};
exports.comboEnlazadoMultiple = {};

exports.selectSimple.remote = function(req, res) {
  var json = require('./json/selectSimple.remote.json');
  res.status(200).json(json);
};

exports.selectSimple.remoteDos = function(req, res) {
  var json = require('./json/selectSimple.remoteDos.json');
  res.status(200).json(json);
};

exports.selectSimple.remoteGroup = function(req, res) {
  var json = require('./json/selectSimple.remoteGroup.json');
  res.status(200).json(json);
};

exports.selectSimple.remoteGroupEnlazado = function(req, res) {
  var retArray = [],
      jsonProvincias = require('./json/comboEnlazadoSimple.remoteEnlazadoProvincia.json'),
      jsonComarcas = require('./json/comboEnlazadoSimple.remoteEnlazadoComarca.json'),
      jsonLocalidades = require('./json/comboEnlazadoSimple.remoteEnlazadoLocalidad.json'),
      localidadAux = [],
      comarcasProvincia= [],
      localidadesProvincia = [];

  if (req.query.provincia===undefined){
    retArray.push({"Provincia": jsonProvincias});
    for(var i=0;i<jsonProvincias.length;i++){
      comarcasProvincia = comarcasProvincia.concat(jsonComarcas[jsonProvincias[i].value]);
    }

  }else{
    comarcasProvincia = jsonComarcas[req.query.provincia+""];
  }



  retArray.push({"Comarca": comarcasProvincia});

  for (var j=0;j<comarcasProvincia.length;j++){
    localidadesProvincia = localidadesProvincia.concat(jsonLocalidades[comarcasProvincia[j].value]);
  }

  retArray.push({"Localidad": localidadesProvincia});

  res.status(200).json(retArray);
};

exports.comboEnlazadoSimple.remoteEnlazadoProvincia = function(req, res) {
  var json = require('./json/comboEnlazadoSimple.remoteEnlazadoProvincia.json');

  res.status(200).json(json);
};

exports.comboEnlazadoSimple.remoteEnlazadoComarca = function(req, res) {
  var json = require('./json/comboEnlazadoSimple.remoteEnlazadoComarca.json');
  res.status(200).json(json[req.query.provincia+""]);
};

exports.comboEnlazadoSimple.remoteEnlazadoLocalidad = function(req, res) {
  var json = require('./json/comboEnlazadoSimple.remoteEnlazadoLocalidad.json');
  res.status(200).json(json[req.query.comarca+""]);
};

exports.comboEnlazadoMultiple.departamentoRemote = function(req, res) {
  var json = require('./json/comboEnlazadoMultiple.departamentoRemote');
  res.status(200).json(json);
};

exports.comboEnlazadoMultiple.provinciaRemote = function(req, res) {
  var json = require('./json/comboEnlazadoSimple.remoteEnlazadoProvincia.json');
  res.status(200).json(json);
};

exports.comboEnlazadoMultiple.dptoProvRemote = function(req, res) {
  var json = require('./json/comboEnlazadoMultiple.dptoProvRemote.json'),
      idProvincia = req.query.provincia,
      idDepartamento = req.query.departamento,
      retArray=[];

  for (var i=0;i<json.length;i++){
    if (json[i].idDepartamento===idDepartamento && json[i].idProvincia === idProvincia){
      retArray.push(json[i]);
    }
  }

  res.status(200).json(retArray);
};
