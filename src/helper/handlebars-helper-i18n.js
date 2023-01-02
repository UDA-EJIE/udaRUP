/**
 * {{i18n}} <http://github.com/helpers/handlebars-helper-i18n>
 *
 * Copyright (c) 2014 Laurent Goderre <https://github.com/LaurentGoderre>
 * Licensed under the MIT License (MIT)
 */

/**
 * @param  {String} `key` The name of the property to use as context.
 * @param  {Object} `options`
 * @return {Object}
 */

/*global Handlebars */

(function (factory) {
    if (typeof define === 'function' && define.amd) {

        // AMD. Register as an anonymous module.
        define(['jquery', 'handlebars'], factory);
    } else {

        // Browser globals
        factory(jQuery, Handlebars);
    }
}(function ($, Handlebars) {
    Handlebars.i18n = {};
    Handlebars.i18n.languages = [];

    Handlebars.registerHelper('i18nLanguages', function (options) {
        options.data.languages = [];
    });

    Handlebars.registerHelper('i18nLanguage', function (options) {
        var langJSON = {};
        langJSON[options.hash.lang] = JSON.parse('{' + options.fn(this) + '}');

        options.data.languages = $.extend(true, {}, options.data.languages, langJSON);
    });

    Handlebars.registerHelper('i18n', function (key, options) {
        options = options || {};
        options.hash = options.hash || {};

        if (typeof key !== 'string') {
            throw '{{i18n}} helper: invalid key. Object keys must be formatted as strings.';
        }

        if (typeof options.hash.language === 'string') {
            window.language = options.hash.language;
        } else {
            window.language = this.datosIdioma;
        }

        return $.rup.i18nParse($.rup.i18n.base, key);
    });

    return Handlebars;
}));