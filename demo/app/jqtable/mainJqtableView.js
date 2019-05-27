App.Views = App.Views || {};

App.Views.Table = Backbone.View.extend({
    el: '#container',
    tableColNames:[],
    tableColModels:[],
    optionsTableReport:{},
    optionsEjieCombo:{},
    optionsRoleCombo:{},
    initialize: function(){
        
        this.tableColNames = [
            "ID",
            "Nombre",
            "Primer apellido",
            "Segundo apellido",
            "Ejie",
            "Fecha alta",
            "Fecha baja",
            "Rol"
        ];
        
        this.tableColModels = [
			{ name: "id", index: "id", editable:true, width: 80
				, formoptions:{rowpos:1, colpos:1}
			},
			{ name: "nombre", index: "nombre", editable:true
				, formoptions:{rowpos:2, colpos:1}
			},
			{ name: "apellido1", index: "apellido1", editable:true
				, formoptions:{rowpos:3, colpos:1}
				, classes:'ui-ellipsis'
			},
			{ name: "apellido2", index: "apellido2", editable:true
				, formoptions:{rowpos:4, colpos:1}
			},
			{ name: "ejie", index: "ejie", editable:true, width: 60,
				edittype: "checkbox",
				formatter: "checkbox",
				align: "center",
				editoptions: {
					value:"1:0"
				},
				searchoptions:{
					rupType: "combo",
					source : [
					   {label: "---", value:""},
					   {label: "Si", value:"1"},
					   {label: "No", value:"0"}
					]
				}
				, formoptions:{rowpos:5, colpos:1}
			},
			{ name: "fechaAlta",  index: "fecha_alta", editable:true, width: 120,
				rupType: "date",
				editoptions:{
					labelMaskId : "fecha-mask",
					showButtonPanel : true,
					showOtherMonths : true,
					noWeekend : true
				}
				, formoptions:{rowpos:2, colpos:2}
			},
			{ name: "fechaBaja", index: "fecha_baja", editable:true, width: 120,
				rupType: "date",
				editoptions:{
					labelMaskId : "fecha-mask",
					showButtonPanel : true,
					showOtherMonths : true,
					noWeekend : true
				}
				, formoptions:{rowpos:3, colpos:2}
			},
			{ name: "rol", index: "rol", editable:true, width: 140,
				rupType: "combo",
				editoptions: {
					source : [
					   {label: "---", value:""},
					   {label: "Administrador", value:"administrador"},
					   {label: "Desarrollador", value:"desarrollador"},
					   {label: "Espectador", value:"espectador"},
					   {label: "Informador", value:"informador"},
					   {label: "Manager", value:"manager"}
					]
				}
				, formoptions:{rowpos:3, colpos:2}
			}
        ];
        
        
        this.optionsTableReport = {
			buttons:[
				{id:"reports", i18nCaption:"Informes", right:true,
					buttons:[
						{ i18nCaption:"CSV", css:"csv", 
							url: "../jqGridUsuario/csvReport"
						},
						{ i18nCaption:"XLS", css:"xls", 
							url: "../jqGridUsuario/xlsReport"
						},
						{ i18nCaption:"XLXS", css:"xls",
							url: "../jqGridUsuario/xlsxReport" 
						},
						{ i18nCaption:"ODS", css:"ods", 
							url: "../jqGridUsuario/odsReport"
						},
						{ i18nCaption:"PDF", css:"pdf", 
							url: "../jqGridUsuario/pdfReport"
						},
						{ i18nCaption:"PDF_inLine", css:"pdf", 
							url: "../jqGridUsuario/pdfReport"
							, isInline:true
						}
					 ]}
			]
		};
        
        this.optionsEjieCombo = {
			source : [
			   {label: "---", value:""},
			   {i18nCaption: "0", value:"0"},
			   {i18nCaption: "1", value:"1"}
			],
			i18nId: "GRID_simple##ejie",
			width: 120
		};
        
		this.optionsRoleCombo = {
			source : [
			   {label: "---", value:""},
			   {label: "Administrador", value:"administrador"},
			   {label: "Desarrollador", value:"desarrollador"},
			   {label: "Espectador", value:"espectador"},
			   {label: "Informador", value:"informador"},
			   {label: "Manager", value:"manager"}
			]
		};
    }
    /*render: renderTableView*/
});