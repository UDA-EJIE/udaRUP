exports.pais = function(req, res) {
  var json = require('./json/nora.pais.json');
  res.status(200).json(json);
};

exports.autonomia = function(req, res) {
  var json = require('./json/nora.autonomia.json');
  res.status(200).json(json);
};

exports.provincia = function(req, res) {
  var json = require('./json/nora.provincia.json');
  res.status(200).json(json);
};
exports.submit = (req, res) => {
  res.status(200);
};