define(['marionette',
	'./progressbarTestTemplate.hbs',
	'rup.progressbar','rup.button'], function(Marionette, ProgressbarTestTemplate){

	var ProgressbarTestView = Marionette.View.extend({
		template: ProgressbarTestTemplate,
		ui:{
			progressbar: '#progressbar',
			progressbarLabel: '#progressbarLabel',
			progressbarValueFalse: '#progressbarValueFalse'
		},
		onAttach: fncOnAttach

	});

	function fncOnAttach(){

		var $view = this;

		$view.ui.progressbar.rup_progressbar({
			value: 37
		});

		$view.ui.progressbarLabel.rup_progressbar({
			value: 37,
			label: $.rup.i18n.base.rup_progressbar.progress
		});

		$view.ui.progressbarValueFalse.rup_progressbar({
			value: false,
			label: $.rup.i18n.base.rup_progressbar.loading
		});
	}


	return ProgressbarTestView;
});
