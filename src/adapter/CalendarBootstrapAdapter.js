/*global jQuery */
/*global define */

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {

        // AMD. Register as an anonymous module.
        define(['jquery', '../rup.base', '../templates'], factory);
    } else {

        // Browser globals
        root.CalendarBootstrapAdapter = factory(jQuery);
    }
}(this, function ($) {

    function CalendarBootstrapAdapter() {

    }

    CalendarBootstrapAdapter.prototype.NAME = 'calendar_bootstrap';

    CalendarBootstrapAdapter.prototype.classComponent = function () {
        return 'rup-bootstrap';
    };

    CalendarBootstrapAdapter.prototype.closeLiteral = function () {
        return '';
    };


    $.rup = $.rup || {};
    $.rup.adapter = $.rup.adapter || {};

    $.rup.adapter[CalendarBootstrapAdapter.prototype.NAME] = new CalendarBootstrapAdapter();

    return $;
}));