exports.filter = function(req, res) {
    var json = require('./json/jqtable.json');

    //console.log(req.body.filter);
    //  JSON.parse(result)

    LokiDb = require('../../lokiDb');
    //console.log(LokiDb.getText());
    var users = LokiDb.getUsers();

    //ret.rows = users.data;
    var queryRes = users.chain().find(req.body.filter)
        .simplesort(req.body.sidx, req.body.sord==='desc')
        .data();


    var page = parseInt(req.body.page);
    var rows = parseInt(req.body.rows);
    var from = rows*(page-1);
    var to = from + rows;
    var retRows = queryRes.slice(from, to);



    var ret = {
        'page': page,
        'records': queryRes.length,
        'rows': retRows,
        'total':Math.ceil(queryRes.length/rows),
        'selectedAll':null,
        'reorderedSelection':null
    };
    res.status(200).json(ret);
};


exports.get = function(req, res) {

    LokiDb = require('../../lokiDb');
    //console.log(LokiDb.getText());
    var users = LokiDb.getUsers();

    //ret.rows = users.data;
    console.log(users);
    var queryRes = users.chain().find({id: req.params.id}).data();
    console.log(req.params.id);
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
    LokiDb.upsert(users, 'id', req.body);

    res.status(200).json(req.body);
};

exports.post = function(req, res) {

    LokiDb = require('../../lokiDb');
    //console.log(LokiDb.getText());
    var users = LokiDb.getUsers();

    users.insert(req.body);

    res.status(200).json(req.body);
};

exports.search = function (req,res) {
    var ret = [
        {
            'page': 1,
            'pageLine': 0,
            'tableLine': 0,
            'pk': {
                'id': '0'
            }
        }
    ];
    res.status(200).json(ret);
};