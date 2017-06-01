(function (root, factory) {
  if (typeof define === "function" && define.amd) {

    // AMD. Register as an anonymous module.
    define(["jquery", "../rup.base", "../templates"], factory);
  } else {

    // Browser globals
    root.FeedbackBootstrapAdapter = factory(jQuery);
  }
}(this, function ($) {

  function FeedbackBootstrapAdapter() {

  }

  FeedbackBootstrapAdapter.prototype.classComponent = function () {
    return "rup-bootstrap";
  }

  FeedbackBootstrapAdapter.prototype.closeLiteral = function () {
    return "";
  }


  return FeedbackBootstrapAdapter;
}));