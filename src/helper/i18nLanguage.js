module.exports = function (options) {

	var langJSON = {};
	langJSON[options.hash.lang] =  jQuery.parseJSON('{'+options.fn(this)+'}');

	options.data.languages = jQuery.extend(true, {}, options.data.languages, langJSON);


};
