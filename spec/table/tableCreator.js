/* eslint multistr: 0 */
/* eslint-env jquery */

import 'jquery';

function generateHtml(idDatatable) {
    var html =
        '<div class="row">' +
        '<div class="col-xs-12">' +
        '<form id="' + idDatatable + '_filter_form">' +
        '<div id="' + idDatatable + '_filter_toolbar" class="formulario_legend"></div>' +
        '<fieldset id="' + idDatatable + '_filter_fieldset" class="rup-table-filter-fieldset">' +
        '<div class="row">' +
        '<div class="col-xs-6 col-md-3">' +
        '<div class="form-group form-group-sm">' +
        '<label for="id_filter_table" class="formulario_linea_label">Id:</label>' +
        '<input type="text" name="id" class="formulario_linea_input form-control" id="id_filter_table" />' +
        '</div>' +
        '</div>' +
        '<div class="col-xs-6 col-md-3">' +
        '<div class="form-group form-group-sm">' +
        '<label for="nombre_filter_table" class="formulario_linea_label">Nombre:</label>' +
        '<input type="text" name="nombre" class="formulario_linea_input form-control" id="nombre_filter_table" />' +
        '</div>' +
        '</div>' +
        '<div class="col-xs-6 col-md-3">' +
        '<div class="form-group form-group-sm">' +
        '<label for="apellidos_filter_table" class="formulario_linea_label">Apellidos:</label>' +
        '<input type="text" name="apellidos" class="formulario_linea_input form-control" id="apellidos_filter_table" />' +
        '</div>' +
        '</div>' +
        '<div class="col-xs-6 col-md-3">' +
        '<div class="form-group form-group-sm">' +
        '<label for="edad_filter_table" class="formulario_linea_label">Edad:</label>' +
        '<input type="text" name="edad" class="formulario_linea_input form-control" id="edad_filter_table" />' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<!-- Botonera del formulario de filtrado -->' +
        '<div id="' + idDatatable + '_filter_buttonSet" class="right_buttons">' +
        '<!-- Enlace de limpiar -->' +
        '<!-- <button id="' + idDatatable + '_filter_cleanLink" type="button" class="btn btn-warning btn-block">Limpiar</button> -->' +
        '<a id="' + idDatatable + '_filter_cleanLink" href="javascript:void(0)" class="rup-enlaceCancelar">Limpiar</a>' +
        '<!-- Botón de filtrado -->' +
        '<button id="' + idDatatable + '_filter_filterButton" type="button" class="btn btn-info btn-block rup-filtrar">Filtrar</button>' +
        '</div>' +
        '</fieldset>' +
        '</form>' +
        '</div>' +
        '</div>' +
        '<div id="' + idDatatable + '_detail_div" class="rup-table-formEdit-detail">' +
        '<div id ="' + idDatatable + '_detail_navigation"></div>' +
        '<div class="ui-dialog-content ui-widget-content" >' +
        '<form id="' + idDatatable + '_detail_form">' +
        '<div id ="' + idDatatable + '_detail_feedback"></div>' +
        '<div class="floating_left_pad_right">' +
        '<div class="floating_left_pad_right one-column">' +
        '<label for="id_detailForm_table">id:</label>' +
        '<input type="text" name="id" class="formulario_linea_input" id="id_detailForm_table" />' +
        '</div>' +
        '<div class="floating_left_pad_right one-column">' +
        '<label for="nombre_detail_table">Nombre:</label>' +
        '<input type="text" name="nombre" class="formulario_linea_input" id="nombre_detail_table" />' +
        '</div>' +
        '<div class="floating_left_pad_right one-column">' +
        '<label for="apellidos_detail_table">Apellidos:</label>' +
        '<input type="text" name="apellidos" class="formulario_linea_input" id="apellidos_detail_table" />' +
        '</div>' +
        '<div class="floating_left_pad_right one-column">' +
        '<label for="edad_detail_table">Edad:</label>' +
        '<input type="text" name="edad" class="formulario_linea_input" id="edad_detail_table" />' +
        '</div>' +
        '</div>' +
        '</form>' +
        '</div>' +
        '<div class="rup-table-buttonpane ui-widget-content ui-helper-clearfix">' +
        '<div class="ui-dialog-buttonset">' +
        '<button id="' + idDatatable + '_detail_button_save" class="btn btn-outline-success" type="button">' +
        'Guardar' +
        '</button>' +
        '<button id="' + idDatatable + '_detail_button_save_repeat" class="btn btn-outline-success" type="button">' +
        'Guardar y continuar' +
        '</button>' +
        '<button id="' + idDatatable + '_detail_link_cancel" class="btn btn-outline-danger" type="button">' +
        'Cancelar' +
        '</button>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="row">' +
        '<div class="col-xs-12">' +
        '<table id="' + idDatatable + '" class="tableFit table-striped table-bordered" ' +
        'data-filter-form="#' + idDatatable + '_filter_form" ' +
        'cellspacing="0">' +
        '<thead>' +
        '<tr>' +
        '<th data-col-prop="id">Id</th>' +
        '<th data-col-prop="nombre">Nombre</th>' +
        '<th data-col-prop="apellidos">Apellidos</th>' +
        '<th data-col-prop="edad">Edad</th>' +
        '</tr>' +
        '</thead>' +
        '</table>' +
        '</div>' +
        '</div>';
    return html;
}
export function createDatatable1(ctx, callback) {
    var idDatatable = '';
    var opts = {};
    if (ctx <= 0) {
        idDatatable = 'example';
        $.extend(opts, true, {
            multiSelect: {
                style: 'multi'
            }
        });
    } else {
        idDatatable = 'example1';
        $.extend(opts, true, {
            multiSelect: {
                style: 'simple'
            }
        });
    }

    var defaults = {
        urlBase: '/demo/table/remote',
        selector: 'td',
        colModel: [{
            name: 'id',
            index: 'id',
            editable: true,
            width: 80,
            formoptions: {
                rowpos: 1,
                colpos: 1
            }
        }, {
            name: 'nombre',
            index: 'nombre',
            editable: true,
            formoptions: {
                rowpos: 2,
                colpos: 1
            }
        }, {
            name: 'apellidos',
            index: 'apellidos',
            editable: true,
            formoptions: {
                rowpos: 3,
                colpos: 1
            },
            classes: 'ui-ellipsis'
        }, {
            name: 'edad',
            index: 'edad',
            editable: true,
            formoptions: {
                rowpos: 4,
                colpos: 1
            }
        }],
        initComplete: function () {
            // FIXME : Hay que buscar alguna forma de prescindir del timeout.
            setTimeout(callback, 500);
        },
        buttons: {
            activate: true
        },
        filter: {
            id: idDatatable + '_filter_form',
            filterToolbar: idDatatable + '_filter_toolbar',
            collapsableLayerId: idDatatable + '_filter_fieldset'
        },
        formEdit: {
            detailForm: '#' + idDatatable + '_detail_div',
            titleForm: 'Modificar registro',
            saveContinueEdit: false,
            validate: {
                rules: {
                    nombre: {
                        required: true
                    }
                }
            }
        },
        seeker: {
            activate: true
        },
        colReorder: {
            fixedColumnsLeft: 1
        }
    };

    $.extend(opts, true, defaults);

    if ($('#content').length == 0) {
        $('body').append('<div id="content" class="container"></div>');
    }

    var html = generateHtml(idDatatable);
    $('#content').append(html);
    if (ctx < 0) {
        var foot = '<tfoot>' +
            '<tr>' +
            '<th>Id</th>' +
            '<th>Nombre</th>' +
            '<th>Apellidos</th>' +
            '<th>Edad</th>' +
            '</tr>' +
            '</tfoot>';
        $('#' + idDatatable).append(foot);

    }

    $('#' + idDatatable).rup_table(opts);

}
export function createDatatableInlineEdit(callback) {
    var opts = {
        // No era cosa de no tener timeout, Quitar timeout
        initComplete: () => {
            setTimeout(callback, 500);
        },
        urlBase: '/demo/table/remote',
        selector: 'td',
        colModel: [{
            name: 'id',
            index: 'id',
            editable: true,
            width: 80,
            formoptions: {
                rowpos: 1,
                colpos: 1
            }
        }, {
            name: 'nombre',
            index: 'nombre',
            editable: true,
            formoptions: {
                rowpos: 2,
                colpos: 1
            }
        }, {
            name: 'apellidos',
            index: 'apellidos',
            editable: true,
            formoptions: {
                rowpos: 3,
                colpos: 1
            },
            classes: 'ui-ellipsis'
        }, {
            name: 'edad',
            index: 'edad',
            editable: true,
            formoptions: {
                rowpos: 4,
                colpos: 1
            }
        }],
        buttons: {
            activate: true
        },
        filter: {
            id: 'exampleInline_filter_form',
            filterToolbar: 'exampleInline_filter_toolbar',
            collapsableLayerId: 'exampleInline_filter_fieldset'
        },
        seeker: {
            activate: true
        },
        select: {
            activate: true
        },
        inlineEdit: {
            deselect: true,
            validate: {
                rules: {
                    id: {
                        required: true
                    },
                    nombre: {
                        required: true
                    }
                }
            }
        }
    };
    var html = generateHtml('exampleInline');
    $('#content').append(html);

    $('#exampleInline').rup_table(opts);
}
export function createDatatable2(callback) {
    var idDatatable = 'example2';
    var opts = {
        urlBase: '/demo/table/remote',
        selector: 'td',
        multiSelect: {
            style: 'simple'
        },
        colModel: [{
            name: 'id',
            index: 'id',
            editable: true,
            width: 80,
            formoptions: {
                rowpos: 1,
                colpos: 1
            }
        }, {
            name: 'nombre',
            index: 'nombre',
            editable: true,
            formoptions: {
                rowpos: 2,
                colpos: 1
            }
        }, {
            name: 'apellidos',
            index: 'apellidos',
            editable: true,
            formoptions: {
                rowpos: 3,
                colpos: 1
            },
            classes: 'ui-ellipsis'
        }, {
            name: 'edad',
            index: 'edad',
            editable: true,
            formoptions: {
                rowpos: 4,
                colpos: 1
            }
        }],
        initComplete: function () {
            // FIXME : Hay que buscar alguna forma de prescindir del timeout.
            setTimeout(() => {
                $('#' + idDatatable + ' > tbody').children().remove();
                callback();
            }, 500);
        },
        buttons: {
            activate: true
        },
        filter: {
            id: idDatatable + '_filter_form',
            filterToolbar: idDatatable + '_filter_toolbar',
            collapsableLayerId: idDatatable + '_filter_fieldset'
        },
        formEdit: {
            detailForm: '#' + idDatatable + '_detail_div',
            titleForm: 'Modificar registro',
            saveContinueEdit: false,
            validate: {
                rules: {
                    nombre: {
                        required: true
                    }
                }
            }
        },
        seeker: {
            activate: true
        },
        colReorder: {
            fixedColumnsLeft: 1
        }
    };
    
    if ($('#content').length == 0) {
        $('body').append('<div id="content" class="container"></div>');
    }
    var html = generateHtml(idDatatable);
    $('#content').append(html);
    $('#' + idDatatable).rup_table(opts);
}