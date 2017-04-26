define(['marionette',
        'templates',
        'rup/rup.date'], function(Marionette, App){

  var DateTestView = Marionette.LayoutView.extend({
      template: App.Templates.demo.app.components.date.dateTestTemplate,
      openDate: fncOpenDate,
      openDateMultiple: fncOpenDateMultiple,
      openDateInline: fncOpenDateInline,
      ui:{
        date: "#fecha",
        dateMultiple: "#fecha_multi",
        dateInline: "#fecha_inline",
        btnDate: "#fecha_button",
        btnDateMultiple: "#fecha_multi_button",
        btnDateInline: "#fecha_inline_button"
      },
      events:{
        'click @ui.btnDate': "openDate",
        'click @ui.dateMultiple': "openDateMultiple",
        'click @ui.dateInline': "openDateInline"
      },
      onAttach: fncOnAttach
  });

  function fncOnAttach(){
    var $view = this;


    var $view = this;

    $view.ui.date.rup_date({
  		labelMaskId : "fecha-mask",
  		showButtonPanel : true,
  		showOtherMonths : true,
  		noWeekend : true
  		//, buttonImage : "/rup/basic-theme/images/exclamation.png"
  	});

  	$view.ui.dateMultiple.rup_date({
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

  	$view.ui.dateInline.rup_date({
  		changeMonth : false,
  		changeYear	: false,
  		numberOfMonths : [2, 3],
  		stepMonths : 6,
  		showWeek: true,
  		minDate: $.rup_utils.createDate(01, 01, 2012),
  		maxDate: $.rup_utils.createDate(31, 12, 2012)
  	});
  }

  function fncOpenDate(){
    alert("Fecha: "+this.ui.date.rup_date("getDate"));
  }
  function fncOpenDateMultiple(){
		alert("Fechas: "+this.ui.dateMultiple.rup_date("getDate"));
  }
  function fncOpenDateInline(){
		alert("Fecha: "+this.ui.dateInline.rup_date("getDate"));
  }

  return DateTestView;
});
