/*global jQuery */
/*global define */

(function (factory) {
	if (typeof define === 'function' && define.amd) {

		// AMD. Register as an anonymous module.
		define(['jquery',
			'./DateBootstrapAdapter',
			'./TimeJQueryUIAdapter',
			'./TimeBootstrapAdapter',
			'./UploadJQueryUIAdapter',
			'./UploadBootstrapAdapter',
			'./ButtonJQueryUIAdapter',
			'./ButtonBootstrapAdapter',
			'./ToolbarJQueryUIAdapter',
			'./ToolbarBootstrapAdapter',
			'./DatatableJQueryUIAdapter',
			'./DatatableBootstrapAdapter',
			'./TableJQueryUIAdapter',
			'./TableBootstrapAdapter',
			'./ValidateJQueryUIAdapter',
			'./ValidateBootstrapAdapter',
			'./FeedbackJQueryUIAdapter',
			'./FeedbackBootstrapAdapter'
		], factory);
	} else {

		// Browser globals
		factory(jQuery);
	}
}(function ($, Templates,
	DateBootstrapAdapter,
	TimeJQueryUIAdapter,
	TimeBootstrapAdapter,
	UploadJQueryUIAdapter,
	UploadBootstrapAdapter,
	ButtonJQueryUIAdapter,
	ButtonBootstrapAdapter,
	ToolbarJQueryUIAdapter,
	ToolbarBootstrapAdapter,
	DatatableJQueryUIAdapter,
	DatatableBootstrapAdapter,
	TableJQueryUIAdapter,
	TableBootstrapAdapter,
	ValidateJQueryUIAdapter,
	ValidateBootstrapAdapter,
	FeedbackJQueryUIAdapter,
	FeedbackBootstrapAdapter
) {







	return $;


}));
