/* eslint-env jquery,amd */
define(['jquery', 'marionette',
    './listDialogTemplate.hbs',
    'rup.list',
    'rup.combo',
    'rup.dialog'
], function ($, Marionette, ListDialogTestTemplate) {
    var ListDialogTestView = Marionette.View.extend({
        template: ListDialogTestTemplate,
        ui: {
            list: '#listDialog'
        },
        onAttach: fncOnAttach,
        initialize: function () {}
    });

    function fncOnAttach() {
        global.$ = $;

        // Preparamos los eventos de la pantalla
        $('#listFilterLimpiar').on('click', (e) => {
            e.stopImmediatePropagation();
            e.preventDefault();
            $('#listFilterForm').find('input').val('');
            $('#rup-list').rup_list('filter');
        });
        $('#listFilterAceptar').on('click', (e) => {
            e.stopImmediatePropagation();
            e.preventDefault();
            $('#rup-list').rup_list('filter');
        });
        //Generamos el componente
        $('#rup-list').rup_list({
            action: '/demo/list/filter',
            filterForm: 'listFilterForm',
            feedback: 'rup-list-feedback',
            key: 'codigoPK',
            sidx: {
                source: [{
                    value: 'USUARIO',
                    i18nCaption: 'Usuario'
                }, {
                    value: 'EDAD',
                    i18nCaption: 'Edad'
                }, {
                    value: 'CODCLIENTE',
                    i18nCaption: 'Codigo cliente'
                }],
                value: 'USUARIO'
            },
            load: () => {}
        });

        //Creamos el componente rup_dialog
        $('#listDialog').rup_dialog({
            type: $.rup.dialog.DIV
            , autoOpen: false
            , width: 1200
            , title: 'Componente rup_list'
            , resizable: false
            , modal: true
        });
        //Preparamos la apertura del dialogo
        $('#dialogOpener').on('click', () => {
            $('#listDialog').rup_dialog('open');
        });
    }

    return ListDialogTestView;
});