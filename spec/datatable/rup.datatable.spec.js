import 'jquery';
import 'jasmine-jquery';
import 'rup.dialog';
import 'rup.contextMenu'
import 'rup.table';
import 'datatable/rup.datatable';
import * as testutils from '../common/specCommonUtils.js';
import * as consts from './datatable.html';

function testDatatable() {
    describe('Test DataTable > ', () => {

        beforeAll((done) => {
            testutils.loadCss(done);
        });

        afterEach(() => {
            $('#content').html('');
            $('#content').nextAll().remove();
        });

        var $datatable;
        var dt;
        beforeEach((done) => {
            let opts = {
                "urlBase": "http://localhost:8081/demo/datatable/remote",
                "pageLength": 5,
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
            dt.destroy(true);
            delete $.fn.dataTable.seeker.search.funcionParams; //FIXME: Pendiente de corrección de rup_datatable
            $('#content').html('');
            $('#content').nextAll().remove();
        });

        describe('Funcionamiento > ', () => {
            describe('Menú contextual > ', () => {
                beforeEach(() => {
                    debugger;
                    $('tbody > tr:eq(0) > td:eq(1)', $datatable).contextmenu();
                });
                it('asd', () => {
                    debugger;
                    expect(1).toBe(1);
                });
            });
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

            describe('Búsqueda > ', () => {
                beforeEach(() => {
                    $('#searchCollapsLabel_example').click();
                });
                describe('Aparición del seeker > ', () => {
                    it('Se muestra el formulario de búsqueda:', () => {
                        expect($('#id_seeker').is(':visible')).toBeTruthy();
                        expect($('#nombre_seeker').is(':visible')).toBeTruthy();
                        expect($('#apellidos_seeker').is(':visible')).toBeTruthy();
                        expect($('#edad_seeker').is(':visible')).toBeTruthy();
                    });
                });
                describe('Funcionalidad del seeker > ', () => {
                    beforeEach((done) => {
                        $('#nombre_seeker').val('E');
                        $('#search_nav_button_example').click();
                        $datatable.on('searchDone.rup.dt', () => {
                            done();
                        });
                    });
                    it('Se selecciona y marca el resultado de la selección: ', () => {
                        let ctx = $('td:contains(4)').parent();
                        expect($('td > span.ui-icon-search', ctx).length).toBe(1);

                        ctx = $('td:contains(5)').parent();
                        expect($('td > span.ui-icon-search', ctx).length).toBe(1);
                    });
                });
            });
            describe('Paginación > ', () => {
                describe('Página siguiente > ', () => {
                    beforeEach((done) => {
                        $datatable.on('draw.dt', () => {
                            setTimeout(() => {
                                done();
                            }, 300);
                        });
                        $('#example_next').click();
                    });
                    it('Cambia el número de página:', () => {
                        expect($('li.pageSearch.searchPaginator > input').val()).toBe("2");
                    });
                    it('Los registros deben cambiar:', () => {
                        expect($('tr > td:contains(6)').length).toBe(1);
                        expect($('tr > td:contains(7)').length).toBe(1);
                        expect($('tr > td:contains(8)').length).toBe(1);
                        expect($('tr > td:contains(9)').length).toBe(1);
                        expect($('tr > td:contains(10)').length).toBe(1);
                    });
                });
                describe('Página anterior > ', () => {
                    beforeEach((done) => {
                        $datatable.on('draw.dt', () => {
                            setTimeout(() => {
                                done();
                            }, 300);
                        });
                        $('#example_next').click();
                    });
                    describe('Realizacion de pruebas > ', () => {
                        beforeEach((done) => {
                            $datatable.on('draw.dt', () => {
                                setTimeout(() => {
                                    done();
                                }, 300);
                            });
                            $('#example_previous').click();
                        });
                        it('Cambia el número de página:', () => {
                            expect($('li.pageSearch.searchPaginator > input').val()).toBe("1");
                        });
                        it('Los registros deben cambiar:', () => {
                            expect($('tr > td:contains(1)').length).toBe(1);
                            expect($('tr > td:contains(2)').length).toBe(1);
                            expect($('tr > td:contains(3)').length).toBe(1);
                            expect($('tr > td:contains(4)').length).toBe(1);
                            expect($('tr > td:contains(5)').length).toBe(1);
                        });
                    });
                    
                });
                describe('Página primera > ', () => {
                    beforeEach((done) => {
                        $datatable.on('page.dt', () => {
                            setTimeout(() => {
                                done();
                            }, 300);
                        });
                        $('#example_next').click();
                    });
                    describe('Realizacion de pruebas', () => {
                        beforeEach((done) => {
                            $datatable.on('page.dt', () => {
                                setTimeout(() => {
                                    done();
                                }, 300);
                            });
                            $('#example_first').click();
                        });
                        it('Cambia el número de página:', () => {
                            expect($('li.pageSearch.searchPaginator > input').val()).toBe("1");
                        });
                        it('Los registros deben cambiar:', () => {
                            expect($('tr > td:contains(1)').length).toBe(1);
                            expect($('tr > td:contains(2)').length).toBe(1);
                            expect($('tr > td:contains(3)').length).toBe(1);
                            expect($('tr > td:contains(4)').length).toBe(1);
                            expect($('tr > td:contains(5)').length).toBe(1);
                        });
                    });
                });
                describe('Página última > ', () => {
                    beforeEach((done) => {
                        $datatable.on('page.dt', () => {
                            setTimeout(() => {
                                done();
                            }, 300);
                        });
                        $('#example_last').click();
                    });
                    it('Cambia el número de página:', () => {
                        expect($('li.pageSearch.searchPaginator > input').val()).toBe("3");
                    });
                    it('Los registros deben cambiar:', () => {
                        expect($('tr > td:contains(11)').length).toBe(1);
                        expect($('tr > td:contains(12)').length).toBe(1);
                        expect($('tr > td:contains(13)').length).toBe(1);
                        expect($('tr > td:contains(14)').length).toBe(1);
                        expect($('tr > td:contains(15)').length).toBe(1);
                    });
                });
                describe('Página desde input > ', () => {
                    beforeEach((done) => {
                        $datatable.on('page.dt', () => {
                            setTimeout(() => {
                                done();
                            }, 300);
                        });
                        $('.ui-pg-input').val(3);
                        $('.ui-pg-input').trigger($.Event( 'keypress', { keyCode: 13, which: 13 } ));
                    });
                    it('Cambia el número de página:', () => {
                        expect($('li.pageSearch.searchPaginator > input').val()).toBe("3");
                    });
                    it('Los registros deben cambiar:', () => {
                        expect($('tr > td:contains(11)').length).toBe(1);
                        expect($('tr > td:contains(12)').length).toBe(1);
                        expect($('tr > td:contains(13)').length).toBe(1);
                        expect($('tr > td:contains(14)').length).toBe(1);
                        expect($('tr > td:contains(15)').length).toBe(1);
                    });
                });
            });
            describe('Variacion de número de registros por página > ', () => {
                beforeEach((done) => {
                    $datatable.on('draw.dt', () => {
                        done();
                    });
                    $('[name="example_length"]').val(10);
                    $('[name="example_length"]').trigger('change')
                });
                it('Debe haber recibido los registros indicados:', () => {
                    expect($('tbody > tr', $datatable).length).toBe(10);
                });
                it('Deben haber únicamente 2 páginas disponibles:', () => {
                    expect($('.pageSearch.searchPaginator:contains(" de 2")', $('#example_wrapper')).length).toBe(1);
                });
            });
            describe('Ordenación > ', () => {
                describe('Ordenación por nombre ascendente > ', () => {
                    beforeEach((done) => {
                        $datatable.on('draw.dt', () => {
                            setTimeout(() => {
                                done();
                            }, 300);
                        });
                        $('th.sorting[data-col-prop="nombre"]').click();
                    });
                    it('Comprobamos que haya cambiado el orden:', () => {
                        expect($('#example > tbody > tr:eq(0) > td:eq(1)').text()).toBe('1');
                        expect($('#example > tbody > tr:eq(1) > td:eq(1)').text()).toBe('5');
                        expect($('#example > tbody > tr:eq(2) > td:eq(1)').text()).toBe('4');
                        expect($('#example > tbody > tr:eq(3) > td:eq(1)').text()).toBe('3');
                        expect($('#example > tbody > tr:eq(4) > td:eq(1)').text()).toBe('2');
                    });
                });
                describe('Ordenación por nombre descendente:', () => {
                    describe('Ordenacion por nombre descendente', () => {
                        beforeEach((done) => {
                            $datatable.on('draw.dt', () => {
                                setTimeout(() => {
                                    done();
                                }, 300);
                            });
                            $('th[data-col-prop="nombre"]').click();
                        });
                        it('Comprobamos que haya cambiado el orden:', () => {
                            expect($('#example > tbody > tr:eq(0) > td:eq(1)').text()).toBe('2');
                            expect($('#example > tbody > tr:eq(1) > td:eq(1)').text()).toBe('3');
                            expect($('#example > tbody > tr:eq(2) > td:eq(1)').text()).toBe('4');
                            expect($('#example > tbody > tr:eq(3) > td:eq(1)').text()).toBe('5');
                            expect($('#example > tbody > tr:eq(4) > td:eq(1)').text()).toBe('1');
                        });
                    });
                    
                });                
            });
            describe('Botonera > ', () => {
                describe('Aparecen los botones por defecto > ', () => {
                    it('Botones por defecto existen:', () => {
                        expect($('.dt-buttons > .btn-primary').length).toBe(5);
                    });
                    it('Solo el botón add está habilitado:', () => {
                        expect($('.datatable_toolbar_btnAdd').hasClass('disabledDatatable')).toBeFalsy();
                        expect($('.datatable_toolbar_btnEdit').hasClass('disabledDatatable')).toBeTruthy();
                        expect($('.datatable_toolbar_btnClone').hasClass('disabledDatatable')).toBeTruthy();
                        expect($('.datatable_toolbar_btnDelete').hasClass('disabledDatatable')).toBeTruthy();
                        expect($('.buttons-collection').hasClass('disabledDatatable')).toBeTruthy();
                    });
                });
                // TODO: Añadir botón extra
            });
            describe('Edición con formulario > ', () => {
                beforeEach(() => {
                    $('tbody > tr:eq(0)').dblclick();
                });
                it('El formulario debe mostrarse:', () => {});
            });
            describe('Edición en línea > ', () => {});
            describe('Multiseleccion > ', () => {});
        });
    });
}
testDatatable();