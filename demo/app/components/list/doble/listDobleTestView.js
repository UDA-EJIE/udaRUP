/* eslint-env jquery,amd */
define(['jquery', 'marionette',
    './listDobleTemplate.hbs',
    'rup.list',
    'rup.combo'
], function ($, Marionette, ListDobleTestTemplate) {
    var ListDobleTestView = Marionette.View.extend({
        template: ListDobleTestTemplate,
        ui: {
            list: '#listDoble'
        },
        onAttach: fncOnAttach,
        initialize: function () {}
    });

    function fncOnAttach() {
        global.$ = $;

        // Preparamos los eventos de la pantalla
        $('#list1FilterLimpiar').on('click', (e) => {
            e.stopImmediatePropagation();
            e.preventDefault();
            $('#list1FilterForm').find('input').val('');
            $('#rup-list1').rup_list('filter');
        });
        $('#list1FilterAceptar').on('click', (e) => {
            e.stopImmediatePropagation();
            e.preventDefault();
            $('#rup-list1').rup_list('filter');
        });
        //Generamos el componente
        $('#rup-list1').rup_list({
            action: '/demo/list/filter',
            filterForm: 'list1FilterForm',
            feedback: 'rup-list1-feedback',
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

        // LISTA 2
        // Preparamos los eventos de la pantalla
        $('#list2FilterLimpiar').on('click', (e) => {
            e.stopImmediatePropagation();
            e.preventDefault();
            $('#list2FilterForm').find('input').val('');
            $('#rup-list2').rup_list('filter');
        });
        $('#list2FilterAceptar').on('click', (e) => {
            e.stopImmediatePropagation();
            e.preventDefault();
            $('#rup-list2').rup_list('filter');
        });
        //Generamos el componente
        $('#rup-list2').rup_list({
            action: '/demo/list/filter',
            filterForm: 'list2FilterForm',
            feedback: 'rup-list2-feedback',
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
    }

    return ListDobleTestView;
});