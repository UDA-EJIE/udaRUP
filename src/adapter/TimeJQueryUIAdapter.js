/*global jQuery */
/*global define */

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {

        // AMD. Register as an anonymous module.
        define(['jquery', '../rup.base', '../templates'], factory);
    } else {

        // Browser globals
        root.TimeJQueryUIAdapter = factory(jQuery);
    }
}(this, function ($) {

    function TimeJQueryUIAdapter() {

    }

    TimeJQueryUIAdapter.prototype.NAME = 'time_jqueryui';

    TimeJQueryUIAdapter.prototype.initIconTrigger = function (settings) {
        var $self = this;
        if (!$self.is('div')) {


            $('<img>').addClass('ui-timepicker-trigger')
                .attr({
                    'src': settings.buttonImage,
                    'alt': $.rup.i18nParse($.rup.i18n.base, 'rup_time.buttonText'),
                    'title': $.rup.i18nParse($.rup.i18n.base, 'rup_time.buttonText')
                })
                .click(function () {
                    if ($('#ui-datepicker-div').css('display') === 'none') {
                        $self.timepicker('show');
                    } else {
                        $self.timepicker('hide');
                    }
                })
                .insertAfter($self);
        }
    };

    TimeJQueryUIAdapter.prototype.postConfigure = function (settings) {

    };



    $.rup = $.rup || {};
    $.rup.adapter = $.rup.adapter || {};

    $.rup.adapter[TimeJQueryUIAdapter.prototype.NAME] = new TimeJQueryUIAdapter;

    return $;
}));