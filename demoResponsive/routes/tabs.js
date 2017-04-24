exports.tabsContent1 = function(req, res) {

  var path = require("path")

  res.sendFile(path.join(__dirname+'/html/tabsContent_1.html'));
};

exports.tabsContent2 = function(req, res) {

  var path = require("path")

  res.sendFile(path.join(__dirname+'/html/tabsContent_2.html'));
};

exports.tabsContent3 = function(req, res) {

  var path = require("path")

  res.sendFile(path.join(__dirname+'/html/tabsContent_3.html'));
};
