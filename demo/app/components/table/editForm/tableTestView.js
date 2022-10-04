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
                hidden: false,
                width: 80,
                formoptions: {
                    rowpos: 1,
                    colpos: 1
                }
            }, {
                name: 'nombre',
                index: 'nombre',
                editable: true,
                hidden: false,
                formoptions: {
                    rowpos: 2,
                    colpos: 1
                }
            }, {
                name: 'apellido1',
                index: 'apellido1',
                editable: true,
                hidden: false,
                formoptions: {
                    rowpos: 3,
                    colpos: 1
                },
                classes: 'ui-ellipsis'
            }, {
                name: 'ejie',
                index: 'ejie',
                editable: true,
                hidden: false,
                width: 60,
                edittype: 'checkbox',
                formatter: 'checkbox',
                rwdClasses: 'hidden-xs hidden-sm hidden-md',
                align: 'center',
                editoptions: {
                    value: '1:0'
                },
                formoptions: {
                    rowpos: 5,
                    colpos: 1
                }
            }, {
                name: 'fechaAlta',
                index: 'fecha_alta',
                editable: true,
                hidden: false,
                width: 120,
                rupType: 'date',
                rwdClasses: 'hidden-xs hidden-sm hidden-md',
                editoptions: {
                    labelMaskId: 'fecha-mask',
                    showButtonPanel: true,
                    showOtherMonths: true,
                    noWeekend: true
                },
                formoptions: {
                    rowpos: 2,
                    colpos: 2
                }
            }, {
                name: 'fechaBaja',
                index: 'fecha_baja',
                editable: false,
                hidden: false,
                width: 120,
                rupType: 'date',
                rwdClasses: 'hidden-xs hidden-sm hidden-md',
                editoptions: {
                    labelMaskId: 'fecha-mask',
                    showButtonPanel: true,
                    showOtherMonths: true,
                    noWeekend: true
                },
                formoptions: {
                    rowpos: 3,
                    colpos: 2
                }
            }, {
                name: 'rol',
                index: 'rol',
                editable: true,
                hidden: false,
                width: 140,
                rupType: 'combo',
                rwdClasses: 'hidden-xs hidden-sm hidden-md',
                formatter: 'rup_combo',
                editoptions: {
                    source: [{
                        label: '---',
                        value: ''
                    }, {
                        label: 'Administrador',
                        value: 'administrador'
                    }, {
                        label: 'Desarrollador',
                        value: 'desarrollador'
                    }, {
                        label: 'Espectador',
                        value: 'espectador'
                    }, {
                        label: 'Informador',
                        value: 'informador'
                    }, {
                        label: 'Manager',
                        value: 'manager'
                    }],
                    width: '100%',
                    customClasses: ['select-material']
                },
                formoptions: {
                    rowpos: 3,
                    colpos: 2
                }
            }]
        });
    }

    return TableTestView;
});