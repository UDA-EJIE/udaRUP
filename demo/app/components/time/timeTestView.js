define(['marionette',
	'./timeTestTemplate.hbs',
	'rup.time','rup.button'], function(Marionette, TimeTestTemplate){

	var TimeTestView = Marionette.LayoutView.extend({
		template: TimeTestTemplate,
		ui:{
			timeFull: '#hora',
			timeShort: '#hora2',
			timeInline: '#hora_inline'
		},
		onAttach: fncOnAttach
	});

	function fncOnAttach(){
		var $view = this;

		$view.ui.timeFull.rup_time({
			labelMaskId : 'hora-mask',
			showSecond : true,
			timeFormat: 'hh:mm:ss',
			showButtonPanel: true
		});

		$view.ui.timeShort.rup_time({
			showTime: false,
			ampm : true,
			hour: 8,
			minute: 30,
			hourMin: 8,
			hourMax: 18,
			stepHour : 2,
			stepMinute : 10
			//,disabled:true
		});

		$view.ui.timeInline.rup_time({
			hourGrid: 5,
			minuteGrid: 10
		});

		$view.ui.timeInline.rup_time('setTime', new Date());
	}


	return TimeTestView;
});
