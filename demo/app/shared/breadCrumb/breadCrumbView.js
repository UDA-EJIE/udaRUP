var breadCrumbTemplate = App.Templates["app/shared/breadCrumb/breadCrumb.hbs"];
$(breadCrumbTemplate({})).appendTo("#breadCrumb");

//rastro de migas
jQuery("#x21aResponsiveWar_migas").rup_breadCrumb({
    logOutUrl: "/x21aResponsiveWar/logout",
    breadCrumb: {
        "patrones": {
            //Literal
            "i18nCaption": "patrones",
            //Elementos (url)
            "all": {
                "i18nCaption": "all"
            },
            "accordion": {
                "i18nCaption": "accordion"
            },
            "treeDAD": {
                "i18nCaption": "treeDAD"
            },
            //				"treePanel" : {"i18nCaption":"treePanel" },
            "trees": {
                "i18nCaption": "trees"
            },
            //				"treesFormats" : {"i18nCaption":"treesFormats" },
            "autocomplete": {
                "i18nCaption": "autocomplete"
            },
            "toolbar": {
                "i18nCaption": "toolbar"
            },
            "comboSimple": {
                "i18nCaption": "comboSimple"
            },
            "comboEnlazadoSimple": {
                "i18nCaption": "comboEnlazadoSimple"
            },
            "comboEnlazadoMultiple": {
                "i18nCaption": "comboEnlazadoMulti"
            },
            "multicombo": {
                "i18nCaption": "multicombo"
            },
            "dialog": {
                "i18nCaption": "dialog"
            },
            "date": {
                "i18nCaption": "date"
            },
            "feedback": {
                "i18nCaption": "feedback"
            },
            "form": {
                "i18nCaption": "form"
            },
            "time": {
                "i18nCaption": "time"
            },
            "message": {
                "i18nCaption": "message"
            },
            "menu": {
                "i18nCaption": "menu"
            },
            "menuVertical": {
                "i18nCaption": "menuVertical"
            },
            "menuMixto": {
                "i18nCaption": "menuMixto"
            },
            "navMenu": {
                "i18Caption": "navMenu"
            },
            "contextMenu": {
                "i18nCaption": "contextMenu"
            },
            "tabsStatic": {
                "i18nCaption": "tabsStatic"
            },
            "tabsAjax": {
                "i18nCaption": "tabsAjax"
            },
            "tabsMixto": {
                "i18nCaption": "tabsMixto"
            },
            "maintTab": {
                "i18nCaption": "maintTab"
            },
            "grid": {
                "i18nCaption": "grid"
            },
            "tooltip": {
                "i18nCaption": "tooltip"
            },
            "upload": {
                "i18nCaption": "upload"
            },
            "validate": {
                "i18nCaption": "validate"
            },
            "wizard": {
                "i18nCaption": "wizardA"
            },
            "wizard_includeFile": {
                "i18nCaption": "wizardB"
            },
            "wizard_jspInclude": {
                "i18nCaption": "wizardC"
            },
            "wizard_jstlImport": {
                "i18nCaption": "wizardD"
            },
            "wizard_dinamico": {
                "i18nCaption": "wizardE"
            },
            //Submenu
            "subLevel": [
                {
                    "i18nCaption": "all",
                    "url": "/x21aResponsiveWar/patrones/all"
                },
                {
                    "i18nCaption": "accordion",
                    "url": "/x21aResponsiveWar/patrones/accordion"
                },
                {
                    "i18nCaption": "treeDAD",
                    "url": "/x21aResponsiveWar/patrones/treeDAD"
                },
//	                {"i18nCaption":"treePanel", "url": "/x21aResponsiveWar/patrones/trees" },
                {
                    "i18nCaption": "trees",
                    "url": "/x21aResponsiveWar/patrones/trees"
                },
//	                {"i18nCaption":"treesFormats", "url": "/x21aResponsiveWar/patrones/trees" },
                {
                    "i18nCaption": "autocomplete",
                    "url": "/x21aResponsiveWar/patrones/autocomplete"
                },
                {
                    "i18nCaption": "toolbar",
                    "url": "/x21aResponsiveWar/patrones/toolbar"
                },
                {
                    "i18nCaption": "comboSimple",
                    "url": "/x21aResponsiveWar/patrones/comboSimple",
                    "newWindow": true
                },
                {
                    "i18nCaption": "comboEnlazadoSimple",
                    "url": "/x21aResponsiveWar/patrones/comboEnlazadoSimple"
                },
                {
                    "i18nCaption": "comboEnlazadoMulti",
                    "url": "/x21aResponsiveWar/patrones/comboEnlazadoMultiple"
                },
                {
                    "i18nCaption": "multicombo",
                    "url": "/x21aResponsiveWar/patrones/multicombo"
                },
                {
                    "i18nCaption": "dialog",
                    "url": "/x21aResponsiveWar/patrones/dialog"
                },
                {
                    "i18nCaption": "date",
                    "url": "/x21aResponsiveWar/patrones/date"
                },
                {
                    "i18nCaption": "feedback",
                    "url": "/x21aResponsiveWar/patrones/feedback"
                },
                {
                    "i18nCaption": "form",
                    "url": "/x21aResponsiveWar/patrones/form"
                },
                {
                    "i18nCaption": "time",
                    "url": "/x21aResponsiveWar/patrones/time"
                },
                {
                    "i18nCaption": "message",
                    "url": "/x21aResponsiveWar/patrones/message"
                },
                {
                    "i18nCaption": "contextMenu",
                    "url": "/x21aResponsiveWar/patrones/contextMenu"
                },
                {
                    "i18nCaption": "menu",
                    "url": "/x21aResponsiveWar/patrones/menu"
                },
                {
                    "i18nCaption": "menuVertical",
                    "url": "/x21aResponsiveWar/patrones/menuVertical"
                },
                {
                    "i18nCaption": "menuMixto",
                    "url": "/x21aResponsiveWar/patrones/menuMixto"
                },
                {
                    "i18nCaption": "navMenu",
                    "url": "/x21aResponsiveWar/patrones/navMenu"
								},
                {
                    "i18nCaption": "tabsStatic",
                    "url": "/x21aResponsiveWar/patrones/tabsStatic"
                },
                {
                    "i18nCaption": "tabsAjax",
                    "url": "/x21aResponsiveWar/patrones/tabsAjax"
                },
                {
                    "i18nCaption": "tabsMixto",
                    "url": "/x21aResponsiveWar/patrones/tabsMixto"
                },
                {
                    "i18nCaption": "maintTab",
                    "url": "/x21aResponsiveWar/patrones/maintTab"
                },
                {
                    "i18nCaption": "grid",
                    "url": "/x21aResponsiveWar/patrones/grid"
                },
                {
                    "i18nCaption": "tooltip",
                    "url": "/x21aResponsiveWar/patrones/tooltip"
                },
                {
                    "i18nCaption": "upload",
                    "url": "/x21aResponsiveWar/patrones/upload"
                },
                {
                    "i18nCaption": "validate",
                    "url": "/x21aResponsiveWar/patrones/validate"
                },
                {
                    "i18nCaption": "wizardA",
                    "url": "/x21aResponsiveWar/patrones/wizard"
                },
                {
                    "i18nCaption": "wizardB",
                    "url": "/x21aResponsiveWar/patrones/wizard_includeFile"
                },
                {
                    "i18nCaption": "wizardC",
                    "url": "/x21aResponsiveWar/patrones/wizard_jspInclude"
                },
                {
                    "i18nCaption": "wizardD",
                    "url": "/x21aResponsiveWar/patrones/wizard_jstlImport"
                },
                {
                    "i18nCaption": "wizardE",
                    "url": "/x21aResponsiveWar/patrones/wizard_dinamico"
                }
				]
        },
        "experimental": {
            //Literal
            "i18nCaption": "experimental",
            //Elementos (url)
            "maestro_detalle": {
                "i18nCaption": "maestro_detalle"
            },
            "mant_multi_entidad": {
                "i18nCaption": "mant_multi_entidad"
            },
            "mant_clave_compuesta_multi": {
                "i18nCaption": "mant_clave_compuesta_multi"
            },
            "mant_clave_compuesta_edlinea": {
                "i18nCaption": "mant_clave_compuesta_edlinea"
            },
            //Submenu
            "subLevel": [
                {
                    "i18nCaption": "maestro_detalle",
                    "url": "/x21aResponsiveWar/experimental/maestro_detalle"
                },
                {
                    "i18nCaption": "mant_multi_entidad",
                    "url": "/x21aResponsiveWar/experimental/mant_multi_entidad"
                },
                {
                    "i18nCaption": "mant_clave_compuesta_multi",
                    "url": "/x21aResponsiveWar/experimental/mant_clave_compuesta_multi"
                },
                {
                    "i18nCaption": "mant_clave_compuesta_edlinea",
                    "url": "/x21aResponsiveWar/experimental/mant_clave_compuesta_edlinea"
                }
				]
        },
        "integracion": {
            //Literal
            "i18nCaption": "integracion",
            //Elementos (url)
            "z-index": {
                "i18nCaption": "z-index"
            },
            "nora": {
                "i18nCaption": "nora"
            },
            "tiny": {
                "i18nCaption": "tiny"
            },
            //Submenu
            "subLevel": [
                {
                    "i18nCaption": "z-index",
                    "url": "/x21aResponsiveWar/integracion/z-index"
                },
                {
                    "i18nCaption": "nora",
                    "url": "/x21aResponsiveWar/integracion/nora"
                },
                {
                    "i18nCaption": "tiny",
                    "url": "/x21aResponsiveWar/integracion/tiny"
                }
				]
        },
        "uda": {
            //Literal
            "i18nCaption": "uda"
        }
    }
});
