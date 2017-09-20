define(['marionette',
	'./tableFilterTemplate.hbs',
	'rup.table'], function(Marionette, TableFilterTemplate){

	var TableFilterView = Marionette.LayoutView.extend({
		template: TableFilterTemplate,
		tableColNames: {},
		tableColModels: {},
		options_table_report: {},
		options_ejie_combo: {},
		options_role_combo: {},
		ui:{
			table: '#table'
		},
		initialize: fncInitilize,
		onDomRefresh: fncOnDomRefresh

	});

	function fncInitilize(){

		this.tableColNames = [
			$.rup.i18n.app.table.id,
			$.rup.i18n.app.table.nombre,
			$.rup.i18n.app.table.apellido1,
			$.rup.i18n.app.table.apellido2,
			$.rup.i18n.app.table.ejie,
			$.rup.i18n.app.table.fechaAlta,
			$.rup.i18n.app.table.fechaBaja,
			$.rup.i18n.app.table.rol
		];

		this.tableColModels = [
			{ name: 'id', index: 'id', editable:true, width: 80
				, formoptions:{rowpos:1, colpos:1},
				rwdClasses:'hidden-xs hidden-sm hidden-md'
			},
			{ name: 'nombre', index: 'nombre', editable:true
				, formoptions:{rowpos:2, colpos:1}
			},
			{ name: 'apellido1', index: 'apellido1', editable:true
				, formoptions:{rowpos:3, colpos:1}
				, classes:'ui-ellipsis'
			},
			{ name: 'apellido2', index: 'apellido2', editable:true
				, formoptions:{rowpos:4, colpos:1}
			},
			{ name: 'ejie', index: 'ejie', editable:true, width: 60,
				edittype: 'checkbox',
				formatter: 'checkbox',
				align: 'center',
				editoptions: {
					value:'1:0'
				},
				searchoptions:{
					rupType: 'combo',
					source : [
						{label: '---', value:''},
						{label: 'Si', value:'1'},
						{label: 'No', value:'0'}
					]
				}
				, formoptions:{rowpos:5, colpos:1}
			},
			{ name: 'fechaAlta',  index: 'fecha_alta', editable:true, width: 120,
				rupType: 'date',
				editoptions:{
					labelMaskId : 'fecha-mask',
					showButtonPanel : true,
					showOtherMonths : true,
					noWeekend : true
				}
				, formoptions:{rowpos:2, colpos:2}
			},
			{ name: 'fechaBaja', index: 'fecha_baja', editable:true, width: 120,
				rupType: 'date',
				rwdClasses:'hidden-xs hidden-sm hidden-md',
				editoptions:{
					labelMaskId : 'fecha-mask',
					showButtonPanel : true,
					showOtherMonths : true,
					noWeekend : true
				}
				, formoptions:{rowpos:3, colpos:2}
			},
			{ name: 'rol', index: 'rol', editable:true, width: 140,
				rupType: 'combo',
				rwdClasses:'hidden-xs hidden-sm hidden-md',
				editoptions: {
					source : [
						{label: '---', value:''},
						{label: $.rup.i18n.app['GRID_simple##rol']['administrador'], value:'administrador'},
						{label: $.rup.i18n.app['GRID_simple##rol']['desarrollador'], value:'desarrollador'},
						{label: $.rup.i18n.app['GRID_simple##rol']['espectador'], value:'espectador'},
						{label: $.rup.i18n.app['GRID_simple##rol']['informador'], value:'informador'},
						{label: $.rup.i18n.app['GRID_simple##rol']['manager'], value:'manager'}
					]
				}
				, formoptions:{rowpos:3, colpos:2}
			}
		];

		this.options_table_report = {
			buttons:[
				{id:'reports', i18nCaption:'Informes', right:true,
					buttons:[
						{ i18nCaption:'CSV', css:'csv',
							url: '../jqGridUsuario/csvReport'
						},
						{ i18nCaption:'XLS', css:'xls',
							url: '../jqGridUsuario/xlsReport'
						},
						{ i18nCaption:'XLXS', css:'xls',
							url: '../jqGridUsuario/xlsxReport'
						},
						{ i18nCaption:'ODS', css:'ods',
							url: '../jqGridUsuario/odsReport'
						},
						{ i18nCaption:'PDF', css:'pdf',
							url: '../jqGridUsuario/pdfReport'
						},
						{ i18nCaption:'PDF_inLine', css:'pdf',
							url: '../jqGridUsuario/pdfReport'
							, isInline:true
						}
					]}
			]
		};

		this.options_ejie_combo = {
			source : [
				{label: '---', value:''},
				{i18nCaption: '0', value:'0'},
				{i18nCaption: '1', value:'1'}
			],
			i18nId: 'GRID_simple##ejie',
			width: 120
		};

		this.options_role_combo = {
			source : [
				{label: '---', value:''},
				{label: $.rup.i18n.app['GRID_simple##rol']['administrador'], value:'administrador'},
				{label: $.rup.i18n.app['GRID_simple##rol']['desarrollador'], value:'desarrollador'},
				{label: $.rup.i18n.app['GRID_simple##rol']['espectador'], value:'espectador'},
				{label: $.rup.i18n.app['GRID_simple##rol']['informador'], value:'informador'},
				{label: $.rup.i18n.app['GRID_simple##rol']['manager'], value:'manager'}
			]
		};


	}

	function fncOnDomRefresh(){
		var $view = this;

		var disable=1;

		$view.ui.table.rup_table({
			url: 'api/jqGridUsuario',
			colNames: this.tableColNames,
			colModel: this.tableColModels,
			primaryKey:['id'],

			usePlugins:[
				'formEdit',
				'feedback',
				'toolbar',
				'contextMenu',
				'filter',
				'search',
				'report',
				'responsive'
			],
			shrinkToFit:true,
			forceFit:true,
			rowNum:10,
			rowList:[10,20,30],
			sortname: 'id',
			core:{
				
				operations:{
					'operacion1': {
						name: 'Operación 1',
						icon: 'fa fa-file-o',
						enabled: function(){
							return (disable++ %2)===0;
						},
						callback: function(){
							alert('Operación 1');
						}
					},
					'operacion2': {
						name: 'Operación 2',
						icon: 'fa fa-file-o',
						enabled: function(){
							return true;
						},
						callback: function(){
							alert('Operación 1');
						}
					}
				}
			},
			toolbar:{
				showOperations:{
					operacion2:false
				}
			},
			contextMenu:{
				colNames:['nombre','apellido1','apellido2','ejie','fechaAlta'],
				items: {
					'sep1': '---------',
					'opContextual1': {name: 'Op. contextual 1', icon: 'edit', disabled: false, colNames:['fechaAlta','fechaBaja','rol']},
					'opContextual2': {name: 'Op. contextual 2', icon: 'cut', disabled: true},
					'opContextual3' :{name: 'Op. contextual 3', icon: 'cut', colNames:['nombre','apellido1'], items:{
						'subOpContextual1': {name: 'Sub Op. contextual 1', icon: 'edit', disabled: false},
						'opContextual2': {name: 'Sub Op. contextual 2', icon: 'cut', disabled: true}
					}
					}
				},
				showOperations:{
					operacion1:false
					,operacion2: ['nombre','apellido1']
				}
			},

			formEdit:{

				detailForm: '#table_detail_div',
				dialogOptions:{
					onClose: function(){
						alert('cerrar');
						return true;
					}
				},
				validate:{
					rules:{
						'nombre':{required:true},
						'apellido1':{required:true},
						'fechaAlta':{date:true},
						'fechaBaja':{date:true}

					}

				}
			},
			filter:{
				validate:{
					rules:{
						'fechaAlta':{date:true},
						'fechaBaja':{date:true}
					}
				},
			},
			search:{
				validate:{
					rules:{
						'fechaAlta':{date:true},
						'fechaBaja':{date:true}
					}
				}
			},
			report: $view.options_table_report

			// loadOnStartUp:false
		});
	}

	return TableFilterView;

});
