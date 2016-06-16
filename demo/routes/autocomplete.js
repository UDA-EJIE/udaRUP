exports.remote = function(req, res) {
  var json = [
    {"value":1,"label":"Ayuntamiento de Álava"},
    {"value":2,"label":"Ayuntamiento de Vizcaya"},
    {"value":3,"label":"Ayuntamiento de Gipuzcoa"},
    {"value":4,"label":"Diputación de Álava"},
    {"value":5,"label":"Diputación de Vizcaya"},
    {"value":6,"label":"Diputación de Gipuzcoa"},
    {"value":7,"label":"Policia de Álava"},
    {"value":8,"label":"Policia de Vizcaya"},
    {"value":9,"label":"Policia de Gipuzcoa"},
    {"value":10,"label":"Bomberos de Álava"},
    {"value":11,"label":"Bomberos de Vizcaya"},
    {"value":12,"label":"Bomberos de Gipuzcoa"}
  ];

  //var familias = require('./accesoFamilias.json');
  res.status(200).json(json);

};
