define(['marionette',
        'templates',
        'rup/rup.toolbar'], function(Marionette, App){

  var ToolbarTestView = Marionette.LayoutView.extend({
      template: App.Templates.demoResponsive.app.components.toolbar.toolbarTestTemplate,
      ui:{
        toolbar: "#toolbar",
        toolbarMixta: "#toolbarMixta",
        toolbarRight: "#toolbarRight"
      },
      onAttach: fncOnAttach
  });

  function fncOnAttach(){
    this.ui.toolbar.rup_toolbar({
  		width: 1000,
  		buttons:[
  			{i18nCaption:"buscar", css:"buscar", click: handlerBoton },
  			{id: "mbuton1", i18nCaption:"otros", buttons:[
  				{i18nCaption:"nuevo", css:"nuevo", click: handlerMButtons},
  				{i18nCaption:"editar", css:"editar", click: handlerMButtons},
  				{i18nCaption:"cancelar", css:"cancelar", click: handlerMButtons},
  				{i18nCaption:"borrar", css:"borrar", click: handlerMButtons},
  				{i18nCaption:"filtrar", css:"filtrar", click: handlerMButtons},
  				{i18nCaption:"imprimir", css:"imprimir", click: handlerMButtons}
  			 ]},
  			 {i18nCaption:"editar", css:"editar", click: handlerMButtons},
  			 {i18nCaption:"borrar", css:"borrar", click: handlerMButtons},
  			 {id : "mbuton2", i18nCaption:"ficheros", buttons:[
     				{i18nCaption:"DLL", css:"dll", click: handlerMButtons },
     				{i18nCaption:"DOC", css:"doc", click: handlerMButtons},
     				{i18nCaption:"EXE", css:"exe", click: handlerMButtons},
     				{i18nCaption:"GIF", css:"gif", click: handlerMButtons},
     				{i18nCaption:"JPG", css:"jpg", click: handlerMButtons},
     				{i18nCaption:"JS",  css:"js",  click: handlerMButtons},
     				{i18nCaption:"PDF", css:"pdf", click: handlerMButtons},
     				{i18nCaption:"PPT", css:"ppt", click: handlerMButtons},
     				{i18nCaption:"TXT", css:"txt", click: handlerMButtons},
     				{i18nCaption:"XLS", css:"xls", click: handlerMButtons},
     				{i18nCaption:"ZIP", css:"zip", click: handlerMButtons}
     			]},
     			{i18nCaption:"filtrar", css:"filtrar", click: handlerMButtons}
  		]
  	});

  	this.ui.toolbarMixta.rup_toolbar({
  		width: 1000,
  		buttons:[
  		    {i18nCaption:"cancelar", css:"cancelar", click: handlerMButtons, right: true},
  			{i18nCaption:"buscar", css:"buscar", click: handlerBoton },
  			{id: "mbuton1", i18nCaption:"otros", buttons:[
  				{i18nCaption:"nuevo", css:"nuevo", click: handlerMButtons},
  				{i18nCaption:"editar", css:"editar", click: handlerMButtons},
  				{i18nCaption:"cancelar", css:"cancelar", click: handlerMButtons},
  				{i18nCaption:"borrar", css:"borrar", click: handlerMButtons},
  				{i18nCaption:"filtrar", css:"filtrar", click: handlerMButtons},
  				{i18nCaption:"imprimir", css:"imprimir", click: handlerMButtons}
  			 ]},
  			 {id : "mbuton2", i18nCaption:"ficheros", right: true, buttons:[
     				{i18nCaption:"DLL", css:"dll", click: handlerMButtons },
     				{i18nCaption:"DOC", css:"doc", click: handlerMButtons},
     				{i18nCaption:"EXE", css:"exe", click: handlerMButtons},
     				{i18nCaption:"GIF", css:"gif", click: handlerMButtons},
     				{i18nCaption:"JPG", css:"jpg", click: handlerMButtons},
     				{i18nCaption:"JS",  css:"js",  click: handlerMButtons},
     				{i18nCaption:"PDF", css:"pdf", click: handlerMButtons},
     				{i18nCaption:"PPT", css:"ppt", click: handlerMButtons},
     				{i18nCaption:"TXT", css:"txt", click: handlerMButtons},
     				{i18nCaption:"XLS", css:"xls", click: handlerMButtons},
     				{i18nCaption:"ZIP", css:"zip", click: handlerMButtons}
     			]},
     			{i18nCaption:"filtrar", css:"filtrar", click: handlerMButtons},
     			{i18nCaption:"imprimir", css:"imprimir", click: handlerMButtons, right: true}
  		]
  	});

  	this.ui.toolbarRight.rup_toolbar({
  		width: 1000,
  		buttons:[
  		    {i18nCaption:"cancelar", css:"cancelar", click: handlerMButtons, right: true},
  		    {i18nCaption:"borrar", css:"borrar", click: handlerMButtons, right: true},
  			{id: "mbuton1", i18nCaption:"otros", right: true, buttons:[
  				{i18nCaption:"nuevo", css:"nuevo", click: handlerMButtons},
  				{i18nCaption:"editar", css:"editar", click: handlerMButtons},
  				{i18nCaption:"cancelar", css:"cancelar", click: handlerMButtons},
  				{i18nCaption:"borrar", css:"borrar", click: handlerMButtons},
  				{i18nCaption:"filtrar", css:"filtrar", click: handlerMButtons},
  				{i18nCaption:"imprimir", css:"imprimir", click: handlerMButtons}
  			 ]},
  			 {i18nCaption:"editar", css:"editar", click: handlerMButtons, right: true},
  			 {id : "mbuton2", i18nCaption:"ficheros", right: true, buttons:[
     				{i18nCaption:"DLL", css:"dll", click: handlerMButtons },
     				{i18nCaption:"DOC", css:"doc", click: handlerMButtons},
     				{i18nCaption:"EXE", css:"exe", click: handlerMButtons},
     				{i18nCaption:"GIF", css:"gif", click: handlerMButtons},
     				{i18nCaption:"JPG", css:"jpg", click: handlerMButtons},
     				{i18nCaption:"JS",  css:"js",  click: handlerMButtons},
     				{i18nCaption:"PDF", css:"pdf", click: handlerMButtons},
     				{i18nCaption:"PPT", css:"ppt", click: handlerMButtons},
     				{i18nCaption:"TXT", css:"txt", click: handlerMButtons},
     				{i18nCaption:"XLS", css:"xls", click: handlerMButtons},
     				{i18nCaption:"ZIP", css:"zip", click: handlerMButtons}
     			]},
     			{i18nCaption:"filtrar", css:"filtrar", click: handlerMButtons, right: true},
     			{i18nCaption:"imprimir", css:"imprimir", click: handlerMButtons, right: true}
  		]
  	});

  	function handlerBoton(){
  		alert ("Se ha pulsado el boton");
  	}
  	function handlerMButtons(event){
  		alert ("MButton:" + event.data.i18nCaption);
  	}
  }

  

  return ToolbarTestView;
});
