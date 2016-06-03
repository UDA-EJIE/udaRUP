App.Views = App.Views || {};

App.Views.Date = Backbone.View.extend({
    el: '#container',
    events: {
        "click #fecha_button": "openFecha",
        "click #fecha_multi_button": "openFechaMulti",
        "click #fecha_inline_button": "openFechaInline"
    },
    render: renderDateView,
    openFecha: fncOpenFecha,
    openFechaMulti: fncOpenFechaMulti,
    openFechaInline: fncOpenFechaInline
});



function renderDateView(){
    
    var template = App.Templates["app/components/date/date.hbs"];
    this.$el.html(template({}));

   $("#fecha").rup_date({
		labelMaskId : "fecha-mask",
		showButtonPanel : true,
		showOtherMonths : true,
		noWeekend : true
		//, buttonImage : "/rup/basic-theme/images/exclamation.png"
	});
	
	$("#fecha_multi").rup_date({
		multiSelect: 3,
		//multiSelect: [0,5],
		labelMaskId : "fecha_multi-mask",
		buttonImage : "/rup/basic-theme/images/exclamation.png"
	});
	
	$.rup_date({		
		from: "desde",
		to: "hasta",
		//Resto igual que en date
		labelMaskId : "intervalo-mask",
		numberOfMonths: 3,
		onSelect: function(selectedDate){
			/*alert("La fecha seleccionada es: " + selectedDate);*/
		}
	});
	
	$.rup_date({		
		from: "desdeDateTime",
		to: "hastaDateTime",
		//Resto igual que en date
		labelMaskId : "intervalo-mask-date-time",
		numberOfMonths: 3,
		datetimepicker:true,
		showButtonPanel : true,
		showOtherMonths : true,
		noWeekend : true,
		mask: "dd/mm/yyyy hh:mm",
		showSecond: false,
		dateFormat: "dd/mm/yyyy",
		timeFormat: 'hh:mm',
		onSelect: function(selectedDate){
			/*alert("La fecha seleccionada es: " + selectedDate);*/
		}
	});
	
	$("#fecha_inline").rup_date({
		changeMonth : false,
		changeYear	: false,
		numberOfMonths : [2, 3],
		stepMonths : 6,
		showWeek: true,
		minDate: $.rup_utils.createDate(01, 01, 2012),
		maxDate: $.rup_utils.createDate(31, 12, 2012)		
	});
}

function fncOpenFecha(){
    /*alert("Fecha: "+$("#fecha").rup_date("getDate"));*/
}

function fncOpenFechaMulti(){
    /*alert("Fechas: "+$("#fecha_multi").rup_date("getDate"));*/
}

function fncOpenFechaInline(){
    /*alert("Fecha: "+$("#fecha_inline").rup_date("getDate"));*/
}