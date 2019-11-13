var audited = [];

exports.audit = function (req, res) {
    audited.push(req.body.nombreComponente);
    res.status(200).json(req.body);
};
exports.getAudited = function (req, res) {
    res.status(200).json(audited);
};
