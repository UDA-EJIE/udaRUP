exports.audit = function(req, res){
    console.info('=============================');
    console.info(JSON.stringify(req.body));
    console.info('=============================');
    res.status(200).json(req.body);
};