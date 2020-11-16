exports.getHTML = function (req, res) {
    res.status(200).header('Content-Type', 'text/hml').send('<div>Dialogo <strong>Ajax</strong></div>');
};