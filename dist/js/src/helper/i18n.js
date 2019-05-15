module.exports = function (key, options) {
	options = options || {};
	options.hash = options.hash || {};

	var language;

	if (typeof key !== 'string') {
		throw '{{i18n}} helper: invalid key. Object keys must be formatted as strings.';
	}

	if (typeof options.hash.language === 'string') {
		language = options.hash.language;
	} else {
		language = this.datosIdioma;
	}

	//return options.data.languages[language][key];
	return $.rup.i18nParse($.rup.i18n.base, key);
};
