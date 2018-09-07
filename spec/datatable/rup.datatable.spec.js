import 'jquery';
import 'jasmine-jquery';
import 'rup.dialog';
import 'rup.table';
import 'datatable/rup.datatable';
import * as testutils from '../common/specCommonUtils.js';
import * as consts from './datatable.html';

function testDatatable() {
    describe('Test DataTable > ', () => {

        beforeAll((done) => {
            testutils.loadCss(done);
        });

        var $datatable;
        var dt;
        beforeEach((done) => {
            let opts = {
                "urlBase": "http://localhost:8081/demo/datatable/remote",
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
                            "apellidos": {
                                "required": true
                            },
                            "edad": {
                                "required": true
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
                        },
                        {
                            "name": "nombre",
                            "index": "nombre",
                            "editable": true,
                            "formoptions": {
                                "rowpos": 2,
                                "colpos": 1
                            }
                        },
                        {
                            "name": "apellidos",
                            "index": "apellidos",
                            "editable": true,
                            "formoptions": {
                                "rowpos": 3,
                                "colpos": 1
                            },
                            "classes": "ui-ellipsis"
                        },
                        {
                            "name": "edad",
                            "index": "edad",
                            "editable": true,
                            "formoptions": {
                                "rowpos": 4,
                                "colpos": 1
                            }
                        }
                    ]
                },
                'initComplete': () => {
                    setTimeout(function () {
                        $datatable = $('#example');
                        dt = $datatable.DataTable();
                        done();
                    }, 300);
                }
            };

            if ($('#content').length == 0) {
                $('body').append('<div id="content"></div>');
            }

            $('#content').append(consts.html);
            $('#example').rup_datatable(opts);
        });

        afterEach(() => {
            dt.destroy();
            $('#content').html('');
            $('#content').nextAll().remove();
        });

        describe('Funcionamiento > ', () => {
            describe('Filtrado > ', () => {
                beforeEach((done) => {
                    $datatable.on('draw.dt', () => {
                        setTimeout(() => {
                            done();
                        }, 300);
                    });
                    $('#id_filter_table').val('4');
                    $('#example_filter_filterButton').click();
                });
                it('Debe haberse completado el filtrado:', () => {
                    expect($('tbody > tr').length).toBe(1);
                    expect($('tbody > tr > td:eq(1)').text()).toBe('4');
                });
            });
        });
        describe('Búsqueda > ', () => {
            beforeEach((done) => {
                $datatable.on('draw.dt', () => {
                    setTimeout(() => {
                        debugger;
                        done();
                    }, 300);
                });
                debugger;
                $('#searchCollapsLabel_example').click();
            });
            describe('Aparición del seeker > ', () => {
                it('Se muestra el formulario de búsqueda:', () => {
                    expect($('#id_seeker').is(':visible')).toBe(true);
                    expect($('#id_nombre').is(':visible')).toBe(true);
                    expect($('#id_apellidos').is(':visible')).toBe(true);
                    expect($('#id_edad').is(':visible')).toBe(true);
                });
            });
            describe('Funcionalidad del seeker > ', () => {
                beforeEach(() => {
                    $('#id_seeker').val('4');
                    $('#search_nav_button_example').click();
                    $datatable.on('select.td', () => {
                        done();
                    });
                });
                it('Se selecciona y marca el resultado de la selección: ', () => {
                    expect($('td:contains(4)').parent().hasClass('selected tr-highlight')).toBe(true);
                });
            });
        });
        describe('Paginación > ', () => {});
        describe('Variacion de número de registros por página > ', () => {});
        describe('Ordenación > ', () => {});
        describe('Botonera > ', () => {});
        describe('Menú contextual > ', () => {});
        describe('Edición con formulario > ', () => {});
        describe('Edición en línea > ', () => {});
        describe('Multiseleccion > ', () => {});
    });
}
testDatatable();