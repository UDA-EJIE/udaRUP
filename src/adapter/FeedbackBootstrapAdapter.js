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
  
  FeedbackBootstrapAdapter.prototype.NAME = "feedback_bootstrap";

  FeedbackBootstrapAdapter.prototype.classComponent = function () {
    return "rup-bootstrap";
  }

  FeedbackBootstrapAdapter.prototype.closeLiteral = function () {
    return "";
  }


  $.rup = $.rup || {};
  $.rup.adapter = $.rup.adapter || {};
  
  $.rup.adapter[FeedbackBootstrapAdapter.prototype.NAME ] = new FeedbackBootstrapAdapter;
  
  return $;
}));