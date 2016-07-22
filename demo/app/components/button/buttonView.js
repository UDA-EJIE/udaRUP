define(['marionette',
        'templates',
        'rup/button'], function(Marionette, App){

  var ButtonView = Marionette.LayoutView.extend({
    template: App.Templates.demo.app.components.button.buttonTemplate,
    ui:{
      btnDefault: "#boton",
      btnDropdownList: "#dropdownHtmlListButton",
      btnDropdownDialog: "#dropdownDialogButton",
      dropdownDialog: "#dropdownDialog",
      dropdownElem: "#dropdownElem1",
      dropdownCombo: "#dropdownButton-combo"
    },
    events:{
      'click @ui.dropdownElem': fncDropdownElementClick
    },
    onDomRefresh: fncOnDomRefresh

  });

  function fncOnDomRefresh(){
    var $view = this;

   	$view.ui.btnDefault.rup_button({});

  	$view.ui.btnDropdownList.rup_button({
  		dropdown:{
  			dropdownListId:"dropdownHtmlList"
  		}
  	});

  	// Dropdown dialog

  	$view.ui.btnDropdownDialog.rup_button({
  		dropdown:{
  			dropdownDialog: "dropdownDialog",
  			dropdownDialogConfig:{
  				title:"<span class='rup-icon rup-icon-filter'/>Administración de filtros",
  				width:"380px",
  				buttons: [{
  					text: "Guardar",
  					click: function () {
  					}
  				},
  				{
  					text: "Aceptar",
  					click: function () {
  					}
  				},
  				{
  					text: "Eliminar",
  					click: function () {
  					}
  				},
  				{
  					text: "Cancelar",
  					click: function () {
  						$view.ui.dropdownDialog.dialog("close");
  					},
  					btnType: $.rup.dialog.LINK
  				}
  				]
  			}
  		}
  	});

  	var options_ejie_combo = {
  			source : [
  			   {label:"Si", value:"0"},
  			   {label:"No", value:"1"}
  			],
  			width: 120,
  			blank: ""
  		};


  	$view.ui.dropdownCombo.rup_combo(options_ejie_combo);
  }

  function fncDropdownElementClick (){
    alert("Seleccionado elemento 1");
  }

  return ButtonView;

});
