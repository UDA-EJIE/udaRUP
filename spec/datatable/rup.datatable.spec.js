import 'jquery';
import 'jasmine-jquery';
import 'datatable/rup.datatable';
import * as consts from './datatable.html';

var plugins = [{
    name: 'multiselect',
    opts: {
        useplugins: ['multiselection'],
        multiselect: {}
    }
}];

function testDatatable(plugin) {
    describe('Test DataTable ' + plugin.name + ' > ', () => {
        var $datatable;
        beforeEach(() => {
            let opts = {
                "fixedHeader": {
                    "footer": false,
                    "header": true
                },
                "filter": {
                    "id": "example_filter_form",
                    "filterToolbar": "example_filter_toolbar",
                    "collapsableLayerId": "example_filter_fieldset"
                },
                "multiSelect": {
                    "style": "multi"
                },
                "formEdit": {
                    "detailForm": "#example_detail_div",
                    "validate": {
                        "rules": {
                            "nombre": {
                                "required": true
                            },
                            "apellido1": {
                                "required": true
                            },
                            "fechaAlta": {
                                "date": true
                            },
                            "fechaBaja": {
                                "date": true
                            }
                        }
                    },
                    "titleForm": "Modificar registro"
                },
                "buttons": {
                    "activate": true
                },
                "seeker": {
                    "colModel": [{
                        "name": "id",
                        "index": "id",
                        "editable": true,
                        "width": 80,
                        "formoptions": {
                            "rowpos": 1,
                            "colpos": 1
                        }
                    }, {
                        "name": "nombre",
                        "index": "nombre",
                        "editable": true,
                        "formoptions": {
                            "rowpos": 2,
                            "colpos": 1
                        }
                    }, {
                        "name": "apellidos",
                        "index": "apellidos",
                        "editable": true,
                        "formoptions": {
                            "rowpos": 3,
                            "colpos": 1
                        },
                        "classes": "ui-ellipsis"
                    }, {
                        "name": "edad",
                        "index": "edad",
                        "editable": true,
                        "formoptions": {
                            "rowpos": 4,
                            "colpos": 1
                        }
                    }, {
                        "name": "ejie",
                        "index": "ejie",
                        "editable": true,
                        "width": 60,
                        "edittype": "checkbox",
                        "formatter": "checkbox",
                        "rwdClasses": "hidden-xs hidden-sm hidden-md",
                        "align": "center",
                        "editoptions": {
                            "value": "1:0"
                        },
                        "searchoptions": {
                            "rupType": "combo",
                            "source": [{
                                "label": "---",
                                "value": ""
                            }, {
                                "label": "Si",
                                "value": "1"
                            }, {
                                "label": "No",
                                "value": "0"
                            }]
                        },
                        "formoptions": {
                            "rowpos": 5,
                            "colpos": 1
                        }
                    }, {
                        "name": "fechaAlta",
                        "index": "fecha_alta",
                        "editable": true,
                        "width": 120,
                        "rupType": "date",
                        "rwdClasses": "hidden-xs hidden-sm hidden-md",
                        "editoptions": {
                            "labelMaskId": "fecha-mask",
                            "showButtonPanel": true,
                            "showOtherMonths": true,
                            "noWeekend": true
                        },
                        "formoptions": {
                            "rowpos": 2,
                            "colpos": 2
                        }
                    }, {
                        "name": "fechaBaja",
                        "index": "fecha_baja",
                        "editable": true,
                        "width": 120,
                        "rupType": "date",
                        "rwdClasses": "hidden-xs hidden-sm hidden-md",
                        "editoptions": {
                            "labelMaskId": "fecha-mask",
                            "showButtonPanel": true,
                            "showOtherMonths": true,
                            "noWeekend": true
                        },
                        "formoptions": {
                            "rowpos": 3,
                            "colpos": 2
                        }
                    }, {
                        "name": "rol",
                        "index": "rol",
                        "editable": true,
                        "width": 140,
                        "rupType": "combo",
                        "rwdClasses": "hidden-xs hidden-sm hidden-md",
                        "formatter": "rup_combo",
                        "editoptions": {
                            "source": [{
                                "label": "---",
                                "value": ""
                            }, {
                                "label": "Administrador",
                                "value": "administrador"
                            }, {
                                "label": "Desarrollador",
                                "value": "desarrollador"
                            }, {
                                "label": "Espectador",
                                "value": "espectador"
                            }, {
                                "label": "Informador",
                                "value": "informador"
                            }, {
                                "label": "Manager",
                                "value": "manager"
                            }]
                        },
                        "formoptions": {
                            "rowpos": 3,
                            "colpos": 2
                        }
                    }]
                },
                "colReorder": {
                    "fixedColumnsLeft": 1
                }
            };
            $('#content').append(consts.html);
            $('#example').rup_datatable(opts);
        });
        describe('Creacion > ', () => {
            it('asd', () => {
                debugger;
                expect('asd').toBe('asd');
            });
        });
        describe('Pruebas plugins > ', () => {});
    });
}
testDatatable({
    name: 'prueba'
});