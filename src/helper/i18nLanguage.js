module.exports = function (options) {

	var langJSON = {};
	langJSON[options.hash.lang] = JSON.parse('{'+options.fn(this)+'}');

	options.data.languages = jQuery.extend(true, {}, options.data.languages, langJSON);


};
