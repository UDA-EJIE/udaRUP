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
				{i18nCaption:'buscar', css:'fa fa-search', click: handlerBoton },
				{id: 'mbuton1', i18nCaption:'otros', buttons:[
					{i18nCaption:'nuevo', css:'fa fa-file-o', click: handlerMButtons},
					{i18nCaption:'editar', css:'fa fa-pencil-square-o', click: handlerMButtons},
					{i18nCaption:'cancelar', css:'fa fa-times-circle', click: handlerMButtons},
					{i18nCaption:'borrar', css:'fa fa-trash-o', click: handlerMButtons},
					{i18nCaption:'filtrar', css:'fa fa-filter', click: handlerMButtons},
					{i18nCaption:'imprimir', css:'fa fa-print', click: handlerMButtons}
				]},
				{i18nCaption:'editar', css:'fa fa-pencil-square-o', click: handlerMButtons},
				{i18nCaption:'borrar', css:'fa fa-trash-o', click: handlerMButtons},
				{id : 'mbuton2', i18nCaption:'ficheros', buttons:[
					{i18nCaption:'DLL', css:'fa fa-file-o', click: handlerMButtons },
					{i18nCaption:'DOC', css:'fa fa-file-word-o', click: handlerMButtons},
					{i18nCaption:'EXE', css:'fa fa-file-o', click: handlerMButtons},
					{i18nCaption:'GIF', css:'fa fa-file-image-o', click: handlerMButtons},
					{i18nCaption:'JPG', css:'fa fa-file-image-o', click: handlerMButtons},
					{i18nCaption:'JS',  css:'fa fa-file-code-o',  click: handlerMButtons},
					{i18nCaption:'PDF', css:'fa fa-file-pdf-o', click: handlerMButtons},
					{i18nCaption:'PPT', css:'fa fa-file-powerpoint-o', click: handlerMButtons},
					{i18nCaption:'TXT', css:'fa fa-file-text-o', click: handlerMButtons},
					{i18nCaption:'XLS', css:'fa fa-file-excel-o', click: handlerMButtons},
					{i18nCaption:'ZIP', css:'fa fa-file-archive-o', click: handlerMButtons}
				]},
				{i18nCaption:'filtrar', css:'fa fa-filter', click: handlerMButtons}
			]
		});

		this.ui.toolbarRight.rup_toolbar({

			buttons:[
				{i18nCaption:'cancelar', css:'fa fa-times-circle', click: handlerMButtons, right: true},
				{i18nCaption:'borrar', css:'fa fa-trash-o', click: handlerMButtons, right: true},
				{id: 'mbuton1', i18nCaption:'otros', right: true, buttons:[
					{i18nCaption:'nuevo', css:'fa fa-file-o', click: handlerMButtons},
					{i18nCaption:'editar', css:'fa fa-pencil-square-o', click: handlerMButtons},
					{i18nCaption:'cancelar', css:'fa fa-times-circle', click: handlerMButtons},
					{i18nCaption:'borrar', css:'fa fa-trash-o', click: handlerMButtons},
					{i18nCaption:'filtrar', css:'fa fa-filter', click: handlerMButtons},
					{i18nCaption:'imprimir', css:'fa fa-print', click: handlerMButtons}
				]},
				{i18nCaption:'editar', css:'fa fa-pencil-square-o', click: handlerMButtons, right: true},
				{id : 'mbuton2', i18nCaption:'ficheros', right: true, buttons:[
					{i18nCaption:'DLL', css:'fa fa-file-o', click: handlerMButtons },
					{i18nCaption:'DOC', css:'fa fa-file-word-o', click: handlerMButtons},
					{i18nCaption:'EXE', css:'fa fa-file-o', click: handlerMButtons},
					{i18nCaption:'GIF', css:'fa fa-file-image-o', click: handlerMButtons},
					{i18nCaption:'JPG', css:'fa fa-file-image-o', click: handlerMButtons},
					{i18nCaption:'JS',  css:'fa fa-file-code-o',  click: handlerMButtons},
					{i18nCaption:'PDF', css:'fa fa-file-pdf-o', click: handlerMButtons},
					{i18nCaption:'PPT', css:'fa fa-file-powerpoint-o', click: handlerMButtons},
					{i18nCaption:'TXT', css:'fa fa-file-text-o', click: handlerMButtons},
					{i18nCaption:'XLS', css:'fa fa-file-excel-o', click: handlerMButtons},
					{i18nCaption:'ZIP', css:'fa fa-file-archive-o', click: handlerMButtons}
				]},
				{i18nCaption:'filtrar', css:'fa fa-filter', click: handlerMButtons, right: true},
				{i18nCaption:'imprimir', css:'fa fa-print', click: handlerMButtons, right: true}
			]
		});

		this.ui.toolbarRwd.rup_toolbar({
			buttons:[
				{id: 'filter', text:'Filtrar', css:'fa fa-filter', click: handlerMButtons},
				{id: 'print', text:'Imprimir', css:'fa fa-print', click: handlerMButtons},
				{id: 'others', id: 'mbuton1', text:'Otros', groupClasses:'rup-collapsed-md', buttons:[
					{id: 'new', text:'Nuevo', css:'fa fa-file-o', click: handlerMButtons},
					{id: 'edit', text:'Editar', css:'fa fa-pencil-square-o', click: handlerMButtons},
					{id: 'cancel', text:'Cancelar', css:'fa fa-times-circle', click: handlerMButtons},
					{id: 'delete', text:'Borrar', css:'fa fa-trash-o', click: handlerMButtons}
				]}
			]
		});

		this.ui.toolbarMixta.rup_toolbar({

			buttons:[
				{i18nCaption:'cancelar', css:'fa fa-times-circle', click: handlerMButtons, right: true},
				{i18nCaption:'buscar', css:'fa fa-search', click: handlerBoton },
				{id: 'mbuton1', i18nCaption:'otros', buttons:[
					{i18nCaption:'nuevo', css:'fa fa-file-o', click: handlerMButtons},
					{i18nCaption:'editar', css:'fa fa-pencil-square-o', click: handlerMButtons},
					{i18nCaption:'cancelar', css:'fa fa-times-circle', click: handlerMButtons},
					{i18nCaption:'borrar', css:'fa fa-trash-o', click: handlerMButtons},
					{i18nCaption:'filtrar', css:'fa fa-filter', click: handlerMButtons},
					{i18nCaption:'imprimir', css:'fa fa-print', click: handlerMButtons}
				]},
				{id : 'mbuton2', i18nCaption:'ficheros', right: true, buttons:[
					{i18nCaption:'DLL', css:'fa fa-file-o', click: handlerMButtons },
					{i18nCaption:'DOC', css:'fa fa-file-word-o', click: handlerMButtons},
					{i18nCaption:'EXE', css:'fa fa-file-o', click: handlerMButtons},
					{i18nCaption:'GIF', css:'fa fa-file-image-o', click: handlerMButtons},
					{i18nCaption:'JPG', css:'fa fa-file-image-o', click: handlerMButtons},
					{i18nCaption:'JS',  css:'fa fa-file-code-o',  click: handlerMButtons},
					{i18nCaption:'PDF', css:'fa fa-file-pdf-o', click: handlerMButtons},
					{i18nCaption:'PPT', css:'fa fa-file-powerpoint-o', click: handlerMButtons},
					{i18nCaption:'TXT', css:'fa fa-file-text-o', click: handlerMButtons},
					{i18nCaption:'XLS', css:'fa fa-file-excel-o', click: handlerMButtons},
					{i18nCaption:'ZIP', css:'fa fa-file-archive-o', click: handlerMButtons}
				]},
				{i18nCaption:'filtrar', css:'fa fa-filter', click: handlerMButtons},
				{i18nCaption:'imprimir', css:'fa fa-print', click: handlerMButtons, right: true}
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
