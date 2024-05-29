define(['jquery', 'marionette',
    './tableTemplate.hbs',
    'rup_table/rup.table',
    'rup.validate'
], function ($, Marionette, TableTestTemplate) {
    var TableTestView = Marionette.View.extend({
        template: TableTestTemplate,
        onAttach: fncOnAttach,
        initialize: function () {}
    });

    function fncOnAttach() {
        global.$=$;
        $('#example').rup_table({
            // initComplete: () => {},
            urlBase: '/demo/table/remote',
            fixedHeader: {
                footer: false,
                header: true
            },
            el: 'td',
            filter: {
                id: 'example_filter_form',
                filterToolbar: 'example_filter_toolbar',
                collapsableLayerId: 'example_filter_fieldset'
            },
            filterForm: '#example_filter_form',
            multiSelect: {
                style: 'multi'
            },
            formEdit: {
                detailForm: '#example_detail_div',
                validate: {
                    rules: {
                        id: {
                            required: true
                        },
                        nombre: {
                            'required': true
                        },
                        apellido1: {
                            required: true
                        },
                        fechaAlta: {
                            required: true
                        },
                        fechaBaja: {
                            date: true
                        }
                    }
                },
                titleForm: 'Modificar registro'
            },
            buttons: {
                activate: true,
                report: {
                    reportsParams: [{
                        isInline: false
                    }],
                    title: 'Descargar Informe Personalizado',
                    message: 'Descargando informe, por favor espere Personalizado'
                },
                blackListButtons: ['csvButton']
            },
            seeker: {
                'activate': true
            },
            colReorder: {
                'fixedColumnsLeft': 1
            },
            columnDefs: [{
                'targets': [2],
                'className': 'never'
            }],
            colModel: [{
                name: 'id',
                index: 'id',
                editable: true,
                hidden: false
            }, {
                name: 'nombre',
                index: 'nombre',
                editable: true,
                hidden: false
            }, {
                name: 'apellido1',
                index: 'apellido1',
                editable: true,
                hidden: false
            }, {
                name: 'ejie',
                index: 'ejie',
                editable: true,
                hidden: false,
                editoptions: {
                    value: '1:0'
                }
            }, {
                name: 'fechaAlta',
                index: 'fecha_alta',
                editable: true,
                hidden: false,
                rupType: 'date',
                editoptions: {
                    labelMaskId: 'fecha-mask',
                    showButtonPanel: true,
                    showOtherMonths: true,
                    noWeekend: true
                }
            }, {
                name: 'fechaBaja',
                index: 'fecha_baja',
                editable: false,
                hidden: false,
                rupType: 'date',
                editoptions: {
                    labelMaskId: 'fecha-mask',
                    showButtonPanel: true,
                    showOtherMonths: true,
                    noWeekend: true
                }
            }, {
                name: 'rol',
                index: 'rol',
                editable: true,
                hidden: false,
                rupType: 'select',
                editoptions: {
                    data: [{
                        text: '---',
                        id: ''
                    }, {
                        text: 'Administrador',
                        id: 'administrador'
                    }, {
                        text: 'Desarrollador',
                        id: 'desarrollador'
                    }, {
                        text: 'Espectador',
                        id: 'espectador'
                    }, {
                        text: 'Informador',
                        id: 'informador'
                    }, {
                        text: 'Manager',
                        id: 'manager'
                    }]
                }
            }]
        });
    }

    return TableTestView;
});