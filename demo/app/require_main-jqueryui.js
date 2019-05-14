require(['./require_main'], function (require_main) {
  require(["app-jqueryui"], function (Escritorio) {
    $.fn.rup_button.defaults.adapter = "button_jqueryui";
    $.fn.rup_date.defaults.adapter = "date_jqueryui";
    $.fn.rup_jqtable.plugins.core.defaults.adapter = "table_jqueryui";
    $.fn.rup_time.defaults.adapter = "time_jqueryui";
    $.fn.rup_toolbar.defaults.adapter = "toolbar_jqueryui";
    $.fn.rup_upload.defaults.adapter = "upload_jqueryui";
    $.fn.rup_validate.defaults.adapter = "validate_jqueryui";
    $.fn.rup_feedback.defaults.adapter = "feedback_jqueryui";
    Escritorio.start();
  });
});