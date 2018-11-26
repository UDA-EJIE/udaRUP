define(['marionette',
	'./calendarTestTemplate.hbs',
	'rup.calendar', 'rup.button'
], function (Marionette, CalendarTestTemplate) {

	var CalendarTestView = Marionette.LayoutView.extend({
		template: CalendarTestTemplate,
		ui: {
			calendar: '#calendar'
		},
		onAttach: fncOnAttach
	});

	function fncOnAttach() {
		//CALENDARIO
		var options = {
			events_source: function () {
				return [];
			},
			language: $.rup.lang,
			view: 'month',
			tmpl_path: STATICS + '/tmpls/',
			tmpl_cache: false,
			weekbox: false,
			extraParams: {
				calFilter: $('#calendario_filter_form').rup_form().formToJson()
			},
			onAfterEventsLoad: function (events) {
				if (!events) {
					return;
				}
				var list = $('#eventlist');
				list.html('');

				$.each(events, function (key, val) {
					$(document.createElement('li'))
						.html('<div href="' + val.url + '">' + val.title + '</div>')
						.appendTo(list);
				});
			},
			onAfterViewLoad: function (view) {
				$('.page-header h3').text(this.getTitle());
				$('.btn-group button').removeClass('active');
				$('button[data-calendar-view="' + view + '"]').addClass('active');
			},
			classes: {
				months: {
					general: 'label'
				}
			}
		};
		
		var calendar = $(this.ui.calendar).rup_calendar(options);

		$('.btn-group span[data-calendar-nav]').each(function () {
			var $this = $(this);
			$this.click(function () {
				calendar.navigate($this.data('calendar-nav'));
			});
		});

		$('.btn-group span[data-calendar-view]').each(function () {
			var $this = $(this);
			$this.click(function () {
				calendar.view($this.data('calendar-view'));
				$('.btn-group span[data-calendar-view].active').removeClass('active');
				$this.addClass('active');
			});
		});
	}

	return CalendarTestView;
});