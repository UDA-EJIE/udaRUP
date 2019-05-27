define(['marionette',
	'./toolbarTestTemplate.hbs',
	'rup.toolbar'], function(Marionette, ToolbarTestTemplate){

	var ToolbarTestView = Marionette.LayoutView.extend({
		template: ToolbarTestTemplate,
		ui:{
			toolbar: '#toolbar',
			toolbarMixta: '#toolbarMixta',
			toolbarRight: '#toolbarRight',

			toolbarRwd: '#toolbarRwd',
			toolbarNewJs: '#toolbarNewJs',

			jQueryUIToolbar: '#jQueryUIToolbar',
			jQueryUIToolbarMixta: '#jQueryUIToolbarMixta',
			jQueryUIToolbarRight: '#jQueryUIToolbarRight'

		},
		onAttach: fncOnAttach
	});

	function fncOnAttach(){



		this.ui.toolbar.rup_toolbar({

			buttons:[
				{i18nCaption:'buscar', css:'mdi mdi-magnify', click: handlerBoton },
				{id: 'mbuton1', i18nCaption:'otros', buttons:[
					{i18nCaption:'nuevo', css:'mdi mdi-file', click: handlerMButtons},
					{i18nCaption:'editar', css:'mdi mdi-square-edit-outline', click: handlerMButtons},
					{i18nCaption:'cancelar', css:'mdi mdi-close-circle-outline', click: handlerMButtons},
					{i18nCaption:'borrar', css:'mdi mdi-delete', click: handlerMButtons},
					{i18nCaption:'filtrar', css:'mdi mdi-filter', click: handlerMButtons},
					{i18nCaption:'imprimir', css:'mdi mdi-printer', click: handlerMButtons}
				]},
				{i18nCaption:'editar', css:'mdi mdi-square-edit-outline', click: handlerMButtons},
				{i18nCaption:'borrar', css:'mdi mdi-delete', click: handlerMButtons},
				{id : 'mbuton2', i18nCaption:'ficheros', buttons:[
					{i18nCaption:'DLL', css:'mdi mdi-file', click: handlerMButtons },
					{i18nCaption:'DOC', css:'mdi mdi-file-word', click: handlerMButtons},
					{i18nCaption:'EXE', css:'mdi mdi-file', click: handlerMButtons},
					{i18nCaption:'GIF', css:'mdi mdi-file-image', click: handlerMButtons},
					{i18nCaption:'JPG', css:'mdi mdi-file-image', click: handlerMButtons},
					{i18nCaption:'JS',  css:'mdi mdi-file-xml',  click: handlerMButtons},
					{i18nCaption:'PDF', css:'mdi mdi-file-pdf', click: handlerMButtons},
					{i18nCaption:'PPT', css:'mdi mdi-file-powerpoint', click: handlerMButtons},
					{i18nCaption:'TXT', css:'mdi mdi-file-document', click: handlerMButtons},
					{i18nCaption:'XLS', css:'mdi mdi-file-excel', click: handlerMButtons},
					{i18nCaption:'ZIP', css:'mdi mdi-zip-box', click: handlerMButtons}
				]},
				{i18nCaption:'filtrar', css:'mdi mdi-filter', click: handlerMButtons}
			]
		});

		this.ui.toolbarRight.rup_toolbar({

			buttons:[
				{i18nCaption:'cancelar', css:'mdi mdi-close-circle-outline', click: handlerMButtons, right: true},
				{i18nCaption:'borrar', css:'mdi mdi-delete', click: handlerMButtons, right: true},
				{id: 'mbuton1', i18nCaption:'otros', right: true, buttons:[
					{i18nCaption:'nuevo', css:'mdi mdi-file', click: handlerMButtons},
					{i18nCaption:'editar', css:'mdi mdi-square-edit-outline', click: handlerMButtons},
					{i18nCaption:'cancelar', css:'mdi mdi-close-circle-outline', click: handlerMButtons},
					{i18nCaption:'borrar', css:'mdi mdi-delete', click: handlerMButtons},
					{i18nCaption:'filtrar', css:'mdi mdi-filter', click: handlerMButtons},
					{i18nCaption:'imprimir', css:'mdi mdi-printer', click: handlerMButtons}
				]},
				{i18nCaption:'editar', css:'mdi mdi-square-edit-outline', click: handlerMButtons, right: true},
				{id : 'mbuton2', i18nCaption:'ficheros', right: true, buttons:[
					{i18nCaption:'DLL', css:'mdi mdi-file', click: handlerMButtons },
					{i18nCaption:'DOC', css:'mdi mdi-file-word', click: handlerMButtons},
					{i18nCaption:'EXE', css:'mdi mdi-file', click: handlerMButtons},
					{i18nCaption:'GIF', css:'mdi mdi-file-image', click: handlerMButtons},
					{i18nCaption:'JPG', css:'mdi mdi-file-image', click: handlerMButtons},
					{i18nCaption:'JS',  css:'mdi mdi-file-xml',  click: handlerMButtons},
					{i18nCaption:'PDF', css:'mdi mdi-file-pdf', click: handlerMButtons},
					{i18nCaption:'PPT', css:'mdi mdi-file-powerpoint', click: handlerMButtons},
					{i18nCaption:'TXT', css:'mdi mdi-file-document', click: handlerMButtons},
					{i18nCaption:'XLS', css:'mdi mdi-file-excel', click: handlerMButtons},
					{i18nCaption:'ZIP', css:'mdi mdi-zip-box', click: handlerMButtons}
				]},
				{i18nCaption:'filtrar', css:'mdi mdi-filter', click: handlerMButtons, right: true},
				{i18nCaption:'imprimir', css:'mdi mdi-printer', click: handlerMButtons, right: true}
			]
		});

		this.ui.toolbarRwd.rup_toolbar({
			buttons:[
				{id: 'filter', text:'Filtrar', css:'mdi mdi-filter', click: handlerMButtons},
				{id: 'print', text:'Imprimir', css:'mdi mdi-printer', click: handlerMButtons},
				{id: 'others', id: 'mbuton1', text:'Otros', groupClasses:'rup-collapsed-md', buttons:[
					{id: 'new', text:'Nuevo', css:'mdi mdi-file', click: handlerMButtons},
					{id: 'edit', text:'Editar', css:'mdi mdi-square-edit-outline', click: handlerMButtons},
					{id: 'cancel', text:'Cancelar', css:'mdi mdi-close-circle-outline', click: handlerMButtons},
					{id: 'delete', text:'Borrar', css:'mdi mdi-delete', click: handlerMButtons}
				]}
			]
		});

		this.ui.toolbarMixta.rup_toolbar({

			buttons:[
				{i18nCaption:'cancelar', css:'mdi mdi-close-circle-outline', click: handlerMButtons, right: true},
				{i18nCaption:'buscar', css:'mdi mdi-magnify', click: handlerBoton },
				{id: 'mbuton1', i18nCaption:'otros', buttons:[
					{i18nCaption:'nuevo', css:'mdi mdi-file', click: handlerMButtons},
					{i18nCaption:'editar', css:'mdi mdi-square-edit-outline', click: handlerMButtons},
					{i18nCaption:'cancelar', css:'mdi mdi-close-circle-outline', click: handlerMButtons},
					{i18nCaption:'borrar', css:'mdi mdi-delete', click: handlerMButtons},
					{i18nCaption:'filtrar', css:'mdi mdi-filter', click: handlerMButtons},
					{i18nCaption:'imprimir', css:'mdi mdi-printer', click: handlerMButtons}
				]},
				{id : 'mbuton2', i18nCaption:'ficheros', right: true, buttons:[
					{i18nCaption:'DLL', css:'mdi mdi-file', click: handlerMButtons },
					{i18nCaption:'DOC', css:'mdi mdi-file-word', click: handlerMButtons},
					{i18nCaption:'EXE', css:'mdi mdi-file', click: handlerMButtons},
					{i18nCaption:'GIF', css:'mdi mdi-file-image', click: handlerMButtons},
					{i18nCaption:'JPG', css:'mdi mdi-file-image', click: handlerMButtons},
					{i18nCaption:'JS',  css:'mdi mdi-file-xml',  click: handlerMButtons},
					{i18nCaption:'PDF', css:'mdi mdi-file-pdf', click: handlerMButtons},
					{i18nCaption:'PPT', css:'mdi mdi-file-powerpoint', click: handlerMButtons},
					{i18nCaption:'TXT', css:'mdi mdi-file-document', click: handlerMButtons},
					{i18nCaption:'XLS', css:'mdi mdi-file-excel', click: handlerMButtons},
					{i18nCaption:'ZIP', css:'mdi mdi-zip-box', click: handlerMButtons}
				]},
				{i18nCaption:'filtrar', css:'mdi mdi-filter', click: handlerMButtons},
				{i18nCaption:'imprimir', css:'mdi mdi-printer', click: handlerMButtons, right: true}
			]
		});

		this.ui.jQueryUIToolbar.rup_toolbar({

			adapter: 'toolbar_jqueryui',
			buttons:[
				{i18nCaption:'buscar', css:'buscar', click: handlerBoton },
				{id: 'mbuton1', i18nCaption:'otros', buttons:[
					{i18nCaption:'nuevo', css:'nuevo', click: handlerMButtons},
					{i18nCaption:'editar', css:'editar', click: handlerMButtons},
					{i18nCaption:'cancelar', css:'cancelar', click: handlerMButtons},
					{i18nCaption:'borrar', css:'borrar', click: handlerMButtons},
					{i18nCaption:'filtrar', css:'filtrar', click: handlerMButtons},
					{i18nCaption:'imprimir', css:'imprimir', click: handlerMButtons}
				]},
				{i18nCaption:'editar', css:'editar', click: handlerMButtons},
				{i18nCaption:'borrar', css:'borrar', click: handlerMButtons},
				{id : 'mbuton2', i18nCaption:'ficheros', buttons:[
					{i18nCaption:'DLL', css:'dll', click: handlerMButtons },
					{i18nCaption:'DOC', css:'doc', click: handlerMButtons},
					{i18nCaption:'EXE', css:'exe', click: handlerMButtons},
					{i18nCaption:'GIF', css:'gif', click: handlerMButtons},
					{i18nCaption:'JPG', css:'jpg', click: handlerMButtons},
					{i18nCaption:'JS',  css:'js',  click: handlerMButtons},
					{i18nCaption:'PDF', css:'pdf', click: handlerMButtons},
					{i18nCaption:'PPT', css:'ppt', click: handlerMButtons},
					{i18nCaption:'TXT', css:'txt', click: handlerMButtons},
					{i18nCaption:'XLS', css:'xls', click: handlerMButtons},
					{i18nCaption:'ZIP', css:'zip', click: handlerMButtons}
				]},
				{i18nCaption:'filtrar', css:'filtrar', click: handlerMButtons}
			]
		});

		this.ui.jQueryUIToolbarMixta.rup_toolbar({
			adapter: 'toolbar_jqueryui',
			buttons:[
				{i18nCaption:'cancelar', css:'cancelar', click: handlerMButtons, right: true},
				{i18nCaption:'buscar', css:'buscar', click: handlerBoton },
				{id: 'mbuton1', i18nCaption:'otros', buttons:[
					{i18nCaption:'nuevo', css:'nuevo', click: handlerMButtons},
					{i18nCaption:'editar', css:'editar', click: handlerMButtons},
					{i18nCaption:'cancelar', css:'cancelar', click: handlerMButtons},
					{i18nCaption:'borrar', css:'borrar', click: handlerMButtons},
					{i18nCaption:'filtrar', css:'filtrar', click: handlerMButtons},
					{i18nCaption:'imprimir', css:'imprimir', click: handlerMButtons}
				]},
				{id : 'mbuton2', i18nCaption:'ficheros', right: true, buttons:[
					{i18nCaption:'DLL', css:'dll', click: handlerMButtons },
					{i18nCaption:'DOC', css:'doc', click: handlerMButtons},
					{i18nCaption:'EXE', css:'exe', click: handlerMButtons},
					{i18nCaption:'GIF', css:'gif', click: handlerMButtons},
					{i18nCaption:'JPG', css:'jpg', click: handlerMButtons},
					{i18nCaption:'JS',  css:'js',  click: handlerMButtons},
					{i18nCaption:'PDF', css:'pdf', click: handlerMButtons},
					{i18nCaption:'PPT', css:'ppt', click: handlerMButtons},
					{i18nCaption:'TXT', css:'txt', click: handlerMButtons},
					{i18nCaption:'XLS', css:'xls', click: handlerMButtons},
					{i18nCaption:'ZIP', css:'zip', click: handlerMButtons}
				]},
				{i18nCaption:'filtrar', css:'filtrar', click: handlerMButtons},
				{i18nCaption:'imprimir', css:'imprimir', click: handlerMButtons, right: true}
			]
		});

		this.ui.jQueryUIToolbarRight.rup_toolbar({
			adapter: 'toolbar_jqueryui',
			buttons:[
				{i18nCaption:'cancelar', css:'cancelar', click: handlerMButtons, right: true},
				{i18nCaption:'borrar', css:'borrar', click: handlerMButtons, right: true},
				{id: 'mbuton1', i18nCaption:'otros', right: true, buttons:[
					{i18nCaption:'nuevo', css:'nuevo', click: handlerMButtons},
					{i18nCaption:'editar', css:'editar', click: handlerMButtons},
					{i18nCaption:'cancelar', css:'cancelar', click: handlerMButtons},
					{i18nCaption:'borrar', css:'borrar', click: handlerMButtons},
					{i18nCaption:'filtrar', css:'filtrar', click: handlerMButtons},
					{i18nCaption:'imprimir', css:'imprimir', click: handlerMButtons}
				]},
				{i18nCaption:'editar', css:'editar', click: handlerMButtons, right: true},
				{id : 'mbuton2', i18nCaption:'ficheros', right: true, buttons:[
					{i18nCaption:'DLL', css:'dll', click: handlerMButtons },
					{i18nCaption:'DOC', css:'doc', click: handlerMButtons},
					{i18nCaption:'EXE', css:'exe', click: handlerMButtons},
					{i18nCaption:'GIF', css:'gif', click: handlerMButtons},
					{i18nCaption:'JPG', css:'jpg', click: handlerMButtons},
					{i18nCaption:'JS',  css:'js',  click: handlerMButtons},
					{i18nCaption:'PDF', css:'pdf', click: handlerMButtons},
					{i18nCaption:'PPT', css:'ppt', click: handlerMButtons},
					{i18nCaption:'TXT', css:'txt', click: handlerMButtons},
					{i18nCaption:'XLS', css:'xls', click: handlerMButtons},
					{i18nCaption:'ZIP', css:'zip', click: handlerMButtons}
				]},
				{i18nCaption:'filtrar', css:'filtrar', click: handlerMButtons, right: true},
				{i18nCaption:'imprimir', css:'imprimir', click: handlerMButtons, right: true}
			]
		});


		function handlerBoton(){
			alert ('Se ha pulsado el boton');
		}
		function handlerMButtons(event){
			//alert ('MButton:' + event.data.i18nCaption);
			alert("MButton");
		}
	}



	return ToolbarTestView;
});
