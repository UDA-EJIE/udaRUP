/*
 * MultiDatesPicker v1.4.0
 * http://multidatespickr.sourceforge.net/
 *
 * Copyright 2010, Luca Lauretta
 * Dual licensed under the MIT or GPL Version 2 licenses.
 */
(function( $ ){
	$.fn.multiDatesPicker = function(method) {
		var mdp_arguments = arguments;
		var ret = this;
		var today_date = new Date();
		var day_zero = new Date(0);
		var mdp_events = {};
		
		function datesArraySwitch(type){ return type == 'avoided' ? 'avoidedDates' : 'selectedDates'; };
		function removeDate(index, type) { this.multiDatesPicker[datesArraySwitch(type)].splice(index, 1); }
		function addDate(date, type) {
			if (methods.gotDate.call(this, date, type) === false) {
				var darr = datesArraySwitch(type);
				this.multiDatesPicker[darr].push(dateConvert(date, 'object'));
				this.multiDatesPicker[darr].sort(methods.compareDates);
			} 
		}
		function dateConvert(date, desired_type) {
			return methods.dateConvert(date, desired_type);
		}
		
		var methods = {
			init : function( options ) {
				$this = $(this);
				this.multiDatesPicker.changed = false;
				
				if(options) {
					this.multiDatesPicker.originalBeforeShow = options.beforeShow;
					this.multiDatesPicker.originalOnSelect = options.onSelect;
					this.multiDatesPicker.originalBeforeShowDay = options.beforeShowDay;
					this.multiDatesPicker.originalOnClose = options.onClose;
					
					this.multiDatesPicker.minDate = $.datepicker._determineDate(this, options.minDate, day_zero);
					this.multiDatesPicker.firstAvailableDay = methods.compareDates(this.multiDatesPicker.minDate, day_zero);
					
					if(options.addDates) methods.addDates.call(this, options.addDates);
					if(options.addAvoidedDates) methods.addDates.call(this, options.addAvoidedDates, 'avoided');
					
					if(options.mode) methods.setMode.call(this, options.mode);
				}
				
				$this.datepicker(options);
				
				mdp_events = {
					beforeShow: function(input, inst) {
						this.multiDatesPicker.changed = false;
						if(this.multiDatesPicker.originalBeforeShow) this.multiDatesPicker.originalBeforeShow.call(this, input, inst);
					},
					onSelect : function(dateText, inst) {
						this.multiDatesPicker.changed = true;
						
						if (dateText) {
							$(this).multiDatesPicker('toggleDate', dateText);
							var current_date = methods.dateConvert(dateText, 'object');
						}
						var dates_picked = $(this).multiDatesPicker('getDates');
						var datos = this.multiDatesPicker.mode.options;
						
						if (dates_picked.length > 0) {
							if (this.multiDatesPicker.mode.modeName == 'normal') {
								if (datos.pickableRange) {
									var min_date = methods.compareDates(this.multiDatesPicker.minDate, today_date);
									var max_date = min_date + datos.pickableRangeDelay + pickableRange;
									
									// min
									var n_min_date = methods.compareDates(dates_picked[0], min_date);
									
									// max
									var n_max_date = n_min_date + datos.pickableRange;
									
									// adjust
									if (n_max_date > max_date) min_date = max_date - datos.pickableRange + 1;
									else {
										max_date = n_max_date;
										min_date = n_min_date;
									}
										
									// counts the number of avoided dates in the range
									var c_avoided;
									do {
										c_avoided = 0;
										for(var i in this.multiDatesPicker.avoidedDates) {
											if(methods.compareDates(this.multiDatesPicker.avoidedDates[i], min_date) >= 0 &&
													methods.compareDates(this.multiDatesPicker.avoidedDates[i], max_date) <= 0)
												c_avoided++;
										}
										max_date = max_date + c_avoided;
									} while(c_avoided != 0);
									
									$(this).datepicker("option", "minDate", min_date);
									$(this).datepicker("option", "maxDate", max_date);
								}
							}
						}
						
						if(this.tagName == 'INPUT') { // for inputs
							$(this).val(
								$(this).multiDatesPicker('getDates', 'string')
							);
						}
						
						if(this.multiDatesPicker.originalOnSelect && dateText) this.multiDatesPicker.originalOnSelect.call(this, dateText, inst);
					},
					beforeShowDay : function(date) {
						var gotThisDate = $(this).multiDatesPicker('gotDate', date) !== false;
						var highlight_class = gotThisDate
							? 'ui-state-highlight'
							: '';
							
						var isAvoidedDate = $(this).multiDatesPicker('gotDate', date, 'avoided') !== false;
						var allSelected = this.multiDatesPicker.mode.options.maxPicks == $(this).multiDatesPicker('getDates').length;
						var selectable_date = (isAvoidedDate || (allSelected && !highlight_class))
							? false
							: true;
							
						if(this.multiDatesPicker.originalBeforeShowDay) this.multiDatesPicker.originalBeforeShowDay.call(this, date);
						
						return [selectable_date, highlight_class];
					},
					onClose: function(dateText, inst) {
						if(this.tagName == 'INPUT' && this.multiDatesPicker.changed) {
							$(inst.dpDiv[0]).stop(false,true);
							setTimeout('$("#'+inst.id+'").datepicker("show")',50);
						}
						if(this.multiDatesPicker.originalOnClose) this.multiDatesPicker.originalOnClose.call(this, dateText, inst);
					}
				};
				
				$this.datepicker('option', mdp_events);
			},
			compareDates : function(date1, date2) {
				var i_dates = [date1, date2];
				var o_dates = new Array();
				var one_day = 1000*60*60*24;
				
				for(i in i_dates) o_dates.push(dateConvert(i_dates[i], 'object'));
				
				// return > 0 means date1 is later than date2 
				// return == 0 means date1 is the same day as date2 
				// return < 0 means date1 is earlier than date2 
				var diff = (o_dates[0].getTime() - o_dates[1].getTime()) / one_day;
				return (-1<diff && diff<1)
					? 0
					: (diff < 0)
						? Math.ceil(diff * -1) * -1
						: Math.ceil(diff);
			},
			sumDays : function( date, n_days ) {
				var origDateType = typeof date;
				obj_date = dateConvert(date, 'object');
				obj_date.setDate(obj_date.getDate() + n_days);
				return dateConvert(obj_date, origDateType);
			},
			dateConvert : function( date, desired_format ) {
				if(typeof date == 'undefined') date = new Date(0);
				
				if(desired_format != 'string' && desired_format != 'object')
					$.error('Date format "'+ desired_format +'" not supported on jQuery.multiDatesPicker');
				
				if(typeof date == desired_format) return date;
				
				var conversion = typeof date + '->' + desired_format;
				switch(conversion) {
					case 'object->string':
						return $.datepicker.formatDate($.datepicker._defaults.dateFormat, date);
					case 'string->object':
						return $.datepicker.parseDate($.datepicker._defaults.dateFormat, date);
					default: 
						$.error('Conversion "'+ conversion +'" not allowed on jQuery.multiDatesPicker');
				}
			},
			gotDate : function( date, type ) {
				for(var i = 0; i < this.multiDatesPicker[datesArraySwitch(type)].length; i++) {
					if(methods.compareDates(this.multiDatesPicker[datesArraySwitch(type)][i], date) == 0) {
						return i;
					}
				}
				return false;
			},
			getDates : function( format, type ) {
				switch (format) {
					case 'object':
						return this.multiDatesPicker[datesArraySwitch(type)];
					default:
						var o_dates = new Array();
						for(i in this.multiDatesPicker[datesArraySwitch(type)]) o_dates.push(dateConvert(this.multiDatesPicker[datesArraySwitch(type)][i], 'string'));
						return o_dates;
				}
			},
			addDates : function( dates, type ) {
				switch(typeof dates) {
					case 'object':
					case 'array':
						if(dates.length) {
							for(i in dates) addDate.call(this, dates[i], type);
							break;
						} // else does the same as 'string'
					case 'string':
						addDate.call(this, dates, type);
						break;
					default: 
						$.error('Date format "'+ typeof dates +'" not allowed on jQuery.multiDatesPicker');
				}
				$(this).datepicker('refresh');
			},
			removeDates : function( indexes, type ) {
				if(typeof index == 'array')
					for(i in indexes) removeDate.call(this, i, type);
				else
					removeDate.call(this, indexes, type);
				$(this).datepicker('refresh');
			},
			resetDates : function ( type ) {
				this.multiDatesPicker[datesArraySwitch(type)] = [];
				$(this).datepicker('refresh');
			},
			toggleDate : function( date, type ) {
				var index = methods.gotDate.call(this, date);
				var mode = this.multiDatesPicker.mode;
				
				switch(mode.modeName) {
					case 'daysRange':
						this.multiDatesPicker.selectedDates = []; // deletes all selected dates
						var end = mode.options.autoselectRange[1];
						var begin = mode.options.autoselectRange[0];
						if(end < begin) { // switch
							end = mode.options.autoselectRange[0];
							begin = mode.options.autoselectRange[1];
						}
						for(var i = begin; i < end; i++) 
							methods.addDates.call(this, methods.sumDays(date, i));
						break;
					default:
						if(index === false) // adds dates
							methods.addDates.call(this, date);
						else // removes dates
							methods.removeDates.call(this, index);
						break;
				}
			}, 
			setMode : function( mode ) {
				this.multiDatesPicker.mode.modeName = mode.modeName;
				switch(mode.modeName) {
					case 'normal':
						for (option in mode.options)
							switch(option) {
								case 'maxPicks':
								case 'minPicks':
								case 'pickableRange':
								case 'pickableRangeDelay':
								case 'adjustRangeToAvoided':
									this.multiDatesPicker.mode.options[option] = mode.options[option];
									break;
								default: $.error('Option ' + option + ' does not exist for setMode on jQuery.multiDatesPicker');
							}
					break;
					case 'daysRange':
					case 'weeksRange':
						var mandatory = 1;
						for (option in mode.options)
							switch(option) {
								case 'autoselectRange':
									mandatory--;
								case 'pickableRange':
								case 'pickableRangeDelay':
								case 'adjustRangeToAvoided':
									this.multiDatesPicker.mode.options[option] = mode.options[option];
									break;
								default: $.error('Option ' + option + ' does not exist for setMode on jQuery.multiDatesPicker');
							}
						if(mandatory > 0) $.error('Some mandatory options not specified!');
					break;
				}
				
				if(mode.options.pickableRange) {
					$(this).datepicker("option", "maxDate", mode.options.pickableRange + (mode.options.pickableRangeDelay || 0));
					$(this).datepicker("option", "minDate", this.multiDatesPicker.minDate);
				}
				
				if(mdp_events.onSelect) mdp_events.onSelect();
				$(this).datepicker('refresh');
			}
		};
		
		this.each(function() {
			if (!this.multiDatesPicker) 
				this.multiDatesPicker = {
					selectedDates: [],
					avoidedDates: [],
					mode: {
						modeName: 'normal',
						options: {
							adjustRangeToAvoided: true
						}
					}
				};
			
			if(methods[method]) {
				var exec_result = methods[method].apply(this, Array.prototype.slice.call(mdp_arguments, 1));
				switch(method) {
					case 'getDates':
					case 'gotDate':
					case 'sumDays':
					case 'compareDates':
					case 'dateConvert':
						ret = exec_result;
				}
				return exec_result;
			} else if( typeof method === 'object' || ! method ) {
				return methods.init.apply(this, mdp_arguments);
			} else {
				$.error('Method ' +  method + ' does not exist on jQuery.multiDatesPicker');
			}
			
		});
		
		return ret;
	};
})( jQuery );