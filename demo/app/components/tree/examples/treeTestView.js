define(['marionette',
        'templates',
        'rup.tree', 'rup.button'], function (Marionette, App) {

    var TreeTestView = Marionette.LayoutView.extend({
        template: App.Templates.demo.app.components.tree.examples.treeTestTemplate,
        ui: {
            treeCodeDialog: "#treeCodeDialog"
        },
        onAttach: fncOnAttach

    });

    function fncOnAttach() {
        var $view = this;

        //Copia fuente del código del árbol utilizado
        $("#defaultDemoCodeHtml code").append("&lt;div id=\"defaultDemo\" class=\"rup_tree\"&gt;<br/>");
        $("#defaultDemoCodeHtml code").append($($("#model_example_1_code").html()).clone());

        $("#specificStyleDemoCodeHtml code").append("&lt;div id=\"specificStyleDemo\" class=\"rup_tree\"&gt;<br/>");
        $("#specificStyleDemoCodeHtml code").append($($("#model_example_1_code").html()).clone());

        $("#changeViewDemoCodeHtml code").append("&lt;div id=\"changeViewDemo\" class=\"rup_tree\"&gt;<br/>");
        $("#changeViewDemoCodeHtml code").append($($("#model_example_1_code").html()).clone());

        $("#jqueryuiStylesDemoCodeHtml code").append("&lt;div id=\"jqueryuiStylesDemo\" class=\"rup_tree\"&gt;<br/>");
        $("#jqueryuiStylesDemoCodeHtml code").append($($("#model_example_1_code").html()).clone());

        $("#selectDemoCodeHtml code").append("&lt;div id=\"selectDemo\" class=\"rup_tree\"&gt;<br/>");
        $("#selectDemoCodeHtml code").append($($("#model_example_1_code").html()).clone());

        $("#hotkeysDemoCodeHtml code").append("&lt;div id=\"hotkeysDemo\" class=\"rup_tree\"&gt;<br/>");
        $("#hotkeysDemoCodeHtml code").append($($("#model_example_1_code").html()).clone());

        $("#sortDemoCodeHtml code").append("&lt;div id=\"sortDemo\" class=\"rup_tree\"&gt;<br/>");
        $("#sortDemoCodeHtml code").append($($("#model_example_1_code").html()).clone());

        $("#checkboxDemoCodeHtml code").append("&lt;div id=\"checkboxDemo\" class=\"rup_tree\"&gt;<br/>");
        $("#checkboxDemoCodeHtml code").append($($("#model_example_1_code").html()).clone());

        $("#contextmenuDemoCodeHtml code").append("&lt;div id=\"contextmenuDemo\" class=\"rup_tree\"&gt;<br/>");
        $("#contextmenuDemoCodeHtml code").append($($("#model_example_1_code").html()).clone());

        $("#uniqueDemoCodeHtml code").append("&lt;div id=\"uniqueDemo\" class=\"rup_tree\"&gt;<br/>");
        $("#uniqueDemoCodeHtml code").append($($("#model_example_2_code").html()).clone());

        function codeCleanLoad(id) {
            $view.ui.treeCodeDialog.find("#htmlCode").children().remove();
            $view.ui.treeCodeDialog.find("#javaScriptCode").children().remove();
            $view.ui.treeCodeDialog.find("#htmlCode").append($("#" + id + "JS").clone());
            $view.ui.treeCodeDialog.find("#javaScriptCode").append($("#" + id + "Html").clone());
        }

        /* Dialogo de visualización de código */
        $view.ui.treeCodeDialog.rup_dialog({
            type: $.rup.dialog.DIV,
            autoOpen: false,
            modal: true,
            resizable: true,
            width: "auto",
            title: $.rup.i18nParse($.rup.i18n.app["treeCodeDialog"], "title"),
            buttons: [{
                text: $.rup.i18nParse($.rup.i18n.base, "rup_global.close"),
                click: function () {
                    $(this).dialog("close");
                }
		}]
        });


        /* Ejemplo de un árbol por defecto */
        //Copia del código del árbol utilizado
        $("#defaultDemo").html($($("#model_example_1").html()).clone());

        $("#defaultDemo").rup_tree();

        $("#btnDefaultDemo").bind("click", function () {
            codeCleanLoad("defaultDemoCode");
            $view.ui.treeCodeDialog.rup_dialog("open");
        });


        /* Ejemplo de un árbol con estilo especificado por la aplicación */
        //Copia del código del árbol utilizado
        $("#specificStyleDemo").html($($("#model_example_1").html()).clone());

        $("#specificStyleDemo").rup_tree({
            "themes": {
                "theme": "default",
                "url": STATICS + "/demoResponsive/css/tree/themes/default/style.css"
            }
        });

        $("#btnSpecificStyleDemo").bind("click", function () {
            codeCleanLoad("specificStyleDemoCode");
            $view.ui.treeCodeDialog.rup_dialog("open");
        });


        /* Ejemplo de un árbol que cambie su aspecto visual */
        //Copia del código del árbol utilizado
        $("#changeViewDemo").prepend($($("#model_example_1").html()).clone());

        $("#changeViewDemo").rup_tree({
            "themes": {
                "dots": false,
                "icons": false
            }
        });

        $("#btnChangeViewDemo").bind("click", function () {
            codeCleanLoad("changeViewDemoCode");
            $view.ui.treeCodeDialog.rup_dialog("open");
        });

        $("#toggle_dots").click(function () {
            $("#changeViewDemo").rup_tree("toggle_dots");
        });

        $("#toggle_icons").click(function () {
            $("#changeViewDemo").rup_tree("toggle_icons");
        });

        $("#changeTheme").click(function () {
            var type = $("#changeViewDemo").rup_tree("get_theme");
            if (type === "rup-default") {
                $("#changeViewDemo").rup_tree("set_theme", "apple", STATICS + "/x21a/styles/tree/themes/apple/style.css");
            } else if (type === "apple") {
                $("#changeViewDemo").rup_tree("set_theme", "default", STATICS + "/x21a/styles/tree/themes/default/style.css");
            } else if (type === "default") {
                $("#changeViewDemo").rup_tree("set_theme", "classic", STATICS + "/x21a/styles/tree/themes/classic/style.css");
            } else {
                $("#changeViewDemo").rup_tree("set_theme", "rup-default", false);
            }
        });

        /* Ejemplo de árbol con estilos de jQueryUI */
        //Copia del código del árbol utilizado
        $("#jqueryuiStylesDemo").html($($("#model_example_1").html()).clone());

        $("#jqueryuiStylesDemo").rup_tree({
            "core": {
                "initially_open": ["node121", "node112", "node113"],
                "html_titles": true
            },
            "jQueryUIStyles": {
                "enable": true
            }
        });

        $("#btnJqueryuiStylesDemo").bind("click", function () {
            codeCleanLoad("jqueryuiStylesDemoCode");
            $view.ui.treeCodeDialog.rup_dialog("open");
        });

        $("#tree_example").rup_tree({
            "json_data": {

            }

        });


        /* Ejemplo de un árbol con cambios en el modo de selección */
        //Copia del código del árbol utilizado
        $("#selectDemo").prepend($($("#model_example_1").html()).clone());

        $("#selectDemo").rup_tree({
            "select": {
                "select_limit": "2",
                "initially_select": ["node122", "node1213"]
            }
            //		,"select_node_event" : function(){var nodes = "";$.each($("#selectDemo").rup_tree("get_selected"), function(key, value){nodes = nodes + $(value).attr("id")+ " ";}); alert("Evento select<br>Nodos seleccionados: "+ nodes);},
            //		"deselect_node_event" : function(){var nodes = "";$.each($("#selectDemo").rup_tree("get_selected"), function(key, value){nodes = nodes + $(value).attr("id")+ " ";}); alert("Evento deselect<br>Nodos seleccionados: "+ nodes);}
        });

        $("#btnSelectDemo").bind("click", function () {
            codeCleanLoad("selectDemoCode");
            $view.ui.treeCodeDialog.rup_dialog("open");
        });

        $("#saveSelection").click(function () {
            $("#selectDemo").rup_tree("save_selected");
        });

        $("#loadSelection").click(function () {
            $("#selectDemo").rup_tree("deselect_all");
            $("#selectDemo").rup_tree("reselect");
        });

        $("#deselectAll").click(function () {
            $("#selectDemo").rup_tree("deselect_all");
        });


        /* Ejemplo del manejo de un árbol con el teclado (por defecto activo) */
        //Copia del código del árbol utilizado
        $("#hotkeysDemo").html($($("#model_example_1").html()).clone());

        $("#hotkeysDemo").rup_tree({
            "core": {
                "initially_open": ["node121"]
            }
        });

        $("#enableHotkeys").click(function () {
            $("#hotkeysDemo").rup_tree("enable_hotkeys");
        });

        $("#disableHotkeys").click(function () {
            $("#hotkeysDemo").rup_tree("disable_hotkeys");
        });

        $("#btnHotkeysDemo").bind("click", function () {
            codeCleanLoad("hotkeysDemoCode");
            $view.ui.treeCodeDialog.rup_dialog("open");
        });

        /* Ejemplo de ordenacion de nodos de un árbol */
        //Copia del código del árbol utilizado
        $("#sortDemo").html($($("#model_example_1").html()).clone());

        $("#sortDemo").rup_tree({
            "core": {
                "initially_open": ["node121", "node112"]
            },
            "sort": {
                "enable": true
            }
        });

        $("#renameButton").click(function () {
            if ($("#sortDemo").rup_tree("get_selected").size() > 0) {
                $("#sortDemo").rup_tree("rename");
            }
        });

        $("#btnSortDemo").bind("click", function () {
            codeCleanLoad("sortDemoCode");
            $view.ui.treeCodeDialog.rup_dialog("open");
        });

        /* Ejemplo de árbol con checkbox */
        //Copia del código del árbol utilizado
        $("#checkboxDemo").html($($("#model_example_1").html()).clone());

        $("#checkboxDemo").rup_tree({
            "core": {
                "initially_open": ["node121", "node112", "node113"]
            },
            "checkbox": {
                "enable": true
            }
        });


        var checkboxState = true;

        $("#checkboxShowHide").click(function () {
            if (checkboxState) {
                checkboxState = false;
                $("#checkboxDemo").rup_tree("hide_checkboxes");
            } else {
                checkboxState = true;
                $("#checkboxDemo").rup_tree("show_checkboxes");
            }
        });

        $("#checkboxCheckAll").click(function () {
            $("#checkboxDemo").rup_tree("check_all");
        });

        $("#checkboxUncheckAll").click(function () {
            $("#checkboxDemo").rup_tree("uncheck_all");
        });

        $("#btnCheckboxDemo").bind("click", function () {
            codeCleanLoad("checkboxDemoCode");
            $view.ui.treeCodeDialog.rup_dialog("open");
        });

        /* Ejemplo de árbol con contextmenu */
        //Copia del código del árbol utilizado
        $("#contextmenuDemo").html($($("#model_example_1").html()).clone());

        $("#contextmenuDemo").rup_tree({
            "core": {
                "initially_open": ["node121", "node112", "node113"]
            },
            "contextmenu": {
                "enable": true,
                "defaultOptions": {
                    //				"create" : false,
                    //				"remove" : false,
                    //				"rename" : false,
                    //				//"ccp" : false
                    "ccp": {
                        //					"cut" : false,
                        //					"paste" : false,
                        "copy": false
                    }
                },
                "items": {
                    // Some key
                    "exampleItem": {
                        // The item label
                        "label": $.rup.i18nParse($.rup.i18n.app["contextmenuDemo"], "exampleEntry"),
                        // The function to execute upon a click
                        "action": function (obj) {
                            $("#contextmenuDemo").rup_tree("rename", obj);
                        },
                        // All below are optional
                        "_disabled": false, // clicking the item won't do a thing
                        "_class": "class", // class is applied to the item LI node
                        "separator_before": false, // Insert a separator before the item
                        "separator_after": false, // Insert a separator after the item
                        // false or string - if does not contain `/` - used as classname
                        "icon": false //,
                            //					"submenu"           : {
                            //					/* Collection of objects (the same structure) */
                            //						}
                    },
                    "rename": {
                        // The item label
                        "label": $.rup.i18nParse($.rup.i18n.app["contextmenuDemo"], "udaRename"),
                        // The function to execute upon a click
                        "action": function (obj) {
                            $("#contextmenuDemo").rup_tree("rename", obj);
                        },
                        // All below are optional
                        "_disabled": false, // clicking the item won't do a thing
                        "_class": "class", // class is applied to the item LI node
                        "separator_before": false, // Insert a separator before the item
                        "separator_after": false, // Insert a separator after the item
                        // false or string - if does not contain `/` - used as classname
                        "icon": false
                    }
                }
            },
            "sort": {
                "enable": true
            }
        });

        $("#btnContextmenuDemo").bind("click", function () {
            codeCleanLoad("contextmenuDemoCode");
            $view.ui.treeCodeDialog.rup_dialog("open");
        });

        /* Ejemplo de nodos, en el mismo subgrupo, que tengan diferente nombre (no puede haber dos iguales) */
        //Copia del código del árbol utilizado
        $("#uniqueDemo").html($($("#model_example_2").html()).clone());

        $("#uniqueDemo").rup_tree({
            "core": {
                "initially_open": ["nodeC", "nodeAC"]
            },
            "contextmenu": {
                "enable": true
            },
            "unique": {
                "enable": true,
                "error_callback": function (n, p, f) {
                    $.rup_messages("msgError", {
                        title: $.rup.i18nParse($.rup.i18n.app["uniqueDemo"], "duplicateKey"),
                        message: $.rup.i18nParse($.rup.i18n.app["uniqueDemo"], "duplicateNodes") + "\"" + n + "\"" + $.rup.i18nParse($.rup.i18n.app["uniqueDemo"], "inFunction") + "\"" + f + "\"!"
                    });
                }
            }
        });

        $("#uniqueRenameButton").click(function () {
            if ($("#uniqueDemo").rup_tree("get_selected").size() > 0) {
                $("#uniqueDemo").rup_tree("rename");
            }
        });

        $("#uniqueNewButton").click(function () {
            if ($("#uniqueDemo").rup_tree("get_selected").size() > 0) {
                $("#uniqueDemo").rup_tree("create");
            }
        });

        $("#btnUniqueDemo").bind("click", function () {
            codeCleanLoad("uniqueDemoCode");
            $view.ui.treeCodeDialog.rup_dialog("open");
        });

        /* Ejemplo de carga de datos mediante json */



        $("#jsonTreeDemo").rup_tree({
            "core": {
                "initially_open": ["Padre 1"]
            },
            "json_data": {
                "data": [{
                    "data": "Padre 1",
                    "children": [
                        {
                            "data": "Padre 1.1",
                            "children": [{
                                    "data": "Hoja 1.1.1"
            	  },
                                {
                                    "data": "Padre 1.1.2",
                                    "children": ["Hoja 1.1.2.1", "Hoja 1.1.2.2"]
            	  }]
			},
                        {
                            "data": "Hoja 1.2"
			}]
		}]
            }
        });

        /* Ejemplo de carga de datos mediante xml */



        $("#xmlTreeDemo").rup_tree({
            "core": {
                "initially_open": ["padre_1"]
            },
            "xml_data": {
                "data": "" +
                    "<root>" +
                    "<item id='padre_1'>" +
                    "<content><name><![CDATA[Padre 1]]></name></content>" +
                    "<item id='padre_1_1' parent_id='padre_1'>" +
                    "<content><name><![CDATA[Padre 1.1]]></name></content>" +
                    "<item id='hoja_1_1_1' parent_id='padre_1_1'>" +
                    "<content><name><![CDATA[Hoja 1.1.1]]></name></content>" +
                    "</item>" +
                    "<item id='padre_1_1_2' parent_id='padre_1_1'>" +
                    "<content><name><![CDATA[Padre 1.1.2]]></name></content>" +
                    "<item id='hoja_1_1_2_1' parent_id='padre_1_1_2'>" +
                    "<content><name><![CDATA[Hoja 1.1.2.1]]></name></content>" +
                    "</item>" +
                    "<item id='hoja_1_1_2_2' parent_id='padre_1_1_2'>" +
                    "<content><name><![CDATA[Hoja 1.1.2.2]]></name></content>" +
                    "</item>" +
                    "</item>" +
                    "</item>" +
                    "<item id='hoja_1_2' parent_id='padre_1'>" +
                    "<content><name><![CDATA[Hoja 1.2]]></name></content>" +
                    "</item>" +
                    "</item>" +
                    "</root>"
            }
        });


        $("#ajaxTreeDemo").rup_tree({
            "json_data": {
                "ajax": {
                    "url": "ajaxTree"
                }
            }
        });
    }




    return TreeTestView;
});
