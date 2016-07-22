exports.filter = function(req, res) {
  var json = require('./json/table.json');

  //console.log(req.body.filter);
//  JSON.parse(result)

  LokiDb = require('../../lokiDb');
  //console.log(LokiDb.getText());
  var users = LokiDb.getUsers();

  //ret.rows = users.data;
  var queryRes = users.chain().find(req.body.filter)
    .simplesort(req.body.sidx, req.body.sord==="desc")
    .data();


  var ret = {
    "page": req.body.page,
    "records": queryRes.length,
    "rows": queryRes.slice((req.body.rows*(req.body.page-1)+1),((req.body.rows*req.body.page-1)+req.body.rows)+1),
    "total":Math.ceil(queryRes.length/req.body.rows),
    "selectedAll":null,
    "reorderedSelection":null
  };



  //console.log(users.data);


  res.status(200).json(ret);
};


exports.get = function(req, res) {

  LokiDb = require('../../lokiDb');
  //console.log(LokiDb.getText());
  var users = LokiDb.getUsers();

  //ret.rows = users.data;
  var queryRes = users.chain().find({id: req.params.id}).data();

  if (queryRes.length===1){
      res.status(200).json(queryRes[0]);
  }else{
    res.status(200).json({});
  }
};

exports.put = function(req, res) {



  LokiDb = require('../../lokiDb');
  console.log(req.body);
  var users = LokiDb.getUsers();
  //ret.rows = users.data;
  //var queryRes = users.update(req.body);
  LokiDb.upsert(users, "id", req.body);

  res.status(200).json(req.body);
};

exports.post = function(req, res) {

  LokiDb = require('../../lokiDb');
  //console.log(LokiDb.getText());
  var users = LokiDb.getUsers();

  users.insert(req.body);

  res.status(200).json(req.body);
};
