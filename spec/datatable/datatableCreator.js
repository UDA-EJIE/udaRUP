import 'jquery';
function generateHtml(idDatatable){
    var html = '<form id="' + idDatatable + '_filter_form">\
        <div id="' + idDatatable + '_filter_toolbar" class="formulario_legend"></div>\
        <fieldset id="' + idDatatable + '_filter_fieldset" class="rup-table-filter-fieldset">\
        <div class="row">\
            <div class="col-xs-6 col-md-3">\
            <div class="form-group form-group-sm">\
                <label for="id_filter_table" class="formulario_linea_label">Id:</label>\
                <input type="text" name="id" class="formulario_linea_input form-control" id="id_filter_table" />\
            </div>\
            </div>\
            <div class="col-xs-6 col-md-3">\
            <div class="form-group form-group-sm">\
                <label for="nombre_filter_table" class="formulario_linea_label">Nombre:</label>\
                <input type="text" name="nombre" class="formulario_linea_input form-control" id="nombre_filter_table" />\
            </div>\
            </div>\
            <div class="col-xs-6 col-md-3">\
            <div class="form-group form-group-sm">\
                <label for="apellidos_filter_table" class="formulario_linea_label">Apellidos:</label>\
                <input type="text" name="apellidos" class="formulario_linea_input form-control" id="apellidos_filter_table" />\
            </div>\
            </div>\
            <div class="col-xs-6 col-md-3">\
            <div class="form-group form-group-sm">\
                <label for="edad_filter_table" class="formulario_linea_label">Edad:</label>\
                <input type="text" name="edad" class="formulario_linea_input form-control" id="edad_filter_table" />\
            </div>\
            </div>\
        </div>\
        <!-- Botonera del formulario de filtrado -->\
        <div id="' + idDatatable + '_filter_buttonSet" class="right_buttons">\
            <!-- Enlace de limpiar -->\
            <!-- <button id="' + idDatatable + '_filter_cleanLink" type="button" class="btn btn-warning btn-block">Limpiar</button> -->\
            <a id="' + idDatatable + '_filter_cleanLink" href="javascript:void(0)" class="rup-enlaceCancelar">Limpiar</a>\
            <!-- Botón de filtrado -->\
            <button id="' + idDatatable + '_filter_filterButton" type="button" class="btn btn-info btn-block rup-filtrar">Filtrar</button>\
        </div>\
        </fieldset>\
        </form>\
        <div id="' + idDatatable + '_detail_div" class="rup-table-formEdit-detail">\
        <div id ="' + idDatatable + '_detail_navigation"></div>\
        <div class="ui-dialog-content ui-widget-content" >\
            <form id="' + idDatatable + '_detail_form">\
                <div id ="' + idDatatable + '_detail_feedback"></div>\
                <div class="floating_left_pad_right">\
                    <div class="floating_left_pad_right one-column">\
                        <label for="id_detailForm_table">id:</label>\
                        <input type="text" name="id" class="formulario_linea_input" id="id_detailForm_table" />\
                    </div>\
                    <div class="floating_left_pad_right one-column">\
                        <label for="nombre_detail_table">Nombre:</label>\
                        <input type="text" name="nombre" class="formulario_linea_input" id="nombre_detail_table" />\
                    </div>\
                    <div class="floating_left_pad_right one-column">\
                        <label for="apellidos_detail_table">Apellidos:</label>\
                        <input type="text" name="apellidos" class="formulario_linea_input" id="apellidos_detail_table" />\
                    </div>\
                    <div class="floating_left_pad_right one-column">\
                        <label for="edad_detail_table">Edad:</label>\
                        <input type="text" name="edad" class="formulario_linea_input" id="edad_detail_table" />\
                    </div>\
                </div>\
                \
            </form>\
        </div>\
        <div class="rup-table-buttonpane ui-widget-content ui-helper-clearfix">\
            <div class="ui-dialog-buttonset">\
                <button id="' + idDatatable + '_detail_button_save" class="btn btn-outline-success" type="button">\
                    Guardar\
                </button>\
                <button id="' + idDatatable + '_detail_button_save_repeat" class="btn btn-outline-success" type="button">\
                    Guardar y continuar\
                </button>\
                <button id="' + idDatatable + '_detail_link_cancel" class="btn btn-outline-danger" type="button">\
                    Cancelar\
                </button>\
            </div>\
        </div>\
        </div>\
        <table id="' + idDatatable + '" class="tableFit table-striped table-bordered" \
        data-filter-form="#' + idDatatable + '_filter_form" \
        cellspacing="0">\
            <thead>\
                <tr>\
                    <th data-col-prop="id">Id</th>\
                    <th data-col-prop="nombre">Nombre</th>\
                    <th data-col-prop="apellidos">Apellidos</th>\
                    <th data-col-prop="edad">Edad</th>\
                </tr>\
            </thead>\
            <tfoot>\
                <tr>\
                    <th>Id</th>\
                    <th>Nombre</th>\
                    <th>Apellidos</th>\
                    <th>Edad</th>\
                </tr>\
            </tfoot>\
        </table>';
    return html;
}
export function createDatatable1 (ctx, callback) {
    var idDatatable = 'example';
    var opts = {
        urlBase: "http://localhost:8081/demo/datatable/remote",
        pageLength: 5,
        fixedHeader: {
            footer: false,
            header: true
        },
        filter: {
            id: idDatatable + "_filter_form",
            filterToolbar: idDatatable + "_filter_toolbar",
            collapsableLayerId: idDatatable + "_filter_fieldset"
        },
        // multiSelect: {
        //     style: "multi"
        // },
        formEdit: {
            detailForm: "#" + idDatatable + "_detail_div",
            validate: {
                rules: {
                    nombre: {
                        required: true
                    },
                    apellido1: {
                        required: true
                    },
                    fechaAlta: {
                        date: true
                    },
                    fechaBaja: {
                        date: true
                    }
                }
            },
            titleForm: "Modificar registro"
        },
        buttons: {
            "activate": true
        },
        seeker: {
            colModel: [{
                name: "id",
                index: "id",
                editable: true,
                width: 80,
                formoptions: {
                    rowpos: 1,
                    colpos: 1
                }
            }, {
                name: "nombre",
                index: "nombre",
                editable: true,
                formoptions: {
                    rowpos: 2,
                    colpos: 1
                }
            }, {
                name: "apellidos",
                index: "apellidos",
                editable: true,
                formoptions: {
                    rowpos: 3,
                    colpos: 1
                },
                classes: "ui-ellipsis"
            }, {
                name: "edad",
                index: "edad",
                editable: true,
                formoptions: {
                    rowpos: 4,
                    colpos: 1
                }
            }]
        },
        colReorder: {
            fixedColumnsLeft: 1
        },
        initComplete: function() {
            setTimeout(function () {
                callback();
            }, 300);
        }
    }
    if(ctx == 0) {
        $.extend(opts, true, {multiSelect: {style: "multi"}});
    }
    else {
        $.extend(opts, true, {select: {activate: true}});
    }

    if ($('#content').length == 0) {
        $('body').append('<div id="content"></div>');
    }
    var html = generateHtml(idDatatable);
    $('#content').append(html);
    $('#' + idDatatable).rup_datatable(opts);
};

export function createDatatable2(callback) {
    var idDatatable = 'example2';
    var opts = {
        urlBase: "http://localhost:8081/demo/datatable/remote",
        // serverSide: true,
        // deferLoading: 15,
        pageLength: 5,
        fixedHeader: {
            footer: false,
            header: true
        },
        filter: {
            id: idDatatable + "_filter_form",
            filterToolbar: idDatatable + "_filter_toolbar",
            collapsableLayerId: idDatatable + "_filter_fieldset"
        },
        multiSelect: {
            style: "multi"
        },
        formEdit: {
            detailForm: "#" + idDatatable + "_detail_div",
            validate: {
                rules: {
                    nombre: {
                        required: true
                    },
                    apellido1: {
                        required: true
                    },
                    fechaAlta: {
                        date: true
                    },
                    fechaBaja: {
                        date: true
                    }
                }
            },
            titleForm: "Modificar registro"
        },
        buttons: {
            "activate": true
        },
        seeker: {
            colModel: [{
                name: "id",
                index: "id",
                editable: true,
                width: 80,
                formoptions: {
                    rowpos: 1,
                    colpos: 1
                }
            }, {
                name: "nombre",
                index: "nombre",
                editable: true,
                formoptions: {
                    rowpos: 2,
                    colpos: 1
                }
            }, {
                name: "apellidos",
                index: "apellidos",
                editable: true,
                formoptions: {
                    rowpos: 3,
                    colpos: 1
                },
                classes: "ui-ellipsis"
            }, {
                name: "edad",
                index: "edad",
                editable: true,
                formoptions: {
                    rowpos: 4,
                    colpos: 1
                }
            }]
        },
        colReorder: {
            fixedColumnsLeft: 1
        },
        initComplete: function() {
            setTimeout(function () {
                $('#' + idDatatable + ' > tbody').children().remove();
                callback();
            }, 300);
        }
    }

    if ($('#content').length == 0) {
        $('body').append('<div id="content"></div>');
    }
    var html = generateHtml(idDatatable);
    $('#content').append(html);
    $('#' + idDatatable).rup_datatable(opts);
};