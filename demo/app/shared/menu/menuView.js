define(['marionette',
        'templates',
        'rup/menu'], function (Marionette, App) {

    var MenuView = Marionette.LayoutView.extend({
        template: App.Templates.demo.app.shared.menu.menuTemplate,
        ui: {
            menuElement: "#x21aResponsiveWar_menu",
            menuMixedElement: "#x21aResponsiveWar_menu"
        },
        onDomRefresh: fncOnDomRefresh
    });

    function fncOnDomRefresh() {
        var $view = this;
        var vertical = false,
            mixto = false;
        if (jQuery.rup.LAYOUT === "vertical") {
            vertical = true;
        } else if (jQuery.rup.LAYOUT === "mixto") {
            mixto = true;
        }

        $view.ui.menuElement.rup_menu({
            display: (vertical ? 'vertical' : 'horizontal'),
            verticalWidth: "16.5em"
        });

        if (mixto) {
            $view.ui.menuMixedElement.rup_menu({
                display: 'vertical',
                menu: [
                    {
                        "i18nCaption": "mantenimientos",
                        "url": "../x21aMantenimientosWar/"
                    },
                    {
                        "i18nCaption": "inicio",
                        "url": "",
                        "newWindow": true,
                        "disabled": true
                    },
                    {
                        "i18nCaption": "patrones",
                        "submenu": [
                            {
                                "i18nCaption": "all",
                                "pathUrl": "/x21aResponsiveWar/patrones/all",
                                "newWindow": true
                            },
                            {
                                "divider": true
                            },
                            {
                                "divider": true,
                                "i18nCaption": "titulo-notifi"
                            },
                            {
                                "i18nCaption": "feedback",
                                "url": "patrones/feedback"
                            },
                            {
                                "i18nCaption": "tooltip",
                                "url": "patrones/tooltip"
                            },
                            {
                                "i18nCaption": "message",
                                "url": "patrones/message"
                            },
                            {
                                "i18nCaption": "dialog",
                                "url": "patrones/dialog"
                            },
                            {
                                "divider": true
                            },
                            {
                                "divider": true,
                                "i18nCaption": "titulo-nave"
                            },
                            {
                                "i18nCaption": "menu",
                                "submenu": [
                                    {
                                        "i18nCaption": "menuHorizontal",
                                        "url": "patrones/menu"
                                    },
                                    {
                                        "i18nCaption": "menuVertical",
                                        "url": "patrones/menuVertical"
                                    },
                                    {
                                        "i18nCaption": "menuMixto",
                                        "url": "patrones/menuMixto"
                                    }
      					    ]
                            },
                            {
                                "i18nCaption": "contextMenu",
                                "url": "patrones/contextMenu"
                            },
                            {
                                "i18nCaption": "toolbar",
                                "url": "patrones/toolbar"
                            },
                            {
                                "divider": true
                            },
                            {
                                "divider": true,
                                "i18nCaption": "titulo-estru"
                            },
                            {
                                "i18nCaption": "accordion",
                                "pathUrl": "/x21aResponsiveWar/patrones/accordion"
                            },
                            {
                                "i18nCaption": "tabs",
                                "submenu": [
                                    {
                                        "i18nCaption": "tabsStatic",
                                        "url": "patrones/tabsStatic"
                                    },
                                    {
                                        "i18nCaption": "tabsAjax",
                                        "url": "patrones/tabsAjax"
                                    },
                                    {
                                        "i18nCaption": "tabsMixto",
                                        "url": "patrones/tabsMixto"
                                    },
                                    {
                                        "i18nCaption": "maintTab",
                                        "url": "patrones/maintTab"
                                    }
      					    ]
                            },
                            {
                                "i18nCaption": "grid",
                                "submenu": [
                                    {
                                        "i18nCaption": "grid_grupo",
                                        "url": "patrones/gridGroup"
                                    },
                                    {
                                        "i18nCaption": "grid_base",
                                        "url": "patrones/grid"
                                    },
                                    {
                                        "i18nCaption": "grid_arbol",
                                        "url": "patrones/gridTree"
                                    }
      							]
                            },
                            {
                                "i18nCaption": "wizard",
                                "submenu": [
                                    {
                                        "i18nCaption": "wizardA",
                                        "url": "patrones/wizard"
                                    },
                                    {
                                        "i18nCaption": "wizardB",
                                        "url": "patrones/wizard_includeFile"
                                    },
                                    {
                                        "i18nCaption": "wizardC",
                                        "url": "patrones/wizard_jspInclude"
                                    },
                                    {
                                        "i18nCaption": "wizardD",
                                        "url": "patrones/wizard_jstlImport"
                                    },
                                    {
                                        "i18nCaption": "wizardE",
                                        "url": "patrones/wizard_dinamico"
                                    }
      							]
                            },
                            {
                                "i18nCaption": "tree",
                                "submenu": [
                                    {
                                        "i18nCaption": "trees",
                                        "url": "patrones/trees"
                                    },
      //							 	{"i18nCaption":"trees_formats", "url": "patrones/trees" },
                                    {
                                        "i18nCaption": "treeDAD",
                                        "url": "patrones/treeDAD"
                                    },
      //							 	{"i18nCaption":"tree_panel", "url": "patrones/trees" },
      							]
                            },
                            {
                                "divider": true
                            },
                            {
                                "divider": true,
                                "i18nCaption": "titulo-inser"
                            },
                            {
                                "i18nCaption": "autocomplete",
                                "url": "patrones/autocomplete"
                            },
                            {
                                "i18nCaption": "combo",
                                "submenu": [
                                    {
                                        "i18nCaption": "comboSimple",
                                        "url": "patrones/comboSimple",
                                        "newWindow": true
                                    },
                                    {
                                        "i18nCaption": "comboEnlazadoSimple",
                                        "url": "patrones/comboEnlazadoSimple"
                                    },
                                    {
                                        "i18nCaption": "comboEnlazadoMulti",
                                        "url": "patrones/comboEnlazadoMultiple"
                                    },
                                    {
                                        "i18nCaption": "multicombo",
                                        "url": "patrones/multicombo"
                                    }
      					  	]
                            },
                            {
                                "i18nCaption": "date",
                                "url": "patrones/date"
                            },
                            {
                                "i18nCaption": "time",
                                "url": "patrones/time"
                            },
                            {
                                "i18nCaption": "upload",
                                "url": "patrones/upload"
                            },
                            {
                                "i18nCaption": "validate",
                                "url": "patrones/validate"
                            }]
                                  },
                    {
                        "divider": true
                            },
                    {
                        "divider": true,
                        "i18nCaption": "titulo-inser"
                            },
                    {
                        "i18nCaption": "chart",
                        "url": "patrones/chart"
                            },


                    {
                        "i18nCaption": "experimental",
                        "submenu": [
                            {
                                "i18nCaption": "maestro_detalle",
                                "url": "experimental/maestro_detalle"
                            },
                            {
                                "i18nCaption": "mant_multi_entidad",
                                "url": "experimental/mant_multi_entidad"
                            },
                            {
                                "i18nCaption": "mant_clave_compuesta",
                                "submenu": [
                                    {
                                        "i18nCaption": "mant_clave_compuesta_multi",
                                        "url": "experimental/mant_clave_compuesta_multi"
                                    },
                                    {
                                        "i18nCaption": "mant_clave_compuesta_edlinea",
                                        "url": "experimental/mant_clave_compuesta_edlinea"
                                    }
      					    ]
                            },
      					]
                    }, {
                        "i18nCaption": "integracion",
                        "submenu": [
                            {
                                "i18nCaption": "z-index",
                                "url": "integracion/z-index"
                            },
                            {
                                "i18nCaption": "nora",
                                "url": "integracion/nora"
                            },
                            {
                                "i18nCaption": "tiny",
                                "url": "integracion/tiny"
                            }
      					]
                    }, {
                        "i18nCaption": "uda",
                        "pathUrl": "http://code.google.com/p/uda/",
                        "newWindow": true
                    }],
                verticalWidth: "16.5em"

            });


        }
    }
    return MenuView;
});
