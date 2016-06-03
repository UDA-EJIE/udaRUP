App.Views = App.Views || {};

App.Views.TableFilter = App.Views.Table.extend({
    el: '#container',
    render: renderTableFilterView,
});



function renderTableFilterView(){
    
    var template = App.Templates["app/components/table/tableFilter.hbs"];
    this.$el.html(template({}));

   var disable=1;
	$("#table").rup_table({
		url: "jqGridUsuario",
		colNames: this.tableColNames,
		colModel: this.tableColModels,
        primaryKey:["id"],
        
        usePlugins:[
			"formEdit",
        	"feedback",
			"toolbar",
        	"contextMenu",
        	"fluid",
        	"filter",
        	"search",
        	"report",
        ],
        rowNum:10, 
        rowList:[10,20,30], 
        sortname: 'id',
        core:{
        	operations:{
                "operacion1": {
                        name: "Operación 1", 
                        icon: "rup-icon rup-icon-new", 
                        enabled: function(){
                             return (disable++ %2)===0;
                        },
                        callback: function(key, options){
                             alert("Operación 1");           
                        }
	              },
	              "operacion2": {
	                    name: "Operación 2", 
	                    icon: "rup-icon rup-icon-new", 
	                    enabled: function(){
	                         return true;
	                    },
	                    callback: function(key, options){
	                         alert("Operación 1");           
	                    }
	              }
          }
        },
        toolbar:{
        	showOperations:{
	    		operacion2:false
        	}
//        ,
//        	buttons:[
//	        	{ 
//	          		obj : { i18nCaption: "Rss", css: "rup-rss-icon-16", index: 4 }, 
//	          		json_i18n : "Rss",
//					click : function(){
//						window.open(CTX_PATH+"rssfeed","Rss Feed");
//						
//					}
//				}
//        	]
        },
		contextMenu:{
			colNames:["nombre","apellido1","apellido2","ejie","fechaAlta"],
			items: {
				"sep1": "---------",
		        "opContextual1": {name: "Op. contextual 1", icon: "edit", disabled: false, colNames:["fechaAlta","fechaBaja","rol"]},
		        "opContextual2": {name: "Op. contextual 2", icon: "cut", disabled: true},
		        "opContextual3" :{name: "Op. contextual 3", icon: "cut", colNames:["nombre","apellido1"], items:{
		        	"subOpContextual1": {name: "Sub Op. contextual 1", icon: "edit", disabled: false},
		            "opContextual2": {name: "Sub Op. contextual 2", icon: "cut", disabled: true}
		        	}
		        }
		    },
			showOperations:{
				operacion1:false
				,operacion2: ["nombre","apellido1"]
		  }
		},
        formEdit:{
        	detailForm: "#table_detail_div",
        	validate:{
    			rules:{
    				"nombre":{required:true},
    				"apellido1":{required:true},
    				"fechaAlta":{date:true},
    				"fechaBaja":{date:true}
    			}
    		}
        },
        filter:{
        	validate:{
        		rules:{
    				"fechaAlta":{date:true},
    				"fechaBaja":{date:true}
    			}
        	},
        },
        search:{
        	validate:{
        		rules:{
    				"fechaAlta":{date:true},
    				"fechaBaja":{date:true}
    			}
        	}
        },
        report: this.optionsTableReport//,
       // loadOnStartUp:false
});
}
