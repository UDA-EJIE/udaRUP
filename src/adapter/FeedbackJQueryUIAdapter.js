(function (root, factory) {
  if (typeof define === "function" && define.amd) {

    // AMD. Register as an anonymous module.
    define(["jquery", "../rup.base", "../templates"], factory);
  } else {

    // Browser globals
    root.FeedbackJQueryUIAdapter = factory(jQuery);
  }
}(this, function ($) {

  function FeedbackJQueryUIAdapter() {

  }

  FeedbackJQueryUIAdapter.prototype.classComponent = function () {
    return "rup-jqueryui";
  }

  FeedbackJQueryUIAdapter.prototype.closeLiteral = function () {
    return $.rup.i18nParse($.rup.i18n.base, "rup_global.cerrar");
  }


  return FeedbackJQueryUIAdapter;
}));