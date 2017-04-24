exports.getAll = function(req, res) {
  var json = require('./json/table.json');

  //console.log(req.body.filter);
//  JSON.parse(result)

  LokiDb = require('../../lokiDb');
  //console.log(LokiDb.getText());
  var dashboards = LokiDb.dashboard.getAll();


  res.status(200).json(dashboards.data);
};


exports.get = function(req, res) {

  LokiDb = require('../../lokiDb');
  //console.log(LokiDb.getText());
  var dashboards = LokiDb.dashboard.getAll();

  //ret.rows = users.data;
  console.log(dashboards);
  var queryRes = dashboards.chain().find({id: req.params.id}).data();
  console.log(req.params.id);
  console.log(queryRes);
  if (queryRes.length===1){
      res.status(200).json(queryRes[0]);
  }else{
    res.status(200).json({});
  }
};

exports.put = function(req, res) {

  LokiDb = require('../../lokiDb');
  console.log(req.body);
  var dashboards = LokiDb.dashboard.getAll();
  //ret.rows = users.data;
  //var queryRes = users.update(req.body);
  LokiDb.upsert(dashboards, "id", req.body);

  res.status(200).json(req.body);
};

exports.post = function(req, res) {

  LokiDb = require('../../lokiDb');
  //console.log(LokiDb.getText());
  var dashboards = LokiDb.dashboard.getAll();

  dashboards.insert(req.body);

  res.status(200).json(req.body);
};
